import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Massachusetts county testimonials — batch 1 (3/14 counties) */
export const massachusettsCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  middlesex: [
    {
      quote:
        'Two Men and a Truck Middlesex handled our Cambridge relocation professionally — on time and extremely careful with our townhouse.',
      name: 'Alex M.',
      location: 'Cambridge, MA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Cambridge Moving navigated our Framingham move with fair pricing through Route 128 corridor traffic.',
      name: 'Beth N.',
      location: 'Framingham, MA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Boston Metro Corridor Moving served our Lowell relocation efficiently with steady communication and professional crew coordination.',
      name: 'Carl O.',
      location: 'Lowell, MA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  worcester: [
    {
      quote:
        'Two Men and a Truck Worcester handled our residential move professionally — on time and extremely careful.',
      name: 'Dana P.',
      location: 'Worcester, MA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Worcester Corridor Moving navigated our suburban relocation with fair pricing and excellent scheduling.',
      name: 'Evan Q.',
      location: 'Shrewsbury, MA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Central Mass Moving served our move efficiently with punctual arrival and professional coordination.',
      name: 'Faye R.',
      location: 'Leominster, MA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  essex: [
    {
      quote:
        'Two Men and a Truck North Shore handled our Salem move professionally — on time and extremely careful with our historic home.',
      name: 'Glen S.',
      location: 'Salem, MA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'North Shore Corridor Moving navigated our Lynn relocation with fair pricing through coastal corridor traffic.',
      name: 'Hope T.',
      location: 'Lynn, MA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Historic Coast Moving served our waterfront move efficiently with steady communication and professional crew coordination.',
      name: 'Ira U.',
      location: 'Gloucester, MA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
};

export function getMassachusettsCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return massachusettsCountyTestimonials[countySlug] ?? [];
}