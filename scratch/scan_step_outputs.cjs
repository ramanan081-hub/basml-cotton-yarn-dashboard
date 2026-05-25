const fs = require('fs');
const path = require('path');

const stepsDir = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\steps';

function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      if (file === 'output.txt' || file === 'content.md') {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('App.jsx') || content.includes('PresentationDashboard')) {
          console.log(`Found relevant file: ${fullPath} (Size: ${stat.size} bytes)`);
          if (content.length > 50000) {
            console.log(`  This is a large file! First 200 chars: ${content.substring(0, 200).replace(/\r?\n/g, ' ')}`);
          }
        }
      }
    }
  }
}

scanDir(stepsDir);
