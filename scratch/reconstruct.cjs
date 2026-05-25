const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const views = [];

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          const args = tc.args || {};
          const targetFile = args.AbsolutePath || '';
          if (targetFile.includes('App.jsx') && tc.name === 'view_file') {
            views.push({
              step_index: step.step_index,
              start: args.StartLine,
              end: args.EndLine,
              content: null
            });
          }
        }
      }
      if (step.type === 'VIEW_FILE' && views.length > 0) {
        // Find the last view that doesn't have content yet
        for (let i = views.length - 1; i >= 0; i--) {
          if (views[i].content === null) {
            views[i].content = step.content;
            break;
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }

  console.log(`Found ${views.length} views in transcript.`);
  
  // Let's see the coverage
  const linesMap = new Map();
  for (const view of views) {
    if (!view.content) continue;
    
    // Parse the lines from view.content
    // The format is: "120:                   </tr>\n121:                 ..."
    const contentLines = view.content.split('\n');
    for (const cline of contentLines) {
      const match = cline.match(/^(\d+): (.*)$/);
      if (match) {
        const lineNum = parseInt(match[1]);
        const lineContent = match[2];
        linesMap.set(lineNum, lineContent);
      }
    }
  }

  console.log(`Unique lines recovered: ${linesMap.size}`);
  
  // Let's find missing lines
  let minLine = 1;
  let maxLine = 3169;
  let missing = [];
  for (let i = minLine; i <= maxLine; i++) {
    if (!linesMap.has(i)) {
      missing.push(i);
    }
  }
  
  console.log(`Missing lines count: ${missing.length}`);
  if (missing.length > 0) {
    console.log(`First few missing lines: ${missing.slice(0, 50).join(', ')}`);
    
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
  } else {
    console.log("All lines recovered! Reconstructing App.jsx...");
    let reconstructed = [];
    for (let i = 1; i <= maxLine; i++) {
      reconstructed.push(linesMap.get(i));
    }
    fs.writeFileSync('./src/App.jsx.reconstructed', reconstructed.join('\n'));
    console.log("Saved reconstructed file to ./src/App.jsx.reconstructed");
  }
}

scan();
