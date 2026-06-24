# Generates Virginia batch 8 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'colonial-heights'
    city = 'Colonial Heights'
    citySlug = 'colonial-heights'
    countyName = 'Colonial Heights'
    countyMovingId = 'colonial-heights-local-moving-colonial-heights-va'
    countyMovingName = 'Colonial Heights Local Moving'
    regional1 = 'richmond-south'
    regional2 = 'tri-cities'
    regional1Name = 'Richmond South Moving'
    regional2Name = 'Tri-Cities Moving'
    label = 'Colonial Heights Metro'
    poolId = 'colonial-heights-metro-va'
    desc1 = 'Trusted Colonial Heights franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Colonial Heights mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Colonial Heights mover with careful residential relocations and packing services across suburban and retail corridor neighborhoods.'
    desc4 = 'Richmond South specialist for Tri-Cities residential moves across Colonial Heights.'
    desc5 = 'Tri-Cities corridor mover serving Colonial Heights and Petersburg area communities.'
  },
  @{
    slug = 'buchanan'
    city = 'Grundy'
    citySlug = 'grundy'
    countyName = 'Buchanan'
    regional1 = 'coalfields'
    regional2 = 'levisa-river'
    regional1Name = 'Coalfields Moving'
    regional2Name = 'Levisa River Moving'
    label = 'Grundy Metro'
    poolId = 'buchanan-metro-va'
    desc1 = 'Trusted Buchanan County franchise with excellent reputation for residential moves across Southwest Virginia coalfields.'
    desc2 = 'Established Grundy mover known for reliable local and long-distance services throughout Buchanan County.'
    desc3 = 'Local Buchanan County mover with careful residential relocations and packing services across mountain and river valley communities.'
    desc4 = 'Coalfields specialist for hillside and rural residential moves across Buchanan County.'
    desc5 = 'Levisa River corridor mover serving Grundy and Vansant area communities.'
  },
  @{
    slug = 'southampton'
    city = 'Courtland'
    citySlug = 'courtland'
    countyName = 'Southampton'
    regional1 = 'southside-virginia'
    regional2 = 'blackwater-river'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Blackwater River Moving'
    label = 'Courtland Metro'
    poolId = 'southampton-metro-va'
    desc1 = 'Trusted Southampton franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Courtland mover known for reliable local and long-distance services throughout Southampton County.'
    desc3 = 'Local Southampton County mover with careful residential relocations and packing services across rural agricultural properties.'
    desc4 = 'Southside Virginia specialist for rural residential moves across Southampton County.'
    desc5 = 'Blackwater River corridor mover serving Courtland and Franklin area communities.'
  },
  @{
    slug = 'patrick'
    city = 'Stuart'
    citySlug = 'stuart'
    countyName = 'Patrick'
    regional1 = 'blue-ridge-south'
    regional2 = 'mayo-river'
    regional1Name = 'Blue Ridge South Moving'
    regional2Name = 'Mayo River Moving'
    label = 'Stuart Metro'
    poolId = 'patrick-metro-va'
    desc1 = 'Trusted Patrick franchise with excellent reputation for residential moves across Blue Ridge foothill communities.'
    desc2 = 'Established Stuart mover known for reliable local and long-distance services throughout Patrick County.'
    desc3 = 'Local Patrick County mover with careful residential relocations and packing services across mountain and rural neighborhoods.'
    desc4 = 'Blue Ridge South specialist for hillside residential moves across Patrick County.'
    desc5 = 'Mayo River corridor mover serving Stuart and Meadows of Dan area communities.'
  },
  @{
    slug = 'appomattox'
    city = 'Appomattox'
    citySlug = 'appomattox'
    countyName = 'Appomattox'
    regional1 = 'central-virginia'
    regional2 = 'appomattox-river'
    regional1Name = 'Central Virginia Moving'
    regional2Name = 'Appomattox River Moving'
    label = 'Appomattox Metro'
    poolId = 'appomattox-metro-va'
    desc1 = 'Trusted Appomattox franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Appomattox mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Appomattox County mover with careful residential relocations and packing services across rural and historic properties.'
    desc4 = 'Central Virginia specialist for rural residential moves across Appomattox County.'
    desc5 = 'Appomattox River corridor mover serving courthouse district and surrounding communities.'
  },
  @{
    slug = 'radford'
    city = 'Radford'
    citySlug = 'radford'
    countyName = 'Radford'
    countyMovingId = 'radford-local-moving-radford-va'
    countyMovingName = 'Radford Local Moving'
    regional1 = 'new-river-valley'
    regional2 = 'radford-university'
    regional1Name = 'New River Valley Moving'
    regional2Name = 'Radford University Moving'
    label = 'Radford Metro'
    poolId = 'radford-metro-va'
    desc1 = 'Trusted Radford franchise with excellent reputation for residential and student moves across the New River Valley.'
    desc2 = 'Established Radford mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Radford mover with careful residential relocations and packing services across university and downtown neighborhoods.'
    desc4 = 'New River Valley specialist for residential moves across Radford and surrounding communities.'
    desc5 = 'Radford University mover serving campus district and student housing relocations.'
  },
  @{
    slug = 'buckingham'
    city = 'Buckingham'
    citySlug = 'buckingham'
    countyName = 'Buckingham'
    regional1 = 'james-river-south'
    regional2 = 'central-piedmont'
    regional1Name = 'James River South Moving'
    regional2Name = 'Central Piedmont Moving'
    label = 'Buckingham Metro'
    poolId = 'buckingham-metro-va'
    desc1 = 'Trusted Buckingham franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Buckingham mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Buckingham County mover with careful residential relocations and packing services across rural piedmont properties.'
    desc4 = 'James River South specialist for rural residential moves across Buckingham County.'
    desc5 = 'Central Piedmont mover serving Buckingham Courthouse and Dillwyn corridor communities.'
  },
  @{
    slug = 'manassas-park'
    city = 'Manassas Park'
    citySlug = 'manassas-park'
    countyName = 'Manassas Park'
    countyMovingId = 'manassas-park-local-moving-manassas-park-va'
    countyMovingName = 'Manassas Park Local Moving'
    regional1 = 'nova-central'
    regional2 = 'prince-william-corridor'
    regional1Name = 'NOVA Central Moving'
    regional2Name = 'Prince William Corridor Moving'
    label = 'Manassas Park Metro'
    poolId = 'manassas-park-metro-va'
    existingCatalogIds = @(
      'all-my-sons-manassas-va',
      'college-hunks-moving-manassas-va',
      'budd-van-lines-manassas-va',
      'hercules-movers-manassas-va',
      'krupp-moving-manassas-va'
    )
    catalogIds = @(
      'two-men-and-a-truck-manassas-park-va',
      'all-my-sons-manassas-va',
      'manassas-park-moving-manassas-park-va',
      'manassas-park-local-moving-manassas-park-va',
      'college-hunks-moving-manassas-va',
      'budd-van-lines-manassas-va',
      'nova-central-moving-manassas-park-va',
      'prince-william-corridor-moving-manassas-park-va',
      'hercules-movers-manassas-va',
      'krupp-moving-manassas-va'
    )
    desc1 = 'Trusted Manassas Park franchise with excellent reputation for suburban residential moves across Northern Virginia.'
    desc2 = 'Established Manassas Park mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Manassas Park mover with careful residential relocations and packing services across suburban neighborhoods.'
    desc4 = 'NOVA Central specialist for suburban residential moves across Manassas Park and the DC metro fringe.'
    desc5 = 'Prince William Corridor mover serving Manassas Park and adjacent commuter communities.'
  },
  @{
    slug = 'giles'
    city = 'Pearisburg'
    citySlug = 'pearisburg'
    countyName = 'Giles'
    regional1 = 'new-river-gorge'
    regional2 = 'southwest-virginia'
    regional1Name = 'New River Gorge Moving'
    regional2Name = 'Southwest Virginia Moving'
    label = 'Pearisburg Metro'
    poolId = 'giles-metro-va'
    desc1 = 'Trusted Giles franchise with excellent reputation for residential moves across Southwest Virginia.'
    desc2 = 'Established Pearisburg mover known for reliable local and long-distance services throughout Giles County.'
    desc3 = 'Local Giles County mover with careful residential relocations and packing services across mountain gorge communities.'
    desc4 = 'New River Gorge specialist for hillside and rural residential moves across Giles County.'
    desc5 = 'Southwest Virginia mover serving Pearisburg and Narrows corridor communities.'
  },
  @{
    slug = 'bristol'
    city = 'Bristol'
    citySlug = 'bristol'
    countyName = 'Bristol'
    countyMovingId = 'bristol-local-moving-bristol-va'
    countyMovingName = 'Bristol Local Moving'
    regional1 = 'twin-cities'
    regional2 = 'appalachian-border'
    regional1Name = 'Twin Cities Moving'
    regional2Name = 'Appalachian Border Moving'
    label = 'Bristol Metro'
    poolId = 'bristol-metro-va'
    desc1 = 'Trusted Bristol franchise with excellent reputation for residential moves across Southwest Virginia and the Twin Cities region.'
    desc2 = 'Established Bristol mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Bristol mover with careful residential relocations and packing services across historic downtown and suburban neighborhoods.'
    desc4 = 'Twin Cities specialist for cross-border residential moves across Bristol Virginia communities.'
    desc5 = 'Appalachian Border mover serving Bristol and mountain corridor subdivisions.'
  },
  @{
    slug = 'nottoway'
    city = 'Nottoway'
    citySlug = 'nottoway'
    countyName = 'Nottoway'
    regional1 = 'southside-central'
    regional2 = 'i85-corridor'
    regional1Name = 'Southside Central Moving'
    regional2Name = 'I-85 Corridor Moving'
    label = 'Nottoway Metro'
    poolId = 'nottoway-metro-va'
    desc1 = 'Trusted Nottoway franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Nottoway mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Nottoway County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Southside Central specialist for rural residential moves across Nottoway County.'
    desc5 = 'I-85 Corridor mover serving Blackstone and Crewe area communities.'
  },
  @{
    slug = 'floyd'
    city = 'Floyd'
    citySlug = 'floyd'
    countyName = 'Floyd'
    regional1 = 'blue-ridge-music'
    regional2 = 'floyd-county-highlands'
    regional1Name = 'Blue Ridge Music Moving'
    regional2Name = 'Floyd County Highlands Moving'
    label = 'Floyd Metro'
    poolId = 'floyd-metro-va'
    desc1 = 'Trusted Floyd franchise with excellent reputation for residential moves across Blue Ridge highland communities.'
    desc2 = 'Established Floyd mover known for reliable local and long-distance services throughout Floyd County.'
    desc3 = 'Local Floyd County mover with careful residential relocations and packing services across rural mountain properties.'
    desc4 = 'Blue Ridge Music specialist for countryside residential moves across Floyd County.'
    desc5 = 'Floyd County Highlands mover serving Floyd town and scenic parkway corridor communities.'
  },
  @{
    slug = 'williamsburg'
    city = 'Williamsburg'
    citySlug = 'williamsburg'
    countyName = 'Williamsburg'
    countyMovingId = 'williamsburg-local-moving-williamsburg-va'
    countyMovingName = 'Williamsburg Local Moving'
    regional1 = 'historic-triangle'
    regional2 = 'colonial-williamsburg'
    regional1Name = 'Historic Triangle Moving'
    regional2Name = 'Colonial Williamsburg Moving'
    label = 'Williamsburg Metro'
    poolId = 'williamsburg-metro-va'
    existingCatalogIds = @(
      'all-my-sons-williamsburg-va',
      'college-hunks-moving-williamsburg-va',
      'budd-van-lines-williamsburg-va',
      'hercules-movers-williamsburg-va',
      'krupp-moving-williamsburg-va'
    )
    desc1 = 'Trusted Williamsburg franchise with excellent reputation for residential moves across the Historic Triangle.'
    desc2 = 'Established Williamsburg mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Williamsburg mover with careful residential relocations and packing services across colonial and suburban neighborhoods.'
    desc4 = 'Historic Triangle specialist for residential moves across Williamsburg and Jamestown corridor communities.'
    desc5 = 'Colonial Williamsburg mover serving historic district and tourism corridor neighborhoods.'
  },
  @{
    slug = 'brunswick'
    city = 'Lawrenceville'
    citySlug = 'lawrenceville'
    countyName = 'Brunswick'
    regional1 = 'southside-virginia'
    regional2 = 'lake-gaston'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Lake Gaston Moving'
    label = 'Lawrenceville Metro'
    poolId = 'brunswick-metro-va'
    desc1 = 'Trusted Brunswick franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Lawrenceville mover known for reliable local and long-distance services throughout Brunswick County.'
    desc3 = 'Local Brunswick County mover with careful residential relocations and packing services across rural and lakefront properties.'
    desc4 = 'Southside Virginia specialist for rural residential moves across Brunswick County.'
    desc5 = 'Lake Gaston corridor mover serving Lawrenceville and lake community subdivisions.'
  },
  @{
    slug = 'clarke'
    city = 'Berryville'
    citySlug = 'berryville'
    countyName = 'Clarke'
    regional1 = 'shenandoah-valley'
    regional2 = 'northern-piedmont'
    regional1Name = 'Shenandoah Valley Moving'
    regional2Name = 'Northern Piedmont Moving'
    label = 'Berryville Metro'
    poolId = 'clarke-metro-va'
    desc1 = 'Trusted Clarke franchise with excellent reputation for residential moves across the northern Shenandoah Valley.'
    desc2 = 'Established Berryville mover known for reliable local and long-distance services throughout Clarke County.'
    desc3 = 'Local Clarke County mover with careful residential relocations and packing services across rural piedmont estates.'
    desc4 = 'Shenandoah Valley specialist for countryside residential moves across Clarke County.'
    desc5 = 'Northern Piedmont mover serving Berryville and Boyce corridor communities.'
  },
  @{
    slug = 'falls-church'
    city = 'Falls Church'
    citySlug = 'falls-church'
    countyName = 'Falls Church'
    countyMovingId = 'falls-church-local-moving-falls-church-va'
    countyMovingName = 'Falls Church Local Moving'
    regional1 = 'nova-urban'
    regional2 = 'dc-metro-west'
    regional1Name = 'NOVA Urban Moving'
    regional2Name = 'DC Metro West Moving'
    label = 'Falls Church Metro'
    poolId = 'falls-church-metro-va'
    desc1 = 'Trusted Falls Church franchise with excellent reputation for urban residential moves across Northern Virginia.'
    desc2 = 'Established Falls Church mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Falls Church mover with careful residential relocations and packing services across dense suburban neighborhoods.'
    desc4 = 'NOVA Urban specialist for townhouse and condo moves across Falls Church.'
    desc5 = 'DC Metro West mover serving West Falls Church and Seven Corners corridor communities.'
  },
  @{
    slug = 'grayson'
    city = 'Independence'
    citySlug = 'independence'
    countyName = 'Grayson'
    regional1 = 'blue-ridge-highlands'
    regional2 = 'mount-rogers'
    regional1Name = 'Blue Ridge Highlands Moving'
    regional2Name = 'Mount Rogers Moving'
    label = 'Independence Metro'
    poolId = 'grayson-metro-va'
    desc1 = 'Trusted Grayson franchise with excellent reputation for residential moves across Southwest Virginia highlands.'
    desc2 = 'Established Independence mover known for reliable local and long-distance services throughout Grayson County.'
    desc3 = 'Local Grayson County mover with careful residential relocations and packing services across remote mountain communities.'
    desc4 = 'Blue Ridge Highlands specialist for hillside residential moves across Grayson County.'
    desc5 = 'Mount Rogers corridor mover serving Independence and Troutdale area communities.'
  },
  @{
    slug = 'nelson'
    city = 'Lovingston'
    citySlug = 'lovingston'
    countyName = 'Nelson'
    regional1 = 'blue-ridge-nelson'
    regional2 = 'wintergreen-area'
    regional1Name = 'Blue Ridge Nelson Moving'
    regional2Name = 'Wintergreen Area Moving'
    label = 'Lovingston Metro'
    poolId = 'nelson-metro-va'
    desc1 = 'Trusted Nelson franchise with excellent reputation for residential moves across Central Virginia Blue Ridge communities.'
    desc2 = 'Established Lovingston mover known for reliable local and long-distance services throughout Nelson County.'
    desc3 = 'Local Nelson County mover with careful residential relocations and packing services across mountain and resort properties.'
    desc4 = 'Blue Ridge Nelson specialist for hillside residential moves across Nelson County.'
    desc5 = 'Wintergreen Area mover serving Lovingston and resort corridor communities.'
  },
  @{
    slug = 'alleghany'
    city = 'Covington'
    citySlug = 'covington'
    countyName = 'Alleghany'
    regional1 = 'alleghany-highlands'
    regional2 = 'jackson-river'
    regional1Name = 'Alleghany Highlands Moving'
    regional2Name = 'Jackson River Moving'
    label = 'Covington Metro'
    poolId = 'alleghany-metro-va'
    desc1 = 'Trusted Alleghany franchise with excellent reputation for residential moves across the Alleghany Highlands.'
    desc2 = 'Established Covington mover known for reliable local and long-distance services throughout Alleghany County.'
    desc3 = 'Local Alleghany County mover with careful residential relocations and packing services across mountain valley communities.'
    desc4 = 'Alleghany Highlands specialist for rural residential moves across Covington and Clifton Forge corridor.'
    desc5 = 'Jackson River corridor mover serving Covington and western Alleghany communities.'
  },
  @{
    slug = 'madison'
    city = 'Madison'
    citySlug = 'madison'
    countyName = 'Madison'
    regional1 = 'madison-county-piedmont'
    regional2 = 'swift-run-gap'
    regional1Name = 'Madison County Piedmont Moving'
    regional2Name = 'Swift Run Gap Moving'
    label = 'Madison Metro'
    poolId = 'madison-metro-va'
    desc1 = 'Trusted Madison franchise with excellent reputation for residential moves across Piedmont Virginia.'
    desc2 = 'Established Madison mover known for reliable local and long-distance services throughout Madison County.'
    desc3 = 'Local Madison County mover with careful residential relocations and packing services across rural estate properties.'
    desc4 = 'Madison County Piedmont specialist for countryside residential moves across the county.'
    desc5 = 'Swift Run Gap corridor mover serving Madison and Shenandoah gateway communities.'
  },
  @{
    slug = 'martinsville'
    city = 'Martinsville'
    citySlug = 'martinsville'
    countyName = 'Martinsville'
    countyMovingId = 'martinsville-local-moving-martinsville-va'
    countyMovingName = 'Martinsville Local Moving'
    regional1 = 'martinsville-area'
    regional2 = 'southside-piedmont'
    regional1Name = 'Martinsville Area Moving'
    regional2Name = 'Southside Piedmont Moving'
    label = 'Martinsville Metro'
    poolId = 'martinsville-metro-va'
    existingCatalogIds = @(
      'all-my-sons-martinsville-va',
      'college-hunks-moving-martinsville-va',
      'budd-van-lines-martinsville-va',
      'hercules-movers-martinsville-va',
      'krupp-moving-martinsville-va'
    )
    desc1 = 'Trusted Martinsville franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Martinsville mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Martinsville mover with careful residential relocations and packing services across suburban and industrial corridor neighborhoods.'
    desc4 = 'Martinsville Area specialist for South Central Virginia residential moves.'
    desc5 = 'Southside Piedmont mover serving Martinsville and Henry County fringe communities.'
  },
  @{
    slug = 'poquoson'
    city = 'Poquoson'
    citySlug = 'poquoson'
    countyName = 'Poquoson'
    countyMovingId = 'poquoson-local-moving-poquoson-va'
    countyMovingName = 'Poquoson Local Moving'
    regional1 = 'hampton-roads-peninsula'
    regional2 = 'chesapeake-bay'
    regional1Name = 'Hampton Roads Peninsula Moving'
    regional2Name = 'Chesapeake Bay Moving'
    label = 'Poquoson Metro'
    poolId = 'poquoson-metro-va'
    desc1 = 'Trusted Poquoson franchise with excellent reputation for residential moves across the Hampton Roads Peninsula.'
    desc2 = 'Established Poquoson mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Poquoson mover with careful residential relocations and packing services across waterfront and suburban neighborhoods.'
    desc4 = 'Hampton Roads Peninsula specialist for coastal residential moves across Poquoson.'
    desc5 = 'Chesapeake Bay mover serving Poquoson waterfront and Back River communities.'
  },
  @{
    slug = 'amelia'
    city = 'Amelia Court House'
    citySlug = 'amelia-court-house'
    countyName = 'Amelia'
    regional1 = 'central-virginia'
    regional2 = 'amelia-rural'
    regional1Name = 'Central Virginia Moving'
    regional2Name = 'Amelia Rural Moving'
    label = 'Amelia Court House Metro'
    poolId = 'amelia-metro-va'
    desc1 = 'Trusted Amelia franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Amelia Court House mover known for reliable local and long-distance services throughout Amelia County.'
    desc3 = 'Local Amelia County mover with careful residential relocations and packing services across rural piedmont properties.'
    desc4 = 'Central Virginia specialist for countryside residential moves across Amelia County.'
    desc5 = 'Amelia Rural mover serving courthouse district and western corridor communities.'
  },
  @{
    slug = 'dickenson'
    city = 'Clintwood'
    citySlug = 'clintwood'
    countyName = 'Dickenson'
    regional1 = 'coalfields-north'
    regional2 = 'russell-fork'
    regional1Name = 'Coalfields North Moving'
    regional2Name = 'Russell Fork Moving'
    label = 'Clintwood Metro'
    poolId = 'dickenson-metro-va'
    desc1 = 'Trusted Dickenson franchise with excellent reputation for residential moves across Southwest Virginia coalfields.'
    desc2 = 'Established Clintwood mover known for reliable local and long-distance services throughout Dickenson County.'
    desc3 = 'Local Dickenson County mover with careful residential relocations and packing services across remote mountain communities.'
    desc4 = 'Coalfields North specialist for hillside residential moves across Dickenson County.'
    desc5 = 'Russell Fork corridor mover serving Clintwood and Haysi area communities.'
  },
  @{
    slug = 'northumberland'
    city = 'Heathsville'
    citySlug = 'heathsville'
    countyName = 'Northumberland'
    regional1 = 'northern-neck'
    regional2 = 'chesapeake-bay-north'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Chesapeake Bay North Moving'
    label = 'Heathsville Metro'
    poolId = 'northumberland-metro-va'
    desc1 = 'Trusted Northumberland franchise with excellent reputation for residential moves across the Northern Neck.'
    desc2 = 'Established Heathsville mover known for reliable local and long-distance services throughout Northumberland County.'
    desc3 = 'Local Northumberland County mover with careful residential relocations and packing services across waterfront and rural properties.'
    desc4 = 'Northern Neck specialist for coastal residential moves across Northumberland County.'
    desc5 = 'Chesapeake Bay North mover serving Heathsville and Reedville corridor communities.'
  },
  @{
    slug = 'lunenburg'
    city = 'Lunenburg'
    citySlug = 'lunenburg'
    countyName = 'Lunenburg'
    regional1 = 'southside-central'
    regional2 = 'lunenburg-rural'
    regional1Name = 'Southside Central Moving'
    regional2Name = 'Lunenburg Rural Moving'
    label = 'Lunenburg Metro'
    poolId = 'lunenburg-metro-va'
    desc1 = 'Trusted Lunenburg franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Lunenburg mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Lunenburg County mover with careful residential relocations and packing services across rural agricultural properties.'
    desc4 = 'Southside Central specialist for countryside residential moves across Lunenburg County.'
    desc5 = 'Lunenburg Rural mover serving Victoria and Kenbridge corridor communities.'
  },
  @{
    slug = 'northampton'
    city = 'Eastville'
    citySlug = 'eastville'
    countyName = 'Northampton'
    regional1 = 'eastern-shore-south'
    regional2 = 'chesapeake-bay-shore'
    regional1Name = 'Eastern Shore South Moving'
    regional2Name = 'Chesapeake Bay Shore Moving'
    label = 'Eastville Metro'
    poolId = 'northampton-metro-va'
    desc1 = 'Trusted Northampton franchise with excellent reputation for residential moves across Virginia Eastern Shore communities.'
    desc2 = 'Established Eastville mover known for reliable local and long-distance services throughout Northampton County.'
    desc3 = 'Local Northampton County mover with careful residential relocations and packing services across coastal and rural neighborhoods.'
    desc4 = 'Eastern Shore South specialist for waterfront residential moves across Northampton County.'
    desc5 = 'Chesapeake Bay Shore mover serving Cape Charles and Nassawadox corridor communities.'
  },
  @{
    slug = 'charlotte'
    city = 'Charlotte Court House'
    citySlug = 'charlotte-court-house'
    countyName = 'Charlotte'
    regional1 = 'southside-virginia'
    regional2 = 'charlotte-rural'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Charlotte Rural Moving'
    label = 'Charlotte Court House Metro'
    poolId = 'charlotte-metro-va'
    desc1 = 'Trusted Charlotte franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Charlotte Court House mover known for reliable local and long-distance services throughout Charlotte County.'
    desc3 = 'Local Charlotte County mover with careful residential relocations and packing services across rural piedmont properties.'
    desc4 = 'Southside Virginia specialist for countryside residential moves across Charlotte County.'
    desc5 = 'Charlotte Rural mover serving courthouse district and Keysville corridor communities.'
  },
  @{
    slug = 'greensville'
    city = 'Emporia'
    citySlug = 'emporia'
    countyName = 'Greensville'
    regional1 = 'i95-southside'
    regional2 = 'emporia-corridor'
    regional1Name = 'I-95 Southside Moving'
    regional2Name = 'Emporia Corridor Moving'
    label = 'Emporia Metro'
    poolId = 'greensville-metro-va'
    desc1 = 'Trusted Greensville franchise with excellent reputation for residential moves along the I-95 Southside corridor.'
    desc2 = 'Established Emporia mover known for reliable local and long-distance services throughout Greensville County.'
    desc3 = 'Local Greensville County mover with careful residential relocations and packing services across rural and interstate corridor properties.'
    desc4 = 'I-95 Southside specialist for residential moves across Greensville County.'
    desc5 = 'Emporia Corridor mover serving Emporia and Skippers area communities.'
  },
  @{
    slug = 'lancaster'
    city = 'Lancaster'
    citySlug = 'lancaster'
    countyName = 'Lancaster'
    regional1 = 'northern-neck'
    regional2 = 'rappahannock-river'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Rappahannock River Moving'
    label = 'Lancaster Metro'
    poolId = 'lancaster-metro-va'
    desc1 = 'Trusted Lancaster franchise with excellent reputation for residential moves across the Northern Neck.'
    desc2 = 'Established Lancaster mover known for reliable local and long-distance services throughout Lancaster County.'
    desc3 = 'Local Lancaster County mover with careful residential relocations and packing services across waterfront and rural properties.'
    desc4 = 'Northern Neck specialist for coastal residential moves across Lancaster County.'
    desc5 = 'Rappahannock River corridor mover serving Kilmarnock and White Stone area communities.'
  },
  @{
    slug = 'sussex'
    city = 'Sussex'
    citySlug = 'sussex'
    countyName = 'Sussex'
    regional1 = 'southside-virginia'
    regional2 = 'sussex-rural'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Sussex Rural Moving'
    label = 'Sussex Metro'
    poolId = 'sussex-metro-va'
    desc1 = 'Trusted Sussex franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Sussex mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Sussex County mover with careful residential relocations and packing services across rural agricultural properties.'
    desc4 = 'Southside Virginia specialist for countryside residential moves across Sussex County.'
    desc5 = 'Sussex Rural mover serving Waverly and Stony Creek corridor communities.'
  },
  @{
    slug = 'middlesex'
    city = 'Saluda'
    citySlug = 'saluda'
    countyName = 'Middlesex'
    regional1 = 'middle-peninsula'
    regional2 = 'rappahannock-east'
    regional1Name = 'Middle Peninsula Moving'
    regional2Name = 'Rappahannock East Moving'
    label = 'Saluda Metro'
    poolId = 'middlesex-metro-va'
    desc1 = 'Trusted Middlesex franchise with excellent reputation for residential moves across the Middle Peninsula.'
    desc2 = 'Established Saluda mover known for reliable local and long-distance services throughout Middlesex County.'
    desc3 = 'Local Middlesex County mover with careful residential relocations and packing services across waterfront and rural neighborhoods.'
    desc4 = 'Middle Peninsula specialist for coastal residential moves across Middlesex County.'
    desc5 = 'Rappahannock East mover serving Saluda and Urbanna corridor communities.'
  }
)

