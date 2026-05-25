// Polyfill DOMMatrix for node environment before loading pdf-parse
global.DOMMatrix = class DOMMatrix {
  constructor(init) {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
  }
};

const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'c:\\Users\\RAMANAN\\Downloads\\Indian_Spinning_Mills_List.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new pdf.PDFParse(dataBuffer);
console.log('Instance properties:', Object.keys(parser));
console.log('Prototype properties:', Object.getOwnPropertyNames(Object.getPrototypeOf(parser)));
