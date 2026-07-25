import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** lynchburg — VA Tier 2 Wave 2 */
export const lynchburgCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'lynchburg',
  hubTitle: 'Lynchburg Moving Intelligence Hub',
  eyebrow: 'Lynchburg · hill city / Liberty / riverfront · vs Bedford County',
  h1: 'Moving in Lynchburg: Hill City on the James River',
  heroOpener: 'Lynchburg is an independent hill city on the James — Liberty University gravity, regional medical campuses, steep streets, and downtown revitalization fabric that is not a Bedford County subdivision rename. Expect grades, university calendars, and city/county line confusion on metro-edge addresses. This guide is for people moving in Lynchburg as independent-city product.',
  heroCredibility: 'Independent hill city · University & medical · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-29 · US-460 · US-501 · SR-163 · Wards Road corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Bedford County',
    parentHref: '/local-movers/virginia/bedford',
    title: 'Compared with Bedford County',
    intro: 'Lynchburg is an independent city; Bedford County surrounds much of the metro but does not set city parking or school rules — hill grades and university density the county packs understate.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Bedford pairs lean Forest suburbs and lake last-mile. Lynchburg pairs fight hill grades, downtown staging, and Liberty-area multi-family peaks.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Bedford mixes lake homes and rural lots. Lynchburg mixes hill multi-story, campus apartments, and Boonsboro suburbs.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Grades and limited downtown staging rewrite truck size more often than pure county driveway SFH.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Hill and campus multi-family can price above pure Forest driveway rates once stairs and elevators appear.',
      },
      {
        title: 'Role difference',
        detail: 'Lynchburg is independent hill city identity — not Bedford renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lynchburg different',
    intro: 'Hill grades, university peaks, and independent-city rules — not a Bedford clone.',
    bullets: [
      {
        title: 'Hill-city truck planning',
        detail: 'Grades and tight historic streets are first-class constraints.',
      },
      {
        title: 'University-driven turnover',
        detail: 'Academic peaks change elevator and parking near campus.',
      },
      {
        title: 'Independent city rules',
        detail: 'Do not assume Bedford County permit habits apply inside city limits.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lynchburg zones: downtown/riverfront, Liberty area, Boonsboro & Timberlake edge',
  zonesIntro: 'Two to four sharp products under one hill-city label.',
  zones: [
    {
      id: 'downtown',
      name: 'Downtown & riverfront',
      shortName: 'Downtown',
      neighborhoods: ["Downtown","riverfront"],
      housingTypes: 'Revitalizing core, steeper approaches',
      challenges: ["Limited staging","Grades"],
      moverTips: 'Photograph grades and street width.',
      cityKeywords: ["lynchburg downtown"],
    },
    {
      id: 'liberty',
      name: 'Liberty University area',
      shortName: 'Liberty area',
      neighborhoods: ["Liberty University area"],
      housingTypes: 'Campus-adjacent apartments, staff housing',
      challenges: ["Move-in weekends","Parking rules"],
      moverTips: 'Ask about move-in blackout windows.',
      cityKeywords: ["liberty university"],
    },
    {
      id: 'boonsboro',
      name: 'Boonsboro & suburban north',
      shortName: 'Boonsboro',
      neighborhoods: ["Boonsboro"],
      housingTypes: 'Established suburbs',
      challenges: ["More conventional driveway access"],
      moverTips: 'Still confirm city vs county lines nearby.',
      cityKeywords: ["boonsboro"],
    },
    {
      id: 'timberlake',
      name: 'Timberlake corridor edge',
      shortName: 'Timberlake edge',
      neighborhoods: ["Timberlake corridor"],
      housingTypes: 'Commercial and residential toward Campbell',
      challenges: ["City/county lines"],
      moverTips: 'Confirm city vs county addresses.',
      cityKeywords: ["timberlake"],
    }
  ],
  specialized: [
    {
      id: 'hill-city',
      title: 'Hill-city truck planning',
      intro: 'Grades and tight historic streets are first-class constraints.',
      bullets: ["Photo approaches; plan smaller trucks when needed."],
    },
    {
      id: 'university',
      title: 'University-driven turnover',
      intro: 'Academic peaks change elevator and parking availability near campus.',
      bullets: ["Book early around term windows."],
    },
    {
      id: 'city-rules',
      title: 'Independent city rules',
      intro: 'Do not assume Bedford County permit habits apply inside Lynchburg limits.',
      bullets: ["Confirm jurisdiction on every estimate."],
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
        intro: 'Lynchburg families compare Lynchburg City Schools feeders — verify boundaries; do not assume Bedford maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Centra Lynchburg General and Virginia Baptist campuses anchor care; map hill freeflow at peaks.',
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
    intro: 'Grades, campus access, and city/county line errors often matter more than raw miles.',
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
    intro: 'University calendars and school years reshape demand more than pure rural closing seasons alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Bedford County movers (parent contrast)', href: '/local-movers/virginia/bedford' },
    ],
  },
});
