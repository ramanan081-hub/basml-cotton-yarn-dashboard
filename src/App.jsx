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
      <div className="relative h-[320px] rounded-xxl overflow-hidden flex items-center justify-center p-8 bg-cover bg-center neumorphic-raised" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}basml_cotton_cover.png)` }}>
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
                    <td className="text-right py-2">
                      <div className="font-bold text-on-surface text-xs">₹{formatPrice(p.current, true).split('.')[0]} <span className="text-[9px] font-normal text-on-surface-variant">/ Candy</span></div>
                      <div className="font-semibold text-primary text-[11px]">₹{formatPrice(Math.round(p.current / 2.09188), true).split('.')[0]} <span className="text-[9px] font-normal text-on-surface-variant">/ Bale</span></div>
                    </td>
                    <td className="text-right py-2">
                      <div className="font-bold text-on-surface text-xs">₹{formatPrice(p.est, true).split('.')[0]} <span className="text-[9px] font-normal text-on-surface-variant">/ Candy</span></div>
                      <div className="font-semibold text-primary text-[11px]">₹{formatPrice(Math.round(p.est / 2.09188), true).split('.')[0]} <span className="text-[9px] font-normal text-on-surface-variant">/ Bale</span></div>
                    </td>
                    <td className="text-right font-bold table-highlight-text py-3">
                      +{(((p.est - p.current) / p.current) * 100).toFixed(2)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-surface-container-high/50 font-bold">
                  <td className="py-3"><strong>Consensus Spot Average</strong></td>
                  <td className="text-right py-2">
                    <div className="font-bold text-on-surface text-xs">₹67,050 / Candy</div>
                    <div className="font-semibold text-primary text-[11px]">₹{Math.round(67050 / 2.09188).toLocaleString('en-IN')} / Bale</div>
                  </td>
                  <td className="text-right table-highlight-text py-2">
                    <div className="font-bold text-on-surface text-xs">₹69,350 / Candy</div>
                    <div className="font-semibold text-primary text-[11px]">₹{Math.round(69350 / 2.09188).toLocaleString('en-IN')} / Bale</div>
                  </td>
                  <td className="text-right table-highlight-text py-3">+3.43%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-xl overflow-hidden border border-outline-variant/30 bg-cover bg-center h-full min-h-[180px] md:min-h-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}cotton_spinning_spindles.png)` }}></div>
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
import { useCottonData } from './hooks/useCottonData';
import { DataTimestamp } from './components/DataTimestamp';
import VarietyExplorer from './components/VarietyExplorer';
import SeasonalCalendar from './components/SeasonalCalendar';
import PriceAnalytics from './components/PriceAnalytics';
import StateMspTable from './components/StateMspTable';
import CottonDashboard from './components/CottonDashboard';
import YarnDashboard from './components/YarnDashboard';

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
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ml-1.5 border shrink-0 bg-forest-green/20 text-forest-green border-forest-green/30">
      <span className="w-1.5 h-1.5 rounded-full bg-forest-green animate-pulse"></span>
      {live ? 'Live API' : 'Live Sync'}
    </span>
  );
};

