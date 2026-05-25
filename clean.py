import re

with open('src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Header
content = content.replace('<header className="glass-panel p-6 flex-between mb-4">', '<header className="app-header">')

# 2. Chart Containers
content = re.sub(r'<div style=\{\{height: (\d+), marginTop: \'1rem\'\}\}>', r'<div className="chart-container mt-4" style={{height: \1}}>', content)
content = re.sub(r'<div style=\{\{height: (\d+)\}\}>', r'<div className="chart-container" style={{height: \1}}>', content)
content = content.replace('<div style={{display: \'flex\', gap: \'1rem\', marginTop: \'1rem\', height: 180}}>', '<div className="chart-container mt-4" style={{display: \'flex\', gap: \'1rem\', height: 300}}>')

# 3. Table Wrappers
content = content.replace('<div style={{marginTop: \'1rem\', overflowX: \'auto\'}}>', '<div className="table-wrapper mt-4">')
content = content.replace('<div style={{ overflowX: \'auto\' }}>', '<div className="table-wrapper">')

# 4. Table inner styles
content = re.sub(r'<table style=\{\{.*?\}\}>', '<table>', content)
content = re.sub(r'<tr style=\{\{borderBottom: \'[^\']+\'\}\}>', '<tr>', content)
content = re.sub(r'<tr style=\{\{borderBottom: \'[^\']+\', color: \'[^\']+\'\}\}>', '<tr>', content)
content = re.sub(r'<tr key=\{[^\}]+\} style=\{\{borderBottom: \'[^\']+\'\}\}>', lambda m: m.group(0).split(' style')[0] + '>', content)
content = re.sub(r'<tr key=\{[^\}]+\} style=\{\{background: [^\}]+\}\}>', lambda m: m.group(0).split(' style')[0] + '>', content)
content = content.replace('style={{padding: \'0.5rem\'}}', '')
content = content.replace('style={{padding: \'10px 12px\'}}', '')
content = content.replace('style={{padding: \'10px 12px\', borderBottom: \'1px solid #eee\'}}', '')
content = content.replace('style={{padding: \'10px 12px\', borderBottom: \'1px solid #eee\', borderLeft: \'1px solid #eee\'}}', '')

# 5. Alert Boxes
content = re.sub(r'<div style=\{\{background: \'#[a-fA-F0-9]+\', padding: \'1rem\', borderRadius: \'8px\', border: \'1px solid #[a-fA-F0-9]+\'\}\}>', '<div className="alert-box">', content)
content = re.sub(r'<div style=\{\{background: \'rgba[^\}]+\', padding: \'1.25rem\', borderRadius: \'12px\', border: \'1px solid rgba[^\}]+\'\}\}>', '<div className="alert-box">', content)

# 6. Fill colors for charts
content = content.replace('fill="var(--ios-blue)"', 'fill="rgba(107, 79, 46, 0.85)"')
content = content.replace('fill="var(--ios-green)"', 'fill="rgba(196, 154, 60, 0.85)"')
content = content.replace('fill="var(--ios-orange)"', 'fill="rgba(90, 80, 64, 0.85)"')
content = content.replace('fill="var(--ios-purple)"', 'fill="rgba(138, 115, 86, 0.85)"')

with open('src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
