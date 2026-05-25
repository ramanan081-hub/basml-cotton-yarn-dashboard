const fs = require('fs');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(transcriptPath, 'utf8');
const lines = fileContent.split('\n');

const stepsToInspect = [1856, 1858, 1860];
for (const stepNum of stepsToInspect) {
  if (stepNum < lines.length) {
    const line = lines[stepNum];
    if (!line) continue;
    try {
      const step = JSON.parse(line);
      console.log(`Step ${stepNum}: type=${step.type}`);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          console.log(`  Tool: ${tc.name}, TargetFile: ${tc.args.TargetFile}`);
          if (tc.args.CodeContent) {
            console.log(`  CodeContent prefix: ${tc.args.CodeContent.substring(0, 100)}...`);
            console.log(`  CodeContent length: ${tc.args.CodeContent.length}`);
          }
        }
      }
    } catch (e) {
      console.log(`Error parsing step ${stepNum}: ${e.message}`);
    }
  }
}
