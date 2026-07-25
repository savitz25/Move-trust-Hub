import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** spotsylvania — VA Tier 2 Wave 1 */
export const spotsylvaniaCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'spotsylvania',
  hubTitle: 'Spotsylvania County Moving Intelligence Hub',
  eyebrow: 'Spotsylvania · Massaponax / Spotsylvania Courthouse · Freds south · vs Stafford',
  h1: 'Moving in Spotsylvania County: Massaponax Growth, Courthouse Seat & I-95 South Access',
  heroOpener: 'Spotsylvania County is Fredericksburg’s south growth collar — Massaponax multi-family and retail corridors, Spotsylvania Courthouse seat stock, VA-3 western growth, and freeflow that is not Stafford’s Quantico-adjacent I-95 north product alone. Expect longer empty miles into NoVA, HOA packets on growth streets, and I-95 peaks that still rewrite “local” pairs. This guide is for people moving in Spotsylvania as south-Freds growth product — not a Stafford rename.',
  heroCredibility: 'South-Fredericksburg growth · I-95 / VA-3 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · VA-3 · US-1 · VA-208',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Stafford County (and independent Fredericksburg-south patterns)',
    parentHref: '/local-movers/virginia/stafford',
    title: 'Compared with Stafford County (and independent Fredericksburg-south patterns)',
    intro: 'Spotsylvania is Massaponax / VA-3 south-Freds growth — not Stafford Garrisonville Quantico product and not Richmond-metro defaults.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Stafford crews fight Quantico and north I-95 peaks. Spotsylvania pairs ride I-95 further south, VA-3, and Massaponax corridors — freer mid-day off Quantico choke points, still peak-heavy on Freds and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Stafford mixes Garrisonville multi-family and Aquia lots. Spotsylvania mixes Massaponax multi-family, Courthouse SFH, and western VA-3 growth — more continuous south-Freds product, less continuous Quantico-adjacent density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; Massaponax multi-family needs building packets uncommon on pure rural western lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Spotsylvania quotes often sit at secondary south-Freds rates for driveway SFH — empty miles into NoVA still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Spotsylvania is south-Fredericksburg I-95/VA-3 growth — not Stafford renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Spotsylvania County different',
    intro: 'Massaponax freeflow, VA-3 growth, and south-Freds empty miles — not a Stafford clone.',
    bullets: [
      {
        title: 'I-95 freeflow is still billable',
        detail: 'Massaponax ↔ NoVA pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Stafford Quantico product',
        detail: 'South growth is not Garrisonville base-adjacent density alone.',
      },
      {
        title: 'VA-3 western growth rewrites last-mile',
        detail: 'Longer empty miles and rural approaches vs Massaponax multi-family.',
      },
      {
        title: 'MD/DC legs need FMCSA',
        detail: 'Cross-border destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Spotsylvania zones: Massaponax corridors, Courthouse seat, VA-3 west growth & rural south',
  zonesIntro: 'Two to four sharp products under one south-Freds label.',
  zones: [
    {
      id: 'massaponax',
      name: 'Massaponax multi-family & retail',
      shortName: 'Massaponax',
      neighborhoods: ["Massaponax","US-1 edges"],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: ["Arterial timing","Building COIs"],
      moverTips: 'Collect management packets; avoid peak retail windows.',
      cityKeywords: ["massaponax"],
    },
    {
      id: 'courthouse',
      name: 'Spotsylvania Courthouse seat',
      shortName: 'Courthouse',
      neighborhoods: ["Spotsylvania Courthouse","seat neighborhoods"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Confirm driveway staging near seat arterials.',
      cityKeywords: ["spotsylvania courthouse"],
    },
    {
      id: 'va3-west',
      name: 'VA-3 western growth villages',
      shortName: 'VA-3 west',
      neighborhoods: ["western growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect COI early; price portal-to-portal.',
      cityKeywords: ["spotsylvania va-3"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["spotsylvania south"],
    }
  ],
  specialized: [
    {
      id: 'i95-south',
      title: 'I-95 south-Freds freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Stafford Quantico rates for rural VA-3 lots."],
    },
    {
      id: 'massaponax-mf',
      title: 'Massaponax multi-family logistics',
      intro: 'Building packets are first-class cost drivers.',
      bullets: ["Elevator windows early.","Month-end competition for crews is real."],
    },
    {
      id: 'vs-stafford',
      title: 'Distinct from Stafford north collar',
      intro: 'South growth differs from Quantico adjacency.',
      bullets: ["Do not recycle Garrisonville-only playbooks.","Massaponax/VA-3 mix is the differentiator."],
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
        intro: 'Spotsylvania families compare Spotsylvania County Schools feeders across Massaponax and Courthouse areas — verify boundaries; do not assume Stafford maps apply.',
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
            detail: 'Mary Washington and regional systems serve the Freds south collar; map peak freeflow on I-95 corridors.',
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
    intro: 'School years and summer family closings reshape demand more than Quantico PCS peaks alone.',
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
      { label: 'Stafford County (and independent Fredericksburg-south patterns) movers (parent contrast)', href: '/local-movers/virginia/stafford' },
    ],
  },
});
