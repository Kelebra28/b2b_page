// Inventario SEO de las URLs del sitemap en vivo. Uso: node scripts/inventory.js [baseUrl]
const fs = require('fs');
const base = process.argv[2] || 'https://www.laserinova.com';
const pick = (h, re) => { const m = h.match(re); return m ? m[1].trim().replace(/\s+/g, ' ') : null; };
(async () => {
  const xml = await (await fetch(base + '/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  const out = [];
  for (const url of urls) {
    const r = await fetch(url, { redirect: 'manual' });
    const html = r.status === 200 ? await r.text() : '';
    out.push({
      url, status: r.status, location: r.headers.get('location'),
      lang: pick(html, /<html[^>]*lang="([^"]+)"/i),
      title: pick(html, /<title>([^<]*)<\/title>/i),
      description: pick(html, /<meta\s+name="description"\s+content="([^"]*)"/i),
      canonical: pick(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i),
      ogUrl: pick(html, /<meta\s+property="og:url"\s+content="([^"]*)"/i),
      h1: pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, ''),
      jsonld: /application\/ld\+json/.test(html),
    });
  }
  fs.writeFileSync('inventory/live.json', JSON.stringify(out, null, 2));
  console.table(out.map(o => ({ url: o.url.replace(base, '') || '/', st: o.status, lang: o.lang, canonOK: o.canonical === o.url, ogOK: o.ogUrl === o.url, ld: o.jsonld, desc: (o.description || '').length })));
})();
