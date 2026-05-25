const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(
  '📊 Monitored Major Spinners: 301 (PDF Combined Database)',
  '📊 Monitored Major Spinners: 302 (PDF Combined Database)'
);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully updated spinners badge count to 302 in App.jsx!');
