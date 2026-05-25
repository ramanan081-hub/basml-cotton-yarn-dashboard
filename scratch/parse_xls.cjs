const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const xlsPath = 'c:\\Users\\RAMANAN\\Downloads\\Cotton Balance Sheet From 1991-92 updated upto 16.04.2026.xls';
const outputPath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\xls_data.txt';

if (!fs.existsSync(xlsPath)) {
  console.error(`File not found: ${xlsPath}`);
  process.exit(1);
}

console.log('Reading Excel file...');
const workbook = xlsx.readFile(xlsPath);
console.log('Sheet names:', workbook.SheetNames);

let output = '';

workbook.SheetNames.forEach(sheetName => {
  output += `\n========================================\n`;
  output += `SHEET: ${sheetName}\n`;
  output += `========================================\n`;
  
  const worksheet = workbook.Sheets[sheetName];
  const csv = xlsx.utils.sheet_to_csv(worksheet);
  const rows = csv.split('\n');
  console.log(`Sheet "${sheetName}" has ${rows.length} rows.`);
  
  // Save first 150 rows of each sheet to file
  rows.slice(0, 150).forEach((row, i) => {
    output += `${i + 1}: ${row}\n`;
  });
});

fs.writeFileSync(outputPath, output, 'utf8');
console.log('Wrote sheet data to scratch/xls_data.txt');
