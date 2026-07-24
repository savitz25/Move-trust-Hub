import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

/**
 * Jefferson Parish, Louisiana — NOT Jefferson County AL, KY, or MO.
 * Metro New Orleans west/east bank suburbs (Metairie, Kenner, West Bank).
 */
export const jeffersonParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson Parish Moving Intelligence Hub',
  eyebrow: 'Jefferson Parish LA · Metairie, Kenner & West Bank (not Jefferson AL/KY/MO)',
  h1: 'Moving in Jefferson Parish: Metairie, Kenner, West Bank Access & Corridor Logistics',
  heroOpener:
    'Jefferson Parish, Louisiana is metro New Orleans’ primary suburban engine — Metairie and Kenner on the East Bank, West Bank communities across the river, and I-10 / I-310 / US-90 logistics that are not Orleans historic product. This page is Jefferson Parish LA only: it is not Jefferson County Alabama (Birmingham), not Jefferson County Kentucky (Louisville), and not Jefferson County Missouri (St. Louis collar). Multi-family along Veterans, HOA and SFH stock inland, airport-corridor timing near Kenner, and West Bank bridge approaches rewrite portal time. Humidity, flood elevation on mapped parcels, and hurricane-season contingency matter. A Metairie condo, a Kenner two-story, and a West Bank raised home do not share curb rules. This hub is for Jefferson Parish, Louisiana.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-310 · US-90 · LA-45',
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson Parish different',
    intro:
      'These are Jefferson Parish LA suburban and West Bank realities — not Orleans narrow-street defaults, not Northshore product, and not same-name Jefferson counties in other states.',
    bullets: [
      {
        title: 'Disambiguate: Jefferson Parish LA ≠ Jefferson AL / KY / MO',
        detail:
          'Movers and search results often collide on the name “Jefferson.” This hub covers Metairie, Kenner, Gretna, Harvey, Marrero, and related Louisiana communities only. Do not apply Birmingham, Louisville, or Missouri collar logistics here.',
      },
      {
        title: 'East Bank multi-family and Veterans corridor density',
        detail:
          'Metairie multi-unit, mid-rises, and arterial condos often mean elevators, tight lots, and peak congestion on Veterans and I-10. Survey parking and building rules block by block.',
      },
      {
        title: 'West Bank is not interchangeable with Metairie',
        detail:
          'Gretna, Harvey, Marrero, Westwego, and related stock add bridge approaches, different street grids, and raised-home pockets. Price river-crossing pairs portal-to-portal.',
      },
      {
        title: 'Airport and Kenner corridor timing',
        detail:
          'Louis Armstrong New Orleans International adjacency and I-10 / I-310 approaches create industrial traffic mix and peak delays that pure residential Metairie cul-de-sacs never see.',
      },
      {
        title: 'Flood elevation, humidity, and HOA rules reshape labor',
        detail:
          'Mapped flood risk, slab vs raised product, high humidity, and managed communities all change staging and hours. Collect HOA packets and note elevation on the survey.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Jefferson Parish access zones',
  zonesIntro:
    'Plan by Metairie / East Bank core, Kenner / airport corridor, West Bank communities, and river / LA-45 edges — each has its own access profile. Jefferson Parish LA only.',
  zones: [
    {
      id: 'metairie-eastbank',
      name: 'Metairie, Old Metairie & East Bank multi-unit',
      shortName: 'Metairie / East Bank',
      neighborhoods: [
        'Metairie',
        'Old Metairie',
        'Fat City edges',
        'Bissonet edges',
        'Veterans Boulevard corridor',
        'Causeway approaches',
      ],
      housingTypes:
        'Multi-family, mid-rises, condos, SFH, townhomes, mixed raised and slab product',
      challenges: [
        'Veterans / I-10 congestion',
        'Elevator and parking limits in multi-unit',
        'HOA and condo association rules',
        'Cross-parish pairs into Orleans',
      ],
      moverTips:
        'Photo curb and lot access for multi-unit jobs. Get association packets early. Price Metairie ↔ New Orleans pairs portal-to-portal on I-10.',
      cityKeywords: [
        'metairie',
        'old metairie',
        'fat city',
        'veterans',
        'jefferson parish',
      ],
    },
    {
      id: 'kenner-airport',
      name: 'Kenner, airport corridor & I-10 / I-310 edges',
      shortName: 'Kenner / airport',
      neighborhoods: [
        'Kenner',
        'Airport corridor',
        'Chateau edges',
        'Esplanade corridor edges',
        'I-10 service corridors',
        'River towns edges toward St. Charles',
      ],
      housingTypes: 'SFH, multi-family, HOA pockets, industrial-adjacent stock near airport logistics',
      challenges: [
        'Airport and freight traffic mix',
        'I-10 / I-310 portal time',
        'Flood-mapped parcels on some blocks',
        'Longer empty miles to West Bank or Orleans core',
      ],
      moverTips:
        'Avoid peak airport corridor congestion when flexible. Confirm driveway and fence access. Price Kenner ↔ West Bank pairs with bridge time included.',
      cityKeywords: ['kenner', 'airport', 'chateau', 'esplanade', 'louis armstrong'],
    },
    {
      id: 'westbank',
      name: 'West Bank: Gretna, Harvey, Marrero & Westwego',
      shortName: 'West Bank',
      neighborhoods: [
        'Gretna',
        'Harvey',
        'Marrero',
        'Westwego',
        'Terrytown',
        'Timberlane edges',
      ],
      housingTypes:
        'SFH, raised homes, multi-family, townhomes, mixed post-rebuild and older stock',
      challenges: [
        'Bridge and tunnel approach timing',
        'Raised foundations and stair carries',
        'US-90 / West Bank Expressway congestion',
        'Flood elevation variation by parcel',
      ],
      moverTips:
        'Survey stairs and elevation carefully. Price river-crossing pairs honestly. Prefer early starts to clear Expressway peaks.',
      cityKeywords: [
        'gretna',
        'harvey',
        'marrero',
        'westwego',
        'terrytown',
        'west bank',
      ],
    },
    {
      id: 'river-la45-edges',
      name: 'River ridge, Harahan, Elmwood & LA-45 corridors',
      shortName: 'River / LA-45',
      neighborhoods: [
        'River Ridge',
        'Harahan',
        'Elmwood',
        'Jefferson (community)',
        'Avondale edges',
        'LA-45 / Barataria corridors',
      ],
      housingTypes: 'SFH, multi-family, commercial-adjacent stock, HOA and older street grids',
      challenges: [
        'Mixed residential and commercial truck traffic',
        'Arterial congestion on US-90 / LA-45 approaches',
        'Humidity and storm staging',
        'Cross-zone pairs to Metairie or West Bank cores',
      ],
      moverTips:
        'Note commercial-adjacent access limits. Collect HOA packets where applicable. Clarify East Bank vs West Bank destinations on every estimate.',
      cityKeywords: [
        'river ridge',
        'harahan',
        'elmwood',
        'avondale',
        'barataria',
        'jefferson la',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jefferson Parish moving costs',
    intro:
      'Multi-unit access, West Bank bridge time, airport corridor congestion, and flood-elevation stairs drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'East Bank multi-unit elevators & parking',
        detail: 'Metairie condo and mid-rise labor hours spike with association rules.',
      },
      {
        title: 'West Bank bridge & Expressway portal time',
        detail: 'River-crossing pairs understate map miles at peak.',
      },
      {
        title: 'I-10 / I-310 / airport congestion',
        detail: 'Kenner and corridor jobs need honest empty-mile pricing.',
      },
      {
        title: 'Raised homes & flood-elevation access',
        detail: 'Stairs and outdoor staging on mapped parcels raise crew time.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$420–$1,500+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,900+', note: 'West Bank / multi-unit trends up' },
      { label: '3–4+ BR / cross-bank / cross-parish', value: '$2,500–$7,800+', note: 'Bridge and Orleans pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$185+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Jefferson Parish',
    intro:
      'Summer family peaks, multi-family lease turns, humidity and storms, and hurricane season reshape Jefferson Parish LA windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear Veterans / I-10 and West Bank Expressway peaks.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book suburban Saturdays early; humidity slows open staging.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Metairie elevators and association windows fill first.',
      },
      {
        title: 'Hurricane season contingency (roughly June–November)',
        detail: 'Build weather buffers; confirm tarps and reschedule terms on written estimates.',
      },
    ],
  },
  specialized: [
    {
      id: 'jefferson-la-metairie-kenner-westbank',
      title: 'Jefferson Parish LA: Metairie, Kenner & West Bank module',
      intro:
        'Jefferson Parish LA estimates fail when East Bank vs West Bank access, airport corridor time, or same-name out-of-state Jefferson confusion is ignored.',
      bullets: [
        'Confirm this is Jefferson Parish, Louisiana — not Jefferson County AL, KY, or MO.',
        'Photo multi-unit parking and elevator access on Metairie jobs; collect association packets.',
        'Price West Bank bridge / Expressway pairs portal-to-portal.',
        'Include I-10 / I-310 / airport corridor timing for Kenner-edge jobs.',
        'Note flood elevation and raised-home stairs on the survey when relevant.',
        'Clarify Jefferson vs Orleans destinations on multi-parish estimates.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jefferson Parish?',
    intro:
      'Use this as a practical fit checklist for Jefferson Parish, Louisiana — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Jefferson Parish Public School System serves most addresses; private and parochial options are common. Confirm zoning carefully — East Bank and West Bank patterns differ.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools and Louisiana Department of Education data beat ranking screenshots.',
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
              'East Jefferson General, West Jefferson Medical Center, Ochsner campuses, and other systems serve parish corridors. Confirm networks and East Bank vs West Bank campuses.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times including bridge approaches. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'East Bank multi-unit vs West Bank SFH stock',
            detail:
              'Metairie condos differ from Kenner two-stories and West Bank raised homes. Flood insurance and elevation vary parcel by parcel.',
          },
          {
            title: 'Cost variation',
            detail:
              'Veterans corridor and Old Metairie product often prices differently from outer West Bank or airport-edge stock.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Metairie / East Bank lifestyle',
            detail: 'Suburban density with multi-unit and arterial tradeoffs; quick I-10 access to Orleans.',
          },
          {
            title: 'Kenner / airport pattern',
            detail: 'SFH and logistics-adjacent living with corridor congestion.',
          },
          {
            title: 'West Bank pattern',
            detail: 'More raised-home and bridge-dependent commuting; different day-to-day feel from Metairie.',
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
              'Healthcare, airport and logistics, retail and professional services, and cross-parish New Orleans employment shape commutes.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-310, Causeway approaches, and West Bank bridges define peak reality. Test drive your actual pair.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Jefferson Parish LA identity',
            detail:
              'Metro New Orleans suburb and West Bank living — not Orleans historic core, not Northshore, and not Jefferson counties in other states.',
          },
          {
            title: 'Climate & flood awareness',
            detail:
              'Hot humid summers, heavy rain, and hurricane season. Know elevation and evacuation routes for your parcel.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits. Jefferson Parish, Louisiana only.',
    items: [
      {
        label: 'Jefferson Parish, Louisiana — official site',
        href: 'https://www.jeffparish.net/',
        external: true,
      },
      {
        label: 'Louisiana DOTD traffic',
        href: 'https://wwwsp.dotd.la.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer East Bank multi-unit and West Bank bridge experience with honest I-10/I-310 pricing. Confirm Jefferson Parish LA (not AL/KY/MO). Verify LPSC HHG common carrier certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
