const fs = require('fs');
const code = fs.readFileSync('src/App.jsx', 'utf8');
const lines = code.split('\n');

console.log('App.jsx total lines:', lines.length);

const functionRegex = /function\s+(\w+)\s*\(/g;
let match;
const functions = [];

while ((match = functionRegex.exec(code)) !== null) {
  const index = match.index;
  const lineNo = code.substring(0, index).split('\n').length;
  functions.push({ name: match[1], line: lineNo });
}

functions.sort((a, b) => a.line - b.line);

for (let i = 0; i < functions.length; i++) {
  const current = functions[i];
  const next = functions[i + 1];
  const endLine = next ? next.line - 1 : lines.length;
  console.log(`- Function: ${current.name} (Lines ${current.line} to ${endLine})`);
}
