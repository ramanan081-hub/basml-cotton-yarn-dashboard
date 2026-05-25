const fs = require('fs');
const path = require('path');

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      search(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      const code = fs.readFileSync(fullPath, 'utf8');
      if (code.includes('GlobalDashboard')) {
        console.log(`Found "GlobalDashboard" in ${fullPath}`);
        // Let's print lines matching it
        const lines = code.split('\n');
        lines.forEach((line, index) => {
          if (line.includes('GlobalDashboard')) {
            console.log(`  Line ${index + 1}: ${line.trim()}`);
          }
        });
      }
    }
  }
}

search('src');
