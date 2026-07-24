import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Arapahoe County, CO — Aurora / DTC / south-metro HOA (not Denver core elevators, not Douglas Castle Rock).
 * South-metro master-planned rules, Smoky Hill, Parker Road, E-470 logistics.
 */
export const arapahoeCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'arapahoe',
  hubTitle: 'Arapahoe County Moving Intelligence Hub',
  eyebrow: 'Arapahoe · South metro · Aurora, DTC, Centennial & HOA corridors',
  h1: 'Moving in Arapahoe County: Aurora HOAs, DTC Condos & South-Metro Logistics',
  heroOpener:
    'Arapahoe County is Denver’s south and east employment-and-housing engine: Aurora subdivision fabric and multifamily stacks, Greenwood Village and Denver Tech Center condo and mid-rise product, Centennial and Englewood family tracts, and Smoky Hill / Parker Road growth that lives by HOA calendars. A DTC elevator reservation, an Aurora HOA gate list, a Centennial two-story with basement finish, and a Cherry Creek School District Saturday move do not share truck access or crew skill. I-25, I-225, E-470, Parker Road, and Smoky Hill corridors rewrite “local” estimates that ignore HOA COIs, truck-length limits, and peak tech-corridor portal time. This hub is for people moving in Arapahoe County — not a renamed RiNo loft page or generic Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Arapahoe HOA, DTC elevator & south-metro corridor awareness · Curated listings',
  majorCorridors: 'I-25 · I-225 · E-470 · Parker Road · Smoky Hill corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Arapahoe County different',
    intro:
      'These are Arapahoe south-metro realities — Aurora and Centennial HOA rules, DTC vertical product, and I-25 / E-470 congestion — not Denver walk-up micro-markets or Douglas Highlands Ranch / Castle Rock master-planned cores alone.',
    bullets: [
      {
        title: 'South-metro HOA fabric dominates many tracts',
        detail:
          'Aurora, Centennial, Foxfield edges, and Parker Road corridors often require gate lists, truck-length limits, approved hours, and COI naming. Collect packets early or burn half a crew day at the gate.',
      },
      {
        title: 'DTC and Greenwood Village vertical product rewrites the job',
        detail:
          'Condo and multifamily towers along the tech corridor need elevator reservations, building COIs, dock slots, and padded protection. A same-county ranch SFH does not share that logistics stack.',
      },
      {
        title: 'I-25, I-225, and E-470 turn short map miles into billable hours',
        detail:
          'Aurora ↔ DTC, Centennial ↔ Englewood, or Smoky Hill ↔ Denver pairs look local and still burn 35–80+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Basement finishes and multi-level SFH inventory matter',
        detail:
          'South-metro family product commonly stacks finished basements, garage overflow, and patio sets. Flight counts and long driveway carries change labor before packing skill matters.',
      },
      {
        title: 'School-district calendars drive Saturday competition',
        detail:
          'Cherry Creek and neighboring district calendars cluster family moves late May–mid-August. Peak Saturdays book out while mid-week windows remain underused.',
      },
      {
        title: 'Aurora’s multi-county footprint confuses authority and staging',
        detail:
          'Aurora spans Arapahoe, Adams, and Douglas edges. Clarify city vs county addresses so Colorado PUC HHG vs FMCSA assumptions and empty-mile pricing stay accurate.',
      },
      {
        title: 'Cross-county Front Range pairs are routine',
        detail:
          'Households regularly move Arapahoe ↔ Denver, Douglas, Adams, Jefferson, or out of state. Confirm both addresses on every estimate before deposits.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Arapahoe County access zones',
  zonesIntro:
    'Plan by DTC / Greenwood Village vertical, central Aurora multifamily and SFH, Centennial–Englewood west, Smoky Hill / southeast growth, and south-county Parker Road edges — access rules cluster by corridor more than ZIP alone.',
  zones: [
    {
      id: 'dtc-greenwood',
      name: 'Denver Tech Center, Greenwood Village & I-25 condo corridor',
      shortName: 'DTC / Greenwood',
      neighborhoods: [
        'Denver Tech Center',
        'Greenwood Village',
        'Belleview corridor',
        'Orchard / Belleview multifamily',
        'Cherry Creek South edges',
      ],
      housingTypes: 'Mid-rise condo, multifamily stacks, denser townhomes, limited SFH',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'I-25 / I-225 peak freeflow collapse',
        'Limited legal curb on commercial-residential mixes',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early starts. Price I-25 portal time for any Aurora- or Denver-linked pair.',
      cityKeywords: [
        'greenwood village',
        'dtc',
        'denver tech center',
        'belleview',
        'orchard',
        'centennial dtc',
      ],
    },
    {
      id: 'central-aurora',
      name: 'Central Aurora, Havana corridor & mixed multifamily',
      shortName: 'Central Aurora',
      neighborhoods: [
        'Central Aurora',
        'Havana corridor residential',
        'Del Mar edges',
        'Original Aurora edges',
        'Iliff / Mississippi corridors',
      ],
      housingTypes: 'Garden apartments, townhomes, ranch SFH, denser multifamily',
      challenges: [
        'Mixed elevator and stair product on short distances',
        'I-225 / Havana approach congestion',
        'Tight parking lots and long carries from distant spots',
      ],
      moverTips:
        'Confirm unit type (elevator vs walk-up) before final estimate. Photo complex gates and truck height limits. Build I-225 buffers for westbound unload pairs.',
      cityKeywords: [
        'aurora',
        'central aurora',
        'havana',
        'del mar',
        'original aurora',
        'iliff',
      ],
    },
    {
      id: 'southeast-aurora-smoky-hill',
      name: 'Southeast Aurora, Smoky Hill & Saddle Rock growth',
      shortName: 'SE Aurora / Smoky Hill',
      neighborhoods: [
        'Smoky Hill',
        'Saddle Rock',
        'Southshore edges',
        'Tallyn’s Reach edges',
        'E-470 residential pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, master-planned multifamily',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'E-470 and Parker Road peak congestion',
        'Longer empty miles from west-county staging yards',
      ],
      moverTips:
        'Collect HOA packets first. Share driveway photos and gate codes early. Price E-470 pairs honestly for any DTC- or Denver-linked job.',
      cityKeywords: [
        'smoky hill',
        'saddle rock',
        'southshore',
        'tallyns reach',
        'southeast aurora',
        'e-470',
      ],
    },
    {
      id: 'centennial-englewood',
      name: 'Centennial, Englewood & west Arapahoe family tracts',
      shortName: 'Centennial / Englewood',
      neighborhoods: [
        'Centennial',
        'Englewood',
        'Southglenn edges',
        'Arapahoe Road corridors',
        'Broadway / University edges',
      ],
      housingTypes: 'Two-story SFH, basements, townhomes, older multifamily in Englewood',
      challenges: [
        'I-25 / Arapahoe Road / Broadway congestion clusters',
        'Basement carries and driveway geometry',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey stairs and basement access. Book peak Saturdays early for larger SFH. Clarify Englewood vs Denver address jurisdiction on every estimate.',
      cityKeywords: [
        'centennial',
        'englewood',
        'southglenn',
        'arapahoe road',
        'littleton edges',
      ],
    },
    {
      id: 'parker-road-south',
      name: 'Parker Road corridor, Foxfield & south-county edges',
      shortName: 'Parker Road / South',
      neighborhoods: [
        'Parker Road corridor',
        'Foxfield',
        'Dove Valley edges',
        'South Aurora / Douglas line pockets',
      ],
      housingTypes: 'HOA SFH, larger lots, newer subdivision product',
      challenges: [
        'Parker Road peak freeflow collapse',
        'HOA and rural-lot hybrid access',
        'Cross-county pairs into Douglas and Denver',
      ],
      moverTips:
        'Photo driveway length and gate width. Price Parker Road / E-470 portal time. Confirm county line vs Parker / Castle Pines destinations.',
      cityKeywords: [
        'foxfield',
        'parker road',
        'dove valley',
        'south aurora',
        'arapahoe south',
      ],
    },
    {
      id: 'cherry-creek-schools-belt',
      name: 'Cherry Creek school-belt family corridors',
      shortName: 'Cherry Creek belt',
      neighborhoods: [
        'Cherry Creek school-area neighborhoods',
        'Cottonwood edges',
        'Willow Creek edges',
        'Homestead edges',
      ],
      housingTypes: 'Family SFH, HOA villages, townhomes',
      challenges: [
        'School-calendar move spikes late spring–summer',
        'HOA packets on planned tracts',
        'I-25 reverse-commute and event traffic near parks/retail',
      ],
      moverTips:
        'Book around district calendars when possible. Collect HOA COI early. Inventory finished basements and garage storage carefully.',
      cityKeywords: [
        'cherry creek',
        'willow creek',
        'homestead',
        'cottonwood',
        'centennial cherry creek',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Arapahoe County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA rules, DTC elevator soft costs, basement labor, and I-25 / E-470 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA master-planned rules',
        detail:
          'Gate lists, truck limits, and weekday-only windows push demand into peak pricing across Aurora and Centennial tracts.',
      },
      {
        title: 'DTC elevators, docks & building COIs',
        detail:
          'Greenwood Village and tech-corridor vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-25 · I-225 · E-470 · Parker Road congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Basement finishes & multi-level SFH inventory',
        detail:
          'South-metro family stock commonly adds flights, long driveway carries, and garage overflow.',
      },
      {
        title: 'Multi-county Aurora & Front Range empty miles',
        detail:
          'Adams, Douglas, Denver, and Jefferson destinations raise staging distance and address-jurisdiction complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$480–$1,600+',
        note: 'Higher with elevators, HOA gates, or peak I-25 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,100+',
        note: 'HOA and basement soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / high-rise / cross-zone',
        value: '$2,700–$8,200+',
        note: 'DTC towers and long E-470 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing and COI admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Arapahoe County move',
    intro:
      'School calendars, HOA approved hours, summer storms, winter freeze–thaw, and DTC elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear HOA gates, ease DTC freight windows, and reduce I-25 / I-225 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Cherry Creek–belt and Aurora SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Summer heat and afternoon storms',
        detail:
          'Front Range monsoon-pattern storms and heat slow exterior carries. Prefer early starts and tarp plans for open-path loads.',
      },
      {
        title: 'Winter: snow, ice, and HOA driveway rules',
        detail:
          'November–March adds icy walks and delayed gate access after overnight snow. Prefer flexible dates and early starts with ice contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'arapahoe-hoa-dtc-corridor',
      title: 'Arapahoe HOA, DTC elevator & south-metro corridor module',
      intro:
        'Arapahoe estimates fail more often on HOA packets, elevator windows, and I-25 / E-470 portal time than on packing skill alone.',
      bullets: [
        'Collect HOA gate lists, truck-length limits, approved hours, and COI naming before the survey is final.',
        'Collect building COI, elevator reservations, and dock rules for DTC / Greenwood Village product.',
        'Price portal-to-portal time for any pair that rides I-25, I-225, E-470, Parker Road, or Smoky Hill corridors at peak.',
        'Photo driveway grade, basement access, and garage clearance for Centennial and Aurora SFH stock.',
        'Clarify Aurora multi-county edges vs Centennial / Englewood / Denver addresses on every estimate.',
        'Verify Colorado PUC household goods (HHG) permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'south-metro-school-calendar',
      title: 'South-metro school-calendar & family SFH module',
      intro:
        'Many Arapahoe households move on district calendars that compress demand into a few peak weekends.',
      bullets: [
        'Ask about school start dates and lease ends at estimate time.',
        'Prefer mid-week windows when Saturday HOA slots are already full.',
        'Inventory finished basements, patio sets, and garage overflow explicitly — they drive crew hours.',
        'Match larger family inventories to crews experienced with multi-level HOA product.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Arapahoe County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town or HOA fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Arapahoe County is served by multiple districts, including Cherry Creek Schools, Aurora Public Schools, Littleton Public Schools edges, and others depending on address. Assignment is address-based — marketing names like DTC or Smoky Hill do not guarantee a campus.',
          },
          {
            title: 'Growth and capacity',
            detail:
              'Southeast Aurora and Parker Road growth corridors can see enrollment pressure. Ask the assigned district about capacity, boundary adjustments, and busing when touring.',
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
              'UCHealth, HealthONE / HCA campuses (including Aurora and south-metro facilities), and Children’s Hospital Colorado network options serve much of the county. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Smoky Hill or Centennial to preferred campuses — I-225 and E-470 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA SFH, DTC condos & Aurora multifamily',
            detail:
              'Expect master-planned SFH and townhomes across southeast Aurora and Centennial; condo/mid-rise stacks near DTC; and mixed garden multifamily through central Aurora.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from Englewood edges to Greenwood Village and Saddle Rock. Budget for HOA/condo dues, basement finish quality, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and towers often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Arapahoe areas fit whom',
        bullets: [
          {
            title: 'DTC / Greenwood Village professional density',
            detail:
              'Suits people prioritizing short employer access and amenity corridors — with elevator, parking, and COI tradeoffs on move day.',
          },
          {
            title: 'Centennial–Englewood established family tracts',
            detail:
              'Often appeals for schools, basements, and mature trees — with I-25 timing and Saturday competition.',
          },
          {
            title: 'Southeast Aurora / Smoky Hill growth',
            detail:
              'Attracts households seeking newer HOA product and space — with gate logistics and E-470 peaks.',
          },
          {
            title: 'Central Aurora mixed product',
            detail:
              'Fits renters and buyers chasing value and transit-adjacent options — with multifamily access variety and I-225 buffers.',
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
              'Denver Tech Center professional and tech employers, healthcare campuses, retail corridors, airport-adjacent logistics for eastern residents, and reverse-commutes into Denver concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households remain car-dependent outside light-rail nodes. I-25, I-225, E-470, Parker Road, and Smoky Hill peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple south metros',
            detail:
              'Arapahoe stacks DTC towers, Aurora subdivision fabric, Centennial family grids, and Parker Road growth — different from Denver’s loft/walk-up core or Douglas’s Highlands Ranch / Castle Rock master plans.',
          },
          {
            title: 'Climate',
            detail:
              'Front Range sun, summer thunderstorms, and winter freeze–thaw. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and jobs concentrate around DTC and retail nodes; outer HOA corridors feel more school- and family-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Arapahoe County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Arapahoe County — official site',
        href: 'https://www.arapahoegov.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Aurora',
        href: 'https://www.auroragov.org/',
        external: true,
        note: 'Multi-county city — confirm address jurisdiction',
      },
      {
        label: 'Cherry Creek Schools',
        href: 'https://www.cherrycreekschools.org/',
        external: true,
        note: 'Boundaries & calendars (where assigned)',
      },
      {
        label: 'CDOT COtrip — road conditions',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 / I-225 / E-470 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA fluency for Aurora / Centennial / Smoky Hill product; elevator/COI experience for DTC and Greenwood Village towers; honest I-25 · I-225 · E-470 · Parker Road timing for cross-zone pairs. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
