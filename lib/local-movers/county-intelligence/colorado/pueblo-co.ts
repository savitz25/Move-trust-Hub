import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Pueblo County, CO — southern Colorado regional hub
 * (not Front Range boilerplate, not Colorado Springs military clone).
 */
export const puebloCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'pueblo',
  hubTitle: 'Pueblo County Moving Intelligence Hub',
  eyebrow: 'Pueblo · southern Colorado hub, industrial heritage & I-25 logistics',
  h1: 'Moving in Pueblo County: Southern Colorado Access, Industrial Edges & I-25 Logistics',
  heroOpener:
    'Pueblo County is southern Colorado’s regional hub — Pueblo core grids and Belmont family stock, industrial-edge workforce housing, Pueblo West acreage and HOA mix, and I-25 / US-50 pairs that connect El Paso County north and the lower Arkansas Valley east. A downtown walk-up, a south-side bungalow, a Pueblo West ranch on a long driveway, and a county-line rural lot do not share truck access or crew skill. I-25, US-50, CO-47, and Pueblo Blvd corridors turn short map miles into billable hours when peak commute and weather windows collide. This hub is for people moving in Pueblo County — not a renamed Front Range high-growth page or Colorado Springs military template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Southern Colorado regional hub & I-25 corridor awareness · Curated listings',
  majorCorridors: 'I-25 · US-50 · CO-47 · Pueblo Blvd corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Pueblo County different',
    intro:
      'These are Pueblo and southern Colorado realities — regional-hub scale, industrial-edge product, and Pueblo West acreage logistics — not Denver/Front Range HOA boilerplate or El Paso military PCS volume.',
    bullets: [
      {
        title: 'Southern Colorado regional-hub scale, not Front Range micro-markets',
        detail:
          'Crew density, specialty equipment, and same-day multi-stop options are thinner than Denver or Colorado Springs. Long empty miles and booking lead time matter more here.',
      },
      {
        title: 'Pueblo core older stock vs Pueblo West acreage is not one job',
        detail:
          'Central grids need curb and stair surveys; Pueblo West and county-edge ranches need driveway length, soft shoulders, and outbuilding inventories — not a single “Pueblo rate.”',
      },
      {
        title: 'I-25, US-50, CO-47, and Pueblo Blvd rewrite portal time',
        detail:
          'North Pueblo ↔ Pueblo West, Belmont ↔ industrial edges, or US-50 east pairs look local and still burn 30–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Industrial heritage and workforce housing shape access patterns',
        detail:
          'Steelworks-adjacent and east/south industrial-residential blocks mix multifamily, modest SFH, and truck-traffic timing that suburban HOA quotes underprice.',
      },
      {
        title: 'Cross-county southern Front Range and valley pairs are routine',
        detail:
          'Households regularly move Pueblo ↔ El Paso (Colorado Springs), Fremont, Huerfano, or east along US-50. Clarify addresses so Colorado PUC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Colorado.',
      },
      {
        title: 'Pueblo is not Colorado Springs and not Front Range boilerplate',
        detail:
          'Regional-hub pricing, industrial edges, and Pueblo West plains/acreage character differ from Fort Carson PCS markets and Denver-collar HOA belts. Do not reuse those packs with a city rename.',
      },
      {
        title: 'Weather, wind, and summer heat reshape open carries',
        detail:
          'High-plains wind, monsoonal storms, and winter freeze–thaw affect exterior paths and rural drives. Prefer early starts and flexible weather windows.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Pueblo County access zones',
  zonesIntro:
    'Plan by central/downtown Pueblo, Belmont and north family corridors, south/east industrial-residential edges, Pueblo West acreage and HOA mix, and rural county pockets — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'central-pueblo',
      name: 'Central Pueblo, downtown & historic grids',
      shortName: 'Central Pueblo',
      neighborhoods: [
        'Downtown Pueblo',
        'Union Avenue edges',
        'Historic central grids',
        'Near-downtown multifamily',
        'Riverwalk-adjacent product',
      ],
      housingTypes: 'Older SFH, walk-ups, multifamily, mixed commercial-edge product',
      challenges: [
        'Limited curb and stair-heavy older stock',
        'I-25 / Pueblo Blvd approach congestion into the core',
        'Mixed alley and street staging by block',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm unit access type on multifamily before the crew day.',
      cityKeywords: [
        'pueblo',
        'downtown pueblo',
        'union avenue',
        'riverwalk',
        'central',
      ],
    },
    {
      id: 'belmont-north',
      name: 'Belmont, north Pueblo & family SFH corridors',
      shortName: 'Belmont / north',
      neighborhoods: [
        'Belmont',
        'North Pueblo family corridors',
        'University edges',
        'Established SFH grids',
        'Northside multifamily edges',
      ],
      housingTypes: 'Established SFH, basements, some townhomes and multifamily',
      challenges: [
        'Tree-lined curb with limited truck length',
        'Basement carries and older driveway geometry',
        'CO-47 / I-25 approach timing',
      ],
      moverTips:
        'Survey stairs and driveway turn radius. Build I-25 / CO-47 buffers for cross-town pairs. Inventory basement items carefully.',
      cityKeywords: [
        'belmont',
        'north pueblo',
        'university',
        'northside',
      ],
    },
    {
      id: 'south-east-industrial',
      name: 'South & east industrial-residential edges',
      shortName: 'South / east edges',
      neighborhoods: [
        'South Pueblo corridors',
        'East industrial-adjacent residential',
        'Bessemer edges',
        'Workforce multifamily',
        'US-50 east approaches',
      ],
      housingTypes: 'Modest SFH, multifamily, workforce rentals, mixed industrial-edge product',
      challenges: [
        'Truck traffic and shift-adjacent congestion',
        'Tight parking on multifamily product',
        'Longer carries and mixed alley staging',
      ],
      moverTips:
        'Confirm parking and stair photos. Build US-50 / industrial-edge buffers. Price empty miles to Pueblo West or north destinations honestly.',
      cityKeywords: [
        'bessemer',
        'south pueblo',
        'east pueblo',
        'industrial',
        'us-50',
      ],
    },
    {
      id: 'pueblo-west',
      name: 'Pueblo West acreage, HOA mix & long-driveway product',
      shortName: 'Pueblo West',
      neighborhoods: [
        'Pueblo West core',
        'Pueblo West acreage edges',
        'HOA and covenant tracts',
        'Long-driveway ranch product',
        'US-50 west approaches',
      ],
      housingTypes: 'Ranch SFH, acreage, some HOA/covenant tracts, outbuildings',
      challenges: [
        'Long driveways and limited turn radius',
        'Soft shoulders and rural staging constraints',
        'US-50 / I-25 links burn clock into city unload addresses',
      ],
      moverTips:
        'Survey driveway length, surface, and truck access before finalizing crew size. Inventory outbuildings. Price travel time from city yards honestly.',
      cityKeywords: [
        'pueblo west',
        'acreage',
        'ranch',
        'long driveway',
      ],
    },
    {
      id: 'st-charles-mesa',
      name: 'St. Charles Mesa, Blende & east-valley edges',
      shortName: 'Mesa / east valley',
      neighborhoods: [
        'St. Charles Mesa',
        'Blende edges',
        'East valley residential',
        'County-edge SFH',
        'US-50 east corridors',
      ],
      housingTypes: 'SFH, larger lots, some agricultural-edge product',
      challenges: [
        'Longer empty miles from central yards',
        'Mixed paved and rural approach geometry',
        'Weather exposure on open mesa paths',
      ],
      moverTips:
        'Confirm approach roads and staging. Build US-50 buffers. Prefer early starts when heat or wind forecasts are severe.',
      cityKeywords: [
        'st charles mesa',
        'blende',
        'mesa',
        'east valley',
      ],
    },
    {
      id: 'rural-county-pockets',
      name: 'Rural Pueblo County pockets & southern plains edges',
      shortName: 'Rural pockets',
      neighborhoods: [
        'Southern rural pockets',
        'Western county edges',
        'Farm and ranch properties',
        'Small unincorporated communities',
        'Outbuilding-heavy lots',
      ],
      housingTypes: 'Rural SFH, farmhouses, acreage, shops and outbuildings',
      challenges: [
        'Long empty miles and limited crew density',
        'Dirt/gravel drives and weather-sensitive access',
        'Outbuilding inventories and equipment access',
      ],
      moverTips:
        'Inventory outbuildings explicitly. Confirm driveway surface and truck length. Price travel and weather risk honestly — do not use city flat rates.',
      cityKeywords: [
        'rural',
        'farm',
        'ranch',
        'acreage',
        'unincorporated',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pueblo County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Older-stock labor, Pueblo West driveway friction, rural empty miles, and I-25 / US-50 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Older core stairs, basements & curb friction',
        detail:
          'Central and Belmont product adds flight counts and staging risk before packing skill matters.',
      },
      {
        title: 'Pueblo West long driveways & rural staging',
        detail:
          'Acreage access, soft shoulders, and outbuildings rewrite crew hours versus city bungalow assumptions.',
      },
      {
        title: 'I-25 · US-50 · CO-47 · Pueblo Blvd congestion',
        detail:
          'Cross-zone and El Paso–linked pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Thinner regional crew density & multi-county empty miles',
        detail:
          'Southern Colorado scale raises travel and booking lead time versus Front Range metro markets.',
      },
      {
        title: 'Weather: wind, heat, freeze–thaw',
        detail:
          'Open-path work slows in wind, summer heat, and winter ice — especially mesa and rural addresses.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,500+',
        note: 'Higher with stairs, rural travel, or peak I-25 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,100–$3,400+',
        note: 'Basements, curb friction, and corridor buffers trend up',
      },
      {
        label: '3–4+ BR / Pueblo West acreage / cross-zone SFH',
        value: '$2,200–$6,500+',
        note: 'Long driveways, outbuildings, and El Paso-linked pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$165+/hr',
        note: 'Portal-to-portal; packing, rural travel, and weather delays scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Pueblo County move',
    intro:
      'School calendars, summer family demand, thinner regional crew pools, and plains weather reshape access and availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, reduce I-25 / US-50 pain, and avoid heat peaks in summer. Avoid month-end Fridays when leases cluster.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays and lease turnover fill first. Book 2–4 weeks ahead for peak weekends — lead time matters more when regional crew density is thinner.',
      },
      {
        title: 'Winter: freeze–thaw, ice, and wind',
        detail:
          'November–March adds curb shrinkage, icy rural drives, and weather cancellations. Prefer flexible dates, early starts, and contingency for salt and soft shoulders.',
      },
      {
        title: 'Shoulder seasons and cross-county El Paso pairs',
        detail:
          'Spring and fall can offer better crew availability. Colorado Springs–linked jobs still need I-25 buffers and authority clarity on every estimate.',
      },
    ],
  },
  specialized: [
    {
      id: 'southern-hub-pueblo',
      title: 'Southern Colorado regional-hub logistics module',
      intro:
        'Pueblo estimates fail more often on empty miles, thinner crew pools, and zone-product mismatch than on packing skill alone.',
      bullets: [
        'Book peak weekends earlier than you would in denser Front Range markets.',
        'Price portal-to-portal time for any pair that rides I-25, US-50, CO-47, or Pueblo Blvd at peak.',
        'Survey central older stock and Pueblo West acreage as different job types — not one city rate.',
        'Clarify El Paso, Fremont, or US-50 valley destinations so travel and Colorado PUC HHG vs FMCSA assumptions stay accurate.',
        'Build weather contingency for wind, heat, and winter ice on open and rural paths.',
      ],
    },
    {
      id: 'pueblo-west-rural',
      title: 'Pueblo West acreage & rural access module',
      intro:
        'Long driveways and outbuildings break city bungalow scopes when surveys skip approach geometry.',
      bullets: [
        'Measure or photo driveway length, surface, and turn radius before finalizing truck size.',
        'Inventory shops, barns, and detached structures explicitly.',
        'Confirm soft-shoulder staging and power-line clearance on rural approaches.',
        'Price empty miles from central Pueblo yards honestly for mesa and county-edge addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pueblo County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, jobs, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Pueblo City Schools (District 60), Pueblo County School District 70 (including Pueblo West and many county areas), and other address-based systems cover the market. Neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Colorado State University Pueblo and Pueblo Community College shape some housing demand and cultural life. Align leases with academic calendars if campus-adjacent.',
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
              'Parkview Medical Center and other regional providers anchor care in Pueblo. Some specialty care pulls north toward Colorado Springs or Denver metro.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from your target neighborhood to preferred campuses — I-25 and US-50 realities change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core grids, Belmont family stock & Pueblo West acreage',
            detail:
              'Expect older central and industrial-edge product, established Belmont SFH, Pueblo West ranch and acreage living, and rural county lots with outbuildings.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents are often more approachable than northern Front Range premium markets, with variation between city bungalows, Belmont corridors, and Pueblo West lots. Budget for older-home repair risk, well/septic on rural properties, and insurance.',
          },
          {
            title: 'Covenants and multifamily governance',
            detail:
              'Pueblo West covenants and apartment managers may control move hours, truck access, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Pueblo areas fit whom',
        bullets: [
          {
            title: 'Central / downtown character living',
            detail:
              'Suits people prioritizing walkable edges and historic stock — with curb, stair, and older-building logistics.',
          },
          {
            title: 'Belmont and north family corridors',
            detail:
              'Often appeals for established neighborhoods and services — with basement carries and arterial timing.',
          },
          {
            title: 'Pueblo West space and acreage lifestyle',
            detail:
              'Attracts households seeking lots, shops, and quieter streets — with long-driveway access and US-50 commute realism into the city.',
          },
          {
            title: 'Rural county and mesa edges',
            detail:
              'Fits buyers chasing agricultural adjacency or larger land packages — with weather exposure and empty-mile pricing on moves.',
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
              'Healthcare, education, government, manufacturing and industrial operations, logistics along I-25/US-50, retail, and some commuters toward Colorado Springs employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-25, US-50, CO-47, and Pueblo Blvd peaks are real. Test-drive peak routes before choosing solely on rent or purchase price — especially Pueblo West ↔ city and northbound El Paso pairs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Southern Colorado hub with industrial roots and outdoor access',
            detail:
              'Pueblo stacks Riverwalk culture, chile and regional food identity, industrial heritage, and plains-to-foothills outdoor access — different from Front Range tech corridors or Colorado Springs military-installation rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'High-plains sun and wind, hot summers, cold winters, and rapid storm swings. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Regional downtown amenities, family sports calendars, and quieter rural edges coexist. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pueblo County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Pueblo County — official site',
        href: 'https://county.pueblo.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Pueblo',
        href: 'https://www.pueblo.us/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Pueblo West Metro District',
        href: 'https://pueblowestmetro.com/',
        external: true,
        note: 'Pueblo West community info',
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
    'Prefer crews with older-stock stair/basement experience for central and Belmont product; long-driveway and outbuilding fluency for Pueblo West and rural pockets; honest I-25 · US-50 · CO-47 · Pueblo Blvd timing for cross-zone and El Paso-linked pairs; regional-hub lead-time realism for peak Saturdays; winter and wind readiness year-round. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
