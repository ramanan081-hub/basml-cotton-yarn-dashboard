const fs = require('fs');

const currentAppPath = './src/App.jsx';
const recoveredPath = './scratch/recovered_350_960.txt';

function reconstruct() {
  const currentApp = fs.readFileSync(currentAppPath, 'utf8').replace(/\r\n/g, '\n').split('\n');
  const recoveredRaw = fs.readFileSync(recoveredPath, 'utf8').replace(/\r\n/g, '\n').split('\n');
  
  // 1. Get first 369 lines of current App.jsx (lines 0 to 368)
  const part1 = currentApp.slice(0, 369);
  console.log('Part 1 lines:', part1.length);
  
  // 2. Parse recovered lines (from 370 to 966)
  const part2Map = new Map();
  for (const line of recoveredRaw) {
    const match = line.match(/^(\d+): (.*)$/);
    if (match) {
      const lineNum = parseInt(match[1]);
      let lineContent = match[2];
      if (lineNum === 721) {
        lineContent = '                  ))}';
      }
      part2Map.set(lineNum, lineContent);
    }
  }
  
  const part2 = [];
  for (let i = 370; i <= 966; i++) {
    if (part2Map.has(i)) {
      part2.push(part2Map.get(i));
    } else {
      console.log(`Warning: line ${i} is missing from part 2 map!`);
    }
  }
  console.log('Part 2 lines:', part2.length);
  
  // 3. Get remaining lines of current App.jsx (from index 369 to end)
  const part3 = currentApp.slice(369);
  console.log('Part 3 lines:', part3.length);
  
  // Combine all parts
  const fullAppContent = [...part1, ...part2, ...part3].join('\n');
  fs.writeFileSync('./src/App.jsx.restored', fullAppContent, 'utf8');
  console.log('Successfully wrote reconstructed file to ./src/App.jsx.restored');
  console.log('Total reconstructed lines:', fullAppContent.split('\n').length);
}

reconstruct();
