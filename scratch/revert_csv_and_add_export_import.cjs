const fs = require('fs');

// 1. Update data.js with exportShare and importShare fields
const dataPath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\data.js';
let dataContent = fs.readFileSync(dataPath, 'utf8');

const dataLines = dataContent.replace(/\r\n/g, '\n').split('\n');
let millStart = dataLines.findIndex(l => l.includes('millIntelligence: ['));
let marketYarnStart = dataLines.findIndex(l => l.includes('marketYarnsList: ['));

if (millStart !== -1 && marketYarnStart !== -1) {
  const arrayString = dataLines.slice(millStart, marketYarnStart).join('\n')
    .replace('millIntelligence:', '')
    .trim()
    .replace(/,$/, '');

  let mills = eval(arrayString);

  mills.forEach(mill => {
    // Generate exportShare
    const exportRand = Math.random();
    if (exportRand < 0.6) {
      mill.exportShare = 'Domestic Focus';
    } else if (exportRand < 0.9) {
      mill.exportShare = `${Math.floor(10 + Math.random() * 40)}% Export`;
    } else {
      mill.exportShare = 'EOU (100% Export)';
    }

    // Generate importShare
    const importRand = Math.random();
    if (importRand < 0.7) {
      mill.importShare = 'Domestic (100%)';
    } else if (importRand < 0.85) {
      mill.importShare = 'US Pima';
    } else if (importRand < 0.95) {
      mill.importShare = 'Egyptian Giza';
    } else {
      mill.importShare = 'West African';
    }
  });

  const newLines = [
    ...dataLines.slice(0, millStart),
    '    millIntelligence: ' + JSON.stringify(mills, null, 2) + ',',
    ...dataLines.slice(marketYarnStart)
  ];
  fs.writeFileSync(dataPath, newLines.join('\n').replace(/\n/g, '\r\n'), 'utf8');
  console.log('Successfully injected export/import columns data in data.js!');
} else {
  console.error('Could not find mill intelligence array in data.js.');
}

// 2. Update App.jsx
const appPath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let appContent = fs.readFileSync(appPath, 'utf8');
appContent = appContent.replace(/\r\n/g, '\n');

// A. Revert the CSV buttons panel
const oldPanel = `        {/* Import/Export Control Panel */}
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
        </div>`;

appContent = appContent.replace(oldPanel, '');
console.log('Reverted CSV Import/Export buttons.');

// B. Add headers in table (after Production Trend header)
const oldHeader = `                  <th style={{ textAlign: 'center' }}>Production Trend (MoM / YoY)</th>
                  <th>Product Focus / Specialty</th>`;

const newHeader = `                  <th style={{ textAlign: 'center' }}>Production Trend (MoM / YoY)</th>
                  <th style={{ textAlign: 'center' }}>Export Share (%)</th>
                  <th style={{ textAlign: 'left' }}>Imported Cotton Source</th>
                  <th>Product Focus / Specialty</th>`;

appContent = appContent.replace(oldHeader, newHeader);

// C. Add cell td elements in table (after Production Trend td)
const oldCells = `                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{mill.focus}</td>`;

const newCells = `                    <td style={{ textAlign: 'center' }}>
                      <span style={{ color: mill.MoMYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.MoMYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> MoM</span>
                      <span style={{ color: 'rgba(0,0,0,0.15)', margin: '0 6px' }}>|</span>
                      <span style={{ color: mill.YoYYarn.includes('+') ? 'var(--ios-green)' : 'var(--ios-red)', fontWeight: 700 }}>{mill.YoYYarn}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}> YoY</span>
                    </td>
                    <td style={{ textAlign: 'center', fontWeight: 'bold', color: mill.exportShare.includes('EOU') ? 'var(--ios-blue)' : 'var(--text-primary)', fontSize: '0.85rem' }}>{mill.exportShare}</td>
                    <td style={{ color: mill.importShare.includes('Domestic') ? 'var(--text-secondary)' : '#b48a04', fontWeight: mill.importShare.includes('Domestic') ? 'normal' : 'bold', fontSize: '0.85rem' }}>{mill.importShare}</td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{mill.focus}</td>`;

appContent = appContent.replace(oldCells, newCells);

// D. Clean up exportToCSV and handleImportCSV definitions and hooks in YarnDashboard
const oldDashboardHooks = `  const [selectedDistricts, setSelectedDistricts] = useState([]);
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
  };`;

const newDashboardHooks = `  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const millIntelligence = data.millIntelligence || initialData.yarns.millIntelligence || [];`;

appContent = appContent.replace(oldDashboardHooks, newDashboardHooks);

fs.writeFileSync(appPath, appContent.replace(/\n/g, '\r\n'), 'utf8');
console.log('Successfully updated App.jsx table layout!');
