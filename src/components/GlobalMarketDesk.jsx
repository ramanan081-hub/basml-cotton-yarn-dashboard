// src/components/GlobalMarketDesk.jsx
import React, { useState } from 'react';
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

export function GlobalMarketDesk({ globalCotton, yarns, colors }) {
  // Mock historical correlation data for Brent, Cotlook A, and Polyester PSF (cents/lb equivalent)
  const correlationData = [
    { month: 'Jul 25', Brent: 78.5, CotlookA: 91.8, PolyesterPSF: 52.0 },
    { month: 'Aug 25', Brent: 82.1, CotlookA: 93.2, PolyesterPSF: 53.5 },
    { month: 'Sep 25', Brent: 84.8, CotlookA: 94.0, PolyesterPSF: 54.8 },
    { month: 'Oct 25', Brent: 81.2, CotlookA: 92.5, PolyesterPSF: 52.9 },
    { month: 'Nov 25', Brent: 79.5, CotlookA: 91.0, PolyesterPSF: 51.5 },
    { month: 'Dec 25', Brent: 77.0, CotlookA: 89.5, PolyesterPSF: 50.2 },
    { month: 'Jan 26', Brent: 80.4, CotlookA: 91.2, PolyesterPSF: 52.1 },
    { month: 'Feb 26', Brent: 82.8, CotlookA: 92.5, PolyesterPSF: 53.4 },
    { month: 'Mar 26', Brent: 85.2, CotlookA: 94.0, PolyesterPSF: 54.9 },
    { month: 'Apr 26', Brent: 88.0, CotlookA: 90.2, PolyesterPSF: 56.5 },
    { month: 'May 26', Brent: 86.5, CotlookA: 88.5, PolyesterPSF: 55.8 },
    { month: 'Jun 26', Brent: 84.50, CotlookA: 87.92, PolyesterPSF: 54.60 }
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
    },
    {
      id: 'middle-east',
      title: 'Middle East Regional Escalation',
      status: 'Moderate',
      icon: 'explosion',
      impact: 'Threats to critical oil shipping checkpoints, including the Strait of Hormuz.',
      cottonEffect: 'Indirectly affects cotton through rising fuel/freight surcharges and global safe-haven USD currency strength, making import cotton more expensive for developing markets.',
      syntheticEffect: 'Direct threat to petrochemical supply chains. Immediately drives crude oil prices upwards, causing PTA and MEG feedstock spot rates to rally.',
      badgeColor: 'bg-blue-500/10 border-blue-500/30 text-blue-500'
    }
  ];

  // Interactive Blending & Substitution Calculator State
  const [crudeOil, setCrudeOil] = useState(84.50); // USD/bbl
  const [cottonSpot, setCottonSpot] = useState(87.92); // cents/lb

  // Feedstock calculations
  const estimatedPta = Math.round(crudeOil * 8.5 + 40); // USD/Metric Ton
  const estimatedMeg = Math.round(crudeOil * 5.2 + 70); // USD/Metric Ton
  // PSF price is strongly correlated with PTA/MEG (PTA represents ~85% of composition)
  const estimatedPsfUSD = (estimatedPta * 0.86 + estimatedMeg * 0.34) / 1000 * 1.15; // USD/kg
  const estimatedPsfInr = estimatedPsfUSD * 85.50; // INR/kg
  
  // Cotton price conversions
  const cottonUSDPerKg = (cottonSpot * 2.20462) / 100; // USD/kg
  const cottonInrPerKg = cottonUSDPerKg * 85.50; // INR/kg

  // Blending & Substitution metrics
  const priceSpreadInr = cottonInrPerKg - estimatedPsfInr;
  const parityRatio = cottonInrPerKg / estimatedPsfInr;

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
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Brent Crude Oil</span>
            <span className="material-symbols-outlined text-primary text-xs">oil_barrel</span>
          </div>
          <div className="text-xl font-black text-primary font-mono mt-1">${crudeOil.toFixed(2)}</div>
          <span className="text-[9px] font-mono text-emerald-500 font-bold block mt-1">+1.2% Daily Settle</span>
        </div>

        {/* PTA Feedstock */}
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>PTA (Feedstock)</span>
            <span className="material-symbols-outlined text-outline text-xs">science</span>
          </div>
          <div className="text-xl font-black text-on-surface font-mono mt-1">${estimatedPta}</div>
          <span className="text-[9px] font-mono text-on-surface-variant block mt-1">USD/Metric Ton (Est.)</span>
        </div>

        {/* MEG Feedstock */}
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>MEG (Feedstock)</span>
            <span className="material-symbols-outlined text-outline text-xs">biotech</span>
          </div>
          <div className="text-xl font-black text-on-surface font-mono mt-1">${estimatedMeg}</div>
          <span className="text-[9px] font-mono text-on-surface-variant block mt-1">USD/Metric Ton (Est.)</span>
        </div>

        {/* PSF Global */}
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Polyester PSF</span>
            <span className="material-symbols-outlined text-tertiary text-xs">precision_manufacturing</span>
          </div>
          <div className="text-xl font-black text-tertiary font-mono mt-1">${estimatedPsfUSD.toFixed(2)}</div>
          <span className="text-[9px] font-mono text-tertiary font-bold block mt-1">₹{estimatedPsfInr.toFixed(1)}/Kg Equivalent</span>
        </div>

        {/* Cotlook A-Index */}
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
          <div className="flex justify-between items-center text-[10px] font-mono text-outline font-bold uppercase">
            <span>Cotlook A-Index</span>
            <span className="material-symbols-outlined text-emerald-500 text-xs">eco</span>
          </div>
          <div className="text-xl font-black text-emerald-500 font-mono mt-1">{cottonSpot.toFixed(2)}¢</div>
          <span className="text-[9px] font-mono text-emerald-500 font-bold block mt-1">₹{cottonInrPerKg.toFixed(1)}/Kg Equivalent</span>
        </div>

        {/* Parity Index */}
        <div className="glass-card border border-outline-variant/30 rounded-xl p-4 bg-surface-container-low">
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
        {/* Geopolitical & Shipping Risk Table */}
        <div className="lg:col-span-7 glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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

        {/* Chart Card */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Historical Correlation Chart */}
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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
                  <Line type="monotone" dataKey="Brent" name="Brent Crude ($/bbl)" stroke="#EC4899" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="CotlookA" name="Cotlook A (¢/lb)" stroke="#10B981" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="PolyesterPSF" name="Polyester PSF (¢/lb equiv)" stroke="#8B5CF6" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 pt-3 border-t border-outline-variant/15 text-[10px] text-on-surface-variant font-mono leading-relaxed">
              <p><strong>Note:</strong> Correlation factor is high (**~0.82**) between Crude Oil and Polyester PSF. Spikes in crude translate to PSF cost increases within 14 days, reducing cotton-polyester price spreads.</p>
            </div>
          </div>

          {/* Petrochemical Pipeline Flow */}
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low text-xs font-mono space-y-3">
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider border-b border-outline-variant/20 pb-2">
              Oil-to-Polyester Transmission Flow
            </h4>
            <div className="flex flex-col gap-2 relative pl-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-outline-variant/30">
              <div className="relative before:absolute before:left-[-14px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                <span className="font-bold text-primary">1. Crude Oil (Energy Source)</span>
                <span className="text-[10px] text-on-surface-variant block">Spikes in Brent oil raise prices of petrochemical feeds.</span>
              </div>
              <div className="relative before:absolute before:left-[-14px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                <span className="font-bold text-on-surface">2. Naphtha & Paraxylene (PX)</span>
                <span className="text-[10px] text-on-surface-variant block">Refinery outputs processed from crude distillates.</span>
              </div>
              <div className="relative before:absolute before:left-[-14px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                <span className="font-bold text-tertiary">3. PTA & MEG (Precursors)</span>
                <span className="text-[10px] text-on-surface-variant block">Constitutes 85% of PSF chemical composition inputs.</span>
              </div>
              <div className="relative before:absolute before:left-[-14px] before:top-1.5 before:w-2 before:h-2 before:rounded-full before:bg-primary">
                <span className="font-bold text-emerald-500">4. Polyester Staple Fiber (PSF)</span>
                <span className="text-[10px] text-on-surface-variant block">Extruded synthetic fiber that matches cotton staple lengths.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Oil Factor Arbitrage & Blending Calculator */}
      <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
        <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-4 border-b border-outline-variant/20 pb-3 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-primary text-base">calculate</span>
          Interactive Blending & Substitution Predictor
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Inputs */}
          <div className="md:col-span-5 space-y-4">
            <div className="bg-surface-container-low/40 p-4 rounded-xl border border-outline-variant/15 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary block">
                Arbitrage & Market Simulation
              </span>
              
              {/* Crude Oil Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans flex justify-between">
                  <span>Simulated Crude Oil (USD/Barrel):</span>
                  <span className="font-mono text-primary font-bold">${crudeOil}</span>
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

              {/* Cotton Price Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-on-surface-variant font-sans flex justify-between">
                  <span>Simulated Cotlook A-Index (Cents/Lb):</span>
                  <span className="font-mono text-emerald-500 font-bold">{cottonSpot}¢</span>
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
            </div>
          </div>

          {/* Results Summary */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div className="grid grid-cols-3 gap-3">
              {/* PSF cost */}
              <div className="bg-surface-container-low/40 p-3.5 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Est. Polyester PSF Rate</span>
                  <span className="text-lg font-black text-tertiary font-mono block mt-1">
                    ₹{estimatedPsfInr.toFixed(1)}/Kg
                  </span>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono mt-2 block">
                  ~${estimatedPsfUSD.toFixed(2)}/Kg (Incl. PTA + MEG Feedstock)
                </span>
              </div>

              {/* Cotton Cost */}
              <div className="bg-surface-container-low/40 p-3.5 rounded-xl border border-outline-variant/15 flex flex-col justify-between">
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Est. Cotton Spot Rate</span>
                  <span className="text-lg font-black text-emerald-500 font-mono block mt-1">
                    ₹{cottonInrPerKg.toFixed(1)}/Kg
                  </span>
                </div>
                <span className="text-[9px] text-on-surface-variant font-mono mt-2 block">
                  Converts {cottonSpot}¢/lb with USD/INR 85.50
                </span>
              </div>

              {/* Spreads */}
              <div className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                parityRatio > 1.25 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'
              }`}>
                <div>
                  <span className="text-[8px] font-mono font-bold uppercase tracking-wider text-outline block">Cotton-to-Polyester Spread</span>
                  <span className={`text-lg font-black font-mono block mt-1 ${
                    parityRatio > 1.25 ? 'text-error' : 'text-emerald-500'
                  }`}>
                    ₹{priceSpreadInr.toFixed(0)}/Kg
                  </span>
                </div>
                <span className={`text-[9px] font-mono mt-2 block ${
                  parityRatio > 1.25 ? 'text-error font-bold' : 'text-emerald-500 font-bold'
                }`}>
                  Ratio Parity: {parityRatio.toFixed(2)}x
                </span>
              </div>
            </div>

            {/* Substitution Alert Box */}
            <div className={`border rounded-xl p-4 mt-4 text-xs font-mono space-y-1.5 ${substitutionAlert.color}`}>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-base">warning</span>
                <span>{substitutionAlert.level}</span>
              </div>
              <p className="text-on-surface leading-relaxed text-[11px]">{substitutionAlert.desc}</p>
              <p className="font-bold text-[10px] uppercase opacity-90">{substitutionAlert.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalMarketDesk;
