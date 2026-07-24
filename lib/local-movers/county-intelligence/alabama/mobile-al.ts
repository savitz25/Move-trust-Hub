import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeAlPack } from '@/lib/local-movers/county-intelligence/alabama/al-shared';

/**
 * Mobile County, AL — port city / Gulf Coast metro core (not Baldwin beach rename).
 */
export const mobileCountyAlIntelligence: CountyIntelligencePack = finalizeAlPack({
  countySlug: 'mobile',
  hubTitle: 'Mobile County Moving Intelligence Hub',
  eyebrow: 'Mobile · port city AL · I-10 · I-65 · US-90 · US-98',
  h1: 'Moving in Mobile County: Port-City Access, Midtown Elevators & I-10 / I-65 Logistics',
  heroOpener:
    'Mobile County is Alabama’s port-city metro — not a Baldwin beach-tourism rename and not a generic Gulf Coast template. Historic midtown and downtown multi-unit, Spring Hill and western hillside approaches, Tillmans Corner and southern industrial-adjacent stock, and I-10 / I-65 / US-90 / US-98 freeflow rewrite “local” estimates. A downtown loft elevator job, a midtown oak-canopy long carry, a West Mobile HOA two-story, and a Bayou La Batre coastal cottage do not share truck access, humidity handling, or empty-mile risk. This hub is for people moving in Mobile County — port-city and bay logistics, not a Daphne/Gulf Shores page with Mobile labels.',
  heroCredibility:
    'APSC Motor Carrier Services household goods authority for intrastate AL moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-10 · I-65 · US-90 · US-98',
  whatMakesDifferent: {
    title: 'What makes moving in Mobile County different',
    intro:
      'These are Mobile port-city realities — bay humidity, midtown density, and I-10 / I-65 timing — not Baldwin resort calendars or inland Alabama defaults alone.',
    bullets: [
      {
        title: 'Port-city midtown and downtown multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb, oak-canopy approaches, and stair-heavy historic stock dominate core jobs. A Dauphin Street walk-up is not a West Mobile garage-friendly ranch.',
      },
      {
        title: 'I-10, I-65, US-90, and US-98 define portal-to-portal time',
        detail:
          'Midtown ↔ Tillmans Corner, Spring Hill ↔ Saraland, or Mobile ↔ Baldwin bridge pairs look local on maps and regional at peak. Price tunnel, bridge, and interstate buffers honestly.',
      },
      {
        title: 'Humidity, salt air, and storm seasons change packing risk',
        detail:
          'Open-air staging, wood furniture, electronics, and textiles need weather plans. Afternoon storms and tropical-season contingency windows are part of summer estimates, not footnotes.',
      },
      {
        title: 'Western growth and northern industrial corridors differ from midtown product',
        detail:
          'West Mobile HOA tracts, Semmes edges, and Saraland / Satsuma corridors mix newer curb rules with longer empty miles than historic midtown density.',
      },
      {
        title: 'Not Baldwin County beach product as the default',
        detail:
          'Gulf Shores vacation calendars, Fairhope cottage approaches, and Eastern Shore HOA culture are adjacent markets — not Mobile port-city defaults. Survey each Mobile address on its own terms.',
      },
      {
        title: 'Intrastate APSC household goods authority vs interstate FMCSA',
        detail:
          'Moves entirely within Alabama by for-hire household goods carriers generally require Alabama Public Service Commission (APSC) Motor Carrier Services authority under Title 37, Chapter 3 of the Code of Alabama. Match the legal name on the estimate to APSC authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Mississippi border pairs are common interstate triggers.',
      },
    ],
  },
  zonesHeading: 'Mobile County access zones',
  zonesIntro:
    'Plan by downtown / midtown, Spring Hill & West Mobile, northern I-65 corridors, and southern / bay-edge belts — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-midtown',
      name: 'Downtown Mobile, midtown & historic core',
      shortName: 'Downtown / midtown',
      neighborhoods: [
        'Downtown Mobile',
        'Midtown',
        'Dauphin Street edges',
        'Oakleigh Garden District edges',
        'Church Street East edges',
      ],
      housingTypes: 'Historic SFH, multi-unit, lofts, denser walk-ups',
      challenges: [
        'Elevators, COI, and scarce curb staging',
        'Oak canopy, stairs, and long carries',
        'Event and Mardi Gras calendar congestion',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning starts. Photo curb options and stair counts before final pricing.',
      cityKeywords: [
        'mobile',
        'downtown mobile',
        'midtown mobile',
        'dauphin street',
        'oakleigh',
      ],
    },
    {
      id: 'spring-hill-west-mobile',
      name: 'Spring Hill, West Mobile & western growth',
      shortName: 'Spring Hill / West',
      neighborhoods: [
        'Spring Hill',
        'West Mobile',
        'Cottage Hill edges',
        'Airport Boulevard corridors',
        'Semmes edges',
      ],
      housingTypes: 'Established SFH, HOA tracts, multi-family, hillside pockets',
      challenges: [
        'Airport Blvd / western arterial congestion',
        'HOA packets and driveway pitch on older lots',
        'Longer portal time into core at peak',
      ],
      moverTips:
        'Collect HOA packets on newer tracts. Build Airport Blvd and I-65 buffers for core-bound pairs. Survey canopy and driveway slope.',
      cityKeywords: [
        'spring hill',
        'west mobile',
        'cottage hill',
        'semmes',
        'airport boulevard',
      ],
    },
    {
      id: 'north-saraland-satsuma',
      name: 'Saraland, Satsuma, Prichard & northern I-65 corridors',
      shortName: 'North I-65',
      neighborhoods: [
        'Saraland',
        'Satsuma',
        'Prichard',
        'Chickasaw edges',
        'Creola edges',
      ],
      housingTypes: 'SFH, multi-family, industrial-adjacent and growth stock',
      challenges: [
        'I-65 congestion toward Mobile core',
        'Mixed older curb rules and newer tracts',
        'Industrial traffic on some corridors',
      ],
      moverTips:
        'Price north–core pairs portal-to-portal. Clarify multi-family lease-turn timing. Avoid peak I-65 windows when flexible.',
      cityKeywords: ['saraland', 'satsuma', 'prichard', 'chickasaw', 'creola'],
    },
    {
      id: 'south-tillmans-bay',
      name: 'Tillmans Corner, Theodore & southern / bay edges',
      shortName: 'South / bay',
      neighborhoods: [
        'Tillmans Corner',
        'Theodore',
        'Bayou La Batre edges',
        'Grand Bay edges',
        'I-10 southern approaches',
      ],
      housingTypes: 'SFH, multi-family, coastal and industrial-adjacent stock',
      challenges: [
        'I-10 congestion and industrial traffic',
        'Humidity, salt air, and storm staging risk',
        'Longer empty miles to midtown and West Mobile',
      ],
      moverTips:
        'Inventory outdoor gear and weather-sensitive items. Price I-10 pairs honestly. Confirm driveway and soft-ground conditions after rain.',
      cityKeywords: [
        'tillmans corner',
        'theodore',
        'bayou la batre',
        'grand bay',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Mobile County moving costs',
    intro:
      'Core multi-unit friction, humidity/storm handling, and I-10 / I-65 portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / midtown elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'I-10 / I-65 / US-90 / US-98 congestion',
        detail: 'Portal-to-portal spikes at peak, bridge, and construction windows.',
      },
      {
        title: 'Humidity, salt air & storm contingency',
        detail: 'Weather plans and protected staging add labor and materials risk.',
      },
      {
        title: 'Cross-zone empty miles (core–west–south–north)',
        detail: 'Map-short pairs still bill regional time across the bay metro.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,500+',
        note: 'Higher with elevators or historic stairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,300–$3,900+',
        note: 'Core and canopy friction trends up',
      },
      {
        label: '3–4+ BR / coastal / cross-metro',
        value: '$2,400–$7,800+',
        note: 'Storm windows and long I-10 pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Mobile County',
    intro:
      'Summer heat and humidity peaks, multi-family lease turns, Mardi Gras and festival weekends, and tropical-season risk reshape Mobile windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-10 / I-65 pain before peak heat.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book West Mobile Saturdays early; humidity staging matters.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and midtown elevators fill first.',
      },
      {
        title: 'Tropical season & afternoon storms',
        detail: 'Build weather contingency into outdoor staging and long carries.',
      },
    ],
  },
  specialized: [
    {
      id: 'mobile-port-city-i10-i65-humidity',
      title: 'Mobile port-city & I-10 / I-65 humidity module',
      intro:
        'Mobile estimates fail when midtown building packets, humidity/storm staging, or I-10/I-65 empty miles are ignored — and when crews treat this as a Baldwin beach rename.',
      bullets: [
        'Request downtown/midtown building packets early.',
        'Plan humidity and storm protection for outdoor staging.',
        'Price I-10 / I-65 / US-90 / US-98 pairs portal-to-portal.',
        'Clarify Mobile vs Baldwin destinations on multi-county estimates.',
        'Verify APSC household goods authority for in-state-only jobs and FMCSA for interstate legs (including MS border pairs).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Mobile County?',
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
              'Mobile County Public Schools and municipal systems serve different addresses across the city and northern/southern corridors. Confirm zoning carefully.',
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
              'USA Health, Infirmary Health, Providence, and other campuses serve core and corridor care. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from West Mobile and northern corridors into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Historic midtown vs West Mobile growth vs bay-edge stock',
            detail:
              'Oak-canopy walk-ups, HOA two-stories, and southern coastal-adjacent product access and price differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Spring Hill renovated stock often prices differently from northern multi-family or Tillmans Corner product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / midtown lifestyle',
            detail: 'Walkable amenities with elevator, curb, and density tradeoffs.',
          },
          {
            title: 'Spring Hill / West Mobile pattern',
            detail: 'SFH and HOA product with arterial commute math into core.',
          },
          {
            title: 'North and south corridor pattern',
            detail: 'More space, industrial adjacency in places, longer portal time to midtown jobs.',
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
              'Port and maritime logistics, aerospace/shipbuilding, healthcare, education, petrochemical, and professional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-10, I-65, Airport Blvd, and bay-bridge timing are real. Test drive peak routes between your zone and work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Port-city identity',
            detail:
              'Mobile is bay and port metro — not Baldwin Eastern Shore or Gulf Shores tourism product as the default.',
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
    title: 'Useful Mobile County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify APSC Motor Carrier Services intrastate authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Mobile County — official site',
        href: 'https://www.mobilecountyal.gov/',
        external: true,
      },
      {
        label: 'City of Mobile — official site',
        href: 'https://www.cityofmobile.org/',
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
    'Prefer midtown multi-unit and humidity/storm staging experience with honest I-10 / I-65 pricing. Verify APSC HHG authority in-state and FMCSA interstate. Not a Baldwin beach rename.',
  lastReviewed: '2026-07-24',
});
