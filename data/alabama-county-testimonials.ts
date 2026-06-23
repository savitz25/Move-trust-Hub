import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Alabama county testimonials — 3 per county */
export const alabamaCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    jefferson: [
      {
        quote:
          'Two Men and a Truck Birmingham handled our Hoover relocation professionally — on time, efficient, and extremely careful with our belongings throughout Jefferson County.',
        name: 'Rachel M.',
        location: 'Hoover, AL',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving served our Vestavia Hills move efficiently — fast, professional, and reliable with careful handling.',
        name: 'David K.',
        location: 'Vestavia Hills, AL',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'New Latitude Movers confirmed Birmingham coverage and delivered the best local moving service in Jefferson County — professional crew with no surprise fees.',
        name: 'Angela T.',
        location: 'Birmingham, AL',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
  };

export function getAlabamaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return alabamaCountyTestimonials[countySlug] ?? [];
}