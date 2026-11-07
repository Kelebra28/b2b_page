#!/usr/bin/env python3
"""Extrae el blog (blog/*.html) a web/content/blog/<slug>.json y blog/index.json.
OJO: los JSON se limpian a mano después; no volver a correr salvo desde cero."""
import json, re, glob, os, importlib.util
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
spec = importlib.util.spec_from_file_location("es", os.path.join(ROOT, "scripts/extract-services.py"))
es = importlib.util.module_from_spec(spec); spec.loader.exec_module(es)
OUT = os.path.join(ROOT, "web/content/blog")
os.makedirs(OUT, exist_ok=True)
txt, rich, norm = es.txt, es.rich, es.norm

MONTHS = {"enero":1,"febrero":2,"marzo":3,"abril":4,"mayo":5,"junio":6,"julio":7,"agosto":8,"septiembre":9,"octubre":10,"noviembre":11,"diciembre":12}
def iso(d):
    m = re.match(r"(\d+) de (\w+),? (\d{4})", d.strip(), re.I)
    return f"{m.group(3)}-{MONTHS[m.group(2).lower()]:02d}-{int(m.group(1)):02d}" if m else ""

def meta(soup):
    def g(sel, attr="content"):
        t = soup.select_one(sel); return (t.get(attr) or "").strip() if t else ""
    return {"title": norm(soup.title.get_text()), "description": g('meta[name="description"]'), "keywords": g('meta[name="keywords"]'),
            "canonical": g('link[rel="canonical"]', "href"), "ogTitle": g('meta[property="og:title"]'), "ogDescription": g('meta[property="og:description"]'),
            "ogType": g('meta[property="og:type"]'), "twitterTitle": g('meta[name="twitter:title"]'), "twitterDescription": g('meta[name="twitter:description"]')}

def link(a): return {"label": txt(a), "href": a.get("href", "")}

def parse(path):
    soup = BeautifulSoup(open(path, encoding="utf-8").read(), "html.parser")
    slug = os.path.splitext(os.path.basename(path))[0]
    ld = None
    for s in soup.find_all("script", type="application/ld+json"):
        try: ld = json.loads(s.string); break
        except Exception: pass
    d = {"slug": slug, "path": "/blog" if slug == "index" else f"/blog/{slug}.html", "meta": meta(soup), "ld": ld, "sections": []}
    for sec in soup.find("main").find_all("section", recursive=False):
        cls = sec.get("class", [])
        if "subpage-hero" in cls:
            acts = [link(a) for a in sec.select(".subpage-hero-actions a")]
            im = sec.select_one(".subpage-hero-image-frame img"); card = sec.select_one(".subpage-hero-card")
            d["hero"] = {"eyebrow": txt(sec.select_one(".eyebrow")), "title": txt(sec.find("h1")), "text": rich(sec.select_one(".subpage-hero-text")),
                         "primary": acts[0], "secondary": acts[1] if len(acts) > 1 else None, "badges": [],
                         "card": {"title": txt(card.find("strong")), "text": txt(card.find("span"))} if card else None,
                         "image": {"src": im["src"], "alt": im.get("alt", "")} if im else None}
        elif sec.select_one(".faq-list"):
            d["faqs"] = {"eyebrow": txt(sec.select_one(".eyebrow")), "title": txt(sec.find("h2")),
                         "items": [{"q": txt(i.select_one(".faq-question")), "a": txt(i.select_one(".faq-answer p"))} for i in sec.select(".faq-item")]}
        elif "subpage-cta" in cls:
            acts = [link(a) for a in sec.select("a.btn")]
            body = sec.select_one(".cta-final-shell div") or sec.select_one(".subpage-intro") or sec
            ps = sec.find("p")
            d["cta"] = {"eyebrow": txt(sec.select_one(".eyebrow")), "title": txt(sec.find("h2")), "text": rich(ps) if ps else "",
                        "primary": acts[0], "secondary": acts[1] if len(acts) > 1 else None}
        elif sec.select_one(".solutions-grid"):
            d["posts"] = []
            for c in sec.select(".solution-card"):
                im = c.find("img"); a = c.find("a")
                d["posts"].append({"slug": os.path.splitext(os.path.basename(a["href"]))[0], "title": txt(c.find("h3")), "excerpt": txt(c.find("p")),
                    "date": iso(txt(c.select_one(".solution-card-meta"))), "dateLabel": txt(c.select_one(".solution-card-meta")),
                    "badge": txt(c.select_one(".solution-card-badge")), "image": {"src": im["src"], "alt": im.get("alt", "")}, "linkLabel": txt(a)})
            h = sec.select_one(".section-heading")
            d["postsHeading"] = {"id": sec.get("id"), "eyebrow": txt(h.select_one(".eyebrow")), "title": txt(h.find("h2")), "text": txt(h.find("p"))}
        else:
            d["sections"].append(es.section(sec))
    return d

if __name__ == "__main__":
    for p in sorted(glob.glob(os.path.join(ROOT, "blog/*.html"))):
        d = parse(p)
        json.dump(d, open(os.path.join(OUT, d["slug"] + ".json"), "w", encoding="utf-8"), ensure_ascii=False, indent=2)
        print("ok", d["slug"], len(d["sections"]), "secciones", "| faqs" if "faqs" in d else "", "| cta" if "cta" in d else "")
    print("\n".join(sorted(set(es.warnings))) or "sin avisos")
