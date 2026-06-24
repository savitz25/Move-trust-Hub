import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Connecticut planning region research — complete state (9 regions) */
export const connecticutCountyResearch: Record<string, CuratedCountyResearch> = {
  capitol: {
    marketNotes:
      'The Capitol Planning Region centers on Hartford with strong urban, suburban, corporate, and residential demand across the state capital and I-84/I-91 corridor communities.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Capitol Region pricing reflects Hartford metro corporate relocation volume, insurance-corridor demand, I-84 and I-91 traffic, and competition among full-service Connecticut agents.',
    },
    tips: [
      'Verify coverage for Hartford, West Hartford, East Hartford, and surrounding towns before booking.',
      'Heavy urban and interstate traffic on I-84 and I-91 significantly impacts scheduling — confirm crew arrival windows.',
      'Corporate and executive relocations along the Hartford financial corridor may require after-hours scheduling — confirm crew availability.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'western-connecticut': {
    marketNotes:
      'The Western Connecticut Planning Region includes affluent suburban and rural towns with strong residential demand across Danbury, Ridgefield, and the New York border corridor.',
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$190/hr for a 2-person crew',
      note: 'Western Connecticut pricing reflects affluent suburban demand, I-84 and Route 7 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Danbury, Ridgefield, New Milford, and surrounding towns before booking.',
      'Regional traffic on I-84 and Route 7 impacts scheduling — confirm crew arrival windows.',
      'High-value suburban estates may require specialized packing and insurance — confirm coverage limits.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'south-central-connecticut': {
    marketNotes:
      'The South Central Connecticut Planning Region centers on New Haven with strong urban, suburban, and educational demand across Yale University, shoreline communities, and I-95 corridor towns.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'South Central Connecticut pricing reflects New Haven metro and university corridor demand, I-95 and I-91 traffic, and competition among full-service agents.',
    },
    tips: [
      'Verify coverage for New Haven, Hamden, Milford, and surrounding towns before booking.',
      'Regional traffic on I-95 and I-91 impacts scheduling — confirm crew arrival windows.',
      'University and hospital corridor moves may require parking coordination — confirm building access.',
      'Confirm insurance for high-value urban and suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and semester changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'naugatuck-valley': {
    marketNotes:
      'The Naugatuck Valley Planning Region centers on Waterbury with strong residential and industrial demand across the Naugatuck River valley communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Naugatuck Valley pricing reflects Waterbury metro demand, Route 8 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Waterbury, Naugatuck, Torrington-adjacent valley towns, and surrounding communities before booking.',
      'Regional traffic on Route 8 and I-84 impacts scheduling — confirm crew arrival windows.',
      'Industrial and hillside communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'greater-bridgeport': {
    marketNotes:
      'The Greater Bridgeport Planning Region centers on Bridgeport with strong urban and coastal residential demand across Fairfield County shoreline and I-95 corridor communities.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: 'Greater Bridgeport pricing reflects coastal urban demand, I-95 and Merritt Parkway traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bridgeport, Stratford, Fairfield, and surrounding towns before booking.',
      'Coastal and urban traffic on I-95 and the Merritt Parkway impacts scheduling — confirm crew arrival windows.',
      'Waterfront and coastal properties may require access coordination — confirm building access and parking.',
      'Confirm insurance for high-value coastal homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'southeastern-connecticut': {
    marketNotes:
      'The Southeastern Connecticut Planning Region includes coastal areas with strong residential, naval, and tourism demand across New London, Groton, Mystic, and the Thames River corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Southeastern Connecticut pricing reflects coastal tourism and naval-base corridor demand, I-95 and Route 32 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for New London, Groton, Mystic, and surrounding towns before booking.',
      'Coastal and tourist traffic on I-95 and Route 32 impacts scheduling — confirm crew arrival windows.',
      'Naval-base and waterfront communities may require access coordination — confirm building access.',
      'Confirm insurance for high-value waterfront homes and multi-floor loading zones.',
      'Book early for peak tourist seasons (June–August) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'lower-connecticut-river-valley': {
    marketNotes:
      'The Lower Connecticut River Valley Planning Region centers on Middletown with strong residential demand across the Connecticut River middle corridor and Wesleyan University communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Lower Connecticut River Valley pricing reflects Middletown metro and river-corridor demand, Route 9 and I-91 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Middletown, Cromwell, East Hampton, and surrounding towns before booking.',
      'Regional traffic on Route 9 and I-91 impacts scheduling — confirm crew arrival windows.',
      'River valley communities may require bridge crossing coordination — confirm crew routing.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'northwest-hills': {
    marketNotes:
      'The Northwest Hills Planning Region is a rural and suburban area in Northwestern Connecticut with residential demand across Torrington, Litchfield Hills, and Berkshire foothill communities.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Northwest Hills pricing reflects rural northwestern CT demand, Route 8 and Route 202 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Torrington, Litchfield, Winchester, and surrounding towns before booking.',
      'Regional traffic on Route 8 and Route 202 impacts scheduling — confirm crew arrival windows.',
      'Rural and hillside communities may require longer drive times — confirm crew coverage radius.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'northeastern-connecticut': {
    marketNotes:
      'The Northeastern Connecticut Planning Region is a rural area known as the Quiet Corner with residential demand across Putnam, Danielson, and the Massachusetts and Rhode Island border corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$105–$160/hr for a 2-person crew',
      note: 'Northeastern Connecticut pricing reflects Quiet Corner rural demand, Route 395 and US-44 corridor traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Putnam, Danielson, Thompson, and surrounding towns before booking.',
      'Regional traffic on Route 395 and US-44 impacts scheduling — confirm crew arrival windows.',
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