import type { DestinationResourceLink } from '@/lib/destinations/types';

export type ArkansasCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type ArkansasClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  nwaCorridor: ArkansasCorridorCity[];
  centralArkansasCorridor: ArkansasCorridorCity[];
  westernBorderCorridor: ArkansasCorridorCity[];
  northeastArkansasCorridor: ArkansasCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const arkansasClusterContent: ArkansasClusterContent = {
  h1: 'Moving to Arkansas: Northwest Arkansas, Central AR, Fort Smith & Jonesboro City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Arkansas (2026) — Destination Guides, Costs & Trusted Movers | Move Trust Hub',
    description:
      'Explore Arkansas inbound moving guides for Rogers, Bentonville, Centerton, Springdale, Fayetteville, Bella Vista, Conway, Little Rock, Fort Smith, and Jonesboro. NWA corporate boom, low cost of living, Ozark recreation. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to arkansas',
      'arkansas movers',
      'northwest arkansas movers',
      'best cities to move to in arkansas 2026',
      'rogers bentonville fayetteville relocation',
      'arkansas interstate moving costs',
      'texas to arkansas moving',
      'nwa corporate relocation',
      'little rock arkansas movers',
      'fort smith jonesboro relocation',
    ],
    canonicalPath: '/moving-to/arkansas',
  },
  heroSubheadline:
    'Arkansas ranks among the fastest-growing affordable inbound destinations in the South Central corridor for 2026 — driven by Northwest Arkansas\'s explosive corporate expansion (Walmart, Tyson Foods, J.B. Hunt), Crystal Bridges cultural investment, Oz Trails mountain-biking outdoor lifestyle, and spillover affordability in Centerton, Bella Vista, Conway, and Little Rock riverfront neighborhoods. Rogers leads statewide inbound intent with Beaver Lake recreation, Walmart AMP concerts, and high household incomes; Bentonville anchors the Mountain Biking Capital with Walmart headquarters; and Centerton captures fastest-growing new construction demand minutes from corporate jobs. Our independent directory covers FMCSA-licensed interstate movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are targeting Rogers\' #1-ranked Arkansas livability with Beaver Lake and downtown shopping, Bentonville\'s Walmart headquarters corridor with Crystal Bridges and world-class trails, Centerton\'s affordable new construction near corporate campuses, Springdale\'s Tyson Foods industrial strength and Arvest Ballpark, Fayetteville\'s University of Arkansas campus energy on Dickson Street, Bella Vista\'s master-planned golf-and-lake recreation, Conway\'s City of Colleges tech growth, Little Rock\'s state-capital riverfront employment, Fort Smith\'s border-city logistics hub, or Jonesboro\'s northeast Arkansas university and healthcare corridor, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare movers directly on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Arkansas moves involve South Central logistics that generic guides overlook: fewer direct interstate carrier lanes than coastal metros, new-build NWA subdivision shuttle requirements, Ozark foothill driveway access in growing suburbs, Little Rock riverfront elevator constraints, and summer humidity loading windows — factors our city guides surface so you can plan with confidence.',
    'Ten live Arkansas hubs span the Northwest Arkansas corridor (Rogers, Bentonville, Centerton, Springdale, Fayetteville, Bella Vista), central Arkansas (Conway, Little Rock), western border (Fort Smith), and northeast Arkansas (Jonesboro). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  nwaCorridor: [
    {
      slug: 'rogers-ar',
      displayName: 'Rogers',
      zip: '72756',
      tagline: '#1 in Arkansas · Beaver Lake · Walmart AMP · downtown shopping · high incomes',
    },
    {
      slug: 'bentonville-ar',
      displayName: 'Bentonville',
      zip: '72712',
      tagline: 'Walmart HQ · Crystal Bridges · Mountain Biking Capital of the World',
    },
    {
      slug: 'centerton-ar',
      displayName: 'Centerton',
      zip: '72719',
      tagline: 'Fastest-growing city · affordable new construction near Bentonville',
    },
    {
      slug: 'springdale-ar',
      displayName: 'Springdale',
      zip: '72764',
      tagline: 'Tyson Foods HQ · industrial strength · Arvest Ballpark',
    },
    {
      slug: 'fayetteville-ar',
      displayName: 'Fayetteville',
      zip: '72701',
      tagline: 'University of Arkansas · Dickson Street · progressive college town',
    },
    {
      slug: 'bella-vista-ar',
      displayName: 'Bella Vista',
      zip: '72714',
      tagline: 'Master-planned recreation · golf courses · lakes · retiree & family appeal',
    },
  ],
  centralArkansasCorridor: [
    {
      slug: 'conway-ar',
      displayName: 'Conway',
      zip: '72034',
      tagline: 'City of Colleges · young demographic · tech & manufacturing growth',
    },
    {
      slug: 'little-rock-ar',
      displayName: 'Little Rock',
      zip: '72201',
      tagline: 'State capital · riverfront · government · banking · healthcare jobs',
    },
  ],
  westernBorderCorridor: [
    {
      slug: 'fort-smith-ar',
      displayName: 'Fort Smith',
      zip: '72901',
      tagline: 'Border city · industrial & logistics · historic downtown revival',
    },
  ],
  northeastArkansasCorridor: [
    {
      slug: 'jonesboro-ar',
      displayName: 'Jonesboro',
      zip: '72401',
      tagline: 'NE Arkansas hub · Arkansas State University · agriculture & healthcare',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Arkansas in 2026',
      paragraphs: [
        'Arkansas has emerged from regional obscurity into one of the nation\'s most discussed growth corridors, powered almost entirely by Northwest Arkansas (NWA). Rogers ranks #1 among Arkansas inbound destinations with Beaver Lake recreation, Walmart AMP entertainment, downtown shopping districts, and among the highest household incomes in the state. Bentonville anchors Walmart corporate relocations with Crystal Bridges Museum of American Art and the Oz Trails network that earned the region Mountain Biking Capital status. Centerton posts the fastest municipal growth rates with affordable new construction for buyers priced out of Bentonville proper. Springdale delivers Tyson Foods headquarters employment and industrial logistics strength alongside Arvest Ballpark community energy. Fayetteville adds University of Arkansas research culture and Dickson Street arts nightlife. Bella Vista offers master-planned golf, lake, and trail recreation for families and retirees seeking Ozark foothill lifestyle without NWA commute stress.',
        'Central Arkansas complements NWA\'s corporate narrative. Conway — the City of Colleges — attracts young professionals and families drawn to tech and manufacturing growth, three higher-education institutions, and low crime outside the NWA price curve. Little Rock, the state capital, concentrates government, banking, and healthcare employment along the Arkansas River with riverfront revitalization and established suburban inventory in Pulaski County. Compared to Dallas, Nashville, or Austin, Arkansas metros deliver meaningfully lower interstate moving costs and ongoing living expenses.',
        'Beyond NWA and central Arkansas, Fort Smith serves as a western border logistics and manufacturing hub with historic downtown investment along the Oklahoma line. Jonesboro anchors northeast Arkansas with Arkansas State University, regional healthcare expansion, and agriculture-adjacent employment that draws households from Memphis, Missouri, and Tennessee spillover corridors. No two Arkansas corridors move alike — compare quotes on identical inventory rather than choosing the lowest phone estimate.',
      ],
    },
    {
      heading: 'How to choose an interstate mover for an Arkansas delivery',
      paragraphs: [
        'Start with FMCSA verification. Every interstate carrier must have a USDOT number and, if operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball estimates based on phone guesses are the leading cause of moving-day price disputes on I-49 and I-40 corridors into NWA. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about Arkansas-specific accessorials. New construction streets in Bentonville, Centerton, and Rogers may require shuttle trucks. Ozark foothill driveways in Bella Vista and Pea Ridge can limit trailer turnaround. Little Rock riverfront condos may need elevator scheduling. Fewer carriers serve Arkansas directly — confirm whether your quote includes linehaul to a regional hub or direct delivery.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable interstate carriers do not demand large upfront cash payments via wire transfer or cryptocurrency.',
      ],
    },
    {
      heading: 'Regional Arkansas moving corridors at a glance',
      paragraphs: [
        'Northwest Arkansas (Benton and Washington counties) handles the highest statewide inbound volume. Rogers leads with Beaver Lake, Walmart AMP, and high-income suburban planning; Bentonville anchors Walmart HQ with Crystal Bridges and mountain-biking infrastructure; Centerton captures fastest-growing affordable new construction; Springdale offers Tyson Foods employment and Arvest Ballpark community identity; Fayetteville combines U of A campus culture with Dickson Street arts energy; and Bella Vista delivers master-planned golf-and-lake recreation at the Ozark foothills.',
        'Central Arkansas splits between Conway and Little Rock. Conway in Faulkner County attracts families and young professionals drawn to its City of Colleges identity, tech job growth, and manufacturing expansion on the I-40 corridor. Little Rock in Pulaski County concentrates state-government, banking, and healthcare employment with riverfront neighborhoods and established suburban inventory. Fort Smith on the Oklahoma border serves industrial and logistics relocations with historic downtown revival. Jonesboro in Craighead County anchors northeast Arkansas with Arkansas State University, regional healthcare, and agriculture-adjacent employment.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Verify any mover\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup and complaint-ratio interpretation.',
      href: '/resources/fmcsa',
    },
    {
      title: 'Common moving scams & how to avoid them',
      description: 'Eight red flags and deposit best practices before booking.',
      href: '/resources/scams',
    },
    {
      title: 'Browse Benton County local movers',
      description: 'Rogers, Bentonville, Centerton, and Bella Vista NWA mover directory.',
      href: '/local-movers/arkansas/benton',
    },
    {
      title: 'Browse Washington County local movers',
      description: 'Fayetteville and Springdale mover directory.',
      href: '/local-movers/arkansas/washington',
    },
    {
      title: 'Browse Faulkner County local movers',
      description: 'Conway City of Colleges mover directory.',
      href: '/local-movers/arkansas/faulkner',
    },
    {
      title: 'Browse Pulaski County local movers',
      description: 'Little Rock state capital mover directory.',
      href: '/local-movers/arkansas/pulaski',
    },
    {
      title: 'Browse Sebastian County local movers',
      description: 'Fort Smith western border mover directory.',
      href: '/local-movers/arkansas/sebastian',
    },
    {
      title: 'Browse Craighead County local movers',
      description: 'Jonesboro northeast Arkansas mover directory.',
      href: '/local-movers/arkansas/craighead',
    },
    {
      title: 'Room-by-room packing checklist',
      description: 'Prepare your inventory before requesting fair quotes.',
      href: '/resources/packing-checklist',
    },
    {
      title: 'Compare movers side-by-side',
      description: 'Select up to 4 carriers and compare reputation and services.',
      href: '/compare',
    },
  ],
};