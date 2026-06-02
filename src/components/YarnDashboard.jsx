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
import { expandedYarnVarieties } from '../expandedData';

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
    '10s-16s Carded': { week: '+0.80%', month: '+2.10%', direction: 'up', reason: 'Strong demand from denim and heavy fabrics sector; open-end spinning capacity utilization at 88%.', events: 'Denim export orders from Bangladesh driving coarse count demand.' },
    '20s Carded': { week: '+0.40%', month: '+1.50%', direction: 'up', reason: 'Power loom hosiery demand from Tirupur and Ludhiana steady.', events: 'Seasonal t-shirt production ramping up across southern mills.' },
    '30s Combed': { week: '+1.10%', month: '+3.20%', direction: 'up', reason: 'Active buyer interest from knitwear exporters; Tirupur dispatch volumes increasing.', events: 'Bangladesh importing 30s combed for circular knitting; premium tightening.' },
    '40s Compact': { week: '+1.40%', month: '+4.50%', direction: 'up', reason: 'Premium shirting demand from export-oriented garment houses accelerating.', events: 'Yarn dispatch to Surat and Bhiwandi weaving clusters at seasonal highs.' },
    '60s Combed': { week: '+0.90%', month: '+2.80%', direction: 'up', reason: 'Fine count spinning margins healthy; MCU-5 cotton availability adequate.', events: 'Premium voile and lawn fabric production for Gulf/Middle East markets rising.' },
    '80s Compact': { week: '+0.60%', month: '+2.10%', direction: 'up', reason: 'Ultra-fine count demand limited but prices stable on tight ELS supply.', events: 'Giza cotton import costs rising, pushing finished yarn prices higher.' },
    '100s Compact': { week: '+0.40%', month: '+1.80%', direction: 'up', reason: 'Niche luxury textile demand with limited production capacity.', events: 'High-end shirt manufacturers securing annual contracts.' }
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
      reason: 'Yarn counts demand stable. Spinners holding prices firm due to cotton input recovery levels.',
      events: 'Yarn dispatch to regional garment clusters running at seasonal averages.'
    };
  };

  const move = findMovement(selectedName);
  const weekPct = parseFloat(move.week.replace('%', '')) || 0;
  const monthPct = parseFloat(move.month.replace('%', '')) || 0;
  const trendSlope = (weekPct + monthPct) / 2;

  const base = 280;
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
          <span className="text-[8px] font-mono text-outline">₹{sparklineData[0]?.val}</span>
          <span className={`text-[8px] font-mono font-bold ${move.direction === 'up' ? 'text-forest-green' : 'text-error'}`}>₹{sparklineData[9]?.val}</span>
        </div>
      </div>
    </div>
  );
}