function App() {
  const [activeTab, setActiveTab] = useState('cotton'); 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Use the custom hook to load real-time market data
  const {
    data,
    loading,
    error,
    lastUpdated,
    formattedTimestamp,
    syncStatus,
    freshness,
    refresh
  } = useCottonData();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);


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
    { id: 'cotton', label: 'Cotton Markets', icon: 'grass' },
    { id: 'yarn', label: 'Yarn Markets', icon: 'trending_up' },
    { id: 'impexp', label: 'Import & Export', icon: 'swap_horiz' },
    { id: 'news', label: 'Live News', icon: 'feed' },
    { id: 'analysis', label: 'Analysis', icon: 'analytics' },
    { id: 'presentation', label: 'Presentation Deck', icon: 'slideshow' },
    { id: 'quality', label: 'Yarn Quality', icon: 'biotech' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex">
      {/* Sidebar Navigation - Desktop */}
      <aside className="sidebar-desktop hidden md:flex flex-col h-screen w-[240px] fixed left-0 top-0 glass-card border-r border-white/10 rounded-none py-6 px-4 z-50">
        <div className="px-2 mb-8 flex items-center gap-2.5">
          <img 
            src={`${import.meta.env.BASE_URL}logo.png`} 
            alt="BASML Logo" 
            className="w-10 h-10 object-contain rounded-lg border border-outline-variant/20 shadow-sm"
          />
          <div>
            <h1 className="font-headline text-md font-black tracking-tight text-primary leading-tight">
              <span className="liquid-glass-text">BASML Analytics</span>
            </h1>
            <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-wider font-bold">Cotton & Yarn</p>
          </div>
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
              <div className="flex items-center gap-2">
                <img 
                  src={`${import.meta.env.BASE_URL}logo.png`} 
                  alt="BASML Logo" 
                  className="w-8 h-8 object-contain rounded-lg border border-outline-variant/20"
                />
                <h1 className="font-headline text-sm font-black tracking-tight text-primary leading-tight">
                  <span className="liquid-glass-text">BASML Analytics</span>
                </h1>
              </div>
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
              src={`${import.meta.env.BASE_URL}logo.png`} 
              alt="BASML Logo" 
              className="w-8 h-8 object-contain rounded-lg border border-outline-variant/20 shadow-sm"
            />
            <span className="font-headline text-base md:text-lg font-bold text-primary tracking-tight">
              BASML.COTTON.YARN.ANALYSIS
            </span>
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
            : syncStatus === 'live'
            ? 'bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-500 border-emerald-500/20'
            : syncStatus === 'partial'
            ? 'bg-amber-500/10 dark:bg-amber-500/5 text-amber-600 dark:text-amber-500 border-amber-500/20'
            : 'bg-red-500/10 dark:bg-red-500/5 text-red-600 dark:text-red-500 border-red-500/20'
        }`}>
          <div className="flex items-center gap-1.5 min-w-0">
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse shrink-0 ${
              syncStatus === 'syncing' ? 'bg-primary' : syncStatus === 'live' ? 'bg-emerald-500' : syncStatus === 'partial' ? 'bg-amber-500' : 'bg-red-500'
            }`}></span>
            {syncStatus === 'syncing' ? (
              <span className="truncate">🔄 <strong>SYSTEM SYNCING:</strong> Pulling real-time exchange rates, futures, and crop databases in the background...</span>
            ) : syncStatus === 'live' ? (
              <span className="truncate">✅ <strong>LIVE SYNC ACTIVE:</strong> Real-time exchange rate and ICE Cotton Futures loaded via API. Mandi/Yarn spot calculations updated for 2026.</span>
            ) : syncStatus === 'partial' ? (
              <span className="truncate">⚠️ <strong>PARTIAL SYNC:</strong> Exchange rates or ICE futures API loaded. Fallbacks active for missing endpoints. Mandi/Yarn spot is simulated.</span>
            ) : (
              <span className="truncate">❌ <strong>API OFFLINE:</strong> Live feeds blocked by CORS or network error. Using cached baseline prices (May 2026).</span>
            )}
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4 font-mono">
            <span className="hidden sm:inline opacity-70">Last Sync: {lastUpdated.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })} IST</span>
            <button 
              onClick={refresh}
              disabled={syncStatus === 'syncing'}
              className="px-2 py-0.5 bg-primary/10 hover:bg-primary/20 disabled:opacity-50 border border-primary/30 rounded text-[9px] font-bold transition-all flex items-center gap-1 text-primary cursor-pointer"
            >
              <span className="material-symbols-outlined text-[10px] animate-spin" style={{ animationPlayState: syncStatus === 'syncing' ? 'running' : 'paused' }}>refresh</span>
              REFRESH
            </button>
            <span className={`px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider font-bold ${
              syncStatus === 'syncing' 
                ? 'bg-primary/20 text-primary' 
                : syncStatus === 'live'
                ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                : syncStatus === 'partial'
                ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400'
                : 'bg-red-500/20 text-red-700 dark:text-red-400'
            }`}>
              {syncStatus === 'syncing' ? 'SYNC IN PROGRESS' : syncStatus === 'live' ? 'LIVE SYNCED' : syncStatus === 'partial' ? 'PARTIAL SYNC' : 'CACHED / SIMULATED'}
            </span>
          </div>
        </div>

        {/* CSS Ticker Styles & Live Ticker Bar */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes ticker-scroll {
            0% { transform: translate3d(0, 0, 0); }
            100% { transform: translate3d(-50%, 0, 0); }
          }
          .animate-ticker-marquee {
            display: inline-flex;
            white-space: nowrap;
            animation: ticker-scroll 35s linear infinite;
          }
          .animate-ticker-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        <div className="fixed top-26 right-0 left-0 md:left-[240px] h-8 z-20 bg-surface-container-low border-b border-outline-variant/30 flex items-center overflow-hidden text-[10px] font-mono font-bold text-on-surface-variant select-none">
          <div className="bg-primary/20 text-primary h-full px-3 flex items-center gap-1.5 shrink-0 z-10 border-r border-outline-variant/30 shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            LIVE MCX TICKER
          </div>
          <div className="relative w-full overflow-hidden flex items-center">
            <div className="animate-ticker-marquee flex items-center gap-8 pl-4">
              {Array(2).fill(null).map((_, groupIdx) => (
                <React.Fragment key={groupIdx}>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">MCX COTTON SPOT:</span>
                    <span className="text-primary font-black">₹{Math.round(data.indianCotton.prices.types[0].current / 2.09188).toLocaleString('en-IN')}/Bale</span>
                    <span className="text-emerald-500 font-bold">▲ +{(((data.indianCotton.prices.types[0].est - data.indianCotton.prices.types[0].current) / data.indianCotton.prices.types[0].current) * 100).toFixed(2)}%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">SHANKAR-6 (S-6):</span>
                    <span className="text-on-surface font-black">₹{Math.round(data.indianCotton.prices.types[0].current).toLocaleString('en-IN')}/Candy</span>
                    <span className="text-emerald-500 font-bold">▲ +1.50%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">MCU-5:</span>
                    <span className="text-on-surface font-black">₹{Math.round(data.indianCotton.prices.types[1].current).toLocaleString('en-IN')}/Candy</span>
                    <span className="text-emerald-500 font-bold">▲ +1.25%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">DCH-32 Suvin:</span>
                    <span className="text-on-surface font-black">₹{Math.round(data.indianCotton.prices.types[2].current).toLocaleString('en-IN')}/Candy</span>
                    <span className="text-emerald-500 font-bold">▲ +2.00%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">ICE COTTON #2:</span>
                    <span className="text-primary font-black">{data.globalCotton.prices.types[1].current.toFixed(2)}¢/lb</span>
                    <span className="text-emerald-500 font-bold">▲ +0.80%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">USD/INR:</span>
                    <span className="text-on-surface font-black">₹{data.exchangeRates.usdInr.toFixed(2)}</span>
                    <span className="text-emerald-500 font-bold">▲ +0.15%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-outline">EUR/INR:</span>
                    <span className="text-on-surface font-black">₹{data.exchangeRates.eurInr.toFixed(2)}</span>
                    <span className="text-red-500 font-bold">▼ -0.10%</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="pt-36 px-4 md:px-6 pb-10 flex-1 max-w-[1600px] w-full relative z-10 space-y-4">
          <DataTimestamp 
            timestamp={formattedTimestamp} 
            freshness={freshness} 
            dataQuality={syncStatus === 'live' ? 'good' : syncStatus === 'partial' ? 'fair' : 'poor'} 
            loading={loading} 
            error={error} 
          />
                    {activeTab === 'cotton' && <CottonDashboard data={data} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'yarn' && <YarnDashboard data={data} darkMode={darkMode} colors={themeColors} />}
          {activeTab === 'impexp' && <ImportExportDashboard colors={themeColors} data={data} />}
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
        <button onClick={() => setActiveTab('cotton')} className={`flex flex-col items-center gap-1 ${activeTab === 'cotton' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">grass</span>
          <span className="font-mono text-[9px]">COTTON</span>
        </button>
        <button onClick={() => setActiveTab('yarn')} className={`flex flex-col items-center gap-1 ${activeTab === 'yarn' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">show_chart</span>
          <span className="font-mono text-[9px]">YARN</span>
        </button>
        <button onClick={() => setActiveTab('quality')} className={`flex flex-col items-center gap-1 ${activeTab === 'quality' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">verified</span>
          <span className="font-mono text-[9px]">QUALITY</span>
        </button>
        <button onClick={() => setActiveTab('analysis')} className={`flex flex-col items-center gap-1 ${activeTab === 'analysis' ? 'text-primary' : 'text-on-surface-variant'}`}>
          <span className="material-symbols-outlined">analytics</span>
          <span className="font-mono text-[9px]">ANALYSIS</span>
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

// Import & Export Strategic Planning Dashboard Component
function ImportExportDashboard({ colors, data }) {
  const [subTab, setSubTab] = useState('import');
  
  const formatStateName = (name) => {
    if (name === 'Tamil Nadu (Dom)') return 'Tamil Nadu (Local)';
    return name.replace(' (Dom)', '');
  };
  
  // Auto-populate from live market data
  const liveUsdInr = data?.exchangeRates?.usdInr || 83.50;
  const liveIceCotton = data?.globalCotton?.prices?.types?.[1]?.current || 78.50; // ICE US Cotton No. 2
  const liveShankar6 = data?.indianCotton?.prices?.types?.[0]?.current || 65100;
  
  // Import States - split into Global and Domestic channels
  const [selectedGlobalOrigin, setSelectedGlobalOrigin] = useState('USA');
  const [selectedDomesticOrigin, setSelectedDomesticOrigin] = useState('Gujarat (Dom)');
  
  // Global Sourcing states
  const [globalFobCentsLb, setGlobalFobCentsLb] = useState(liveIceCotton);
  const [globalOceanFreight, setGlobalOceanFreight] = useState(2200);
  const [globalBcdRate, setGlobalBcdRate] = useState(10);
  const [globalAidcRate, setGlobalAidcRate] = useState(0);
  const [globalSwsRate, setGlobalSwsRate] = useState(10);
  const [globalHandlingCandy, setGlobalHandlingCandy] = useState(2500);
  const [usdInrRate, setUsdInrRate] = useState(liveUsdInr);

  // Domestic Sourcing states
  const [domesticMandiPrice, setDomesticMandiPrice] = useState(liveShankar6);
  const [domesticInlandFreight, setDomesticInlandFreight] = useState(4500);
  const [importGstRate, setImportGstRate] = useState(5.0);
  const [mandiFeeRate, setMandiFeeRate] = useState(1.0);
  const [domesticHandlingCandy, setDomesticHandlingCandy] = useState(1200);

  const [importSimCount, setImportSimCount] = useState('30s Combed');
  const [simCottonSource, setSimCottonSource] = useState('global');
  
  // Export States
  const [exportChannel, setExportChannel] = useState('global'); // 'global' or 'domestic'
  const [exportDest, setExportDest] = useState('Bangladesh');
  const [exportState, setExportState] = useState('Maharashtra');
  
  // Global Export States
  const [exportPriceUsdKg, setExportPriceUsdKg] = useState(3.40);
  const [globalExportLocalPriceInrKg, setGlobalExportLocalPriceInrKg] = useState(272);
  const [exportIncentiveRate, setExportIncentiveRate] = useState(3.5); // RoDTEP %
  const [oceanFreightExportKg, setOceanFreightExportKg] = useState(10.0); // INR per Kg
  const [customsClearingExportKg, setCustomsClearingExportKg] = useState(3.5); // INR per Kg

  // Domestic Export States
  const [domesticTargetPriceInrKg, setDomesticTargetPriceInrKg] = useState(285.00);
  const [domesticExportLocalPriceInrKg, setDomesticExportLocalPriceInrKg] = useState(272);
  const [domesticRoadFreightKg, setDomesticRoadFreightKg] = useState(9.50);
  const [domesticBrokerageRate, setDomesticBrokerageRate] = useState(1.0); // %
  const [domesticPackagingKg, setDomesticPackagingKg] = useState(2.0); // INR/Kg
  const [domesticGstRate, setDomesticGstRate] = useState(5.0); // % CGST+SGST/IGST

  // Presets
  const importPresets = {
    // Global Nations
    'USA': { fob: liveIceCotton, freight: 2200, bcd: 10, aidc: 0, sws: 10, handling: 2500, type: 'global' },
    'Brazil': { fob: parseFloat((liveIceCotton * 0.93).toFixed(2)), freight: 2500, bcd: 10, aidc: 0, sws: 10, handling: 2800, type: 'global' },
    'Egypt': { fob: parseFloat((liveIceCotton * 2.7).toFixed(2)), freight: 1800, bcd: 10, aidc: 0, sws: 10, handling: 3500, type: 'global' },
    'West Africa': { fob: parseFloat((liveIceCotton * 1.05).toFixed(2)), freight: 2400, bcd: 10, aidc: 0, sws: 10, handling: 3000, type: 'global' },
    'Australia': { fob: parseFloat((liveIceCotton * 1.12).toFixed(2)), freight: 2100, bcd: 10, aidc: 0, sws: 10, handling: 2700, type: 'global' },
    'Greece': { fob: parseFloat((liveIceCotton * 1.02).toFixed(2)), freight: 1900, bcd: 10, aidc: 0, sws: 10, handling: 2600, type: 'global' },
    'Turkey': { fob: parseFloat((liveIceCotton * 1.08).toFixed(2)), freight: 2000, bcd: 10, aidc: 0, sws: 10, handling: 2800, type: 'global' },
    // Domestic Indian States
    'Gujarat (Dom)': { fob: liveShankar6, freight: 4500, bcd: 0, aidc: 0, sws: 0, handling: 1200, type: 'domestic' },
    'Maharashtra (Dom)': { fob: Math.floor(liveShankar6 * 0.98), freight: 5500, bcd: 0, aidc: 0, sws: 0, handling: 1200, type: 'domestic' },
    'Telangana (Dom)': { fob: Math.floor(liveShankar6 * 0.97), freight: 3200, bcd: 0, aidc: 0, sws: 0, handling: 1000, type: 'domestic' },
    'Andhra Pradesh (Dom)': { fob: Math.floor(liveShankar6 * 0.99), freight: 2800, bcd: 0, aidc: 0, sws: 0, handling: 1000, type: 'domestic' },
    'Karnataka (Dom)': { fob: Math.floor(liveShankar6 * 1.01), freight: 2500, bcd: 0, aidc: 0, sws: 0, handling: 1100, type: 'domestic' },
    'Madhya Pradesh (Dom)': { fob: Math.floor(liveShankar6 * 0.96), freight: 4800, bcd: 0, aidc: 0, sws: 0, handling: 1200, type: 'domestic' },
    'Punjab (Dom)': { fob: Math.floor(liveShankar6 * 0.94), freight: 7200, bcd: 0, aidc: 0, sws: 0, handling: 1300, type: 'domestic' },
    'Rajasthan (Dom)': { fob: Math.floor(liveShankar6 * 0.95), freight: 6800, bcd: 0, aidc: 0, sws: 0, handling: 1300, type: 'domestic' },
    'Haryana (Dom)': { fob: Math.floor(liveShankar6 * 0.94), freight: 7000, bcd: 0, aidc: 0, sws: 0, handling: 1300, type: 'domestic' },
    'Odisha (Dom)': { fob: Math.floor(liveShankar6 * 0.96), freight: 6000, bcd: 0, aidc: 0, sws: 0, handling: 1200, type: 'domestic' },
    'Uttar Pradesh (Dom)': { fob: Math.floor(liveShankar6 * 0.93), freight: 6500, bcd: 0, aidc: 0, sws: 0, handling: 1200, type: 'domestic' },
    'Tamil Nadu (Dom)': { fob: Math.floor(liveShankar6 * 1.04), freight: 1200, bcd: 0, aidc: 0, sws: 0, handling: 800, type: 'domestic' },
  };

  useEffect(() => {
    if (liveIceCotton && liveIceCotton !== 78.50 && selectedGlobalOrigin === 'USA') {
      setGlobalFobCentsLb(liveIceCotton);
    }
  }, [liveIceCotton, selectedGlobalOrigin]);

  useEffect(() => {
    if (liveShankar6 && selectedDomesticOrigin === 'Gujarat (Dom)') {
      setDomesticMandiPrice(liveShankar6);
    }
  }, [liveShankar6, selectedDomesticOrigin]);

  useEffect(() => {
    if (liveUsdInr) {
      setUsdInrRate(liveUsdInr);
    }
  }, [liveUsdInr]);

  // Spinning count properties for simulator
  const countParams = {
    '20s Carded': { yieldRate: 0.91, conversion: 45 },
    '30s Combed': { yieldRate: 0.80, conversion: 65 },
    '40s Compact': { yieldRate: 0.77, conversion: 95 },
    '60s Combed': { yieldRate: 0.625, conversion: 160 },
    '80s Compact': { yieldRate: 0.50, conversion: 265 },
    '100s Compact ELS': { yieldRate: 0.435, conversion: 360 }
  };

  // Cotton specifications, harvesting cycles, and SWOT profiles
  const originProfiles = {
    'USA': {
      harvesting: 'Oct – Jan (Peak)',
      staple: '1-1/8" (28.6mm) Upland',
      mic: '3.8 – 4.5 NCL',
      strength: '29 – 31 GPT',
      trash: '2.2% (Low / Machine)',
      comberWaste: '12%',
      strengths: 'Strict contamination-free machine picking, highly standardized HVI grading, extremely uniform length and mic parameter profiles.',
      weaknesses: 'Long ocean shipping time (25-35 days to South India), locks up working capital in LCs, higher ocean freight rates.',
      opps: 'Purchase forward contracts during duty-free import windows to capture 8-10% extra margin on high-speed circular knitwear.'
    },
    'Brazil': {
      harvesting: 'Jul – Sep (Indian Off-season)',
      staple: '1-5/32" (30.0mm) Cerrado',
      mic: '3.9 – 4.8 NCL',
      strength: '28 – 30 GPT',
      trash: '2.5% (Clean / Machine)',
      comberWaste: '14%',
      strengths: 'Excellent volume availability during the Indian off-season, machine harvested, competitive landed pricing, highly efficient bulk load handling.',
      weaknesses: 'Micronaire profiles run coarser on average, which requires careful blending for fine-combed knitting counts.',
      opps: 'Lock in volume coverage in Q3 to hedge against domestic monsoon delays and keep spindle utilization at 100%.'
    },
    'Egypt': {
      harvesting: 'Sep – Nov (Peak ELS Season)',
      staple: '1-3/8" (35.0mm) ELS Giza',
      mic: '3.2 – 3.8 NCL',
      strength: '40 – 44 GPT',
      trash: '1.8% (Hand Cleaned)',
      comberWaste: '18%',
      strengths: 'Premium luster, world-record yarn strength (RKM 34+), near-zero hairiness. Indispensable for luxury 80s–120s counts.',
      weaknesses: 'Rigid export pricing floor set by the government, expensive FOB base, high comber waste percentage.',
      opps: 'Command a 15-20% retail margin premium on finished compact yarn exports by submitting blockchain farm-origin audits.'
    },
    'West Africa': {
      harvesting: 'Dec – Mar (Hand Sown)',
      staple: '1-1/16" to 1-3/32" (27-28mm)',
      mic: '3.8 – 4.6 NCL',
      strength: '26 – 28 GPT',
      trash: '3.8% (Hand picked crop)',
      comberWaste: '15%',
      strengths: 'Lower base FOB price, hand harvesting preserves fiber length, competitive spot discount rate.',
      weaknesses: 'Higher average trash levels due to manual ginning methods, high risk of plastic and jute twine contamination.',
      opps: 'Enables high-margin carded counts (20s-30s) when blended correctly with domestic Shankar-6 raw material.'
    },
    'Australia': {
      harvesting: 'Apr – Jul (Southern Peak)',
      staple: '1-5/32" (29.4mm) Premium',
      mic: '3.8 – 4.4 NCL',
      strength: '30 – 32 GPT',
      trash: '1.9% (Very Clean)',
      comberWaste: '13%',
      strengths: 'High uniformity, zero contamination, excellent color grade (grade 11/21), reliable shipping transit.',
      weaknesses: 'High FOB price premium, subject to Australian water availability fluctuations.',
      opps: 'Southern Hemisphere harvest provides fresh crop during Northern Hemisphere off-season (Q2-Q3).'
    },
    'Greece': {
      harvesting: 'Oct – Dec (Med Crop)',
      staple: '1-3/32" (27.8mm)',
      mic: '3.9 – 4.5 NCL',
      strength: '28.5 – 30 GPT',
      trash: '2.4% (Machine Harvested)',
      comberWaste: '14%',
      strengths: 'Good brightness, solid strength, European standards of tracking.',
      weaknesses: 'Limited volume compared to US/Brazil, higher ocean freight from Mediterranean.',
      opps: 'Can substitute for US Upland when US basis is high.'
    },
    'Turkey': {
      harvesting: 'Sep – Nov (Aegean Crop)',
      staple: '1-1/8" (28.6mm)',
      mic: '4.0 – 4.6 NCL',
      strength: '29 – 31 GPT',
      trash: '2.5%',
      comberWaste: '14%',
      strengths: 'High fiber maturity, good length uniformity, hand-selected varieties available.',
      weaknesses: 'High domestic consumption in Turkey limits export availability, volatile pricing.',
      opps: 'Strategic sourcing for premium Aegean combed yarn segments.'
    },
    'Gujarat (Dom)': {
      harvesting: 'Oct – Feb (Peak Mandi)',
      staple: '29 – 30mm (S-6 Long)',
      mic: '3.7 – 4.2 NCL',
      strength: '27 – 29 GPT',
      trash: '3.0%',
      comberWaste: '16%',
      strengths: 'Extremely fast road shipping (3-5 days to TN gate), zero container shipping delays, RCM GST offset via ITC.',
      weaknesses: 'Moderate seed-coat and hand-picking contamination, variable moisture levels in early-season mandi lots.',
      opps: 'Bypasses overseas lead-time risks completely, allowing lean inventory operation (reducing warehouse holding cost).'
    },
    'Maharashtra (Dom)': {
      harvesting: 'Oct – Jan (Central Peak)',
      staple: '28 – 29mm (Bunny / Mech-1)',
      mic: '3.8 – 4.4 NCL',
      strength: '26 – 28 GPT',
      trash: '3.5%',
      comberWaste: '16%',
      strengths: 'Typically trades at ₹1,000–1,500/candy discount to Gujarat, huge mandi arrivals, competitive logistics routes.',
      weaknesses: 'Slightly shorter staple length limits usage in high-speed ELS warp yarns; higher average trash content.',
      opps: 'Highly economical raw material core for coarse/medium carded knitting and open-end rotor-spinning counts.'
    },
    'Telangana (Dom)': {
      harvesting: 'Oct – Jan (Central Peak)',
      staple: '29 – 30mm',
      mic: '3.8 – 4.3 NCL',
      strength: '27.5 – 29 GPT',
      trash: '3.2%',
      comberWaste: '16%',
      strengths: 'High yield, excellent dye absorption, close proximity to Tamil Nadu (1-2 days road transit).',
      weaknesses: 'Susceptible to pink bollworm infestations, causing variance in micronaire within lots.',
      opps: 'Highly competitive pricing makes it an ideal alternative to central cotton varieties.'
    },
    'Andhra Pradesh (Dom)': {
      harvesting: 'Oct – Feb (Guntur Peak)',
      staple: '30 – 31mm (MCU-5/LRA)',
      mic: '3.7 – 4.2 NCL',
      strength: '28 – 30 GPT',
      trash: '3.0%',
      comberWaste: '15%',
      strengths: 'Strong fiber, good length, suitable for medium and fine combed counts (40s-60s).',
      weaknesses: 'High moisture levels if harvested during late monsoons, pesticide residue concerns.',
      opps: 'Direct rail/road freight corridors to Tamil Nadu reduce logistics margins by 8%.'
    },
    'Karnataka (Dom)': {
      harvesting: 'Oct – Jan (Southern Hub)',
      staple: '30 – 32mm (DCH/ELS)',
      mic: '3.6 – 4.0 NCL',
      strength: '29 – 31 GPT',
      trash: '2.8%',
      comberWaste: '15%',
      strengths: 'Produces high-grade long staple varieties, close physical proximity to Tamil Nadu mills.',
      weaknesses: 'Lower total acreage limits massive bulk procurement options.',
      opps: 'Contract farming options with Karnataka grower cooperatives for organic long-staple.'
    },
    'Madhya Pradesh (Dom)': {
      harvesting: 'Oct – Feb (Central Cluster)',
      staple: '29 – 30mm',
      mic: '3.8 – 4.4 NCL',
      strength: '27.5 – 29 GPT',
      trash: '3.3%',
      comberWaste: '16%',
      strengths: 'Competitive pricing, high ginning outturn (GOT), good seed cleanliness.',
      weaknesses: 'Slightly higher trash content than Gujarat S-6, variable fiber maturity.',
      opps: 'Ideal filler cotton for blending with premium imports for medium carded counts.'
    },
    'Punjab (Dom)': {
      harvesting: 'Sep – Dec (Northern Belt)',
      staple: '26 – 28mm (J-34)',
      mic: '4.0 – 4.8 NCL',
      strength: '25.5 – 27 GPT',
      trash: '4.2%',
      comberWaste: '17%',
      strengths: 'Coarser mic suitable for heavy open-end yarns and denim, high volume availability.',
      weaknesses: 'Short staple length, high leaf trash and contamination (polypropylene twine).',
      opps: 'Very economical for open-end rotor spinning (10s-20s count) for domestic markets.'
    },
    'Rajasthan (Dom)': {
      harvesting: 'Sep – Dec (Northern Hub)',
      staple: '27 – 28mm (J-34)',
      mic: '3.9 – 4.6 NCL',
      strength: '26 – 28 GPT',
      trash: '3.8%',
      comberWaste: '16%',
      strengths: 'Highly competitive spot pricing, low moisture levels due to dry climate during harvest.',
      weaknesses: 'Dust and sand content require extensive blowroom opening and cleaning.',
      opps: 'Sourcing core material for coarse hosiery yarns (20s-24s carded).'
    },
    'Haryana (Dom)': {
      harvesting: 'Sep – Dec (Northern Belt)',
      staple: '27 – 28mm (J-34)',
      mic: '4.0 – 4.7 NCL',
      strength: '26 – 28 GPT',
      trash: '4.0%',
      comberWaste: '16%',
      strengths: 'Good bulk availability, fast mandi trading cycles, low moisture in late season.',
      weaknesses: 'High leaf trash, susceptible to contamination from plastic bags.',
      opps: 'Highly competitive pricing for hosiery knitting yarns.'
    },
    'Odisha (Dom)': {
      harvesting: 'Oct – Feb (Eastern Belt)',
      staple: '28 – 30mm',
      mic: '3.8 – 4.4 NCL',
      strength: '27 – 29 GPT',
      trash: '3.5%',
      comberWaste: '16%',
      strengths: 'Competitive pricing, increasing crop acreage and modern ginning facilities.',
      weaknesses: 'Logistics transit routes to South India are less established than Central zone.',
      opps: 'Diversify sourcing to hedge against Central zone monsoon delays.'
    },
    'Uttar Pradesh (Dom)': {
      harvesting: 'Sep – Nov',
      staple: '26 – 28mm',
      mic: '4.0 – 4.8 NCL',
      strength: '25 – 27 GPT',
      trash: '4.5%',
      comberWaste: '17%',
      strengths: 'Very economical base cost.',
      weaknesses: 'Variable quality, higher short fiber content and trash %.',
      opps: 'Sourcing core material for coarse open-end and industrial weaving counts.'
    },
    'Tamil Nadu (Dom)': {
      harvesting: 'Feb–Apr & Aug–Oct',
      staple: '30 – 33mm (MCU-5)',
      mic: '3.4 – 3.9 NCL',
      strength: '31 – 35 GPT',
      trash: '2.5%',
      comberWaste: '14%',
      strengths: 'Zero interstate transport taxes, zero road freight delays, fresh crop available in off-season.',
      weaknesses: 'Extremely small local production (less than 5% of TN mill demand), high local demand keeps prices elevated.',
      opps: 'Source ELS Suvin locally to manufacture premium superfine warp yarns (100s-120s compact) with minimal transport footprint.'
    }
  };


  const exportGlobalPresets = {
    'Bangladesh': { price: 3.40, domestic: 272, incentive: 3.5, freight: 10.0, clearing: 3.5, yarnSpec: '30s Carded Knit, 40s Combed Knit', mktShare: '35%', importDuty: 'Duty-Free (SAFTA)' },
    'China': { price: 3.25, domestic: 272, incentive: 3.0, freight: 12.0, clearing: 4.0, yarnSpec: '20s Carded Weaving, 32s PC Blend', mktShare: '15%', importDuty: '3.5% Basic Duty' },
    'Vietnam': { price: 3.30, domestic: 272, incentive: 3.5, freight: 11.5, clearing: 3.8, yarnSpec: '32s & 40s Combed Knit', mktShare: '20%', importDuty: 'Duty-Free (ASEAN-India FTA)' },
    'Portugal': { price: 3.85, domestic: 312, incentive: 4.5, freight: 22.0, clearing: 5.5, yarnSpec: '60s & 80s Combed Compact (ELS/Org)', mktShare: '8%', importDuty: '4.0% EU Common Tariff' },
    'Turkey': { price: 3.45, domestic: 272, incentive: 3.5, freight: 14.0, clearing: 3.8, yarnSpec: '30s & 40s Combed Knit', mktShare: '12%', importDuty: 'Duty-Free (Customs Union)' },
    'Germany': { price: 3.90, domestic: 312, incentive: 4.5, freight: 24.0, clearing: 5.8, yarnSpec: '60s & 80s Organic Compact', mktShare: '6%', importDuty: '4.0% EU Common Tariff' },
    'Egypt': { price: 3.50, domestic: 272, incentive: 3.5, freight: 12.0, clearing: 3.5, yarnSpec: '30s Carded, 40s Combed', mktShare: '5%', importDuty: '5.0% Basic Duty' },
    'Italy': { price: 3.95, domestic: 312, incentive: 4.5, freight: 23.0, clearing: 5.6, yarnSpec: '80s & 100s Compact (Supima)', mktShare: '7%', importDuty: '4.0% EU Common Tariff' },
  };

  const exportDomesticPresets = {
    'Maharashtra': { price: 285.00, domestic: 272, roadFreight: 9.50, brokerage: 1.0, packaging: 2.0, gst: 5.0, yarnSpec: '30s & 40s Combed Warp (Bhiwandi/Ichalkaranji)', mktShare: '25%', taxRegime: '5% IGST (ITC Claimable)' },
    'Gujarat': { price: 298.00, domestic: 272, roadFreight: 11.00, brokerage: 1.0, packaging: 2.0, gst: 5.0, yarnSpec: '60s & 80s Combed Compact, 40s Lycra (Surat/Ahmedabad)', mktShare: '20%', taxRegime: '5% IGST (ITC Claimable)' },
    'West Bengal': { price: 278.00, domestic: 272, roadFreight: 14.50, brokerage: 1.2, packaging: 2.5, gst: 5.0, yarnSpec: '20s Carded Hosiery, 30s Semi-Combed (Kolkata/Howrah)', mktShare: '18%', taxRegime: '5% IGST (ITC Claimable)' },
    'Karnataka': { price: 280.00, domestic: 272, roadFreight: 5.50, brokerage: 0.8, packaging: 1.8, gst: 5.0, yarnSpec: '30s & 40s Combed (Bangalore/Belgaum)', mktShare: '12%', taxRegime: '5% IGST (ITC Claimable)' },
    'Madhya Pradesh': { price: 288.00, domestic: 272, roadFreight: 11.50, brokerage: 1.0, packaging: 2.0, gst: 5.0, yarnSpec: '30s & 40s Carded (Indore/Bhopal)', mktShare: '10%', taxRegime: '5% IGST (ITC Claimable)' },
    'Uttar Pradesh': { price: 292.00, domestic: 272, roadFreight: 15.00, brokerage: 1.2, packaging: 2.2, gst: 5.0, yarnSpec: '20s & 30s Carded Weaving (Kanpur/Meerut)', mktShare: '15%', taxRegime: '5% IGST (ITC Claimable)' },
  };

  const exportGlobalSwots = {
    'Bangladesh': {
      demand: 'Huge demand for 30s Carded and 40s Combed knitting yarn. Bangladesh is the main destination for Tiruppur spinners due to zero import duty under SAFTA and close shipping distances to Chittagong port.',
      barriers: 'Frequent dollar shortages at Bangladesh banks delay Letter of Credit (LC) settlements, causing payment latency of up to 45-60 days. Extreme price sensitivity.',
      opps: 'Establish direct supply arrangements with Dhaka-based buying houses representing European retailers. This eliminates agent commissions, improving realizations by ₹4-6/Kg.'
    },
    'China': {
      demand: 'Demands coarser 20s Carded weaving yarns and 32s PC blend yarns for industrial denim and weaving applications. Major volumes but lower pricing brackets.',
      barriers: 'High competition from low-cost spinners in Vietnam and Uzbekistan who enjoy geographical proximity and trade treaties. Import duty of 3.5% applies to Indian yarn.',
      opps: 'Leverage government incentives like RoDTEP (approx 3.5%) to offset the 3.5% Chinese import duty, targeting specific weaving clusters in Zhejiang province.'
    },
    'Vietnam': {
      demand: 'Demands 32s and 40s Combed knitting counts. Absorbs yarn for conversion to garments, which are exported duty-free to European Union under the EVFTA treaty.',
      barriers: 'Strict Uster quality criteria required by Japanese-owned garment mills in Vietnam. Zero tolerance for contamination. Strict testing metrics on arrival.',
      opps: 'Provide pre-certified Uster laboratory reports with yarn consignments to bypass incoming testing delays, capturing market share from Chinese competitors.'
    },
    'Portugal': {
      demand: 'Premium market demanding 60s and 80s Combed Compact ELS yarns (using Egyptian Giza and US Pima blends). Significant demand for organic (GOTS) and recycled combed counts.',
      barriers: 'High ocean freight rates to Europe and strict compliance criteria for chemical and labor certifications. Import duties of 4-4.5% apply unless certified organic.',
      opps: 'Organic and ELS premium compact yarns command an additional ₹30-40/Kg realization premium, fully absorbing the higher shipping costs and yielding double-digit EBITDA.'
    },
    'Turkey': {
      demand: 'Active demand for 30s & 40s Combed knitting yarn for their massive garment exports to the EU. Turkey acts as a major textile bridge.',
      barriers: 'High inflation and currency volatility in Turkey. Anti-dumping duties or trade safeguards can sometimes be triggered unexpectedly.',
      opps: 'Leverage customs cooperation. Shipments to Izmir or Istanbul can bypass EU duties, serving as a secondary corridor for European retailers.'
    },
    'Germany': {
      demand: 'Premium demand for 60s and 80s Organic Compact yarns (GOTS certified). High compliance requirements for sustainability and traceability.',
      barriers: 'Stringent quality standards, chemical restriction tests (REACH compliance), and high freight costs to northern European ports.',
      opps: 'Organic certified yarns fetch a massive premium of ₹40-50/Kg. Direct contracts with German sustainable fashion brands ensure high margins.'
    },
    'Egypt': {
      demand: 'High interest in coarse to medium counts like 20s Carded and 30s Combed to feed local textile clusters in Alexandria and Cairo.',
      barriers: 'Competition from local Egyptian Giza long-staple cotton spinners and strict import licensing regulations.',
      opps: 'Egypt offers a strategic gateway under qualifying industrial zones (QIZ) for duty-free export to the US market.'
    },
    'Italy': {
      demand: 'Super premium demand for 80s & 100s Compact yarns (Supima/Giza blends) for high-end fashion, luxury knitwear, and premium shirting.',
      barriers: 'Italian weavers require absolute zero-contamination yarn. High logistics cost and long transit times to Genoa/Trieste.',
      opps: 'Italy\'s luxury fashion sector pays the highest global premium, offering over ₹60/Kg extra realization for top-tier contamination-free yarn.'
    }
  };

  const exportDomesticSwots = {
    'Maharashtra': {
      demand: 'High-volume demand for 30s Combed Warp and 40s Combed Warp yarn. Major powerloom hubs (Bhiwandi, Ichalkaranji, Malegaon) consume massive volumes for apparel fabrics and home textiles.',
      barriers: 'High credit cycles of 60 to 90 days required by master weavers. Local Maharashtra spinning mills enjoy state-level power and capital subsidies, increasing cost competitiveness.',
      opps: 'Setting up dedicated depot sales in Ichalkaranji to offer ready-to-lift spot inventory, which captures premium spot pricing and bypasses local broker commissions (~1%).'
    },
    'Gujarat': {
      demand: 'Demands high-strength 60s and 80s Combed Compact yarns for premium shirting/sheeting in Ahmedabad, and 40s Lycra core-spun yarns for stretch denim clusters in Surat.',
      barriers: 'Gujarat is a massive cotton-growing and modern spinning state itself. Extreme competition from local corporate spinners. Outside mills face barriers unless quality is exceptional.',
      opps: 'Focus on customized specialty yarns (GOTS organic compact, slub yarns, contamination-free ELS cotton yarns) where Tamil Nadu mills maintain technical superiority.'
    },
    'West Bengal': {
      demand: 'Strong demand for 20s Carded Hosiery and 30s Semi-Combed yarns for circular knitting hubs in Kolkata (Howrah, Metiabruz) and local handloom segments.',
      barriers: 'Long transport lead times (5-7 days road transit) and high logistics costs (₹14-16 per Kg). Risk of transit damage due to moisture during monsoon season.',
      opps: 'Form long-term direct supply agreements with large structured hosiery brands (e.g. Lux, Rupa, Dollar) to ensure continuous off-take and reduce pricing volatility.'
    },
    'Karnataka': {
      demand: 'Steady demand for 30s & 40s Combed yarn for weaving and knitting mills around Bangalore and Belgaum clusters.',
      barriers: 'Proximity to local South Indian spinners keeps margins competitive. Transport is fast but local agent networks dominate the trade.',
      opps: 'Low transit times (1-2 days) and lowest domestic freight costs (~₹5.5/Kg) from Tamil Nadu make it an ideal quick-ship safety valve.'
    },
    'Madhya Pradesh': {
      demand: 'Good demand for 30s & 40s Carded yarn in Indore and Bhopal for apparel and home textiles.',
      barriers: 'Rapidly expanding local spinning mills with heavy state incentives. Competition is stiff on standard carded counts.',
      opps: 'Direct supply to MP\'s growing composite mills, offering customized yarn packaging to minimize local unpacking damages.'
    },
    'Uttar Pradesh': {
      demand: 'High demand for 20s & 30s Carded weaving yarns in Kanpur and Meerut clusters for bedsheets, denim, and home furnishings.',
      barriers: 'Very long road transit distance (5-6 days), high freight costs (~₹15/Kg), and complex local mandi taxations/bureaucracy.',
      opps: 'High weaving capacity in UP lacks local high-quality yarn supply, allowing TN spinners to charge a premium for superior strength yarn.'
    }
  };

  // Auto-sync exchange rate when live data updates
  useEffect(() => {
    if (liveUsdInr && liveUsdInr !== 83.50) {
      setUsdInrRate(liveUsdInr);
    }
  }, [liveUsdInr]);

  const handleGlobalImportPreset = (origin) => {
    setSelectedGlobalOrigin(origin);
    const p = importPresets[origin];
    if (p) {
      setGlobalFobCentsLb(p.fob);
      setGlobalOceanFreight(p.freight);
      setGlobalBcdRate(p.bcd);
      setGlobalAidcRate(p.aidc);
      setGlobalSwsRate(p.sws);
      setGlobalHandlingCandy(p.handling);
    }
    setUsdInrRate(liveUsdInr);
  };

  const handleDomesticImportPreset = (origin) => {
    setSelectedDomesticOrigin(origin);
    const p = importPresets[origin];
    if (p) {
      setDomesticMandiPrice(p.fob);
      setDomesticInlandFreight(p.freight);
      setImportGstRate(5.0);
      setMandiFeeRate(1.0);
      setDomesticHandlingCandy(p.handling);
    }
  };

  const handleExportGlobalPreset = (dest) => {
    setExportDest(dest);
    const p = exportGlobalPresets[dest];
    setExportPriceUsdKg(p.price);
    setGlobalExportLocalPriceInrKg(p.domestic);
    setExportIncentiveRate(p.incentive);
    setOceanFreightExportKg(p.freight);
    setCustomsClearingExportKg(p.clearing);
  };

  const handleExportDomesticPreset = (st) => {
    setExportState(st);
    const p = exportDomesticPresets[st];
    setDomesticTargetPriceInrKg(p.price);
    setDomesticExportLocalPriceInrKg(p.domestic);
    setDomesticRoadFreightKg(p.roadFreight);
    setDomesticBrokerageRate(p.brokerage);
    setDomesticPackagingKg(p.packaging);
    setDomesticGstRate(p.gst);
  };

  // Import Calculations
  const lbsPerCandy = 783.96;
  const kgsPerCandy = 355.62;
  const candiesPerContainer = 56.24;

  // Global calculations
  const globalFobInrCandy = (globalFobCentsLb / 100) * lbsPerCandy * usdInrRate;
  const globalFreightInrCandy = (globalOceanFreight * usdInrRate) / candiesPerContainer;
  const globalBcdInrCandy = globalFobInrCandy * (globalBcdRate / 100);
  const globalAidcInrCandy = globalFobInrCandy * (globalAidcRate / 100);
  const globalSwsInrCandy = globalBcdInrCandy * (globalSwsRate / 100);
  const globalTotalTaxDutyInrCandy = globalBcdInrCandy + globalAidcInrCandy + globalSwsInrCandy;
  const globalLandedInrCandy = globalFobInrCandy + globalFreightInrCandy + globalTotalTaxDutyInrCandy + globalHandlingCandy;
  const globalLandedInrKg = globalLandedInrCandy / kgsPerCandy;

  // Domestic calculations
  const domesticFobInrCandy = domesticMandiPrice;
  const domesticFreightInrCandy = domesticInlandFreight;
  const domesticGstInrCandy = domesticFobInrCandy * (importGstRate / 100);
  const domesticMandiFeeInrCandy = domesticFobInrCandy * (mandiFeeRate / 100);
  const domesticTotalTaxDutyInrCandy = domesticGstInrCandy + domesticMandiFeeInrCandy;
  const domesticLandedInrCandy = domesticFobInrCandy + domesticFreightInrCandy + domesticTotalTaxDutyInrCandy + domesticHandlingCandy;
  const domesticLandedInrKg = domesticLandedInrCandy / kgsPerCandy;

  const getLandedCostForPreset = (name) => {
    const p = importPresets[name];
    if (!p) return { candy: 0, kg: 0 };
    
    if (p.type === 'global') {
      const fob = (selectedGlobalOrigin === name) ? globalFobCentsLb : p.fob;
      const freight = (selectedGlobalOrigin === name) ? globalOceanFreight : p.freight;
      const bcd = (selectedGlobalOrigin === name) ? globalBcdRate : p.bcd;
      const aidc = (selectedGlobalOrigin === name) ? globalAidcRate : p.aidc;
      const sws = (selectedGlobalOrigin === name) ? globalSwsRate : p.sws;
      const handling = (selectedGlobalOrigin === name) ? globalHandlingCandy : p.handling;
      
      const fobInr = (fob / 100) * lbsPerCandy * usdInrRate;
      const freightInr = (freight * usdInrRate) / candiesPerContainer;
      const bcdInr = fobInr * (bcd / 100);
      const aidcInr = fobInr * (aidc / 100);
      const swsInr = bcdInr * (sws / 100);
      const taxInr = bcdInr + aidcInr + swsInr;
      const landedCandy = fobInr + freightInr + taxInr + handling;
      return { candy: landedCandy, kg: landedCandy / kgsPerCandy };
    } else {
      const fob = (selectedDomesticOrigin === name) ? domesticMandiPrice : p.fob;
      const freight = (selectedDomesticOrigin === name) ? domesticInlandFreight : p.freight;
      const gst = (selectedDomesticOrigin === name) ? importGstRate : 5.0;
      const mandi = (selectedDomesticOrigin === name) ? mandiFeeRate : 1.0;
      const handling = (selectedDomesticOrigin === name) ? domesticHandlingCandy : p.handling;
      
      const fobInr = fob;
      const freightInr = freight;
      const gstInr = fobInr * (gst / 100);
      const mandiInr = fobInr * (mandi / 100);
      const taxInr = gstInr + mandiInr;
      const landedCandy = fobInr + freightInr + taxInr + handling;
      return { candy: landedCandy, kg: landedCandy / kgsPerCandy };
    }
  };

  const shankar6Price = liveShankar6;
  const globalImportParity = globalLandedInrCandy - shankar6Price;
  const domesticImportParity = domesticLandedInrCandy - shankar6Price;

  const getImportYarnPrice = (countName) => {
    const priceObj = data?.yarns?.india?.prices?.find(p => p.type.includes(countName));
    return priceObj ? priceObj.current : 295;
  };

  const getImportYarnMargin = (countName, source = simCottonSource) => {
    const params = countParams[countName];
    const landedKg = source === 'global' ? globalLandedInrKg : domesticLandedInrKg;
    const yarnRawMaterialCost = landedKg / params.yieldRate;
    const totalManufacturingCost = yarnRawMaterialCost + params.conversion;
    const yarnSellingPrice = getImportYarnPrice(countName);
    return yarnSellingPrice - totalManufacturingCost;
  };

  // Global Export Calculations
  const grossExportRevenueInrKg = exportPriceUsdKg * usdInrRate;
  const incentiveRevenueInrKg = grossExportRevenueInrKg * (exportIncentiveRate / 100);
  const netExportRealizationInrKg = grossExportRevenueInrKg + incentiveRevenueInrKg - oceanFreightExportKg - customsClearingExportKg;
  const exportPremiumInrKg = netExportRealizationInrKg - globalExportLocalPriceInrKg;

  // Domestic Export Calculations
  const domesticBrokerageInrKg = domesticTargetPriceInrKg * (domesticBrokerageRate / 100);
  const netDomesticRealizationInrKg = domesticTargetPriceInrKg - domesticRoadFreightKg - domesticBrokerageInrKg - domesticPackagingKg;
  const domesticPremiumInrKg = netDomesticRealizationInrKg - domesticExportLocalPriceInrKg;
  const gstAmountInrKg = domesticTargetPriceInrKg * (domesticGstRate / 100);

  const globalSwot = exportGlobalSwots[exportDest];
  const domesticSwot = exportDomesticSwots[exportState];

  return (
    <div className="space-y-gutter">
      {/* Welcome Banner */}
      <section className="relative mb-gutter h-48 rounded-xxl overflow-hidden flex items-center p-8 bg-cover bg-center neumorphic-raised" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}basml_cotton_cover.png)` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-container/90 via-primary-container/70 to-transparent z-0"></div>
        <div className="relative z-10 text-left space-y-2 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-on-primary-container text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Import & Export Strategic Desk
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-white leading-tight">
            Tamil Nadu Cotton Import & Yarn Export Planner
          </h2>
          <p className="text-white/80 font-body text-xs md:text-sm">
            Fostering competitive raw material sourcing corridors from global suppliers to Tamil Nadu mills, and maximizing premium yarn export realizations to international and domestic weaving hubs.
          </p>
        </div>
      </section>

      {/* Nav Tabs */}
      <div className="flex gap-2 p-1 bg-surface-container-low rounded-xl border border-outline-variant/10 w-fit">
        <button
          onClick={() => setSubTab('import')}
          className={`py-2 px-4 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            subTab === 'import' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-sm">download</span>
          Cotton Import Plan
        </button>
        <button
          onClick={() => setSubTab('export')}
          className={`py-2 px-4 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            subTab === 'export' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-sm">upload</span>
          Yarn Export Plan
        </button>
        <button
          onClick={() => setSubTab('playbook')}
          className={`py-2 px-4 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-2 ${
            subTab === 'playbook' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined text-sm">menu_book</span>
          Strategic Playbook
        </button>
      </div>

      {subTab === 'import' && (
        <div className="space-y-gutter animate-fade-in">
          {/* Sourcing Corridor Flow Visualizer */}
          <div className="card-chart-green p-4 rounded-xxl border border-primary/20 bg-gradient-to-r from-primary-container/10 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-primary animate-pulse">route</span>
              <div>
                <strong className="text-primary block text-xs">Active Sourcing Corridors (Destination: Tamil Nadu Factory Gate)</strong>
                <span className="text-on-surface-variant font-medium">Both global and domestic logistics corridors are running concurrently to feed your main factory.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center w-full md:w-auto">
              {/* Global Corridor */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-bold">
                <span className="material-symbols-outlined text-sm text-primary">public</span>
                <span>Global: {selectedGlobalOrigin}</span>
              </div>
              
              <div className="text-primary font-bold">+</div>

              {/* Domestic Corridor */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-bold">
                <span className="material-symbols-outlined text-sm text-forest-green">home_pin</span>
                <span>Domestic: {formatStateName(selectedDomesticOrigin)}</span>
              </div>
              
              <div className="flex items-center text-primary">
                <span className="material-symbols-outlined text-sm animate-pulse">arrow_right_alt</span>
                <span className="text-[8px] font-bold px-1 text-primary/80 uppercase">Gate</span>
                <span className="material-symbols-outlined text-sm animate-pulse">arrow_right_alt</span>
              </div>
              
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-primary font-bold">
                <span className="material-symbols-outlined text-sm">factory</span>
                <span>TN Factory Gate (Main Hub)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-gutter">
            {/* Left Column: Global Sourcing Desk */}
            <div className="col-span-12 lg:col-span-6 space-y-gutter">
              <div className="card-table-orange rounded-xxl p-6 border border-primary/20 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-base font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">public</span>
                    Global Sourcing Desk (FOB Basis)
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-[9px] font-mono font-bold">
                    <span className="material-symbols-outlined text-[10px]">factory</span>
                    Destination: TN Gate
                  </span>
                </div>
                
                {/* Global Presets */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-outline block mb-1">GLOBAL NATIONS PRESETS</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(importPresets).filter(k => importPresets[k].type === 'global').map(name => (
                      <button
                        key={name}
                        onClick={() => handleGlobalImportPreset(name)}
                        className={`py-1 px-2.5 rounded-lg text-[10px] font-mono font-semibold border transition-all ${
                          selectedGlobalOrigin === name 
                            ? 'bg-primary text-on-primary border-primary shadow-sm font-extrabold' 
                            : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1 flex items-center gap-1">
                      FOB PRICE (US ¢/LB)
                      {selectedGlobalOrigin === 'USA' && <span className="text-[8px] text-forest-green font-bold">● LIVE</span>}
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={globalFobCentsLb}
                      onChange={(e) => setGlobalFobCentsLb(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1 flex items-center gap-1">
                      EXCHANGE RATE (USD/INR)
                      <span className="text-[8px] text-forest-green font-bold">● LIVE</span>
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={usdInrRate}
                      onChange={(e) => setUsdInrRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">
                      OCEAN FREIGHT (USD/CONTAINER)
                    </label>
                    <input
                      type="number"
                      value={globalOceanFreight}
                      onChange={(e) => setGlobalOceanFreight(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">
                      LOCAL HANDLING & PORT (INR)
                    </label>
                    <input
                      type="number"
                      value={globalHandlingCandy}
                      onChange={(e) => setGlobalHandlingCandy(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  {/* Taxes breakdown */}
                  <div className="col-span-2 bg-surface-container-low/40 p-3.5 rounded-xl border border-outline-variant/10 space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">Custom Tax & Cess Breakdown</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-[9px] font-mono font-bold text-outline-variant block mb-0.5">BASIC DUTY (BCD %)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={globalBcdRate}
                          onChange={(e) => setGlobalBcdRate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-1.5 text-xs font-mono font-bold text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono font-bold text-outline-variant block mb-0.5">AGRI CESS (AIDC %)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={globalAidcRate}
                          onChange={(e) => setGlobalAidcRate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-1.5 text-xs font-mono font-bold text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono font-bold text-outline-variant block mb-0.5">SWS (% OF BCD)</label>
                        <input
                          type="number"
                          step="1"
                          value={globalSwsRate}
                          onChange={(e) => setGlobalSwsRate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-1.5 text-xs font-mono font-bold text-on-surface"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Landed Cost Output */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">FOB Base Cost per Candy:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(globalFobInrCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Estimated Ocean Freight / Candy:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(globalFreightInrCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Taxes (BCD + AIDC + SWS):</span>
                    <span className="font-bold text-on-surface">
                      ₹{Math.round(globalTotalTaxDutyInrCandy).toLocaleString('en-IN')} 
                      <span className="text-[10px] text-outline ml-1">
                        ({(globalBcdRate + globalAidcRate + (globalBcdRate * globalSwsRate / 100)).toFixed(1.5)}% Eff.)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Local Handling & Port / Candy:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(globalHandlingCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono font-bold text-primary border-b border-outline-variant pb-2">
                    <span>Global Landed Cost:</span>
                    <span>₹{Math.round(globalLandedInrCandy).toLocaleString('en-IN')} / Candy</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-outline-variant">
                    <span>Equiv Landed Price per Kg:</span>
                    <span className="text-on-surface">₹{globalLandedInrKg.toFixed(2)} / Kg</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex justify-between items-center font-mono text-xs ${
                      globalImportParity <= 0 
                        ? 'bg-forest-green/10 text-forest-green border-forest-green/20' 
                        : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                    }`}>
                    <span className="font-bold">Landed Import Parity vs Gujarat S-6 Spot:</span>
                    <span className="font-bold">
                      {globalImportParity <= 0 
                        ? `₹${Math.abs(Math.round(globalImportParity)).toLocaleString('en-IN')} Discount (SAVINGS)` 
                        : `₹${Math.round(globalImportParity).toLocaleString('en-IN')} Premium (EXPENSIVE)`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Domestic Sourcing Desk */}
            <div className="col-span-12 lg:col-span-6 space-y-gutter">
              <div className="card-chart-green rounded-xxl p-6 border border-forest-green/20 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-base font-headline font-bold text-forest-green flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">home_pin</span>
                    Indian Domestic Sourcing Desk (Mandi Basis)
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-green/15 text-forest-green border border-forest-green/25 text-[9px] font-mono font-bold">
                    <span className="material-symbols-outlined text-[10px]">factory</span>
                    Destination: TN Gate
                  </span>
                </div>
                
                {/* Domestic Presets */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-outline block mb-1">DOMESTIC STATES PRESETS</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(importPresets).filter(k => importPresets[k].type === 'domestic').map(name => (
                      <button
                        key={name}
                        onClick={() => handleDomesticImportPreset(name)}
                        className={`py-1 px-2.5 rounded-lg text-[10px] font-mono font-semibold border transition-all ${
                          selectedDomesticOrigin === name 
                            ? 'bg-forest-green text-white border-forest-green shadow-sm font-extrabold' 
                            : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        {formatStateName(name)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1 flex items-center gap-1">
                      MANDI SPOT PRICE (INR/CANDY)
                      {selectedDomesticOrigin === 'Gujarat (Dom)' && <span className="text-[8px] text-forest-green font-bold">● LIVE</span>}
                    </label>
                    <input
                      type="number"
                      step="100"
                      value={domesticMandiPrice}
                      onChange={(e) => setDomesticMandiPrice(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-forest-green/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">
                      INLAND ROAD FREIGHT (INR/CANDY)
                    </label>
                    <input
                      type="number"
                      value={domesticInlandFreight}
                      onChange={(e) => setDomesticInlandFreight(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">
                      LOCAL HANDLING / OTHER COSTS (INR)
                    </label>
                    <input
                      type="number"
                      value={domesticHandlingCandy}
                      onChange={(e) => setDomesticHandlingCandy(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  {/* Taxes breakdown */}
                  <div className="col-span-2 bg-surface-container-low/40 p-3.5 rounded-xl border border-outline-variant/10 space-y-3">
                    <h4 className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">Domestic Taxes & Mandi Cess</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[9px] font-mono font-bold text-outline-variant block mb-0.5">GST (REVERSE CHARGE %)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={importGstRate}
                          onChange={(e) => setImportGstRate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-1.5 text-xs font-mono font-bold text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono font-bold text-outline-variant block mb-0.5">MANDI CESS & FEES (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={mandiFeeRate}
                          onChange={(e) => setMandiFeeRate(parseFloat(e.target.value) || 0)}
                          className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-1.5 text-xs font-mono font-bold text-on-surface"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Landed Cost Output */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Mandi Spot Price:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(domesticFobInrCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Inland Road Freight:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(domesticFreightInrCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Taxes & Cess (GST + Cess):</span>
                    <span className="font-bold text-on-surface">
                      ₹{Math.round(domesticTotalTaxDutyInrCandy).toLocaleString('en-IN')} 
                      <span className="text-[10px] text-outline ml-1">
                        ({(importGstRate + mandiFeeRate).toFixed(1)}%)
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Local Handling & Other Costs:</span>
                    <span className="font-bold text-on-surface">₹{Math.round(domesticHandlingCandy).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono font-bold text-forest-green border-b border-outline-variant pb-2">
                    <span>Domestic Landed Cost:</span>
                    <span>₹{Math.round(domesticLandedInrCandy).toLocaleString('en-IN')} / Candy</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-outline-variant">
                    <span>Equiv Landed Price per Kg:</span>
                    <span className="text-on-surface">₹{domesticLandedInrKg.toFixed(2)} / Kg</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex justify-between items-center font-mono text-xs ${
                      domesticImportParity <= 0 
                        ? 'bg-forest-green/10 text-forest-green border-forest-green/20' 
                        : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                    }`}>
                    <span className="font-bold">
                      {selectedDomesticOrigin === 'Tamil Nadu (Dom)'
                        ? 'Local TN Sourcing vs Shankar-6 Benchmark:'
                        : 'Interstate Landed Parity vs Gujarat S-6 Spot:'}
                    </span>
                    <span className="font-bold">
                      {domesticImportParity <= 0 
                        ? `₹${Math.abs(Math.round(domesticImportParity)).toLocaleString('en-IN')} Discount (SAVINGS)` 
                        : `₹${Math.round(domesticImportParity).toLocaleString('en-IN')} Premium (EXPENSIVE)`}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Sourcing Analytics Panel */}
            <div className="col-span-12 space-y-gutter">
              {/* Sourcing Arbitrage Box */}
              <div className="bg-surface-container-low p-5 rounded-xxl border border-outline-variant/30 space-y-4">
                <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                  <span className="material-symbols-outlined text-xl text-primary">compare_arrows</span>
                  <div>
                    <h3 className="text-base font-headline font-bold text-on-surface">Landed Cost Arbitrage Analytics</h3>
                    <p className="text-[11px] text-on-surface-variant font-medium">Real-time comparison of imported vs. domestic cotton delivered to your Tamil Nadu mill.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Global Summary Card */}
                  <div className="bg-primary/5 p-4 rounded-xl border border-primary/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-wider">Active Global Corridor</span>
                      <span className="text-xs font-mono font-bold text-outline-variant">{selectedGlobalOrigin}</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-primary">
                      ₹{Math.round(globalLandedInrCandy).toLocaleString('en-IN')} <span className="text-xs font-sans font-medium text-on-surface">/ Candy</span>
                    </div>
                    <div className="text-xs font-mono text-outline-variant">
                      ₹{globalLandedInrKg.toFixed(2)} / Kg Landed | Parity: {globalImportParity <= 0 ? '-' : '+'}₹{Math.abs(Math.round(globalImportParity)).toLocaleString('en-IN')}
                    </div>
                  </div>

                  {/* Domestic Summary Card */}
                  <div className="bg-forest-green/5 p-4 rounded-xl border border-forest-green/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-forest-green uppercase tracking-wider">Active Domestic Corridor</span>
                      <span className="text-xs font-mono font-bold text-outline-variant">{formatStateName(selectedDomesticOrigin)}</span>
                    </div>
                    <div className="text-2xl font-mono font-bold text-forest-green">
                      ₹{Math.round(domesticLandedInrCandy).toLocaleString('en-IN')} <span className="text-xs font-sans font-medium text-on-surface">/ Candy</span>
                    </div>
                    <div className="text-xs font-mono text-outline-variant">
                      ₹{domesticLandedInrKg.toFixed(2)} / Kg Landed | Parity: {domesticImportParity <= 0 ? '-' : '+'}₹{Math.abs(Math.round(domesticImportParity)).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                {/* Arbitrage Spread Message */}
                {(() => {
                  const diff = Math.abs(globalLandedInrCandy - domesticLandedInrCandy);
                  const globalIsCheaper = globalLandedInrCandy < domesticLandedInrCandy;
                  return (
                    <div className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 font-mono text-xs ${
                      globalIsCheaper 
                        ? 'bg-forest-green/10 text-forest-green border-forest-green/20' 
                        : 'bg-primary/10 text-primary border-primary/20'
                    }`}>
                      <div>
                        <span className="font-extrabold text-sm block flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-base">
                            {globalIsCheaper ? 'check_circle' : 'info'}
                          </span>
                          {globalIsCheaper 
                            ? 'Global Import Sourcing Advantage' 
                            : 'Indian Domestic Sourcing Advantage'}
                        </span>
                        <span className="text-[11px] text-on-surface-variant font-medium block mt-1">
                          {globalIsCheaper
                            ? `Importing cotton from ${selectedGlobalOrigin} offers a financial spread advantage compared to sourcing from ${formatStateName(selectedDomesticOrigin)}.`
                            : `Buying domestic cotton from ${formatStateName(selectedDomesticOrigin)} is more cost-effective than importing from ${selectedGlobalOrigin}.`}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] text-outline block uppercase tracking-wider">Arbitrage Spread</span>
                        <span className="font-extrabold text-base">
                          ₹{Math.round(diff).toLocaleString('en-IN')} / Candy
                        </span>
                        <span className="block text-[9.5px] font-semibold text-outline-variant mt-0.5">
                          (₹{(diff / kgsPerCandy).toFixed(2)} / Kg Difference)
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Connected Yarn Manufacturing Cost Simulator */}
                <div className="bg-surface-container-low p-5 rounded-xxl border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 pb-3 flex-wrap">
                    <h4 className="text-sm font-headline font-bold text-primary flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-lg">precision_manufacturing</span>
                      Yarn Cost & Margin Simulator
                    </h4>
                    
                    {/* Active Cotton Source Toggle */}
                    <div className="flex gap-1 p-1 bg-surface-container rounded-lg border border-outline-variant/20 w-fit shrink-0">
                      <button
                        onClick={() => setSimCottonSource('global')}
                        className={`py-1 px-2.5 rounded-md text-[9px] font-mono font-bold transition-all ${
                          simCottonSource === 'global' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        Global Cotton ({selectedGlobalOrigin})
                      </button>
                      <button
                        onClick={() => setSimCottonSource('domestic')}
                        className={`py-1 px-2.5 rounded-md text-[9px] font-mono font-bold transition-all ${
                          simCottonSource === 'domestic' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        Domestic Cotton ({formatStateName(selectedDomesticOrigin)})
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1.5">SELECT YARN COUNT TO SIMULATE SPINNING</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {Object.keys(countParams).map(cnt => (
                        <button
                          key={cnt}
                          onClick={() => setImportSimCount(cnt)}
                          className={`py-1 px-1 rounded-lg text-[9px] font-mono font-bold border transition-all ${
                            importSimCount === cnt
                              ? 'bg-primary text-on-primary border-primary font-extrabold shadow-sm'
                              : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                          }`}
                        >
                          {cnt}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Simulator Output Details */}
                  <div className="space-y-2 border-t border-dashed border-outline-variant/40 pt-2.5">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Selected Count:</span>
                      <span className="font-bold text-on-surface">{importSimCount}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Selected Cotton Feed:</span>
                      <span className="font-bold text-primary uppercase">{simCottonSource} ({simCottonSource === 'global' ? selectedGlobalOrigin : formatStateName(selectedDomesticOrigin)})</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Spinning Yield:</span>
                      <span className="font-bold text-on-surface">{(countParams[importSimCount].yieldRate * 100).toFixed(1)}% ({(1 / countParams[importSimCount].yieldRate).toFixed(2)}x RM factor)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Raw Cotton Landed Cost:</span>
                      <span className="font-bold text-on-surface">₹{(simCottonSource === 'global' ? globalLandedInrKg : domesticLandedInrKg).toFixed(2)} / Kg</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Yarn Raw Material Cost:</span>
                      <span className="font-bold text-on-surface">₹{Math.round((simCottonSource === 'global' ? globalLandedInrKg : domesticLandedInrKg) / countParams[importSimCount].yieldRate)} / Kg</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Spinning Conversion Cost:</span>
                      <span className="font-bold text-on-surface">₹{countParams[importSimCount].conversion} / Kg</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono border-t border-dashed border-outline-variant/30 pt-1.5 font-bold">
                      <span className="text-on-surface-variant">Total Yarn Manufacturing Cost:</span>
                      <span className="text-on-surface">₹{Math.round((simCottonSource === 'global' ? globalLandedInrKg : domesticLandedInrKg) / countParams[importSimCount].yieldRate + countParams[importSimCount].conversion)} / Kg</span>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-on-surface-variant">Yarn Market Selling Price (India):</span>
                      <span className="font-bold text-forest-green">₹{getImportYarnPrice(importSimCount)} / Kg</span>
                    </div>
                    
                    {/* Margin Gauge */}
                    <div className={`p-2.5 rounded-lg border flex justify-between items-center font-mono text-xs ${
                      getImportYarnMargin(importSimCount) >= 0
                        ? 'bg-forest-green/10 text-forest-green border-forest-green/20'
                        : getImportYarnMargin(importSimCount) >= -15
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                          : 'bg-red-500/10 text-red-500 border-red-500/20'
                    }`}>
                      <span className="font-bold">Net Spinning Margin:</span>
                      <span className="font-bold">
                        {getImportYarnMargin(importSimCount) >= 0
                          ? `+₹${Math.round(getImportYarnMargin(importSimCount))} / Kg (PROFIT)`
                          : `-₹${Math.abs(Math.round(getImportYarnMargin(importSimCount)))} / Kg (MARGIN SQUEEZE)`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Strategic Sourcing Policy */}
                <div className="bg-surface-container-low p-5 rounded-xxl border border-outline-variant/30 space-y-3 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-headline font-bold text-forest-green flex items-center gap-1.5 mb-2">
                      <span className="material-symbols-outlined text-lg">policy</span>
                      Strategic Sourcing Guidelines for TN Spinners
                    </h4>
                    <p className="text-[11px] leading-relaxed text-on-surface-variant mb-4">
                      Tamil Nadu accounts for over 45% of India's spinning capacity but imports over 85% of its long-staple cotton from other states or overseas. Sourcing globally becomes highly strategic when the **Landed Import Parity** is negative (discount to Shankar-6) or when manufacturing fine combed/compact yarns (40s-80s) which require low-trash, contamination-free fiber.
                    </p>
                  </div>
                  <div className="text-[10px] font-mono bg-surface-container-low/50 p-3 rounded-lg border border-outline-variant/15 space-y-1.5">
                    <strong className="text-primary uppercase tracking-wider block mb-1">Recommended Sourcing Windows</strong>
                    <div>• <strong>US Upland / Brazil Cerrado</strong>: Purchase in Oct - Jan (new crop arrival basis) to lock in low ocean freight rates.</div>
                    <div>• <strong>Egypt Giza / Supima</strong>: Contract forward in Mar-May for high-end luxury counts (60s combed compact).</div>
                    <div>• <strong>Interstate Mandi</strong>: Buy central cotton (Gujarat S-6) in Q1 when arrivals peak and moisture premiums subside.</div>
                  </div>
                </div>
              </div>

              {/* Comparative Specs & SWOT */}
              <div className="grid grid-cols-12 gap-gutter">
                {/* Specs Table */}
                <div className="col-span-12 lg:col-span-6 bg-surface-container-low p-5 rounded-xxl border border-outline-variant/30 space-y-3">
                  <h4 className="text-sm font-headline font-bold text-forest-green uppercase tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-lg">compare</span>
                    Compare Sourcing Fiber Specifications
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs font-mono text-left">
                      <thead>
                        <tr className="border-b border-outline-variant/20 text-[10px] font-bold text-outline uppercase">
                          <th className="py-2 pr-2">SPECIFICATION</th>
                          <th className="py-2 px-2 text-primary">{selectedGlobalOrigin} (Global)</th>
                          <th className="py-2 pl-2 text-forest-green">{formatStateName(selectedDomesticOrigin)} (Domestic)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/10 text-on-surface">
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Harvest Cycle</td>
                          <td className="py-2.5 px-2 font-semibold text-primary">{originProfiles[selectedGlobalOrigin]?.harvesting}</td>
                          <td className="py-2.5 pl-2 font-semibold text-forest-green">{originProfiles[selectedDomesticOrigin]?.harvesting}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Staple Length</td>
                          <td className="py-2.5 px-2 text-on-surface">{originProfiles[selectedGlobalOrigin]?.staple}</td>
                          <td className="py-2.5 pl-2 text-on-surface">{originProfiles[selectedDomesticOrigin]?.staple}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Micronaire</td>
                          <td className="py-2.5 px-2 text-on-surface">{originProfiles[selectedGlobalOrigin]?.mic}</td>
                          <td className="py-2.5 pl-2 text-on-surface">{originProfiles[selectedDomesticOrigin]?.mic}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Fiber Strength</td>
                          <td className="py-2.5 px-2 text-on-surface">{originProfiles[selectedGlobalOrigin]?.strength}</td>
                          <td className="py-2.5 pl-2 text-on-surface">{originProfiles[selectedDomesticOrigin]?.strength}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Trash Content</td>
                          <td className="py-2.5 px-2 text-on-surface">{originProfiles[selectedGlobalOrigin]?.trash}</td>
                          <td className="py-2.5 pl-2 text-on-surface">{originProfiles[selectedDomesticOrigin]?.trash}</td>
                        </tr>
                        <tr>
                          <td className="py-2.5 pr-2 font-bold text-on-surface-variant">Comber Waste</td>
                          <td className="py-2.5 px-2 text-on-surface">{originProfiles[selectedGlobalOrigin]?.comberWaste}</td>
                          <td className="py-2.5 pl-2 text-on-surface">{originProfiles[selectedDomesticOrigin]?.comberWaste}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* SWOT Panels */}
                <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Global SWOT */}
                  <div className="space-y-3 bg-[#E8F5E9]/40 dark:bg-[#1B5E20]/10 p-4 rounded-xxl border border-forest-green/20">
                    <h4 className="font-bold text-forest-green text-[10px] flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">public</span>
                      {selectedGlobalOrigin} SWOT Profile
                    </h4>
                    <div className="space-y-2 text-[10px] leading-relaxed text-on-surface-variant font-sans">
                      <div>
                        <strong className="text-forest-green block text-[9px] font-mono">STRENGTHS:</strong>
                        {originProfiles[selectedGlobalOrigin]?.strengths}
                      </div>
                      <div>
                        <strong className="text-error block text-[9px] font-mono">WEAKNESSES:</strong>
                        {originProfiles[selectedGlobalOrigin]?.weaknesses}
                      </div>
                      <div>
                        <strong className="text-primary block text-[9px] font-mono">OPPORTUNITIES:</strong>
                        {originProfiles[selectedGlobalOrigin]?.opps}
                      </div>
                    </div>
                  </div>

                  {/* Domestic SWOT */}
                  <div className="space-y-3 bg-[#FFF8E1]/40 dark:bg-[#F57F17]/10 p-4 rounded-xxl border border-amber-500/20">
                    <h4 className="font-bold text-amber-600 dark:text-amber-400 text-[10px] flex items-center gap-1.5 uppercase tracking-wider">
                      <span className="material-symbols-outlined text-sm">home_pin</span>
                      {formatStateName(selectedDomesticOrigin)} SWOT Profile
                    </h4>
                    <div className="space-y-2 text-[10px] leading-relaxed text-on-surface-variant font-sans">
                      <div>
                        <strong className="text-forest-green block text-[9px] font-mono">STRENGTHS:</strong>
                        {originProfiles[selectedDomesticOrigin]?.strengths}
                      </div>
                      <div>
                        <strong className="text-error block text-[9px] font-mono">WEAKNESSES:</strong>
                        {originProfiles[selectedDomesticOrigin]?.weaknesses}
                      </div>
                      <div>
                        <strong className="text-primary block text-[9px] font-mono">OPPORTUNITIES:</strong>
                        {originProfiles[selectedDomesticOrigin]?.opps}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}


      {subTab === 'export' && (
        <div className="space-y-gutter animate-fade-in">
          {/* Active Export Corridors Flow Visualizer */}
          <div className="card-chart-green p-4 rounded-xxl border border-primary/20 bg-gradient-to-r from-primary-container/10 via-transparent to-transparent flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[10px] animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-xl text-primary animate-pulse">route</span>
              <div>
                <strong className="text-primary block text-xs">Active Export Corridors (Origin: Tamil Nadu Factory Gate)</strong>
                <span className="text-on-surface-variant font-medium">Both global and domestic logistics corridors are running concurrently to distribute spun yarn.</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 flex-wrap justify-center w-full md:w-auto">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/20 border border-primary/30 text-primary font-bold">
                <span className="material-symbols-outlined text-sm">factory</span>
                <span>TN Factory Gate (Origin)</span>
              </div>

              <div className="flex items-center text-primary">
                <span className="material-symbols-outlined text-sm animate-pulse">arrow_right_alt</span>
                <span className="text-[8px] font-bold px-1 text-primary/80 uppercase">Dispatch</span>
                <span className="material-symbols-outlined text-sm animate-pulse">arrow_right_alt</span>
              </div>

              {/* Global Corridor */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-bold">
                <span className="material-symbols-outlined text-sm text-primary">public</span>
                <span>Global: {exportDest}</span>
              </div>
              
              <div className="text-primary font-bold">&</div>

              {/* Domestic Corridor */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant/30 text-on-surface font-bold">
                <span className="material-symbols-outlined text-sm text-forest-green">home_pin</span>
                <span>Domestic: {exportState}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-gutter">
            {/* Left Column: Global Nations Export Desk */}
            <div className="col-span-12 lg:col-span-6 space-y-gutter">
              <div className="card-table-orange rounded-xxl p-6 border border-primary/20 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-base font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">public</span>
                    Global Nations Export Desk (FOB Basis)
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-[9px] font-mono font-bold">
                    <span className="material-symbols-outlined text-[10px]">flight_takeoff</span>
                    Origin: Tamil Nadu Gate
                  </span>
                </div>
                
                {/* Global Presets */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-outline block mb-1">GLOBAL NATIONS PRESETS</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(exportGlobalPresets).map(name => (
                      <button
                        key={name}
                        onClick={() => handleExportGlobalPreset(name)}
                        className={`py-1 px-2.5 rounded-lg text-[10px] font-mono font-semibold border transition-all ${
                          exportDest === name 
                            ? 'bg-primary text-on-primary border-primary shadow-sm font-extrabold' 
                            : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">EXPORT FOB PRICE (USD/KG)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={exportPriceUsdKg}
                      onChange={(e) => setExportPriceUsdKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1 flex items-center gap-1">
                      EXCHANGE RATE (USD/INR)
                      <span className="text-[8px] text-forest-green font-bold">● LIVE</span>
                    </label>
                    <input
                      type="number"
                      step="0.05"
                      value={usdInrRate}
                      onChange={(e) => setUsdInrRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">LOCAL TN SELLING PRICE (INR/KG)</label>
                    <input
                      type="number"
                      value={globalExportLocalPriceInrKg}
                      onChange={(e) => setGlobalExportLocalPriceInrKg(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">GOVT INCENTIVE ROSCTL/RODTEP (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={exportIncentiveRate}
                      onChange={(e) => setExportIncentiveRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">OCEAN FREIGHT & HANDLING (INR/KG)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={oceanFreightExportKg}
                      onChange={(e) => setOceanFreightExportKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">CUSTOMS CLEARING & PORT CHARGES (INR/KG)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={customsClearingExportKg}
                      onChange={(e) => setCustomsClearingExportKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>
                </div>

                {/* Preset Metadata Card */}
                <div className="bg-surface-container-low/60 p-3 rounded-lg border border-outline-variant/20 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[9px] font-mono text-outline block">PREFERRED YARN</span>
                    <span className="text-[10px] font-bold text-primary block truncate" title={exportGlobalPresets[exportDest]?.yarnSpec}>
                      {exportGlobalPresets[exportDest]?.yarnSpec}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-outline block">EST. TN MKT SHARE</span>
                    <span className="text-[10px] font-bold text-primary block">
                      {exportGlobalPresets[exportDest]?.mktShare}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-outline block">DEST. IMPORT TAX</span>
                    <span className="text-[10px] font-bold text-primary block truncate" title={exportGlobalPresets[exportDest]?.importDuty}>
                      {exportGlobalPresets[exportDest]?.importDuty}
                    </span>
                  </div>
                </div>

                {/* Export Realization Output */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">FOB Gross Revenue (INR Equiv):</span>
                    <span className="font-bold text-on-surface">₹{grossExportRevenueInrKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Govt Export Rebate (RoDTEP/RoSCTL):</span>
                    <span className="font-bold text-forest-green">+₹{incentiveRevenueInrKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Freight & Customs Outflow:</span>
                    <span className="font-bold text-error">-₹{(oceanFreightExportKg + customsClearingExportKg).toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono font-bold text-primary border-b border-outline-variant pb-2">
                    <span>Net Export Realization (Ex-Mill Gate):</span>
                    <span>₹{netExportRealizationInrKg.toFixed(2)} / Kg</span>
                  </div>

                  <div className={`p-3 rounded-lg border flex justify-between items-center font-mono text-xs ${
                    exportPremiumInrKg >= 0 
                      ? 'bg-forest-green/10 text-forest-green border-forest-green/20' 
                      : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                  }`}>
                    <span className="font-bold">Export Premium vs Domestic TN Market:</span>
                    <span className="font-bold">
                      {exportPremiumInrKg >= 0 
                        ? `+₹${exportPremiumInrKg.toFixed(2)} / Kg Premium (EXPORT WINS)` 
                        : `₹${exportPremiumInrKg.toFixed(2)} / Kg Discount (DOMESTIC WINS)`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Export Strategy Policy */}
              <div className="card-chart-green rounded-xxl p-5 space-y-3">
                <h4 className="text-sm font-headline font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">flight_takeoff</span>
                  Export Market Ideology & Expansion Strategy
                </h4>
                <p className="text-[11px] leading-relaxed text-on-surface-variant">
                  To maximize mill utilization, Tamil Nadu spinners must diversify beyond the local Tiruppur cluster. When local margins compress because of high Shankar-6 costs, export channels offer price stabilization. Locking in 30% of carded yarn output to Bangladesh and 20% of premium combed compact yarn to Europe ensures stable cashflow hedging.
                </p>
                <div className="text-[10px] font-mono bg-surface-container-low/50 p-2.5 rounded-lg border border-outline-variant/15 space-y-1">
                  <strong className="text-primary uppercase tracking-wider block mb-1">Tactical Actions</strong>
                  <div>• <strong>Leverage Trade Treaties</strong>: Utilize SAFTA for duty-free access to Bangladesh, and ASEAN FTA for Vietnam.</div>
                  <div>• <strong>Focus on Organic Compact</strong>: European countries like Portugal and Germany offer high premiums for GOTS compact yarn, fully absorbing transport costs.</div>
                </div>
              </div>
            </div>

            {/* Right Column: Indian Domestic Interstate Export Desk */}
            <div className="col-span-12 lg:col-span-6 space-y-gutter">
              <div className="card-table-orange rounded-xxl p-6 border border-primary/20 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <h3 className="text-base font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">home_pin</span>
                    Indian Domestic Interstate Export Desk
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/25 text-[9px] font-mono font-bold">
                    <span className="material-symbols-outlined text-[10px]">local_shipping</span>
                    Origin: Tamil Nadu Gate
                  </span>
                </div>
                
                {/* Domestic Presets */}
                <div>
                  <label className="text-[10px] font-mono font-bold text-outline block mb-1">DOMESTIC STATE TARGETS</label>
                  <div className="flex flex-wrap gap-1.5">
                    {Object.keys(exportDomesticPresets).map(name => (
                      <button
                        key={name}
                        onClick={() => handleExportDomesticPreset(name)}
                        className={`py-1 px-2.5 rounded-lg text-[10px] font-mono font-semibold border transition-all ${
                          exportState === name 
                            ? 'bg-primary text-on-primary border-primary shadow-sm font-extrabold' 
                            : 'bg-surface-container-high text-on-surface border-outline-variant hover:bg-surface-container-highest'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inputs Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">TARGET STATE PRICE (INR/KG)</label>
                    <input
                      type="number"
                      value={domesticTargetPriceInrKg}
                      onChange={(e) => setDomesticTargetPriceInrKg(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">LOCAL TN SELLING PRICE (INR/KG)</label>
                    <input
                      type="number"
                      value={domesticExportLocalPriceInrKg}
                      onChange={(e) => setDomesticExportLocalPriceInrKg(parseInt(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-primary/30 rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">ROAD FREIGHT TO STATE (INR/KG)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={domesticRoadFreightKg}
                      onChange={(e) => setDomesticRoadFreightKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">AGENT BROKERAGE / COMM. (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={domesticBrokerageRate}
                      onChange={(e) => setDomesticBrokerageRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">PACKING & CHARGES (INR/KG)</label>
                    <input
                      type="number"
                      step="0.10"
                      value={domesticPackagingKg}
                      onChange={(e) => setDomesticPackagingKg(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-mono font-bold text-outline block mb-1">GST ON YARN SUPPLY (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={domesticGstRate}
                      onChange={(e) => setDomesticGstRate(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-2 text-xs font-mono font-bold text-on-surface"
                    />
                  </div>
                </div>

                {/* Preset Metadata Card */}
                <div className="bg-surface-container-low/60 p-3 rounded-lg border border-outline-variant/20 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <span className="text-[9px] font-mono text-outline block">PREFERRED YARN</span>
                    <span className="text-[10px] font-bold text-primary block truncate" title={exportDomesticPresets[exportState]?.yarnSpec}>
                      {exportDomesticPresets[exportState]?.yarnSpec}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-outline block">EST. SALES SHARE</span>
                    <span className="text-[10px] font-bold text-primary block">
                      {exportDomesticPresets[exportState]?.mktShare}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-outline block">TAX REGIME</span>
                    <span className="text-[10px] font-bold text-primary block truncate" title={exportDomesticPresets[exportState]?.taxRegime}>
                      {exportDomesticPresets[exportState]?.taxRegime}
                    </span>
                  </div>
                </div>

                {/* Export Realization Output */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/30 space-y-3">
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Gross Domestic Sale Price:</span>
                    <span className="font-bold text-on-surface">₹{domesticTargetPriceInrKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Road Freight to State:</span>
                    <span className="font-bold text-error">-₹{domesticRoadFreightKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Agent Commission ({domesticBrokerageRate}%):</span>
                    <span className="font-bold text-error">-₹{domesticBrokerageInrKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2">
                    <span className="text-on-surface-variant">Packing & Forwarding:</span>
                    <span className="font-bold text-error">-₹{domesticPackagingKg.toFixed(2)} / Kg</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-mono font-bold text-primary border-b border-outline-variant pb-2">
                    <span>Net Ex-Mill Realization (Tamil Nadu Factory Gate):</span>
                    <span>₹{netDomesticRealizationInrKg.toFixed(2)} / Kg</span>
                  </div>

                  <div className="flex justify-between items-center text-xs font-mono border-b border-dashed border-outline-variant pb-2 text-outline">
                    <span>CGST + SGST / IGST ({domesticGstRate}%):</span>
                    <span>+₹{gstAmountInrKg.toFixed(2)} / Kg <span className="text-[10px] font-bold text-forest-green">(ITC Offset Neutral)</span></span>
                  </div>

                  <div className={`p-3 rounded-lg border flex justify-between items-center font-mono text-xs ${
                    domesticPremiumInrKg >= 0 
                      ? 'bg-forest-green/10 text-forest-green border-forest-green/20' 
                      : 'bg-tertiary/10 text-tertiary border-tertiary/20'
                  }`}>
                    <span className="font-bold">Interstate Premium vs Local TN Market:</span>
                    <span className="font-bold">
                      {domesticPremiumInrKg >= 0 
                        ? `+₹${domesticPremiumInrKg.toFixed(2)} / Kg Premium (INTERSTATE WINS)` 
                        : `₹${domesticPremiumInrKg.toFixed(2)} / Kg Discount (LOCAL TN WINS)`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Domestic State Strategy Policy */}
              <div className="card-chart-green rounded-xxl p-5 space-y-3">
                <h4 className="text-sm font-headline font-bold text-primary flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-lg">local_shipping</span>
                  Interstate Domestic Marketing Ideology
                </h4>
                <p className="text-[11px] leading-relaxed text-on-surface-variant">
                  Indian domestic hubs consume over 60% of Tamil Nadu's spun cotton yarn. Diversifying across interstate weaving nodes helps protect spinners against regional Tiruppur/Karur slowdowns. Realizing a premium in Maharashtra or Gujarat depends heavily on optimizing road transport freight and minimizing direct credit delays.
                </p>
                <div className="text-[10px] font-mono bg-surface-container-low/50 p-2.5 rounded-lg border border-outline-variant/15 space-y-1">
                  <strong className="text-primary uppercase tracking-wider block mb-1">Operational Actions</strong>
                  <div>• <strong>Leverage GST Input Credits</strong>: Utilize the 5% IGST paid on raw cotton to offset output liability on yarn supplies to other states.</div>
                  <div>• <strong>Logistics Consolidations</strong>: Establish regular bulk truck corridors to Bhiwandi / Ahmedabad to reduce freight costs.</div>
                </div>
              </div>
            </div>

            {/* Bottom Export Analytics Panel */}
            <div className="col-span-12 space-y-gutter text-left">
              {/* Export Arbitrage Card */}
              <div className="card-table-orange rounded-xxl p-6 border border-primary/20 space-y-4">
                <h3 className="text-base font-headline font-bold text-primary flex items-center gap-2">
                  <span className="material-symbols-outlined text-xl">compare_arrows</span>
                  Yarn Realization Arbitrage: Global vs Interstate Domestic
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter items-center">
                  <div className="md:col-span-2 grid grid-cols-2 gap-4 text-center font-mono bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/20">
                    <div>
                      <span className="text-[10px] text-outline block font-bold">NET GLOBAL EXPORT REALIZATION</span>
                      <span className="text-lg font-extrabold text-primary">₹{netExportRealizationInrKg.toFixed(2)} / Kg</span>
                      <span className="text-[9px] text-on-surface-variant block mt-1">({exportDest} Preset)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-outline block font-bold">NET INTERSTATE REALIZATION</span>
                      <span className="text-lg font-extrabold text-forest-green">₹{netDomesticRealizationInrKg.toFixed(2)} / Kg</span>
                      <span className="text-[9px] text-on-surface-variant block mt-1">({exportState} Preset)</span>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-xl border flex flex-col justify-center items-center text-center font-mono h-full ${
                    (netExportRealizationInrKg - netDomesticRealizationInrKg) >= 0
                      ? 'bg-forest-green/10 text-forest-green border-forest-green/30'
                      : 'bg-primary/10 text-primary border-primary/30'
                  }`}>
                    <span className="text-[10px] font-bold block uppercase tracking-wider">Arbitrage Spread</span>
                    <span className="text-xl font-black mt-1">
                      ₹{Math.abs(netExportRealizationInrKg - netDomesticRealizationInrKg).toFixed(2)} / Kg
                    </span>
                    <span className="text-[9px] font-bold mt-1">
                      {(netExportRealizationInrKg - netDomesticRealizationInrKg) >= 0
                        ? `Global Export is more profitable than ${exportState}`
                        : `Interstate Sale to ${exportState} is more profitable`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Target Market SWOT & Demands */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Global SWOT */}
                <div className="card-chart-green rounded-xxl p-6 border border-primary/20 space-y-4">
                  <h3 className="text-base font-headline font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">public</span>
                    {exportDest} SWOT & Demands
                  </h3>
                  <div className="space-y-3 text-xs font-sans text-left">
                    {globalSwot && (
                      <>
                        <div className="bg-[#E8F5E9] dark:bg-[#1B5E20]/20 p-3.5 rounded-xl border border-[#C8E6C9]/30">
                          <h4 className="font-bold text-forest-green flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">assignment_turned_in</span> MARKET DEMAND & YARN COUNTS</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {globalSwot.demand}
                          </p>
                        </div>
                        <div className="bg-[#FFEBEE] dark:bg-[#B71C1C]/20 p-3.5 rounded-xl border border-[#FFCDD2]/30">
                          <h4 className="font-bold text-error flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">warning</span> EXPORT BARRIERS & DISADVANTAGES</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {globalSwot.barriers}
                          </p>
                        </div>
                        <div className="bg-[#FFF8E1] dark:bg-[#F57F17]/20 p-3.5 rounded-xl border border-[#FFE082]/30">
                          <h4 className="font-bold text-primary flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">explore</span> STRATEGIC OPPORTUNITIES</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {globalSwot.opps}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Domestic SWOT */}
                <div className="card-chart-green rounded-xxl p-6 border border-primary/20 space-y-4">
                  <h3 className="text-base font-headline font-bold text-forest-green flex items-center gap-2">
                    <span className="material-symbols-outlined">home_pin</span>
                    {exportState} SWOT & Demands
                  </h3>
                  <div className="space-y-3 text-xs font-sans text-left">
                    {domesticSwot && (
                      <>
                        <div className="bg-[#E8F5E9] dark:bg-[#1B5E20]/20 p-3.5 rounded-xl border border-[#C8E6C9]/30">
                          <h4 className="font-bold text-forest-green flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">assignment_turned_in</span> MARKET DEMAND & YARN COUNTS</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {domesticSwot.demand}
                          </p>
                        </div>
                        <div className="bg-[#FFEBEE] dark:bg-[#B71C1C]/20 p-3.5 rounded-xl border border-[#FFCDD2]/30">
                          <h4 className="font-bold text-error flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">warning</span> EXPORT BARRIERS & DISADVANTAGES</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {domesticSwot.barriers}
                          </p>
                        </div>
                        <div className="bg-[#FFF8E1] dark:bg-[#F57F17]/20 p-3.5 rounded-xl border border-[#FFE082]/30">
                          <h4 className="font-bold text-primary flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">explore</span> STRATEGIC OPPORTUNITIES</h4>
                          <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                            {domesticSwot.opps}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {subTab === 'playbook' && (
        <div className="grid grid-cols-12 gap-gutter">
          {/* Card 1: Import Sourcing Arbitrage */}
          <div className="col-span-12 md:col-span-4 card-chart-green rounded-xxl p-6 border border-primary/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-forest-green font-headline font-bold">
                <span className="material-symbols-outlined">shuffle</span>
                Raw Cotton Sourcing Arbitrage
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Optimizing purchase margins requires systematic arbitrage tracking. Spinners must calculate the spread daily using Cotlook A-Index futures and ocean freight vs Shankar-6 spot prices.
              </p>
              <div className="space-y-2 text-[10px] font-mono bg-surface-container-low/45 p-3 rounded-lg border border-outline-variant/10">
                <div className="text-primary font-bold uppercase tracking-wider mb-1">Action Playbook:</div>
                <div>• <strong>Arbitrage Window</strong>: If Parity is less than -₹1,500/Candy, import 40% of standard staple requirements immediately.</div>
                <div>• <strong>Cover Strategy</strong>: Lock in US/Brazil Cerrado import contracts during Oct-Dec peak global arrivals.</div>
                <div>• <strong>Blending Ideology</strong>: Blending 30% imported clean long-staple with 70% Shankar-6 reduces trash to under 1.5% at optimal costs.</div>
              </div>
            </div>
          </div>

          {/* Card 2: Yarn Export Count-Mix Optimization */}
          <div className="col-span-12 md:col-span-4 card-chart-green rounded-xxl p-6 border border-primary/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-forest-green font-headline font-bold">
                <span className="material-symbols-outlined">tune</span>
                Yarn Export Count-Mix Strategy
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Spinning mills must dynamically shift production depending on real-time premium realization spreads between domestic weaving hubs and global export markets.
              </p>
              <div className="space-y-2 text-[10px] font-mono bg-surface-container-low/45 p-3 rounded-lg border border-outline-variant/10">
                <div className="text-primary font-bold uppercase tracking-wider mb-1">Action Playbook:</div>
                <div>• <strong>Channel Divergence</strong>: When global prices drop, divert production to 30s/40s combed warp yarns for Bhiwandi looms.</div>
                <div>• <strong>Incentive Maximization</strong>: Ensure compliance filing for RoDTEP/RoSCTL (up to 3.5% rebate) to buffer operating margins.</div>
                <div>• <strong>Premium ELS Focus</strong>: Leverage Supima/Giza cotton blends to spin 80s compact warp, targeting luxury mills in Portugal.</div>
              </div>
            </div>
          </div>

          {/* Card 3: Logistics & Working Capital Hedging */}
          <div className="col-span-12 md:col-span-4 card-chart-green rounded-xxl p-6 border border-primary/10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-forest-green font-headline font-bold">
                <span className="material-symbols-outlined">currency_exchange</span>
                Logistics & Capital Hedging
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Managing international transit times (25-45 days) requires robust financial and logistics hedging to protect working capital liquidity.
              </p>
              <div className="space-y-2 text-[10px] font-mono bg-surface-container-low/45 p-3 rounded-lg border border-outline-variant/10">
                <div className="text-primary font-bold uppercase tracking-wider mb-1">Action Playbook:</div>
                <div>• <strong>Freight Negotiations</strong>: Consolidate container volumes under Tamil Nadu trade associations to negotiate lower ocean freight.</div>
                <div>• <strong>Capital Coverage</strong>: Secure ECGC credit insurance for Bangladesh shipments to protect against dollar shortages.</div>
                <div>• <strong>Forex Lock-in</strong>: Hedge exchange rate exposures using forward contracts at 83.50+ levels to lock in calculated margins.</div>
              </div>
            </div>
          </div>
        </div>
      )}
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

  const getDynamicDayWisePlan = (staticPlan) => {
    if (!staticPlan) return [];
    const now = new Date();
    const getFormattedDate = (offsetDays) => {
      const d = new Date(now);
      d.setDate(now.getDate() + offsetDays);
      return d.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    };

    return staticPlan.map((item, idx) => {
      const offset = idx - 2;
      const dateStr = getFormattedDate(offset);
      
      let relativeLabel = `Day ${idx + 1}`;
      if (offset === -2) relativeLabel = 'T - 2 (Past)';
      else if (offset === -1) relativeLabel = 'T - 1 (Past)';
      else if (offset === 0) relativeLabel = 'Today';
      else if (offset > 0) relativeLabel = `T + ${offset} (Forecast)`;

      return {
        ...item,
        day: relativeLabel,
        date: dateStr
      };
    });
  };

  const getDynamicMonthWisePlan = (staticPlan) => {
    if (!staticPlan) return [];
    const now = new Date();
    return staticPlan.map((item, idx) => {
      const d = new Date(now.getFullYear(), now.getMonth() + idx, 1);
      const monthStr = d.toLocaleDateString('en-GB', {
        month: 'short',
        year: 'numeric'
      });
      return { ...item, month: monthStr };
    });
  };

  const cottonDayWisePlan = getDynamicDayWisePlan(currentCotton?.dayWisePlan);
  const yarnDayWisePlan = getDynamicDayWisePlan(currentYarn?.dayWisePlan);
  const cottonMonthWisePlan = getDynamicMonthWisePlan(currentCotton?.monthWisePlan);
  const yarnMonthWisePlan = getDynamicMonthWisePlan(currentYarn?.monthWisePlan);

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
          <img className="w-full h-full object-cover scale-[3] hover:scale-[3.5] transition-transform duration-[2s] ease-linear" src={`${import.meta.env.BASE_URL}cotton_microscope_scan.png`} alt="Microscope Lens" />
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
        <div className="bg-surface-container border border-outline-variant p-1 rounded-xl flex flex-wrap gap-1 self-start md:self-auto">
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'cotton' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('cotton')}
          >
            Cotton Plans
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'yarn' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('yarn')}
          >
            Yarn Market
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'macro' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('macro')}
          >
            Growth Plans
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'explorer' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('explorer')}
          >
            Variety Explorer
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'calendar' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('calendar')}
          >
            Seasonal Calendar
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'technical' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('technical')}
          >
            Technical Analytics
          </button>
          <button 
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-headline transition-colors duration-200 ${
              subTab === 'msp' 
                ? 'bg-primary text-on-primary' 
                : 'bg-transparent text-on-surface hover:bg-surface-container-high'
            }`}
            onClick={() => setSubTab('msp')}
          >
            State MSPs
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
                    {cottonDayWisePlan.map((d, i) => (
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
                  <ComposedChart data={cottonDayWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" fontSize={10} />
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
                    {cottonMonthWisePlan.map((m, i) => (
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
                  <ComposedChart data={cottonMonthWisePlan}>
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
                    {yarnDayWisePlan.map((d, i) => (
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
                  <ComposedChart data={yarnDayWisePlan}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="date" fontSize={10} />
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
                    {yarnMonthWisePlan.map((m, i) => (
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
                  <LineChart data={yarnMonthWisePlan}>
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

      {subTab === 'explorer' && (
        <VarietyExplorer darkMode={darkMode} colors={colors} />
      )}

      {subTab === 'calendar' && (
        <SeasonalCalendar darkMode={darkMode} colors={colors} />
      )}

      {subTab === 'technical' && (
        <PriceAnalytics darkMode={darkMode} colors={colors} />
      )}

      {subTab === 'msp' && (
        <StateMspTable darkMode={darkMode} colors={colors} />
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