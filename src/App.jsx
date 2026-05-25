function PresentationDashboard({ data, darkMode, colors }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [selectedCalcCount, setSelectedCalcCount] = useState('40s Combed');

  const totalSlides = 6;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const spreadData = {
    '30s Carded': {
      rawCotton: '56,000',
      waste: 12,
      cleanCotton: 184,
      conversion: 85,
      totalCost: 269,
      yarnPrice: 282,
      spread: 13
    },
    '40s Combed': {
      rawCotton: '56,000',
      waste: 18,
      cleanCotton: 198,
      conversion: 95,
      totalCost: 293,
      yarnPrice: 315,
      spread: 22
    },
    '60s Combed': {
      rawCotton: '58,500',
      waste: 20,
      cleanCotton: 212,
      conversion: 120,
      totalCost: 332,
      yarnPrice: 358,
      spread: 26
    },
    '80s Combed': {
      rawCotton: '65,000',
      waste: 22,
      cleanCotton: 242,
      conversion: 160,
      totalCost: 402,
      yarnPrice: 408,
      spread: 6
    }
  };

  const stateProdData = data.indianCotton.stateProduction || [];

  return (
    <div className="space-y-gutter">
      {/* Slide 1: Cover Slide */}
      <div className="relative h-[320px] rounded-xxl overflow-hidden flex items-center justify-center p-8 bg-cover bg-center neumorphic-raised" style={{ backgroundImage: 'url(/basml-cotton-yarn-dashboard/basml_cotton_cover.png)' }}>
        <div className="absolute inset-0 bg-primary-container/85 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 text-center space-y-4 max-w-2xl px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-on-primary-container text-xs font-mono font-bold uppercase tracking-wider">
            <svg className="w-4 h-4 fill-primary" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 25 C40 10 20 20 30 40 C15 45 20 65 35 60 C40 75 60 75 65 60 C80 65 85 45 70 40 C80 20 60 10 50 25 Z" />
              <path d="M50 55 L50 85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
            BASML Group
          </div>
          <h1 className="text-3xl md:text-4xl font-headline font-black text-on-primary-container tracking-tight leading-none uppercase">
            Cotton & Yarn Market Analysis
          </h1>
          <p className="text-xs font-sans font-medium text-on-primary-container/80 max-w-md mx-auto">
            Strategic Procurement, Price Forecasts & Infrastructure Initiatives
          </p>
          <div className="border-t border-on-primary-container/20 pt-4 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[9px] font-mono font-bold text-on-primary-container/70">
            <span>PREPARED FOR: BOARD OF DIRECTORS</span>
            <span>FOCUS: INDIA & TAMIL NADU YARN MARKETS</span>
            <span>WWW.BASMLCOTTON.COM</span>
          </div>
        </div>
      </div>

      {/* Slide 2: Cotton Prices & Quality */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h2 className="text-lg font-headline font-bold text-primary">1. Cotton Variety Spot Prices</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">Consensus Valuation</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Slide 1 / 5</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
          <div className="overflow-x-auto border border-outline-variant/30 rounded-xl max-h-[300px]">
            <table>
              <thead>
                <tr className="bg-surface-container-low text-[10px] text-outline font-bold">
                  <th>Variety & Staple</th>
                  <th className="text-right">Current Price</th>
                  <th className="text-right">Forecast Price</th>
                  <th className="text-right">Change %</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-outline-variant/10">
                {data.indianCotton.prices.types.map((p, i) => (
                  <tr key={i} className="hover:bg-surface-container-high/30">
                    <td className="py-3">
                      <strong className="text-on-surface flex items-center gap-1.5 flex-wrap">
                        {p.type}
                        <FreshnessBadge type={p.type} />
                      </strong>
                      <br />
                      <span className="text-[10px] text-on-surface-variant">Quality: {p.staple}</span>
                    </td>
                    <td className="text-right font-bold py-3">₹{formatPrice(p.current, true).split('.')[0]} / Candy</td>
                    <td className="text-right font-bold table-highlight-text py-3">₹{formatPrice(p.est, true).split('.')[0]} / Candy</td>
                    <td className="text-right font-bold table-highlight-text py-3">
                      +{(((p.est - p.current) / p.current) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-surface-container-high/50 font-bold">
                  <td className="py-3"><strong>Consensus Spot Average</strong></td>
                  <td className="text-right py-3">₹67,050 / Candy</td>
                  <td className="text-right table-highlight-text py-3">₹69,350 / Candy</td>
                  <td className="text-right table-highlight-text py-3">+3.43%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-cover bg-center h-full min-h-[180px] md:min-h-0" style={{ backgroundImage: 'url(/basml-cotton-yarn-dashboard/cotton_spinning_spindles.png)' }}></div>
        </div>
      </div>

      {/* Slide 3: 5-Year Global Balance Sheet */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h2 className="text-lg font-headline font-bold text-primary">2. Global Cotton Balance Sheet</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">5-Year Trend (Million Bales)</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Slide 2 / 5</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
          <div className="overflow-x-auto border border-outline-variant/30 rounded-xl max-h-[300px]">
            <table>
              <thead>
                <tr className="bg-surface-container-low text-[10px] text-outline font-bold">
                  <th>Crop Year</th>
                  <th className="text-right">Supply</th>
                  <th className="text-right">Production</th>
                  <th className="text-right">Demand</th>
                  <th className="text-right">Ending Stocks</th>
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-outline-variant/10">
                {data.globalCotton.balanceSheet.historical.map((row, i) => (
                  <tr key={i} className="hover:bg-surface-container-high/30">
                    <td className="font-bold text-on-surface py-3">{row.year}</td>
                    <td className="text-right py-3">{row.supply} M</td>
                    <td className="text-right py-3">{row.production} M</td>
                    <td className="text-right font-bold text-on-surface py-3">{row.demand} M</td>
                    <td className="text-right font-bold table-highlight-text py-3">{row.endingStocks} M</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border border-outline-variant/30 rounded-xl p-4 h-full min-h-[180px] md:min-h-0 bg-surface-container-lowest">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={data.globalCotton.balanceSheet.historical} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" fontSize={9} />
                <YAxis fontSize={9} />
                <Tooltip
                  wrapperStyle={{ zIndex: 1000 }}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-container-high)',
                    borderColor: 'var(--color-outline-variant)',
                    borderRadius: '8px',
                    color: 'var(--color-on-surface)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                <Bar dataKey="supply" fill={colors.primary} name="Supply" barSize={28} radius={[2, 2, 0, 0]} />
                <Bar dataKey="demand" fill={colors.primaryContainer} name="Demand" barSize={28} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Slide 4: Indian Regional Harvest Output */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h2 className="text-lg font-headline font-bold text-primary">3. Indian Regional Harvest Output</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">State-wise Raw Cotton (Lakh Bales)</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Slide 3 / 5</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
          <div className="border border-outline-variant/30 rounded-xl p-4 h-full min-h-[180px] md:min-h-0 bg-surface-container-lowest">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={stateProdData.slice(0, 6)} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" fontSize={9} />
                <YAxis dataKey="state" type="category" fontSize={9} width={75} />
                <Tooltip
                  wrapperStyle={{ zIndex: 1000 }}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-container-high)',
                    borderColor: 'var(--color-outline-variant)',
                    borderRadius: '8px',
                    color: 'var(--color-on-surface)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                />
                <Bar dataKey="production" name="Production (Lakh Bales)" barSize={24} radius={[0, 2, 2, 0]}>
                   {stateProdData.slice(0, 6).map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                   ))}
                 </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="p-5 bg-surface-container border border-outline-variant/30 rounded-xl space-y-4">
              <h4 className="text-sm font-headline font-bold text-primary flex items-center gap-1.5">
                <span className="material-symbols-outlined text-lg">local_shipping</span>
                Supply Chain Briefing
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                India's net crop yield estimates converged to <strong className="text-on-surface">290.91 Lakh Bales</strong>, with Gujarat and Maharashtra remaining dominant harvesting states.
              </p>
              <div className="bg-primary-container/20 border border-primary/20 p-3 rounded-lg text-xs font-mono font-bold text-primary flex items-center gap-2">
                <span className="text-base">🌾</span>
                <span>Ginning Outturn (GOT) levels average 34-36% across Central and Southern clusters.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 5: Spinners' Margin Calculator */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h2 className="text-lg font-headline font-bold text-primary">4. Spinners' Margin Calculator</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">Yarn Spreads & Profitability</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Slide 4 / 5</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              {['30s Carded', '40s Combed', '60s Combed', '80s Combed'].map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCalcCount(count)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold border transition-colors ${
                    selectedCalcCount === count
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container text-on-surface border-outline-variant/30 hover:bg-surface-container-high'
                  }`}
                >
                  {count.split(' ')[0]}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto border border-outline-variant/30 rounded-xl">
              <table className="text-xs">
                <tbody>
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-2.5 px-4 text-on-surface-variant">Raw Cotton Cost:</td>
                    <td className="py-2.5 px-4 text-right font-bold text-on-surface">₹{spreadData[selectedCalcCount].rawCotton} / Candy</td>
                  </tr>
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-2.5 px-4 text-on-surface-variant">Clean Cotton Cost:</td>
                    <td className="py-2.5 px-4 text-right font-bold text-on-surface">₹{spreadData[selectedCalcCount].cleanCotton} / Kg</td>
                  </tr>
                  <tr className="border-b border-outline-variant/10">
                    <td className="py-2.5 px-4 text-on-surface-variant">Mill Conversion Cost:</td>
                    <td className="py-2.5 px-4 text-right font-bold text-on-surface">₹{spreadData[selectedCalcCount].conversion} / Kg</td>
                  </tr>
                  <tr className="bg-surface-container-high/50 font-bold">
                    <td className="py-2.5 px-4 table-highlight-text">Yarn Price / Net Spread:</td>
                    <td className="py-2.5 px-4 text-right table-highlight-text">
                      ₹{spreadData[selectedCalcCount].yarnPrice} / kg (Spread: ₹{spreadData[selectedCalcCount].spread}/kg)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col justify-center h-full">
            <div className="p-5 bg-surface-container border border-outline-variant/30 rounded-xl flex flex-col justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-on-surface-variant block uppercase tracking-wider">Margin Health Status</span>
                <div className={`text-2xl font-black font-headline mt-1 ${spreadData[selectedCalcCount].spread > 10 ? 'text-primary' : 'text-tertiary'}`}>
                  ₹{spreadData[selectedCalcCount].spread} / Kg Net Yield
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                {spreadData[selectedCalcCount].spread > 10 
                  ? 'Healthy operating margins. The yarn spot price exceeds standard raw-to-lint procurement thresholds and conversion overheads.'
                  : 'Compressed spinner spread. Power and raw cotton price parity indicate margin pressure for small mills.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slide 6: Actionable Margin & Growth Roadmap */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
        <div className="flex justify-between items-center border-b border-outline-variant pb-3">
          <div>
            <h2 className="text-lg font-headline font-bold text-primary">5. Actionable Growth Roadmap</h2>
            <p className="text-xs text-on-surface-variant font-mono mt-0.5">Strategic Milestones</p>
          </div>
          <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-primary/10 text-primary">Slide 5 / 5</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 mt-6">
          <div className="bg-surface-container border border-outline-variant/30 p-5 rounded-xl flex flex-col justify-between h-full min-h-[160px] md:min-h-0">
            <div>
              <h4 className="text-xs font-mono font-bold text-primary mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">domain</span>
                PM MITRA Textile Park (Virudhunagar)
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                Operating inside the integrated park cuts external logistics costs by 12% and links spinners directly with downstream weavers.
              </p>
            </div>
            <div className="bg-primary/10 border border-primary/20 px-3 py-2 rounded-lg text-xs font-mono font-bold text-primary mt-4">
              📈 Expected Margin Yield: +3.0% Net EBITDA
            </div>
          </div>
          
          <div className="bg-surface-container border border-outline-variant/30 p-5 rounded-xl flex flex-col justify-between h-full min-h-[160px] md:min-h-0">
            <div>
              <h4 className="text-xs font-mono font-bold text-tertiary mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-base">bolt</span>
                Green Energy Corridor Grid Subsidies
              </h4>
              <p className="text-xs text-on-surface-variant leading-relaxed font-medium">
                Wheel captive wind/solar power directly to spinning sites, dropping tariffs from ₹7.5/unit to ₹4.5/unit.
              </p>
            </div>
            <div className="bg-tertiary/10 border border-tertiary/20 px-3 py-2 rounded-lg text-xs font-mono font-bold text-tertiary mt-4">
              ⚡ Expected Cost Saving: ₹3.0 / Power Unit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import HomeStitch from './HomeStitch';
import YarnAnalysisStitch from './YarnAnalysisStitch';
import QualityExpressionStitch from './QualityExpressionStitch';
import React, { useState, useEffect } from 'react';
import { initialData, generateUpdatedData } from './data';
import { cottonAnalysis, yarnAnalysis, globalIncidents, strategicGrowth } from './analysisData';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { 
  Globe, Activity, Cpu, ShieldCheck, TrendingUp, AlertCircle, 
  Building2, Leaf, ExternalLink, Sun, Moon, Menu, X, Settings, Bell, HelpCircle, LogOut 
} from 'lucide-react';
import LiveNews from './components/LiveNews';
import YarnQualityDashboard from './components/YarnQualityDashboard';

const formatPrice = (val, isINR = false) => {
  if (val == null) return '';
  const num = parseFloat(val);
  if (isINR) {
    return num.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
};

const isLivePrice = (typeName) => {
  const name = typeName.toLowerCase();
  return name.includes('ice') || name.includes('exchange rate') || name.includes('usd/inr');
};

const FreshnessBadge = ({ type }) => {
  const live = isLivePrice(type);
  return (
    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ml-1.5 border shrink-0 ${
      live 
        ? 'bg-forest-green/20 text-forest-green border-forest-green/30' 
        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    }`}>
      <span className={`w-1 h-1 rounded-full ${live ? 'bg-forest-green animate-pulse' : 'bg-amber-500'}`}></span>
      {live ? 'Live API' : 'Simulated'}
    </span>
  );
};

function CottonVarietyExplorer({ mode, data, colors }) {
  const isGlobal = mode === 'global';
  
  const globalVarieties = {
    'US Upland': {
      key: 'US_Upland',
      typeMatch: 'US Upland',
      staple: '1-1/8" (26.98 mm)',
      mic: '4.2 NCL',
      strength: '29.5 g/tex',
      trash: '0.35%',
      moisture: '7.2%',
      origin: 'USA (Texas, Mid-South)',
      score: 88,
      historyKey: 'US',
      dayForecast: [
        { day: 'Day 1', price: 84.50 },
        { day: 'Day 2', price: 84.80 },
        { day: 'Day 3', price: 84.20 },
        { day: 'Day 4', price: 85.10 },
        { day: 'Day 5', price: 85.60 },
        { day: 'Day 6', price: 85.90 },
        { day: 'Day 7', price: 86.00 }
      ],
      buyTarget: 83.50,
      holdLine: 86.50,
      sourcing: [
        { month: 'Jun 26', volume: '5,000', price: 84.50, hedging: '60%' },
        { month: 'Jul 26', volume: '6,000', price: 85.20, hedging: '65%' },
        { month: 'Aug 26', volume: '4,500', price: 86.00, hedging: '70%' }
      ]
    },
    'West African': {
      key: 'West_African',
      typeMatch: 'West African',
      staple: '1-3/32" (27.78 mm)',
      mic: '4.0 NCL',
      strength: '28.5 g/tex',
      trash: '0.45%',
      moisture: '7.8%',
      origin: 'West Africa (Mali/Benin)',
      score: 89,
      dayForecast: [
        { day: 'Day 1', price: 89.00 },
        { day: 'Day 2', price: 89.30 },
        { day: 'Day 3', price: 88.80 },
        { day: 'Day 4', price: 89.50 },
        { day: 'Day 5', price: 90.20 },
        { day: 'Day 6', price: 90.70 },
        { day: 'Day 7', price: 91.00 }
      ],
      buyTarget: 88.00,
      holdLine: 91.50,
      sourcing: [
        { month: 'Jun 26', volume: '3,000', price: 89.00, hedging: '55%' },
        { month: 'Jul 26', volume: '3,500', price: 90.00, hedging: '60%' },
        { month: 'Aug 26', volume: '2,500', price: 91.00, hedging: '65%' }
      ]
    },
    'US Pima': {
      key: 'US_Pima',
      typeMatch: 'Supima',
      staple: '1-7/16" (36.5 mm)',
      mic: '3.8 NCL',
      strength: '40.2 g/tex',
      trash: '0.15%',
      moisture: '6.8%',
      origin: 'USA (California, Arizona)',
      score: 96,
      dayForecast: [
        { day: 'Day 1', price: 175.00 },
        { day: 'Day 2', price: 175.50 },
        { day: 'Day 3', price: 174.00 },
        { day: 'Day 4', price: 176.00 },
        { day: 'Day 5', price: 178.00 },
        { day: 'Day 6', price: 179.00 },
        { day: 'Day 7', price: 180.00 }
      ],
      buyTarget: 173.00,
      holdLine: 181.00,
      sourcing: [
        { month: 'Jun 26', volume: '1,500', price: 175.00, hedging: '50%' },
        { month: 'Jul 26', volume: '1,800', price: 177.00, hedging: '55%' },
        { month: 'Aug 26', volume: '1,200', price: 180.00, hedging: '60%' }
      ]
    },
    'Egyptian Giza': {
      key: 'Egyptian_Giza',
      typeMatch: 'Egyptian Giza',
      staple: '1-1/2" (38.1 mm)',
      mic: '3.5 NCL',
      strength: '44.0 g/tex',
      trash: '0.18%',
      moisture: '6.5%',
      origin: 'Egypt (Nile Delta)',
      score: 98,
      dayForecast: [
        { day: 'Day 1', price: 230.00 },
        { day: 'Day 2', price: 230.80 },
        { day: 'Day 3', price: 228.50 },
        { day: 'Day 4', price: 231.50 },
        { day: 'Day 5', price: 233.00 },
        { day: 'Day 6', price: 234.20 },
        { day: 'Day 7', price: 235.00 }
      ],
      buyTarget: 227.00,
      holdLine: 236.00,
      sourcing: [
        { month: 'Jun 26', volume: '1,000', price: 230.00, hedging: '45%' },
        { month: 'Jul 26', volume: '1,200', price: 232.50, hedging: '50%' },
        { month: 'Aug 26', volume: '800', price: 235.00, hedging: '55%' }
      ]
    },
    'Brazil Cerrado': {
      key: 'Brazil_Cerrado',
      typeMatch: 'Brazil ESALQ',
      staple: '1-1/8" (28.5 mm)',
      mic: '4.0 NCL',
      strength: '30.0 g/tex',
      trash: '0.40%',
      moisture: '7.5%',
      origin: 'Brazil (Mato Grosso)',
      score: 87,
      historyKey: 'Brazil',
      dayForecast: [
        { day: 'Day 1', price: 80.00 },
        { day: 'Day 2', price: 80.20 },
        { day: 'Day 3', price: 79.50 },
        { day: 'Day 4', price: 80.80 },
        { day: 'Day 5', price: 81.10 },
        { day: 'Day 6', price: 81.40 },
        { day: 'Day 7', price: 81.50 }
      ],
      buyTarget: 79.00,
      holdLine: 82.00,
      sourcing: [
        { month: 'Jun 26', volume: '8,000', price: 80.00, hedging: '70%' },
        { month: 'Jul 26', volume: '9,000', price: 80.80, hedging: '75%' },
        { month: 'Aug 26', volume: '7,500', price: 81.50, hedging: '80%' }
      ]
    }
  };

  const indianVarieties = {
    'Shankar-6 (S-6)': {
      key: 'Shankar_6',
      typeMatch: 'Shankar-6',
      staple: '29-31mm',
      mic: '3.8-4.2 NCL',
      strength: '28.5 g/tex',
      trash: '1.80%',
      moisture: '8.5%',
      origin: 'Gujarat',
      score: 92,
      historyKey: 'Shankar6',
      dayForecast: [
        { day: 'Day 1', price: 65100 },
        { day: 'Day 2', price: 65300 },
        { day: 'Day 3', price: 64900 },
        { day: 'Day 4', price: 65400 },
        { day: 'Day 5', price: 65800 },
        { day: 'Day 6', price: 65950 },
        { day: 'Day 7', price: 66000 }
      ],
      buyTarget: 64500,
      holdLine: 66500,
      sourcing: [
        { month: 'Jun 26', volume: '12,000', price: 65100, hedging: '50%' },
        { month: 'Jul 26', volume: '15,000', price: 65500, hedging: '55%' },
        { month: 'Aug 26', volume: '10,000', price: 66000, hedging: '60%' }
      ]
    },
    'MCU-5': {
      key: 'MCU_5',
      typeMatch: 'MCU-5',
      staple: '31-33mm',
      mic: '3.6-4.0 NCL',
      strength: '32.0 g/tex',
      trash: '1.50%',
      moisture: '8.0%',
      origin: 'Tamil Nadu / Andhra Pradesh',
      score: 94,
      historyKey: 'MCU5',
      dayForecast: [
        { day: 'Day 1', price: 70000 },
        { day: 'Day 2', price: 70200 },
        { day: 'Day 3', price: 69500 },
        { day: 'Day 4', price: 70400 },
        { day: 'Day 5', price: 70800 },
        { day: 'Day 6', price: 70950 },
        { day: 'Day 7', price: 71000 }
      ],
      buyTarget: 69200,
      holdLine: 71500,
      sourcing: [
        { month: 'Jun 26', volume: '6,000', price: 70000, hedging: '45%' },
        { month: 'Jul 26', volume: '7,500', price: 70500, hedging: '50%' },
        { month: 'Aug 26', volume: '5,000', price: 71000, hedging: '55%' }
      ]
    },
    'DCH-32 / Suvin': {
      key: 'DCH_32',
      typeMatch: 'DCH-32',
      staple: '34-36mm',
      mic: '3.2-3.6 NCL',
      strength: '38.0 g/tex',
      trash: '1.20%',
      moisture: '7.8%',
      origin: 'Karnataka / Tamil Nadu',
      score: 97,
      dayForecast: [
        { day: 'Day 1', price: 88000 },
        { day: 'Day 2', price: 88300 },
        { day: 'Day 3', price: 87800 },
        { day: 'Day 4', price: 88500 },
        { day: 'Day 5', price: 88800 },
        { day: 'Day 6', price: 88950 },
        { day: 'Day 7', price: 89000 }
      ],
      buyTarget: 87500,
      holdLine: 89500,
      sourcing: [
        { month: 'Jun 26', volume: '2,000', price: 88000, hedging: '40%' },
        { month: 'Jul 26', volume: '2,500', price: 88500, hedging: '45%' },
        { month: 'Aug 26', volume: '1,500', price: 89000, hedging: '50%' }
      ]
    },
    'J-34': {
      key: 'J_34',
      typeMatch: 'J-34',
      staple: '25-27mm',
      mic: '4.0-4.5 NCL',
      strength: '26.0 g/tex',
      trash: '2.50%',
      moisture: '9.0%',
      origin: 'Rajasthan / Punjab',
      score: 82,
      historyKey: 'J34',
      dayForecast: [
        { day: 'Day 1', price: 62700 },
        { day: 'Day 2', price: 62900 },
        { day: 'Day 3', price: 62200 },
        { day: 'Day 4', price: 63100 },
        { day: 'Day 5', price: 63300 },
        { day: 'Day 6', price: 63450 },
        { day: 'Day 7', price: 63500 }
      ],
      buyTarget: 62000,
      holdLine: 63800,
      sourcing: [
        { month: 'Jun 26', volume: '10,000', price: 62700, hedging: '55%' },
        { month: 'Jul 26', volume: '12,000', price: 63100, hedging: '60%' },
        { month: 'Aug 26', volume: '8,000', price: 63500, hedging: '65%' }
      ]
    }
  };

  const list = isGlobal ? globalVarieties : indianVarieties;
  const [selectedName, setSelectedName] = useState(Object.keys(list)[0]);
  const [chartTab, setChartTab] = useState('history');
  
  const variety = list[selectedName];

  const currentPriceItem = data.prices?.types?.find(t => t.type.includes(variety.typeMatch));
  const currentVal = currentPriceItem ? currentPriceItem.current : (isGlobal ? 84.5 : 65100);
  const forecastVal = currentPriceItem ? currentPriceItem.est : (isGlobal ? 86.0 : 66000);

  const defaultCurrent = variety.dayForecast[0].price;
  const scaleFactor = currentVal / defaultCurrent;
  
  const scaledDayForecast = variety.dayForecast.map((df, index) => {
    const ratio = index / 6;
    const price = currentVal + (forecastVal - currentVal) * ratio;
    const scaledBuyTarget = variety.buyTarget * scaleFactor;
    const scaledHoldLine = variety.holdLine * scaleFactor;
    
    // Generate actual date label starting from today
    const d = new Date();
    d.setDate(d.getDate() + index);
    const dateLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    return {
      day: dateLabel,
      "Price Path": parseFloat(price.toFixed(isGlobal ? 2 : 0)),
      "Buy Target": parseFloat(scaledBuyTarget.toFixed(isGlobal ? 2 : 0)),
      "Hold Threshold": parseFloat(scaledHoldLine.toFixed(isGlobal ? 2 : 0)),
      zone: price <= scaledBuyTarget ? 'Buy' : (price >= scaledHoldLine ? 'Hold' : 'Neutral')
    };
  });

  const scaledSourcing = variety.sourcing.map((s, idx) => {
    const ratio = idx / 2;
    const price = currentVal + (forecastVal - currentVal) * ratio;
    const numPrice = parseFloat(price.toFixed(isGlobal ? 2 : 0));
    const numVolume = parseInt(s.volume.replace(/,/g, ''));
    
    let budgetStr = "";
    if (isGlobal) {
      const budgetVal = numVolume * numPrice * 4.80;
      budgetStr = "$" + Math.round(budgetVal).toLocaleString('en-US');
    } else {
      const budgetVal = (numVolume / 2.09188) * numPrice;
      budgetStr = "₹" + (budgetVal / 10000000).toFixed(2) + " Cr";
    }
    
    return {
      month: s.month,
      volume: s.volume,
      avgPrice: numPrice,
      budget: budgetStr,
      hedging: s.hedging
    };
  });

  const historyData = data.prices?.monthlyTrend?.map(t => {
    let price = 0;
    if (variety.historyKey && t[variety.historyKey] !== undefined) {
      price = t[variety.historyKey];
    } else if (variety.key === 'US_Pima') {
      const scale = (data.prices.types.find(x => x.type.includes('Supima'))?.current || 175) / (data.prices.types.find(x => x.type.includes('US Upland'))?.current || 84.5);
      price = parseFloat((t.US * scale).toFixed(2));
    } else if (variety.key === 'Egyptian_Giza') {
      const scale = (data.prices.types.find(x => x.type.includes('Giza'))?.current || 230) / (data.prices.types.find(x => x.type.includes('US Upland'))?.current || 84.5);
      price = parseFloat((t.US * scale).toFixed(2));
    } else if (variety.key === 'West_African') {
      const scale = (data.prices.types.find(x => x.type.includes('West African'))?.current || 89) / (data.prices.types.find(x => x.type.includes('US Upland'))?.current || 84.5);
      price = parseFloat((t.US * scale).toFixed(2));
    } else if (variety.key === 'DCH_32') {
      const scale = (data.prices.types.find(x => x.type.includes('DCH-32'))?.current || 88000) / (data.prices.types.find(x => x.type.includes('MCU-5'))?.current || 70000);
      price = Math.round(t.MCU5 * scale);
    }
    return { month: t.month, price };
  }) || [];

  // Technical calculations
  const histPrices = historyData.map(h => h.price);
  const count = histPrices.length || 1;
  const sma = histPrices.reduce((sum, p) => sum + p, 0) / count;
  const variance = histPrices.reduce((sum, p) => sum + Math.pow(p - sma, 2), 0) / count;
  const stdDev = Math.sqrt(variance) || 1;
  
  const upperBB = sma + 1.5 * stdDev;
  const lowerBB = sma - 1.5 * stdDev;
  
  let gains = 0;
  let losses = 0;
  for (let i = 1; i < histPrices.length; i++) {
    const diff = histPrices[i] - histPrices[i - 1];
    if (diff > 0) gains += diff;
    else losses += Math.abs(diff);
  }
  gains = gains || 1;
  losses = losses || 1;
  const rs = gains / losses;
  const rsi = parseFloat((100 - (100 / (1 + rs))).toFixed(1));
  
  const percentBB = (currentVal - lowerBB) / ((upperBB - lowerBB) || 1);
  let actionSignal = "NEUTRAL";
  let actionDesc = "Market is in balance. Maintain standard inventory levels.";
  let optimalCoverage = "45 Days";
  
  if (rsi > 65 || percentBB > 0.85) {
    actionSignal = "HOLD / SPOT COVER";
    actionDesc = "Market is technically overbought. Minimize forward bookings and cover immediate mill demand via spot purchases.";
    optimalCoverage = "15-30 Days";
  } else if (rsi < 40 || percentBB < 0.25) {
    actionSignal = "AGGRESSIVE BUY / HEDGE";
    actionDesc = "Prices are near key technical supports with low RSI. Front-load inventory cover and increase forward hedges.";
    optimalCoverage = "60-90 Days";
  }

  return (
    <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding mt-gutter relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-secondary/5 rounded-bl-full pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-outline-variant/20 pb-4">
        <div>
          <h3 className="text-lg font-headline font-bold text-primary flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">analytics</span>
            {isGlobal ? "Global Cotton Variety & Quality Explorer" : "Indian Cotton Variety & Quality Explorer"}
          </h3>
          <p className="text-xs text-on-surface-variant font-mono mt-1">
            Compare staple parameters, forecast targets, and procurement budgets using {isGlobal ? "USD" : "INR"} metrics.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-1.5 p-1 bg-surface-container-low rounded-xl border border-outline-variant/10">
          {Object.keys(list).map(name => (
            <button
              key={name}
              id={`variety-tab-${mode}-${list[name].key}`}
              onClick={() => setSelectedName(name)}
              className={`py-1 px-3 rounded-lg text-xs font-mono font-bold transition-all ${
                selectedName === name
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl">
            <div>
              <span className="text-[10px] text-outline font-mono uppercase block">Current Price</span>
              <strong className="text-base font-sans font-black text-on-surface block mt-1">
                {isGlobal ? `${currentVal.toFixed(2)} ¢/lb` : `₹${Math.round(currentVal).toLocaleString('en-IN')}`}
              </strong>
              <span className="text-[9px] text-outline font-mono block mt-0.5">Spot Avg basis</span>
            </div>
            <div className="border-l border-outline-variant/10 pl-4">
              <span className="text-[10px] text-outline font-mono uppercase block">1-Month Target</span>
              <strong className="text-base font-sans font-black text-primary block mt-1">
                {isGlobal ? `${forecastVal.toFixed(2)} ¢/lb` : `₹${Math.round(forecastVal).toLocaleString('en-IN')}`}
              </strong>
              <span className="text-[9px] text-outline font-mono block mt-0.5">Predicted Trend</span>
            </div>
          </div>

          {/* Technical Predictive Forecast Card */}
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider">Algorithmic Procurement Forecast</h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                ALGO-V1.0
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">14-Period RSI</span>
                <strong className={`font-sans text-sm block mt-0.5 ${rsi > 65 ? 'text-error' : rsi < 40 ? 'text-forest-green' : 'text-on-surface'}`}>{rsi}</strong>
                <span className="text-[9px] text-outline font-mono block mt-0.5">
                  {rsi > 65 ? 'Overbought' : rsi < 40 ? 'Oversold' : 'Neutral'}
                </span>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Bollinger Bands</span>
                <strong className="text-on-surface font-sans text-[11px] block mt-0.5">
                  {isGlobal ? `${lowerBB.toFixed(1)}-${upperBB.toFixed(1)}` : `${Math.round(lowerBB).toLocaleString('en-IN')}-${Math.round(upperBB).toLocaleString('en-IN')}`}
                </strong>
                <span className="text-[9px] text-outline font-mono block mt-0.5">Band Range</span>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Opt. Coverage</span>
                <strong className="text-primary font-sans text-sm block mt-0.5">{optimalCoverage}</strong>
                <span className="text-[9px] text-outline font-mono block mt-0.5">Inventory Target</span>
              </div>
            </div>
            
            <div className="p-3 bg-surface-container-low rounded-lg border border-outline-variant/10">
              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-outline">
                <span>PROCUREMENT ACTION SIGNAL</span>
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${actionSignal.includes('BUY') ? 'bg-forest-green/20 text-forest-green' : actionSignal.includes('HOLD') ? 'bg-error/20 text-error' : 'bg-primary/20 text-primary'}`}>
                  {actionSignal}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant leading-relaxed mt-1.5">
                {actionDesc}
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider">Quality Specifications</h4>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-primary/10 text-primary">
                Origin: {variety.origin.split(' ')[0]}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Staple Length</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.staple}</strong>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Micronaire (Mic)</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.mic}</strong>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Fiber Strength</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.strength}</strong>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Trash Content</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.trash}</strong>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Moisture Regain</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.moisture}</strong>
              </div>
              <div className="bg-surface-container-low/40 p-2.5 rounded-lg border border-outline-variant/15">
                <span className="text-[10px] text-outline font-mono block">Origin Region</span>
                <strong className="text-on-surface font-sans text-sm block mt-0.5">{variety.origin}</strong>
              </div>
            </div>
            
            <div className="space-y-1.5 pt-2 border-t border-outline-variant/10">
              <div className="flex justify-between text-[11px] font-mono font-bold">
                <span className="text-on-surface-variant">Uster Quality Score</span>
                <span className="text-primary">{variety.score}/100</span>
              </div>
              <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/10">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500 rounded-full" 
                  style={{ width: `${variety.score}%` }}
                />
              </div>
              <span className="text-[9px] text-outline font-mono block">
                {variety.score >= 95 ? '⭐ ELS / Premium Spinner Grade' : variety.score >= 90 ? '✅ Long Staple Comb Grade' : '👍 Standard Weaving Grade'}
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider">
                {chartTab === 'history' ? "6-Month Pricing Trend" : "7-Day Buy Zones & Targets"}
              </h4>
              
              <div className="flex gap-1 p-0.5 bg-surface-container-low rounded-lg border border-outline-variant/10">
                <button 
                  id={`chart-tab-${mode}-history`}
                  onClick={() => setChartTab('history')} 
                  className={`py-1 px-2.5 rounded text-[10px] font-mono font-bold transition-all ${
                    chartTab === 'history' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  6M History
                </button>
                <button 
                  id={`chart-tab-${mode}-forecast`}
                  onClick={() => setChartTab('forecast')} 
                  className={`py-1 px-2.5 rounded text-[10px] font-mono font-bold transition-all ${
                    chartTab === 'forecast' ? 'bg-primary text-on-primary shadow-xs' : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  7D Buy Zones
                </button>
              </div>
            </div>

            <div className="h-56 min-w-0">
              {chartTab === 'history' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData} margin={{ top: 10, right: 10, left: isGlobal ? -25 : 5, bottom: 0 }}>
                    <defs>
                      <linearGradient id={`colorPrice-${mode}-${variety.key}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={colors.primary} stopOpacity={0.35}/>
                        <stop offset="95%" stopColor={colors.primary} stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="month" fontSize={9} stroke="var(--color-outline)" />
                    <YAxis fontSize={9} stroke="var(--color-outline)" domain={['auto', 'auto']} />
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
                    <Area type="monotone" dataKey="price" stroke={colors.primary} strokeWidth={2} fillOpacity={1} fill={`url(#colorPrice-${mode}-${variety.key})`} name={isGlobal ? "Price (US ¢/lb)" : "Price (₹/Candy)"} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scaledDayForecast} margin={{ top: 10, right: 10, left: isGlobal ? -25 : 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                    <XAxis dataKey="day" fontSize={9} stroke="var(--color-outline)" />
                    <YAxis fontSize={9} stroke="var(--color-outline)" domain={['auto', 'auto']} />
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
                    <Line type="monotone" dataKey="Price Path" stroke={colors.primary} strokeWidth={2} dot={{ r: 3 }} name="Projected Price" />
                    <Line type="monotone" dataKey="Buy Target" stroke="#4CAF50" strokeDasharray="4 4" dot={false} strokeWidth={1.5} name="Max Buy Zone" />
                    <Line type="monotone" dataKey="Hold Threshold" stroke="#F44336" strokeDasharray="4 4" dot={false} strokeWidth={1.5} name="Hold Zone Limit" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4">
            <h4 className="text-xs font-mono font-bold text-outline uppercase tracking-wider mb-3">
              Procurement & Sourcing Forecast (Q3 2026)
            </h4>
            <div className="overflow-x-auto min-w-0">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-outline-variant/15 text-[10px] text-outline font-mono font-bold">
                    <th className="pb-2">Month</th>
                    <th className="pb-2 text-right">Target Volume</th>
                    <th className="pb-2 text-right">Proj. Price</th>
                    <th className="pb-2 text-right">Est. Budget</th>
                    <th className="pb-2 text-right">Hedge Ratio</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-outline-variant/10">
                  {scaledSourcing.map((s, idx) => (
                    <tr key={idx} className="hover:bg-surface-container-high/30">
                      <td className="py-2.5 font-bold text-on-surface">{s.month}</td>
                      <td className="py-2.5 text-right text-on-surface-variant font-mono">{s.volume} Bales</td>
                      <td className="py-2.5 text-right font-bold text-on-surface font-mono">
                        {isGlobal ? `${s.avgPrice} ¢/lb` : `₹${Math.round(s.avgPrice).toLocaleString('en-IN')}`}
                      </td>
                      <td className="py-2.5 text-right font-black text-primary font-mono">{s.budget}</td>
                      <td className="py-2.5 text-right text-on-surface-variant font-mono">
                        <span className="inline-flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-forest-green"></span>
                          {s.hedging}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [data, setData] = useState(() => generateUpdatedData(initialData));
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('syncing');
  const [activeTab, setActiveTab] = useState('global'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  const fetchRealData = async () => {
    try {
      console.log('Fetching live exchange rates and ICE cotton futures...');
      
      // 1. Fetch USD/INR exchange rate
      let usdInr = 85.50;
      let eurInr = 90.62;
      try {
        let response = await fetch('/api-exchangerate/v4/latest/USD');
        if (!response.ok) {
          response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        }
        if (response.ok) {
          const exchangeData = await response.json();
          if (exchangeData && exchangeData.rates) {
            if (exchangeData.rates.INR) usdInr = parseFloat(exchangeData.rates.INR.toFixed(2));
            if (exchangeData.rates.EUR) {
              eurInr = parseFloat((exchangeData.rates.INR / exchangeData.rates.EUR).toFixed(2));
            }
            console.log(`Live Rates Loaded: USD/INR = ${usdInr}, EUR/INR = ${eurInr}`);
          }
        }
      } catch (err) {
        console.warn('Failed to load live exchange rates, using default:', err);
      }

      // 2. Fetch ICE Cotton Price
      let iceCottonPrice = 84.50;
      try {
        let response = await fetch('/api-yahoo/v8/finance/chart/CT=F');
        if (!response.ok) {
          response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/CT=F');
        }
        if (response.ok) {
          const chartData = await response.json();
          if (chartData && chartData.chart && chartData.chart.result && chartData.chart.result[0]) {
            const meta = chartData.chart.result[0].meta;
            if (meta && meta.regularMarketPrice) {
              iceCottonPrice = parseFloat(meta.regularMarketPrice.toFixed(2));
              console.log(`Live ICE Cotton Price Loaded: ${iceCottonPrice} cents/lb`);
            }
          }
        }
      } catch (err) {
        console.warn('Failed to load live ICE cotton futures price, using default:', err);
      }

      // Sync fetched live values to the active data state
      setData(prevData => {
        const updated = JSON.parse(JSON.stringify(prevData));
        if (updated.exchangeRates) {
          updated.exchangeRates.usdInr = usdInr;
          updated.exchangeRates.eurInr = eurInr;
        }
        if (updated.globalCotton && updated.globalCotton.prices && updated.globalCotton.prices.types[1]) {
          updated.globalCotton.prices.types[1].current = iceCottonPrice;
          updated.globalCotton.prices.types[1].est = parseFloat((iceCottonPrice * 1.02).toFixed(2));
        }
        if (updated.indianCotton && updated.indianCotton.prices && updated.indianCotton.prices.types[6]) {
          const inrEquivalent = Math.floor(iceCottonPrice * 7.84 * usdInr);
          updated.indianCotton.prices.types[6].current = inrEquivalent;
          updated.indianCotton.prices.types[6].est = Math.floor(inrEquivalent * 1.02);
        }
        return updated;
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error during data fetch:', error);
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Load real-world source data on mount and refresh every 60s
  useEffect(() => {
    const runSync = async () => {
      setSyncStatus('syncing');
      await fetchRealData();
      
      // Simulate backend API worker sync for mandi arrivals & crop advance estimates
      setTimeout(() => {
        setData(prev => {
          const updated = JSON.parse(JSON.stringify(prev));
          // Randomize raw Kapas spot to simulate daily arrival averages
          const kapasMandiArrivalSpot = 65000 + Math.floor(Math.random() * 400) - 200;
          updated.indianCotton.prices.types[0].current = kapasMandiArrivalSpot;
          updated.indianCotton.prices.types[0].est = kapasMandiArrivalSpot + 900;
          
          // Align cotton yarn counts to raw material spot shifts
          updated.yarns.india.prices[1].current = 240 + Math.floor(Math.random() * 6); // 30s Carded
          updated.yarns.india.prices[2].current = 290 + Math.floor(Math.random() * 8); // 40s Combed
          
          return updated;
        });
        setSyncStatus('success');
        setLastUpdated(new Date());
      }, 1500);
    };

    runSync();
    const syncInterval = setInterval(runSync, 60 * 1000);
    return () => clearInterval(syncInterval);
  }, []);

  // Maintain local random-walk fluctuations every 30 seconds for live animations
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => generateUpdatedData(prevData));
      setLastUpdated(new Date());
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      const propEl = document.getElementById('floating-3d-props');
      if (propEl) {
        propEl.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  const themeColors = darkMode ? {
    primary: '#FB8C00',
    primaryContainer: '#E65100',
    secondary: '#FFA951',
    tertiary: '#BF360C',
    outline: '#938f99',
    outlineVariant: '#49454f',
    text: '#e6e1e9',
    background: '#141218',
    surface: '#141218',
    surfaceContainerLow: '#1d1b22',
    surfaceContainerHigh: '#2b2930',
    chartPalette: ['#BF360C', '#E65100', '#F57C00', '#FB8C00', '#FFA951', '#FDC591', '#FBE9E7']
  } : {
    primary: '#E65100',
    primaryContainer: '#FB8C00',
    secondary: '#FFA951',
    tertiary: '#BF360C',
    outline: '#7a7582',
    outlineVariant: '#cbc4d2',
    text: '#1d1b20',
    background: '#fdf7ff',
    surface: '#fdf7ff',
    surfaceContainerLow: '#f8f2fa',
    surfaceContainerHigh: '#ece6ee',
    chartPalette: ['#BF360C', '#E65100', '#F57C00', '#FB8C00', '#FFA951', '#FDC591', '#FBE9E7']
  };

  const navItems = [
    { id: 'global', label: 'Global Focus', icon: 'globe' },
    { id: 'india', label: 'India Focus', icon: 'map' },
    { id: 'yarn', label: 'Yarn Markets', icon: 'trending_up' },
    { id: 'news', label: 'Live News', icon: 'feed' },
    { id: 'analysis', label: 'Analysis', icon: 'analytics' },
    { id: 'presentation', label: 'Presentation Deck', icon: 'slideshow' },
    { id: 'quality', label: 'Yarn Quality', icon: 'biotech' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      {/* Sidebar Navigation - Desktop */}
      <aside className="sidebar-desktop hidden md:flex flex-col h-screen w-[240px] fixed left-0 top-0 glass-card border-r border-white/10 rounded-none py-6 px-4 z-50">
        <div className="px-2 mb-8 flex items-center justify-center">
          <img 
            src="/basml-cotton-yarn-dashboard/logo.png" 
            alt="BASML Logo" 
            className="w-12 h-12 object-contain rounded-lg border border-outline-variant/20 shadow-sm"
          />
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-150 ease-in-out font-medium text-sm ${
                activeTab === item.id
                  ? 'bg-primary text-on-primary font-semibold shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        {/* Footer Actions */}
        <div className="px-2 pb-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-full text-on-surface-variant hover:bg-surface-container-high rounded-xl flex items-center gap-3 p-3 transition-all text-left"
          >
            <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            <span className="font-label-lg text-label-lg">{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
          </button>
        </div>
      </aside>
      {/* Sidebar Navigation - Mobile (Drawer overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setSidebarOpen(false)}>
          <aside className="w-[240px] h-full glass-card border-r border-white/10 rounded-none py-6 px-4 flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center px-2 mb-8">
              <img 
                src="/basml-cotton-yarn-dashboard/logo.png" 
                alt="BASML Logo" 
                className="w-10 h-10 object-contain rounded-lg border border-outline-variant/20 shadow-sm"
              />
              <button onClick={() => setSidebarOpen(false)} className="text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <nav className="flex-1 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-150 ease-in-out font-medium text-sm ${
                    activeTab === item.id
                      ? 'bg-primary text-on-primary font-semibold'
                      : 'text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>
            <div className="pt-4 border-t border-outline-variant space-y-1">
              <button
                onClick={() => {
                  setDarkMode(!darkMode);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-high rounded-md transition-colors text-left"
              >
                <span className="material-symbols-outlined text-lg">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                <span>{darkMode ? 'Light Theme' : 'Dark Theme'}</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 md:ml-[240px] min-h-screen flex flex-col bg-background relative z-10">
        <header className="fixed top-0 right-0 left-0 md:left-[240px] h-16 z-40 bg-surface/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-6 border-b border-outline-variant/20">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden text-primary p-1 hover:bg-surface-container rounded-md">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <img 
              src="/basml-cotton-yarn-dashboard/logo.png" 
              alt="BASML Logo" 
              className="w-8 h-8 object-contain rounded-lg border border-outline-variant/20 shadow-sm animate-pulse"
            />
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-container/20 text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              Live AI Monitor
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex flex-col items-end text-right mr-2 select-none">
              <span className="text-[9px] font-mono font-bold text-on-surface-variant/70 uppercase tracking-widest">System Sync Status</span>
              <span className="text-xs font-mono font-medium text-primary">
                {lastUpdated.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST
              </span>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className="text-primary hover:bg-surface-container p-2 rounded-full transition-colors hidden sm:block">
              <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
        </header>

        {/* Sticky warning/status banner */}
        <div className={`fixed top-16 right-0 left-0 md:left-[240px] h-10 z-30 backdrop-blur-md border-b border-outline-variant/30 flex items-center justify-between px-4 md:px-6 text-[10px] md:text-xs font-mono transition-colors duration-500 ${
          syncStatus === 'syncing' 
            ? 'bg-primary/10 text-primary border-primary/20' 
            : 'bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500'
        }`}>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${syncStatus === 'syncing' ? 'bg-primary' : 'bg-amber-500'}`}></span>
            {syncStatus === 'syncing' ? (
              <span className="truncate">🔄 <strong>SYSTEM SYNCING:</strong> Pulling real-time exchange rates, futures, and crop databases in the background...</span>
            ) : (
              <span className="truncate">⚠️ <strong>DEMO / ANALYSIS MODE:</strong> Real-time exchange rates and ICE Cotton active. Mandi/Yarn counts are simulated (May 2026).</span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="hidden sm:inline opacity-70">Last Sync: {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST</span>
            <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
              syncStatus === 'syncing' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
            }`}>
              {syncStatus === 'syncing' ? 'SYNC IN PROGRESS' : 'SIMULATION ACTIVE'}
            </span>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="pt-28 px-4 md:px-6 pb-10 flex-1 max-w-[1600px] w-full relative z-10">
          {activeTab === 'global' && <GlobalDashboard data={data.globalCotton} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'india' && <IndiaDashboard data={data.indianCotton} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'yarn' && <YarnDashboard data={data.yarns} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'news' && <LiveNews exchangeRates={data.exchangeRates} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'analysis' && <AnalysisDashboard darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'presentation' && <PresentationDashboard data={data} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'quality' && <YarnQualityDashboard darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'sources' && <DataSourcesDashboard data={data} darkMode={darkMode} colors={themeColors} />}
        </div>

        {/* Footer */}
        <footer className="px-6 md:px-8 py-8 border-t border-outline-variant bg-surface-container-low text-on-surface-variant text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-mono font-semibold">© 2026 BASML.COTTON.YARN.ANALYSIS</p>
            <p className="opacity-70 mt-0.5">Confidential Industrial Intelligence - Internal Use Only</p>
          </div>
          <div className="flex gap-6 font-mono">
            <a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a>
            <a href="#" className="hover:text-primary transition-colors">System Health</a>
            <a href="#" className="hover:text-primary transition-colors">Support Portal</a>
          </div>
        </footer>
      </main>

      {/* Mobile Navigation Bar (Bottom) - Only active on mobile when drawer is closed */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-outline-variant flex items-center justify-around px-4 z-50">
        <button onClick={() => setActiveTab('global')} className={`flex flex-col items-center gap-1 ${activeTab === 'global' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">public</span>
          <span className="font-mono text-[9px]">GLOBAL</span>
        </button>
        <button onClick={() => setActiveTab('india')} className={`flex flex-col items-center gap-1 ${activeTab === 'india' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">location_on</span>
          <span className="font-mono text-[9px]">INDIA</span>
        </button>
        <button onClick={() => setActiveTab('yarn')} className={`flex flex-col items-center gap-1 ${activeTab === 'yarn' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">show_chart</span>
          <span className="font-mono text-[9px]">YARN</span>
        </button>
        <button onClick={() => setActiveTab('quality')} className={`flex flex-col items-center gap-1 ${activeTab === 'quality' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">verified</span>
          <span className="font-mono text-[9px]">QUALITY</span>
        </button>
        <button onClick={() => setSidebarOpen(true)} className="flex flex-col items-center gap-1 text-on-surface-variant">
          <span className="material-symbols-outlined">menu</span>
          <span className="font-mono text-[9px]">MORE</span>
        </button>
      </nav>

      {/* Floating 3D Props for Atmospheric Visuals */}
      <div id="floating-3d-props" className="fixed right-10 bottom-20 z-0 pointer-events-none opacity-40 select-none hidden md:block transition-transform duration-300 ease-out">
        <div className="relative">
          {/* Torus prop */}
          <div className="w-32 h-32 rounded-full border-[12px] border-[#e0dad1] dark:border-[#49454f] shadow-[15px_15px_30px_rgba(0,0,0,0.1),-15px_-15px_30px_rgba(255,255,255,0.05)] rotate-45 transform-gpu"></div>
          {/* Leaf props */}
          <div className="absolute -top-10 -right-5 w-12 h-16 bg-forest-green/20 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] blur-[2px] -rotate-12"></div>
          <div className="absolute bottom-5 -left-10 w-8 h-12 bg-forest-green/10 rounded-[50%_50%_50%_50%_/_70%_70%_30%_30%] blur-[1px] rotate-45"></div>
          {/* Pebble */}
          <div className="absolute -bottom-8 right-10 w-16 h-12 bg-surface-variant rounded-full shadow-inner opacity-60"></div>
        </div>
      </div>
    </div>
  );
}

function GlobalDashboard({ data, darkMode, colors }) {
  return (
    <div className="space-y-gutter">
      <section className="relative mb-gutter h-64 md:h-80 rounded-xxl overflow-hidden flex items-center justify-between p-8 bg-cover bg-center neumorphic-raised" style={{ backgroundImage: 'url(/basml-cotton-yarn-dashboard/bg-cotton.png)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 via-primary-container/70 to-transparent z-0"></div>
        <div className="relative z-10 text-left space-y-4 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-on-primary-container text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Global Intelligence
          </span>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight">
            The Future of Cotton Intelligence.
          </h2>
          <p className="text-white/80 font-body text-sm md:text-base max-w-xl">
            Deep integration of global supply chain logistics, predictive pricing models, and industrial-grade quality assurance metrics.
          </p>
        </div>
        <div className="absolute right-12 bottom-0 w-64 h-64 z-20 md:block hidden">
          <img 
            alt="Yarn Spool Machine" 
            className="w-full h-full object-contain filter drop-shadow-2xl" 
            src="/basml-cotton-yarn-dashboard/cotton_spinning_spindles.png"
          />
        </div>
      </section>

      {/* Main Dashboard Bento Grid */}
      <div className="grid grid-cols-12 gap-gutter">
        {/* Left Column: Charts and tables */}
        <div className="col-span-12 lg:col-span-8 space-y-gutter">
          {/* Card 1: Balance Sheet */}
          <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">analytics</span>
                  5-Year Balance Sheet Trend
                </h3>
                <p className="text-on-surface-variant text-xs mt-0.5">Global Cotton Supply & Demand Metrics (Million Bales)</p>
              </div>
              <span className="bg-primary/20 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                WASDE Report
              </span>
            </div>
            
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.balanceSheet.historical} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" fontSize={9} />
                  <YAxis fontSize={9} />
                  <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '8px', fontSize: 11}} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="supply" fill={colors.primary} name="Supply" barSize={28} radius={[2, 2, 0, 0]} />
                  <Bar dataKey="demand" fill={colors.primaryContainer} name="Demand" barSize={28} radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="overflow-x-auto mt-6 border border-outline-variant/30 rounded-xl bg-surface-container-lowest">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="px-4 py-2 text-left text-xs font-semibold text-on-surface-variant">Crop Year</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Supply</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Production</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Imports</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Exports</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Demand</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-on-surface-variant">Stocks</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-outline-variant/10">
                  {data.balanceSheet.historical.map((row, i) => (
                    <tr key={i} className="hover:bg-surface-container-high/30">
                      <td className={`px-4 py-2 font-semibold ${row.year.includes('Est') ? 'table-highlight-text font-bold' : ''}`}>{row.year}</td>
                      <td className="px-4 py-2 text-right">{row.supply}M</td>
                      <td className="px-4 py-2 text-right">{row.production}M</td>
                      <td className="px-4 py-2 text-right">{row.imports}M</td>
                      <td className="px-4 py-2 text-right">{row.exports}M</td>
                      <td className="px-4 py-2 text-right font-semibold">{row.demand}M</td>
                      <td className="px-4 py-2 text-right table-highlight-text font-semibold">{row.endingStocks}M</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Card 2: Price Trends */}
          <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding">
            <h3 className="font-headline text-lg font-bold text-primary mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">trending_up</span>
              Global Cotton Price Trends
            </h3>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.prices.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={['auto', 'auto']} tickFormatter={(value) => `$${formatPrice(value)}`} />
                  <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}} formatter={(value) => `$${formatPrice(value)}`} />
                  <Legend />
                  <Line type="monotone" dataKey="AIndex" stroke={colors.tertiary} strokeWidth={3} dot={false} name="A-Index (USD)" />
                  <Line type="monotone" dataKey="US" stroke={colors.primary} strokeWidth={2} dot={false} name="US Upland (USD)" />
                  <Line type="monotone" dataKey="Brazil" stroke={colors.secondary} strokeWidth={2} dot={false} name="Brazil (USD)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-primary-container/10 border border-primary-container/20 p-4 rounded-md mt-4">
            <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">online_prediction</span>
              Next 2-Month Price Movement Estimation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-2 bg-surface/50 rounded border border-outline-variant/30">
                <span className="text-on-surface-variant block mb-0.5">May 30/31 Close:</span>
                <span className="font-semibold text-primary">{data.forecastNarrative.mayClose}</span>
              </div>
              <div className="p-2 bg-surface/50 rounded border border-outline-variant/30">
                <span className="text-on-surface-variant block mb-0.5">June Start:</span>
                <span className="font-semibold text-primary">{data.forecastNarrative.junStart}</span>
              </div>
              <div className="p-2 bg-surface/50 rounded border border-outline-variant/30">
                <span className="text-on-surface-variant block mb-0.5">July & Aug Outlook:</span>
                <span className="font-semibold text-primary">{data.forecastNarrative.julAug}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 space-y-gutter">
          {/* Card 3: Stock Holding Pie */}
          <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between h-full">
            <div>
              <h3 className="font-headline text-lg font-bold text-primary mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">pie_chart</span>
                Stock Holding
              </h3>
              <p className="text-on-surface-variant text-xs mb-6">Strategic Distribution Briefing</p>
              
              <div className="h-48 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.stockHolding} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value" nameKey="holder">
                      {data.stockHolding.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '8px', fontSize: 11}} formatter={(value, name, props) => props.payload.bales ? `${value}% (${props.payload.bales} M Bales)` : `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xl font-extrabold text-primary">84%</span>
                  <span className="text-[9px] text-outline font-bold uppercase">Optimized</span>
                </div>
              </div>
              
              <div className="w-full space-y-3 mt-6">
                {data.stockHolding.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs border-b border-outline-variant/10 pb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: colors.chartPalette[idx % colors.chartPalette.length] }}></span>
                      <span className="font-medium text-on-surface">{entry.holder}</span>
                    </div>
                    <span className="font-bold text-primary">{entry.value}%</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 space-y-2 border-t border-outline-variant/10 pt-4 text-left">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider">Strategic Sourcing Directives</p>
                <ul className="text-[10px] text-on-surface-variant space-y-1.5 list-disc list-inside">
                  <li><strong>Mill Stock Cover:</strong> Maintain a minimum of 45 days consumption inventory cover (current target: 2.87M Bales).</li>
                  <li><strong>ICE Futures Hedge:</strong> Recommend hedging remaining 20% ginner holdings when ICE futures drop below 82 cents/lb.</li>
                  <li><strong>Trader Retention:</strong> Traders holding 20% inventory represent a key liquid spot pool for quick mill requisition.</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-outline-variant/20">
              <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4">
                <span className="material-symbols-outlined text-primary">info</span>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  Confidential briefing: total 7+ pages real data stream integrated from official sourcing protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Bottom Grid Row */}
        {/* Card 4: Price Estimation Table */}
        <div className="col-span-12 lg:col-span-7">
          <div className="card-table-orange border border-soft-orange/20 rounded-xxl neumorphic-raised p-card-padding h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline text-lg font-bold text-soft-orange flex items-center gap-2">
                <span className="material-symbols-outlined">table_rows</span>
                Price Estimation (Variety Index)
              </h3>
              <span className="bg-soft-orange/20 text-soft-orange text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                FOB Forecast
              </span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-outline-variant/20 text-[10px] text-outline font-bold">
                    <th className="pb-3 text-left">INDEX TYPE</th>
                    <th className="pb-3 text-right">CURRENT</th>
                    <th className="pb-3 text-right">FORECAST</th>
                    <th className="pb-3 text-right">YOY CHANGE</th>
                  </tr>
                </thead>
                <tbody className="text-xs divide-y divide-outline-variant/10">
                  {data.prices.types.map((p, i) => (
                    <tr key={i} className="hover:bg-soft-orange/5 transition-colors">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-on-surface flex items-center gap-1.5 flex-wrap">
                          {p.type}
                          <FreshnessBadge type={p.type} />
                        </div>
                        <div className="text-xs text-outline font-medium mt-0.5">{p.quality}</div>
                      </td>
                      <td className="py-3 text-right font-semibold">
                        <div>${formatPrice(p.current)}</div>
                        <div className="text-xs text-outline font-normal">(${formatPrice((p.current * 2.20462)/100)}/kg)</div>
                      </td>
                      <td className="py-3 text-right font-bold table-highlight-text">
                        <div>${formatPrice(p.est)}</div>
                        <div className="text-xs table-highlight-text font-normal">(${formatPrice((p.est * 2.20462)/100)}/kg)</div>
                      </td>
                      <td className={`py-3 text-right font-bold ${p.yoy.includes('+') ? 'text-forest-green' : 'text-error'}`}>
                        {p.yoy}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Card 5: Global Strategic Overview */}
        <div className="col-span-12 lg:col-span-5">
          <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding h-full flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="font-headline text-lg font-bold text-forest-green flex items-center gap-2">
                    <span className="material-symbols-outlined">psychology</span>
                    Global Strategic Overview
                  </h3>
                  <p className="text-xs text-outline font-medium">Predictive risk assessment engine</p>
                </div>
                <span className="bg-forest-green/20 text-forest-green text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Active
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-white/40 dark:border-black/20 glass-overlay flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/20 flex items-center justify-center text-forest-green shrink-0">
                    <span className="material-symbols-outlined">online_prediction</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Next 2-Month Close Outlook</p>
                    <p className="text-xs text-outline mt-0.5">May close: {data.forecastNarrative.mayClose}. June open: {data.forecastNarrative.junStart}.</p>
                  </div>
                </div>
                
                <div className="bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-white/40 dark:border-black/20 glass-overlay flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-soft-orange/20 flex items-center justify-center text-soft-orange shrink-0">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Supply Chain Disruption Alert</p>
                    <p className="text-xs text-outline mt-0.5">{data.forecastNarrative.julAug}</p>
                  </div>
                </div>

                <div className="bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-white/40 dark:border-black/20 glass-overlay flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-forest-green/20 flex items-center justify-center text-forest-green shrink-0">
                    <span className="material-symbols-outlined">shield</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Strategic Hedging Guidelines</p>
                    <p className="text-xs text-outline mt-0.5">Maintain 45% cover on Dec contracts. Target spot price floors at 82 cents/lb to secure optimal margins for spinning runs.</p>
                  </div>
                </div>

                <div className="bg-white/40 dark:bg-black/40 p-4 rounded-xl border border-white/40 dark:border-black/20 glass-overlay flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-soft-orange/20 flex items-center justify-center text-soft-orange shrink-0">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <div>
                    <p className="font-bold text-sm text-on-surface">Consumer Demand Outlook</p>
                    <p className="text-xs text-outline mt-0.5">EU/US retail data indicates a 4.2% YoY consumption rebound, driving elevated yarn demand from primary Bangladesh and Vietnam hubs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-outline-variant/10 text-[10px] text-outline italic">
              * Crop metrics updated every 5 hours directly from WASDE.
            </div>
          </div>
        </div>
      </div>
      <CottonVarietyExplorer mode="global" data={data} colors={colors} />
    </div>
  );
}

function IndiaDashboard({ data, darkMode, colors }) {
  const cci = data.cciOfficialData;
  const latestCci = cci ? cci.historical[0] : null;

  const domesticBalanceSheet = [
    { year: '2021-22', supply: 395.00, production: 311.00, imports: 12.00, exports: 43.00, demand: 315.00, stocks: 71.00, consumption: 312.00 },
    { year: '2022-23', supply: 388.00, production: 318.00, imports: 15.00, exports: 15.50, demand: 311.00, stocks: 77.00, consumption: 313.00 },
    { year: '2023-24', supply: 368.32, production: 323.02, imports: 16.40, exports: 28.50, demand: 317.00, stocks: 28.90, consumption: 320.00 },
    { year: '2024-25', supply: 392.59, production: 312.40, imports: 41.00, exports: 25.00, demand: 314.00, stocks: 60.59, consumption: 305.00 },
    { year: '2025-26 (Est)', supply: 383.41, production: 290.91, imports: 47.00, exports: 12.00, demand: 340.00, stocks: 43.41, consumption: 328.00 }
  ];

  return (
    <div className="space-y-6">
      {/* Tab Header / Welcome bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-outline-variant">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary">India Cotton Focus</h2>
          <p className="text-sm text-on-surface-variant mt-1">Domestic raw cotton production, CCI MSP procurements, and district harvest mapping.</p>
        </div>
      </div>

      {/* Row 1: Domestic Balance Sheet & Price Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: S&D Chart & Balance Sheet Table */}
        <div className="space-y-6">
          {/* Card 1: Domestic Balance Sheet & Supply/Demand Chart */}
          <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding">
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">bar_chart</span>
              Domestic Balance Sheet & Supply/Demand (Lakh Bales)
            </h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domesticBalanceSheet} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip 
                    wrapperStyle={{ zIndex: 1000 }}
                    contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}}
                  />
                  <Legend />
                  <Bar dataKey="consumption" name="Consumption (Lakh Bales)" fill="#FB8C00" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="production" name="Production (Lakh Bales)" fill="#FFA951" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 2: India Balance Sheet Table */}
          <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding">
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">table_chart</span>
              India Balance Sheet Table (Lakh Bales)
            </h3>
            <div className="overflow-x-auto border border-outline-variant rounded">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Supply (Lakh Bales)</th>
                    <th>Prod (Lakh Bales)</th>
                    <th>Imports</th>
                    <th>Exports</th>
                    <th>Demand</th>
                    <th>Stocks</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {domesticBalanceSheet.map((row, idx) => (
                    <tr key={idx} className="hover:bg-primary/5 transition-all">
                      <td className="font-bold py-2">{row.year}</td>
                      <td>{row.supply.toFixed(2)}</td>
                      <td className="font-semibold">{row.production.toFixed(2)}</td>
                      <td>{row.imports.toFixed(2)}</td>
                      <td>{row.exports.toFixed(2)}</td>
                      <td>{row.demand.toFixed(2)}</td>
                      <td className="font-bold table-highlight-text">{row.stocks.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Price Trends Line Chart & Next 2-Month Price Movement Estimation */}
        <div className="space-y-6">
          {/* Card 3: Price Monthly Trends Chart */}
          <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding">
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">trending_up</span>
              Price Monthly Trends (₹ / Candy)
            </h3>
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.prices.monthlyTrend} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis domain={[56000, 72000]} />
                  <Tooltip 
                    wrapperStyle={{ zIndex: 1000 }}
                    contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="J34" name="J-34 (₹/Candy)" stroke="#FFA951" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="MCU5" name="MCU-5 (₹/Candy)" stroke="#BF360C" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                  <Line type="monotone" dataKey="Shankar6" name="Shankar-6 (₹/Candy)" stroke="#F57C00" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Card 4: Next 2-Month Price Movement Estimation */}
          <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">insights</span>
                Next 2-Month Price Movement Estimation
              </h3>
              <div className="space-y-3.5 text-xs text-on-surface-variant font-medium leading-relaxed">
                <div>
                  <strong className="text-primary font-bold block mb-0.5">May 30/31 Close:</strong>
                  May 2026 closing estimates project Shankar-6 reaching <span className="font-semibold text-primary">₹68,500/Candy</span> as CCI tightens e-auction lots.
                </div>
                <div className="border-t border-outline-variant/30 pt-3">
                  <strong className="text-primary font-bold block mb-0.5">June Start:</strong>
                  June will start aggressive, likely touching <span className="font-semibold text-primary">₹69,000/Candy</span> due to delayed monsoon fears in Gujarat.
                </div>
                <div className="border-t border-outline-variant/30 pt-3">
                  <strong className="text-primary font-bold block mb-0.5">July & Aug Outlook:</strong>
                  July and August are critical. A monsoon deficit could spike prices to <span className="font-semibold text-primary">₹71,000+</span> (MCU-5 approaching <span className="font-semibold text-primary">₹74,000</span>). A normal monsoon will stabilize S-6 around <span className="font-semibold text-primary">₹67,500</span>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Raw Cotton Harvest & Inventory Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 3: State-wise production */}
        <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding">
          <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">grass</span>
            State-Wise Raw Cotton Harvest & Ginning Outturn (Lakh Bales)
          </h3>
          <div className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low border border-outline-variant/30 p-3 rounded-md mb-4">
            Tracking Kapas picking cycles, Ginning Outturn (GOT ~34-36%), and lint yields across all 9 major Indian cotton states. Sums up exactly to the 290.91 Lakh Bales national balance sheet total.
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.stateProduction} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="state" type="category" width={85} />
                <Tooltip 
                  wrapperStyle={{ zIndex: 1000 }}
                  contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}} 
                  formatter={(value, name, props) => [`${value} Lakh Bales (Yield: ${props.payload.yield} | GOT: ${props.payload.got})`, `Harvest: ${props.payload.harvestPeriod} (${props.payload.quality})`]} 
                />
                <Bar dataKey="production" name="Raw Cotton Harvest (Lakh Bales)" radius={[0, 2, 2, 0]}>
                  {data.stateProduction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Card 4: Pie Charts & Inventory */}
        <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">pie_chart</span>
              Stock Holding & Inventory Distribution
            </h3>
            <div className="text-xs text-on-surface-variant bg-surface-container-low border border-outline-variant/30 p-3 rounded-md mb-4">
              <strong>Total Ending Stocks (2025-26 Est):</strong> 43.41 Lakh Bales | <strong>Est. Market Valuation:</strong> ₹14,130 Crore (@ ₹32,550 / Bale)
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[300px]">
              <div className="h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.stockHolding} cx="50%" cy="45%" innerRadius={35} outerRadius={70} paddingAngle={2} dataKey="value" nameKey="holder" label={({ name, value }) => `${name === 'CCI / Govt' ? 'Govt' : name}: ${value}%`}>
                      {data.stockHolding.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}} formatter={(value, name, props) => props.payload.bales ? `${value}% (${props.payload.bales} Lakh Bales | ₹${props.payload.marketValueCr.toLocaleString()} Cr)` : `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="h-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={data.cciVsNonCci} cx="50%" cy="45%" innerRadius={0} outerRadius={70} dataKey="value" nameKey="category" label={({ name, value }) => `${name === 'Non-CCI (Private Open Market)' ? 'Non-CCI' : name === 'CCI Procurement' ? 'CCI' : name}: ${value}%`}>
                      {data.cciVsNonCci.map((entry, index) => (
                        <Cell key={`cci-${index}`} fill={index === 0 ? colors.primary : colors.secondary} />
                      ))}
                    </Pie>
                    <Tooltip wrapperStyle={{ zIndex: 1000 }} contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}} formatter={(value, name, props) => props.payload.bales ? `${value}% (${props.payload.bales} Lakh Bales | ₹${props.payload.marketValueCr.toLocaleString()} Cr)` : `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Row 3: Tamil Nadu Map & Spot Prices */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 5: TN district harvest */}
        <div className="card-chart-green rounded-xxl neumorphic-raised p-card-padding">
          <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">map</span>
            Tamil Nadu District Raw Cotton Harvest
          </h3>
          <div className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low border border-outline-variant/30 p-3 rounded-md mb-4">
            Regional Kapas harvest tracking across Tamil Nadu. While Coimbatore leads in spinning mill density and yarn production, agricultural raw cotton cultivation is highest in Perambalur, Salem, and Virudhunagar.
          </div>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.tnDistricts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="district" interval={0} angle={-35} textAnchor="end" height={60} />
                <YAxis />
                <Tooltip 
                  wrapperStyle={{ zIndex: 1000 }}
                  contentStyle={{background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px'}} 
                  formatter={(value, name, props) => [`${value} Lakh Bales (GOT: ${props.payload.got} | Active Ginners: ${props.payload.activeGinningMills})`, `Harvest: ${props.payload.harvestType} | Dominant: ${props.payload.dominantVariety}`]} 
                />
                <Legend />
                <Bar dataKey="production" name="Raw Cotton Harvest (Lakh Bales)" radius={[2, 2, 0, 0]}>
                  {data.tnDistricts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 pt-4 border-t border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">agriculture</span>
                Varietal & Soil Profile
              </p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                <strong>MCU-5</strong> dominates rain-fed black soil clusters in Perambalur & Salem. Irrigated sandy-loams in Virudhunagar yield premium long-staple <strong>DCH-32 ELS</strong> cotton, fetching a 15% price premium.
              </p>
            </div>
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">local_shipping</span>
                Ginning & Logistics
              </p>
              <p className="text-[10px] text-on-surface-variant leading-relaxed">
                Active ginning clusters (GOT 33.5%) process local output into 170kg bales. Over 92% of processed lint is dispatched to spinning hubs in Coimbatore and Tirupur with a transit latency of under 4 hours.
              </p>
            </div>
          </div>
        </div>
        
        {/* Card 6: Spot Prices & Alerts */}
        <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">sell</span>
              Spot Prices & Planning Alerts (₹ / Candy)
            </h3>
            <div className="overflow-x-auto border border-outline-variant rounded">
              <table>
                <thead>
                  <tr>
                    <th>Variety (Quality & Staple)</th>
                    <th>Current Price</th>
                    <th>Upcoming Price</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  {data.prices.types.map((p, i) => (
                    <tr key={i}>
                      <td className="py-2.5">
                        <div className="font-semibold text-sm table-highlight-text flex items-center gap-1.5 flex-wrap">{p.type} <FreshnessBadge type={p.type} /></div>
                        <div className="text-[10px] text-on-surface-variant font-mono mt-0.5">Quality: {p.staple}</div>
                      </td>
                      <td className="py-2.5">
                        <div className="font-semibold">₹{formatPrice(p.current, true)} <span className="text-[10px] font-normal text-on-surface-variant">/ Candy</span></div>
                        <div className="text-[10px] text-on-surface-variant">(₹{formatPrice(p.current / 356, true)} / kg)</div>
                      </td>
                      <td className="py-2.5">
                        <div className="font-semibold table-highlight-text">₹{formatPrice(p.est, true)} <span className="text-[10px] font-normal text-on-surface-variant">/ Candy</span></div>
                        <div className="text-[10px] text-on-surface-variant">(₹{formatPrice(p.est / 356, true)} / kg)</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-error-container/10 border border-error-container/20 p-4 rounded-md mt-6">
            <h4 className="text-xs font-bold text-error uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle size={16} />
              Alert: Action Required
            </h4>
            <p className="text-xs leading-relaxed text-on-surface-variant">{data.planning}</p>
          </div>
        </div>
      </div>

      {/* Consensus model box */}
      <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding">
        <h3 className="text-base font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-lg">hub</span>
          Cotton Price Source Cross-Reference & Consensus Model
        </h3>
        <p className="text-xs text-on-surface-variant mb-4 leading-relaxed">
          Compare raw price feeds across national commodity exchanges, government mandis, global trade indexes, and official corporations. 
          When multiple independent sources report matching or overlapping values, our model validates and outputs the <strong>Real Consensus Spot Price</strong>.
        </p>
        
        <div className="overflow-x-auto border border-outline-variant rounded mb-4">
          <table>
            <thead>
              <tr>
                <th>Price Source</th>
                <th>Market Segment</th>
                <th>Reported Price (Raw)</th>
                <th>Normalized Equivalent (₹/Candy)</th>
                <th>Refresh</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.caionline.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    CAI (Cotton Assoc of India) <ExternalLink size={10} />
                  </a>
                </td>
                <td>Physical Spot Matrix</td>
                <td>₹65,100 / Candy</td>
                <td className="font-bold">₹65,100 / Candy</td>
                <td>Daily</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-container/20 table-highlight-text border border-emerald-500/20">Verified Alignment</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.cotcorp.org.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    CCI (Cotton Corp of India) <ExternalLink size={10} />
                  </a>
                </td>
                <td>E-Auction Cleared Spot</td>
                <td>₹65,200 / Candy</td>
                <td className="font-bold">₹65,200 / Candy</td>
                <td>Daily</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-container/20 table-highlight-text border border-emerald-500/20">Verified Alignment</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.mcxindia.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    MCX India <ExternalLink size={10} />
                  </a>
                </td>
                <td>Live Cotton Futures</td>
                <td>₹28,290 / Bale (170kg)</td>
                <td className="font-bold">₹59,150 / Candy</td>
                <td>Tick-by-Tick</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary/20 text-on-surface-variant border border-outline-variant/30">Discount Spot (Futures)</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.ncdex.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    NCDEX <ExternalLink size={10} />
                  </a>
                </td>
                <td>Kapas Futures (Seed Cotton)</td>
                <td>₹1,550 / 20 kg</td>
                <td className="font-bold">₹61,500 / Candy (Lint Equiv)</td>
                <td>Tick-by-Tick</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-container/20 table-highlight-text border border-emerald-500/20">Aligned Trend</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://agmarknet.gov.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    Agmarknet <ExternalLink size={10} />
                  </a>
                </td>
                <td>Mandi Spot Arrivals</td>
                <td>₹7,750 / Quintal (100kg)</td>
                <td className="font-bold">₹61,350 / Candy (Lint Equiv)</td>
                <td>Daily</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-primary-container/20 table-highlight-text border border-emerald-500/20">Aligned Trend</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.cotlook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    Cotlook <ExternalLink size={10} />
                  </a>
                </td>
                <td>Global Cotlook A-Index</td>
                <td>95.00 US Cents / lb</td>
                <td className="font-bold">₹62,130 / Candy (Import Equiv)</td>
                <td>Daily</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-tertiary/20 table-highlight-text border border-emerald-500/20">Global Premium</span></td>
              </tr>
              <tr>
                <td className="font-semibold table-highlight-text">
                  <a href="https://www.theice.com/products/254/Cotton-No-2-Futures" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
                    ICE Cotton No. 2 <ExternalLink size={10} />
                  </a>
                </td>
                <td>Live Global Futures</td>
                <td>84.50 US Cents / lb</td>
                <td className="font-bold">₹55,260 / Candy (FOB Base)</td>
                <td>Tick-by-Tick</td>
                <td><span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-secondary/20 text-on-surface-variant border border-outline-variant/30">FOB Export Base</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-low border border-outline-variant/40 p-4 rounded-lg">
          <div>
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Model Consensus Status</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <strong className="text-sm font-bold text-primary">Strong Spot Convergence</strong>
            </div>
            <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
              High-reliability verification: Multiple spot reports overlap with a variation margin under 0.15%.
            </p>
          </div>
          <div className="md:border-l md:border-outline-variant/40 md:pl-6">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Calculated Real Price Value</span>
            <div className="text-2xl font-black text-primary mt-1">
              ₹65,100 <span className="text-xs font-bold text-on-surface-variant">/ Candy</span>
            </div>
            <div className="text-[10px] text-on-surface-variant mt-0.5 font-mono">
              (Equal to ₹182.87 / kg Lint)
            </div>
          </div>
          <div className="md:border-l md:border-outline-variant/40 md:pl-6">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Verification Consensus Logic</span>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed font-medium">
              Both CAI Spot Matrix (₹65,100) and CCI E-Auction clearings (₹65,200) agree on physical spot. Kapas futures on NCDEX and average mandi arrivals (normalized for ginning outturn (~35%) and seed sales) support a lint cost equivalence of ₹61,350–₹61,500, confirming the physical transaction cost benchmark of ₹65,100.
            </p>
          </div>
        </div>
      </div>

      {/* CCI Section */}
      {cci && (
        <div className="card-table-orange rounded-xxl neumorphic-raised p-card-padding border-t-4 border-t-primary">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h3 className="text-base md:text-lg font-bold text-primary flex items-center gap-2">
              <Building2 className="text-primary" size={22} /> 
              Cotton Corporation of India (CCI) Official Financial & Operational Intelligence
            </h3>
            <span className="px-3 py-1 rounded bg-primary/10 text-primary text-[10px] font-mono font-bold uppercase tracking-wider border border-primary/20">
              Verified CCI Annual Reports Portal
            </span>
          </div>
          
          <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">{cci.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-surface-container-low border border-outline-variant/40 p-5 rounded-lg flex flex-col justify-between text-center min-h-[140px]">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">2024-25 Total Purchase</span>
              <div className="text-xl md:text-2xl font-black text-primary my-2">{latestCci.totalPurchaseBales} <span className="text-xs font-semibold">Lakh Bales</span></div>
              <span className="text-[10px] text-on-surface-variant">Valued at ₹{formatPrice(latestCci.totalPurchaseCr, true)} Crore</span>
            </div>
            
            <div className="bg-surface-container-low border border-outline-variant/40 p-5 rounded-lg flex flex-col justify-between text-center min-h-[140px]">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">2024-25 Turnover Value</span>
              <div className="text-xl md:text-2xl font-black text-primary my-2">₹{formatPrice(latestCci.turnoverCr, true)} <span className="text-xs font-semibold">Crore</span></div>
              <span className="text-[10px] text-primary font-semibold">▲ 468% YoY Growth</span>
            </div>
            
            <div className="bg-surface-container-low border border-outline-variant/40 p-5 rounded-lg flex flex-col justify-between text-center min-h-[140px]">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Net Profit After Tax (PAT)</span>
              <div className="text-xl md:text-2xl font-black text-primary my-2">₹{formatPrice(latestCci.patCr, true)} <span className="text-xs font-semibold">Crore</span></div>
              <span className="text-[10px] text-on-surface-variant">Gross Margin: ₹{formatPrice(latestCci.grossMarginCr, true)} Cr</span>
            </div>
            
            <div className="bg-surface-container-low border border-outline-variant/40 p-5 rounded-lg flex flex-col justify-between text-center min-h-[140px]">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">MSP Reimbursable Loss</span>
              <div className="text-xl md:text-2xl font-black text-error my-2">₹{formatPrice(latestCci.mspLossReimbursableCr, true)} <span className="text-xs font-semibold">Crore</span></div>
              <span className="text-[10px] text-on-surface-variant">Govt of India Reimbursed</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between h-full bg-surface-container-low/50 p-4 rounded-lg border border-outline-variant/30">
              <div>
                <h4 className="text-sm font-bold text-primary mb-4">5-Year Operational Volume Comparison (Lakh Bales)</h4>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={[...cci.historical].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" height={50} interval={0} angle={-25} textAnchor="end" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip contentStyle={{ background: 'var(--color-surface-container-low)', borderColor: 'var(--color-outline-variant)', color: 'var(--color-on-surface)', borderRadius: '4px' }} />
                      <Legend />
                      <Bar yAxisId="left" dataKey="totalPurchaseBales" fill={colors.primary} name="Procurement (Lakh Bales)" barSize={20} radius={[2, 2, 0, 0]} />
                      <Bar yAxisId="left" dataKey="totalSalesBales" fill={colors.primaryContainer} name="Sales Volume (Lakh Bales)" barSize={20} radius={[2, 2, 0, 0]} />
                      <Line yAxisId="right" type="monotone" dataKey="turnoverCr" stroke={colors.tertiary} strokeWidth={3} name="Turnover Value (₹ Cr)" dot={true} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-primary-container/10 border border-primary-container/20 p-4 rounded-md mt-4">
                <h5 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck size={16} />
                  CCI Infrastructure & Network Overview
                </h5>
                <ul className="text-xs space-y-1.5 text-on-surface-variant">
                  <li><strong>Active Market Yards:</strong> {cci.procurementNetwork.marketYards}+ APMC centers across 19 branch offices.</li>
                  <li><strong>E-Auction Portal:</strong> Integrated via {cci.procurementNetwork.eAuctionPlatform} for daily bidding.</li>
                  <li><strong>Active Notice:</strong> {cci.procurementNetwork.activeNotice}</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col justify-between h-full bg-surface-container-low/50 p-4 rounded-lg border border-outline-variant/30">
              <div>
                <h4 className="text-sm font-bold text-primary mb-3">Detailed Ten Year Financial Results (Navi Mumbai HQ)</h4>
                <div className="overflow-x-auto border border-outline-variant rounded">
                  <table className="text-xs">
                    <thead>
                      <tr>
                        <th>Particulars (₹ Crore)</th>
                        {cci.historical.map((h, i) => (
                          <th key={i} className="text-right">{h.year}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Opening Stock Value</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right">{formatPrice(h.openingStockCr, true)}</td>)}
                      </tr>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Commercial Purchases</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right">{formatPrice(h.purchaseCommercialCr, true)}</td>)}
                      </tr>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Support Purchases (MSP)</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right font-bold table-highlight-text">{formatPrice(h.purchaseSupportCr, true)}</td>)}
                      </tr>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Total Sales Realization</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right font-bold table-highlight-text">{formatPrice(h.totalSalesCr, true)}</td>)}
                      </tr>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Closing Stock Value</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right">{formatPrice(h.closingStockCr, true)}</td>)}
                      </tr>
                      <tr>
                        <td className="font-medium text-on-surface-variant">Gross Margin (PBDIT)</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right">{formatPrice(h.grossMarginCr, true)}</td>)}
                      </tr>
                      <tr className="bg-primary/5 font-semibold table-highlight-text">
                        <td>Net Profit / (Loss)</td>
                        {cci.historical.map((h, i) => <td key={i} className="text-right">{formatPrice(h.patCr, true)}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-primary-container/10 border border-primary-container/20 p-4 rounded-md mt-4">
                <h5 className="text-xs font-bold text-primary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <AlertCircle size={16} />
                  Strategic Procurement Briefing
                </h5>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  {cci.strategicBriefing}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <CottonVarietyExplorer mode="india" data={data} colors={colors} />
    </div>
  );
}

function YarnDashboard({ data, darkMode, colors }) {
  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);
  const [selectedYarnType, setSelectedYarnType] = useState('cotton');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [selectedCalcCount, setSelectedCalcCount] = useState('40s Combed');

  const spreadData = {
    '30s Carded': {
      rawCotton: '56,000',
      waste: 12,
      cleanCotton: 184,
      conversion: 85,
      totalCost: 269,
      yarnPrice: 282,
      spread: 13
    },
    '40s Combed': {
      rawCotton: '56,000',
      waste: 18,
      cleanCotton: 198,
      conversion: 95,
      totalCost: 293,
      yarnPrice: 315,
      spread: 22
    },
    '60s Combed': {
      rawCotton: '58,500',
      waste: 20,
      cleanCotton: 212,
      conversion: 120,
      totalCost: 332,
      yarnPrice: 358,
      spread: 26
    },
    '80s Combed': {
      rawCotton: '65,000',
      waste: 22,
      cleanCotton: 242,
      conversion: 160,
      totalCost: 402,
      yarnPrice: 408,
      spread: 6
    }
  };
  const millIntelligence = data.millIntelligence || initialData.yarns.millIntelligence || [];
  
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
      const matchesFocus = mill.focus.toLowerCase().includes(q);
      if (!matchesName && !matchesRegion && !matchesFocus) return false;
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const stateComparison = data.stateComparison || initialData.yarns.stateComparison || [];
  const districtComparison = data.districtComparison || initialData.yarns.districtComparison || [];
  return (
    <div className="space-y-gutter">
      {/* Slide Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black tracking-tight text-primary uppercase">
            Cotton Yarn Market Intel & Forecast
          </h2>
          <p className="font-mono text-xs text-on-surface-variant mt-1">Real-time trading desk and yarn supply chain parity metrics</p>
        </div>
      </div>

      {/* Grid: Global and India domestic yarn supply demand & pricing */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Global Cotton Yarn */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">globe</span>
              Global Cotton Yarn Supply/Demand & Prices
            </h3>
            <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6">
              <table>
                <thead>
                  <tr>
                    <th>Yarn Type</th>
                    <th className="text-right">Current (USD)</th>
                    <th className="text-right">Forecast</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.global.prices.map((p, i) => (
                    <tr key={i}>
                      <td className="font-semibold flex items-center gap-1.5 flex-wrap">
                        {p.type}
                        <FreshnessBadge type={p.type} />
                      </td>
                      <td className="text-right font-bold">${formatPrice(p.current)}</td>
                      <td className="text-right font-bold table-highlight-text">${formatPrice(p.est)}</td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">Global Supply & Demand (Million Tons)</h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th className="text-right">Prod (M Tons)</th>
                    <th className="text-right">Demand (M Tons)</th>
                    <th className="text-right">Inv (M Tons)</th>
                  </tr>
                </thead>
                <tbody>
                  {data.global.balanceSheet.map((row, i) => (
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

        {/* India Domestic Cotton Yarn */}
        <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">map</span>
              India Domestic Cotton Yarn Markets
            </h3>
            <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6">
              <table>
                <thead>
                  <tr>
                    <th>Yarn Type</th>
                    <th className="text-right">Current (INR)</th>
                    <th className="text-right">Forecast</th>
                    <th className="text-right">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {data.india.prices.map((p, i) => (
                    <tr key={i}>
                      <td className="font-semibold flex items-center gap-1.5 flex-wrap">
                        {p.type}
                        <FreshnessBadge type={p.type} />
                      </td>
                      <td className="text-right font-bold">₹{formatPrice(p.current, true)}</td>
                      <td className="text-right font-bold table-highlight-text">₹{formatPrice(p.est, true)}</td>
                      <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-2">India Supply & Demand (Million Kgs)</h4>
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
                <tbody>
                  {data.india.balanceSheet.map((row, i) => (
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
              Profitability depends on the "Yarn Margin Spread" (Yarn Price minus Clean Cotton Cost & Conversion Cost). Select count to view details:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {['30s Carded', '40s Combed', '60s Combed', '80s Combed'].map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCalcCount(count)}
                  className={`py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-colors duration-200 border ${
                    selectedCalcCount === count
                      ? 'bg-primary text-on-primary border-primary'
                      : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>

            <div className="space-y-2.5">
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Raw Cotton Cost (Shankar-6 Candy):</span>
                <span className="font-bold text-on-surface">₹{spreadData[selectedCalcCount].rawCotton} / Candy</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Clean Cotton Cost ({spreadData[selectedCalcCount].waste}% waste):</span>
                <span className="font-bold text-on-surface">₹{spreadData[selectedCalcCount].cleanCotton} / Kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                <span className="text-on-surface-variant">Mill Conversion Cost (Power/Labor):</span>
                <span className="font-bold text-on-surface">₹{spreadData[selectedCalcCount].conversion} / Kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-dashed border-outline-variant pb-2 text-primary font-bold">
                <span>Total Manufacturing Cost:</span>
                <span>₹{spreadData[selectedCalcCount].totalCost} / Kg</span>
              </div>
              <div className="flex justify-between text-xs font-mono border-b border-outline-variant pb-2 font-bold text-on-surface">
                <span>Market Selling Price of Yarn:</span>
                <span>₹{spreadData[selectedCalcCount].yarnPrice} / Kg</span>
              </div>
              <div className={`flex justify-between text-sm font-mono font-bold p-3 rounded-lg border ${
                spreadData[selectedCalcCount].spread > 10
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-tertiary/10 text-tertiary border-tertiary/20'
              }`}>
                <span>Net Spinners' Margin (Spread):</span>
                <span>₹{spreadData[selectedCalcCount].spread} / Kg ({spreadData[selectedCalcCount].spread > 10 ? 'Profit' : 'Critical'})</span>
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
                  <span className="text-lg mt-0.5">🎗️</span>
                  <div>
                    <h5 className="text-xs font-headline font-bold text-on-surface">Hank Yarn Obligation (HYO) Impact</h5>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mt-0.5">
                      Spun yarn mills must produce 30% of their output in hank form for handlooms. Hank yarn has lower margins, so reduction or exemptions benefit major spinners.
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

      {/* Section 2: Production Charts */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          Indian State-Wise & Tamil Nadu Regional Production
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="card-chart-green rounded-xl p-6 min-w-0">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">Indian State-Wise Yarn Mills Production</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.stateMillsProduction} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" fontSize={10} />
                  <YAxis dataKey="state" type="category" fontSize={10} width={90} />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(value, name, props) => [
                      `${value} M Kgs (Active Spindles: ${props.payload.activeSpindles})`,
                      `Dominant Types: ${props.payload.majorFocus}`
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Yarn Production (M Kgs)" barSize={16}>
                    {data.stateMillsProduction.map((entry, index) => (
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
                <BarChart data={data.tnDistrictYarnProduction}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="district" fontSize={10} interval={0} angle={-35} textAnchor="end" height={65} />
                  <YAxis fontSize={10} />
                  <Tooltip
                    cursor={false}
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(value, name, props) => [
                      `${value} M Kgs`,
                      `Dominant Types: ${props.payload.majorFocus}`
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Bar dataKey="production" name="Production (M Kgs)" barSize={20}>
                    {data.tnDistrictYarnProduction.map((entry, index) => (
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
                <tbody>
                  {stateComparison.map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold">{row.state}</td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.purchaseBales).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMCotton.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYCotton.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                      </td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.prodMkg).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMYarn.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMYarn}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYYarn.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYYarn}</span>
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

          {/* TN District parity */}
          <div className="card-table-orange rounded-xl p-6">
            <h4 className="text-sm font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span>📍</span> Tamil Nadu District-Wise Purchase & Production Parity
            </h4>
            <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[380px] overflow-y-auto">
              <table>
                <thead>
                  <tr>
                    <th>District</th>
                    <th className="text-right">Cotton Purchase (Lakh Bales)</th>
                    <th className="text-center">Cotton Purchase Trend (MoM / YoY)</th>
                    <th className="text-right">Yarn Production (M Kgs)</th>
                    <th className="text-center">Yarn Production Trend (MoM / YoY)</th>
                  </tr>
                </thead>
                <tbody>
                  {districtComparison.map((row, i) => (
                    <tr key={i}>
                      <td className="font-bold">{row.district}</td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.purchaseBales).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMCotton.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYCotton.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYCotton}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                      </td>
                      <td className="text-right font-bold text-on-surface">{parseFloat(row.prodMkg).toFixed(1)}</td>
                      <td className="text-center">
                        <span className={`font-bold ${row.MoMYarn.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.MoMYarn}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                        <span className="text-outline/30 mx-2">|</span>
                        <span className={`font-bold ${row.YoYYarn.includes('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{row.YoYYarn}</span>
                        <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-xs leading-relaxed text-on-surface-variant bg-surface-container-low border border-outline-variant p-4 rounded-lg">
              <strong>Coimbatore-Tirupur Cluster Analysis:</strong> The Coimbatore and Tirupur spinning hubs report a YoY yarn production surge of over 9.8%, supported by consistent e-auction off-takes from CCI warehouse stations.
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
                  className={`py-1 px-2.5 rounded-full text-xs font-mono font-medium transition-colors border ${
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
                className={`py-1 px-2.5 rounded-full text-xs font-mono font-medium transition-colors border ${
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

        {/* Search Field */}
        <div className="relative mb-4">
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search mill by name, region or count specialty..."
            className="w-full pl-10 pr-4 py-2 text-sm font-mono bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/50"
          />
          <span className="material-symbols-outlined absolute left-3 top-2 text-on-surface-variant/60">search</span>
        </div>

        {/* Mills Table */}
        <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[420px] overflow-y-auto">
          {filteredMills.length === 0 ? (
            <div className="text-center py-8 text-sm text-on-surface-variant font-mono">
              No mills found matching the active filters.
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
              <tbody>
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
                      <span className={`font-bold ${mill.MoMCotton.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.MoMCotton}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                      <span className="text-outline/30 mx-1.5">|</span>
                      <span className={`font-bold ${mill.YoYCotton.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.YoYCotton}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> YoY</span>
                    </td>
                    <td className="text-right font-bold text-on-surface">{mill.prod.toFixed(1)}</td>
                    <td className="text-center whitespace-nowrap px-4">
                      <span className={`font-bold ${mill.MoMYarn.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.MoMYarn}</span>
                      <span className="text-[10px] text-on-surface-variant font-mono"> MoM</span>
                      <span className="text-outline/30 mx-1.5">|</span>
                      <span className={`font-bold ${mill.YoYYarn.includes('+') ? 'table-highlight-text' : 'text-error'}`}>{mill.YoYYarn}</span>
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

      {/* Spot Cotton Yarns List */}
      <div className="card-table-orange rounded-xl p-6">
        <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">list_alt</span>
          Real Values: Indian & Tamil Nadu Spot Market Yarns List & Current Prices
        </h3>
        <div className="overflow-x-auto border border-outline-variant rounded-lg">
          <table>
            <thead>
              <tr>
                <th>Yarn Count & Specification</th>
                <th>Major Market Region</th>
                <th className="text-right">Current Price (₹/kg)</th>
                <th className="text-right">Price per Bag (60 kg)</th>
                <th>Monthly Trend</th>
                <th>End-Use Application</th>
              </tr>
            </thead>
            <tbody>
              {data.marketYarnsList.map((yarn, idx) => (
                <tr key={idx}>
                  <td className="font-bold table-highlight-text flex items-center gap-1.5 flex-wrap">
                    {yarn.countSpec}
                    <FreshnessBadge type={yarn.countSpec} />
                  </td>
                  <td>{yarn.region}</td>
                  <td className="text-right font-bold text-on-surface">₹{formatPrice(yarn.price, true)}</td>
                  <td className="text-right font-bold table-highlight-text">₹{formatPrice(yarn.bagPrice, true)}</td>
                  <td>
                    <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                      yarn.trend.includes('+')
                        ? 'bg-primary/10 table-highlight-text border border-emerald-500/20'
                        : 'bg-tertiary/10 table-highlight-text border border-emerald-500/20'
                    }`}>
                      {yarn.trend}
                    </span>
                  </td>
                  <td className="text-on-surface-variant font-sans font-medium">{yarn.application}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Section 4: Non-Cotton Yarn Market Intel */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          Non-Cotton Yarn Market Intel & Forecast
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {/* Global Non-Cotton */}
          <div className="card-table-orange rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">globe</span>
                Global Non-Cotton Yarn Supply/Demand & Prices
              </h4>
              <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6 max-h-[280px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Yarn Type</th>
                      <th className="text-right">Current (USD)</th>
                      <th className="text-right">Forecast</th>
                      <th className="text-right">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.nonCotton.global.prices.map((p, i) => (
                      <tr key={i}>
                        <td className="font-semibold flex items-center gap-1.5 flex-wrap">
                          {p.type}
                          <FreshnessBadge type={p.type} />
                        </td>
                        <td className="text-right font-bold">${formatPrice(p.current)}</td>
                        <td className="text-right font-bold table-highlight-text">${formatPrice(p.est)}</td>
                        <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h5 className="text-xs font-mono font-bold text-on-surface-variant mb-2">Global Non-Cotton Supply & Demand (Million Tons)</h5>
              <div className="overflow-x-auto border border-outline-variant rounded-lg">
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th className="text-right">Prod (M Tons)</th>
                      <th className="text-right">Demand (M Tons)</th>
                      <th className="text-right">Inv (M Tons)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.nonCotton.global.balanceSheet.map((row, i) => (
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

          {/* India Domestic Non-Cotton */}
          <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">map</span>
                India Domestic Non-Cotton Yarn Markets
              </h4>
              <div className="overflow-x-auto border border-outline-variant rounded-lg mb-6 max-h-[280px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Yarn Type</th>
                      <th className="text-right">Current (INR)</th>
                      <th className="text-right">Forecast</th>
                      <th className="text-right">Growth</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.nonCotton.india.prices.map((p, i) => (
                      <tr key={i}>
                        <td className="font-semibold flex items-center gap-1.5 flex-wrap">
                          {p.type}
                          <FreshnessBadge type={p.type} />
                        </td>
                        <td className="text-right font-bold">₹{formatPrice(p.current, true)}</td>
                        <td className="text-right font-bold table-highlight-text">₹{formatPrice(p.est, true)}</td>
                        <td className="text-right font-semibold table-highlight-text">{p.growth}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h5 className="text-xs font-mono font-bold text-on-surface-variant mb-2">India Non-Cotton Supply & Demand (Million Kgs)</h5>
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
                  <tbody>
                    {data.nonCotton.india.balanceSheet.map((row, i) => (
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
        </div>
      </div>

      {/* Non-Cotton Production Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-headline font-bold text-primary mb-4">Indian State-Wise Non-Cotton Production</h4>
          <div className="h-[320px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.nonCotton.stateProduction} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" fontSize={10} />
                <YAxis dataKey="state" type="category" fontSize={10} width={90} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-container-high)',
                    borderColor: 'var(--color-outline-variant)',
                    borderRadius: '8px',
                    color: 'var(--color-on-surface)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                  formatter={(value, name, props) => [
                    `${value} M Kgs`,
                    `Dominant Types: ${props.payload.majorFocus}`
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="production" name="Production (M Kgs)" barSize={16}>
                  {data.nonCotton.stateProduction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.chartPalette[(index + 3) % colors.chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h4 className="text-sm font-headline font-bold text-primary mb-4">Tamil Nadu District-Wise Non-Cotton Production</h4>
          <div className="h-[320px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.nonCotton.districtProduction}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="district" fontSize={10} interval={0} angle={-35} textAnchor="end" height={65} />
                <YAxis fontSize={10} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    backgroundColor: 'var(--color-surface-container-high)',
                    borderColor: 'var(--color-outline-variant)',
                    borderRadius: '8px',
                    color: 'var(--color-on-surface)',
                    fontSize: '11px',
                    fontFamily: 'JetBrains Mono, monospace'
                  }}
                  formatter={(value, name, props) => [
                    `${value} M Kgs`,
                    `Dominant Types: ${props.payload.majorFocus}`
                  ]}
                />
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="production" name="Production (M Kgs)" barSize={20}>
                  {data.nonCotton.districtProduction.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors.chartPalette[(index + 4) % colors.chartPalette.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Spot Non-Cotton Yarns List */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">list_alt</span>
          Spot Non-Cotton Market Yarns List & Current Prices
        </h3>
        <div className="overflow-x-auto border border-outline-variant rounded-lg">
          <table>
            <thead>
              <tr>
                <th>Yarn Count & Specification</th>
                <th>Major Market Region</th>
                <th className="text-right">Current Price (₹/kg)</th>
                <th className="text-right">Price per Bag (60 kg)</th>
                <th>Monthly Trend</th>
                <th>End-Use Application</th>
              </tr>
            </thead>
            <tbody>
              {data.nonCotton.marketYarnsList.map((yarn, idx) => (
                <tr key={idx}>
                  <td className="font-bold table-highlight-text">{yarn.countSpec}</td>
                  <td>{yarn.region}</td>
                  <td className="text-right font-bold text-on-surface">₹{formatPrice(yarn.price, true)}</td>
                  <td className="text-right font-bold table-highlight-text">₹{formatPrice(yarn.bagPrice, true)}</td>
                  <td>
                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-primary/10 table-highlight-text border border-emerald-500/20">
                      {yarn.trend}
                    </span>
                  </td>
                  <td className="text-on-surface-variant font-sans font-medium">{yarn.application}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Strategic Blending & Future Planning */}
      <div className="glass-card rounded-xl p-6 space-y-4">
        <div>
          <h3 className="text-sm font-headline font-bold text-primary mb-2">Strategic Blending & Future Non-Cotton Planning</h3>
          <p className="text-sm leading-relaxed text-on-surface-variant font-medium">
            {data.nonCotton.planning}
          </p>
        </div>
        <div className="bg-tertiary-container/10 border-l-4 border-tertiary p-4 rounded-r-lg">
          <span className="text-xs leading-relaxed text-on-surface-variant font-mono font-bold block mb-1">Analyst Substitution Note:</span>
          <p className="text-xs text-on-surface-variant font-medium">
            PC blends represent a 32% cost savings relative to pure combed yarns. Garment companies serving mid-range domestic retail should transition to 60/40 blends to secure operating margins through Q3-Q4.
          </p>
        </div>
      </div>

      {/* Non-Cotton Fiber Reference & Classification Directory */}
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <Leaf className="text-primary" size={20} /> Non-Cotton Fiber Reference & Classification Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.nonCotton.fiberCategories.map((cat, idx) => (
            <div key={idx} className="bg-surface-container-low border border-outline-variant rounded-lg p-5">
              <h4 className="text-xs font-headline font-bold text-primary border-b border-outline-variant pb-2 mb-3">
                {cat.category}
              </h4>
              <div className="space-y-3">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="text-xs leading-relaxed font-sans font-medium flex gap-2">
                    <strong className="font-mono text-[10px] px-1.5 py-0.5 glass-card border-transparent rounded text-on-surface h-fit whitespace-nowrap">
                      {item.name}
                    </strong>
                    <span className="text-on-surface-variant">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cotton vs Non-Cotton Comparison Chart & Analysis */}
      <div>
        <h3 className="text-lg font-headline font-black text-primary uppercase tracking-tight mb-4 border-b border-outline-variant pb-2">
          Cotton vs Non-Cotton Comparison Chart & Analysis
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {/* Line Chart */}
          <div className="glass-card rounded-xl p-6">
            <h4 className="text-sm font-headline font-bold text-primary mb-4">12-Month Price Comparison Trend (₹/kg)</h4>
            <div className="h-[350px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.comparison.monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" fontSize={10} />
                  <YAxis domain={['auto', 'auto']} fontSize={10} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-surface-container-high)',
                      borderColor: 'var(--color-outline-variant)',
                      borderRadius: '8px',
                      color: 'var(--color-on-surface)',
                      fontSize: '11px',
                      fontFamily: 'JetBrains Mono, monospace'
                    }}
                    formatter={(value) => `₹${value}`}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px' }} />
                  <Line type="monotone" dataKey="Cotton30s" stroke={colors.primary} strokeWidth={3} name="30s Combed Cotton Yarn (₹/kg)" />
                  <Line type="monotone" dataKey="Polyester30s" stroke={colors.tertiary} strokeWidth={2} name="30s Spun Polyester Yarn (₹/kg)" />
                  <Line type="monotone" dataKey="Viscose30s" stroke={colors.secondary} strokeWidth={2} name="30s Spun Viscose Yarn (₹/kg)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card rounded-xl p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-headline font-bold text-primary mb-4">Cotton-Yarn Price Parity</h4>
              <div className="h-[210px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.parity}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" fontSize={10} />
                    <YAxis domain={['auto', 'auto']} fontSize={10} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Area type="monotone" dataKey="RawCotton" stackId="1" stroke={colors.tertiary} fill={colors.tertiary} fillOpacity={0.15} name="Raw Cotton Cost" />
                    <Area type="monotone" dataKey="FinishedYarn" stackId="2" stroke={colors.primary} fill={colors.primary} fillOpacity={0.15} name="Finished Yarn Cost" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-surface-container-low border border-outline-variant p-4 rounded-lg">
                <div className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Avg Price Spread</div>
                <div className="text-lg font-mono font-black text-primary mt-1">
                  ₹164 <span className="text-xs font-normal">/ kg</span>
                </div>
                <div className="text-[10px] text-on-surface-variant mt-1">Cotton vs Polyester</div>
              </div>
              <div className="bg-surface-container-low border border-outline-variant p-4 rounded-lg">
                <div className="text-[10px] font-headline font-bold text-on-surface-variant uppercase">Substitution Margin</div>
                <div className="text-lg font-mono font-black text-primary mt-1">55.8%</div>
                <div className="text-[10px] text-on-surface-variant mt-1">High blending preference</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h4 className="text-sm font-headline font-bold text-primary mb-2">Cotton & Non-Cotton Yarn Market Strategy Comparison Summary</h4>
        <p className="text-xs leading-relaxed text-on-surface-variant font-medium">
          Pure cotton counts represent premium apparel segments where raw cotton's spot convergence around ₹65,100 directly controls mill margins. Meanwhile, synthetic and blended yarns (Polyester and Viscose counts) are highly linked to oil base-costs and synthetic feedstock margins, providing a crucial lower-cost alternative during cotton crop shortfalls. Tracking the price ratio between 30s Cotton and 30s Polyester/Viscose is the key industry method for sizing substitution rates in domestic weaving clusters.
        </p>
      </div>
    </div>
  );
}

export default App;

function AnalysisDashboard({ darkMode, colors }) {
  const [subTab, setSubTab] = useState('cotton'); // 'cotton', 'yarn', 'macro'
  const [selectedCotton, setSelectedCotton] = useState('Shankar-6 (S-6)');
  const [selectedYarn, setSelectedYarn] = useState('30s Combed');

  const currentCotton = cottonAnalysis.data[selectedCotton];
  const currentYarn = yarnAnalysis.data[selectedYarn];

  return (
    <div className="space-y-gutter">
      {/* Stitch Hero Image Banner for Analysis */}
      <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-xl bg-surface-container-low flex flex-col md:flex-row items-center justify-center p-8 gap-12">
        <div className="flex-1 max-w-lg z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Structural Scan</span>
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-black text-on-surface mb-4">400x Magnification</h2>
          <p className="font-body text-sm text-on-surface-variant">Real-time Optical Analysis of Cotton Fiber Structures</p>
        </div>
        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] lens-effect shrink-0">
          <img className="w-full h-full object-cover scale-[3] hover:scale-[3.5] transition-transform duration-[2s] ease-linear" src="/basml-cotton-yarn-dashboard/cotton_microscope_scan.png" alt="Microscope Lens" />
          <div className="absolute inset-0 border-2 border-primary/30 rounded-full animate-pulse pointer-events-none"></div>
        </div>
      </div>

      {/* Slide Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-headline font-black tracking-tight text-primary uppercase">
            Strategic Market Analysis & Forecasting
          </h2>
          <p className="font-mono text-xs text-on-surface-variant mt-1">Cross-market commodity analytics, hedging models, and infrastructure plans</p>
        </div>
        
        {/* Navigation Selector */}
        <div className="bg-surface-container border border-outline-variant p-1 rounded-xl flex gap-1 self-start md:self-auto">
          <button 
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'cotton' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('cotton')}
          >
            1. Cotton Futures & Procurement
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'yarn' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('yarn')}
          >
            2. Yarn Market & Forecasting
          </button>
          <button 
            className={`px-4 py-2 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'macro' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('macro')}
          >
            3. Global Incidents & Growth Plans
          </button>
        </div>
      </div>

      {subTab === 'cotton' && (
        <div className="space-y-gutter">
          {/* Cotton variety filter selector */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-bold text-on-surface-variant block mb-2 tracking-wider">FILTER COTTON VARIETY</span>
                <div className="flex flex-wrap gap-2">
                  {cottonAnalysis.types.map((type) => (
                    <button
                      key={type}
                      className={`py-2 px-4 rounded-lg text-xs font-headline font-bold transition-all duration-200 border ${
                        selectedCotton === type 
                          ? 'bg-primary text-on-primary border-primary' 
                          : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-high'
                      }`}
                      onClick={() => setSelectedCotton(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[280px] lg:pl-6 lg:border-l-2 lg:border-primary">
                <h4 className="text-sm font-headline font-bold text-primary mb-1">{selectedCotton} Profile</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {currentCotton.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold mt-2">
                  <span className="text-secondary">Staple Length: {currentCotton.staple}</span>
                  <span className="text-tertiary">Major Origin: {currentCotton.origin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* DAY-WISE PROCUREMENT PLAN */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">calendar_today</span>
                {selectedCotton} Day-Wise Purchase Plan & Price Forecast
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[350px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Date</th>
                      <th className="text-right">Target (Bales)</th>
                      <th className="text-right">Est Price (₹/Candy)</th>
                      <th className="text-right">Buy Trigger (₹)</th>
                      <th>Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCotton.dayWisePlan.map((d, i) => (
                      <tr key={i}>
                        <td className="font-bold">{d.day}</td>
                        <td>{d.date}</td>
                        <td className="text-right font-bold text-on-surface">{d.targetBales.toLocaleString()}</td>
                        <td className="text-right font-bold">₹{formatPrice(d.priceForecast, true).split('.')[0]}</td>
                        <td className="text-right font-bold table-highlight-text">₹{formatPrice(d.triggerLevel, true).split('.')[0]}</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block border ${
                            d.recommendation.includes('Aggressive') || d.recommendation.includes('Buy')
                              ? 'bg-primary/10 table-highlight-text border-emerald-500/20'
                              : d.recommendation.includes('Hold') || d.recommendation.includes('Wait')
                              ? 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
                              : 'bg-tertiary/10 table-highlight-text border-emerald-500/20'
                          }`}>
                            {d.recommendation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">bar_chart</span>
                {selectedCotton} Day-Wise Target Purchasing Volumes
              </h3>
              <div className="h-[320px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={currentCotton.dayWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" fontSize={10} />
                    <YAxis yAxisId="left" fontSize={10} label={{ value: 'Target Bales', angle: -90, position: 'insideLeft', offset: -5 }} />
                    <YAxis yAxisId="right" orientation="right" fontSize={10} domain={['auto', 'auto']} tickFormatter={(val) => `₹${val}`} label={{ value: 'Price (₹/Candy)', angle: 90, position: 'insideRight', offset: 10 }} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar yAxisId="left" dataKey="targetBales" fill={colors.primary} name="Target Purchase Quantity (Bales)" barSize={20} radius={[2, 2, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="priceForecast" stroke={colors.tertiary} strokeWidth={3} name="Price Trend (₹/Candy)" dot={true} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* MONTH-WISE STRATEGIC BUDGET */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">currency_rupee</span>
                {selectedCotton} Month-Wise Budget & Hedging Ratios
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[320px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th className="text-right">Target Bales</th>
                      <th className="text-right">Avg Price (₹/Candy)</th>
                      <th className="text-right">Budget (₹ Cr)</th>
                      <th className="text-right">Hedging Ratio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCotton.monthWisePlan.map((m, i) => (
                      <tr key={i}>
                        <td className="font-bold">{m.month}</td>
                        <td className="text-right font-bold">{m.targetBales.toLocaleString()}</td>
                        <td className="text-right">₹{formatPrice(m.avgPrice, true).split('.')[0]}</td>
                        <td className="text-right font-bold table-highlight-text">₹{m.allocatedBudgetCr} Cr</td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-mono text-xs">{m.hedgingRatio}%</span>
                            <div className="w-16 h-1.5 glass-card border-transparent rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${m.hedgingRatio}%` }}></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">pie_chart</span>
                {selectedCotton} Monthly Budget vs Hedging Ratio
              </h3>
              <div className="h-[280px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={currentCotton.monthWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" fontSize={10} />
                    <YAxis yAxisId="left" fontSize={10} label={{ value: 'Budget (₹ Crore)', angle: -90, position: 'insideLeft', offset: -5 }} />
                    <YAxis yAxisId="right" orientation="right" fontSize={10} domain={[0, 100]} tickFormatter={(val) => `${val}%`} label={{ value: 'Hedging Ratio (%)', angle: 90, position: 'insideRight', offset: 10 }} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar yAxisId="left" dataKey="allocatedBudgetCr" fill={colors.primaryContainer} name="Budget Allocation (₹ Cr)" barSize={20} radius={[2, 2, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="hedgingRatio" stroke={colors.primary} strokeWidth={3} name="Hedging Ratio (%)" dot={true} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* YEAR-WISE OUTLOOK & RISK FACTORS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">trending_up</span>
                {selectedCotton} Long-Term Annual Purchase Outlook
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg">
                <table>
                  <thead>
                    <tr>
                      <th>Crop Year</th>
                      <th className="text-right">Purchase Volume (Lakh Bales)</th>
                      <th className="text-right">Est Avg Price (₹/Candy)</th>
                      <th className="text-right">National Supply (Lakh Bales)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentCotton.yearWisePlan.map((y, i) => (
                      <tr key={i}>
                        <td className={`font-bold ${y.year.includes('Proj') || y.year.includes('Est') ? 'table-highlight-text font-bold' : 'text-on-surface'}`}>{y.year}</td>
                        <td className="text-right font-bold">{y.totalPurchaseBales} Lakh Bales</td>
                        <td className="text-right">₹{formatPrice(y.estPrice, true).split('.')[0]}</td>
                        <td className="text-right font-bold text-on-surface-variant">{y.productionOutlook} Lakh Bales</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">analytics</span>
                {selectedCotton} Specific Price Driving Factors
              </h3>
              <div className="h-[260px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentCotton.affectingFactors} layout="vertical" margin={{ left: 10, right: 30 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" fontSize={10} domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                    <YAxis dataKey="factor" type="category" fontSize={9} width={130} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-surface-container-high)',
                        borderColor: 'var(--color-outline-variant)',
                        borderRadius: '8px',
                        color: 'var(--color-on-surface)',
                        fontSize: '11px',
                        fontFamily: 'JetBrains Mono, monospace'
                      }}
                      formatter={(value) => [`${value}% Influence`, 'Weight']}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar dataKey="weight" name="Price Sensitivity Weight (%)" barSize={24} radius={[0, 2, 2, 0]}>
                      {currentCotton.affectingFactors.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors.chartPalette[index % colors.chartPalette.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'yarn' && (
        <div className="space-y-gutter">
          {/* Yarn count variety filter selector */}
          <div className="glass-card rounded-xl p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono font-bold text-on-surface-variant block mb-2 tracking-wider">FILTER YARN COUNT TYPE</span>
                <div className="flex flex-wrap gap-2">
                  {yarnAnalysis.types.map((type) => (
                    <button
                      key={type}
                      className={`py-2 px-4 rounded-lg text-xs font-headline font-bold transition-all duration-200 border ${
                        selectedYarn === type 
                          ? 'bg-primary text-on-primary border-primary' 
                          : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-high'
                      }`}
                      onClick={() => setSelectedYarn(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1 min-w-[280px] lg:pl-6 lg:border-l-2 lg:border-primary">
                <h4 className="text-sm font-headline font-bold text-primary mb-1">{selectedYarn} Characteristics</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {currentYarn.description}
                </p>
                <div className="text-xs font-mono font-bold text-primary mt-2">
                  Ne Count Category: {currentYarn.count}
                </div>
              </div>
            </div>
          </div>

          {/* DAY-WISE YARN PROCUREMENT PLAN */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">calendar_today</span>
                {selectedYarn} Day-Wise Purchase Plan & Spot Parity Forecast
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[350px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Day</th>
                      <th>Date</th>
                      <th>Yarn Count</th>
                      <th className="text-right">Target Qty (Kg)</th>
                      <th className="text-right">Spot Price (₹/kg)</th>
                      <th className="text-right">Margin Spread (₹/kg)</th>
                      <th>Recommendation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentYarn.dayWisePlan.map((d, i) => (
                      <tr key={i}>
                        <td className="font-bold">{d.day}</td>
                        <td>{d.date}</td>
                        <td className="font-bold table-highlight-text">{currentYarn.count.split(' ')[0]}</td>
                        <td className="text-right font-bold">{d.targetQtyKg.toLocaleString()}</td>
                        <td className="text-right font-bold">₹{d.currentPrice}</td>
                        <td className="text-right font-extrabold table-highlight-text">₹{d.marginSpread}</td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block border ${
                            d.recommendation.includes('Wait')
                              ? 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
                              : d.recommendation.includes('Aggressive')
                              ? 'bg-primary/10 table-highlight-text border-emerald-500/20'
                              : 'bg-tertiary/10 table-highlight-text border-emerald-500/20'
                          }`}>
                            {d.recommendation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">bar_chart</span>
                {selectedYarn} Day-Wise Purchase Target Volumes & Margins
              </h3>
              <div className="h-[320px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={currentYarn.dayWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="day" fontSize={10} />
                    <YAxis yAxisId="left" fontSize={10} label={{ value: 'Target Qty (Kg)', angle: -90, position: 'insideLeft', offset: -5 }} />
                    <YAxis yAxisId="right" orientation="right" fontSize={10} domain={['auto', 'auto']} label={{ value: 'Margin Spread (₹/kg)', angle: 90, position: 'insideRight', offset: 10 }} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Bar yAxisId="left" dataKey="targetQtyKg" fill={colors.primaryContainer} name="Target Purchase (Kg)" barSize={20} radius={[2, 2, 0, 0]} />
                    <Line yAxisId="right" type="monotone" dataKey="marginSpread" stroke={colors.primary} strokeWidth={3} name="Margin Spread (₹/kg)" dot={true} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* MONTH-WISE DEMAND AND CONTAINER FORECAST */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">receipt_long</span>
                {selectedYarn} Month-Wise Demand & Projected Export Containers
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg max-h-[320px] overflow-y-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th className="text-right">Combed/Compact Demand Index</th>
                      <th className="text-right">Blended/Synthetic Demand Index</th>
                      <th className="text-right">Avg Price (₹/kg)</th>
                      <th className="text-right">Export Shipments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentYarn.monthWisePlan.map((m, i) => (
                      <tr key={i}>
                        <td className="font-bold">{m.month}</td>
                        <td className="text-right font-bold table-highlight-text">{m.combedCompactDemand} / 100</td>
                        <td className="text-right text-on-surface-variant">{m.blendedYarnDemand} / 100</td>
                        <td className="text-right font-bold">₹{m.avgYarnPriceKg} / kg</td>
                        <td className="text-right font-extrabold table-highlight-text">{m.exportOrdersContainer} Containers</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">show_chart</span>
                {selectedYarn} Monthly Demand Index Trends
              </h3>
              <div className="h-[280px] font-mono">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentYarn.monthWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" fontSize={10} />
                    <YAxis fontSize={10} domain={[0, 100]} />
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
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <Line type="monotone" dataKey="combedCompactDemand" stroke={colors.primary} strokeWidth={3} name="Combed/Compact Demand Index" dot={true} />
                    <Line type="monotone" dataKey="blendedYarnDemand" stroke={colors.tertiary} strokeWidth={2} name="Polyester/Viscose Blended Demand Index" dot={true} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* YEAR-WISE OUTLOOK & PRODUCT YARN GROWTH RATES */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">trending_up</span>
                {selectedYarn} Long-Term Demand & Spinner Spread Outlook
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg">
                <table>
                  <thead>
                    <tr>
                      <th>Crop Year</th>
                      <th className="text-right">Domestic Demand (M Kgs)</th>
                      <th className="text-right">Export Demand (M Kgs)</th>
                      <th className="text-right">Avg Spinner Spread (₹/kg)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentYarn.yearWisePlan.map((y, i) => (
                      <tr key={i}>
                        <td className={`font-bold ${y.year.includes('Proj') || y.year.includes('Est') ? 'table-highlight-text' : 'text-on-surface'}`}>{y.year}</td>
                        <td className="text-right">{y.domesticDemandMkg.toLocaleString()} M Kgs</td>
                        <td className="text-right font-bold">{y.exportDemandMkg.toLocaleString()} M Kgs</td>
                        <td className="text-right font-extrabold table-highlight-text">₹{y.avgSpreadKg} / kg</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6">
              <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-xl">donut_large</span>
                Global Yarn Count Growth & Market Breakdown Overview
              </h3>
              <div className="overflow-x-auto border border-outline-variant rounded-lg">
                <table>
                  <thead>
                    <tr>
                      <th>Yarn Count Category</th>
                      <th>YoY Growth</th>
                      <th className="text-right">Market Value (₹ Cr)</th>
                      <th className="text-right">Market Share</th>
                      <th>Sector Outlook</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yarnAnalysis.typeGrowth.map((g, i) => (
                      <tr key={i}>
                        <td className="font-bold text-on-surface">{g.type}</td>
                        <td className={`font-bold ${g.growthRate.startsWith('+') ? 'table-highlight-text' : 'table-highlight-text'}`}>{g.growthRate}</td>
                        <td className="text-right">₹{g.marketValueCr.toLocaleString()} Cr</td>
                        <td className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <span className="font-mono text-xs">{g.marketShare}%</span>
                            <div className="w-12 h-1.5 glass-card border-transparent rounded-full overflow-hidden">
                              <div className="h-full bg-primary" style={{ width: `${g.marketShare}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block border ${
                            g.outlook.includes('Highly') || g.outlook.includes('Bullish')
                              ? 'bg-primary/10 table-highlight-text border-emerald-500/20'
                              : g.outlook.includes('Bearish')
                              ? 'bg-tertiary/10 table-highlight-text border-emerald-500/20'
                              : 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
                          }`}>
                            {g.outlook}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* NEW IDEAS & PLANS IN INDIA AND TAMIL NADU */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-2xl">lightbulb</span>
              Strategic Infrastructure Initiatives: India & Tamil Nadu
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <div className="glass-card border-transparent p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-primary mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">domain</span>
                    PM MITRA Greenfield Integrated Textile Park (Virudhunagar, TN)
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    Spanning over 1,000 acres, this project brings integrated weaving, processing, and printing infrastructure to Southern Tamil Nadu. Setup units qualify for capital subsidies, logistics credits, and simplified compliance. Operating inside the park cuts external transportation costs by 12% and links spinners directly with downstream export weavers.
                  </p>
                </div>
              </div>
              <div className="glass-card border-transparent p-5 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-mono font-bold text-tertiary mb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-base">bolt</span>
                    Tamil Nadu Green Energy Corridor Grid Subsidies
                  </h4>
                  <p className="text-xs text-on-surface-variant leading-relaxed">
                    To support mills converting to renewable power, the state government offers grid-interconnection subsidies for wind/solar setups. Captive wind generation projects can wheel energy directly to spinning sites, dropping industrial tariffs from ₹7.5/unit to ₹4.5/unit, which boosts net operating margins by 4.5% to 5%.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'macro' && (
        <div className="space-y-gutter">
          {/* GLOBAL INCIDENTS TABLE */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">globe</span>
              Global News, Incidents & Macro-Economic Impacts
            </h3>
            <div className="overflow-x-auto border border-outline-variant rounded-lg">
              <table>
                <thead>
                  <tr>
                    <th style={{ width: '20%' }}>Global Incident</th>
                    <th style={{ width: '15%' }}>Affected Segment</th>
                    <th style={{ width: '35%' }}>Macro Affecting Factor & Channel</th>
                    <th style={{ width: '20%' }}>Yarn Price & Movement Influence</th>
                    <th style={{ width: '10%' }}>Impact Level</th>
                  </tr>
                </thead>
                <tbody>
                  {globalIncidents.map((inc, i) => (
                    <tr key={i}>
                      <td className="font-bold text-on-surface">{inc.incident}</td>
                      <td>
                        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full glass-card border-transparent text-on-surface">
                          {inc.impactCategory}
                        </span>
                      </td>
                      <td className="text-xs text-on-surface-variant leading-relaxed">{inc.affectingFactor}</td>
                      <td className="text-xs font-semibold table-highlight-text leading-relaxed">{inc.yarnMovement}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block border ${
                          inc.impactScore === 'Critical'
                            ? 'bg-tertiary/10 table-highlight-text border-emerald-500/20'
                            : inc.impactScore === 'High'
                            ? 'bg-primary/10 table-highlight-text border-emerald-500/20'
                            : 'bg-outline-variant/20 text-on-surface-variant border-outline-variant/30'
                        }`}>
                          {inc.impactScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ACTIONABLE STRATEGIES FOR GROWTH */}
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">rocket_launch</span>
              Actionable Margin & Growth Recommendations (How to Increase Growth)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              {strategicGrowth.map((strategy, idx) => (
                <div key={idx} className="glass-card border-transparent p-5 rounded-xl flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-sm font-headline font-bold text-on-surface">
                        {idx + 1}. {strategy.action}
                      </h4>
                      <span className="text-[10px] font-mono font-bold bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20">
                        {strategy.executionTimeframe}
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      <strong>Rationale:</strong> {strategy.rationale}
                    </p>
                  </div>
                  <div className="text-xs font-mono font-bold bg-primary-container/20 text-primary p-3 rounded-lg border border-primary/20">
                    📈 Expected Result: {strategy.expectedYield}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DataSourcesDashboard({ data, darkMode, colors }) {
  const [selectedApi, setSelectedApi] = useState('agmarknet');
  const [apiResponse, setApiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Sources (48)' },
    { id: 'global', label: 'Global Intelligence' },
    { id: 'india-govt', label: 'India Government' },
    { id: 'associations', label: 'Trade Associations' },
    { id: 'exchanges', label: 'Exchanges & Futures' },
    { id: 'tamil-nadu', label: 'Tamil Nadu Specific' },
    { id: 'news', label: 'News & Real-Time' },
    { id: 'apis', label: 'API Integrations' }
  ];

  const sources = [
    // Global Sources
    { category: 'global', name: 'USDA WASDE (World Agricultural Supply and Demand Estimates)', type: 'Global cotton S&D balance, ending stocks', update: 'Monthly (every 2nd week)', link: 'https://www.usda.gov/oce/commodity/wasde', note: 'Free API & monthly PDF updates.' },
    { category: 'global', name: 'USDA FAS (Foreign Agricultural Service) — India Reports', type: 'India cotton production & consumption forecasts', update: 'Monthly + special GAIN reports', link: 'https://apps.fas.usda.gov/newgainapi/api/Report/DownloadReportByFileName?fileName=Cotton+and+Products+Annual_New+Delhi_India_IN2025-0020.pdf', note: 'Comprehensive country agricultural profiling.' },
    { category: 'global', name: 'ICAC (International Cotton Advisory Committee)', type: 'Global trade flows, price indices, country reports', update: 'Monthly / Annual', link: 'https://icac.org', note: 'Provides deep macro statistics and global trade analytics.' },
    { category: 'global', name: 'Cotlook Ltd — Cotlook A & B Index', type: 'Daily benchmark cotton price index (A Index)', update: 'Daily', link: 'https://cotlook.com', note: 'Primary global pricing index. Paid subscription required for full data.' },
    { category: 'global', name: 'World Bank Commodity Price Data (Pink Sheet)', type: 'Historical cotton prices, commodity index trends', update: 'Monthly', link: 'https://www.worldbank.org/en/research/commodity-markets', note: 'Excellent source for long-term historical analysis.' },
    { category: 'global', name: 'FAO (Food and Agriculture Organization)', type: 'Global cotton acreage, production, and farm yield data', update: 'Annual', link: 'https://www.fao.org/faostat/en/#data/QCL', note: 'Standard United Nations crop database.' },
    { category: 'global', name: 'ICE Futures U.S. — NY Cotton Futures', type: 'Real-time NY cotton futures pricing (CT contracts)', update: 'Real-time (Market hours)', link: 'https://www.theice.com/products/254/Cotton-No-2-Futures', note: 'Leading global derivatives market benchmark.' },

    // India Government Portals
    { category: 'india-govt', name: 'CAI — Cotton Association of India', type: 'India S&D balance sheets, cotton arrivals, ICS 105 index', update: 'Weekly', link: 'https://caionline.in', note: 'REPLACES CAB. The primary India cotton supply/demand consensus agency.' },
    { category: 'india-govt', name: 'CCI — Cotton Corporation of India', type: 'MSP price levels, official procurement volume, stock auctions', update: 'Weekly', link: 'https://cotcorp.org.in', note: 'Central government nodal agency managing MSP purchases.' },
    { category: 'india-govt', name: 'Agmarknet — Agricultural Marketing Information Network', type: 'Daily mandi (APMC) raw cotton arrivals & transaction prices', update: 'Daily', link: 'https://agmarknet.gov.in', note: 'Tracks farmgate Kapas arrivals across all active Indian mandis.' },
    { category: 'india-govt', name: 'Ministry of Textiles — Textile Commissioner India', type: 'Yarn & fabric production indices, spindle capacities', update: 'Monthly (2-3 months delay)', link: 'https://texmin.nic.in', note: 'Official government textile sector statistics repository.' },
    { category: 'india-govt', name: 'DGCI&S — Directorate General of Commercial Intelligence', type: 'India cotton & yarn export/import data (HS 5201 - 5207)', update: 'Monthly', link: 'https://tradestat.commerce.gov.in', note: 'Vital for tracking yarn exports to Bangladesh and China.' },
    { category: 'india-govt', name: 'Ministry of Agriculture — Advance Crop Estimates', type: 'Kharif crop acreage and production estimates', update: '4 times per year', link: 'https://agricoop.nic.in/en/statisticsatglance', note: 'Sowing estimates released under Crop Forecast Coordination Committee.' },
    { category: 'india-govt', name: 'IMD — India Meteorological Department', type: 'Monsoon progress reports, temperature and rainfall alerts', update: 'Daily', link: 'https://mausam.imd.gov.in', note: 'Critical for predicting early Gujarat/Maharashtra sowing parity.' },
    { category: 'india-govt', name: 'Open Government Data Platform India (data.gov.in)', type: 'Historical CAB cotton production state-wise datasets', update: 'Irregular', link: 'https://data.gov.in', note: 'Downloadable CSV/JSON datasets for research.' },
    { category: 'india-govt', name: 'RBI — Reserve Bank of India (Commodity Monitor)', type: 'Exchange rates (USD/INR) & wholesale price inflation indices', update: 'Daily / Weekly', link: 'https://dbie.rbi.org.in/DBIE/dbie.rbi?site=publications', note: 'Reference database for financial pricing integrations.' },

    // Trade Associations
    { category: 'associations', name: "SIMA — Southern India Mills' Association", type: 'Tamil Nadu yarn pricing cards, local cotton costs, policies', update: 'Weekly / Monthly', link: 'https://www.simamills.in', note: 'Coimbatore-based agency representing South Indian spinning interests.' },
    { category: 'associations', name: 'TEXPROCIL — Cotton Textiles Export Promotion Council', type: 'Cotton yarn count-wise and destination export metrics', update: 'Monthly', link: 'https://texprocil.org', note: 'Promotes Indian yarn exports and tracks shipping statistics.' },
    { category: 'associations', name: 'CITI — Confederation of Indian Textile Industry', type: 'National textile production indices and raw material trends', update: 'Monthly / Quarterly', link: 'https://citi.in', note: 'Peak trade body representing the entire cotton-to-apparel value chain.' },
    { category: 'associations', name: 'AEPC — Apparel Export Promotion Council', type: 'Garment shipping analytics and downstream apparel demand', update: 'Monthly', link: 'https://www.aepc.in', note: 'Leading export council tracking apparel shipments.' },
    { category: 'associations', name: 'ITAMMA — Indian Textile Accessories Manufacturers', type: 'Spindle machinery and infrastructure manufacturing capacity', update: 'Annual', link: 'https://www.itamma.org', note: 'Accessories and manufacturing capacity statistics.' },

    // Exchanges & Futures
    { category: 'exchanges', name: 'MCX India — Multi Commodity Exchange', type: 'Real-time cotton futures, volumes, open interest, price feeds', update: 'Real-time (9 AM - 11:30 PM IST)', link: 'https://www.mcxindia.com', note: 'Primary derivatives exchange for domestic raw cotton hedging.' },
    { category: 'exchanges', name: 'NSE India — National Stock Exchange', type: 'Commodity futures, cotton contracts', update: 'Real-time', link: 'https://www.nseindia.com/market-data/commodity-derivatives', note: 'Alternative exchange for futures trading.' },
    { category: 'exchanges', name: 'Barchart.com (ICE Delayed Futures)', type: 'ICE Cotton (CT) delayed charts, historical contract feeds', update: '10-minute delay', link: 'https://www.barchart.com/futures/quotes/CT*0/interactive-chart', note: 'Free charting library for global cotton indexes.' },
    { category: 'exchanges', name: 'Investing.com — Cotton Futures Portal', type: 'ICE futures, MCX cotton contracts, and global crop news', update: 'Continuous', link: 'https://www.investing.com/commodities/us-cotton-no.2', note: 'Aggregated news and commodity spot price dashboard.' },

    // Tamil Nadu Specific
    { category: 'tamil-nadu', name: 'Tamil Nadu Textile Parks Corporation (TNTCAPC)', type: 'Greenfield textile parks, captive wind/solar grid schemes', update: 'Irregular', link: 'https://www.tntextile.tn.gov.in', note: 'Tracks PM MITRA Virudhunagar cluster developments.' },
    { category: 'tamil-nadu', name: "Tiruppur Exporters' Association (TEA)", type: 'Knitwear export statistics, local yarn utilization indices', update: 'Monthly', link: 'https://www.teaonline.in', note: 'Downstream demand tracker for Tirupur knitting clusters.' },
    { category: 'tamil-nadu', name: 'SIMA Coimbatore (TN Yarn Price Office)', type: 'Coimbatore Race Course direct yarn pricing office', update: 'Continuous', link: 'https://www.simamills.in', note: 'Race Course HQ, Coimbatore. Prime reference for TN spinner spreads.' },
    { category: 'tamil-nadu', name: 'Tamil Nadu Government — Industries Department', type: 'TN industrial output indices and textile park allocation data', update: 'Annual / Press release', link: 'https://www.tn.gov.in', note: 'Official government department overseeing state textile policies.' },
    { category: 'tamil-nadu', name: 'DRIP — District Resources for Industry Profile', type: 'Coimbatore district mill registries and active spindle profiles', update: 'Annual', link: 'https://www.dic.tn.gov.in', note: 'Database on local MSME spinning setups.' },

    // News & Real-Time
    { category: 'news', name: 'Fibre2Fashion — Textile Intelligence Watch', type: 'Cotton & yarn pricing indices, global trade policy updates', update: 'Continuous', link: 'https://www.fibre2fashion.com/market-intelligence/textile-market-watch', note: 'Primary industry publication for textile spot prices.' },
    { category: 'news', name: 'TextileExchange.org', type: 'Organic and sustainable cotton acreage and GOTS outputs', update: 'Annual / Reports', link: 'https://textileexchange.org/insights/', note: 'Benchmark authority on certified organic cotton statistics.' },
    { category: 'news', name: 'Yarns & Fibers News (India)', type: 'India yarn market news, daily price movements', update: 'Daily', link: 'https://www.yarnsandfibers.com', note: 'Specialized domestic trading news portal.' },
    { category: 'news', name: 'Cotton Outlook (Cotlook News)', type: 'Global cotton news and supply chain commentaries', update: 'Continuous', link: 'https://cotlook.com/news/', note: 'Top-tier analysis articles on international crops.' },
    { category: 'news', name: 'Business Standard — Commodities', type: 'MCX cotton price news, national commodity updates', update: 'Daily', link: 'https://www.business-standard.com/commodity/cotton', note: 'Financial newspaper covering agricultural markets.' },
    { category: 'news', name: 'Economic Times — Commodities', type: 'Domestic yarn and fiber policy news', update: 'Daily', link: 'https://economictimes.indiatimes.com/commodities', note: 'India financial daily tracking mandi volumes.' },
    { category: 'news', name: 'Reuters Commodities', type: 'Global agricultural commodities news, shipping logistics', update: 'Continuous', link: 'https://www.reuters.com/markets/commodities/', note: 'International wire covering global crop balances.' },

    // API Integrations
    { category: 'apis', name: 'USDA PSD Online API', type: 'Global and India cotton production, supply, and demand JSON', update: 'Monthly API Sync', link: 'https://apps.fas.usda.gov/psdonline/api/psd/commodity/0813100?reporterCode=0', note: 'FAS Public REST endpoint. Keyless access.' },
    { category: 'apis', name: 'Agmarknet Mandi Arrivals API', type: 'Daily mandi arrivals and minimum/maximum transaction costs', update: 'Daily scraping', link: 'https://agmarknet.gov.in', note: 'Automated data crawler mapping mandi raw prices.' },
    { category: 'apis', name: 'Open Data India API (data.gov.in)', type: 'Government advance estimates, crop datasets REST feed', update: 'Quarterly Sync', link: 'https://data.gov.in/user/register', note: 'Requires registering a free API key at government data portal.' },
    { category: 'apis', name: 'Alpha Vantage API', type: 'Commodity price index datasets, cotton spot contract prices', update: 'Daily API Ticks', link: 'https://www.alphavantage.co', note: 'Offers a free rate-limited tier (25 calls/day) for commodities.' },
    { category: 'apis', name: 'Quandl / Nasdaq Data Link', type: 'Historical ICE cotton price series, futures contract curves', update: 'Daily Sync', link: 'https://data.nasdaq.com/data/CHRIS/ICE_CT1', note: 'API dataset: `CHRIS/ICE_CT1`.' },
    { category: 'apis', name: 'MCX Data Feed (Paid Integration)', type: 'Real-time MCX raw cotton futures price ticks', update: 'Tick-by-tick (Real-time)', link: 'https://www.mcxindia.com/products-services/data-products', note: 'Official paid feed. Integrates via broker TCP/IP stream.' },

    // Government Portals (Additional)
    { category: 'apis', name: 'eNAM — National Agriculture Market', type: 'Pan-India electronic mandi bidding prices', update: 'Daily arrivals', link: 'https://www.enam.gov.in/web/', note: 'Government unified trading portal.' },
    { category: 'apis', name: 'Agri Market Intelligence Platform (AMIP)', type: 'Pre-harvest price forecast modeling', update: 'Seasonal updates', link: 'https://agrimarket.gov.in', note: 'State-sponsored market forecast engine.' },
    { category: 'apis', name: 'APEDA — Agricultural Products Export Authority', type: 'Agricultural export volumes and shipper databases', update: 'Monthly statistics', link: 'https://apeda.gov.in', note: 'Commerce Ministry authority promoting agricultural exports.' },
    { category: 'apis', name: 'Commodity Online India', type: 'Mandi spot arrivals, pricing summaries', update: 'Daily', link: 'https://www.commodityonline.com/commodity/cotton-price.html', note: 'General trading directory.' },
    { category: 'apis', name: 'Press Information Bureau (PIB) — Textiles', type: 'Ministry of Textiles official press releases and tariffs', update: 'Continuous', link: 'https://pib.gov.in', note: 'Nodal portal for textile subsidies and duty announcements.' }
  ];

  const handleTestApi = () => {
    setLoading(true);
    setApiResponse(null);
    setTimeout(() => {
      let mockJson = {};
      if (selectedApi === 'usda') {
        mockJson = {
          status: "success",
          source: "USDA PSD Online REST API",
          commodity: "Cotton",
          crop_year: "2025-26 (Est)",
          global_metrics: {
            supply_million_bales: data.globalCotton.balanceSheet.historical[4].supply,
            demand_million_bales: data.globalCotton.balanceSheet.historical[4].demand,
            production_million_bales: data.globalCotton.balanceSheet.historical[4].production,
            ending_stocks_million_bales: data.globalCotton.balanceSheet.historical[4].endingStocks
          },
          last_updated: new Date().toISOString()
        };
      } else if (selectedApi === 'agmarknet') {
        mockJson = {
          status: "success",
          source: "Agmarknet India Mandi API (Normalized)",
          commodity: "Raw Cotton (Kapas)",
          pricing_candy_basis: {
            consensus_spot_inr: 65100,
            average_price_kg: 182.87,
            gujarat_mandi_arrivals: "Active",
            maharashtra_mandi_arrivals: "Active"
          },
          active_mandi_states: data.indianCotton.stateProduction.map(s => s.state),
          last_updated: new Date().toISOString()
        };
      } else if (selectedApi === 'alphavantage') {
        mockJson = {
          status: "success",
          source: "Alpha Vantage Commodity API",
          symbol: "COTTON",
          unit: "cents/lb",
          interval: "daily",
          latest_price: {
            current_value: data.globalCotton.prices.types[1].current,
            forecast_value: data.globalCotton.prices.types[1].est,
            currency: "USD"
          },
          last_updated: new Date().toISOString()
        };
      } else if (selectedApi === 'datagov') {
        mockJson = {
          status: "success",
          source: "data.gov.in Advance Estimates API",
          category: "Kharif Crops - Cotton",
          national_balance_sheet: {
            total_production_lakh_bales: 290.91,
            ending_stocks_lakh_bales: 43.41,
            harvest_quality: "Verified S-6 / MCU-5 dominant"
          },
          state_wise_share: data.indianCotton.stateProduction.map(s => ({
            state: s.state,
            share_lakh_bales: s.production
          })),
          last_updated: new Date().toISOString()
        };
      }
      setApiResponse(mockJson);
      setLoading(false);
    }, 800);
  };

  const getCodeSnippet = () => {
    if (selectedApi === 'usda') {
      return `// JavaScript: Fetch global S&D data from USDA PSD API
async function fetchUsdaCottonData() {
  const url = 'https://apps.fas.usda.gov/psdonline/api/psd/commodity/0813100?reporterCode=0';
  const response = await fetch(url);
  const data = await response.json();
  console.log('Global Supply & Demand:', data);
}`;
    } else if (selectedApi === 'agmarknet') {
      return `# Python: Get daily APMC mandi arrivals for Kapas
import requests

def get_mandi_prices():
    url = "https://agmarknet.gov.in/api/arrivals/cotton"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        print("Today's Mandi Consensus:", data['pricing_candy_basis'])`;
    } else if (selectedApi === 'alphavantage') {
      return `// JavaScript: Get ICE Cotton futures pricing from Alpha Vantage
const apiKey = 'YOUR_FREE_KEY';
const url = \`https://www.alphavantage.co/query?function=COTTON&apikey=\${apiKey}\`;

fetch(url)
  .then(res => res.json())
  .then(json => console.log('Cotton Spot Price:', json.latest_price));`;
    } else if (selectedApi === 'datagov') {
      return `# Python: Fetch government advanced estimates from data.gov.in
import requests

api_key = "YOUR_GOVT_DATA_KEY"
url = f"https://api.data.gov.in/resource/cotton-production?api-key={api_key}&format=json"

res = requests.get(url).json()
print("National Crop Forecast:", res['national_balance_sheet'])`;
    }
  };

  const filteredSources = sources.filter(src => {
    if (selectedCategory !== 'all' && src.category !== selectedCategory) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return src.name.toLowerCase().includes(q) || 
             src.type.toLowerCase().includes(q) || 
             src.note.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-gutter">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-outline-variant">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-primary uppercase">Market Intelligence Sources & APIs</h2>
          <p className="text-sm text-on-surface-variant mt-1">48 official global, national, and state-level databases referenced in the consensus spot pricing model.</p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono font-bold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          Connected APIs: 6 Active REST Channels
        </div>
      </div>

      {/* Quick Summary Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card-table-orange p-4 rounded-xl neumorphic-raised text-center">
          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Total Registries</span>
          <div className="text-2xl font-black text-primary mt-1 font-headline">48 Sources</div>
        </div>
        <div className="card-table-orange p-4 rounded-xl neumorphic-raised text-center">
          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Free REST Access</span>
          <div className="text-2xl font-black text-primary mt-1 font-headline">12 APIs</div>
        </div>
        <div className="card-chart-green p-4 rounded-xl neumorphic-raised text-center">
          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Historical Timeframe</span>
          <div className="text-2xl font-black text-primary mt-1 font-headline font-semibold">10 Years</div>
        </div>
        <div className="card-chart-green p-4 rounded-xl neumorphic-raised text-center">
          <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Consensus Logic</span>
          <div className="text-2xl font-black text-primary mt-1 font-headline">Multilateral</div>
        </div>
      </div>

      {/* Developer API Console (Interactive Integration) */}
      <div className="card-table-orange rounded-xxl p-card-padding neumorphic-raised">
        <h3 className="text-lg font-headline font-bold text-primary mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined">api</span>
          Live Developer API Sandbox Explorer
        </h3>
        <p className="text-xs text-on-surface-variant mb-6 leading-relaxed">
          Simulate live fetches from our primary API integrations. Selecting an API endpoint and executing a request loads normalized data packets directly synchronized with our active React state.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <label className="text-xs font-mono font-bold text-on-surface-variant block mb-2">Select Live API Endpoint</label>
              <div className="space-y-2">
                {[
                  { id: 'agmarknet', label: 'Agmarknet Indian Mandi API', badge: 'Daily Spot' },
                  { id: 'usda', label: 'USDA PSD Cotton S&D API', badge: 'WASDE' },
                  { id: 'alphavantage', label: 'Alpha Vantage ICE Futures API', badge: 'Market' },
                  { id: 'datagov', label: 'data.gov.in Crop Estimates API', badge: 'National' }
                ].map(api => (
                  <button
                    key={api.id}
                    onClick={() => { setSelectedApi(api.id); setApiResponse(null); }}
                    className={`w-full text-left p-3 rounded-lg border text-xs font-mono transition-all flex items-center justify-between ${
                      selectedApi === api.id
                        ? 'bg-primary text-on-primary border-primary font-bold shadow-sm'
                        : 'bg-surface-container-high/40 text-on-surface border-outline-variant hover:bg-surface-container-high'
                    }`}
                  >
                    <span>{api.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      selectedApi === api.id ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                    }`}>{api.badge}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleTestApi}
              disabled={loading}
              className="w-full py-3 px-4 bg-primary hover:bg-primary-container text-on-primary font-headline font-bold text-xs rounded-lg transition-colors shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">{loading ? 'rotate_right' : 'send'}</span>
              {loading ? 'Fetching API Payload...' : 'Test Live API Fetch'}
            </button>
          </div>

          {/* Code & JSON Output */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
              {/* Code Snippet */}
              <div className="bg-surface-container-lowest border border-outline-variant/65 rounded-lg p-4 flex flex-col">
                <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block mb-2">Request Script</span>
                <pre className="text-[11px] font-mono text-outline leading-normal overflow-auto bg-surface-container-low/40 p-3 rounded-md flex-1 min-h-[140px] whitespace-pre-wrap">
                  {getCodeSnippet()}
                </pre>
              </div>

              {/* JSON Response */}
              <div className="bg-surface-container-lowest border border-outline-variant/65 rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block">Raw JSON Response</span>
                  {loading && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>}
                </div>
                <div className="bg-[#1e1e24] text-[#a5f3fc] text-[11px] font-mono p-3 rounded-md overflow-auto flex-1 min-h-[140px] max-h-[220px]">
                  {loading ? (
                    <div className="text-center py-8 text-on-primary-container/40">Loading payload...</div>
                  ) : apiResponse ? (
                    <pre className="whitespace-pre">{JSON.stringify(apiResponse, null, 2)}</pre>
                  ) : (
                    <div className="text-center py-8 text-[#9ba3af]/40">Execute "Test Live API Fetch" to trigger query simulations.</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Directory Filters & Search */}
      <div className="card-chart-green rounded-xl p-6 neumorphic-raised">
        <h3 className="text-base font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined">folder_open</span>
          Multilateral Reference Directory (48 Databases)
        </h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search databases by name, content, HS code or note..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-mono bg-surface-container-low border border-outline-variant rounded-lg text-on-surface focus:outline-none focus:border-primary placeholder-on-surface-variant/40"
            />
            <span className="material-symbols-outlined absolute left-3 top-3 text-on-surface-variant/50">search</span>
          </div>

          <div className="flex flex-wrap gap-1.5 items-center">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`py-2 px-3 rounded-lg text-xs font-mono font-medium border transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-on-primary border-primary font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant border-outline-variant hover:bg-surface-container-high'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Directory List */}
        <div className="overflow-x-auto border border-outline-variant rounded-lg">
          <table className="text-xs">
            <thead>
              <tr className="bg-surface-container-low">
                <th style={{ width: '5%' }}>No.</th>
                <th style={{ width: '35%' }}>Official Data Source</th>
                <th style={{ width: '25%' }}>Indexed Information</th>
                <th style={{ width: '12%' }}>Update Frequency</th>
                <th style={{ width: '23%' }}>Integration Detail & Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredSources.map((src, idx) => (
                <tr key={idx} className="hover:bg-primary/5 transition-all">
                  <td className="font-bold text-center">{idx + 1}</td>
                  <td>
                    <div className="font-bold text-on-surface flex items-center gap-1">
                      <a href={src.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors hover:underline flex items-center gap-1">
                        {src.name} <ExternalLink size={10} />
                      </a>
                    </div>
                  </td>
                  <td className="text-on-surface-variant font-medium leading-relaxed">{src.type}</td>
                  <td className="font-semibold text-primary">{src.update}</td>
                  <td className="text-xs text-on-surface-variant font-sans font-medium">{src.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}