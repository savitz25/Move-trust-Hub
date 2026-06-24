import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated District of Columbia testimonials */
export const districtOfColumbiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'district-of-columbia': [
    {
      quote:
        'Two Men and a Truck Washington DC handled our Capitol Hill rowhouse move professionally — they secured street parking, navigated tight stairs, and finished ahead of schedule.',
      name: 'Marcus T.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Rowhouse',
    },
    {
      quote:
        'Beltway Movers managed our Georgetown high-rise relocation with excellent care — freight elevator coordination, COI paperwork, and zero damage to our furnishings.',
      name: 'Priya S.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'High-rise apartment',
    },
    {
      quote:
        'Federal District Moving coordinated our agency relocation near the federal corridor with steady communication, security-aware crews, and fair transparent pricing.',
      name: 'James R.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Moving & Storage DC handled our Joint Base Anacostia-Bolling PCS move efficiently — careful packing, on-time delivery, and great communication throughout.',
      name: 'Elena V.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Military PCS',
    },
  ],
};

export function getDistrictOfColumbiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return districtOfColumbiaCountyTestimonials[countySlug] ?? [];
}