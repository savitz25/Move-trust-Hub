import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeDePack } from '@/lib/local-movers/county-intelligence/delaware/de-shared';

/**
 * Sussex County, DE — Rehoboth / Lewes / Georgetown beach & inland (NOT Sussex County NJ or VA; not New Castle; not Kent Dover).
 */
export const sussexCountyDeIntelligence: CountyIntelligencePack = finalizeDePack({
  countySlug: 'sussex',
  hubTitle: 'Sussex County Moving Intelligence Hub',
  eyebrow:
    'Sussex · Rehoboth · Lewes · Georgetown DE · DE-1 · US-9 · US-13',
  h1: 'Moving in Sussex County: Beach-Town Density, Rehoboth–Lewes Season Logistics & DE-1 Corridor Volume',
  heroOpener:
    'Sussex County, Delaware is southern Delaware’s beach-and-inland market — Rehoboth Beach and Dewey seasonal multi-unit, Lewes historic grids, Georgetown county-seat product, inland growth belts, and DE-1 freeflow that can erase schedule optimism on a single summer Saturday — not Sussex County New Jersey (Newton/Sparta product), not Sussex County Virginia, not Wilmington I-95 density, and not Dover capital logistics. A Rehoboth boardwalk-block walk-up, a Lewes canal-side long-carry, a Georgetown SFH, and a Millsboro HOA cul-de-sac do not share truck access, curb rules, or empty-mile risk. DE-1, US-9, and US-13 freeflow rewrite “local” estimates across the grid, beach-season volume rewrites labor availability, and many Sussex jobs become interstate the moment the second address is in Maryland’s Eastern Shore or points north. This hub is for people moving in Sussex County, Delaware — beach and southern DE realities, not a renamed New Castle or Kent page, and not Sussex NJ or Sussex VA.',
  heroCredibility:
    'Written estimates + insurance for intrastate DE moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'DE-1 · US-9 · US-13 · local beach/corridor grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sussex County different',
    intro:
      'These are southern Delaware beach-and-inland realities — seasonal curb scarcity, coastal multi-unit friction, DE-1 freeflow, and Eastern Shore interstate pairs — not Wilmington metro product, not Dover capital product, and not Sussex County NJ or VA.',
    bullets: [
      {
        title: 'Rehoboth, Dewey, and coastal multi-unit rewrite labor hours',
        detail:
          'Walk-ups, elevators, scarce summer curb, HOA and condo packets, and stair-heavy coastal stock dominate beach-town jobs. A boardwalk-block condo is not a Georgetown garage-friendly ranch.',
      },
      {
        title: 'Lewes historic grids and canal-side access underprice flat-suburb optimism',
        detail:
          'Narrow streets, historic districts, long carries, and limited truck turnaround rewrite labor hours. Survey photos beat bedroom-count quotes — especially May–September.',
      },
      {
        title: 'Beach-season volume is a logistics category of its own',
        detail:
          'Summer weekends, holiday changeovers, and vacation-rental turns stack demand, congestion, and crew scarcity. Shoulder-season mid-weeks price and perform differently from July Saturdays.',
      },
      {
        title: 'DE-1, US-9, and US-13 define portal-to-portal time',
        detail:
          'Rehoboth ↔ Georgetown, Lewes ↔ Millsboro, or beach ↔ inland pairs look local on maps and regional at peak. Price honestly — empty miles and DE-1 backups stack fast.',
      },
      {
        title: 'Eastern Shore geography means many jobs become interstate into Maryland',
        detail:
          'Ocean City MD, Salisbury, and Eastern Shore second addresses are common. Map-short pairs still need FMCSA authority and honest cross-state pricing — not Delaware-only assumptions.',
      },
      {
        title:
          'Delaware has no special statewide HHG certificate — written estimates + insurance in-state; FMCSA cross-state',
        detail:
          'Delaware does not issue a special statewide household-goods certificate for pure intrastate movers. For in-state Sussex jobs, insist on insurance and a written estimate before deposits. Any leg into Maryland, Pennsylvania, or New Jersey needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is explicitly not Maryland HHG registration product, not Pennsylvania PUC household-goods authority language, and not New Jersey public-mover licensing framing. Sussex County DE is also not Sussex County NJ or Sussex County VA.',
      },
    ],
  },
  zonesHeading: 'Sussex County access zones',
  zonesIntro:
    'Plan by Rehoboth–Dewey coastal multi-unit, Lewes historic and canal grids, Georgetown county-seat and inland towns, and DE-1 / western growth belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'rehoboth-dewey-coastal',
      name: 'Rehoboth Beach, Dewey Beach & coastal multi-unit belt',
      shortName: 'Rehoboth / Dewey',
      neighborhoods: [
        'Rehoboth Beach',
        'Dewey Beach',
        'Coastal condo and walk-up stock',
        'Boardwalk-block approaches',
        'Seasonal rental multi-unit',
      ],
      housingTypes: 'Condos, walk-ups, mid-rises, denser coastal multi-unit',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce summer curb and tourist congestion',
        'Holiday changeover pileups and crew scarcity',
      ],
      moverTips:
        'Get condo and HOA packets early. Prefer mid-week shoulder-season windows when flexible. Photo curb options and elevator size before final pricing. Build DE-1 buffers every summer weekend.',
      cityKeywords: [
        'rehoboth beach',
        'dewey beach',
        'rehoboth',
        'dewey',
        'coastal de',
      ],
    },
    {
      id: 'lewes-cape-historic',
      name: 'Lewes, Cape Henlopen approaches & historic grids',
      shortName: 'Lewes / Cape',
      neighborhoods: [
        'Lewes',
        'Historic downtown Lewes',
        'Canal and waterfront edges',
        'Cape Henlopen approaches',
        'Mixed SFH and multi-unit stock',
      ],
      housingTypes: 'Historic SFH, some multi-family, waterfront and canal product',
      challenges: [
        'Narrow historic streets and limited truck turnaround',
        'Long carries, stairs, and tight curb',
        'Summer visitor traffic into Cape and ferry approaches',
      ],
      moverTips:
        'Survey staging length and stair width. Avoid peak ferry and beach weekends when flexible. Confirm HOA and historic-district rules where applicable.',
      cityKeywords: [
        'lewes',
        'cape henlopen',
        'lewes de',
        'historic lewes',
        'cape region',
      ],
    },
    {
      id: 'georgetown-millsboro-inland',
      name: 'Georgetown, Millsboro, Seaford & inland county-seat belts',
      shortName: 'Georgetown / inland',
      neighborhoods: [
        'Georgetown',
        'Millsboro',
        'Seaford edges',
        'Laurel edges',
        'Inland SFH and multi-family stock',
      ],
      housingTypes: 'Established SFH, some multi-family, county-seat mixed stock',
      challenges: [
        'US-9 / US-13 freeflow toward beach corridors',
        'Mix of older stair product and newer multi-unit',
        'Cross-zone empty miles into Rehoboth–Lewes on peak days',
      ],
      moverTips:
        'Price inland–beach pairs portal-to-portal with summer freeflow buffers. Survey older stock for stairs and curb. Clarify whether jobs stay inland or hit coastal congestion.',
      cityKeywords: [
        'georgetown',
        'millsboro',
        'seaford',
        'laurel',
        'georgetown de',
      ],
    },
    {
      id: 'de1-western-growth-belts',
      name: 'Milton, Bridgeville, western growth & DE-1 corridor belts',
      shortName: 'DE-1 / western growth',
      neighborhoods: [
        'Milton',
        'Bridgeville edges',
        'Western Sussex growth tracts',
        'DE-1 corridor multi-family',
        'HOA cul-de-sac product',
      ],
      housingTypes: 'Newer SFH, HOA tracts, corridor apartments and townhomes',
      challenges: [
        'HOA gate lists and truck-length limits',
        'DE-1 peak beach-season congestion',
        'Longer portal time into coastal towns on summer weekends',
      ],
      moverTips:
        'Collect HOA packets early. Price growth–beach pairs portal-to-portal. Prefer mid-week starts for any DE-1 coastal destination in season.',
      cityKeywords: [
        'milton',
        'bridgeville',
        'de-1',
        'western sussex',
        'milton de',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sussex County moving costs',
    intro:
      'Coastal multi-unit friction, historic-grid carries, beach-season congestion, and DE-1 / US-9 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Rehoboth / Dewey elevator & summer curb friction',
        detail: 'Building packets and scarce staging dominate coastal jobs.',
      },
      {
        title: 'Lewes historic long carries & narrow streets',
        detail: 'Stairs, tight curb, and carry distance spike labor hours.',
      },
      {
        title: 'DE-1 / US-9 / US-13 beach-season congestion',
        detail: 'Portal-to-portal spikes on summer weekends and holidays.',
      },
      {
        title: 'Inland–beach empty miles & MD interstate legs',
        detail: 'Map-short pairs still bill regional time; Eastern Shore legs need FMCSA.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$2,100+',
        note: 'Higher with coastal elevators or peak summer weekends',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,900+',
        note: 'Beach multi-unit and historic friction trends up',
      },
      {
        label: '3–4+ BR / HOA / beach-season or interstate',
        value: '$2,800–$9,800+',
        note: 'Coastal peak and DE-1 / MD pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; peak season trends higher',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Sussex County',
    intro:
      'Beach-season volume, vacation-rental changeovers, summer DE-1 freeflow, shoulder-season bargains, and mid-Atlantic winter ice reshape southern Delaware windows more than a pure inland calendar.',
    items: [
      {
        title: 'Best windows: mid-week early mornings, especially shoulder season',
        detail: 'Clear curb and reduce DE-1 / beach-town pain before peak tourist flow.',
      },
      {
        title: 'Peak beach season: Memorial Day–Labor Day (and holiday weekends)',
        detail: 'Book Rehoboth, Dewey, and Lewes jobs early; expect premium pricing and scarce curb.',
      },
      {
        title: 'Month-end multi-family & rental changeovers',
        detail: 'Coastal elevators and condo docks fill first around turn days.',
      },
      {
        title: 'Off-season opportunity & winter ice risk',
        detail: 'October–April often freer on coastal curb; still plan outdoor staging contingency December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'sussex-de-beach-season-de1-grid',
      title: 'Sussex DE beach-season & DE-1 corridor module',
      intro:
        'Sussex DE estimates fail when coastal building packets, Lewes historic access, beach-season freeflow, or inland–beach empty miles are ignored — and when crews treat this as Sussex County NJ, Sussex County VA, Wilmington New Castle product, Dover Kent product, or Maryland HHG framing.',
      bullets: [
        'Request Rehoboth/Dewey condo and HOA packets early.',
        'Photo stair access, curb staging, and truck turnaround on Lewes historic jobs.',
        'Price DE-1 / US-9 / US-13 pairs portal-to-portal — especially summer weekends.',
        'Prefer mid-week shoulder-season windows for coastal destinations when flexible.',
        'For pure in-state jobs: written estimates + insurance — Delaware has no special statewide HHG certificate; FMCSA for any MD/PA/NJ leg.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sussex County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Sussex County Delaware (Rehoboth/Lewes/Georgetown), not Sussex County NJ or VA.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Cape Henlopen, Indian River, Seaford, Laurel, Woodbridge, and other systems serve different addresses. Confirm zoning carefully — coastal vs inland lines matter for families year-round.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Delaware Department of Education data beat ranking screenshots. Do not confuse with New Jersey or Virginia district maps for other Sussex counties.',
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
              'Beebe Healthcare (Lewes and related campuses), TidalHealth / Nanticoke-area access for western Sussex, and other southern Delaware providers anchor care. Confirm networks and specialist access; some tertiary care still points north.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from beach towns, Georgetown, and western growth belts into major campuses — summer DE-1 freeflow is not the same as winter. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal multi-unit vs Lewes historic vs inland growth stock',
            detail:
              'Rehoboth condos, Lewes historic SFH, Georgetown product, and western HOA tracts price and access very differently — seasonal demand also skews coastal inventory.',
          },
          {
            title: 'Cost variation',
            detail:
              'Beach-proximate renovated and new-build stock often prices differently from inland multi-family or older county-seat product — and far differently from Sussex NJ or VA markets.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Rehoboth / Dewey coastal lifestyle',
            detail: 'Walkable beach amenities with multi-unit curb, seasonality, and density tradeoffs.',
          },
          {
            title: 'Lewes / Cape pattern',
            detail: 'Historic character and coastal access with narrower-street logistics.',
          },
          {
            title: 'Georgetown inland and western growth pattern',
            detail: 'More space, different price points, and DE-1 commute math to beach-job corridors.',
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
              'Tourism and hospitality, healthcare, county government in Georgetown, agriculture and food processing inland, retail, and remote/hybrid households with northern Delaware or Maryland ties shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'DE-1, US-9, and US-13 peaks are real — especially Memorial Day to Labor Day. Test drive peak routes between your zone and work anchors in season, not only in winter.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Southern Delaware beach-and-inland identity',
            detail:
              'Sussex is Delaware’s beach and southern growth county — Rehoboth, Lewes, Georgetown, and DE-1 corridors — not Sussex County NJ, not Sussex County VA, not Wilmington I-95 density, and not Dover capital product.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers with heavy tourist traffic, strong thunderstorms, hurricane-season coastal risk awareness, and cold winters with ice. Plan outdoor staging contingency year-round; summer freeflow is the dominant schedule risk.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sussex County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Delaware does not issue a special statewide household-goods certificate — insist on written estimates and insurance for in-state moves, and FMCSA for any MD/PA/NJ leg before deposits. This is Sussex County DE (Rehoboth/Lewes/Georgetown), not Sussex County NJ or VA.',
    items: [
      {
        label: 'Sussex County, Delaware — official site',
        href: 'https://sussexcountyde.gov/',
        external: true,
      },
      {
        label: 'City of Rehoboth Beach — official site',
        href: 'https://www.cityofrehoboth.com/',
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
    'Prefer coastal multi-unit and Lewes historic access experience with honest DE-1 / beach-season pricing. Written estimates + insurance in-state; FMCSA for interstate. This is Sussex County DE (Rehoboth/Lewes/Georgetown) — not Sussex County NJ, not Sussex County VA, not New Castle Wilmington, not Kent Dover, not MD HHG or PA PUC product.',
  lastReviewed: '2026-07-24',
});
