import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** floyd — GA Tier 2 Wave 2 */
export const floydCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'floyd',
  hubTitle: 'Floyd County Moving Intelligence Hub',
  eyebrow: 'Floyd · Rome · NW Georgia independent',
  h1: 'Moving in Floyd County: Rome Regional Hub, Medical/University Corridors & US-27 Access',
  heroOpener: 'Floyd County is northwest Georgia’s independent regional hub — Rome multi-story and medical/university corridors, US-27 / US-411 freeflow, and product that does not answer to Atlanta collar defaults. Expect city stairs, longer empty miles to rural ridges, and freeflow that is not Bartow I-75 outer growth alone. This guide is for people moving in Floyd as Rome NW GA hub — not an Atlanta metro rename.',
  heroCredibility: 'Rome regional hub · Medical/university · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-27 · US-411 · GA-20 · GA-53 · GA-1 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent NW Georgia hub (vs Atlanta collar / Bartow defaults)',
    parentHref: '/local-movers/georgia/bartow',
    title: 'Compared with independent NW Georgia hub (vs Atlanta collar / Bartow defaults)',
    intro: 'Floyd is Rome medical/university regional hub — not Atlanta HOA collars and not Bartow I-75 outer growth alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Atlanta collar crews fight Perimeter peaks; Bartow rides I-75. Floyd pairs ride US-27, US-411, and Rome arterials — freer mid-day NW GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Bartow mixes Cartersville SFH and Allatoona edges. Floyd mixes Rome multi-story, medical-corridor stock, and ridge lots — more continuous regional city product, less continuous metro-collar HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Historic and multi-story stock needs stair inventories; rural ridges add empty miles uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Floyd quotes often sit at secondary regional-hub rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Floyd is independent Rome NW GA hub — not Atlanta defaults renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Floyd County different',
    intro: 'Rome multi-story, medical/university freeflow, and NW GA empty miles — not an Atlanta clone.',
    bullets: [
      {
        title: 'Medical and university calendars drive spikes',
        detail: 'Campus and hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Rome multi-story is first-class product',
        detail: 'Stairs and historic street width need inventories different from pure suburban playbooks.',
      },
      {
        title: 'US-27 / US-411 freeflow is billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'AL / TN adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Floyd zones: Rome core, medical/university corridors, suburban edges & rural ridges',
  zonesIntro: 'Two to four sharp products under one NW GA hub label.',
  zones: [
    {
      id: 'rome-core',
      name: 'Rome city core & historic stock',
      shortName: 'Rome core',
      neighborhoods: ["Rome","downtown","historic neighborhoods"],
      housingTypes: 'Multi-story, historic, multi-unit',
      challenges: ["Stairs","Street width","Parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking; measure street width.',
      cityKeywords: ["rome ga"],
    },
    {
      id: 'med-univ',
      name: 'Medical & university corridors',
      shortName: 'Medical / university',
      neighborhoods: ["medical campuses","university edges"],
      housingTypes: 'Multi-family, SFH, campus-adjacent',
      challenges: ["Building COIs","Campus calendars"],
      moverTips: 'Book around campus and clinical calendars; collect management packets.',
      cityKeywords: ["rome medical"],
    },
    {
      id: 'suburbs',
      name: 'Suburban edges',
      shortName: 'Suburbs',
      neighborhoods: ["suburban Rome edges"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["rome suburbs"],
    },
    {
      id: 'ridges',
      name: 'Rural ridges & larger lots',
      shortName: 'Rural ridges',
      neighborhoods: ["ridge towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Grades"],
      moverTips: 'Photo last-mile; rain and grade weeks need flexibility.',
      cityKeywords: ["floyd rural"],
    }
  ],
  specialized: [
    {
      id: 'rome-city',
      title: 'Rome multi-story & historic access',
      intro: 'Stairs and street width are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'med-univ',
      title: 'Medical/university corridor logistics',
      intro: 'Campus and clinical calendars rewrite demand.',
      bullets: ["Book early around term and clinical peaks.","Collect building packets on multi-family."],
    },
    {
      id: 'nw-freeflow',
      title: 'US-27 / US-411 hub freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Atlanta collar rates for Rome historic days."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Floyd families compare Floyd County and Rome City school options — verify boundaries; regional-hub reputation does not replace district maps.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Atrium Health Floyd and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City access, medical peaks, and empty-mile ridges often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'University calendars, medical staffing moves, and school years reshape demand more than Atlanta HOA peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, tourism, or industrial windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent NW Georgia hub (vs Atlanta collar / Bartow defaults) movers (parent contrast)', href: '/local-movers/georgia/bartow' },
    ],
  },
});
