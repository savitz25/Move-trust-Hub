import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * rock-island â€” IL Tier 2 Wave 1
 */
export const rockIslandCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'rock-island',
  hubTitle: 'Rock Island County Moving Intelligence Hub',
  eyebrow: 'Rock Island · Rock Island / Moline — Quad Cities IL',
  h1: 'Moving in Rock Island County: Moline, Rock Island & Quad Cities River Access',
  heroOpener:
    'Rock Island County is the Illinois side of the Quad Cities river metro — Rock Island multi-story and older stock, Moline multi-family and professional corridors, East Moline and Silvis edges, and freeflow on I-74 / I-280 that is not Chicago collar product with different labels. Expect Mississippi bridge freeflow, Iowa-adjacent interstate risk, and discontinuous river-town stock under one county. This guide is for people moving in Rock Island as independent Quad Cities — not Chicago defaults.',
  heroCredibility:
    'Quad Cities IL · Mississippi river metro · I-74 / I-280 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-74 · I-280 · I-88 · IL-5 · IL-92 · Avenue of the Cities',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent Quad Cities (vs Chicago / central IL defaults)',
    parentHref: '/local-movers/illinois/cook',
    title: 'Compared with independent Quad Cities (vs Chicago / central IL defaults)',
    intro:
      'Rock Island is independent Quad Cities river-metro product — not Chicago elevator density and not Peoria central IL river product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Chicago crews fight I-90/I-294 peaks. Rock Island pairs ride I-74, I-280, and river bridges — freer mid-day Quad Cities freeflow, still peak-heavy on Moline arterials and bridge windows into Iowa.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Chicago mixes high-rises and dense multi-family. Rock Island mixes river-town multi-story, Moline multi-unit, and Silvis/East Moline SFH — more continuous river-metro product, less continuous Chicago vertical density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'River-town streets need curb plans; multi-family elevators appear on Moline corridors; IA addresses flip authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Rock Island quotes often track Quad Cities secondary rates for multi-story access — bridge peaks and interstate legs can price above quiet inland driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Rock Island is independent Quad Cities IL — not Chicago or Peoria product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Rock Island County different',
    intro: 'River-bridge freeflow, Quad Cities multi-story, and IA interstate risk — not interchangeable Chicago boilerplate.',
    bullets: [
      {
        title: 'Mississippi bridge freeflow is still billable',
        detail:
          'Quad Cities pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Rock Island / Moline multi-story is first-class product',
        detail:
          'Stairs and curb plans need inventories different from pure SFH lots.',
      },
      {
        title: 'Iowa adjacency creates interstate legs',
        detail:
          'IA addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'Discontinuous river towns add empty miles',
        detail:
          'Silvis and rural edges fail when crews assume continuous Moline density.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Rock Island zones: Rock Island multi-story, Moline multi-family, East Moline/Silvis edges & rural lots',
  zonesIntro: 'Two to four sharp products — river multi-story, multi-family corridors, east edges, and rural lots.',
  zones: [
    {
      id: 'rock-island',
      name: 'Rock Island multi-story & older stock',
      shortName: 'Rock Island',
      neighborhoods: ["Rock Island","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Bridge freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["rock island"],
    },
    {
      id: 'moline',
      name: 'Moline multi-family & professional corridors',
      shortName: 'Moline',
      neighborhoods: ["Moline","Avenue of the Cities multi-family"],
      housingTypes: 'Multi-family, apartments, townhomes, SFH',
      challenges: ["Elevators","Parking limits","I-74 freeflow"],
      moverTips: 'Confirm elevator rules; build arterial buffers.',
      cityKeywords: ["moline"],
    },
    {
      id: 'east-moline',
      name: 'East Moline / Silvis edges',
      shortName: 'East Moline / Silvis',
      neighborhoods: ["East Moline","Silvis","edge multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["east moline","silvis"],
    },
    {
      id: 'rural-lots',
      name: 'Southern & rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["southern tracts","rural approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["south rock island"],
    }
  ],
  specialized: [
    {
      id: 'qc-bridges',
      title: 'Quad Cities bridge freeflow',
      intro: 'River pairs still peak hard; IA legs need FMCSA.',
      bullets: ["Price portal-to-portal honestly.","Clarify Iowa second addresses for interstate authority."],
    },
    {
      id: 'river-multi',
      title: 'Rock Island / Moline multi-story access',
      intro: 'Stairs and elevators are first-class cost drivers.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'ia-edge',
      title: 'Iowa-edge interstate module',
      intro: 'Short map miles can still be interstate jobs.',
      bullets: ["Match ICC vs FMCSA to exact addresses.","Do not recycle Chicago day rates for Quad Cities product."],
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
        intro: 'Rock Island families compare Rock Island, Moline-Coal Valley, East Moline, Silvis, and related district feeders — verify address boundaries.',
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
            detail: 'UnityPoint Health Quad Cities campuses and related specialty care serve the county; map peak bridge and I-74 times for ER access.',
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
    intro: 'Bridge freeflow, multi-story access, and interstate authority risk often matter more than raw miles.',
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
    intro: 'School years, lease ends, river flood windows, and winter ice reshape demand by pocket.',
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
        label: 'independent Quad Cities (vs Chicago / central IL defaults) movers (parent contrast)',
        href: '/local-movers/illinois/cook',
      },
      {
        label: 'Peoria County movers',
        href: '/local-movers/illinois/peoria',
      },
    ],
  },
});
