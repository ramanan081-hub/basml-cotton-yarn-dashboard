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
      
      if (step.type === 'VIEW_FILE' && step.content && step.content.includes('App.jsx')) {
        const clines = step.content.split('\n');
        const firstLine = clines.find(l => l.match(/^\d+:/));
        const lastLine = [...clines].reverse().find(l => l.match(/^\d+:/));
        console.log(`[Line ${fileIndex}] Step ${stepIndex}: VIEW_FILE content length: ${step.content.length}`);
        console.log(`  First code line: ${firstLine ? firstLine.trim() : 'none'}`);
        console.log(`  Last code line: ${lastLine ? lastLine.trim() : 'none'}`);
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
