import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeLaPack } from '@/lib/local-movers/county-intelligence/louisiana/la-shared';

export const orleansParishLaIntelligence: CountyIntelligencePack = finalizeLaPack({
  countySlug: 'orleans',
  hubTitle: 'Orleans Parish Moving Intelligence Hub',
  eyebrow: 'Orleans · New Orleans neighborhoods, historic access & I-10 / I-610 grid',
  h1: 'Moving in Orleans Parish: New Orleans Neighborhoods, Historic Access & Corridor Logistics',
  heroOpener:
    'Orleans Parish is New Orleans — not Jefferson suburban product and not a generic Gulf Coast template. French Quarter and Marigny mean narrow streets, limited truck length, and long carries; Uptown and Garden District add raised homes, porches, and stair friction; Mid-City and Lakeview flip to post-rebuild stock with flood-elevation and driveway quirks; CBD and Warehouse District bring elevators, COI, and freight windows. Humidity, afternoon storms, and hurricane-season contingency are real planning inputs. A shotgun double, a Garden District two-story, and a CBD condo do not share curb access or labor hours. This hub is for Orleans Parish (New Orleans) — not Metairie, not Kenner, and not a renamed Houston or Atlanta page.',
  heroCredibility:
    'LPSC household goods common carrier certificate for intrastate LA moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-610 · US-90 · LA-39 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Orleans Parish different',
    intro:
      'These are New Orleans core realities — historic street grids, raised homes, elevators where they exist, and flood-elevation planning — not Jefferson Parish suburban defaults or Northshore product.',
    bullets: [
      {
        title: 'Historic neighborhoods rewrite truck access',
        detail:
          'French Quarter, Marigny, Bywater, and parts of Uptown often limit truck length, turning radius, and curb staging. Expect shuttle vans, long carries, and strict block-by-block parking rules that suburban cul-de-sacs never see.',
      },
      {
        title: 'Raised homes, stairs, and porches dominate labor hours',
        detail:
          'Many Orleans single-family and multi-unit buildings sit above grade for flood resilience. Exterior stairs, narrow hallways, and second-floor walk-ups drive time more than bedroom count alone.',
      },
      {
        title: 'Elevators and COI matter in CBD / Warehouse District product',
        detail:
          'Downtown towers, Warehouse District lofts, and mid-rises often require Certificates of Insurance, reserved freight elevators, and fixed move windows. Treat building packets as part of the survey — not an afterthought.',
      },
      {
        title: 'Flood elevation and humidity are operational inputs',
        detail:
          'Mapped flood risk, raised foundations, and high humidity affect staging, cardboard integrity, and outdoor carry comfort. Early starts beat noon load-outs in peak summer; storm days compress flexible windows.',
      },
      {
        title: 'I-10 / I-610 / US-90 define portal-to-portal time',
        detail:
          'Cross-city pairs look local on maps and regional at peak. CBD ↔ Gentilly, Uptown ↔ New Orleans East, and West Bank approaches via the bridge system rewrite empty-mile risk. Price corridor pairs honestly.',
      },
      {
        title: 'Intrastate LPSC household goods certificate vs interstate FMCSA',
        detail:
          'Moves entirely within Louisiana by for-hire household goods carriers generally require a common carrier certificate from the Louisiana Public Service Commission (LPSC) under La. R.S. 45:164.E before engaging in household goods moving activities. Confirm the company is registered and in good standing, and that you receive a written estimate (or written waiver) matching the legal name on the paperwork before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Orleans Parish access zones',
  zonesIntro:
    'Plan by historic core, Uptown/Garden District, Mid-City/Lakeview, and New Orleans East / Gentilly — each has its own truck access and housing profile.',
  zones: [
    {
      id: 'historic-core',
      name: 'French Quarter, Marigny, Bywater & CBD elevators',
      shortName: 'Historic / CBD',
      neighborhoods: [
        'French Quarter',
        'Marigny',
        'Bywater',
        'CBD',
        'Warehouse District',
        'Tremé edges',
      ],
      housingTypes:
        'Historic multi-unit, shotguns, lofts, high-rises and mid-rises, renovated commercial conversions',
      challenges: [
        'Narrow streets and limited truck length',
        'Scarce curb staging and permit rules',
        'Elevator/COI and freight windows in towers',
        'Event and tourism congestion near the Quarter',
      ],
      moverTips:
        'Photo street width and approach turns. Prefer shuttle vans for tight blocks. Get building packets early for CBD/Warehouse District. Avoid major festival and event peaks when flexible.',
      cityKeywords: [
        'french quarter',
        'marigny',
        'bywater',
        'cbd',
        'warehouse district',
        'new orleans',
        'downtown new orleans',
      ],
    },
    {
      id: 'uptown-garden',
      name: 'Uptown, Garden District & Magazine corridor',
      shortName: 'Uptown / Garden',
      neighborhoods: [
        'Garden District',
        'Uptown',
        'Irish Channel',
        'Audubon',
        'Carrollton edges',
        'Magazine Street corridor',
      ],
      housingTypes:
        'Raised SFH, doubles, multi-story historic homes, some multi-family and carriage-house product',
      challenges: [
        'Raised foundations and exterior stairs',
        'Tree-lined streets with limited staging',
        'High-value contents and careful-handling norms',
        'Streetcar and arterial congestion near Magazine / St. Charles',
      ],
      moverTips:
        'Survey stair width and porch clearances carefully. Confirm parking rules block by block. Discuss valuation for higher-value inventories. Prefer mid-week morning starts.',
      cityKeywords: [
        'uptown',
        'garden district',
        'irish channel',
        'audubon',
        'carrollton',
        'magazine',
      ],
    },
    {
      id: 'midcity-lakeview',
      name: 'Mid-City, Lakeview & City Park edges',
      shortName: 'Mid-City / Lakeview',
      neighborhoods: [
        'Mid-City',
        'Lakeview',
        'City Park edges',
        'Bayou St. John',
        'Navarre',
        'Lakewood edges',
      ],
      housingTypes:
        'Post-rebuild SFH, raised homes, multi-family, some mid-century and newer stock',
      challenges: [
        'Flood-elevation and driveway access variation',
        'I-10 / Canal / City Park corridor congestion',
        'Mixed raised vs slab product on the same block',
        'Humidity and storm staging contingency',
      ],
      moverTips:
        'Note elevation and stair configuration on the survey. Price Mid-City ↔ CBD pairs portal-to-portal. Plan weather contingency in peak storm season.',
      cityKeywords: [
        'mid-city',
        'midcity',
        'lakeview',
        'city park',
        'bayou st john',
        'navarre',
      ],
    },
    {
      id: 'east-gentilly',
      name: 'New Orleans East, Gentilly & Chef Menteur corridors',
      shortName: 'East / Gentilly',
      neighborhoods: [
        'New Orleans East',
        'Gentilly',
        'Chef Menteur corridor',
        'Little Woods edges',
        'Pontchartrain Park edges',
        'Read Boulevard corridors',
      ],
      housingTypes: 'SFH, multi-family, ranch and two-story stock, some HOA pockets',
      challenges: [
        'Longer portal time to historic core via I-10',
        'Flood-mapped parcels and elevation notes',
        'Broader arterials with different curb rules than Uptown',
        'Cross-parish pairs into Jefferson or St. Bernard',
      ],
      moverTips:
        'Price I-10 empty miles honestly for East ↔ Uptown/CBD pairs. Confirm driveway and fence access. Clarify Orleans vs Jefferson destinations on multi-parish estimates.',
      cityKeywords: [
        'new orleans east',
        'gentilly',
        'chef menteur',
        'little woods',
        'pontchartrain park',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Orleans Parish moving costs',
    intro:
      'Historic access friction, raised-home stairs, elevator packets, and I-10 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Narrow-street shuttle & long-carry friction',
        detail: 'Historic core labor hours spike when full-size trucks cannot stage at the curb.',
      },
      {
        title: 'Raised homes, stairs & porch carries',
        detail: 'Above-grade access rewrites crew time on classic New Orleans stock.',
      },
      {
        title: 'CBD elevator, COI & freight windows',
        detail: 'Tower and loft packets add coordination and constrained load-out slots.',
      },
      {
        title: 'I-10 / I-610 / bridge congestion',
        detail: 'Portal-to-portal spikes at peak; cross-zone pairs understate map miles.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,600+', note: 'Higher with stairs or shuttle' },
      { label: '2–3BR double or modest SFH', value: '$1,400–$4,200+', note: 'Raised homes trend up' },
      { label: '3–4+ BR / tower / cross-zone', value: '$2,600–$8,500+', note: 'Historic + elevator highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$190+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Orleans Parish',
    intro:
      'Summer humidity and tourism peaks, multi-family lease turns, festival calendars, hurricane season, and winter cold snaps reshape New Orleans windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb in historic blocks and reduce I-10 / CBD pain.',
      },
      {
        title: 'Peak family & lease season: late May–mid-August',
        detail: 'Book multi-unit and Uptown Saturdays early; humidity slows open staging.',
      },
      {
        title: 'Festival and event calendars',
        detail: 'Mardi Gras season, Jazz Fest, and major downtown events compress curb and truck access — avoid when flexible.',
      },
      {
        title: 'Hurricane season contingency (roughly June–November)',
        detail: 'Build weather buffers; confirm tarps, indoor staging, and reschedule terms on written estimates.',
      },
    ],
  },
  specialized: [
    {
      id: 'orleans-historic-access-elevators-i10',
      title: 'New Orleans historic access, elevators & I-10 module',
      intro:
        'Orleans estimates fail when narrow-street access, raised-home stairs, building packets, or I-10 empty miles are ignored.',
      bullets: [
        'Photo street width, approach turns, and curb staging for French Quarter / Marigny / Bywater jobs.',
        'Survey raised foundations, exterior stairs, and porch clearances on Uptown and Garden District stock.',
        'Request CBD / Warehouse District building packets (COI, elevator, freight windows) early.',
        'Price I-10 / I-610 / US-90 pairs portal-to-portal; clarify Orleans vs Jefferson destinations.',
        'Note flood elevation and humidity staging needs on the survey when relevant.',
        'Verify LPSC household goods common carrier certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Orleans Parish?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How systems work here',
            detail:
              'Orleans Parish public education is largely a portfolio of charter and district-affiliated schools. Confirm enrollment processes, zones, and application timelines for your address — they are not interchangeable with suburban Jefferson defaults.',
          },
          {
            title: 'Research sources',
            detail:
              'School operator sites, Louisiana Department of Education data, and local enrollment guides beat ranking screenshots.',
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
              'Ochsner, LCMC Health (including University Medical Center and other campuses), Tulane-affiliated care, and VA facilities serve parish corridors. Confirm networks and campus locations.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from East / Gentilly and West Bank approaches into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Historic multi-unit vs raised SFH vs CBD towers',
            detail:
              'Shotguns and doubles differ sharply from Garden District two-stories and Warehouse District lofts. Flood-elevation and insurance costs vary parcel by parcel.',
          },
          {
            title: 'Cost variation',
            detail:
              'Near-core renovated stock and Uptown product often price differently from New Orleans East or Gentilly two-stories. Survey access before assuming “local move” rates.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Historic / CBD lifestyle',
            detail: 'Walkable amenities with narrow-street and elevator tradeoffs.',
          },
          {
            title: 'Uptown / Garden District pattern',
            detail: 'Tree-lined streets, raised homes, and higher access friction.',
          },
          {
            title: 'Mid-City / Lakeview / East pattern',
            detail: 'More driveway product with flood-elevation notes and longer portal time to core jobs.',
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
              'Healthcare, tourism and hospitality, port and logistics, education, professional services, and energy-adjacent work shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-610, and bridge peaks are real. Test drive peak routes between your housing zone and workplace campus.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'New Orleans core identity',
            detail:
              'Orleans is the city of New Orleans — not Jefferson suburban Metairie product or Northshore Slidell/Mandeville as the default.',
          },
          {
            title: 'Climate & flood awareness',
            detail:
              'Hot humid summers, heavy rain events, and hurricane season. Know elevation and evacuation routes for your parcel; plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Orleans Parish resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify LPSC household goods common carrier registration for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of New Orleans — official site',
        href: 'https://nola.gov/',
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
    'Prefer historic-access, raised-home, and elevator experience with honest I-10 pricing. Verify LPSC HHG common carrier certificate in-state and FMCSA interstate.',
  lastReviewed: '2026-07-24',
});
