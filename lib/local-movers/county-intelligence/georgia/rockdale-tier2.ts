import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** rockdale — GA Tier 2 Wave 2 */
export const rockdaleCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'rockdale',
  hubTitle: 'Rockdale County Moving Intelligence Hub',
  eyebrow: 'Rockdale · Conyers · east Atlanta inner collar · vs DeKalb',
  h1: 'Moving in Rockdale County: Conyers, I-20 East Inner Collar & East-Metro Access',
  heroOpener: 'Rockdale County is east Atlanta’s I-20 inner collar — Conyers seat density, closer Perimeter freeflow than Newton’s outer Covington growth, and product that is not DeKalb’s continuous intown multi-family core. Expect HOA and SFH mix, I-20 peak clocks, and empty miles that still matter versus inside-Perimeter staging. This guide is for people moving in Rockdale as Conyers east-inner collar — not a Newton outer-collar rename and not a DeKalb script.',
  heroCredibility: 'I-20 east inner collar · Conyers seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · GA-138 · GA-20 · US-278 · Sigman Road corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'DeKalb County (and Newton outer-east patterns)',
    parentHref: '/local-movers/georgia/dekalb',
    title: 'Compared with DeKalb County (and Newton outer-east patterns)',
    intro: 'Rockdale is Conyers I-20 east inner collar — not DeKalb intown multi-family density and not Newton outer Covington growth alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'DeKalb crews fight I-285 and intown peaks. Rockdale pairs ride I-20 east, GA-138, and Conyers arterials — freer mid-day east of the core, still peak-heavy on commute windows and closer-in than Newton’s outer freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail: 'DeKalb mixes diverse multi-family and intown stock. Rockdale mixes Conyers SFH, multi-family pockets, and HOA villages — more continuous east-inner collar product, less continuous intown elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets appear on growth villages; older Conyers stock can add street-width constraints uncommon on pure outer Newton lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Rockdale quotes often sit at east-collar rates for driveway SFH — empty miles from intown staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Rockdale is I-20 east inner collar Conyers product — not DeKalb renamed and not Newton outer collar.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Rockdale County different',
    intro: 'Conyers seat density, I-20 east peaks, and inner-east freeflow — not a Newton clone.',
    bullets: [
      {
        title: 'I-20 east freeflow is billable',
        detail: 'Conyers ↔ DeKalb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Inner collar vs Newton outer growth',
        detail: 'Shorter empty miles than Covington outer lots — do not recycle Newton rural-edge playbooks.',
      },
      {
        title: 'HOA and multi-family mix is first-class',
        detail: 'Building packets and gate lists both appear under one county label.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure DeKalb local rates for Conyers deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Rockdale zones: Conyers core, I-20 corridors, HOA villages & east edges',
  zonesIntro: 'Two to four sharp products under one I-20 east inner-collar label.',
  zones: [
    {
      id: 'conyers',
      name: 'Conyers seat & core',
      shortName: 'Conyers',
      neighborhoods: ["Conyers","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock, mixed density',
      challenges: ["Street width","Arterial timing"],
      moverTips: 'Confirm driveway staging; inventory older multi-story where present.',
      cityKeywords: ["conyers"],
    },
    {
      id: 'i20-corridors',
      name: 'I-20 corridor residential',
      shortName: 'I-20 corridors',
      neighborhoods: ["corridor neighborhoods","I-20 edges"],
      housingTypes: 'SFH, townhomes, some multi-family',
      challenges: ["I-20 peaks","Mixed access"],
      moverTips: 'Price portal-to-portal; avoid peak I-20 windows when possible.',
      cityKeywords: ["rockdale i-20"],
    },
    {
      id: 'hoa-villages',
      name: 'HOA growth villages',
      shortName: 'HOA villages',
      neighborhoods: ["planned villages","growth HOAs"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["Gate lists","HOA hours"],
      moverTips: 'Collect COI early; weekday windows often beat Saturdays.',
      cityKeywords: ["rockdale hoa"],
    },
    {
      id: 'east-edges',
      name: 'East / rural-edge pockets',
      shortName: 'East edges',
      neighborhoods: ["eastern lots","larger approaches"],
      housingTypes: 'Larger lots, longer approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["rockdale east"],
    }
  ],
  specialized: [
    {
      id: 'i20-inner',
      title: 'I-20 east inner-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote DeKalb elevator rates for Conyers driveways."],
    },
    {
      id: 'conyers-seat',
      title: 'Conyers seat access mix',
      intro: 'Older stock and arterials are first-class cost drivers.',
      bullets: ["Confirm street width.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-newton',
      title: 'Distinct from Newton outer collar',
      intro: 'Closer freeflow than Covington growth edges.',
      bullets: ["Do not recycle outer film/rural playbooks.","Inner-collar HOA packets still dominate many villages."],
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
        intro: 'Rockdale families compare Rockdale County Schools feeders across Conyers — verify boundaries; do not assume DeKalb or Newton maps apply.',
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
            detail: 'Piedmont Rockdale and regional clinics anchor acute care; map peak freeflow on I-20 east corridors.',
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
    intro: 'I-20 peaks, access soft costs, and empty miles often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than intown DeKalb calendars alone.',
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
      { label: 'DeKalb County (and Newton outer-east patterns) movers (parent contrast)', href: '/local-movers/georgia/dekalb' },
    ],
  },
});
