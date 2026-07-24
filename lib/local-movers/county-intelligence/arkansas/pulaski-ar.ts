import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Pulaski County, AR — Little Rock capital metro core (not NWA Benton/Washington, not OK rename).
 */
export const pulaskiCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'pulaski',
  hubTitle: 'Pulaski County Moving Intelligence Hub',
  eyebrow:
    'Pulaski · Little Rock AR capital metro · I-30 · I-40 · I-430 · I-630 · US-67/167',
  h1: 'Moving in Pulaski County: Little Rock Neighborhoods, River-City Access & West LR Suburb Logistics',
  heroOpener:
    'Pulaski County, Arkansas is Little Rock capital metro — river-city core, west Little Rock growth, North Little Rock and Maumelle belts — not a Northwest Arkansas Bentonville/Rogers rename, not Washington County Fayetteville product, and not an Oklahoma City or Tulsa template. Heights and Hillcrest hillside approaches, downtown and River Market multi-unit, west LR HOA tracts, Sherwood and Jacksonville corridor stock, and I-30 / I-40 / I-430 / I-630 freeflow rewrite “local” estimates. A Capitol Avenue elevator job, a Chenal long-driveway two-story, a North Little Rock walk-up, and a Maumelle cul-de-sac do not share truck access or empty-mile risk. This hub is for people moving in Pulaski County, Arkansas — Little Rock market realities, not a renamed NWA or out-of-state page.',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-30 · I-40 · I-430 · I-630 · US-67/167 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Pulaski County different',
    intro:
      'These are Little Rock capital-metro realities — river bridges, hillside neighborhoods, west-suburb HOAs, and multi-interstate timing — not NWA corporate-growth defaults or a generic Arkansas template.',
    bullets: [
      {
        title: 'Heights, Hillcrest, and hillside stock rewrite labor hours',
        detail:
          'Steep approaches, tight turnarounds, long carries, and tree-canopy lots dominate established Little Rock neighborhoods. Flat-suburb optimism underprices these jobs — survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Downtown, River Market, and midtown multi-unit differ from west SFH',
        detail:
          'Elevators, COI packets, scarce curb staging, and stair-heavy product dominate core jobs. A River Market loft is not a Chenal garage-friendly two-story.',
      },
      {
        title: 'I-30, I-40, I-430, I-630, and US-67/167 define portal-to-portal time',
        detail:
          'West LR ↔ downtown, North Little Rock ↔ Maumelle, or Sherwood ↔ Capitol pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'West Little Rock and outer belts are not core product',
        detail:
          'Chenal, West Markham corridors, Maumelle, and Sherwood mix HOA packets, newer tracts, and different curb rules than Heights walk-ups or downtown elevators.',
      },
      {
        title: 'Not NWA Benton/Washington and not an Oklahoma rename',
        detail:
          'This is Pulaski County, Arkansas — Little Rock capital metro. Bentonville HOA growth, Fayetteville university cycles, and OKC/Tulsa river-city templates use different access rules and corridors — survey each Pulaski address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Pulaski County access zones',
  zonesIntro:
    'Plan by Little Rock core / River Market, Heights–Hillcrest hillside belts, west LR growth, and North Little Rock / outer corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'lr-core-river-market',
      name: 'Little Rock core, River Market & downtown midtown',
      shortName: 'Core / River Market',
      neighborhoods: [
        'Downtown Little Rock',
        'River Market',
        'Capitol / MacArthur Park edges',
        'SOMA edges',
        'Arkansas River bridge approaches',
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
        'little rock',
        'downtown little rock',
        'river market',
        'soma',
        'capitol avenue',
      ],
    },
    {
      id: 'heights-hillcrest-midtown',
      name: 'Heights, Hillcrest & established midtown hillside',
      shortName: 'Heights / Hillcrest',
      neighborhoods: [
        'The Heights',
        'Hillcrest',
        'Stifft Station edges',
        'Midtown character grids',
        'Cantrell corridor approaches',
      ],
      housingTypes: 'Established SFH, hillside lots, some multi-family and carriage-house stock',
      challenges: [
        'Hillside driveways and limited truck turnaround',
        'Cantrell / Kavanaugh peak congestion',
        'Tree canopy, stairs, and long carries on older lots',
      ],
      moverTips:
        'Survey driveway pitch and staging length. Build Cantrell buffers for cross-zone pairs. Confirm stair width on older stock.',
      cityKeywords: [
        'the heights',
        'hillcrest',
        'stifft station',
        'cantrell',
        'kavanaugh',
      ],
    },
    {
      id: 'west-lr-chenal-maumelle',
      name: 'West Little Rock, Chenal & Maumelle growth belts',
      shortName: 'West LR / Maumelle',
      neighborhoods: [
        'West Little Rock / Chenal',
        'Pleasant Valley edges',
        'Maumelle',
        'I-430 west approaches',
        'West Markham corridor edges',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-430 / I-630 congestion toward core',
        'Longer portal time on west–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price west–core pairs portal-to-portal. Avoid peak I-430 / I-630 windows when flexible.',
      cityKeywords: [
        'west little rock',
        'chenal',
        'maumelle',
        'pleasant valley',
        'west markham',
      ],
    },
    {
      id: 'nlr-sherwood-jacksonville',
      name: 'North Little Rock, Sherwood & US-67/167 corridors',
      shortName: 'NLR / Sherwood',
      neighborhoods: [
        'North Little Rock',
        'Argenta edges',
        'Sherwood',
        'Jacksonville edges',
        'US-67/167 corridor approaches',
      ],
      housingTypes: 'Mixed older SFH, multi-family, and growth-corridor stock',
      challenges: [
        'River-bridge freeflow into LR core',
        'US-67/167 peak congestion',
        'Mix of older stair product and newer tract access',
      ],
      moverTips:
        'Price NLR–LR pairs with bridge buffers. Survey multi-family lease-turn timing. Clarify curb rules on older NLR streets.',
      cityKeywords: [
        'north little rock',
        'sherwood',
        'jacksonville',
        'argenta',
        'us-67',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pulaski County moving costs',
    intro:
      'Hillside access, core multi-unit friction, and multi-interstate portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Heights / Hillcrest long carries',
        detail: 'Pitch, turnaround limits, and carry distance spike labor hours.',
      },
      {
        title: 'Downtown / River Market elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-30 / I-40 / I-430 / I-630 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Cross-zone empty miles (west–core and NLR–LR)',
        detail: 'Map-short pairs still bill regional time across the metro grid.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,650+',
        note: 'Higher with elevators or hillside carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'Core and hillside friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-metro',
        value: '$2,500–$8,200+',
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
    title: 'When to schedule a move in Pulaski County',
    intro:
      'Summer family peaks, multi-family lease turns, Capitol-area event weekends, and humid storm afternoons reshape Little Rock windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-630 / Cantrell pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book west LR and Heights Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and River Market elevators fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'little-rock-pulaski-river-city-interstate-grid',
      title: 'Little Rock river-city & interstate-grid module',
      intro:
        'Pulaski AR estimates fail when hillside access, core building packets, or I-30/I-40/I-430/I-630 empty miles are ignored — and when crews treat this as an NWA Bentonville or Oklahoma rename page.',
      bullets: [
        'Request downtown/River Market building packets early.',
        'Photo driveway pitch, turnaround, and stair access on Heights/Hillcrest jobs.',
        'Price I-30 / I-40 / I-430 / I-630 / US-67/167 pairs portal-to-portal.',
        'Clarify Pulaski vs Saline or Faulkner destinations on multi-county estimates.',
        'Verify ArDOT Intrastate Authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pulaski County?',
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
              'Little Rock School District, North Little Rock, Pulaski County Special, Maumelle, Jacksonville North Pulaski, and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Arkansas Department of Education data beat ranking screenshots.',
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
              'UAMS Medical Center, Baptist Health, CHI St. Vincent, Arkansas Children’s, and other campuses anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west LR, Maumelle, and Sherwood into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs hillside SFH vs west growth stock',
            detail:
              'River Market lofts, Heights two-stories, and Chenal/Maumelle product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'West LR renovated and new-build stock often prices differently from NLR multi-family or older midtown product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / River Market lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Heights / Hillcrest pattern',
            detail: 'Established SFH and hillside logistics near Cantrell corridors.',
          },
          {
            title: 'West LR and outer corridor pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'State government, healthcare and UAMS, finance, professional services, logistics, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-30, I-40, I-430, I-630, and US-67/167 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Little Rock capital-metro identity',
            detail:
              'Pulaski is Arkansas capital metro — not NWA corporate-growth product alone, and not an Oklahoma river-city rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, mild winters with occasional ice. Plan outdoor staging contingency.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pulaski County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Pulaski County, Arkansas — official site',
        href: 'https://www.pulaskicounty.net/',
        external: true,
      },
      {
        label: 'City of Little Rock — official site',
        href: 'https://www.littlerock.gov/',
        external: true,
      },
      {
        label: 'ArDOT traffic & road conditions',
        href: 'https://www.ardot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer hillside access and core multi-unit experience with honest I-30 / I-40 / I-430 / I-630 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Pulaski County AR (Little Rock) — not NWA or OK.',
  lastReviewed: '2026-07-24',
});
