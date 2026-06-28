/**
 * Generates Hawaii cluster parent + 10 sub-city CityHubContent files.
 * Run: node scripts/generate-hawaii-destination-content.mjs
 */
import fs from 'fs';
import path from 'path';

const contentDir = 'lib/destinations/content';

const COST_TIERS = {
  oahuPremium: {
    studio: '$4,500 – $9,500',
    two: '$7,500 – $14,500',
    three: '$11,000 – $19,500',
    fourFixed: '$15,500 – $26,500',
    note:
      'Peak season (May–September) typically adds 15–25% to mainland-to-Oahu container rates as California and Washington corporate transfer clusters, military PCS windows, and summer family relocations compress Honolulu port drayage availability. West Coast origins (California, Washington, Oregon) benefit from shortest Pacific shipping lanes via Oakland, Long Beach, or Seattle; Texas, Arizona, and Colorado relocations involve longer port-to-port windows. Honolulu high-rise COI coordination, hillside long carries, and Waikīkī shuttle staging can add $600–$3,500 at destination. Ranges reflect California, Washington, Texas, and Arizona origins; data aggregated from FMCSA-licensed carriers and verified quote patterns. Hawaii-bound household goods ship by ocean container — not over-the-road interstate trucking.',
  },
  oahuMid: {
    studio: '$4,200 – $9,000',
    two: '$7,000 – $13,500',
    three: '$10,500 – $18,500',
    four: '$14,500 – $25,000',
    note:
      'Peak season (May–September) typically adds 15–25% to mainland-to-Oahu container rates as West Coast spillover clusters and military PCS windows compress carrier availability at Honolulu Harbor. California and Washington origins route most efficiently through Pacific ports; inland origins add overland linehaul before container loading. Suburban cul-de-sac shuttle staging, condo move-in scheduling, and windward hillside accessorials can add $500–$3,200 at destination. Ranges reflect California, Washington, Texas, and Arizona origins. All Hawaii deliveries require ocean container transit — plan 14–28 day windows from mainland pack-out to Oahu delivery.',
  },
  neighborIsland: {
    studio: '$4,800 – $10,500',
    two: '$8,000 – $15,500',
    three: '$11,500 – $20,500',
    four: '$16,000 – $28,000',
    note:
      'Neighbor-island deliveries often route mainland container → Honolulu Harbor → inter-island barge or air freight, adding 3–10 days and $800–$4,500 versus direct Oahu delivery depending on volume and carrier. Peak season (May–September) compresses both mainland port capacity and inter-island barge schedules. California and Washington origins remain the most efficient mainland gateways. Ranges reflect California, Washington, Texas, and Arizona origins with neighbor-island final-mile included or itemized — confirm inter-island leg disclosure in writing before booking.',
  },
  hilo: {
    studio: '$4,500 – $9,800',
    two: '$7,500 – $14,500',
    three: '$10,800 – $19,000',
    four: '$15,000 – $26,000',
    note:
      'Hilo deliveries on Hawaiʻi Island\'s windward side often route via Honolulu transshipment with Hilo Harbor final-mile — among the more affordable Big Island inbound markets relative to Kailua-Kona\'s leeward premium. Peak season adds 15–25% to container baselines. California and Washington origins dominate inbound volume. Rainforest hillside long carries and narrow Hāmākua Coast access roads can add $500–$3,000 at destination. Plan 18–35 day total transit from mainland pack-out.',
  },
};

