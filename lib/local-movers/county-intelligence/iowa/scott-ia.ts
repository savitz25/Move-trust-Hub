import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIaPack,
  IA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/iowa/ia-shared';

/**
 * Scott County, IA — Davenport / Quad Cities (IA side) / Bettendorf / Eldridge.
 * Cross-river Illinois pairs are routine. NOT Des Moines east, NOT Cedar Rapids.
 */
export const scottCountyIaIntelligence: CountyIntelligencePack = finalizeIaPack({
  countySlug: 'scott',
  hubTitle: 'Scott County Moving Intelligence Hub',
  eyebrow:
    'Scott County, IA · Davenport–Bettendorf Quad Cities, river bridges & I-74 / I-80 logistics',
  h1: 'Moving in Scott County: Quad Cities Access, River Bridges & I-74 / I-80 Logistics',
  heroOpener:
    'Scott County, Iowa is the Iowa half of the Quad Cities — not a Des Moines eastern suburb clone, not Cedar Rapids industrial stock, and not a generic Mississippi River template. Expect Davenport downtown and Village of East Davenport multi-unit, historic grid bungalows, Bettendorf bluff and HOA growth, Eldridge and northern industrial-residential belts, and I-74 / I-80 / US-61 / US-67 freeflow that rewrites “local” estimates. A riverfront loft dock slot, a McClellan Heights stair stack, a Bettendorf gated driveway, and a Rock Island or Moline unload across the Mississippi do not share truck access, authority, or crew skill. Cross-river Illinois pairs are routine interstate jobs — not “still local.” This hub is for people moving in Scott County, IA — Davenport–Bettendorf Quad Cities — not a renamed Polk or Linn page.',
  heroCredibility:
    'Iowa DOT Intrastate Motor Carrier Permit (household goods) for intrastate · FMCSA for interstate (including Illinois-side pairs) · Quad Cities bridge & I-74 / I-80 logistics awareness · Curated listings',
  majorCorridors: 'I-74 · I-80 · US-61 · US-67 · local Quad Cities grid',
  whatMakesDifferent: {
    title: 'What makes moving in Scott County different',
    intro:
      'These are Quad Cities realities — Davenport riverfront product, Bettendorf growth, bridge freeflow, and Illinois-side interstate pairs — not Des Moines I-235 insurance corridors and not Cedar Rapids I-380 industrial belts.',
    bullets: [
      {
        title: 'This is Quad Cities — not Des Moines east and not Cedar Rapids',
        detail:
          'Ignore Polk capital-city elevator defaults and Linn plant-corridor assumptions. Scott is Iowa’s river metro with Mississippi bridges, shared labor markets with Rock Island–Moline–East Moline, and bi-state daily logistics. Match estimates to Quad Cities geography — not central Iowa scripts.',
      },
      {
        title: 'Illinois-side pairs are routine interstate authority problems',
        detail:
          'Households regularly move Scott ↔ Rock Island County IL, Moline, East Moline, or Silvis. An Iowa DOT Intrastate Motor Carrier Permit covering household goods alone does not authorize Illinois delivery — verify FMCSA USDOT/MC when any leg leaves Iowa. Do not substitute IL ICC credentials for Iowa intrastate work or treat bridge miles as “still local.”',
      },
      {
        title: 'River bridges rewrite portal-to-portal time',
        detail:
          'I-74 bridge, Centennial Bridge approaches, and US-67 river crossings compress schedules at peak, incident, and weather events. A Bettendorf ↔ Rock Island pair looks short on a map and regional at rush hour.',
      },
      {
        title: 'Davenport downtown and Village multi-unit is not Bettendorf HOA product',
        detail:
          'Elevators, walk-ups, tight river-adjacent curb, and event freeflow dominate core jobs. A Bettendorf bluff cul-de-sac or Eldridge ranch does not share that stack.',
      },
      {
        title: 'Bluffs, basements, and historic grids underprice flat-rate optimism',
        detail:
          'McClellan Heights, older Davenport grids, and bluff driveways add stairs, slope, and curb friction that new-subdivision assumptions miss.',
      },
      {
        title: 'I-74, I-80, US-61, and US-67 burn cross-zone hours',
        detail:
          'Davenport ↔ Bettendorf, Eldridge ↔ downtown, or LeClaire edges ↔ west-side pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      IA_REG_BULLET,
    ],
  },
  zonesHeading: 'Scott County access zones',
  zonesIntro:
    'Plan by Davenport downtown–Village multi-unit, historic grids and bluffs, Bettendorf growth, Eldridge–northern belts, and river-bridge approach corridors — access and authority rules cluster by product and state line more than ZIP alone.',
  zones: [
    {
      id: 'downtown-village-davenport',
      name: 'Downtown Davenport, Village of East Davenport & riverfront multi-unit',
      shortName: 'Downtown / Village',
      neighborhoods: [
        'Downtown Davenport',
        'Village of East Davenport',
        'Riverfront edges',
        'Modern Woodmen Park edges',
        '2nd–3rd Street corridors',
        'Bridge approach blocks',
      ],
      housingTypes: 'Loft conversions, mid-rise multifamily, walk-up multi-unit',
      challenges: [
        'Elevator reservations, docks, and building COIs where applicable',
        'Limited legal curb and event-day freeflow',
        'Bridge approach congestion and river-corridor staging limits',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early starts. Photo curb staging near riverfront and bridge approaches.',
      cityKeywords: [
        'davenport',
        'downtown davenport',
        'village of east davenport',
        'east village davenport',
      ],
    },
    {
      id: 'mcclellan-historic-grids',
      name: 'McClellan Heights, historic grids & bluff stock',
      shortName: 'McClellan / grids',
      neighborhoods: [
        'McClellan Heights',
        'Historic District edges',
        'Central Davenport grids',
        'Bridge Avenue corridors',
        'West Davenport edges',
        'Bluff residential pockets',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, bluff lots',
      challenges: [
        'Basement stairs, slope, and scarce truck length',
        'Tight residential curb and tree-lined blocks',
        'Winter ice on bluff approaches',
      ],
      moverTips:
        'Survey stair counts, driveway slope, and basement access with photos. Prefer mid-week starts. Inventory long carries carefully.',
      cityKeywords: [
        'mcclellan heights',
        'davenport',
      ],
    },
    {
      id: 'bettendorf-growth',
      name: 'Bettendorf bluffs, HOAs & eastern growth belts',
      shortName: 'Bettendorf',
      neighborhoods: [
        'Bettendorf',
        'Duck Creek corridors',
        'Middle Road corridors',
        'Devils Glen edges',
        'Eastern HOA growth',
        'River bluff edges',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, bluff SFH',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-74 / US-67 freeflow and bridge approaches',
        'Slope and driveway product on bluff stock',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length and slope access. Price I-74 bridge pairs portal-to-portal for Illinois unloads.',
      cityKeywords: [
        'bettendorf',
      ],
    },
    {
      id: 'eldridge-north',
      name: 'Eldridge, northern industrial-residential & I-80 belts',
      shortName: 'Eldridge / north',
      neighborhoods: [
        'Eldridge',
        'Long Grove edges',
        'Donahue edges',
        'Northern industrial corridors',
        'I-80 north belts',
        'Highway 61 north edges',
      ],
      housingTypes: 'SFH, multi-family, industrial-adjacent residential, ranch stock',
      challenges: [
        'I-80 freeflow and freight traffic',
        'Longer empty miles vs riverfront core',
        'Industrial shift-change congestion',
      ],
      moverTips:
        'Avoid peak industrial windows when flexible. Price I-80 honestly for Davenport unload pairs. Clarify Eldridge vs unincorporated addresses.',
      cityKeywords: [
        'eldridge',
        'long grove',
      ],
    },
    {
      id: 'west-davenport-blue-grass',
      name: 'West Davenport, Blue Grass edges & western grids',
      shortName: 'West Davenport',
      neighborhoods: [
        'West Davenport corridors',
        'Blue Grass edges',
        'Northwest Davenport',
        'Kimberly Road corridors',
        'Locust Street corridors',
        'Western multi-family pockets',
      ],
      housingTypes: 'Ranch and split-level SFH, multi-unit, older grids',
      challenges: [
        'US-61 / Kimberly freeflow',
        'Mixed older stock and multi-family rules',
        'Cross-zone empty miles to Bettendorf',
      ],
      moverTips:
        'Survey multi-unit building rules early. Price west–east pairs portal-to-portal. Prefer mid-week starts on arterial-adjacent blocks.',
      cityKeywords: [
        'davenport',
        'blue grass',
      ],
    },
    {
      id: 'leclaire-princeton-river',
      name: 'LeClaire, Princeton & upper-river edges',
      shortName: 'LeClaire / upper river',
      neighborhoods: [
        'LeClaire',
        'Princeton edges',
        'Riverdale edges',
        'US-67 river corridors',
        'Upper-river residential',
        'Tourism-corridor blocks',
      ],
      housingTypes: 'SFH, multi-unit pockets, river-adjacent stock',
      challenges: [
        'US-67 freeflow and tourism/event curb shrinkage',
        'Longer empty miles to Davenport core',
        'River weather and ice constraints in winter',
      ],
      moverTips:
        'Avoid peak tourism windows when flexible. Price empty miles honestly. Survey river-adjacent staging carefully.',
      cityKeywords: [
        'leclaire',
        'princeton',
        'riverdale',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Scott County moving costs',
    intro:
      'Access product, bridge freeflow, multi-unit admin, and interstate Illinois-side authority complexity move the number more than packing skill alone — this is Quad Cities logistics, not Des Moines or Cedar Rapids defaults.',
    drivers: [
      {
        title: 'Riverfront elevators, docks & multi-unit COIs',
        detail:
          'Downtown Davenport and Village vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Bluff stairs, basements & historic-grid curb',
        detail:
          'McClellan Heights and older stock add flight counts and slope that flat-rate optimism underprices.',
      },
      {
        title: 'I-74 · I-80 · US-61 · US-67 & bridge congestion',
        detail:
          'Cross-metro and cross-river pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Bettendorf HOA gates & truck-length rules',
        detail:
          'Eastern growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Illinois-side interstate empty miles & authority',
        detail:
          'Rock Island, Moline, and East Moline destinations raise staging distance and require FMCSA — Iowa DOT household goods permit alone is not enough.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,700+',
        note: 'Higher with elevators, walk-ups, bridges, or peak I-74 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, multi-unit, HOA, and bridge soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-river',
        value: '$2,500–$8,500+',
        note: 'Core multi-unit and Illinois-side pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, bridges, and interstate scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Scott County move',
    intro:
      'Lease cycles, school calendars, river-corridor events, summer heat, severe-storm season, and winter ice on bridges and bluffs reshape access across the Quad Cities grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease bridge freeflow, and reduce I-74 / I-80 pain. Avoid month-end Fridays when leases and multi-unit elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends, HOA slots, and bridge-heavy pairs.',
      },
      {
        title: 'River events & tourism curb shrinkage',
        detail:
          'Festival and waterfront event calendars compress downtown and LeClaire staging. Confirm building blackout windows and alternate curb.',
      },
      {
        title: 'Winter ice, freeze-thaw, and bridge weather',
        detail:
          'December–February adds icy bluff stoops, frozen driveways, and bridge slowdowns or closures risk. Prefer flexible dates, salt contingency, and weather windows for cross-river unloads.',
      },
    ],
  },
  specialized: [
    {
      id: 'scott-qc-bridge-interstate',
      title: 'Quad Cities multi-unit, bridge & cross-river interstate module',
      intro:
        'Scott County estimates fail more often on stair surveys, bridge freeflow, multi-unit packets, and Illinois-side authority gaps than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules for downtown and Village multi-unit before the survey is final.',
        'Photo stair counts, curb options, driveway slope, and basement access for bluff and historic-grid stock.',
        'Price portal-to-portal time for any pair that rides I-74, I-80, US-61, US-67, or a Mississippi bridge at peak.',
        'Collect HOA packets early for Bettendorf product.',
        'Treat Rock Island / Moline / East Moline unloads as interstate — verify FMCSA; Iowa DOT household goods permit alone is not enough.',
        'For in-state-only jobs verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file). Do not hardcode IL ICC as Iowa permission.',
      ],
    },
    {
      id: 'not-dsm-not-cr-not-local-il',
      title: 'Not Des Moines · not Cedar Rapids · not “still local” Illinois module',
      intro:
        'A single “eastern Iowa rate” collapses when Quad Cities river-bridge product is confused with Polk insurance corridors, Linn industrial belts, or treated as if Illinois delivery needs no FMCSA.',
      bullets: [
        'Do not price Davenport riverfront lofts like Des Moines East Village towers or like NewBo as interchangeable defaults.',
        'Keep Scott vs Muscatine / Clinton county lines clear on multi-address estimates.',
        'Never treat bridge miles into Illinois as an intrastate Iowa job.',
        'Match downtown lease peaks separately from Bettendorf school-calendar waves and Illinois-side reverse-commute patterns.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Scott County?',
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
              'Scott County spans Davenport Community Schools plus Bettendorf, Pleasant Valley, North Scott, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Illinois-side districts are separate systems if you commute or relocate across the river.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Iowa Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Genesis Health System, UnityPoint Health – Trinity (Quad Cities region), and specialty campuses serve Scott County and the broader Quad Cities. Confirm insurance networks for your household — including Illinois-side facilities if relevant.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — bridge freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Davenport downtown and Village multi-unit; historic grids and bluff SFH; Bettendorf HOA and bluff growth; Eldridge industrial-residential; west-side ranch and multi-family; upper-river edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for multi-unit dues, older-building repair risk, and bluff maintenance where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Village urban lifestyle',
            detail:
              'Suits people prioritizing walkability and river amenities — with multi-unit access and event-day tradeoffs on move day.',
          },
          {
            title: 'McClellan / historic character living',
            detail:
              'Often appeals for neighborhood feel — with basements, bluff slope, and denser staging constraints.',
          },
          {
            title: 'Bettendorf growth living',
            detail:
              'Attracts households seeking newer product and schools — with HOA rules and bridge freeflow as daily inputs.',
          },
          {
            title: 'Eldridge / northern industrial-residential',
            detail:
              'Fits buyers chasing relative space and I-80 access — with longer empty miles to the riverfront core.',
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
              'Manufacturing, logistics, healthcare, agribusiness offices, education, and bi-state professional services concentrate demand across the Quad Cities — including Illinois-side reverse commutes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak bridge and freeway freeflow is real. Test peak routes — including Illinois-side campuses — before choosing solely on rent or purchase price.',
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
              'Scott County is Iowa’s Quad Cities river metro — shared daily life with Rock Island–Moline, not a Des Moines suburb and not a Cedar Rapids industrial clone. River culture, bluffs, and bi-state commerce define the rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm risk, river humidity, and freeze-thaw winters with ice on bluffs and bridges. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — river events, school calendars, industrial shifts, and winter bridge weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Scott County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Iowa DOT Intrastate Motor Carrier Permit (household goods) status for in-state moves and FMCSA for interstate legs — including Illinois-side pairs — before deposits.',
    items: [
      {
        label: 'Scott County, Iowa — official site',
        href: 'https://www.scottcountyiowa.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Davenport',
        href: 'https://www.davenportiowa.com/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Bettendorf',
        href: 'https://www.bettendorf.org/',
        external: true,
        note: 'Eastern growth municipality context',
      },
      {
        label: '511ia — Iowa traveler information',
        href: 'https://www.511ia.org/',
        external: true,
        note: 'I-74 / I-80 / US-61 / US-67 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-unit and riverfront curb fluency for downtown–Village product; bluff/basement experience for historic grids; HOA fluency for Bettendorf; honest I-74 · I-80 · US-61 · US-67 and bridge timing for cross-zone pairs. Verify Iowa DOT Intrastate Motor Carrier Permit covering household goods (tariffs on file) for intrastate moves and FMCSA for interstate legs — especially Illinois-side Quad Cities unloads — before deposits. Do not treat IL ICC as Iowa permission.',
  lastReviewed: '2026-07-24',
});
