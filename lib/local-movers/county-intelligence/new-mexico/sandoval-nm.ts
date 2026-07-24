import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNmPack } from '@/lib/local-movers/county-intelligence/new-mexico/nm-shared';

/**
 * Sandoval County, NM — Rio Rancho growth north of ABQ (not Albuquerque rename).
 */
export const sandovalCountyNmIntelligence: CountyIntelligencePack = finalizeNmPack({
  countySlug: 'sandoval',
  hubTitle: 'Sandoval County Moving Intelligence Hub',
  eyebrow:
    'Sandoval · Rio Rancho NM growth · I-25 · US-550 · NM-528 · north ABQ metro',
  h1: 'Moving in Sandoval County: Rio Rancho Growth Suburbs, Mesa Access & US-550 / NM-528 Logistics North of Albuquerque',
  heroOpener:
    'Sandoval County, New Mexico is Rio Rancho and north Albuquerque metro growth — not an Albuquerque Heights rename, not a Santa Fe capital page, and not a generic Westside clone. Rio Rancho HOA tracts and multi-family corridors, Corrales acequia-adjacent compounds, Bernalillo town and US-550 approaches, pueblo-adjacent and rural-edge stock, and I-25 / US-550 / NM-528 freeflow rewrite “local” estimates. A garage-friendly Rio Rancho two-story, a Corrales long-carry adobe driveway, a Bernalillo midtown multi-unit pack-out, and a northern rural-edge ranch do not share truck access or empty-mile risk. This hub is for people moving in Sandoval County, New Mexico — growth-suburb and north-metro realities, not a renamed Bernalillo core page.',
  heroCredibility:
    'NMDOT TRB / New Mexico household goods framework for intrastate NM moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-25 · US-550 · NM-528 · local Rio Rancho grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sandoval County different',
    intro:
      'These are Rio Rancho growth and Sandoval north-metro realities — HOA tracts, mesa wind, Corrales valley access, and US-550 / NM-528 timing — not Albuquerque Downtown defaults or a generic New Mexico template.',
    bullets: [
      {
        title: 'Rio Rancho HOA growth stock rewrites curb and packet rules',
        detail:
          'Gate codes, parking rules, and HOA windows dominate many tracts. A garage-friendly two-story still fails if the packet and staging plan arrive late — survey access rules, not just square footage.',
      },
      {
        title: 'Corrales and valley-edge compounds differ from mesa SFH',
        detail:
          'Acequia-adjacent soft shoulders, long carries, courtyard entries, and tree canopy change labor hours versus open-mesa driveway staging in Rio Rancho growth belts.',
      },
      {
        title: 'I-25, US-550, and NM-528 define portal-to-portal time',
        detail:
          'Rio Rancho ↔ Albuquerque, Corrales ↔ Eastside pairs, or Bernalillo ↔ Journal Center jobs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Mesa wind, sun, and unfinished-edge access matter',
        detail:
          'Wind-exposed staging, gravel drives, and construction-adjacent streets on growth edges rewrite outdoor windows and truck approach plans.',
      },
      {
        title: 'Not Albuquerque Bernalillo core as the default',
        detail:
          'This is Sandoval County’s Rio Rancho and north-metro market. Downtown Nob Hill elevators, Santa Fe historic-core logistics, and pure rural northwest patterns use different access rules — survey each Sandoval address on its own terms.',
      },
      {
        title: 'Intrastate NMDOT TRB household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within New Mexico by for-hire household goods carriers generally fall under the New Mexico Department of Transportation Transportation Regulation Bureau (NMDOT TRB) household goods / motor carrier framework. Match the legal name on the estimate to NMDOT TRB authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not substitute TX, AZ, CO PUC, UT, or NJ credentials for New Mexico intrastate work.',
      },
    ],
  },
  zonesHeading: 'Sandoval County access zones',
  zonesIntro:
    'Plan by Rio Rancho core growth, northern Rio Rancho / US-550 belts, Corrales valley edge, and Bernalillo town / rural-edge corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'rio-rancho-core-growth',
      name: 'Rio Rancho core, Southern Blvd & central growth tracts',
      shortName: 'Rio Rancho core',
      neighborhoods: [
        'Central Rio Rancho',
        'Southern Boulevard corridor',
        'NM-528 multi-family edges',
        'established HOA tracts',
        'city-core employment-adjacent stock',
      ],
      housingTypes: 'SFH, HOA tracts, multi-family, townhome pockets',
      challenges: [
        'HOA packets, gate codes, and parking rules',
        'NM-528 peak congestion toward Albuquerque',
        'Mix of garage-friendly and multi-family stair product',
      ],
      moverTips:
        'Collect HOA packets early. Prefer mid-week morning windows. Photo curb staging and stair counts on multi-family jobs.',
      cityKeywords: [
        'rio rancho',
        'southern boulevard',
        'nm-528',
        'central rio rancho',
      ],
    },
    {
      id: 'rio-rancho-north-us550',
      name: 'Northern Rio Rancho, US-550 & mesa growth edges',
      shortName: 'North RR / US-550',
      neighborhoods: [
        'Northern Rio Rancho',
        'US-550 corridor',
        'mesa growth tracts',
        'unfinished-edge streets',
        'northern multi-family pockets',
      ],
      housingTypes: 'Newer SFH, HOA growth, multi-family',
      challenges: [
        'Wind-exposed mesa staging and long portal time south',
        'US-550 congestion and construction windows',
        'Soft or unfinished street approaches on growth edges',
      ],
      moverTips:
        'Price north–Albuquerque pairs portal-to-portal. Survey street condition and wind exposure. Confirm HOA rules on newer tracts.',
      cityKeywords: [
        'northern rio rancho',
        'us-550',
        'rio rancho mesa',
        'enchanted hills edges',
      ],
    },
    {
      id: 'corrales-valley-edge',
      name: 'Corrales & Rio Grande valley-edge compounds',
      shortName: 'Corrales',
      neighborhoods: [
        'Corrales',
        'Corrales Road corridor',
        'acequia-adjacent parcels',
        'valley-edge adobe compounds',
        'tree-canopy SFH',
      ],
      housingTypes: 'Adobe compounds, ranch SFH, limited multi-family',
      challenges: [
        'Long carries, courtyard entries, and soft shoulders',
        'Narrow approaches and limited truck turnaround',
        'Different access skill set than Rio Rancho HOA jobs',
      ],
      moverTips:
        'Photo gate width, driveway pitch, and ground condition. Price Corrales–Rio Rancho and Corrales–Albuquerque pairs honestly.',
      cityKeywords: ['corrales', 'corrales road', 'corrales nm'],
    },
    {
      id: 'bernalillo-town-rural-edge',
      name: 'Town of Bernalillo, I-25 edges & rural-north stock',
      shortName: 'Bernalillo town / rural',
      neighborhoods: [
        'Town of Bernalillo',
        'I-25 northern approaches',
        'rural-edge ranch stock',
        'pueblo-adjacent fringe awareness',
        'northern county fringe',
      ],
      housingTypes: 'Older SFH, ranch, mixed multi-family, rural acreage',
      challenges: [
        'Mixed curb rules and older stair product',
        'I-25 / US-550 logistics traffic',
        'Longer empty miles to Rio Rancho or Albuquerque anchors',
      ],
      moverTips:
        'Survey driveway condition carefully. Clarify multi-family lease-turn timing. Price town–metro pairs portal-to-portal.',
      cityKeywords: [
        'bernalillo nm',
        'town of bernalillo',
        'sandoval rural',
        'i-25 sandoval',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sandoval County moving costs',
    intro:
      'HOA packet friction, Corrales long carries, mesa wind staging, and I-25 / US-550 / NM-528 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'HOA gates, packets & multi-family curb rules',
        detail: 'Access delays and building packets dominate growth-tract jobs.',
      },
      {
        title: 'Corrales compound & valley long carries',
        detail: 'Courtyards, soft shoulders, and limited proximity spike labor hours.',
      },
      {
        title: 'I-25 / US-550 / NM-528 congestion',
        detail: 'Portal-to-portal spikes at peak toward Albuquerque anchors.',
      },
      {
        title: 'Cross-zone empty miles (RR–Corrales–ABQ)',
        detail: 'Map-short pairs still bill regional time across the north metro grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with multi-family or Corrales carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,000+',
        note: 'HOA and valley friction trends up',
      },
      {
        label: '3–4+ BR / compound / cross-metro',
        value: '$2,400–$8,000+',
        note: 'Long carries and ABQ-bound pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Sandoval County',
    intro:
      'Summer family peaks, multi-family lease turns, high-desert heat and wind, and Albuquerque-bound commute congestion reshape Rio Rancho windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear HOA curb rules and reduce NM-528 / I-25 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Rio Rancho Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'NM-528 corridor elevators and parking rules fill first.',
      },
      {
        title: 'High-desert heat, wind & monsoon afternoons',
        detail: 'Plan outdoor staging shade, wind protection, and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'rio-rancho-growth-corrales-access-module',
      title: 'Rio Rancho growth & Corrales access module',
      intro:
        'Sandoval estimates fail when HOA packets, Corrales compound access, or I-25/US-550/NM-528 empty miles are ignored — and when crews treat this as an Albuquerque core rename.',
      bullets: [
        'Request HOA and multi-family packets early on Rio Rancho jobs.',
        'Photo driveway pitch, courtyard depth, and ground condition on Corrales jobs.',
        'Price I-25 / US-550 / NM-528 pairs portal-to-portal — especially Sandoval ↔ Bernalillo County.',
        'Clarify Sandoval vs Bernalillo destinations on multi-county estimates.',
        'Verify NMDOT TRB household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sandoval County?',
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
              'Rio Rancho Public Schools serve most city addresses; Corrales, Bernalillo, and other systems cover additional Sandoval communities. Confirm zoning carefully — lines shift across growth and valley-edge addresses.',
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
              'Local Rio Rancho and Sandoval campuses plus Albuquerque systems (Presbyterian, Lovelace, UNM) anchor care for many households. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from northern Rio Rancho and Corrales into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA growth SFH vs multi-family vs Corrales adobe vs rural edge',
            detail:
              'Rio Rancho tracts, NM-528 apartments, Corrales compounds, and Bernalillo town product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Newer mesa growth often prices differently from valley-edge character stock or town-center older product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Rio Rancho growth lifestyle',
            detail: 'Space, schools, and HOA amenities with commute tradeoffs to Albuquerque jobs.',
          },
          {
            title: 'Corrales pattern',
            detail: 'Valley character and compound living with access logistics tradeoffs.',
          },
          {
            title: 'Bernalillo town / rural pattern',
            detail: 'Smaller-town and fringe space with longer portal time to metro anchors.',
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
              'Local retail and services, healthcare, government, and heavy Albuquerque-bound professional, healthcare, and lab employment shape patterns.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-550, and NM-528 peaks toward Albuquerque are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'North ABQ metro identity',
            detail:
              'Sandoval is Rio Rancho growth and north-metro product — not Albuquerque Downtown alone, and not Santa Fe capital defaults.',
          },
          {
            title: 'Climate & elevation',
            detail:
              'High-desert sun, wind, monsoon afternoons, cold winter nights. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sandoval County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NMDOT TRB household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sandoval County, New Mexico — official site',
        href: 'https://www.sandovalcountynm.gov/',
        external: true,
      },
      {
        label: 'City of Rio Rancho — official site',
        href: 'https://www.rrnm.gov/',
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
    'Prefer Rio Rancho HOA fluency and Corrales compound access with honest I-25 / US-550 / NM-528 pricing. Verify NMDOT TRB HHG authority in-state and FMCSA interstate. This is Sandoval County NM — not an Albuquerque rename.',
  lastReviewed: '2026-07-24',
});
