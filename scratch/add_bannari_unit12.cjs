const fs = require('fs');

const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let content = fs.readFileSync(filepath, 'utf8');

// Locate the boundaries of millIntelligence
const lines = content.replace(/\r\n/g, '\n').split('\n');
let millStart = lines.findIndex(l => l.includes('millIntelligence: ['));
let marketYarnStart = lines.findIndex(l => l.includes('marketYarnsList: ['));

if (millStart === -1 || marketYarnStart === -1) {
  console.error('Could not find mill list bounds.');
  process.exit(1);
}

const arrayString = lines.slice(millStart, marketYarnStart).join('\n')
  .replace('millIntelligence:', '')
  .trim()
  .replace(/,$/, '');

let mills = eval(arrayString);

// Add the new entry
const newEntry = {
  id: mills.length + 1,
  type: 'cotton',
  state: 'Tamil Nadu',
  name: 'Bannari Amman Spinning Mills Ltd (Unit 1 & 2)',
  region: 'Dindigul',
  capacity: '1,50,000 Spindles',
  purchase: 2.2,
  MoMCotton: '+2.1%',
  YoYCotton: '+1.8%',
  prod: 6.4,
  MoMYarn: '+2.0%',
  YoYYarn: '+2.8%',
  focus: 'Cotton Spinning & Hosiery Yarn (Nadukandanur Pirivu, Vadamadurai)'
};

mills.push(newEntry);

// Re-serialize and save
const newLines = [
  ...lines.slice(0, millStart),
  '    millIntelligence: ' + JSON.stringify(mills, null, 2) + ',',
  ...lines.slice(marketYarnStart)
];

fs.writeFileSync(filepath, newLines.join('\n').replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully added Bannari Amman Spinning Mills Ltd (Unit 1 & 2) in Dindigul!');
