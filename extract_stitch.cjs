const fs = require('fs');

function htmlToJsx(html) {
  return html
    .replace(/class=/g, 'className=')
    .replace(/for=/g, 'htmlFor=')
    .replace(/stroke-width=/g, 'strokeWidth=')
    .replace(/stroke-linecap=/g, 'strokeLinecap=')
    .replace(/stroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/fill-rule=/g, 'fillRule=')
    .replace(/clip-rule=/g, 'clipRule=')
    .replace(/<img(.*?)>/g, (match) => {
        if (!match.endsWith('/>')) return match.replace('>', ' />');
        return match;
    })
    .replace(/<input(.*?)>/g, (match) => {
        if (!match.endsWith('/>')) return match.replace('>', ' />');
        return match;
    })
    // Remove comments
    .replace(/<!--[\s\S]*?-->/g, '')
    // Fix styles
    .replace(/style="([^"]*)"/g, (match, p1) => {
        const styles = p1.split(';').filter(s => s.trim()).map(s => {
            const parts = s.split(':');
            if (parts.length < 2) return '';
            const key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            const val = parts.slice(1).join(':').trim();
            return `${key}: '${val}'`;
        }).filter(Boolean).join(', ');
        return `style={{ ${styles} }}`;
    });
}

function processScreen(path, componentName, outFile) {
  let content = fs.readFileSync(path, 'utf8');
  let match = content.match(/<main[^>]*>([\s\S]*?)<\/main>/);
  let mainContent = '';
  if (match) {
    mainContent = match[0];
  } else {
    // Quality Expression doesn't have a <main> tag, it has <section>s.
    // So let's extract everything inside <body>, except nav and footer.
    match = content.match(/<body[^>]*>([\s\S]*?)<\/body>/);
    mainContent = match[1]
      .replace(/<nav[^>]*>[\s\S]*?<\/nav>/, '')
      .replace(/<footer[^>]*>[\s\S]*?<\/footer>/, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/g, '');
  }

  let jsx = htmlToJsx(mainContent);
  const fileOutput = `
import React from 'react';

export default function ${componentName}() {
  return (
    <div className="stitch-imported-layout">
      ${jsx}
    </div>
  );
}
`;
  fs.writeFileSync(outFile, fileOutput);
  console.log(`Generated ${outFile}`);
}

processScreen('C:/Users/RAMANAN/.gemini/antigravity/brain/8f44144f-355b-4b94-b3c0-84c56a86ac43/.system_generated/steps/1121/content.md', 'YarnAnalysisStitch', './src/YarnAnalysisStitch.jsx');
processScreen('C:/Users/RAMANAN/.gemini/antigravity/brain/8f44144f-355b-4b94-b3c0-84c56a86ac43/.system_generated/steps/1122/content.md', 'QualityExpressionStitch', './src/QualityExpressionStitch.jsx');
processScreen('C:/Users/RAMANAN/.gemini/antigravity/brain/8f44144f-355b-4b94-b3c0-84c56a86ac43/.system_generated/steps/1124/content.md', 'HomeStitch', './src/HomeStitch.jsx');
