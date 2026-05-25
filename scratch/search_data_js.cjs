const fs = require('fs');

const dataJs = fs.readFileSync('c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/src/data.js', 'utf8');

const lines = dataJs.split('\n');
lines.forEach((line, index) => {
  if (line.match(/^\s{2}\w+:\s*\{/) || line.match(/^\s{2}\w+:\s*\[/) || line.match(/^export const \w+/)) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
