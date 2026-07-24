import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNmPack } from '@/lib/local-movers/county-intelligence/new-mexico/nm-shared';

/**
 * Bernalillo County, NM — Albuquerque metro core (not Santa Fe capital, not Rio Rancho rename, not AZ/TX clone).
 */
export const bernalilloCountyNmIntelligence: CountyIntelligencePack = finalizeNmPack({
  countySlug: 'bernalillo',
  hubTitle: 'Bernalillo County Moving Intelligence Hub',
  eyebrow:
    'Bernalillo · Albuquerque NM metro core · I-25 · I-40 · NM-500 · heights & valley',
  h1: 'Moving in Bernalillo County: Albuquerque Heights vs Valley Access, Adobe Stock & I-25 / I-40 Crossroads Logistics',
  heroOpener:
    'Bernalillo County, New Mexico is Albuquerque metro core — not a Santa Fe capital-city page, not a Rio Rancho growth rename, and not a recycled Phoenix or El Paso desert template. Northeast Heights garage-friendly tracts, North Valley and South Valley acequia-adjacent driveways, Downtown and Nob Hill multi-unit curb friction, Westside mesa approaches, and the I-25 / I-40 Big I freeflow rewrite “local” estimates. A loft elevator job near Central, a long-carry adobe compound in the North Valley, a two-story in the Far Northeast Heights, and a South Valley ranch do not share truck access, elevation wind, or empty-mile risk. This hub is for people moving in Bernalillo County, New Mexico — Albuquerque market realities at roughly 5,000+ feet, not a renamed Arizona or Texas desert page.',
  heroCredibility:
    'NMDOT TRB / New Mexico household goods framework for intrastate NM moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-25 · I-40 · NM-500 · local Albuquerque arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Bernalillo County different',
    intro:
      'These are Albuquerque core realities — heights vs valley access, adobe and multi-unit mix, high-desert elevation, and the I-25 / I-40 crossroads — not Santa Fe historic-core defaults or a generic Southwest template.',
    bullets: [
      {
        title: 'Heights vs valley access rewrites labor hours',
        detail:
          'Northeast Heights and Far Heights garage-friendly lots often stage cleanly; North Valley and South Valley acequia, ditch, and soft-shoulder approaches can mean long carries, tight turnarounds, and soft-ground risk. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Downtown, Nob Hill, and UNM multi-unit differ from outer SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy stock dominate core jobs. A Downtown loft walk-up is not a Far Northeast Heights two-story with driveway staging.',
      },
      {
        title: 'I-25, I-40, and NM-500 define portal-to-portal time',
        detail:
          'Heights ↔ Westside, Valley ↔ Downtown, or South Valley ↔ Journal Center pairs look local on maps and regional at peak. Price honestly — empty miles, Big I construction, and monsoon windows stack fast.',
      },
      {
        title: 'Adobe, stucco, and high-desert stock need desert-aware crews',
        detail:
          'Thick walls, courtyard entries, gravel drives, and wind-exposed mesa lots change packing and staging. Summer heat above 5,000 feet still spikes outdoor labor; winter freezes and wind events rewrite outdoor windows.',
      },
      {
        title: 'Not Santa Fe, Rio Rancho, or an AZ/TX desert clone',
        detail:
          'This is Albuquerque’s Bernalillo County. Capital-city historic access, Sandoval growth suburbs, Phoenix heat-only playbooks, and El Paso border patterns use different access rules and corridors — survey each Bernalillo address on its own terms.',
      },
      {
        title: 'Intrastate NMDOT TRB household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within New Mexico by for-hire household goods carriers generally fall under the New Mexico Department of Transportation Transportation Regulation Bureau (NMDOT TRB) household goods / motor carrier framework. Match the legal name on the estimate to NMDOT TRB authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not substitute TX, AZ, CO PUC, UT, or NJ credentials for New Mexico intrastate work.',
      },
    ],
  },
  zonesHeading: 'Bernalillo County access zones',
  zonesIntro:
    'Plan by Downtown / midtown multi-unit, Northeast Heights, North & South Valley, and Westside / mesa belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'abq-downtown-nob-hill-unm',
      name: 'Downtown, Nob Hill, UNM & midtown multi-unit',
      shortName: 'Core / midtown',
      neighborhoods: [
        'Downtown Albuquerque',
        'Nob Hill',
        'UNM-adjacent multi-unit',
        'Central Avenue corridor',
        'Barelas edges',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'Stairs, long carries, and tight alley approaches',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'albuquerque',
        'downtown albuquerque',
        'nob hill',
        'unm',
        'central avenue',
        'barelas',
      ],
    },
    {
      id: 'northeast-heights',
      name: 'Northeast Heights & Far Heights corridors',
      shortName: 'NE Heights',
      neighborhoods: [
        'Northeast Heights',
        'Far Northeast Heights',
        'Uptown edges',
        'Academy / Montgomery corridors',
        'Sandia foothills edges',
      ],
      housingTypes: 'Established SFH, two-stories, some multi-family and HOA pockets',
      challenges: [
        'Foothills pitch and limited truck turnaround on edge lots',
        'I-25 / I-40 peak congestion toward core',
        'Tree canopy, stairs, and long carries on hillside edges',
      ],
      moverTips:
        'Survey driveway pitch and staging length. Build I-25 and I-40 buffers for cross-zone pairs. Confirm HOA rules where applicable.',
      cityKeywords: [
        'northeast heights',
        'far northeast heights',
        'uptown albuquerque',
        'academy',
        'montgomery',
        'sandia foothills',
      ],
    },
    {
      id: 'north-south-valley',
      name: 'North Valley, South Valley & Rio Grande corridor',
      shortName: 'Valleys',
      neighborhoods: [
        'North Valley',
        'Los Ranchos edges',
        'South Valley',
        'South Broadway edges',
        'Rio Grande corridor approaches',
      ],
      housingTypes: 'Adobe compounds, ranch SFH, mixed older and multi-family stock',
      challenges: [
        'Acequia / ditch-adjacent soft shoulders and long carries',
        'Courtyard and compound entries that limit truck proximity',
        'Different access skill set than Heights garage-friendly jobs',
      ],
      moverTips:
        'Photo gate width, courtyard depth, and ground condition. Price valley–Heights pairs portal-to-portal. Clarify multi-family lease-turn timing.',
      cityKeywords: [
        'north valley',
        'south valley',
        'los ranchos',
        'south broadway',
        'rio grande',
      ],
    },
    {
      id: 'westside-mesa',
      name: 'Westside, mesa & NM-500 approaches',
      shortName: 'Westside',
      neighborhoods: [
        'Westside Albuquerque',
        'Volcano Cliffs edges',
        'Coors Boulevard corridor',
        'NM-500 / Rio Bravo approaches',
        'mesa growth tracts',
      ],
      housingTypes: 'Newer SFH, multi-family, HOA growth stock',
      challenges: [
        'Wind-exposed mesa staging and long portal time to core',
        'I-40 / Coors peak congestion',
        'Mix of HOA packets and unfinished-edge access',
      ],
      moverTips:
        'Price Westside–Heights and Westside–Downtown pairs honestly. Collect HOA packets on newer tracts. Avoid peak I-40 windows when flexible.',
      cityKeywords: [
        'westside albuquerque',
        'volcano cliffs',
        'coors boulevard',
        'rio bravo',
        'mesa del sol edges',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bernalillo County moving costs',
    intro:
      'Heights vs valley access, core multi-unit friction, high-desert conditions, and I-25 / I-40 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Valley long carries & compound entries',
        detail: 'Acequia edges, courtyards, and soft shoulders spike labor hours.',
      },
      {
        title: 'Downtown / Nob Hill elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-25 / I-40 / NM-500 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Cross-zone empty miles (Heights–Westside–Valley)',
        detail: 'Map-short pairs still bill regional time across the metro grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,650+',
        note: 'Higher with elevators or valley long carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,200+',
        note: 'Core and compound friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-metro',
        value: '$2,500–$8,500+',
        note: 'Long carries and multi-interstate pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Bernalillo County',
    intro:
      'Summer family peaks, multi-family lease turns, balloon-festival and event weekends, high-desert heat, wind, and monsoon afternoons reshape Albuquerque windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-25 / I-40 pain before peak heat and traffic.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Heights and Westside Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown, Nob Hill, and UNM-adjacent elevators fill first.',
      },
      {
        title: 'High-desert heat, wind & monsoon storms',
        detail: 'Plan outdoor staging shade, wind protection, and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'albuquerque-heights-valley-interstate-crossroads',
      title: 'Albuquerque heights–valley & I-25 / I-40 crossroads module',
      intro:
        'Bernalillo estimates fail when valley compound access, core building packets, or I-25/I-40 empty miles are ignored — and when crews treat this as Santa Fe, Rio Rancho, or an AZ/TX desert clone.',
      bullets: [
        'Request Downtown / Nob Hill / UNM building packets early.',
        'Photo driveway pitch, courtyard depth, and ground condition on valley and foothills jobs.',
        'Price I-25 / I-40 / NM-500 pairs portal-to-portal.',
        'Clarify Bernalillo vs Sandoval or Santa Fe destinations on multi-county estimates.',
        'Verify NMDOT TRB household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bernalillo County?',
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
              'Albuquerque Public Schools dominate most addresses, with charter and private options citywide. Confirm zoning carefully — attendance lines shift block by block across Heights, Valley, and Westside.',
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
              'UNM Hospital, Presbyterian, Lovelace, and other campuses anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Westside and South Valley edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs Heights SFH vs valley adobe vs Westside growth',
            detail:
              'Downtown lofts, Northeast Heights two-stories, North Valley compounds, and Westside tracts price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Foothills-edge renovated stock often prices differently from South Valley multi-family or Westside newer tracts.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Nob Hill lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Heights pattern',
            detail: 'Established SFH and foothills-edge logistics near I-25 / I-40.',
          },
          {
            title: 'Valley and Westside pattern',
            detail: 'More space, adobe character, or growth stock with different commute math to core jobs.',
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
              'Healthcare, UNM and education, national labs and federal contractors, professional services, logistics, and film/tech pockets shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, I-40, and NM-500 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Albuquerque metro identity',
            detail:
              'Bernalillo is Albuquerque core — not Santa Fe capital product, not Rio Rancho alone, and not an AZ or TX desert clone.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'High-desert elevation, strong sun, wind, monsoon afternoons, cold winter nights. Plan outdoor staging contingency and hydration for crews.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bernalillo County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Bernalillo County, New Mexico — official site',
        href: 'https://www.bernco.gov/',
        external: true,
      },
      {
        label: 'City of Albuquerque — official site',
        href: 'https://www.cabq.gov/',
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
    'Prefer heights–valley access and core multi-unit experience with honest I-25 / I-40 / NM-500 pricing. Verify NMDOT TRB HHG authority in-state and FMCSA interstate. This is Bernalillo County NM (Albuquerque) — not Santa Fe, Rio Rancho, AZ, or TX.',
  lastReviewed: '2026-07-24',
});
