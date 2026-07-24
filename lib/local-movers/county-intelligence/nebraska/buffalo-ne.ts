import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Buffalo County, NE — Kearney regional / I-80 hub (not Buffalo NY, not Grand Island clone).
 */
export const buffaloCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'buffalo',
  hubTitle: 'Buffalo County Moving Intelligence Hub',
  eyebrow:
    'Buffalo · Kearney NE regional hub · I-80 · US-30 · NE-10',
  h1: 'Moving in Buffalo County: Kearney Regional Access, University Cycles & I-80 Corridor Logistics',
  heroOpener:
    'Buffalo County, Nebraska is Kearney regional hub — University of Nebraska at Kearney cycles, Platte River valley stock, established neighborhood grids, and I-80 freeflow — not Buffalo, New York, not a Grand Island Hall County clone, and not an Omaha metro rename. A downtown Kearney walk-up, a UNK-area lease turn, a south-side family ranch, and a rural-edge acreage job do not share truck access, curb rules, or empty-mile risk. I-80, US-30, and NE-10 rewrite “local” estimates across the corridor, and winter ice and wind on open approaches can erase schedule optimism overnight. This hub is for people moving in Buffalo County, Nebraska — Kearney market realities, not a renamed New York or Grand Island page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · US-30 · NE-10 · local Kearney grid',
  whatMakesDifferent: {
    title: 'What makes moving in Buffalo County different',
    intro:
      'These are central Nebraska regional-hub realities — university calendars, Platte Valley stock, corridor freeflow, and winter exposure — not Buffalo NY Great Lakes product, not Omaha river-city density, and not a Grand Island industrial clone alone.',
    bullets: [
      {
        title: 'UNK lease turns and academic calendars stack demand',
        detail:
          'University of Nebraska at Kearney move-in/move-out waves, faculty relocations, and near-campus multi-family turns create schedule pressure that pure rural SFH stock does not share. Book early around semester boundaries.',
      },
      {
        title: 'Kearney is a regional hub — not Buffalo NY and not an Omaha clone',
        detail:
          'Healthcare, education, logistics, and regional retail drive mid-week demand that Great Lakes city templates and Omaha elevator scripts do not describe. Survey each Kearney address on its own terms.',
      },
      {
        title: 'I-80, US-30, and NE-10 define portal-to-portal time',
        detail:
          'North Kearney ↔ south belts, campus ↔ I-80, or Buffalo ↔ neighboring Platte Valley pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Rural-edge and acreage jobs are not campus-grid product',
        detail:
          'Long driveways, soft shoulders, outbuildings, and limited turnaround rewrite labor hours. Flat-suburb estimates fail on farm-edge and acreage stock.',
      },
      {
        title: 'Winter logistics and open-corridor wind are real schedule risk',
        detail:
          'Ice, wind, and snow events reshape morning windows across the I-80 corridor. Build weather contingency into outdoor staging and interstate pairs — especially December–March.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Buffalo County access zones',
  zonesIntro:
    'Plan by Kearney core grids, UNK campus belts, south/west growth residential, and rural-edge I-80 corridor stock — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'kearney-core',
      name: 'Kearney core, downtown & established grids',
      shortName: 'Kearney Core',
      neighborhoods: [
        'Downtown Kearney',
        'Established mid-grid neighborhoods',
        'Central Avenue corridor edges',
        'Older multi-family belts',
        'Hospital corridor approaches',
      ],
      housingTypes: 'Older SFH, walk-ups, renovated multi-unit, denser core stock',
      challenges: [
        'Tight curb and limited truck turnaround',
        'Stairs, basements, and long carries on older stock',
        'Core arterial peak freeflow',
      ],
      moverTips:
        'Survey stair width and curb staging early. Prefer mid-week morning windows. Photo basement access before final pricing.',
      cityKeywords: [
        'kearney',
        'downtown kearney',
        'central avenue',
        'kearney nebraska',
        'buffalo county',
      ],
    },
    {
      id: 'unk-campus-belts',
      name: 'UNK campus, student multi-family & near-campus stock',
      shortName: 'UNK / Campus',
      neighborhoods: [
        'University of Nebraska at Kearney campus edges',
        'Student multi-family corridors',
        'Near-campus apartments',
        'Faculty residential edges',
        'Campus approach arterials',
      ],
      housingTypes: 'Multi-family, student apartments, some established SFH',
      challenges: [
        'Semester lease-turn stacking and tight curb',
        'Stairs, long carries, and limited truck turnaround',
        'Campus event freeflow',
      ],
      moverTips:
        'Book around semester boundaries early. Survey stair width and staging length. Avoid event-day windows when flexible.',
      cityKeywords: [
        'unk',
        'university of nebraska kearney',
        'kearney campus',
        'student apartments',
        'kearney',
      ],
    },
    {
      id: 'south-west-growth',
      name: 'South & west Kearney residential growth belts',
      shortName: 'South / West Kearney',
      neighborhoods: [
        'South Kearney growth',
        'West Kearney residential belts',
        'Newer family tracts',
        'NE-10 corridor edges',
        'School-corridor neighborhoods',
      ],
      housingTypes: 'Newer SFH, some multi-family and townhome product',
      challenges: [
        'Longer portal time into core and campus',
        'Subdivision curb rules on newer tracts',
        'NE-10 / US-30 freeflow',
      ],
      moverTips:
        'Collect subdivision rules early when present. Price growth–core pairs portal-to-portal. Prefer mid-week mornings around school calendars.',
      cityKeywords: [
        'south kearney',
        'west kearney',
        'ne-10',
        'us-30',
        'kearney growth',
      ],
    },
    {
      id: 'rural-edge-i80',
      name: 'Rural-edge Platte Valley & I-80 approaches',
      shortName: 'Rural / I-80',
      neighborhoods: [
        'Rural Buffalo County edges',
        'I-80 interchange approaches',
        'Acreage and farm-edge lots',
        'Small-community satellite stock',
        'Open-corridor approaches',
      ],
      housingTypes: 'Acreage SFH, outbuildings, farm-edge and small-town stock',
      challenges: [
        'Long driveways, soft shoulders, and limited turnaround',
        'I-80 freeflow and winter wind exposure',
        'Outbuilding and equipment staging complexity',
      ],
      moverTips:
        'Survey driveway length, soft ground, and outbuilding access. Price I-80 pairs portal-to-portal. Build winter contingency on open approaches.',
      cityKeywords: [
        'i-80',
        'buffalo county rural',
        'kearney i-80',
        'acreage',
        'us-30',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Buffalo County moving costs',
    intro:
      'Core-grid carries, campus lease turns, rural-edge access, and corridor portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Older-grid stairs & curb friction',
        detail: 'Basements and tight staging spike labor hours in core stock.',
      },
      {
        title: 'UNK semester lease-turn demand',
        detail: 'Calendar stacking spikes crew availability near campus.',
      },
      {
        title: 'I-80 / US-30 / NE-10 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Rural-edge empty miles and winter delays',
        detail: 'Acreage pairs bill regional time; ice and wind rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,480+',
        note: 'Higher with campus peaks or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,150–$3,600+',
        note: 'Core and near-campus friction trends up',
      },
      {
        label: '3–4+ BR / acreage / cross-corridor',
        value: '$2,100–$7,000+',
        note: 'Rural access and long carries highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$98–$170+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Buffalo County',
    intro:
      'Summer family peaks, UNK semester turns, multi-family lease windows, and Plains winter ice reshape Kearney schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce core arterial / US-30 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book growth-belt and core Saturdays early.',
      },
      {
        title: 'UNK move-in / move-out waves',
        detail: 'Campus multi-family elevators and curb fill first near semester starts.',
      },
      {
        title: 'Winter ice, wind & I-80 corridor risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'kearney-buffalo-regional-i80-unk',
      title: 'Kearney regional, UNK & I-80 corridor module',
      intro:
        'Buffalo NE estimates fail when core-grid stairs, UNK lease calendars, rural-edge access, or I-80/US-30/NE-10 empty miles are ignored — and when crews treat this as Buffalo NY or a Grand Island rename.',
      bullets: [
        'Plan around UNK semester move-in/move-out peaks.',
        'Photo stair access, basement entries, and curb staging on core jobs.',
        'Survey driveway length and outbuildings on rural-edge stock.',
        'Price I-80 / US-30 / NE-10 pairs portal-to-portal.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Buffalo County?',
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
              'Kearney Public Schools and surrounding Buffalo County systems serve different addresses. Confirm zoning carefully — attendance areas can shift across city and rural edges.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Nebraska Department of Education data beat ranking screenshots. UNK shapes higher-ed access for the region.',
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
              'Kearney Regional Medical Center, CHI Health Good Samaritan, and other regional campuses anchor care. Larger Omaha and Lincoln systems remain referral destinations for some specialties.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from core, campus, growth belts, and rural edges into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids vs campus multi-family vs growth SFH vs acreage',
            detail:
              'Older mid-grid product, UNK apartments, newer family tracts, and farm-edge lots price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Growth-belt new-build stock often prices differently from older core product or rural acreage.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Core / downtown pattern',
            detail: 'Shorter in-city trips with older-stock access tradeoffs.',
          },
          {
            title: 'UNK / campus pattern',
            detail: 'Campus proximity with multi-family and lease-turn logistics.',
          },
          {
            title: 'Growth and rural-edge pattern',
            detail: 'More space, longer driveways, and corridor portal time.',
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
              'University of Nebraska at Kearney, healthcare, logistics, manufacturing, education, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80, US-30, and NE-10 peaks are real. Test drive peak routes between your zone and campus or core work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Kearney regional-hub identity',
            detail:
              'Buffalo is central Nebraska’s Kearney regional hub — not Buffalo NY, and not a Grand Island industrial clone alone.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers, strong thunderstorms, and cold winters with ice and open-corridor wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Buffalo County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Buffalo County, Nebraska — official site',
        href: 'https://www.buffalogov.org/',
        external: true,
      },
      {
        label: 'City of Kearney — official site',
        href: 'https://www.cityofkearney.org/',
        external: true,
      },
      {
        label: 'Nebraska Department of Transportation — traffic',
        href: 'https://dot.nebraska.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer Kearney grid, campus-calendar, and rural-edge experience with honest I-80 / US-30 / NE-10 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Buffalo County NE (Kearney) — not Buffalo NY or a Grand Island rename.',
  lastReviewed: '2026-07-24',
});
