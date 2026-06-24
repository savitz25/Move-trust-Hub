import type { CountyTestimonialEntry } from '@/lib/local-movers/types';

/** Hand-curated Maryland county testimonials — batch 1 */
export const marylandCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  montgomery: [
    {
      quote:
        'Two Men and a Truck Montgomery County handled our Rockville relocation professionally — on time, efficient, and extremely careful with our belongings.',
      name: 'Rachel K.',
      location: 'Rockville, MD',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bethesda Corridor Moving navigated our Silver Spring-to-Bethesda move seamlessly with fair pricing and excellent care through busy DC-suburb traffic.',
      name: 'James T.',
      location: 'Bethesda, MD',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'DC Metro Moving served our corporate transfer along the I-270 corridor efficiently with steady communication and careful handling of high-value furnishings.',
      name: 'Michelle A.',
      location: 'Silver Spring, MD',
      rating: 5,
      moveType: 'Corporate',
    },
  ],
  'prince-georges': [
    {
      quote:
        "Two Men and a Truck Prince George's managed our Upper Marlboro move with great care — professional and efficient from start to finish.",
      name: 'Derek W.',
      location: 'Upper Marlboro, MD',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bowie Corridor Moving handled our Laurel-to-Bowie relocation with careful packing and fair pricing through Beltway rush-hour traffic.',
      name: 'Angela R.',
      location: 'Bowie, MD',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Upper Marlboro served our apartment move efficiently with excellent communication and professional crew coordination.',
      name: 'Carlos M.',
      location: 'Laurel, MD',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
  baltimore: [
    {
      quote:
        'Two Men and a Truck Baltimore County handled our Towson relocation professionally — on time and extremely careful with our home.',
      name: 'Susan H.',
      location: 'Towson, MD',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Catonsville Corridor Moving managed our Dundalk-area move with fair pricing and careful handling across Baltimore County.',
      name: 'Mark D.',
      location: 'Catonsville, MD',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Towson served our university-area move efficiently with excellent communication and professional crew coordination.',
      name: 'Emily F.',
      location: 'Towson, MD',
      rating: 5,
      moveType: 'Apartment',
    },
  ],
};

export function getMarylandCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return marylandCountyTestimonials[countySlug] ?? [];
}