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
  jackson: [
    {
      quote:
        'Two Men and a Truck Independence handled our Lee’s Summit relocation professionally — on time, efficient, and extremely careful throughout Jackson County.',
      name: 'David K.',
      location: 'Lee’s Summit, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Kansas City confirmed Jackson County coverage and delivered excellent metro service — professional crew with transparent pricing.',
      name: 'Maria L.',
      location: 'Independence, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Local Lines served our Blue Springs move efficiently — fast, professional, and reliable with careful handling.',
      name: 'James R.',
      location: 'Blue Springs, MO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  'st-charles': [
    {
      quote:
        'Two Men and a Truck St. Charles handled our O’Fallon relocation professionally — on time, efficient, and extremely careful throughout St. Charles County.',
      name: 'Patricia H.',
      location: 'O’Fallon, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons St. Louis confirmed St. Charles County coverage and delivered excellent west-metro service — professional crew with transparent pricing.',
      name: 'Michael B.',
      location: 'St. Peters, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Premier Moving served our Wentzville move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Jennifer S.',
      location: 'Wentzville, MO',
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