import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeDePack } from '@/lib/local-movers/county-intelligence/delaware/de-shared';

/**
 * New Castle County, DE — Wilmington / Newark / I-95 corridor (not Sussex beaches, not Kent Dover capital).
 */
export const newCastleCountyDeIntelligence: CountyIntelligencePack = finalizeDePack({
  countySlug: 'new-castle',
  hubTitle: 'New Castle County Moving Intelligence Hub',
  eyebrow:
    'New Castle · Wilmington DE metro · I-95 · I-495 · I-295 · US-13 · DE-1',
  h1: 'Moving in New Castle County: Wilmington Density, Newark Campus Logistics & I-95 Corridor Empty Miles',
  heroOpener:
    'New Castle County, Delaware is the state’s northern metro engine — Wilmington riverfront and downtown multi-unit, established Brandywine and North Wilmington grids, Newark university and corridor product, and I-95 / DE-1 freeflow that rewrites “local” estimates before a truck ever leaves the curb. A Christina Landing elevator job, a Trolley Square walk-up long-carry, a Newark mid-rise lease turn, and a Hockessin cul-de-sac HOA job do not share truck access, curb rules, or empty-mile risk. I-95, I-495, I-295, US-13, and DE-1 peak windows stack portal-to-portal time fast, and many New Castle jobs become interstate the moment the second address is in Pennsylvania, Maryland, or New Jersey. This hub is for people moving in New Castle County, Delaware — Wilmington–Newark market realities, not a renamed Maryland HHG page, not Philadelphia product, and not a Kent Dover or Sussex beach template.',
  heroCredibility:
    'Written estimates + insurance for intrastate DE moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-95 · I-495 · I-295 · US-13 · DE-1 · local Wilmington grid',
  whatMakesDifferent: {
    title: 'What makes moving in New Castle County different',
    intro:
      'These are northern Delaware metro realities — Wilmington density, Newark campus churn, I-95 corridor freeflow, and cross-state empty miles into PA/MD/NJ — not Dover capital product, not Rehoboth beach season, and not a Maryland or Pennsylvania regulatory template.',
    bullets: [
      {
        title: 'Wilmington downtown, riverfront, and midtown multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb staging, dock windows, and stair-heavy product dominate core jobs. A Christina Landing loft is not a Pike Creek garage-friendly two-story.',
      },
      {
        title: 'Established Brandywine and North Wilmington grids underprice flat-suburb optimism',
        detail:
          'Trolley Square, Highlands, Brandywine Hundred, and older stock bring tight curb, basement stairs, tree canopy, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Newark campus and corridor product is not Wilmington core',
        detail:
          'University of Delaware lease turns, Main Street walk-ups, and suburban corridor multi-family stack month-end demand differently from downtown elevators or Hockessin HOA tracts.',
      },
      {
        title: 'I-95, I-495, I-295, US-13, and DE-1 define portal-to-portal time',
        detail:
          'Wilmington ↔ Newark, North Wilmington ↔ Christiana, or riverfront ↔ Pike Creek pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Tri-state geography means many “local” jobs become interstate',
        detail:
          'A second address in Chester County PA, Cecil County MD, or South Jersey is common. Map-short pairs still need FMCSA authority and honest cross-state pricing — not Delaware-only assumptions.',
      },
      {
        title:
          'Delaware has no special statewide HHG certificate — written estimates + insurance in-state; FMCSA cross-state',
        detail:
          'Delaware does not issue a special statewide household-goods certificate for pure intrastate movers. For in-state New Castle jobs, insist on insurance and a written estimate before deposits. Any leg into Maryland, Pennsylvania, or New Jersey needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is explicitly not Maryland HHG registration product, not Pennsylvania PUC household-goods authority language, and not New Jersey public-mover licensing framing.',
      },
    ],
  },
  zonesHeading: 'New Castle County access zones',
  zonesIntro:
    'Plan by Wilmington downtown–riverfront multi-unit, Brandywine / North Wilmington established grids, Newark–Christiana corridor product, and western suburban HOA belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'wilmington-downtown-riverfront',
      name: 'Wilmington downtown, riverfront & midtown multi-unit',
      shortName: 'Wilmington core',
      neighborhoods: [
        'Downtown Wilmington',
        'Christina Landing / Riverfront',
        'Trolley Square edges',
        'Quaker Hill / midtown edges',
        'Market Street corridor',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'I-95 / I-495 freeflow into and out of core',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and elevator size before final pricing. Build I-95 buffers on any cross-zone pair.',
      cityKeywords: [
        'wilmington',
        'downtown wilmington',
        'christina landing',
        'trolley square',
        'riverfront',
      ],
    },
    {
      id: 'brandywine-north-wilmington',
      name: 'Brandywine Hundred, North Wilmington & established grids',
      shortName: 'Brandywine / N. Wilmington',
      neighborhoods: [
        'Brandywine Hundred',
        'North Wilmington',
        'Highlands edges',
        'Claymont edges',
        'Concord Pike corridor approaches',
      ],
      housingTypes: 'Established SFH, some multi-family and carriage-house stock',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs, long carries, and tree canopy',
        'US-202 / Concord Pike peak congestion',
      ],
      moverTips:
        'Survey stair width and staging length. Build Concord Pike buffers for cross-zone pairs. Confirm basement access on older stock.',
      cityKeywords: [
        'brandywine',
        'north wilmington',
        'claymont',
        'highlands',
        'concord pike',
      ],
    },
    {
      id: 'newark-christiana-corridor',
      name: 'Newark, Christiana & I-95 / DE-1 corridor belts',
      shortName: 'Newark / Christiana',
      neighborhoods: [
        'Newark',
        'University of Delaware campus edges',
        'Christiana / Mall corridor',
        'Bear edges',
        'I-95 / DE-1 approaches',
      ],
      housingTypes: 'Campus multi-family, corridor apartments, mixed SFH',
      challenges: [
        'Month-end and semester lease-turn pileups',
        'I-95 / DE-1 peak freeflow and retail congestion',
        'Mix of walk-up stairs and newer multi-unit elevators',
      ],
      moverTips:
        'Book campus and corridor turns early around semester boundaries. Price portal-to-portal on I-95 / DE-1 pairs. Clarify curb and elevator rules building by building.',
      cityKeywords: [
        'newark',
        'christiana',
        'bear',
        'university of delaware',
        'de-1',
      ],
    },
    {
      id: 'west-new-castle-hoa-belts',
      name: 'Hockessin, Pike Creek, Middletown edges & western HOA belts',
      shortName: 'West / HOA belts',
      neighborhoods: [
        'Hockessin',
        'Pike Creek',
        'Greenville edges',
        'Middletown growth edges',
        'Western suburban cul-de-sac product',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'Longer portal time into Wilmington core',
        'DE-1 / US-13 corridor congestion on growth pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price west–core pairs portal-to-portal. Avoid peak I-95 / DE-1 windows when flexible.',
      cityKeywords: [
        'hockessin',
        'pike creek',
        'middletown',
        'greenville',
        'pike creek valley',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives New Castle County moving costs',
    intro:
      'Core multi-unit friction, established-grid carries, campus lease turns, and I-95 / DE-1 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Wilmington elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'Brandywine / North Wilmington long carries & stairs',
        detail: 'Basements, tight curb, and carry distance spike labor hours.',
      },
      {
        title: 'I-95 / I-495 / I-295 / DE-1 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Cross-state empty miles into PA / MD / NJ',
        detail: 'Map-short pairs still bill regional time and need FMCSA legs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,050+',
        note: 'Higher with elevators or peak I-95 windows',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,550–$4,800+',
        note: 'Core and Brandywine friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro or interstate',
        value: '$2,900–$9,500+',
        note: 'Long carries and tri-state pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in New Castle County',
    intro:
      'Summer family peaks, multi-family lease turns, University of Delaware semester windows, and mid-Atlantic winter ice reshape northern Delaware schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-95 / Concord Pike pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Wilmington core and western HOA Saturdays early.',
      },
      {
        title: 'Month-end multi-family & UD semester turns',
        detail: 'Downtown elevators and Newark corridor product fill first.',
      },
      {
        title: 'Winter ice & I-95 corridor risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'wilmington-new-castle-i95-tri-state-grid',
      title: 'Wilmington metro & I-95 tri-state grid module',
      intro:
        'New Castle DE estimates fail when core building packets, Brandywine stairs, Newark lease turns, or I-95 / DE-1 empty miles are ignored — and when crews treat this as Maryland HHG product, Pennsylvania PUC framing, or a Kent/Sussex rename page.',
      bullets: [
        'Request Wilmington downtown/riverfront building packets early.',
        'Photo stair access, basement entries, and curb staging on Brandywine jobs.',
        'Price I-95 / I-495 / I-295 / US-13 / DE-1 pairs portal-to-portal.',
        'Flag any PA / MD / NJ second address as interstate with FMCSA authority.',
        'For pure in-state jobs: written estimates + insurance — Delaware has no special statewide HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to New Castle County?',
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
              'Red Clay, Brandywine, Christina, Colonial, Appoquinimink, and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block across the northern metro.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Delaware Department of Education data beat ranking screenshots. University of Delaware proximity shapes Newark demand separately from K–12 zoning.',
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
              'ChristianaCare (Christiana and Wilmington campuses), Nemours Children’s, and other northern Delaware facilities anchor core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Brandywine, Newark, and western HOA belts into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs Brandywine SFH vs western growth stock',
            detail:
              'Riverfront lofts, North Wilmington colonials, Newark corridor apartments, and Hockessin/Middletown product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Western renovated and new-build stock often prices differently from downtown multi-family or older midtown product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Wilmington downtown / riverfront lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Brandywine / North Wilmington pattern',
            detail: 'Established SFH and neighborhood logistics near Concord Pike corridors.',
          },
          {
            title: 'Newark campus and western HOA pattern',
            detail: 'University energy or more space — different commute math to core jobs.',
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
              'Finance and corporate campuses, healthcare and ChristianaCare, University of Delaware, logistics, and professional services shape employment — plus Philadelphia-region reverse commutes for some households.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-95, I-495, I-295, US-13, and DE-1 peaks are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northern Delaware metro identity',
            detail:
              'New Castle is Delaware’s population and job core — not Kent County Dover capital product, not Sussex beach season, and not a renamed Maryland or Pennsylvania page.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold winters with ice. Plan outdoor staging contingency year-round on I-95 approaches.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful New Castle County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Delaware does not issue a special statewide household-goods certificate — insist on written estimates and insurance for in-state moves, and FMCSA for any PA/MD/NJ leg before deposits.',
    items: [
      {
        label: 'New Castle County, Delaware — official site',
        href: 'https://www.newcastlede.gov/',
        external: true,
      },
      {
        label: 'City of Wilmington — official site',
        href: 'https://www.wilmingtonde.gov/',
        external: true,
      },
      {
        label: 'DelDOT — traffic & travel',
        href: 'https://deldot.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Wilmington multi-unit and Brandywine access experience with honest I-95 / DE-1 pricing. Written estimates + insurance in-state; FMCSA for interstate. This is New Castle County DE (Wilmington/Newark) — not Kent Dover, not Sussex beaches, not MD HHG or PA PUC product.',
  lastReviewed: '2026-07-24',
});