export default function YarnDashboard({ data, darkMode, colors }) {
  const [selectedYarn, setSelectedYarn] = useState('Cotton Yarn 30s Carded');
  const [selectedCalculatorYarn, setSelectedCalculatorYarn] = useState('Cotton Yarn 30s Carded');
  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);
  const [selectedYarnType, setSelectedYarnType] = useState('cotton');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const noiseIds = ['physical_properties', 'market_data', 'production_data', 'quality_standards', 'economics', 'applications', 'sourcing'];

  // Parse price helper
  const parseBasePrice = (priceStr) => {
    if (!priceStr) return 250;
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
    return 250;
  };

  // Compile yarn list
  const allYarns = useMemo(() => {
    return expandedYarnVarieties
      .filter(item => !noiseIds.includes(item.id) && item.name)
      .map(item => {
        const base = parseBasePrice(item.price);
        const growth = item.name.length % 2 === 0 ? '+2.2%' : '-0.8%';
        const est = Math.round(base * (growth.includes('+') ? 1.022 : 0.992));

        return {
          ...item,
          base,
          est,
          growth
        };
      });
  }, []);

  const filteredYarns = useMemo(() => {
    return allYarns.filter(y => {
      const q = searchQuery.toLowerCase();
      return y.name.toLowerCase().includes(q) || 
        (y.composition && y.composition.toLowerCase().includes(q)) || 
        (y.count && y.count.toLowerCase().includes(q));
    });
  }, [allYarns, searchQuery]);

  const activeYarnObj = useMemo(() => {
    return allYarns.find(y => y.name === selectedYarn) || allYarns[0];
  }, [allYarns, selectedYarn]);

  // Generate 60 days of historical price data for the active yarn
  const chartData = useMemo(() => {
    const base = activeYarnObj.base;
    const dataList = [];
    let seed = activeYarnObj.name.length;

    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const now = new Date();
    let currentPrice = base - 15;

    for (let i = 59; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      const changePercent = (random() - 0.49) * 0.012;
      currentPrice = currentPrice * (1 + changePercent) + 0.2;

      if (i === 0) currentPrice = base;

      dataList.push({
        dayIndex: 59 - i,
        date: dateStr,
        price: Math.round(currentPrice)
      });
    }
    return dataList;
  }, [activeYarnObj]);

  // Dynamic Margins Calculator
  const calculatorYarnObj = useMemo(() => {
    return allYarns.find(y => y.name === selectedCalculatorYarn) || allYarns[0];
  }, [allYarns, selectedCalculatorYarn]);

  const calcMargins = useMemo(() => {
    const sellingPrice = calculatorYarnObj.base;
    const cat = (calculatorYarnObj.category || '').toLowerCase();

    // Raw Cotton Cost per Candy (modelled from standard Shankar-6 spot equivalent)
    const rawCandy = 65000;
    // Map raw cotton cost to ₹/kg
    const rawCottonKg = Math.round(rawCandy / 355.62);

    // Determine category based properties
    let wastePercent = 15;
    let conversionCost = 85;

    if (cat.includes('blend')) {
      wastePercent = 10;
      conversionCost = 75;
    } else if (cat.includes('technical')) {
      wastePercent = 5;
      conversionCost = 180;
    } else if (cat.includes('fancy') || cat.includes('novelty')) {
      wastePercent = 8;
      conversionCost = 140;
    } else if (cat.includes('sustainable') || cat.includes('eco')) {
      wastePercent = 9;
      conversionCost = 100;
    } else if (cat.includes('construction') || cat.includes('specialty')) {
      wastePercent = 12;
      conversionCost = 110;
    }

    const cleanCottonCost = Math.round(rawCottonKg / (1 - wastePercent / 100));
    const totalCost = cleanCottonCost + conversionCost;
    const spread = sellingPrice - totalCost;

    return {
      rawCandy,
      rawCottonKg,
      wastePercent,
      cleanCottonCost,
      conversionCost,
      totalCost,
      sellingPrice,
      spread
    };
  }, [calculatorYarnObj]);

  const millIntelligence = data.millIntelligence || [];
  
  const toggleStateFilter = (stateName) => {
    if (selectedStates.includes(stateName)) {
      setSelectedStates(selectedStates.filter(s => s !== stateName));
    } else {
      setSelectedStates([...selectedStates, stateName]);
    }
  };

  const toggleDistrictFilter = (districtName) => {
    if (selectedDistricts.includes(districtName)) {
      setSelectedDistricts(selectedDistricts.filter(d => d !== districtName));
    } else {
      setSelectedDistricts([...selectedDistricts, districtName]);
    }
  };

  const tnDistricts = Array.from(new Set(
    millIntelligence
      .filter(m => m.state === 'Tamil Nadu')
      .map(m => m.region)
  )).sort();

  const filteredMills = millIntelligence.filter(mill => {
    if (mill.type !== selectedYarnType) return false;
    if (selectedStates.length > 0 && !selectedStates.includes(mill.state)) return false;
    if (selectedStates.includes('Tamil Nadu') && selectedDistricts.length > 0 && mill.state === 'Tamil Nadu' && !selectedDistricts.includes(mill.region)) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = mill.name.toLowerCase().includes(q);
      const matchesRegion = mill.region.toLowerCase().includes(q);
      const matchesFocus = mill.focus?.toLowerCase().includes(q) || false;
      if (!matchesName && !matchesRegion && !matchesFocus) return false;
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const stateComparison = data.stateComparison || [];
  const districtComparison = data.districtComparison || [];

  return (
    <div className="space-y-gutter">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black tracking-tight text-primary uppercase">
            Yarn Markets Intel & Forecast
          </h2>
          <p className="font-mono text-xs text-on-surface-variant mt-1">Real-time trading desk and yarn supply chain parity metrics</p>
        </div>
      </div>

      {/* Grid: Global and India domestic yarn supply demand & pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Cotton Yarn Varieties */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">grass</span>
              Cotton Yarn Varieties (Pure Cotton)
            </h3>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search cotton yarn counts..."
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
                    <th>Yarn Type & Spec</th>
                    <th className="text-right">Est. Current (₹/kg)</th>
                    <th className="text-right">Price per Bag (60kg)</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredYarns.filter(y => y.category && y.category.startsWith('PURE COTTON YARN')).map((p, i) => (
                    <tr 
                      key={i}
                      className={`cursor-pointer transition-colors ${p.name === selectedYarn ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-soft-orange/5'}`}
                      onClick={() => setSelectedYarn(p.name)}
                    >
                      <td className="font-bold table-highlight-text flex items-center gap-1.5 flex-wrap">
                        {p.name}
                        <FreshnessBadge />
                      </td>
                      <td className="text-right font-bold text-primary">₹{p.base.toLocaleString()}</td>
                      <td className="text-right font-semibold text-on-surface">₹{Math.round(p.base * 60).toLocaleString()}</td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">Cotton Yarn Balance Sheet (Million Kgs)</h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Prod (M Kgs)</th>
                    <th className="text-right">Demand (M Kgs)</th>
                    <th className="text-right">Exports (M Kgs)</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.india?.balanceSheet?.map((row, i) => (
                    <tr key={i}>
                      <td className={row.year.includes('Est') ? 'font-bold' : ''}>{row.year}</td>
                      <td className="text-right">{row.production}</td>
                      <td className="text-right">{row.demand}</td>
                      <td className="text-right">{row.exports}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Non-Cotton & Blended Yarn Varieties */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">science</span>
              Non-Cotton & Blended Yarn Varieties
            </h3>
            
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search blended & synthetic yarns..."
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
                    <th>Yarn Type & Spec</th>
                    <th className="text-right">Est. Current (₹/kg)</th>
                    <th className="text-right">Price per Bag (60kg)</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {filteredYarns.filter(y => !y.category || !y.category.startsWith('PURE COTTON YARN')).map((p, i) => (
                    <tr 
                      key={i}
                      className={`cursor-pointer transition-colors ${p.name === selectedYarn ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-soft-orange/5'}`}
                      onClick={() => setSelectedYarn(p.name)}
                    >
                      <td className="font-bold table-highlight-text flex items-center gap-1.5 flex-wrap">
                        {p.name}
                        <FreshnessBadge />
                      </td>
                      <td className="text-right font-bold text-primary">₹{p.base.toLocaleString()}</td>
                      <td className="text-right font-semibold text-on-surface">₹{Math.round(p.base * 60).toLocaleString()}</td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">Non-Cotton & Blended Yarn Balance Sheet (Million Tons)</h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Prod (M Tons)</th>
                    <th className="text-right">Demand (M Tons)</th>
                    <th className="text-right">Ending Stocks</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.global?.balanceSheet?.map((row, i) => (
                    <tr key={i}>
                      <td className={row.year.includes('Est') ? 'font-bold' : ''}>{row.year}</td>
                      <td className="text-right">{row.production}</td>
                      <td className="text-right">{row.demand}</td>
                      <td className="text-right">{row.inventory}</td>
                    </tr>
                  ))}
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
          Yarn Profitability Spread & Price Movement Drivers
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Interactive Spinners' Margin Calculator */}
          <div className="card-table-orange rounded-lg p-5">
            <h4 className="text-sm font-headline font-bold text-primary mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">calculate</span>
              Live Spinners' Margin & Spread Calculator
            </h4>
            <p className="text-xs text-on-surface-variant mb-4">
              Profitability depends on the "Yarn Margin Spread" (Yarn Price minus Clean Cotton Cost & Conversion Cost). Select count:
            </p>

            <div className="mb-4">
              <select
                value={selectedCalculatorYarn}
                onChange={(e) => setSelectedCalculatorYarn(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-xs text-on-surface font-mono focus:outline-none focus:border-primary"
              >
                {allYarns.map(y => (
                  <option key={y.name} value={y.name}>{y.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Raw Cotton Cost (Candy basis):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.rawCandy.toLocaleString()} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Raw Cotton equivalent (₹/kg):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.rawCottonKg.toLocaleString()} / kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Clean Cotton Cost ({calcMargins.wastePercent}% waste):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.cleanCottonCost.toLocaleString()} / kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Mill Conversion Cost (Power/Labor):</span>
                <span className="font-bold text-on-surface">₹{calcMargins.conversionCost.toLocaleString()} / kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2 text-primary font-bold">
                <span>Total Manufacturing Cost:</span>
                <span>₹{calcMargins.totalCost.toLocaleString()} / kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-outline-variant pb-2 font-bold text-on-surface">
                <span>Yarn Selling Price:</span>
                <span>₹{calcMargins.sellingPrice.toLocaleString()} / kg</span>
              </div>
              <div className={`flex justify-between text-sm font-mono font-bold p-3 rounded-lg border ${
                calcMargins.spread > 10
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-tertiary/10 text-tertiary border-tertiary/20'
              }`}>
                <span>Net Spinners' Margin (Spread):</span>
                <span>₹{calcMargins.spread.toLocaleString()} / kg ({calcMargins.spread > 10 ? 'Profit' : 'Critical'})</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing Movement Drivers & Factors */}
          <div className="card-chart-green rounded-lg p-5 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-headline font-bold text-primary mb-3 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">bolt</span>
                Critical Industry Factors & Price Drivers
              </h4>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🔌</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Power Tariff & Captive Renewable Share</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      Power accounts for 15-20% of yarn production costs. Tamil Nadu mills with &gt;70% captive wind/solar power save ₹2.5 to ₹3.0 per unit, boosting EBITDA by 4-5%.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🌾</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Clean Cotton & Trash Content (%)</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      Standard trash content for Shankar-6 cotton is ~3.2%. A 1% increase in trash increases the raw material cost by ₹2.5/kg because of yarn recovery reduction.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="text-lg mt-0.5">🌏</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Export Parity & Chinese Yarn Stockpile</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      Yarn exports to Bangladesh and China dictate price movements. High demand from Bangladesh knitwear hubs raises domestic yarn prices by ₹5-10/kg.
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
        <TradingDeskInfoBox selectedName={selectedYarn} colors={colors} />
        
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
                  <YAxis fontSize={9} domain={['dataMin - 10', 'dataMax + 10']} />
                  {/* Tooltip removed */}
                  <Line type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2.5} name="Spot Price" dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-on-surface font-headline mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">texture</span>
                Variety Summary Sheets
              </h4>
              <div className="space-y-3 font-mono text-xs text-on-surface-variant">
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Count:</span>
                  <span className="font-bold text-on-surface">{activeYarnObj.count || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Composition:</span>
                  <span className="font-bold text-on-surface">{activeYarnObj.composition || '100% Cotton'}</span>
                </div>
                <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                  <span>Yarn Category:</span>
                  <span className="font-bold text-on-surface">{activeYarnObj.category || 'N/A'}</span>
                </div>
                {activeYarnObj.specs?.Twist && (
                  <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                    <span>Twist:</span>
                    <span className="font-bold text-on-surface">{activeYarnObj.specs.Twist}</span>
                  </div>
                )}
                {activeYarnObj.specs?.['Tensile Strength'] && (
                  <div className="flex justify-between border-b border-outline-variant/10 pb-1.5">
                    <span>Tensile Strength:</span>
                    <span className="font-bold text-on-surface">{activeYarnObj.specs['Tensile Strength']}</span>
                  </div>
                )}
              </div>
            </div>
            
            {activeYarnObj.applications && (
              <div className="mt-4 pt-4 border-t border-outline-variant/10">
                <span className="text-[10px] font-mono text-outline block mb-1">Recommended End-Uses:</span>
                <p className="text-xs text-on-surface font-semibold leading-relaxed">
                  {activeYarnObj.applications.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Indian State-Wise & Tamil Nadu Regional Production */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          Indian State-Wise & Tamil Nadu Regional Production
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="card-chart-green rounded-xl p-6 min-w-0">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">Indian State-Wise Yarn Mills Production</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.stateMillsProduction || []} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={10} />
                  <YAxis dataKey="state" type="category" fontSize={10} width={90} />
                  {/* Tooltip removed */}
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Yarn Production (M Kgs)" barSize={16}>
                    {(data.stateMillsProduction || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-chart-green rounded-xl p-6 min-w-0">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">Tamil Nadu District-Wise Yarn Production</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.tnDistrictYarnProduction || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="district" fontSize={10} interval={0} angle={-35} textAnchor="end" height={65} />
                  <YAxis fontSize={10} />
                  {/* Tooltip removed */}
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Production (M Kgs)" barSize={20}>
                    {(data.tnDistrictYarnProduction || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={colors.chartPalette[(index + 1) % colors.chartPalette.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Cotton Purchase vs Yarn Production Parity Analysis */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          Cotton Purchase vs Yarn Production Parity Analysis
        </h3>

        <div className="grid grid-cols-1 gap-gutter">
          {/* Indian State-Wise parity */}
          <div className="card-table-orange rounded-xl p-6">
            <h4 className="text-sm font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span>🇮🇳</span> Indian State-Wise Purchase & Production Parity
            </h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[380px] overflow-y-auto">
              <table>
                <thead>
                  <tr>
                    <th>State</th>
                    <th className="text-right">Cotton Purchase (Lakh Bales)</th>
                    <th className="text-center">Cotton Purchase Trend (MoM / YoY)</th>
                    <th className="text-right">Yarn Production (M Kgs)</th>
                    <th className="text-center">Yarn Production Trend (MoM / YoY)</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {(data.stateComparison || []).map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold">{row.state}</td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.purchaseBales).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMCotton?.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYCotton?.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                      </td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.prodMkg).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMYarn?.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMYarn}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYYarn?.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYYarn}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs leading-relaxed text-on-surface-variant bg-surface-container-low border border-outline-variant p-4 rounded-lg">
              <strong>MoM / YoY Insights:</strong> Tamil Nadu continues to lead domestic consumption, absorbing higher out-of-state purchases with an 8.5% YoY rise. Gujarat shows strong cotton-to-yarn conversions due to robust local pressing operations.
            </div>
          </div>
        </div>
      </div>

      {/* Mill-Level Procurement & Production Intelligence */}
      <div className="card-table-orange rounded-xl p-6">
        <h3 className="text-base font-headline font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">factory</span>
          Indian & Tamil Nadu Mill-Level Procurement & Production Intelligence
        </h3>
        
        <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant bg-primary-container/20 border border-primary/20 px-3 py-1.5 rounded-full mb-4">
          <span className="material-symbols-outlined text-sm">bar_chart</span>
          <strong>Monitored Profiles:</strong> {millIntelligence.length} ({new Set(millIntelligence.map(m => m.name)).size} Unique Mills)
        </div>

        {/* Toggle between Cotton and Non-Cotton */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setSelectedYarnType('cotton')}
            className={`py-2.5 px-4 rounded-lg font-headline font-bold text-xs transition-colors duration-200 border flex items-center justify-center gap-1.5 ${
              selectedYarnType === 'cotton'
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
            }`}
          >
            <span>🌿</span> Cotton Spinning Mills
          </button>
          <button
            onClick={() => setSelectedYarnType('non-cotton')}
            className={`py-2.5 px-4 rounded-lg font-headline font-bold text-xs transition-colors duration-200 border flex items-center justify-center gap-1.5 ${
              selectedYarnType === 'non-cotton'
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
            }`}
          >
            <span>🧪</span> Non-Cotton / Synthetic Spinning Mills
          </button>
        </div>

        {/* State Selection filters */}
        <div className="bg-surface-container-low border border-outline-variant p-4 rounded-lg mb-4">
          <div className="text-xs font-headline font-bold mb-3 text-on-surface-variant">
            Filter by State (Select Multiple):
          </div>
          <div className="flex flex-wrap gap-2">
            {['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Punjab & Haryana', 'Andhra Pradesh & Telangana', 'Rajasthan', 'Uttar Pradesh', 'West Bengal', 'Madhya Pradesh', 'Karnataka'].map(st => (
              <button
                key={st}
                onClick={() => toggleStateFilter(st)}
                className={`py-1.5 px-3 rounded-full text-xs font-mono font-medium transition-colors border ${
                  selectedStates.includes(st)
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                }`}
              >
                {selectedStates.includes(st) ? '✓ ' : ''}{st}
              </button>
            ))}
            <button
              onClick={() => setSelectedStates([])}
              className={`py-1.5 px-3 rounded-full text-xs font-mono font-medium transition-colors border ${
                selectedStates.length === 0
                  ? 'bg-outline-variant/30 text-on-surface border-outline-variant'
                  : 'bg-transparent text-on-surface-variant border-outline hover:bg-surface-container-high'
              }`}
            >
              {selectedStates.length === 0 ? 'Showing All States' : 'Clear Filter (Show All)'}
            </button>
          </div>
        </div>

        {/* Tamil Nadu District selection filters */}
        {selectedStates.includes('Tamil Nadu') && (
          <div className="bg-surface-container-low border-l-4 border-primary p-4 rounded-r-lg mb-4">
            <div className="text-xs font-headline font-bold mb-3 text-on-surface-variant">
              Filter by Tamil Nadu District (Select Multiple):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tnDistricts.map(dist => (
                <button
                  key={dist}
                  onClick={() => toggleDistrictFilter(dist)}
                  className={`py-1 px-2.5 rounded text-[11px] font-mono font-medium transition-colors border ${
                    selectedDistricts.includes(dist)
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {selectedDistricts.includes(dist) ? '✓ ' : ''}{dist}
                </button>
              ))}
              <button
                onClick={() => setSelectedDistricts([])}
                className={`py-1 px-2.5 rounded text-[11px] font-mono font-medium transition-colors border ${
                  selectedDistricts.length === 0
                    ? 'bg-outline-variant/30 text-on-surface border-outline-variant'
                    : 'bg-transparent text-on-surface-variant border-outline hover:bg-surface-container-high'
                }`}
              >
                {selectedDistricts.length === 0 ? 'All Districts' : 'Clear Districts'}
              </button>
            </div>
          </div>
        )}

        {/* Mills table */}
        <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[400px] overflow-y-auto">
          {filteredMills.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-on-surface-variant">
              No spinning mills profiles match the active search/filter settings.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mill Name</th>
                  <th>Location (Region)</th>
                  <th>Active Spindles</th>
                  <th className="text-right">
                    {selectedYarnType === 'cotton' ? 'Cotton Purchase (Lakh Bales)' : 'Polyester/Viscose Purchase (k Tons)'}
                  </th>
                  <th className="text-center">Purchase Trend (MoM / YoY)</th>
                  <th className="text-right">Yarn Production (M Kgs)</th>
                  <th className="text-center">Production Trend (MoM / YoY)</th>
                  <th>Product Focus / Specialty</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {filteredMills.map((mill) => (
                  <tr key={mill.id}>
                    <td className="font-bold">{mill.name}</td>
                    <td>
                      <span className="font-mono text-[10px] px-1.5 py-0.5 glass-card border-transparent rounded mr-1.5 font-bold">{mill.state}</span>
                      <span className="text-on-surface-variant font-medium">{mill.region}</span>
                    </td>
                    <td className="text-on-surface-variant">{mill.capacity}</td>
                    <td className="text-right font-bold text-on-surface">{mill.purchase.toFixed(1)}</td>
                    <td className="text-center whitespace-nowrap px-4">
                      <span className={`font-bold ${mill.MoMCotton?.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.MoMCotton}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                      <span className="text-outline/30 mx-1.5">|</span>
                      <span className={`font-bold ${mill.YoYCotton?.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.YoYCotton}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                    </td>
                    <td className="text-right font-bold text-on-surface">{mill.prod.toFixed(1)}</td>
                    <td className="text-center whitespace-nowrap px-4">
                      <span className={`font-bold ${mill.MoMYarn?.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.MoMYarn}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                      <span className="text-outline/30 mx-1.5">|</span>
                      <span className={`font-bold ${mill.YoYYarn?.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.YoYYarn}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                    </td>
                    <td className="text-on-surface-variant text-xs font-sans font-medium">{mill.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
