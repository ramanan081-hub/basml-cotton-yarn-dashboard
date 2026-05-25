const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function extract() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const linesMap = new Map();
  const targetSteps = [300, 302, 304, 306]; // Step index of the VIEW_FILE responses for the view_file tool calls at steps 299, 301, 303, 305
  // Actually, the VIEW_FILE step is usually the step immediately following the tool call step.
  // Let's trace step_index and parent/sibling relations, or just check the step_index of the type === 'VIEW_FILE' step.
  
  let lastStepIndex = 0;
  let lastTargetIsApp = false;

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
              lastStepIndex = stepIdx;
            } else {
              lastTargetIsApp = false;
            }
          }
        }
      }
      
      if (step.type === 'VIEW_FILE' && step.content && lastTargetIsApp) {
        // We only care about view_file calls made at steps 299, 301, 303, 305
        // Let's check the step index of the call
        if ([299, 301, 303, 305].includes(lastStepIndex)) {
          console.log(`Extracting lines from VIEW_FILE for call at step ${lastStepIndex}`);
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
        lastTargetIsApp = false;
      }
    } catch (e) {
      // ignore
    }
  }

  console.log(`Total lines in map: ${linesMap.size}`);
  
  // Find min and max lines
  const sortedLines = Array.from(linesMap.keys()).sort((a, b) => a - b);
  if (sortedLines.length === 0) {
    console.log('No lines extracted!');
    return;
  }
  
  const minLine = sortedLines[0];
  const maxLine = sortedLines[sortedLines.length - 1];
  console.log(`Min line: ${minLine}, Max line: ${maxLine}`);
  
  const missing = [];
  const reconstructed = [];
  for (let i = 1; i <= maxLine; i++) {
    if (linesMap.has(i)) {
      reconstructed.push(linesMap.get(i));
    } else {
      missing.push(i);
      reconstructed.push(`// MISSING LINE ${i}`);
    }
  }
  
  console.log(`Missing lines count: ${missing.length}`);
  if (missing.length > 0) {
    console.log(`First few missing lines: ${missing.slice(0, 50).join(', ')}`);
  }
  
  fs.writeFileSync('./scratch/App_step_305.jsx', reconstructed.join('\n'), 'utf8');
  console.log('Saved reconstructed file to ./scratch/App_step_305.jsx');
}

extract();
