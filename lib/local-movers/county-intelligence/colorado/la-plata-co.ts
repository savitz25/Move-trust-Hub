import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * la-plata â€” CO Tier 2 Wave 1
 */
export const laPlataCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'la-plata',
  hubTitle: 'La Plata County Moving Intelligence Hub',
  eyebrow: 'La Plata · Durango — southwest mountain hub',
  h1: 'Moving in La Plata County: Durango, SW Mountain Hub & US-160 Access',
  heroOpener:
    'La Plata County is southwest Colorado regional mountain hub product — Durango multi-story and multi-family stock, Bayfield and rural valley edges, tourism and university calendars, and freeflow on US-160 / US-550 that is not I-70 resort-corridor product with different labels. Expect elevation weather, longer empty miles from Front Range, and discontinuous valley approaches under one county. This guide is for people moving in La Plata as independent SW CO hub — not an I-70 resort clone.',
  heroCredibility:
    'SW CO independent · Durango hub · Tourism + residential · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-160 · US-550 · CO-172 · CO-151 · Camino del Rio corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent SW Colorado (vs I-70 resort defaults)',
    parentHref: '/local-movers/colorado/eagle',
    title: 'Compared with independent SW Colorado (vs I-70 resort defaults)',
    intro:
      'La Plata is independent SW mountain regional hub on US-160/550 — not Eagle/Summit I-70 resort density and not Front Range multi-family.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'I-70 resort crews fight pass peaks into Vail/Breckenridge. La Plata pairs ride US-160 and US-550 — freer mid-day valley freeflow, still peak-heavy on Durango arterials and tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'I-70 resorts mix association multi-story and corridor multi-family. La Plata mixes Durango multi-story, Bayfield SFH, and rural valley lots — more regional hub product, less continuous ski-village density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Historic streets need curb plans; multi-family elevators appear on growth edges; mountain approaches rewrite truck size.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local La Plata quotes often track SW secondary rates for multi-story access — long empty-mile pairs from Front Range yards price as distance work.',
      },
      {
        title: 'Role difference',
        detail:
          'La Plata is independent SW mountain hub — not I-70 resort product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in La Plata County different',
    intro: 'Durango multi-story, tourism calendars, and long empty miles — not interchangeable I-70 resort boilerplate.',
    bullets: [
      {
        title: 'Tourism peaks rewrite weekends',
        detail:
          'Durango volume stacks around major tourism windows. Book early.',
      },
      {
        title: 'Durango multi-story is first-class product',
        detail:
          'Historic stairs need inventories different from pure Bayfield lots.',
      },
      {
        title: 'Long empty miles from Front Range yards are real',
        detail:
          'Even “in-state” pairs can price as multi-day distance work.',
      },
      {
        title: 'Distinct from I-70 resort corridor product',
        detail:
          'Do not recycle Vail or Breckenridge day rates alone.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'La Plata zones: Durango multi-story, multi-family growth, Bayfield edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, multi-family growth, edge towns, and rural lots.',
  zones: [
    {
      id: 'durango',
      name: 'Durango multi-story & seat stock',
      shortName: 'Durango',
      neighborhoods: ["Durango","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Tourism peaks"],
      moverTips: 'Inventory stairs; avoid peak tourism weekends when possible.',
      cityKeywords: ["durango"],
    },
    {
      id: 'multi-growth',
      name: 'Durango multi-family growth edges',
      shortName: 'Multi-family growth',
      neighborhoods: ["growth multi-family","university edges"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Lease clusters","COI packets"],
      moverTips: 'Collect building rules; book around term and tourism windows.',
      cityKeywords: ["durango multi"],
    },
    {
      id: 'bayfield',
      name: 'Bayfield / valley-edge SFH',
      shortName: 'Bayfield',
      neighborhoods: ["Bayfield","valley SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["bayfield"],
    },
    {
      id: 'rural-valley',
      name: 'Rural SW valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","mountain approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural la plata"],
    }
  ],
  specialized: [
    {
      id: 'sw-hub',
      title: 'Durango SW mountain hub module',
      intro: 'Hub multi-story and tourism calendars dominate volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle I-70 resort day rates alone."],
    },
    {
      id: 'tourism-peaks',
      title: 'Tourism peak module',
      intro: 'Seasonal weekends rewrite staging.',
      bullets: ["Book capacity early for peak seasons.","Build arterial buffers for festival windows."],
    },
    {
      id: 'long-empty',
      title: 'Front Range long empty-mile module',
      intro: 'In-state pairs can still be distance work.',
      bullets: ["Price portal-to-portal from Front Range staging honestly.","Clarify Denver second addresses for drive-time assumptions."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'La Plata families compare Durango 9-R, Bayfield 10 Jt-R, and related district feeders — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use CDE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Mercy Hospital and regional specialty spillover serve the county; map peak US-160 / US-550 times for ER access.',
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
    intro: 'Hub multi-story, tourism peaks, and long empty miles often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Tourism summers, school years, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Colorado PUC household goods (HHG) permit for in-state Colorado moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent SW Colorado (vs I-70 resort defaults) movers (parent contrast)',
        href: '/local-movers/colorado/eagle',
      },
      {
        label: 'Denver County movers',
        href: '/local-movers/colorado/denver',
      },
    ],
  },
});
