import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Louisiana parish testimonials — 3 per parish */
export const louisianaCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    'east-baton-rouge': [
      {
        quote:
          'Two Men and a Truck Baton Rouge handled our Zachary relocation professionally — on time, efficient, and extremely careful throughout East Baton Rouge Parish.',
        name: 'Angela W.',
        location: 'Zachary, LA',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Atmosphere Movers served our Baton Rouge move efficiently — fast, professional, and reliable with careful handling of LSU-area apartment belongings.',
        name: 'Marcus T.',
        location: 'Baton Rouge, LA',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Lee Moving & Storage confirmed East Baton Rouge Parish coverage and delivered excellent regional service — professional crew with transparent pricing.',
        name: 'Denise R.',
        location: 'Central, LA',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
  };

export function getLouisianaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return louisianaCountyTestimonials[countySlug] ?? [];
}