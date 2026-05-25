const fs = require('fs');

const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Locate the millIntelligence array inside content
const lines = content.replace(/\r\n/g, '\n').split('\n');
let millStart = lines.findIndex(l => l.includes('millIntelligence: ['));
let marketYarnStart = lines.findIndex(l => l.includes('marketYarnsList: ['));

if (millStart === -1 || marketYarnStart === -1) {
  console.error('Could not find mill list bounds.');
  process.exit(1);
}

// Extract the string representing the array
const arrayString = lines.slice(millStart, marketYarnStart).join('\n')
  .replace('millIntelligence:', '')
  .trim()
  .replace(/,$/, ''); // remove trailing comma

let mills = eval(arrayString); // Evaluate the JS array expression safely since it is local static data

console.log('Loaded mills to verify:', mills.length);

// City to State Lookup Map
const cityToState = {
  // Tamil Nadu Districts/Cities
  'Coimbatore': 'Tamil Nadu',
  'Erode': 'Tamil Nadu',
  'Tirupur': 'Tamil Nadu',
  'Madurai': 'Tamil Nadu',
  'Chennai': 'Tamil Nadu',
  'Salem': 'Tamil Nadu',
  'Virudhunagar': 'Tamil Nadu',
  'Rajapalayam': 'Tamil Nadu',
  'Karur': 'Tamil Nadu',
  'Namakkal': 'Tamil Nadu',
  'Tirunelveli': 'Tamil Nadu',
  'Thoothukudi': 'Tamil Nadu',
  'Tuticorin': 'Tamil Nadu',
  'Dharmapuri': 'Tamil Nadu',
  'Krishnagiri': 'Tamil Nadu',
  'Villupuram': 'Tamil Nadu',
  'Cuddalore': 'Tamil Nadu',
  'Perambalur': 'Tamil Nadu',
  'Ariyalur': 'Tamil Nadu',
  'Tiruchirappalli': 'Tamil Nadu',
  'Trichy': 'Tamil Nadu',
  'Thanjavur': 'Tamil Nadu',
  'Nagapattinam': 'Tamil Nadu',
  'Vellore': 'Tamil Nadu',
  'Ranipet': 'Tamil Nadu',
  'Tiruvannamalai': 'Tamil Nadu',
  'Kanchipuram': 'Tamil Nadu',
  'Sivaganga': 'Tamil Nadu',
  'Ramanathapuram': 'Tamil Nadu',
  'Ramnad': 'Tamil Nadu',
  'Pudukkottai': 'Tamil Nadu',
  'Nilgiris': 'Tamil Nadu',
  'Ooty': 'Tamil Nadu',
  'Gudalur': 'Tamil Nadu',
  'Coonoor': 'Tamil Nadu',
  'Tiruvarur': 'Tamil Nadu',
  'Kanyakumari': 'Tamil Nadu',
  'Nagercoil': 'Tamil Nadu',
  'Marthandam': 'Tamil Nadu',
  'Oddanchatram': 'Tamil Nadu',
  'Batlagundu': 'Tamil Nadu',
  'Natham': 'Tamil Nadu',
  'Vadipatti': 'Tamil Nadu',
  'Usilampatti': 'Tamil Nadu',
  'Pollachi': 'Tamil Nadu',
  'Paramathi': 'Tamil Nadu',
  'Aliyar': 'Tamil Nadu',
  'Annur': 'Tamil Nadu',
  'Mettupalayam': 'Tamil Nadu',
  'Sulur': 'Tamil Nadu',
  'Anamalais': 'Tamil Nadu',
  'Palladam': 'Tamil Nadu',
  'Avinashi': 'Tamil Nadu',
  'Kangeyam': 'Tamil Nadu',
  'Dharapuram': 'Tamil Nadu',
  'Uthukuli': 'Tamil Nadu',
  'Vellakoil': 'Tamil Nadu',
  'Gudimangalam': 'Tamil Nadu',
  'Bhavani': 'Tamil Nadu',
  'Gobichettipalayam': 'Tamil Nadu',
  'Sathyamangalam': 'Tamil Nadu',
  'Perundurai': 'Tamil Nadu',
  'Nambiyur': 'Tamil Nadu',
  'Anthiyur': 'Tamil Nadu',
  'Pallipalayam': 'Tamil Nadu',

  // Maharashtra Cities
  'Mumbai': 'Maharashtra',
  'Thane': 'Maharashtra',
  'Bhiwandi': 'Maharashtra',
  'Ichalkaranji': 'Maharashtra',
  'Nagpur': 'Maharashtra',
  'Solapur': 'Maharashtra',
  'Kolhapur': 'Maharashtra',
  'Malegaon': 'Maharashtra',

  // Gujarat Cities
  'Ahmedabad': 'Gujarat',
  'Surat': 'Gujarat',
  'Rajkot': 'Gujarat',
  'Vadodara': 'Gujarat',
  'Morbi': 'Gujarat',
  'Wankaner': 'Gujarat',
  'Himmatnagar': 'Gujarat',

  // Punjab & Haryana Cities
  'Ludhiana': 'Punjab & Haryana',
  'Chandigarh': 'Punjab & Haryana',
  'Panipat': 'Punjab & Haryana',
  'Barnala': 'Punjab & Haryana',

  // Andhra Pradesh & Telangana Cities
  'Hyderabad': 'Andhra Pradesh & Telangana',
  'Guntur': 'Andhra Pradesh & Telangana',
  'Vijayawada': 'Andhra Pradesh & Telangana',
  'Nalgonda': 'Andhra Pradesh & Telangana',
  'Warangal': 'Andhra Pradesh & Telangana',
  'Karimnagar': 'Andhra Pradesh & Telangana',
  'Adilabad': 'Andhra Pradesh & Telangana',

  // Rajasthan Cities
  'Bhilwara': 'Rajasthan',
  'Jaipur': 'Rajasthan',
  'Kota': 'Rajasthan',
  'Jodhpur': 'Rajasthan',
  'Kishangarh': 'Rajasthan',

  // Uttar Pradesh Cities
  'Kanpur': 'Uttar Pradesh',
  'Ghaziabad': 'Uttar Pradesh',
  'Muzaffarnagar': 'Uttar Pradesh',
  'Lucknow': 'Uttar Pradesh',

  // West Bengal Cities
  'Kolkata': 'West Bengal',
  'Hooghly': 'West Bengal',
  'Rishra': 'West Bengal',

  // Madhya Pradesh Cities
  'Indore': 'Madhya Pradesh',
  'Nagda': 'Madhya Pradesh',
  'Pithampur': 'Madhya Pradesh',
  'Ujjain': 'Madhya Pradesh',
  'Dewas': 'Madhya Pradesh',
  'Bhopal': 'Madhya Pradesh',

  // Karnataka Cities
  'Bengaluru': 'Karnataka',
  'Mysuru': 'Karnataka'
};

