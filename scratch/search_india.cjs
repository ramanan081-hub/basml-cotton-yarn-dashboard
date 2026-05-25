const fs = require('fs');
const bundle = fs.readFileSync('dist/assets/index-D2AN5NCu.js', 'utf8');

// Search for Rq definition. Typically it's defined like `function Rq(` or `const Rq =` or `Rq = (`
// Let's search for "function Rq"
let idx = bundle.indexOf("function Rq");
if (idx !== -1) {
  console.log('Found function Rq at', idx);
  console.log(bundle.substring(idx, idx + 8000));
} else {
  // Let's look for "Rq(" or similar
  let idx2 = bundle.indexOf("Rq(");
  console.log('Found Rq( at', idx2);
}
