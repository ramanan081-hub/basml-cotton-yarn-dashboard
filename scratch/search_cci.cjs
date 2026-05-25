const fs = require('fs');
const path = require('path');

const files = [
  'Global_Cotton_Market_2025_26__Data-Driven_Report_for_Textile_Decision-Makers_text.txt',
  'Cotton_Market_Intelligence_Report_May2026_text.txt',
  'Cotton_Analysis_Report_TN_Focus_text.txt',
  'Yarn_Market_Intelligence_Report_2024_26_text.txt'
];

const scratchDir = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch';

for (const file of files) {
  const filePath = path.join(scratchDir, file);
  if (!fs.existsSync(filePath)) continue;
  const text = fs.readFileSync(filePath, 'utf8');
  const lines = text.split('\n');
  
  lines.forEach((line, index) => {
    if (line.includes('CCI') || line.includes('Cotton Corporation') || line.includes('procurement') || line.includes('procured')) {
      if (line.length > 10) {
        console.log(`${file}:${index+1}: ${line.trim()}`);
      }
    }
  });
}
