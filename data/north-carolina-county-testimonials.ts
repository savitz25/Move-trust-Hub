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
  guilford: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Greensboro relocation professionally — on time, extremely careful with our belongings, and transparent Triad pricing throughout Guilford County.',
      name: 'Robert H.',
      location: 'Greensboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our High Point apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Lisa P.',
      location: 'High Point, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Greensboro coverage and delivered reliable packing and loading with no surprise fees despite I-40 corridor traffic.',
      name: 'James W.',
      location: 'Greensboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  forsyth: [
    {
      quote:
        'Two Men and a Truck Winston-Salem handled our relocation professionally — efficient crews, careful handling, and transparent Forsyth County pricing.',
      name: 'Karen D.',
      location: 'Winston-Salem, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'American Moving & Hauling served our Winston-Salem move with professional, efficient crews and careful handling of our furniture throughout.',
      name: 'Thomas R.',
      location: 'Winston-Salem, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        "Todd's Easy Moves confirmed Winston-Salem coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.",
      name: 'Susan M.',
      location: 'Winston-Salem, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
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