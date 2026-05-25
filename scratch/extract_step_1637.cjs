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
      const stepIndex = step.step_index;
      if (stepIndex === 1637) {
        console.log(`--- STEP 1637 ---`);
        console.log('Type:', step.type);
        if (step.content) {
          console.log('Content length:', step.content.length);
          fs.writeFileSync('./scratch/recovered_400_660.txt', step.content, 'utf8');
          console.log('Saved content to ./scratch/recovered_400_660.txt');
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
