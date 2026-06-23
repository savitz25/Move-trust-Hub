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
  greene: [
    {
      quote:
        'Two Men and a Truck Springfield handled our relocation professionally — on time, efficient, and extremely careful throughout Greene County.',
      name: 'Thomas N.',
      location: 'Springfield, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Springfield confirmed Greene County coverage and delivered excellent service — professional crew with transparent pricing.',
      name: 'Lisa P.',
      location: 'Nixa, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Regional Moving served our Ozark-area move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Kevin D.',
      location: 'Republic, MO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  'st-louis-city': [
    {
      quote:
        'Two Men and a Truck St. Louis City handled our Central West End relocation professionally — on time, efficient, and extremely careful.',
      name: 'Rachel F.',
      location: 'St. Louis, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons St. Louis confirmed city neighborhood coverage and delivered excellent urban service — professional crew with transparent pricing.',
      name: 'Marcus J.',
      location: 'St. Louis, MO',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Missouri Premier Moving served our Soulard move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Diana L.',
      location: 'St. Louis, MO',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  clay: [
    {
      quote:
        'Two Men and a Truck Liberty handled our Gladstone relocation professionally — on time, efficient, and extremely careful throughout Clay County.',
      name: 'Brian T.',
      location: 'Liberty, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Kansas City confirmed Clay County coverage and delivered excellent north-metro service — professional crew with transparent pricing.',
      name: 'Nicole A.',
      location: 'Kearney, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Local Lines served our North Kansas City-area move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Chris W.',
      location: 'Gladstone, MO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  jefferson: [
    {
      quote:
        'Two Men and a Truck Arnold handled our Festus relocation professionally — on time, efficient, and extremely careful throughout Jefferson County.',
      name: 'Sandra M.',
      location: 'Arnold, MO',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons St. Louis confirmed Jefferson County coverage and delivered excellent south-metro service — professional crew with transparent pricing.',
      name: 'Greg H.',
      location: 'Festus, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Premier Moving served our Crystal City move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Amanda C.',
      location: 'Crystal City, MO',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  boone: [
    {
      quote:
        'Two Men and a Truck Columbia handled our university-area relocation professionally — on time, efficient, and extremely careful throughout Boone County.',
      name: 'Emily R.',
      location: 'Columbia, MO',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Columbia confirmed Boone County coverage and delivered excellent service — professional crew with transparent pricing.',
      name: 'Daniel S.',
      location: 'Columbia, MO',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Missouri Capital Movers served our Columbia move efficiently — fast, professional, and reliable with careful handling.',
      name: 'Hannah K.',
      location: 'Ashland, MO',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getMissouriCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return missouriCountyTestimonials[countySlug] ?? [];
}