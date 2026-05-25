const fs = require('fs');

let content = fs.readFileSync('src/components/YarnQualityDashboard.jsx', 'utf8');

// Replace card wrapper classes
content = content.replace(
  /className="bg-surface-container border border-outline-variant rounded-xl p-6"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding"'
);

content = content.replace(
  /className="bg-surface-container border border-outline-variant rounded-xl p-5 flex flex-col justify-between"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between"'
);

content = content.replace(
  /className="bg-surface-container border border-outline-variant rounded-xl p-4"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-4"'
);

// Save updated file
fs.writeFileSync('src/components/YarnQualityDashboard.jsx', content, 'utf8');
console.log('YarnQualityDashboard.jsx card classes replaced successfully.');
