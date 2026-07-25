import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** washington — TN Tier 2 Wave 1 */
export const washingtonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow: 'Washington · Johnson City / Jonesborough · Tri-Cities · vs Sullivan',
  h1: 'Moving in Washington County: Johnson City, ETSU & Tri-Cities Heart',
  heroOpener: 'Washington County is the Johnson City heart of Tennessee’s Tri-Cities — Jonesborough seat fabric, ETSU and medical corridors, and Appalachian foothill edges that are not a Kingsport/Sullivan rename and not a Knoxville outpost. Expect university calendars, foothill grades, and multi-county Tri-Cities legs. This guide is for people moving in Washington as Johnson City product — not Sullivan industrial Kingsport alone.',
  heroCredibility: 'Johnson City / ETSU · Tri-Cities · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-26 · US-11E · US-321 · SR-67 · SR-75',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Sullivan County',
    parentHref: '/local-movers/tennessee/sullivan',
    title: 'Compared with Sullivan County',
    intro: 'Washington centers on Johnson City and ETSU — related Tri-Cities metro, different seat, schools, and day-to-day density than Kingsport/Bristol Sullivan patterns.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Sullivan patterns lean Kingsport/Bristol industrial corridors. Washington pairs center on Johnson City, ETSU, and I-26 — related metro freeflow, different choke points.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Sullivan mixes industrial-residential Kingsport fabric. Washington mixes university multi-family, medical-adjacent streets, and foothill lots.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Campus and hospital streets tighten staging more often than pure industrial-edge SFH.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Johnson City multi-family can price above pure rural Sullivan rates once elevators and term peaks appear.',
      },
      {
        title: 'Role difference',
        detail: 'Washington is Johnson City / ETSU identity — not Sullivan renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Washington County different',
    intro: 'ETSU calendars, medical corridors, and foothill edges — not a Kingsport clone.',
    bullets: [
      {
        title: 'University cycle is billable',
        detail: 'Term peaks rewrite apartment demand and curb windows.',
      },
      {
        title: 'Tri-Cities multi-jurisdiction legs',
        detail: 'Jobs often cross Washington–Sullivan–Virginia lines — name each.',
      },
      {
        title: 'Foothill access',
        detail: 'Grades and winter weather matter on rural edges.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Virginia border hops flip authority quickly.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Washington zones: Johnson City/ETSU, Jonesborough, growth corridors & rural edges',
  zonesIntro: 'Two to four sharp products under one Tri-Cities label.',
  zones: [
    {
      id: 'johnson-city',
      name: 'Johnson City core & ETSU area',
      shortName: 'Johnson City',
      neighborhoods: ["Johnson City","ETSU area"],
      housingTypes: 'University multi-family, medical-adjacent',
      challenges: ["Term peaks","Hospital streets"],
      moverTips: 'Book curb windows early near campus.',
      cityKeywords: ["johnson city"],
    },
    {
      id: 'jonesborough',
      name: 'Jonesborough historic county seat',
      shortName: 'Jonesborough',
      neighborhoods: ["Jonesborough","historic core"],
      housingTypes: 'Historic town scale, SFH',
      challenges: ["Tight older streets"],
      moverTips: 'Confirm square-adjacent staging.',
      cityKeywords: ["jonesborough"],
    },
    {
      id: 'growth',
      name: 'Gray, Boones Creek & growth corridors',
      shortName: 'Growth corridors',
      neighborhoods: ["Gray","Boones Creek"],
      housingTypes: 'Suburban expansion between Tri-Cities nodes',
      challenges: ["New-plat access"],
      moverTips: 'Confirm access on newer plats.',
      cityKeywords: ["gray","boones creek"],
    },
    {
      id: 'rural-edge',
      name: 'Rural Washington & mountain edge',
      shortName: 'Rural edge',
      neighborhoods: ["foothill lots","rural west"],
      housingTypes: 'Foothill lots, longer drives',
      challenges: ["Grades","Weather"],
      moverTips: 'Photo last-mile; winter flexibility required.',
      cityKeywords: ["washington tn rural"],
    }
  ],
  specialized: [
    {
      id: 'etsu-medical',
      title: 'Johnson City / ETSU market',
      intro: 'University and medical employment drive a steady household cycle.',
      bullets: ["Ask about campus-area parking and elevators.","Do not paste Kingsport industrial notes onto ETSU multi-family."],
    },
    {
      id: 'tri-cities',
      title: 'Tri-Cities regional moves',
      intro: 'Jobs often cross Washington–Sullivan–Virginia lines.',
      bullets: ["Name each county/city on multi-leg quotes."],
    },
    {
      id: 'foothill',
      title: 'Appalachian foothill access',
      intro: 'Grades and winter weather matter more than middle-Tennessee packs admit.',
      bullets: ["Photo grades; plan weather buffers."],
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
        intro: 'Washington families compare Washington County Schools and Johnson City Schools — verify city vs county; do not assume Sullivan maps apply.',
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
            detail: 'Johnson City Medical Center and related Ballad campuses anchor care; map peak freeflow on I-26 corridors.',
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
    intro: 'Term peaks, empty miles across Tri-Cities, and foothill access often matter more than raw miles.',
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
    intro: 'ETSU calendars and winter foothill weather reshape demand more than pure industrial shift weeks alone.',
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
      { label: 'Sullivan County movers (parent contrast)', href: '/local-movers/tennessee/sullivan' },
    ],
  },
});
