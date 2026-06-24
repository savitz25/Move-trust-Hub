import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Delaware county testimonials */
export const delawareCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'new-castle': [
    {
      quote:
        'Two Men and a Truck Wilmington handled our move professionally — on time, efficient, and extremely careful with our belongings.',
      name: 'Karen L.',
      location: 'Wilmington, DE',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Best local moving service in New Castle County with fair pricing and excellent care through Newark suburbs.',
      name: 'David M.',
      location: 'Newark, DE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Professional crew served our Wilmington relocation efficiently with steady communication throughout.',
      name: 'Angela P.',
      location: 'Wilmington, DE',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  sussex: [
    {
      quote:
        'Two Men and a Truck Sussex managed our coastal move with great care — professional and efficient from Georgetown to the beach.',
      name: 'Robert H.',
      location: 'Georgetown, DE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Careful handling for our Rehoboth Beach seasonal move with fair pricing and excellent service.',
      name: 'Susan W.',
      location: 'Rehoboth Beach, DE',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'Professional team served our Sussex County relocation with excellent care and punctual arrival.',
      name: 'Michael T.',
      location: 'Lewes, DE',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  kent: [
    {
      quote:
        'Two Men and a Truck Kent handled our Dover move professionally — on time and extremely careful with our home.',
      name: 'Jennifer S.',
      location: 'Dover, DE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Reliable Central Delaware movers with fair pricing and careful handling across Kent County.',
      name: 'Thomas B.',
      location: 'Dover, DE',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Professional crew managed our Dover relocation efficiently with excellent communication.',
      name: 'Lisa G.',
      location: 'Smyrna, DE',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getDelawareCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return delawareCountyTestimonials[countySlug] ?? [];
}