const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
const lines = code.split('\n');

const functions = [
  { name: 'PresentationDashboard', start: 1, end: 358 },
  { name: 'IndiaDashboard (1)', start: 359, end: 591 },
  { name: 'IndiaDashboard (2)', start: 592, end: 910 },
  { name: 'IndiaDashboard (3)', start: 911, end: 940 },
  { name: 'IndiaDashboard (4)', start: 941, end: 1381 },
  { name: 'YarnDashboard', start: 1382, end: 2466 },
  { name: 'AnalysisDashboard', start: 2467, end: 3158 }
];

functions.forEach(f => {
  console.log(`\n==================================================`);
  console.log(`Function: ${f.name} (Lines ${f.start} to ${f.end})`);
  console.log(`==================================================`);
  console.log('--- START ---');
  for (let i = f.start - 1; i < f.start + 4; i++) {
    if (i < lines.length) console.log(`${i + 1}: ${lines[i]}`);
  }
  console.log('--- END ---');
  for (let i = f.end - 5; i < f.end; i++) {
    if (i < lines.length) console.log(`${i + 1}: ${lines[i]}`);
  }
});
