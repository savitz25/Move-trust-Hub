import { readFileSync, writeFileSync } from 'fs';

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('Usage: npx tsx scripts/resolve-merge-conflicts.ts <file>...');
  process.exit(1);
}

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  const before = (content.match(/<<<<<<< Updated upstream/g) || []).length;
  content = content.replace(
    /<<<<<<< Updated upstream\r?\n([\s\S]*?)\r?\n=======\r?\n[\s\S]*?\r?\n>>>>>>> Stashed changes\r?\n/g,
    (_match, upstream: string) => `${upstream}\n`
  );
  writeFileSync(file, content);
  const after = (content.match(/<<<<<<< Updated upstream/g) || []).length;
  console.log(`${file}: resolved ${before - after} conflicts (${after} remaining)`);
}