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
  morris: [
    {
      label: 'Within Morris (Morristown ↔ Parsippany / Madison)',
      direction: 'within',
      context: 'Historic-town stairs vs corporate-corridor HOAs — access profiles differ by zone.',
    },
    {
      label: 'Essex / Newark area → Morris suburbs',
      direction: 'inbound',
      context: 'Parent-density outbound to larger-lot Morris product; HOA packets are common.',
      href: '/local-movers/new-jersey/essex',
    },
    {
      label: 'Bergen / NYC side → Morris corporate suburbs',
      direction: 'inbound',
      context: 'Professional relos along I-80 / I-287; not a high-rise curb job.',
      href: '/local-movers/new-jersey/bergen',
    },
    {
      label: 'Morris → North Carolina / South Carolina',
      direction: 'outbound',
      context: 'Family long-distance; FMCSA carriers and volume estimates required.',
      href: '/resources/routes/new-jersey-to-south-carolina',
    },
    {
      label: 'Morris → Florida',
      direction: 'outbound',
      context: 'Snowbird and permanent relocations; book peak winter capacity early.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Western Morris larger-lot / hillside homes',
      direction: 'within',
      context: 'Driveway length, low wires, and winter grades — photo the approach.',
    },
  ],
  camden: [
    {
      label: 'Within Camden (Cherry Hill ↔ Voorhees / Haddonfield)',
      direction: 'within',
      context: 'Suburban HOAs vs historic street width — truck type changes by town.',
    },
    {
      label: 'Philadelphia → Camden County suburbs',
      direction: 'inbound',
      context: 'Cross-river moves; confirm PA/NJ authority when either end is out of state.',
    },
    {
      label: 'Camden → Burlington growth suburbs',
      direction: 'outbound',
      context: 'South Jersey collar hops toward Mount Laurel / Moorestown product.',
      href: '/local-movers/new-jersey/burlington',
    },
    {
      label: 'Camden → Florida / Sun Belt',
      direction: 'outbound',
      context: 'Long-distance household goods; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Urban Camden multi-story inventory',
      direction: 'within',
      context: 'Stairs and limited staging — not a Cherry Hill cul-de-sac plan.',
    },
  ],
  burlington: [
    {
      label: 'Within Burlington (Mount Laurel ↔ Moorestown / Mount Holly)',
      direction: 'within',
      context: 'Planned-community HOAs and high-value SFH; certificates are routine.',
    },
    {
      label: 'Camden / Cherry Hill → Burlington growth suburbs',
      direction: 'inbound',
      context: 'Parent-collar outbound to Turnpike growth product — not a rename of Cherry Hill core.',
      href: '/local-movers/new-jersey/camden',
    },
    {
      label: 'Philadelphia → Burlington County',
      direction: 'inbound',
      context: 'Regional interstate when crossing PA; build I-295 / Turnpike timing into quotes.',
    },
    {
      label: 'Burlington → North Carolina / Florida',
      direction: 'outbound',
      context: 'Family long-distance; volume estimates and FMCSA authority required.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Eastern Burlington / Joint Base approaches',
      direction: 'within',
      context: 'Longer empty miles and possible gate timing — not Mount Laurel HOA defaults.',
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
  'cape-may': [
    {
      label: 'Within Cape May (Cape May ↔ Wildwood / Ocean City)',
      direction: 'within',
      context: 'Barrier-island hops; bridge timing and tourist-street staging dominate summer turns.',
    },
    {
      label: 'Mainland Rio Grande / Court House ↔ islands',
      direction: 'within',
      context: 'Island to mainland staging and winter storage lanes along Parkway south / Route 9.',
    },
    {
      label: 'Philly / South Jersey → Cape May shore tip',
      direction: 'inbound',
      context: 'Seasonal and second-home demand; summer Parkway south congestion.',
    },
    {
      label: 'Cape May → Florida / Sun Belt',
      direction: 'outbound',
      context: 'Hospitality and retirement long-distance; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Cape May → Atlantic City / mainland Atlantic',
      direction: 'outbound',
      context: 'Shore-to-shore workforce and year-round housing swaps — not a Toms River lane.',
    },
  ],
  cumberland: [
    {
      label: 'Within Cumberland (Vineland ↔ Millville / Bridgeton)',
      direction: 'within',
      context: 'Interior South Jersey city-pairs; ag-adjacent approaches and small-city streets.',
    },
    {
      label: 'Philly / Camden collar → Vineland area',
      direction: 'inbound',
      context: 'Interior employment and housing moves; longer empty miles than shore corridors.',
    },
    {
      label: 'Cumberland → Atlantic / Egg Harbor mainland',
      direction: 'outbound',
      context: 'Interior–shore connector; not a boardwalk high-rise script.',
    },
    {
      label: 'Cumberland → Florida / Carolinas',
      direction: 'outbound',
      context: 'Family long-distance; volume estimates and FMCSA authority required.',
      href: '/resources/routes/new-jersey-to-florida',
    },
    {
      label: 'Bridgeton county-seat multifamily & older stock',
      direction: 'within',
      context: 'Stairs, tight streets, and small-city logistics — survey access carefully.',
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
  // ——— CA Tier 2 Wave 2 (parent-biased routes) ———
  tulare: [
    { label: 'Within Tulare (Visalia ↔ Tulare / Porterville edges)', direction: 'within', context: 'Valley secondary stock and heat — not Fresno city rename.' },
    { label: 'Tulare ↔ Fresno County pairs', direction: 'within', context: 'Parent-metro CA-99 logistics; Visalia vs Fresno core product differs.' },
    { label: 'Bay Area / LA → Visalia affordability', direction: 'inbound', context: 'Cost-driven inflows into family suburban and ag-adjacent stock.' },
    { label: 'Tulare → Arizona / Texas job markets', direction: 'outbound', context: 'Interstate household goods; FMCSA for out-of-state legs.', href: '/resources/routes/california-to-arizona' },
    { label: 'Ag / packing-shed workforce relo → south county', direction: 'inbound', context: 'Seasonal calendars reshape rural and small-city windows.' },
    { label: 'Visalia → Pacific Northwest', direction: 'outbound', context: 'I-5 corridor long-distance; multi-day transit from the southern Valley.' },
  ],
  'santa-cruz': [
    { label: 'Within Santa Cruz (Santa Cruz city ↔ Live Oak / Capitola / Watsonville)', direction: 'within', context: 'Coastal narrow access and tourism stock — not Silicon Valley clone.' },
    { label: 'Santa Cruz ↔ Santa Clara / South Bay pairs', direction: 'outbound', context: 'CA-17 mountain approaches; parent-metro tech commute product differs at both ends.' },
    { label: 'Santa Cruz ↔ Monterey County pairs', direction: 'within', context: 'Coastal secondary-to-secondary logistics; keep UCSC vs Monterey access distinct.' },
    { label: 'Bay Area → Santa Cruz coastal inflows', direction: 'inbound', context: 'Lifestyle and university inflows; parking and grade rewrite labor hours.' },
    { label: 'Santa Cruz → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
    { label: 'UCSC / lease-turn multi-unit waves', direction: 'within', context: 'Semester edges cluster stair-heavy and curb-scarce jobs.' },
  ],
  marin: [
    { label: 'Within Marin (San Rafael ↔ Novato / Mill Valley / Sausalito edges)', direction: 'within', context: 'North Bay collar product — not a mini San Francisco page.' },
    { label: 'Marin ↔ San Francisco pairs', direction: 'outbound', context: 'Golden Gate / US-101 parent-metro logistics; bridge timing and curb rules differ by zone.' },
    { label: 'Marin ↔ Sonoma North Bay pairs', direction: 'within', context: 'US-101 multi-county logistics; affluent collar vs wine-country growth product differs.' },
    { label: 'East Bay / Peninsula → Marin lifestyle inflows', direction: 'inbound', context: 'Ferry/bridge access and steep/narrow streets rewrite surveys.' },
    { label: 'Marin → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
    { label: 'HOA / hillside long-carry jobs', direction: 'within', context: 'Certificates of insurance and driveway pitch dominate affluent suburban stock.' },
  ],
  yolo: [
    { label: 'Within Yolo (Davis ↔ Woodland / West Sacramento approaches)', direction: 'within', context: 'UC Davis and ag-adjacent collar — not Sacramento County rename.' },
    { label: 'Yolo ↔ Sacramento County pairs', direction: 'outbound', context: 'I-80/I-5 parent-metro logistics; Davis multi-unit vs Sac core elevators differ.' },
    { label: 'Bay Area → Davis university / research inflows', direction: 'inbound', context: 'Semester and lab report dates reshape calendars.' },
    { label: 'Yolo ↔ Placer / El Dorado collar pairs', direction: 'within', context: 'Sacramento-region secondary-to-secondary logistics.' },
    { label: 'Yolo → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
    { label: 'Woodland ag-adjacent and industrial edges', direction: 'within', context: 'Different curb and heat staging than Davis campus walk-ups.' },
  ],
  'el-dorado': [
    { label: 'Within El Dorado (El Dorado Hills ↔ Cameron Park / Placerville)', direction: 'within', context: 'Foothill collar product — not flat Sacramento valley clone.' },
    { label: 'El Dorado ↔ Sacramento County pairs', direction: 'outbound', context: 'US-50 parent-metro logistics; grade and HOA rewrite portal time.' },
    { label: 'El Dorado ↔ Placer (I-80 vs US-50) pairs', direction: 'within', context: 'Two foothill collars; different spines and access profiles.' },
    { label: 'Bay Area → El Dorado Hills growth inflows', direction: 'inbound', context: 'Master-planned suburbs and foothill grades reshape surveys.' },
    { label: 'Higher US-50 / seasonal access legs', direction: 'within', context: 'Weather windows and vehicle capability matter toward higher elevation.' },
    { label: 'El Dorado → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  butte: [
    { label: 'Within Butte (Chico ↔ Oroville / Paradise-edge approaches)', direction: 'within', context: 'North Valley independent hub — not a Sacramento collar rename.' },
    { label: 'Butte ↔ Sacramento distant pairs', direction: 'outbound', context: 'CA-99 long-local/regional logistics; keep Chico independence clear.' },
    { label: 'Bay Area / Sac → Chico university inflows', direction: 'inbound', context: 'Chico State calendars and valley heat reshape windows.' },
    { label: 'Rebuild / WUI-adjacent access jobs', direction: 'within', context: 'Where accurate, wildfire-adjacent access and rebuild logistics rewrite surveys.' },
    { label: 'Butte → Pacific Northwest', direction: 'outbound', context: 'I-5 corridor long-distance; multi-day transit from the North Valley.' },
    { label: 'Butte → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  napa: [
    { label: 'Within Napa (Napa city ↔ American Canyon / Up-Valley towns)', direction: 'within', context: 'Tourism + residential valley product — not Sonoma clone.' },
    { label: 'Napa ↔ Sonoma North Bay pairs', direction: 'outbound', context: 'Parent/secondary wine-country logistics; constrained valley roads differ by town.' },
    { label: 'Napa ↔ San Francisco Bay pairs', direction: 'outbound', context: 'Bridge/corridor logistics; event-season congestion rewrites ETAs.' },
    { label: 'Bay Area → Napa lifestyle / hospitality inflows', direction: 'inbound', context: 'Second-home and workforce mixes collide with tourist peaks.' },
    { label: 'Event-season / harvest congestion windows', direction: 'within', context: 'CA-29 and Silverado Trail peaks demand honest portal-to-portal pricing.' },
    { label: 'Napa → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  merced: [
    { label: 'Within Merced (Merced city / UC Merced ↔ Atwater / Los Banos edges)', direction: 'within', context: 'University growth + ag logistics — not Fresno rename.' },
    { label: 'Merced ↔ Fresno County pairs', direction: 'outbound', context: 'CA-99 parent-metro logistics; UC multi-unit vs Fresno core product differs.' },
    { label: 'Merced ↔ Stanislaus / Modesto pairs', direction: 'within', context: 'Valley secondary-to-secondary logistics along 99.' },
    { label: 'Bay Area → UC Merced / research inflows', direction: 'inbound', context: 'Campus calendars reshape multi-unit and lease-turn demand.' },
    { label: 'Ag last-mile and heat staging jobs', direction: 'within', context: 'Rural and packing-adjacent stock differs from campus walk-ups.' },
    { label: 'Merced → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  shasta: [
    { label: 'Within Shasta (Redding ↔ Anderson / Shasta Lake edges)', direction: 'within', context: 'Far North I-5 hub — independent north-state role, not a Bay collar.' },
    { label: 'Shasta ↔ Sacramento distant pairs', direction: 'outbound', context: 'I-5 long-haul in-state logistics; keep Redding independence clear.' },
    { label: 'Bay Area / Sac → Redding outdoor / healthcare inflows', direction: 'inbound', context: 'Lifestyle and service-economy inflows into regional stock.' },
    { label: 'Rural last-mile / recreation-corridor jobs', direction: 'within', context: 'Long empty miles and limited redundancy rewrite portal time.' },
    { label: 'Shasta → Pacific Northwest', direction: 'outbound', context: 'I-5 corridor interstate; FMCSA when leaving California.' },
    { label: 'Shasta → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  imperial: [
    { label: 'Within Imperial (El Centro ↔ Brawley / Calexico edges)', direction: 'within', context: 'Imperial Valley heat and border-adjacent logistics — not San Diego coastal clone.' },
    { label: 'Imperial ↔ San Diego County pairs', direction: 'outbound', context: 'I-8 parent-metro logistics; valley ag/industrial vs coastal product differs.' },
    { label: 'Imperial ↔ Arizona border pairs', direction: 'outbound', context: 'Interstate household goods; FMCSA when leaving California.' },
    { label: 'Ag / industrial workforce relo → valley towns', direction: 'inbound', context: 'Heat and shift calendars reshape staging windows.' },
    { label: 'Extreme-heat early-start local jobs', direction: 'within', context: 'Summer afternoons punish outdoor staging — price honest heat buffers.' },
    { label: 'Imperial → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  humboldt: [
    { label: 'Within Humboldt (Eureka ↔ Arcata / McKinleyville edges)', direction: 'within', context: 'North Coast independent regional product — not a Bay Area rename.' },
    { label: 'Humboldt ↔ Bay Area long pairs', direction: 'outbound', context: 'US-101 long approach; limited corridor redundancy rewrites ETAs.' },
    { label: 'Cal Poly Humboldt / university turnover', direction: 'within', context: 'Campus calendars cluster multi-unit and curb-scarce jobs.' },
    { label: 'Sacramento / inland → Eureka lifestyle inflows', direction: 'inbound', context: 'Coastal climate and long last-mile logistics reshape surveys.' },
    { label: 'Rural coastal / redwood-edge access jobs', direction: 'within', context: 'Narrow approaches and weather windows differ from city cores.' },
    { label: 'Humboldt → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
  ],
  madera: [
    { label: 'Within Madera (Madera city ↔ Chowchilla / foothill edges)', direction: 'within', context: 'Fresno north collar — not a renamed Fresno city page.' },
    { label: 'Madera ↔ Fresno County pairs', direction: 'outbound', context: 'CA-99 parent-metro logistics; newer growth vs Fresno core product differs.' },
    { label: 'Madera ↔ Merced secondary pairs', direction: 'within', context: 'Valley secondary-to-secondary logistics along 99.' },
    { label: 'Bay Area / LA → Madera affordability inflows', direction: 'inbound', context: 'Ag-adjacent and newer suburban stock absorb spillover.' },
    { label: 'Ag / Highway 99 corridor jobs', direction: 'within', context: 'Heat and longer rural carries rewrite labor hours vs city multi-unit.' },
    { label: 'Madera → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving California.' },
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
  manatee: [
    { label: 'Within Manatee (Bradenton ↔ Lakewood Ranch / Palmetto)', direction: 'within', context: 'Tampa Bay south collar — not a Hillsborough core rename.' },
    { label: 'Hillsborough → Bradenton / Lakewood Ranch housing', direction: 'inbound', context: 'I-75 freeflow; HOA soft costs dominate growth tracts.' },
    { label: 'Manatee ↔ Sarasota cross-county pairs', direction: 'within', context: 'Keep Bradenton vs Sarasota coastal products distinct on estimates.' },
    { label: 'Anna Maria / coastal approaches', direction: 'within', context: 'Causeway freeflow and tight coastal staging reshape local hours.' },
    { label: 'Out-of-state → Manatee County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Manatee → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  collier: [
    { label: 'Within Collier (Naples ↔ North Naples / Marco Island)', direction: 'within', context: 'SWFL secondary — not a Fort Myers / Lee rename.' },
    { label: 'Lee County → Naples / Marco housing', direction: 'inbound', context: 'I-75 freeflow; gated HOA and seasonal calendars dominate.' },
    { label: 'Seasonal snowbird turns → coastal multi-unit', direction: 'inbound', context: 'Peak winter freeflow rewrites curb and elevator windows.' },
    { label: 'Out-of-state → Collier County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Collier → Northeast reverse seasonal exits', direction: 'outbound', context: 'Snowbird dual-home logistics; FMCSA required.' },
    { label: 'Collier ↔ Lee Fort Myers pairs', direction: 'within', context: 'SWFL multi-county logistics; keep Naples vs Fort Myers products clear.' },
  ],
  seminole: [
    { label: 'Within Seminole (Lake Mary ↔ Altamonte / Sanford / Oviedo)', direction: 'within', context: 'Orlando north collar — not an Orange theme-park default.' },
    { label: 'Orange County → Lake Mary / Altamonte housing', direction: 'inbound', context: 'I-4 north freeflow; corporate multi-family and HOA product.' },
    { label: 'Seminole ↔ Orange downtown / International Drive pairs', direction: 'within', context: 'North collar to core logistics; portal time dominates at peak.' },
    { label: 'Corporate relo → Heathrow / Lake Mary multi-unit', direction: 'inbound', context: 'Hard report dates and elevator COIs reshape crew timing.' },
    { label: 'Out-of-state → Seminole County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Seminole → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  osceola: [
    { label: 'Within Osceola (Kissimmee ↔ St. Cloud / Poinciana)', direction: 'within', context: 'Orlando south tourism-edge — not Orange I-Drive defaults alone.' },
    { label: 'Orange County → Kissimmee / St. Cloud housing', direction: 'inbound', context: 'FL-417 / I-4 south freeflow; tourism-adjacent residential mix.' },
    { label: 'Tourism-adjacent multi-unit turns', direction: 'inbound', context: 'Peak season freeflow rewrites local hours on US-192 corridors.' },
    { label: 'Osceola ↔ Orange theme-corridor pairs', direction: 'within', context: 'South collar logistics; keep tourism-edge vs core products clear.' },
    { label: 'Out-of-state → Osceola County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Osceola → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  lake: [
    { label: 'Within Lake (Clermont ↔ Leesburg / Mount Dora)', direction: 'within', context: 'Orlando west collar — not an Orange core rename.' },
    { label: 'Orange County → Clermont growth housing', direction: 'inbound', context: 'US-27 freeflow; west-metro HOA growth dominates.' },
    { label: 'Lake ↔ Orange west-corridor pairs', direction: 'within', context: 'FL-50 / Turnpike logistics; portal time at peak.' },
    { label: 'Out-of-state → Lake County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Lake → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / school relo → Clermont multi-family', direction: 'inbound', context: 'School peaks pack west-metro fleets first.' },
  ],
  'st-lucie': [
    { label: 'Within St. Lucie (Port St. Lucie ↔ Fort Pierce / Tradition)', direction: 'within', context: 'Treasure Coast growth — not a Palm Beach rename.' },
    { label: 'Palm Beach County → Port St. Lucie housing', direction: 'inbound', context: 'I-95 north freeflow; growth HOA product vs PBC coastal density.' },
    { label: 'St. Lucie ↔ Palm Beach pairs', direction: 'within', context: 'Treasure Coast vs PBC logistics; keep county products distinct.' },
    { label: 'Out-of-state → St. Lucie County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'St. Lucie → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Coastal / A1A-adjacent pairs', direction: 'within', context: 'Humidity and tight coastal staging reshape local hours.' },
  ],
  marion: [
    { label: 'Within Marion (Ocala ↔ SW growth / Belleview)', direction: 'within', context: 'North Central FL independent hub — not an Orange rename.' },
    { label: 'I-75 regional pairs → Ocala multi-unit', direction: 'inbound', context: 'Long empty miles; heat windows reshape crew timing.' },
    { label: 'Horse-country / rural-edge approaches', direction: 'within', context: 'Long driveways and unpaved access need surveys early.' },
    { label: 'Central Florida → Marion in-state pairs', direction: 'inbound', context: 'I-75 logistics; FDACS for pure in-state jobs.' },
    { label: 'Out-of-state → Marion County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Marion → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  escambia: [
    { label: 'Within Escambia (Pensacola ↔ West Pensacola / beach approaches)', direction: 'within', context: 'Western Panhandle independent — not a Jacksonville rename.' },
    { label: 'Navy / military relo → multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and base-adjacent access reshape crew timing.' },
    { label: 'I-10 regional pairs → Pensacola housing', direction: 'inbound', context: 'Gulf Coast logistics; humidity and storm windows matter.' },
    { label: 'Out-of-state → Escambia County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Escambia → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Pensacola Beach / causeway approaches', direction: 'within', context: 'Coastal staging and freeflow rewrite local hours.' },
  ],
  charlotte: [
    { label: 'Within Charlotte (Port Charlotte ↔ Punta Gorda / Englewood edges)', direction: 'within', context: 'SWFL secondary — not Fort Myers or Sarasota renames.' },
    { label: 'Lee County → Charlotte harbor-area housing', direction: 'inbound', context: 'I-75 freeflow; retirement HOA product dominates.' },
    { label: 'Charlotte ↔ Sarasota / Lee pairs', direction: 'within', context: 'Keep harbor-secondary product distinct from Fort Myers core.' },
    { label: 'Out-of-state → Charlotte County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Charlotte → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Seasonal snowbird turns → harbor multi-unit', direction: 'inbound', context: 'Peak winter freeflow rewrites curb windows.' },
  ],
  hernando: [
    { label: 'Within Hernando (Spring Hill ↔ Brooksville / Weeki Wachee)', direction: 'within', context: 'Tampa north fringe — not a Pasco rename.' },
    { label: 'Hillsborough / Pasco → Spring Hill housing', direction: 'inbound', context: 'US-19 / Suncoast freeflow; outer-collar HOA product.' },
    { label: 'Hernando ↔ Pasco pairs', direction: 'within', context: 'North-bay outer vs inner collar products differ.' },
    { label: 'Out-of-state → Hernando County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Hernando → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / retiree relo → Spring Hill multi-family', direction: 'inbound', context: 'School and snowbird peaks pack fleets first.' },
  ],
  citrus: [
    { label: 'Within Citrus (Crystal River ↔ Inverness / Citrus Springs)', direction: 'within', context: 'Nature Coast independent — lower density last-mile.' },
    { label: 'Hernando / Pasco → Citrus Nature Coast housing', direction: 'inbound', context: 'US-19 freeflow; coastal-rural product not Tampa core.' },
    { label: 'Out-of-state → Citrus County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Citrus → Tampa Bay reverse career pairs', direction: 'outbound', context: 'Long empty miles south; FDACS for pure in-state jobs.' },
    { label: 'Citrus → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Coastal-rural / waterfront approaches', direction: 'within', context: 'Long driveways and tight coastal staging reshape local hours.' },
  ],
  'indian-river': [
    { label: 'Within Indian River (Vero Beach ↔ Sebastian / barrier island edges)', direction: 'within', context: 'Treasure Coast — not Port St. Lucie growth pattern.' },
    { label: 'St. Lucie → Vero Beach housing', direction: 'inbound', context: 'I-95 freeflow; coastal product differs from PSL HOA growth.' },
    { label: 'Indian River ↔ St. Lucie / Martin pairs', direction: 'within', context: 'Treasure Coast multi-county logistics; keep products distinct.' },
    { label: 'Out-of-state → Indian River County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Indian River → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'A1A / barrier-island pairs', direction: 'within', context: 'Bridge freeflow and tight coastal staging.' },
  ],
  martin: [
    { label: 'Within Martin (Stuart ↔ Jensen Beach / Palm City / Hobe Sound)', direction: 'within', context: 'South Treasure Coast — not a Palm Beach rename.' },
    { label: 'Palm Beach → Stuart / Martin housing', direction: 'inbound', context: 'I-95 freeflow; Intracoastal access differs from dense PBC cores.' },
    { label: 'Martin ↔ St. Lucie / Palm Beach pairs', direction: 'within', context: 'Treasure Coast edge logistics; keep county products clear.' },
    { label: 'Out-of-state → Martin County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Martin → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Intracoastal / coastal approaches', direction: 'within', context: 'Bridge freeflow and humidity reshape local hours.' },
  ],
  'st-johns': [
    { label: 'Within St. Johns (St. Augustine ↔ Nocatee / Ponte Vedra)', direction: 'within', context: 'Jax south coastal growth — not a Duval core rename.' },
    { label: 'Duval → Nocatee / St. Augustine housing', direction: 'inbound', context: 'I-95 freeflow; HOA growth and historic coastal products differ.' },
    { label: 'St. Johns ↔ Duval downtown / beaches pairs', direction: 'within', context: 'South collar logistics; portal time at peak.' },
    { label: 'Out-of-state → St. Johns County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'St. Johns → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tourism / historic district multi-unit turns', direction: 'inbound', context: 'Peak freeflow rewrites curb windows in St. Augustine core.' },
  ],
  clay: [
    { label: 'Within Clay (Orange Park ↔ Middleburg / Fleming Island)', direction: 'within', context: 'Jax south collar — not a Duval rename.' },
    { label: 'Duval → Orange Park / Middleburg housing', direction: 'inbound', context: 'US-17 / Blanding freeflow; south-metro HOA product.' },
    { label: 'Clay ↔ Duval pairs', direction: 'within', context: 'River-crossing freeflow; keep south-collar vs core products clear.' },
    { label: 'Out-of-state → Clay County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Clay → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / school relo → Fleming Island multi-family', direction: 'inbound', context: 'School peaks pack south-collar fleets first.' },
  ],
  nassau: [
    { label: 'Within Nassau (Fernandina / Amelia Island ↔ Yulee growth)', direction: 'within', context: 'Jax north coastal — island + mainland products.' },
    { label: 'Duval → Yulee / Fernandina housing', direction: 'inbound', context: 'I-95 north freeflow; island staging differs from Jax core.' },
    { label: 'Nassau ↔ Duval pairs', direction: 'within', context: 'North collar logistics; keep island vs core products clear.' },
    { label: 'Out-of-state → Nassau County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Nassau → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Amelia Island / coastal approaches', direction: 'within', context: 'Bridge freeflow and tourism peaks reshape local hours.' },
  ],
  alachua: [
    { label: 'Within Alachua (Gainesville / UF ↔ NW growth / Alachua town)', direction: 'within', context: 'Independent university metro — not Duval or Orange rename.' },
    { label: 'UF semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'I-75 regional pairs → Gainesville housing', direction: 'inbound', context: 'Long empty miles; heat windows reshape crew timing.' },
    { label: 'Out-of-state → Alachua County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Alachua → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Student + family dual-product pairs', direction: 'within', context: 'Campus multi-unit vs suburban SFH do not share access rules.' },
  ],
  leon: [
    { label: 'Within Leon (Tallahassee Capitol ↔ Midtown / NE growth)', direction: 'within', context: 'Capital independent — not a Jacksonville rename.' },
    { label: 'Capital / FSU / FAMU workforce relo → multi-unit', direction: 'inbound', context: 'Mid-month report dates and semester peaks matter.' },
    { label: 'I-10 regional pairs → Tallahassee housing', direction: 'inbound', context: 'Long empty miles; FDACS for pure in-state jobs.' },
    { label: 'Out-of-state → Leon County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Leon → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Government / university calendar pairs', direction: 'inbound', context: 'Session and semester calendars pack fleets first.' },
  ],
  bay: [
    { label: 'Within Bay (Panama City ↔ PCB / Lynn Haven)', direction: 'within', context: 'Central Panhandle independent — beach + mainland products.' },
    { label: 'Tourism / seasonal turns → PCB multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites coastal curb windows.' },
    { label: 'Military-adjacent relo → multi-unit and SFH', direction: 'inbound', context: 'Hard report dates reshape crew timing where accurate.' },
    { label: 'Out-of-state → Bay County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Bay → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Coastal rebuild / humidity logistics pairs', direction: 'within', context: 'Storm-resilient packing and staging plans matter.' },
  ],
  okaloosa: [
    { label: 'Within Okaloosa (Destin ↔ Fort Walton / Crestview)', direction: 'within', context: 'Emerald Coast independent — beach vs inland products.' },
    { label: 'Tourism / seasonal turns → Destin multi-unit', direction: 'inbound', context: 'Peak freeflow rewrites US-98 curb windows.' },
    { label: 'Military-adjacent relo → Niceville / Fort Walton housing', direction: 'inbound', context: 'Base calendars reshape crew timing where accurate.' },
    { label: 'Escambia → Okaloosa Emerald Coast pairs', direction: 'inbound', context: 'Panhandle multi-county logistics; keep products distinct.' },
    { label: 'Out-of-state → Okaloosa County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Okaloosa → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  'santa-rosa': [
    { label: 'Within Santa Rosa (Milton ↔ Gulf Breeze / Navarre / Pace)', direction: 'within', context: 'Pensacola east collar — not an Escambia rename.' },
    { label: 'Escambia → Milton / Pace / Gulf Breeze housing', direction: 'inbound', context: 'I-10 freeflow; east-collar HOA and coastal products.' },
    { label: 'Santa Rosa ↔ Escambia pairs', direction: 'within', context: 'Bridge and bay approaches; keep east-collar vs Pensacola core clear.' },
    { label: 'Out-of-state → Santa Rosa County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Santa Rosa → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Navarre / Gulf Breeze coastal approaches', direction: 'within', context: 'Bridge freeflow and humidity reshape local hours.' },
  ],
  flagler: [
    { label: 'Within Flagler (Palm Coast ↔ Flagler Beach / Bunnell)', direction: 'within', context: 'NE FL coastal growth between Daytona and Jax.' },
    { label: 'Volusia / Duval → Palm Coast housing', direction: 'inbound', context: 'I-95 freeflow; planned coastal growth product.' },
    { label: 'Flagler ↔ Volusia pairs', direction: 'within', context: 'Coastal multi-county logistics; keep Palm Coast vs Daytona products clear.' },
    { label: 'Out-of-state → Flagler County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Flagler → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'A1A / coastal tourism-residential pairs', direction: 'within', context: 'Peak freeflow rewrites curb windows.' },
  ],
  sumter: [
    { label: 'Within Sumter (The Villages ↔ Wildwood / Bushnell)', direction: 'within', context: 'Central FL retirement growth independent — not Orange/Lake rename.' },
    { label: 'Lake / Orange → The Villages housing', direction: 'inbound', context: 'I-75 freeflow; active-adult HOA density dominates.' },
    { label: 'Active-adult HOA / golf-cart community logistics', direction: 'within', context: 'Gate codes, truck limits, and multi-stop village pairs.' },
    { label: 'Out-of-state → Sumter County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Sumter → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'I-75 / Turnpike regional pairs', direction: 'inbound', context: 'Long empty miles; heat windows reshape crew timing.' },
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
  galveston: [
    { label: 'Within Galveston (Island ↔ League City / mainland north)', direction: 'within', context: 'Causeway and island staging vs mainland HOA product — not a renamed Harris core job.' },
    { label: 'Harris County → Galveston coastal / island housing', direction: 'inbound', context: 'Houston parent overflow; I-45 freeflow and humidity reshape load windows.' },
    { label: 'Mainland ↔ Galveston Island weekend / vacation-residential pairs', direction: 'within', context: 'Seawall and short-block access; shuttles may replace full trailers.' },
    { label: 'Out-of-state → Galveston County coastal housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Galveston → Harris reverse career pairs', direction: 'outbound', context: 'I-45 north to Medical Center / Energy Corridor access products.' },
    { label: 'Galveston → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  brazoria: [
    { label: 'Within Brazoria (Pearland ↔ Angleton / Lake Jackson)', direction: 'within', context: 'Houston south collar growth vs mid-county and Brazosport product.' },
    { label: 'Harris County → Pearland / Manvel growth housing', direction: 'inbound', context: 'SH-288 freeflow; HOA soft costs dominate growth tracts.' },
    { label: 'Brazoria ↔ Harris Medical Center / downtown pairs', direction: 'within', context: 'Collar-to-core logistics; HOA gates plus urban elevator rules on one end.' },
    { label: 'Industrial / petro workforce relo → Lake Jackson / Freeport edges', direction: 'inbound', context: 'Shift calendars and industrial freeflow reshape crew timing where accurate.' },
    { label: 'Out-of-state → Brazoria County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Brazoria → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  hays: [
    { label: 'Within Hays (San Marcos ↔ Kyle / Buda growth)', direction: 'within', context: 'Austin south collar — university multi-unit vs I-35 growth HOAs.' },
    { label: 'Travis County → Kyle / Buda / San Marcos housing', direction: 'inbound', context: 'Austin parent overflow on I-35 south; not a Domain elevator default.' },
    { label: 'Texas State semester inflows → San Marcos multi-unit', direction: 'inbound', context: 'August and January peaks cluster curb and elevators.' },
    { label: 'Hays ↔ Travis downtown / Domain pairs', direction: 'within', context: 'South collar to core logistics; portal time dominates at peak.' },
    { label: 'Out-of-state → Hays County growth housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Hays → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  nueces: [
    { label: 'Within Nueces (Corpus Christi core ↔ Flour Bluff / Padre approaches)', direction: 'within', context: 'Gulf coastal metro — not a Houston collar rename.' },
    { label: 'Padre Island / causeway residential pairs', direction: 'within', context: 'Causeway freeflow and coastal staging rewrite local hours.' },
    { label: 'Houston / San Antonio → Corpus Christi in-state pairs', direction: 'inbound', context: 'I-37 long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Port / industrial workforce relo → coastal multi-unit', direction: 'inbound', context: 'Shift calendars near industrial corridors reshape crew timing.' },
    { label: 'Out-of-state → Corpus Christi housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Nueces → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  bell: [
    { label: 'Within Bell (Killeen ↔ Temple / Belton / Harker Heights)', direction: 'within', context: 'Military-regional twin cities — not Austin Domain defaults.' },
    { label: 'Fort Cavazos PCS / military relo → multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and storage-in-transit are common estimate inputs.' },
    { label: 'Travis / Williamson → Bell County in-state pairs', direction: 'inbound', context: 'I-35 / I-14 logistics; TxDMV HHG for pure in-state jobs.' },
    { label: 'Bell ↔ Travis Austin career pairs', direction: 'within', context: 'Central TX long locals; keep capital vs military-regional products clear.' },
    { label: 'Out-of-state → Killeen–Temple housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Bell → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  // ——— TX Tier 2 Wave 2 ———
  comal: [
    { label: 'Within Comal (New Braunfels ↔ Canyon Lake / Bulverde edges)', direction: 'within', context: 'SA/Austin I-35 corridor growth — not a renamed Bexar page.' },
    { label: 'Comal ↔ Bexar (San Antonio) pairs', direction: 'outbound', context: 'I-35 parent-metro logistics; tourism + residential mix differs from SA core elevators.' },
    { label: 'Comal ↔ Travis / Austin pairs', direction: 'outbound', context: 'I-35 northbound corridor growth; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → New Braunfels growth housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Hill Country edge / tourism-peak local jobs', direction: 'within', context: 'Event weekends and river tourism reshape curb and portal time.' },
    { label: 'Comal → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  guadalupe: [
    { label: 'Within Guadalupe (Schertz ↔ Cibolo / Seguin)', direction: 'within', context: 'SA east collar spillover — not Bexar Loop 1604 core product.' },
    { label: 'Guadalupe ↔ Bexar County pairs', direction: 'outbound', context: 'I-10 / SH-130 parent-metro logistics; HOA growth vs SA core access differs.' },
    { label: 'Travis / Austin ↔ Guadalupe SH-130 pairs', direction: 'inbound', context: 'Central TX growth corridor; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Schertz–Cibolo housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Seguin small-city vs east-metro HOA jobs', direction: 'within', context: 'Historic grid and suburban tract access are different rate cards.' },
    { label: 'Guadalupe → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  parker: [
    { label: 'Within Parker (Weatherford ↔ Aledo / Willow Park edges)', direction: 'within', context: 'FW west collar — semi-rural suburban transition, not Tarrant core.' },
    { label: 'Parker ↔ Tarrant (Fort Worth) pairs', direction: 'outbound', context: 'I-20 parent-metro logistics; acreage and HOA edges rewrite portal time.' },
    { label: 'Dallas ↔ Parker west-metro pairs', direction: 'inbound', context: 'DFW long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Weatherford / Aledo housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Acreage / semi-rural last-mile jobs', direction: 'within', context: 'Long drives, soft shoulders, and shop buildings underprice city crews.' },
    { label: 'Parker → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  johnson: [
    { label: 'Within Johnson (Burleson edge ↔ Cleburne / Joshua)', direction: 'within', context: 'FW south spillover — industrial/residential mix, not Tarrant downtown.' },
    { label: 'Johnson ↔ Tarrant County pairs', direction: 'outbound', context: 'I-35W parent-metro logistics; south-collar HOA vs FW core access differs.' },
    { label: 'Dallas ↔ Johnson I-35W / US-67 pairs', direction: 'inbound', context: 'DFW south growth; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Cleburne–Burleson housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Industrial-adjacent vs family HOA jobs', direction: 'within', context: 'Shop buildings and new tracts are not interchangeable quotes.' },
    { label: 'Johnson → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  ellis: [
    { label: 'Within Ellis (Waxahachie ↔ Midlothian / Ennis / Red Oak)', direction: 'within', context: 'Dallas south collar — not a renamed Dallas County page.' },
    { label: 'Ellis ↔ Dallas County pairs', direction: 'outbound', context: 'I-35E parent-metro logistics; small-city + suburban growth vs DFW core elevators.' },
    { label: 'Ellis ↔ Tarrant / Fort Worth pairs', direction: 'within', context: 'Southern DFW long locals; keep county products distinct.' },
    { label: 'Out-of-state → Midlothian / Waxahachie growth', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'I-35E south growth HOA jobs', direction: 'within', context: 'New tracts and gate lists rewrite suburban staging vs older downtown stock.' },
    { label: 'Ellis → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  kaufman: [
    { label: 'Within Kaufman (Forney ↔ Terrell / Kaufman / Crandall edges)', direction: 'within', context: 'Dallas east growth collar — not Dallas core rename.' },
    { label: 'Kaufman ↔ Dallas County pairs', direction: 'outbound', context: 'I-20 / US-175 parent-metro logistics; newer subdivisions vs DFW elevators.' },
    { label: 'Kaufman ↔ Rockwall / eastern DFW secondaries', direction: 'within', context: 'East-metro secondary-to-secondary logistics.' },
    { label: 'Out-of-state → Forney growth housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'I-20 corridor empty-mile jobs', direction: 'within', context: 'Town-to-metro pairs freer than core still burn portal time at peak.' },
    { label: 'Kaufman → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  brazos: [
    { label: 'Within Brazos (College Station ↔ Bryan / wellborn edges)', direction: 'within', context: 'Independent A&M metro — not a Houston or Austin collar rename.' },
    { label: 'Texas A&M semester / research inflows', direction: 'inbound', context: 'August and January peaks cluster multi-unit and curb-scarce jobs.' },
    { label: 'Harris / Travis ↔ Brazos in-state pairs', direction: 'inbound', context: 'SH-6 long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Bryan–College Station housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Student multi-unit vs family SFH jobs', direction: 'within', context: 'Campus walk-ups and suburban tracts need different access surveys.' },
    { label: 'Brazos → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  lubbock: [
    { label: 'Within Lubbock (Tech / medical core ↔ southwest / Loop 289 edges)', direction: 'within', context: 'Independent South Plains hub — not DFW or Houston collar product.' },
    { label: 'Texas Tech / medical campus turnover', direction: 'inbound', context: 'Semester and hospital calendars reshape multi-unit demand.' },
    { label: 'DFW / Austin ↔ Lubbock in-state pairs', direction: 'inbound', context: 'West TX long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Lubbock housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Wind / dust seasonality local jobs', direction: 'within', context: 'Where accurate, spring wind windows affect outdoor staging and sealed goods.' },
    { label: 'Lubbock → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  mclennan: [
    { label: 'Within McLennan (Waco core ↔ Hewitt / Woodway / Bellmead edges)', direction: 'within', context: 'Independent I-35 mid-state hub — not Austin Domain defaults.' },
    { label: 'Baylor / university multi-unit waves', direction: 'inbound', context: 'Semester edges cluster curb and elevators.' },
    { label: 'Travis / Dallas ↔ McLennan I-35 pairs', direction: 'inbound', context: 'Central TX long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Waco housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'I-35 freeflow vs campus access jobs', direction: 'within', context: 'Corridor timing and multi-unit COIs rewrite same-bedroom quotes.' },
    { label: 'McLennan → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  jefferson: [
    { label: 'Within Jefferson (Beaumont ↔ Port Arthur / Nederland edges)', direction: 'within', context: 'Golden Triangle industrial metro — not Houston collar rename.' },
    { label: 'Petro / industrial workforce relo → multi-unit and SFH', direction: 'inbound', context: 'Shift calendars near industrial corridors reshape crew timing.' },
    { label: 'Harris / Houston ↔ Jefferson I-10 pairs', direction: 'inbound', context: 'I-10 long locals; humidity and industrial adjacency rewrite surveys.' },
    { label: 'Out-of-state → Beaumont–Port Arthur housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Humidity / Gulf industrial last-mile jobs', direction: 'within', context: 'Coastal humidity and industrial-edge access differ from inland suburb HOAs.' },
    { label: 'Jefferson → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  smith: [
    { label: 'Within Smith (Tyler core ↔ Lindale / Whitehouse edges)', direction: 'within', context: 'Independent East TX hub — not DFW collar product.' },
    { label: 'Regional medical / college turnover → multi-unit', direction: 'inbound', context: 'Hospital and campus calendars reshape demand.' },
    { label: 'Dallas ↔ Tyler I-20 pairs', direction: 'inbound', context: 'East TX long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Tyler housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Piney woods last-mile jobs', direction: 'within', context: 'Tree canopy, longer rural approaches, and soft shoulders underprice city crews.' },
    { label: 'Smith → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  cameron: [
    { label: 'Within Cameron (Brownsville ↔ Harlingen / South Padre approaches)', direction: 'within', context: 'South RGV — not a McAllen/Hidalgo north-RGV clone.' },
    { label: 'Cameron ↔ Hidalgo (McAllen) pairs', direction: 'outbound', context: 'US-83 / I-69E RGV logistics; south vs north RGV product differs.' },
    { label: 'Border / port logistics workforce relo', direction: 'inbound', context: 'Shift calendars and heat reshape staging windows.' },
    { label: 'Out-of-state → Brownsville–Harlingen housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Coastal-adjacent / causeway residential jobs', direction: 'within', context: 'Padre approaches and dual-city freeflow rewrite portal time.' },
    { label: 'Cameron → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  webb: [
    { label: 'Within Webb (Laredo core ↔ south / Loop 20 edges)', direction: 'within', context: 'Independent border trade hub — not generic South Texas suburb product.' },
    { label: 'Trade-corridor / logistics workforce relo', direction: 'inbound', context: 'Hard report dates near industrial and warehouse corridors reshape windows.' },
    { label: 'San Antonio / Austin ↔ Laredo I-35 pairs', direction: 'inbound', context: 'I-35 long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Laredo housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Heat + border-adjacent last-mile jobs', direction: 'within', context: 'Extreme heat and trade-traffic freeflow differ from inland metro HOAs.' },
    { label: 'Webb → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  midland: [
    { label: 'Within Midland (Loop 250 / core ↔ west / energy multi-unit edges)', direction: 'within', context: 'Permian energy HQ product — distinct from Odessa industrial-residential.' },
    { label: 'Energy workforce turnover → Midland multi-unit and SFH', direction: 'inbound', context: 'Hard report dates dominate; storage-in-transit is common.' },
    { label: 'Midland ↔ Ector (Odessa) Permian pairs', direction: 'within', context: 'Twin energy markets; HQ multi-unit vs industrial-res access differs — never clone quotes.' },
    { label: 'DFW / Houston ↔ Midland in-state pairs', direction: 'inbound', context: 'I-20 long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Midland housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midland → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  ector: [
    { label: 'Within Ector (Odessa core ↔ east US-385 / Loop 338 edges)', direction: 'within', context: 'Permian industrial-residential product — distinct from Midland HQ multi-unit.' },
    { label: 'Energy / industrial workforce relo → Odessa housing', direction: 'inbound', context: 'Shift calendars and shop buildings reshape surveys.' },
    { label: 'Ector ↔ Midland Permian pairs', direction: 'within', context: 'Twin markets; Odessa industrial-res vs Midland HQ product must quote differently.' },
    { label: 'DFW / El Paso ↔ Odessa in-state pairs', direction: 'inbound', context: 'I-20 long locals; TxDMV HHG for pure in-state jobs.' },
    { label: 'Out-of-state → Odessa housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Ector → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
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
  fayette: [
    {
      label: 'Within Fayette (Peachtree City ↔ Fayetteville)',
      direction: 'within',
      context: 'Planned path-city geometry vs seat stock — HOA packets rewrite truck size.',
    },
    {
      label: 'Fulton / Atlanta core → Fayette planned south-metro',
      direction: 'inbound',
      context: 'Parent metro outbound into Peachtree City product — not a Henry I-75 rename.',
      href: '/local-movers/georgia/fulton',
    },
    {
      label: 'Fayette → Fulton / Perimeter job markets',
      direction: 'outbound',
      context: 'South-metro professionals into denser intown stock; empty miles matter.',
      href: '/local-movers/georgia/fulton',
    },
    {
      label: 'Fayette ↔ Henry south-collar pairs',
      direction: 'within',
      context: 'Distinct south collars — path-city logistics vs I-75 growth freeflow.',
      href: '/local-movers/georgia/henry',
    },
    {
      label: 'Northeast → Fayette planned communities',
      direction: 'inbound',
      context: 'School-focused inflows into master-plan SFH; FMCSA for interstate legs.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  douglas: [
    {
      label: 'Within Douglas (Douglasville ↔ I-20 growth villages)',
      direction: 'within',
      context: 'West-metro seat density vs HOA growth — I-20 peaks rewrite short pairs.',
    },
    {
      label: 'Cobb → Douglas I-20 west collar',
      direction: 'inbound',
      context: 'Parent northwest metro outbound into Douglasville product — not a Cobb rename.',
      href: '/local-movers/georgia/cobb',
    },
    {
      label: 'Douglas → Cobb / Fulton job markets',
      direction: 'outbound',
      context: 'West-corridor professionals into denser northwest and intown stock.',
      href: '/local-movers/georgia/cobb',
    },
    {
      label: 'Douglas ↔ Paulding west-metro pairs',
      direction: 'within',
      context: 'I-20 west vs US-278 northwest growth — distinct empty-mile profiles.',
      href: '/local-movers/georgia/paulding',
    },
    {
      label: 'Midwest → Douglas County west-metro suburbs',
      direction: 'inbound',
      context: 'Sun Belt exits into I-20 west housing; inventory surveys for SFH volume.',
      href: '/resources/routes/illinois-to-georgia',
    },
  ],
  coweta: [
    {
      label: 'Within Coweta (Newnan ↔ Senoia / I-85 growth)',
      direction: 'within',
      context: 'Seat multi-story vs film-village and outer HOA growth.',
    },
    {
      label: 'Fulton → Coweta I-85 south outer collar',
      direction: 'inbound',
      context: 'Parent metro outbound into Newnan product — not a Fulton rename.',
      href: '/local-movers/georgia/fulton',
    },
    {
      label: 'Coweta → Fulton / Perimeter job markets',
      direction: 'outbound',
      context: 'SW outer-collar professionals into denser metro stock.',
      href: '/local-movers/georgia/fulton',
    },
    {
      label: 'Senoia film / village seasonal moves',
      direction: 'within',
      context: 'Production and tourism windows can tighten small-town curb plans.',
    },
    {
      label: 'Northeast → Coweta outer SW growth',
      direction: 'inbound',
      context: 'School and space-driven inflows; FMCSA for interstate legs.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  paulding: [
    {
      label: 'Within Paulding (Dallas ↔ Hiram / growth villages)',
      direction: 'within',
      context: 'West-northwest outer growth — HOA packets and US-278 freeflow.',
    },
    {
      label: 'Cobb → Paulding west-northwest collar',
      direction: 'inbound',
      context: 'Parent northwest metro outbound into Hiram–Dallas product — not a Cobb rename.',
      href: '/local-movers/georgia/cobb',
    },
    {
      label: 'Paulding → Cobb / Fulton job markets',
      direction: 'outbound',
      context: 'Outer-collar professionals into denser northwest stock.',
      href: '/local-movers/georgia/cobb',
    },
    {
      label: 'Paulding ↔ Douglas west-metro pairs',
      direction: 'within',
      context: 'US-278 growth vs I-20 west seat — distinct corridor profiles.',
      href: '/local-movers/georgia/douglas',
    },
    {
      label: 'Midwest → Paulding County space & schools',
      direction: 'inbound',
      context: 'Family Sun Belt moves into outer west-northwest SFH.',
      href: '/resources/routes/illinois-to-georgia',
    },
  ],
  columbia: [
    {
      label: 'Within Columbia (Evans ↔ Martinez / growth villages)',
      direction: 'within',
      context: 'CSRA north-collar HOAs — not Augusta core multi-story access.',
    },
    {
      label: 'Richmond / Augusta core → Columbia north collar',
      direction: 'inbound',
      context: 'Parent city outbound into Evans–Martinez product — not a Richmond rename.',
      href: '/local-movers/georgia/richmond',
    },
    {
      label: 'Columbia → Augusta medical / job corridors',
      direction: 'outbound',
      context: 'North-collar professionals into denser Richmond stock; portal-to-portal peaks.',
      href: '/local-movers/georgia/richmond',
    },
    {
      label: 'Columbia → South Carolina border pairs',
      direction: 'outbound',
      context: 'Short-looking border hops still need FMCSA authority.',
    },
    {
      label: 'Atlanta metro → CSRA / Columbia County',
      direction: 'inbound',
      context: 'I-20 east family and school-driven moves into north-collar suburbs.',
    },
  ],
  houston: [
    {
      label: 'Within Houston (Warner Robins ↔ base-adjacent multi-family)',
      direction: 'within',
      context: 'PCS windows spike apartment turnover — not a pure SFH suburban day.',
    },
    {
      label: 'Robins AFB PCS inbound / outbound cycles',
      direction: 'inbound',
      context: 'Order calendars create multi-family clusters; book early on peak PCS months.',
    },
    {
      label: 'Houston ↔ Bibb / Macon regional pairs',
      direction: 'outbound',
      context: 'Middle GA hub hops — not interchangeable with Warner Robins-only rates.',
      href: '/local-movers/georgia/bibb',
    },
    {
      label: 'Atlanta metro → Warner Robins / Houston County',
      direction: 'inbound',
      context: 'I-75 south military-regional inflows; empty miles change pricing vs metro collar hops.',
    },
    {
      label: 'Houston → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Military and family long-distance; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-jersey-to-florida',
    },
  ],
  bibb: [
    {
      label: 'Within Bibb (Macon core ↔ medical/university corridors)',
      direction: 'within',
      context: 'Multi-story and campus-adjacent stock — stairs and curb rules dominate.',
    },
    {
      label: 'Houston / Warner Robins → Macon hub',
      direction: 'inbound',
      context: 'Middle GA regional inflows into medical/university product — not a Houston rename.',
      href: '/local-movers/georgia/houston',
    },
    {
      label: 'Bibb → Houston / Robins AFB pairs',
      direction: 'outbound',
      context: 'Hub-to-base logistics; PCS calendars can still affect destination multi-family.',
      href: '/local-movers/georgia/houston',
    },
    {
      label: 'Atlanta metro → Macon / Bibb County',
      direction: 'inbound',
      context: 'I-75 south regional hub inflows; not an Atlanta collar HOA script.',
    },
    {
      label: 'Bibb → Florida / coastal Georgia exits',
      direction: 'outbound',
      context: 'I-75 / I-16 long-distance; inventory-driven interstate pricing.',
    },
  ],
  clarke: [
    {
      label: 'Within Clarke (Downtown Athens ↔ campus multi-family)',
      direction: 'within',
      context: 'UGA term calendars spike student multi-family — not pure suburban SFH rates.',
    },
    {
      label: 'Gwinnett / Atlanta collar → Athens UGA hub',
      direction: 'inbound',
      context: 'Metro outbound into independent university product — not a Gwinnett rename.',
      href: '/local-movers/georgia/gwinnett',
    },
    {
      label: 'UGA term-start / term-end moves',
      direction: 'within',
      context: 'Student and faculty calendars fill crews first — book curb windows early.',
    },
    {
      label: 'Clarke → Atlanta job markets',
      direction: 'outbound',
      context: 'University exits into denser metro stock; multi-hour same-state logistics.',
      href: '/local-movers/georgia/fulton',
    },
    {
      label: 'Northeast → Athens / Clarke County',
      direction: 'inbound',
      context: 'University and professional inflows; FMCSA for interstate legs.',
      href: '/resources/routes/new-jersey-to-georgia',
    },
  ],
  bartow: [
    { label: 'Within Bartow (Cartersville ↔ Allatoona edge / I-75 growth)', direction: 'within', context: 'I-75 NW outer growth — lake last-mile and HOA packets differ by pocket.' },
    { label: 'Cobb → Bartow I-75 northwest collar', direction: 'inbound', context: 'Parent northwest metro outbound into Cartersville product — not a Cobb rename.', href: '/local-movers/georgia/cobb' },
    { label: 'Bartow → Cobb / Perimeter job markets', direction: 'outbound', context: 'Outer NW professionals into denser northwest stock.', href: '/local-movers/georgia/cobb' },
    { label: 'Bartow ↔ Cherokee north-metro pairs', direction: 'within', context: 'I-75 NW vs I-575 growth — distinct empty-mile profiles.', href: '/local-movers/georgia/cherokee' },
    { label: 'Midwest → Bartow County space & schools', direction: 'inbound', context: 'Sun Belt exits into I-75 NW housing; FMCSA for interstate legs.', href: '/resources/routes/illinois-to-georgia' },
  ],
  carroll: [
    { label: 'Within Carroll (Carrollton ↔ campus / I-20 growth)', direction: 'within', context: 'University multi-family vs outer-west HOA growth.' },
    { label: 'Douglas → Carroll west-outer ring', direction: 'inbound', context: 'Parent I-20 west outbound into Carrollton product — not a Douglas rename.', href: '/local-movers/georgia/douglas' },
    { label: 'Carroll → Douglas / Atlanta job markets', direction: 'outbound', context: 'Outer-west professionals into denser west-metro stock.', href: '/local-movers/georgia/douglas' },
    { label: 'University term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Carroll → Alabama border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
  ],
  rockdale: [
    { label: 'Within Rockdale (Conyers ↔ I-20 corridors / HOA villages)', direction: 'within', context: 'East-inner collar freeflow — not Newton outer growth alone.' },
    { label: 'DeKalb → Rockdale I-20 east inner collar', direction: 'inbound', context: 'Parent east-metro outbound into Conyers product — not a DeKalb rename.', href: '/local-movers/georgia/dekalb' },
    { label: 'Rockdale → DeKalb / Atlanta job markets', direction: 'outbound', context: 'East-collar professionals into denser intown stock.', href: '/local-movers/georgia/dekalb' },
    { label: 'Rockdale ↔ Newton east-collar pairs', direction: 'within', context: 'Inner Conyers freeflow vs outer Covington growth — distinct profiles.', href: '/local-movers/georgia/newton' },
    { label: 'Northeast → Rockdale east-metro suburbs', direction: 'inbound', context: 'School-focused inflows; FMCSA for interstate legs.', href: '/resources/routes/new-jersey-to-georgia' },
  ],
  newton: [
    { label: 'Within Newton (Covington ↔ film edge / I-20 growth)', direction: 'within', context: 'Outer-east growth and film-adjacent stock — not Rockdale inner freeflow alone.' },
    { label: 'Rockdale → Newton I-20 east outer collar', direction: 'inbound', context: 'Parent east-inner outbound into Covington product — not a Rockdale rename.', href: '/local-movers/georgia/rockdale' },
    { label: 'Newton → Rockdale / Atlanta job markets', direction: 'outbound', context: 'Outer-east professionals into denser east-collar stock.', href: '/local-movers/georgia/rockdale' },
    { label: 'Film / village seasonal moves', direction: 'within', context: 'Production windows can tighten small-town curb plans.' },
    { label: 'Midwest → Newton County east-metro growth', direction: 'inbound', context: 'Family Sun Belt moves into outer I-20 housing.', href: '/resources/routes/illinois-to-georgia' },
  ],
  barrow: [
    { label: 'Within Barrow (Winder ↔ GA-316 growth villages)', direction: 'within', context: 'Outer NE growth — HOA packets and 316 freeflow.' },
    { label: 'Gwinnett → Barrow GA-316 outer collar', direction: 'inbound', context: 'Parent NE metro outbound into Winder product — not a Gwinnett rename.', href: '/local-movers/georgia/gwinnett' },
    { label: 'Barrow → Gwinnett / Atlanta job markets', direction: 'outbound', context: 'Outer NE professionals into denser I-85 stock.', href: '/local-movers/georgia/gwinnett' },
    { label: 'Barrow ↔ Walton east-of-Gwinnett pairs', direction: 'within', context: 'GA-316 vs US-78 east growth — distinct spines.', href: '/local-movers/georgia/walton' },
    { label: 'Northeast → Barrow County outer NE growth', direction: 'inbound', context: 'School and space-driven inflows; FMCSA for interstate legs.', href: '/resources/routes/new-jersey-to-georgia' },
  ],
  walton: [
    { label: 'Within Walton (Monroe ↔ US-78 growth villages)', direction: 'within', context: 'East-of-Gwinnett growth — not Barrow 316 or Newton I-20 alone.' },
    { label: 'Gwinnett → Walton US-78 east collar', direction: 'inbound', context: 'Parent NE metro outbound into Monroe product — not a Gwinnett rename.', href: '/local-movers/georgia/gwinnett' },
    { label: 'Walton → Gwinnett / Atlanta job markets', direction: 'outbound', context: 'East-outer professionals into denser metro stock.', href: '/local-movers/georgia/gwinnett' },
    { label: 'Walton ↔ Newton / Barrow neighbor pairs', direction: 'within', context: 'US-78 east vs I-20 outer and GA-316 — distinct freeflow.', href: '/local-movers/georgia/newton' },
    { label: 'Midwest → Walton County space & schools', direction: 'inbound', context: 'Family Sun Belt moves into east-of-Gwinnett SFH.', href: '/resources/routes/illinois-to-georgia' },
  ],
  floyd: [
    { label: 'Within Floyd (Rome core ↔ medical/university corridors)', direction: 'within', context: 'Regional hub multi-story — not Atlanta collar HOA defaults.' },
    { label: 'Atlanta metro → Rome / Floyd County', direction: 'inbound', context: 'NW GA regional hub inflows; multi-hour same-state logistics.' },
    { label: 'Floyd ↔ Bartow / I-75 NW pairs', direction: 'outbound', context: 'Regional hops toward I-75 growth — not interchangeable with Rome-only rates.', href: '/local-movers/georgia/bartow' },
    { label: 'Medical / university corridor moves', direction: 'within', context: 'Campus and clinical calendars rewrite demand spikes.' },
    { label: 'Floyd → Alabama / Tennessee border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
  ],
  whitfield: [
    { label: 'Within Whitfield (Dalton ↔ industrial-edge residential)', direction: 'within', context: 'Manufacturing-shift freeflow rewrites short-looking pairs.' },
    { label: 'Atlanta metro → Dalton / Whitfield County', direction: 'inbound', context: 'I-75 north manufacturing-hub inflows — not an Atlanta collar HOA script.' },
    { label: 'Whitfield → Tennessee border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Whitfield ↔ Floyd NW GA regional pairs', direction: 'within', context: 'Manufacturing corridor vs Rome medical hub — distinct products.', href: '/local-movers/georgia/floyd' },
    { label: 'Midwest → Dalton manufacturing corridors', direction: 'inbound', context: 'Industrial hiring pulls; inventory surveys for SFH and multi-story mix.', href: '/resources/routes/illinois-to-georgia' },
  ],
  lowndes: [
    { label: 'Within Lowndes (Valdosta ↔ campus multi-family)', direction: 'within', context: 'University term calendars spike student multi-family — not pure rural rates.' },
    { label: 'Atlanta metro → Valdosta / Lowndes County', direction: 'inbound', context: 'I-75 south regional hub inflows — not an Atlanta collar rename.' },
    { label: 'UGA-style term-start / term-end moves (Valdosta)', direction: 'within', context: 'Student and faculty calendars fill crews first — book curb windows early.' },
    { label: 'Lowndes → Florida border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Lowndes → Middle GA / Houston hub pairs', direction: 'outbound', context: 'I-75 north regional logistics toward Warner Robins / Macon corridors.', href: '/local-movers/georgia/houston' },
  ],
  glynn: [
    { label: 'Within Glynn (Brunswick ↔ St. Simons / Golden Isles)', direction: 'within', context: 'Mainland multi-story vs island causeway last-mile — truck type changes.' },
    { label: 'Atlanta / inland GA → Golden Isles coastal', direction: 'inbound', context: 'Seasonal and lifestyle inflows; island access dominates the plan.' },
    { label: 'Glynn → Chatham / Savannah coastal pairs', direction: 'outbound', context: 'Coast-to-coast logistics — not a Savannah historic-district script.', href: '/local-movers/georgia/chatham' },
    { label: 'Island tourism / second-home seasonal moves', direction: 'within', context: 'Summer and holiday peaks tighten causeway and resort staging.' },
    { label: 'Northeast → Brunswick / Golden Isles', direction: 'inbound', context: 'Coastal lifestyle inflows; FMCSA for interstate legs.', href: '/resources/routes/new-jersey-to-georgia' },
  ],
  dougherty: [
    { label: 'Within Dougherty (Albany core ↔ medical corridors)', direction: 'within', context: 'SW GA hub multi-story and medical freeflow — not Atlanta HOA defaults.' },
    { label: 'Atlanta metro → Albany / Dougherty County', direction: 'inbound', context: 'SW GA regional hub inflows; multi-hour same-state logistics.' },
    { label: 'Dougherty ↔ Lowndes / Valdosta regional pairs', direction: 'outbound', context: 'South GA hub hops — not interchangeable with Albany-only rates.', href: '/local-movers/georgia/lowndes' },
    { label: 'Medical corridor residential moves', direction: 'within', context: 'Clinical calendars rewrite demand spikes.' },
    { label: 'Dougherty → Florida / Alabama border pairs', direction: 'outbound', context: 'Border destinations need FMCSA authority.' },
  ],
  troup: [
    { label: 'Within Troup (LaGrange ↔ I-85 growth / industrial edge)', direction: 'within', context: 'I-85 west hub multi-story vs growth HOAs — not Coweta Newnan film-edge alone.' },
    { label: 'Coweta → Troup I-85 west corridor', direction: 'inbound', context: 'Parent SW outer outbound into LaGrange product — not a Coweta rename.', href: '/local-movers/georgia/coweta' },
    { label: 'Troup → Coweta / Atlanta job markets', direction: 'outbound', context: 'West-GA professionals into denser outer-collar stock.', href: '/local-movers/georgia/coweta' },
    { label: 'Troup → Alabama border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Midwest → LaGrange / Troup County', direction: 'inbound', context: 'I-85 west industrial and family inflows; FMCSA for interstate legs.', href: '/resources/routes/illinois-to-georgia' },
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
  // ——— NY Tier 2 Wave 1 (parent-biased routes) ———
  rockland: [
    {
      label: 'Within Rockland (New City ↔ Nyack / Spring Valley)',
      direction: 'within',
      context:
        'Seat suburbs vs river-village grids and multi-family density — access profiles differ by zone.',
    },
    {
      label: 'Westchester → Rockland reverse / bridge pairs',
      direction: 'inbound',
      context:
        'Parent-market hops over Cuomo Bridge / I-287; portal-to-portal time dominates short-looking pairs.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'Bergen / NJ → Rockland multi-family & suburbs',
      direction: 'inbound',
      context:
        'Cross-state collar moves; FMCSA authority required even when drive time feels local.',
      href: '/local-movers/new-jersey/bergen',
    },
    {
      label: 'Rockland → NYC borough career & family moves',
      direction: 'outbound',
      context:
        'North-collar exits into elevators and street permits; destination COIs dominate arrival day.',
    },
    {
      label: 'Rockland → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Suburban snowbird path; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Manhattan / Bronx → Rockland schools & space',
      direction: 'inbound',
      context:
        'Classic NYC→north-collar upgrade; origin elevators and destination driveway/HOA rules on one job.',
    },
  ],
  orange: [
    {
      label: 'Within Orange (Newburgh ↔ Middletown / Woodbury)',
      direction: 'within',
      context:
        'River-city stairs vs inland multi-family and retail-corridor SFH — truck type changes by zone.',
    },
    {
      label: 'Westchester / Rockland → Orange outer collar',
      direction: 'inbound',
      context:
        'Parent-biased I-87/I-84 upgrades into larger-lot and mid-market Orange product.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'Orange → Westchester / NYC job markets',
      direction: 'outbound',
      context:
        'Outer-collar professionals moving closer to city density; destination elevators dominate.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'NJ / PA → Orange Hudson Valley stock',
      direction: 'inbound',
      context:
        'Interstate collar inflows; confirm FMCSA when either address is out of New York.',
    },
    {
      label: 'Orange → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Family long-distance; volume estimates drive linehaul more than local hourly rates.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Woodbury / Warwick growth SFH moves',
      direction: 'within',
      context:
        'HOA packets and arterial retail peaks — not a Newburgh multi-story plan.',
    },
  ],
  dutchess: [
    {
      label: 'Within Dutchess (Poughkeepsie ↔ Beacon / Arlington)',
      direction: 'within',
      context:
        'City multi-story vs rail-village density and eastern lots — access changes by pocket.',
    },
    {
      label: 'Orange / Westchester → Dutchess Mid Hudson',
      direction: 'inbound',
      context:
        'Parent-biased collar moves along I-84 / US-9 into Poughkeepsie–Beacon product.',
      href: '/local-movers/new-york/orange',
    },
    {
      label: 'Dutchess → NYC / Westchester rail-commute markets',
      direction: 'outbound',
      context:
        'Metro-North corridor professionals; destination elevators and permits dominate arrival.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'CT / Mid-Atlantic → Dutchess lifestyle inflows',
      direction: 'inbound',
      context:
        'Interstate household goods into mixed-density Mid Hudson stock; verify FMCSA authority.',
    },
    {
      label: 'Dutchess → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Hudson Valley snowbird path; multi-day interstate with careful packing scope.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Eastern Dutchess larger-lot / Amenia edges',
      direction: 'within',
      context:
        'Long empty miles and driveway approaches — not a Beacon village quote.',
    },
  ],
  putnam: [
    {
      label: 'Within Putnam (Carmel ↔ Brewster / Lake Carmel)',
      direction: 'within',
      context:
        'Seat suburbs vs lake/hill last-mile — shuttles and long driveways appear often.',
    },
    {
      label: 'Westchester → Putnam outer north collar',
      direction: 'inbound',
      context:
        'Parent-market upgrades into lower-density Putnam product along I-84 / Taconic.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'Putnam → Westchester / NYC job markets',
      direction: 'outbound',
      context:
        'Outer-collar professionals moving south; destination access is denser than origin lots.',
      href: '/local-movers/new-york/westchester',
    },
    {
      label: 'CT → Putnam cross-border pairs',
      direction: 'inbound',
      context:
        'Short interstate when crossing the state line; confirm authority even when drive time looks local.',
    },
    {
      label: 'Putnam → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Family long-distance from collar suburbs; FMCSA carriers and volume surveys required.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Lake / hill last-mile specialty moves',
      direction: 'within',
      context:
        'Wooded approaches and seasonal ice — photo the driveway before quoting a pure local rate.',
    },
  ],
  saratoga: [
    {
      label: 'Within Saratoga (Saratoga Springs ↔ Clifton Park / Ballston Spa)',
      direction: 'within',
      context:
        'Tourism village density vs planned-suburb HOAs — calendars and truck type change by zone.',
    },
    {
      label: 'Albany County → Saratoga north growth',
      direction: 'inbound',
      context:
        'Parent Capital Region outbound along I-87 into Clifton Park and Springs product.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Saratoga → Albany capital / government markets',
      direction: 'outbound',
      context:
        'North-collar professionals into Capital multifamily and HOA suburbs.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'New England / Mid-Atlantic → Saratoga lifestyle inflows',
      direction: 'inbound',
      context:
        'Tourism-adjacent and remote-work arrivals; peak race/track seasons tighten staging.',
    },
    {
      label: 'Saratoga → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Capital-north snowbird path; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Saratoga Springs tourism-season local moves',
      direction: 'within',
      context:
        'Village streets and event calendars — book early around peak summer weekends.',
    },
  ],
  schenectady: [
    {
      label: 'Within Schenectady (City core ↔ Niskayuna / Rotterdam)',
      direction: 'within',
      context:
        'Urban multi-story vs first-ring suburbs — stairs and HOAs on the same county label.',
    },
    {
      label: 'Albany County → Schenectady west collar',
      direction: 'inbound',
      context:
        'Parent Capital metro hops west along NY-5 / I-890 into Schenectady product.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Schenectady → Albany capital markets',
      direction: 'outbound',
      context:
        'West-collar professionals into Capital core and Colonie-style suburbs.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Saratoga / north Capital → Schenectady pairs',
      direction: 'inbound',
      context:
        'Regional Capital District logistics; treat as portal-to-portal days, not pure map miles.',
      href: '/local-movers/new-york/saratoga',
    },
    {
      label: 'Schenectady → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Capital-collar long-distance; FMCSA carriers and volume estimates required.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'GE / tech-adjacent apartment & SFH moves',
      direction: 'within',
      context:
        'Lease clusters and building packets near employment corridors — confirm management rules early.',
    },
  ],
  rensselaer: [
    {
      label: 'Within Rensselaer (Troy ↔ East Greenbush / Rensselaer city)',
      direction: 'within',
      context:
        'East-bank multi-story vs suburban SFH — river hills and stairs change crew plans.',
    },
    {
      label: 'Albany County → Rensselaer east collar',
      direction: 'inbound',
      context:
        'Parent Capital hops across the Hudson / I-90 into Troy and East Greenbush product.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Rensselaer → Albany capital / west-bank markets',
      direction: 'outbound',
      context:
        'East-collar professionals into Capital multifamily and state-worker suburbs.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Massachusetts / New England → Rensselaer inflows',
      direction: 'inbound',
      context:
        'I-90 corridor arrivals into east-bank stock; winter weather shapes delivery windows.',
    },
    {
      label: 'Rensselaer → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Capital-east snowbird path; multi-day interstate with careful inventory surveys.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Troy multi-story & college-adjacent moves',
      direction: 'within',
      context:
        'Stairs, tight streets, and term calendars — not an East Greenbush driveway plan.',
    },
  ],
  niagara: [
    {
      label: 'Within Niagara (Niagara Falls ↔ North Tonawanda / Lockport)',
      direction: 'within',
      context:
        'Tourism multi-story vs north-collar SFH — staging rules change by zone.',
    },
    {
      label: 'Erie / Buffalo → Niagara north collar',
      direction: 'inbound',
      context:
        'Parent-market hops along I-190 / NY-104 into Falls and Northtowns product.',
      href: '/local-movers/new-york/erie',
    },
    {
      label: 'Niagara → Buffalo / Erie job markets',
      direction: 'outbound',
      context:
        'North-collar professionals into Buffalo core and Southtowns HOAs.',
      href: '/local-movers/new-york/erie',
    },
    {
      label: 'Canada / border-adjacent specialized moves',
      direction: 'outbound',
      context:
        'Cross-border logistics need specialized authority — not a pure local NY day.',
    },
    {
      label: 'Niagara → Florida snowbird exits',
      direction: 'outbound',
      context:
        'Western NY→Sun Belt long-distance; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Falls tourism-season multi-story moves',
      direction: 'within',
      context:
        'Visitor parking and peak weekends rewrite curb plans — book early in summer.',
    },
  ],
  oneida: [
    {
      label: 'Within Oneida (Utica ↔ Rome / New Hartford)',
      direction: 'within',
      context:
        'City multi-story vs suburban belts — I-90 empty miles appear on cross-valley pairs.',
    },
    {
      label: 'Onondaga / Syracuse → Oneida Mohawk Valley',
      direction: 'inbound',
      context:
        'Parent Central NY hops east along I-90 into Utica–Rome product — not a Syracuse rename.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Oneida → Syracuse / Onondaga job markets',
      direction: 'outbound',
      context:
        'Mohawk Valley professionals into Syracuse university and medical stock.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Albany / Capital → Oneida mid-state pairs',
      direction: 'inbound',
      context:
        'I-90 corridor logistics days; treat empty miles honestly on the estimate.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Oneida → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Mid-state snowbird path; FMCSA carriers and volume estimates required.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Rome / Griffiss-adjacent local moves',
      direction: 'within',
      context:
        'Corridor SFH and employment-adjacent leases — not a pure Utica walk-up plan.',
    },
  ],
  broome: [
    {
      label: 'Within Broome (Binghamton ↔ Vestal / Endicott)',
      direction: 'within',
      context:
        'University multi-story vs suburban belts — term calendars spike local demand.',
    },
    {
      label: 'Pennsylvania → Binghamton Southern Tier hub',
      direction: 'inbound',
      context:
        'I-81 interstate inflows into university and regional employment stock; FMCSA required.',
    },
    {
      label: 'Broome → Syracuse / Central NY pairs',
      direction: 'outbound',
      context:
        'Southern Tier ↔ Central NY logistics; not interchangeable with Binghamton-only rates.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Broome → NYC / downstate career moves',
      direction: 'outbound',
      context:
        'Independent hub exits to elevators and street permits; destination COIs dominate arrival.',
    },
    {
      label: 'Broome → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Southern Tier snowbird path; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Binghamton University term-start / term-end moves',
      direction: 'within',
      context:
        'Student and faculty calendars fill crews first — book elevators and curb windows early.',
    },
  ],
  ulster: [
    {
      label: 'Within Ulster (Kingston ↔ New Paltz / Saugerties)',
      direction: 'within',
      context:
        'River-city stock vs college-town density and Catskills-edge lots — access differs by pocket.',
    },
    {
      label: 'Orange / Dutchess → Ulster west Hudson',
      direction: 'inbound',
      context:
        'Parent Hudson Valley hops west into Kingston–New Paltz product along I-87 / NY-299.',
      href: '/local-movers/new-york/orange',
    },
    {
      label: 'Ulster → Orange / NYC-collar job markets',
      direction: 'outbound',
      context:
        'West-bank professionals moving toward denser collar employment.',
      href: '/local-movers/new-york/orange',
    },
    {
      label: 'NYC / downstate → Ulster lifestyle & second-home inflows',
      direction: 'inbound',
      context:
        'Catskills-edge and college-town arrivals; tourism peaks tighten village staging.',
    },
    {
      label: 'Ulster → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Hudson west long-distance; FMCSA carriers and volume surveys required.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'New Paltz college-town & tourism-season moves',
      direction: 'within',
      context:
        'Term calendars and weekend tourism rewrite curb plans — not a pure Kingston driveway day.',
    },
  ],
  ontario: [
    {
      label: 'Within Ontario (Canandaigua ↔ Geneva / Victor)',
      direction: 'within',
      context:
        'Finger Lakes village stock vs Victor growth HOAs — lake access and planned suburbs differ.',
    },
    {
      label: 'Monroe / Rochester → Ontario south collar',
      direction: 'inbound',
      context:
        'Parent Rochester metro outbound into Canandaigua–Victor product — not a Monroe rename.',
      href: '/local-movers/new-york/monroe',
    },
    {
      label: 'Ontario → Rochester / Monroe job markets',
      direction: 'outbound',
      context:
        'South-collar professionals into university and medical Rochester stock.',
      href: '/local-movers/new-york/monroe',
    },
    {
      label: 'Finger Lakes tourism / second-home seasonal moves',
      direction: 'within',
      context:
        'Lake-edge access and summer peaks — photo approaches and plan weekend staging carefully.',
    },
    {
      label: 'Ontario → Florida retirement corridors',
      direction: 'outbound',
      context:
        'Finger Lakes snowbird path; multi-day interstate with inventory-driven pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
    {
      label: 'Victor growth HOA & Canandaigua village pairs',
      direction: 'within',
      context:
        'Planned-community packets vs village streets — truck type and hours change by address.',
    },
  ],
  tompkins: [
    {
      label: 'Within Tompkins (Ithaca ↔ Lansing / Dryden)',
      direction: 'within',
      context: 'Hill multi-story vs outer SFH — university term calendars spike local demand.',
    },
    {
      label: 'Broome / Southern Tier → Ithaca university hub',
      direction: 'inbound',
      context: 'Regional inflows into Cornell/Ithaca College product — not a Broome rename.',
      href: '/local-movers/new-york/broome',
    },
    {
      label: 'Tompkins → Syracuse / Central NY pairs',
      direction: 'outbound',
      context: 'Finger Lakes ↔ Central NY logistics; FMCSA when any leg leaves New York.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Tompkins → NYC / downstate career moves',
      direction: 'outbound',
      context: 'University exits to elevators and street permits; destination COIs dominate arrival.',
    },
    {
      label: 'Cornell / Ithaca College term-start / term-end moves',
      direction: 'within',
      context: 'Student and faculty calendars fill crews first — book curb windows early.',
    },
  ],
  chemung: [
    {
      label: 'Within Chemung (Elmira ↔ Horseheads / Big Flats)',
      direction: 'within',
      context: 'City multi-story vs growth corridors — not Binghamton university density.',
    },
    {
      label: 'Broome → Chemung Southern Tier west',
      direction: 'inbound',
      context: 'Parent Southern Tier hops west into Elmira–Horseheads product along I-86.',
      href: '/local-movers/new-york/broome',
    },
    {
      label: 'Chemung → Broome / Binghamton hub',
      direction: 'outbound',
      context: 'Eastbound Southern Tier employment and university pairs.',
      href: '/local-movers/new-york/broome',
    },
    {
      label: 'Pennsylvania → Elmira Southern Tier',
      direction: 'inbound',
      context: 'I-86 interstate inflows; FMCSA required on any PA leg.',
    },
    {
      label: 'Chemung → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Southern Tier long-distance; inventory-driven interstate pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  jefferson: [
    {
      label: 'Within Jefferson (Watertown ↔ Fort Drum adjacent)',
      direction: 'within',
      context: 'City multi-story vs base multi-family — PCS windows spike demand.',
    },
    {
      label: 'Syracuse / Central NY → Watertown / Fort Drum',
      direction: 'inbound',
      context: 'Military-regional inflows north on I-81 — not an Onondaga rename.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Fort Drum PCS outbound / inbound cycles',
      direction: 'outbound',
      context: 'Order calendars create multi-family turnover; book early on peak PCS months.',
    },
    {
      label: 'Jefferson → North Country / St. Lawrence pairs',
      direction: 'outbound',
      context: 'Longer empty-mile regional logistics across North Country spines.',
    },
    {
      label: 'Jefferson → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Military and family long-distance; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  chautauqua: [
    {
      label: 'Within Chautauqua (Jamestown ↔ Dunkirk / Fredonia)',
      direction: 'within',
      context: 'Secondary city multi-story vs lake/college edges — lake-effect winter matters.',
    },
    {
      label: 'Erie / Buffalo → Chautauqua western NY',
      direction: 'inbound',
      context: 'Parent metro outbound into Jamestown–lake product — not an Erie rename.',
      href: '/local-movers/new-york/erie',
    },
    {
      label: 'Chautauqua → Buffalo / Erie job markets',
      direction: 'outbound',
      context: 'Western NY professionals into denser Buffalo multi-story stock.',
      href: '/local-movers/new-york/erie',
    },
    {
      label: 'Chautauqua Institution / lake seasonal moves',
      direction: 'within',
      context: 'Summer tourism rewrites village staging — not a pure Jamestown driveway day.',
    },
    {
      label: 'Chautauqua → PA / OH / Florida exits',
      direction: 'outbound',
      context: 'Border and long-distance legs need FMCSA authority.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  clinton: [
    {
      label: 'Within Clinton (Plattsburgh ↔ lake edge / rural)',
      direction: 'within',
      context: 'North Country city multi-story vs lake and rural empty miles.',
    },
    {
      label: 'Capital Region / Saratoga → Plattsburgh North Country',
      direction: 'inbound',
      context: 'Long I-87 north inflows — not Saratoga growth suburbs renamed.',
      href: '/local-movers/new-york/saratoga',
    },
    {
      label: 'Clinton → Vermont / border-adjacent pairs',
      direction: 'outbound',
      context: 'Short-looking border hops still need FMCSA authority.',
    },
    {
      label: 'Clinton → Albany / Capital job markets',
      direction: 'outbound',
      context: 'Southbound Northway career moves into denser capital stock.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'Clinton → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'North Country long-distance; multi-day interstate with inventory pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  'st-lawrence': [
    {
      label: 'Within St. Lawrence (Canton / Potsdam ↔ Massena)',
      direction: 'within',
      context: 'College multi-family vs river industrial city — extreme empty miles are real.',
    },
    {
      label: 'Jefferson / Watertown → St. Lawrence North Country',
      direction: 'inbound',
      context: 'Regional North Country hops into dispersed college and river stock.',
      href: '/local-movers/new-york/jefferson',
    },
    {
      label: 'Canton / Potsdam term-start / term-end moves',
      direction: 'within',
      context: 'College calendars fill crews without Binghamton-style continuous density.',
    },
    {
      label: 'St. Lawrence → Canada-facing / border pairs',
      direction: 'outbound',
      context: 'Border-adjacent destinations need FMCSA authority clarity.',
    },
    {
      label: 'St. Lawrence → Syracuse / downstate exits',
      direction: 'outbound',
      context: 'Long empty-mile starts into denser metro stock; inventory-driven pricing.',
      href: '/local-movers/new-york/onondaga',
    },
  ],
  oswego: [
    {
      label: 'Within Oswego (Oswego city ↔ Fulton / lake towns)',
      direction: 'within',
      context: 'Lake-city multi-story vs inland corridors — lake-effect winter rewrites mornings.',
    },
    {
      label: 'Onondaga / Syracuse → Oswego Lake Ontario edge',
      direction: 'inbound',
      context: 'Parent Central NY outbound north — not an Onondaga rename.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Oswego → Syracuse / Onondaga job markets',
      direction: 'outbound',
      context: 'North-edge professionals into denser university and medical stock.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Oswego college term-start / term-end moves',
      direction: 'within',
      context: 'Student multi-family clusters; book curb windows early.',
    },
    {
      label: 'Oswego → Florida retirement corridors',
      direction: 'outbound',
      context: 'Lake Ontario snowbird path; FMCSA carriers only for interstate.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  cayuga: [
    {
      label: 'Within Cayuga (Auburn ↔ lake villages)',
      direction: 'within',
      context: 'Seat multi-story vs Finger Lakes village stock — seasonal lake access differs.',
    },
    {
      label: 'Onondaga / Syracuse → Auburn Finger Lakes',
      direction: 'inbound',
      context: 'Parent Central NY outbound into mid-corridor Auburn product.',
      href: '/local-movers/new-york/onondaga',
    },
    {
      label: 'Monroe / Rochester → Cayuga mid-corridor',
      direction: 'inbound',
      context: 'West-side inflows along I-90 / NY-5–20 — not a Monroe HOA rename.',
      href: '/local-movers/new-york/monroe',
    },
    {
      label: 'Cayuga → Syracuse or Rochester job markets',
      direction: 'outbound',
      context: 'Between-metro freeflow pairs; price portal-to-portal honestly.',
    },
    {
      label: 'Cayuga → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Finger Lakes long-distance; inventory-driven interstate pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  steuben: [
    {
      label: 'Within Steuben (Corning ↔ Hornell / Bath)',
      direction: 'within',
      context: 'Industrial-edge multi-story vs seat corridors and ridge empty miles.',
    },
    {
      label: 'Broome / Chemung → Steuben Southern Tier west',
      direction: 'inbound',
      context: 'Parent Southern Tier hops west into Corning–Hornell product on I-86.',
      href: '/local-movers/new-york/broome',
    },
    {
      label: 'Steuben → Chemung / Elmira pairs',
      direction: 'outbound',
      context: 'Eastbound Southern Tier logistics — not a Broome university script.',
      href: '/local-movers/new-york/chemung',
    },
    {
      label: 'Pennsylvania → Corning / Hornell',
      direction: 'inbound',
      context: 'Border-adjacent interstate inflows; FMCSA required.',
    },
    {
      label: 'Steuben → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Southern Tier long-distance; multi-day interstate pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  sullivan: [
    {
      label: 'Within Sullivan (Monticello ↔ Liberty / Fallsburg)',
      direction: 'within',
      context: 'Seat multi-story vs resort corridors — summer peaks rewrite staging.',
    },
    {
      label: 'Ulster / Orange → Sullivan Catskills interior',
      direction: 'inbound',
      context: 'Parent Hudson Valley hops into Monticello–resort product — not an Ulster rename.',
      href: '/local-movers/new-york/ulster',
    },
    {
      label: 'Sullivan → Orange / NYC-collar job markets',
      direction: 'outbound',
      context: 'Catskills exits toward denser outer-collar employment.',
      href: '/local-movers/new-york/orange',
    },
    {
      label: 'NYC / downstate → Sullivan second-home & resort inflows',
      direction: 'inbound',
      context: 'Seasonal and lifestyle arrivals; mountain last-mile dominates the plan.',
    },
    {
      label: 'Sullivan → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Catskills long-distance; FMCSA carriers and volume surveys required.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  warren: [
    {
      label: 'Within Warren (Glens Falls ↔ Queensbury / Lake George)',
      direction: 'within',
      context: 'Seat multi-story vs retail corridors and seasonal lake villages.',
    },
    {
      label: 'Saratoga / Capital → Warren Adirondack south',
      direction: 'inbound',
      context: 'Parent Capital-collar hops north into Glens Falls–Lake George product — not Saratoga renamed.',
      href: '/local-movers/new-york/saratoga',
    },
    {
      label: 'Warren → Saratoga / Albany job markets',
      direction: 'outbound',
      context: 'Southbound Northway career moves into denser capital-collar stock.',
      href: '/local-movers/new-york/saratoga',
    },
    {
      label: 'Lake George seasonal / tourism moves',
      direction: 'within',
      context: 'Summer peaks tighten village streets — not a pure Queensbury driveway day.',
    },
    {
      label: 'Warren → Florida / Sun Belt exits',
      direction: 'outbound',
      context: 'Adirondack-south long-distance; inventory-driven interstate pricing.',
      href: '/resources/routes/new-york-to-florida',
    },
  ],
  columbia: [
    {
      label: 'Within Columbia (Hudson ↔ Chatham / Kinderhook)',
      direction: 'within',
      context: 'Historic multi-story vs village stock — narrow streets rewrite truck size.',
    },
    {
      label: 'Dutchess → Columbia Upper Hudson',
      direction: 'inbound',
      context: 'Parent east-bank hops north into Hudson historic product — not a Dutchess rename.',
      href: '/local-movers/new-york/dutchess',
    },
    {
      label: 'Columbia → Albany / Capital job markets',
      direction: 'outbound',
      context: 'Upper Hudson professionals into denser capital stock.',
      href: '/local-movers/new-york/albany',
    },
    {
      label: 'NYC / downstate → Columbia second-home inflows',
      direction: 'inbound',
      context: 'Arts and weekend arrivals; historic curb rules dominate Hudson city jobs.',
    },
    {
      label: 'Columbia → Massachusetts / Florida exits',
      direction: 'outbound',
      context: 'Border and long-distance legs need FMCSA authority.',
      href: '/resources/routes/new-york-to-florida',
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
    { label: 'Within Pinal (San Tan Valley ↔ Casa Grande / Florence)', direction: 'within', context: 'Outer-corridor HOA growth vs industrial multi-unit — not East Valley elevator defaults.' },
    { label: 'Maricopa → Pinal I-10 / AZ-347 corridor growth', direction: 'inbound', href: '/local-movers/arizona/maricopa', context: 'Parent-market hops into San Tan master plans; empty miles from Valley yards are real.' },
    { label: 'Pinal → Maricopa job markets', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'Corridor professionals into East/West Valley multi-family and HOA stock.' },
    { label: 'Pinal → Tucson / Pima job & university family moves', direction: 'outbound', href: '/local-movers/arizona/pima', context: 'Southbound I-10 hops; multi-hour desert logistics with summer heat pacing.' },
    { label: 'California → Pinal starter & remote-work homes', direction: 'inbound', context: 'I-10 West Coast exits into newer subdivisions between Phoenix and Tucson.', href: '/resources/routes/california-to-arizona' },
    { label: 'Midwest → Pinal Sun Belt affordability corridor', direction: 'inbound', context: 'Family relocations seeking new construction between the two major AZ metros.', href: '/resources/routes/illinois-to-arizona' },
  ],
  yavapai: [
    { label: 'Within Yavapai (Prescott ↔ Prescott Valley / Verde edges)', direction: 'within', context: 'High-country multi-story vs HOA growth — not Phoenix desert defaults.' },
    { label: 'Maricopa → Yavapai elevation & retirement moves', direction: 'inbound', href: '/local-movers/arizona/maricopa', context: 'Desert-to-high-country lifestyle upgrades on I-17; weather and altitude shape windows.' },
    { label: 'Yavapai → Phoenix Valley medical & family support', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'Down-elevation returns; plan heat staging on summer deliveries.' },
    { label: 'Yavapai ↔ Coconino high-country pairs', direction: 'within', href: '/local-movers/arizona/coconino', context: 'Northern AZ pine-belt hops; winter chain and storm delays are real.' },
    { label: 'California → Prescott lifestyle hubs', direction: 'inbound', context: 'SoCal exits seeking four seasons; hillside accessorials still apply.', href: '/resources/routes/california-to-arizona' },
    { label: 'Midwest retirees → Prescott year-round homes', direction: 'inbound', context: 'Snowbird-to-permanent transitions; full household goods.', href: '/resources/routes/illinois-to-arizona' },
  ],
  mohave: [
    { label: 'Within Mohave (Lake Havasu ↔ Kingman / Bullhead)', direction: 'within', context: 'River recreation multi-family vs I-40 seat stock — long county spans.' },
    { label: 'Southern California → Lake Havasu / river second homes', direction: 'inbound', context: 'CA border inflows; summer heat and waterfront access drive crew plans.', href: '/resources/routes/california-to-arizona' },
    { label: 'Mohave ↔ Las Vegas / southern Nevada hops', direction: 'outbound', context: 'Cross-border regional moves; FMCSA even when the drive feels local.' },
    { label: 'Mohave → Phoenix metro healthcare & family support', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'I-40 / US-93 multi-hour desert linehaul.' },
    { label: 'Midwest snowbirds → Mohave winter river bases', direction: 'inbound', context: 'Seasonal dual-home demand into Havasu–Bullhead stock.', href: '/resources/routes/minnesota-to-arizona' },
    { label: 'I-40 corporate & logistics into Kingman', direction: 'inbound', context: 'Freight-adjacent employment draws; warehouse access differs from lakefront HOAs.' },
  ],
  yuma: [
    { label: 'Within Yuma (city core ↔ Foothills / ag-edge)', direction: 'within', context: 'Snowbird multi-family vs ag-edge SFH — not Phoenix HOA defaults.' },
    { label: 'Southern California → Yuma snowbird & border homes', direction: 'inbound', context: 'I-8 SoCal seasonal and permanent moves; peak winter capacity.', href: '/resources/routes/california-to-arizona' },
    { label: 'Yuma ↔ Phoenix metro medical & job hops', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'I-8 multi-hour desert corridor; heat and monsoon timing dominate.' },
    { label: 'Yuma → Tucson / Pima lifestyle moves', direction: 'outbound', href: '/local-movers/arizona/pima', context: 'Eastbound desert hops — not a local hourly job.' },
    { label: 'Upper Midwest → Yuma winter visitor household goods', direction: 'inbound', context: 'Classic snowbird path; partial loads and SIT are common.', href: '/resources/routes/minnesota-to-arizona' },
    { label: 'MCAS Yuma / military-adjacent PCS cycles', direction: 'inbound', context: 'PCS clustering around base timelines; flexible delivery dates matter.' },
  ],
  coconino: [
    { label: 'Within Coconino (Flagstaff ↔ forest edges / long rural)', direction: 'within', context: 'NAU multi-family vs forest-edge grades — not desert-Phoenix product.' },
    { label: 'Phoenix Valley → Flagstaff elevation moves', direction: 'inbound', href: '/local-movers/arizona/maricopa', context: 'Desert-to-high-country shifts on I-17; winter storms reshape windows.' },
    { label: 'Flagstaff ↔ Phoenix corporate reverse pairs', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'Down-elevation job returns; climate-sensitive inventory both directions.' },
    { label: 'Coconino ↔ Yavapai high-country pairs', direction: 'within', href: '/local-movers/arizona/yavapai', context: 'Northern AZ pine-belt hops; elevation weather is first-class.' },
    { label: 'California → Flagstaff outdoor lifestyle', direction: 'inbound', context: 'West Coast exits seeking pine country; snow-access surveys essential.', href: '/resources/routes/california-to-arizona' },
    { label: 'Midwest → northern Arizona high-country homes', direction: 'inbound', context: 'Full interstate household goods into Flagstaff-area stock.', href: '/resources/routes/illinois-to-arizona' },
  ],
  cochise: [
    { label: 'Within Cochise (Sierra Vista ↔ Bisbee / Douglas)', direction: 'within', context: 'PCS multi-family vs hill multi-story — not Tucson basin defaults.' },
    { label: 'Fort Huachuca PCS lanes → Sierra Vista', direction: 'inbound', context: 'Order-driven Marine/Army-adjacent household goods; report dates drive the plan.' },
    { label: 'Pima / Tucson → Cochise SE pairs', direction: 'inbound', href: '/local-movers/arizona/pima', context: 'Parent-contrast hops; empty miles from Tucson yards are real.' },
    { label: 'Cochise → Tucson job & medical markets', direction: 'outbound', href: '/local-movers/arizona/pima', context: 'SE professionals into Tucson multi-family and foothill stock.' },
    { label: 'Bisbee hill multi-story local moves', direction: 'within', context: 'Grades and narrow streets — not a pure Sierra Vista driveway plan.' },
    { label: 'Cochise → Phoenix / Sun Belt long-distance', direction: 'outbound', context: 'Interstate or long in-state hauls; volume surveys recommended.', href: '/resources/routes/california-to-arizona' },
  ],
  navajo: [
    { label: 'Within Navajo (Show Low ↔ Winslow / Holbrook)', direction: 'within', context: 'High-country multi-town product — long empty miles between seats.' },
    { label: 'Coconino → Navajo NE high-country pairs', direction: 'inbound', href: '/local-movers/arizona/coconino', context: 'Parent-contrast hops; discontinuous towns need empty-mile honesty.' },
    { label: 'Navajo → Flagstaff job & medical markets', direction: 'outbound', href: '/local-movers/arizona/coconino', context: 'NE professionals into Flagstaff multi-story stock.' },
    { label: 'I-40 corridor into Winslow / Holbrook', direction: 'inbound', context: 'Freight-adjacent and long-haul household goods; portal time dominates.' },
    { label: 'Show Low tourism / recreation seasonal moves', direction: 'within', context: 'Peak seasons fill crews; elevation weather rewrites staging.' },
    { label: 'Navajo → Phoenix / out-of-state long-distance', direction: 'outbound', context: 'Very long empty-mile starts; FMCSA when leaving Arizona.', href: '/resources/routes/illinois-to-arizona' },
  ],
  'santa-cruz': [
    { label: 'Within Santa Cruz (Nogales ↔ Rio Rico / Patagonia)', direction: 'within', context: 'Border multi-story vs growth SFH — not Tucson rename product.' },
    { label: 'Pima / Tucson → Santa Cruz border collar', direction: 'inbound', href: '/local-movers/arizona/pima', context: 'Parent-market hops on I-19 into Nogales and Rio Rico stock.' },
    { label: 'Santa Cruz → Tucson job & medical markets', direction: 'outbound', href: '/local-movers/arizona/pima', context: 'Border-county professionals into Tucson multi-family and midtown stock.' },
    { label: 'Border commercial windows reshape local staging', direction: 'within', context: 'Port and freight peaks rewrite pure residential Saturday assumptions.' },
    { label: 'California → Nogales / border-region homes', direction: 'inbound', context: 'West Coast interstate household goods; FMCSA required.', href: '/resources/routes/california-to-arizona' },
    { label: 'Santa Cruz → Phoenix long in-state hauls', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'I-19 / I-10 multi-hour desert logistics with heat pacing.' },
  ],
  gila: [
    { label: 'Within Gila (Payson ↔ Globe / Miami)', direction: 'within', context: 'Rim recreation multi-family vs mining multi-story — long empty miles.' },
    { label: 'Maricopa → Gila rim-country elevation moves', direction: 'inbound', href: '/local-movers/arizona/maricopa', context: 'Desert-to-rim lifestyle hops on AZ-87; grades rewrite truck type.' },
    { label: 'Gila → Phoenix Valley medical & family support', direction: 'outbound', href: '/local-movers/arizona/maricopa', context: 'Down-elevation returns; heat staging on summer deliveries.' },
    { label: 'Payson tourism / recreation seasonal moves', direction: 'within', context: 'Peak weekends fill crews; driveway grades dominate unload day.' },
    { label: 'Gila ↔ Pinal / East Valley pairs', direction: 'within', href: '/local-movers/arizona/pinal', context: 'Corridor hops with different elevation fabrics at each end.' },
    { label: 'Midwest → rim-country permanent homes', direction: 'inbound', context: 'Full interstate household goods into Payson-area stock.', href: '/resources/routes/illinois-to-arizona' },
  ],
  graham: [
    { label: 'Within Graham (Safford ↔ Thatcher / Pima town)', direction: 'within', context: 'Small regional-hub multi-story — not Tucson or Phoenix defaults.' },
    { label: 'Pima / Tucson → Graham SE interior pairs', direction: 'inbound', href: '/local-movers/arizona/pima', context: 'Long empty-mile approaches from metro yards into Safford stock.' },
    { label: 'Graham → Tucson job & medical markets', direction: 'outbound', href: '/local-movers/arizona/pima', context: 'SE interior professionals into Tucson multi-family stock.' },
    { label: 'Graham ↔ Cochise SE pairs', direction: 'within', href: '/local-movers/arizona/cochise', context: 'SE Arizona town pairs; empty miles between seats matter.' },
    { label: 'College / local multi-family turns in Thatcher', direction: 'within', context: 'Term windows and elevators differ from pure rural valley lots.' },
    { label: 'Graham → Phoenix / out-of-state long-distance', direction: 'outbound', context: 'Long starts; FMCSA when leaving Arizona.', href: '/resources/routes/california-to-arizona' },
  ],
  apache: [
    { label: 'Within Apache (St. Johns ↔ Eagar / Springerville)', direction: 'within', context: 'Far NE sparse multi-town product — very long empty miles.' },
    { label: 'Navajo → Apache far-NE pairs', direction: 'inbound', href: '/local-movers/arizona/navajo', context: 'Parent-contrast hops into even sparser seats; empty-mile honesty required.' },
    { label: 'Apache → Show Low / Navajo job & medical markets', direction: 'outbound', href: '/local-movers/arizona/navajo', context: 'Far-NE professionals into Show Low multi-family stock.' },
    { label: 'Apache → Flagstaff / Coconino pairs', direction: 'outbound', href: '/local-movers/arizona/coconino', context: 'Long high-country hauls; elevation weather is first-class.' },
    { label: 'Northern / Window Rock–adjacent access-sensitive moves', direction: 'within', context: 'Clarify jurisdiction and last-mile access early; photo approaches.' },
    { label: 'Apache → out-of-state long-distance', direction: 'outbound', context: 'Very long empty-mile starts; FMCSA when leaving Arizona.', href: '/resources/routes/illinois-to-arizona' },
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
      label: 'Mecklenburg / Charlotte → Union south collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Parent-market hops on US-74 / I-485 into Indian Trail and Weddington HOA growth.',
    },
    {
      label: 'Union → Mecklenburg job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'South-collar professionals into Uptown elevators and South End multi-family.',
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
      label: 'Mecklenburg → Cabarrus I-85 northeast collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Parent-market hops on I-85 into Concord and Harrisburg growth product.',
    },
    {
      label: 'Cabarrus → Mecklenburg / University City job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'NE-collar professionals into Mecklenburg multi-family and Uptown stock.',
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
      label: 'Mecklenburg → Gaston west collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Parent-market hops on I-85 / Wilkinson into Belmont and Gastonia product.',
    },
    {
      label: 'Gaston → Mecklenburg job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'West-collar professionals into Uptown elevators and west Charlotte multi-family.',
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
  iredell: [
    {
      label: 'Within Iredell (Mooresville ↔ Statesville / Lake Norman edges)',
      direction: 'within',
      context:
        'Lake association last-mile vs seat multi-story — not Huntersville-only product.',
    },
    {
      label: 'Mecklenburg → Iredell I-77 north / Lake Norman collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Parent-market hops on I-77 into Mooresville growth and lake-edge housing.',
    },
    {
      label: 'Iredell → Mecklenburg / Charlotte job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'North-collar professionals into Uptown elevators and north-ring multi-family.',
    },
    {
      label: 'Northeast → Mooresville / Lake Norman lifestyle markets',
      direction: 'inbound',
      context:
        'Interstate household goods into north-metro growth; lake last-mile dominates unload day.',
    },
    {
      label: 'Florida → Iredell reverse family moves',
      direction: 'inbound',
      context:
        'Sun Belt reverse into Lake Norman-edge and Mooresville multi-family; FMCSA interstate.',
    },
    {
      label: 'Iredell ↔ Cabarrus / Gaston Charlotte-ring pairs',
      direction: 'within',
      context:
        'Metro-ring logistics with different lake vs industrial fabrics.',
    },
  ],
  johnston: [
    {
      label: 'Within Johnston (Clayton ↔ Smithfield / Benson)',
      direction: 'within',
      context:
        'South-collar multi-family vs logistics-edge SFH — not downtown Raleigh elevators.',
    },
    {
      label: 'Wake / Raleigh → Johnston south growth collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/wake',
      context:
        'Parent-market hops on I-40 / NC-42 into Clayton HOA and multi-family growth.',
    },
    {
      label: 'Johnston → Wake / Triangle job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/wake',
      context:
        'South-collar professionals into capital elevators and Cary multi-family.',
    },
    {
      label: 'Florida / I-95 → Johnston logistics-edge housing',
      direction: 'inbound',
      context:
        'I-95 corridor household goods; FMCSA when either end is out of NC.',
    },
    {
      label: 'Johnston ↔ Durham / Orange Triangle edges',
      direction: 'within',
      context:
        'Regional Triangle pairs with different university vs logistics fabrics.',
    },
    {
      label: 'Midwest → Clayton growth corridors',
      direction: 'inbound',
      context:
        'Family and corporate inflows seeking space outside Wake core pricing.',
    },
  ],
  orange: [
    {
      label: 'Within Orange (Chapel Hill / Carrboro ↔ Hillsborough)',
      direction: 'within',
      context:
        'Campus multi-story vs seat SFH — term calendars rewrite pure Saturday plans.',
    },
    {
      label: 'Durham → Orange university Triangle pairs',
      direction: 'inbound',
      href: '/local-movers/north-carolina/durham',
      context:
        'Parent-market hops on US-15-501 into Chapel Hill and Carrboro density.',
    },
    {
      label: 'Orange → Durham / RTP research markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/durham',
      context:
        'University-town professionals into research multi-family and adaptive-reuse elevators.',
    },
    {
      label: 'Wake → Orange / Chapel Hill edges',
      direction: 'inbound',
      href: '/local-movers/north-carolina/wake',
      context:
        'Capital-to-university regional pairs; clarify county lines on every estimate.',
    },
    {
      label: 'Northeast → Chapel Hill academic & medical markets',
      direction: 'inbound',
      context:
        'Interstate household goods into near-campus multi-family; FMCSA for cross-state legs.',
    },
    {
      label: 'Orange → Florida / Sun Belt exits',
      direction: 'outbound',
      context:
        'Family long-distance from university-town stock; volume estimates drive linehaul.',
    },
  ],
  alamance: [
    {
      label: 'Within Alamance (Burlington ↔ Mebane / Graham)',
      direction: 'within',
      context:
        'Mill-town multi-story vs growth HOAs — mid-corridor empty miles matter.',
    },
    {
      label: 'Guilford / Triad → Alamance mid-corridor',
      direction: 'inbound',
      href: '/local-movers/north-carolina/guilford',
      context:
        'Parent-biased I-40/I-85 hops into Burlington and Mebane product.',
    },
    {
      label: 'Alamance → Guilford / Greensboro job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/guilford',
      context:
        'Mid-corridor professionals into Triad multi-story and industrial-residential stock.',
    },
    {
      label: 'Orange / Triangle → Alamance Mebane growth',
      direction: 'inbound',
      href: '/local-movers/north-carolina/orange',
      context:
        'Triangle spillover into HOA growth; not a Chapel Hill campus day rate.',
    },
    {
      label: 'Florida → Alamance reverse family moves',
      direction: 'inbound',
      context:
        'I-95/I-40 household goods into mid-corridor housing; FMCSA interstate.',
    },
    {
      label: 'Alamance → Charlotte metro career hauls',
      direction: 'outbound',
      context:
        'In-state long haul on I-85; empty miles change pricing vs a Mebane hop.',
    },
  ],
  davidson: [
    {
      label: 'Within Davidson (Lexington ↔ Thomasville / mid-county)',
      direction: 'within',
      context:
        'Seat multi-story vs furniture-region multi-unit — discontinuous town pairs.',
    },
    {
      label: 'Forsyth / Winston-Salem → Davidson Triad south',
      direction: 'inbound',
      href: '/local-movers/north-carolina/forsyth',
      context:
        'Parent-biased I-85 hops into Lexington and Thomasville product.',
    },
    {
      label: 'Davidson → Forsyth job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/forsyth',
      context:
        'Triad-south professionals into Winston-Salem multi-story and suburban stock.',
    },
    {
      label: 'Guilford → Davidson furniture-region pairs',
      direction: 'inbound',
      href: '/local-movers/north-carolina/guilford',
      context:
        'Greensboro/High Point edges into Thomasville multi-unit fabric.',
    },
    {
      label: 'Florida → Davidson reverse family moves',
      direction: 'inbound',
      context:
        'I-85 household goods into Triad-south housing; FMCSA interstate.',
    },
    {
      label: 'Davidson → Charlotte metro (I-85)',
      direction: 'outbound',
      context:
        'In-state career hauls south; longer than a Thomasville local.',
    },
  ],
  catawba: [
    {
      label: 'Within Catawba (Hickory ↔ Newton / Conover / Lake Hickory)',
      direction: 'within',
      context:
        'Furniture-hub multi-story vs lake last-mile — not Charlotte beltway product.',
    },
    {
      label: 'Charlotte / Mecklenburg → Hickory western Piedmont',
      direction: 'inbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Distant parent contrast; I-40 empty miles into independent hub stock.',
    },
    {
      label: 'Catawba → Charlotte job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/mecklenburg',
      context:
        'Western Piedmont professionals into banking-core elevators — long in-state haul.',
    },
    {
      label: 'Northeast / Midwest → Hickory manufacturing markets',
      direction: 'inbound',
      context:
        'Interstate household goods into furniture/manufacturing hub housing.',
    },
    {
      label: 'Catawba ↔ Gaston / Iredell Piedmont pairs',
      direction: 'within',
      context:
        'Western Piedmont regional pairs with different industrial fabrics.',
    },
    {
      label: 'Florida → Catawba reverse family moves',
      direction: 'inbound',
      context:
        'Sun Belt reverse into Hickory multi-story and lake-edge stock; FMCSA interstate.',
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
      href: '/local-movers/north-carolina/cumberland',
      context:
        'In-state military transfer pairs; different base-access rules at each end — not interchangeable copy.',
    },
    {
      label: 'Onslow vs Wilmington defaults (not a New Hanover rename)',
      direction: 'within',
      href: '/local-movers/north-carolina/new-hanover',
      context:
        'PCS multi-family logistics differ from Wilmington tourism and historic downtown product.',
    },
    {
      label: 'Onslow → Triangle / Charlotte post-service career moves',
      direction: 'outbound',
      context:
        'In-state long haul after separation into Piedmont job markets.',
    },
  ],
  pitt: [
    {
      label: 'Within Pitt (Greenville ECU edge ↔ Winterville / medical corridors)',
      direction: 'within',
      context:
        'Campus multi-story vs medical multi-family — term and shift calendars matter.',
    },
    {
      label: 'Triangle → Greenville ECU/medical hub',
      direction: 'inbound',
      href: '/local-movers/north-carolina/wake',
      context:
        'Distant Triangle contrast; US-264 empty miles into independent eastern hub stock.',
    },
    {
      label: 'Pitt → Triangle job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/wake',
      context:
        'Eastern professionals into capital/tech multi-family — long in-state haul.',
    },
    {
      label: 'Northeast → ECU / medical employment markets',
      direction: 'inbound',
      context:
        'Interstate household goods into near-campus and hospital multi-family.',
    },
    {
      label: 'Pitt ↔ New Hanover coastal pairs',
      direction: 'within',
      href: '/local-movers/north-carolina/new-hanover',
      context:
        'Eastern NC pairs; medical hub product differs from Wilmington tourism density.',
    },
    {
      label: 'Florida → Greenville reverse family moves',
      direction: 'inbound',
      context:
        'I-95 corridor household goods into eastern NC; FMCSA interstate.',
    },
  ],
  brunswick: [
    {
      label: 'Within Brunswick (Leland ↔ Southport / Oak Island)',
      direction: 'within',
      context:
        'Inland HOA growth vs beach association last-mile — truck type changes by zone.',
    },
    {
      label: 'New Hanover / Wilmington → Brunswick south coastal collar',
      direction: 'inbound',
      href: '/local-movers/north-carolina/new-hanover',
      context:
        'Parent-market hops on US-17 into Leland multi-family and coastal growth.',
    },
    {
      label: 'Brunswick → Wilmington / New Hanover job markets',
      direction: 'outbound',
      href: '/local-movers/north-carolina/new-hanover',
      context:
        'South-collar professionals into historic downtown and midtown multi-family.',
    },
    {
      label: 'Northeast / Midwest → Brunswick coastal lifestyle',
      direction: 'inbound',
      context:
        'Interstate household goods into Leland growth and island associations.',
    },
    {
      label: 'Florida ↔ Brunswick reverse coastal moves',
      direction: 'inbound',
      context:
        'I-95 corridor coastal pairs; storm-season contingency on both ends.',
    },
    {
      label: 'Brunswick → Triangle career hauls (US-17 / I-40)',
      direction: 'outbound',
      context:
        'Coastal-to-Triangle in-state hauls; longer than a Leland local.',
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
  hanover: [
    { label: 'Within Hanover (Ashland ↔ Mechanicsville edge)', direction: 'within', context: 'North-Richmond collar — seat multi-story vs planned growth.' },
    { label: 'Henrico → Hanover north collar', direction: 'inbound', context: 'Parent metro outbound into Ashland product — not a Henrico rename.', href: '/local-movers/virginia/henrico' },
    { label: 'Hanover → Henrico / Richmond job markets', direction: 'outbound', context: 'North-collar professionals into denser west-end stock.', href: '/local-movers/virginia/henrico' },
    { label: 'Hanover ↔ Chesterfield Richmond collar pairs', direction: 'within', context: 'North vs south collars — distinct freeflow.', href: '/local-movers/virginia/chesterfield' },
    { label: 'Northeast → Hanover County space & schools', direction: 'inbound', context: 'Family inflows into I-95 north growth corridors.' },
  ],
  albemarle: [
    { label: 'Within Albemarle (Crozet ↔ Pantops / mountain edge)', direction: 'within', context: 'UVA-adjacent multi-family vs mountain-edge lots — access differs sharply.' },
    { label: 'Richmond / NoVA → Charlottesville-area Albemarle', direction: 'inbound', context: 'Independent university market inflows — not a Henrico or Fairfax rename.', href: '/local-movers/virginia/henrico' },
    { label: 'UVA term-start / term-end spillover moves', direction: 'within', context: 'Student multi-family clusters near the city line; book early.' },
    { label: 'Albemarle → Richmond / NoVA job markets', direction: 'outbound', context: 'University exits into denser metro stock.', href: '/local-movers/virginia/fairfax' },
    { label: 'Northeast → Charlottesville-area housing', direction: 'inbound', context: 'Lifestyle and academic inflows; FMCSA for interstate legs.' },
  ],
  roanoke: [
    { label: 'Within Roanoke County (valley suburbs ↔ mountain edges)', direction: 'within', context: 'Valley SFH vs grades — last-mile rewrites truck size.' },
    { label: 'NoVA / Richmond → Roanoke Valley', direction: 'inbound', context: 'Western VA hub inflows — not a Fairfax rename.', href: '/local-movers/virginia/fairfax' },
    { label: 'Roanoke County ↔ independent-city Roanoke pairs', direction: 'within', context: 'Confirm locality lines; city multi-story packets differ from county SFH.' },
    { label: 'Roanoke Valley → I-81 regional pairs', direction: 'outbound', context: 'Valley freeflow toward NRV and northern valley markets.' },
    { label: 'Midwest → Roanoke Valley housing', direction: 'inbound', context: 'Employment and family inflows into valley suburbs.' },
  ],
  montgomery: [
    { label: 'Within Montgomery (Blacksburg ↔ Christiansburg)', direction: 'within', context: 'VT multi-family vs corridor SFH — term calendars spike demand.' },
    { label: 'Roanoke Valley → New River Valley / Montgomery', direction: 'inbound', context: 'Regional inflows into VT product — not a Roanoke rename.', href: '/local-movers/virginia/roanoke' },
    { label: 'Virginia Tech term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Montgomery → Roanoke / I-81 job markets', direction: 'outbound', context: 'NRV professionals into denser valley stock.', href: '/local-movers/virginia/roanoke' },
    { label: 'Northeast / Midwest → Blacksburg housing', direction: 'inbound', context: 'University and professional inflows; FMCSA for interstate legs.' },
  ],
  frederick: [
    { label: 'Within Frederick (Winchester edges ↔ I-81 corridors)', direction: 'within', context: 'North-valley multi-story vs industrial-edge SFH.' },
    { label: 'NoVA → Winchester / Frederick County', direction: 'inbound', context: 'Northern valley inflows — not a Loudoun rename.', href: '/local-movers/virginia/loudoun' },
    { label: 'Frederick → West Virginia / Maryland border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Frederick → NoVA job markets via I-81 / I-66', direction: 'outbound', context: 'Valley professionals into denser NoVA stock.', href: '/local-movers/virginia/fairfax' },
    { label: 'Midwest → Winchester industrial corridors', direction: 'inbound', context: 'Employment inflows into valley multi-unit and SFH.' },
  ],
  'james-city': [
    { label: 'Within James City (planned villages ↔ Williamsburg edge)', direction: 'within', context: 'Tourism calendars rewrite curb plans on growth and multi-family stock.' },
    { label: 'York → James City Historic Triangle', direction: 'inbound', context: 'Peninsula collar hops into Williamsburg-area product — not a York rename.', href: '/local-movers/virginia/york' },
    { label: 'James City → Newport News / Peninsula job markets', direction: 'outbound', context: 'County professionals into denser Peninsula urban stock.', href: '/local-movers/virginia/newport-news' },
    { label: 'Tourism / second-home seasonal moves', direction: 'within', context: 'Holiday peaks tighten staging — not a pure residential Saturday day.' },
    { label: 'Northeast → Williamsburg-area housing', direction: 'inbound', context: 'Lifestyle inflows; FMCSA for interstate legs.' },
  ],
  york: [
    { label: 'Within York (Yorktown edge ↔ Peninsula planned SFH)', direction: 'within', context: 'Military-edge multi-family vs planned suburbs — access differs.' },
    { label: 'James City → York Peninsula collar', direction: 'inbound', context: 'Historic Triangle hops into military-edge product — not a James City rename.', href: '/local-movers/virginia/james-city' },
    { label: 'York → Newport News / Hampton urban pairs', direction: 'outbound', context: 'County professionals into denser Peninsula cities.', href: '/local-movers/virginia/newport-news' },
    { label: 'Military multi-family / PCS-adjacent moves', direction: 'within', context: 'Building packets and report dates rewrite demand.' },
    { label: 'Northeast → York County Peninsula housing', direction: 'inbound', context: 'Family and military-adjacent inflows; FMCSA for interstate legs.' },
  ],
  'newport-news': [
    { label: 'Within Newport News (midtown ↔ Denbigh / shipyard edge)', direction: 'within', context: 'Urban multi-story vs shipyard freeflow — not York driveway defaults.' },
    { label: 'York / James City → Newport News urban', direction: 'inbound', context: 'Peninsula collar inbound into city multi-story product.', href: '/local-movers/virginia/york' },
    { label: 'Newport News ↔ Hampton Peninsula city pairs', direction: 'within', context: 'Distinct Peninsula cities — do not recycle one playbook for both.', href: '/local-movers/virginia/hampton' },
    { label: 'Shipyard industrial freeflow residential moves', direction: 'within', context: 'Shift windows choke some pairs near industrial edges.' },
    { label: 'Northeast → Newport News employment corridors', direction: 'inbound', context: 'Industrial and professional inflows into multi-unit stock.' },
  ],
  hampton: [
    { label: 'Within Hampton (Phoebus ↔ Coliseum multi-family)', direction: 'within', context: 'Water-edge multi-story vs corridor apartments — last-mile differs.' },
    { label: 'Newport News → Hampton north Hampton Roads', direction: 'inbound', context: 'Peninsula city hops — not a Newport News rename.', href: '/local-movers/virginia/newport-news' },
    { label: 'Hampton ↔ Norfolk southside pairs', direction: 'outbound', context: 'Bridge/tunnel freeflow; distinct from Peninsula-only rates.', href: '/local-movers/virginia/norfolk' },
    { label: 'Phoebus water-edge multi-story moves', direction: 'within', context: 'Street width and stairs rewrite truck size.' },
    { label: 'Northeast → Hampton urban housing', direction: 'inbound', context: 'Employment and family inflows into multi-unit stock.' },
  ],
  fauquier: [
    { label: 'Within Fauquier (Warrenton ↔ hunt-country lots)', direction: 'within', context: 'Seat multi-story vs estate last-mile — truck type changes.' },
    { label: 'Prince William → Fauquier outer NOVA', direction: 'inbound', context: 'Parent metro outbound into lower-density product — not a PW rename.', href: '/local-movers/virginia/prince-william' },
    { label: 'Fauquier → Fairfax / Loudoun job markets', direction: 'outbound', context: 'Outer-NOVA professionals into denser NoVA stock.', href: '/local-movers/virginia/fairfax' },
    { label: 'Hunt-country estate last-mile moves', direction: 'within', context: 'Long drives and narrow approaches rewrite truck size.' },
    { label: 'Northeast → Fauquier space & schools', direction: 'inbound', context: 'Lifestyle inflows into outer-NOVA lower density.' },
  ],
  // Virginia Tier 2 Wave 2
  portsmouth: [
    { label: 'Within Portsmouth (Olde Towne ↔ Churchland)', direction: 'within', context: 'Historic tight streets vs west-side suburban scale — not one local rate.' },
    { label: 'Portsmouth → Norfolk (parent contrast)', direction: 'outbound', context: 'Independent-city to Norfolk pairs; tunnel freeflow dominates.', href: '/local-movers/virginia/norfolk' },
    { label: 'Portsmouth ↔ Chesapeake / Virginia Beach Roads pairs', direction: 'within', context: 'Southside multi-city logistics; name each independent city.', href: '/local-movers/virginia/chesapeake' },
    { label: 'Shipyard-adjacent workforce housing moves', direction: 'within', context: 'Shift timing near industrial waterfront rewrites curb plans.' },
    { label: 'Northeast → Portsmouth employment corridors', direction: 'inbound', context: 'Industrial and family inflows into multi-unit and historic stock.' },
  ],
  suffolk: [
    { label: 'Within Suffolk (northern growth ↔ downtown / rural south)', direction: 'within', context: 'Multi-regime city — north HOA vs historic core vs deep rural south.' },
    { label: 'Suffolk → Chesapeake (parent contrast)', direction: 'outbound', context: 'Western Roads edge into denser Chesapeake product.', href: '/local-movers/virginia/chesapeake' },
    { label: 'Suffolk ↔ Portsmouth / Norfolk job markets', direction: 'outbound', context: 'Employment legs; price empty miles and tunnel freeflow honestly.', href: '/local-movers/virginia/portsmouth' },
    { label: 'Harbour View / northern growth HOA stock', direction: 'within', context: 'Gate lists and new-plat access; not downtown staging.' },
    { label: 'Northeast → Suffolk multi-regime housing', direction: 'inbound', context: 'Family and employment inflows; scope which part of Suffolk.' },
  ],
  lynchburg: [
    { label: 'Within Lynchburg (downtown hills ↔ Liberty / Boonsboro)', direction: 'within', context: 'Hill multi-story vs campus apartments vs suburban north — grades rewrite truck size.' },
    { label: 'Lynchburg → Bedford County / Forest collar', direction: 'outbound', context: 'Independent city to county pairs — confirm locality lines.', href: '/local-movers/virginia/bedford' },
    { label: 'Liberty University term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Lynchburg ↔ Roanoke Valley pairs', direction: 'outbound', context: 'Central VA hub logistics; US-460 freeflow matters.', href: '/local-movers/virginia/roanoke' },
    { label: 'Northeast / Midwest → Lynchburg housing', direction: 'inbound', context: 'University and medical inflows; FMCSA for interstate legs.' },
  ],
  charlottesville: [
    { label: 'Within Charlottesville (Downtown Mall ↔ UVA / Belmont)', direction: 'within', context: 'Compact city density — Mall staging vs campus elevators vs residential fabric.' },
    { label: 'Charlottesville → Albemarle (parent collar)', direction: 'outbound', context: 'City to county pairs; jurisdiction must be explicit.', href: '/local-movers/virginia/albemarle' },
    { label: 'UVA term-start / term-end spillover moves', direction: 'within', context: 'Student multi-family clusters; book elevators early.' },
    { label: 'Charlottesville → Richmond / NoVA job markets', direction: 'outbound', context: 'University exits into denser metro stock.', href: '/local-movers/virginia/henrico' },
    { label: 'Northeast → Charlottesville-area housing', direction: 'inbound', context: 'Lifestyle and academic inflows; FMCSA for interstate legs.' },
  ],
  bedford: [
    { label: 'Within Bedford (Forest ↔ Smith Mountain Lake / town of Bedford)', direction: 'within', context: 'Suburban collar vs lake last-mile vs small-town seat — not one local rate.' },
    { label: 'Bedford County → Lynchburg (parent city)', direction: 'outbound', context: 'County collar into hill-city multi-story product.', href: '/local-movers/virginia/lynchburg' },
    { label: 'Smith Mountain Lake waterfront moves', direction: 'within', context: 'Grades, docks, and seasonal traffic; photo driveways mandatory.' },
    { label: 'Bedford ↔ Roanoke Valley pairs', direction: 'outbound', context: 'Western VA regional logistics; empty miles matter.', href: '/local-movers/virginia/roanoke' },
    { label: 'Northeast / Midwest → Bedford County space', direction: 'inbound', context: 'Lake and collar inflows; FMCSA for interstate legs.' },
  ],
  augusta: [
    { label: 'Within Augusta (Fishersville ↔ northern/southern valley farms)', direction: 'within', context: 'Medical corridor vs farm lanes — I-81 freeflow differs by pocket.' },
    { label: 'Augusta County → Staunton / Waynesboro city pairs', direction: 'outbound', context: 'County to independent-city legs; jurisdiction must be explicit.' },
    { label: 'Augusta → Rockingham / Harrisonburg valley pairs', direction: 'outbound', context: 'Valley freeflow north; parent contrast for secondary markets.', href: '/local-movers/virginia/rockingham' },
    { label: 'I-81 through-traffic residential moves', direction: 'within', context: 'Interstate peaks rewrite short-looking valley pairs.' },
    { label: 'Northeast → Shenandoah Valley Augusta housing', direction: 'inbound', context: 'Lifestyle and employment inflows; FMCSA for interstate legs.' },
  ],
  rockingham: [
    { label: 'Within Rockingham (Harrisonburg ring ↔ Bridgewater / Elkton edges)', direction: 'within', context: 'County-ring growth vs small towns vs mountain approaches — not city-campus defaults alone.' },
    { label: 'Rockingham County → Harrisonburg city pairs', direction: 'outbound', context: 'County to independent city; pin jurisdiction on every address.' },
    { label: 'Rockingham → Augusta / Staunton-area valley pairs', direction: 'outbound', context: 'Valley freeflow south; related secondary markets.', href: '/local-movers/virginia/augusta' },
    { label: 'JMU spillover county multi-family moves', direction: 'within', context: 'Term peaks near the city line; book curb windows early.' },
    { label: 'Northeast → Rockingham County valley housing', direction: 'inbound', context: 'Ag workforce and lifestyle inflows; FMCSA for interstate legs.' },
  ],
  culpeper: [
    { label: 'Within Culpeper (town core ↔ northern growth / rural estate)', direction: 'within', context: 'Historic downtown vs HOA growth vs farm lanes — truck type changes.' },
    { label: 'Culpeper → Fauquier (parent contrast)', direction: 'outbound', context: 'Piedmont to outer-NOVA pairs; US-29 freeflow matters.', href: '/local-movers/virginia/fauquier' },
    { label: 'Culpeper → NoVA job markets', direction: 'outbound', context: 'DC-outer professionals into denser NoVA stock.', href: '/local-movers/virginia/fairfax' },
    { label: 'Culpeper → Charlottesville-area pairs', direction: 'outbound', context: 'Piedmont southbound; confirm multi-county legs.', href: '/local-movers/virginia/charlottesville' },
    { label: 'Northeast → Culpeper space & schools', direction: 'inbound', context: 'Family and commute-adjacent inflows into Piedmont product.' },
  ],
  orange: [
    { label: 'Within Orange County VA (Orange ↔ Gordonsville / estate lots)', direction: 'within', context: 'Piedmont town cores vs long private drives — name Virginia on interstate BOLs.' },
    { label: 'Orange → Culpeper (parent contrast)', direction: 'outbound', context: 'Piedmont northbound pairs; not a Culpeper rename.', href: '/local-movers/virginia/culpeper' },
    { label: 'Orange → Charlottesville / Albemarle pairs', direction: 'outbound', context: 'Southern gravity toward university markets.', href: '/local-movers/virginia/charlottesville' },
    { label: 'Orange → NoVA job markets', direction: 'outbound', context: 'DC-outer professionals into denser NoVA stock.', href: '/local-movers/virginia/fairfax' },
    { label: 'Northeast → Orange County VA housing', direction: 'inbound', context: 'Lifestyle inflows; always label state as Virginia for interstate carriers.' },
  ],
  louisa: [
    { label: 'Within Louisa (Lake Anna ↔ Zion Crossroads / town of Louisa)', direction: 'within', context: 'Lake last-mile vs I-64 growth node vs small-town seat — not one local rate.' },
    { label: 'Louisa → Hanover (parent contrast)', direction: 'outbound', context: 'Outer central VA into north-Richmond collar product.', href: '/local-movers/virginia/hanover' },
    { label: 'Zion Crossroads → Charlottesville pairs', direction: 'outbound', context: 'I-64 westbound into university markets.', href: '/local-movers/virginia/charlottesville' },
    { label: 'Lake Anna seasonal / waterfront moves', direction: 'within', context: 'Weekend peaks and driveway grades; photo access mandatory.' },
    { label: 'Northeast → Louisa Lake Anna & crossroads housing', direction: 'inbound', context: 'Lifestyle and family inflows; FMCSA for interstate legs.' },
  ],
  gloucester: [
    { label: 'Within Gloucester (Point ↔ Court House / northern necks)', direction: 'within', context: 'Bridge-edge waterfront vs small-town seat vs narrow neck roads.' },
    { label: 'Gloucester → York (parent cross-river)', direction: 'outbound', context: 'Middle Peninsula to Peninsula pairs; bridge freeflow dominates.', href: '/local-movers/virginia/york' },
    { label: 'Gloucester → Newport News / Hampton job markets', direction: 'outbound', context: 'Employment legs across the York; price portal time honestly.', href: '/local-movers/virginia/newport-news' },
    { label: 'Waterfront and neck last-mile moves', direction: 'within', context: 'Shuttle vans often required; full tractor-trailers are wrong tools.' },
    { label: 'Northeast → Gloucester Middle Peninsula housing', direction: 'inbound', context: 'Family and waterfront lifestyle inflows; FMCSA for interstate legs.' },
  ],
  'isle-of-wight': [
    { label: 'Within Isle of Wight (Smithfield ↔ Carrollton / rural west)', direction: 'within', context: 'Historic town staging vs HOA growth vs farm lanes — not one local rate.' },
    { label: 'Isle of Wight → Suffolk (parent contrast)', direction: 'outbound', context: 'County to large independent-city pairs; multi-regime freeflow.', href: '/local-movers/virginia/suffolk' },
    { label: 'Carrollton → Newport News / Peninsula job markets', direction: 'outbound', context: 'Northern growth employment legs; price empty miles honestly.', href: '/local-movers/virginia/newport-news' },
    { label: 'Smithfield historic downtown moves', direction: 'within', context: 'Event peaks and limited truck room; plan shuttles early.' },
    { label: 'Northeast → Isle of Wight County housing', direction: 'inbound', context: 'Family and Roads-edge inflows; FMCSA for interstate legs.' },
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
  // Tennessee Tier 2 Wave 1 (new secondary markets; sumner/wilson/blount/sevier already above)
  maury: [
    { label: 'Within Maury (Columbia ↔ Spring Hill edge / Mount Pleasant)', direction: 'within', context: 'Seat mixed stock vs county-line growth vs southern small-city — pin Spring Hill jurisdiction.' },
    { label: 'Maury → Williamson / Franklin (parent contrast)', direction: 'outbound', context: 'South-middle TN into premium Williamson product — not a Franklin rename.', href: '/local-movers/tennessee/williamson' },
    { label: 'Maury → Davidson / Nashville job markets', direction: 'outbound', context: 'I-65 northbound employment legs; price portal time honestly.', href: '/local-movers/tennessee/davidson' },
    { label: 'Spring Hill county-line household moves', direction: 'within', context: 'Maury vs Williamson addresses look continuous — confirm before pack day.' },
    { label: 'Northeast / Florida → Columbia growth housing', direction: 'inbound', context: 'Interstate arrivals into south-middle TN; FMCSA for cross-state legs.' },
  ],
  robertson: [
    { label: 'Within Robertson (Springfield ↔ Greenbrier / White House edge)', direction: 'within', context: 'Seat small-city vs crossroads towns vs border growth — rural last-mile common.' },
    { label: 'Robertson → Davidson / Nashville (parent contrast)', direction: 'outbound', context: 'Northwest collar into Music City employment — not a Davidson rename.', href: '/local-movers/tennessee/davidson' },
    { label: 'Robertson → Montgomery / Clarksville pairs', direction: 'outbound', context: 'Western secondary gravity; not Fort Campbell PCS by default.', href: '/local-movers/tennessee/montgomery' },
    { label: 'Robertson ↔ Sumner north-collar pairs', direction: 'within', context: 'Different north-ring fabrics — not identical route blobs.', href: '/local-movers/tennessee/sumner' },
    { label: 'Kentucky / Midwest → Springfield-area housing', direction: 'inbound', context: 'Border and regional arrivals; FMCSA when crossing state lines.' },
  ],
  washington: [
    { label: 'Within Washington (Johnson City / ETSU ↔ Jonesborough / foothill edges)', direction: 'within', context: 'University multi-family vs historic seat vs grades — term peaks spike demand.' },
    { label: 'Washington → Sullivan / Kingsport (parent contrast)', direction: 'outbound', context: 'Tri-Cities multi-county legs; name each jurisdiction.', href: '/local-movers/tennessee/sullivan' },
    { label: 'ETSU term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Washington ↔ Virginia Tri-Cities border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Northeast / Midwest → Johnson City housing', direction: 'inbound', context: 'Medical and university inflows; FMCSA for interstate legs.' },
  ],
  madison: [
    { label: 'Within Madison (Jackson core ↔ growth belts / rural farms)', direction: 'within', context: 'Small-city medical core vs HOA growth vs agricultural last-mile — not Memphis defaults.' },
    { label: 'Madison → Shelby / Memphis (parent contrast)', direction: 'outbound', context: 'I-40 westbound long haul into river-city stock — not a Shelby rename.', href: '/local-movers/tennessee/shelby' },
    { label: 'Jackson → Nashville I-40 career moves', direction: 'outbound', context: 'In-state long haul; price empty miles honestly.', href: '/local-movers/tennessee/davidson' },
    { label: 'Medical and university-adjacent Jackson moves', direction: 'within', context: 'Hospital and campus streets rewrite curb plans.' },
    { label: 'Midwest / Mississippi → Jackson West TN hub', direction: 'inbound', context: 'Regional arrivals; FMCSA when crossing state lines.' },
  ],
  bradley: [
    { label: 'Within Bradley (Cleveland ↔ I-75 growth / Ocoee edge)', direction: 'within', context: 'Seat mixed stock vs corridor growth vs recreation approaches.' },
    { label: 'Bradley → Hamilton / Chattanooga (parent contrast)', direction: 'outbound', context: 'North collar into river-city product — not a Hamilton rename.', href: '/local-movers/tennessee/hamilton' },
    { label: 'Bradley ↔ North Georgia border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Manufacturing-adjacent workforce housing moves', direction: 'within', context: 'Shift timing near plants rewrites neighborhood access.' },
    { label: 'Northeast / Florida → Cleveland TN housing', direction: 'inbound', context: 'Employment and family inflows; FMCSA for interstate legs.' },
  ],
  anderson: [
    { label: 'Within Anderson (Oak Ridge ↔ Clinton / rural valleys)', direction: 'within', context: 'Lab-town hills vs seat small-city vs ridge-and-valley lots — not west Knox flat defaults.' },
    { label: 'Anderson → Knox / Knoxville (parent contrast)', direction: 'outbound', context: 'West-of-Knox collar into denser metro product — not a Knox rename.', href: '/local-movers/tennessee/knox' },
    { label: 'Oak Ridge workforce & tech housing moves', direction: 'within', context: 'Mid-century street plans and grades; photo hillside driveways.' },
    { label: 'Anderson ↔ Blount / Maryville pairs', direction: 'within', context: 'East Tennessee multi-county logistics; clarify county lines.', href: '/local-movers/tennessee/blount' },
    { label: 'Northeast / Midwest → Oak Ridge-area housing', direction: 'inbound', context: 'Lab and professional inflows; FMCSA for interstate legs.' },
  ],
  putnam: [
    { label: 'Within Putnam (Cookeville / Tech ↔ Algood / plateau edge)', direction: 'within', context: 'University multi-family vs satellite towns vs rural grades — term peaks spike demand.' },
    { label: 'Putnam → Davidson / Nashville (parent contrast)', direction: 'outbound', context: 'Upper Cumberland long haul into Music City — not a Nashville suburb rename.', href: '/local-movers/tennessee/davidson' },
    { label: 'Cookeville → Knoxville I-40 pairs', direction: 'outbound', context: 'Eastbound long haul; price empty miles honestly.', href: '/local-movers/tennessee/knox' },
    { label: 'Tennessee Tech term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book elevators early.' },
    { label: 'Northeast / Florida → Cookeville housing', direction: 'inbound', context: 'University and regional hub inflows; FMCSA for interstate legs.' },
  ],
  dickson: [
    { label: 'Within Dickson (Dickson city ↔ White Bluff / Charlotte / rural west)', direction: 'within', context: 'Principal city vs eastern commute collar vs seat town vs acreage lots.' },
    { label: 'Dickson → Davidson / Nashville (parent contrast)', direction: 'outbound', context: 'Western collar into Music City employment — not a Davidson rename.', href: '/local-movers/tennessee/davidson' },
    { label: 'Dickson → Williamson / Franklin pairs', direction: 'outbound', context: 'Southwest metro legs; price portal time honestly.', href: '/local-movers/tennessee/williamson' },
    { label: 'Dickson ↔ Montgomery / Clarksville pairs', direction: 'within', context: 'Different west-middle TN products — not Fort Campbell by default.', href: '/local-movers/tennessee/montgomery' },
    { label: 'Midwest / Florida → Dickson west-collar housing', direction: 'inbound', context: 'Family and space-seeking inflows; FMCSA for interstate legs.' },
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
  kendall: [
    { label: 'Within Kendall (Oswego ↔ Yorkville / Montgomery edges)', direction: 'within', context: 'Outer-collar HOA growth vs seat multi-family — not Joliet industrial defaults.' },
    { label: 'Will → Kendall southwest outer-collar growth', direction: 'inbound', href: '/local-movers/illinois/will', context: 'Parent-market hops on US-34 into Oswego HOA and multi-family product.' },
    { label: 'Kendall → Will / Joliet job markets', direction: 'outbound', href: '/local-movers/illinois/will', context: 'Outer-collar professionals into Will multi-story and industrial-edge stock.' },
    { label: 'Kane → Kendall growth corridors', direction: 'inbound', href: '/local-movers/illinois/kane', context: 'West-collar spillover into Yorkville and Montgomery edges.' },
    { label: 'Midwest → Kendall outer-collar housing', direction: 'inbound', context: 'Family inflows seeking space outside continuous Will density.' },
    { label: 'Kendall → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  dekalb: [
    { label: 'Within DeKalb (NIU campus edge ↔ Sycamore / Genoa)', direction: 'within', context: 'University multi-story vs seat SFH — term calendars rewrite pure Saturday plans.' },
    { label: 'Kane → DeKalb I-88 west university market', direction: 'inbound', href: '/local-movers/illinois/kane', context: 'Parent-biased hops into NIU multi-family and Sycamore product.' },
    { label: 'DeKalb → Kane / Fox River job markets', direction: 'outbound', href: '/local-movers/illinois/kane', context: 'University-town professionals into Aurora/Elgin multi-family stock.' },
    { label: 'National student & faculty inflows → NIU', direction: 'inbound', context: 'August/May clusters; stairs and multi-unit access dominate near campus.' },
    { label: 'DeKalb → Chicago career exits (I-88)', direction: 'outbound', context: 'Long in-state professional moves; confirm ICC for pure IL legs.' },
    { label: 'DeKalb → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  grundy: [
    { label: 'Within Grundy (Morris ↔ Minooka / Coal City)', direction: 'within', context: 'I-80 industrial-edge product — not continuous Will HOA density.' },
    { label: 'Will → Grundy I-80 industrial/residential edge', direction: 'inbound', href: '/local-movers/illinois/will', context: 'Parent-biased hops on I-80 into Morris multi-story and industrial-edge SFH.' },
    { label: 'Grundy → Will / Joliet job markets', direction: 'outbound', href: '/local-movers/illinois/will', context: 'Industrial-edge professionals into Will multi-story and warehouse-adjacent stock.' },
    { label: 'Grundy ↔ LaSalle Illinois Valley pairs', direction: 'within', context: 'I-80 valley logistics; discontinuous towns need empty-mile honesty.' },
    { label: 'Energy / plant calendar local moves', direction: 'within', context: 'Shift windows reshape mid-week demand near industrial edges.' },
    { label: 'Grundy → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  kankakee: [
    { label: 'Within Kankakee (Kankakee seat ↔ Bradley / Bourbonnais)', direction: 'within', context: 'I-57 south regional multi-story vs multi-family — not Will collar clone.' },
    { label: 'Will → Kankakee I-57 south regional hub', direction: 'inbound', href: '/local-movers/illinois/will', context: 'Parent-biased hops south on I-57 into Kankakee and Bradley product.' },
    { label: 'Kankakee → Will / Chicago-collar job markets', direction: 'outbound', href: '/local-movers/illinois/will', context: 'Regional professionals into south-collar multi-family stock.' },
    { label: 'Indiana border interstate legs', direction: 'outbound', context: 'I-57 south can leave Illinois quickly; FMCSA when either end is out of state.' },
    { label: 'Bradley multi-family lease waves', direction: 'within', context: 'Elevators and parking plans differ from Bourbonnais SFH.' },
    { label: 'Kankakee → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  boone: [
    { label: 'Within Boone (Belvidere ↔ Poplar Grove / Capron edges)', direction: 'within', context: 'Manufacturing-edge multi-story vs rural lots — not Rockford core rename.' },
    { label: 'Winnebago / Rockford → Boone east I-90 collar', direction: 'inbound', href: '/local-movers/illinois/winnebago', context: 'Parent-market hops on I-90 into Belvidere multi-story and auto-edge housing.' },
    { label: 'Boone → Rockford / Winnebago job markets', direction: 'outbound', href: '/local-movers/illinois/winnebago', context: 'East-collar professionals into Rockford multi-story and suburban stock.' },
    { label: 'Auto manufacturing PCS-style hard dates', direction: 'inbound', context: 'Plant report dates drive mid-week demand more than preferred Saturdays.' },
    { label: 'Boone → Wisconsin interstate legs', direction: 'outbound', context: 'I-90 northbound can leave Illinois; FMCSA when either end is out of state.' },
    { label: 'Boone → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  peoria: [
    { label: 'Within Peoria (Medical District / Downtown ↔ Heights / Dunlap edges)', direction: 'within', context: 'Central Illinois hub — bluff grades and medical multi-unit, not Chicago elevators as default.' },
    { label: 'Midwest → Peoria medical & manufacturing markets', direction: 'inbound', context: 'Healthcare and industrial employment inflows into multi-unit and SFH stock.' },
    { label: 'Peoria ↔ Tazewell (East Peoria) pairs', direction: 'within', href: '/local-movers/illinois/tazewell', context: 'River-crossing logistics; clarify Peoria County vs Tazewell addresses.' },
    { label: 'Peoria → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-74 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'Peoria ↔ Sangamon / McLean central IL pairs', direction: 'within', context: 'Independent hub pairs; empty miles matter more than map labels.' },
    { label: 'Peoria → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  tazewell: [
    { label: 'Within Tazewell (East Peoria ↔ Pekin / Morton)', direction: 'within', context: 'River multi-family vs seat multi-story vs HOA growth — not Peoria medical-core defaults.' },
    { label: 'Peoria → Tazewell river-south collar', direction: 'inbound', href: '/local-movers/illinois/peoria', context: 'Parent-market bridge hops into East Peoria multi-family and Pekin stock.' },
    { label: 'Tazewell → Peoria medical / job markets', direction: 'outbound', href: '/local-movers/illinois/peoria', context: 'South/east collar professionals into medical multi-family and bluff stock.' },
    { label: 'Morton HOA growth local moves', direction: 'within', context: 'Gate lists and I-74 freeflow — not pure East Peoria elevator product.' },
    { label: 'Tazewell → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-74 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'Tazewell → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  mclean: [
    { label: 'Within McLean (Bloomington ↔ Normal / twin-city HOA edges)', direction: 'within', context: 'Insurance multi-story vs ISU multi-family — twin-city empty miles matter.' },
    { label: 'National / Midwest → Bloomington–Normal insurance & university markets', direction: 'inbound', context: 'Corporate and student inflows into multi-unit and HOA stock.' },
    { label: 'McLean ↔ Champaign / Sangamon central IL pairs', direction: 'within', href: '/local-movers/illinois/champaign', context: 'I-55 / I-74 long locals; distinct from UIUC or capital product.' },
    { label: 'McLean → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-55 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'ISU term calendar local moves', direction: 'within', context: 'August/May clusters near Normal multi-family; book capacity early.' },
    { label: 'McLean → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  champaign: [
    { label: 'Within Champaign (Campus Town / Urbana ↔ Savoy / Mahomet)', direction: 'within', context: 'UIUC lease peaks vs family suburban product — not Bloomington twin-city clone.' },
    { label: 'National student & faculty inflows → Champaign–Urbana', direction: 'inbound', context: 'August/May clusters; stairs and multi-unit access dominate near campus.' },
    { label: 'Champaign ↔ McLean / Sangamon regional pairs', direction: 'within', href: '/local-movers/illinois/mclean', context: 'I-57 / I-74 long locals; price portal time honestly.' },
    { label: 'Champaign → Chicago / Indy career exits', direction: 'outbound', context: 'I-57 north or I-74 east professional moves; FMCSA out of state.' },
    { label: 'Campus Town multi-unit turnover waves', direction: 'within', context: 'Short notice lease ends; book peak weekends early.' },
    { label: 'Champaign → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; volume calculator recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  sangamon: [
    { label: 'Within Sangamon (Downtown Springfield ↔ Chatham / Rochester)', direction: 'within', context: 'Capital multi-unit vs growth HOA — not Bloomington or Champaign product.' },
    { label: 'In-state IL → Springfield government / medical markets', direction: 'inbound', context: 'Session and agency calendars create mid-week demand clusters.' },
    { label: 'Sangamon ↔ McLean / Peoria / Champaign regional pairs', direction: 'within', href: '/local-movers/illinois/mclean', context: 'Central Illinois long locals; empty miles matter.' },
    { label: 'Springfield → Chicago / St. Louis career exits', direction: 'outbound', context: 'I-55 corridor professional moves; FMCSA when leaving Illinois.' },
    { label: 'Medical corridor multi-family turns', direction: 'within', context: 'Elevator buildings near hospital districts; mid-month lease waves.' },
    { label: 'Sangamon → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  'rock-island': [
    { label: 'Within Rock Island (Rock Island / Moline ↔ East Moline / Silvis)', direction: 'within', context: 'Quad Cities river multi-story — not Chicago elevator defaults.' },
    { label: 'Iowa / Midwest → Quad Cities IL markets', direction: 'inbound', context: 'Interstate inflows across Mississippi bridges; FMCSA when either end is out of Illinois.' },
    { label: 'Rock Island ↔ Scott County IA pairs', direction: 'outbound', context: 'Short bridge hops can be interstate; confirm FMCSA vs ICC for exact addresses.' },
    { label: 'Rock Island → Chicago / Peoria career exits', direction: 'outbound', context: 'I-88 / I-74 professional moves; empty miles rewrite local rates.' },
    { label: 'Moline multi-family and professional corridors', direction: 'within', context: 'Elevators and arterial freeflow differ from pure river-town stairs.' },
    { label: 'Rock Island → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
  ],
  lasalle: [
    { label: 'Within LaSalle (Ottawa ↔ Peru / LaSalle / Streator)', direction: 'within', context: 'Illinois Valley multi-town product — not Morris industrial-edge rename.' },
    { label: 'Grundy → LaSalle Illinois Valley pairs', direction: 'inbound', href: '/local-movers/illinois/grundy', context: 'Parent-biased I-80 hops into Ottawa multi-story and valley towns.' },
    { label: 'LaSalle → Grundy / Will job markets', direction: 'outbound', href: '/local-movers/illinois/grundy', context: 'Valley professionals into I-80 industrial-edge and Will collar stock.' },
    { label: 'LaSalle → Chicago career exits (I-80)', direction: 'outbound', context: 'Long in-state professional moves; confirm ICC for pure IL legs.' },
    { label: 'Streator / Mendota outer-town local moves', direction: 'within', context: 'Empty miles between discontinuous towns dominate quotes.' },
    { label: 'LaSalle → Florida / Sun Belt long-distance', direction: 'outbound', context: 'Interstate household goods; inventory surveys recommended.', href: '/resources/routes/illinois-to-florida' },
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
    { label: 'Within Weld (Greeley ↔ Windsor / Firestone edges)', direction: 'within', context: 'Northern Front Range multi-story vs HOA growth — not Adams Denver-north defaults.' },
    { label: 'Adams → Weld I-25 north growth collar', direction: 'inbound', href: '/local-movers/colorado/adams', context: 'Parent-market hops on I-25 into Windsor HOA and Greeley multi-story product.' },
    { label: 'Weld → Adams / Denver job markets', direction: 'outbound', href: '/local-movers/colorado/adams', context: 'North-collar professionals into north-metro multi-family stock.' },
    { label: 'Weld ↔ Larimer / Fort Collins pairs', direction: 'within', href: '/local-movers/colorado/larimer', context: 'I-25 / US-34 logistics; longer empty miles than core metro collar.' },
    { label: 'Energy / ag workforce mid-week moves', direction: 'inbound', context: 'Hard report dates and industrial traffic near growth towns.' },
    { label: 'Weld → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  pueblo: [
    { label: 'Within Pueblo (city multi-story ↔ Pueblo West)', direction: 'within', context: 'Southern Front Range industrial city — not Colorado Springs clone.' },
    { label: 'El Paso / Colorado Springs → Pueblo pairs', direction: 'inbound', href: '/local-movers/colorado/el-paso', context: 'Parent-contrast I-25 hops into Pueblo multi-story and industrial-edge stock.' },
    { label: 'Pueblo → Colorado Springs job markets', direction: 'outbound', href: '/local-movers/colorado/el-paso', context: 'Southern Front Range professionals into Springs multi-family stock.' },
    { label: 'Texas / New Mexico → Pueblo regional markets', direction: 'inbound', context: 'I-25 corridor interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Pueblo West HOA growth local moves', direction: 'within', context: 'Gate lists and empty miles from core yards — not pure downtown stairs.' },
    { label: 'Pueblo → Denver / out-of-state career exits', direction: 'outbound', context: 'I-25 northbound or interstate; confirm CO PUC vs FMCSA for the full route.' },
  ],
  mesa: [
    { label: 'Within Mesa (Grand Junction ↔ Fruita / Clifton / Palisade)', direction: 'within', context: 'Western Slope hub multi-story — not Front Range defaults.' },
    { label: 'Front Range → Grand Junction Western Slope hub', direction: 'inbound', href: '/local-movers/colorado/denver', context: 'Long I-70 empty miles into independent valley hub stock.' },
    { label: 'Mesa → Denver / Front Range career exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'I-70 multi-day in-state hauls; CO PUC for pure Colorado jobs.' },
    { label: 'Utah / California → Grand Junction lifestyle markets', direction: 'inbound', context: 'I-70 interstate household goods; FMCSA when either end is out of Colorado.', href: '/resources/routes/california-to-colorado' },
    { label: 'Palisade / orchard-edge seasonal local moves', direction: 'within', context: 'Harvest traffic and narrow approaches rewrite pure city day rates.' },
    { label: 'Mesa → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  eagle: [
    { label: 'Within Eagle (Vail ↔ Edwards / Eagle)', direction: 'within', context: 'I-70 resort multi-story vs corridor multi-family — not Summit high-country defaults.' },
    { label: 'Front Range → Vail / Edwards resort moves', direction: 'inbound', href: '/local-movers/colorado/denver', context: 'I-70 mountain logistics; association truck limits dominate unload day.' },
    { label: 'Eagle ↔ Summit high-country pairs', direction: 'within', href: '/local-movers/colorado/summit', context: 'Distinct mountain products; do not recycle Breckenridge rates for Vail associations.' },
    { label: 'California / Texas → Eagle resort second homes', direction: 'inbound', context: 'Interstate household goods into association multi-story stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Ski-season peak local moves', direction: 'within', context: 'Tourism weekends fill crews; book capacity early.' },
    { label: 'Eagle → Front Range reverse exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'Down-valley returns; CO PUC for pure in-state jobs.' },
  ],
  summit: [
    { label: 'Within Summit (Breckenridge ↔ Frisco / Silverthorne)', direction: 'within', context: 'High-country multi-town resort product — not Eagle Vail corridor rename.' },
    { label: 'Front Range → Summit high-country resorts', direction: 'inbound', href: '/local-movers/colorado/denver', context: 'I-70 / CO-9 logistics; association limits and elevation weather dominate.' },
    { label: 'Summit ↔ Eagle mountain pairs', direction: 'within', href: '/local-movers/colorado/eagle', context: 'Distinct from Vail/Edwards; price each county product honestly.' },
    { label: 'California / Texas → Breckenridge / Frisco homes', direction: 'inbound', context: 'Interstate household goods into high-country multi-story stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Ski-season peak local moves', direction: 'within', context: 'Tourism weekends fill crews; lake-edge approaches need photo surveys.' },
    { label: 'Summit → Front Range reverse exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'Down-elevation returns; CO PUC for pure in-state jobs.' },
  ],
  'la-plata': [
    { label: 'Within La Plata (Durango ↔ Bayfield / valley edges)', direction: 'within', context: 'SW mountain hub multi-story — not I-70 resort clone.' },
    { label: 'Front Range → Durango SW hub', direction: 'inbound', href: '/local-movers/colorado/denver', context: 'Long empty miles into independent SW mountain stock.' },
    { label: 'New Mexico / Arizona → Durango lifestyle markets', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.', href: '/resources/routes/california-to-colorado' },
    { label: 'Tourism-season Durango multi-story moves', direction: 'within', context: 'Festival and peak weekends rewrite curb plans.' },
    { label: 'La Plata → Front Range career exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'Multi-day in-state hauls; CO PUC for pure Colorado jobs.' },
    { label: 'La Plata → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  garfield: [
    { label: 'Within Garfield (Glenwood ↔ Rifle / Carbondale edges)', direction: 'within', context: 'Mid-slope multi-story vs industrial multi-family — not Vail resort core.' },
    { label: 'Eagle → Garfield mid-slope pairs', direction: 'inbound', href: '/local-movers/colorado/eagle', context: 'Parent-contrast I-70 hops into Glenwood multi-story and Rifle stock.' },
    { label: 'Garfield → Eagle resort job markets', direction: 'outbound', href: '/local-movers/colorado/eagle', context: 'Mid-slope professionals into Vail/Edwards multi-family stock.' },
    { label: 'Garfield ↔ Mesa Western Slope pairs', direction: 'within', href: '/local-movers/colorado/mesa', context: 'I-70 west logistics; empty miles between seats matter.' },
    { label: 'Energy / industrial mid-week moves near Rifle', direction: 'inbound', context: 'Shift calendars rewrite pure Saturday residential assumptions.' },
    { label: 'Garfield → Front Range reverse exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'I-70 multi-day in-state hauls; CO PUC for pure Colorado jobs.' },
  ],
  routt: [
    { label: 'Within Routt (Steamboat ↔ Hayden / valley edges)', direction: 'within', context: 'Yampa Valley resort multi-story — not Eagle or Summit I-70 product.' },
    { label: 'Front Range → Steamboat NW resort moves', direction: 'inbound', href: '/local-movers/colorado/denver', context: 'Long empty miles into independent Yampa Valley stock.' },
    { label: 'Routt vs Eagle / Summit mountain distinction', direction: 'within', href: '/local-movers/colorado/eagle', context: 'Do not recycle Vail or Breckenridge association day rates alone.' },
    { label: 'California / Texas → Steamboat second homes', direction: 'inbound', context: 'Interstate household goods into resort multi-story stock.', href: '/resources/routes/california-to-colorado' },
    { label: 'Ski-season peak local moves', direction: 'within', context: 'Tourism weekends fill crews; association packets dominate unload day.' },
    { label: 'Routt → Front Range reverse exits', direction: 'outbound', href: '/local-movers/colorado/denver', context: 'Down-valley returns; CO PUC for pure in-state jobs.' },
  ],
  elbert: [
    { label: 'Within Elbert (Elizabeth ↔ Kiowa / acreage belts)', direction: 'within', context: 'Outer SE plains acreage — not Highlands Ranch HOA rename.' },
    { label: 'Douglas → Elbert outer plains collar', direction: 'inbound', href: '/local-movers/colorado/douglas', context: 'Parent-market hops into Elizabeth multi-family and acreage lots.' },
    { label: 'Elbert → Douglas / Denver job markets', direction: 'outbound', href: '/local-movers/colorado/douglas', context: 'Outer-collar professionals into south-metro HOA multi-family stock.' },
    { label: 'Arapahoe → Elbert acreage pairs', direction: 'inbound', href: '/local-movers/colorado/arapahoe', context: 'SE metro spillover into exurban lots; empty miles matter.' },
    { label: 'Acreage last-mile local moves', direction: 'within', context: 'Long drives and soft shoulders rewrite pure cul-de-sac assumptions.' },
    { label: 'Elbert → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
  ],
  teller: [
    { label: 'Within Teller (Woodland Park ↔ Divide / Cripple Creek)', direction: 'within', context: 'COS mountain-west multi-family — not El Paso continuous Springs product.' },
    { label: 'El Paso / Colorado Springs → Teller mountain collar', direction: 'inbound', href: '/local-movers/colorado/el-paso', context: 'Parent-market hops on US-24 into Woodland Park multi-family stock.' },
    { label: 'Teller → Colorado Springs job markets', direction: 'outbound', href: '/local-movers/colorado/el-paso', context: 'Mountain-collar professionals into Springs multi-family stock.' },
    { label: 'Cripple Creek tourism multi-story moves', direction: 'within', context: 'Tourism peaks and grades rewrite pure Woodland Park driveway rates.' },
    { label: 'Mountain grade last-mile local moves', direction: 'within', context: 'Photo approaches; winter ice is first-class staging risk.' },
    { label: 'Teller → Denver / out-of-state exits', direction: 'outbound', context: 'I-25 or interstate; confirm CO PUC vs FMCSA for the full route.' },
  ],
  fremont: [
    { label: 'Within Fremont (Cañon City ↔ Florence / Penrose)', direction: 'within', context: 'Arkansas Valley multi-story — not Pueblo industrial city rename.' },
    { label: 'Pueblo → Fremont valley pairs', direction: 'inbound', href: '/local-movers/colorado/pueblo', context: 'Parent-contrast US-50 hops into Cañon multi-story stock.' },
    { label: 'Fremont → Pueblo job markets', direction: 'outbound', href: '/local-movers/colorado/pueblo', context: 'Valley professionals into Pueblo multi-story and industrial-edge stock.' },
    { label: 'Royal Gorge tourism peak local moves', direction: 'within', context: 'Tourism weekends rewrite curb plans near gorge corridors.' },
    { label: 'Fremont ↔ El Paso / Springs pairs', direction: 'within', href: '/local-movers/colorado/el-paso', context: 'CO-115 regional logistics; empty miles matter.' },
    { label: 'Fremont → Denver / out-of-state exits', direction: 'outbound', context: 'Long in-state or interstate; confirm CO PUC vs FMCSA.' },
  ],
  broomfield: [
    { label: 'Within Broomfield (employment multi-family ↔ HOA villages)', direction: 'within', context: 'Compact north-metro city-county — not Adams continuous industrial-residential product.' },
    { label: 'Adams → Broomfield north-metro multi-family', direction: 'inbound', href: '/local-movers/colorado/adams', context: 'Parent-market hops into COI multi-family and planned HOA stock.' },
    { label: 'Broomfield → Adams / Denver job markets', direction: 'outbound', href: '/local-movers/colorado/adams', context: 'City-county professionals into north-metro multi-family stock.' },
    { label: 'Broomfield ↔ Boulder / US-36 pairs', direction: 'within', href: '/local-movers/colorado/boulder', context: 'Flatiron corridor logistics; US-36 peaks are billable.' },
    { label: 'Broomfield ↔ Jefferson west-metro pairs', direction: 'within', href: '/local-movers/colorado/jefferson', context: 'North-west metro logistics; clarify county lines on every estimate.' },
    { label: 'Broomfield → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Colorado.' },
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
  skagit: [
    { label: 'Within Skagit (Mount Vernon ↔ Burlington / Anacortes)', direction: 'within', context: 'North I-5 multi-story vs multi-family — not Bellingham or Everett rename.' },
    { label: 'Whatcom → Skagit north I-5 mid-corridor', direction: 'inbound', href: '/local-movers/washington/whatcom', context: 'Parent-contrast hops on I-5 into Mount Vernon multi-story and Burlington multi-family.' },
    { label: 'Skagit → Snohomish / Everett job markets', direction: 'outbound', href: '/local-movers/washington/snohomish', context: 'Mid-corridor professionals into Everett multi-family stock.' },
    { label: 'Anacortes ferry-adjacent local moves', direction: 'within', context: 'Ferry windows rewrite schedules; clarify sailing constraints early.' },
    { label: 'Ag / harvest mid-week local moves', direction: 'inbound', context: 'Harvest traffic reshapes pure Saturday residential assumptions.' },
    { label: 'Skagit → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Canada-bound logistics checks).' },
  ],
  yakima: [
    { label: 'Within Yakima (city multi-story ↔ West Valley / Selah)', direction: 'within', context: 'Central WA ag/medical hub — not Puget Sound collar product.' },
    { label: 'Puget Sound → Yakima central hub', direction: 'inbound', href: '/local-movers/washington/king', context: 'Long Cascades empty miles into independent valley hub stock.' },
    { label: 'Yakima ↔ Benton / Tri-Cities pairs', direction: 'within', href: '/local-movers/washington/benton', context: 'I-82 corridor long locals; empty miles matter.' },
    { label: 'Ag / harvest workforce patterns', direction: 'inbound', context: 'Seasonal demand and outbuildings appear on rural-edge surveys.' },
    { label: 'California / Midwest → Yakima regional markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Yakima → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  benton: [
    { label: 'Within Benton (Kennewick ↔ Richland / West Richland)', direction: 'within', context: 'Tri-Cities west/south employment multi-family — not Pasco east-bank rename.' },
    { label: 'Lab / energy workforce inflows', direction: 'inbound', context: 'Hard report dates and multi-family lease waves near employment corridors.' },
    { label: 'Benton ↔ Franklin (Pasco) bridge pairs', direction: 'within', href: '/local-movers/washington/franklin', context: 'River crossings; clarify county lines and portal-to-portal time.' },
    { label: 'Yakima → Benton Tri-Cities pairs', direction: 'inbound', href: '/local-movers/washington/yakima', context: 'I-82 long locals into employment multi-family stock.' },
    { label: 'California / Colorado → Tri-Cities markets', direction: 'inbound', context: 'Interstate household goods into inland housing stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Benton → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Idaho/Oregon lanes).' },
  ],
  franklin: [
    { label: 'Within Franklin (Pasco multi-story ↔ multi-family growth)', direction: 'within', context: 'Tri-Cities east bank — not Kennewick/Richland employment multi-family renamed.' },
    { label: 'Benton → Franklin east-bank pairs', direction: 'inbound', href: '/local-movers/washington/benton', context: 'Parent-market bridge hops into Pasco multi-story and multi-family stock.' },
    { label: 'Franklin → Benton job markets', direction: 'outbound', href: '/local-movers/washington/benton', context: 'East-bank professionals into Kennewick/Richland multi-family stock.' },
    { label: 'Ag-edge residential local moves', direction: 'within', context: 'Irrigation and soft shoulders rewrite pure multi-family assumptions.' },
    { label: 'Franklin → Yakima / I-82 pairs', direction: 'outbound', href: '/local-movers/washington/yakima', context: 'Basin corridor logistics; empty miles matter.' },
    { label: 'Franklin → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  cowlitz: [
    { label: 'Within Cowlitz (Longview ↔ Kelso / Woodland)', direction: 'within', context: 'Industrial river multi-story — not Vancouver WA multi-family rename.' },
    { label: 'Clark → Cowlitz I-5 industrial corridor', direction: 'inbound', href: '/local-movers/washington/clark', context: 'Parent-market hops north on I-5 into Longview multi-story and industrial-edge stock.' },
    { label: 'Cowlitz → Clark / Vancouver job markets', direction: 'outbound', href: '/local-movers/washington/clark', context: 'Corridor professionals into Vancouver multi-family stock.' },
    { label: 'Portland OR cross-border pairs', direction: 'outbound', context: 'I-5 southbound can leave Washington; FMCSA when either end is out of state.' },
    { label: 'Mill / industrial mid-week local moves', direction: 'inbound', context: 'Shift calendars rewrite pure Saturday residential assumptions.' },
    { label: 'Cowlitz → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington (including Oregon destinations).' },
  ],
  island: [
    { label: 'Within Island (Oak Harbor ↔ Coupeville / Camano)', direction: 'within', context: 'Ferry/bridge-constrained island multi-family — not mainland Snohomish product.' },
    { label: 'Snohomish → Island ferry/bridge pairs', direction: 'inbound', href: '/local-movers/washington/snohomish', context: 'Parent-contrast hops; sailing windows and truck size limits dominate.' },
    { label: 'NAS Whidbey PCS inflows', direction: 'inbound', context: 'Order-driven calendars; report dates drive the plan more than preferred Saturdays.' },
    { label: 'Island ↔ Kitsap peninsula pairs', direction: 'within', href: '/local-movers/washington/kitsap', context: 'Ferry logistics at both ends; confirm sailing constraints early.' },
    { label: 'Camano bridge approach local moves', direction: 'within', context: 'Bridge freeflow and rain staging rewrite pure Oak Harbor multi-family rates.' },
    { label: 'Island → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  lewis: [
    { label: 'Within Lewis (Centralia ↔ Chehalis / Napavine)', direction: 'within', context: 'I-5 mid-south multi-story — not Olympia capital multi-family rename.' },
    { label: 'Thurston → Lewis I-5 mid-south corridor', direction: 'inbound', href: '/local-movers/washington/thurston', context: 'Parent-market hops south on I-5 into Centralia multi-story stock.' },
    { label: 'Lewis → Thurston / Olympia job markets', direction: 'outbound', href: '/local-movers/washington/thurston', context: 'Corridor professionals into capital multi-family stock.' },
    { label: 'Lewis ↔ Cowlitz / Clark pairs', direction: 'within', href: '/local-movers/washington/cowlitz', context: 'I-5 southwest logistics; empty miles matter.' },
    { label: 'Rain staging multi-story local moves', direction: 'within', context: 'Open carries need weather-aware plans on corridor streets.' },
    { label: 'Lewis → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  grant: [
    { label: 'Within Grant (Moses Lake ↔ Ephrata / Quincy)', direction: 'within', context: 'Columbia Basin hub multi-story — not Cascade/Puget Sound product.' },
    { label: 'Puget Sound → Moses Lake basin hub', direction: 'inbound', href: '/local-movers/washington/king', context: 'Long I-90 empty miles into independent basin stock.' },
    { label: 'Ag / harvest workforce patterns', direction: 'inbound', context: 'Seasonal demand and soft shoulders on basin edges.' },
    { label: 'Grant ↔ Yakima / Chelan pairs', direction: 'within', href: '/local-movers/washington/yakima', context: 'Interior WA long locals; empty miles matter.' },
    { label: 'California / Midwest → Columbia Basin housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.', href: '/resources/routes/california-to-washington' },
    { label: 'Grant → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  chelan: [
    { label: 'Within Chelan (Wenatchee ↔ Cashmere / Leavenworth edges)', direction: 'within', context: 'North-central river valley multi-story — not Puget Sound collar product.' },
    { label: 'Puget Sound → Wenatchee valley hub', direction: 'inbound', href: '/local-movers/washington/king', context: 'US-2 long empty miles into independent valley stock.' },
    { label: 'Leavenworth tourism peak local moves', direction: 'within', context: 'Tourism weekends rewrite curb plans; photo mountain last-mile.' },
    { label: 'Ag / harvest mid-week local moves', direction: 'inbound', context: 'Harvest traffic reshapes pure Saturday residential assumptions.' },
    { label: 'Chelan ↔ Kittitas / Grant pairs', direction: 'within', href: '/local-movers/washington/kittitas', context: 'North-central long locals; empty miles matter.' },
    { label: 'Chelan → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  clallam: [
    { label: 'Within Clallam (Port Angeles ↔ Sequim / Forks)', direction: 'within', context: 'Olympic Peninsula end-of-road multi-story — not Kitsap ferry-suburb rename.' },
    { label: 'Kitsap → Clallam peninsula pairs', direction: 'inbound', href: '/local-movers/washington/kitsap', context: 'Parent-contrast hops; end-of-road empty miles dominate.' },
    { label: 'Ferry connection local/regional moves', direction: 'inbound', context: 'Sailing windows and truck size limits are first-class survey inputs.' },
    { label: 'Sequim multi-family growth local moves', direction: 'within', context: 'Elevators and HOA packets differ from Port Angeles multi-story.' },
    { label: 'Clallam → King / Sound reverse exits', direction: 'outbound', href: '/local-movers/washington/king', context: 'Long peninsula-to-Sound hauls; UTC for pure in-state jobs.' },
    { label: 'Clallam → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  'walla-walla': [
    { label: 'Within Walla Walla (city multi-story ↔ college multi-family)', direction: 'within', context: 'SE valley college/residential hub — not Tri-Cities employment multi-family rename.' },
    { label: 'Benton → Walla Walla SE valley pairs', direction: 'inbound', href: '/local-movers/washington/benton', context: 'Parent-contrast hops into college multi-family and valley multi-story stock.' },
    { label: 'College term calendar local moves', direction: 'within', context: 'Move-in/out weekends fill campus-edge crews first.' },
    { label: 'Oregon / Idaho cross-border pairs', direction: 'outbound', context: 'Short interstate hops; FMCSA when either end is out of Washington.' },
    { label: 'Walla Walla → Yakima / I-82 pairs', direction: 'outbound', href: '/local-movers/washington/yakima', context: 'SE-to-central long locals; empty miles matter.' },
    { label: 'Walla Walla → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
  ],
  kittitas: [
    { label: 'Within Kittitas (Ellensburg ↔ CWU multi-family / Cle Elum)', direction: 'within', context: 'I-90 university multi-story — not Puget Sound multi-family rename.' },
    { label: 'King → Kittitas I-90 university market', direction: 'inbound', href: '/local-movers/washington/king', context: 'Pass freeflow and long empty miles into CWU multi-family stock.' },
    { label: 'CWU term calendar local moves', direction: 'within', context: 'Move-in/out weekends fill campus-edge crews first.' },
    { label: 'Kittitas ↔ Yakima / Grant pairs', direction: 'within', href: '/local-movers/washington/yakima', context: 'Central WA long locals; empty miles matter.' },
    { label: 'I-90 pass weather regional moves', direction: 'inbound', context: 'Closures and chain laws rewrite freeflow assumptions in season.' },
    { label: 'Kittitas → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Washington.' },
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
  if (stateSlug === 'wisconsin') return WI_ROUTES[countySlug] ?? [];
  if (stateSlug === 'missouri') return MO_ROUTES[countySlug] ?? [];
  if (stateSlug === 'kentucky') return KY_ROUTES[countySlug] ?? [];
  if (stateSlug === 'nevada') return NV_ROUTES[countySlug] ?? [];
  if (stateSlug === 'oklahoma') return OK_ROUTES[countySlug] ?? [];
  if (stateSlug === 'iowa') return IA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'kansas') return KS_ROUTES[countySlug] ?? [];
  if (stateSlug === 'mississippi') return MS_ROUTES[countySlug] ?? [];
  if (stateSlug === 'new-hampshire') return NH_ROUTES[countySlug] ?? [];
  if (stateSlug === 'maine') return ME_ROUTES[countySlug] ?? [];
  if (stateSlug === 'west-virginia') return WV_ROUTES[countySlug] ?? [];
  if (stateSlug === 'rhode-island') return RI_ROUTES[countySlug] ?? [];
  if (stateSlug === 'alaska') return AK_ROUTES[countySlug] ?? [];
  if (stateSlug === 'hawaii') return HI_ROUTES[countySlug] ?? [];
  if (stateSlug === 'montana') return MT_ROUTES[countySlug] ?? [];
  if (stateSlug === 'indiana') return IN_ROUTES[countySlug] ?? [];
  if (stateSlug === 'connecticut') return CT_ROUTES[countySlug] ?? [];
  if (stateSlug === 'utah') return UT_ROUTES[countySlug] ?? [];
  if (stateSlug === 'alabama') return AL_ROUTES[countySlug] ?? [];
  if (stateSlug === 'louisiana') return LA_ROUTES[countySlug] ?? [];
  if (stateSlug === 'arkansas') return AR_ROUTES[countySlug] ?? [];
  if (stateSlug === 'new-mexico') return NM_ROUTES[countySlug] ?? [];
  if (stateSlug === 'nebraska') return NE_ROUTES[countySlug] ?? [];
  if (stateSlug === 'idaho') return ID_ROUTES[countySlug] ?? [];
  if (stateSlug === 'vermont') return VT_ROUTES[countySlug] ?? [];
  if (stateSlug === 'delaware') return DE_ROUTES[countySlug] ?? [];
  if (stateSlug === 'north-dakota') return ND_ROUTES[countySlug] ?? [];
  if (stateSlug === 'south-dakota') return SD_ROUTES[countySlug] ?? [];
  if (stateSlug === 'wyoming') return WY_ROUTES[countySlug] ?? [];
  return [];
}

const ND_ROUTES: Record<string, CountyPopularRoute[]> = {
  cass: [
    { label: 'Within Cass (Downtown Fargo ↔ West Fargo / south growth / rural valley edges)', direction: 'within', context: 'Fargo–Moorhead Red River Valley product — not Bismarck capital product.' },
    { label: 'Corporate / healthcare / university relo → Fargo metro', direction: 'inbound', context: 'Hard report dates reshape eastern ND calendars.' },
    { label: 'Cass ↔ Moorhead / Minnesota pairs', direction: 'outbound', context: 'I-94 interstate household goods; FMCSA when leaving North Dakota.' },
    { label: 'Cass ↔ Bismarck (Burleigh) I-94 pairs', direction: 'outbound', context: 'I-94 long hauls; NDDOT HHG permit for pure in-state jobs.' },
    { label: 'Minneapolis / Winnipeg corridors ↔ Fargo markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Fargo → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving North Dakota.' },
  ],
  burleigh: [
    { label: 'Within Burleigh (Downtown Bismarck ↔ north / south growth / Lincoln edges)', direction: 'within', context: 'Capital Missouri Plateau product — not Fargo valley clone.' },
    { label: 'State government / healthcare relo → Bismarck', direction: 'inbound', context: 'Capital calendars reshape central ND windows.' },
    { label: 'Burleigh ↔ Mandan / Morton pairs', direction: 'within', context: 'I-94 multi-county logistics; capital vs west-bank product differs.' },
    { label: 'Burleigh ↔ Fargo / Minot in-state pairs', direction: 'outbound', context: 'I-94 / US-83 long hauls; NDDOT HHG permit for pure in-state jobs.' },
    { label: 'Minneapolis / Denver ↔ Bismarck markets', direction: 'inbound', context: 'Interstate household goods; FMCSA when leaving North Dakota.' },
    { label: 'Bismarck → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving North Dakota.' },
  ],
  'grand-forks': [
    { label: 'Within Grand Forks (Downtown / UND corridor ↔ south / west growth belts)', direction: 'within', context: 'University and border-metro product — not Fargo south rename.' },
    { label: 'University / semester waves → Grand Forks', direction: 'inbound', context: 'Campus calendars reshape northern Red River windows.' },
    { label: 'Grand Forks ↔ East Grand Forks / Minnesota pairs', direction: 'outbound', context: 'Interstate household goods; FMCSA when leaving North Dakota.' },
    { label: 'Grand Forks ↔ Fargo I-29 pairs', direction: 'within', context: 'I-29 multi-county logistics; border metro vs Fargo core product differs.' },
    { label: 'Minneapolis / Winnipeg ↔ Grand Forks markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Grand Forks → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving North Dakota.' },
  ],
  ward: [
    { label: 'Within Ward (Downtown Minot ↔ south / north belts / base-adjacent edges)', direction: 'within', context: 'Minot regional and military-adjacent product — not Fargo west clone.' },
    { label: 'Military PCS / energy relo → Minot', direction: 'inbound', context: 'Hard report dates reshape northwest ND calendars.' },
    { label: 'Ward ↔ Bismarck / Fargo in-state pairs', direction: 'outbound', context: 'US-83 / US-2 long hauls; NDDOT HHG permit for pure in-state jobs.' },
    { label: 'Minneapolis / Canada-adjacent corridors ↔ Minot markets', direction: 'inbound', context: 'Interstate household goods; FMCSA when leaving North Dakota.' },
    { label: 'Ward ↔ Grand Forks US-2 pairs', direction: 'within', context: 'US-2 multi-county logistics; keep regional product distinct.' },
    { label: 'Minot → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving North Dakota.' },
  ],
};

const SD_ROUTES: Record<string, CountyPopularRoute[]> = {
  minnehaha: [
    { label: 'Within Minnehaha (Downtown Sioux Falls ↔ west / south / east growth belts)', direction: 'within', context: 'Sioux Falls core multi-unit and suburban product — not Rapid City Black Hills product.' },
    { label: 'Corporate / healthcare relo → Sioux Falls', direction: 'inbound', context: 'Hard report dates reshape eastern SD calendars.' },
    { label: 'Minnehaha ↔ Lincoln SD south-metro pairs', direction: 'within', context: 'I-29 multi-county logistics; city core vs Harrisburg–Tea growth differs.' },
    { label: 'Minneapolis / Omaha / Sioux City ↔ Sioux Falls markets', direction: 'inbound', context: 'Interstate household goods; FMCSA when leaving South Dakota.' },
    { label: 'Minnehaha ↔ Rapid City I-90 pairs', direction: 'outbound', context: 'I-90 long hauls; written estimates + insurance for pure in-state jobs.' },
    { label: 'Sioux Falls → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving South Dakota.' },
  ],
  pennington: [
    { label: 'Within Pennington (Downtown Rapid City ↔ west hills / east growth / Box Elder edges)', direction: 'within', context: 'Black Hills tourism and residential product — not Sioux Falls west rename.' },
    { label: 'Tourism / second-home / healthcare relo → Rapid City', direction: 'inbound', context: 'Seasonal peaks reshape Black Hills windows.' },
    { label: 'Pennington ↔ Black Hills corridor pairs', direction: 'within', context: 'US-16 / I-90 tourism logistics; hills access vs valley stock differs.' },
    { label: 'Denver / Minneapolis ↔ Rapid City markets', direction: 'inbound', context: 'I-90 interstate household goods; FMCSA when leaving South Dakota.' },
    { label: 'Pennington ↔ Sioux Falls I-90 pairs', direction: 'outbound', context: 'I-90 long hauls; written estimates for pure in-state jobs.' },
    { label: 'Rapid City → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving South Dakota.' },
  ],
  lincoln: [
    { label: 'Within Lincoln SD (Harrisburg ↔ Tea / Canton / south I-29 growth edges)', direction: 'within', context: 'Sioux Falls south-metro growth — Lincoln County South Dakota only, not Lincoln NE.' },
    { label: 'Sioux Falls overflow → Harrisburg / Tea growth suburbs', direction: 'inbound', context: 'I-29 south-metro logistics; HOA packets dominate.' },
    { label: 'Lincoln SD ↔ Minnehaha metro pairs', direction: 'within', context: 'City core vs south growth product differs; keep county lines clear.' },
    { label: 'Omaha / Sioux City ↔ Lincoln SD growth markets', direction: 'inbound', context: 'Interstate household goods into HOA tracts; FMCSA when leaving South Dakota.' },
    { label: 'Lincoln SD ↔ Iowa / Nebraska border pairs', direction: 'outbound', context: 'I-29 interstate household goods; FMCSA when any leg leaves South Dakota.' },
    { label: 'Lincoln SD → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving South Dakota.' },
  ],
  brown: [
    { label: 'Within Brown (Downtown Aberdeen ↔ south / west growth edges)', direction: 'within', context: 'Aberdeen regional hub — not Sioux Falls north clone.' },
    { label: 'Healthcare / industrial relo → Aberdeen', direction: 'inbound', context: 'Hard report dates reshape northeast SD calendars.' },
    { label: 'Brown ↔ Sioux Falls / Rapid City in-state pairs', direction: 'outbound', context: 'US-12 / I-29 long hauls; written estimates for pure in-state jobs.' },
    { label: 'Fargo / Minneapolis ↔ Aberdeen markets', direction: 'inbound', context: 'Interstate household goods; FMCSA when leaving South Dakota.' },
    { label: 'Brown ↔ North Dakota border pairs', direction: 'outbound', context: 'US-281 interstate household goods; FMCSA when leaving South Dakota.' },
    { label: 'Aberdeen → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving South Dakota.' },
  ],
};

const WY_ROUTES: Record<string, CountyPopularRoute[]> = {
  laramie: [
    { label: 'Within Laramie County (Downtown Cheyenne ↔ north / south belts / Warren AFB edges)', direction: 'within', context: 'Cheyenne capital product in Laramie County WY — not the city of Laramie (Albany County).' },
    { label: 'State government / military PCS relo → Cheyenne', direction: 'inbound', context: 'Capital and base calendars reshape southeast WY windows.' },
    { label: 'Laramie County ↔ Fort Collins / Colorado Front Range pairs', direction: 'outbound', context: 'I-25 interstate household goods; FMCSA when leaving Wyoming.' },
    { label: 'Laramie County ↔ Casper / Rock Springs in-state pairs', direction: 'outbound', context: 'I-25 / I-80 long hauls; WYDOT authority for pure in-state jobs.' },
    { label: 'Denver / Salt Lake ↔ Cheyenne markets', direction: 'inbound', context: 'I-25/I-80 interstate household goods into multi-unit and suburban stock.' },
    { label: 'Cheyenne → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Wyoming.' },
  ],
  natrona: [
    { label: 'Within Natrona (Downtown Casper ↔ south / west / north growth edges)', direction: 'within', context: 'Casper regional energy hub — not Cheyenne capital product.' },
    { label: 'Energy / healthcare relo → Casper', direction: 'inbound', context: 'Hard report dates reshape central WY calendars.' },
    { label: 'Natrona ↔ Cheyenne / Gillette in-state pairs', direction: 'outbound', context: 'I-25 long hauls; WYDOT authority for pure in-state jobs.' },
    { label: 'Denver / Billings ↔ Casper markets', direction: 'inbound', context: 'Interstate household goods; FMCSA when leaving Wyoming.' },
    { label: 'Natrona ↔ Rock Springs I-80 pairs', direction: 'within', context: 'Cross-state I-25/I-80 logistics; energy hub vs I-80 corridor product differs.' },
    { label: 'Casper → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Wyoming.' },
  ],
  campbell: [
    { label: 'Within Campbell (Downtown Gillette ↔ south / north energy-corridor edges)', direction: 'within', context: 'Powder River Basin regional product — not Casper south rename.' },
    { label: 'Energy / industrial relo → Gillette', direction: 'inbound', context: 'Hard report dates reshape northeast WY calendars.' },
    { label: 'Campbell ↔ Casper / Sheridan in-state pairs', direction: 'outbound', context: 'I-90 / US-14 long hauls; WYDOT authority for pure in-state jobs.' },
    { label: 'Billings / Rapid City ↔ Gillette markets', direction: 'inbound', context: 'I-90 interstate household goods; FMCSA when leaving Wyoming.' },
    { label: 'Campbell ↔ Cheyenne long pairs', direction: 'outbound', context: 'Cross-state logistics; keep Powder River product distinct.' },
    { label: 'Gillette → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Wyoming.' },
  ],
  sweetwater: [
    { label: 'Within Sweetwater (Rock Springs ↔ Green River / I-80 corridor edges)', direction: 'within', context: 'I-80 corridor industrial-residential mix — not Cheyenne or Casper clone.' },
    { label: 'Energy / industrial relo → Rock Springs / Green River', direction: 'inbound', context: 'Hard report dates reshape southwest WY calendars.' },
    { label: 'Sweetwater ↔ Salt Lake / Utah pairs', direction: 'outbound', context: 'I-80 interstate household goods; FMCSA when leaving Wyoming.' },
    { label: 'Sweetwater ↔ Cheyenne / Casper in-state pairs', direction: 'outbound', context: 'I-80 long hauls; WYDOT authority for pure in-state jobs.' },
    { label: 'Denver / Boise corridors ↔ Sweetwater markets', direction: 'inbound', context: 'I-80 interstate household goods into multi-unit and corridor stock.' },
    { label: 'Rock Springs → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Wyoming.' },
  ],
};

const VT_ROUTES: Record<string, CountyPopularRoute[]> = {
  chittenden: [
    {
      label: 'Within Chittenden (Downtown Burlington ↔ Winooski / Essex / South Burlington)',
      direction: 'within',
      context: 'Lake Champlain multi-unit and village approaches — not Montpelier capital product.',
    },
    {
      label: 'University / healthcare / corporate relo → Burlington metro',
      direction: 'inbound',
      context: 'Hard report dates reshape Chittenden calendars.',
    },
    {
      label: 'Chittenden ↔ Franklin (St. Albans) I-89 pairs',
      direction: 'within',
      context: 'I-89 multi-county logistics; metro vs northwest dairy-country product differs.',
    },
    {
      label: 'Boston / Montreal / New York ↔ Burlington markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Vermont.',
    },
    {
      label: 'Chittenden ↔ Montpelier / Barre (Washington VT) pairs',
      direction: 'outbound',
      context: 'I-89 southbound; written estimates + insurance for pure in-state jobs.',
    },
    {
      label: 'Burlington → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Vermont.',
    },
  ],
  washington: [
    {
      label: 'Within Washington VT (Montpelier ↔ Barre / Berlin / Waterbury edges)',
      direction: 'within',
      context:
        'Capital and granite-city product — Washington County Vermont only, not Washington State, AR, or RI.',
    },
    {
      label: 'State government / healthcare relo → Montpelier / Barre',
      direction: 'inbound',
      context: 'Capital calendars reshape central Vermont windows.',
    },
    {
      label: 'Washington VT ↔ Chittenden (Burlington) I-89 pairs',
      direction: 'outbound',
      context: 'I-89 multi-county logistics; capital vs Lake Champlain product differs.',
    },
    {
      label: 'Boston / New York ↔ Montpelier markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Vermont.',
    },
    {
      label: 'Washington VT ↔ Rutland / Upper Valley pairs',
      direction: 'within',
      context: 'US-2 / US-4 regional logistics; keep capital product distinct.',
    },
    {
      label: 'Montpelier → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Vermont.',
    },
  ],
  rutland: [
    {
      label: 'Within Rutland (Downtown Rutland ↔ Killington / Castleton / Pittsford edges)',
      direction: 'within',
      context: 'Regional hub and ski-country approaches — not Burlington south clone.',
    },
    {
      label: 'Ski-season / second-home turns → Killington corridors',
      direction: 'inbound',
      context: 'Winter peaks reshape access and curb staging.',
    },
    {
      label: 'Rutland ↔ Upper Valley (Windsor) pairs',
      direction: 'within',
      context: 'US-4 multi-county logistics; ski regional vs I-91 Upper Valley product differs.',
    },
    {
      label: 'Albany / Boston ↔ Rutland markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Vermont.',
    },
    {
      label: 'Rutland ↔ Burlington / Montpelier in-state pairs',
      direction: 'outbound',
      context: 'US-7 / I-89 long hauls; written estimates for pure in-state jobs.',
    },
    {
      label: 'Rutland → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Vermont.',
    },
  ],
  windsor: [
    {
      label: 'Within Windsor (White River Junction ↔ Springfield / Woodstock / Hartford VT edges)',
      direction: 'within',
      context: 'Upper Valley / I-91 corridor — not Burlington south rename.',
    },
    {
      label: 'Upper Valley / Dartmouth-adjacent relo → WRJ corridors',
      direction: 'inbound',
      context: 'Hard report dates and NH-hop awareness reshape windows.',
    },
    {
      label: 'Windsor ↔ New Hampshire Upper Valley pairs',
      direction: 'outbound',
      context: 'I-91 interstate household goods; FMCSA when any leg leaves Vermont.',
    },
    {
      label: 'Boston / New York ↔ Upper Valley markets',
      direction: 'inbound',
      context: 'I-91 interstate household goods into village and multi-unit stock.',
    },
    {
      label: 'Windsor ↔ Rutland / Montpelier in-state pairs',
      direction: 'outbound',
      context: 'US-4 / I-89 links; written estimates for pure in-state jobs.',
    },
    {
      label: 'Windsor → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Vermont.',
    },
  ],
  franklin: [
    {
      label: 'Within Franklin (St. Albans ↔ Swanton / Enosburg / Georgia edges)',
      direction: 'within',
      context: 'Northwest dairy/border product — not Chittenden north rename only.',
    },
    {
      label: 'Industrial / border-adjacent relo → St. Albans',
      direction: 'inbound',
      context: 'Hard report dates reshape northwest calendars.',
    },
    {
      label: 'Franklin ↔ Chittenden (Burlington) I-89 pairs',
      direction: 'within',
      context: 'I-89 multi-county logistics; northwest vs metro product differs.',
    },
    {
      label: 'Montreal / Burlington overflow ↔ Franklin markets',
      direction: 'inbound',
      context: 'Cross-border and regional logistics; FMCSA when leaving Vermont.',
    },
    {
      label: 'Franklin ↔ Montpelier in-state pairs',
      direction: 'outbound',
      context: 'I-89 long hauls; written estimates for pure in-state jobs.',
    },
    {
      label: 'St. Albans → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Vermont.',
    },
  ],
};

const DE_ROUTES: Record<string, CountyPopularRoute[]> = {
  'new-castle': [
    {
      label: 'Within New Castle (Downtown Wilmington ↔ Newark / Greenville / Middletown edges)',
      direction: 'within',
      context: 'I-95 corridor density and multi-unit stock — not Dover capital product.',
    },
    {
      label: 'Corporate / finance / university relo → Wilmington / Newark',
      direction: 'inbound',
      context: 'Hard report dates reshape northern Delaware calendars.',
    },
    {
      label: 'New Castle ↔ Kent (Dover) DE-1 pairs',
      direction: 'within',
      context: 'DE-1 multi-county logistics; Wilmington corridor vs capital product differs.',
    },
    {
      label: 'Philadelphia / Baltimore / New York ↔ Wilmington markets',
      direction: 'inbound',
      context: 'I-95 interstate household goods; FMCSA when leaving Delaware.',
    },
    {
      label: 'New Castle ↔ Sussex beach-season pairs',
      direction: 'outbound',
      context: 'DE-1 long hauls; many jobs become interstate at MD/PA borders.',
    },
    {
      label: 'Wilmington → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Delaware.',
    },
  ],
  kent: [
    {
      label: 'Within Kent DE (Downtown Dover ↔ Camden / Smyrna / Magnolia edges)',
      direction: 'within',
      context: 'Capital and central DE product — Kent County Delaware only, not Kent County RI.',
    },
    {
      label: 'State government / base / agency relo → Dover',
      direction: 'inbound',
      context: 'Capital calendars reshape central Delaware windows.',
    },
    {
      label: 'Kent ↔ New Castle (Wilmington) DE-1 pairs',
      direction: 'within',
      context: 'DE-1 multi-county logistics; capital vs I-95 corridor product differs.',
    },
    {
      label: 'Kent ↔ Sussex beach markets',
      direction: 'within',
      context: 'DE-1 southbound; capital vs beach-season product differs.',
    },
    {
      label: 'Maryland / Pennsylvania ↔ Dover markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Delaware.',
    },
    {
      label: 'Dover → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Delaware.',
    },
  ],
  sussex: [
    {
      label: 'Within Sussex (Rehoboth / Lewes ↔ Georgetown / Millsboro / Bethany edges)',
      direction: 'within',
      context:
        'Beach-season volume and inland hubs — Sussex County DE only, not Sussex County NJ or VA.',
    },
    {
      label: 'Summer / second-home turns → Rehoboth / Lewes corridors',
      direction: 'inbound',
      context: 'Beach-season peaks reshape curb staging and calendars.',
    },
    {
      label: 'Sussex ↔ Kent (Dover) DE-1 pairs',
      direction: 'within',
      context: 'DE-1 multi-county logistics; beach vs capital product differs.',
    },
    {
      label: 'Philadelphia / Washington DC ↔ Sussex beach markets',
      direction: 'inbound',
      context: 'Interstate household goods into multi-unit and coastal stock; FMCSA when leaving DE.',
    },
    {
      label: 'Sussex ↔ Maryland Eastern Shore pairs',
      direction: 'outbound',
      context: 'US-13 interstate household goods; FMCSA when any leg leaves Delaware.',
    },
    {
      label: 'Sussex → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Delaware.',
    },
  ],
};

const NE_ROUTES: Record<string, CountyPopularRoute[]> = {
  douglas: [
    {
      label: 'Within Douglas (Downtown / Midtown Omaha ↔ West Omaha / Elkhorn edges)',
      direction: 'within',
      context: 'River-city multi-unit and west-suburb HOA — Douglas County NE Omaha only, not Douglas KS/NV.',
    },
    {
      label: 'Corporate / healthcare relo → Omaha metro',
      direction: 'inbound',
      context: 'Hard report dates reshape eastern Nebraska calendars.',
    },
    {
      label: 'Douglas ↔ Sarpy south-metro pairs',
      direction: 'within',
      context: 'I-80 / US-75 multi-county logistics; city core vs Bellevue/Papillion product differs.',
    },
    {
      label: 'Chicago / Denver / Kansas City ↔ Omaha markets',
      direction: 'inbound',
      context: 'I-80 interstate household goods; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Douglas ↔ Lincoln (Lancaster) in-state pairs',
      direction: 'outbound',
      context: 'I-80 long locals; Nebraska PSC license for pure in-state jobs.',
    },
    {
      label: 'Omaha → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
  lancaster: [
    {
      label: 'Within Lancaster (Downtown Lincoln ↔ South / East / Northwest growth rings)',
      direction: 'within',
      context: 'Capital + university multi-unit — Lancaster NE Lincoln only, not Lancaster PA.',
    },
    {
      label: 'State government / UNL relo → Lincoln',
      direction: 'inbound',
      context: 'Capital calendars and semester waves reshape windows.',
    },
    {
      label: 'Lancaster ↔ Douglas (Omaha) in-state pairs',
      direction: 'outbound',
      context: 'I-80 multi-county logistics; capital vs Omaha product differs.',
    },
    {
      label: 'Denver / Kansas City / Des Moines ↔ Lincoln markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Lancaster ↔ Grand Island / Kearney I-80 pairs',
      direction: 'outbound',
      context: 'I-80 westbound; PSC license for pure in-state jobs.',
    },
    {
      label: 'Lincoln → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
  sarpy: [
    {
      label: 'Within Sarpy (Bellevue ↔ Papillion / La Vista / Gretna edges)',
      direction: 'within',
      context: 'South Omaha metro growth and Offutt-adjacent timing — not Douglas city core rename.',
    },
    {
      label: 'Military / family relo → Bellevue / Papillion',
      direction: 'inbound',
      context: 'Hard report dates and HOA packets reshape south-metro windows.',
    },
    {
      label: 'Sarpy ↔ Douglas metro pairs',
      direction: 'within',
      context: 'I-80 / US-75 multi-county logistics; south growth vs Omaha core product differs.',
    },
    {
      label: 'Kansas City / Des Moines ↔ Sarpy growth markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Sarpy ↔ Lincoln in-state pairs',
      direction: 'outbound',
      context: 'I-80 westbound; PSC license for pure in-state jobs.',
    },
    {
      label: 'Sarpy → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
  hall: [
    {
      label: 'Within Hall (Downtown Grand Island ↔ south / west growth edges)',
      direction: 'within',
      context: 'Central Nebraska regional hub — not Omaha west clone product.',
    },
    {
      label: 'Ag / industrial / healthcare relo → Grand Island',
      direction: 'inbound',
      context: 'Hard report dates reshape central I-80 calendars.',
    },
    {
      label: 'Hall ↔ Kearney (Buffalo) I-80 pairs',
      direction: 'within',
      context: 'I-80 multi-county logistics; regional hubs with distinct access profiles.',
    },
    {
      label: 'Omaha / Lincoln ↔ Grand Island in-state pairs',
      direction: 'outbound',
      context: 'I-80 long hauls; PSC license for pure in-state jobs.',
    },
    {
      label: 'Denver / Kansas City ↔ Grand Island markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Grand Island → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
  buffalo: [
    {
      label: 'Within Buffalo (Downtown Kearney ↔ university / I-80 growth edges)',
      direction: 'within',
      context: 'Central-west regional hub — Buffalo County NE (Kearney) only, not Buffalo NY.',
    },
    {
      label: 'University / healthcare relo → Kearney',
      direction: 'inbound',
      context: 'Campus and hospital calendars reshape I-80 mid-state windows.',
    },
    {
      label: 'Buffalo ↔ Grand Island (Hall) I-80 pairs',
      direction: 'within',
      context: 'I-80 multi-county logistics between distinct regional hubs.',
    },
    {
      label: 'Omaha / Lincoln ↔ Kearney in-state pairs',
      direction: 'outbound',
      context: 'I-80 long hauls; PSC license for pure in-state jobs.',
    },
    {
      label: 'Denver / Colorado ↔ Kearney markets',
      direction: 'inbound',
      context: 'I-80 interstate household goods; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Kearney → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
  dodge: [
    {
      label: 'Within Dodge (Downtown Fremont ↔ north / east / industrial edges)',
      direction: 'within',
      context: 'Mid-size market north of Omaha — not Douglas County north rename.',
    },
    {
      label: 'Industrial / family relo → Fremont',
      direction: 'inbound',
      context: 'Hard report dates reshape mid-market windows.',
    },
    {
      label: 'Dodge ↔ Douglas / Sarpy metro pairs',
      direction: 'within',
      context: 'US-275 / US-30 multi-county logistics; mid-market vs Omaha core product differs.',
    },
    {
      label: 'Omaha overflow → Fremont mid-market',
      direction: 'inbound',
      context: 'Shorter regional hauls; PSC license for pure in-state jobs.',
    },
    {
      label: 'Iowa / Kansas ↔ Fremont pairs',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Nebraska.',
    },
    {
      label: 'Fremont → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Nebraska.',
    },
  ],
};

const ID_ROUTES: Record<string, CountyPopularRoute[]> = {
  ada: [
    {
      label: 'Within Ada (Downtown / North End Boise ↔ foothills / Meridian / Eagle edges)',
      direction: 'within',
      context: 'Treasure Valley core multi-unit and foothills access — not Canyon Nampa product.',
    },
    {
      label: 'Tech / healthcare / state relo → Boise',
      direction: 'inbound',
      context: 'Hard report dates reshape Treasure Valley calendars.',
    },
    {
      label: 'Ada ↔ Canyon (Nampa–Caldwell) TV pairs',
      direction: 'within',
      context: 'I-84 multi-county logistics; Boise core vs west-valley growth product differs.',
    },
    {
      label: 'Seattle / Portland / Salt Lake ↔ Boise markets',
      direction: 'inbound',
      context: 'I-84 interstate household goods; FMCSA when leaving Idaho.',
    },
    {
      label: 'Ada ↔ Twin Falls / Idaho Falls in-state pairs',
      direction: 'outbound',
      context: 'I-84 / I-15 long hauls; IPUC-applicable authority for pure in-state jobs.',
    },
    {
      label: 'Boise → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Idaho.',
    },
  ],
  canyon: [
    {
      label: 'Within Canyon (Nampa ↔ Caldwell / Middleton / I-84 growth edges)',
      direction: 'within',
      context: 'Treasure Valley west growth HOA — not Ada/Boise rename.',
    },
    {
      label: 'Boise overflow → Nampa / Caldwell growth',
      direction: 'inbound',
      context: 'I-84 west-valley logistics; HOA packets dominate.',
    },
    {
      label: 'Canyon ↔ Ada metro pairs',
      direction: 'within',
      context: 'I-84 multi-county logistics; west growth vs Boise core product differs.',
    },
    {
      label: 'Portland / Salt Lake ↔ Canyon growth markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving Idaho.',
    },
    {
      label: 'Canyon ↔ Twin Falls Magic Valley pairs',
      direction: 'outbound',
      context: 'I-84 eastbound; IPUC-applicable authority for pure in-state jobs.',
    },
    {
      label: 'Canyon → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Idaho.',
    },
  ],
  kootenai: [
    {
      label: "Within Kootenai (Downtown Coeur d'Alene ↔ Post Falls / Hayden / lakeside edges)",
      direction: 'within',
      context: 'North Idaho lakeside and tourism logistics — not Treasure Valley product.',
    },
    {
      label: "Tourism / second-home / family relo → Coeur d'Alene",
      direction: 'inbound',
      context: 'Seasonal peaks and lakeside access reshape windows.',
    },
    {
      label: 'Kootenai ↔ Spokane, WA pairs',
      direction: 'outbound',
      context: 'I-90 interstate household goods; FMCSA when any leg leaves Idaho.',
    },
    {
      label: 'Seattle / Portland ↔ North Idaho markets',
      direction: 'inbound',
      context: 'I-90 interstate household goods into multi-unit and lakeside stock.',
    },
    {
      label: 'Kootenai ↔ Boise / Treasure Valley in-state pairs',
      direction: 'outbound',
      context: 'Long north–south hauls; IPUC-applicable authority for pure in-state jobs.',
    },
    {
      label: "Coeur d'Alene → out-of-state reverse exits",
      direction: 'outbound',
      context: 'FMCSA required once leaving Idaho.',
    },
  ],
  bonneville: [
    {
      label: 'Within Bonneville (Downtown Idaho Falls ↔ Ammon / I-15 growth edges)',
      direction: 'within',
      context: 'Eastern Idaho regional hub on the Snake River plain — not Treasure Valley east.',
    },
    {
      label: 'Labs / energy / healthcare relo → Idaho Falls',
      direction: 'inbound',
      context: 'Hard report dates reshape eastern calendars.',
    },
    {
      label: 'Bonneville ↔ Rexburg / Pocatello corridor pairs',
      direction: 'within',
      context: 'I-15 multi-county logistics; regional eastern ID product.',
    },
    {
      label: 'Salt Lake / Boise ↔ Idaho Falls markets',
      direction: 'inbound',
      context: 'I-15 interstate/in-state mix; clarify IPUC vs FMCSA for the full route.',
    },
    {
      label: 'Bonneville ↔ Twin Falls / Magic Valley pairs',
      direction: 'outbound',
      context: 'Cross-southern Idaho logistics; IPUC-applicable for pure in-state jobs.',
    },
    {
      label: 'Idaho Falls → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Idaho.',
    },
  ],
  'twin-falls': [
    {
      label: 'Within Twin Falls (Downtown Twin Falls ↔ canyon-edge / I-84 growth suburbs)',
      direction: 'within',
      context: 'Magic Valley regional hub — not Boise south rename.',
    },
    {
      label: 'Ag / healthcare / family relo → Twin Falls',
      direction: 'inbound',
      context: 'Hard report dates reshape south-central calendars.',
    },
    {
      label: 'Twin Falls ↔ Boise / Treasure Valley I-84 pairs',
      direction: 'outbound',
      context: 'I-84 long hauls; IPUC-applicable authority for pure in-state jobs.',
    },
    {
      label: 'Salt Lake / Reno ↔ Magic Valley markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Idaho.',
    },
    {
      label: 'Twin Falls ↔ Idaho Falls eastern pairs',
      direction: 'outbound',
      context: 'Southern Idaho cross-state logistics; keep Magic Valley product distinct.',
    },
    {
      label: 'Twin Falls → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Idaho.',
    },
  ],
};

const AR_ROUTES: Record<string, CountyPopularRoute[]> = {
  pulaski: [
    {
      label: 'Within Pulaski (Downtown Little Rock ↔ West Little Rock / NLR / Maumelle edges)',
      direction: 'within',
      context:
        'River-city multi-unit and west-suburb HOA — not Northwest Arkansas Bentonville product.',
    },
    {
      label: 'State government / healthcare relo → Little Rock',
      direction: 'inbound',
      context: 'Capital calendars and campus/hospital report dates reshape windows.',
    },
    {
      label: 'Pulaski ↔ Saline / Faulkner south-north metro pairs',
      direction: 'within',
      context: 'I-30 / I-40 multi-county logistics; city vs fringe product differs.',
    },
    {
      label: 'Dallas / Memphis / Oklahoma City ↔ Little Rock capital markets',
      direction: 'inbound',
      context: 'Interstate household goods into multi-unit and suburban stock; FMCSA when leaving Arkansas.',
    },
    {
      label: 'Pulaski ↔ Northwest Arkansas (Benton / Washington) in-state pairs',
      direction: 'outbound',
      context: 'I-40 / I-49 long hauls; ArDOT authority for pure in-state jobs.',
    },
    {
      label: 'Little Rock → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
  benton: [
    {
      label: 'Within Benton (Bentonville ↔ Rogers / Centerton / Bella Vista edges)',
      direction: 'within',
      context: 'NWA corporate growth HOA — not Fayetteville university product and not Benton MO.',
    },
    {
      label: 'Corporate HQ / supplier relo → Bentonville / Rogers',
      direction: 'inbound',
      context: 'Hard report dates dominate Northwest Arkansas calendars.',
    },
    {
      label: 'Benton ↔ Washington County NWA pairs',
      direction: 'within',
      context: 'I-49 multi-county logistics; corporate HOA vs UA multi-unit product differs.',
    },
    {
      label: 'Dallas / Kansas City / Tulsa ↔ Benton County NWA markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving Arkansas.',
    },
    {
      label: 'Benton ↔ Little Rock / Fort Smith in-state pairs',
      direction: 'outbound',
      context: 'I-49 / I-40 long hauls; ArDOT for pure in-state jobs.',
    },
    {
      label: 'Bentonville → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
  washington: [
    {
      label: 'Within Washington AR (Downtown Fayetteville ↔ Springdale / Johnson / UA corridor)',
      direction: 'within',
      context:
        'University of Arkansas multi-unit — Washington County Arkansas NWA only, not Washington State or Washington County UT.',
    },
    {
      label: 'University / semester waves → Fayetteville',
      direction: 'inbound',
      context: 'Campus lease turns cluster demand around semester edges.',
    },
    {
      label: 'Washington ↔ Benton NWA pairs',
      direction: 'within',
      context: 'I-49 multi-county logistics; UA multi-unit vs Bentonville HOA product differs.',
    },
    {
      label: 'Texas / Missouri / Oklahoma ↔ Fayetteville markets',
      direction: 'inbound',
      context: 'Interstate household goods; FMCSA when leaving Arkansas.',
    },
    {
      label: 'Washington ↔ Little Rock / Fort Smith in-state pairs',
      direction: 'outbound',
      context: 'I-49 / I-40 long hauls; ArDOT for pure in-state jobs.',
    },
    {
      label: 'Fayetteville → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
  sebastian: [
    {
      label: 'Within Sebastian (Downtown Fort Smith ↔ south / east suburbs / Van Buren approaches)',
      direction: 'within',
      context: 'Western AR regional hub on the Arkansas River — not Little Rock west clone.',
    },
    {
      label: 'Industrial / healthcare relo → Fort Smith',
      direction: 'inbound',
      context: 'Hard report dates and OK-border timing reshape windows.',
    },
    {
      label: 'Sebastian ↔ Oklahoma border / Tulsa pairs',
      direction: 'outbound',
      context: 'I-40 interstate household goods; FMCSA when any leg leaves Arkansas.',
    },
    {
      label: 'Sebastian ↔ Little Rock / NWA in-state pairs',
      direction: 'outbound',
      context: 'I-40 / I-49 long hauls; ArDOT for pure in-state jobs.',
    },
    {
      label: 'Dallas / Oklahoma City ↔ Fort Smith regional markets',
      direction: 'inbound',
      context: 'Interstate household goods into multi-unit and suburban stock.',
    },
    {
      label: 'Fort Smith → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
  faulkner: [
    {
      label: 'Within Faulkner (Downtown Conway ↔ south / east growth / Mayflower edges)',
      direction: 'within',
      context: 'I-40 north-central growth HOA — not Little Rock north rename only.',
    },
    {
      label: 'University / healthcare relo → Conway',
      direction: 'inbound',
      context: 'Campus and hospital calendars reshape mid-state windows.',
    },
    {
      label: 'Faulkner ↔ Pulaski metro pairs',
      direction: 'within',
      context: 'I-40 multi-county logistics; Conway growth vs LR core product differs.',
    },
    {
      label: 'Memphis / Dallas ↔ Conway growth markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving Arkansas.',
    },
    {
      label: 'Faulkner ↔ NWA / Fort Smith in-state pairs',
      direction: 'outbound',
      context: 'I-40 long hauls; ArDOT for pure in-state jobs.',
    },
    {
      label: 'Conway → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
  saline: [
    {
      label: 'Within Saline (Benton city ↔ Bryant / Haskell / Hot Springs Village approaches)',
      direction: 'within',
      context:
        'South Little Rock metro fringe — Benton (city in Saline) is not Benton County NWA.',
    },
    {
      label: 'Little Rock overflow → Benton / Bryant growth suburbs',
      direction: 'inbound',
      context: 'I-30 south-metro logistics; HOA packets dominate.',
    },
    {
      label: 'Saline ↔ Pulaski metro pairs',
      direction: 'within',
      context: 'City core vs south-fringe product differs; keep county lines clear.',
    },
    {
      label: 'Texas / Tennessee ↔ Saline south-metro markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving Arkansas.',
    },
    {
      label: 'Saline ↔ Faulkner / Hot Springs corridor pairs',
      direction: 'within',
      context: 'Multi-county central AR logistics; ArDOT for pure in-state jobs.',
    },
    {
      label: 'Saline → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving Arkansas.',
    },
  ],
};

const NM_ROUTES: Record<string, CountyPopularRoute[]> = {
  bernalillo: [
    {
      label: 'Within Bernalillo (Downtown / Nob Hill ↔ NE Heights / Westside / South Valley)',
      direction: 'within',
      context: 'Heights vs valley access and I-25/I-40 timing — not Santa Fe capital product.',
    },
    {
      label: 'Labs / military / corporate relo → Albuquerque',
      direction: 'inbound',
      context: 'Hard report dates reshape metro calendars.',
    },
    {
      label: 'Bernalillo ↔ Sandoval (Rio Rancho) metro pairs',
      direction: 'within',
      context: 'I-25 / NM-528 multi-county logistics; city vs north growth product differs.',
    },
    {
      label: 'Texas / Arizona / Colorado ↔ Albuquerque markets',
      direction: 'inbound',
      context: 'I-40/I-25 interstate household goods; FMCSA when leaving New Mexico.',
    },
    {
      label: 'Bernalillo ↔ Santa Fe / Las Cruces in-state pairs',
      direction: 'outbound',
      context: 'I-25 long hauls; NMDOT TRB authority for pure in-state jobs.',
    },
    {
      label: 'Albuquerque → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving New Mexico.',
    },
  ],
  'santa-fe': [
    {
      label: 'Within Santa Fe (Historic core ↔ South Capital / Eldorado / NM-599 edges)',
      direction: 'within',
      context: 'Capital historic access and elevation logistics — not Albuquerque rename.',
    },
    {
      label: 'State government / arts / second-home relo → Santa Fe',
      direction: 'inbound',
      context: 'Capital calendars and tourism peaks reshape windows.',
    },
    {
      label: 'Santa Fe ↔ Albuquerque (I-25) pairs',
      direction: 'within',
      context: 'Capital vs metro product differs; adobe/historic access is not Heights HOA default.',
    },
    {
      label: 'Colorado / Texas / California ↔ Santa Fe markets',
      direction: 'inbound',
      context: 'Interstate household goods into historic and high-country stock; FMCSA when leaving NM.',
    },
    {
      label: 'Santa Fe ↔ Los Alamos / Española corridor pairs',
      direction: 'within',
      context: 'US-84/285 regional logistics; NMDOT TRB for pure in-state jobs.',
    },
    {
      label: 'Santa Fe → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving New Mexico.',
    },
  ],
  'doa-ana': [
    {
      label: 'Within Doña Ana (Downtown Las Cruces ↔ Mesilla / East Mesa / NMSU edges)',
      direction: 'within',
      context: 'Southern border-adjacent college hub — not Albuquerque south rename.',
    },
    {
      label: 'University / military spillover relo → Las Cruces',
      direction: 'inbound',
      context: 'NMSU and White Sands / Holloman-adjacent calendars reshape windows.',
    },
    {
      label: 'Doña Ana ↔ El Paso, TX pairs',
      direction: 'outbound',
      context: 'I-10 interstate household goods; FMCSA when any leg leaves New Mexico.',
    },
    {
      label: 'Doña Ana ↔ Albuquerque (I-25) in-state pairs',
      direction: 'outbound',
      context: 'Long I-25 hauls; NMDOT TRB for pure in-state jobs.',
    },
    {
      label: 'Arizona / Texas ↔ Las Cruces markets',
      direction: 'inbound',
      context: 'I-10 interstate household goods into multi-unit and desert-suburb stock.',
    },
    {
      label: 'Las Cruces → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving New Mexico.',
    },
  ],
  sandoval: [
    {
      label: 'Within Sandoval (Rio Rancho ↔ Corrales / Bernalillo town / US-550 edges)',
      direction: 'within',
      context: 'North Albuquerque metro growth — not Bernalillo County city rename.',
    },
    {
      label: 'Albuquerque overflow → Rio Rancho growth suburbs',
      direction: 'inbound',
      context: 'I-25 / NM-528 logistics; HOA packets dominate.',
    },
    {
      label: 'Sandoval ↔ Bernalillo metro pairs',
      direction: 'within',
      context: 'City core vs north growth product differs; keep county lines clear.',
    },
    {
      label: 'Texas / Colorado ↔ Sandoval growth markets',
      direction: 'inbound',
      context: 'Interstate household goods into HOA tracts; FMCSA when leaving New Mexico.',
    },
    {
      label: 'Sandoval ↔ Santa Fe in-state pairs',
      direction: 'outbound',
      context: 'I-25 northbound; NMDOT TRB for pure in-state jobs.',
    },
    {
      label: 'Rio Rancho → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving New Mexico.',
    },
  ],
  'san-juan': [
    {
      label: 'Within San Juan (Downtown Farmington ↔ Bloomfield / Aztec / US-64 edges)',
      direction: 'within',
      context: 'Four Corners regional hub — not Albuquerque north clone.',
    },
    {
      label: 'Energy / healthcare relo → Farmington',
      direction: 'inbound',
      context: 'Hard report dates reshape northwest NM calendars.',
    },
    {
      label: 'San Juan ↔ Colorado / Arizona Four Corners pairs',
      direction: 'outbound',
      context: 'US-550 / US-64 interstate household goods; FMCSA when leaving New Mexico.',
    },
    {
      label: 'San Juan ↔ Albuquerque in-state pairs',
      direction: 'outbound',
      context: 'US-550 long hauls; NMDOT TRB for pure in-state jobs.',
    },
    {
      label: 'Texas / Utah ↔ Farmington regional markets',
      direction: 'inbound',
      context: 'Interstate household goods into multi-unit and suburban stock.',
    },
    {
      label: 'Farmington → out-of-state reverse exits',
      direction: 'outbound',
      context: 'FMCSA required once leaving New Mexico.',
    },
  ],
};

const AL_ROUTES: Record<string, CountyPopularRoute[]> = {
  jefferson: [
    { label: 'Within Jefferson (Downtown Birmingham ↔ Homewood / Hoover edges / west industrial)', direction: 'within', context: 'City multi-unit vs over-the-mountain access — not Huntsville or Mobile product. Jefferson County AL, not KY/MO.' },
    { label: 'Atlanta / Nashville ↔ Birmingham metro pairs', direction: 'inbound', context: 'I-20/I-65 interstate household goods into multi-unit and suburban stock.' },
    { label: 'Jefferson ↔ Shelby growth corridor pairs', direction: 'within', context: 'US-280 multi-county logistics; city vs south-suburb product differs.' },
    { label: 'Jefferson ↔ Madison / Montgomery in-state pairs', direction: 'outbound', context: 'I-65 long hauls; APSC authority for pure in-state jobs.' },
    { label: 'Florida / Texas ↔ Birmingham reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Birmingham → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
  mobile: [
    { label: 'Within Mobile (Downtown / midtown ↔ west Mobile / Daphne-edge approaches)', direction: 'within', context: 'Port-city multi-unit and humidity staging — not Birmingham product.' },
    { label: 'Port / industrial workforce relo → Mobile corridors', direction: 'inbound', context: 'Hard report dates and industrial timing reshape windows.' },
    { label: 'Mobile ↔ Baldwin Eastern Shore pairs', direction: 'within', context: 'I-10 bay approaches; city vs Fairhope/Daphne product differs.' },
    { label: 'New Orleans / Pensacola ↔ Mobile coastal pairs', direction: 'inbound', context: 'I-10 interstate household goods; FMCSA when leaving Alabama.' },
    { label: 'Mobile ↔ Montgomery / Birmingham in-state pairs', direction: 'outbound', context: 'I-65 long hauls; APSC for pure in-state jobs.' },
    { label: 'Mobile → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
  madison: [
    { label: 'Within Madison (Downtown Huntsville ↔ Research Park / Madison City / Owens Cross Roads edges)', direction: 'within', context: 'Aerospace/tech growth multi-unit and HOA — not Birmingham core product.' },
    { label: 'Aerospace / defense contractor relo → Huntsville', direction: 'inbound', context: 'Hard report dates dominate north AL calendars.' },
    { label: 'Madison ↔ Jefferson / Montgomery in-state pairs', direction: 'outbound', context: 'I-65 long hauls; APSC for pure in-state jobs.' },
    { label: 'Nashville / Atlanta ↔ Huntsville tech markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Florida / Texas ↔ Huntsville reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Huntsville → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
  montgomery: [
    { label: 'Within Montgomery (Downtown / capital corridors ↔ east / south suburban rings)', direction: 'within', context: 'Capital multi-unit vs suburban stock — Alabama Montgomery, not Maryland Montgomery.' },
    { label: 'State government / military relo → Montgomery', direction: 'inbound', context: 'Hard report dates and capital calendars reshape windows.' },
    { label: 'Montgomery ↔ Birmingham / Mobile in-state pairs', direction: 'outbound', context: 'I-65 long hauls; APSC for pure in-state jobs.' },
    { label: 'Atlanta ↔ Montgomery capital markets', direction: 'inbound', context: 'I-85 interstate household goods into multi-unit and suburban stock.' },
    { label: 'Florida / Texas ↔ Montgomery reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Montgomery → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
  shelby: [
    { label: 'Within Shelby (Hoover ↔ Alabaster / Pelham / Chelsea edges)', direction: 'within', context: 'South-Birmingham growth HOA product — not Jefferson city core clone.' },
    { label: 'Birmingham overflow → Shelby growth suburbs', direction: 'inbound', context: 'US-280 / I-65 logistics; HOA packets dominate.' },
    { label: 'Shelby ↔ Jefferson metro pairs', direction: 'within', context: 'City vs south-suburb product differs; keep county lines clear.' },
    { label: 'Atlanta / Nashville ↔ Shelby family suburbs', direction: 'inbound', context: 'Interstate household goods into HOA tracts.' },
    { label: 'Shelby ↔ Montgomery in-state pairs', direction: 'outbound', context: 'I-65 southbound; APSC for pure in-state jobs.' },
    { label: 'Shelby → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
  baldwin: [
    { label: 'Within Baldwin (Daphne / Fairhope ↔ Foley / Gulf Shores / Orange Beach)', direction: 'within', context: 'Eastern Shore residential vs Gulf tourism stock — not Mobile city rename.' },
    { label: 'Tourism / seasonal turns → Gulf Shores / Orange Beach', direction: 'inbound', context: 'Summer peaks reshape multi-unit and curb staging.' },
    { label: 'Baldwin ↔ Mobile bay approaches', direction: 'within', context: 'I-10 / US-98 logistics; shore vs port-city product differs.' },
    { label: 'Florida Panhandle / New Orleans ↔ Baldwin coastal markets', direction: 'inbound', context: 'I-10 interstate household goods; FMCSA when leaving Alabama.' },
    { label: 'Baldwin ↔ Birmingham / Montgomery in-state pairs', direction: 'outbound', context: 'Long I-65 hauls; APSC for pure in-state jobs.' },
    { label: 'Baldwin → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Alabama.' },
  ],
};

const LA_ROUTES: Record<string, CountyPopularRoute[]> = {
  orleans: [
    { label: 'Within Orleans (French Quarter / CBD ↔ Uptown / Mid-City / Bywater)', direction: 'within', context: 'Historic access and elevators — not Metairie HOA product.' },
    { label: 'Texas / Florida / Atlanta ↔ New Orleans neighborhood markets', direction: 'inbound', context: 'I-10 interstate household goods into multi-unit and raised-home stock.' },
    { label: 'Orleans ↔ Jefferson Parish pairs', direction: 'within', context: 'City historic access vs Metairie/Kenner product — keep parish lines clear.' },
    { label: 'Orleans ↔ St. Tammany Northshore pairs', direction: 'within', context: 'Causeway / I-10 logistics; city vs Northshore growth differs.' },
    { label: 'Orleans ↔ Baton Rouge (I-10) pairs', direction: 'outbound', context: 'Capital corridor long locals; LPSC for pure in-state jobs.' },
    { label: 'New Orleans → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
  'east-baton-rouge': [
    { label: 'Within East Baton Rouge (Downtown / Mid City ↔ Southdowns / Perkins / Zachary edges)', direction: 'within', context: 'Capital multi-unit and LSU adjacency — not New Orleans product.' },
    { label: 'State government / LSU relo → Baton Rouge', direction: 'inbound', context: 'Hard report dates and campus waves reshape calendars.' },
    { label: 'Baton Rouge ↔ New Orleans (I-10) pairs', direction: 'outbound', context: 'Long I-10 locals; LPSC for pure in-state jobs.' },
    { label: 'Baton Rouge ↔ Lafayette / Acadiana pairs', direction: 'within', context: 'I-10 multi-parish logistics; capital vs Acadiana product differs.' },
    { label: 'Houston / Dallas ↔ Baton Rouge capital markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Baton Rouge → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
  jefferson: [
    { label: 'Within Jefferson Parish (Metairie ↔ Kenner / West Bank / Harvey edges)', direction: 'within', context: 'NOLA-adjacent suburban multi-unit — Jefferson Parish LA, not Jefferson AL/KY/MO.' },
    { label: 'Orleans overflow → Metairie / Kenner housing', direction: 'inbound', context: 'I-10 parish logistics; historic city vs suburban product differs.' },
    { label: 'Jefferson ↔ St. Tammany Northshore pairs', direction: 'within', context: 'Causeway / I-10 multi-parish logistics.' },
    { label: 'Texas / Florida ↔ Jefferson Parish suburbs', direction: 'inbound', context: 'Interstate household goods into multi-unit and SFH stock.' },
    { label: 'Jefferson ↔ Baton Rouge in-state pairs', direction: 'outbound', context: 'I-10 long hauls; LPSC for pure in-state jobs.' },
    { label: 'Jefferson Parish → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
  'st-tammany': [
    { label: 'Within St. Tammany (Slidell ↔ Mandeville / Covington / Madisonville edges)', direction: 'within', context: 'Northshore growth HOA product — not Orleans historic core.' },
    { label: 'Orleans / Jefferson overflow → Northshore suburbs', direction: 'inbound', context: 'Causeway / I-12 logistics; HOA packets dominate.' },
    { label: 'St. Tammany ↔ Orleans / Jefferson pairs', direction: 'within', context: 'Northshore vs city vs Metairie product differs at each end.' },
    { label: 'Mississippi Gulf Coast ↔ St. Tammany pairs', direction: 'inbound', context: 'I-10 interstate household goods; FMCSA when leaving Louisiana.' },
    { label: 'St. Tammany ↔ Baton Rouge (I-12) pairs', direction: 'outbound', context: 'I-12 long locals; LPSC for pure in-state jobs.' },
    { label: 'St. Tammany → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
  caddo: [
    { label: 'Within Caddo (Downtown Shreveport ↔ south / east suburbs / Bossier approaches)', direction: 'within', context: 'Northwest LA regional hub — not southern LA clone product.' },
    { label: 'Texas / Arkansas ↔ Shreveport regional markets', direction: 'inbound', context: 'I-20/I-49 interstate household goods; FMCSA when leaving Louisiana.' },
    { label: 'Caddo ↔ Baton Rouge / New Orleans in-state pairs', direction: 'outbound', context: 'Long I-49/I-10 hauls; LPSC for pure in-state jobs.' },
    { label: 'Energy / healthcare relo → Shreveport', direction: 'inbound', context: 'Hard report dates reshape northwest calendars.' },
    { label: 'Caddo ↔ Lafayette Acadiana pairs', direction: 'within', context: 'I-49 multi-parish logistics; keep regional product distinct.' },
    { label: 'Shreveport → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
  lafayette: [
    { label: 'Within Lafayette Parish (Downtown / UL corridor ↔ south / east growth suburbs)', direction: 'within', context: 'Acadiana hub multi-unit — Lafayette Parish LA, not Lafayette IN.' },
    { label: 'Energy / healthcare relo → Lafayette Acadiana', direction: 'inbound', context: 'Hard report dates reshape south-central calendars.' },
    { label: 'Lafayette ↔ Baton Rouge (I-10) pairs', direction: 'within', context: 'I-10 multi-parish logistics; Acadiana vs capital product differs.' },
    { label: 'Lafayette ↔ New Orleans / Houston pairs', direction: 'outbound', context: 'I-10 long hauls; clarify LPSC vs FMCSA for the full route.' },
    { label: 'Texas / Florida ↔ Lafayette reverse family moves', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Lafayette → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Louisiana.' },
  ],
};

const CT_ROUTES: Record<string, CountyPopularRoute[]> = {
  fairfield: [
    { label: 'Within Fairfield (Stamford ↔ Greenwich / Norwalk / Bridgeport)', direction: 'within', context: 'NYC-collar elevators and coastal HOA — not Hartford capital product.' },
    { label: 'NYC / Westchester ↔ Fairfield reverse-commute pairs', direction: 'inbound', context: 'I-95 interstate household goods; FMCSA when any leg leaves Connecticut.' },
    { label: 'Fairfield ↔ Hartford / New Haven in-state pairs', direction: 'within', context: 'I-95/I-91 long locals; CTDOT certificate for pure in-state jobs.' },
    { label: 'Boston / Providence ↔ Fairfield professional corridors', direction: 'inbound', context: 'I-95 interstate household goods into coastal multi-unit stock.' },
    { label: 'Florida / Sun Belt ↔ Fairfield reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Fairfield → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
  ],
  hartford: [
    { label: 'Within Hartford (Downtown ↔ West Hartford / Manchester / Farmington Valley)', direction: 'within', context: 'Capital multi-unit vs HOA suburbs — not Fairfield NYC collar.' },
    { label: 'Insurance / capital relo → Hartford corridors', direction: 'inbound', context: 'Hard report dates and building packets reshape calendars.' },
    { label: 'Hartford ↔ Fairfield / New Haven in-state pairs', direction: 'within', context: 'I-84/I-91 multi-county logistics; keep market product distinct.' },
    { label: 'Boston / NYC ↔ Hartford capital markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Springfield MA ↔ Hartford pairs', direction: 'inbound', context: 'I-91 regional interstate; clarify CTDOT vs FMCSA for the full route.' },
    { label: 'Hartford → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
  ],
  'new-haven': [
    { label: 'Within New Haven (Downtown / Yale ↔ Hamden / Milford shoreline)', direction: 'within', context: 'University multi-unit vs shoreline stock — not Stamford corporate defaults.' },
    { label: 'Yale student & faculty lease cycles', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate near campus.' },
    { label: 'New Haven ↔ Fairfield / Hartford in-state pairs', direction: 'within', context: 'I-95/I-91 logistics; university vs capital vs NYC-collar product differs.' },
    { label: 'NYC / Boston ↔ New Haven university markets', direction: 'inbound', context: 'Interstate household goods into campus multi-unit and shoreline stock.' },
    { label: 'Florida / Sun Belt ↔ New Haven reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'New Haven → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
  ],
  'new-london': [
    { label: 'Within New London (New London / Groton ↔ Norwich / Waterford shore)', direction: 'within', context: 'Shoreline and defense-adjacent stock — not Hartford capital product.' },
    { label: 'Defense / shipyard PCS → Groton / New London housing', direction: 'inbound', context: 'Hard report dates reshape eastern CT calendars.' },
    { label: 'New London ↔ New Haven / Rhode Island pairs', direction: 'within', context: 'I-95 logistics; clarify CTDOT vs FMCSA when crossing into RI.' },
    { label: 'Ferry / tourism peaks → shoreline multi-unit', direction: 'within', context: 'Summer weekends reshape curb staging.' },
    { label: 'NYC / Boston ↔ New London shoreline markets', direction: 'inbound', context: 'I-95 interstate household goods into shore and inland stock.' },
    { label: 'New London → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
  ],
  litchfield: [
    { label: 'Within Litchfield (Torrington ↔ Litchfield towns / US-7 northwest)', direction: 'within', context: 'Northwest hills and quiet markets — not Fairfield NYC collar.' },
    { label: 'Second-home seasonal turns → northwest hills', direction: 'inbound', context: 'Summer weekends and driveway grades reshape access.' },
    { label: 'Litchfield ↔ Hartford / Fairfield in-state pairs', direction: 'within', context: 'US-7/CT-8 long locals; CTDOT for pure in-state jobs.' },
    { label: 'NY / MA ↔ Litchfield rural-suburban markets', direction: 'inbound', context: 'Interstate household goods into hillside SFH stock.' },
    { label: 'Litchfield → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
    { label: 'Winter ice hillside contingency moves', direction: 'within', context: 'Confirm driveway grades and contingency before truck sizing.' },
  ],
  middlesex: [
    { label: 'Within Middlesex (Middletown ↔ Cromwell / shoreline approaches)', direction: 'within', context: 'CT River valley multi-unit — not Hartford south clone and not MA Middlesex.' },
    { label: 'Hartford ↔ Middletown (CT-9 / I-91) pairs', direction: 'within', context: 'Looks short on maps; portal time still matters at peak.' },
    { label: 'Shoreline tourism peaks → Old Saybrook approaches', direction: 'within', context: 'Summer weekends reshape curb staging on US-1 approaches.' },
    { label: 'NYC / Boston ↔ Middlesex river-valley markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and shoreline stock.' },
    { label: 'Middlesex ↔ New Haven / Hartford in-state pairs', direction: 'within', context: 'CT-9 multi-county logistics; keep county lines clear.' },
    { label: 'Middlesex → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Connecticut.' },
  ],
};

const UT_ROUTES: Record<string, CountyPopularRoute[]> = {
  'salt-lake': [
    { label: 'Within Salt Lake (Downtown / Sugar House ↔ east bench / west valley / Sandy)', direction: 'within', context: 'Elevators and bench grades vs west multi-family — portal time dominates.' },
    { label: 'California / Arizona / Colorado → Salt Lake Valley markets', direction: 'inbound', context: 'Interstate household goods into multi-unit and HOA stock.' },
    { label: 'Salt Lake ↔ Utah County (I-15) pairs', direction: 'within', context: 'Wasatch Front long locals; UDOT credentials for pure in-state jobs.' },
    { label: 'Salt Lake ↔ Davis / Weber north Front pairs', direction: 'within', context: 'I-15 multi-county logistics; core vs suburb product differs.' },
    { label: 'Ski-season / canyon traffic contingency moves', direction: 'within', context: 'Winter ice and canyon congestion reshape east-bench access.' },
    { label: 'Salt Lake → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah.' },
  ],
  utah: [
    { label: 'Within Utah County (Provo / BYU ↔ Orem / Lehi tech corridor)', direction: 'within', context: 'Campus multi-unit vs Silicon Slopes HOA — county-clear Provo/Orem/Lehi product, not statewide Utah copy.' },
    { label: 'BYU / UVU student & faculty lease cycles', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate near campus.' },
    { label: 'Utah County ↔ Salt Lake County (I-15) pairs', direction: 'within', context: 'South Front long locals; keep Utah County vs Salt Lake County destinations clear.' },
    { label: 'California / Texas → Lehi tech & Provo family markets', direction: 'inbound', context: 'Interstate household goods into HOA and multi-unit stock.' },
    { label: 'Utah County → St. George / out-of-state exits', direction: 'outbound', context: 'I-15 southbound or interstate; confirm UDOT vs FMCSA for the full route.' },
    { label: 'Utah County → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah.' },
  ],
  davis: [
    { label: 'Within Davis (Bountiful ↔ Farmington / Layton / Clearfield)', direction: 'within', context: 'North Front suburban HOA bridge — not SLC downtown elevators.' },
    { label: 'Hill AFB / PCS → Clearfield / Layton housing', direction: 'inbound', context: 'Hard report dates reshape north Front calendars.' },
    { label: 'Davis ↔ Salt Lake / Weber pairs', direction: 'within', context: 'I-15 multi-county logistics; keep suburb vs core vs Ogden product distinct.' },
    { label: 'California / Colorado → Davis family suburbs', direction: 'inbound', context: 'Interstate household goods into HOA tracts.' },
    { label: 'Davis → Cache / out-of-state exits', direction: 'outbound', context: 'Northbound regional or interstate; confirm UDOT vs FMCSA.' },
    { label: 'Davis → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah.' },
  ],
  weber: [
    { label: 'Within Weber (Downtown Ogden ↔ east bench / Roy / North Ogden)', direction: 'within', context: 'Regional hub multi-unit and bench grades — not Davis HOA-only product.' },
    { label: 'Manufacturing / healthcare relo → Ogden', direction: 'inbound', context: 'Hard report dates and industrial timing reshape windows.' },
    { label: 'Weber ↔ Davis / Salt Lake (I-15) pairs', direction: 'within', context: 'North Front long locals; keep Ogden vs suburb product distinct.' },
    { label: 'Weber ↔ Cache (US-89/91) pairs', direction: 'within', context: 'Northern valley logistics; price empty miles honestly.' },
    { label: 'Idaho / Wyoming ↔ Ogden regional markets', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Ogden → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah.' },
  ],
  washington: [
    { label: 'Within Washington County UT (St. George ↔ Washington City / Hurricane / Ivins)', direction: 'within', context: 'Southern Utah desert HOA growth — never Seattle or King County product.' },
    { label: 'Snowbird / tourism seasonal turns → St. George', direction: 'inbound', context: 'Winter peaks reshape multi-unit and HOA demand.' },
    { label: 'Las Vegas ↔ St. George (I-15) pairs', direction: 'inbound', context: 'Interstate household goods; FMCSA when any leg leaves Utah.' },
    { label: 'Salt Lake / Utah County ↔ St. George in-state pairs', direction: 'inbound', context: 'Long I-15 hauls; UDOT credentials for pure in-state jobs.' },
    { label: 'California / Arizona → St. George growth markets', direction: 'inbound', context: 'Interstate household goods into desert HOA stock.' },
    { label: 'St. George → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah — never WA UTC framing.' },
  ],
  cache: [
    { label: 'Within Cache (Logan / USU ↔ North Logan / Smithfield / Hyrum)', direction: 'within', context: 'University multi-unit vs valley suburbs — not Salt Lake spillover.' },
    { label: 'USU student & faculty lease cycles', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate near campus.' },
    { label: 'Cache ↔ Weber / Salt Lake pairs', direction: 'outbound', context: 'US-89/91 long hauls; UDOT for pure in-state jobs.' },
    { label: 'Idaho ↔ Logan regional markets', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'California / Colorado → Cache Valley housing', direction: 'inbound', context: 'Interstate arrivals into multi-unit and SFH stock.' },
    { label: 'Logan → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Utah.' },
  ],
};

const IN_ROUTES: Record<string, CountyPopularRoute[]> = {
  marion: [
    { label: 'Within Marion (Downtown / midtown ↔ Broad Ripple / west-side / I-465 ring)', direction: 'within', context: 'Elevators and neighborhood curb limits vs ring SFH — portal time dominates.' },
    { label: 'Midwest / Chicago → Indianapolis capital & logistics markets', direction: 'inbound', context: 'Interstate household goods into core multi-unit and suburban stock.' },
    { label: 'Indianapolis ↔ Fort Wayne / Evansville / Lafayette in-state pairs', direction: 'outbound', context: 'I-69/I-65 long hauls; Indiana DOR authority for pure in-state jobs.' },
    { label: 'Marion ↔ Hamilton north-suburb pairs', direction: 'within', context: 'City density vs Carmel/Fishers HOA — keep county lines clear.' },
    { label: 'Florida / Texas / NC ↔ Indianapolis reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Indianapolis → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  hamilton: [
    { label: 'Within Hamilton (Carmel ↔ Fishers / Noblesville / Westfield)', direction: 'within', context: 'North-metro HOA product — not Marion downtown elevators. Indiana Hamilton, not Ohio.' },
    { label: 'Corporate relo → Carmel / Fishers campuses', direction: 'inbound', context: 'Hard report dates and HOA packets reshape calendars.' },
    { label: 'Hamilton ↔ Marion metro pairs', direction: 'within', context: 'I-69/US-31 multi-county logistics; city vs north-suburb product differs.' },
    { label: 'Chicago / Ohio → north-Indy HOA housing', direction: 'inbound', context: 'Interstate household goods into growth suburbs.' },
    { label: 'Hamilton → Fort Wayne / out-of-state exits', direction: 'outbound', context: 'I-69 northbound or interstate; confirm DOR vs FMCSA for the full route.' },
    { label: 'Florida / Sun Belt ↔ Hamilton reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
  ],
  lake: [
    { label: 'Within Lake (Hammond / Munster ↔ Merrillville / Crown Point)', direction: 'within', context: 'Chicago-collar multi-unit vs south HOA — not Indianapolis product.' },
    { label: 'Chicago metro ↔ NW Indiana collar pairs', direction: 'inbound', context: 'I-80/94 interstate household goods; FMCSA when any leg leaves Indiana.' },
    { label: 'Lake ↔ Porter / LaPorte regional pairs', direction: 'within', context: 'NW Indiana multi-county logistics; keep destinations clear.' },
    { label: 'Illinois suburbs → Merrillville / Crown Point housing', direction: 'inbound', context: 'Cross-border empty miles and authority rules dominate quotes.' },
    { label: 'Lake → Indianapolis in-state pairs', direction: 'outbound', context: 'I-65 long hauls; Indiana DOR for pure in-state jobs.' },
    { label: 'Lake → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  allen: [
    { label: 'Within Allen (Downtown Fort Wayne ↔ north / SW suburbs / New Haven)', direction: 'within', context: 'Regional hub multi-unit vs HOA growth — not Indy collar product.' },
    { label: 'Midwest manufacturing / healthcare relo → Fort Wayne', direction: 'inbound', context: 'Hard report dates and industrial timing reshape windows.' },
    { label: 'Fort Wayne ↔ Indianapolis (I-69) pairs', direction: 'outbound', context: 'Long I-69 locals; Indiana DOR for pure in-state jobs.' },
    { label: 'Allen ↔ St. Joseph / Elkhart north-central pairs', direction: 'within', context: 'NE vs north-central logistics differ; keep county lines clear.' },
    { label: 'Ohio / Michigan → Fort Wayne regional markets', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Fort Wayne → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  'st-joseph': [
    { label: 'Within St. Joseph (South Bend / ND ↔ Mishawaka / Granger)', direction: 'within', context: 'University multi-unit vs HOA growth — not Elkhart-only manufacturing product.' },
    { label: 'Notre Dame student & faculty lease cycles', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate near campus.' },
    { label: 'Chicago / Michigan ↔ South Bend pairs', direction: 'inbound', context: 'I-80/90 interstate household goods; FMCSA when leaving Indiana.' },
    { label: 'St. Joseph ↔ Elkhart corridor pairs', direction: 'within', context: 'University vs RV/manufacturing product differs at each end.' },
    { label: 'South Bend ↔ Indianapolis in-state pairs', direction: 'outbound', context: 'US-31 long hauls; Indiana DOR for pure in-state jobs.' },
    { label: 'South Bend → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  elkhart: [
    { label: 'Within Elkhart (Elkhart city ↔ Goshen / Bristol–Middlebury / Nappanee)', direction: 'within', context: 'RV/manufacturing corridor — not South Bend campus product.' },
    { label: 'Manufacturing / RV workforce relo → Elkhart corridor', direction: 'inbound', context: 'Plant calendars and shift windows reshape crew timing.' },
    { label: 'Elkhart ↔ St. Joseph / South Bend pairs', direction: 'within', context: 'US-20 logistics; keep manufacturing vs university product distinct.' },
    { label: 'Michigan / Illinois ↔ Elkhart industrial markets', direction: 'inbound', context: 'I-80/90 interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Elkhart → Indianapolis in-state pairs', direction: 'outbound', context: 'Long regional hauls; Indiana DOR for pure in-state jobs.' },
    { label: 'Elkhart → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  tippecanoe: [
    { label: 'Within Tippecanoe (West Lafayette / Purdue ↔ Lafayette / south growth)', direction: 'within', context: 'University multi-unit vs HOA suburbs — not Indy collar product.' },
    { label: 'Purdue student & faculty lease cycles', direction: 'within', context: 'August/May clusters; elevators and curb limits dominate near campus.' },
    { label: 'Indianapolis ↔ Lafayette (I-65) pairs', direction: 'inbound', context: 'Looks regional at peak; price portal time honestly.' },
    { label: 'Chicago / Illinois ↔ Purdue markets', direction: 'inbound', context: 'Interstate household goods into campus multi-unit and suburban stock.' },
    { label: 'Lafayette ↔ Fort Wayne / Evansville in-state pairs', direction: 'outbound', context: 'Cross-state-of-IN logistics; Indiana DOR for pure in-state jobs.' },
    { label: 'Lafayette → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
  vanderburgh: [
    { label: 'Within Vanderburgh (Downtown Evansville ↔ east suburbs / west industrial)', direction: 'within', context: 'Ohio River city multi-unit vs HOA — not Indy south clone product.' },
    { label: 'Kentucky / Illinois tri-state ↔ Evansville pairs', direction: 'inbound', context: 'River-city interstate household goods; FMCSA when any leg leaves Indiana.' },
    { label: 'Evansville ↔ Indianapolis (I-69) pairs', direction: 'outbound', context: 'Long I-69 hauls; Indiana DOR for pure in-state jobs.' },
    { label: 'Manufacturing / healthcare relo → Evansville', direction: 'inbound', context: 'Hard report dates and industrial timing reshape windows.' },
    { label: 'Florida / Sun Belt ↔ Evansville reverse family moves', direction: 'inbound', context: 'Interstate household goods; FMCSA for cross-state legs.' },
    { label: 'Evansville → out-of-state reverse exits', direction: 'outbound', context: 'FMCSA required once leaving Indiana.' },
  ],
};

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
  livingston: [
    { label: 'Within Livingston (Brighton ↔ Howell)', direction: 'within', context: 'US-23 growth multi-family vs seat stock — not Oakland continuous density.' },
    { label: 'Oakland → Livingston US-23 collar', direction: 'inbound', context: 'Parent north-metro outbound into Brighton product — not an Oakland rename.', href: '/local-movers/michigan/oakland' },
    { label: 'Livingston → Oakland / Wayne job markets', direction: 'outbound', context: 'Outer-collar professionals into denser SE Michigan stock.', href: '/local-movers/michigan/oakland' },
    { label: 'Livingston ↔ Washtenaw / Ingham regional pairs', direction: 'within', context: 'US-23 / I-96 mid-corridor logistics; keep county lines clear.' },
    { label: 'Midwest → Livingston growth housing', direction: 'inbound', context: 'Family inflows into US-23 HOA corridors.' },
  ],
  'st-clair': [
    { label: 'Within St. Clair (Port Huron ↔ Marysville)', direction: 'within', context: 'Blue Water multi-story vs corridor SFH — I-94 terminus freeflow.' },
    { label: 'Macomb → St. Clair east edge', direction: 'inbound', context: 'Parent east-metro outbound into Port Huron product — not a Macomb rename.', href: '/local-movers/michigan/macomb' },
    { label: 'St. Clair → Macomb / Detroit job markets', direction: 'outbound', context: 'East-edge professionals into denser east-metro stock.', href: '/local-movers/michigan/macomb' },
    { label: 'St. Clair → Canada / border pairs', direction: 'outbound', context: 'Border-adjacent hops need FMCSA authority clarity.' },
    { label: 'Midwest → Port Huron housing', direction: 'inbound', context: 'Regional and industrial inflows into multi-unit and SFH stock.' },
  ],
  monroe: [
    { label: 'Within Monroe (Monroe city ↔ township growth)', direction: 'within', context: 'I-75 south collar multi-story vs township SFH.' },
    { label: 'Wayne → Monroe south collar', direction: 'inbound', context: 'Parent metro outbound into Monroe product — not a Wayne rename.', href: '/local-movers/michigan/wayne' },
    { label: 'Monroe → Wayne / Detroit job markets', direction: 'outbound', context: 'South-collar professionals into denser city stock.', href: '/local-movers/michigan/wayne' },
    { label: 'Monroe → Ohio border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Midwest → Monroe I-75 housing', direction: 'inbound', context: 'Industrial and family inflows into south-collar stock.' },
  ],
  jackson: [
    { label: 'Within Jackson (city core ↔ township growth)', direction: 'within', context: 'I-94 mid-corridor multi-story vs township SFH — not Ann Arbor campus product.' },
    { label: 'Washtenaw → Jackson mid-corridor', direction: 'inbound', context: 'Parent university market outbound into independent hub product — not a Washtenaw rename.', href: '/local-movers/michigan/washtenaw' },
    { label: 'Jackson ↔ Ann Arbor / Battle Creek pairs', direction: 'within', context: 'I-94 logistics; price portal-to-portal honestly.' },
    { label: 'Jackson → Detroit / Lansing in-state pairs', direction: 'outbound', context: 'US-127 / I-94 long hauls; MSP CVED for pure Michigan jobs.' },
    { label: 'Midwest → Jackson hub housing', direction: 'inbound', context: 'Regional employment inflows into multi-unit and township stock.' },
  ],
  muskegon: [
    { label: 'Within Muskegon (port core ↔ Norton Shores / lakeshore)', direction: 'within', context: 'Port multi-story vs shore stock — not Holland furniture-collar product.' },
    { label: 'Ottawa → Muskegon north lakeshore', direction: 'inbound', context: 'Parent west collar outbound into port product — not an Ottawa rename.', href: '/local-movers/michigan/ottawa' },
    { label: 'Muskegon ↔ Kent / Grand Rapids pairs', direction: 'within', context: 'US-31 / I-96 west-MI logistics; clarify lakeshore vs core destinations.', href: '/local-movers/michigan/kent' },
    { label: 'Tourism & lakeshore seasonal turns', direction: 'within', context: 'Summer weekends rewrite shore access.' },
    { label: 'Chicago / Midwest → Muskegon lakeshore housing', direction: 'inbound', context: 'Interstate household goods into port and shore stock.' },
  ],
  berrien: [
    { label: 'Within Berrien (St. Joseph ↔ Benton Harbor / Niles)', direction: 'within', context: 'SW lakeshore multi-story vs IN-border edges.' },
    { label: 'Kalamazoo → Berrien SW lakeshore', direction: 'inbound', context: 'Independent SW market inflows — not a Kalamazoo rename.', href: '/local-movers/michigan/kalamazoo' },
    { label: 'Berrien → Indiana border pairs', direction: 'outbound', context: 'Short-looking border hops still need FMCSA authority.' },
    { label: 'Berrien ↔ Holland / Battle Creek regional pairs', direction: 'within', context: 'I-94 SW Michigan logistics; keep county lines clear.' },
    { label: 'Chicago ↔ Berrien lakeshore housing', direction: 'inbound', context: 'Interstate household goods into shore and Niles-edge stock.' },
  ],
  calhoun: [
    { label: 'Within Calhoun (Battle Creek ↔ township growth)', direction: 'within', context: 'I-94 industrial multi-story vs township SFH — not Kalamazoo campus product.' },
    { label: 'Kalamazoo → Battle Creek / Calhoun', direction: 'inbound', context: 'Parent university market outbound into industrial hub product — not a Kalamazoo rename.', href: '/local-movers/michigan/kalamazoo' },
    { label: 'Calhoun ↔ Jackson / Kalamazoo I-94 pairs', direction: 'within', context: 'Mid-corridor logistics; price portal-to-portal honestly.' },
    { label: 'Calhoun → Detroit / Grand Rapids in-state pairs', direction: 'outbound', context: 'I-94 / I-69 long hauls; MSP CVED for pure Michigan jobs.' },
    { label: 'Midwest → Battle Creek industrial housing', direction: 'inbound', context: 'Manufacturing employment inflows into multi-unit and township stock.' },
  ],
  eaton: [
    { label: 'Within Eaton (Delta Twp ↔ Charlotte)', direction: 'within', context: 'West-Lansing multi-family vs seat multi-story — not East Lansing campus product.' },
    { label: 'Ingham → Eaton west collar', direction: 'inbound', context: 'Parent capital metro outbound into Delta product — not an Ingham rename.', href: '/local-movers/michigan/ingham' },
    { label: 'Eaton → Ingham / Lansing job markets', direction: 'outbound', context: 'West-collar professionals into denser capital stock.', href: '/local-movers/michigan/ingham' },
    { label: 'Eaton ↔ Clinton / Ionia regional pairs', direction: 'within', context: 'Capital-region multi-county logistics; keep county lines clear.' },
    { label: 'Midwest → Eaton west-Lansing housing', direction: 'inbound', context: 'Family and capital-adjacent inflows into multi-family and SFH stock.' },
  ],
  'grand-traverse': [
    { label: 'Within Grand Traverse (Traverse City ↔ peninsula / townships)', direction: 'within', context: 'Tourism multi-story vs bay last-mile — seasonal peaks rewrite curb plans.' },
    { label: 'Lower MI → Traverse City / Grand Traverse', direction: 'inbound', context: 'NW tourism/regional hub inflows — not Detroit collar defaults.', href: '/local-movers/michigan/wayne' },
    { label: 'Tourism seasonal turns → bay / peninsula stock', direction: 'within', context: 'Summer weekends tighten shore access.' },
    { label: 'Grand Traverse → Grand Rapids / Detroit in-state pairs', direction: 'outbound', context: 'Long US-31 / I-75 logistics; MSP CVED for pure Michigan jobs.' },
    { label: 'Out-of-state → NW Michigan lifestyle housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required; long empty miles matter.' },
  ],
  midland: [
    { label: 'Within Midland (planned suburbs ↔ campus multi-family)', direction: 'within', context: 'Corporate planned HOAs vs multi-family — not Saginaw industrial multi-unit fabric.' },
    { label: 'Saginaw → Midland corporate/residential bay', direction: 'inbound', context: 'Parent bay hub outbound into planned product — not a Saginaw rename.', href: '/local-movers/michigan/saginaw' },
    { label: 'Midland ↔ Saginaw / Bay City pairs', direction: 'within', context: 'Great Lakes Bay logistics; price empty miles honestly.' },
    { label: 'Midland → Detroit metro (I-75) pairs', direction: 'outbound', context: 'Long I-75 locals; Michigan authority for pure in-state jobs.' },
    { label: 'Midwest → Midland corporate housing', direction: 'inbound', context: 'Employment inflows into planned SFH and multi-family stock.' },
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


const WI_ROUTES: Record<string, CountyPopularRoute[]> = {
  milwaukee: [
    { label: 'Within Milwaukee (Downtown / East Side ↔ Wauwatosa / Bay View)', direction: 'within', context: 'Elevator towers and neighborhood walk-ups vs west inner-ring multi-family — portal time on I-94 / I-43 dominates.' },
    { label: 'Chicago / IL → Milwaukee professional & industrial housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and inner-ring stock; FMCSA required.' },
    { label: 'Milwaukee ↔ Waukesha west-metro pairs', direction: 'within', context: 'Looks local on maps; I-94 freeflow and city vs HOA products differ.' },
    { label: 'Milwaukee → Madison / Green Bay in-state pairs', direction: 'outbound', context: 'I-94 / I-41 long hauls; written estimates and insurance for pure in-state jobs.' },
    { label: 'Milwaukee → Florida / Arizona / Texas reverse exits', direction: 'outbound', context: 'Snowbird and permanent relocations; FMCSA for cross-state legs.' },
    { label: 'Minnesota Twin Cities → Milwaukee career corridors', direction: 'inbound', context: 'Regional interstate pairs; confirm FMCSA for the full route.' },
  ],
  dane: [
    { label: 'Within Dane (Isthmus / campus ↔ Fitchburg / Middleton / Sun Prairie)', direction: 'within', context: 'Isthmus multi-unit vs suburb-ring HOA product — Beltline portal time dominates.' },
    { label: 'Milwaukee / Chicago → Madison capital & university housing', direction: 'inbound', context: 'Interstate or long in-state hauls into multi-unit and professional stock.' },
    { label: 'UW–Madison semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Madison → Milwaukee / Twin Cities reverse career pairs', direction: 'outbound', context: 'I-94 / I-90 long hauls; confirm Wisconsin consumer controls vs FMCSA for the full route.' },
    { label: 'Dane → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Illinois border → Madison professional corridors', direction: 'inbound', context: 'Regional interstate pairs; FMCSA for cross-state legs.' },
  ],
  waukesha: [
    { label: 'Within Waukesha (Brookfield / New Berlin ↔ Lake Country)', direction: 'within', context: 'West-metro HOA multi-family vs lakeshore SFH — empty miles matter.' },
    { label: 'Milwaukee → Waukesha west-metro housing', direction: 'inbound', context: 'I-94 collar logistics; portal time dominates at peak.' },
    { label: 'Chicago / IL → Brookfield corporate suburbs', direction: 'inbound', context: 'Interstate household goods into multi-family and executive SFH; FMCSA required.' },
    { label: 'Waukesha ↔ Milwaukee multi-county pairs', direction: 'within', context: 'City vs west-metro access products differ — keep county lines clear.' },
    { label: 'Waukesha → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Waukesha → Madison in-state pairs', direction: 'outbound', context: 'I-94 long locals; written estimates and insurance for pure in-state jobs.' },
  ],
  brown: [
    { label: 'Within Brown (Downtown Green Bay ↔ De Pere / Howard)', direction: 'within', context: 'Near-core multi-unit vs northern growth SFH — not a Fox Cities clone.' },
    { label: 'Fox Cities / Milwaukee → Green Bay regional housing', direction: 'inbound', context: 'I-41 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Green Bay ↔ Appleton / Oshkosh regional pairs', direction: 'within', context: 'I-41 northeast logistics; keep county lines clear.' },
    { label: 'Midwest → Green Bay manufacturing & healthcare corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
    { label: 'Brown → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Green Bay event-weekend staging constraints', direction: 'within', context: 'Home schedules reshape curb and freeflow — prefer mid-week when flexible.' },
  ],
  racine: [
    { label: 'Within Racine (Downtown / lakeshore ↔ Mount Pleasant / Burlington)', direction: 'within', context: 'Mid-size lake-city stock vs HOA growth and western empty miles.' },
    { label: 'Milwaukee → Racine mid-corridor housing', direction: 'inbound', context: 'I-94 logistics; portal time dominates at peak.' },
    { label: 'Racine ↔ Kenosha southeast pairs', direction: 'within', context: 'Lake corridor multi-county logistics; keep county lines clear.' },
    { label: 'Chicago / IL → Racine mid-size housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Racine → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Racine → Milwaukee reverse career pairs', direction: 'outbound', context: 'I-94 northbound; written estimates and insurance for pure in-state jobs.' },
  ],
  kenosha: [
    { label: 'Within Kenosha (Downtown / lakeshore ↔ Pleasant Prairie / Twin Lakes)', direction: 'within', context: 'IL-border growth multi-family vs lakeshore and western lake edges.' },
    { label: 'Chicago / Lake County IL → Kenosha border housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'Kenosha ↔ Racine / Milwaukee I-94 pairs', direction: 'within', context: 'Southeast collar logistics; portal time dominates at peak.' },
    { label: 'Illinois reverse-commute relo → Pleasant Prairie multi-family', direction: 'inbound', context: 'HOA multi-unit and hard report dates dominate growth corridors.' },
    { label: 'Kenosha → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Kenosha → Milwaukee in-state pairs', direction: 'outbound', context: 'I-94 northbound; written estimates and insurance for pure in-state jobs.' },
  ],
  outagamie: [
    { label: 'Within Outagamie (Downtown Appleton ↔ Grand Chute / Kaukauna)', direction: 'within', context: 'Fox Cities multi-unit vs river-town product — not an Oshkosh clone.' },
    { label: 'Green Bay / Oshkosh → Appleton Fox Cities pairs', direction: 'within', context: 'I-41 regional logistics; keep county lines clear.' },
    { label: 'Milwaukee / Midwest → Appleton manufacturing housing', direction: 'inbound', context: 'Interstate or long in-state hauls into multi-unit and suburban stock.' },
    { label: 'Outagamie → Green Bay / Milwaukee reverse career pairs', direction: 'outbound', context: 'I-41 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Outagamie → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Manufacturing workforce relo corridors in the Fox Cities', direction: 'inbound', context: 'Shift calendars and industrial freeflow reshape crew timing.' },
  ],
  winnebago: [
    { label: 'Within Winnebago County, WI (Downtown / campus Oshkosh ↔ Neenah / Menasha)', direction: 'within', context: 'Oshkosh multi-unit vs northern Fox Cities edges — not an Appleton clone.' },
    { label: 'Appleton → Oshkosh I-41 pairs', direction: 'within', context: 'Fox Valley multi-county logistics; clarify Outagamie vs Winnebago addresses.' },
    { label: 'UW Oshkosh semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'AirVenture week freeflow constraints near Oshkosh', direction: 'within', context: 'Late July congestion rewrites local portal times — prefer other weeks when flexible.' },
    { label: 'Winnebago County, WI → Florida reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Milwaukee / Midwest → Oshkosh regional housing', direction: 'inbound', context: 'Interstate or long in-state hauls into multi-unit and suburban stock.' },
  ],
};


const MO_ROUTES: Record<string, CountyPopularRoute[]> = {
  'st-louis': [
    { label: 'Within St. Louis County, MO (Clayton / West County ↔ North / South County)', direction: 'within', context: 'Inner-ring elevators vs West County HOA multi-family — I-270 portal time dominates. Missouri only, not Minnesota St. Louis County.' },
    { label: 'Illinois Metro East → St. Louis County housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'St. Louis County ↔ St. Charles west-metro pairs', direction: 'within', context: 'I-70 / I-64 growth logistics; keep county lines clear.' },
    { label: 'Kansas City → St. Louis in-state long hauls', direction: 'inbound', context: 'I-70 cross-state-of-MO career moves; MoDOT HHG for pure in-state jobs.' },
    { label: 'St. Louis County → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Chicago / Midwest → St. Louis County professional corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  jackson: [
    { label: 'Within Jackson (Downtown KC / Midtown ↔ Independence / Lee’s Summit)', direction: 'within', context: 'Urban multi-unit vs eastern suburban product — Kansas City MO, not St. Louis.' },
    { label: 'Kansas / Johnson County → Jackson County housing', direction: 'inbound', context: 'Short border hops need FMCSA; clarify MoDOT vs interstate early.' },
    { label: 'Jackson ↔ Clay Northland pairs', direction: 'within', context: 'I-35 / I-435 multi-county logistics; keep county lines clear.' },
    { label: 'St. Louis → Kansas City in-state long hauls', direction: 'inbound', context: 'I-70 cross-state-of-MO; MoDOT HHG for pure in-state jobs.' },
    { label: 'Jackson → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Texas / Southwest → KC MO professional corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  'st-charles': [
    { label: 'Within St. Charles (St. Charles city ↔ O’Fallon / St. Peters / Wentzville)', direction: 'within', context: 'West metro growth multi-family vs river-town product — not St. Louis County inner-ring clones.' },
    { label: 'St. Louis County → St. Charles west-metro housing', direction: 'inbound', context: 'I-70 / MO-370 collar logistics; portal time dominates at peak.' },
    { label: 'St. Charles ↔ St. Louis County multi-county pairs', direction: 'within', context: 'Keep county lines clear; access products differ.' },
    { label: 'Illinois → St. Charles growth housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'St. Charles → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'St. Charles → Kansas City in-state long hauls', direction: 'outbound', context: 'I-70 long locals; MoDOT HHG for pure in-state jobs.' },
  ],
  greene: [
    { label: 'Within Greene (Downtown Springfield ↔ Nixa / Republic edges)', direction: 'within', context: 'Southwest MO regional product — not St. Louis or KC spillover.' },
    { label: 'St. Louis / KC → Springfield in-state long hauls', direction: 'inbound', context: 'I-44 long locals; MoDOT HHG for pure in-state jobs.' },
    { label: 'Arkansas / Oklahoma → Springfield regional housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Campus and healthcare relo → Springfield multi-unit', direction: 'inbound', context: 'Hard report dates and lease waves cluster demand.' },
    { label: 'Greene → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Greene → Branson / Ozarks regional pairs', direction: 'within', context: 'US-65 logistics; price empty miles honestly.' },
  ],
  clay: [
    { label: 'Within Clay (North Kansas City / Gladstone ↔ Liberty / Kearney)', direction: 'within', context: 'Northland multi-family vs growth SFH — not Jackson downtown defaults.' },
    { label: 'Jackson County → Clay Northland housing', direction: 'inbound', context: 'I-35 / I-435 multi-county logistics; keep county lines clear.' },
    { label: 'Kansas → Clay County border pairs', direction: 'inbound', context: 'Short interstate hops need FMCSA.' },
    { label: 'Clay ↔ Platte north-metro pairs', direction: 'within', context: 'Northland logistics; clarify county lines.' },
    { label: 'Clay → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Northland professional corridors', direction: 'inbound', context: 'Interstate household goods into multi-family and suburban stock.' },
  ],
  jefferson: [
    { label: 'Within Jefferson (Arnold / High Ridge ↔ Festus / Hillsboro edges)', direction: 'within', context: 'South metro fringe product — not St. Louis County West County HOA defaults.' },
    { label: 'St. Louis County → Jefferson south-metro housing', direction: 'inbound', context: 'I-55 collar logistics; empty miles matter.' },
    { label: 'Jefferson ↔ St. Louis County multi-county pairs', direction: 'within', context: 'Keep county lines clear; access products differ.' },
    { label: 'Illinois → Jefferson fringe housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Jefferson → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Jefferson → Cape / southeast MO regional pairs', direction: 'outbound', context: 'I-55 long locals; MoDOT HHG for pure in-state jobs.' },
  ],
};


const KY_ROUTES: Record<string, CountyPopularRoute[]> = {
  jefferson: [
    { label: 'Within Jefferson County, KY (East End ↔ South End / Downtown Louisville)', direction: 'within', context: 'Louisville neighborhood and East End HOA product — Kentucky only, not Jefferson County MO.' },
    { label: 'Indiana / Southern IN → Louisville housing', direction: 'inbound', context: 'Short bridge hops need FMCSA; clarify KYTC vs interstate early.' },
    { label: 'Louisville ↔ Lexington in-state pairs', direction: 'outbound', context: 'I-64 long locals; KYTC HHG for pure in-state jobs.' },
    { label: 'Louisville ↔ NKY / Cincinnati collar pairs', direction: 'outbound', context: 'I-71 freeflow; Ohio destinations need FMCSA.' },
    { label: 'Jefferson County, KY → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Louisville professional & healthcare corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and East End stock.' },
  ],
  fayette: [
    { label: 'Within Fayette (Downtown / campus ↔ horse-country suburbs)', direction: 'within', context: 'Lexington university multi-unit vs suburban HOA product — not Louisville.' },
    { label: 'Louisville → Lexington in-state pairs', direction: 'inbound', context: 'I-64 long locals; KYTC HHG for pure in-state jobs.' },
    { label: 'UK semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Ohio / Indiana → Lexington professional housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Fayette → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Fayette → Cincinnati / NKY reverse career pairs', direction: 'outbound', context: 'I-75 freeflow; FMCSA once entering Ohio.' },
  ],
  kenton: [
    { label: 'Within Kenton (Covington ↔ Independence / suburban NKY)', direction: 'within', context: 'Ohio River urban multi-unit vs suburban growth — Northern Kentucky, not Louisville.' },
    { label: 'Cincinnati / Hamilton County OH → Kenton housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'Kenton ↔ Boone North Kentucky pairs', direction: 'within', context: 'I-275 multi-county logistics; keep county lines clear.' },
    { label: 'Louisville → NKY in-state pairs', direction: 'inbound', context: 'I-71 long locals; KYTC HHG for pure in-state jobs.' },
    { label: 'Kenton → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Covington / NKY professional corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  boone: [
    { label: 'Within Boone (Florence / CVG corridor ↔ Hebron / Union growth)', direction: 'within', context: 'Airport-corridor multi-family vs growth SFH — not Covington urban defaults.' },
    { label: 'Cincinnati / OH → Boone County CVG-corridor housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required; airport freeflow matters.' },
    { label: 'Boone ↔ Kenton NKY pairs', direction: 'within', context: 'I-71/75 / I-275 logistics; keep county lines clear.' },
    { label: 'Louisville → Boone in-state pairs', direction: 'inbound', context: 'I-71 long locals; KYTC HHG for pure in-state jobs.' },
    { label: 'Boone → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Corporate / airport-adjacent relo → Florence multi-family', direction: 'inbound', context: 'Hard report dates and HOA windows dominate growth corridors.' },
  ],
  warren: [
    { label: 'Within Warren (Downtown Bowling Green ↔ suburb rings)', direction: 'within', context: 'South-central regional product — not Louisville south spillover.' },
    { label: 'Louisville / Nashville → Bowling Green in-state or regional pairs', direction: 'inbound', context: 'I-65 logistics; KYTC for pure KY jobs; FMCSA for TN legs.' },
    { label: 'Campus and manufacturing relo → Bowling Green multi-unit', direction: 'inbound', context: 'Lease waves and hard report dates cluster demand.' },
    { label: 'Warren → Louisville / Lexington reverse career pairs', direction: 'outbound', context: 'I-65 / parkway logistics; KYTC HHG for pure in-state jobs.' },
    { label: 'Warren → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Bowling Green regional housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  hardin: [
    { label: 'Within Hardin (Elizabethtown ↔ Radcliff / Fort Knox-adjacent edges)', direction: 'within', context: 'I-65 regional product with military-adjacent calendars where accurate.' },
    { label: 'Louisville → Elizabethtown in-state pairs', direction: 'inbound', context: 'I-65 long locals; KYTC HHG for pure in-state jobs.' },
    { label: 'Fort Knox PCS / military relo → Hardin multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and storage-in-transit are common estimate inputs.' },
    { label: 'Hardin → Louisville reverse career pairs', direction: 'outbound', context: 'I-65 freeflow; KYTC HHG for pure in-state jobs.' },
    { label: 'Hardin → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tennessee / Midwest → Hardin regional housing', direction: 'inbound', context: 'Interstate or long regional hauls; confirm KYTC vs FMCSA for the full route.' },
  ],
};


const NV_ROUTES: Record<string, CountyPopularRoute[]> = {
  clark: [
    { label: 'Within Clark (Strip-adjacent / downtown ↔ Henderson / Summerlin / North Las Vegas)', direction: 'within', context: 'Elevator towers and HOA multi-family vs valley SFH — heat and I-15 freeflow dominate.' },
    { label: 'California / SoCal → Las Vegas Valley housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required; heat pacing matters.' },
    { label: 'Clark ↔ Nye (Pahrump) desert pairs', direction: 'within', context: 'NV-160 long empty miles; price portal time honestly.' },
    { label: 'Las Vegas → Reno in-state long hauls', direction: 'outbound', context: 'US-95 long locals; NTA CPCN for pure in-state jobs.' },
    { label: 'Clark → out-of-state reverse exits (CA / AZ / TX)', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest / East → Las Vegas professional & hospitality corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and HOA stock.' },
  ],
  washoe: [
    { label: 'Within Washoe (Downtown Reno / Midtown ↔ Sparks / foothill edges)', direction: 'within', context: 'Urban multi-unit vs industrial and foothill product — not Las Vegas Valley.' },
    { label: 'California / Bay Area → Reno–Sparks housing', direction: 'inbound', context: 'I-80 interstate household goods; FMCSA required.' },
    { label: 'Washoe ↔ Carson City capital pairs', direction: 'within', context: 'US-395 / I-580 logistics; keep market differences clear.' },
    { label: 'Reno → Las Vegas in-state long hauls', direction: 'outbound', context: 'US-95 long locals; NTA CPCN for pure in-state jobs.' },
    { label: 'Washoe → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Warehouse / industrial workforce relo → Sparks multi-family', direction: 'inbound', context: 'Shift calendars and I-80 freeflow reshape crew timing.' },
  ],
  'carson-city': [
    { label: 'Within Carson City (downtown / capital core ↔ valley edges)', direction: 'within', context: 'Capital-scale multi-unit and smaller urban grid — not Reno south clone.' },
    { label: 'Reno → Carson City capital housing', direction: 'inbound', context: 'US-395 / I-580 links; NTA CPCN for pure in-state jobs.' },
    { label: 'Carson City ↔ Douglas / Carson Valley pairs', direction: 'within', context: 'Valley logistics; keep city-county vs Douglas lines clear.' },
    { label: 'California → Carson City capital corridors', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Carson City → Las Vegas in-state long hauls', direction: 'outbound', context: 'US-95 long locals; NTA CPCN for pure in-state jobs.' },
    { label: 'Carson City → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  douglas: [
    { label: 'Within Douglas (Minden–Gardnerville ↔ Tahoe NV approaches)', direction: 'within', context: 'Carson Valley and Tahoe access product — not Las Vegas.' },
    { label: 'Carson City / Reno → Douglas Valley housing', direction: 'inbound', context: 'US-395 logistics; NTA CPCN for pure in-state jobs.' },
    { label: 'California Tahoe / South Lake → Douglas NV pairs', direction: 'inbound', context: 'Short border hops need FMCSA; seasonal freeflow matters.' },
    { label: 'Douglas → Reno reverse career pairs', direction: 'outbound', context: 'US-395 freeflow; NTA CPCN for pure in-state jobs.' },
    { label: 'Douglas → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Seasonal second-home turns along Tahoe NV approaches', direction: 'within', context: 'Summer tourism and winter weather rewrite local hours.' },
  ],
  nye: [
    { label: 'Within Nye (Pahrump growth ↔ desert edges)', direction: 'within', context: 'Desert exurban product — not a Clark County rename.' },
    { label: 'Las Vegas / Clark → Pahrump pairs', direction: 'inbound', context: 'NV-160 long empty miles; heat pacing and portal time dominate.' },
    { label: 'California → Pahrump housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Nye → Las Vegas reverse commute housing pairs', direction: 'outbound', context: 'NV-160 freeflow; NTA CPCN for pure in-state jobs.' },
    { label: 'Nye → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Retirement and second-home inflows → Pahrump multi-family and SFH', direction: 'inbound', context: 'HOA multi-family and long driveway stock both appear.' },
  ],
};


const OK_ROUTES: Record<string, CountyPopularRoute[]> = {
  oklahoma: [
    { label: 'Within Oklahoma County (Downtown / Midtown OKC ↔ North / West suburbs)', direction: 'within', context: 'Oklahoma County / OKC product — county-clear, not statewide-only framing; elevators vs HOA multi-family differ.' },
    { label: 'Texas / DFW → Oklahoma City housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'OKC ↔ Tulsa in-state pairs', direction: 'outbound', context: 'I-44 long locals; OCC HHG certificate for pure in-state jobs.' },
    { label: 'Oklahoma County ↔ Cleveland (Norman) pairs', direction: 'within', context: 'I-35 south-metro logistics; keep county lines clear.' },
    { label: 'OKC → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Oklahoma City professional & energy corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  tulsa: [
    { label: 'Within Tulsa (Midtown ↔ South Tulsa / Broken Arrow edges)', direction: 'within', context: 'River-city multi-unit vs south suburban HOA product — not OKC defaults.' },
    { label: 'OKC → Tulsa in-state pairs', direction: 'inbound', context: 'I-44 long locals; OCC HHG certificate for pure in-state jobs.' },
    { label: 'Tulsa ↔ Rogers / NE metro pairs', direction: 'within', context: 'I-44 / turnpike logistics; keep county lines clear.' },
    { label: 'Texas / Arkansas → Tulsa housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tulsa → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Tulsa professional corridors', direction: 'inbound', context: 'Interstate household goods into midtown multi-unit and suburban stock.' },
  ],
  cleveland: [
    { label: 'Within Cleveland County, OK (Norman core ↔ OU multi-unit / south growth)', direction: 'within', context: 'Norman / OU product — Oklahoma only, not Cleveland Ohio.' },
    { label: 'OU semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Oklahoma County ↔ Cleveland (Norman) pairs', direction: 'within', context: 'I-35 south-metro logistics; keep county lines clear.' },
    { label: 'Texas → Norman / Cleveland County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Cleveland County, OK → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Cleveland → Tulsa / regional reverse career pairs', direction: 'outbound', context: 'I-44 / I-35 logistics; OCC for pure in-state jobs.' },
  ],
  canadian: [
    { label: 'Within Canadian (Yukon / Mustang ↔ west OKC growth edges)', direction: 'within', context: 'West-metro HOA multi-family — not downtown Oklahoma County elevators as default.' },
    { label: 'Oklahoma County → Canadian west-metro housing', direction: 'inbound', context: 'I-40 / Kilpatrick collar logistics; portal time dominates at peak.' },
    { label: 'Canadian ↔ Oklahoma County multi-county pairs', direction: 'within', context: 'Keep county lines clear; access products differ.' },
    { label: 'Texas → west OKC / Canadian growth housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Canadian → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Canadian → Tulsa in-state long hauls', direction: 'outbound', context: 'I-44 long locals; OCC HHG certificate for pure in-state jobs.' },
  ],
  comanche: [
    { label: 'Within Comanche (Lawton core ↔ Fort Sill-adjacent edges)', direction: 'within', context: 'Southwest regional product with military-adjacent calendars where accurate.' },
    { label: 'Fort Sill PCS / military relo → Lawton multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and storage-in-transit are common estimate inputs.' },
    { label: 'OKC / Tulsa → Lawton in-state pairs', direction: 'inbound', context: 'I-44 long locals; OCC HHG certificate for pure in-state jobs.' },
    { label: 'Texas → Lawton / Comanche housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Comanche → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Comanche → OKC reverse career pairs', direction: 'outbound', context: 'I-44 freeflow; OCC for pure in-state jobs.' },
  ],
  rogers: [
    { label: 'Within Rogers (Claremore ↔ Catoosa / NE Tulsa fringe)', direction: 'within', context: 'Northeast Tulsa metro fringe — not Tulsa midtown defaults.' },
    { label: 'Tulsa County → Rogers NE metro housing', direction: 'inbound', context: 'I-44 / OK-66 collar logistics; empty miles matter.' },
    { label: 'Rogers ↔ Tulsa multi-county pairs', direction: 'within', context: 'Keep county lines clear; access products differ.' },
    { label: 'Arkansas / Missouri → Rogers fringe housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Rogers → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Rogers → OKC in-state long hauls', direction: 'outbound', context: 'I-44 long locals; OCC HHG certificate for pure in-state jobs.' },
  ],
};


const IA_ROUTES: Record<string, CountyPopularRoute[]> = {
  polk: [
    { label: 'Within Polk (Downtown Des Moines ↔ West Des Moines / Ankeny / Urbandale)', direction: 'within', context: 'Insurance/corporate multi-unit vs suburban HOA product — portal time on I-235 / I-35 dominates.' },
    { label: 'Chicago / Midwest → Des Moines professional housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Des Moines ↔ Cedar Rapids / Iowa City in-state pairs', direction: 'outbound', context: 'I-80 / I-35 long locals; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Polk ↔ Dallas / Warren collar pairs', direction: 'within', context: 'Metro multi-county logistics; keep county lines clear.' },
    { label: 'Polk → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Nebraska / Minnesota → Des Moines housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  linn: [
    { label: 'Within Linn (Downtown Cedar Rapids ↔ Marion / Hiawatha growth)', direction: 'within', context: 'Regional industrial + residential mix — not Des Moines east.' },
    { label: 'Des Moines → Cedar Rapids in-state pairs', direction: 'inbound', context: 'I-80 / I-380 logistics; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Linn ↔ Johnson (Iowa City) pairs', direction: 'within', context: 'I-380 / US-218 corridor logistics; keep county lines clear.' },
    { label: 'Chicago / Illinois → Cedar Rapids housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Linn → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Manufacturing workforce relo → Cedar Rapids multi-family', direction: 'inbound', context: 'Shift calendars reshape crew timing.' },
  ],
  scott: [
    { label: 'Within Scott (Davenport ↔ Bettendorf / Quad Cities IA edges)', direction: 'within', context: 'Mississippi River / Quad Cities product — not Des Moines east.' },
    { label: 'Illinois Quad Cities → Scott County housing', direction: 'inbound', context: 'Short river hops need FMCSA even when map miles look local.' },
    { label: 'Scott ↔ Muscatine / Clinton regional pairs', direction: 'within', context: 'River corridor logistics; keep county lines clear.' },
    { label: 'Des Moines / Cedar Rapids → Quad Cities in-state pairs', direction: 'inbound', context: 'I-80 long locals; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Scott → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Chicago → Davenport / Quad Cities housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  johnson: [
    { label: 'Within Johnson County, IA (Iowa City / campus ↔ Coralville / North Liberty)', direction: 'within', context: 'University multi-unit vs growth multi-family — Iowa only, not Johnson KS/TN.' },
    { label: 'UI semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Cedar Rapids ↔ Iowa City pairs', direction: 'within', context: 'I-380 / US-218 logistics; keep Linn vs Johnson lines clear.' },
    { label: 'Des Moines → Iowa City in-state pairs', direction: 'inbound', context: 'I-80 long locals; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Johnson County, IA → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Chicago / Midwest → Iowa City academic housing', direction: 'inbound', context: 'Interstate household goods into campus multi-unit and suburban stock.' },
  ],
  'black-hawk': [
    { label: 'Within Black Hawk (Waterloo ↔ Cedar Falls twin markets)', direction: 'within', context: 'Twin-market multi-unit and campus product — not Cedar Rapids or Des Moines clones.' },
    { label: 'UNI / campus peaks → Cedar Falls multi-unit', direction: 'inbound', context: 'Semester waves cluster elevators and curb demand.' },
    { label: 'Cedar Rapids → Waterloo–Cedar Falls in-state pairs', direction: 'inbound', context: 'I-380 logistics; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Black Hawk ↔ Bremer / Butler regional pairs', direction: 'within', context: 'Northeast Iowa logistics; keep county lines clear.' },
    { label: 'Black Hawk → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Minnesota / Wisconsin → Waterloo–Cedar Falls housing', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  woodbury: [
    { label: 'Within Woodbury (Sioux City core ↔ Sergeant Bluff / suburb edges)', direction: 'within', context: 'Western Iowa Missouri River product — not central Iowa Des Moines spillover.' },
    { label: 'Nebraska / South Dakota → Sioux City housing', direction: 'inbound', context: 'Short border hops need FMCSA even when map miles look local.' },
    { label: 'Des Moines → Sioux City in-state long hauls', direction: 'inbound', context: 'I-80 / I-29 logistics; Iowa DOT HHG permit for pure in-state jobs.' },
    { label: 'Woodbury ↔ Plymouth / Cherokee regional pairs', direction: 'within', context: 'Northwest Iowa logistics; keep county lines clear.' },
    { label: 'Woodbury → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → Sioux City regional housing & jobs', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
};


const KS_ROUTES: Record<string, CountyPopularRoute[]> = {
  johnson: [
    { label: 'Within Johnson County, KS (Overland Park ↔ Olathe / Lenexa / Shawnee)', direction: 'within', context: 'JOCO corporate HOA multi-family — Kansas only, not Johnson County IA.' },
    { label: 'Missouri / KCMO → JOCO housing', direction: 'inbound', context: 'Short interstate hops need FMCSA; clarify KCC vs interstate early.' },
    { label: 'Johnson ↔ Wyandotte multi-county pairs', direction: 'within', context: 'KC metro KS-side logistics; keep JOCO vs KCK product differences clear.' },
    { label: 'Wichita / Topeka → JOCO in-state pairs', direction: 'inbound', context: 'I-35 / I-70 long locals; KCC HHG authority for pure in-state jobs.' },
    { label: 'Johnson County, KS → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Corporate HQ relo → Overland Park multi-family', direction: 'inbound', context: 'Hard report dates and HOA windows dominate growth corridors.' },
  ],
  sedgwick: [
    { label: 'Within Sedgwick (Downtown / midtown Wichita ↔ east / west suburbs)', direction: 'within', context: 'Wichita regional product — not Kansas City metro defaults.' },
    { label: 'Aircraft / industrial workforce relo → Wichita multi-unit', direction: 'inbound', context: 'Shift calendars and plant-adjacent freeflow reshape crew timing.' },
    { label: 'KC metro → Wichita in-state long hauls', direction: 'inbound', context: 'I-35 long locals; KCC HHG authority for pure in-state jobs.' },
    { label: 'Oklahoma / Texas → Wichita housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Sedgwick → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Sedgwick → Topeka / Lawrence reverse career pairs', direction: 'outbound', context: 'I-135 / I-70 logistics; KCC for pure in-state jobs.' },
  ],
  shawnee: [
    { label: 'Within Shawnee (Downtown Topeka ↔ west / south suburbs)', direction: 'within', context: 'Capital multi-unit vs suburban HOA product — not JOCO corporate defaults.' },
    { label: 'KC metro → Topeka in-state pairs', direction: 'inbound', context: 'I-70 long locals; KCC HHG authority for pure in-state jobs.' },
    { label: 'Capital / state workforce relo → Topeka multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
    { label: 'Wichita → Topeka in-state pairs', direction: 'inbound', context: 'I-335 / I-70 logistics; KCC for pure in-state jobs.' },
    { label: 'Shawnee → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Missouri → Topeka capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  wyandotte: [
    { label: 'Within Wyandotte (Downtown KCK ↔ west / south growth edges)', direction: 'within', context: 'Kansas City, Kansas urban product — not Kansas City, Missouri and not JOCO HOA defaults.' },
    { label: 'Missouri / KCMO → Wyandotte / KCK housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'Wyandotte ↔ Johnson JOCO pairs', direction: 'within', context: 'Urban KCK vs suburban JOCO products differ — keep county lines clear.' },
    { label: 'Topeka / Lawrence → KCK in-state pairs', direction: 'inbound', context: 'I-70 long locals; KCC HHG authority for pure in-state jobs.' },
    { label: 'Wyandotte → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Midwest → KCK professional corridors', direction: 'inbound', context: 'Interstate household goods into multi-unit and suburban stock.' },
  ],
  douglas: [
    { label: 'Within Douglas County, KS (Downtown / campus Lawrence ↔ west growth)', direction: 'within', context: 'KU multi-unit vs suburban product — Kansas only, not Douglas County NV.' },
    { label: 'KU semester inflows → campus multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'KC metro → Lawrence in-state pairs', direction: 'inbound', context: 'K-10 / I-70 logistics; KCC HHG authority for pure in-state jobs.' },
    { label: 'Topeka ↔ Lawrence pairs', direction: 'within', context: 'US-40 / I-70 logistics; keep county lines clear.' },
    { label: 'Douglas County, KS → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Missouri → Lawrence academic housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  leavenworth: [
    { label: 'Within Leavenworth (Leavenworth / Lansing ↔ base-adjacent edges)', direction: 'within', context: 'North KC metro product with Fort Leavenworth adjacency where accurate.' },
    { label: 'Fort Leavenworth PCS / military relo → multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and storage-in-transit are common estimate inputs.' },
    { label: 'JOCO / KCK → Leavenworth north-metro pairs', direction: 'within', context: 'US-73 / K-7 logistics; keep county lines clear.' },
    { label: 'Missouri → Leavenworth housing', direction: 'inbound', context: 'Short interstate hops need FMCSA.' },
    { label: 'Leavenworth → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Leavenworth → Topeka / Lawrence reverse career pairs', direction: 'outbound', context: 'I-70 logistics; KCC for pure in-state jobs.' },
  ],
};


const MS_ROUTES: Record<string, CountyPopularRoute[]> = {
  hinds: [
    { label: 'Within Hinds (Downtown / Fondren Jackson ↔ south / west metro edges)', direction: 'within', context: 'Jackson the city / capital metro core — not Jackson County Gulf Coast product.' },
    { label: 'Hinds ↔ Rankin / Madison metro pairs', direction: 'within', context: 'I-55 / I-20 multi-county logistics; keep capital-core vs collar products clear.' },
    { label: 'Memphis / Gulf Coast → Jackson in-state pairs', direction: 'inbound', context: 'I-55 / US-49 long locals; MDOT HHG authority for pure in-state jobs.' },
    { label: 'Texas / Louisiana → Jackson capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Hinds → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Capital / professional relo → Jackson multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
  ],
  harrison: [
    { label: 'Within Harrison (Gulfport ↔ Biloxi / coastal multi-unit)', direction: 'within', context: 'Gulf Coast tourism + residential mix — not Jackson metro south.' },
    { label: 'Jackson metro → Gulf Coast in-state pairs', direction: 'inbound', context: 'US-49 long locals; MDOT HHG authority for pure in-state jobs.' },
    { label: 'Harrison ↔ Jackson County coast pairs', direction: 'within', context: 'I-10 coastal logistics; keep Gulfport–Biloxi vs Pascagoula product differences clear.' },
    { label: 'Louisiana / Alabama → Gulf Coast housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Harrison → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tourism / seasonal turns → coastal multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites local hours on US-90 corridors.' },
  ],
  desoto: [
    { label: 'Within DeSoto (Southaven ↔ Olive Branch / Horn Lake growth)', direction: 'within', context: 'Memphis collar product — not central Mississippi Jackson metro.' },
    { label: 'Tennessee / Memphis → DeSoto housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'DeSoto ↔ Tunica / Marshall regional pairs', direction: 'within', context: 'North MS logistics; keep county lines clear.' },
    { label: 'Jackson metro → DeSoto in-state pairs', direction: 'inbound', context: 'I-55 long locals; MDOT HHG authority for pure in-state jobs.' },
    { label: 'DeSoto → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Corporate / logistics relo → Southaven multi-family', direction: 'inbound', context: 'HOA windows and I-55 freeflow dominate collar growth.' },
  ],
  rankin: [
    { label: 'Within Rankin (Pearl / Brandon ↔ Flowood / east-metro growth)', direction: 'within', context: 'East Jackson metro product — must differ from Madison north-metro HOA patterns.' },
    { label: 'Hinds → Rankin east-metro housing', direction: 'inbound', context: 'I-20 collar logistics; keep county lines clear.' },
    { label: 'Rankin ↔ Madison multi-county pairs', direction: 'within', context: 'East vs north metro products differ — clarify addresses on estimates.' },
    { label: 'Gulf Coast → Rankin in-state pairs', direction: 'inbound', context: 'US-49 / I-55 logistics; MDOT HHG authority for pure in-state jobs.' },
    { label: 'Rankin → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / school relo → Brandon multi-family', direction: 'inbound', context: 'School peaks pack east-metro fleets first.' },
  ],
  madison: [
    { label: 'Within Madison County, MS (Madison / Ridgeland ↔ north growth edges)', direction: 'within', context: 'North Jackson metro product — Mississippi only, not Madison County AL.' },
    { label: 'Hinds → Madison north-metro housing', direction: 'inbound', context: 'I-55 collar logistics; keep county lines clear.' },
    { label: 'Madison ↔ Rankin multi-county pairs', direction: 'within', context: 'North vs east metro products differ — clarify addresses on estimates.' },
    { label: 'Memphis → Madison County, MS in-state pairs', direction: 'inbound', context: 'I-55 long locals; MDOT HHG authority for pure in-state jobs.' },
    { label: 'Madison County, MS → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Professional / HOA relo → Ridgeland multi-family', direction: 'inbound', context: 'HOA COI packets and I-55 freeflow dominate north-metro growth.' },
  ],
  jackson: [
    { label: 'Within Jackson County, MS (Pascagoula ↔ Ocean Springs / coastal edges)', direction: 'within', context: 'Gulf Coast industrial + residential — NOT Jackson the city (Hinds) and NOT Jackson County MO.' },
    { label: 'Harrison Coast → Jackson County, MS pairs', direction: 'within', context: 'I-10 / US-90 coastal logistics; keep Biloxi vs Pascagoula product differences clear.' },
    { label: 'Jackson metro (Hinds) → Jackson County coast in-state pairs', direction: 'inbound', context: 'US-49 / I-59 logistics; MDOT HHG authority for pure in-state jobs.' },
    { label: 'Alabama / Louisiana → Pascagoula–Ocean Springs housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Jackson County, MS → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Industrial / shipyard workforce relo → coastal multi-unit', direction: 'inbound', context: 'Shift calendars reshape crew timing near industrial corridors.' },
  ],
};

const NH_ROUTES: Record<string, CountyPopularRoute[]> = {
  hillsborough: [
    { label: 'Within Hillsborough (Manchester multi-unit ↔ Nashua / Bedford suburbs)', direction: 'within', context: 'Manchester–Nashua I-93 density — not Seacoast or Concord capital defaults.' },
    { label: 'Massachusetts → Manchester–Nashua housing', direction: 'inbound', context: 'Short MA border hops need FMCSA even when map miles look local.' },
    { label: 'Hillsborough ↔ Rockingham / Merrimack multi-county pairs', direction: 'within', context: 'Southern NH logistics; keep county product differences clear.' },
    { label: 'Hillsborough → Boston reverse career pairs', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Florida / Sun Belt → southern NH reverse family moves', direction: 'inbound', context: 'Interstate household goods into mill multi-unit and suburban stock.' },
    { label: 'Corporate / professional relo → Nashua multi-family', direction: 'inbound', context: 'HOA windows and Everett Turnpike freeflow dominate growth corridors.' },
  ],
  rockingham: [
    { label: 'Within Rockingham (Portsmouth ↔ Hampton / Exeter / Derry west)', direction: 'within', context: 'Seacoast tourism + residential mix — not Manchester–Nashua I-93 clones.' },
    { label: 'Massachusetts → Seacoast housing', direction: 'inbound', context: 'I-95 short interstate hops need FMCSA.' },
    { label: 'Rockingham ↔ Strafford Spaulding pairs', direction: 'within', context: 'Seacoast vs Dover–Rochester products differ — keep county lines clear.' },
    { label: 'Rockingham → Maine / Massachusetts reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tourism / seasonal turns → coastal multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites local hours on US-1 corridors.' },
    { label: 'Hillsborough → Rockingham in-state pairs', direction: 'inbound', context: 'NH-101 / I-93 logistics; NH household goods carrier authority for pure in-state jobs.' },
  ],
  merrimack: [
    { label: 'Within Merrimack (Downtown Concord ↔ west / south suburbs)', direction: 'within', context: 'Capital multi-unit vs suburban product — not Manchester density defaults.' },
    { label: 'Capital / state workforce relo → Concord multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
    { label: 'Manchester → Concord in-state pairs', direction: 'inbound', context: 'I-93 long locals; NH household goods carrier authority for pure in-state jobs.' },
    { label: 'Merrimack ↔ Hillsborough / Grafton pairs', direction: 'within', context: 'Capital vs southern density vs Upper Valley products differ.' },
    { label: 'Merrimack → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Massachusetts → Concord capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  strafford: [
    { label: 'Within Strafford (Dover multi-unit ↔ Rochester / Somersworth)', direction: 'within', context: 'Dover–Rochester Spaulding product — not Portsmouth seacoast tourism clones alone.' },
    { label: 'UNH semester inflows → Durham multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Strafford ↔ Rockingham seacoast pairs', direction: 'within', context: 'Spaulding / US-4 logistics; keep Dover vs Portsmouth products clear.' },
    { label: 'Maine → Dover–Rochester housing', direction: 'inbound', context: 'Short interstate hops need FMCSA.' },
    { label: 'Strafford → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Hillsborough → Strafford in-state pairs', direction: 'inbound', context: 'NH-16 / I-93 logistics; NH household goods carrier authority for pure in-state jobs.' },
  ],
  grafton: [
    { label: 'Within Grafton (Lebanon multi-unit ↔ Hanover / Upper Valley edges)', direction: 'within', context: 'Upper Valley Dartmouth product — not southern NH I-93 density north.' },
    { label: 'Dartmouth / medical relo → Hanover–Lebanon multi-unit', direction: 'inbound', context: 'Academic calendars and hard report dates reshape crew timing.' },
    { label: 'Vermont → Upper Valley housing', direction: 'inbound', context: 'Short CT River hops need FMCSA even when map miles look local.' },
    { label: 'Grafton ↔ Merrimack capital pairs', direction: 'within', context: 'I-89 logistics; keep Upper Valley vs Concord products clear.' },
    { label: 'Grafton → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Boston / southern NH → Upper Valley in-state long hauls', direction: 'inbound', context: 'I-89 / I-93 logistics; NH household goods carrier authority for pure in-state jobs.' },
  ],
};

const ME_ROUTES: Record<string, CountyPopularRoute[]> = {
  cumberland: [
    { label: 'Within Cumberland (Portland peninsula ↔ South Portland / Westbrook)', direction: 'within', context: 'Portland multi-unit coastal core — not York seacoast south clones or Bangor.' },
    { label: 'Massachusetts / New Hampshire → Portland housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required for cross-state legs.' },
    { label: 'Cumberland ↔ York southern pairs', direction: 'within', context: 'I-95 / US-1 logistics; keep Portland vs Biddeford product differences clear.' },
    { label: 'Cumberland → Bangor / Augusta in-state pairs', direction: 'outbound', context: 'I-95 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Cumberland → Florida / Sun Belt reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Tourism / seasonal turns → Portland multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites local hours on peninsula and US-1 corridors.' },
  ],
  york: [
    { label: 'Within York (Biddeford–Saco ↔ Kennebunk / Sanford inland)', direction: 'within', context: 'Southern seacoast product — not Portland peninsula defaults.' },
    { label: 'New Hampshire → York County housing', direction: 'inbound', context: 'Short NH border hops need FMCSA even when map miles look local.' },
    { label: 'York ↔ Cumberland Portland pairs', direction: 'within', context: 'I-95 / US-1 logistics; keep Biddeford vs Portland product differences clear.' },
    { label: 'Tourism / OOB seasonal turns → coastal multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites local hours on US-1 corridors.' },
    { label: 'York → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Massachusetts → southern Maine seacoast housing', direction: 'inbound', context: 'I-95 interstate household goods into coastal and Sanford stock.' },
  ],
  penobscot: [
    { label: 'Within Penobscot (Downtown Bangor ↔ Brewer / Orono campus edges)', direction: 'within', context: 'Bangor regional hub — not Portland density north.' },
    { label: 'UMaine semester inflows → Orono multi-unit', direction: 'inbound', context: 'August and January peaks cluster elevators and curb demand.' },
    { label: 'Portland → Bangor in-state long hauls', direction: 'inbound', context: 'I-95 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Penobscot ↔ Kennebec capital pairs', direction: 'within', context: 'I-95 central Maine logistics; keep Bangor vs Augusta products clear.' },
    { label: 'Penobscot → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Healthcare / regional workforce relo → Bangor multi-unit', direction: 'inbound', context: 'Hard report dates and winter access reshape crew timing.' },
  ],
  kennebec: [
    { label: 'Within Kennebec (Augusta capital ↔ Hallowell / Waterville north)', direction: 'within', context: 'Capital multi-unit vs river-town product — not Portland north clones.' },
    { label: 'Capital / state workforce relo → Augusta multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
    { label: 'Portland → Augusta in-state pairs', direction: 'inbound', context: 'I-95 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Kennebec ↔ Penobscot / Androscoggin pairs', direction: 'within', context: 'Central Maine logistics; keep capital vs Bangor vs L-A products clear.' },
    { label: 'Kennebec → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'New Hampshire → Augusta capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  androscoggin: [
    { label: 'Within Androscoggin (Lewiston multi-unit ↔ Auburn / Lisbon edges)', direction: 'within', context: 'Lewiston–Auburn mill-city densification — not Portland west clones.' },
    { label: 'Mill / healthcare workforce relo → L-A multi-unit', direction: 'inbound', context: 'Older mill stairs and river-crossing freeflow dominate estimate risk.' },
    { label: 'Portland → Lewiston–Auburn in-state pairs', direction: 'inbound', context: 'I-95 / ME-4 logistics; written estimates and insurance for pure in-state jobs.' },
    { label: 'Androscoggin ↔ Cumberland / Kennebec pairs', direction: 'within', context: 'Mid-coast inland twin cities vs Portland vs capital products differ.' },
    { label: 'Androscoggin → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Massachusetts / New Hampshire → L-A housing', direction: 'inbound', context: 'Interstate household goods into mill multi-unit and suburban stock.' },
  ],
};

const WV_ROUTES: Record<string, CountyPopularRoute[]> = {
  kanawha: [
    { label: 'Within Kanawha (Downtown Charleston ↔ South Hills / Kanawha City)', direction: 'within', context: 'Capital multi-unit vs hillside stock — not Huntington or Eastern Panhandle defaults.' },
    { label: 'Capital / state workforce relo → Charleston multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
    { label: 'Huntington / Morgantown → Charleston in-state pairs', direction: 'inbound', context: 'I-64 / I-79 long locals; WV PSC HHG certificate for pure in-state jobs.' },
    { label: 'Kanawha ↔ Berkeley Eastern Panhandle pairs', direction: 'within', context: 'Capital vs Panhandle products differ sharply — keep county lines clear.' },
    { label: 'Kanawha → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Ohio / Virginia → Charleston capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  berkeley: [
    { label: 'Within Berkeley (Martinsburg core ↔ Inwood / Hedgesville growth)', direction: 'within', context: 'Eastern Panhandle growth product — not Charleston capital east clones.' },
    { label: 'DC–Baltimore / Maryland → Martinsburg housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'Berkeley ↔ Jefferson / Morgan panhandle pairs', direction: 'within', context: 'I-81 / WV-9 logistics; keep county lines clear.' },
    { label: 'Virginia / Pennsylvania → Eastern Panhandle housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Berkeley → Charleston reverse capital pairs', direction: 'outbound', context: 'In-state long haul; WV PSC HHG certificate for pure in-state jobs.' },
    { label: 'Military / logistics relo → Inwood multi-family', direction: 'inbound', context: 'HOA windows and I-81 freeflow dominate panhandle growth.' },
  ],
  monongalia: [
    { label: 'Within Monongalia (Downtown / campus Morgantown ↔ Cheat Lake / Sabraton)', direction: 'within', context: 'WVU multi-unit vs hillside product — not Charleston density north.' },
    { label: 'WVU semester inflows → campus multi-unit', direction: 'inbound', context: 'August and May peaks cluster elevators, curb, and game-day freeflow.' },
    { label: 'Pennsylvania → Morgantown housing', direction: 'inbound', context: 'I-79 / I-68 interstate hops need FMCSA.' },
    { label: 'Monongalia ↔ Kanawha capital pairs', direction: 'within', context: 'I-79 long locals; WV PSC HHG certificate for pure in-state jobs.' },
    { label: 'Monongalia → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Healthcare / research relo → Morgantown multi-unit', direction: 'inbound', context: 'Hard report dates and hillside access reshape crew timing.' },
  ],
  cabell: [
    { label: 'Within Cabell (Downtown Huntington ↔ Barboursville / Marshall edges)', direction: 'within', context: 'Tri-State river city product — not Charleston west or Parkersburg north clones.' },
    { label: 'Marshall semester inflows → campus multi-unit', direction: 'inbound', context: 'August and May peaks cluster curb and older multi-unit demand.' },
    { label: 'Ohio / Kentucky → Huntington housing', direction: 'inbound', context: 'Short Tri-State hops need FMCSA even when map miles look local.' },
    { label: 'Cabell ↔ Kanawha capital pairs', direction: 'within', context: 'I-64 long locals; WV PSC HHG certificate for pure in-state jobs.' },
    { label: 'Cabell → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Cabell ↔ Wood mid-Ohio Valley pairs', direction: 'within', context: 'River-city products differ — keep Huntington vs Parkersburg clear.' },
  ],
  wood: [
    { label: 'Within Wood (Downtown Parkersburg ↔ Vienna / Mineral Wells)', direction: 'within', context: 'Ohio River mid-Ohio Valley product — not Huntington north clones.' },
    { label: 'Industrial / healthcare workforce relo → Parkersburg multi-unit', direction: 'inbound', context: 'Plant calendars and river-edge freeflow reshape crew timing.' },
    { label: 'Ohio → Parkersburg housing', direction: 'inbound', context: 'Short river hops need FMCSA even when map miles look local.' },
    { label: 'Wood ↔ Kanawha capital pairs', direction: 'within', context: 'I-77 long locals; WV PSC HHG certificate for pure in-state jobs.' },
    { label: 'Wood → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Wood ↔ Cabell river-city pairs', direction: 'within', context: 'Parkersburg vs Huntington products differ — clarify addresses on estimates.' },
  ],
};

const RI_ROUTES: Record<string, CountyPopularRoute[]> = {
  providence: [
    { label: 'Within Providence County (Downtown / East Side ↔ Cranston / North Providence)', direction: 'within', context: 'Capital triple-decker density — not Warwick suburban or Newport peninsula defaults.' },
    { label: 'Massachusetts → Providence capital housing', direction: 'inbound', context: 'Short interstate hops need FMCSA even when map miles look local.' },
    { label: 'Providence ↔ Kent / Bristol multi-county pairs', direction: 'within', context: 'Dense small-state logistics; keep capital vs Warwick vs East Bay products clear.' },
    { label: 'Providence → Boston reverse career pairs', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Florida / Sun Belt → Providence reverse family moves', direction: 'inbound', context: 'Interstate household goods into triple-deckers and multi-unit stock.' },
    { label: 'University / hospital relo → East Side multi-unit', direction: 'inbound', context: 'Elevator COIs, scarce curb, and I-95 freeflow dominate capital cores.' },
  ],
  kent: [
    { label: 'Within Kent (Warwick multi-unit ↔ West Warwick / Coventry / East Greenwich)', direction: 'within', context: 'Airport-adjacent suburban product — not Providence capital density clones.' },
    { label: 'Providence → Warwick / Kent housing', direction: 'inbound', context: 'I-95 / RI-4 collar logistics; RI DPUC HHG certificate for pure in-state jobs.' },
    { label: 'Kent ↔ Washington South County pairs', direction: 'within', context: 'Suburban vs coastal tourism products differ — keep county lines clear.' },
    { label: 'Massachusetts → Warwick multi-family', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Kent → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Airport / logistics workforce relo → Warwick multi-unit', direction: 'inbound', context: 'T.F. Green freeflow and HOA windows reshape suburban estimates.' },
  ],
  washington: [
    { label: 'Within Washington County, RI (Narragansett ↔ South Kingstown / URI / Westerly edges)', direction: 'within', context: 'South County coastal product — Rhode Island only, not Washington State and not Washington County AR/UT.' },
    { label: 'URI semester / tourism inflows → South County multi-unit', direction: 'inbound', context: 'Summer tourism and August peaks cluster coastal curb demand.' },
    { label: 'Providence → South County in-state pairs', direction: 'inbound', context: 'US-1 / RI-4 logistics; RI DPUC HHG certificate for pure in-state jobs.' },
    { label: 'Connecticut → Westerly / South County housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Washington County, RI → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Washington County, RI ↔ Newport peninsula pairs', direction: 'within', context: 'South County vs Aquidneck products differ — keep RI county lines clear.' },
  ],
  newport: [
    { label: 'Within Newport (Historic Hill / downtown ↔ Middletown / Portsmouth)', direction: 'within', context: 'Aquidneck peninsula historic access — not Providence coastal clones.' },
    { label: 'Tourism / seasonal turns → peninsula multi-unit', direction: 'inbound', context: 'Peak summer freeflow rewrites curb and bridge access windows.' },
    { label: 'Providence → Newport in-state pairs', direction: 'inbound', context: 'RI-138 logistics; RI DPUC HHG certificate for pure in-state jobs.' },
    { label: 'Massachusetts → Newport housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Newport → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Newport ↔ Washington County, RI South County pairs', direction: 'within', context: 'Peninsula vs South County coastal products differ.' },
  ],
  bristol: [
    { label: 'Within Bristol County, RI (Bristol waterfront ↔ Barrington / Warren)', direction: 'within', context: 'East Bay product — not Providence east clones and not Bristol County MA.' },
    { label: 'Providence → East Bay housing', direction: 'inbound', context: 'RI-114 logistics; RI DPUC HHG certificate for pure in-state jobs.' },
    { label: 'Bristol ↔ Providence multi-county pairs', direction: 'within', context: 'East Bay vs capital density products differ — keep county lines clear.' },
    { label: 'Massachusetts → Barrington / East Bay housing', direction: 'inbound', context: 'Short interstate hops need FMCSA.' },
    { label: 'Bristol County, RI → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / waterfront relo → Barrington multi-family', direction: 'inbound', context: 'Driveway geometry and East Bay freeflow dominate estimate risk.' },
  ],
};

const AK_ROUTES: Record<string, CountyPopularRoute[]> = {
  anchorage: [
    { label: 'Within Anchorage (Downtown multi-unit ↔ Hillside / Midtown / Eagle River)', direction: 'within', context: 'Municipal core product — not Fairbanks Interior or Juneau ferry defaults.' },
    { label: 'Mat-Su / Wasilla → Anchorage daily pairs', direction: 'within', context: 'Glenn / Parks corridor logistics; long empty miles at peak.' },
    { label: 'Fairbanks → Anchorage in-state long hauls', direction: 'inbound', context: 'Parks Highway multi-day locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Lower 48 / Outside → Anchorage housing', direction: 'inbound', context: 'Barge/air components common; FMCSA for interstate legs.' },
    { label: 'Military PCS → JBER-adjacent multi-unit and SFH', direction: 'inbound', context: 'Hard report dates and base access reshape crew timing.' },
    { label: 'Anchorage → Outside reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  'fairbanks-north-star': [
    { label: 'Within Fairbanks North Star (Downtown ↔ UAF / North Pole)', direction: 'within', context: 'Interior product with extreme cold logistics — not Anchorage Southcentral defaults.' },
    { label: 'Anchorage → Fairbanks in-state long hauls', direction: 'inbound', context: 'Parks Highway multi-day locals; freeze-up windows matter.' },
    { label: 'Military / university relo → Fairbanks multi-unit', direction: 'inbound', context: 'PCS and semester peaks cluster curb demand.' },
    { label: 'Lower 48 / Outside → Fairbanks Interior housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required; winter staging critical.' },
    { label: 'Fairbanks → Anchorage reverse career pairs', direction: 'outbound', context: 'In-state long haul on Parks Highway.' },
    { label: 'Fairbanks → Outside reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  'matanuska-susitna': [
    { label: 'Within Mat-Su (Wasilla ↔ Palmer / Big Lake growth)', direction: 'within', context: 'Valley growth product toward Anchorage — not Anchorage city multi-unit defaults.' },
    { label: 'Anchorage ↔ Mat-Su daily pairs', direction: 'within', context: 'Glenn / Parks freeflow; portal time dominates at peak.' },
    { label: 'Lower 48 → Mat-Su growth housing', direction: 'inbound', context: 'Interstate household goods into Wasilla/Palmer stock; FMCSA required.' },
    { label: 'Mat-Su → Fairbanks in-state pairs', direction: 'outbound', context: 'Parks Highway long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Mat-Su → Outside reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Family / growth relo → Wasilla multi-family', direction: 'inbound', context: 'Long driveway and rural-edge access surveys dominate estimate risk.' },
  ],
  juneau: [
    { label: 'Within Juneau (Downtown capital ↔ Mendenhall Valley / Douglas)', direction: 'within', context: 'Capital constrained road network — not Anchorage highway defaults; ferry/air logistics matter.' },
    { label: 'Capital / state workforce relo → Juneau multi-unit', direction: 'inbound', context: 'Mid-month report dates and ferry schedules often matter more than Saturday peaks.' },
    { label: 'Anchorage / Southcentral → Juneau capital pairs', direction: 'inbound', context: 'Air or ferry components dominate; not a pure highway local.' },
    { label: 'Lower 48 / Outside → Juneau housing', direction: 'inbound', context: 'Interstate household goods via barge/air; FMCSA required.' },
    { label: 'Juneau → Outside reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Southeast Alaska ferry-linked community pairs', direction: 'within', context: 'Ferry schedules rewrite staging more than road miles alone.' },
  ],
};

const HI_ROUTES: Record<string, CountyPopularRoute[]> = {
  honolulu: [
    { label: 'Within Honolulu County / Oʻahu (Downtown ↔ Pearl City / Kapolei / Windward)', direction: 'within', context: 'Oʻahu density and condo elevators — not Big Island Hilo–Kona product.' },
    { label: 'Inter-island → Oʻahu housing', direction: 'inbound', context: 'Barge/air components; Hawaii PUC HHG CPCN for pure inter-island jobs.' },
    { label: 'Mainland → Honolulu housing', direction: 'inbound', context: 'Container logistics; FMCSA required for mainland legs.' },
    { label: 'Military PCS → Pearl Harbor / Hickam-adjacent multi-unit', direction: 'inbound', context: 'Base access and hard report dates reshape crew timing.' },
    { label: 'Honolulu → Neighbor Island reverse exits', direction: 'outbound', context: 'Inter-island barge/air; Hawaii PUC for pure in-state jobs.' },
    { label: 'Honolulu → Mainland reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  hawaii: [
    { label: 'Within Hawaii County / Big Island (Hilo ↔ Kona / Waimea)', direction: 'within', context: 'Big Island split markets — NOT Honolulu/Oʻahu and not the whole state of Hawaii as one product.' },
    { label: 'Oʻahu → Big Island inter-island pairs', direction: 'inbound', context: 'Barge/air components; Hawaii PUC HHG CPCN for pure inter-island jobs.' },
    { label: 'Mainland → Hilo / Kona housing', direction: 'inbound', context: 'Container logistics; FMCSA required for mainland legs.' },
    { label: 'Hilo ↔ Kona cross-island pairs', direction: 'within', context: 'Belt Road long empty miles; rural and lava-zone approaches where accurate.' },
    { label: 'Hawaii County → Neighbor Island reverse exits', direction: 'outbound', context: 'Inter-island barge/air; Hawaii PUC for pure in-state jobs.' },
    { label: 'Hawaii County → Mainland reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  maui: [
    { label: 'Within Maui (Kahului–Wailuku ↔ Kihei / West Maui / Upcountry)', direction: 'within', context: 'Resort + residential mix — not Oʻahu elevator defaults alone.' },
    { label: 'Oʻahu → Maui inter-island pairs', direction: 'inbound', context: 'Barge/air components; Hawaii PUC HHG CPCN for pure inter-island jobs.' },
    { label: 'Mainland → Maui housing', direction: 'inbound', context: 'Container logistics; FMCSA required for mainland legs.' },
    { label: 'Tourism / seasonal turns → resort multi-unit', direction: 'inbound', context: 'Peak freeflow rewrites local hours on coastal corridors.' },
    { label: 'Maui → Neighbor Island reverse exits', direction: 'outbound', context: 'Inter-island barge/air; Hawaii PUC for pure in-state jobs.' },
    { label: 'Maui → Mainland reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
  kauai: [
    { label: 'Within Kauaʻi (Līhuʻe ↔ East Side / North Shore / South Shore)', direction: 'within', context: 'Island constraints and tourism logistics — not Oʻahu density clones.' },
    { label: 'Oʻahu → Kauaʻi inter-island pairs', direction: 'inbound', context: 'Barge/air components; Hawaii PUC HHG CPCN for pure inter-island jobs.' },
    { label: 'Mainland → Kauaʻi housing', direction: 'inbound', context: 'Container logistics; FMCSA required for mainland legs.' },
    { label: 'Tourism / seasonal turns → North Shore and South Shore multi-unit', direction: 'inbound', context: 'Limited staging and peak freeflow dominate estimate risk.' },
    { label: 'Kauaʻi → Neighbor Island reverse exits', direction: 'outbound', context: 'Inter-island barge/air; Hawaii PUC for pure in-state jobs.' },
    { label: 'Kauaʻi → Mainland reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
  ],
};

const MT_ROUTES: Record<string, CountyPopularRoute[]> = {
  yellowstone: [
    { label: 'Within Yellowstone County (Downtown Billings ↔ Heights / West End / Laurel)', direction: 'within', context: 'Billings regional hub — not Yellowstone National Park as the primary market label.' },
    { label: 'Bozeman / Missoula → Billings in-state pairs', direction: 'inbound', context: 'I-90 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Wyoming / North Dakota → Billings housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Energy / healthcare workforce relo → Billings multi-unit', direction: 'inbound', context: 'Hard report dates reshape crew timing.' },
    { label: 'Yellowstone County → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Yellowstone County ↔ Gallatin Bozeman pairs', direction: 'within', context: 'Billings hub vs Bozeman growth products differ — keep county lines clear.' },
  ],
  missoula: [
    { label: 'Within Missoula (Downtown / UM ↔ South Hills / Orchard Homes)', direction: 'within', context: 'Western MT university hub — not Billings east defaults.' },
    { label: 'UM semester inflows → campus multi-unit', direction: 'inbound', context: 'August and May peaks cluster elevators and curb demand.' },
    { label: 'Billings / Bozeman → Missoula in-state pairs', direction: 'inbound', context: 'I-90 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Idaho / Washington → Missoula housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Missoula → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Missoula ↔ Flathead / western valley pairs', direction: 'within', context: 'Mountain weather and long empty miles reshape local hours.' },
  ],
  gallatin: [
    { label: 'Within Gallatin (Downtown Bozeman ↔ Belgrade / Four Corners / Big Sky edges)', direction: 'within', context: 'Bozeman growth / tech + outdoor economy — not Billings west clones.' },
    { label: 'MSU semester inflows → campus multi-unit', direction: 'inbound', context: 'August and May peaks cluster multi-unit curb demand.' },
    { label: 'Billings → Bozeman in-state pairs', direction: 'inbound', context: 'I-90 long locals; written estimates and insurance for pure in-state jobs.' },
    { label: 'Colorado / California → Bozeman growth housing', direction: 'inbound', context: 'Interstate household goods into valley multi-family; FMCSA required.' },
    { label: 'Gallatin → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Gallatin ↔ Yellowstone County Billings pairs', direction: 'within', context: 'Bozeman growth vs Billings hub products differ — keep county lines clear.' },
  ],
  cascade: [
    { label: 'Within Cascade (Downtown Great Falls ↔ northwest / southwest neighborhoods)', direction: 'within', context: 'Great Falls regional / Missouri River product — not Billings or Bozeman defaults.' },
    { label: 'Military / regional workforce relo → Great Falls multi-unit', direction: 'inbound', context: 'Hard report dates and Malmstrom-adjacent access reshape crew timing where accurate.' },
    { label: 'Billings / Helena → Great Falls in-state pairs', direction: 'inbound', context: 'I-15 / US-87 logistics; written estimates and insurance for pure in-state jobs.' },
    { label: 'Canada-border / Hi-Line regional pairs', direction: 'inbound', context: 'Long empty miles; clarify authority for any out-of-state leg.' },
    { label: 'Cascade → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Cascade ↔ Lewis and Clark capital pairs', direction: 'within', context: 'Great Falls vs Helena products differ — keep county lines clear.' },
  ],
  'lewis-and-clark': [
    { label: 'Within Lewis and Clark (Downtown Helena ↔ East Helena / valley edges)', direction: 'within', context: 'Helena capital product — not Billings hub or Bozeman growth defaults.' },
    { label: 'Capital / state workforce relo → Helena multi-unit', direction: 'inbound', context: 'Mid-month report dates often matter more than Saturday peaks.' },
    { label: 'Billings / Missoula / Great Falls → Helena in-state pairs', direction: 'inbound', context: 'I-15 / US-12 logistics; written estimates and insurance for pure in-state jobs.' },
    { label: 'Lewis and Clark → out-of-state reverse exits', direction: 'outbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Idaho / Wyoming → Helena capital housing', direction: 'inbound', context: 'Interstate household goods; FMCSA required.' },
    { label: 'Lewis and Clark ↔ Cascade Great Falls pairs', direction: 'within', context: 'Capital vs regional river-city products differ.' },
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
  delaware: [
    { label: 'Within Delaware (Powell ↔ Lewis Center / Delaware city)', direction: 'within', context: 'North-collar HOA growth vs seat stock — US-23 peaks rewrite short pairs.' },
    { label: 'Franklin / Columbus core → Delaware north growth', direction: 'inbound', context: 'Parent metro outbound into Powell product — not a Franklin rename.', href: '/local-movers/ohio/franklin' },
    { label: 'Delaware → Franklin / downtown job markets', direction: 'outbound', context: 'North-collar professionals into denser core stock.', href: '/local-movers/ohio/franklin' },
    { label: 'Delaware ↔ Licking / Fairfield collar pairs', direction: 'within', context: 'North growth vs east and SE collars — distinct freeflow.', href: '/local-movers/ohio/licking' },
    { label: 'Midwest → Delaware County schools & space', direction: 'inbound', context: 'Family Sun Belt and Midwest inflows into north-collar SFH.' },
  ],
  clermont: [
    { label: 'Within Clermont (Eastgate ↔ Milford / Batavia)', direction: 'within', context: 'East-collar multi-family and SFH — not Warren I-71 or Butler I-75 product.' },
    { label: 'Hamilton / Cincinnati core → Clermont east collar', direction: 'inbound', context: 'Parent metro outbound into Eastgate product — not a Hamilton rename.', href: '/local-movers/ohio/hamilton' },
    { label: 'Clermont → Hamilton / downtown job markets', direction: 'outbound', context: 'East-collar professionals into denser river-city stock.', href: '/local-movers/ohio/hamilton' },
    { label: 'Clermont ↔ Warren / Butler Cincinnati collar pairs', direction: 'within', context: 'East vs north vs NW collars — distinct spines.', href: '/local-movers/ohio/warren' },
    { label: 'Kentucky / Midwest → Clermont east-collar housing', direction: 'inbound', context: 'Regional arrivals; FMCSA when crossing state lines.' },
  ],
  medina: [
    { label: 'Within Medina (Brunswick ↔ Medina city)', direction: 'within', context: 'South-inland HOA growth — not lakeshore Lake or Lorain product.' },
    { label: 'Cuyahoga / Cleveland core → Medina south collar', direction: 'inbound', context: 'Parent metro outbound into Brunswick product — not a Cuyahoga rename.', href: '/local-movers/ohio/cuyahoga' },
    { label: 'Medina → Cuyahoga / downtown job markets', direction: 'outbound', context: 'South-collar professionals into denser city stock.', href: '/local-movers/ohio/cuyahoga' },
    { label: 'Medina ↔ Lake / Lorain Cleveland collar pairs', direction: 'within', context: 'South inland vs east/west lakeshore — distinct freeflow.', href: '/local-movers/ohio/lake' },
    { label: 'Midwest → Medina County suburban housing', direction: 'inbound', context: 'Family inflows into I-71 south growth corridors.' },
  ],
  portage: [
    { label: 'Within Portage (Kent ↔ Ravenna / Streetsboro)', direction: 'within', context: 'University multi-family vs seat and growth stock — term calendars spike demand.' },
    { label: 'Summit / Akron → Portage east collar', direction: 'inbound', context: 'Parent metro outbound into Kent product — not a Summit rename.', href: '/local-movers/ohio/summit' },
    { label: 'Kent State term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Portage → Summit / Cleveland job markets', direction: 'outbound', context: 'East-of-Akron professionals into denser regional stock.', href: '/local-movers/ohio/summit' },
    { label: 'Pittsburgh / Midwest → Portage County', direction: 'inbound', context: 'Interstate household goods into university and suburban product.' },
  ],
  greene: [
    { label: 'Within Greene (Beavercreek ↔ Fairborn / Xenia)', direction: 'within', context: 'Wright-Patt edge multi-family and HOA growth — not Dayton core alone.' },
    { label: 'Montgomery / Dayton core → Greene east-metro', direction: 'inbound', context: 'Parent metro outbound into Beavercreek product — not a Montgomery rename.', href: '/local-movers/ohio/montgomery' },
    { label: 'Wright-Patterson PCS / contractor moves', direction: 'inbound', context: 'Order and contract calendars create multi-family clusters.' },
    { label: 'Greene → Montgomery / Dayton job markets', direction: 'outbound', context: 'East-metro professionals into denser Dayton stock.', href: '/local-movers/ohio/montgomery' },
    { label: 'Midwest → Greene County / Wright-Patt housing', direction: 'inbound', context: 'Defense-adjacent and family inflows into east-metro SFH.' },
  ],
  fairfield: [
    { label: 'Within Fairfield (Lancaster ↔ Pickerington edge)', direction: 'within', context: 'US-33 southeast seat city vs metro-edge HOA — not Delaware north growth.' },
    { label: 'Franklin / Columbus core → Fairfield southeast collar', direction: 'inbound', context: 'Parent metro outbound into Lancaster/Pickerington product — not a Franklin rename.', href: '/local-movers/ohio/franklin' },
    { label: 'Fairfield → Franklin / downtown job markets', direction: 'outbound', context: 'Southeast-collar professionals into denser core stock.', href: '/local-movers/ohio/franklin' },
    { label: 'Fairfield ↔ Delaware / Licking Columbus collar pairs', direction: 'within', context: 'SE vs north vs east collars — distinct freeflow.', href: '/local-movers/ohio/delaware' },
    { label: 'Midwest → Fairfield County space & schools', direction: 'inbound', context: 'Family inflows into US-33 corridor housing.' },
  ],
  licking: [
    { label: 'Within Licking (Pataskala ↔ Newark / Heath)', direction: 'within', context: 'East-metro HOA growth vs Newark multi-story — not Delaware north product.' },
    { label: 'Franklin / Columbus core → Licking east-metro', direction: 'inbound', context: 'Parent metro outbound into Pataskala product — not a Franklin rename.', href: '/local-movers/ohio/franklin' },
    { label: 'Licking → Franklin / downtown job markets', direction: 'outbound', context: 'East-collar professionals into denser core stock.', href: '/local-movers/ohio/franklin' },
    { label: 'Licking ↔ Delaware / Fairfield Columbus collar pairs', direction: 'within', context: 'East vs north vs SE collars — distinct freeflow.', href: '/local-movers/ohio/delaware' },
    { label: 'Midwest → Licking County east-metro growth', direction: 'inbound', context: 'Family inflows into SR-161 corridor housing.' },
  ],
  wood: [
    { label: 'Within Wood (Bowling Green ↔ Perrysburg)', direction: 'within', context: 'University multi-family vs south-collar HOA — not Toledo core alone.' },
    { label: 'Lucas / Toledo core → Wood south collar', direction: 'inbound', context: 'Parent metro outbound into Perrysburg/BG product — not a Lucas rename.', href: '/local-movers/ohio/lucas' },
    { label: 'Bowling Green term-start / term-end moves', direction: 'within', context: 'Student multi-family clusters; book curb windows early.' },
    { label: 'Wood → Lucas / Toledo job markets', direction: 'outbound', context: 'South-collar professionals into denser Toledo stock.', href: '/local-movers/ohio/lucas' },
    { label: 'Michigan / Midwest → Wood County housing', direction: 'inbound', context: 'Border and regional arrivals; FMCSA when crossing state lines.' },
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
    { label: 'Within Berks (Reading city ↔ Wyomissing / Exeter)', direction: 'within', context: 'City multi-story vs western HOA and eastern corridors — access changes by zone.' },
    { label: 'Lehigh Valley → Reading mid-state independent', direction: 'inbound', context: 'Parent-biased I-78 / US-222 hops into Reading product — not an Allentown rename.', href: '/local-movers/pennsylvania/lehigh' },
    { label: 'Berks → Lehigh Valley / Allentown job markets', direction: 'outbound', context: 'Mid-state professionals into Valley multi-family stock.', href: '/local-movers/pennsylvania/lehigh' },
    { label: 'Lancaster / York → Berks mid-state pairs', direction: 'inbound', context: 'South-central logistics into Reading regional housing.', href: '/local-movers/pennsylvania/lancaster' },
    { label: 'Berks → Florida / Sun Belt exits', direction: 'outbound', context: 'Family long-distance; volume estimates drive linehaul more than local hourly rates.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Reading multi-story & hill last-mile', direction: 'within', context: 'Stairs and curb limits — not a pure western-township driveway plan.' },
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
    { label: 'Within Westmoreland (Greensburg ↔ Hempfield / Murrysville)', direction: 'within', context: 'East-metro towns vs HOA growth — not Downtown elevator defaults.' },
    { label: 'Allegheny / Pittsburgh → Westmoreland east collar', direction: 'inbound', context: 'Parent-market hops along US-30 / Turnpike into Greensburg-area product.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Westmoreland → Pittsburgh / Allegheny job markets', direction: 'outbound', context: 'East-collar professionals into city hills and South Hills stairs.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Midwest → Westmoreland / Pittsburgh-east housing', direction: 'inbound', context: 'Interstate household goods into town multi-unit and suburban stock.' },
    { label: 'Westmoreland → Florida retirement corridors', direction: 'outbound', context: 'Western PA snowbird path; FMCSA carriers and volume estimates.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Latrobe / eastern town multi-story moves', direction: 'within', context: 'Small-city stairs and curb limits — not a pure Hempfield driveway plan.' },
  ],
  // ——— PA Tier 2 Wave 1 (parent-biased routes) ———
  cumberland: [
    { label: 'Within Cumberland (Carlisle ↔ Mechanicsburg / Camp Hill)', direction: 'within', context: 'West-shore seat multi-story vs planned HOA growth — access changes by pocket.' },
    { label: 'Dauphin / Harrisburg → Cumberland west shore', direction: 'inbound', context: 'Parent capital hops west across the river into Mechanicsburg product.', href: '/local-movers/pennsylvania/dauphin' },
    { label: 'Cumberland → Harrisburg / Dauphin job markets', direction: 'outbound', context: 'West-shore professionals into capital multi-story and east-bank stock.', href: '/local-movers/pennsylvania/dauphin' },
    { label: 'MD / Mid-Atlantic → Cumberland I-81 corridor', direction: 'inbound', context: 'Interstate inflows; confirm FMCSA when either address is out of Pennsylvania.' },
    { label: 'Cumberland → Florida retirement corridors', direction: 'outbound', context: 'South-central snowbird path; multi-day interstate with inventory-driven pricing.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Carlisle college / military-adjacent local moves', direction: 'within', context: 'Term calendars and installation windows — not a pure HOA Saturday plan.' },
  ],
  washington: [
    { label: 'Within Washington (City of Washington ↔ Peters / Canonsburg)', direction: 'within', context: 'Seat multi-story vs South Hills-edge HOAs — truck type changes by zone.' },
    { label: 'Allegheny / Pittsburgh → Washington south collar', direction: 'inbound', context: 'Parent-market hops along I-79 / US-19 into south-collar product.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Washington → Pittsburgh / Allegheny job markets', direction: 'outbound', context: 'South-collar professionals into city hills and elevators.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'WV / OH → Washington County logistics stock', direction: 'inbound', context: 'I-70 interstate inflows; FMCSA required when either end is out of PA.' },
    { label: 'Washington → Florida / Sun Belt exits', direction: 'outbound', context: 'South Pittsburgh collar long-distance; volume estimates drive linehaul.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'I-70 / I-79 industrial-edge local moves', direction: 'within', context: 'Warehouse-adjacent arterials and mixed SFH — not a pure South Hills script.' },
  ],
  butler: [
    { label: 'Within Butler (City of Butler ↔ Cranberry / Adams)', direction: 'within', context: 'Seat multi-story vs north-growth HOAs — access profiles differ by zone.' },
    { label: 'Allegheny / Pittsburgh → Butler north growth', direction: 'inbound', context: 'Parent-market hops along I-79 / PA-228 into Cranberry product.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Butler → Pittsburgh / Allegheny job markets', direction: 'outbound', context: 'North-collar professionals into city multi-unit and hills.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Northeast / Midwest → Butler growth suburbs', direction: 'inbound', context: 'Interstate family inflows into planned SFH; FMCSA for cross-state legs.' },
    { label: 'Butler → Florida retirement corridors', direction: 'outbound', context: 'North Pittsburgh collar snowbird path; multi-day interstate.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Cranberry HOA / Turnpike-north local moves', direction: 'within', context: 'Gate lists and approved hours — not a Butler city stair plan.' },
  ],
  beaver: [
    { label: 'Within Beaver (Beaver / Rochester ↔ Center / Hopewell)', direction: 'within', context: 'River-town multi-story vs first-ring suburbs — Ohio River logistics matter.' },
    { label: 'Allegheny / Pittsburgh → Beaver west collar', direction: 'inbound', context: 'Parent-market hops along I-376 / PA-65 into river-west product.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Beaver → Pittsburgh / Allegheny job markets', direction: 'outbound', context: 'West-collar professionals into city hills and elevators.', href: '/local-movers/pennsylvania/allegheny' },
    { label: 'Ohio → Beaver County PA/OH edge pairs', direction: 'inbound', context: 'Short interstate when crossing the state line; confirm FMCSA authority.', href: '/local-movers/ohio' },
    { label: 'Beaver → Florida / Sun Belt exits', direction: 'outbound', context: 'Western PA river-collar long-distance; inventory-driven pricing.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Ohio River multi-story & flood-aware staging', direction: 'within', context: 'Older river stock needs stair inventories and weather-aware curb plans.' },
  ],
  lackawanna: [
    { label: 'Within Lackawanna (Scranton ↔ Dickson City / Clarks Summit)', direction: 'within', context: 'NEPA city multi-story vs first-ring suburbs — not Philly or Pitt defaults.' },
    { label: 'Luzerne / Wilkes-Barre → Scranton NEPA pairs', direction: 'inbound', context: 'Valley pair logistics along I-81; treat as regional days, not short suburb hops.', href: '/local-movers/pennsylvania/luzerne' },
    { label: 'Lackawanna → NYC / North Jersey job markets', direction: 'outbound', context: 'NEPA professional exits to elevators and street permits; destination COIs dominate.' },
    { label: 'New York / New Jersey → Scranton medical & university markets', direction: 'inbound', context: 'I-81 interstate inflows; FMCSA for cross-state household goods.' },
    { label: 'Lackawanna → Florida retirement corridors', direction: 'outbound', context: 'NEPA snowbird path; multi-day interstate with inventory surveys.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Scranton multi-story & university-adjacent moves', direction: 'within', context: 'Stairs and term calendars — not a Clarks Summit driveway plan.' },
  ],
  luzerne: [
    { label: 'Within Luzerne (Wilkes-Barre ↔ Kingston / Hazleton edges)', direction: 'within', context: 'Valley multi-story vs township stock — distinct from Scranton micro-markets.' },
    { label: 'Lackawanna / Scranton → Luzerne valley pairs', direction: 'inbound', context: 'NEPA pair hops along I-81; keep county lines clear on estimates.', href: '/local-movers/pennsylvania/lackawanna' },
    { label: 'Luzerne → Scranton / Lackawanna job markets', direction: 'outbound', context: 'Valley professionals into Scranton medical and multi-story stock.', href: '/local-movers/pennsylvania/lackawanna' },
    { label: 'New York / New Jersey → Wilkes-Barre NEPA markets', direction: 'inbound', context: 'I-81 interstate inflows; FMCSA when either address is out of Pennsylvania.' },
    { label: 'Luzerne → Florida / Sun Belt exits', direction: 'outbound', context: 'NEPA valley snowbird path; volume estimates drive linehaul.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Wilkes-Barre multi-story & Kingston twin moves', direction: 'within', context: 'Valley stairs and tight streets — not a Scranton rename day.' },
  ],
  centre: [
    { label: 'Within Centre (State College ↔ Bellefonte / Philipsburg edges)', direction: 'within', context: 'University multi-family vs seat SFH and rural edges — term calendars dominate.' },
    { label: 'Dauphin / mid-state → Centre Penn State markets', direction: 'inbound', context: 'Independent university hub inflows; not a Harrisburg rename.', href: '/local-movers/pennsylvania/dauphin' },
    { label: 'Centre → Harrisburg / Philly / Pitt career exits', direction: 'outbound', context: 'Graduate and professional long hauls; destination access differs by city.' },
    { label: 'Northeast → State College university & research markets', direction: 'inbound', context: 'I-80 interstate arrivals; FMCSA for cross-state legs.' },
    { label: 'Centre → Florida retirement / dual-home corridors', direction: 'outbound', context: 'Central PA snowbird path; multi-day interstate with packing scope.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Penn State term-start / term-end local moves', direction: 'within', context: 'Student and faculty calendars fill crews first — book elevators early.' },
  ],
  monroe: [
    { label: 'Within Monroe (Stroudsburg ↔ Mount Pocono / East Stroudsburg)', direction: 'within', context: 'Poconos tourism stock vs college-adjacent multi-family — access differs by pocket.' },
    { label: 'Northampton / Lehigh Valley → Monroe Poconos', direction: 'inbound', context: 'Parent Valley hops north into tourism + residential product along PA-33 / I-80.', href: '/local-movers/pennsylvania/northampton' },
    { label: 'Monroe → Lehigh Valley / NYC-collar job markets', direction: 'outbound', context: 'Poconos professionals moving toward denser employment.', href: '/local-movers/pennsylvania/northampton' },
    { label: 'NY / NJ → Poconos second-home & lifestyle inflows', direction: 'inbound', context: 'I-80 / I-84 interstate arrivals; tourism peaks tighten village staging.' },
    { label: 'Monroe → Florida / Sun Belt exits', direction: 'outbound', context: 'Poconos long-distance; FMCSA carriers and volume surveys required.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Poconos tourism-season & lake-edge last-mile', direction: 'within', context: 'Narrow approaches and weekend congestion — photo the driveway.' },
  ],
  franklin: [
    { label: 'Within Franklin (Chambersburg ↔ Waynesboro / Greencastle)', direction: 'within', context: 'South-central seat multi-story vs ag-edge SFH — MD border logistics appear often.' },
    { label: 'Cumberland / Harrisburg → Franklin I-81 south', direction: 'inbound', context: 'Parent west-shore hops south into Chambersburg product.', href: '/local-movers/pennsylvania/cumberland' },
    { label: 'Franklin → Harrisburg / Cumberland job markets', direction: 'outbound', context: 'South-central professionals into capital collar stock.', href: '/local-movers/pennsylvania/cumberland' },
    { label: 'Maryland → Franklin PA/MD border pairs', direction: 'inbound', context: 'Short interstate when crossing the state line; confirm FMCSA authority.' },
    { label: 'Franklin → Florida retirement corridors', direction: 'outbound', context: 'I-81 south snowbird path; multi-day interstate with inventory-driven pricing.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Chambersburg multi-story & ag-edge driveway moves', direction: 'within', context: 'Seat stairs vs rural empty miles — not a pure Cumberland HOA plan.' },
  ],
  schuylkill: [
    { label: 'Within Schuylkill (Pottsville ↔ Tamaqua / Schuylkill Haven)', direction: 'within', context: 'Coal-region multi-story vs valley towns — distinct from Reading and Scranton.' },
    { label: 'Berks / Reading → Schuylkill I-81 interior', direction: 'inbound', context: 'Parent mid-state hops into Pottsville product — not a Reading rename.', href: '/local-movers/pennsylvania/berks' },
    { label: 'Schuylkill → Reading / Berks job markets', direction: 'outbound', context: 'Interior professionals into Reading multi-story and US-222 stock.', href: '/local-movers/pennsylvania/berks' },
    { label: 'Luzerne / NEPA → Schuylkill I-81 pairs', direction: 'inbound', context: 'I-81 corridor logistics; keep Scranton/Wilkes-Barre assumptions off the estimate.', href: '/local-movers/pennsylvania/luzerne' },
    { label: 'Schuylkill → Florida / Sun Belt exits', direction: 'outbound', context: 'Coal-region snowbird path; FMCSA carriers and volume estimates.', href: '/resources/routes/pennsylvania-to-florida' },
    { label: 'Pottsville multi-story & hillside last-mile', direction: 'within', context: 'Stairs and grades — not a suburban Reading cul-de-sac plan.' },
  ],
};
