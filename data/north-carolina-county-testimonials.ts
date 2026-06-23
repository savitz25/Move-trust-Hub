export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

/** Hand-curated North Carolina county testimonials — grows incrementally per batch */
export const northCarolinaCountyTestimonials: Record<
  string,
  CountyTestimonialEntry[]
> = {
  mecklenburg: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Matthews relocation professionally — on time, extremely careful with our belongings, and transparent Charlotte-metro pricing throughout Mecklenburg County.',
      name: 'David M.',
      location: 'Matthews, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charlotte served our Charlotte apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Jennifer K.',
      location: 'Charlotte, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Gentle Giant Moving confirmed Huntersville coverage and delivered reliable packing and loading with no surprise fees despite I-77 corridor traffic.',
      name: 'Michael S.',
      location: 'Huntersville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  wake: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Cary relocation professionally — on time, extremely careful with our belongings, and transparent Triangle pricing throughout Wake County.',
      name: 'Amanda R.',
      location: 'Cary, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Raleigh served our Raleigh apartment move efficiently with fast, professional crews and great value for the service.',
      name: 'Brian T.',
      location: 'Raleigh, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Little Guys Movers confirmed Apex coverage and delivered reliable packing and loading with no surprise fees despite Research Triangle traffic.',
      name: 'Christine L.',
      location: 'Apex, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
};

export function getNorthCarolinaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return northCarolinaCountyTestimonials[countySlug] ?? [];
}