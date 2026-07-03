// src/analysisData.js

export const cottonAnalysis = {
  types: ['Shankar-6 (S-6)', 'MCU-5', 'DCH-32 / Suvin', 'ICE Cotton No. 2 (INR Equiv)', 'J-34', 'US Pima', 'Bunny (NCS-145)'],
  data: {
    'Bunny (NCS-145)': {
      staple: '29-31mm (Long Staple)',
      origin: 'Telangana, Andhra Pradesh & Maharashtra',
      description: 'Bunny (NCS-145) is a highly popular Bt cotton variety in Central and Southern India. Highly preferred for combing and carding spinning lines due to low contamination and optimal micronaire.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 1000, priceForecast: 63800, triggerLevel: 63600, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 2200, priceForecast: 63500, triggerLevel: 63300, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 3', date: '22 May 2026', targetBales: 1200, priceForecast: 64000, triggerLevel: 63800, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 4', date: '23 May 2026', targetBales: 800, priceForecast: 64300, triggerLevel: 63900, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 5', date: '24 May 2026', targetBales: 1000, priceForecast: 64100, triggerLevel: 63800, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 6', date: '25 May 2026', targetBales: 1800, priceForecast: 63700, triggerLevel: 63500, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 7', date: '26 May 2026', targetBales: 2500, priceForecast: 63400, triggerLevel: 63400, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 25000, avgPrice: 63800, allocatedBudgetCr: 80.2, hedgingRatio: 30 },
        { month: 'Jun 2026', targetBales: 28000, avgPrice: 64400, allocatedBudgetCr: 90.1, hedgingRatio: 35 },
        { month: 'Jul 2026', targetBales: 30000, avgPrice: 65100, allocatedBudgetCr: 97.6, hedgingRatio: 40 },
        { month: 'Aug 2026', targetBales: 22000, avgPrice: 65500, allocatedBudgetCr: 72.0, hedgingRatio: 45 },
        { month: 'Sep 2026', targetBales: 15000, avgPrice: 64300, allocatedBudgetCr: 48.2, hedgingRatio: 25 },
        { month: 'Oct 2026', targetBales: 20000, avgPrice: 62700, allocatedBudgetCr: 62.7, hedgingRatio: 20 }
      ],
      yearWisePlan: [
        { year: '2022-23', totalPurchaseBales: 3.1, estPrice: 61000, productionOutlook: 215.5 },
        { year: '2023-24', totalPurchaseBales: 3.4, estPrice: 62400, productionOutlook: 228.0 },
        { year: '2024-25', totalPurchaseBales: 3.6, estPrice: 62800, productionOutlook: 202.4 },
        { year: '2025-26 (Est)', totalPurchaseBales: 3.8, estPrice: 63800, productionOutlook: 198.5 },
        { year: '2026-27 (Proj)', totalPurchaseBales: 4.2, estPrice: 65200, productionOutlook: 220.0 }
      ],
      affectingFactors: [
        { factor: 'Central India Monsoon Spreads', impactLevel: 'Critical', direction: 'Alters Sowing Success', weight: 45 },
        { factor: 'Bt Cotton Seed Costs & Subsidies', impactLevel: 'High', direction: 'Direct Cultivation Influence', weight: 25 },
        { factor: 'Local Mandi Arrivals in Telangana', impactLevel: 'High', direction: 'Controls Regional Price Spikes', weight: 20 },
        { factor: 'Yarn Count Demands (Tirupur)', impactLevel: 'Medium', direction: 'Triggers Spinners Acquisition', weight: 10 }
      ]
    },
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
    },
    'Shankar-6 (S-6)': {
      staple: '29-31mm (Long Staple)',
      origin: 'Gujarat & Maharashtra',
      description: 'Shankar-6 is the premier Indian cotton benchmark. It represents the bulk of raw cotton commercial volume, controlling the price floors for 30s and 40s combed yarns in domestic markets.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 1500, priceForecast: 65100, triggerLevel: 64900, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 2200, priceForecast: 64800, triggerLevel: 64600, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 3', date: '22 May 2026', targetBales: 1200, priceForecast: 65200, triggerLevel: 65000, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 4', date: '23 May 2026', targetBales: 800, priceForecast: 65500, triggerLevel: 65100, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 5', date: '24 May 2026', targetBales: 1000, priceForecast: 65300, triggerLevel: 65000, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 6', date: '25 May 2026', targetBales: 1800, priceForecast: 64950, triggerLevel: 64900, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 7', date: '26 May 2026', targetBales: 2500, priceForecast: 64700, triggerLevel: 64800, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 42000, avgPrice: 65100, allocatedBudgetCr: 136.7, hedgingRatio: 35 },
        { month: 'Jun 2026', targetBales: 48000, avgPrice: 65800, allocatedBudgetCr: 157.9, hedgingRatio: 40 },
        { month: 'Jul 2026', targetBales: 50000, avgPrice: 66400, allocatedBudgetCr: 166.0, hedgingRatio: 45 },
        { month: 'Aug 2026', targetBales: 38000, avgPrice: 66800, allocatedBudgetCr: 126.9, hedgingRatio: 50 },
        { month: 'Sep 2026', targetBales: 25000, avgPrice: 65500, allocatedBudgetCr: 81.8, hedgingRatio: 30 },
        { month: 'Oct 2026', targetBales: 35000, avgPrice: 63800, allocatedBudgetCr: 111.6, hedgingRatio: 25 }
      ],
      yearWisePlan: [
        { year: '2022-23', totalPurchaseBales: 5.2, estPrice: 62500, productionOutlook: 336.60 },
        { year: '2023-24', totalPurchaseBales: 5.8, estPrice: 63800, productionOutlook: 325.22 },
        { year: '2024-25', totalPurchaseBales: 6.1, estPrice: 64500, productionOutlook: 297.24 },
        { year: '2025-26 (Est)', totalPurchaseBales: 6.5, estPrice: 65100, productionOutlook: 290.91 },
        { year: '2026-27 (Proj)', totalPurchaseBales: 7.2, estPrice: 66800, productionOutlook: 325.0 }
      ],
      affectingFactors: [
        { factor: 'South-West Monsoon Coverage', impactLevel: 'Critical', direction: 'Affects Gujarat Yield', weight: 45 },
        { factor: 'Union Cabinet MSP Revision', impactLevel: 'High', direction: 'Sets Floor Benchmarks', weight: 25 },
        { factor: 'US ICE Futures Parity', impactLevel: 'High', direction: 'Triggers Exports Demand', weight: 15 },
        { factor: 'CCI Domestic Procurement Scale', impactLevel: 'Medium', direction: 'Restricts Commercial Stocks', weight: 15 }
      ]
    },
    'MCU-5': {
      staple: '31-33mm (Extra-Long Staple)',
      origin: 'Andhra Pradesh & Tamil Nadu',
      description: 'MCU-5 is a premium extra-long staple (ELS) variety grown mainly in Southern and Central India. It commands a quality premium and is essential for spinning high-strength 50s and 60s combed yarns.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 800, priceForecast: 70000, triggerLevel: 69800, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 1200, priceForecast: 69700, triggerLevel: 69500, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 3', date: '22 May 2026', targetBales: 600, priceForecast: 70200, triggerLevel: 70000, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 4', date: '23 May 2026', targetBales: 400, priceForecast: 70500, triggerLevel: 70100, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 5', date: '24 May 2026', targetBales: 900, priceForecast: 70300, triggerLevel: 70000, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 6', date: '25 May 2026', targetBales: 1100, priceForecast: 69900, triggerLevel: 69800, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 7', date: '26 May 2026', targetBales: 1500, priceForecast: 69600, triggerLevel: 69600, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 18000, avgPrice: 70000, allocatedBudgetCr: 63.0, hedgingRatio: 30 },
        { month: 'Jun 2026', targetBales: 22000, avgPrice: 70800, allocatedBudgetCr: 77.8, hedgingRatio: 35 },
        { month: 'Jul 2026', targetBales: 25000, avgPrice: 71500, allocatedBudgetCr: 89.3, hedgingRatio: 40 },
        { month: 'Aug 2026', targetBales: 15000, avgPrice: 72200, allocatedBudgetCr: 54.1, hedgingRatio: 45 },
        { month: 'Sep 2026', targetBales: 10000, avgPrice: 71200, allocatedBudgetCr: 35.6, hedgingRatio: 25 },
        { month: 'Oct 2026', targetBales: 14000, avgPrice: 69800, allocatedBudgetCr: 48.8, hedgingRatio: 20 }
      ],
      yearWisePlan: [
        { year: '2022-23', totalPurchaseBales: 2.1, estPrice: 67500, productionOutlook: 55.0 },
        { year: '2023-24', totalPurchaseBales: 2.3, estPrice: 68800, productionOutlook: 58.0 },
        { year: '2024-25', totalPurchaseBales: 2.4, estPrice: 69200, productionOutlook: 52.0 },
        { year: '2025-26 (Est)', totalPurchaseBales: 2.6, estPrice: 70000, productionOutlook: 48.0 },
        { year: '2026-27 (Proj)', totalPurchaseBales: 3.1, estPrice: 71800, productionOutlook: 60.0 }
      ],
      affectingFactors: [
        { factor: 'ELS Premium Spreads', impactLevel: 'Critical', direction: 'Divergence from S-6 Pricing', weight: 40 },
        { factor: 'Coastal TN Rain Patterns', impactLevel: 'High', direction: 'Direct Crop Quality Impact', weight: 30 },
        { factor: 'Import Tariffs on US Pima', impactLevel: 'Medium', direction: 'Drives Substitute Demand', weight: 15 },
        { factor: 'Specialist Mill Spindles', impactLevel: 'Medium', direction: 'Controls Premium Volume Takeup', weight: 15 }
      ]
    },
    'DCH-32 / Suvin': {
      staple: '33-36mm (Super Extra-Long Staple)',
      origin: 'Karnataka, Tamil Nadu & Gujarat',
      description: 'DCH-32 and Suvin represent the highest echelon of Indian extra-long staple (ELS) cotton. Similar in strength and fiber length to Egyptian Giza and US Supima, it is used for super-fine yarn counts (80s to 120s Compact).',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 300, priceForecast: 88000, triggerLevel: 87800, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 500, priceForecast: 87600, triggerLevel: 87400, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 3', date: '22 May 2026', targetBales: 250, priceForecast: 88200, triggerLevel: 88000, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 4', date: '23 May 2026', targetBales: 150, priceForecast: 88900, triggerLevel: 88200, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 5', date: '24 May 2026', targetBales: 200, priceForecast: 88500, triggerLevel: 88000, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 6', date: '25 May 2026', targetBales: 400, priceForecast: 88100, triggerLevel: 87900, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 7', date: '26 May 2026', targetBales: 600, priceForecast: 87500, triggerLevel: 87600, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 5000, avgPrice: 88000, allocatedBudgetCr: 22.0, hedgingRatio: 20 },
        { month: 'Jun 2026', targetBales: 6500, avgPrice: 88800, allocatedBudgetCr: 28.8, hedgingRatio: 25 },
        { month: 'Jul 2026', targetBales: 7000, avgPrice: 89500, allocatedBudgetCr: 31.3, hedgingRatio: 30 },
        { month: 'Aug 2026', targetBales: 4500, avgPrice: 90200, allocatedBudgetCr: 20.3, hedgingRatio: 35 },
        { month: 'Sep 2026', targetBales: 3000, avgPrice: 89200, allocatedBudgetCr: 13.3, hedgingRatio: 20 },
        { month: 'Oct 2026', targetBales: 4000, avgPrice: 87800, allocatedBudgetCr: 17.5, hedgingRatio: 15 }
      ],
      yearWisePlan: [
        { year: '2022-23', totalPurchaseBales: 0.8, estPrice: 85000, productionOutlook: 12.0 },
        { year: '2023-24', totalPurchaseBales: 0.9, estPrice: 86800, productionOutlook: 12.5 },
        { year: '2024-25', totalPurchaseBales: 1.1, estPrice: 87200, productionOutlook: 11.2 },
        { year: '2025-26 (Est)', totalPurchaseBales: 1.2, estPrice: 88000, productionOutlook: 10.5 },
        { year: '2026-27 (Proj)', totalPurchaseBales: 1.5, estPrice: 89800, productionOutlook: 14.0 }
      ],
      affectingFactors: [
        { factor: 'Egyptian Giza Parity', impactLevel: 'Critical', direction: 'Direct Price Substitution Effect', weight: 50 },
        { factor: 'Fine Count Weaving Orders', impactLevel: 'High', direction: 'Controls Spinners Demand Takeup', weight: 25 },
        { factor: 'Irrigation Level in Karnataka', impactLevel: 'Medium', direction: 'Drives Harvest Yield Volumes', weight: 15 },
        { factor: 'Domestic Organic Premiums', impactLevel: 'Medium', direction: 'Sets Luxury Cotton Standards', weight: 10 }
      ]
    },
    'ICE Cotton No. 2 (INR Equiv)': {
      staple: 'Futures Contract Candy Equivalent',
      origin: 'US Upland (New York Board of Trade)',
      description: 'The ICE Cotton No. 2 contract is the global standard for pricing cotton. Converted to Indian Rupees and Candy (356 kg equivalent) terms, it is the primary benchmark for import/export margins and financial futures hedging.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetBales: 1000, priceForecast: 55260, triggerLevel: 55000, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 2', date: '21 May 2026', targetBales: 1500, priceForecast: 54900, triggerLevel: 54700, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' },
        { day: 'Day 3', date: '22 May 2026', targetBales: 900, priceForecast: 55400, triggerLevel: 55100, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 4', date: '23 May 2026', targetBales: 500, priceForecast: 55900, triggerLevel: 55300, recommendation: 'Hold / Wait', actionColor: 'var(--text-secondary)' },
        { day: 'Day 5', date: '24 May 2026', targetBales: 700, priceForecast: 55600, triggerLevel: 55200, recommendation: 'Moderate Buy', actionColor: 'var(--ios-blue)' },
        { day: 'Day 6', date: '25 May 2026', targetBales: 1200, priceForecast: 55200, triggerLevel: 55000, recommendation: 'Buy on Dip', actionColor: 'var(--accent-gold)' },
        { day: 'Day 7', date: '26 May 2026', targetBales: 1800, priceForecast: 54700, triggerLevel: 54800, recommendation: 'Aggressive Buy', actionColor: 'var(--ios-green)' }
      ],
      monthWisePlan: [
        { month: 'May 2026', targetBales: 28000, avgPrice: 55260, allocatedBudgetCr: 77.3, hedgingRatio: 40 },
        { month: 'Jun 2026', targetBales: 32000, avgPrice: 56100, allocatedBudgetCr: 89.7, hedgingRatio: 45 },
        { month: 'Jul 2026', targetBales: 35000, avgPrice: 56800, allocatedBudgetCr: 99.4, hedgingRatio: 50 },
        { month: 'Aug 2026', targetBales: 26000, avgPrice: 57400, allocatedBudgetCr: 74.6, hedgingRatio: 55 },
        { month: 'Sep 2026', targetBales: 18000, avgPrice: 56200, allocatedBudgetCr: 50.5, hedgingRatio: 35 },
        { month: 'Oct 2026', targetBales: 24000, avgPrice: 54800, allocatedBudgetCr: 65.7, hedgingRatio: 30 }
      ],
      yearWisePlan: [
        { year: '2022-23', totalPurchaseBales: 3.5, estPrice: 52000, productionOutlook: 116.7 },
        { year: '2023-24', totalPurchaseBales: 3.8, estPrice: 53800, productionOutlook: 113.5 },
        { year: '2024-25', totalPurchaseBales: 4.1, estPrice: 54400, productionOutlook: 119.7 },
        { year: '2025-26 (Est)', totalPurchaseBales: 4.3, estPrice: 55260, productionOutlook: 122.6 },
        { year: '2026-27 (Proj)', totalPurchaseBales: 4.8, estPrice: 56800, productionOutlook: 125.0 }
      ],
      affectingFactors: [
        { factor: 'US Dollar Index Strength', impactLevel: 'Critical', direction: 'Alters Import Tariffs Term', weight: 45 },
        { factor: 'USDA Crop Progress Reports', impactLevel: 'High', direction: 'Controls Global Base Supply Estimates', weight: 25 },
        { factor: 'Texas Dry Weather Outlook', impactLevel: 'High', direction: 'Direct Crop Outlook Squeeze Channel', weight: 20 },
        { factor: 'Chinese Buying Reserves Target', impactLevel: 'Medium', direction: 'Triggers Strategic Purchases', weight: 10 }
      ]
    }
  }
};

