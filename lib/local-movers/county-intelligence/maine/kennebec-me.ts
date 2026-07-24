import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMePack,
  ME_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/maine/me-shared';

/**
 * Kennebec County, ME — Augusta capital / Waterville north / river towns.
 * NOT Portland north. NOT Bangor rename.
 */
export const kennebecCountyMeIntelligence: CountyIntelligencePack = finalizeMePack({
  countySlug: 'kennebec',
  hubTitle: 'Kennebec County Moving Intelligence Hub',
  eyebrow:
    'Kennebec County, ME · Augusta capital / Waterville / river towns & I-95 logistics',
  h1: 'Moving in Kennebec County: Augusta Capital Access, Waterville North & I-95 / River-Town Logistics',
  heroOpener:
    'Kennebec County, Maine is capital-region logistics — Augusta government-core multi-unit and SFH, Hallowell–Gardiner river towns, Waterville northern multi-unit and campus-adjacent stock (Waterville is Kennebec), Winslow–China edges, rural townships, and Winthrop lakeside product — not Portland peninsula density and not a Bangor rename. Expect capital workforce calendars, older river-town stairs, winter ice on approaches, I-95 freeflow between Augusta and Waterville poles, and mixed rural empty miles. An Augusta capitol-district walk-up, a Hallowell character home, a Waterville multi-unit, and a Winthrop lakeside ranch do not share truck access or crew skill. This hub is for people moving in Kennebec County, ME — capital and river-town logistics — not a Portland-north page.',
  heroCredibility:
    'Written estimates + insurance for in-state · FMCSA for interstate · Capital workforce & river-town logistics · Curated listings',
  majorCorridors: 'I-95 · US-201 · US-202 · local Augusta grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kennebec County different',
    intro:
      'These are Kennebec County / Augusta capital realities — government workforce calendars, river-town character stock, Waterville northern density, and I-95 freeflow — not Portland multi-unit defaults and not Bangor campus scripts alone.',
    bullets: [
      {
        title: 'This is Kennebec (Augusta capital) — not Portland or Bangor',
        detail:
          'Ignore Munjoy Hill walk-up templates, Freeport tourism scripts, and Bangor / Orono university defaults as interchangeable. Kennebec is Augusta capital core, Hallowell–Gardiner river towns, Waterville northern product (still Kennebec County), Winslow–China edges, rural townships, and Winthrop lakeside belts. Match estimates to capital-region addresses — not Cumberland or Penobscot clones.',
      },
      {
        title: 'Capital workforce calendars rewrite mid-week demand',
        detail:
          'State government, legislative session cycles, and agency relocation waves concentrate mid-week and fiscal-calendar peaks. A Winthrop lakeside ranch or rural township home does not share that demand stack.',
      },
      {
        title: 'Augusta multi-unit and river-town stairs underprice flat-rate optimism',
        detail:
          'Older multi-story stock, Hallowell character grids, and Gardiner river-adjacent streets bring stair and curb risk that “capital suburb simple” estimates miss.',
      },
      {
        title: 'Waterville is Kennebec — not a separate county default',
        detail:
          'Waterville multi-unit, campus-adjacent stock, and Winslow pairs sit in Kennebec County. Price Augusta ↔ Waterville pairs as real cross-zone freeflow on I-95 / US-201, not as identical local jobs.',
      },
      {
        title: 'I-95, US-201, and US-202 freeflow is real',
        detail:
          'Augusta ↔ Waterville, Hallowell ↔ Winthrop, or capital core ↔ rural pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and lakeside / rural approaches reshape outdoor labor',
        detail:
          'Freeze-thaw driveway ice, Winthrop lake edges, and rural township roads raise staging risk from November through March. Prefer early starts and weather contingency.',
      },
      ME_REG_BULLET,
    ],
  },
  zonesHeading: 'Kennebec County access zones',
  zonesIntro:
    'Plan by Augusta capital core, Hallowell–Gardiner river towns, Waterville north, Winslow–China edges, rural townships, and Winthrop lakeside belts — access rules cluster by capital vs river vs lakeside product more than ZIP alone.',
  zones: [
    {
      id: 'augusta-capital-core',
      name: 'Augusta capital core, government district & multi-unit stock',
      shortName: 'Augusta capital',
      neighborhoods: [
        'Downtown Augusta',
        'Capitol complex edges',
        'Western Avenue corridors',
        'Civic Center District edges',
        'Capital multi-unit pockets',
        'Augusta walk-up stock',
      ],
      housingTypes: 'Walk-up multifamily, older multi-story, mixed SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce downtown curb',
        'Government-session traffic and timed street limits',
        'Winter ice on pitched capital-district streets',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early windows outside peak session congestion when possible. Confirm curb staging and building access in writing.',
      cityKeywords: [
        'augusta',
      ],
    },
    {
      id: 'hallowell-gardiner',
      name: 'Hallowell, Gardiner & Kennebec River town character grids',
      shortName: 'Hallowell / Gardiner',
      neighborhoods: [
        'Hallowell',
        'Gardiner',
        'Water Street corridors',
        'River-adjacent character blocks',
        'Village multi-unit pockets',
        'South river-town edges',
      ],
      housingTypes: 'Character SFH, older multi-unit, village stock, river-adjacent product',
      challenges: [
        'Narrow village streets and long carries',
        'Older basements and multi-flight stairs',
        'US-201 freeflow and river-town curb limits',
      ],
      moverTips:
        'Photo driveway and stair geometry early. Protect older interiors and landscaping. Clarify Hallowell vs Gardiner vs Augusta addresses.',
      cityKeywords: [
        'hallowell',
        'gardiner',
      ],
    },
    {
      id: 'waterville-north',
      name: 'Waterville northern multi-unit, downtown & campus-adjacent stock',
      shortName: 'Waterville',
      neighborhoods: [
        'Downtown Waterville',
        'Main Street corridors',
        'Campus-adjacent multi-unit',
        'North end residential',
        'River-pair edges',
        'Waterville walk-up pockets',
      ],
      housingTypes: 'Multi-unit, walk-ups, mixed SFH, campus-adjacent product',
      challenges: [
        'Multi-flight stairs and scarce downtown curb',
        'Campus and school-calendar peaks',
        'I-95 freeflow to Augusta capital pairs',
      ],
      moverTips:
        'Remember Waterville is Kennebec County — not a separate-market assumption. Survey multi-unit access carefully. Price I-95 to Augusta honestly.',
      cityKeywords: [
        'waterville',
      ],
    },
    {
      id: 'winslow-china-edges',
      name: 'Winslow, China & eastern / northern edges',
      shortName: 'Winslow / China',
      neighborhoods: [
        'Winslow',
        'China',
        'China Lake edges',
        'Eastern township belts',
        'US-202 corridors',
        'Northern edge residential',
      ],
      housingTypes: 'SFH, lake-edge stock, rural-residential, multi-unit limited',
      challenges: [
        'Longer empty miles to Augusta or Waterville cores',
        'Lake-access driveway geometry',
        'Winter ice on edge approaches',
      ],
      moverTips:
        'Price empty miles honestly. Survey lake-edge driveway width and turnaround. Prefer weather contingency for winter edge jobs.',
      cityKeywords: [
        'winslow',
        'china',
      ],
    },
    {
      id: 'rural-townships',
      name: 'Rural townships & dispersed residential belts',
      shortName: 'Rural townships',
      neighborhoods: [
        'Western rural townships',
        'Eastern rural belts',
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
        'Price empty miles and approach time honestly. Survey driveway geometry with photos. Align with school calendars when relevant.',
      cityKeywords: [
        'vassalboro',
        'sidney',
        'belgrade',
        'manchester',
      ],
    },
    {
      id: 'winthrop-lakeside',
      name: 'Winthrop lakeside, Belgrade Lakes edges & western recreation belts',
      shortName: 'Winthrop lakeside',
      neighborhoods: [
        'Winthrop',
        'Maranacook Lake edges',
        'Belgrade Lakes edges',
        'Western recreation corridors',
        'Lakeside cottage pockets',
        'Winthrop village centers',
      ],
      housingTypes: 'Lakeside SFH, cottages, village stock, seasonal product limited',
      challenges: [
        'Seasonal lake-access and narrow lot product',
        'Longer empty miles to Augusta capital',
        'Winter ice on lakeside approaches',
      ],
      moverTips:
        'Photo lakeside driveway pitch and turnaround. Prefer off-peak recreation weekends. Price empty miles to capital core honestly.',
      cityKeywords: [
        'winthrop',
        'belgrade',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kennebec County moving costs',
    intro:
      'Capital-district stairs, river-town character access, Augusta–Waterville freeflow, lakeside empty miles, and winter ice move the number more than packing skill alone — this is capital-region logistics, not Portland or Bangor defaults.',
    drivers: [
      {
        title: 'Multi-flight stairs, walk-ups & capital-district curb',
        detail:
          'Augusta core multi-unit rewrites jobs that look simple on a map.',
      },
      {
        title: 'River-town character grids & older basements',
        detail:
          'Hallowell–Gardiner stock adds flight counts and curb limits that flat-rate optimism underprices.',
      },
      {
        title: 'Capital workforce & legislative session timing',
        detail:
          'Government calendars add schedule risk and congestion before packing skill matters.',
      },
      {
        title: 'I-95 · US-201 · US-202 congestion',
        detail:
          'Augusta ↔ Waterville and cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Lakeside empty miles & winter ice staging',
        detail:
          'Winthrop and rural township approaches raise staging distance; freeze-thaw ice reshapes outdoor labor.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,550+',
        note: 'Higher with capital walk-ups, river-town stairs, or I-95 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$3,700+',
        note: 'Stairs, multi-unit soft costs, and cross-zone freeflow trend up',
      },
      {
        label: '3–4+ BR / lakeside / cross-zone',
        value: '$2,400–$7,200+',
        note: 'Lakeside empty miles and Augusta–Waterville pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kennebec County move',
    intro:
      'Capital workforce calendars, school peaks, lake recreation seasons, and winter ice reshape access and crew availability across the Augusta–Waterville grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear capital curb, ease multi-unit freight windows, and reduce I-95 pain. Watch legislative session congestion near the capitol district.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, lake recreation turnover, and apartment cycles fill first. Book 2–4 weeks ahead for peak weekends and multi-unit slots.',
      },
      {
        title: 'Capital workforce & session-cycle risk',
        detail:
          'Government calendars raise mid-week demand and street congestion near Augusta core. Prefer flexible load windows when session traffic is heavy.',
      },
      {
        title: 'Winter ice & lakeside approach labor',
        detail:
          'November–March ice on capital streets, river towns, and Winthrop lakeside approaches reshapes outdoor labor. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'capital-river-i95',
      title: 'Capital workforce, river-town & I-95 logistics module',
      intro:
        'Kennebec County estimates fail more often on stair surveys, capital congestion, Augusta–Waterville freeflow, and lakeside empty miles than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and building access for Augusta capital multi-unit early.',
        'Photo character-grid access for Hallowell–Gardiner river-town stock before the survey is final.',
        'Price portal-to-portal time for Augusta ↔ Waterville pairs on I-95 / US-201 — Waterville is Kennebec County.',
        'Survey lakeside driveway geometry for Winthrop and Belgrade edges.',
        'Clarify Augusta, Hallowell, Gardiner, Waterville, Winslow, Winthrop, and rural township addresses on every estimate.',
        'For pure in-state Maine jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-portland-not-bangor',
      title: 'Not Portland · not Bangor module',
      intro:
        'A single “central Maine rate” collapses when capital-region product is confused with Portland peninsula multi-unit or Bangor / UMaine campus defaults alone.',
      bullets: [
        'Do not price Augusta capital walk-ups like Munjoy Hill condos or like Bangor downtown multi-unit as interchangeable defaults.',
        'State the market as Kennebec County / Augusta capital region on every estimate — disambiguate from Cumberland and Penobscot.',
        'Keep Waterville inside Kennebec pricing logic — it is not a separate-county assumption.',
        'Match capital workforce calendars separately from lakeside recreation peaks and rural empty-mile pricing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kennebec County?',
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
              'Kennebec spans Augusta, Waterville, Hallowell, Gardiner, Winthrop, Winslow, and many smaller systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Colby College and other higher-ed presence shapes Waterville-area demand.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and capital vs northern boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'MaineGeneral Medical Center (Augusta and regional campuses) and partners anchor care across the capital region. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-95 freeflow between Augusta and Waterville changes “nearby” on paper. Transfer records early.',
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
              'Expect Augusta capital multi-unit and SFH; Hallowell–Gardiner river-town character stock; Waterville multi-unit and campus-adjacent product; Winslow–China edges; rural township homes; Winthrop lakeside and Belgrade recreation belts.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by capital core vs lakeside vs rural location. Budget for older-building repair risk and competitive rental seasons near employment and campus nodes.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Multi-unit management and associations often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Augusta capital-core lifestyle',
            detail:
              'Suits people prioritizing government employment and regional amenities — with multi-unit stairs and session-traffic tradeoffs on move day.',
          },
          {
            title: 'Hallowell / Gardiner river-town living',
            detail:
              'Often appeals for character grids and village feel — with narrow streets and older-stock logistics.',
          },
          {
            title: 'Waterville northern living',
            detail:
              'Fits households seeking northern Kennebec amenities and campus-adjacent options — with multi-unit logistics and I-95 freeflow to Augusta.',
          },
          {
            title: 'Winthrop lakeside / rural living',
            detail:
              'Attracts households seeking lakeside space — with longer empty miles and winter approach risk.',
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
              'State government, healthcare systems, education, professional services, retail, and capital-region services concentrate demand across Augusta and Waterville poles.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, US-201, and US-202 freeflow is real — including Augusta ↔ Waterville pairs that look short and still burn portal time. Test peak routes before choosing solely on rent or purchase price.',
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
              'Kennebec County is capital-region Maine — Augusta government core, river towns, Waterville north, and lakeside edges — not Portland peninsula density and not Bangor regional product.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / interior Maine climate with warm summers, lake recreation seasons, and freeze-thaw winters. Plan outdoor staging, ice, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — legislative session cycles, school calendars, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kennebec County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Kennebec County, Maine — official site',
        href: 'https://www.kennebecounty.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Augusta',
        href: 'https://www.augustamaine.gov/',
        external: true,
        note: 'Capital municipality context',
      },
      {
        label: 'City of Waterville',
        href: 'https://www.waterville-me.gov/',
        external: true,
        note: 'Northern Kennebec municipality context',
      },
      {
        label: 'City of Gardiner',
        href: 'https://www.gardinermaine.com/',
        external: true,
        note: 'River-town municipality context',
      },
      {
        label: '511 Maine — traveler information',
        href: 'https://www.511maine.gov/',
        external: true,
        note: 'I-95 / US-201 / US-202 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with capital multi-unit and stair fluency for Augusta core product; river-town character-grid awareness for Hallowell–Gardiner; honest I-95 · US-201 · US-202 timing for Augusta–Waterville pairs; lakeside empty-mile pricing for Winthrop edges. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. This is Kennebec County (Augusta capital) — not Portland density and not Bangor / Penobscot.',
  lastReviewed: '2026-07-24',
});
