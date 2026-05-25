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
    try {
      const step = JSON.parse(line);
      const stepIdx = step.step_index;

      if (step.tool_calls) {
        for (const tc of step.tool_calls) {
          const name = tc.name || '';
          const args = tc.args || {};
          const targetFile = args.TargetFile || args.Target || '';
          if (targetFile.includes('App.jsx') && (name.includes('replace') || name.includes('write'))) {
            console.log(`[WRITE CALL] StepIndex ${stepIdx} (line ${lineCount}): Tool=${name}`);
            if (args.Instruction) {
              console.log(`  Instruction: ${args.Instruction}`);
            }
            if (args.ReplacementChunks) {
              console.log(`  Chunks: ${args.ReplacementChunks.length}`);
              for (const chunk of args.ReplacementChunks) {
                console.log(`    StartLine: ${chunk.StartLine}, EndLine: ${chunk.EndLine}`);
                console.log(`    TargetContent prefix: "${chunk.TargetContent.substring(0, 100).replace(/\n/g, '\\n')}"`);
              }
            }
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
