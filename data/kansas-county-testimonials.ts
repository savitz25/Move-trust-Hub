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
  sedgwick: [
    {
      quote:
        'Two Men and a Truck Wichita handled our relocation professionally — on time, efficient, and extremely careful throughout Sedgwick County.',
      name: 'David K.',
      location: 'Wichita, KS',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Wichita confirmed Sedgwick County coverage and delivered excellent service — professional crew with transparent pricing.',
      name: 'Maria L.',
      location: 'Derby, KS',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Kansas Local Lines served our Wichita move efficiently — fast, professional, and reliable with careful handling.',
      name: 'James R.',
      location: 'Wichita, KS',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  shawnee: [
    {
      quote:
        'Two Men and a Truck Topeka handled our Shawnee County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Patricia H.',
      location: 'Topeka, KS',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Topeka confirmed Shawnee County coverage and delivered excellent capital-metro service — professional crew with transparent pricing.',
      name: 'Michael B.',
      location: 'Topeka, KS',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Kansas Capital Movers served our Topeka move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Linda S.',
      location: 'Topeka, KS',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  wyandotte: [
    {
      quote:
        'Two Men and a Truck Kansas City KS handled our Wyandotte County relocation professionally — on time, efficient, and extremely careful.',
      name: 'Carlos G.',
      location: 'Kansas City, KS',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Kansas City confirmed Wyandotte County coverage and delivered excellent metro service — professional crew with transparent pricing.',
      name: 'Jennifer A.',
      location: 'Bonner Springs, KS',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Kansas Premier Moving served our Kansas City, KS move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Thomas N.',
      location: 'Kansas City, KS',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  douglas: [
    {
      quote:
        'Two Men and a Truck Lawrence handled our Douglas County relocation professionally — on time, efficient, and extremely careful with our student move.',
      name: 'Emily C.',
      location: 'Lawrence, KS',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Lawrence confirmed Douglas County coverage and delivered excellent service — professional crew with transparent pricing.',
      name: 'Kevin P.',
      location: 'Lawrence, KS',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Lawrence served our KU-area move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Rachel D.',
      location: 'Lawrence, KS',
      rating: 5,
      moveType: 'Student',
    },
  ],
};

export function getKansasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return kansasCountyTestimonials[countySlug] ?? [];
}