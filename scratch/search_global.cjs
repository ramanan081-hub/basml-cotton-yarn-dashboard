const fs = require('fs');
const path = require('path');

const file = 'Global_Cotton_Market_2025_26__Data-Driven_Report_for_Textile_Decision-Makers_text.txt';
const scratchDir = 'c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/scratch';
const filePath = path.join(scratchDir, file);

const text = fs.readFileSync(filePath, 'utf8');
const lines = text.split('\n');

lines.forEach((line, index) => {
  if (line.toLowerCase().includes('world') || line.toLowerCase().includes('global')) {
    if (line.toLowerCase().includes('balance') || line.toLowerCase().includes('stocks') || line.toLowerCase().includes('production')) {
      console.log(`Line ${index+1}: ${line.trim()}`);
    }
  }
});
