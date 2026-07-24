import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Fairfax County, VA — NoVA core (not Arlington high-rise clone, not PW I-95 growth belt).
 * Tysons/Reston density, Springfield/Annandale mix, federal contractor corridors, I-66/I-495.
 */
export const fairfaxCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'fairfax',
  hubTitle: 'Fairfax County Moving Intelligence Hub',
  eyebrow: 'Fairfax · Northern Virginia · Tysons, Reston, Springfield & I-495 Beltway',
  h1: 'Moving in Fairfax County: Tysons High-Rises, Reston HOAs & I-66 / I-495 Logistics',
  heroOpener:
    'Fairfax County is Northern Virginia’s largest residential and employment engine: glass towers and condo stacks in Tysons, master-planned villages around Reston and Herndon, dense older grids in Annandale and Falls Church edges, and Springfield–Burke family tracts feeding the Beltway and I-95 links. A Tysons elevator reservation, a Reston HOA gate packet, an Annandale split-level with tight curb, and a federal-contractor timeline out of McLean do not share truck access or crew skill. I-66, I-495, VA-28, the Dulles Toll Road, and VA-236 rewrite “local” estimates that ignore HOA COIs, elevator windows, and peak Beltway portal time. This hub is for people moving in Fairfax County — not a renamed Arlington high-rise page or generic Virginia template.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods authority for intrastate moves · FMCSA for interstate · Fairfax HOA, elevator & Beltway corridor awareness · Curated listings',
  majorCorridors: 'I-66 · I-495 · VA-28 · Dulles Toll Road · VA-236 · I-95 links',
  whatMakesDifferent: {
    title: 'What makes moving in Fairfax County different',
    intro:
      'These are Fairfax NoVA realities — Tysons/Reston building rules, Beltway congestion, and federal-contractor calendars — not Arlington peninsula density alone or Prince William I-95 growth sprawl.',
    bullets: [
      {
        title: 'Tysons and Reston vertical product rewrites the job',
        detail:
          'Condo and multifamily towers require elevator reservations, building COIs, loading-dock slots, and padded protection. A same-ZIP SFH does not share that logistics stack.',
      },
      {
        title: 'I-66 and I-495 turn short map miles into billable hours',
        detail:
          'McLean ↔ Springfield, Reston ↔ Annandale, or Tysons ↔ Burke pairs look local and still burn 45–90+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Federal contractor and professional relocation calendars',
        detail:
          'Defense, intel, consulting, and agency-adjacent households cluster mid-month and fiscal-year windows. Hard report dates compete with Saturday family demand for crews.',
      },
      {
        title: 'HOA villages dominate west and south growth fabric',
        detail:
          'Reston, Herndon, Centreville, Chantilly, Fairfax Station, and Burke tracts often require gate lists, truck-length limits, approved hours, and COI naming. Collect packets early.',
      },
      {
        title: 'Annandale, Falls Church edges, and older street grids still matter',
        detail:
          'Split-levels, basement carries, tree-lined curb with limited truck length, and multi-unit walk-ups need driveway photos and stair counts — not only tower checklists.',
      },
      {
        title: 'Cross-county NoVA pairs are routine',
        detail:
          'Households regularly move Fairfax ↔ Arlington, Loudoun, Prince William, or DC/MD. Clarify state lines so Virginia DMV vs FMCSA assumptions stay accurate when any leg leaves Virginia.',
      },
      {
        title: 'Dulles Toll Road and VA-28 reshape west-county timing',
        detail:
          'Herndon–Chantilly–Centreville pairs ride toll and expressway peaks that suburban quotes often underprice. Build buffers for airport-corridor freight and tech-shift traffic.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Fairfax County access zones',
  zonesIntro:
    'Plan by Tysons vertical, Reston–Herndon planned communities, Springfield–Annandale–Burke south/central mix, McLean–Great Falls north edges, and Centreville–Chantilly west growth — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'tysons-merrifield',
      name: 'Tysons, McLean edges & Merrifield corridor',
      shortName: 'Tysons / McLean',
      neighborhoods: [
        'Tysons',
        'McLean',
        'Merrifield',
        'Falls Church City edges',
        'Vienna near-core',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, denser SFH, townhomes',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'I-495 / VA-123 / I-66 approach congestion',
        'Limited legal curb and long interior carries',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early starts. Photo loading docks and street staging options.',
      cityKeywords: ['tysons', 'mclean', 'merrifield', 'falls church', 'vienna', 'tysons corner'],
    },
    {
      id: 'reston-herndon',
      name: 'Reston, Herndon & Dulles Toll Road west',
      shortName: 'Reston / Herndon',
      neighborhoods: ['Reston', 'Herndon', 'Dulles corridor residential', 'Wiehle-Reston edges'],
      housingTypes: 'Master-planned HOA SFH, townhomes, condo villages, tech-corridor multifamily',
      challenges: [
        'HOA gate lists and approved move hours',
        'Dulles Toll Road peak freight and reverse-commute traffic',
        'Mixed product on short distances (tower vs patio home)',
      ],
      moverTips:
        'Collect HOA packets first. Price Toll Road pairs honestly. Confirm unit type and elevator vs walk-up before final estimate.',
      cityKeywords: ['reston', 'herndon', 'dulles', 'wiehle', 'reston town center'],
    },
    {
      id: 'springfield-annandale-burke',
      name: 'Springfield, Annandale, Burke & south-central Fairfax',
      shortName: 'South-central',
      neighborhoods: [
        'Springfield',
        'Annandale',
        'Burke',
        'Franconia',
        'West Springfield',
        'Newington edges',
      ],
      housingTypes: 'Split-levels, colonial SFH, townhomes, older multifamily',
      challenges: [
        'I-95 / I-495 / VA-236 congestion clusters',
        'Basement carries and tight older driveways',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Survey stairs and driveway grade. Build Beltway buffer for any Tysons- or Reston-linked pair. Book peak Saturdays early.',
      cityKeywords: ['springfield', 'annandale', 'burke', 'franconia', 'west springfield', 'newington'],
    },
    {
      id: 'centreville-chantilly',
      name: 'Centreville, Chantilly, Fairfax Station & VA-28 west',
      shortName: 'West Fairfax',
      neighborhoods: [
        'Centreville',
        'Chantilly',
        'Fairfax Station',
        'Clifton edges',
        'Fair Oaks / Fairfax City edges',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories, some rural-lot edges',
      challenges: [
        'VA-28 and I-66 peak congestion',
        'HOA truck limits on newer tracts',
        'Longer empty miles from east-county staging yards',
      ],
      moverTips:
        'Share gate and driveway photos. Price I-66 / VA-28 portal time. Clarify Fairfax City vs County addresses on every estimate.',
      cityKeywords: [
        'centreville',
        'chantilly',
        'fairfax station',
        'clifton',
        'fair oaks',
        'fairfax',
      ],
    },
    {
      id: 'great-falls-north',
      name: 'Great Falls, northern estates & Potomac edges',
      shortName: 'Great Falls / North',
      neighborhoods: ['Great Falls', 'Northern McLean estates', 'Potomac River edges'],
      housingTypes: 'Large SFH, estate lots, long driveways, higher-value inventories',
      challenges: [
        'Long carries, circular drives, and tree canopy',
        'Limited truck turn radius on private lanes',
        'High-value packing and white-glove expectations',
      ],
      moverTips:
        'Pre-walk driveway length and grade. Inventory art, wine, and specialty items carefully. Prefer experienced high-value crews.',
      cityKeywords: ['great falls', 'mclean north', 'potomac', 'northern fairfax'],
    },
    {
      id: 'lorton-south-edge',
      name: 'Lorton, South County & I-95 Fairfax edges',
      shortName: 'Lorton / South',
      neighborhoods: ['Lorton', 'South County growth', 'I-95 residential pockets', 'Occoquan edges'],
      housingTypes: 'Newer HOA SFH, townhomes, multifamily near commercial strips',
      challenges: [
        'I-95 peak freeflow collapse toward DC',
        'HOA packets on growth tracts',
        'Cross-county pairs into Prince William',
      ],
      moverTips:
        'Build I-95 buffer for morning and evening peaks. Collect HOA COI early. Clarify county line vs PW destinations.',
      cityKeywords: ['lorton', 'south county', 'occoquan', 'i-95 fairfax'],
    },
  ],
  costDrivers: {
    title: 'What drives Fairfax County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, HOA rules, and Beltway portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail: 'Tysons and Reston vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-66 / I-495 / Dulles Toll Road congestion',
        detail: 'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, truck limits, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Federal and contractor hard dates',
        detail: 'Report-to-duty and lease-end clusters create mid-week competition for crews.',
      },
      {
        title: 'Cross-county NoVA and DC/MD empty miles',
        detail: 'Arlington, Loudoun, PW, and interstate destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,600+',
        note: 'Higher with elevator buildings or peak Beltway pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,200+',
        note: 'HOA and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / high-rise / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Tysons towers and long I-66 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$200+/hr',
        note: 'Portal-to-portal; packing and COI admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Fairfax County move',
    intro:
      'School calendars, federal contractor cycles, humidity, and HOA/elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-66 / I-495 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'South-central and west SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans for open-path loads.',
      },
      {
        title: 'Fiscal-year and contractor relocation clusters',
        detail:
          'Federal-adjacent calendars create mid-week spikes. Confirm report dates, storage-in-transit, and temporary housing early.',
      },
    ],
  },
  specialized: [
    {
      id: 'fairfax-hoa-elevator-beltway',
      title: 'Fairfax HOA, elevator & Beltway logistics module',
      intro:
        'Fairfax estimates fail more often on elevator packets, HOA rules, and I-66/I-495 portal time than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Collect HOA gate lists, truck-length limits, and approved hours for Reston–Centreville–Burke product.',
        'Price portal-to-portal time for any pair that rides I-66, I-495, VA-28, or the Dulles Toll Road at peak.',
        'Photo curb options, stair counts, and driveway grade for Annandale / Springfield / Great Falls stock.',
        'Clarify Fairfax County vs Fairfax City vs Arlington / Loudoun / PW addresses on every estimate.',
        'Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'federal-contractor-relocation',
      title: 'Federal contractor & professional relocation module',
      intro:
        'Many Fairfax households move on agency, contractor, or consulting timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty or start dates at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Prefer mid-week early windows when security badges and building access are weekday-only.',
        'Match inventory complexity (home office, secure gear policies) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Fairfax County?',
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
              'Fairfax County Public Schools (FCPS) is the primary public K–12 system for most county addresses. Assignment is address-based — marketing names like Tysons or Reston do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West and south growth corridors can see enrollment pressure. Ask FCPS about capacity, boundary adjustments, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'FCPS boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Inova Fairfax and other Inova campuses anchor much of the county, with additional specialty and military-adjacent options metro-wide. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Centreville or Springfield to preferred campuses — Beltway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical Tysons/Reston product vs suburban tracts',
            detail:
              'Expect condo and multifamily stacks near Tysons and Reston Town Center; larger HOA SFH dominate Centreville, Burke, Fairfax Station, and much of Herndon.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for HOA/condo dues, older-home repair risk, and insurance on higher-value inventories.',
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
        title: 'Which Fairfax areas fit whom',
        bullets: [
          {
            title: 'Tysons / McLean urban-professional lifestyle',
            detail:
              'Suits people prioritizing transit-adjacent density and short employer access — with elevator, parking, and COI tradeoffs on move day.',
          },
          {
            title: 'Reston–Herndon planned community living',
            detail:
              'Often appeals for path networks, mixed product, and Dulles corridor jobs — with HOA logistics and toll-road peaks.',
          },
          {
            title: 'Springfield–Annandale–Burke family corridors',
            detail:
              'Attracts households seeking more SFH space and established neighborhoods — with Beltway timing and basement carries.',
          },
          {
            title: 'West Centreville–Chantilly growth',
            detail:
              'Fits buyers chasing newer housing and VA-28 access — with longer DC-bound peak commutes.',
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
              'Federal contractors, professional services, healthcare, tech along the Dulles corridor, and retail/office cores at Tysons and Fair Oaks concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households remain car-dependent outside Metro-served nodes. I-66, I-495, VA-28, and the Dulles Toll Road peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Fairfaxes',
            detail:
              'Fairfax stacks tower living, master-planned villages, older inner-suburb grids, estate edges, and I-95 growth pockets — different from Arlington’s high-rise peninsula or Prince William’s outer HOA belt.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters with occasional ice events. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and events concentrate around Tysons, Reston Town Center, and older commercial strips; south and west corridors feel more family- and school-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Fairfax County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Fairfax County — official site',
        href: 'https://www.fairfaxcounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Fairfax County Public Schools',
        href: 'https://www.fcps.edu/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'City of Fairfax',
        href: 'https://www.fairfaxva.gov/',
        external: true,
        note: 'Independent city — confirm address jurisdiction',
      },
      {
        label: 'VDOT 511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-66 / I-495 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for Tysons and Reston towers; HOA fluency for Centreville–Burke–Herndon product; honest I-66 / I-495 timing for cross-zone pairs. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
