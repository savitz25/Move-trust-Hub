import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Shelby County, AL — Hoover / Alabaster south-Birmingham growth (not Birmingham core clone).
 */
export const shelbyCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'shelby',
  hubTitle: 'Shelby County Moving Intelligence Hub',
  eyebrow: 'Shelby · Hoover / Alabaster growth AL · I-65 · US-280 · US-31 · AL-119',
  h1: 'Moving in Shelby County: Hoover–Alabaster Growth Access, HOA Logistics & US-280 Corridors',
  heroOpener:
    'Shelby County is south Birmingham growth — not a Birmingham Southside elevator clone, not Mountain Brook default product, and not a Jefferson core rename. Hoover multi-family and HOA two-stories, Alabaster and Pelham growth belts, Chelsea and Oak Mountain edges, and I-65 / US-280 / US-31 / AL-119 freeflow rewrite “local” estimates. A Riverchase HOA gate list, a Pelham townhome stair stack, a Chelsea larger-lot driveway, and a Columbiana county-seat bungalow do not share truck access or empty-mile risk. This hub is for people moving in Shelby County — Over the Mountain south growth realities, not a renamed downtown Birmingham page.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-65 · US-280 · US-31 · AL-119',
  whatMakesDifferent: {
    title: 'What makes moving in Shelby County different',
    intro:
      'These are Shelby south-metro growth realities — HOA density, US-280 timing, and school-calendar peaks — not Birmingham downtown elevators or generic Alabama rural defaults.',
    bullets: [
      {
        title: 'HOA growth belts dominate — not Southside elevator defaults',
        detail:
          'Hoover, Pelham, Alabaster, and Chelsea tracts often require gate lists, COI, truck-length limits, and approved hours. Collect packets early; do not price as if every job is a Jefferson loft.',
      },
      {
        title: 'I-65, US-280, US-31, and AL-119 define portal-to-portal time',
        detail:
          'Hoover ↔ Alabaster, Pelham ↔ Chelsea, or Shelby ↔ Birmingham core pairs look local on maps and regional at peak. US-280 backups turn short miles into billable hours.',
      },
      {
        title: 'Multi-family lease turns cluster differently from core loft markets',
        detail:
          'Riverchase and corridor multi-unit waves stack month-end demand with family Saturday peaks. Elevator rules still matter — but HOA curb culture is the more common friction.',
      },
      {
        title: 'Oak Mountain and larger-lot edges rewrite labor hours',
        detail:
          'Chelsea, Oak Mountain, and southern larger-lot approaches add driveway length, pitch, and soft-ground risk that flat HOA ranch optimism underprices.',
      },
      {
        title: 'Not Birmingham core product as the default',
        detail:
          'Jefferson downtown, Southside, and Red Mountain jobs use different access skill sets. Shelby is south-suburb growth with frequent multi-county pairs into Jefferson — keep jurisdiction lines clear on estimates.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
    ],
  },
  zonesHeading: 'Shelby County access zones',
  zonesIntro:
    'Plan by Hoover / Riverchase, Pelham / US-31, Alabaster / southern growth, and Chelsea / Oak Mountain edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'hoover-riverchase',
      name: 'Hoover, Riverchase & northern Shelby growth',
      shortName: 'Hoover / Riverchase',
      neighborhoods: [
        'Hoover',
        'Riverchase',
        'Bluff Park edges',
        'US-31 / I-459 approach corridors',
        'Inverness edges',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, master-planned tracts',
      challenges: [
        'HOA gate lists, COI, and truck-length limits',
        'US-31 / US-280 / I-459 peak congestion',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Prefer mid-week starts for gate-heavy tracts. Price Hoover–Birmingham core pairs portal-to-portal.',
      cityKeywords: [
        'hoover',
        'riverchase',
        'bluff park',
        'inverness',
        'hoover al',
      ],
    },
    {
      id: 'pelham-us31',
      name: 'Pelham, Helena edges & US-31 corridors',
      shortName: 'Pelham / US-31',
      neighborhoods: [
        'Pelham',
        'Helena edges',
        'US-31 corridors',
        'Oak Mountain approaches',
        'Indian Springs edges',
      ],
      housingTypes: 'HOA SFH, multi-family, mixed older and growth stock',
      challenges: [
        'US-31 congestion and school-traffic peaks',
        'Mix of HOA rules and older driveway access',
        'Longer portal time north into Hoover and Jefferson',
      ],
      moverTips:
        'Survey curb and driveway carefully on mixed-age stock. Build US-31 buffers. Clarify Helena multi-county edges when applicable.',
      cityKeywords: [
        'pelham',
        'helena',
        'indian springs',
        'oak mountain',
      ],
    },
    {
      id: 'alabaster-south',
      name: 'Alabaster, Calera edges & southern I-65 growth',
      shortName: 'Alabaster / south',
      neighborhoods: [
        'Alabaster',
        'Calera edges',
        'Saginaw edges',
        'I-65 southern corridors',
        'Wilsonville edges',
      ],
      housingTypes: 'Newer HOA SFH, multi-family, growth-edge stock',
      challenges: [
        'I-65 congestion toward Hoover and Birmingham',
        'HOA packets on newer tracts',
        'Longer empty miles on northbound pairs',
      ],
      moverTips:
        'Collect HOA packets with the inventory survey. Price Alabaster–Hoover and Alabaster–core pairs honestly. Book peak Saturdays early.',
      cityKeywords: ['alabaster', 'calera', 'saginaw', 'wilsonville'],
    },
    {
      id: 'chelsea-columbiana',
      name: 'Chelsea, Columbiana & eastern larger-lot edges',
      shortName: 'Chelsea / east',
      neighborhoods: [
        'Chelsea',
        'Columbiana',
        'Westover edges',
        'Harpersville edges',
        'AL-119 / US-280 eastern approaches',
      ],
      housingTypes: 'Larger-lot SFH, HOA pockets, county-seat and rural-edge stock',
      challenges: [
        'Long driveways, pitch, and soft-ground risk',
        'US-280 / AL-119 peak congestion',
        'Longer portal time to Hoover multi-family markets',
      ],
      moverTips:
        'Photo driveway length, pitch, and turnaround. Confirm weather contingency after rain. Price east–Hoover pairs portal-to-portal.',
      cityKeywords: [
        'chelsea',
        'columbiana',
        'westover',
        'harpersville',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Shelby County moving costs',
    intro:
      'HOA packets, multi-family turns, and US-280 / I-65 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'HOA gate lists, COI & truck limits',
        detail: 'Growth-tract rules add pre-move labor and constrain staging.',
      },
      {
        title: 'I-65 / US-280 / US-31 / AL-119 congestion',
        detail: 'Portal-to-portal spikes at peak and school-traffic windows.',
      },
      {
        title: 'Multi-family month-end clustering',
        detail: 'Riverchase and corridor elevators fill first at lease turns.',
      },
      {
        title: 'Larger-lot / Oak Mountain long carries',
        detail: 'Driveway length and pitch spike labor beyond bedroom count.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,500+',
        note: 'Higher with multi-family elevators',
      },
      {
        label: '2–3BR HOA SFH or modest multi-unit',
        value: '$1,350–$4,000+',
        note: 'HOA friction and US-280 pairs trend up',
      },
      {
        label: '3–4+ BR / larger-lot / cross-metro',
        value: '$2,500–$8,000+',
        note: 'Chelsea edges and Jefferson pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Shelby County',
    intro:
      'Summer family peaks, school-year transitions, multi-family lease turns, and humid storm afternoons reshape Shelby windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear HOA staging and reduce US-280 / I-65 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Hoover and Alabaster Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Riverchase and corridor elevators fill first.',
      },
      {
        title: 'Summer heat, humidity & afternoon storms',
        detail: 'Plan outdoor staging shade and weather contingency on larger-lot jobs.',
      },
    ],
  },
  specialized: [
    {
      id: 'shelby-hoover-alabaster-hoa-us280',
      title: 'Shelby HOA growth & US-280 module',
      intro:
        'Shelby estimates fail when HOA packets, multi-family turns, or US-280/I-65 empty miles are ignored — and when crews treat this as a Birmingham core clone.',
      bullets: [
        'Collect Hoover, Pelham, Alabaster, and Chelsea HOA packets early.',
        'Photo driveway length and pitch on Oak Mountain / larger-lot jobs.',
        'Price I-65 / US-280 / US-31 / AL-119 pairs portal-to-portal.',
        'Clarify Shelby vs Jefferson destinations on multi-county estimates.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Shelby County?',
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
              'Hoover City Schools, Shelby County Schools, Alabaster City Schools, Pelham City Schools, and other systems serve different addresses. Confirm zoning carefully — municipal lines matter.',
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
              'Shelby Baptist, Grandview, and Birmingham-metro campuses along US-280 / I-65 corridors serve residents. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Alabaster and Chelsea into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'HOA growth vs multi-family vs larger-lot edges',
            detail:
              'Hoover master-planned product, corridor multi-unit, and Chelsea larger lots price and access differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'School-zone and HOA demand often pressure popular Hoover and Pelham micro-markets more than southern or eastern edges.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Hoover / Riverchase pattern',
            detail: 'Amenities and HOA density with US-31 / US-280 commute math into Birmingham.',
          },
          {
            title: 'Pelham / Alabaster pattern',
            detail: 'Growth SFH and multi-family with I-65 portal time north.',
          },
          {
            title: 'Chelsea / larger-lot pattern',
            detail: 'More space and driveway logistics with longer empty miles to core jobs.',
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
              'Healthcare, professional services, retail and logistics corridors, and Birmingham-metro employers shape daily commute patterns.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-280, I-65, and US-31 peaks are real. Test drive peak routes between your Shelby zone and Jefferson job centers.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South-metro growth identity',
            detail:
              'Shelby is Hoover–Alabaster growth — not Birmingham Southside elevator product or a Jefferson core rename.',
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
    title: 'Useful Shelby County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Shelby County, Alabama — official site',
        href: 'https://www.shelbyal.com/',
        external: true,
      },
      {
        label: 'City of Hoover — official site',
        href: 'https://www.hooveralabama.gov/',
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
    'Prefer HOA growth and multi-family experience with honest US-280 / I-65 pricing. Verify APSC HHG authority in-state and FMCSA interstate. Shelby south-suburb growth — not Birmingham core clone.',
  lastReviewed: '2026-07-24',
});
