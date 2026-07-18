import { getCountiesForState } from '../lib/local-movers/geography/index';
import { newMexicoCountyMoverAssignments } from '../data/new-mexico-county-assignments';

const cs = getCountiesForState('new-mexico');
console.log('geo slugs:');
for (const c of cs) console.log(' ', c.slug, c.name, c.seat);
const assigned = new Set(newMexicoCountyMoverAssignments.map((a) => a.countySlug));
console.log('assigned count', assigned.size);
console.log(
  'missing',
  cs.filter((c) => !assigned.has(c.slug)).map((c) => c.slug)
);
console.log(
  'extra',
  [...assigned].filter((s) => !cs.find((c) => c.slug === s))
);
// show dona-like
console.log(
  'dona-like geo',
  cs.filter((c) => /dona|ana|cruces/i.test(c.slug + c.name))
);
console.log(
  'dona-like assign',
  [...assigned].filter((s) => /dona|ana/i.test(s))
);
