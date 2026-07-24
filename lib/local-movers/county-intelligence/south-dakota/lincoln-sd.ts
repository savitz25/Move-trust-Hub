import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeSdPack } from '@/lib/local-movers/county-intelligence/south-dakota/sd-shared';

/**
 * Lincoln County, SD — Sioux Falls south growth (Harrisburg–Tea).
 * CRITICAL: Lincoln County SD ≠ Lincoln NE (Lancaster County / Lincoln city) and ≠ Lincoln County NE.
 * NOT Minnehaha core rename. NOT ND, MN, IA, or NE product.
 */
export const lincolnCountySdIntelligence: CountyIntelligencePack = finalizeSdPack({
  countySlug: 'lincoln',
  hubTitle: 'Lincoln County Moving Intelligence Hub',
  eyebrow:
    'Lincoln · Sioux Falls SD south growth · Harrisburg · Tea · I-29 · SD-11',
  h1: 'Moving in Lincoln County SD: Harrisburg–Tea Growth, South-Metro HOAs & I-29 Spillover Logistics',
  heroOpener:
    'Lincoln County, South Dakota is the Sioux Falls south-metro growth belt — Harrisburg and Tea new-construction HOAs, Canton seat edges, Big Sioux south-bank residential, and I-29 spillover corridors — not Lincoln, Nebraska (Lancaster County / capital city), not a Minnehaha downtown-core rename, and not a recycled Iowa or Minnesota suburb page. A Harrisburg cul-de-sac HOA job, a Tea townhome gate list, a Canton village long-carry, and a rural edge driveway do not share truck access, curb rules, or empty-mile risk. I-29, SD-11, and the local south-metro grid freeflow rewrite “local” estimates into Sioux Falls core, and Plains winter ice and wind can erase schedule optimism overnight. This hub is for people moving in Lincoln County, South Dakota — south Sioux Falls growth realities — not Lincoln NE and not a Minnehaha core product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate SD · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-29 · SD-11 · local south-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Lincoln County different',
    intro:
      'These are Sioux Falls south-growth realities — Harrisburg–Tea HOA product, Canton village stock, I-29 spillover freeflow, and Plains winter logistics — not Lincoln Nebraska capital product, not Minnehaha downtown multi-unit defaults, and not an Iowa or Minnesota rename.',
    bullets: [
      {
        title: 'Harrisburg–Tea growth HOAs rewrite labor hours differently than SF core',
        detail:
          'Gate lists, truck-length limits, HOA quiet hours, and new-construction driveway geometry dominate growth jobs. A Harrisburg cul-de-sac is not a Sioux Falls downtown loft elevator job.',
      },
      {
        title: 'Canton and older village stock underprice pure-suburb optimism',
        detail:
          'Older SFH, tight residential curb, basement stairs, and limited truck turnaround fail bedroom-count quotes. Survey photos beat inventory lists alone.',
      },
      {
        title: 'South-metro growth is not Minnehaha core product',
        detail:
          'Longer portal time into Sioux Falls jobs, mixed townhome product, and empty miles across county lines reshape estimates that assume “Sioux Falls flat rate” for Lincoln addresses.',
      },
      {
        title: 'I-29 and SD-11 define portal-to-portal time',
        detail:
          'Tea ↔ downtown Sioux Falls, Harrisburg ↔ Brandon edges, or Canton ↔ core pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Plains winter ice, wind, and I-29 freeflow are real schedule risk',
        detail:
          'Ice, wind, snow events, and interstate freeflow reshape morning windows across the south metro. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'South Dakota has no dedicated HHG permit board like ND NDDOT or NE PSC — written estimates, insurance, FMCSA interstate',
        detail:
          'South Dakota does not maintain a dedicated household-goods permit or certificate board comparable to North Dakota’s NDDOT HHG permit, Nebraska PSC Household Goods Mover License, Iowa, Minnesota, Wyoming, or New Jersey consumer-mover frameworks. For pure in-state South Dakota jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a South Dakota HHG certificate number that does not exist — and do not apply Nebraska PSC rules to Lincoln County, South Dakota.',
      },
    ],
  },
  zonesHeading: 'Lincoln County access zones',
  zonesIntro:
    'Plan by Harrisburg growth, Tea south-metro product, Canton seat edges, and rural/I-29 corridor stock — access rules cluster by HOA density and spillover freeflow more than ZIP alone. This is Lincoln County SD, not Lincoln NE.',
  zones: [
    {
      id: 'harrisburg-growth',
      name: 'Harrisburg growth belts & new-construction HOAs',
      shortName: 'Harrisburg',
      neighborhoods: [
        'Harrisburg',
        'Harrisburg growth tracts',
        'Newer HOA and townhome pockets',
        'South-metro school-corridor edges',
        'Big Sioux south-bank approaches',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists, quiet hours, and truck-length limits',
        'I-29 / SD-11 freeflow into Sioux Falls core',
        'Longer portal time on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Harrisburg–Sioux Falls pairs portal-to-portal. Confirm curb and driveway geometry on new-construction lots.',
      cityKeywords: [
        'harrisburg',
        'harrisburg sd',
        'harrisburg south dakota',
      ],
    },
    {
      id: 'tea-south-metro',
      name: 'Tea south-metro growth & I-29 west-edge product',
      shortName: 'Tea',
      neighborhoods: [
        'Tea',
        'Tea growth tracts',
        'I-29 Tea approaches',
        'Townhome and HOA pockets',
        'South Sioux Falls spillover edges',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, some multi-family',
      challenges: [
        'HOA rules and limited truck staging on growth product',
        'I-29 peak congestion toward Sioux Falls',
        'County-line empty miles on multi-address estimates',
      ],
      moverTips:
        'Get HOA packets in writing. Price Tea–core pairs portal-to-portal. Avoid peak I-29 windows when flexible.',
      cityKeywords: [
        'tea',
        'tea sd',
        'tea south dakota',
        'i-29 tea',
      ],
    },
    {
      id: 'canton-seat-edges',
      name: 'Canton seat, village stock & established SFH',
      shortName: 'Canton',
      neighborhoods: [
        'Canton',
        'Canton village edges',
        'Older established SFH pockets',
        'Seat-area multi-family stock',
        'Local grid residential blocks',
      ],
      housingTypes: 'Older village SFH, modest multi-family, mixed established stock',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs and long carries',
        'Longer empty miles to Sioux Falls core jobs',
      ],
      moverTips:
        'Photo stair access, basement entries, and curb staging. Price Canton–metro pairs with freeflow buffers. Do not assume Harrisburg HOA access rules apply.',
      cityKeywords: [
        'canton',
        'canton sd',
        'canton south dakota',
      ],
    },
    {
      id: 'rural-i29-corridor',
      name: 'Rural-residential edges & I-29 / SD-11 corridor stock',
      shortName: 'Rural / corridor',
      neighborhoods: [
        'Rural Lincoln County edges',
        'SD-11 corridor pockets',
        'I-29 rural approaches',
        'Farm-edge residential stock',
        'Smaller community nodes',
      ],
      housingTypes: 'Rural-residential, farmhouses, mixed corridor SFH',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Empty miles into metro jobs',
        'Winter wind and ice on open corridor approaches',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Price rural–metro pairs with honest portal time. Build winter contingency on open approaches.',
      cityKeywords: [
        'lincoln county sd',
        'sd-11',
        'i-29 lincoln',
        'rural lincoln county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Lincoln County moving costs',
    intro:
      'Growth-belt HOA rules, village-stock stairs, I-29 spillover portal time, county-line empty miles into Sioux Falls, and Plains winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Harrisburg / Tea HOA gate & truck-length friction',
        detail: 'Packets, quiet hours, and staging limits dominate growth jobs.',
      },
      {
        title: 'Canton village long carries & basement stairs',
        detail: 'Tight curb and carry distance spike labor hours.',
      },
      {
        title: 'I-29 / SD-11 congestion into Sioux Falls',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'South-metro empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; ice and wind rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,000+',
        note: 'Higher with HOA limits or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,600–$4,900+',
        note: 'Growth HOA and village friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro into Sioux Falls',
        value: '$3,000–$9,800+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$200+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Lincoln County',
    intro:
      'Summer family peaks, new-construction closings, multi-family lease turns, and Plains winter ice reshape south-metro windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear HOA curb rules and reduce I-29 pain before peak.',
      },
      {
        title: 'Peak family & closing season: late May–mid-August',
        detail: 'Book Harrisburg and Tea Saturdays early.',
      },
      {
        title: 'Month-end multi-family and HOA turns',
        detail: 'Growth-belt townhomes and gate lists fill first.',
      },
      {
        title: 'Winter ice, wind & I-29 freeflow risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'lincoln-sd-south-metro-module',
      title: 'Sioux Falls south-growth & I-29 spillover module',
      intro:
        'Lincoln SD estimates fail when Harrisburg–Tea HOA packets, Canton village stairs, or I-29/SD-11 empty miles into Sioux Falls are ignored — and when crews treat this as Lincoln NE, Minnehaha core-only, or an ND/MN/IA rename page.',
      bullets: [
        'Request Harrisburg and Tea HOA packets early.',
        'Photo stair access, basement entries, and curb staging on Canton and older stock.',
        'Price I-29 · SD-11 pairs portal-to-portal into Sioux Falls.',
        'Clarify Lincoln SD (Harrisburg / Tea / Canton) vs Minnehaha destinations — and never confuse with Lincoln NE.',
        'For pure in-state South Dakota jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — South Dakota has no ND NDDOT- or NE PSC-style HHG permit board.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lincoln County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Lincoln County, South Dakota — not Lincoln, Nebraska.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Harrisburg, Tea area systems, Canton, and other districts serve different addresses across the south metro. Confirm zoning carefully — growth belts shift enrollment and boundaries.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and South Dakota Department of Education data beat ranking screenshots. Do not use Nebraska capital-city school research for Lincoln County SD.',
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
              'Sanford Health, Avera, and Sioux Falls-area campuses anchor regional care for most Lincoln County residents. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Harrisburg, Tea, and Canton into Sioux Falls campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Growth HOA vs village stock vs rural edges',
            detail:
              'Harrisburg–Tea new-build product, Canton village homes, and rural-residential stock price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'South-metro growth stock often prices differently from older Canton product or outer rural multi-acre properties.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Harrisburg / Tea growth lifestyle',
            detail: 'Newer schools and space with HOA rules and I-29 commute math to Sioux Falls.',
          },
          {
            title: 'Canton pattern',
            detail: 'Seat-town character with longer portal time to metro jobs and different access geometry.',
          },
          {
            title: 'Rural / corridor pattern',
            detail: 'More space and driveway logistics with empty-mile and winter exposure tradeoffs.',
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
              'Most employment gravity pulls north into Sioux Falls healthcare, finance, professional services, logistics, and retail — plus local south-metro commercial growth.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-29, SD-11, and south-metro peaks are real. Test drive peak routes between Harrisburg / Tea / Canton and Sioux Falls anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Sioux Falls south-growth identity',
            detail:
              'Lincoln County SD is south-metro Harrisburg–Tea growth — not Lincoln NE capital product, not Minnehaha downtown alone, and not an ND, MN, IA, or NE rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold Plains winters with ice and wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lincoln County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. This is Lincoln County, South Dakota — not Lincoln, Nebraska. South Dakota does not use a dedicated HHG permit board like ND NDDOT or NE PSC — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Lincoln County, South Dakota — official site',
        href: 'https://lincolncountysd.org/',
        external: true,
      },
      {
        label: 'City of Sioux Falls — official site (metro context)',
        href: 'https://www.siouxfalls.org/',
        external: true,
      },
      {
        label: 'South Dakota Department of Transportation — traffic',
        href: 'https://dot.sd.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Harrisburg–Tea HOA and south-metro access experience with honest I-29 · SD-11 pricing into Sioux Falls. Insist on written estimates and insurance for intrastate SD moves; verify FMCSA interstate. South Dakota has no ND NDDOT- or NE PSC-style HHG permit board. This is Lincoln County SD (Harrisburg / Tea / Canton) — not Lincoln NE, not Minnehaha core-only, and not ND/MN/IA product.',
  lastReviewed: '2026-07-24',
});
