const fs = require('fs');
const path = require('path');

function search(dir) {
  fs.readdirSync(dir).forEach(file => {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      if (file !== 'node_modules' && file !== 'dist' && file !== '.git') {
        search(full);
      }
    } else if (full.endsWith('.jsx') || full.endsWith('.js')) {
      const content = fs.readFileSync(full, 'utf8');
      
      const matches = [];
      const srcRegex = /src\s*=\s*[{]?['"`]([^'"`}]+)['"`][}]?/g;
      let match;
      while ((match = srcRegex.exec(content)) !== null) {
        matches.push(`src: ${match[1]}`);
      }
      
      const urlRegex = /url\s*\(\s*['"`]?([^'")`]+)['"`]?\s*\)/g;
      while ((match = urlRegex.exec(content)) !== null) {
        matches.push(`url: ${match[1]}`);
      }
      
      if (matches.length > 0) {
        console.log(full + ':');
        matches.forEach(m => console.log('  ' + m));
      }
    }
  });
}

search('.');
