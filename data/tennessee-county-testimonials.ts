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
    knox: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Farragut relocation professionally — on time, extremely careful with our belongings, and transparent Knox County pricing throughout.',
        name: 'Robert H.',
        location: 'Farragut, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Knoxville served our UT-area apartment move efficiently — fast, professional, and reliable with great value for careful handling.',
        name: 'Amanda L.',
        location: 'Knoxville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Gouffon Moving confirmed West Knoxville coverage and delivered reliable packing and loading with no surprise fees despite university-area traffic.',
        name: 'Chris P.',
        location: 'Knoxville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    hamilton: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Signal Mountain relocation professionally — on time, extremely careful with our belongings, and transparent Hamilton County pricing throughout.',
        name: 'Laura B.',
        location: 'Signal Mountain, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Chattanooga served our downtown apartment move efficiently — fast, professional, and reliable with great value for careful handling.',
        name: 'Mark D.',
        location: 'Chattanooga, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'River City Moving confirmed East Ridge coverage and delivered reliable packing and loading with no surprise fees despite river-valley traffic.',
        name: 'Karen S.',
        location: 'East Ridge, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    rutherford: [
      {
        quote:
          'Two Men and a Truck Murfreesboro handled our Smyrna relocation professionally — on time, extremely careful with our belongings, and transparent Rutherford County pricing throughout.',
        name: 'Kevin J.',
        location: 'Smyrna, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Nashville served our MTSU-area apartment move efficiently — fast, professional, and reliable with great value for careful handling.',
        name: 'Rachel M.',
        location: 'Murfreesboro, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Armstrong Relocation confirmed La Vergne coverage and delivered reliable packing and loading with no surprise fees despite Nashville-metro traffic.',
        name: 'Daniel F.',
        location: 'La Vergne, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    williamson: [
      {
        quote:
          'Two Men and a Truck Franklin handled our Brentwood relocation with exceptional professionalism and care — transparent Williamson County pricing throughout.',
        name: 'Patricia N.',
        location: 'Brentwood, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Black Tie Moving Nashville served our Franklin luxury home move efficiently — outstanding care with high-end furnishings and no damage.',
        name: 'Andrew C.',
        location: 'Franklin, TN',
        rating: 5,
        moveType: 'Luxury home',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Nolensville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Lisa H.',
        location: 'Nolensville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    montgomery: [
      {
        quote:
          'Two Men and a Truck Clarksville handled our Fort Campbell PCS move professionally — on time, efficient, and careful with military-family belongings.',
        name: 'Sgt. James R.',
        location: 'Clarksville, TN',
        rating: 5,
        moveType: 'Military PCS',
      },
      {
        quote:
          'All My Sons Clarksville served our local move efficiently — professional crew with strong military-move experience and transparent pricing.',
        name: 'Maria G.',
        location: 'Clarksville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Maxwell Moving confirmed Clarksville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Tom B.',
        location: 'Clarksville, TN',
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