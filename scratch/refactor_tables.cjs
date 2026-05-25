const fs = require('fs');

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Find all table blocks
  let index = 0;
  let newContent = '';
  
  while (true) {
    const tableStart = content.indexOf('<table', index);
    if (tableStart === -1) {
      newContent += content.substring(index);
      break;
    }
    
    const tableEnd = content.indexOf('</table>', tableStart);
    if (tableEnd === -1) {
      newContent += content.substring(index);
      break;
    }
    
    // Add content before table
    newContent += content.substring(index, tableStart);
    
    // Process table content
    let tableContent = content.substring(tableStart, tableEnd + 8);
    
    // Replacements inside the table block
    tableContent = tableContent
      .replace(/text-primary\/75/g, 'table-highlight-text')
      .replace(/text-primary\/80/g, 'table-highlight-text')
      .replace(/text-primary/g, 'table-highlight-text')
      .replace(/bg-primary\/10 text-primary/g, 'table-highlight-bg')
      .replace(/bg-primary\/20 text-primary/g, 'table-highlight-bg')
      .replace(/bg-primary-container\/20 text-primary/g, 'table-highlight-bg')
      .replace(/border-primary\/20/g, 'border-emerald-500/20')
      .replace(/text-tertiary/g, 'table-highlight-text')
      .replace(/bg-tertiary\/10 text-tertiary/g, 'table-highlight-bg')
      .replace(/border-tertiary\/20/g, 'border-emerald-500/20')
      .replace(/text-primary-container/g, 'table-highlight-text');
      
    newContent += tableContent;
    index = tableEnd + 8;
  }
  
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Refactored tables in ${filePath} successfully.`);
}

refactorFile('./src/App.jsx');
refactorFile('./src/components/YarnQualityDashboard.jsx');
