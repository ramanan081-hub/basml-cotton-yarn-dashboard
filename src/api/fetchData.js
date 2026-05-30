// src/api/fetchData.js
// Market data fetching strategy for GitHub Pages (static hosting)
//
// PRIMARY:  /basml-cotton-yarn-dashboard/market-prices.json
//           → Updated daily by GitHub Actions (server-side, no CORS)
//           → Served from same origin — 100% reliable, zero CORS issues
//
// FALLBACK: Live APIs (exchange rates work fine; ICE Cotton via proxies may fail)

const BASE_PATH = import.meta.env.BASE_URL || '/basml-cotton-yarn-dashboard/';
const PRICES_JSON_URL = `${BASE_PATH}market-prices.json`.replace('//', '/');

// Cache
let dataCache = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

// ─────────────────────────────────────────────────────────────────────────────
// Step 1: Read today's prices from the GitHub-Actions-maintained JSON file
// This is served from the same origin → zero CORS issues, always works
// ─────────────────────────────────────────────────────────────────────────────
async function fetchFromPriceFile() {
  try {
    const res = await fetch(PRICES_JSON_URL + '?t=' + Date.now(), {
      cache: 'no-cache',
      signal: AbortSignal.timeout(5000)
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (
      json &&
      typeof json.iceCottonCentsPerLb === 'number' &&
      typeof json.usdInr === 'number' &&
      json.iceCottonCentsPerLb > 50 &&
      json.usdInr > 50
    ) {
      console.info(
        `[BASML] Prices loaded from file — ICE: ${json.iceCottonCentsPerLb}¢/lb, ` +
        `USD/INR: ₹${json.usdInr}, Source: ${json.source || 'file'}, ` +
        `Updated: ${json.lastUpdated || 'unknown'}`
      );
      return json;
    }
    return null;
  } catch {
    return null;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Step 2a: Fetch exchange rates live (CORS-friendly public APIs)
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchLiveExchangeRatesFromYahoo() {
  const USD_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/INR=X';
  const EUR_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/EURINR=X';

  const proxies = [
    'https://api.allorigins.win/raw?url=',
    'https://thingproxy.freeboard.io/fetch/',
    'https://corsproxy.io/?url=',
  ];

  let usdInr = null;
  let eurInr = null;

  async function fetchValue(baseUrl) {
    for (const proxy of proxies) {
      try {
        const url = proxy + encodeURIComponent(baseUrl);
        const res = await fetch(url, { signal: AbortSignal.timeout(6000) });
        if (!res.ok) continue;
        const json = await res.json();
        const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice;
        if (price && price > 10 && price < 300) {
          return parseFloat(price.toFixed(2));
        }
      } catch (e) {
        // try next proxy
      }
    }
    return null;
  }

  usdInr = await fetchValue(USD_URL);
  eurInr = await fetchValue(EUR_URL);

  if (usdInr && eurInr) {
    return { usdInr, eurInr, success: true };
  }
  return { usdInr: null, eurInr: null, success: false };
}

export async function fetchLiveExchangeRates() {
  // 1. Primary: Try Yahoo Finance via proxies (aligns with Google Finance)
  const yahooRates = await fetchLiveExchangeRatesFromYahoo();
  if (yahooRates.success) {
    return yahooRates;
  }

  // 2. Fallback: Try public exchange rate APIs
  let usdInr = 84.35;
  let eurInr = 90.70;
  let success = false;

  const endpoints = [
    'https://open.er-api.com/v6/latest/USD',
    'https://api.frankfurter.app/latest?from=USD&to=INR,EUR',
    'https://api.exchangerate-api.com/v4/latest/USD',
  ];

  for (const url of endpoints) {
    try {
      const cacheBustUrl = url + (url.includes('?') ? '&' : '?') + 't=' + Date.now();
      const res = await fetch(cacheBustUrl, { cache: 'no-cache', signal: AbortSignal.timeout(6000) });
      if (!res.ok) continue;
      const json = await res.json();
      if (json.rates && json.rates.INR) {
        usdInr = parseFloat(json.rates.INR.toFixed(2));
        if (json.rates.EUR) {
          eurInr = parseFloat((json.rates.INR / json.rates.EUR).toFixed(2));
        }
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
// Step 2b: Try to fetch ICE Cotton live (may fail due to Yahoo CORS blocks)
// Only used as upgrade if the price file is stale (>24h old)
// ─────────────────────────────────────────────────────────────────────────────
const YAHOO_CT_URL = 'https://query1.finance.yahoo.com/v8/finance/chart/CT=F';

async function parseYahooChart(res) {
  const json = await res.json();
  const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice;
  return price && price > 50 && price < 200 ? parseFloat(price.toFixed(2)) : null;
}

export async function fetchLiveICECotton() {
  let iceCottonPrice = 77.42;
  let success = false;

  const proxies = [
    `https://corsproxy.io/?url=${encodeURIComponent(YAHOO_CT_URL)}`,
    `https://thingproxy.freeboard.io/fetch/${YAHOO_CT_URL}`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(YAHOO_CT_URL)}`,
  ];

  for (const url of proxies) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
      if (!res.ok) continue;
      const price = await parseYahooChart(res);
      if (price) {
        iceCottonPrice = price;
        success = true;
        break;
      }
    } catch {
      // try next
    }
  }
  return { price: iceCottonPrice, success };
}

// ─────────────────────────────────────────────────────────────────────────────
// Main entry: fetchAllCottonData()
// Priority:
//   1. Price file (updated by GitHub Actions daily) — most reliable
//   2. Live exchange rate API (CORS-friendly, works always)
//   3. Live ICE Cotton proxies (may fail, used as price upgrade only)
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchAllCottonData() {
  if (dataCache && Date.now() - lastFetchTime < CACHE_EXPIRY) {
    return dataCache;
  }

  // Try the price file first
  const priceFile = await fetchFromPriceFile();

  let iceCottonPrice = 77.42;
  let usdInr = 84.35;
  let eurInr = 90.70;
  let fileSuccess = false;
  let rateSuccess = false;
  let iceSuccess = false;

  if (priceFile) {
    iceCottonPrice = priceFile.iceCottonCentsPerLb;
    usdInr = priceFile.usdInr;
    eurInr = priceFile.eurInr;
    fileSuccess = true;

    // Check if file is fresh (<25 hours old)
    const fileAge = priceFile.lastUpdated
      ? Date.now() - new Date(priceFile.lastUpdated).getTime()
      : Infinity;
    const isFresh = fileAge < 25 * 60 * 60 * 1000;

    // If the price file is fresh, only try to upgrade to live Yahoo exchange rates.
    // If live Yahoo fetch fails, we preserve the fresh Yahoo rates in the price file.
    // We only call the fallback APIs (open.er-api) as a last resort if the price file is stale.
    if (isFresh) {
      const liveYahoo = await fetchLiveExchangeRatesFromYahoo();
      if (liveYahoo.success) {
        usdInr = liveYahoo.usdInr;
        eurInr = liveYahoo.eurInr;
        rateSuccess = true;
      } else {
        rateSuccess = true; // Preserve fresh rates from the price file
      }
    } else {
      const liveRates = await fetchLiveExchangeRates();
      if (liveRates.success) {
        usdInr = liveRates.usdInr;
        eurInr = liveRates.eurInr;
        rateSuccess = true;
      }
    }

    // Only try live ICE proxy if file is stale (save network requests)
    if (!isFresh) {
      const liveIce = await fetchLiveICECotton();
      if (liveIce.success) {
        iceCottonPrice = liveIce.price;
        iceSuccess = true;
      }
    } else {
      iceSuccess = true; // treat file price as valid
    }
  } else {
    // File not available — use full live fetch
    const [rates, ice] = await Promise.all([
      fetchLiveExchangeRates(),
      fetchLiveICECotton(),
    ]);
    usdInr = rates.usdInr;
    eurInr = rates.eurInr;
    iceCottonPrice = ice.price;
    rateSuccess = rates.success;
    iceSuccess = ice.success;
  }

  let status = 'fallback';
  if (fileSuccess && rateSuccess) status = 'live';
  else if (fileSuccess || rateSuccess) status = 'partial';

  const result = {
    exchangeRates: { usdInr, eurInr, success: rateSuccess || fileSuccess },
    iceCotton: { price: iceCottonPrice, success: iceSuccess || fileSuccess },
    fetchTime: new Date(),
    status,
    priceSource: priceFile?.source || (iceSuccess ? 'live-proxy' : 'baseline'),
    priceFileAge: priceFile?.lastUpdated || null,
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
