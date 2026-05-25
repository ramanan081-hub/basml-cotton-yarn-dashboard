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
  for await (const line of rl) {
    lineCount++;
    try {
      const step = JSON.parse(line);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          const name = tc.name;
          const args = tc.args || {};
          const targetFile = args.TargetFile || args.AbsolutePath || args.SearchPath || '';
          
          if (targetFile.includes('App.jsx')) {
            console.log(`Step ${lineCount}: type=${step.type}, tool=${name}, TargetFile=${targetFile}`);
            if (args.CodeContent) {
              console.log(`  CodeContent Length: ${args.CodeContent.length}`);
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
