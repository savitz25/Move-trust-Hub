import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Larimer County, CO — Fort Collins university / tech + north Front Range
 * (not Boulder constrained-city clone, not Greeley plains growth).
 */
export const larimerCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'larimer',
  hubTitle: 'Larimer County Moving Intelligence Hub',
  eyebrow: 'Larimer · Fort Collins, CSU turnover & north Front Range logistics',
  h1: 'Moving in Larimer County: Fort Collins Access, CSU Cycles & North Front Range Logistics',
  heroOpener:
    'Larimer County is Fort Collins and the northern Front Range growth ring — Colorado State University lease waves, Harmony Road tech and corporate product, Old Town curb friction, and Loveland–Windsor corridor sprawl that rewrites “local” portal time. A campus-adjacent walk-up, a south Fort Collins HOA two-story, a Loveland family SFH, and an Estes Park foothills driveway do not share truck access or crew skill. I-25, US-34, US-287, and Harmony Road corridors turn short map miles into billable hours when commute peaks and August move-in collide. This hub is for people moving in Larimer County — not a renamed Boulder constrained-city page or generic northern Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Fort Collins CSU & north Front Range corridor awareness · Curated listings',
  majorCorridors: 'I-25 · US-34 · US-287 · Harmony Road corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Larimer County different',
    intro:
      'These are Larimer and Fort Collins realities — CSU academic calendars, Harmony corridor growth, and north Front Range arterial congestion — not Boulder’s constrained Flatirons core or Weld’s Greeley energy/ag plains market.',
    bullets: [
      {
        title: 'CSU lease and academic calendars create hard spikes',
        detail:
          'August move-in, mid-year turnover, and faculty/staff appointment windows compress surveys and elevators near campus. Civilian “any Saturday” assumptions fail during peak student waves.',
      },
      {
        title: 'Old Town curb friction vs south Fort Collins HOA product is not one job',
        detail:
          'Downtown and near-campus grids need short-truck staging and stair photos; Harmony, Timberline, and south growth tracts need HOA packets and cul-de-sac geometry surveys.',
      },
      {
        title: 'I-25, US-34, US-287, and Harmony Road rewrite portal time',
        detail:
          'Fort Collins ↔ Loveland, campus ↔ Windsor edges, or Harmony ↔ I-25 pairs look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Tech, healthcare, and professional relo calendars shape mid-week demand',
        detail:
          'South Fort Collins and Harmony corridor employers create hard report dates and executive inventories that compete with Saturday family demand for crews.',
      },
      {
        title: 'Foothills and canyon-edge product needs grade surveys',
        detail:
          'West Fort Collins, Horsetooth edges, and Estes Park–bound foothills lots add driveway grade, wind, and longer empty miles that plains SFH quotes underprice.',
      },
      {
        title: 'Larimer is not Boulder and not Weld',
        detail:
          'Fort Collins university-plus-growth patterns differ from Boulder’s parking-constrained core and Greeley’s energy/ag plains expansion. Do not reuse those packs with a city rename.',
      },
      {
        title: 'Cross-county north Front Range pairs are routine',
        detail:
          'Households regularly move Larimer ↔ Weld (Windsor/Greeley), Boulder County edges, or south toward Adams. Clarify addresses so Colorado PUC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Larimer County access zones',
  zonesIntro:
    'Plan by Old Town / campus Fort Collins, south Harmony growth, Loveland core and US-34, Windsor–I-25 edges, and western foothills / Estes approaches — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'old-town-campus',
      name: 'Old Town Fort Collins, CSU campus & near-campus multifamily',
      shortName: 'Old Town / CSU',
      neighborhoods: [
        'Old Town Fort Collins',
        'CSU campus edges',
        'University-adjacent multifamily',
        'Downtown corridors',
        'Midtown walk-ups',
      ],
      housingTypes: 'Walk-ups, denser multifamily, older SFH, student and young-professional rentals',
      challenges: [
        'August lease waves and short-notice student moves',
        'Limited curb and stair-heavy product',
        'US-287 / College Avenue congestion',
      ],
      moverTips:
        'Book campus peaks weeks ahead. Photo stairs and curb options. Prefer mid-week early starts outside the first two August weekends when possible.',
      cityKeywords: [
        'fort collins',
        'old town',
        'csu',
        'colorado state',
        'campus',
        'college avenue',
      ],
    },
    {
      id: 'south-fort-collins-harmony',
      name: 'South Fort Collins, Harmony Road & Timberline growth',
      shortName: 'South FC / Harmony',
      neighborhoods: [
        'Harmony Road corridors',
        'Timberline edges',
        'Rigden Farm edges',
        'Fossil Creek edges',
        'South Fort Collins HOA tracts',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, newer multifamily',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'Harmony Road peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Build Harmony corridor buffers. Share driveway and cul-de-sac photos with the estimate.',
      cityKeywords: [
        'harmony',
        'timberline',
        'rigden',
        'fossil creek',
        'south fort collins',
      ],
    },
    {
      id: 'loveland-us34',
      name: 'Loveland core, US-34 corridors & Centerra edges',
      shortName: 'Loveland',
      neighborhoods: [
        'Downtown Loveland',
        'US-34 corridors',
        'Centerra edges',
        'North Loveland growth',
        'Lake Loveland edges',
      ],
      housingTypes: 'Established SFH, newer HOA tracts, multifamily, retail-edge product',
      challenges: [
        'US-34 and I-25 interchange congestion',
        'Mixed older curb and new-construction geometry',
        'Cross-town pairs to Fort Collins burn clock',
      ],
      moverTips:
        'Price US-34 / I-25 portal time for Fort Collins-linked pairs. Survey HOA vs older-stock access separately. Prefer early starts on retail-corridor days.',
      cityKeywords: [
        'loveland',
        'centerra',
        'us-34',
        'us 34',
        'lake loveland',
      ],
    },
    {
      id: 'windsor-i25-edges',
      name: 'Windsor edges, I-25 spine & southeast Larimer growth',
      shortName: 'Windsor / I-25',
      neighborhoods: [
        'Windsor (Larimer edges)',
        'I-25 corridor growth',
        'Southeast Fort Collins edges',
        'Timnath edges',
        'Crossroads commercial edges',
      ],
      housingTypes: 'Newer SFH, townhomes, master-planned family inventories',
      challenges: [
        'I-25 peak congestion and construction pulses',
        'Longer empty miles from Old Town staging yards',
        'HOA rules on rapid-growth tracts',
      ],
      moverTips:
        'Build I-25 buffers for any north–south pair. Confirm which side of the county line Windsor addresses sit on. Collect HOA packets early.',
      cityKeywords: [
        'windsor',
        'timnath',
        'i-25',
        'i25',
        'crossroads',
      ],
    },
    {
      id: 'west-foothills',
      name: 'West Fort Collins foothills, Horsetooth edges & canyon approaches',
      shortName: 'West foothills',
      neighborhoods: [
        'Horsetooth edges',
        'West Fort Collins foothills',
        'Overland Trail corridors',
        'Canyon-adjacent SFH',
        'Foothills acreage edges',
      ],
      housingTypes: 'Hillside SFH, larger lots, some acreage and custom homes',
      challenges: [
        'Steep driveways and limited truck turn radius',
        'Wind and winter ice on open paths',
        'Long exterior carries from street staging',
      ],
      moverTips:
        'Survey driveway grade and truck length before finalizing crew size. Prefer early starts. Build winter contingency for ice and wind.',
      cityKeywords: [
        'horsetooth',
        'overland',
        'foothills',
        'west fort collins',
        'canyon',
      ],
    },
    {
      id: 'estes-mountain-gateway',
      name: 'Estes Park gateway & western Larimer mountain approaches',
      shortName: 'Estes / west',
      neighborhoods: [
        'Estes Park',
        'US-34 Big Thompson approaches',
        'Mountain cabin and second-home edges',
        'Western Larimer rural pockets',
      ],
      housingTypes: 'Mountain SFH, cabins, vacation and second-home product, rural lots',
      challenges: [
        'Long empty miles from Fort Collins yards',
        'Weather closures and narrow approach roads',
        'Steep drives and limited staging at destination',
      ],
      moverTips:
        'Confirm road conditions and vehicle size early. Price empty miles and weather risk honestly. Prefer flexible dates outside holiday tourism peaks when possible.',
      cityKeywords: [
        'estes park',
        'estes',
        'big thompson',
        'mountain',
        'cabin',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Larimer County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. CSU soft costs, HOA friction, foothills access, and I-25 / Harmony / US-34 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'CSU lease peaks & near-campus access friction',
        detail:
          'August waves, stairs, and curb limits near Old Town raise labor and schedule risk before packing skill matters.',
      },
      {
        title: 'HOA gates, truck limits & approved hours',
        detail:
          'South Fort Collins, Timnath edges, and Loveland growth tracts add packet lead time and can force smaller trucks.',
      },
      {
        title: 'I-25 · US-34 · US-287 · Harmony Road congestion',
        detail:
          'Cross-metro and Fort Collins–Loveland pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Foothills driveways & mountain-gateway empty miles',
        detail:
          'Horsetooth grades and Estes approaches add labor and travel time that flat-rate optimism underprices.',
      },
      {
        title: 'Weather & multi-county north Front Range pairs',
        detail:
          'Snow/ice slow exterior work; Weld and Boulder County destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,900+',
        note: 'Higher with campus peaks, stairs, or peak Harmony/I-25 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,400–$4,200+',
        note: 'HOA soft costs and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / foothills / cross-zone SFH',
        value: '$2,800–$8,500+',
        note: 'Hillside access and long I-25 or Estes pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$190+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and campus peaks scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Larimer County move',
    intro:
      'CSU academic calendars, school years, summer family demand, and foothills winter weather reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce Harmony / I-25 / US-34 pain. Avoid month-end Fridays and the first two August campus weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (and August CSU move-in)',
        detail:
          'Student turnover and suburban SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends; campus-adjacent jobs may need earlier elevator and packing slots.',
      },
      {
        title: 'Winter: snow, ice, and foothills wind',
        detail:
          'November–March adds curb shrinkage, frozen walks, and canyon-approach risk. Prefer flexible dates, early starts, and contingency for salt and tarps.',
      },
      {
        title: 'Tech/corporate and healthcare report-date waves',
        detail:
          'Harmony corridor and medical-campus calendars create short-notice mid-week spikes. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'csu-campus-larimer',
      title: 'CSU campus & Old Town access module',
      intro:
        'Larimer estimates fail more often on campus lease spikes, curb limits, and stair product than on packing skill alone near Fort Collins core.',
      bullets: [
        'Book August and mid-year campus windows early; do not assume last-minute crew availability.',
        'Photo stair counts, curb options, and elevator rules for near-campus multifamily.',
        'Price US-287 / College Avenue and I-25 approach time honestly for any core-linked pair.',
        'Clarify student self-pack vs full-service scope so inventory surprises do not explode on load day.',
        'Confirm storage-in-transit options when lease gaps and report dates do not align.',
      ],
    },
    {
      id: 'north-front-range-growth',
      title: 'North Front Range growth & foothills module',
      intro:
        'A single “Fort Collins rate” collapses when south HOA product, Loveland corridors, I-25 edges, and mountain gateways diverge.',
      bullets: [
        'Survey by zone product — campus walk-up, Harmony HOA SFH, Loveland mix, or foothills lot — not by city name alone.',
        'Collect HOA packets for south Fort Collins, Timnath edges, and newer Loveland tracts.',
        'Build I-25 / US-34 / Harmony buffers for cross-town and Larimer–Weld pairs.',
        'Survey driveway grade for Horsetooth and Estes approaches; price empty miles to mountain destinations honestly.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Larimer County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, university lifestyle, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Poudre School District, Thompson School District (Loveland area), and other address-based systems cover Larimer municipalities. Neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Colorado State University shapes housing demand, traffic, and cultural life in Fort Collins. Faculty, staff, and graduate households should align leases with academic calendars.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UCHealth campuses (including Poudre Valley and Medical Center of the Rockies), Banner, and other providers anchor care across Fort Collins and Loveland. Specialty care may still pull south toward Denver metro for some services.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target neighborhood to preferred campuses — Harmony and I-25 realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus density, HOA growth & foothills lots',
            detail:
              'Expect near-campus multifamily and older SFH in Fort Collins core; Harmony and Timnath-edge planned tracts; Loveland mixed stock; and western foothills custom homes.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary from student-dense product to south growth SFH and Estes second homes. Budget for HOA dues, older-building repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Associations and apartment managers often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Larimer areas fit whom',
        bullets: [
          {
            title: 'Old Town / campus lifestyle',
            detail:
              'Suits people prioritizing walkability and university energy — with curb, stair, and August lease tradeoffs on move day.',
          },
          {
            title: 'South Fort Collins family growth',
            detail:
              'Often appeals for newer schools corridors and amenities — with HOA packets and Harmony congestion.',
          },
          {
            title: 'Loveland and US-34 value mix',
            detail:
              'Attracts households seeking somewhat lower price points than core Fort Collins — with I-25/US-34 commute realism.',
          },
          {
            title: 'Foothills and Estes gateway living',
            detail:
              'Fits buyers chasing outdoor access and quieter lots — with grade, weather, and empty-mile pricing on moves.',
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
              'CSU, tech and advanced manufacturing along Harmony corridors, healthcare systems, brewing and food production, government, and remote/hybrid professionals concentrating in Fort Collins–Loveland.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-34, US-287, and Harmony Road peaks are real. Test-drive peak routes before choosing solely on rent or purchase price — especially Fort Collins–Loveland and I-25 south pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'University town with north Front Range growth',
            detail:
              'Larimer stacks outdoor culture, brewery and bike-friendly Fort Collins identity, and rapid suburban expansion — different from Boulder’s constrained premium core or Weld’s Greeley ag/energy plains character.',
          },
          {
            title: 'Climate',
            detail:
              'Four seasons with cold snowy winters, warm summers, and foothills wind. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Old Town events, CSU sports and academics, and family sports calendars in growth tracts coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Larimer County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Larimer County — official site',
        href: 'https://www.larimer.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Fort Collins',
        href: 'https://www.fcgov.com/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'City of Loveland',
        href: 'https://www.lovgov.org/',
        external: true,
        note: 'Loveland services & info',
      },
      {
        label: 'CDOT traveler information (COtrip)',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-25 and state highway conditions before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with CSU/campus lease-wave experience for Old Town and near-campus product; HOA packet fluency for south Fort Collins and Timnath edges; honest I-25 · US-34 · US-287 · Harmony Road timing for cross-zone pairs; foothills driveway surveys for Horsetooth and Estes approaches; winter readiness November–March. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
