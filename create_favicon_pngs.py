#!/usr/bin/env python3
"""
Create ASCII RR favicon PNG files for ricrios.com
"""

def create_ascii_favicon():
    """Create simple ASCII RR favicon using basic drawing"""
    
    # Simple ASCII art for RR in a 32x32 grid
    rr_ascii = [
        "                                ",
        "                                ",
        "                                ",
        "                                ",
        "      ██████   ██████          ",
        "      ██   ██  ██   ██         ",
        "      ██████   ██████          ",
        "      ██   ██  ██   ██         ",
        "      ██   ██  ██   ██         ",
        "                                ",
        "                                ",
        "                                ",
        "                                ",
        "                                ",
        "                                ",
        "                                "
    ]
    
    # Create a simple text-based favicon
    with open('favicon-32x32.txt', 'w') as f:
        f.write("RR ASCII Favicon - 32x32\n")
        for line in rr_ascii:
            f.write(line + "\n")
    
    print("✅ Created ASCII RR favicon template")

if __name__ == "__main__":
    create_ascii_favicon()
