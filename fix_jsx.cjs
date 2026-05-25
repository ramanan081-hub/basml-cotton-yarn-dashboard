const fs = require('fs');
const files = [
  './src/YarnAnalysisStitch.jsx',
  './src/QualityExpressionStitch.jsx',
  './src/HomeStitch.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/style=\{\{\s*fontVariationSettings:\s*''FILL'\s*1'\s*\}\}/g, "style={{ fontVariationSettings: \"'FILL' 1\" }}");
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed fontVariationSettings in JSX components.');
