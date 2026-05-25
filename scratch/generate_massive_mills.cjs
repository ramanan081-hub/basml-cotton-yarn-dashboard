const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Inject the generateMills function definition right after '// src/data.js'
const functionDefinition = `
function generateMills() {
  const states = {
    'Tamil Nadu': ['Coimbatore', 'Tirupur', 'Dindigul', 'Erode', 'Salem', 'Madurai', 'Virudhunagar', 'Rajapalayam', 'Karur', 'Namakkal', 'Tirunelveli'],
    'Maharashtra': ['Bhiwandi', 'Ichalkaranji', 'Nagpur', 'Solapur', 'Kolhapur', 'Malegaon'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Rajkot', 'Vadodara', 'Morbi', 'Wankaner'],
    'Telangana': ['Warangal', 'Karimnagar', 'Adilabad', 'Hyderabad'],
    'Rajasthan': ['Bhilwara', 'Jaipur', 'Kishangarh', 'Jodhpur'],
    'Madhya Pradesh': ['Indore', 'Ujjain', 'Dewas', 'Bhopal']
  };

  const prefixes = [
    'Sri', 'Sree', 'KPR', 'Suryavanshi', 'Vardhman', 'Arvind', 'Welspun', 'Sangam', 'Loyal', 'Premier', 
    'Pioneer', 'Lakshmi', 'Murugan', 'Venkateswara', 'Super', 'Ganesh', 'Lotus', 'Ganga', 'Krishna', 
    'Rudra', 'Kaveri', 'Saravana', 'Sakthi', 'Annamalai', 'Palani', 'Kongu', 'Standard', 'Apex', 
    'Classic', 'Golden', 'Diamond', 'National', 'United', 'Universal', 'Imperial', 'Kailash', 
    'Raja', 'Subhashree', 'Ramakrishna', 'Vijay', 'Jayanti', 'Siva', 'Maruthi', 'Jagat', 'Balaji'
  ];

  const types = ['Spinning Mills', 'Cotton Mills', 'Textile Mills', 'Spinners', 'Yarns', 'Industries'];

  const mills = [];
  let id = 1;

  for (let i = 0; i < 130; i++) {
    const stateNames = Object.keys(states);
    const state = Math.random() < 0.55 ? 'Tamil Nadu' : stateNames[Math.floor(Math.random() * stateNames.length)];
    const regions = states[state];
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const typeName = types[Math.floor(Math.random() * types.length)];
    const name = \`\${prefix} \${region} \${typeName}\`;
    
    const spindles = (40 + Math.floor(Math.random() * 120)) * 1000;
    const capacity = \`\${spindles.toLocaleString()} Spindles\`;
    const purchase = parseFloat((1.5 + Math.random() * 5.0).toFixed(1));
    const prod = parseFloat((purchase * (2.8 + Math.random() * 0.8)).toFixed(1));
    
    const MoMCotton = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
    const YoYCotton = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.0).toFixed(1) + '%';
    const MoMYarn = (Math.random() > 0.35 ? '+' : '-') + (0.5 + Math.random() * 3.5).toFixed(1) + '%';
    const YoYYarn = (Math.random() > 0.25 ? '+' : '-') + (1.0 + Math.random() * 9.5).toFixed(1) + '%';
    
    const counts = [
      '30s/40s Combed Hosiery', '20s/30s Carded Knitting', '60s/80s Compact ELS', 
      '10s-16s Open End Cotton', '40s Compact Weaving', '20s/30s Open End', 
      '30s Combed Cotton', '30s/40s Carded Weaving', '80s/100s Compact ELS'
    ];
    const focus = counts[Math.floor(Math.random() * counts.length)];

    mills.push({
      id: id++,
      type: 'cotton',
      state,
      name,
      region,
      capacity,
      purchase,
      MoMCotton,
      YoYCotton,
      prod,
      MoMYarn,
      YoYYarn,
      focus
    });
  }

  for (let i = 0; i < 70; i++) {
    const stateNames = Object.keys(states);
    const state = Math.random() < 0.45 ? 'Tamil Nadu' : stateNames[Math.floor(Math.random() * stateNames.length)];
    const regions = states[state];
    const region = regions[Math.floor(Math.random() * regions.length)];
    
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const name = \`\${prefix} Synthetic & Blended Yarns (\${region})\`;
    
    const spindles = (30 + Math.floor(Math.random() * 90)) * 1000;
    const capacity = \`\${spindles.toLocaleString()} Spindles Equivalent\`;
    const purchase = parseFloat((1.0 + Math.random() * 4.5).toFixed(1));
    const prod = parseFloat((purchase * (2.5 + Math.random() * 0.7)).toFixed(1));
    
    const MoMCotton = (Math.random() > 0.3 ? '+' : '-') + (0.8 + Math.random() * 4.0).toFixed(1) + '%';
    const YoYCotton = (Math.random() > 0.2 ? '+' : '-') + (2.0 + Math.random() * 11.0).toFixed(1) + '%';
    const MoMYarn = (Math.random() > 0.3 ? '+' : '-') + (0.8 + Math.random() * 4.0).toFixed(1) + '%';
    const YoYYarn = (Math.random() > 0.2 ? '+' : '-') + (2.0 + Math.random() * 12.0).toFixed(1) + '%';
    
    const counts = [
      '30s/40s PV Blended', '30s 100% Viscose', '150D Poly Textured', 
      '30s/40s PC Blended', '48/52 PV Suiting Counts', '75D Polyester Filaments'
    ];
    const focus = counts[Math.floor(Math.random() * counts.length)];

    mills.push({
      id: id++,
      type: 'non-cotton',
      state,
      name,
      region,
      capacity,
      purchase,
      MoMCotton,
      YoYCotton,
      prod,
      MoMYarn,
      YoYYarn,
      focus
    });
  }

  return mills;
}
`;

content = content.replace('// src/data.js', '// src/data.js' + functionDefinition);

// 2. Locate and replace the hardcoded millIntelligence array in content
const lines = content.replace(/\r\n/g, '\n').split('\n');
let millStart = lines.findIndex(l => l.includes('millIntelligence: ['));
let marketYarnStart = lines.findIndex(l => l.includes('marketYarnsList: ['));

console.log('Replacing mill array between lines:', millStart, 'and', marketYarnStart);

if (millStart !== -1 && marketYarnStart !== -1) {
  const newLines = [
    ...lines.slice(0, millStart),
    '    millIntelligence: generateMills(),',
    ...lines.slice(marketYarnStart)
  ];
  fs.writeFileSync(filepath, newLines.join('\r\n'), 'utf8');
  console.log('Successfully injected massive mill generator!');
} else {
  console.error('Could not find mill list bounds.');
}
