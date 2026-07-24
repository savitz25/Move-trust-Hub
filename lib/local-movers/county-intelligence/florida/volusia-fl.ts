import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Volusia County — Florida Tier 2 (Daytona Beach / Deltona secondary market).
 * Secondary-market contract vs Orange Tier 1 parent (+ Duval distant ok) —
 * beach tourism + inland suburbs, not Orlando theme-park logistics.
 */
export const volusiaCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'volusia',
  hubTitle: 'Volusia County Moving Intelligence Hub',
  eyebrow: 'Volusia · Daytona Beach / Deltona · Coastal–inland split',
  h1: 'Moving in Volusia County: Daytona Beach Tourism & Deltona Inland Suburbs',
  heroOpener:
    'Volusia County is a coastal–inland split market — Daytona Beach event calendars and oceanfront towers, Port Orange mainland suburbs, Ormond and New Smyrna beachside towns, Deltona inland growth, and DeLand west of the interstates — not Orange County theme-park arterials with a different nameplate. I-4, I-95, US-1, FL-40, and A1A set freeflow and event-week timing. Compared with Orange, you get freer mid-day freeflow than tourist-core Orlando, true beach tourism peaks (Speedway, Bike Week, spring break), and a real inland suburban product at Deltona/DeLand. This guide is for people moving in Volusia as a secondary market with its own role — not a recycled Orlando or Miami beach script.',
  heroCredibility:
    'Daytona Beach / Deltona · Coastal–inland split · Event-calendar aware · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-4 · I-95 · US-1 · FL-40 · A1A',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/florida/orange',
    title: 'Compared with Orange County',
    intro:
      'Volusia is the Daytona Beach–Deltona secondary market — beach tourism cores, mainland suburbs, and inland DeLand/Deltona stock — not a drop-in template for Orlando theme-park guest logistics. Use Orange as the dense Central Florida parent contrast; Duval is a distant northern reference only, not the operating parent.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight I-4 tourist peaks and multi-hour cross-metro pairs through guest traffic. Volusia pairs ride I-4, I-95, US-1, FL-40, and A1A — freer mid-day than Orlando core, still peak-heavy on event weeks and summer A1A. Deltona ↔ Daytona Beach and DeLand ↔ beachside are long locals with real portal-to-portal time, not short park-adjacent hops.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes tourist multifamily, planned suburbs, and dense apartment product. Volusia’s ladder is Daytona oceanfront towers, quieter Ormond/New Smyrna beach stock, Port Orange family HOAs, Deltona commuter SFH, and DeLand college-town/historic homes — far more event-driven beach elevators, a clearer coastal–inland split, and less theme-park guest density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Orange planned villages need HOA packets; tourist cores add curb friction. Volusia defaults to event-week tower rules on the beach strip plus HOA COI in Port Orange/Deltona tracts — freer driveway work inland, sand and elevator friction beachside. Expect event calendars first on coastal jobs, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Volusia quotes often sit near or slightly below dense Orange tourist-corridor rates for comparable square footage when access is a simple inland driveway — oceanfront elevators, event-week delay, and coastal–inland empty miles still push prices up. Expect secondary-market labor rates with tourism peaks as the main coastal premium, not park scarcity alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Volusia is a beach-tourism and inland-suburban market — motorsports events, A1A living, and Orlando-direction commuting from Deltona — not Orange’s tourism job center core. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Volusia County different',
    intro:
      'Daytona–Deltona realities — beach tourism peaks, inland suburbs, and I-4/I-95 freeflow that is still billable — that change estimates.',
    bullets: [
      {
        title: 'Event calendars are operational inputs',
        detail:
          'Speedway weekends, Bike Week, spring break, and major beach festivals pack A1A and I-95 approaches. Check the event calendar before locking a beachside load window.',
      },
      {
        title: 'Coastal vs inland is not cosmetic',
        detail:
          'Daytona / Ormond / New Smyrna beach product differs sharply from Deltona and DeLand inland SFH. Price them as different markets under one county name.',
      },
      {
        title: 'I-4 / I-95 freeflow is not Orlando gridlock — still a line item',
        detail:
          'Deltona ↔ Daytona or Port Orange ↔ DeLand pairs freer than Orange tourist core still burn billable time at school and event peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Oceanfront elevators & A1A staging',
        detail:
          'Beach towers require COIs, reserved elevators, and sand protection that pure inland cul-de-sacs do not share — especially on event weeks.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Volusia zones: Daytona/Port Orange, Deltona inland, beachside towns & DeLand west',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Daytona Beach/Port Orange, Deltona inland, Ormond/New Smyrna beachside, and DeLand west price and stage differently under the same county.',
  zones: [
    {
      id: 'daytona-port-orange',
      name: 'Daytona Beach / Port Orange',
      shortName: 'Daytona / Port Orange',
      neighborhoods: [
        'Daytona Beach',
        'Oceanfront / A1A corridors',
        'Port Orange',
        'South Daytona',
        'ISB / Dunlawton commercial corridors',
      ],
      housingTypes:
        'High-rise and mid-rise condos, older beach SFH, suburban HOA SFH, apartments between coast and I-95',
      challenges: [
        'Elevator/COI windows and limited beach staging',
        'Event-week and spring-break congestion',
        'HOA rules in mainland Port Orange tracts',
        'I-95 and arterial peaks on cross-county hauls',
      ],
      moverTips:
        'Cross-check Speedway and major event calendars before booking oceanfront towers. Reserve elevators early. Send HOA packets for Port Orange villages. Prefer non-event weekdays for beach core when flexible.',
      cityKeywords: [
        'daytona beach',
        'daytona',
        'port orange',
        'south daytona',
        'a1a',
        'international speedway',
      ],
    },
    {
      id: 'deltona-inland',
      name: 'Deltona Inland Suburbs',
      shortName: 'Deltona',
      neighborhoods: [
        'Deltona',
        'Orange City',
        'DeBary edge',
        'Southwest Volusia suburbs',
        'I-4 corridor influence',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multifamily, commuter-oriented stock toward Orlando metro',
      challenges: [
        'I-4 congestion on Orlando-direction pairs',
        'Long hauls to Daytona beachside',
        'HOA rules in planned tracts',
        'High family-move volume on school calendars',
      ],
      moverTips:
        'Price Deltona ↔ Daytona Beach as a long local with I-4/I-95 assumptions. Send HOA packets early. Mid-week starts beat school peaks.',
      cityKeywords: [
        'deltona',
        'orange city',
        'debary',
        'southwest volusia',
      ],
    },
    {
      id: 'ormond-new-smyrna-beachside',
      name: 'Ormond / New Smyrna Beachside',
      shortName: 'Ormond / NSB beachside',
      neighborhoods: [
        'Ormond Beach',
        'Ormond-by-the-Sea edge',
        'New Smyrna Beach',
        'South peninsula corridors',
        'Edgewater edge',
      ],
      housingTypes:
        'Beach SFH and condos, elevated coastal homes, mainland NSB/Ormond suburbs, tourist multifamily',
      challenges: [
        'A1A summer tourist traffic',
        'Bridge/causeway timing between beachside and mainland',
        'Sand protection and limited truck swing room',
        'Mix of elevator and non-elevator buildings',
      ],
      moverTips:
        'Separate beachside vs mainland addresses on the survey. Share driveway and street-width photos. Prefer weekday beachside loads in summer. Budget floor protection on sand approaches.',
      cityKeywords: [
        'ormond beach',
        'new smyrna beach',
        'new smyrna',
        'edgewater',
        'ormond-by-the-sea',
      ],
    },
    {
      id: 'deland-west',
      name: 'DeLand West / Inland',
      shortName: 'DeLand west',
      neighborhoods: [
        'DeLand',
        'Stetson University area',
        'Western Volusia inland',
        'Historic downtown DeLand edges',
        'Rural-suburban west pockets',
      ],
      housingTypes:
        'College-town SFH and rentals, historic homes, suburban tracts, larger-lot inland properties',
      challenges: [
        'Student lease clusters near campus',
        'Long empty miles to beachside elevators',
        'Older historic streets with tight staging',
        'Different crew density than coastal cores',
      ],
      moverTips:
        'Book May/August student peaks early near Stetson. Confirm inland coverage and travel fees for coastal crews. Inventory historic-home stairs carefully.',
      cityKeywords: [
        'deland',
        'stetson',
        'west volusia',
        'inland volusia',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Volusia County',
    intro:
      'Same square footage prices differently by event weeks, beach elevators, and whether the job is coastal tower or Deltona/DeLand inland.',
    drivers: [
      {
        title: 'Event-week & A1A tourism delay risk',
        detail:
          'Speedway, Bike Week, and summer beach traffic expand billable hours on coastal jobs — especially hourly crews.',
      },
      {
        title: 'Oceanfront elevator & building soft costs',
        detail:
          'COIs, reserved elevators, and protection labor stack in Daytona and other beach towers.',
      },
      {
        title: 'Coastal–inland portal-to-portal distance',
        detail:
          'DeLand or Deltona ↔ beachside pairs burn empty miles that “Volusia local” labels hide; HOA rules in Port Orange/Deltona compress schedule options.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with oceanfront elevators or event-week windows',
      },
      {
        label: '2–3BR house / mainland HOA',
        value: '$1,600–$3,800+',
        note: 'Coastal–inland pairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR (oceanfront / event week / long inland–coast)',
        value: '$2,400–$6,000+',
        note: 'Daytona towers and DeLand–beach pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & event calendar intelligence',
    intro:
      'Volusia peaks follow Daytona event calendars, beach summers, school moves inland, and hurricane season — not Orlando park calendars alone.',
    items: [
      {
        title: 'Major Daytona event windows & summer beach season',
        detail:
          'Speedway race weeks, Bike Week, spring break, and peak A1A weekends can gridlock coastal access. Prefer non-event weekdays for oceanfront towers when flexible.',
      },
      {
        title: 'School & family calendars (Deltona / Port Orange)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays; Stetson-area May/August turns fill near DeLand campus.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, non-event weeks',
        detail:
          'Still honor HOA weekday rules. Early starts beat heat and residual tourist traffic even in shoulder seasons.',
      },
    ],
  },
  specialized: [
    {
      id: 'beach-tourism',
      title: 'Beach tourism & oceanfront logistics',
      intro:
        'Volusia’s signature coastal problem is event-driven congestion plus building operations on the beach strip.',
      bullets: [
        'Cross-check Speedway, Bike Week, spring break, and major festival calendars before locking load windows.',
        'Reserve oceanfront elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for boardwalk-adjacent blocks.',
        'Price A1A Ormond ↔ New Smyrna hauls with summer tourist delay risk explicit.',
      ],
    },
    {
      id: 'inland-suburbs',
      title: 'Inland suburbs (Deltona / DeLand / Port Orange)',
      intro:
        'Western inland towns and mainland HOAs share a county name with beach towers but not a rate card.',
      bullets: [
        'Name both cities and coastal vs inland on every estimate; “Volusia local” is too vague.',
        'Price DeLand or Deltona ↔ Daytona Beach pairs as long locals with I-4/I-95 assumptions.',
        'Send HOA packets for Port Orange, Deltona, and mainland planned tracts with the survey.',
        'Book Stetson-area lease peaks early; confirm complex elevator and parking rules near campus.',
      ],
    },
    {
      id: 'i4-i95-freeflow',
      title: 'I-4 / I-95 freeflow logistics',
      intro:
        'Interstate freeflow is freer than Orlando tourist core but still defines portal-to-portal time on cross-county pairs.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-4, I-95, or long US-1/A1A hauls.',
        'Prefer start times that miss school and event approach peaks when building windows allow.',
        'Clarify whether coastal crews charge travel premiums for deep inland addresses.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Daytona event energy, quieter beach towns, and Deltona/DeLand inland living are different bets — validate schools and healthcare by pocket, then plan for corridor drive times.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Volusia County Schools covers the county with magnets, charters, and private options. Match every listing address to the correct zone.',
        bullets: [
          {
            title: 'Zone before beach branding',
            detail:
              'Use district boundary tools. Daytona, Ormond, New Smyrna, and Deltona marketing names span multiple feeders.',
          },
          {
            title: 'Coastal vs inland program access',
            detail:
              'Commute and bus patterns differ when families choose beachside living versus DeLand or Deltona — verify logistics, not only ratings.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE reports should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional acute-care anchors',
            detail:
              'Halifax Health, AdventHealth campuses, and other facilities serve coastal and inland pockets. Map ER drive times from beachside addresses during event traffic.',
          },
          {
            title: 'Inland vs coastal access',
            detail:
              'DeLand and Deltona households may orient differently than oceanfront residents — test peak I-4/I-95 routes before committing.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer care early if mid-treatment; tourism and summer peaks can delay first appointments and move windows.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Volusia resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Volusia County Government',
        href: 'https://www.volusia.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Daytona Beach',
        href: 'https://www.codb.us/',
        external: true,
      },
      {
        label: 'City of DeLand',
        href: 'https://www.deland.org/',
        external: true,
      },
      {
        label: 'Volusia County Schools',
        href: 'https://www.vcsedu.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Daytona/Port Orange, Deltona, Ormond/NSB beachside, DeLand west) when available. Confirm event calendars, coastal elevators, I-4/I-95 drive assumptions, and HOA packets — this is Daytona–Deltona, not an Orlando rename.',
  lastReviewed: '2026-07-24',
});
