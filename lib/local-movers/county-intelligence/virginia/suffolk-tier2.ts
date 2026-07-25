import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** suffolk — VA Tier 2 Wave 2 */
export const suffolkCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'suffolk',
  hubTitle: 'Suffolk Moving Intelligence Hub',
  eyebrow: 'Suffolk · Harbour View / downtown / rural south · vs Chesapeake',
  h1: 'Moving in Suffolk: Large-City Geography on Hampton Roads’ Western Edge',
  heroOpener: 'Suffolk is a geographically huge independent city on Hampton Roads’ western edge — downtown historic core, northern growth toward Chesapeake, Harbour View commercial nodes, and vast rural southern tracts that are not a Chesapeake rename. Moves fail when quotes assume uniform suburban access across a city that behaves like several markets. This guide is for people moving in Suffolk as multi-regime city product.',
  heroCredibility: 'Independent city · Multi-regime geography · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-13 · US-58 · US-460 · US-17 · SR-10',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Chesapeake',
    parentHref: '/local-movers/virginia/chesapeake',
    title: 'Compared with Chesapeake',
    intro: 'Suffolk’s land area and rural south differ sharply from Chesapeake’s more continuous suburban fabric — related Roads west edge, different access regimes.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Chesapeake crews fight Greenbrier and I-64 suburban peaks. Suffolk pairs span downtown historic, northern growth, and deep-rural south — freeflow is not one number.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Chesapeake mixes continuous suburban HOAs. Suffolk mixes historic downtown, northern master-planned growth, and agricultural south.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Rural south driveways and downtown staging are different truck problems under one city name.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Northern Suffolk growth can price near Roads suburban rates — rural south empty miles push differently.',
      },
      {
        title: 'Role difference',
        detail: 'Suffolk is multi-regime independent city — not Chesapeake renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Suffolk different',
    intro: 'One city, multiple access regimes — not a Chesapeake clone.',
    bullets: [
      {
        title: 'North suburban vs south rural',
        detail: 'Never paste a single Suffolk template across the whole city.',
      },
      {
        title: 'Chesapeake employment collar',
        detail: 'Many households work east — price destination legs honestly.',
      },
      {
        title: 'Historic downtown vs new growth',
        detail: 'Core streets and master-planned north ends need different access notes.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Suffolk zones: downtown, northern growth, Harbour View & rural south',
  zonesIntro: 'Two to four sharp products under one large-city label.',
  zones: [
    {
      id: 'downtown',
      name: 'Downtown Suffolk & historic core',
      shortName: 'Downtown',
      neighborhoods: ["Downtown Suffolk","historic core"],
      housingTypes: 'Older streets, civic buildings',
      challenges: ["Tight staging"],
      moverTips: 'Photo core street widths.',
      cityKeywords: ["suffolk downtown"],
    },
    {
      id: 'north-growth',
      name: 'Northern Suffolk growth',
      shortName: 'North growth',
      neighborhoods: ["northern Suffolk"],
      housingTypes: 'Suburban expansion toward Chesapeake',
      challenges: ["HOA","New plats"],
      moverTips: 'Collect HOA packets on new growth.',
      cityKeywords: ["suffolk north"],
    },
    {
      id: 'harbour-view',
      name: 'Harbour View & commercial north',
      shortName: 'Harbour View',
      neighborhoods: ["Harbour View"],
      housingTypes: 'Retail and employment nodes',
      challenges: ["Peak traffic"],
      moverTips: 'Avoid peak retail windows when possible.',
      cityKeywords: ["harbour view"],
    },
    {
      id: 'rural-south',
      name: 'Southern rural Suffolk',
      shortName: 'Rural south',
      neighborhoods: ["southern rural tracts"],
      housingTypes: 'Agricultural and large-lot living',
      challenges: ["Long drives","Driveway surveys"],
      moverTips: 'Photograph long rural driveways.',
      cityKeywords: ["suffolk rural"],
    }
  ],
  specialized: [
    {
      id: 'multi-regime',
      title: 'One city, multiple access regimes',
      intro: 'North suburban vs south rural changes truck choice.',
      bullets: ["Ask which part of Suffolk on every estimate."],
    },
    {
      id: 'chesapeake-collar',
      title: 'Chesapeake employment collar',
      intro: 'Many households work east into Chesapeake/Norfolk.',
      bullets: ["Price destination legs honestly."],
    },
    {
      id: 'downtown-vs-growth',
      title: 'Historic downtown vs new growth',
      intro: 'Core streets and master-planned north ends need different notes.',
      bullets: ["Do not recycle one playbook for both."],
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
        intro: 'Suffolk families compare Suffolk Public Schools feeders — verify which zone; do not assume Chesapeake maps apply.',
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
            detail: 'Sentara Obici and regional Hampton Roads systems serve the city; map freeflow by which part of Suffolk you load.',
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
    intro: 'Which part of Suffolk, empty miles, and HOA access often matter more than raw miles.',
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
    intro: 'School years and Roads commute peaks reshape demand more than pure beach-season peaks alone.',
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
      { label: 'Chesapeake movers (parent contrast)', href: '/local-movers/virginia/chesapeake' },
    ],
  },
});
