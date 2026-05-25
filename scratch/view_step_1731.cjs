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
      if (step.step_index === 1731) {
        console.log(`--- STEP 1731 ---`);
        console.log('Type:', step.type);
        if (step.content) {
          console.log('Content length:', step.content.length);
          fs.writeFileSync('./scratch/recovered_656_850.txt', step.content, 'utf8');
          console.log('Saved content to ./scratch/recovered_656_850.txt');
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
