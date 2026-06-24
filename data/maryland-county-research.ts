import type { CountyCostGuide } from '@/lib/local-movers/county-seo';

export type CuratedCountyResearch = {
  marketNotes: string;
  costs: CountyCostGuide;
  tips: string[];
};

/** Hand-curated Maryland county research — complete state */
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
  carroll: {
    marketNotes:
      'Carroll County is a suburban and rural county northwest of Baltimore with strong residential demand across Westminster and the Baltimore metro fringe.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Carroll County pricing reflects Baltimore northwest commuter demand, rural property access, and competition among regional full-service agents.',
    },
    tips: [
      'Verify coverage for Westminster and surrounding areas before booking.',
      'Baltimore-area and Route 140 commuter traffic impacts scheduling — confirm crew arrival windows.',
      'Rural and acreage properties may require longer drive times — confirm access roads and parking.',
      'Confirm insurance for high-value suburban homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  washington: {
    marketNotes:
      'Washington County is a key Western Maryland county with residential and commercial demand across Hagerstown, Williamsport, and the I-81 corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Washington County pricing reflects I-81 and I-70 corridor volume, cross-border Pennsylvania commuter demand, and regional agent competition.',
    },
    tips: [
      'Verify coverage for Hagerstown and surrounding areas before booking.',
      'I-70 and I-81 regional traffic impacts scheduling — confirm crew arrival windows.',
      'Cross-border moves toward Pennsylvania may require additional coordination — confirm service area.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'st-marys': {
    marketNotes:
      "St. Mary's County is a Southern Maryland county with strong naval and residential demand across Leonardtown, Lexington Park, and the Patuxent River corridor.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: "St. Mary's County pricing reflects naval station relocations, Patuxent River waterfront demand, and regional full-service agent competition.",
    },
    tips: [
      'Verify coverage for Leonardtown and surrounding areas before booking.',
      'Naval station and government-related moves may require security coordination — confirm access requirements.',
      'Regional traffic on Route 235 and Route 4 impacts scheduling — confirm crew arrival windows.',
      'Confirm insurance for high-value homes and waterfront properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  cecil: {
    marketNotes:
      'Cecil County is a Northern Maryland county with strong residential and industrial demand across Elkton, North East, and the I-95 Delaware border corridor.',
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Cecil County pricing reflects I-95 northeast volume, Delaware and Pennsylvania cross-border demand, and regional agent competition.',
    },
    tips: [
      'Verify coverage for Elkton and surrounding areas before booking.',
      'I-95 and Delaware Memorial Bridge traffic impacts scheduling — confirm crew arrival windows.',
      'Cross-border moves to Delaware or Pennsylvania may require additional coordination — confirm service area.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  wicomico: {
    marketNotes:
      "Wicomico County is the core of Maryland's Eastern Shore with strong residential and commercial demand across Salisbury and the Route 13 corridor.",
    costs: {
      studioRange: '$800–$1,600',
      familyRange: '$2,900–$6,500+',
      avgHourly: '$105–$165/hr for a 2-person crew',
      note: 'Wicomico County pricing reflects Salisbury metro hub volume, university and hospital corridor demand, and Eastern Shore agent competition.',
    },
    tips: [
      'Verify coverage for Salisbury and surrounding areas before booking.',
      'Regional traffic on Route 13 and US-50 impacts scheduling — confirm crew arrival windows.',
      'University and hospital corridor moves may require flexible scheduling — confirm crew availability.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  calvert: {
    marketNotes:
      'Calvert County is a Southern Maryland county with strong residential and waterfront demand across Prince Frederick, Dunkirk, and the Patuxent River peninsula.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Calvert County pricing reflects waterfront and peninsula access, DC commuter spillover, and regional full-service agent competition.',
    },
    tips: [
      'Verify coverage for Prince Frederick and surrounding areas before booking.',
      'Peninsula and bridge crossings on Route 4 impact scheduling — confirm crew arrival windows.',
      'Waterfront properties may require tide or access coordination — confirm loading conditions.',
      'Confirm insurance for high-value waterfront homes and elevated properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  allegany: {
    marketNotes:
      'Allegany County is a rural Western Maryland county with residential demand across Cumberland, Frostburg, and the Appalachian plateau.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Allegany County pricing reflects rural Western Maryland demand, mountain terrain access, and limited regional agent competition.',
    },
    tips: [
      'Verify coverage for Cumberland and surrounding areas before booking.',
      'Mountain roads and regional traffic on I-68 impact scheduling — confirm crew arrival windows.',
      'Rural and hillside properties may require longer drive times — confirm access and parking.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  'queen-annes': {
    marketNotes:
      "Queen Anne's County is an Eastern Shore county with strong waterfront and residential demand across Centreville, Stevensville, and the Chesapeake Bay Bridge corridor.",
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: "Queen Anne's County pricing reflects Bay Bridge commuter volume, waterfront second-home demand, and Eastern Shore agent competition.",
    },
    tips: [
      'Verify coverage for Centreville and surrounding areas before booking.',
      'Bay Bridge and US-50 corridor traffic significantly impacts scheduling — confirm crew arrival windows.',
      'Waterfront and vacation properties may involve seasonal access — confirm availability.',
      'Confirm insurance for high-value waterfront homes and elevated properties.',
      'Book early for peak seasons (May–September) and summer tourist traffic.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  worcester: {
    marketNotes:
      'Worcester County is an Eastern Shore county with strong tourism and coastal residential demand across Ocean City, Berlin, and Snow Hill.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Worcester County pricing reflects coastal tourism demand, seasonal beach-community volume, and Eastern Shore agent competition.',
    },
    tips: [
      'Verify coverage for Ocean City and surrounding areas before booking.',
      'Tourist traffic and coastal bridge congestion significantly impacts scheduling — confirm crew arrival windows.',
      'Beach condos and vacation homes often involve seasonal access windows — confirm peak and off-season availability.',
      'Confirm insurance for high-value coastal homes and vacation properties.',
      'Book early for peak tourist seasons (May–September) and summer lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  talbot: {
    marketNotes:
      'Talbot County is an Eastern Shore county with strong waterfront and residential demand across Easton, St. Michaels, and the Mid-Shore corridor.',
    costs: {
      studioRange: '$850–$1,700',
      familyRange: '$3,000–$7,000+',
      avgHourly: '$110–$170/hr for a 2-person crew',
      note: 'Talbot County pricing reflects affluent Mid-Shore waterfront demand, retirement relocation turnover, and regional agent competition.',
    },
    tips: [
      'Verify coverage for Easton and surrounding areas before booking.',
      'Mid-Shore bridge and Route 50 traffic impacts scheduling — confirm crew arrival windows.',
      'Historic waterfront homes may require careful handling — confirm packing and access needs.',
      'Confirm insurance for high-value waterfront homes and vacation properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  caroline: {
    marketNotes:
      'Caroline County is a rural Eastern Shore county with residential demand across Denton, Federalsburg, and the Route 404 corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Caroline County pricing reflects rural Eastern Shore demand, limited agent density, and regional full-service competition.',
    },
    tips: [
      'Verify coverage for Denton and surrounding areas before booking.',
      'Rural roads and Route 404 traffic impacts scheduling — confirm crew arrival windows.',
      'Agricultural and rural properties may require longer drive times — confirm access and parking.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  dorchester: {
    marketNotes:
      'Dorchester County is a rural Eastern Shore county with residential demand across Cambridge, Hurlock, and the Choptank River corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Dorchester County pricing reflects rural Lower Shore demand, waterfront access along the Choptank, and regional agent competition.',
    },
    tips: [
      'Verify coverage for Cambridge and surrounding areas before booking.',
      'Regional traffic on US-50 and Route 16 impacts scheduling — confirm crew arrival windows.',
      'Waterfront and flood-zone properties may require access coordination — confirm loading conditions.',
      'Confirm insurance for high-value homes and elevated properties.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  garrett: {
    marketNotes:
      "Garrett County is Maryland's westernmost and most mountainous county with residential and tourism demand across Oakland, Deep Creek Lake, and the Allegheny Highlands.",
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Garrett County pricing reflects mountain terrain access, Deep Creek Lake seasonal tourism, and limited regional agent competition.',
    },
    tips: [
      'Verify coverage for Oakland and surrounding areas before booking.',
      'Mountainous terrain and winter weather significantly impacts scheduling — confirm crew arrival windows.',
      'Vacation homes and lake properties may involve seasonal access — confirm off-season and peak-season availability.',
      'Confirm insurance for high-value mountain homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and ski-season turnover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  somerset: {
    marketNotes:
      'Somerset County is a rural Eastern Shore county with residential demand across Princess Anne, Crisfield, and the Lower Shore corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Somerset County pricing reflects rural Lower Shore demand, seafood-industry community turnover, and limited regional agent competition.',
    },
    tips: [
      'Verify coverage for Princess Anne and surrounding areas before booking.',
      'Rural Lower Shore roads and regional traffic impacts scheduling — confirm crew arrival windows.',
      'Waterfront and rural properties may require longer drive times — confirm access and parking.',
      'Confirm insurance for high-value homes and multi-floor loading zones.',
      'Book early for peak seasons (May–September) and month-end lease changeover.',
      'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.',
    ],
  },
  kent: {
    marketNotes:
      'Kent County is a rural Eastern Shore county with residential demand across Chestertown, Rock Hall, and the Upper Eastern Shore corridor.',
    costs: {
      studioRange: '$750–$1,500',
      familyRange: '$2,600–$5,800+',
      avgHourly: '$100–$155/hr for a 2-person crew',
      note: 'Kent County pricing reflects rural Upper Shore demand, Chester River waterfront turnover, and limited regional agent competition.',
    },
    tips: [
      'Verify coverage for Chestertown and surrounding areas before booking.',
      'Rural roads and Route 301 corridor traffic impacts scheduling — confirm crew arrival windows.',
      'Historic waterfront homes may require careful handling — confirm packing and access needs.',
      'Confirm insurance for high-value homes and waterfront properties.',
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