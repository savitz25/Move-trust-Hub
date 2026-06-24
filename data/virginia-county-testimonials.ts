import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Virginia county testimonials — 3 per curated county */
export const virginiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  fairfax: [
    {
      quote:
        'Two Men and a Truck Fairfax handled our county relocation professionally — on time, efficient, and extremely careful with our suburban home.',
      name: 'Jennifer L.',
      location: 'Fairfax, VA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Beltway Movers confirmed Reston and Vienna coverage — best local moving service in Fairfax County with fair pricing and careful handling.',
      name: 'Michael R.',
      location: 'Reston, VA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Northern Virginia Moving served our Tysons area move efficiently — professional crew that navigated I-495 traffic and finished on schedule.',
      name: 'Priya S.',
      location: 'Vienna, VA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getVirginiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return virginiaCountyTestimonials[countySlug] ?? [];
}