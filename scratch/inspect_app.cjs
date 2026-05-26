const fs = require('fs');

const appPath = "c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/src/App.jsx";
const code = fs.readFileSync(appPath, 'utf8');

const components = ['GlobalDashboard', 'IndiaDashboard', 'CottonVarietyExplorer', 'YarnDashboard', 'spreadData'];
for (const comp of components) {
    const idx = code.indexOf('function ' + comp);
    const varIdx = code.indexOf('const ' + comp);
    const finalIdx = idx !== -1 ? idx : varIdx;
    console.log("Component '" + comp + "': " + (finalIdx !== -1 ? "FOUND at " + finalIdx : "NOT FOUND"));
    if (finalIdx !== -1) {
        console.log(code.substring(finalIdx, finalIdx + 300) + "\n---\n");
    }
}
