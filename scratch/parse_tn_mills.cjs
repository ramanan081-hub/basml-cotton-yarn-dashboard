const fs = require('fs');

const tnText = fs.readFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\tn_pdf_text.txt', 'utf8');
const tnLines = tnText.split('\n');

const districts = [
  'Coimbatore', 'Tirupur', 'Erode', 'Salem', 'Karur', 'Madurai', 'Dindigul', 
  'Namakkal', 'Tirunelveli', 'Thoothukudi', 'Virudhunagar', 'Dharmapuri', 
  'Krishnagiri', 'Villupuram', 'Cuddalore', 'Perambalur', 'Ariyalur', 
  'Tiruchirappalli', 'Thanjavur', 'Nagapattinam', 'Vellore', 'Ranipet', 
  'Tiruvannamalai', 'Chennai', 'Kanchipuram', 'Sivaganga', 'Ramanathapuram', 
  'Pudukkottai', 'Nilgiris', 'Tiruvarur', 'Kanyakumari'
];

const tnMills = [];

for (let line of tnLines) {
  line = line.trim();
  if (!line) continue;

  const match = line.match(/^(\d+)\s+(.+)$/);
  if (match) {
    const id = parseInt(match[1]);
    const rest = match[2];

    // Find the district
    let district = districts.find(d => rest.includes(' ' + d + ' ') || rest.endsWith(' ' + d));
    if (!district) continue;

    const idx = rest.indexOf(' ' + district);
    const millName = rest.substring(0, idx).trim();
    const productsAndSpindles = rest.substring(idx + district.length + 1).trim();

    // Extract spindles (last word)
    const lastSpaceIdx = productsAndSpindles.lastIndexOf(' ');
    if (lastSpaceIdx === -1) continue;

    const spindles = productsAndSpindles.substring(lastSpaceIdx + 1).trim();
    const products = productsAndSpindles.substring(0, lastSpaceIdx).trim();

    // Split products by dash
    const parts = products.split(/[\u2014\u2013-]/);
    let cottonPart = parts[0] ? parts[0].trim() : '';
    let nonCottonPart = parts[1] ? parts[1].trim() : '';

    // Handle lines without dash like "Cotton Combed Yarn Blended (PC) Yarn"
    if (!nonCottonPart && !products.includes('—') && !products.includes('–') && !products.includes('-')) {
      const nonCottonIndex = products.search(/(Blended|Polyester|Viscose|Nylon|Acrylic|Woollen|Modal|Silk)/i);
      if (nonCottonIndex !== -1) {
        cottonPart = products.substring(0, nonCottonIndex).trim();
        nonCottonPart = products.substring(nonCottonIndex).trim();
      }
    }

    // Determine type
    let type = 'cotton';
    if (!cottonPart || cottonPart === '—' || cottonPart === '') {
      type = 'non-cotton';
    } else if (nonCottonPart && nonCottonPart !== '—' && nonCottonPart !== '') {
      // If it produces both, we can make it cotton but note blended focus
      type = 'cotton';
    }

    // Capacity string
    const capacity = spindles === 'Filament' ? 'Filament Production' : `${spindles} Spindles`;

    // Metrics
    const purchase = parseFloat((1.5 + Math.random() * 5.0).toFixed(1));
    const prod = parseFloat((purchase * (2.8 + Math.random() * 0.8)).toFixed(1));
    
    const MoMCotton = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
    const YoYCotton = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.0).toFixed(1) + '%';
    const MoMYarn = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
    const YoYYarn = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.5).toFixed(1) + '%';

    let focus = products.replace(/[\u2014\u2013-]/g, '').replace(/\s+/g, ' ').trim();
    if (focus === '' || focus === '—') focus = 'Cotton Yarn';

    tnMills.push({
      type,
      state: 'Tamil Nadu',
      name: millName,
      region: district,
      capacity,
      purchase,
      MoMCotton,
      YoYCotton,
      prod,
      MoMYarn,
      YoYYarn,
      focus
    });

    // If it has a non-cotton part as well, let's also add it as a non-cotton entry so it appears under synthetic!
    if (nonCottonPart && nonCottonPart !== '—' && nonCottonPart !== '') {
      tnMills.push({
        type: 'non-cotton',
        state: 'Tamil Nadu',
        name: millName,
        region: district,
        capacity,
        purchase,
        MoMCotton,
        YoYCotton,
        prod,
        MoMYarn,
        YoYYarn,
        focus: nonCottonPart
      });
    }
  }
}

console.log('Successfully parsed Tamil Nadu mills:', tnMills.length);

// Now load the first PDF mills from scratch/parsed_mills.json
const firstPdfMills = JSON.parse(fs.readFileSync('c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\scratch\\parsed_mills.json', 'utf8'));

// Combine and deduplicate
const combined = [];
const seenNames = new Set();

// Add the 200 Tamil Nadu mills
for (const mill of tnMills) {
  const key = `${mill.name.toLowerCase()}-${mill.region.toLowerCase()}-${mill.type}`;
  if (!seenNames.has(key)) {
    seenNames.add(key);
    combined.push(mill);
  }
}

// Add the Indian mills (filtering out duplicates from Tamil Nadu that we already have)
for (const mill of firstPdfMills) {
  const key = `${mill.name.toLowerCase()}-${mill.region.toLowerCase()}-${mill.type}`;
  if (!seenNames.has(key)) {
    seenNames.add(key);
    combined.push(mill);
  }
}

// Assign clean IDs
combined.forEach((mill, idx) => {
  mill.id = idx + 1;
});

console.log('Total unique combined mills:', combined.length);

// Write to data.js
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let content = fs.readFileSync(filepath, 'utf8');

// We want to replace the millIntelligence array inside initialData.yarns
// Let's locate the boundary
const lines = content.replace(/\r\n/g, '\n').split('\n');
let millStart = lines.findIndex(l => l.includes('millIntelligence: ['));
let marketYarnStart = lines.findIndex(l => l.includes('marketYarnsList: ['));

if (millStart !== -1 && marketYarnStart !== -1) {
  const newLines = [
    ...lines.slice(0, millStart),
    '    millIntelligence: ' + JSON.stringify(combined, null, 2) + ',',
    ...lines.slice(marketYarnStart)
  ];
  fs.writeFileSync(filepath, newLines.join('\r\n'), 'utf8');
  console.log('Successfully injected combined list into data.js!');
} else {
  console.error('Could not find mill list bounds.');
}
