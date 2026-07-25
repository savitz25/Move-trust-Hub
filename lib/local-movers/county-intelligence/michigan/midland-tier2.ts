import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** midland — MI Tier 2 Wave 1 */
export const midlandCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'midland',
  hubTitle: 'Midland County Moving Intelligence Hub',
  eyebrow: 'Midland · Great Lakes Bay / chemical-heritage city · vs Saginaw',
  h1: 'Moving in Midland County: Midland Corporate Campus, Planned Suburbs & Bay-Region Access',
  heroOpener: 'Midland County is the Great Lakes Bay corporate-campus and planned-suburb market — Midland multi-story and campus-adjacent stock, continuous planned SFH, freeflow toward Saginaw and Bay City, and product that is not Saginaw’s continuous industrial/residential city fabric alone. Expect HOA packets, longer empty miles into Saginaw, and freeflow that still peaks hard on M-20 / US-10. This guide is for people moving in Midland as corporate/residential bay product — not a Saginaw rename.',
  heroCredibility: 'Chemical-heritage / corporate campus · Planned suburbs · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-10 · M-20 · M-47 · M-30 · Eastman Ave corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Saginaw County (and independent bay-region patterns)',
    parentHref: '/local-movers/michigan/saginaw',
    title: 'Compared with Saginaw County (and independent bay-region patterns)',
    intro: 'Midland is corporate-campus and planned-suburb bay product — not Saginaw continuous industrial/residential multi-story fabric alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Saginaw crews fight I-75/I-675 city peaks. Midland pairs ride US-10/M-20 and planned arterials — freer mid-day campus freeflow, still peak-heavy on school and commute windows toward Saginaw.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Saginaw mixes older multi-unit and township SFH. Midland mixes continuous planned SFH, campus multi-family, and corporate-adjacent stock — more continuous planned-suburb product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate planned villages; campus multi-family needs building packets uncommon on pure rural Saginaw township days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Midland quotes often sit at secondary bay planned-suburb rates for driveway SFH — HOA soft costs and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Midland is corporate/residential bay product — not Saginaw renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Midland County different',
    intro: 'Planned HOAs, corporate freeflow, and bay empty miles — not a Saginaw clone.',
    bullets: [
      {
        title: 'US-10 / M-20 freeflow is billable',
        detail: 'Midland ↔ Saginaw pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Saginaw industrial/residential fabric',
        detail: 'Planned corporate-suburb product is not continuous older multi-unit density alone.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'Campus multi-family packets matter',
        detail: 'Elevators and COIs rewrite labor hours on multi-unit stock.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Midland zones: planned suburbs, campus multi-family, city core edges & rural townships',
  zonesIntro: 'Two to four sharp products under one corporate/residential bay label.',
  zones: [
    {
      id: 'planned',
      name: 'Planned suburban SFH belts',
      shortName: 'Planned suburbs',
      neighborhoods: ["planned villages","HOA communities"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI early; weekday windows often beat Saturdays.',
      cityKeywords: ["midland planned"],
    },
    {
      id: 'campus-mf',
      name: 'Campus / multi-family pockets',
      shortName: 'Campus multi-family',
      neighborhoods: ["multi-family clusters"],
      housingTypes: 'Apartments, multi-family',
      challenges: ["Building COIs","Elevator windows"],
      moverTips: 'Collect management packets; inventory elevators.',
      cityKeywords: ["midland multi-family"],
    },
    {
      id: 'core-edge',
      name: 'City core multi-story edges',
      shortName: 'Core edges',
      neighborhoods: ["central neighborhoods"],
      housingTypes: 'Multi-story, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["midland city"],
    },
    {
      id: 'rural',
      name: 'Rural townships & larger lots',
      shortName: 'Rural townships',
      neighborhoods: ["outer townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["midland rural"],
    }
  ],
  specialized: [
    {
      id: 'planned-hoa',
      title: 'Planned HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'bay-freeflow',
      title: 'US-10 / M-20 bay freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Saginaw multi-story rates for pure planned-cul-de-sac days."],
    },
    {
      id: 'vs-saginaw',
      title: 'Distinct from Saginaw industrial/residential fabric',
      intro: 'Corporate planned suburbs differ from bay industrial multi-unit mix.',
      bullets: ["Do not recycle Saginaw-only playbooks.","Planned HOA + campus multi-family mix is the differentiator."],
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
        intro: 'Midland families compare Midland Public Schools feeders — verify boundaries; do not assume Saginaw maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'MyMichigan Medical Center Midland and regional bay systems serve the market; map peak freeflow on US-10/M-20 corridors.',
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
    intro: 'HOA soft costs, multi-family access, and bay freeflow peaks often matter more than raw miles.',
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
    intro: 'School years and corporate calendars reshape demand more than pure industrial shift peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Saginaw County (and independent bay-region patterns) movers (parent contrast)', href: '/local-movers/michigan/saginaw' },
    ],
  },
});
