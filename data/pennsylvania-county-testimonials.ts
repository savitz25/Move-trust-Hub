import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Pennsylvania county testimonials — batch 1 */
export const pennsylvaniaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  philadelphia: [
    {
      quote:
        'Two Men and a Truck Philadelphia handled our Center City rowhome move professionally — on time and extremely careful through tight urban streets.',
      name: 'Marcus L.',
      location: 'Philadelphia, PA',
      rating: 5,
      moveType: 'Rowhome',
    },
    {
      quote:
        'Schuylkill Corridor Moving navigated our University City relocation with fair pricing and excellent care through Philadelphia traffic.',
      name: 'Nicole P.',
      location: 'Philadelphia, PA',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'Inner City Moving served our historic neighborhood move efficiently with steady communication and professional crew coordination.',
      name: 'Andre S.',
      location: 'Philadelphia, PA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  allegheny: [
    {
      quote:
        'Two Men and a Truck Pittsburgh handled our Allegheny County move professionally — careful with hillside access and bridge traffic.',
      name: 'Jennifer K.',
      location: 'Pittsburgh, PA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Three Rivers Moving managed our Mount Lebanon relocation with fair pricing and excellent handling across Pittsburgh suburbs.',
      name: 'David R.',
      location: 'Mount Lebanon, PA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Steel City Moving served our apartment move efficiently with punctual arrival and professional crew coordination.',
      name: 'Sarah M.',
      location: 'Pittsburgh, PA',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  montgomery: [
    {
      quote:
        'Two Men and a Truck Montgomery County handled our Norristown relocation professionally — on time and extremely careful with our home.',
      name: 'Rachel T.',
      location: 'Norristown, PA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'King of Prussia Corridor Moving navigated our Main Line move seamlessly with fair pricing through Schuylkill Expressway traffic.',
      name: 'James H.',
      location: 'King of Prussia, PA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Main Line Moving served our suburban relocation efficiently with excellent communication and careful handling.',
      name: 'Michelle W.',
      location: 'Ardmore, PA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getPennsylvaniaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return pennsylvaniaCountyTestimonials[countySlug] ?? [];
}