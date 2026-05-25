const fs = require('fs');
const content = fs.readFileSync('scratch/recovered_clean_350_970.txt', 'utf8');
const lines = content.split('\n');

console.log('Lines containing MISSING in recovered_clean_350_970.txt:');
lines.forEach((line, index) => {
  if (line.includes('MISSING')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
