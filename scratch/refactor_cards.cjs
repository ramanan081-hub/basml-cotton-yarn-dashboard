const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace standard card classes
content = content.replace(
  /className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding'
);

content = content.replace(
  /className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg flex flex-col justify-between/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between'
);

content = content.replace(
  /className="bg-surface-container-lowest border border-outline-variant p-6 rounded-lg flex flex-col justify-center/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-center'
);

content = content.replace(
  /className="glass-card rounded-xl p-6 h-\[480px\] flex flex-col justify-between"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding h-[480px] flex flex-col justify-between"'
);

content = content.replace(
  /className="glass-card rounded-xl p-3 mt-4"/g,
  'className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-3 mt-4"'
);

// Save updated file
fs.writeFileSync('src/App.jsx', content, 'utf8');
console.log('App.jsx card classes replaced successfully.');
