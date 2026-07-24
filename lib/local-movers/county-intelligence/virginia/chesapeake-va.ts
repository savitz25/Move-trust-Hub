import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Chesapeake (independent city), VA — suburban growth, Greenbrier, military overflow.
 * Not Virginia Beach oceanfront tourism; not Norfolk denser naval/port urban stock.
 */
export const chesapeakeCityVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'chesapeake',
  hubTitle: 'Chesapeake Moving Intelligence Hub',
  eyebrow: 'Chesapeake · Greenbrier growth, Southside suburbs & military overflow housing',
  h1: 'Moving in Chesapeake: Greenbrier Growth, Suburban HOAs & Southside Corridor Logistics',
  heroOpener:
    'Chesapeake is a large Southside independent city built on suburban growth, Greenbrier commercial gravity, and military-overflow housing — not an oceanfront resort market. A Greenbrier HOA two-story, a Great Bridge craftsman, a Western Branch ranch, a Deep Creek driveway lot, and a Dominion Boulevard–adjacent rental do not share truck access, HOA packets, or empty-mile reality. I-64, I-464, VA-168, Dominion Boulevard, and Greenbrier Parkway rewrite “local” estimates that ignore peak retail congestion, school-calendar Saturdays, and longer north–south pairs across a sprawling city footprint. This hub is for people moving in Chesapeake — not a renamed Virginia Beach tourism page or Norfolk tunnel-density clone.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-64 · I-464 · VA-168 · Dominion Blvd · Greenbrier Pkwy',
  whatMakesDifferent: {
    title: 'What makes moving in Chesapeake different',
    intro:
      'These are Chesapeake suburban-growth realities — Greenbrier HOA density, long city-scale empty miles, and military overflow calendars — not Virginia Beach boardwalk curb rules or Norfolk downtown tunnel stock.',
    bullets: [
      {
        title: 'Greenbrier is retail and HOA gravity, not beach tourism',
        detail:
          'Greenbrier Parkway and surrounding master-planned product drive Saturday family demand, gate lists, COI requirements, and truck-length limits. Treat it as a suburban logistics problem — not an oceanfront elevator job.',
      },
      {
        title: 'City scale makes “local” pairs long',
        detail:
          'Chesapeake stretches from Western Branch and Deep Creek toward Great Bridge and southern growth edges. Greenbrier ↔ Great Bridge or Western Branch ↔ Deep Creek pairs can burn serious portal time even without leaving the city.',
      },
      {
        title: 'I-64, I-464, and VA-168 rewrite short map miles',
        detail:
          'Chesapeake ↔ Norfolk, Chesapeake ↔ Virginia Beach, and internal freeway pairs look simple on a map and still cost 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Military overflow without oceanfront density',
        detail:
          'Households tied to Norfolk Naval Station, Oceana, and other Hampton Roads installations often choose Chesapeake for space and newer inventory. PCS calendars still compress surveys — without resort-strip curb theater.',
      },
      {
        title: 'HOA villages dominate growth corridors',
        detail:
          'Greenbrier, Great Bridge edges, and southern tracts frequently require approved hours, deposits, and driveway photos. Collect packets before finalizing crew size and truck choice.',
      },
      {
        title: 'Rural-edge and waterway-adjacent parcels still exist',
        detail:
          'Deep Creek, southern fringes, and longer driveway lots need soft-surface awareness after rain, turn-radius checks, and weather contingency — not only Greenbrier HOA checklists.',
      },
      {
        title: 'Southside multi-city pairs are routine',
        detail:
          'Households regularly move Chesapeake ↔ Virginia Beach, Norfolk, Portsmouth, or Suffolk. Clarify independent-city addresses so Virginia DMV distance frameworks and FMCSA interstate assumptions stay accurate when any leg leaves Virginia.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Chesapeake access zones',
  zonesIntro:
    'Plan by Greenbrier core, Great Bridge south/central, Western Branch, Deep Creek / Dominion corridors, and southern growth edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'greenbrier-core',
      name: 'Greenbrier, Greenbrier Pkwy & retail-growth core',
      shortName: 'Greenbrier',
      neighborhoods: [
        'Greenbrier',
        'Greenbrier Parkway corridors',
        'Crossways edges',
        'Retail-adjacent multifamily',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily along commercial strips',
      challenges: [
        'Greenbrier Parkway peak retail congestion',
        'HOA gate lists and approved hours',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Book peak Saturdays early. Collect HOA COI first. Price Greenbrier-linked pairs with I-64 buffer when destination is Norfolk or Virginia Beach.',
      cityKeywords: ['greenbrier', 'greenbrier parkway', 'crossways', 'chesapeake greenbrier'],
    },
    {
      id: 'great-bridge',
      name: 'Great Bridge & south-central established corridors',
      shortName: 'Great Bridge',
      neighborhoods: [
        'Great Bridge',
        'Battlefield edges',
        'Centerville Turnpike approaches',
        'Established SFH villages',
      ],
      housingTypes: 'Established SFH, HOA tracts, townhomes',
      challenges: [
        'Bridge / arterial timing into Greenbrier and Norfolk pairs',
        'School-calendar move waves',
        'Mixed driveway lengths and canopy',
      ],
      moverTips:
        'Survey driveway and tree canopy. Prefer mid-week early starts for Greenbrier- or I-64-bound pairs. Confirm HOA rules on newer edges.',
      cityKeywords: ['great bridge', 'battlefield', 'centerville', 'chesapeake'],
    },
    {
      id: 'western-branch',
      name: 'Western Branch & northwest suburban edges',
      shortName: 'Western Branch',
      neighborhoods: [
        'Western Branch',
        'Western Branch Boulevard corridors',
        'Northwest HOA tracts',
        'Portsmouth-adjacent edges',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories',
      challenges: [
        'Longer empty miles from Greenbrier staging',
        'HOA truck limits',
        'Peak links toward Portsmouth / I-264 approaches',
      ],
      moverTips:
        'Do not price Western Branch as a short Greenbrier hop. Share gate and driveway photos. Build arterial buffer for cross-city destinations.',
      cityKeywords: ['western branch', 'northwest chesapeake', 'portsmouth edge'],
    },
    {
      id: 'deep-creek-dominion',
      name: 'Deep Creek, Dominion Blvd & industrial-edge residential',
      shortName: 'Deep Creek / Dominion',
      neighborhoods: [
        'Deep Creek',
        'Dominion Boulevard corridors',
        'Industrial-edge rentals',
        'Canal / waterway-adjacent pockets',
      ],
      housingTypes: 'SFH, modest rentals, mixed older and newer stock',
      challenges: [
        'Dominion Boulevard and industrial traffic mix',
        'Longer driveway and soft-surface risk after rain',
        'Workforce lease-end waves',
      ],
      moverTips:
        'Survey turn radius and surface after wet weather. Avoid peak industrial ingress when flexible. Clarify storage needs for short-notice jobs.',
      cityKeywords: ['deep creek', 'dominion boulevard', 'dominion', 'industrial chesapeake'],
    },
    {
      id: 'i64-i464-links',
      name: 'I-64 / I-464 link neighborhoods & Norfolk approaches',
      shortName: 'I-64 / I-464 links',
      neighborhoods: [
        'I-64 corridor residential pockets',
        'I-464 approach neighborhoods',
        'Norfolk-bound multifamily edges',
      ],
      housingTypes: 'Multifamily, townhomes, modest SFH',
      challenges: [
        'Freeway peak congestion into Norfolk / Virginia Beach',
        'Tunnel and bridge timing on metro pairs',
        'Noise of short-notice military and lease calendars',
      ],
      moverTips:
        'Price portal-to-portal for any Norfolk or Virginia Beach destination. Prefer early starts. Confirm elevator/parking rules on multifamily stock.',
      cityKeywords: ['i-64', 'i-464', 'norfolk approach', 'freeway chesapeake'],
    },
    {
      id: 'south-growth',
      name: 'Southern growth tracts & VA-168 edges',
      shortName: 'South growth / VA-168',
      neighborhoods: [
        'Southern Chesapeake growth villages',
        'VA-168 corridor edges',
        'Newer master-planned tracts',
        'Rural-suburban fringe',
      ],
      housingTypes: 'Newer HOA SFH, townhomes, longer lots on fringe',
      challenges: [
        'Long empty miles from northern staging yards',
        'HOA packets on new villages',
        'Limited alternate routes on some fringe roads',
      ],
      moverTips:
        'Build travel time from Greenbrier or Norfolk-side yards. Collect HOA documents early. Photo long driveways and cul-de-sac turnarounds.',
      cityKeywords: ['southern chesapeake', 'va-168', '168', 'new construction chesapeake'],
    },
  ],
  costDrivers: {
    title: 'What drives Chesapeake moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, city-scale empty miles, and freeway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Greenbrier & growth-corridor HOA rules',
        detail: 'Gate lists, COI, and approved hours add soft cost and constrain truck choice before labor starts.',
      },
      {
        title: 'I-64 / I-464 / VA-168 / Dominion congestion',
        detail: 'Internal and Southside pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Long city-scale empty miles',
        detail: 'Western Branch ↔ south growth or Deep Creek ↔ Greenbrier pairs are not short local hops.',
      },
      {
        title: 'Military overflow & lease-end spikes',
        detail: 'PCS-linked demand and multifamily turnover create mid-week crew competition.',
      },
      {
        title: 'Driveway grade, canopy & soft surfaces',
        detail: 'Fringe and Deep Creek lots need extra labor time when access is constrained.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,250+',
        note: 'Higher with peak freeways or multifamily elevators',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,500+',
        note: 'HOA soft costs trend up in Greenbrier growth product',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,200–$6,800+',
        note: 'Long internal pairs and multi-city Southside jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing scales up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Chesapeake move',
    intro:
      'School calendars, military overflow windows, heat/humidity, and HOA rules reshape access and crew availability — without oceanfront tourism as the primary driver.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear Greenbrier and Dominion curb space and reduce I-64 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Greenbrier and Great Bridge SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Military overflow clusters',
        detail:
          'PCS seasons create mid-week spikes even in non-base cities. Confirm report dates and storage needs early.',
      },
      {
        title: 'Summer heat, storms & hurricane season',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans; confirm contingency language in late summer–fall.',
      },
    ],
  },
  specialized: [
    {
      id: 'greenbrier-hoa-southside',
      title: 'Greenbrier HOA & Southside corridor module',
      intro:
        'Chesapeake estimates fail more often on HOA packets, city-scale distance, and freeway portal time than on packing skill alone.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours for Greenbrier and southern growth villages before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-64, I-464, VA-168, Dominion Boulevard, or Greenbrier Parkway at peak.',
        'Survey Western Branch, Deep Creek, and south-fringe driveways for turn radius and soft surfaces — not only HOA checklists.',
        'Clarify Chesapeake vs Virginia Beach / Norfolk / Portsmouth / Suffolk addresses on every estimate.',
        'Ask military-linked households about report dates and storage-in-transit even when origin is not base housing.',
        'Verify Virginia DMV motor-carrier / household goods authorization for in-state work and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Chesapeake?',
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
              'Chesapeake Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Greenbrier, Great Bridge, or Western Branch do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Growth tracts and popular suburban corridors can see enrollment pressure. Ask the division about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Division boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone. Military families should cross-check liaison guidance for PCS timing.',
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
              'Chesapeake Regional Medical Center is a primary local anchor, with additional Sentara and regional specialty options across Hampton Roads. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Western Branch, Deep Creek, or southern growth edges to preferred campuses — I-64 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Suburban HOA product dominates growth',
            detail:
              'Expect master-planned SFH and townhomes around Greenbrier and southern corridors; older SFH and mixed lots remain in Great Bridge, Deep Creek, and established pockets.',
          },
          {
            title: 'Cost variation inside the city',
            detail:
              'Purchase prices and rents vary by corridor and inventory age. Budget for HOA dues, insurance, and longer commute tradeoffs versus denser Norfolk housing.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Chesapeake areas fit whom',
        bullets: [
          {
            title: 'Greenbrier suburban convenience',
            detail:
              'Suits households prioritizing newer inventory and retail access — with HOA logistics and Parkway congestion.',
          },
          {
            title: 'Great Bridge established-suburban feel',
            detail:
              'Often appeals for more settled street grids and family housing — with arterial timing into the rest of Southside.',
          },
          {
            title: 'Western Branch space-seeking households',
            detail:
              'Attracts people wanting room and northwest positioning — with longer empty miles to Greenbrier and Norfolk cores.',
          },
          {
            title: 'Deep Creek / fringe practical living',
            detail:
              'Works for households comfortable with driveway and industrial-edge tradeoffs — survey access carefully.',
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
              'Healthcare, retail/logistics around Greenbrier and Dominion corridors, professional services, and military-linked household employment across Hampton Roads.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-64, I-464, VA-168, Dominion Boulevard, and Greenbrier Parkway peaks are real. Test-drive peak routes toward Norfolk, Portsmouth, and Virginia Beach before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One city, multiple Chesapeakes',
            detail:
              'Chesapeake stacks Greenbrier growth villages, established Great Bridge fabric, Western Branch suburbs, Deep Creek edges, and southern fringe — inland suburban character, not Virginia Beach oceanfront tourism or Norfolk naval-port density.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and hurricane-season risk. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family- and retail-oriented corridors dominate daily life; parks and waterway edges offer outdoor access without resort-strip intensity. Visit at peak and off-peak commute times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Chesapeake resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves (distance can change which framework applies) and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Chesapeake — official site',
        href: 'https://www.cityofchesapeake.net/',
        external: true,
        note: 'City services & offices',
      },
      {
        label: 'Chesapeake Public Schools',
        href: 'https://www.cpschools.com/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: '511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-64 / I-464 / VA-168 before load windows',
      },
      {
        label: 'Chesapeake Regional Healthcare',
        href: 'https://www.chesapeakeregional.com/',
        external: true,
        note: 'Local hospital system overview',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Greenbrier HOA fluency for growth-tract product; honest I-64 / I-464 / Dominion timing for cross-city and long internal pairs; driveway and soft-surface awareness for Deep Creek and southern fringe. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
