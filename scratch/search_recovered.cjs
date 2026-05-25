const fs = require('fs');
const content = fs.readFileSync('scratch/recovered_clean_350_970.txt', 'utf8');
const lines = content.split('\n');

lines.forEach((line, index) => {
  if (line.includes('function') || line.includes('export') || line.includes('App') || line.includes('Dashboard')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
