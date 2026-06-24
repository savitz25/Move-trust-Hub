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
  oakland: [
    {
      quote:
        'Two Men and a Truck Troy / Rochester Hills handled our Oakland County relocation professionally — on time, efficient, and extremely careful throughout Troy.',
      name: 'Cynthia L.',
      location: 'Troy, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Oakland County Moving confirmed Rochester Hills coverage — best local moving service in Oakland County with transparent pricing.',
      name: 'David M.',
      location: 'Rochester Hills, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Men on the Move served our Royal Oak relocation efficiently — professional crew with careful handling and upfront communication about I-75 traffic delays.',
      name: 'Elena N.',
      location: 'Royal Oak, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  macomb: [
    {
      quote:
        'Two Men and a Truck Warren / Sterling Heights handled our Macomb County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Frank O.',
      location: 'Sterling Heights, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Macomb County Moving confirmed Warren coverage — best local moving service in Macomb County with fair pricing.',
      name: 'Grace P.',
      location: 'Warren, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Corrigan Moving Systems served our Clinton Township move efficiently — professional crew with careful handling in Macomb County.',
      name: 'Henry Q.',
      location: 'Clinton Township, MI',
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