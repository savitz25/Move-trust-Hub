import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** gloucester — VA Tier 2 Wave 2 */
export const gloucesterCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'gloucester',
  hubTitle: 'Gloucester County Moving Intelligence Hub',
  eyebrow: 'Gloucester · Point / Court House · Middle Peninsula · vs York',
  h1: 'Moving in Gloucester County: Middle Peninsula Across from Yorktown',
  heroOpener: 'Gloucester County is Middle Peninsula Virginia — Gloucester Court House, Gloucester Point across from Yorktown, and rural tidewater necks that are not a York County Peninsula rename. Expect bridge-timed logistics, waterfront lots, and narrow neck roads. This guide is for people moving in Gloucester as Middle Peninsula product.',
  heroCredibility: 'Middle Peninsula · York River crossings · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-17 · SR-14 · SR-3 · SR-198 · George Washington Memorial Highway corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'York County',
    parentHref: '/local-movers/virginia/york',
    title: 'Compared with York County',
    intro: 'Gloucester is Middle Peninsula; York is Virginia Peninsula south of the York River — related by bridge, different counties and day-to-day access.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'York pairs lean Peninsula planned SFH and military-edge multi-family. Gloucester pairs fight Point bridge approaches, Court House small-town staging, and narrow neck roads.',
      },
      {
        title: 'Housing stock differences',
        detail: 'York mixes planned suburbs and military-edge product. Gloucester mixes waterfront lots, Court House small-town stock, and rural necks.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Neck roads and waterfront lots rewrite truck size more often than pure Peninsula cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Waterfront and neck jobs often price above pure map-mile guesses once shuttles and bridge delays appear.',
      },
      {
        title: 'Role difference',
        detail: 'Gloucester is Middle Peninsula identity — not York renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Gloucester County different',
    intro: 'Middle Peninsula identity, bridge timing, and waterfront necks — not a York clone.',
    bullets: [
      {
        title: 'Middle Peninsula identity',
        detail: 'Do not brand Gloucester as “north Yorktown.”',
      },
      {
        title: 'Bridge-timed logistics',
        detail: 'York River crossings add real delay risk on Peninsula destination legs.',
      },
      {
        title: 'Waterfront and neck access',
        detail: 'Many homes need shuttle vans; full tractor-trailers are often wrong tools.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Gloucester zones: Point, Court House, northern necks & US-17 corridor',
  zonesIntro: 'Two to four sharp products under one Middle Peninsula label.',
  zones: [
    {
      id: 'point',
      name: 'Gloucester Point & York River',
      shortName: 'Gloucester Point',
      neighborhoods: ["Gloucester Point"],
      housingTypes: 'Bridge approach and waterfront communities',
      challenges: ["Peak bridge delays","Tight waterfront streets"],
      moverTips: 'Build bridge delay buffers toward York/NN.',
      cityKeywords: ["gloucester point"],
    },
    {
      id: 'court-house',
      name: 'Gloucester Court House',
      shortName: 'Court House',
      neighborhoods: ["Gloucester Court House"],
      housingTypes: 'County civic core',
      challenges: ["Small-town access"],
      moverTips: 'Confirm small-town staging.',
      cityKeywords: ["gloucester court house"],
    },
    {
      id: 'necks',
      name: 'Northern rural necks',
      shortName: 'Northern necks',
      neighborhoods: ["tidewater necks"],
      housingTypes: 'Tidewater agricultural and waterfront lots',
      challenges: ["Long narrow roads"],
      moverTips: 'Survey neck roads early; plan shuttles.',
      cityKeywords: ["gloucester necks"],
    },
    {
      id: 'us17',
      name: 'US-17 corridor commercial',
      shortName: 'US-17 corridor',
      neighborhoods: ["US-17 commercial"],
      housingTypes: 'Main north-south spine',
      challenges: ["Through traffic"],
      moverTips: 'Avoid peak through-traffic windows when possible.',
      cityKeywords: ["us-17 gloucester"],
    }
  ],
  specialized: [
    {
      id: 'middle-peninsula',
      title: 'Middle Peninsula identity',
      intro: 'Do not brand Gloucester as “north Yorktown.”',
      bullets: ["Different county, schools, and EMS."],
    },
    {
      id: 'bridge',
      title: 'Bridge-timed logistics',
      intro: 'York River crossings add real delay risk on Peninsula destination legs.',
      bullets: ["Build bridge delay buffers."],
    },
    {
      id: 'waterfront-necks',
      title: 'Waterfront and neck access',
      intro: 'Many homes need shuttle vans.',
      bullets: ["Survey early; full tractor-trailers are often wrong tools."],
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
        intro: 'Gloucester families compare Gloucester County Public Schools feeders — verify boundaries; do not assume York maps apply.',
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
            detail: 'Riverside Walter Reed (Gloucester) anchors local care; Peninsula tertiary across the York; map bridge freeflow at peaks.',
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
    intro: 'Bridge delays, neck last-mile, and shuttles often matter more than raw miles.',
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
    intro: 'Summer waterfront peaks and school years reshape demand more than pure Peninsula office peaks alone.',
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
      { label: 'York County movers (parent contrast)', href: '/local-movers/virginia/york' },
    ],
  },
});
