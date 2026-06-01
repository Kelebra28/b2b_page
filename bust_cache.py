import os
import re
import time

def bust_cache():
    timestamp = str(int(time.time()))
    html_files = []
    
    # Traverse directories to find all .html files
    for root, dirs, files in os.walk('.'):
        if '.git' in root:
            continue
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
                
    print(f"Found {len(html_files)} HTML files. Updating cache-busting to version: {timestamp}")
    
    # Regex to find links to style.min.css and main.js with optional existing query strings
    css_pattern = re.compile(r'(style\.min\.css)(?:\?v=\d+)?')
    js_pattern = re.compile(r'(main\.js)(?:\?v=\d+)?')
    critical_pattern = re.compile(r'(critical\.min\.css)(?:\?v=\d+)?')
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Replace occurrences
        new_content = css_pattern.sub(rf'\1?v={timestamp}', content)
        new_content = js_pattern.sub(rf'\1?v={timestamp}', new_content)
        new_content = critical_pattern.sub(rf'\1?v={timestamp}', new_content)
        
        if new_content != content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated: {file_path}")

if __name__ == '__main__':
    bust_cache()
