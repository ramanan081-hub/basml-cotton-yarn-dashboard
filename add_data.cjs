const fs = require('fs');

// Add to analysisData.js
let analysisContent = fs.readFileSync('./src/analysisData.js', 'utf8');

// Cotton
if (!analysisContent.includes("'J-34'")) {
    analysisContent = analysisContent.replace(
        "types: ['Shankar-6 (S-6)', 'MCU-5', 'DCH-32 / Suvin', 'ICE Cotton No. 2 (INR Equiv)'],",
        "types: ['Shankar-6 (S-6)', 'MCU-5', 'DCH-32 / Suvin', 'ICE Cotton No. 2 (INR Equiv)', 'J-34', 'US Pima'],"
    );

    const j34Data = `
    'J-34': {
      staple: '25-27mm (Medium Staple)',
      origin: 'Punjab, Haryana & Rajasthan',
      description: 'J-34 is the primary North Indian variety. Characterized by high micronaire and medium staple length, it is heavily used for manufacturing coarse counts (10s to 24s) and denim manufacturing.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 2000, priceForecast: 62700, triggerLevel: 62500, recommendation: 'Accumulate', actionColor: 'var(--ios-green)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 1500, priceForecast: 62800, triggerLevel: 62500, recommendation: 'Hold', actionColor: 'var(--text-secondary)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 15000, avgPrice: 62700, allocatedBudgetCr: 45.0, hedgingRatio: 25 },
        { month: 'Jun 2026', targetBales: 18000, avgPrice: 63200, allocatedBudgetCr: 55.0, hedgingRatio: 30 }
      ],
      yearWisePlan: [
        { year: '2024-25', totalPurchaseBales: 2.1, estPrice: 61500, productionOutlook: 36.88 },
        { year: '2025-26 (Est)', totalPurchaseBales: 2.5, estPrice: 62500, productionOutlook: 38.50 }
      ],
      affectingFactors: [
        { factor: 'North India Canal Water Levels', impactLevel: 'High', direction: 'Affects Sowing Area', weight: 40 },
        { factor: 'Denim Sector Demand', impactLevel: 'Medium', direction: 'Drives Consumption', weight: 30 }
      ]
    },
    'US Pima': {
      staple: '35-38mm (Premium ELS)',
      origin: 'California, USA',
      description: 'US Pima represents the global gold standard for extra-long staple cotton. Known for extreme strength and brightness, it is imported by premium Indian mills for ultra-fine luxury counts.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 100, priceForecast: 175000, triggerLevel: 174000, recommendation: 'Wait for Parity', actionColor: 'var(--text-secondary)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 50, priceForecast: 174500, triggerLevel: 174000, recommendation: 'Wait', actionColor: 'var(--text-secondary)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 500, avgPrice: 175000, allocatedBudgetCr: 8.5, hedgingRatio: 80 },
        { month: 'Jun 2026', targetBales: 800, avgPrice: 176500, allocatedBudgetCr: 13.8, hedgingRatio: 85 }
      ],
      yearWisePlan: [
        { year: '2024-25', totalPurchaseBales: 0.05, estPrice: 165000, productionOutlook: 4.5 },
        { year: '2025-26 (Est)', totalPurchaseBales: 0.08, estPrice: 172000, productionOutlook: 5.2 }
      ],
      affectingFactors: [
        { factor: 'US Dollar Exchange Rate', impactLevel: 'Critical', direction: 'Direct Import Cost', weight: 60 },
        { factor: 'California Drought Conditions', impactLevel: 'High', direction: 'Affects Yield', weight: 30 }
      ]
    },`;
    
    analysisContent = analysisContent.replace("data: {", "data: {\n" + j34Data);
}

// Yarn
if (!analysisContent.includes("'80s Compact ELS'")) {
    analysisContent = analysisContent.replace(
        "types: ['30s Combed', '40s Compact', '60s Compact', '30s Carded', '32s Poly-Cotton'],",
        "types: ['30s Combed', '40s Compact', '60s Compact', '80s Compact ELS', '20s Carded', '32s Poly-Cotton'],"
    );

    const newYarnData = `
    '80s Compact ELS': {
      count: '80s Ne Compact ELS',
      description: 'Spun entirely from extra-long staple (ELS) varieties like MCU-5 and Suvin, this ultra-fine count is used in luxury shirting and premium home textiles. Demands zero-defect precision.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 8000, currentPrice: 510, marginSpread: 45, recommendation: 'Hold / Wait' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 10000, currentPrice: 505, marginSpread: 48, recommendation: 'Accumulate' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 95, blendedYarnDemand: 20, avgYarnPriceKg: 510, exportOrdersContainer: 12 },
        { month: 'Jun 2026', combedCompactDemand: 98, blendedYarnDemand: 22, avgYarnPriceKg: 515, exportOrdersContainer: 15 }
      ],
      yearWisePlan: [
        { year: '2024-25', domesticDemandMkg: 45, exportDemandMkg: 65, avgSpreadKg: 42.0 },
        { year: '2025-26 (Est)', domesticDemandMkg: 50, exportDemandMkg: 72, avgSpreadKg: 44.5 }
      ]
    },
    '20s Carded': {
      count: '20s Ne Carded Open-End',
      description: 'Coarse count yarn produced on Rotor/Open-End machines using short staple cotton and comber noil. Used in denim, towels, and heavy industrial fabrics.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 150000, currentPrice: 205, marginSpread: 12, recommendation: 'Aggressive Buy' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 180000, currentPrice: 202, marginSpread: 14, recommendation: 'Pre-buy / Accumulate' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 45, blendedYarnDemand: 40, avgYarnPriceKg: 205, exportOrdersContainer: 110 },
        { month: 'Jun 2026', combedCompactDemand: 48, blendedYarnDemand: 42, avgYarnPriceKg: 208, exportOrdersContainer: 125 }
      ],
      yearWisePlan: [
        { year: '2024-25', domesticDemandMkg: 1850, exportDemandMkg: 850, avgSpreadKg: 11.5 },
        { year: '2025-26 (Est)', domesticDemandMkg: 1920, exportDemandMkg: 910, avgSpreadKg: 12.8 }
      ]
    },`;
    
    // Find the second "data: {" which is for yarnAnalysis
    let parts = analysisContent.split('export const yarnAnalysis = {');
    if (parts.length > 1) {
        let yarnPart = parts[1].replace("data: {", "data: {\n" + newYarnData);
        analysisContent = parts[0] + 'export const yarnAnalysis = {' + yarnPart;
    }
}

