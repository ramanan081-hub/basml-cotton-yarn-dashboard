const fs = require('fs');
const path = './src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// Add imports
if (!content.includes('import HomeStitch')) {
  const imports = `import HomeStitch from './HomeStitch';
import YarnAnalysisStitch from './YarnAnalysisStitch';
import QualityExpressionStitch from './QualityExpressionStitch';
`;
  // Add after other imports or at top
  const firstImportLine = content.indexOf('import');
  if (firstImportLine !== -1) {
    content = content.slice(0, firstImportLine) + imports + content.slice(firstImportLine);
  } else {
    content = imports + content;
  }
}

// Replace tab rendering
// Find activeTab === 'global'
content = content.replace(/{activeTab === 'global' && <GlobalDashboard.*?\/>}/, "{activeTab === 'global' && <HomeStitch />}");
content = content.replace(/{activeTab === 'analysis' && <AnalysisDashboard.*?\/>}/, "{activeTab === 'analysis' && <YarnAnalysisStitch />}");
content = content.replace(/{activeTab === 'quality' && <YarnQualityDashboard.*?\/>}/, "{activeTab === 'quality' && <QualityExpressionStitch />}");

fs.writeFileSync(path, content);
console.log('App.jsx updated with Stitch components.');
