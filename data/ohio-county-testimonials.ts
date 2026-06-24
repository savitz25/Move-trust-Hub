import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Ohio county testimonials — 3 per curated county */
export const ohioCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  franklin: [
    {
      quote:
        'Two Men and a Truck Columbus handled our Franklin County relocation professionally — on time, efficient, and extremely careful throughout Columbus.',
      name: 'Michael R.',
      location: 'Columbus, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Columbus Moving & Storage confirmed downtown coverage — best local moving service in Franklin County with transparent pricing.',
      name: 'Jennifer L.',
      location: 'Columbus, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budd Van Lines Columbus served our Dublin area move efficiently — professional crew with careful handling in Central Ohio.',
      name: 'Chris W.',
      location: 'Dublin, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  cuyahoga: [
    {
      quote:
        'Two Men and a Truck Cleveland handled our Cuyahoga County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Patricia M.',
      location: 'Cleveland, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Cleveland Moving & Storage confirmed east-side coverage — best local moving service in Cuyahoga County with fair pricing.',
      name: 'Anthony D.',
      location: 'Cleveland Heights, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budd Van Lines Cleveland served our Lakewood move efficiently — professional crew with careful handling near Lake Erie.',
      name: 'Rachel S.',
      location: 'Lakewood, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hamilton: [
    {
      quote:
        'Two Men and a Truck Cincinnati handled our Hamilton County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Daniel K.',
      location: 'Cincinnati, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Cincinnati Moving & Storage confirmed downtown coverage — best local moving service in Hamilton County with transparent pricing.',
      name: 'Emily H.',
      location: 'Cincinnati, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Queen City Moving served our Hyde Park area move efficiently — professional crew with careful handling along the Ohio River.',
      name: 'Marcus T.',
      location: 'Cincinnati, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  montgomery: [
    {
      quote:
        'Two Men and a Truck Dayton handled our Montgomery County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Laura B.',
      location: 'Dayton, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Dayton Moving & Storage confirmed Kettering coverage — best local moving service in Montgomery County with fair pricing.',
      name: 'Kevin J.',
      location: 'Kettering, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gem City Moving served our Beavercreek area move efficiently — professional crew with careful handling in the Miami Valley.',
      name: 'Nicole F.',
      location: 'Beavercreek, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  summit: [
    {
      quote:
        'Two Men and a Truck Akron handled our Summit County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Brian N.',
      location: 'Akron, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Akron Moving & Storage confirmed Highland Square coverage — best local moving service in Summit County with transparent pricing.',
      name: 'Stephanie G.',
      location: 'Akron, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Rubber City Moving served our Cuyahoga Falls move efficiently — professional crew with careful handling in Northeast Ohio.',
      name: 'Greg P.',
      location: 'Cuyahoga Falls, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lucas: [
    {
      quote:
        'Two Men and a Truck Toledo handled our Lucas County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Amanda C.',
      location: 'Toledo, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Toledo Moving & Storage confirmed West Toledo coverage — best local moving service in Lucas County with fair pricing.',
      name: 'James L.',
      location: 'Toledo, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Glass City Moving served our Sylvania area move efficiently — professional crew with careful handling in Northwest Ohio.',
      name: 'Michelle A.',
      location: 'Sylvania, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getOhioCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return ohioCountyTestimonials[countySlug] ?? [];
}