fs.writeFileSync('./src/analysisData.js', analysisContent);


// Add to YarnQualityDashboard.jsx
let qualityContent = fs.readFileSync('./src/components/YarnQualityDashboard.jsx', 'utf8');

if (!qualityContent.includes("'80s Compact ELS'")) {
    const qualityAdd = `
  '80s Compact ELS': {
    targetCount: 80,
    strength: 34.5,
    strengthGrade: 'Exceptional (Uster 1%)',
    countVariation: '+0.2%',
    cvPercent: '0.65%',
    totalIpi: 10,
    ipiGrade: 'Flawless (<15/km)',
    production: 8.5,
    hairiness: 2.80,
    elongation: 7.10,
    description: 'Spun from pure Egyptian Giza or US Pima. Operates with near-zero imperfection rates, catering exclusively to luxury global brands requiring immaculate fabric finishes.',
    strengthPoints: [
      { batch: 'B01', RKM: 34.1, target: 34.0 }, { batch: 'B02', RKM: 34.5, target: 34.0 }, { batch: 'B03', RKM: 34.3, target: 34.0 }, { batch: 'B04', RKM: 34.8, target: 34.0 }, { batch: 'B05', RKM: 34.2, target: 34.0 }, { batch: 'B06', RKM: 34.6, target: 34.0 }, { batch: 'B07', RKM: 34.4, target: 34.0 }
    ],
    countRun: [
      { day: 1, val: 79.9 }, { day: 2, val: 80.1 }, { day: 3, val: 80.0 }, { day: 4, val: 79.8 }, { day: 5, val: 80.2 }, { day: 6, val: 80.1 }, { day: 7, val: 79.9 }, { day: 8, val: 80.0 }, { day: 9, val: 80.1 }, { day: 10, val: 80.0 }, { day: 11, val: 79.9 }, { day: 12, val: 80.1 }, { day: 13, val: 80.0 }, { day: 14, val: 80.2 }, { day: 15, val: 80.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 1, benchmark: 4 },
      { name: 'Thick (+50%)', actual: 4, benchmark: 8 },
      { name: 'Neps (+200%)', actual: 5, benchmark: 10 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 8.4 }, { name: 'Tue', volume: 8.5 }, { name: 'Wed', volume: 8.6 }, { name: 'Thu', volume: 8.3 }, { name: 'Fri', volume: 8.5 }, { name: 'Sat', volume: 8.7 }, { name: 'Sun', volume: 8.8 }
    ]
  },
  '20s Carded': {
    targetCount: 20,
    strength: 18.2,
    strengthGrade: 'Standard (Uster 25%)',
    countVariation: '+1.5%',
    cvPercent: '1.45%',
    totalIpi: 120,
    ipiGrade: 'Standard (<150/km)',
    production: 32.5,
    hairiness: 5.80,
    elongation: 5.10,
    description: 'Rotor spun carded yarn for heavy fabrics. Emphasizes high production throughput over zero-defect metrics. Economical and rugged.',
    strengthPoints: [
      { batch: 'B01', RKM: 18.0, target: 18.0 }, { batch: 'B02', RKM: 18.5, target: 18.0 }, { batch: 'B03', RKM: 17.8, target: 18.0 }, { batch: 'B04', RKM: 18.8, target: 18.0 }, { batch: 'B05', RKM: 17.5, target: 18.0 }, { batch: 'B06', RKM: 18.2, target: 18.0 }, { batch: 'B07', RKM: 18.6, target: 18.0 }
    ],
    countRun: [
      { day: 1, val: 19.5 }, { day: 2, val: 20.2 }, { day: 3, val: 19.8 }, { day: 4, val: 20.4 }, { day: 5, val: 19.6 }, { day: 6, val: 20.1 }, { day: 7, val: 19.9 }, { day: 8, val: 20.3 }, { day: 9, val: 19.7 }, { day: 10, val: 20.5 }, { day: 11, val: 19.4 }, { day: 12, val: 20.0 }, { day: 13, val: 19.8 }, { day: 14, val: 20.2 }, { day: 15, val: 20.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 25, benchmark: 40 },
      { name: 'Thick (+50%)', actual: 45, benchmark: 60 },
      { name: 'Neps (+200%)', actual: 50, benchmark: 80 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 32.0 }, { name: 'Tue', volume: 32.5 }, { name: 'Wed', volume: 33.1 }, { name: 'Thu', volume: 31.8 }, { name: 'Fri', volume: 32.6 }, { name: 'Sat', volume: 33.0 }, { name: 'Sun', volume: 33.5 }
    ]
  },`;
    
    qualityContent = qualityContent.replace("const QUALITY_DATA = {", "const QUALITY_DATA = {\n" + qualityAdd);
    
    // update state defaults if needed, but not necessary.
    fs.writeFileSync('./src/components/YarnQualityDashboard.jsx', qualityContent);
}

console.log('Added missing cotton and yarn types successfully!');
