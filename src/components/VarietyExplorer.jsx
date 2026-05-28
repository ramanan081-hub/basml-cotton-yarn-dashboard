import React, { useState, useMemo } from 'react';
import { expandedCottonVarieties, expandedYarnVarieties } from '../expandedData';

export default function VarietyExplorer({ darkMode, colors }) {
  const [dbTab, setDbTab] = useState('cotton'); // 'cotton', 'yarn'

  // Cotton States
  const [cottonSearch, setCottonSearch] = useState('');
  const [cottonGroup, setCottonGroup] = useState('All');
  const [cottonStaple, setCottonStaple] = useState('All');
  const [cottonQuality, setCottonQuality] = useState('All');
  const [compareList, setCompareList] = useState([]); // Array of cotton objects (max 3)
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Yarn States
  const [yarnSearch, setYarnSearch] = useState('');
  const [yarnCategory, setYarnCategory] = useState('All');
  const [selectedYarn, setSelectedYarn] = useState(null); // Yarn object for details modal

  // Filtering Cotton
  const filteredCotton = useMemo(() => {
    return expandedCottonVarieties.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(cottonSearch.toLowerCase()) ||
        item.origin.toLowerCase().includes(cottonSearch.toLowerCase()) ||
        (item.applications && item.applications.some(app => app.toLowerCase().includes(cottonSearch.toLowerCase())));
      
      const matchesGroup = cottonGroup === 'All' || item.group === cottonGroup;
      
      const matchesQuality = cottonQuality === 'All' || item.quality === cottonQuality;
      
      let matchesStaple = true;
      if (cottonStaple !== 'All') {
        const stapleLower = (item.staple || '').toLowerCase();
        if (cottonStaple === 'Short') {
          matchesStaple = stapleLower.includes('short') || stapleLower.includes('19-') || stapleLower.includes('20-') || stapleLower.includes('21');
        } else if (cottonStaple === 'Medium') {
          matchesStaple = stapleLower.includes('medium') || stapleLower.includes('22-') || stapleLower.includes('23-') || stapleLower.includes('24');
        } else if (cottonStaple === 'Long') {
          matchesStaple = stapleLower.includes('long') || stapleLower.includes('25-') || stapleLower.includes('26-') || stapleLower.includes('27') || stapleLower.includes('28');
        } else if (cottonStaple === 'ELS') {
          matchesStaple = stapleLower.includes('els') || stapleLower.includes('extra long') || stapleLower.includes('32-') || stapleLower.includes('33') || stapleLower.includes('35');
        }
      }

      return matchesSearch && matchesGroup && matchesQuality && matchesStaple;
    });
  }, [cottonSearch, cottonGroup, cottonStaple, cottonQuality]);

  // Filtering Yarn
  const filteredYarn = useMemo(() => {
    return expandedYarnVarieties.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(yarnSearch.toLowerCase()) ||
        (item.composition && item.composition.toLowerCase().includes(yarnSearch.toLowerCase())) ||
        (item.applications && item.applications.some(app => app.toLowerCase().includes(yarnSearch.toLowerCase())));

      const matchesCat = yarnCategory === 'All' || item.category.toLowerCase().includes(yarnCategory.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [yarnSearch, yarnCategory]);

  // Toggle cotton in comparison list
  const handleToggleCompare = (item) => {
    if (compareList.some(c => c.id === item.id)) {
      setCompareList(compareList.filter(c => c.id !== item.id));
    } else {
      if (compareList.length >= 3) {
        alert('You can compare a maximum of 3 varieties at a time.');
        return;
      }
      setCompareList([...compareList, item]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Sub Tabs Toggle */}
      <div className="flex border-b border-outline-variant/30 gap-6">
        <button
          onClick={() => setDbTab('cotton')}
          className={`pb-3 font-headline text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            dbTab === 'cotton'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">database</span>
          75+ Cotton Varieties Explorer
        </button>
        <button
          onClick={() => setDbTab('yarn')}
          className={`pb-3 font-headline text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
            dbTab === 'yarn'
              ? 'border-primary text-primary'
              : 'border-transparent text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-lg">texture</span>
          80+ Yarn Varieties Explorer
        </button>
      </div>

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* COTTON SECTION */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {dbTab === 'cotton' && (
        <div className="space-y-6">
          {/* Filters Panel */}
          <div className="glass-card rounded-xl p-5 border border-outline-variant/20 grid grid-cols-1 md:grid-cols-4 gap-4 bg-surface-container-low">
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Search Database</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Variety, origin, application..."
                  value={cottonSearch}
                  onChange={(e) => setCottonSearch(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-primary text-on-surface"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-lg text-outline">search</span>
              </div>
            </div>

            {/* Staple Length */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Staple Length</label>
              <select
                value={cottonStaple}
                onChange={(e) => setCottonStaple(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="All">All Staple Lengths</option>
                <option value="Short">Short (19-21mm)</option>
                <option value="Medium">Medium (22-24mm)</option>
                <option value="Long">Long (25-28mm)</option>
                <option value="ELS">Extra-Long (ELS, 28mm+)</option>
              </select>
            </div>

            {/* Category Group */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Cotton Group</label>
              <select
                value={cottonGroup}
                onChange={(e) => setCottonGroup(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="All">All Groups</option>
                <option value="Indian Cotton">Indian Cotton</option>
                <option value="International Cotton">International Cotton</option>
                <option value="Specialty & Sustainable">Specialty & Sustainable</option>
              </select>
            </div>

            {/* Quality Rating */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Quality Grade</label>
              <select
                value={cottonQuality}
                onChange={(e) => setCottonQuality(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="All">All Grades</option>
                <option value="Premium">Premium</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Special">Special / Sustainable</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCotton.map(item => {
              const isCompared = compareList.some(c => c.id === item.id);
              return (
                <div
                  key={item.id}
                  className="glass-card rounded-2xl p-5 border border-outline-variant/20 flex flex-col justify-between hover:translate-y-[-4px] transition-all duration-200 bg-surface-container-low hover:border-primary/40 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-outline-variant uppercase px-2 py-0.5 rounded-full border border-outline-variant/20 bg-surface-container-high mr-2">
                        {item.group}
                      </span>
                      {item.quality && (
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                          item.quality === 'Premium' ? 'bg-primary/20 text-primary border border-primary/20' : 'bg-outline-variant/10 text-on-surface border border-outline-variant/20'
                        }`}>
                          {item.quality}
                        </span>
                      )}
                      <h4 className="text-base font-bold text-on-surface mt-2 font-headline">{item.name}</h4>
                      <p className="text-xs text-on-surface-variant font-mono mt-0.5">Origin: {item.origin}</p>
                    </div>

                    {/* Compare Checkbox */}
                    <button
                      onClick={() => handleToggleCompare(item)}
                      className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${
                        isCompared 
                          ? 'bg-primary border-primary text-on-primary'
                          : 'border-outline-variant hover:border-primary/50 text-transparent'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs font-bold">check</span>
                    </button>
                  </div>

                  <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/15 font-mono text-[11px] text-on-surface-variant">
                    <div className="flex justify-between">
                      <span>Staple Length:</span>
                      <span className="font-bold text-on-surface">{item.staple}</span>
                    </div>
                    {item.specs.Micronaire && (
                      <div className="flex justify-between">
                        <span>Micronaire:</span>
                        <span className="font-bold text-on-surface">{item.specs.Micronaire}</span>
                      </div>
                    )}
                    {item.specs.Strength && (
                      <div className="flex justify-between">
                        <span>Strength:</span>
                        <span className="font-bold text-on-surface">{item.specs.Strength}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-xs mt-3 bg-surface-container-high/40 p-2 rounded-lg border border-outline-variant/10">
                      <span className="text-primary font-bold">Price range:</span>
                      <span className="font-bold text-primary">{item.price}</span>
                    </div>
                  </div>

                  {item.applications && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {item.applications.map((app, idx) => (
                        <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-surface-container-high/60 border border-outline-variant/10 text-on-surface-variant">
                          {app}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Persistent Compare Bar */}
          {compareList.length > 0 && (
            <div className="fixed bottom-6 left-[20px] right-[20px] md:left-[260px] md:right-[20px] z-40 bg-surface-container-high/90 border border-outline-variant/30 backdrop-blur-md rounded-2xl p-4 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-4 animate-slide-up">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">compare_arrows</span>
                <div>
                  <h5 className="text-sm font-bold text-on-surface font-headline">Variety Comparison Suite</h5>
                  <p className="text-xs text-on-surface-variant">Selected: {compareList.map(c => c.name).join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setCompareList([])}
                  className="px-4 py-2 border border-outline-variant rounded-xl text-xs font-bold hover:bg-surface-container-low transition-all text-on-surface"
                >
                  Clear Selection
                </button>
                <button
                  onClick={() => setShowCompareModal(true)}
                  className="px-5 py-2 bg-primary text-on-primary rounded-xl text-xs font-bold hover:bg-primary/95 transition-all shadow-md"
                >
                  Compare Spec Sheets ({compareList.length})
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* YARN SECTION */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {dbTab === 'yarn' && (
        <div className="space-y-6">
          {/* Filters Panel */}
          <div className="glass-card rounded-xl p-5 border border-outline-variant/20 grid grid-cols-1 md:grid-cols-2 gap-4 bg-surface-container-low">
            {/* Search */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Search Database</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Yarn name, composition, application..."
                  value={yarnSearch}
                  onChange={(e) => setYarnSearch(e.target.value)}
                  className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:border-primary text-on-surface"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-lg text-outline">search</span>
              </div>
            </div>

            {/* Yarn Category */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-mono font-bold uppercase tracking-wider text-outline">Yarn Category</label>
              <select
                value={yarnCategory}
                onChange={(e) => setYarnCategory(e.target.value)}
                className="w-full bg-surface-container-high border border-outline-variant/30 rounded-lg p-2 text-sm text-on-surface focus:outline-none focus:border-primary"
              >
                <option value="All">All Categories</option>
                <option value="PURE COTTON">Pure Cotton Yarns</option>
                <option value="BLENDED">Blended Yarns</option>
                <option value="TECHNICAL">Specialty Technical Yarns</option>
                <option value="FANCY">Fancy & Novelty Yarns</option>
                <option value="CONSTRUCTION">Specialty Construction Yarns</option>
                <option value="SUSTAINABLE">Sustainable & Eco Yarns</option>
              </select>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredYarn.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedYarn(item)}
                className="glass-card rounded-2xl p-5 border border-outline-variant/20 flex flex-col justify-between hover:translate-y-[-4px] cursor-pointer transition-all duration-200 bg-surface-container-low hover:border-primary/40 group relative overflow-hidden"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[9px] font-mono font-bold text-outline-variant uppercase px-2 py-0.5 rounded-full border border-outline-variant/20 bg-surface-container-high">
                      {item.category}
                    </span>
                    <span className="material-symbols-outlined text-outline group-hover:text-primary transition-all text-lg">info</span>
                  </div>
                  <h4 className="text-base font-bold text-on-surface font-headline leading-snug">{item.name}</h4>
                  <p className="text-xs text-on-surface-variant font-mono mt-1">Composition: {item.composition || '100% Cotton'}</p>
                </div>

                <div className="space-y-2 mt-4 pt-4 border-t border-outline-variant/15 font-mono text-[11px] text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Yarn Count:</span>
                    <span className="font-bold text-on-surface">{item.count || 'N/A'}</span>
                  </div>
                  {item.specs['Twist'] && (
                    <div className="flex justify-between">
                      <span>Twist:</span>
                      <span className="font-bold text-on-surface">{item.specs['Twist']}</span>
                    </div>
                  )}
                  {item.specs['Tensile Strength'] && (
                    <div className="flex justify-between">
                      <span>Strength:</span>
                      <span className="font-bold text-on-surface">{item.specs['Tensile Strength']}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs mt-3 bg-surface-container-high/40 p-2 rounded-lg border border-outline-variant/10">
                    <span className="text-primary font-bold">Estimated Price:</span>
                    <span className="font-bold text-primary">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* COMPARISON MODAL */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {showCompareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl w-full max-w-4xl max-h-[85vh] overflow-y-auto border border-outline-variant/40 p-6 flex flex-col bg-surface-container-high">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-6">
              <h3 className="font-headline text-lg font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">compare_arrows</span>
                Variety Comparison Matrix
              </h3>
              <button
                onClick={() => setShowCompareModal(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="overflow-x-auto border border-outline-variant rounded-xl">
              <table className="w-full text-sm font-mono text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface">
                    <th className="p-4 border-b border-outline-variant">Feature</th>
                    {compareList.map(c => (
                      <th key={c.id} className="p-4 border-b border-r border-outline-variant text-center text-primary font-headline font-bold text-sm">
                        {c.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant">
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Market Group</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.group}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Category</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.category}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Price Range</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center font-bold text-primary">{c.price}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Staple Length</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.staple}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Micronaire</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.specs.Micronaire || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Fiber Strength</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.specs.Strength || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Major Production Area</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.origin}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Quality Level</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center font-bold">{c.quality || 'N/A'}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-4 font-bold bg-surface-container-low/40">Primary Applications</td>
                    {compareList.map(c => (
                      <td key={c.id} className="p-4 border-r border-outline-variant text-center leading-relaxed">
                        {c.applications ? c.applications.join(', ') : 'N/A'}
                      </td>
                    ))}
                  </tr>
                  {/* Dynamic specs comparison */}
                  {Array.from(new Set(compareList.flatMap(c => Object.keys(c.specs || {}))))
                    .filter(key => key !== 'Micronaire' && key !== 'Strength')
                    .map(key => (
                      <tr key={key}>
                        <td className="p-4 font-bold bg-surface-container-low/40">{key}</td>
                        {compareList.map(c => (
                          <td key={c.id} className="p-4 border-r border-outline-variant text-center">{c.specs[key] || 'N/A'}</td>
                        ))}
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {/* YARN DETAILS MODAL */}
      {/* ──────────────────────────────────────────────────────────────────────────── */}
      {selectedYarn && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card rounded-2xl w-full max-w-lg border border-outline-variant/40 p-6 flex flex-col bg-surface-container-high animate-scale-up">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant mb-5">
              <div>
                <span className="text-[9px] font-mono font-bold text-outline-variant uppercase px-2 py-0.5 rounded-full border border-outline-variant/20 bg-surface-container-low mr-2">
                  {selectedYarn.category}
                </span>
                <span className="text-[9px] font-mono font-bold text-outline-variant uppercase px-2 py-0.5 rounded-full border border-outline-variant/20 bg-surface-container-low">
                  {selectedYarn.subCategory}
                </span>
                <h3 className="font-headline text-lg font-bold text-primary mt-2">
                  {selectedYarn.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedYarn(null)}
                className="text-on-surface-variant hover:text-on-surface self-start"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 font-mono text-sm">
              <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-outline">Count:</span>
                <span className="font-bold text-on-surface">{selectedYarn.count || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/10">
                <span className="text-outline">Composition:</span>
                <span className="font-bold text-on-surface">{selectedYarn.composition || '100% Cotton'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-outline-variant/10 text-primary">
                <span className="font-bold">Estimated Price:</span>
                <span className="font-bold">{selectedYarn.price}</span>
              </div>

              {/* Dynamic specs */}
              {Object.entries(selectedYarn.specs || {}).map(([key, val]) => (
                <div key={key} className="flex justify-between py-1.5 border-b border-outline-variant/10">
                  <span className="text-outline">{key}:</span>
                  <span className="font-bold text-on-surface text-right max-w-[200px]">{val}</span>
                </div>
              ))}

              {selectedYarn.applications && (
                <div className="pt-2">
                  <span className="text-outline text-xs block mb-2">Recommended Applications:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedYarn.applications.map((app, idx) => (
                      <span key={idx} className="text-xs px-2.5 py-1 rounded bg-surface-container-low border border-outline-variant/20 text-on-surface">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
