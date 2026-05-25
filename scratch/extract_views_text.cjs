const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const linesMap = new Map();

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.type === 'VIEW_FILE' && step.content) {
        const contentLines = step.content.split('\n');
        for (const cline of contentLines) {
          const match = cline.match(/^(\d+): (.*)$/);
          if (match) {
            const lineNum = parseInt(match[1]);
            const lineContent = match[2];
            linesMap.set(lineNum, lineContent);
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  console.log(`Total unique lines in map: ${linesMap.size}`);
  
  // Let's print lines 350 to 960 if they exist
  let recoveredCount = 0;
  let missing = [];
  for (let i = 350; i <= 970; i++) {
    if (linesMap.has(i)) {
      recoveredCount++;
    } else {
      missing.push(i);
    }
  }
  
  console.log(`Recovered ${recoveredCount} lines in range 350-970.`);
  console.log(`Missing ${missing.length} lines in range 350-970.`);
  if (missing.length > 0) {
    console.log(`Missing lines: ${missing.join(', ')}`);
  }
  
  // Save recovered lines in range 350-970 to a file
  let output = [];
  for (let i = 350; i <= 970; i++) {
    if (linesMap.has(i)) {
      output.push(`${i}: ${linesMap.get(i)}`);
    } else {
      output.push(`${i}: MISSING`);
    }
  }

  fs.writeFileSync('./scratch/recovered_350_960.txt', output.join('\n'));
  console.log('Saved recovered lines to ./scratch/recovered_350_960.txt');
}

scan();
