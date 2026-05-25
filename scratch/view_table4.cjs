const fs = require('fs');
const path = require('path');

const file = 'Global_Cotton_Market_2025_26__Data-Driven_Report_for_Textile_Decision-Makers_text.txt';
const scratchDir = 'c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/scratch';
const filePath = path.join(scratchDir, file);

const text = fs.readFileSync(filePath, 'utf8');
const lines = text.split('\n');

for (let i = 65; i < 115; i++) {
  if (lines[i]) {
    console.log(`${i + 1}: ${lines[i]}`);
  }
}
