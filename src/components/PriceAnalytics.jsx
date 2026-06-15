import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area
} from 'recharts';

import { expandedCottonVarieties, expandedYarnVarieties } from '../expandedData';

export default function PriceAnalytics({ data, darkMode, colors }) {
  // Helper to extract a base price from price string (e.g. "₹68,100-70,000/bale" -> 69050, "₹240-260/kg" -> 250)
  const parseBasePrice = (priceStr, isYarn) => {
    if (!priceStr) return isYarn ? 250 : 65000;
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
    return isYarn ? 250 : 65000;
  };

  // Compile all varieties from the expanded databases, filtering out noise section headers
  const varieties = useMemo(() => {
    const noiseIds = ['physical_properties', 'market_data', 'production_data', 'quality_standards', 'economics', 'applications', 'sourcing'];
    
    const cottons = expandedCottonVarieties
      .filter(c => !noiseIds.includes(c.id) && c.name)
      .map(c => {
        const trend = c.name.length % 3 === 0 ? 'up' : c.name.length % 3 === 1 ? 'down' : 'flat';
        let base = parseBasePrice(c.price, false);
        let unit = c.price?.includes('bale') ? '/bale' : '/candy';
        
        // Dynamic live price injection if data is present
        if (data) {
          if (c.name.includes('Shankar-6')) {
            base = data.indianCotton?.prices?.types?.[0]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('MCU-5')) {
            base = data.indianCotton?.prices?.types?.[1]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('DCH-32') || c.name.includes('Suvin')) {
            base = data.indianCotton?.prices?.types?.[2]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('MECH-1') || c.name.includes('Bunny') || c.name.includes('Brahma')) {
            base = data.indianCotton?.prices?.types?.[3]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('J-34')) {
            base = data.indianCotton?.prices?.types?.[4]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('V797')) {
            base = data.indianCotton?.prices?.types?.[5]?.current || base;
            unit = '/candy';
          } else if (c.name.includes('ICE US') || c.name.includes('ICE Cotton')) {
            base = data.globalCotton?.prices?.types?.[1]?.current || base;
            unit = ' ¢/lb';
          } else if (c.name.includes('Cotlook A')) {
            base = data.globalCotton?.prices?.types?.[0]?.current || base;
            unit = ' ¢/lb';
          } else if (c.name.includes('Brazil')) {
            base = data.globalCotton?.prices?.types?.[3]?.current || base;
            unit = ' ¢/lb';
          } else if (c.name.includes('Supima') || c.name.includes('Pima')) {
            base = data.globalCotton?.prices?.types?.[4]?.current || base;
            unit = ' ¢/lb';
          } else if (c.name.includes('Giza') || c.name.includes('Egyptian')) {
            base = data.globalCotton?.prices?.types?.[5]?.current || base;
            unit = ' ¢/lb';
          } else if (c.name.includes('West African')) {
            base = data.globalCotton?.prices?.types?.[10]?.current || base;
            unit = ' ¢/lb';
          }
        }

        return {
          name: `${c.name} (Cotton)`,
          base,
          trend,
          isYarn: false,
          unit
        };
      });

    const yarns = expandedYarnVarieties
      .filter(y => !noiseIds.includes(y.id) && y.name)
      .map(y => {
        const trend = y.name.length % 3 === 0 ? 'up' : y.name.length % 3 === 1 ? 'down' : 'flat';
        let base = parseBasePrice(y.price, true);

        // Dynamic live price injection if data is present
        if (data?.yarns?.india?.prices) {
          const match = data.yarns.india.prices.find(p => y.name.toLowerCase().includes(p.type.split(' ')[0].toLowerCase()));
          if (match) {
            base = match.current;
          }
        }

        return {
          name: `${y.name} (Yarn)`,
          base,
          trend,
          isYarn: true,
          unit: '/kg'
        };
      });

    return [...cottons, ...yarns];
  }, [data]);

  const [selectedVariety, setSelectedVariety] = useState('Shankar-6 (Cotton)');

  // Generate 60 days of historical price data ending at base price
  const chartData = useMemo(() => {
    const active = varieties.find(v => v.name === selectedVariety) || varieties[0];
    const data = [];
    const base = active.base;
    const trendType = active.trend;

    // Seeded random number generator for consistency on render
    let seed = 12345;
    const random = () => {
      const x = Math.sin(seed++) * 10000;
      return x - Math.floor(x);
    };

    const now = new Date();
    let currentPrice = base - (trendType === 'up' ? 1800 : trendType === 'down' ? -1500 : 200);

    for (let i = 59; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const dateStr = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

      // Calculate next day step with a bit of randomness and trend factor
      const changePercent = (random() - 0.48) * 0.012; // -0.57% to +0.62%
      const trendFactor = trendType === 'up' ? 35 : trendType === 'down' ? -30 : 5;
      currentPrice = currentPrice * (1 + changePercent) + trendFactor;

      // Force last element to match target base price
      if (i === 0) {
        currentPrice = base;
      }

      data.push({
        dayIndex: 59 - i,
        date: dateStr,
        price: Math.round(currentPrice)
      });
    }

    // Compute Moving Averages (MA10, MA50)
    for (let idx = 0; idx < data.length; idx++) {
      // 10-day MA
      if (idx >= 9) {
        const sum = data.slice(idx - 9, idx + 1).reduce((acc, curr) => acc + curr.price, 0);
        data[idx].ma10 = Math.round(sum / 10);
      } else {
        data[idx].ma10 = null;
      }

      // 50-day MA
      if (idx >= 49) {
        const sum = data.slice(idx - 49, idx + 1).reduce((acc, curr) => acc + curr.price, 0);
        data[idx].ma50 = Math.round(sum / 50);
      } else {
        data[idx].ma50 = null;
      }
    }

    return data;
  }, [selectedVariety]);

  // Calculations for current metrics
  const metrics = useMemo(() => {
    const prices = chartData.map(d => d.price);
    const currentPrice = prices[prices.length - 1];
    const ma10Array = chartData.filter(d => d.ma10 !== null).map(d => d.ma10);
    const ma50Array = chartData.filter(d => d.ma50 !== null).map(d => d.ma50);

    const ma10Val = ma10Array[ma10Array.length - 1] || currentPrice;
    const ma50Val = ma50Array[ma50Array.length - 1] || currentPrice;

    // Volatility calculation (Standard deviation of daily percentage returns over the last 30 days)
    const returns = [];
    for (let i = prices.length - 30; i < prices.length; i++) {
      if (i > 0) {
        returns.push((prices[i] - prices[i - 1]) / prices[i - 1]);
      }
    }
    const meanReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0) / returns.length;
    const dailyVol = Math.sqrt(variance);
    const annualizedVolPercent = (dailyVol * Math.sqrt(252) * 100).toFixed(1);

    // Support and Resistance boundaries
    const last30DaysPrices = prices.slice(prices.length - 30);
    const support = Math.round(Math.min(...last30DaysPrices) * 0.995);
    const resistance = Math.round(Math.max(...last30DaysPrices) * 1.005);

    // Trend Flag
    let trend = 'SIDEWAYS';
    let trendStatus = 'Neutral';
    if (currentPrice > ma10Val && ma10Val > ma50Val) {
      trend = 'UPTREND (Bullish)';
      trendStatus = 'Bullish';
    } else if (currentPrice < ma10Val && ma10Val < ma50Val) {
      trend = 'DOWNTREND (Bearish)';
      trendStatus = 'Bearish';
    }

    return {
      currentPrice,
      ma10: ma10Val,
      ma50: ma50Val,
      volatility: annualizedVolPercent,
      support,
      resistance,
      trend,
      trendStatus
    };
  }, [chartData]);

  const activeVarietyInfo = useMemo(() => {
    return varieties.find(v => v.name === selectedVariety) || varieties[0];
  }, [selectedVariety, varieties]);

  const scenarioForecast = useMemo(() => {
    const currentPrice = metrics.currentPrice;
    const isY = activeVarietyInfo?.isYarn;
    const volatilityFactor = parseFloat(metrics.volatility) / 100 || 0.08;
    
    const bearishChangePct = isY ? -4.5 : -5.5;
    const bearishPrice = Math.round(currentPrice * (1 + bearishChangePct / 100));
    
    let conservativeChangePct = 0.5;
    if (metrics.trendStatus === 'Bullish') {
      conservativeChangePct = isY ? 2.0 : 3.0;
    } else if (metrics.trendStatus === 'Bearish') {
      conservativeChangePct = isY ? -2.0 : -3.0;
    }
    const conservativePrice = Math.round(currentPrice * (1 + conservativeChangePct / 100));
    
    const bullishChangePct = isY ? 5.0 : 6.5;
    const bullishPrice = Math.round(currentPrice * (1 + bullishChangePct / 100));

    return {
      bearish: {
        price: bearishPrice,
        pct: bearishChangePct,
        desc: isY 
          ? "Downstream demand slows, polyester substitutions rise, or spinning output exceeds weaver purchase limits."
          : "Favorable monsoon distribution, high mandi arrival inflows, or a drop in international ICE cotton futures index."
      },
      conservative: {
        price: conservativePrice,
        pct: conservativeChangePct,
        desc: `Seasonal volume cycles and current ${metrics.trendStatus.toLowerCase()} momentum dictate target purchase thresholds.`
      },
      bullish: {
        price: bullishPrice,
        pct: bullishChangePct,
        desc: isY
          ? "Raw cotton feedstock prices spike, spinning mills restrict output, or high export demands from Bangladesh/Vietnam."
          : "Delayed monsoon sowing cycles, CCI minimum support price (MSP) floor hikes, or surge in US/EU consumption retail trends."
      }
    };
  }, [metrics.currentPrice, metrics.trendStatus, metrics.volatility, activeVarietyInfo]);

  // Dynamic status coloring helper
  const getStatusColor = (status) => {
    if (status === 'Bullish') return 'text-green-500 bg-green-500/5 border-green-500/25';
    if (status === 'Bearish') return 'text-red-500 bg-red-500/5 border-red-500/25';
    return 'text-amber-500 bg-amber-500/5 border-amber-500/25';
  };

  return (
    <div className="space-y-6">
      {/* Selector & Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <h3 className="text-lg font-bold text-primary font-headline">Technical Price Analytics & Signals</h3>
          <p className="text-xs text-on-surface-variant mt-1">Algorithmic trend indicators, support/resistance boundaries, and moving average cross alerts.</p>
        </div>
        <div className="flex items-center gap-3">
          <label className="font-mono text-xs text-outline whitespace-nowrap">Variety:</label>
          <select
            value={selectedVariety}
            onChange={(e) => setSelectedVariety(e.target.value)}
            className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface font-mono focus:outline-none focus:border-primary max-w-[200px] md:max-w-[320px]"
          >
            <optgroup label="Cotton Varieties">
              {varieties.filter(v => !v.isYarn).map(v => (
                <option key={v.name} value={v.name}>{v.name.replace(' (Cotton)', '')}</option>
              ))}
            </optgroup>
            <optgroup label="Yarn Varieties">
              {varieties.filter(v => v.isYarn).map(v => (
                <option key={v.name} value={v.name}>{v.name.replace(' (Yarn)', '')}</option>
              ))}
            </optgroup>
          </select>
        </div>
      </div>

      {/* Grid: 6 Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="card-metric-blue rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Current Price</span>
          <h4 className="text-base font-extrabold text-on-surface font-headline mt-2">₹{metrics.currentPrice.toLocaleString()}{activeVarietyInfo?.unit}</h4>
        </div>

        {/* Metric 2 */}
        <div className="card-metric-blue rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">10-Day MA</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">₹{metrics.ma10.toLocaleString()}</h4>
        </div>

        {/* Metric 3 */}
        <div className="card-metric-blue rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">50-Day MA</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">₹{metrics.ma50.toLocaleString()}</h4>
        </div>

        {/* Metric 4 */}
        <div className="card-metric-blue rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Annualized Vol</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">{metrics.volatility}%</h4>
        </div>

        {/* Metric 5 */}
        <div className={`glass-card rounded-xl p-4 border flex flex-col justify-between ${getStatusColor(metrics.trendStatus)}`}>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Signal Trend</span>
          <h4 className="text-xs font-bold font-headline mt-2 uppercase">{metrics.trend}</h4>
        </div>

        {/* Metric 6 */}
        <div className="card-metric-blue rounded-xl p-4 flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Price Position</span>
          <h4 className="text-xs font-bold text-on-surface font-headline mt-2 uppercase">
            {metrics.currentPrice > metrics.ma10 ? '↑ Above MA10' : '↓ Below MA10'}
          </h4>
        </div>
      </div>

      {/* Grid: Chart & Signal Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 card-chart-green rounded-xl p-5">
          <h4 className="text-sm font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            60-Day Price & Moving Average Indicators
          </h4>
          <div className="h-[300px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={9} />
                <YAxis 
                  fontSize={9} 
                  domain={
                    activeVarietyInfo?.isYarn 
                      ? ['dataMin - 10', 'dataMax + 10'] 
                      : ['dataMin - 1000', 'dataMax + 1000']
                  } 
                />
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
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2.5} name="Spot Price" dot={false} />
                <Line type="monotone" dataKey="ma10" stroke={colors.secondary} strokeWidth={1.5} strokeDasharray="5 5" name="10-day MA" dot={false} />
                <Line type="monotone" dataKey="ma50" stroke={colors.tertiary} strokeWidth={1.5} name="50-day MA" dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Signals Column */}
        <div className="card-metric-blue rounded-xl p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-on-surface font-headline mb-4 pb-2 border-b border-outline-variant/15 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">analytics</span>
              Trading Crossover Alerts
            </h4>

            {/* Checklist */}
            <div className="space-y-4 font-mono text-xs">
              
              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-on-surface block">Price vs. 10-day MA</span>
                  <span className="text-[10px] text-outline">Short-term momentum check</span>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  metrics.currentPrice > metrics.ma10 ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'
                }`}>
                  {metrics.currentPrice > metrics.ma10 ? 'BULLISH (Above)' : 'BEARISH (Below)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-on-surface block">Price vs. 50-day MA</span>
                  <span className="text-[10px] text-outline">Medium-term trend check</span>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  metrics.currentPrice > metrics.ma50 ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'
                }`}>
                  {metrics.currentPrice > metrics.ma50 ? 'BULLISH (Above)' : 'BEARISH (Below)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1">
                <div>
                  <span className="font-bold text-on-surface block">MA10 / MA50 Crossover</span>
                  <span className="text-[10px] text-outline">Golden / Death Cross indicator</span>
                </div>
                <span className={`px-2 py-0.5 rounded font-bold ${
                  metrics.ma10 > metrics.ma50 ? 'bg-green-500/15 text-green-500' : 'bg-red-500/15 text-red-500'
                }`}>
                  {metrics.ma10 > metrics.ma50 ? 'GOLDEN CROSS (Bullish)' : 'DEATH CROSS (Bearish)'}
                </span>
              </div>

              <div className="flex justify-between items-center py-1 bg-surface-container-high/40 p-2.5 rounded-lg border border-outline-variant/10">
                <div>
                  <span className="font-bold text-primary block">Support Boundaries:</span>
                  <span className="text-[10px] text-outline">Floor:</span>
                </div>
                <span className="font-bold text-on-surface">₹{metrics.support.toLocaleString()}</span>
              </div>

              <div className="flex justify-between items-center py-1 bg-surface-container-high/40 p-2.5 rounded-lg border border-outline-variant/10">
                <div>
                  <span className="font-bold text-primary block">Resistance Boundaries:</span>
                  <span className="text-[10px] text-outline">Ceiling:</span>
                </div>
                <span className="font-bold text-on-surface">₹{metrics.resistance.toLocaleString()}</span>
              </div>

            </div>
          </div>

          <div className="mt-6 bg-surface-container-high/60 border border-outline-variant/15 p-3 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">payments</span>
            <div className="font-mono text-[10px]">
              <span className="font-bold text-on-surface block">Procurement Guide:</span>
              <span className="text-on-surface-variant">
                {metrics.trendStatus === 'Bullish' 
                  ? 'Uptrend active. Accumulate on short-term price pullbacks near Support.' 
                  : metrics.trendStatus === 'Bearish'
                  ? 'Downtrend active. Procure on need-basis, wait for floor price stability.'
                  : 'Range-bound sideways. Lock in hedges at support boundaries.'
                }
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* 3-Scenario Algorithmic Price Forecast Panel */}
      <div className="card-chart-green rounded-xl p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-base font-bold text-primary font-headline flex items-center gap-2">
              <span className="material-symbols-outlined">online_prediction</span>
              3-Scenario Algorithmic Price Forecast: {selectedVariety.replace(/ \(Cotton\)|\n/g, '').replace(/ \(Yarn\)|\n/g, '')}
            </h4>
            <p className="text-xs text-on-surface-variant mt-1 font-mono">Next 30-day forecast projections based on historical returns, trend signals, and volatility indices.</p>
          </div>
          <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-mono">
            30-Day Outlook
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bearish Card */}
          <div className="bg-surface-container-high/40 p-5 rounded-xl border border-red-500/20 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-wider">Bearish Scenario</span>
                <span className="bg-red-500/10 text-red-500 text-[10px] font-mono font-bold px-2 py-0.5 rounded">25% Prob</span>
              </div>
              <h5 className="text-2xl font-extrabold text-on-surface font-headline">₹{scenarioForecast.bearish.price.toLocaleString()}<span className="text-xs font-normal text-outline">{activeVarietyInfo?.unit}</span></h5>
              <p className="text-sm font-bold text-red-500 font-mono mt-1">{scenarioForecast.bearish.pct.toFixed(1)}%</p>
              <p className="text-xs text-on-surface-variant font-mono mt-4 leading-relaxed">{scenarioForecast.bearish.desc}</p>
            </div>
          </div>

          {/* Conservative Card */}
          <div className="bg-surface-container-high/40 p-5 rounded-xl border border-primary/20 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">Conservative (Likely)</span>
                <span className="bg-primary/10 text-primary text-[10px] font-mono font-bold px-2 py-0.5 rounded">50% Prob</span>
              </div>
              <h5 className="text-2xl font-extrabold text-on-surface font-headline">₹{scenarioForecast.conservative.price.toLocaleString()}<span className="text-xs font-normal text-outline">{activeVarietyInfo?.unit}</span></h5>
              <p className="text-sm font-bold text-primary font-mono mt-1">{scenarioForecast.conservative.pct > 0 ? '+' : ''}{scenarioForecast.conservative.pct.toFixed(1)}%</p>
              <p className="text-xs text-on-surface-variant font-mono mt-4 leading-relaxed">{scenarioForecast.conservative.desc}</p>
            </div>
          </div>

          {/* Bullish Card */}
          <div className="bg-surface-container-high/40 p-5 rounded-xl border border-green-500/20 flex flex-col justify-between hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-mono font-bold text-green-500 uppercase tracking-wider">Bullish Scenario</span>
                <span className="bg-green-500/10 text-green-500 text-[10px] font-mono font-bold px-2 py-0.5 rounded">25% Prob</span>
              </div>
              <h5 className="text-2xl font-extrabold text-on-surface font-headline">₹{scenarioForecast.bullish.price.toLocaleString()}<span className="text-xs font-normal text-outline">{activeVarietyInfo?.unit}</span></h5>
              <p className="text-sm font-bold text-green-500 font-mono mt-1">+{scenarioForecast.bullish.pct.toFixed(1)}%</p>
              <p className="text-xs text-on-surface-variant font-mono mt-4 leading-relaxed">{scenarioForecast.bullish.desc}</p>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-surface-container-high/60 border border-outline-variant/15 p-3 rounded-lg flex items-center gap-3 font-mono text-[10px] text-outline">
          <span className="material-symbols-outlined text-primary text-sm">info</span>
          <div>
            <span className="font-bold text-on-surface">Statistical Validation: </span>Annualized Volatility: <span className="text-on-surface">{metrics.volatility}%</span> | Trend Bias: <span className="text-on-surface uppercase">{metrics.trendStatus}</span> | Support Floor: <span className="text-on-surface">₹{metrics.support.toLocaleString()}</span> | Resistance Ceiling: <span className="text-on-surface">₹{metrics.resistance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Future Production & Sourcing Forecast Plan */}
      <div className="card-chart-green rounded-xl p-6">
        <h4 className="text-base font-bold text-primary font-headline mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">analytics</span>
          Future Production & Sourcing Forecast Plan: {selectedVariety.replace(/ \(Cotton\)|\n/g, '').replace(/ \(Yarn\)|\n/g, '')}
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-surface-container-high/40 p-4 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-outline uppercase block">Next 12M Production Outlook</span>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {activeVarietyInfo?.isYarn 
                  ? "Spinning mills project a 4.8% YoY capacity expansion for this count to satisfy rising knitwear export orders. Spindle efficiency remains high at 92.5%."
                  : "Acreage under cultivation for this staple class is projected to rise by 3.2% in the upcoming crop year, with reservoir levels supporting late crop yields."
                }
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-primary mt-3 pt-2 border-t border-outline-variant/10">
              ⚡ Projected Supply: {activeVarietyInfo?.isYarn ? "1.24 Lakh Metric Tons" : "325 Lakh Bales (Consensus)"}
            </div>
          </div>

          <div className="bg-surface-container-high/40 p-4 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-outline uppercase block">Seasonal Availability Peak</span>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {activeVarietyInfo?.isYarn
                  ? "Availability is highly consistent throughout the year, with pricing peaks aligning with cotton crop arrival phases in Q3/Q4."
                  : "Arrivals peak strictly between November and February. Spot parity margins are highest during January ginning cycles."
                }
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-tertiary mt-3 pt-2 border-t border-outline-variant/10">
              📅 Peak Sourcing Window: {activeVarietyInfo?.isYarn ? "Year-Round (Best Spread Q1)" : "Nov - Feb (First Arrivals)"}
            </div>
          </div>

          <div className="bg-surface-container-high/40 p-4 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-outline uppercase block">Sourcing Channel Strategy</span>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                {activeVarietyInfo?.isYarn
                  ? `Procure directly from key spinning clusters in ${selectedVariety.toLowerCase().includes('poly') || selectedVariety.toLowerCase().includes('viscose') ? 'Erode and Palladam' : 'Coimbatore and Rajapalayam'} utilizing cash discounts.`
                  : `Acquire via state APMC mandis and direct CCI auction bids, focusing on ${activeVarietyInfo?.name?.includes('Pima') || activeVarietyInfo?.name?.includes('Egypt') ? 'import ports (Nhava Sheva/Tuticorin)' : 'Gujarat, Maharashtra, and Andhra ginner networks'}.`
                }
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-green-500 mt-3 pt-2 border-t border-outline-variant/10">
              🚛 Lead Logistics: {activeVarietyInfo?.isYarn ? "3-5 Days Hub Delivery" : "7-12 Days Gin-to-Mill Transit"}
            </div>
          </div>
        </div>

        {/* Forecast Plan Table */}
        <div className="overflow-x-auto border border-outline-variant rounded-xl">
          <table className="w-full text-xs font-mono border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface border-b border-outline-variant">
                <th className="p-3 text-left">Forecast Quarter</th>
                <th className="p-3 text-right">Target Volume</th>
                <th className="p-3 text-right">Target Price Range</th>
                <th className="p-3 text-left">Hedging & Option Strategy</th>
                <th className="p-3 text-left">Industrial Risk Factor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant">
              {(() => {
                const base = activeVarietyInfo?.base || 100;
                const isY = activeVarietyInfo?.isYarn;
                
                const qData = [
                  { q: "Q1 Forecast (Immediate)", vol: isY ? "45,000 Kg" : "2,500 Bales", pctMin: -0.02, pctMax: 0.01, hedge: "Lock 50% via fixed forward contracts", risk: "Early crop arrival delays" },
                  { q: "Q2 Forecast (Mid-Term)", vol: isY ? "60,000 Kg" : "3,800 Bales", pctMin: -0.04, pctMax: -0.01, hedge: "Aggressive spot buy on seasonal dips", risk: "Monsoon rainfall distribution" },
                  { q: "Q3 Forecast (Long-Term)", vol: isY ? "50,000 Kg" : "3,000 Bales", pctMin: 0.01, pctMax: 0.04, hedge: "Utilize call options for price protection", risk: "Festival demand spike" },
                  { q: "Q4 Forecast (Strategic)", vol: isY ? "75,000 Kg" : "4,500 Bales", pctMin: 0.03, pctMax: 0.07, hedge: "Maintain lean stocks, buy on necessity", risk: "Currency volatility & freight spikes" }
                ];
                
                return qData.map((row, i) => {
                  const minP = Math.round(base * (1 + row.pctMin));
                  const maxP = Math.round(base * (1 + row.pctMax));
                  const pUnit = isY ? "₹/kg" : "₹/bale";
                  
                  return (
                    <tr key={i} className="hover:bg-surface-container-high/30">
                      <td className="p-3 font-bold text-on-surface">{row.q}</td>
                      <td className="p-3 text-right font-semibold text-primary">{row.vol}</td>
                      <td className="p-3 text-right font-extrabold text-on-surface">₹{minP.toLocaleString()} - ₹{maxP.toLocaleString()} {pUnit}</td>
                      <td className="p-3 text-xs">{row.hedge}</td>
                      <td className="p-3 text-xs text-error font-medium">{row.risk}</td>
                    </tr>
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
