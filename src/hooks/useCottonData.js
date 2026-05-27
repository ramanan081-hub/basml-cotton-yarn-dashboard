// src/hooks/useCottonData.js
// Custom React hook for managing cotton market data, caching and price synchronization

import { useState, useEffect, useCallback } from 'react';
import { initialData, generateUpdatedData } from '../data';
import { fetchAllCottonData, clearCache } from '../api/fetchData';

export function useCottonData(refreshInterval = 60 * 1000) {
  const [data, setData] = useState(() => generateUpdatedData(initialData));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('syncing');

  const getFreshness = () => {
    const ageMinutes = (Date.now() - lastUpdated.getTime()) / (1000 * 60);
    if (ageMinutes < 5) return { status: 'fresh', message: 'Just now' };
    if (ageMinutes < 15) return { status: 'fresh', message: `${Math.floor(ageMinutes)} min ago` };
    if (ageMinutes < 60) return { status: 'fair', message: `${Math.floor(ageMinutes)} min ago` };
    return { status: 'stale', message: `${Math.floor(ageMinutes / 60)} hours ago` };
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const apiResults = await fetchAllCottonData();
      const usdInr = apiResults.exchangeRates.usdInr;
      const eurInr = apiResults.exchangeRates.eurInr;
      const iceCottonPrice = apiResults.iceCotton.price;

      setData(prevData => {
        const updated = JSON.parse(JSON.stringify(prevData));
        if (updated.exchangeRates) {
          updated.exchangeRates.usdInr = usdInr;
          updated.exchangeRates.eurInr = eurInr;
        }

        // Dynamically update global cotton prices
        if (updated.globalCotton && updated.globalCotton.prices && updated.globalCotton.prices.types) {
          const types = updated.globalCotton.prices.types;
          types[0].current = parseFloat((iceCottonPrice + 10.5).toFixed(2)); // Cotlook A-Index
          types[0].est = parseFloat((types[0].current * 1.015).toFixed(2));
          
          types[1].current = iceCottonPrice; // ICE US Cotton No. 2
          types[1].est = parseFloat((iceCottonPrice * 1.02).toFixed(2));

          types[2].current = iceCottonPrice; // US Upland (7-Mkt Avg)
          types[2].est = parseFloat((iceCottonPrice * 1.018).toFixed(2));

          types[3].current = parseFloat((iceCottonPrice - 4.5).toFixed(2)); // Brazil ESALQ / Cerrado
          types[3].est = parseFloat((types[3].current * 1.02).toFixed(2));

          types[4].current = parseFloat((iceCottonPrice * 2.1).toFixed(2)); // Supima / Pima (ELS)
          types[4].est = parseFloat((types[4].current * 1.03).toFixed(2));

          types[5].current = parseFloat((iceCottonPrice * 2.7).toFixed(2)); // Egyptian Giza (ELS)
          types[5].est = parseFloat((types[5].current * 1.02).toFixed(2));

          types[6].current = parseFloat((iceCottonPrice * 1.2).toFixed(2)); // Australian Premium
          types[6].est = parseFloat((types[6].current * 1.025).toFixed(2));

          types[7].current = parseFloat((iceCottonPrice * 1.4).toFixed(2)); // China Index (Xinjiang)
          types[7].est = parseFloat((types[7].current * 1.02).toFixed(2));

          types[8].current = parseFloat((iceCottonPrice * 0.9).toFixed(2)); // Pakistani Cotton (KCA)
          types[8].est = parseFloat((types[8].current * 1.025).toFixed(2));

          types[9].current = parseFloat((iceCottonPrice * 1.6).toFixed(2)); // Organic Cotton (Certified)
          types[9].est = parseFloat((types[9].current * 1.02).toFixed(2));

          if (types[10]) {
            types[10].current = parseFloat((iceCottonPrice * 1.05).toFixed(2)); // West African (Mali/Benin)
            types[10].est = parseFloat((types[10].current * 1.02).toFixed(2));
          }
        }

        // Calculate Indian Cotton prices dynamically
        if (updated.indianCotton && updated.indianCotton.prices && updated.indianCotton.prices.types) {
          const types = updated.indianCotton.prices.types;
          const iceInrEquivalent = Math.floor(iceCottonPrice * 7.84 * usdInr);
          
          // Shankar-6 Spot - economically model with an MSP-supported domestic floor (~54,500 INR/candy)
          // and a dynamic relationship with import parity under high international rates.
          const shankar6Spot = Math.max(54500, Math.floor(iceInrEquivalent * 0.965));
          types[0].current = shankar6Spot;
          types[0].est = Math.floor(shankar6Spot * 1.015);

          // MCU-5
          types[1].current = Math.floor(shankar6Spot * 1.07);
          types[1].est = Math.floor(types[1].current * 1.015);

          // DCH-32 / Suvin
          types[2].current = Math.floor(shankar6Spot * 1.35);
          types[2].est = Math.floor(types[2].current * 1.02);

          // MECH-1 (Bunny/Brahma)
          types[3].current = Math.floor(shankar6Spot * 1.03);
          types[3].est = Math.floor(types[3].current * 1.015);

          // J-34
          types[4].current = Math.floor(shankar6Spot * 0.96);
          types[4].est = Math.floor(types[4].current * 1.015);

          // V797
          types[5].current = Math.floor(shankar6Spot * 0.69);
          types[5].est = Math.floor(types[5].current * 1.015);

          // ICE Cotton No. 2 INR Equivalent
          types[6].current = iceInrEquivalent;
          types[6].est = Math.floor(iceInrEquivalent * 1.02);

          // Update monthly trends to end at May 2026 spot
          if (updated.indianCotton.prices.monthlyTrend) {
            const trend = updated.indianCotton.prices.monthlyTrend;
            trend[11].Shankar6 = shankar6Spot;
            trend[11].MCU5 = types[1].current;
            trend[11].J34 = types[4].current;

            trend[10].Shankar6 = Math.floor(shankar6Spot * 0.99);
            trend[10].MCU5 = Math.floor(types[1].current * 0.99);
            trend[10].J34 = Math.floor(types[4].current * 0.99);

            trend[9].Shankar6 = Math.floor(shankar6Spot * 0.98);
            trend[9].MCU5 = Math.floor(types[1].current * 0.98);
            trend[9].J34 = Math.floor(types[4].current * 0.98);

            trend[8].Shankar6 = Math.floor(shankar6Spot * 0.97);
            trend[8].MCU5 = Math.floor(types[1].current * 0.97);
            trend[8].J34 = Math.floor(types[4].current * 0.97);

            trend[7].Shankar6 = Math.floor(shankar6Spot * 0.96);
            trend[7].MCU5 = Math.floor(types[1].current * 0.96);
            trend[7].J34 = Math.floor(types[4].current * 0.96);

            trend[6].Shankar6 = Math.floor(shankar6Spot * 0.95);
            trend[6].MCU5 = Math.floor(types[1].current * 0.95);
            trend[6].J34 = Math.floor(types[4].current * 0.95);
          }
        }

        // Dynamically update Indian yarn prices
        // Modeled using: Yarn Price = (Cotton Price / Yield) + Conversion Cost
        if (updated.yarns && updated.yarns.india && updated.yarns.india.prices) {
          const prices = updated.yarns.india.prices;
          const shankar6Spot = updated.indianCotton.prices.types[0].current;
          const iceInrEquivalent = updated.indianCotton.prices.types[6].current;

          prices[0].current = Math.floor((shankar6Spot / 356) * 1.0 + 40); // 10s-16s Carded
          prices[0].est = Math.floor(prices[0].current * 1.035);

          prices[1].current = Math.floor((shankar6Spot / 356) * 1.1 + 45); // 20s Carded
          prices[1].est = Math.floor(prices[1].current * 1.03);

          prices[2].current = Math.floor((shankar6Spot / 356) * 1.25 + 65); // 30s Combed
          prices[2].est = Math.floor(prices[2].current * 1.035);

          prices[3].current = Math.floor((shankar6Spot / 356) * 1.30 + 95); // 40s Compact
          prices[3].est = Math.floor(prices[3].current * 1.045);

          prices[4].current = Math.floor((shankar6Spot / 356) * 1.6 + 160); // 60s Combed
          prices[4].est = Math.floor(prices[4].current * 1.035);

          prices[5].current = Math.floor((shankar6Spot / 356) * 2.0 + 265); // 80s Compact
          prices[5].est = Math.floor(prices[5].current * 1.035);

          prices[6].current = Math.floor((shankar6Spot / 356) * 2.3 + 360); // 100s Compact ELS
          prices[6].est = Math.floor(prices[6].current * 1.035);

          prices[7].current = Math.floor(prices[2].current * 1.23); // Organic Cotton 30s
          prices[7].est = Math.floor(prices[7].current * 1.04);

          prices[8].current = Math.floor(prices[1].current * 0.85); // Recycled Cotton 20s
          prices[8].est = Math.floor(prices[8].current * 1.02);

          prices[9].current = Math.floor((iceInrEquivalent / 356) * 2.2); // ICE-Linked US Yarn
          prices[9].est = Math.floor(prices[9].current * 1.03);

          if (prices[10]) {
            prices[10].current = Math.floor(prices[2].current * 0.73); // 30s PC Blend
            prices[10].est = Math.floor(prices[10].current * 1.02);
          }
          if (prices[11]) {
            prices[11].current = Math.floor(prices[2].current * 0.67); // 40s PV Blend
            prices[11].est = Math.floor(prices[11].current * 1.03);
          }
        }

        // Dynamically update Global yarn prices
        if (updated.yarns && updated.yarns.global && updated.yarns.global.prices) {
          const prices = updated.yarns.global.prices;
          
          prices[0].current = parseFloat((iceCottonPrice * 0.022).toFixed(2)); // 10s Open-End / Rotor
          prices[0].est = parseFloat((prices[0].current * 1.02).toFixed(2));

          prices[1].current = parseFloat((iceCottonPrice * 0.034).toFixed(2)); // 20s Carded Ring Spun
          prices[1].est = parseFloat((prices[1].current * 1.03).toFixed(2));

          prices[2].current = parseFloat((iceCottonPrice * 0.042).toFixed(2)); // 30s Combed Ring Spun
          prices[2].est = parseFloat((prices[2].current * 1.04).toFixed(2));

          prices[3].current = parseFloat((iceCottonPrice * 0.046).toFixed(2)); // 40s Compact Cotton
          prices[3].est = parseFloat((prices[3].current * 1.05).toFixed(2));

          prices[4].current = parseFloat((iceCottonPrice * 0.060).toFixed(2)); // 60s Combed Ring Spun
          prices[4].est = parseFloat((prices[4].current * 1.045).toFixed(2));

          prices[5].current = parseFloat((iceCottonPrice * 0.080).toFixed(2)); // 80s Compact ELS
          prices[5].est = parseFloat((prices[5].current * 1.04).toFixed(2));

          prices[6].current = parseFloat((prices[2].current * 1.25).toFixed(2)); // 30s Organic Cotton Yarn
          prices[6].est = parseFloat((prices[6].current * 1.045).toFixed(2));

          prices[7].current = parseFloat((prices[1].current * 0.74).toFixed(2)); // 20s Recycled Cotton Yarn
          prices[7].est = parseFloat((prices[7].current * 1.02).toFixed(2));

          prices[8].current = parseFloat((iceCottonPrice * 0.049).toFixed(2)); // 30s Combed (ICE Cotton Base)
          prices[8].est = parseFloat((prices[8].current * 1.03).toFixed(2));

          if (prices[9]) {
            prices[9].current = parseFloat((prices[2].current * 0.69).toFixed(2)); // 30s PC Blend
            prices[9].est = parseFloat((prices[9].current * 1.02).toFixed(2));
          }
          if (prices[10]) {
            prices[10].current = parseFloat((prices[2].current * 0.62).toFixed(2)); // 40s PV Blend
            prices[10].est = parseFloat((prices[10].current * 1.02).toFixed(2));
          }
        }

        // Apply simulated Kapas arrivals daily walk
        const shankar6Spot = updated.indianCotton.prices.types[0].current;
        const kapasMandiArrivalSpot = shankar6Spot + Math.floor(Math.random() * 200) - 100;
        updated.indianCotton.prices.types[0].current = kapasMandiArrivalSpot;
        updated.indianCotton.prices.types[0].est = kapasMandiArrivalSpot + 900;

        return updated;
      });

      setSyncStatus(apiResults.status);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message || 'Failed to fetch cotton data');
      setSyncStatus('fallback');
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    clearCache();
    await loadData();
  }, [loadData]);

  useEffect(() => {
    loadData();
    const syncInterval = setInterval(loadData, refreshInterval);
    return () => clearInterval(syncInterval);
  }, [loadData, refreshInterval]);

  // Handle local fluctuations every 30s for line graphs and live animations
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => generateUpdatedData(prevData));
      setLastUpdated(new Date());
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getFormattedTimestamp = () => {
    return lastUpdated.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' IST';
  };

  return {
    data,
    loading,
    error,
    lastUpdated,
    formattedTimestamp: getFormattedTimestamp(),
    syncStatus,
    freshness: getFreshness(),
    refresh
  };
}

export default useCottonData;
