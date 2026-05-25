const fs = require('fs');
const path = './src/App.jsx';
let content = fs.readFileSync(path, 'utf8');

// Replace themeColors
const oldTheme = `  const themeColors = darkMode ? {
    primary: '#8fd5b6',
    primaryContainer: '#00513a',
    secondary: '#bfc9c3',
    tertiary: '#ffb3af',
    outline: '#404944',
    outlineVariant: '#3f4944',
    text: '#e1e3e0',
    background: '#0d1210',
    surface: '#0d1210',
    surfaceContainerLow: '#131917',
    surfaceContainerHigh: '#202a26',
    chartPalette: ['#8fd5b6', '#bfc9c3', '#ffb3af', '#6baf92', '#57605c']
  } : {
    primary: '#246a51',
    primaryContainer: '#6baf92',
    secondary: '#57605c',
    tertiary: '#8e4b49',
    outline: '#6f7973',
    outlineVariant: '#bfc9c2',
    text: '#191c1c',
    background: '#f9f9f8',
    surface: '#f9f9f8',
    surfaceContainerLow: '#f3f4f3',
    surfaceContainerHigh: '#e7e8e7',
    chartPalette: ['#246a51', '#6baf92', '#57605c', '#8e4b49', '#bfc9c2']
  };`;

const newTheme = `  const themeColors = darkMode ? {
    primary: '#adc6ff',
    primaryContainer: '#4b8eff',
    secondary: '#c6c6cb',
    tertiary: '#ffb595',
    outline: '#8b90a0',
    outlineVariant: '#414755',
    text: '#e4e2e4',
    background: '#131315',
    surface: '#131315',
    surfaceContainerLow: '#1b1b1d',
    surfaceContainerHigh: '#2a2a2c',
    chartPalette: ['#adc6ff', '#c6c6cb', '#ffb595', '#4b8eff', '#FFD60A']
  } : {
    primary: '#003ec7',
    primaryContainer: '#0052ff',
    secondary: '#505f76',
    tertiary: '#005569',
    outline: '#737688',
    outlineVariant: '#c3c5d9',
    text: '#191c1e',
    background: '#f7f9fb',
    surface: '#f7f9fb',
    surfaceContainerLow: '#f2f4f6',
    surfaceContainerHigh: '#e6e8ea',
    chartPalette: ['#003ec7', '#505f76', '#8e4b49', '#0052ff', '#005569']
  };`;

content = content.replace(oldTheme, newTheme);

// Replace card classes
content = content.replace(/bg-surface-container border border-outline-variant rounded-xl/g, 'glass-card rounded-xl');
content = content.replace(/bg-surface border border-outline-variant rounded-xl/g, 'glass-card rounded-xl');
content = content.replace(/bg-surface border border-outline-variant/g, 'glass-card border-transparent');
content = content.replace(/bg-surface-container-high border border-outline-variant/g, 'glass-card border-transparent');

// Header and Sidebar updates
content = content.replace(/bg-surface\/90 border-b border-outline-variant backdrop-blur-md/g, 'bg-surface/40 border-b border-white/20 backdrop-blur-3xl shadow-xl shadow-primary/5');
content = content.replace(/bg-surface-container-low border-r border-outline-variant/g, 'glass-card border-r border-white/10 rounded-none');

fs.writeFileSync(path, content);
console.log('App.jsx updated with Luminous Fiber theme classes.');
