import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeArPack } from '@/lib/local-movers/county-intelligence/arkansas/ar-shared';

/**
 * Saline County, AR — Benton/Bryant south-metro suburbs.
 * Benton city is in Saline County — NOT Benton County (NWA Bentonville).
 */
export const salineCountyArIntelligence: CountyIntelligencePack = finalizeArPack({
  countySlug: 'saline',
  hubTitle: 'Saline County Moving Intelligence Hub',
  eyebrow:
    'Saline · Benton / Bryant AR south-metro · I-30 · US-67 · AR-5',
  h1: 'Moving in Saline County: Benton & Bryant South-Metro Suburbs, I-30 Fringe Logistics & HOA Growth',
  heroOpener:
    'Saline County, Arkansas is Benton and Bryant south Little Rock metro fringe — not Benton County Northwest Arkansas (Bentonville/Rogers), not Pulaski core Heights product, and not a pure rural rename. The city of Benton sits in Saline County; Benton County is a different NWA market entirely. Expect HOA growth tracts, established midtown Benton grids, Bryant school-corridor stock, Bauxite and Shannon Hills edges, and I-30 / US-67 / AR-5 freeflow that rewrites “local” estimates. A Benton cul-de-sac two-story, a Bryant multi-family turn, a hillside long-carry driveway, and a Shannon Hills ranch do not share truck access or empty-mile risk. This hub is for people moving in Saline County, Arkansas — south-metro Benton/Bryant realities — not Benton County NWA.',
  heroCredibility:
    'ArDOT Intrastate Authority for intrastate AR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-30 · US-67 · AR-5 · local south-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Saline County different',
    intro:
      'These are Benton/Bryant south-metro realities — HOA packets, I-30 fringe freeflow, and school-calendar peaks — not Bentonville NWA corporate defaults and not downtown Little Rock elevators alone.',
    bullets: [
      {
        title: 'Benton (city in Saline) is not Benton County NWA',
        detail:
          'Search and estimate confusion is common. Bentonville/Rogers HOA corporate product and Fayetteville university cycles are different markets. Survey Saline addresses as south LR metro fringe — not NWA.',
      },
      {
        title: 'South-metro HOA tracts rewrite simple-suburb assumptions',
        detail:
          'Gate lists, truck-length limits, dumpster rules, and narrow cul-de-sacs dominate Benton and Bryant growth product. An older midtown ranch is not a gated two-story.',
      },
      {
        title: 'I-30, US-67, and AR-5 define portal-to-portal time',
        detail:
          'Benton ↔ Bryant, Shannon Hills ↔ I-30, or Bauxite ↔ LR pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Hillside and older stock differ from new HOA grids',
        detail:
          'Pitch, long carries, limited turnaround, and tree canopy underprice flat-rate optimism on established Saline lots. Survey photos beat bedroom counts.',
      },
      {
        title: 'Not Pulaski core and not NWA Benton County',
        detail:
          'This is Saline County, Arkansas — Benton/Bryant south-metro. Little Rock Heights elevators and Bentonville campus relocations use different access rules and corridors — survey each Saline address on its own terms.',
      },
      {
        title: 'Intrastate ArDOT household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Arkansas by for-hire household goods carriers generally require ArDOT Arkansas Intrastate Operating Authority. Match the legal name on the estimate to ArDOT authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Saline County access zones',
  zonesIntro:
    'Plan by Benton core / midtown, Bryant growth corridors, Shannon Hills / east fringe, and Bauxite / west outer belts — access rules cluster by zone more than ZIP alone. Benton here means the Saline County city, not Benton County NWA.',
  zones: [
    {
      id: 'benton-core-midtown',
      name: 'Benton core, midtown & established Saline grids',
      shortName: 'Benton core',
      neighborhoods: [
        'Downtown Benton',
        'Midtown Benton grids',
        'Military Road corridor edges',
        'Established SFH neighborhoods',
        'I-30 Benton approaches',
      ],
      housingTypes: 'Established SFH, some multi-family, renovated midtown stock',
      challenges: [
        'Older stair and driveway product',
        'Scarce curb on tight midtown streets',
        'I-30 freeflow toward Little Rock at peak',
      ],
      moverTips:
        'Survey stair width and driveway condition carefully. Build I-30 buffers on Benton–LR pairs. Prefer mid-week morning windows.',
      cityKeywords: [
        'benton',
        'benton ar',
        'downtown benton',
        'military road',
        'saline county benton',
      ],
    },
    {
      id: 'bryant-growth-corridors',
      name: 'Bryant growth corridors & school-calendar HOAs',
      shortName: 'Bryant',
      neighborhoods: [
        'Bryant',
        'Reynolds Road corridor edges',
        'Newer HOA cul-de-sac grids',
        'Bryant multi-family pockets',
        'AR-5 / I-30 Bryant approaches',
      ],
      housingTypes: 'Newer SFH, HOA tracts, multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'School-calendar and summer family peaks',
        'Longer portal time on Bryant–Benton and Bryant–LR pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Bryant–core pairs portal-to-portal. Book late-May through August Saturdays early.',
      cityKeywords: [
        'bryant',
        'bryant ar',
        'reynolds road',
        'bryant hoa',
      ],
    },
    {
      id: 'shannon-hills-east-fringe',
      name: 'Shannon Hills, east fringe & LR-metro edge',
      shortName: 'Shannon Hills / east',
      neighborhoods: [
        'Shannon Hills',
        'East Saline multi-family edges',
        'I-30 east approaches',
        'LR-metro fringe tracts',
        'US-67 corridor pockets',
      ],
      housingTypes: 'Mixed SFH, multi-family, and fringe growth stock',
      challenges: [
        'I-30 / US-67 peak congestion into Pulaski',
        'Lease-turn multi-family waves',
        'Cross-county empty miles billed as “local”',
      ],
      moverTips:
        'Price Shannon Hills–LR pairs portal-to-portal. Clarify multi-family lease-turn timing. Avoid peak I-30 windows when flexible.',
      cityKeywords: [
        'shannon hills',
        'east saline',
        'i-30 saline',
        'us-67',
      ],
    },
    {
      id: 'bauxite-west-outer',
      name: 'Bauxite, west outer & rural-edge Saline',
      shortName: 'Bauxite / west',
      neighborhoods: [
        'Bauxite',
        'West outer Saline',
        'Ranch and acreage-edge stock',
        'Hillside and long-driveway lots',
        'AR-5 west approaches',
      ],
      housingTypes: 'Ranch SFH, acreage-edge lots, some growth pockets',
      challenges: [
        'Long driveway carries and limited turnaround',
        'Soft shoulders and weather-sensitive staging',
        'Longer empty miles into Benton/Bryant core',
      ],
      moverTips:
        'Photo driveway length and pitch before pricing. Confirm soft-shoulder truck options. Price west–core pairs honestly.',
      cityKeywords: [
        'bauxite',
        'bauxite ar',
        'west saline',
        'ar-5',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Saline County moving costs',
    intro:
      'HOA friction, I-30 fringe portal time, hillside carries, and cross-metro empty miles drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'South-metro HOA gate & truck-length friction',
        detail: 'Packets, staging limits, and cul-de-sac access spike labor hours.',
      },
      {
        title: 'I-30 / US-67 / AR-5 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Hillside & long-driveway carries',
        detail: 'Pitch and limited turnaround underprice flat-suburb quotes.',
      },
      {
        title: 'Cross-zone empty miles (Saline ↔ Pulaski)',
        detail: 'Map-short pairs still bill regional south-metro time.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$425–$1,550+',
        note: 'Higher with multi-family stairs or HOA limits',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$4,000+',
        note: 'HOA and I-30 friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-metro',
        value: '$2,400–$7,900+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Saline County',
    intro:
      'Summer family peaks, school-calendar weekends, HOA blackout rules, and humid storm afternoons reshape Benton/Bryant windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-30 / AR-5 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Benton and Bryant HOA Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'East fringe and Bryant multi-unit slots fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'saline-benton-bryant-south-metro',
      title: 'Benton/Bryant south-metro & I-30 fringe module',
      intro:
        'Saline AR estimates fail when HOA packets, I-30 empty miles, or Benton-city vs Benton-County confusion are ignored — and when crews treat this as Bentonville NWA or downtown Little Rock only.',
      bullets: [
        'Confirm Benton means Saline County city — not Benton County NWA — on every estimate.',
        'Collect HOA gate lists and truck-length rules on Benton/Bryant growth tracts.',
        'Price I-30 / US-67 / AR-5 pairs portal-to-portal.',
        'Photo hillside and long-driveway access on outer Saline jobs.',
        'Verify ArDOT Intrastate Authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Saline County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. Benton (city) is in Saline County; Benton County is NWA.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Benton, Bryant, Bauxite, Harmony Grove, and other systems serve different addresses. Confirm zoning carefully — growth tracts shift attendance boundaries often.',
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
              'Saline Memorial Hospital and other local facilities anchor Benton/Bryant care, with Little Rock specialty campuses reachable via I-30. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Bryant, Shannon Hills, and Bauxite into local and Little Rock campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Established Benton SFH vs Bryant HOA vs outer ranch stock',
            detail:
              'Midtown ranches, growth two-stories, and west long-driveway product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'School-corridor HOA neighborhoods often price differently from outer Bauxite stock or east multi-family product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Benton core / midtown lifestyle',
            detail: 'Established grids with older access tradeoffs and I-30 commute math.',
          },
          {
            title: 'Bryant growth pattern',
            detail: 'HOA SFH, school calendars, and south-metro freeflow.',
          },
          {
            title: 'Shannon Hills / Bauxite pattern',
            detail: 'Fringe or outer space with different empty-mile and access profiles.',
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
              'Local retail and services, healthcare, education, logistics, and Little Rock-metro reverse commutes shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-30, US-67, and AR-5 peaks are real. Test drive peak routes between your zone and work anchors in Saline and toward Pulaski County.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South-metro Benton/Bryant identity',
            detail:
              'Saline is Benton/Bryant south LR metro fringe — the city of Benton is here; Benton County NWA is a different market entirely.',
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
    title: 'Useful Saline County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ArDOT Intrastate Authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Saline County, Arkansas — official site',
        href: 'https://www.salinecounty.org/',
        external: true,
      },
      {
        label: 'City of Benton, Arkansas — official site',
        href: 'https://www.bentonar.org/',
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
    'Prefer south-metro HOA and I-30 fringe experience with honest US-67 / AR-5 pricing. Verify ArDOT Intrastate Authority in-state and FMCSA interstate. This is Saline County AR (Benton city / Bryant) — not Benton County NWA.',
  lastReviewed: '2026-07-24',
});
