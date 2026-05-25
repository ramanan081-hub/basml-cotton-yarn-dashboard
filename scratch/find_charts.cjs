const fs = require('fs');

const appJsx = fs.readFileSync('c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/src/App.jsx', 'utf8');

// Find occurrences of balanceSheet
const lines = appJsx.split('\n');
lines.forEach((line, index) => {
  if (line.includes('balanceSheet') || line.includes('globalCotton') || line.includes('indianCotton')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
