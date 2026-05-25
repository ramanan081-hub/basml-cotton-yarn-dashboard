const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(
  'Tamil Nadu mills with >70%',
  'Tamil Nadu mills with &gt;70%'
);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully fixed unescaped > character in App.jsx!');
