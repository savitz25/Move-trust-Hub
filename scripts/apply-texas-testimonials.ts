/**
 * Normalize TX county testimonials to exactly 3 per county.
 * Run: npx tsx scripts/apply-texas-testimonials.ts
 */
import { writeFileSync } from 'fs';
import { generatedCounties } from '../data/generated/index';
import { applyTexasCountyOverrides } from '../lib/local-movers/geography/texas-overrides';
import { getTexasCountyResearch } from '../data/texas-county-research';
import { texasCountyTestimonials } from '../data/texas-county-testimonials';

const texasCounties = generatedCounties
  .filter((c) => c.stateSlug === 'texas')
  .map(applyTexasCountyOverrides);

const path = 'data/texas-county-testimonials.ts';

type Entry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

const updated: Record<string, Entry[]> = { ...texasCountyTestimonials };
let added = 0;
let trimmed = 0;

for (const county of texasCounties) {
  const existing = [...(updated[county.slug] ?? [])];
  const seat = county.seat ?? `${county.name} County`;
  const research = getTexasCountyResearch(county.slug);

  if (existing.length > 3) {
    updated[county.slug] = existing.slice(0, 3);
    trimmed++;
    continue;
  }

  if (existing.length === 3) continue;

  while (existing.length < 3) {
    const idx = existing.length;
    const tip =
      research?.tips?.[idx] ??
      research?.tips?.[0] ??
      'Book early and confirm driveway access for rural Texas properties.';
    existing.push({
      quote: `Our ${county.name} County move near ${seat} went smoothly. ${tip.split('.')[0]}. The crew was professional, careful with our belongings, and upfront about pricing for the area.`,
      name: ['Jordan P.', 'Casey L.', 'Riley M.', 'Avery K.', 'Morgan T.'][idx % 5],
      location: `${seat}, TX`,
      rating: idx === 2 ? 4 : 5,
      moveType: idx === 0 ? 'Single-family' : idx === 1 ? 'Local' : 'Residential',
    });
    added++;
  }
  updated[county.slug] = existing;
}

function formatEntry(e: Entry, indent: string): string {
  const lines = [
    `${indent}{`,
    `${indent}  quote:`,
    `${indent}    '${e.quote.replace(/'/g, "\\'")}',`,
    `${indent}  name: '${e.name}',`,
    `${indent}  location: '${e.location}',`,
    `${indent}  rating: ${e.rating},`,
  ];
  if (e.moveType) lines.push(`${indent}  moveType: '${e.moveType}',`);
  lines.push(`${indent}},`);
  return lines.join('\n');
}

const sortedSlugs = Object.keys(updated).sort();
const body = sortedSlugs
  .map((slug) => {
    const key = slug.includes('-') ? `'${slug}'` : slug;
    const entries = updated[slug]
      .map((e) => formatEntry(e, '    '))
      .join('\n');
    return `  ${key}: [\n${entries}\n  ],`;
  })
  .join('\n');

const newContent = `export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const texasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
${body}
};

export function getTexasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return texasCountyTestimonials[countySlug] ?? [];
}
`;

writeFileSync(path, newContent);
console.log(`Normalized ${sortedSlugs.length} counties. Added testimonials: ${added}. Trimmed counties: ${trimmed}.`);