import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Arlington County, VA — urban NoVA peninsula (NOT Fairfax sprawl clone).
 * High-rise COI/elevator, Pentagon/Crystal City/Rosslyn, dense arterial grid.
 */
export const arlingtonCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'arlington',
  hubTitle: 'Arlington County Moving Intelligence Hub',
  eyebrow: 'Arlington · Northern Virginia · Rosslyn, Crystal City, Pentagon & high-rise grid',
  h1: 'Moving in Arlington County: High-Rise COIs, Elevator Reservations & Pentagon-Corridor Logistics',
  heroOpener:
    'Arlington County is Northern Virginia’s dense urban peninsula — not a Fairfax HOA sprawl market with a different name. Rosslyn and Courthouse towers, Crystal City and Pentagon City redevelopment stacks, Ballston–Virginia Square condo corridors, and garden-apartment ridges in North Arlington share elevators, COIs, timed docks, and tight curb more often than long suburban driveways. A 20th-floor Rosslyn unit, a Crystal City loading dock, a Clarendon walk-up, and a military PCS out of the Pentagon corridor do not share the same crew skill or schedule risk. I-395, I-66, the George Washington Memorial Parkway, VA-50, and the local arterial grid rewrite “local” estimates that ignore building management rules and peak bridge approaches into DC. This hub is for people moving in Arlington County — not a renamed Fairfax, Loudoun, or Prince William page.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods authority for intrastate moves · FMCSA for interstate · Arlington high-rise COI, elevator & Pentagon-corridor awareness · Curated listings',
  majorCorridors: 'I-395 · I-66 · GW Parkway · VA-50 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Arlington County different',
    intro:
      'These are Arlington urban-peninsula realities — elevator buildings, COI packets, and Pentagon-corridor density — not Fairfax Tysons/Reston sprawl, Loudoun planned villages, or Prince William I-95 HOA growth.',
    bullets: [
      {
        title: 'High-rise COI and elevator rules are the job',
        detail:
          'Most Rosslyn, Courthouse, Ballston, Pentagon City, and Crystal City moves require building certificates of insurance, elevator pads/reservations, and loading-dock windows. Without them, crews wait or get turned away.',
      },
      {
        title: 'Pentagon, Crystal City, and federal calendars create hard dates',
        detail:
          'Military, contractor, and agency households stack mid-week peaks, security-adjacent timing, and storage-in-transit needs that suburban Saturday-only quotes miss.',
      },
      {
        title: 'I-395, I-66, and bridge approaches turn short miles into hours',
        detail:
          'Arlington ↔ DC, Arlington ↔ Alexandria, or Rosslyn ↔ Fairfax pairs look trivial on a map and still burn 40–90+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Garden apartments and walk-ups still dominate many ridges',
        detail:
          'North Arlington and older multifamily stock bring long stair carries, limited elevator access, and street-permit friction — different from brand-new tower docks.',
      },
      {
        title: 'Street parking, meters, and HOA/condo associations control curb',
        detail:
          'Legal truck staging is scarce. Building managers and associations often dictate hours, truck length, and protection deposits. Photo curb options before load day.',
      },
      {
        title: 'Cross-river and multi-jurisdiction pairs are routine',
        detail:
          'Households regularly move Arlington ↔ DC, Maryland, Fairfax, or Alexandria. Any out-of-state leg needs FMCSA authority; pure in-Virginia jobs still need the right Virginia DMV framework.',
      },
      {
        title: 'This is not Fairfax sprawl logistics',
        detail:
          'Arlington’s density, Metro-oriented towers, and peninsula grid do not behave like Centreville driveways or Gainesville HOA villages. Zone and product type must drive the estimate.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Arlington County access zones',
  zonesIntro:
    'Plan by Rosslyn–Courthouse towers, Crystal City–Pentagon City redevelopment, Ballston–Virginia Square–Clarendon corridor, North Arlington garden/SFH ridges, and Columbia Pike / south Arlington mix — access rules cluster by building type and zone more than ZIP alone.',
  zones: [
    {
      id: 'rosslyn-courthouse',
      name: 'Rosslyn, Courthouse & Key Bridge approaches',
      shortName: 'Rosslyn / Courthouse',
      neighborhoods: [
        'Rosslyn',
        'Courthouse',
        'Radnor / Fort Myer Heights edges',
        'Key Bridge approaches',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, limited denser SFH',
      challenges: [
        'Elevator reservations, COIs, and dock slots',
        'I-66 / GW Parkway / bridge approach congestion',
        'Minimal legal curb and long interior cart distances',
      ],
      moverTips:
        'Book elevators and COIs in writing weeks ahead when possible. Prefer mid-week early starts. Photo dock height and street staging alternatives.',
      cityKeywords: ['rosslyn', 'courthouse', 'fort myer heights', 'key bridge', 'arlington'],
    },
    {
      id: 'crystal-pentagon-city',
      name: 'Crystal City, Pentagon City & National Landing',
      shortName: 'Crystal / Pentagon City',
      neighborhoods: [
        'Crystal City',
        'Pentagon City',
        'National Landing',
        'Aurora Highlands edges',
        'Pentagon corridor residential',
      ],
      housingTypes: 'High-rise condo, redevelopment multifamily, some townhomes',
      challenges: [
        'Building management rules and freight elevator competition',
        'I-395 / VA-27 approach traffic and security-adjacent constraints',
        'Military and contractor hard move dates',
      ],
      moverTips:
        'Confirm dock hours and COI naming exactly as management requires. Ask about PCS or report-to-duty dates. Avoid peak Pentagon ingress when flexible.',
      cityKeywords: [
        'crystal city',
        'pentagon city',
        'national landing',
        'aurora highlands',
        'pentagon',
      ],
    },
    {
      id: 'ballston-clarendon',
      name: 'Ballston, Virginia Square, Clarendon & Orange/Silver corridor',
      shortName: 'Ballston / Clarendon',
      neighborhoods: [
        'Ballston',
        'Virginia Square',
        'Clarendon',
        'Courthouse east edges',
        'Ashton Heights edges',
      ],
      housingTypes: 'Condo towers, mid-rise, walk-ups, denser townhomes',
      challenges: [
        'Elevator and loading rules mixed with street-only buildings',
        'VA-50 / Wilson Blvd / Clarendon night and weekend congestion',
        'Restaurant/retail curb competition evenings and weekends',
      ],
      moverTips:
        'Prefer early weekday windows over weekend restaurant peaks. Confirm whether the building has a freight elevator or only passenger with pads.',
      cityKeywords: [
        'ballston',
        'virginia square',
        'clarendon',
        'ashton heights',
        'wilson boulevard',
      ],
    },
    {
      id: 'north-arlington',
      name: 'North Arlington ridges, Cherrydale, Lyon Park & garden stock',
      shortName: 'North Arlington',
      neighborhoods: [
        'Cherrydale',
        'Lyon Village',
        'Lyon Park',
        'Waverly Hills',
        'Donaldson Run',
        'East Falls Church edges',
      ],
      housingTypes: 'Garden apartments, walk-ups, colonials, duplexes, denser SFH',
      challenges: [
        'Long stair carries and limited elevator buildings',
        'Tree-lined curb with short legal truck windows',
        'Narrow streets and resident permit parking',
      ],
      moverTips:
        'Survey stair counts and landing widths. Photo curb options. Prefer smaller trucks when street width is tight.',
      cityKeywords: [
        'cherrydale',
        'lyon village',
        'lyon park',
        'waverly hills',
        'donaldson run',
        'east falls church',
        'north arlington',
      ],
    },
    {
      id: 'columbia-pike-south',
      name: 'Columbia Pike, Pentagon South & south Arlington mix',
      shortName: 'Columbia Pike / South',
      neighborhoods: [
        'Columbia Pike corridor',
        'Pentagon South edges',
        'Douglas Park',
        'Nauck / Green Valley',
        'Shirlington edges',
      ],
      housingTypes: 'Garden multifamily, townhomes, modest SFH, redevelopment mid-rise',
      challenges: [
        'Columbia Pike peak bus and auto congestion',
        'Mix of walk-ups and newer elevator product',
        'I-395 interchanges complicating staging',
      ],
      moverTips:
        'Clarify building type carefully — walk-up vs elevator changes labor. Build I-395 buffer for Crystal City–linked pairs.',
      cityKeywords: [
        'columbia pike',
        'douglas park',
        'nauck',
        'green valley',
        'shirlington',
        'south arlington',
      ],
    },
    {
      id: 'arlington-ridge-sfh',
      name: 'Arlington Ridge, Aurora Hills & south SFH pockets',
      shortName: 'Ridge / South SFH',
      neighborhoods: [
        'Arlington Ridge',
        'Aurora Hills',
        'South SFH pockets near Pentagon views',
      ],
      housingTypes: 'SFH, duplexes, some townhomes, higher-value inventories',
      challenges: [
        'Hills, driveway grade, and limited turnaround',
        'Proximity traffic from Pentagon and I-395',
        'High-value packing expectations',
      ],
      moverTips:
        'Pre-walk driveway grade and stair paths. Inventory specialty items carefully. Prefer experienced crews for high-value homes.',
      cityKeywords: ['arlington ridge', 'aurora hills', 'south sfh', 'pentagon view'],
    },
  ],
  costDrivers: {
    title: 'What drives Arlington County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator/COI soft costs, stair labor, and I-395/I-66 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail: 'Tower product adds admin time, waiting risk, and extra labor before packing skill matters.',
      },
      {
        title: 'Stair carries in garden and walk-up stock',
        detail: 'North Arlington and older multifamily often lack freight elevators — labor hours climb fast.',
      },
      {
        title: 'I-395 / I-66 / GW Parkway / bridge congestion',
        detail: 'Cross-river and Fairfax-linked pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'Pentagon and federal hard dates',
        detail: 'PCS and report-to-duty clusters create mid-week competition and storage demand.',
      },
      {
        title: 'Street staging scarcity',
        detail: 'Meters, permits, and association rules force longer carries or off-peak premiums.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$1,800+',
        note: 'Higher with elevators, stairs, or peak bridge pairs',
      },
      {
        label: '2–3BR condo or garden unit',
        value: '$1,500–$4,500+',
        note: 'COI, dock, and stair soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-river',
        value: '$2,800–$8,000+',
        note: 'Rosslyn towers and DC-bound pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$210+/hr',
        note: 'Portal-to-portal; packing and COI admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Arlington County move',
    intro:
      'Lease cycles, federal/military calendars, humidity, and building elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear docks and reduce I-395 / I-66 pain. Avoid month-end Fridays when elevators and leases collide.',
      },
      {
        title: 'Peak season: late May–September lease churn',
        detail:
          'Condo and garden-apartment demand fills first. Book elevator slots 2–4+ weeks ahead in peak months.',
      },
      {
        title: 'PCS and federal relocation clusters',
        detail:
          'Pentagon-corridor calendars create mid-week spikes. Confirm report dates and storage-in-transit early.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity slows stair and long-cart carries. Prefer early starts; protect elevators and corridors from weather tracking.',
      },
    ],
  },
  specialized: [
    {
      id: 'arlington-highrise-coi',
      title: 'Arlington high-rise COI & elevator logistics module',
      intro:
        'Arlington estimates fail more often on missing COIs, elevator windows, and dock rules than on packing skill alone — this is not Fairfax driveway logistics.',
      bullets: [
        'Collect building COI requirements, elevator reservations, pad rules, and dock hours before the survey is final.',
        'Match truck size to dock height and street length limits; photo staging options.',
        'Price portal-to-portal time for any pair that rides I-395, I-66, the GW Parkway, VA-50, or DC bridge approaches at peak.',
        'Survey stair counts for garden apartments and walk-ups — do not assume freight elevators.',
        'Ask about PCS or report-to-duty dates for Pentagon-corridor households.',
        'Clarify Arlington vs Alexandria / Fairfax / DC addresses on every estimate.',
        'Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'pentagon-national-landing',
      title: 'Pentagon & National Landing relocation module',
      intro:
        'Crystal City / Pentagon City / National Landing moves mix redevelopment building rules with military and contractor timelines.',
      bullets: [
        'Confirm freight elevator competition with construction and other residents.',
        'Plan storage-in-transit for temporary housing between orders or lease gaps.',
        'Avoid peak base and I-395 ingress windows when schedule allows.',
        'Match inventory (uniforms, gear policies, home offices) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Arlington County?',
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
              'Arlington Public Schools (APS) is the primary public K–12 system. Assignment is address-based — marketing corridor names like Clarendon or Crystal City do not guarantee a campus.',
          },
          {
            title: 'Density and capacity',
            detail:
              'A compact county can still see enrollment pressure in growth corridors. Ask APS about capacity, options programs, and boundary tools when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'APS boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Virginia Hospital Center anchors much of Arlington care, with additional specialty and military-adjacent options in DC and Fairfax. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive or transit times from your building to preferred campuses — I-395 and local arterials change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Towers and corridors vs garden ridges',
            detail:
              'Expect high-rise and mid-rise product in Rosslyn, Ballston, Pentagon City, and Crystal City; garden apartments and denser SFH dominate many North Arlington and Columbia Pike pockets.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Rents and purchase prices vary by Metro access and building age. Budget for condo fees, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Condo and association governance',
            detail:
              'Associations control move hours, elevators, truck size, and deposits more often than any suburban HOA driveway rule set. Read documents carefully before lease signing or closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Arlington areas fit whom',
        bullets: [
          {
            title: 'Rosslyn / Courthouse urban professional',
            detail:
              'Suits people prioritizing Metro and DC bridge access — with elevator/COI logistics and tower living tradeoffs.',
          },
          {
            title: 'Crystal City / Pentagon City / National Landing',
            detail:
              'Often appeals for redevelopment amenities and Pentagon-corridor jobs — with dock rules and military calendars.',
          },
          {
            title: 'Ballston–Clarendon corridor lifestyle',
            detail:
              'Attracts households wanting dining, transit, and mid/high-rise living — with evening curb competition.',
          },
          {
            title: 'North Arlington garden and SFH ridges',
            detail:
              'Fits people seeking slightly quieter streets and more house-like product — with stairs, trees, and tighter curb.',
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
              'Federal agencies, the Pentagon and contractors, professional services, tech/redevelopment employers in National Landing, and DC-bound roles concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Transit helps on Metro corridors, but many moves still fight I-395, I-66, the GW Parkway, and VA-50 peaks. Test peak routes and building loading rules before choosing solely on rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Urban peninsula, not outer-suburb sprawl',
            detail:
              'Arlington stacks high-rise corridors, garden multifamily, and tight SFH ridges in a compact county — different from Fairfax’s employment sprawl, Loudoun’s planned villages, or Prince William’s I-95 growth belt.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters with occasional ice. Plan elevator and corridor protection as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and nightlife concentrate along Clarendon–Ballston and Crystal City; residential ridges feel quieter. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Arlington County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Arlington County — official site',
        href: 'https://www.arlingtonva.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Arlington Public Schools',
        href: 'https://www.apsva.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Arlington County parking & residential permits',
        href: 'https://www.arlingtonva.us/Government/Programs/Parking',
        external: true,
        note: 'Curb and permit context for move day',
      },
      {
        label: 'VDOT 511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-395 / I-66 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with high-rise COI and elevator experience for Rosslyn / Ballston / Crystal City towers; stair and curb fluency for North Arlington garden stock; Pentagon-corridor timeline awareness for military and contractor moves. This is not Fairfax driveway work. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
