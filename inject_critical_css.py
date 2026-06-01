import os
import glob

css_to_add = "@media (max-width: 768px){.hero-grid{display:grid !important;height:auto !important;min-height:80svh !important;contain:layout size style !important;}.hero-card-mid,.hero-card-top{flex-shrink:0 !important;}}"

html_files = glob.glob("*.html") + glob.glob("subpages/*.html") + glob.glob("blog/*.html")

for filepath in html_files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if already added
        if "contain:layout size style !important" in content:
            continue
            
        start_idx = content.find('<style id="critical-css">')
        if start_idx != -1:
            end_idx = content.find('</style>', start_idx)
            if end_idx != -1:
                new_content = content[:end_idx] + css_to_add + "\n" + content[end_idx:]
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
