import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Delaware county testimonials */
export const delawareCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'new-castle': [
    {
      quote:
        'Two Men and a Truck Wilmington handled our corporate relocation professionally — on time, efficient, and extremely careful with our belongings along the Wilmington financial corridor.',
      name: 'Karen L.',
      location: 'Wilmington, DE',
      rating: 5,
      moveType: 'Corporate',
    },
    {
      quote:
        'Philadelphia Metro Moving navigated our Newark-to-Chester County move seamlessly with fair pricing and excellent care through Brandywine Valley suburbs.',
      name: 'David M.',
      location: 'Newark, DE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Corporate Relocation Wilmington served our executive transfer efficiently with steady communication and careful handling of high-value furnishings.',
      name: 'Angela P.',
      location: 'Wilmington, DE',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  sussex: [
    {
      quote:
        'Two Men and a Truck Sussex managed our beach-second-home move with great care — professional and efficient from Georgetown to Rehoboth Beach.',
      name: 'Robert H.',
      location: 'Georgetown, DE',
      rating: 5,
      moveType: 'Vacation home',
    },
    {
      quote:
        'Delaware Beach Moving handled our retirement relocation to Lewes with careful packing and fair pricing through coastal summer traffic.',
      name: 'Susan W.',
      location: 'Lewes, DE',
      rating: 5,
      moveType: 'Retirement',
    },
    {
      quote:
        'Coastal Sussex Moving served our seasonal condo move with excellent care, punctual arrival, and steady communication throughout.',
      name: 'Michael T.',
      location: 'Rehoboth Beach, DE',
      rating: 5,
      moveType: 'Condo',
    },
  ],
  kent: [
    {
      quote:
        'Two Men and a Truck Kent handled our Dover government-corridor move professionally — on time and extremely careful with our home.',
      name: 'Jennifer S.',
      location: 'Dover, DE',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Central Delaware Moving managed our Smyrna relocation with fair pricing and careful handling across Kent County.',
      name: 'Thomas B.',
      location: 'Smyrna, DE',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Dover served our legislative-session move efficiently with excellent communication and professional crew coordination.',
      name: 'Lisa G.',
      location: 'Dover, DE',
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