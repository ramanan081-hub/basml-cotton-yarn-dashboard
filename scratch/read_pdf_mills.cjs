const fs = require('fs');
const pdf = require('pdf-parse');

const pdfPath = 'c:\\Users\\RAMANAN\\Downloads\\Indian_Spinning_Mills_List.pdf';
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function(data) {
  console.log('PDF parsed successfully! Pages:', data.numpages);
  fs.writeFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\pdf_text.txt', data.text, 'utf8');
  console.log('Extracted text written to scratch/pdf_text.txt');
}).catch(err => {
  console.error('Error parsing PDF:', err);
});
