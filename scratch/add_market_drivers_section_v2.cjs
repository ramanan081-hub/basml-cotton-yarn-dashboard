const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/\r\n/g, '\n');

// Target the Section 2 comment exactly
const targetComment = `      {/* SECTION 2: PRODUCTION CHARTS */}`;

const replacement = `      {/* SECTION 1.5: YARN PROFITABILITY SPREAD & PRICE MOVEMENT DRIVERS */}
      <div className="glass-panel mb-6" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(240,248,255,0.65) 100%)', border: '1.5px solid rgba(0, 122, 255, 0.15)' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          📈 Yarn Profitability Spread & Price Movement Drivers
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Left Column: Interactive Spinners' Margin Calculator */}
          <div style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--ios-blue)', fontWeight: 'bold' }}>
              🧮 Live Spinners' Margin & Spread Calculator
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '15px' }}>
              Profitability depends on the "Yarn Margin Spread" (Yarn Price minus Clean Cotton Cost & Conversion Cost). Select count to view details:
            </p>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              {['30s Carded', '40s Combed', '60s Combed', '80s Combed'].map(count => (
                <button
                  key={count}
                  onClick={() => setSelectedCalcCount(count)}
                  style={{
                    flex: 1,
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    border: '1px solid ' + (selectedCalcCount === count ? 'var(--ios-blue)' : 'rgba(0,0,0,0.1)'),
                    background: selectedCalcCount === count ? 'var(--ios-blue)' : 'rgba(255,255,255,0.5)',
                    color: selectedCalcCount === count ? '#fff' : 'var(--text-primary)',
                    transition: 'all 0.2s'
                  }}
                >
                  {count}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '6px' }}>
                <span>Raw Cotton Cost (Shankar-6 Benchmark):</span>
                <span style={{ fontWeight: 'bold' }}>₹{spreadData[selectedCalcCount].rawCotton} / Candy</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '6px' }}>
                <span>Clean Cotton Cost (including {spreadData[selectedCalcCount].waste}% Trash/Waste):</span>
                <span style={{ fontWeight: 'bold' }}>₹{spreadData[selectedCalcCount].cleanCotton} / Kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '6px' }}>
                <span>Mill Conversion Cost (Power + Labor + Overheads):</span>
                <span style={{ fontWeight: 'bold' }}>₹{spreadData[selectedCalcCount].conversion} / Kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1px dashed rgba(0,0,0,0.1)', paddingBottom: '6px', color: 'var(--ios-blue)' }}>
                <span><strong>Total Manufacturing Cost:</strong></span>
                <span style={{ fontWeight: 'bold' }}>₹{spreadData[selectedCalcCount].totalCost} / Kg</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', borderBottom: '1.5px solid rgba(0,0,0,0.15)', paddingBottom: '6px', color: 'var(--text-primary)' }}>
                <span><strong>Market Selling Price of Yarn:</strong></span>
                <span style={{ fontWeight: 'bold' }}>₹{spreadData[selectedCalcCount].yarnPrice} / Kg</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.95rem',
                fontWeight: 'bold',
                padding: '8px 12px',
                borderRadius: '8px',
                background: spreadData[selectedCalcCount].spread > 10 ? 'rgba(40, 167, 69, 0.12)' : 'rgba(220, 53, 69, 0.12)',
                color: spreadData[selectedCalcCount].spread > 10 ? 'var(--ios-green)' : 'var(--ios-red)'
              }}>
                <span>Net Spinners\' Margin (Spread):</span>
                <span>₹{spreadData[selectedCalcCount].spread} / Kg ({spreadData[selectedCalcCount].spread > 10 ? \'Profit\' : \'Critical\'})</span>
              </div>
            </div>
          </div>
          
          {/* Right Column: Pricing Movement Drivers & Factors */}
          <div style={{ background: 'rgba(255, 255, 255, 0.85)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '12px', color: 'var(--ios-green)', fontWeight: 'bold' }}>
              ⚡ Critical Industry Factors & Price Drivers
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '90%', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🔌</span>
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 2px 0' }}>Power Tariff & Captive Renewable Share</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Power accounts for 15-20% of yarn production costs. Tamil Nadu mills with >70% captive wind/solar power save ₹2.5 to ₹3.0 per unit, boosting net EBITDA by 4-5%.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🌾</span>
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 2px 0' }}>Clean Cotton & Trash Content (%)</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Standard trash content for Shankar-6 cotton is ~3.2%. A 1% increase in trash increases the raw material cost by ₹2.5/kg because of yarn recovery reduction.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🎗️</span>
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 2px 0' }}>Hank Yarn Obligation (HYO) Impact</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Spun yarn mills must produce 30% of their output in hank form for handlooms. Hank yarn has lower margins, so reduction or exemptions benefit major spinners.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ fontSize: '1.5rem' }}>🌏</span>
                <div>
                  <h5 style={{ fontSize: '0.85rem', fontWeight: 'bold', margin: '0 0 2px 0' }}>Export Parity & Chinese Yarn Stockpile</h5>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Yarn exports to Bangladesh and China dictate price movements. High demand from Bangladesh knitwear hubs raises domestic yarn prices by ₹5-10/kg.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: PRODUCTION CHARTS */}`;

if (content.includes(targetComment)) {
  content = content.replace(targetComment, replacement);
  console.log('Successfully inserted Section 1.5.');
} else {
  // Try with spaces
  const alternativeTarget = `      {/* SECTION 2: PRODUCTION CHARTS */}`;
  if (content.includes(alternativeTarget)) {
    content = content.replace(alternativeTarget, replacement);
    console.log('Successfully inserted Section 1.5 using alternative target.');
  } else {
    console.error('SECTION 2 comment target was not found.');
  }
}

fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Finished updating App.jsx.');
