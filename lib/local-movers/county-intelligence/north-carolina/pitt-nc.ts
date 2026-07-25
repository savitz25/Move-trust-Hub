import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * pitt — NC Tier 2 Wave 1
 */
export const pittCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'pitt',
  hubTitle: 'Pitt County Moving Intelligence Hub',
  eyebrow: 'Pitt · Greenville — East Carolina university/medical',
  h1: 'Moving in Pitt County: Greenville, ECU Cycles & Eastern Medical Hub Access',
  heroOpener:
    'Pitt County is eastern NC university/medical independent product — Greenville multi-story and near-ECU density, medical-campus multi-family, Winterville and Ayden edges, and freeflow on US-264 / US-13 that is not Raleigh capital towers or Wilmington coastal tourism with different labels. Expect term calendars, hospital-shift housing turnover, and Coastal Plain empty miles under one county. This guide is for people moving in Pitt as Greenville ECU/medical hub — not generic eastern NC boilerplate.',
  heroCredibility:
    'Greenville ECU/medical hub · University cycles · Eastern NC independent · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-264 · US-13 · NC-11 · NC-33 · NC-43 · Firetower Rd corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent eastern NC (vs Triangle / coastal defaults)',
    parentHref: '/local-movers/north-carolina/wake',
    title: 'Compared with independent eastern NC (vs Triangle / coastal defaults)',
    intro:
      'Pitt is Greenville ECU/medical independent hub — not Wake capital multi-family and not New Hanover coastal tourism density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Wake crews fight I-40/I-440 capital peaks. Pitt pairs ride US-264, US-13, and NC-11 — freer mid-day eastern freeflow, still peak-heavy on Greenville arterials and ECU term windows. Portal-to-portal time is real; it is not a Raleigh elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Wake mixes capital elevators and Cary HOAs. Pitt mixes near-campus multi-story, medical multi-family, and Winterville SFH — more university/medical product, less continuous capital vertical density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus and hospital multi-family need COIs and curb plans; rural edges add soft shoulders and longer empty miles.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Pitt quotes often track eastern NC secondary-premium rates near campus — term peaks and multi-story access push prices above quiet rural driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Pitt is Greenville ECU/medical independent — not Triangle or Wilmington product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Pitt County different',
    intro: 'ECU term calendars, medical multi-family, and eastern freeflow — not interchangeable capital or coastal boilerplate.',
    bullets: [
      {
        title: 'ECU term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill crews and parking near campus.',
      },
      {
        title: 'Medical multi-family is first-class product',
        detail:
          'Hospital-shift housing needs elevator inventories and flexible windows.',
      },
      {
        title: 'US-264 / US-13 freeflow is still billable',
        detail:
          'Eastern pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Coastal Plain empty miles rewrite rural rates',
        detail:
          'Far edges fail when crews assume Greenville day rates.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Pitt zones: ECU campus edge, medical multi-family, Winterville growth & rural edges',
  zonesIntro: 'Two to four sharp products — campus multi-story, medical multi-family, growth SFH, and rural edges.',
  zones: [
    {
      id: 'ecu-edge',
      name: 'ECU campus-edge multi-story',
      shortName: 'ECU edge',
      neighborhoods: ["Greenville near campus","student multi-family"],
      housingTypes: 'Multi-story, multi-unit',
      challenges: ["Term parking","Stairs/elevators","COI packets"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["greenville ecu","east carolina"],
    },
    {
      id: 'medical',
      name: 'Medical multi-family corridors',
      shortName: 'Medical corridors',
      neighborhoods: ["hospital-adjacent multi-family","Firetower corridors"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Shift windows","Parking limits"],
      moverTips: 'Confirm elevator reservations; allow flexible start times.',
      cityKeywords: ["greenville medical"],
    },
    {
      id: 'winterville',
      name: 'Winterville / Ayden growth SFH',
      shortName: 'Winterville growth',
      neighborhoods: ["Winterville","Ayden edges","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","US-13 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["winterville","ayden"],
    },
    {
      id: 'rural-edge',
      name: 'Eastern & western rural edges',
      shortName: 'Rural edge',
      neighborhoods: ["Farmville edges","Grifton edges","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["farmville","grifton"],
    }
  ],
  specialized: [
    {
      id: 'ecu-cycles',
      title: 'ECU university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'medical-multi',
      title: 'Medical multi-family access',
      intro: 'Hospital-adjacent elevators are first-class cost drivers.',
      bullets: ["Collect COI and elevator rules early.","Shift schedules may prefer non-standard start times."],
    },
    {
      id: 'eastern-freeflow',
      title: 'US-264 / US-13 eastern freeflow',
      intro: 'Independent hub pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Clarify Triangle or coastal second addresses for long empty-mile assumptions."],
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
        intro: 'Pitt families compare Pitt County Schools feeders across Greenville, Winterville, and surrounding towns — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'ECU Health Medical Center and related campuses anchor acute care; map peak campus and arterial times for ER access.',
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
    intro: 'Term peaks, medical multi-family access, and eastern empty miles often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'University calendars, medical shift patterns, school years, and hurricane season reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent eastern NC (vs Triangle / coastal defaults) movers (parent contrast)',
        href: '/local-movers/north-carolina/wake',
      },
      {
        label: 'New Hanover County movers',
        href: '/local-movers/north-carolina/new-hanover',
      },
    ],
  },
});
