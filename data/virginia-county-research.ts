import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Virginia county research â€” batches 1-10 complete curation */
export const virginiaCountyResearch: Record<string, CuratedCountyResearch> = {
  'fairfax-city': {
    marketNotes:
      'Fairfax City is an independent city surrounded by Fairfax County with strong DC-metro commuter, townhouse, and single-family residential demand.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Fairfax City pricing reflects Northern Virginia urban-suburban demand, Old Town Fairfax access constraints, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Old Town Fairfax, George Mason University area, and surrounding neighborhoods before booking.',
      'I-66 and Route 123 corridor traffic significantly impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value townhomes and narrow-street loading zones in the city core.',
      'Book early for peak seasons (May-September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fairfax: {
    marketNotes:
      'Fairfax County is one of Virginia's largest and wealthiest counties with strong suburban, corporate, and residential demand across Northern Virginia and the Washington DC metro.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Fairfax County pricing reflects Northern Virginia suburban demand, I-66/I-495 corridor traffic, high-value home relocations, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Fairfax, Vienna, Reston, and surrounding areas before booking.',
      'Heavy urban and interstate traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May-September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-william': {
    marketNotes:
      'Prince William County is a large and rapidly growing suburban county with strong residential and commercial demand across Manassas, Woodbridge, and the Northern Virginia corridor.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Prince William County pricing reflects Northern Virginia suburban growth, I-95 corridor traffic, Manassas and Woodbridge relocation volume, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Manassas, Woodbridge, and surrounding areas before booking.',
      'Heavy Northern Virginia traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May-September), federal PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  loudoun: {
    marketNotes:
      'Loudoun County is one of the fastest-growing and most affluent counties in the United States with strong suburban residential demand across Leesburg, Ashburn, and Sterling.',
    costs: {
      studioRange: '$950-$2,000',
      familyRange: '$3,800-$9,000+',
      avgHourly: '$135-$210/hr for a 2-person crew',
      note: 'Loudoun County pricing reflects Dulles corridor affluence, data-center and tech-sector relocation volume, Route 7 and Route 28 traffic, and competition among premium full-service NOVA agents.',
    },
    tips: [
      'Verify coverage for Leesburg, Ashburn, Sterling, and surrounding areas before booking.',
      'Heavy Northern Virginia traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and new-construction communities.',
      'Book early for peak seasons (May-September), corporate relocations, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'virginia-beach': {
    marketNotes:
      'Virginia Beach is an independent city and one of the largest in Virginia with strong residential, military, and tourism-related demand across Hampton Roads.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Virginia Beach pricing reflects Hampton Roads coastal demand, military PCS turnover, summer tourist-season volume, and competition among full-service Tidewater agents.',
    },
    tips: [
      'Verify coverage for Virginia Beach and surrounding Hampton Roads areas before booking.',
      'Coastal traffic and tourist seasons impact scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and oceanfront properties.',
      'Book early for peak tourist seasons (June-August), military PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chesterfield: {
    marketNotes:
      'Chesterfield County is a large suburban county south of Richmond with strong residential and commercial demand across Midlothian and the Jefferson Davis corridor.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Chesterfield County pricing reflects Richmond-metro suburban growth, I-95 and Route 288 corridor traffic, and competition among full-service Central Virginia agents.',
    },
    tips: [
      'Verify coverage for Chesterfield, Midlothian, and surrounding areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henrico: {
    marketNotes:
      'Henrico County is a large suburban county surrounding Richmond with strong residential and commercial demand across Short Pump, Glen Allen, and the west end.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Henrico County pricing reflects Richmond-metro suburban growth, Short Pump retail corridor traffic, and competition among full-service Central Virginia agents.',
    },
    tips: [
      'Verify coverage for Henrico, Short Pump, and surrounding areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  chesapeake: {
    marketNotes:
      'Chesapeake is an independent city with extensive residential, military, and industrial demand across Hampton Roads and the Great Bridge corridor.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Chesapeake pricing reflects Hampton Roads suburban sprawl, military PCS turnover, bridge-tunnel corridor traffic, and competition among Tidewater full-service agents.',
    },
    tips: [
      'Verify coverage for Chesapeake and surrounding Hampton Roads areas before booking.',
      'Hampton Roads traffic and bridge-tunnel impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and waterfront properties.',
      'Book early for peak seasons (May-September), military PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  arlington: {
    marketNotes:
      'Arlington County is a dense urban county with strong governmental, corporate, and residential demand across the Washington DC metro.',
    costs: {
      studioRange: '$950-$2,000',
      familyRange: '$3,800-$9,000+',
      avgHourly: '$140-$215/hr for a 2-person crew',
      note: 'Arlington County pricing reflects DC-metro urban density, Pentagon and federal corridor demand, I-395 and Route 1 traffic, and competition among premium full-service NOVA agents.',
    },
    tips: [
      'Verify coverage for Arlington and surrounding Northern Virginia areas before booking.',
      'Heavy DC metro traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes, condos, and high-rise relocations.',
      'Book early for peak seasons (May-September), federal turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  richmond: {
    marketNotes:
      'Richmond is an independent city and the state capital with strong urban, corporate, and residential demand across Central Virginia.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$180/hr for a 2-person crew',
      note: 'Richmond pricing reflects state capital urban demand, historic district access challenges, I-95 and I-64 interchange traffic, and competition among full-service Central Virginia agents.',
    },
    tips: [
      'Verify coverage for Richmond and surrounding metro areas before booking.',
      'Urban traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes and historic district properties.',
      'Book early for peak seasons (May-September) and legislative session turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  norfolk: {
    marketNotes:
      'Norfolk is an independent city and major naval base with strong residential, military, and port-related demand across Hampton Roads.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Norfolk pricing reflects naval base PCS turnover, port and downtown corridor traffic, Ghent and Ocean View relocation volume, and competition among Tidewater full-service agents.',
    },
    tips: [
      'Verify coverage for Norfolk and surrounding Hampton Roads areas before booking.',
      'Hampton Roads traffic and naval operations impact scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military housing relocations.',
      'Book early for peak seasons (May-September), PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'newport-news': {
    marketNotes:
      'Newport News is an independent city with strong shipbuilding, military, and residential demand across the Virginia Peninsula.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Newport News pricing reflects shipyard corridor demand, Peninsula bridge traffic, military PCS turnover, and competition among Hampton Roads full-service agents.',
    },
    tips: [
      'Verify coverage for Newport News and surrounding Peninsula areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and shipyard-area relocations.',
      'Book early for peak seasons (May-September), military PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  stafford: {
    marketNotes:
      'Stafford County is a growing suburban county south of Washington DC with strong residential demand along the I-95 corridor.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Stafford County pricing reflects Northern Virginia southern corridor growth, I-95 commuter traffic, Quantico-area spillover, and competition among full-service NOVA agents.',
    },
    tips: [
      'Verify coverage for Stafford and surrounding areas before booking.',
      'Heavy Northern Virginia traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and new-construction communities.',
      'Book early for peak seasons (May-September), military PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  alexandria: {
    marketNotes:
      'Alexandria is an independent city with dense urban, historic, and residential demand across Old Town and the Washington DC metro.',
    costs: {
      studioRange: '$950-$2,000',
      familyRange: '$3,800-$9,000+',
      avgHourly: '$140-$215/hr for a 2-person crew',
      note: 'Alexandria pricing reflects historic Old Town access challenges, Potomac corridor affluence, DC-metro traffic, and competition among premium full-service NOVA agents.',
    },
    tips: [
      'Verify coverage for Alexandria and surrounding Northern Virginia areas before booking.',
      'Heavy DC metro traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value urban homes, townhomes, and historic properties.',
      'Book early for peak seasons (May-September), federal turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  spotsylvania: {
    marketNotes:
      'Spotsylvania County is a growing suburban county south of Fredericksburg with strong residential demand along the I-95 corridor.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Spotsylvania County pricing reflects Fredericksburg-area suburban growth, I-95 corridor commuter traffic, and competition among Northern Virginia and Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Spotsylvania and surrounding Fredericksburg areas before booking.',
      'Fredericksburg / I-95 traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and rural properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hampton: {
    marketNotes:
      'Hampton is an independent city with strong military, residential, and tourism-related demand across the Virginia Peninsula.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Hampton pricing reflects Peninsula military PCS turnover, Langley and NASA corridor demand, bridge-tunnel traffic, and competition among Hampton Roads full-service agents.',
    },
    tips: [
      'Verify coverage for Hampton and surrounding Peninsula areas before booking.',
      'Hampton Roads traffic and bridge-tunnel impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military housing relocations.',
      'Book early for peak seasons (May-September), PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  albemarle: {
    marketNotes:
      'Albemarle County surrounds Charlottesville with strong educational, residential, and tourism demand across the UVA area.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$180/hr for a 2-person crew',
      note: 'Albemarle County pricing reflects UVA semester turnover, Charlottesville tourism volume, rural property access, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Charlottesville and surrounding Albemarle areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows around UVA events and semesters.',
      'Confirm insurance for high-value suburban and rural homes.',
      'Book early for peak seasons (May-September), semester changeover, and graduation weekends.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hanover: {
    marketNotes:
      'Hanover County is a suburban county north of Richmond with strong residential demand across Mechanicsville and the Atlee corridor.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Hanover County pricing reflects Richmond-metro northern suburban growth, I-95 and I-295 corridor traffic, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Hanover, Mechanicsville, and surrounding areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and townhome communities.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  suffolk: {
    marketNotes:
      'Suffolk is an independent city with extensive rural and suburban areas and strong residential demand across western Tidewater.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Suffolk pricing reflects western Tidewater rural sprawl, long-driveway access challenges, Hampton Roads spillover traffic, and competition among coastal Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Suffolk and surrounding Hampton Roads areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties with long access drives.',
      'Book early for peak seasons (May-September) and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  frederick: {
    marketNotes:
      'Frederick County is a growing suburban county in the Northern Shenandoah Valley with strong residential demand around Winchester.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Frederick County pricing reflects Winchester metro suburban growth, I-81 corridor traffic, DC-metro spillover demand, and competition among Shenandoah Valley full-service agents.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding Frederick County areas before booking.',
      'Regional I-81 traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and rural properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  roanoke: {
    marketNotes:
      'Roanoke is an independent city and the core of the Roanoke Valley with strong residential and commercial demand across southwest Virginia.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Roanoke pricing reflects Blue Ridge valley geography, hillside access challenges, regional commercial demand, and competition among southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Roanoke and surrounding valley areas before booking.',
      'Regional traffic and hillside access impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-level properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  montgomery: {
    marketNotes:
      'Montgomery County is anchored by Virginia Tech with strong educational and residential demand across Christiansburg and Blacksburg.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects Virginia Tech semester turnover, New River Valley demand, mountain corridor traffic, and competition among student-focused and full-service local agents.',
    },
    tips: [
      'Verify coverage for Christiansburg, Blacksburg, and surrounding areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows around VT semesters and game days.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May-September), semester changeover (August and May), and graduation weekends.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'roanoke-county': {
    marketNotes:
      'Roanoke County surrounds the independent city of Roanoke with strong suburban and residential demand across Salem and surrounding communities.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Roanoke County pricing reflects Blue Ridge valley suburban demand, Salem corridor traffic, and competition among Roanoke Valley full-service agents.',
    },
    tips: [
      'Verify coverage for Salem, Roanoke County areas, and surrounding communities before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and hillside properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  portsmouth: {
    marketNotes:
      'Portsmouth is an independent city with strong naval, residential, and industrial demand across Hampton Roads.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Portsmouth pricing reflects naval base PCS turnover, port district traffic, Hampton Roads bridge-tunnel congestion, and competition among Tidewater full-service agents.',
    },
    tips: [
      'Verify coverage for Portsmouth and surrounding Hampton Roads areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and military housing relocations.',
      'Book early for peak seasons (May-September), PCS windows, and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rockingham: {
    marketNotes:
      'Rockingham County surrounds Harrisonburg with strong agricultural, educational, and residential demand across the Shenandoah Valley.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Rockingham County pricing reflects JMU semester turnover, Shenandoah Valley rural access, and competition among full-service Central Virginia agents.',
    },
    tips: [
      'Verify coverage for Harrisonburg and surrounding Rockingham areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural homes.',
      'Book early for peak seasons (May-September), semester changeover, and graduation weekends.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'james-city': {
    marketNotes:
      'James City County is a historic suburban county with strong tourism and residential demand across Williamsburg and the Historic Triangle.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$180/hr for a 2-person crew',
      note: 'James City County pricing reflects Historic Triangle tourism volume, Colonial Parkway traffic, and competition among Peninsula full-service agents.',
    },
    tips: [
      'Verify coverage for Williamsburg and surrounding James City areas before booking.',
      'Tourist traffic impacts scheduling â€” confirm crew arrival windows around peak visitor seasons.',
      'Confirm insurance for high-value homes and historic district properties.',
      'Book early for peak tourist seasons (June-August) and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'bedford-city': {
    marketNotes:
      'Bedford City is an independent city in Central Virginia with residential demand near Lynchburg and the Smith Mountain Lake corridor.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Bedford City pricing reflects Central Virginia demand, downtown historic district access, and competition among Lynchburg-metro full-service agents.',
    },
    tips: [
      'Verify coverage for Bedford City and surrounding Central Virginia communities before booking.',
      'US-460 and Lynchburg-area traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for historic downtown properties and hillside residential neighborhoods.',
      'Book early for peak seasons (May-September) and summer lake-home turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bedford: {
    marketNotes:
      'Bedford County is a rural county near Lynchburg with residential demand across Smith Mountain Lake and South Central Virginia.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Bedford County pricing reflects Smith Mountain Lake waterfront demand, rural property access, and competition among Lynchburg-metro full-service agents.',
    },
    tips: [
      'Verify coverage for Bedford and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value lakefront and rural homes.',
      'Book early for peak seasons (May-September) and summer lake-home turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lynchburg: {
    marketNotes:
      'Lynchburg is an independent city with strong educational and residential demand across Central Virginia.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Lynchburg pricing reflects university corridor demand, hillside access challenges, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Lynchburg and surrounding metro areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-level hillside properties.',
      'Book early for peak seasons (May-September) and semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  augusta: {
    marketNotes:
      'Augusta County surrounds Staunton and Waynesboro with strong residential demand across the Shenandoah Valley.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Augusta County pricing reflects Shenandoah Valley rural and suburban demand, I-81 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Staunton, Waynesboro, and surrounding Augusta areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fauquier: {
    marketNotes:
      'Fauquier County is a suburban/rural county in outer Northern Virginia with strong residential demand across Warrenton and horse country.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Fauquier County pricing reflects outer NOVA piedmont affluence, equestrian property access, Route 29 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Warrenton and surrounding Fauquier areas before booking.',
      'Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural estate properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  york: {
    marketNotes:
      'York County is a suburban county on the Virginia Peninsula with strong residential and historical demand across Yorktown.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'York County pricing reflects Peninsula suburban growth, Historic Triangle spillover traffic, and competition among Hampton Roads full-service agents.',
    },
    tips: [
      'Verify coverage for Yorktown and surrounding York County areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and historic corridor homes.',
      'Book early for peak seasons (May-September) and summer relocations.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pittsylvania: {
    marketNotes:
      'Pittsylvania County is a large rural county in South Central Virginia with residential demand centered on Chatham and the Danville area.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Pittsylvania County pricing reflects Southside Virginia rural sprawl, Danville-metro spillover, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Chatham and surrounding Pittsylvania areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  culpeper: {
    marketNotes:
      'Culpeper County is a growing suburban/rural county in Northern Virginia piedmont with strong residential demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$180/hr for a 2-person crew',
      note: 'Culpeper County pricing reflects NOVA spillover growth, Route 29 corridor traffic, and competition among piedmont full-service agents.',
    },
    tips: [
      'Verify coverage for Culpeper and surrounding areas before booking.',
      'Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and rural properties.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  campbell: {
    marketNotes:
      'Campbell County surrounds Lynchburg with strong residential demand across Rustburg and the metro collar.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Campbell County pricing reflects Lynchburg-metro collar demand, rural property access, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Rustburg and surrounding Campbell areas before booking.',
      'Lynchburg-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is a rural South Central Virginia county with residential demand centered on Rocky Mount and the Blue Ridge foothills.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Franklin County pricing reflects Blue Ridge foothills geography, rural property access, and competition among Southside Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Rocky Mount and surrounding Franklin County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a key Southwest Virginia county with residential demand centered on Abingdon and the Blue Ridge highlands.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects Appalachian geography, rural property access, and competition among Southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Abingdon and surrounding Washington County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harrisonburg: {
    marketNotes:
      'Harrisonburg is an independent city and the core of the Shenandoah Valley with strong educational and residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Harrisonburg pricing reflects JMU student turnover, valley suburban demand, and competition among Shenandoah Valley full-service agents.',
    },
    tips: [
      'Verify coverage for Harrisonburg and surrounding valley areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  henry: {
    marketNotes:
      'Henry County is a rural South Central Virginia county with residential demand centered on Martinsville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Henry County pricing reflects Southside Virginia geography, rural property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Martinsville and surrounding Henry County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  shenandoah: {
    marketNotes:
      'Shenandoah County is a rural Shenandoah Valley county with residential demand centered on Woodstock.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Shenandoah County pricing reflects valley rural geography, I-81 corridor access, and competition among Northern Shenandoah full-service agents.',
    },
    tips: [
      'Verify coverage for Woodstock and surrounding Shenandoah County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  manassas: {
    marketNotes:
      'Manassas is an independent city with strong suburban and historical residential demand in the Northern Virginia / Washington DC metro.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Manassas pricing reflects Northern Virginia suburban demand, I-66 corridor traffic, high-value home relocations, and competition among full-service DC-metro agents.',
    },
    tips: [
      'Verify coverage for Manassas and surrounding Northern Virginia areas before booking.',
      'Heavy Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  charlottesville: {
    marketNotes:
      'Charlottesville is an independent city anchored by the University of Virginia with strong educational and residential demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Charlottesville pricing reflects UVA student turnover, Central Virginia suburban demand, and competition among full-service valley agents.',
    },
    tips: [
      'Verify coverage for Charlottesville and surrounding areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-george': {
    marketNotes:
      'Prince George County is a suburban county south of Richmond with strong residential and industrial demand.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Prince George County pricing reflects Richmond-metro south corridor demand, Fort Lee adjacency, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Prince George and surrounding Richmond-south areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  louisa: {
    marketNotes:
      'Louisa County is a rural Central Virginia county with residential demand centered on Louisa and Lake Anna.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Louisa County pricing reflects Lake Anna waterfront geography, rural property access, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Louisa and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and lakefront homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  warren: {
    marketNotes:
      'Warren County is a suburban county in Northern Virginia with residential demand centered on Front Royal.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Warren County pricing reflects Shenandoah Valley fringe suburban demand, I-66 corridor traffic, and competition among Northern Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Front Royal and surrounding Warren County areas before booking.',
      'Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'isle-of-wight': {
    marketNotes:
      'Isle of Wight County is a suburban/rural county on the Virginia Peninsula with residential demand across Smithfield and Windsor.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Isle of Wight County pricing reflects Hampton Roads peninsula demand, rural property access, and competition among Tidewater full-service agents.',
    },
    tips: [
      'Verify coverage for Isle of Wight and surrounding Hampton Roads areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  danville: {
    marketNotes:
      'Danville is an independent city in South Central Virginia with residential demand across the Dan River corridor.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Danville pricing reflects Southside Virginia geography, regional industrial turnover, and competition among South Central full-service agents.',
    },
    tips: [
      'Verify coverage for Danville and surrounding Southside areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  orange: {
    marketNotes:
      'Orange County is a rural Central Virginia county with residential demand centered on Orange and Gordonsville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Orange County pricing reflects Central Virginia piedmont geography, rural property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Orange and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  gloucester: {
    marketNotes:
      'Gloucester County is a suburban/rural county on the Virginia Peninsula with residential demand across the Middle Peninsula.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Gloucester County pricing reflects Middle Peninsula geography, waterfront property access, and competition among Tidewater full-service agents.',
    },
    tips: [
      'Verify coverage for Gloucester and surrounding peninsula areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and waterfront homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tazewell: {
    marketNotes:
      'Tazewell County is a rural Southwest Virginia county with residential demand centered on Tazewell and Richlands.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Tazewell County pricing reflects coalfields geography, mountain property access, and competition among Southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Tazewell and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caroline: {
    marketNotes:
      'Caroline County is a rural Central Virginia county with residential demand centered on Bowling Green.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Caroline County pricing reflects Northern Neck geography, rural property access, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Bowling Green and surrounding Caroline County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wise: {
    marketNotes:
      'Wise County is a rural Southwest Virginia county with residential demand centered on Wise and Norton.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Wise County pricing reflects coalfields geography, mountain property access, and competition among Southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Wise and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  botetourt: {
    marketNotes:
      'Botetourt County is a suburban/rural county in the Roanoke Valley with residential demand centered on Fincastle.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Botetourt County pricing reflects Roanoke Valley suburban demand, Blue Ridge geography, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Fincastle and surrounding Botetourt areas before booking.',
      'Roanoke-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  accomack: {
    marketNotes:
      'Accomack County is a rural Eastern Shore county with residential and tourism demand across coastal communities.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Accomack County pricing reflects Eastern Shore isolation, seasonal tourism volume, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Accomac and surrounding Eastern Shore areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and waterfront homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  pulaski: {
    marketNotes:
      'Pulaski County is a rural Southwest Virginia county with residential demand centered on Pulaski and the New River Valley.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Pulaski County pricing reflects New River Valley geography, rural property access, and competition among Southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Pulaski and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  petersburg: {
    marketNotes:
      'Petersburg is an independent city with historical significance and residential demand in the Richmond metro south corridor.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Petersburg pricing reflects Tri-Cities corridor demand, historic district relocations, and competition among Richmond-metro full-service agents.',
    },
    tips: [
      'Verify coverage for Petersburg and surrounding Richmond-south areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value historic and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  halifax: {
    marketNotes:
      'Halifax County is a rural South Central Virginia county with residential demand centered on Halifax and South Boston.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Halifax County pricing reflects Southside Virginia geography, rural property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Halifax and surrounding county areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  powhatan: {
    marketNotes:
      'Powhatan County is a suburban/rural county west of Richmond with residential demand across growing western suburbs.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Powhatan County pricing reflects Richmond-metro west corridor demand, suburban estate relocations, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Powhatan and surrounding Richmond-west areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  amherst: {
    marketNotes:
      'Amherst County is a rural Central Virginia county with residential demand centered on Amherst and the Lynchburg metro.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Amherst County pricing reflects Lynchburg-metro collar demand, Blue Ridge foothills geography, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Amherst and surrounding Lynchburg-area communities before booking.',
      'Lynchburg-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fredericksburg: {
    marketNotes:
      'Fredericksburg is an independent city with strong historical, residential, and commercial demand along the I-95 corridor.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Fredericksburg pricing reflects I-95 corridor suburban demand, historic district relocations, and competition among Northern Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Fredericksburg and surrounding I-95 corridor areas before booking.',
      'I-95 traffic significantly impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value historic and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mecklenburg: {
    marketNotes:
      'Mecklenburg County is a rural South Central Virginia county with residential demand centered on Boydton and Kerr Lake.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Mecklenburg County pricing reflects lake-country geography, rural property access, and competition among Southside Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Boydton and surrounding Mecklenburg areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and lakefront homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'king-george': {
    marketNotes:
      'King George County is a suburban/rural county in Northern Virginia with residential demand along the Potomac River.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'King George County pricing reflects Northern Virginia fringe demand, naval facility adjacency, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for King George and surrounding Northern Virginia areas before booking.',
      'Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  goochland: {
    marketNotes:
      'Goochland County is a suburban/rural county west of Richmond with residential demand across western metro suburbs.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Goochland County pricing reflects Richmond-metro west corridor demand, estate and suburban relocations, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Goochland and surrounding Richmond-west areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  carroll: {
    marketNotes:
      'Carroll County is a rural Southwest Virginia county with residential demand centered on Hillsville and the Blue Ridge highlands.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Blue Ridge highlands geography, rural property access, and competition among Southwest Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Hillsville and surrounding Carroll County areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and hillside homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  fluvanna: {
    marketNotes:
      'Fluvanna County is a rural Central Virginia county with residential demand centered on Palmyra and Lake Monticello.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Fluvanna County pricing reflects Central Virginia geography, lakefront property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Palmyra and surrounding Fluvanna areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and lakefront homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dinwiddie: {
    marketNotes:
      'Dinwiddie County is a suburban/rural county south of Richmond with residential demand across the Tri-Cities corridor.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Dinwiddie County pricing reflects Richmond-metro south corridor demand, rural property access, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for Dinwiddie and surrounding Richmond-south areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value rural and suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'new-kent': {
    marketNotes:
      'New Kent County is a suburban/rural county east of Richmond with residential demand across the colonial corridor.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'New Kent County pricing reflects Richmond-metro east corridor growth, suburban relocations, and competition among Central Virginia full-service agents.',
    },
    tips: [
      'Verify coverage for New Kent and surrounding Richmond-east areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'colonial-heights': {
    marketNotes:
      'Colonial Heights is an independent city in the Richmond area with strong residential demand.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Colonial Heights pricing reflects Richmond-metro geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Colonial Heights and surrounding areas before booking.',
      'Richmond-area traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buchanan: {
    marketNotes:
      'Buchanan County is a rural Southwest Virginia county with residential demand centered on Grundy.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Buchanan pricing reflects Southwest Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Grundy and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  southampton: {
    marketNotes:
      'Southampton County is a rural Southside Virginia county with residential demand centered on Courtland.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Southampton pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Courtland and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  patrick: {
    marketNotes:
      'Patrick County is a rural Southside Virginia county with residential demand centered on Stuart.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Patrick pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Stuart and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  appomattox: {
    marketNotes:
      'Appomattox County is a rural Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Appomattox pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Appomattox and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  radford: {
    marketNotes:
      'Radford is an independent city anchored by Radford University with strong educational and residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Radford pricing reflects New River Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Radford and surrounding areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  buckingham: {
    marketNotes:
      'Buckingham County is a rural Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Buckingham pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Buckingham and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'manassas-park': {
    marketNotes:
      'Manassas Park is an independent city in Northern Virginia with strong suburban residential demand.',
    costs: {
      studioRange: '$900-$1,900',
      familyRange: '$3,500-$8,500+',
      avgHourly: '$130-$200/hr for a 2-person crew',
      note: 'Manassas Park pricing reflects Northern Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Manassas Park and surrounding areas before booking.',
      'Heavy Northern Virginia traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  giles: {
    marketNotes:
      'Giles County is a rural Southwest Virginia county with residential demand centered on Pearisburg.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Giles pricing reflects Southwest Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Pearisburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bristol: {
    marketNotes:
      'Bristol is an independent city on the Tennessee border with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Bristol pricing reflects Appalachian border geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bristol and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nottoway: {
    marketNotes:
      'Nottoway County is a rural South Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Nottoway pricing reflects South Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Nottoway and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  floyd: {
    marketNotes:
      'Floyd County is a rural Southwest Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Floyd pricing reflects Blue Ridge highlands geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Floyd and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  williamsburg: {
    marketNotes:
      'Williamsburg is an independent city with strong historical, tourism, and educational demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Williamsburg pricing reflects Historic Triangle geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Williamsburg and surrounding areas before booking.',
      'Tourist traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  brunswick: {
    marketNotes:
      'Brunswick County is a rural Southside Virginia county with residential demand centered on Lawrenceville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Brunswick pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lawrenceville and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  clarke: {
    marketNotes:
      'Clarke County is a rural Northern Virginia county in the Shenandoah Valley with residential demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Clarke pricing reflects Shenandoah Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Berryville and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'falls-church': {
    marketNotes:
      'Falls Church is an independent city in Northern Virginia with dense urban and residential demand.',
    costs: {
      studioRange: '$950-$2,000',
      familyRange: '$3,800-$9,000+',
      avgHourly: '$135-$210/hr for a 2-person crew',
      note: 'Falls Church pricing reflects Northern Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Falls Church and surrounding areas before booking.',
      'Heavy DC metro traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  grayson: {
    marketNotes:
      'Grayson County is a rural Southwest Virginia county with residential demand centered on Independence.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Grayson pricing reflects Southwest Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Independence and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nelson: {
    marketNotes:
      'Nelson County is a rural Central Virginia county with residential demand centered on Lovingston.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Nelson pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lovingston and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  alleghany: {
    marketNotes:
      'Alleghany County is a rural Western Virginia county with residential demand centered on Covington.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Alleghany pricing reflects Western Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Covington and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  madison: {
    marketNotes:
      'Madison County is a rural Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Madison pricing reflects Central Virginia piedmont geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Madison and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  martinsville: {
    marketNotes:
      'Martinsville is an independent city in South Central Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Martinsville pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Martinsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  poquoson: {
    marketNotes:
      'Poquoson is an independent city on the Virginia Peninsula with residential demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,500+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Poquoson pricing reflects Hampton Roads geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Poquoson and surrounding areas before booking.',
      'Hampton Roads traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  amelia: {
    marketNotes:
      'Amelia County is a rural Central Virginia county with residential demand centered on Amelia Court House.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Amelia pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Amelia Court House and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dickenson: {
    marketNotes:
      'Dickenson County is a rural Southwest Virginia county with residential demand centered on Clintwood.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Dickenson pricing reflects Southwest Virginia coalfields geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Clintwood and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  northumberland: {
    marketNotes:
      'Northumberland County is a rural Northern Neck county with residential demand centered on Heathsville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Northumberland pricing reflects Northern Neck geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Heathsville and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lunenburg: {
    marketNotes:
      'Lunenburg County is a rural Southside Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Lunenburg pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lunenburg and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  northampton: {
    marketNotes:
      'Northampton County is a rural Eastern Shore county with residential and tourism demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Northampton pricing reflects Eastern Shore geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Eastville and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  charlotte: {
    marketNotes:
      'Charlotte County is a rural South Central Virginia county with residential demand centered on Charlotte Court House.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Charlotte pricing reflects South Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Charlotte Court House and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greensville: {
    marketNotes:
      'Greensville County is a rural Southside Virginia county with residential demand centered on Emporia.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Greensville pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Emporia and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lancaster: {
    marketNotes:
      'Lancaster County is a rural Northern Neck county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Lancaster pricing reflects Northern Neck geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lancaster and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  sussex: {
    marketNotes:
      'Sussex County is a rural Southside Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Sussex pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Sussex and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  middlesex: {
    marketNotes:
      'Middlesex County is a rural Northern Neck county with residential demand centered on Saluda.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Middlesex pricing reflects Middle Peninsula geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Saluda and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is a rural Northern Neck county with residential demand centered on Tappahannock.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Essex pricing reflects Northern Neck geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Tappahannock and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cumberland: {
    marketNotes:
      'Cumberland County is a rural Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Cumberland pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Cumberland and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'richmond-county': {
    marketNotes:
      'Richmond County is a rural Northern Neck county with residential demand centered on Warsaw.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Richmond County pricing reflects Northern Neck geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Warsaw and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'franklin-city': {
    marketNotes:
      'Franklin is an independent city in Southside Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Franklin pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Franklin and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  mathews: {
    marketNotes:
      'Mathews County is a rural Northern Neck county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Mathews pricing reflects Middle Peninsula geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Mathews and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lexington: {
    marketNotes:
      'Lexington is an independent city anchored by Washington and Lee University and Virginia Military Institute with strong educational demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Lexington pricing reflects Shenandoah Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding areas before booking.',
      'University traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes and student-related moves.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rappahannock: {
    marketNotes:
      'Rappahannock County is a rural Northern Virginia county with residential demand centered on Washington.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Rappahannock pricing reflects Northern Virginia piedmont geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Washington and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and rural homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'king-and-queen': {
    marketNotes:
      'King and Queen County is a rural Central Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'King and Queen pricing reflects Central Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for King and Queen Court House and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'buena-vista': {
    marketNotes:
      'Buena Vista is an independent city in Central Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Buena Vista pricing reflects Rockbridge area geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Buena Vista and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'charles-city': {
    marketNotes:
      'Charles City County is a rural county on the Virginia Peninsula with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Charles City pricing reflects Virginia Peninsula geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Charles City and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  galax: {
    marketNotes:
      'Galax is an independent city in Southwest Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Galax pricing reflects Blue Ridge highlands geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Galax and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  surry: {
    marketNotes:
      'Surry County is a rural county on the Virginia Peninsula with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Surry pricing reflects Virginia Peninsula geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Surry and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bland: {
    marketNotes:
      'Bland County is a rural Southwest Virginia county with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Bland pricing reflects Southwest Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bland and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  covington: {
    marketNotes:
      'Covington is an independent city in Western Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Covington pricing reflects Alleghany Highlands geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Covington and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  emporia: {
    marketNotes:
      'Emporia is an independent city in Southside Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Emporia pricing reflects Southside Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Emporia and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  craig: {
    marketNotes:
      'Craig County is a small rural Western Virginia county with residential demand centered on New Castle.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Craig pricing reflects Western Virginia geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for New Castle and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  bath: {
    marketNotes:
      'Bath County is a small rural Western Virginia county with residential and tourism demand centered on Warm Springs.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Bath pricing reflects Allegheny highlands geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Warm Springs and surrounding areas before booking.',
      'Tourist traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak tourist seasons (June-August) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  norton: {
    marketNotes:
      'Norton is an independent city in Southwest Virginia with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Norton pricing reflects Southwest Virginia coalfields geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Norton and surrounding areas before booking.',
      'Regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  highland: {
    marketNotes:
      'Highland County is Virginia''s least populous county, a rural mountainous area with residential demand centered on Monterey.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Highland pricing reflects Allegheny highlands geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Monterey and surrounding areas before booking.',
      'Mountainous terrain and regional traffic impacts scheduling â€” confirm crew arrival windows.',
      'Confirm insurance for high-value homes.',
      'Book early for peak seasons (May-September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  greene: {
    marketNotes:
      'Greene County is a rural Shenandoah Valley county between Charlottesville and Skyline Drive with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Greene pricing reflects Shenandoah Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Stanardsville and surrounding Greene communities before booking.',
      'Skyline Drive corridor traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hopewell: {
    marketNotes:
      'Hopewell is an independent city on the James River with industrial and residential demand near Richmond and Fort Lee.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Hopewell pricing reflects James River corridor geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Hopewell and surrounding Hopewell communities before booking.',
      'Richmond Southside traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'king-william': {
    marketNotes:
      'King William County is a rural county east of Richmond along the Pamunkey River with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'King William pricing reflects Pamunkey River geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for King William and surrounding King William communities before booking.',
      'Richmond East traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  lee: {
    marketNotes:
      'Lee County is the westernmost Virginia county in far Southwest Appalachia with residential demand centered on Jonesville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Lee pricing reflects Powell Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Jonesville and surrounding Lee communities before booking.',
      'Appalachian mountain traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  page: {
    marketNotes:
      'Page County is a Shenandoah Valley county anchored by Luray and the Skyline Drive tourism gateway.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Page pricing reflects Skyline Drive corridor geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Luray and surrounding Page communities before booking.',
      'Shenandoah tourism traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-edward': {
    marketNotes:
      'Prince Edward County is a Central Virginia county anchored by Farmville and Longwood University with residential demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Prince Edward pricing reflects Southside Central geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Farmville and surrounding Prince Edward communities before booking.',
      'University area traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  rockbridge: {
    marketNotes:
      'Rockbridge County is a Shenandoah Valley county anchored by Lexington with VMI and W&L institutional demand.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Rockbridge pricing reflects Southern Shenandoah Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lexington and surrounding Rockbridge communities before booking.',
      'Historic Lexington traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  russell: {
    marketNotes:
      'Russell County is a Southwest Virginia coalfields county with residential demand centered on Lebanon.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Russell pricing reflects Clinch Valley geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Lebanon and surrounding Russell communities before booking.',
      'Coalfields corridor traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  salem: {
    marketNotes:
      'Salem is an independent city in the Roanoke Valley with strong suburban and institutional residential demand.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Salem pricing reflects Blue Ridge South geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Salem and surrounding Salem communities before booking.',
      'Roanoke Valley traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  scott: {
    marketNotes:
      'Scott County is a far Southwest Virginia county on the Tennessee border with residential demand centered on Gate City.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Scott pricing reflects Mountain Empire geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Gate City and surrounding Scott communities before booking.',
      'Appalachian border traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  smyth: {
    marketNotes:
      'Smyth County is a Southwest Virginia county along I-81 with residential demand centered on Marion.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Smyth pricing reflects Mountain Southwest geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Marion and surrounding Smyth communities before booking.',
      'I-81 South traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  staunton: {
    marketNotes:
      'Staunton is an independent city in the Shenandoah Valley with historic downtown and suburban residential demand.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Staunton pricing reflects Valley core geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Staunton and surrounding Staunton communities before booking.',
      'Shenandoah Valley traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  waynesboro: {
    marketNotes:
      'Waynesboro is an independent city at the Blue Ridge Parkway gateway with residential demand in the eastern Shenandoah Valley.',
    costs: {
      studioRange: '$800-$1,600',
      familyRange: '$2,900-$6,500+',
      avgHourly: '$115-$175/hr for a 2-person crew',
      note: 'Waynesboro pricing reflects Shenandoah Valley East geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Waynesboro and surrounding Waynesboro communities before booking.',
      'Blue Ridge Parkway traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  westmoreland: {
    marketNotes:
      'Westmoreland County is a Northern Neck county with waterfront and rural residential demand centered on Montross.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Westmoreland pricing reflects Potomac River geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Montross and surrounding Westmoreland communities before booking.',
      'Northern Neck traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  winchester: {
    marketNotes:
      'Winchester is an independent city in the northern Shenandoah Valley with strong suburban and commuter residential demand.',
    costs: {
      studioRange: '$850-$1,700',
      familyRange: '$3,000-$7,000+',
      avgHourly: '$120-$185/hr for a 2-person crew',
      note: 'Winchester pricing reflects Northern Shenandoah geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Winchester and surrounding Winchester communities before booking.',
      'I-81 North traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wythe: {
    marketNotes:
      'Wythe County is a Southwest Virginia county along I-77 and I-81 with residential demand centered on Wytheville.',
    costs: {
      studioRange: '$750-$1,500',
      familyRange: '$2,600-$5,800+',
      avgHourly: '$110-$165/hr for a 2-person crew',
      note: 'Wythe pricing reflects New River Plateau geography, local property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Wytheville and surrounding Wythe communities before booking.',
      'I-77 corridor traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes, military relocations, and rural driveway access where applicable.',
      'Book early for peak seasons (May-September), PCS turnover, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getVirginiaCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return virginiaCountyResearch[countySlug];
}