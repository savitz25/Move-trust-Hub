import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** dickson — TN Tier 2 Wave 1 */
export const dicksonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'dickson',
  hubTitle: 'Dickson County Moving Intelligence Hub',
  eyebrow: 'Dickson · Dickson / White Bluff · Nashville west · vs Davidson',
  h1: 'Moving in Dickson County: Dickson, White Bluff & Western Nashville Collar',
  heroOpener: 'Dickson County is Nashville’s western collar — Dickson principal city, White Bluff and Burns growth, Charlotte seat fabric, and I-40 west freeflow that is not a Davidson rename and not Montgomery’s Fort Campbell story. Expect longer rural last-mile, small-city staging, and portal-to-portal time map miles understate. This guide is for people moving in Dickson as west-collar product.',
  heroCredibility: 'West-Nashville collar · I-40 west · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · SR-46 · SR-48 · US-70 · SR-47',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Davidson County',
    parentHref: '/local-movers/tennessee/davidson',
    title: 'Compared with Davidson County',
    intro: 'Dickson is west-of-Nashville small-city and rural-collar product — not downtown Davidson density and not Clarksville/Montgomery military product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Davidson crews fight core peaks. Dickson pairs ride I-40 west — freer mid-day off the core, still peak-heavy on Nashville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Davidson mixes towers and near-core stairs. Dickson mixes small-city SFH, White Bluff growth, and agricultural lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Long driveways and gravel lanes dominate over alley and high-rise inventory.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Dickson SFH often sits at outer-west collar rates — empty miles into Davidson still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Dickson is western collar with Charlotte seat identity — not Davidson renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Dickson County different',
    intro: 'I-40 west freeflow and rural last-mile — not a Davidson or Montgomery clone.',
    bullets: [
      {
        title: 'West freeflow is billable',
        detail: 'Dickson ↔ Davidson pairs freer mid-day still peak hard.',
      },
      {
        title: 'Small-city and acreage mix',
        detail: 'Expect more rural access notes than midtown stairs.',
      },
      {
        title: 'Not Fort Campbell by default',
        detail: 'Montgomery absorbs more military PCS volume.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Dickson zones: Dickson city, White Bluff edge, Charlotte seat & rural west',
  zonesIntro: 'Two to four sharp products under one west-collar label.',
  zones: [
    {
      id: 'dickson-city',
      name: 'Dickson city & commercial core',
      shortName: 'Dickson',
      neighborhoods: ["Dickson","commercial core"],
      housingTypes: 'Small-city SFH, mixed age',
      challenges: ["Staging","Mixed housing"],
      moverTips: 'Confirm small-city staging honesty.',
      cityKeywords: ["dickson"],
    },
    {
      id: 'white-bluff',
      name: 'White Bluff, Burns & eastern collar',
      shortName: 'White Bluff',
      neighborhoods: ["White Bluff","Burns"],
      housingTypes: 'Closer to Davidson commute patterns',
      challenges: ["County-line confusion"],
      moverTips: 'Pin Dickson vs Davidson on eastern-edge addresses.',
      cityKeywords: ["white bluff","burns"],
    },
    {
      id: 'charlotte',
      name: 'Charlotte & county seat',
      shortName: 'Charlotte',
      neighborhoods: ["Charlotte","seat"],
      housingTypes: 'Quieter town scale, civic core',
      challenges: ["Courthouse access"],
      moverTips: 'Confirm courthouse-area access.',
      cityKeywords: ["charlotte tn"],
    },
    {
      id: 'rural-west',
      name: 'Rural west and south Dickson',
      shortName: 'Rural west',
      neighborhoods: ["west/south farms"],
      housingTypes: 'Agricultural lots, long drives',
      challenges: ["Turnaround surveys"],
      moverTips: 'Photograph long driveways and gravel lanes.',
      cityKeywords: ["dickson rural"],
    }
  ],
  specialized: [
    {
      id: 'west-collar',
      title: 'Western Nashville collar',
      intro: 'Dickson absorbs households seeking space west of Davidson.',
      bullets: ["Do not quote Davidson CBD rates for Dickson SFH."],
    },
    {
      id: 'i40-west',
      title: 'I-40 west commute timing',
      intro: 'Rush-hour interstate peaks matter when the job touches Nashville employment.',
      bullets: ["Price portal-to-portal honestly."],
    },
    {
      id: 'acreage',
      title: 'Small-city and acreage mix',
      intro: 'Expect more rural access notes than midtown Davidson stairs.',
      bullets: ["Photo last-mile before pack day."],
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
        intro: 'Dickson families compare Dickson County Schools feeders — verify boundaries; do not assume Davidson maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Tennessee DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'TriStar Horizon Medical Center (Dickson) anchors local care; Nashville tertiary referrals; map I-40 peaks.',
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
    intro: 'Empty miles, rural access, and I-40 peaks often matter more than raw miles.',
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
    intro: 'School years and Nashville commute peaks reshape demand more than pure Music City event weeks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Tennessee TDOR motor carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Davidson County movers (parent contrast)', href: '/local-movers/tennessee/davidson' },
    ],
  },
});
