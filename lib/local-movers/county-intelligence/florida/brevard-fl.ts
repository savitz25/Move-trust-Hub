import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Brevard County — Florida Tier 2 (Space Coast secondary market).
 * Secondary-market contract vs Orange Tier 1 parent — Melbourne / Palm Bay /
 * Titusville coastal–mainland split, not Orlando theme-park logistics.
 */
export const brevardCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'brevard',
  hubTitle: 'Brevard County Moving Intelligence Hub',
  eyebrow: 'Brevard · Space Coast · Melbourne / Palm Bay / Titusville',
  h1: 'Moving in Brevard County: Space Coast — Melbourne, Palm Bay & Titusville',
  heroOpener:
    'Brevard County is Florida’s Space Coast — Melbourne and Palm Bay mainland sprawl, Cocoa/Rockledge mid-county, Titusville north near Kennedy Space Center, and beachside A1A barrier strips — not Orange County theme-park arterials with a different nameplate. I-95, US-1, FL-528, A1A, and FL-520 set lagoon-bridge and north–south timing. Compared with Orange, you get freer mid-day freeflow than tourist-core Orlando gridlock, true coastal/A1A product, and aerospace employment cycles that reshape relocation volume. This guide is for people moving in Brevard as a secondary market with its own role — not a recycled Orlando or Miami beach script.',
  heroCredibility:
    'Space Coast · Beachside vs mainland · Aerospace cycles · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · US-1 · FL-528 · A1A · FL-520',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/florida/orange',
    title: 'Compared with Orange County',
    intro:
      'Brevard is the Space Coast secondary market — Melbourne/Palm Bay mainland, Cocoa/Rockledge mid-county, Titusville north, and beachside A1A — not a drop-in template for Orlando tourist arterials or theme-park guest logistics. Use Orange as the dense Central Florida parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight I-4 tourist peaks, FL-408, and multi-hour cross-metro pairs through guest traffic. Brevard pairs ride I-95, US-1, FL-528, A1A, and FL-520 — freer mid-day than Orlando core, still peak-heavy on lagoon bridges and A1A summer weekends. Titusville ↔ Palm Bay is a long local, not a short Orlando suburb hop. Portal-to-portal time is real; it is not a theme-park dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes tourist multifamily, planned suburbs, and dense apartment product under one county label. Brevard’s ladder is beachside condos and elevated coastal SFH, Melbourne/Viera planned HOAs, Palm Bay larger-lot growth, and Titusville small-city stock — far more barrier-island elevators and lagoon-edge access, far less park-adjacent guest density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Orange planned villages need HOA packets; tourist cores add curb and elevator friction. Brevard defaults to a beachside vs mainland split — A1A sand staging and reserved elevators on the barrier strip, HOA COI in Viera-area growth, and freer driveway work in many Palm Bay tracts. Expect bridge choke points first, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Brevard quotes often sit near or slightly below dense Orange tourist-corridor rates for comparable square footage when access is a simple mainland driveway — beach elevators, bridge delay, north–south empty miles, and launch-week scarcity still push prices up. Expect secondary-coast labor rates with coastal access friction as the main premium, not theme-park scarcity alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Brevard is the Space Coast employment and beach market — aerospace, military-adjacent timelines, and coastal living — not Orange’s tourism job center and not a thin inland bedroom. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Brevard County different',
    intro:
      'Space Coast realities — coastal/A1A logistics, aerospace employment cycles, lagoon bridges, and humidity heat — that change estimates.',
    bullets: [
      {
        title: 'Beachside vs mainland is the primary split',
        detail:
          'Cocoa Beach, Satellite Beach, and Melbourne Beach are different products from Palm Bay, Viera, and west Melbourne tracts. Bridge crossings and sand access change truck choice and timing.',
      },
      {
        title: 'Lagoon bridges & A1A freeflow are line items',
        detail:
          'Peak beach and launch traffic turns short map distances into long portal-to-portal hours. Ask whether quotes include bridge delay assumptions.',
      },
      {
        title: 'Aerospace & military relocation cycles',
        detail:
          'Kennedy Space Center region employment, aerospace contractors, and Patrick SFB–adjacent moves bring PCS-like timelines and high-value equipment inventories more often than pure tourism markets.',
      },
      {
        title: 'Coastal humidity & heat on open staging',
        detail:
          'Hot humid summers stress crews, electronics, and sealed packing. Prefer early starts; treat mid-afternoon beachside load-outs as high risk even when the map looks short.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Brevard zones: Melbourne/Palm Bay, Cocoa/Rockledge, Titusville north & beachside A1A',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Melbourne/Palm Bay mainland, Cocoa/Rockledge mid-county, Titusville north, and beachside A1A price and stage differently under the same Space Coast.',
  zones: [
    {
      id: 'melbourne-palm-bay',
      name: 'Melbourne / Palm Bay Mainland',
      shortName: 'Melbourne / Palm Bay',
      neighborhoods: [
        'Melbourne',
        'Palm Bay',
        'Viera / Suntree edges',
        'West Melbourne',
        'South mainland growth tracts',
      ],
      housingTypes:
        'Suburban SFH, master-planned HOAs, townhomes, apartments, larger-lot south mainland product',
      challenges: [
        'HOA COI and approved hours in Viera-area villages',
        'I-95 / US-1 congestion on north–south pairs',
        'High family-inventory weekend volume',
        'Cross-lagoon hauls to beachside elevators',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Melbourne ↔ Cocoa Beach as bridge-time locals. Mid-week early starts beat school and beach traffic. Price Palm Bay ↔ Titusville as a long local.',
      cityKeywords: [
        'melbourne',
        'palm bay',
        'viera',
        'suntree',
        'west melbourne',
        'central brevard',
      ],
    },
    {
      id: 'cocoa-rockledge',
      name: 'Cocoa / Rockledge Mid-County',
      shortName: 'Cocoa / Rockledge',
      neighborhoods: [
        'Cocoa',
        'Rockledge',
        'Merritt Island lagoon mix',
        'Mid-county US-1 corridors',
        'Historic Cocoa Village edge',
      ],
      housingTypes:
        'Mix of SFH, multifamily, lagoon-adjacent homes, older and updated stock',
      challenges: [
        'Bridge choices to beachside and Merritt Island',
        'Historic-core tight streets near Cocoa Village',
        'Cross-zone pairs north and south at peak',
        'Varied elevator vs non-elevator multifamily',
      ],
      moverTips:
        'Name preferred bridges on estimates. Share staging constraints for older cores. Clarify Merritt Island vs mainland addresses — they are different access problems.',
      cityKeywords: [
        'cocoa',
        'rockledge',
        'merritt island',
        'cocoa village',
      ],
    },
    {
      id: 'titusville-north',
      name: 'Titusville / North Space Coast',
      shortName: 'Titusville / North',
      neighborhoods: [
        'Titusville',
        'Mims edge',
        'North mainland corridors',
        'KSC-adjacent residential',
        'US-1 north corridors',
      ],
      housingTypes:
        'Small-city SFH, multifamily, space-worker rentals, some waterfront and river-edge stock',
      challenges: [
        'Long north–south hauls to Melbourne/Palm Bay',
        'Launch-week tourism traffic near viewing areas',
        'Thinner same-day crew density than central mainland',
        'Mix of river/lagoon access constraints',
      ],
      moverTips:
        'Confirm explicit north-county coverage and travel fees. Avoid major launch viewing peaks when flexible. Inventory waterfront access carefully.',
      cityKeywords: [
        'titusville',
        'mims',
        'north brevard',
        'kennedy space center',
      ],
    },
    {
      id: 'beachside-a1a',
      name: 'Beachside A1A (Cocoa Beach to Melbourne Beach)',
      shortName: 'Beachside A1A',
      neighborhoods: [
        'Cocoa Beach',
        'Cape Canaveral',
        'Satellite Beach / Indian Harbour',
        'Indialantic',
        'Melbourne Beach',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, low- and mid-rise multifamily, cottages near A1A',
      challenges: [
        'Elevator/COI windows and sand protection',
        'A1A tourist parking scarcity',
        'Bridge timing from mainland staging',
        'Launch-week and summer weekend traffic spikes',
      ],
      moverTips:
        'Reserve elevators early. Share street-width and driveway photos. Prefer weekday beachside loads. Budget floor protection and possible shuttle staging on tight A1A blocks.',
      cityKeywords: [
        'cocoa beach',
        'cape canaveral',
        'satellite beach',
        'indialantic',
        'melbourne beach',
        'a1a',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Brevard County',
    intro:
      'Same square footage prices differently by lagoon bridges, beach elevators, north–south distance, and whether the job is mainland HOA or A1A coastal.',
    drivers: [
      {
        title: 'Lagoon bridge & A1A delay risk',
        detail:
          'Peak beach and launch traffic turns hourly jobs into longer billable days on cross-lagoon and beach-strip pairs.',
      },
      {
        title: 'Beachside elevator & sand labor',
        detail:
          'COIs, reserved elevators, floor protection, and tight street staging stack on barrier islands.',
      },
      {
        title: 'North–south empty miles & HOA soft costs',
        detail:
          'Titusville ↔ Palm Bay pairs burn portal-to-portal time; Viera-area approved hours compress schedule options on mainland growth jobs.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with beach elevators, bridges, or launch-week windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,700–$3,900+',
        note: 'HOA soft costs and cross-lagoon hauls trend up',
      },
      {
        label: '3–4+ BR (beachside / long north–south)',
        value: '$2,400–$6,000+',
        note: 'Barrier elevators and Titusville–Palm Bay pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & humidity calendar intelligence',
    intro:
      'Brevard peaks follow beach summers, launch calendars, aerospace relocation windows, and hurricane season — not Orlando park calendars alone.',
    items: [
      {
        title: 'Summer beach & humidity peak: roughly Memorial Day – Labor Day',
        detail:
          'A1A and bridges worsen on weekends. Prefer weekday beachside loads; plan early starts and heat-safe packing for humidity stress.',
      },
      {
        title: 'Launch weeks & aerospace move clusters',
        detail:
          'Road congestion near viewing corridors and contractor relocation spikes can stall trucks. Confirm launch calendars and report dates against load windows.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still honor HOA weekday rules in planned villages. Early starts beat heat, humidity, and residual beach traffic even in shoulder seasons.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-a1a',
      title: 'Coastal / A1A & lagoon bridge logistics',
      intro:
        'Brevard’s signature operational problem is the barrier–mainland split across Indian River Lagoon bridges and A1A staging.',
      bullets: [
        'Name origin and destination sides of the lagoon on every estimate.',
        'Reserve beach condo elevators early; get COI naming requirements in writing.',
        'Budget sand protection and possible shuttle staging on tight A1A blocks.',
        'Avoid peak summer weekend and major launch windows when dates are flexible.',
      ],
    },
    {
      id: 'aerospace-employment',
      title: 'Aerospace employment cycles & long north–south',
      intro:
        'Space industry and military-adjacent timelines create relocation patterns that pure tourism markets do not — on a long north–south county.',
      bullets: [
        'Share report dates, storage needs, and whether the job is FDACS intrastate or FMCSA interstate.',
        'Inventory high-value electronics and workshop gear carefully for tech/aerospace households.',
        'Price Titusville ↔ Melbourne/Palm Bay pairs as long locals with honest I-95 / US-1 time.',
        'Send Viera and other HOA packets with the survey for planned-community destinations.',
      ],
    },
    {
      id: 'humidity-heat',
      title: 'Humidity & coastal heat staging',
      intro:
        'Hot humid summers define Space Coast crew days more than inland Central Florida shade assumptions.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon beachside loads as high risk.',
        'Request shaded staging where possible and heat-safe packing for electronics and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on sand and asphalt approaches.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat and humidity.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Beachside living, Melbourne/Viera planned suburbs, and Titusville space-coast character are different bets — validate schools and healthcare by pocket, then plan for bridges.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Brevard Public Schools covers the county with magnets, charters, and private options. Match every listing address to the correct zone.',
        bullets: [
          {
            title: 'Zone before beach or Viera branding',
            detail:
              'Use district boundary tools. Beachside and mainland marketing names can span multiple feeders — verify with official maps.',
          },
          {
            title: 'Growth pockets',
            detail:
              'Viera and south mainland growth can pressure capacity. Do not treat county averages as neighborhood truth.',
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
              'Health First and other regional campuses serve much of the Space Coast. Map ER drive times including bridge delays from beachside addresses.',
          },
          {
            title: 'North vs south access',
            detail:
              'Titusville and far south Palm Bay can mean longer specialty drives — test peak I-95 / US-1 routes before committing.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer care early if mid-treatment; launch and summer peaks can delay first appointments and move windows.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brevard resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Brevard County Government',
        href: 'https://www.brevardfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Melbourne',
        href: 'https://www.melbourneflorida.org/',
        external: true,
      },
      {
        label: 'City of Palm Bay',
        href: 'https://www.palmbayflorida.org/',
        external: true,
      },
      {
        label: 'Brevard Public Schools',
        href: 'https://www.brevardschools.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Melbourne/Palm Bay, Cocoa/Rockledge, Titusville/North, Beachside A1A) when available. Confirm bridge routing, beach elevators, aerospace timeline needs, and heat-window plans — this is Space Coast, not an Orlando suburb rename.',
  lastReviewed: '2026-07-24',
});
