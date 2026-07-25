import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** augusta — VA Tier 2 Wave 2 */
export const augustaCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'augusta',
  hubTitle: 'Augusta County Moving Intelligence Hub',
  eyebrow: 'Augusta · Fishersville / I-81 valley · vs Rockingham',
  h1: 'Moving in Augusta County: Staunton–Waynesboro Valley Frame on I-81',
  heroOpener: 'Augusta County is the Shenandoah Valley frame around the independent cities of Staunton and Waynesboro — I-81 corridor, Fishersville medical node, farm tracts, and valley towns that are not those cities’ governments. Expect county-vs-city confusion, agricultural last-mile, and portal-to-portal time map miles understate. This guide is for people moving in Augusta County as valley-county product.',
  heroCredibility: 'Shenandoah Valley county · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · I-64 · US-11 · US-250 · US-340',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Rockingham County',
    parentHref: '/local-movers/virginia/rockingham',
    title: 'Compared with Rockingham County',
    intro: 'Augusta County excludes Staunton and Waynesboro independent cities — related valley freeflow to Rockingham/Harrisonburg, different seat and school system.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Rockingham pairs lean Harrisonburg ring and JMU spillover. Augusta pairs center on Fishersville medical corridor and I-81 farm-to-town freeflow between Staunton and Waynesboro.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Rockingham mixes county ring suburbs and ag workforce housing. Augusta mixes Fishersville medical-adjacent stock, farm lots, and mountain-edge approaches.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Farm lanes and city-line confusion rewrite plans more often than pure Harrisonburg multi-family defaults.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Valley rural SFH often sits below NoVA rates — I-81 long hauls and medical-adjacent multi-family still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Augusta is valley county frame identity — not Rockingham renamed and not Staunton/Waynesboro city government.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Augusta County different',
    intro: 'County vs independent cities and valley rural access — not a Harrisonburg clone.',
    bullets: [
      {
        title: 'County vs independent cities',
        detail: 'Staunton and Waynesboro are not Augusta County — mislabeled quotes fail routing.',
      },
      {
        title: 'Shenandoah Valley rural access',
        detail: 'Farm lanes and long drives need early surveys.',
      },
      {
        title: 'I-81 corridor timing',
        detail: 'Valley interstate peaks affect through traffic legs.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Augusta zones: Fishersville core, northern valley, southern I-81 & western mountain edge',
  zonesIntro: 'Two to four sharp products under one valley-county label.',
  zones: [
    {
      id: 'fishersville',
      name: 'Fishersville & central corridor',
      shortName: 'Fishersville',
      neighborhoods: ["Fishersville","medical corridor"],
      housingTypes: 'Medical and commercial valley core between cities',
      challenges: ["Cross-traffic near medical campuses"],
      moverTips: 'Plan medical-campus freeflow carefully.',
      cityKeywords: ["fishersville"],
    },
    {
      id: 'north',
      name: 'Northern Augusta toward Rockingham',
      shortName: 'Northern Augusta',
      neighborhoods: ["northern farms","small communities"],
      housingTypes: 'Valley farms and small communities',
      challenges: ["Long rural legs"],
      moverTips: 'Survey farm lane capacity.',
      cityKeywords: ["augusta north"],
    },
    {
      id: 'south',
      name: 'Southern Augusta & Greenville area',
      shortName: 'Southern Augusta',
      neighborhoods: ["Greenville area","I-81 south"],
      housingTypes: 'I-81 south approaches',
      challenges: ["Interstate timing"],
      moverTips: 'Build I-81 delay buffers for through legs.',
      cityKeywords: ["greenville va"],
    },
    {
      id: 'west',
      name: 'Western mountain edge',
      shortName: 'Western edge',
      neighborhoods: ["foothill","hollow access"],
      housingTypes: 'Foothill and hollow access',
      challenges: ["Grades","Weather"],
      moverTips: 'Photo grades; winter flexibility required.',
      cityKeywords: ["augusta west"],
    }
  ],
  specialized: [
    {
      id: 'city-lines',
      title: 'County vs independent cities',
      intro: 'Staunton and Waynesboro are not Augusta County.',
      bullets: ["Confirm jurisdiction on every estimate."],
    },
    {
      id: 'valley-rural',
      title: 'Shenandoah Valley rural access',
      intro: 'Farm lanes and long drives need early surveys.',
      bullets: ["Photo last-mile before pack day."],
    },
    {
      id: 'i81',
      title: 'I-81 corridor timing',
      intro: 'Valley interstate peaks affect any job that touches through traffic.',
      bullets: ["Price portal-to-portal honestly."],
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
        intro: 'Augusta families compare Augusta County Public Schools feeders — verify boundaries; do not assume Staunton/Waynesboro city maps apply.',
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
            detail: 'Augusta Health (Fishersville) anchors local care; regional referrals as needed; map valley freeflow at peaks.',
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
    intro: 'Jurisdiction errors, farm last-mile, and I-81 peaks often matter more than raw miles.',
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
    intro: 'School years and valley weather reshape demand more than pure NoVA office peaks alone.',
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
      { label: 'Rockingham County movers (parent contrast)', href: '/local-movers/virginia/rockingham' },
    ],
  },
});
