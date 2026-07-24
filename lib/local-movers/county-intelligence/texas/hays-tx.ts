import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Hays County — Texas Tier 2 (Austin south collar).
 * Parent: Travis County. San Marcos / Kyle / Buda growth —
 * NOT a renamed Travis downtown pack.
 */
export const haysCountyIntelligence = finalizeTxTier2Pack({
  countySlug: 'hays',
  hubTitle: 'Hays County Moving Intelligence Hub',
  eyebrow: 'Hays County · Austin south collar — San Marcos / Kyle / Buda',
  h1: 'Moving in Hays County: Austin South Collar — San Marcos, Kyle & Buda',
  heroOpener:
    'Hays County is Austin’s southern collar — Texas State university-town San Marcos, Kyle and Buda I-35 growth corridors, Dripping Springs / Hill Country edges, and Wimberley recreation approaches — not downtown Travis elevators with different freeways. Student calendars pack short-notice apartments; I-35 south freeflow still bills at peak; HOA suburban growth in Kyle/Buda fills Saturdays; Hill Country grades and tourist weekends rewrite access assumptions. A near-campus San Marcos walk-up, a Kyle HOA two-story, a Buda growth tract, and a Dripping Springs hillside home do not share truck access. Quote the pocket and the I-35 south pair — never a recycled Austin-core rate card.',
  heroCredibility:
    'Austin south collar · University & I-35 growth · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35 · SH-21 · SH-80 · FM-1626 · local San Marcos grid',
  parentCompare: {
    parentLabel: 'Travis County',
    parentHref: '/local-movers/texas/travis',
    title: 'Compared with Travis County',
    intro:
      'Hays is the Austin metro’s south collar below Travis County — shared Central Texas heat and I-35 rhythm, Texas State university cycle in San Marcos, Kyle/Buda family growth, and Hill Country edges Travis core scripts underweight. Use this when one address sits in Travis County and the other in Hays.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Travis County crews fight central Austin I-35, MoPac, and dense urban arterials. Hays pairs ride I-35 south, SH-21, SH-80, FM-1626, and the local San Marcos grid with freer mid-day freeflow — San Marcos ↔ Kyle or Buda ↔ south Travis still burns portal-to-portal time at peak, but it is not a downtown Austin elevator job. Cross-county Hays ↔ Travis pairs are long locals on the south spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Travis mixes vertical multi-family and central Austin grids. Hays’s ladder is Texas State student and workforce apartments, Kyle/Buda master-planned HOA SFH, small-city San Marcos stock, and Hill Country / Wimberley larger-lot and recreation-adjacent product — more university turnover and growth-edge SFH, less downtown loft density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hays stages more driveway, cul-de-sac, campus-adjacent curb, and Hill Country grade work than Travis core elevators. HOAs appear heavily in Kyle/Buda growth; campus multi-unit buildings add elevator/COI packets. Narrow San Marcos grids and hillside turnarounds replace high-rise dock fights as distinctive hard cases.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone San Marcos or Kyle jobs can look secondary-market simple until university peaks, HOA windows, peak I-35 time, or Hill Country empty miles hit. Cross-county pairs into Travis raise the bill above pure in-town Hays quotes. Do not assume Travis-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Hays is Austin’s south university-plus-growth collar — San Marcos/Kyle/Buda identity with Hill Country access — not a Travis downtown clone and not Williamson’s north tech-suburb belt. Match crews to Texas State calendars, I-35 south freeflow, and Hill Country access photos.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hays County different',
    intro:
      'South-collar realities — Texas State cycles, I-35 south growth, Hill Country access, and Texas licensing — that a renamed Travis pack would miss.',
    bullets: [
      {
        title: 'San Marcos university, Kyle/Buda growth, and Hill Country edges are different products',
        detail:
          'A near-campus apartment, a Kyle HOA two-story, a Buda tract, and a Dripping Springs hillside home do not share truck access. Name both cities — “Hays County local” fails across I-35 vs Hill Country last-mile.',
      },
      {
        title: 'Texas State calendars drive student and staff turnover',
        detail:
          'August, December, and May windows pack crews with short-notice apartment moves, elevators, and high volume near campus. Start-of-term peaks need earlier lead time than pure suburban markets expect.',
      },
      {
        title: 'I-35 south freeflow is not Austin core gridlock — still clock time',
        detail:
          'Many households pair addresses with Travis job centers or within the Kyle/Buda growth belt. Peak I-35 delays are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Hill Country access is not a Kyle cul-de-sac',
        detail:
          'Dripping Springs, Wimberley, and western edges bring grades, longer approaches, tourist weekends, and limited turnaround. Access photos prevent underquotes that flat I-35 growth tracts never see.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hays County zones: university core, I-35 growth & Hill Country edges',
  zonesIntro:
    'Four sharp products — San Marcos university, Kyle/Buda growth, Dripping Springs/Hill Country edge, and Wimberley edges. Not a Travis zone dump with new labels.',
  zones: [
    {
      id: 'san-marcos-university',
      name: 'San Marcos University: Texas State, downtown grid & river edges',
      shortName: 'San Marcos university',
      neighborhoods: [
        'Downtown San Marcos',
        'Texas State campus-adjacent',
        'Older multi-unit corridors',
        'River / local grid edges',
        'South San Marcos residential',
        'North San Marcos toward Kyle',
      ],
      housingTypes:
        'Student and workforce apartments, older SFH, downtown multi-unit, some mid-rise and redevelopment product',
      challenges: [
        'Campus-calendar peaks and short-notice apartment turnover',
        'Limited curb staging on local San Marcos grid',
        'Elevator/COI rules in multi-unit buildings',
        'I-35 interchange timing into and out of town',
      ],
      moverTips:
        'Book campus peaks 2–4 weeks ahead when flexible. Share building packets and truck-height limits. Prefer weekday mornings away from move-in weekends and special events. San Marcos ↔ Kyle is a classic underquoted local.',
      cityKeywords: [
        'san marcos',
        'texas state',
        'downtown san marcos',
        'san marcos tx',
        'texas state university',
      ],
    },
    {
      id: 'kyle-buda-growth',
      name: 'Kyle & Buda Growth: I-35 south family HOA belt',
      shortName: 'Kyle / Buda growth',
      neighborhoods: [
        'Kyle',
        'Buda',
        'I-35 corridor multi-family',
        'Master-planned HOA villages',
        'FM-1626 approach edges',
        'South Travis border pockets',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, newer two-story family product',
      challenges: [
        'I-35 peak congestion toward Austin employment',
        'HOA COI, gate lists, and approved move hours',
        'High school-calendar Saturday demand',
        'New-construction incomplete roads and temporary parking rules',
      ],
      moverTips:
        'Collect HOA packets early. Price Kyle/Buda ↔ San Marcos or Travis pairs with honest I-35 portal time. Confirm builder access the week of the move in new sections. Prefer early summer starts for heat.',
      cityKeywords: [
        'kyle',
        'buda',
        'kyle tx',
        'buda tx',
        'fm-1626',
      ],
    },
    {
      id: 'dripping-springs-hill-country',
      name: 'Dripping Springs & Hill Country Edge',
      shortName: 'Dripping Springs / Hill Country edge',
      neighborhoods: [
        'Dripping Springs',
        'Hill Country larger-lot edges',
        'SH-21 / western approaches',
        'Rural-suburban acreage pockets',
        'Event and winery corridor edges',
      ],
      housingTypes:
        'Larger-lot SFH, Hill Country homes, some HOA villages, acreage and equestrian-edge product',
      challenges: [
        'Grades, longer approaches, and limited truck turnaround',
        'Tourist and event traffic on peak weekends',
        'Long empty miles from I-35 staging',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway/approach and turnaround photos before booking. Never assume I-35 growth-tract truck assumptions transfer. Price Dripping Springs ↔ Kyle/Buda or Travis as long locals with honest empty-mile time.',
      cityKeywords: [
        'dripping springs',
        'hill country',
        'dripping springs tx',
        'hays hill country',
      ],
    },
    {
      id: 'wimberley-edges',
      name: 'Wimberley Edges: recreation & small-town approaches',
      shortName: 'Wimberley edges',
      neighborhoods: [
        'Wimberley',
        'Wimberley Square edges',
        'River and recreation-adjacent pockets',
        'RR / local approach corridors',
        'Cabin-style and vacation-adjacent stock',
      ],
      housingTypes:
        'Small-town SFH, recreation-adjacent homes, larger-lot edges, limited multi-unit',
      challenges: [
        'Narrow approaches and limited staging near recreation corridors',
        'Weekend visitor traffic peaks',
        'Long empty miles from San Marcos or Kyle staging',
        'Not interchangeable with Kyle HOA cul-de-sacs',
      ],
      moverTips:
        'Prefer mid-week starts outside peak visitor weekends when flexible. Measure road width and turnaround before dispatching a full-size truck. Price Wimberley pairs as long locals, not pure map-mile locals.',
      cityKeywords: [
        'wimberley',
        'wimberley tx',
        'wimberley square',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Hays County',
    intro:
      'Same square footage prices differently by university peaks, HOA soft costs, I-35 south portal time, and whether the job is Kyle growth tract or Hill Country long-local.',
    drivers: [
      {
        title: 'I-35 south / SH-21 / FM-1626 corridor time',
        detail:
          'San Marcos ↔ Kyle, Buda ↔ south Travis, or any peak I-35 leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'University multi-unit access',
        detail:
          'Elevators, stair carries, and short-notice Texas State peaks add labor hours and require building coordination suburban HOA jobs may not.',
      },
      {
        title: 'HOA soft costs (Kyle / Buda growth)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Hill Country & Wimberley access',
        detail:
          'Grades, longer approaches, limited turnaround, and tourist weekends add labor and vehicle risk — price them explicitly versus pure I-35 growth-tract jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, campus peaks, or HOA windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,900+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Hill Country / long-local)',
        value: '$2,200–$6,800+',
        note: 'Hill Country and Wimberley pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, university & heat-calendar intelligence',
    intro:
      'Central Texas heat, Texas State terms, school calendars, and Hill Country visitor seasons set residential peaks across Hays County.',
    items: [
      {
        title: 'University move-in / move-out spikes',
        detail:
          'August, December, and May near Texas State pack apartments and create short-notice demand. Flexible mid-week dates often price better than peak weekends.',
      },
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Kyle and Buda. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Hill Country visitor & heat peaks',
        detail:
          'Weekend tourism tightens Wimberley and Dripping Springs approaches; afternoon heat stresses open staging. Prefer early starts and mid-week Hill Country windows when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'texas-state-university-cycle',
      title: 'Texas State university cycle logistics',
      intro:
        'Hays County’s volume problem near San Marcos is apartment elevators, short calendars, and dense student turnover — not only HOA cul-de-sacs.',
      bullets: [
        'Collect building COI, elevator reservations, and loading rules before the survey is final.',
        'Expect August/December/May spikes; lock dates early or accept mid-week alternatives.',
        'Inventory for stairs, tight turns, and partial DIY loads common in student moves.',
        'Price San Marcos core ↔ Kyle/Buda with honest I-35 portal time.',
      ],
    },
    {
      id: 'i35-south-growth',
      title: 'I-35 south growth freeflow',
      intro:
        'Hays’s defining metro relationship is the I-35 south spine into Travis plus FM-1626 and SH-21 — freer than central Austin, still a line item.',
      bullets: [
        'Price San Marcos/Kyle/Buda ↔ Travis pairs as portal-to-portal collar jobs.',
        'Build peak I-35 and school-traffic buffer into weekday afternoons and Friday evenings.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
        'Collect HOA packets for Kyle/Buda growth villages before booking Saturday crews.',
      ],
    },
    {
      id: 'hill-country-access',
      title: 'Hill Country & Wimberley access',
      intro:
        'Dripping Springs and Wimberley edges are elevation, tourism, and approach products — not Kyle cul-de-sacs renamed.',
      bullets: [
        'Verify grades, road width, and turnaround before dispatching a full-size truck.',
        'Prefer mid-week starts outside peak visitor weekends when flexible.',
        'Price I-35 growth belt ↔ Hill Country pairs with honest empty-mile and grade time.',
        'Share driveway and gate photos for larger-lot and recreation-adjacent homes.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Hays County spans multiple districts (e.g., San Marcos CISD, Hays CISD, Dripping Springs ISD, Wimberley ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and master-planned villages can span feeders.',
          },
          {
            title: 'Growth vs Hill Country systems',
            detail:
              'Enrollment pressures differ between rapid Kyle/Buda growth and smaller Hill Country districts — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Texas State University shapes rental demand, traffic, and staff housing near San Marcos — useful for student and university-affiliated households.',
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
              'Christus Santa Rosa / regional San Marcos-area facilities and other south-metro campuses cover much of the county; many households also use Travis systems — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Austin specialty spillover',
            detail:
              'Hill Country and far-south edges may mean longer drives into Kyle/Buda or Travis for specialty care. Confirm insurer networks and realistic I-35 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hays County resources',
    intro:
      'Local official links first. TxDMV, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Hays County',
        href: 'https://hayscountytx.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of San Marcos',
        href: 'https://www.sanmarcostx.gov/',
        external: true,
      },
      {
        label: 'City of Kyle',
        href: 'https://www.cityofkyle.com/',
        external: true,
      },
      {
        label: 'City of Buda',
        href: 'https://www.ci.buda.tx.us/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check I-35 and corridor delays for long locals',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (San Marcos university, Kyle/Buda growth, Dripping Springs/Hill Country edge, Wimberley edges) when available. Confirm campus packets near Texas State, HOA/COI for Kyle/Buda growth, and honest I-35 south / Hill Country drive assumptions — this is an Austin south collar, not a renamed Travis pack. Parent market: Travis guide for Austin-core context.',
  lastReviewed: '2026-07-24',
});
