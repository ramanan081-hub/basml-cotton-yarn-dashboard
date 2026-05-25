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
    try {
      const step = JSON.parse(line);
      // We look for any tool call or tool response that has the word "App.jsx"
      // Let's check step.tool_calls or step.content or step.output
      const stepStr = JSON.stringify(step);
      if (stepStr.includes('App.jsx')) {
        console.log(`Step ${lineCount}: type=${step.type}, source=${step.source}, length=${stepStr.length}`);
        
        // If it's a view_file tool output or a replacement tool, let's log the details
        if (step.tool_calls) {
          for (const tc of step.tool_calls) {
            console.log(`  Tool Call: ${tc.name || tc.ToolName || tc.Action}`);
          }
        }
      }
    } catch (e) {
      // ignore
    }
  }
}

scan();
