const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain';

function searchDir(dir) {
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
      searchDir(fullPath);
    } else if (stat.isFile()) {
      // Skip very large files or binary files except transcript
      if (file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.webm') || file.endsWith('.zip')) {
        continue;
      }
      if (stat.size > 10 * 1024 * 1024) {
        continue;
      }

      try {
        const content = fs.readFileSync(fullPath, 'utf8');
        if (content.includes('GlobalDashboard')) {
          console.log(`Found in: ${fullPath} (Size: ${stat.size} bytes)`);
        }
      } catch (e) {
        // ignore
      }
    }
  }
}

console.log("Searching brain directory for 'GlobalDashboard'...");
searchDir(brainDir);
console.log("Search complete.");
