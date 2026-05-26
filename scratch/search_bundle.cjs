const fs = require('fs');

const bundlePath = "c:/Users/RAMANAN/Downloads/BASML.COTTON.YARN.ANALYSIS.WEB.DEV/dist/assets/index-Cd_Uf0Ad.js";
if (fs.existsSync(bundlePath)) {
    const code = fs.readFileSync(bundlePath, 'utf8');
    const idx = code.indexOf('ImportExportDashboard');
    if (idx !== -1) {
        console.log("Found ImportExportDashboard at index: " + idx);
        // Print 4000 characters before and after to see
        const start = Math.max(0, idx - 500);
        const end = Math.min(code.length, idx + 10000);
        console.log("--- BUNDLE EXCERPT ---");
        console.log(code.substring(start, end));
    } else {
        console.log("ImportExportDashboard not found in the bundle.");
    }
} else {
    console.log("Bundle path does not exist!");
}
