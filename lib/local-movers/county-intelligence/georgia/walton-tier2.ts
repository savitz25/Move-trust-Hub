import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** walton — GA Tier 2 Wave 2 */
export const waltonCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'walton',
  hubTitle: 'Walton County Moving Intelligence Hub',
  eyebrow: 'Walton · Monroe · east of Gwinnett · vs Gwinnett',
  h1: 'Moving in Walton County: Monroe, US-78 East Growth & East-of-Gwinnett Living',
  heroOpener: 'Walton County is east-of-Gwinnett growth product — Monroe seat density, US-78 freeflow, longer empty miles than Gwinnett’s I-85 core, and product that is not a Barrow GA-316 rename and not Newton’s I-20 film-edge pattern. Expect HOA growth villages, school-calendar SFH volume, and outer-east portal times. This guide is for people moving in Walton as Monroe US-78 east product — not Gwinnett density with different labels.',
  heroCredibility: 'US-78 east growth · Monroe seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-78 · GA-11 · GA-81 · GA-20 approaches · GA-138 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Gwinnett County (and Newton east patterns)',
    parentHref: '/local-movers/georgia/gwinnett',
    title: 'Compared with Gwinnett County (and Newton east patterns)',
    intro: 'Walton is Monroe / US-78 east-of-Gwinnett growth — not Gwinnett I-85 multi-family density and not Barrow GA-316 or Newton I-20 alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Gwinnett crews fight I-85 peaks. Walton pairs ride US-78 east, GA-11, and Monroe arterials — freer mid-day further east, still peak-heavy on school and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Gwinnett mixes dense multi-family and HOAs. Walton mixes Monroe SFH, east growth villages, and larger-lot edges — more continuous east-of-Gwinnett product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; rural edges add empty miles uncommon on pure Lawrenceville multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Walton quotes often sit at east-outer rates for driveway SFH — empty miles from Gwinnett staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Walton is US-78 east Monroe growth — not Gwinnett renamed and not Barrow or Newton renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Walton County different',
    intro: 'US-78 freeflow, Monroe seat stock, and east-of-Gwinnett empty miles — not a Gwinnett or Barrow clone.',
    bullets: [
      {
        title: 'US-78 freeflow is billable',
        detail: 'Monroe ↔ Gwinnett pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Barrow GA-316 product',
        detail: 'Walton is US-78 east — not Winder 316 freeflow alone.',
      },
      {
        title: 'Distinct from Newton I-20 outer',
        detail: 'Different spine and film mix than Covington.',
      },
      {
        title: 'HOA growth villages dominate family volume',
        detail: 'COI and gate lists on new villages are standard.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Walton zones: Monroe seat, US-78 growth, west edges toward Gwinnett & rural east',
  zonesIntro: 'Two to four sharp products under one east-of-Gwinnett label.',
  zones: [
    {
      id: 'monroe',
      name: 'Monroe seat & core',
      shortName: 'Monroe',
      neighborhoods: ["Monroe","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Arterial timing"],
      moverTips: 'Confirm driveway staging; price school peaks.',
      cityKeywords: ["monroe ga"],
    },
    {
      id: 'us78-growth',
      name: 'US-78 corridor growth villages',
      shortName: 'US-78 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","US-78 peaks"],
      moverTips: 'Collect COI early; avoid peak 78 windows when possible.',
      cityKeywords: ["walton growth"],
    },
    {
      id: 'west-edges',
      name: 'West edges toward Gwinnett',
      shortName: 'West edges',
      neighborhoods: ["western neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks","Empty miles"],
      moverTips: 'Price portal-to-portal toward Gwinnett job centers.',
      cityKeywords: ["walton west"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["walton east"],
    }
  ],
  specialized: [
    {
      id: 'us78',
      title: 'US-78 east freeflow',
      intro: 'Outer pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Gwinnett multi-family rates for Monroe driveways."],
    },
    {
      id: 'growth-hoa',
      title: 'East-of-Gwinnett HOA growth',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks need flexibility."],
    },
    {
      id: 'vs-neighbors',
      title: 'Distinct from Barrow and Newton',
      intro: 'Different spines and last-mile profiles.',
      bullets: ["Do not recycle GA-316 or I-20 film playbooks.","US-78 HOA growth is the differentiator."],
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
        intro: 'Walton families compare Walton County Schools feeders across Monroe and growth villages — verify boundaries; do not assume Gwinnett maps apply.',
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
            detail: 'Piedmont Walton and regional clinics anchor acute care; map peak freeflow on US-78 corridors.',
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
    intro: 'Empty miles, HOA soft costs, and US-78 peaks often matter more than raw miles.',
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
      { label: 'Gwinnett County (and Newton east patterns) movers (parent contrast)', href: '/local-movers/georgia/gwinnett' },
    ],
  },
});
