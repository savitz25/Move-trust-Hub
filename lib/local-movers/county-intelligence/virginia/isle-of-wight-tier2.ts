import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** isle-of-wight — VA Tier 2 Wave 2 */
export const isleOfWightCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'isle-of-wight',
  hubTitle: 'Isle of Wight County Moving Intelligence Hub',
  eyebrow: 'Isle of Wight · Smithfield / Carrollton · vs Suffolk',
  h1: 'Moving in Isle of Wight County: Smithfield and the Roads’ Southwestern Edge',
  heroOpener: 'Isle of Wight County is southwestern Hampton Roads countryside — Smithfield’s historic downtown, Carrollton growth, Windsor crossroads, and rural tracts toward Suffolk and Franklin that are not a Suffolk city rename. Expect ham-town tourism streets, new suburban plats, and long agricultural drives. This guide is for people moving in Isle of Wight as Southside-edge product.',
  heroCredibility: 'Smithfield · Roads southwest edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-17 · US-258 · SR-10 · SR-32 · US-460 regional',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Suffolk',
    parentHref: '/local-movers/virginia/suffolk',
    title: 'Compared with Suffolk',
    intro: 'Isle of Wight is a county; Suffolk is a large independent city to the east — related Roads edge, different governments and day-to-day access regimes.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Suffolk pairs span huge multi-regime geography. Isle of Wight pairs center on Smithfield historic, Carrollton growth, and western rural tracts — related west-Roads freeflow, different choke points.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Suffolk mixes northern growth and deep rural south. Isle of Wight mixes Smithfield historic, Carrollton HOA growth, and Southside farmland.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Smithfield event peaks and rural lanes rewrite plans more often than pure Harbour View suburban defaults.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Carrollton growth can price near Roads suburban rates — Smithfield historic staging and farm empty miles push differently.',
      },
      {
        title: 'Role difference',
        detail: 'Isle of Wight is county identity with Smithfield/Carrollton product — not Suffolk renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Isle of Wight County different',
    intro: 'Smithfield town logistics and Carrollton collar growth — not a Suffolk clone.',
    bullets: [
      {
        title: 'Smithfield town logistics',
        detail: 'Historic downtown is not a blank suburban truck canvas.',
      },
      {
        title: 'Carrollton collar growth',
        detail: 'Newer housing near the Roads needs different notes than farm-interior jobs.',
      },
      {
        title: 'Suffolk and Peninsula parents',
        detail: 'Employment legs often leave the county.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Isle of Wight zones: Smithfield, Carrollton, Windsor & western rural',
  zonesIntro: 'Two to four sharp products under one Southside-edge label.',
  zones: [
    {
      id: 'smithfield',
      name: 'Smithfield historic town',
      shortName: 'Smithfield',
      neighborhoods: ["Smithfield","historic downtown"],
      housingTypes: 'Tourism-friendly downtown and older streets',
      challenges: ["Event peaks","Limited truck room"],
      moverTips: 'Confirm Smithfield event calendars.',
      cityKeywords: ["smithfield"],
    },
    {
      id: 'carrollton',
      name: 'Carrollton & northern growth',
      shortName: 'Carrollton',
      neighborhoods: ["Carrollton"],
      housingTypes: 'Suburban expansion toward the Roads',
      challenges: ["HOA","New plats"],
      moverTips: 'Collect HOA packets on new growth.',
      cityKeywords: ["carrollton"],
    },
    {
      id: 'windsor',
      name: 'Windsor & central county',
      shortName: 'Windsor',
      neighborhoods: ["Windsor"],
      housingTypes: 'Small town and crossroads living',
      challenges: ["Quiet connectors"],
      moverTips: 'Confirm small-town staging.',
      cityKeywords: ["windsor va"],
    },
    {
      id: 'rural',
      name: 'Southern and western rural',
      shortName: 'Western rural',
      neighborhoods: ["farms","large parcels"],
      housingTypes: 'Farms and large parcels',
      challenges: ["Long driveway surveys"],
      moverTips: 'Survey rural lanes early.',
      cityKeywords: ["isle of wight rural"],
    }
  ],
  specialized: [
    {
      id: 'smithfield',
      title: 'Smithfield town logistics',
      intro: 'Historic downtown is not a blank suburban truck canvas.',
      bullets: ["Plan shuttle options; check event calendars."],
    },
    {
      id: 'carrollton',
      title: 'Carrollton collar growth',
      intro: 'Newer housing near the Roads needs different notes than farm-interior jobs.',
      bullets: ["Scope the address type explicitly."],
    },
    {
      id: 'parents',
      title: 'Suffolk and Peninsula parents',
      intro: 'Employment legs often leave the county.',
      bullets: ["Keep local carriers first for in-county work; price destination legs separately."],
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
        intro: 'Isle of Wight families compare Isle of Wight County Schools feeders — verify boundaries; do not assume Suffolk maps apply.',
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
            detail: 'Local and Suffolk-area hospitals (e.g. Sentara Obici access); Peninsula and Norfolk tertiary as needed; map freeflow by destination.',
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
    intro: 'Historic staging, empty miles, and Roads destination legs often matter more than raw miles.',
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
    intro: 'Smithfield event calendars and school years reshape demand more than pure Roads beach peaks alone.',
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
      { label: 'Suffolk movers (parent contrast)', href: '/local-movers/virginia/suffolk' },
    ],
  },
});
