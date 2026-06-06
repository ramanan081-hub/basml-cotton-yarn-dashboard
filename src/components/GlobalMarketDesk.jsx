// src/components/GlobalMarketDesk.jsx
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export function GlobalMarketDesk({ globalCotton, yarns, usdInr, colors, darkMode }) {
  // Interactive Blending & Substitution Calculator State
  const [crudeOil, setCrudeOil] = useState(94.98); // USD/bbl (June 1, 2026 Spot)
  const [cottonSpot, setCottonSpot] = useState(() => globalCotton?.prices?.types?.[0]?.current || 87.92); // cents/lb
  const [simulatedInr, setSimulatedInr] = useState(() => usdInr || 96.83); // USD/INR Rate

  // Procurement Settings State
  const [crudeWaitThreshold, setCrudeWaitThreshold] = useState(100);
  const [crudeBuyThreshold, setCrudeBuyThreshold] = useState(85);
  const [inrHedgeThreshold, setInrHedgeThreshold] = useState(97.00);
  const [cottonBuyReference, setCottonBuyReference] = useState(88.50);
  const [isSettingsExpanded, setIsSettingsExpanded] = useState(false);

  // Sync state with live props if they change in the parent
  useEffect(() => {
    if (globalCotton?.prices?.types?.[0]?.current) {
      setCottonSpot(globalCotton.prices.types[0].current);
    }
  }, [globalCotton?.prices?.types?.[0]?.current]);

  useEffect(() => {
    if (usdInr) {
      setSimulatedInr(usdInr);
    }
  }, [usdInr]);

  // Feedstock calculations
  const estimatedPta = Math.round(crudeOil * 8.5 + 40); // USD/Metric Ton
  const estimatedMeg = Math.round(crudeOil * 5.2 + 70); // USD/Metric Ton
  
  // Converts USD/Ton to INR/Kg
  const ptaInrPerKg = (estimatedPta / 1000) * simulatedInr;
  const megInrPerKg = (estimatedMeg / 1000) * simulatedInr;
  
  // PSF cost = (PTA * 0.855) + (MEG * 0.335) + 20
  const estimatedPsfInr = (ptaInrPerKg * 0.855) + (megInrPerKg * 0.335) + 20; // INR/kg
  const estimatedPsfUSD = estimatedPsfInr / simulatedInr; // USD/kg
  
  // Cotton price conversions
  const cottonUSDPerKg = (cottonSpot * 2.20462) / 100; // USD/kg
  const cottonInrPerKg = cottonUSDPerKg * simulatedInr; // INR/kg

  // Blending & Substitution metrics
  const priceSpreadInr = cottonInrPerKg - estimatedPsfInr;
  const parityRatio = cottonInrPerKg / estimatedPsfInr;

  // Dynamic Synthetic & Blended Yarn Live Prices (sensitive to crude oil & cotton spot)
  const polyesterYarnUSD = estimatedPsfUSD + 0.85;
  const polyesterYarnInr = polyesterYarnUSD * simulatedInr;

  const nylonCaprolactamUSD = (crudeOil * 15 + 450) / 1000;
  const nylonYarnUSD = nylonCaprolactamUSD + 1.20;
  const nylonYarnInr = nylonYarnUSD * simulatedInr;

  const acrylicAnUSD = (crudeOil * 11 + 400) / 1000;
  const acrylicYarnUSD = acrylicAnUSD + 1.10;
  const acrylicYarnInr = acrylicYarnUSD * simulatedInr;

  const pcYarnInr = (0.65 * estimatedPsfInr) + (0.35 * cottonInrPerKg) + 98;
  const pcYarnUSD = pcYarnInr / simulatedInr;

  const vsfInr = 150; // Stable domestic Viscose baseline (INR/kg)
  const pvYarnInr = (0.65 * estimatedPsfInr) + (0.35 * vsfInr) + 87;
  const pvYarnUSD = pvYarnInr / simulatedInr;

  const spandexPolyurethaneUSD = (crudeOil * 30 + 1300) / 1000;
  const spandexYarnUSD = spandexPolyurethaneUSD + 1.20;
  const spandexYarnInr = spandexYarnUSD * simulatedInr;
  // Dynamic Simulation of Polyester Supply and Cotton Demand based on Crude Oil price
  // Baseline (when crude = 80): Polyester Supply = 95%, Cotton Demand = 88%
  // As crude oil rises, PSF supply capacity index declines and cotton demand index rises
  const crudeDeviation = crudeOil - 80; // Deviation from baseline oil price
  
  // Calculate simulated current indices
  const simulatedPolySupply = Math.max(70, Math.min(100, 95 - (crudeDeviation * 0.4))); // Contracts with high oil
  const simulatedCottonDemand = Math.max(75, Math.min(100, 88 + (crudeDeviation * 0.3))); // Expands with high oil (substitution)

  const demandSupplyTrendData = [
    { month: 'Jul 25', Brent: 78.5, PolySupply: 96, CottonDemand: 86 },
    { month: 'Aug 25', Brent: 82.1, PolySupply: 94, CottonDemand: 87 },
    { month: 'Sep 25', Brent: 84.8, PolySupply: 92, CottonDemand: 89 },
    { month: 'Oct 25', Brent: 81.2, PolySupply: 95, CottonDemand: 88 },
    { month: 'Nov 25', Brent: 79.5, PolySupply: 96, CottonDemand: 87 },
    { month: 'Dec 25', Brent: 77.0, PolySupply: 98, CottonDemand: 85 },
    { month: 'Jan 26', Brent: 63.65, PolySupply: 98, CottonDemand: 82 }, // January average (Brent spot low $61.08 on Jan 7)
    { month: 'Feb 26', Brent: 75.80, PolySupply: 94, CottonDemand: 85 }, // Late February Khamenei dies (Feb 28)
    { month: 'Mar 26', Brent: 118.50, PolySupply: 75, CottonDemand: 95 }, // Strait blockade starts, capacity down to 5%
    { month: 'Apr 26', Brent: 138.21, PolySupply: 68, CottonDemand: 99 }, // YTD High April 7 ($138.21)
    { month: 'May 26', Brent: 100.43, PolySupply: 86, CottonDemand: 92 }, // May average ($100.43)
    { month: 'Jun 26', Brent: crudeOil, PolySupply: simulatedPolySupply, CottonDemand: simulatedCottonDemand }
  ];
  const inrPurchaseValueData = [
    { month: 'Jul 25', BrentUSD: 78.50, usdInr: 83.12, LandedCostINR: Math.round(78.50 * 83.12) },
    { month: 'Aug 25', BrentUSD: 82.10, usdInr: 83.45, LandedCostINR: Math.round(82.10 * 83.45) },
    { month: 'Sep 25', BrentUSD: 84.80, usdInr: 83.82, LandedCostINR: Math.round(84.80 * 83.82) },
    { month: 'Oct 25', BrentUSD: 81.20, usdInr: 84.05, LandedCostINR: Math.round(81.20 * 84.05) },
    { month: 'Nov 25', BrentUSD: 79.50, usdInr: 84.20, LandedCostINR: Math.round(79.50 * 84.20) },
    { month: 'Dec 25', BrentUSD: 77.00, usdInr: 84.32, LandedCostINR: Math.round(77.00 * 84.32) },
    { month: 'Jan 26', BrentUSD: 63.65, usdInr: 85.50, LandedCostINR: Math.round(63.65 * 85.50) },
    { month: 'Feb 26', BrentUSD: 75.80, usdInr: 88.50, LandedCostINR: Math.round(75.80 * 88.50) },
    { month: 'Mar 26', BrentUSD: 118.50, usdInr: 92.50, LandedCostINR: Math.round(118.50 * 92.50) },
    { month: 'Apr 26', BrentUSD: 138.21, usdInr: 95.12, LandedCostINR: Math.round(138.21 * 95.12) },
    { month: 'May 26', BrentUSD: 100.43, usdInr: 94.80, LandedCostINR: Math.round(100.43 * 94.80) },
    { month: 'Jun 26', BrentUSD: crudeOil, usdInr: simulatedInr, LandedCostINR: Math.round(crudeOil * simulatedInr) }
  ];

  // Dynamic July and August forecasts for oil, currency, cotton, and PSF
  const brentJul = Math.max(75, crudeOil - 7.5);
  const inrJul = Math.max(80, simulatedInr - 1.5);
  const ptaJul = brentJul * 8.5 + 40;
  const megJul = brentJul * 5.2 + 70;
  const psfInrJul = ((ptaJul / 1000) * inrJul * 0.855) + ((megJul / 1000) * inrJul * 0.335) + 20;
  const psfUsdJul = psfInrJul / inrJul;
  const psfCentsJul = parseFloat(((psfInrJul / inrJul) * 100 / 2.20462).toFixed(2));

  const cottonSpotJulUSD = Math.max(78, cottonSpot - 3.2) * 2.20462 / 100;
  const cottonSpotJulINR = cottonSpotJulUSD * inrJul;

  const brentAug = Math.max(70, crudeOil - 11.5);
  const inrAug = Math.max(80, simulatedInr - 2.8);
  const ptaAug = brentAug * 8.5 + 40;
  const megAug = brentAug * 5.2 + 70;
  const psfInrAug = ((ptaAug / 1000) * inrAug * 0.855) + ((megAug / 1000) * inrAug * 0.335) + 20;
  const psfUsdAug = psfInrAug / inrAug;
  const psfCentsAug = parseFloat(((psfInrAug / inrAug) * 100 / 2.20462).toFixed(2));

  const cottonSpotAugUSD = Math.max(75, cottonSpot - 5.5) * 2.20462 / 100;
  const cottonSpotAugINR = cottonSpotAugUSD * inrAug;

  // Mock historical correlation data for Brent, Cotlook A, and Polyester PSF (cents/lb equivalent)
  const correlationData = [
    { month: 'Jul 25', Brent: 78.5, CotlookA: globalCotton?.prices?.monthlyTrend?.[0]?.AIndex || 91.8, PolyesterPSF: 52.0 },
    { month: 'Aug 25', Brent: 82.1, CotlookA: globalCotton?.prices?.monthlyTrend?.[1]?.AIndex || 93.2, PolyesterPSF: 53.5 },
    { month: 'Sep 25', Brent: 84.8, CotlookA: globalCotton?.prices?.monthlyTrend?.[2]?.AIndex || 94.0, PolyesterPSF: 54.8 },
    { month: 'Oct 25', Brent: 81.2, CotlookA: globalCotton?.prices?.monthlyTrend?.[3]?.AIndex || 92.5, PolyesterPSF: 52.9 },
    { month: 'Nov 25', Brent: 79.5, CotlookA: globalCotton?.prices?.monthlyTrend?.[4]?.AIndex || 91.0, PolyesterPSF: 51.5 },
    { month: 'Dec 25', Brent: 77.0, CotlookA: globalCotton?.prices?.monthlyTrend?.[5]?.AIndex || 89.5, PolyesterPSF: 50.2 },
    { month: 'Jan 26', Brent: 63.65, CotlookA: globalCotton?.prices?.monthlyTrend?.[6]?.AIndex || 85.0, PolyesterPSF: 43.5 },
    { month: 'Feb 26', Brent: 75.80, CotlookA: globalCotton?.prices?.monthlyTrend?.[7]?.AIndex || 88.5, PolyesterPSF: 49.8 },
    { month: 'Mar 26', Brent: 118.50, CotlookA: globalCotton?.prices?.monthlyTrend?.[8]?.AIndex || 94.0, PolyesterPSF: 74.2 },
    { month: 'Apr 26', Brent: 138.21, CotlookA: globalCotton?.prices?.monthlyTrend?.[9]?.AIndex || 98.5, PolyesterPSF: 88.6 },
    { month: 'May 26', Brent: 100.43, CotlookA: globalCotton?.prices?.monthlyTrend?.[10]?.AIndex || 90.8, PolyesterPSF: 65.4 },
    { month: 'Jun 26', Brent: crudeOil, CotlookA: cottonSpot, PolyesterPSF: parseFloat((estimatedPsfUSD * 100 / 2.20462).toFixed(2)) },
    { 
      month: 'Jul 26 (Est)', 
      Brent: brentJul, 
      CotlookA: parseFloat(Math.max(78, cottonSpot - 3.2).toFixed(2)), 
      PolyesterPSF: psfCentsJul 
    },
    { 
      month: 'Aug 26 (FC)', 
      Brent: brentAug, 
      CotlookA: parseFloat(Math.max(75, cottonSpot - 5.5).toFixed(2)), 
      PolyesterPSF: psfCentsAug 
    }
  ];
  // Mock WTI and Brent Crude historical prices (USD/bbl)
  const oilTrendData = [
    { month: 'Jul 25', Brent: 78.5, WTI: 74.2 },
    { month: 'Aug 25', Brent: 82.1, WTI: 77.8 },
    { month: 'Sep 25', Brent: 84.8, WTI: 80.5 },
    { month: 'Oct 25', Brent: 81.2, WTI: 76.9 },
    { month: 'Nov 25', Brent: 79.5, WTI: 75.3 },
    { month: 'Dec 25', Brent: 77.0, WTI: 73.1 },
    { month: 'Jan 26', Brent: 63.65, WTI: 56.01 }, // Jan Average Brent: 63.65, WTI Spot: 56.01
    { month: 'Feb 26', Brent: 75.80, WTI: 70.20 },
    { month: 'Mar 26', Brent: 118.50, WTI: 102.40 },
    { month: 'Apr 26', Brent: 138.21, WTI: 114.58 }, // YTD High Apr 7 Brent $138.21, WTI $114.58
    { month: 'May 26', Brent: 100.43, WTI: 95.20 }, // May Average Brent $100.43
    { month: 'Jun 26', Brent: crudeOil, WTI: crudeOil === 94.98 ? 92.16 : crudeOil * 0.96 }, // June 1 Brent: $94.98, WTI: $92.16
    { 
      month: 'Jul 26 (Est)', 
      Brent: brentJul, 
      WTI: parseFloat(Math.max(71.5, brentJul * 0.96).toFixed(2)) 
    },
    { 
      month: 'Aug 26 (FC)', 
      Brent: brentAug, 
      WTI: parseFloat(Math.max(66.5, brentAug * 0.96).toFixed(2)) 
    }
  ];

  // Cotton vs. Polyester Supply & Demand Indices
  const cottonPolySupplyDemandData = [
    { month: 'Jul 25', CottonSupply: 86, CottonDemand: 82, PolySupply: 94, PolyDemand: 88 },
    { month: 'Aug 25', CottonSupply: 88, CottonDemand: 84, PolySupply: 93, PolyDemand: 89 },
    { month: 'Sep 25', CottonSupply: 85, CottonDemand: 86, PolySupply: 91, PolyDemand: 90 },
    { month: 'Oct 25', CottonSupply: 89, CottonDemand: 85, PolySupply: 94, PolyDemand: 88 },
    { month: 'Nov 25', CottonSupply: 92, CottonDemand: 84, PolySupply: 95, PolyDemand: 87 },
    { month: 'Dec 25', CottonSupply: 94, CottonDemand: 83, PolySupply: 97, PolyDemand: 85 },
    { month: 'Jan 26', CottonSupply: 96, CottonDemand: 80, PolySupply: 97, PolyDemand: 82 },
    { month: 'Feb 26', CottonSupply: 90, CottonDemand: 83, PolySupply: 93, PolyDemand: 84 },
    { month: 'Mar 26', CottonSupply: 82, CottonDemand: 91, PolySupply: 78, PolyDemand: 80 },
    { month: 'Apr 26', CottonSupply: 78, CottonDemand: 95, PolySupply: 70, PolyDemand: 76 },
    { month: 'May 26', CottonSupply: 84, CottonDemand: 89, PolySupply: 82, PolyDemand: 84 },
    { 
      month: 'Jun 26', 
      CottonSupply: Math.round(Math.max(75, Math.min(100, 85 + (cottonSpot - 87.92) * 0.2))), 
      CottonDemand: Math.round(Math.max(75, Math.min(100, 88 + (crudeOil - 94.98) * 0.3 - (cottonSpot - 87.92) * 0.4))), 
      PolySupply: Math.round(simulatedPolySupply), 
      PolyDemand: Math.round(Math.max(70, Math.min(100, 85 - (crudeOil - 94.98) * 0.25 + (cottonSpot - 87.92) * 0.3))) 
    },
    { 
      month: 'Jul 26 (Est)', 
      CottonSupply: Math.round(Math.max(75, Math.min(100, 83 + (cottonSpot - 87.92) * 0.18))), 
      CottonDemand: Math.round(Math.max(75, Math.min(100, 85 + (brentJul - 94.98) * 0.28 - (Math.max(78, cottonSpot - 3.2) - 87.92) * 0.38))), 
      PolySupply: Math.round(95 - (brentJul - 80) * 0.4), 
      PolyDemand: Math.round(Math.max(70, Math.min(100, 87 - (brentJul - 94.98) * 0.22 + (Math.max(78, cottonSpot - 3.2) - 87.92) * 0.28))) 
    },
    { 
      month: 'Aug 26 (FC)', 
      CottonSupply: Math.round(Math.max(75, Math.min(100, 81 + (cottonSpot - 87.92) * 0.15))), 
      CottonDemand: Math.round(Math.max(75, Math.min(100, 83 + (brentAug - 94.98) * 0.25 - (Math.max(75, cottonSpot - 5.5) - 87.92) * 0.35))), 
      PolySupply: Math.round(95 - (brentAug - 80) * 0.4), 
      PolyDemand: Math.round(Math.max(70, Math.min(100, 88 - (brentAug - 94.98) * 0.2 + (Math.max(75, cottonSpot - 5.5) - 87.92) * 0.25))) 
    }
  ];

  // Cotton vs. Polyester Price Movement in ₹/Kg Landed Equivalent
  const cottonPolyPriceMovementData = [
    { month: 'Jul 25', CottonPrice: 170.2, PolyPrice: 98.5 },
    { month: 'Aug 25', CottonPrice: 172.5, PolyPrice: 99.8 },
    { month: 'Sep 25', CottonPrice: 175.4, PolyPrice: 101.2 },
    { month: 'Oct 25', CottonPrice: 171.1, PolyPrice: 98.4 },
    { month: 'Nov 25', CottonPrice: 169.3, PolyPrice: 96.8 },
    { month: 'Dec 25', CottonPrice: 165.8, PolyPrice: 94.2 },
    { month: 'Jan 26', CottonPrice: 158.4, PolyPrice: 86.5 },
    { month: 'Feb 26', CottonPrice: 168.2, PolyPrice: 96.5 },
    { month: 'Mar 26', CottonPrice: 185.6, PolyPrice: 132.4 },
    { month: 'Apr 26', CottonPrice: 198.8, PolyPrice: 158.2 },
    { month: 'May 26', CottonPrice: 182.4, PolyPrice: 128.5 },
    { 
      month: 'Jun 26', 
      CottonPrice: parseFloat(cottonInrPerKg.toFixed(1)), 
      PolyPrice: parseFloat(estimatedPsfInr.toFixed(1)) 
    },
    { 
      month: 'Jul 26 (Est)', 
      CottonPrice: parseFloat(cottonSpotJulINR.toFixed(1)), 
      PolyPrice: parseFloat(psfInrJul.toFixed(1)) 
    },
    { 
      month: 'Aug 26 (FC)', 
      CottonPrice: parseFloat(cottonSpotAugINR.toFixed(1)), 
      PolyPrice: parseFloat(psfInrAug.toFixed(1)) 
    }
  ];

  // India monthly Oil Purchasing value vs Forex holdings dataset
  const monthlyOilPurchasingReserves = [
    { month: 'Jul 25', PurchaseValue: 81.56, ForexHoldings: 250.0 },
    { month: 'Aug 25', PurchaseValue: 85.64, ForexHoldings: 248.5 },
    { month: 'Sep 25', PurchaseValue: 88.85, ForexHoldings: 245.0 },
    { month: 'Oct 25', PurchaseValue: 85.31, ForexHoldings: 247.2 },
    { month: 'Nov 25', PurchaseValue: 83.67, ForexHoldings: 252.0 },
    { month: 'Dec 25', PurchaseValue: 81.16, ForexHoldings: 255.0 },
    { month: 'Jan 26', PurchaseValue: 68.03, ForexHoldings: 262.5 },
    { month: 'Feb 26', PurchaseValue: 83.85, ForexHoldings: 258.0 },
    { month: 'Mar 26', PurchaseValue: 137.02, ForexHoldings: 235.0 },
    { month: 'Apr 26', PurchaseValue: 164.29, ForexHoldings: 220.0 },
    { month: 'May 26', PurchaseValue: 119.01, ForexHoldings: 245.0 },
    { 
      month: 'Jun 26', 
      PurchaseValue: parseFloat((125 * crudeOil * simulatedInr / 10000).toFixed(2)), 
      ForexHoldings: parseFloat((245.0 + (96.83 - simulatedInr) * 15).toFixed(2)) 
    },
    { 
      month: 'Jul 26 (Est)', 
      PurchaseValue: parseFloat((125 * Math.max(75, crudeOil - 7.5) * Math.max(80, simulatedInr - 1.5) / 10000).toFixed(2)), 
      ForexHoldings: parseFloat((250.0 + (96.83 - simulatedInr) * 12).toFixed(2)) 
    },
    { 
      month: 'Aug 26 (FC)', 
      PurchaseValue: parseFloat((125 * Math.max(70, crudeOil - 11.5) * Math.max(80, simulatedInr - 2.8) / 10000).toFixed(2)), 
      ForexHoldings: parseFloat((255.0 + (96.83 - simulatedInr) * 10).toFixed(2)) 
    }
  ];

  // Crude Oil usage share breakdown dataset
  const crudeOilUsageShares = [
    { name: 'Public Usage (LPG/Transport)', value: 50, color: colors.chartPalette[0] },
    { name: 'Mills & Industrial (Synthetics/PSF)', value: 25, color: colors.chartPalette[1] },
    { name: 'Government Usage (Defense/Reserves)', value: 15, color: colors.chartPalette[2] },
    { name: 'Other Usage (Aviation/Agri)', value: 10, color: colors.chartPalette[3] }
  ];

  // Maritime Freight Index and transit days dataset (including 2-month forecast)
  const maritimeFreightData = [
    { month: 'Jul 25', FreightCostUSD: 1850, TransitDays: 19 },
    { month: 'Aug 25', FreightCostUSD: 1900, TransitDays: 19 },
    { month: 'Sep 25', FreightCostUSD: 2100, TransitDays: 20 },
    { month: 'Oct 25', FreightCostUSD: 2050, TransitDays: 20 },
    { month: 'Nov 25', FreightCostUSD: 2200, TransitDays: 21 },
    { month: 'Dec 25', FreightCostUSD: 2400, TransitDays: 22 },
    { month: 'Jan 26', FreightCostUSD: 3100, TransitDays: 25 }, 
    { month: 'Feb 26', FreightCostUSD: 4800, TransitDays: 32 }, 
    { month: 'Mar 26', FreightCostUSD: 5900, TransitDays: 36 }, 
    { month: 'Apr 26', FreightCostUSD: 6200, TransitDays: 38 }, 
    { month: 'May 26', FreightCostUSD: 5400, TransitDays: 34 }, 
    { 
      month: 'Jun 26', 
      FreightCostUSD: Math.round(4200 + (crudeOil - 80) * 25), 
      TransitDays: Math.round(30 + (crudeOil > 100 ? 5 : 0)) 
    },
    { 
      month: 'Jul 26 (Est)', 
      FreightCostUSD: Math.round(3600 + (crudeOil - 80) * 20), 
      TransitDays: Math.round(26 + (crudeOil > 100 ? 4 : 0)) 
    },
    { 
      month: 'Aug 26 (FC)', 
      FreightCostUSD: Math.round(3100 + (crudeOil - 80) * 15), 
      TransitDays: Math.round(22 + (crudeOil > 100 ? 3 : 0)) 
    }
  ];

  // Global shipping corridors matrix
  const shippingRoutes = [
    { 
      route: 'Mundra to Rotterdam (Europe)', 
      baseDays: 18, 
      detourDays: 32, 
      baseFreight: 2200, 
      surcharge: Math.round(1500 + (crudeOil - 80) * 10), 
      status: 'Delayed (Cape detours)',
      congestion: 'High (Rotterdam backlogs)'
    },
    { 
      route: 'Mundra to Ambarli (Turkey)', 
      baseDays: 14, 
      detourDays: 26, 
      baseFreight: 1900, 
      surcharge: Math.round(1200 + (crudeOil - 80) * 8), 
      status: 'Delayed',
      congestion: 'Medium'
    },
    { 
      route: 'Chennai to Chittagong (Bangladesh)', 
      baseDays: 4, 
      detourDays: 4, 
      baseFreight: 650, 
      surcharge: Math.round(150 + (crudeOil - 80) * 2), 
      status: 'Normal Transit',
      congestion: 'High (Chittagong port locks)'
    },
    { 
      route: 'Chennai to Shanghai (China)', 
      baseDays: 12, 
      detourDays: 12, 
      baseFreight: 1100, 
      surcharge: Math.round(250 + (crudeOil - 80) * 3), 
      status: 'Normal Transit',
      congestion: 'Low'
    },
    { 
      route: 'Mundra to New York (US East Coast)', 
      baseDays: 22, 
      detourDays: 35, 
      baseFreight: 3400, 
      surcharge: Math.round(1800 + (crudeOil - 80) * 15), 
      status: 'Delayed (Cape detours)',
      congestion: 'High (NY/NJ terminal wait)'
    }
  ];

  // Geopolitical conflict events list
  const geopoliticalConflicts = [
    {
      id: 'red-sea',
      title: 'Red Sea Transit Crisis',
      status: 'Critical',
      icon: 'ship',
      impact: 'Rerouting via Cape of Good Hope adds 10-15 days to shipping schedules.',
      cottonEffect: 'Indian yarn and raw cotton exports to Europe and Turkey face +₹350/candy freight surcharges. Container shortages are bottlenecking Mundra and Chennai ports.',
      syntheticEffect: 'Spikes spot chemical raw material costs for polyester exports from China and South Korea to Western hubs.',
      badgeColor: 'bg-red-500/10 border-red-500/30 text-red-500'
    },
    {
      id: 'middle-east',
      title: 'Iran Conflict & Hormuz Blockade',
      status: 'Critical',
      icon: 'explosion',
      impact: 'Supreme Leader Ayatollah Khamenei’s death (Feb 28, 2026) sparked US/Israel/Iran conflict, closing Strait of Hormuz (flows fell to 5% capacity). Cleared minefields delay transit restoration.',
      cottonEffect: 'Drives USD/INR up (Rupee drop), making imported cotton expensive. Boosts natural cotton demand as spinners substitute away from high-priced synthetics.',
      syntheticEffect: 'Spiked Brent to $138.21/bbl (April peak). Feedstocks PTA/MEG soared, forcing 14.4M b/d regional shut-ins and squeezing synthetic fiber margins.',
      badgeColor: 'bg-red-500/10 border-red-500/30 text-red-500'
    },
    {
      id: 'opec-fracture',
      title: 'OPEC Fracture: UAE Strategic Exit',
      status: 'High (Structural)',
      icon: 'policy',
      impact: 'The UAE officially withdrew from OPEC on May 1, 2026, to monetize its 4.3M b/d (target 5M b/d by 2027) capacity, bypassing Saudi-led quotas.',
      cottonEffect: 'Once shipping routes normalize, a surge of non-aligned UAE supply is expected to drop 2027 Brent to $70–$79, lowering synthetic fiber costs and reversing substitution pressure.',
      syntheticEffect: 'Ends cohesive cartel production management, introducing a highly competitive market-share battle that will lower long-term polyester precursor costs.',
      badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-500'
    },
    {
      id: 'europe-energy',
      title: 'European Energy Surcharges & War',
      status: 'High',
      icon: 'electric_bolt',
      impact: 'Electricity and gas prices remain volatile across Western Europe due to natural gas transit cutoffs.',
      cottonEffect: 'European spinning mills operating at high utility rates are forced to cut capacities by 15-20%, shifting import demand to yarn suppliers in India, Turkey, and Pakistan.',
      syntheticEffect: 'German and Italian specialty polyester and nylon yarn facilities are idle or running at reduced shifts due to high processing energy overheads.',
      badgeColor: 'bg-amber-500/10 border-amber-500/30 text-amber-500'
    },
    {
      id: 'xinjiang-ban',
      title: 'Xinjiang UFLPA Enforcement & Tariff War',
      status: 'High',
      icon: 'policy',
      impact: 'Strict compliance audits under the US Uyghur Forced Labor Prevention Act (UFLPA).',
      cottonEffect: 'Creates a bifurcated market: cotton products from Xinjiang trade at a heavy discount inside China (approx ₹10,000/candy discount), while international varieties (US, Brazil, India DCH) command premium prices for certified export order flows.',
      syntheticEffect: 'Minimal direct chemical impact, but prompts blending substitution adjustments in Chinese textile mills seeking domestic polyester products to mix with non- Xinjiang cotton.',
      badgeColor: 'bg-primary/10 border-primary/30 text-primary'
    }
  ];

  // Determine substitution pressure level
  const getSubstitutionAlert = () => {
    if (parityRatio > 1.5) {
      return {
        level: 'Critical - Extreme Substitution Pressure',
        desc: 'Cotton is over 50% more expensive than Polyester. Spinning mills will aggressively increase polyester and viscose blending ratios (e.g. shifting from 100% cotton to 65/35 PC or 50/50 Blends) to control input costs. Expect strong demand headwinds for raw cotton.',
        color: 'text-red-500 bg-red-500/10 border-red-500/20',
        recommendation: 'Strategy: Ginneries should reduce spot cotton stock holdings. Mills should secure blended yarn supply contracts.'
      };
    }
    if (parityRatio > 1.25) {
      return {
        level: 'High - Blending Optimization Recommended',
        desc: 'Cotton commands a high premium. Mills will optimize fiber blends, replacing 10-15% of combed cotton with recycled polyester or spun viscose in blends. Cotton demand will grow slowly.',
        color: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        recommendation: 'Strategy: Lock in cotton purchases only for short-term 30-day needs. Evaluate polyester stock reserves.'
      };
    }
    return {
      level: 'Balanced Parity - High Cotton Affinity',
      desc: 'The Cotton-to-Polyester ratio is at a healthy baseline. Spinners prefer 100% cotton order sheets. Polyester blending is driven solely by technical specifications rather than cost arbitrage.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      recommendation: 'Strategy: Accumulate quality cotton varieties. Blended polyester yarns are stable.'
    };
  };

  const substitutionAlert = getSubstitutionAlert();

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-tertiary/10 via-primary/5 to-transparent border border-tertiary/20 rounded-xxl p-6 shadow-sm relative overflow-hidden">
        <h3 className="text-lg font-bold text-tertiary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary">globe</span>
          Global Market, Energy & Geopolitics Desk
        </h3>
        <p className="text-xs text-on-surface-variant max-w-4xl leading-relaxed">
          The international cotton and synthetic fiber markets are profoundly intertwined with energy costs and geopolitical stability. 
          **Polyester Staple Fiber (PSF)** is a direct petrochemical derivative. spattering crude oil prices raise precursor costs for 
          **PTA** and **MEG**, lifting synthetic yarn rates. Concurrently, maritime wars and territorial blocks disrupt shipping routes, 
          causing freight hikes and supply localization.
        </p>
      </div>

      {/* Top Benchmarks Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Brent Crude */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Brent Crude Oil</span>
            <span className="material-symbols-outlined text-primary text-xs">oil_barrel</span>
          </div>
          <div className="text-xl font-black text-primary font-mono mt-1">${crudeOil.toFixed(2)}</div>
          <span className="text-[9px] font-mono text-emerald-500 font-bold block mt-1">+1.2% Daily Settle</span>
        </div>

        {/* PTA Feedstock */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>PTA (Feedstock)</span>
            <span className="material-symbols-outlined text-outline text-xs">science</span>
          </div>
          <div className="text-xl font-black text-on-surface font-mono mt-1">${estimatedPta}</div>
          <span className="text-[9px] font-mono text-on-surface-variant block mt-1">USD/Metric Ton (Est.)</span>
        </div>

        {/* MEG Feedstock */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>MEG (Feedstock)</span>
            <span className="material-symbols-outlined text-outline text-xs">biotech</span>
          </div>
          <div className="text-xl font-black text-on-surface font-mono mt-1">${estimatedMeg}</div>
          <span className="text-[9px] font-mono text-on-surface-variant block mt-1">USD/Metric Ton (Est.)</span>
        </div>

        {/* PSF Global */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Polyester PSF</span>
            <span className="material-symbols-outlined text-tertiary text-xs">precision_manufacturing</span>
          </div>
          <div className="text-xl font-black text-tertiary font-mono mt-1">${estimatedPsfUSD.toFixed(2)}</div>
          <span className="text-[9px] font-mono text-tertiary font-bold block mt-1">₹{estimatedPsfInr.toFixed(1)}/Kg Equivalent</span>
        </div>

        {/* Cotlook A-Index */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Cotlook A-Index</span>
            <span className="material-symbols-outlined text-emerald-500 text-xs">eco</span>
          </div>
          <div className="text-xl font-black text-emerald-500 font-mono mt-1">{cottonSpot.toFixed(2)}¢</div>
          <span className="text-[9px] font-mono text-emerald-500 font-bold block mt-1">₹{cottonInrPerKg.toFixed(1)}/Kg Equivalent</span>
        </div>

        {/* Parity Index */}
        <div className="glass-card border rounded-xl p-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Cotton/PSF Ratio</span>
            <span className="material-symbols-outlined text-amber-500 text-xs">compare_arrows</span>
          </div>
          <div className="text-xl font-black text-amber-500 font-mono mt-1">{parityRatio.toFixed(2)}x</div>
          <span className="text-[9px] font-mono text-on-surface-variant block mt-1">Spread: ₹{priceSpreadInr.toFixed(0)}/Kg</span>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Geopolitical & Shipping Risk Table & Supply/Demand Chart */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card border rounded-xxl p-5" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base">emergency_home</span>
              Geopolitical Risk & Shipping Route Disruptions
            </h4>

            <div className="space-y-4">
              {geopoliticalConflicts.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border border-outline-variant/15 bg-surface-container-low/30 hover:bg-surface-container-low/55 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-lg">
                        {c.icon === 'ship' ? 'directions_boat' : c.icon === 'electric_bolt' ? 'flash_on' : c.icon === 'policy' ? 'gavel' : 'dangerous'}
                      </span>
                      <span className="text-xs font-black text-on-surface font-mono">{c.title}</span>
                    </div>
                    <span className={`text-[9px] font-mono font-bold border px-2 py-0.5 rounded-full ${c.badgeColor}`}>
                      {c.status} Impact
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant font-medium leading-relaxed mb-2">
                    <strong>Route Bottleneck:</strong> {c.impact}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-outline-variant/10 text-[10px] font-mono">
                    <div className="space-y-1">
                      <span className="text-emerald-500 font-bold uppercase text-[9px] block">Cotton Market Affection:</span>
                      <p className="text-on-surface-variant leading-relaxed">{c.cottonEffect}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-tertiary font-bold uppercase text-[9px] block">Polyester & Synthetic Affection:</span>
                      <p className="text-on-surface-variant leading-relaxed">{c.syntheticEffect}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Energy Spike & Substitution Dynamics Chart */}
          <div className="glass-card border rounded-xxl p-5 text-xs font-mono space-y-4" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
            <div>
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider border-b border-outline-variant/20 pb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">analytics</span>
                Oil Price vs. Polyester Supply & Cotton Substitution
              </h4>
              <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                Rising crude oil prices inflate petrochemical feedstocks, squeezing polyester producer margins and forcing run-rate/supply cuts. As a result, spinning mills substitute polyester for natural cotton, lifting domestic and global cotton demand.
              </p>
            </div>

            <div className="h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={demandSupplyTrendData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis yAxisId="left" fontSize={9} stroke={colors.chartPalette[0]} tickFormatter={(v) => `$${v}`} />
                  <YAxis yAxisId="right" orientation="right" fontSize={9} stroke="var(--color-outline)" tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="Brent" name="Brent Crude ($/bbl)" stroke={colors.chartPalette[0]} strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="PolySupply" name="Polyester PSF Supply Index" stroke={colors.chartPalette[2]} strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="CottonDemand" name="Cotton Demand Index (Substitution)" stroke={colors.chartPalette[4]} strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-surface-container-low/60 rounded-lg border border-outline-variant/10 text-[10px] text-on-surface-variant space-y-2 leading-relaxed">
              <div>
                <span className="font-bold text-primary uppercase block">1. Crude Oil Surge & Polyester Supply Deficit:</span>
                Spiking crude increases feedstock costs. Polyester margin squeeze forces producers to cut capacity utilization (simulated capacity: <span className="font-bold" style={{ color: colors.chartPalette[2] }}>{simulatedPolySupply.toFixed(1)}%</span>).
              </div>
              <div>
                <span className="font-bold text-emerald-500 uppercase block">2. Cotton Substitution Demand Gain:</span>
                As polyester fiber rates soar, spinning mills increase cotton blend ratios, pushing natural cotton demand index higher (simulated index: <span className="font-bold" style={{ color: colors.chartPalette[4] }}>{simulatedCottonDemand.toFixed(1)}%</span>).
              </div>
            </div>
          </div>
        </div>

        {/* Chart Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Historical Correlation Chart */}
          <div className="glass-card border rounded-xxl p-5" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex justify-between items-center">
              <span>Oil vs. Cotton vs. Polyester Correlation</span>
              <span className="text-[9px] text-emerald-500 font-bold">12M Trend</span>
            </h4>
            <div className="h-56 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={correlationData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis fontSize={9} stroke="var(--color-outline)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Line type="monotone" dataKey="Brent" name="Brent Crude ($/bbl)" stroke={colors.chartPalette[0]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="CotlookA" name="Cotlook A (¢/lb)" stroke={colors.chartPalette[4]} strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="PolyesterPSF" name="Polyester PSF (¢/lb equiv)" stroke={colors.chartPalette[2]} strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/15 text-[10px] text-on-surface-variant font-mono leading-relaxed">
              <p><strong>Note:</strong> Correlation factor is high (**~0.82**) between Crude Oil and Polyester PSF. Spikes in crude translate to PSF cost increases within 14 days, reducing cotton-polyester price spreads.</p>
            </div>
          </div>

          {/* Crude Oil Price Benchmark Trend (Brent vs. WTI) */}
          <div className="glass-card border rounded-xxl p-5" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex justify-between items-center">
              <span>Crude Oil Price Trend (Brent vs. WTI)</span>
              <span className="text-[9px] text-primary font-bold">USD/Barrel</span>
            </h4>
            <div className="h-56 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={oilTrendData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis domain={['auto', 'auto']} fontSize={9} stroke="var(--color-outline)" tickFormatter={(v) => `$${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(v) => [`$${v.toFixed(2)}`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Line type="monotone" dataKey="Brent" name="Brent Crude" stroke={colors.chartPalette[0]} strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="WTI" name="WTI Crude" stroke={colors.chartPalette[2]} strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/15 space-y-2.5 text-[10px] font-mono leading-relaxed">
              <div className="flex justify-between text-on-surface-variant">
                <span>Spread Premium: ${(crudeOil * 0.04).toFixed(2)}/bbl</span>
                <span>Baseline: OPEC+ Production Quotas</span>
              </div>
              <div className="p-3 bg-surface-container-low/60 rounded-lg border border-outline-variant/10 text-on-surface-variant space-y-2">
                <div>
                  <span className="font-bold text-primary uppercase block">Geopolitical War Shock (Jan-April):</span>
                  Ayatollah Khamenei’s death on Feb 28 triggered naval conflict and Strait of Hormuz blockade. Brent peaked at **$138.21/bbl** and WTI at **$114.58/bbl** on April 7, draining 246M bbl of inventories.
                </div>
                <div>
                  <span className="font-bold text-emerald-500 uppercase block">Next 2-Month (July/August) Drop Forecast:</span>
                  Gravity is pulling prices down as Hormuz clears. Brent is forecast to average **$84–$87 in July** (ending near $83.91, -6% drop) and **$84–$89 in August**. Saudi Arabia is cutting July selling prices and China crude demand is weak (imports down to 333k b/d). Downside target is **$89/b average in Q4 2026** and **$79/b in 2027**.
                </div>
                <div>
                  <span className="font-bold text-tertiary uppercase block">NSE Watchlist & India Trading Angle:</span>
                  Lower crude is a net positive for India’s oil marketing companies (**BPCL, HPCL, IOC**) and aviation (**Indigo, SpiceJet**) on better refining/fuel margins. Upstream explorer **ONGC** will face revenue contraction as global price premiums fade.
                </div>
              </div>
            </div>
          </div>

          {/* Crude Oil Utilizations in Synthetic & Blended Yarns */}
          <div className="glass-card border rounded-xxl p-5 text-xs font-mono space-y-4" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
            <div>
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider border-b border-outline-variant/20 pb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">layers</span>
                Crude Oil Utilizations in Yarns Directory
              </h4>
              <p className="text-[10px] text-on-surface-variant mt-1 leading-relaxed">
                Synthetic and blended yarns utilize refinery outputs extracted from crude oil cracking and distillations.
              </p>
            </div>

            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {/* Polyester */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary">1. Polyester Yarn (Spun/Filament)</span>
                  <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">100% Synthetic</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${polyesterYarnUSD.toFixed(2)}/kg (~₹{Math.round(polyesterYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Oil Feedstock:</strong> PTA & MEG (Naphtha-based) | <strong>Feedstock Cost:</strong> ${estimatedPsfUSD.toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> Sportswear, activewear, wrinkle-resistant shirts, bedsheets.
                </p>
              </div>

              {/* Nylon */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-tertiary">2. Nylon Yarn (Polyamide)</span>
                  <span className="text-[9px] font-bold bg-tertiary/10 text-tertiary px-2 py-0.5 rounded-full">100% Synthetic</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-tertiary mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${nylonYarnUSD.toFixed(2)}/kg (~₹{Math.round(nylonYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Oil Feedstock:</strong> Caprolactam (Benzene-based) | <strong>Feedstock Cost:</strong> ${nylonCaprolactamUSD.toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> High-stretch swimwear, hosiery, activewear, ropes, industrial carpets.
                </p>
              </div>

              {/* Acrylic */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-amber-500">3. Acrylic Yarn (Wool Mimic)</span>
                  <span className="text-[9px] font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded-full">100% Synthetic</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500 mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${acrylicYarnUSD.toFixed(2)}/kg (~₹{Math.round(acrylicYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Oil Feedstock:</strong> Acrylonitrile (Propylene-based) | <strong>Feedstock Cost:</strong> ${acrylicAnUSD.toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> Winter sweaters, blankets, socks, hats (Ludhiana spinning hub focus).
                </p>
              </div>

              {/* PC Blend */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-emerald-500">4. Poly-Cotton (PC) Blends</span>
                  <span className="text-[9px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full">Cotton / Oil Blend</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${pcYarnUSD.toFixed(2)}/kg (~₹{Math.round(pcYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Composition:</strong> 65% Polyester / 35% Cotton | <strong>Fiber cost:</strong> ${(pcYarnUSD - 0.90).toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> Industrial workwear, school uniforms, durable corporate shirts.
                </p>
              </div>

              {/* PV Blend */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-primary">5. Poly-Viscose (PV) Blends</span>
                  <span className="text-[9px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">Cellulose / Oil Blend</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${pvYarnUSD.toFixed(2)}/kg (~₹{Math.round(pvYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Composition:</strong> 65% Polyester / 35% Viscose | <strong>Fiber cost:</strong> ${(pvYarnUSD - 1.01).toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> Suiting fabrics, formal trousers, school skirts (Bhilwara/Surat hub focus).
                </p>
              </div>

              {/* Spandex */}
              <div className="p-3 rounded-lg border border-outline-variant/10 bg-surface-container-low/20">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-red-500">6. Spandex Yarn (Elastane / Lycra)</span>
                  <span className="text-[9px] font-bold bg-red-500/10 text-red-500 px-2 py-0.5 rounded-full">100% Polyurethane</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 mb-1">
                  <span className="material-symbols-outlined text-[12px]">payments</span>
                  <span>Live Index Price: ${spandexYarnUSD.toFixed(2)}/kg (~₹{Math.round(spandexYarnInr)}/kg)</span>
                </div>
                <p className="text-[10px] text-on-surface-variant mb-1">
                  <strong>Oil Feedstock:</strong> PTMEG & MDI (Polyurethane-based) | <strong>Precursor Cost:</strong> ${spandexPolyurethaneUSD.toFixed(2)}/kg
                </p>
                <p className="text-[9px] text-outline">
                  <strong>Use Cases:</strong> Compression wear, stretch denim, elastic waistbands, athletics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spinning Mill Procurement & Risk Control Desk */}
      <div className="glass-card border rounded-xxl p-5" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
          <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-base">domain</span>
            Spinning Mill Procurement & Risk Control Desk
          </h4>
          <button 
            onClick={() => setIsSettingsExpanded(!isSettingsExpanded)}
            className="flex items-center gap-1 text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border border-outline-variant/20 bg-surface-container-low hover:bg-surface-container-high text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-xs">settings</span>
            <span>{isSettingsExpanded ? 'Hide Settings' : 'Adjust Settings'}</span>
          </button>
        </div>

        {/* Adjustable Settings Panel */}
        {isSettingsExpanded && (
          <div className="mb-6 p-4 rounded-xl border border-primary/20 bg-primary/5 grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in font-mono text-[10px]">
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant">Crude Wait Threshold (USD):</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  value={crudeWaitThreshold} 
                  onChange={(e) => setCrudeWaitThreshold(Number(e.target.value))}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded px-2 py-1 text-on-surface font-bold text-center"
                />
                <span className="text-outline">$</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant">Crude Buy Threshold (USD):</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  value={crudeBuyThreshold} 
                  onChange={(e) => setCrudeBuyThreshold(Number(e.target.value))}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded px-2 py-1 text-on-surface font-bold text-center"
                />
                <span className="text-outline">$</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant">INR Hedge Threshold (₹/$):</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  step="0.1"
                  value={inrHedgeThreshold} 
                  onChange={(e) => setInrHedgeThreshold(Number(e.target.value))}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded px-2 py-1 text-on-surface font-bold text-center"
                />
                <span className="text-outline">₹</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-bold text-on-surface-variant">Cotton Buy Ref (Cotlook A ¢):</label>
              <div className="flex gap-2 items-center">
                <input 
                  type="number" 
                  value={cottonBuyReference} 
                  onChange={(e) => setCottonBuyReference(Number(e.target.value))}
                  className="w-full bg-surface-container-high border border-outline-variant/20 rounded px-2 py-1 text-on-surface font-bold text-center"
                />
                <span className="text-outline">¢</span>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Module 1: Polyester Cost Calculator & Interactive Sliders */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/15 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1.5">
                Module 1: Polyester Cost Calculator
              </span>
              
              {/* Sliders */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans flex justify-between">
                  <span>Simulated Crude Oil:</span>
                  <span className="font-mono text-primary font-bold">${crudeOil.toFixed(2)}/bbl</span>
                </label>
                <input 
                  type="range"
                  min="40"
                  max="140"
                  step="0.5"
                  value={crudeOil}
                  onChange={(e) => setCrudeOil(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans flex justify-between">
                  <span>Simulated Cotton Spot:</span>
                  <span className="font-mono text-emerald-500 font-bold">{cottonSpot.toFixed(2)}¢/lb</span>
                </label>
                <input 
                  type="range"
                  min="60"
                  max="140"
                  step="0.5"
                  value={cottonSpot}
                  onChange={(e) => setCottonSpot(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Feedstock Formula Display */}
              <div className="pt-2 border-t border-outline-variant/10 font-mono text-[9px] text-on-surface-variant space-y-1.5">
                <div className="flex justify-between">
                  <span>Derived PTA:</span>
                  <span className="font-bold">${estimatedPta}/MT (~₹{ptaInrPerKg.toFixed(1)}/kg)</span>
                </div>
                <div className="flex justify-between">
                  <span>Derived MEG:</span>
                  <span className="font-bold">${estimatedMeg}/MT (~₹{megInrPerKg.toFixed(1)}/kg)</span>
                </div>
                <div className="p-2 bg-surface-container-high/30 rounded border border-outline-variant/5 text-[8.5px] leading-relaxed text-outline">
                  <strong>PSF Cost Formula:</strong><br />
                  (PTA ₹{ptaInrPerKg.toFixed(1)} × 0.855) + (MEG ₹{megInrPerKg.toFixed(1)} × 0.335) + ₹20
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: INR Impact Tracker (Side-by-Side) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/15 space-y-3 h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1.5 mb-2">
                  Module 2: INR Impact Tracker
                </span>
                <p className="text-[9px] text-on-surface-variant leading-relaxed mb-3">
                  Priced in USD but bought in INR. When the Indian Rupee weakens, raw material landed costs swell.
                </p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  {/* USD Column */}
                  <div className="bg-surface-container-high/30 p-2.5 rounded-lg border border-outline-variant/10">
                    <span className="text-[8px] font-bold text-outline uppercase block">PSF Cost (USD)</span>
                    <span className="text-base font-black text-on-surface font-mono block mt-1">
                      ${estimatedPsfUSD.toFixed(3)}/kg
                    </span>
                    <span className="text-[8px] text-outline font-mono block mt-0.5">Global Benchmark</span>
                  </div>

                  {/* INR Column */}
                  <div className={`p-2.5 rounded-lg border transition-colors ${
                    simulatedInr >= 96.00 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
                  }`}>
                    <span className="text-[8px] font-bold text-outline uppercase block">PSF Cost (INR)</span>
                    <span className={`text-base font-black font-mono block mt-1 ${
                      simulatedInr >= 96.00 ? 'text-error' : 'text-emerald-500'
                    }`}>
                      ₹{estimatedPsfInr.toFixed(1)}/kg
                    </span>
                    <span className={`text-[8px] font-mono font-bold block mt-0.5 ${
                      simulatedInr >= 96.00 ? 'text-error' : 'text-emerald-500'
                    }`}>
                      {simulatedInr >= 96.00 ? '⚠️ WEAK RUPEE' : '✅ STRONG RUPEE'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-[9px] text-on-surface-variant font-mono mt-2 leading-relaxed">
                <strong>Landed Parity Spread:</strong> Cotton ₹{cottonInrPerKg.toFixed(1)}/kg vs. Polyester PSF ₹{estimatedPsfInr.toFixed(1)}/kg. Spread is <strong>₹{priceSpreadInr.toFixed(0)}/kg</strong>.
              </div>
            </div>
          </div>

          {/* Module 3: Purchase Signal Engine */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/15 space-y-3 font-mono text-[10px] h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1.5 mb-2">
                  Module 3: Purchase Signal Engine
                </span>
                
                <div className="space-y-2.5">
                  {/* PSF Signal */}
                  <div className="flex justify-between items-center border-b border-outline-variant/5 pb-1.5">
                    <span className="text-on-surface-variant">Polyester PSF Signal:</span>
                    {crudeOil >= crudeWaitThreshold ? (
                      <span className="bg-red-500/10 text-red-500 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-bold">WAIT / HOLD</span>
                    ) : crudeOil <= crudeBuyThreshold ? (
                      <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold">BUY / ACCUMULATE</span>
                    ) : (
                      <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-2 py-0.5 rounded text-[9px] font-bold">NEUTRAL / ACCUMULATING</span>
                    )}
                  </div>

                  {/* INR Hedging Signal */}
                  <div className="flex justify-between items-center border-b border-outline-variant/5 pb-1.5">
                    <span className="text-on-surface-variant">INR Currency Squeeze:</span>
                    {simulatedInr >= inrHedgeThreshold ? (
                      <span className="bg-red-500/10 text-red-500 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-bold">HEDGE REQUIRED</span>
                    ) : (
                      <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold">UNHEDGED / SAFE</span>
                    )}
                  </div>

                  {/* Cotton Spot Signal */}
                  <div className="flex justify-between items-center">
                    <span className="text-on-surface-variant">Raw Cotton Signal:</span>
                    {cottonSpot < cottonBuyReference ? (
                      <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2 py-0.5 rounded text-[9px] font-bold">BUY / ACCUMULATE</span>
                    ) : (
                      <span className="bg-red-500/10 text-red-500 border border-red-500/30 px-2 py-0.5 rounded text-[9px] font-bold">WAIT / HOLD</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Purchase Signal Engine Rule Text */}
              <div className="p-2.5 bg-surface-container-high/30 rounded border border-outline-variant/5 text-[8.5px] leading-relaxed text-outline mt-2">
                <strong>Algorithmic Rules:</strong><br />
                • PSF Buy if Crude ≤ ${crudeBuyThreshold} (5-Day Rule)<br />
                • INR Hedge if Rate ≥ ₹{inrHedgeThreshold.toFixed(2)}<br />
                • Cotton Buy if spot &lt; {cottonBuyReference.toFixed(1)}¢ (May Avg)
              </div>
            </div>
          </div>
        </div>

        {/* Industrial Highlights Panel */}
        <div className="mt-5 p-4 rounded-xl border border-outline-variant/10 bg-surface-container-low/60 font-mono text-[9.5px] leading-relaxed text-on-surface-variant grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="font-bold text-emerald-500 uppercase block mb-1">South India Yarn Market Update:</span>
            Despite the removal of the 11% cotton import duty, South India's cotton yarn market remains steady. Spinning mills are holding yarn prices while buyers wait to see the full impact of duty-free arrivals. This indicates a key window to buy cotton before festive demands drive prices higher.
          </div>
          <div>
            <span className="font-bold text-primary uppercase block mb-1">Polyester Producer Price Adjustments:</span>
            Indian polyester producers have already cut prices and reversed price hikes after crude retreated. However, due to lingering Middle East supply risks, the PSF <strong>BUY</strong> signal triggers only when crude holds below <strong>${crudeBuyThreshold} for 5+ consecutive days</strong> to avoid headfakes.
          </div>
        </div>
      </div>

      {/* USD/INR Exchange Rate & Domestic Spinning Parity Matrix */}
      <div className="glass-card border rounded-xxl p-5" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.6)' : '#FFF8F2', borderColor: darkMode ? 'rgba(251, 140, 0, 0.2)' : 'rgba(251, 140, 0, 0.15)' }}>
        <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">currency_exchange</span>
          USD/INR Currency Transmission & Spinning Mills Impact Desk
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Column 1: Historical Currency Comparison */}
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1">
              Rupee (INR) Value Trend Comparison
            </span>
            
            <div className="grid grid-cols-3 gap-2">
              {/* Day-Wise */}
              <div className="bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/15 font-mono text-[10px]">
                <span className="font-bold text-outline uppercase block mb-1">Day-Wise</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">Today:</span>
                    <span className="font-black text-primary">96.83</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">Yday:</span>
                    <span className="font-semibold text-on-surface">96.72</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">7D Ago:</span>
                    <span className="font-semibold text-on-surface">95.50</span>
                  </div>
                </div>
              </div>

              {/* Month-Wise */}
              <div className="bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/15 font-mono text-[10px]">
                <span className="font-bold text-outline uppercase block mb-1">Month-Wise</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">Jun 26:</span>
                    <span className="font-black text-primary">96.83</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">May 26:</span>
                    <span className="font-semibold text-on-surface">95.12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Apr 26:</span>
                    <span className="font-semibold text-on-surface">92.50</span>
                  </div>
                </div>
              </div>

              {/* Year-Wise */}
              <div className="bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/15 font-mono text-[10px]">
                <span className="font-bold text-outline uppercase block mb-1">Year-Wise</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">FY26 (E):</span>
                    <span className="font-black text-primary">96.83</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">FY25 (A):</span>
                    <span className="font-semibold text-on-surface">85.50</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">FY24 (A):</span>
                    <span className="font-semibold text-on-surface">83.12</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-primary-container/10 border border-primary-container/20 rounded-xl text-[10px] font-mono leading-relaxed text-on-surface-variant">
              <span className="font-bold text-primary uppercase block mb-1">Currency Summary:</span>
              The Indian Rupee has depreciated by **13.2% YoY** against the USD. Over a 12-month horizon, the currency moved from 
              **85.50 to 96.83 (+13.2%)**, restructuring raw material import premiums and enhancing export pricing power.
            </div>

            <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-[10px] font-mono leading-relaxed text-on-surface-variant mt-3">
              <span className="font-bold text-emerald-500 uppercase block mb-1">RBI Capital Defense Package:</span>
              To protect the Rupee without raising rates (held at 5.25%), the government eliminated withholding taxes on bonds, allowed unlimited access to 15/30/40-year securities, and doubled NRI equity investment limits to target **$30B to $50B** in foreign capital inflows.
            </div>
          </div>

          {/* Column 2: Spinning Mill Impact Analysis */}
          <div className="lg:col-span-4 space-y-3 font-mono text-[10px] leading-relaxed">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1">
              Indian Cotton & Spinning Industry Impact
            </span>
            
            <div className="space-y-2.5">
              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-red-500 text-sm shrink-0">trending_down</span>
                <div>
                  <strong className="text-red-500 block">Import Sourcing Squeeze (ELS Cotton):</strong>
                  Coimbatore/Dindigul mills spinning high counts (80s–120s compact) depend heavily on imported **Egypt Giza** and **US Pima**. A weaker rupee drives landed raw material rates up, severely squeezing processing margins.
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-emerald-500 text-sm shrink-0">trending_up</span>
                <div>
                  <strong className="text-emerald-500 block">Export Profitability Boost (Yarn & Made-ups):</strong>
                  Export-oriented mills shipping 30s combed/carded weaving and knitting yarn to Bangladesh, Vietnam, and China experience a direct realization increase on dollar-denominated contracts.
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <span className="material-symbols-outlined text-primary text-sm shrink-0">payments</span>
                <div>
                  <strong className="text-primary block">Domestic Floor Support (Shankar-6 Parity):</strong>
                  Domestic Shankar-6 spots are correlated with ICE futures. As the rupee depreciates, the rupee equivalent parity floor rises, preventing local ginners from lowering prices below key thresholds.
                </div>
              </div>

              <div className="flex gap-2 items-start border-t border-outline-variant/10 pt-2.5">
                <span className="material-symbols-outlined text-amber-500 text-sm shrink-0">thunderstorm</span>
                <div>
                  <strong className="text-amber-500 block">Monsoon Deficit Crop Risk (August Peak):</strong>
                  IMD/Skymet projects a below-normal monsoon at 92% of LPA with 35% El Niño deficit risk, severely hitting Northern cotton states (Punjab/Haryana/Rajasthan). High transport diesel rates (Petrol &gt; ₹102/L, commercial LPG &gt; ₹3,000) add a **+₹450/candy** freight surcharge on shipments.
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Interactive Rupee Sensitivity Simulator */}
          <div className="lg:col-span-3 flex flex-col justify-between bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/15">
            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block border-b border-outline-variant/10 pb-1">
                Landed & Export Sensitivity
              </span>

              {/* Slider Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans flex justify-between">
                  <span>Simulated USD/INR:</span>
                  <span className="font-mono text-primary font-bold">₹{simulatedInr.toFixed(2)}</span>
                </label>
                <input 
                  type="range"
                  min="90.00"
                  max="100.00"
                  step="0.05"
                  value={simulatedInr}
                  onChange={(e) => setSimulatedInr(Number(e.target.value))}
                  className="w-full h-1 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              {/* Live Calculations */}
              <div className="space-y-2 pt-2 text-[10px] font-mono">
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-1.5">
                  <span className="text-outline">Landed Giza 94 ELS:</span>
                  <span className="font-bold text-on-surface">
                    ₹{Math.round(1.6258 * 2.20462 * 356 * simulatedInr).toLocaleString('en-IN')}/Cd
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-outline-variant/10 pb-1.5">
                  <span className="text-outline">Shankar-6 Export Parity:</span>
                  <span className="font-bold text-emerald-500">
                    ₹{Math.round((cottonSpot / 100) * 2.20462 * 356 * simulatedInr).toLocaleString('en-IN')}/Cd
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-outline">Rupee Surcharge Overhead:</span>
                  <span className={`font-bold ${simulatedInr >= 85 ? 'text-red-500' : 'text-emerald-500'}`}>
                    +₹{Math.round((simulatedInr - 80.00) * 1276).toLocaleString('en-IN')}/Candy
                  </span>
                </div>
              </div>
            </div>

            {/* Favorable Status Badge */}
            <div className={`mt-4 p-2.5 rounded-lg border text-[10px] font-mono font-bold text-center ${
              simulatedInr > 96.50 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
              simulatedInr < 93.50 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
              'bg-primary/10 border-primary/20 text-primary'
            }`}>
              {simulatedInr > 96.50 ? '⚠️ CRITICAL IMPORT SQUEEZE' :
               simulatedInr < 93.50 ? '✅ OPTIMAL IMPORT / NEUTRAL EXPORT' :
               '⚖️ EXPORT ADVANTAGE / IMPORT SURCHARGE'}
            </div>
          </div>
        </div>
      </div>

      {/* Global Maritime Freight & Logistics Desk */}
      <div className="glass-card border rounded-xxl p-5 font-mono text-xs mt-6" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
        <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2 border-b border-outline-variant/20 pb-3">
          <span className="material-symbols-outlined text-primary">directions_boat</span>
          Global Maritime Freight Index (FBX) & Sourcing Logistics Desk
        </h4>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Composed Chart */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                12-Month Global Container Freight Index (FBX) vs. Transit Lead Times
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                Red Sea transit blockades detour ships via the Cape of Good Hope, spiking container rates and adding 10-15 days to shipping latency. Bunker fuel surcharges adjust dynamically to WTI/Brent crude price shifts.
              </p>
            </div>

            <div className="h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={maritimeFreightData} margin={{ top: 10, right: -15, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis yAxisId="left" fontSize={9} stroke={colors.chartPalette[0]} tickFormatter={(v) => `$${v}`} />
                  <YAxis yAxisId="right" orientation="right" fontSize={9} stroke={colors.chartPalette[2]} tickFormatter={(v) => `${v}d`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="FreightCostUSD" name="Container Freight Cost (USD)" fill={colors.chartPalette[0]} opacity={0.8} barSize={16} />
                  <Line yAxisId="right" type="monotone" dataKey="TransitDays" name="Average Transit Delay (Days)" stroke={colors.chartPalette[2]} strokeWidth={2} dot={{ r: 3 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Shipping Corridors Table */}
          <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/15 pt-6 lg:pt-0 lg:pl-6">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                Global Shipping Corridors & Landed Freight Parity Matrix
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                Real-time freight rates and transit delays per 40ft container from key Indian shipping portals, mapped with active fuel and war surcharges.
              </p>
            </div>

            <div className="overflow-x-auto border border-outline-variant/20 rounded-lg" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
              <table className="w-full text-[10px] text-left">
                <thead>
                  <tr className="bg-surface-container-low text-[9px] text-outline font-bold border-b border-outline-variant/20">
                    <th className="p-2">Shipping Route</th>
                    <th className="p-2 text-center">Transit Days</th>
                    <th className="p-2 text-right">Base Freight</th>
                    <th className="p-2 text-right">War/Fuel Surcharge</th>
                    <th className="p-2 text-right">Landed Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                  {shippingRoutes.map((r, idx) => {
                    const totalUSD = r.baseFreight + r.surcharge;
                    const landedLakhs = (totalUSD * simulatedInr) / 100000;
                    return (
                      <tr key={idx} className="hover:bg-primary/5 transition-colors">
                        <td className="p-2 font-bold">
                          {r.route}
                          <span className={`block text-[8px] font-semibold mt-0.5 ${r.status.includes('Normal') ? 'text-emerald-500' : 'text-amber-500'}`}>
                            {r.status} | Congestion: {r.congestion}
                          </span>
                        </td>
                        <td className="p-2 text-center font-semibold font-mono">
                          {r.baseDays !== r.detourDays ? (
                            <span>
                              <span className="line-through text-outline mr-1">{r.baseDays}d</span>
                              <span className="text-red-500 font-bold">{r.detourDays}d</span>
                            </span>
                          ) : (
                            <span className="text-emerald-500">{r.baseDays}d</span>
                          )}
                        </td>
                        <td className="p-2 text-right font-mono text-on-surface-variant">${r.baseFreight.toLocaleString()}</td>
                        <td className="p-2 text-right font-mono text-amber-500 font-bold">+${r.surcharge.toLocaleString()}</td>
                        <td className="p-2 text-right font-mono font-black text-primary">₹{landedLakhs.toFixed(2)}L</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="p-3 rounded-xl border border-outline-variant/10 text-[9.5px] leading-relaxed text-on-surface-variant" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9' }}>
                <strong className="text-primary block mb-1">Strategic Logistics Recommendation:</strong>
                Indian spinning mills exporting yarn should transition 30% of long-haul European shipments to <strong>Breakbulk Carriers</strong> to bypass container locks. For cotton imports (Egypt/US Pima), secure freight contracts 45 days in advance with fixed bunker fuel adjustments to hedge against crude spikes.
              </div>
              <div className="p-3 rounded-xl border border-outline-variant/10 text-[9.5px] leading-relaxed text-on-surface-variant" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9' }}>
                <strong className="text-amber-500 block mb-1">Next 2-Month Logistics & Freight Forecast Plan:</strong>
                • <strong>July 26 (Est):</strong> Freight rates to ease to <strong>${Math.round(3600 + (crudeOil - 80) * 20).toLocaleString()}/container</strong> (landed ₹{((Math.round(3600 + (crudeOil - 80) * 20) * simulatedInr) / 100000).toFixed(2)}L) with average transit times dropping to <strong>{Math.round(26 + (crudeOil > 100 ? 4 : 0))} days</strong> as rerouting networks optimize.<br />
                • <strong>August 26 (FC):</strong> Surcharge relief targets rates of <strong>${Math.round(3100 + (crudeOil - 80) * 15).toLocaleString()}/container</strong> (landed ₹{((Math.round(3100 + (crudeOil - 80) * 15) * simulatedInr) / 100000).toFixed(2)}L) and lead times approaching <strong>{Math.round(22 + (crudeOil > 100 ? 3 : 0))} days</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indian Crude Oil Sourcing, Currency Holdings & Sectoral Consumption Desk */}
      <div className="glass-card border rounded-xxl p-5 font-mono text-xs mt-6" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
        <h4 className="text-sm font-bold text-tertiary mb-2 flex items-center gap-2 border-b border-outline-variant/20 pb-3">
          <span className="material-symbols-outlined text-tertiary">analytics</span>
          Indian Crude Oil Sourcing, Currency Holdings & Sectoral Consumption Desk
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Grouped Bar Chart: Forex Allocations & Sourcing Purchase Value */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                Monthly Indian Forex Reserves Oil Cover vs. Import Purchase Value
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                India imports ~125M barrels of crude monthly. This chart compares the RBI's foreign currency reserves earmarked as an oil liquidity cover vs. the actual monthly purchase expenditure in Rupees. The April spike cost India **₹164.3 Thousand Crores** on the peak Rupee drop.
              </p>
            </div>
            
            <div className="h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOilPurchasingReserves} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis fontSize={9} stroke="var(--color-outline)" tickFormatter={(v) => `₹${v}k Cr`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(value, name) => [
                      `₹${value.toLocaleString('en-IN')} Thousand Crores`,
                      name === 'PurchaseValue' ? 'Crude Import Purchase Value' : 'RBI Forex Oil Cover Reserves'
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Bar dataKey="ForexHoldings" name="Forex Oil Cover Reserves (₹k Cr)" fill={colors.chartPalette[0]} opacity={0.85} barSize={14} />
                  <Bar dataKey="PurchaseValue" name="Crude Purchase Value (₹k Cr)" fill={colors.chartPalette[2]} opacity={0.85} barSize={14} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart: Crude Oil Sectoral Usage Share */}
          <div className="lg:col-span-5 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/15 pt-6 lg:pt-0 lg:pl-6">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                India Strategic Crude Oil Sectoral Consumption Shares
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                National crude usage distribution mapping where processed petroleum products (diesel, petrol, petrochemical intermediates like PTA/MEG) are consumed.
              </p>
            </div>

            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={crudeOilUsageShares}
                    cx="50%"
                    cy="45%"
                    innerRadius={40}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, value }) => `${name.split(' ')[0]}: ${value}%`}
                  >
                    {crudeOilUsageShares.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(value) => [`${value}% of National Import Volume`]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              <div className="grid grid-cols-2 gap-2 text-[9px] leading-normal text-on-surface-variant">
                <div className="border border-outline-variant/10 rounded-lg p-2" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
                  <span className="font-bold block" style={{ color: colors.chartPalette[0] }}>Public (50%)</span>
                  Transportation fuel (diesel/petrol) & household LPG cooking gas.
                </div>
                <div className="border border-outline-variant/10 rounded-lg p-2" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
                  <span className="font-bold block" style={{ color: colors.chartPalette[1] }}>Mills & Ind. (25%)</span>
                  Petrochemical precursors (PTA/MEG) for polyester fiber & plastics.
                </div>
                <div className="border border-outline-variant/10 rounded-lg p-2" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
                  <span className="font-bold block" style={{ color: colors.chartPalette[2] }}>Government (15%)</span>
                <div className="border border-outline-variant/10 rounded-lg p-2" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
                  <span className="font-bold block" style={{ color: colors.chartPalette[3] }}>Other Usage (10%)</span>
                  Aviation turbine fuels (ATF) & agricultural irrigation run-rates.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Plan & Analysis Process Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5 pt-4 border-t border-outline-variant/15">
        <div className="p-3 rounded-xl border border-outline-variant/10 text-[9.5px] leading-relaxed text-on-surface-variant" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9' }}>
          <strong className="text-primary block mb-1">Macro Analysis & RBI Reserve Coverage Strategy:</strong>
          • <strong>Double-Shock Vulnerability:</strong> India's oil import bill is highly sensitive to Brent crude spikes and Rupee depreciation. When Brent was at $138.21/bbl and USD/INR hit 95.12 in April, India's purchase cost peaked at <strong>₹164.29k Crore</strong>, forcing RBI to draw down oil cover reserves to <strong>₹220k Crore</strong> to defend the currency.<br />
          • <strong>Defensive Hedging:</strong> As global oil prices ease, RBI is shoring up reserves (rebuilding cover to <strong>₹{parseFloat((250.0 + (96.83 - simulatedInr) * 12).toFixed(1))}k Cr</strong> in July and <strong>₹{parseFloat((255.0 + (96.83 - simulatedInr) * 10).toFixed(1))}k Cr</strong> in August) by buying dollars to prevent excessive Rupee appreciation and build a sovereign buffer against future energy crises.
        </div>
        <div className="p-3 rounded-xl border border-outline-variant/10 text-[9.5px] leading-relaxed text-on-surface-variant" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9' }}>
          <strong className="text-amber-500 block mb-1">Next 2-Month Forex & Crude Purchasing Forecast Plan:</strong>
          • <strong>July 26 (Est):</strong> Crude purchases are projected to decline to <strong>₹{parseFloat((125 * Math.max(75, crudeOil - 7.5) * Math.max(80, simulatedInr - 1.5) / 10000).toFixed(1))}k Crore</strong> (reflecting Brent crude easing to ~${Math.max(75, Math.round(crudeOil - 7.5))} and USD/INR stabilizing at ₹{Math.max(80, (simulatedInr - 1.5).toFixed(2))}). This relieves balance of payments pressure.<br />
          • <strong>August 26 (FC):</strong> Further savings projected with import purchases dropping to <strong>₹{parseFloat((125 * Math.max(70, crudeOil - 11.5) * Math.max(80, simulatedInr - 2.8) / 10000).toFixed(1))}k Crore</strong> (Brent at ~${Math.max(70, Math.round(crudeOil - 11.5))}, USD/INR at ₹{Math.max(80, (simulatedInr - 2.8).toFixed(2))}).<br />
          • <strong>Spinning Mill Action Plan:</strong> Capitalize on lower synthetic fiber costs (polyester PSF drop expected to track crude down) to lock in raw material inventory. Maintain 40% hedging on USD/INR exposures as Rupee finds local support.
        </div>
      </div>
    </div>

      {/* Cotton & Polyester Supply-Demand and Price Interlocks Desk */}
      <div className="glass-card border rounded-xxl p-5 font-mono text-xs mt-6" style={{ backgroundColor: darkMode ? 'rgba(20, 32, 25, 0.6)' : '#F0F8F4', borderColor: darkMode ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)' }}>
        <h4 className="text-sm font-bold text-emerald-500 mb-2 flex items-center gap-2 border-b border-outline-variant/20 pb-3">
          <span className="material-symbols-outlined text-emerald-500">compare_arrows</span>
          Cotton & Polyester Supply-Demand and Price Interlocks Desk
        </h4>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Chart 1: Supply & Demand Index Comparison */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                Cotton & Polyester Supply-Demand Index Trends (Jul 25 - Aug 26)
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                Indices trace relative market availability and consumer affinity. High Brent crude reduces polyester supply, shifting weavers toward cotton demand, while cotton pricing spikes cap cotton demand, shunting spinners back to polyester blends.
              </p>
            </div>
            
            <div className="h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cottonPolySupplyDemandData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis domain={[50, 110]} fontSize={9} stroke="var(--color-outline)" tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Bar dataKey="CottonSupply" name="Cotton Supply Index" fill={colors.chartPalette[0]} barSize={4} />
                  <Bar dataKey="CottonDemand" name="Cotton Demand Index" fill={colors.chartPalette[1]} barSize={4} />
                  <Bar dataKey="PolySupply" name="Polyester Supply Index" fill={colors.chartPalette[2]} barSize={4} />
                  <Bar dataKey="PolyDemand" name="Polyester Demand Index" fill={colors.chartPalette[3]} barSize={4} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Price Movement Comparison */}
          <div className="lg:col-span-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-outline-variant/15 pt-6 lg:pt-0 lg:pl-6">
            <div>
              <span className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                Cotton vs. Polyester Price Movement Matrix (₹/Kg Landed Equivalent)
              </span>
              <p className="text-[10px] text-on-surface-variant leading-relaxed mb-4">
                Compares yarn feedstock price developments in Rupee terms, illustrating arbitrage gaps. Spikes in Brent crude drive the Polyester cost curve up, compressing the cotton-polyester price premium.
              </p>
            </div>

            <div className="h-64 min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cottonPolyPriceMovementData} margin={{ top: 10, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                  <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                  <YAxis domain={['auto', 'auto']} fontSize={9} stroke="var(--color-outline)" tickFormatter={(v) => `₹${v}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(v) => [`₹${v}/Kg`, '']}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px', fontFamily: 'JetBrains Mono, monospace', marginTop: '10px' }} />
                  <Line type="monotone" dataKey="CottonPrice" name="Shankar-6 Landed (₹/Kg)" stroke={colors.chartPalette[0]} strokeWidth={2.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="PolyPrice" name="Polyester PSF Landed (₹/Kg)" stroke={colors.chartPalette[2]} strokeWidth={2.5} dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Dynamic Arbitrage Commentary with USD & INR Values */}
        <div className="p-3 rounded-xl border border-outline-variant/10 text-[9.5px] leading-relaxed text-on-surface-variant mt-5" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.5)' : '#FFF8F2' }}>
          <strong className="text-emerald-500 block mb-1">Strategic Interlock Analysis:</strong>
          • <strong>Pricing Arbitrage Gap (June 26):</strong> The current spot gap is <strong>₹{(cottonInrPerKg - estimatedPsfInr).toFixed(1)}/Kg</strong> (${(cottonUSDPerKg - estimatedPsfUSD).toFixed(2)}/Kg) (Cotton at ₹{cottonInrPerKg.toFixed(1)}/Kg [${cottonUSDPerKg.toFixed(2)}/Kg] vs Polyester at ₹{estimatedPsfInr.toFixed(1)}/Kg [${estimatedPsfUSD.toFixed(2)}/Kg]) with a parity ratio of <strong>{(cottonInrPerKg / estimatedPsfInr).toFixed(2)}x</strong>.<br />
          • <strong>July 26 Projection:</strong> Sourcing gap is estimated to contract to <strong>₹{(cottonSpotJulINR - psfInrJul).toFixed(1)}/Kg</strong> (${(cottonSpotJulUSD - psfUsdJul).toFixed(2)}/Kg) (Cotton ₹{cottonSpotJulINR.toFixed(1)}/Kg [${cottonSpotJulUSD.toFixed(2)}/Kg], Polyester ₹{psfInrJul.toFixed(1)}/Kg [${psfUsdJul.toFixed(2)}/Kg]) with a parity ratio of <strong>{(cottonSpotJulINR / psfInrJul).toFixed(2)}x</strong>.<br />
          • <strong>August 26 Projection:</strong> Parity targets a spread of <strong>₹{(cottonSpotAugINR - psfInrAug).toFixed(1)}/Kg</strong> (${(cottonSpotAugUSD - psfUsdAug).toFixed(2)}/Kg) (Cotton ₹{cottonSpotAugINR.toFixed(1)}/Kg [${cottonSpotAugUSD.toFixed(2)}/Kg], Polyester ₹{psfInrAug.toFixed(1)}/Kg [${psfUsdAug.toFixed(2)}/Kg]) with a parity ratio of <strong>{(cottonSpotAugINR / psfInrAug).toFixed(2)}x</strong>.
        </div>
      </div>
    </div>
  );
}

export default GlobalMarketDesk;
