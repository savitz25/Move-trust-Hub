import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

export const stTammanyParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'st-tammany',
  hubTitle: 'St. Tammany Parish Moving Intelligence Hub',
  eyebrow: 'St. Tammany · Northshore Slidell, Mandeville, Covington & I-12 logistics',
  h1: 'Moving in St. Tammany Parish: Northshore Towns, Causeway Approaches & Corridor Logistics',
  heroOpener:
    'St. Tammany Parish is the Northshore — Slidell, Mandeville, Covington, and growth corridors along I-12 — not Orleans historic product and not Jefferson East Bank multi-unit defaults. Lake Pontchartrain Causeway and I-10/I-12 approaches rewrite portal time to metro New Orleans; inland HOA and pine-belt SFH stock differ from lakefront and older town cores. Humidity, flood-mapped pockets near the lake and rivers, and hurricane-season contingency are real. A Slidell two-story, a Mandeville lakefront home, and a Covington downtown multi-unit do not share truck access. This hub is for St. Tammany Parish Northshore living — not a renamed Jefferson or Orleans page.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-12 · I-10 · US-190 · LA-21',
  whatMakesDifferent: {
    title: 'What makes moving in St. Tammany Parish different',
    intro:
      'These are Northshore realities — multi-town suburban growth, Causeway and I-12 timing, and lake/river edges — not New Orleans core or West Bank product.',
    bullets: [
      {
        title: 'Three primary town markets under one parish label',
        detail:
          'Slidell, Mandeville, and Covington are not interchangeable. Each has different curb rules, growth edges, and portal time to the Causeway or I-10. Name origin and destination towns on every estimate.',
      },
      {
        title: 'Causeway and I-12 define “local” vs regional jobs',
        detail:
          'Northshore ↔ Southshore pairs look simple on maps and long at peak. Price Causeway, I-10 Slidell, and I-12 cross-parish empty miles honestly — do not treat them as in-town Metairie hops.',
      },
      {
        title: 'HOA growth corridors dominate newer stock',
        detail:
          'Planned communities inland and along US-190 / LA-21 corridors enforce gate lists, COI, and approved hours. Collect management rules before locking a Saturday crew in peak season.',
      },
      {
        title: 'Lakefront, river, and flood-mapped parcels change staging',
        detail:
          'Mandeville and lake-edge product, river corridors near Covington, and flood-aware elevation notes affect driveway slope, raised entries, and weather contingency. Survey outdoor staging carefully.',
      },
      {
        title: 'Humidity and storm season slow open carries',
        detail:
          'Hot humid summers and afternoon storms are operational inputs. Early starts outperform noon load-outs; hurricane season needs written reschedule clarity.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'St. Tammany Parish access zones',
  zonesIntro:
    'Plan by Slidell / I-10 east, Mandeville / Causeway, Covington / LA-21 core, and western growth edges — each has its own access and traffic profile.',
  zones: [
    {
      id: 'slidell-i10',
      name: 'Slidell, Eden Isle edges & I-10 east approaches',
      shortName: 'Slidell / I-10',
      neighborhoods: [
        'Slidell',
        'Olde Towne Slidell edges',
        'Eden Isle edges',
        'North Shore Beach edges',
        'I-10 service corridors',
        'Pearl River-direction edges',
      ],
      housingTypes:
        'SFH, multi-family, HOA communities, some water-adjacent and raised product',
      challenges: [
        'I-10 congestion and interstate-adjacent traffic',
        'Flood-mapped and water-edge parcels',
        'HOA rules in planned pockets',
        'Longer portal time to Covington or Southshore',
      ],
      moverTips:
        'Price I-10 pairs portal-to-portal. Note elevation and driveway access on water-edge jobs. Collect HOA packets for gated communities.',
      cityKeywords: [
        'slidell',
        'eden isle',
        'pearl river',
        'north shore',
        'st tammany',
      ],
    },
    {
      id: 'mandeville-causeway',
      name: 'Mandeville, Causeway approaches & lakefront edges',
      shortName: 'Mandeville / Causeway',
      neighborhoods: [
        'Mandeville',
        'Old Mandeville',
        'Causeway approaches',
        'Lakefront edges',
        'Lewisburg edges',
        'US-190 corridor edges',
      ],
      housingTypes:
        'SFH, some multi-family, lakefront and raised homes, townhomes, HOA growth stock',
      challenges: [
        'Causeway peak timing to Southshore',
        'Lakefront access and elevation notes',
        'US-190 congestion',
        'High-value contents on some lakefront inventories',
      ],
      moverTips:
        'Prefer early starts for Causeway-bound pairs. Survey stairs and water-edge staging. Discuss valuation for higher-value lakefront inventories.',
      cityKeywords: [
        'mandeville',
        'causeway',
        'old mandeville',
        'lewisburg',
        'lakefront',
      ],
    },
    {
      id: 'covington-la21',
      name: 'Covington, Abita edges & LA-21 / US-190 core',
      shortName: 'Covington / LA-21',
      neighborhoods: [
        'Covington',
        'Downtown Covington',
        'Abita Springs edges',
        'US-190 corridor',
        'LA-21 corridor',
        'River corridor edges',
      ],
      housingTypes:
        'Older town SFH and multi-unit, suburban SFH, HOA communities, mixed historic and growth stock',
      challenges: [
        'Downtown curb limits and older street grids',
        'LA-21 / US-190 arterial peaks',
        'River-adjacent flood notes on some parcels',
        'Cross-zone pairs to Slidell or Mandeville',
      ],
      moverTips:
        'Photo downtown staging and stair access. Price Covington ↔ Slidell pairs on I-12 honestly. Confirm HOA rules on growth-edge stock.',
      cityKeywords: [
        'covington',
        'abita',
        'abita springs',
        'la-21',
        'us-190',
      ],
    },
    {
      id: 'west-growth',
      name: 'Madisonville, Lacombe & western / central growth edges',
      shortName: 'West / growth',
      neighborhoods: [
        'Madisonville',
        'Lacombe',
        'Folsom edges',
        'Bush edges',
        'Central St. Tammany growth',
        'I-12 western exits',
      ],
      housingTypes: 'Suburban SFH, HOA villages, rural-edge acreage pockets, multi-family along arterials',
      challenges: [
        'Longer empty miles between towns',
        'Rural driveway and gate access',
        'I-12 portal time across the parish',
        'Humidity and storm staging on open lots',
      ],
      moverTips:
        'Survey long drives and gate codes. Price multi-town parish pairs portal-to-portal. Build weather contingency for open-lot staging.',
      cityKeywords: [
        'madisonville',
        'lacombe',
        'folsom',
        'bush',
        'st tammany growth',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives St. Tammany Parish moving costs',
    intro:
      'Multi-town distances, Causeway/I-12 portal time, HOA access, and water-edge elevation drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Causeway & I-12 / I-10 portal time',
        detail: 'Northshore ↔ Southshore and cross-town pairs spike empty miles.',
      },
      {
        title: 'HOA gate lists & restricted hours',
        detail: 'Growth communities add coordination cost on peak Saturdays.',
      },
      {
        title: 'Lakefront / raised-home stairs',
        detail: 'Water-edge and elevated stock rewrites labor hours.',
      },
      {
        title: 'Multi-town rural-edge drives',
        detail: 'Longer parish-internal pairs understate map simplicity.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,400+', note: 'Higher with HOA or stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,700+', note: 'Cross-town pairs trend up' },
      { label: '3–4+ BR / lakefront / Southshore pair', value: '$2,400–$7,800+', note: 'Causeway and large homes highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in St. Tammany Parish',
    intro:
      'Summer family peaks, HOA Saturday demand, humidity and storms, and hurricane season reshape Northshore windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear Causeway / I-12 peaks and HOA curb competition.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book growth-corridor Saturdays early; heat slows open staging.',
      },
      {
        title: 'Month-end multi-family and HOA turns',
        detail: 'Association windows fill first near Mandeville and Slidell corridors.',
      },
      {
        title: 'Hurricane season contingency (roughly June–November)',
        detail: 'Build weather buffers; confirm reschedule terms on written estimates.',
      },
    ],
  },
  specialized: [
    {
      id: 'st-tammany-northshore-causeway-i12',
      title: 'Northshore towns, Causeway & I-12 module',
      intro:
        'St. Tammany estimates fail when multi-town distances, Causeway timing, HOA rules, or water-edge access are ignored.',
      bullets: [
        'Name origin and destination towns (Slidell / Mandeville / Covington / other) on every estimate.',
        'Price Causeway, I-10, I-12, US-190, and LA-21 pairs portal-to-portal.',
        'Collect HOA packets for gated growth communities.',
        'Survey lakefront elevation, stairs, and outdoor staging on water-edge jobs.',
        'Build humidity and storm contingency into summer schedules.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to St. Tammany Parish?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'St. Tammany Parish Public Schools serves most addresses across Slidell, Mandeville, Covington, and growth edges. Confirm zoning carefully when towns sit close together.',
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
              'St. Tammany Health System, Slidell Memorial, Ochsner-affiliated Northshore campuses, and other facilities serve parish corridors. Confirm networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times including Causeway and I-12 segments if you work Southshore. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Lakefront and town-core vs inland HOA growth',
            detail:
              'Old Mandeville and Covington cores differ from planned communities and Slidell suburban stock. Flood insurance varies by parcel.',
          },
          {
            title: 'Cost variation',
            detail:
              'Causeway-proximate and water-edge product often prices differently from western rural-edge acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Slidell pattern',
            detail: 'I-10 access, suburban SFH/HOA mix, and eastern Northshore logistics.',
          },
          {
            title: 'Mandeville / Causeway pattern',
            detail: 'Lakefront lifestyle with Southshore commute tradeoffs.',
          },
          {
            title: 'Covington / western pattern',
            detail: 'Town-core character and inland growth with LA-21 / US-190 daily rhythm.',
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
              'Healthcare, professional services, retail, parish government, and large Southshore commute flows shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Causeway, I-12, and I-10 peaks are real. Test drive peak routes before committing to a Southshore job from the Northshore.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northshore identity',
            detail:
              'St. Tammany is Northshore suburban and small-city living — not Orleans historic core or Jefferson West Bank defaults.',
          },
          {
            title: 'Climate & flood awareness',
            detail:
              'Hot humid summers, lake-effect storms, and hurricane season. Know elevation and evacuation routes for your parcel.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful St. Tammany Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'St. Tammany Parish — official site',
        href: 'https://www.stpgov.org/',
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
    'Prefer multi-town Northshore, HOA, and Causeway/I-12 pricing experience. Verify LPSC HHG common carrier certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
