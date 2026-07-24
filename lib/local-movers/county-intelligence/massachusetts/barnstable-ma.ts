import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Barnstable County, MA — Cape Cod seasonal peaks, bridges, summer constraints.
 */
export const barnstableCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'barnstable',
  hubTitle: 'Barnstable County Moving Intelligence Hub',
  eyebrow: 'Barnstable · Cape Cod seasonal peaks, bridges & Route 6 logistics',
  h1: 'Moving in Barnstable County: Cape Cod Access, Bridge Timing & Seasonal Constraints',
  heroOpener:
    'Barnstable County is not a Boston suburb rename and not a year-round mainland template — it is Cape Cod with seasonal population spikes, Sagamore and Bourne bridge bottlenecks, Outer Cape narrow-road product, and summer freight windows that rewrite every “local” estimate. A Hyannis condo with elevator rules, a Provincetown dune-edge cottage, a Falmouth year-round colonial, and a Chatham seasonal home with a long sandy approach do not share truck access or crew skill. Route 6, Route 28, Route 132, and the Cape bridges turn short map miles into billable hours when Friday arrivals, tourist traffic, and ferry-linked demand collide. This hub is for people moving in Barnstable County — not a renamed South Shore page or generic Massachusetts script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'Route 6 · Route 28 · Route 132 · Cape bridges',
  whatMakesDifferent: {
    title: 'What makes moving in Barnstable County different',
    intro:
      'These are Barnstable and Cape Cod realities — bridge timing, summer constraints, and Outer Cape access — not Boston elevator towers or year-round inland HOA belts alone.',
    bullets: [
      {
        title: 'Cape bridges rewrite booking windows and portal time',
        detail:
          'Sagamore and Bourne bridge approaches stack Friday afternoon and Sunday return collapses. A mid-Cape pair that looks local on a winter map still burns hours at peak summer freeflow — price bridge buffers honestly.',
      },
      {
        title: 'Seasonal peaks compress crew availability island-wide on the Cape',
        detail:
          'Memorial Day through Labor Day, plus shoulder May and September weekends, fill first. Year-round residents and second-home owners compete for the same Saturday slots — book weeks ahead for peak summer moves.',
      },
      {
        title: 'Route 6, Route 28, Route 132, and Cape bridges dominate every cross-town pair',
        detail:
          'Hyannis ↔ Orleans, Falmouth ↔ Chatham, or Barnstable ↔ Provincetown pairs look regional and still become all-day jobs at peak. Price portal-to-portal, not odometer optimism.',
      },
      {
        title: 'Outer Cape and Provincetown product is a different move market',
        detail:
          'Wellfleet, Truro, and Provincetown stack narrow streets, limited truck length, dune-adjacent approaches, and seasonal rental turnovers that mid-Cape HOA quotes underprice. Match crew experience to Outer Cape geometry.',
      },
      {
        title: 'Second homes, short-term rentals, and ferry-linked timing reshape inventories',
        detail:
          'Many Cape moves involve partially furnished seasonal homes, storage units off-Cape, or Woods Hole ferry-adjacent logistics. Clarify full vs partial contents and hard key-exchange dates before the survey is final.',
      },
      {
        title: 'Mid-Cape denser product is not Outer Cape cottages',
        detail:
          'Hyannis, Barnstable Village, Yarmouth, and Dennis mix condos, elevators, and year-round multifamily with tourist-corridor congestion — different logistics from Chatham lanes or Truro sandy drives. Do not reuse one “Cape rate” across all three.',
      },
      {
        title: 'Multi-county and off-Cape pairs are routine',
        detail:
          'Households regularly move Barnstable ↔ Plymouth, Bristol, Boston metro, or off-Cape storage. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Barnstable County access zones',
  zonesIntro:
    'Plan by Upper Cape bridge approaches, Mid-Cape Hyannis corridor, Lower Cape villages, Outer Cape narrow stock, and Islands ferry-linked edges — access rules cluster by zone and season more than ZIP alone.',
  zones: [
    {
      id: 'upper-cape-bridges',
      name: 'Upper Cape & bridge approaches (Bourne, Sandwich, Falmouth edges)',
      shortName: 'Upper Cape',
      neighborhoods: [
        'Bourne',
        'Sandwich',
        'Falmouth',
        'Mashpee edges',
        'Sagamore / Bourne bridge approaches',
        'Woods Hole edges',
      ],
      housingTypes: 'Year-round SFH, condos, seasonal cottages, limited multifamily',
      challenges: [
        'Bridge freeflow collapse on peak Fridays and Sundays',
        'Ferry-adjacent congestion near Woods Hole',
        'Mixed HOA and seasonal-home access rules',
      ],
      moverTips:
        'Avoid peak bridge windows when possible. Build Sagamore/Bourne buffers into every off-Cape pair. Confirm ferry-day traffic if staging near Woods Hole.',
      cityKeywords: [
        'bourne',
        'sandwich',
        'falmouth',
        'mashpee',
        'woods hole',
        'sagamore',
      ],
    },
    {
      id: 'mid-cape-hyannis',
      name: 'Mid-Cape core (Barnstable, Hyannis, Yarmouth, Dennis)',
      shortName: 'Mid-Cape',
      neighborhoods: [
        'Hyannis',
        'Barnstable Village',
        'Centerville edges',
        'Yarmouth',
        'Dennis',
        'Osterville edges',
      ],
      housingTypes: 'Condos, year-round SFH, townhomes, denser multifamily, seasonal stock',
      challenges: [
        'Route 28 / Route 132 tourist congestion clusters',
        'Elevator and building rules on denser Hyannis product',
        'Airport and ferry-linked demand spikes',
      ],
      moverTips:
        'Collect condo packets early. Prefer mid-week early starts off-peak season. Price Route 28 freeflow honestly for any mid-Cape cross-town pair.',
      cityKeywords: [
        'hyannis',
        'barnstable',
        'yarmouth',
        'dennis',
        'centerville',
        'osterville',
      ],
    },
    {
      id: 'lower-cape',
      name: 'Lower Cape villages (Harwich, Brewster, Chatham, Orleans)',
      shortName: 'Lower Cape',
      neighborhoods: [
        'Harwich',
        'Brewster',
        'Chatham',
        'Orleans',
        'East Harwich edges',
        'South Chatham edges',
      ],
      housingTypes: 'Colonials, cottages, seasonal homes, limited multifamily',
      challenges: [
        'Narrow village streets and limited truck length',
        'Seasonal rental turnovers with hard key dates',
        'Route 6 / Route 28 freeflow variability',
      ],
      moverTips:
        'Survey curb and driveway with photos — many lanes cannot take full-length trucks. Confirm seasonal occupancy and HOA or association rules. Book summer weekends early.',
      cityKeywords: [
        'harwich',
        'brewster',
        'chatham',
        'orleans',
        'east harwich',
        'south chatham',
      ],
    },
    {
      id: 'outer-cape',
      name: 'Outer Cape (Eastham, Wellfleet, Truro, Provincetown)',
      shortName: 'Outer Cape',
      neighborhoods: [
        'Eastham',
        'Wellfleet',
        'Truro',
        'Provincetown',
        'North Truro edges',
        'National Seashore edges',
      ],
      housingTypes: 'Cottages, dune-adjacent stock, dense Provincetown multifamily, seasonal homes',
      challenges: [
        'Very limited truck length and tight village staging',
        'Sandy approaches and long carries from curb',
        'Peak summer tourism freeflow and short-term rental waves',
      ],
      moverTips:
        'Assume smaller trucks and extra labor on Provincetown and Truro stock. Photo every approach. Price all-day portal time for mid-Cape to Outer Cape pairs in summer.',
      cityKeywords: [
        'eastham',
        'wellfleet',
        'truro',
        'provincetown',
        'north truro',
        'outer cape',
      ],
    },
    {
      id: 'mashpee-falmouth-southwest',
      name: 'Southwest Cape (Mashpee, Falmouth villages, Cotuit edges)',
      shortName: 'Southwest Cape',
      neighborhoods: [
        'Mashpee',
        'Falmouth villages',
        'Cotuit edges',
        'Marstons Mills edges',
        'Popponesset edges',
      ],
      housingTypes: 'HOA planned tracts, year-round SFH, condos, seasonal product',
      challenges: [
        'HOA gate lists, truck-size limits, and move-hour windows',
        'Route 28 summer freeflow collapse',
        'Bridge-linked empty miles for off-Cape crews',
      ],
      moverTips:
        'Confirm HOA rules and gate access before the crew day. Survey cul-de-sac truck length. Build Upper Cape bridge buffers for mainland-linked pairs.',
      cityKeywords: [
        'mashpee',
        'falmouth',
        'cotuit',
        'marstons mills',
        'popponesset',
      ],
    },
    {
      id: 'hyannis-port-centerville',
      name: 'Barnstable south shore villages (Hyannis Port, Centerville, Osterville, Cotuit)',
      shortName: 'South shore villages',
      neighborhoods: [
        'Hyannis Port',
        'Centerville',
        'Osterville',
        'Cotuit',
        'Craigville edges',
        'West Hyannisport edges',
      ],
      housingTypes: 'Higher-value SFH, waterfront stock, seasonal estates, limited multifamily',
      challenges: [
        'Long carries, tight lanes, and limited staging near waterfront',
        'High-value inventories requiring experienced crews',
        'Seasonal occupancy and association rules',
      ],
      moverTips:
        'Inventory outdoor furniture and waterfront gear carefully. Confirm truck length on private lanes. Match high-value contents to experienced packing crews.',
      cityKeywords: [
        'hyannis port',
        'centerville',
        'osterville',
        'cotuit',
        'craigville',
        'west hyannisport',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Barnstable County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Bridge buffers, summer freeflow, narrow Outer Cape access, and condo soft costs separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Cape bridges & peak summer freeflow',
        detail:
          'Sagamore and Bourne approaches plus Route 6 / Route 28 congestion add portal hours before packing skill matters.',
      },
      {
        title: 'Outer Cape narrow streets & long carries',
        detail:
          'Provincetown, Truro, and Wellfleet geometry force smaller trucks and extra labor that mid-Cape flat rates underprice.',
      },
      {
        title: 'Condo packets, elevators & association rules',
        detail:
          'Hyannis and denser Mid-Cape product add admin soft costs and timed windows.',
      },
      {
        title: 'Seasonal second-home & short-term rental turnovers',
        detail:
          'Hard key dates and partial inventories compress lead time and raise crew demand June–September.',
      },
      {
        title: 'Off-Cape empty miles for mainland-based crews',
        detail:
          'Bridge staging distance and return empty miles raise costs for Plymouth- or Boston-based operators.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access, off-peak)',
        value: '$550–$1,900+',
        note: 'Higher with bridge peaks, elevators, or Outer Cape pairs',
      },
      {
        label: '2–3BR condo or cottage',
        value: '$1,600–$5,200+',
        note: 'Summer freeflow, narrow lanes, and association soft costs trend up',
      },
      {
        label: '3–4+ BR / waterfront / Outer Cape / cross-Cape SFH',
        value: '$3,500–$12,000+',
        note: 'Peak summer Outer Cape and high-value waterfront price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$240+/hr',
        note: 'Portal-to-portal; peak season and bridge buffers scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Barnstable County move',
    intro:
      'Tourist calendars, second-home openings, bridge peaks, winter quiet, and association slots reshape access and crew availability more than inland counties.',
    items: [
      {
        title: 'Best windows: mid-week early mornings, October–April',
        detail:
          'Off-season mid-week starts clear Route 6 and Route 28 freeflow, ease bridge approaches, and improve Outer Cape staging. Avoid Friday bridge peaks year-round when possible.',
      },
      {
        title: 'Peak season: Memorial Day–Labor Day (plus May/September shoulders)',
        detail:
          'Seasonal openings, rental turnovers, and family Saturdays fill first. Book 3–6 weeks ahead for peak summer weekends and association windows.',
      },
      {
        title: 'Bridge and tourist freeflow friction (summer weekends)',
        detail:
          'Sagamore/Bourne collapses and Route 28 tourist traffic rewrite portal time. Prefer Tuesday–Thursday load windows and early starts for any pair that crosses or approaches the bridges.',
      },
      {
        title: 'Shoulder and second-home key-exchange spikes',
        detail:
          'May openings and September closings often land mid-week with hard key dates. Confirm storage-in-transit, partial loads, and ferry-adjacent timing early.',
      },
    ],
  },
  specialized: [
    {
      id: 'cape-bridge-seasonal',
      title: 'Cape bridge, seasonal peak & corridor logistics module',
      intro:
        'Barnstable estimates fail more often on bridge timing, summer freeflow, and Outer Cape truck limits than on packing skill alone.',
      bullets: [
        'Price Sagamore and Bourne bridge buffers for any off-Cape or Upper Cape pair — especially Friday and Sunday peaks.',
        'Photo truck length, sandy approaches, and curb options for Outer Cape and village stock.',
        'Collect condo/association packets for Hyannis and denser Mid-Cape product before the survey is final.',
        'Clarify full vs partial seasonal inventories and hard key-exchange dates on second homes.',
        'Prefer mid-week early starts June–September; avoid pure odometer optimism on Route 6 / Route 28 pairs.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'mid-vs-outer-cape-micro',
      title: 'Mid-Cape vs Outer Cape vs Upper Cape micro-market module',
      intro:
        'A single “Cape Cod rate” collapses when Hyannis condos, Chatham cottages, and Provincetown lanes diverge along the same peninsula.',
      bullets: [
        'Survey by product and zone — bridge approach, Mid-Cape condo, Lower Cape village, or Outer Cape cottage — not by county name alone.',
        'Ask which approach corridors the crew will actually use (Route 6 vs Route 28 vs Route 132) at load and unload.',
        'Match high-value waterfront inventories and dune-edge cottages to different crew experience.',
        'Expect different truck-length norms even a few towns apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Barnstable County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures year-round vs seasonal fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Barnstable, Falmouth, Sandwich, Nauset (Lower/Outer Cape), and other districts cover the Cape by town and region. Assignment is address-based — “Cape Cod” marketing does not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Year-round enrollment patterns differ from seasonal population. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year as a year-round household.',
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
              'Cape Cod Hospital (Hyannis) and Falmouth Hospital anchor acute care; clinics and specialty options thin toward the Outer Cape. Confirm insurance networks and peak-season ER wait realities for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Provincetown, Chatham, or Falmouth to Hyannis — Route 6 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Year-round, seasonal, condo & waterfront mix',
            detail:
              'Expect denser product around Hyannis; HOA and planned tracts in Mashpee and parts of Upper Cape; village cottages on the Lower Cape; and tight, high-demand stock in Provincetown and waterfront pockets.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by town and water proximity. Budget for seasonal insurance, flood/wind considerations, HOA dues, and winterization on second homes.',
          },
          {
            title: 'Building and association governance',
            detail:
              'Condo associations and village rules often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Barnstable areas fit whom',
        bullets: [
          {
            title: 'Mid-Cape year-round convenience',
            detail:
              'Suits people prioritizing services, airport access, and healthcare — with Route 28 congestion and denser-building tradeoffs on move day.',
          },
          {
            title: 'Upper Cape bridge-adjacent living',
            detail:
              'Often appeals for mainland access and Falmouth amenities — with bridge freeflow realism and ferry-day traffic.',
          },
          {
            title: 'Lower Cape village character',
            detail:
              'Attracts households chasing quieter villages and coastal scale — with narrow-street staging and seasonal tourism.',
          },
          {
            title: 'Outer Cape and Provincetown lifestyle',
            detail:
              'Fits people prioritizing distinctive culture and seashore access — with severe truck limits, summer crowds, and longer portal times to mid-Cape services.',
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
              'Healthcare, hospitality and tourism, retail, marine trades, education, government, and remote-work year-round households concentrate demand. Many jobs are seasonal; many professional households reverse-commute off-Cape.',
          },
          {
            title: 'Commute realism',
            detail:
              'Driving dominates. Route 6, Route 28, Route 132, and the Cape bridges define peak pain. Test drive summer Friday and mid-week winter routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One peninsula, many Capes',
            detail:
              'Barnstable stacks bridge-adjacent Upper Cape, service-heavy Mid-Cape, village Lower Cape, and Outer Cape density — different from South Coast mill cities or Boston-metro corridors.',
          },
          {
            title: 'Climate',
            detail:
              'Maritime climate with milder winters than inland MA, heavy summer tourism, and wind/salt exposure on open carries. Plan outdoor staging and shoulder-season contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Summer pace and winter quiet diverge sharply. Visit in both peak tourist and off-season weeks when deciding on year-round fit.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Barnstable County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Town of Barnstable',
        href: 'https://www.townofbarnstable.us/',
        external: true,
        note: 'Municipal services (Barnstable / Hyannis area)',
      },
      {
        label: 'Cape Cod Commission',
        href: 'https://www.capecodcommission.org/',
        external: true,
        note: 'Regional planning & Cape context',
      },
      {
        label: 'MassDOT — Cape Cod bridges',
        href: 'https://www.mass.gov/cape-cod-canal-bridges',
        external: true,
        note: 'Sagamore & Bourne bridge project / travel context',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'Route 6 / Route 28 / bridge approaches before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Cape bridge timing fluency; Outer Cape narrow-street and small-truck experience for Provincetown–Truro stock; honest Route 6 · Route 28 · Route 132 · Cape bridges portal time; summer peak booking discipline. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
