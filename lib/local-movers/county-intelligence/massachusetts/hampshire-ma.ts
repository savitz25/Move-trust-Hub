import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Hampshire County, MA — Northampton / Amherst college-town cycles.
 */
export const hampshireCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'hampshire',
  hubTitle: 'Hampshire County Moving Intelligence Hub',
  eyebrow: 'Hampshire · Northampton, Amherst college cycles & I-91 / Route 9 logistics',
  h1: 'Moving in Hampshire County: Northampton Access, Amherst College Cycles & Valley Logistics',
  heroOpener:
    'Hampshire County is not a Springfield rename and not a generic western Massachusetts template — it is Northampton’s walkable downtown and three-story rentals, Amherst’s Five College semester spikes, Hadley retail-corridor multifamily, and I-91 / Route 9 freeflow that rewrites “local” portal time. A downtown Northampton walk-up with porch flights, an Amherst student apartment with hard lease-end dates, a South Hadley colonial near Mount Holyoke, and a Belchertown cul-de-sac two-story do not share truck access or crew skill. I-91, Route 9, Route 116, and Route 47 turn short map miles into billable hours when move-in/move-out weekends, parent traffic, and peak commute collide. This hub is for people moving in Hampshire County — not a renamed Hampden industrial page or Boston corridor script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-91 · Route 9 · Route 116 · Route 47',
  whatMakesDifferent: {
    title: 'What makes moving in Hampshire County different',
    intro:
      'These are Hampshire and Northampton–Amherst realities — college-town calendars, walk-up stock, and Route 9 congestion — not Springfield mill grids alone or Boston elevator towers.',
    bullets: [
      {
        title: 'Five College calendars rewrite booking lead time',
        detail:
          'UMass Amherst, Amherst College, Smith, Mount Holyoke, and Hampshire College drive late-August move-in and mid-May move-out waves. Flexible civilian Saturday windows are not the default on semester peaks — book as soon as housing contracts allow.',
      },
      {
        title: 'Northampton walk-ups and downtown density dominate labor',
        detail:
          'Downtown Northampton, Florence edges, and many central blocks stack multi-flight stairs, tight curb, and long carries. Flat-rate optimism from Belchertown cul-de-sacs underprices flight counts and truck placement.',
      },
      {
        title: 'I-91, Route 9, Route 116, and Route 47 turn short miles into portal hours',
        detail:
          'Northampton ↔ Amherst, Hadley ↔ South Hadley, or Belchertown ↔ Easthampton pairs look local and still burn 30–60+ minutes at peak parent and commute windows. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Amherst student multifamily is a different move market than year-round SFH',
        detail:
          'North Amherst, University Drive edges, and downtown Amherst apartments stack short leases, stair carries, and simultaneous building turnovers that pure Northampton professional quotes underprice. Match crew experience to product.',
      },
      {
        title: 'Hadley corridor and South Hadley are separate micro-markets',
        detail:
          'Hadley Route 9 retail multifamily, South Hadley village stock, and Mount Holyoke–adjacent rentals differ from Easthampton mill lofts or Pelham rural edges. Do not reuse one “Hampshire rate” across all three.',
      },
      {
        title: 'Hill towns and eastern Hampshire need different truck plans',
        detail:
          'Belchertown, Granby, Ware edges, and hill-town approaches mix long driveways, limited turn radius, and winter ice that dense downtown surveys miss. Confirm staging before finalizing labor hours.',
      },
      {
        title: 'Multi-county Pioneer Valley pairs are routine',
        detail:
          'Households regularly move Hampshire ↔ Hampden, Franklin, Worcester, or Connecticut. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Hampshire County access zones',
  zonesIntro:
    'Plan by Northampton downtown and Florence, Amherst campus belts, Hadley Route 9 corridor, South Hadley–Easthampton valley edges, and Belchertown–hill-town product — access rules cluster by zone and semester more than ZIP alone.',
  zones: [
    {
      id: 'northampton-core',
      name: 'Northampton core, downtown & Florence edges',
      shortName: 'Northampton',
      neighborhoods: [
        'Downtown Northampton',
        'Florence',
        'Leeds edges',
        'Bay State Hotel / Main Street edges',
        'Smith College edges',
        'Village Hill edges',
      ],
      housingTypes: 'Walk-up multifamily, older two- and three-family, denser rentals, limited SFH',
      challenges: [
        'Multi-flight stairs, tight curb, and limited truck length',
        'Event-day and market-weekend freeflow collapse',
        'I-91 / Route 9 approach congestion',
      ],
      moverTips:
        'Survey stair counts and curb options with photos. Prefer mid-week early starts off semester peaks. Confirm side-street staging before finalizing labor hours.',
      cityKeywords: [
        'northampton',
        'florence ma',
        'downtown northampton',
        'leeds',
        'smith college',
        'village hill',
      ],
    },
    {
      id: 'amherst-campus',
      name: 'Amherst campus belt (UMass, Amherst College & downtown Amherst)',
      shortName: 'Amherst campus',
      neighborhoods: [
        'Downtown Amherst',
        'UMass Amherst edges',
        'North Amherst',
        'South Amherst edges',
        'Amherst College edges',
        'University Drive corridor',
      ],
      housingTypes: 'Student apartments, walk-ups, denser multifamily, limited SFH pockets',
      challenges: [
        'Semester move-in/out hard dates and simultaneous building waves',
        'Stair carries, guest parking, and elevator scarcity',
        'Route 9 / Route 116 parent-traffic freeflow collapse',
      ],
      moverTips:
        'Book as soon as housing contracts allow for August and May. Ask about elevator status and parking maps. Expect all-day building congestion on peak move weekends.',
      cityKeywords: [
        'amherst',
        'umass amherst',
        'north amherst',
        'south amherst',
        'university drive',
        'amherst college',
      ],
    },
    {
      id: 'hadley-route-9',
      name: 'Hadley Route 9 corridor',
      shortName: 'Hadley corridor',
      neighborhoods: [
        'Hadley',
        'Route 9 retail corridor',
        'North Hadley edges',
        'Hampshire Mall edges',
        'Russell Street edges',
      ],
      housingTypes: 'Newer multifamily, apartments, townhomes, limited SFH',
      challenges: [
        'Route 9 freeflow between Northampton and Amherst',
        'Apartment turnover and guest-parking friction',
        'Semester-linked demand spikes shared with Amherst',
      ],
      moverTips:
        'Price Route 9 portal time honestly for Northampton–Amherst pairs. Survey apartment parking and stair/elevator access. Avoid peak parent-weekend load windows when possible.',
      cityKeywords: [
        'hadley',
        'north hadley',
        'hampshire mall',
        'route 9 hadley',
        'russell street',
      ],
    },
    {
      id: 'south-hadley-easthampton',
      name: 'South Hadley, Easthampton & valley edges',
      shortName: 'South Hadley–Easthampton',
      neighborhoods: [
        'South Hadley',
        'Easthampton',
        'Mount Holyoke edges',
        'Cottage Street Easthampton edges',
        'Granby edges',
      ],
      housingTypes: 'Village SFH, mill lofts, campus-adjacent rentals, mixed multifamily',
      challenges: [
        'Route 47 / Route 116 freeflow and I-91 links',
        'Mill-building stairs and awkward loft approaches',
        'College calendar spikes near Mount Holyoke',
      ],
      moverTips:
        'Photo mill loft access and stair geometry. Build I-91 and Route 9 buffers for Springfield- or Amherst-linked pairs. Confirm campus-adjacent parking rules.',
      cityKeywords: [
        'south hadley',
        'easthampton',
        'mount holyoke',
        'granby',
        'cottage street easthampton',
      ],
    },
    {
      id: 'belchertown-eastern',
      name: 'Belchertown, Ware edges & eastern Hampshire',
      shortName: 'Eastern Hampshire',
      neighborhoods: [
        'Belchertown',
        'Ware edges',
        'Pelham edges',
        'Amherst east edges',
        'Quabbin-adjacent edges',
      ],
      housingTypes: 'Ranch and colonial SFH, rural driveways, limited multifamily',
      challenges: [
        'Longer empty-mile staging from Northampton/Amherst crews',
        'Narrow rural approaches and limited truck turn radius',
        'Route 9 / Route 202 freeflow variability',
      ],
      moverTips:
        'Confirm driveway length, soft shoulder, and truck turnaround. Price empty miles honestly. Prefer early starts in winter ice season.',
      cityKeywords: [
        'belchertown',
        'ware',
        'pelham',
        'quabbin',
        'eastern hampshire',
      ],
    },
    {
      id: 'hatfield-williamsburg-west',
      name: 'Hatfield, Williamsburg & western hill-town edges',
      shortName: 'West hill towns',
      neighborhoods: [
        'Hatfield',
        'Williamsburg',
        'Westhampton edges',
        'Chesterfield edges',
        'Goshen edges',
      ],
      housingTypes: 'Rural SFH, farm-adjacent stock, limited multifamily',
      challenges: [
        'Long approaches, grades, and limited staging',
        'Winter access risk on hill roads',
        'Route 9 / Route 143 freeflow and sparse services',
      ],
      moverTips:
        'Survey grade and turnaround with photos. Build weather contingency in winter. Clarify whether a smaller truck is required on hill-town roads.',
      cityKeywords: [
        'hatfield',
        'williamsburg ma',
        'westhampton',
        'chesterfield',
        'goshen',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hampshire County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Semester waves, walk-up stairs, Route 9 freeflow, and rural empty miles separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'College move-in/out peaks & hard lease dates',
        detail:
          'August and May waves compress crew supply and raise premium Saturday pricing across Amherst, Hadley, and Northampton.',
      },
      {
        title: 'Walk-up stairs, porches & tight downtown curb',
        detail:
          'Northampton and Amherst stock add flight counts and staging friction that suburban flat rates underprice.',
      },
      {
        title: 'I-91 · Route 9 · Route 116 · Route 47 congestion',
        detail:
          'Cross-town valley pairs burn portal-to-portal hours even when map miles look short — especially parent weekends.',
      },
      {
        title: 'Mill lofts & campus-adjacent building rules',
        detail:
          'Easthampton and South Hadley denser product add access soft costs and awkward geometry.',
      },
      {
        title: 'Eastern and hill-town empty miles',
        detail:
          'Belchertown and western hill-town destinations raise staging distance from core valley crews.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access, off-peak)',
        value: '$400–$1,500+',
        note: 'Higher with walk-up flights or peak semester weekends',
      },
      {
        label: '2–3BR apartment or walk-up flat',
        value: '$1,100–$3,900+',
        note: 'Stairs, curb friction, and semester peaks trend up',
      },
      {
        label: '3–4+ BR / cross-zone SFH / peak campus building',
        value: '$2,400–$7,500+',
        note: 'Peak August campus buildings and rural pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, and peak weekends scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hampshire County move',
    intro:
      'College calendars, lease cycles, school windows, winter ice, and Route 9 freeflow reshape access and crew availability more than pure civilian Saturday demand.',
    items: [
      {
        title: 'Best windows: mid-week early mornings, mid-semester',
        detail:
          'Tuesday–Thursday starts clear curb, ease Route 9 freeflow, and avoid parent-weekend collapse. Avoid late-August and mid-May peak move weekends when possible.',
      },
      {
        title: 'Peak season: late May move-out + mid–late August move-in',
        detail:
          'Five College calendars fill crews first. Book as soon as housing contracts allow; expect premium pricing and limited flexibility on peak campus weekends.',
      },
      {
        title: 'Winter ice and snow friction (December–March)',
        detail:
          'Slick stairs, narrow plowed streets, and hill-town grades slow open carries. Prefer early starts, mats, and flexible weather windows.',
      },
      {
        title: 'Summer civilian and family SFH demand',
        detail:
          'Outside pure campus peaks, family SFH Saturdays still fill June–August in Belchertown, South Hadley, and Northampton edges. Book 2–3 weeks ahead for larger homes.',
      },
    ],
  },
  specialized: [
    {
      id: 'college-town-valley',
      title: 'College-town, walk-up & Pioneer Valley corridor module',
      intro:
        'Hampshire estimates fail more often on semester calendars, downtown stairs, and Route 9 timing than on packing skill alone.',
      bullets: [
        'Book August move-in and May move-out as soon as housing contracts allow; expect building-wide congestion.',
        'Photo stair counts, curb options, and truck length for Northampton and Amherst walk-ups.',
        'Price portal-to-portal time for any pair that rides I-91, Route 9, Route 116, or Route 47 at peak.',
        'Clarify student partial inventories vs full household contents on campus-adjacent jobs.',
        'Survey mill loft access in Easthampton and rural turnaround in Belchertown/hill towns separately.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'northampton-vs-amherst-micro',
      title: 'Northampton vs Amherst vs Belchertown micro-market module',
      intro:
        'A single “Hampshire County rate” collapses when downtown walk-ups, campus apartments, and eastern SFH product diverge a few miles apart.',
      bullets: [
        'Survey by product — downtown walk-up, student apartment wave, or rural two-story — not by county name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (Route 9 vs I-91 vs Route 116).',
        'Match simultaneous campus building turnovers to crews experienced in high-volume apartment days.',
        'Expect different parking norms even between Northampton core and Amherst campus edges.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hampshire County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures college-town vs hill-town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Northampton, Amherst-Pelham, Hadley, South Hadley, Easthampton, Belchertown, and other districts cover the county by municipality. Assignment is address-based — “Five College area” marketing does not guarantee a K–12 campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Massachusetts DESE data, and campus visits beat ranking screenshots alone. Higher-education presence does not substitute for K–12 research.',
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
              'Cooley Dickinson (Northampton) anchors local acute care; many households also use Baystate and Springfield campuses for specialty care. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Amherst, Belchertown, or Easthampton to preferred campuses — Route 9 and I-91 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Walk-ups, student apartments, village SFH & rural mix',
            detail:
              'Expect denser rentals in Northampton and Amherst; Route 9 multifamily in Hadley; village and mill product in South Hadley and Easthampton; and more space in Belchertown and hill towns.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by town and proximity to campuses. Budget for older-building repair risk, parking, and competition for year-round rentals near colleges.',
          },
          {
            title: 'Building and landlord governance',
            detail:
              'Landlords and associations often control move hours, truck access, and deposits on multifamily stock. Read leases carefully before signing — especially for August start dates.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Hampshire areas fit whom',
        bullets: [
          {
            title: 'Northampton downtown and cultural lifestyle',
            detail:
              'Suits people prioritizing walkability, dining, and arts — with walk-up stairs, curb, and event-day tradeoffs on move day.',
          },
          {
            title: 'Amherst campus and academic community living',
            detail:
              'Often appeals for university access and energy — with semester peaks, student turnover, and parking constraints.',
          },
          {
            title: 'Hadley–South Hadley corridor convenience',
            detail:
              'Attracts households chasing retail access and relative space — with Route 9 freeflow realism.',
          },
          {
            title: 'Belchertown and hill-town space',
            detail:
              'Fits buyers seeking more yard and quieter roads — with longer portal times to valley services and winter access planning.',
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
              'Higher education, healthcare, nonprofits, government, retail along Route 9, light manufacturing, and Springfield-linked professional employment concentrate demand. Many households reverse-commute toward Hampden County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Driving dominates outside core walkable districts. I-91, Route 9, Route 116, and Route 47 peaks are real — especially semester bookends. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Hampshires',
            detail:
              'Hampshire stacks college-town density, Route 9 corridor multifamily, valley villages, and hill-town quiet — different from Springfield industrial product or Boston-metro corridors.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England weather with real winter snow and ice risk on open carries and hill roads. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, food, and progressive college-town culture concentrate in Northampton and Amherst; eastern and hill towns skew quieter. Visit during semester peak and summer quiet when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hampshire County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Northampton',
        href: 'https://www.northamptonma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Town of Amherst',
        href: 'https://www.amherstma.gov/',
        external: true,
        note: 'Municipal services & town info',
      },
      {
        label: 'UMass Amherst',
        href: 'https://www.umass.edu/',
        external: true,
        note: 'Campus calendars & student housing context',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-91 / Route 9 / Route 116 / Route 47 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with college-town peak experience for Amherst/Hadley semester waves; Northampton walk-up stair fluency; honest I-91 · Route 9 · Route 116 · Route 47 timing for cross-zone pairs; rural hill-town readiness east and west. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
