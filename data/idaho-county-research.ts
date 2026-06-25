import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Idaho county research — 44/44 complete */
export const idahoCountyResearch: Record<string, CuratedCountyResearch> = {
  ada: {
    marketNotes:
      'Ada County anchors Idaho’s highest-value market — the fast-growing Boise metro. Tech-sector corporate relocations, Treasure Valley suburban family moves, and rapid population growth along I-84 distinguish Ada from rural Idaho counties and tourism-focused resort markets.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Ada County pricing reflects Boise metro demand, I-84 Treasure Valley corridor traffic, tech-sector growth, and competition among full-service agents serving Ada County communities.',
    },
    tips: [
      'Verify coverage for Boise, Meridian, Eagle, and surrounding cities before booking.',
      'Treasure Valley traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  canyon: {
    marketNotes:
      'Canyon County is Idaho’s second-highest-value market — the rapidly growing western Treasure Valley centered on Nampa and Caldwell. Boise metro spillover, affordable suburban growth, and I-84 corridor logistics distinguish Canyon from Ada’s urban core and rural agricultural counties.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Canyon County pricing reflects Nampa and Caldwell suburban demand, Boise metro spillover, I-84 corridor traffic, and competition among full-service agents serving western Treasure Valley communities.',
    },
    tips: [
      'Verify coverage for Nampa, Caldwell, and surrounding cities before booking.',
      'Treasure Valley traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kootenai: {
    marketNotes:
      'Kootenai County anchors northern Idaho’s Coeur d’Alene metro with lakeside residential, tourism, retirement, and outdoor-recreation demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Kootenai County pricing reflects Coeur d’Alene metro demand, north Idaho lakeside communities, Spokane metro spillover, and competition among full-service agents serving Kootenai County.',
    },
    tips: [
      'Verify coverage for Coeur d’Alene, Post Falls, Hayden, and surrounding cities before booking.',
      'North Idaho corridor traffic and seasonal tourism may impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value lakeside and vacation homes.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bonneville: {
    marketNotes:
      'Bonneville County anchors eastern Idaho’s Idaho Falls metro with residential, agricultural, and energy-corridor demand across the upper Snake River plain.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Bonneville County pricing reflects Idaho Falls metro demand, I-15 and US-20 corridor traffic, and competition among regional agents serving eastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Idaho Falls and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'twin-falls': {
    marketNotes:
      'Twin Falls County is the commercial hub of Idaho’s Magic Valley with residential and agricultural demand across Twin Falls and surrounding valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Twin Falls County pricing reflects Magic Valley demand, I-84 corridor traffic, agricultural logistics, and competition among regional agents serving southern Idaho communities.',
    },
    tips: [
      'Verify coverage for Twin Falls and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bannock: {
    marketNotes:
      'Bannock County is an eastern Idaho county centered on Pocatello with residential, university, and Portneuf Valley corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bannock County pricing reflects Pocatello-area demand, I-15 and I-86 corridor traffic, and competition among regional agents serving southeastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Pocatello and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is an eastern Idaho county centered on Rexburg with strong BYU-Idaho university turnover and upper valley residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Madison County pricing reflects Rexburg university-area turnover, upper valley corridor logistics, and competition among regional agents serving eastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Rexburg and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bonner: {
    marketNotes:
      'Bonner County is a northern Idaho county centered on Sandpoint with lakeside residential, tourism, and outdoor-recreation demand across Pend Oreille corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Bonner County pricing reflects Sandpoint-area demand, north Idaho lakeside logistics, seasonal tourism traffic, and competition among full-service agents serving Bonner County communities.',
    },
    tips: [
      'Verify coverage for Sandpoint and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bingham: {
    marketNotes:
      'Bingham County is an eastern Idaho county centered on Blackfoot with residential and agricultural demand across Snake River plain communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bingham County pricing reflects Blackfoot-area demand, US-20 and I-15 corridor traffic, and competition among regional agents serving eastern Idaho agricultural communities.',
    },
    tips: [
      'Verify coverage for Blackfoot and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'nez-perce': {
    marketNotes:
      'Nez Perce County anchors north-central Idaho’s Lewiston metro with residential, port, and Clearwater River confluence corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Nez Perce County pricing reflects Lewiston-area demand, Snake and Clearwater river corridor logistics, and competition among regional agents serving north-central Idaho communities.',
    },
    tips: [
      'Verify coverage for Lewiston and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  latah: {
    marketNotes:
      'Latah County is a north-central Idaho county centered on Moscow with University of Idaho turnover and Palouse agricultural-residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Latah County pricing reflects Moscow university-area turnover, Palouse corridor logistics, and competition among regional agents serving north-central Idaho communities.',
    },
    tips: [
      'Verify coverage for Moscow and surrounding areas before booking.',
      'University-area turnover (semester start/end) may affect scheduling — confirm peak-season crew availability.',
      'Confirm coverage for student housing, off-campus apartments, and family homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County, ID is an eastern Idaho county centered on Rigby with residential demand across the eastern upper valley between Idaho Falls and Rexburg.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Rigby-area demand, upper valley corridor logistics, and competition among regional agents serving eastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Rigby and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  elmore: {
    marketNotes:
      'Elmore County is a southwestern Idaho county centered on Mountain Home with residential and Mountain Home Air Force Base PCS demand across high-desert corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Elmore County pricing reflects Mountain Home-area demand, I-84 and US-20 corridor traffic, military PCS turnover, and competition among regional agents serving southwestern Idaho communities.',
    },
    tips: [
      'Verify coverage for Mountain Home and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  payette: {
    marketNotes:
      'Payette County is a southwestern Idaho county with residential and agricultural demand across Payette and northern Treasure Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Payette County pricing reflects Payette-area demand, US-95 corridor traffic, and competition among regional agents serving southwestern Idaho communities.',
    },
    tips: [
      'Verify coverage for Payette and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cassia: {
    marketNotes:
      'Cassia County is a southern Magic Valley county centered on Burley with residential and agricultural demand across eastern valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Cassia County pricing reflects Burley-area demand, US-30 corridor traffic, and competition among regional agents serving southern Magic Valley communities.',
    },
    tips: [
      'Verify coverage for Burley and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jerome: {
    marketNotes:
      'Jerome County is a central Magic Valley county with residential and agricultural demand across Jerome and I-84 corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Jerome County pricing reflects Jerome-area demand, Magic Valley corridor traffic, and competition among regional agents serving central southern Idaho communities.',
    },
    tips: [
      'Verify coverage for Jerome and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  blaine: {
    marketNotes:
      'Blaine County anchors Idaho’s Sun Valley resort market with luxury homes, vacation properties, and strong demand across Hailey, Ketchum, and mountain resort communities.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Blaine County pricing reflects Sun Valley resort demand, ski-season turnover, mountain-access logistics, and competition among full-service agents serving Blaine County resort communities.',
    },
    tips: [
      'Verify coverage for Hailey and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  minidoka: {
    marketNotes:
      'Minidoka County is a southern Magic Valley county centered on Rupert with residential and agricultural demand across southern valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Minidoka County pricing reflects Rupert-area demand, US-30 corridor traffic, and competition among regional agents serving southern Magic Valley communities.',
    },
    tips: [
      'Verify coverage for Rupert and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gem: {
    marketNotes:
      'Gem County is a southwestern Idaho county centered on Emmett with residential demand across Payette River valley communities north of the Treasure Valley.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gem County pricing reflects Emmett-area demand, Payette River corridor logistics, Boise metro spillover, and competition among regional agents serving southwestern Idaho communities.',
    },
    tips: [
      'Verify coverage for Emmett and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  idaho: {
    marketNotes:
      'Idaho County, ID spans Grangeville and vast central Idaho rural communities with ranch, timber, and outdoor-recreation demand — not to be confused with the State of Idaho.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Idaho County pricing reflects Grangeville-area demand, remote central Idaho travel distances, and competition among regional agents serving rural mountain corridor communities.',
    },
    tips: [
      'Verify coverage for Grangeville and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gooding: {
    marketNotes:
      'Gooding County is a southern Idaho county with residential and agricultural demand across Gooding and western Magic Valley communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Gooding County pricing reflects Gooding-area demand, US-26 corridor traffic, and competition among regional agents serving southern Idaho communities.',
    },
    tips: [
      'Verify coverage for Gooding and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a southeastern Idaho county centered on Preston with residential and agricultural demand across Cache Valley corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Preston-area demand, US-91 corridor traffic, and competition among regional agents serving southeastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Preston and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shoshone: {
    marketNotes:
      'Shoshone County, ID is a northern Idaho mining and timber county centered on Wallace with residential demand across Silver Valley corridor communities — not to be confused with the city of Shoshone in Lincoln County.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Shoshone County pricing reflects Wallace-area demand, I-90 corridor traffic, mountain-access logistics, and competition among regional agents serving northern Idaho Silver Valley communities.',
    },
    tips: [
      'Verify coverage for Wallace and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boundary: {
    marketNotes:
      'Boundary County is Idaho’s northern panhandle county centered on Bonners Ferry with residential, timber, and cross-border corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Boundary County pricing reflects Bonners Ferry-area demand, US-95 corridor traffic, and competition among regional agents serving Idaho panhandle communities.',
    },
    tips: [
      'Verify coverage for Bonners Ferry and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fremont: {
    marketNotes:
      'Fremont County, ID is an eastern Idaho county centered on St. Anthony with residential and agricultural demand across Henry’s Fork and Island Park corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Fremont County pricing reflects St. Anthony-area demand, US-20 corridor traffic, and competition among regional agents serving eastern upper valley communities.',
    },
    tips: [
      'Verify coverage for St. Anthony and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  teton: {
    marketNotes:
      'Teton County anchors Idaho’s Teton Valley resort gateway with strong residential, tourism, and second-home demand across Driggs, Victor, and mountain corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Teton County pricing reflects Driggs-area resort demand, Teton Pass corridor traffic, ski-season turnover, and competition among full-service agents serving Teton Valley communities.',
    },
    tips: [
      'Verify coverage for Driggs and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  valley: {
    marketNotes:
      'Valley County is a central Idaho lakes and mountain county centered on Cascade with tourism, vacation-home, and residential demand across Payette Lakes corridor communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$185/hr for a 2-person crew',
      note: 'Valley County pricing reflects Cascade-area demand, Payette Lakes tourism-season traffic, mountain-access logistics, and competition among full-service agents serving central Idaho resort communities.',
    },
    tips: [
      'Verify coverage for Cascade and surrounding areas before booking.',
      'Resort-season congestion and ski-town traffic significantly impact scheduling — confirm peak-season crew availability.',
      'Mountain-home and vacation-rental logistics require route planning — confirm parking permits, elevator reservations, and driveway access.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  owyhee: {
    marketNotes:
      'Owyhee County is Idaho’s vast southwestern high-desert county with ranch, agricultural, and remote residential demand across Murphy and Owyhee Mountains corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Owyhee County pricing reflects Murphy-area demand, long rural travel distances, and competition among regional agents serving southwestern Idaho high-desert communities.',
    },
    tips: [
      'Verify coverage for Murphy and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County, ID is a southwestern Idaho county centered on Weiser with residential and agricultural demand across US-95 corridor communities — not to be confused with Washington State.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Washington County pricing reflects Weiser-area demand, US-95 corridor traffic, and competition among regional agents serving southwestern Idaho border communities.',
    },
    tips: [
      'Verify coverage for Weiser and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  benewah: {
    marketNotes:
      'Benewah County is a northern Idaho county centered on St. Maries with residential and timber demand across St. Joe River corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Benewah County pricing reflects St. Maries-area demand, US-95 corridor traffic, and competition among regional agents serving northern Idaho panhandle communities.',
    },
    tips: [
      'Verify coverage for St. Maries and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clearwater: {
    marketNotes:
      'Clearwater County is a north-central Idaho county centered on Orofino with residential, timber, and Clearwater River corridor demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clearwater County pricing reflects Orofino-area demand, US-12 corridor traffic, and competition among regional agents serving north-central Idaho river communities.',
    },
    tips: [
      'Verify coverage for Orofino and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boise: {
    marketNotes:
      'Boise County, ID spans Idaho City and mountain basin communities north of the Treasure Valley — not to be confused with Ada County or the City of Boise.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Boise County pricing reflects Idaho City-area demand, mountain-access logistics, Boise metro spillover, and competition among regional agents serving Treasure Valley fringe communities.',
    },
    tips: [
      'Verify coverage for Idaho City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lemhi: {
    marketNotes:
      'Lemhi County is a central Idaho county centered on Salmon with ranch, timber, and Salmon River corridor demand across vast rural mountain communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lemhi County pricing reflects Salmon-area demand, US-93 corridor traffic, remote travel distances, and competition among regional agents serving central Idaho river communities.',
    },
    tips: [
      'Verify coverage for Salmon and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  power: {
    marketNotes:
      'Power County is an eastern Idaho county centered on American Falls with residential and agricultural demand across Snake River plain communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Power County pricing reflects American Falls-area demand, I-86 corridor traffic, and competition among regional agents serving southeastern Idaho agricultural communities.',
    },
    tips: [
      'Verify coverage for American Falls and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caribou: {
    marketNotes:
      'Caribou County is an eastern Idaho county centered on Soda Springs with residential and agricultural demand across Caribou Highlands corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Caribou County pricing reflects Soda Springs-area demand, US-30 corridor traffic, and competition among regional agents serving eastern Idaho highland communities.',
    },
    tips: [
      'Verify coverage for Soda Springs and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'bear-lake': {
    marketNotes:
      'Bear Lake County is a southeastern Idaho county centered on Paris with lakeside residential, tourism, and agricultural demand across Bear Lake shore communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Bear Lake County pricing reflects Paris-area demand, US-89 corridor traffic, seasonal lakeside tourism, and competition among regional agents serving southeastern Idaho communities.',
    },
    tips: [
      'Verify coverage for Paris and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County, ID is a Magic Valley county centered on the city of Shoshone with residential and agricultural demand — not to be confused with Shoshone County in northern Idaho.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Shoshone-area demand, US-26 corridor traffic, and competition among regional agents serving central Magic Valley communities.',
    },
    tips: [
      'Verify coverage for Shoshone and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  oneida: {
    marketNotes:
      'Oneida County is a southeastern Idaho county centered on Malad City with residential and agricultural demand across Malad Valley corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Oneida County pricing reflects Malad City-area demand, US-91 corridor traffic, and competition among regional agents serving southeastern Idaho border communities.',
    },
    tips: [
      'Verify coverage for Malad City and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  adams: {
    marketNotes:
      'Adams County, ID is a west-central Idaho county centered on Council with ranch and residential demand across Weiser River corridor communities — not to be confused with Adams County, Colorado.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Adams County pricing reflects Council-area demand, US-95 corridor traffic, and competition among regional agents serving west-central Idaho rural communities.',
    },
    tips: [
      'Verify coverage for Council and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  custer: {
    marketNotes:
      'Custer County, ID is a vast central Idaho mountain county centered on Challis with ranch, mining, and remote residential demand — not to be confused with Custer County, Colorado.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Custer County pricing reflects Challis-area demand, US-93 corridor traffic, remote mountain travel distances, and competition among regional agents serving central Idaho communities.',
    },
    tips: [
      'Verify coverage for Challis and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County, ID is a north-central Idaho county centered on Nezperce with agricultural and residential demand across Camas Prairie corridor communities — not to be confused with Lewis County, Washington.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Lewis County pricing reflects Nezperce-area demand, US-95 corridor traffic, and competition among regional agents serving north-central Idaho prairie communities.',
    },
    tips: [
      'Verify coverage for Nezperce and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  butte: {
    marketNotes:
      'Butte County, ID is a remote central Idaho county centered on Arco with ranch, nuclear-site, and high-desert residential demand — not to be confused with Butte County, California.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Butte County pricing reflects Arco-area demand, US-20/26 corridor traffic, remote travel distances, and competition among regional agents serving central Idaho high-desert communities.',
    },
    tips: [
      'Verify coverage for Arco and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  camas: {
    marketNotes:
      'Camas County is a small southern Idaho county centered on Fairfield with ranch and agricultural demand across Camas Prairie corridor communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Camas County pricing reflects Fairfield-area demand, US-20 corridor traffic, and competition among regional agents serving southern Idaho prairie communities.',
    },
    tips: [
      'Verify coverage for Fairfield and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clark: {
    marketNotes:
      'Clark County, ID is a small eastern Idaho county centered on Dubois with ranch and agricultural demand across the northern upper valley — not to be confused with Clark County, Nevada.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Clark County pricing reflects Dubois-area demand, US-20 corridor traffic, and competition among regional agents serving eastern Idaho rural communities.',
    },
    tips: [
      'Verify coverage for Dubois and surrounding areas before booking.',
      'Rural travel distances and limited crew availability may affect scheduling — confirm arrival windows and route access.',
      'Confirm coverage for ranch properties, long driveways, and outbuildings before booking.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getIdahoCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return idahoCountyResearch[countySlug];
}
