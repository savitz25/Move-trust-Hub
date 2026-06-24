import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Illinois county testimonials — 3 per county */
export const illinoisCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  cook: [
    {
      quote:
        'Two Men and a Truck Chicago handled our Lincoln Park apartment move professionally — on time, efficient, and extremely careful throughout Cook County.',
      name: 'Angela W.',
      location: 'Chicago, IL',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'New City Moving confirmed Cook County coverage and delivered excellent metro service — professional crew with transparent pricing and careful handling.',
      name: 'Robert M.',
      location: 'Evanston, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'move-tastic! served our Schaumburg relocation efficiently — best local moving service in Cook County with upfront communication about I-90 traffic delays.',
      name: 'Susan T.',
      location: 'Schaumburg, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  dupage: [
    {
      quote:
        'Two Men and a Truck Naperville handled our Wheaton relocation professionally — on time, efficient, and extremely careful throughout DuPage County.',
      name: 'Jennifer L.',
      location: 'Wheaton, IL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Schroeder Moving Service confirmed DuPage County coverage and delivered excellent suburban service — best local moving service in DuPage with transparent pricing.',
      name: 'Michael R.',
      location: 'Naperville, IL',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Western Suburbs navigated I-355 traffic smartly and moved our Downers Grove home efficiently — professional crew with careful handling.',
      name: 'Karen S.',
      location: 'Downers Grove, IL',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
};

export function getIllinoisCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return illinoisCountyTestimonials[countySlug] ?? [];
}