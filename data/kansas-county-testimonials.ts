import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Kansas county testimonials — 3 per county */
export const kansasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  johnson: [
    {
      quote:
        'Two Men and a Truck Overland Park handled our Shawnee relocation professionally — on time, efficient, and extremely careful throughout Johnson County.',
      name: 'Angela W.',
      location: 'Shawnee, KS',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Kansas City confirmed Johnson County coverage and delivered excellent metro service — professional crew with transparent pricing.',
      name: 'Robert M.',
      location: 'Overland Park, KS',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Kansas Premier Moving served our Olathe move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Susan T.',
      location: 'Olathe, KS',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getKansasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return kansasCountyTestimonials[countySlug] ?? [];
}