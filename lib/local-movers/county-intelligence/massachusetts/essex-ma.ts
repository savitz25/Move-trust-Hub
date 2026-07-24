import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Essex County, MA — North Shore coastal + inland mix
 * (not Suffolk Boston core, not Middlesex Cambridge/128, not Plymouth South Shore).
 */
export const essexCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'essex',
  hubTitle: 'Essex County Moving Intelligence Hub',
  eyebrow: 'Essex · North Shore coastal towns, Salem density & inland mill cities',
  h1: 'Moving in Essex County: North Shore Coastal Access, Salem Density & Inland Mill Cities',
  heroOpener:
    'Essex County is not a Boston brownstone clone and not a single beach-town template — it is North Shore coastal product from Marblehead and Swampscott to Gloucester and Rockport with narrow streets and seasonal calendars, denser Salem and Lynn multifamily and historic stock, and an inland mix of Lawrence, Haverhill, and Methuen mill-city logistics that diverges from shoreline curb rules. A Marblehead waterfront colonial with no truck turnaround, a Salem walk-up during October event season, a Lynn triple-decker, and a North Andover cul-de-sac do not share truck access or crew skill. I-95, Route 1, Route 128, and Route 114 rewrite “local” estimates that ignore coastal friction and inland freeflow in the same county. This hub is for people moving in Essex County — not a renamed Suffolk page or Plymouth South Shore script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · North Shore coastal & inland mill-city logistics awareness · Curated listings',
  majorCorridors: 'I-95 · Route 1 · Route 128 · Route 114',
  whatMakesDifferent: {
    title: 'What makes moving in Essex County different',
    intro:
      'These are Essex North Shore and inland realities — coastal street geometry, Salem event calendars, Lynn density, and Merrimack mill cities — not Suffolk’s Boston elevator core, Middlesex’s Cambridge–128 contrast, or Norfolk south-metro HOA belts alone.',
    bullets: [
      {
        title: 'Coastal towns and inland mill cities are different move markets in one county',
        detail:
          'Marblehead, Swampscott, Gloucester, and Rockport stack narrow streets, limited truck length, and seasonal tourism friction. Lawrence, Haverhill, and Methuen stack mill conversions, elevators, and apartment turnover. A single “Essex rate” collapses across that contrast.',
      },
      {
        title: 'Historic Salem and denser Lynn product rewrite curb and stair labor',
        detail:
          'Salem walk-ups, triple-deckers, and event-season staging limits diverge from Beverly driveway product a few miles away. Lynn multifamily corridors add elevator and stair mixes that suburban North Andover surveys do not capture.',
      },
      {
        title: 'I-95, Route 1, Route 128, and Route 114 turn short map miles into billable hours',
        detail:
          'Salem ↔ Andover, Lynn ↔ Gloucester, or Peabody ↔ Newburyport pairs look local and still burn 35–80+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Seasonal coastal and event calendars reshape access',
        detail:
          'Summer beach-town volume and Salem’s October tourism crush shrink legal curb and crew availability. Prefer mid-week early starts and book hard dates early when either address is coastal or downtown Salem.',
      },
      {
        title: 'Mill conversions and elevators appear inland more than shoreline marketing suggests',
        detail:
          'Lawrence, Haverhill, and parts of Peabody and Beverly require elevator reservations and COI naming on loft and mid-rise product. A Rockport cottage does not share that logistics stack.',
      },
      {
        title: 'Route 128 employment and North Shore reverse-commute demand reshape peaks',
        detail:
          'Beverly, Danvers, Peabody, and 128-corridor employers generate mid-month professional moves alongside summer coastal lease cycles. Clarify temporary housing and storage-in-transit early.',
      },
      {
        title: 'Multi-county North Shore and NH-border pairs are routine',
        detail:
          'Households regularly move Essex ↔ Middlesex, Suffolk, or New Hampshire Seacoast towns. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Essex County access zones',
  zonesIntro:
    'Plan by coastal North Shore towns, Salem–Beverly historic density, Lynn–Peabody–Danvers corridors, inland Merrimack mill cities, and Andover–North Andover family belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'coastal-north-shore',
      name: 'Coastal North Shore (Marblehead, Swampscott, Nahant & shore edges)',
      shortName: 'Coastal towns',
      neighborhoods: [
        'Marblehead',
        'Swampscott',
        'Nahant',
        'Marblehead Neck edges',
        'Phillips Beach edges',
        'Coastal cottage corridors',
      ],
      housingTypes: 'Waterfront colonials, cottages, denser multifamily pockets, limited elevators',
      challenges: [
        'Narrow streets and limited truck length',
        'Seasonal tourism curb collapse',
        'Long carries from distant legal staging',
      ],
      moverTips:
        'Photo street width, driveway turnaround, and curb options. Prefer smaller trucks when required. Book summer dates early and prefer mid-week starts.',
      cityKeywords: [
        'marblehead',
        'swampscott',
        'nahant',
        'marblehead neck',
        'phillips beach',
        'north shore',
      ],
    },
    {
      id: 'salem-beverly',
      name: 'Salem, Beverly & historic harbor density',
      shortName: 'Salem / Beverly',
      neighborhoods: [
        'Salem',
        'Downtown Salem',
        'Beverly',
        'Salem Willows edges',
        'Beverly Farms edges',
        'Harbor loft corridors',
      ],
      housingTypes: 'Walk-up multifamily, historic SFH, mill and loft conversions, condo elevators',
      challenges: [
        'Event-season curb and freeflow collapse (especially October in Salem)',
        'Multi-flight stairs and tight historic streets',
        'Route 114 / Route 1A / 128 approach clusters',
      ],
      moverTips:
        'Avoid peak event weekends when flexible. Survey stair counts and curb. Collect building packets for loft and elevator product.',
      cityKeywords: [
        'salem',
        'beverly',
        'salem ma',
        'beverly ma',
        'salem willows',
        'beverly farms',
      ],
    },
    {
      id: 'lynn-peabody-danvers',
      name: 'Lynn, Peabody, Danvers & central Essex corridors',
      shortName: 'Lynn / Peabody',
      neighborhoods: [
        'Lynn',
        'Peabody',
        'Danvers',
        'Lynnway corridors',
        'Peabody Square edges',
        'Danvers Center edges',
      ],
      housingTypes: 'Triple-deckers, apartments, mill conversions, ranch and colonial SFH',
      challenges: [
        'Route 1 / Route 128 / Route 114 congestion',
        'Mixed elevator and stair multifamily',
        'Apartment turnover and guest-parking friction',
      ],
      moverTips:
        'Confirm elevator vs stair access. Price Route 1 and 128 buffers for Boston-linked pairs. Survey parking maps on multifamily.',
      cityKeywords: [
        'lynn',
        'peabody',
        'danvers',
        'lynn ma',
        'peabody ma',
        'danvers ma',
      ],
    },
    {
      id: 'cape-ann',
      name: 'Cape Ann (Gloucester, Rockport & outer coastal edges)',
      shortName: 'Cape Ann',
      neighborhoods: [
        'Gloucester',
        'Rockport',
        'Magnolia edges',
        'Annisquam edges',
        'Downtown Gloucester',
        'Bearskin Neck edges',
      ],
      housingTypes: 'Cottages, historic SFH, denser harbor multifamily, limited elevators',
      challenges: [
        'Route 128 end-of-line freeflow and summer tourism',
        'Narrow coastal streets and limited staging',
        'Weather and wind exposure on open carries',
      ],
      moverTips:
        'Build Route 128 buffers and prefer mid-week coastal starts. Photo curb and truck length. Plan weather contingency for exposed approaches.',
      cityKeywords: [
        'gloucester',
        'rockport',
        'magnolia',
        'annisquam',
        'cape ann',
        'gloucester ma',
      ],
    },
    {
      id: 'merrimack-mill-cities',
      name: 'Lawrence, Haverhill, Methuen & Merrimack mill cities',
      shortName: 'Mill cities',
      neighborhoods: [
        'Lawrence',
        'Haverhill',
        'Methuen',
        'Downtown Lawrence',
        'Haverhill riverfront edges',
        'Methuen Center edges',
      ],
      housingTypes: 'Mill-loft elevators, apartments, triple-deckers, denser SFH',
      challenges: [
        'Elevator COIs on mill conversions',
        'I-495 / I-93 / Route 110 approach clusters',
        'NH-border pairs and authority clarity',
      ],
      moverTips:
        'Collect building packets for loft product. Price I-495 and I-93 portal time. Clarify Massachusetts vs New Hampshire addresses near the border.',
      cityKeywords: [
        'lawrence',
        'haverhill',
        'methuen',
        'lawrence ma',
        'haverhill ma',
        'methuen ma',
      ],
    },
    {
      id: 'andover-north-andover',
      name: 'Andover, North Andover, Boxford edges & inland family belts',
      shortName: 'Andover belt',
      neighborhoods: [
        'Andover',
        'North Andover',
        'Boxford edges',
        'Andover Center edges',
        'North Andover Center edges',
        'Inland SFH corridors',
      ],
      housingTypes: 'Two-story SFH, townhomes, HOA planned tracts, limited multifamily',
      challenges: [
        'HOA gate lists and cul-de-sac truck length',
        'I-93 / I-495 / Route 114 freeflow',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules and gate access before the crew day. Survey driveway turn radius. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'andover',
        'north andover',
        'boxford',
        'andover ma',
        'north andover ma',
        'boxford ma',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Essex County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Coastal curb friction, mill elevators, event-season delay risk, and I-95 / Route 128 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Coastal narrow streets & long carries',
        detail:
          'Marblehead, Rockport, and similar stock add truck-length limits and staging distance that flat-rate optimism underprices.',
      },
      {
        title: 'Mill-loft elevators & building COIs',
        detail:
          'Lawrence, Haverhill, and denser Salem–Beverly product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-95 · Route 1 · Route 128 · Route 114 congestion',
        detail:
          'Coastal–inland and Boston-linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Seasonal and event-calendar soft costs',
        detail:
          'Summer tourism and Salem October peaks shrink curb and raise rebooking risk.',
      },
      {
        title: 'Multi-county North Shore & NH-border empty miles',
        detail:
          'Middlesex, Suffolk, and New Hampshire destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with elevators, coastal staging limits, or peak 128 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,550–$4,500+',
        note: 'Stairs, COI, and coastal long-carry soft costs trend up',
      },
      {
        label: '3–4+ BR / loft / cross-zone SFH',
        value: '$2,900–$9,200+',
        note: 'Mill-loft moves and long I-95 or coastal pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$225+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Essex County move',
    intro:
      'Coastal tourism, Salem event season, lease cycles, school calendars, winter curb friction, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear coastal curb, ease Salem and Lynn freeflow, and reduce I-95 / Route 128 / Route 1 pain. Avoid peak event Fridays when tourism and leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September (plus Salem October)',
        detail:
          'Coastal lease turnover and family SFH Saturdays fill first; downtown Salem October adds a second demand spike. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Winter: snow, ice, coastal wind, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy walks, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps — especially on exposed coastal approaches.',
      },
      {
        title: 'Professional and mid-month employer spikes',
        detail:
          'Route 128 and mill-city professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'north-shore-coastal-inland',
      title: 'North Shore coastal vs inland mill-city logistics module',
      intro:
        'Essex estimates fail more often when a single rate ignores coastal street geometry, Salem event curb, mill elevators, and I-95 / 128 freeflow than on packing skill alone.',
      bullets: [
        'Survey by product — coastal cottage, Salem walk-up, Lynn triple-decker, mill loft, or Andover HOA two-story — not by county name alone.',
        'Photo street width, truck length, and long-carry paths for Marblehead, Rockport, and similar coastal stock.',
        'Collect building COI and elevator reservations before the survey is final on mill and mid-rise product.',
        'Price portal-to-portal time for any pair that rides I-95, Route 1, Route 128, or Route 114 at peak.',
        'Avoid Salem peak event weekends when flexible; confirm alternate staging if either address is downtown.',
        'Clarify coastal town vs Lawrence/Haverhill vs Andover addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'salem-event-season',
      title: 'Salem event-season access module',
      intro:
        'October and festival calendars can wipe staging overnight in and around downtown Salem even when the rest of Essex is ordinary mid-week product.',
      bullets: [
        'Ask whether either address sits inside event-zone street closures or restricted curb windows.',
        'Prefer mid-week early starts and build walking-carry contingency when trucks cannot stage at the door.',
        'Confirm hotel and short-term rental turnover calendars if the building mixes residential and visitor product.',
        'Do not assume a Peabody or Beverly driveway survey covers Salem historic-block access.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Essex County?',
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
              'Independent city and town districts cover Essex — Salem, Lynn, Beverly, Andover, Gloucester, Newburyport, Lawrence, and many others. Assignment is address-based — marketing names like “North Shore” do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'High-demand inland and coastal districts can be competitive at boundary edges. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
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
              'North Shore Medical Center / Mass General Brigham network campuses, Beverly Hospital, Lawrence General, Anna Jaques, and other community hospitals anchor care across the county. Specialty options often pull into Boston — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Marblehead, Salem, or Andover to preferred campuses — I-95, Route 128, and Route 1 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal stock, historic density, mill lofts & inland SFH',
            detail:
              'Expect cottages and waterfront colonials on the shore; walk-ups and historic SFH in Salem–Beverly; triple-deckers and apartments in Lynn; mill lofts in Lawrence–Haverhill; and HOA/SFH product inland around Andover.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from coastal prestige towns to mill cities. Budget for condo dues, older-building repair risk, flood/insurance considerations near the water, and parking.',
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
        title: 'Which Essex areas fit whom',
        bullets: [
          {
            title: 'Coastal North Shore lifestyle',
            detail:
              'Suits people prioritizing water access and small-town character — with narrow-street staging and seasonal tourism tradeoffs on move day.',
          },
          {
            title: 'Salem–Beverly historic and harbor living',
            detail:
              'Often appeals for walkability and culture — with event-season curb limits and mixed elevator/stair product.',
          },
          {
            title: 'Lynn–Peabody–Danvers practical corridors',
            detail:
              'Attracts households seeking relative value and 128 employment links — with multifamily logistics and Route 1 freeflow.',
          },
          {
            title: 'Andover belt and Merrimack options',
            detail:
              'Fits buyers chasing schools and yards or mill-city pricing — with HOA driveway rules or loft COI stacks depending on pocket.',
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
              'Route 128 campuses, North Shore healthcare and education, mill-city industry and services, harbor and tourism economies, and reverse commutes into Boston or Cambridge concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, Commuter Rail, and buses. I-95, Route 1, Route 128, and Route 114 peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, coastal and inland tempos',
            detail:
              'Essex stacks beach towns, historic harbors, denser industrial cities, and inland school suburbs — different from Suffolk’s Boston core or Plymouth’s South Shore suburban-historic mix.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with stronger coastal wind and storm exposure on the shore. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Coastal and Salem corridors feel tourism- and weekend-driven; inland towns skew school-calendar and employer driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Essex County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Salem',
        href: 'https://www.salemma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Lynn',
        href: 'https://www.lynnma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'MBTA — Commuter Rail (Newburyport/Rockport lines)',
        href: 'https://www.mbta.com/',
        external: true,
        note: 'Commute planning for North Shore towns',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-95 / Route 128 / Route 1 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with coastal narrow-street fluency for Marblehead–Cape Ann product; event-season staging skill for Salem; mill-loft elevator/COI experience for Lawrence–Haverhill; HOA driveway readiness for Andover-belt SFH; honest I-95 · Route 1 · Route 128 · Route 114 timing for cross-zone pairs. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
