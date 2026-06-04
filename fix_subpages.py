import os
import glob

def process_files():
    base_dir = "/Users/kelebra/Documents/laser_inova/b2b_page"
    
    # 1. Remove google-site-verification from subpages and blog
    verification_tag = '<meta name="google-site-verification" content="xLexKAFDq-OGWO5uXmbzkCB-yAGpcjUXMTxzucvNEPU" />\n'
    verification_tag_inline = '<meta name="google-site-verification" content="xLexKAFDq-OGWO5uXmbzkCB-yAGpcjUXMTxzucvNEPU" />'
    
    html_files = glob.glob(os.path.join(base_dir, "subpages", "*.html")) + glob.glob(os.path.join(base_dir, "blog", "**", "*.html"), recursive=True)
    
    for file_path in html_files:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
            
        new_content = content
        if verification_tag in content:
            new_content = new_content.replace(verification_tag, "")
        elif verification_tag_inline in content:
            new_content = new_content.replace(verification_tag_inline, "")
            
        # 2. Replace href="../subpages/ with href="./ in subpages
        if "subpages" in file_path:
            new_content = new_content.replace('href="../subpages/', 'href="./')
            
        if content != new_content:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)
            print(f"Updated: {file_path}")

if __name__ == "__main__":
    process_files()
