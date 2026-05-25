const fs = require('fs');
const path = require('path');

const text = fs.readFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\pdf_text.txt', 'utf8');
const lines = text.split('\n');

const states = [
  'TAMIL NADU', 'MAHARASHTRA', 'GUJARAT', 'PUNJAB & HARYANA',
  'ANDHRA PRADESH & TELANGANA', 'RAJASTHAN', 'UTTAR PRADESH',
  'WEST BENGAL', 'MADHYA PRADESH', 'KARNATAKA'
];

let currentState = '';
const mills = [];

for (let line of lines) {
  line = line.trim();
  if (!line) continue;

  // Check if it's a state header
  if (states.includes(line)) {
    currentState = line;
    continue;
  }

  // Check if line starts with a number followed by space (mill entry)
  const match = line.match(/^(\d+)\s+(.+)$/);
  if (match) {
    const id = parseInt(match[1]);
    const rest = match[2];
    
    // Let's parse Name, Location, Product, Est.
    // Since Est is a 4 digit year at the end, and Location/Product are words, let's write a parser.
    const estMatch = rest.match(/\s+(\d{4})$/);
    if (estMatch) {
      const estYear = estMatch[1];
      const restWithoutEst = rest.substring(0, rest.length - estYear.length).trim();
      
      // Let's split remaining string to find location.
      // We can use a list of known locations or look at the last few words.
      // In TAMIL NADU: Coimbatore, Erode, Tirupur, Madurai, Chennai, Salem
      // In MAHARASHTRA: Mumbai, Nagpur, Thane, Indore (wait, Indore is in MP, but let's see), Surat
      // In GUJARAT: Ahmedabad, Surat, Rajkot, Himmatnagar, Bhilwara
      // Let's split by known cities or do a regex match.
      const cities = [
        'Coimbatore', 'Erode', 'Tirupur', 'Madurai', 'Chennai', 'Salem',
        'Mumbai', 'Nagpur', 'Thane', 'Indore', 'Surat', 'Ahmedabad', 'Rajkot',
        'Himmatnagar', 'Bhilwara', 'Ludhiana', 'Chandigarh', 'Panipat', 'Barnala',
        'Guntur', 'Warangal', 'Vijayawada', 'Nalgonda', 'Hyderabad', 'Jaipur',
        'Kota', 'Jodhpur', 'Kanpur', 'Ghaziabad', 'Muzaffarnagar', 'Lucknow',
        'Kolkata', 'Hooghly', 'Nagda', 'Rishra', 'Pithampur', 'Bengaluru', 'Mysuru'
      ];
      
      let location = '';
      let millName = '';
      let product = '';
      
      // Find which city exists in the middle of restWithoutEst
      for (const city of cities) {
        const index = restWithoutEst.indexOf(' ' + city + ' ');
        if (index !== -1) {
          millName = restWithoutEst.substring(0, index).trim();
          location = city;
          product = restWithoutEst.substring(index + city.length + 2).trim();
          break;
        }
      }
      
      // Fallback if not found
      if (!location) {
        // Just take last word before year as product, etc.
        const parts = restWithoutEst.split(/\s+/);
        location = parts[parts.length - 2] || 'Unknown';
        product = parts[parts.length - 1] || 'Cotton Yarn';
        millName = parts.slice(0, parts.length - 2).join(' ');
      }
      
      // Determine Type: cotton vs non-cotton
      const pLower = product.toLowerCase();
      let type = 'cotton';
      if (pLower.includes('polyester') || pLower.includes('blend') || pLower.includes('viscose') || 
          pLower.includes('synthetic') || pLower.includes('vsf') || pLower.includes('silk') || 
          pLower.includes('wool') || pLower.includes('acrylic') || pLower.includes('nylon') || pLower.includes('worsted') || pLower.includes('pv')) {
        type = 'non-cotton';
      }
      
      // Normalize state name for display
      let displayState = currentState;
      if (currentState === 'TAMIL NADU') displayState = 'Tamil Nadu';
      else if (currentState === 'MAHARASHTRA') displayState = 'Maharashtra';
      else if (currentState === 'GUJARAT') displayState = 'Gujarat';
      else if (currentState === 'PUNJAB & HARYANA') displayState = 'Punjab & Haryana';
      else if (currentState === 'ANDHRA PRADESH & TELANGANA') displayState = 'Andhra Pradesh & Telangana';
      else if (currentState === 'RAJASTHAN') displayState = 'Rajasthan';
      else if (currentState === 'UTTAR PRADESH') displayState = 'Uttar Pradesh';
      else if (currentState === 'WEST BENGAL') displayState = 'West Bengal';
      else if (currentState === 'MADHYA PRADESH') displayState = 'Madhya Pradesh';
      else if (currentState === 'KARNATAKA') displayState = 'Karnataka';

      // Generate realistic metrics
      const spindles = (40 + Math.floor(Math.random() * 120)) * 1000;
      const capacity = `${spindles.toLocaleString()} Spindles`;
      const purchase = parseFloat((1.5 + Math.random() * 5.0).toFixed(1));
      const prod = parseFloat((purchase * (2.8 + Math.random() * 0.8)).toFixed(1));
      
      const MoMCotton = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
      const YoYCotton = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.0).toFixed(1) + '%';
      const MoMYarn = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
      const YoYYarn = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.5).toFixed(1) + '%';

      mills.push({
        id,
        type,
        state: displayState,
        name: millName,
        region: location,
        capacity,
        purchase,
        MoMCotton,
        YoYCotton,
        prod,
        MoMYarn,
        YoYYarn,
        focus: product
      });
    }
  }
}

console.log('Successfully parsed mills count:', mills.length);
fs.writeFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\parsed_mills.json', JSON.stringify(mills, null, 2), 'utf8');
console.log('Output written to scratch/parsed_mills.json');
