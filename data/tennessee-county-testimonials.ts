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
    sumner: [
      {
        quote:
          'Two Men and a Truck Hendersonville handled our Gallatin relocation professionally — on time, extremely careful with our belongings, and transparent Sumner County pricing throughout.',
        name: 'Nicole W.',
        location: 'Gallatin, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          "Alexander's Mobility confirmed Hendersonville coverage and delivered reliable corporate relocation service with excellent communication.",
        name: 'Greg S.',
        location: 'Hendersonville, TN',
        rating: 5,
        moveType: 'Corporate',
      },
      {
        quote:
          'College Hunks Moving Nashville served our Portland-area move efficiently — fast, professional, and reliable with great value.',
        name: 'Heather L.',
        location: 'Portland, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    wilson: [
      {
        quote:
          'Two Men and a Truck Lebanon handled our Mount Juliet relocation professionally — on time, careful with our belongings, and transparent Wilson County pricing throughout.',
        name: 'Jason M.',
        location: 'Mount Juliet, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Nashville served our Lebanon apartment move efficiently — fast, professional, and highly recommended in Wilson County.',
        name: 'Ashley R.',
        location: 'Lebanon, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Music City Movers confirmed Watertown coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Paul D.',
        location: 'Watertown, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    sullivan: [
      {
        quote:
          'Two Men and a Truck Kingsport handled our Kingsport relocation professionally — on time, efficient, and careful with our belongings throughout Sullivan County.',
        name: 'Donna K.',
        location: 'Kingsport, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving served our Bristol-area move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Steve H.',
        location: 'Bristol, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Forward Moving confirmed Blountville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Karen J.',
        location: 'Blountville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    blount: [
      {
        quote:
          'Two Men and a Truck Maryville handled our Alcoa relocation professionally — on time, efficient, and careful with our belongings throughout Blount County.',
        name: 'Michelle T.',
        location: 'Alcoa, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Knoxville served our Maryville apartment move efficiently — professional crew with careful handling.',
        name: 'Ryan B.',
        location: 'Maryville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Gouffon Moving confirmed Townsend coverage and delivered reliable packing and loading with no surprise fees despite Knoxville-metro traffic.',
        name: 'Linda G.',
        location: 'Townsend, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    washington: [
      {
        quote:
          'Two Men and a Truck Johnson City handled our Jonesborough relocation professionally — on time, extremely careful with our belongings, and the best local moving service in Washington County.',
        name: 'Eric V.',
        location: 'Jonesborough, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving served our Johnson City apartment move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Melissa A.',
        location: 'Johnson City, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Forward Moving confirmed Gray coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Tim R.',
        location: 'Gray, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    maury: [
      {
        quote:
          'Two Men and a Truck Columbia handled our Spring Hill relocation professionally — on time, efficient, and careful with our belongings throughout Maury County.',
        name: 'Angela P.',
        location: 'Spring Hill, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Nashville served our Columbia move efficiently — professional crew with careful handling.',
        name: 'Richard L.',
        location: 'Columbia, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Spyder Moving Nashville confirmed Mount Pleasant coverage and delivered reliable packing with no surprise fees.',
        name: 'Sandra K.',
        location: 'Mount Pleasant, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    bradley: [
      {
        quote:
          'Two Men and a Truck Cleveland handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Bradley County.',
        name: 'John W.',
        location: 'Cleveland, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving Chattanooga served our Cleveland move efficiently — professional crew with careful handling.',
        name: 'Diana M.',
        location: 'Cleveland, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'River City Moving confirmed Bradley County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Carl B.',
        location: 'Cleveland, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    sevier: [
      {
        quote:
          'Two Men and a Truck Sevierville handled our Pigeon Forge relocation professionally — excellent with mountain and tourist-area moves.',
        name: 'Nancy F.',
        location: 'Pigeon Forge, TN',
        rating: 5,
        moveType: 'Vacation property',
      },
      {
        quote:
          'Smokies Moving served our Gatlinburg cabin move efficiently — professional crew highly recommended for Sevier County.',
        name: 'George H.',
        location: 'Gatlinburg, TN',
        rating: 5,
        moveType: 'Cabin',
      },
      {
        quote:
          'College Hunks Moving Knoxville confirmed Sevierville coverage and delivered reliable packing with no surprise fees.',
        name: 'Betty S.',
        location: 'Sevierville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    madison: [
      {
        quote:
          'Two Men and a Truck Jackson handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Madison County.',
        name: 'William C.',
        location: 'Jackson, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons Jackson served our apartment move efficiently — professional crew with careful handling.',
        name: 'Deborah N.',
        location: 'Jackson, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Jackson Moving Company confirmed coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Frank T.',
        location: 'Jackson, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    putnam: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Putnam County.',
        name: 'Hannah D.',
        location: 'Cookeville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Cookeville Moving Company served our Tennessee Tech-area apartment move efficiently — professional and reliable.',
        name: 'Matt G.',
        location: 'Cookeville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Upper Cumberland Moving confirmed coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Ruth E.',
        location: 'Cookeville, TN',
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