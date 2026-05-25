const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Inject state hooks into YarnDashboard
const targetStart = `function YarnDashboard({ data }) {
  const stateComparison = data.stateComparison || initialData.yarns.stateComparison || [];
  const districtComparison = data.districtComparison || initialData.yarns.districtComparison || [];`;

const replacementStart = `function YarnDashboard({ data }) {
  const stateComparison = data.stateComparison || initialData.yarns.stateComparison || [];
  const districtComparison = data.districtComparison || initialData.yarns.districtComparison || [];
  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);
  const [selectedYarnType, setSelectedYarnType] = useState('cotton');
  const [searchQuery, setSearchQuery] = useState('');

  const millIntelligence = data.millIntelligence || initialData.yarns.millIntelligence || [];
  
  const toggleStateFilter = (stateName) => {
    if (selectedStates.includes(stateName)) {
      setSelectedStates(selectedStates.filter(s => s !== stateName));
    } else {
      setSelectedStates([...selectedStates, stateName]);
    }
  };

  const filteredMills = millIntelligence.filter(mill => {
    if (mill.type !== selectedYarnType) return false;
    if (selectedStates.length > 0 && !selectedStates.includes(mill.state)) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = mill.name.toLowerCase().includes(q);
      const matchesRegion = mill.region.toLowerCase().includes(q);
      const matchesFocus = mill.focus.toLowerCase().includes(q);
      if (!matchesName && !matchesRegion && !matchesFocus) return false;
    }
    return true;
  });`;

content = content.replace(targetStart, replacementStart);

// 2. Inject Mill UI terminal before SECTION 3
const targetEnd = `      {/* SECTION 3: SPOT COTTON YARNS LIST */}`;

const millUITerminal = `      {/* SECTION 2.6: MILL-LEVEL PROCUREMENT & PRODUCTION INTELLIGENCE */}
      <div className="glass-panel mb-6">
        <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🏭 Indian & Tamil Nadu Mill-Level Procurement & Production Intelligence
        </h3>
        
        {/* Toggle between Cotton and Non-Cotton */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
          <button
            onClick={() => setSelectedYarnType('cotton')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: '1px solid ' + (selectedYarnType === 'cotton' ? 'var(--ios-blue)' : 'rgba(0,0,0,0.1)'),
              background: selectedYarnType === 'cotton' ? 'var(--ios-blue)' : 'rgba(255,255,255,0.4)',
              color: selectedYarnType === 'cotton' ? '#fff' : 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
          >
            🌿 Cotton Spinning Mills
          </button>
          <button
            onClick={() => setSelectedYarnType('non-cotton')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '0.9rem',
              cursor: 'pointer',
              border: '1px solid ' + (selectedYarnType === 'non-cotton' ? 'var(--ios-blue)' : 'rgba(0,0,0,0.1)'),
              background: selectedYarnType === 'non-cotton' ? 'var(--ios-blue)' : 'rgba(255,255,255,0.4)',
              color: selectedYarnType === 'non-cotton' ? '#fff' : 'var(--text-primary)',
              transition: 'all 0.2s ease'
            }}
          >
            🧪 Non-Cotton / Synthetic Spinning Mills
          </button>
        </div>

        {/* State Selection filters */}
        <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '12px', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-secondary)' }}>
            Filter by State (Select Multiple):
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
            {['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Telangana', 'Rajasthan', 'Madhya Pradesh'].map(st => (
              <button
                key={st}
                onClick={() => toggleStateFilter(st)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: '1px solid ' + (selectedStates.includes(st) ? 'var(--ios-blue)' : 'rgba(0,0,0,0.15)'),
                  background: selectedStates.includes(st) ? 'var(--ios-blue)' : 'rgba(255,255,255,0.5)',
                  color: selectedStates.includes(st) ? '#fff' : 'var(--text-primary)',
                  transition: 'all 0.2s'
                }}
              >
                {selectedStates.includes(st) ? '✓ ' : ''}{st}
              </button>
            ))}
            <button
              onClick={() => setSelectedStates([])}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.15)',
                background: selectedStates.length === 0 ? 'rgba(0,0,0,0.15)' : 'transparent',
                color: 'var(--text-primary)'
              }}
            >
              {selectedStates.length === 0 ? 'Showing All States' : 'Clear Filter (Show All)'}
            </button>
          </div>
        </div>

        {/* Search Field */}
        <input 
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search mill by name, region or count specialty..."
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid rgba(0,0,0,0.15)',
            background: 'rgba(255,255,255,0.6)',
            color: '#000',
            fontSize: '0.9rem',
            outline: 'none',
            marginBottom: '1rem'
          }}
        />

        {/* Mills Table */}
        <div className="table-wrapper" style={{ maxHeight: '420px', overflowY: 'auto' }}>
          {filteredMills.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
              No mills found matching the active filters.
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Mill Name</th>
                  <th>Location (Region)</th>
                  <th>Active Spindles</th>
                  <th style={{ textAlign: 'right' }}>
                    {selectedYarnType === 'cotton' ? 'Cotton Purchase (Lakh Bales)' : 'Polyester/Viscose Purchase (k Tons)'}
                  </th>
                  <th style={{ textAlign: 'center' }}>Purchase Trend (MoM / YoY)</th>
                  <th style={{ textAlign: 'right' }}>Yarn Production (M Kgs)</th>
                  <th style={{ textAlign: 'center' }}>Production Trend (MoM / YoY)</th>
                  <th>Product Focus / Specialty</th>
                </tr>
              </thead>
              <tbody>
                {filteredMills.map((mill) => (
                  <tr key={mill.id}>
                    <td style={{ fontWeight: 700 }}>{mill.name}</td>
                    <td>
                      <span style={{ fontSize: '0.8rem', padding: '2px 6px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', marginRight: '6px', fontWeight: 'bold' }}>{mill.state}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{mill.region}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{mill.capacity}</td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{mill.purchase.toFixed(1)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMCotton.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMCotton}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYCotton.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYCotton}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 800 }}>{mill.prod.toFixed(1)}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{mill.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* SECTION 3: SPOT COTTON YARNS LIST */}`;

content = content.replace(targetEnd, millUITerminal);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully added Mill Intelligence filters and UI terminal in App.jsx');
