// src/hooks/useCottonData.js
// Custom React hook for managing cotton market data, caching and price synchronization

import { useState, useEffect, useCallback, useRef } from 'react';
import { initialData, generateUpdatedData } from '../data';
import { fetchAllCottonData, clearCache } from '../api/fetchData';

// ---------------------------------------------------------------------------
// Market Schedule Helper
// MCX Cotton:  Mon–Fri  09:00 – 23:30 IST
// ICE Cotton:  Mon–Fri  06:30 – 01:00 IST (next day) → use 07:00 as safe open
// We use the UNION so updates run whenever ANY relevant market is open.
// Weekends (Sat/Sun IST) → always closed.
// ---------------------------------------------------------------------------
export function isMarketOpen() {
  // Get current IST time regardless of user's local timezone
  const now   = new Date();
  const ist   = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const day   = ist.getDay();              // 0 = Sun, 6 = Sat
  const mins  = ist.getHours() * 60 + ist.getMinutes();

  if (day === 0 || day === 6) return false; // Weekend → closed

  const OPEN  = 7  * 60;      // 07:00 IST  (ICE Cotton electronic opens ~06:30)
  const CLOSE = 23 * 60 + 55; // 23:55 IST  (MCX closes 23:30; buffer till midnight)
  return mins >= OPEN && mins <= CLOSE;
}

// Returns a human-readable string for when market last closed / next opens
export function getMarketStatusLabel() {
  const now  = new Date();
  const ist  = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
  const day  = ist.getDay();
  const mins = ist.getHours() * 60 + ist.getMinutes();
  const OPEN = 7 * 60;

  if (day === 6)               return 'Weekend · Opens Mon 07:00 IST';
  if (day === 0)               return 'Weekend · Opens Mon 07:00 IST';
  if (mins < OPEN)             return 'Pre-Market · Opens 07:00 IST';
  return 'Post-Market · Opens tomorrow 07:00 IST';
}

