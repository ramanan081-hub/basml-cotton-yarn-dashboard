const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
const lines = code.split('\n');

console.log('Searching for dashboard declarations:');
lines.forEach((line, index) => {
  if (line.includes('function') || line.includes('const')) {
    if (line.includes('Dashboard') || line.includes('App') || line.includes('LiveNews')) {
      console.log(`Line ${index + 1}: ${line.trim()}`);
    }
  }
});
