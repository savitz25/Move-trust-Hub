import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Madison County, AL — Huntsville aerospace / North Alabama growth (not Birmingham clone).
 */
export const madisonCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'madison',
  hubTitle: 'Madison County Moving Intelligence Hub',
  eyebrow: 'Madison · Huntsville aerospace AL · I-565 · I-65 · US-72 · US-231',
  h1: 'Moving in Madison County: Huntsville Neighborhoods, Research Park Access & I-565 Logistics',
  heroOpener:
    'Madison County is North Alabama’s aerospace and research hub — not a Birmingham Over-the-Mountain clone and not a generic rocket-city marketing page. Downtown and midtown Huntsville multi-unit, Jones Valley and Monte Sano hillside approaches, Madison and Research Park growth belts, and I-565 / I-65 / US-72 / US-231 freeflow rewrite “local” estimates. A downtown loft elevator job, a Monte Sano long-carry driveway, a Madison HOA two-story, and a New Market larger-lot approach do not share truck access or empty-mile risk. This hub is for people moving in Madison County — Huntsville metro realities, not a renamed Jefferson or Montgomery page.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-565 · I-65 · US-72 · US-231',
  whatMakesDifferent: {
    title: 'What makes moving in Madison County different',
    intro:
      'These are Huntsville aerospace-metro realities — rapid growth belts, Research Park commute timing, and hillside pockets — not Birmingham core defaults or capital-city Montgomery patterns.',
    bullets: [
      {
        title: 'Aerospace and Research Park growth compress calendars',
        detail:
          'Contractor waves, transfer seasons, and lease turns near Redstone, Cummings Research Park, and major employers create clustered demand that generic Alabama calendars miss. Book peak windows early.',
      },
      {
        title: 'Downtown / midtown multi-unit differs from Madison and Jones Valley SFH',
        detail:
          'Elevators, COI packets, and scarce curb dominate core jobs. A downtown loft is not a Madison garage-friendly two-story or a Hampton Cove HOA approach.',
      },
      {
        title: 'I-565, I-65, US-72, and US-231 define portal-to-portal time',
        detail:
          'Madison ↔ downtown, Jones Valley ↔ Research Park, or Huntsville ↔ Decatur-edge pairs look local on maps and regional at peak. Price I-565 honestly — empty miles stack fast.',
      },
      {
        title: 'Hillside and Monte Sano approaches rewrite labor hours',
        detail:
          'Mountain-edge driveways mean pitch, tight turnarounds, long carries, and canopy risk that flat Research Park optimism underprices. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Not Birmingham or Montgomery product as the default',
        detail:
          'Jefferson hillside grids and capital-city corridors use different access rules. Madison County is Huntsville aerospace growth with its own multi-county pairs into Limestone and Morgan.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Tennessee border pairs are common interstate triggers.',
      },
    ],
  },
  zonesHeading: 'Madison County access zones',
  zonesIntro:
    'Plan by Huntsville core / midtown, Madison & Research Park growth, Jones Valley / southeast, and northern / Monte Sano edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'huntsville-core-midtown',
      name: 'Downtown Huntsville, midtown & near-core multi-unit',
      shortName: 'Core / midtown',
      neighborhoods: [
        'Downtown Huntsville',
        'Midtown',
        'Five Points edges',
        'Twickenham edges',
        'Medical District edges',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'Stairs and long carries on historic stock',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'huntsville',
        'downtown huntsville',
        'midtown huntsville',
        'five points huntsville',
        'twickenham',
      ],
    },
    {
      id: 'madison-research-park',
      name: 'City of Madison, Research Park & western growth',
      shortName: 'Madison / Research Park',
      neighborhoods: [
        'Madison',
        'Cummings Research Park edges',
        'Bridge Street / Town Madison edges',
        'County Line Road corridors',
        'Triana edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, multi-family, newer tracts',
      challenges: [
        'HOA gate lists, COI, and truck-length limits',
        'I-565 / US-72 peak congestion',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Price I-565 and US-72 pairs honestly. Book peak Saturdays 2–4 weeks ahead during transfer seasons.',
      cityKeywords: [
        'madison alabama',
        'madison al',
        'research park',
        'town madison',
        'triana',
      ],
    },
    {
      id: 'jones-valley-southeast',
      name: 'Jones Valley, Hampton Cove & southeast corridors',
      shortName: 'Jones Valley / SE',
      neighborhoods: [
        'Jones Valley',
        'Hampton Cove',
        'Southeast Huntsville',
        'US-431 / SE corridors',
        'Gurley edges',
      ],
      housingTypes: 'HOA SFH, larger lots, multi-family pockets',
      challenges: [
        'Longer portal time into Research Park and core',
        'HOA rules and driveway length on larger lots',
        'US-431 / SE arterial congestion at peak',
      ],
      moverTips:
        'Survey long driveways and gate access. Build SE-to-I-565 buffers. Clarify HOA packets on Hampton Cove and similar tracts.',
      cityKeywords: [
        'jones valley',
        'hampton cove',
        'southeast huntsville',
        'gurley',
      ],
    },
    {
      id: 'north-monte-sano',
      name: 'Monte Sano, northern corridors & rural-edge stock',
      shortName: 'Monte Sano / north',
      neighborhoods: [
        'Monte Sano',
        'Northern Huntsville',
        'Meridianville edges',
        'Hazel Green edges',
        'New Market edges',
      ],
      housingTypes: 'Hillside SFH, larger-lot rural-edge, some multi-family',
      challenges: [
        'Mountain-edge pitch, turnaround limits, and long carries',
        'Soft-ground and canopy risk after rain',
        'Longer empty miles to Research Park and Madison',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Confirm weather contingency on hillside jobs. Price north–west pairs portal-to-portal.',
      cityKeywords: [
        'monte sano',
        'meridianville',
        'hazel green',
        'new market',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Madison County moving costs',
    intro:
      'Growth-belt HOA friction, hillside access, and I-565 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-565 / I-65 / US-72 / US-231 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'HOA packets on Madison & southeast growth tracts',
        detail: 'Gate lists, COI, and truck limits add pre-move labor.',
      },
      {
        title: 'Monte Sano / hillside long carries',
        detail: 'Pitch and carry distance spike labor hours beyond bedroom count.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,550+',
        note: 'Higher with elevators or hillside carries',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'HOA growth and core friction trends up',
      },
      {
        label: '3–4+ BR / hillside / cross-metro',
        value: '$2,500–$8,200+',
        note: 'Mountain-edge and long I-565 pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Madison County',
    intro:
      'Summer family peaks, aerospace transfer seasons, multi-family lease turns, and humid storm afternoons reshape Huntsville windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-565 pain before Research Park peaks.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Madison and Jones Valley Saturdays early.',
      },
      {
        title: 'Contractor / transfer clustering',
        detail: 'Aerospace and federal-adjacent moves stack demand beyond school calendars alone.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency on hillside jobs.',
      },
    ],
  },
  specialized: [
    {
      id: 'huntsville-madison-aerospace-i565',
      title: 'Huntsville aerospace & I-565 growth module',
      intro:
        'Madison County estimates fail when HOA packets, Monte Sano access, or I-565 empty miles are ignored — and when crews treat this as a Birmingham or Montgomery clone.',
      bullets: [
        'Request downtown/midtown building packets early.',
        'Collect Madison and southeast HOA packets with the inventory survey.',
        'Photo driveway pitch and turnaround on Monte Sano / hillside jobs.',
        'Price I-565 / US-72 / US-231 pairs portal-to-portal.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs (including TN border pairs).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Madison County?',
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
              'Huntsville City Schools, Madison City Schools, Madison County Schools, and other systems serve different addresses. Confirm zoning carefully — city vs county lines matter.',
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
              'Huntsville Hospital System, Crestwood, and other campuses serve core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Madison, Jones Valley, and northern edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs Madison HOA growth vs hillside stock',
            detail:
              'Downtown lofts, master-planned two-stories, and Monte Sano product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Aerospace-driven demand and limited inventory in popular zones can pressure pricing — survey micro-markets, not county averages alone.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / midtown lifestyle',
            detail: 'Walkable amenities with elevator and curb tradeoffs.',
          },
          {
            title: 'Madison / Research Park pattern',
            detail: 'HOA growth product with I-565 commute math to major employers.',
          },
          {
            title: 'Jones Valley / Monte Sano pattern',
            detail: 'More space or hillside character with longer portal time to some job centers.',
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
              'Aerospace, defense, Redstone-adjacent contractors, research and tech, healthcare, and education shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-565, US-72, and US-231 peaks are real. Test drive peak routes between your zone and Research Park / Redstone corridors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Huntsville metro identity',
            detail:
              'Madison County is aerospace and research growth — not Birmingham Over-the-Mountain product or capital-city Montgomery as the default.',
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
    title: 'Useful Madison County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Madison County, Alabama — official site',
        href: 'https://www.madisoncountyal.gov/',
        external: true,
      },
      {
        label: 'City of Huntsville — official site',
        href: 'https://www.huntsvilleal.gov/',
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
    'Prefer HOA growth and hillside access experience with honest I-565 / US-72 pricing. Verify APSC HHG authority in-state and FMCSA interstate. Huntsville aerospace market — not Birmingham or Montgomery clone.',
  lastReviewed: '2026-07-24',
});
