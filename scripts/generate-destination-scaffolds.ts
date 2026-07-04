import fs from 'fs';
import { INSURANCE_HUBS, getAllStateSlugs } from '../lib/insurance/hubs/registry';
import { DESTINATION_STATES } from '../lib/insurance/destinations/data';

const existing = new Set(DESTINATION_STATES.map((d) => d.slug));
const missing = getAllStateSlugs().filter((s) => !existing.has(s));

const scaffolds = missing.map((slug) => {
  const hubs = INSURANCE_HUBS.filter((h) => h.stateSlug === slug);
  const first = hubs[0];
  const cities = hubs.slice(0, 4).map((hub) => ({
    slug: hub.slug,
    name: hub.shortName,
    state: first.stateName,
    stateCode: first.stateCode,
    highlights: hub.healthNeeds.slice(0, 3),
  }));

  return {
    slug,
    code: first.stateCode,
    name: first.stateName,
    tagline: `Health insurance coverage and local agent guidance in ${first.stateName}`,
    description: (hubs[0]?.marketSnapshot?.slice(0, 280) ??
      `Independent insurance agents in ${first.stateName} help with ACA marketplace enrollment, Medicare plans, auto, and homeowners coverage tailored to local risks and regulations.`).replace(/'/g, '’'),
    insuranceNotes: [
      `State DOI licensing applies to all ${first.stateCode} insurance producers`,
      'Compare ACA subsidies and employer plan transitions with a local broker',
      'Medicare Advantage and supplement options vary by county',
      'Bundling auto and home policies may reduce premiums with independent agencies',
    ],
    cities,
    relatedLinks: [
      { href: `/insurance/directory?state=${first.stateCode}`, label: `${first.stateCode} Insurance Agencies` },
      { href: `/insurance/hubs/${slug}`, label: `${first.stateName} Insurance Hubs` },
    ],
  };
});

const serialized = scaffolds
  .map((s) => {
    const cities = s.cities
      .map(
        (c) => `      {
        slug: ${JSON.stringify(c.slug)},
        name: ${JSON.stringify(c.name)},
        state: ${JSON.stringify(c.state)},
        stateCode: ${JSON.stringify(c.stateCode)},
        highlights: ${JSON.stringify(c.highlights)},
      }`
      )
      .join(',\n');

    const notes = s.insuranceNotes.map((n) => `      ${JSON.stringify(n)},`).join('\n');
    const links = s.relatedLinks
      .map((l) => `      { href: ${JSON.stringify(l.href)}, label: ${JSON.stringify(l.label)} },`)
      .join('\n');

    return `  {
    slug: ${JSON.stringify(s.slug)},
    code: ${JSON.stringify(s.code)},
    name: ${JSON.stringify(s.name)},
    tagline: ${JSON.stringify(s.tagline)},
    description: ${JSON.stringify(s.description.replace(/'/g, '’'))},
    insuranceNotes: [
${notes}
    ],
    cities: [
${cities}
    ],
    relatedLinks: [
${links}
    ],
  }`;
  })
  .join(',\n');

fs.writeFileSync('lib/insurance/destinations/_scaffolds.txt', `,\n${serialized}`);
console.log(`Generated ${scaffolds.length} destination scaffolds for: ${missing.join(', ')}`);