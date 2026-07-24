import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Racine County, WI — mid-size lake city between Milwaukee and Kenosha (not Milwaukee south clone, not Kenosha IL collar).
 */
export const racineCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'racine',
  hubTitle: 'Racine County Moving Intelligence Hub',
  eyebrow: 'Racine · Mid-size lake city stock, Root River access & I-94 logistics',
  h1: 'Moving in Racine County: Lake City Access, Mid-Size Urban Stock & I-94 Corridors',
  heroOpener:
    'Racine County is not a Milwaukee neighborhood clone and not a Kenosha Chicago-collar template — it is a mid-size Lake Michigan city with older multi-unit and bungalow stock, Mount Pleasant and Caledonia multi-family growth, and I-94 freeflow between Milwaukee and the Illinois border that rewrites “local” estimates. A downtown Racine walk-up, a lakeshore condo, a Mount Pleasant townhome, and a Burlington western approach do not share truck access or empty-mile cost. Winter lake-effect ice is a real input. This hub is for people moving in Racine County — not a renamed Milwaukee or Kenosha page.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Racine lake-city logistics awareness · Curated listings',
  majorCorridors: 'I-94 · WI-20 · WI-31 · WI-32 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Racine County different',
    intro:
      'These are mid-size lake-city realities — older multi-unit, I-94 staging between two larger markets, and lakeshore access — not Milwaukee East Side density or Kenosha Illinois-commute product alone.',
    bullets: [
      {
        title: 'Older multi-unit and bungalow stock rewrite labor in Racine city',
        detail:
          'Stairs, basements, and tight curb fail estimates more often than packing skill alone.',
      },
      {
        title: 'I-94 pairs to Milwaukee or Kenosha burn portal time',
        detail:
          'Looks local on maps; peak freeflow is a real billable factor. Price portal-to-portal honestly.',
      },
      {
        title: 'Mount Pleasant multi-family is not downtown Racine product',
        detail:
          'HOA townhomes and elevators differ from lakeshore walk-ups a few miles away.',
      },
      {
        title: 'Western Burlington and rural edges mean longer empty miles',
        detail:
          'Do not price western approaches like city multi-unit hops.',
      },
      {
        title: 'Winter lake-effect ice reshapes outdoor carries',
        detail:
          'December–March adds cancellation risk — flexible dates reduce soft costs.',
      },
      {
        title: 'Multi-county southeast pairs are routine',
        detail:
          'Households regularly move Racine ↔ Milwaukee, Kenosha, or Waukesha. Clarify destinations so Wisconsin consumer controls vs FMCSA assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Racine County access zones',
  zonesIntro:
    'Plan by downtown Racine multi-unit, lakeshore residential, Mount Pleasant multi-family, Caledonia northern edges, and western Burlington belts.',
  zones: [
    {
      id: 'downtown-racine',
      name: 'Downtown Racine multi-unit & near-core stock',
      shortName: 'Downtown Racine',
      neighborhoods: [
        'Downtown Racine',
        'Uptown edges',
        'Historic districts',
        'State Street corridors',
        'Root River edges',
        'Monument Square edges',
      ],
      housingTypes: 'Multi-unit, older SFH, limited elevators',
      challenges: [
        'Stairs and tight curb',
        'WI-32 freeflow',
        'Winter ice',
      ],
      moverTips:
        'Survey stairs carefully. Prefer mid-week starts. Photo curb options.',
      cityKeywords: [
        'racine',
      ],
    },
    {
      id: 'lakeshore',
      name: 'Lakeshore residential & condo stock',
      shortName: 'Lakeshore',
      neighborhoods: [
        'North Beach edges',
        'South lakeshore',
        'Zoo area edges',
        'Lakeview corridors',
        'Wind Point edges',
        'North Bay edges',
      ],
      housingTypes: 'Condos, SFH, multi-unit',
      challenges: [
        'Lakeshore staging',
        'Elevator multi-unit where present',
        'Lake-effect weather',
      ],
      moverTips:
        'Book elevators early on condo product. Plan winter ice contingency. Prefer mid-week starts.',
      cityKeywords: [
        'racine',
        'wind point',
        'north bay',
      ],
    },
    {
      id: 'mount-pleasant',
      name: 'Mount Pleasant multi-family & growth',
      shortName: 'Mount Pleasant',
      neighborhoods: [
        'Mount Pleasant',
        'I-94 edges',
        'Staubli corridors',
        'Village multi-family',
        'Elmwood edges',
        'Hoods Creek edges',
      ],
      housingTypes: 'Townhomes, multi-family, growth SFH',
      challenges: [
        'HOA timed windows',
        'I-94 freeflow',
        'Empty miles vs city core',
      ],
      moverTips:
        'Collect HOA packets early. Price I-94 honestly. Do not price Mount Pleasant like downtown walk-ups.',
      cityKeywords: [
        'mount pleasant',
      ],
    },
    {
      id: 'caledonia-north',
      name: 'Caledonia & northern Racine edges',
      shortName: 'Caledonia',
      neighborhoods: [
        'Caledonia',
        'Franksville edges',
        'Tabor edges',
        'Four Mile edges',
        'Raymond edges',
        'Oak Creek border edges',
      ],
      housingTypes: 'SFH, multi-family, rural-edge lots',
      challenges: [
        'I-94 freeflow',
        'Longer empty miles',
        'Winter driveway ice',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveways. Clarify Racine vs Milwaukee county borders.',
      cityKeywords: [
        'caledonia',
        'franksville',
        'raymond',
      ],
    },
    {
      id: 'burlington-west',
      name: 'Burlington & western Racine County',
      shortName: 'Burlington / west',
      neighborhoods: [
        'Burlington',
        'Waterford edges',
        'Rochester edges',
        'Union Grove edges',
        'Yorkville edges',
        'Dover edges',
      ],
      housingTypes: 'Small-city multi-unit, SFH, rural-edge lots',
      challenges: [
        'WI-20 / WI-36 empty miles',
        'Mixed product',
        'School-calendar peaks',
      ],
      moverTips:
        'Price empty miles honestly. Survey small-city stairs. Book peak school windows early.',
      cityKeywords: [
        'burlington',
        'waterford',
        'rochester',
        'union grove',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Racine County moving costs',
    intro:
      'Older multi-unit access, I-94 freeflow, HOA growth, and winter ice move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Near-core stairs & multi-unit access',
        detail:
          'Racine city walk-ups add labor before packing skill matters.',
      },
      {
        title: 'I-94 portal time to Milwaukee / Kenosha',
        detail:
          'Mid-corridor pairs burn portal-to-portal hours.',
      },
      {
        title: 'Mount Pleasant HOA admin',
        detail:
          'Multi-family soft costs trend up vs bungalow stock.',
      },
      {
        title: 'Western empty miles',
        detail:
          'Burlington pairs raise staging distance.',
      },
      {
        title: 'Winter lake-effect ice',
        detail:
          'December–March reshapes outdoor labor and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with stairs or peak I-94 pairs',
      },
      {
        label: '2–3BR multi-unit or townhome',
        value: '$1,300–$4,000+',
        note: 'Stairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / long I-94 pair',
        value: '$2,500–$7,500+',
        note: 'Empty miles and high-value stock price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal; packing and access scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Racine County move',
    intro:
      'School calendars, I-94 freeflow, winter lake-effect ice, and multi-unit lease waves reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and ease I-94 pain.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family and multi-unit turnover fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Winter: lake-effect ice and weather cancellations',
        detail:
          'December–March favors flexible dates and early starts.',
      },
      {
        title: 'School-year mid-month spikes',
        detail:
          'Family relocations often land around school calendars rather than only Saturday peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'racine-lake-city',
      title: 'Racine mid-size lake city logistics module',
      intro:
        'Racine estimates fail more often on stair surveys, I-94 freeflow, and winter ice than on packing skill alone.',
      bullets: [
        'Survey downtown stairs separately from Mount Pleasant HOA multi-family.',
        'Price portal-to-portal time for I-94, WI-20, WI-31, and WI-32 pairs at peak.',
        'Plan winter lake-effect ice contingency on outdoor carries.',
        'Clarify Racine city vs Mount Pleasant vs Caledonia vs Burlington addresses on every estimate.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-mke-not-kenosha',
      title: 'Between Milwaukee and Kenosha micro-market module',
      intro:
        'A single “southeast rate” collapses when Racine mid-size product and Milwaukee or Kenosha products diverge.',
      bullets: [
        'Do not price Racine walk-ups like Milwaukee East Side or Kenosha Chicago-collar multi-family as interchangeable.',
        'Ask which I-94 approaches the crew will actually use northbound vs southbound.',
        'Keep Racine vs Milwaukee / Kenosha county lines clear on multi-address estimates.',
        'Match lakeshore condo inventories to elevator-experienced crews when applicable.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Racine County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Racine Unified and neighboring districts (including Mount Pleasant area options, Burlington, Waterford, and others) serve the county. Assignment is address-based.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Wisconsin DPI data, and campus visits beat ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Ascension and Advocate Aurora community campuses, plus Milwaukee specialty care, serve Racine County. Confirm insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — freeway freeflow changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect older multi-unit and bungalows in Racine city; lakeshore condos; multi-family in Mount Pleasant; SFH and rural-edge stock west and north.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / lakeshore multi-unit',
            detail:
              'Suits people prioritizing lake adjacency and mid-size city amenities — with stairs and winter staging tradeoffs.',
          },
          {
            title: 'Mount Pleasant multi-family',
            detail:
              'Often appeals for newer multi-unit — with HOA logistics and I-94 freeflow.',
          },
          {
            title: 'Caledonia northern edges',
            detail:
              'Attracts households seeking space toward Milwaukee — with empty-mile tradeoffs.',
          },
          {
            title: 'Burlington western small-city living',
            detail:
              'Fits buyers chasing quieter edges — with longer staging into the lake city core.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Manufacturing, logistics along I-94, healthcare, education, and reverse-commutes to Milwaukee or Kenosha concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Racine is a mid-size lake city between two larger markets — different from Milwaukee density, Kenosha Illinois-border logistics, and Waukesha west-metro HOAs.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with cold winters, lake-effect snow near Lake Michigan, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, winter weather, and local events reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Racine County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
    items: [
      {
        label: 'City of Racine — official site',
        href: 'https://www.cityofracine.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Racine County',
        href: 'https://www.racinecounty.com/',
        external: true,
        note: 'County services & info',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'I-94 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with mid-size multi-unit stair fluency for Racine city product; HOA readiness for Mount Pleasant; honest I-94 · WI-20 · WI-31 · WI-32 timing. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
