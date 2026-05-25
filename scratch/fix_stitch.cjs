const fs = require('fs');

const appPath = 'src/App.jsx';
const code = fs.readFileSync(appPath, 'utf8').replace(/\r\n/g, '\n');
const lines = code.split('\n');

// Delete lines 486 to 499 (1-indexed, so indices 485 to 498)
const newLines = [
  ...lines.slice(0, 485),
  ...lines.slice(499)
];

fs.writeFileSync(appPath, newLines.join('\n'), 'utf8');
console.log('Deleted duplicate lines 486-499 in src/App.jsx');
