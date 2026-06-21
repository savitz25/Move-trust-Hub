export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const floridaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  alachua: [
    {
      quote:
        'Moving from a Gainesville apartment near UF during August was stressful, but the crew knew campus-area parking rules and got everything into our new place on Archer Road without damaging the historic hardwood floors.',
      name: 'Daniel K.',
      location: 'Gainesville, FL',
      rating: 5,
      moveType: 'Apartment',
    },
    {
      quote:
        'Our Alachua County ranch outside High Springs had a gravel driveway half a mile long. They brought a smaller truck for the shuttle run and still handled our barn tools and house furniture in one organized day.',
      name: 'Patricia M.',
      location: 'High Springs, FL',
      rating: 5,
      moveType: 'Rural',
    },
  ],
  baker: [
    {
      quote:
        'We relocated within Macclenny on a larger lot off I-10 and worried about access. The movers confirmed truck size ahead of time and navigated our long driveway without tearing up the yard or delaying the closing timeline.',
      name: 'Robert H.',
      location: 'Macclenny, FL',
      rating: 5,
      moveType: 'Single-family',
    },
    {
      quote:
        'Finding movers willing to come out to rural Baker County was tough. This team drove from Jacksonville, coordinated our farm shed contents, and finished the house move faster than we expected on a tight budget.',
      name: 'Linda S.',
      location: 'Glen St. Mary, FL',
      rating: 4,
      moveType: 'Agricultural',
    },
  ],
  bay: [
    {
      quote:
        'Our Panama City Beach condo move required HOA elevator booking and floor protection mats. The crew arrived early, followed every building rule, and kept sand off the lobby while hauling furniture up three flights.',
      name: 'Ashley T.',
      location: 'Panama City Beach, FL',
      rating: 5,
      moveType: 'Condo',
    },
    {
      quote:
        'PCS orders sent us from Tyndall AFB housing to a Lynn Haven home. They understood military timelines, packed efficiently, and had us out before housing inspection without losing a single box in the shuffle.',
      name: 'Marcus W.',
      location: 'Lynn Haven, FL',
      rating: 5,
      moveType: 'Military PCS',
    },
  ],
  bradford: [
    {
      quote:
        'Starke is a small town and our farmhouse had a narrow dirt lane. The movers called ahead about truck access, used a shuttle for the heavy pieces, and treated our older home carefully around tight doorways.',
      name: 'James C.',
      location: 'Starke, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved from a Lake Butler Road property into town near downtown Starke. Regional crews sometimes skip Bradford County, but this team showed up on time and handled our outbuilding tools plus house items together.',
      name: 'Karen L.',
      location: 'Starke, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  brevard: [
    {
      quote:
        'Relocating from a Cocoa Beach condo meant dealing with stairs, salty air, and weekend traffic near the pier. They wrapped everything well, protected the floors, and finished before the afternoon beach crowd arrived.',
      name: 'Nicole B.',
      location: 'Cocoa Beach, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'Our Viera townhome HOA only allowed a four-hour move window. The crew coordinated parking permits, worked fast through the garage, and still labeled every box for our Patrick SFB-area relocation without cutting corners.',
      name: 'Steven R.',
      location: 'Viera, FL',
      rating: 5,
      moveType: 'HOA community',
    },
  ],
  broward: [
    {
      quote:
        'Fort Lauderdale high-rise living means elevator reservations and strict move-in hours. They handled our 22nd-floor condo transfer, protected the lobby marble, and navigated A1A traffic without blowing our building\'s schedule.',
      name: 'Isabella G.',
      location: 'Fort Lauderdale, FL',
      rating: 5,
      moveType: 'High-rise condo',
    },
    {
      quote:
        'Snowbird season made Hollywood beach moves competitive to book. Our crew showed up in January with floor runners, managed the HOA freight elevator, and got our downsized furniture into a smaller oceanfront unit smoothly.',
      name: 'Richard P.',
      location: 'Hollywood, FL',
      rating: 5,
      moveType: 'Snowbird downsizing',
    },
    {
      quote:
        'Pompano Beach to Coral Springs across Broward is no joke on I-95. They planned the route, hit our closing window, and even disassembled patio furniture for our gated community\'s narrow side gate without scratching pavers.',
      name: 'Maria R.',
      location: 'Pompano Beach, FL',
      rating: 4,
      moveType: 'Suburban',
    },
  ],
  calhoun: [
    {
      quote:
        'Blountstown is quiet and our home sits down a long county road. The movers confirmed service area fees upfront, brought appropriate trucks, and carefully moved our porch antiques from a Calhoun County farmhouse.',
      name: 'Dorothy F.',
      location: 'Blountstown, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We expected delays finding movers near the Apalachicola River, but the team from Panama City handled our Blountstown relocation professionally and kept communication clear about rural driveway access the whole day.',
      name: 'Henry J.',
      location: 'Blountstown, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  charlotte: [
    {
      quote:
        'Downsizing into a Punta Gorda canal-front condo meant HOA paperwork and a tight elevator slot. They packed our lifetime of belongings respectfully and had the living room set up before the afternoon rain rolled in.',
      name: 'Barbara N.',
      location: 'Punta Gorda, FL',
      rating: 5,
      moveType: 'Retiree downsizing',
    },
    {
      quote:
        'Our Port Charlotte home near Charlotte Harbor needed hurricane shutters moved too. The crew labeled outdoor items, protected lanai tile, and finished before the gated community\'s evening quiet hours kicked in.',
      name: 'Frank D.',
      location: 'Port Charlotte, FL',
      rating: 5,
      moveType: 'Coastal',
    },
  ],
  citrus: [
    {
      quote:
        'Crystal River waterfront homes can be tricky with dock paths and narrow roads. They planned parking near our canal home, moved kayaks and patio gear, and kept the Nature Coast move organized from start to finish.',
      name: 'Susan E.',
      location: 'Crystal River, FL',
      rating: 5,
      moveType: 'Waterfront',
    },
    {
      quote:
        'We relocated within Inverness near retiree communities with strict move-in days. The team followed every rule, handled our downsizing boxes gently, and finished our Citrus County home transfer ahead of schedule.',
      name: 'Gerald V.',
      location: 'Inverness, FL',
      rating: 4,
      moveType: 'Retiree',
    },
  ],
  clay: [
    {
      quote:
        'Orange Park townhomes near NAS Jacksonville influence mean early morning traffic and HOA forms. Our movers filed the paperwork, used the designated loading zone, and handled a military-family move without chaos.',
      name: 'Jennifer A.',
      location: 'Orange Park, FL',
      rating: 5,
      moveType: 'Military family',
    },
    {
      quote:
        'Moving from Middleburg to Green Cove Springs across Clay County meant crossing busy Blanding Boulevard. They timed the drive well, protected our hardwood floors, and reassembled beds before our kids got home from school.',
      name: 'Chris O.',
      location: 'Middleburg, FL',
      rating: 5,
      moveType: 'Suburban',
    },
  ],
  collier: [
    {
      quote:
        'Naples gated communities do not mess around with move windows. The crew arrived in a clean truck, coordinated with security, and handled our art and dining set with real white-glove care through the golf course neighborhood.',
      name: 'Victoria L.',
      location: 'Naples, FL',
      rating: 5,
      moveType: 'Luxury home',
    },
    {
      quote:
        'Marco Island bridge traffic and condo rules made us nervous. They reserved the freight elevator, protected common areas, and moved our snowbird furniture into a smaller unit before peak winter season rates hit.',
      name: 'Thomas B.',
      location: 'Marco Island, FL',
      rating: 5,
      moveType: 'Snowbird condo',
    },
  ],
  columbia: [
    {
      quote:
        'Lake City sits right on I-10 and our move day had corridor traffic, but the crew still hit every milestone. They handled our ranch outbuilding tools and main house furniture without mixing up labeled boxes.',
      name: 'William Y.',
      location: 'Lake City, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved within Columbia County near downtown Lake City into a newer subdivision. The team confirmed travel fees clearly, protected our driveway, and finished faster than the estimate despite afternoon heat.',
      name: 'Angela Q.',
      location: 'Lake City, FL',
      rating: 4,
      moveType: 'Suburban',
    },
  ],
  desoto: [
    {
      quote:
        'Arcadia citrus country means long driveways and farm equipment nearby. Our movers inventoried the barn tools separately, navigated packed dirt roads carefully, and still completed our farmhouse relocation in one day.',
      name: 'Randy M.',
      location: 'Arcadia, FL',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'Finding full-service movers in DeSoto County felt impossible until this team drove from Sarasota. They were upfront about travel time, handled our LaBelle-border property access, and kept pricing transparent.',
      name: 'Debbie K.',
      location: 'Arcadia, FL',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  dixie: [
    {
      quote:
        'Cross City is remote and our coastal-adjacent lot has limited turnaround space. The movers scouted access first, used a smaller shuttle truck, and moved our screened porch furniture without damaging pine trees along the lane.',
      name: 'Larry H.',
      location: 'Cross City, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated within Dixie County near the Suwannee River and worried about unpaved roads. The crew communicated constantly, padded our antiques well, and finished the house move before dark on a tight timeline.',
      name: 'Sharon P.',
      location: 'Old Town, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  duval: [
    {
      quote:
        'Downtown Jacksonville high-rise moves are brutal with garage height limits and elevator bookings. They coordinated with building management, protected the freight elevator walls, and had us settled in Riverside by evening.',
      name: 'Amanda J.',
      location: 'Jacksonville, FL',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'PCS from NAS Jacksonville to a San Marco bungalow meant bridges and base paperwork. The movers understood military timelines, tracked our shipment carefully, and even helped position nursery furniture before inspection day.',
      name: 'Kevin S.',
      location: 'Jacksonville, FL',
      rating: 5,
      moveType: 'Military PCS',
    },
    {
      quote:
        'Jax Beach salt air and narrow streets near the pier made us nervous about our sectional sofa. They wrapped everything, managed parking permits, and completed our coastal Duval move without a single scratched wall.',
      name: 'Rachel T.',
      location: 'Jacksonville Beach, FL',
      rating: 5,
      moveType: 'Beach community',
    },
  ],
  escambia: [
    {
      quote:
        'Pensacola Beach condos mean stairs, sand, and strict weekend move rules. The crew protected hallways, hauled our grill and patio set carefully, and finished before the afternoon tourists clogged the parking lot.',
      name: 'Brian C.',
      location: 'Pensacola Beach, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'Our NAS Pensacola PCS move had a hard report date. They packed efficiently, labeled military gear separately, and got us from base housing into a Warrington home without the usual moving-day panic.',
      name: 'Melissa F.',
      location: 'Pensacola, FL',
      rating: 5,
      moveType: 'Military PCS',
    },
  ],
  flagler: [
    {
      quote:
        'Palm Coast gated communities require vendor badges and timed entries. Our movers checked in with security, followed golf cart path rules, and relocated our retiree home without damaging the community\'s freshly paved streets.',
      name: 'Carol W.',
      location: 'Palm Coast, FL',
      rating: 5,
      moveType: 'Gated community',
    },
    {
      quote:
        'Moving near the Intracoastal in Flagler Beach meant planning around bridge traffic and HOA forms. They handled lanai furniture, protected tile floors, and finished our downsizing move before snowbird season peak rates.',
      name: 'Edward N.',
      location: 'Flagler Beach, FL',
      rating: 4,
      moveType: 'Coastal downsizing',
    },
  ],
  franklin: [
    {
      quote:
        'St. George Island moves are not simple with bridge access and vacation rentals everywhere. The team planned ferry timing, protected our beach house furniture from sand, and communicated clearly about island logistics all day.',
      name: 'Hannah G.',
      location: 'St. George Island, FL',
      rating: 5,
      moveType: 'Island',
    },
    {
      quote:
        'Our Apalachicola historic cottage has tight doorways and heart pine floors. They moved slowly, padded everything, and treated the Forgotten Coast home like their own instead of rushing through a rural Franklin County job.',
      name: 'Philip R.',
      location: 'Apalachicola, FL',
      rating: 5,
      moveType: 'Historic home',
    },
  ],
  gadsden: [
    {
      quote:
        'Quincy sits just west of Tallahassee and our agricultural property has a quarter-mile driveway. The movers confirmed truck access, moved shop tools and house goods separately, and finished before the afternoon thunderstorms.',
      name: 'Janice U.',
      location: 'Quincy, FL',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'We relocated within Gadsden County near Havana into a smaller home. Regional crews sometimes add travel fees, but this team was transparent, careful with heirlooms, and respectful of our rural neighborhood\'s quiet roads.',
      name: 'Roy D.',
      location: 'Havana, FL',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  gilchrist: [
    {
      quote:
        'Trenton is tiny and our property off SR-26 has red clay and a long lane. They brought the right truck size, shuttled furniture carefully, and completed our Gilchrist County move without tearing up the driveway.',
      name: 'Betty S.',
      location: 'Trenton, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Finding movers for rural Gilchrist felt hopeless until a Gainesville crew agreed to come out. They were honest about travel time, handled our porch swing and house boxes, and stayed organized on a one-day schedule.',
      name: 'Donald M.',
      location: 'Bell, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  glades: [
    {
      quote:
        'Moore Haven by Lake Okeechobee is remote and our driveway floods after rain. The movers checked conditions first, moved ranch supplies and house furniture separately, and finished our Glades County relocation without delays.',
      name: 'Teresa C.',
      location: 'Moore Haven, FL',
      rating: 5,
      moveType: 'Lake region',
    },
    {
      quote:
        'We moved within Glades County near sugar cane fields with almost no local companies available. The regional team drove in prepared, confirmed access on dirt roads, and treated our modest home move seriously.',
      name: 'Jose A.',
      location: 'Moore Haven, FL',
      rating: 4,
      moveType: 'Agricultural',
    },
  ],
  gulf: [
    {
      quote:
        'Port St. Joe beach cottages mean sand tracked everywhere if crews are careless. They laid runners, coordinated our HOA move window, and handled hurricane shutters and indoor furniture in one efficient Gulf County day.',
      name: 'Laura K.',
      location: 'Port St. Joe, FL',
      rating: 5,
      moveType: 'Coastal',
    },
    {
      quote:
        'Our Wewahitchka move involved rural roads and a second home near the coast. The Panama City crew explained travel fees upfront, protected antique cabinets, and finished before summer tourism clogged Highway 98.',
      name: 'Mark B.',
      location: 'Wewahitchka, FL',
      rating: 4,
      moveType: 'Seasonal home',
    },
  ],
  hamilton: [
    {
      quote:
        'Jasper is deep rural North Florida and our farmhouse lane is barely two trucks wide. The movers walked the route first, shuttled carefully, and moved our feed-room tools and house belongings without a single damaged item.',
      name: 'Nancy E.',
      location: 'Jasper, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated within Hamilton County near the Georgia line with limited local options. The crew drove from Live Oak, confirmed unpaved access, and finished our modest home move faster than the written estimate promised.',
      name: 'Harold T.',
      location: 'Jennings, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  hardee: [
    {
      quote:
        'Wauchula ranch life means outbuildings full of tools and a house full of family history. They inventoried everything, moved barn equipment separately, and navigated Hardee County farm roads without getting stuck in soft sand.',
      name: 'Cynthia R.',
      location: 'Wauchula, FL',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our Bowling Green home near citrus groves needed a crew comfortable with agricultural areas. They showed up from Lakeland prepared, handled packing and loading efficiently, and respected our early harvest-season schedule.',
      name: 'Alan P.',
      location: 'Bowling Green, FL',
      rating: 4,
      moveType: 'Agricultural',
    },
  ],
  hendry: [
    {
      quote:
        'LaBelle sits between farmland and the Caloosahatchee, and our property has a long shell driveway. The movers confirmed access, moved shop tools and house goods in order, and finished our Hendry County relocation smoothly.',
      name: 'Gloria H.',
      location: 'LaBelle, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Lake Okeechobee-area moves can be hard to book. This Fort Myers crew drove east, handled our citrus equipment shed and home furniture, and communicated clearly about rural Hendry roads the entire day.',
      name: 'Miguel S.',
      location: 'Clewiston, FL',
      rating: 4,
      moveType: 'Agricultural',
    },
  ],
  hernando: [
    {
      quote:
        'Spring Hill retiree neighborhoods have HOA move forms and tight street parking. The crew submitted paperwork early, protected our driveway pavers, and downsized our Brooksville-area home into a smaller villa without stress.',
      name: 'Helen J.',
      location: 'Spring Hill, FL',
      rating: 5,
      moveType: 'Retiree downsizing',
    },
    {
      quote:
        'Our Nature Coast home near Weeki Wachee has uneven access and lots of lanai furniture. They wrapped outdoor pieces well, navigated Hernando County back roads, and finished before the afternoon storms rolled in.',
      name: 'Paul V.',
      location: 'Brooksville, FL',
      rating: 4,
      moveType: 'Coastal inland',
    },
  ],
  highlands: [
    {
      quote:
        'Sebring lake communities enforce strict move-in windows and golf cart traffic. Our movers coordinated with the HOA, handled downsizing boxes gently, and set up our retiree villa before the evening card club arrived.',
      name: 'Margaret L.',
      location: 'Sebring, FL',
      rating: 5,
      moveType: 'Retiree community',
    },
    {
      quote:
        'Avon Park snowbird season made scheduling tricky, but the crew arrived in January prepared. They moved patio furniture and indoor pieces from our seasonal home efficiently and labeled boxes for easy winter unpacking.',
      name: 'Arthur G.',
      location: 'Avon Park, FL',
      rating: 5,
      moveType: 'Snowbird',
    },
  ],
  hillsborough: [
    {
      quote:
        'Downtown Tampa high-rise moves with Ybor traffic are chaotic. They reserved the freight elevator, protected marble lobby floors, and navigated I-4 congestion to hit our Hyde Park closing window without overtime surprises.',
      name: 'Sofia M.',
      location: 'Tampa, FL',
      rating: 5,
      moveType: 'High-rise',
    },
    {
      quote:
        'Our Brandon subdivision HOA only allows moves on weekdays before 4 p.m. The crew hit the window, disassembled patio sets for a tight side gate, and handled a family relocation across Hillsborough faster than expected.',
      name: 'Jason W.',
      location: 'Brandon, FL',
      rating: 5,
      moveType: 'Suburban HOA',
    },
    {
      quote:
        'Riverview new construction streets were still muddy and tight for trucks. They scouted access first, used floor protection throughout, and moved our four-bedroom home without scratching the builder-fresh interior paint.',
      name: 'Elena C.',
      location: 'Riverview, FL',
      rating: 4,
      moveType: 'New construction',
    },
  ],
  holmes: [
    {
      quote:
        'Bonifay is rural Panhandle country and our farm road turns to mud after rain. The movers checked weather, used a shuttle for heavy furniture, and completed our Holmes County home move without damaging fence posts along the lane.',
      name: 'Ruth A.',
      location: 'Bonifay, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved within Holmes County near Ponce de Leon with almost no local companies listed. The Panama City crew explained travel fees clearly and treated our modest relocation like a priority, not an afterthought.',
      name: 'Earl N.',
      location: 'Ponce de Leon, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  'indian-river': [
    {
      quote:
        'Vero Beach barrier island condos require bridge timing and sand protection. They wrapped furniture thoroughly, followed HOA elevator rules, and finished our snowbird downsizing move before Art Week traffic clogged Ocean Drive.',
      name: 'Diane F.',
      location: 'Vero Beach, FL',
      rating: 5,
      moveType: 'Snowbird condo',
    },
    {
      quote:
        'Our Sebastian riverfront home has a steep driveway and lots of outdoor furniture. The Indian River County crew planned parking, moved lanai pieces carefully, and kept our hardwood floors spotless through the whole day.',
      name: 'George K.',
      location: 'Sebastian, FL',
      rating: 5,
      moveType: 'Waterfront',
    },
  ],
  jackson: [
    {
      quote:
        'Marianna sits near the Alabama line and our rural property has a half-mile driveway. The movers confirmed truck access, handled outbuilding tools separately, and finished our Jackson County relocation without damaging the clay road.',
      name: 'Bonnie H.',
      location: 'Marianna, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated within Marianna near historic homes with tight hallways. The Panama City team padded door frames, moved antiques slowly, and communicated clearly about cross-county travel time before booking.',
      name: 'Walter D.',
      location: 'Marianna, FL',
      rating: 4,
      moveType: 'Historic area',
    },
  ],
  jefferson: [
    {
      quote:
        'Monticello historic homes need patience around original moldings and narrow stairs. The crew padded everything, moved our Tallahassee-adjacent farmhouse antiques carefully, and finished our Jefferson County downsizing move gently.',
      name: 'Virginia S.',
      location: 'Monticello, FL',
      rating: 5,
      moveType: 'Historic downsizing',
    },
    {
      quote:
        'Our rural Jefferson County property off US-19 has a long gravel approach. They confirmed access in advance, shuttled furniture efficiently, and handled agricultural outbuilding contents without mixing them into house boxes.',
      name: 'Claude B.',
      location: 'Monticello, FL',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  lafayette: [
    {
      quote:
        'Mayo is one of Florida\'s smallest county seats and our dirt road floods easily. The movers checked access, used a smaller truck for the lane, and completed our Lafayette County home move without getting stuck or rushing.',
      name: 'Irene M.',
      location: 'Mayo, FL',
      rating: 5,
      moveType: 'Remote rural',
    },
    {
      quote:
        'Finding movers for Mayo felt impossible until a Live Oak crew agreed to come. They were upfront about travel fees, handled our farmhouse furniture respectfully, and finished before dark on a tight one-day timeline.',
      name: 'Leo T.',
      location: 'Mayo, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  lake: [
    {
      quote:
        'Clermont hills and HOA rules on the US-27 corridor made us nervous about timing. The crew coordinated our move window, protected driveway pavers, and handled lake-area patio furniture without scratching the golf community streets.',
      name: 'Michelle P.',
      location: 'Clermont, FL',
      rating: 5,
      moveType: 'HOA community',
    },
    {
      quote:
        'Our Tavares lakefront home has dock steps and tight interior turns. They moved outdoor chairs and indoor pieces in logical order, navigated Lake County traffic on SR-19, and finished before the afternoon boat traffic peaked.',
      name: 'Raymond C.',
      location: 'Tavares, FL',
      rating: 5,
      moveType: 'Lakefront',
    },
  ],
  lee: [
    {
      quote:
        'Fort Myers high-rise condo moves during snowbird season are competitive. They secured the freight elevator, protected lobby tile, and relocated our waterfront furniture before peak winter rates and bridge traffic slowed everything down.',
      name: 'Patricia W.',
      location: 'Fort Myers, FL',
      rating: 5,
      moveType: 'High-rise condo',
    },
    {
      quote:
        'Cape Coral canal homes mean narrow lots and lots of lanai furniture. The crew wrapped outdoor pieces, navigated our dockside neighborhood carefully, and completed our Lee County move without damaging seawall landscaping.',
      name: 'David R.',
      location: 'Cape Coral, FL',
      rating: 5,
      moveType: 'Canal home',
    },
    {
      quote:
        'Sanibel Island access requires bridge planning and strict timing. They coordinated parking, protected floors from sand, and handled our seasonal home closing move faster than we expected for an island relocation.',
      name: 'Linda K.',
      location: 'Sanibel, FL',
      rating: 5,
      moveType: 'Island',
    },
  ],
  leon: [
    {
      quote:
        'Tallahassee student housing near FSU during May move-out is chaos. They navigated campus-area parking, finished our apartment transfer before the lease inspection, and kept boxes labeled for our new Midtown bungalow.',
      name: 'Emily H.',
      location: 'Tallahassee, FL',
      rating: 5,
      moveType: 'Student apartment',
    },
    {
      quote:
        'Our downtown Tallahassee condo move involved garage height limits and state-worker schedule pressure. The crew coordinated elevator time, protected common areas, and had us unpacked enough to sleep by the first night.',
      name: 'Gregory N.',
      location: 'Tallahassee, FL',
      rating: 4,
      moveType: 'Urban condo',
    },
  ],
  levy: [
    {
      quote:
        'Cedar Key island logistics are unique with one bridge and tight streets. The movers planned tide-friendly timing, protected our coastal cottage furniture, and handled the Levy County move without treating it like a mainland job.',
      name: 'Janet L.',
      location: 'Cedar Key, FL',
      rating: 5,
      moveType: 'Island coastal',
    },
    {
      quote:
        'Our Williston ranch has a long dirt lane and separate workshop. They inventoried tools and house goods separately, confirmed truck access on rural Levy roads, and finished before afternoon storms rolled across the pasture.',
      name: 'Howard G.',
      location: 'Williston, FL',
      rating: 4,
      moveType: 'Ranch',
    },
  ],
  liberty: [
    {
      quote:
        'Bristol is remote Panhandle forest country and our driveway is barely paved. The movers scouted access first, shuttled furniture carefully, and completed our Liberty County relocation without damaging the pine-lined approach road.',
      name: 'Frances D.',
      location: 'Bristol, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved within Liberty County near the Apalachicola National Forest with almost no local movers available. The Tallahassee crew explained travel fees clearly and treated our modest home move with real professionalism.',
      name: 'Curtis J.',
      location: 'Bristol, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  madison: [
    {
      quote:
        'Madison County farm properties mean outbuildings and equipment to track. They labeled everything, moved shop tools separately from house boxes, and navigated our I-10 corridor relocation without delaying the closing appointment.',
      name: 'Opal R.',
      location: 'Madison, FL',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'Our Greenville home near the Georgia border needed a crew comfortable with rural routes. The movers confirmed service area, handled heirlooms carefully, and finished our Madison County move on the quoted timeline.',
      name: 'Vernon S.',
      location: 'Greenville, FL',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  manatee: [
    {
      quote:
        'Anna Maria Island moves mean bridge traffic and sand everywhere if crews are sloppy. They protected floors, coordinated our condo elevator slot, and finished our Bradenton-area beach relocation before the weekend tourist rush.',
      name: 'Cheryl A.',
      location: 'Anna Maria, FL',
      rating: 5,
      moveType: 'Island condo',
    },
    {
      quote:
        'Palmetto riverfront homes have tight lots and HOA paperwork. The Manatee County crew submitted forms early, wrapped lanai furniture well, and moved our snowbird downsizing boxes without mixing up seasonal items.',
      name: 'Roger E.',
      location: 'Palmetto, FL',
      rating: 5,
      moveType: 'Snowbird downsizing',
    },
  ],
  marion: [
    {
      quote:
        'Ocala horse country means barn tack and house furniture on the same day. They inventoried the stable gear separately, navigated our farm road carefully, and finished our Marion County relocation without spooking the horses nearby.',
      name: 'Tracy M.',
      location: 'Ocala, FL',
      rating: 5,
      moveType: 'Equestrian property',
    },
    {
      quote:
        'Our retirement community in Marion Oaks has strict move-in hours and golf cart paths everywhere. The crew followed every rule, downsized our home respectfully, and completed the move before the community gate closed.',
      name: 'Norman B.',
      location: 'Ocala, FL',
      rating: 4,
      moveType: 'Retiree community',
    },
  ],
  martin: [
    {
      quote:
        'Stuart waterfront condos along the Intracoastal require dock coordination and HOA forms. They managed parking permits, protected elevator walls, and handled our luxury downsizing move without scratching the building\'s polished common areas.',
      name: 'Jacqueline F.',
      location: 'Stuart, FL',
      rating: 5,
      moveType: 'Waterfront condo',
    },
    {
      quote:
        'Hutchinson Island bridge access and sand protection made us nervous about our sectional sofa. The Martin County crew wrapped everything, timed the move around tide road traffic, and finished before afternoon storms.',
      name: 'Dennis K.',
      location: 'Jensen Beach, FL',
      rating: 5,
      moveType: 'Barrier island',
    },
  ],
  'miami-dade': [
    {
      quote:
        'Brickell high-rise moves are a logistics puzzle with valet zones and freight elevators. They coordinated building management, protected marble lobbies, and navigated causeway traffic to finish our condo transfer the same day.',
      name: 'Carlos V.',
      location: 'Miami, FL',
      rating: 5,
      moveType: 'High-rise condo',
    },
    {
      quote:
        'Coral Gables historic homes have tight archways and strict tree-canopy streets. The crew padded door frames, disassembled furniture smartly, and handled our multilingual family move with patience and real attention to detail.',
      name: 'Maria R.',
      location: 'Coral Gables, FL',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Miami Beach oceanfront buildings enforce brutal move windows and parking rules. They arrived before dawn, followed every condo guideline, and got our downsized furniture upstairs without a single hallway complaint from neighbors.',
      name: 'Andrea L.',
      location: 'Miami Beach, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
  ],
  monroe: [
    {
      quote:
        'Key West moves are expensive and complicated with one road in and out. They planned Mile Marker timing, protected our elevated home from tight stairwells, and communicated honestly about Keys logistics before we booked the date.',
      name: 'Samantha P.',
      location: 'Key West, FL',
      rating: 5,
      moveType: 'Keys island',
    },
    {
      quote:
        'Marathon canal homes mean humidity, tight lots, and bridge tolls to coordinate. The crew wrapped furniture well, handled our seasonal closing move efficiently, and treated Monroe County island access like routine business.',
      name: 'Peter H.',
      location: 'Marathon, FL',
      rating: 4,
      moveType: 'Canal home',
    },
  ],
  nassau: [
    {
      quote:
        'Amelia Island historic districts require care around older doorways and porch columns. The movers padded everything, coordinated bridge traffic timing, and completed our Fernandina Beach relocation without damaging the charming streetscape.',
      name: 'Katherine W.',
      location: 'Fernandina Beach, FL',
      rating: 5,
      moveType: 'Historic coastal',
    },
    {
      quote:
        'Yulee suburban growth means new HOA communities with strict move rules. The Nassau County crew filed paperwork early, protected driveway pavers, and finished our family move from Jacksonville-adjacent neighborhoods ahead of schedule.',
      name: 'Scott M.',
      location: 'Yulee, FL',
      rating: 4,
      moveType: 'Suburban HOA',
    },
  ],
  okaloosa: [
    {
      quote:
        'Destin high-rise beach condos mean sand, stairs, and summer tourist traffic. They protected hallways, reserved the service elevator, and finished our Okaloosa County move before the afternoon crowds clogged Highway 98.',
      name: 'Heather C.',
      location: 'Destin, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'Eglin AFB PCS orders gave us a tight window. The movers understood military paperwork, packed efficiently, and moved us from base housing into a Niceville home without the usual moving-day chaos or missed deadlines.',
      name: 'Ryan J.',
      location: 'Fort Walton Beach, FL',
      rating: 5,
      moveType: 'Military PCS',
    },
  ],
  okeechobee: [
    {
      quote:
        'Lake Okeechobee ranch moves involve equipment sheds and long dirt roads. They inventoried tools separately, confirmed truck access on our cattle property, and finished the Okeechobee County home relocation in one organized day.',
      name: 'Betty N.',
      location: 'Okeechobee, FL',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Our rural Okeechobee home near citrus groves needed a crew willing to drive from the Treasure Coast. They were transparent about travel fees, handled heavy furniture carefully, and respected our harvest-season schedule.',
      name: 'Jorge T.',
      location: 'Okeechobee, FL',
      rating: 4,
      moveType: 'Agricultural',
    },
  ],
  orange: [
    {
      quote:
        'Winter Park historic streets are narrow and tree-lined, which makes parking a nightmare. They secured permits, protected original floors, and completed our Orange County bungalow move without damaging the charming curb appeal.',
      name: 'Lauren S.',
      location: 'Winter Park, FL',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Lake Nona medical district townhomes have strict HOA move windows near construction zones. The crew coordinated access, navigated I-4 traffic smartly, and had our family unpacked enough to function by the first evening.',
      name: 'Marcus D.',
      location: 'Orlando, FL',
      rating: 5,
      moveType: 'Suburban HOA',
    },
    {
      quote:
        'International Drive area apartments see constant turnover and elevator bottlenecks. They reserved freight time, labeled boxes clearly, and handled our theme-park corridor relocation faster than other quotes we received locally.',
      name: 'Priya K.',
      location: 'Orlando, FL',
      rating: 4,
      moveType: 'Apartment',
    },
  ],
  osceola: [
    {
      quote:
        'Kissimmee tourism corridors mean US-192 traffic and HOA communities everywhere. Our movers timed the drive well, followed the resort-area move rules, and relocated our family home near Disney without blowing the school-night schedule.',
      name: 'Angela R.',
      location: 'Kissimmee, FL',
      rating: 5,
      moveType: 'Suburban family',
    },
    {
      quote:
        'St. Cloud lake homes can have long driveways and weekend fishing traffic. The Osceola County crew planned parking, moved patio gear and indoor furniture in order, and finished before the afternoon storms hit Lake Tohopekaliga.',
      name: 'Timothy B.',
      location: 'St. Cloud, FL',
      rating: 4,
      moveType: 'Lakefront',
    },
  ],
  'palm-beach': [
    {
      quote:
        'Boca Raton luxury high-rises require building approvals and white-glove handling. They coordinated with management, protected elevator interiors, and moved our art and dining set through a strict afternoon freight window flawlessly.',
      name: 'Victoria H.',
      location: 'Boca Raton, FL',
      rating: 5,
      moveType: 'Luxury high-rise',
    },
    {
      quote:
        'Jupiter Intracoastal homes involve dock paths and gated community paperwork. The crew submitted HOA forms early, wrapped outdoor furniture thoroughly, and completed our Palm Beach County downsizing move before snowbird peak season.',
      name: 'Charles M.',
      location: 'Jupiter, FL',
      rating: 5,
      moveType: 'Waterfront downsizing',
    },
    {
      quote:
        'West Palm CityPlace area condos mean parking garages and busy downtown traffic. They navigated I-95 wisely, protected lobby floors, and handled our urban relocation without the overtime charges we feared on a Friday move.',
      name: 'Natalie F.',
      location: 'West Palm Beach, FL',
      rating: 5,
      moveType: 'Urban condo',
    },
  ],
  pasco: [
    {
      quote:
        'Wesley Chapel new subdivisions have construction dust and tight HOA move windows. The Pasco crew protected fresh interior paint, coordinated street parking, and finished our family relocation before the school bus route changed.',
      name: 'Melissa G.',
      location: 'Wesley Chapel, FL',
      rating: 5,
      moveType: 'New suburban',
    },
    {
      quote:
        'New Port Richey retiree communities along the Gulf coast have strict timing rules. They downsized our home respectfully, handled lanai furniture carefully, and navigated SR-54 traffic without delaying our closing appointment.',
      name: 'Harold W.',
      location: 'New Port Richey, FL',
      rating: 4,
      moveType: 'Retiree downsizing',
    },
  ],
  pinellas: [
    {
      quote:
        'Clearwater Beach high-rises mean causeway traffic and sand protection mats. They reserved the freight elevator, wrapped furniture thoroughly, and completed our Pinellas barrier-island move before the weekend tourist parking nightmare began.',
      name: 'Susan T.',
      location: 'Clearwater Beach, FL',
      rating: 5,
      moveType: 'Beach high-rise',
    },
    {
      quote:
        'St. Petersburg historic bungalows have tight hallways and prized original floors. The crew padded everything, navigated I-275 smartly between neighborhoods, and finished our urban Pinellas move without scuffing a single baseboard.',
      name: 'Michael A.',
      location: 'St. Petersburg, FL',
      rating: 5,
      moveType: 'Historic bungalow',
    },
    {
      quote:
        'Snowbird season in Indian Rocks Beach made booking hard, but the team delivered. They followed condo HOA rules, protected common areas from sand, and downsized our winter home into a smaller Gulf-front unit smoothly.',
      name: 'Barbara C.',
      location: 'Indian Rocks Beach, FL',
      rating: 5,
      moveType: 'Snowbird condo',
    },
  ],
  polk: [
    {
      quote:
        'Lakeland historic districts near Munn Park have tight streets and older homes. The crew padded doorways, navigated I-4 corridor traffic wisely, and completed our Polk County bungalow move without damaging original trim work.',
      name: 'Rebecca L.',
      location: 'Lakeland, FL',
      rating: 5,
      moveType: 'Historic home',
    },
    {
      quote:
        'Winter Haven lake-chain homes mean docks, patio gear, and HOA neighborhoods. They moved outdoor furniture first, protected tile floors inside, and finished our family relocation across Polk County ahead of the quoted timeline.',
      name: 'Keith P.',
      location: 'Winter Haven, FL',
      rating: 4,
      moveType: 'Lakefront',
    },
  ],
  putnam: [
    {
      quote:
        'Palatka along the St. Johns River has older homes and narrow downtown streets. The movers coordinated parking, handled our riverfront porch furniture carefully, and completed the Putnam County move without damaging historic siding.',
      name: 'Darlene K.',
      location: 'Palatka, FL',
      rating: 5,
      moveType: 'Riverfront',
    },
    {
      quote:
        'Our rural Putnam property near Interlachen has a long sandy driveway. The Jacksonville crew explained travel fees upfront, shuttled furniture efficiently, and treated our modest relocation with consistent communication all day.',
      name: 'Eugene R.',
      location: 'Interlachen, FL',
      rating: 4,
      moveType: 'Rural',
    },
  ],
  'santa-rosa': [
    {
      quote:
        'Navarre Beach moves require bridge planning and serious sand protection. They laid runners in the condo lobby, coordinated our HOA elevator slot, and finished before summer military families flooded the parking areas nearby.',
      name: 'Tiffany S.',
      location: 'Navarre, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'Milton suburban growth means new HOAs and busy US-98 traffic. The Santa Rosa crew filed move forms early, protected our driveway, and relocated our family home from Gulf Breeze without missing the kids\' school night routine.',
      name: 'Brandon H.',
      location: 'Milton, FL',
      rating: 4,
      moveType: 'Suburban family',
    },
  ],
  sarasota: [
    {
      quote:
        'Siesta Key powder-sand streets ruin floors if movers are careless. They used heavy runners, coordinated our condo move window, and handled beach furniture and art pieces with the care our Sarasota island home deserved.',
      name: 'Ellen D.',
      location: 'Siesta Key, FL',
      rating: 5,
      moveType: 'Island condo',
    },
    {
      quote:
        'Lakewood Ranch gated communities have strict vendor check-in and golf cart traffic. The crew arrived early, followed every HOA rule, and completed our Sarasota County family relocation without damaging the freshly landscaped streets.',
      name: 'Jonathan W.',
      location: 'Lakewood Ranch, FL',
      rating: 5,
      moveType: 'Gated suburban',
    },
    {
      quote:
        'Downtown Sarasota high-rise arts district moves mean elevator reservations and tight scheduling. They protected lobby finishes, navigated seasonal traffic on US-41, and downsized our waterfront condo efficiently before gallery weekend crowds.',
      name: 'Catherine B.',
      location: 'Sarasota, FL',
      rating: 5,
      moveType: 'Urban condo',
    },
  ],
  seminole: [
    {
      quote:
        'Lake Mary tech-corridor townhomes have HOA move forms and I-4 noise all day. The Seminole crew coordinated our window, protected garage epoxy floors, and finished our family relocation before the evening commuter crush.',
      name: 'Nicole J.',
      location: 'Lake Mary, FL',
      rating: 5,
      moveType: 'Suburban townhome',
    },
    {
      quote:
        'Sanford historic downtown streets are tight near the riverwalk. They secured parking, padded older door frames carefully, and moved our Oviedo-to-Sanford transfer across Seminole County without damaging the charming brick storefront district.',
      name: 'Patrick O.',
      location: 'Sanford, FL',
      rating: 4,
      moveType: 'Historic area',
    },
  ],
  'st-johns': [
    {
      quote:
        'St. Augustine historic district homes require preservation-sensitive handling around coquina walls and narrow stairs. The crew moved slowly, padded everything, and completed our Old City relocation without a single chipped archway corner.',
      name: 'Hannah M.',
      location: 'St. Augustine, FL',
      rating: 5,
      moveType: 'Historic district',
    },
    {
      quote:
        'Ponte Vedra gated communities and beach traffic near Nocatee make timing tricky. They coordinated HOA access, protected marble entry floors, and finished our St. Johns County luxury downsizing move before the afternoon school pickup rush.',
      name: 'Robert L.',
      location: 'Ponte Vedra Beach, FL',
      rating: 5,
      moveType: 'Luxury downsizing',
    },
  ],
  'st-lucie': [
    {
      quote:
        'Port St. Lucie golf communities have cart paths and strict move-in calendars. The crew followed every HOA rule, handled our retiree downsizing gently, and finished before the Treasure Coast afternoon storms rolled inland.',
      name: 'Shirley A.',
      location: 'Port St. Lucie, FL',
      rating: 5,
      moveType: 'Golf community',
    },
    {
      quote:
        'Fort Pierce waterfront condos mean bridge timing and humidity challenges. They wrapped furniture well, coordinated elevator reservations, and completed our St. Lucie coastal move without damaging the building\'s polished common areas.',
      name: 'Albert C.',
      location: 'Fort Pierce, FL',
      rating: 4,
      moveType: 'Waterfront condo',
    },
  ],
  sumter: [
    {
      quote:
        'The Villages has rules about golf carts, move hours, and community gates that confuse newcomers. Our movers knew the process, checked in properly, and downsized our home into a villa without a single HOA violation notice.',
      name: 'Dorothy E.',
      location: 'The Villages, FL',
      rating: 5,
      moveType: 'Retiree community',
    },
    {
      quote:
        'Bushnell rural properties near I-75 still need careful planning for truck access. The Sumter County crew confirmed driveway suitability, handled patio furniture and indoor boxes efficiently, and respected our tight closing timeline.',
      name: 'Frank P.',
      location: 'Bushnell, FL',
      rating: 4,
      moveType: 'Rural retiree',
    },
  ],
  suwannee: [
    {
      quote:
        'Live Oak sits on the Suwannee River with rural roads and older homes downtown. The movers coordinated parking near the square, handled our farmhouse furniture carefully, and completed the Suwannee County move without weather delays.',
      name: 'Gloria H.',
      location: 'Live Oak, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our Branford river property has a long approach and separate workshop. They inventoried tools separately, confirmed I-10 corridor travel fees upfront, and finished our modest Suwannee relocation faster than expected.',
      name: 'Wayne T.',
      location: 'Branford, FL',
      rating: 4,
      moveType: 'River property',
    },
  ],
  taylor: [
    {
      quote:
        'Perry is Big Bend country with rural highways and agricultural properties everywhere. The movers confirmed unpaved access, moved barn tools and house furniture separately, and finished our Taylor County relocation before dark.',
      name: 'Iris M.',
      location: 'Perry, FL',
      rating: 5,
      moveType: 'Agricultural',
    },
    {
      quote:
        'Coastal Taylor County near Keaton Beach has limited infrastructure and seasonal residents. The Tallahassee crew explained travel time clearly, protected our modest cottage furniture, and treated the remote move seriously.',
      name: 'Lloyd S.',
      location: 'Perry, FL',
      rating: 4,
      moveType: 'Coastal rural',
    },
  ],
  union: [
    {
      quote:
        'Lake Butler is tiny and our property has a half-mile sandy lane. The movers scouted access first, shuttled furniture with a smaller truck, and completed our Union County home move without tearing up the tree-lined driveway.',
      name: 'Pearl K.',
      location: 'Lake Butler, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated within Union County near Raiford with almost no local movers listed online. The Gainesville crew was transparent about travel fees and handled our modest home relocation professionally on a one-day schedule.',
      name: 'Clyde B.',
      location: 'Raiford, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  volusia: [
    {
      quote:
        'Daytona Beach condo moves during event weekends are chaotic near the boardwalk. They reserved freight elevator time, protected hallways from sand, and finished our Volusia coastal relocation before Bike Week traffic exploded.',
      name: 'Tammy R.',
      location: 'Daytona Beach, FL',
      rating: 5,
      moveType: 'Beach condo',
    },
    {
      quote:
        'New Smyrna Beach river-to-ocean neighborhoods mean bridge timing and HOA rules. The crew wrapped outdoor furniture well, navigated I-95 wisely, and downsized our home without damaging the charming coastal streetscape.',
      name: 'Henry W.',
      location: 'New Smyrna Beach, FL',
      rating: 5,
      moveType: 'Coastal downsizing',
    },
  ],
  wakulla: [
    {
      quote:
        'Crawfordville is quiet coastal Big Bend country with rural roads and older homes. The Tallahassee movers confirmed travel fees, navigated our long driveway carefully, and finished the Wakulla County relocation before afternoon storms.',
      name: 'Janice L.',
      location: 'Crawfordville, FL',
      rating: 5,
      moveType: 'Rural coastal',
    },
    {
      quote:
        'Our St. Marks area property near the refuge has tight access and lots of outdoor gear. They moved kayaks and porch furniture first, protected floors inside, and communicated clearly about Wakulla\'s limited local mover options.',
      name: 'Russell D.',
      location: 'St. Marks, FL',
      rating: 4,
      moveType: 'Coastal',
    },
  ],
  walton: [
    {
      quote:
        '30A luxury beach homes mean strict HOA windows and sand tracked in seconds. The crew laid protection throughout, coordinated vendor badges, and completed our South Walton relocation before the summer tourism crush on Scenic Highway.',
      name: 'Allison G.',
      location: 'Santa Rosa Beach, FL',
      rating: 5,
      moveType: 'Luxury coastal',
    },
    {
      quote:
        'DeFuniak Springs historic lake circle homes have tight turns and older porches. The Walton County movers padded railings, handled antiques carefully, and finished our inland-to-coast move without damaging the charming downtown streets.',
      name: 'Gerald F.',
      location: 'DeFuniak Springs, FL',
      rating: 4,
      moveType: 'Historic home',
    },
  ],
  washington: [
    {
      quote:
        'Chipley is rural Panhandle country and our farmhouse lane turns to mud after rain. The movers checked conditions, shuttled furniture carefully, and completed our Washington County relocation without getting stuck or rushing the job.',
      name: 'Mabel C.',
      location: 'Chipley, FL',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved within Washington County near Vernon with limited local companies available. The Panama City crew explained cross-county travel clearly and handled our modest home move professionally on a tight one-day timeline.',
      name: 'Otis J.',
      location: 'Vernon, FL',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
};

export function getFloridaCountyTestimonials(countySlug: string): CountyTestimonialEntry[] {
  return floridaCountyTestimonials[countySlug] ?? [];
}