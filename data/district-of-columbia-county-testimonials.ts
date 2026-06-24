import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated District of Columbia testimonials */
export const districtOfColumbiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'district-of-columbia': [
    {
      quote:
        'Two Men and a Truck Washington DC handled our Capitol Hill move professionally — on time, efficient, and extremely careful with our belongings.',
      name: 'Marcus T.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Rowhouse',
    },
    {
      quote:
        'Beltway Movers navigated DC parking and narrow streets expertly. Fair pricing and excellent service across Georgetown.',
      name: 'Priya S.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Moving & Storage DC managed our federal corridor relocation with great care and steady communication throughout.',
      name: 'James R.',
      location: 'Washington, DC',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
};

export function getDistrictOfColumbiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return districtOfColumbiaCountyTestimonials[countySlug] ?? [];
}