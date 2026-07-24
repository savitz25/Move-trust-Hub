import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Leavenworth County, KS — Leavenworth / Lansing / Fort Leavenworth adjacency.
 */
export const leavenworthCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'leavenworth',
  hubTitle: 'Leavenworth County Moving Intelligence Hub',
  eyebrow:
    'Leavenworth County · Leavenworth / Lansing, Fort Leavenworth & US-73 / K-7 logistics',
  h1: 'Moving in Leavenworth County: Leavenworth–Lansing Access, Fort Adjacency & US-73 / K-7 Logistics',
  heroOpener:
    'Leavenworth County is the Leavenworth–Lansing metro with Fort Leavenworth adjacency — not a JOCO Overland Park HOA clone, not Kansas City, MO towers, and not a pure rural northeast-Kansas default. Expect historic downtown Leavenworth multi-unit, Fort Leavenworth PCS and housing turnover, Lansing growth product, Basehor and Tonganoxie belts, and US-73 / K-7 / K-92 / I-70 link freeflow that rewrites “local” estimates. A downtown stair carry, a fort-adjacent multi-family curb, a Lansing HOA driveway, and a Tonganoxie rural-residential approach do not share truck access or crew skill. Military PCS calendars and KC metro reverse-commute waves are real inputs. This hub is for people moving in Leavenworth County — Leavenworth / Lansing / Fort adjacency — not a renamed JOCO page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · Fort-adjacent & US-73 / K-7 logistics awareness · Curated listings',
  majorCorridors: 'US-73 · K-7 · K-92 · I-70 links · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Leavenworth County different',
    intro:
      'These are Leavenworth County realities — Fort Leavenworth adjacency, historic downtown stock, Lansing–Basehor growth, and US-73 / K-7 freeflow — not JOCO Overland Park HOA defaults and not Wyandotte urban KCK product alone.',
    bullets: [
      {
        title: 'Fort Leavenworth adjacency reshapes demand',
        detail:
          'PCS cycles, on- and near-post housing turnover, and schedule-sensitive military relocations compress crews in ways pure civilian apartment templates underprice. Confirm access rules near fort approaches and avoid peak gate-traffic windows when flexible.',
      },
      {
        title: 'Historic downtown Leavenworth is not Lansing growth product',
        detail:
          'Walk-ups, older basements, scarce curb, and character-grid carries dominate core jobs. A Lansing or Basehor cul-de-sac does not share that logistics stack.',
      },
      {
        title: 'Lansing, Basehor, and Tonganoxie growth is HOA- and school-calendar driven',
        detail:
          'Gate lists, truck-length limits, and summer family peaks rewrite jobs that look suburban-simple on paper. Same-county downtown product does not share that stack.',
      },
      {
        title: 'KC metro reverse-commute pairs are routine',
        detail:
          'Households regularly move Leavenworth County ↔ Johnson, Wyandotte, or Douglas County, or across the state line into Missouri. Price empty miles and authority honestly.',
      },
      {
        title: 'US-73, K-7, K-92, and I-70 links burn portal time',
        detail:
          'Leavenworth ↔ Basehor, Lansing ↔ Tonganoxie, or fort-edge ↔ I-70 pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Multi-county and interstate pairs need correct authority',
        detail:
          'A KCC Certificate of Public Convenience and Necessity alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kansas, including Missouri-side KC metro pairs.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Leavenworth County access zones',
  zonesIntro:
    'Plan by downtown Leavenworth historic multi-unit, Fort Leavenworth–adjacent housing belts, Lansing growth product, Basehor southern HOAs, Tonganoxie western belts, and rural-residential edges — access rules cluster by fort, municipal, and HOA product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-leavenworth',
      name: 'Downtown Leavenworth, historic grids & core multi-unit',
      shortName: 'Downtown Leavenworth',
      neighborhoods: [
        'Downtown Leavenworth',
        'Historic district corridors',
        '4th Street corridors',
        'Core multi-unit pockets',
        'River-adjacent edges',
        'Near-downtown character SFH',
      ],
      housingTypes: 'Walk-up multifamily, character SFH, limited elevators, older stock',
      challenges: [
        'Multi-flight stairs, basements, and scarce truck length',
        'Tight residential curb and older interiors',
        'Local arterial freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Protect older interiors and inventory basements carefully.',
      cityKeywords: [
        'leavenworth',
        'downtown leavenworth',
      ],
    },
    {
      id: 'fort-adjacent',
      name: 'Fort Leavenworth edges & fort-adjacent housing belts',
      shortName: 'Fort adjacent',
      neighborhoods: [
        'Fort Leavenworth edges',
        'Fort-adjacent multi-unit',
        'Metropolitan Avenue corridors',
        'Near-post residential belts',
        'PCS turnover multi-family',
        'North Leavenworth fort approaches',
      ],
      housingTypes: 'Multi-family, military-adjacent SFH, duplexes, limited elevators',
      challenges: [
        'Gate-traffic spikes and security-adjacent freeflow',
        'PCS calendar compression',
        'Mixed multi-unit rules and scarce curb',
      ],
      moverTips:
        'Avoid peak fort gate windows when flexible. Confirm multi-unit building rules early. Align surveys with PCS timelines when known.',
      cityKeywords: [
        'leavenworth',
        'fort leavenworth',
      ],
    },
    {
      id: 'lansing',
      name: 'Lansing growth, K-7 corridors & mid-county product',
      shortName: 'Lansing',
      neighborhoods: [
        'Lansing',
        'K-7 corridors',
        'Lansing growth HOAs',
        'Mid-county multi-unit pockets',
        'School-district residential belts',
        'Lansing–Leavenworth municipal edges',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, ranch and two-story stock',
      challenges: [
        'HOA packets and truck-length limits where present',
        'K-7 freeflow and empty miles vs downtown Leavenworth',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets early. Clarify Lansing vs Leavenworth addresses. Price K-7 honestly.',
      cityKeywords: [
        'lansing',
      ],
    },
    {
      id: 'basehor-south',
      name: 'Basehor, southern growth HOAs & K-7 / I-70 links',
      shortName: 'Basehor / south',
      neighborhoods: [
        'Basehor',
        'Southern growth HOAs',
        'K-7 south corridors',
        'I-70 link approaches',
        'Southern multi-family pockets',
        'JOCO-adjacent reverse-commute belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'K-7 / I-70 freeflow and longer empty miles vs Leavenworth core',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price K-7 and I-70 links honestly for northbound unload pairs.',
      cityKeywords: [
        'basehor',
      ],
    },
    {
      id: 'tonganoxie-west',
      name: 'Tonganoxie, western belts & US-24 / K-16 edges',
      shortName: 'Tonganoxie / west',
      neighborhoods: [
        'Tonganoxie',
        'Western growth pockets',
        'US-24 corridors',
        'K-16 edges',
        'Western multi-unit limited',
        'Outer western residential',
      ],
      housingTypes: 'SFH, multi-unit pockets, HOA limited, small-town stock',
      challenges: [
        'Longer empty miles to Leavenworth and KC metro cores',
        'Mixed municipal and rural-residential access',
        'US-24 freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Clarify Tonganoxie addresses. Align with school calendars when relevant.',
      cityKeywords: [
        'tonganoxie',
      ],
    },
    {
      id: 'rural-edges',
      name: 'Easton edges, rural-residential & northern county belts',
      shortName: 'Rural / edges',
      neighborhoods: [
        'Easton edges',
        'Linwood edges',
        'Rural-residential corridors',
        'Northern county belts',
        'K-92 corridors',
        'Unincorporated Leavenworth County',
      ],
      housingTypes: 'SFH, rural-residential, multi-unit limited',
      challenges: [
        'Longer empty miles to municipal cores',
        'Mixed driveway and gravel access product',
        'K-92 / county road freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Confirm unincorporated vs city addresses.',
      cityKeywords: [
        'easton',
        'linwood',
        'leavenworth',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Leavenworth County moving costs',
    intro:
      'Historic-grid stairs, fort-adjacent timing, HOA admin, and US-73 / K-7 freeflow move the number more than packing skill alone — this is Leavenworth–Lansing / Fort adjacency logistics, not JOCO Overland Park HOA-only pricing.',
    drivers: [
      {
        title: 'Historic downtown stairs, basements & curb limits',
        detail:
          'Leavenworth core stock adds flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Fort-adjacent PCS calendars & gate freeflow',
        detail:
          'Military turnover and approach traffic add schedule risk that pure civilian lease templates miss.',
      },
      {
        title: 'US-73 · K-7 · K-92 · I-70 link congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Lansing / Basehor HOA gates & growth windows',
        detail:
          'Southern and mid-county packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Metro reverse-commute & interstate empty miles',
        detail:
          'Johnson, Wyandotte, Douglas, and Missouri destinations raise staging distance and authority complexity when leaving Leavenworth County or Kansas.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,700+',
        note: 'Higher with walk-ups, fort timing, or peak K-7 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,000+',
        note: 'Stairs, multi-unit, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / multi-unit / cross-zone',
        value: '$2,500–$8,000+',
        note: 'PCS peaks and long K-7 / I-70 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and fort timing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Leavenworth County move',
    intro:
      'PCS cycles, school calendars, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the Leavenworth–Lansing grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit windows, and reduce US-73 / K-7 pain. Avoid month-end Fridays when leases and PCS dates collide.',
      },
      {
        title: 'Peak season: late May–mid-September (+ PCS waves)',
        detail:
          'Military turnover and family school calendars fill first. Book 2–4 weeks ahead for peak weekends and fort-adjacent or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older historic stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'leavenworth-fort-hoa',
      title: 'Fort-adjacent, historic multi-unit & US-73 / K-7 logistics module',
      intro:
        'Leavenworth County estimates fail more often on stair surveys, fort timing, HOA packets, and arterial freeflow than on packing skill alone.',
      bullets: [
        'Photo stair counts, curb options, and basement access for downtown Leavenworth historic stock.',
        'Avoid peak Fort Leavenworth gate windows when flexible; align with PCS timelines when known.',
        'Price portal-to-portal time for any pair that rides US-73, K-7, K-92, or I-70 links at peak.',
        'Collect HOA packets early for Lansing, Basehor, and growth product.',
        'Clarify Leavenworth, Lansing, Basehor, Tonganoxie, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-joco-not-kcmo',
      title: 'Not JOCO-only · not KCMO module',
      intro:
        'A single “Leavenworth” or “KC metro rate” collapses when fort-adjacent and historic product is confused with Overland Park HOAs or Kansas City, MO towers.',
      bullets: [
        'Do not price downtown Leavenworth walk-ups like Overland Park cul-de-sacs or like KCMO elevators as interchangeable defaults.',
        'State the market as Leavenworth County / Leavenworth–Lansing with Fort adjacency on every estimate.',
        'Match PCS peaks separately from Basehor school-calendar waves.',
        'Keep Leavenworth vs Johnson / Wyandotte / Douglas county lines clear; treat Missouri legs as interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Leavenworth County?',
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
              'Leavenworth County spans Leavenworth, Lansing, Basehor-Linwood, Tonganoxie, Fort Leavenworth USD (where applicable to eligible students), and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year, including military family timelines.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kansas State Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Cushing Memorial Hospital (Saint Luke’s), VA and military healthcare access patterns for eligible households, and KC metro specialty campuses via K-7 / I-70 links anchor care. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — US-73, K-7, and I-70 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect historic downtown Leavenworth multi-unit and character SFH; fort-adjacent multi-family; Lansing growth product; Basehor southern HOAs; Tonganoxie small-town stock; rural-residential edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by municipality and fort proximity. Budget for multi-unit dues, older-building repair risk, and competitive seasons near PCS waves.',
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
            title: 'Downtown Leavenworth historic living',
            detail:
              'Suits people prioritizing character and walkable core amenities — with stairs, curb limits, and older-stock logistics on move day.',
          },
          {
            title: 'Fort-adjacent housing',
            detail:
              'Often appeals for military and near-post convenience — with gate freeflow and PCS calendar tradeoffs.',
          },
          {
            title: 'Lansing / Basehor growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and reverse-commute empty miles to JOCO / KC.',
          },
          {
            title: 'Tonganoxie / rural-edge living',
            detail:
              'Attracts households seeking quieter product — with empty-mile logistics to employment cores.',
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
              'Fort Leavenworth and military support, corrections and government employment, healthcare, education, logistics, and KC metro reverse-commute patterns concentrate demand across the county.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak US-73, K-7, K-92, and I-70 freeflow is real — including JOCO and Wyandotte reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Leavenworth County stacks historic river-city character, Fort Leavenworth adjacency, and Lansing–Basehor growth belts — different from JOCO Overland Park suburbia and Kansas City, MO urban defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — PCS cycles, school calendars, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Leavenworth County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Leavenworth County — official site',
        href: 'https://www.leavenworthcounty.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Leavenworth',
        href: 'https://www.leavenworthks.org/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Lansing',
        href: 'https://www.lansingks.org/',
        external: true,
        note: 'Mid-county growth municipality context',
      },
      {
        label: 'City of Basehor',
        href: 'https://www.cityofbasehor.org/',
        external: true,
        note: 'Southern growth municipality context',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'US-73 / K-7 / K-92 / I-70 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with historic multi-unit and stair fluency for downtown Leavenworth product; fort-adjacent timing awareness for PCS windows; HOA fluency for Lansing–Basehor growth; honest US-73 · K-7 · K-92 · I-70 link timing for cross-zone pairs. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
