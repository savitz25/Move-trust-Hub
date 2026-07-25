import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** saginaw — MI Tier 2 Wave 1 */
export const saginawCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'saginaw',
  hubTitle: 'Saginaw County Moving Intelligence Hub',
  eyebrow: 'Saginaw · Great Lakes Bay hub · vs Genesee',
  h1: 'Moving in Saginaw County: Saginaw Hub, Township Belts & Great Lakes Bay Access',
  heroOpener: 'Saginaw County is the Great Lakes Bay industrial/residential hub — Saginaw multi-story and seat stock, Saginaw Township SFH, Freeland and Bridgeport edges, and freeflow that is not Genesee’s continuous Flint core multi-unit density and not Midland’s corporate-campus product alone. Expect longer empty miles into Flint and Midland, winter ice, and freeflow that still peaks hard on I-75. This guide is for people moving in Saginaw as bay-region hub product — not a Flint rename and not a Midland clone.',
  heroCredibility: 'Great Lakes Bay hub · Industrial/residential · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · I-675 · M-46 · M-13 · M-47 · Tittabawassee Rd corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Genesee County (and independent bay-region patterns)',
    parentHref: '/local-movers/michigan/genesee',
    title: 'Compared with Genesee County (and independent bay-region patterns)',
    intro: 'Saginaw is Great Lakes Bay hub product — not Flint core multi-unit density and not Midland corporate campus product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Genesee crews fight I-75 Flint peaks. Saginaw pairs ride I-75/I-675 further north, M-46, and township arterials — freer mid-day bay freeflow, still peak-heavy on school and industrial windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Genesee mixes Flint multi-story and southern suburban product. Saginaw mixes city multi-story, township SFH, and bay-edge lots — more continuous bay-hub product distinct from Midland’s corporate-campus fabric.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; township approaches add empty miles uncommon on pure Grand Blanc cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Saginaw quotes often sit at secondary bay rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Saginaw is Great Lakes Bay hub — not Genesee renamed and not Midland renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Saginaw County different',
    intro: 'I-75/I-675 freeflow, city multi-story, and bay empty miles — not a Flint or Midland clone.',
    bullets: [
      {
        title: 'I-75 / I-675 freeflow is billable',
        detail: 'Saginaw ↔ Flint pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Midland corporate-campus product',
        detail: 'Bay industrial/residential mix is not Midland planned corporate fabric alone.',
      },
      {
        title: 'City multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Winter ice rewrites morning plans',
        detail: 'Build weather buffers into peak commute quotes.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Saginaw zones: city core, Saginaw Township, Freeland–Bridgeport edges & rural townships',
  zonesIntro: 'Two to four sharp products under one bay-hub label.',
  zones: [
    {
      id: 'saginaw-city',
      name: 'Saginaw multi-story & seat',
      shortName: 'Saginaw city',
      neighborhoods: ["Saginaw","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["saginaw"],
    },
    {
      id: 'township',
      name: 'Saginaw Township SFH belts',
      shortName: 'Saginaw Twp',
      neighborhoods: ["Saginaw Township"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["saginaw township"],
    },
    {
      id: 'freeland-bridgeport',
      name: 'Freeland / Bridgeport edges',
      shortName: 'Freeland–Bridgeport',
      neighborhoods: ["Freeland","Bridgeport"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Empty miles","Airport/industrial freeflow"],
      moverTips: 'Price portal-to-portal; avoid peak industrial windows when possible.',
      cityKeywords: ["freeland","bridgeport"],
    },
    {
      id: 'rural',
      name: 'Rural townships & larger lots',
      shortName: 'Rural townships',
      neighborhoods: ["outer townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["saginaw rural"],
    }
  ],
  specialized: [
    {
      id: 'bay-hub',
      title: 'I-75 / I-675 bay freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Flint multi-family rates for rural township lots."],
    },
    {
      id: 'city-access',
      title: 'Saginaw multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-midland',
      title: 'Distinct from Midland corporate product',
      intro: 'Bay industrial/residential differs from chemical-heritage campus fabric.',
      bullets: ["Do not recycle Midland-only playbooks.","City multi-story + township SFH mix is the differentiator."],
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
        intro: 'Saginaw families compare Saginaw Public, Saginaw Township, and other districts — verify boundaries; do not assume Genesee maps apply.',
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
            detail: 'Covenant and regional bay systems serve the hub; map peak freeflow on I-75/I-675 corridors.',
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
    intro: 'Empty miles, city access, and bay freeflow peaks often matter more than raw miles.',
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
    intro: 'School years and winter ice reshape demand more than pure Flint industrial peaks alone.',
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
      { label: 'Genesee County (and independent bay-region patterns) movers (parent contrast)', href: '/local-movers/michigan/genesee' },
    ],
  },
});
