const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Update stats badge to 100 Monitored Spinners
content = content.replace(
  '📊 Monitored Major Spinners: 16 (Top Capacity Profiles)',
  '📊 Monitored Major Spinners: 100 (Direct PDF Import)'
);

// 2. Update states filter buttons array
const oldStatesLine = "            {['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Telangana', 'Rajasthan', 'Madhya Pradesh'].map(st => (";
const newStatesLine = "            {['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Punjab & Haryana', 'Andhra Pradesh & Telangana', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh', 'Karnataka'].map(st => (";

content = content.replace(oldStatesLine, newStatesLine);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully updated state filters and stats badge in App.jsx!');
