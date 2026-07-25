import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** sevier — TN Tier 2 Wave 1 */
export const sevierCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'sevier',
  hubTitle: 'Sevier County Moving Intelligence Hub',
  eyebrow: 'Sevier · Sevierville / Pigeon Forge / Gatlinburg · vs Knox',
  h1: 'Moving in Sevier County: Sevierville, Pigeon Forge & Gatlinburg Tourism Core',
  heroOpener: 'Sevier County is East Tennessee’s tourism engine — Sevierville seat fabric, Pigeon Forge Parkway density, Gatlinburg mountain-town grades, and cabin/chalet product that is not a Knox bedroom rename. Expect Parkway congestion, steep approaches, and portal-to-portal time map miles understate. This guide is for people moving in Sevier as tourism-market product — not flat Knoxville subdivisions.',
  heroCredibility: 'Tourism core · Cabin & Parkway logistics · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-441 · US-321 · US-411 · Forks of the River Pkwy · tourism spur corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Knox County',
    parentHref: '/local-movers/tennessee/knox',
    title: 'Compared with Knox County',
    intro: 'Sevier is tourism-driven Sevierville/Pigeon Forge/Gatlinburg product — not Knoxville core density and not Blount’s Maryville industrial collar alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Knox is the regional employment/medical hub. Sevier pairs fight US-441/Parkway tourist peaks that Knox suburban freeflow does not share.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Knox mixes campus multi-family and west HOAs. Sevier mixes workforce housing, vacation cabins, and mountain-town multi-story.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Cabin grades and Parkway congestion rewrite truck size more often than pure Knox cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Sevier jobs often price above flat-suburb rates once tourism traffic and shuttles appear.',
      },
      {
        title: 'Role difference',
        detail: 'Sevier is tourism engine identity — not Knox renamed and not pure Blount foothill residential.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sevier County different',
    intro: 'Parkway peaks, cabin grades, and workforce vs vacation inventory — not a Knox clone.',
    bullets: [
      {
        title: 'Tourism freeflow is billable',
        detail: 'Parkway peaks can erase a naive schedule overnight.',
      },
      {
        title: 'Cabin and chalet logistics',
        detail: 'Mountain roads need photos and weather checks.',
      },
      {
        title: 'Workforce vs vacation inventory',
        detail: 'Scope permanent household vs rental turnover explicitly.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Sevier zones: Sevierville, Pigeon Forge, Gatlinburg & Kodak/Seymour edge',
  zonesIntro: 'Two to four sharp products under one tourism-market label.',
  zones: [
    {
      id: 'sevierville',
      name: 'Sevierville seat & gateway commercial',
      shortName: 'Sevierville',
      neighborhoods: ["Sevierville","gateway retail"],
      housingTypes: 'Mixed residential behind tourist corridors',
      challenges: ["Tourist traffic","Mixed access"],
      moverTips: 'Avoid peak Parkway hours without a buffer.',
      cityKeywords: ["sevierville"],
    },
    {
      id: 'pigeon-forge',
      name: 'Pigeon Forge Parkway corridor',
      shortName: 'Pigeon Forge',
      neighborhoods: ["Pigeon Forge","Parkway"],
      housingTypes: 'Workforce housing, entertainment strip',
      challenges: ["Peak tourist traffic","Curb competition"],
      moverTips: 'Build seasonal buffers; photo staging options.',
      cityKeywords: ["pigeon forge"],
    },
    {
      id: 'gatlinburg',
      name: 'Gatlinburg mountain town core',
      shortName: 'Gatlinburg',
      neighborhoods: ["Gatlinburg","mountain core"],
      housingTypes: 'Steep streets, multi-story, limited staging',
      challenges: ["Grades","Small truck needs"],
      moverTips: 'Plan shuttles; never assume full-size tractor access.',
      cityKeywords: ["gatlinburg"],
    },
    {
      id: 'kodak-edge',
      name: 'Kodak, Seymour edge & rural Sevier',
      shortName: 'Kodak edge',
      neighborhoods: ["Kodak","Seymour edge"],
      housingTypes: 'Commuter and rural pockets toward Knox',
      challenges: ["County-line confusion"],
      moverTips: 'Confirm Sevier vs Knox on border addresses.',
      cityKeywords: ["kodak","seymour"],
    }
  ],
  specialized: [
    {
      id: 'tourism-access',
      title: 'Tourism-driven access',
      intro: 'Parkway peaks and leaf season change truck ETA more than inventory size alone.',
      bullets: ["Never schedule peak Parkway hours without a buffer.","Ask for tourism-market references."],
    },
    {
      id: 'cabin-chalet',
      title: 'Cabin and chalet logistics',
      intro: 'Mountain roads and tight turns need photos and weather checks.',
      bullets: ["Photo grades and turnarounds.","Plan shuttle vans early."],
    },
    {
      id: 'workforce-vs-vacation',
      title: 'Workforce vs vacation inventory',
      intro: 'Year-round residents and short-term rental flips have different packing needs.',
      bullets: ["Scope the job type explicitly on the estimate."],
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
        intro: 'Sevier families compare Sevier County Schools feeders — verify boundaries; do not assume Knox maps apply.',
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
            detail: 'LeConte Medical Center (Sevierville) anchors local care; Knoxville tertiary for trauma and specialty; map Parkway peaks.',
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
    intro: 'Tourism freeflow, cabin access, and shuttles often matter more than raw miles.',
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
    intro: 'Leaf season, summer peaks, and school years reshape demand more than pure Knox office peaks alone.',
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
