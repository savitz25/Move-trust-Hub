import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** barrow — GA Tier 2 Wave 2 */
export const barrowCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'barrow',
  hubTitle: 'Barrow County Moving Intelligence Hub',
  eyebrow: 'Barrow · Winder · NE Atlanta collar · vs Gwinnett',
  h1: 'Moving in Barrow County: Winder, GA-316 Corridor & Outer Northeast Growth',
  heroOpener: 'Barrow County is northeast Atlanta’s outer GA-316 growth collar — Winder seat density, longer empty miles than Gwinnett’s I-85 core, and product that is not a Gwinnett rename and not Hall’s Gainesville manufacturing hub. Expect HOA growth villages, school-calendar SFH volume, and portal times that map miles understate. This guide is for people moving in Barrow as outer NE GA-316 product — not Gwinnett density with different labels.',
  heroCredibility: 'GA-316 outer NE growth · Winder seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'GA-316 · US-29 · GA-11 · GA-81 · GA-211 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Gwinnett County (and Hall northeast patterns)',
    parentHref: '/local-movers/georgia/gwinnett',
    title: 'Compared with Gwinnett County (and Hall northeast patterns)',
    intro: 'Barrow is Winder / GA-316 outer NE growth — not Gwinnett I-85 multi-family density and not Hall Gainesville manufacturing hub alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Gwinnett crews fight I-85 and 316 peaks closer in. Barrow pairs ride GA-316 further east, US-29, and Winder arterials — freer mid-day outer freeflow, still peak-heavy on school and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Gwinnett mixes dense multi-family and HOAs. Barrow mixes Winder SFH, outer growth villages, and larger-lot edges — more continuous outer NE product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; rural edges add empty miles uncommon on pure Suwanee cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Barrow quotes often sit at outer-NE rates for driveway SFH — empty miles from Gwinnett staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Barrow is outer NE GA-316 growth — not Gwinnett renamed and not Hall I-985 hub.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Barrow County different',
    intro: 'GA-316 freeflow, Winder seat stock, and outer NE empty miles — not a Gwinnett clone.',
    bullets: [
      {
        title: 'GA-316 freeflow is billable',
        detail: 'Winder ↔ Gwinnett pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Outer NE HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Walton US-78 east',
        detail: 'Barrow is GA-316 Winder product — not Monroe US-78 alone.',
      },
      {
        title: 'Empty miles from Gwinnett staging matter',
        detail: 'Do not quote pure Gwinnett local rates for Barrow deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Barrow zones: Winder seat, GA-316 growth, west edges & rural east',
  zonesIntro: 'Two to four sharp products under one outer NE growth label.',
  zones: [
    {
      id: 'winder',
      name: 'Winder seat & core',
      shortName: 'Winder',
      neighborhoods: ["Winder","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Arterial timing"],
      moverTips: 'Confirm driveway staging; price school peaks.',
      cityKeywords: ["winder"],
    },
    {
      id: 'ga316-growth',
      name: 'GA-316 corridor growth villages',
      shortName: 'GA-316 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","GA-316 peaks"],
      moverTips: 'Collect COI early; avoid peak 316 windows when possible.',
      cityKeywords: ["barrow growth"],
    },
    {
      id: 'west-edges',
      name: 'West edges toward Gwinnett',
      shortName: 'West edges',
      neighborhoods: ["western neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks","Empty miles"],
      moverTips: 'Price portal-to-portal toward Gwinnett job centers.',
      cityKeywords: ["barrow west"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["barrow east"],
    }
  ],
  specialized: [
    {
      id: 'ga316',
      title: 'GA-316 outer NE freeflow',
      intro: 'Outer pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Gwinnett multi-family rates for Winder driveways."],
    },
    {
      id: 'growth-hoa',
      title: 'Outer NE HOA growth logistics',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks need flexibility."],
    },
    {
      id: 'empty-miles',
      title: 'Outer-collar empty miles',
      intro: 'Deadhead rewrites hourly math.',
      bullets: ["Clarify staging location before deposit.","Photo rural last-mile."],
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
        intro: 'Barrow families compare Barrow County Schools feeders across Winder and growth villages — verify boundaries; do not assume Gwinnett maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Northeast Georgia Medical Center – Barrow and regional clinics anchor acute care; map peak freeflow on GA-316 corridors.',
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
    intro: 'Empty miles, HOA soft costs, and GA-316 peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than Gwinnett corporate peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, tourism, or industrial windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Gwinnett County (and Hall northeast patterns) movers (parent contrast)', href: '/local-movers/georgia/gwinnett' },
    ],
  },
});
