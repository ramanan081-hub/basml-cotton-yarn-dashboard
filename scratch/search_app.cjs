const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
const lines = code.split('\n');

console.log('Searching for "App" or "export default" in src/App.jsx:');
lines.forEach((line, index) => {
  if (line.includes('export default') || line.includes('function App') || line.includes('const App')) {
    console.log(`Line ${index + 1}: ${line.trim()}`);
  }
});
