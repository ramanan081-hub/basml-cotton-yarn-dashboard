const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let content = fs.readFileSync(filepath, 'utf8');

// Insert millIntelligence array inside initialData.yarns
const millIntelligenceData = `    millIntelligence: [
      // Cotton Mills
      { id: 1, type: 'cotton', state: 'Tamil Nadu', name: 'Coimbatore Cotton Mills Ltd', region: 'Coimbatore', capacity: '120,000 Spindles', purchase: 4.2, MoMCotton: '+3.2%', YoYCotton: '+9.5%', prod: 15.2, MoMYarn: '+2.8%', YoYYarn: '+10.2%', focus: '30s/40s Combed Hosiery' },
      { id: 2, type: 'cotton', state: 'Tamil Nadu', name: 'Tirupur Hosiery Spinners', region: 'Tirupur', capacity: '95,000 Spindles', purchase: 3.8, MoMCotton: '+2.1%', YoYCotton: '+8.8%', prod: 12.8, MoMYarn: '+2.4%', YoYYarn: '+9.1%', focus: '20s/30s Carded Knitting' },
      { id: 3, type: 'cotton', state: 'Tamil Nadu', name: 'Dindigul Fine Counts Spinning', region: 'Dindigul', capacity: '80,000 Spindles', purchase: 2.8, MoMCotton: '+1.5%', YoYCotton: '+6.4%', prod: 8.5, MoMYarn: '+1.8%', YoYYarn: '+7.0%', focus: '60s/80s Compact ELS' },
      { id: 4, type: 'cotton', state: 'Tamil Nadu', name: 'Erode Open-End Spinners', region: 'Erode', capacity: '45,000 Rotors', purchase: 1.9, MoMCotton: '+0.8%', YoYCotton: '-1.2%', prod: 6.2, MoMYarn: '+1.0%', YoYYarn: '-0.5%', focus: '10s-16s Open End Cotton' },
      { id: 5, type: 'cotton', state: 'Gujarat', name: 'Gujarat Apex Cotton Spinners', region: 'Ahmedabad', capacity: '150,000 Spindles', purchase: 5.5, MoMCotton: '+4.1%', YoYCotton: '+11.2%', prod: 18.5, MoMYarn: '+3.8%', YoYYarn: '+11.5%', focus: '30s/40s Compact Weaving' },
      { id: 6, type: 'cotton', state: 'Gujarat', name: 'Saurashtra Textile Mills', region: 'Rajkot', capacity: '110,000 Spindles', purchase: 3.9, MoMCotton: '+2.8%', YoYCotton: '+7.5%', prod: 12.4, MoMYarn: '+2.2%', YoYYarn: '+8.0%', focus: '24s Carded Weaving' },
      { id: 7, type: 'cotton', state: 'Maharashtra', name: 'Deccan Cotton & Hosiery Mills', region: 'Ichalkaranji', capacity: '115,000 Spindles', purchase: 4.1, MoMCotton: '+1.9%', YoYCotton: '+5.8%', prod: 13.5, MoMYarn: '+1.6%', YoYYarn: '+6.2%', focus: '30s/40s Carded Weaving' },
      { id: 8, type: 'cotton', state: 'Maharashtra', name: 'Vidarbha Co-op Spinners', region: 'Nagpur', capacity: '75,000 Spindles', purchase: 2.4, MoMCotton: '+1.2%', YoYCotton: '+3.0%', prod: 7.8, MoMYarn: '+1.0%', YoYYarn: '+3.4%', focus: '20s/30s Open End' },
      { id: 9, type: 'cotton', state: 'Telangana', name: 'Warangal Cotton Industry', region: 'Warangal', capacity: '85,000 Spindles', purchase: 2.9, MoMCotton: '-0.5%', YoYCotton: '+2.2%', prod: 9.1, MoMYarn: '-0.3%', YoYYarn: '+2.5%', focus: '30s Combed Cotton' },
      { id: 10, type: 'cotton', state: 'Rajasthan', name: 'Marwar Premium Cotton Spinners', region: 'Jaipur', capacity: '90,000 Spindles', purchase: 3.0, MoMCotton: '+1.5%', YoYCotton: '-2.0%', prod: 9.4, MoMYarn: '+1.2%', YoYYarn: '-1.5%', focus: '30s/40s Carded' },
      { id: 11, type: 'cotton', state: 'Madhya Pradesh', name: 'Malwa Cotton & Spinning Corp', region: 'Indore', capacity: '105,000 Spindles', purchase: 3.6, MoMCotton: '+0.8%', YoYCotton: '+3.4%', prod: 11.2, MoMYarn: '+0.5%', YoYYarn: '+3.8%', focus: '40s Compact Weaving' },
      
      // Non-Cotton Mills
      { id: 12, type: 'non-cotton', state: 'Tamil Nadu', name: 'Pallipalayam Synthetic Yarns', region: 'Erode', capacity: '75,000 Spindles', purchase: 2.8, MoMCotton: '+4.2%', YoYCotton: '+12.5%', prod: 8.9, MoMYarn: '+4.5%', YoYYarn: '+13.0%', focus: '30s/40s PV Blended' },
      { id: 13, type: 'non-cotton', state: 'Tamil Nadu', name: 'Salem Viscose Spinners', region: 'Salem', capacity: '60,000 Spindles', purchase: 2.2, MoMCotton: '+2.5%', YoYCotton: '+8.0%', prod: 7.1, MoMYarn: '+2.8%', YoYYarn: '+8.5%', focus: '30s 100% Viscose' },
      { id: 14, type: 'non-cotton', state: 'Gujarat', name: 'Surat Polyester Filaments Ltd', region: 'Surat', capacity: '180,000 Spd Equiv', purchase: 6.8, MoMCotton: '+5.0%', YoYCotton: '+14.2%', prod: 22.4, MoMYarn: '+5.2%', YoYYarn: '+14.8%', focus: '150D Poly Textured' },
      { id: 15, type: 'non-cotton', state: 'Maharashtra', name: 'Bhiwandi Blend Spinners', region: 'Bhiwandi', capacity: '110,000 Spindles', purchase: 4.0, MoMCotton: '+3.1%', YoYCotton: '+9.0%', prod: 12.8, MoMYarn: '+3.4%', YoYYarn: '+9.5%', focus: '30s/40s PC Blended' },
      { id: 16, type: 'non-cotton', state: 'Rajasthan', name: 'Bhilwara PV Spinners Coalition', region: 'Bhilwara', capacity: '140,000 Spindles', purchase: 5.2, MoMCotton: '+1.8%', YoYCotton: '+4.5%', prod: 16.5, MoMYarn: '+2.0%', YoYYarn: '+4.8%', focus: '48/52 PV Suiting Counts' }
    ],`;

content = content.replace('    marketYarnsList: [', millIntelligenceData + '\n    marketYarnsList: [');

// Insert logic inside generateUpdatedData
const updateLogic = `  if (updated.yarns.millIntelligence) {
    updated.yarns.millIntelligence.forEach(m => {
      m.purchase = parseFloat((m.purchase + (Math.random() * 0.2 - 0.1)).toFixed(1));
      m.prod = parseFloat((m.prod + (Math.random() * 0.5 - 0.25)).toFixed(1));
    });
  }`;

const districtCompareBlock = `  if (updated.yarns.districtComparison) {
    updated.yarns.districtComparison.forEach(item => {
      item.purchaseBales = parseFloat((item.purchaseBales + (Math.random() * 0.2 - 0.1)).toFixed(1));
      item.prodMkg = parseFloat((item.prodMkg + (Math.random() * 0.6 - 0.3)).toFixed(1));
    });
  }`;

content = content.replace(districtCompareBlock, districtCompareBlock + '\n\n' + updateLogic);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully updated data.js with millIntelligence and update simulation!');