mills.forEach(mill => {
  // 1. Correct State based on Region (City)
  const realState = cityToState[mill.region];
  if (realState && mill.state !== realState) {
    console.log(`Correcting state for ${mill.name} (${mill.region}): ${mill.state} -> ${realState}`);
    mill.state = realState;
  }

  // 2. Clean Mill Name
  if (mill.name === 'National Textile Corp. –') {
    mill.name = 'National Textile Corp. (Nagpur Group)';
  } else if (mill.name.endsWith(' –')) {
    mill.name = mill.name.replace(/\s+–$/, '');
  }

  // 3. Clean Focus / Product names
  if (mill.focus === 'Group Nagpur Cotton Yarn') {
    mill.focus = 'Cotton Yarn';
  } else if (mill.focus.includes('VSF / Viscose')) {
    mill.focus = 'VSF & Viscose Spun Yarn';
  } else if (mill.focus.includes('Silk / Blend')) {
    mill.focus = 'Silk Blended Yarn';
  } else if (mill.focus.includes('Wool / Worsted')) {
    mill.focus = 'Wool & Worsted Yarn';
  } else if (mill.focus.includes('Polyester / Blend')) {
    mill.focus = 'Polyester Blended Yarn';
  } else if (mill.focus === 'Cotton Combed, Carded Yarn —') {
    mill.focus = 'Cotton Combed & Carded Yarn';
  }

  // 4. Clean capacity label if it doesn't end with Spindles or equivalent
  if (typeof mill.capacity === 'string') {
    if (!mill.capacity.toLowerCase().includes('spindles') && !mill.capacity.toLowerCase().includes('rotor') && !mill.capacity.toLowerCase().includes('filament')) {
      mill.capacity = mill.capacity + ' Spindles';
    }
  }
});

// Re-write back into content
const newLines = [
  ...lines.slice(0, millStart),
  '    millIntelligence: ' + JSON.stringify(mills, null, 2) + ',',
  ...lines.slice(marketYarnStart)
];

fs.writeFileSync(filepath, newLines.join('\n').replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully cleaned and verified all mill data!');
