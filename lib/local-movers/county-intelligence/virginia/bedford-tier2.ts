import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** bedford — VA Tier 2 Wave 2 */
export const bedfordCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'bedford',
  hubTitle: 'Bedford County Moving Intelligence Hub',
  eyebrow: 'Bedford · Forest / Smith Mountain Lake · vs Lynchburg',
  h1: 'Moving in Bedford County: Smith Mountain Lake & Lynchburg’s County Collar',
  heroOpener: 'Bedford County wraps much of the Lynchburg metro’s countryside — Smith Mountain Lake, Forest growth, town of Bedford, and long rural drives that are not the independent city of Lynchburg itself. Expect lake grades, suburban Forest product, and empty miles across a large county. This guide is for people moving in Bedford County as lake-and-collar product — not Lynchburg hill-street defaults.',
  heroCredibility: 'County collar · Smith Mountain Lake · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-460 · US-221 · SR-122 · SR-43 · SR-24',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Lynchburg',
    parentHref: '/local-movers/virginia/lynchburg',
    title: 'Compared with Lynchburg',
    intro: 'Bedford County government and schools differ from Lynchburg city rules — lake last-mile and rural empty miles the hill-city packs understate.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Lynchburg pairs fight hill grades and downtown staging. Bedford pairs span Forest suburbs, lake communities, and western rural tracts — freeflow is not one number.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Lynchburg mixes hill multi-story and campus apartments. Bedford mixes Forest HOA growth, Smith Mountain Lake homes, and agricultural lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Lake driveways and soft shoulders rewrite truck size more often than pure city elevators.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Forest SFH can sit near metro-collar rates — lake shuttles and empty miles push differently.',
      },
      {
        title: 'Role difference',
        detail: 'Bedford County is lake-and-collar identity — not Lynchburg renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bedford County different',
    intro: 'Lake property logistics and Lynchburg collar without city rules — not a Lynchburg clone.',
    bullets: [
      {
        title: 'Lake-property logistics',
        detail: 'Smith Mountain Lake jobs need grade, width, and seasonal access honesty up front.',
      },
      {
        title: 'Lynchburg collar without city rules',
        detail: 'Forest-area households may work in the city but load under county conditions.',
      },
      {
        title: 'Rural long-drive economics',
        detail: 'Travel time between pockets must appear in quotes.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Bedford zones: Forest collar, Smith Mountain Lake, town of Bedford & western rural',
  zonesIntro: 'Two to four sharp products under one large-county label.',
  zones: [
    {
      id: 'forest',
      name: 'Forest & eastern suburban collar',
      shortName: 'Forest',
      neighborhoods: ["Forest","eastern collar"],
      housingTypes: 'Growth toward Lynchburg',
      challenges: ["City/county lines","HOA"],
      moverTips: 'Confirm county vs city addresses.',
      cityKeywords: ["forest va"],
    },
    {
      id: 'sml',
      name: 'Smith Mountain Lake communities',
      shortName: 'Smith Mountain Lake',
      neighborhoods: ["Smith Mountain Lake"],
      housingTypes: 'Lake homes, grades, seasonal traffic',
      challenges: ["Driveways","Turnarounds"],
      moverTips: 'Photos of driveways and turnarounds mandatory.',
      cityKeywords: ["smith mountain lake"],
    },
    {
      id: 'bedford-town',
      name: 'Town of Bedford & central county',
      shortName: 'Bedford town',
      neighborhoods: ["Bedford","central county"],
      housingTypes: 'Small-town civic core',
      challenges: ["Quiet streets","Limited staging"],
      moverTips: 'Confirm small-town staging.',
      cityKeywords: ["bedford"],
    },
    {
      id: 'west-rural',
      name: 'Western rural Bedford',
      shortName: 'Western rural',
      neighborhoods: ["western mountain edge"],
      housingTypes: 'Mountain-edge and agricultural lots',
      challenges: ["Long connectors","Weather"],
      moverTips: 'Budget travel time across the large county.',
      cityKeywords: ["bedford rural"],
    }
  ],
  specialized: [
    {
      id: 'lake',
      title: 'Lake-property logistics',
      intro: 'Smith Mountain Lake jobs need grade and seasonal honesty.',
      bullets: ["Never skip lake driveway photos.","Plan shuttles early."],
    },
    {
      id: 'forest-collar',
      title: 'Lynchburg collar without city rules',
      intro: 'Forest-area households may work in the city but load under county conditions.',
      bullets: ["Do not paste Lynchburg hill notes onto Forest SFH blindly."],
    },
    {
      id: 'rural-miles',
      title: 'Rural long-drive economics',
      intro: 'Travel time between pockets must appear in quotes.',
      bullets: ["Budget empty miles on every estimate."],
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
        intro: 'Bedford families compare Bedford County Public Schools feeders — verify boundaries; do not assume Lynchburg city maps apply.',
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
            detail: 'Centra Bedford Memorial and Centra Lynchburg campuses serve the market; map freeflow by which pocket you load.',
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
    intro: 'Lake access, empty miles, and city/county line errors often matter more than raw miles.',
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
    intro: 'Lake season and school years reshape demand more than pure city term peaks alone.',
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
      { label: 'Lynchburg movers (parent contrast)', href: '/local-movers/virginia/lynchburg' },
    ],
  },
});
