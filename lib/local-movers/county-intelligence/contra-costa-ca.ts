import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Contra Costa County moving intelligence.
 * Used by /local-movers/california/contra-costa and the shared intelligence template.
 *
 * Differentiators vs Alameda / generic East Bay: sharp West→Lamorinda→East County
 * value/access gradient, canyon hillside homes, I-680 spine, BART corridor demand,
 * East County growth (Antioch/Brentwood) vs Lamorinda affluence.
 */
export const contraCostaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'contra-costa',
  hubTitle: 'Contra Costa County Moving Intelligence Hub',
  eyebrow: 'Contra Costa County · East Bay guide',
  h1: 'Moving in Contra Costa County: Lamorinda Hills, I-680 & East County Zone Guide',
  heroOpener:
    'Contra Costa County (~1.17 million residents) has one of the sharpest internal contrasts in the Bay Area. West County and Central County density give way to affluent Lamorinda hillside towns (Lafayette, Orinda, Moraga), Walnut Creek’s retail/office core, San Ramon’s Dougherty Valley planned communities, and fast-growing East County cities (Antioch, Pittsburg, Brentwood, Oakley) that draw buyers from San Francisco, Oakland, and Silicon Valley seeking space and relative value. Canyon driveways, BART-adjacent multi-unit stock, and HOA packets in newer tracts are different jobs under one county name. I-680, I-80, SR-4, SR-24, and SR-242 turn cross-county “locals” into real portal-to-portal time. This guide is for people moving in Contra Costa — not generic East Bay tips recycled from Alameda or San Francisco.',
  heroCredibility:
    'West · Lamorinda · East County contrast · Hills & HOAs · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Contra Costa County different',
    intro:
      'These are the East Bay realities unique to Contra Costa — the value gradient west-to-east, hillside access, and long internal distances.',
    bullets: [
      {
        title: 'Sharp West / Lamorinda / East County contrast',
        detail:
          'A Richmond multi-unit job, an Orinda canyon home, and a Brentwood tract home do not share truck access, inventory value, or HOA culture. “Contra Costa local” is too vague — put both cities in the estimate assumptions.',
      },
      {
        title: 'Core Bay Area inbound migration',
        detail:
          'Households leave San Francisco, Oakland, and Silicon Valley for more space in Central and East County. Spring/summer and end-of-month windows stay busy in Concord, San Ramon, Antioch, and Brentwood — book popular Saturdays early.',
      },
      {
        title: 'Lamorinda hills and canyons rewrite truck access',
        detail:
          'Lafayette, Orinda, and Moraga often mean steep driveways, tight turnarounds, low branches, and no 26′ truck at the door. Shuttle trucks or long carries are common. Share approach photos and max truck length before move day.',
      },
      {
        title: 'BART corridor shapes demand',
        detail:
          'Stations and commute patterns influence multi-unit and townhome inventory near Richmond, El Cerrito, Concord, Pleasant Hill, Walnut Creek, and beyond. Elevator/COI rules show up more often near denser BART-adjacent nodes than in pure East County SFH tracts.',
      },
      {
        title: 'HOA paperwork in growth suburbs',
        detail:
          'San Ramon / Dougherty Valley and large East County planned communities commonly require Certificates of Insurance, approved hours, floor protection, and sometimes gate lists. Treat the HOA packet as part of the survey.',
      },
      {
        title: 'I-680 is the county’s spine — and bottleneck',
        detail:
          'I-680 (plus I-80, SR-4, SR-24, SR-242) controls billable hours. Walnut Creek ↔ Antioch or Lafayette ↔ San Ramon can double travel time in 7–9 a.m. and 3–7 p.m. peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'West County industrial & bridge-adjacent patterns',
        detail:
          'Richmond and West County corridors feel port/industrial and I-80 pressure. Mid-day freight and commute peaks can stall “short” locals — build buffer near industrial clusters.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and value profile. West County density, Lamorinda canyons, Walnut Creek/Concord cores, San Ramon planned communities, and East County growth cities are not interchangeable.',
  zones: [
    {
      id: 'west-county',
      name: 'West County',
      shortName: 'West County',
      neighborhoods: [
        'Richmond',
        'El Cerrito',
        'San Pablo',
        'Hercules',
        'Pinole',
        'El Sobrante',
        'Kensington edge',
      ],
      housingTypes:
        'Multi-unit and older SFH, hillside pockets, waterfront-adjacent stock, mixed industrial-edge neighborhoods',
      challenges: [
        'I-80 congestion and bridge-adjacent traffic patterns',
        'Older streets with limited staging',
        'Hillside pockets with tight access',
        'Cross-county spill into Alameda (Berkeley/Oakland edge)',
      ],
      moverTips:
        'Clarify exact city pairs and parking constraints. Near I-80 industrial/port influence, avoid mid-day peaks when possible. For hillside addresses, share approach photos early.',
      cityKeywords: [
        'richmond',
        'el cerrito',
        'san pablo',
        'hercules',
        'pinole',
        'el sobrante',
        'kensington',
        'point richmond',
      ],
    },
    {
      id: 'central-county',
      name: 'Central County',
      shortName: 'Central County',
      neighborhoods: [
        'Concord',
        'Pleasant Hill',
        'Martinez',
        'Clayton',
        'Pacheco',
        'Clyde',
      ],
      housingTypes:
        'Suburban SFH, multi-family near BART, mid-century tracts, some hillside (Clayton / Ygnacio edges)',
      challenges: [
        'I-680 / SR-242 / SR-4 weave congestion',
        'BART-adjacent multi-unit elevator/COI rules',
        'Busy end-of-month family calendars',
        'Longer “local” hauls toward East County or Lamorinda',
      ],
      moverTips:
        'Confirm elevator/HOA rules for multi-unit near BART. Mid-week mornings beat 680 peaks. Concord/Pleasant Hill ↔ Brentwood pairs need honest portal-to-portal time on SR-4.',
      cityKeywords: [
        'concord',
        'pleasant hill',
        'martinez',
        'clayton',
        'pacheco',
        'ygnacio',
        'walnut creek edge',
      ],
    },
    {
      id: 'lamorinda',
      name: 'Lamorinda',
      shortName: 'Lamorinda',
      neighborhoods: [
        'Lafayette',
        'Orinda',
        'Moraga',
        'Canyon',
        'Reliez Valley',
        'Happy Valley',
      ],
      housingTypes:
        'Hillside and canyon SFH, higher-value homes, limited multi-unit, tree-covered lots',
      challenges: [
        'Steep driveways and switchbacks',
        'Limited truck turnaround and low branches',
        'High shipment values and careful handling expectations',
        'SR-24 congestion toward the Caldecott / Oakland',
      ],
      moverTips:
        'Assume access complexity until proven otherwise — request driveway/approach videos. Budget shuttle or long-carry. Inventory high-value contents carefully and confirm valuation coverage. Weekday mornings on SR-24 are usually cleaner.',
      cityKeywords: [
        'lafayette',
        'orinda',
        'moraga',
        'lamorinda',
        'reliez',
        'happy valley',
        'canyon',
      ],
    },
    {
      id: 'walnut-creek',
      name: 'Walnut Creek & Surrounding',
      shortName: 'Walnut Creek',
      neighborhoods: [
        'Downtown Walnut Creek',
        'Rossmoor',
        'Saranap',
        'Northgate',
        'Tice Valley',
        'Diablo edge',
      ],
      housingTypes:
        'Condos/townhomes, mid-rise multi-unit, SFH, retirement communities (e.g. Rossmoor), some hillside',
      challenges: [
        'I-680 / downtown retail congestion',
        'Elevator COI windows in multi-unit buildings',
        'Community rules in senior / HOA properties',
        'Busy weekend shopping-area staging limits',
      ],
      moverTips:
        'Send building or community move packets early (especially multi-unit and Rossmoor-type rules). Prefer weekday mornings over weekend downtown peaks. Confirm truck staging on retail-adjacent streets.',
      cityKeywords: [
        'walnut creek',
        'rossmoor',
        'saranap',
        'northgate',
        'tice valley',
        'diablo',
      ],
    },
    {
      id: 'san-ramon',
      name: 'San Ramon / Dougherty Valley',
      shortName: 'San Ramon',
      neighborhoods: [
        'San Ramon',
        'Dougherty Valley',
        'Windemere',
        'Norris Canyon edge',
        'Bishop Ranch area',
      ],
      housingTypes:
        'Master-planned SFH and townhomes, strong HOA governance, multi-family near employment centers',
      challenges: [
        'Near-universal HOA COI and approved-hour rules in many villages',
        'I-680 congestion toward Walnut Creek and the Tri-Valley',
        'Cul-de-sac and truck-size restrictions',
        'Cross-county spill into Alameda (Dublin/Pleasanton edge)',
      ],
      moverTips:
        'San Ramon/Dougherty Valley is HOA-first — collect the management packet before the estimate. Mid-week mornings beat 680 peaks. Clarify if the destination is still Contra Costa or over the Alameda line.',
      cityKeywords: [
        'san ramon',
        'dougherty',
        'windemere',
        'norris canyon',
        'bishop ranch',
        'tassajara',
      ],
    },
    {
      id: 'east-county',
      name: 'East County',
      shortName: 'East County',
      neighborhoods: [
        'Antioch',
        'Pittsburg',
        'Brentwood',
        'Oakley',
        'Bay Point',
        'Discovery Bay edge',
      ],
      housingTypes:
        'Large newer tracts, master-planned communities, multi-family, some waterfront-adjacent stock',
      challenges: [
        'SR-4 congestion toward Central County',
        'Longer hauls to Lamorinda / Walnut Creek / West County',
        'HOA rules in many growth communities',
        'Heat inland vs cooler West County days',
      ],
      moverTips:
        'Treat East County ↔ Lamorinda or East County ↔ West County as long locals with honest portal-to-portal time on SR-4 / 680. Collect HOA packets for newer tracts. Summer heat favors early starts in Brentwood/Antioch.',
      cityKeywords: [
        'antioch',
        'pittsburg',
        'brentwood',
        'oakley',
        'bay point',
        'discovery bay',
        'east county',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Contra Costa County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on hills, HOA soft costs, and whether the pair is Lamorinda canyon-to-door or East County tract-to-tract across SR-4.',
    drivers: [
      {
        title: 'Hillside / canyon access & shuttles',
        detail:
          'Lamorinda and some Central County hills often need smaller trucks, long carries, or shuttles — access complexity can exceed a same-size flatland job.',
      },
      {
        title: 'HOA soft costs in growth suburbs',
        detail:
          'COI, approved hours, and gate lists in San Ramon and East County planned communities add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Cross-county freeway time',
        detail:
          'West County ↔ East County or Lafayette ↔ Brentwood can burn 45–90+ minutes each way at peak. Hourly billing follows the clock.',
      },
      {
        title: 'I-680 / SR-4 / SR-24 congestion',
        detail:
          'The county’s main spines stall mid-day and peak commute windows. Realistic ETAs prevent overtime surprises.',
      },
      {
        title: 'High-value Lamorinda inventories',
        detail:
          'Higher home values raise careful-handling and valuation expectations. Cheap released-value coverage is often inadequate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,600+',
        note: 'Higher with elevators or hillside long-carry',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,800–$4,400+',
        note: 'HOA soft costs and multi-freeway hauls trend up',
      },
      {
        label: '3–4+ BR (hills / cross-zone)',
        value: '$2,800–$7,500+',
        note: 'Lamorinda access and West↔East County pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$210+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, inbound & calendar intelligence',
    intro:
      'Contra Costa peaks follow school calendars, Bay Area outbound moves, and freeways — hills stay access-sensitive year-round.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays in Central and East County. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Core Bay Area inbound waves',
        detail:
          'Households leaving SF, Oakland, and Silicon Valley often time moves around school years. East County and San Ramon inventory books early for May–August.',
      },
      {
        title: 'Summer heat inland (East County)',
        detail:
          'Antioch/Brentwood heat favors early starts even when West County is cooler. Protect electronics in sealed trucks.',
      },
      {
        title: 'I-680 corridor event & commute peaks',
        detail:
          'Walnut Creek / Concord retail and office patterns plus commute peaks constrain staging. Weekday mornings usually win.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases collide.',
      },
    ],
  },
  resources: {
    title: 'Practical Contra Costa County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'Contra Costa County — official site',
        href: 'https://www.contracosta.ca.gov/',
        external: true,
      },
      {
        label: 'City of Walnut Creek',
        href: 'https://www.walnutcreekca.gov/',
        external: true,
      },
      {
        label: 'City of Concord',
        href: 'https://www.cityofconcord.org/',
        external: true,
      },
      {
        label: 'City of Richmond',
        href: 'https://www.ci.richmond.ca.us/',
        external: true,
      },
      {
        label: 'City of San Ramon',
        href: 'https://www.sanramon.ca.gov/',
        external: true,
      },
      {
        label: 'City of Antioch',
        href: 'https://www.antiochca.gov/',
        external: true,
      },
      {
        label: 'City of Brentwood',
        href: 'https://www.brentwoodca.gov/',
        external: true,
      },
      {
        label: '511 SF Bay — traffic conditions',
        href: 'https://511.org/',
        note: 'Check 680/80/4/24 before locking load windows',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PG&E — start/stop service',
        href: 'https://www.pge.com/',
        note: 'Electric & gas for most of the county',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (West County, Central, Lamorinda, Walnut Creek, San Ramon, East County) when available. Confirm hillside access and HOA/COI rules — especially for Lamorinda canyons and East County/San Ramon planned communities.',
  lastReviewed: '2026-07-22',
};
