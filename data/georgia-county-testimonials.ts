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
  chatham: [
    {
      quote:
        'BC Brothers navigated our Victorian District move with careful route planning around narrow streets and parking limits. Professional crew and transparent pricing for our Chatham County relocation.',
      name: 'Rachel M.',
      location: 'Savannah, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Savannah arrived on time for our Pooler townhome move and handled humid coastal packing conditions well. Great communication throughout Chatham County.',
      name: 'James L.',
      location: 'Pooler, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Nilson Van managed our long-distance departure from Savannah with specialty crating for antiques. They understood historic-home access rules and port-area scheduling constraints.',
      name: 'Catherine D.',
      location: 'Savannah, GA',
      rating: 4,
      moveType: 'Long-distance',
    },
  ],
  richmond: [
    {
      quote:
        'Budget Movers of Augusta handled our Fort Eisenhower PCS timeline professionally — careful packing, on-time delivery, and clear military move coordination in Richmond County.',
      name: 'Sgt. Marcus W.',
      location: 'Augusta, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'We moved a historic Summerville home with narrow streets and antique furniture. Two Men and a Truck Augusta confirmed truck size, protected hardwood floors, and communicated clearly on pricing from start to finish.',
      name: 'Eleanor W.',
      location: 'Augusta, GA',
      rating: 5,
      moveType: 'Historic district',
    },
    {
      quote:
        'ADSI Moving Systems protected our high-value furniture during a cross-town Augusta relocation. Professional team and excellent communication for our Richmond County home.',
      name: 'Harold P.',
      location: 'Augusta, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  muscogee: [
    {
      quote:
        'Coleman Worldwide Moving coordinated our Fort Moore PCS move flawlessly — careful handling, military paperwork experience, and on-schedule delivery in Muscogee County.',
      name: 'Lt. Angela S.',
      location: 'Columbus, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'College Hunks moved our Uptown Columbus apartment efficiently with great communication and careful furniture wrapping. Transparent pricing and a smooth local move.',
      name: 'Derek F.',
      location: 'Columbus, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'McCarley Moving & Storage handled our family home relocation near Fort Moore with professional crews who understood base-adjacent scheduling. Highly recommend for Columbus moves.',
      name: 'Kimberly R.',
      location: 'Columbus, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  pickens: [
    {
      quote:
        'Atlanta Home Movers confirmed mountain-road access for our Jasper relocation before move day. Careful crew and transparent travel pricing for our Pickens County home.',
      name: 'Brian S.',
      location: 'Jasper, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta navigated narrow driveway access and finished our north Georgia move ahead of schedule. Professional handling throughout.',
      name: 'Linda K.',
      location: 'Talking Rock, GA',
      rating: 5,
      moveType: 'Mountain home',
    },
    {
      quote:
        'Bulldog Movers served our Pickens County move from their north-metro base with upfront communication about rural travel time. Great experience.',
      name: 'Scott M.',
      location: 'Jasper, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  bartow: [
    {
      quote:
        'Atlanta Home Movers handled our Cartersville lake-area move efficiently — careful with large furniture and clear I-75 corridor scheduling.',
      name: 'Amanda R.',
      location: 'Cartersville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons moved our Bartow County townhome without surprise fees. Professional crew and good communication despite Atlanta traffic delays.',
      name: 'Chris D.',
      location: 'Cartersville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Zip Moving gave us a flat-rate quote for our Emerson relocation and delivered on time. Solid option for northwest Atlanta ring moves.',
      name: 'Heather W.',
      location: 'Emerson, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  spalding: [
    {
      quote:
        'Wirks Moving made our Griffin relocation seamless — professional packing, on-time arrival, and careful handling through our historic neighborhood.',
      name: 'Daniel P.',
      location: 'Griffin, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mark the Mover handled our Spalding County apartment move with excellent communication and no hidden fees despite I-75 traffic.',
      name: 'Jasmine L.',
      location: 'Griffin, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Two Men and a Truck Atlanta served our south-metro Griffin move efficiently. Upfront about travel time and great crew professionalism.',
      name: 'Robert G.',
      location: 'Griffin, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  butts: [
    {
      quote:
        'Two Men and a Truck Atlanta traveled to our Jackson home and handled rural driveway access without issues. Careful crew and clear pricing.',
      name: 'Nancy H.',
      location: 'Jackson, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Wirks Moving confirmed service to our Butts County address upfront and delivered a stress-free rural relocation from their Atlanta base.',
      name: 'Tim C.',
      location: 'Jackson, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons provided reliable service for our south-metro move into Butts County. Professional handling and good communication throughout.',
      name: 'Karen B.',
      location: 'Flovilla, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  carroll: [
    {
      quote:
        'Wirks Moving handled our Carrollton university-area move with professional crews and careful furniture wrapping. Transparent pricing throughout.',
      name: 'Megan T.',
      location: 'Carrollton, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Zip Moving gave us a clear flat-rate quote for our Villa Rica relocation and finished on schedule despite I-20 west traffic.',
      name: 'Jason N.',
      location: 'Villa Rica, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons moved our Carroll County family home efficiently — HOA rules followed and no surprise travel fees from the Atlanta base.',
      name: 'Sandra E.',
      location: 'Carrollton, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  dawson: [
    {
      quote:
        'Atlanta Home Movers confirmed mountain-road feasibility for our Dawsonville move before booking. Careful crew and excellent communication.',
      name: 'Paul J.',
      location: 'Dawsonville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bulldog Movers served our Dawson County relocation from their north-metro base with upfront travel-time estimates and professional handling.',
      name: 'Rita F.',
      location: 'Dawsonville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Atlanta navigated GA-400 north traffic smartly and finished our mountain-area move on time. Highly recommend.',
      name: 'Greg A.',
      location: 'Dawsonville, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lumpkin: [
    {
      quote:
        'Bulldog Movers handled our Dahlonega relocation with careful attention to mountain-road logistics. Professional crew and clear pricing.',
      name: 'Emily C.',
      location: 'Dahlonega, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Atlanta Home Movers served our Lumpkin County move from their north-metro base — upfront about travel fees and excellent furniture protection.',
      name: 'William O.',
      location: 'Dahlonega, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta made our gold-country move manageable despite narrow access roads. Great communication throughout.',
      name: 'Laura V.',
      location: 'Dahlonega, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  morgan: [
    {
      quote:
        'University Moving and Storage handled our Madison historic-home relocation with specialty care for antiques. Excellent Athens-area expertise.',
      name: 'Charles M.',
      location: 'Madison, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Morgan County move efficiently with clear communication and careful handling of rural property access.',
      name: 'Diana S.',
      location: 'Madison, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta covered our east-metro Morgan move when Athens crews were booked — upfront about travel time and professional service.',
      name: 'Frank L.',
      location: 'Madison, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  oconee: [
    {
      quote:
        'University Moving and Storage made our Watkinsville relocation stress-free — careful with high-value furniture and excellent Athens-corridor knowledge.',
      name: 'Olivia R.',
      location: 'Watkinsville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens handled our Oconee County townhome move on schedule despite university-area traffic. Transparent pricing throughout.',
      name: 'Nathan B.',
      location: 'Watkinsville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Zip Moving provided a flat-rate quote for our Bishop-area move and delivered professional service from their Atlanta base.',
      name: 'Grace H.',
      location: 'Bishop, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  jackson: [
    {
      quote:
        'Bulldog Movers served our Jefferson relocation efficiently — confirmed I-85 northeast corridor timing upfront and careful furniture handling.',
      name: 'Kevin D.',
      location: 'Jefferson, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving gave us clear pricing for our Jackson County townhome move and finished ahead of the written estimate.',
      name: 'Ashley P.',
      location: 'Jefferson, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our Commerce-adjacent move with professional crews and good communication about rural travel time.',
      name: 'Mike T.',
      location: 'Jefferson, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  haralson: [
    {
      quote:
        'Wirks Moving confirmed rural access for our Buchanan relocation before move day. Careful crew and transparent travel pricing from Carrollton base.',
      name: 'Betty J.',
      location: 'Buchanan, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving served our Haralson County move with upfront travel-fee disclosure and professional furniture wrapping throughout.',
      name: 'Roy K.',
      location: 'Buchanan, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our west-metro rural move efficiently despite long travel from the core metro.',
      name: 'Janet W.',
      location: 'Tallapoosa, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  polk: [
    {
      quote:
        'Atlanta Home Movers served our Cedartown relocation from their Rome-area coverage with careful handling and clear rural travel pricing.',
      name: 'Henry C.',
      location: 'Cedartown, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Polk County and finished our move on schedule. Professional crew and good communication.',
      name: 'Martha G.',
      location: 'Cedartown, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Zip Moving provided reliable west-metro service for our Rockmart-adjacent Polk County move with transparent flat-rate pricing.',
      name: 'Edward N.',
      location: 'Rockmart, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  heard: [
    {
      quote:
        'Wirks Moving confirmed remote property access for our Franklin relocation and delivered careful, professional service despite the rural distance.',
      name: 'Ruth A.',
      location: 'Franklin, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mark the Mover handled our Heard County move with excellent communication about travel time from Atlanta and careful antique handling.',
      name: 'George P.',
      location: 'Franklin, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Atlanta served our very rural Heard County address — upfront about fees and professional throughout.',
      name: 'Alice D.',
      location: 'Franklin, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  meriwether: [
    {
      quote:
        'Mark the Mover traveled to our Greenville home and handled remote rural access without issues. Careful crew and transparent southwest-metro pricing.',
      name: 'Tom R.',
      location: 'Greenville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Meriwether County move from the Columbus corridor with professional handling and clear travel estimates.',
      name: 'Brenda L.',
      location: 'Greenville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons Atlanta provided reliable backup coverage for our rural southwest move when local options were limited. Great communication.',
      name: 'Carl M.',
      location: 'Manchester, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  floyd: [
    {
      quote:
        'Atlanta Home Movers served our Rome relocation with careful handling and upfront travel pricing from their northwest-ring coverage.',
      name: 'Laura S.',
      location: 'Rome, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Page Relocation handled our Floyd County move efficiently — professional crew, clear communication about I-75 corridor timing.',
      name: 'Chris M.',
      location: 'Rome, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Rome finished our apartment move on schedule with no hidden fees. Great local Rome-area service.',
      name: 'Diana K.',
      location: 'Rome, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  gordon: [
    {
      quote:
        'Wirks Moving confirmed Calhoun coverage upfront and delivered careful furniture handling despite the Rome-to-Calhoun travel.',
      name: 'Paul T.',
      location: 'Calhoun, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Atlanta Home Movers served our Gordon County relocation with transparent pricing and professional crews throughout.',
      name: 'Susan H.',
      location: 'Calhoun, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving provided a reliable flat-rate quote for our Calhoun move and finished ahead of the written estimate.',
      name: 'Rick B.',
      location: 'Resaca, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  chattooga: [
    {
      quote:
        'Atlanta Home Movers traveled to our rural Summerville property and handled mountain-road access without issues. Careful crew throughout.',
      name: 'Nancy W.',
      location: 'Summerville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Page Relocation confirmed explicit Chattooga County service before move day. Professional handling and clear rural travel fees.',
      name: 'Earl J.',
      location: 'Summerville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Rome served our remote Chattooga move efficiently — upfront about travel time and careful with antiques.',
      name: 'Betty C.',
      location: 'Menlo, GA',
      rating: 4,
      moveType: 'Historic home',
    },
  ],
  walker: [
    {
      quote:
        'Good Guys Moving Chattanooga handled our LaFayette relocation with transparent pricing and careful furniture wrapping throughout.',
      name: 'Jason P.',
      location: 'LaFayette, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Elizabeth\'s Moving served our Walker County move from the Chattanooga corridor with professional crews and good communication.',
      name: 'Melissa R.',
      location: 'LaFayette, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Chattanooga navigated US-27 traffic smartly and finished our move on schedule. Highly recommend for Walker County.',
      name: 'Donnie L.',
      location: 'Rock Spring, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  whitfield: [
    {
      quote:
        'Good Guys Moving delivered excellent service for our Dalton relocation — careful with carpet-mill shift scheduling and transparent fees.',
      name: 'Karen D.',
      location: 'Dalton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Dalton handled our Whitfield County move professionally despite heavy I-75 industrial traffic.',
      name: 'Steve G.',
      location: 'Dalton, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Elizabeth\'s Moving traveled from Chattanooga and finished our Dalton home move with careful handling and clear pricing.',
      name: 'Amy F.',
      location: 'Dalton, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  murray: [
    {
      quote:
        'Good Guys Moving confirmed rural Chatsworth access before booking. Professional crew and reliable Dalton-corridor service.',
      name: 'Wayne H.',
      location: 'Chatsworth, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Dalton served our Murray County move with upfront travel-fee disclosure and careful furniture handling.',
      name: 'Linda M.',
      location: 'Chatsworth, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Atlanta Home Movers provided dependable backup coverage for our rural Murray relocation when local options were limited.',
      name: 'Gary S.',
      location: 'Eton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  catoosa: [
    {
      quote:
        'Good Guys Moving handled our Ringgold relocation efficiently — confirmed I-75 border traffic timing and careful loading throughout.',
      name: 'Tiffany B.',
      location: 'Ringgold, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Chattanooga served our Catoosa County move with professional crews and transparent cross-border pricing.',
      name: 'Robert N.',
      location: 'Ringgold, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Elizabeth\'s Moving wrapped every piece of furniture and finished our Ringgold move ahead of schedule. Excellent communication.',
      name: 'Heather W.',
      location: 'Fort Oglethorpe, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  dade: [
    {
      quote:
        'Two Men and a Truck Chattanooga traveled to our remote Trenton property and handled mountain-road access without issues.',
      name: 'Frank D.',
      location: 'Trenton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Good Guys Moving confirmed explicit Dade County service before move day. Careful crew despite the long rural drive.',
      name: 'Sharon E.',
      location: 'Trenton, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Elizabeth\'s Moving provided reliable Chattanooga-area coverage for our extreme northwest Georgia move with clear travel estimates.',
      name: 'Jim C.',
      location: 'Rising Fawn, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  appling: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Baxley and handled our rural Appling County move with professional care and clear travel fees.',
      name: 'Rachel T.',
      location: 'Baxley, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving served our Appling relocation from Savannah with careful handling and transparent rural-route pricing.',
      name: 'William A.',
      location: 'Baxley, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Mover Dan Savannah provided white-glove service for our Baxley home despite the long coastal-plain drive from Chatham County.',
      name: 'Patricia L.',
      location: 'Surrency, GA',
      rating: 5,
      moveType: 'Historic home',
    },
  ],
  atkinson: [
    {
      quote:
        'HHG Movers traveled from Albany to Pearson and handled our rural Atkinson County move with professional, timely service.',
      name: 'Debbie R.',
      location: 'Pearson, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Pearson coverage upfront. Careful crew and fair South Georgia pricing throughout.',
      name: 'Tony M.',
      location: 'Pearson, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving provided reliable labor and packing for our Atkinson County relocation with careful furniture wrapping.',
      name: 'Cindy J.',
      location: 'Pearson, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  bacon: [
    {
      quote:
        'Two Men and a Truck Savannah served our Alma relocation with upfront rural travel-fee disclosure and professional crews.',
      name: 'Harold K.',
      location: 'Alma, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Bacon County move efficiently despite the long drive from the Savannah coast.',
      name: 'Gloria P.',
      location: 'Alma, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons Savannah provided dependable Southeast Georgia coverage for our rural Alma move with good communication.',
      name: 'Dennis W.',
      location: 'Nicholls, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  baker: [
    {
      quote:
        'HHG Movers confirmed remote Newton coverage before move day. Professional handling despite the extremely rural Baker County location.',
      name: 'Louise B.',
      location: 'Newton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Albany traveled to our Baker County property with clear travel estimates and careful furniture handling.',
      name: 'Raymond F.',
      location: 'Newton, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Perez Moving provided reliable South Georgia backup coverage for our remote Baker relocation when local options were scarce.',
      name: 'Marie S.',
      location: 'Newton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  baldwin: [
    {
      quote:
        'Good Guys Moving handled our Milledgeville historic-home move with excellent antique care and transparent Macon-area pricing.',
      name: 'Charles H.',
      location: 'Milledgeville, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Baldwin County relocation efficiently with professional crews and good communication.',
      name: 'Janet M.',
      location: 'Milledgeville, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Cicero\'s Moving handled specialty items in our Milledgeville move with careful crating and climate-controlled storage options.',
      name: 'Robert E.',
      location: 'Milledgeville, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  banks: [
    {
      quote:
        'Bulldog Movers confirmed Homer coverage and handled our rural Banks County move with careful driveway access planning.',
      name: 'Kim L.',
      location: 'Homer, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Atlanta Home Movers served our Banks County relocation from their northeast-ring coverage with transparent travel pricing.',
      name: 'Scott D.',
      location: 'Homer, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Homer and finished our move on schedule despite rural northeast-metro access challenges.',
      name: 'Angela V.',
      location: 'Maysville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  berrien: [
    {
      quote:
        'Perez Moving confirmed explicit Nashville coverage and delivered careful handling for our rural Berrien County relocation.',
      name: 'Johnny R.',
      location: 'Nashville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'HHG Movers traveled from Albany to serve our Berrien County move with professional crews and clear South Georgia pricing.',
      name: 'Wanda G.',
      location: 'Nashville, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving provided reliable packing and labor for our Nashville-area move with careful furniture protection.',
      name: 'Billy T.',
      location: 'Alapaha, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  bibb: [
    {
      quote:
        'Good Guys Moving was our best Macon experience — no hidden fees, arrived on time, and exceeded expectations from start to finish.',
      name: 'Michelle A.',
      location: 'Macon, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon made our apartment relocation seamless. Reasonably priced and careful with every item.',
      name: 'Derek W.',
      location: 'Macon, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Cicero\'s Moving handled our historic Ingleside home with expert antique care and seamless communication throughout Bibb County.',
      name: 'Patricia N.',
      location: 'Macon, GA',
      rating: 5,
      moveType: 'Historic home',
    },
  ],
  bleckley: [
    {
      quote:
        'Simple Moving Solutions traveled to Cochran and handled our rural Bleckley County move with professional, efficient service.',
      name: 'Harold J.',
      location: 'Cochran, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Good Guys Moving confirmed explicit Cochran coverage before booking. Careful crew despite the Macon-to-Bleckley travel.',
      name: 'Sandra K.',
      location: 'Cochran, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Bleckley County relocation with upfront travel fees and reliable Central Georgia crews.',
      name: 'Timothy B.',
      location: 'Cochran, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  brantley: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Nahunta and handled our rural Brantley County move with professional care.',
      name: 'Evelyn C.',
      location: 'Nahunta, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving served our Brantley relocation from Savannah with careful handling and transparent rural travel pricing.',
      name: 'Jerry M.',
      location: 'Nahunta, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Savannah provided reliable moving and packing for our Nahunta home despite the long Southeast Georgia drive.',
      name: 'Donna H.',
      location: 'Hoboken, GA',
      rating: 5,
      moveType: 'Single-family',
    },
  ],
  houston: [
    {
      quote:
        'Simple Moving Solutions handled our Robins AFB PCS timeline professionally — careful packing, military paperwork experience, and on-schedule delivery in Houston County.',
      name: 'Sgt. James R.',
      location: 'Warner Robins, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'College Hunks moved our Warner Robins townhome efficiently with upfront pricing and great communication. They knew the Middle Georgia routes and finished faster than estimated.',
      name: 'Tanya B.',
      location: 'Warner Robins, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Good Guys Moving served our Perry relocation from their Macon base with transparent fees and careful handling throughout Houston County.',
      name: 'Harold P.',
      location: 'Perry, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
};

export function getGeorgiaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return georgiaCountyTestimonials[countySlug] ?? [];
}