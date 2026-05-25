const fs = require('fs');
try {
  const xlsx = require('xlsx');
  console.log('xlsx library is available!');
} catch (e) {
  console.log('xlsx library is NOT available:', e.message);
}
