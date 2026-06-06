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
    { month: 'Jan 26', Brent: 63.65, WTI: 56.01 }, // Jan Average Brent: 63.65, WTI Spot: 56.01
    { month: 'Feb 26', Brent: 75.80, WTI: 70.20 },
    { month: 'Mar 26', Brent: 118.50, WTI: 102.40 },
    { month: 'Apr 26', Brent: 138.21, WTI: 114.58 }, // YTD High Apr 7 Brent $138.21, WTI $114.58
    { month: 'May 26', Brent: 100.43, WTI: 95.20 }, // May Average Brent $100.43
    { month: 'Jun 26', Brent: crudeOil, WTI: crudeOil === 94.98 ? 92.16 : crudeOil * 0.96 } // June 1 Brent: $94.98, WTI: $92.16
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
        {/* Geopolitical & Shipping Risk Table & Supply/Demand Chart */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low text-xs font-mono space-y-4">
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
                  <YAxis yAxisId="left" fontSize={9} stroke="#EC4899" tickFormatter={(v) => `$${v}`} />
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
                  <Line yAxisId="left" type="monotone" dataKey="Brent" name="Brent Crude ($/bbl)" stroke="#EC4899" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="PolySupply" name="Polyester PSF Supply Index" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="CottonDemand" name="Cotton Demand Index (Substitution)" stroke="#10B981" strokeWidth={2.5} dot={{ r: 2 }} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="p-3 bg-surface-container-low/60 rounded-lg border border-outline-variant/10 text-[10px] text-on-surface-variant space-y-2 leading-relaxed">
              <div>
                <span className="font-bold text-primary uppercase block">1. Crude Oil Surge & Polyester Supply Deficit:</span>
                Spiking crude increases feedstock costs. Polyester margin squeeze forces producers to cut capacity utilization (simulated capacity: <span className="font-bold text-blue-500">{simulatedPolySupply.toFixed(1)}%</span>).
              </div>
              <div>
                <span className="font-bold text-emerald-500 uppercase block">2. Cotton Substitution Demand Gain:</span>
                As polyester fiber rates soar, spinning mills increase cotton blend ratios, pushing natural cotton demand index higher (simulated index: <span className="font-bold text-emerald-500">{simulatedCottonDemand.toFixed(1)}%</span>).
              </div>
            </div>
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
          <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low text-xs font-mono space-y-4">
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
      <div className="glass-card border border-outline-variant/30 rounded-xxl p-5 bg-surface-container-low">
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
    </div>
  );
}

export default GlobalMarketDesk;
