// src/components/DataTimestamp.jsx
// Displays when data was last updated and freshness status

import React from 'react';

export function DataTimestamp({ 
  timestamp, 
  freshness, 
  dataQuality, 
  loading = false,
  error = null 
}) {
  if (loading) {
    return (
      <div className="text-center py-2 px-4 bg-primary/10 border border-primary/20 rounded-lg backdrop-blur-sm">
        <span className="text-sm text-primary font-mono animate-pulse">
          ⏳ Loading latest market data...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-2 px-4 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
        <span className="text-sm text-red-500 font-mono">
          ⚠️ Data error: {error}
        </span>
      </div>
    );
  }

  if (!timestamp) {
    return (
      <div className="text-center py-2 px-4 bg-surface-container border border-outline-variant rounded-lg">
        <span className="text-sm text-on-surface-variant font-mono">
          No data loaded yet
        </span>
      </div>
    );
  }

  // Determine color based on data quality
  const getQualityColor = () => {
    switch (dataQuality) {
      case 'good':
      case 'fresh':
        return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400';
      case 'fair':
        return 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-455';
      case 'poor':
      case 'stale':
      case 'veryStale':
        return 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400';
      default:
        return 'bg-surface-container border-outline-variant text-on-surface-variant';
    }
  };

  // Freshness icon
  const getFreshnessIcon = () => {
    switch (freshness?.status) {
      case 'fresh':
        return '✓';
      case 'fair':
        return '⚠️';
      case 'stale':
      case 'veryStale':
        return '❌';
      default:
        return '?';
    }
  };

  return (
    <div className={`text-center py-2 px-4 border rounded-lg backdrop-blur-sm transition-colors ${getQualityColor()}`}>
      <div className="flex items-center justify-center gap-2 flex-wrap font-mono">
        <span className="text-xs md:text-sm font-semibold">
          {getFreshnessIcon()} Last Updated:
        </span>
        <span className="text-xs md:text-sm font-bold tracking-wider">
          {timestamp}
        </span>
        {freshness && (
          <span className="text-[10px] px-2 py-0.5 bg-surface-container-high dark:bg-surface-container-highest border border-outline-variant/30 rounded text-on-surface">
            {freshness.message}
          </span>
        )}
      </div>
      
      {dataQuality === 'poor' && (
        <div className="text-[10px] mt-1 text-red-500 font-semibold">
          ⚠️ Data is stale. Refresh for latest prices.
        </div>
      )}
    </div>
  );
}

/**
 * Minimal timestamp indicator (for cards)
 */
export function TimestampIndicator({ timestamp, freshness }) {
  if (!timestamp) return null;

  const getStatusColor = () => {
    switch (freshness?.status) {
      case 'fresh':
        return 'text-emerald-500';
      case 'fair':
        return 'text-amber-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className={`text-xs ${getStatusColor()} font-medium font-mono`}>
      Updated: {freshness?.message || 'Unknown'}
    </div>
  );
}

export default DataTimestamp;
