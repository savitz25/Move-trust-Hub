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

const SC_ROUTES: Record<string, CountyPopularRoute[]> = {
  greenville: [
    {
      label: 'Within Greenville (Downtown ↔ Greer / Simpsonville / Five Forks)',
      direction: 'within',
      context:
        'I-85 and Woodruff Road portal time; HOA gate lists dominate south-suburb family moves.',
    },
    {
      label: 'Northeast / Midwest → Upstate SC manufacturing corridor',
      direction: 'inbound',
      context:
        'Corporate and plant-adjacent inflows along I-85; mid-week hard dates compete with Saturday SFH demand.',
    },
    {
      label: 'Greenville ↔ Spartanburg / Anderson Upstate hops',
      direction: 'within',
      context:
        'Common dual-county residential and job moves; still confirm Class E authority for pure in-state jobs.',
    },
    {
      label: 'Greenville → Charlotte / NC job markets',
      direction: 'outbound',
      context:
        'Cross-border career moves; FMCSA required once any leg leaves South Carolina.',
    },
    {
      label: 'Greenville → Florida / Sun Belt long-distance',
      direction: 'outbound',
      context:
        'Family and retirement interstate; volume survey and valuation matter more than local hourly rates.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Downtown loft / West End multi-story stock',
      direction: 'within',
      context:
        'Curb staging and stairs dominate; building COIs and early starts beat Saturday event windows.',
    },
  ],
  charleston: [
    {
      label: 'Within Charleston (Peninsula ↔ West Ashley / Mount Pleasant / James Island)',
      direction: 'within',
      context:
        'Peninsula COI and narrow streets vs mainland HOAs; humidity packing is routine.',
    },
    {
      label: 'Northeast / Midwest → Charleston metro lifestyle inflows',
      direction: 'inbound',
      context:
        'Historic and coastal demand; peninsula access rules often drive origin/destination soft costs.',
    },
    {
      label: 'Charleston ↔ Berkeley / Dorchester growth suburbs',
      direction: 'within',
      context:
        'Northwest and north growth overflow; longer suburban runs than peninsula map miles suggest.',
    },
    {
      label: 'Charleston → Atlanta / Charlotte career corridors',
      direction: 'outbound',
      context:
        'Regional interstate professional moves; FMCSA carriers and full inventory planning recommended.',
    },
    {
      label: 'Charleston → Florida coastal retirement corridors',
      direction: 'outbound',
      context:
        'Long-distance coastal-to-coastal household goods; peak winter booking for carriers.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Island / barrier approaches (IOP, Sullivan’s, Kiawah-edge patterns)',
      direction: 'within',
      context:
        'Bridge timing, HOA rules, and truck length limits; confirm access before peak tourist weekends.',
    },
  ],
  richland: [
    {
      label: 'Within Richland (Downtown Columbia ↔ Northeast / Forest Acres / Fort Jackson edge)',
      direction: 'within',
      context:
        'Capital multifamily vs suburban tracts; PCS windows near Fort Jackson create clustered demand.',
    },
    {
      label: 'In-state SC → Columbia capital / university / state-job moves',
      direction: 'inbound',
      context:
        'Midlands employment and USC-adjacent rentals; mid-month lease turns spike elevator demand.',
    },
    {
      label: 'Richland ↔ Lexington west-Columbia suburbs',
      direction: 'within',
      context:
        'Daily dual-county household pattern; still one state — Class E rules, different access products.',
    },
    {
      label: 'Columbia → Charlotte / Atlanta professional exits',
      direction: 'outbound',
      context:
        'I-77 / I-20 career corridors; interstate authority required once leaving South Carolina.',
    },
    {
      label: 'Fort Jackson PCS inbound / outbound clusters',
      direction: 'inbound',
      context:
        'Hard report dates and storage-in-transit are common; flexible delivery windows reduce stress.',
    },
    {
      label: 'Columbia → Florida / Sun Belt family long-distance',
      direction: 'outbound',
      context:
        'Volume estimates and FMCSA carriers dominate pricing more than local hourly rates.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  horry: [
    {
      label: 'Within Horry (Myrtle Beach oceanfront ↔ Carolina Forest / Conway / North Myrtle)',
      direction: 'within',
      context:
        'High-rise elevators and tourist traffic vs inland HOA tracts; US-17 / SC-31 timing matters.',
    },
    {
      label: 'Northeast / Midwest snowbird & second-home inflows',
      direction: 'inbound',
      context:
        'Seasonal dual-home demand; peak spring/fall turns compete for elevators and coastal staging.',
    },
    {
      label: 'Horry vacation-rental / condo turnover waves',
      direction: 'within',
      context:
        'Owner changeovers and short-term rental resets create mid-week clusters beyond pure residential moves.',
    },
    {
      label: 'Myrtle Beach → Charlotte / Raleigh career exits',
      direction: 'outbound',
      context:
        'Lifestyle reverse moves inland; treat as multi-hour interstate planning with FMCSA carriers.',
    },
    {
      label: 'Horry → Florida further-south coastal retirement',
      direction: 'outbound',
      context:
        'Coastal-to-coastal long-distance; inventory and humidity packing still matter at origin.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Conway / inland growth vs oceanfront towers',
      direction: 'within',
      context:
        'Do not price inland SFH like oceanfront high-rises — elevator and curb soft costs diverge sharply.',
    },
  ],
  spartanburg: [
    {
      label: 'Within Spartanburg (City core ↔ Boiling Springs / Duncan / Lyman edges)',
      direction: 'within',
      context:
        'Industrial-adjacent residential mixed with suburban HOAs; I-85 / I-26 timing shapes crew hours.',
    },
    {
      label: 'Manufacturing corridor inflows along I-85',
      direction: 'inbound',
      context:
        'Plant and logistics hiring pulls household goods mid-week; hard report dates are common.',
    },
    {
      label: 'Spartanburg ↔ Greenville dual-Upstate pairs',
      direction: 'within',
      context:
        'Complement markets, not clones; price portal time honestly on I-85 between the two cores.',
    },
    {
      label: 'Spartanburg → Charlotte / NC job markets',
      direction: 'outbound',
      context:
        'Cross-border career moves; FMCSA required for any NC destination leg.',
    },
    {
      label: 'Spartanburg → Florida / Sun Belt family long-distance',
      direction: 'outbound',
      context:
        'Interstate household goods with full inventory surveys; not a local hourly quote.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Boiling Springs / North Spartanburg growth suburbs',
      direction: 'within',
      context:
        'HOA packets and school-season Saturday demand; book peak weekends early.',
    },
  ],
  york: [
    {
      label: 'Within York (Rock Hill ↔ Fort Mill / Tega Cay / Lake Wylie)',
      direction: 'within',
      context:
        'Charlotte-spillover HOAs and lake-edge access; I-77 peaks rewrite short map miles.',
    },
    {
      label: 'Charlotte / Mecklenburg overflow → Rock Hill & Fort Mill',
      direction: 'inbound',
      context:
        'Cross-border SC–NC affordability spill; destination is SC Class E if pure in-state delivery, FMCSA if origin is NC.',
    },
    {
      label: 'York SC ↔ Charlotte NC daily-commute household moves',
      direction: 'outbound',
      context:
        'Interstate authority required even for short I-77 hops once the state line is crossed.',
    },
    {
      label: 'Fort Mill master-planned HOA villages',
      direction: 'within',
      context:
        'Gate lists, COI, and truck limits dominate; collect packets before the survey is final.',
    },
    {
      label: 'York → further Sun Belt / Florida long-distance',
      direction: 'outbound',
      context:
        'Family interstate exits; volume and valuation drive price more than Rock Hill curb rules.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Lake Wylie / Tega Cay waterfront-edge stock',
      direction: 'within',
      context:
        'Driveway grade, dock gear, and HOA rules; photo access before dispatch.',
    },
  ],
  lexington: [
    {
      label: 'Within Lexington (Town of Lexington ↔ Irmo / Cayce / Lake Murray edges)',
      direction: 'within',
      context:
        'West-Columbia suburbs and lake-adjacent lots; HOA and driveway access vary by pocket.',
    },
    {
      label: 'In-state SC → Lexington growth suburbs',
      direction: 'inbound',
      context:
        'Midlands affordability and school-seeking inflows west of Columbia — not a Richland downtown product.',
    },
    {
      label: 'Lexington ↔ Richland dual-Midlands pairs',
      direction: 'within',
      context:
        'Common household pattern across the Congaree; clarify county lines for inventory and timing.',
    },
    {
      label: 'Lexington → Charlotte / Atlanta career exits',
      direction: 'outbound',
      context:
        'I-77 / I-20 professional interstate moves; FMCSA carriers required out of state.',
    },
    {
      label: 'Lake Murray second-home and primary residence turns',
      direction: 'within',
      context:
        'Seasonal and weekend demand spikes; long carries and outdoor inventory are common.',
    },
    {
      label: 'Lexington → Florida family long-distance',
      direction: 'outbound',
      context:
        'Sun Belt exits with full household goods; use volume calculator and FMCSA-authorized carriers.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  berkeley: [
    {
      label: 'Within Berkeley (Goose Creek / Hanahan ↔ Cainhoy / Nexton / Moncks Corner)',
      direction: 'within',
      context:
        'Longer suburban runs and newer subdivisions; Clements Ferry and US-52 timing matter.',
    },
    {
      label: 'Charleston metro overflow → Berkeley growth corridors',
      direction: 'inbound',
      context:
        'North/east growth from peninsula pricing; HOA villages and unfinished streets appear on surveys.',
    },
    {
      label: 'Berkeley ↔ Charleston / Dorchester tri-county pairs',
      direction: 'within',
      context:
        'Daily Lowcountry multi-county moves; still SC Class E if entirely in-state — access products differ by county.',
    },
    {
      label: 'Berkeley → Charlotte / Atlanta career exits',
      direction: 'outbound',
      context:
        'Regional interstate professional moves; FMCSA required beyond South Carolina.',
    },
    {
      label: 'Cainhoy / Clements Ferry new-build corridors',
      direction: 'within',
      context:
        'Construction traffic and HOA rules; share gate codes and driveway photos early.',
    },
    {
      label: 'Berkeley → Florida coastal long-distance',
      direction: 'outbound',
      context:
        'Lifestyle interstate; inventory packing for humidity still starts at the SC origin.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  beaufort: [
    {
      label: 'Within Beaufort (Hilton Head ↔ Bluffton / Beaufort / Port Royal)',
      direction: 'within',
      context:
        'Gated communities and causeway timing; not a Myrtle Beach high-rise product.',
    },
    {
      label: 'Northeast / Midwest → Hilton Head & Bluffton second-home inflows',
      direction: 'inbound',
      context:
        'Seasonal and retirement demand; HOA packets and truck limits dominate island approaches.',
    },
    {
      label: 'Beaufort County gated / resort-edge turns',
      direction: 'within',
      context:
        'Security desks, COI, and approved hours; reconfirm the day before for US-278 island legs.',
    },
    {
      label: 'Beaufort → Charleston / Savannah regional hops',
      direction: 'outbound',
      context:
        'Coastal Lowcountry pairs; clarify SC-only vs GA interstate (Savannah) authority needs.',
    },
    {
      label: 'Hilton Head → further Florida coastal retirement',
      direction: 'outbound',
      context:
        'Coastal-to-coastal long-distance; FMCSA carriers and careful packing for humidity.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Lady’s Island / St. Helena / mainland Beaufort mix',
      direction: 'within',
      context:
        'Bridge timing and mixed SFH stock; do not price like Hilton Head gated estates.',
    },
  ],
  dorchester: [
    {
      label: 'Within Dorchester (Summerville historic ↔ Nexton / Ladson edges / rural west)',
      direction: 'within',
      context:
        'HOA growth villages vs older Summerville grids; I-26 / US-78 timing shapes crew hours.',
    },
    {
      label: 'Charleston metro northwest overflow → Summerville / Dorchester',
      direction: 'inbound',
      context:
        'Affordability and space seeking from peninsula and near-core pricing; HOA packets are routine.',
    },
    {
      label: 'Dorchester ↔ Charleston / Berkeley tri-county pairs',
      direction: 'within',
      context:
        'Common Lowcountry multi-county household moves; access rules differ even when authority is still Class E in-state.',
    },
    {
      label: 'Dorchester → Charlotte / Atlanta career exits',
      direction: 'outbound',
      context:
        'Regional interstate; FMCSA required out of South Carolina.',
    },
    {
      label: 'Nexton / east Summerville master-planned growth',
      direction: 'within',
      context:
        'New streets, gate lists, and school-season Saturday demand; book peak weekends early.',
    },
    {
      label: 'Dorchester → Florida family long-distance',
      direction: 'outbound',
      context:
        'Sun Belt interstate with full inventory surveys; not a local HOA-only quote.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  anderson: [
    {
      label: 'Within Anderson (City core ↔ Lake Hartwell / Northlake / Pendleton edges)',
      direction: 'within',
      context:
        'Lake lots and rural-suburban mix; I-85 timing for any Greenville-linked pair.',
    },
    {
      label: 'Upstate manufacturing & I-85 secondary-market inflows',
      direction: 'inbound',
      context:
        'Plant and logistics demand without Greenville downtown curb complexity.',
    },
    {
      label: 'Anderson ↔ Greenville / Clemson-area pairs',
      direction: 'within',
      context:
        'Common Upstate multi-county moves; price I-85 portal time honestly.',
    },
    {
      label: 'Anderson → Charlotte / Atlanta career exits',
      direction: 'outbound',
      context:
        'Interstate professional moves; FMCSA required beyond SC.',
    },
    {
      label: 'Lake Hartwell second-home and primary residence turns',
      direction: 'within',
      context:
        'Driveway grade, docks, and outdoor inventory; photo access before dispatch.',
    },
    {
      label: 'Anderson → Florida / Sun Belt long-distance',
      direction: 'outbound',
      context:
        'Family interstate household goods; volume calculator recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  florence: [
    {
      label: 'Within Florence (Medical / downtown core ↔ west Florence / I-95 logistics edges)',
      direction: 'within',
      context:
        'Pee Dee hub product — medical multifamily and suburban SFH, not coastal high-rises.',
    },
    {
      label: 'I-95 / I-20 corridor inflows into Florence regional hub',
      direction: 'inbound',
      context:
        'Healthcare, logistics, and regional employment draws; mid-week hard dates are common.',
    },
    {
      label: 'Florence ↔ Myrtle Beach / Coastal Carolina lifestyle hops',
      direction: 'outbound',
      context:
        'In-state coastal pairs still need honest drive time; Class E for pure SC legs.',
    },
    {
      label: 'Florence → Charlotte / Raleigh / Atlanta career exits',
      direction: 'outbound',
      context:
        'I-95 / I-20 professional interstate moves; FMCSA required out of state.',
    },
    {
      label: 'Pee Dee rural-to-hub consolidation moves',
      direction: 'within',
      context:
        'Longer empty miles from surrounding towns; inventory surveys beat map-mile guesses.',
    },
    {
      label: 'Florence → Florida / Sun Belt long-distance',
      direction: 'outbound',
      context:
        'I-95 corridor interstate household goods; volume and valuation drive price.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
};

const VA_ROUTES: Record<string, CountyPopularRoute[]> = {
  fairfax: [
    {
      label: 'Within Fairfax (Tysons / Reston ↔ Springfield / Annandale / McLean)',
      direction: 'within',
      context:
        'High-rise COI windows and HOA suburbs on the same map; I-66 / I-495 portal time dominates cross-county pairs.',
    },
    {
      label: 'Nationwide federal / contractor inflows → Fairfax employment corridors',
      direction: 'inbound',
      context:
        'Defense, intel, and contractor relos cluster near Tysons, Reston, and Springfield; hard report dates are common.',
    },
    {
      label: 'Fairfax ↔ Arlington / Alexandria urban pairs',
      direction: 'within',
      context:
        'Still Virginia in-state for pure VA jobs — but tower access rules differ sharply from Fairfax HOA product.',
    },
    {
      label: 'Fairfax → Maryland / DC cross-border job moves',
      direction: 'outbound',
      context:
        'Beltway interstate authority required once any leg leaves Virginia; confirm FMCSA for MD/DC destinations.',
    },
    {
      label: 'Fairfax → Texas / Sun Belt long-distance exits',
      direction: 'outbound',
      context:
        'Corporate and family interstate household goods; volume surveys matter more than local hourly rates.',
      href: '/resources/routes/california-to-texas',
    },
    {
      label: 'Tysons / Reston tower and mid-rise stock',
      direction: 'within',
      context:
        'Elevator reservations, COI, and dock rules fail estimates more often than packing skill.',
    },
  ],
  'prince-william': [
    {
      label: 'Within Prince William (Woodbridge ↔ Manassas / Gainesville / Dale City)',
      direction: 'within',
      context:
        'I-95 and VA-234 growth corridors; HOA gate lists and long suburban runs.',
    },
    {
      label: 'Quantico-adjacent PCS & military family moves',
      direction: 'inbound',
      context:
        'Hard report dates and storage-in-transit near base-adjacent housing; flexible delivery windows help.',
    },
    {
      label: 'Prince William ↔ Fairfax / Loudoun job-driven hops',
      direction: 'within',
      context:
        'Common NoVA multi-county pairs; price I-95 / I-66 portal time honestly.',
    },
    {
      label: 'Prince William → Maryland / DC metro interstate legs',
      direction: 'outbound',
      context:
        'Short map miles can still be interstate; FMCSA required beyond Virginia.',
    },
    {
      label: 'Woodbridge / Dale City HOA family moves',
      direction: 'within',
      context:
        'Master-planned communities and school-season Saturday demand; book peak weekends early.',
    },
    {
      label: 'Prince William → Florida / Carolinas long-distance',
      direction: 'outbound',
      context:
        'Family interstate exits; use volume calculator and FMCSA-authorized carriers.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  loudoun: [
    {
      label: 'Within Loudoun (Ashburn / Sterling ↔ Leesburg / South Riding)',
      direction: 'within',
      context:
        'Data-center east vs historic Leesburg vs planned communities; Dulles Toll Road timing matters.',
    },
    {
      label: 'Tech / data-center workforce inflows → Ashburn corridor',
      direction: 'inbound',
      context:
        'Corporate hard dates and HOA villages dominate; mid-week starts beat school peaks.',
    },
    {
      label: 'Loudoun ↔ Fairfax / Arlington professional pairs',
      direction: 'within',
      context:
        'In-state NoVA moves with very different access products at each end.',
    },
    {
      label: 'Loudoun → West Virginia / Maryland border interstate legs',
      direction: 'outbound',
      context:
        'US-15 and western approaches can cross state lines quickly; confirm FMCSA when they do.',
    },
    {
      label: 'Leesburg / western Loudoun larger-lot stock',
      direction: 'within',
      context:
        'Longer driveways and rural-edge access; photo grades and turn radius before dispatch.',
    },
    {
      label: 'Loudoun → Texas / Sun Belt corporate long-distance',
      direction: 'outbound',
      context:
        'Interstate household goods with full inventory surveys; not a local HOA-only quote.',
      href: '/resources/routes/california-to-texas',
    },
  ],
  chesterfield: [
    {
      label: 'Within Chesterfield (Midlothian ↔ Chester / Brandermill / Swift Creek)',
      direction: 'within',
      context:
        'Southside master-planned growth; Chippenham and VA-288 portal time shapes crew hours.',
    },
    {
      label: 'In-state VA → Chesterfield family suburban inflows',
      direction: 'inbound',
      context:
        'Richmond-region affordability and school-seeking growth — not a NoVA Beltway product.',
    },
    {
      label: 'Chesterfield ↔ Henrico / Richmond City dual-region pairs',
      direction: 'within',
      context:
        'Common capital-region multi-jurisdiction moves; clarify city vs county addresses.',
    },
    {
      label: 'Chesterfield → NoVA / DC career exits',
      direction: 'outbound',
      context:
        'I-95 northbound professional interstate moves when leaving Virginia; FMCSA required out of state.',
    },
    {
      label: 'Brandermill / Swift Creek HOA villages',
      direction: 'within',
      context:
        'Gate lists and COI; collect packets before the survey is final.',
    },
    {
      label: 'Chesterfield → Carolinas / Florida long-distance',
      direction: 'outbound',
      context:
        'Family Sun Belt exits with full household goods; volume surveys recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  henrico: [
    {
      label: 'Within Henrico (Short Pump / west end ↔ east end / RIC approaches)',
      direction: 'within',
      context:
        'West-end growth and retail corridors vs east-end patterns; I-64 / I-295 timing matters.',
    },
    {
      label: 'In-state VA → Henrico west-end / Short Pump growth',
      direction: 'inbound',
      context:
        'Suburban employment and retail-corridor demand; HOA product is common.',
    },
    {
      label: 'Henrico ↔ Chesterfield / Richmond City pairs',
      direction: 'within',
      context:
        'Daily capital-region hops; access rules differ even when Virginia DMV still applies in-state.',
    },
    {
      label: 'Henrico → NoVA / Maryland interstate career moves',
      direction: 'outbound',
      context:
        'I-95 / I-64 professional exits; FMCSA required beyond Virginia.',
    },
    {
      label: 'Short Pump / Innsbrook-edge multifamily and SFH mix',
      direction: 'within',
      context:
        'Elevator buildings and HOA SFH on the same corridors; survey access type carefully.',
    },
    {
      label: 'Henrico → Florida / Sun Belt long-distance',
      direction: 'outbound',
      context:
        'Interstate household goods; inventory and valuation drive price more than local hourly rates.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  'virginia-beach': [
    {
      label: 'Within Virginia Beach (Oceanfront ↔ Kempsville / Great Neck / Princess Anne)',
      direction: 'within',
      context:
        'Resort curb and high-rises vs inland HOA suburbs; Shore Drive and I-264 timing matter.',
    },
    {
      label: 'Military family / PCS inflows to Virginia Beach',
      direction: 'inbound',
      context:
        'NAS Oceana-adjacent and broader military calendars create hard-date clusters.',
    },
    {
      label: 'Virginia Beach ↔ Norfolk / Chesapeake Hampton Roads pairs',
      direction: 'within',
      context:
        'Tunnel and bridge logistics; do not price like a simple suburban hop.',
    },
    {
      label: 'Virginia Beach → NoVA / DC career exits',
      direction: 'outbound',
      context:
        'Long in-state or interstate professional moves; confirm VA DMV vs FMCSA for the full route.',
    },
    {
      label: 'Oceanfront condo / hotel-adjacent turns',
      direction: 'within',
      context:
        'Elevators, tourist traffic, and limited staging; avoid peak beach weekends when flexible.',
    },
    {
      label: 'Virginia Beach → Florida coastal long-distance',
      direction: 'outbound',
      context:
        'Coastal-to-coastal interstate household goods; humidity packing still starts at origin.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  arlington: [
    {
      label: 'Within Arlington (Rosslyn / Courthouse ↔ Pentagon City / Crystal City / Ballston)',
      direction: 'within',
      context:
        'Near-universal elevator/COI product; curb staging is the job, not a footnote.',
    },
    {
      label: 'Federal / contractor inflows → Arlington urban core',
      direction: 'inbound',
      context:
        'Pentagon-adjacent and agency calendars create mid-week hard dates and dock competition.',
    },
    {
      label: 'Arlington ↔ Fairfax / Alexandria / DC cross-border pairs',
      direction: 'outbound',
      context:
        'DC destinations are interstate; short map miles still need FMCSA when leaving Virginia.',
    },
    {
      label: 'Arlington high-rise turnover waves',
      direction: 'within',
      context:
        'Mid-month lease ends and building window conflicts; reserve elevators early.',
    },
    {
      label: 'Arlington → Maryland suburban job moves',
      direction: 'outbound',
      context:
        'Beltway interstate household goods; confirm FMCSA and building packets at both ends.',
    },
    {
      label: 'Arlington → Sun Belt long-distance exits',
      direction: 'outbound',
      context:
        'Urban origin complexity plus interstate linehaul; full inventory surveys recommended.',
      href: '/resources/routes/california-to-texas',
    },
  ],
  richmond: [
    {
      label: 'Within Richmond City (Fan / Museum District ↔ Downtown / Southside city neighborhoods)',
      direction: 'within',
      context:
        'Row homes, narrow streets, and elevators; independent-city rules differ from Henrico/Chesterfield suburbs.',
    },
    {
      label: 'In-state VA → Richmond capital / university / urban lifestyle inflows',
      direction: 'inbound',
      context:
        'State government, VCU-adjacent, and urban redevelopment demand; curb staging dominates.',
    },
    {
      label: 'Richmond City ↔ Henrico / Chesterfield suburban pairs',
      direction: 'within',
      context:
        'Clarify city vs county addresses; access products differ under one metro name.',
    },
    {
      label: 'Richmond → NoVA / DC career exits',
      direction: 'outbound',
      context:
        'I-95 northbound professional moves; FMCSA required once leaving Virginia.',
    },
    {
      label: 'Fan / Museum District row-home and multi-story stock',
      direction: 'within',
      context:
        'Stairs, limited truck length, and street parking competition; photo access early.',
    },
    {
      label: 'Richmond → Carolinas / Florida long-distance',
      direction: 'outbound',
      context:
        'Family interstate household goods on I-95 corridor; volume calculator recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  chesapeake: [
    {
      label: 'Within Chesapeake (Greenbrier ↔ Western Branch / Deep Creek / Great Bridge)',
      direction: 'within',
      context:
        'City-scale suburban distances; Dominion Blvd and I-64 timing shape crew hours.',
    },
    {
      label: 'Hampton Roads military overflow → Chesapeake suburbs',
      direction: 'inbound',
      context:
        'Growth and HOA product without oceanfront tourism curb constraints.',
    },
    {
      label: 'Chesapeake ↔ Virginia Beach / Norfolk pairs',
      direction: 'within',
      context:
        'Tunnel and bridge logistics; price portal time honestly across independent cities.',
    },
    {
      label: 'Chesapeake → NoVA / Carolinas career or family exits',
      direction: 'outbound',
      context:
        'Confirm Virginia DMV for pure in-state long hauls vs FMCSA for out-of-state legs.',
    },
    {
      label: 'Greenbrier HOA and retail-corridor stock',
      direction: 'within',
      context:
        'Gate lists and peak retail congestion; mid-week mornings clear staging.',
    },
    {
      label: 'Chesapeake → Florida long-distance',
      direction: 'outbound',
      context:
        'Interstate household goods; inventory surveys beat map-mile guesses.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  norfolk: [
    {
      label: 'Within Norfolk (Downtown / Ghent ↔ Naval Station edges / Ocean View)',
      direction: 'within',
      context:
        'Denser urban stock and tunnel approaches; not a Virginia Beach resort product.',
    },
    {
      label: 'Naval Station Norfolk PCS & fleet-family moves',
      direction: 'inbound',
      context:
        'Hard report dates, base-adjacent access rules, and storage-in-transit are common.',
    },
    {
      label: 'Norfolk ↔ Virginia Beach / Chesapeake / Portsmouth pairs',
      direction: 'within',
      context:
        'Tunnels and bridges rewrite “local” estimates; share timing constraints early.',
    },
    {
      label: 'Norfolk → NoVA / DC career exits',
      direction: 'outbound',
      context:
        'Long I-64 / I-95 professional moves; FMCSA when leaving Virginia.',
    },
    {
      label: 'Ghent / Downtown multi-story and curb-constrained stock',
      direction: 'within',
      context:
        'Stairs, limited truck length, and parking competition; photo staging options.',
    },
    {
      label: 'Norfolk → Florida / Sun Belt long-distance',
      direction: 'outbound',
      context:
        'Port-city origin complexity plus interstate linehaul; full inventory recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  stafford: [
    {
      label: 'Within Stafford (Garrisonville / VA-610 ↔ Aquia / southern Stafford)',
      direction: 'within',
      context:
        'I-95 NoVA-commute growth and HOA product; VA-610 congestion shapes start times.',
    },
    {
      label: 'Quantico-adjacent PCS & federal commute inflows',
      direction: 'inbound',
      context:
        'Military and DC-commute calendars create hard dates and mid-week demand.',
    },
    {
      label: 'Stafford ↔ Prince William / Fairfax job pairs',
      direction: 'within',
      context:
        'I-95 corridor multi-county NoVA face; price portal time honestly.',
    },
    {
      label: 'Stafford → Maryland / DC interstate legs',
      direction: 'outbound',
      context:
        'Short northbound hops can still leave Virginia; confirm FMCSA when they do.',
    },
    {
      label: 'Stafford HOA growth villages',
      direction: 'within',
      context:
        'Gate lists and school-season Saturday demand; book peak weekends early.',
    },
    {
      label: 'Stafford → Carolinas / Florida long-distance',
      direction: 'outbound',
      context:
        'Family interstate exits via I-95; volume calculator recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  spotsylvania: [
    {
      label: 'Within Spotsylvania (VA-3 / Massaponax ↔ Courtland / Lake Anna edges)',
      direction: 'within',
      context:
        'Fredericksburg-area growth south of NoVA; longer rural-suburban runs than Stafford’s I-95 face.',
    },
    {
      label: 'In-state VA → Spotsylvania affordability growth',
      direction: 'inbound',
      context:
        'Households trading NoVA prices for space; HOA and new-build access are common.',
    },
    {
      label: 'Spotsylvania ↔ Stafford / Fredericksburg-area pairs',
      direction: 'within',
      context:
        'Clarify city vs county addresses; VA-3 and I-95 timing differ by pocket.',
    },
    {
      label: 'Spotsylvania → NoVA / DC career exits',
      direction: 'outbound',
      context:
        'I-95 northbound professional moves; FMCSA required out of Virginia.',
    },
    {
      label: 'Lake Anna / western edge larger-lot stock',
      direction: 'within',
      context:
        'Longer driveways and seasonal second-home turns; photo access before dispatch.',
    },
    {
      label: 'Spotsylvania → Carolinas / Florida long-distance',
      direction: 'outbound',
      context:
        'I-95 Sun Belt interstate household goods; inventory surveys recommended.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
};

const TN_ROUTES: Record<string, CountyPopularRoute[]> = {
  shelby: [
    { label: 'Within Shelby (Midtown ↔ East Memphis / Germantown)', direction: 'within', context: 'Stairs and curb near core vs HOA southeast rings — I-240 portal time dominates.' },
    { label: 'Midwest / Illinois → Memphis logistics & healthcare markets', direction: 'inbound', context: 'Interstate household goods into river-city stock; heat pacing on unload days.', href: '/resources/routes/illinois-to-tennessee' },
    { label: 'Florida ↔ Memphis reverse family & career moves', direction: 'inbound', context: 'I-55/I-40 northbound household goods; FMCSA for interstate legs.' },
    { label: 'Memphis ↔ Nashville (I-40)', direction: 'outbound', context: 'In-state long haul between West Tennessee and Middle Tennessee job markets.' },
    { label: 'Shelby ↔ Arkansas / Mississippi border pairs', direction: 'outbound', context: 'Cross-state metro edges; clarify TDOR vs FMCSA authority.' },
    { label: 'Northeast → Memphis distribution corridors', direction: 'inbound', context: 'Interstate arrivals into East Memphis and southeast suburban housing.' },
  ],
  davidson: [
    { label: 'Within Davidson (Gulch / Downtown ↔ East Nashville / Antioch)', direction: 'within', context: 'Tower elevators vs neighborhood stairs vs outer multi-family — not one local rate.' },
    { label: 'Northeast → Nashville music, healthcare & tech markets', direction: 'inbound', context: 'Corporate and creative relocations into core and near-core stock.', href: '/resources/routes/new-jersey-to-tennessee' },
    { label: 'Florida ↔ Nashville reverse career & lifestyle moves', direction: 'inbound', context: 'I-65/I-24 household goods; event-week curb rules reshape unload windows.' },
    { label: 'Davidson ↔ Williamson / Rutherford / Sumner / Wilson metro pairs', direction: 'within', context: 'Nashville-ring logistics; keep county lines clear on estimates.' },
    { label: 'Nashville ↔ Memphis (I-40)', direction: 'outbound', context: 'In-state long haul between Middle and West Tennessee.' },
    { label: 'Midwest → Nashville professional corridors', direction: 'inbound', context: 'Healthcare and corporate inflows into multi-unit and neighborhood stock.', href: '/resources/routes/illinois-to-tennessee' },
  ],
  knox: [
    { label: 'Within Knox (Downtown / UT ↔ West Knoxville / foothills)', direction: 'within', context: 'Campus multi-family vs HOA west growth vs hillside driveways.' },
    { label: 'Northeast / Florida → Knoxville regional hub markets', direction: 'inbound', context: 'Interstate household goods into East Tennessee housing; I-40 approach buffers.' },
    { label: 'Knox ↔ Blount (Maryville / Alcoa) pairs', direction: 'within', context: 'US-129 everyday regional logistics; clarify county lines.' },
    { label: 'Knoxville ↔ Nashville (I-40)', direction: 'outbound', context: 'In-state long haul for career moves west.' },
    { label: 'Midwest → Knoxville energy/research corridors', direction: 'inbound', context: 'Professional and research inflows into west Knox and near-core stock.' },
    { label: 'Knox ↔ Sevier tourism-adjacent reverse moves', direction: 'outbound', context: 'Residential-to-tourism-edge pairs; not full cabin product unless surveyed.' },
  ],
  hamilton: [
    { label: 'Within Hamilton (Downtown / Southside ↔ East Brainerd / Hixson)', direction: 'within', context: 'River-core elevators vs eastern HOA growth vs northern multi-family.' },
    { label: 'Northeast / Florida → Chattanooga lifestyle & manufacturing markets', direction: 'inbound', context: 'Interstate household goods into river-and-ridge stock.' },
    { label: 'Hamilton ↔ North Georgia border pairs', direction: 'outbound', context: 'Cross-state metro edges; clarify TDOR vs FMCSA authority.' },
    { label: 'Chattanooga ↔ Nashville (I-24)', direction: 'outbound', context: 'In-state long haul for career moves northwest.' },
    { label: 'Midwest → Chattanooga industrial & healthcare corridors', direction: 'inbound', context: 'Manufacturing and clinical employment inflows.' },
    { label: 'Hamilton ↔ Knoxville regional pairs (I-75)', direction: 'outbound', context: 'East Tennessee regional hauls longer than a suburb hop.' },
  ],
  rutherford: [
    { label: 'Within Rutherford (Murfreesboro growth ↔ Smyrna / La Vergne)', direction: 'within', context: 'HOA new construction vs industrial-adjacent multi-family.' },
    { label: 'Rutherford ↔ Davidson I-24 pairs', direction: 'within', context: 'Southeast Nashville overflow logistics; portal time dominates at peak.' },
    { label: 'Northeast / Florida → Murfreesboro growth housing', direction: 'inbound', context: 'Interstate arrivals into HOA multi-family and tracts.' },
    { label: 'Midwest → Rutherford manufacturing & logistics corridors', direction: 'inbound', context: 'Industrial employment inflows into Smyrna-area housing.' },
    { label: 'Rutherford ↔ Williamson / Wilson ring pairs', direction: 'within', context: 'Different suburb-ring fabrics under one metro label — not clones.' },
    { label: 'Florida ↔ Middle Tennessee reverse family moves via I-24', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  williamson: [
    { label: 'Within Williamson (Franklin estates ↔ Brentwood / Cool Springs)', direction: 'within', context: 'Higher-value inventory and HOA gates — not Rutherford growth-tract pricing.' },
    { label: 'Williamson ↔ Davidson I-65 pairs', direction: 'within', context: 'Premium south corridor logistics into Nashville core.' },
    { label: 'Northeast → Franklin / Brentwood professional markets', direction: 'inbound', context: 'Interstate arrivals into estate and multi-unit Cool Springs product.' },
    { label: 'Florida ↔ Williamson reverse lifestyle moves', direction: 'inbound', context: 'Higher-value household goods; careful-handling surveys required.' },
    { label: 'Midwest → Cool Springs corporate corridors', direction: 'inbound', context: 'Corporate apartment and executive moves into elevator product.' },
    { label: 'Williamson ↔ Rutherford south Middle Tennessee edges', direction: 'within', context: 'South metro pairs with different HOA and price mixes.' },
  ],
  montgomery: [
    { label: 'Within Montgomery (Fort Campbell–adjacent multi-family ↔ Sango growth)', direction: 'within', context: 'PCS lease waves vs HOA villages — I-24/US-41A timing dominates.' },
    { label: 'Military PCS lanes → Fort Campbell / Clarksville', direction: 'inbound', context: 'Order-driven household goods; report dates drive the plan more than preferred Saturdays.' },
    { label: 'Northeast → Fort Campbell PCS households', direction: 'inbound', context: 'Interstate military moves; FMCSA for cross-state legs.' },
    { label: 'Montgomery ↔ Kentucky border pairs', direction: 'outbound', context: 'Clarify Tennessee vs Kentucky authority and empty miles.' },
    { label: 'Florida → Clarksville reverse PCS', direction: 'inbound', context: 'I-24 northbound military and family household goods.' },
    { label: 'Montgomery → Nashville metro post-service career moves', direction: 'outbound', context: 'In-state long haul after separation into Davidson-ring housing.' },
  ],
  sumner: [
    { label: 'Within Sumner (Hendersonville HOA growth ↔ Gallatin / lake edges)', direction: 'within', context: 'North-ring multi-family vs lake-adjacent driveways.' },
    { label: 'Sumner ↔ Davidson I-65 / Vietnam Veterans pairs', direction: 'within', context: 'North Nashville overflow logistics; portal time dominates at peak.' },
    { label: 'Northeast / Florida → Hendersonville growth housing', direction: 'inbound', context: 'Interstate arrivals into north-ring HOA product.' },
    { label: 'Midwest → Sumner County family corridors', direction: 'inbound', context: 'Family and professional inflows seeking space north of Nashville.' },
    { label: 'Sumner ↔ Wilson / Robertson edges', direction: 'within', context: 'Different north/east ring fabrics — not identical route blobs.' },
    { label: 'Florida ↔ Middle Tennessee reverse family moves via I-65', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  wilson: [
    { label: 'Within Wilson (Mt. Juliet HOA growth ↔ Lebanon)', direction: 'within', context: 'I-40 multi-family vs town mixed stock.' },
    { label: 'Wilson ↔ Davidson I-40 pairs', direction: 'within', context: 'East Nashville overflow logistics; portal time dominates at peak.' },
    { label: 'Northeast / Florida → Mt. Juliet growth housing', direction: 'inbound', context: 'Interstate arrivals into east-ring HOA product.' },
    { label: 'Midwest → Wilson County family corridors', direction: 'inbound', context: 'Family and logistics employment inflows along I-40.' },
    { label: 'Wilson ↔ Rutherford / Sumner ring pairs', direction: 'within', context: 'East vs southeast vs north ring differences matter on access surveys.' },
    { label: 'Florida ↔ Middle Tennessee reverse family moves via I-40', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  blount: [
    { label: 'Within Blount (Maryville ↔ Alcoa / foothill edges)', direction: 'within', context: 'Valley HOA product vs hillside driveways vs airport corridors.' },
    { label: 'Blount ↔ Knox (US-129 / Alcoa Hwy) pairs', direction: 'within', context: 'Knoxville-south overflow logistics; keep county lines clear.' },
    { label: 'Northeast / Florida → Maryville foothill markets', direction: 'inbound', context: 'Interstate household goods into East Tennessee foothill housing.' },
    { label: 'Blount ↔ Sevier park-approach edges', direction: 'outbound', context: 'Residential-to-tourism-edge pairs; survey cabin access separately.' },
    { label: 'Midwest → Blount County regional housing', direction: 'inbound', context: 'Employment and lifestyle inflows near Knoxville metro south.' },
    { label: 'Blount → Nashville long in-state career moves', direction: 'outbound', context: 'I-40 westbound household goods longer than a foothill hop.' },
  ],
  sevier: [
    { label: 'Within Sevier (Sevierville ↔ Pigeon Forge / Gatlinburg cabins)', direction: 'within', context: 'Town multi-family vs tourism curb peaks vs steep cabin approaches.' },
    { label: 'Northeast / Florida → Sevier tourism & second-home markets', direction: 'inbound', context: 'Interstate household goods into cabin and condo product; seasonal buffers required.' },
    { label: 'Midwest → Pigeon Forge / Gatlinburg lifestyle moves', direction: 'inbound', context: 'Vacation-property and hospitality workforce logistics.' },
    { label: 'Sevier ↔ Knox / Blount reverse residential moves', direction: 'outbound', context: 'Tourism-edge to valley housing pairs; not identical access surveys.' },
    { label: 'Leaf-season / summer peak tourism moves', direction: 'within', context: 'US-441/US-321 congestion can dominate labor hours more than inventory size.' },
    { label: 'Florida ↔ East Tennessee tourism reverse moves', direction: 'inbound', context: 'Interstate household goods; storm and mountain weather contingency.' },
  ],
  sullivan: [
    { label: 'Within Sullivan (Kingsport ↔ Bristol TN / Blountville corridors)', direction: 'within', context: 'Industrial-residential mix vs state-line edges vs corridor multi-family.' },
    { label: 'Sullivan ↔ Virginia Bristol / Tri-Cities border pairs', direction: 'outbound', context: 'Clarify Tennessee vs Virginia destinations for TDOR vs FMCSA.' },
    { label: 'Northeast / Midwest → Tri-Cities manufacturing & healthcare markets', direction: 'inbound', context: 'Interstate household goods into Kingsport–Bristol housing.' },
    { label: 'Florida ↔ Tri-Cities reverse family moves', direction: 'inbound', context: 'I-81 corridor household goods; FMCSA for interstate legs.' },
    { label: 'Sullivan ↔ Washington County TN / Johnson City-area pairs', direction: 'within', context: 'Tri-Cities regional logistics longer than a single-city hop.' },
    { label: 'Tri-Cities → Nashville / Knoxville career moves', direction: 'outbound', context: 'In-state long hauls out of Northeast Tennessee.' },
  ],
};

const IL_ROUTES: Record<string, CountyPopularRoute[]> = {
  cook: [
    { label: 'Within Cook (Downtown / Near North ↔ South Side / West Side / NW Side)', direction: 'within', context: 'Elevator COI and street permits downtown vs alley walk-ups and bungalow belts — not one local rate.' },
    { label: 'National → Chicago career & student markets', direction: 'inbound', context: 'Interstate household goods into high-rises and multi-unit stock; winter access plans matter.' },
    { label: 'Cook ↔ DuPage / Lake / Will / Kane collar pairs', direction: 'within', context: 'City-to-collar logistics; I-290/I-294/I-90 portal time dominates.' },
    { label: 'Chicago ↔ Milwaukee / Northwest Indiana metro pairs', direction: 'outbound', context: 'Short interstate hops; FMCSA required once leaving Illinois.' },
    { label: 'Cook → Texas / Sun Belt long-distance exits', direction: 'outbound', context: 'Family and corporate interstate; volume surveys beat hourly guesses.', href: '/resources/routes/california-to-texas' },
    { label: 'Lake Shore Drive / downtown high-rise turns', direction: 'within', context: 'Elevator reservations and curb rules fail estimates more often than packing skill.' },
  ],
  dupage: [
    { label: 'Within DuPage (Naperville ↔ Wheaton / Oak Brook / Lombard)', direction: 'within', context: 'Collar HOA and corporate multi-unit product — not Chicago elevator defaults.' },
    { label: 'Cook County overflow → DuPage suburbs', direction: 'inbound', context: 'Space and school-seeking inflows; I-88 / I-355 timing shapes crew hours.' },
    { label: 'DuPage ↔ Kane / Will / Cook pairs', direction: 'within', context: 'West-collar multi-county logistics; clarify county lines on estimates.' },
    { label: 'DuPage → Wisconsin / Indiana interstate legs', direction: 'outbound', context: 'Regional career moves; FMCSA required beyond Illinois.' },
    { label: 'Naperville / Warrenville HOA growth stock', direction: 'within', context: 'Gate lists and long driveways; collect packets early.' },
    { label: 'DuPage → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Family interstate household goods; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  lake: [
    { label: 'Within Lake (North Shore edge ↔ Waukegan / Gurnee / Libertyville)', direction: 'within', context: 'Estate long-carries vs inland HOA growth; US-41 and I-94 timing differ by pocket.' },
    { label: 'Chicago metro overflow → Lake County suburbs', direction: 'inbound', context: 'North-collar growth and North Shore lifestyle product — not DuPage clone.' },
    { label: 'Lake ↔ Cook / McHenry pairs', direction: 'within', context: 'Tollway portal time and county-line clarity on every estimate.' },
    { label: 'Lake → Wisconsin border interstate legs', direction: 'outbound', context: 'Short northbound hops can leave Illinois; confirm FMCSA when they do.' },
    { label: 'North Shore estate and multi-unit mix', direction: 'within', context: 'Long carries, older stock, and HOA rules; photo access early.' },
    { label: 'Lake → Sun Belt long-distance exits', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  will: [
    { label: 'Within Will (Joliet ↔ Plainfield / New Lenox / Bolingbrook edge)', direction: 'within', context: 'South-collar growth and industrial adjacency; I-55 / I-80 portal time matters.' },
    { label: 'Cook / DuPage overflow → Will growth suburbs', direction: 'inbound', context: 'Affordability and new-build HOA product south of the core.' },
    { label: 'Will ↔ Cook / DuPage / Kane pairs', direction: 'within', context: 'South and southwest collar logistics; warehouse traffic can slow trucks.' },
    { label: 'Will → Indiana border interstate legs', direction: 'outbound', context: 'I-80 eastbound can cross state lines quickly; FMCSA when it does.' },
    { label: 'Joliet multi-unit and industrial-edge housing', direction: 'within', context: 'Different product than Naperville HOA villages — survey access carefully.' },
    { label: 'Will → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Family interstate; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  kane: [
    { label: 'Within Kane (Aurora ↔ Elgin / St. Charles / Geneva Fox River towns)', direction: 'within', context: 'Fox River bridges and Randall Road spine; west-collar product not Chicago elevators.' },
    { label: 'Cook / DuPage overflow → Kane growth corridors', direction: 'inbound', context: 'West-collar space-seeking inflows; I-88 / I-90 timing shapes start times.' },
    { label: 'Kane ↔ DuPage / McHenry pairs', direction: 'within', context: 'Clarify county lines; longer empty miles than near-city collar.' },
    { label: 'Kane → Wisconsin / Indiana interstate career legs', direction: 'outbound', context: 'FMCSA required once leaving Illinois.' },
    { label: 'Elgin / Aurora multi-unit and older SFH mix', direction: 'within', context: 'Stairs and curb constraints mixed with HOA growth villages.' },
    { label: 'Kane → Sun Belt long-distance exits', direction: 'outbound', context: 'Interstate household goods; volume surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  mchenry: [
    { label: 'Within McHenry (Crystal Lake ↔ Woodstock / Huntley / McHenry)', direction: 'within', context: 'Far-north collar empty miles and lower density; not a Naperville clone.' },
    { label: 'Cook / Lake overflow → McHenry space markets', direction: 'inbound', context: 'Longer suburban runs and rural-edge driveways; photo access early.' },
    { label: 'McHenry ↔ Lake / Kane / Cook pairs', direction: 'within', context: 'US-14 / IL-47 logistics; crew drive time often rivals load time.' },
    { label: 'McHenry → Wisconsin interstate legs', direction: 'outbound', context: 'Northern approaches can leave Illinois; confirm FMCSA when they do.' },
    { label: 'Huntley / Lake-in-the-Hills growth HOAs', direction: 'within', context: 'Gate lists and school-season Saturday demand; book peak weekends early.' },
    { label: 'McHenry → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Family interstate household goods; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  winnebago: [
    { label: 'Within Winnebago (Rockford core ↔ Loves Park / Machesney / South Beloit edge)', direction: 'within', context: 'Rock River regional product — not Chicago collar logistics.' },
    { label: 'Midwest / Chicago reverse → Rockford regional markets', direction: 'inbound', context: 'Manufacturing and healthcare inflows into multi-unit and SFH stock.' },
    { label: 'Winnebago ↔ Boone / Ogle regional pairs', direction: 'within', context: 'Longer empty miles between northern Illinois towns.' },
    { label: 'Rockford → Chicago career exits', direction: 'outbound', context: 'I-90 corridor professional moves; confirm ICC vs FMCSA for the full route.' },
    { label: 'Rockford → Wisconsin border interstate legs', direction: 'outbound', context: 'South Beloit approaches can cross state lines; FMCSA when they do.' },
    { label: 'Rockford → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  madison: [
    { label: 'Within Madison (Edwardsville / Glen Carbon ↔ Alton / Collinsville / Granite City)', direction: 'within', context: 'Metro East St. Louis-facing product — not Chicago collar.' },
    { label: 'Missouri / St. Louis metro → Madison County IL suburbs', direction: 'inbound', context: 'Cross-river inflows; clarify Illinois ICC vs interstate FMCSA authority.' },
    { label: 'Madison ↔ St. Clair Metro East pairs', direction: 'within', context: 'Partner counties with different cores; I-255 / I-55/70 timing matters.' },
    { label: 'Madison → Chicago / Indy career exits', direction: 'outbound', context: 'I-55 north or east professional moves; FMCSA when leaving Illinois.' },
    { label: 'SIUE / Edwardsville multi-family and growth suburbs', direction: 'within', context: 'Lease cycles and HOA product mixed with river-adjacent stock.' },
    { label: 'Madison → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  'st-clair': [
    { label: "Within St. Clair (Belleville ↔ O'Fallon / Shiloh / East St. Louis edges)", direction: 'within', context: 'Metro East partner to Madison — Scott AFB adjacency, not Edwardsville clone.' },
    { label: 'Scott AFB PCS & military family moves', direction: 'inbound', context: 'Hard report dates and storage-in-transit near base-adjacent housing.' },
    { label: 'St. Clair ↔ Madison / St. Louis MO pairs', direction: 'outbound', context: 'I-64 / I-255 logistics; Missouri destinations need FMCSA.' },
    { label: "Belleville multi-unit and older SFH grids", direction: 'within', context: "Stairs and curb constraints differ from O'Fallon HOA growth." },
    { label: 'St. Clair → Chicago / Midwest career exits', direction: 'outbound', context: 'I-55 / I-70 professional moves; confirm ICC vs FMCSA.' },
    { label: 'St. Clair → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  sangamon: [
    { label: 'Within Sangamon (Downtown Springfield ↔ west / south suburbs)', direction: 'within', context: 'Capital-city multi-unit vs suburban SFH — not Chicago product.' },
    { label: 'In-state IL → Springfield government / medical markets', direction: 'inbound', context: 'Session and agency calendars create mid-week demand clusters.' },
    { label: 'Sangamon ↔ Champaign / Peoria regional pairs', direction: 'within', context: 'Central Illinois long locals; empty miles matter.' },
    { label: 'Springfield → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-55 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'Medical corridor multi-family turns', direction: 'within', context: 'Elevator buildings near hospital districts; mid-month lease waves.' },
    { label: 'Sangamon → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  champaign: [
    { label: 'Within Champaign (Campustown / Urbana ↔ Savoy / Mahomet)', direction: 'within', context: 'University lease peaks vs family suburban product — not Chicago collar.' },
    { label: 'National student & faculty inflows → Champaign–Urbana', direction: 'inbound', context: 'August/May clusters; stairs and multi-unit access dominate near campus.' },
    { label: 'Champaign ↔ Sangamon / McLean regional pairs', direction: 'within', context: 'I-57 / I-74 long locals; price portal time honestly.' },
    { label: 'Champaign → Chicago / Indy career exits', direction: 'outbound', context: 'I-57 north or I-74 east professional moves; FMCSA out of state.' },
    { label: 'Campustown multi-unit turnover waves', direction: 'within', context: 'Short notice lease ends; book peak weekends early.' },
    { label: 'Champaign → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
  peoria: [
    { label: 'Within Peoria (Medical District / Downtown ↔ Heights / Dunlap edges)', direction: 'within', context: 'Central Illinois hub — bluff grades and medical multi-unit, not Chicago elevators as default.' },
    { label: 'Midwest → Peoria medical & manufacturing markets', direction: 'inbound', context: 'Healthcare and industrial employment inflows into multi-unit and SFH stock.' },
    { label: 'Peoria ↔ Tazewell (East Peoria) pairs', direction: 'within', context: 'River-crossing logistics; clarify Peoria County vs Tazewell addresses.' },
    { label: 'Peoria → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-74 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'Dunlap / northern growth HOA stock', direction: 'within', context: 'Gate lists and longer empty miles from core yards.' },
    { label: 'Peoria → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/new-jersey-to-florida' },
  ],
};


const CO_ROUTES: Record<string, CountyPopularRoute[]> = {
  denver: [
    { label: 'Within Denver (RiNo / LoDo / Highlands ↔ Capitol Hill / Wash Park)', direction: 'within', context: 'Elevator COI and street permits downtown vs multi-story walk-ups — altitude still hits new crews.' },
    { label: 'California / Texas / Arizona → Denver lifestyle & tech markets', direction: 'inbound', context: 'High-volume Front Range inflows; I-70 and DIA last-mile shape delivery windows.', href: '/resources/routes/california-to-colorado' },
    { label: 'Denver ↔ Boulder / Aurora / Lakewood / Highlands Ranch pairs', direction: 'within', context: 'City-to-collar logistics; I-25 / I-70 / C-470 portal time dominates.' },
    { label: 'Denver → Colorado Springs (I-25 south)', direction: 'outbound', context: 'Common Front Range internal move; still confirm CO PUC HHG for pure in-state jobs.' },
    { label: 'Midwest → Denver career corridors', direction: 'inbound', context: 'I-70 / I-76 approaches into multi-unit and bungalow stock.' },
    { label: 'Denver → Seattle / Bay Area reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of Colorado.', href: '/resources/routes/california-to-washington' },
  ],
  'el-paso': [
    { label: 'Within El Paso (Downtown / Old Colorado City ↔ Powers / Northgate / Widefield)', direction: 'within', context: 'Military-adjacent product mixed with Springs suburbs — not a Denver collar quote.' },
    { label: 'Fort Carson / Academy / Peterson PCS inflows', direction: 'inbound', context: 'Hard report dates and storage-in-transit dominate military calendars.' },
    { label: 'Colorado Springs ↔ Denver / Castle Rock (I-25)', direction: 'within', context: 'Front Range long local; price portal time honestly.' },
    { label: 'California / Texas → Colorado Springs lifestyle & military markets', direction: 'inbound', context: 'Interstate household goods into elevation and HOA stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Colorado Springs → Pueblo / southern Colorado pairs', direction: 'outbound', context: 'In-state regional hauls; CO PUC HHG for pure Colorado jobs.' },
    { label: 'El Paso → Arizona / Texas reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of state.' },
  ],
  arapahoe: [
    { label: 'Within Arapahoe (Aurora ↔ DTC / Centennial / Englewood / Parker edge)', direction: 'within', context: 'South-metro HOA and multi-unit mix — not Denver core elevators as default.' },
    { label: 'Denver overflow → Arapahoe suburbs', direction: 'inbound', context: 'Space and school-seeking inflows; I-225 / E-470 timing shapes crew hours.' },
    { label: 'Arapahoe ↔ Denver / Douglas / Adams pairs', direction: 'within', context: 'Collar multi-county logistics; clarify county lines on estimates.' },
    { label: 'California / Midwest → Aurora / south-metro housing', direction: 'inbound', context: 'Interstate arrivals into HOA tracts and multi-family.', href: '/resources/routes/california-to-colorado' },
    { label: 'Arapahoe → El Paso County (Springs) pairs', direction: 'outbound', context: 'I-25 southbound Front Range moves; CO PUC for in-state.' },
    { label: 'Arapahoe → Texas / Arizona long-distance exits', direction: 'outbound', context: 'Interstate household goods; volume surveys recommended.' },
  ],
  jefferson: [
    { label: 'Within Jefferson (Lakewood / Arvada ↔ Golden / foothills edges)', direction: 'within', context: 'West-metro grids and foothills driveways — elevation and grade matter.' },
    { label: 'Denver core ↔ Jefferson west-metro pairs', direction: 'within', context: 'I-70 / Colfax west / C-470 portal time dominates peak windows.' },
    { label: 'California / Midwest → Lakewood / Arvada housing', direction: 'inbound', context: 'Interstate household goods into west-metro stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Jefferson ↔ Boulder / Denver / Adams pairs', direction: 'within', context: 'Front Range multi-county logistics; clarify foothills access early.' },
    { label: 'Golden / Evergreen-edge foothills stock', direction: 'within', context: 'Photo grades, turn radius, and winter ice risk before truck sizing.' },
    { label: 'Jefferson → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  adams: [
    { label: 'Within Adams (Thornton / Westminster edges ↔ Brighton / Commerce City / airport corridor)', direction: 'within', context: 'North-metro growth and DIA-adjacent logistics — not Denver walk-up product.' },
    { label: 'Denver overflow → Adams new subdivisions', direction: 'inbound', context: 'HOA packets and unfinished streets appear on surveys.' },
    { label: 'Adams ↔ Denver / Weld / Arapahoe pairs', direction: 'within', context: 'I-25 / I-76 / E-470 timing; industrial traffic near airport corridors.' },
    { label: 'Midwest → Adams County north-metro housing', direction: 'inbound', context: 'I-76 / I-70 approaches into growth suburbs.' },
    { label: 'Airport-corridor multi-family and workforce housing', direction: 'within', context: 'Lease waves and early starts beat shift-change congestion.' },
    { label: 'Adams → interstate Sun Belt exits', direction: 'outbound', context: 'FMCSA required out of Colorado; volume surveys recommended.' },
  ],
  douglas: [
    { label: 'Within Douglas (Highlands Ranch ↔ Parker / Castle Rock / Lone Tree)', direction: 'within', context: 'Master-planned HOAs and longer south-metro runs — not Denver core.' },
    { label: 'Denver / Arapahoe overflow → Douglas growth villages', direction: 'inbound', context: 'Gate lists and COI dominate Highlands Ranch and Parker product.' },
    { label: 'Douglas ↔ Denver / El Paso (I-25) pairs', direction: 'within', context: 'South Front Range logistics; price C-470 / E-470 / I-25 portal time honestly.' },
    { label: 'California / Texas → Castle Rock / Parker housing', direction: 'inbound', context: 'Interstate household goods into HOA tracts.', href: '/resources/routes/california-to-colorado' },
    { label: 'Lone Tree / RidgeGate multi-unit stock', direction: 'within', context: 'Elevator buildings mixed with HOA SFH — survey access type carefully.' },
    { label: 'Douglas → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  larimer: [
    { label: 'Within Larimer (Fort Collins / CSU ↔ Loveland / Windsor edge)', direction: 'within', context: 'University multi-unit vs north Front Range suburbs — not Boulder clone.' },
    { label: 'CSU student & faculty lease cycles', direction: 'within', context: 'August/May clusters; stairs and multi-unit access dominate near campus.' },
    { label: 'Larimer ↔ Weld / Denver (I-25) pairs', direction: 'within', context: 'North Front Range long locals; I-25 portal time matters.' },
    { label: 'California / Midwest → Fort Collins lifestyle markets', direction: 'inbound', context: 'Interstate household goods into elevation and HOA stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Fort Collins → Denver career pairs', direction: 'outbound', context: 'In-state Front Range moves; CO PUC HHG for pure Colorado jobs.' },
    { label: 'Larimer → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  boulder: [
    { label: 'Within Boulder (Central Boulder ↔ Gunbarrel / Louisville-Superior edge / foothills)', direction: 'within', context: 'Constrained city access and foothills driveways — not Fort Collins sprawl.' },
    { label: 'CU / tech inflows → Boulder constrained housing', direction: 'inbound', context: 'Limited curb, multi-unit, and strict local conditions reshape move windows.' },
    { label: 'Boulder ↔ Denver (US-36) pairs', direction: 'within', context: 'Daily Front Range logistics; US-36 peak congestion is a real billable factor.' },
    { label: 'California / Seattle → Boulder tech & outdoor markets', direction: 'inbound', context: 'Interstate household goods into constrained city stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Boulder ↔ Larimer / Jefferson pairs', direction: 'within', context: 'Mountain-edge and north Front Range product differs at each end.' },
    { label: 'Boulder → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  weld: [
    { label: 'Within Weld (Greeley ↔ Windsor / Firestone-Frederick / Eaton edges)', direction: 'within', context: 'North plains growth and energy/ag adjacency — not Boulder product.' },
    { label: 'Energy / ag / manufacturing workforce inflows', direction: 'inbound', context: 'Mid-week hard dates and industrial traffic near growth towns.' },
    { label: 'Weld ↔ Larimer / Adams / Denver pairs', direction: 'within', context: 'I-25 / US-85 / US-34 logistics; longer empty miles than core metro collar.' },
    { label: 'Midwest → Greeley / north plains housing', direction: 'inbound', context: 'Interstate household goods into growth suburbs and SFH stock.' },
    { label: 'Windsor / southern Weld HOA growth', direction: 'within', context: 'Gate lists and school-season Saturday demand; book peak weekends early.' },
    { label: 'Weld → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  pueblo: [
    { label: 'Within Pueblo (Downtown / Bessemer ↔ north Pueblo / Pueblo West edge)', direction: 'within', context: 'Southern Colorado regional hub — not Denver or Springs clone.' },
    { label: 'In-state CO → Pueblo affordability & regional jobs', direction: 'inbound', context: 'Front Range reverse and southern CO inflows into multi-unit and SFH stock.' },
    { label: 'Pueblo ↔ Colorado Springs (I-25) pairs', direction: 'within', context: 'Southern Front Range regional hauls; CO PUC for pure in-state jobs.' },
    { label: 'Texas / New Mexico → Pueblo regional markets', direction: 'inbound', context: 'I-25 corridor interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Pueblo West / northern growth edges', direction: 'within', context: 'Longer empty miles from core yards; photo access early.' },
    { label: 'Pueblo → Denver / out-of-state career exits', direction: 'outbound', context: 'I-25 northbound or interstate; confirm CO PUC vs FMCSA for the full route.' },
  ],
};


const WA_ROUTES: Record<string, CountyPopularRoute[]> = {
  king: [
    { label: 'Within King (Seattle core ↔ Bellevue / Redmond / Renton / South King)', direction: 'within', context: 'Hills, stairs, and elevator COIs downtown vs Eastside HOA tech corridors — not one local rate.' },
    { label: 'California / Texas / Colorado → Seattle & Eastside tech markets', direction: 'inbound', context: 'High-volume Puget Sound inflows; rain-window packing and building packets dominate.', href: '/resources/routes/california-to-washington' },
    { label: 'King ↔ Pierce / Snohomish / Kitsap pairs', direction: 'within', context: 'I-5 / I-405 / ferry-adjacent logistics; clarify county lines and bridge timing.' },
    { label: 'Seattle ↔ Portland OR career pairs', direction: 'outbound', context: 'I-5 interstate; FMCSA required once leaving Washington.' },
    { label: 'Eastside multi-unit tech turnover', direction: 'within', context: 'Bellevue/Redmond elevators and HOA rules; mid-month lease waves pack freights elevators first.' },
    { label: 'King → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; volume surveys recommended.', href: '/resources/routes/california-to-texas' },
  ],
  pierce: [
    { label: 'Within Pierce (Tacoma ↔ Lakewood / Puyallup / Gig Harbor edges)', direction: 'within', context: 'South-Sound grids and JBLM adjacency — not a Seattle Eastside quote.' },
    { label: 'JBLM / military PCS inflows', direction: 'inbound', context: 'Hard report dates and storage-in-transit dominate military calendars.' },
    { label: 'Pierce ↔ King / Thurston pairs', direction: 'within', context: 'I-5 south-Sound logistics; SR-16 peninsula approaches differ from Tacoma core.' },
    { label: 'California / Midwest → Tacoma south-Sound housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Tacoma multi-unit and hillside stock', direction: 'within', context: 'Stairs, curb limits, and rain staging — survey access early.' },
    { label: 'Pierce → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  snohomish: [
    { label: 'Within Snohomish (Everett ↔ Lynnwood / Mill Creek / Monroe)', direction: 'within', context: 'North-metro growth mixed with industrial corridors — not King Eastside clone.' },
    { label: 'Boeing / industrial workforce & north-metro inflows', direction: 'inbound', context: 'Shift calendars and multi-family lease waves along I-5 north.' },
    { label: 'Snohomish ↔ King (I-5 / I-405) pairs', direction: 'within', context: 'North-metro to Seattle logistics; portal time dominates at peak.' },
    { label: 'California / Midwest → Everett / south Snohomish housing', direction: 'inbound', context: 'Interstate household goods into growth suburbs.', href: '/resources/routes/california-to-washington' },
    { label: 'Lynnwood–Mill Creek HOA and multi-unit mix', direction: 'within', context: 'Gate lists and elevators; collect packets early.' },
    { label: 'Snohomish → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  spokane: [
    { label: 'Within Spokane (Downtown / South Hill ↔ Valley / Northside)', direction: 'within', context: 'Eastern WA hub product — continental climate, not Puget Sound rain logistics.' },
    { label: 'Midwest / Idaho → Spokane regional markets', direction: 'inbound', context: 'I-90 corridor household goods into hillside and Valley stock.' },
    { label: 'Spokane ↔ Coeur d\'Alene ID pairs', direction: 'outbound', context: 'Short interstate hops; FMCSA required once leaving Washington.' },
    { label: 'California / Colorado → Spokane lifestyle markets', direction: 'inbound', context: 'Interstate arrivals into elevation-adjacent Inland Northwest housing.', href: '/resources/routes/california-to-washington' },
    { label: 'South Hill multi-story and Valley growth edges', direction: 'within', context: 'Grades and longer empty miles differ by pocket — survey access early.' },
    { label: 'Spokane → Seattle / coast reverse exits', direction: 'outbound', context: 'I-90 westbound long in-state or interstate; confirm UTC vs FMCSA for the full route.' },
  ],
  clark: [
    { label: 'Within Clark (Vancouver core ↔ Camas / Battle Ground / Salmon Creek)', direction: 'within', context: 'Portland-adjacent WA suburbs — not Seattle spillover product.' },
    { label: 'Portland OR ↔ Vancouver WA cross-border pairs', direction: 'outbound', context: 'Bridge crossings flip authority to interstate FMCSA even for short map miles.' },
    { label: 'California / Midwest → Clark County housing', direction: 'inbound', context: 'I-5 northbound inflows into Vancouver multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Clark ↔ Cowlitz / Thurston regional pairs', direction: 'within', context: 'I-5 south-Sound to southwest WA logistics; empty miles matter.' },
    { label: 'Camas / east-county HOA growth', direction: 'within', context: 'Gate lists and school-season Saturdays; book peak weekends early.' },
    { label: 'Clark → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Oregon destinations).' },
  ],
  thurston: [
    { label: 'Within Thurston (Olympia / Capitol ↔ Lacey / Tumwater)', direction: 'within', context: 'Capital multi-unit and south-Sound suburbs — not Seattle or Tacoma clones.' },
    { label: 'State government / session-related inflows', direction: 'inbound', context: 'Mid-week hard dates near Capitol corridors; elevator and curb rules apply.' },
    { label: 'Thurston ↔ Pierce / King pairs', direction: 'within', context: 'I-5 south-Sound logistics; price portal time honestly.' },
    { label: 'California / Midwest → Olympia south-Sound housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Lacey–Tumwater growth multi-family', direction: 'within', context: 'Lease waves and HOA rules; mid-week starts beat peaks.' },
    { label: 'Thurston → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  kitsap: [
    { label: 'Within Kitsap (Bremerton ↔ Silverdale / Poulsbo / Port Orchard)', direction: 'within', context: 'Peninsula access and ferry windows — not King Eastside freeways as default.' },
    { label: 'Naval / peninsula workforce inflows', direction: 'inbound', context: 'Base-adjacent calendars and multi-unit stock near Bremerton corridors.' },
    { label: 'Kitsap ↔ King (ferry / SR-16) pairs', direction: 'within', context: 'Ferry sailings and bridge approaches rewrite “local” estimates.' },
    { label: 'California / Midwest → Kitsap peninsula housing', direction: 'inbound', context: 'Interstate household goods into hills and multi-unit stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Silverdale / north Kitsap HOA and retail corridors', direction: 'within', context: 'Gate lists and rain staging; photo driveway grades early.' },
    { label: 'Kitsap → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  whatcom: [
    { label: 'Within Whatcom (Bellingham / WWU ↔ Ferndale / Lynden / Blaine edges)', direction: 'within', context: 'Northern I-5 and border adjacency — not Seattle metro product.' },
    { label: 'Student / faculty / northern I-5 inflows', direction: 'inbound', context: 'WWU lease clusters and Canadian-border-adjacent household patterns.' },
    { label: 'Whatcom ↔ Skagit / Snohomish pairs', direction: 'within', context: 'I-5 north logistics; empty miles between towns matter.' },
    { label: 'California / Midwest → Bellingham lifestyle markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Blaine / border-edge and Sudden Valley stock', direction: 'within', context: 'Longer empty miles and HOA rules; survey access early.' },
    { label: 'Whatcom → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Canada-bound logistics checks).' },
  ],
  benton: [
    { label: 'Within Benton (Kennewick ↔ Richland edges / west Richland)', direction: 'within', context: 'Tri-Cities inland product — heat/wind and bridge pairs, not Puget Sound rain logistics.' },
    { label: 'Lab / energy / Tri-Cities workforce inflows', direction: 'inbound', context: 'Hard dates and multi-family lease waves near employment corridors.' },
    { label: 'Benton ↔ Franklin (Pasco) / Yakima pairs', direction: 'within', context: 'River crossings and I-82 logistics; clarify county lines.' },
    { label: 'California / Colorado → Tri-Cities markets', direction: 'inbound', context: 'Interstate household goods into inland housing stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Kennewick multi-unit and west-side growth', direction: 'within', context: 'Elevators mixed with SFH; summer heat pacing matters on open carries.' },
    { label: 'Benton → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Idaho/Oregon lanes).' },
  ],
  yakima: [
    { label: 'Within Yakima (Downtown / West Valley ↔ Selah / Union Gap edges)', direction: 'within', context: 'Central WA ag/regional hub — not a Seattle collar quote.' },
    { label: 'Ag / harvest / regional workforce patterns', direction: 'inbound', context: 'Seasonal demand and outbuildings appear on rural-edge surveys.' },
    { label: 'Yakima ↔ Benton / Kittitas pairs', direction: 'within', context: 'I-82 corridor long locals; empty miles matter.' },
    { label: 'California / Midwest → Yakima regional markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'West Valley HOA and older core mix', direction: 'within', context: 'Access products differ by pocket — survey stairs and driveways carefully.' },
    { label: 'Yakima → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
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
  if (stateSlug === 'south-carolina') return SC_ROUTES[countySlug] ?? [];
  if (stateSlug === 'virginia') return VA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'tennessee') return TN_ROUTES[countySlug] ?? [];
  if (stateSlug === 'pennsylvania') return PA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'illinois') return IL_ROUTES[countySlug] ?? [];
  if (stateSlug === 'ohio') return OH_ROUTES[countySlug] ?? [];
  if (stateSlug === 'colorado') return CO_ROUTES[countySlug] ?? [];
  if (stateSlug === 'washington') return WA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'michigan') return MI_ROUTES[countySlug] ?? [];
  if (stateSlug === 'oregon') return OR_ROUTES[countySlug] ?? [];
  if (stateSlug === 'maryland') return MD_ROUTES[countySlug] ?? [];
  if (stateSlug === 'massachusetts') return MA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'minnesota') return MN_ROUTES[countySlug] ?? [];
  return [];
}

const MD_ROUTES: Record<string, CountyPopularRoute[]> = {
  montgomery: [
    { label: 'Within Montgomery (Bethesda / Silver Spring ↔ Rockville / Germantown)', direction: 'within', context: 'High-rise elevators vs outer I-270 HOA product — portal time dominates.' },
    { label: 'Federal / contractor relo → Bethesda / Rockville corridors', direction: 'inbound', context: 'Hard report dates and building packets reshape calendars.' },
    { label: 'Northern VA / DC ↔ Montgomery metro pairs', direction: 'inbound', context: 'I-495 multi-jurisdiction logistics; clarify MD HHG registration vs FMCSA for cross-state legs.' },
    { label: 'Montgomery ↔ Prince George\'s / Howard pairs', direction: 'within', context: 'Beltway multi-county logistics; keep county lines clear.' },
    { label: 'Florida / Texas / NC ↔ Montgomery reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Montgomery → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  'prince-georges': [
    { label: 'Within Prince George\'s (National Harbor ↔ College Park / Bowie / Upper Marlboro)', direction: 'within', context: 'Waterfront multi-unit vs suburban HOA — not Montgomery northwest product.' },
    { label: 'UMD student & faculty lease cycles → College Park', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate.' },
    { label: 'DC / VA ↔ Prince George\'s east-metro pairs', direction: 'inbound', context: 'I-495/I-95 logistics; FMCSA when any leg leaves Maryland.' },
    { label: 'Prince George\'s ↔ Montgomery / Anne Arundel pairs', direction: 'within', context: 'East-of-DC multi-county logistics; keep destinations clear.' },
    { label: 'Florida / Sun Belt ↔ PG reverse family moves', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Prince George\'s → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  baltimore: [
    { label: 'Within Baltimore County (Towson ↔ Owings Mills / White Marsh / Catonsville)', direction: 'within', context: 'Metro-ring multi-unit and HOA product — not city row-home defaults.' },
    { label: 'Baltimore City ↔ Baltimore County ring pairs', direction: 'within', context: 'I-83/I-695 logistics; city stairs vs county HOA differ at each end.' },
    { label: 'PA / NJ / DE → Baltimore County suburban housing', direction: 'inbound', context: 'I-95 interstate household goods into ring stock.' },
    { label: 'Baltimore County ↔ Howard / Harford pairs', direction: 'within', context: 'I-95 multi-county logistics; keep county lines clear.' },
    { label: 'Florida / NC ↔ Baltimore reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Baltimore County → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  'baltimore-city': [
    { label: 'Within Baltimore City (Harbor East / downtown ↔ Canton / Hampden / NW corridors)', direction: 'within', context: 'Rowhomes and elevators — not county HOA product.' },
    { label: 'Baltimore County ↔ City micro-market pairs', direction: 'within', context: 'I-83/I-95 short hauls with completely different access products at each end.' },
    { label: 'PA / NJ / NY → Baltimore City neighborhood housing', direction: 'inbound', context: 'Interstate household goods into rowhomes and towers.' },
    { label: 'DC ↔ Baltimore City professional corridors', direction: 'inbound', context: 'I-95 interstate household goods; FMCSA required.' },
    { label: 'Florida / Sun Belt ↔ City reverse family moves', direction: 'inbound', context: 'Interstate household goods; narrow-street access contingency.' },
    { label: 'Baltimore City → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  'anne-arundel': [
    { label: 'Within Anne Arundel (Annapolis ↔ Crofton / Odenton / Glen Burnie)', direction: 'within', context: 'Capital historic stock vs DoD-adjacent HOA — not Columbia planned villages.' },
    { label: 'Naval Academy / DoD PCS → west county housing', direction: 'inbound', context: 'Hard report dates and storage-in-transit dominate military calendars.' },
    { label: 'DC / VA ↔ Annapolis capital pairs', direction: 'inbound', context: 'US-50 logistics; clarify MD registration vs FMCSA for cross-state legs.' },
    { label: 'Anne Arundel ↔ Howard / Prince George\'s pairs', direction: 'within', context: 'MD-32 / US-50 multi-county logistics; keep destinations clear.' },
    { label: 'Florida / NC ↔ Annapolis reverse family moves', direction: 'inbound', context: 'Interstate household goods into capital and suburban stock.' },
    { label: 'Anne Arundel → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  howard: [
    { label: 'Within Howard (Columbia villages ↔ Ellicott City / North Laurel)', direction: 'within', context: 'Planned-community HOA vs older stock — not Annapolis capital product.' },
    { label: 'School-driven moves → Columbia villages', direction: 'inbound', context: 'Summer peaks cluster HOA and multi-unit demand.' },
    { label: 'DC / Baltimore ↔ Howard mid-corridor pairs', direction: 'inbound', context: 'US-29 / I-95 portal time is a real billable factor.' },
    { label: 'Howard ↔ Montgomery / Anne Arundel / Baltimore County pairs', direction: 'within', context: 'Mid-corridor multi-county logistics; keep county lines clear.' },
    { label: 'Florida / Sun Belt ↔ Columbia reverse family moves', direction: 'inbound', context: 'Interstate household goods into HOA tracts.' },
    { label: 'Howard → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  frederick: [
    { label: 'Within Frederick (Downtown ↔ Urbana / I-270 growth / north US-15)', direction: 'within', context: 'Historic multi-unit vs growth HOA — not Montgomery core density.' },
    { label: 'DC-commute growth → Urbana / I-270 corridor housing', direction: 'inbound', context: 'Longer empty miles than close-in Montgomery jobs.' },
    { label: 'Frederick ↔ Montgomery (I-270) pairs', direction: 'within', context: 'West-corridor long locals; price portal time honestly.' },
    { label: 'PA / WV ↔ Frederick regional markets', direction: 'inbound', context: 'I-70 / US-15 interstate or border pairs; confirm FMCSA when leaving Maryland.' },
    { label: 'Florida / NC ↔ Frederick reverse family moves', direction: 'inbound', context: 'Interstate household goods into growth suburbs.' },
    { label: 'Frederick → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
  harford: [
    { label: 'Within Harford (Bel Air ↔ Aberdeen / Edgewood / north rural edges)', direction: 'within', context: 'Northeast fringe HOA and APG adjacency — not Towson clone product.' },
    { label: 'APG / military relo → Aberdeen / Bel Air housing', direction: 'inbound', context: 'Hard report dates reshape northeast-fringe calendars.' },
    { label: 'Harford ↔ Baltimore County / City pairs', direction: 'within', context: 'I-95 logistics; fringe suburbs vs metro ring vs city stock differ.' },
    { label: 'PA / DE → Harford fringe housing', direction: 'inbound', context: 'I-95 interstate household goods into suburban stock.' },
    { label: 'Florida / Sun Belt ↔ Harford reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Harford → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Maryland.' },
  ],
};

const OR_ROUTES: Record<string, CountyPopularRoute[]> = {
  multnomah: [
    { label: 'Within Multnomah (Downtown / Pearl ↔ Eastside / Gresham)', direction: 'within', context: 'Hills, elevators, and bridge portal time — not west-metro HOA defaults.' },
    { label: 'Seattle ↔ Portland metro pairs', direction: 'inbound', context: 'I-5 interstate household goods into city multi-unit and eastside stock.' },
    { label: 'California / Bay Area → Portland lifestyle markets', direction: 'inbound', context: 'Interstate arrivals into core condos and neighborhood SFH.', href: '/resources/routes/california-to-oregon' },
    { label: 'Portland ↔ Eugene / Bend / Medford in-state pairs', direction: 'outbound', context: 'I-5 / US-97 long hauls; ODOT certificate for pure Oregon jobs.' },
    { label: 'Multnomah ↔ Washington / Clackamas collar pairs', direction: 'within', context: 'Core vs west-metro vs SE-metro logistics differ — keep county lines clear.' },
    { label: 'Portland → Arizona / Colorado reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of Oregon.' },
  ],
  washington: [
    { label: 'Within Washington County OR (Beaverton ↔ Hillsboro / Tigard–Tualatin)', direction: 'within', context: 'Silicon Forest HOA and multi-family — not Multnomah hills product. Oregon Washington County, not WA state.' },
    { label: 'Tech / semiconductor relo → Hillsboro / Beaverton', direction: 'inbound', context: 'Hard report dates and corporate inventories dominate west-metro calendars.' },
    { label: 'Washington County OR ↔ Multnomah / Clackamas pairs', direction: 'within', context: 'US-26/OR-217 multi-county logistics; clarify west-metro vs core vs SE-metro.' },
    { label: 'Seattle / California → Silicon Forest housing', direction: 'inbound', context: 'Interstate household goods into HOA and multi-unit stock.' },
    { label: 'West metro → Eugene / Bend in-state pairs', direction: 'outbound', context: 'Long Oregon hauls; ODOT for pure in-state jobs.' },
    { label: 'Washington County OR → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  clackamas: [
    { label: 'Within Clackamas (Oregon City ↔ Happy Valley / West Linn / Wilsonville)', direction: 'within', context: 'SE/south metro hills and HOA growth — not Pearl District elevators.' },
    { label: 'Portland overflow → Clackamas suburban growth', direction: 'inbound', context: 'HOA packets and I-205 timing reshape crew hours.' },
    { label: 'Clackamas ↔ Multnomah / Washington County OR pairs', direction: 'within', context: 'I-205 multi-county logistics; keep county lines clear.' },
    { label: 'California / Midwest → SE-metro housing', direction: 'inbound', context: 'Interstate arrivals into HOA and Oregon City stock.' },
    { label: 'Clackamas → Salem / Eugene in-state pairs', direction: 'outbound', context: 'I-5 southbound valley hauls; ODOT for pure Oregon jobs.' },
    { label: 'Clackamas → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  lane: [
    { label: 'Within Lane (Eugene / UO ↔ Springfield / south Eugene suburbs)', direction: 'within', context: 'University multi-unit vs HOA product — not Portland collar defaults.' },
    { label: 'UO student & faculty lease cycles', direction: 'within', context: 'August clusters; elevators and curb limits dominate near campus.' },
    { label: 'Portland ↔ Eugene (I-5) pairs', direction: 'inbound', context: 'Valley long locals; price I-5 portal time honestly.' },
    { label: 'California → Eugene lifestyle & campus markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Eugene ↔ Bend / Medford in-state pairs', direction: 'outbound', context: 'I-5 / mountain-edge logistics; ODOT for pure Oregon jobs.' },
    { label: 'Eugene → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  marion: [
    { label: 'Within Marion (Downtown Salem ↔ South Salem / Keizer / Woodburn)', direction: 'within', context: 'Capital multi-unit vs mid-valley suburbs — not Eugene campus product.' },
    { label: 'State government relo → Salem capital housing', direction: 'inbound', context: 'Hard dates and multi-unit access dominate capitol corridors.' },
    { label: 'Portland ↔ Salem (I-5) pairs', direction: 'inbound', context: 'Looks regional at peak; price portal time honestly.' },
    { label: 'Salem ↔ Eugene / Albany mid-valley pairs', direction: 'within', context: 'I-5 valley logistics; clarify Marion vs Linn/Lane destinations.' },
    { label: 'California / Midwest → Salem capital markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Salem → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  deschutes: [
    { label: 'Within Deschutes (Central Bend ↔ westside hills / Redmond / Sisters edges)', direction: 'within', context: 'High-desert growth and tourism pulses — not Willamette Valley product.' },
    { label: 'Tourism & second-home turns → Bend', direction: 'inbound', context: 'Summer peaks and short windows reshape crew calendars.' },
    { label: 'Portland ↔ Bend (US-26 / US-97) pairs', direction: 'inbound', context: 'Long central Oregon hauls; ODOT for pure in-state jobs.' },
    { label: 'California / Colorado → Bend lifestyle markets', direction: 'inbound', context: 'Interstate household goods into HOA and multi-unit stock.' },
    { label: 'Bend ↔ Eugene / Medford in-state pairs', direction: 'outbound', context: 'Mountain-edge and I-5/US-97 logistics differ at each end.' },
    { label: 'Bend → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  jackson: [
    { label: 'Within Jackson (Medford ↔ Ashland / Central Point / White City)', direction: 'within', context: 'Rogue Valley multi-unit vs hillside tourism stock — not Portland spillover.' },
    { label: 'California ↔ Medford / Ashland southern OR pairs', direction: 'inbound', context: 'I-5 interstate household goods into valley and hillside stock.' },
    { label: 'Portland ↔ Medford (I-5) pairs', direction: 'inbound', context: 'Long southern OR hauls; price empty miles honestly.' },
    { label: 'Medford ↔ Eugene / Bend in-state pairs', direction: 'outbound', context: 'I-5 / US-97 logistics; ODOT for pure Oregon jobs.' },
    { label: 'Tourism peaks → Ashland hillside stock', direction: 'within', context: 'Festival windows reshape curb and access.' },
    { label: 'Medford → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
  linn: [
    { label: 'Within Linn (Albany ↔ Lebanon / Sweet Home edges)', direction: 'within', context: 'Mid-valley regional product — not Eugene campus or Salem capital clones.' },
    { label: 'Portland / Salem ↔ Albany mid-valley pairs', direction: 'inbound', context: 'I-5 valley logistics; price portal time honestly.' },
    { label: 'Albany ↔ Eugene (I-5) pairs', direction: 'within', context: 'Looks local on maps; keep Linn vs Lane destinations clear.' },
    { label: 'California / Midwest → Albany regional markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.' },
    { label: 'Linn ↔ Marion mid-valley pairs', direction: 'within', context: 'I-5 / OR-99E logistics between Albany and Salem markets.' },
    { label: 'Albany → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Oregon.' },
  ],
};

const MI_ROUTES: Record<string, CountyPopularRoute[]> = {
  wayne: [
    { label: 'Within Wayne (Downtown / Midtown ↔ Dearborn / Livonia / Downriver)', direction: 'within', context: 'City elevators and older stock vs west-Wayne and Downriver SFH — portal time dominates.' },
    { label: 'Midwest / Chicago → Detroit metro housing & jobs', direction: 'inbound', context: 'Interstate household goods into city multi-unit and suburban stock.', href: '/resources/routes/illinois-to-michigan' },
    { label: 'Detroit ↔ Grand Rapids / Lansing in-state pairs', direction: 'outbound', context: 'I-96 long hauls across Michigan; MSP CVED for pure in-state jobs.' },
    { label: 'Wayne ↔ Oakland / Macomb collar pairs', direction: 'within', context: 'City vs north-metro vs east-metro logistics differ — keep county lines clear.' },
    { label: 'Sun Belt ↔ Detroit reverse family & auto relo', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs; winter access contingency.' },
    { label: 'Detroit → Ohio / Indiana / Ontario border pairs', direction: 'outbound', context: 'I-75/I-94 interstate or border logistics; confirm FMCSA for out-of-state legs.' },
  ],
  oakland: [
    { label: 'Within Oakland (Troy / Birmingham ↔ Rochester Hills / Farmington Hills)', direction: 'within', context: 'Corporate HOA and village-core curb limits — not Detroit walk-up product.' },
    { label: 'Corporate HQ & supplier relo → Troy / Auburn Hills', direction: 'inbound', context: 'Hard report dates and executive inventories dominate north-metro calendars.' },
    { label: 'Oakland ↔ Wayne / Macomb metro pairs', direction: 'within', context: 'I-75/I-696 multi-county logistics; clarify north-metro vs city vs east-metro.' },
    { label: 'California / Texas → Oakland County executive housing', direction: 'inbound', context: 'Interstate household goods into HOA and village multi-unit stock.' },
    { label: 'Oakland → Grand Rapids / out-of-state career exits', direction: 'outbound', context: 'I-96 westbound or interstate; confirm Michigan authority vs FMCSA for the full route.' },
    { label: 'Chicago ↔ Oakland north-metro professional corridors', direction: 'inbound', context: 'I-94 interstate household goods into Troy/Birmingham product.' },
  ],
  macomb: [
    { label: 'Within Macomb (Warren ↔ Sterling Heights / Clinton Twp / northern townships)', direction: 'within', context: 'Industrial-suburban mix and multi-family lease waves — not Birmingham village defaults.' },
    { label: 'Manufacturing / defense workforce → Warren / Sterling Heights', direction: 'inbound', context: 'Shift-change windows and plant-adjacent traffic reshape crew timing.' },
    { label: 'Macomb ↔ Wayne / Oakland metro pairs', direction: 'within', context: 'I-94/M-59 east-metro logistics; keep county lines clear on estimates.' },
    { label: 'Midwest → Macomb east-metro housing', direction: 'inbound', context: 'Interstate arrivals into SFH and multi-family stock.' },
    { label: 'Macomb → Genesee / Bay region pairs', direction: 'outbound', context: 'I-75 northbound regional hauls; Michigan authority for pure in-state jobs.' },
    { label: 'Macomb → Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of Michigan.' },
  ],
  kent: [
    { label: 'Within Kent (Downtown GR / Heritage Hill ↔ Wyoming / Kentwood / Cascade)', direction: 'within', context: 'Core elevators and stairs vs south-belt multi-family — not SE Michigan defaults.' },
    { label: 'Chicago / Midwest → Grand Rapids west-MI jobs & housing', direction: 'inbound', context: 'Interstate household goods into core multi-unit and suburban stock.' },
    { label: 'Grand Rapids ↔ Detroit metro in-state pairs', direction: 'outbound', context: 'I-96 long hauls; MSP CVED for pure Michigan jobs.' },
    { label: 'Kent ↔ Ottawa lakeshore collar pairs', direction: 'within', context: 'GR core vs Holland/Jenison lakeshore logistics — not clones.' },
    { label: 'West Michigan furniture / healthcare relo corridors', direction: 'inbound', context: 'Hard report dates and manufacturing calendars reshape windows.' },
    { label: 'Grand Rapids → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan; volume surveys recommended.' },
  ],
  washtenaw: [
    { label: 'Within Washtenaw (Central Ann Arbor / campus ↔ Pittsfield / Ypsilanti / Saline)', direction: 'within', context: 'University multi-unit vs township HOA — not Detroit neighborhood product.' },
    { label: 'U-M / tech / medical inflows → Ann Arbor constrained housing', direction: 'inbound', context: 'Academic peaks and research hard dates dominate calendars.' },
    { label: 'Ann Arbor ↔ Detroit metro (I-94) pairs', direction: 'within', context: 'Looks local on maps; I-94 peak portal time is a real billable factor.' },
    { label: 'California / East Coast → Ann Arbor tech & research markets', direction: 'inbound', context: 'Interstate household goods into campus multi-unit and township stock.' },
    { label: 'Washtenaw ↔ Lansing / Jackson regional pairs', direction: 'outbound', context: 'I-94 / US-23 mid-Michigan logistics; Michigan authority for pure in-state jobs.' },
    { label: 'Ann Arbor → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
  genesee: [
    { label: 'Within Genesee (Flint core ↔ Grand Blanc / Fenton / Davison)', direction: 'within', context: 'Older multi-unit vs southern suburban product — not Detroit collar clones.' },
    { label: 'In-state MI → Flint regional jobs & housing', direction: 'inbound', context: 'Recovery and workforce relo into multi-unit and suburban stock.' },
    { label: 'Flint ↔ Detroit metro (I-75) pairs', direction: 'outbound', context: 'I-75 long locals; price portal time honestly.' },
    { label: 'Genesee ↔ Saginaw / Lansing regional pairs', direction: 'within', context: 'I-75/I-69 mid-Michigan logistics; keep county lines clear.' },
    { label: 'Midwest → Genesee manufacturing & healthcare corridors', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Genesee → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
  ottawa: [
    { label: 'Within Ottawa (Holland / Zeeland ↔ Grand Haven / Jenison–Hudsonville)', direction: 'within', context: 'Lakeshore staging vs GR-collar HOA — not downtown Grand Rapids elevators.' },
    { label: 'Tourism & lakeshore seasonal turns → Holland / Grand Haven', direction: 'inbound', context: 'Summer weekends and festival windows reshape shore access.' },
    { label: 'Ottawa ↔ Kent (Grand Rapids) pairs', direction: 'within', context: 'US-31/I-196 west-MI logistics; clarify Ottawa vs Kent destinations.' },
    { label: 'Chicago / Midwest → Holland lakeshore housing', direction: 'inbound', context: 'Interstate household goods into shore and growth-suburb stock.' },
    { label: 'Ottawa → Detroit metro in-state pairs', direction: 'outbound', context: 'I-96 eastbound; MSP CVED for pure Michigan jobs.' },
    { label: 'Ottawa → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
  ingham: [
    { label: 'Within Ingham (Downtown Lansing ↔ East Lansing / MSU ↔ Okemos–Haslett)', direction: 'within', context: 'Capital elevators and campus multi-unit vs east-suburb HOA — not Ann Arbor clones.' },
    { label: 'State government & MSU inflows → Lansing / East Lansing', direction: 'inbound', context: 'Session timing and academic peaks cluster demand.' },
    { label: 'Lansing ↔ Detroit / Grand Rapids in-state pairs', direction: 'outbound', context: 'I-96 long hauls; Michigan authority for pure in-state jobs.' },
    { label: 'Ingham ↔ Washtenaw / Genesee regional pairs', direction: 'within', context: 'I-96/I-69 mid-Michigan logistics; clarify capital vs university markets.' },
    { label: 'Midwest → Lansing capital & campus housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Lansing → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
  kalamazoo: [
    { label: 'Within Kalamazoo (Downtown / Vine ↔ WMU multi-unit ↔ Portage)', direction: 'within', context: 'Near-core stairs and campus waves vs Portage HOA — not GR or Detroit defaults.' },
    { label: 'WMU / healthcare / manufacturing relo → Kalamazoo metro', direction: 'inbound', context: 'Academic peaks and hard report dates reshape windows.' },
    { label: 'Kalamazoo ↔ Grand Rapids / Detroit in-state pairs', direction: 'outbound', context: 'US-131 / I-94 logistics; MSP CVED for pure Michigan jobs.' },
    { label: 'Chicago ↔ Kalamazoo (I-94) pairs', direction: 'inbound', context: 'Interstate household goods into campus multi-unit and suburban stock.' },
    { label: 'Kalamazoo ↔ Holland / Battle Creek regional pairs', direction: 'within', context: 'Southwest Michigan regional hauls; keep county lines clear.' },
    { label: 'Kalamazoo → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
  saginaw: [
    { label: 'Within Saginaw (City core ↔ Saginaw Twp / Freeland / Bridgeport edges)', direction: 'within', context: 'Older multi-unit vs township SFH — not Detroit collar product.' },
    { label: 'Bay-region jobs & healthcare → Saginaw housing', direction: 'inbound', context: 'Regional relo into multi-unit and township stock.' },
    { label: 'Saginaw ↔ Flint / Bay City / Midland pairs', direction: 'within', context: 'I-75/I-675 Great Lakes bay logistics; price empty miles honestly.' },
    { label: 'Saginaw ↔ Detroit metro (I-75) pairs', direction: 'outbound', context: 'Long I-75 locals; Michigan authority for pure in-state jobs.' },
    { label: 'Midwest → Saginaw bay regional markets', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Saginaw → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Michigan.' },
  ],
};


const MA_ROUTES: Record<string, CountyPopularRoute[]> = {
  middlesex: [
    { label: 'Within Middlesex (Cambridge / Somerville ↔ Lexington / Concord / Waltham)', direction: 'within', context: 'Dense walk-ups vs western-suburb SFH — access products differ; portal time on Route 2 / I-95 dominates.' },
    { label: 'NY / NJ / CT → Cambridge / Route 128 tech & university housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock; FMCSA required.' },
    { label: 'Middlesex ↔ Suffolk (Boston) metro pairs', direction: 'within', context: 'Looks local on maps; I-93 / Storrow / Red Line–adjacent curb rules rewrite labor.' },
    { label: 'Middlesex → Worcester / western MA in-state pairs', direction: 'outbound', context: 'I-90 / Route 9 long hauls; Massachusetts DPU for pure in-state jobs.' },
    { label: 'Middlesex → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Snowbird and permanent relocations; FMCSA for cross-state legs.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'NH Seacoast / Hillsborough → Middlesex professional corridors', direction: 'inbound', context: 'Regional interstate or cross-border pairs; confirm DPU vs FMCSA for the full route.' },
  ],
  worcester: [
    { label: 'Within Worcester (city three-deckers ↔ Shrewsbury / Westborough / Leominster)', direction: 'within', context: 'Central MA hub product — not a Boston-west suburb clone; empty miles matter.' },
    { label: 'Boston metro → Worcester in-state career & housing pairs', direction: 'inbound', context: 'I-90 / I-290 long locals; Massachusetts DPU for pure in-state jobs.' },
    { label: 'Worcester ↔ Springfield / Pioneer Valley pairs', direction: 'within', context: 'I-90 / Route 9 cross-state-of-MA logistics; keep county lines clear.' },
    { label: 'NY / NJ / CT → Worcester regional markets', direction: 'inbound', context: 'Interstate household goods into city multi-unit and east-suburban stock.' },
    { label: 'Worcester → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of Massachusetts.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Worcester → RI / NH border pairs', direction: 'outbound', context: 'Short border hops can still require FMCSA — clarify destinations early.' },
  ],
  essex: [
    { label: 'Within Essex (Lynn / Salem / Gloucester ↔ Andover / Lawrence / Haverhill)', direction: 'within', context: 'North Shore coastal vs inland mill-city product — not interchangeable quotes.' },
    { label: 'Boston / Suffolk → North Shore housing', direction: 'inbound', context: 'I-95 / Route 1 / Route 128 collar logistics; portal time dominates at peak.' },
    { label: 'NY / NJ → Essex County coastal & inland markets', direction: 'inbound', context: 'Interstate household goods into historic cores and waterfront stock.' },
    { label: 'Essex → NH Seacoast pairs', direction: 'outbound', context: 'Clarify Massachusetts DPU vs FMCSA when any leg leaves Massachusetts.' },
    { label: 'Essex → Florida snowbird corridors', direction: 'outbound', context: 'Seasonal long-distance; FMCSA carriers and volume surveys recommended.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Essex ↔ Middlesex metro pairs', direction: 'within', context: 'North-metro multi-county logistics; keep county lines clear on estimates.' },
  ],
  suffolk: [
    { label: 'Within Suffolk (Back Bay / downtown ↔ South End / JP / East Boston / Dorchester)', direction: 'within', context: 'Elevator towers vs brownstone/triple-decker product — neighborhood micro-markets rewrite labor.' },
    { label: 'NY / NJ / CT → Boston professional & university housing', direction: 'inbound', context: 'Interstate household goods into elevators and constrained curb; FMCSA required.' },
    { label: 'Suffolk ↔ Middlesex / Norfolk / Essex metro pairs', direction: 'within', context: 'Greater Boston multi-county pairs; I-90 / I-93 / Storrow portal time is billable.' },
    { label: 'Boston → Worcester / Springfield in-state long hauls', direction: 'outbound', context: 'I-90 cross-state-of-MA career moves; Massachusetts DPU for pure in-state jobs.' },
    { label: 'Boston → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Snowbird and permanent relocations; FMCSA for cross-state legs.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Florida → Boston reverse family & professional returns', direction: 'inbound', context: 'Interstate household goods into dense urban stock; elevators and permits first.' },
  ],
  norfolk: [
    { label: 'Within Norfolk (Quincy / Brookline-adjacent ↔ Needham / Westwood / Sharon)', direction: 'within', context: 'South-metro multi-unit vs HOA driveway SFH — not a single access product.' },
    { label: 'Boston / Suffolk → Norfolk south-metro housing', direction: 'inbound', context: 'I-93 / Route 3 / Route 28 collar logistics; portal time dominates at peak.' },
    { label: 'NY / NJ → Norfolk County suburbs', direction: 'inbound', context: 'Interstate household goods into multifamily and SFH stock.' },
    { label: 'Norfolk ↔ Plymouth / Bristol south-shore pairs', direction: 'within', context: 'South-of-Boston multi-county logistics; keep county lines clear.' },
    { label: 'Norfolk → Florida snowbird corridors', direction: 'outbound', context: 'Interstate household goods; FMCSA required out of Massachusetts.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Norfolk → Rhode Island border pairs', direction: 'outbound', context: 'Short hops can still require FMCSA — clarify destinations early.' },
  ],
  bristol: [
    { label: 'Within Bristol (New Bedford / Fall River ↔ Taunton / Attleboro)', direction: 'within', context: 'South Coast triple-decker and hill-street product — not Boston collar defaults.' },
    { label: 'Providence / RI → Bristol County South Coast housing', direction: 'inbound', context: 'Cross-border pairs need FMCSA even when map miles look local.' },
    { label: 'Boston metro → Fall River / New Bedford in-state pairs', direction: 'inbound', context: 'Route 24 / I-195 long locals; Massachusetts DPU for pure in-state jobs.' },
    { label: 'Bristol ↔ Plymouth / Norfolk pairs', direction: 'within', context: 'Southeastern MA multi-county logistics; price empty miles honestly.' },
    { label: 'Bristol → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'NY / NJ / CT → South Coast markets', direction: 'inbound', context: 'Interstate arrivals into mill-city multi-unit and Attleboro growth stock.' },
  ],
  plymouth: [
    { label: 'Within Plymouth (Hingham / Duxbury ↔ Brockton / Plymouth town)', direction: 'within', context: 'Coastal narrow streets and historic cores vs inland triple-decker product.' },
    { label: 'Boston / Suffolk → South Shore housing', direction: 'inbound', context: 'Route 3 collar logistics; summer coastal traffic rewrites portal time.' },
    { label: 'Plymouth ↔ Barnstable Cape-bound pairs', direction: 'within', context: 'Stage through South Shore toward Cape Cod; bridge and Route 6 peaks matter.' },
    { label: 'NY / NJ → Plymouth County suburbs & coastal towns', direction: 'inbound', context: 'Interstate household goods into South Shore SFH and multi-unit stock.' },
    { label: 'Plymouth → Florida snowbird corridors', direction: 'outbound', context: 'Seasonal long-distance; FMCSA carriers recommended.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Plymouth ↔ Norfolk / Bristol south-metro pairs', direction: 'within', context: 'Southeastern multi-county logistics; keep county lines clear on estimates.' },
  ],
  hampden: [
    { label: 'Within Hampden (Springfield ↔ Holyoke / Chicopee / Longmeadow)', direction: 'within', context: 'Pioneer Valley urban three-deckers and mill stock — not Boston-metro product.' },
    { label: 'Hartford / CT → Springfield metro pairs', direction: 'inbound', context: 'I-91 border hops often need FMCSA; clarify MA DPU vs interstate early.' },
    { label: 'Boston / Worcester → Springfield in-state long hauls', direction: 'inbound', context: 'I-90 / I-91 cross-state-of-MA career moves; Massachusetts DPU for pure in-state jobs.' },
    { label: 'Hampden ↔ Hampshire Pioneer Valley pairs', direction: 'within', context: 'Springfield urban vs Northampton/Amherst college-town logistics differ.' },
    { label: 'Hampden → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'NY / NJ → Pioneer Valley housing & jobs', direction: 'inbound', context: 'Interstate arrivals into city multi-unit and suburban stock.' },
  ],
  barnstable: [
    { label: 'Within Barnstable (Mid-Cape / Hyannis ↔ Outer Cape / Provincetown–Truro)', direction: 'within', context: 'Bridge access, Route 6 / Route 28 peaks, and Outer Cape small-truck needs rewrite local hours.' },
    { label: 'Boston / South Shore → Cape Cod seasonal & year-round housing', direction: 'inbound', context: 'Route 3 → bridges → Route 6 logistics; summer weekends are a real billable factor.' },
    { label: 'NY / NJ / CT → Cape Cod second-home & retirement corridors', direction: 'inbound', context: 'Interstate household goods into coastal stock; FMCSA required.' },
    { label: 'Barnstable → Florida snowbird reverse lanes', direction: 'outbound', context: 'Seasonal long-distance; book carriers early for winter exits.', href: '/resources/routes/massachusetts-to-florida' },
    { label: 'Barnstable ↔ Plymouth staging pairs', direction: 'within', context: 'Common Cape approach logistics; price bridge timing honestly.' },
    { label: 'Off-season Cape → Boston reverse professional returns', direction: 'outbound', context: 'Shoulder-season windows clear bridge approaches faster than July–August peaks.' },
  ],
  hampshire: [
    { label: 'Within Hampshire (Northampton ↔ Amherst / Hadley / Five College belt)', direction: 'within', context: 'College-town curb limits and academic lease waves — not Springfield three-decker defaults alone.' },
    { label: 'UMass / Five College inflows → Amherst / Northampton housing', direction: 'inbound', context: 'Semester peaks cluster multi-unit demand; book elevators and curb early.' },
    { label: 'Hampshire ↔ Hampden (Springfield) Pioneer Valley pairs', direction: 'within', context: 'I-91 valley logistics; urban vs college-town access products differ.' },
    { label: 'Boston / Worcester → Pioneer Valley academic markets', direction: 'inbound', context: 'In-state long hauls; Massachusetts DPU for pure in-state jobs.' },
    { label: 'CT → Hampshire valley pairs', direction: 'inbound', context: 'Border and regional interstate legs need FMCSA when leaving Connecticut.' },
    { label: 'Hampshire → Florida / out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required once leaving Massachusetts.', href: '/resources/routes/massachusetts-to-florida' },
  ],
};


const MN_ROUTES: Record<string, CountyPopularRoute[]> = {
  hennepin: [
    { label: 'Within Hennepin (Downtown / Uptown ↔ Edina / Minnetonka / Bloomington)', direction: 'within', context: 'Elevator towers and lakeside walk-ups vs west-metro HOA product — portal time on I-394 / I-494 dominates.' },
    { label: 'Chicago / Midwest → Minneapolis professional & corporate housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and west-metro stock.' },
    { label: 'Hennepin ↔ Ramsey (St. Paul) metro pairs', direction: 'within', context: 'Looks local on maps; I-94 freeflow and east- vs west-river access products differ.' },
    { label: 'Minneapolis → Rochester / Duluth / St. Cloud in-state pairs', direction: 'outbound', context: 'US-52 / I-35 / I-94 long hauls; MnDOT HHG for pure in-state jobs.' },
    { label: 'Hennepin → Florida / Arizona / Texas reverse exits', direction: 'outbound', context: 'Snowbird and permanent relocations; FMCSA for cross-state legs.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Wisconsin → Minneapolis career & family corridors', direction: 'inbound', context: 'Regional interstate pairs; confirm MnDOT vs FMCSA for the full route.' },
  ],
  ramsey: [
    { label: 'Within Ramsey (Downtown St. Paul ↔ Highland / Roseville / Maplewood)', direction: 'within', context: 'Capital multi-unit vs north and east suburban product — not Minneapolis lakeside defaults.' },
    { label: 'Midwest → St. Paul capital & east-metro housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Ramsey ↔ Hennepin metro pairs', direction: 'within', context: 'I-94 / I-35E multi-county logistics; keep county lines clear.' },
    { label: 'St. Paul → Woodbury / Washington County, MN east pairs', direction: 'within', context: 'East-metro collar logistics; I-94 / MN-36 freeflow matters.' },
    { label: 'Ramsey → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Wisconsin border → east-metro housing', direction: 'inbound', context: 'Short regional interstate pairs; confirm FMCSA when leaving Wisconsin.' },
  ],
  dakota: [
    { label: 'Within Dakota (Eagan / Burnsville ↔ Apple Valley / Lakeville)', direction: 'within', context: 'South-metro HOA multi-family vs southern growth SFH — empty miles matter.' },
    { label: 'Minneapolis / St. Paul → Dakota south-metro housing', direction: 'inbound', context: 'I-35 / I-494 collar logistics; portal time dominates at peak.' },
    { label: 'Dakota ↔ Scott / Hennepin south-metro pairs', direction: 'within', context: 'Multi-county south collar logistics; keep county lines clear.' },
    { label: 'Midwest → Eagan / Lakeville family corridors', direction: 'inbound', context: 'Interstate household goods into townhomes and growth SFH.' },
    { label: 'Dakota → Florida / Arizona reverse exits', direction: 'outbound', context: 'Snowbird and permanent relocations; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Dakota → Rochester / southeast MN in-state pairs', direction: 'outbound', context: 'US-52 long locals; MnDOT HHG for pure in-state jobs.' },
  ],
  anoka: [
    { label: 'Within Anoka (Blaine / Coon Rapids ↔ Andover / Anoka city)', direction: 'within', context: 'North-metro growth multi-family vs river-town product — not south-metro clones.' },
    { label: 'Minneapolis / St. Paul → Anoka north-metro housing', direction: 'inbound', context: 'I-35W / US-10 collar logistics; portal time dominates at peak.' },
    { label: 'Anoka ↔ Hennepin / Ramsey north pairs', direction: 'within', context: 'Multi-county north-metro logistics; keep county lines clear.' },
    { label: 'Midwest → Blaine / Andover family corridors', direction: 'inbound', context: 'Interstate household goods into growth SFH and townhomes.' },
    { label: 'Anoka → St. Cloud / central MN in-state pairs', direction: 'outbound', context: 'US-10 / I-94 long locals; MnDOT HHG for pure in-state jobs.' },
    { label: 'Anoka → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
  ],
  washington: [
    { label: 'Within Washington County, MN (Woodbury ↔ Stillwater / Cottage Grove)', direction: 'within', context: 'East-metro HOA multi-family vs historic river-town product — Minnesota only, not Washington State.' },
    { label: 'St. Paul / Ramsey → Woodbury east-metro housing', direction: 'inbound', context: 'I-94 / MN-36 collar logistics; portal time dominates at peak.' },
    { label: 'Washington County, MN ↔ Wisconsin St. Croix pairs', direction: 'outbound', context: 'Short border hops often need FMCSA — clarify destinations early.' },
    { label: 'Midwest → Woodbury / Stillwater housing', direction: 'inbound', context: 'Interstate household goods into multi-family and historic stock.' },
    { label: 'Washington County, MN → Florida reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Washington County, MN ↔ Dakota / Ramsey east pairs', direction: 'within', context: 'East-metro multi-county logistics; keep Minnesota county lines clear.' },
  ],
  olmsted: [
    { label: 'Within Olmsted (Downtown Rochester ↔ northwest growth / Byron)', direction: 'within', context: 'Mayo-adjacent elevators vs suburban SFH — not a Twin Cities collar quote.' },
    { label: 'Twin Cities → Rochester Mayo medical relo', direction: 'inbound', context: 'US-52 long in-state hauls; hard report dates and storage-in-transit common; MnDOT HHG for pure in-state jobs.' },
    { label: 'Out-of-state medical inflows → Rochester professional housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and growth stock; FMCSA required.' },
    { label: 'Rochester → Twin Cities reverse career pairs', direction: 'outbound', context: 'US-52 long hauls; confirm MnDOT vs FMCSA for the full route.' },
    { label: 'Olmsted → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Iowa / Wisconsin → Rochester medical markets', direction: 'inbound', context: 'Regional interstate pairs into healthcare housing; FMCSA for cross-state legs.' },
  ],
  'st-louis': [
    { label: 'Within St. Louis County, MN (Downtown Duluth ↔ Hermantown / hillside stock)', direction: 'within', context: 'Hill grades and waterfront multi-unit — not Twin Cities product and not St. Louis, Missouri.' },
    { label: 'Twin Cities → Duluth / North Shore in-state pairs', direction: 'inbound', context: 'I-35 long hauls; MnDOT HHG for pure in-state jobs; winter contingency matters.' },
    { label: 'Duluth ↔ Superior, WI border pairs', direction: 'outbound', context: 'Short bridge hops often need FMCSA — clarify destinations early.' },
    { label: 'Midwest → Duluth port-city & healthcare housing', direction: 'inbound', context: 'Interstate household goods into hillside and multi-unit stock.' },
    { label: 'North Shore seasonal / second-home turns along MN-61', direction: 'within', context: 'Cabin access and tourism peaks rewrite local hours.' },
    { label: 'St. Louis County, MN → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
  ],
  stearns: [
    { label: 'Within Stearns (Downtown / campus St. Cloud ↔ Sartell / Sauk Rapids)', direction: 'within', context: 'College multi-unit vs growth HOA product — not a Twin Cities collar hop.' },
    { label: 'Twin Cities → St. Cloud regional housing & jobs', direction: 'inbound', context: 'I-94 long in-state hauls; MnDOT HHG for pure in-state jobs.' },
    { label: 'St. Cloud State semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Stearns → Twin Cities reverse career pairs', direction: 'outbound', context: 'I-94 long hauls; confirm MnDOT vs FMCSA for the full route.' },
    { label: 'Stearns → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.', href: '/resources/routes/minnesota-to-florida' },
    { label: 'Central MN / Fargo corridor pairs via I-94', direction: 'outbound', context: 'Regional hauls; FMCSA required once leaving Minnesota.' },
  ],
};

const OH_ROUTES: Record<string, CountyPopularRoute[]> = {
  franklin: [
    { label: 'Within Franklin (Downtown / Short North ↔ Dublin / Grove City)', direction: 'within', context: 'Elevator COIs and brick streets vs I-270 belt HOA product — portal time dominates.' },
    { label: 'Midwest → Columbus capital, campus & logistics markets', direction: 'inbound', context: 'Interstate household goods into core multi-unit and suburban stock.' },
    { label: 'Columbus ↔ Cleveland / Cincinnati in-state pairs', direction: 'outbound', context: 'I-71 long hauls between Ohio Big 3 metros.' },
    { label: 'Franklin ↔ Delaware / Licking / Fairfield edges', direction: 'within', context: 'Capital-region collar logistics; keep county lines clear.' },
    { label: 'Florida / South ↔ Columbus reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Northeast → Columbus professional corridors', direction: 'inbound', context: 'Corporate and healthcare inflows into Short North and belt multi-family.' },
  ],
  cuyahoga: [
    { label: 'Within Cuyahoga (Downtown ↔ West Side / Heights / Westshore)', direction: 'within', context: 'Neighborhood micro-markets and lake-effect winter risk — not Columbus belt patterns.' },
    { label: 'Pittsburgh ↔ Cleveland NE Ohio pairs', direction: 'inbound', context: 'I-80/I-76 interstate household goods into city and suburban stock.' },
    { label: 'Cleveland ↔ Columbus / Cincinnati in-state pairs', direction: 'outbound', context: 'I-71 long hauls between Ohio metros.' },
    { label: 'Cuyahoga ↔ Lorain / Lake / Summit collar pairs', direction: 'within', context: 'City vs west-shore vs east-shore vs Akron-adjacent logistics differ.' },
    { label: 'Midwest → Cleveland healthcare & manufacturing corridors', direction: 'inbound', context: 'Interstate arrivals into multi-unit and Heights product.' },
    { label: 'Florida ↔ Cleveland reverse family moves', direction: 'inbound', context: 'Interstate household goods; winter access contingency on hillside addresses.' },
  ],
  hamilton: [
    { label: 'Within Hamilton (Downtown / Over-the-Rhine ↔ Hyde Park / West Side)', direction: 'within', context: 'Hills, stairs, and river-city curb limits — not collar HOA defaults.' },
    { label: 'Kentucky ↔ Cincinnati river-city pairs', direction: 'inbound', context: 'Clarify Ohio PUCO vs FMCSA for KY destinations; empty miles across the river.' },
    { label: 'Cincinnati ↔ Columbus / Cleveland in-state pairs', direction: 'outbound', context: 'I-71 long hauls between Ohio Big 3 metros.' },
    { label: 'Hamilton ↔ Butler / Warren collar pairs', direction: 'within', context: 'Urban hills vs west/north growth collars — not clones.' },
    { label: 'Midwest → Cincinnati professional & logistics corridors', direction: 'inbound', context: 'Interstate household goods into neighborhood and multi-unit stock.' },
    { label: 'Florida / South ↔ Cincinnati reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  summit: [
    { label: 'Within Summit (Akron core ↔ Cuyahoga Falls / Fairlawn)', direction: 'within', context: 'Akron regional fabric — not a Cleveland neighborhood clone.' },
    { label: 'Summit ↔ Cuyahoga / Stark NE Ohio pairs', direction: 'within', context: 'Akron–Cleveland and Akron–Canton logistics; keep county lines clear.' },
    { label: 'Pittsburgh ↔ Akron regional pairs', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Midwest → Akron manufacturing & healthcare corridors', direction: 'inbound', context: 'Employment inflows into city and suburban product.' },
    { label: 'Akron ↔ Columbus in-state pairs', direction: 'outbound', context: 'I-71/I-76 long hauls longer than a suburb hop.' },
    { label: 'Florida ↔ NE Ohio reverse family moves via I-71/I-76', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  montgomery: [
    { label: 'Within Montgomery (Dayton core ↔ Kettering / Beavercreek edges)', direction: 'within', context: 'Dayton regional hub — Wright-Patt adjacency shapes demand.' },
    { label: 'Montgomery ↔ Greene / Clark regional pairs', direction: 'within', context: 'Dayton metro logistics; keep county lines clear.' },
    { label: 'Midwest → Dayton / Wright-Patt employment markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Dayton ↔ Cincinnati / Columbus in-state pairs', direction: 'outbound', context: 'I-75/I-70 long hauls between OH hubs.' },
    { label: 'Florida / South ↔ Dayton reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Northeast → Dayton professional corridors', direction: 'inbound', context: 'Corporate and defense-adjacent inflows into suburban multi-family.' },
  ],
  lucas: [
    { label: 'Within Lucas (Toledo core ↔ suburbs / Maumee edges)', direction: 'within', context: 'Lake-plain logistics and MI border adjacency — not Columbus belt patterns.' },
    { label: 'Michigan ↔ Toledo border pairs', direction: 'inbound', context: 'Clarify Ohio PUCO vs FMCSA for MI destinations.' },
    { label: 'Toledo ↔ Cleveland / Columbus / Detroit-region pairs', direction: 'outbound', context: 'I-75/I-80 long hauls and interstate legs as applicable.' },
    { label: 'Midwest → Toledo logistics & manufacturing corridors', direction: 'inbound', context: 'Interstate household goods into city multi-unit and suburban stock.' },
    { label: 'Florida ↔ Toledo reverse family moves via I-75', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Lucas ↔ Wood / Ottawa edges', direction: 'within', context: 'NW Ohio regional pairs; keep county lines clear.' },
  ],
  butler: [
    { label: 'Within Butler (Hamilton city ↔ West Chester / Fairfield growth)', direction: 'within', context: 'Collar growth and Hamilton city stock — not Cincinnati urban hills defaults.' },
    { label: 'Butler ↔ Hamilton County Cincinnati pairs', direction: 'within', context: 'West/north collar logistics; empty miles into the city core.' },
    { label: 'Butler ↔ Warren NE Cincinnati collar pairs', direction: 'within', context: 'Different collar fabrics west vs northeast of Cincinnati.' },
    { label: 'Kentucky / Midwest → Butler County growth housing', direction: 'inbound', context: 'Interstate or regional arrivals into HOA multi-family product.' },
    { label: 'Cincinnati metro ↔ Columbus in-state long hauls via I-71', direction: 'outbound', context: 'Collar-origin interstate-adjacent in-state career moves.' },
    { label: 'Florida / South ↔ SW Ohio reverse family moves', direction: 'inbound', context: 'Interstate household goods into Butler growth corridors.' },
  ],
  stark: [
    { label: 'Within Stark (Canton core ↔ Jackson Township / North Canton)', direction: 'within', context: 'Canton regional fabric — not Akron or Cleveland clones.' },
    { label: 'Stark ↔ Summit / Mahoning NE Ohio pairs', direction: 'within', context: 'Canton–Akron and Canton–Youngstown logistics; keep county lines clear.' },
    { label: 'Pittsburgh ↔ Canton regional pairs', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Midwest → Canton manufacturing & healthcare corridors', direction: 'inbound', context: 'Employment inflows into city and township product.' },
    { label: 'Canton ↔ Cleveland / Columbus in-state pairs', direction: 'outbound', context: 'I-77 long hauls longer than a suburb hop.' },
    { label: 'Florida ↔ NE Ohio reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  lorain: [
    { label: 'Within Lorain (Elyria / Lorain city ↔ Avon / Amherst edges)', direction: 'within', context: 'West-of-Cleveland lake shore and inland mix — not Cuyahoga neighborhood defaults.' },
    { label: 'Lorain ↔ Cuyahoga Cleveland pairs', direction: 'within', context: 'West collar logistics; I-90 portal time dominates at peak.' },
    { label: 'Lorain ↔ Lake / Medina edges', direction: 'within', context: 'Different shore and inland collar fabrics around Cleveland.' },
    { label: 'Midwest → Lorain County industrial & suburban housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and HOA product.' },
    { label: 'Pittsburgh ↔ Lorain / west-Cleveland pairs', direction: 'inbound', context: 'Interstate household goods into lake-plain stock.' },
    { label: 'Florida ↔ NE Ohio reverse family moves via I-90', direction: 'inbound', context: 'Interstate household goods; lake-effect winter contingency.' },
  ],
  mahoning: [
    { label: 'Within Mahoning (Youngstown core ↔ Boardman / Austintown)', direction: 'within', context: 'Youngstown regional fabric — not Cleveland or Akron clones.' },
    { label: 'Mahoning ↔ Trumbull / Columbiana edges', direction: 'within', context: 'Mahoning Valley logistics; keep county lines clear.' },
    { label: 'Pittsburgh ↔ Youngstown regional pairs', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Youngstown ↔ Cleveland / Akron in-state pairs', direction: 'outbound', context: 'I-80/I-76 long hauls longer than a suburb hop.' },
    { label: 'Midwest → Youngstown manufacturing corridors', direction: 'inbound', context: 'Employment inflows into city and township product.' },
    { label: 'Florida ↔ NE Ohio reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  warren: [
    { label: 'Within Warren (Mason / Lebanon ↔ Springboro edges)', direction: 'within', context: 'NE Cincinnati collar growth — not urban Cincinnati hills defaults.' },
    { label: 'Warren ↔ Hamilton County Cincinnati pairs', direction: 'within', context: 'Northeast collar logistics; empty miles into the city core.' },
    { label: 'Warren ↔ Butler west/north collar pairs', direction: 'within', context: 'Different Cincinnati collar fabrics NE vs west.' },
    { label: 'Kentucky / Midwest → Warren County growth housing', direction: 'inbound', context: 'Interstate or regional arrivals into HOA multi-family product.' },
    { label: 'Cincinnati metro ↔ Columbus in-state long hauls via I-71', direction: 'outbound', context: 'Collar-origin career moves along the I-71 spine.' },
    { label: 'Florida / South ↔ SW Ohio reverse family moves', direction: 'inbound', context: 'Interstate household goods into Mason/Lebanon corridors.' },
  ],
  lake: [
    { label: 'Within Lake (Mentor / Willoughby ↔ Painesville / Madison edges)', direction: 'within', context: 'East-of-Cleveland lake shore — not Cuyahoga city neighborhood defaults.' },
    { label: 'Lake ↔ Cuyahoga Cleveland pairs', direction: 'within', context: 'East collar logistics; I-90/SR-2 portal time dominates at peak.' },
    { label: 'Lake ↔ Geauga / Ashtabula edges', direction: 'within', context: 'Eastern NE Ohio pairs; keep county lines clear.' },
    { label: 'Pittsburgh ↔ Lake County / east-Cleveland pairs', direction: 'inbound', context: 'Interstate household goods into shore multi-unit and suburban stock.' },
    { label: 'Midwest → Lake County suburban housing', direction: 'inbound', context: 'Employment and family inflows into Mentor corridor product.' },
    { label: 'Florida ↔ NE Ohio reverse family moves via I-90', direction: 'inbound', context: 'Interstate household goods; lake-effect winter contingency.' },
  ],
};

const PA_ROUTES: Record<string, CountyPopularRoute[]> = {
  philadelphia: [
    { label: 'Within Philadelphia (Center City ↔ South Philly / Northeast)', direction: 'within', context: 'Elevator COIs downtown vs rowhome curb limits — I-95/I-76 portal time dominates.' },
    { label: 'New York / New Jersey → Philadelphia career & student markets', direction: 'inbound', context: 'Interstate household goods into city multi-unit and rowhome stock.', href: '/resources/routes/new-jersey-to-pennsylvania' },
    { label: 'Philadelphia ↔ Pittsburgh (I-76)', direction: 'outbound', context: 'In-state long haul between SEPA and Western PA job markets.' },
    { label: 'Philadelphia ↔ Montgomery / Bucks / Delaware / Chester collar pairs', direction: 'within', context: 'City-to-collar logistics; keep county lines clear on estimates.' },
    { label: 'Florida / South ↔ Philadelphia reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Midwest → Philadelphia professional corridors', direction: 'inbound', context: 'Healthcare and corporate inflows into Center City and neighborhood stock.' },
  ],
  allegheny: [
    { label: 'Within Allegheny (Downtown ↔ East End / South Hills / North Hills)', direction: 'within', context: 'Hills, stairs, and Parkway portal time — not Philly rowhome logistics.' },
    { label: 'Midwest → Pittsburgh healthcare & tech markets', direction: 'inbound', context: 'Interstate household goods into hillside and multi-unit stock.' },
    { label: 'Pittsburgh ↔ Philadelphia (I-76)', direction: 'outbound', context: 'In-state long haul across Pennsylvania.' },
    { label: 'Allegheny ↔ Westmoreland east-suburban pairs', direction: 'within', context: 'City-to-east complement logistics; clarify county lines.' },
    { label: 'Northeast → Pittsburgh career corridors', direction: 'inbound', context: 'Interstate arrivals into city neighborhoods and North Hills multi-family.' },
    { label: 'Florida ↔ Pittsburgh reverse family moves', direction: 'inbound', context: 'Interstate household goods; winter access contingency on hillside addresses.' },
  ],
  montgomery: [
    { label: 'Within Montgomery (Main Line ↔ King of Prussia / Abington)', direction: 'within', context: 'Collar multi-unit mix — not Center City elevators as the default.' },
    { label: 'Montgomery ↔ Philadelphia I-76 pairs', direction: 'within', context: 'Northwest collar logistics; portal time dominates at peak.' },
    { label: 'New York / New Jersey → Main Line & KOP housing', direction: 'inbound', context: 'Interstate arrivals into multi-unit and older SFH stock.' },
    { label: 'Montgomery ↔ Bucks / Chester / Delaware collar pairs', direction: 'within', context: 'Philly collar cluster with different access products at each end.' },
    { label: 'Midwest → Montgomery County professional corridors', direction: 'inbound', context: 'Corporate and healthcare inflows into KOP and Main Line multi-family.' },
    { label: 'Florida ↔ SEPA reverse family moves', direction: 'inbound', context: 'Interstate household goods into collar suburbs; FMCSA for cross-state legs.' },
  ],
  bucks: [
    { label: 'Within Bucks (Lower Bucks ↔ Central / Upper Bucks)', direction: 'within', context: 'I-95 multi-family vs longer northern empty miles.' },
    { label: 'Bucks ↔ Philadelphia I-95 pairs', direction: 'within', context: 'North collar logistics; portal time dominates at peak.' },
    { label: 'New York / New Jersey → Bucks County suburbs', direction: 'inbound', context: 'Interstate arrivals into Lower and Central Bucks housing.' },
    { label: 'Bucks ↔ Montgomery / Northampton edges', direction: 'within', context: 'North SEPA pairs with different river-town and Main Line fabrics.' },
    { label: 'Florida ↔ Bucks reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Midwest → Bucks County family corridors', direction: 'inbound', context: 'Family inflows seeking space north of Philly.' },
  ],
  delaware: [
    { label: 'Within Delaware County (eastern inner-ring ↔ western townships)', direction: 'within', context: 'Older twins vs HOA pockets — not Chester far-west growth alone.' },
    { label: 'Delaware ↔ Philadelphia I-95 pairs', direction: 'within', context: 'Western inner-ring logistics; portal time dominates at peak.' },
    { label: 'New Jersey / Delaware state ↔ Delaware County pairs', direction: 'outbound', context: 'Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.' },
    { label: 'Delaware ↔ Chester / Montgomery collar pairs', direction: 'within', context: 'Inner-ring vs far-west vs northwest collar differences matter.' },
    { label: 'Florida ↔ SEPA reverse family moves via I-95', direction: 'inbound', context: 'Interstate household goods into inner-ring stock.' },
    { label: 'Northeast → Delaware County professional corridors', direction: 'inbound', context: 'Corporate and healthcare inflows into western township multi-family.' },
  ],
  chester: [
    { label: 'Within Chester (West Chester / Exton ↔ eastern approaches)', direction: 'within', context: 'HOA growth and long empty miles — not Delaware inner-ring twins.' },
    { label: 'Chester ↔ Philadelphia long collar pairs', direction: 'within', context: 'Far-west logistics days more than short hourly locals.' },
    { label: 'New York / New Jersey → Chester County growth housing', direction: 'inbound', context: 'Interstate arrivals into HOA multi-family and tracts.' },
    { label: 'Chester ↔ Delaware / Montgomery edges', direction: 'within', context: 'Far-west vs inner-ring vs Main Line access differences.' },
    { label: 'Florida ↔ SEPA reverse family moves', direction: 'inbound', context: 'Interstate household goods into far-west growth product.' },
    { label: 'Midwest → Chester County professional corridors', direction: 'inbound', context: 'Corporate inflows into Exton/West Chester multi-family.' },
  ],
  lancaster: [
    { label: 'Within Lancaster (city multi-unit ↔ northern townships)', direction: 'within', context: 'Mid-state city vs township empty miles — not Philly collar patterns.' },
    { label: 'Lancaster ↔ York / Berks mid-state pairs', direction: 'within', context: 'South-central and Reading-adjacent logistics; keep county lines clear.' },
    { label: 'Philadelphia / SEPA → Lancaster mid-state moves', direction: 'inbound', context: 'In-state long haul into city and township stock.' },
    { label: 'New York / New Jersey → Lancaster County', direction: 'inbound', context: 'Interstate household goods into mid-state housing.' },
    { label: 'Florida ↔ Lancaster reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Midwest → Lancaster manufacturing & healthcare corridors', direction: 'inbound', context: 'Regional employment inflows into township growth product.' },
  ],
  york: [
    { label: 'Within York (city multi-unit ↔ northern I-83 growth)', direction: 'within', context: 'South-central I-83 corridor — not Lancaster tourism edges.' },
    { label: 'York ↔ Harrisburg / Lancaster mid-state pairs', direction: 'within', context: 'Regional logistics longer than a suburb hop.' },
    { label: 'Baltimore / Maryland ↔ York County pairs', direction: 'inbound', context: 'Clarify PA PUC vs FMCSA for cross-state destinations.' },
    { label: 'DC / Northern Virginia → York south-central housing', direction: 'inbound', context: 'Interstate household goods into I-83 growth product.' },
    { label: 'Florida ↔ York reverse family moves via I-83', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Philadelphia ↔ York in-state long hauls', direction: 'outbound', context: 'SEPA to south-central career and family moves.' },
  ],
  berks: [
    { label: 'Within Berks (Reading city ↔ western suburbs / rural edges)', direction: 'within', context: 'Reading regional fabric — not Philly collar clones.' },
    { label: 'Berks ↔ Lehigh Valley / Lancaster pairs', direction: 'within', context: 'Mid-state regional logistics; keep county lines clear.' },
    { label: 'New York / New Jersey → Reading regional markets', direction: 'inbound', context: 'Interstate household goods into city multi-unit and suburban stock.' },
    { label: 'Philadelphia ↔ Reading in-state pairs', direction: 'inbound', context: 'SEPA to Reading career and family moves.' },
    { label: 'Florida ↔ Berks reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Midwest → Berks manufacturing & healthcare corridors', direction: 'inbound', context: 'Regional employment inflows into western suburban product.' },
  ],
  lehigh: [
    { label: 'Within Lehigh (Allentown ↔ western suburbs)', direction: 'within', context: 'Allentown multi-unit vs HOA growth — not Bethlehem defaults.' },
    { label: 'Lehigh ↔ Northampton Valley pairs', direction: 'within', context: 'Everyday Lehigh Valley logistics; clarify county lines.' },
    { label: 'New York / New Jersey → Allentown & Lehigh Valley housing', direction: 'inbound', context: 'Interstate household goods into Valley multi-family stock.' },
    { label: 'Philadelphia ↔ Lehigh Valley in-state pairs', direction: 'inbound', context: 'SEPA to Valley career and family moves.' },
    { label: 'Florida ↔ Lehigh Valley reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Midwest → Lehigh logistics & manufacturing corridors', direction: 'inbound', context: 'Industrial employment inflows into western multi-family product.' },
  ],
  northampton: [
    { label: 'Within Northampton (Bethlehem ↔ Easton / township growth)', direction: 'within', context: 'Dual-city access products — not Allentown clones.' },
    { label: 'Northampton ↔ Lehigh Valley pairs', direction: 'within', context: 'Everyday Valley logistics; clarify county lines.' },
    { label: 'New York / New Jersey → Bethlehem / Easton housing', direction: 'inbound', context: 'Interstate household goods; eastern edges may involve NJ destination authority checks.' },
    { label: 'Northampton ↔ New Jersey border pairs', direction: 'outbound', context: 'Clarify PA PUC vs FMCSA for destinations outside Pennsylvania.' },
    { label: 'Philadelphia ↔ Northampton in-state pairs', direction: 'inbound', context: 'SEPA to Valley career and family moves.' },
    { label: 'Florida ↔ Lehigh Valley reverse family moves', direction: 'inbound', context: 'Interstate household goods into Bethlehem/Easton stock.' },
  ],
  westmoreland: [
    { label: 'Within Westmoreland (Greensburg ↔ western approaches / eastern towns)', direction: 'within', context: 'East-of-Pittsburgh towns — not Downtown elevator defaults.' },
    { label: 'Westmoreland ↔ Allegheny Pittsburgh pairs', direction: 'within', context: 'City-to-east complement logistics; empty miles dominate.' },
    { label: 'Midwest → Westmoreland / Pittsburgh-east housing', direction: 'inbound', context: 'Interstate household goods into town multi-unit and suburban stock.' },
    { label: 'Philadelphia ↔ Pittsburgh-east in-state long hauls', direction: 'inbound', context: 'Cross-state-of-PA career moves into Greensburg-area housing.' },
    { label: 'Florida ↔ Western PA reverse family moves', direction: 'inbound', context: 'Interstate household goods; winter access contingency on rural edges.' },
    { label: 'Northeast → Westmoreland professional corridors', direction: 'inbound', context: 'Employment inflows into western approach multi-family product.' },
  ],
};
