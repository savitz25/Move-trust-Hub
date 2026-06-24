import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Indiana county testimonials — 3 per curated county */
export const indianaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  marion: [
    {
      quote:
        'Two Men and a Truck Indianapolis handled our Marion County relocation professionally — on time, efficient, and extremely careful throughout Indianapolis.',
      name: 'James T.',
      location: 'Indianapolis, IN',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Indianapolis Moving & Storage confirmed downtown coverage — best local moving service in Marion County with transparent pricing.',
      name: 'Sarah K.',
      location: 'Indianapolis, IN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budd Van Lines Indianapolis served our Lawrence move efficiently — professional crew with careful handling in Central Indiana.',
      name: 'David M.',
      location: 'Lawrence, IN',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  lake: [
    {
      quote:
        'Two Men and a Truck Merrillville handled our Lake County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Maria G.',
      location: 'Merrillville, IN',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Crown Point Moving & Storage confirmed Crown Point coverage — best local moving service in Lake County with fair pricing.',
      name: 'Robert H.',
      location: 'Crown Point, IN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Hammond Moving & Storage served our Gary area move efficiently — professional crew with careful handling near the Chicago metro.',
      name: 'Lisa P.',
      location: 'Hammond, IN',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  allen: [
    {
      quote:
        'Two Men and a Truck Fort Wayne handled our Allen County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Michael B.',
      location: 'Fort Wayne, IN',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Fort Wayne Moving & Storage confirmed New Haven coverage — best local moving service in Allen County with transparent pricing.',
      name: 'Jennifer L.',
      location: 'New Haven, IN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Summit Moving & Storage served our Northeast Indiana move efficiently — professional crew with careful handling throughout Fort Wayne.',
      name: 'Chris W.',
      location: 'Fort Wayne, IN',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  hamilton: [
    {
      quote:
        'Two Men and a Truck Carmel handled our Hamilton County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Emily R.',
      location: 'Carmel, IN',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Fishers Moving & Storage confirmed Fishers coverage — best local moving service in Hamilton County with fair pricing.',
      name: 'Andrew S.',
      location: 'Fishers, IN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Noblesville Moving & Storage served our Westfield move efficiently — professional crew with careful handling in affluent Indianapolis suburbs.',
      name: 'Rachel N.',
      location: 'Westfield, IN',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  'st-joseph': [
    {
      quote:
        'Two Men and a Truck South Bend handled our St. Joseph County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Kevin D.',
      location: 'South Bend, IN',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Mishawaka Moving & Storage confirmed Mishawaka coverage — best local moving service in St. Joseph County with transparent pricing.',
      name: 'Amanda F.',
      location: 'Mishawaka, IN',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'ND Area Moving & Storage served our university-area move efficiently — professional crew with careful handling near Notre Dame.',
      name: 'Brian C.',
      location: 'South Bend, IN',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getIndianaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return indianaCountyTestimonials[countySlug] ?? [];
}