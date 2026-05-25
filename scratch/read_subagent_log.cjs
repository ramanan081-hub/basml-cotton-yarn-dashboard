const fs = require('fs');
const path = 'C:/Users/RAMANAN/.gemini/antigravity/brain/00bd1428-f527-409a-a057-3d4226ed9a28/.system_generated/logs/transcript.jsonl';

if (fs.existsSync(path)) {
  const content = fs.readFileSync(path, 'utf8');
  const lines = content.trim().split('\n');
  console.log(`Subagent transcript total lines: ${lines.length}`);
  console.log('--- LAST 20 LINES ---');
  lines.slice(-20).forEach((line, index) => {
    try {
      const obj = JSON.parse(line);
      console.log(`${index}: [${obj.source}] [${obj.type}] ${obj.content ? obj.content.substring(0, 150) : ''}`);
      if (obj.tool_calls) {
        console.log(`   Tool Calls: ${JSON.stringify(obj.tool_calls.map(tc => tc.name))}`);
      }
    } catch (e) {
      console.log(`${index}: ${line.substring(0, 150)}`);
    }
  });
} else {
  console.log('Log file does not exist at:', path);
}
