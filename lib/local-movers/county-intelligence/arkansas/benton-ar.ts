import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Benton County, AR — NWA Bentonville/Rogers corporate growth (not Washington County Fayetteville, not Benton MO).
 */
export const bentonCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'benton',
  hubTitle: 'Benton County Moving Intelligence Hub',
  eyebrow:
    'Benton · Bentonville / Rogers NWA growth · I-49 · US-71 · AR-12',
  h1: 'Moving in Benton County: Bentonville–Rogers Corporate Growth, NWA HOA Tracts & I-49 Logistics',
  heroOpener:
    'Benton County, Arkansas is Northwest Arkansas corporate-growth core — Bentonville, Rogers, Centerton, Bella Vista, and Siloam Springs belts — not Washington County Fayetteville/university product, not Benton County Missouri, and not a Little Rock capital-metro rename. Corporate campus relocation waves, gated HOA tracts, newer two-story inventory, lake and hillside edges, and I-49 / US-71 freeflow rewrite “local” estimates. A downtown Bentonville loft, a Rogers HOA cul-de-sac, a Bella Vista hillside driveway, and a Centerton starter ranch do not share truck access or empty-mile risk. This hub is for people moving in Benton County, Arkansas — NWA Bentonville/Rogers market realities, not Fayetteville U of A cycles and not a Missouri Benton page.',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-49 · US-71 · AR-12 · local NWA arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Benton County different',
    intro:
      'These are NWA corporate-growth realities — HOA packets, campus relocation timing, and I-49 freeflow — not Fayetteville student-housing defaults or a generic Arkansas template.',
    bullets: [
      {
        title: 'Corporate and campus relocation waves compress booking windows',
        detail:
          'Bentonville and Rogers jobs often stack with employer start dates, temporary housing turns, and out-of-state inbound inventory. Flexible mid-week mornings beat last-minute Saturday optimism.',
      },
      {
        title: 'NWA HOA tracts rewrite simple-suburb assumptions',
        detail:
          'Gate lists, truck-length limits, dumpster rules, and narrow cul-de-sacs dominate Centerton, Rogers, and west Bentonville growth product. A downtown storefront walk-up is not a gated two-story.',
      },
      {
        title: 'I-49, US-71, and AR-12 define portal-to-portal time',
        detail:
          'Bentonville ↔ Rogers, Centerton ↔ Bella Vista, or Siloam ↔ Bentonville pairs look local on maps and regional at peak. Price honestly — construction and corporate traffic stack fast.',
      },
      {
        title: 'Hillside, lake-edge, and Bella Vista stock differ from flat HOA grids',
        detail:
          'Pitch, long carries, soft shoulders, and limited turnaround underprice flat-rate quotes. Survey photos beat bedroom counts on lake and ridge lots.',
      },
      {
        title: 'Not Washington County AR and not Benton County MO',
        detail:
          'This is Benton County, Arkansas — Bentonville/Rogers NWA growth. Fayetteville university cycles and Missouri Benton markets use different access rules, housing mix, and corridors — survey each Benton AR address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Benton County access zones',
  zonesIntro:
    'Plan by Bentonville core / campus belts, Rogers growth, Centerton / west HOA tracts, and Bella Vista / lake-edge product — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'bentonville-core-campus',
      name: 'Bentonville core, downtown & campus-adjacent belts',
      shortName: 'Bentonville core',
      neighborhoods: [
        'Downtown Bentonville',
        '8th Street / Walton campus edges',
        'Central Bentonville multi-unit',
        'SE Bentonville growth edges',
        'I-49 Bentonville approaches',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, mixed newer SFH',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging near downtown events',
        'Corporate relocation timing pressure',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Confirm temporary-housing turn dates on corporate jobs.',
      cityKeywords: [
        'bentonville',
        'downtown bentonville',
        'walton',
        '8th street',
        'bentonville ar',
      ],
    },
    {
      id: 'rogers-growth-corridors',
      name: 'Rogers growth corridors & Pinnacle Hills belts',
      shortName: 'Rogers',
      neighborhoods: [
        'Rogers',
        'Pinnacle Hills edges',
        'Pleasant Crossing edges',
        'US-71 / I-49 Rogers approaches',
        'East Rogers multi-family',
      ],
      housingTypes: 'Newer SFH, HOA tracts, multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-49 / US-71 peak congestion',
        'Longer portal time on Rogers–Bentonville pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Rogers–Bentonville pairs portal-to-portal. Avoid peak I-49 windows when flexible.',
      cityKeywords: [
        'rogers',
        'rogers ar',
        'pinnacle hills',
        'pleasant crossing',
      ],
    },
    {
      id: 'centerton-west-hoa',
      name: 'Centerton, west Bentonville & west HOA growth',
      shortName: 'Centerton / west',
      neighborhoods: [
        'Centerton',
        'West Bentonville tracts',
        'AR-12 west approaches',
        'Newer HOA cul-de-sac grids',
        'School-calendar family stock',
      ],
      housingTypes: 'Newer SFH, HOA-dominated tracts, some townhomes',
      challenges: [
        'Gate codes, dumpster rules, and narrow cul-de-sacs',
        'AR-12 freeflow at school peaks',
        'Summer family move-in compression',
      ],
      moverTips:
        'Confirm HOA truck rules in writing. Survey driveway width and staging length. Book summer Saturdays early.',
      cityKeywords: [
        'centerton',
        'west bentonville',
        'centerton ar',
        'ar-12',
      ],
    },
    {
      id: 'bella-vista-lake-edge',
      name: 'Bella Vista, lake-edge & hillside stock',
      shortName: 'Bella Vista / lake',
      neighborhoods: [
        'Bella Vista',
        'Lake-edge communities',
        'Hillside and ridge lots',
        'Golf-community edges',
        'North Benton County approaches',
      ],
      housingTypes: 'Established SFH, hillside lots, lake-edge and retirement stock',
      challenges: [
        'Hillside driveways and limited truck turnaround',
        'Long carries and soft-shoulder risk',
        'Tree canopy and winding internal roads',
      ],
      moverTips:
        'Photo driveway pitch and turnaround before pricing. Use smaller trucks when gates or curves limit length. Build weather contingency on ridge lots.',
      cityKeywords: [
        'bella vista',
        'bella vista ar',
        'lake edge',
        'north benton county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Benton County moving costs',
    intro:
      'HOA friction, corporate timing, hillside access, and I-49 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'NWA HOA gate & truck-length friction',
        detail: 'Packets, staging limits, and cul-de-sac access spike labor hours.',
      },
      {
        title: 'Corporate / campus relocation timing',
        detail: 'Compressed windows and temporary-housing turns raise crew demand.',
      },
      {
        title: 'I-49 / US-71 / AR-12 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Hillside & lake-edge long carries',
        detail: 'Pitch and limited turnaround underprice flat-suburb quotes.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$475–$1,750+',
        note: 'Higher with elevators or HOA limits',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,300+',
        note: 'HOA and growth-corridor friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-NWA',
        value: '$2,600–$8,500+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$190+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Benton County',
    intro:
      'Corporate start-date waves, summer family peaks, HOA blackout weekends, and humid storm afternoons reshape NWA Benton windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-49 / US-71 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Centerton and Rogers Saturdays early.',
      },
      {
        title: 'Corporate relocation compressions',
        detail: 'Bentonville/Rogers campus-adjacent inventory fills first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'benton-nwa-corporate-hoa-i49',
      title: 'NWA corporate growth & HOA / I-49 module',
      intro:
        'Benton AR estimates fail when HOA packets, campus timing, or I-49 empty miles are ignored — and when crews treat this as Fayetteville Washington County or Benton County Missouri.',
      bullets: [
        'Collect HOA gate lists and truck-length rules early.',
        'Align crew days with corporate start dates and temporary-housing turns.',
        'Price I-49 / US-71 / AR-12 pairs portal-to-portal.',
        'Photo hillside and Bella Vista driveway pitch before final pricing.',
        'Verify ArDOT Intrastate Authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Benton County?',
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
              'Bentonville, Rogers, Gravette, Decatur, Gentry, Siloam Springs, and other systems serve different addresses. Confirm zoning carefully — growth tracts shift attendance boundaries often.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Arkansas Department of Education data beat ranking screenshots.',
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
              'Northwest Health, Mercy NWA campuses, and other regional facilities anchor Bentonville/Rogers care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Centerton, Bella Vista, and Siloam into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs HOA growth vs lake-edge stock',
            detail:
              'Downtown lofts, Centerton two-stories, and Bella Vista hillside product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Corporate-demand neighborhoods often price differently from outer western tracts or older lake-community stock.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Bentonville core lifestyle',
            detail: 'Walkable amenities with curb density and campus-adjacent tradeoffs.',
          },
          {
            title: 'Rogers / Centerton growth pattern',
            detail: 'HOA SFH, school calendars, and I-49 commute math.',
          },
          {
            title: 'Bella Vista / lake-edge pattern',
            detail: 'More space and hillside logistics with different daily freeflow.',
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
              'Retail headquarters and supply-chain ecosystems, professional services, healthcare, logistics, and regional construction shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-49, US-71, and AR-12 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'NWA Bentonville/Rogers identity',
            detail:
              'Benton County AR is corporate-growth NWA — not Fayetteville university product alone, and not Benton County MO.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, mild winters with occasional ice. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Benton County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Benton County, Arkansas — official site',
        href: 'https://www.bentoncountyar.gov/',
        external: true,
      },
      {
        label: 'City of Bentonville — official site',
        href: 'https://www.bentonvillear.com/',
        external: true,
      },
      {
        label: 'ArDOT traffic & road conditions',
        href: 'https://www.ardot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer NWA HOA and corporate-relocation experience with honest I-49 / US-71 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Benton County AR (Bentonville/Rogers) — not Washington County AR or Benton MO.',
  lastReviewed: '2026-07-24',
});
