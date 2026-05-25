const fs = require('fs');

let content = fs.readFileSync('src/components/LiveNews.jsx', 'utf8');

// Replace card wrapper classes
content = content.replace(
  /className="bg-surface-container-low border border-outline-variant rounded-xl p-6"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding"'
);

content = content.replace(
  /className="bg-surface-container-low border border-outline-variant rounded-xl p-4"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-4"'
);

// Save updated file
fs.writeFileSync('src/components/LiveNews.jsx', content, 'utf8');
console.log('LiveNews.jsx card classes replaced successfully.');
