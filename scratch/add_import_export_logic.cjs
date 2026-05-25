const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');

content = content.replace(/\r\n/g, '\n');

// 1. Top replacement
const oldTop = `function YarnDashboard({ data }) {
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

const newTop = `function YarnDashboard({ data }) {
  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);
  const [selectedYarnType, setSelectedYarnType] = useState('cotton');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [millIntelligence, setMillIntelligence] = useState(data.millIntelligence || initialData.yarns.millIntelligence || []);

  useEffect(() => {
    if (data.millIntelligence) {
      setMillIntelligence(data.millIntelligence);
    }
  }, [data.millIntelligence]);

  const exportToCSV = () => {
    const headers = ['Type', 'State', 'Region', 'Name', 'Capacity', 'Purchase', 'MoM Cotton', 'YoY Cotton', 'Production', 'MoM Yarn', 'YoY Yarn', 'Product Focus'];
    const csvRows = [headers.join(',')];
    
    millIntelligence.forEach(m => {
      const row = [
        m.type,
        m.state,
        m.region,
        \`"\${(m.name || '').replace(/"/g, '""')}"\`,
        \`"\${(m.capacity || '').replace(/"/g, '""')}"\`,
        m.purchase,
        m.MoMCotton,
        m.YoYCotton,
        m.prod,
        m.MoMYarn,
        m.YoYYarn,
        \`"\${(m.focus || '').replace(/"/g, '""')}"\`
      ];
      csvRows.push(row.join(','));
    });
    
    const blob = new Blob([csvRows.join('\\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Indian_Spinning_Mills_Database.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\\n');
      const parsedMills = [];
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const parts = [];
        let insideQuote = false;
        let current = '';
        for (let char of line) {
          if (char === '"') {
            insideQuote = !insideQuote;
          } else if (char === ',' && !insideQuote) {
            parts.push(current.trim());
            current = '';
          } else {
            current += char;
          }
        }
        parts.push(current.trim());
        
        if (parts.length >= 12) {
          parsedMills.push({
            id: parsedMills.length + 1,
            type: parts[0] || 'cotton',
            state: parts[1] || '',
            region: parts[2] || '',
            name: parts[3] || '',
            capacity: parts[4] || '',
            purchase: parseFloat(parts[5]) || 0,
            MoMCotton: parts[6] || '0.0%',
            YoYCotton: parts[7] || '0.0%',
            prod: parseFloat(parts[8]) || 0,
            MoMYarn: parts[9] || '0.0%',
            YoYYarn: parts[10] || '0.0%',
            focus: parts[11] || ''
          });
        }
      }
      
      if (parsedMills.length > 0) {
        setMillIntelligence(parsedMills);
        alert(\`Successfully imported \${parsedMills.length} mills!\`);
      } else {
        alert('No valid mill records found in the CSV file.');
      }
    };
    reader.readAsText(file);
  };
  
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

// 2. Button Row replacement
const oldBtnRow = `        </div>

        {/* State Selection filters */}
        <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '12px', marginBottom: '1rem' }}>`;

const newBtnRow = `        </div>

        {/* Import/Export Control Panel */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '1rem' }}>
          <button
            onClick={exportToCSV}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: '1px solid rgba(0, 122, 255, 0.3)',
              background: 'rgba(0, 122, 255, 0.06)',
              color: 'var(--ios-blue)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📥 Export Mills List (CSV)
          </button>
          
          <label
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              border: '1px solid rgba(61, 94, 48, 0.3)',
              background: 'rgba(61, 94, 48, 0.06)',
              color: 'var(--ios-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            📤 Import Mills List (CSV)
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCSV}
              style={{ display: 'none' }}
            />
          </label>
        </div>

        {/* State Selection filters */}
        <div style={{ background: 'rgba(0,0,0,0.03)', padding: '12px', borderRadius: '12px', marginBottom: '1rem' }}>`;

const normalizedOldTop = oldTop.replace(/\r\n/g, '\n');
const normalizedNewTop = newTop.replace(/\r\n/g, '\n');

if (content.includes(normalizedOldTop)) {
  content = content.replace(normalizedOldTop, normalizedNewTop);
  console.log('Successfully updated YarnDashboard hooks.');
} else {
  console.error('YarnDashboard target header not found.');
}

const normalizedOldBtnRow = oldBtnRow.replace(/\r\n/g, '\n');
const normalizedNewBtnRow = newBtnRow.replace(/\r\n/g, '\n');

if (content.includes(normalizedOldBtnRow)) {
  content = content.replace(normalizedOldBtnRow, normalizedNewBtnRow);
  console.log('Successfully inserted buttons panel.');
} else {
  console.error('State Selection filters hook point not found.');
}

fs.writeFileSync(filepath, content.replace(/\n/g, '\r\n'), 'utf8');
console.log('Finished updating App.jsx.');
