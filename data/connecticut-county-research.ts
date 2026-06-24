import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Connecticut county research — complete state (8 counties) */
export const connecticutCountyResearch: Record<string, CuratedCountyResearch> = {
  fairfield: {
    marketNotes:
      'Fairfield County is Connecticut’s most populous and highest-income county, with premium demand across Stamford, Greenwich, Westport, and the NYC commuter corridor for corporate, luxury-home, and long-distance relocations.',
    costs: {
      studioRange: '$1,000–$2,200',
      familyRange: '$4,500–$10,500+',
      avgHourly: '$140–$210/hr for a 2-person crew',
      note: 'Fairfield County pricing reflects Gold Coast luxury demand, NYC reverse-commute volume, Merritt Parkway and I-95 corridor traffic, and competition among premium full-service agents.',
    },
    tips: [
      'Verify coverage for Stamford, Greenwich, Westport, Darien, and Norwalk before booking — Fairfield spans multiple distinct Gold Coast markets.',
      'NYC-corridor and corporate relocations often require after-hours scheduling and white-glove packing — confirm crew experience with luxury homes.',
      'Merritt Parkway, I-95, and Metro-North corridor traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value estates, condominiums, and multi-floor loading zones — request supplemental coverage for art and antiques.',
      'Book early for peak seasons (May–September), corporate transfer windows, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  hartford: {
    marketNotes:
      'Hartford County centers on the state capital with strong corporate, insurance-industry, government, and suburban residential demand across Hartford, West Hartford, and Bloomfield.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Hartford County pricing reflects capital-city corporate relocation volume, I-84 and I-91 corridor traffic, and competition among full-service Connecticut agents.',
    },
    tips: [
      'Verify coverage for Hartford, West Hartford, East Hartford, and Bloomfield before booking.',
      'Corporate and government relocations may require flexible scheduling — confirm crew availability for executive moves.',
      'Heavy urban and interstate traffic on I-84 and I-91 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'new-haven': {
    marketNotes:
      'New Haven County combines urban New Haven, Yale University, shoreline suburbs, and professional corridors with strong residential and institutional demand.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'New Haven County pricing reflects university corridor demand, I-95 and I-91 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for New Haven, Hamden, Milford, and shoreline towns before booking.',
      'University and hospital corridor moves may require parking coordination — confirm building access and semester timing.',
      'Regional traffic on I-95 and I-91 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value urban and suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  litchfield: {
    marketNotes:
      'Litchfield County is a rural and suburban Northwestern Connecticut market with residential demand across Torrington, the Litchfield Hills, and Berkshire foothill communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Litchfield County pricing reflects rural northwestern CT demand, Route 8 and Route 202 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Torrington, Litchfield, and surrounding hill towns before booking.',
      'Regional traffic on Route 8 and Route 202 impacts scheduling — confirm crew arrival windows.',
      'Rural and hillside properties may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and seasonal properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  middlesex: {
    marketNotes:
      'Middlesex County centers on Middletown along the Connecticut River with residential demand across river valley communities and Wesleyan University corridor towns.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Middlesex County pricing reflects river valley demand, Route 9 and I-91 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Middletown, Cromwell, and surrounding river valley towns before booking.',
      'Regional traffic on Route 9 impacts scheduling — confirm crew arrival windows.',
      'River valley communities may require bridge crossing coordination — confirm crew routing.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'new-london': {
    marketNotes:
      'New London County includes southeastern Connecticut coastal areas with strong residential, naval-base, tourism, and waterfront demand across New London and Groton.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'New London County pricing reflects coastal and naval-corridor demand, I-95 and Route 32 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for New London, Groton, Mystic, and surrounding coastal towns before booking.',
      'Coastal and tourist traffic on I-95 impacts scheduling — confirm crew arrival windows.',
      'Naval-base and waterfront communities may require access coordination — confirm building access.',
      'Confirm insurance for high-value waterfront homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  tolland: {
    marketNotes:
      'Tolland County is an eastern Connecticut county with suburban and rural residential demand across Rockville, Vernon, and university-adjacent communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Tolland County pricing reflects eastern CT suburban demand, I-84 and Route 44 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Rockville, Vernon, and surrounding eastern Connecticut towns before booking.',
      'Regional traffic on I-84 impacts scheduling — confirm crew arrival windows.',
      'Suburban and rural communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  windham: {
    marketNotes:
      'Windham County is a rural northeastern Connecticut market known as part of the Quiet Corner with residential demand across Willimantic and eastern border communities.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Windham County pricing reflects Quiet Corner rural demand, Route 395 and US-44 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Willimantic, Danielson, and surrounding Quiet Corner towns before booking.',
      'Regional traffic on Route 395 impacts scheduling — confirm crew arrival windows.',
      'Rural communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getConnecticutCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return connecticutCountyResearch[countySlug];
}