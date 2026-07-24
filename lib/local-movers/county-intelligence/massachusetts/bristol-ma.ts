import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Bristol County, MA — South Coast New Bedford / Fall River (not Boston).
 */
export const bristolCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'bristol',
  hubTitle: 'Bristol County Moving Intelligence Hub',
  eyebrow: 'Bristol · South Coast, New Bedford, Fall River & I-195 logistics',
  h1: 'Moving in Bristol County: South Coast Access, New Bedford & Fall River Logistics',
  heroOpener:
    'Bristol County is not a Boston neighborhood rename and not a South Shore clone — it is South Coast New Bedford and Fall River mill-city product, Taunton and Attleboro corridor suburbs, Portuguese and working-waterfront neighborhoods, and I-195 freeflow that rewrites “local” portal time. A New Bedford triple-decker with porch flights, a Fall River hillside two-family, an Attleboro HOA townhome, and a Dartmouth colonial on a long driveway do not share truck access or crew skill. I-195, Route 24, Route 6, and Route 140 turn short map miles into billable hours when peak commute, port approaches, and lease-end waves collide. This hub is for people moving in Bristol County — not a renamed Boston-metro page or Cape Cod seasonal script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-195 · Route 24 · Route 6 · Route 140',
  whatMakesDifferent: {
    title: 'What makes moving in Bristol County different',
    intro:
      'These are Bristol and South Coast realities — mill-city triple-deckers, Fall River hill grids, and Rhode Island–linked freeflow — not Boston elevator towers or Cape bridge calendars.',
    bullets: [
      {
        title: 'New Bedford waterfront and triple-decker product rewrites labor',
        detail:
          'North End, South End, and downtown-adjacent New Bedford blocks stack multi-flight porches, tight curb, and long carries. Flat-rate optimism from Attleboro cul-de-sacs underprices flight counts and truck placement.',
      },
      {
        title: 'Fall River hills and mill-city stock are not Taunton clones',
        detail:
          'Flint Village, Highlands, and central Fall River need stair surveys, narrow-street staging, and mixed alley access — different logistics from Taunton ranch belts or Seekonk suburban tracts.',
      },
      {
        title: 'I-195, Route 24, Route 6, and Route 140 turn short miles into portal hours',
        detail:
          'New Bedford ↔ Fall River, Taunton ↔ Attleboro, or Dartmouth ↔ Somerset pairs look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Rhode Island border pairs are routine and change authority math',
        detail:
          'Seekonk, Attleboro, Swansea, and Somerset households regularly cross into Providence County. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      {
        title: 'Taunton and Attleboro corridors are a separate micro-market',
        detail:
          'Taunton, Raynham, Attleboro, and North Attleborough stack HOA rules, two-story inventories, and Route 24 / I-95 freeflow that differ from port-edge New Bedford or Fall River hills. Do not reuse one “Bristol rate” across all three.',
      },
      {
        title: 'South Coast weather and waterfront staging reshape open carries',
        detail:
          'Wind, salt air, and tight port-adjacent streets shrink staging options in New Bedford and Fall River. Prefer early starts, mats and tarps, and contingency when either address is a triple-decker on a narrow block.',
      },
      {
        title: 'Multi-county South Coast and Metro West pairs are common',
        detail:
          'Households regularly move Bristol ↔ Plymouth, Norfolk, Worcester, or Rhode Island. Confirm both endpoints so crew routing and licensing assumptions match the actual path.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Bristol County access zones',
  zonesIntro:
    'Plan by New Bedford waterfront and triple-deckers, Fall River hill grids, Taunton corridor product, Attleboro–Seekonk border belts, and Dartmouth–Westport South Coast edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'new-bedford-core',
      name: 'New Bedford core, waterfront & triple-decker belts',
      shortName: 'New Bedford',
      neighborhoods: [
        'Downtown New Bedford',
        'North End',
        'South End',
        'West End edges',
        'Waterfront / working port edges',
        'Acushnet Avenue corridor',
      ],
      housingTypes: 'Triple-deckers, older walk-ups, mill conversions, denser multifamily',
      challenges: [
        'Multi-flight porches, tight curb, and limited truck length',
        'Port-adjacent congestion and event-day freeflow',
        'I-195 / Route 6 approach timing into the city',
      ],
      moverTips:
        'Survey porch flights and curb options with photos. Prefer mid-week early starts. Confirm alley or side-street staging before finalizing labor hours.',
      cityKeywords: [
        'new bedford',
        'north end new bedford',
        'south end new bedford',
        'downtown new bedford',
        'acushnet avenue',
      ],
    },
    {
      id: 'fall-river-hills',
      name: 'Fall River hills, downtown & mill-city stock',
      shortName: 'Fall River',
      neighborhoods: [
        'Downtown Fall River',
        'Highlands',
        'Flint Village edges',
        'South End Fall River',
        'North End Fall River',
        'Waterfront edges',
      ],
      housingTypes: 'Two- and three-family stock, hillside SFH, mill-adjacent multifamily',
      challenges: [
        'Hill approaches, porch stairs, and basement carries',
        'Narrow streets with limited legal staging',
        'I-195 / Route 24 / Route 79 freeflow clusters',
      ],
      moverTips:
        'Count flights and photo driveway grade. Confirm truck length on hill blocks. Inventory basements and third-floor units carefully.',
      cityKeywords: [
        'fall river',
        'highlands fall river',
        'flint village',
        'downtown fall river',
      ],
    },
    {
      id: 'taunton-corridor',
      name: 'Taunton corridor (Taunton, Raynham, Norton edges)',
      shortName: 'Taunton corridor',
      neighborhoods: [
        'Taunton',
        'Raynham',
        'Norton edges',
        'Dighton edges',
        'Berkley edges',
        'East Taunton edges',
      ],
      housingTypes: 'Ranch and colonial SFH, townhomes, apartments, mixed multifamily',
      challenges: [
        'Route 24 / Route 140 / I-495 approach congestion',
        'Apartment turnover and guest-parking friction',
        'Mixed HOA and older-stock access by pocket',
      ],
      moverTips:
        'Price Route 24 portal time honestly for Fall River– or Attleboro-linked pairs. Survey apartment elevator/stair access and parking maps. Clarify city jurisdiction on every estimate.',
      cityKeywords: [
        'taunton',
        'raynham',
        'norton',
        'dighton',
        'berkley',
        'east taunton',
      ],
    },
    {
      id: 'attleboro-seekonk-border',
      name: 'Attleboro–Seekonk border belt (Attleboro, North Attleborough, Seekonk)',
      shortName: 'Attleboro border',
      neighborhoods: [
        'Attleboro',
        'North Attleborough',
        'Seekonk',
        'Mansfield edges',
        'Rehoboth edges',
        'Plainville edges',
      ],
      housingTypes: 'Two-story SFH, townhomes, HOA planned tracts, denser multifamily',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'I-95 / Route 1 / Route 152 Rhode Island–linked freeflow',
        'Interstate authority when unload crosses into RI',
      ],
      moverTips:
        'Confirm HOA rules before the crew day. Clarify MA vs RI addresses near Seekonk and Attleboro edges. Price interstate authority when any leg leaves Massachusetts.',
      cityKeywords: [
        'attleboro',
        'north attleborough',
        'seekonk',
        'mansfield',
        'rehoboth',
        'plainville',
      ],
    },
    {
      id: 'dartmouth-westport-coast',
      name: 'South Coast residential edges (Dartmouth, Westport, Fairhaven, Somerset)',
      shortName: 'South Coast edges',
      neighborhoods: [
        'Dartmouth',
        'Westport',
        'Fairhaven',
        'Somerset',
        'Swansea edges',
        'Acushnet edges',
      ],
      housingTypes: 'Colonial and ranch SFH, waterfront cottages, limited multifamily',
      challenges: [
        'Long driveways, soft shoulders, and limited turn radius',
        'Seasonal coastal traffic on Route 6 corridors',
        'Wind and weather exposure on open carries',
      ],
      moverTips:
        'Confirm driveway length and truck turnaround. Book around peak summer coastal traffic when possible. Survey stairs and outdoor inventory carefully on waterfront stock.',
      cityKeywords: [
        'dartmouth',
        'westport',
        'fairhaven',
        'somerset',
        'swansea',
        'acushnet',
      ],
    },
    {
      id: 'somerset-swansea-mount-hope',
      name: 'Mount Hope Bay edges (Somerset, Swansea, Fall River waterfront links)',
      shortName: 'Mount Hope Bay',
      neighborhoods: [
        'Somerset',
        'Swansea',
        'Fall River waterfront links',
        'Brayton Point edges',
        'Route 6 bay-adjacent pockets',
      ],
      housingTypes: 'SFH, modest multifamily, bay-adjacent stock',
      challenges: [
        'Bridge and bay-approach freeflow variability',
        'Mixed industrial-edge and residential staging',
        'Rhode Island–linked pairs across the bay',
      ],
      moverTips:
        'Build bridge and I-195 buffers into the estimate. Photo curb and driveway options. Clarify whether either address requires RI authority.',
      cityKeywords: [
        'somerset',
        'swansea',
        'brayton point',
        'mount hope bay',
        'fall river',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bristol County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Triple-decker flights, hill stairs, HOA soft costs, and I-195 / Route 24 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Triple-deckers, porches & Fall River hill carries',
        detail:
          'New Bedford and Fall River stock add flight counts and awkward turns that suburban flat rates underprice.',
      },
      {
        title: 'I-195 · Route 24 · Route 6 · Route 140 congestion',
        detail:
          'Cross-city and border pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & Attleboro-corridor building packets',
        detail:
          'Attleboro, North Attleborough, and planned tracts add admin soft costs and timed windows.',
      },
      {
        title: 'Rhode Island border empty miles & authority complexity',
        detail:
          'Seekonk and Attleboro pairs into Providence County raise staging distance and FMCSA requirements.',
      },
      {
        title: 'Coastal seasonal traffic on South Coast edges',
        detail:
          'Summer Route 6 freeflow and weekend demand compress schedules for Dartmouth–Westport product.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with triple-decker flights or peak I-195 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,250–$4,000+',
        note: 'Stairs, curb friction, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / triple-decker / cross-zone SFH',
        value: '$2,700–$8,200+',
        note: 'Full triple-deckers and RI-linked pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, stairs, and long carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Bristol County move',
    intro:
      'Lease cycles, South Coast summer traffic, school windows, winter ice, and HOA slots reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease I-195 and Route 24 freeflow, and reduce triple-decker street conflict. Avoid month-end Fridays when leases and porches collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and coastal Route 6 congestion.',
      },
      {
        title: 'Winter ice and snow friction (December–March)',
        detail:
          'Slick porches, narrow plowed streets, and limited dry staging slow open carries — especially on Fall River hills. Prefer early starts and flexible weather windows.',
      },
      {
        title: 'Border and professional mid-month spikes',
        detail:
          'Attleboro–Providence corridor relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates and interstate authority early.',
      },
    ],
  },
  specialized: [
    {
      id: 'south-coast-mill-city',
      title: 'South Coast mill-city, triple-decker & corridor logistics module',
      intro:
        'Bristol estimates fail more often on porch flights, Fall River hills, and I-195 / Route 24 timing than on packing skill alone.',
      bullets: [
        'Photo porch flights, curb options, and truck length for New Bedford and Fall River stock.',
        'Price portal-to-portal time for any pair that rides I-195, Route 24, Route 6, or Route 140 at peak.',
        'Confirm HOA gate lists and move hours on Attleboro-corridor planned tracts.',
        'Clarify Massachusetts vs Rhode Island addresses near Seekonk, Attleboro, and Swansea edges.',
        'Plan winter contingency on Fall River hill streets: mats, ice melt, and shorter outdoor carries.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'new-bedford-vs-attleboro-micro',
      title: 'New Bedford / Fall River vs Taunton / Attleboro micro-market module',
      intro:
        'A single “Bristol County rate” collapses when mill-city triple-deckers and border-suburb HOA product diverge a few miles apart.',
      bullets: [
        'Survey by product — triple-decker, hillside two-family, or HOA two-story — not by county name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-195 vs Route 24 vs Route 6).',
        'Match waterfront and third-floor inventories to experienced crews; do not assume one staging plan covers both addresses.',
        'Expect different parking norms between port cities and Attleboro-corridor suburbs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bristol County?',
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
              'New Bedford, Fall River, Taunton, Attleboro, and other municipalities run separate districts. Assignment is address-based — “South Coast” marketing does not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive in high-demand suburban pockets. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
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
              'Southcoast Health, Charlton Memorial / Saint Anne’s (Fall River), and other campuses anchor care across the South Coast; community options serve Taunton and Attleboro belts. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from New Bedford, Fall River, or Attleboro to preferred campuses — I-195 and Route 24 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Triple-deckers, hill stock, corridor SFH & coastal edges',
            detail:
              'Expect triple-deckers and mill product in New Bedford and Fall River; ranch and colonial mixes through Taunton; HOA townhomes near Attleboro; and coastal SFH in Dartmouth–Westport.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and town. Budget for older-building repair risk, parking, and insurance on higher-value inventories.',
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
        title: 'Which Bristol areas fit whom',
        bullets: [
          {
            title: 'New Bedford urban and waterfront lifestyle',
            detail:
              'Suits people prioritizing city amenities, cultural density, and relative value — with triple-decker stairs and curb tradeoffs on move day.',
          },
          {
            title: 'Fall River hill and mill-city living',
            detail:
              'Often appeals for space and price relative to Providence — with grades, stairs, and tight staging constraints.',
          },
          {
            title: 'Taunton and Attleboro corridor family belts',
            detail:
              'Attracts households chasing schools, employers, and Route 24 access — with HOA rules and commute realism toward Boston or Providence.',
          },
          {
            title: 'Dartmouth–Westport coastal residential edges',
            detail:
              'Fits buyers seeking more yard and South Coast character — with seasonal traffic and longer driveway logistics.',
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
              'Healthcare, fishing and port logistics, manufacturing, education, retail along Route 24 / I-195, and Providence-linked professional employment concentrate demand. Many households reverse-commute toward Rhode Island or Boston edges.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving with limited transit. I-195, Route 24, Route 6, and Route 140 peaks are real. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Bristols',
            detail:
              'Bristol stacks New Bedford waterfront, Fall River hills, Taunton corridors, Attleboro border suburbs, and Dartmouth–Westport coastal edges — different from Boston-metro living or Cape Cod seasonal logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England weather with coastal wind and real winter ice risk on open carries. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Portuguese and waterfront culture runs deep in New Bedford and Fall River; corridor towns skew more school- and commute-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bristol County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of New Bedford',
        href: 'https://www.newbedford-ma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Fall River',
        href: 'https://www.fallriverma.org/',
        external: true,
        note: 'City services & offices',
      },
      {
        label: 'City of Taunton',
        href: 'https://www.taunton-ma.gov/',
        external: true,
        note: 'Municipal services (Taunton corridor)',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-195 / Route 24 / Route 6 / Route 140 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with triple-decker and hill-street fluency for New Bedford and Fall River; honest I-195 · Route 24 · Route 6 · Route 140 timing for cross-zone pairs; Attleboro HOA readiness and RI-border authority clarity. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
