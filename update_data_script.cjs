const fs = require('fs');

const path = './src/data.js';
let content = fs.readFileSync(path, 'utf8');

// Update globalCotton balanceSheet
const oldGlobal = `    balanceSheet: {
      historical: [
        { year: '2021-22', supply: 201.2, demand: 118.5, production: 116.4, imports: 43.1, exports: 43.2, endingStocks: 82.7 },
        { year: '2022-23', supply: 198.5, demand: 111.2, production: 116.7, imports: 37.6, exports: 37.0, endingStocks: 87.3 },
        { year: '2023-24', supply: 191.5, demand: 115.3, production: 113.5, imports: 41.5, exports: 43.0, endingStocks: 76.2 },
        { year: '2024-25', supply: 199.9, demand: 119.4, production: 119.7, imports: 42.7, exports: 44.1, endingStocks: 74.1 },
        { year: '2025-26 (Est)', supply: 193.3, demand: 119.1, production: 122.6, imports: 44.2, exports: 44.5, endingStocks: 77.0 }
      ]
    },`;

const newGlobal = `    balanceSheet: {
      historical: [
        { year: '2021-22', supply: 201.2, demand: 118.5, production: 116.4, imports: 43.1, exports: 43.2, endingStocks: 82.7 },
        { year: '2022-23', supply: 198.5, demand: 111.2, production: 116.7, imports: 37.6, exports: 37.0, endingStocks: 87.3 },
        { year: '2023-24', supply: 191.5, demand: 115.3, production: 113.5, imports: 41.5, exports: 43.0, endingStocks: 76.2 },
        { year: '2024-25', supply: 199.9, demand: 119.4, production: 119.7, imports: 42.7, exports: 44.1, endingStocks: 74.1 },
        { year: '2025-26 (Est)', supply: 193.3, demand: 119.1, production: 122.6, imports: 44.2, exports: 44.5, endingStocks: 77.0 }
      ]
    },`; // Wait, checking implementation plan: The Global table for 2024-25 in the implementation plan IS 119.7, 119.4, 74.1. And 2025-26 IS 122.6, 119.1, 77.0. It seems the dummy data in data.js already got updated by me in an earlier turn?! 
    // Let me check what's in data.js for Indian Cotton.

