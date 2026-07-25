import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** james-city — VA Tier 2 Wave 1 */
export const jamesCityCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'james-city',
  hubTitle: 'James City County Moving Intelligence Hub',
  eyebrow: 'James City · Williamsburg area · Historic Triangle · vs York',
  h1: 'Moving in James City County: Williamsburg-Area Growth, Tourism Calendars & Historic Triangle Access',
  heroOpener: 'James City County is the Historic Triangle residential and tourism-edge market around Williamsburg — planned SFH growth, multi-family pockets, tourism calendars that rewrite curb plans, and freeflow that is not York’s Peninsula military-edge product alone and not Newport News urban density. Expect HOA packets, longer empty miles into Peninsula cities, and seasonal peaks. This guide is for people moving in James City as Williamsburg-area county product — not a Peninsula city rename.',
  heroCredibility: 'Historic Triangle · Tourism + residential · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · VA-199 · US-60 · VA-5 · VA-31 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'York County (and independent Historic Triangle patterns)',
    parentHref: '/local-movers/virginia/york',
    title: 'Compared with York County (and independent Historic Triangle patterns)',
    intro: 'James City is Williamsburg-area tourism and planned residential product — not Yorktown/Peninsula military-edge density and not Newport News multi-story alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'York crews fight Peninsula military freeflow. James City pairs ride I-64, VA-199, and Williamsburg-area arterials — freer mid-day off base peaks, still peak-heavy on tourism weekends and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'York mixes light Peninsula suburbs. James City mixes planned SFH growth, tourism-edge multi-family, and rural lots — more continuous Historic Triangle residential product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; tourism streets can tighten curb plans uncommon on pure military-edge days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local James City quotes often sit at secondary Peninsula-edge rates for driveway SFH — tourism peaks and HOA soft costs still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'James City is Historic Triangle residential/tourism product — not York or Newport News renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in James City County different',
    intro: 'Tourism calendars, planned HOAs, and I-64 freeflow — not a York or NN clone.',
    bullets: [
      {
        title: 'Tourism peaks rewrite curb plans',
        detail: 'Holiday and summer weekends fill streets differently than pure family Saturdays.',
      },
      {
        title: 'Planned-community HOAs dominate growth volume',
        detail: 'COI and gate lists are standard.',
      },
      {
        title: 'Distinct from York Peninsula product',
        detail: 'Williamsburg-area residential is not Yorktown military-edge alone.',
      },
      {
        title: 'I-64 freeflow is billable',
        detail: 'County ↔ Peninsula city pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'James City zones: planned growth villages, Williamsburg-edge multi-family, VA-5 edges & rural west',
  zonesIntro: 'Two to four sharp products under one Historic Triangle label.',
  zones: [
    {
      id: 'growth',
      name: 'Planned growth villages',
      shortName: 'Growth villages',
      neighborhoods: ["planned villages","HOA communities"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI early; weekday windows often beat Saturdays.',
      cityKeywords: ["james city growth"],
    },
    {
      id: 'williamsburg-edge',
      name: 'Williamsburg-edge multi-family',
      shortName: 'Williamsburg edge',
      neighborhoods: ["multi-family pockets","tourism edges"],
      housingTypes: 'Multi-family, townhomes',
      challenges: ["Building COIs","Tourism parking"],
      moverTips: 'Collect management packets; book around tourism peaks when relevant.',
      cityKeywords: ["williamsburg edge"],
    },
    {
      id: 'va5',
      name: 'VA-5 / corridor edges',
      shortName: 'VA-5 edges',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Arterial timing"],
      moverTips: 'Price portal-to-portal toward Peninsula cities.',
      cityKeywords: ["james city va-5"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["james city west"],
    }
  ],
  specialized: [
    {
      id: 'tourism',
      title: 'Historic Triangle tourism calendars',
      intro: 'Seasonal peaks rewrite demand and curb plans.',
      bullets: ["Book early for peak tourism weekends.","Confirm access rules for tourism-edge multi-unit stock."],
    },
    {
      id: 'hoa-growth',
      title: 'Planned HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'vs-york',
      title: 'Distinct from York Peninsula product',
      intro: 'Williamsburg-area residential differs from Yorktown military-edge.',
      bullets: ["Do not recycle base-adjacent-only playbooks.","Tourism + planned HOAs are the differentiators."],
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
        intro: 'James City families compare Williamsburg-James City Schools feeders — verify boundaries; do not assume York or Newport News maps apply.',
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
            detail: 'Sentara and regional Peninsula systems serve the market; map peak freeflow on I-64/VA-199 corridors.',
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
    intro: 'Tourism peaks, HOA soft costs, and empty miles often matter more than raw miles.',
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
    intro: 'Tourism calendars and school years reshape demand more than pure military PCS peaks alone.',
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
      { label: 'York County (and independent Historic Triangle patterns) movers (parent contrast)', href: '/local-movers/virginia/york' },
    ],
  },
});
