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
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          const args = tc.args || {};
          const targetFile = args.AbsolutePath || '';
          if (targetFile.includes('App.jsx') && tc.name === 'view_file') {
            console.log(`[Line ${fileIndex}] Step ${stepIndex}: view_file Start=${args.StartLine} End=${args.EndLine}`);
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
