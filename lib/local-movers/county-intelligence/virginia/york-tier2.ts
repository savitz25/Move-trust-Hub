import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** york — VA Tier 2 Wave 1 */
export const yorkCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'york',
  hubTitle: 'York County Moving Intelligence Hub',
  eyebrow: 'York · Yorktown / light Peninsula suburbs · vs James City',
  h1: 'Moving in York County: Yorktown, Peninsula Suburbs & I-64 Military-Edge Access',
  heroOpener: 'York County is light Peninsula suburban and military-edge product — Yorktown approaches, planned SFH pockets, freeflow toward Newport News and Langley-adjacent patterns, and product that is not James City’s Historic Triangle tourism density and not Newport News multi-story urban stock alone. Expect HOA packets, longer empty miles into Peninsula cities, and freeflow that still peaks hard on I-64. This guide is for people moving in York as Peninsula collar product — not a James City or Newport News rename. (VA export avoids PA/SC York name clash.)',
  heroCredibility: 'Peninsula collar · Military-edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · US-17 · VA-134 · VA-105 · VA-199 links',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'James City County (and Newport News contrast)',
    parentHref: '/local-movers/virginia/james-city',
    title: 'Compared with James City County (and Newport News contrast)',
    intro: 'York is Yorktown / Peninsula military-edge suburban product — not James City Williamsburg tourism growth and not Newport News shipyard multi-story alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'James City crews fight tourism peaks. York pairs ride I-64, US-17, and Peninsula arterials — freer mid-day off Historic Triangle choke points, still peak-heavy on military and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'James City mixes tourism-edge multi-family. York mixes light Peninsula SFH, military-adjacent apartments, and Yorktown-edge stock — more continuous military-edge suburban product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets appear on planned streets; military multi-family needs management packets uncommon on pure tourism SFH days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local York quotes often sit at Peninsula-collar rates for driveway SFH — multi-family access and empty miles into NN still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'York is Peninsula military-edge collar — not James City or Newport News renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in York County different',
    intro: 'Military-edge freeflow, light Peninsula HOAs, and I-64 peaks — not a James City clone.',
    bullets: [
      {
        title: 'I-64 freeflow is billable',
        detail: 'York ↔ Newport News pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from James City tourism product',
        detail: 'Military-edge suburbs are not Historic Triangle tourism density alone.',
      },
      {
        title: 'Distinct from Newport News urban density',
        detail: 'County SFH is not shipyard multi-story product.',
      },
      {
        title: 'Military multi-family packets matter',
        detail: 'Elevators and COIs rewrite labor hours on base-adjacent stock.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'York zones: Yorktown edges, Peninsula planned SFH, military multi-family & rural north',
  zonesIntro: 'Two to four sharp products under one Peninsula collar label.',
  zones: [
    {
      id: 'yorktown',
      name: 'Yorktown-edge residential',
      shortName: 'Yorktown edge',
      neighborhoods: ["Yorktown edges","historic approaches"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Street width","Tourism peaks"],
      moverTips: 'Photo approaches; plan smaller trucks near historic streets.',
      cityKeywords: ["yorktown"],
    },
    {
      id: 'planned',
      name: 'Peninsula planned SFH',
      shortName: 'Planned SFH',
      neighborhoods: ["planned villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets"],
      moverTips: 'Collect COI early.',
      cityKeywords: ["york va planned"],
    },
    {
      id: 'military-mf',
      name: 'Military-edge multi-family',
      shortName: 'Military multi-family',
      neighborhoods: ["apartment corridors"],
      housingTypes: 'Apartments, multi-family',
      challenges: ["Building COIs","PCS clusters"],
      moverTips: 'Collect management packets; book early around PCS windows when relevant.',
      cityKeywords: ["york military"],
    },
    {
      id: 'rural-north',
      name: 'Rural north & larger lots',
      shortName: 'Rural north',
      neighborhoods: ["northern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["york va north"],
    }
  ],
  specialized: [
    {
      id: 'i64-peninsula',
      title: 'I-64 Peninsula freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Newport News multi-story rates for York planned SFH."],
    },
    {
      id: 'military-mf',
      title: 'Military-edge multi-family logistics',
      intro: 'Building packets are first-class cost drivers.',
      bullets: ["Elevator windows early.","PCS windows create mid-week spikes."],
    },
    {
      id: 'vs-neighbors',
      title: 'Distinct from James City and Newport News',
      intro: 'Peninsula collar differs from tourism county and urban city.',
      bullets: ["Do not recycle Williamsburg tourism-only or shipyard-only playbooks.","Military-edge SFH mix is the differentiator."],
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
        intro: 'York families compare York County Schools feeders — verify boundaries; do not assume James City or Newport News maps apply.',
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
            detail: 'Riverside and regional Peninsula systems serve the market; map peak freeflow on I-64 corridors.',
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
    intro: 'Empty miles, multi-family access, and I-64 peaks often matter more than raw miles.',
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
    intro: 'PCS windows and school years reshape demand more than tourism peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'James City County (and Newport News contrast) movers (parent contrast)', href: '/local-movers/virginia/james-city' },
    ],
  },
});
