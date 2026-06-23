export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const georgiaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  fulton: [
    {
      quote:
        'Our Buckhead high-rise move required strict elevator booking and concierge rules. Two Men and a Truck Atlanta arrived early, followed every building guideline, and navigated I-75 traffic without missing our loading window.',
      name: 'Marcus T.',
      location: 'Atlanta, GA',
      rating: 5,
      moveType: 'High-rise condo',
    },
    {
      quote:
        'Mark the Mover handled our Midtown apartment relocation with professional crews who protected floors and managed tight street parking on a busy Saturday. Transparent pricing and excellent communication throughout Fulton County.',
      name: 'Elena R.',
      location: 'Atlanta, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'College Hunks made our Sandy Springs family move manageable — careful with antiques, upfront about Atlanta traffic delays, and finished our four-bedroom home faster than the written estimate.',
      name: 'David K.',
      location: 'Sandy Springs, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  gwinnett: [
    {
      quote:
        'Our Lawrenceville townhome HOA required advance gate passes and parking coordination. All My Sons Atlanta submitted paperwork early and handled our Gwinnett County move without a single hallway complaint from neighbors.',
      name: 'Priya S.',
      location: 'Lawrenceville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Bulldog Movers navigated GA-316 traffic smartly and moved our Duluth home efficiently. The crew wrapped furniture well and was respectful of our driveway pavers in a newer subdivision.',
      name: 'James W.',
      location: 'Duluth, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving gave us a clear flat-rate quote for our Suwanee relocation and delivered on time despite heavy I-85 congestion. Great experience for a growing-family move in Gwinnett County.',
      name: 'Nicole H.',
      location: 'Suwanee, GA',
      rating: 5,
      moveType: 'Family home',
    },
  ],
  cobb: [
    {
      quote:
        'Our Marietta home near the Big Chicken needed careful timing around I-75 construction. Two Men and a Truck showed up early, protected our hardwood floors, and finished our Cobb County move ahead of schedule.',
      name: 'Brian L.',
      location: 'Marietta, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mark the Mover handled our Kennesaw relocation with professional crews who navigated a tight cul-de-sac and wrapped every piece of furniture. Transparent pricing throughout Cobb County.',
      name: 'Angela M.',
      location: 'Kennesaw, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Bulldog Movers made our East Cobb move stress-free — great communication about I-285 traffic and careful handling of our home office equipment.',
      name: 'Chris P.',
      location: 'Smyrna, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  dekalb: [
    {
      quote:
        'Our Decatur bungalow has narrow halls and original floors. Mark the Mover padded everything, managed street parking on a busy Saturday, and completed our DeKalb County move without a single scuff.',
      name: 'Rachel F.',
      location: 'Decatur, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'College Hunks handled our Brookhaven apartment move efficiently — elevator reserved, building rules followed, and everything upstairs before the management deadline.',
      name: 'Kevin J.',
      location: 'Brookhaven, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Two Men and a Truck navigated Tucker traffic smartly and moved our family home on time. Upfront about Atlanta metro delays and careful with our kids\' rooms.',
      name: 'Simone A.',
      location: 'Tucker, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  clayton: [
    {
      quote:
        'Our Jonesboro townhome HOA had strict move windows. All My Sons submitted paperwork early and finished our Clayton County relocation without disturbing neighbors.',
      name: 'Derrick H.',
      location: 'Jonesboro, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck handled our Riverdale move professionally despite heavy I-75 traffic. Clear pricing and careful furniture wrapping throughout.',
      name: 'Latoya B.',
      location: 'Riverdale, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks made our south-metro apartment move manageable — fast crew, good communication, and no surprise fees for our Clayton County relocation.',
      name: 'Jason W.',
      location: 'Morrow, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  cherokee: [
    {
      quote:
        'Bulldog Movers served our Woodstock new-build perfectly — HOA gate passes handled early and the crew was careful with our driveway landscaping in Cherokee County.',
      name: 'Heather C.',
      location: 'Woodstock, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck confirmed Canton coverage upfront and navigated I-575 traffic without missing our closing-day window. Excellent crew communication.',
      name: 'Mike S.',
      location: 'Canton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Zip Moving gave us a flat-rate quote for our Holly Springs relocation that matched the final bill. Great experience in a fast-growing Cherokee County neighborhood.',
      name: 'Amanda R.',
      location: 'Holly Springs, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  forsyth: [
    {
      quote:
        'Our Cumming estate home needed white-glove care for antiques. Bulldog Movers wrapped everything carefully and coordinated GA-400 traffic timing so we hit our move-in date.',
      name: 'Greg T.',
      location: 'Cumming, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons handled our Forsyth County townhome efficiently — HOA rules followed, furniture protected, and finished faster than quoted despite heavy commuter traffic.',
      name: 'Linda K.',
      location: 'Suwanee, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck moved our growing family from south Forsyth without stress. Upfront about crew arrival and transparent about pricing for a four-bedroom home.',
      name: 'Ryan D.',
      location: 'Cumming, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  henry: [
    {
      quote:
        'Our McDonough subdivision required gate coordination and driveway protection. Two Men and a Truck handled both and finished our Henry County move on the quoted timeline.',
      name: 'Tasha N.',
      location: 'McDonough, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons moved our Stockbridge home efficiently despite I-75 south congestion. Professional crew and clear communication from estimate to completion.',
      name: 'Eric V.',
      location: 'Stockbridge, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks helped with our Locust Grove relocation — careful with heavy furniture and upfront about travel time from the Atlanta metro base.',
      name: 'Maria G.',
      location: 'Locust Grove, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  fayette: [
    {
      quote:
        'Peachtree City path-system neighborhoods have unique access rules. Mark the Mover confirmed logistics ahead of time and handled our Fayette County move without damaging landscaping.',
      name: 'Scott B.',
      location: 'Peachtree City, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck moved our Fayetteville home on closing day despite tight scheduling. Careful crews and transparent pricing throughout.',
      name: 'Jennifer L.',
      location: 'Fayetteville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons provided reliable service for our Tyrone relocation — wrapped furniture well and navigated south-metro traffic without delays.',
      name: 'Paul E.',
      location: 'Tyrone, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  douglas: [
    {
      quote:
        'Our Douglasville home near I-20 needed a crew comfortable with west-metro traffic. Zip Moving gave a clear flat-rate quote and delivered on time.',
      name: 'Nina O.',
      location: 'Douglasville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck handled our Lithia Springs apartment move professionally — building elevator reserved and no hallway damage in our Douglas County relocation.',
      name: 'Andre C.',
      location: 'Lithia Springs, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Atlanta Peach Movers wrapped our furniture carefully and finished our Douglasville move faster than expected despite I-20 corridor congestion.',
      name: 'Kelly H.',
      location: 'Douglasville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  rockdale: [
    {
      quote:
        'Our Conyers home move lined up with a tight closing schedule. Two Men and a Truck arrived early, followed HOA rules, and finished our Rockdale County relocation ahead of plan.',
      name: 'William J.',
      location: 'Conyers, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons navigated I-20 east traffic smartly and moved our family home without damaging the new hardwood floors. Great communication throughout.',
      name: 'Diana S.',
      location: 'Conyers, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks made our east-metro apartment move easy — fast packing help, careful loading, and no surprise fees for our Rockdale County relocation.',
      name: 'Omar R.',
      location: 'Conyers, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  paulding: [
    {
      quote:
        'Our Dallas-area home has a long gravel driveway. Bulldog Movers confirmed truck access upfront and handled our Paulding County move without yard damage.',
      name: 'Tracy M.',
      location: 'Dallas, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck served our Hiram relocation efficiently — upfront about travel from the metro base and careful with our garage workshop equipment.',
      name: 'Ben K.',
      location: 'Hiram, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Zip Moving provided a transparent flat-rate quote for our northwest metro move. Professional crew and on-time delivery in Paulding County.',
      name: 'Sandra P.',
      location: 'Dallas, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  coweta: [
    {
      quote:
        'Our Newnan home near the historic square needed careful timing around downtown events. Two Men and a Truck coordinated parking and finished our Coweta County move on schedule.',
      name: 'Laura B.',
      location: 'Newnan, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mark the Mover handled our Senoia relocation professionally — upfront about south-metro travel and careful with our screened porch furniture.',
      name: 'Tom G.',
      location: 'Senoia, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons moved our Sharpsburg townhome efficiently despite I-85 traffic. Clear pricing and respectful crew throughout Coweta County.',
      name: 'Keisha R.',
      location: 'Sharpsburg, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  barrow: [
    {
      quote:
        'Our Winder subdivision required gate passes and driveway mats. Two Men and a Truck submitted HOA paperwork early and completed our Barrow County move without issues.',
      name: 'Hannah L.',
      location: 'Winder, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bulldog Movers navigated GA-316 traffic smartly for our Auburn relocation. Professional wrapping and transparent pricing from estimate to completion.',
      name: 'Steve M.',
      location: 'Auburn, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Zip Moving gave us a flat-rate quote for our northeast metro move that matched the final bill. Great experience in Barrow County.',
      name: 'Rita C.',
      location: 'Winder, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  newton: [
    {
      quote:
        'Our Covington home move aligned with a film-town busy weekend. Two Men and a Truck arrived early and handled our Newton County relocation without street-access problems.',
      name: 'Charles D.',
      location: 'Covington, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons moved our Oxford family home on closing day despite I-20 east congestion. Careful crews and excellent communication throughout.',
      name: 'Melissa F.',
      location: 'Oxford, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks helped with our Porterdale apartment move — fast, careful, and upfront about travel time from the Atlanta metro base.',
      name: 'Devon A.',
      location: 'Porterdale, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  hall: [
    {
      quote:
        'Our Gainesville lake-home had a steep driveway and tight turn. Bulldog Movers confirmed truck access upfront and handled our Hall County move without landscaping damage.',
      name: 'Patricia W.',
      location: 'Gainesville, GA',
      rating: 5,
      moveType: 'Lake home',
    },
    {
      quote:
        'Two Men and a Truck served our Flowery Branch relocation efficiently despite I-985 traffic. Professional crew and clear communication throughout.',
      name: 'Robert N.',
      location: 'Flowery Branch, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving provided a transparent flat-rate quote for our Oakwood move near Lake Lanier. On-time delivery and careful furniture handling in Hall County.',
      name: 'Susan K.',
      location: 'Oakwood, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  walton: [
    {
      quote:
        'Our Monroe home near the historic square needed weekend parking coordination. Two Men and a Truck handled it smoothly and finished our Walton County move ahead of schedule.',
      name: 'Gary H.',
      location: 'Monroe, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons moved our Loganville family home efficiently — HOA rules followed, furniture protected, and no surprise fees for our east-metro relocation.',
      name: 'Christine J.',
      location: 'Loganville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Atlanta Peach Movers wrapped everything carefully for our Walton County townhome move. Upfront about travel from the metro and great crew communication.',
      name: 'Aaron T.',
      location: 'Monroe, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
};

export function getGeorgiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return georgiaCountyTestimonials[countySlug] ?? [];
}