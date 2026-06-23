import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Missouri county testimonials — 3 per county */
export const missouriCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'st-louis': [
    {
      quote:
        'Two Men and a Truck Chesterfield handled our Kirkwood relocation professionally — on time, efficient, and extremely careful throughout St. Louis County.',
      name: 'Angela W.',
      location: 'Kirkwood, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons St. Louis confirmed St. Louis County coverage and delivered excellent metro service — professional crew with transparent pricing.',
      name: 'Robert M.',
      location: 'Chesterfield, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Premier Moving served our Clayton-area move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Susan T.',
      location: 'Creve Coeur, MO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getMissouriCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return missouriCountyTestimonials[countySlug] ?? [];
}