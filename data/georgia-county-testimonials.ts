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
  columbia: [
    {
      quote:
        'College Hunks made our Evans townhome move stress-free with upfront pricing and efficient crews. They knew the Columbia County routes and finished faster than estimated.',
      name: 'Tanya B.',
      location: 'Evans, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Budget Movers of Augusta handled our Grovetown subdivision relocation professionally — HOA gate passes submitted early and careful handling throughout Columbia County.',
      name: 'Marcus T.',
      location: 'Grovetown, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta navigated Washington Road traffic smartly and moved our Appling-area home on schedule. Transparent pricing and excellent crew communication.',
      name: 'Eleanor W.',
      location: 'Appling, GA',
      rating: 4,
      moveType: 'Family home',
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
        'Coleman Worldwide Columbus confirmed Greenville coverage and handled remote rural access without issues. Careful crew and transparent West Georgia pricing.',
      name: 'Tom R.',
      location: 'Greenville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Wirks Moving Atlanta traveled to our Meriwether County home with professional handling and clear travel estimates from their Atlanta base.',
      name: 'Brenda L.',
      location: 'Greenville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our rural southwest move from the Columbus corridor with reliable packing and great communication.',
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
  lowndes: [
    {
      quote:
        'Perez Moving Co handled our Valdosta townhome relocation professionally — excellent crew communication, careful furniture wrapping, and transparent pricing throughout Lowndes County.',
      name: 'Marcus T.',
      location: 'Valdosta, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Mudanza Moving provided reliable packing and labor for our VSU-area apartment move. They finished on schedule despite heavy Bemiss Road traffic.',
      name: 'Elena R.',
      location: 'Valdosta, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'HHG Movers traveled from Albany and served our Lake Park home move with upfront travel-fee disclosure and careful handling. Solid option for South Georgia relocations.',
      name: 'David K.',
      location: 'Lake Park, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  bulloch: [
    {
      quote:
        'Badie Moving Company handled our Statesboro relocation during Georgia Southern move-in week — professional crew, careful packing, and transparent pricing throughout Bulloch County.',
      name: 'Kayla M.',
      location: 'Statesboro, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Two Men and a Truck Savannah traveled to our Brooklet home and delivered on schedule. Upfront about travel time and excellent handling of our family furniture.',
      name: 'Derek W.',
      location: 'Brooklet, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Savannah served our Statesboro townhome efficiently with great communication and no surprise fees despite peak university-season demand.',
      name: 'Priya S.',
      location: 'Statesboro, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  effingham: [
    {
      quote:
        'BC Brothers Moving handled our Rincon relocation professionally — careful with large furniture, clear scheduling despite Savannah-metro traffic, and transparent pricing.',
      name: 'Melissa J.',
      location: 'Rincon, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Springfield home move efficiently. Upfront about I-16 travel time and great crew professionalism throughout Effingham County.',
      name: 'Tony R.',
      location: 'Springfield, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'All My Sons Moving made our Guyton apartment relocation seamless with reliable packing and on-time arrival despite heavy Highway 21 traffic.',
      name: 'Angela F.',
      location: 'Guyton, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  glynn: [
    {
      quote:
        'Driftwood Moving Company handled our Brunswick coastal home relocation with careful humidity-sensitive packing and excellent communication about marsh-side property access.',
      name: 'Richard H.',
      location: 'Brunswick, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'T&T Moving and Packing served our St. Simons Island move professionally — experienced with island bridge logistics and transparent flat-rate pricing.',
      name: 'Susan L.',
      location: 'St. Simons Island, GA',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'BC Brothers Moving traveled from Savannah and handled our Glynn County townhome efficiently. Careful crew and upfront about coastal travel fees.',
      name: 'Greg N.',
      location: 'Brunswick, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  dougherty: [
    {
      quote:
        'HHG Movers handled our Albany single-family relocation professionally — careful furniture wrapping, clear pricing, and reliable scheduling throughout Dougherty County.',
      name: 'Terrence B.',
      location: 'Albany, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'The Home Moving Solution provided excellent packing and loading for our Albany townhome. Transparent fees and great communication from quote to completion.',
      name: 'Latoya G.',
      location: 'Albany, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Putney-area home move efficiently with upfront travel-time disclosure and careful handling of antiques.',
      name: 'Frank D.',
      location: 'Albany, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  troup: [
    {
      quote:
        'Coleman Worldwide Moving handled our LaGrange relocation with military-grade professionalism — careful packing, on-schedule delivery, and clear I-85 corridor coordination.',
      name: 'James C.',
      location: 'LaGrange, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Wirks Moving traveled from Atlanta and served our Hogansville home move efficiently. Upfront about travel fees and excellent crew communication throughout Troup County.',
      name: 'Brenda K.',
      location: 'Hogansville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Zip Moving gave us a flat-rate quote for our LaGrange apartment relocation and delivered on time despite Lafayette Parkway traffic.',
      name: 'Kevin P.',
      location: 'LaGrange, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  liberty: [
    {
      quote:
        'Nilson Van handled our Fort Stewart PCS move flawlessly — experienced with base housing rules, careful packing, and on-schedule delivery throughout Liberty County.',
      name: 'Sgt. Marcus H.',
      location: 'Hinesville, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Hinesville townhome efficiently with upfront travel-time disclosure and excellent crew professionalism near Fort Stewart.',
      name: 'Jennifer W.',
      location: 'Hinesville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'BC Brothers Moving handled our Walthourville relocation with careful furniture wrapping and transparent pricing despite peak PCS season demand.',
      name: 'David R.',
      location: 'Walthourville, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  camden: [
    {
      quote:
        'Driftwood Moving Company handled our Kingsland coastal home relocation with careful humidity-sensitive packing and excellent communication about marsh-side property access.',
      name: 'Patricia M.',
      location: 'Kingsland, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Savannah traveled to our St. Marys home and delivered on schedule. Upfront about coastal travel fees and great crew care near Kings Bay.',
      name: 'Brian T.',
      location: 'St. Marys, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving served our Woodbine relocation professionally with reliable packing and no surprise fees despite the long Southeast Georgia drive.',
      name: 'Linda K.',
      location: 'Woodbine, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  bryan: [
    {
      quote:
        'Two Men and a Truck Savannah handled our Richmond Hill relocation efficiently — clear I-95 corridor scheduling, careful handling, and transparent pricing throughout Bryan County.',
      name: 'Scott A.',
      location: 'Richmond Hill, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving served our Pembroke home move with excellent communication and careful furniture wrapping despite rural driveway access challenges.',
      name: 'Maria G.',
      location: 'Pembroke, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our coastal Bryan County apartment. Finished on schedule with no hidden fees.',
      name: 'Tyler N.',
      location: 'Richmond Hill, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  laurens: [
    {
      quote:
        'Good Guys Moving traveled from Macon and handled our Dublin relocation professionally — careful with antiques, clear rural-route planning, and transparent pricing.',
      name: 'Ruth E.',
      location: 'Dublin, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Laurens County townhome efficiently with upfront travel-fee disclosure and great crew communication.',
      name: 'Willie J.',
      location: 'Dublin, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Simple Moving Solutions provided reliable packing for our rural Dublin home move. They finished faster than estimated despite long driveway access.',
      name: 'Carol F.',
      location: 'Dublin, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  habersham: [
    {
      quote:
        'Atlanta Home Movers traveled to our Clarkesville mountain home and handled steep driveway access without issues. Careful crew and clear travel-fee disclosure.',
      name: 'Glenn P.',
      location: 'Clarkesville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bulldog Movers served our Cornelia relocation efficiently with upfront pricing and excellent handling of large furniture through narrow mountain roads.',
      name: 'Sandra B.',
      location: 'Cornelia, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our Habersham County apartment move with great communication and no surprise fees despite the long north-metro drive.',
      name: 'Eric L.',
      location: 'Clarkesville, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  colquitt: [
    {
      quote:
        'HHG Movers handled our Moultrie single-family relocation professionally — careful furniture wrapping, clear pricing, and reliable scheduling throughout Colquitt County.',
      name: 'Jorge M.',
      location: 'Moultrie, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Moultrie served our townhome move efficiently with upfront pricing and great crew communication for our rural South Georgia relocation.',
      name: 'Tamika S.',
      location: 'Moultrie, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'The Home Moving Solution traveled from Albany and provided excellent packing for our Moultrie home. Transparent fees and careful handling throughout.',
      name: 'Henry D.',
      location: 'Moultrie, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  thomas: [
    {
      quote:
        'House to House Moving handled our Thomasville historic-home relocation with careful antique packing, on-time arrival, and transparent pricing throughout Thomas County.',
      name: 'William C.',
      location: 'Thomasville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving Co traveled from Valdosta and served our Thomasville townhome efficiently. Excellent crew communication and careful furniture wrapping.',
      name: 'Nicole H.',
      location: 'Thomasville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Thomasville provided reliable local service for our apartment move with upfront travel-time disclosure and no hidden fees.',
      name: 'Andre W.',
      location: 'Thomasville, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  lee: [
    {
      quote:
        'HHG Movers handled our Leesburg relocation from their Albany base with careful furniture wrapping, clear travel-fee disclosure, and reliable scheduling throughout Lee County.',
      name: 'Deborah S.',
      location: 'Leesburg, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'The Home Moving Solution provided excellent packing for our Lee County townhome. Transparent pricing and great communication from quote to completion.',
      name: 'Raymond T.',
      location: 'Leesburg, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Albany served our suburban Leesburg move efficiently with upfront I-75 corridor scheduling and careful handling.',
      name: 'Kim L.',
      location: 'Leesburg, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  gilmer: [
    {
      quote:
        'Atlanta Home Movers traveled to our Ellijay mountain home and handled steep driveway access without issues. Careful crew and clear travel-fee disclosure.',
      name: 'Paul R.',
      location: 'Ellijay, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta served our Gilmer County cabin relocation efficiently with upfront pricing and excellent handling on narrow mountain roads.',
      name: 'Janice M.',
      location: 'Ellijay, GA',
      rating: 5,
      moveType: 'Cabin',
    },
    {
      quote:
        'Bulldog Movers handled our apple-country home move with great communication and no surprise fees despite the long north Georgia drive.',
      name: 'Steve K.',
      location: 'East Ellijay, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  madison: [
    {
      quote:
        'University Moving and Storage handled our Danielsville relocation professionally — careful packing, on-time arrival, and transparent pricing throughout Madison County.',
      name: 'Laura B.',
      location: 'Danielsville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Madison County townhome efficiently with great communication and careful furniture handling.',
      name: 'Otis W.',
      location: 'Danielsville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Zip Moving traveled from Atlanta and provided reliable service for our rural Madison home move with upfront travel-time disclosure.',
      name: 'Nina P.',
      location: 'Comer, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  wayne: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to our Jesup home and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold G.',
      location: 'Jesup, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Wayne County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki C.',
      location: 'Jesup, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our rural Wayne County apartment. Finished on schedule with no hidden fees.',
      name: 'Dwayne F.',
      location: 'Odum, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  monroe: [
    {
      quote:
        'Good Guys Moving traveled from Macon and handled our Forsyth relocation professionally — careful with antiques, clear rural-route planning, and transparent pricing.',
      name: 'Betty H.',
      location: 'Forsyth, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Monroe County townhome efficiently with upfront travel-fee disclosure and great crew communication.',
      name: 'Leonard J.',
      location: 'Forsyth, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        "Cicero's Moving provided reliable packing for our rural Monroe home move with careful handling and on-time arrival from their Macon base.",
      name: 'Gloria N.',
      location: 'Forsyth, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  peach: [
    {
      quote:
        'Good Guys Moving handled our Fort Valley relocation with excellent communication, careful furniture wrapping, and transparent pricing throughout Peach County.',
      name: 'Marcia D.',
      location: 'Fort Valley, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Fort Valley apartment move efficiently despite university-area traffic near FVSU.',
      name: 'Jerome A.',
      location: 'Fort Valley, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'College Hunks Moving Macon provided reliable packing and labor for our Peach County townhome. Finished faster than estimated with no surprise fees.',
      name: 'Sharon E.',
      location: 'Fort Valley, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  white: [
    {
      quote:
        'Atlanta Home Movers traveled to our Cleveland mountain home and handled Helen-area traffic and steep driveway access without issues. Careful crew throughout.',
      name: 'Glen P.',
      location: 'Cleveland, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bulldog Movers served our White County cabin relocation efficiently with upfront pricing and excellent handling on narrow mountain roads.',
      name: 'Diane S.',
      location: 'Cleveland, GA',
      rating: 5,
      moveType: 'Cabin',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our Cleveland apartment move with great communication and no hidden fees despite the long northeast Georgia drive.',
      name: 'Roy T.',
      location: 'Cleveland, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  decatur: [
    {
      quote:
        'HHG Movers traveled from Albany and handled our Bainbridge relocation professionally — careful furniture wrapping, clear pricing, and reliable rural scheduling.',
      name: 'Calvin M.',
      location: 'Bainbridge, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'The Home Moving Solution provided excellent packing for our Decatur County townhome near Lake Seminole. Transparent fees and great crew communication.',
      name: 'Irene W.',
      location: 'Bainbridge, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Albany served our rural Bainbridge home move efficiently with upfront travel-time disclosure and careful handling.',
      name: 'Philip R.',
      location: 'Bainbridge, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  jones: [
    {
      quote:
        'Good Guys Moving handled our Gray relocation from their Macon base with careful packing, on-time arrival, and transparent pricing throughout Jones County.',
      name: 'Wanda C.',
      location: 'Gray, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Jones County townhome efficiently with great communication and no surprise fees despite I-75 corridor traffic.',
      name: 'Mitchell B.',
      location: 'Gray, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Apple Moving provided reliable service for our rural Jones home move with careful antique handling and upfront travel-fee disclosure.',
      name: 'Cheryl K.',
      location: 'Gray, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hart: [
    {
      quote:
        'University Moving and Storage handled our Hartwell lake-area relocation with careful dock-side planning, excellent packing, and transparent pricing.',
      name: 'Barbara L.',
      location: 'Hartwell, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Hart County home move efficiently with upfront travel-fee disclosure and great crew professionalism.',
      name: 'Douglas H.',
      location: 'Hartwell, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Atlanta Home Movers traveled to our Hartwell townhome and delivered on schedule despite lake-property access challenges and narrow rural roads.',
      name: 'Janet F.',
      location: 'Hartwell, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  upson: [
    {
      quote:
        'Good Guys Moving traveled from Macon and handled our Thomaston relocation professionally — careful packing, clear rural-route planning, and transparent pricing throughout Upson County.',
      name: 'Ralph D.',
      location: 'Thomaston, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Upson County townhome efficiently with upfront travel-fee disclosure and great crew communication.',
      name: 'Bonnie S.',
      location: 'Thomaston, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Simple Moving Solutions provided reliable packing for our rural Thomaston home move with careful handling and on-time arrival.',
      name: 'Earl M.',
      location: 'Thomaston, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  sumter: [
    {
      quote:
        'HHG Movers handled our Americus relocation from their Albany base with careful furniture wrapping, clear travel-fee disclosure, and reliable scheduling throughout Sumter County.',
      name: 'Patricia W.',
      location: 'Americus, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'The Home Moving Solution provided excellent packing for our Americus townhome near GSW. Transparent fees and great communication from quote to completion.',
      name: 'Alvin J.',
      location: 'Americus, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Two Men and a Truck Albany served our rural Americus home move efficiently with upfront travel-time disclosure and careful handling.',
      name: 'Gloria R.',
      location: 'Americus, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  stephens: [
    {
      quote:
        'University Moving and Storage handled our Toccoa relocation professionally — careful packing, on-time arrival, and transparent pricing throughout Stephens County.',
      name: 'Wayne C.',
      location: 'Toccoa, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Stephens County home move efficiently with great communication and careful furniture handling near Lake Hartwell.',
      name: 'Diana P.',
      location: 'Toccoa, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Atlanta Home Movers traveled to our Toccoa townhome and delivered on schedule despite rural driveway access challenges.',
      name: 'Keith L.',
      location: 'Toccoa, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  union: [
    {
      quote:
        'Atlanta Home Movers traveled to our Blairsville mountain home and handled steep driveway access without issues. Careful crew and clear travel-fee disclosure.',
      name: 'Nancy G.',
      location: 'Blairsville, GA',
      rating: 5,
      moveType: 'Cabin',
    },
    {
      quote:
        'Bulldog Movers served our Union County cabin relocation efficiently with upfront pricing and excellent handling on narrow mountain roads near Vogel State Park.',
      name: 'Tom H.',
      location: 'Blairsville, GA',
      rating: 5,
      moveType: 'Cabin',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our Blairsville apartment move with great communication and no surprise fees despite the long north Georgia drive.',
      name: 'Rachel B.',
      location: 'Blairsville, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  toombs: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to our Lyons home and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Jimmy F.',
      location: 'Lyons, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Vidalia-area relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Connie A.',
      location: 'Vidalia, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Company served our Toombs County home move efficiently from their Statesboro base with reliable packing and no hidden fees.',
      name: 'Roger T.',
      location: 'Lyons, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  grady: [
    {
      quote:
        'Perez Moving Co traveled from Valdosta and handled our Cairo relocation professionally — excellent crew communication and careful furniture wrapping throughout Grady County.',
      name: 'Linda M.',
      location: 'Cairo, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'HHG Movers provided reliable service for our rural Cairo home move with upfront travel-fee disclosure and careful handling from their Albany base.',
      name: 'Charles B.',
      location: 'Cairo, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mudanza Moving served our Grady County apartment move with reliable packing and labor. Finished on schedule despite the long South Georgia drive.',
      name: 'Angela K.',
      location: 'Cairo, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  franklin: [
    {
      quote:
        'University Moving and Storage handled our Carnesville relocation with careful packing, on-time arrival, and transparent pricing throughout Franklin County.',
      name: 'Howard S.',
      location: 'Carnesville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Franklin County townhome efficiently with great communication and careful furniture handling.',
      name: 'Martha D.',
      location: 'Carnesville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Zip Moving traveled from Atlanta and provided reliable service for our rural Franklin home move with upfront travel-time disclosure.',
      name: 'Philip N.',
      location: 'Carnesville, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  fannin: [
    {
      quote:
        'Good Guys Moving Chattanooga traveled to our Blue Ridge cabin and handled mountain-road access without issues. Careful crew and clear cross-border travel-fee disclosure.',
      name: 'Susan W.',
      location: 'Blue Ridge, GA',
      rating: 5,
      moveType: 'Cabin',
    },
    {
      quote:
        'Atlanta Home Movers served our Fannin County lake-home relocation efficiently with upfront pricing and excellent handling on steep mountain driveways.',
      name: 'Gary L.',
      location: 'Blue Ridge, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta handled our Blue Ridge apartment move with great communication and no surprise fees despite the long north Georgia drive.',
      name: 'Cindy R.',
      location: 'Blue Ridge, GA',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  burke: [
    {
      quote:
        'Budget Movers handled our Waynesboro relocation professionally — careful packing, on-time arrival, and transparent pricing throughout Burke County.',
      name: 'Ernest J.',
      location: 'Waynesboro, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta served our Burke County townhome efficiently with upfront travel-fee disclosure and great crew communication.',
      name: 'Betty C.',
      location: 'Waynesboro, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Coleman Worldwide Moving provided reliable service for our rural Waynesboro home move with careful antique handling and clear Augusta-area scheduling.',
      name: 'Donald P.',
      location: 'Waynesboro, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  tattnall: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to our Reidsville home and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Reidsville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Tattnall County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Reidsville, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our rural Reidsville home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Glennville, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  putnam: [
    {
      quote:
        'Good Guys Moving confirmed Lake Oconee driveway access before our Eatonton move. Professional crew handled our lake home relocation with careful furniture wrapping.',
      name: 'Patricia H.',
      location: 'Eatonton, GA',
      rating: 5,
      moveType: 'Lake home',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Putnam County move efficiently with clear communication about rural travel time from Middle Georgia.',
      name: 'James R.',
      location: 'Eatonton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Apple Moving Macon handled our lake-property relocation with upfront pricing and careful navigation of steep driveway access.',
      name: 'Susan T.',
      location: 'Madison, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  emanuel: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Swainsboro and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Swainsboro, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Emanuel County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Swainsboro, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Swainsboro home. Finished on schedule with no hidden fees despite the coastal-plain drive.',
      name: 'Dennis K.',
      location: 'Twin City, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  long: [
    {
      quote:
        'Two Men and a Truck Savannah confirmed Ludowici coverage and handled our coastal rural move with careful driveway access planning.',
      name: 'Kim L.',
      location: 'Ludowici, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving served our Long County relocation from their Savannah base with transparent travel pricing and professional packing.',
      name: 'Scott D.',
      location: 'Ludowici, GA',
      rating: 4,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Savannah traveled to Ludowici and finished our coastal move on schedule despite rural marsh-adjacent access challenges.',
      name: 'Angela V.',
      location: 'Ludowici, GA',
      rating: 5,
      moveType: 'Townhome',
    },
  ],
  greene: [
    {
      quote:
        'Good Guys Moving confirmed Greensboro coverage and handled our rural Greene County move with careful driveway access planning.',
      name: 'Robert E.',
      location: 'Greensboro, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Greensboro relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Greensboro, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'University Moving and Storage traveled from Athens to handle our Greene County move with specialty care for antiques and rural property access.',
      name: 'Charles M.',
      location: 'Greensboro, GA',
      rating: 4,
      moveType: 'Historic home',
    },
  ],
  mcduffie: [
    {
      quote:
        'Budget Movers Augusta confirmed Thomson coverage and delivered careful handling for our rural McDuffie County relocation.',
      name: 'Johnny R.',
      location: 'Thomson, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta handled our Thomson move with great communication and no surprise fees despite rural CSRA access challenges.',
      name: 'Wanda G.',
      location: 'Thomson, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'ADSI Moving Augusta provided reliable packing and loading for our McDuffie County home. Finished on schedule with transparent Augusta-area pricing.',
      name: 'Donald P.',
      location: 'Thomson, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  lamar: [
    {
      quote:
        'Wirks Moving Atlanta confirmed Barnesville coverage and handled our rural Lamar County move with careful driveway access planning.',
      name: 'Kim L.',
      location: 'Barnesville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Barnesville and finished our south-metro move on schedule despite rural access challenges.',
      name: 'Scott D.',
      location: 'Barnesville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'All My Sons Atlanta served our Lamar County relocation with transparent travel pricing and professional packing from their Atlanta base.',
      name: 'Angela V.',
      location: 'Barnesville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  pike: [
    {
      quote:
        'Two Men and a Truck Atlanta confirmed Zebulon coverage and handled our rural Pike County move with great communication throughout.',
      name: 'Laura V.',
      location: 'Zebulon, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Mark the Mover Atlanta served our Pike County relocation with careful furniture wrapping and transparent south-metro travel pricing.',
      name: 'Frank L.',
      location: 'Zebulon, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Zip Moving Atlanta traveled to Zebulon and finished our move on schedule despite rural I-75 corridor access challenges.',
      name: 'Diana S.',
      location: 'Zebulon, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  pierce: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Blackshear and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Blackshear, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Pierce County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Blackshear, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our rural Blackshear home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Patterson, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  mitchell: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Camilla move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Camilla, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Mitchell County coverage and handled our rural relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Camilla, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Camilla move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Pelham, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  elbert: [
    {
      quote:
        'University Moving and Storage handled our Elberton relocation with specialty care for antiques and excellent Northeast Georgia corridor knowledge.',
      name: 'Charles M.',
      location: 'Elberton, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Elbert County move efficiently with clear communication and careful handling of rural property access.',
      name: 'Diana S.',
      location: 'Elberton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Atlanta Home Movers traveled to Elberton and finished our northeast Georgia move on schedule despite rural access challenges.',
      name: 'Frank L.',
      location: 'Elberton, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  worth: [
    {
      quote:
        'HHG Movers provided reliable Southwest Georgia coverage for our Sylvester move with professional packing and clear rural travel pricing.',
      name: 'Tom R.',
      location: 'Sylvester, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Worth County service and delivered careful handling for our rural Sylvester relocation.',
      name: 'Brenda L.',
      location: 'Sylvester, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany handled our Worth County move with great communication and no surprise fees despite rural access challenges.',
      name: 'Carl M.',
      location: 'Poulan, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  dodge: [
    {
      quote:
        'Good Guys Moving confirmed Eastman coverage and handled our rural Dodge County move with careful driveway access planning.',
      name: 'Patricia H.',
      location: 'Eastman, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Eastman relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'James R.',
      location: 'Eastman, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon traveled to Dodge County and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Susan T.',
      location: 'Eastman, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  washington: [
    {
      quote:
        'Good Guys Moving confirmed Sandersville coverage and handled our rural Washington County move with careful furniture wrapping.',
      name: 'Robert E.',
      location: 'Sandersville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Sandersville relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Sandersville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Cicero\'s Moving handled specialty items in our Sandersville move with careful crating and climate-controlled storage options.',
      name: 'Charles M.',
      location: 'Sandersville, GA',
      rating: 4,
      moveType: 'Historic home',
    },
  ],
  crisp: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Cordele move with professional crews and clear I-75 corridor pricing.',
      name: 'Johnny R.',
      location: 'Cordele, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Cordele coverage and delivered careful handling for our rural Crisp County relocation.',
      name: 'Wanda G.',
      location: 'Cordele, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Crisp County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Donald P.',
      location: 'Cordele, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  cook: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Adel move with professional crews and clear rural travel pricing.',
      name: 'Tom R.',
      location: 'Adel, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Adel coverage and delivered careful handling for our rural Cook County relocation.',
      name: 'Brenda L.',
      location: 'Adel, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Cook County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Adel, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  jasper: [
    {
      quote:
        'Wirks Moving Atlanta confirmed Monticello coverage and handled our rural Jasper County move with careful driveway access planning.',
      name: 'Kim L.',
      location: 'Monticello, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Monticello and finished our southeast-metro move on schedule despite rural access challenges.',
      name: 'Scott D.',
      location: 'Monticello, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Atlanta served our Jasper County relocation with transparent travel pricing and professional packing.',
      name: 'Angela V.',
      location: 'Monticello, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  rabun: [
    {
      quote:
        'Atlanta Home Movers confirmed Clayton coverage and handled our mountain Rabun County move with careful route planning on steep roads.',
      name: 'Laura V.',
      location: 'Clayton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Bulldog Movers served our Clayton relocation with professional packing and transparent northeast-metro travel pricing.',
      name: 'Frank L.',
      location: 'Clayton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Rabun County and finished our mountain move on schedule despite narrow road access challenges.',
      name: 'Diana S.',
      location: 'Tiger, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  'ben-hill': [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Fitzgerald move with professional crews and clear rural travel pricing.',
      name: 'Johnny R.',
      location: 'Fitzgerald, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Fitzgerald coverage and delivered careful handling for our rural Ben Hill County relocation.',
      name: 'Wanda G.',
      location: 'Fitzgerald, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Ben Hill County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Donald P.',
      location: 'Fitzgerald, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  oglethorpe: [
    {
      quote:
        'University Moving and Storage handled our Lexington relocation with specialty care for antiques and excellent Athens-corridor knowledge.',
      name: 'Charles M.',
      location: 'Lexington, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Oglethorpe County move efficiently with clear communication and careful handling of rural property access.',
      name: 'Diana S.',
      location: 'Lexington, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Atlanta Home Movers traveled to Lexington and finished our northeast Georgia move on schedule despite rural access challenges.',
      name: 'Frank L.',
      location: 'Lexington, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  brooks: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Quitman move with professional crews and clear Florida-border travel pricing.',
      name: 'Tom R.',
      location: 'Quitman, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Quitman coverage and delivered careful handling for our rural Brooks County relocation.',
      name: 'Brenda L.',
      location: 'Quitman, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Brooks County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Quitman, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  'jeff-davis': [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Hazlehurst and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Hazlehurst, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Jeff Davis County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Hazlehurst, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Hazlehurst home. Finished on schedule with no hidden fees despite the coastal-plain drive.',
      name: 'Dennis K.',
      location: 'Hazlehurst, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  jefferson: [
    {
      quote:
        'Budget Movers Augusta confirmed Louisville coverage and delivered careful handling for our rural Jefferson County relocation.',
      name: 'Johnny R.',
      location: 'Louisville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta handled our Louisville move with great communication and no surprise fees despite rural CSRA access challenges.',
      name: 'Wanda G.',
      location: 'Louisville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'ADSI Moving Augusta provided reliable packing and loading for our Jefferson County home. Finished on schedule with transparent Augusta-area pricing.',
      name: 'Donald P.',
      location: 'Louisville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  screven: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Sylvania and delivered on schedule. Upfront about rural travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Sylvania, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Screven County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Sylvania, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our rural Sylvania home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Sylvania, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  towns: [
    {
      quote:
        'Atlanta Home Movers confirmed Hiawassee coverage and handled our lake Towns County move with careful mountain-road route planning.',
      name: 'Laura V.',
      location: 'Hiawassee, GA',
      rating: 5,
      moveType: 'Lake home',
    },
    {
      quote:
        'Bulldog Movers served our Hiawassee relocation with professional packing and transparent northeast-metro travel pricing.',
      name: 'Frank L.',
      location: 'Hiawassee, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Atlanta traveled to Towns County and finished our mountain move on schedule despite narrow lake-access roads.',
      name: 'Diana S.',
      location: 'Young Harris, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  charlton: [
    {
      quote:
        'Driftwood Moving Brunswick confirmed Folkston coverage and handled our rural Charlton County move with careful Okefenokee corridor planning.',
      name: 'Kim L.',
      location: 'Folkston, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Folkston relocation with transparent travel pricing and professional packing.',
      name: 'Scott D.',
      location: 'Folkston, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'BC Brothers Moving traveled to Charlton County and finished our move on schedule despite the long drive from the Savannah coast.',
      name: 'Angela V.',
      location: 'Folkston, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  mcintosh: [
    {
      quote:
        'Driftwood Moving Brunswick confirmed Darien coverage and handled our coastal McIntosh County move with careful marsh-adjacent access planning.',
      name: 'Patricia H.',
      location: 'Darien, GA',
      rating: 5,
      moveType: 'Coastal home',
    },
    {
      quote:
        'Two Men and a Truck Savannah served our Darien relocation with transparent coastal travel pricing and professional packing.',
      name: 'James R.',
      location: 'Darien, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'BC Brothers Moving traveled to McIntosh County and finished our coastal move on schedule despite rural marsh-road access challenges.',
      name: 'Susan T.',
      location: 'Darien, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  crawford: [
    {
      quote:
        'Good Guys Moving confirmed Knoxville coverage and handled our rural Crawford County move with careful driveway access planning.',
      name: 'Robert E.',
      location: 'Knoxville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Crawford County relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Knoxville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Apple Moving Macon traveled to Crawford County and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Charles M.',
      location: 'Knoxville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  macon: [
    {
      quote:
        'Good Guys Moving confirmed explicit Macon County service to Oglethorpe before move day. Careful crew despite the rural southwest Georgia drive.',
      name: 'Patricia H.',
      location: 'Oglethorpe, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Macon County relocation efficiently with clear communication — not to be confused with Bibb County city moves.',
      name: 'James R.',
      location: 'Oglethorpe, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon handled our rural Oglethorpe move with upfront pricing and reliable packing from their Middle Georgia base.',
      name: 'Susan T.',
      location: 'Oglethorpe, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  candler: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Metter and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Metter, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Candler County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Metter, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Metter home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Metter, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  telfair: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to McRae-Helena and delivered on schedule. Upfront about rural travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'McRae-Helena, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Telfair County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'McRae-Helena, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Telfair County home. Finished on schedule with no surprise fees.',
      name: 'Dennis K.',
      location: 'McRae-Helena, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  dooly: [
    {
      quote:
        'Good Guys Moving confirmed Vienna coverage and handled our rural Dooly County move with careful driveway access planning.',
      name: 'Robert E.',
      location: 'Vienna, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Dooly County relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Vienna, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon traveled to Dooly County and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Charles M.',
      location: 'Vienna, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  evans: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Claxton and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Claxton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Evans County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Claxton, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Claxton home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Claxton, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lanier: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Lakeland move with professional crews and clear rural travel pricing.',
      name: 'Tom R.',
      location: 'Lakeland, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Lakeland coverage and delivered careful handling for our rural Lanier County relocation.',
      name: 'Brenda L.',
      location: 'Lakeland, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Lanier County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Lakeland, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  early: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Blakely move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Blakely, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Early County coverage and handled our rural Blakely relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Blakely, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Blakely move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Blakely, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  pulaski: [
    {
      quote:
        'Good Guys Moving confirmed Hawkinsville coverage and handled our rural Pulaski County move with careful driveway access planning.',
      name: 'Patricia H.',
      location: 'Hawkinsville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Pulaski County relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'James R.',
      location: 'Hawkinsville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon traveled to Hawkinsville and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Susan T.',
      location: 'Hawkinsville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  wilkes: [
    {
      quote:
        'University Moving and Storage handled our Washington historic-home relocation with specialty care for antiques and excellent Northeast Georgia corridor knowledge.',
      name: 'Charles M.',
      location: 'Washington, GA',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Two Men and a Truck Athens served our Wilkes County move efficiently with clear communication and careful handling of rural property access.',
      name: 'Diana S.',
      location: 'Washington, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta covered our Wilkes County move when Athens crews were booked — upfront about CSRA travel time and professional service.',
      name: 'Frank L.',
      location: 'Washington, GA',
      rating: 4,
      moveType: 'Family home',
    },
  ],
  johnson: [
    {
      quote:
        'Good Guys Moving confirmed Wrightsville coverage and handled our rural Johnson County move with careful driveway access planning.',
      name: 'Robert E.',
      location: 'Wrightsville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Johnson County relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Wrightsville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon traveled to Wrightsville and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Charles M.',
      location: 'Wrightsville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  seminole: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Donalsonville move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Donalsonville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Seminole County coverage and handled our rural Donalsonville relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Donalsonville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Donalsonville move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Donalsonville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  turner: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Ashburn move with professional crews and clear I-75 corridor pricing.',
      name: 'Tom R.',
      location: 'Ashburn, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Ashburn coverage and delivered careful handling for our rural Turner County relocation.',
      name: 'Brenda L.',
      location: 'Ashburn, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Turner County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Ashburn, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  irwin: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Ocilla move with professional crews and clear rural travel pricing.',
      name: 'Johnny R.',
      location: 'Ocilla, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Ocilla coverage and delivered careful handling for our rural Irwin County relocation.',
      name: 'Wanda G.',
      location: 'Ocilla, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Irwin County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Donald P.',
      location: 'Ocilla, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  jenkins: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Millen and delivered on schedule. Upfront about rural travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Millen, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Jenkins County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Millen, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'College Hunks Moving Savannah provided reliable packing and loading for our rural Millen home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Millen, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  wilcox: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Abbeville move with professional crews and clear rural travel pricing.',
      name: 'Tom R.',
      location: 'Abbeville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Abbeville coverage and delivered careful handling for our rural Wilcox County relocation.',
      name: 'Brenda L.',
      location: 'Abbeville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Wilcox County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Abbeville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  montgomery: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Mount Vernon and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Mount Vernon, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Montgomery County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Mount Vernon, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Mount Vernon home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Mount Vernon, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hancock: [
    {
      quote:
        'Good Guys Moving confirmed Sparta coverage and handled our rural Hancock County move with careful driveway access planning.',
      name: 'Patricia H.',
      location: 'Sparta, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Sparta relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'James R.',
      location: 'Sparta, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Cicero\'s Moving handled specialty items in our Sparta move with careful crating and climate-controlled storage options.',
      name: 'Charles M.',
      location: 'Sparta, GA',
      rating: 4,
      moveType: 'Historic home',
    },
  ],
  wilkinson: [
    {
      quote:
        'Good Guys Moving confirmed Irwinton coverage and handled our rural Wilkinson County move with careful furniture wrapping.',
      name: 'Robert E.',
      location: 'Irwinton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Irwinton relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'Laura V.',
      location: 'Irwinton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Cicero\'s Moving traveled to Wilkinson County and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Susan T.',
      location: 'Irwinton, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  wheeler: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Alamo and delivered on schedule. Upfront about Southeast Georgia travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Alamo, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Wheeler County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Alamo, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Alamo home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Alamo, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  marion: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Buena Vista coverage and handled our rural Marion County move with careful driveway access planning.',
      name: 'Tom R.',
      location: 'Buena Vista, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Marion County relocation efficiently with clear communication about Fort Moore corridor travel time.',
      name: 'Brenda L.',
      location: 'Buena Vista, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus traveled to Buena Vista and finished our move on schedule with transparent Columbus-area pricing.',
      name: 'Carl M.',
      location: 'Buena Vista, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  twiggs: [
    {
      quote:
        'Good Guys Moving confirmed Jeffersonville coverage and handled our rural Twiggs County move with careful driveway access planning.',
      name: 'Patricia H.',
      location: 'Jeffersonville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Macon served our Twiggs County relocation efficiently with clear communication about Central Georgia travel time.',
      name: 'James R.',
      location: 'Jeffersonville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Simple Moving Solutions Macon traveled to Jeffersonville and finished our move on schedule with transparent Middle Georgia pricing.',
      name: 'Susan T.',
      location: 'Jeffersonville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  clinch: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Homerville move with professional crews and clear rural travel pricing.',
      name: 'Tom R.',
      location: 'Homerville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Homerville coverage and delivered careful handling for our rural Clinch County relocation.',
      name: 'Brenda L.',
      location: 'Homerville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Clinch County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Homerville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  treutlen: [
    {
      quote:
        'Two Men and a Truck Savannah traveled to Soperton and delivered on schedule. Upfront about rural travel time and excellent crew care.',
      name: 'Harold W.',
      location: 'Soperton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'BC Brothers Moving handled our Treutlen County relocation with careful furniture wrapping and transparent pricing despite the long drive from Savannah.',
      name: 'Vicki M.',
      location: 'Soperton, GA',
      rating: 5,
      moveType: 'Townhome',
    },
    {
      quote:
        'Badie Moving Statesboro provided reliable packing for our rural Soperton home. Finished on schedule with no hidden fees.',
      name: 'Dennis K.',
      location: 'Soperton, GA',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  randolph: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Cuthbert move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Cuthbert, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Randolph County coverage and handled our rural Cuthbert relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Cuthbert, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Cuthbert move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Cuthbert, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  miller: [
    {
      quote:
        'HHG Movers confirmed explicit Miller County service to Colquitt before move day — not Colquitt County Moultrie. Careful rural handling.',
      name: 'Wanda G.',
      location: 'Colquitt, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany handled our Miller County relocation with professional packing and clear Southwest Georgia travel pricing.',
      name: 'Johnny R.',
      location: 'Colquitt, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Colquitt move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Colquitt, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  talbot: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Talbotton coverage and handled our rural Talbot County move with careful driveway access planning.',
      name: 'Tom R.',
      location: 'Talbotton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Talbot County relocation efficiently with clear communication about Columbus-area travel time.',
      name: 'Brenda L.',
      location: 'Talbotton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus traveled to Talbotton and finished our move on schedule with transparent West Georgia pricing.',
      name: 'Carl M.',
      location: 'Talbotton, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  calhoun: [
    {
      quote:
        'HHG Movers confirmed explicit Calhoun County service to Morgan before move day — not Morgan County Madison. Professional rural handling.',
      name: 'Wanda G.',
      location: 'Morgan, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany handled our Calhoun County relocation with careful driveway access planning and clear Southwest Georgia pricing.',
      name: 'Johnny R.',
      location: 'Morgan, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Morgan move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Morgan, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  warren: [
    {
      quote:
        'Budget Movers Augusta confirmed Warrenton coverage and delivered careful handling for our rural Warren County relocation.',
      name: 'Johnny R.',
      location: 'Warrenton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta handled our Warrenton move with great communication and no surprise fees despite rural CSRA access challenges.',
      name: 'Wanda G.',
      location: 'Warrenton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'ADSI Moving Augusta provided reliable packing and loading for our Warren County home. Finished on schedule with transparent Augusta-area pricing.',
      name: 'Donald P.',
      location: 'Warrenton, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  chattahoochee: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Cusseta coverage and handled our Fort Moore corridor move with careful military PCS documentation support.',
      name: 'Tom R.',
      location: 'Cusseta, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Chattahoochee County relocation efficiently with clear communication about Columbus-area travel time.',
      name: 'Brenda L.',
      location: 'Cusseta, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus traveled to Cusseta and finished our move on schedule with transparent West Georgia pricing.',
      name: 'Carl M.',
      location: 'Cusseta, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  clarke: [
    {
      quote:
        'University Moving and Storage made our Athens relocation stress-free — excellent UGA move-in experience and careful handling of our faculty housing belongings.',
      name: 'Olivia R.',
      location: 'Athens, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Athens handled our Clarke County apartment move on schedule despite university-area traffic. Transparent pricing throughout.',
      name: 'Nathan B.',
      location: 'Athens, GA',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Zip Moving Atlanta served our Athens relocation with professional packing and clear northeast-metro travel estimates when local crews were booked.',
      name: 'Frank L.',
      location: 'Athens, GA',
      rating: 4,
      moveType: 'Townhome',
    },
    {
      quote:
        'Atlanta Home Movers traveled to Athens and finished our Clarke County move efficiently with great communication and no surprise fees.',
      name: 'Diana S.',
      location: 'Athens, GA',
      rating: 5,
      moveType: 'Historic home',
    },
  ],
  clay: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Fort Gaines move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Fort Gaines, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Clay County coverage and handled our rural Fort Gaines relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Fort Gaines, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Fort Gaines move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Fort Gaines, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  echols: [
    {
      quote:
        'HHG Movers provided reliable South Georgia coverage for our Statenville move with professional crews and clear remote rural travel pricing.',
      name: 'Tom R.',
      location: 'Statenville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Perez Moving confirmed explicit Statenville coverage and delivered careful handling for our rural Echols County relocation.',
      name: 'Brenda L.',
      location: 'Statenville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Mudanza Moving Valdosta served our Echols County move from their Valdosta base with transparent travel estimates and reliable packing.',
      name: 'Carl M.',
      location: 'Statenville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  glascock: [
    {
      quote:
        'Budget Movers Augusta confirmed Gibson coverage and delivered careful handling for our rural Glascock County relocation.',
      name: 'Johnny R.',
      location: 'Gibson, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Augusta handled our Gibson move with great communication and no surprise fees despite extremely rural CSRA access challenges.',
      name: 'Wanda G.',
      location: 'Gibson, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'ADSI Moving Augusta provided reliable packing and loading for our Glascock County home. Finished on schedule with transparent Augusta-area pricing.',
      name: 'Donald P.',
      location: 'Gibson, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  harris: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Hamilton coverage and handled our Fort Moore corridor move with careful military PCS documentation support.',
      name: 'Tom R.',
      location: 'Hamilton, GA',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Harris County relocation efficiently with clear communication about Columbus-area travel time.',
      name: 'Brenda L.',
      location: 'Hamilton, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus traveled to Hamilton and finished our rural move on schedule with transparent West Georgia pricing.',
      name: 'Carl M.',
      location: 'Hamilton, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  lincoln: [
    {
      quote:
        'Budget Movers Augusta confirmed Lincolnton coverage and handled our Clarks Hill lake home relocation with careful driveway access planning.',
      name: 'Patricia H.',
      location: 'Lincolnton, GA',
      rating: 5,
      moveType: 'Lake home',
    },
    {
      quote:
        'Two Men and a Truck Augusta served our Lincoln County move efficiently with clear communication about rural CSRA travel time.',
      name: 'James R.',
      location: 'Lincolnton, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'ADSI Moving Augusta handled our lake-property relocation with upfront pricing and careful navigation of steep driveway access.',
      name: 'Susan T.',
      location: 'Lincolnton, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  quitman: [
    {
      quote:
        'HHG Movers traveled from Albany to serve our Georgetown move with professional crews and clear Southwest Georgia pricing.',
      name: 'Wanda G.',
      location: 'Georgetown, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Home Moving Solution Albany confirmed Quitman County coverage and handled our rural Georgetown relocation with careful driveway access planning.',
      name: 'Johnny R.',
      location: 'Georgetown, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'Two Men and a Truck Albany served our Georgetown move efficiently with transparent travel estimates from their Albany base.',
      name: 'Donald P.',
      location: 'Georgetown, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  schley: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Ellaville coverage and delivered careful handling for our rural Schley County relocation.',
      name: 'Tom R.',
      location: 'Ellaville, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbus handled our Ellaville move with great communication and no surprise fees despite rural West Georgia access challenges.',
      name: 'Brenda L.',
      location: 'Ellaville, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus traveled to Ellaville and finished our move on schedule with transparent Columbus-area pricing.',
      name: 'Carl M.',
      location: 'Ellaville, GA',
      rating: 4,
      moveType: 'Townhome',
    },
  ],
  stewart: [
    {
      quote:
        'Coleman Worldwide Columbus confirmed Lumpkin coverage and delivered careful handling for our rural Stewart County relocation.',
      name: 'Tom R.',
      location: 'Lumpkin, GA',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Two Men and a Truck Columbus served our Stewart County move efficiently with clear communication about Columbus-area travel time.',
      name: 'Brenda L.',
      location: 'Lumpkin, GA',
      rating: 5,
      moveType: 'Family home',
    },
    {
      quote:
        'College Hunks Moving Columbus handled our Lumpkin move with upfront pricing and reliable packing despite remote rural access.',
      name: 'Carl M.',
      location: 'Lumpkin, GA',
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