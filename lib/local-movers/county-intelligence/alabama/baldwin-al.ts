import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Baldwin County, AL — Eastern Shore / Gulf beach growth (not Mobile port rename).
 */
export const baldwinCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'baldwin',
  hubTitle: 'Baldwin County Moving Intelligence Hub',
  eyebrow: 'Baldwin · Daphne / Fairhope / Gulf Shores AL · I-10 · US-98 · US-90 · AL-59',
  h1: 'Moving in Baldwin County: Eastern Shore Access, Beach Corridors & I-10 / AL-59 Logistics',
  heroOpener:
    'Baldwin County is Eastern Shore and Gulf beach growth — not a Mobile port-city rename and not a generic coastal template. Daphne and Spanish Fort multi-family belts, Fairhope cottage and HOA approaches, Gulf Shores and Orange Beach vacation-product logistics, and I-10 / US-98 / US-90 / AL-59 freeflow rewrite “local” estimates. A Fairhope stair-heavy bungalow, a Daphne HOA two-story, a Gulf Shores condo elevator job, and a Foley inland ranch do not share truck access, humidity handling, or empty-mile risk. This hub is for people moving in Baldwin County — shore and beach realities, not a Mobile midtown page with Baldwin labels.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · US-98 · US-90 · AL-59',
  whatMakesDifferent: {
    title: 'What makes moving in Baldwin County different',
    intro:
      'These are Baldwin Eastern Shore and beach-corridor realities — tourism calendars, condo elevators, and long north–south empty miles — not Mobile port-city midtown defaults alone.',
    bullets: [
      {
        title: 'Eastern Shore and beach markets are different jobs on one county map',
        detail:
          'Daphne/Spanish Fort multi-family, Fairhope cottage density, and Gulf Shores/Orange Beach condo product do not share curb rules, elevator packets, or seasonal traffic. Survey the actual zone — not “Baldwin average.”',
      },
      {
        title: 'I-10, US-98, US-90, and AL-59 define portal-to-portal time',
        detail:
          'Daphne ↔ Gulf Shores, Fairhope ↔ Foley, or Baldwin ↔ Mobile bay-bridge pairs look local on maps and regional at peak. AL-59 beach traffic turns short miles into billable hours in summer.',
      },
      {
        title: 'Humidity, salt air, and storm seasons change packing risk',
        detail:
          'Open-air staging, wood furniture, electronics, outdoor gear, and textiles need weather plans. Tropical-season contingency windows are part of beach-corridor estimates, not footnotes.',
      },
      {
        title: 'Vacation and short-term rental product rewrites condo logistics',
        detail:
          'Gulf Shores and Orange Beach elevators, HOA/condo packets, parking decks, and turnover calendars dominate south-county jobs in ways Fairhope SFH never faces.',
      },
      {
        title: 'Not Mobile County port product as the default',
        detail:
          'Mobile midtown elevators, industrial south corridors, and I-65 northern belts are an adjacent market. Baldwin is Eastern Shore growth plus beach tourism logistics — keep Mobile pairs priced as multi-county reality.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Florida border pairs are common interstate triggers.',
      },
    ],
  },
  zonesHeading: 'Baldwin County access zones',
  zonesIntro:
    'Plan by Daphne / Spanish Fort, Fairhope / Eastern Shore, Foley / inland growth, and Gulf Shores / Orange Beach corridors — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'daphne-spanish-fort',
      name: 'Daphne, Spanish Fort & northern Eastern Shore',
      shortName: 'Daphne / Spanish Fort',
      neighborhoods: [
        'Daphne',
        'Spanish Fort',
        'Malbis edges',
        'I-10 / US-98 northern approaches',
        'Eastern Shore multi-family belts',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, growth tracts',
      challenges: [
        'HOA packets and multi-family elevator rules',
        'I-10 / US-98 / bay-bridge congestion toward Mobile',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Price Daphne–Mobile and Daphne–beach pairs portal-to-portal. Prefer mid-week starts for multi-family turns.',
      cityKeywords: [
        'daphne',
        'spanish fort',
        'malbis',
        'eastern shore',
      ],
    },
    {
      id: 'fairhope-point-clear',
      name: 'Fairhope, Point Clear & central Eastern Shore',
      shortName: 'Fairhope / Point Clear',
      neighborhoods: [
        'Fairhope',
        'Point Clear',
        'Montrose edges',
        'US-98 Fairhope corridors',
        'Fly Creek edges',
      ],
      housingTypes: 'Historic cottages, renovated SFH, HOA pockets, denser near-core stock',
      challenges: [
        'Stairs, tight curb, and canopy approaches on older stock',
        'US-98 congestion and visitor traffic',
        'Long carries on elevated or hillside-adjacent lots',
      ],
      moverTips:
        'Photo curb options, stair counts, and driveway pitch. Prefer early weekday starts in peak visitor season. Inventory outdoor furniture carefully.',
      cityKeywords: [
        'fairhope',
        'point clear',
        'montrose',
        'fly creek',
      ],
    },
    {
      id: 'foley-inland',
      name: 'Foley, Robertsdale & inland growth corridors',
      shortName: 'Foley / inland',
      neighborhoods: [
        'Foley',
        'Robertsdale',
        'Summerdale edges',
        'Elberta edges',
        'US-98 / AL-59 inland approaches',
      ],
      housingTypes: 'SFH, multi-family, HOA growth, larger-lot edges',
      challenges: [
        'AL-59 beach-bound traffic spillover in summer',
        'Mix of HOA rules and older driveway access',
        'Longer empty miles north to Eastern Shore or south to beaches',
      ],
      moverTips:
        'Build AL-59 summer buffers. Collect HOA packets on newer tracts. Price Foley–Gulf Shores and Foley–Daphne pairs honestly.',
      cityKeywords: [
        'foley',
        'robertsdale',
        'summerdale',
        'elberta',
      ],
    },
    {
      id: 'gulf-shores-orange-beach',
      name: 'Gulf Shores, Orange Beach & beach condo corridors',
      shortName: 'Gulf Shores / Orange Beach',
      neighborhoods: [
        'Gulf Shores',
        'Orange Beach',
        'Fort Morgan edges',
        'Perdido Key approach edges',
        'AL-59 / beach highway corridors',
      ],
      housingTypes: 'Condo towers, vacation multi-unit, coastal SFH, elevated product',
      challenges: [
        'Condo elevators, HOA packets, and parking-deck limits',
        'Peak tourist traffic and short-term rental turnovers',
        'Humidity, salt air, and storm staging risk',
      ],
      moverTips:
        'Request condo packets and elevator reservations early. Avoid peak Saturday beach traffic when flexible. Plan weather protection for outdoor staging and coastal inventory.',
      cityKeywords: [
        'gulf shores',
        'orange beach',
        'fort morgan',
        'perdido',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Baldwin County moving costs',
    intro:
      'Condo elevator friction, tourism calendars, humidity/storm handling, and long AL-59 / I-10 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Beach condo elevators & HOA packets',
        detail: 'Gulf Shores / Orange Beach building rules dominate south-county labor hours.',
      },
      {
        title: 'I-10 / US-98 / US-90 / AL-59 congestion',
        detail: 'Portal-to-portal spikes at peak beach and bay-bridge windows.',
      },
      {
        title: 'Humidity, salt air & storm contingency',
        detail: 'Weather plans and protected staging add labor and materials risk.',
      },
      {
        title: 'North–south empty miles (Eastern Shore ↔ beach)',
        detail: 'Map-short county pairs still bill regional time on AL-59 in summer.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with condo elevators',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,200+',
        note: 'Beach towers and Fairhope stairs trend up',
      },
      {
        label: '3–4+ BR / condo tower / cross-county',
        value: '$2,500–$8,500+',
        note: 'Peak tourist windows and long AL-59 pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Baldwin County',
    intro:
      'Beach tourist peaks, summer family moves, multi-family lease turns, and tropical-season risk reshape Baldwin windows more than inland Alabama alone.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce AL-59 / bay-bridge pain before beach traffic.',
      },
      {
        title: 'Peak tourist & family season: late May–mid-August',
        detail: 'Book beach condo and Eastern Shore Saturdays early; avoid peak tourist Saturdays when flexible.',
      },
      {
        title: 'Month-end multi-family & rental turnovers',
        detail: 'Daphne elevators and beach condo freight windows fill first.',
      },
      {
        title: 'Tropical season & afternoon storms',
        detail: 'Build weather contingency into outdoor staging and coastal inventory handling.',
      },
    ],
  },
  specialized: [
    {
      id: 'baldwin-eastern-shore-beach-al59',
      title: 'Baldwin Eastern Shore & beach AL-59 module',
      intro:
        'Baldwin estimates fail when condo packets, humidity/storm staging, or AL-59/I-10 empty miles are ignored — and when crews treat this as a Mobile port rename.',
      bullets: [
        'Request Gulf Shores / Orange Beach condo packets and elevator reservations early.',
        'Photo Fairhope curb, stairs, and canopy access on cottage stock.',
        'Price I-10 / US-98 / US-90 / AL-59 pairs portal-to-portal — especially shore ↔ beach.',
        'Clarify Baldwin vs Mobile destinations on multi-county estimates.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs (including FL border pairs).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Baldwin County?',
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
              'Baldwin County Public Schools and local systems serve Eastern Shore, inland, and beach communities. Confirm zoning carefully — growth edges shift with new tracts.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Alabama State Department of Education data beat ranking screenshots.',
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
              'Thomas Hospital, South Baldwin Regional, and Mobile-metro campuses serve different ends of the county. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from beach corridors and inland growth into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Eastern Shore SFH vs beach condo vs inland growth',
            detail:
              'Fairhope cottages, Gulf Shores towers, and Foley HOA product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Water-adjacent and school-zone demand often pressure Eastern Shore and beach micro-markets more than inland corridors.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Daphne / Spanish Fort pattern',
            detail: 'Growth multi-family and HOA product with bay-bridge commute options to Mobile.',
          },
          {
            title: 'Fairhope / Point Clear pattern',
            detail: 'Shore lifestyle with cottage density, curb limits, and visitor-season traffic.',
          },
          {
            title: 'Gulf Shores / Orange Beach pattern',
            detail: 'Beach and condo living with tourism calendars and elevator logistics.',
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
              'Tourism and hospitality, healthcare, retail/logistics, education, and Mobile-metro employers shape employment across a long county.',
          },
          {
            title: 'Commute realism',
            detail:
              'AL-59, US-98, I-10, and bay-bridge peaks are real. Test drive peak routes — especially shore ↔ beach or Baldwin ↔ Mobile pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Eastern Shore & beach identity',
            detail:
              'Baldwin is shore and Gulf beach growth — not Mobile port-city midtown product as the default.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, mild winters, and tropical-season risk. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Baldwin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Baldwin County, Alabama — official site',
        href: 'https://baldwincountyal.gov/',
        external: true,
      },
      {
        label: 'City of Fairhope — official site',
        href: 'https://www.fairhopeal.gov/',
        external: true,
      },
      {
        label: 'ALDOT traffic & road conditions',
        href: 'https://www.dot.state.al.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Eastern Shore HOA and beach condo experience with honest AL-59 / I-10 pricing. Verify APSC HHG authority in-state and FMCSA interstate. Not a Mobile port rename.',
  lastReviewed: '2026-07-24',
});
