// src/components/GlobalMarketDesk.jsx
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

export function GlobalMarketDesk({ globalCotton, yarns, usdInr, colors }) {
  // Interactive Blending & Substitution Calculator State
  const [crudeOil, setCrudeOil] = useState(95.00); // USD/bbl (June 5, 2026 Spot)
  const [cottonSpot, setCottonSpot] = useState(() => globalCotton?.prices?.types?.[0]?.current || 87.92); // cents/lb
  const [simulatedInr, setSimulatedInr] = useState(() => usdInr || 85.50); // USD/INR Rate

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
  // PSF price is strongly correlated with PTA/MEG (PTA represents ~85% of composition)
  const estimatedPsfUSD = (estimatedPta * 0.86 + estimatedMeg * 0.34) / 1000 * 1.15; // USD/kg
  const estimatedPsfInr = estimatedPsfUSD * simulatedInr; // INR/kg
  
  // Cotton price conversions
  const cottonUSDPerKg = (cottonSpot * 2.20462) / 100; // USD/kg
  const cottonInrPerKg = cottonUSDPerKg * simulatedInr; // INR/kg

  // Blending & Substitution metrics
  const priceSpreadInr = cottonInrPerKg - estimatedPsfInr;
  const parityRatio = cottonInrPerKg / estimatedPsfInr;

  // Mock historical correlation data for Brent, Cotlook A, and Polyester PSF (cents/lb equivalent)
  const correlationData = [
    { month: 'Jul 25', Brent: 78.5, CotlookA: globalCotton?.prices?.monthlyTrend?.[0]?.AIndex || 91.8, PolyesterPSF: 52.0 },
    { month: 'Aug 25', Brent: 82.1, CotlookA: globalCotton?.prices?.monthlyTrend?.[1]?.AIndex || 93.2, PolyesterPSF: 53.5 },
    { month: 'Sep 25', Brent: 84.8, CotlookA: globalCotton?.prices?.monthlyTrend?.[2]?.AIndex || 94.0, PolyesterPSF: 54.8 },
    { month: 'Oct 25', Brent: 81.2, CotlookA: globalCotton?.prices?.monthlyTrend?.[3]?.AIndex || 92.5, PolyesterPSF: 52.9 },
    { month: 'Nov 25', Brent: 79.5, CotlookA: globalCotton?.prices?.monthlyTrend?.[4]?.AIndex || 91.0, PolyesterPSF: 51.5 },
    { month: 'Dec 25', Brent: 77.0, CotlookA: globalCotton?.prices?.monthlyTrend?.[5]?.AIndex || 89.5, PolyesterPSF: 50.2 },
    { month: 'Jan 26', Brent: 80.4, CotlookA: globalCotton?.prices?.monthlyTrend?.[6]?.AIndex || 91.2, PolyesterPSF: 52.1 },
    { month: 'Feb 26', Brent: 82.8, CotlookA: globalCotton?.prices?.monthlyTrend?.[7]?.AIndex || 92.5, PolyesterPSF: 53.4 },
    { month: 'Mar 26', Brent: 85.2, CotlookA: globalCotton?.prices?.monthlyTrend?.[8]?.AIndex || 94.0, PolyesterPSF: 54.9 },
    { month: 'Apr 26', Brent: 88.0, CotlookA: globalCotton?.prices?.monthlyTrend?.[9]?.AIndex || 90.2, PolyesterPSF: 56.5 },
    { month: 'May 26', Brent: 86.5, CotlookA: globalCotton?.prices?.monthlyTrend?.[10]?.AIndex || 88.5, PolyesterPSF: 55.8 },
    { month: 'Jun 26', Brent: crudeOil, CotlookA: cottonSpot, PolyesterPSF: parseFloat((estimatedPsfUSD * 100 / 2.20462).toFixed(2)) }
  ];
  // Mock WTI and Brent Crude historical prices (USD/bbl)
  const oilTrendData = [
    { month: 'Jul 25', Brent: 78.5, WTI: 74.2 },
    { month: 'Aug 25', Brent: 82.1, WTI: 77.8 },
    { month: 'Sep 25', Brent: 84.8, WTI: 80.5 },
    { month: 'Oct 25', Brent: 81.2, WTI: 76.9 },
    { month: 'Nov 25', Brent: 79.5, WTI: 75.3 },
    { month: 'Dec 25', Brent: 77.0, WTI: 73.1 },
    { month: 'Jan 26', Brent: 80.4, WTI: 76.2 },
    { month: 'Feb 26', Brent: 82.8, WTI: 78.5 },
    { month: 'Mar 26', Brent: 85.2, WTI: 81.0 },
    { month: 'Apr 26', Brent: 88.0, WTI: 83.6 },
    { month: 'May 26', Brent: 86.5, WTI: 82.1 },
    { month: 'Jun 26', Brent: crudeOil, WTI: crudeOil * 0.96 } // Dynamically updates with simulated price slider
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

          {/* Crude Oil Price Benchmark Trend (Brent vs. WTI) */}
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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
                  <Line type="monotone" dataKey="Brent" name="Brent Crude" stroke="#EC4899" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line type="monotone" dataKey="WTI" name="WTI Crude" stroke="#F59E0B" strokeWidth={2} dot={{ r: 2 }} activeDot={{ r: 4 }} />
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
                  <span className="font-bold text-primary uppercase block">Why Prices Moved Up:</span>
                  OPEC+ extended its voluntary 2.2M bpd supply cuts through Q2-Q3 2026. This, coupled with Middle East shipping reroutes (Bab al-Mandab/Red Sea detour via Africa) has locked up massive volumes of waterborne crude in transit, raising spot premiums.
                </div>
                <div>
                  <span className="font-bold text-tertiary uppercase block">Next 2-Month (July/August) Outlook:</span>
                  Brent is projected to trade firm between **$93 - $98/bbl** on peak summer gasoline demand and Northern Hemisphere refinery runs. The start of the Atlantic hurricane season represents a key supply threat. Expect PTA/MEG precursor pricing to stay elevated, supporting firm Polyester PSF rates.
                </div>
              </div>
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

      {/* USD/INR Exchange Rate & Domestic Spinning Parity Matrix */}
      <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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
                    <span className="font-black text-primary">85.50</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">Yday:</span>
                    <span className="font-semibold text-on-surface">85.42</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">7D Ago:</span>
                    <span className="font-semibold text-on-surface">85.15</span>
                  </div>
                </div>
              </div>

              {/* Month-Wise */}
              <div className="bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/15 font-mono text-[10px]">
                <span className="font-bold text-outline uppercase block mb-1">Month-Wise</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">Jun 26:</span>
                    <span className="font-black text-primary">85.50</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">May 26:</span>
                    <span className="font-semibold text-on-surface">84.90</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">Apr 26:</span>
                    <span className="font-semibold text-on-surface">84.45</span>
                  </div>
                </div>
              </div>

              {/* Year-Wise */}
              <div className="bg-surface-container-low/40 p-3 rounded-lg border border-outline-variant/15 font-mono text-[10px]">
                <span className="font-bold text-outline uppercase block mb-1">Year-Wise</span>
                <div className="space-y-1.5">
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">FY26 (E):</span>
                    <span className="font-black text-primary">85.50</span>
                  </div>
                  <div className="flex justify-between border-b border-outline-variant/5 pb-1">
                    <span className="text-on-surface-variant">FY25 (A):</span>
                    <span className="font-semibold text-on-surface">83.82</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-on-surface-variant">FY24 (A):</span>
                    <span className="font-semibold text-on-surface">82.79</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-primary-container/10 border border-primary-container/20 rounded-xl text-[10px] font-mono leading-relaxed text-on-surface-variant">
              <span className="font-bold text-primary uppercase block mb-1">Currency Summary:</span>
              The Indian Rupee has depreciated by **2.0% YoY** against the USD. Over a 3-year horizon, the currency moved from 
              **80.39 to 85.50 (+6.3%)**, restructuring raw material import premiums and enhancing export pricing power.
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
                  min="80.00"
                  max="90.00"
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
              simulatedInr > 86 ? 'bg-red-500/10 border-red-500/20 text-red-500' : 
              simulatedInr < 83 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
              'bg-primary/10 border-primary/20 text-primary'
            }`}>
              {simulatedInr > 86 ? '⚠️ CRITICAL IMPORT SQUEEZE' :
               simulatedInr < 83 ? '✅ OPTIMAL IMPORT / NEUTRAL EXPORT' :
               '⚖️ EXPORT ADVANTAGE / IMPORT SURCHARGE'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GlobalMarketDesk;