export const yarnAnalysis = {
  types: ['30s Combed', '40s Compact', '60s Compact', '80s Compact ELS', '20s Carded', '32s Poly-Cotton'],
  data: {

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
    },
    '30s Combed': {
      count: '30s Ne Combed Cotton',
      description: '30s Combed cotton yarn is the high-volume workhorse of the domestic apparel sector, primarily consumed by circular knitting machines in Tirupur for manufacturing high-quality t-shirts and innerwear.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 45000, currentPrice: 272, marginSpread: 22, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 40000, currentPrice: 270, marginSpread: 21, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 3', date: '22 May 2026', targetQtyKg: 48000, currentPrice: 274, marginSpread: 23, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 4', date: '23 May 2026', targetQtyKg: 30000, currentPrice: 278, marginSpread: 24, recommendation: 'Wait for Parity' },
        { day: 'Day 5', date: '24 May 2026', targetQtyKg: 35000, currentPrice: 276, marginSpread: 23, recommendation: 'Wait for Parity' },
        { day: 'Day 6', date: '25 May 2026', targetQtyKg: 42000, currentPrice: 271, marginSpread: 22, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 7', date: '26 May 2026', targetQtyKg: 50000, currentPrice: 269, marginSpread: 21, recommendation: 'Aggressive Buy' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 85, blendedYarnDemand: 60, avgYarnPriceKg: 272, exportOrdersContainer: 45 },
        { month: 'Jun 2026', combedCompactDemand: 90, blendedYarnDemand: 65, avgYarnPriceKg: 276, exportOrdersContainer: 52 },
        { month: 'Jul 2026', combedCompactDemand: 88, blendedYarnDemand: 72, avgYarnPriceKg: 280, exportOrdersContainer: 58 },
        { month: 'Aug 2026', combedCompactDemand: 82, blendedYarnDemand: 75, avgYarnPriceKg: 284, exportOrdersContainer: 50 },
        { month: 'Sep 2026', combedCompactDemand: 78, blendedYarnDemand: 68, avgYarnPriceKg: 278, exportOrdersContainer: 40 },
        { month: 'Oct 2026', combedCompactDemand: 84, blendedYarnDemand: 62, avgYarnPriceKg: 270, exportOrdersContainer: 48 }
      ],
      yearWisePlan: [
        { year: '2022-23', domesticDemandMkg: 850, exportDemandMkg: 450, avgSpreadKg: 18.2 },
        { year: '2023-24', domesticDemandMkg: 890, exportDemandMkg: 480, avgSpreadKg: 20.5 },
        { year: '2024-25', domesticDemandMkg: 920, exportDemandMkg: 510, avgSpreadKg: 22.0 },
        { year: '2025-26 (Est)', domesticDemandMkg: 960, exportDemandMkg: 530, avgSpreadKg: 22.8 },
        { year: '2026-27 (Proj)', domesticDemandMkg: 1020, exportDemandMkg: 580, avgSpreadKg: 24.5 }
      ]
    },
    '40s Compact': {
      count: '40s Ne Compact Weaving',
      description: '40s Compact yarn is a premium count spun primarily on ring frames equipped with suction channels to eliminate hairiness. It is highly sought after by high-speed air-jet looms for manufacturing fine shirting fabrics.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 60000, currentPrice: 312, marginSpread: 25, recommendation: 'Aggressive Buy' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 55000, currentPrice: 310, marginSpread: 24, recommendation: 'Aggressive Buy' },
        { day: 'Day 3', date: '22 May 2026', targetQtyKg: 65000, currentPrice: 314, marginSpread: 26, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 4', date: '23 May 2026', targetQtyKg: 40000, currentPrice: 318, marginSpread: 27, recommendation: 'Wait for Parity' },
        { day: 'Day 5', date: '24 May 2026', targetQtyKg: 45000, currentPrice: 316, marginSpread: 26, recommendation: 'Wait for Parity' },
        { day: 'Day 6', date: '25 May 2026', targetQtyKg: 58000, currentPrice: 311, marginSpread: 25, recommendation: 'Aggressive Buy' },
        { day: 'Day 7', date: '26 May 2026', targetQtyKg: 70000, currentPrice: 309, marginSpread: 24, recommendation: 'Aggressive Buy' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 88, blendedYarnDemand: 58, avgYarnPriceKg: 312, exportOrdersContainer: 50 },
        { month: 'Jun 2026', combedCompactDemand: 92, blendedYarnDemand: 60, avgYarnPriceKg: 316, exportOrdersContainer: 58 },
        { month: 'Jul 2026', combedCompactDemand: 90, blendedYarnDemand: 66, avgYarnPriceKg: 320, exportOrdersContainer: 65 },
        { month: 'Aug 2026', combedCompactDemand: 85, blendedYarnDemand: 70, avgYarnPriceKg: 325, exportOrdersContainer: 55 },
        { month: 'Sep 2026', combedCompactDemand: 80, blendedYarnDemand: 64, avgYarnPriceKg: 318, exportOrdersContainer: 45 },
        { month: 'Oct 2026', combedCompactDemand: 86, blendedYarnDemand: 59, avgYarnPriceKg: 310, exportOrdersContainer: 52 }
      ],
      yearWisePlan: [
        { year: '2022-23', domesticDemandMkg: 620, exportDemandMkg: 380, avgSpreadKg: 20.8 },
        { year: '2023-24', domesticDemandMkg: 650, exportDemandMkg: 410, avgSpreadKg: 22.4 },
        { year: '2024-25', domesticDemandMkg: 680, exportDemandMkg: 430, avgSpreadKg: 24.5 },
        { year: '2025-26 (Est)', domesticDemandMkg: 710, exportDemandMkg: 460, avgSpreadKg: 25.8 },
        { year: '2026-27 (Proj)', domesticDemandMkg: 760, exportDemandMkg: 500, avgSpreadKg: 27.2 }
      ]
    },
    '60s Compact': {
      count: '60s Ne Superfine Compact',
      description: '60s Compact yarn represents the luxury category. Spun using premium ELS cotton (such as MCU-5 or DCH-32), it is used in fine sheeting, high-end lawn fabrics, and premium sarees where thread counts exceed 300.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 30000, currentPrice: 355, marginSpread: 35, recommendation: 'Wait for Parity' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 28000, currentPrice: 352, marginSpread: 34, recommendation: 'Wait for Parity' },
        { day: 'Day 3', date: '22 May 2026', targetQtyKg: 32000, currentPrice: 357, marginSpread: 36, recommendation: 'Hold / Wait' },
        { day: 'Day 4', date: '23 May 2026', targetQtyKg: 20000, currentPrice: 362, marginSpread: 37, recommendation: 'Wait for Parity' },
        { day: 'Day 5', date: '24 May 2026', targetQtyKg: 25000, currentPrice: 359, marginSpread: 36, recommendation: 'Hold / Wait' },
        { day: 'Day 6', date: '25 May 2026', targetQtyKg: 29000, currentPrice: 354, marginSpread: 35, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 7', date: '26 May 2026', targetQtyKg: 35000, currentPrice: 351, marginSpread: 34, recommendation: 'Pre-buy / Accumulate' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 92, blendedYarnDemand: 50, avgYarnPriceKg: 355, exportOrdersContainer: 30 },
        { month: 'Jun 2026', combedCompactDemand: 95, blendedYarnDemand: 52, avgYarnPriceKg: 359, exportOrdersContainer: 35 },
        { month: 'Jul 2026', combedCompactDemand: 93, blendedYarnDemand: 58, avgYarnPriceKg: 364, exportOrdersContainer: 38 },
        { month: 'Aug 2026', combedCompactDemand: 88, blendedYarnDemand: 62, avgYarnPriceKg: 368, exportOrdersContainer: 32 },
        { month: 'Sep 2026', combedCompactDemand: 84, blendedYarnDemand: 56, avgYarnPriceKg: 360, exportOrdersContainer: 25 },
        { month: 'Oct 2026', combedCompactDemand: 90, blendedYarnDemand: 51, avgYarnPriceKg: 352, exportOrdersContainer: 28 }
      ],
      yearWisePlan: [
        { year: '2022-23', domesticDemandMkg: 280, exportDemandMkg: 210, avgSpreadKg: 28.5 },
        { year: '2023-24', domesticDemandMkg: 300, exportDemandMkg: 230, avgSpreadKg: 31.0 },
        { year: '2024-25', domesticDemandMkg: 310, exportDemandMkg: 240, avgSpreadKg: 33.5 },
        { year: '2025-26 (Est)', domesticDemandMkg: 330, exportDemandMkg: 250, avgSpreadKg: 35.8 },
        { year: '2026-27 (Proj)', domesticDemandMkg: 360, exportDemandMkg: 280, avgSpreadKg: 38.0 }
      ]
    },
    '30s Carded': {
      count: '30s Ne Basic Carded',
      description: '30s Carded cotton yarn bypasses the combing step, leaving shorter fibers in the blend. It is used for lower-cost knits, denim, towels, and heavy sheets where absolute surface softness is secondary to strength and economy.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 25000, currentPrice: 250, marginSpread: 15, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 22000, currentPrice: 248, marginSpread: 14, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 3', date: '22 May 2026', targetQtyKg: 28000, currentPrice: 252, marginSpread: 16, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 4', date: '23 May 2026', targetQtyKg: 18000, currentPrice: 256, marginSpread: 17, recommendation: 'Wait for Parity' },
        { day: 'Day 5', date: '24 May 2026', targetQtyKg: 20000, currentPrice: 254, marginSpread: 16, recommendation: 'Wait for Parity' },
        { day: 'Day 6', date: '25 May 2026', targetQtyKg: 24000, currentPrice: 249, marginSpread: 15, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 7', date: '26 May 2026', targetQtyKg: 30000, currentPrice: 247, marginSpread: 14, recommendation: 'Aggressive Buy' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 72, blendedYarnDemand: 70, avgYarnPriceKg: 250, exportOrdersContainer: 25 },
        { month: 'Jun 2026', combedCompactDemand: 75, blendedYarnDemand: 74, avgYarnPriceKg: 254, exportOrdersContainer: 30 },
        { month: 'Jul 2026', combedCompactDemand: 74, blendedYarnDemand: 80, avgYarnPriceKg: 258, exportOrdersContainer: 34 },
        { month: 'Aug 2026', combedCompactDemand: 70, blendedYarnDemand: 82, avgYarnPriceKg: 262, exportOrdersContainer: 29 },
        { month: 'Sep 2026', combedCompactDemand: 66, blendedYarnDemand: 76, avgYarnPriceKg: 255, exportOrdersContainer: 22 },
        { month: 'Oct 2026', combedCompactDemand: 71, blendedYarnDemand: 72, avgYarnPriceKg: 248, exportOrdersContainer: 26 }
      ],
      yearWisePlan: [
        { year: '2022-23', domesticDemandMkg: 510, exportDemandMkg: 280, avgSpreadKg: 12.0 },
        { year: '2023-24', domesticDemandMkg: 530, exportDemandMkg: 290, avgSpreadKg: 13.5 },
        { year: '2024-25', domesticDemandMkg: 540, exportDemandMkg: 300, avgSpreadKg: 14.5 },
        { year: '2025-26 (Est)', domesticDemandMkg: 560, exportDemandMkg: 310, avgSpreadKg: 15.0 },
        { year: '2026-27 (Proj)', domesticDemandMkg: 600, exportDemandMkg: 340, avgSpreadKg: 16.5 }
      ]
    },
    '32s Poly-Cotton': {
      count: '32s Ne Polyester-Cotton (65/35 Blend)',
      description: '32s Poly-Cotton (PC) yarn blends polyester fibers with cotton. It offers high durability, crease-resistance, and lower raw material costs, making it a critical substitution yarn when raw cotton prices exceed viable thresholds.',
      dayWisePlan: [
        { day: 'Day 1', date: '20 May 2026', targetQtyKg: 40000, currentPrice: 195, marginSpread: 18, recommendation: 'Accumulate' },
        { day: 'Day 2', date: '21 May 2026', targetQtyKg: 38000, currentPrice: 193, marginSpread: 17, recommendation: 'Accumulate' },
        { day: 'Day 3', date: '22 May 2026', targetQtyKg: 45000, currentPrice: 197, marginSpread: 19, recommendation: 'Pre-buy / Accumulate' },
        { day: 'Day 4', date: '23 May 2026', targetQtyKg: 30000, currentPrice: 201, marginSpread: 20, recommendation: 'Wait for Parity' },
        { day: 'Day 5', date: '24 May 2026', targetQtyKg: 32000, currentPrice: 199, marginSpread: 19, recommendation: 'Wait for Parity' },
        { day: 'Day 6', date: '25 May 2026', targetQtyKg: 39000, currentPrice: 194, marginSpread: 18, recommendation: 'Accumulate' },
        { day: 'Day 7', date: '26 May 2026', targetQtyKg: 48000, currentPrice: 192, marginSpread: 17, recommendation: 'Aggressive Buy' }
      ],
      monthWisePlan: [
        { month: 'May 2026', combedCompactDemand: 60, blendedYarnDemand: 80, avgYarnPriceKg: 195, exportOrdersContainer: 38 },
        { month: 'Jun 2026', combedCompactDemand: 62, blendedYarnDemand: 85, avgYarnPriceKg: 199, exportOrdersContainer: 44 },
        { month: 'Jul 2026', combedCompactDemand: 68, blendedYarnDemand: 90, avgYarnPriceKg: 203, exportOrdersContainer: 48 },
        { month: 'Aug 2026', combedCompactDemand: 72, blendedYarnDemand: 92, avgYarnPriceKg: 207, exportOrdersContainer: 42 },
        { month: 'Sep 2026', combedCompactDemand: 64, blendedYarnDemand: 82, avgYarnPriceKg: 198, exportOrdersContainer: 32 },
        { month: 'Oct 2026', combedCompactDemand: 59, blendedYarnDemand: 78, avgYarnPriceKg: 191, exportOrdersContainer: 36 }
      ],
      yearWisePlan: [
        { year: '2022-23', domesticDemandMkg: 720, exportDemandMkg: 320, avgSpreadKg: 14.5 },
        { year: '2023-24', domesticDemandMkg: 760, exportDemandMkg: 340, avgSpreadKg: 16.0 },
        { year: '2024-25', domesticDemandMkg: 800, exportDemandMkg: 360, avgSpreadKg: 18.0 },
        { year: '2025-26 (Est)', domesticDemandMkg: 840, exportDemandMkg: 380, avgSpreadKg: 19.2 },
        { year: '2026-27 (Proj)', domesticDemandMkg: 900, exportDemandMkg: 410, avgSpreadKg: 21.0 }
      ]
    }
  },
  typeGrowth: [
    { type: 'Combed Yarn (30s-40s)', growthRate: '+5.2%', marketValueCr: 12500, marketShare: 30, outlook: 'Stable' },
    { type: 'Compact Yarn (40s-60s)', growthRate: '+8.7%', marketValueCr: 9200, marketShare: 22, outlook: 'Highly Bullish' },
    { type: 'Carded Yarn (20s-30s)', growthRate: '+2.1%', marketValueCr: 6400, marketShare: 15, outlook: 'Bearish' },
    { type: 'Poly-Cotton Blends', growthRate: '+4.8%', marketValueCr: 8100, marketShare: 19, outlook: 'Moderate' },
    { type: 'Viscose / Rayon Spun', growthRate: '+7.5%', marketValueCr: 5200, marketShare: 14, outlook: 'Bullish' }
  ]
};

