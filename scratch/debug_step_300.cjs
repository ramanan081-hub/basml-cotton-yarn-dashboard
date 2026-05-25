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
      if (step.step_index === 300) {
        const contentLines = step.content.split('\n');
        console.log(`Step 300 total lines split by \\n: ${contentLines.length}`);
        console.log('First 20 lines:');
        for (let i = 0; i < Math.min(20, contentLines.length); i++) {
          console.log(`Line ${i}: ${JSON.stringify(contentLines[i])}`);
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
