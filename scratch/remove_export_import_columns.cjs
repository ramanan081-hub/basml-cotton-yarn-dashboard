const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/\r\n/g, '\n');

// 1. Remove the headers from table
const oldHeader = `                  <th style={{ textAlign: 'center' }}>Production Trend (MoM / YoY)</th>
                  <th style={{ textAlign: 'center' }}>Export Share (%)</th>
                  <th style={{ textAlign: 'left' }}>Imported Cotton Source</th>
                  <th>Product Focus / Specialty</th>`;

const newHeader = `                  <th style={{ textAlign: 'center' }}>Production Trend (MoM / YoY)</th>
                  <th>Product Focus / Specialty</th>`;

content = content.replace(oldHeader, newHeader);

// 2. Remove the cells from table body
const oldCells = `                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: mill.exportShare.includes('EOU') ? 'var(--ios-blue)' : 'var(--text-primary)', fontSize: '0.85rem' }}>{mill.exportShare}</td>
                    <td style={{ color: mill.importShare.includes('Domestic') ? 'var(--text-secondary)' : '#b48a04', fontWeight: mill.importShare.includes('Domestic') ? 'normal' : 'bold', fontSize: '0.85rem' }}>{mill.importShare}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{mill.focus}</td>`;

const newCells = `                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{mill.focus}</td>`;

content = content.replace(oldCells, newCells);

fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully removed Export Share and Imported Cotton Source columns from App.jsx!');
