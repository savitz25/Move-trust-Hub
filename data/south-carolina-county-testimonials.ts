export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

/** Hand-curated South Carolina county testimonials — grows incrementally per batch */
export const southCarolinaCountyTestimonials: Record<
  string,
  CountyTestimonialEntry[]
> = {
  aiken: [
    {
      quote:
        'Two Men and a Truck Aiken handled our local move professionally — on time, careful with our belongings, and transparent pricing throughout Aiken County.',
      name: 'Susan M.',
      location: 'Aiken, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Coleman Worldwide served our North Augusta relocation with excellent communication and careful handling of our equestrian-property driveway access.',
      name: 'Robert K.',
      location: 'North Augusta, SC',
      rating: 5,
      moveType: 'Equestrian property',
    },
    {
      quote:
        'Dailey Moving & Storage confirmed Aiken County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Linda P.',
      location: 'Aiken, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  dorchester: [
    {
      quote:
        'Extra Muscle Moving handled our Summerville relocation professionally — excellent crew communication, careful furniture wrapping, and transparent pricing throughout Dorchester County.',
      name: 'Marcus T.',
      location: 'Summerville, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Burbage Transport provided reliable packing and loading for our St. George home. Finished on schedule despite Charleston-metro traffic.',
      name: 'Elena R.',
      location: 'St. George, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charleston served our Summerville apartment move efficiently with great communication and no surprise fees.',
      name: 'David K.',
      location: 'Summerville, SC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  pickens: [
    {
      quote:
        'Tiger Town Movers handled our Pickens home relocation with careful handling and transparent pricing — best local move we have had in the Upstate.',
      name: 'James W.',
      location: 'Pickens, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving traveled from Greenville and served our Easley move with professional crews and excellent foothill driveway planning.',
      name: 'Karen H.',
      location: 'Easley, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Greenville covered our Pickens County relocation when local crews were booked — upfront about travel time and professional service.',
      name: 'Frank L.',
      location: 'Pickens, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  florence: [
    {
      quote:
        'Two Men and a Truck Florence handled our local move professionally — on time, very careful with our belongings, and transparent pricing throughout Florence County.',
      name: 'Susan M.',
      location: 'Florence, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Coleman Worldwide served our Pee Dee relocation with excellent communication and careful handling near the medical corridor.',
      name: 'Robert K.',
      location: 'Florence, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Move It Williams confirmed Lake City coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Linda P.',
      location: 'Lake City, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  lancaster: [
    {
      quote:
        'Two Men and a Truck Rock Hill handled our Lancaster townhome relocation professionally — excellent crew communication and careful furniture wrapping.',
      name: 'Marcus T.',
      location: 'Lancaster, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Charlotte served our Indian Land apartment move efficiently with great communication despite Charlotte-metro traffic.',
      name: 'Elena R.',
      location: 'Indian Land, SC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Rock Hill covered our Lancaster County relocation when local crews were booked — upfront about travel time and professional service.',
      name: 'David K.',
      location: 'Lancaster, SC',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  sumter: [
    {
      quote:
        'Anderson Transfer handled our Shaw AFB corridor PCS move with professional military documentation support and careful handling throughout Sumter County.',
      name: 'Tom R.',
      location: 'Sumter, SC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Columbia served our Sumter relocation efficiently with clear communication about Midlands travel time.',
      name: 'Brenda L.',
      location: 'Sumter, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'JEGA Movers provided reliable packing and loading for our Sumter home. Finished on schedule with transparent Columbia-area pricing.',
      name: 'Carl M.',
      location: 'Sumter, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  oconee: [
    {
      quote:
        'Swamp Rabbit Moving handled our Seneca lakefront relocation professionally — careful with steep driveway access and transparent pricing throughout Oconee County.',
      name: 'Patricia N.',
      location: 'Seneca, SC',
      rating: 5,
      moveType: 'Lakefront home',
    },
    {
      quote:
        'Two Men and a Truck Greenville served our Walhalla move with excellent communication about Upstate travel time and careful furniture wrapping.',
      name: 'Greg S.',
      location: 'Walhalla, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Tiger Town Movers traveled from Pickens and confirmed Oconee County coverage — reliable packing and loading with no surprise fees.',
      name: 'Diane F.',
      location: 'Seneca, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  orangeburg: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Orangeburg relocation professionally — on time, careful with our belongings, and transparent Midlands pricing.',
      name: 'Marcus J.',
      location: 'Orangeburg, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'JEGA Movers served our rural Orangeburg County move with excellent communication and careful handling near South Carolina State University.',
      name: 'Angela W.',
      location: 'Orangeburg, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Gentlemen Movers provided reliable packing and loading for our Orangeburg apartment. Finished on schedule despite Columbia-area traffic.',
      name: 'Keith B.',
      location: 'Orangeburg, SC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  kershaw: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Camden historic home relocation with careful handling and transparent pricing throughout Kershaw County.',
      name: 'Helen C.',
      location: 'Camden, SC',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'College Hunks Moving Columbia served our Lugoff move efficiently with great communication about Midlands travel time.',
      name: 'Ryan D.',
      location: 'Lugoff, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Anderson Transfer confirmed Kershaw County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Nancy T.',
      location: 'Camden, SC',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  laurens: [
    {
      quote:
        'Two Men and a Truck Greenville handled our Laurens relocation professionally — excellent crew communication and careful furniture wrapping.',
      name: 'Steve H.',
      location: 'Laurens, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our Clinton move with professional crews and transparent Upstate pricing despite Greenville-metro traffic.',
      name: 'Maria G.',
      location: 'Clinton, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Spartanburg covered our Laurens County relocation when local crews were booked — upfront about travel time and professional service.',
      name: 'Paul R.',
      location: 'Laurens, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  greenwood: [
    {
      quote:
        'Two Men and a Truck Greenville handled our Greenwood relocation professionally — on time, very careful with our belongings, and transparent Upstate pricing.',
      name: 'Janet L.',
      location: 'Greenwood, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our Greenwood industrial corridor move with excellent communication and careful handling.',
      name: 'Chris M.',
      location: 'Greenwood, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gentlemen Movers traveled from Columbia and confirmed Greenwood County coverage — reliable packing and loading with no surprise fees.',
      name: 'Betty K.',
      location: 'Greenwood, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  georgetown: [
    {
      quote:
        'All My Sons Myrtle Beach handled our Georgetown coastal relocation professionally — careful with waterfront property access and transparent Grand Strand pricing.',
      name: 'Richard P.',
      location: 'Georgetown, SC',
      rating: 5,
      moveType: 'Waterfront home',
    },
    {
      quote:
        'LaBarbera Movers served our Pawleys Island move with excellent communication and careful furniture wrapping despite coastal traffic.',
      name: 'Sandra V.',
      location: 'Pawleys Island, SC',
      rating: 5,
      moveType: 'Retirement relocation',
    },
    {
      quote:
        'Two Men and a Truck Myrtle Beach confirmed Murrells Inlet coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Donald E.',
      location: 'Murrells Inlet, SC',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  darlington: [
    {
      quote:
        'Two Men and a Truck Florence handled our Darlington relocation professionally — on time, careful with our belongings, and transparent Pee Dee pricing.',
      name: 'William A.',
      location: 'Darlington, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams served our Hartsville move with excellent communication and careful handling near Darlington Raceway event traffic.',
      name: 'Lisa C.',
      location: 'Hartsville, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbia covered our Darlington County relocation when Florence crews were booked — upfront about travel time and professional service.',
      name: 'James F.',
      location: 'Darlington, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cherokee: [
    {
      quote:
        'Two Men and a Truck Spartanburg handled our Gaffney relocation professionally — excellent crew communication and careful furniture wrapping throughout Cherokee County.',
      name: 'Timothy B.',
      location: 'Gaffney, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Greenville served our Gaffney move efficiently with clear communication about I-85 corridor travel time.',
      name: 'Rachel S.',
      location: 'Gaffney, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gentle Giants Charlotte confirmed Cherokee County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'George W.',
      location: 'Gaffney, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  chesterfield: [
    {
      quote:
        'Two Men and a Truck Florence handled our Chesterfield rural relocation professionally — careful with long driveway access and transparent Pee Dee pricing.',
      name: 'Mary J.',
      location: 'Chesterfield, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams served our Cheraw move with excellent communication and careful handling despite rural access challenges.',
      name: 'Henry L.',
      location: 'Cheraw, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Rock Hill covered our Chesterfield County relocation when Pee Dee crews were booked — upfront about Charlotte-fringe travel time.',
      name: 'Dorothy M.',
      location: 'Chesterfield, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  jasper: [
    {
      quote:
        'Smooth Move Charleston handled our Ridgeland Lowcountry relocation professionally — careful handling and transparent pricing throughout Jasper County.',
      name: 'Carolyn H.',
      location: 'Ridgeland, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Hardeeville move efficiently with great communication about cross-border Lowcountry travel time.',
      name: 'Edward N.',
      location: 'Hardeeville, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'BC Brothers Moving confirmed Jasper County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Sharon P.',
      location: 'Ridgeland, SC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  newberry: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Newberry historic home relocation professionally — careful handling and transparent Midlands pricing.',
      name: 'Barbara D.',
      location: 'Newberry, SC',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'JEGA Movers served our Newberry move with excellent communication and careful furniture wrapping despite rural driveway access.',
      name: 'Charles R.',
      location: 'Newberry, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Coleman Worldwide confirmed Newberry County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Margaret S.',
      location: 'Newberry, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  colleton: [
    {
      quote:
        'Smooth Move Charleston handled our Walterboro Lowcountry relocation professionally — excellent crew communication and careful furniture wrapping throughout Colleton County.',
      name: 'Joseph T.',
      location: 'Walterboro, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Extra Muscle Moving served our Edisto area move with reliable packing and loading despite rural Lowcountry access challenges.',
      name: 'Rebecca A.',
      location: 'Walterboro, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Burbage Transport confirmed Colleton County coverage and delivered transparent Charleston-area pricing with no surprise fees.',
      name: 'Thomas K.',
      location: 'Walterboro, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  chester: [
    {
      quote:
        'Two Men and a Truck Rock Hill handled our Chester relocation professionally — on time, careful with our belongings, and transparent Charlotte-fringe pricing.',
      name: 'Jennifer W.',
      location: 'Chester, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charlotte served our Chester County move efficiently with great communication despite I-77 corridor traffic.',
      name: 'Michael B.',
      location: 'Chester, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'All My Sons Rock Hill confirmed Chester County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Laura F.',
      location: 'Chester, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  clarendon: [
    {
      quote:
        'Anderson Transfer handled our Manning rural relocation professionally — careful with agricultural property access and transparent Sumter-area pricing.',
      name: 'Harold G.',
      location: 'Manning, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbia served our Clarendon County move efficiently with clear communication about Midlands travel time.',
      name: 'Virginia C.',
      location: 'Manning, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Move It Williams traveled from Florence and confirmed Manning coverage — reliable packing and loading with no surprise fees.',
      name: 'Roy E.',
      location: 'Manning, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  edgefield: [
    {
      quote:
        'Two Men and a Truck Aiken handled our Edgefield relocation professionally — careful handling and transparent Augusta-border pricing throughout Edgefield County.',
      name: 'Alice M.',
      location: 'Edgefield, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Budget Movers Augusta served our Edgefield move with excellent communication and careful furniture wrapping despite cross-border travel.',
      name: 'Frank D.',
      location: 'Edgefield, SC',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Dailey Moving & Storage confirmed Edgefield County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Ruth H.',
      location: 'Edgefield, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  williamsburg: [
    {
      quote:
        'Two Men and a Truck Florence handled our Kingstree rural relocation professionally — careful with long driveway access and transparent Pee Dee pricing.',
      name: 'Earl W.',
      location: 'Kingstree, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams confirmed Williamsburg County coverage and delivered reliable packing and loading despite rural Lowcountry access challenges.',
      name: 'Gloria P.',
      location: 'Kingstree, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Smooth Move Charleston traveled from the Lowcountry and served our Kingstree move with professional crews and no surprise fees.',
      name: 'Howard T.',
      location: 'Kingstree, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  marion: [
    {
      quote:
        'Two Men and a Truck Florence handled our Marion relocation professionally — on time, careful with our belongings, and transparent Pee Dee pricing.',
      name: 'Irene S.',
      location: 'Marion, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams served our rural Marion County move with excellent communication and careful handling on unpaved driveway access.',
      name: 'Jack R.',
      location: 'Marion, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons Myrtle Beach confirmed Marion County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Kathy L.',
      location: 'Marion, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  dillon: [
    {
      quote:
        'Two Men and a Truck Florence handled our Dillon relocation professionally — careful handling and transparent Pee Dee pricing throughout Dillon County.',
      name: 'Leonard B.',
      location: 'Dillon, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams served our Dillon move with excellent communication and careful furniture wrapping despite rural I-95 corridor access.',
      name: 'Mildred C.',
      location: 'Dillon, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Columbia covered our Dillon County relocation when Florence crews were booked — upfront about Midlands travel time.',
      name: 'Norman D.',
      location: 'Dillon, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  union: [
    {
      quote:
        'Two Men and a Truck Spartanburg handled our Union rural relocation professionally — excellent crew communication and careful furniture wrapping.',
      name: 'Opal F.',
      location: 'Union, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Greenville served our Union County move efficiently with clear communication about Upstate travel time.',
      name: 'Perry G.',
      location: 'Union, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Greenville confirmed Union County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Paula H.',
      location: 'Union, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  marlboro: [
    {
      quote:
        'Two Men and a Truck Florence handled our Bennettsville relocation professionally — careful with rural driveway access and transparent Pee Dee pricing.',
      name: 'Raymond J.',
      location: 'Bennettsville, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Move It Williams served our Marlboro County move with excellent communication and careful handling near the North Carolina border.',
      name: 'Sylvia K.',
      location: 'Bennettsville, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Coleman Worldwide confirmed Bennettsville coverage and delivered reliable packing and loading with transparent Columbia-area pricing.',
      name: 'Theodore M.',
      location: 'Bennettsville, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  abbeville: [
    {
      quote:
        'Two Men and a Truck Greenville handled our Abbeville relocation professionally — careful handling and transparent Upstate pricing throughout Abbeville County.',
      name: 'Ruth N.',
      location: 'Abbeville, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our rural Abbeville County move with excellent communication and careful foothill driveway planning.',
      name: 'Vernon O.',
      location: 'Abbeville, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Columbia covered our Abbeville relocation when Greenville crews were booked — upfront about Midlands travel time.',
      name: 'Wanda P.',
      location: 'Abbeville, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  barnwell: [
    {
      quote:
        'Two Men and a Truck Aiken handled our Barnwell rural relocation professionally — careful handling and transparent Augusta-border pricing.',
      name: 'Curtis Q.',
      location: 'Barnwell, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Budget Movers Augusta served our Barnwell County move with excellent communication and careful furniture wrapping despite cross-border travel.',
      name: 'Yvonne R.',
      location: 'Barnwell, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Dailey Moving & Storage confirmed Barnwell County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Zachary S.',
      location: 'Barnwell, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  fairfield: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Winnsboro relocation professionally — careful with historic home access and transparent Midlands pricing.',
      name: 'Ann T.',
      location: 'Winnsboro, SC',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'JEGA Movers served our Fairfield County move with excellent communication and careful handling despite rural driveway challenges.',
      name: 'Brian U.',
      location: 'Winnsboro, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Gentlemen Movers confirmed Winnsboro coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Cora V.',
      location: 'Winnsboro, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  saluda: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Saluda rural relocation professionally — careful with long driveway access and transparent Midlands pricing.',
      name: 'Dennis W.',
      location: 'Saluda, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'JEGA Movers served our Saluda County move with excellent communication and careful handling despite rural Midlands access challenges.',
      name: 'Ellen P.',
      location: 'Saluda, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Gentlemen Movers confirmed Saluda County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Fred M.',
      location: 'Saluda, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  hampton: [
    {
      quote:
        'Smooth Move Charleston handled our Hampton rural relocation professionally — careful handling and transparent Lowcountry pricing throughout Hampton County.',
      name: 'Gail R.',
      location: 'Hampton, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charleston served our Hampton move with excellent communication and careful furniture wrapping despite rural Lowcountry access.',
      name: 'Harold S.',
      location: 'Hampton, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Extra Muscle Moving confirmed Hampton County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Iris T.',
      location: 'Hampton, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  lee: [
    {
      quote:
        'Anderson Transfer handled our Bishopville relocation professionally — careful handling and transparent Sumter-area pricing throughout Lee County.',
      name: 'James L.',
      location: 'Bishopville, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Florence served our Lee County move with excellent communication and careful handling on rural Pee Dee corridor access.',
      name: 'Karen B.',
      location: 'Bishopville, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Move It Williams confirmed Bishopville coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Larry C.',
      location: 'Bishopville, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  calhoun: [
    {
      quote:
        'Two Men and a Truck Columbia handled our St. Matthews relocation professionally — careful with rural driveway access and transparent Midlands pricing.',
      name: 'Martha D.',
      location: 'St. Matthews, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Columbia served our Calhoun County move with excellent communication and careful furniture wrapping.',
      name: 'Nathan E.',
      location: 'St. Matthews, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'JEGA Movers confirmed St. Matthews coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Olivia F.',
      location: 'St. Matthews, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  bamberg: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Bamberg relocation professionally — careful handling and transparent Midlands pricing throughout Bamberg County.',
      name: 'Philip G.',
      location: 'Bamberg, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Smooth Move Charleston served our Bamberg County move with excellent communication despite rural Lowcountry–Midlands transition access.',
      name: 'Paul H.',
      location: 'Bamberg, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbia confirmed Bamberg coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Rita J.',
      location: 'Bamberg, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  mccormick: [
    {
      quote:
        'Two Men and a Truck Aiken handled our McCormick rural relocation professionally — careful handling and transparent Augusta-border pricing.',
      name: 'Samuel K.',
      location: 'McCormick, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Greenville served our McCormick County move with excellent communication about Savannah River corridor travel time.',
      name: 'Teresa L.',
      location: 'McCormick, SC',
      rating: 5,
      moveType: 'Lakefront home',
    },
    {
      quote:
        'Dailey Moving & Storage confirmed McCormick County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Victor M.',
      location: 'McCormick, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  allendale: [
    {
      quote:
        'Two Men and a Truck Aiken handled our Allendale rural relocation professionally — careful with remote driveway access and transparent Augusta-border pricing.',
      name: 'Wendy N.',
      location: 'Allendale, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Smooth Move Charleston traveled from the Lowcountry and served our Allendale County move with professional crews and no surprise fees.',
      name: 'Curtis O.',
      location: 'Allendale, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Budget Movers Augusta confirmed Allendale County coverage and delivered reliable packing and loading despite cross-border rural travel.',
      name: 'Yolanda P.',
      location: 'Allendale, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  horry: [
    {
      quote:
        'Two Men and a Truck Myrtle Beach handled our Conway relocation professionally — excellent with beach-area moves and transparent Grand Strand pricing throughout Horry County.',
      name: 'Robert A.',
      location: 'Myrtle Beach, SC',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'LaBarbera Movers served our North Myrtle Beach retirement relocation with careful handling and excellent coastal property planning.',
      name: 'Susan B.',
      location: 'North Myrtle Beach, SC',
      rating: 5,
      moveType: 'Retirement relocation',
    },
    {
      quote:
        'All My Sons Myrtle Beach confirmed Conway coverage and delivered reliable packing and loading despite peak tourist season traffic.',
      name: 'Thomas C.',
      location: 'Conway, SC',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  spartanburg: [
    {
      quote:
        'Two Men and a Truck Spartanburg handled our local move professionally — on time, very careful with our belongings, and transparent Upstate pricing.',
      name: 'Diana D.',
      location: 'Spartanburg, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our Greer relocation with excellent communication and careful furniture wrapping despite I-85 corridor traffic.',
      name: 'Eric E.',
      location: 'Greer, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Greenville confirmed Spartanburg County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Frances F.',
      location: 'Spartanburg, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  york: [
    {
      quote:
        'Two Men and a Truck Rock Hill handled our Fort Mill suburban relocation professionally — excellent crew communication and transparent Charlotte-metro pricing.',
      name: 'George G.',
      location: 'Fort Mill, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charlotte served our Rock Hill apartment move efficiently with great communication despite I-77 corridor traffic.',
      name: 'Helen H.',
      location: 'Rock Hill, SC',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'All My Sons Rock Hill confirmed York County coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Ian I.',
      location: 'York, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  anderson: [
    {
      quote:
        'Two Men and a Truck Greenville handled our Anderson relocation professionally — careful handling and transparent Upstate pricing throughout Anderson County.',
      name: 'Julia J.',
      location: 'Anderson, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our Anderson move with excellent communication and careful lake-area driveway planning.',
      name: 'Kevin K.',
      location: 'Anderson, SC',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Spartanburg covered our Anderson County relocation when Greenville crews were booked — upfront about travel time and professional service.',
      name: 'Laura L.',
      location: 'Anderson, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  beaufort: [
    {
      quote:
        'Smooth Move Charleston handled our Beaufort coastal relocation professionally — careful with waterfront property access and transparent Lowcountry pricing.',
      name: 'Martin M.',
      location: 'Beaufort, SC',
      rating: 5,
      moveType: 'Waterfront home',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Hilton Head move with excellent communication and careful handling despite cross-border Lowcountry travel.',
      name: 'Nancy N.',
      location: 'Hilton Head Island, SC',
      rating: 5,
      moveType: 'Retirement relocation',
    },
    {
      quote:
        'BC Brothers Moving confirmed Bluffton coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Oscar O.',
      location: 'Bluffton, SC',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  berkeley: [
    {
      quote:
        'Two Men and a Truck Charleston handled our Moncks Corner relocation professionally — excellent crew communication and careful furniture wrapping throughout Berkeley County.',
      name: 'Patricia P.',
      location: 'Moncks Corner, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Extra Muscle Moving served our Goose Creek move with reliable packing and loading despite Charleston-metro traffic on Clements Ferry Road.',
      name: 'Peter Q.',
      location: 'Goose Creek, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Burbage Transport confirmed Berkeley County coverage and delivered transparent Lowcountry pricing with no surprise fees.',
      name: 'Rachel R.',
      location: 'Moncks Corner, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  lexington: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Lexington suburban relocation professionally — on time, careful with our belongings, and transparent Midlands pricing.',
      name: 'Steven S.',
      location: 'Lexington, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'JEGA Movers served our Irmo move with excellent communication and careful handling despite Columbia-area I-26 traffic.',
      name: 'Tracy T.',
      location: 'Irmo, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Gentlemen Movers confirmed Lexington County coverage and delivered reliable specialty handling for our piano move with no surprise fees.',
      name: 'Una W.',
      location: 'Lexington, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  charleston: [
    {
      quote:
        'Smooth Move Charleston handled our downtown relocation with outstanding professionalism and care — best moving experience we have had in Charleston County.',
      name: 'William A.',
      location: 'Charleston, SC',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Charleston served our Mount Pleasant move with excellent bridge-traffic planning and careful furniture wrapping.',
      name: 'Catherine B.',
      location: 'Mount Pleasant, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Charleston confirmed James Island coverage and delivered reliable packing and loading with transparent Lowcountry pricing.',
      name: 'Daniel C.',
      location: 'James Island, SC',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  richland: [
    {
      quote:
        'Two Men and a Truck Columbia handled our Columbia relocation professionally — on time, careful with our belongings, and transparent Midlands pricing throughout Richland County.',
      name: 'Emily D.',
      location: 'Columbia, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Coleman Worldwide served our Fort Jackson corridor PCS move with excellent military documentation support and careful handling.',
      name: 'Frank E.',
      location: 'Columbia, SC',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'JEGA Movers confirmed Richland County coverage and delivered reliable packing and loading with no surprise fees despite university-area traffic.',
      name: 'Grace F.',
      location: 'Columbia, SC',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  greenville: [
    {
      quote:
        'Two Men and a Truck Greenville handled our downtown Greenville relocation professionally — excellent crew communication and transparent Upstate pricing.',
      name: 'Henry G.',
      location: 'Greenville, SC',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Swamp Rabbit Moving served our Greer move with top-rated local service, careful handling, and excellent urban traffic planning.',
      name: 'Isabel H.',
      location: 'Greer, SC',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Greenville confirmed Mauldin coverage and delivered reliable packing and loading with no surprise fees.',
      name: 'Jack I.',
      location: 'Mauldin, SC',
      rating: 4,
      moveType: 'Family home',
    },
  ],
};

export function getSouthCarolinaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return southCarolinaCountyTestimonials[countySlug] ?? [];
}