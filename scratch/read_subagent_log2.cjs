const fs = require('fs');

const paths = [
  'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\00bd1428-f527-409a-a057-3d4226ed9a28\\.system_generated\\logs\\transcript.jsonl',
  'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\00bd1428-f527-409a-a057-3d4226ed9a28\\logs\\transcript.jsonl',
  'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\00bd1428-f527-409a-a057-3d4226ed9a28\\transcript.jsonl'
];

let found = false;
for (const p of paths) {
  if (fs.existsSync(p)) {
    found = true;
    console.log('Found log at:', p);
    const content = fs.readFileSync(p, 'utf8');
    const lines = content.trim().split('\n');
    console.log(`Total lines: ${lines.length}`);
    console.log('--- LAST 30 LINES ---');
    lines.slice(-30).forEach((line, index) => {
      try {
        const obj = JSON.parse(line);
        console.log(`${index}: [${obj.source}] [${obj.type}] ${obj.content ? obj.content.substring(0, 120) : ''}`);
        if (obj.tool_calls) {
          console.log(`   Tool Calls: ${JSON.stringify(obj.tool_calls.map(tc => tc.name))}`);
        }
      } catch (e) {
        console.log(`${index}: ${line.substring(0, 120)}`);
      }
    });
    break;
  }
}

if (!found) {
  console.log('No log files found in any of the search paths.');
}
