export type CountyPopularRoute = {
  label: string;
  direction: 'inbound' | 'outbound' | 'within';
  context: string;
  href?: string;
};

/** County-specific popular routes — unique framing per market (not state clones). */
const NJ_ROUTES: Record<string, CountyPopularRoute[]> = {
  ocean: [
    {
      label: 'Within Ocean County (Toms River ↔ Brick / Jackson)',
      direction: 'within',
      context: 'Suburban island-to-mainland hops; summer traffic on the Parkway changes crew hours.',
    },
    {
      label: 'Moving to the Jersey Shore (NY/North Jersey → Ocean)',
      direction: 'inbound',
      context: 'Second-home and retirement inflows; book elevators and parking early in peak season.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Ocean → Philadelphia suburbs',
      direction: 'outbound',
      context: 'Common for job changes; treat as regional interstate planning if crossing PA.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Ocean → Florida retirement corridors',
      direction: 'outbound',
      context: 'Long-distance household goods; use FMCSA carriers and a volume calculator.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Lakewood / Jackson family moves',
      direction: 'within',
      context: 'Larger homes and multi-unit stock; inventory surveys matter more than map miles.',
    },
  ],
  mercer: [
    {
      label: 'Within Mercer (Trenton ↔ Princeton / West Windsor)',
      direction: 'within',
      context: 'Capital vs university/suburban housing rules differ — share building access early.',
    },
    {
      label: 'NYC / North Jersey → Princeton area',
      direction: 'inbound',
      context: 'Professional and academic relocations; condo and HOA windows are common.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Mercer → Philadelphia metro',
      direction: 'outbound',
      context: 'Regional corridor moves; confirm whether the job is in-state or interstate.',
    },
    {
      label: 'Mercer → Washington, DC / Northern Virginia',
      direction: 'outbound',
      context: 'Government and professional long-distance; FMCSA authority required.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
    {
      label: 'Student / academic turnover near Princeton',
      direction: 'within',
      context: 'Lease-end clusters; short-notice local crews fill fast in May–August.',
    },
  ],
  somerset: [
    {
      label: 'Within Somerset (Bridgewater ↔ Hillsborough / Bernards)',
      direction: 'within',
      context: 'Affluent suburban stock; HOA certificates of insurance are routine.',
    },
    {
      label: 'NYC / Manhattan → Somerset corporate suburbs',
      direction: 'inbound',
      context: 'Corporate HQ corridor demand; elevators and timed windows on multifamily.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Somerset → North Carolina / South Carolina',
      direction: 'outbound',
      context: 'Family long-distance; plan inventory and valuation coverage carefully.',
      href: '/resources/routes/new-jersey-to-south-carolina',
    },
    {
      label: 'Somerset → Florida',
      direction: 'outbound',
      context: 'Snowbird and permanent relocations; peak winter booking for carriers.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Bridgewater / Somerville office-adjacent apartments',
      direction: 'within',
      context: 'Short local hops with loading dock rules — get management contacts in writing.',
    },
  ],
  atlantic: [
    {
      label: 'Atlantic City tower / casino-district moves',
      direction: 'within',
      context: 'Freight elevators, COIs, and security desks dominate the plan.',
    },
    {
      label: 'Downbeach (Ventnor / Margate) ↔ mainland Egg Harbor',
      direction: 'within',
      context: 'Beach-block geometry vs suburban cul-de-sacs — truck type changes.',
    },
    {
      label: 'Philly / South Jersey → Atlantic shore',
      direction: 'inbound',
      context: 'Seasonal and second-home demand; summer ACE Expressway congestion.',
    },
    {
      label: 'Atlantic → Florida / Sun Belt',
      direction: 'outbound',
      context: 'Hospitality and retirement long-distance; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Atlantic → New York / North Jersey',
      direction: 'outbound',
      context: 'Workforce reverse moves; treat as interstate household goods.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  gloucester: [
    {
      label: 'Within Gloucester (Deptford ↔ Washington Twp / Glassboro)',
      direction: 'within',
      context: 'South Jersey suburban stock with Philly-adjacent commute patterns.',
    },
    {
      label: 'Philadelphia → Gloucester County suburbs',
      direction: 'inbound',
      context: 'Cross-river moves; confirm PA/NJ authority for each leg of the job.',
    },
    {
      label: 'Gloucester → Delaware / Maryland',
      direction: 'outbound',
      context: 'Regional interstate; FMCSA when crossing state lines.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Gloucester → North Carolina',
      direction: 'outbound',
      context: 'Family long-distance along the I-95 corridor.',
      href: '/resources/routes/new-jersey-to-north-carolina',
    },
    {
      label: 'Rowan / Glassboro student and faculty turnover',
      direction: 'within',
      context: 'Lease clusters; book local crews early for May and August.',
    },
  ],
  hunterdon: [
    {
      label: 'Within Hunterdon (Flemington ↔ Clinton / Raritan Twp)',
      direction: 'within',
      context: 'Semi-rural driveways, longer carries, and limited staging on country roads.',
    },
    {
      label: 'North Jersey / NYC → Hunterdon space & schools',
      direction: 'inbound',
      context: 'Lifestyle moves to larger lots; inventory surveys should capture stairs and wells.',
    },
    {
      label: 'Hunterdon → Pennsylvania Lehigh Valley',
      direction: 'outbound',
      context: 'Short interstate; verify authority when crossing the Delaware.',
    },
    {
      label: 'Hunterdon → Florida / Carolinas',
      direction: 'outbound',
      context: 'Long-distance household goods; volume estimates matter more than hourly local rates.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Flemington / Raritan multi-acre properties',
      direction: 'within',
      context: 'Long driveway carries and seasonal mud — ask about shuttle and weather policies.',
    },
  ],
  sussex: [
    {
      label: 'Within Sussex (Newton ↔ Sparta / Vernon)',
      direction: 'within',
      context: 'Lakes, hills, and winter access; rural roads change truck size.',
    },
    {
      label: 'NYC / North Jersey → Sussex lakes & space',
      direction: 'inbound',
      context: 'Second-home and full-time lifestyle moves; seasonal road constraints.',
    },
    {
      label: 'Sussex → Pennsylvania / Upstate NY',
      direction: 'outbound',
      context: 'Regional interstate planning across state lines.',
    },
    {
      label: 'Sussex → Florida',
      direction: 'outbound',
      context: 'Long-distance retirement and remote-work relocations.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Vernon / resort-adjacent seasonal homes',
      direction: 'within',
      context: 'Tourism calendars and steep drives; confirm winter access before booking.',
    },
  ],
  warren: [
    {
      label: 'Within Warren (Phillipsburg ↔ Washington / Hackettstown)',
      direction: 'within',
      context: 'River towns and rural ridges; longer local distances than map miles suggest.',
    },
    {
      label: 'Lehigh Valley / Easton → Warren County',
      direction: 'inbound',
      context: 'Cross-river inflows; confirm NJ/PA authority for interstate legs.',
    },
    {
      label: 'Warren → North Jersey job centers',
      direction: 'outbound',
      context: 'Commuter-driven local and regional moves along I-78 / Route 31 corridors.',
    },
    {
      label: 'Warren → Carolinas / Florida',
      direction: 'outbound',
      context: 'Long-distance household goods with FMCSA carriers.',
      href: '/resources/routes/new-jersey-to-north-carolina',
    },
    {
      label: 'Phillipsburg river-town multifamily',
      direction: 'within',
      context: 'Older housing stock, stairs, and tight streets — survey access carefully.',
    },
  ],
};

/** California county routes — market-specific framing (not LA clones across counties). */
const CA_ROUTES: Record<string, CountyPopularRoute[]> = {
  'los-angeles': [
    {
      label: 'Within LA County (Westside ↔ San Fernando Valley / DTLA)',
      direction: 'within',
      context:
        'Street permits, freight elevators, and canyon driveways dominate cost more than map miles.',
    },
    {
      label: 'Texas / Sun Belt → Los Angeles metro',
      direction: 'inbound',
      context:
        'Entertainment, aerospace, and return-to-coast moves; plan for dense-origin delivery access.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'LA → Dallas–Fort Worth career corridors',
      direction: 'outbound',
      context:
        'Common corporate and cost-of-living exits; inventory volume drives linehaul more than miles.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      label: 'LA County → Arizona (Phoenix / East Valley)',
      direction: 'outbound',
      context:
        'Short I-10 interstate; hillside and permit pickups still add origin accessorials.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'East Coast → Greater Los Angeles',
      direction: 'inbound',
      context:
        'Long-haul coast-to-coast household goods; dedicated vs consolidated spreads matter.',
      href: '/resources/routes/east-coast-to-west-coast',
    },
    {
      label: 'South Bay / Long Beach port-adjacent apartments',
      direction: 'within',
      context:
        'Tight alley access and building COIs; shuttle trucks are common on older blocks.',
    },
  ],
  orange: [
    {
      label: 'Within Orange County (Irvine ↔ Costa Mesa / Anaheim Hills)',
      direction: 'within',
      context:
        'Master-planned HOAs and timed move windows; COI filings are routine before load day.',
    },
    {
      label: 'Inland Empire / LA → OC beach & job centers',
      direction: 'inbound',
      context:
        'Lifestyle upgrades to coastal suburbs; elevators and garage clearances on newer condos.',
    },
    {
      label: 'Orange County → Texas job markets',
      direction: 'outbound',
      context:
        'Tech, finance, and family cost exits; FMCSA carriers for true interstate household goods.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'OC → Arizona retirement & remote-work hubs',
      direction: 'outbound',
      context:
        'Popular for empty-nesters leaving coastal premiums; summer AZ heat shapes delivery windows.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Newport / Laguna hillside and cliffside homes',
      direction: 'within',
      context:
        'Steep drives and limited staging; survey for shuttle need before you compare hourly quotes.',
    },
    {
      label: 'OC → Pacific Northwest lifestyle moves',
      direction: 'outbound',
      context:
        'Longer West Coast corridor; rain-season delivery access differs from SoCal dry load-outs.',
      href: '/resources/routes/california-to-washington',
    },
  ],
  'san-diego': [
    {
      label: 'Within San Diego County (Downtown ↔ North County / East County)',
      direction: 'within',
      context:
        'Coastal parking, canyon roads, and military base-adjacent timing change crew plans.',
    },
    {
      label: 'Military & biotech inflows → San Diego metro',
      direction: 'inbound',
      context:
        'PCS and life-sciences hiring; elevators and COIs on coastal multifamily are common.',
    },
    {
      label: 'San Diego → Houston / Texas Gulf Coast',
      direction: 'outbound',
      context:
        'Energy, healthcare, and cost-driven long-distance; plan volume surveys carefully.',
      href: '/resources/routes/san-diego-to-houston',
    },
    {
      label: 'San Diego → Arizona desert metros',
      direction: 'outbound',
      context:
        'Short interstate via I-8; coastal origin access still drives origin fees more than miles.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'San Diego → Florida / Southeast',
      direction: 'outbound',
      context:
        'Long-haul Sun Belt exits; transit spreads widen on consolidated trucks.',
      href: '/resources/routes/california-to-florida',
    },
    {
      label: 'La Jolla / Del Mar coastal condo moves',
      direction: 'within',
      context:
        'Narrow streets and building rules; reserve loading zones early in tourist season.',
    },
  ],
  'santa-clara': [
    {
      label: 'Within Silicon Valley (San Jose ↔ Sunnyvale / Mountain View)',
      direction: 'within',
      context:
        'Tech-campus apartment turnover; elevator reservations and COIs fill weeks ahead in peak.',
    },
    {
      label: 'Other Bay metros → Santa Clara County tech hubs',
      direction: 'inbound',
      context:
        'Job-driven inflows; garage apartments and townhomes need accurate inventory surveys.',
    },
    {
      label: 'Santa Clara → Austin / Texas tech corridors',
      direction: 'outbound',
      context:
        'High-volume tech relocations; compare dedicated vs consolidated for timing control.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'Silicon Valley → Oregon / Pacific Northwest',
      direction: 'outbound',
      context:
        'Remote-work and lifestyle exits; West Coast interstate with different destination access.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Santa Clara → Arizona lower-cost housing',
      direction: 'outbound',
      context:
        'Cost-of-living exits from Peninsula-adjacent pricing; short Sun Belt corridor from the Bay.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Cupertino / Palo Alto-adjacent luxury stock',
      direction: 'within',
      context:
        'High-value inventory and HOA white-glove rules; full-value protection discussions matter.',
    },
  ],
  alameda: [
    {
      label: 'Within Alameda County (Oakland ↔ Fremont / Berkeley)',
      direction: 'within',
      context:
        'Hills, street parking, and older multifamily stairs — access surveys beat map distance.',
    },
    {
      label: 'SF / Peninsula → East Bay space & schools',
      direction: 'inbound',
      context:
        'Cross-bay lifestyle moves; bridge traffic and elevator windows shape crew start times.',
    },
    {
      label: 'East Bay → Texas / Austin job markets',
      direction: 'outbound',
      context:
        'Tech and family long-distance; Bay origin COIs still apply even when destination is simple.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'Alameda County → Pacific Northwest',
      direction: 'outbound',
      context:
        'I-5 corridor lifestyle moves; rain-season delivery planning differs from Bay summers.',
      href: '/resources/routes/california-to-washington',
    },
    {
      label: 'Oakland / Berkeley walk-up and hillside homes',
      direction: 'within',
      context:
        'Long carries and limited truck staging; ask about shuttle and stair policies in writing.',
    },
    {
      label: 'East Bay → Arizona / Sun Belt',
      direction: 'outbound',
      context:
        'Cost-driven interstate; Bay pickup complexity often outweighs desert destination fees.',
      href: '/resources/routes/california-to-arizona',
    },
  ],
  riverside: [
    {
      label: 'Within Riverside County (Riverside ↔ Corona / Temecula)',
      direction: 'within',
      context:
        'Sprawling inland suburbs; longer local drives and HOA gate codes on new-build tracts.',
    },
    {
      label: 'LA / OC → Inland Empire value housing',
      direction: 'inbound',
      context:
        'Affordability inflows; master-planned communities often need shuttle trucks on interior streets.',
    },
    {
      label: 'Riverside County → Arizona growth metros',
      direction: 'outbound',
      context:
        'I-10 cost-of-living corridor; among the shortest CA→AZ household-goods hauls.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'IE → Texas family & job markets',
      direction: 'outbound',
      context:
        'Long-distance household goods; volume estimates matter more than local hourly rates.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Temecula / Murrieta wine-country estates',
      direction: 'within',
      context:
        'Larger homes and long driveways; inventory surveys should capture outdoor and garage gear.',
    },
    {
      label: 'Riverside → Idaho / Mountain West',
      direction: 'outbound',
      context:
        'Remote-work and lifestyle exits; multi-state transit with seasonal mountain weather risk.',
      href: '/resources/routes/california-to-idaho',
    },
  ],
  'san-bernardino': [
    {
      label: 'Within San Bernardino County (SB city ↔ Rancho / Fontana / High Desert)',
      direction: 'within',
      context:
        'Mountain and desert access differ by city; wind and grade change truck choice.',
    },
    {
      label: 'LA metro → San Bernardino County space',
      direction: 'inbound',
      context:
        'Workforce and family inflows for larger lots; new tracts may lack finished staging space.',
    },
    {
      label: 'San Bernardino County → Arizona',
      direction: 'outbound',
      context:
        'Direct I-10 / I-40 Sun Belt exits; desert heat shapes summer delivery windows.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'IE mountains → Texas long-distance',
      direction: 'outbound',
      context:
        'Cost and job-driven interstate; confirm FMCSA authority for true out-of-state hauls.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Lake Arrowhead / Big Bear cabin & second-home moves',
      direction: 'within',
      context:
        'Seasonal roads, steep grades, and weather holds — confirm access before peak winter.',
    },
    {
      label: 'High Desert → Oregon / Northwest',
      direction: 'outbound',
      context:
        'Long West Coast corridor; plan for multi-day transit and destination climate differences.',
      href: '/resources/routes/california-to-oregon',
    },
  ],
  sacramento: [
    {
      label: 'Within Sacramento County (Downtown ↔ Elk Grove / Roseville-adjacent)',
      direction: 'within',
      context:
        'Capital multifamily vs suburban tract homes; building rules differ by neighborhood type.',
    },
    {
      label: 'Bay Area → Sacramento affordability corridor',
      direction: 'inbound',
      context:
        'Remote and hybrid workers trading rent for space; I-80 congestion shapes load-day timing.',
    },
    {
      label: 'Sacramento → Texas job markets',
      direction: 'outbound',
      context:
        'State-worker and private-sector long-distance; use volume-based interstate quotes.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Sacramento → Pacific Northwest',
      direction: 'outbound',
      context:
        'I-5 lifestyle and career moves; rain-season destination access differs from Valley summers.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Midtown / Downtown Sacramento loft and tower moves',
      direction: 'within',
      context:
        'Elevators, COIs, and street permits; book building windows before you lock a crew date.',
    },
    {
      label: 'Sacramento Valley → Arizona',
      direction: 'outbound',
      context:
        'Sun Belt cost exits; longer than SoCal→AZ but still a high-volume West corridor.',
      href: '/resources/routes/california-to-arizona',
    },
  ],
  'contra-costa': [
    {
      label: 'Within Contra Costa (Walnut Creek ↔ Concord / Antioch)',
      direction: 'within',
      context:
        'East Bay suburbs with BART-adjacent apartments and hillside single-family access limits.',
    },
    {
      label: 'SF / Oakland → Contra Costa schools & space',
      direction: 'inbound',
      context:
        'Family inflows to Lamorinda and central county; HOA and elevator rules on newer condos.',
    },
    {
      label: 'Contra Costa → Austin / Texas tech',
      direction: 'outbound',
      context:
        'Bay-adjacent tech exits; origin COI lead times still apply before long-haul load-out.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'East Bay suburbs → Washington / Oregon',
      direction: 'outbound',
      context:
        'Pacific Northwest lifestyle corridor; plan multi-day transit and rain-season delivery.',
      href: '/resources/routes/california-to-washington',
    },
    {
      label: 'Lafayette / Orinda hillside estates',
      direction: 'within',
      context:
        'Narrow roads and long carries; shuttle trucks and parking plans should be line items.',
    },
    {
      label: 'Contra Costa → Arizona lower housing costs',
      direction: 'outbound',
      context:
        'Cost-of-living interstate from East Bay pricing tiers into Valley of the Sun markets.',
      href: '/resources/routes/california-to-arizona',
    },
  ],
  'san-francisco': [
    {
      label: 'Within San Francisco (Mission ↔ Sunset / SOMA towers)',
      direction: 'within',
      context:
        'Steep streets, stair carries, and freight-elevator COIs — access is the whole job.',
    },
    {
      label: 'East Coast / national → San Francisco tech',
      direction: 'inbound',
      context:
        'Long-haul inbound to dense origin-style delivery; building rules start days before arrival.',
      href: '/resources/routes/east-coast-to-west-coast',
    },
    {
      label: 'San Francisco → Austin tech relocations',
      direction: 'outbound',
      context:
        'Signature Bay-to-Texas corridor; compare spreads on dedicated vs consolidated trucks.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'SF → New York / East Coast reverse moves',
      direction: 'outbound',
      context:
        'Coast-to-coast household goods; high-value urban inventory needs careful packing scope.',
      href: '/resources/routes/california-to-new-york',
    },
    {
      label: 'SF → Pacific Northwest',
      direction: 'outbound',
      context:
        'Lifestyle and hybrid-work exits up I-5; rain-season destination access differs from fog-city load-outs.',
      href: '/resources/routes/california-to-washington',
    },
    {
      label: 'SOMA / Financial District high-rise moves',
      direction: 'within',
      context:
        'Dock reservations, elevator banks, and security escorts — get building contacts in writing.',
    },
  ],
  'san-mateo': [
    {
      label: 'Within San Mateo County (Daly City ↔ Redwood City / Pacifica)',
      direction: 'within',
      context:
        'Peninsula density, coastal weather, and HOA elevators on mid-rise stock.',
    },
    {
      label: 'SF / South Bay → San Mateo mid-Peninsula',
      direction: 'inbound',
      context:
        'Commute-driven local moves; garage apartments and townhomes need tight inventory counts.',
    },
    {
      label: 'Peninsula → Austin / Texas',
      direction: 'outbound',
      context:
        'Tech and biotech long-distance; Bay origin accessorials often exceed destination fees.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'San Mateo County → Oregon / Washington',
      direction: 'outbound',
      context:
        'West Coast lifestyle corridor; plan multi-day transit and different climate packing needs.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Hillsborough / Atherton estate moves',
      direction: 'within',
      context:
        'High-value inventory, long drives, and gated access — white-glove scope is common.',
    },
    {
      label: 'Peninsula → Arizona cost relief',
      direction: 'outbound',
      context:
        'Housing-cost exits from Peninsula premiums into Phoenix-area markets.',
      href: '/resources/routes/california-to-arizona',
    },
  ],
  ventura: [
    {
      label: 'Within Ventura County (Ventura ↔ Oxnard / Thousand Oaks)',
      direction: 'within',
      context:
        'Coastal towns vs Conejo Valley suburbs; ag-adjacent roads and HOA gates both appear.',
    },
    {
      label: 'LA County → Ventura space & schools',
      direction: 'inbound',
      context:
        'Lifestyle step-outs from denser LA pricing; hillside and canyon access on many homes.',
    },
    {
      label: 'Ventura County → Arizona',
      direction: 'outbound',
      context:
        'SoCal-to-desert corridor without LA core permit intensity — still interstate FMCSA rules.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Ventura → Texas long-distance',
      direction: 'outbound',
      context:
        'Job and family exits; volume-based quotes beat local hourly thinking for true interstate.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Thousand Oaks / Westlake HOA communities',
      direction: 'within',
      context:
        'Gate codes, COIs, and timed move windows — get HOA rules before comparing crew rates.',
    },
    {
      label: 'Ventura coast → Pacific Northwest',
      direction: 'outbound',
      context:
        'Coastal-to-coastal lifestyle moves; rain-season delivery differs from dry Ventura load-outs.',
      href: '/resources/routes/california-to-washington',
    },
  ],
  fresno: [
    {
      label: 'Within Fresno County (Fresno city ↔ Clovis / North Fresno)',
      direction: 'within',
      context:
        'Central Valley suburban stock; summer heat and longer local distances than coastal metros.',
    },
    {
      label: 'Bay Area / LA → Fresno affordability',
      direction: 'inbound',
      context:
        'Cost-driven inflows for larger homes; simpler truck access than coastal dense cores.',
    },
    {
      label: 'Fresno → Arizona / Sun Belt',
      direction: 'outbound',
      context:
        'Valley-to-desert interstate; heat planning on both ends for summer deliveries.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Central Valley → Texas job markets',
      direction: 'outbound',
      context:
        'Agriculture-adjacent and professional long-distance; FMCSA carriers for out-of-state hauls.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Fresno → Pacific Northwest',
      direction: 'outbound',
      context:
        'I-5 corridor lifestyle and career moves; multi-day transit from the Central Valley.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Clovis family-home and new-build tracts',
      direction: 'within',
      context:
        'Cul-de-sac staging and garage-heavy inventory; surveys should capture outdoor equipment.',
    },
  ],
  kern: [
    {
      label: 'Within Kern (Bakersfield ↔ Southwest / Rosedale)',
      direction: 'within',
      context:
        'Metro tract and HOA jobs; summer heat and longer cross-town pairs on 99 / 58 matter more than map miles.',
    },
    {
      label: 'Bakersfield ↔ Tehachapi / mountain-edge towns',
      direction: 'within',
      context:
        'Elevation, wind, and grade access; full trailers may need staging plans on mountain approaches.',
    },
    {
      label: 'LA / OC → Bakersfield value housing',
      direction: 'inbound',
      context:
        'Cost-driven SoCal inflows; industrial and ag-related employment anchors local demand.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'Kern → Arizona / Nevada job markets',
      direction: 'outbound',
      context:
        'Short desert interstate; heat planning on both ends for summer deliveries.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Kern → Texas energy / logistics corridors',
      direction: 'outbound',
      context:
        'Long-distance household goods; volume estimates drive linehaul more than hourly local rates.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Ridgecrest / Lake Isabella edge properties',
      direction: 'within',
      context:
        'Longer empty miles and rural approaches; surveys should capture outbuildings and unpaved access.',
    },
  ],
  'san-joaquin': [
    {
      label: 'Within San Joaquin (Stockton ↔ Tracy / Manteca / Lathrop)',
      direction: 'within',
      context:
        'Core urban multi-unit vs warehouse-adjacent new growth; HOA windows common in Tracy/Lathrop tracts.',
    },
    {
      label: 'Bay Area → Tracy / South County overflow',
      direction: 'inbound',
      context:
        'Altamont / 580–205 commute housing demand; end-of-month weekends fill early.',
    },
    {
      label: 'Stockton core multi-unit and older SFH',
      direction: 'within',
      context:
        'Stairs, tight streets, and longer carries; photo the approach with the estimate request.',
    },
    {
      label: 'San Joaquin → Sacramento metro',
      direction: 'outbound',
      context:
        'Short regional hop; still confirm portal-to-portal pricing on peak I-5 windows.',
    },
    {
      label: 'Central Valley → Arizona / Texas',
      direction: 'outbound',
      context:
        'Affordability-driven long-distance; FMCSA carriers for out-of-state legs.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Lodi / North County wine-adjacent towns',
      direction: 'within',
      context:
        'Smaller downtowns and rural edges; harvest-season traffic can slow two-lane approaches.',
    },
  ],
  sonoma: [
    {
      label: 'Within Sonoma (Santa Rosa ↔ Petaluma / Rohnert Park)',
      direction: 'within',
      context:
        'Urban multi-unit and suburban tracts; 101 timing between city clusters is a line item.',
    },
    {
      label: 'Wine-country towns (Healdsburg / Sonoma / Sebastopol)',
      direction: 'within',
      context:
        'Tourism-season congestion and rural/ag approaches; harvest weeks change street access.',
    },
    {
      label: 'Bay Area / SF → Sonoma lifestyle',
      direction: 'inbound',
      context:
        'Hybrid remote and lifestyle inflows; premium inventory and HOA rules on newer tracts.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'Sonoma → Oregon / Washington',
      direction: 'outbound',
      context:
        'Coastal-to-PNW lifestyle exits; multi-day interstate household goods.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Sonoma → Southern California job markets',
      direction: 'outbound',
      context:
        'I-5 long-haul; wine-country origin accessorials still matter at pickup.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Rural/ag edge and hillside properties',
      direction: 'within',
      context:
        'Driveway grade, soft shoulders, and fire-season access windows; survey early.',
    },
  ],
  placer: [
    {
      label: 'Within South Placer (Roseville ↔ Rocklin / Lincoln)',
      direction: 'within',
      context:
        'HOA master-plans and cul-de-sac staging; garage-heavy inventory is common.',
    },
    {
      label: 'Roseville / Rocklin ↔ Auburn foothills',
      direction: 'within',
      context:
        'Elevation and windier approaches; truck length and turn radius change above the valley floor.',
    },
    {
      label: 'Bay Area → Placer / Sacramento spillover',
      direction: 'inbound',
      context:
        'Cost and space-driven family inflows into South Placer growth cities.',
    },
    {
      label: 'Placer → Reno / Northern Nevada',
      direction: 'outbound',
      context:
        'Sierra corridor interstate; winter weather can reshape delivery windows.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Placer → Pacific Northwest',
      direction: 'outbound',
      context:
        'I-5 long-distance lifestyle moves; volume estimates beat hourly local quotes.',
      href: '/resources/routes/california-to-oregon',
    },
    {
      label: 'Sierra-edge seasonal and second-home logistics',
      direction: 'within',
      context:
        'Toward Tahoe approaches: snow, chain controls, and limited staging — not a Roseville tract job.',
    },
  ],
  'santa-barbara': [
    {
      label: 'Within coastal Santa Barbara (SB core ↔ Montecito / Carpinteria)',
      direction: 'within',
      context:
        'Constrained streets, elevators, and high-value inventory; COI and staging dominate cost.',
    },
    {
      label: 'Goleta / UCSB corridor multi-unit',
      direction: 'within',
      context:
        'Student and staff turnover calendars; elevators and lease-end clusters fill crews.',
    },
    {
      label: 'Santa Barbara ↔ North County (Santa Maria / Lompoc)',
      direction: 'within',
      context:
        'Long county pairs on 101 / 154; treat as a real logistics hop, not a short local.',
    },
    {
      label: 'LA / Ventura → Santa Barbara coast',
      direction: 'inbound',
      context:
        'Lifestyle and professional inflows; coastal access rules differ from LA density.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'Santa Barbara → Bay Area / Silicon Valley',
      direction: 'outbound',
      context:
        'Coast-to-coast California long local/interstate planning; high-value packing matters.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'Santa Barbara → Arizona / Texas',
      direction: 'outbound',
      context:
        'Long-distance household goods; FMCSA carriers for out-of-state legs.',
      href: '/resources/routes/california-to-arizona',
    },
  ],
  monterey: [
    {
      label: 'Within Monterey Peninsula (Monterey ↔ Pacific Grove / Carmel)',
      direction: 'within',
      context:
        'Tourism traffic, tight coastal streets, and condo/elevator rules shape the day.',
    },
    {
      label: 'Peninsula ↔ Salinas Valley (Salinas / Mid Valley)',
      direction: 'within',
      context:
        'Coastal vs ag-valley contrast; longer empty miles and different housing stock.',
    },
    {
      label: 'Bay Area → Monterey Peninsula lifestyle',
      direction: 'inbound',
      context:
        'Second-home and remote-work inflows; peak tourism weeks raise access friction.',
    },
    {
      label: 'Salinas Valley ag-adjacent family moves',
      direction: 'within',
      context:
        'Inland heat and farm-road approaches; not interchangeable with Carmel access.',
    },
    {
      label: 'Monterey → Southern California',
      direction: 'outbound',
      context:
        '101 corridor long-distance; coastal origin packing for salt air and hills.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Monterey → Pacific Northwest',
      direction: 'outbound',
      context:
        'Coastal-to-PNW lifestyle exits; multi-day interstate household goods.',
      href: '/resources/routes/california-to-oregon',
    },
  ],
};

/** Florida county routes — region-specific (South FL ≠ Tampa Bay ≠ Orlando ≠ Jax). */
const FL_ROUTES: Record<string, CountyPopularRoute[]> = {
  'miami-dade': [
    {
      label: 'Within Miami-Dade (Brickell / Downtown ↔ Coral Gables / Kendall)',
      direction: 'within',
      context:
        'High-rise freight elevators, COIs, and street permits dominate cost more than map miles.',
    },
    {
      label: 'Miami Beach / South Beach condo and hotel-adjacent moves',
      direction: 'within',
      context:
        'Loading zones, flood-prone parking, and building blackout windows — survey access first.',
    },
    {
      label: 'Northeast & Mid-Atlantic → Greater Miami',
      direction: 'inbound',
      context:
        'Snowbird and career inflows into dense condo stock; reserve elevators weeks ahead in peak.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'New Jersey / Tri-State → Miami metro',
      direction: 'inbound',
      context:
        'Family and professional relocations; international shipping add-ons are common at origin/dest.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Miami-Dade → Northeast return / dual-home corridors',
      direction: 'outbound',
      context:
        'Seasonal reverse flows; volume and valuation coverage matter more than hourly local rates.',
      href: '/resources/routes/florida-to-new-york',
    },
    {
      label: 'Homestead / South Dade single-family & HOA moves',
      direction: 'within',
      context:
        'Longer empty miles from the urban core; HOA certificates and gate codes shape load day.',
    },
  ],
  broward: [
    {
      label: 'Within Broward (Fort Lauderdale ↔ Hollywood / Plantation / Coral Springs)',
      direction: 'within',
      context:
        'Canal-adjacent streets, mid-rise elevators, and I-95 traffic windows change crew hours.',
    },
    {
      label: 'Las Olas / downtown Fort Lauderdale waterfront condos',
      direction: 'within',
      context:
        'Tight staging and boat-traffic-adjacent blocks; COI and freight-elevator rules are routine.',
    },
    {
      label: 'Northeast → Broward beaches & western suburbs',
      direction: 'inbound',
      context:
        'Often chosen as a Miami-adjacent alternative; building access still drives origin fees.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Pennsylvania / Mid-Atlantic → Broward County',
      direction: 'inbound',
      context:
        'Retirement and remote-work inflows into Weston, Parkland, and coastal multifamily.',
      href: '/resources/routes/pennsylvania-to-florida',
    },
    {
      label: 'Broward ↔ Miami-Dade / Palm Beach cross-county hops',
      direction: 'within',
      context:
        'Regional pairs on I-95 / Turnpike; treat as logistics hops, not short suburban quotes.',
    },
    {
      label: 'Broward → Northeast seasonal reverse moves',
      direction: 'outbound',
      context:
        'Snowbird return legs; plan multi-day interstate household goods, not local hourly crews.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  'palm-beach': [
    {
      label: 'Within Palm Beach (West Palm ↔ Boca Raton / Jupiter / Wellington)',
      direction: 'within',
      context:
        'Golf-community HOAs, gated estates, and high-value inventory surveys beat map-mile quotes.',
    },
    {
      label: 'Island / Intracoastal access (Palm Beach island & coastal cores)',
      direction: 'within',
      context:
        'Bridge timing, limited truck length, and luxury packing standards — not a mainland tract job.',
    },
    {
      label: 'Northeast & New Jersey → Palm Beach retirement corridors',
      direction: 'inbound',
      context:
        'Classic snowbird and permanent relocation demand; peak winter booking fills carriers early.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'New York metro → Boca / Delray / West Palm',
      direction: 'inbound',
      context:
        'Family and empty-nester inflows; condo elevators and HOA windows are the access bottleneck.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Illinois / Midwest → Palm Beach County',
      direction: 'inbound',
      context:
        'Longer Sun Belt legs into coastal and western communities; volume estimates drive linehaul.',
      href: '/resources/routes/illinois-to-florida',
    },
    {
      label: 'Palm Beach → Northeast dual-residence logistics',
      direction: 'outbound',
      context:
        'Seasonal household goods north; FMCSA authority and valuation coverage required.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  hillsborough: [
    {
      label: 'Within Hillsborough (Tampa core ↔ Brandon / Riverview / Carrollwood)',
      direction: 'within',
      context:
        'Bay-area traffic, downtown elevators, and suburban garage stock — not a South Florida high-rise day.',
    },
    {
      label: 'South Tampa / Hyde Park / Channelside multi-unit',
      direction: 'within',
      context:
        'Urban street parking and building COIs; shuttle need shows up on older blocks near the bay.',
    },
    {
      label: 'Northeast → Tampa Bay job & lifestyle markets',
      direction: 'inbound',
      context:
        'Finance, healthcare, and remote-work inflows; plan for humidity packing and storm-season windows.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Midwest → Hillsborough / Greater Tampa',
      direction: 'inbound',
      context:
        'Cost and career corridors into I-4 suburbs; longer empty miles from coastal origins possible.',
      href: '/resources/routes/illinois-to-florida',
    },
    {
      label: 'Hillsborough ↔ Pinellas / Pasco cross-bay pairs',
      direction: 'within',
      context:
        'Bridge and causeway timing matter; treat as regional logistics, not a short local hop.',
    },
    {
      label: 'Tampa Bay → Northeast career reverse moves',
      direction: 'outbound',
      context:
        'Corporate and family exits north; multi-day interstate linehaul with inventory surveys.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  orange: [
    {
      label: 'Within Orange (Downtown Orlando ↔ Winter Park / Dr. Phillips / Lake Nona)',
      direction: 'within',
      context:
        'Tourism traffic, theme-park-adjacent timing, and master-planned HOAs reshape load windows.',
    },
    {
      label: 'International Drive / tourist-corridor apartments',
      direction: 'within',
      context:
        'Short-term rental and hospitality turnover; elevators and guest-traffic blackout hours are common.',
    },
    {
      label: 'Northeast → Orlando metro (jobs, theme parks, healthcare)',
      direction: 'inbound',
      context:
        'Career and family inflows into I-4 suburbs; not interchangeable with Miami condo logistics.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Massachusetts / New England → Orange County FL',
      direction: 'inbound',
      context:
        'Lifestyle and remote-work relocations; summer heat and afternoon storms affect delivery windows.',
      href: '/resources/routes/massachusetts-to-florida',
    },
    {
      label: 'Orange ↔ Seminole / Osceola / Lake County pairs',
      direction: 'within',
      context:
        'Central Florida sprawl on I-4 and 417; longer empty miles than downtown-only quotes imply.',
    },
    {
      label: 'Orlando → Northeast / Mid-Atlantic reverse corridors',
      direction: 'outbound',
      context:
        'Job-change and family long-distance; FMCSA carriers for true interstate household goods.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  pinellas: [
    {
      label: 'Within Pinellas (St. Petersburg ↔ Clearwater / Largo / Seminole)',
      direction: 'within',
      context:
        'Peninsula geography, beach traffic, and bridge approaches — staging beats raw map miles.',
    },
    {
      label: 'Downtown St. Pete / waterfront condo corridor',
      direction: 'within',
      context:
        'Freight elevators, street permits, and festival calendars; reserve access early in peak season.',
    },
    {
      label: 'Northeast → Pinellas beaches & barrier islands',
      direction: 'inbound',
      context:
        'Retirement and lifestyle inflows; causeway and truck-length limits change equipment choices.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Minnesota / Upper Midwest → Pinellas County',
      direction: 'inbound',
      context:
        'Classic snowbird corridor into Clearwater and coastal multifamily; winter booking spikes.',
      href: '/resources/routes/minnesota-to-florida',
    },
    {
      label: 'Pinellas ↔ Hillsborough cross-bay (Gandy / Howard Frankland)',
      direction: 'within',
      context:
        'Bridge timing and traffic peaks; treat as a regional hop with different origin vs dest access.',
    },
    {
      label: 'Pinellas → Northeast seasonal reverse moves',
      direction: 'outbound',
      context:
        'Snowbird return north; plan consolidated vs dedicated transit spreads carefully.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  duval: [
    {
      label: 'Within Duval (Downtown Jacksonville ↔ Southside / Riverside / Beaches)',
      direction: 'within',
      context:
        'River-crossing traffic, naval-adjacent timing, and suburban sprawl — Northeast FL, not South FL.',
    },
    {
      label: 'Jacksonville Beaches / Intracoastal access moves',
      direction: 'within',
      context:
        'Bridge approaches and tourism peaks; truck length and staging differ from inland Southside.',
    },
    {
      label: 'Northeast → Jacksonville job & military markets',
      direction: 'inbound',
      context:
        'Logistics, finance, and PCS-related inflows; plan building COIs on urban multifamily.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Pennsylvania / Mid-Atlantic → Duval County',
      direction: 'inbound',
      context:
        'I-95 corridor inflows into growing suburbs; longer empty miles than beach-only quotes suggest.',
      href: '/resources/routes/pennsylvania-to-florida',
    },
    {
      label: 'Duval ↔ St. Johns / Clay / Nassau cross-county pairs',
      direction: 'within',
      context:
        'North Florida regional hops; treat as real logistics days, not short local apartment jobs.',
    },
    {
      label: 'Jacksonville → Northeast / Mid-Atlantic reverse moves',
      direction: 'outbound',
      context:
        'Career and family long-distance north; FMCSA authority for interstate household goods.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  lee: [
    {
      label: 'Within Lee (Fort Myers ↔ Cape Coral / Estero / Bonita Springs)',
      direction: 'within',
      context:
        'Canal-lot driveways, hurricane rebuild stock, and bridge traffic — Southwest FL logistics.',
    },
    {
      label: 'Cape Coral / waterfront single-family corridors',
      direction: 'within',
      context:
        'Long canal streets and limited turnarounds; survey for truck size before hourly comparisons.',
    },
    {
      label: 'Northeast & Mid-Atlantic → Fort Myers / Lee snowbird markets',
      direction: 'inbound',
      context:
        'Seasonal and permanent inflows; peak winter demand fills crews and long-distance capacity.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Midwest → Lee County (Fort Myers / Cape Coral)',
      direction: 'inbound',
      context:
        'Classic snowbird corridor; garage-heavy homes and HOA rules dominate destination access.',
      href: '/resources/routes/illinois-to-florida',
    },
    {
      label: 'Lee ↔ Collier / Charlotte cross-county pairs',
      direction: 'within',
      context:
        'SWFL regional hops on I-75; storm-season windows can reshape delivery schedules.',
    },
    {
      label: 'Lee → Northeast seasonal reverse logistics',
      direction: 'outbound',
      context:
        'Snowbird return legs; multi-day interstate with careful inventory and valuation planning.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  polk: [
    {
      label: 'Within Polk (Lakeland ↔ Winter Haven / Bartow / Haines City)',
      direction: 'within',
      context:
        'Inland I-4 midpoint sprawl between Tampa and Orlando — not a beach-access or high-rise day.',
    },
    {
      label: 'Lakeland / Winter Haven family single-family moves',
      direction: 'within',
      context:
        'Garage stock, cul-de-sac staging, and longer empty miles across a large rural-suburban county.',
    },
    {
      label: 'Northeast → Polk / Central Florida affordability corridor',
      direction: 'inbound',
      context:
        'Cost-driven inflows between Tampa and Orlando metros; plan humidity packing and storm season.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Pennsylvania → Polk County growth markets',
      direction: 'inbound',
      context:
        'Family long-distance into I-4 suburbs; volume surveys beat hourly local-style quotes.',
      href: '/resources/routes/pennsylvania-to-florida',
    },
    {
      label: 'Polk ↔ Hillsborough / Orange / Osceola job-corridor pairs',
      direction: 'within',
      context:
        'Commuter-belt regional hops; treat as logistics days with different origin and dest rules.',
    },
    {
      label: 'Polk → Northeast reverse / dual-home moves',
      direction: 'outbound',
      context:
        'Family and seasonal exits north; FMCSA carriers for true interstate household goods.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  brevard: [
    {
      label: 'Within Brevard (Melbourne ↔ Cocoa / Palm Bay / Titusville)',
      direction: 'within',
      context:
        'Space Coast sprawl on US-1 and I-95; longer empty miles than a single beach-town quote implies.',
    },
    {
      label: 'Cocoa Beach / barrier-island access moves',
      direction: 'within',
      context:
        'Causeway timing, tourist traffic, and limited staging — equipment choice differs from inland Palm Bay.',
    },
    {
      label: 'Northeast → Space Coast (aerospace & lifestyle)',
      direction: 'inbound',
      context:
        'Tech, defense, and retirement inflows; not interchangeable with Miami or Orlando condo logistics.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'New Jersey → Brevard County',
      direction: 'inbound',
      context:
        'Family and snowbird corridors into coastal and mainland stock; winter booking still spikes.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Brevard ↔ Orange / Volusia / Indian River pairs',
      direction: 'within',
      context:
        'East-central Florida regional hops; plan real drive time, not downtown-only hourly math.',
    },
    {
      label: 'Brevard → Northeast reverse corridors',
      direction: 'outbound',
      context:
        'Career and family long-distance north; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  pasco: [
    {
      label: 'Within Pasco (Wesley Chapel ↔ New Port Richey / Land O\' Lakes / Zephyrhills)',
      direction: 'within',
      context:
        'North Tampa Bay growth suburbs and Gulf-adjacent towns — sprawl and HOAs, not urban high-rises.',
    },
    {
      label: 'Wesley Chapel / Wiregrass master-planned communities',
      direction: 'within',
      context:
        'HOA certificates, gate codes, and new-construction streets; garage-heavy inventory is common.',
    },
    {
      label: 'Northeast → Pasco / North Tampa Bay affordability belt',
      direction: 'inbound',
      context:
        'Family cost exits into growing suburbs; humidity and storm season shape delivery windows.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Midwest → Pasco County',
      direction: 'inbound',
      context:
        'Snowbird and permanent inflows into Gulf-side and inland stock; volume estimates drive linehaul.',
      href: '/resources/routes/illinois-to-florida',
    },
    {
      label: 'Pasco ↔ Hillsborough / Pinellas / Hernando pairs',
      direction: 'within',
      context:
        'Tampa Bay north-side regional hops; bridge and highway peaks change crew day length.',
    },
    {
      label: 'Pasco → Northeast reverse / family long-distance',
      direction: 'outbound',
      context:
        'Job-change exits north; FMCSA carriers and valuation coverage for interstate household goods.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  volusia: [
    {
      label: 'Within Volusia (Daytona Beach ↔ Deltona / Port Orange / Ormond Beach)',
      direction: 'within',
      context:
        'I-95 and beach-tourism traffic; inland Deltona stock differs sharply from coastal access rules.',
    },
    {
      label: 'Daytona / beachside condo and event-calendar moves',
      direction: 'within',
      context:
        'Race weeks and spring-break peaks raise parking and loading friction — book access early.',
    },
    {
      label: 'Northeast → Volusia beaches & I-95 corridor',
      direction: 'inbound',
      context:
        'Retirement and lifestyle inflows; not a Miami high-rise job and not an Orlando theme-park corridor.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Pennsylvania → Volusia County',
      direction: 'inbound',
      context:
        'Mid-Atlantic snowbird and family moves into coastal and inland communities.',
      href: '/resources/routes/pennsylvania-to-florida',
    },
    {
      label: 'California → Volusia / Central-East Florida',
      direction: 'inbound',
      context:
        'Long-haul Sun Belt inflows; transit spreads widen on consolidated trucks.',
      href: '/resources/routes/california-to-florida',
    },
    {
      label: 'Volusia → Northeast reverse seasonal moves',
      direction: 'outbound',
      context:
        'Snowbird and dual-home logistics north; multi-day interstate household goods planning.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
};

export function getCountyPopularRoutes(
  stateSlug: string,
  countySlug: string
): CountyPopularRoute[] {
  if (stateSlug === 'new-jersey') return NJ_ROUTES[countySlug] ?? [];
  if (stateSlug === 'california') return CA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'florida') return FL_ROUTES[countySlug] ?? [];
  return [];
}
