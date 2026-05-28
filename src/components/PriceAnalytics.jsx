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

export default function PriceAnalytics({ darkMode, colors }) {
  const varieties = [
    { name: 'Shankar-6 (S-6)', base: 65100, trend: 'up' },
    { name: 'MCU-5', base: 70000, trend: 'down' },
    { name: 'DCH-32 / Suvin', base: 88000, trend: 'flat' },
    { name: 'J-34', base: 62700, trend: 'up' }
  ];

  const [selectedVariety, setSelectedVariety] = useState('Shankar-6 (S-6)');

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
            className="bg-surface-container-high border border-outline-variant/30 rounded-lg px-3 py-1.5 text-xs text-on-surface font-mono focus:outline-none focus:border-primary"
          >
            {varieties.map(v => (
              <option key={v.name} value={v.name}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid: 6 Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Metric 1 */}
        <div className="glass-card rounded-xl p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Current Price</span>
          <h4 className="text-base font-extrabold text-on-surface font-headline mt-2">₹{metrics.currentPrice.toLocaleString()}/Candy</h4>
        </div>

        {/* Metric 2 */}
        <div className="glass-card rounded-xl p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">10-Day MA</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">₹{metrics.ma10.toLocaleString()}</h4>
        </div>

        {/* Metric 3 */}
        <div className="glass-card rounded-xl p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">50-Day MA</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">₹{metrics.ma50.toLocaleString()}</h4>
        </div>

        {/* Metric 4 */}
        <div className="glass-card rounded-xl p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Annualized Vol</span>
          <h4 className="text-base font-bold text-on-surface font-headline mt-2">{metrics.volatility}%</h4>
        </div>

        {/* Metric 5 */}
        <div className={`glass-card rounded-xl p-4 border flex flex-col justify-between ${getStatusColor(metrics.trendStatus)}`}>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Signal Trend</span>
          <h4 className="text-xs font-bold font-headline mt-2 uppercase">{metrics.trend}</h4>
        </div>

        {/* Metric 6 */}
        <div className="glass-card rounded-xl p-4 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-outline">Price Position</span>
          <h4 className="text-xs font-bold text-on-surface font-headline mt-2 uppercase">
            {metrics.currentPrice > metrics.ma10 ? '↑ Above MA10' : '↓ Below MA10'}
          </h4>
        </div>
      </div>

      {/* Grid: Chart & Signal Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Column */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low">
          <h4 className="text-sm font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">show_chart</span>
            60-Day Price & Moving Average Indicators
          </h4>
          <div className="h-[300px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" fontSize={9} />
                <YAxis fontSize={9} domain={['dataMin - 1000', 'dataMax + 1000']} />
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
        <div className="glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
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
    </div>
  );
}
