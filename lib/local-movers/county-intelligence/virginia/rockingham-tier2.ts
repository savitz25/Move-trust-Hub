import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** rockingham — VA Tier 2 Wave 2 */
export const rockinghamCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'rockingham',
  hubTitle: 'Rockingham County Moving Intelligence Hub',
  eyebrow: 'Rockingham · independent JMU market · Harrisonburg ring · vs Augusta',
  h1: 'Moving in Rockingham County: Independent JMU / Harrisonburg Valley Market',
  heroOpener: 'Rockingham County is an independent north-central valley market wrapping Harrisonburg — JMU-adjacent growth outside city limits, poultry and agriculture employment, and I-81 towns that are not Augusta’s Staunton–Waynesboro medical corridor and not Harrisonburg city government. Expect city/county line confusion, farm lanes, and portal-to-portal time map miles understate. This guide is for people moving in Rockingham County as independent JMU-area product — distinct from Augusta.',
  heroCredibility: 'Independent JMU market · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · US-11 · US-33 · SR-42 · SR-259',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent JMU / Harrisonburg-area valley market (vs Augusta / NoVA defaults)',
    parentHref: '/local-movers/virginia/augusta',
    title: 'Compared with independent JMU / Harrisonburg-area valley market (vs Augusta / NoVA defaults)',
    intro: 'Rockingham is JMU-adjacent valley product — related I-81 freeflow to Augusta, different university gravity and seat fabric.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Augusta pairs lean Fishersville medical corridor and I-64 links. Rockingham pairs lean Harrisonburg ring, Bridgewater/Dayton towns, and US-33 mountain approaches — freer mid-day JMU-ring freeflow, still peak-heavy on term weekends.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Augusta mixes medical-adjacent and farm lots. Rockingham mixes county-ring suburbs, ag workforce housing, and JMU spillover multi-family near the city line.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City-line confusion and farm lanes rewrite plans more often than pure Fishersville medical freeflow.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'County-ring SFH often sits near valley secondary rates — JMU spillover multi-family near the line still pushes premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Rockingham is independent JMU-area valley identity — not Augusta renamed and not Harrisonburg city government.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Rockingham County different',
    intro: 'JMU spillover and county vs city lines — not an Augusta clone.',
    bullets: [
      {
        title: 'Distinct from Augusta valley frame',
        detail: 'JMU/Harrisonburg gravity is not Staunton–Waynesboro medical corridor product.',
      },
      {
        title: 'County vs Harrisonburg city',
        detail: 'JMU move energy spills into the county, but parking and permit rules do not automatically follow.',
      },
      {
        title: 'Ag and plant workforce housing',
        detail: 'Shift timing near major employers affects neighborhood access.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Rockingham zones: Harrisonburg ring, southern towns, eastern approaches & western rural',
  zonesIntro: 'Two to four sharp products under one valley-county label.',
  zones: [
    {
      id: 'ring',
      name: 'County ring around Harrisonburg',
      shortName: 'Harrisonburg ring',
      neighborhoods: ["county ring suburbs"],
      housingTypes: 'Suburban growth just outside city limits',
      challenges: ["City/county line confusion"],
      moverTips: 'Pin Harrisonburg city vs Rockingham County on every address.',
      cityKeywords: ["harrisonburg ring"],
    },
    {
      id: 'south-towns',
      name: 'Bridgewater, Dayton & southern towns',
      shortName: 'Southern towns',
      neighborhoods: ["Bridgewater","Dayton"],
      housingTypes: 'Small towns and college-adjacent pockets',
      challenges: ["Quiet streets","Limited staging"],
      moverTips: 'Confirm small-town staging.',
      cityKeywords: ["bridgewater","dayton"],
    },
    {
      id: 'east',
      name: 'Broadway, Elkton & eastern approaches',
      shortName: 'Eastern approaches',
      neighborhoods: ["Broadway","Elkton"],
      housingTypes: 'US-33 and mountain-edge communities',
      challenges: ["Grades toward Blue Ridge"],
      moverTips: 'Photo grades on mountain approaches.',
      cityKeywords: ["broadway va","elkton"],
    },
    {
      id: 'west-rural',
      name: 'Western rural Rockingham',
      shortName: 'Western rural',
      neighborhoods: ["western farms"],
      housingTypes: 'Farms and valley agriculture',
      challenges: ["Long lanes","Truck weight limits"],
      moverTips: 'Survey farm lanes before pack day.',
      cityKeywords: ["rockingham rural"],
    }
  ],
  specialized: [
    {
      id: 'city-line',
      title: 'County vs Harrisonburg city',
      intro: 'Jurisdiction must be explicit on every estimate.',
      bullets: ["Pin city vs county on every address."],
    },
    {
      id: 'ag-workforce',
      title: 'Ag and plant workforce housing',
      intro: 'Shift timing near major employers affects neighborhood access.',
      bullets: ["Ask about employer shift windows."],
    },
    {
      id: 'i81-valley',
      title: 'Valley interstate logistics',
      intro: 'I-81 through traffic shapes long-haul ETAs.',
      bullets: ["Price portal-to-portal honestly."],
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
        intro: 'Rockingham families compare Rockingham County Public Schools feeders — verify boundaries; do not assume Harrisonburg city maps apply.',
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
            detail: 'Sentara RMH Medical Center (Harrisonburg) anchors regional care; map freeflow by which county pocket you load.',
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
    intro: 'Jurisdiction errors, farm last-mile, and I-81 peaks often matter more than raw miles.',
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
    intro: 'JMU spillover calendars and valley weather reshape demand more than pure NoVA office peaks alone.',
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
      { label: 'Augusta County movers (parent contrast)', href: '/local-movers/virginia/augusta' },
    ],
  },
});
