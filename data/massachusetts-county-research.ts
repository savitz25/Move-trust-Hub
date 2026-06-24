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
      'Verify coverage for Cambridge, Lowell, Framingham, and surrounding towns before booking.',
      'Heavy Boston metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban and urban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Worcester and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Salem, Lynn, Lawrence, and surrounding towns before booking.',
      'Boston metro and coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront and historic homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Boston and surrounding neighborhoods before booking.',
      'Heavy urban traffic, narrow streets, and parking restrictions significantly impact scheduling — confirm crew arrival windows and permits.',
      'Confirm insurance for high-value urban and historic properties and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Dedham, Quincy, and surrounding towns before booking.',
      'Heavy Boston metro traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Taunton, Fall River, New Bedford, and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Plymouth, Brockton, and surrounding towns before booking.',
      'Boston metro and coastal traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Springfield and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Barnstable, Hyannis, and Cape Cod towns before booking.',
      'Tourist traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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
      'Verify coverage for Northampton and surrounding towns before booking.',
      'Regional traffic impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
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