import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Sussex — NJ Tier 2 Wave 1 · Newton / northwest · parent Morris */
export const sussexCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'sussex',
  hubTitle: 'Sussex County Moving Intelligence Hub',
  eyebrow: 'Sussex · northwest lakes/hills · vs Morris',
  h1: 'Moving in Sussex County: Newton, Sparta Lakes & Route 15/206 Northwest Access',
  heroOpener:
    'Sussex is New Jersey’s northwest highlands — Newton as a service hub, Sparta and lake associations, Vernon recreation belts, and western rural roads. Compared with Morris’s Morristown/Parsippany corporate HOAs and high-value cul-de-sacs, Sussex jobs skew steep grades, winter ice, lake association truck limits, and longer empty miles from denser crew bases. This guide is for people moving in Sussex as lower-density last-mile product — not a Morris rename.',
  heroCredibility:
    'Lakes & hills · Lower density last-mile · Winter readiness · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'Route 15 · Route 206 · Route 23 · Route 94 · I-80 (south approaches)',
  parentCompare: {
    parentLabel: 'Morris County',
    parentHref: '/local-movers/new-jersey/morris',
    title: 'Compared with Morris County',
    intro:
      'Sussex is northwest lakes and hills with thinner local crew coverage — not Morristown historic cores or Parsippany corporate parks with a different nameplate.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Morris crews fight I-80 / I-287 / Route 10 peaks around employment centers. Sussex pairs ride Routes 15, 206, 23, and 94 with longer empty miles — freer mid-day than Parsippany, still winter- and grade-constrained on lake and ridge approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Morris skews affluent SFH, planned HOAs, and historic multi-story. Sussex mixes lake association homes, hillside chalets, small downtown multi-story, and western farm-edge lots — more grade and weather risk, less continuous HOA elevator product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Morris defaults to HOA COIs and driveway staging. Sussex defaults to association truck-length limits on lakes, steep-drive shuttles, soft shoulders after thaw, and travel minimums when crews stage from denser counties.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Sussex quotes can match or exceed dense Morris rates for comparable square footage when grade shuttles and travel minimums apply — even when density looks “easier.”',
      },
      {
        title: 'Role difference',
        detail:
          'Sussex is northwest lower-density last-mile living — not Morris’s corporate/historic suburb engine. Match crews to grades, lake rules, and winter contingency plans.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sussex County different',
    intro: 'Terrain and weather are first-class inputs — not footnotes.',
    bullets: [
      {
        title: 'Steep and winding approaches',
        detail:
          'Lake and ridge addresses may need smaller trucks or hand-carry segments. Photos of the hill beat a vague “long driveway” note.',
      },
      {
        title: 'Lake community rules',
        detail:
          'Private associations may limit truck size, hours, and path use. Get written rules before move day.',
      },
      {
        title: 'Winter is operational',
        detail:
          'Snow and ice on grades can cancel morning loads. Build flexibility into December–March closings.',
      },
      {
        title: 'Labor travel time',
        detail:
          'Regional crews may travel farther than in Morris — travel minimums are common and legitimate.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Sussex zones: Sparta lakes, Newton hub, Vernon recreation & western rural',
  zonesIntro: 'Lake shores, ridge homes, and town centers need different equipment.',
  zones: [
    {
      id: 'sparta-lakes',
      name: 'Sparta & lake communities',
      shortName: 'Sparta / lakes',
      neighborhoods: ['Sparta', 'Lake Mohawk area', 'nearby lake associations'],
      housingTypes: 'Lake homes, colonials, association properties',
      challenges: ['Association rules', 'Steep drives', 'Summer lake traffic'],
      moverTips: 'Confirm truck length limits at the association office.',
      cityKeywords: ['sparta', 'lake mohawk', 'mohawk'],
    },
    {
      id: 'newton-hub',
      name: 'Newton hub',
      shortName: 'Newton',
      neighborhoods: ['Newton', 'nearby borough approaches'],
      housingTypes: 'Older town homes, small multifamily',
      challenges: ['Downtown parking', 'Older stairs'],
      moverTips: 'Stage on wider side streets; protect plaster in older interiors.',
      cityKeywords: ['newton'],
    },
    {
      id: 'vernon-north',
      name: 'Vernon & northern recreation belt',
      shortName: 'Vernon',
      neighborhoods: ['Vernon', 'recreation/resort-adjacent areas'],
      housingTypes: 'Chalets, hillside homes, seasonal properties',
      challenges: ['Grades', 'Seasonal congestion', 'Weather cancellations'],
      moverTips: 'Avoid holiday recreation weekends for hillside deliveries.',
      cityKeywords: ['vernon'],
    },
    {
      id: 'west-rural',
      name: 'Western rural edges',
      shortName: 'West rural',
      neighborhoods: ['Stillwater', 'western township roads'],
      housingTypes: 'Farms, long-lot homes, outbuildings',
      challenges: ['Distance', 'Unpaved access', 'Cell gaps'],
      moverTips: 'Print gate codes; do not rely solely on phone GPS in valleys.',
      cityKeywords: ['stillwater'],
    },
  ],
  specialized: [
    {
      id: 'lake-mountain',
      title: 'Lake & mountain access module',
      intro: 'Waterfront and ridge properties share “last 500 feet” risk.',
      bullets: [
        'Ask about shuttle from the main road if the drive is steep or soft.',
        'In winter, require a go/no-go weather call by 6 a.m.',
        'List docks, kayaks, and outdoor equipment so they are not forgotten.',
      ],
    },
    {
      id: 'travel-minimums',
      title: 'Regional travel minimums module',
      intro: 'Thinner local coverage means crews often stage from denser counties.',
      bullets: [
        'Clarify travel fees before comparing hourly rates.',
        'Ask about local storage options if closings slip.',
      ],
    },
    {
      id: 'winter-grades',
      title: 'Winter grade module',
      intro: 'Northwest NJ winters cancel more morning loads than Central Jersey suburbs.',
      bullets: [
        'Build flexible date language into winter closings.',
        'Salt and runners on north-facing stairs should be in the plan.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Sussex districts are local/regional (including systems serving Sparta, Newton, Vernon, and other municipalities).',
        bullets: [
          {
            title: 'Match every address',
            detail:
              'Use NJ DOE performance reports and district conversations — smaller systems can differ in program breadth from Morris suburbs.',
          },
          {
            title: 'Longer bus rides',
            detail:
              'Rural addresses can mean longer school transport times — ask if that matters for your family.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Newton Medical Center area',
            detail:
              'Primary local hospital resource for much of the county; confirm specialty availability.',
          },
          {
            title: 'Travel for complex care',
            detail:
              'Some residents travel toward Morristown or other regional centers — include that in lifestyle math.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Sussex County',
    intro: 'Travel time and access complexity often exceed “miles on the map.”',
    drivers: [
      {
        title: 'Travel minimums',
        detail: 'Regional crews price distance to base.',
      },
      {
        title: 'Shuttle on grades',
        detail: 'Common for lake/ridge homes.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$900+' },
      { label: 'Family / lake home', value: '$1,600–$3,400+' },
      { label: '2-person crew', value: '$100–$150+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'True winter logistics dominate more than in denser North Jersey suburbs.',
    items: [
      {
        title: 'Nov–March',
        detail: 'Snow/ice risk on grades; keep a flexible closing addendum if possible.',
      },
      {
        title: 'Summer lake season',
        detail: 'More traffic and association sensitivity around peak recreation weekends.',
      },
    ],
  },
  resources: {
    title: 'Useful Sussex County resources',
    items: [
      {
        label: 'Sussex County',
        href: 'https://www.sussex.nj.us/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Morris County guide (parent contrast)',
        href: '/local-movers/new-jersey/morris',
      },
      {
        label: 'Directory: Sussex filter',
        href: '/companies?coverage=state&state=NJ&counties=sussex',
      },
    ],
  },
  directoryHint:
    'Prioritize crews comfortable with grades, lake associations, and winter contingency plans.',
  lastReviewed: '2026-07-22',
});
