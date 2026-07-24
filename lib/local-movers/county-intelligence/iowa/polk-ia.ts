import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Polk County, IA — Des Moines metro core / West Des Moines / Ankeny / suburbs.
 * Insurance & corporate corridors. NOT Cedar Rapids, NOT Quad Cities, NOT Iowa City.
 */
export const polkCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'polk',
  hubTitle: 'Polk County Moving Intelligence Hub',
  eyebrow:
    'Polk County, IA · Des Moines core, insurance/corporate corridors & I-35 / I-80 logistics',
  h1: 'Moving in Polk County: Des Moines Access, Insurance Corridors & I-35 / I-80 Logistics',
  heroOpener:
    'Polk County, Iowa is Des Moines metro core — not Cedar Rapids industrial stock, not Quad Cities river product, and not Iowa City university density. Expect downtown and East Village elevator towers, Sherman Hill and Ingersoll walk-ups, West Des Moines and Urbandale HOA growth, Ankeny and Johnston family belts, and I-35 / I-80 / I-235 freeflow that rewrites “local” estimates. A Principal–Wells Fargo–Nationwide corridor condo, a Beaverdale bungalow basement, a West Des Fleur Drive gated driveway, and an Ankeny cul-de-sac do not share truck access or crew skill. Insurance and corporate headquarters density drives mid-week professional moves that smaller Iowa markets do not mirror. This hub is for people moving in Polk County, IA — Des Moines — not a renamed Linn or Scott page.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate · Des Moines access & I-35 / I-80 logistics awareness · Curated listings',
  majorCorridors: 'I-35 · I-80 · I-235 · US-6 · local Des Moines grid',
  whatMakesDifferent: {
    title: 'What makes moving in Polk County different',
    intro:
      'These are Des Moines core realities — insurance/corporate elevators, neighborhood grids, western suburb HOAs, and I-35 / I-80 / I-235 freeflow — not Cedar Rapids I-380 product, not Quad Cities river bridges, and not Iowa City student-lease waves alone.',
    bullets: [
      {
        title: 'Insurance and corporate corridors rewrite mid-week demand',
        detail:
          'Downtown Des Moines towers and West Des Moines corporate campuses stack elevator COIs, dock slots, and professional relocation calendars that Ankeny ranch stock and Beaverdale bungalows do not share. This is capital-city employer density — not a generic Iowa SFH template.',
      },
      {
        title: 'Downtown, East Village, and Court Avenue vertical product is not suburb product',
        detail:
          'Elevator reservations, building COIs, scarce curb, and event-day freeflow dominate core jobs. A West Des Moines HOA driveway or Johnston two-story does not share that logistics stack.',
      },
      {
        title: 'Historic grids and midtown stairs underprice flat-rate optimism',
        detail:
          'Sherman Hill, Beaverdale, North of Grand, and Highland Park basements, walk-ups, and tight residential curb fail estimates more often than packing skill alone.',
      },
      {
        title: 'West Des Moines, Urbandale, and Clive HOA growth is not Ankeny-only product',
        detail:
          'Gate lists, truck-length limits, and timed windows stack soft costs that eastern grid bungalows and downtown docks do not share. Survey each address — “western suburbs” is not one product.',
      },
      {
        title: 'I-35, I-80, I-235, and US-6 burn portal time',
        detail:
          'Downtown ↔ West Des Moines, Ankeny ↔ East Village, or Johnston ↔ South Des Moines pairs look local and still burn 25–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Cedar Rapids, Quad Cities, or Iowa City',
        detail:
          'Ignore Linn industrial-residential defaults, Scott river-bridge interstate pairs, and Johnson student-lease peaks as interchangeable scripts. Polk is Iowa’s insurance and government core with different housing mix and employer calendars.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Polk County access zones',
  zonesIntro:
    'Plan by downtown–East Village vertical product, midtown–historic neighborhood stock, West Des Moines–Urbandale HOAs, Ankeny–Johnston growth belts, and south/east grid edges — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-east-village',
      name: 'Downtown Des Moines, East Village & Court Avenue towers',
      shortName: 'Downtown / East Village',
      neighborhoods: [
        'Downtown Des Moines',
        'East Village',
        'Court Avenue edges',
        'Western Gateway edges',
        'Capitol corridors',
        'Principal Park edges',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-235 / MLK approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'des moines',
        'downtown des moines',
        'east village',
      ],
    },
    {
      id: 'midtown-historic',
      name: 'Sherman Hill, Beaverdale, Ingersoll & midtown historic stock',
      shortName: 'Midtown / historic',
      neighborhoods: [
        'Sherman Hill',
        'Beaverdale',
        'North of Grand',
        'Highland Park edges',
        'Ingersoll corridors',
        'Drake neighborhood edges',
      ],
      housingTypes: 'Older SFH, bungalows, walk-up multifamily, limited elevators',
      challenges: [
        'Basement stairs and scarce truck length',
        'Tight residential curb and tree-lined blocks',
        'Ingersoll / University freeflow',
      ],
      moverTips:
        'Survey stair counts and basement access with photos. Prefer mid-week starts. Inventory long carries carefully.',
      cityKeywords: [
        'beaverdale',
        'sherman hill',
        'des moines',
        'highland park',
      ],
    },
    {
      id: 'west-des-moines-urbandale',
      name: 'West Des Moines, Urbandale, Clive & western HOA growth',
      shortName: 'West DSM / Urbandale',
      neighborhoods: [
        'West Des Moines',
        'Urbandale',
        'Clive',
        'Windsor Heights edges',
        'Jordan Creek corridors',
        'Valley West edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, corporate-adjacent stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-35 / I-80 / University freeflow',
        'Corporate campus and retail-corridor staging limits',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-35 / I-80 honestly for downtown unload pairs.',
      cityKeywords: [
        'west des moines',
        'urbandale',
        'clive',
        'windsor heights',
      ],
    },
    {
      id: 'ankeny-johnston',
      name: 'Ankeny, Johnston & northern growth belts',
      shortName: 'Ankeny / Johnston',
      neighborhoods: [
        'Ankeny',
        'Johnston',
        'Saylorville edges',
        'Polk City edges',
        'Oralabor corridors',
        'Merle Hay north edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'I-35 freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
        'HOA rules across growth subdivisions',
      ],
      moverTips:
        'Collect HOA packets early. Price I-35 portal-to-portal for core pairs. Clarify Ankeny vs unincorporated addresses.',
      cityKeywords: [
        'ankeny',
        'johnston',
        'polk city',
      ],
    },
    {
      id: 'south-east-des-moines',
      name: 'South and east Des Moines grids & SE industrial edges',
      shortName: 'South / east DSM',
      neighborhoods: [
        'South Des Moines corridors',
        'East Des Moines grids',
        'Pleasant Hill edges',
        'Altoona edges',
        'SE 14th corridors',
        'Fourmile Creek edges',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, industrial-adjacent stock',
      challenges: [
        'US-65 / I-80 freeflow and freight traffic',
        'Mixed older stock and long carries',
        'Industrial-adjacent staging constraints',
      ],
      moverTips:
        'Avoid peak industrial windows when flexible. Survey older stock carefully. Clarify Des Moines vs Pleasant Hill / Altoona addresses.',
      cityKeywords: [
        'pleasant hill',
        'altoona',
        'des moines',
      ],
    },
    {
      id: 'grimes-waukee-west-edge',
      name: 'Grimes, Waukee edges & far-west growth cutters',
      shortName: 'Grimes / west edge',
      neighborhoods: [
        'Grimes',
        'Waukee edges (Polk adjacency)',
        'Dallas County fringe pairs',
        'NW growth corridors',
        'Highway 141 edges',
        'Western arterial belts',
      ],
      housingTypes: 'Newer HOA SFH, townhomes, growth multi-family',
      challenges: [
        'Longer empty miles to downtown elevators',
        'I-35 / I-80 approach freeflow',
        'Cross-county Dallas pairs common',
      ],
      moverTips:
        'Price empty miles honestly for core unload pairs. Confirm HOA rules. Clarify Polk vs Dallas county lines on multi-address estimates.',
      cityKeywords: [
        'grimes',
        'waukee',
        'des moines',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Polk County moving costs',
    intro:
      'Access product, elevator/HOA admin, and I-35 / I-80 / I-235 freeflow move the number more than packing skill alone — this is Des Moines insurance-corridor logistics, not Cedar Rapids or Quad Cities defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown and East Village vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Basement stairs, bungalows & midtown-grid curb',
        detail:
          'Sherman Hill, Beaverdale, and older Des Moines stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-35 · I-80 · I-235 · US-6 congestion',
        detail:
          'Cross-metro pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Western HOA gates & truck-length rules',
        detail:
          'West Des Moines, Urbandale, Clive, Ankeny, and Johnston packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Corporate calendars & multi-county empty miles',
        detail:
          'Insurance/professional relocations and Dallas / Warren / Story destinations raise staging distance and schedule soft costs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with elevators, walk-ups, or peak I-235 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$2,800–$9,000+',
        note: 'Tower moves and long I-35 / I-80 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Polk County move',
    intro:
      'Corporate transfer calendars, lease cycles, school calendars, summer heat, severe-storm season, and winter ice reshape access and crew availability across the Des Moines grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-35 / I-80 / I-235 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Corporate and insurance transfer waves',
        detail:
          'Mid-week professional relocations stack around headquarters campuses. Confirm building blackout windows and freight elevator competition.',
      },
      {
        title: 'Winter ice, freeze-thaw, and holiday freeflow',
        detail:
          'December–February adds icy stoops, frozen driveways, and weather cancellations across central Iowa. Prefer flexible dates, salt/sand contingency, and tarps on older midtown stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'polk-dsm-elevator-hoa',
      title: 'Des Moines elevator, HOA & I-35 / I-80 logistics module',
      intro:
        'Polk County estimates fail more often on stair surveys, elevator packets, HOA gates, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and basement access for Sherman Hill, Beaverdale, and older grid stock.',
        'Price portal-to-portal time for any pair that rides I-35, I-80, I-235, or US-6 at peak.',
        'Collect HOA packets early for West Des Moines, Urbandale, Clive, Ankeny, and Johnston product.',
        'Clarify Des Moines, West Des Moines, Ankeny, and unincorporated addresses on every estimate.',
        'For in-state jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-cr-not-qc-not-ic',
      title: 'Not Cedar Rapids · not Quad Cities · not Iowa City module',
      intro:
        'A single “central Iowa rate” collapses when Des Moines insurance-corridor product is confused with Linn industrial belts, Scott river-bridge pairs, or Johnson university-lease density.',
      bullets: [
        'Do not price East Village elevators like Cedar Rapids industrial-adjacent SFH or like Davenport riverfront walk-ups as interchangeable defaults.',
        'Keep Polk vs Dallas / Warren / Story county lines clear on multi-address estimates.',
        'Match downtown corporate peaks separately from Ankeny school-calendar waves.',
        'Treat out-of-state legs as interstate authority problems — Iowa DOT household goods permit alone is not enough for Illinois, Minnesota, Nebraska, or Wisconsin delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Polk County?',
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
              'Polk County spans Des Moines Public Schools plus West Des Moines, Ankeny, Johnston, Urbandale, Southeast Polk, Saydel, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Iowa Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UnityPoint Health – Des Moines, MercyOne Des Moines, Broadlawns, and specialty campuses anchor care across Polk County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-235 and I-35 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown and East Village vertical product; midtown historic bungalows and walk-ups; West Des Moines–Urbandale HOA growth; Ankeny–Johnston family belts; south and east ranch and multi-unit stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / East Village urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'Midtown / Beaverdale character living',
            detail:
              'Often appeals for neighborhood feel — with basements, curb limits, and denser staging constraints.',
          },
          {
            title: 'West Des Moines / Urbandale / Clive convenience',
            detail:
              'Attracts households seeking retail access, corporate proximity, and newer product — with HOA rules and I-35 freeflow.',
          },
          {
            title: 'Ankeny / Johnston growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with longer empty miles to the core and school-calendar peaks.',
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
              'Insurance and financial headquarters, state government, healthcare systems, logistics, agribusiness offices, and professional services concentrate demand across the metro.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real on I-35, I-80, and I-235. Test peak routes before choosing solely on rent or purchase price.',
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
              'Polk County stacks Iowa’s capital-city urban core, classic neighborhood grids, and western/northern suburb growth — different from Cedar Rapids industrial belts, Quad Cities river markets, and Iowa City university density.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, and freeze-thaw winters with ice and snow. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — corporate calendars, school seasons, sports and event days, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Polk County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Polk County, Iowa — official site',
        href: 'https://www.polkcountyiowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Des Moines',
        href: 'https://www.dsm.city/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of West Des Moines',
        href: 'https://www.wdm.iowa.gov/',
        external: true,
        note: 'Western suburb municipality context',
      },
      {
        label: 'City of Ankeny',
        href: 'https://www.ankenyiowa.gov/',
        external: true,
        note: 'Northern growth municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-35 / I-80 / I-235 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown–East Village product; basement and grid fluency for midtown historic stock; HOA gate fluency for West Des Moines–Urbandale–Ankeny; honest I-35 · I-80 · I-235 · US-6 timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
