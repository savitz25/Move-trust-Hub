import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Ohio county testimonials — 3 per curated county */
export const ohioCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  franklin: [
    {
      quote:
        'Two Men and a Truck Columbus handled our Franklin County relocation professionally — on time, efficient, and extremely careful throughout Columbus.',
      name: 'Michael R.',
      location: 'Columbus, OH',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Columbus Moving & Storage confirmed downtown coverage — best local moving service in Franklin County with transparent pricing.',
      name: 'Jennifer L.',
      location: 'Columbus, OH',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budd Van Lines Columbus served our Dublin area move efficiently — professional crew with careful handling in Central Ohio.',
      name: 'Chris W.',
      location: 'Dublin, OH',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getOhioCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return ohioCountyTestimonials[countySlug] ?? [];
}