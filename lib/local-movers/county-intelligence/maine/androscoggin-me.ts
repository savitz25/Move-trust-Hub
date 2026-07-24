import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMePack,
  ME_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/maine/me-shared';

/**
 * Androscoggin County, ME — Lewiston–Auburn mill-city densification.
 * NOT Portland west. NOT Augusta capital rename.
 */
export const androscogginCountyMeIntelligence: CountyIntelligencePack = finalizeMePack({
  countySlug: 'androscoggin',
  hubTitle: 'Androscoggin County Moving Intelligence Hub',
  eyebrow:
    'Androscoggin County, ME · Lewiston–Auburn mill cities / river pairs & I-95 logistics',
  h1: 'Moving in Androscoggin County: Lewiston–Auburn Mill-City Access, River Pairs & I-95 Logistics',
  heroOpener:
    'Androscoggin County, Maine is Lewiston–Auburn mill-city densification — multi-unit and mill housing stairs, Auburn residential grids, Lisbon–Sabattus edges, Poland–Mechanic Falls belts, rural southern and western approaches, and constant river-crossing L-A pairs — not Portland west suburbs and not Augusta capital defaults. Expect older mill walk-ups, scarce downtown curb, winter ice on river approaches, school-calendar peaks, and I-95 / ME-4 freeflow that rewrites “local” estimates. A Lewiston third-floor mill walk-up, an Auburn ranch, a Lisbon multi-unit, and a Poland lakeside edge home do not share truck access or crew skill. This hub is for people moving in Androscoggin County, ME — L-A mill-city logistics — not a Portland-west rename.',
  heroCredibility:
    'Written estimates + insurance for in-state · FMCSA for interstate · Mill housing stairs & L-A river-pair logistics · Curated listings',
  majorCorridors: 'I-95 · ME-4 · ME-11 · US-202 · local L-A grid',
  whatMakesDifferent: {
    title: 'What makes moving in Androscoggin County different',
    intro:
      'These are Androscoggin County / Lewiston–Auburn realities — mill housing stairs, river-crossing pairs, inland multi-unit densification, and I-95 freeflow — not Portland peninsula coastal defaults and not Augusta capital workforce scripts alone.',
    bullets: [
      {
        title: 'This is Androscoggin (Lewiston–Auburn) — not Portland west',
        detail:
          'Ignore Munjoy Hill coastal walk-up templates, Freeport outlet scripts, and Augusta capital-session defaults as interchangeable. Androscoggin is Lewiston mill multi-unit, Auburn residential and multi-unit grids, Lisbon–Sabattus edges, Poland–Mechanic Falls belts, rural southern/western approaches, and daily river-crossing L-A pairs. Match estimates to mill-city addresses — not Cumberland Portland density.',
      },
      {
        title: 'Older mill housing stairs rewrite walk-up labor',
        detail:
          'Lewiston multi-unit and mill-era stock bring multi-flight stairs, scarce curb, tight turning radii, and older interiors. An Auburn suburban ranch or Poland lakeside driveway does not share that packet stack.',
      },
      {
        title: 'River-crossing L-A pairs underprice flat-rate optimism',
        detail:
          'Lewiston ↔ Auburn looks like one market and still burns bridge freeflow, municipal rule mix, and portal time. Price L-A pairs as real logistics — not one free local hop.',
      },
      {
        title: 'Inland densification is not coastal tourism logistics',
        detail:
          'School calendars, multi-unit turnover, and mill-city curb dominate — not Old Orchard Beach tourism peaks or Freeport retail congestion. Match seasonal scripts to L-A reality.',
      },
      {
        title: 'I-95, ME-4, ME-11, and US-202 freeflow is real',
        detail:
          'Lewiston ↔ Lisbon, Auburn ↔ Poland, or L-A core ↔ rural pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and older mill stock reshape outdoor labor',
        detail:
          'Freeze-thaw ice on river approaches, pitched streets, and older basements raise stair and staging risk from November through March. Prefer early starts and weather contingency.',
      },
      ME_REG_BULLET,
    ],
  },
  zonesHeading: 'Androscoggin County access zones',
  zonesIntro:
    'Plan by Lewiston multi-unit / mill housing, Auburn grids, Lisbon–Sabattus edges, Poland–Mechanic Falls belts, rural southern/western approaches, and river-crossing L-A pairs — access rules cluster by mill density and bridge freeflow more than ZIP alone.',
  zones: [
    {
      id: 'lewiston-mill-multiunit',
      name: 'Lewiston multi-unit, mill housing & downtown densification',
      shortName: 'Lewiston multi-unit',
      neighborhoods: [
        'Downtown Lewiston',
        'Mill District edges',
        'Lisbon Street corridors',
        'Main Street multi-unit',
        'River-adjacent walk-ups',
        'Lewiston mill housing pockets',
      ],
      housingTypes: 'Mill-era multifamily, walk-ups, older multi-story, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce downtown curb',
        'Tight turning radii and older interiors',
        'Winter ice on pitched mill-district streets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Protect older interiors; confirm curb staging in writing before load day.',
      cityKeywords: [
        'lewiston',
      ],
    },
    {
      id: 'auburn',
      name: 'Auburn residential grids, multi-unit & river-pair product',
      shortName: 'Auburn',
      neighborhoods: [
        'Downtown Auburn',
        'Court Street corridors',
        'Center Street edges',
        'Auburn multi-unit pockets',
        'Suburban Auburn residential',
        'River-pair unload zones',
      ],
      housingTypes: 'Mixed multi-unit, ranch and two-story SFH, duplexes, village stock',
      challenges: [
        'Bridge freeflow to Lewiston pairs',
        'Mixed municipal rules across L-A',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify Lewiston vs Auburn addresses on every estimate. Price river-crossing freeflow honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'auburn',
      ],
    },
    {
      id: 'lisbon-sabattus',
      name: 'Lisbon, Sabattus & eastern edge belts',
      shortName: 'Lisbon / Sabattus',
      neighborhoods: [
        'Lisbon',
        'Lisbon Falls edges',
        'Sabattus',
        'ME-196 corridors',
        'Eastern subdivision pockets',
        'Eastern county residential',
      ],
      housingTypes: 'SFH, multi-unit limited, ranch and two-story stock, village product',
      challenges: [
        'Longer empty miles to L-A cores',
        'ME-196 / I-95 freeflow',
        'Mixed driveway and older stock access',
      ],
      moverTips:
        'Price empty miles to Lewiston–Auburn honestly. Collect subdivision access notes early. Confirm truck length and driveway turnaround.',
      cityKeywords: [
        'lisbon',
        'lisbon falls',
        'sabattus',
      ],
    },
    {
      id: 'poland-mechanic-falls',
      name: 'Poland, Mechanic Falls & western / lakeside edges',
      shortName: 'Poland / Mechanic Falls',
      neighborhoods: [
        'Poland',
        'Mechanic Falls',
        'Poland Spring edges',
        'Range Pond edges',
        'Western recreation corridors',
        'Western county residential',
      ],
      housingTypes: 'Lakeside SFH, rural-residential, village stock, multi-unit limited',
      challenges: [
        'Longer empty miles to L-A cores',
        'Seasonal lake-access and driveway geometry',
        'Winter ice on western approaches',
      ],
      moverTips:
        'Photo lakeside driveway pitch and turnaround. Prefer off-peak recreation weekends. Price empty miles honestly.',
      cityKeywords: [
        'poland',
        'mechanic falls',
      ],
    },
    {
      id: 'rural-southern-western',
      name: 'Rural southern & western township approaches',
      shortName: 'Rural S / W',
      neighborhoods: [
        'Southern rural belts',
        'Western township edges',
        'Dispersed residential nodes',
        'Long driveway stock',
        'Forest-adjacent approaches',
        'Unincorporated residential',
      ],
      housingTypes: 'Rural SFH, camps, long-driveway product, multi-unit rare',
      challenges: [
        'Long empty miles and extended approach times',
        'Gravel driveway width and turnaround limits',
        'Winter ice and remote staging risk',
      ],
      moverTips:
        'Price empty miles and approach time honestly. Survey driveway geometry with photos. Prefer weather contingency for winter rural jobs.',
      cityKeywords: [
        'turner',
        'greene',
        'leeds',
        'minot',
      ],
    },
    {
      id: 'river-crossing-la-pairs',
      name: 'River-crossing L-A pairs & bridge-corridor logistics',
      shortName: 'L-A river pairs',
      neighborhoods: [
        'Lewiston riverfront edges',
        'Auburn riverfront edges',
        'Bridge approach corridors',
        'Androscoggin River pairs',
        'Cross-city multi-unit pairs',
        'Shared L-A commercial edges',
      ],
      housingTypes: 'Mixed multi-unit and SFH on both banks, walk-ups, commercial-adjacent stock',
      challenges: [
        'Bridge congestion and dual-municipality rules',
        'Split curb and staging between cities',
        'Peak freeflow on short map-mile pairs',
      ],
      moverTips:
        'Treat every Lewiston ↔ Auburn pair as a real logistics hop. Confirm both municipal addresses. Price bridge freeflow and dual curb staging honestly.',
      cityKeywords: [
        'lewiston',
        'auburn',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Androscoggin County moving costs',
    intro:
      'Mill housing stairs, L-A river-pair freeflow, multi-unit curb, rural empty miles, and winter ice move the number more than packing skill alone — this is mill-city logistics, not Portland west or Augusta capital defaults.',
    drivers: [
      {
        title: 'Mill-era stairs, walk-ups & scarce downtown curb',
        detail:
          'Lewiston multi-unit rewrites jobs that look simple on a map.',
      },
      {
        title: 'River-crossing L-A bridge freeflow & dual municipalities',
        detail:
          'Lewiston ↔ Auburn pairs add portal time and rule mix before packing skill matters.',
      },
      {
        title: 'Older basements, tight turns & interior protection',
        detail:
          'Mill stock adds flight counts and damage risk that flat-rate optimism underprices.',
      },
      {
        title: 'I-95 · ME-4 · ME-11 · US-202 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Rural empty miles & winter ice staging',
        detail:
          'Poland, Lisbon, and rural approaches raise staging distance; freeze-thaw ice reshapes outdoor labor.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,550+',
        note: 'Higher with mill walk-ups, L-A bridge pairs, or I-95 freeflow',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$3,700+',
        note: 'Stairs, multi-unit soft costs, and river-pair freeflow trend up',
      },
      {
        label: '3–4+ BR / mill / cross-zone',
        value: '$2,400–$7,200+',
        note: 'Mill multi-unit and rural empty-mile pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Androscoggin County move',
    intro:
      'School calendars, multi-unit turnover, lake recreation on western edges, and winter ice reshape access and crew availability across the Lewiston–Auburn grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear mill-district curb, ease multi-unit freight windows, and reduce bridge and I-95 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and Lewiston multi-unit slots.',
      },
      {
        title: 'L-A multi-unit turnover risk',
        detail:
          'Mill-city lease cycles raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Winter ice & river-approach labor',
        detail:
          'November–March ice on mill streets, river approaches, and rural edges reshapes outdoor labor. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'mill-housing-la-river',
      title: 'Mill housing, L-A river pairs & I-95 logistics module',
      intro:
        'Androscoggin County estimates fail more often on stair surveys, mill-era access, river-crossing freeflow, and empty miles than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and mill-era access for Lewiston multi-unit early.',
        'Treat every Lewiston ↔ Auburn pair as dual-municipality logistics with real bridge freeflow.',
        'Photo driveway geometry for Poland–Mechanic Falls lakeside and rural southern/western stock.',
        'Price portal-to-portal time for any pair that rides I-95, ME-4, ME-11, or US-202 at peak.',
        'Clarify Lewiston, Auburn, Lisbon, Sabattus, Poland, Mechanic Falls, and rural township addresses on every estimate.',
        'For pure in-state Maine jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-portland-west',
      title: 'Not Portland west · not Augusta capital module',
      intro:
        'A single “inland Maine rate” collapses when L-A mill-city product is confused with Portland coastal multi-unit or Augusta capital workforce defaults.',
      bullets: [
        'Do not price Lewiston mill walk-ups like Munjoy Hill condos or like Augusta capital multi-unit as interchangeable defaults.',
        'State the market as Androscoggin County / Lewiston–Auburn on every estimate — disambiguate from Cumberland Portland and Kennebec capital.',
        'Keep river-crossing L-A pairs as a primary logistics driver — not a free local hop.',
        'Match school-calendar multi-unit peaks separately from lakeside recreation edges and rural empty-mile pricing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Androscoggin County?',
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
              'Androscoggin spans Lewiston, Auburn, Lisbon, Poland, Sabattus, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Bates College and other higher-ed presence shapes Lewiston-area demand.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and L-A boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Maine Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Central Maine Medical Center, St. Mary’s Regional Medical Center, and regional specialty partners anchor care across the L-A metro. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — river bridges, ME-4, and I-95 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Lewiston mill multi-unit and densification stock; Auburn mixed multi-unit and SFH; Lisbon–Sabattus edge residential; Poland–Mechanic Falls lakeside and village product; rural southern/western homes. Explicitly not Portland west suburban defaults.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by mill multi-unit vs suburban vs lakeside location. Budget for older-building repair risk and competitive rental seasons near employment nodes.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Multi-unit management often controls move hours, truck size, and deposits in denser Lewiston stock. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Lewiston multi-unit / mill-city lifestyle',
            detail:
              'Suits people prioritizing relative value and urban amenities — with stair, curb, and older-stock tradeoffs on move day.',
          },
          {
            title: 'Auburn residential living',
            detail:
              'Often appeals for mixed grids and L-A access — with bridge freeflow and dual-city logistics.',
          },
          {
            title: 'Lisbon / Sabattus edge living',
            detail:
              'Fits buyers chasing edge space and relative value — with longer empty miles to L-A cores.',
          },
          {
            title: 'Poland lakeside / rural living',
            detail:
              'Attracts households seeking lakeside or rural space — with empty miles and winter approach risk.',
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
              'Healthcare systems, education, manufacturing heritage employers, professional services, retail, and L-A metro services concentrate demand across the twin cities.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, ME-4, ME-11, and US-202 freeflow is real — including river-crossing choke points that make short L-A pairs longer than the map suggests. Test peak routes before choosing solely on rent or purchase price.',
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
              'Androscoggin County is Lewiston–Auburn mill-city Maine — multi-unit densification, river pairs, and inland edges — not Portland west suburbs and not Augusta capital product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / interior Maine climate with warm summers, lake recreation on western edges, and freeze-thaw winters. Plan outdoor staging, ice, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, multi-unit turnover, and winter weather reshape daily rhythm more than coastal tourism alone.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Androscoggin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Androscoggin County, Maine — official site',
        href: 'https://www.androscoggincounty.com/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Lewiston',
        href: 'https://www.lewistonmaine.gov/',
        external: true,
        note: 'Mill-city municipality context',
      },
      {
        label: 'City of Auburn',
        href: 'https://www.auburnmaine.gov/',
        external: true,
        note: 'Twin-city municipality context',
      },
      {
        label: 'Town of Lisbon',
        href: 'https://www.lisbonme.org/',
        external: true,
        note: 'Eastern edge municipality context',
      },
      {
        label: '511 Maine — traveler information',
        href: 'https://www.511maine.gov/',
        external: true,
        note: 'I-95 / ME-4 / US-202 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with mill multi-unit and stair fluency for Lewiston product; dual-city river-pair awareness for Lewiston–Auburn hops; honest I-95 · ME-4 · ME-11 · US-202 timing for cross-zone pairs; lakeside empty-mile pricing for Poland edges. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. This is Androscoggin County (Lewiston–Auburn) — not Portland west and not Augusta capital.',
  lastReviewed: '2026-07-24',
});
