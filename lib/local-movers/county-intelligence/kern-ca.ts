import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Kern County — California Tier 2 (Bakersfield independent mid-metro).
 * Secondary-market contract vs LA County Tier 1 — not Fresno clone, not LA north.
 */
export const kernCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'kern',
  hubTitle: 'Kern County Moving Intelligence Hub',
  eyebrow: 'Kern County · Bakersfield independent mid-metro',
  h1: 'Moving in Kern County: Bakersfield Independent Mid-Metro, Heat & Oil-Ag Logistics',
  heroOpener:
    'Kern County is a Bakersfield-anchored independent mid-metro on the southern San Joaquin Valley floor — not Los Angeles County’s northern collar, and not a Fresno template with different city names. Greater Bakersfield (southwest growth, northwest/Rosedale, older core) sits under 100°F+ heat with oil, ag, and industrial last-mile patterns; north-valley towns (Delano, Shafter, Wasco) and mountain/desert edges (Tehachapi, Ridgecrest, Lake Isabella) add empty miles LA basin crews never price. Compared with LA County, CA-99 / CA-58 / I-5 freeflow and industrial-edge access replace 405 gridlock and coastal density — with heat and long deadhead as the real premiums. This guide is for people moving in Kern County as its own secondary market.',
  heroCredibility:
    'Bakersfield independent mid-metro · BHGS intrastate · FMCSA when interstate · Secondary-market role vs LA · Curated listings',
  majorCorridors: 'CA-99 · CA-58 · I-5 · CA-178 · CA-119',
  parentCompare: {
    parentLabel: 'Los Angeles County',
    parentHref: '/local-movers/california/los-angeles',
    title: 'Compared with Los Angeles County',
    intro:
      'Kern is a freestanding southern-valley mid-metro with mountain and high-desert edges. LA County is the dense coastal parent contrast — not a parent commute collar and not a source of interchangeable rate cards.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'LA County logistics live on basin freeways (I-405, I-5, I-10, I-110) with multi-hour cross-county pairs. Kern pairs ride CA-99 (valley spine), CA-58 (Tehachapi / desert edge), I-5 (west side), CA-178, and CA-119 — freer mid-day than the basin, but Bakersfield ↔ Delano or Bakersfield ↔ Tehachapi still burn portal-to-portal time and empty miles LA “local” cards understate.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'LA mixes coastal multifamily, hillside, and dense HOA suburbs. Kern’s ladder is greater Bakersfield SFH and multi-unit, northwest/southwest growth tracts, small north-valley towns, then Tehachapi mountain stock and Ridgecrest high-desert homes — more industrial-adjacent and elevation-edge product, less elevator-and-permit coastal density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Most Kern household volume stages on driveways and suburban streets, not LA curb-permit wars. HOAs appear in newer southwest/northwest Bakersfield villages — real but not basin-scale. Mountain grades, desert wind, canyon approaches, and oil/ag gates replace coastal street width and hillside crane jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Bakersfield quotes often sit below LA basin rates for simple suburban access. Premiums come from heat-compressed windows, long-local town pairs, mountain/desert empty miles, and industrial-edge inventory — not coastal scarcity pricing.',
      },
      {
        title: 'Role difference',
        detail:
          'Bakersfield is an independent employment and housing market (energy, ag, logistics, healthcare, education) with outlying towns and edges that are logistics products of their own — not an Antelope Valley–style LA spillover script and not a Fresno clone.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Kern County different',
    intro:
      'Southern-valley mid-metro realities — heat, oil/ag industrial patterns, and metro-to-mountain/desert distance — that LA or Fresno scripts do not capture the same way.',
    bullets: [
      {
        title: 'Bakersfield metro is not the whole county',
        detail:
          'Most volume sits in greater Bakersfield; Delano/Shafter, Tehachapi, Ridgecrest, and Lake Isabella are different logistics products. “Kern County local” without both cities and corridor assumptions is too vague.',
      },
      {
        title: 'Valley heat compresses productive hours',
        detail:
          'June–September afternoons on the floor frequently top 100°F+. Prefer 6–10 a.m. starts, shaded staging, and heat-safe packing. Mountain and high-desert legs can still run hot and windy.',
      },
      {
        title: 'Oil, ag & industrial last-mile is normal',
        detail:
          'Households tied to field, plant, and warehouse schedules; longer approaches; workshops and sheds. Note industrial adjacency so crews build freight-traffic buffer — this is Kern’s signature, not Fresno’s Clovis HOA story alone.',
      },
      {
        title: 'Mountain & desert empty miles change the rate card',
        detail:
          'Tehachapi wind and grades, Isabella canyon approaches, and Ridgecrest deadhead from metro staging are not valley-floor cul-de-sac jobs. Price distance and access explicitly.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Kern County zones: Bakersfield metro, valley towns & edges',
  zonesIntro:
    'Four sharp products — metro Bakersfield, growth corridors, north-valley towns, and mountain/desert edges. Heat, corridor, and empty miles define the job more than generic Valley advice.',
  zones: [
    {
      id: 'greater-bakersfield',
      name: 'Greater Bakersfield Metro',
      shortName: 'Greater Bako',
      neighborhoods: [
        'Downtown / central Bakersfield',
        'East Bakersfield',
        'Southwest / Stockdale corridor',
        'Northwest / Rosedale / Oildale edge',
        'College-area and multi-unit pockets',
      ],
      housingTypes:
        'Older SFH and multi-unit core stock, suburban planned tracts, townhomes, industrial-adjacent residential edges',
      challenges: [
        'Core multi-unit long carries vs growth-tract driveway staging',
        'HOA COI/hours in newer SW/NW villages',
        'CA-99 / 58 / 178 approaches at peak',
        'Peak heat on asphalt with limited shade',
      ],
      moverTips:
        'Split core multi-unit rules from SW/NW HOA packets. Early summer starts beat heat and school traffic. Clarify SW ↔ NW or core ↔ growth pairs for honest arterial time. Inventory stairs and parking on denser blocks.',
      cityKeywords: [
        'bakersfield',
        'downtown bakersfield',
        'east bakersfield',
        'southwest bakersfield',
        'stockdale',
        'rosedale',
        'oildale',
        'northwest bakersfield',
      ],
    },
    {
      id: 'nw-sw-growth',
      name: 'Northwest & Southwest Growth Corridors',
      shortName: 'NW / SW growth',
      neighborhoods: [
        'Southwest Bakersfield growth',
        'Seven Oaks edge',
        'Northwest growth tracts',
        'Calloway / Coffee corridors',
        'Ming / Panama corridors',
      ],
      housingTypes:
        'Suburban SFH, master-planned and HOA villages, larger family inventories, some ranch-style lots',
      challenges: [
        'HOA approved hours and COI requirements',
        'High family-move volume on summer weekends',
        'Cross-metro travel at peak heat',
        'Longer suburban distances between growth edges',
      ],
      moverTips:
        'Send HOA packets with the estimate when applicable. Mid-week early starts protect crews. Inventory carefully — family SFH volume often runs higher than core condos. Build heat and arterial buffer into cross-metro pairs.',
      cityKeywords: [
        'seven oaks',
        'panama',
        'ming',
        'calloway',
        'coffee road',
        'sw bakersfield',
        'nw bakersfield',
      ],
    },
    {
      id: 'north-valley-towns',
      name: 'North Valley Towns (Delano, Shafter, Wasco & corridor)',
      shortName: 'North valley towns',
      neighborhoods: [
        'Delano',
        'Wasco',
        'Shafter',
        'McFarland',
        'Hwy 99 north corridor communities',
      ],
      housingTypes:
        'Small-city and town SFH, multi-family, ag-edge homes, working-community stock',
      challenges: [
        'CA-99 freight and commute congestion north of Bakersfield',
        'Longer portal-to-portal time from metro staging',
        'Agricultural seasonal traffic',
        'Heat + limited shaded staging',
      ],
      moverTips:
        'Treat town-to-Bakersfield pairs as long locals with honest portal-to-portal time. Share ag-edge driveway and gate details. Prefer early starts; harvest-season road activity can add mid-day buffer needs.',
      cityKeywords: [
        'delano',
        'wasco',
        'shafter',
        'mcfarland',
        'buttonwillow',
        'lost hills',
      ],
    },
    {
      id: 'mountain-desert-edges',
      name: 'Mountain & Desert Edges (Tehachapi, Ridgecrest, Isabella)',
      shortName: 'Mountain / desert',
      neighborhoods: [
        'Tehachapi',
        'Golden Hills / Stallion Springs edge',
        'Ridgecrest',
        'Lake Isabella / Kernville edge',
        'Taft / west-side oil towns edge',
      ],
      housingTypes:
        'Mountain-town SFH, large-lot foothill homes, high-desert SFH, lake/cabin stock, oil/ag-edge properties',
      challenges: [
        'Elevation, grades, and wind on Tehachapi Pass (CA-58)',
        'Long empty miles and sparse services (Ridgecrest, remote edges)',
        'Canyon/lake approaches and limited turnaround',
        'Weather that can differ sharply from valley-floor heat',
      ],
      moverTips:
        'Share driveway, road-width, grade, and turnaround photos before booking. Ask about wind/pass reschedule policies. Price empty miles explicitly — these are rarely quick locals from metro Bakersfield. Confirm truck length limits on constrained roads.',
      cityKeywords: [
        'tehachapi',
        'golden hills',
        'stallion springs',
        'ridgecrest',
        'lake isabella',
        'kernville',
        'taft',
        'california city',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Kern County',
    intro:
      'Same square footage prices differently by heat window, metro vs mountain/desert distance, industrial-edge access, and 99/58 corridor time.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Valley-floor summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Metro-to-outlying and mountain/desert empty miles',
        detail:
          'Bakersfield ↔ Delano, Bakersfield ↔ Tehachapi, or metro ↔ Ridgecrest/Isabella burn far more portal-to-portal time than map miles suggest.',
      },
      {
        title: 'Oil, ag & industrial-edge access',
        detail:
          'Longer approaches, outbuildings, workshop inventories, and freight-adjacent roads add time pure suburban surveys miss.',
      },
      {
        title: 'HOA soft costs in newer Bakersfield tracts',
        detail:
          'COI and approved hours in southwest and northwest growth villages add paperwork and can force weekday-only windows.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,800+',
        note: 'HOA soft costs and cross-metro hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / mountain / desert edge)',
        value: '$2,200–$6,000+',
        note: 'Tehachapi, Ridgecrest, and Isabella legs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & corridor intelligence',
    intro:
      'Kern peaks follow extreme valley heat, school calendars, and mountain/desert weather — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing on the valley floor. Mid-afternoon moves in peak heat are high risk. Mountain legs can still run hot and windy.',
      },
      {
        title: 'School & family calendars (metro growth)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves in southwest and northwest Bakersfield. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'Mountain / pass weather (Tehachapi & Sierra edges)',
        detail:
          'Wind on the Tehachapi corridor and cooler or wetter winter conditions near lake/mountain edges can force reschedules. Confirm weather policies for elevation jobs.',
      },
    ],
  },
  specialized: [
    {
      id: 'heat-logistics',
      title: 'Valley-floor heat logistics',
      intro:
        'Kern’s valley floor shares extreme heat with other San Joaquin markets — but oil/ag traffic and long outlying pairs make early windows even more critical.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; request shaded staging.',
        'Pack electronics and sealed goods for heat; plan water and crew rotation.',
        'Do not assume mountain or high-desert legs escape heat and wind risk.',
        'Discuss split-day options when inventory cannot finish before peak afternoon heat.',
      ],
    },
    {
      id: 'oil-ag-industrial',
      title: 'Oil, ag & industrial last-mile',
      intro:
        'Energy, agriculture, and logistics shape household timing and access in ways pure suburban LA or Clovis-growth Fresno jobs do not.',
      bullets: [
        'Note industrial, oilfield, or packing-shed adjacency for mid-day freight buffer.',
        'Inventory workshops, tools, and outbuildings separately from pure household furniture.',
        'Price portal-to-portal time for any pair that rides CA-99 north or I-5 west-side legs.',
        'Confirm whether metro ↔ north-valley pairs still use a pure local rate card.',
      ],
    },
    {
      id: 'mountain-desert-empty-miles',
      title: 'Mountain & desert empty-mile access',
      intro:
        'Tehachapi, Lake Isabella approaches, and Ridgecrest are not valley-floor suburban jobs — elevation, wind, and deadhead change truck choice and timing.',
      bullets: [
        'Share driveway, road-width, grade, and turnaround photos before booking.',
        'Ask about wind and pass-condition reschedule policies on CA-58.',
        'Confirm truck length limits on constrained canyon and rural desert roads.',
        'Budget empty-mile time from Bakersfield staging; remote legs are rarely quick locals.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kern County?',
    intro:
      'Bakersfield metro affordability, north-valley ag towns, Tehachapi mountain living, and Ridgecrest high-desert life are different bets — validate schools and healthcare by pocket first.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Large parts of metro Bakersfield use Bakersfield City School District (elementary/middle) and Kern High School District; separate systems serve Delano, Tehachapi, Ridgecrest-area (Sierra Sands), and other towns. Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Metro dual-system check',
            detail:
              'Bakersfield City / Kern High context covers much of the metro — but unincorporated and edge addresses can span feeders. Use official boundary tools and the California School Dashboard.',
          },
          {
            title: 'Town and edge districts',
            detail:
              'Delano, Wasco, Tehachapi, Sierra Sands / Ridgecrest, and others run separate systems. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'Adventist Health Bakersfield, Kern Medical, and other regional campuses serve greater Bakersfield. Map ER drive times at rush hour from southwest vs east-side neighborhoods.',
          },
          {
            title: 'Outlying coverage gaps',
            detail:
              'Tehachapi, Lake Isabella, Ridgecrest, and north-valley towns may mean longer specialty-care drives into Bakersfield. Confirm insurer networks and realistic times on 99/58.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos and heat-related schedule squeezes.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kern resources',
    intro:
      'Local official links first; directory listings are independent. Verify California BHGS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'County of Kern',
        href: 'https://www.kerncounty.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Bakersfield',
        href: 'https://www.bakersfieldcity.us/',
        external: true,
      },
      {
        label: 'City of Tehachapi',
        href: 'https://www.tehachapicityhall.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Greater Bako, NW/SW growth, North valley towns, Mountain/desert edges) when available. Confirm heat-window plans, oil/ag access notes, and mountain/desert empty miles — independent mid-metro, not LA north and not a Fresno clone.',
  lastReviewed: '2026-07-24',
});
