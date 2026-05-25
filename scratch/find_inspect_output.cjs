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
      const content = step.content || '';
      if (content.includes('inspect_app.cjs') || content.includes('App.jsx total lines:')) {
        console.log(`[Line ${fileIndex}] Step ${step.step_index}: type=${step.type}`);
        console.log(content.substring(0, 1500));
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
