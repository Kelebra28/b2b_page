import glob
import time
import re

ts = str(int(time.time()))
html_files = glob.glob("*.html") + glob.glob("subpages/*.html") + glob.glob("blog/*.html")

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        content = re.sub(r'style\.min\.css\?v=\d+', f'style.min.css?v={ts}', content)
        content = re.sub(r'main\.js\?v=\d+', f'main.js?v={ts}', content)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error {filepath}: {e}")
