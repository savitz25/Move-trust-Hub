import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Arkansas county testimonials — 3 per county */
export const arkansasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  pulaski: [
    {
      quote:
        'Two Men and a Truck Little Rock handled our Sherwood relocation professionally — on time, efficient, and extremely careful throughout Pulaski County.',
      name: 'Angela W.',
      location: 'Sherwood, AR',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Little Rock confirmed Pulaski County coverage and delivered excellent central Arkansas service — professional crew with transparent pricing.',
      name: 'Robert M.',
      location: 'Little Rock, AR',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Arkansas Capital Movers served our North Little Rock move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Susan T.',
      location: 'North Little Rock, AR',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getArkansasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return arkansasCountyTestimonials[countySlug] ?? [];
}