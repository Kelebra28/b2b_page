#!/usr/bin/env python3
"""Extrae las 19 subpáginas de servicio (subpages/*.html) a web/content/services/<slug>.json
y copia sus imágenes a web/public/img/subpages (con nombres de archivo limpios)."""
import json, re, glob, os, shutil, sys
from bs4 import BeautifulSoup, NavigableString, Tag

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "web/content/services")
IMG_SRC = os.path.join(ROOT, "assets/img/subpages")
IMG_OUT = os.path.join(ROOT, "web/public/img/subpages")
warnings = []

def slug_file(name):
    base, ext = os.path.splitext(name)
    base = re.sub(r"[^a-zA-Z0-9_-]+", "-", base).strip("-")
    return base + ext.lower()

def img_path(src):
    if src.startswith("http"): return src
    m = re.search(r"assets/img/subpages/(.+)$", src)
    if not m:
        warnings.append(f"imagen fuera de subpages: {src}"); return src
    rel = m.group(1)
    d, f = os.path.split(rel)
    new = os.path.join(d, slug_file(f))
    dst = os.path.join(IMG_OUT, new)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    srcf = os.path.join(IMG_SRC, rel)
    if os.path.exists(srcf): shutil.copy(srcf, dst)
    else: warnings.append(f"IMAGEN FALTANTE: {rel}")
    return "/img/subpages/" + new

def norm(s): return re.sub(r"\s+", " ", s).strip()

def rich(el):
    parts = []
    for c in el.children:
        if isinstance(c, NavigableString):
            t = re.sub(r"\s+", " ", str(c))
            if t: parts.append(t)
        elif c.name == "strong":
            parts.append({"strong": norm(c.get_text())})
        elif c.name == "em":
            parts.append({"em": norm(c.get_text())})
        elif c.name == "br":
            parts.append(" ")
        else:
            warnings.append(f"tag inesperado <{c.name}> en texto")
            parts.append(norm(c.get_text()))
    # une strings contiguos y recorta bordes
    out = []
    for p in parts:
        if isinstance(p, str) and out and isinstance(out[-1], str): out[-1] += p
        else: out.append(p)
    if out and isinstance(out[0], str): out[0] = out[0].lstrip()
    if out and isinstance(out[-1], str): out[-1] = out[-1].rstrip()
    out = [p for p in out if p != ""]
    return out if any(isinstance(p, dict) for p in out) else (out[0] if out else "")

def txt(el): return norm(el.get_text()) if el else ""

def link(a):
    return {"label": txt(a), "href": a.get("href", "")}

def meta(soup, **kw):
    def g(sel):
        t = soup.select_one(sel); return (t.get("content") or "").strip() if t else ""
    return {
        "title": norm(soup.title.get_text()),
        "description": g('meta[name="description"]'),
        "keywords": g('meta[name="keywords"]'),
        "ogTitle": g('meta[property="og:title"]'),
        "ogDescription": g('meta[property="og:description"]'),
        "ogImageAlt": g('meta[property="og:image:alt"]'),
        "twitterTitle": g('meta[name="twitter:title"]'),
        "twitterDescription": g('meta[name="twitter:description"]'),
    }

def service_ld(soup):
    for s in soup.find_all("script", type="application/ld+json"):
        try: data = json.loads(s.string)
        except Exception: continue
        nodes = data.get("@graph", [data]) if isinstance(data, dict) else data
        for n in nodes:
            if n.get("@type") == "Service":
                return {k: n[k] for k in ("name", "serviceType", "description") if k in n}
    return None

