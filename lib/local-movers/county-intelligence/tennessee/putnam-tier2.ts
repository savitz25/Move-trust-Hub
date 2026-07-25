import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** putnam — TN Tier 2 Wave 1 */
export const putnamCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'putnam',
  hubTitle: 'Putnam County Moving Intelligence Hub',
  eyebrow: 'Putnam · Cookeville · Upper Cumberland · vs Davidson',
  h1: 'Moving in Putnam County: Cookeville & the Upper Cumberland Hub',
  heroOpener: 'Putnam County is the Cookeville / Upper Cumberland hub on I-40 between Nashville and Knoxville — Tennessee Tech gravity, regional medical care, and plateau-edge topography that is not a Nashville suburb and not a Knox bedroom. Expect campus-area multi-family, small-city staging, and long I-40 parent legs without inheriting Davidson CBD language. This guide is for people moving in Putnam as Cookeville product.',
  heroCredibility: 'Cookeville / Tech · Upper Cumberland · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · SR-111 · US-70N · SR-136 · SR-56',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Davidson County',
    parentHref: '/local-movers/tennessee/davidson',
    title: 'Compared with Davidson County',
    intro: 'Putnam is Cookeville-centered Upper Cumberland hub — roughly 80 miles east of Nashville, not a Davidson collar town like Mt. Juliet.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Davidson is Music City core density. Putnam pairs center on Cookeville with I-40 midpoint freeflow — different choke points and empty-mile economics entirely.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Davidson mixes towers and near-core stairs. Putnam mixes Tech multi-family, Cookeville seat stock, and plateau-edge lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Campus elevators and rural grades dominate over Gulch curb rules.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Cookeville SFH often sits below Nashville urban rates — I-40 long hauls still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Putnam is Upper Cumberland hub identity — not Davidson renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Putnam County different',
    intro: 'Tech calendars, I-40 midpoint logistics, and plateau edges — not a Nashville collar clone.',
    bullets: [
      {
        title: 'Standalone regional center',
        detail: 'Cookeville is not a Nashville suburb for day-to-day loading defaults.',
      },
      {
        title: 'Tennessee Tech cycle',
        detail: 'Academic calendar swings apartment demand.',
      },
      {
        title: 'I-40 midpoint logistics',
        detail: 'Nashville and Knoxville long hauls are common — still prefer true local fleets for in-town jobs.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Putnam zones: Cookeville/Tech, satellite towns, I-40 commercial & plateau edge',
  zonesIntro: 'Two to four sharp products under one Upper Cumberland label.',
  zones: [
    {
      id: 'cookeville',
      name: 'Cookeville core & Tech area',
      shortName: 'Cookeville',
      neighborhoods: ["Cookeville","Tennessee Tech area"],
      housingTypes: 'University multi-family, medical-adjacent',
      challenges: ["Term peaks","Elevators"],
      moverTips: 'Book campus-area curb windows early.',
      cityKeywords: ["cookeville"],
    },
    {
      id: 'satellites',
      name: 'Algood, Baxter & satellite towns',
      shortName: 'Satellites',
      neighborhoods: ["Algood","Baxter"],
      housingTypes: 'Small cities around Cookeville',
      challenges: ["Short regional legs"],
      moverTips: 'Budget freeflow between towns.',
      cityKeywords: ["algood","baxter"],
    },
    {
      id: 'i40',
      name: 'I-40 corridor commercial',
      shortName: 'I-40 corridor',
      neighborhoods: ["I-40 retail/logistics"],
      housingTypes: 'Workforce housing near commercial',
      challenges: ["Commercial mix"],
      moverTips: 'Separate household from dock rules.',
      cityKeywords: ["putnam i-40"],
    },
    {
      id: 'plateau',
      name: 'Rural Putnam & plateau edge',
      shortName: 'Plateau edge',
      neighborhoods: ["foothill approaches","rural lots"],
      housingTypes: 'Larger lots, foothill approaches',
      challenges: ["Grades","Weather"],
      moverTips: 'Photo rural grades early.',
      cityKeywords: ["putnam rural"],
    }
  ],
  specialized: [
    {
      id: 'upper-cumberland',
      title: 'Upper Cumberland hub',
      intro: 'Putnam serves a multi-county rural region.',
      bullets: ["Local carriers who know Cookeville beat Nashville-only fleets for in-town jobs."],
    },
    {
      id: 'tech-cycle',
      title: 'Tennessee Tech cycle',
      intro: 'Academic calendar swings apartment demand.',
      bullets: ["Confirm elevator and parking for campus-area buildings."],
    },
    {
      id: 'i40-mid',
      title: 'I-40 midpoint logistics',
      intro: 'Nashville and Knoxville long hauls are common.',
      bullets: ["Price destination legs separately from Cookeville-local moves."],
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
        intro: 'Putnam families compare Putnam County Schools feeders — verify boundaries; do not assume Davidson or Knox maps apply.',
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
            detail: 'Cookeville Regional Medical Center anchors local care; Nashville tertiary for highly specialized cases; map local freeflow.',
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
    intro: 'Term peaks, empty miles on rural edges, and I-40 destination legs often matter more than raw in-town miles.',
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
    intro: 'Tech calendars and school years reshape demand more than pure Nashville event weeks alone.',
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
