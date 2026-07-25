import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * tazewell â€” IL Tier 2 Wave 1
 */
export const tazewellCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'tazewell',
  hubTitle: 'Tazewell County Moving Intelligence Hub',
  eyebrow: 'Tazewell · Pekin / East Peoria / Morton — Peoria south/east',
  h1: 'Moving in Tazewell County: East Peoria, Pekin & River-South Collar Access',
  heroOpener:
    'Tazewell County is Peoria’s river-south and east collar — East Peoria multi-family and retail-corridor stock, Pekin multi-story and seat density, Morton HOA growth, and freeflow that is not Peoria medical-core elevators with different labels. Expect bridge freeflow, industrial-residential mix, and discontinuous towns under one county. This guide is for people moving in Tazewell as Peoria south/east collar — not a Peoria core rename.',
  heroCredibility:
    'Peoria river-south collar · East Peoria / Pekin / Morton · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-74 · I-474 · IL-29 · IL-9 · IL-98 · US-24',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Peoria County',
    parentHref: '/local-movers/illinois/peoria',
    title: 'Compared with Peoria County',
    intro:
      'Tazewell is Peoria river-south collar on bridge freeflow — not Peoria medical-core multi-story alone and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Peoria crews fight medical-corridor peaks and bluff approaches. Tazewell pairs ride I-74 bridges, IL-29, and IL-9 — freer mid-day south/east of the river, still peak-heavy on East Peoria retail corridors and Pekin arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Peoria mixes medical elevators and Heights bluffs. Tazewell mixes East Peoria multi-family, Pekin multi-story, and Morton HOA — more continuous collar product south of the river, less continuous Peoria medical density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Bridge freeflow is first-class; multi-family elevators appear on East Peoria corridors; Morton HOAs add packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Tazewell quotes often sit near river-collar suburb rates for driveway SFH — multi-story Pekin access and bridge peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Tazewell is Peoria river-south/east collar — not Peoria core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Tazewell County different',
    intro: 'Bridge freeflow, East Peoria multi-family, and Pekin multi-story — not interchangeable Peoria medical-core boilerplate.',
    bullets: [
      {
        title: 'River-bridge freeflow is still billable',
        detail:
          'Tazewell ↔ Peoria pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'East Peoria multi-family is first-class product',
        detail:
          'Elevators and retail-corridor parking need inventories different from Morton cul-de-sacs.',
      },
      {
        title: 'Pekin multi-story differs from pure HOA growth',
        detail:
          'Seat stairs and curb plans are real cost drivers.',
      },
      {
        title: 'Morton HOA soft costs are standard survey inputs',
        detail:
          'Gate lists and approved hours push demand into peak windows.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Tazewell zones: East Peoria multi-family, Pekin seat, Morton growth & southern lots',
  zonesIntro: 'Two to four sharp products — river multi-family, seat multi-story, growth HOAs, and southern lots.',
  zones: [
    {
      id: 'east-peoria',
      name: 'East Peoria multi-family & retail corridors',
      shortName: 'East Peoria',
      neighborhoods: ["East Peoria","retail multi-family","bridge approaches"],
      housingTypes: 'Multi-family, townhomes, SFH',
      challenges: ["Elevators","Bridge freeflow","Parking limits"],
      moverTips: 'Confirm elevator rules; build bridge-peak buffers.',
      cityKeywords: ["east peoria"],
    },
    {
      id: 'pekin',
      name: 'Pekin multi-story & seat stock',
      shortName: 'Pekin',
      neighborhoods: ["Pekin","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","IL-29 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["pekin"],
    },
    {
      id: 'morton',
      name: 'Morton HOA growth & multi-family',
      shortName: 'Morton',
      neighborhoods: ["Morton","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-74 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["morton"],
    },
    {
      id: 'south-lots',
      name: 'Southern Tazewell larger lots',
      shortName: 'South lots',
      neighborhoods: ["Delavan edges","southern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["delavan","south tazewell"],
    }
  ],
  specialized: [
    {
      id: 'bridge-freeflow',
      title: 'River-bridge freeflow to Peoria',
      intro: 'South/east collar pairs still peak hard toward Peoria.',
      bullets: ["Price portal-to-portal honestly.","Clarify Peoria second addresses for drive-time assumptions."],
    },
    {
      id: 'east-peoria-multi',
      title: 'East Peoria multi-family access',
      intro: 'Elevators and parking are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Retail-corridor peaks rewrite quiet unload assumptions."],
    },
    {
      id: 'pekin-seat',
      title: 'Pekin multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Tazewell families compare East Peoria, Pekin, Morton, Washington, and related district feeders — verify address boundaries; do not assume Peoria maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'OSF Saint Francis spillover, Pekin-area campuses, and Peoria specialty care serve the county; map peak bridge and I-74 times for ER access.',
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
    intro: 'Bridge freeflow, multi-family access, and HOA soft costs often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, lease ends, and winter bridge ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring â€“ early fall',
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
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Peoria County movers (parent contrast)',
        href: '/local-movers/illinois/peoria',
      },

    ],
  },
});
