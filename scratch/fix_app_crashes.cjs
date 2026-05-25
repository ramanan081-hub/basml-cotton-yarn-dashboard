const fs = require('fs');
const filepath = 'c:\\Users\\RAMANAN\\Downloads\\BASML.COTTON.YARN.ANALYSIS.WEB.DEV\\src\\App.jsx';
let content = fs.readFileSync(filepath, 'utf8');
const lines = content.replace(/\r\n/g, '\n').split('\n');

// Find index of YarnDashboard
let yarnIdx = lines.findIndex(l => l.includes('function YarnDashboard({ data })'));
console.log('yarnIdx:', yarnIdx);

if (yarnIdx !== -1) {
  const alreadyHasState = lines.slice(yarnIdx, yarnIdx + 30).some(l => l.includes('selectedStates'));
  if (!alreadyHasState) {
    const insertLines = [
      "  const [selectedStates, setSelectedStates] = useState(['Tamil Nadu']);",
      "  const [selectedYarnType, setSelectedYarnType] = useState('cotton');",
      "  const [searchQuery, setSearchQuery] = useState('');",
      "",
      "  const millIntelligence = data.millIntelligence || initialData.yarns.millIntelligence || [];",
      "  ",
      "  const toggleStateFilter = (stateName) => {",
      "    if (selectedStates.includes(stateName)) {",
      "      setSelectedStates(selectedStates.filter(s => s !== stateName));",
      "    } else {",
      "      setSelectedStates([...selectedStates, stateName]);",
      "    }",
      "  };",
      "",
      "  const filteredMills = millIntelligence.filter(mill => {",
      "    if (mill.type !== selectedYarnType) return false;",
      "    if (selectedStates.length > 0 && !selectedStates.includes(mill.state)) return false;",
      "    if (searchQuery.trim() !== '') {",
      "      const q = searchQuery.toLowerCase();",
      "      const matchesName = mill.name.toLowerCase().includes(q);",
      "      const matchesRegion = mill.region.toLowerCase().includes(q);",
      "      const matchesFocus = mill.focus.toLowerCase().includes(q);",
      "      if (!matchesName && !matchesRegion && !matchesFocus) return false;",
      "    }",
      "    return true;",
      "  });"
    ];
    
    const newLines = [
      ...lines.slice(0, yarnIdx + 1),
      ...insertLines,
      ...lines.slice(yarnIdx + 1)
    ];
    
    fs.writeFileSync(filepath, newLines.join('\r\n'), 'utf8');
    console.log('Successfully injected state hooks into YarnDashboard!');
  } else {
    console.log('State hooks already present.');
  }
}
