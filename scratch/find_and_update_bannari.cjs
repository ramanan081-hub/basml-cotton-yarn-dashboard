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

let foundCount = 0;
mills.forEach(mill => {
  if (mill.name.toLowerCase().includes('bannari amman spinning mills')) {
    foundCount++;
    console.log('Found entry:', mill);
    // Update all fields to match user values
    mill.capacity = '4,50,000 Spindles';
    mill.purchase = 2.8;
    mill.MoMCotton = '+2.5%';
    mill.YoYCotton = '+2.2%';
    mill.prod = 8.2;
    mill.MoMYarn = '+2.5%';
    mill.YoYYarn = '+3.1%';
    // Set focus depending on type or use the combined focus
    mill.focus = 'Cotton Combed, Compact Yarn Viscose Yarn';
    console.log('Updated to:', mill);
  }
});

if (foundCount > 0) {
  const newLines = [
    ...lines.slice(0, millStart),
    '    millIntelligence: ' + JSON.stringify(mills, null, 2) + ',',
    ...lines.slice(marketYarnStart)
  ];
  fs.writeFileSync(filepath, newLines.join('\n').replace(/\n/g, '\r\n'), 'utf8');
  console.log(`Successfully updated ${foundCount} entries for Bannari Amman Spinning Mills Ltd!`);
} else {
  console.log('Bannari Amman Spinning Mills Ltd was not found in data.js');
}
