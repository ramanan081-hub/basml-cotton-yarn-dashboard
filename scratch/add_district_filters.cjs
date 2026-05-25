const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Replace the top part of YarnDashboard
const targetTop = `function YarnDashboard({ data }) {
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
  });
  const stateComparison = data.stateComparison || initialData.yarns.stateComparison || [];
  const districtComparison = data.districtComparison || initialData.yarns.districtComparison || [];`;

const replacementTop = `function YarnDashboard({ data }) {
  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);
  const [selectedYarnType, setSelectedYarnType] = useState('cotton');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);

  const millIntelligence = data.millIntelligence || initialData.yarns.millIntelligence || [];
  
  const toggleStateFilter = (stateName) => {
    if (selectedStates.includes(stateName)) {
      setSelectedStates(selectedStates.filter(s => s !== stateName));
    } else {
      setSelectedStates([...selectedStates, stateName]);
    }
  };

  const toggleDistrictFilter = (districtName) => {
    if (selectedDistricts.includes(districtName)) {
      setSelectedDistricts(selectedDistricts.filter(d => d !== districtName));
    } else {
      setSelectedDistricts([...selectedDistricts, districtName]);
    }
  };

  const tnDistricts = Array.from(new Set(
    millIntelligence
      .filter(m => m.state === 'Tamil Nadu')
      .map(m => m.region)
  )).sort();

  const filteredMills = millIntelligence.filter(mill => {
    if (mill.type !== selectedYarnType) return false;
    if (selectedStates.length > 0 && !selectedStates.includes(mill.state)) return false;
    if (selectedStates.includes('Tamil Nadu') && selectedDistricts.length > 0 && mill.state === 'Tamil Nadu' && !selectedDistricts.includes(mill.region)) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchesName = mill.name.toLowerCase().includes(q);
      const matchesRegion = mill.region.toLowerCase().includes(q);
      const matchesFocus = mill.focus.toLowerCase().includes(q);
      if (!matchesName && !matchesRegion && !matchesFocus) return false;
    }
    return true;
  }).sort((a, b) => a.name.localeCompare(b.name));

  const stateComparison = data.stateComparison || initialData.yarns.stateComparison || [];
  const districtComparison = data.districtComparison || initialData.yarns.districtComparison || [];`;

// Normalize CRLF/LF issues to be safe
content = content.replace(/\r\n/g, '\n');
const normalizedTargetTop = targetTop.replace(/\r\n/g, '\n');
const normalizedReplacementTop = replacementTop.replace(/\r\n/g, '\n');

if (content.includes(normalizedTargetTop)) {
  content = content.replace(normalizedTargetTop, normalizedReplacementTop);
  console.log('Successfully replaced top of YarnDashboard.');
} else {
  console.error('Target top structure not found in App.jsx.');
}

// 2. Insert the district selection HTML
const stateDivEnd = `            </button>
          </div>
        </div>`;

const replacementStateDivEnd = `            </button>
          </div>
        </div>

        {/* Tamil Nadu District selection filters */}
        {selectedStates.includes('Tamil Nadu') && (
          <div style={{ background: 'rgba(61, 94, 48, 0.04)', padding: '12px', borderRadius: '12px', marginBottom: '1rem', borderLeft: '4px solid rgba(61, 94, 48, 0.5)' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '8px', color: 'var(--text-secondary)' }}>
              Filter by Tamil Nadu District (Select Multiple):
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
              {tnDistricts.map(dist => (
                <button
                  key={dist}
                  onClick={() => toggleDistrictFilter(dist)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '20px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    border: '1px solid ' + (selectedDistricts.includes(dist) ? 'var(--ios-green)' : 'rgba(0,0,0,0.15)'),
                    background: selectedDistricts.includes(dist) ? 'var(--ios-green)' : 'rgba(255,255,255,0.6)',
                    color: selectedDistricts.includes(dist) ? '#fff' : 'var(--text-primary)',
                    transition: 'all 0.15s'
                  }}
                >
                  {selectedDistricts.includes(dist) ? '✓ ' : ''}{dist}
                </button>
              ))}
              <button
                onClick={() => setSelectedDistricts([])}
                style={{
                  padding: '4px 10px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  border: '1px solid rgba(0,0,0,0.15)',
                  background: selectedDistricts.length === 0 ? 'rgba(0,0,0,0.1)' : 'transparent',
                  color: 'var(--text-primary)'
                }}
              >
                {selectedDistricts.length === 0 ? 'All Districts' : 'Clear Districts'}
              </button>
            </div>
          </div>
        )}`;

const normalizedStateDivEnd = stateDivEnd.replace(/\r\n/g, '\n');
const normalizedReplacementStateDivEnd = replacementStateDivEnd.replace(/\r\n/g, '\n');

if (content.includes(normalizedStateDivEnd)) {
  content = content.replace(normalizedStateDivEnd, normalizedReplacementStateDivEnd);
  console.log('Successfully inserted Tamil Nadu district filter UI.');
} else {
  console.error('State div end token not found in App.jsx.');
}

// Convert back to CRLF before writing
fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Finished App.jsx update.');
