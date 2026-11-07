const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.laserinova.com';
const ROOT_DIR = __dirname;

function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  const relativePath = path.relative(ROOT_DIR, filePath);
  let webPath = relativePath.replace(/\\/g, '/');
  
  if (webPath === 'index.html') {
    webPath = '';
  } else if (webPath.endsWith('/index.html')) {
    webPath = webPath.slice(0, -11);
  }
  
  const absoluteUrl = `${BASE_URL}${webPath ? '/' + webPath : ''}`;
  
  // 1. Update internal links
  content = content.replace(/href=["'](?!http|https|mailto|tel|#|javascript)([^"']+)["']/g, (match, p1) => {
    // check if it starts with /
    let resolvedPath;
    if (p1.startsWith('/')) {
        resolvedPath = path.join(ROOT_DIR, p1);
    } else {
        const currentDir = path.dirname(filePath);
        resolvedPath = path.resolve(currentDir, p1);
    }
    
    if (resolvedPath.startsWith(ROOT_DIR)) {
      const relToRoot = path.relative(ROOT_DIR, resolvedPath);
      let targetWebPath = relToRoot.replace(/\\/g, '/');
      return `href="${BASE_URL}/${targetWebPath}"`;
    }
    return match;
  });

  // Also update src for images/scripts if they are relative?
  // The user explicitly asked for "enlaces internos para pasar todo a rutas absolutas"
  // I will only do href links as instructed.

  // 2. Canonical Tag
  const canonicalRegex = /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i;
  const canonicalTag = `<link rel="canonical" href="${absoluteUrl}" />`;
  if (canonicalRegex.test(content)) {
    content = content.replace(canonicalRegex, canonicalTag);
  } else {
    content = content.replace('</head>', `  ${canonicalTag}\n</head>`);
  }

  // 3. OG URL Tag
  const ogUrlRegex = /<meta\s+property=["']og:url["']\s+content=["'][^"']*["']\s*\/?>/i;
  const ogUrlTag = `<meta property="og:url" content="${absoluteUrl}" />`;
  if (ogUrlRegex.test(content)) {
    content = content.replace(ogUrlRegex, ogUrlTag);
  } else {
    content = content.replace('</head>', `  ${ogUrlTag}\n</head>`);
  }

  fs.writeFileSync(filePath, content, 'utf8');
  return absoluteUrl;
}

function generateSitemap(urls) {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  for (const url of urls) {
    xml += `  <url>\n    <loc>${url}</loc>\n  </url>\n`;
  }
  xml += `</urlset>`;
  fs.writeFileSync(path.join(ROOT_DIR, 'sitemap.xml'), xml, 'utf8');
}

function main() {
  const htmlFiles = getAllHtmlFiles(ROOT_DIR);
  const urls = [];
  
  for (const file of htmlFiles) {
    try {
      const url = processHtmlFile(file);
      urls.push(url);
      console.log(`Processed: ${url}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
  
  generateSitemap(urls);
  console.log('Done generating sitemap!');
}

main();
