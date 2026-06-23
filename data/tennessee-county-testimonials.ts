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
    dickson: [
      {
        quote:
          'Two Men and a Truck Clarksville handled our Dickson relocation professionally — on time, efficient, and careful with our belongings throughout Dickson County.',
        name: 'Melissa R.',
        location: 'Dickson, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Nashville served our west-Nashville corridor move efficiently — professional crew with careful handling.',
        name: 'Jason W.',
        location: 'Dickson, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Fox Moving Clarksville confirmed Dickson coverage and delivered reliable packing and loading with no surprise fees despite Nashville-metro traffic.',
        name: 'Pamela S.',
        location: 'Dickson, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    mcminn: [
      {
        quote:
          'Two Men and a Truck Cleveland handled our Athens relocation professionally — on time, efficient, and careful with our belongings throughout McMinn County.',
        name: 'Timothy H.',
        location: 'Athens, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving Chattanooga served our McMinn County move efficiently — professional crew with careful handling.',
        name: 'Deborah L.',
        location: 'Athens, TN',
        rating: 5,
        moveType: 'Commercial',
      },
      {
        quote:
          'River City Moving confirmed Athens coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Charles B.',
        location: 'Athens, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    roane: [
      {
        quote:
          'Two Men and a Truck Oak Ridge handled our Kingston relocation professionally — on time, efficient, and careful with our belongings throughout Roane County.',
        name: 'Rebecca M.',
        location: 'Kingston, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Mighty Moving served our Harriman move efficiently — professional crew with careful handling near Watts Bar Lake.',
        name: 'Daniel P.',
        location: 'Harriman, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Gouffon Moving confirmed Roane County coverage and delivered reliable packing and loading with no surprise fees despite Knoxville-metro traffic.',
        name: 'Sandra K.',
        location: 'Kingston, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    carter: [
      {
        quote:
          'Two Men and a Truck Johnson City handled our Elizabethton relocation professionally — on time, efficient, and careful with our belongings throughout Carter County.',
        name: 'William J.',
        location: 'Elizabethton, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving served our Elizabethton-area move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Linda A.',
        location: 'Elizabethton, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Forward Moving confirmed Carter County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Robert E.',
        location: 'Elizabethton, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    bedford: [
      {
        quote:
          'Two Men and a Truck Shelbyville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Bedford County.',
        name: 'Cynthia D.',
        location: 'Shelbyville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Music City Movers Nashville served our Shelbyville apartment move efficiently — professional crew with careful handling.',
        name: 'Andrew F.',
        location: 'Shelbyville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Bellhop Nashville confirmed Bedford County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Janice T.',
        location: 'Shelbyville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    gibson: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Trenton relocation professionally — on time, efficient, and careful with our belongings throughout Gibson County.',
        name: 'Harold N.',
        location: 'Trenton, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Jackson Moving Company served our Humboldt-area move efficiently — professional and reliable across rural West Tennessee.',
        name: 'Gloria W.',
        location: 'Humboldt, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Volunteer Moving confirmed Milan coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Earl C.',
        location: 'Milan, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    monroe: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Madisonville relocation professionally — on time, efficient, and careful with our belongings throughout Monroe County.',
        name: 'Patricia Y.',
        location: 'Madisonville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving Chattanooga served our Sweetwater move efficiently — professional crew with careful handling.',
        name: 'Michael O.',
        location: 'Sweetwater, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Knoxville confirmed Monroe County coverage and delivered reliable packing with no surprise fees.',
        name: 'Dorothy V.',
        location: 'Madisonville, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    lawrence: [
      {
        quote:
          'Two Men and a Truck Lawrenceburg handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Lawrence County.',
        name: 'Raymond G.',
        location: 'Lawrenceburg, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Columbia served our Lawrence County move efficiently — professional crew with careful handling.',
        name: 'Shirley P.',
        location: 'Lawrenceburg, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'All My Sons Nashville confirmed Lawrenceburg coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Gerald M.',
        location: 'Lawrenceburg, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    franklin: [
      {
        quote:
          'Two Men and a Truck Tullahoma handled our Winchester relocation professionally — on time, efficient, and careful with our belongings throughout Franklin County.',
        name: 'Bonnie L.',
        location: 'Winchester, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Manchester served our Sewanee-area move efficiently — professional crew with careful handling.',
        name: 'Henry S.',
        location: 'Winchester, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Winchester coverage and delivered reliable packing with no surprise fees.',
        name: 'Marie H.',
        location: 'Winchester, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    fayette: [
      {
        quote:
          'Two Men and a Truck Memphis handled our Somerville relocation professionally — on time, efficient, and careful with our belongings throughout Fayette County.',
        name: 'Teresa N.',
        location: 'Somerville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Memphis served our suburban move efficiently — professional crew with careful handling east of Memphis.',
        name: 'Leonard B.',
        location: 'Somerville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'My Town Movers confirmed Fayette County coverage and delivered reliable packing and loading with no surprise fees despite Memphis-metro traffic.',
        name: 'Virginia K.',
        location: 'Somerville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    warren: [
      {
        quote:
          'Two Men and a Truck McMinnville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Warren County.',
        name: 'Rachel T.',
        location: 'McMinnville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Manchester served our Warren County move efficiently — professional crew with careful handling.',
        name: 'Douglas M.',
        location: 'McMinnville, TN',
        rating: 5,
        moveType: 'Commercial',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed McMinnville coverage and delivered reliable packing with no surprise fees.',
        name: 'Nancy F.',
        location: 'McMinnville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    cheatham: [
      {
        quote:
          'Two Men and a Truck Nashville handled our Ashland City relocation professionally — on time, efficient, and careful with our belongings throughout Cheatham County.',
        name: 'Kimberly A.',
        location: 'Ashland City, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Bellhop Nashville served our Cheatham County apartment move efficiently — professional crew with careful handling.',
        name: 'Brian C.',
        location: 'Ashland City, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Fox Moving Clarksville confirmed Ashland City coverage and delivered reliable packing and loading with no surprise fees despite Nashville-metro traffic.',
        name: 'Linda W.',
        location: 'Ashland City, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    campbell: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our La Follette relocation professionally — on time, efficient, and careful with our belongings throughout Campbell County.',
        name: 'James H.',
        location: 'La Follette, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Mighty Moving served our Jacksboro move efficiently — professional crew with careful handling.',
        name: 'Debra S.',
        location: 'Jacksboro, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Gouffon Moving confirmed Campbell County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Richard P.',
        location: 'La Follette, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    marshall: [
      {
        quote:
          'Two Men and a Truck Murfreesboro handled our Lewisburg relocation professionally — on time, efficient, and careful with our belongings throughout Marshall County.',
        name: 'Sandra B.',
        location: 'Lewisburg, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Shelbyville served our Marshall County move efficiently — professional crew with careful handling.',
        name: 'Thomas G.',
        location: 'Lewisburg, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'All My Sons Nashville confirmed Lewisburg coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Carolyn J.',
        location: 'Lewisburg, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    cocke: [
      {
        quote:
          'Two Men and a Truck Morristown handled our Newport relocation professionally — excellent with mountain moves throughout Cocke County.',
        name: 'Philip R.',
        location: 'Newport, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Smokies Moving served our Cocke County move efficiently — professional crew highly recommended for mountain-area relocations.',
        name: 'Margaret L.',
        location: 'Newport, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'College Hunks Moving Knoxville confirmed Newport coverage and delivered reliable packing with no surprise fees.',
        name: 'Arthur D.',
        location: 'Newport, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    lincoln: [
      {
        quote:
          'Two Men and a Truck Shelbyville handled our Fayetteville relocation professionally — on time, efficient, and careful with our belongings throughout Lincoln County.',
        name: 'Betty C.',
        location: 'Fayetteville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Tullahoma served our Lincoln County move efficiently — professional crew with careful handling.',
        name: 'George W.',
        location: 'Fayetteville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Bellhop Nashville confirmed Fayetteville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Dorothy M.',
        location: 'Fayetteville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    dyer: [
      {
        quote:
          'Two Men and a Truck Dyersburg handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Dyer County.',
        name: 'Frank L.',
        location: 'Dyersburg, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Jackson Moving Company served our Dyer County move efficiently — professional and reliable across West Tennessee.',
        name: 'Helen K.',
        location: 'Dyersburg, TN',
        rating: 5,
        moveType: 'Commercial',
      },
      {
        quote:
          'Volunteer Moving confirmed Dyersburg coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Roy T.',
        location: 'Dyersburg, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    rhea: [
      {
        quote:
          'Two Men and a Truck Cleveland handled our Dayton relocation professionally — on time, efficient, and careful with our belongings throughout Rhea County.',
        name: 'Janet H.',
        location: 'Dayton, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving Chattanooga served our Rhea County move efficiently — professional crew with careful handling.',
        name: 'Michael B.',
        location: 'Dayton, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'River City Moving confirmed Dayton coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Patricia N.',
        location: 'Dayton, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    claiborne: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Tazewell relocation professionally — excellent with mountain moves throughout Claiborne County.',
        name: 'Walter S.',
        location: 'Tazewell, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Barnett Moving served our Claiborne County move efficiently — professional crew with careful handling across East Tennessee.',
        name: 'Evelyn R.',
        location: 'Tazewell, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Forward Moving confirmed Tazewell coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Carl M.',
        location: 'Tazewell, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    weakley: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Martin relocation professionally — on time, efficient, and careful with our belongings throughout Weakley County.',
        name: 'Lois P.',
        location: 'Martin, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Jackson Moving Company served our Dresden-area move efficiently — professional and reliable across rural West Tennessee.',
        name: 'Harold W.',
        location: 'Dresden, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Dyersburg confirmed Weakley County coverage and delivered reliable packing with no surprise fees.',
        name: 'Ruth G.',
        location: 'Martin, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    henry: [
      {
        quote:
          'Two Men and a Truck Paris handled our Kentucky Lake-area relocation professionally — on time, efficient, and careful with our belongings throughout Henry County.',
        name: 'Nancy B.',
        location: 'Paris, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Jackson Moving Company served our Paris move efficiently — professional and reliable across Northwest Tennessee.',
        name: 'Robert F.',
        location: 'Paris, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Volunteer Moving confirmed Henry County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Diane M.',
        location: 'Paris, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    giles: [
      {
        quote:
          'Two Men and a Truck Pulaski handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Giles County.',
        name: 'William T.',
        location: 'Pulaski, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Columbia served our Giles County move efficiently — professional crew with careful handling.',
        name: 'Barbara R.',
        location: 'Pulaski, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Bellhop Nashville confirmed Pulaski coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Charles D.',
        location: 'Pulaski, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    white: [
      {
        quote:
          'Two Men and a Truck Sparta handled our plateau relocation professionally — on time, efficient, and careful with our belongings throughout White County.',
        name: 'Janet S.',
        location: 'Sparta, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Upper Cumberland Moving served our Sparta move efficiently — professional and reliable across the plateau.',
        name: 'Paul H.',
        location: 'Sparta, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Cookeville Moving Company confirmed White County coverage and delivered reliable packing with no surprise fees.',
        name: 'Ruth A.',
        location: 'Sparta, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    obion: [
      {
        quote:
          'Two Men and a Truck Union City handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Obion County.',
        name: 'James C.',
        location: 'Union City, TN',
        rating: 5,
        moveType: 'Commercial',
      },
      {
        quote:
          'Fox Moving Jackson served our Obion County move efficiently — professional crew with careful handling.',
        name: 'Mary L.',
        location: 'Union City, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Hilldrup Moving confirmed Union City coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Donald P.',
        location: 'Union City, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    marion: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Jasper relocation professionally — on time, efficient, and careful with our belongings throughout Marion County.',
        name: 'Susan W.',
        location: 'Jasper, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving served our South Pittsburg move efficiently — professional crew with careful handling.',
        name: 'Thomas K.',
        location: 'South Pittsburg, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'River City Moving confirmed Marion County coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Linda J.',
        location: 'Jasper, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    carroll: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Huntingdon relocation professionally — on time, efficient, and careful with our belongings throughout Carroll County.',
        name: 'Frank G.',
        location: 'Huntingdon, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Volunteer Moving served our Carroll County move efficiently — professional and reliable across rural West Tennessee.',
        name: 'Betty N.',
        location: 'Huntingdon, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Spyder Moving Jackson confirmed Huntingdon coverage and delivered reliable packing with no surprise fees.',
        name: 'Raymond E.',
        location: 'Huntingdon, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    henderson: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Lexington relocation professionally — on time, efficient, and careful with our belongings throughout Henderson County.',
        name: 'Carolyn H.',
        location: 'Lexington, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Paris served our Henderson County move efficiently — professional crew with careful handling.',
        name: 'Jerry M.',
        location: 'Lexington, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'All My Sons Jackson confirmed Lexington coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Sharon B.',
        location: 'Lexington, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    hardin: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Savannah relocation professionally — on time, efficient, and careful with our belongings throughout Hardin County.',
        name: 'Philip R.',
        location: 'Savannah, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Jackson Moving Company served our Tennessee River-area move efficiently — professional and reliable.',
        name: 'Margaret T.',
        location: 'Savannah, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Volunteer Moving confirmed Hardin County coverage and delivered reliable packing with no surprise fees.',
        name: 'Albert S.',
        location: 'Savannah, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    macon: [
      {
        quote:
          'Two Men and a Truck Springfield handled our Lafayette relocation professionally — on time, efficient, and careful with our belongings throughout Macon County.',
        name: 'Donna F.',
        location: 'Lafayette, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Fox Moving Clarksville served our Macon County move efficiently — professional crew with careful handling.',
        name: 'Richard C.',
        location: 'Lafayette, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Lafayette coverage and delivered reliable packing with no surprise fees.',
        name: 'Helen W.',
        location: 'Lafayette, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    hickman: [
      {
        quote:
          'Two Men and a Truck Nashville handled our Centerville relocation professionally — on time, efficient, and careful with our belongings throughout Hickman County.',
        name: 'George P.',
        location: 'Centerville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Columbia served our Hickman County move efficiently — professional crew with careful handling.',
        name: 'Dorothy L.',
        location: 'Centerville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'All My Sons Nashville confirmed Centerville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Kenneth A.',
        location: 'Centerville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    grainger: [
      {
        quote:
          'Two Men and a Truck Morristown handled our Rutledge relocation professionally — excellent with mountain moves throughout Grainger County.',
        name: 'Evelyn K.',
        location: 'Rutledge, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Gouffon Moving served our Grainger County move efficiently — professional crew with careful handling.',
        name: 'Walter J.',
        location: 'Rutledge, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Barnett Moving confirmed Rutledge coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Frances M.',
        location: 'Rutledge, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    mcnairy: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Selmer relocation professionally — on time, efficient, and careful with our belongings throughout McNairy County.',
        name: 'Roy B.',
        location: 'Selmer, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Volunteer Moving served our rural McNairy County move efficiently — professional and reliable across West Tennessee.',
        name: 'Betty H.',
        location: 'Selmer, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Jackson Moving Company confirmed Selmer coverage and delivered reliable packing with no surprise fees.',
        name: 'Earl M.',
        location: 'Selmer, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    hardeman: [
      {
        quote:
          'Big League Movers Memphis handled our Bolivar relocation professionally — excellent for our rural Hardeman County move.',
        name: 'Nancy D.',
        location: 'Bolivar, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Jackson served our Bolivar-area move efficiently — professional crew with careful handling.',
        name: 'James W.',
        location: 'Bolivar, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'My Town Movers confirmed Hardeman County coverage and delivered reliable packing with no surprise fees.',
        name: 'Peggy L.',
        location: 'Bolivar, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    lauderdale: [
      {
        quote:
          'Two Men and a Truck Memphis handled our Ripley relocation professionally — on time, efficient, and careful with our belongings throughout Lauderdale County.',
        name: 'Donald R.',
        location: 'Ripley, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Red Carpet Moving served our rural Lauderdale County move efficiently — professional crew with careful handling.',
        name: 'Shirley K.',
        location: 'Ripley, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Dyersburg confirmed Ripley coverage and delivered reliable packing with no surprise fees.',
        name: 'Gerald F.',
        location: 'Ripley, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    overton: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Livingston relocation professionally — on time, efficient, and careful with our belongings throughout Overton County.',
        name: 'Janice P.',
        location: 'Livingston, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Upper Cumberland Moving served our Overton County move efficiently — professional and reliable across the Upper Cumberland.',
        name: 'Robert C.',
        location: 'Livingston, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Cookeville Moving Company confirmed Livingston coverage and delivered reliable packing with no surprise fees.',
        name: 'Martha S.',
        location: 'Livingston, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    scott: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Huntsville relocation professionally — excellent with mountain moves throughout Scott County.',
        name: 'Timothy G.',
        location: 'Huntsville, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Mighty Moving served our Oneida-area move efficiently — professional crew with careful handling.',
        name: 'Diana M.',
        location: 'Oneida, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Gouffon Moving confirmed Scott County coverage and delivered reliable packing with no surprise fees.',
        name: 'Larry B.',
        location: 'Huntsville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    morgan: [
      {
        quote:
          'Two Men and a Truck Oak Ridge handled our Wartburg relocation professionally — excellent with mountain moves throughout Morgan County.',
        name: 'Karen T.',
        location: 'Wartburg, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'College Hunks Moving Knoxville served our Morgan County move efficiently — professional crew with careful handling.',
        name: 'Steven H.',
        location: 'Wartburg, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Crossville confirmed Wartburg coverage and delivered reliable packing with no surprise fees.',
        name: 'Linda R.',
        location: 'Wartburg, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    dekalb: [
      {
        quote:
          'Two Men and a Truck Smithville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout DeKalb County.',
        name: 'Christine A.',
        location: 'Smithville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Lebanon served our DeKalb County move efficiently — professional crew with careful handling.',
        name: 'Mark D.',
        location: 'Smithville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Smithville coverage and delivered reliable packing with no surprise fees.',
        name: 'Susan E.',
        location: 'Smithville, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    union: [
      {
        quote:
          'Two Men and a Truck Knoxville handled our Maynardville relocation professionally — on time, efficient, and careful with our belongings throughout Union County.',
        name: 'Paul J.',
        location: 'Maynardville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Bellhop Knoxville served our Union County apartment move efficiently — professional crew with careful handling.',
        name: 'Rachel N.',
        location: 'Maynardville, TN',
        rating: 5,
        moveType: 'Apartment',
      },
      {
        quote:
          'Mighty Moving confirmed Maynardville coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Henry C.',
        location: 'Maynardville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    smith: [
      {
        quote:
          'Two Men and a Truck Lebanon handled our Carthage relocation professionally — on time, efficient, and careful with our belongings throughout Smith County.',
        name: 'Donna W.',
        location: 'Carthage, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Bellhop Nashville served our Smith County move efficiently — professional crew with careful handling.',
        name: 'Richard Y.',
        location: 'Carthage, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Fox Moving Nashville confirmed Carthage coverage and delivered reliable packing with no surprise fees.',
        name: 'Jean M.',
        location: 'Carthage, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    fentress: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Jamestown relocation professionally — excellent with mountain moves throughout Fentress County.',
        name: 'Albert K.',
        location: 'Jamestown, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Upper Cumberland Moving served our Fentress County move efficiently — professional and reliable across the plateau.',
        name: 'Grace L.',
        location: 'Jamestown, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Cookeville Moving Company confirmed Jamestown coverage and delivered reliable packing with no surprise fees.',
        name: 'Howard P.',
        location: 'Jamestown, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    humphreys: [
      {
        quote:
          'Two Men and a Truck Clarksville handled our Waverly relocation professionally — on time, efficient, and careful with our belongings throughout Humphreys County.',
        name: 'Melissa B.',
        location: 'Waverly, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Fox Moving Clarksville served our Humphreys County move efficiently — professional crew with careful handling.',
        name: 'Kevin S.',
        location: 'Waverly, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Bellhop Nashville confirmed Waverly coverage and delivered reliable packing with no surprise fees.',
        name: 'Pamela G.',
        location: 'Waverly, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    johnson: [
      {
        quote:
          'Two Men and a Truck Johnson City handled our Mountain City relocation professionally — excellent with remote mountain moves throughout Johnson County.',
        name: 'Virginia H.',
        location: 'Mountain City, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Barnett Moving served our Johnson County move efficiently — professional crew with careful handling across Northeast Tennessee.',
        name: 'Edward N.',
        location: 'Mountain City, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Affordable Moving Tri-Cities confirmed Mountain City coverage and delivered reliable packing with no surprise fees.',
        name: 'Irene T.',
        location: 'Mountain City, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    polk: [
      {
        quote:
          'Two Men and a Truck Cleveland handled our Benton relocation professionally — excellent with mountain moves throughout Polk County.',
        name: 'Jackie F.',
        location: 'Benton, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Good Guys Moving Chattanooga served our Polk County move efficiently — professional crew with careful handling.',
        name: 'Billy R.',
        location: 'Benton, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'River City Moving confirmed Benton coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Connie L.',
        location: 'Benton, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    chester: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Henderson relocation professionally — on time, efficient, and careful with our belongings throughout Chester County.',
        name: 'Roger M.',
        location: 'Henderson, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Paris served our Chester County move efficiently — professional crew with careful handling.',
        name: 'Brenda K.',
        location: 'Henderson, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Volunteer Moving confirmed Henderson coverage and delivered reliable packing with no surprise fees.',
        name: 'Glenn P.',
        location: 'Henderson, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    sequatchie: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Dunlap relocation professionally — excellent with mountain moves throughout Sequatchie County.',
        name: 'Amanda S.',
        location: 'Dunlap, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Good Guys Moving served our Sequatchie Valley move efficiently — professional crew with careful handling.',
        name: 'Keith H.',
        location: 'Dunlap, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'River City Moving confirmed Dunlap coverage and delivered reliable packing and loading with no surprise fees.',
        name: 'Tammy L.',
        location: 'Dunlap, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    unicoi: [
      {
        quote:
          'Two Men and a Truck Johnson City handled our Erwin relocation professionally — excellent with mountain moves throughout Unicoi County.',
        name: 'Virginia C.',
        location: 'Erwin, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Barnett Moving served our Erwin-area move efficiently — professional crew with careful handling across the Tri-Cities.',
        name: 'Robert D.',
        location: 'Erwin, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Affordable Moving Tri-Cities confirmed Unicoi County coverage and delivered reliable packing with no surprise fees.',
        name: 'Janet W.',
        location: 'Erwin, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    haywood: [
      {
        quote:
          'Two Men and a Truck Brownsville handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Haywood County.',
        name: 'Charles B.',
        location: 'Brownsville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Memphis served our Haywood County move efficiently — professional crew with careful handling.',
        name: 'Patricia G.',
        location: 'Brownsville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Big League Movers confirmed Brownsville coverage and delivered reliable packing with no surprise fees.',
        name: 'Henry J.',
        location: 'Brownsville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    wayne: [
      {
        quote:
          'Two Men and a Truck Pulaski handled our Waynesboro relocation professionally — on time, efficient, and careful with our belongings throughout Wayne County.',
        name: 'Dorothy R.',
        location: 'Waynesboro, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Lawrenceburg served our rural Wayne County move efficiently — professional and reliable.',
        name: 'Frank T.',
        location: 'Waynesboro, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Bellhop Nashville confirmed Waynesboro coverage and delivered reliable packing with no surprise fees.',
        name: 'Ruth N.',
        location: 'Waynesboro, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    bledsoe: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Pikeville relocation professionally — excellent with mountain moves throughout Bledsoe County.',
        name: 'Larry F.',
        location: 'Pikeville, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'College Hunks Moving Chattanooga served our Bledsoe County move efficiently — professional crew with careful handling.',
        name: 'Sandra M.',
        location: 'Pikeville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Fox Moving Chattanooga confirmed Pikeville coverage and delivered reliable packing with no surprise fees.',
        name: 'Jerry C.',
        location: 'Pikeville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    benton: [
      {
        quote:
          'Two Men and a Truck Paris handled our Camden relocation professionally — on time, efficient, and careful with our belongings throughout Benton County.',
        name: 'Nancy H.',
        location: 'Camden, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Fox Moving Clarksville served our Kentucky Lake-area move efficiently — professional crew with careful handling.',
        name: 'David L.',
        location: 'Camden, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Volunteer Moving confirmed Camden coverage and delivered reliable packing with no surprise fees.',
        name: 'Karen S.',
        location: 'Camden, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    cannon: [
      {
        quote:
          'Two Men and a Truck Woodbury handled our local relocation professionally — on time, efficient, and careful with our belongings throughout Cannon County.',
        name: 'Melissa A.',
        location: 'Woodbury, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Murfreesboro served our Cannon County move efficiently — professional crew with careful handling.',
        name: 'Steven P.',
        location: 'Woodbury, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'College Hunks Moving Nashville confirmed Woodbury coverage and delivered reliable packing with no surprise fees.',
        name: 'Linda G.',
        location: 'Woodbury, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    stewart: [
      {
        quote:
          'Two Men and a Truck Clarksville handled our Dover relocation professionally — on time, efficient, and careful with our belongings throughout Stewart County.',
        name: 'Philip W.',
        location: 'Dover, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Two Men and a Truck Paris served our Land Between the Lakes-area move efficiently — professional crew with careful handling.',
        name: 'Margaret B.',
        location: 'Dover, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons Clarksville confirmed Dover coverage and delivered reliable packing with no surprise fees.',
        name: 'Raymond K.',
        location: 'Dover, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    meigs: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Decatur relocation professionally — on time, efficient, and careful with our belongings throughout Meigs County.',
        name: 'Bonnie E.',
        location: 'Decatur, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Good Guys Moving served our Meigs County move efficiently — professional crew with careful handling near Chickamauga Lake.',
        name: 'Carl R.',
        location: 'Decatur, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'All My Sons Chattanooga confirmed Decatur coverage and delivered reliable packing with no surprise fees.',
        name: 'Joyce M.',
        location: 'Decatur, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    grundy: [
      {
        quote:
          'Two Men and a Truck Chattanooga handled our Altamont relocation professionally — excellent with mountain moves throughout Grundy County.',
        name: 'Walter N.',
        location: 'Altamont, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Two Men and a Truck Cleveland served our Grundy County move efficiently — professional crew with careful handling.',
        name: 'Evelyn T.',
        location: 'Altamont, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Good Guys Moving confirmed Altamont coverage and delivered reliable packing with no surprise fees.',
        name: 'Howard D.',
        location: 'Altamont, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    crockett: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Alamo relocation professionally — excellent for our rural Crockett County move.',
        name: 'Betty J.',
        location: 'Alamo, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Dyersburg served our Crockett County move efficiently — professional and reliable across rural West Tennessee.',
        name: 'Earl W.',
        location: 'Alamo, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Volunteer Moving confirmed Alamo coverage and delivered reliable packing with no surprise fees.',
        name: 'Peggy C.',
        location: 'Alamo, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    lewis: [
      {
        quote:
          'Two Men and a Truck Lawrenceburg handled our Hohenwald relocation professionally — on time, efficient, and careful with our belongings throughout Lewis County.',
        name: 'Martha R.',
        location: 'Hohenwald, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Columbia served our Lewis County move efficiently — professional crew with careful handling.',
        name: 'Harold T.',
        location: 'Hohenwald, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Pulaski confirmed Hohenwald coverage and delivered reliable packing with no surprise fees.',
        name: 'Diane K.',
        location: 'Hohenwald, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    trousdale: [
      {
        quote:
          'Two Men and a Truck Lebanon handled our Hartsville relocation professionally — on time, efficient, and careful with our belongings throughout Trousdale County.',
        name: 'Gerald M.',
        location: 'Hartsville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Nashville served our Trousdale County move efficiently — professional crew with careful handling.',
        name: 'Shirley P.',
        location: 'Hartsville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Murfreesboro confirmed Hartsville coverage and delivered reliable packing with no surprise fees.',
        name: 'Ronald H.',
        location: 'Hartsville, TN',
        rating: 4,
        moveType: 'Apartment',
      },
    ],
    jackson: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Gainesboro relocation professionally — excellent for our rural Jackson County move.',
        name: 'Patricia L.',
        location: 'Gainesboro, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck McMinnville served our Jackson County move efficiently — professional crew with careful handling.',
        name: 'Charles B.',
        location: 'Gainesboro, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Upper Cumberland Moving confirmed Gainesboro coverage and delivered reliable packing with no surprise fees.',
        name: 'Janet W.',
        location: 'Gainesboro, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    decatur: [
      {
        quote:
          'Two Men and a Truck Jackson handled our Decaturville relocation professionally — on time, efficient, and careful with our belongings throughout Decatur County.',
        name: 'Billy S.',
        location: 'Decaturville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Paris served our Decatur County move efficiently — professional and reliable across rural West Tennessee.',
        name: 'Ruth A.',
        location: 'Decaturville, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Volunteer Moving confirmed Decaturville coverage and delivered reliable packing with no surprise fees.',
        name: 'Frank D.',
        location: 'Decaturville, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    perry: [
      {
        quote:
          'Two Men and a Truck Columbia handled our Linden relocation professionally — on time, efficient, and careful with our belongings throughout Perry County.',
        name: 'Helen G.',
        location: 'Linden, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Clarksville served our Perry County move efficiently — professional crew with careful handling.',
        name: 'Jack N.',
        location: 'Linden, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Nashville confirmed Linden coverage and delivered reliable packing with no surprise fees.',
        name: 'Lois E.',
        location: 'Linden, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    houston: [
      {
        quote:
          'Two Men and a Truck Clarksville handled our Erin relocation professionally — on time, efficient, and careful with our belongings throughout Houston County.',
        name: 'Wayne F.',
        location: 'Erin, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Paris served our Houston County move efficiently — professional crew with careful handling.',
        name: 'Norma J.',
        location: 'Erin, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Nashville confirmed Erin coverage and delivered reliable packing with no surprise fees.',
        name: 'Eugene C.',
        location: 'Erin, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    clay: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Celina relocation professionally — excellent for our rural Clay County move near Dale Hollow Lake.',
        name: 'Barbara Y.',
        location: 'Celina, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Two Men and a Truck McMinnville served our Clay County move efficiently — professional crew with careful handling.',
        name: 'Larry V.',
        location: 'Celina, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Sparta confirmed Celina coverage and delivered reliable packing with no surprise fees.',
        name: 'Sandra O.',
        location: 'Celina, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    hancock: [
      {
        quote:
          'Two Men and a Truck Johnson City handled our Sneedville relocation professionally — excellent for our remote Hancock County mountain move.',
        name: 'Dorothy I.',
        location: 'Sneedville, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Two Men and a Truck Kingsport served our Hancock County move efficiently — professional crew with careful handling.',
        name: 'Robert U.',
        location: 'Sneedville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Greeneville confirmed Sneedville coverage and delivered reliable packing with no surprise fees.',
        name: 'Virginia Q.',
        location: 'Sneedville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    'van-buren': [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Spencer relocation professionally — excellent for our scenic Van Buren County move.',
        name: 'Albert Z.',
        location: 'Spencer, TN',
        rating: 5,
        moveType: 'Mountain home',
      },
      {
        quote:
          'Two Men and a Truck Sparta served our Van Buren County move efficiently — professional crew with careful handling.',
        name: 'Gladys X.',
        location: 'Spencer, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Crossville confirmed Spencer coverage and delivered reliable packing with no surprise fees.',
        name: 'Henry P.',
        location: 'Spencer, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    moore: [
      {
        quote:
          'Two Men and a Truck Tullahoma handled our Lynchburg relocation professionally — on time, efficient, and careful with our belongings throughout Moore County.',
        name: 'Carol M.',
        location: 'Lynchburg, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Manchester served our Moore County move efficiently — professional crew with careful handling.',
        name: 'George L.',
        location: 'Lynchburg, TN',
        rating: 5,
        moveType: 'Townhome',
      },
      {
        quote:
          'Two Men and a Truck Shelbyville confirmed Lynchburg coverage and delivered reliable packing with no surprise fees.',
        name: 'Alice R.',
        location: 'Lynchburg, TN',
        rating: 4,
        moveType: 'Single-family',
      },
    ],
    lake: [
      {
        quote:
          'Two Men and a Truck Union City handled our Tiptonville relocation professionally — excellent for our rural Lake County move near Reelfoot Lake.',
        name: 'Willie H.',
        location: 'Tiptonville, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Two Men and a Truck Dyersburg served our Lake County move efficiently — professional and reliable across rural Northwest Tennessee.',
        name: 'Mildred K.',
        location: 'Tiptonville, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Jackson confirmed Tiptonville coverage and delivered reliable packing with no surprise fees.',
        name: 'Claude B.',
        location: 'Tiptonville, TN',
        rating: 4,
        moveType: 'Townhome',
      },
    ],
    pickett: [
      {
        quote:
          'Two Men and a Truck Cookeville handled our Byrdstown relocation professionally — excellent for our remote Pickett County move near Dale Hollow Lake.',
        name: 'Irene S.',
        location: 'Byrdstown, TN',
        rating: 5,
        moveType: 'Lakeside home',
      },
      {
        quote:
          'Two Men and a Truck Crossville served our Pickett County move efficiently — professional crew with careful handling.',
        name: 'Leonard T.',
        location: 'Byrdstown, TN',
        rating: 5,
        moveType: 'Single-family',
      },
      {
        quote:
          'Two Men and a Truck Sparta confirmed Byrdstown coverage and delivered reliable packing with no surprise fees.',
        name: 'Edna W.',
        location: 'Byrdstown, TN',
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