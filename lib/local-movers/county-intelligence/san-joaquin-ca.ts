import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * San Joaquin County — California Tier 2 (Stockton mid-metro / Bay Area collar dynamics).
 * Secondary-market contract vs Bay Area Tier 1 corridors — not Sacramento or Fresno clone.
 */
export const sanJoaquinCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'san-joaquin',
  hubTitle: 'San Joaquin County Moving Intelligence Hub',
  eyebrow: 'San Joaquin County · Stockton mid-metro & Bay collar',
  h1: 'Moving in San Joaquin County: Stockton Mid-Metro, I-5 / CA-99 & Altamont-Adjacent Collar',
  heroOpener:
    'San Joaquin County is a Stockton-anchored Central Valley mid-metro with Bay Area collar dynamics — not a Bay Tier 1 market itself, and not a Sacramento or Fresno script. Stockton core multi-unit and older SFH, Tracy/Manteca/Lathrop HOA growth, Lodi north character, and rural/ag edges sit on I-5, CA-99, I-205, CA-4, and CA-120 under valley heat. Compared with Alameda and Santa Clara corridors, you trade coastal/Bay density and bridge congestion for freer reverse-commute freeflow on many inland legs — while Altamont / I-580 approaches still rewrite ETAs when households keep East Bay or Silicon Valley jobs. This guide is for people moving in San Joaquin County as a secondary market with Bay overflow, not recycled Bay or capital-region copy.',
  heroCredibility:
    'Stockton mid-metro · Bay Area collar dynamics · BHGS intrastate · FMCSA when interstate · Secondary-market role · Curated listings',
  majorCorridors: 'I-5 · CA-99 · I-205 · CA-4 · CA-120',
  parentCompare: {
    parentLabel: 'San Francisco / Bay Area (Alameda & Santa Clara corridors)',
    parentHref: '/local-movers/california/alameda',
    title: 'Compared with Bay Area Tier 1 markets',
    intro:
      'San Joaquin is inland secondary market with Stockton core volume and South County growth that absorbs Bay housing overflow. Alameda/Santa Clara (and Sacramento as a northern secondary parent) set the contrast — denser, higher-cost Tier 1 logistics vs valley heat, HOA growth tracts, and Altamont-adjacent freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Bay Tier 1 moves fight bridges, I-880/I-680 density, and peninsula arterials. San Joaquin pairs ride I-5, CA-99, I-205, CA-4, and CA-120 with freer mid-day inland freeflow — until a job points at Altamont / I-580 approaches or peak reverse-commute windows. Stockton ↔ Tracy can still burn 45–90+ minutes each way at peak; it is not a pure map-mile local.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bay corridors mix dense multifamily, hillside, and high-HOA suburbs at premium price bands. San Joaquin ladders Stockton multi-unit and older SFH, master-planned Tracy/Manteca/Lathrop tracts, Lodi small-city stock, and ag-edge homes — more driveway product, more warehouse-adjacent residential, less elevator-and-permit coastal density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'South County growth is HOA-heavy (COI, gates, approved hours) but streets generally stage better than East Bay curb wars. Stockton core still brings multi-unit long carries and tighter parking. Warehouse-corridor truck traffic near Tracy/Lathrop edges is a real delay factor Bay residential crews may not price.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local San Joaquin quotes often sit below Bay Area Tier 1 rates for comparable square footage when access is simple. Premiums come from South County ↔ Stockton corridor time, HOA soft costs, heat windows, and Bay-overflow peak Saturdays — not bridge-toll scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Stockton is an independent valley mid-metro; Tracy–Manteca–Lathrop function as Bay-facing collar growth for many households who keep or seek Bay jobs. That dual role (local employment + reverse-commute housing) is the secondary-market story — not “Bay Area with cheaper rents” as a mover template.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in San Joaquin County different',
    intro:
      'Stockton mid-metro plus South County Bay-collar growth — heat, HOA tracts, and Altamont-adjacent corridor timing that pure Bay or Fresno scripts miss.',
    bullets: [
      {
        title: 'Stockton core and South County growth are different products',
        detail:
          'Downtown multi-unit and older SFH jobs are about staging and elevators. Tracy, Manteca, and Lathrop are often HOA packets, cul-de-sacs, and family-volume inventories near logistics corridors. Put both cities on the estimate.',
      },
      {
        title: 'Bay reverse-commute freeflow — until Altamont peaks',
        detail:
          'Inland pairs often freeflow better than East Bay density, but I-205 / I-580 approaches and peak reverse-commute windows rewrite ETAs. Ask how portal-to-portal time is priced for South County ↔ Stockton and Bay-facing legs.',
      },
      {
        title: 'HOA growth + warehouse-adjacent housing',
        detail:
          'Master-planned villages (including River Islands–type edges) stack COI rules with freight traffic near distribution parks. Note industrial adjacency so crews build mid-day buffer.',
      },
      {
        title: 'Valley heat still applies inland of the Bay',
        detail:
          'June–September afternoons frequently reach the mid-90s to 100°F+ on the valley floor. Prefer early load windows — Bay mild-weather assumptions do not transfer.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'San Joaquin County zones: Stockton core to South County collar',
  zonesIntro:
    'Four sharp products — Stockton core, Tracy/Manteca collar growth, Lodi north, and rural/ag edges. Corridor timing and heat define the job more than generic Valley advice.',
  zones: [
    {
      id: 'stockton-core',
      name: 'Stockton Core (Downtown, Mid-City & North Corridors)',
      shortName: 'Stockton core',
      neighborhoods: [
        'Downtown Stockton',
        'Midtown / central corridors',
        'North Stockton / Lincoln Village edge',
        'Brookside edge',
        'Older multi-unit pockets',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, suburban north-side tracts, denser street grids',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-5 / CA-99 approaches into the core at peak',
        'Peak heat on asphalt staging with limited shade',
      ],
      moverTips:
        'Confirm building rules and COI for multi-unit. Weekday mornings beat heat and commute peaks. Clarify Stockton ↔ Tracy/Manteca pairs for honest drive time. Inventory stairs carefully in older multi-story stock.',
      cityKeywords: [
        'stockton',
        'downtown stockton',
        'midtown stockton',
        'north stockton',
        'lincoln village',
        'brookside',
      ],
    },
    {
      id: 'tracy-manteca-collar',
      name: 'Tracy / Manteca Collar Growth (incl. Lathrop edges)',
      shortName: 'Tracy / Manteca',
      neighborhoods: [
        'Tracy',
        'Tracy Hills edge',
        'Manteca',
        'Lathrop / River Islands edge',
        'I-205 / Altamont approach corridors',
      ],
      housingTypes:
        'Master-planned HOA communities, suburban SFH, townhomes, multi-family, logistics-adjacent tracts',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'I-205 / I-5 / CA-120 congestion and freight traffic',
        'High Bay-overflow family-move volume on peak weekends',
        'Heat + warehouse-corridor truck traffic mid-day',
      ],
      moverTips:
        'Send HOA management packets with the estimate — growth villages are packet-first. Prefer mid-week early starts that miss Altamont peaks when possible. Book May–August Saturdays early. Note warehouse adjacency for freight buffer.',
      cityKeywords: [
        'tracy',
        'manteca',
        'lathrop',
        'river islands',
        'tracy hills',
        'mountain house',
        'i-205',
      ],
    },
    {
      id: 'lodi-north',
      name: 'Lodi & Northern County',
      shortName: 'Lodi / North',
      neighborhoods: [
        'Lodi',
        'North county wine-country edges',
        'Acampo edge',
        'Hwy 99 north corridor',
      ],
      housingTypes:
        'Small-city SFH, downtown multi-unit, suburban tracts, some agricultural-edge properties',
      challenges: [
        'CA-99 timing to Stockton and South County',
        'Downtown Lodi staging on tighter blocks',
        'Ag-edge approaches in outlying pockets',
        'Summer heat on open lots',
      ],
      moverTips:
        'Separate downtown multi-unit rules from suburban tract access. Build 99 corridor time into Lodi ↔ Stockton or Lodi ↔ Tracy pairs. Mention ag-edge gates and sheds on the survey.',
      cityKeywords: [
        'lodi',
        'acampo',
        'woodbridge',
        'lockeford',
        'north county',
      ],
    },
    {
      id: 'rural-ag-edges',
      name: 'Rural / Ag Edges (Ripon, Escalon & farm pockets)',
      shortName: 'Rural / ag edges',
      neighborhoods: [
        'Ripon',
        'Escalon',
        'East county small towns',
        'Farm-edge residential pockets',
      ],
      housingTypes:
        'Small-town SFH, rural-edge homes, farm/ranch-adjacent properties, occasional outbuildings',
      challenges: [
        'Longer approaches and empty miles from Stockton/Tracy staging',
        'Unpaved or constrained rural driveways',
        'Agricultural traffic and seasonal road use',
        'Cross-county timing toward Modesto-area edges on some pairs',
      ],
      moverTips:
        'Treat town-to-metro pairs as long locals with honest portal-to-portal time. Share driveway and outbuilding details. Heat + rural sun exposure makes early starts non-negotiable in summer.',
      cityKeywords: [
        'ripon',
        'escalon',
        'farmington',
        'linden',
        'east san joaquin',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Joaquin County',
    intro:
      'Same square footage prices differently by South County ↔ Stockton corridor time, HOA soft costs, warehouse delay, and Bay-overflow peak calendars.',
    drivers: [
      {
        title: 'South County / Altamont-adjacent corridor time',
        detail:
          'Tracy ↔ Stockton, Manteca ↔ Tracy, or any pair touching I-205 / I-580 approaches can burn 45–90+ minutes each way at peak. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs in growth tracts',
        detail:
          'COI processing, approved hours, and gate lists in Tracy, Manteca, Lathrop, and planned edges add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Warehouse & industrial traffic buffer',
        detail:
          'Freight-heavy corridors near logistics parks stall “short” locals mid-day. Build buffer when either address is warehouse-adjacent.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$4,000+',
        note: 'HOA soft costs and South County cross-hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Bay-corridor timing)',
        value: '$2,400–$6,500+',
        note: 'Tracy–Stockton and Altamont-timed pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & Bay-overflow calendar intelligence',
    intro:
      'San Joaquin peaks follow valley heat, school calendars, and Bay Area lease overflow — not pure capital-session or Fresno-ag calendars alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk — Bay mild-weather habits do not apply.',
      },
      {
        title: 'Bay Area lease & school calendars',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves in Tracy, Manteca, and Lathrop when Bay leases and school years turn over. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when Bay and local leases collide — and start early for heat.',
      },
    ],
  },
  specialized: [
    {
      id: 'bay-reverse-commute-freeflow',
      title: 'Bay Area reverse-commute freeflow & Altamont-adjacent logistics',
      intro:
        'San Joaquin’s defining modern pattern is often inland housing paired with Bay-facing commute geography — freer inland freeflow until Altamont / I-205 peaks hit.',
      bullets: [
        'Price portal-to-portal time honestly for pairs that ride I-205, I-5, CA-99, or CA-120 between Stockton and South County.',
        'Prefer mid-morning starts that miss the worst Altamont-bound peaks when HOA windows allow.',
        'If the household is relocating from the East Bay or Peninsula, confirm both addresses early — inbound volume books popular Saturdays first.',
        'Ask whether cross-zone South County ↔ Stockton pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'hoa-growth',
      title: 'South County HOA & planned-community growth',
      intro:
        'Tracy, Manteca, and Lathrop combine master-planned rules with family-volume inventories that Stockton core multi-unit jobs may not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully; suburban loads often exceed older core condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer tracts.',
      ],
    },
    {
      id: 'heat-valley-logistics',
      title: 'Valley heat & warehouse-edge logistics',
      intro:
        'Inland of the Bay, heat and freight-adjacent residential edges rewrite move-day windows.',
      bullets: [
        'Prefer early summer starts; request shaded staging and heat-safe packing.',
        'Note warehouse or industrial adjacency so crews build mid-day freight-traffic buffer.',
        'Do not transfer Bay mild-weather start times to valley-floor afternoons.',
        'Build buffer for construction and freight on the same spines residents use for Bay jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to San Joaquin County?',
    intro:
      'Stockton urban value, Tracy–Manteca collar growth, and Lodi character are different bets — validate schools and healthcare by pocket, then test whether a Bay commute is livable from that driveway.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems serve the county (Stockton-area districts, Tracy Unified, Manteca Unified, Lodi Unified, Ripon Unified, Escalon Unified, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names, unincorporated pockets, and new tracts can span feeders — especially on Stockton–Lathrop–Manteca edges.',
          },
          {
            title: 'Core vs South County vs Lodi',
            detail:
              'Enrollment pressures and program offerings differ by city — do not treat county averages as neighborhood truth. Tracy and Stockton contexts are not interchangeable.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'St. Joseph’s Medical Center (Stockton), Sutter Tracy Community Hospital, Kaiser Permanente facilities serving the region, and other campuses cover different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Bay Area specialty spillover',
            detail:
              'Some residents travel toward East Bay or Sacramento systems for specialty care. Confirm insurer networks and realistic appointment drive times on I-5 / I-205 / Altamont approaches.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos when South County inventories turn over.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful San Joaquin resources',
    intro:
      'Local official links first; directory listings are independent. Verify California BHGS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'San Joaquin County — official site',
        href: 'https://www.sjgov.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Stockton',
        href: 'https://www.stocktonca.gov/',
        external: true,
      },
      {
        label: 'City of Tracy',
        href: 'https://www.cityoftracy.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Stockton core, Tracy/Manteca collar, Lodi/North, Rural/ag edges) when available. Confirm HOA packets, Altamont/I-205 drive assumptions, warehouse-edge buffers, and heat-window plans — Stockton mid-metro with Bay collar dynamics, not a Bay Tier 1 clone.',
  lastReviewed: '2026-07-24',
});
