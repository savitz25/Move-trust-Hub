import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * City and County of Denver, CO — urban core (not Arapahoe DTC HOA, not Jefferson foothills).
 * RiNo/Capitol Hill/Highlands, elevators/COI, altitude newcomers, Colfax grid.
 */
export const denverCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'denver',
  hubTitle: 'Denver County Moving Intelligence Hub',
  eyebrow: 'Denver · City & County · RiNo, Highlands, Capitol Hill & I-25 spine',
  h1: 'Moving in Denver: RiNo Lofts, Highlands Stairs & Elevator Logistics at Mile High',
  heroOpener:
    'Denver is not a collar-suburb clone — it is loft and mid-rise product in RiNo and LoDo, walk-up denseness on Capitol Hill, porch-and-stair stock in the Highlands and Berkeley, and scattered elevators from downtown towers to Cherry Creek edges. A RiNo freight-elevator reservation, a Capitol Hill three-story walk-up with alley-only staging, a Highlands bungalow on a one-way, and a Cherry Creek condo COI do not share truck access or crew skill. I-25, I-70, I-225, US-6, Colfax, and the local arterial grid rewrite “local” estimates that ignore building packets, curb friction, and altitude-newcomer timelines. This hub is for people moving in the City and County of Denver — not a renamed Aurora HOA page or generic Front Range template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Denver elevator, street-access & altitude-newcomer logistics awareness · Curated listings',
  majorCorridors: 'I-25 · I-70 · I-225 · US-6 · Colfax · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Denver different',
    intro:
      'These are City and County of Denver realities — neighborhood micro-markets, elevator and walk-up stacks, Colfax-grid curb, and altitude newcomers — not Arapahoe south-metro HOA belts or Jefferson foothills driveway elevation.',
    bullets: [
      {
        title: 'Neighborhood micro-markets rewrite the job',
        detail:
          'RiNo, LoDo, Capitol Hill, Highlands, Park Hill, and Washington Park are not interchangeable “Denver” quotes. Building type, alley width, parking, and stair patterns change labor before packing skill matters.',
      },
      {
        title: 'Elevators, loading docks, and building COIs dominate vertical product',
        detail:
          'Downtown, LoDo, RiNo lofts, and Cherry Creek multifamily often require elevator reservations, certificate-of-insurance naming, padded protection, and timed dock or freight slots. A Highlands bungalow does not share that logistics stack.',
      },
      {
        title: 'Walk-ups, porches, and alley-only staging still define large tracts',
        detail:
          'Capitol Hill, Baker, and many central grids rely on stairs, narrow alleys, and limited legal curb. Crews that survey only by ZIP underprice flight counts and long carries.',
      },
      {
        title: 'I-25, I-70, and Colfax turn short map miles into billable hours',
        detail:
          'Highlands ↔ Cherry Creek, RiNo ↔ Washington Park, or downtown ↔ Park Hill pairs look local and still burn 30–75+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Altitude newcomers change inventory and timing',
        detail:
          'Households arriving from sea level often consolidate storage, stage temporary housing, and rebook hard dates after employer or lease surprises. Clarify partial loads and storage-in-transit early.',
      },
      {
        title: 'Street permits, event days, and one-ways reshape curb access',
        detail:
          'Ballpark, downtown, and festival-adjacent blocks can wipe staging overnight. Confirm temporary parking needs and prefer mid-week early starts when flexible.',
      },
      {
        title: 'City–county and multi-county Front Range pairs are routine',
        detail:
          'Households regularly move Denver ↔ Aurora, Lakewood, Arvada, Highlands Ranch, or Boulder County edges. Clarify addresses so Colorado PUC HHG vs FMCSA assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Denver access zones',
  zonesIntro:
    'Plan by RiNo/LoDo vertical and loft product, Capitol Hill and central walk-ups, Highlands–Berkeley west, Park Hill–east central grids, and Cherry Creek–southeast denseness — access rules cluster by neighborhood more than ZIP alone.',
  zones: [
    {
      id: 'rino-lodo-downtown',
      name: 'RiNo, LoDo, Ballpark & downtown towers',
      shortName: 'RiNo / LoDo / Downtown',
      neighborhoods: [
        'RiNo',
        'LoDo',
        'Ballpark',
        'Downtown Denver',
        'Union Station edges',
        'Five Points edges',
      ],
      housingTypes: 'Loft conversions, mid-rise and high-rise condo, denser multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow collapse',
        'I-25 / I-70 approach congestion into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo docks and street-staging options.',
      cityKeywords: [
        'rino',
        'lodo',
        'ballpark',
        'downtown denver',
        'union station',
        'five points',
      ],
    },
    {
      id: 'capitol-hill-central',
      name: 'Capitol Hill, Cheesman, Baker & central walk-ups',
      shortName: 'Capitol Hill / Central',
      neighborhoods: [
        'Capitol Hill',
        'Cheesman Park',
        'Baker',
        'Speer edges',
        'Civic Center edges',
        'Golden Triangle edges',
      ],
      housingTypes: 'Walk-up multifamily, older apartments, denser SFH and duplexes',
      challenges: [
        'Multi-flight stairs and long interior carries',
        'Alley-only or tight curb staging',
        'Colfax and one-way grid congestion',
      ],
      moverTips:
        'Survey stair counts and alley width. Confirm whether a smaller truck is required. Inventory porches and basements carefully.',
      cityKeywords: [
        'capitol hill',
        'cheesman',
        'baker',
        'speer',
        'golden triangle',
        'denver',
      ],
    },
    {
      id: 'highlands-west',
      name: 'Highlands, Berkeley, Sloan’s Lake & northwest Denver',
      shortName: 'Highlands / NW',
      neighborhoods: [
        'Highlands',
        'West Highlands',
        'Berkeley',
        'Sloan’s Lake',
        'Sunnyside',
        'Jefferson Park edges',
      ],
      housingTypes: 'Bungalows, renovated SFH, duplexes, limited multifamily',
      challenges: [
        'Porch stairs and basement carries',
        'Tree-lined curb with limited truck length',
        'US-6 / I-25 links and weekend restaurant-strip congestion',
      ],
      moverTips:
        'Photo driveway grade and curb options. Price US-6 / I-25 buffers for east-side unload pairs. Prefer early Saturday starts on busy commercial strips.',
      cityKeywords: [
        'highlands',
        'berkeley',
        'sloans lake',
        'sunnyside',
        'jefferson park',
        'west highlands',
      ],
    },
    {
      id: 'park-hill-east',
      name: 'Park Hill, Congress Park, City Park & east-central grids',
      shortName: 'Park Hill / East central',
      neighborhoods: [
        'Park Hill',
        'North Park Hill',
        'Congress Park',
        'City Park',
        'Mayfair edges',
        'Stapleton/Central Park edges',
      ],
      housingTypes: 'Larger SFH, bungalows, some multifamily and newer Central Park product',
      challenges: [
        'I-70 and east Colfax approach timing',
        'Mixed alley and driveway staging by block',
        'School-calendar Saturday demand May–August',
      ],
      moverTips:
        'Build I-70 buffers for airport-linked pairs. Survey tree canopy and curb. Clarify Central Park HOA rules when applicable.',
      cityKeywords: [
        'park hill',
        'congress park',
        'city park',
        'mayfair',
        'central park',
        'stapleton',
      ],
    },
    {
      id: 'cherry-creek-southeast',
      name: 'Cherry Creek, Wash Park, University & southeast denseness',
      shortName: 'Cherry Creek / SE',
      neighborhoods: [
        'Cherry Creek',
        'Washington Park',
        'University',
        'University Park',
        'Cory-Merrill',
        'Belcaro edges',
      ],
      housingTypes: 'Condo and multifamily stacks, denser SFH, higher-value inventories',
      challenges: [
        'Building COIs and elevator windows on denser product',
        'I-25 / University Blvd / Colorado Blvd congestion',
        'High-value packing expectations',
      ],
      moverTips:
        'Collect building packets early. Match high-value inventories to experienced crews. Price I-25 portal time for any Highlands- or airport-linked pair.',
      cityKeywords: [
        'cherry creek',
        'washington park',
        'wash park',
        'university',
        'cory-merrill',
        'belcaro',
      ],
    },
    {
      id: 'southwest-denver',
      name: 'Southwest Denver, Athmar & Federal corridor edges',
      shortName: 'Southwest Denver',
      neighborhoods: [
        'Athmar Park',
        'Ruby Hill',
        'Mar Lee',
        'Harvey Park edges',
        'Federal corridor residential',
        'Overland edges',
      ],
      housingTypes: 'Ranch and bi-level SFH, duplexes, garden apartments',
      challenges: [
        'US-285 / Federal / I-25 approach clusters',
        'Basement and garage inventories on older stock',
        'Cross-zone pairs into Jefferson or Arapahoe',
      ],
      moverTips:
        'Survey driveway turn radius and basement access. Price south-metro and Jeffco destinations portal-to-portal. Share photos of low-clearance garages.',
      cityKeywords: [
        'athmar park',
        'ruby hill',
        'harvey park',
        'overland',
        'southwest denver',
        'mar lee',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Denver moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, walk-up stairs, curb friction, and I-25 / I-70 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'RiNo, LoDo, downtown, and Cherry Creek vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, alleys & porch geometry',
        detail:
          'Capitol Hill and central grids add flight counts and awkward turns that flat-rate optimism underprices.',
      },
      {
        title: 'I-25 · I-70 · US-6 · Colfax congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Altitude-newcomer partial loads & storage',
        detail:
          'Temporary housing, double-touch inventories, and rebooked hard dates add trips and admin soft costs.',
      },
      {
        title: 'Multi-county Front Range empty miles',
        detail:
          'Aurora, Lakewood, Arvada, Douglas, and Boulder-edge destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,700+',
        note: 'Higher with elevators, walk-ups, or peak I-25 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,500–$4,400+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone SFH',
        value: '$2,900–$9,000+',
        note: 'Tower moves and long I-25 or I-70 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Denver move',
    intro:
      'Lease cycles, school calendars, summer thunderstorms, winter freeze–thaw, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-25 and I-70 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and elevator slots. Summer afternoon storms can pause open carries.',
      },
      {
        title: 'Winter: snow, ice, and freeze–thaw',
        detail:
          'November–March adds curb shrinkage, icy walks, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps.',
      },
      {
        title: 'Altitude and employer-driven mid-month spikes',
        detail:
          'Newcomer and professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'denver-elevator-walkup-altitude',
      title: 'Denver elevator, walk-up & altitude-newcomer logistics module',
      intro:
        'Denver estimates fail more often on elevator packets, stair surveys, curb/event friction, and newcomer partial-load timing than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo alley width, stair counts, porch geometry, and curb options for Capitol Hill and Highlands stock.',
        'Price portal-to-portal time for any pair that rides I-25, I-70, I-225, US-6, or Colfax at peak.',
        'Ask altitude newcomers about storage-in-transit, temporary housing, and split-load needs at estimate time.',
        'Plan around stadium, festival, and downtown event calendars when either address is core-adjacent.',
        'Clarify City and County of Denver vs Aurora / Lakewood / Arapahoe / Jefferson addresses on every estimate.',
        'Verify Colorado PUC household goods (HHG) permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'neighborhood-micro-markets',
      title: 'RiNo / Capitol Hill / Highlands micro-market module',
      intro:
        'A single “Denver rate” collapses when loft, walk-up, and bungalow product diverge a few miles apart.',
      bullets: [
        'Survey by neighborhood product — loft/tower, multi-flight walk-up, or renovated SFH — not by city name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-25 vs Colfax vs US-6).',
        'Match high-value Cherry Creek inventories and basement walk-up inventories to different crew experience.',
        'Expect different parking and permit norms even a few blocks apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Denver?',
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
              'Denver Public Schools (DPS) covers most City and County of Denver addresses, with a mix of neighborhood, magnet, and choice programs. Assignment is address- and application-based — marketing names like RiNo or Highlands do not guarantee a campus.',
          },
          {
            title: 'Choice and enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm DPS enrollment windows, transportation, and waitlists early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'DPS boundary and school-choice tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UCHealth, Denver Health, HCA/HealthONE campuses, and Children’s Hospital Colorado (metro network) anchor much of central metro care. Specialty options span the Front Range — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Highlands or Park Hill to preferred campuses — I-25 and Colfax congestion change “nearby” on paper. Transfer records early; plan altitude acclimation if arriving from sea level.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Lofts, walk-ups, bungalows & condo stacks',
            detail:
              'Expect loft and mid-rise product in RiNo/LoDo; dense walk-ups on Capitol Hill; renovated bungalows in Highlands and Park Hill; and higher-value SFH/condo mixes around Wash Park and Cherry Creek.',
          },
          {
            title: 'Cost variation inside the city',
            detail:
              'Purchase prices and rents vary sharply by neighborhood. Budget for HOA/condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and some neighborhood HOAs control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Denver areas fit whom',
        bullets: [
          {
            title: 'RiNo / LoDo / downtown urban lifestyle',
            detail:
              'Suits people prioritizing walkability, transit, and amenities — with elevator, parking, event-day, and COI tradeoffs on move day.',
          },
          {
            title: 'Capitol Hill and central density',
            detail:
              'Often appeals for transit access and mixed housing stock — with stairs, alleys, and one-way staging constraints.',
          },
          {
            title: 'Highlands–Berkeley northwest living',
            detail:
              'Attracts households seeking porch-line character and restaurants — with curb limits and US-6 / I-25 timing.',
          },
          {
            title: 'Park Hill, Wash Park & Cherry Creek edges',
            detail:
              'Fits buyers chasing larger SFH or denser amenity corridors — with school-calendar demand and higher inventory complexity.',
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
              'Downtown professional services, healthcare systems, tech and creative employers, government, and airport-adjacent logistics concentrate demand. Many households also reverse-commute to DTC, Boulder, or north-metro campuses.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, light rail, and bus. I-25, I-70, US-6, and Colfax peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One city, many Denvers',
            detail:
              'Denver stacks loft living, walk-up grids, bungalow neighborhoods, and amenity corridors — different from Arapahoe’s DTC/south-metro HOA belt or Jefferson’s foothills edge.',
          },
          {
            title: 'Climate and altitude',
            detail:
              'High desert-adjacent Front Range climate: intense sun, summer thunderstorms, cold snaps with snow, and rapid weather swings. Plan outdoor staging and altitude acclimation as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, sports, and outdoors culture concentrate heavily in-city; collar suburbs feel more HOA- and school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Denver resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City and County of Denver — official site',
        href: 'https://www.denvergov.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Denver Public Schools',
        href: 'https://www.dpsk12.org/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'RTD — transit & light rail',
        href: 'https://www.rtd-denver.com/',
        external: true,
        note: 'Commute planning for core addresses',
      },
      {
        label: 'CDOT COtrip — road conditions',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 / I-70 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for RiNo, LoDo, downtown, and Cherry Creek product; stair/alley fluency for Capitol Hill and Highlands stock; honest I-25 · I-70 · US-6 · Colfax timing for cross-zone pairs; altitude-newcomer partial-load readiness. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