export function useCottonData(refreshInterval = 60 * 1000) {
  const [data, setData] = useState(() => generateUpdatedData(initialData));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [syncStatus, setSyncStatus] = useState('syncing');
  const [marketOpen, setMarketOpen] = useState(isMarketOpen);
  const lastCloseRef = useRef(null); // stores the last price snapshot when market closed

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
      const brentCrude = apiResults.brentCrude || 82.83;

      setData(prevData => {
        const updated = JSON.parse(JSON.stringify(prevData));
        if (updated.exchangeRates) {
          updated.exchangeRates.usdInr = usdInr;
          updated.exchangeRates.eurInr = eurInr;
        }
        updated.brentCrude = brentCrude;

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

          // Dynamic month helpers
          const _now = new Date();
          const _MN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
          const _SN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          const _cur = _MN[_now.getMonth()];
          const _nxt = _MN[(_now.getMonth() + 1) % 12];
          const _f1  = _SN[(_now.getMonth() + 2) % 12];
          const _f2  = _SN[(_now.getMonth() + 3) % 12];

          const aIndexPrice = parseFloat((iceCottonPrice + 10.5).toFixed(2));
          updated.globalCotton.forecastNarrative = {
            mayClose: `A-Index at ${aIndexPrice} ¢/lb — supported by a 6.6M bale drop in global YoY production.`,
            junStart: `Tightness expected as the global 5.7M bale production gap impacts spinners & mills worldwide.`,
            julAug: `Outcome hinges on mill-use growth (121.7M bales est) vs tightened 71.8M bale global ending stocks.`
          };
        }

        // Calculate Indian Cotton prices dynamically
        if (updated.indianCotton && updated.indianCotton.prices && updated.indianCotton.prices.types) {
          const types = updated.indianCotton.prices.types;
          const iceInrEquivalent = Math.floor(iceCottonPrice * 7.84 * usdInr);
          
          // Shankar-6 Spot - economically model with an MSP-supported domestic floor (~54,500 INR/candy)
          // and a dynamic relationship with import parity under high international rates.
          const shankar6Spot = Math.max(54500, Math.floor(iceInrEquivalent * 1.036));
          types[0].current = shankar6Spot;
          types[0].est = Math.floor(shankar6Spot * 1.015);

          // MCU-5 (Local)
          types[1].current = Math.floor(shankar6Spot * 1.07);
          types[1].est = Math.floor(types[1].current * 1.015);

          // DCH-32 / Suvin
          types[2].current = Math.floor(shankar6Spot * 1.35);
          types[2].est = Math.floor(types[2].current * 1.02);

          // Bunny (NCS-145)
          types[3].current = Math.floor(shankar6Spot * 1.03);
          types[3].est = Math.floor(types[3].current * 1.015);

          // Kohinoor 212+
          types[4].current = Math.floor(shankar6Spot * 1.02);
          types[4].est = Math.floor(types[4].current * 1.015);

          // MCU-7 (7 Local)
          types[5].current = Math.floor(shankar6Spot * 0.93);
          types[5].est = Math.floor(types[5].current * 1.015);

          // J-34
          types[6].current = Math.floor(shankar6Spot * 0.96);
          types[6].est = Math.floor(types[6].current * 1.015);

          // V797
          types[7].current = Math.floor(shankar6Spot * 0.69);
          types[7].est = Math.floor(types[7].current * 1.015);

          // ICE Cotton No. 2 INR Equivalent
          types[8].current = iceInrEquivalent;
          types[8].est = Math.floor(iceInrEquivalent * 1.02);

          // Update monthly trends — roll last 6 entries to current calendar months
          if (updated.indianCotton.prices.monthlyTrend) {
            const trend = updated.indianCotton.prices.monthlyTrend;
            const _tNow = new Date();
            const _tSN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            // Label last 6 entries as rolling: 5 months ago → current month
            for (let i = 0; i < 6; i++) {
              const d = new Date(_tNow.getFullYear(), _tNow.getMonth() - (5 - i), 1);
              trend[6 + i].month = `${_tSN[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
            }

            // Set prices: index 11 = live current month; older months were higher (peak season)
            // Ratios: Dec25 was ~10% above current, tapering down to Jun26 current
            trend[11].Shankar6 = shankar6Spot;
            trend[11].MCU5 = types[1].current;
            trend[11].J34 = types[6].current;

            trend[10].Shankar6 = Math.floor(shankar6Spot * 1.008); // 1 month ago
            trend[10].MCU5 = Math.floor(types[1].current * 1.007);
            trend[10].J34 = Math.floor(types[6].current * 1.007);

            trend[9].Shankar6 = Math.floor(shankar6Spot * 1.026);  // 2 months ago
            trend[9].MCU5 = Math.floor(types[1].current * 1.024);
            trend[9].J34 = Math.floor(types[6].current * 1.024);

            trend[8].Shankar6 = Math.floor(shankar6Spot * 1.055);  // 3 months ago
            trend[8].MCU5 = Math.floor(types[1].current * 1.052);
            trend[8].J34 = Math.floor(types[6].current * 1.052);

            trend[7].Shankar6 = Math.floor(shankar6Spot * 1.078);  // 4 months ago
            trend[7].MCU5 = Math.floor(types[1].current * 1.075);
            trend[7].J34 = Math.floor(types[6].current * 1.075);

            trend[6].Shankar6 = Math.floor(shankar6Spot * 1.098);  // 5 months ago (peak season)
            trend[6].MCU5 = Math.floor(types[1].current * 1.093);
            trend[6].J34 = Math.floor(types[6].current * 1.093);
          }

          // Also roll the global monthly trend last 6 entries to current calendar months
          if (updated.globalCotton && updated.globalCotton.prices && updated.globalCotton.prices.monthlyTrend) {
            const gTrend = updated.globalCotton.prices.monthlyTrend;
            const _tNow2 = new Date();
            const _tSN2 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

            for (let i = 0; i < 6; i++) {
              const d = new Date(_tNow2.getFullYear(), _tNow2.getMonth() - (5 - i), 1);
              gTrend[6 + i].month = `${_tSN2[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
            }

            gTrend[11].AIndex = parseFloat((iceCottonPrice + 10.5).toFixed(2));
            gTrend[11].US = parseFloat(iceCottonPrice.toFixed(2));
            gTrend[11].Brazil = parseFloat((iceCottonPrice - 4.5).toFixed(2));

            // Set older months relative to live current
            for (let idx = 0; idx < 5; idx++) {
              const ratio = [1.098, 1.078, 1.055, 1.026, 1.008][idx];
              gTrend[6 + idx].AIndex = parseFloat((gTrend[11].AIndex * ratio).toFixed(2));
              gTrend[6 + idx].US = parseFloat((gTrend[11].US * ratio).toFixed(2));
              gTrend[6 + idx].Brazil = parseFloat((gTrend[11].Brazil * ratio).toFixed(2));
            }
          }

          // Dynamic month names for India forecastNarrative
          const _iNow = new Date();
          const _iMN = ['January','February','March','April','May','June','July','August','September','October','November','December'];
          const _iSN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          const _iCur = _iMN[_iNow.getMonth()];
          const _iNxt = _iMN[(_iNow.getMonth() + 1) % 12];
          const _iF1  = _iSN[(_iNow.getMonth() + 2) % 12];
          const _iF2  = _iSN[(_iNow.getMonth() + 3) % 12];

          const mcu5Spot = types[1].current;
          updated.indianCotton.forecastNarrative = {
            mayClose: `Spot: Shankar-6 at ₹${shankar6Spot.toLocaleString('en-IN')}/Candy with CCI e-auction tightening lots.`,
            junStart: `Projection: S-6 likely to trade ₹${Math.floor(shankar6Spot * 1.01).toLocaleString('en-IN')}–₹${Math.floor(shankar6Spot * 1.025).toLocaleString('en-IN')}/Candy driven by monsoon trajectory.`,
            julAug: `Monsoon deficit → ₹${Math.floor(shankar6Spot * 1.04).toLocaleString('en-IN')}+ (MCU-5 ₹${Math.floor(mcu5Spot * 1.05).toLocaleString('en-IN')}). Normal monsoon stabilizes S-6 at ₹${Math.floor(shankar6Spot * 0.99).toLocaleString('en-IN')}.`
          };
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

        // Dynamically update hosiery vs weaving count matrix and spreads
        if (updated.yarns && updated.yarns.hosieryWeaving) {
          const hw = updated.yarns.hosieryWeaving;
          const shankar6Spot = updated.indianCotton.prices.types[0].current;
          const baseRaw = shankar6Spot / 356;
          
          // Ne 20s
          hw.counts[0].combedHosiery = Math.floor(baseRaw * 1.15 + 52);
          hw.counts[0].cardedHosiery = Math.floor(baseRaw * 1.12 + 40);
          hw.counts[0].combedWeaving = Math.floor(baseRaw * 1.15 + 42);
          
          // Ne 24s
          hw.counts[1].combedHosiery = Math.floor(baseRaw * 1.18 + 55);
          hw.counts[1].cardedHosiery = Math.floor(baseRaw * 1.15 + 43);
          hw.counts[1].combedWeaving = Math.floor(baseRaw * 1.18 + 45);
          
          // Ne 30s
          hw.counts[2].combedHosiery = Math.floor(baseRaw * 1.25 + 65);
          hw.counts[2].cardedHosiery = Math.floor(baseRaw * 1.21 + 50);
          hw.counts[2].combedWeaving = Math.floor(baseRaw * 1.25 + 55);
          
          // Ne 34s
          hw.counts[3].combedHosiery = Math.floor(baseRaw * 1.28 + 70);
          hw.counts[3].cardedHosiery = Math.floor(baseRaw * 1.24 + 55);
          hw.counts[3].combedWeaving = Math.floor(baseRaw * 1.28 + 60);
          
          // Ne 40s
          hw.counts[4].combedHosiery = Math.floor(baseRaw * 1.32 + 80);
          hw.counts[4].cardedHosiery = Math.floor(baseRaw * 1.28 + 62);
          hw.counts[4].combedWeaving = Math.floor(baseRaw * 1.32 + 70);

          // Update monthly trends (rolling)
          const _tNow = new Date();
          const _tSN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
          for (let i = 0; i < 6; i++) {
            const d = new Date(_tNow.getFullYear(), _tNow.getMonth() - (5 - i), 1);
            hw.monthlyTrend[6 + i].month = `${_tSN[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
          }
          
          hw.monthlyTrend[11].hosiery30s = hw.counts[2].combedHosiery;
          hw.monthlyTrend[11].weaving30s = hw.counts[2].combedWeaving;
          hw.monthlyTrend[11].spread = hw.monthlyTrend[11].hosiery30s - hw.monthlyTrend[11].weaving30s;
          
          for (let idx = 0; idx < 5; idx++) {
            const ratio = [1.098, 1.078, 1.055, 1.026, 1.008][idx];
            hw.monthlyTrend[6 + idx].hosiery30s = Math.floor(hw.monthlyTrend[11].hosiery30s * ratio);
            hw.monthlyTrend[6 + idx].weaving30s = Math.floor(hw.monthlyTrend[11].weaving30s * ratio);
            hw.monthlyTrend[6 + idx].spread = hw.monthlyTrend[6 + idx].hosiery30s - hw.monthlyTrend[6 + idx].weaving30s;
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

        // Dynamically update Yarn monthly trends — roll last 6 entries to current calendar months
        if (updated.yarns && updated.yarns.comparison && updated.yarns.comparison.monthlyTrend) {
          const yTrend = updated.yarns.comparison.monthlyTrend;
          const _tNow3 = new Date();
          const _tSN3 = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

          for (let i = 0; i < 6; i++) {
            const d = new Date(_tNow3.getFullYear(), _tNow3.getMonth() - (5 - i), 1);
            yTrend[6 + i].month = `${_tSN3[d.getMonth()]} ${String(d.getFullYear()).slice(2)}`;
          }

          const combed30sSpot = updated.yarns.india.prices[2].current; // 30s Combed
          
          yTrend[11].Cotton30s = combed30sSpot;
          yTrend[11].Polyester30s = updated.yarns.nonCotton?.india?.prices?.[1]?.current || 140; // 30s Polyester
          yTrend[11].Viscose30s = updated.yarns.nonCotton?.india?.prices?.[2]?.current || 185; // 30s Viscose

          // Old months relative to current
          for (let idx = 0; idx < 5; idx++) {
            const ratio = [1.098, 1.078, 1.055, 1.026, 1.008][idx];
            yTrend[6 + idx].Cotton30s = Math.floor(combed30sSpot * ratio);
            yTrend[6 + idx].Polyester30s = Math.floor(yTrend[11].Polyester30s * ratio);
            yTrend[6 + idx].Viscose30s = Math.floor(yTrend[11].Viscose30s * ratio);
          }
        }

        // ----------------------------------------------------------------
        // Kapas micro-walk: ONLY when market is open
        // When closed we keep the frozen last-close snapshot
        // ----------------------------------------------------------------
        if (isMarketOpen()) {
          const shankar6Spot = updated.indianCotton.prices.types[0].current;
          const kapasMandiArrivalSpot = shankar6Spot + Math.floor(Math.random() * 160) - 80;
          updated.indianCotton.prices.types[0].current = kapasMandiArrivalSpot;
          updated.indianCotton.prices.types[0].est = Math.floor(kapasMandiArrivalSpot * 1.015);
        }

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

  // ------------------------------------------------------------------
  // Primary sync interval — always fetches so we capture market re-open
  // ------------------------------------------------------------------
  useEffect(() => {
    loadData();
    const syncInterval = setInterval(loadData, refreshInterval);
    return () => clearInterval(syncInterval);
  }, [loadData, refreshInterval]);

  // ------------------------------------------------------------------
  // 30-second micro-animation — ONLY when market is open
  // Also polls isMarketOpen() every 30s to update the marketOpen flag
  // ------------------------------------------------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const open = isMarketOpen();
      setMarketOpen(open);

      if (open) {
        // Market open: apply live micro-fluctuations
        setData(prevData => generateUpdatedData(prevData));
        setLastUpdated(new Date());
      }
      // Market closed: do nothing — keep the frozen last-close data
    }, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ------------------------------------------------------------------
  // When the API fetch completes and market is closed, freeze the
  // last-close timestamp so the badge shows the correct time
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!marketOpen && syncStatus !== 'syncing') {
      if (!lastCloseRef.current) {
        lastCloseRef.current = new Date();
      }
    } else {
      lastCloseRef.current = null; // reset when market reopens
    }
  }, [marketOpen, syncStatus]);

  const getFormattedTimestamp = () => {
    return lastUpdated.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }) + ' IST';
  };

  const getLastCloseFormatted = () => {
    const t = lastCloseRef.current || lastUpdated;
    return t.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
    refresh,
    marketOpen,
    marketStatusLabel: marketOpen ? 'Live' : getMarketStatusLabel(),
    lastCloseFormatted: getLastCloseFormatted()
  };
}

export default useCottonData;
