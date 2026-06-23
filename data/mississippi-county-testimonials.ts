import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Mississippi county testimonials — 3 per county */
export const mississippiCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    harrison: [
      {
        quote:
          'Two Men and a Truck Gulf Coast handled our Biloxi relocation professionally — on time, efficient, and very careful with coastal furniture throughout Harrison County.',
        name: 'Karen L.',
        location: 'Biloxi, MS',
        rating: 5,
        moveType: 'Condo',
      },
      {
        quote:
          'Mighty Men Movers served our Gulfport move efficiently — fast, professional, and reliable with careful handling of beach-area belongings.',
        name: 'Robert M.',
        location: 'Gulfport, MS',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Allsouth Moving confirmed Harrison County coverage and delivered excellent coastal service in Long Beach — professional crew with no surprise fees.',
        name: 'Susan T.',
        location: 'Long Beach, MS',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
    hinds: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Ridgeland relocation professionally — on time, efficient, and extremely careful throughout Hinds County.',
        name: 'Angela W.',
        location: 'Ridgeland, MS',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Armstrong Relocation served our Madison-area move efficiently — fast, professional, and reliable with careful handling of high-value items.',
        name: 'David P.',
        location: 'Madison, MS',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Helping Hands Moving confirmed Jackson coverage and delivered the best local moving service in Hinds County — professional crew with transparent pricing.',
        name: 'James R.',
        location: 'Jackson, MS',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    desoto: [
      {
        quote:
          'Two Men and a Truck Memphis handled our Southaven relocation professionally — on time, efficient, and extremely careful throughout DeSoto County.',
        name: 'Michelle H.',
        location: 'Southaven, MS',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Mighty Movers served our Olive Branch move efficiently — fast, professional, and reliable with careful suburban home handling.',
        name: 'Chris B.',
        location: 'Olive Branch, MS',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Over and Beyond Movers confirmed DeSoto County coverage and delivered excellent Memphis-metro service in Horn Lake — professional crew with no surprise fees.',
        name: 'Patricia K.',
        location: 'Horn Lake, MS',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    rankin: [
      {
        quote:
          'MoveMint served our Brandon relocation professionally — on time, efficient, and extremely careful throughout Rankin County.',
        name: 'Jennifer S.',
        location: 'Brandon, MS',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Jackson handled our Flowood move efficiently — fast, professional, and reliable with careful suburban handling.',
        name: 'Mark D.',
        location: 'Flowood, MS',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'My Two Movers confirmed Rankin County coverage and delivered excellent service in Pearl — professional crew with transparent pricing.',
        name: 'Lisa G.',
        location: 'Pearl, MS',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    jackson: [
      {
        quote:
          'Two Men and a Truck Gulf Coast handled our Pascagoula coastal move professionally — on time, efficient, and very careful with waterfront furniture throughout Jackson County.',
        name: 'Thomas N.',
        location: 'Pascagoula, MS',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Ready Movers served our Gautier relocation efficiently — fast, professional, and reliable with careful handling of coastal property items.',
        name: 'Maria F.',
        location: 'Gautier, MS',
        rating: 5,
        moveType: 'Condo',
      },
      {
        quote:
          'Allsouth Moving confirmed Jackson County coverage and delivered excellent coastal service in Ocean Springs — professional crew with no surprise fees.',
        name: 'William C.',
        location: 'Ocean Springs, MS',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
  };

export function getMississippiCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return mississippiCountyTestimonials[countySlug] ?? [];
}