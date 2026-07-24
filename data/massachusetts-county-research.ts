import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Massachusetts county research — complete state (14/14 counties) */
export const massachusettsCountyResearch: Record<string, CuratedCountyResearch> = {
  middlesex: {
    marketNotes:
      'Middlesex County is one of Massachusetts’ largest and most populous counties with strong urban, suburban, educational, and high-tech residential demand.',
    costs: {
      studioRange: '$950–$2,100',
      familyRange: '$4,000–$9,500+',
      avgHourly: '$145–$210/hr for a 2-person crew',
      note: 'Middlesex County pricing reflects Boston metro corridor demand, Route 128 tech-corridor volume, and competition among full-service agents serving Cambridge, Lowell, and Framingham.',
    },
    tips: [
      'Survey Cambridge/Somerville walk-ups and stair counts separately from Lexington/Concord/Waltham driveway SFH — access products differ across the county.',
      'Price I-95 / I-93 / Route 2 / Route 3 / Route 128 portal time honestly for Cambridge ↔ western-suburb pairs; map miles understate billable hours.',
      'Reserve elevators and building COIs early for dense multi-unit stock; street staging fails more estimates than packing skill near Harvard/MIT corridors.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for any NH/NY/CT or other out-of-state leg.',
      'Prefer mid-week early starts; university and tech lease waves pack crews first May–September.',
    ],
  },
  worcester: {
    marketNotes:
      'Worcester County is a large central Massachusetts county with strong urban, suburban, and industrial demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Worcester County pricing reflects central Massachusetts demand, I-290 and I-495 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Treat Worcester as a central MA regional hub — three-deckers and mill stock, not a Boston-west suburb clone.',
      'Price I-290 / I-90 / I-190 / Route 9 / Route 20 portal time for city ↔ Shrewsbury / Westborough / Leominster pairs honestly.',
      'Photo porch flights, multi-story mill lofts, and long carries before truck sizing in the city core.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for RI/NH/CT border or longer interstate legs.',
      'Cross-state and Boston ↔ Worcester career pairs fill fleets early — book peak Fridays and month-ends ahead.',
    ],
  },
  essex: {
    marketNotes:
      'Essex County is a large coastal county north of Boston with strong suburban, historic, and waterfront residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Essex County pricing reflects North Shore coastal demand, Route 1 and I-95 corridor traffic, and competition among regional full-service agents serving Salem, Lynn, and Lawrence.',
    },
    tips: [
      'Plan Salem event seasons and coastal narrow streets separately from inland Lawrence–Haverhill mill-loft product.',
      'Price I-95 / Route 1 / Route 128 / Route 114 portal time for Lynn/Salem ↔ Andover-belt pairs; North Shore empty miles matter.',
      'Photo waterfront curb limits, historic cores, and loft elevator/COI rules before dispatch.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for NH Seacoast or other out-of-state legs.',
      'Summer coastal and tourism peaks collide with lease ends — prefer mid-week mornings when flexible.',
    ],
  },
  suffolk: {
    marketNotes:
      'Suffolk County is coterminous with the City of Boston and surrounding areas, with dense urban, historic, and high-value residential demand.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,200–$10,000+',
      avgHourly: '$150–$220/hr for a 2-person crew',
      note: 'Suffolk County pricing reflects dense Boston urban demand, narrow-street logistics, parking restrictions, and competition among full-service agents serving downtown and neighborhood moves.',
    },
    tips: [
      'Reserve elevators, dock slots, and building COIs early for Back Bay, downtown, and Seaport towers — vertical product fails estimates more than packing skill.',
      'Survey South End / Beacon Hill / JP brownstones and triple-decker flights separately from elevator towers; access rules change block by block.',
      'Confirm street occupancy / moving permits and scarce legal curb before crew day; day-of surprises burn hours.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for any out-of-state leg.',
      'Price I-90 / I-93 / US-1 / Storrow portal time honestly for cross-neighborhood pairs; Allston–Brighton and university lease waves pack docks first.',
    ],
  },
  norfolk: {
    marketNotes:
      'Norfolk County is a large and affluent suburban county south of Boston with strong residential demand.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$140–$200/hr for a 2-person crew',
      note: 'Norfolk County pricing reflects affluent suburban Boston demand, I-93 and Route 128 corridor traffic, and competition among full-service agents serving Dedham, Quincy, and Brookline-area communities.',
    },
    tips: [
      'Treat Quincy multi-unit and Brookline-adjacent density separately from Needham–Westwood–Sharon HOA driveway SFH.',
      'Price I-93 / I-95 / Route 3 / Route 28 / Route 1A portal time for south-metro ↔ Boston pairs; collar traffic is billable.',
      'Collect elevator reservations and HOA COI packets before dispatch on multifamily and condo product.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for RI border or longer interstate legs.',
      'Prefer mid-week early starts on I-93 / Route 3 corridors; month-end lease waves pack south-metro fleets first.',
    ],
  },
  bristol: {
    marketNotes:
      'Bristol County is a large southeastern Massachusetts county with strong residential and industrial demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Bristol County pricing reflects southeastern Massachusetts demand, I-195 and Route 24 corridor traffic, and competition among regional full-service agents serving Taunton, Fall River, and New Bedford.',
    },
    tips: [
      'Treat New Bedford and Fall River triple-decker / hill-street stock as South Coast product — not a Boston collar clone.',
      'Price I-195 / Route 24 / Route 6 / Route 140 portal time for Fall River ↔ New Bedford ↔ Attleboro pairs honestly.',
      'Clarify Rhode Island destinations early — short Providence pairs flip the job to interstate FMCSA.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for any RI or other out-of-state leg.',
      'Photo mill-loft elevators, porch flights, and Attleboro HOA driveways before truck sizing.',
    ],
  },
  plymouth: {
    marketNotes:
      'Plymouth County is a large southeastern Massachusetts county with strong suburban and coastal residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$130–$185/hr for a 2-person crew',
      note: 'Plymouth County pricing reflects South Shore suburban and coastal demand, Route 3 and Route 44 corridor traffic, and competition among regional full-service agents serving Plymouth and Brockton.',
    },
    tips: [
      'Plan Hingham–Duxbury coastal narrow streets and historic downtown Plymouth separately from Brockton triple-decker product.',
      'Price Route 3 / Route 24 / Route 44 / Route 18 portal time for South Shore ↔ Boston pairs; empty miles understate hours at peak.',
      'Build Cape-bound staging and summer coastal traffic into any Plymouth ↔ Barnstable estimate.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for interstate legs.',
      'Summer beach-town and school calendars collide on Fridays — book peak Saturdays early May–August.',
    ],
  },
  hampden: {
    marketNotes:
      'Hampden County is the core of Western Massachusetts with strong urban and suburban residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$115–$170/hr for a 2-person crew',
      note: 'Hampden County pricing reflects Pioneer Valley and Springfield metro demand, I-91 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Treat Springfield / Pioneer Valley as its own market — three-deckers and mill buildings, not Boston-metro logistics.',
      'Price I-91 / I-90 / Route 5 / Route 20 portal time for Springfield ↔ Holyoke / Chicopee / Longmeadow pairs honestly.',
      'Clarify Connecticut destinations early — Agawam / Longmeadow border pairs often need FMCSA, not DPU alone.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for CT or other out-of-state legs.',
      'Winter ice and summer heat both reshape outdoor carries — keep flexible dates on open walks.',
    ],
  },
  barnstable: {
    marketNotes:
      'Barnstable County (Cape Cod) is a major tourist destination with strong seasonal and year-round residential demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Barnstable County pricing reflects Cape Cod seasonal demand, Route 6 corridor traffic, and competition among regional full-service agents serving Barnstable and Hyannis.',
    },
    tips: [
      'Build Cape Cod bridge access and summer Route 6 / Route 28 congestion into every estimate — seasonal peaks rewrite local hours.',
      'Survey Outer Cape narrow streets and small-truck needs separately from Mid-Cape multi-unit and year-round SFH.',
      'Avoid Friday–Sunday peak tourist windows when flexible; mid-week early starts clear bridge approaches faster.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for any out-of-state or island-connecting interstate leg.',
      'Second-home and seasonal turns fill crews first Memorial Day–Labor Day — book peak weeks early.',
    ],
  },
  hampshire: {
    marketNotes:
      'Hampshire County is a key Western Massachusetts county with strong educational and residential demand.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$120–$175/hr for a 2-person crew',
      note: 'Hampshire County pricing reflects Pioneer Valley educational corridor demand, I-91 and Route 9 traffic, and competition among regional full-service agents serving Northampton and Amherst-area communities.',
    },
    tips: [
      'Treat Northampton / Amherst as college-town and valley product — not Springfield urban three-decker defaults alone.',
      'Price I-91 / Route 9 / Route 116 / Route 47 portal time for Northampton ↔ Amherst / Hadley pairs; academic calendars cluster demand.',
      'Plan UMass / Five College lease turnovers and town-center curb limits as estimate inputs, not afterthoughts.',
      'Verify Massachusetts DPU operating certificate for pure in-state jobs; FMCSA for CT or other out-of-state legs.',
      'Semester start/end weekends clear fleets first — prefer mid-week mornings when flexible.',
    ],
  },
  berkshire: {
    marketNotes:
      'Berkshire County is the westernmost county in Massachusetts with strong tourism and residential demand.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$165/hr for a 2-person crew',
      note: 'Berkshire County pricing reflects western Massachusetts tourism demand, Route 7 and Route 20 corridor traffic, and competition among regional full-service agents serving Pittsfield and the Berkshires.',
    },
    tips: [
      'Verify coverage for Pittsfield and surrounding towns before booking.',
      'Tourist traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and seasonal properties.',
      'Book early for peak tourist seasons (June–October) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  franklin: {
    marketNotes:
      'Franklin County is the northwesternmost county in Massachusetts with rural and residential demand.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Franklin County pricing reflects rural northwestern Massachusetts demand, Route 2 and I-91 corridor traffic, and competition among regional full-service agents serving Greenfield and hill-town communities.',
    },
    tips: [
      'Verify coverage for Greenfield and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and rural properties with long driveways.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dukes: {
    marketNotes:
      'Dukes County (Martha’s Vineyard) is an island county with strong seasonal tourism and residential demand.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$155–$225/hr for a 2-person crew',
      note: 'Dukes County pricing reflects island logistics, ferry coordination, seasonal tourism volume, and limited mover availability across Martha’s Vineyard communities.',
    },
    tips: [
      'Verify coverage for Martha’s Vineyard towns before booking.',
      'Ferry and tourist traffic significantly impact scheduling — confirm crew arrival windows and island access.',
      'Confirm insurance for high-value island properties and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  nantucket: {
    marketNotes:
      'Nantucket County is an island county with strong seasonal tourism and high-value residential demand.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$155–$225/hr for a 2-person crew',
      note: 'Nantucket County pricing reflects island logistics, ferry coordination, luxury-home demand, and limited mover availability across Nantucket Island.',
    },
    tips: [
      'Verify coverage for Nantucket Island before booking.',
      'Ferry and tourist traffic significantly impact scheduling — confirm crew arrival windows and island access.',
      'Confirm insurance for high-value island properties and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMassachusettsCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return massachusettsCountyResearch[countySlug];
}