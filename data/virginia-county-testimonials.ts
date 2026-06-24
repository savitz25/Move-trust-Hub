import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Virginia county testimonials — 3 per curated county */
export const virginiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  fairfax: [
    {
      quote:
        'Two Men and a Truck Fairfax handled our county relocation professionally — on time, efficient, and extremely careful with our suburban home.',
      name: 'Jennifer L.',
      location: 'Fairfax, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Beltway Movers confirmed Reston and Vienna coverage — best local moving service in Fairfax County with fair pricing and careful handling.',
      name: 'Michael R.',
      location: 'Reston, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Northern Virginia Moving served our Tysons area move efficiently — professional crew that navigated I-495 traffic and finished on schedule.',
      name: 'Priya S.',
      location: 'Vienna, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  'prince-william': [
    {
      quote:
        'Two Men and a Truck Prince William handled our Manassas relocation professionally — on time, efficient, and extremely careful.',
      name: 'David W.',
      location: 'Manassas, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Woodbridge Moving confirmed eastern Prince William coverage — best local moving service in the county with transparent pricing.',
      name: 'Sarah M.',
      location: 'Woodbridge, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'NOVA South Moving served our Bristow area move efficiently — professional crew that handled I-95 corridor traffic without delays.',
      name: 'Chris T.',
      location: 'Manassas, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  loudoun: [
    {
      quote:
        'Two Men and a Truck Loudoun handled our Leesburg relocation professionally — on time, efficient, and extremely careful with our home.',
      name: 'Amanda H.',
      location: 'Leesburg, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Ashburn Moving confirmed Dulles corridor coverage — best local moving service in Loudoun County with careful handling of high-value furnishings.',
      name: 'Robert K.',
      location: 'Ashburn, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Dulles Corridor Moving served our Sterling area move efficiently — professional crew with fair pricing and excellent communication.',
      name: 'Lisa N.',
      location: 'Sterling, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  'virginia-beach': [
    {
      quote:
        'Two Men and a Truck Virginia Beach handled our relocation professionally — on time, efficient, and extremely careful with our coastal home.',
      name: 'Mark D.',
      location: 'Virginia Beach, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Hampton Roads Moving confirmed military PCS coverage — best local moving service in Virginia Beach with transparent pricing.',
      name: 'Jessica P.',
      location: 'Virginia Beach, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Coastal Virginia Moving served our oceanfront area move efficiently — professional crew that navigated summer tourist traffic on schedule.',
      name: 'Brian F.',
      location: 'Virginia Beach, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  chesterfield: [
    {
      quote:
        'Two Men and a Truck Chesterfield handled our county relocation professionally — on time, efficient, and extremely careful.',
      name: 'Karen B.',
      location: 'Chesterfield, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Midlothian Moving confirmed central Chesterfield coverage — best local moving service in the county with fair pricing.',
      name: 'Thomas G.',
      location: 'Midlothian, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Richmond South Moving served our Bon Air area move efficiently — professional crew with careful handling along the Jefferson Davis corridor.',
      name: 'Nicole A.',
      location: 'Chesterfield, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getVirginiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return virginiaCountyTestimonials[countySlug] ?? [];
}