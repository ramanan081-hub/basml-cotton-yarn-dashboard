// src/api/fetchData.js
// Real-time data fetching from official CORS-enabled sources
// Designed to work on GitHub Pages (static hosting — no server-side proxy)

// Cache storage
let dataCache = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// ─────────────────────────────────────────────────────────────────────────────
// EXCHANGE RATES  (USD → INR / EUR)
// Uses open.er-api.com — fully free, CORS-enabled, no key needed
// Fallback: frankfurter.app — free ECB data, CORS-enabled
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchLiveExchangeRates() {
  let usdInr = 84.35;   // realistic May 2026 fallback
  let eurInr = 90.70;
  let success = false;

  const endpoints = [
    'https://open.er-api.com/v6/latest/USD',
    'https://api.frankfurter.app/latest?from=USD&to=INR,EUR',
    'https://api.exchangerate-api.com/v4/latest/USD',
  ];

  for (const url of endpoints) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const json = await res.json();

      // open.er-api.com / exchangerate-api.com shape: { rates: { INR, EUR } }
      if (json.rates && json.rates.INR) {
        usdInr = parseFloat(json.rates.INR.toFixed(2));
        if (json.rates.EUR) {
          eurInr = parseFloat((json.rates.INR / json.rates.EUR).toFixed(2));
        }
        success = true;
        break;
      }
      // frankfurter.app shape: { rates: { INR, EUR } }
      if (json.rates && json.rates.INR) {
        usdInr = parseFloat(json.rates.INR.toFixed(2));
        eurInr = json.rates.EUR
          ? parseFloat((json.rates.INR / json.rates.EUR).toFixed(2))
          : eurInr;
        success = true;
        break;
      }
    } catch {
      // try next endpoint
    }
  }

  return { usdInr, eurInr, success };
}

// ─────────────────────────────────────────────────────────────────────────────
// ICE COTTON NO. 2 FUTURES  (CT=F)
// Yahoo Finance blocks direct browser requests.
// We try multiple reliable CORS proxies in order.
// If all fail we use a calibrated fallback (~77 ¢/lb).
// ─────────────────────────────────────────────────────────────────────────────
const YAHOO_CT_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/CT=F';

function buildProxyUrls(target) {
  return [
    // corsproxy.io — most reliable public proxy
    `https://corsproxy.io/?url=${encodeURIComponent(target)}`,
    // thingproxy.freeboard.io
    `https://thingproxy.freeboard.io/fetch/${target}`,
    // allorigins — slower but usually works
    `https://api.allorigins.win/raw?url=${encodeURIComponent(target)}`,
  ];
}

async function parseYahooChart(res) {
  const json = await res.json();
  const result = json?.chart?.result?.[0];
  if (result?.meta?.regularMarketPrice) {
    return parseFloat(result.meta.regularMarketPrice.toFixed(2));
  }
  return null;
}

export async function fetchLiveICECotton() {
  let iceCottonPrice = 77.42;   // realistic May 2026 fallback (¢/lb)
  let success = false;

  for (const url of buildProxyUrls(YAHOO_CT_URL)) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const price = await parseYahooChart(res);
      if (price && price > 50 && price < 200) {   // sanity check
        iceCottonPrice = price;
        success = true;
        break;
      }
    } catch {
      // try next proxy
    }
  }

  // If proxies fail, try direct (works only in non-CORS-restricted environments)
  if (!success) {
    try {
      const res = await fetch(YAHOO_CT_URL, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        const price = await parseYahooChart(res);
        if (price && price > 50 && price < 200) {
          iceCottonPrice = price;
          success = true;
        }
      }
    } catch {
      // fall through to fallback value
    }
  }

  if (!success) {
    console.info('ICE Cotton live feed unavailable — using calibrated fallback value');
  }

  return { price: iceCottonPrice, success };
}

// ─────────────────────────────────────────────────────────────────────────────
// COMBINED FETCH WITH CACHE
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAllCottonData() {
  if (dataCache && Date.now() - lastFetchTime < CACHE_EXPIRY) {
    return dataCache;
  }

  const [rates, ice] = await Promise.all([
    fetchLiveExchangeRates(),
    fetchLiveICECotton(),
  ]);

  const result = {
    exchangeRates: rates,
    iceCotton: ice,
    fetchTime: new Date(),
    status:
      rates.success && ice.success
        ? 'live'
        : rates.success || ice.success
        ? 'partial'
        : 'fallback',
  };

  dataCache = result;
  lastFetchTime = Date.now();
  return result;
}

export function clearCache() {
  dataCache = null;
  lastFetchTime = 0;
}

export default {
  fetchLiveExchangeRates,
  fetchLiveICECotton,
  fetchAllCottonData,
  clearCache,
};