export const globalIncidents = [
  {
    incident: 'Xinjiang Cotton Import Bans (US & EU enforcement)',
    impactCategory: 'Raw Cotton Supply',
    affectingFactor: 'Redirects international retail brands away from Chinese yarn, creating a strong export premium for Indian spun yarns.',
    yarnMovement: 'Indian combed yarn exports to US/EU garment hubs increased by 15%, driving domestic price stabilization.',
    impactScore: 'High'
  },
  {
    incident: 'Bangladesh Political Unrest & Garment Lockdowns',
    impactCategory: 'Yarn Shipments',
    affectingFactor: 'Temporary disruptions in Dhaka knitwear clusters delayed container clearance, leading to temporary warehouse stockpiling in Tamil Nadu.',
    yarnMovement: 'Caused a transient spot market dip of ₹3-5/kg, followed by a fast recovery as factories resumed operations.',
    impactScore: 'Critical'
  },
  {
    incident: 'US Federal Reserve Rate Cut Outlook',
    impactCategory: 'Macro Capital & Currency',
    affectingFactor: 'Shifts USD-INR exchange rate. A weaker dollar slightly reduces export margins but lowers the import cost of premium ELS cotton (Giza/Pima).',
    yarnMovement: 'Incentivizes blending operations and ELS import strategies for high-count weavers.',
    impactScore: 'Medium'
  },
  {
    incident: 'China State Reserve Dumping (Polyester & Viscose)',
    impactCategory: 'Non-Cotton Synthetics',
    affectingFactor: 'China released synthetic fiber reserves at highly subsidized rates, driving down global blend yarn prices.',
    yarnMovement: 'Pushes Indian spinning mills to double-down on pure cotton compact yarns to escape price wars on cheap synthetic blends.',
    impactScore: 'High'
  }
];

