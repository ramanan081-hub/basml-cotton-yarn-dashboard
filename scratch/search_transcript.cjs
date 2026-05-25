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
    if (!line) continue;
    if (line.includes('prices.historical')) {
      console.log(`Line ${lineCount} has prices.historical`);
      // print a snippet of the line around the match
      const index = line.indexOf('prices.historical');
      console.log(`  Snippet: ${line.substring(Math.max(0, index - 200), Math.min(line.length, index + 300))}`);
    }
  }
}

scan();
