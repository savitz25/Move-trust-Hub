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
    anderson: [
      {
        quote:
          'Two Men and a Truck Oak Ridge handled our Clinton relocation professionally — on time, efficient, and careful with our belongings throughout Anderson County.',
        name: 'Patricia M.',
        location: 'Clinton, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Knoxville served our Oak Ridge lab-area move efficiently — professional crew with careful handling.',
        name: 'James R.',
        location: 'Oak Ridge, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Gouffon Moving confirmed Norris coverage and delivered reliable packing and loading with no surprise fees despite Knoxville-metro traffic.',
        name: 'Susan L.',
        location: 'Norris, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    robertson: [
      {
        quote:
          'Two Men and a Truck Springfield handled our White House relocation professionally — on time, efficient, and careful with our belongings throughout Robertson County.',
        name: 'Angela W.',
        location: 'White House, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Bellhop Nashville served our Springfield apartment move efficiently — professional crew with careful handling.',
        name: 'Chris P.',
        location: 'Springfield, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Fox Moving confirmed Greenbrier coverage and delivered reliable packing and loading with no surprise fees despite Nashville-metro traffic.',
        name: 'Diane H.',
        location: 'Greenbrier, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    greene: [
      {
        quote:
          'Two Men and a Truck Greeneville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Greene County.',
        name: 'Robert K.',
        location: 'Greeneville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving served our Greeneville-area move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Martha S.',
        location: 'Greeneville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Affordable Moving Tri-Cities confirmed coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Paul D.',
        location: 'Greeneville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    hamblen: [
      {
        quote:
          'Two Men and a Truck Morristown handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Hamblen County.',
        name: 'Teresa B.',
        location: 'Morristown, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Forward Moving served our Morristown industrial-area move efficiently — professional crew with careful handling.',
        name: 'David N.',
        location: 'Morristown, TN',
        rating: 5,
        moveType: 'Commercial',
      },
      {
        quote:
          'All My Sons Kingsport confirmed Morristown coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Janet F.',
        location: 'Morristown, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    cumberland: [
      {
        quote:
          'Two Men and a Truck Crossville handled our plateau relocation professionally — on time, efficient, and careful with our belongings throughout Cumberland County.',
        name: 'William C.',
        location: 'Crossville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Upper Cumberland Moving served our Crossville retirement-community move efficiently — professional and reliable.',
        name: 'Barbara J.',
        location: 'Crossville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Cookeville Moving Company confirmed Crossville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Richard M.',
        location: 'Crossville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    loudon: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Lenoir City relocation professionally — on time, efficient, and careful with our belongings throughout Loudon County.',
        name: 'Jennifer A.',
        location: 'Lenoir City, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Mighty Moving served our Tellico Village lakeside move efficiently — professional crew with careful handling.',
        name: 'Mark T.',
        location: 'Loudon, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Bellhop Knoxville confirmed Loudon coverage and delivered reliable packing and loading with no surprise fees despite Knoxville-metro traffic.',
        name: 'Carol E.',
        location: 'Lenoir City, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    coffee: [
      {
        quote:
          'Two Men and a Truck Manchester handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Coffee County.',
        name: 'Kevin S.',
        location: 'Manchester, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Tullahoma served our industrial-area move efficiently — professional crew with careful handling.',
        name: 'Laura B.',
        location: 'Tullahoma, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Manchester coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Gary H.',
        location: 'Manchester, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    tipton: [
      {
        quote:
          'Two Men and a Truck Memphis handled our Covington relocation professionally — on time, efficient, and careful with our belongings throughout Tipton County.',
        name: 'Sharon W.',
        location: 'Covington, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Memphis served our suburban move efficiently — professional crew with careful handling.',
        name: 'Tony L.',
        location: 'Covington, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Big League Movers confirmed Tipton County coverage and delivered reliable packing and loading with no surprise fees despite Memphis-metro traffic.',
        name: 'Nancy P.',
        location: 'Covington, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    jefferson: [
      {
        quote:
          'Two Men and a Truck Morristown handled our Dandridge relocation professionally — on time, efficient, and careful with our belongings throughout Jefferson County.',
        name: 'Helen G.',
        location: 'Dandridge, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Smokies Moving served our Jefferson City move efficiently — professional crew highly recommended for Douglas Lake-area relocations.',
        name: 'Edward R.',
        location: 'Jefferson City, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Knoxville confirmed Dandridge coverage and delivered reliable packing with no surprise fees.',
        name: 'Betty K.',
        location: 'Dandridge, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    hawkins: [
      {
        quote:
          'Two Men and a Truck Kingsport handled our Rogersville relocation professionally — on time, efficient, and careful with our belongings throughout Hawkins County.',
        name: 'Donna C.',
        location: 'Rogersville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving served our Rogersville-area move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Steve M.',
        location: 'Rogersville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Ferguson Moving confirmed Hawkins County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Karen R.',
        location: 'Rogersville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
  };

export function getTennesseeCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return tennesseeCountyTestimonials[countySlug] ?? [];
}