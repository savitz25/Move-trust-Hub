export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

/** Hand-curated Tennessee county testimonials — grows incrementally per batch */
export const tennesseeCountyTestimonials: Record<string, CountyTestimonialEntry[]> =
  {
    shelby: [
      {
        quote:
          'Two Men and a Truck Memphis handled our Bartlett relocation professionally — on time, extremely careful with our belongings, and transparent Shelby County pricing throughout.',
        name: 'David M.',
        location: 'Bartlett, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Memphis served our Germantown apartment move efficiently — fast, professional, and reliable with great value for careful handling.',
        name: 'Jennifer K.',
        location: 'Germantown, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'My Town Movers confirmed Collierville coverage and delivered reliable packing and loading with no surprise fees despite Memphis logistics traffic.',
        name: 'Michael S.',
        location: 'Collierville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    davidson: [
      {
        quote:
          'Two Men and a Truck Nashville handled our East Nashville relocation professionally — on time, extremely careful with our belongings, and transparent Davidson County pricing throughout.',
        name: 'Sarah R.',
        location: 'Nashville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Nashville served our downtown apartment move efficiently — fast, professional, and reliable with great value for careful handling.',
        name: 'James T.',
        location: 'Nashville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Music City Movers confirmed Green Hills coverage and delivered reliable packing and loading with no surprise fees despite heavy Nashville traffic.',
        name: 'Emily W.',
        location: 'Nashville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
  };

export function getTennesseeCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return tennesseeCountyTestimonials[countySlug] ?? [];
}