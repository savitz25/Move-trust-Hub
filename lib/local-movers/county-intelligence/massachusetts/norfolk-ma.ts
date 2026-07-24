import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Norfolk County, MA — south-metro / Quincy / Brookline-adjacent
 * (not Suffolk Boston core, not Middlesex Cambridge density, not Plymouth South Shore alone).
 */
export const norfolkCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'norfolk',
  hubTitle: 'Norfolk County Moving Intelligence Hub',
  eyebrow: 'Norfolk · Quincy density, Brookline-adjacent & south-metro suburbs',
  h1: 'Moving in Norfolk County: Quincy Access, Brookline-Adjacent Density & South-Metro Suburbs',
  heroOpener:
    'Norfolk County is not a Boston brownstone clone and not a pure South Shore cottage template — it is Quincy and Weymouth-edge multifamily density with elevators and scarce curb, Brookline-adjacent and Newton-border product that feels almost urban, and a broad south-metro belt of Dedham, Needham, Wellesley edges, Norwood, Braintree, and Milton family housing. A Quincy high-rise COI packet, a Brookline-adjacent walk-up with tight curb, a Needham two-story on a cul-de-sac, and a Stoughton ranch do not share truck access or crew skill. I-93, I-95, Route 3, Route 28, and Route 1A rewrite “local” estimates that ignore south-metro freeflow and mixed urban-to-suburb product. This hub is for people moving in Norfolk County — not a renamed Suffolk page or Plymouth coastal script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · South-metro, Quincy & Brookline-adjacent logistics awareness · Curated listings',
  majorCorridors: 'I-93 · I-95 · Route 3 · Route 28 · Route 1A',
  whatMakesDifferent: {
    title: 'What makes moving in Norfolk County different',
    intro:
      'These are Norfolk south-metro realities — Quincy density, Brookline-adjacent access, and family-suburb HOA product — not Suffolk’s Boston street-permit core, Middlesex’s Cambridge–128 contrast, or Plymouth’s historic-town South Shore logistics alone.',
    bullets: [
      {
        title: 'Quincy and coastal-edge density is a different market than inland family suburbs',
        detail:
          'Quincy Center, North Quincy, and denser Weymouth-edge product stack elevators, apartments, and curb friction. Needham, Westwood, Medfield, and similar belts stack driveways, HOA rules, and two-story SFH. A single “Norfolk rate” collapses across that contrast.',
      },
      {
        title: 'Brookline-adjacent and northwest Norfolk feel almost urban',
        detail:
          'Brookline (Norfolk), Chestnut Hill edges, and near-Boston pockets bring walk-ups, condo COIs, scarce legal curb, and Boston-linked freeflow that diverge from Norwood or Walpole driveway staging a few towns south.',
      },
      {
        title: 'I-93, I-95, Route 3, Route 28, and Route 1A turn short map miles into billable hours',
        detail:
          'Quincy ↔ Needham, Brookline ↔ Braintree, or Dedham ↔ Milton pairs look local and still burn 35–80+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Elevators and building COIs appear more often than pure suburb marketing suggests',
        detail:
          'Quincy waterfront and Center towers, Brookline multifamily, and newer Braintree or Dedham condo stacks require elevator reservations and certificate-of-insurance naming. A Milton colonial does not share that logistics stack.',
      },
      {
        title: 'School-calendar and professional reverse-commute demand reshape peaks',
        detail:
          'Strong district towns and Boston reverse-commuters compress Saturday family moves and mid-month professional windows. Book hard dates early in late spring through early fall.',
      },
      {
        title: 'South-metro apartment turnover along transit and highway spines is not SFH product',
        detail:
          'Braintree, Quincy, and Norwood multifamily corridors generate lease-end volume with guest-parking maps and elevator rules that diverge from cul-de-sac surveys.',
      },
      {
        title: 'Multi-county south and west metro pairs are routine',
        detail:
          'Households regularly move Norfolk ↔ Suffolk, Middlesex, Plymouth, Bristol, or Worcester County edges. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Norfolk County access zones',
  zonesIntro:
    'Plan by Quincy–Braintree density, Brookline-adjacent northwest pockets, Dedham–Needham–Wellesley-edge family belts, central Route 1 / I-95 towns, and southern Norwood–Walpole–Stoughton corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'quincy-braintree',
      name: 'Quincy, Braintree & coastal-edge density',
      shortName: 'Quincy / Braintree',
      neighborhoods: [
        'Quincy',
        'Quincy Center',
        'North Quincy',
        'Braintree',
        'Wollaston edges',
        'Quincy waterfront edges',
      ],
      housingTypes: 'High-rise and mid-rise condo, apartments, triple-deckers, denser SFH pockets',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Route 3 / I-93 / SE Expressway approach congestion',
        'Mixed tower and walk-up product a few blocks apart',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Price Route 3 and I-93 buffers for Boston-linked pairs.',
      cityKeywords: [
        'quincy',
        'braintree',
        'north quincy',
        'wollaston',
        'quincy center',
        'quincy ma',
      ],
    },
    {
      id: 'brookline-adjacent',
      name: 'Brookline, Chestnut Hill edges & northwest Norfolk density',
      shortName: 'Brookline-adjacent',
      neighborhoods: [
        'Brookline',
        'Chestnut Hill edges',
        'Coolidge Corner edges',
        'Brookline Village edges',
        'Washington Square edges',
        'Near-Boston Norfolk pockets',
      ],
      housingTypes: 'Condo elevators, walk-up multifamily, denser SFH and duplexes',
      challenges: [
        'Building COIs and scarce legal curb',
        'Multi-flight stairs on older stock',
        'Boston-linked arterial and Beacon Street congestion',
      ],
      moverTips:
        'Collect building packets early. Survey stair counts and curb options with photos. Confirm street-permit norms when curb is restricted.',
      cityKeywords: [
        'brookline',
        'chestnut hill',
        'coolidge corner',
        'brookline village',
        'washington square',
        'brookline ma',
      ],
    },
    {
      id: 'milton-dedham-westwood',
      name: 'Milton, Dedham, Westwood & inner south-metro family belts',
      shortName: 'Milton / Dedham',
      neighborhoods: [
        'Milton',
        'Dedham',
        'Westwood',
        'Readville edges',
        'East Dedham edges',
        'Milton Hill edges',
      ],
      housingTypes: 'Colonial and cape SFH, some multifamily, townhomes',
      challenges: [
        'I-95 / I-93 / Route 28 freeflow clusters',
        'Driveway grade and tree-lined curb limits',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey driveway turn radius and curb. Build I-95 buffers for westbound pairs. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'milton',
        'dedham',
        'westwood',
        'readville',
        'milton ma',
        'dedham ma',
      ],
    },
    {
      id: 'needham-wellesley-dover',
      name: 'Needham, Wellesley edges, Dover & northwest family corridors',
      shortName: 'Needham / Wellesley edge',
      neighborhoods: [
        'Needham',
        'Wellesley edges',
        'Dover',
        'Needham Heights edges',
        'Charles River corridor edges',
        'Highland Avenue corridors',
      ],
      housingTypes: 'Higher-value SFH, townhomes, limited condo elevators',
      challenges: [
        'HOA rules and high-value packing expectations',
        'I-95 / Route 128 / Route 135 approach clusters',
        'Cul-de-sac truck length and gate lists',
      ],
      moverTips:
        'Match high-value inventories to experienced crews. Confirm HOA move hours and truck-size limits. Price 128 portal time for Cambridge- or Boston-linked pairs.',
      cityKeywords: [
        'needham',
        'wellesley',
        'dover',
        'needham heights',
        'needham ma',
        'wellesley ma',
      ],
    },
    {
      id: 'norwood-walpole-canton',
      name: 'Norwood, Walpole, Canton & central Norfolk corridors',
      shortName: 'Norwood / Canton',
      neighborhoods: [
        'Norwood',
        'Walpole',
        'Canton',
        'Norwood Center edges',
        'Canton Center edges',
        'Route 1 corridor residential',
      ],
      housingTypes: 'Ranch and colonial SFH, apartments, townhomes, industrial-edge rentals',
      challenges: [
        'I-95 / Route 1 / Route 138 congestion clusters',
        'Apartment turnover and guest-parking friction',
        'Cross-zone pairs into Suffolk or Bristol edges',
      ],
      moverTips:
        'Price I-95 portal time honestly for Boston-linked pairs. Survey apartment elevator/stair access and parking maps. Clarify town jurisdiction on every estimate.',
      cityKeywords: [
        'norwood',
        'walpole',
        'canton',
        'norwood ma',
        'walpole ma',
        'canton ma',
      ],
    },
    {
      id: 'stoughton-sharon-foxborough',
      name: 'Stoughton, Sharon, Foxborough & southern Norfolk edges',
      shortName: 'Southern Norfolk',
      neighborhoods: [
        'Stoughton',
        'Sharon',
        'Foxborough',
        'Mansfield edges',
        'Event-day Route 1 edges',
        'Southern SFH belts',
      ],
      housingTypes: 'SFH, townhomes, apartments, event-adjacent multifamily pockets',
      challenges: [
        'I-95 / Route 1 / Route 27 freeflow and event-day collapse',
        'Longer portal time to Boston core',
        'Mixed HOA and older driveway stock',
      ],
      moverTips:
        'Plan around stadium and major-event calendars when either address is Foxborough-adjacent. Build I-95 buffers. Survey driveway and HOA rules on planned tracts.',
      cityKeywords: [
        'stoughton',
        'sharon',
        'foxborough',
        'foxboro',
        'stoughton ma',
        'sharon ma',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Norfolk County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, Brookline-adjacent curb, HOA friction, and I-93 / I-95 / Route 3 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Quincy elevators, docks & building COIs',
        detail:
          'Coastal-edge towers and denser multifamily add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Brookline-adjacent stairs & scarce curb',
        detail:
          'Walk-ups and tight street staging add flight counts and permit friction that flat-rate optimism underprices.',
      },
      {
        title: 'I-93 · I-95 · Route 3 · Route 28 · Route 1A congestion',
        detail:
          'South-metro and city-linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & higher-value west Norfolk SFH',
        detail:
          'Needham, Wellesley-edge, and similar product add admin soft costs and packing complexity.',
      },
      {
        title: 'Multi-county south-metro empty miles',
        detail:
          'Suffolk, Middlesex, Plymouth, and Bristol destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$525–$1,850+',
        note: 'Higher with elevators, Brookline walk-ups, or peak Route 3 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,600–$4,600+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone SFH',
        value: '$3,100–$9,800+',
        note: 'Tower moves and long I-95 or Route 3 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$230+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Norfolk County move',
    intro:
      'Lease cycles, school calendars, event-day freeflow near Foxborough, winter curb friction, and elevator/HOA slots reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease Quincy freight windows, and reduce I-93 / I-95 / Route 3 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and HOA windows.',
      },
      {
        title: 'Winter: snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy walks, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps.',
      },
      {
        title: 'Event and professional mid-month spikes',
        detail:
          'Foxborough-adjacent event calendars and Boston reverse-commute professional moves can land mid-week or mid-month. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-metro-quincy-brookline',
      title: 'South-metro Quincy, Brookline-adjacent & HOA logistics module',
      intro:
        'Norfolk estimates fail more often on elevator packets, Brookline-adjacent curb, HOA rules, and I-95 / Route 3 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final on Quincy and Brookline multifamily.',
        'Photo stair counts, curb options, and truck length for walk-up stock near the Boston line.',
        'Confirm HOA gate lists, truck-size limits, and move hours on Needham–Westwood–Sharon planned tracts.',
        'Price portal-to-portal time for any pair that rides I-93, I-95, Route 3, Route 28, or Route 1A at peak.',
        'Plan around stadium and major-event calendars when either address is Foxborough-adjacent.',
        'Clarify Quincy vs Brookline vs Needham vs Walpole addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Norfolk County?',
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
              'Independent town and city districts cover Norfolk — Quincy, Brookline, Milton, Needham, Dedham, Norwood, Sharon, and many others. Assignment is address-based — marketing names like “south metro” do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'High-demand districts and boundary edges can be competitive. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Massachusetts DESE data, and campus visits beat ranking screenshots alone.',
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
              'South Shore Hospital, Beth Israel and Mass General Brigham network campuses, local community hospitals, and Boston specialty centers anchor care for Norfolk households. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Quincy, Needham, or Walpole to preferred campuses — I-93, I-95, and Route 3 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Towers, walk-ups, colonials & HOA tracts',
            detail:
              'Expect condo towers and apartments in Quincy; denser multifamily near Brookline; colonials and capes through Milton–Dedham–Needham; and mixed SFH/townhome product through Norwood–Sharon–Foxborough.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from Brookline-adjacent pockets to southern towns. Budget for condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Norfolk areas fit whom',
        bullets: [
          {
            title: 'Quincy and coastal-edge density',
            detail:
              'Suits people prioritizing transit to Boston, waterfront adjacency, and apartment or condo living — with elevator, curb, and Route 3 tradeoffs on move day.',
          },
          {
            title: 'Brookline-adjacent urban-edge living',
            detail:
              'Often appeals for walkability and Boston access — with stairs, COI, and scarce curb staging constraints.',
          },
          {
            title: 'Milton–Dedham–Needham family corridors',
            detail:
              'Attracts households chasing schools and porch-line SFH — with driveway logistics and I-95 timing.',
          },
          {
            title: 'Norwood–Sharon–Foxborough southern options',
            detail:
              'Fits buyers seeking more space or relative value — with longer peak portal time and event-day freeflow near major venues.',
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
              'Boston reverse commutes, Quincy and Braintree commercial centers, Route 1 / I-95 employment clusters, healthcare, education, and event-adjacent hospitality concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, Red Line and Commuter Rail, and buses. I-93, I-95, Route 3, Route 28, and Route 1A peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South-metro variety in one county',
            detail:
              'Norfolk stacks near-Boston density, classic inner suburbs, and southern family towns — different from Suffolk’s core urban product or Plymouth’s South Shore historic-town rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate: humid summers, cold winters with snow, and coastal wind exposure near Quincy. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Brookline-adjacent and Quincy corridors feel more urban; inland towns skew school-calendar and trail oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Norfolk County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Quincy',
        href: 'https://www.quincyma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Town of Brookline',
        href: 'https://www.brooklinema.gov/',
        external: true,
        note: 'Permits, services & town info',
      },
      {
        label: 'MBTA — Red Line & Commuter Rail',
        href: 'https://www.mbta.com/',
        external: true,
        note: 'Commute planning for Quincy and south-metro towns',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-93 / I-95 / Route 3 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Quincy and Brookline multifamily; stair/curb fluency for near-Boston walk-ups; HOA driveway readiness for Needham–Westwood–Sharon SFH; honest I-93 · I-95 · Route 3 · Route 28 · Route 1A timing for cross-zone pairs. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
