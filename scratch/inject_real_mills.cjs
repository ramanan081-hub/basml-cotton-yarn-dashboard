const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
const parsedMillsPath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\parsed_mills.json';

const mills = JSON.parse(fs.readFileSync(parsedMillsPath, 'utf8'));

let content = fs.readFileSync(filepath, 'utf8');

// 1. Remove the generateMills function definition from content
// We can find where 'function generateMills()' starts and its end.
const functionStartToken = 'function generateMills() {';
const startIdx = content.indexOf(functionStartToken);
if (startIdx !== -1) {
  // Let's find the closing brace matching this function.
  // Since it's a known function, we can replace the whole block by looking for the next 'export const initialData'
  const nextToken = 'export const initialData = {';
  const endIdx = content.indexOf(nextToken);
  if (endIdx !== -1) {
    content = content.substring(0, startIdx) + content.substring(endIdx);
    console.log('Removed generateMills function definition.');
  }
}

// 2. Replace 'millIntelligence: generateMills(),' with the serialized JSON array of mills
const targetLine = '    millIntelligence: generateMills(),';
const replacementLine = '    millIntelligence: ' + JSON.stringify(mills, null, 2) + ',';

content = content.replace(targetLine, replacementLine);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully injected the 100 real spinning mills list into data.js!');
