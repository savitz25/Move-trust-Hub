import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated West Virginia county research — batch 1 large markets */
export const westVirginiaCountyResearch: Record<string, CuratedCountyResearch> = {
  kanawha: {
    marketNotes:
      'Kanawha County is the core of the Charleston metropolitan area with strong governmental, industrial, and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Kanawha County pricing reflects Charleston metro state-capital demand, I-64/I-77 corridor traffic, Kanawha River valley relocation volume, and competition among full-service local agents.',
    },
    tips: [
      'Verify coverage for Charleston, South Hills, St. Albans, and Kanawha Valley communities before booking.',
      'I-64, I-77, and I-79 interchange traffic around the state capital significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, Capitol Complex relocations, and flood-prone Kanawha River properties.',
      'Book early for legislative session turnover, summer moving season, and Marshall/WVU-area spillover demand.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  berkeley: {
    marketNotes:
      'Berkeley County is a growing suburban county in the Eastern Panhandle with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Berkeley County pricing reflects Eastern Panhandle suburban growth, I-81 corridor traffic, DC–Baltimore commuter spillover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Martinsburg, Inwood, Hedgesville, and Eastern Panhandle subdivisions before booking.',
      'I-81 DC–Baltimore commuter corridor traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for new-construction suburban homes and long-driveway Panhandle properties.',
      'Book early for peak seasons (May–September), military PCS turnover, and DC-metro spillover demand.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monongalia: {
    marketNotes:
      'Monongalia County is anchored by West Virginia University with strong educational and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Monongalia County pricing reflects Morgantown university demand, WVU semester turnover, Monongahela River valley traffic, and competition among student-focused and full-service local agents.',
    },
    tips: [
      'Verify coverage for Morgantown, Star City, Westover, and WVU campus-area housing before booking.',
      'University, football game-day, and Monongahela River bridge traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for student housing, hillside neighborhoods, and tight downtown loading zones.',
      'Book early for WVU semester changeover (August and May), summer internships, and fall football weekends.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cabell: {
    marketNotes:
      'Cabell County is the core of the Huntington metropolitan area with strong educational and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Cabell County pricing reflects Huntington tri-state metro demand, Ohio River corridor traffic, Marshall University area volume, and competition among local full-service agents.',
    },
    tips: [
      'Verify coverage for Huntington, Barboursville, and Marshall University area neighborhoods before booking.',
      'I-64 Ohio River bridge and tri-state corridor traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for riverfront properties, historic district moves, and Ohio/Kentucky spillover routes.',
      'Book early for Marshall semester turnover, summer moving season, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wood: {
    marketNotes:
      'Wood County is the core of the Parkersburg metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wood County pricing reflects Parkersburg mid-Ohio Valley demand, Ohio River industrial corridor traffic, and competition among regional full-service local agents.',
    },
    tips: [
      'Verify coverage for Parkersburg, Vienna, and mid-Ohio Valley industrial corridor communities before booking.',
      'I-77 and Ohio River bridge traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for riverfront and petrochemical corridor relocations with proper valuation coverage.',
      'Book early for peak seasons (May–September), plant turnaround season, and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  raleigh: {
    marketNotes:
      'Raleigh County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Raleigh County pricing reflects Beckley regional demand, I-64/I-77 mountain corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Beckley, Crab Orchard, and Southern WV mountain communities before booking.',
      'I-64/I-77 Appalachian corridor and steep-grade access roads impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for coalfield relocations, hillside homes, and long rural driveway access.',
      'Book early for peak seasons (May–September), healthcare sector turnover, and tourism shoulder season.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jefferson: {
    marketNotes:
      'Jefferson County is a suburban county in the Eastern Panhandle with strong residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Jefferson County pricing reflects Charles Town Eastern Panhandle suburban demand, Shenandoah Valley commuter spillover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Charles Town, Ranson, Harpers Ferry, and Shenandoah Valley commuter towns before booking.',
      'US-340 and Eastern Panhandle commuter traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for historic properties, vineyard estates, and new Panhandle subdivision homes.',
      'Book early for peak seasons (May–September), DC-metro spillover demand, and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrison: {
    marketNotes:
      'Harrison County is a key North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Harrison County pricing reflects Clarksburg regional demand, I-79 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Clarksburg, Bridgeport, Shinnston, and North Central I-79 corridor towns before booking.',
      'I-79 and US-50 North Central corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for hillside homes, oil-and-gas corridor relocations, and rural driveway access.',
      'Book early for peak seasons (May–September), energy sector turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mercer: {
    marketNotes:
      'Mercer County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mercer County pricing reflects Princeton regional demand, I-77 coalfields corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Princeton, Bluefield, and Southern WV coalfields communities before booking.',
      'I-77 coalfields corridor and steep mountain access roads impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for coalfield relocations, rural properties, and long-distance Appalachian routes.',
      'Book early for peak seasons (May–September), healthcare turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  putnam: {
    marketNotes:
      'Putnam County is a suburban county in the Charleston metropolitan area with strong residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Putnam County pricing reflects Charleston-metro suburban demand, I-64 corridor traffic through Winfield and Hurricane, and competition among Kanawha Valley and collar-county full-service agents.',
    },
    tips: [
      'Verify coverage for Winfield, Hurricane, Teays Valley, and Charleston-metro collar subdivisions before booking.',
      'I-64 Kanawha Valley commuter traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for new-construction suburban homes, Teays Valley hillside lots, and river-valley properties.',
      'Book early for Charleston-metro spillover demand, summer moving season, and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marion: {
    marketNotes:
      'Marion County is a key North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Marion County pricing reflects Fairmont regional demand, I-79 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Fairmont, Mannington, and I-79 university corridor communities before booking.',
      'I-79 and Fairmont State University area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for student housing, historic downtown properties, and North Central hillside homes.',
      'Book early for university semester changeover, summer moving season, and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ohio: {
    marketNotes:
      'Ohio County is the core of the Wheeling metropolitan area with strong industrial and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Ohio County pricing reflects Wheeling tri-state metro demand, Ohio River industrial corridor traffic, and competition among Northern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Wheeling, Oglebay, and Northern Panhandle tri-state communities before booking.',
      'I-70 Ohio River bridge and Wheeling Island corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for historic downtown properties, riverfront homes, and Ohio/Pennsylvania spillover routes.',
      'Book early for peak seasons (May–September), casino district turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fayette: {
    marketNotes:
      'Fayette County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Fayette County pricing reflects Fayetteville and New River Gorge regional demand, mountain corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Fayetteville, Oak Hill, and New River Gorge gateway communities before booking.',
      'US-19 mountain gorge roads and New River Gorge tourism traffic impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for adventure-tourism area relocations, steep driveway access, and seasonal cabin moves.',
      'Book early for New River Gorge peak season (June–October), rafting tourism weekends, and summer demand.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wayne: {
    marketNotes:
      'Wayne County is a suburban county in the Huntington metropolitan area with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wayne County pricing reflects Huntington-metro collar demand, US-52 corridor traffic, and competition among Cabell County and tri-state full-service agents.',
    },
    tips: [
      'Verify coverage for Wayne, Ceredo, and Huntington-metro collar communities along US-52 before booking.',
      'US-52 tri-state corridor and Huntington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for rural Wayne County properties and Ohio/Kentucky border spillover routes.',
      'Book early for peak seasons (May–September), Cabell-metro spillover demand, and month-end turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  preston: {
    marketNotes:
      'Preston County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Preston County pricing reflects Kingwood regional demand, Cheat River valley traffic patterns, and competition among rural North Central West Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Kingwood, Terra Alta, and Cheat River valley communities before booking.',
      'US-219 mountain roads and Morgantown commuter spillover traffic impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for rural Appalachian properties, farmstead moves, and long gravel-driveway access.',
      'Book early for WVU-area spillover demand, summer moving season, and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greenbrier: {
    marketNotes:
      'Greenbrier County is a key Southeast West Virginia county with strong tourism and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Greenbrier County pricing reflects Lewisburg tourism and residential demand, I-64 corridor traffic, and competition among Southeast West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Lewisburg, White Sulphur Springs, and Greenbrier Valley resort communities before booking.',
      'I-64 resort corridor and Greenbrier Resort tourism traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for historic inn properties, luxury estates, and seasonal second-home relocations.',
      'Book early for Greenbrier Classic season, fall foliage tourism (September–November), and summer demand.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  logan: {
    marketNotes:
      'Logan County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Logan County pricing reflects coalfields regional demand, US-119 corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Logan and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  marshall: {
    marketNotes:
      'Marshall County is a key Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Marshall County pricing reflects Moundsville regional demand, Ohio River corridor traffic, and competition among Northern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Moundsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hancock: {
    marketNotes:
      'Hancock County is a key Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hancock County pricing reflects New Cumberland regional demand, Ohio River corridor traffic, and competition among Northern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for New Cumberland and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  jackson: {
    marketNotes:
      'Jackson County is a key Western West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Jackson County pricing reflects Ripley regional demand, I-77 corridor traffic, and competition among Western West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Ripley and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mineral: {
    marketNotes:
      'Mineral County is a rural Eastern Panhandle county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mineral County pricing reflects Keyser regional demand, Potomac Highlands traffic patterns, and competition among Eastern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Keyser and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  randolph: {
    marketNotes:
      'Randolph County is a rural Eastern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Randolph County pricing reflects Elkins regional demand, Monongahela National Forest corridor traffic, and competition among mountain West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Elkins and surrounding areas before booking.',
      'Mountain corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mason: {
    marketNotes:
      'Mason County is a rural Western West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mason County pricing reflects Point Pleasant regional demand, Ohio River corridor traffic, and competition among Western West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Point Pleasant and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hampshire: {
    marketNotes:
      'Hampshire County is a rural Eastern Panhandle county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hampshire County pricing reflects Romney regional demand, Potomac Highlands traffic patterns, and competition among Eastern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Romney and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  upshur: {
    marketNotes:
      'Upshur County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Upshur County pricing reflects Buckhannon regional demand, US-33 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Buckhannon and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nicholas: {
    marketNotes:
      'Nicholas County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Nicholas County pricing reflects Summersville regional demand, Gauley River corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Summersville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mingo: {
    marketNotes:
      'Mingo County is a rural Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Mingo County pricing reflects Williamson regional demand, Tug Fork coalfields corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Williamson and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brooke: {
    marketNotes:
      'Brooke County is a Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Brooke County pricing reflects Wellsburg regional demand, Ohio River corridor traffic, and competition among Northern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Wellsburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  boone: {
    marketNotes:
      'Boone County is a key Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Boone County pricing reflects Madison regional demand, coalfields corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Madison and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wyoming: {
    marketNotes:
      'Wyoming County is a rural Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wyoming County pricing reflects Pineville regional demand, coalfields plateau corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Pineville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lincoln: {
    marketNotes:
      'Lincoln County is a suburban county in the Huntington metropolitan area with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lincoln County pricing reflects Huntington-metro collar demand, US-119 corridor traffic, and competition among Cabell County and tri-state full-service agents.',
    },
    tips: [
      'Verify coverage for Hamlin and surrounding areas before booking.',
      'Huntington-area traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  morgan: {
    marketNotes:
      'Morgan County is a rural Eastern Panhandle county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Morgan County pricing reflects Berkeley Springs regional demand, Potomac Highlands traffic patterns, and competition among Eastern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Berkeley Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mcdowell: {
    marketNotes:
      'McDowell County is a rural Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'McDowell County pricing reflects Welch regional demand, southern coalfields corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Welch and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lewis: {
    marketNotes:
      'Lewis County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Lewis County pricing reflects Weston regional demand, I-79 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Weston and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  taylor: {
    marketNotes:
      'Taylor County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Taylor County pricing reflects Grafton regional demand, US-119 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Grafton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  barbour: {
    marketNotes:
      'Barbour County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Barbour County pricing reflects Philippi regional demand, US-119 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Philippi and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hardy: {
    marketNotes:
      'Hardy County is a rural Eastern Panhandle county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Hardy County pricing reflects Moorefield regional demand, South Branch Valley traffic patterns, and competition among Eastern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Moorefield and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wetzel: {
    marketNotes:
      'Wetzel County is a rural Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wetzel County pricing reflects New Martinsville regional demand, Ohio River corridor traffic, and competition among Northern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for New Martinsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roane: {
    marketNotes:
      'Roane County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Roane County pricing reflects Spencer regional demand, I-79 corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Spencer and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  monroe: {
    marketNotes:
      'Monroe County is a rural Southeast West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Monroe County pricing reflects Union regional demand, US-219 corridor traffic, and competition among Southeast West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Union and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  braxton: {
    marketNotes:
      'Braxton County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Braxton County pricing reflects Sutton regional demand, Sutton Lake corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Sutton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  summers: {
    marketNotes:
      'Summers County is a rural Southern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Summers County pricing reflects Hinton regional demand, New River Gorge corridor traffic, and competition among Southern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Hinton and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grant: {
    marketNotes:
      'Grant County is a rural Eastern Panhandle county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Grant County pricing reflects Petersburg regional demand, Potomac Highlands traffic patterns, and competition among Eastern Panhandle full-service local agents.',
    },
    tips: [
      'Verify coverage for Petersburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  ritchie: {
    marketNotes:
      'Ritchie County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Ritchie County pricing reflects Harrisville regional demand, US-50 corridor traffic, and competition among North Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Harrisville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tyler: {
    marketNotes:
      'Tyler County is a rural Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Tyler County pricing reflects Middlebourne regional demand, Ohio River corridor traffic, and competition among Northern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Middlebourne and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  doddridge: {
    marketNotes:
      'Doddridge County is a rural North Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Doddridge County pricing reflects West Union regional demand, rural North Central corridor traffic, and competition among local full-service agents.',
    },
    tips: [
      'Verify coverage for West Union and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  webster: {
    marketNotes:
      'Webster County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Webster County pricing reflects Webster Springs regional demand, mountain corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Webster Springs and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pocahontas: {
    marketNotes:
      'Pocahontas County is a rural Eastern West Virginia county with strong tourism and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pocahontas County pricing reflects Marlinton tourism and residential demand, Allegheny Highlands corridor traffic, and competition among mountain West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Marlinton and surrounding areas before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak tourist seasons (June–October) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clay: {
    marketNotes:
      'Clay County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Clay County pricing reflects Clay regional demand, Elk River corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Clay and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pleasants: {
    marketNotes:
      'Pleasants County is a small rural Northern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pleasants County pricing reflects St. Marys regional demand, Ohio River corridor traffic, and competition among Northern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for St. Marys and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gilmer: {
    marketNotes:
      'Gilmer County is a rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Gilmer County pricing reflects Glenville regional demand, Little Kanawha corridor traffic, and competition among Central West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Glenville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tucker: {
    marketNotes:
      'Tucker County is a rural Eastern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Tucker County pricing reflects Parsons regional demand, Allegheny Highlands corridor traffic, and competition among mountain West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Parsons and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calhoun: {
    marketNotes:
      'Calhoun County is a small rural Central West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Calhoun County pricing reflects Grantsville regional demand, rural Central West Virginia corridor traffic, and competition among local full-service agents.',
    },
    tips: [
      'Verify coverage for Grantsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pendleton: {
    marketNotes:
      'Pendleton County is a rural Eastern West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Pendleton County pricing reflects Franklin regional demand, Potomac Highlands corridor traffic, and competition among Eastern West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Franklin and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wirt: {
    marketNotes:
      'Wirt County is a small rural Western West Virginia county with residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wirt County pricing reflects Elizabeth regional demand, Little Kanawha corridor traffic, and competition among Western West Virginia full-service local agents.',
    },
    tips: [
      'Verify coverage for Elizabeth and surrounding areas before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons (May–September) and month-end lease turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getWestVirginiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return westVirginiaCountyResearch[countySlug];
}