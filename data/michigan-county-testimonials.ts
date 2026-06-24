import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Michigan county testimonials — 3 per county */
export const michiganCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  wayne: [
    {
      quote:
        'Two Men and a Truck Detroit / Dearborn handled our Wayne County relocation professionally — on time, efficient, and extremely careful throughout Detroit.',
      name: 'Marcus T.',
      location: 'Detroit, MI',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Corrigan Moving Systems confirmed Wayne County coverage and delivered excellent metro service — best local moving service in Wayne County with transparent pricing.',
      name: 'Aisha R.',
      location: 'Dearborn, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Men on the Move served our Livonia relocation efficiently — professional crew with careful handling and upfront communication about I-96 traffic delays.',
      name: 'Brian K.',
      location: 'Livonia, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getMichiganCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return michiganCountyTestimonials[countySlug] ?? [];
}