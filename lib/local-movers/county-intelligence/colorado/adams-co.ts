import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Adams County, CO — north-metro growth, airport-adjacent (not Denver lofts, not Douglas master-planned south).
 * New subdivisions, I-76 / E-470, Tower Road, commerce corridors.
 */
export const adamsCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'adams',
  hubTitle: 'Adams County Moving Intelligence Hub',
  eyebrow: 'Adams · North metro · Thornton, Brighton, Commerce City & airport edge',
  h1: 'Moving in Adams County: North-Metro Growth, Airport-Adjacent Access & New Subdivisions',
  heroOpener:
    'Adams County is Denver’s north and northeast growth engine: Thornton and Northglenn family tracts, Commerce City industrial-edge residential, Brighton and prairie expansion, and airport-adjacent subdivisions where Tower Road and E-470 rewrite empty-mile math. A brand-new HOA gate in Brighton, a Thornton two-story with unfinished basement staging, a Commerce City multifamily walk-up, and a DIA-adjacent temporary-housing unload do not share truck access or crew skill. I-25, I-76, E-470, I-270, and Tower Road corridors make “local” estimates fail when crews ignore construction detours, freight traffic, and multi-county Aurora edges. This hub is for people moving in Adams County — not a renamed Highlands loft page or generic Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Adams north-metro growth, airport-adjacent & subdivision logistics awareness · Curated listings',
  majorCorridors: 'I-25 · I-76 · E-470 · I-270 · Tower Road corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Adams County different',
    intro:
      'These are Adams north-metro realities — new subdivision HOAs, airport-adjacent freight timing, and I-25 / E-470 growth logistics — not Denver walk-up micro-markets or Douglas Highlands Ranch / Castle Rock master-planned south cores.',
    bullets: [
      {
        title: 'North-metro growth and new subdivisions rewrite access weekly',
        detail:
          'Brighton, Thornton north, and prairie-edge tracts add incomplete curb, temporary gravel, HOA rules that change by filing, and construction detours. Yesterday’s staging photo may not match move day.',
      },
      {
        title: 'Airport-adjacent freight and DIA traffic reshape portal time',
        detail:
          'Tower Road, Peña Boulevard approaches, and I-70 / I-270 freight clusters can collapse freeflow even on off-peak residential jobs. Price airport-corridor pairs with buffers, not odometer optimism.',
      },
      {
        title: 'I-25, I-76, and E-470 turn short map miles into billable hours',
        detail:
          'Thornton ↔ Commerce City, Brighton ↔ Northglenn, or Adams ↔ Denver pairs look local and still burn 35–80+ minutes at peak. Portal-to-portal honesty matters more than ZIP proximity.',
      },
      {
        title: 'Industrial-edge residential mixes truck types and curb rules',
        detail:
          'Commerce City and warehouse-adjacent pockets share streets with heavy freight. Residential movers need different staging plans than open industrial lots imply.',
      },
      {
        title: 'HOA packets arrive with the drywall on many new builds',
        detail:
          'New communities often enforce gate lists, dumpster rules, and approved hours before landscaping is finished. Collect builder/HOA documents early — including unfinished-basement load paths.',
      },
      {
        title: 'Multi-county Aurora and Brighton edges confuse jurisdiction',
        detail:
          'City limits jump across Adams, Arapahoe, and Weld edges. Clarify city vs county addresses so Colorado PUC HHG vs FMCSA assumptions and empty-mile pricing stay accurate.',
      },
      {
        title: 'Employer and warehouse shift calendars create mid-week spikes',
        detail:
          'Logistics, airport, and distribution households often need mid-week hard dates that compete with Saturday family demand for crews.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Adams County access zones',
  zonesIntro:
    'Plan by Thornton–Northglenn I-25 spine, Commerce City industrial-edge residential, Brighton and east-prairie growth, airport / Tower Road corridors, and Westminster–Federal Heights west edges — access rules cluster by growth corridor more than ZIP alone.',
  zones: [
    {
      id: 'thornton-northglenn',
      name: 'Thornton, Northglenn & I-25 north spine',
      shortName: 'Thornton / Northglenn',
      neighborhoods: [
        'Thornton',
        'Northglenn',
        'Original Thornton edges',
        'Eastlake edges',
        '124th / 136th corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily, older ranch pockets',
      challenges: [
        'I-25 peak freeflow collapse north and south',
        'HOA rules on newer north growth tracts',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets early on new tracts. Price I-25 portal time for any Denver-linked pair. Survey unfinished basements and garage overflow on larger SFH.',
      cityKeywords: [
        'thornton',
        'northglenn',
        'eastlake',
        'original thornton',
        'north metro',
      ],
    },
    {
      id: 'commerce-city',
      name: 'Commerce City, industrial-edge & northeast residential',
      shortName: 'Commerce City',
      neighborhoods: [
        'Commerce City',
        'Reunion edges',
        'Northeast Adams residential',
        'Industrial-adjacent neighborhoods',
      ],
      housingTypes: 'Newer HOA SFH, multifamily, older mixed stock near industrial zones',
      challenges: [
        'Freight traffic and limited residential curb near warehouses',
        'I-270 / I-76 / Vasquez approach congestion',
        'Cross-zone pairs into Denver and airport corridors',
      ],
      moverTips:
        'Photo curb away from freight docks. Build I-270 / I-76 buffers. Confirm HOA rules on Reunion-style product before crew day.',
      cityKeywords: [
        'commerce city',
        'reunion',
        'northeast adams',
        'vasquez',
      ],
    },
    {
      id: 'brighton-east-prairie',
      name: 'Brighton, Prairie Center edges & east Adams growth',
      shortName: 'Brighton / East prairie',
      neighborhoods: [
        'Brighton',
        'Prairie Center edges',
        'Bromley / Bridgewater edges',
        'East Adams subdivision growth',
      ],
      housingTypes: 'New HOA SFH, townhomes, larger-lot edges, limited multifamily',
      challenges: [
        'Construction detours and incomplete curb on active filings',
        'Long empty miles from west-metro staging yards',
        'HOA gate lists on brand-new communities',
      ],
      moverTips:
        'Confirm street acceptance and gate codes day-of. Price empty miles honestly. Share driveway and garage photos — many homes still have builder debris paths.',
      cityKeywords: [
        'brighton',
        'prairie center',
        'bromley',
        'bridgewater',
        'east adams',
      ],
    },
    {
      id: 'airport-tower-road',
      name: 'Airport-adjacent, Tower Road & DIA residential edges',
      shortName: 'Airport / Tower Road',
      neighborhoods: [
        'Tower Road corridor residential',
        'DIA-adjacent Adams pockets',
        'Aurora Adams-edge neighborhoods',
        'Peña approach residential edges',
      ],
      housingTypes: 'Newer HOA SFH, multifamily near employment nodes, temporary housing product',
      challenges: [
        'Airport freight and shift-change congestion',
        'E-470 / Tower Road peak clusters',
        'Split-load and temporary-housing newcomer patterns',
      ],
      moverTips:
        'Build airport-corridor buffers even for residential ZIPs. Ask about storage-in-transit and partial loads for DIA-linked newcomers. Clarify Adams vs Aurora address jurisdiction.',
      cityKeywords: [
        'tower road',
        'dia',
        'pená',
        'pena',
        'aurora adams',
        'airport',
      ],
    },
    {
      id: 'westminster-federal-heights',
      name: 'Westminster edges, Federal Heights & west Adams',
      shortName: 'Westminster / Federal Heights',
      neighborhoods: [
        'Federal Heights',
        'Westminster Adams edges',
        'Sheridan corridor residential',
        '92nd / 104th corridors',
      ],
      housingTypes: 'Garden apartments, mobile-home communities, ranch SFH, denser multifamily',
      challenges: [
        'Mixed product and access types on short distances',
        'US-36 / I-25 / Federal approach congestion',
        'Tight lots and long carries from distant parking',
      ],
      moverTips:
        'Confirm unit access type (stairs vs elevator vs lot layout). Prefer smaller trucks in dense older communities. Price US-36 / I-25 pairs portal-to-portal.',
      cityKeywords: [
        'federal heights',
        'westminster',
        'sheridan',
        'adams west',
      ],
    },
    {
      id: 'henderson-northern-edges',
      name: 'Henderson, northern unincorporated & rural-lot edges',
      shortName: 'Henderson / North edges',
      neighborhoods: [
        'Henderson',
        'Northern unincorporated Adams',
        'Rural-lot and semi-rural pockets',
        'Weld County line edges',
      ],
      housingTypes: 'Larger-lot SFH, agricultural-edge homes, scattered newer subdivisions',
      challenges: [
        'Long private drives and limited truck turnaround',
        'Long empty miles and soft-shoulder risk',
        'Cross-county pairs into Weld and Denver metro',
      ],
      moverTips:
        'Pre-walk drive length and surface. Price empty miles and weather contingency. Clarify county-line destinations before final estimate.',
      cityKeywords: [
        'henderson',
        'unincorporated adams',
        'northern adams',
        'weld line',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Adams County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. New-subdivision HOA friction, airport freight timing, and I-25 / E-470 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'New subdivision HOA & incomplete curb',
        detail:
          'Gate lists, construction detours, and unfinished exteriors add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-25 · I-76 · E-470 · I-270 · Tower Road congestion',
        detail:
          'Growth-corridor pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Airport-adjacent freight & shift traffic',
        detail:
          'DIA and warehouse corridors inject delay into residential jobs that pure suburb quotes underprice.',
      },
      {
        title: 'Long empty miles to Brighton and prairie edges',
        detail:
          'North and east growth tracts raise staging distance from Denver-core yards.',
      },
      {
        title: 'Multi-county Aurora / Brighton jurisdiction complexity',
        detail:
          'Address edges across Adams, Arapahoe, and Weld raise authority and routing confusion when crews skip verification.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,500+',
        note: 'Higher with HOA gates, multifamily stairs, or peak I-25 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,900+',
        note: 'New-build HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / new HOA / cross-zone / prairie edge',
        value: '$2,500–$7,800+',
        note: 'Brighton empty miles and long E-470 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Adams County move',
    intro:
      'School calendars, new-build closings, warehouse shift demand, plains wind, and winter freeze–thaw reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA gates, reduce I-25 / E-470 pain, and avoid airport shift-change peaks. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family and closing season: late May–mid-September',
        detail:
          'Thornton / Brighton SFH Saturdays and new-build closing clusters fill first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Plains wind, heat, and winter freeze–thaw',
        detail:
          'Open prairie tracts take wind and ice hard. Prefer early starts, tarp plans, and flexible weather windows — especially on unfinished exterior paths.',
      },
      {
        title: 'Airport and logistics mid-week spikes',
        detail:
          'Distribution and aviation-adjacent households create mid-week hard dates. Confirm report times, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'adams-growth-airport',
      title: 'Adams north-metro growth, airport-adjacent & subdivision module',
      intro:
        'Adams estimates fail more often on incomplete curb, HOA packets, airport freight timing, and empty miles than on packing skill alone.',
      bullets: [
        'Collect HOA / builder gate lists, truck limits, and approved hours before the survey is final — especially on new Brighton and north Thornton tracts.',
        'Reconfirm street access day-of when construction detours are active.',
        'Price portal-to-portal time for any pair that rides I-25, I-76, E-470, I-270, or Tower Road at peak.',
        'Build airport-corridor buffers for DIA-adjacent residential ZIPs even when both addresses look “local.”',
        'Ask newcomers about temporary housing, partial loads, and storage-in-transit at estimate time.',
        'Clarify Adams vs Aurora / Denver / Weld / Arapahoe addresses on every estimate.',
        'Verify Colorado PUC household goods (HHG) permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'industrial-edge-residential',
      title: 'Commerce City industrial-edge residential module',
      intro:
        'Residential jobs near freight corridors need curb plans that warehouse-yard assumptions ignore.',
      bullets: [
        'Photo legal residential staging away from active freight docks and truck routes.',
        'Prefer early starts before industrial shift peaks when flexible.',
        'Confirm multifamily vs HOA SFH product — Reunion-style tracts are not older industrial-edge walk-ups.',
        'Price I-270 / I-76 / Vasquez approaches honestly for Denver-linked pairs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Adams County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures growth-corridor fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Adams County is served by multiple districts (including Adams 12, Adams 14, Brighton 27J, Westminster Public Schools edges, and others depending on address). Assignment is address-based — marketing names like Reunion or Tower Road do not guarantee a campus.',
          },
          {
            title: 'Growth and capacity',
            detail:
              'Brighton and north Thornton growth corridors can see enrollment pressure and boundary adjustments. Ask the assigned district about capacity and busing when touring new subdivisions.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'North Suburban, Platte Valley / Brighton-area care, UCHealth and HealthONE metro campuses, and Children’s Hospital Colorado network options serve Adams residents. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Brighton or Commerce City to preferred campuses — I-76 and E-470 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'New HOA SFH, multifamily & industrial-edge mix',
            detail:
              'Expect rapid subdivision growth in Brighton and north Thornton; mixed multifamily in Federal Heights and older corridors; and industrial-adjacent residential in Commerce City.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary from older Federal Heights product to newer master-planned filings. Budget for HOA dues, longer commutes, and unfinished-basement finish costs on new builds.',
          },
          {
            title: 'HOA and builder governance',
            detail:
              'New communities often control move hours, truck size, dumpsters, and exterior work before you even close. Read builder and HOA documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Adams areas fit whom',
        bullets: [
          {
            title: 'Thornton–Northglenn I-25 family corridors',
            detail:
              'Suits households prioritizing north-metro schools and retail access — with I-25 timing and Saturday competition.',
          },
          {
            title: 'Brighton and east-prairie growth',
            detail:
              'Often appeals for newer homes and space — with empty-mile logistics, construction friction, and longer Denver-bound peaks.',
          },
          {
            title: 'Commerce City and industrial-edge living',
            detail:
              'Attracts value- and job-adjacent households near logistics corridors — with freight traffic and mixed residential access.',
          },
          {
            title: 'Airport / Tower Road edges',
            detail:
              'Fits aviation and logistics workers needing DIA proximity — with shift traffic and temporary-housing move patterns.',
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
              'Denver International Airport and aviation services, warehouse and distribution, north-metro retail, healthcare, and reverse-commutes into Denver or Boulder-edge campuses concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households remain car-dependent. I-25, I-76, E-470, I-270, and Tower Road peaks are real. Test drive peak routes before choosing solely on new-build incentives.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, growth-edge Front Range',
            detail:
              'Adams stacks established north-metro grids, brand-new prairie subdivisions, industrial-edge residential, and airport corridors — different from Denver’s loft core or Douglas’s south master-planned HOAs.',
          },
          {
            title: 'Climate',
            detail:
              'Open plains wind, intense sun, summer storms, and winter freeze–thaw. New landscapes can mean dust and unfinished paths during move-in season.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Growth corridors feel family- and construction-driven; industrial edges feel shift-calendar driven; airport pockets feel transient and employer-timed. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Adams County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Adams County — official site',
        href: 'https://www.adcogov.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Thornton',
        href: 'https://www.thorntonco.gov/',
        external: true,
        note: 'Municipal services & permits',
      },
      {
        label: 'City of Brighton',
        href: 'https://www.brightonco.gov/',
        external: true,
        note: 'Growth-area services & info',
      },
      {
        label: 'CDOT COtrip — road conditions',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 / I-76 / E-470 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with new-subdivision HOA fluency for Thornton / Brighton growth; airport-corridor timing awareness for Tower Road / DIA edges; industrial-edge residential staging skill for Commerce City; honest I-25 · I-76 · E-470 · I-270 portal pricing. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
