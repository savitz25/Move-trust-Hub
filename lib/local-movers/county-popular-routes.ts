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

/** Texas — Texas Triangle, energy/tech/military, CA & Northeast/Midwest inflows, border markets. */
const TX_ROUTES: Record<string, CountyPopularRoute[]> = {
  harris: [
    {
      label: 'Within Harris (Downtown / Medical Center ↔ Energy Corridor / Katy)',
      direction: 'within',
      context:
        'High-rise freight elevators vs master-planned HOAs; I-10 and 610 loop traffic reshape crew hours.',
    },
    {
      label: 'San Diego / SoCal → Greater Houston',
      direction: 'inbound',
      context:
        'Energy, healthcare, and cost-of-living inflows; plan volume surveys for large single-family stock.',
      href: '/resources/routes/san-diego-to-houston',
    },
    {
      label: 'California → Houston metro (statewide corridor)',
      direction: 'inbound',
      context:
        'Long-haul West Coast exits into Gulf Coast housing; dedicated vs consolidated transit spreads matter.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Houston ↔ Austin / San Antonio (Texas Triangle)',
      direction: 'outbound',
      context:
        'Regional corporate and family hops; treat as multi-hour logistics, not a short suburban quote.',
    },
    {
      label: 'New York / Northeast → Harris County job markets',
      direction: 'inbound',
      context:
        'Finance, energy trading, and medical relocations; elevator and garage access on mid-rise stock.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'Houston → California reverse career moves',
      direction: 'outbound',
      context:
        'Tech and dual-coast household goods; FMCSA carriers and full inventory valuation recommended.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  dallas: [
    {
      label: 'Within Dallas County (Uptown / Downtown ↔ Oak Cliff / Lake Highlands)',
      direction: 'within',
      context:
        'High-rise COIs and street permits downtown vs single-family cul-de-sacs — truck type changes.',
    },
    {
      label: 'Los Angeles → Dallas–Fort Worth career corridors',
      direction: 'inbound',
      context:
        'Corporate and cost-of-living exits from SoCal; volume drives linehaul more than map miles.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      label: 'Illinois / Midwest → Dallas metro',
      direction: 'inbound',
      context:
        'Corporate HQ and family Sun Belt moves; summer heat shapes delivery windows and crew pacing.',
      href: '/resources/routes/illinois-to-texas',
    },
    {
      label: 'Dallas ↔ Fort Worth / Collin northern suburbs',
      direction: 'within',
      context:
        'Cross-metro DFW pairs on I-35 / I-635; empty miles and HOA gate codes dominate short-hop quotes.',
    },
    {
      label: 'Northeast & Mid-Atlantic → Dallas job centers',
      direction: 'inbound',
      context:
        'Professional relocations into Uptown, Las Colinas-adjacent, and southern suburbs.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'Dallas → California entertainment & tech exits',
      direction: 'outbound',
      context:
        'Coast-bound reverse flows; multi-day interstate household goods, not local hourly crews.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  tarrant: [
    {
      label: 'Within Tarrant (Fort Worth Cultural District ↔ Arlington / Southlake)',
      direction: 'within',
      context:
        'Urban near-downtown stock vs northern master-planned communities — access rules differ sharply.',
    },
    {
      label: 'Los Angeles → Fort Worth / Mid-Cities DFW',
      direction: 'inbound',
      context:
        'Often chosen as a Dallas-adjacent alternative; still full interstate packing and valuation needs.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      label: 'Military & defense-adjacent PCS into Tarrant',
      direction: 'inbound',
      context:
        'NAS Fort Worth JRB and defense-contractor timing; flexible load days beat rock-bottom hourly rates.',
    },
    {
      label: 'California → Tarrant / western DFW suburbs',
      direction: 'inbound',
      context:
        'Family and aerospace-adjacent inflows; HOA certificates are routine in newer subdivisions.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Tarrant ↔ Dallas County cross-metro hops',
      direction: 'within',
      context:
        'I-30 / 183 corridor pairs; treat as regional logistics with traffic-window planning.',
    },
    {
      label: 'Fort Worth → California reverse moves',
      direction: 'outbound',
      context:
        'Career and dual-home coasts; use FMCSA household-goods carriers for true interstate legs.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  bexar: [
    {
      label: 'Within Bexar (Downtown / Pearl ↔ Stone Oak / Westover Hills)',
      direction: 'within',
      context:
        'River-walk tower elevators vs Hill Country edge HOAs; summer heat and hills change load plans.',
    },
    {
      label: 'Military PCS → Joint Base San Antonio area',
      direction: 'inbound',
      context:
        'Lackland, Fort Sam, and Randolph timing; short-notice local crews fill fast around order cycles.',
    },
    {
      label: 'California → San Antonio metro',
      direction: 'inbound',
      context:
        'Cost and lifestyle exits into military-adjacent and medical job markets.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'San Antonio ↔ Austin / Houston (Triangle legs)',
      direction: 'outbound',
      context:
        'I-35 and I-10 regional career hops; not a same-day suburban quote when furniture volume is full.',
    },
    {
      label: 'Midwest → Bexar County family corridors',
      direction: 'inbound',
      context:
        'Illinois and broader Midwest inflows into suburban single-family stock.',
      href: '/resources/routes/illinois-to-texas',
    },
    {
      label: 'San Antonio → California outbound careers',
      direction: 'outbound',
      context:
        'Long-haul West Coast household goods; inventory surveys beat map-mile estimates.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  travis: [
    {
      label: 'Within Travis (Downtown / East Austin ↔ Domain / South Congress corridors)',
      direction: 'within',
      context:
        'Condo freight elevators and street permits vs suburban garages — accessorials dominate cost.',
    },
    {
      label: 'San Francisco Bay Area → Austin tech corridor',
      direction: 'inbound',
      context:
        'Tech and startup relocations; elevators and timed windows on multifamily are common.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'California → Greater Austin (statewide)',
      direction: 'inbound',
      context:
        'Broader West Coast cost exits beyond SF; volume and transit spreads matter on consolidated trucks.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Northeast / New Jersey → Austin job markets',
      direction: 'inbound',
      context:
        'Finance and remote-hybrid professionals; COI and parking rules on central condos.',
      href: '/resources/routes/new-jersey-to-texas',
    },
    {
      label: 'Austin ↔ Houston / Dallas (Texas Triangle)',
      direction: 'outbound',
      context:
        'Corporate multi-city pairs; plan for multi-hour interstate-style logistics inside Texas.',
    },
    {
      label: 'Austin → California reverse tech moves',
      direction: 'outbound',
      context:
        'Return-to-coast and dual-office households; FMCSA authority required for true interstate legs.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  collin: [
    {
      label: 'Within Collin (Plano ↔ Frisco / McKinney / Allen)',
      direction: 'within',
      context:
        'Corporate north-DFW stock; HOA certificates, gate codes, and large-home inventories are routine.',
    },
    {
      label: 'Los Angeles → Collin County / northern DFW suburbs',
      direction: 'inbound',
      context:
        'Tech, telecom, and family cost exits into master-planned communities.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      label: 'Illinois / Chicago corridor → Collin corporate suburbs',
      direction: 'inbound',
      context:
        'HQ and professional relocations; summer delivery heat and HOA windows shape the day.',
      href: '/resources/routes/illinois-to-texas',
    },
    {
      label: 'New York → Plano / Frisco professional corridors',
      direction: 'inbound',
      context:
        'Finance and corporate inflows; not a downtown high-rise job — large single-family surveys matter.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'Collin ↔ Dallas County reverse-commute hops',
      direction: 'within',
      context:
        'North-south DFW pairs on the Tollway / 75; empty miles add more than raw drive time suggests.',
    },
    {
      label: 'Collin → California outbound careers',
      direction: 'outbound',
      context:
        'Coast-bound household goods from large suburban inventories; full packing scopes are common.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  denton: [
    {
      label: 'Within Denton (Denton / Lewisville ↔ Flower Mound / Argyle)',
      direction: 'within',
      context:
        'University-adjacent turnover vs lakeside and ranch-edge homes — truck access varies block by block.',
    },
    {
      label: 'California → Denton County growth corridor',
      direction: 'inbound',
      context:
        'DFW spillover housing for cost-sensitive families leaving the West Coast.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Minnesota / Upper Midwest → Denton metro edge',
      direction: 'inbound',
      context:
        'Climate and job-driven Sun Belt moves into newer subdivisions and townhome stock.',
      href: '/resources/routes/minnesota-to-texas',
    },
    {
      label: 'Los Angeles → western / northern DFW via Denton',
      direction: 'inbound',
      context:
        'Often priced as DFW-wide; confirm final city for elevator vs single-family labor models.',
      href: '/resources/routes/los-angeles-to-dallas-fort-worth',
    },
    {
      label: 'Denton ↔ Collin / Tarrant cross-county hops',
      direction: 'within',
      context:
        'I-35E / 121 regional pairs; treat as logistics hops with traffic-window planning.',
    },
    {
      label: 'Denton County → California reverse moves',
      direction: 'outbound',
      context:
        'Long-haul West Coast exits; inventory volume from larger homes drives linehaul.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  'fort-bend': [
    {
      label: 'Within Fort Bend (Sugar Land ↔ Missouri City / Richmond–Rosenberg)',
      direction: 'within',
      context:
        'Master-planned HOAs, gated communities, and large single-family inventories dominate quotes.',
    },
    {
      label: 'San Diego → Fort Bend / southwest Houston suburbs',
      direction: 'inbound',
      context:
        'Energy and healthcare families choosing Fort Bend over dense Houston core housing.',
      href: '/resources/routes/san-diego-to-houston',
    },
    {
      label: 'California → Fort Bend County',
      direction: 'inbound',
      context:
        'Cost and school-district-driven West Coast exits into planned communities.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Massachusetts / New England → Fort Bend family corridors',
      direction: 'inbound',
      context:
        'Corporate and medical relocations; full household-goods surveys for large suburban homes.',
      href: '/resources/routes/massachusetts-to-texas',
    },
    {
      label: 'Fort Bend ↔ Harris County Medical Center / Energy Corridor',
      direction: 'within',
      context:
        'Cross-county commute-pattern moves; HOA gate timing plus urban elevator rules on one end.',
    },
    {
      label: 'Fort Bend → California reverse family moves',
      direction: 'outbound',
      context:
        'Coast-bound dual-home and career logistics; FMCSA carriers for interstate household goods.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  montgomery: [
    {
      label: 'Within Montgomery (The Woodlands ↔ Conroe / Spring / Magnolia)',
      direction: 'within',
      context:
        'Forest-edge HOAs and corporate campuses; tree-lined streets and gate codes shape load day.',
    },
    {
      label: 'California → The Woodlands / Montgomery energy suburbs',
      direction: 'inbound',
      context:
        'Energy and corporate transfers into master-planned north-Houston stock.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Pennsylvania / Mid-Atlantic → Montgomery County',
      direction: 'inbound',
      context:
        'Professional and family Sun Belt moves; not a downtown high-rise job.',
      href: '/resources/routes/pennsylvania-to-texas',
    },
    {
      label: 'San Diego → north Houston / Montgomery corridor',
      direction: 'inbound',
      context:
        'Gulf Coast energy inflows landing north of the Loop rather than core Harris towers.',
      href: '/resources/routes/san-diego-to-houston',
    },
    {
      label: 'Montgomery ↔ Harris County reverse-commute hops',
      direction: 'within',
      context:
        'I-45 corridor pairs; empty miles and HOA access matter more than map distance.',
    },
    {
      label: 'Montgomery → California outbound careers',
      direction: 'outbound',
      context:
        'Long-haul reverse moves from large suburban inventories; packing scope drives price.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  williamson: [
    {
      label: 'Within Williamson (Round Rock ↔ Georgetown / Cedar Park / Hutto)',
      direction: 'within',
      context:
        'North-Austin tech and family stock; HOA windows and two-car garages are the default model.',
    },
    {
      label: 'San Francisco → Round Rock / north Austin tech edge',
      direction: 'inbound',
      context:
        'Bay Area cost exits into Williamson rather than central Travis condos.',
      href: '/resources/routes/san-francisco-to-austin',
    },
    {
      label: 'California → Williamson County growth towns',
      direction: 'inbound',
      context:
        'Broader West Coast inflows into new construction and master-planned communities.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'New York → north Austin / Williamson job markets',
      direction: 'inbound',
      context:
        'Tech and corporate relocations; single-family surveys beat downtown elevator quotes.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'Williamson ↔ Travis County (Domain / downtown Austin)',
      direction: 'within',
      context:
        'North-south metro pairs; one end HOA, the other freight elevator — plan both access rules.',
    },
    {
      label: 'Williamson → California reverse tech moves',
      direction: 'outbound',
      context:
        'Return-to-coast household goods; multi-day interstate planning and valuation coverage.',
      href: '/resources/routes/texas-to-california',
    },
  ],
  'el-paso': [
    {
      label: 'Within El Paso (Westside / Downtown ↔ Eastside / Mission Valley)',
      direction: 'within',
      context:
        'Desert hills, military-adjacent timing, and bilingual customer coordination shape crew plans.',
    },
    {
      label: 'Fort Bliss PCS & defense-contractor moves',
      direction: 'inbound',
      context:
        'Order cycles drive short-notice demand; flexible dates matter more than rock-bottom hourly rates.',
    },
    {
      label: 'California ↔ El Paso (I-10 borderland corridor)',
      direction: 'inbound',
      context:
        'West Coast family and logistics-linked inflows along the southern I-10 spine.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'El Paso → California outbound (I-10 west)',
      direction: 'outbound',
      context:
        'Common reverse corridor for careers and dual-state households; FMCSA for interstate goods.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'Midwest → El Paso military & medical corridors',
      direction: 'inbound',
      context:
        'Illinois and broader Midwest PCS-adjacent and hospital-system relocations.',
      href: '/resources/routes/illinois-to-texas',
    },
    {
      label: 'Cross-border / Juárez-adjacent household logistics',
      direction: 'within',
      context:
        'U.S.-side origin/destination only for interstate carriers; customs and dual-address plans need clarity early.',
    },
  ],
  hidalgo: [
    {
      label: 'Within Hidalgo (McAllen ↔ Edinburg / Mission / Pharr)',
      direction: 'within',
      context:
        'Rio Grande Valley metro hops; heat, HOA gates, and family multi-stop loads are common.',
    },
    {
      label: 'California → Rio Grande Valley / Hidalgo County',
      direction: 'inbound',
      context:
        'Family reunification and cost-driven West Coast exits into Valley single-family stock.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Midwest → McAllen–Edinburg medical & retail corridors',
      direction: 'inbound',
      context:
        'Healthcare and distribution hiring pulls; summer heat shapes delivery windows.',
      href: '/resources/routes/minnesota-to-texas',
    },
    {
      label: 'Hidalgo → Houston / San Antonio (in-state northbound)',
      direction: 'outbound',
      context:
        'Valley-to-Triangle career and school moves; long empty miles inside Texas change crew pricing.',
    },
    {
      label: 'Hidalgo → California outbound family corridors',
      direction: 'outbound',
      context:
        'Westbound interstate household goods; full inventory and valuation coverage recommended.',
      href: '/resources/routes/texas-to-california',
    },
    {
      label: 'Border-adjacent / Mexico-linked household planning',
      direction: 'within',
      context:
        'U.S. addresses only for licensed interstate movers; dual-country storage and customs are separate scopes.',
    },
  ],
};

const GA_ROUTES: Record<string, CountyPopularRoute[]> = {
  fulton: [
    {
      label: 'Within Fulton (Midtown / Buckhead ↔ South Fulton / Alpharetta edge)',
      direction: 'within',
      context:
        'High-rise freight elevators and street permits downtown vs gated north-metro HOAs — access rules drive the quote.',
    },
    {
      label: 'New Jersey / Tri-State → Atlanta core job markets',
      direction: 'inbound',
      context:
        'Finance, logistics HQ, and corporate relocations into Midtown and Perimeter-adjacent stock.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
    {
      label: 'Illinois / Midwest → Fulton County career corridors',
      direction: 'inbound',
      context:
        'Sun Belt HQ and consulting inflows; summer heat and mid-rise COIs shape delivery windows.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Atlanta ↔ Savannah (I-16 / I-75 coastal corridor)',
      direction: 'outbound',
      context:
        'In-state long haul for port, film, and lifestyle moves; empty miles change crew pricing vs a suburban hop.',
    },
    {
      label: 'Fulton ↔ Cobb / Gwinnett / DeKalb cross-county hops',
      direction: 'within',
      context:
        'Metro pairs on I-75, I-85, and the Perimeter; treat as logistics days, not short hourly local quotes.',
    },
    {
      label: 'Florida → Atlanta reverse career & family moves',
      direction: 'inbound',
      context:
        'I-75 northbound household goods from South Florida and Central Florida job markets; FMCSA for interstate legs.',
    },
  ],
  gwinnett: [
    {
      label: 'Within Gwinnett (Lawrenceville ↔ Duluth / Suwanee / Peachtree Corners)',
      direction: 'within',
      context:
        'Diverse single-family and townhome stock; HOA gate codes and long cul-de-sac carries are routine.',
    },
    {
      label: 'Massachusetts / New England → Gwinnett suburbs',
      direction: 'inbound',
      context:
        'Family and tech-adjacent relocations seeking schools and space outside the Atlanta core.',
      href: '/resources/routes/massachusetts-to-georgia',
    },
    {
      label: 'Minnesota / Upper Midwest → Gwinnett County',
      direction: 'inbound',
      context:
        'Cost-of-living and corporate Sun Belt exits into northern metro housing corridors.',
      href: '/resources/routes/minnesota-to-georgia',
    },
    {
      label: 'Gwinnett ↔ Fulton / DeKalb job-center commutes',
      direction: 'within',
      context:
        'I-85 and 316 corridor hops; empty miles and elevator buildings at the destination change the plan.',
    },
    {
      label: 'Gwinnett → Augusta / Richmond County (I-20 east)',
      direction: 'outbound',
      context:
        'In-state medical and family moves along the I-20 spine; longer than a metro suburb pair.',
    },
    {
      label: 'Northeast snowbird-adjacent → Gwinnett family housing',
      direction: 'inbound',
      context:
        'Tri-State and Mid-Atlantic households choosing northern suburbs over city high-rises.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  cobb: [
    {
      label: 'Within Cobb (Marietta ↔ Kennesaw / Smyrna / East Cobb)',
      direction: 'within',
      context:
        'Northwest metro single-family density; I-75 congestion and HOA certificates reshape load-day timing.',
    },
    {
      label: 'Illinois → Cobb County corporate & aerospace corridors',
      direction: 'inbound',
      context:
        'Midwest professional inflows into Marietta–Kennesaw housing; volume surveys beat map-mile guesses.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'New Jersey → Northwest Atlanta / Cobb suburbs',
      direction: 'inbound',
      context:
        'Family long-distance into school-driven markets; plan full inventory and valuation coverage.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
    {
      label: 'Cobb ↔ Fulton (Cumberland / Vinings ↔ Midtown)',
      direction: 'within',
      context:
        'Cross-county urban–suburban pairs; freight elevators at one end and driveway carries at the other.',
    },
    {
      label: 'Cobb → Columbus / Muscogee (I-85 / I-185 south)',
      direction: 'outbound',
      context:
        'In-state moves toward Fort Moore–adjacent job markets; multi-hour Georgia logistics, not a local hop.',
    },
    {
      label: 'Florida Panhandle & North Florida → Cobb',
      direction: 'inbound',
      context:
        'I-75 / I-10 linked family and military-spouse relocations into northwest metro stock.',
    },
  ],
  dekalb: [
    {
      label: 'Within DeKalb (Decatur ↔ Brookhaven / Stone Mountain / Stonecrest)',
      direction: 'within',
      context:
        'Intown bungalows and mid-rise stock vs eastern single-family; truck size and parking rules differ by pocket.',
    },
    {
      label: 'Massachusetts → Decatur / intown DeKalb',
      direction: 'inbound',
      context:
        'Academic, nonprofit, and healthcare relocations into walkable east-metro neighborhoods.',
      href: '/resources/routes/massachusetts-to-georgia',
    },
    {
      label: 'Midwest → DeKalb County (Emory / CDC–adjacent corridors)',
      direction: 'inbound',
      context:
        'Research and hospital-system inflows; timed building access and street permits are common.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'DeKalb ↔ Gwinnett / Fulton perimeter hops',
      direction: 'within',
      context:
        'I-285 and Clairmont/Buford Highway corridors; treat as regional metro logistics with traffic buffers.',
    },
    {
      label: 'DeKalb → Savannah / Chatham coastal corridor',
      direction: 'outbound',
      context:
        'Atlanta-to-coast lifestyle and film-adjacent moves; long in-state haul with different climate packing needs.',
    },
    {
      label: 'South Florida → East Atlanta / DeKalb',
      direction: 'inbound',
      context:
        'I-75 northbound reverse Sun Belt moves into intown and eastern suburban housing.',
    },
  ],
  chatham: [
    {
      label: 'Within Chatham (Historic District ↔ Pooler / Savannah suburbs)',
      direction: 'within',
      context:
        'Cobblestone and tight historic blocks vs master-planned west-side HOAs — shuttle trucks are often required downtown.',
    },
    {
      label: 'Atlanta metro → Savannah (Fulton / metro → Chatham)',
      direction: 'inbound',
      context:
        'Port, tourism, and coastal lifestyle pulls from the capital region; multi-hour in-state planning.',
    },
    {
      label: 'New Jersey / Northeast → Savannah coastal markets',
      direction: 'inbound',
      context:
        'Retirement-adjacent and remote-work inflows; humidity and historic-building access dominate origin surveys.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
    {
      label: 'Florida → Savannah / Hilton Head–adjacent Georgia side',
      direction: 'inbound',
      context:
        'I-95 corridor family and second-home moves; interstate household goods, not local hourly crews.',
    },
    {
      label: 'Chatham → Atlanta reverse career moves',
      direction: 'outbound',
      context:
        'Coast-to-capital job changes; volume and valuation matter more than short-haul metro rates.',
    },
    {
      label: 'Minnesota / Midwest → Coastal Georgia / Chatham',
      direction: 'inbound',
      context:
        'Sun Belt exits into Savannah metro housing; plan multi-day linehaul and weather-aware delivery windows.',
      href: '/resources/routes/minnesota-to-georgia',
    },
  ],
  cherokee: [
    {
      label: 'Within Cherokee (Canton ↔ Woodstock / Holly Springs)',
      direction: 'within',
      context:
        'North-metro growth corridors; longer driveway carries and HOA gate schedules shape crew hours.',
    },
    {
      label: 'Illinois / Midwest → Cherokee County space & schools',
      direction: 'inbound',
      context:
        'Family Sun Belt moves past the Perimeter into larger-lot stock; inventory surveys capture stairs and basements.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Cherokee ↔ Cobb / Fulton (I-575 / I-75 job links)',
      direction: 'within',
      context:
        'Common reverse-commute and upgrade hops; empty miles north of the Perimeter change short-hop pricing.',
    },
    {
      label: 'Massachusetts → North Atlanta / Cherokee suburbs',
      direction: 'inbound',
      context:
        'New England professional households choosing Woodstock–Canton corridors over intown high-rises.',
      href: '/resources/routes/massachusetts-to-georgia',
    },
    {
      label: 'Cherokee → Florida family & snowbird corridors',
      direction: 'outbound',
      context:
        'Southbound I-75 long-distance; FMCSA carriers and full packing scopes for interstate goods.',
    },
    {
      label: 'Northeast → Cherokee County lifestyle inflows',
      direction: 'inbound',
      context:
        'Tri-State cost and space exits into northern metro single-family markets.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  clayton: [
    {
      label: 'Within Clayton (Jonesboro ↔ Morrow / Riverdale / Lovejoy)',
      direction: 'within',
      context:
        'South-metro apartment and single-family mix; Hartsfield-adjacent traffic windows reshape load times.',
    },
    {
      label: 'Airport-area / ATL-adjacent multifamily moves',
      direction: 'within',
      context:
        'Flight-path noise corridors and tight parking; elevators and management COIs dominate the day.',
    },
    {
      label: 'Florida → South Atlanta / Clayton County',
      direction: 'inbound',
      context:
        'I-75 northbound job and family moves into more affordable south-metro housing stock.',
    },
    {
      label: 'Midwest → Clayton logistics & warehouse corridors',
      direction: 'inbound',
      context:
        'Distribution and aviation-adjacent hiring pulls; summer heat shapes crew pacing on delivery day.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Clayton ↔ Fulton / Henry cross-county hops',
      direction: 'within',
      context:
        'I-75 and 675 pairs; treat as metro logistics with rush-hour buffers, not a same-street local move.',
    },
    {
      label: 'New Jersey → South metro Atlanta / Clayton',
      direction: 'inbound',
      context:
        'Cost-sensitive Northeast exits into south-metro single-family and townhome markets.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  forsyth: [
    {
      label: 'Within Forsyth (Cumming ↔ South Forsyth / Lake Lanier edge)',
      direction: 'within',
      context:
        'Affluent north-metro stock; HOA certificates, lake-adjacent access, and long cul-de-sacs are common.',
    },
    {
      label: 'Minnesota → Forsyth County / Cumming corridors',
      direction: 'inbound',
      context:
        'Upper Midwest family and corporate Sun Belt moves into top-rated school zones.',
      href: '/resources/routes/minnesota-to-georgia',
    },
    {
      label: 'Forsyth ↔ Gwinnett / Fulton (GA-400 spine)',
      direction: 'within',
      context:
        'North-metro job and upgrade hops along 400; empty miles and gate codes drive short-haul quotes.',
    },
    {
      label: 'Massachusetts → North metro / Forsyth',
      direction: 'inbound',
      context:
        'New England professional relocations seeking space north of Atlanta without full rural isolation.',
      href: '/resources/routes/massachusetts-to-georgia',
    },
    {
      label: 'Forsyth → Savannah / coastal Georgia',
      direction: 'outbound',
      context:
        'In-state lifestyle shifts from lake-country suburbs to the coast; multi-hour Georgia linehaul planning.',
    },
    {
      label: 'Northeast → Forsyth County school-driven moves',
      direction: 'inbound',
      context:
        'Tri-State households prioritizing schools and new construction over intown density.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  henry: [
    {
      label: 'Within Henry (McDonough ↔ Stockbridge / Locust Grove)',
      direction: 'within',
      context:
        'Southeast metro growth; master-planned HOAs and I-75 south traffic windows change crew timing.',
    },
    {
      label: 'Illinois → Henry County affordable metro edge',
      direction: 'inbound',
      context:
        'Midwest family inflows seeking newer construction south of the Perimeter.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Henry ↔ Clayton / Fulton (I-75 south corridor)',
      direction: 'within',
      context:
        'Airport-adjacent and downtown job links; treat as regional metro hops with rush-hour padding.',
    },
    {
      label: 'Florida → Henry County / McDonough area',
      direction: 'inbound',
      context:
        'Northbound I-75 household goods from Florida job markets into southeast metro housing.',
    },
    {
      label: 'Henry → Augusta / Richmond (I-20 / I-75 connectors)',
      direction: 'outbound',
      context:
        'In-state medical and family moves toward the CSRA; longer than a south-metro suburb pair.',
    },
    {
      label: 'Northeast → Southeast Atlanta / Henry suburbs',
      direction: 'inbound',
      context:
        'Cost-driven Tri-State exits into Stockbridge–McDonough single-family corridors.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  hall: [
    {
      label: 'Within Hall (Gainesville ↔ Flowery Branch / Oakwood)',
      direction: 'within',
      context:
        'Lake Lanier and poultry-industry corridors; rural driveways mix with growing suburban HOAs.',
    },
    {
      label: 'Minnesota / Upper Midwest → Gainesville / Hall County',
      direction: 'inbound',
      context:
        'Manufacturing and healthcare Sun Belt pulls; inventory surveys should capture stairs and outbuildings.',
      href: '/resources/routes/minnesota-to-georgia',
    },
    {
      label: 'Hall ↔ Forsyth / Gwinnett (I-985 / Lanier corridor)',
      direction: 'within',
      context:
        'Northeast-metro upgrade and reverse-commute hops; empty miles north of the Perimeter matter.',
    },
    {
      label: 'Massachusetts → Hall County / Lake Lanier edge',
      direction: 'inbound',
      context:
        'New England lifestyle moves toward lake-adjacent housing outside core Atlanta density.',
      href: '/resources/routes/massachusetts-to-georgia',
    },
    {
      label: 'Hall → Atlanta core / Fulton job centers',
      direction: 'outbound',
      context:
        'Gainesville-to-city career moves; multi-hour same-state logistics vs a short suburban quote.',
    },
    {
      label: 'Florida → Northeast Georgia / Hall',
      direction: 'inbound',
      context:
        'I-75 / I-985 linked family relocations into Gainesville metro stock; interstate packing scopes apply.',
    },
  ],
  richmond: [
    {
      label: 'Within Richmond (Downtown Augusta ↔ Martinez / Evans edge)',
      direction: 'within',
      context:
        'River-city mid-rises and medical-district access vs CSRA suburban HOAs — truck and permit rules differ.',
    },
    {
      label: 'Fort Eisenhower (Gordon) PCS & contractor moves',
      direction: 'inbound',
      context:
        'Order cycles drive short-notice demand; flexible dates beat rock-bottom local hourly rates.',
    },
    {
      label: 'Atlanta metro → Augusta / Richmond County',
      direction: 'inbound',
      context:
        'I-20 east medical, cyber, and family moves from the capital region; in-state long haul planning.',
    },
    {
      label: 'New Jersey / Northeast → Augusta CSRA markets',
      direction: 'inbound',
      context:
        'Military-spouse, medical, and retirement-adjacent inflows along the I-20 corridor.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
    {
      label: 'Illinois / Midwest → Augusta medical & defense corridors',
      direction: 'inbound',
      context:
        'Hospital-system and Fort Eisenhower–adjacent professional relocations.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Richmond → Atlanta reverse career moves',
      direction: 'outbound',
      context:
        'CSRA-to-capital job changes; volume-based interstate-style planning even when staying in Georgia.',
    },
  ],
  muscogee: [
    {
      label: 'Within Muscogee (Uptown Columbus ↔ Midland / Fort Moore edge)',
      direction: 'within',
      context:
        'River-city stock vs post-adjacent suburbs; base access windows and gate procedures change the day.',
    },
    {
      label: 'Fort Moore (Benning) PCS household goods',
      direction: 'inbound',
      context:
        'PCS cycles create clustered demand; TMO timelines and flexible delivery windows matter most.',
    },
    {
      label: 'Atlanta metro → Columbus / Muscogee',
      direction: 'inbound',
      context:
        'I-85 / I-185 south career and military-family moves; multi-hour in-state logistics from the capital.',
    },
    {
      label: 'Midwest → Columbus GA / Fort Moore corridors',
      direction: 'inbound',
      context:
        'Illinois and broader Midwest PCS-adjacent and contractor relocations into the Chattahoochee valley.',
      href: '/resources/routes/illinois-to-georgia',
    },
    {
      label: 'Florida → Columbus / Muscogee military & family moves',
      direction: 'inbound',
      context:
        'I-10 / I-75 linked PCS and spouse employment hops; interstate household goods, not local hourly crews.',
    },
    {
      label: 'Muscogee → Atlanta / Fulton reverse career exits',
      direction: 'outbound',
      context:
        'Post-service and corporate moves north to the capital region; plan full inventory and valuation coverage.',
    },
  ],
};

/** New York — borough density, LI/Westchester suburbs, upstate metros (not NYC clones). */
const NY_ROUTES: Record<string, CountyPopularRoute[]> = {
  kings: [
    {
      label: 'Within Brooklyn (Park Slope / Heights ↔ Bushwick / Bay Ridge)',
      direction: 'within',
      context:
        'Brownstone walk-ups, freight elevators, and street-permit blocks — access beats map miles every time.',
    },
    {
      label: 'Brooklyn ↔ Manhattan (Williamsburg / Dumbo ↔ Midtown / FiDi)',
      direction: 'within',
      context:
        'Bridge timing, dock reservations, and elevator banks; treat as two urban access surveys, not one local hop.',
    },
    {
      label: 'Brooklyn ↔ Queens / Bronx cross-borough pairs',
      direction: 'within',
      context:
        'BQE and BQE-adjacent congestion reshape crew start times; truck size limits differ by neighborhood stock.',
    },
    {
      label: 'Brooklyn → Florida snowbird & permanent exits',
      direction: 'outbound',
      context:
        'Classic NYC→Sun Belt corridor; volume and valuation matter more than hourly local rates.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'New Jersey / Hudson County → Brooklyn',
      direction: 'inbound',
      context:
        'Cross-harbor inflows into brownstone and condo stock; COIs and curb rules dominate load day.',
    },
    {
      label: 'Brooklyn → Long Island / Nassau space upgrades',
      direction: 'outbound',
      context:
        'Family school and yard moves; one end walk-up stairs, the other driveway staging — plan both ends.',
    },
  ],
  queens: [
    {
      label: 'Within Queens (Astoria / LIC ↔ Flushing / Jamaica / Forest Hills)',
      direction: 'within',
      context:
        'Dense multi-unit vs co-op elevators; longer empty miles across the borough than Manhattan-style quotes imply.',
    },
    {
      label: 'Queens ↔ Brooklyn / Manhattan job-center hops',
      direction: 'within',
      context:
        'Cross-borough pairs on the BQE / Midtown Tunnel; elevators and street permits at both ends.',
    },
    {
      label: 'Queens → Nassau / Suffolk Long Island suburbs',
      direction: 'outbound',
      context:
        'Classic upgrade corridor for space and schools; inventory shifts from walk-ups to garage-heavy homes.',
    },
    {
      label: 'Queens → Florida retirement & dual-home corridors',
      direction: 'outbound',
      context:
        'Snowbird and permanent relocations; peak winter booking fills long-distance capacity early.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Connecticut / Fairfield → Queens multifamily',
      direction: 'inbound',
      context:
        'Reverse-commute and cost-sensitive inflows; co-op board rules and elevator windows are common.',
    },
    {
      label: 'JFK / airport-adjacent apartment turnover',
      direction: 'within',
      context:
        'Hospitality and aviation-linked leases; tight parking and building blackout hours near flight paths.',
    },
  ],
  'new-york': [
    {
      label: 'Within Manhattan (UWS / UES ↔ Midtown / Downtown towers)',
      direction: 'within',
      context:
        'Freight elevators, COIs, and street permits are the entire job — map miles barely matter.',
    },
    {
      label: 'Manhattan ↔ Brooklyn / Queens cross-borough',
      direction: 'within',
      context:
        'Bridge and tunnel timing plus two dense access surveys; shuttle trucks appear on tight blocks.',
    },
    {
      label: 'Manhattan → Westchester / Connecticut suburbs',
      direction: 'outbound',
      context:
        'Family and empty-nester exits from tower living; high-value packing and elevator reservations at origin.',
    },
    {
      label: 'Manhattan → Florida snowbird & second-home corridors',
      direction: 'outbound',
      context:
        'Signature NYC→FL household-goods corridor; dedicated vs consolidated transit spreads matter.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'California / West Coast → Manhattan career inflows',
      direction: 'inbound',
      context:
        'Coast-to-coast tech and finance arrivals into dense delivery access; building rules start days early.',
      href: '/resources/routes/california-to-new-york',
    },
    {
      label: 'New Jersey PATH / ferry corridors → Manhattan',
      direction: 'inbound',
      context:
        'Cross-Hudson professional moves; dock and elevator banks dominate destination day more than miles.',
    },
  ],
  bronx: [
    {
      label: 'Within the Bronx (Riverdale ↔ Fordham / South Bronx / Throgs Neck)',
      direction: 'within',
      context:
        'Walk-up density, elevator co-ops, and Cross Bronx traffic windows — not a Manhattan tower day.',
    },
    {
      label: 'Bronx ↔ Manhattan / Westchester reverse-commute pairs',
      direction: 'within',
      context:
        'I-87 / Major Deegan timing; one end urban stairs, the other suburban driveway or mid-rise elevators.',
    },
    {
      label: 'Bronx → Florida family & retirement exits',
      direction: 'outbound',
      context:
        'Long-distance Sun Belt moves; volume surveys beat hourly local thinking for true interstate legs.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Connecticut / lower New England → Bronx',
      direction: 'inbound',
      context:
        'Cost and family inflows into Bronx multifamily; confirm elevator COIs before comparing crew rates.',
    },
    {
      label: 'Bronx ↔ Brooklyn / Queens cross-borough logistics',
      direction: 'within',
      context:
        'Longer empty miles than a single-neighborhood hop; truck staging rules differ pocket by pocket.',
    },
    {
      label: 'Pennsylvania / Mid-Atlantic → Bronx job markets',
      direction: 'inbound',
      context:
        'Healthcare and logistics-adjacent relocations; plan curb access and building management contacts early.',
    },
  ],
  richmond: [
    {
      label: 'Within Staten Island (St. George ↔ New Dorp / Tottenville)',
      direction: 'within',
      context:
        'Ferry-terminal density vs South Shore single-family; longer local distances than map miles suggest.',
    },
    {
      label: 'Staten Island ↔ Brooklyn / Manhattan (bridge & ferry corridors)',
      direction: 'within',
      context:
        'Verrazzano timing and ferry-adjacent staging; treat as real logistics, not a short suburban quote.',
    },
    {
      label: 'New Jersey (Bayonne / Middlesex) → Staten Island',
      direction: 'inbound',
      context:
        'Cross-harbor and Outerbridge inflows into SI single-family stock; driveway access is the norm.',
    },
    {
      label: 'Staten Island → Florida snowbird corridors',
      direction: 'outbound',
      context:
        'Retirement and dual-home exits; garage-heavy inventories need full volume estimates.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Staten Island → New Jersey reverse / dual-state hops',
      direction: 'outbound',
      context:
        'Short interstate across the Kill; FMCSA authority still applies when the job crosses state lines.',
    },
    {
      label: 'North Shore multifamily & South Shore ranch stock',
      direction: 'within',
      context:
        'Elevator buildings near the ferry vs cul-de-sac staging inland — truck type changes by zip.',
    },
  ],
  nassau: [
    {
      label: 'Within Nassau (Hempstead / Garden City ↔ Great Neck / Long Beach)',
      direction: 'within',
      context:
        'North Shore estates vs South Shore beach access; HOA and village parking rules reshape load day.',
    },
    {
      label: 'NYC boroughs → Nassau County space & schools',
      direction: 'inbound',
      context:
        'Classic upgrade corridor from Queens and Brooklyn; origin walk-ups meet destination driveway staging.',
    },
    {
      label: 'Nassau → Florida retirement & snowbird exits',
      direction: 'outbound',
      context:
        'High-volume LI→Sun Belt household goods; peak winter booking fills carriers early.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Nassau ↔ Suffolk east-end / mid-Island pairs',
      direction: 'within',
      context:
        'LIE congestion and longer empty miles; treat as regional logistics, not a same-town local hop.',
    },
    {
      label: 'Connecticut / Westchester → Nassau reverse moves',
      direction: 'inbound',
      context:
        'Family and dual-home logistics into LI suburbs; ferry and bridge timing can shape equipment choice.',
    },
    {
      label: 'Nassau → Myrtle Beach / Carolinas lifestyle exits',
      direction: 'outbound',
      context:
        'Popular secondary Sun Belt corridor beyond Florida; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-myrtle-beach',
    },
  ],
  suffolk: [
    {
      label: 'Within Suffolk (Huntington / Babylon ↔ Brookhaven / Riverhead)',
      direction: 'within',
      context:
        'West-end density vs East End rural and second-home stock — truck access and empty miles differ sharply.',
    },
    {
      label: 'Hamptons / North Fork seasonal & second-home moves',
      direction: 'within',
      context:
        'Tourism peaks, long driveway carries, and weather holds; not interchangeable with western Suffolk tracts.',
    },
    {
      label: 'NYC / Nassau → Suffolk County space upgrades',
      direction: 'inbound',
      context:
        'Family and remote-work inflows further east; LIE timing and larger-home inventories dominate quotes.',
    },
    {
      label: 'Suffolk → Florida snowbird & permanent relocations',
      direction: 'outbound',
      context:
        'Classic LI retirement corridor; volume and valuation coverage beat hourly local rates.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Suffolk → Texas job & cost corridors',
      direction: 'outbound',
      context:
        'Long-distance career exits; FMCSA carriers and full packing scopes for true interstate goods.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'Connecticut ferry-adjacent → eastern Suffolk',
      direction: 'inbound',
      context:
        'Cross-Sound lifestyle moves; destination access is rural/coastal, not NYC elevator logistics.',
    },
  ],
  westchester: [
    {
      label: 'Within Westchester (Yonkers / White Plains ↔ Scarsdale / Peekskill)',
      direction: 'within',
      context:
        'Dense south-county multifamily vs northern lots; Metro-North corridor traffic shapes crew hours.',
    },
    {
      label: 'Manhattan / Bronx → Westchester schools & space',
      direction: 'inbound',
      context:
        'Classic suburban upgrade; origin elevators and destination HOA/driveway rules on the same job.',
    },
    {
      label: 'Westchester → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Empty-nester and dual-home Sun Belt exits; high-value suburban inventory needs careful packing scope.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Connecticut (Fairfield) ↔ Westchester cross-border pairs',
      direction: 'within',
      context:
        'Short interstate when crossing the state line; confirm authority even when drive time looks local.',
    },
    {
      label: 'Westchester → Texas / Sun Belt career exits',
      direction: 'outbound',
      context:
        'Corporate and family long-distance; volume estimates drive linehaul more than map miles.',
      href: '/resources/routes/new-york-to-texas',
    },
    {
      label: 'New Jersey / Rockland → Westchester reverse hops',
      direction: 'inbound',
      context:
        'Tappan Zee / I-287 corridor moves; treat as regional logistics with different origin and dest access.',
    },
  ],
  erie: [
    {
      label: 'Within Erie (Buffalo core ↔ Amherst / Cheektowaga / Orchard Park)',
      direction: 'within',
      context:
        'Lake-effect winters, older walk-ups, and suburban HOAs — Western NY logistics, not NYC density.',
    },
    {
      label: 'Buffalo ↔ Niagara Falls / Northtowns pairs',
      direction: 'within',
      context:
        'Regional empty miles and border-adjacent timing; winter access can reshape delivery windows.',
    },
    {
      label: 'Erie → NYC / downstate career moves',
      direction: 'outbound',
      context:
        'Upstate-to-metro household goods; destination elevators and COIs dominate arrival day.',
    },
    {
      label: 'Pennsylvania / Ohio → Buffalo metro',
      direction: 'inbound',
      context:
        'I-90 corridor inflows into healthcare and education markets; plan for snow-season staging.',
    },
    {
      label: 'Erie → Florida snowbird & retirement exits',
      direction: 'outbound',
      context:
        'Western NY→Sun Belt long-distance; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Florida → Buffalo reverse / dual-home returns',
      direction: 'inbound',
      context:
        'Seasonal reverse flows north; volume and valuation coverage for true interstate household goods.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  monroe: [
    {
      label: 'Within Monroe (Rochester core ↔ Henrietta / Webster / Pittsford)',
      direction: 'within',
      context:
        'University and medical corridors vs eastern suburbs; winter weather and stairs change crew plans.',
    },
    {
      label: 'Rochester ↔ Finger Lakes / Canandaigua edge towns',
      direction: 'within',
      context:
        'Longer empty miles and lake-adjacent access; not a same-day downtown-only quote.',
    },
    {
      label: 'Monroe → NYC / Westchester job markets',
      direction: 'outbound',
      context:
        'Upstate professional exits to downstate density; plan elevator and street-permit delivery access.',
    },
    {
      label: 'Pennsylvania / Mid-Atlantic → Rochester metro',
      direction: 'inbound',
      context:
        'Healthcare, optics, and education inflows; snow-season windows matter more than coastal packing rules.',
    },
    {
      label: 'Monroe → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Classic upstate snowbird path; FMCSA carriers and full packing scopes for interstate goods.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'California → Rochester / Monroe career inflows',
      direction: 'inbound',
      context:
        'Long-haul tech and optics-adjacent arrivals; multi-day transit into a non-coastal metro.',
      href: '/resources/routes/california-to-new-york',
    },
  ],
  onondaga: [
    {
      label: 'Within Onondaga (Syracuse core ↔ Liverpool / Cicero / Manlius)',
      direction: 'within',
      context:
        'University and medical stock vs suburban tracts; lake-effect snow reshapes winter load days.',
    },
    {
      label: 'Syracuse ↔ Utica / Central NY regional pairs',
      direction: 'within',
      context:
        'I-90 corridor hops with real empty miles; treat as logistics days, not short suburban quotes.',
    },
    {
      label: 'Onondaga → NYC metro career & family moves',
      direction: 'outbound',
      context:
        'Upstate-to-downstate household goods; destination access is elevators and permits, not driveways.',
    },
    {
      label: 'New Jersey / Pennsylvania → Syracuse job markets',
      direction: 'inbound',
      context:
        'Education, healthcare, and logistics inflows along I-81 / I-90; winter staging plans recommended.',
    },
    {
      label: 'Onondaga → Florida snowbird exits',
      direction: 'outbound',
      context:
        'Central NY→Sun Belt long-distance; volume estimates drive linehaul more than hourly local rates.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Florida → Syracuse reverse seasonal moves',
      direction: 'inbound',
      context:
        'Snowbird return and dual-home logistics north; multi-day interstate with careful inventory surveys.',
      href: '/resources/routes/florida-to-new-york',
    },
  ],
  albany: [
    {
      label: 'Within Albany County (Downtown / Center Square ↔ Colonie / Bethlehem)',
      direction: 'within',
      context:
        'Capital-region multifamily vs suburban HOAs; state-worker calendars cluster end-of-month demand.',
    },
    {
      label: 'Albany ↔ Saratoga / Capital District pairs',
      direction: 'within',
      context:
        'I-87 corridor regional hops; tourism peaks near Saratoga change staging and hotel-adjacent access.',
    },
    {
      label: 'Albany → NYC / downstate government & career moves',
      direction: 'outbound',
      context:
        'Capital-to-city household goods; destination elevators and COIs dominate arrival more than miles.',
    },
    {
      label: 'New Jersey / Mid-Atlantic → Albany capital markets',
      direction: 'inbound',
      context:
        'State, healthcare, and education inflows; not interchangeable with NYC brownstone logistics.',
    },
    {
      label: 'Albany → Florida retirement & dual-home corridors',
      direction: 'outbound',
      context:
        'Capital-region snowbird path; plan multi-day interstate and valuation coverage carefully.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Massachusetts / New England → Capital Region',
      direction: 'inbound',
      context:
        'I-90 corridor professional moves into Albany–Colonie stock; winter weather shapes delivery windows.',
    },
  ],
};

const AZ_ROUTES: Record<string, CountyPopularRoute[]> = {
  maricopa: [
    {
      label: 'Within Maricopa (Phoenix / Scottsdale ↔ East Valley / West Valley)',
      direction: 'within',
      context:
        'Master-planned HOAs, golf-course cul-de-sacs, and summer heat windows matter more than map miles.',
    },
    {
      label: 'Southern California → Greater Phoenix corporate & family inflows',
      direction: 'inbound',
      context:
        'I-10 cost-of-living and tech/finance exits from LA/OC/SD; plan volume surveys for large single-family stock.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Phoenix metro ↔ Tucson (I-10 desert corridor)',
      direction: 'outbound',
      context:
        'Common university, healthcare, and dual-metro job hops; multi-hour logistics, not a short suburban quote.',
    },
    {
      label: 'Phoenix ↔ Flagstaff elevation moves (desert to pine country)',
      direction: 'outbound',
      context:
        'Roughly 7,000 ft gain; summer monsoon and winter snow on I-17 reshape crew hours and truck choice.',
    },
    {
      label: 'Midwest snowbirds → Scottsdale / East Valley winter homes',
      direction: 'inbound',
      context:
        'Seasonal dual-home demand from Illinois and Minnesota corridors; peak delivery windows cluster Oct–Apr.',
      href: '/resources/routes/illinois-to-arizona',
    },
    {
      label: 'Maricopa corporate HQ / remote-work reverse exits to California',
      direction: 'outbound',
      context:
        'Return-to-coast and dual-state household goods; FMCSA carriers and full inventory valuation recommended.',
    },
  ],
  pima: [
    {
      label: 'Within Pima (Tucson central / University ↔ Oro Valley / Marana)',
      direction: 'within',
      context:
        'Foothill driveways and gated communities vs denser midtown stock; shuttle need shows up on surveys.',
    },
    {
      label: 'California → Tucson retirement & lifestyle corridors',
      direction: 'inbound',
      context:
        'SoCal empty-nesters and remote workers trading coastal premiums for desert space and lower taxes.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Tucson ↔ Phoenix metro career & family hops',
      direction: 'outbound',
      context:
        'I-10 northbound job and healthcare moves; treat as full-day desert linehaul with heat staging plans.',
    },
    {
      label: 'Minnesota / Upper Midwest → Tucson snowbird winter bases',
      direction: 'inbound',
      context:
        'Classic cold-to-desert seasonal path; book early for peak winter arrivals and RV-adjacent household goods.',
      href: '/resources/routes/minnesota-to-arizona',
    },
    {
      label: 'Pima → Flagstaff / high-country summer homes',
      direction: 'outbound',
      context:
        'Elevation relief moves; winter delivery windows on mountain routes differ sharply from valley summer heat.',
    },
    {
      label: 'Davis-Monthan / military-adjacent PCS into greater Tucson',
      direction: 'inbound',
      context:
        'PCS cycles create clustered demand; flexible delivery dates and base-area access rules dominate the plan.',
    },
  ],
  pinal: [
    {
      label: 'Within Pinal (San Tan Valley / Queen Creek edge ↔ Casa Grande / Florence)',
      direction: 'within',
      context:
        'Fast-growth master plans and long empty miles between towns; crew drive time often exceeds load time.',
    },
    {
      label: 'Phoenix East Valley overflow → Pinal new-build corridors',
      direction: 'inbound',
      context:
        'Affordability spill from Maricopa; HOA gate codes and unfinished streets are routine on move day.',
    },
    {
      label: 'California → Pinal County starter & remote-work homes',
      direction: 'inbound',
      context:
        'I-10 / I-8 linked West Coast exits into newer subdivisions between Phoenix and Tucson metros.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Pinal ↔ Tucson job & university family moves',
      direction: 'outbound',
      context:
        'Southbound I-10 hops for UA-adjacent employment; multi-hour desert logistics with summer heat pacing.',
    },
    {
      label: 'Illinois / Midwest → Pinal Sun Belt affordability corridor',
      direction: 'inbound',
      context:
        'Corporate and family relocations seeking new construction between the two major AZ metros.',
      href: '/resources/routes/illinois-to-arizona',
    },
    {
      label: 'Pinal → Phoenix metro reverse career upgrades',
      direction: 'outbound',
      context:
        'Job-center returns north into Maricopa; still a full logistics day when HOAs and elevators stack delays.',
    },
  ],
  yavapai: [
    {
      label: 'Within Yavapai (Prescott / Prescott Valley ↔ Cottonwood / Verde Valley)',
      direction: 'within',
      context:
        'Mountain grades, pine-country driveways, and four-season weather change truck type vs valley quotes.',
    },
    {
      label: 'Phoenix metro → Prescott elevation & retirement moves',
      direction: 'inbound',
      context:
        'Desert-to-mile-high lifestyle upgrades; I-17 weather and altitude shape both pickup and delivery windows.',
    },
    {
      label: 'California → Prescott / Yavapai lifestyle & remote-work hubs',
      direction: 'inbound',
      context:
        'SoCal exits seeking four seasons and lower density; hillside accessorials still apply at origin and dest.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Yavapai ↔ Flagstaff high-country pairs',
      direction: 'outbound',
      context:
        'Northern AZ pine-belt hops; winter chain and storm delays are real planning factors, not edge cases.',
    },
    {
      label: 'Midwest retirees → Prescott area year-round homes',
      direction: 'inbound',
      context:
        'Snowbird-to-permanent transitions from Illinois corridors; full household goods, not seasonal partial loads.',
      href: '/resources/routes/illinois-to-arizona',
    },
    {
      label: 'Yavapai → Phoenix Valley medical & family support moves',
      direction: 'outbound',
      context:
        'Down-elevation returns for healthcare access and adult-child proximity; plan heat staging on summer deliveries.',
    },
  ],
  mohave: [
    {
      label: 'Within Mohave (Kingman ↔ Lake Havasu City / Bullhead River corridor)',
      direction: 'within',
      context:
        'Long county spans and river-city staging; boat, golf-cart, and HOA rules often add inventory complexity.',
    },
    {
      label: 'Southern California → Lake Havasu / Colorado River second homes',
      direction: 'inbound',
      context:
        'Weekend-and-retirement inflows across the CA border; summer heat and waterfront access drive crew plans.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Mohave ↔ Las Vegas / southern Nevada job & family hops',
      direction: 'outbound',
      context:
        'Cross-border regional moves; confirm interstate household-goods authority even when the drive feels local.',
    },
    {
      label: 'Midwest snowbirds → Mohave winter river & desert bases',
      direction: 'inbound',
      context:
        'Seasonal dual-home demand; peak winter booking for carriers serving Kingman–Havasu–Bullhead stock.',
      href: '/resources/routes/minnesota-to-arizona',
    },
    {
      label: 'Mohave → Phoenix metro healthcare & family support',
      direction: 'outbound',
      context:
        'I-40 / US-93 linked down-state moves; multi-hour desert linehaul with limited shuttle options in rural legs.',
    },
    {
      label: 'I-40 corridor corporate & logistics relocations into Kingman area',
      direction: 'inbound',
      context:
        'Freight-adjacent employment and lower-cost housing draws; warehouse-district access differs from lakefront HOAs.',
    },
  ],
  yuma: [
    {
      label: 'Within Yuma (city core ↔ Foothills / agricultural edge communities)',
      direction: 'within',
      context:
        'Ag-season traffic and winter visitor density reshape crew hours; confirm driveway and irrigation clearances.',
    },
    {
      label: 'Southern California → Yuma snowbird & border-region homes',
      direction: 'inbound',
      context:
        'I-8 linked SoCal seasonal and permanent moves; peak winter arrivals compete hard for truck capacity.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Yuma ↔ Phoenix metro medical, military-family & job hops',
      direction: 'outbound',
      context:
        'I-8 / I-10 multi-hour desert corridor; summer heat and monsoon timing dominate delivery scheduling.',
    },
    {
      label: 'Upper Midwest → Yuma winter visitor household goods',
      direction: 'inbound',
      context:
        'Classic snowbird path into one of AZ’s densest seasonal markets; partial loads and storage-in-transit are common.',
      href: '/resources/routes/minnesota-to-arizona',
    },
    {
      label: 'Yuma → Tucson / Pima lifestyle and family moves',
      direction: 'outbound',
      context:
        'Eastbound desert hops for university, healthcare, and dual-county family networks — not a local hourly job.',
    },
    {
      label: 'Marine Corps Air Station Yuma / military-adjacent PCS cycles',
      direction: 'inbound',
      context:
        'PCS clustering around base timelines; TMO windows and flexible delivery dates matter more than map miles.',
    },
  ],
  coconino: [
    {
      label: 'Within Coconino (Flagstaff ↔ Sedona / page-edge high-country towns)',
      direction: 'within',
      context:
        'Mountain grades, snow seasons, and tourism traffic; truck type and chain readiness beat pure mileage quotes.',
    },
    {
      label: 'Phoenix Valley → Flagstaff elevation & four-season moves',
      direction: 'inbound',
      context:
        'Desert-to-7,000-ft lifestyle shifts on I-17; winter storms and summer monsoon both reshape crew windows.',
    },
    {
      label: 'California → Flagstaff / Coconino remote-work & outdoor lifestyle',
      direction: 'inbound',
      context:
        'West Coast exits seeking pine country and NAU-adjacent energy; hillside and snow-access surveys are essential.',
      href: '/resources/routes/california-to-arizona',
    },
    {
      label: 'Flagstaff ↔ Phoenix corporate reverse & winter-escape pairs',
      direction: 'outbound',
      context:
        'Down-elevation job returns and dual-home logistics; plan inventory for climate-sensitive goods both directions.',
    },
    {
      label: 'Midwest → northern Arizona high-country permanent homes',
      direction: 'inbound',
      context:
        'Illinois and broader Midwest relocations into Flagstaff-area stock; full interstate household goods, not local crews.',
      href: '/resources/routes/illinois-to-arizona',
    },
    {
      label: 'Coconino tourism / hospitality workforce turnover near Sedona–Flagstaff',
      direction: 'within',
      context:
        'Lease-end clusters and short-notice local demand; HOA and vacation-rental access rules dominate the day.',
    },
  ],
};

const NC_ROUTES: Record<string, CountyPopularRoute[]> = {
  mecklenburg: [
    {
      label: 'Within Mecklenburg (Uptown / South End ↔ Ballantyne / University City)',
      direction: 'within',
      context:
        'Elevator towers and COI downtown vs HOA suburban rings — access rules and I-485 portal time drive the quote.',
    },
    {
      label: 'Northeast / New York–New Jersey → Charlotte banking & professional markets',
      direction: 'inbound',
      context:
        'Finance and corporate relocations into Uptown, South End, and south-ring housing.',
      href: '/resources/routes/new-jersey-to-north-carolina',
    },
    {
      label: 'Illinois / Midwest → Charlotte career corridors',
      direction: 'inbound',
      context:
        'Sun Belt HQ and professional inflows; summer humidity and mid-rise COIs shape delivery windows.',
      href: '/resources/routes/illinois-to-north-carolina',
    },
    {
      label: 'Charlotte ↔ Raleigh / Triangle (I-85 / I-40)',
      direction: 'outbound',
      context:
        'In-state long haul between banking core and capital/tech markets; empty miles change pricing vs a suburban hop.',
    },
    {
      label: 'Florida → Charlotte reverse career & family moves',
      direction: 'inbound',
      context:
        'I-95/I-77 northbound household goods from Florida markets; FMCSA for interstate legs.',
    },
    {
      label: 'Mecklenburg ↔ Union / Cabarrus / Gaston cross-county hops',
      direction: 'within',
      context:
        'Charlotte-metro pairs on I-485, I-85, and US-74; treat as logistics days, not short hourly local quotes.',
    },
  ],
  wake: [
    {
      label: 'Within Wake (Downtown Raleigh ↔ North Raleigh / Cary / Apex)',
      direction: 'within',
      context:
        'Capital-city elevators vs Outer Loop HOA product — I-40/I-440/I-540 portal time dominates.',
    },
    {
      label: 'Northeast → Research Triangle state-government & tech markets',
      direction: 'inbound',
      context:
        'Agency and tech relocations into Raleigh core and western Wake growth.',
      href: '/resources/routes/new-jersey-to-north-carolina',
    },
    {
      label: 'Florida ↔ Triangle family & career moves',
      direction: 'inbound',
      context:
        'I-95 northbound into Wake housing; humidity and multi-family elevators reshape unload days.',
    },
    {
      label: 'Raleigh ↔ Charlotte (I-40 / I-85)',
      direction: 'outbound',
      context:
        'In-state capital-to-banking-core hauls; longer than a Cary hop.',
    },
    {
      label: 'Wake ↔ Durham cross-county Triangle pairs',
      direction: 'within',
      context:
        'I-40 and NC-147 logistics between capital and research/medical markets.',
    },
    {
      label: 'Midwest → Wake County tech & government corridors',
      direction: 'inbound',
      context:
        'Corporate and public-sector inflows into North Raleigh and Cary edges.',
      href: '/resources/routes/illinois-to-north-carolina',
    },
  ],
  guilford: [
    {
      label: 'Within Guilford (Greensboro core ↔ High Point edge / NW suburbs)',
      direction: 'within',
      context:
        'Older stairs-and-alley stock vs furniture-corridor timing — not a single “Triad local rate.”',
    },
    {
      label: 'Northeast → Piedmont Triad manufacturing & logistics markets',
      direction: 'inbound',
      context:
        'Industrial and distribution employment inflows into Greensboro–High Point housing.',
    },
    {
      label: 'Guilford ↔ Forsyth (Winston-Salem) Triad pairs',
      direction: 'within',
      context:
        'I-40 everyday logistics between Triad partners; keep county lines clear on estimates.',
    },
    {
      label: 'Florida → Triad reverse family moves',
      direction: 'inbound',
      context:
        'I-95/I-40 household goods into Piedmont housing; FMCSA for interstate legs.',
    },
    {
      label: 'Guilford → Charlotte metro (I-85)',
      direction: 'outbound',
      context:
        'In-state long haul for career moves south; empty miles change crew pricing.',
    },
    {
      label: 'Midwest → Greensboro job corridors',
      direction: 'inbound',
      context:
        'Healthcare, education, and logistics relocations into Triad stock.',
    },
  ],
  forsyth: [
    {
      label: 'Within Forsyth (Winston-Salem West End ↔ US-52 suburbs)',
      direction: 'within',
      context:
        'Historic-core stairs vs multi-family arterial product — different access surveys under one county.',
    },
    {
      label: 'Forsyth ↔ Guilford Triad pairs',
      direction: 'within',
      context:
        'Winston-Salem ↔ Greensboro hops on I-40; not a renamed Guilford page.',
    },
    {
      label: 'Northeast → Winston-Salem medical & education markets',
      direction: 'inbound',
      context:
        'Healthcare and university-related relocations into near-core and suburban stock.',
    },
    {
      label: 'Florida → Triad reverse moves via I-40',
      direction: 'inbound',
      context:
        'Interstate household goods into Forsyth; FMCSA for cross-state legs.',
    },
    {
      label: 'Winston-Salem ↔ Charlotte (I-40 / I-77 links)',
      direction: 'outbound',
      context:
        'In-state career hauls; longer than a Triad suburb pair.',
    },
    {
      label: 'Midwest → Forsyth professional corridors',
      direction: 'inbound',
      context:
        'Corporate and healthcare inflows into Winston-Salem housing.',
    },
  ],
  durham: [
    {
      label: 'Within Durham (Downtown lofts ↔ Southpoint / RTP edge)',
      direction: 'within',
      context:
        'Adaptive-reuse elevators vs multi-family south corridors — NC-147 timing matters.',
    },
    {
      label: 'Northeast → Durham research & medical markets',
      direction: 'inbound',
      context:
        'Duke/health-system and life-sciences relocations into downtown and near-campus stock.',
    },
    {
      label: 'Durham ↔ Wake Triangle pairs',
      direction: 'within',
      context:
        'Research/medical market paired with capital/tech market — not “Raleigh suburb only.”',
    },
    {
      label: 'Florida ↔ Triangle medical/research moves',
      direction: 'inbound',
      context:
        'Interstate household goods into Durham; FMCSA for cross-state legs.',
    },
    {
      label: 'Durham ↔ Chapel Hill / Orange edges',
      direction: 'within',
      context:
        'US-15-501 short regional pairs with university calendars; clarify county lines.',
    },
    {
      label: 'Midwest → Durham life-sciences corridors',
      direction: 'inbound',
      context:
        'Research employment inflows into multi-family and near-core housing.',
    },
  ],
  cumberland: [
    {
      label: 'Within Cumberland (Fort Liberty–adjacent multi-family ↔ western HOA growth)',
      direction: 'within',
      context:
        'PCS lease-end waves vs HOA villages — All American Freeway timing dominates.',
    },
    {
      label: 'Military PCS lanes → Fort Liberty / Fayetteville',
      direction: 'inbound',
      context:
        'Order-driven household goods arrivals; documentation and report dates drive the plan more than preferred Saturdays.',
    },
    {
      label: 'Northeast → Fort Liberty PCS households',
      direction: 'inbound',
      context:
        'Interstate military moves into base-adjacent housing; FMCSA for cross-state legs.',
    },
    {
      label: 'Cumberland ↔ Onslow (Army ↔ Marine installation transfers)',
      direction: 'outbound',
      context:
        'In-state military transfer pairs; different base-access rules at each end.',
    },
    {
      label: 'Florida → Fayetteville / Fort Liberty reverse PCS',
      direction: 'inbound',
      context:
        'I-95 northbound military and family household goods; FMCSA for interstate.',
    },
    {
      label: 'Cumberland → Triangle job markets after separation',
      direction: 'outbound',
      context:
        'In-state long haul for post-service career moves into Wake/Durham housing.',
    },
  ],
  buncombe: [
    {
      label: 'Within Buncombe (Downtown Asheville ↔ South Asheville / hillside homes)',
      direction: 'within',
      context:
        'Tourism curb friction and steep driveways — not Piedmont freeway pricing.',
    },
    {
      label: 'Northeast / Florida → Asheville mountain lifestyle moves',
      direction: 'inbound',
      context:
        'Interstate household goods into hillside and near-core stock; mountain approach buffers required.',
    },
    {
      label: 'Charlotte / Piedmont → Asheville second-home & lifestyle',
      direction: 'inbound',
      context:
        'In-state mountain inbound; I-40/I-26 weather and tunnel approaches reshape arrival times.',
    },
    {
      label: 'Midwest → Asheville outdoor-economy relocations',
      direction: 'inbound',
      context:
        'Full interstate household goods into mountain housing; grade surveys beat map miles.',
    },
    {
      label: 'Asheville ↔ Greenville / Upstate SC',
      direction: 'outbound',
      context:
        'Regional mountain-to-Piedmont pairs; interstate when crossing state lines.',
    },
    {
      label: 'Within mountain edges (Swannanoa / US-70 approaches)',
      direction: 'within',
      context:
        'Rural-edge lots and weather-sensitive approaches; share driveway videos.',
    },
  ],
  'new-hanover': [
    {
      label: 'Within New Hanover (Downtown Wilmington ↔ midtown / beach edges)',
      direction: 'within',
      context:
        'Historic tight streets vs coastal association elevators — humidity protection matters.',
    },
    {
      label: 'Northeast / Midwest → Wilmington coastal lifestyle',
      direction: 'inbound',
      context:
        'Interstate household goods to the I-40 terminus; local coastal logistics still dominate unload day.',
    },
    {
      label: 'Florida ↔ Wilmington reverse coastal moves',
      direction: 'inbound',
      context:
        'I-95 corridor household goods; storm-season contingency on both ends.',
    },
    {
      label: 'Triangle / Charlotte → Wilmington career & lifestyle',
      direction: 'inbound',
      context:
        'In-state long haul into coastal housing; not a short suburban hop.',
    },
    {
      label: 'New Hanover ↔ Brunswick beach-adjacent pairs',
      direction: 'within',
      context:
        'Cross-county coastal logistics; association rules and bridge timing vary.',
    },
    {
      label: 'Wilmington ↔ Raleigh (I-40)',
      direction: 'outbound',
      context:
        'Coastal-to-Triangle in-state hauls for jobs and family.',
    },
  ],
  union: [
    {
      label: 'Within Union (Indian Trail / Wesley Chapel ↔ Monroe / Waxhaw)',
      direction: 'within',
      context:
        'HOA master plans and longer empty miles — not Uptown elevator product.',
    },
    {
      label: 'Northeast → South Charlotte overflow housing',
      direction: 'inbound',
      context:
        'Interstate arrivals into Union HOA growth; last-mile is driveway and gate logistics.',
    },
    {
      label: 'Union ↔ Mecklenburg cross-county Charlotte pairs',
      direction: 'within',
      context:
        'US-74 and I-485 links; price as logistics days, not short hourly locals.',
    },
    {
      label: 'Florida → Union County family housing',
      direction: 'inbound',
      context:
        'Sun Belt reverse moves into south Charlotte spillover stock; FMCSA interstate.',
    },
    {
      label: 'Union ↔ Cabarrus / Gaston metro edges',
      direction: 'within',
      context:
        'Charlotte-ring pairs with different HOA and industrial-residential mixes.',
    },
    {
      label: 'Midwest → Union growth corridors',
      direction: 'inbound',
      context:
        'Family and corporate inflows seeking space outside Mecklenburg core pricing.',
    },
  ],
  cabarrus: [
    {
      label: 'Within Cabarrus (Concord HOA growth ↔ Kannapolis multi-unit)',
      direction: 'within',
      context:
        'Master-planned gates vs revitalizing multi-family — different access surveys.',
    },
    {
      label: 'Cabarrus ↔ Mecklenburg I-85 pairs',
      direction: 'within',
      context:
        'Northeast Charlotte corridor logistics; portal time dominates at peak.',
    },
    {
      label: 'Northeast → Concord / Kannapolis growth markets',
      direction: 'inbound',
      context:
        'Interstate household goods into I-85 spillover housing.',
    },
    {
      label: 'Florida → Cabarrus reverse family moves',
      direction: 'inbound',
      context:
        'I-95/I-85 household goods; event-week traffic can reshape unload windows near major venues.',
    },
    {
      label: 'Cabarrus ↔ Union south-ring pairs',
      direction: 'within',
      context:
        'Charlotte-metro ring logistics with different HOA patterns at each end.',
    },
    {
      label: 'Midwest → Cabarrus professional corridors',
      direction: 'inbound',
      context:
        'Corporate inflows into Concord growth and Harrisburg edges.',
    },
  ],
  gaston: [
    {
      label: 'Within Gaston (Gastonia core ↔ Belmont / Mount Holly edges)',
      direction: 'within',
      context:
        'Industrial-residential mix east toward Charlotte — not Ballantyne HOA clones.',
    },
    {
      label: 'Gaston ↔ Mecklenburg I-85 / Wilkinson pairs',
      direction: 'within',
      context:
        'West Charlotte overflow logistics; clarify county lines on every estimate.',
    },
    {
      label: 'Northeast → Gaston County value / space markets',
      direction: 'inbound',
      context:
        'Interstate arrivals seeking western Charlotte-metro housing.',
    },
    {
      label: 'Florida → Gaston reverse family moves',
      direction: 'inbound',
      context:
        'Sun Belt reverse household goods into western overflow stock; FMCSA interstate.',
    },
    {
      label: 'Gaston ↔ Cabarrus / Union ring pairs',
      direction: 'within',
      context:
        'Charlotte-ring counties with different industrial vs HOA fabrics.',
    },
    {
      label: 'Midwest → Gastonia manufacturing & logistics corridors',
      direction: 'inbound',
      context:
        'Industrial employment inflows into mixed Gaston stock.',
    },
  ],
  onslow: [
    {
      label: 'Within Onslow (Camp Lejeune–adjacent multi-family ↔ coastal-edge housing)',
      direction: 'within',
      context:
        'PCS lease waves vs coastal humidity — US-17/NC-24 timing without an interstate lattice.',
    },
    {
      label: 'Military PCS lanes → Camp Lejeune / Jacksonville',
      direction: 'inbound',
      context:
        'Order-driven Marine household goods; report dates drive the plan more than preferred Saturdays.',
    },
    {
      label: 'Northeast → Camp Lejeune PCS households',
      direction: 'inbound',
      context:
        'Interstate military moves into Jacksonville multi-family; FMCSA for cross-state legs.',
    },
    {
      label: 'Onslow ↔ Cumberland (Marine ↔ Army installation transfers)',
      direction: 'outbound',
      context:
        'In-state military transfer pairs; different base-access rules at each end — not interchangeable copy.',
    },
    {
      label: 'Florida → Jacksonville NC reverse PCS',
      direction: 'inbound',
      context:
        'Coastal-plain military and family household goods; storm-season contingency.',
    },
    {
      label: 'Onslow → Triangle / Charlotte post-service career moves',
      direction: 'outbound',
      context:
        'In-state long haul after separation into Piedmont job markets.',
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
  if (stateSlug === 'texas') return TX_ROUTES[countySlug] ?? [];
  if (stateSlug === 'georgia') return GA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'new-york') return NY_ROUTES[countySlug] ?? [];
  if (stateSlug === 'arizona') return AZ_ROUTES[countySlug] ?? [];
  if (stateSlug === 'north-carolina') return NC_ROUTES[countySlug] ?? [];
  return [];
}
