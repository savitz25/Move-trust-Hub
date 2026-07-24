import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNmPack } from '@/lib/local-movers/county-intelligence/new-mexico/nm-shared';

/**
 * Doña Ana County, NM — Las Cruces / border-adjacent hub (slug: doa-ana; not Albuquerque south rename).
 */
export const doaAnaCountyNmIntelligence: CountyIntelligencePack = finalizeNmPack({
  countySlug: 'doa-ana',
  hubTitle: 'Doña Ana County Moving Intelligence Hub',
  eyebrow:
    'Doña Ana · Las Cruces NM regional hub · I-10 · I-25 · US-70 · border-adjacent',
  h1: 'Moving in Doña Ana County: Las Cruces Valley Access, Border-Adjacent Logistics & I-10 / I-25 Regional Hub Patterns',
  heroOpener:
    'Doña Ana County, New Mexico is the Las Cruces regional hub in the Mesilla Valley — not an Albuquerque south-metro rename, not an El Paso city page, and not a recycled Phoenix desert template. Downtown and NMSU multi-unit curb friction, Mesilla historic adobe approaches, East Mesa growth tracts, West Mesa and valley-floor ranch stock, and I-10 / I-25 / US-70 freeflow rewrite “local” estimates. A campus walk-up elevator job, a Mesilla compound long-carry, an East Mesa two-story, and a rural valley ranch do not share truck access, heat exposure, or empty-mile risk. This hub is for people moving in Doña Ana County, New Mexico — border-adjacent southern New Mexico realities, not a renamed Bernalillo page.',
  heroCredibility:
    'NMDOT TRB / New Mexico household goods framework for intrastate NM moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-25 · US-70 · local Las Cruces grid',
  whatMakesDifferent: {
    title: 'What makes moving in Doña Ana County different',
    intro:
      'These are Las Cruces and Mesilla Valley realities — valley heat, NMSU multi-unit density, border-adjacent interstate timing, and mesa growth stock — not Albuquerque heights–valley defaults or a generic New Mexico template.',
    bullets: [
      {
        title: 'Valley heat and desert sun rewrite outdoor labor windows',
        detail:
          'Summer temperatures and intense sun make mid-day outdoor staging expensive. Early-morning starts, shade planning, and hydration matter more here than bedroom count alone.',
      },
      {
        title: 'Downtown, NMSU, and midtown multi-unit differ from mesa SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy stock dominate campus and core jobs. An NMSU-adjacent walk-up is not an East Mesa garage-friendly two-story.',
      },
      {
        title: 'I-10, I-25, and US-70 define portal-to-portal time',
        detail:
          'East Mesa ↔ Mesilla, Las Cruces ↔ Anthony edges, or valley ↔ I-10 logistics pairs look local on maps and regional at peak. Price honestly — empty miles, freight traffic, and construction windows stack fast.',
      },
      {
        title: 'Mesilla adobe and valley-floor stock need access-first surveys',
        detail:
          'Historic compounds, ditch-adjacent soft shoulders, and courtyard entries change packing and staging versus East Mesa HOA defaults.',
      },
      {
        title: 'Not Albuquerque south, not El Paso TX as the default',
        detail:
          'This is Doña Ana County’s Las Cruces market. Bernalillo metro product and Texas-side border patterns use different access rules, regulators, and corridors — survey each Doña Ana address on its own terms.',
      },
      {
        title: 'Intrastate NMDOT TRB household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within New Mexico by for-hire household goods carriers generally fall under the New Mexico Department of Transportation Transportation Regulation Bureau (NMDOT TRB) household goods / motor carrier framework. Match the legal name on the estimate to NMDOT TRB authority before you deposit. Any out-of-state leg — including Texas-bound I-10 pairs — needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not substitute TX, AZ, CO PUC, UT, or NJ credentials for New Mexico intrastate work.',
      },
    ],
  },
  zonesHeading: 'Doña Ana County access zones',
  zonesIntro:
    'Plan by Downtown / NMSU multi-unit, Mesilla & valley floor, East Mesa growth, and West Mesa / rural-edge belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'las-cruces-downtown-nmsu',
      name: 'Downtown Las Cruces, NMSU & midtown multi-unit',
      shortName: 'Core / NMSU',
      neighborhoods: [
        'Downtown Las Cruces',
        'NMSU-adjacent multi-unit',
        'University Avenue corridor',
        'midtown Las Cruces',
        'Main Street edges',
      ],
      housingTypes: 'Apartments, condos, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and campus-calendar congestion',
        'Stairs, long carries, and tight approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows away from move-in peaks. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'las cruces',
        'downtown las cruces',
        'nmsu',
        'university avenue',
        'main street las cruces',
      ],
    },
    {
      id: 'mesilla-valley-floor',
      name: 'Mesilla, valley floor & historic compound stock',
      shortName: 'Mesilla / valley',
      neighborhoods: [
        'Mesilla',
        'valley-floor ranch edges',
        'acequia-adjacent parcels',
        'historic adobe compounds',
        'southern valley approaches',
      ],
      housingTypes: 'Adobe compounds, ranch SFH, mixed older stock',
      challenges: [
        'Courtyard entries and limited truck proximity',
        'Soft shoulders and ditch-adjacent staging risk',
        'Different access skill set than East Mesa HOA jobs',
      ],
      moverTips:
        'Photo gate width, courtyard depth, and ground condition. Price valley–mesa pairs portal-to-portal. Survey long carries before final pricing.',
      cityKeywords: ['mesilla', 'mesilla valley', 'valley floor las cruces'],
    },
    {
      id: 'east-mesa-growth',
      name: 'East Mesa, Sonoma Ranch & eastern growth corridors',
      shortName: 'East Mesa',
      neighborhoods: [
        'East Mesa',
        'Sonoma Ranch edges',
        'US-70 eastern approaches',
        'HOA growth tracts',
        'eastern multi-family pockets',
      ],
      housingTypes: 'Newer SFH, HOA tracts, multi-family',
      challenges: [
        'HOA packets and gate rules on many tracts',
        'Longer portal time to downtown / NMSU',
        'US-70 and I-25 peak congestion on core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price East Mesa–core pairs honestly. Avoid peak US-70 windows when flexible.',
      cityKeywords: [
        'east mesa',
        'sonoma ranch',
        'us-70 las cruces',
        'east las cruces',
      ],
    },
    {
      id: 'west-mesa-rural-edge',
      name: 'West Mesa, rural edges & I-10 corridor approaches',
      shortName: 'West / rural edge',
      neighborhoods: [
        'West Mesa edges',
        'I-10 corridor approaches',
        'rural-edge ranch stock',
        'Anthony / southern fringe edges',
        'western desert fringe',
      ],
      housingTypes: 'Ranch SFH, acreage, limited multi-family, industrial-adjacent stock',
      challenges: [
        'Long driveways, soft ground, and limited turnaround',
        'I-10 freight and heat-exposed staging',
        'Different skill set than downtown elevator jobs',
      ],
      moverTips:
        'Survey driveway length and ground condition carefully. Price western and border-edge pairs portal-to-portal. Clarify NM vs TX destinations on multi-state estimates.',
      cityKeywords: [
        'west mesa',
        'anthony nm',
        'i-10 las cruces',
        'dona ana rural',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Doña Ana County moving costs',
    intro:
      'Valley heat, core multi-unit friction, mesa vs compound access, and I-10 / I-25 / US-70 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Heat-exposed outdoor labor windows',
        detail: 'Mid-day summer staging and longer rest cycles spike hours.',
      },
      {
        title: 'Downtown / NMSU elevator & curb friction',
        detail: 'Building packets and scarce staging dominate campus-core jobs.',
      },
      {
        title: 'I-10 / I-25 / US-70 congestion',
        detail: 'Portal-to-portal spikes at peak and freight windows.',
      },
      {
        title: 'Cross-zone empty miles (mesa–valley–rural edge)',
        detail: 'Map-short pairs still bill regional time across the valley grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,500+',
        note: 'Higher with elevators or compound long carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,900+',
        note: 'Core and heat-window friction trends up',
      },
      {
        label: '3–4+ BR / compound / cross-corridor',
        value: '$2,300–$7,800+',
        note: 'Long carries and multi-interstate pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Doña Ana County',
    intro:
      'Extreme summer heat, NMSU academic calendar turns, family peaks, and mild winter windows reshape Las Cruces scheduling.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Beat heat and reduce I-10 / I-25 / US-70 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book East Mesa Saturdays early; start before heat builds.',
      },
      {
        title: 'NMSU and multi-family lease turns',
        detail: 'Campus-adjacent elevators and curb slots fill first at term changes.',
      },
      {
        title: 'Desert heat & monsoon storm afternoons',
        detail: 'Plan shade, hydration, and weather contingency for outdoor staging.',
      },
    ],
  },
  specialized: [
    {
      id: 'las-cruces-valley-border-adjacent-module',
      title: 'Las Cruces valley & border-adjacent logistics module',
      intro:
        'Doña Ana estimates fail when heat windows, NMSU building packets, Mesilla compound access, or I-10/I-25 empty miles are ignored — and when crews treat this as Albuquerque south or a Texas-only playbook.',
      bullets: [
        'Request Downtown / NMSU building packets early.',
        'Photo courtyard depth and ground condition on Mesilla and valley-floor jobs.',
        'Price I-10 / I-25 / US-70 pairs portal-to-portal; schedule around peak heat.',
        'Clarify New Mexico vs Texas destinations on multi-state estimates.',
        'Verify NMDOT TRB household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Doña Ana County?',
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
              'Las Cruces Public Schools serve most city addresses, with Gadsden and other systems covering southern and outlying areas. Confirm zoning carefully — lines shift across valley and mesa addresses.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and New Mexico Public Education Department data beat ranking screenshots.',
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
              'Memorial Medical Center, MountainView Regional, and other campuses anchor Las Cruces care; El Paso systems appear in some specialist referral patterns. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from East Mesa and rural edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs Mesilla adobe vs East Mesa growth',
            detail:
              'NMSU apartments, historic compounds, and mesa HOA tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'East Mesa newer stock often prices differently from valley-floor older product or rural-edge acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / NMSU lifestyle',
            detail: 'Campus and walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Mesilla / valley pattern',
            detail: 'Historic adobe character with compound access logistics.',
          },
          {
            title: 'East Mesa growth pattern',
            detail: 'More space and HOA stock with different commute math to core jobs.',
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
              'NMSU and education, healthcare, government, agriculture, logistics, and space/defense contractors shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-25, and US-70 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Las Cruces regional identity',
            detail:
              'Doña Ana is southern New Mexico’s Las Cruces hub — not Albuquerque south product, and not an El Paso TX default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot desert summers, mild winters, strong sun, and monsoon afternoons. Plan outdoor staging contingency and early starts.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Doña Ana County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Doña Ana County, New Mexico — official site',
        href: 'https://www.donaanacounty.org/',
        external: true,
      },
      {
        label: 'City of Las Cruces — official site',
        href: 'https://www.lascruces.gov/',
        external: true,
      },
      {
        label: 'NMDOT traffic & road conditions',
        href: 'https://www.dot.nm.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer valley heat windows, NMSU multi-unit, and Mesilla compound experience with honest I-10 / I-25 / US-70 pricing. Verify NMDOT TRB HHG authority in-state and FMCSA interstate. This is Doña Ana County NM (Las Cruces) — not Albuquerque south or El Paso TX.',
  lastReviewed: '2026-07-24',
});
