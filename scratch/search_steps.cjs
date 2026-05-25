const fs = require('fs');
const path = require('path');

const stepsDir = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\steps';

function search(dir) {
  let files;
  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    return;
  }

  for (const file of files) {
    const fullPath = path.join(dir, file);
    let stat;
    try {
      stat = fs.statSync(fullPath);
    } catch (e) {
      continue;
    }

    if (stat.isDirectory()) {
      search(fullPath);
    } else if (stat.isFile()) {
      if (stat.size > 20000 && stat.size < 500000) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('function App(') || content.includes('function IndiaDashboard(')) {
            console.log(`Found match in step file: ${fullPath} (Size: ${stat.size} bytes)`);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
}

console.log("Searching steps directory...");
search(stepsDir);
console.log("Done.");