const cities = [
  {
    file: 'honolulu-hi.ts',
    export: 'honoluluHiContent',
    slug: 'honolulu-hi',
    name: 'Honolulu',
    zip: '96813',
    county: 'Honolulu',
    countyPath: '/local-movers/hawaii/honolulu',
    island: 'Oahu',
    tier: 'oahuPremium',
    transit: '14–28',
    tagline: 'Dynamic urban capital · Kakaʻako luxury growth · cultural hub',
    inboundStat: 'Dynamic urban capital · Kakaʻako luxury growth · cultural hub',
    hook: 'Honolulu anchors Hawaiʻi as the state\'s dynamic urban capital — a City & County of Honolulu destination where Kakaʻako luxury high-rise growth, Ala Moana employment corridors, Pearl Harbor-adjacent defense hiring, and world-class cultural institutions draw households from California, Washington, Texas, and Arizona in 2026.',
    why: 'Honolulu posts Hawaiʻi\'s highest urban inbound volume — a capital-city growth story powered by Kakaʻako Ward Village and SALT at Our Kakaʻako luxury development, downtown financial and legal employment, Queen\'s Medical Center and Straub health-system hiring, University of Hawaiʻi Mānoa research roles, and genuine island cultural density from Bishop Museum to the Honolulu Museum of Art. Buyers trading West Coast metro premiums discover they can target Kaimukī bungalows, Mānoa valley homes with rainforest views, or Kakaʻako high-rise inventory while keeping Honolulu International Airport connectivity and Oʻahu employment within a manageable daily commute.',
    neighborhoods: 'Honolulu\'s footprint extends well beyond ZIP 96813. Kakaʻako captures luxury condo and mixed-use growth with walkable dining and waterfront access. Mānoa and Manoa Valley deliver established residential inventory with university proximity and lush valley character. Kaimukī and Diamond Head corridors attract families wanting walkable neighborhood culture with beach access minutes away. Downtown and Ala Moana serve professionals prioritizing transit-adjacent employment and retail density. Each address type creates different final-mile logistics — a Kakaʻako high-rise with freight-elevator COI requirements, a Mānoa hillside home with narrow driveway constraints, and an Ala Moana townhome should never share the same accessorial assumptions.',
    logistics: 'Honolulu high-rise COI coordination, Waikīkī tourist-corridor traffic, and Kakaʻako construction-zone staging affect delivery windows year-round. Military PCS peaks (May–August) and California corporate transfer clusters compress Honolulu Harbor drayage schedules — book 8–12 weeks ahead during peak windows.',
    compare: 'Kapolei for master-planned Second City value, Kailua for windward beach-town lifestyle, Pearl City for central transit convenience, or neighbor-island guides if you are weighing Maui, Big Island, or Kauaʻi alternatives.',
    crossSlugs: ['kapolei-hi', 'kailua-hi', 'pearl-city-hi', 'kihei-hi'],
  },
  {
    file: 'kapolei-hi.ts',
    export: 'kapoleiHiContent',
    slug: 'kapolei-hi',
    name: 'Kapolei',
    zip: '96707',
    county: 'Honolulu',
    countyPath: '/local-movers/hawaii/honolulu',
    island: 'Oahu',
    tier: 'oahuPremium',
    transit: '14–28',
    tagline: 'Oahu\'s Second City · master-planned housing & retail',
    inboundStat: 'Oahu\'s Second City · master-planned housing & retail',
    hook: 'Kapolei defines Oʻahu\'s Second City corridor — a master-planned west-side destination where new housing subdivisions, Ka Makana Aliʻi retail expansion, Ko Olina resort-adjacent employment, and Campbell Industrial Park logistics hiring draw families from California, Washington, and Texas seeking newer inventory than central Honolulu at competitive island pricing in 2026.',
    why: 'Kapolei has emerged as Honolulu County\'s fastest-growing planned-community inbound market — Oʻahu\'s Second City where master-planned neighborhoods, newer construction inventory, west-side affordability relative to urban Honolulu, and short H-1 commutes to downtown employment converge for mainland relocations. Buyers priced out of Kakaʻako high-rises or windward premiums discover they can target Makakilo hillside subdivisions, Ewa Beach spillover inventory, or Ko Olina-area townhomes while keeping west Oʻahu schools, retail, and industrial employment practical.',
    neighborhoods: 'Kapolei\'s growth corridors span ZIP 96707 and surrounding west Oʻahu communities. Makakilo delivers hillside views with newer subdivision inventory. Ewa Beach and Ewa Gentry capture family-oriented master-planned density near beaches. Ko Olina resort corridor attracts hospitality and healthcare professionals. Campbell Industrial Park adjacent areas serve logistics and energy-sector workers. New-build driveway access and HOA move-in scheduling are routine — document subdivision requirements when requesting quotes.',
    logistics: 'West Oʻahu H-1 commute peaks and new-construction staging zones affect Kapolei delivery scheduling. Container drayage from Honolulu Harbor to Kapolei final-mile typically adds a local leg — confirm whether your quote includes port-to-door service or treats harbor pickup separately.',
    compare: 'Honolulu for urban capital amenities, Waipahu for more affordable west-side entry, or Pearl City for central Oʻahu transit convenience.',
    crossSlugs: ['honolulu-hi', 'waipahu-hi', 'pearl-city-hi', 'kailua-hi'],
  },
  {
    file: 'kailua-hi.ts',
    export: 'kailuaHiContent',
    slug: 'kailua-hi',
    name: 'Kailua',
    zip: '96734',
    county: 'Honolulu',
    countyPath: '/local-movers/hawaii/honolulu',
    island: 'Oahu',
    tier: 'oahuMid',
    transit: '14–28',
    tagline: 'Windward beach lifestyle · walkable town center',
    inboundStat: 'Windward beach lifestyle · walkable town center',
    hook: 'Kailua anchors Oʻahu\'s windward coast as the island\'s premier beach-town lifestyle destination — a Kailua–Lanikai corridor where Kailua Beach and Lanikai Pillbox trail access, walkable town-center dining, and strong community character draw California and Pacific Northwest households prioritizing daily beach recreation over urban density in 2026.',
    why: 'Kailua consistently ranks among Oʻahu\'s most desirable windward communities — a beach-town inbound market where Kailua Bay recreation, Kalapawai Market walkability, Enchanted Lake family inventory, and Kailua Town dining density converge for mainland relocations seeking genuine coastal lifestyle without resort-price tags. Compared to Honolulu\'s urban capital or Kapolei\'s master-planned west side, Kailua skews toward windward quality-of-life premium with Pali Highway commute trade-offs.',
    neighborhoods: 'Kailua spans beach-adjacent inventory near Kailua Beach Park, Enchanted Lake waterfront and cul-de-sac subdivisions, and Kailua Town walkable corridors with boutique retail. Lanikai offers ultra-premium beach-access homes with exceptional Pillbox hike access. Each windward address type involves Pali Tunnel traffic realities for Honolulu employment commutes — factor commute tolerance when comparing Kailua against Pearl City or Kapolei.',
    logistics: 'Pali Highway tunnel closures and windward narrow residential streets affect Kailua final-mile scheduling. Beach-adjacent properties may require shuttle trucks and careful HOA move-in window coordination during peak summer beach season.',
    compare: 'Honolulu for urban employment density, Pearl City for central transit without windward premium, or Kihei on Maui for neighbor-island beach-town alternatives.',
    crossSlugs: ['honolulu-hi', 'pearl-city-hi', 'kapolei-hi', 'kihei-hi'],
  },
  {
    file: 'pearl-city-hi.ts',
    export: 'pearlCityHiContent',
    slug: 'pearl-city-hi',
    name: 'Pearl City',
    zip: '96782',
    county: 'Honolulu',
    countyPath: '/local-movers/hawaii/honolulu',
    island: 'Oahu',
    tier: 'oahuMid',
    transit: '14–28',
    tagline: 'Central transit convenience · strong job market',
    inboundStat: 'Central transit convenience · strong job market',
    hook: 'Pearl City anchors central Oʻahu as the island\'s transit-and-employment convenience corridor — a Pearl Harbor–adjacent destination where H-1 and H-2 connectivity, Pearl Harbor Naval Shipyard and military employment, and central suburban inventory draw families from California, Washington, and Texas seeking balanced commute access across Oʻahu in 2026.',
    why: 'Pearl City delivers among Oʻahu\'s most practical central-corridor inbound profiles — a suburban market where transit convenience to Honolulu and west Oʻahu employment, Pearl Harbor–adjacent defense hiring, and established family neighborhoods converge without windward or urban Honolulu price extremes. Buyers comparing Kapolei new-build inventory against central Oʻahu school-zone stability often land in Pearl City for H-1 flexibility.',
    neighborhoods: 'Pearl City inventory spans ZIP 96782 neighborhoods from Pacific Palisades hillside views to central Pearl City subdivisions with strong school-zone access. Pearl Harbor proximity supports military and shipyard households. Waimalu and Aiea spillover corridors add townhome and condo inventory with transit-adjacent convenience.',
    logistics: 'H-1 central corridor traffic peaks and military PCS windows (May–August) compress Pearl City delivery scheduling. Confirm port drayage and central Oʻahu shuttle requirements for hillside properties with limited truck access.',
    compare: 'Waipahu for more affordable west-side entry, Honolulu for urban capital roles, or Kailua for windward beach lifestyle premium.',
    crossSlugs: ['waipahu-hi', 'honolulu-hi', 'kapolei-hi', 'kailua-hi'],
  },
  {
    file: 'waipahu-hi.ts',
    export: 'waipahuHiContent',
    slug: 'waipahu-hi',
    name: 'Waipahu',
    zip: '96797',
    county: 'Honolulu',
    countyPath: '/local-movers/hawaii/honolulu',
    island: 'Oahu',
    tier: 'oahuMid',
    transit: '14–28',
    tagline: 'Affordable Oʻahu entry · diverse cuisine · suburban value',
    inboundStat: 'Affordable Oʻahu entry · diverse cuisine · suburban value',
    hook: 'Waipahu anchors west Oʻahu as the island\'s most accessible suburban entry point — an affordable Honolulu County corridor where diverse Filipino, Hawaiian, and Pacific Islander dining culture, established family neighborhoods, and competitive housing costs draw California and Texas households seeking Oʻahu lifestyle without Kakaʻako or windward premiums in 2026.',
    why: 'Waipahu posts consistent west Oʻahu inbound volume — an affordable suburban market where diverse culinary corridors along Farrington Highway, Waikele Premium Outlets retail access, and family-oriented inventory attract mainland relocations prioritizing value over luxury address prestige. Compared to Kapolei\'s newer master-planned growth, Waipahu skews toward established suburban character with mature neighborhood fabric.',
    neighborhoods: 'Waipahu spans ZIP 96797 neighborhoods from Waikele planned communities to central Waipahu established blocks with strong local food culture. Royal Kunia and Village Park subdivisions attract families seeking west-side value. Each area involves H-1 commute planning for Honolulu employment — document your workplace location when comparing Waipahu against Pearl City or Kapolei.',
    logistics: 'West Oʻahu H-1 traffic and established-neighborhood narrow streets affect Waipahu final-mile delivery. Affordable inventory often means older homes with tighter driveway access — disclose property age and access constraints on your inventory form.',
    compare: 'Kapolei for newer master-planned inventory, Pearl City for central transit, or Hilo on the Big Island for more affordable neighbor-island rainforest living.',
    crossSlugs: ['kapolei-hi', 'pearl-city-hi', 'honolulu-hi', 'hilo-hi'],
  },
  {
    file: 'kihei-hi.ts',
    export: 'kiheiHiContent',
    slug: 'kihei-hi',
    name: 'Kihei',
    zip: '96753',
    county: 'Maui',
    countyPath: '/local-movers/hawaii/maui',
    island: 'Maui',
    tier: 'neighborIsland',
    transit: '18–35',
    tagline: 'Sun-drenched beaches · snorkeling · dining corridor',
    inboundStat: 'Sun-drenched beaches · snorkeling · dining corridor',
    hook: 'Kihei anchors Maui\'s south shore as the island\'s sun-drenched beach community — a Kihei–Wailea corridor where Kamaole Beach Park snorkeling, Piʻilani Highway dining density, and resort-adjacent employment draw California and Washington households prioritizing daily beach recreation on Maui in 2026.',
    why: 'Kihei captures Maui\'s highest south-shore inbound volume — a beach-community market where reliable sunshine, Keawakapu and Kamaole beach access, Maui Brewing Company and Nalu\'s South Shore dining, and comparatively affordable inventory versus Wailea resort premiums converge for mainland relocations. Neighbor-island logistics require mainland container shipping often via Honolulu transshipment to Kahului Harbor — plan longer transit windows than Oahu deliveries.',
    neighborhoods: 'Kihei inventory spans beach-adjacent condos along South Kihei Road, Kihei Town Center walkable corridors, and Piʻilani Highway subdivisions with ocean views. Wailea spillover attracts households wanting resort-adjacent amenities at Kihei pricing. Document condo COI requirements and beach-corridor parking constraints for final-mile crews.',
    logistics: 'Maui neighbor-island barge schedules from Honolulu and Kahului Harbor drayage add complexity versus direct Oahu delivery. Summer tourism peaks compress south-shore traffic and HOA move-in windows — book 10–14 weeks ahead during peak season.',
    compare: 'Wailuku for historic Maui county-seat charm, Honolulu for Oʻahu employment depth, or Lihue on Kauaʻi for quieter neighbor-island alternatives.',
    crossSlugs: ['wailuku-hi', 'honolulu-hi', 'kailua-kona-hi', 'lihue-hi'],
  },
  {
    file: 'wailuku-hi.ts',
    export: 'wailukuHiContent',
    slug: 'wailuku-hi',
    name: 'Wailuku',
    zip: '96793',
    county: 'Maui',
    countyPath: '/local-movers/hawaii/maui',
    island: 'Maui',
    tier: 'neighborIsland',
    transit: '18–35',
    tagline: 'Historic creative charm · mountain base · county seat',
    inboundStat: 'Historic creative charm · mountain base · county seat',
    hook: 'Wailuku anchors central Maui as the island\'s historic county seat — a creative community at the base of the West Maui Mountains where ʻIao Valley access, Wailuku town-center charm, and Maui government and healthcare employment draw households seeking neighbor-island character over resort-corridor density in 2026.',
    why: 'Wailuku offers Maui\'s most authentic historic-town inbound profile — a county-seat market where creative small-business culture, ʻIao Theater heritage, Maui Memorial Medical Center employment, and West Maui Mountain views converge at pricing often below Kihei beach-corridor premiums. Compared to Kihei\'s sun-drenched south shore, Wailuku skews toward mountain-base lifestyle with central Maui commute flexibility.',
    neighborhoods: 'Wailuku spans historic town-center inventory, Wailuku Heights hillside homes with valley views, and Kahului-adjacent corridors with airport employment access. Each address involves central Maui traffic patterns on Hana Highway and Dairy Road — factor commute destinations when comparing Wailuku against Kihei.',
    logistics: 'Maui container routing via Kahului Harbor and potential Honolulu transshipment require explicit inter-island leg disclosure. Historic town-center narrow streets and hillside grades affect final-mile shuttle requirements.',
    compare: 'Kihei for south-shore beach lifestyle, Honolulu for Oʻahu job-market depth, or Hilo for Big Island rainforest affordability.',
    crossSlugs: ['kihei-hi', 'honolulu-hi', 'hilo-hi', 'lihue-hi'],
  },
  {
    file: 'hilo-hi.ts',
    export: 'hiloHiContent',
    slug: 'hilo-hi',
    name: 'Hilo',
    zip: '96720',
    county: 'Hawaii',
    countyPath: '/local-movers/hawaii/hawaii',
    island: 'Hawaiʻi Island (Big Island)',
    tier: 'hilo',
    transit: '18–35',
    tagline: 'Lush rainforest · affordable · nature lovers',
    inboundStat: 'Lush rainforest · affordable · nature lovers',
    hook: 'Hilo anchors Hawaiʻi Island\'s windward side as the Big Island\'s most affordable rainforest gateway — a lush Hilo Bay destination where Hawaiʻi Tropical Bioreserve & Garden access, University of Hawaiʻi at Hilo employment, and dramatic waterfall country draw California and Pacific Northwest nature-oriented households in 2026.',
    why: 'Hilo posts the Big Island\'s strongest affordability-meets-lifestyle inbound profile — a rainforest market where lower housing costs than Kailua-Kona leeward premiums, genuine tropical rainfall and botanical beauty, and university-town culture converge for mainland relocations prioritizing nature over resort amenities. Hawaiʻi County logistics route via Hilo Harbor with Honolulu transshipment common for mainland containers.',
    neighborhoods: 'Hilo inventory spans bayfront historic districts, Piʻihonua hillside homes with rainforest views, and suburban neighborhoods toward Keaʻau with newer construction. Volcano and Puna spillover corridors attract households wanting lava-zone awareness and rural acreage — disclose specific district when requesting quotes.',
    logistics: 'Hilo\'s rainfall and narrow Hāmākua-access roads affect scheduling year-round. Big Island neighbor-island routing adds transit time versus Oahu — confirm Hilo Harbor final-mile versus Kona routing if your carrier defaults to leeward delivery.',
    compare: 'Kailua-Kona for sunny leeward resort employment, Honolulu for Oʻahu job-market depth, or Lihue for Kauaʻi quiet commercial capital lifestyle.',
    crossSlugs: ['kailua-kona-hi', 'honolulu-hi', 'wailuku-hi', 'lihue-hi'],
  },
  {
    file: 'kailua-kona-hi.ts',
    export: 'kailuaKonaHiContent',
    slug: 'kailua-kona-hi',
    name: 'Kailua-Kona',
    zip: '96740',
    county: 'Hawaii',
    countyPath: '/local-movers/hawaii/hawaii',
    island: 'Hawaiʻi Island (Big Island)',
    tier: 'neighborIsland',
    transit: '18–35',
    tagline: 'Sunny leeward coast · fishing · volcanic landscapes',
    inboundStat: 'Sunny leeward coast · fishing · volcanic landscapes',
    hook: 'Kailua-Kona anchors Hawaiʻi Island\'s leeward coast as the Big Island\'s sunny employment and recreation hub — a Kona district where sport-fishing charters, Hawaiʻi Volcanoes National Park access, Keauhou resort development, and hospitality employment draw California households prioritizing dry-side weather over Hilo\'s rainforest climate in 2026.',
    why: 'Kailua-Kona captures the Big Island\'s highest leeward inbound volume — a sunny coast market where reliable dry-side weather, Honokōhau Harbor fishing culture, Ironman World Championship community prestige, and resort-hospitality hiring converge at premiums above Hilo affordability. Mainland containers often route through Honolulu to Kawaihae or Kona harbors — confirm harbor final-mile in your quote.',
    neighborhoods: 'Kona inventory spans Aliʻi Drive waterfront condos, Holualoa hillside coffee-country homes with ocean views, and master-planned developments toward Kaloko and Keauhou. Volcanic landscape proximity means varied elevation and access grades — document hillside driveway constraints for accurate accessorial estimates.',
    logistics: 'Leeward dry-side heat and resort-corridor traffic affect summer delivery windows. Ironman week and winter visitor peaks compress Kona scheduling — book early for October and December–March closings.',
    compare: 'Hilo for affordable rainforest living, Kihei for Maui south-shore beaches, or Honolulu for Oʻahu employment depth.',
    crossSlugs: ['hilo-hi', 'kihei-hi', 'honolulu-hi', 'lihue-hi'],
  },
  {
    file: 'lihue-hi.ts',
    export: 'lihueHiContent',
    slug: 'lihue-hi',
    name: 'Lihue',
    zip: '96766',
    county: 'Kauai',
    countyPath: '/local-movers/hawaii/kauai',
    island: 'Kauaʻi',
    tier: 'neighborIsland',
    transit: '18–35',
    tagline: 'Quiet commercial capital · dramatic natural beauty',
    inboundStat: 'Quiet commercial capital · dramatic natural beauty',
    hook: 'Lihue anchors Kauaʻi as the Garden Isle\'s quiet commercial capital — a Lihue–Nawiliwili corridor where Nawiliwili Harbor logistics, Kauaʻi Community College and county government employment, and dramatic Nā Pali Coast and Waimea Canyon access draw California and Washington households seeking neighbor-island tranquility over Oʻahu density in 2026.',
    why: 'Lihue offers Kauaʻi\'s most practical inbound hub — a commercial-capital market where Lihue Airport connectivity, harbor-adjacent employment, and central Garden Isle location provide access to Poʻipū beaches, Princeville north-shore beauty, and Hanalei valley charm without resort-only isolation. Kauaʻi neighbor-island logistics are among the most constrained in Hawaiʻi — limited barge frequency and single-highway circulation require advance planning.',
    neighborhoods: 'Lihue inventory spans town-center commercial corridors, Puhi university-adjacent neighborhoods, and Kalapaki beach-adjacent condos near Nawiliwili Harbor. Poʻipū and Princeville spillover attract households willing to commute the Kūhiō Highway for beach and north-shore lifestyle — factor Kauaʻi\'s single-corridor traffic reality into commute planning.',
    logistics: 'Kauaʻi barge schedules from Honolulu and Nawiliwili Harbor drayage require 10–14 week advance booking during peak season. Hurricane season (June–November) is a legitimate scheduling variable — confirm weather-delay clauses in writing.',
    compare: 'Honolulu for Oʻahu employment depth, Kihei for Maui south-shore sunshine, or Hilo for Big Island rainforest affordability.',
    crossSlugs: ['honolulu-hi', 'kailua-hi', 'kihei-hi', 'hilo-hi'],
  },
];

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildCityFile(c) {
  const tier = COST_TIERS[c.tier];
  const fourRange = tier.fourFixed || tier.four;
  const neighborIslandFaq =
    c.island !== 'Oahu'
      ? 'Confirm hurricane-season rescheduling clauses for June–November neighbor-island deliveries. '
      : '';
  const interIslandCostNote =
    c.island !== 'Oahu' ? 'inter-island legs, ' : '';
  const honoluluCompareAnswer =
    c.island === 'Oahu'
      ? `Interstate container costs to ${c.name} are typically comparable to Honolulu from the same origin — similar Oʻahu harbor drayage with marginally different final-mile accessorials by neighborhood.`
      : `Neighbor-island delivery to ${c.name} often costs more than direct Oʻahu delivery from the same origin due to inter-island barge or transshipment legs — confirm whether your quote includes the full ${c.island} final-mile or stops at Honolulu Harbor.`;

  const countyLabel = c.island === 'Oahu' ? "Honolulu County's" : `${c.county} County's`;
  const introPara1 = esc(
    `${c.name} has emerged as ${countyLabel} high-intent inbound market for 2026 — ${c.why} Whether you are moving from Los Angeles, Seattle, Phoenix, or Dallas, the fundamentals are identical: document your inventory accurately, verify every carrier on FMCSA.gov, and compare quotes built on equal cubic footage before you sign.`
  );
  const comparePara = esc(
    `If you are comparing ${c.name} against other Hawaiʻi destinations, factor in employment market alignment, island commute realities, ocean-transit timeline tolerance, and whether your carrier discloses port drayage and ${c.island !== 'Oahu' ? 'inter-island ' : ''}final-mile accessorials in writing. ${c.name}'s mix of property types means delivery logistics vary dramatically — document your exact address type, HOA requirements, and driveway access when requesting quotes.`
  );
  const infrastructurePara = esc(
    `Infrastructure and lifestyle investment across ${c.island} continues to support ${c.name}'s inbound appeal — from transit and harbor improvements to school and healthcare expansion that sustain long-term relocation confidence. Remote workers discover that ${c.name} delivers genuine island lifestyle while maintaining broadband reliability for distributed employment — a combination mainland affordability rankings often miss when they treat Hawaiʻi as a single market rather than distinct island corridors.`
  );
  const testimonialQuote = esc(
    `We relocated from San Diego when ${c.name}'s lifestyle and climate made the long-term math work. Comparing four carriers on identical cubic footage saved us money — and the container transit timeline was clearly itemized from Oakland port to final delivery.`
  );
  const inboundMixPara = esc(
    `The inbound mix reflects Hawaiʻi's broader migration pattern: California households from Los Angeles, San Francisco, and San Diego metros trade West Coast density for island climate and outdoor access; Washington and Oregon relocations leverage Pacific port proximity for efficient container routing; Texas and Arizona remote workers join ${c.island} for mild winters and year-round recreation. Compared to ${c.compare}`
  );

  return `import type { CityHubContent } from '@/lib/destinations/types';

export const ${c.export}: CityHubContent = {
  marketSlug: '${c.slug}',
  h1: 'Moving to ${c.name}, HI: Compare Trusted Movers & Estimate Your Move',
  seo: {
    title:
      'Moving to ${c.name}, HI (2026) — Costs, Best Movers & Free Quotes | Move Trust Hub',
    description:
      'Planning a move to ${c.name} in ${c.county} County? Compare FMCSA-verified movers, estimate mainland-to-Hawaii container shipping costs with our free calculator, and get matched with 2–3 licensed quotes within 24 hours. ${esc(c.tagline)}. Independent directory. Transparent. No affiliation with listed companies.',
    keywords: [
      'moving to ${c.name.toLowerCase()} hi',
      '${c.slug.replace(/-/g, ' ')} movers',
      'cost to move to ${c.name.toLowerCase()} hawaii',
      'best moving companies ${c.name.toLowerCase()} hi',
      'relocating to ${c.county.toLowerCase()} county hi',
      '${c.name.toLowerCase()} hi moving cost 2026',
      'moving from california to ${c.name.toLowerCase()} hi',
      'moving from washington to ${c.name.toLowerCase()} hi',
      'hawaii container shipping moving costs',
      'mainland to hawaii movers ${c.island.toLowerCase()}',
    ],
    canonicalPath: '/moving-to/hawaii/${c.slug}',
    ogImagePath: '/images/destinations/${c.slug}-cost-infographic.svg',
    ogImageAlt:
      '2026 mainland-to-Hawaii moving costs to ${c.name} HI by home size – Move Trust Hub',
  },
  heroSubheadline:
    '${esc(c.hook)} Our independent directory lets you compare FMCSA-licensed movers coordinating mainland container shipping to ${c.name} (ZIP ${c.zip}) — household goods route via Pacific ports (Oakland, Long Beach, Seattle) with ${c.transit}-day typical transit windows, not over-the-road interstate trucking. Use our free calculator below, then request 2–3 personalized quotes in under 24 hours.',
  introParagraphs: [
    '${introPara1}',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Hawaii moves involve island logistics that generic relocation guides overlook: ocean container shipping from West Coast ports, Honolulu Harbor or neighbor-island harbor drayage, ${c.island !== 'Oahu' ? 'inter-island barge or air-freight transshipment, ' : ''}condo COI and freight-elevator coordination, hillside narrow-road access, military PCS peaks (May–August), and 14–35 day transit windows — legitimate cost drivers that should appear in writing before you book.',
    'This guide covers movers serving ${c.name} (ZIP ${c.zip}) and surrounding ${c.island} communities — with cross-links to other Hawaii city guides for households still comparing island corridors. Container deliveries into ${c.island} properties frequently require port-to-door drayage, shuttle trucks on narrow streets, and closing-date alignment around ocean transit schedules — factors that should be line items on your estimate, not surprises on delivery day. For statewide context, see our parent guide at /moving-to/hawaii.',
  ],
  routeLinks: [
    {
      label: 'California → Hawaii',
      href: '/moving-to/california',
      miles: 'Ocean container via Pacific ports',
    },
    {
      label: 'Washington → Hawaii',
      href: '/resources/routes',
      miles: 'Ocean container via Seattle/Tacoma',
    },
    {
      label: 'Texas → Hawaii',
      href: '/moving-to/texas',
      miles: 'Inland linehaul + ocean container',
    },
    {
      label: 'All interstate route guides',
      href: '/resources/routes',
      miles: 'National',
    },
  ],
  costTableRows: [
    {
      homeSize: 'Studio / 1BR',
      cubicFt: '1,000–1,500',
      costRange: '${tier.studio}',
      transitDays: '${c.transit}',
    },
    {
      homeSize: '2BR',
      cubicFt: '3,000–4,000',
      costRange: '${tier.two}',
      transitDays: '${c.transit}',
    },
    {
      homeSize: '3BR',
      cubicFt: '5,000–7,000',
      costRange: '${tier.three}',
      transitDays: '${c.transit}',
    },
    {
      homeSize: '4BR+',
      cubicFt: '8,000+',
      costRange: '${fourRange}',
      transitDays: '${c.transit}',
    },
  ],
  costTableNote:
    '${esc(tier.note)}',
  insightCards: [
    {
      title: 'Peak Moving Season',
      body: 'May through September aligns with California and Washington corporate transfer clusters, military PCS relocations, and family moves before the school year — compressing Pacific port and ${c.island} harbor drayage availability. Book 8–12 weeks ahead for ${c.name} closings during peak windows. Neighbor-island schedules may require additional lead time for barge reservations.',
    },
    {
      title: 'Top Inbound States',
      body: 'California, Washington, Texas, and Arizona consistently rank among the largest origin states for ${c.name} relocations, driven by island lifestyle appeal, mild climate, ${esc(c.inboundStat.toLowerCase())}, and households trading West Coast metro premiums for Hawaiʻi quality of life.',
    },
    {
      title: 'Container vs. Local Movers',
      body: 'Mainland-to-${c.name} shipments require FMCSA-licensed carriers experienced in ocean container logistics — your goods travel by sea, not interstate highway. Moves within ${c.island} are typically local hourly jobs. Some companies broker mainland container loads — always verify who coordinates port drayage and who handles final-mile delivery before paying a deposit.',
    },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to ${c.name} in 2026',
      paragraphs: [
        '${esc(c.why)}',
        '${esc(c.neighborhoods)}',
        '${inboundMixPara}',
        '${comparePara}',
        '${infrastructurePara}',
      ],
    },
    {
      heading: 'How to choose a mover for a ${c.name} container delivery',
      paragraphs: [
        'Start with FMCSA verification. Every carrier coordinating mainland-to-Hawaii moves must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios. Move Trust Hub surfaces this data alongside Google, BBB, and Trustpilot reviews so you can research before anyone calls you.',
        'Demand inventory-based quotes. Lowball phone estimates are the leading cause of moving-day price disputes on Hawaii-bound container shipments. Use our room-by-room calculator to document cubic feet and estimated weight — include garage contents, lanai furniture, and outdoor living setups common in island relocations. Send the same inventory to every carrier you compare.',
        'Ask about ${c.name} and ${c.island} logistics. ${esc(c.logistics)} Reputable carriers disclose ocean transit timelines, port scheduling, and destination accessorial protocols upfront rather than treating them as delivery-day surprises.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable Hawaii movers do not demand large upfront cash payments via wire transfer or cryptocurrency. Binding not-to-exceed estimates, when supported by an accurate virtual or in-home survey, offer the strongest price protection for ${c.name}-bound container shipments.',
        'Confirm whether your quote includes full port-to-door service or stops at harbor pickup — ${c.island} drayage is a frequent source of invoice disputes when brokers quote mainland linehaul only. Ask which Pacific port your container loads through (Oakland, Long Beach, Seattle/Tacoma) and how that affects your delivery spread.',
      ],
    },
    {
      heading: 'County-level mover coverage across the ${c.name} corridor',
      paragraphs: [
        '${c.county} County is the primary jurisdiction for ${c.name} (ZIP ${c.zip}) and surrounding ${c.island} communities. Our ${c.county} County directory lists vetted local movers with FMCSA licensing, Google ratings, and county cost guides — including teams experienced with ${c.island} harbor drayage, condo COI protocols, and mainland container coordination.',
        'For mainland-to-Hawaii moves, browse our national directory of major long-distance carriers — many operate Pacific container lanes from California, Washington, and inland origins into ${c.island} harbors. Pair a reputable container coordinator with a ${c.county} County local crew for final-mile shuttle service when your property requires it. Cross-link to our Hawaii statewide hub at /moving-to/hawaii and other island guides before committing to ZIP ${c.zip}.',
        '${esc(c.tagline)} shapes neighborhood preferences across ${c.name}. Document your inventory accurately, verify carriers on FMCSA.gov, and compare equal cubic-footage quotes before booking — especially during PCS season and summer peak windows when Pacific port capacity tightens across all Hawaiʻi corridors.',
      ],
    },
  ],
  resourceLinks: [
    {
      title: 'Hawaii moving destinations hub',
      description: 'Compare ${c.name} with all Oʻahu and Neighbor Island city guides.',
      href: '/moving-to/hawaii',
    },
    {
      title: 'Moving to Honolulu guide',
      description: 'Oʻahu urban capital, Kakaʻako luxury growth, and cultural hub comparison.',
      href: '/moving-to/hawaii/honolulu-hi',
    },
    {
      title: 'Moving to Kapolei guide',
      description: 'Oʻahu Second City master-planned growth corridor comparison.',
      href: '/moving-to/hawaii/kapolei-hi',
    },
    {
      title: 'Moving to Kailua guide',
      description: 'Windward beach lifestyle and walkable town center comparison.',
      href: '/moving-to/hawaii/kailua-hi',
    },
    {
      title: 'Moving to Kihei guide',
      description: 'Maui south-shore sun-drenched beach community comparison.',
      href: '/moving-to/hawaii/kihei-hi',
    },
    {
      title: 'Moving to Hilo guide',
      description: 'Big Island rainforest affordability and nature-lover comparison.',
      href: '/moving-to/hawaii/hilo-hi',
    },
    {
      title: 'California moving destinations hub',
      description: 'Compare CA origin markets and West Coast container routing to Hawaiʻi.',
      href: '/moving-to/california',
    },
    {
      title: 'Browse ${c.county} County local movers',
      description: '${c.name} ${c.island} corridor mover directory.',
      href: '${c.countyPath}',
    },
    {
      title: 'Verify any mover\\'s USDOT & MC number',
      description: 'Step-by-step FMCSA lookup and complaint-ratio interpretation.',
      href: '/resources/fmcsa',
    },
    {
      title: 'Common moving scams & how to avoid them',
      description: 'Eight red flags and deposit best practices before booking.',
      href: '/resources/scams',
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
  testimonials: [
    {
      quote:
        '${testimonialQuote}',
      name: 'Melissa & Ryan T.',
      detail: 'California container move to ${c.name} · March 2026',
    },
    {
      quote:
        'Moving from Seattle meant coordinating ocean transit around a tight closing date. The FMCSA check and calculator match helped us land a carrier that delivered within the quoted ${c.transit}-day window with no surprise harbor fees.',
      name: 'David K.',
      detail: 'Relocated from Seattle WA to ${c.name} (${c.zip}) · July 2026',
    },
  ],
  faqItems: [
    {
      question: 'How accurate is the moving calculator for ${c.name} relocations?',
      answer:
        'The calculator uses industry-standard item volumes and 7 lbs per cubic foot for weight — the same baseline carriers use for initial container estimates. Accuracy improves when you add items room-by-room and include lanai furniture, garage contents, and outdoor living setups. Adjust expectations upward for ${c.island} harbor drayage, condo COI coordination, and peak-season Pacific port scheduling.',
    },
    {
      question: 'What is the best time of year to move to ${c.name}?',
      answer:
        'Spring (March–May) and fall (October–November) typically offer the best Pacific port and ${c.island} drayage availability outside peak PCS and summer family-move windows. May–September compresses carrier schedules — book 8–12 weeks ahead. ${neighborIslandFaq}Plan ocean transit buffers of 2–4 weeks beyond mainland pack-out.',
    },
    {
      question: 'Do Hawaii moves use interstate trucks or ocean containers?',
      answer:
        'Mainland-to-${c.name} household goods ship primarily by ocean container from West Coast ports — not over-the-road interstate trucking across the Pacific. FMCSA-licensed carriers coordinate the mainland pickup, container loading, ocean transit, harbor clearance, and ${c.island} final-mile delivery. Moves within ${c.island} use local hourly movers.',
    },
    {
      question: 'How much does it cost to move a 3-bedroom home to ${c.name}?',
      answer:
        'From California, Washington, Texas, and Arizona origins, a 3-bedroom household (roughly 5,000–7,000 cubic feet) typically ranges from ${tier.three} for full-service container transport in 2026. Final price depends on volume, packing, harbor drayage, ${interIslandCostNote}and season. Use our calculator for your specific inventory, then request matched quotes.',
    },
    {
      question: 'How does ${c.name} compare to Honolulu for moving costs?',
      answer:
        '${esc(honoluluCompareAnswer)} Request quotes for each destination ZIP if comparing islands.',
    },
    {
      question: 'What logistics should California relocations plan for?',
      answer:
        'California-origin moves typically load containers through Oakland or Long Beach ports — the shortest and most competitive Hawaii shipping lanes. Document inventory accurately, confirm port-to-door disclosure, and book early during May–September when California-to-Hawaii volume peaks compress Pacific carrier availability.',
    },
    {
      question: 'What access rules affect ${c.name}-area moves?',
      answer:
        'Condo and high-rise properties require COI certificates, freight-elevator reservations, and loading-dock scheduling. Hillside and narrow-road homes may need shuttle trucks and long carries. HOA move-in windows are common across ${c.island} subdivisions. Failure to disclose building type and access constraints is a frequent cause of rescheduling fees.',
    },
    {
      question: 'Is Move Trust Hub affiliated with the movers listed?',
      answer:
        'No. Move Trust Hub is an independent informational directory and quote-matching service. We are not affiliated with, endorsed by, or a partner of the companies listed. We help you research FMCSA data, verified reviews, and reputation scores so you can make an informed decision on your own.',
    },
  ],
  featuredInterstateSlugs: [
    'amerisafe-van-lines',
    'jk-moving-services',
    'pensey-moving',
  ],
  bestMoversPath: '${c.countyPath}',
};
`;
}

