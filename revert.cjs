const fs = require('fs');
const path = './src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// Restore the active tabs
content = content.replace(/{activeTab === 'global' && <HomeStitch \/>}/, "{activeTab === 'global' && <GlobalDashboard data={data.globalCotton} darkMode={darkMode} colors={themeColors} />}");
content = content.replace(/{activeTab === 'analysis' && <YarnAnalysisStitch \/>}/, "{activeTab === 'analysis' && <AnalysisDashboard darkMode={darkMode} colors={themeColors} />}");
content = content.replace(/{activeTab === 'quality' && <QualityExpressionStitch \/>}/, "{activeTab === 'quality' && <YarnQualityDashboard darkMode={darkMode} colors={themeColors} />}");

fs.writeFileSync(path, content);
console.log('Restored original data components for tabs.');
