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
      
      // Look for run_command tool calls
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'run_command') {
            const args = tc.args || {};
            const cmd = args.CommandLine || '';
            if (cmd.includes('build') || cmd.includes('dev')) {
              console.log(`[Line ${fileIndex}] Step ${stepIndex}: Proposed command: "${cmd}"`);
            }
          }
        }
      }
      
      // Look for command results/outputs
      if (step.type === 'RUN_COMMAND' || step.type === 'COMMAND_OUTPUT') {
        console.log(`[Line ${fileIndex}] Step ${stepIndex}: Command result:`);
        if (step.content) {
          console.log(`  Content length: ${step.content.length}`);
          // Print lines with "error" or "failed"
          const clines = step.content.split('\n');
          clines.forEach(l => {
            if (l.toLowerCase().includes('error') || l.toLowerCase().includes('failed') || l.toLowerCase().includes('success')) {
              console.log(`    ${l.trim()}`);
            }
          });
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
