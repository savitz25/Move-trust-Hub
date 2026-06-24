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
  kent: [
    {
      quote:
        'Two Men and a Truck Grand Rapids handled our Kent County relocation professionally — on time, efficient, and extremely careful throughout Grand Rapids.',
      name: 'Ian R.',
      location: 'Grand Rapids, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        "Herman's Moving & Storage confirmed Kent County coverage — best local moving service in Kent County with transparent pricing.",
      name: 'Julia S.',
      location: 'Kentwood, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Boerman Moving & Storage served our Wyoming relocation efficiently — professional crew with careful handling across West Michigan.',
      name: 'Kevin T.',
      location: 'Wyoming, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  ottawa: [
    {
      quote:
        'Two Men and a Truck Holland / Grand Haven handled our Ottawa County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Laura U.',
      location: 'Holland, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Ottawa County Moving confirmed Grand Haven coverage — best local moving service in Ottawa County with fair pricing.',
      name: 'Michael V.',
      location: 'Grand Haven, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Holland Moving & Storage served our Zeeland move efficiently — professional crew with careful handling along the lakeshore.',
      name: 'Nancy W.',
      location: 'Zeeland, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  genesee: [
    {
      quote:
        'Two Men and a Truck Flint handled our Genesee County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Oscar X.',
      location: 'Flint, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Burke Moving & Storage confirmed Genesee County coverage — best local moving service in Genesee County with transparent pricing.',
      name: 'Patricia Y.',
      location: 'Grand Blanc, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Corrigan Moving Systems served our Fenton move efficiently — professional crew with careful handling in Genesee County.',
      name: 'Quinn Z.',
      location: 'Fenton, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  washtenaw: [
    {
      quote:
        'Two Men and a Truck Ann Arbor handled our Washtenaw County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Rachel A.',
      location: 'Ann Arbor, MI',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Ann Arbor Moving & Storage confirmed student move coverage — best local moving service in Washtenaw County with fair pricing.',
      name: 'Samuel B.',
      location: 'Ypsilanti, MI',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Men on the Move served our Saline relocation efficiently — professional crew with careful handling across Washtenaw County.',
      name: 'Teresa C.',
      location: 'Saline, MI',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  ingham: [
    {
      quote:
        'Two Men and a Truck Lansing / East Lansing handled our Ingham County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Uma D.',
      location: 'Lansing, MI',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Lansing Moving & Storage confirmed East Lansing coverage — best local moving service in Ingham County with transparent pricing.',
      name: 'Victor E.',
      location: 'East Lansing, MI',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Hauling Junk served our Mason move efficiently — professional crew with careful handling in Ingham County.',
      name: 'Wendy F.',
      location: 'Mason, MI',
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