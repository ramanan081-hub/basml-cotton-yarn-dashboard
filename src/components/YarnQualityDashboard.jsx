import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Cell
} from 'recharts';
import {
  Activity,
  ShieldAlert,
  Award,
  Database,
  TrendingUp,
  Layers
} from 'lucide-react';

const QUALITY_DATA = {

  '80s Compact ELS': {
    targetCount: 80,
    strength: 34.5,
    strengthGrade: 'Exceptional (Uster 1%)',
    countVariation: '+0.2%',
    cvPercent: '0.65%',
    totalIpi: 10,
    ipiGrade: 'Flawless (<15/km)',
    production: 8.5,
    hairiness: 2.80,
    elongation: 7.10,
    description: 'Spun from pure Egyptian Giza or US Pima. Operates with near-zero imperfection rates, catering exclusively to luxury global brands requiring immaculate fabric finishes.',
    strengthPoints: [
      { batch: 'B01', RKM: 34.1, target: 34.0 }, { batch: 'B02', RKM: 34.5, target: 34.0 }, { batch: 'B03', RKM: 34.3, target: 34.0 }, { batch: 'B04', RKM: 34.8, target: 34.0 }, { batch: 'B05', RKM: 34.2, target: 34.0 }, { batch: 'B06', RKM: 34.6, target: 34.0 }, { batch: 'B07', RKM: 34.4, target: 34.0 }
    ],
    countRun: [
      { day: 1, val: 79.9 }, { day: 2, val: 80.1 }, { day: 3, val: 80.0 }, { day: 4, val: 79.8 }, { day: 5, val: 80.2 }, { day: 6, val: 80.1 }, { day: 7, val: 79.9 }, { day: 8, val: 80.0 }, { day: 9, val: 80.1 }, { day: 10, val: 80.0 }, { day: 11, val: 79.9 }, { day: 12, val: 80.1 }, { day: 13, val: 80.0 }, { day: 14, val: 80.2 }, { day: 15, val: 80.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 1, benchmark: 4 },
      { name: 'Thick (+50%)', actual: 4, benchmark: 8 },
      { name: 'Neps (+200%)', actual: 5, benchmark: 10 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 8.4 }, { name: 'Tue', volume: 8.5 }, { name: 'Wed', volume: 8.6 }, { name: 'Thu', volume: 8.3 }, { name: 'Fri', volume: 8.5 }, { name: 'Sat', volume: 8.7 }, { name: 'Sun', volume: 8.8 }
    ]
  },
  '20s Carded': {
    targetCount: 20,
    strength: 18.2,
    strengthGrade: 'Standard (Uster 25%)',
    countVariation: '+1.5%',
    cvPercent: '1.45%',
    totalIpi: 120,
    ipiGrade: 'Standard (<150/km)',
    production: 32.5,
    hairiness: 5.80,
    elongation: 5.10,
    description: 'Rotor spun carded yarn for heavy fabrics. Emphasizes high production throughput over zero-defect metrics. Economical and rugged.',
    strengthPoints: [
      { batch: 'B01', RKM: 18.0, target: 18.0 }, { batch: 'B02', RKM: 18.5, target: 18.0 }, { batch: 'B03', RKM: 17.8, target: 18.0 }, { batch: 'B04', RKM: 18.8, target: 18.0 }, { batch: 'B05', RKM: 17.5, target: 18.0 }, { batch: 'B06', RKM: 18.2, target: 18.0 }, { batch: 'B07', RKM: 18.6, target: 18.0 }
    ],
    countRun: [
      { day: 1, val: 19.5 }, { day: 2, val: 20.2 }, { day: 3, val: 19.8 }, { day: 4, val: 20.4 }, { day: 5, val: 19.6 }, { day: 6, val: 20.1 }, { day: 7, val: 19.9 }, { day: 8, val: 20.3 }, { day: 9, val: 19.7 }, { day: 10, val: 20.5 }, { day: 11, val: 19.4 }, { day: 12, val: 20.0 }, { day: 13, val: 19.8 }, { day: 14, val: 20.2 }, { day: 15, val: 20.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 25, benchmark: 40 },
      { name: 'Thick (+50%)', actual: 45, benchmark: 60 },
      { name: 'Neps (+200%)', actual: 50, benchmark: 80 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 32.0 }, { name: 'Tue', volume: 32.5 }, { name: 'Wed', volume: 33.1 }, { name: 'Thu', volume: 31.8 }, { name: 'Fri', volume: 32.6 }, { name: 'Sat', volume: 33.0 }, { name: 'Sun', volume: 33.5 }
    ]
  },
  '30s Combed': {
    targetCount: 30,
    strength: 24.2,
    strengthGrade: 'Excellent (Uster 5%)',
    countVariation: '+0.6%',
    cvPercent: '0.95%',
    totalIpi: 36,
    ipiGrade: 'Optimal (<40/km)',
    production: 18.5,
    hairiness: 4.12,
    elongation: 6.20,
    description: 'Our 30s Combed cotton yarn is engineered for high-durability knitwear and woven apparel. Spun using high-grade MCU-5 cotton fibers with a stapled length of 30mm, this count balances high tensile strength with soft hand-feel. The low coefficient of variation in count makes it highly desirable for high-speed circular knitting machines, reducing needle breakages and cloth defects.',
    strengthPoints: [
      { batch: 'B01', RKM: 24.0, target: 24.0 },
      { batch: 'B02', RKM: 24.3, target: 24.0 },
      { batch: 'B03', RKM: 24.1, target: 24.0 },
      { batch: 'B04', RKM: 24.5, target: 24.0 },
      { batch: 'B05', RKM: 23.9, target: 24.0 },
      { batch: 'B06', RKM: 24.2, target: 24.0 },
      { batch: 'B07', RKM: 24.4, target: 24.0 }
    ],
    countRun: [
      { day: 1, val: 29.8 },
      { day: 2, val: 30.1 },
      { day: 3, val: 30.2 },
      { day: 4, val: 29.7 },
      { day: 5, val: 30.3 },
      { day: 6, val: 30.1 },
      { day: 7, val: 29.9 },
      { day: 8, val: 30.0 },
      { day: 9, val: 30.2 },
      { day: 10, val: 30.3 },
      { day: 11, val: 30.0 },
      { day: 12, val: 29.9 },
      { day: 13, val: 30.1 },
      { day: 14, val: 30.2 },
      { day: 15, val: 30.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 4, benchmark: 8 },
      { name: 'Thick (+50%)', actual: 14, benchmark: 22 },
      { name: 'Neps (+200%)', actual: 18, benchmark: 25 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 18.2 },
      { name: 'Tue', volume: 18.5 },
      { name: 'Wed', volume: 19.1 },
      { name: 'Thu', volume: 18.0 },
      { name: 'Fri', volume: 18.6 },
      { name: 'Sat', volume: 18.8 },
      { name: 'Sun', volume: 19.2 }
    ]
  },
  '40s Combed': {
    targetCount: 40,
    strength: 28.4,
    strengthGrade: 'Excellent (Uster 5%)',
    countVariation: '+0.5%',
    cvPercent: '0.80%',
    totalIpi: 22,
    ipiGrade: 'Optimal (<30/km)',
    production: 15.2,
    hairiness: 3.82,
    elongation: 6.45,
    description: 'The 40s Combed cotton yarn is our flagship product for premium shirting and fine voiles. Spun from long-staple Shankar-6 cotton (31.5mm staple length), it exhibits superb tensile properties. Our specialized combing process extracts 18% of short fibers, which minimizes thin and thick spots to far below standard Uster benchmarks. This ensures a clean, uniform fabric appearance after dyeing.',
    strengthPoints: [
      { batch: 'B01', RKM: 28.1, target: 28.0 },
      { batch: 'B02', RKM: 28.5, target: 28.0 },
      { batch: 'B03', RKM: 28.3, target: 28.0 },
      { batch: 'B04', RKM: 28.8, target: 28.0 },
      { batch: 'B05', RKM: 28.0, target: 28.0 },
      { batch: 'B06', RKM: 28.4, target: 28.0 },
      { batch: 'B07', RKM: 28.6, target: 28.0 }
    ],
    countRun: [
      { day: 1, val: 39.9 },
      { day: 2, val: 40.1 },
      { day: 3, val: 40.2 },
      { day: 4, val: 39.8 },
      { day: 5, val: 40.4 },
      { day: 6, val: 40.1 },
      { day: 7, val: 39.9 },
      { day: 8, val: 40.0 },
      { day: 9, val: 40.2 },
      { day: 10, val: 40.3 },
      { day: 11, val: 40.0 },
      { day: 12, val: 39.9 },
      { day: 13, val: 40.1 },
      { day: 14, val: 40.2 },
      { day: 15, val: 40.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 2, benchmark: 5 },
      { name: 'Thick (+50%)', actual: 8, benchmark: 15 },
      { name: 'Neps (+200%)', actual: 12, benchmark: 20 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 15.0 },
      { name: 'Tue', volume: 15.2 },
      { name: 'Wed', volume: 15.5 },
      { name: 'Thu', volume: 14.8 },
      { name: 'Fri', volume: 15.3 },
      { name: 'Sat', volume: 15.1 },
      { name: 'Sun', volume: 15.6 }
    ]
  },
  '60s Compact': {
    targetCount: 60,
    strength: 31.8,
    strengthGrade: 'Superior Premium',
    countVariation: '+0.3%',
    cvPercent: '0.65%',
    totalIpi: 17,
    ipiGrade: 'Excellent (<20/km)',
    production: 8.8,
    hairiness: 3.45,
    elongation: 5.90,
    description: 'The 60s Compact yarn leverages advanced pneumatic compaction technology during the ring spinning stage. By suppressing the spinning triangle, almost all fibers are integrated into the yarn body. This results in a reduction of hairiness by 30% and an increase in tensile strength (RKM) to 31.8 cN/tex. It is ideally suited for high-density warp knitting and fine luxury linens.',
    strengthPoints: [
      { batch: 'B01', RKM: 31.5, target: 31.0 },
      { batch: 'B02', RKM: 32.0, target: 31.0 },
      { batch: 'B03', RKM: 31.7, target: 31.0 },
      { batch: 'B04', RKM: 32.2, target: 31.0 },
      { batch: 'B05', RKM: 31.4, target: 31.0 },
      { batch: 'B06', RKM: 31.8, target: 31.0 },
      { batch: 'B07', RKM: 32.1, target: 31.0 }
    ],
    countRun: [
      { day: 1, val: 59.7 },
      { day: 2, val: 60.2 },
      { day: 3, val: 60.1 },
      { day: 4, val: 59.8 },
      { day: 5, val: 60.3 },
      { day: 6, val: 60.1 },
      { day: 7, val: 59.9 },
      { day: 8, val: 60.0 },
      { day: 9, val: 60.2 },
      { day: 10, val: 60.4 },
      { day: 11, val: 60.0 },
      { day: 12, val: 59.8 },
      { day: 13, val: 60.1 },
      { day: 14, val: 60.2 },
      { day: 15, val: 60.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 1.5, benchmark: 4 },
      { name: 'Thick (+50%)', actual: 6.0, benchmark: 10 },
      { name: 'Neps (+200%)', actual: 10.0, benchmark: 14 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 8.5 },
      { name: 'Tue', volume: 8.8 },
      { name: 'Wed', volume: 9.0 },
      { name: 'Thu', volume: 8.4 },
      { name: 'Fri', volume: 8.7 },
      { name: 'Sat', volume: 8.9 },
      { name: 'Sun', volume: 9.1 }
    ]
  },
  '80s Compact': {
    targetCount: 80,
    strength: 33.5,
    strengthGrade: 'Giza ELS Grade',
    countVariation: '+0.25%',
    cvPercent: '0.58%',
    totalIpi: 14,
    ipiGrade: 'Excellent (<15/km)',
    production: 4.5,
    hairiness: 3.12,
    elongation: 5.50,
    description: 'Our ultra-fine 80s Compact yarn represents the pinnacle of spinning precision, using imported Extra-Long Staple (ELS) Giza cotton. Spun in state-of-the-art humidity-controlled environments, this count features extremely high tensile values (33.5 cN/tex) to withstand fine weaving tensions. It is specifically produced for premium 100/2 count jacquards and sheer handkerchiefs.',
    strengthPoints: [
      { batch: 'B01', RKM: 33.2, target: 33.0 },
      { batch: 'B02', RKM: 33.7, target: 33.0 },
      { batch: 'B03', RKM: 33.4, target: 33.0 },
      { batch: 'B04', RKM: 34.0, target: 33.0 },
      { batch: 'B05', RKM: 33.1, target: 33.0 },
      { batch: 'B06', RKM: 33.5, target: 33.0 },
      { batch: 'B07', RKM: 33.8, target: 33.0 }
    ],
    countRun: [
      { day: 1, val: 79.6 },
      { day: 2, val: 80.3 },
      { day: 3, val: 80.1 },
      { day: 4, val: 79.7 },
      { day: 5, val: 80.4 },
      { day: 6, val: 80.1 },
      { day: 7, val: 79.9 },
      { day: 8, val: 80.0 },
      { day: 9, val: 80.2 },
      { day: 10, val: 80.3 },
      { day: 11, val: 80.0 },
      { day: 12, val: 79.8 },
      { day: 13, val: 80.1 },
      { day: 14, val: 80.2 },
      { day: 15, val: 80.0 }
    ],
    ipiBreakdown: [
      { name: 'Thin (-50%)', actual: 1.0, benchmark: 3 },
      { name: 'Thick (+50%)', actual: 5.0, benchmark: 8 },
      { name: 'Neps (+200%)', actual: 8.0, benchmark: 11 }
    ],
    productionOutput: [
      { name: 'Mon', volume: 4.3 },
      { name: 'Tue', volume: 4.5 },
      { name: 'Wed', volume: 4.7 },
      { name: 'Thu', volume: 4.2 },
      { name: 'Fri', volume: 4.4 },
      { name: 'Sat', volume: 4.6 },
      { name: 'Sun', volume: 4.8 }
    ]
  }
};

