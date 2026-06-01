const fs = require('fs');
const path = require('path');
const http = require('https');

// Helper to fetch JSON from a URL
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    };
    http.get(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json);
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Scrape Yahoo Finance price
async function getYahooPrice(symbol) {
  try {
    const json = await fetchJson(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}`);
    const price = json?.chart?.result?.[0]?.meta?.regularMarketPrice;
    if (price && price > 10 && price < 300) {
      return parseFloat(price.toFixed(2));
    }
  } catch (e) {
    console.error(`[Scraper] Error fetching Yahoo Finance for ${symbol}:`, e.message);
  }
  return null;
}

// Scrape Stooq Cotton price
async function getStooqCottonPrice() {
  try {
    const json = await fetchJson('https://stooq.com/q/l/?s=ct.f&f=sd2t2ohlcvp&h&e=json');
    const price = json?.symbols?.[0]?.close;
    if (price && price > 50 && price < 200) {
      return parseFloat(parseFloat(price).toFixed(2));
    }
  } catch (e) {
    console.error('[Scraper] Error fetching Stooq for ct.f:', e.message);
  }
  return null;
}

// Fetch fallback exchange rates from open.er-api.com
async function getFallbackExchangeRates() {
  try {
    const json = await fetchJson('https://open.er-api.com/v6/latest/USD');
    if (json?.rates && json.rates.INR) {
      const usdInr = parseFloat(json.rates.INR.toFixed(2));
      let eurInr = 90.70;
      if (json.rates.EUR) {
        eurInr = parseFloat((json.rates.INR / json.rates.EUR).toFixed(2));
      }
      return { usdInr, eurInr, success: true };
    }
  } catch (e) {
    console.error('[Scraper] Error fetching fallback ER API:', e.message);
  }
  return null;
}

async function run() {
  console.log('[Scraper] Starting market prices update...');
  
  // 1. Fetch Exchange Rates
  let usdInr = await getYahooPrice('INR=X');
  let eurInr = await getYahooPrice('EURINR=X');
  let erSource = 'yahoo-finance-live';
  
  if (!usdInr || !eurInr) {
    console.log('[Scraper] Yahoo Finance rates failed, trying fallback er-api...');
    const fallbackRates = await getFallbackExchangeRates();
    if (fallbackRates && fallbackRates.success) {
      usdInr = usdInr || fallbackRates.usdInr;
      eurInr = eurInr || fallbackRates.eurInr;
      erSource = 'er-api-fallback';
    }
  }
  
  // Apply final baseline fallbacks if both failed
  usdInr = usdInr || 84.35;
  eurInr = eurInr || 90.70;
  console.log(`[Scraper] Exchange rates resolved: USD/INR=${usdInr}, EUR/INR=${eurInr} (Source: ${erSource})`);

  // 2. Fetch ICE Cotton price
  const now = new Date();
  const yearStr = now.getUTCFullYear().toString();
  const yy = yearStr.slice(-2); // e.g., '26'
  const decSymbol = `CTZ${yy}.NYB`;
  const currentMonth = now.getUTCMonth() + 1; // 1-12
  
  let iceCottonPrice = null;
  let iceSource = 'none';

  // If June through December, Google Finance rolls over to the December contract.
  // We mirror this behavior by checking the December contract first.
  if (currentMonth >= 6) {
    console.log(`[Scraper] Month is ${currentMonth} (June-Dec window). Checking Dec contract ${decSymbol} first...`);
    iceCottonPrice = await getYahooPrice(decSymbol);
    if (iceCottonPrice) {
      iceSource = `yahoo-${decSymbol}`;
    }
  }

  // If Dec contract not preferred/failed, try continuous contract CT=F
  if (!iceCottonPrice) {
    console.log('[Scraper] Fetching continuous contract CT=F...');
    iceCottonPrice = await getYahooPrice('CT=F');
    if (iceCottonPrice) {
      iceSource = 'yahoo-CT=F';
    }
  }

  // Try Dec contract as fallback if CT=F failed
  if (!iceCottonPrice) {
    console.log(`[Scraper] Trying Dec contract ${decSymbol} as fallback...`);
    iceCottonPrice = await getYahooPrice(decSymbol);
    if (iceCottonPrice) {
      iceSource = `yahoo-${decSymbol}`;
    }
  }

  // Try Stooq as final API fallback
  if (!iceCottonPrice) {
    console.log('[Scraper] Yahoo Cotton failed, trying Stooq...');
    iceCottonPrice = await getStooqCottonPrice();
    if (iceCottonPrice) {
      iceSource = 'stooq-live';
    }
  }

  // Final fallback to baseline
  if (!iceCottonPrice) {
    iceCottonPrice = 77.42;
    iceSource = 'baseline-fallback';
  }
  console.log(`[Scraper] ICE Cotton price resolved: ${iceCottonPrice} ¢/lb (Source: ${iceSource})`);

  // 3. Write output JSON
  const data = {
    iceCottonCentsPerLb: iceCottonPrice,
    usdInr: usdInr,
    eurInr: eurInr,
    lastUpdated: now.toISOString(),
    source: iceSource,
    erSource: erSource,
    note: 'Auto-updated 3x daily (6:30 AM, 12:30 PM, 4:30 PM IST) by GitHub Actions.'
  };

  const outputPath = path.join(__dirname, '..', 'public', 'market-prices.json');
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[Scraper] Successfully wrote market-prices.json to ${outputPath}`);
}

run().catch((err) => {
  console.error('[Scraper] Fatal error:', err);
  process.exit(1);
});
