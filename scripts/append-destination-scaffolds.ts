import fs from 'fs';

const dataPath = 'lib/insurance/destinations/data.ts';
const scaffoldsPath = 'lib/insurance/destinations/_scaffolds.txt';

const data = fs.readFileSync(dataPath, 'utf8');
const scaffolds = fs.readFileSync(scaffoldsPath, 'utf8');
const updated = data.replace(
  /\n\];\n\nexport function getDestinationBySlug/,
  `${scaffolds}\n];\n\nexport function getDestinationBySlug`
);

fs.writeFileSync(dataPath, updated);
console.log('Appended destination scaffolds to data.ts');