const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');
const lines = content.replace(/\r\n/g, '\n').split('\n');

// Find index of stateComparison.map
let stateIdx = lines.findIndex(l => l.includes('stateComparison.map'));
// Find index of districtComparison.map
let districtIdx = lines.findIndex(l => l.includes('districtComparison.map'));

let stateTableStart = -1;
for (let i = stateIdx; i >= 0; i--) {
  if (lines[i].includes('<table>')) {
    stateTableStart = i;
    break;
  }
}
let stateTableEnd = -1;
for (let i = stateIdx; i < lines.length; i++) {
  if (lines[i].includes('</table>')) {
    stateTableEnd = i;
    break;
  }
}

let districtTableStart = -1;
for (let i = districtIdx; i >= 0; i--) {
  if (lines[i].includes('<table>')) {
    districtTableStart = i;
    break;
  }
}
let districtTableEnd = -1;
for (let i = districtIdx; i < lines.length; i++) {
  if (lines[i].includes('</table>')) {
    districtTableEnd = i;
    break;
  }
}

console.log('Indices found:', { stateTableStart, stateTableEnd, districtTableStart, districtTableEnd });

if (stateTableStart !== -1 && stateTableEnd !== -1 && districtTableStart !== -1 && districtTableEnd !== -1) {
  const stateTableNewLines = [
    '              <table>',
    '                 <thead>',
    '                   <tr>',
    '                     <th>State</th>',
    '                     <th style={{ textAlign: \'right\', width: \'45%\' }}>Cotton Purchase (Lakh Bales)</th>',
    '                     <th style={{ textAlign: \'right\', width: \'40%\' }}>Yarn Production (M Kgs)</th>',
    '                   </tr>',
    '                 </thead>',
    '                 <tbody>',
    '                   {stateComparison.map((row, i) => (',
    '                     <tr key={i}>',
    '                       <td style={{ fontWeight: 700, verticalAlign: \'middle\' }}>{row.state}</td>',
    '                       <td style={{ textAlign: \'right\', verticalAlign: \'middle\' }}>',
    '                         <div style={{ fontWeight: 800, fontSize: \'0.95rem\' }}>{parseFloat(row.purchaseBales).toFixed(1)}</div>',
    '                         <div style={{ fontSize: \'0.75rem\', marginTop: \'2px\' }}>',
    '                           <span style={{ color: row.MoMCotton.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.MoMCotton}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> MoM</span>',
    '                           <span style={{ color: \'rgba(0,0,0,0.15)\', margin: \'0 4px\' }}>|</span>',
    '                           <span style={{ color: row.YoYCotton.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.YoYCotton}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> YoY</span>',
    '                         </div>',
    '                       </td>',
    '                       <td style={{ textAlign: \'right\', verticalAlign: \'middle\' }}>',
    '                         <div style={{ fontWeight: 800, fontSize: \'0.95rem\' }}>{parseFloat(row.prodMkg).toFixed(1)}</div>',
    '                         <div style={{ fontSize: \'0.75rem\', marginTop: \'2px\' }}>',
    '                           <span style={{ color: row.MoMYarn.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.MoMYarn}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> MoM</span>',
    '                           <span style={{ color: \'rgba(0,0,0,0.15)\', margin: \'0 4px\' }}>|</span>',
    '                           <span style={{ color: row.YoYYarn.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.YoYYarn}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> YoY</span>',
    '                         </div>',
    '                       </td>',
    '                     </tr>',
    '                   ))}',
    '                 </tbody>',
    '              </table>'
  ];

  const districtTableNewLines = [
    '              <table>',
    '                 <thead>',
    '                   <tr>',
    '                     <th>District</th>',
    '                     <th style={{ textAlign: \'right\', width: \'45%\' }}>Cotton Purchase (Lakh Bales)</th>',
    '                     <th style={{ textAlign: \'right\', width: \'40%\' }}>Yarn Production (M Kgs)</th>',
    '                   </tr>',
    '                 </thead>',
    '                 <tbody>',
    '                   {districtComparison.map((row, i) => (',
    '                     <tr key={i}>',
    '                       <td style={{ fontWeight: 700, verticalAlign: \'middle\' }}>{row.district}</td>',
    '                       <td style={{ textAlign: \'right\', verticalAlign: \'middle\' }}>',
    '                         <div style={{ fontWeight: 800, fontSize: \'0.95rem\' }}>{parseFloat(row.purchaseBales).toFixed(1)}</div>',
    '                         <div style={{ fontSize: \'0.75rem\', marginTop: \'2px\' }}>',
    '                           <span style={{ color: row.MoMCotton.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.MoMCotton}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> MoM</span>',
    '                           <span style={{ color: \'rgba(0,0,0,0.15)\', margin: \'0 4px\' }}>|</span>',
    '                           <span style={{ color: row.YoYCotton.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.YoYCotton}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> YoY</span>',
    '                         </div>',
    '                       </td>',
    '                       <td style={{ textAlign: \'right\', verticalAlign: \'middle\' }}>',
    '                         <div style={{ fontWeight: 800, fontSize: \'0.95rem\' }}>{parseFloat(row.prodMkg).toFixed(1)}</div>',
    '                         <div style={{ fontSize: \'0.75rem\', marginTop: \'2px\' }}>',
    '                           <span style={{ color: row.MoMYarn.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.MoMYarn}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> MoM</span>',
    '                           <span style={{ color: \'rgba(0,0,0,0.15)\', margin: \'0 4px\' }}>|</span>',
    '                           <span style={{ color: row.YoYYarn.includes(\'+\') ? \'var(--ios-green)\' : \'var(--ios-red)\', fontWeight: 700 }}>{row.YoYYarn}</span>',
    '                           <span style={{ color: \'var(--text-secondary)\', fontSize: \'0.7rem\' }}> YoY</span>',
    '                         </div>',
    '                       </td>',
    '                     </tr>',
    '                   ))}',
    '                 </tbody>',
    '              </table>'
  ];

  const newLines = [
    ...lines.slice(0, stateTableStart),
    ...stateTableNewLines,
    ...lines.slice(stateTableEnd + 1, districtTableStart),
    ...districtTableNewLines,
    ...lines.slice(districtTableEnd + 1)
  ];

  fs.writeFileSync(filepath, newLines.join('\r\n'), 'utf8');
  console.log('Successfully replaced table content in App.jsx');
} else {
  console.error('Failed to locate table borders.');
}
