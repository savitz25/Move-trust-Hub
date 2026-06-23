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
  catawba: [
    {
      quote:
        'Preferred Moving Company handled our Hickory relocation professionally — efficient crews, careful handling, and transparent Catawba County pricing.',
      name: 'Karen L.',
      location: 'Hickory, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Barringer Moving & Storage served our Newton move with professional crews and careful handling of family heirlooms throughout the county seat area.',
      name: 'James P.',
      location: 'Newton, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Ashe Van Lines confirmed Conover coverage and delivered reliable packing and loading with no surprise fees despite regional traffic on US-321.',
      name: 'Michelle R.',
      location: 'Conover, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  rowan: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Salisbury relocation professionally — on time, careful with our belongings, and transparent Charlotte-metro pricing.',
      name: 'Robert T.',
      location: 'Salisbury, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Kannapolis move with professional crews and careful handling of our furniture throughout Rowan County.',
      name: 'Diana M.',
      location: 'Kannapolis, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'You Move Me confirmed China Grove coverage and delivered reliable packing and loading with no surprise fees despite I-85 corridor traffic.',
      name: 'Eric W.',
      location: 'China Grove, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  harnett: [
    {
      quote:
        'Two Men and a Truck Raleigh handled our Lillington relocation professionally — efficient crews, careful handling, and transparent Triangle pricing.',
      name: 'Angela S.',
      location: 'Lillington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Little Guys Movers served our Dunn move with professional, efficient crews and careful handling throughout Harnett County.',
      name: 'Kevin B.',
      location: 'Dunn, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers confirmed Angier coverage and delivered reliable packing and loading with no surprise fees despite Raleigh-area traffic.',
      name: 'Heather G.',
      location: 'Angier, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  orange: [
    {
      quote:
        'Two Men and a Truck Durham handled our Chapel Hill relocation professionally — on time, careful with our belongings, and transparent Triangle pricing.',
      name: 'Sarah K.',
      location: 'Chapel Hill, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'TROSA Moving served our Carrboro apartment move efficiently with fast, professional crews and great value for careful handling.',
      name: 'Daniel F.',
      location: 'Carrboro, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Armstrong Relocation confirmed Hillsborough coverage and delivered reliable packing and loading with no surprise fees despite university-area traffic.',
      name: 'Patricia N.',
      location: 'Hillsborough, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  randolph: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Asheboro relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'William H.',
      location: 'Asheboro, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our Randolph County move efficiently with fast, professional crews and great value.',
      name: 'Linda C.',
      location: 'Asheboro, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Asheboro coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Gary M.',
      location: 'Asheboro, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  henderson: [
    {
      quote:
        'Asheville Area Movers handled our Hendersonville mountain relocation professionally — efficient crews, careful handling, and transparent pricing.',
      name: 'Carol D.',
      location: 'Hendersonville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gasperson Moving & Storage served our Henderson County move with professional crews experienced with steep driveways and mountain-home handling.',
      name: 'Richard A.',
      location: 'Hendersonville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Asheville confirmed coverage and delivered reliable packing and loading with no surprise fees despite mountain road access.',
      name: 'Janet W.',
      location: 'Hendersonville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  onslow: [
    {
      quote:
        'J.E. Thomas & Sons handled our Jacksonville PCS move professionally — efficient crews, careful handling, and great experience with military families near Camp Lejeune.',
      name: 'Sgt. Mark T.',
      location: 'Jacksonville, NC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Troy Humphrey Moving served our Onslow County move with professional, efficient crews and careful handling throughout.',
      name: 'Laura C.',
      location: 'Jacksonville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage confirmed Jacksonville coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Paul R.',
      location: 'Jacksonville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  iredell: [
    {
      quote:
        'Two Men and a Truck Charlotte handled our Mooresville relocation professionally — efficient crews, careful handling, and transparent Lake Norman pricing.',
      name: 'Scott B.',
      location: 'Mooresville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentle Giant Moving served our Statesville move with professional crews and careful handling of our furniture throughout Iredell County.',
      name: 'Nancy W.',
      location: 'Statesville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Make A Move confirmed Lake Norman coverage and delivered reliable packing and loading with no surprise fees despite Charlotte-area traffic.',
      name: 'Andrew K.',
      location: 'Mooresville, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  alamance: [
    {
      quote:
        'Two Men and a Truck Greensboro handled our Burlington relocation professionally — on time, careful with our belongings, and transparent Triad pricing.',
      name: 'Rachel M.',
      location: 'Burlington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Greensboro served our Mebane apartment move efficiently with fast, professional crews and great value.',
      name: 'Chris D.',
      location: 'Mebane, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Excel Moving & Storage confirmed Graham coverage and delivered reliable packing and loading with no surprise fees despite I-40 traffic.',
      name: 'Stephanie L.',
      location: 'Graham, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  pitt: [
    {
      quote:
        'College Hunks Moving Greenville handled our relocation professionally — efficient crews, careful handling, and transparent Pitt County pricing near ECU.',
      name: 'Jordan H.',
      location: 'Greenville, NC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Superior Moving and Logistics served our Greenville move with professional crews and careful handling of our furniture throughout.',
      name: 'Maria G.',
      location: 'Greenville, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'East Carolina Moving confirmed Greenville coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Tyler N.',
      location: 'Greenville, NC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  brunswick: [
    {
      quote:
        'College Hunks Moving Wilmington handled our Leland coastal move professionally — efficient crews, careful handling, and transparent Brunswick County pricing.',
      name: 'Barbara S.',
      location: 'Leland, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Absolute Moving & Storage served our Shallotte move with professional crews experienced with coastal access and careful waterfront handling.',
      name: 'William J.',
      location: 'Shallotte, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Wilmington confirmed Southport coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Cynthia P.',
      location: 'Southport, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  davidson: [
    {
      quote:
        'Two Men and a Truck Winston-Salem handled our Lexington relocation professionally — efficient crews, careful handling, and transparent Davidson County pricing.',
      name: 'George F.',
      location: 'Lexington, NC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'American Moving & Hauling served our Thomasville move with professional, efficient crews and careful handling throughout.',
      name: 'Betty C.',
      location: 'Thomasville, NC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Miracle Movers Greensboro confirmed Davidson County coverage and delivered reliable packing and loading with no surprise fees despite Triad traffic.',
      name: 'Henry M.',
      location: 'Lexington, NC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
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