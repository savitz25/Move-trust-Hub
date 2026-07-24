import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Madison County, IL — Metro East / St. Louis-facing (not Chicago, not St. Clair clone).
 * Edwardsville–Glen Carbon growth, Alton river town, I-55 / I-70 / I-255 logistics.
 */
export const madisonCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'madison',
  hubTitle: 'Madison County Moving Intelligence Hub',
  eyebrow: 'Madison · Metro East · Edwardsville, Alton, Collinsville, Glen Carbon & I-55/I-70',
  h1: 'Moving in Madison County: Metro East Access, Edwardsville Growth & I-55 / I-70 Logistics',
  heroOpener:
    'Madison County is Illinois Metro East facing St. Louis — not a Chicago collar market and not a Belleville/St. Clair page with different city names. Edwardsville and Glen Carbon stack university-adjacent and HOA growth product; Alton and Godfrey hold river-town hills and older stock; Collinsville and Troy ride I-55/I-70 family corridors; Granite City and the river industrial belt bring plant-shift calendars and tighter access. A SIUE-area apartment, an Edwardsville HOA gate list, an Alton hillside carry, and a Granite City hard report date do not share truck access or crew skill. I-55, I-70, I-255, IL-3, and US-40 rewrite “local” estimates that ignore bridge approaches, Missouri-bound authority, and peak freight. This hub is for people moving in Madison County — St. Louis-facing Metro East logistics.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-55 · I-70 · I-255 · IL-3 · US-40',
  whatMakesDifferent: {
    title: 'What makes moving in Madison County different',
    intro:
      'These are Metro East realities — St. Louis-facing bridges, Edwardsville growth HOAs, and river-industrial calendars — not Chicago spillover and not Belleville/Scott AFB patterns alone.',
    bullets: [
      {
        title: 'Edwardsville–Glen Carbon growth product rewrites the job',
        detail:
          'HOA tracts, townhomes, and university-adjacent multifamily need gate lists, truck limits, and elevator or stair clarity. Same-county Alton hills do not share that stack.',
      },
      {
        title: 'I-55, I-70, and I-255 turn short map miles into billable hours',
        detail:
          'Edwardsville ↔ Collinsville, Glen Carbon ↔ Troy, or Alton ↔ Granite City pairs look local and still burn 45–90+ minutes at peak, construction, and bridge backups. Price portal-to-portal honestly.',
      },
      {
        title: 'Missouri-bound legs are routine — authority must match the route',
        detail:
          'Many households move Madison ↔ St. Louis City/County. An ICC household goods license alone does not authorize interstate delivery; confirm FMCSA when any stop leaves Illinois.',
      },
      {
        title: 'Alton–Godfrey hills and older river-town stock still matter',
        detail:
          'Steep drives, limited turn radius, basement carries, and tree-lined curb need driveway photos — not only HOA checklists from Edwardsville.',
      },
      {
        title: 'River industrial and plant-shift calendars reshape demand',
        detail:
          'Granite City and river-corridor employment create mid-week hard dates that compete with Saturday family demand for crews.',
      },
      {
        title: 'SIUE and academic lease cycles spike local multifamily demand',
        detail:
          'August and mid-year academic windows fill Edwardsville–Glen Carbon crews first. Book elevators, parking, and move-in slots early.',
      },
      {
        title: 'IL-3 and US-40 reshape north–south and east–west timing',
        detail:
          'Alton–Wood River–Granite City and Collinsville–Troy pairs ride these arterials with freight and retail peaks that suburban quotes underprice.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Madison County access zones',
  zonesIntro:
    'Plan by Edwardsville–Glen Carbon growth, Alton–Godfrey river hills, Collinsville–Troy I-55/I-70 belt, Granite City industrial river, Highland–east county, and Wood River–IL-3 corridor — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'edwardsville-glen-carbon',
      name: 'Edwardsville, Glen Carbon & SIUE-adjacent growth',
      shortName: 'Edwardsville / Glen Carbon',
      neighborhoods: [
        'Edwardsville',
        'Glen Carbon',
        'SIUE area',
        'Cottonwood / Route 157 edges',
        'Maryville edges',
      ],
      housingTypes: 'HOA SFH, townhomes, student and professional multifamily, newer tracts',
      challenges: [
        'HOA gate lists, truck limits, and approved move hours',
        'I-55 / I-270 approach congestion',
        'August academic and lease-end clusters',
      ],
      moverTips:
        'Collect HOA and building packets first. Prefer mid-week early starts. Confirm elevator vs walk-up and unit floor before final estimate.',
      cityKeywords: [
        'edwardsville',
        'glen carbon',
        'siue',
        'maryville',
        'cottonwood',
      ],
    },
    {
      id: 'alton-godfrey',
      name: 'Alton, Godfrey & river-hill older stock',
      shortName: 'Alton / Godfrey',
      neighborhoods: [
        'Alton',
        'Godfrey',
        'Upper Alton edges',
        'River bluff residential',
        'Monticello College corridor pockets',
      ],
      housingTypes: 'Older SFH, hillside homes, limited multifamily, historic stock',
      challenges: [
        'Steep drives, limited truck turn radius, long carries',
        'IL-3 / river-bridge approach traffic',
        'Basements, stairs, and tight curb on older grids',
      ],
      moverTips:
        'Pre-walk driveway grade and street width. Prefer smaller trucks when hills demand it. Photo staging options from both approaches.',
      cityKeywords: ['alton', 'godfrey', 'upper alton', 'river bluff'],
    },
    {
      id: 'collinsville-troy',
      name: 'Collinsville, Troy & I-55 / I-70 family belt',
      shortName: 'Collinsville / Troy',
      neighborhoods: [
        'Collinsville',
        'Troy',
        'Maryville commercial edges',
        'I-55 / I-70 residential corridors',
        'US-40 strip edges',
      ],
      housingTypes: 'Suburban SFH, townhomes, garden multifamily',
      challenges: [
        'I-55 / I-70 peak freeflow collapse toward St. Louis',
        'High Saturday family demand May–August',
        'Cross-county pairs into St. Clair and Missouri',
      ],
      moverTips:
        'Build interstate buffer for morning and evening peaks. Book peak Saturdays early. Clarify Madison vs St. Clair vs MO destinations.',
      cityKeywords: ['collinsville', 'troy', 'maryville', 'i-55', 'i-70'],
    },
    {
      id: 'granite-city-river',
      name: 'Granite City, river industrial & IL-3 south',
      shortName: 'Granite City / River',
      neighborhoods: [
        'Granite City',
        'Nameoki corridor edges',
        'River industrial residential',
        'Pontoon Beach edges',
        'Madison / Venice edges',
      ],
      housingTypes: 'Modest SFH, multifamily near employment, industrial-adjacent stock',
      challenges: [
        'Plant-shift hard dates and freight pulses',
        'IL-3 / I-270 congestion clusters',
        'Tighter curb and older access on some blocks',
      ],
      moverTips:
        'Ask about report dates at estimate time. Prefer early starts around shift change. Confirm curb legality and alley options.',
      cityKeywords: [
        'granite city',
        'pontoon beach',
        'nameoki',
        'madison il',
        'venice',
      ],
    },
    {
      id: 'highland-east',
      name: 'Highland, east Madison & outer growth',
      shortName: 'Highland / East',
      neighborhoods: [
        'Highland',
        'St. Jacob edges',
        'Marine edges',
        'East county rural-suburban mix',
        'US-40 east corridors',
      ],
      housingTypes: 'SFH, small-town cores, rural-lot edges, limited multifamily',
      challenges: [
        'Longer empty miles from west-county staging yards',
        'US-40 freight and small-town curb limits',
        'Weather-sensitive rural approaches',
      ],
      moverTips:
        'Price empty miles honestly. Share driveway and street photos. Build buffer for any Edwardsville- or I-55-linked pair.',
      cityKeywords: ['highland', 'st jacob', 'marine', 'east madison', 'us-40'],
    },
    {
      id: 'wood-river-il3',
      name: 'Wood River, Bethalto & IL-3 mid-county',
      shortName: 'Wood River / Bethalto',
      neighborhoods: [
        'Wood River',
        'Bethalto',
        'East Alton edges',
        'Roxana edges',
        'IL-3 mid-corridor residential',
      ],
      housingTypes: 'Modest SFH, small multifamily, older industrial-adjacent stock',
      challenges: [
        'IL-3 arterial peaks and industrial traffic',
        'Mixed older access and basement carries',
        'Cross-zone pairs into Alton hills or Edwardsville growth',
      ],
      moverTips:
        'Survey stairs and curb width. Price IL-3 portal time at peak. Clarify river-bridge vs inland destinations early.',
      cityKeywords: [
        'wood river',
        'bethalto',
        'east alton',
        'roxana',
        'il-3',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Madison County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, hillside access, interstate portal time, and Missouri authority complexity separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA packets, elevators & growth-tract rules',
        detail:
          'Edwardsville–Glen Carbon product adds schedule risk and truck constraints before packing skill matters.',
      },
      {
        title: 'I-55 / I-70 / I-255 / bridge congestion',
        detail:
          'Cross-zone and St. Louis-bound pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Hillside and older river-town access',
        detail:
          'Alton–Godfrey grade, stairs, and limited turn radius raise labor and sometimes force smaller equipment.',
      },
      {
        title: 'Academic and plant hard dates',
        detail:
          'SIUE lease clusters and industrial report dates create mid-week and August competition for crews.',
      },
      {
        title: 'Missouri and multi-county empty miles',
        detail:
          'St. Louis destinations and St. Clair pairs raise staging distance and interstate authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,450+',
        note: 'Higher with multifamily or peak interstate pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,800+',
        note: 'HOA and hillside soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / hills / interstate',
        value: '$2,400–$7,500+',
        note: 'Edwardsville estates and MO pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal; packing and COI/HOA admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Madison County move',
    intro:
      'School calendars, SIUE cycles, plant shifts, humidity, and interstate construction reshape access and crew availability across Metro East.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-55 / I-70 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Collinsville–Troy–Edwardsville Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'SIUE and academic move-in spikes',
        detail:
          'August and mid-year windows crowd Edwardsville–Glen Carbon multifamily. Reserve elevators and parking early.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries; winter ice on bluff streets is real. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'metro-east-st-louis-facing',
      title: 'Metro East St. Louis-facing logistics module',
      intro:
        'Madison estimates fail more often on HOA packets, interstate portal time, and Missouri authority mismatches than on packing skill alone.',
      bullets: [
        'Collect HOA gate lists, truck-length limits, and approved hours for Edwardsville–Glen Carbon product.',
        'Photo driveway grade, curb, and stair counts for Alton–Godfrey hillside stock.',
        'Price portal-to-portal time for any pair that rides I-55, I-70, I-255, IL-3, or US-40 at peak.',
        'Clarify Madison vs St. Clair vs Missouri addresses on every estimate before deposit.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for any out-of-state leg.',
        'Build bridge and construction buffers for St. Louis-bound windows.',
      ],
    },
    {
      id: 'siue-academic-industrial',
      title: 'SIUE academic & river-industrial relocation module',
      intro:
        'Many Madison households move on academic lease cycles or plant timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty, lease-end, or class-start dates at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Prefer mid-week early windows for multifamily elevators and industrial-adjacent curb.',
        'Match inventory complexity (student apartments vs full family SFH) to crew size and packing scope.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Madison County?',
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
              'Madison County is served by multiple unit districts (Edwardsville, Alton, Collinsville, Granite City, Highland, Troy/Triad-area patterns, and others). Assignment is address-based — marketing names like Glen Carbon do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Edwardsville–Glen Carbon and east growth corridors can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone. SIUE is a major higher-ed anchor, not a K–12 district.',
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
              'Anderson Hospital (Maryville), Alton Memorial / BJC-affiliated care, Gateway Regional patterns, and broader St. Louis metro specialty options serve Madison households. Confirm networks and Illinois vs Missouri facility preferences.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Highland or Godfrey to preferred campuses — interstate congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Growth HOA product vs river-town stock',
            detail:
              'Expect newer HOA SFH and multifamily around Edwardsville–Glen Carbon; older hills and historic stock in Alton–Godfrey; industrial-adjacent modest housing near Granite City; suburban belts along Collinsville–Troy.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for HOA dues on growth tracts and older-home repair risk on river hills.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and student/professional multifamily often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Madison areas fit whom',
        bullets: [
          {
            title: 'Edwardsville–Glen Carbon professional / university lifestyle',
            detail:
              'Suits people prioritizing newer housing, SIUE proximity, and school-oriented suburbs — with HOA logistics and I-55 peaks.',
          },
          {
            title: 'Alton–Godfrey river-town character',
            detail:
              'Often appeals for historic stock, bluff views, and lower entry prices — with hillside access and older-home maintenance.',
          },
          {
            title: 'Collinsville–Troy family corridors',
            detail:
              'Attracts households seeking SFH space and I-55/I-70 access toward St. Louis — with interstate timing tradeoffs.',
          },
          {
            title: 'Granite City employment-edge living',
            detail:
              'Fits buyers chasing industrial and river-corridor access — with plant-calendar and freight-traffic realities.',
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
              'Healthcare, education (including SIUE), logistics, manufacturing/river industry, professional services, and St. Louis metro reverse-commute or Missouri-bound jobs concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent and St. Louis-facing. I-55, I-70, I-255, IL-3, and US-40 peaks and bridge approaches are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Metro Easts',
            detail:
              'Madison stacks university growth suburbs, river bluff towns, interstate family belts, industrial river edges, and east small-town fabric — different from Chicago, different from Belleville/Scott AFB-centric St. Clair patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and winters with ice events on hills. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and events concentrate around Edwardsville, Alton corridors, and Collinsville retail strips; east county feels more small-town. Visit at peak and off-peak times when deciding — including a St. Louis peak-commute test if you work west of the river.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Madison County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Madison County — official site',
        href: 'https://www.madisoncountyil.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Edwardsville',
        href: 'https://www.cityofedwardsville.com/',
        external: true,
        note: 'Municipal services — growth-corridor hub',
      },
      {
        label: 'Southern Illinois University Edwardsville',
        href: 'https://www.siue.edu/',
        external: true,
        note: 'Academic calendars & campus housing context',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-55 / I-70 / I-255 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA/multifamily experience for Edwardsville–Glen Carbon; hillside access fluency for Alton–Godfrey; honest I-55 / I-70 / I-255 timing for cross-zone pairs; FMCSA readiness for Missouri legs. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
