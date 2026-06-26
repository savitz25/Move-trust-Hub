import fs from 'fs';
import path from 'path';

const clusters = [
  ['florida', 'Florida'],
  ['south-carolina', 'South Carolina'],
  ['north-carolina', 'North Carolina'],
  ['tennessee', 'Tennessee'],
  ['texas', 'Texas'],
  ['idaho', 'Idaho'],
  ['oregon', 'Oregon'],
  ['oklahoma', 'Oklahoma'],
  ['arizona', 'Arizona'],
  ['arkansas', 'Arkansas'],
  ['california', 'California'],
  ['alabama', 'Alabama'],
];

const marker = `            ))}\n          </div>\n        </section>`;

for (const [slug, label] of clusters) {
  const file = path.join('app/(marketing)/moving-to', slug, 'page.tsx');
  let src = fs.readFileSync(file, 'utf8');
  if (src.includes('DestinationClusterHeroCta')) {
    console.log('skip', file);
    continue;
  }
  if (!src.includes("import { DestinationClusterHeroCta }")) {
    src = src.replace(
      "import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';",
      "import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';\nimport { DestinationClusterHeroCta } from '@/components/destinations/destination-cluster-hero-cta';"
    );
  }
  const insert = `            ))}\n\n            <DestinationClusterHeroCta clusterSlug="${slug}" clusterLabel="${label}" />\n          </div>\n        </section>`;
  if (!src.includes(marker)) {
    console.log('marker miss', file);
    continue;
  }
  src = src.replace(marker, insert);
  fs.writeFileSync(file, src);
  console.log('updated', file);
}