const fs = require('fs');
const bundle = fs.readFileSync('dist/assets/index-D2AN5NCu.js', 'utf8');

let idx = bundle.indexOf("BASML ANALYTICS");
if (idx !== -1) {
  console.log('Found BASML ANALYTICS at', idx);
  // Let's print from idx - 2000 to idx + 8000
  const chunk = bundle.substring(idx - 2000, idx + 8000);
  fs.writeFileSync('scratch/search_built.cjs', chunk, 'utf-8');
  console.log('Saved to scratch/search_built.cjs');
}
