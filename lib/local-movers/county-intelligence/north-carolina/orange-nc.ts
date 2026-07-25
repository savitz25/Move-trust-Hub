import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * orange — NC Tier 2 Wave 1
 */
export const orangeCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'orange',
  hubTitle: 'Orange County Moving Intelligence Hub',
  eyebrow: 'Orange · Chapel Hill / Carrboro / Hillsborough — Triangle',
  h1: 'Moving in Orange County: Chapel Hill, Carrboro & University Triangle Access',
  heroOpener:
    'Orange County is Triangle university-town product — Chapel Hill multi-story and near-campus density, Carrboro multi-family and older stock, Hillsborough seat edges, and freeflow on US-15-501 / I-40 that is not Durham research elevators or Raleigh capital towers with different labels. Expect term calendars, student multi-family COIs, and hill/stair access under one county. This guide is for people moving in Orange as Chapel Hill university Triangle — not a Durham rename.',
  heroCredibility:
    'Chapel Hill university Triangle · Term calendars · Carrboro density · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · US-15-501 · NC-54 · NC-86 · Franklin Street corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Durham County',
    parentHref: '/local-movers/north-carolina/durham',
    title: 'Compared with Durham County',
    intro:
      'Orange is Chapel Hill / Carrboro university-town density — not Durham research-core elevators alone and not Wake capital multi-family.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Durham crews fight NC-147 and I-85 research peaks. Orange pairs ride US-15-501, NC-54, and I-40 links — freer mid-day toward Hillsborough, still peak-heavy on Franklin Street and campus windows. Portal-to-portal time is real; it is not a pure RTP office day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Durham mixes adaptive-reuse elevators and Southpoint multi-family. Orange mixes near-campus multi-story, Carrboro older multi-unit, and Hillsborough SFH — more university-town product, less continuous research-corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus-adjacent streets need curb plans and temporary no-parking; HOA packets appear on outer edges; term weekends rewrite staging.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Orange quotes often track Triangle secondary-premium rates for multi-story access — term peaks and stairs push prices above quiet Hillsborough driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Orange is Chapel Hill university Triangle — not Durham or Wake core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Orange County different',
    intro: 'University term calendars, near-campus multi-story, and 15-501 freeflow — not interchangeable Durham boilerplate.',
    bullets: [
      {
        title: 'UNC term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill crews and parking near campus. Book early.',
      },
      {
        title: 'Near-campus multi-story is first-class product',
        detail:
          'Stairs, elevators, and COIs need inventories different from pure SFH lots.',
      },
      {
        title: 'Carrboro density differs from Hillsborough seat stock',
        detail:
          'Tight older streets rewrite truck type assumptions.',
      },
      {
        title: 'US-15-501 / I-40 freeflow is still billable',
        detail:
          'Orange ↔ Durham pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Orange zones: Chapel Hill campus edge, Carrboro multi-unit, Hillsborough seat & rural edges',
  zonesIntro: 'Two to four sharp products — campus multi-story, Carrboro density, seat stock, and rural edges.',
  zones: [
    {
      id: 'chapel-hill',
      name: 'Chapel Hill campus-edge multi-story',
      shortName: 'Chapel Hill',
      neighborhoods: ["Chapel Hill","Franklin corridor","near-campus multi-family"],
      housingTypes: 'Multi-story, multi-unit, some SFH',
      challenges: ["Stairs/elevators","Term parking","COI packets"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["chapel hill"],
    },
    {
      id: 'carrboro',
      name: 'Carrboro multi-unit & older stock',
      shortName: 'Carrboro',
      neighborhoods: ["Carrboro","older multi-family","mixed SFH"],
      housingTypes: 'Multi-unit, older SFH, townhomes',
      challenges: ["Tight streets","Street parking","Mixed curb"],
      moverTips: 'Photo curb width; inventory stairs.',
      cityKeywords: ["carrboro"],
    },
    {
      id: 'hillsborough',
      name: 'Hillsborough seat & western edges',
      shortName: 'Hillsborough',
      neighborhoods: ["Hillsborough","seat multi-family","western SFH"],
      housingTypes: 'SFH, multi-unit, mixed stock',
      challenges: ["Arterial timing","I-40 freeflow"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["hillsborough"],
    },
    {
      id: 'rural-edge',
      name: 'Northern & western rural edges',
      shortName: 'Rural edge',
      neighborhoods: ["northern tracts","Efland edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; prefer early starts for long pairs.',
      cityKeywords: ["efland","north orange"],
    }
  ],
  specialized: [
    {
      id: 'unc-terms',
      title: 'UNC / university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'campus-multi',
      title: 'Near-campus multi-story access',
      intro: 'Elevators and stairs are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Temporary no-parking often beats long carries."],
    },
    {
      id: '15501-freeflow',
      title: 'US-15-501 / I-40 freeflow',
      intro: 'Triangle pairs still peak hard toward Durham and Wake.',
      bullets: ["Price portal-to-portal honestly.","Clarify Durham or Wake second addresses early."],
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
        intro: 'Orange families compare Chapel Hill-Carrboro City Schools and Orange County Schools feeders — verify address boundaries; do not assume Durham or Wake maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'UNC Medical Center and related campuses anchor acute care; map peak campus and 15-501 times for ER access.',
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
    intro: 'Term peaks, multi-story access, and 15-501 freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'University calendars, school years, and summer family closings reshape demand more than pure corporate Triangle patterns.',
    items: [
      {
        title: 'Late spring – early fall',
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
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Durham County movers (parent contrast)',
        href: '/local-movers/north-carolina/durham',
      },
      {
        label: 'Wake County movers',
        href: '/local-movers/north-carolina/wake',
      },
    ],
  },
});
