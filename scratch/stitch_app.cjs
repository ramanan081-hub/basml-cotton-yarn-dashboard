const fs = require('fs');

const currentAppPath = 'src/App.jsx';
const recoveredPath = 'scratch/recovered_clean_350_970.txt';

function stitch() {
  const currentApp = fs.readFileSync(currentAppPath, 'utf8').replace(/\r\n/g, '\n').split('\n');
  const recoveredLines = fs.readFileSync(recoveredPath, 'utf8').replace(/\r\n/g, '\n').split('\n');
  
  const output = [];

  // 1. PresentationDashboard: lines 1 to 358 of current App.jsx (indices 0 to 357)
  console.log('Adding PresentationDashboard (1 to 358)...');
  for (let i = 0; i < 358; i++) {
    output.push(currentApp[i]);
  }

  // 2. Imports, formatPrice, App wrapper: from recoveredPath line 377 to 720
  console.log('Adding imports, helper, and App component (original lines 377 to 720)...');
  const recoveredMap = new Map();
  for (const line of recoveredLines) {
    const match = line.match(/^(\d+): (.*)$/);
    if (match) {
      const lineNum = parseInt(match[1]);
      recoveredMap.set(lineNum, match[2]);
    }
  }

  for (let i = 377; i <= 720; i++) {
    if (recoveredMap.has(i)) {
      output.push(recoveredMap.get(i));
    } else {
      console.log(`Error: Missing line ${i} in recovered map!`);
    }
  }

  // 3. Insert the missing gap at lines 721 to 729
  console.log('Inserting gap at lines 721-729...');
  const gap = [
    '                  ))}',
    '                </tbody>',
    '              </table>',
    '            </div>',
    '          </div>',
    '',
    '          {/* Card 2: Price Trends */}',
    '          <div className="bg-[#fffefe] dark:bg-[#1f1f21] rounded-xxl neumorphic-raised p-card-padding">',
    '            <h3 className="font-headline text-lg font-bold text-primary mb-6 flex items-center gap-2">',
    '              <span className="material-symbols-outlined text-lg">trending_up</span>',
    '              Global Cotton Price Trends',
    '            </h3>',
    '            <div className="h-[280px] w-full">',
    '              <ResponsiveContainer width="100%" height="100%">',
    '                <LineChart data={data.prices.monthly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>',
    '                  <CartesianGrid strokeDasharray="3 3" vertical={false} />'
  ];
  output.push(...gap);

  // 4. GlobalDashboard second half: original lines 730 to 910
  console.log('Adding GlobalDashboard second half (original lines 730 to 910)...');
  for (let i = 730; i <= 910; i++) {
    if (recoveredMap.has(i)) {
      output.push(recoveredMap.get(i));
    } else {
      console.log(`Error: Missing line ${i} in recovered map!`);
    }
  }

  // 5. Tail components (IndiaDashboard, YarnDashboard, AnalysisDashboard): lines 941 to end of current App.jsx
  console.log(`Adding tail components starting from line 941 to end (index 940 to end)...`);
  for (let i = 940; i < currentApp.length; i++) {
    output.push(currentApp[i]);
  }

  fs.writeFileSync('src/App.jsx.stitched', output.join('\n'), 'utf8');
  console.log('Stitched file written to src/App.jsx.stitched');
  console.log('Total lines:', output.length);
}

stitch();