export default function YarnQualityDashboard({ darkMode, colors }) {
  const [selectedCount, setSelectedCount] = useState('40s Combed');
  const data = QUALITY_DATA[selectedCount];

  // Process control limits
  const target = data.targetCount;
  const ucl = target + (target * 0.02); // Upper Control Limit (+2%)
  const lcl = target - (target * 0.02); // Lower Control Limit (-2%)

  return (
    <div className="space-y-gutter">
      {/* Stitch Botanical Cotton Hero */}
      <section className="relative w-full h-[400px] rounded-3xl overflow-hidden glass-card glass-edge mb-8">
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-luminosity">
          <img alt="Botanical Cotton" className="w-full h-full object-cover" src={`${import.meta.env.BASE_URL}bg-cotton.png`} />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-12">
          <div className="absolute -top-10 -right-10 w-48 h-48 glass-card rounded-[40px] glass-edge z-20 flex flex-col items-center justify-center p-4 transform -rotate-6 animate-pulse">
            <span className="material-symbols-outlined text-primary text-4xl mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <span className="font-label-sm text-label-sm text-center">Certified Organic DNA</span>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-12 rounded-full glass-card flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>diamond</span>
            </span>
            <span className="font-mono text-xs text-primary uppercase tracking-widest">Quality Expression</span>
          </div>
          
          <h2 className="font-headline text-4xl md:text-5xl font-black text-on-surface mb-2">Zero Defect Integrity</h2>
          <p className="font-body text-base text-on-surface-variant max-w-2xl">
            Translating the natural perfection of raw cotton into mathematically flawless spun yarn. 
            Monitoring Uster metrics in real-time.
          </p>
        </div>
      </section>

      {/* Corporate Filter Selector bar */}
      <div className="bg-surface-container border border-outline-variant p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
            Select Count Spec:
          </span>
          <div className="flex flex-wrap gap-2">
            {Object.keys(QUALITY_DATA).map((count) => (
              <button
                key={count}
                className={`py-2 px-4 rounded-lg text-xs font-headline font-bold transition-all duration-200 border ${
                  selectedCount === count
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-high'
                }`}
                onClick={() => setSelectedCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
        <div className="text-xs font-mono text-on-surface-variant">
          Standard Test Reference: <span className="text-primary font-bold">Uster Statistics 2024</span>
        </div>
      </div>

      {/* Grid Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter">
        {/* Metric 1 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Strength (RKM)</span>
            <Award size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.strength}</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">{data.strengthGrade}</p>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Count Deviation</span>
            <Activity size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.countVariation}</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">CV%: {data.cvPercent}</p>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Total Defects</span>
            <ShieldAlert size={18} className="text-tertiary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.totalIpi}</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">{data.ipiGrade}</p>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Daily Output</span>
            <Database size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.production}T</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">Average Mill Yield</p>
          </div>
        </div>

        {/* Metric 5 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Hairiness (H)</span>
            <Layers size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.hairiness}</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">Compaction Index</p>
          </div>
        </div>

        {/* Metric 6 */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider">Elongation</span>
            <TrendingUp size={18} className="text-primary" />
          </div>
          <div>
            <div className="text-2xl font-black font-mono tracking-tight text-on-surface">{data.elongation}%</div>
            <p className="text-[10px] text-on-surface-variant font-medium mt-1">Elastic Limit Standard</p>
          </div>
        </div>
      </div>

      {/* Row 1: Yarn Strength Analysis (Composed Layout: Text + Image) */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding">
        <h3 className="text-lg font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">science</span>
          Yarn Strength Analysis & Tensile Correlation
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          <div className="space-y-4">
            <h4 className="text-sm font-headline font-bold text-on-surface">
              Fiber-to-Yarn Tensile Correlation
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Tensile strength is measured as breaking force normalized by linear density (cN/tex), also referred to as the <strong className="text-on-surface">RKM index</strong>. For fine combed cotton counts, yarn strength depends directly on raw fiber length, uniformity index, and micronaire. Spun with raw staple fibers measuring 30mm–31.5mm, our yarn achieves superior inter-fiber cohesion and spinning efficiency.
            </p>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Yarn strength testing is performed in our laboratory under standard atmosphere (65% RH, 20°C) using the <strong className="text-on-surface">Uster Tensorapid</strong> testing unit, pulling 100 strands per batch to obtain statistical distribution data. Regular calibrations ensure compliance with international ASTM D2256 standards.
            </p>
            <div className="bg-primary-container/20 border border-primary/20 p-4 rounded-xl space-y-1">
              <h5 className="text-xs font-mono font-bold text-primary">Actionable Fiber Blending Insight</h5>
              <p className="text-[11px] leading-relaxed text-on-surface-variant">
                Maintaining the Shankar-6 ELS cotton blending ratio above 75% for combed count spins stabilizes tensile averages at {data.strength} cN/tex, successfully lowering pneumatic ring-frame end-breaks by 14% and improving weaving efficiency at the air-jet looms.
              </p>
            </div>
          </div>
          <div className="border border-outline-variant rounded-xl overflow-hidden bg-surface flex items-center justify-center p-2">
            <img src={`${import.meta.env.BASE_URL}yarn_quality_testing.png`} className="max-h-[300px] w-auto rounded-lg object-contain" alt="Yarn quality spool testing in textile laboratory" />
          </div>
        </div>
      </div>

      {/* Row 2: Yarn Count Graph (Process Control SPC Chart) */}
      <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding">
        <h3 className="text-lg font-headline font-bold text-primary mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-2xl">show_chart</span>
          Yarn Count Graph & Statistical Process Control (SPC)
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-center">
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-4">
              Nominal Count Deviation over 15 Test Runs (Target: {target} Ne)
            </h4>
            <div className="h-[300px] font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={data.countRun.map((item, index) => {
                    const d = new Date();
                    d.setDate(d.getDate() - (15 - index));
                    const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                    return { ...item, dateLabel: dateStr };
                  })} 
                  margin={{ top: 10, right: 30, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="dateLabel" label={{ value: 'Test Date', position: 'insideBottom', offset: -5 }} fontSize={9} />
                  <YAxis domain={['auto', 'auto']} fontSize={9} />
                  {/* Tooltip removed */}
                  <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '11px' }} />
                  
                  {/* Process Control Reference Lines */}
                  <ReferenceLine y={target} stroke={colors.primary} strokeWidth={2} label={{ value: `Target: ${target} Ne`, position: 'right', fill: colors.primary, fontSize: 10, fontWeight: 700 }} />
                  <ReferenceLine y={ucl} stroke={colors.tertiary} strokeDasharray="5 5" label={{ value: `UCL: ${ucl.toFixed(2)}`, position: 'insideTopRight', fill: colors.tertiary, fontSize: 9 }} />
                  <ReferenceLine y={lcl} stroke={colors.tertiary} strokeDasharray="5 5" label={{ value: `LCL: ${lcl.toFixed(2)}`, position: 'insideBottomRight', fill: colors.tertiary, fontSize: 9 }} />
                  
                  <Line type="monotone" dataKey="val" stroke={colors.primary} strokeWidth={3} activeDot={{ r: 6 }} name="Measured Count Ne" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-headline font-bold text-on-surface">SPC Process Performance</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Operating inside narrow statistical control limits (±2.0%) indicates high stability of the drafting zones. Count coefficient of variation (CV%) is maintained at a premier level of <strong className="text-on-surface">{data.cvPercent}</strong>.
            </p>
            <div className="bg-surface border border-outline-variant p-4 rounded-xl space-y-2">
              <span className="text-[10px] font-mono font-bold text-on-surface-variant uppercase tracking-wider block">Drafting Control Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary inline-block"></span>
                <strong className="text-xs text-primary uppercase">In-Control (Stable)</strong>
              </div>
              <p className="text-[11px] leading-relaxed text-on-surface-variant mt-1">
                Automatic draft gear corrections via computerized auto-levellers at the carding and drawframe stages prevent raw sliver weight fluctuation from feeding into ring frames.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Imperfections Summary & Production Output Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
        {/* Left Column: Imperfections Summary */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding">
          <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">report_problem</span>
            Imperfections Summary (IPI)
          </h3>
          <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-4">
            Defect Counts per km vs Uster 5% World Benchmarks
          </h4>
          <div className="h-[280px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.ipiBreakdown} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={9} />
                <YAxis fontSize={9} />
                {/* Tooltip removed */}
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="actual" fill={colors.primary} name="Actual Mill Quality" barSize={20} radius={[2, 2, 0, 0]} />
                <Bar dataKey="benchmark" fill={colors.primaryContainer} name="Uster 5% Benchmark" barSize={20} radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Production Output */}
        <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding">
          <h3 className="text-base font-headline font-bold text-primary mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">bar_chart</span>
            Production Output Chart
          </h3>
          <h4 className="text-xs font-mono font-bold text-on-surface-variant mb-4">
            Daily Spinning Production Volume (Metric Tons / Day)
          </h4>
          <div className="h-[280px] font-mono">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.productionOutput} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={9} />
                <YAxis fontSize={9} />
                {/* Tooltip removed */}
                <Legend wrapperStyle={{ fontSize: '11px' }} />
                <Bar dataKey="volume" fill={colors.primary} name="Daily Spinning Yield (Tons)" barSize={20} radius={[2, 2, 0, 0]}>
                  {data.productionOutput.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? colors.primary : colors.primaryContainer} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
