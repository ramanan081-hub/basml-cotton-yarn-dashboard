const fs = require('fs');
const readline = require('readline');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function scan() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;
  let lastAppViewCall = null;

  for await (const line of rl) {
    lineCount++;
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      const stepIdx = step.step_index;

      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          if (tc.name === 'view_file' && tc.args && tc.args.AbsolutePath && tc.args.AbsolutePath.includes('App.jsx')) {
            lastAppViewCall = {
              stepIndex: stepIdx,
              lineCount: lineCount,
              startLine: tc.args.StartLine,
              endLine: tc.args.EndLine
            };
            console.log(`[CALL] StepIndex ${stepIdx} (line ${lineCount}): View App.jsx lines ${tc.args.StartLine} to ${tc.args.EndLine}`);
          }
        }
      }

      if (step.type === 'VIEW_FILE' && step.content) {
        if (lastAppViewCall) {
          const lines = step.content.split('\n');
          const firstLine = lines[0] ? lines[0].substring(0, 50) : '';
          const lastLine = lines[lines.length - 1] ? lines[lines.length - 1].substring(0, 50) : '';
          console.log(`  -> [RESPONSE] StepIndex ${stepIdx} (line ${lineCount}): content lines count = ${lines.length}, first = "${firstLine}", last = "${lastLine}"`);
          lastAppViewCall = null;
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
