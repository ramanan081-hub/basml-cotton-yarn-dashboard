const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

const targetHeader = `      {/* SECTION 2.6: MILL-LEVEL PROCUREMENT & PRODUCTION INTELLIGENCE */}
      <div className="glass-panel mb-6">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏭 Indian & Tamil Nadu Mill-Level Procurement & Production Intelligence
        </h3>`;

const replacementHeader = `      {/* SECTION 2.6: MILL-LEVEL PROCUREMENT & PRODUCTION INTELLIGENCE */}
      <div className="glass-panel mb-6">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏭 Indian & Tamil Nadu Mill-Level Procurement & Production Intelligence
        </h3>
        
        {/* Industry Statistics Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '1.25rem' }}>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(92, 60, 21, 0.08)', border: '1px solid rgba(92, 60, 21, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: '#5c3c15' }}>
            🇮🇳 Total India Spinning Mills: 3,370
          </span>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(61, 94, 48, 0.08)', border: '1px solid rgba(61, 94, 48, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: '#3d5e30' }}>
            🌴 Tamil Nadu Spinning Mills: 2,600+ (77% of India's capacity)
          </span>
          <span style={{ fontSize: '0.78rem', padding: '4px 10px', background: 'rgba(0, 122, 255, 0.08)', border: '1px solid rgba(0, 122, 255, 0.18)', borderRadius: '20px', fontWeight: 'bold', color: 'var(--ios-blue)' }}>
            📊 Monitored Major Spinners: 16 (Top Capacity Profiles)
          </span>
        </div>`;

// Check line endings and perform clean replacement
content = content.replace(/\r\n/g, '\n');
if (content.includes(targetHeader.replace(/\r\n/g, '\n'))) {
  content = content.replace(targetHeader.replace(/\r\n/g, '\n'), replacementHeader.replace(/\r\n/g, '\n'));
  fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully added mills statistics badges!');
} else {
  console.error('Target header block not found in App.jsx.');
}
