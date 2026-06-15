// src/components/HosieryDesk.jsx
import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export function HosieryDesk({ data, yarns, colors, darkMode }) {
  const hw = yarns?.hosieryWeaving || {
    monthlyTrend: [],
    counts: []
  };

  // State for interactive calculator
  const shankar6Spot = data?.prices?.types?.[0]?.current || 62350;
  const [cottonPrice, setCottonPrice] = useState(shankar6Spot);

  useEffect(() => {
    setCottonPrice(shankar6Spot);
  }, [shankar6Spot]);
  const [yarnCount, setYarnCount] = useState('30s');
  const [yarnType, setYarnType] = useState('combed_hosiery');
  const [conversionCost, setConversionCost] = useState(65);
  const [logisticsCost, setLogisticsCost] = useState(1100);

  // Helper variables for calculator
  const yieldMultiplier = 
    yarnType === 'carded_hosiery' ? 1.21 : 
    yarnType === 'combed_weaving' ? 1.25 : 1.25;

  const twistLabel = 
    yarnType === 'combed_weaving' ? '4.0 TPI (High Weaving Twist)' : '3.4 TPI (Soft Knitting Twist)';

  const sizingLabel = 
    yarnType === 'combed_weaving' ? 'Sizing Starch Coating Required' : 'Lubricating Wax Ring Required';

  // Calculator logic
  const rawCottonCostPerKg = (cottonPrice / 356); // Ex-Gin per Kg
  const logisticsPerKg = (logisticsCost / 356);
  const rawMaterialCleanCost = (rawCottonCostPerKg + logisticsPerKg) * yieldMultiplier;
  const totalProductionCost = Math.round(rawMaterialCleanCost + conversionCost);

  // Get current market price of selected variety for comparison
  const getMarketPrice = () => {
    if (yarnCount === '20s') {
      if (yarnType === 'combed_hosiery') return hw.counts[0]?.combedHosiery || 253;
      if (yarnType === 'carded_hosiery') return hw.counts[0]?.cardedHosiery || 236;
      return hw.counts[0]?.combedWeaving || 243;
    }
    if (yarnCount === '24s') {
      if (yarnType === 'combed_hosiery') return hw.counts[1]?.combedHosiery || 267;
      if (yarnType === 'carded_hosiery') return hw.counts[1]?.cardedHosiery || 249;
      return hw.counts[1]?.combedWeaving || 257;
    }
    if (yarnCount === '30s') {
      if (yarnType === 'combed_hosiery') return hw.counts[2]?.combedHosiery || 284;
      if (yarnType === 'carded_hosiery') return hw.counts[2]?.cardedHosiery || 262;
      return hw.counts[2]?.combedWeaving || 274;
    }
    if (yarnCount === '34s') {
      if (yarnType === 'combed_hosiery') return hw.counts[3]?.combedHosiery || 298;
      if (yarnType === 'carded_hosiery') return hw.counts[3]?.cardedHosiery || 275;
      return hw.counts[3]?.combedWeaving || 287;
    }
    // 40s
    if (yarnType === 'combed_hosiery') return hw.counts[4]?.combedHosiery || 311;
    if (yarnType === 'carded_hosiery') return hw.counts[4]?.cardedHosiery || 286;
    return hw.counts[4]?.combedWeaving || 301;
  };

  const marketPrice = getMarketPrice();
  const arbitrageMargin = marketPrice - totalProductionCost;

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-primary/10 via-tertiary/5 to-transparent border border-primary/20 rounded-xxl p-6 shadow-sm relative overflow-hidden">
        <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">analytics</span>
          Hosiery vs. Weaving Yarn Desk
        </h3>
        <p className="text-xs text-on-surface-variant max-w-4xl leading-relaxed">
          Knitting (Hosiery) and Weaving yarns are engineered with distinct mechanical properties. Hosiery yarns utilize 
          lower twist profiles (**3.2–3.5 TM**) and lubrication wax for high-speed circular needles. Weaving yarns feature 
          tighter twist TMs (**3.8–4.2**) and sizing starches to withstand loom warp tension. Sourcing and price variations 
          between them reflect raw fiber grades, processing costs, and seasonal demand.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Count Matrix Card */}
        <div className="lg:col-span-7 glass-card border rounded-xxl p-5 shadow-xs flex flex-col justify-between transition-colors" style={{ background: darkMode ? 'linear-gradient(135deg, rgba(251, 140, 0, 0.15) 0%, rgba(32, 22, 16, 0.6) 100%)' : 'linear-gradient(135deg, rgba(251, 140, 0, 0.12) 0%, rgba(255, 255, 255, 1) 100%)', borderColor: darkMode ? 'rgba(251, 140, 0, 0.3)' : 'rgba(251, 140, 0, 0.2)' }}>
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider">
                Yarn Count & Price Comparison Matrix (₹/Kg)
              </h4>
              <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full font-bold">
                Ex-Mill Rates
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/30 text-on-surface-variant text-[10px] uppercase tracking-wider">
                    <th className="py-2.5 font-bold">Count</th>
                    <th className="py-2.5 font-bold text-right">Combed Hosiery</th>
                    <th className="py-2.5 font-bold text-right">Carded Hosiery</th>
                    <th className="py-2.5 font-bold text-right">Combed Weaving</th>
                    <th className="py-2.5 font-bold text-right text-emerald-500">Premium Spread</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                  {hw.counts.map((item, idx) => {
                    const spread = item.combedHosiery - item.combedWeaving;
                    return (
                      <tr key={idx} className="hover:bg-surface-container/50 transition-colors">
                        <td className="py-3 font-black text-primary">{item.count}</td>
                        <td className="py-3 text-right font-semibold">₹{item.combedHosiery}</td>
                        <td className="py-3 text-right">₹{item.cardedHosiery}</td>
                        <td className="py-3 text-right">₹{item.combedWeaving}</td>
                        <td className="py-3 text-right font-black text-emerald-500">
                          +₹{spread}/Kg
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="mt-4 pt-3 border-t border-outline-variant/20 flex gap-4 text-[10px] text-on-surface-variant leading-relaxed">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary"></span>
              <span>Combed Hosiery utilizes ELS-blended fiber mix.</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.chartPalette[4] }}></span>
              <span>Premium Spread tracks knitting twist processing margins.</span>
            </div>
          </div>
        </div>

        {/* Spread Line Chart Card */}
        <div className="lg:col-span-5 glass-card border rounded-xxl p-5 shadow-xs transition-colors" style={{ background: darkMode ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(20, 32, 25, 0.6) 100%)' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(255, 255, 255, 1) 100%)', borderColor: darkMode ? 'rgba(16, 185, 129, 0.3)' : 'rgba(16, 185, 129, 0.2)' }}>
          <div className="flex justify-between items-center mb-4 border-b border-outline-variant/20 pb-3">
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider">
              30s Combed: Hosiery vs. Weaving Spread Trend
            </h4>
            <span className="text-[10px] font-mono text-emerald-500 font-bold">
              12M Trend
            </span>
          </div>

          <div className="h-52 min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hw.monthlyTrend} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
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
                <Line type="monotone" dataKey="hosiery30s" name="Hosiery 30s" stroke={colors.primary} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="weaving30s" name="Weaving 30s" stroke={colors.chartPalette[2]} strokeWidth={1.5} dot={false} />
                <Line type="monotone" dataKey="spread" name="Spread Premium" stroke={colors.chartPalette[4]} strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Sourcing Cost Arbitrage Calculator */}
      <div className="glass-card border rounded-xxl p-5 transition-colors" style={{ background: darkMode ? 'linear-gradient(135deg, rgba(251, 140, 0, 0.15) 0%, rgba(32, 22, 16, 0.6) 100%)' : 'linear-gradient(135deg, rgba(251, 140, 0, 0.12) 0%, rgba(255, 255, 255, 1) 100%)', borderColor: darkMode ? 'rgba(251, 140, 0, 0.3)' : 'rgba(251, 140, 0, 0.2)' }}>
        <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">calculate</span>
          Sourcing Cost & Margin Arbitrage Calculator (Coimbatore / Tiruppur Hub)
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="md:col-span-5 space-y-4">
            <div className="p-4 rounded-xl border space-y-3 transition-colors" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.3)' : '#FFFDFB', borderColor: darkMode ? 'rgba(251, 140, 0, 0.15)' : 'rgba(251, 140, 0, 0.1)' }}>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block">
                Procurement Settings
              </span>
              
              {/* Cotton Price Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans">
                  Shankar-6 Cotton Ex-Gin (₹/Candy):
                </label>
                <div className="relative">
                  <span className="absolute left-2.5 top-2 text-[11px] text-outline font-mono">₹</span>
                  <input 
                    type="number"
                    value={cottonPrice}
                    onChange={(e) => setCottonPrice(Number(e.target.value))}
                    className="w-full bg-surface border border-outline-variant/40 rounded-lg py-1.5 pl-6 pr-3 text-xs font-mono font-bold text-on-surface focus:outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Count & Type select */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant font-sans">Count:</label>
                  <select 
                    value={yarnCount}
                    onChange={(e) => setYarnCount(e.target.value)}
                    className="bg-surface border border-outline-variant/40 rounded-lg py-1.5 px-2 text-xs font-mono font-bold text-on-surface focus:outline-none"
                  >
                    <option value="20s">Ne 20s</option>
                    <option value="24s">Ne 24s</option>
                    <option value="30s">Ne 30s</option>
                    <option value="34s">Ne 34s</option>
                    <option value="40s">Ne 40s</option>
                  </select>
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant font-sans">Type:</label>
                  <select 
                    value={yarnType}
                    onChange={(e) => setYarnType(e.target.value)}
                    className="bg-surface border border-outline-variant/40 rounded-lg py-1.5 px-2 text-xs font-mono font-bold text-on-surface focus:outline-none"
                  >
                    <option value="combed_hosiery">Combed Hosiery</option>
                    <option value="carded_hosiery">Carded Hosiery</option>
                    <option value="combed_weaving">Combed Weaving</option>
                  </select>
                </div>
              </div>

              {/* Conversion & Logistics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant font-sans">Conversion (₹/Kg):</label>
                  <input 
                    type="number" 
                    value={conversionCost}
                    onChange={(e) => setConversionCost(Number(e.target.value))}
                    className="bg-surface border border-outline-variant/40 rounded-lg py-1.5 px-2.5 text-xs font-mono font-bold text-on-surface focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-on-surface-variant font-sans">Freight (₹/Cd):</label>
                  <input 
                    type="number" 
                    value={logisticsCost}
                    onChange={(e) => setLogisticsCost(Number(e.target.value))}
                    className="bg-surface border border-outline-variant/40 rounded-lg py-1.5 px-2.5 text-xs font-mono font-bold text-on-surface focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3">
              {/* Cost Card 1 */}
              <div className="p-3.5 rounded-xl border flex flex-col justify-between transition-colors" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9', borderColor: darkMode ? 'rgba(251, 140, 0, 0.15)' : 'rgba(251, 140, 0, 0.1)' }}>
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Raw Fiber Cost</span>
                  <span className="text-lg font-black text-primary font-mono block mt-1">
                    ₹{rawMaterialCleanCost.toFixed(2)}
                  </span>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono mt-2 block">
                  Yield Factor: {yieldMultiplier}x (Incl. Clean Trash Recovery)
                </span>
              </div>

              {/* Cost Card 2 */}
              <div className="p-3.5 rounded-xl border flex flex-col justify-between transition-colors" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.4)' : '#FFFDF9', borderColor: darkMode ? 'rgba(251, 140, 0, 0.15)' : 'rgba(251, 140, 0, 0.1)' }}>
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Est. Spinning Cost</span>
                  <span className="text-lg font-black text-primary font-mono block mt-1">
                    ₹{totalProductionCost}
                  </span>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono mt-2 block">
                  Incl. ₹{conversionCost}/Kg conversion charge.
                </span>
              </div>

              {/* Cost Card 3 */}
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                arbitrageMargin >= 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'
              }`}>
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Arbitrage Spread</span>
                  <span className={`text-lg font-black font-mono block mt-1 ${
                    arbitrageMargin >= 0 ? 'text-emerald-500' : 'text-error'
                  }`}>
                    {arbitrageMargin >= 0 ? '+' : ''}₹{arbitrageMargin}/Kg
                  </span>
                </div>
                <span className={`text-[9px] font-mono mt-2 block ${
                  arbitrageMargin >= 0 ? 'text-emerald-500' : 'text-error'
                }`}>
                  {arbitrageMargin >= 0 ? 'Sourcing Arbitrage Profit' : 'Raw material cost exceeds market rate'}
                </span>
              </div>
            </div>

            {/* Technical Parameters Info Box */}
            <div className="border border-outline-variant/10 rounded-xl p-4 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono transition-colors" style={{ backgroundColor: darkMode ? 'rgba(32, 22, 16, 0.2)' : '#FFFDF7' }}>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary block">Engineered Twist Rate</span>
                <p className="text-on-surface font-black">{twistLabel}</p>
                <span className="text-[9px] text-on-surface-variant block">Low twist ensures soft drape, preventing knit spirality.</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold uppercase tracking-wider text-primary block">Winding & Finishing Parameters</span>
                <p className="text-on-surface font-black">{sizingLabel}</p>
                <span className="text-[9px] text-on-surface-variant block">Hosiery requires waxed wound package for circular feed loops.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HosieryDesk;
