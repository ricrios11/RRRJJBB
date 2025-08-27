# trojan_scanner.py
import re
from pathlib import Path

def scan_trojan_comments(base_dir):
    pattern = re.compile(r'#TrojanHorseOS:(\d{4}-\d{2}-\d{2})')
    report = []
    for file_path in Path(base_dir).rglob('*.py'):
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            for i, line in enumerate(f):
                if match := pattern.search(line):
                    report.append({
                        'file': str(file_path),
                        'line': i + 1,
                        'tag': match.group(0),
                        'content': line.strip()
                    })
    return report
