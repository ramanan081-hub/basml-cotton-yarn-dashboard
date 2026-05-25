// Polyfill DOMMatrix for node environment before loading pdf-parse
global.DOMMatrix = class DOMMatrix {
  constructor(init) {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
  }
};

const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'c:\\Users\\RAMANAN\\Downloads\\TamilNadu_200_Spinning_Mills.pdf';
const dataBuffer = fs.readFileSync(pdfPath);
const uint8Array = new Uint8Array(dataBuffer);

const parser = new pdf.PDFParse(uint8Array);
parser.getText().then(result => {
  console.log('Successfully called getText()!');
  if (result.text) {
    fs.writeFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\tn_pdf_text.txt', result.text, 'utf8');
    console.log('Wrote text to scratch/tn_pdf_text.txt');
  } else {
    fs.writeFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\tn_pdf_text.txt', JSON.stringify(result, null, 2), 'utf8');
    console.log('Wrote full result object to scratch/tn_pdf_text.txt');
  }
}).catch(err => {
  console.error('Error calling getText():', err);
});
