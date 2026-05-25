const fs = require('fs');
const path = require('path');

const files = [
  'Global_Cotton_Market_2025_26__Data-Driven_Report_for_Textile_Decision-Makers_text.txt',
  'Cotton_Market_Intelligence_Report_May2026_text.txt',
  'Cotton_Analysis_Report_TN_Focus_text.txt',
  'Yarn_Market_Intelligence_Report_2024_26_text.txt'
];

const scratchDir = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch';

function search() {
  const queries = [
    /balance\s*sheet/i,
    /production/i,
    /ending\s*stocks/i,
    /CCI\s*Procurement/i,
    /Shankar/i,
    /MCU-5/i,
    /DCH-32/i,
    /yarn\s*prices/i,
    /turnover/i,
    /pat/i,
    /msp/i
  ];

  for (const file of files) {
    const filePath = path.join(scratchDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`Not found: ${file}`);
      continue;
    }
    const text = fs.readFileSync(filePath, 'utf8');
    const lines = text.split('\n');
    console.log(`\n========================================`);
    console.log(`FILE: ${file} (Lines: ${lines.length})`);
    console.log(`========================================`);

    // Let's print out lines that match any query
    let matchesCount = 0;
    lines.forEach((line, index) => {
      let isMatch = false;
      for (const q of queries) {
        if (q.test(line)) {
          isMatch = true;
          break;
        }
      }
      if (isMatch) {
        // Print the matching line and a couple lines around it if useful, or just the line
        console.log(`Line ${index + 1}: ${line.trim()}`);
        matchesCount++;
        if (matchesCount > 50) {
          // cap it
        }
      }
    });
    console.log(`Total matching lines: ${matchesCount}`);
  }
}

search();
