const fs = require('fs');
const files = [
  './src/YarnAnalysisStitch.jsx',
  './src/QualityExpressionStitch.jsx',
  './src/HomeStitch.jsx'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Fix background-image quotes
    content = content.replace(/backgroundImage:\s*'url\('([^']+)'\)'/g, "backgroundImage: `url('${$1}')`");
    fs.writeFileSync(file, content);
  }
});
console.log('Fixed background image quotes in JSX components.');
