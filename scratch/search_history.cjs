const fs = require('fs');
const path = require('path');

const historyDir = 'C:\\Users\\RAMANAN\\AppData\\Roaming\\Code\\User\\History';

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
      if (stat.size > 100000 && stat.size < 300000) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          if (content.includes('function App(') && content.includes('function IndiaDashboard(')) {
            console.log(`Found App.jsx backup in VS Code History: ${fullPath} (Size: ${stat.size} bytes, Modified: ${stat.mtime})`);
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }
}

if (fs.existsSync(historyDir)) {
  console.log("Searching VS Code History directory...");
  searchDir(historyDir);
} else {
  console.log("VS Code History directory does not exist.");
}
