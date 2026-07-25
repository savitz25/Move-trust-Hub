import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** stafford — VA Tier 2 Wave 1 */
export const staffordCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'stafford',
  hubTitle: 'Stafford County Moving Intelligence Hub',
  eyebrow: 'Stafford · Aquia / Garrisonville · I-95 NoVA–Fredericksburg · vs Prince William',
  h1: 'Moving in Stafford County: Aquia, Garrisonville & I-95 Quantico-Adjacent Growth',
  heroOpener: 'Stafford County is the I-95 collar between Northern Virginia and Fredericksburg — Aquia and Garrisonville multi-family density, Quantico-adjacent PCS calendars, US-1 corridors, and longer empty miles than Prince William’s Woodbridge/Manassas product alone. Expect HOA packets, base-adjacent deadlines, and portal-to-portal time that map miles understate. This guide is for people moving in Stafford as I-95 commuting collar product — not a Prince William rename and not a Spotsylvania south-growth clone.',
  heroCredibility: 'I-95 commute collar · Quantico-adjacent · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-1 · VA-610 (Garrisonville) · VA-17',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Prince William County',
    parentHref: '/local-movers/virginia/prince-william',
    title: 'Compared with Prince William County',
    intro: 'Stafford is I-95 south-of-PW commuting growth with Quantico adjacency — not Woodbridge/Manassas density alone and not Spotsylvania VA-3 south product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Prince William crews fight I-95/VA-234 peaks closer to the Beltway. Stafford pairs ride I-95 further south, US-1, and VA-610 — freer mid-day off NoVA choke points, still peak-heavy on Quantico and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Prince William mixes Dale City multi-family and Gainesville HOAs. Stafford mixes Garrisonville multi-family, Aquia water-edge lots, and Courthouse-edge SFH — more continuous Quantico-adjacent product, less continuous outer-Manassas warehouse-edge density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets and apartment COIs dominate growth corridors; base calendars rewrite mid-week demand more often than pure Saturday residential quotes.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Stafford quotes often sit at secondary I-95 collar rates for driveway SFH — empty miles into NoVA and multi-family access still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Stafford is I-95 NoVA–Fredericksburg collar with Quantico adjacency — not Prince William renamed and not Spotsylvania south growth.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Stafford County different',
    intro: 'I-95 freeflow, Quantico calendars, and Garrisonville density — not a PW or Spotsylvania clone.',
    bullets: [
      {
        title: 'I-95 freeflow is billable',
        detail: 'Stafford ↔ PW pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Quantico-adjacent PCS and contractor deadlines',
        detail: 'Report dates create mid-week spikes pure residential Saturday quotes miss.',
      },
      {
        title: 'Distinct from Spotsylvania south growth',
        detail: 'North-of-Freds I-95 product is not Massaponax/VA-3 western growth alone.',
      },
      {
        title: 'MD/DC legs need FMCSA',
        detail: 'Cross-border destinations flip authority even on short-looking hops.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Stafford zones: Garrisonville density, Aquia edge, Courthouse seat & rural west',
  zonesIntro: 'Two to four sharp products under one I-95 collar label.',
  zones: [
    {
      id: 'garrisonville',
      name: 'Garrisonville multi-family & retail corridors',
      shortName: 'Garrisonville',
      neighborhoods: ["Garrisonville","VA-610 edges"],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: ["Arterial timing","Building COIs"],
      moverTips: 'Collect management packets; avoid peak retail windows.',
      cityKeywords: ["garrisonville"],
    },
    {
      id: 'aquia',
      name: 'Aquia / water-edge product',
      shortName: 'Aquia',
      neighborhoods: ["Aquia Harbour","Aquia edges"],
      housingTypes: 'SFH, water-access lots',
      challenges: ["Last-mile width","HOA packets"],
      moverTips: 'Photo approaches; confirm HOA rules early.',
      cityKeywords: ["aquia"],
    },
    {
      id: 'courthouse',
      name: 'Stafford Courthouse seat edges',
      shortName: 'Courthouse',
      neighborhoods: ["Stafford Courthouse","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Confirm driveway staging near seat arterials.',
      cityKeywords: ["stafford courthouse"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["stafford west"],
    }
  ],
  specialized: [
    {
      id: 'i95-collar',
      title: 'I-95 commuting freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote PW Woodbridge rates for Aquia water-edge lots."],
    },
    {
      id: 'quantico',
      title: 'Quantico-adjacent PCS logistics',
      intro: 'Base calendars create hard deadlines.',
      bullets: ["Book early around report dates.","Ask about storage-in-transit."],
    },
    {
      id: 'garrisonville-mf',
      title: 'Garrisonville multi-family turns',
      intro: 'Building packets are first-class cost drivers.',
      bullets: ["Elevator windows early.","Month-end competition for crews is real."],
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
        intro: 'Stafford families compare Stafford County Schools feeders across Garrisonville and Courthouse areas — verify boundaries; do not assume Prince William maps apply.',
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
            detail: 'Stafford Hospital and regional NoVA/Fredericksburg systems serve the collar; map peak freeflow on I-95 corridors.',
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
    intro: 'Empty miles, multi-family access, and I-95 peaks often matter more than raw miles.',
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
    intro: 'PCS windows and school years reshape demand more than pure NoVA office peaks alone.',
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
      { label: 'Prince William County movers (parent contrast)', href: '/local-movers/virginia/prince-william' },
    ],
  },
});
