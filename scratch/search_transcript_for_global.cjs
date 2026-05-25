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
      if (step.content && step.content.includes('function GlobalDashboard')) {
        console.log(`Found "function GlobalDashboard" in STEP ${stepIndex} (log line ${fileIndex})`);
        const lines = step.content.split('\n');
        lines.forEach((l, idx) => {
          if (l.includes('function GlobalDashboard')) {
            console.log(`  Line ${idx + 1}: ${l}`);
          }
        });
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
