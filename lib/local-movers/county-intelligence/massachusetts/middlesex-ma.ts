import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Middlesex County, MA — Cambridge/Somerville density + western suburbs contrast
 * (not Suffolk Boston brownstone core, not Norfolk south-metro, not Essex North Shore).
 */
export const middlesexCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'middlesex',
  hubTitle: 'Middlesex County Moving Intelligence Hub',
  eyebrow: 'Middlesex · Cambridge density, Somerville stairs & Route 128 suburbs',
  h1: 'Moving in Middlesex County: Cambridge Density, Somerville Walk-Ups & Western Suburb Contrast',
  heroOpener:
    'Middlesex County is not a Boston brownstone clone and not a single suburban template — it is Cambridge and Somerville walk-up density with tight curb and elevator towers near Kendall and Alewife, inner-ring triple-decker and two-family stock from Medford to Malden, and a sharp western contrast of Lexington, Concord, Newton edges, and Route 128 / I-95 belt family product. A Somerville triple-decker with no driveway, a Kendall Square high-rise COI packet, a Waltham condo elevator, and a Concord two-story on a cul-de-sac do not share truck access or crew skill. I-95, I-93, Route 2, Route 3, and the Route 128/I-95 belt rewrite “local” estimates that ignore density stairs and suburb HOA gates in the same county. This hub is for people moving in Middlesex County — not a renamed Suffolk page or generic 128-loop script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Cambridge–Somerville density & western-suburb logistics awareness · Curated listings',
  majorCorridors: 'I-95 · I-93 · Route 2 · Route 3 · Route 128/I-95 belt',
  whatMakesDifferent: {
    title: 'What makes moving in Middlesex County different',
    intro:
      'These are Middlesex realities — east-end urban density versus western and northern suburb product, university calendars, and Route 128 freeflow — not Suffolk’s Boston street-permit core, Norfolk south-metro belts, or Essex coastal towns alone.',
    bullets: [
      {
        title: 'Cambridge and Somerville density is a different move market than the western suburbs',
        detail:
          'Kendall, Central, Harvard Square edges, Union Square, Davis, and Teele stack walk-ups, elevators, scarce curb, and long carries. Lexington, Concord, Weston edges, and similar belts stack driveways, HOA rules, and two-story SFH. A single “Middlesex rate” collapses across that contrast.',
      },
      {
        title: 'Elevators and building COIs dominate Cambridge core and denser multifamily',
        detail:
          'Kendall Square, North Point edges, Alewife, and many newer Cambridge and Somerville buildings require elevator reservations, certificate-of-insurance naming, and timed freight windows. A Arlington two-family does not share that logistics stack.',
      },
      {
        title: 'Triple-deckers, two-families, and multi-flight stairs still define large tracts',
        detail:
          'Somerville, Medford, Malden, Everett edges, and parts of Cambridge rely on stairs, narrow streets, and limited legal curb. Crews that survey only by ZIP underprice flight counts and long carries.',
      },
      {
        title: 'I-95, I-93, Route 2, Route 3, and the 128 belt turn short map miles into billable hours',
        detail:
          'Somerville ↔ Lexington, Cambridge ↔ Burlington, or Medford ↔ Framingham-edge pairs look local and still burn 40–90+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'University and biotech calendars reshape east Middlesex demand',
        detail:
          'Harvard, MIT, Tufts-adjacent, and Kendall employer moves compress volume into academic and mid-month professional windows. Temporary housing and storage-in-transit are common — clarify partial loads early.',
      },
      {
        title: 'Western and northern suburb HOA and driveway product is not city-core staging',
        detail:
          'Lexington, Concord, Carlisle edges, Acton, Chelmsford, and Billerica mix cul-de-sac truck length, gate lists, and school-calendar Saturday demand that diverge from Cambridge curb rules a few miles east.',
      },
      {
        title: 'Multi-county Greater Boston and Merrimack pairs are routine',
        detail:
          'Households regularly move Middlesex ↔ Suffolk, Essex, Norfolk, Worcester County edges, or New Hampshire border towns. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Middlesex County access zones',
  zonesIntro:
    'Plan by Cambridge–Somerville urban density, inner-north triple-decker belts, Newton–Waltham edges, western Route 2 / 128 family suburbs, and northern I-93 / Route 3 corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'cambridge-core',
      name: 'Cambridge core (Kendall, Central, Harvard & North Cambridge edges)',
      shortName: 'Cambridge core',
      neighborhoods: [
        'Kendall Square',
        'Central Square',
        'Harvard Square edges',
        'East Cambridge',
        'North Cambridge edges',
        'Porter Square edges',
      ],
      housingTypes: 'High-rise and mid-rise condo, walk-up multifamily, denser triple-deckers',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Scarce legal curb and university-calendar congestion',
        'Memorial Drive / Mass Ave / I-93 approach freeflow',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo docks and street-staging options; confirm permit needs when curb is restricted.',
      cityKeywords: [
        'cambridge',
        'kendall square',
        'central square',
        'harvard square',
        'east cambridge',
        'porter square',
      ],
    },
    {
      id: 'somerville-medford',
      name: 'Somerville, Medford & inner-north walk-up density',
      shortName: 'Somerville / Medford',
      neighborhoods: [
        'Somerville',
        'Union Square',
        'Davis Square',
        'Medford',
        'Ball Square edges',
        'Winter Hill edges',
      ],
      housingTypes: 'Triple-deckers, two- and three-family, denser apartments, limited elevators',
      challenges: [
        'Multi-flight stairs and long interior carries',
        'Narrow streets with limited truck length',
        'I-93 / Route 16 / McGrath Highway congestion clusters',
      ],
      moverTips:
        'Survey stair counts, unit floor, and curb options with photos. Confirm whether a smaller truck is required. Inventory porches and basements carefully.',
      cityKeywords: [
        'somerville',
        'union square',
        'davis square',
        'medford',
        'ball square',
        'winter hill',
      ],
    },
    {
      id: 'malden-everett-arlington',
      name: 'Malden, Everett, Arlington & northeast inner ring',
      shortName: 'Malden / Arlington ring',
      neighborhoods: [
        'Malden',
        'Everett',
        'Arlington',
        'Melrose edges',
        'Medford edges',
        'Belmont edges',
      ],
      housingTypes: 'Two-family, triple-decker, ranch and colonial SFH, denser apartments',
      challenges: [
        'Mixed stair and driveway product by block',
        'I-93 / Route 16 / Route 60 freeflow',
        'Apartment turnover along transit corridors',
      ],
      moverTips:
        'Clarify elevator vs stair access on multifamily. Price I-93 buffers for Boston-linked pairs. Survey driveway turn radius on SFH stock.',
      cityKeywords: [
        'malden',
        'everett',
        'arlington',
        'melrose',
        'belmont',
        'medford',
      ],
    },
    {
      id: 'newton-waltham-watertown',
      name: 'Newton, Waltham, Watertown & southwest Middlesex edges',
      shortName: 'Newton / Waltham',
      neighborhoods: [
        'Newton',
        'Waltham',
        'Watertown',
        'Newton Centre edges',
        'West Newton edges',
        'Waltham watch-city corridors',
      ],
      housingTypes: 'Colonial and Victorian SFH, townhomes, condo elevators, denser multifamily pockets',
      challenges: [
        'Building COIs on denser product and HOA rules on planned tracts',
        'I-90 / I-95 / Route 128 / Route 16 approach clusters',
        'High-value inventories and multi-story SFH labor',
      ],
      moverTips:
        'Collect building packets early for condo product. Survey driveway grade and curb for Newton SFH. Price 128 and Mass Pike buffers for cross-zone pairs.',
      cityKeywords: [
        'newton',
        'waltham',
        'watertown',
        'newton centre',
        'west newton',
        'waltham ma',
      ],
    },
    {
      id: 'western-128-route2',
      name: 'Western suburbs (Lexington, Concord, Acton, Burlington & 128 belt)',
      shortName: 'Western / 128 belt',
      neighborhoods: [
        'Lexington',
        'Concord',
        'Acton',
        'Burlington',
        'Bedford',
        'Lincoln edges',
      ],
      housingTypes: 'Two-story SFH, townhomes, HOA planned tracts, some multifamily',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'Route 2 / I-95 / Route 128 peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules and gate access before the crew day. Survey driveway turn radius and cul-de-sac truck length. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'lexington',
        'concord',
        'acton',
        'burlington',
        'bedford',
        'lincoln',
      ],
    },
    {
      id: 'northern-route3',
      name: 'Northern Middlesex (Lowell, Chelmsford, Billerica, Tewksbury edges)',
      shortName: 'Northern / Route 3',
      neighborhoods: [
        'Lowell',
        'Chelmsford',
        'Billerica',
        'Tewksbury',
        'Dracut edges',
        'Tyngsborough edges',
      ],
      housingTypes: 'Apartments, mill-conversion lofts, ranch and colonial SFH, denser multifamily',
      challenges: [
        'Route 3 / I-495 / I-93 corridor congestion clusters',
        'Mixed urban mill-stock elevators and suburban driveway access',
        'Cross-state NH-border pairs and authority clarity',
      ],
      moverTips:
        'Price Route 3 portal time honestly for Cambridge- or 128-linked pairs. Survey mill-conversion elevator access separately from suburban SFH. Clarify Massachusetts vs New Hampshire addresses near the border.',
      cityKeywords: [
        'lowell',
        'chelmsford',
        'billerica',
        'tewksbury',
        'dracut',
        'tyngsborough',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Middlesex County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Density stairs, elevator soft costs, HOA friction, and I-95 / I-93 / Route 2 / 128 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Cambridge–Somerville stairs, curb & elevators',
        detail:
          'Walk-ups, triple-deckers, and Kendall-area towers add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Western suburb HOA gates & two-story SFH labor',
        detail:
          'Lexington, Concord, and 128-belt product add admin soft costs, driveway geometry, and high Saturday demand.',
      },
      {
        title: 'I-95 · I-93 · Route 2 · Route 3 · 128 congestion',
        detail:
          'East–west and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'University & biotech partial loads / storage',
        detail:
          'Temporary housing, double-touch inventories, and rebooked hard dates add trips and admin soft costs.',
      },
      {
        title: 'Multi-county Greater Boston empty miles',
        detail:
          'Suffolk, Essex, Norfolk, Worcester-edge, and NH-border destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,950+',
        note: 'Higher with elevators, Somerville walk-ups, or peak 128 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,700–$4,900+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone SFH',
        value: '$3,300–$10,500+',
        note: 'Tower moves and long Route 2 or I-93 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$240+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Middlesex County move',
    intro:
      'Lease cycles, academic calendars, biotech employer windows, school peaks, winter curb friction, and elevator/HOA slots reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb in Cambridge–Somerville, ease freight windows, and reduce I-93 / Route 2 / 128 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover, academic moves, and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and western HOA windows.',
      },
      {
        title: 'Winter: snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy stairs, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps on walk-up stock.',
      },
      {
        title: 'University and professional mid-month spikes',
        detail:
          'Cambridge biotech and academic relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'cambridge-somerville-vs-west',
      title: 'Cambridge–Somerville density vs western suburb logistics module',
      intro:
        'Middlesex estimates fail more often when a single rate ignores the density-to-suburb contrast, elevator packets, and Route 128 freeflow than on packing skill alone.',
      bullets: [
        'Survey by product — Kendall tower, Somerville triple-decker, or Lexington HOA two-story — not by county name alone.',
        'Collect building COI, elevator reservations, and dock rules before the survey is final on Cambridge core product.',
        'Confirm HOA gate lists, truck-size limits, and move hours on western planned tracts.',
        'Price portal-to-portal time for any pair that rides I-95, I-93, Route 2, Route 3, or the 128 belt at peak.',
        'Ask academic and biotech movers about storage-in-transit, temporary housing, and split-load needs at estimate time.',
        'Clarify Cambridge vs Somerville vs Lowell vs Lexington addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'route-128-belt-logistics',
      title: 'Route 128 / I-95 belt cross-zone module',
      intro:
        'East Middlesex density and 128-belt suburbs share a county label but not approach corridors, curb rules, or crew skill needs.',
      bullets: [
        'Ask which approach corridors the crew will actually use at load and unload (I-93 vs Route 2 vs 128 vs Route 3).',
        'Match high-value Newton inventories and basement walk-up inventories to different crew experience.',
        'Expect different parking and permit norms even 10–15 miles apart; do not assume one staging plan covers both addresses.',
        'Build peak buffers for any pair that crosses the 128 belt during school or commute rush.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Middlesex County?',
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
              'Dozens of independent city and town districts cover Middlesex — Cambridge, Somerville, Newton, Lexington, Concord-Carlisle, Lowell, and many others. Assignment is address-based — marketing names like “MetroWest” or “Route 128” do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'High-demand western and inner-ring districts can be competitive at boundary edges. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
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
              'Cambridge and Boston-adjacent campuses, Lahey, Emerson, Lowell General, Newton-Wellesley, and other systems anchor care across the county. Specialty options often pull into Boston — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Somerville, Lexington, or Lowell to preferred campuses — I-93, Route 2, and 128 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Urban density, triple-deckers, mill lofts & suburb SFH',
            detail:
              'Expect towers and walk-ups in Cambridge; triple-deckers in Somerville–Medford–Malden; mill conversions in Lowell; and colonial SFH/townhome product across western and northern suburbs.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from Cambridge core to outer towns. Budget for condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
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
        title: 'Which Middlesex areas fit whom',
        bullets: [
          {
            title: 'Cambridge–Somerville urban lifestyle',
            detail:
              'Suits people prioritizing transit, walkability, and biotech/university proximity — with stairs, curb, elevator, and COI tradeoffs on move day.',
          },
          {
            title: 'Inner-north two-family and triple-decker living',
            detail:
              'Often appeals for relative space near the urban core — with multi-flight access and I-93 timing constraints.',
          },
          {
            title: 'Newton–Waltham–Watertown mixed product',
            detail:
              'Attracts households seeking strong schools and shorter Boston links — with mixed condo COI and SFH driveway logistics.',
          },
          {
            title: 'Western 128 and northern Route 3 suburbs',
            detail:
              'Fits buyers chasing yards, school clusters, and employer campuses — with HOA rules and longer peak commutes into Cambridge or Boston.',
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
              'Kendall and Cambridge biotech/tech, Route 128 corporate campuses, Lowell and northern industrial/education anchors, healthcare systems, and reverse commutes into Boston concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, MBTA Red/Orange/Green extensions and buses, and Commuter Rail. I-95, I-93, Route 2, Route 3, and the 128 belt peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, two tempos',
            detail:
              'Middlesex stacks dense university-city living and classic New England suburbia in the same county — different from Suffolk’s Boston core or Norfolk’s south-metro belt.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate: humid summers, cold winters with snow, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Cambridge–Somerville skews walkable and employer/academic; western towns skew school-calendar and trail/outdoors oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Middlesex County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Cambridge',
        href: 'https://www.cambridgema.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Somerville',
        href: 'https://www.somervillema.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'MBTA — transit & Commuter Rail',
        href: 'https://www.mbta.com/',
        external: true,
        note: 'Commute planning for east Middlesex',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-95 / I-93 / Route 2 / 128 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Cambridge core and denser multifamily; triple-decker stair fluency for Somerville–Medford–Malden stock; HOA driveway readiness for western 128-belt SFH; honest I-95 · I-93 · Route 2 · Route 3 · Route 128 timing for cross-zone pairs. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
