// Polyfill DOMMatrix for node environment before loading pdf-parse
global.DOMMatrix = class DOMMatrix {
  constructor(init) {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
  }
};

const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const files = [
  'Global Cotton Market 2025–26  Data-Driven Report for Textile Decision-Makers.pdf',
  'Yarn_Industry_Report_2024-2026.pdf',
  'Cotton_Market_Intelligence_Report_May2026.pdf',
  'Cotton_Analysis_Report_TN_Focus.pdf',
  'Yarn_Market_Intelligence_Report_2024_26.pdf'
];

const downloadsDir = 'c:\\Users\\RAMANAN\\Downloads';
const scratchDir = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch';

async function parseAll() {
  for (const file of files) {
    const filePath = path.join(downloadsDir, file);
    if (!fs.existsSync(filePath)) {
      console.log(`File not found: ${filePath}`);
      continue;
    }
    console.log(`Parsing ${file}...`);
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const uint8Array = new Uint8Array(dataBuffer);
      const parser = new pdf.PDFParse(uint8Array);
      const result = await parser.getText();
      // Normalize filename to prevent illegal characters
      const cleanFileName = file.replace(/[\s–]/g, '_').replace('.pdf', '_text.txt');
      const outputPath = path.join(scratchDir, cleanFileName);
      if (result.text) {
        fs.writeFileSync(outputPath, result.text, 'utf8');
        console.log(`Successfully parsed ${file}. Wrote to ${cleanFileName}. Length: ${result.text.length}`);
      } else {
        fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
        console.log(`Wrote JSON result to ${cleanFileName}`);
      }
    } catch (e) {
      console.error(`Error parsing ${file}:`, e);
    }
  }
}

parseAll();
