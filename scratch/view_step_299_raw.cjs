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
      if ([299, 300].includes(step.step_index)) {
        console.log(`--- STEP ${step.step_index} ---`);
        console.log('Keys:', Object.keys(step));
        console.log('Type:', step.type);
        if (step.content) {
          console.log('Content length:', step.content.length);
          console.log('Content preview:', JSON.stringify(step.content.substring(0, 500)));
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
