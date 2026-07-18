import fs from 'fs';

const path = 'lib/insurance/destinations/data.ts';
let src = fs.readFileSync(path, 'utf8');

// Fix scaffold descriptions that were single-quoted but contain apostrophes.
src = src.replace(
  /description: '([^'\n]*)'/g,
  (_match, body: string) => {
    if (!body.includes("'")) return `description: '${body}'`;
    return `description: ${JSON.stringify(body)}`;
  }
);

fs.writeFileSync(path, src);
console.log('Fixed destination description quotes');