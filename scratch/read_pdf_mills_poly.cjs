// Polyfill DOMMatrix for node environment before loading pdf-parse
global.DOMMatrix = class DOMMatrix {
  constructor(init) {
    this.a = 1; this.b = 0; this.c = 0; this.d = 1; this.e = 0; this.f = 0;
  }
};

const pdf = require('pdf-parse');
console.log('keys:', Object.keys(pdf));
if (pdf.PDFParse) {
  console.log('PDFParse constructor:', pdf.PDFParse.toString());
}