def section(sec):
    cls = sec.get("class", [])
    s = {"theme": "dark" if "section-dark" in cls else "alt" if "section-alt" in cls else "light"}
    if sec.get("id"): s["id"] = sec["id"]
    head = sec.select_one(".subpage-intro, .section-heading, .subpage-machine-copy")
    if head:
        e = head.select_one(".eyebrow"); h = head.find("h2")
        if e: s["eyebrow"] = txt(e)
        if h: s["title"] = txt(h)
        ps = [rich(p) for p in head.find_all("p", recursive=False)]
        if ps: s["paragraphs"] = ps
    feats = [txt(li) for li in sec.select(".feature-list li")]
    if feats: s["features"] = feats
    vis = sec.select_one(".subpage-machine-visual img")
    if vis: s["image"] = {"src": img_path(vis["src"]), "alt": vis.get("alt", "")}
    cards = [{"title": txt(c.find("h3")), "text": txt(c.find("p"))} for c in sec.select(".subpage-info-card")]
    if cards: s["cards"] = cards
    ben = [{"title": txt(c.find("strong")), "text": txt(c.find("p"))} for c in sec.select(".subpage-benefit-item")]
    if ben: s["benefits"] = ben
    tech = []
    for c in sec.select(".subpage-tech-card"):
        t = {"title": txt(c.find("h3"))}
        if c.find("p"): t["text"] = rich(c.find("p"))
        if c.select("li"): t["items"] = [txt(li) for li in c.select("li")]
        tech.append(t)
    if tech: s["tech"] = tech
    ex = []
    for c in sec.select(".subpage-example-card"):
        im = c.find("img")
        ex.append({"src": img_path(im["src"]), "alt": im.get("alt", ""), "title": txt(c.find("h3")), "text": txt(c.find("p")),
                   "machine": "subpage-machine-card" in c.get("class", [])})
    if ex: s["examples"] = ex
    if not head and not (cards or ben or tech or ex): warnings.append("sección sin encabezado")
    return s

def parse(path):
    soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")
    slug = os.path.splitext(os.path.basename(path))[0]
    main = soup.find("main")
    d = {"slug": slug, "path": f"/subpages/{slug}.html", "meta": meta(soup), "ld": service_ld(soup), "sections": []}
    for sec in main.find_all("section", recursive=False):
        cls = sec.get("class", [])
        if "subpage-hero" in cls:
            acts = sec.select(".subpage-hero-actions a")
            im = sec.select_one(".subpage-hero-image-frame img")
            card = sec.select_one(".subpage-hero-card")
            d["hero"] = {
                "eyebrow": txt(sec.select_one(".eyebrow")),
                "title": txt(sec.find("h1")),
                "text": rich(sec.select_one(".subpage-hero-text")),
                "primary": link(acts[0]), "secondary": link(acts[1]),
                "badges": [txt(li) for li in sec.select(".hero-badges li")],
                "card": {"title": txt(card.find("strong")), "text": txt(card.find("span"))} if card else None,
                "image": {"src": img_path(im["src"]), "alt": im.get("alt", "")},
            }
        elif "subpage-faqs" in cls:
            d["faqs"] = {
                "eyebrow": txt(sec.select_one(".eyebrow")), "title": txt(sec.find("h2")),
                "items": [{"q": txt(i.select_one(".faq-question")), "a": txt(i.select_one(".faq-answer p"))} for i in sec.select(".faq-item")],
            }
        elif "subpage-cta" in cls:
            acts = sec.select(".cta-final-actions a")
            d["cta"] = {
                "eyebrow": txt(sec.select_one(".eyebrow")), "title": txt(sec.find("h2")), "text": txt(sec.find("p")),
                "primary": link(acts[0]), "secondary": link(acts[1]),
            }
        else:
            d["sections"].append(section(sec))
    return d

if __name__ == "__main__":
    # OJO: los JSON de content/services ya fueron limpiados a mano; no volver a correr salvo desde cero.
    for p in sorted(glob.glob(os.path.join(ROOT, "subpages/*.html"))):
        d = parse(p)
        json.dump(d, open(os.path.join(OUT, d["slug"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print("ok", d["slug"], len(d["sections"]), "secciones")
    print("\n".join(sorted(set(warnings))) or "sin avisos")
