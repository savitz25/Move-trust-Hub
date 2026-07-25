import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** louisa — VA Tier 2 Wave 2 */
export const louisaCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'louisa',
  hubTitle: 'Louisa County Moving Intelligence Hub',
  eyebrow: 'Louisa · Lake Anna / Zion Crossroads · vs Hanover',
  h1: 'Moving in Louisa County: Lake Anna and I-64 Crossroads',
  heroOpener: 'Louisa County sits between Richmond’s outer orbit and Charlottesville’s eastern approaches — Lake Anna recreation, Zion Crossroads growth, and small-town Louisa that is not a Hanover rename. Expect lake last-mile, I-64 commercial nodes, and long rural connectors. This guide is for people moving in Louisa as Lake Anna / crossroads product.',
  heroCredibility: 'Lake Anna · I-64 crossroads · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · US-15 · US-33 · US-522 · SR-208',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Hanover County',
    parentHref: '/local-movers/virginia/hanover',
    title: 'Compared with Hanover County',
    intro: 'Louisa is its own county with Lake Anna and Zion Crossroads product — related Richmond-outer commuting to Hanover, different density and recreation last-mile.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Hanover pairs lean Ashland/Mechanicsville I-95 north collar. Louisa pairs span Lake Anna, Zion Crossroads I-64, and rural interior — freeflow is not one number.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Hanover mixes north-Richmond collar SFH. Louisa mixes lake homes, growth-node multi-family, and farm lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Lake driveways and weekend traffic rewrite plans more often than pure Mechanicsville cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Lake and rural jobs often price above pure map-mile guesses once shuttles and empty miles appear.',
      },
      {
        title: 'Role difference',
        detail: 'Louisa is Lake Anna / I-64 crossroads identity — not Hanover renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Louisa County different',
    intro: 'Lake Anna specialty and I-64 crossroads growth — not a Hanover clone.',
    bullets: [
      {
        title: 'Lake Anna specialty',
        detail: 'Waterfront jobs need access photos and seasonal honesty.',
      },
      {
        title: 'I-64 crossroads growth',
        detail: 'Zion Crossroads is not the same truck problem as deep-rural Louisa.',
      },
      {
        title: 'Richmond–Charlottesville in-between market',
        detail: 'Households often straddle two metros for work — still load under Louisa conditions.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Louisa zones: Louisa town, Lake Anna, Zion Crossroads & rural interior',
  zonesIntro: 'Two to four sharp products under one crossroads label.',
  zones: [
    {
      id: 'louisa-town',
      name: 'Louisa town & county core',
      shortName: 'Louisa town',
      neighborhoods: ["Louisa","seat area"],
      housingTypes: 'Small civic center',
      challenges: ["Quiet streets","Limited staging"],
      moverTips: 'Confirm small-town staging.',
      cityKeywords: ["louisa"],
    },
    {
      id: 'lake-anna',
      name: 'Lake Anna communities',
      shortName: 'Lake Anna',
      neighborhoods: ["Lake Anna"],
      housingTypes: 'Waterfront and recreation living',
      challenges: ["Grades","Weekend peaks"],
      moverTips: 'Photograph Lake Anna driveways.',
      cityKeywords: ["lake anna"],
    },
    {
      id: 'zion',
      name: 'Zion Crossroads & I-64 corridor',
      shortName: 'Zion Crossroads',
      neighborhoods: ["Zion Crossroads"],
      housingTypes: 'Commercial and residential growth node',
      challenges: ["Interstate timing","HOA"],
      moverTips: 'Confirm HOAs and I-64 freeflow.',
      cityKeywords: ["zion crossroads"],
    },
    {
      id: 'rural',
      name: 'Rural interior Louisa',
      shortName: 'Rural interior',
      neighborhoods: ["farms","large lots"],
      housingTypes: 'Farms and large lots',
      challenges: ["Long driveway surveys"],
      moverTips: 'Survey driveways early.',
      cityKeywords: ["louisa rural"],
    }
  ],
  specialized: [
    {
      id: 'lake',
      title: 'Lake Anna specialty',
      intro: 'Waterfront jobs need access photos and seasonal honesty.',
      bullets: ["Never skip lake driveway photos."],
    },
    {
      id: 'zion',
      title: 'I-64 crossroads growth',
      intro: 'Zion Crossroads is not the same truck problem as deep-rural Louisa.',
      bullets: ["Scope the address cluster explicitly."],
    },
    {
      id: 'in-between',
      title: 'Richmond–Charlottesville in-between market',
      intro: 'Households often straddle two metros for work.',
      bullets: ["Price destination legs separately."],
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
        intro: 'Louisa families compare Louisa County Public Schools feeders — verify boundaries; do not assume Hanover or Albemarle maps apply.',
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
            detail: 'Regional care via Richmond and Charlottesville systems; local urgent care in growth corridors; map freeflow by destination.',
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
    intro: 'Lake access, empty miles, and dual-metro destination legs often matter more than raw miles.',
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
    intro: 'Lake season and school years reshape demand more than pure Richmond office peaks alone.',
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
      { label: 'Hanover County movers (parent contrast)', href: '/local-movers/virginia/hanover' },
    ],
  },
});
