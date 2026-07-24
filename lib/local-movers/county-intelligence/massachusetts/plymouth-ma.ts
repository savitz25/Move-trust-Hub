import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Plymouth County, MA — South Shore suburban + historic-town logistics
 * (not Suffolk Boston core, not Norfolk Quincy density alone, not Essex North Shore).
 */
export const plymouthCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'plymouth',
  hubTitle: 'Plymouth County Moving Intelligence Hub',
  eyebrow: 'Plymouth · South Shore suburbs, historic towns & Route 3 logistics',
  h1: 'Moving in Plymouth County: South Shore Suburbs, Historic-Town Access & Route 3 Corridors',
  heroOpener:
    'Plymouth County is not a Boston elevator clone and not a Cape Cod ferry template — it is South Shore suburban product from Hingham and Scituate to Marshfield and Duxbury with coastal street limits, historic Plymouth and downtown Main Street staging constraints, and inland Brockton–Bridgewater–Middleborough density that diverges from shoreline curb rules. A Hingham waterfront colonial with narrow approach, a Plymouth historic-district walk-up in peak tourism season, a Brockton triple-decker, and a Bridgewater two-story on a cul-de-sac do not share truck access or crew skill. Route 3, Route 24, Route 44, and Route 18 rewrite “local” estimates that ignore South Shore freeflow and historic-town geometry. This hub is for people moving in Plymouth County — not a renamed Norfolk page or Essex North Shore script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · South Shore suburban & historic-town logistics awareness · Curated listings',
  majorCorridors: 'Route 3 · Route 24 · Route 44 · Route 18',
  whatMakesDifferent: {
    title: 'What makes moving in Plymouth County different',
    intro:
      'These are Plymouth South Shore realities — coastal suburb access, historic-town staging, Brockton density, and Route 3 freeflow — not Suffolk’s Boston brownstone core, Norfolk’s Quincy tower product alone, or Essex’s North Shore mill-city mix.',
    bullets: [
      {
        title: 'Coastal South Shore towns and inland cities are different move markets in one county',
        detail:
          'Hingham, Scituate, Marshfield, Duxbury, and Kingston stack narrow streets, limited truck length, and summer tourism friction. Brockton, Bridgewater, and Middleborough stack multifamily, stairs, and highway-spine freeflow. A single “Plymouth rate” collapses across that contrast.',
      },
      {
        title: 'Historic Plymouth and Main Street districts rewrite curb staging',
        detail:
          'Downtown Plymouth, waterfront approaches, and event or cruise-adjacent days shrink legal truck placement. A Wareham ranch survey does not capture historic-block long carries and tourist-season curb collapse.',
      },
      {
        title: 'Route 3, Route 24, Route 44, and Route 18 turn short map miles into billable hours',
        detail:
          'Hingham ↔ Middleborough, Brockton ↔ Plymouth, or Scituate ↔ Bridgewater pairs look local and still burn 35–80+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Brockton and denser inland multifamily are not shoreline SFH product',
        detail:
          'Triple-deckers, apartments, and guest-parking friction dominate parts of Brockton and transit-adjacent corridors. Flat-rate optimism from Duxbury driveways underprices flight counts and building rules.',
      },
      {
        title: 'Seasonal coastal calendars and school-suburb peaks reshape demand',
        detail:
          'Summer beach-town volume and May–August family SFH Saturdays fill crews first. Prefer mid-week early starts on coastal blocks and book peak weekends early for larger homes.',
      },
      {
        title: 'Cape and Islands spillover pairs add ferry and long-haul complexity',
        detail:
          'Households regularly stage through Plymouth County toward Cape Cod or islands. Clarify whether any leg leaves the county or state so portal time and Massachusetts DPU vs FMCSA assumptions stay accurate.',
      },
      {
        title: 'Multi-county South Shore and Boston reverse-commute pairs are routine',
        detail:
          'Households regularly move Plymouth ↔ Norfolk, Suffolk, Bristol, or Barnstable. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Plymouth County access zones',
  zonesIntro:
    'Plan by northern South Shore coastal towns, historic Plymouth core, Brockton inland density, Bridgewater–Middleborough corridors, and Wareham–southern edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'hingham-scituate-coastal',
      name: 'Hingham, Hull, Cohasset & northern coastal South Shore',
      shortName: 'Northern coastal',
      neighborhoods: [
        'Hingham',
        'Hull',
        'Cohasset',
        'Hingham Harbor edges',
        'Nantasket edges',
        'Coastal colonial corridors',
      ],
      housingTypes: 'Waterfront and inland colonials, denser multifamily pockets, limited elevators',
      challenges: [
        'Narrow coastal streets and limited truck length',
        'Seasonal tourism curb collapse',
        'Route 3A / Route 3 approach freeflow',
      ],
      moverTips:
        'Photo street width, driveway turnaround, and curb options. Prefer smaller trucks when required. Book summer dates early and prefer mid-week starts.',
      cityKeywords: [
        'hingham',
        'hull',
        'cohasset',
        'nantasket',
        'hingham ma',
        'cohasset ma',
      ],
    },
    {
      id: 'scituate-marshfield-duxbury',
      name: 'Scituate, Marshfield, Duxbury & mid-coast South Shore',
      shortName: 'Mid-coast',
      neighborhoods: [
        'Scituate',
        'Marshfield',
        'Duxbury',
        'Scituate Harbor edges',
        'Marshfield Center edges',
        'Duxbury Beach edges',
      ],
      housingTypes: 'Coastal SFH, cottages, newer subdivisions, limited multifamily',
      challenges: [
        'Summer lease and second-home turnover',
        'Long carries from distant legal staging',
        'Route 3 / Route 3A congestion on beach weekends',
      ],
      moverTips:
        'Survey driveway grade and street width. Build Route 3 buffers for Boston-linked pairs. Avoid peak beach weekends when flexible.',
      cityKeywords: [
        'scituate',
        'marshfield',
        'duxbury',
        'scituate harbor',
        'marshfield ma',
        'duxbury ma',
      ],
    },
    {
      id: 'plymouth-kingston-historic',
      name: 'Plymouth, Kingston & historic-town core',
      shortName: 'Plymouth / Kingston',
      neighborhoods: [
        'Plymouth',
        'Downtown Plymouth',
        'Kingston',
        'Plymouth waterfront edges',
        'North Plymouth edges',
        'Kingston Center edges',
      ],
      housingTypes: 'Historic SFH, walk-up multifamily, newer subdivisions, limited elevators',
      challenges: [
        'Tourism-season curb and freeflow collapse near the historic core',
        'Mixed narrow downtown streets and suburban driveway stock',
        'Route 3 / Route 44 approach clusters',
      ],
      moverTips:
        'Prefer mid-week early starts for downtown Plymouth. Survey curb and stair access. Price Route 3 portal time for northbound pairs.',
      cityKeywords: [
        'plymouth',
        'kingston',
        'plymouth ma',
        'downtown plymouth',
        'kingston ma',
        'plymouth center',
      ],
    },
    {
      id: 'brockton-density',
      name: 'Brockton & denser inland multifamily corridors',
      shortName: 'Brockton',
      neighborhoods: [
        'Brockton',
        'Downtown Brockton',
        'Campello edges',
        'Montello edges',
        'West Bridgewater edges',
        'Avon edges',
      ],
      housingTypes: 'Triple-deckers, apartments, two- and three-family, denser SFH',
      challenges: [
        'Multi-flight stairs and long interior carries',
        'Route 24 / Route 27 / Route 123 congestion',
        'Apartment turnover and guest-parking friction',
      ],
      moverTips:
        'Survey stair counts, unit floor, and parking maps. Confirm elevator vs stair access. Price Route 24 buffers for Boston- or Taunton-linked pairs.',
      cityKeywords: [
        'brockton',
        'campello',
        'montello',
        'west bridgewater',
        'avon',
        'brockton ma',
      ],
    },
    {
      id: 'bridgewater-middleborough',
      name: 'Bridgewater, Middleborough, Whitman & inland family corridors',
      shortName: 'Bridgewater / Middleboro',
      neighborhoods: [
        'Bridgewater',
        'Middleborough',
        'Whitman',
        'East Bridgewater',
        'West Bridgewater',
        'Middleboro Center edges',
      ],
      housingTypes: 'Ranch and colonial SFH, townhomes, apartments, student-adjacent multifamily',
      challenges: [
        'Route 24 / Route 18 / Route 44 freeflow clusters',
        'University-adjacent lease waves near Bridgewater',
        'Cul-de-sac truck length on newer tracts',
      ],
      moverTips:
        'Book academic peaks early near Bridgewater. Survey driveway turn radius. Price Route 18 and Route 44 buffers for cross-zone pairs.',
      cityKeywords: [
        'bridgewater',
        'middleborough',
        'middleboro',
        'whitman',
        'east bridgewater',
        'bridgewater ma',
      ],
    },
    {
      id: 'wareham-southern',
      name: 'Wareham, Carver, Rochester edges & southern Plymouth County',
      shortName: 'Southern Plymouth',
      neighborhoods: [
        'Wareham',
        'Carver',
        'Rochester edges',
        'Onset edges',
        'Wareham Center edges',
        'Southern SFH and cottage belts',
      ],
      housingTypes: 'Cottages, ranch SFH, denser summer multifamily, limited elevators',
      challenges: [
        'Cape-bound Route 25 / Route 6 spillover freeflow',
        'Seasonal tourism and second-home calendars',
        'Longer portal time to Boston core',
      ],
      moverTips:
        'Build Cape-spillover weekend buffers. Survey cottage access and long carries. Clarify Plymouth vs Barnstable destinations on every estimate.',
      cityKeywords: [
        'wareham',
        'carver',
        'rochester ma',
        'onset',
        'wareham ma',
        'carver ma',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Plymouth County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Coastal staging limits, historic-town curb friction, Brockton stairs, and Route 3 / Route 24 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Coastal narrow streets & long carries',
        detail:
          'Hingham, Scituate, Marshfield, and similar stock add truck-length limits and staging distance that flat-rate optimism underprices.',
      },
      {
        title: 'Historic Plymouth tourism curb & downtown access',
        detail:
          'Event and peak-season freeflow collapse add delay risk before packing skill matters.',
      },
      {
        title: 'Route 3 · Route 24 · Route 44 · Route 18 congestion',
        detail:
          'Coastal–inland and Boston-linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Brockton stairs & multifamily soft costs',
        detail:
          'Triple-deckers and apartment elevators add labor that shoreline SFH rates miss.',
      },
      {
        title: 'Multi-county South Shore & Cape spillover empty miles',
        detail:
          'Norfolk, Suffolk, Bristol, and Barnstable destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$475–$1,700+',
        note: 'Higher with coastal staging limits, stairs, or peak Route 3 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,450–$4,200+',
        note: 'Stairs, long carries, and multifamily soft costs trend up',
      },
      {
        label: '3–4+ BR / coastal SFH / cross-zone',
        value: '$2,800–$8,800+',
        note: 'Large shoreline homes and long Route 3 or Route 24 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$220+/hr',
        note: 'Portal-to-portal; packing, stairs, and coastal staging scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Plymouth County move',
    intro:
      'Coastal tourism, historic-town calendars, school peaks, university lease waves, winter curb friction, and Cape spillover weekends reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear coastal and downtown Plymouth curb and reduce Route 3 / Route 24 / Route 44 pain. Avoid peak beach Fridays when tourism and leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Coastal lease turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and larger shoreline homes.',
      },
      {
        title: 'Winter: snow, ice, coastal wind, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy walks, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps — especially on exposed coastal approaches.',
      },
      {
        title: 'University and Cape-spillover spikes',
        detail:
          'Bridgewater-adjacent academic moves and Cape-bound holiday weekends can land mid-month or mid-week. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-shore-historic-suburban',
      title: 'South Shore suburban & historic-town logistics module',
      intro:
        'Plymouth estimates fail more often on coastal street geometry, historic-core curb, Brockton stairs, and Route 3 freeflow than on packing skill alone.',
      bullets: [
        'Survey by product — coastal colonial, Plymouth historic walk-up, Brockton triple-decker, or inland HOA two-story — not by county name alone.',
        'Photo street width, truck length, and long-carry paths for Hingham–Duxbury coastal stock.',
        'Prefer mid-week early starts for downtown Plymouth and peak tourism blocks.',
        'Price portal-to-portal time for any pair that rides Route 3, Route 24, Route 44, or Route 18 at peak.',
        'Confirm university lease windows near Bridgewater and Cape-spillover freeflow near Wareham.',
        'Clarify Hingham vs Brockton vs Plymouth vs Wareham addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'coastal-vs-brockton',
      title: 'Coastal South Shore vs Brockton micro-market module',
      intro:
        'A single “Plymouth County rate” collapses when shoreline SFH and inland multifamily product diverge a few corridor miles apart.',
      bullets: [
        'Match crew experience to product — beach-town long carries vs triple-decker stairs vs cul-de-sac driveways.',
        'Ask which approach corridors the crew will actually use at load and unload (Route 3 vs Route 24 vs Route 44 vs Route 18).',
        'Expect different parking and seasonal norms even 15–20 miles apart; do not assume one staging plan covers both addresses.',
        'Build peak buffers for any pair that crosses Route 3 during beach or commute rush.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Plymouth County?',
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
              'Independent city and town districts cover Plymouth — Hingham, Scituate, Duxbury, Plymouth, Brockton, Bridgewater-Raynham, Silver Lake, and many others. Assignment is address-based — marketing names like “South Shore” do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'High-demand coastal districts and boundary edges can be competitive. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
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
              'South Shore Hospital (Weymouth-adjacent network access), Beth Israel Deaconess Plymouth, Signature Healthcare Brockton, and other community campuses anchor care across the county. Specialty options often pull into Boston — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Hingham, Plymouth, or Brockton to preferred campuses — Route 3 and Route 24 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal SFH, historic stock, triple-deckers & inland tracts',
            detail:
              'Expect waterfront and inland colonials on the northern and mid-coast; historic and mixed product in Plymouth; triple-deckers and apartments in Brockton; and ranch/colonial tracts through Bridgewater–Middleborough–Wareham.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from Hingham–Duxbury prestige belts to inland cities. Budget for older-building repair risk, coastal insurance considerations, parking, and longer commute tradeoffs.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Plymouth areas fit whom',
        bullets: [
          {
            title: 'Northern coastal South Shore lifestyle',
            detail:
              'Suits people prioritizing water access, ferry links, and Boston reverse-commute options — with narrow-street staging and seasonal tourism tradeoffs on move day.',
          },
          {
            title: 'Plymouth–Kingston historic and mixed living',
            detail:
              'Often appeals for small-city amenities and shoreline adjacency — with tourism curb limits and mixed downtown/suburb logistics.',
          },
          {
            title: 'Brockton practical density',
            detail:
              'Attracts households seeking relative value and highway access — with multi-unit stair logistics and Route 24 freeflow.',
          },
          {
            title: 'Bridgewater–Middleborough–Wareham inland options',
            detail:
              'Fits buyers chasing yards, relative space, or Cape-adjacent living — with longer peak portal time toward Boston and seasonal spillover near the Cape gateway.',
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
              'Boston reverse commutes via Route 3 and Commuter Rail, Brockton commercial and healthcare centers, Bridgewater education, Plymouth tourism and services, and Cape-spillover hospitality concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, Commuter Rail, and ferry-linked northern coastal options. Route 3, Route 24, Route 44, and Route 18 peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South Shore suburban and historic-town mix',
            detail:
              'Plymouth stacks beach towns, historic tourism cores, denser inland cities, and family suburbs — different from Norfolk’s Quincy–Brookline south-metro product or Essex’s North Shore mill-city mix.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with stronger coastal wind and storm exposure on the shore. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Coastal towns feel tourism- and weekend-driven in summer; inland corridors skew school-calendar and highway-commute driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Plymouth County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Town of Plymouth',
        href: 'https://www.plymouth-ma.gov/',
        external: true,
        note: 'Permits, services & town info',
      },
      {
        label: 'City of Brockton',
        href: 'https://www.brockton.ma.us/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'MBTA — Commuter Rail (Kingston/Plymouth & Middleborough lines)',
        href: 'https://www.mbta.com/',
        external: true,
        note: 'Commute planning for South Shore towns',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'Route 3 / Route 24 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with coastal narrow-street fluency for Hingham–Duxbury product; historic-town staging skill for downtown Plymouth; triple-decker stair fluency for Brockton stock; honest Route 3 · Route 24 · Route 44 · Route 18 timing for cross-zone pairs. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