// Parent file
const parentContent = `import type { DestinationResourceLink } from '@/lib/destinations/types';

export type HawaiiCorridorCity = {
  slug: string;
  displayName: string;
  zip: string;
  tagline: string;
};

export type HawaiiClusterContent = {
  h1: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
    canonicalPath: string;
  };
  heroSubheadline: string;
  introParagraphs: string[];
  oahuCorridor: HawaiiCorridorCity[];
  mauiCorridor: HawaiiCorridorCity[];
  bigIslandCorridor: HawaiiCorridorCity[];
  kauaiCorridor: HawaiiCorridorCity[];
  bodySections: { heading: string; paragraphs: string[] }[];
  resourceLinks: DestinationResourceLink[];
};

export const hawaiiClusterContent: HawaiiClusterContent = {
  h1: 'Moving to Hawaii: Oʻahu, Maui, Big Island & Kauaʻi City Guides & Trusted Movers',
  seo: {
    title:
      'Moving to Hawaii (2026) — Destination Guides, Costs & Free Quotes | Move Trust Hub',
    description:
      'Explore Hawaii inbound moving guides for Honolulu, Kapolei, Kailua, Pearl City, Waipahu, Kihei, Wailuku, Hilo, Kailua-Kona, and Lihue. Island lifestyle, mild climate, Oʻahu job markets, neighbor-island options. FMCSA-verified movers, free calculator. Independent directory.',
    keywords: [
      'moving to hawaii',
      'hawaii movers',
      'honolulu hi relocation',
      'kapolei oahu moving',
      'maui kihei relocation',
      'big island hilo kona movers',
      'kauai lihue moving',
      'best cities to move to in hawaii 2026',
      'mainland to hawaii moving costs',
      'moving from california to hawaii',
      'hawaii container shipping movers',
    ],
    canonicalPath: '/moving-to/hawaii',
  },
  heroSubheadline:
    'Hawaiʻi ranks among America\\'s premier island lifestyle relocation destinations for 2026 — an archipelago where mild year-round climate, outdoor recreation, strong Oʻahu employment markets, and distinct neighbor-island character coexist with real logistics realities: ocean container shipping from Pacific ports, harbor drayage, inter-island barge schedules, and 14–35 day transit windows rather than interstate highway delivery. Honolulu anchors the state\\'s dynamic urban capital with Kakaʻako luxury growth and cultural density; Kapolei delivers Oʻahu\\'s Second City master-planned expansion; Kailua captures windward beach-town walkability; Pearl City and Waipahu offer central and affordable Oʻahu suburban entry; Kihei and Wailuku span Maui\\'s sun-drenched and historic corridors; Hilo and Kailua-Kona split the Big Island between lush rainforest affordability and sunny leeward coast living; and Lihue anchors Kauaʻi\\'s quiet commercial capital amid dramatic natural beauty. Our independent directory covers FMCSA-licensed movers, county-level local directories, and ten city-specific guides with cost tables and free quote matching.',
  introParagraphs: [
    'Whether you are relocating into Honolulu\\'s Kakaʻako luxury corridor, settling Kapolei\\'s master-planned Second City subdivisions, joining Kailua\\'s windward beach lifestyle, targeting Pearl City\\'s central transit convenience, choosing Waipahu\\'s affordable Oʻahu entry, moving to Kihei\\'s Maui south-shore sunshine, settling Wailuku\\'s historic creative charm, accepting Big Island life in affordable Hilo or sunny Kailua-Kona, or joining Lihue\\'s Kauaʻi Garden Isle tranquility, the relocation fundamentals are identical: document your inventory with our free calculator, verify every carrier on FMCSA.gov, and compare multiple quotes on equal cubic footage before signing.',
    'Move Trust Hub is an independent informational directory — we are not affiliated with, endorsed by, or a partner of the moving companies listed. Hawaii moves involve island logistics that generic relocation guides overlook: ocean container transit from Oakland, Long Beach, or Seattle ports; Honolulu Harbor and neighbor-island harbor drayage; inter-island barge coordination for Maui, Big Island, and Kauaʻi deliveries; condo COI and freight-elevator requirements; military PCS peaks (May–August); and hurricane-season scheduling windows — factors our city guides surface so you can plan with confidence.',
    'Ten live Hawaii city guides span Oʻahu (Honolulu, Kapolei, Kailua, Pearl City, Waipahu), Maui (Kihei, Wailuku), Hawaiʻi Island (Hilo, Kailua-Kona), and Kauaʻi (Lihue). Browse each city guide below for 2026–2027 cost tables, calculator prefill by ZIP, and county-level mover directories.',
  ],
  oahuCorridor: [
    { slug: 'honolulu-hi', displayName: 'Honolulu', zip: '96813', tagline: 'Dynamic urban capital · Kakaʻako luxury growth · cultural hub' },
    { slug: 'kapolei-hi', displayName: 'Kapolei', zip: '96707', tagline: 'Oʻahu\\'s Second City · master-planned housing & retail' },
    { slug: 'kailua-hi', displayName: 'Kailua', zip: '96734', tagline: 'Windward beach lifestyle · walkable town center' },
    { slug: 'pearl-city-hi', displayName: 'Pearl City', zip: '96782', tagline: 'Central transit convenience · strong job market' },
    { slug: 'waipahu-hi', displayName: 'Waipahu', zip: '96797', tagline: 'Affordable Oʻahu entry · diverse cuisine' },
  ],
  mauiCorridor: [
    { slug: 'kihei-hi', displayName: 'Kihei', zip: '96753', tagline: 'Sun-drenched beaches · snorkeling · dining' },
    { slug: 'wailuku-hi', displayName: 'Wailuku', zip: '96793', tagline: 'Historic creative charm · mountain base' },
  ],
  bigIslandCorridor: [
    { slug: 'hilo-hi', displayName: 'Hilo', zip: '96720', tagline: 'Lush rainforest · affordable · nature lovers' },
    { slug: 'kailua-kona-hi', displayName: 'Kailua-Kona', zip: '96740', tagline: 'Sunny leeward coast · fishing · volcanic landscapes' },
  ],
  kauaiCorridor: [
    { slug: 'lihue-hi', displayName: 'Lihue', zip: '96766', tagline: 'Quiet commercial capital · dramatic natural beauty' },
  ],
  bodySections: [
    {
      heading: 'Why families and professionals are moving to Hawaii in 2026',
      paragraphs: [
        'Hawaiʻi\\'s inbound migration story is defined by island lifestyle trade-offs that attract a specific household profile — outdoor-oriented families, military and hospitality professionals, healthcare workers, remote employees, and retirees willing to exchange mainland density for year-round mild climate and Pacific recreation access. Oʻahu anchors employment volume as the state\\'s job-market center: Honolulu\\'s urban capital with Kakaʻako development, Kapolei\\'s Second City growth, Pearl City\\'s transit convenience, and Waipahu\\'s affordable suburban entry each serve distinct household profiles united by island climate and Pacific culture.',
        'Neighbor islands deliver different value propositions. Maui\\'s Kihei south-shore sunshine and Wailuku historic county-seat charm attract households prioritizing beach recreation and creative community over Oʻahu density. Hawaiʻi Island splits between Hilo\\'s affordable rainforest lifestyle and Kailua-Kona\\'s sunny leeward fishing and resort employment. Kauaʻi\\'s Lihue offers Garden Isle tranquility with dramatic Nā Pali and Waimea Canyon access. No two Hawaiʻi corridors move alike: Oʻahu harbor drayage differs fundamentally from neighbor-island barge final-mile logistics.',
        'Mainland origin patterns concentrate on California, Washington, Texas, and Arizona — states with large populations seeking climate and lifestyle upgrades. California relocations benefit from shortest Pacific container lanes via Oakland and Long Beach. Washington and Oregon households leverage Seattle/Tacoma port proximity. Compare quotes on identical inventory rather than choosing the lowest phone estimate — Hawaii container pricing varies widely based on port selection, volume, and destination island.',
      ],
    },
    {
      heading: 'How to choose a mover for a Hawaii container delivery',
      paragraphs: [
        'Start with FMCSA verification. Every carrier coordinating mainland-to-Hawaii moves must have a USDOT number and, when operating as a for-hire carrier, an MC number. Look up both on FMCSA.gov and confirm acceptable safety ratings and low complaint ratios.',
        'Demand inventory-based quotes. Lowball phone estimates are the leading cause of moving-day price disputes on Hawaii-bound shipments. Use our room-by-room calculator to document cubic feet and estimated weight, then send the same inventory to every carrier you compare.',
        'Ask about island-specific accessorials. Ocean container transit timelines, harbor drayage fees, inter-island barge legs, condo COI requirements, and hillside shuttle staging should appear as line items — not delivery-day surprises. Military PCS season (May–August) compresses Pacific port capacity.',
        'Read our scam avoidance guide before paying more than a modest booking deposit. Reputable Hawaii movers do not demand large upfront wire transfers or cryptocurrency payments.',
      ],
    },
    {
      heading: 'Oʻahu vs. Neighbor Island logistics at a glance',
      paragraphs: [
        'Oʻahu (Honolulu, Kapolei, Kailua, Pearl City, Waipahu) receives the highest container volume through Honolulu Harbor with the most carrier competition and typically shortest final-mile drayage options.',
        'Maui (Kihei, Wailuku) routes through Kahului Harbor — often with Honolulu transshipment adding time and cost versus direct Oʻahu delivery.',
        'Hawaiʻi Island (Hilo, Kailua-Kona) uses Hilo Harbor and Kawaihae/Kona harbors with windward-leeward routing differences affecting transit and pricing.',
        'Kauaʻi (Lihue) routes through Nawiliwili Harbor with limited barge frequency — plan the longest lead times and most explicit inter-island disclosure of any Hawaiʻi corridor.',
      ],
    },
  ],
  resourceLinks: [
    { title: 'Verify any mover\\'s USDOT & MC number', description: 'Step-by-step FMCSA lookup and complaint-ratio interpretation.', href: '/resources/fmcsa' },
    { title: 'Common moving scams & how to avoid them', description: 'Eight red flags and deposit best practices before booking.', href: '/resources/scams' },
    { title: 'Browse Honolulu County local movers', description: 'Oʻahu urban and suburban corridor mover directory.', href: '/local-movers/hawaii/honolulu' },
    { title: 'Browse Maui County local movers', description: 'Kihei and Wailuku Maui corridor mover directory.', href: '/local-movers/hawaii/maui' },
    { title: 'Browse Hawaiʻi County local movers', description: 'Hilo and Kailua-Kona Big Island mover directory.', href: '/local-movers/hawaii/hawaii' },
    { title: 'Browse Kauaʻi County local movers', description: 'Lihue Garden Isle mover directory.', href: '/local-movers/hawaii/kauai' },
    { title: 'California moving destinations hub', description: 'Compare CA origin markets and West Coast container routing to Hawaiʻi.', href: '/moving-to/california' },
    { title: 'Alaska moving destinations hub', description: 'Compare Pacific relocation corridors with frontier Alaska guides.', href: '/moving-to/alaska' },
    { title: 'Room-by-room packing checklist', description: 'Prepare your inventory before requesting fair quotes.', href: '/resources/packing-checklist' },
    { title: 'Compare movers side-by-side', description: 'Select up to 4 carriers and compare reputation and services.', href: '/compare' },
  ],
};
`;

fs.writeFileSync(path.join(contentDir, 'hawaii-hi.ts'), parentContent);
console.log('wrote hawaii-hi.ts');

for (const c of cities) {
  const file = buildCityFile(c);
  fs.writeFileSync(path.join(contentDir, c.file), file);
  console.log('wrote', c.file, `(${file.split('\n').length} lines)`);
}