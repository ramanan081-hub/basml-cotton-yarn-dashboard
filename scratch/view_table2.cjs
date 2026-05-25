const fs = require('fs');
const path = require('path');

const file = 'Cotton_Market_Intelligence_Report_May2026_text.txt';
const scratchDir = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch';
const filePath = path.join(scratchDir, file);

const text = fs.readFileSync(filePath, 'utf8');
const lines = text.split('\n');

for (let i = 250; i < 320; i++) {
  if (lines[i]) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
