import fs from 'fs';
import { execSync } from 'child_process';

const dataPath = 'lib/insurance/destinations/data.ts';
const src = fs.readFileSync(dataPath, 'utf8');

const marker = src.includes("  },,\n  {\n    slug: 'virginia'")
  ? "  },,\n  {\n    slug: 'virginia'"
  : "  },\n  {\n    slug: 'virginia'";
const endMarker = '\n];\n\nexport function getDestinationBySlug';

const start = src.indexOf(marker);
if (start === -1) {
  throw new Error('Could not find virginia scaffold marker');
}

const head = src.slice(0, start + 4).replace(/},,\s*$/, '  },'); // keep closing `  },`
const tail = src.slice(src.indexOf(endMarker));

execSync('npx tsx scripts/generate-destination-scaffolds.ts', { stdio: 'inherit' });
const scaffolds = fs.readFileSync('lib/insurance/destinations/_scaffolds.txt', 'utf8');

fs.writeFileSync(dataPath, head + scaffolds + tail);
console.log('Rebuilt destination scaffolds in data.ts');