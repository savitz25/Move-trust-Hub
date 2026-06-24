import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Maryland county research — batches 1–2 */
export const marylandCountyResearch: Record<string, CuratedCountyResearch> = {
  montgomery: {
    marketNotes:
      "Montgomery County is one of Maryland's largest and most affluent counties with strong suburban, corporate, and residential demand across Rockville, Bethesda, Silver Spring, and the Washington DC metro spillover.",
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$130–$195/hr for a 2-person crew',
      note: 'Montgomery County pricing reflects affluent DC-suburb demand, federal contractor relocations, I-270 and Beltway traffic, and competition among full-service Maryland agents.',
    },
    tips: [
      'Verify coverage for Rockville, Bethesda, Silver Spring, and surrounding areas before booking.',
      'Federal and corporate relocations along the I-270 corridor may require flexible scheduling — confirm crew availability.',
      'Heavy DC metro traffic on I-495, I-270, and Route 355 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September), federal transfer windows, and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'prince-georges': {
    marketNotes:
      "Prince George's County is a large and diverse suburban county bordering Washington DC with strong residential and commercial demand across Upper Marlboro, Bowie, Laurel, and the Capital Beltway corridor.",
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,500+',
      avgHourly: '$125–$185/hr for a 2-person crew',
      note: "Prince George's County pricing reflects diverse DC-border suburban demand, Metro-accessible communities, Beltway traffic, and competition among regional full-service agents.",
    },
    tips: [
      'Verify coverage for Upper Marlboro, Bowie, Laurel, and surrounding areas before booking.',
      'Moves near Metro stations and mixed-use developments may require elevator or loading-zone coordination — confirm building access.',
      'Heavy DC metro traffic on I-495, Route 50, and Baltimore-Washington Parkway significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  baltimore: {
    marketNotes:
      'Baltimore County surrounds the independent city of Baltimore with strong suburban, residential, and commercial demand across Towson, Catonsville, Dundalk, and the I-695 Beltway communities.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,500+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Baltimore County pricing reflects suburban Baltimore metro demand, university and hospital corridor relocations, I-695 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Towson, Catonsville, Dundalk, and surrounding areas before booking.',
      'Towson university and hospital corridor moves may require parking permits or tight loading windows — confirm access in advance.',
      'Baltimore-area traffic on I-695, I-83, and I-95 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, rowhome-adjacent communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'anne-arundel': {
    marketNotes:
      'Anne Arundel County is a large suburban county with strong residential, naval, and waterfront demand across Annapolis, Glen Burnie, and the Chesapeake Bay corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: 'Anne Arundel County pricing reflects naval-station relocations, Annapolis waterfront demand, Bay Bridge traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Annapolis, Glen Burnie, and surrounding areas before booking.',
      'Naval station and government-related moves may require security clearance coordination — confirm access requirements.',
      'Regional traffic and Bay Bridge crossings significantly impact scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value waterfront homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'baltimore-city': {
    marketNotes:
      'Baltimore City is an independent city with dense urban, historic, and residential demand across Inner Harbor, Federal Hill, and neighborhood corridors throughout the metro.',
    costs: {
      studioRange: '$850–$1,800',
      familyRange: '$3,200–$8,000+',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Baltimore City pricing reflects urban rowhome and historic-property demand, parking permit requirements, harbor-area traffic, and competition among city-focused full-service agents.',
    },
    tips: [
      'Verify coverage for Baltimore City neighborhoods before booking.',
      'Urban traffic, one-way streets, and parking restrictions significantly impact scheduling — confirm permits and loading zones.',
      'Historic rowhomes and walk-up buildings may require tight stairwell coordination — confirm crew equipment fit.',
      'Confirm insurance for high-value urban and historic properties, condos, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  howard: {
    marketNotes:
      "Howard County is one of Maryland's most affluent and centrally located counties with strong suburban residential demand across Ellicott City, Columbia, and the I-95 / Route 29 corridor.",
    costs: {
      studioRange: '$950–$2,000',
      familyRange: '$3,800–$9,000+',
      avgHourly: '$125–$190/hr for a 2-person crew',
      note: 'Howard County pricing reflects affluent Columbia planned-community demand, DC and Baltimore commuter volume, Route 29 traffic, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Ellicott City, Columbia, and surrounding areas before booking.',
      'Columbia association and townhouse communities may require HOA or loading-zone coordination — confirm building access.',
      'Heavy regional traffic on I-95, Route 29, and Route 32 significantly impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value suburban homes, townhome communities, and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  frederick: {
    marketNotes:
      'Frederick County is a growing suburban and rural county in Central Maryland with strong residential demand across Frederick, Urbana, and the I-70 corridor toward Washington DC and Baltimore.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Frederick County pricing reflects I-70 commuter growth, Catoctin Mountain corridor relocations, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Frederick and surrounding areas before booking.',
      'I-70 and US-15 commuter traffic impacts scheduling — confirm crew arrival windows.',
      'Rural and mountain-adjacent properties may require longer drive times — confirm access roads and parking.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  harford: {
    marketNotes:
      'Harford County is a suburban county northeast of Baltimore with strong residential demand across Bel Air, Aberdeen, and the I-95 northeast corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Harford County pricing reflects Aberdeen Proving Ground corridor relocations, Baltimore commuter demand, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Bel Air and surrounding areas before booking.',
      'Baltimore-area and I-95 northeast traffic impacts scheduling — confirm crew arrival windows.',
      'Military and government-adjacent moves near Aberdeen may require flexible scheduling — confirm crew availability.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  charles: {
    marketNotes:
      'Charles County is a growing suburban county south of Washington DC with strong residential demand across La Plata, Waldorf, and the Potomac River south corridor.',
    costs: {
      studioRange: '$900–$1,900',
      familyRange: '$3,500–$8,000+',
      avgHourly: '$120–$180/hr for a 2-person crew',
      note: "Charles County pricing reflects DC-south commuter growth, Waldorf corridor volume, Route 301 traffic, and competition among regional full-service agents.",
    },
    tips: [
      'Verify coverage for La Plata and surrounding areas before booking.',
      'DC metro and Route 301 commuter traffic impacts scheduling — confirm crew arrival windows.',
      'Fast-growing Waldorf and Brandywine communities may involve new-construction access — confirm site readiness.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
};

export function getMarylandCountyResearch(
  countySlug: string
): CuratedCountyResearch | undefined {
  return marylandCountyResearch[countySlug];
}