const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const step = JSON.parse(line);
      if (step.step_index >= 48 && step.step_index <= 55) {
        console.log(`--- STEP ${step.step_index} ---`);
        console.log('Source:', step.source);
        console.log('Type:', step.type);
        if (step.tool_calls) {
          console.log('Tool Calls:', step.tool_calls.map(tc => ({ name: tc.name, args: Object.keys(tc.args) })));
          for (const tc of step.tool_calls) {
            if (tc.args.TargetFile || tc.args.AbsolutePath) {
              console.log(`  Target/Path: ${tc.args.TargetFile || tc.args.AbsolutePath}`);
            }
          }
        }
        if (step.content && step.type !== 'VIEW_FILE') {
          console.log('Content length:', step.content.length);
          console.log('Content preview:', JSON.stringify(step.content.substring(0, 300)));
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