function Format-MoverBlock($id, $name, $rating, $reviews, $desc, $city, $services = "['Local Moving', 'Packing', 'Storage']", $bbb = 'A+') {
  @"
  '$id': {
    id: '$id',
    name: '$name',
    rating: $rating,
    reviewCount: $reviews,
    shortDescription:
      '$desc',
    services: $services,
    specialties: ['Residential', 'Commercial'],
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: '$bbb',
    city: '$city',
  },
"@
}

$moverLines = New-Object System.Collections.Generic.List[string]
$poolLines = New-Object System.Collections.Generic.List[string]
$assignmentLines = New-Object System.Collections.Generic.List[string]

foreach ($c in $counties) {
  $slug = $c.slug
  $city = $c.city
  $citySlug = $c.citySlug
  $countyName = $c.countyName
  $existing = if ($c.existingCatalogIds) { $c.existingCatalogIds } else { @() }

  $fourthId = if ($c.countyMovingId) { $c.countyMovingId } else { "$slug-county-moving-$slug-va" }
  $fourthName = if ($c.countyMovingName) { $c.countyMovingName } else { "$countyName County Moving" }

  if ($c.catalogIds) {
    $ids = $c.catalogIds
  } else {
    $ids = @(
      "two-men-and-a-truck-$slug-va",
      "all-my-sons-$citySlug-va",
      "$citySlug-moving-$slug-va",
      $fourthId,
      "college-hunks-moving-$citySlug-va",
      "budd-van-lines-$citySlug-va",
      "$($c.regional1)-moving-$slug-va",
      "$($c.regional2)-moving-$slug-va",
      "hercules-movers-$citySlug-va",
      "krupp-moving-$citySlug-va"
    )
  }

  $names = @(
    "Two Men and a Truck $countyName",
    "All My Sons Moving $city",
    "$city Moving & Storage",
    $fourthName,
    "College Hunks Moving $city",
    "Budd Van Lines $city",
    $c.regional1Name,
    $c.regional2Name,
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  $descs = @($c.desc1, $c.desc2, $c.desc3, $c.desc4, $c.desc5, $c.desc2, $c.desc4, $c.desc5, $c.desc3, $c.desc3)
  $ratings = @(4.7, 4.6, 4.6, 4.5, 4.7, 4.6, 4.6, 4.6, 4.6, 4.5)
  $reviews = @(1480, 1180, 420, 310, 820, 250, 330, 275, 195, 165)

  for ($i = 0; $i -lt 10; $i++) {
    if ($existing -contains $ids[$i]) { continue }
    $svc = if ($i -eq 1) { "['Local Moving', 'Long Distance', 'Packing']" } elseif ($i -eq 4) { "['Local Moving', 'Packing', 'Junk Removal']" } else { "['Local Moving', 'Packing', 'Storage']" }
    $bbb = if ($i -eq 1) { 'A' } else { 'A+' }
    $moverLines.Add((Format-MoverBlock $ids[$i] $names[$i] $ratings[$i] $reviews[$i] $descs[$i] $city $svc $bbb))
  }

  $idList = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $poolLines.Add(@"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: '$($c.label)',
    moverIds: [
$idList
    ],
  },
"@)

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $assignIdList = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines.Add(@"
  ${key}: [
$assignIdList
  ],
"@)
}

$outDir = Join-Path $PSScriptRoot 'va-batch8-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
$assignmentLines -join "`n" | Set-Content (Join-Path $outDir 'assignments-snippet.txt') -Encoding UTF8
Write-Host "Generated VA batch 8 catalog ($($counties.Count) locations, $($moverLines.Count) new movers)"