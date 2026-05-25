const fs = require('fs');

const transcriptPath = 'C:\\Users\\RAMANAN\\.gemini\\antigravity\\brain\\8f44144f-355b-4b94-b3c0-84c56a86ac43\\.system_generated\\logs\\transcript.jsonl';
const fileContent = fs.readFileSync(transcriptPath, 'utf8');
const lines = fileContent.split('\n');

for (const line of lines) {
  if (!line) continue;
  try {
    const step = JSON.parse(line);
    if (step.step_index === 1920) {
      console.log(`Step ${step.step_index}: type=${step.type}`);
      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          console.log(`  Tool: ${tc.name}`);
          const args = tc.args || {};
          console.log(`  TargetFile: ${args.TargetFile}`);
          if (args.ReplacementChunks) {
            console.log(`  Chunks count: ${args.ReplacementChunks.length}`);
            for (let i = 0; i < args.ReplacementChunks.length; i++) {
              const chunk = args.ReplacementChunks[i];
              console.log(`  Chunk ${i}: StartLine=${chunk.StartLine}, EndLine=${chunk.EndLine}`);
              console.log(`  TargetContent:\n${chunk.TargetContent}\n`);
              console.log(`  ReplacementContent:\n${chunk.ReplacementContent}\n`);
            }
          }
        }
      }
    }
  } catch (e) {
    // ignore
  }
}
