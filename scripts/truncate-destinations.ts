import fs from 'fs';

const dataPath = 'lib/insurance/destinations/data.ts';
const lines = fs.readFileSync(dataPath, 'utf8').split('\n');
const virginiaIdx = lines.findIndex((l) => l.includes("slug: 'virginia'"));
if (virginiaIdx < 0) throw new Error('virginia block not found');

const exportIdx = lines.findIndex((l) => l.startsWith('export function getDestinationBySlug'));
const head = lines.slice(0, virginiaIdx - 1);
head.push('  },');
head.push('];');
head.push('');
head.push(...lines.slice(exportIdx));

fs.writeFileSync(dataPath, head.join('\n'));
console.log('Truncated destinations to 6 states');