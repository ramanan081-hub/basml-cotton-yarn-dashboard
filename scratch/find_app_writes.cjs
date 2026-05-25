const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let fileIndex = 0;
  for await (const line of rl) {
    fileIndex++;
    try {
      const step = JSON.parse(line);
      const stepIndex = step.step_index;
      
      // Look for write_to_file tool calls targeting App.jsx
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          const args = tc.args || {};
          const targetFile = args.TargetFile || '';
          if (targetFile.includes('App.jsx')) {
            console.log(`[File Line ${fileIndex}] Step Index ${stepIndex}: type=${step.type}, tool=${tc.name}, TargetFile=${targetFile}`);
            if (args.CodeContent) {
              console.log(`  CodeContent length: ${args.CodeContent.length}`);
            }
          }
        }
      }
      
      // Look for replace_file_content or multi_replace_file_content targeting App.jsx
      if (step.type === 'PLANNER_RESPONSE' && step.tool_calls) {
        for (const tc of step.tool_calls) {
          const args = tc.args || {};
          const targetFile = args.TargetFile || '';
          if (targetFile.includes('App.jsx')) {
            console.log(`[File Line ${fileIndex}] Step Index ${stepIndex}: type=${step.type}, tool=${tc.name}`);
            if (args.ReplacementContent) {
              console.log(`  ReplacementContent length: ${args.ReplacementContent.length}`);
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
