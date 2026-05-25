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
  let lastTargetIsApp = false;
  let lastCallStepIndex = 0;

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      const stepIdx = step.step_index;
      
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'view_file') {
            const args = tc.args || {};
            const path = args.AbsolutePath || '';
            if (path.includes('App.jsx')) {
              lastTargetIsApp = true;
              lastCallStepIndex = stepIdx;
            } else {
              lastTargetIsApp = false;
            }
          }
        }
      }
      
      if (step.type === 'VIEW_FILE' && step.content && lastTargetIsApp) {
        // Only parse if it was before step 1920 (pre-corruption)
        if (lastCallStepIndex < 1920) {
          const contentLines = step.content.split('\n');
          for (const cline of contentLines) {
            const match = cline.match(/^(\d+): (.*)$/);
            if (match) {
              const lineNum = parseInt(match[1]);
              const lineContent = match[2].replace(/\r$/, ''); // remove trailing carriage return
              linesMap.set(lineNum, lineContent);
            }
          }
        }
        lastTargetIsApp = false;
      }
    } catch (e) {
      // ignore
    }
  }

  console.log(`Total lines recovered: ${linesMap.size}`);
  
  // Let's find missing lines in range 1 to 3161
  const missing = [];
  for (let i = 1; i <= 3161; i++) {
    if (!linesMap.has(i)) {
      missing.push(i);
    }
  }
  
  console.log(`Missing lines count: ${missing.length}`);
  if (missing.length > 0) {
    // Group missing lines into ranges
    let ranges = [];
    let start = missing[0];
    let prev = missing[0];
    for (let i = 1; i < missing.length; i++) {
      if (missing[i] === prev + 1) {
        prev = missing[i];
      } else {
        ranges.push([start, prev]);
        start = missing[i];
        prev = missing[i];
      }
    }
    ranges.push([start, prev]);
    console.log("Missing ranges:", ranges);
  }
}

scan();
