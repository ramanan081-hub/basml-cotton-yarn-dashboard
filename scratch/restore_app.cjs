const fs = require('fs');
const readline = require('readline');
const path = require('path');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';

async function findAppJsx() {
  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let lineCount = 0;

  for await (const line of rl) {
    lineCount++;
    try {
      const obj = JSON.parse(line);
      const str = JSON.stringify(obj);
      if (str.includes('App.jsx') && str.length > 50000) {
        console.log(`Line ${lineCount}: Found a large entry containing App.jsx. Length: ${str.length}`);
        fs.writeFileSync(`./scratch/entry_${lineCount}.json`, line);
      }
    } catch (err) {
      // ignore
    }
  }
}

findAppJsx();
