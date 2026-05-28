import React, { useState } from 'react';
import { seasonalCalendarData } from '../expandedData';

export default function SeasonalCalendar({ darkMode, colors }) {
  const [selectedMonthKey, setSelectedMonthKey] = useState(() => {
    // Default to current calendar month
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return months[new Date().getMonth()];
  });

  const monthKeys = Object.keys(seasonalCalendarData);
  const activeMonth = seasonalCalendarData[selectedMonthKey];

  // Helper to color code agricultural phases
  const getPhaseClass = (phase) => {
    const p = phase.toLowerCase();
    if (p.includes('peak supply') || p.includes('harvest complete')) return 'border-l-4 border-green-500 bg-green-500/5 text-green-500';
    if (p.includes('sowing') || p.includes('plant')) return 'border-l-4 border-blue-500 bg-blue-500/5 text-blue-500';
    if (p.includes('growing')) return 'border-l-4 border-amber-500 bg-amber-500/5 text-amber-500';
    if (p.includes('pre-monsoon') || p.includes('supply reduces')) return 'border-l-4 border-orange-500 bg-orange-500/5 text-orange-500';
    return 'border-l-4 border-primary bg-primary/5 text-primary';
  };

  // Helper to get trending price direction icon
  const getTrendIcon = (trend) => {
    const t = trend.toLowerCase();
    if (t.includes('rising') || t.includes('high')) return 'trending_up';
    if (t.includes('declining') || t.includes('low')) return 'trending_down';
    if (t.includes('volatile')) return 'compare_arrows';
    return 'trending_flat';
  };

  const getTrendColor = (trend) => {
    const t = trend.toLowerCase();
    if (t.includes('rising') || t.includes('high')) return 'text-red-500';
    if (t.includes('declining') || t.includes('low')) return 'text-green-500';
    if (t.includes('volatile')) return 'text-amber-500';
    return 'text-outline';
  };

  return (
    <div className="space-y-6">
      {/* Tab Welcome Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <h3 className="text-lg font-bold text-primary font-headline">Annual Cotton Sowing & Pricing Calendar</h3>
          <p className="text-xs text-on-surface-variant mt-1">Cross-referencing agricultural supply cycles with market demand and price seasonality metrics.</p>
        </div>
      </div>

      {/* Grid: 12-Month Timeline Overview & Detailed Month Sheet */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: 12-Month Selector Grid */}
        <div className="lg:col-span-2 glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">calendar_month</span>
              12-Month Crop Cycle Overview
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {monthKeys.map(key => {
                const monthInfo = seasonalCalendarData[key];
                const isActive = selectedMonthKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedMonthKey(key)}
                    className={`p-3 rounded-xl border flex flex-col justify-between items-start transition-all text-left group ${
                      isActive
                        ? 'bg-primary/10 border-primary shadow-sm text-primary'
                        : 'border-outline-variant/30 hover:border-outline-variant/70 bg-surface-container-high/40 text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <span className="text-xs font-bold font-headline">{monthInfo.month}</span>
                    <span className="text-[9px] font-mono mt-1 text-outline truncate w-full group-hover:text-on-surface-variant">
                      {monthInfo.phase.split(' (')[0]}
                    </span>
                    <div className="flex items-center gap-1 mt-2 text-[9px] font-mono">
                      <span className={`material-symbols-outlined text-[11px] ${getTrendColor(monthInfo.priceExpectation)}`}>
                        {getTrendIcon(monthInfo.priceExpectation)}
                      </span>
                      <span className="text-[8px] text-outline uppercase">{monthInfo.priceExpectation.split(' ')[0]}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl border border-outline-variant/20 bg-surface-container-high/40 flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-xl">info</span>
            <p className="text-[11px] font-mono leading-relaxed text-on-surface-variant">
              <strong>Seasonal Pattern Correlation:</strong> Spot prices typically hit annual lows in Q1 (Jan-Mar) during peak post-harvest supply. Sowing begins during Q2 monsoons, causing speculation and volatility. Supply collapses in Q3 (July-Sept) before the new crop harvest begins, pushing prices to peak levels.
            </p>
          </div>
        </div>

        {/* Right Column: Month detail sheet */}
        <div className="glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low flex flex-col justify-between relative overflow-hidden">
          
          {/* Header block */}
          <div>
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/15 mb-4">
              <h4 className="text-lg font-bold text-primary font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">event_available</span>
                {activeMonth.month} Status Sheet
              </h4>
              <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${getPhaseClass(activeMonth.phase)}`}>
                {activeMonth.phase}
              </span>
            </div>

            {/* Spec grid */}
            <div className="space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-surface-container-high/40 border border-outline-variant/10">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-lg ${getTrendColor(activeMonth.priceExpectation)}`}>
                    {getTrendIcon(activeMonth.priceExpectation)}
                  </span>
                  <span>Price Outlook:</span>
                </div>
                <span className={`font-bold uppercase ${getTrendColor(activeMonth.priceExpectation)}`}>
                  {activeMonth.priceExpectation}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b border-outline-variant/10">
                <span className="text-outline">Demand Level:</span>
                <span className="font-bold text-on-surface uppercase">{activeMonth.demandLevel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-outline-variant/10">
                <span className="text-outline">Climate/Weather:</span>
                <span className="font-bold text-on-surface">{activeMonth.weather}</span>
              </div>
              {activeMonth.millingOperations && (
                <div className="flex justify-between py-1 border-b border-outline-variant/10">
                  <span className="text-outline">Milling Operations:</span>
                  <span className="font-bold text-on-surface">{activeMonth.millingOperations}</span>
                </div>
              )}

              {/* Crop activities list */}
              <div className="pt-2">
                <span className="text-outline block mb-2 font-bold">Key Farm/Market Activities:</span>
                <ul className="space-y-1.5 list-none pl-0">
                  {activeMonth.activities.map((act, i) => (
                    <li key={i} className="flex items-center gap-2 text-on-surface">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sourcing notes */}
          <div className="mt-6 bg-primary/5 border border-primary/20 rounded-xl p-3.5 flex flex-col gap-1.5">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-primary">Buyer Sourcing Advice</span>
            <p className="text-[11px] font-mono leading-relaxed text-on-surface-variant">
              {activeMonth.notes}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
