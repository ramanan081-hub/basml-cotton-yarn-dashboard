const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/\r\n/g, '\n');

// Find and remove the statistics badges div block
const targetBlock = `        {/* Industry Statistics Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(92, 60, 21, 0.08)', border: '1px solid rgba(92, 60, 21, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: '#5c3c15' }}>
            🇮🇳 Total India Spinning Mills: 3,370
          </span>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(61, 94, 48, 0.08)', border: '1px solid rgba(61, 94, 48, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: '#3d5e30' }}>
            🌴 Tamil Nadu Spinning Mills: 2,600+ (77% of India's capacity)
          </span>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(0, 122, 255, 0.08)', border: '1px solid rgba(0, 122, 255, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: 'var(--ios-blue)' }}>
            📊 Monitored Major Spinners: 302 (PDF Combined Database)
          </span>
        </div>`;

if (content.includes(targetBlock)) {
  content = content.replace(targetBlock, '');
  console.log('Successfully removed Industry Statistics Badges from App.jsx!');
} else {
  // Let's do a more robust substring matching if spacing is slightly different
  const startIdx = content.indexOf('{/* Industry Statistics Badges */}');
  const endToken = '</div>';
  if (startIdx !== -1) {
    const endIdx = content.indexOf(endToken, startIdx);
    if (endIdx !== -1) {
      content = content.substring(0, startIdx) + content.substring(endIdx + endToken.length);
      console.log('Successfully found and removed badges block.');
    }
  } else {
    console.error('Industry Statistics Badges block not found in App.jsx.');
  }
}

fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Finished updating App.jsx.');
