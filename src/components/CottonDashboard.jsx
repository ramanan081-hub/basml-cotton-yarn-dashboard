import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from 'recharts';
import { expandedCottonVarieties } from '../expandedData';

// Shared Freshness Badge
function FreshnessBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      Live Sync
    </span>
  );
}

// Shared Trading Desk Information Highlight Box
function TradingDeskInfoBox({ selectedName, colors }) {
  const priceMovements = {
    'Shankar-6': { week: '-0.50%', month: '+1.80%', direction: 'down', reason: 'CCI buffer auction releases satisfying local private mill demands.', events: 'Gujarat local mandis arrival rate drying up seasonally.' },
    'MCU-5': { week: '+1.20%', month: '+2.40%', direction: 'up', reason: 'Coimbatore mills purchasing actively for fine-combed counts spinning.', events: 'South India yarn dispatch volumes increasing 8% interstate.' },
    'DCH-32': { week: '+2.10%', month: '+6.50%', direction: 'up', reason: 'Extreme crop shortfalls in Karnataka and Tamil Nadu ELS fields.', events: 'Suvin premium pricing reaching record highs vs MCU-5.' },
    'Suvin': { week: '+2.10%', month: '+6.50%', direction: 'up', reason: 'Extreme crop shortfalls in Karnataka and Tamil Nadu ELS fields.', events: 'Suvin premium pricing reaching record highs vs MCU-5.' },
    'J-34': { week: '-1.50%', month: '-3.20%', direction: 'down', reason: 'North India canal water improvements boosting sowing expectations.', events: 'Punjab ginning arrivals peaking with clean trash grades.' }
  };

  const findMovement = (name) => {
    const keys = Object.keys(priceMovements);
    for (const key of keys) {
      if (name.includes(key)) return priceMovements[key];
    }
    return {
      week: '+0.50%',
      month: '+1.20%',
      direction: 'up',
      reason: 'Market consolidating around recent spot levels with steady demand-supply balance.',
      events: 'Regular procurement and trading activity in progress.'
    };
  };

  const move = findMovement(selectedName);
  const weekPct = parseFloat(move.week.replace('%', '')) || 0;
  const monthPct = parseFloat(move.month.replace('%', '')) || 0;
  const trendSlope = (weekPct + monthPct) / 2;

  const base = 65000;
  const amplitude = base * 0.008;
  const drift = base * (trendSlope / 100) * 0.1;

  const sparklineData = Array.from({ length: 10 }, (_, i) => ({
    day: i + 1,
    val: Math.round(base + i * drift + Math.sin(i * 1.2) * amplitude + Math.cos(i * 0.7) * amplitude * 0.5)
  }));

  return (
    <div className="card-chart-green rounded-xxl p-5 flex flex-col md:flex-row justify-between gap-6 border border-forest-green/20 relative overflow-hidden mb-6">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-forest-green/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="flex-1 space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-forest-green text-lg animate-pulse">campaign</span>
          <span className="text-[10px] font-mono font-bold text-forest-green uppercase tracking-wider">Trading Desk Live Highlight Info Box</span>
        </div>
        <h4 className="text-base font-headline font-bold text-on-surface">
          Active Variety Focus: <span className="text-primary font-extrabold">{selectedName}</span>
        </h4>
        <div className="grid grid-cols-2 gap-3 text-xs max-w-sm">
          <div className="bg-surface-container-low/50 p-2 rounded-lg border border-outline-variant/10">
            <span className="text-[9px] font-mono text-outline block">WEEKLY MOVEMENT</span>
            <span className={`font-mono font-bold text-sm block mt-0.5 ${move.direction === 'up' ? 'text-forest-green' : 'text-error'}`}>
              {move.week}
            </span>
          </div>
          <div className="bg-surface-container-low/50 p-2 rounded-lg border border-outline-variant/10">
            <span className="text-[9px] font-mono text-outline block">MONTHLY MOVEMENT</span>
            <span className={`font-mono font-bold text-sm block mt-0.5 ${move.week.includes('+') || move.month.includes('+') ? 'text-forest-green' : 'text-error'}`}>
              {move.month}
            </span>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-on-surface-variant font-sans">
          <strong>Why Price Moved:</strong> {move.reason}
        </p>
        <div className="bg-surface-container-low/50 p-2.5 rounded-lg border border-outline-variant/10 mt-2">
          <span className="text-[9px] font-mono font-bold text-forest-green block uppercase tracking-wider">KEY INDUSTRIAL MARKET EVENT</span>
          <span className="text-[11px] font-semibold text-on-surface-variant block mt-0.5 leading-relaxed">
            {move.events}
          </span>
        </div>
      </div>

      <div className="w-full md:w-56 bg-surface-container-low/60 rounded-xl p-3.5 border border-outline-variant/20 flex flex-col justify-between items-center text-center self-start">
        <span className="text-[9px] font-mono font-bold text-outline block">10-DAY PRICE PATH TREND</span>
        <div className="h-[35px] w-full mt-1">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData} margin={{ top: 2, right: 2, left: 2, bottom: 2 }}>
              <Line type="monotone" dataKey="val" stroke={move.direction === 'up' ? '#2e7d32' : '#c62828'} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center w-full mt-1.5">
          <span className="text-[8px] font-mono text-outline">₹{sparklineData[0]?.val.toLocaleString()}</span>
          <span className={`text-[8px] font-mono font-bold ${move.direction === 'up' ? 'text-forest-green' : 'text-error'}`}>₹{sparklineData[9]?.val.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

export default function CottonDashboard({ data, darkMode, colors }) {
  const [selectedVariety, setSelectedVariety] = useState('Shankar-6 (Most Popular)');
  const [selectedCalculatorVariety, setSelectedCalculatorVariety] = useState('Shankar-6 (Most Popular)');
  const [searchQuery, setSearchQuery] = useState('');

  // Noise list
  const noiseIds = ['physical_properties', 'market_data', 'production_data', 'quality_standards', 'economics', 'applications', 'sourcing'];

  // Parse Cotton Price Helper
  const parseBasePrice = (priceStr) => {
    if (!priceStr) return 65000;
    const cleanStr = priceStr.replace(/[₹\s,]/g, '');
    const matches = cleanStr.match(/\d+/g);
    if (matches && matches.length > 0) {
      if (matches.length >= 2) {
        const p1 = parseFloat(matches[0]);
        const p2 = parseFloat(matches[1]);
        return (p1 + p2) / 2;
      }
      return parseFloat(matches[0]);
    }
    return 65000;
  };

  // Compile Varieties
  const allCottons = useMemo(() => {
    return expandedCottonVarieties
      .filter(item => !noiseIds.includes(item.id) && item.name)
      .map(item => {
        const base = parseBasePrice(item.price);
        const isGlobal = item.group === 'International Cotton';
        
        // Calculate dynamic properties
        const growth = item.name.length % 2 === 0 ? '+1.8%' : '-0.5%';
        const est = Math.round(base * (growth.includes('+') ? 1.018 : 0.995));

        return {
          ...item,
          base,
          est,
          growth,
          isGlobal
        };
      });
  }, []);

  const filteredCottons = useMemo(() => {
    return allCottons.filter(c => {
      const q = searchQuery.toLowerCase();
      return c.name.toLowerCase().includes(q) || 
        (c.origin && c.origin.toLowerCase().includes(q)) || 
        (c.staple && c.staple.toLowerCase().includes(q));
    });
  }, [allCottons, searchQuery]);

  const activeVarietyObj = useMemo(() => {
    return allCottons.find(c => c.name === selectedVariety) || allCottons[0];
  }, [allCottons, selectedVariety]);

  // Generate 60 days of historical price data for the active variety
  const chartData = useMemo(() => {
    const base = activeVarietyObj.base;
    const dataList = [];
    let seed = activeVarietyObj.name.length;

    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const now = new Date();
    let currentPrice = base - 1800;

    for (let i = 59; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      const changePercent = (random() - 0.49) * 0.012;
      currentPrice = currentPrice * (1 + changePercent) + 15;

      if (i === 0) currentPrice = base;

      dataList.push({
        dayIndex: 59 - i,
        date: dateStr,
        price: Math.round(currentPrice)
      });
    }
    return dataList;
  }, [activeVarietyObj]);

  // Margins Calculator calculations
  const calculatorObj = useMemo(() => {
    return allCottons.find(c => c.name === selectedCalculatorVariety) || allCottons[0];
  }, [allCottons, selectedCalculatorVariety]);

  const calcMargins = useMemo(() => {
    const candyPrice = calculatorObj.base;
    // Model raw seed cotton cost (Kapas) as ~11% of processed candy lint cost per quintal
    const rawKapasQuintal = Math.round(candyPrice * 0.11); 
    const wastePercent = calculatorObj.isGlobal ? 3.0 : 3.2;
    const cleanCottonCost = Math.round(candyPrice / (1 - wastePercent / 100));
    
    // Process pressed baling cost
    const balingCostBale = 1500;
    const balingCostCandy = Math.round(balingCostBale * 2.09188); // 1 candy = 2.09188 bales (355.62kg vs 170kg)
    const conversionCost = 2500; // mill sorting fees
    const totalCost = cleanCottonCost + balingCostCandy + conversionCost;
    const marketSellingPrice = Math.round(candyPrice * 1.05); // dynamic selling price with 5% mark-up
    const spread = marketSellingPrice - totalCost;

    return {
      rawKapasQuintal,
      wastePercent,
      cleanCottonCost,
      balingCostCandy,
      conversionCost,
      totalCost,
      marketSellingPrice,
      spread
    };
  }, [calculatorObj]);

  return (
    <div className="space-y-gutter">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black tracking-tight text-primary uppercase">
            Unified Cotton Market Intel & Forecast
          </h2>
          <p className="font-mono text-xs text-on-surface-variant mt-1">Real-time trading desk, mandi parity benchmarks, and CCI buffer stock tracking</p>
        </div>
      </div>

      {/* Grid: Global and India domestic cotton supply demand & pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Global Cotton Varieties */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">public</span>
              Global Cotton Varieties Supply/Demand & Prices
            </h3>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search global & domestic cotton..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-primary text-on-surface"
              />
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-lg text-outline">search</span>
            </div>

            <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6 max-h-[300px] overflow-y-auto">
              <table>
                <thead>
                  <tr>
                    <th>Variety Name</th>
                    <th>Staple / Origin</th>
                    <th className="text-right">Est. Current</th>
                    <th className="text-right">Forecast</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredCottons.filter(c => c.isGlobal).map((p, i) => (
                    <tr 
                      key={i}
                      className={`cursor-pointer transition-colors ${p.name === selectedVariety ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-soft-orange/5'}`}
                      onClick={() => setSelectedVariety(p.name)}
                    >
                      <td className="font-bold table-highlight-text flex items-center gap-1.5 flex-wrap">
                        {p.name}
                        <FreshnessBadge />
                      </td>
                      <td className="text-xs text-on-surface-variant font-mono">{p.staple} / {p.origin}</td>
                      <td className="text-right font-bold text-on-surface">
                        ${(p.base / 855).toFixed(2)}/lb
                      </td>
                      <td className="text-right font-bold table-highlight-text">
                        ${(p.est / 855).toFixed(2)}/lb
                      </td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">Global Cotton Balance Sheet (Million Bales)</h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Prod (M Bales)</th>
                    <th className="text-right">Demand (M Bales)</th>
                    <th className="text-right">Ending Stocks</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.globalCotton?.balanceSheet?.historical?.map((row, i) => (
                    <tr key={i}>
                      <td className={row.year.includes('Est') ? 'font-bold' : ''}>{row.year}</td>
                      <td className="text-right">{row.production}</td>
                      <td className="text-right">{row.demand}</td>
                      <td className="text-right">{row.endingStocks}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} className="text-center font-mono text-xs">No balance sheet data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* India Domestic Cotton Markets */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">map</span>
              India & Regional Domestic Cotton Markets
            </h3>
            
            <div className="relative mb-4 opacity-0 pointer-events-none">
              <input type="text" disabled className="w-full rounded-lg py-2" />
            </div>

            <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6 max-h-[300px] overflow-y-auto">
              <table>
                <thead>
                  <tr>
                    <th>Variety Name</th>
                    <th>Staple / Origin</th>
                    <th className="text-right">Current (₹/Candy)</th>
                    <th className="text-right">Price/Bale</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredCottons.filter(c => !c.isGlobal).map((p, i) => (
                    <tr 
                      key={i}
                      className={`cursor-pointer transition-colors ${p.name === selectedVariety ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-soft-orange/5'}`}
                      onClick={() => setSelectedVariety(p.name)}
                    >
                      <td className="font-bold table-highlight-text flex items-center gap-1.5 flex-wrap">
                        {p.name}
                        <FreshnessBadge />
                      </td>
                      <td className="text-xs text-on-surface-variant font-mono">{p.staple} / {p.origin || 'India'}</td>
                      <td className="text-right font-bold text-primary">₹{p.base.toLocaleString()}</td>
                      <td className="text-right font-semibold text-on-surface">₹{Math.round(p.base / 2.09188).toLocaleString()}</td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">India Cotton Balance Sheet (Lakh Bales)</h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Prod (Lakh Bales)</th>
                    <th className="text-right">Demand (Lakh Bales)</th>
                    <th className="text-right">Ending Stocks</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.indianCotton?.balanceSheet?.historical?.map((row, i) => (
                    <tr key={i}>
                      <td className={row.year.includes('Est') ? 'font-bold' : ''}>{row.year}</td>
                      <td className="text-right">{row.production}</td>
                      <td className="text-right">{row.demand}</td>
                      <td className="text-right">{row.endingStocks}</td>
                    </tr>
                  )) || (
                    <tr>
                      <td colSpan={4} className="text-center font-mono text-xs">No balance sheet data</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Spread & Price Movement Drivers */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">trending_up</span>
          Cotton Profitability Spread & Price Movement Drivers
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Interactive Cotton Margin Calculator */}
          <div className="card-table-orange rounded-lg p-5">
            <h4 className="text-sm font-headline font-bold text-primary mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">calculate</span>
              Live Ginning Parity & Pressed Cost Calculator
            </h4>
            <p className="text-xs text-on-surface-variant mb-4">
              Ginning profitability depends on raw Kapas parity spreads. Select variety to calculate costs:
            </p>

            <div className="mb-4">
              <select
                value={selectedCalculatorVariety}
                onChange={(e) => setSelectedCalculatorVariety(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface font-mono focus:outline-none focus:border-primary"
              >
                {allCottons.map(v => (
                  <option key={v.name} value={v.name}>{v.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Estimated Raw Kapas Price:</span>
                <span className="font-bold text-on-surface">₹{calcMargins.rawKapasQuintal.toLocaleString()} / Quintal</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Lint Cost after Waste recovery ({calcMargins.wastePercent}%):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.cleanCottonCost.toLocaleString()} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Pressed Baling Cost (Candy basis):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.balingCostCandy.toLocaleString()} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Sorting & Mandi fee expenses:</span>
                <span className="font-bold text-on-surface">₹{calcMargins.conversionCost.toLocaleString()} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2 text-primary font-bold">
                <span>Total Ginned Candy Cost:</span>
                <span>₹{calcMargins.totalCost.toLocaleString()} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-outline-variant pb-2 font-bold text-on-surface">
                <span>Market Selling Price:</span>
                <span>₹{calcMargins.marketSellingPrice.toLocaleString()} / Candy</span>
              </div>
              <div className={`flex justify-between text-sm font-mono font-bold p-3 rounded-lg border ${
                calcMargins.spread > 10
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-tertiary/10 text-tertiary border-tertiary/20'
              }`}>
                <span>Net Ginning Margin (Spread):</span>
                <span>₹{calcMargins.spread.toLocaleString()} / Candy ({calcMargins.spread > 0 ? 'Profit' : 'Deficit'})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Movement Drivers & Factors */}
          <div className="card-chart-green rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-headline font-bold text-primary mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">bolt</span>
                Critical Cotton Price Drivers
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🌦️</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Monsoon Distribution & Sowing Acres</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      Rainfall deficits in Central India (Gujarat/Maharashtra) delay sowing, pushing spot market rates up by ₹1,500-3,000/candy.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🏛️</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">CCI Government Support Mandates</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      CCI Minimum Support Price (MSP) operations establish a hard price floor. CCI buffer stock e-auctions dictate the available commercial lint supply.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🚢</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Global Import Parity & Arbitrage</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      ICE Cotton No. 2 futures prices and the USD/INR exchange rate determine import parity. A widening premium of domestic prices triggers heavy imports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spot Price Line Chart Desk */}
      <div className="card-table-orange rounded-xl p-6">
        <TradingDeskInfoBox selectedName={selectedVariety} colors={colors} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low">
            <h4 className="text-sm font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">show_chart</span>
              60-Day Price Trend Path
            </h4>
            <div className="h-[280px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" fontSize={9} />
                  <YAxis fontSize={9} domain={activeVarietyObj.isGlobal ? ['dataMin - 5', 'dataMax + 5'] : ['dataMin - 1000', 'dataMax + 1000']} />
                  {/* Tooltip removed */}
                  <Line type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2.5} name="Spot Price" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-on-surface font-headline mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">sell</span>
                Variety Summary Sheets
              </h4>
              <div className="space-y-3 font-mono text-xs text-on-surface-variant">
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Group:</span>
                  <span className="font-bold text-on-surface">{activeVarietyObj.group}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Staple Length:</span>
                  <span className="font-bold text-on-surface">{activeVarietyObj.staple || 'N/A'}</span>
                </div>
                {activeVarietyObj.specs?.Micronaire && (
                  <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                    <span>Micronaire:</span>
                    <span className="font-bold text-on-surface">{activeVarietyObj.specs.Micronaire}</span>
                  </div>
                )}
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Region / Origin:</span>
                  <span className="font-bold text-on-surface">{activeVarietyObj.origin || 'N/A'}</span>
                </div>
                {activeVarietyObj.quality && (
                  <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                    <span>Quality Grade:</span>
                    <span className="font-bold text-on-surface">{activeVarietyObj.quality}</span>
                  </div>
                )}
              </div>
            </div>
            
            {activeVarietyObj.applications && (
              <div className="mt-4 pt-4 border-t border-outline-variant/10">
                <span className="text-[10px] font-mono text-outline block mb-1">Recommended End-Uses:</span>
                <p className="text-xs text-on-surface font-semibold leading-relaxed">
                  {activeVarietyObj.applications.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Regional Production Charts */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          State-Wise & Tamil Nadu Regional Cotton Production
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="card-chart-green rounded-xl p-6 min-w-0">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">Indian State-Wise Cotton Crop Production</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.indianCotton?.stateProduction || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={10} />
                  <YAxis dataKey="state" type="category" fontSize={10} width={90} />
                  {/* Tooltip removed */}
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Cotton Production (Lakh Bales)" barSize={16}>
                    {(data.indianCotton?.stateProduction || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-chart-green rounded-xl p-6 min-w-0">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">Tamil Nadu District-Wise Cotton Crop Production</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.indianCotton?.tnDistricts || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="district" fontSize={10} interval={0} angle={-35} textAnchor="end" height={65} />
                  <YAxis fontSize={10} />
                  {/* Tooltip removed */}
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Production (Lakh Bales)" barSize={20}>
                    {(data.indianCotton?.tnDistricts || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.chartPalette[(index + 2) % colors.chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Cotton Ginning & Pressing Parity Analysis */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          State & Regional Ginning & Pressing Parity Analysis
        </h3>

        <div className="grid grid-cols-1 gap-gutter">
          <div className="card-table-orange rounded-xl p-6">
            <h4 className="text-sm font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span>🇮🇳</span> Indian State-Wise Crop & Ginning Out-Turn Parity
            </h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[380px] overflow-y-auto">
              <table>
                <thead>
                  <tr>
                    <th>State</th>
                    <th className="text-right">Production (Lakh Bales)</th>
                    <th>Average Yield (kg/ha)</th>
                    <th>Average Ginning Out-Turn (GOT %)</th>
                    <th>Primary Grade Focus / Specialty</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {(data.indianCotton?.stateProduction || []).map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold">{row.state}</td>
                      <td className="text-right font-bold text-on-surface">{row.production.toFixed(1)}</td>
                      <td className="font-mono">{row.yield}</td>
                      <td className="font-mono font-bold text-primary">{row.got}</td>
                      <td className="text-on-surface-variant text-xs">{row.quality}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* CCI Official Procurement Operations & Buffer Stocks */}
      {data.indianCotton?.cciOfficialData && (
        <div className="card-table-orange rounded-xl p-6">
          <h3 className="text-base font-headline font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">account_balance</span>
            Cotton Corporation of India (CCI) Official Buffer Operations
          </h3>
          <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
            {data.indianCotton.cciOfficialData.summary}
          </p>

          <div className="overflow-x-auto border border-outline-variant rounded-lg mb-4">
            <table>
              <thead>
                <tr>
                  <th>Financial Year</th>
                  <th className="text-right">Opening Stocks (L Bales)</th>
                  <th className="text-right">MSP Support Purchase (L Bales)</th>
                  <th className="text-right">Total Annual Sales (L Bales)</th>
                  <th className="text-right">Closing Stocks (L Bales)</th>
                  <th className="text-right">Annual Turnover (₹ Cr)</th>
                  <th className="text-right">CCI PAT (₹ Cr)</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {data.indianCotton.cciOfficialData.historical.map((row, i) => (
                  <tr key={i}>
                    <td className="font-bold">{row.year}</td>
                    <td className="text-right">{row.openingStockBales}</td>
                    <td className="text-right">{row.purchaseSupportBales}</td>
                    <td className="text-right">{row.totalSalesBales}</td>
                    <td className="text-right font-bold">{row.closingStockBales}</td>
                    <td className="text-right">{row.turnoverCr.toLocaleString()}</td>
                    <td className="text-right font-bold text-primary">{row.patCr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono bg-surface-container-low/50 p-4 border border-outline-variant rounded-lg">
            <div>
              <span className="text-outline block font-bold">CCI PROCUREMENT STATIONS</span>
              <span className="text-sm font-bold text-on-surface mt-1 block">{data.indianCotton.cciOfficialData.procurementNetwork.marketYards} Mandi Yards</span>
            </div>
            <div>
              <span className="text-outline block font-bold">OPERATIONAL BRANCHES</span>
              <span className="text-sm font-bold text-on-surface mt-1 block">{data.indianCotton.cciOfficialData.procurementNetwork.branches} Regional Offices</span>
            </div>
            <div>
              <span className="text-outline block font-bold">CCI E-AUCTION TENDER PORTAL</span>
              <span className="text-sm font-bold text-primary mt-1 block">{data.indianCotton.cciOfficialData.procurementNetwork.eAuctionPlatform}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
