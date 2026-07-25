import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** anderson — TN Tier 2 Wave 1 */
export const andersonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'anderson',
  hubTitle: 'Anderson County Moving Intelligence Hub',
  eyebrow: 'Anderson · Oak Ridge / Clinton · Knoxville west · vs Knox',
  h1: 'Moving in Anderson County: Oak Ridge, Clinton & Ridge-and-Valley West of Knoxville',
  heroOpener: 'Anderson County is the Oak Ridge and Clinton market west of Knoxville — lab-town heritage, ridge-and-valley topography, and dual city school systems that are not a Knox neighborhood rename. Expect hillside last-mile, mid-century Oak Ridge street plans, and parent-biased medical trips into Knox. This guide is for people moving in Anderson as Oak Ridge/Clinton product — not west Knox flat suburbs alone.',
  heroCredibility: 'Oak Ridge / Clinton · Lab-town collar · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 edge · SR-61 · SR-95 · US-25W · SR-62',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Knox County',
    parentHref: '/local-movers/tennessee/knox',
    title: 'Compared with Knox County',
    intro: 'Anderson is Oak Ridge/Clinton west-of-Knox product — not west Knox flat HOA defaults and not pure rural East Tennessee alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Knox crews fight I-40/I-75 core peaks. Anderson pairs center on Oak Ridge and Clinton with different ridge corridors — freer mid-day off Knox core, still peak-heavy on metro commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Knox mixes UT multi-family and west HOAs. Anderson mixes Oak Ridge mid-century planned stock, Clinton seat fabric, and valley rural lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Ridge grades and older Oak Ridge streets rewrite truck plans more often than pure west Knox cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Oak Ridge SFH often sits at west-collar rates — empty miles into Knox still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Anderson is lab-town and Clinton seat identity — not Knox renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Anderson County different',
    intro: 'Lab-town housing, dual city schools, and ridge grades — not a Knox clone.',
    bullets: [
      {
        title: 'Oak Ridge workforce market',
        detail: 'Federal/tech employment creates stable household demand distinct from pure bedroom suburbs.',
      },
      {
        title: 'City school systems differ',
        detail: 'Oak Ridge, Clinton, and county systems are not interchangeable.',
      },
      {
        title: 'Ridge-and-valley access',
        detail: 'Hills and older infrastructure need honest truck assessments.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Anderson zones: Oak Ridge, Clinton, Oliver Springs edge & rural valleys',
  zonesIntro: 'Two to four sharp products under one west-of-Knox label.',
  zones: [
    {
      id: 'oak-ridge',
      name: 'Oak Ridge city',
      shortName: 'Oak Ridge',
      neighborhoods: ["Oak Ridge","lab-town neighborhoods"],
      housingTypes: 'Mid-century SFH, hills, tech workforce',
      challenges: ["Grades","Street grids"],
      moverTips: 'Photo hillside driveways.',
      cityKeywords: ["oak ridge"],
    },
    {
      id: 'clinton',
      name: 'Clinton county seat',
      shortName: 'Clinton',
      neighborhoods: ["Clinton","Clinch River adjacent"],
      housingTypes: 'Small-city SFH, civic core',
      challenges: ["Seat staging"],
      moverTips: 'Confirm small-city staging.',
      cityKeywords: ["clinton tn"],
    },
    {
      id: 'oliver-springs',
      name: 'Oliver Springs edge & western communities',
      shortName: 'Oliver Springs edge',
      neighborhoods: ["Oliver Springs edge"],
      housingTypes: 'Cross-county small towns',
      challenges: ["County-line confusion"],
      moverTips: 'Confirm Anderson vs adjacent counties.',
      cityKeywords: ["oliver springs"],
    },
    {
      id: 'rural-valleys',
      name: 'Rural Anderson valleys',
      shortName: 'Rural valleys',
      neighborhoods: ["valley lots","ridge approaches"],
      housingTypes: 'Longer rural drives between ridges',
      challenges: ["Power lines","Driveway grades"],
      moverTips: 'Survey grades early.',
      cityKeywords: ["anderson tn rural"],
    }
  ],
  specialized: [
    {
      id: 'oak-ridge-workforce',
      title: 'Oak Ridge workforce market',
      intro: 'Federal and tech employment creates distinct demand.',
      bullets: ["Do not paste west Knox HOA notes onto Oak Ridge hills blindly."],
    },
    {
      id: 'clinton-seat',
      title: 'Clinton county-seat logistics',
      intro: 'Courthouse and small-city streets differ from Oak Ridge’s planned mid-century layout.',
      bullets: ["Confirm which city the address is in."],
    },
    {
      id: 'ridge-valley',
      title: 'Ridge-and-valley access',
      intro: 'Hills and older infrastructure need honest truck assessments.',
      bullets: ["Photo last-mile; plan shuttles when grades are steep."],
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
        intro: 'Anderson families compare Anderson County, Clinton City, and Oak Ridge Schools — verify which system applies; do not assume Knox maps apply.',
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
            detail: 'Methodist Medical Center of Oak Ridge anchors local care; Knoxville tertiary for complex cases; map commute peaks.',
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
    intro: 'Empty miles, ridge grades, and Knox destination legs often matter more than raw miles.',
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
    intro: 'School years and lab/tech calendars reshape demand more than pure Knox office peaks alone.',
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
      { label: 'Knox County movers (parent contrast)', href: '/local-movers/tennessee/knox' },
    ],
  },
});
