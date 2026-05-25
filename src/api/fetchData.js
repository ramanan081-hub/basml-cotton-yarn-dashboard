// src/api/fetchData.js
// Real-time data fetching from official sources using CORS proxies

// Cache storage
let dataCache = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 5 * 60 * 1000; // 5 minutes

export async function fetchLiveExchangeRates() {
  let usdInr = 85.50;
  let eurInr = 90.62;
  let success = false;
  try {
    let response = await fetch('/api-exchangerate/v4/latest/USD');
    if (!response.ok) {
      response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    }
    if (response.ok) {
      const exchangeData = await response.json();
      if (exchangeData && exchangeData.rates) {
        if (exchangeData.rates.INR) {
          usdInr = parseFloat(exchangeData.rates.INR.toFixed(2));
          success = true;
        }
        if (exchangeData.rates.EUR) {
          eurInr = parseFloat((exchangeData.rates.INR / exchangeData.rates.EUR).toFixed(2));
        }
      }
    }
  } catch (err) {
    console.warn('Failed to load live exchange rates:', err);
  }
  return { usdInr, eurInr, success };
}

export async function fetchLiveICECotton() {
  let iceCottonPrice = 83.00;
  let success = false;
  try {
    let response = await fetch('/api-yahoo/v8/finance/chart/CT=F');
    if (!response.ok) {
      response = await fetch('https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/CT=F');
    }
    if (!response.ok) {
      response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://query1.finance.yahoo.com/v8/finance/chart/CT=F'));
    }
    if (!response.ok) {
      response = await fetch('https://query1.finance.yahoo.com/v8/finance/chart/CT=F');
    }
    if (response.ok) {
      const chartData = await response.json();
      if (chartData && chartData.chart && chartData.chart.result && chartData.chart.result[0]) {
        const meta = chartData.chart.result[0].meta;
        if (meta && meta.regularMarketPrice) {
          iceCottonPrice = parseFloat(meta.regularMarketPrice.toFixed(2));
          success = true;
        }
      }
    }
  } catch (err) {
    console.warn('Failed to load live ICE cotton price:', err);
  }
  return { price: iceCottonPrice, success };
}

export async function fetchAllCottonData() {
  // Check cache first
  if (dataCache && Date.now() - lastFetchTime < CACHE_EXPIRY) {
    return dataCache;
  }

  const [rates, ice] = await Promise.all([
    fetchLiveExchangeRates(),
    fetchLiveICECotton()
  ]);

  const result = {
    exchangeRates: rates,
    iceCotton: ice,
    fetchTime: new Date(),
    status: (rates.success && ice.success) ? 'live' : (rates.success || ice.success) ? 'partial' : 'fallback'
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
  clearCache
};
