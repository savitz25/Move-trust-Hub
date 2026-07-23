import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Hidalgo County, Texas moving intelligence.
 * Differentiators: Rio Grande Valley border-metro polycentric pattern (McAllen, Edinburg,
 * Mission, Pharr), extreme heat, colonias and growth edges — NOT Texas Triangle
 * (DFW / Houston / Austin) suburban HOA scripts and not El Paso desert-mountain PCS logistics.
 */
export const hidalgoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'hidalgo',
  hubTitle: 'Hidalgo County Moving Intelligence Hub',
  eyebrow: 'Hidalgo · Rio Grande Valley border metro',
  h1: 'Moving in Hidalgo County: Rio Grande Valley, McAllen–Edinburg & Border-Metro Guide',
  heroOpener:
    'Hidalgo County is the Rio Grande Valley’s population core — a polycentric border metro of McAllen, Edinburg, Mission, Pharr, Weslaco, and smaller Valley towns — not a Texas Triangle suburb and not El Paso’s mountain-and-PCS script. Summer heat is extreme and humid compared with far-west desert; winter “snowbird” and family calendars still move volume; medical and retail corridors along Expressway 83 shape jobs; colonias and rural edges need access photos that master-planned DFW villages never require. Cross-town pairs can look short on a map and still burn time on 83 / 281 / local arterials. International bridge approaches and bilingual daily life are normal context, not edge cases. This guide is for people moving in Hidalgo County — RGV border-metro logistics — not a recycled Houston, Austin, or DFW pack.',
  heroCredibility:
    'Rio Grande Valley border metro · Extreme heat · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Hidalgo County different',
    intro:
      'These are Hidalgo / RGV realities — polycentric Valley cities, extreme heat, border-metro traffic, and non-Triangle housing patterns — not interchangeable “Texas suburb” boilerplate.',
    bullets: [
      {
        title: 'This is not Texas Triangle growth logic',
        detail:
          'Hidalgo does not run on Austin tech spillover, Houston Energy Corridor commutes, or DFW master-planned HOA density as the default story. It is a self-contained Rio Grande Valley metro with its own medical, retail, education, and trade economy. Name both origin and destination cities — “Valley local” is too vague.',
      },
      {
        title: 'Polycentric cities, not one downtown core',
        detail:
          'McAllen retail and medical corridors, Edinburg university and government, Mission residential west, Pharr industrial and bridge-adjacent patterns, and Mid-Valley towns each have different staging rules. A McAllen apartment and a rural-edge colonia lot are different jobs under one county label.',
      },
      {
        title: 'Extreme heat is a first-order operational risk',
        detail:
          'RGV summers combine high temperature with humidity that Triangle marketing rarely emphasizes. Early starts, hydration, and heat-safe packing for electronics are operational requirements — not optional comfort tips.',
      },
      {
        title: 'Expressway 83 / 281 / 107 timing rewrites ETAs',
        detail:
          'Map miles between Mission, McAllen, Edinburg, and Weslaco understate peak portal time. Hourly crews feel every bottleneck — ask how drive time is priced.',
      },
      {
        title: 'Colonias and rural edges need access surveys',
        detail:
          'Private roads, incomplete paving, limited turnaround, and soft shoulders appear more often than in Sugar Land or Round Rock HOA scripts. Share approach photos before booking.',
      },
      {
        title: 'Winter visitors and family multi-generational moves',
        detail:
          'Seasonal residents and multi-generational households change inventory profiles (medical equipment, outdoor furniture, larger kitchens). Inventory accurately — do not assume young-professional apartment loads.',
      },
      {
        title: 'Border-metro freight and bridge-adjacent congestion',
        detail:
          'Port-of-entry and commercial corridors can delay trucks even when residential addresses are not “international moves.” Plan buffers near Pharr and south-arterial peaks.',
      },
      {
        title: 'Texas intrastate rules (TxDMV) + FMCSA when interstate',
        detail:
          'Moves entirely within Texas are generally overseen under Texas Department of Motor Vehicles (TxDMV) household-goods / motor-carrier frameworks. Interstate legs (e.g. McAllen → San Antonio is still in-state; McAllen → out-of-state needs FMCSA). Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesHeading: 'Hidalgo County access zones',
  zonesIntro:
    'Plan by McAllen core, Edinburg, Mission/west, Pharr/San Juan/Alamo corridor, Mid-Valley (Weslaco/Mercedes), and rural/colonia edges — polycentric Valley access, not one suburban template.',
  zones: [
    {
      id: 'mcallen-core',
      name: 'McAllen — medical, retail & apartment core',
      shortName: 'McAllen',
      neighborhoods: [
        'North McAllen',
        'Central / downtown McAllen',
        'South McAllen',
        'Medical district edges',
        'Nolana / 10th Street commercial corridors',
        'Multi-family apartment clusters',
      ],
      housingTypes:
        'Apartments, townhomes, suburban SFH, some HOA tracts and older in-town stock',
      challenges: [
        'Apartment elevator windows and COI',
        'Expressway 83 and arterial congestion at peak',
        'Heat on open docks and parking lots',
        'High end-of-month lease churn',
      ],
      moverTips:
        'Collect building packets early. Prefer earliest morning starts in summer. McAllen ↔ Edinburg or Mission is a classic underquoted “local” — price portal time honestly.',
      cityKeywords: [
        'mcallen',
        'mc allen',
        'nolana',
        'mcallen tx',
      ],
    },
    {
      id: 'edinburg',
      name: 'Edinburg — university, government & north growth',
      shortName: 'Edinburg',
      neighborhoods: [
        'UTRGV / university-adjacent',
        'Downtown Edinburg',
        'North Edinburg growth',
        'Monte Cristo corridor residential',
        'Multi-family near campus',
      ],
      housingTypes:
        'Student and workforce multi-family, SFH tracts, some newer HOA, government-adjacent housing',
      challenges: [
        'University calendar peaks and short-notice apartment moves',
        '281 / local arterial timing',
        'Heat on open suburban staging',
        'Mix of campus and family inventory profiles',
      ],
      moverTips:
        'Book campus peaks early when flexible. Share building rules for multi-unit. Edinburg ↔ McAllen medical corridors needs honest drive-time assumptions.',
      cityKeywords: [
        'edinburg',
        'utrgv',
        'university of texas rio grande valley',
        'edinburg tx',
      ],
    },
    {
      id: 'mission-west',
      name: 'Mission, Palmview & western Valley',
      shortName: 'Mission / West',
      neighborhoods: [
        'Mission',
        'Palmview',
        'Palmhurst edge',
        'Conway / western corridors',
        'West residential growth',
      ],
      housingTypes:
        'Suburban SFH, some HOA, multi-family, larger-lot west edges',
      challenges: [
        '83 corridor timing toward McAllen',
        'HOA COI where planned tracts apply',
        'Summer heat on open streets',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Collect HOA packets when applicable. Early starts beat heat. Mission ↔ Pharr or Weslaco is a long Valley local — not a pure map-mile job.',
      cityKeywords: [
        'mission',
        'palmview',
        'palmhurst',
        'mission tx',
      ],
    },
    {
      id: 'pharr-san-juan-alamo',
      name: 'Pharr, San Juan, Alamo & south-central corridor',
      shortName: 'Pharr / PSJA',
      neighborhoods: [
        'Pharr',
        'San Juan',
        'Alamo',
        'Bridge-adjacent and industrial edges',
        'South-central multi-family',
      ],
      housingTypes:
        'SFH, multi-family, older in-town stock, some newer tracts',
      challenges: [
        'Freight and bridge-approach congestion',
        'Mixed industrial-adjacent staging constraints',
        'Heat and limited shade on open lots',
        'Cross-town pairs into McAllen medical/retail cores',
      ],
      moverTips:
        'Buffer time near commercial peaks. Share street-width photos for older grids. Confirm truck routes that avoid the worst freight bottlenecks when flexible.',
      cityKeywords: [
        'pharr',
        'san juan',
        'alamo',
        'psja',
        'pharr tx',
      ],
    },
    {
      id: 'mid-valley',
      name: 'Weslaco, Mercedes, Donna & Mid-Valley',
      shortName: 'Mid-Valley',
      neighborhoods: [
        'Weslaco',
        'Mercedes',
        'Donna',
        'Mid-Valley Expressway 83 towns',
        'Smaller in-grid residential',
      ],
      housingTypes:
        'In-town SFH, multi-family, some newer tracts, winter-visitor product in pockets',
      challenges: [
        'Longer deadhead from McAllen core crews',
        '83 corridor timing across the Valley',
        'Heat on open staging',
        'Lower service density than McAllen core',
      ],
      moverTips:
        'Ask whether “local” rate cards still apply for Mid-Valley ↔ McAllen pairs. Prefer early starts. Inventory for seasonal-resident furniture when relevant.',
      cityKeywords: [
        'weslaco',
        'mercedes',
        'donna',
        'mid-valley',
        'weslaco tx',
      ],
    },
    {
      id: 'rural-colonia-edges',
      name: 'Rural edges, colonias & outlying pockets',
      shortName: 'Rural / Colonia Edges',
      neighborhoods: [
        'Outlying colonia communities',
        'Rural Hidalgo parcels',
        'Agricultural-edge homes',
        'Small communities off main arterials',
      ],
      housingTypes:
        'Rural SFH, manufactured homes, acreage edges, limited multi-unit',
      challenges: [
        'Private roads, incomplete paving, soft shoulders',
        'Limited truck turnaround',
        'Long deadhead and lower crew density',
        'Not interchangeable with McAllen apartment logistics',
      ],
      moverTips:
        'Access photos are mandatory — surface, width, turnaround, and clearance. Confirm vehicle size before dispatch. Price edge ↔ McAllen as long local with access risk explicit.',
      cityKeywords: [
        'colonia',
        'rural hidalgo',
        'outlying',
        'hidalgo county rural',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Hidalgo County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on apartment elevators in McAllen, rural access on colonia edges, Expressway 83 cross-Valley time, and heat-related pacing — this is not Triangle HOA pricing logic alone.',
    drivers: [
      {
        title: 'Cross-Valley corridor time',
        detail:
          'Mission ↔ Weslaco, Edinburg ↔ Pharr, or any peak 83 / 281 leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'Rural / colonia access',
        detail:
          'Soft roads, limited turnaround, and long carries add labor hours and risk — photos prevent underquotes.',
      },
      {
        title: 'Multi-unit medical/retail core access',
        detail:
          'Elevators, COI, and short-notice apartment turnover in McAllen and Edinburg add coordination soft costs.',
      },
      {
        title: 'Heat-related pacing',
        detail:
          'Extreme heat can slow outdoor packing and require earlier starts or extra labor to finish safely.',
      },
      {
        title: 'Seasonal and family inventory complexity',
        detail:
          'Winter-visitor and multi-generational households often mean heavier outdoor furniture and medical equipment — inventory accuracy matters.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,250+',
        note: 'Higher with elevators, heat delays, or long portal time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,100–$3,400+',
        note: 'Cross-Valley hauls and multi-unit access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural edge)',
        value: '$1,900–$5,800+',
        note: 'Colonia/rural access and Mid-Valley long locals price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$170+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, extreme heat & Valley-calendar intelligence',
    intro:
      'RGV heat dominates summer operations. Winter visitor patterns, school calendars, and family moves set secondary peaks — not Triangle tech-transfer scripts.',
    items: [
      {
        title: 'Extreme summer heat (primary constraint)',
        detail:
          'Afternoon heat and humidity make open staging inefficient and risky. Prefer earliest morning starts roughly May–September; protect electronics and sealed goods.',
      },
      {
        title: 'School-calendar residential peaks',
        detail:
          'Late spring and August weekends fill family moves across McAllen, Edinburg, Mission, and Mid-Valley. Book 2–3 weeks ahead when flexible.',
      },
      {
        title: 'Winter visitor / seasonal resident windows',
        detail:
          'Cooler months bring seasonal households and different inventory mixes. Still plan around holiday weeks when crews thin out.',
      },
      {
        title: 'University calendar (Edinburg)',
        detail:
          'UTRGV-related turnover can spike multi-family demand near campus — mid-week alternatives often stage cleaner than peak weekends.',
      },
      {
        title: 'Best value: mid-month weekday dawn starts',
        detail:
          'Avoid last-Saturday lease collisions. Dawn crews beat heat better than any discount on a noon summer load-out.',
      },
    ],
  },
  specialized: [
    {
      id: 'rgv-polycentric-heat',
      title: 'RGV polycentric metro & extreme-heat logistics',
      intro:
        'Hidalgo County’s core problem is multi-city Valley routing plus heat — not Austin-north HOA paperwork or Houston SW master-planned defaults.',
      bullets: [
        'Name both cities on every estimate (e.g. Mission → Edinburg); “Hidalgo local” hides portal time.',
        'Prefer earliest morning starts; discuss heat pacing and crew size in writing for summer moves.',
        'Price 83 / 281 cross-Valley pairs honestly — map miles understate peak congestion.',
        'Collect apartment COI and elevator rules for McAllen and Edinburg multi-unit before booking.',
        'Buffer time near freight and bridge-adjacent corridors in Pharr and south-central pockets.',
      ],
    },
    {
      id: 'rural-colonia-access',
      title: 'Rural edges, colonias & access-survey module',
      intro:
        'Outlying parcels need truck-access discipline that McAllen apartment jobs may not — and that Triangle HOA scripts never mention.',
      bullets: [
        'Require approach photos: surface, width, overhead clearance, and turnaround before final pricing.',
        'Confirm vehicle size; full-size trucks may not fit private or incomplete roads.',
        'Ask whether “local” rate cards still apply for rural edge ↔ McAllen medical-core pairs.',
        'Plan dust and heat protection for open-lot packing on agricultural edges.',
        'Inventory manufactured-home and multi-generational loads carefully — shapes and weight differ from apartment studios.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hidalgo County?',
    intro:
      'McAllen medical/retail living, Edinburg university/government, Mission west residential, Mid-Valley towns, and rural edges are different bets — and none of them are Texas Triangle suburbs. Pick the city pocket first, then validate schools, healthcare, heat tolerance, and commute patterns on 83 / 281.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Hidalgo County spans multiple districts (e.g., McAllen ISD, Edinburg CISD, Mission CISD, Pharr-San Juan-Alamo ISD, Weslaco ISD, Donna ISD, La Joya ISD, Sharyland ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'City-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and outlying pockets can span feeders.',
          },
          {
            title: 'Polycentric systems',
            detail:
              'Enrollment and program offerings differ across McAllen, Edinburg, Mission, PSJA, and Mid-Valley districts — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'UTRGV (Edinburg and regional presence) and South Texas College shape staff and student housing demand.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Valley acute-care anchors',
            detail:
              'DHR Health, South Texas Health System, and other McAllen–Edinburg–Mission area campuses dominate regional care — map ER drive times from Mid-Valley or rural edges at peak heat and traffic.',
          },
          {
            title: 'Regional specialty reality',
            detail:
              'Some specialties require travel to San Antonio or elsewhere. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records early; book first appointments before peak summer heat and school-move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by city pocket',
            detail:
              'McAllen multi-family, Edinburg growth, Mission residential, Mid-Valley towns, and rural edges often price differently. Compare total monthly costs (cooling utilities, insurance, commute), not sticker price alone.',
          },
          {
            title: 'Stock variety beyond HOAs',
            detail:
              'Apartments, in-town SFH, manufactured homes, and colonia-edge housing are common — do not assume master-planned Triangle product.',
          },
          {
            title: 'Heat-driven utility costs',
            detail:
              'Cooling in peak summer is a major budget line. Factor utility estimates into “affordable” addresses.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'McAllen core amenities',
            detail:
              'Medical, retail, and dining density — with apartment logistics and 83 congestion.',
          },
          {
            title: 'Edinburg university / government',
            detail:
              'Campus energy and public-sector adjacency — with multi-family peaks.',
          },
          {
            title: 'Mission / west residential',
            detail:
              'Suburban Valley living with McAllen access — still heat and corridor timing.',
          },
          {
            title: 'Mid-Valley or rural edges',
            detail:
              'Quieter towns or acreage — only if you accept longer service distances and access constraints.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, education, retail, government, logistics, agriculture-related, and trade-adjacent employment — not Austin tech campuses or Houston energy towers as the default story.',
          },
          {
            title: 'Valley corridor patterns',
            detail:
              'Many commutes stay inside Hidalgo on Expressway 83, 281, and local arterials. Peak heat and school traffic should drive housing choice more than brochure distance.',
          },
          {
            title: 'Regional isolation from the Triangle',
            detail:
              'San Antonio is the nearer large inland hub; DFW/Houston/Austin are long hauls. Plan career and travel expectations accordingly.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'RGV climate reality',
            detail:
              'Very hot summers with humidity, mild winters, intense sun — plan move days and daily life around heat safety.',
          },
          {
            title: 'Border-metro culture',
            detail:
              'Bilingual daily life, family ties across the border region, and Valley food culture shape neighborhoods in ways Triangle suburbs do not. Visit multiple cities before choosing.',
          },
          {
            title: 'Polycentric living',
            detail:
              'You may work in McAllen, live in Mission, and use Edinburg services — test real drive times at 7:30 a.m. and 5:30 p.m. before signing a lease.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Hidalgo County resources',
    intro:
      'Official links and licensing notes — heat, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'Hidalgo County',
        href: 'https://www.hidalgocounty.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of McAllen',
        href: 'https://www.mcallen.net/',
        external: true,
      },
      {
        label: 'City of Edinburg',
        href: 'https://www.cityofedinburg.com/',
        external: true,
      },
      {
        label: 'City of Mission',
        href: 'https://www.missiontexas.us/',
        external: true,
      },
      {
        label: 'City of Pharr',
        href: 'https://www.pharr-tx.gov/',
        external: true,
      },
      {
        label: 'City of Weslaco',
        href: 'https://www.weslacotx.gov/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check Expressway 83 and corridor delays',
        external: true,
      },
      {
        label: 'National Weather Service — Brownsville/RGV',
        href: 'https://www.weather.gov/bro/',
        note: 'Heat and severe-weather alerts for move planning',
        external: true,
      },
      {
        label: 'TxDMV — motor carrier / household goods',
        href: 'https://www.txdmv.gov/',
        note: 'Texas Department of Motor Vehicles (intrastate frameworks)',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (McAllen, Edinburg, Mission/West, Pharr/PSJA, Mid-Valley, Rural/Colonia Edges) when available. Confirm heat-aware start times, access photos for rural edges, and honest Expressway 83 portal time — not DFW, Houston, Austin, or El Paso mountain/PCS assumptions.',
  lastReviewed: '2026-07-23',
};
