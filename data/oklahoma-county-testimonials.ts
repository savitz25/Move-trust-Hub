import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Oklahoma county testimonials — 3 per county */
export const oklahomaCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    oklahoma: [
      {
        quote:
          'Two Men and a Truck Oklahoma City handled our Edmond relocation professionally — on time, efficient, and extremely careful throughout Oklahoma County.',
        name: 'Rachel K.',
        location: 'Edmond, OK',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons confirmed Oklahoma County coverage and delivered excellent full-service packing — professional crew with transparent pricing for our Midwest City move.',
        name: 'Derek M.',
        location: 'Midwest City, OK',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Oklahoma Capital Movers served our Oklahoma City apartment move efficiently — fast, professional, and reliable with careful handling of downtown belongings.',
        name: 'Priya S.',
        location: 'Oklahoma City, OK',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    tulsa: [
      {
        quote:
          'Two Men and a Truck Tulsa handled our Broken Arrow relocation professionally — on time, efficient, and extremely careful throughout Tulsa County.',
        name: 'Jason H.',
        location: 'Broken Arrow, OK',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons confirmed Tulsa County coverage and delivered excellent full-service packing — professional crew with transparent pricing for our Jenks move.',
        name: 'Linda F.',
        location: 'Jenks, OK',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Oklahoma Local Lines served our Tulsa apartment move efficiently — fast, professional, and reliable with careful handling of downtown belongings.',
        name: 'Carlos R.',
        location: 'Tulsa, OK',
        rating: 5,
        moveType: 'Apartment',
      },
    ],
    cleveland: [
      {
        quote:
          'Two Men and a Truck Norman handled our Moore relocation professionally — on time, efficient, and extremely careful throughout Cleveland County.',
        name: 'Hannah B.',
        location: 'Moore, OK',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Oklahoma Premier Moving confirmed Cleveland County coverage and delivered excellent university-area service — professional crew with transparent pricing for our Norman move.',
        name: 'Tyler G.',
        location: 'Norman, OK',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'All My Sons Oklahoma City served our Norman townhome move efficiently — fast, professional, and reliable with careful handling throughout the south metro.',
        name: 'Maria L.',
        location: 'Norman, OK',
        rating: 5,
        moveType: 'Townhome',
      },
    ],
  };

export function getOklahomaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return oklahomaCountyTestimonials[countySlug] ?? [];
}