import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** bartow — GA Tier 2 Wave 2 */
export const bartowCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'bartow',
  hubTitle: 'Bartow County Moving Intelligence Hub',
  eyebrow: 'Bartow · Cartersville · I-75 NW · vs Cobb',
  h1: 'Moving in Bartow County: Cartersville, Lake Allatoona Edge & I-75 Northwest Growth',
  heroOpener: 'Bartow County is northwest Atlanta’s I-75 outer growth collar — Cartersville seat density, Lake Allatoona-edge approaches, industrial-adjacent residential, and freeflow that is not Cobb’s continuous Marietta multi-family core and not Cherokee’s I-575 HOA pattern. Expect longer empty miles from the Perimeter, HOA growth villages, and lake last-mile on some edges. This guide is for people moving in Bartow as I-75 NW Cartersville product — not a Cobb or Cherokee rename.',
  heroCredibility: 'I-75 NW growth · Lake Allatoona edge · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-41 · GA-20 · GA-113 · GA-61 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Cobb County (and Cherokee north patterns)',
    parentHref: '/local-movers/georgia/cobb',
    title: 'Compared with Cobb County (and Cherokee north patterns)',
    intro: 'Bartow is Cartersville / Allatoona I-75 northwest outer growth — not Cobb Cumberland multi-family and not Cherokee I-575 master-plan density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cobb crews fight I-75 and East-West Connector peaks closer in. Bartow pairs ride I-75 further northwest, US-41, and Cartersville arterials — freer mid-day outer freeflow, still peak-heavy on commute and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Cobb mixes East Cobb lots and Smyrna multi-family; Cherokee skews I-575 HOAs. Bartow mixes Cartersville multi-story and SFH, Allatoona-edge homes, and industrial-adjacent growth — more continuous outer NW product, less continuous Cumberland elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; lake approaches can add narrow roads uncommon on pure Marietta multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Bartow quotes often sit at outer NW-collar rates for driveway SFH — empty miles from Cobb staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Bartow is I-75 NW Cartersville / Allatoona product — not Cobb or Cherokee renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bartow County different',
    intro: 'I-75 NW freeflow, Allatoona edges, and outer empty miles — not a Cobb or Cherokee clone.',
    bullets: [
      {
        title: 'I-75 northwest freeflow is billable',
        detail: 'Cartersville ↔ Cobb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake Allatoona edges rewrite truck size',
        detail: 'Photo last-mile on lake approaches.',
      },
      {
        title: 'Distinct from Cherokee I-575 growth',
        detail: 'Do not recycle Woodstock HOA-only playbooks for Cartersville industrial-edge days.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure Cobb local rates for Bartow deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Bartow zones: Cartersville seat, Allatoona edge, I-75 growth & rural west',
  zonesIntro: 'Two to four sharp products under one I-75 NW outer-collar label.',
  zones: [
    {
      id: 'cartersville',
      name: 'Cartersville seat & core',
      shortName: 'Cartersville',
      neighborhoods: ["Cartersville","downtown edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street width","Arterial timing"],
      moverTips: 'Inventory stairs on older stock; plan temporary no-parking where needed.',
      cityKeywords: ["cartersville"],
    },
    {
      id: 'allatoona',
      name: 'Lake Allatoona edge',
      shortName: 'Allatoona edge',
      neighborhoods: ["lake approaches","Allatoona-adjacent streets"],
      housingTypes: 'SFH, some seasonal access constraints',
      challenges: ["Narrow roads","Last-mile width"],
      moverTips: 'Photo approaches; confirm truck size before survey final.',
      cityKeywords: ["lake allatoona"],
    },
    {
      id: 'i75-growth',
      name: 'I-75 corridor growth villages',
      shortName: 'I-75 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-75 peaks"],
      moverTips: 'Collect COI early; avoid peak I-75 windows when possible.',
      cityKeywords: ["bartow growth"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["bartow west"],
    }
  ],
  specialized: [
    {
      id: 'i75-nw',
      title: 'I-75 northwest freeflow',
      intro: 'Outer pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cobb Cumberland rates for Cartersville driveways."],
    },
    {
      id: 'allatoona',
      title: 'Lake Allatoona edge access',
      intro: 'Last-mile width changes truck type.',
      bullets: ["Photo approaches before final quote.","Seasonal parking can tighten lake streets."],
    },
    {
      id: 'growth-hoa',
      title: 'Outer NW HOA growth logistics',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
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
        intro: 'Bartow families compare Bartow County Schools feeders across Cartersville and growth villages — verify boundaries; do not assume Cobb or Cherokee maps apply.',
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
            detail: 'Piedmont Cartersville and regional clinics anchor acute care; map peak freeflow on I-75 NW corridors.',
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
    intro: 'Empty miles, lake last-mile, and I-75 peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than northwest Cobb corporate peaks alone.',
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
      { label: 'Cobb County (and Cherokee north patterns) movers (parent contrast)', href: '/local-movers/georgia/cobb' },
    ],
  },
});
