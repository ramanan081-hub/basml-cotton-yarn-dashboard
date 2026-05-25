const fs = require('fs');
const path = require('path');

const file = 'Yarn_Market_Intelligence_Report_2024_26_text.txt';
const scratchDir = 'c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/scratch';
const filePath = path.join(scratchDir, file);

const text = fs.readFileSync(filePath, 'utf8');
const lines = text.split('\n');

for (let i = 254; i < 304; i++) {
  if (lines[i]) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
