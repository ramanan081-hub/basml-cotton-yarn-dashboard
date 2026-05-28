import React from 'react';
import { stateWiseMspData } from '../expandedData';

export default function StateMspTable({ darkMode, colors }) {
  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-outline-variant/30">
        <div>
          <h3 className="text-lg font-bold text-primary font-headline">State-wise Minimum Support Prices (MSP)</h3>
          <p className="text-xs text-on-surface-variant mt-1">Official Government floor pricing, fiber quality specializations, and Ginning Out-Turn (GOT%) thresholds.</p>
        </div>
      </div>

      {/* MSP Table Grid */}
      <div className="glass-card rounded-xl p-5 border border-outline-variant/20 bg-surface-container-low">
        <h4 className="text-sm font-bold text-on-surface font-headline mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">policy</span>
          MSP Pricing Sheet (2024-25 vs. 2025-26)
        </h4>
        <div className="overflow-x-auto border border-outline-variant rounded-lg">
          <table className="w-full text-left text-sm border-collapse font-mono">
            <thead>
              <tr className="bg-surface-container-low text-on-surface font-headline">
                <th className="p-4 border-b border-outline-variant">State</th>
                <th className="p-4 border-b border-outline-variant">Primary Variety</th>
                <th className="p-4 border-b border-outline-variant text-right">MSP 2024-25 (₹/Qtl)</th>
                <th className="p-4 border-b border-outline-variant text-right">MSP 2025-26 (₹/Qtl)</th>
                <th className="p-4 border-b border-outline-variant text-right">Increase (YoY)</th>
                <th className="p-4 border-b border-outline-variant text-center">Ginning Out-Turn (GOT)</th>
                <th className="p-4 border-b border-outline-variant text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-on-surface-variant">
              {stateWiseMspData.map((item, idx) => {
                const diff = item.msp2025 - item.msp2024;
                return (
                  <tr key={idx} className="hover:bg-surface-container-high/20 transition-all">
                    <td className="p-4 font-bold text-on-surface">{item.state}</td>
                    <td className="p-4">{item.variety}</td>
                    <td className="p-4 text-right">₹{item.msp2024.toLocaleString()}</td>
                    <td className="p-4 text-right font-bold text-primary">₹{item.msp2025.toLocaleString()}</td>
                    <td className="p-4 text-right text-green-500 font-bold">+₹{diff} (+{(diff/item.msp2024 * 100).toFixed(1)}%)</td>
                    <td className="p-4 text-center font-bold text-on-surface">{item.gotPercent}</td>
                    <td className="p-4 text-center">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-5 p-4 rounded-xl border border-outline-variant/15 bg-surface-container-high/40 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary text-xl">gavel</span>
          <p className="text-[11px] leading-relaxed text-on-surface-variant font-mono">
            <strong>Legal Note:</strong> Under the Cotton Corporation of India (CCI) procurement directives, the Minimum Support Price (MSP) acts as a mandatory pricing floor. If mandi price levels plunge below the MSP thresholds, the CCI commences direct purchases from farmers to support market prices.
          </p>
        </div>
      </div>
    </div>
  );
}