export const strategicGrowth = [
  {
    action: 'Transition to Captive Wind & Solar Energy',
    rationale: 'Electricity accounts for 15-20% of yarn production cost. Tamil Nadu has excellent wind corridor grids.',
    expectedYield: 'Reduces operational power cost from ₹7.5 to ₹4.5 per unit, boosting net spinning EBITDA by 4.5% to 5.0%.',
    executionTimeframe: '6 - 12 Months'
  },
  {
    action: 'Upgrade Carded Spindles to Compact Spinning Systems',
    rationale: 'Basic carded yarns operate on thin margins (₹12-15/kg) and face severe price competition.',
    expectedYield: 'Compact yarns command ₹22-28/kg margins and enjoy long-term contracts from premium European and American brands.',
    executionTimeframe: 'Immediate Execution'
  },
  {
    action: 'Establish Units in PM MITRA Textile Park (Virudhunagar, TN)',
    rationale: 'Tamil Nadu\'s new greenfield park offers substantial power subsidies, zero stamp duty, and integrated weaving infrastructure.',
    expectedYield: 'Lowers logistics and processing overheads by 12% while providing local supply chain integration.',
    executionTimeframe: '12 - 24 Months'
  },
  {
    action: 'Implement MCX Futures Hedging Protocols',
    rationale: 'Spot cotton Shankar-6 price spikes during Q3/Q4 squeeze spinner margins if yarn prices do not rise at parity.',
    expectedYield: 'Locks in 40% of raw cotton needs on MCX during peak harvest season (Dec-Jan) to guarantee year-round price predictability.',
    executionTimeframe: 'Ongoing'
  }
];
