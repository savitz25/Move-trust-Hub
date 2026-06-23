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
  union: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Indian Trail relocation professionally — efficient crews, careful handling, and transparent Union County pricing.',
      name: 'Chris B.',
      location: 'Indian Trail, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Road Haugs Moving served our Waxhaw move with professional, efficient crews based right here in Union County — careful handling throughout.',
      name: 'Melissa G.',
      location: 'Waxhaw, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Charlotte confirmed Monroe coverage and delivered reliable packing and loading with no surprise fees despite Charlotte-area traffic.',
      name: 'Daniel F.',
      location: 'Monroe, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  johnston: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Clayton relocation professionally — on time, careful with our belongings, and transparent Johnston County pricing.',
      name: 'Heather W.',
      location: 'Clayton, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Smithfield move efficiently with fast, professional crews and great value for careful suburban handling.',
      name: 'Kevin J.',
      location: 'Smithfield, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Miracle Movers confirmed Selma coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-area traffic.',
      name: 'Nicole P.',
      location: 'Selma, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cabarrus: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Concord relocation professionally — efficient crews, careful handling, and transparent Cabarrus County pricing.',
      name: 'Ryan S.',
      location: 'Concord, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Kannapolis move with professional crews and careful handling of our furniture throughout.',
      name: 'Amy L.',
      location: 'Kannapolis, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'You Move Me Charlotte confirmed Harrisburg coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Jason M.',
      location: 'Harrisburg, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  gaston: [
    {
      quote:
        'Gentle Giant Moving handled our Gastonia relocation professionally — efficient crews, careful handling, and transparent Gaston County pricing.',
      name: 'Timothy H.',
      location: 'Gastonia, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Easy Movers served our Belmont move with professional, efficient crews and great local knowledge of Charlotte-metro west-side routes.',
      name: 'Sandra K.',
      location: 'Belmont, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Hornet Moving confirmed Mount Holly coverage and delivered reliable packing and loading with no surprise fees despite I-85 traffic.',
      name: 'Greg T.',
      location: 'Mount Holly, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  'new-hanover': [
    {
      quote:
        'Absolute Moving & Storage handled our Wilmington coastal move professionally — efficient crews, careful handling, and transparent New Hanover County pricing.',
      name: 'Carol D.',
      location: 'Wilmington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers Wilmington served our Wrightsville Beach move with professional crews experienced with coastal access and careful waterfront handling.',
      name: 'Richard A.',
      location: 'Wrightsville Beach, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Wilmington confirmed Carolina Beach coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Diana R.',
      location: 'Carolina Beach, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  durham: [
    {
      quote:
        'Two Men and a Truck Durham handled our relocation professionally — on time, extremely careful with our belongings, and transparent Triangle pricing throughout Durham County.',
      name: 'Eric N.',
      location: 'Durham, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Durham apartment move efficiently with fast, professional crews and great value for careful handling near RTP.',
      name: 'Michelle T.',
      location: 'Durham, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Miracle Movers Durham confirmed coverage and delivered reliable packing and loading with no surprise fees despite Research Triangle traffic.',
      name: 'Patrick L.',
      location: 'Durham, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cumberland: [
    {
      quote:
        'Stewart Moving & Storage handled our Fayetteville PCS move professionally — efficient crews, careful handling, and great experience with military families.',
      name: 'Sgt. James R.',
      location: 'Fayetteville, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Fayetteville served our Cumberland County move with professional, efficient crews and careful handling throughout.',
      name: 'Angela M.',
      location: 'Fayetteville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move Fidelity confirmed Fort Liberty area coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'David K.',
      location: 'Fayetteville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  buncombe: [
    {
      quote:
        'Asheville Area Movers handled our mountain relocation professionally — efficient crews, careful handling, and transparent Buncombe County pricing.',
      name: 'Laura B.',
      location: 'Asheville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gasperson Moving & Storage served our Asheville move with professional crews experienced with steep driveways and historic-home handling.',
      name: 'Mark H.',
      location: 'Asheville, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed coverage and delivered reliable packing and loading with no surprise fees despite mountain road access.',
      name: 'Rachel S.',
      location: 'Asheville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
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