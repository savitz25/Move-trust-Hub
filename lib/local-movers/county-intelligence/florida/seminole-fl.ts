import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Seminole County — Florida Tier 2 (Orlando north collar).
 * Parent: Orange County. Sanford / Lake Mary / Altamonte —
 * NOT a renamed Orlando-core pack.
 */
export const seminoleCountyIntelligence = finalizeFlTier2Pack({
  countySlug: 'seminole',
  hubTitle: 'Seminole County Moving Intelligence Hub',
  eyebrow: 'Seminole County · Orlando north collar — Sanford / Lake Mary / Altamonte',
  h1: 'Moving in Seminole County: Orlando North Collar — Lake Mary, Altamonte & Sanford',
  heroOpener:
    'Seminole County is Orlando’s north collar — Lake Mary and Heathrow corporate campuses, Altamonte Springs and Casselberry multi-family corridors, Sanford river-city and historic stock, and Oviedo east suburban growth — not Orange County downtown/tourist-core elevators with different exit numbers. I-4 freeflow still bills at peak; US-17/92, FL-417, FL-436, and FL-46 rewrite portal-to-portal time; corporate and residential inventories mix on the same Saturday. Quote the pocket: Heathrow HOA two-story, Altamonte elevator building, Sanford bungalow, or Oviedo growth tract — never “Seminole County local” as one rate card.',
  heroCredibility:
    'Orlando north collar · Lake Mary / Altamonte / Sanford · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-4 · US-17/92 · FL-417 · FL-436 · FL-46',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/florida/orange',
    title: 'Compared with Orange County',
    intro:
      'Seminole is Orlando’s north collar above Orange County — corporate Lake Mary/Heathrow, Altamonte multi-family density, Sanford seat and river product, and Oviedo east growth. Use this when one address sits in Orange and the other in Seminole; do not treat north-metro suburbs as a thinner Orlando tourist-core script.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight I-4 tourist peaks, International Drive density, and downtown Orlando arterials. Seminole pairs ride I-4 north freeflow, US-17/92, FL-417, FL-436, and FL-46 — freer mid-day flow than tourist-core Orange, still billable at rush and event peaks. Lake Mary ↔ Altamonte or Sanford ↔ Oviedo burns portal-to-portal time map miles understate. Cross-county Seminole ↔ Orange pairs are long locals on the I-4 / 417 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes tourist-adjacent multi-family, downtown towers, Winter Park/established SFH, and sprawling HOA growth. Seminole’s ladder is Lake Mary/Heathrow corporate-adjacent HOA SFH, Altamonte/Casselberry multi-family and mid-density stock, Sanford historic and river-edge homes, and Oviedo east suburban growth — more north-metro corporate/residential mix, less theme-park guest density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Seminole stages more driveway, cul-de-sac, and suburban multi-family curb work than Orlando tourist-core elevators. HOAs dominate Lake Mary and many growth villages; Altamonte corridors add elevator/COI packets. Corporate campus-adjacent timing replaces resort guest traffic as a planning constraint.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Lake Mary jobs can look secondary-market simple until HOA windows, multi-family long carries, and peak I-4 time hit. Cross-zone collar pairs into Orange raise the bill above pure in-town Seminole quotes. Do not assume Orlando-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Seminole is Orlando north’s corporate-plus-suburban collar — Lake Mary / Altamonte / Sanford identity — not an Orange tourist-bedroom dump. Match crews to HOA packets, I-4 freeflow timing, and multi-unit building rules.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Seminole County different',
    intro:
      'North-metro realities — corporate suburbs, I-4 freeflow, multi-family corridors, and Florida licensing — that a renamed Orlando-core pack would miss.',
    bullets: [
      {
        title: 'Corporate Lake Mary, Altamonte multi-family, Sanford, and Oviedo are different products',
        detail:
          'A Heathrow HOA home, an Altamonte elevator apartment, a Sanford historic bungalow, and an Oviedo growth tract do not share truck access. Name both cities — “Seminole County local” fails across campus vs east growth last-mile.',
      },
      {
        title: 'I-4 freeflow is not tourist-core gridlock — still clock time',
        detail:
          'Many households pair addresses across Lake Mary, Altamonte, Sanford, and into Orange. Peak I-4, 436, and 417 delays are billable. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'Corporate and residential calendars mix',
        detail:
          'Office-park oriented Lake Mary/Heathrow windows collide with school-calendar Saturdays and multi-family lease ends. Book preferred HOA and elevator slots early.',
      },
      {
        title: 'HOAs dominate much of the north-metro growth stock',
        detail:
          'Master-planned and gated villages require COI, approved hours, and gate lists. Treat the HOA packet as part of the survey.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Seminole County zones: corporate north, Altamonte belt, Sanford & Oviedo',
  zonesIntro:
    'Four sharp products — Lake Mary/Heathrow corporate, Altamonte/Casselberry multi-family belt, Sanford core, and Oviedo east. Not an Orange zone dump with new labels.',
  zones: [
    {
      id: 'lake-mary-heathrow',
      name: 'Lake Mary, Heathrow & corporate north',
      shortName: 'Lake Mary / Heathrow',
      neighborhoods: [
        'Lake Mary',
        'Heathrow',
        'Corporate campus-adjacent villages',
        'I-4 Lake Mary corridors',
        'HOA and gated SFH pockets',
      ],
      housingTypes:
        'HOA SFH, gated communities, townhomes, multi-family near retail and campuses, newer planned stock',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-4 / 417 / local arterial peaks',
        'Corporate and school-calendar Saturday demand',
        'Cross-zone pairs toward Altamonte or Sanford',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Prefer mid-week mornings away from I-4 rush. Price Lake Mary ↔ Altamonte as a timed local. Early summer starts beat heat on open tracts.',
      cityKeywords: [
        'lake mary',
        'heathrow',
        'lake mary fl',
        'heathrow fl',
      ],
    },
    {
      id: 'altamonte-casselberry',
      name: 'Altamonte Springs, Casselberry & mid-density belt',
      shortName: 'Altamonte / Casselberry',
      neighborhoods: [
        'Altamonte Springs',
        'Casselberry',
        'FL-436 corridors',
        'Multi-family and mid-density pockets',
        'Older suburban SFH rings',
      ],
      housingTypes:
        'Apartments and elevators, townhomes, mid-century SFH, HOA tracts, commercial-adjacent multi-unit',
      challenges: [
        'Elevator/COI rules and end-of-month lease churn',
        'FL-436 / US-17/92 congestion',
        'Limited curb staging near commercial strips',
        'Cross-county pairs into Orange job corridors',
      ],
      moverTips:
        'Share building packets and truck-height limits for multi-unit. Avoid last-Saturday-of-month when flexible. Price Altamonte ↔ Lake Mary or Altamonte ↔ Orange edges portal-to-portal.',
      cityKeywords: [
        'altamonte springs',
        'altamonte',
        'casselberry',
        'altamonte springs fl',
      ],
    },
    {
      id: 'sanford-core',
      name: 'Sanford: river city, historic grid & county seat',
      shortName: 'Sanford',
      neighborhoods: [
        'Downtown Sanford',
        'Historic Sanford residential',
        'Lake Monroe / river-edge pockets',
        'South Sanford suburban',
        'FL-46 / US-17/92 approaches',
      ],
      housingTypes:
        'Historic SFH, small-city multi-unit, river-edge homes, suburban tracts, mixed older access',
      challenges: [
        'Older grids and constrained curb staging',
        'River-edge and flood-aware parcels on some lots',
        'I-4 / FL-46 approach timing',
        'Different product mix than Lake Mary HOA growth',
      ],
      moverTips:
        'Survey curb, stairs, and driveway constraints on historic blocks. Share flood-map context for river-edge addresses. Price Sanford ↔ Lake Mary with honest corridor time.',
      cityKeywords: [
        'sanford',
        'downtown sanford',
        'sanford fl',
        'lake monroe',
      ],
    },
    {
      id: 'oviedo-east',
      name: 'Oviedo & eastern Seminole growth',
      shortName: 'Oviedo east',
      neighborhoods: [
        'Oviedo',
        'Winter Springs edges',
        'FL-417 east corridors',
        'Master-planned growth villages',
        'Eastern suburban and larger-lot pockets',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, townhomes, newer construction, some larger-lot edges',
      challenges: [
        'HOA rules in planned villages',
        'FL-417 / arterial timing into Orange and UCF-adjacent corridors',
        'School-calendar Saturday demand',
        'New-construction incomplete roads',
      ],
      moverTips:
        'Collect HOA packets early. Confirm builder access the week of the move in new sections. Price Oviedo ↔ Lake Mary or Oviedo ↔ Orange pairs as timed long locals.',
      cityKeywords: [
        'oviedo',
        'winter springs',
        'oviedo fl',
        'winter springs fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Seminole County',
    intro:
      'Same square footage prices differently by HOA soft costs, multi-family access, I-4 / 417 portal time, and whether the job is corporate north or east growth.',
    drivers: [
      {
        title: 'Cross-zone I-4 / FL-417 / US-17/92 corridor time',
        detail:
          'Lake Mary ↔ Altamonte, Sanford ↔ Oviedo, or peak I-4 legs burn more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (Lake Mary / Oviedo growth)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Multi-family elevator & long-carry labor',
        detail:
          'Altamonte-corridor apartments and mid-density buildings add elevator waits, parking scarcity, and stair carries suburban SFH quotes miss.',
      },
      {
        title: 'Cross-county pairs into Orange',
        detail:
          'Long locals on I-4 and 417 raise portal-to-portal time; confirm whether pure local rate cards still apply.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, HOA windows, or peak I-4',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,800+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / growth edge / long local)',
        value: '$2,200–$6,500+',
        note: 'Long locals into Orange and large HOA homes price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, school-calendar & I-4 intelligence',
    intro:
      'Central Florida heat, school calendars, and I-4 event/tourist through-traffic set residential peaks. HOA villages and multi-family buildings compete for the same Saturday crews.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Lake Mary, Altamonte, and Oviedo. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'I-4 tourist & event through-peaks',
        detail:
          'Holiday and major Orlando-area event seasons worsen north–south timing even for pure Seminole addresses near the corridor.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Open suburban streets get hot early. Prefer dawn starts; plan moisture protection for afternoon storms.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and building elevator rules. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'north-metro-suburbs',
      title: 'North-metro suburban & corporate residential mix',
      intro:
        'Seminole’s defining product is corporate-adjacent HOA suburbs plus mid-density multi-family — not Orlando tourist-core elevators alone.',
      bullets: [
        'Match crews to pocket: Heathrow HOA driveway vs Altamonte elevator vs Sanford historic access.',
        'Collect HOA COI and gate lists for Lake Mary and Oviedo villages before booking.',
        'Inventory corporate-relocator full-house contents separately from short multi-unit turns when relevant.',
        'Name both cities on the estimate — refuse vague “north Orlando local” language.',
      ],
    },
    {
      id: 'i4-freeflow',
      title: 'I-4 freeflow & north-collar corridor timing',
      intro:
        'Seminole’s metro relationship is I-4 north freeflow plus 417, 436, 17/92, and 46 — freer than tourist-core Orange, still a line item.',
      bullets: [
        'Price Lake Mary ↔ Altamonte/Sanford and collar pairs into Orange as portal-to-portal jobs.',
        'Build peak I-4 and school-traffic buffer into weekday afternoons and Friday evenings.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
        'FL-417 and US-17/92 still matter for Oviedo and Sanford staging — not just freeway ETAs.',
      ],
    },
    {
      id: 'corporate-residential-mix',
      title: 'Corporate campus & residential calendar module',
      intro:
        'Lake Mary/Heathrow employment geography and multi-family lease cycles collide with school-calendar demand.',
      bullets: [
        'Coordinate mid-week starts when corporate relocators can move outside peak Saturday HOA demand.',
        'Confirm multi-unit elevator reservations and end-of-month lease constraints early.',
        'Expect higher short-notice apartment volume near Altamonte commercial corridors.',
        'Prefer written portal-to-portal language when households commute-pattern across Orange job centers.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Seminole County Public Schools serves most public K–12 students and is often a relocator focus. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use official district boundary tools. Lake Mary, Altamonte, Sanford, and Oviedo brands can span multiple feeders and choice programs.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between rapid-growth eastern edges and longer-established central corridors — do not treat county averages as neighborhood truth.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'AdventHealth and Orlando Health campuses and other regional facilities cover much of Seminole; map ER drive times at rush hour from Oviedo and Sanford edges — not only from Lake Mary proper.',
          },
          {
            title: 'Orlando-metro specialty spillover',
            detail:
              'Some residents use Orange County specialty systems. Confirm insurer networks and realistic I-4 / 417 appointment drive times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Seminole County resources',
    intro:
      'Local official links first. FDACS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Seminole County',
        href: 'https://www.seminolecountyfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Lake Mary',
        href: 'https://www.lakemaryfl.com/',
        external: true,
      },
      {
        label: 'City of Altamonte Springs',
        href: 'https://www.altamonte.org/',
        external: true,
      },
      {
        label: 'City of Sanford',
        href: 'https://www.sanfordfl.gov/',
        external: true,
      },
      {
        label: 'Seminole County Public Schools',
        href: 'https://www.scps.k12.fl.us/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        note: 'I-4, FL-417, FL-436 before load windows',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Lake Mary/Heathrow, Altamonte/Casselberry, Sanford, Oviedo east) when available. Confirm HOA/COI for corporate suburbs, multi-unit packets on Altamonte corridors, and honest I-4 freeflow time — this is Orlando’s north collar, not a renamed Orange tourist-core pack. Parent market: Orange guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
