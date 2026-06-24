# Generates Virginia batch 9 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'essex'
    city = 'Tappahannock'
    citySlug = 'tappahannock'
    countyName = 'Essex'
    regional1 = 'northern-neck'
    regional2 = 'rappahannock-river'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Rappahannock River Moving'
    label = 'Tappahannock Metro'
    poolId = 'essex-metro-va'
    desc1 = 'Trusted Essex franchise with excellent reputation for residential moves across the Northern Neck.'
    desc2 = 'Established Tappahannock mover known for reliable local and long-distance services throughout Essex County.'
    desc3 = 'Local Essex County mover with careful residential relocations and packing services across waterfront and rural neighborhoods.'
    desc4 = 'Northern Neck specialist for coastal residential moves across Essex County.'
    desc5 = 'Rappahannock River corridor mover serving Tappahannock and riverfront communities.'
  },
  @{
    slug = 'cumberland'
    city = 'Cumberland'
    citySlug = 'cumberland'
    countyName = 'Cumberland'
    regional1 = 'james-river-central'
    regional2 = 'piedmont-south'
    regional1Name = 'James River Central Moving'
    regional2Name = 'Piedmont South Moving'
    label = 'Cumberland Metro'
    poolId = 'cumberland-metro-va'
    desc1 = 'Trusted Cumberland franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Cumberland mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Cumberland County mover with careful residential relocations and packing services across rural piedmont properties.'
    desc4 = 'James River Central specialist for countryside residential moves across Cumberland County.'
    desc5 = 'Piedmont South mover serving Cumberland Courthouse and Farmville corridor communities.'
  },
  @{
    slug = 'richmond-county'
    city = 'Warsaw'
    citySlug = 'warsaw'
    countyName = 'Richmond County'
    regional1 = 'northern-neck'
    regional2 = 'rappahannock-east'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Rappahannock East Moving'
    label = 'Warsaw Metro'
    poolId = 'richmond-county-metro-va'
    desc1 = 'Trusted Richmond County franchise with excellent reputation for residential moves across the Northern Neck.'
    desc2 = 'Established Warsaw mover known for reliable local and long-distance services throughout Richmond County.'
    desc3 = 'Local Richmond County mover with careful residential relocations and packing services across waterfront and rural neighborhoods.'
    desc4 = 'Northern Neck specialist for coastal residential moves across Richmond County.'
    desc5 = 'Rappahannock East corridor mover serving Warsaw and Farnham communities.'
  },
  @{
    slug = 'franklin-city'
    city = 'Franklin'
    citySlug = 'franklin'
    countyName = 'Franklin'
    countyMovingId = 'franklin-local-moving-franklin-city-va'
    countyMovingName = 'Franklin Local Moving'
    regional1 = 'southside-virginia'
    regional2 = 'blackwater-river'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Blackwater River Moving'
    label = 'Franklin Metro'
    poolId = 'franklin-city-metro-va'
    desc1 = 'Trusted Franklin franchise with excellent reputation for residential moves across Southside Virginia.'
    desc2 = 'Established Franklin mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Franklin mover with careful residential relocations and packing services across suburban and river corridor neighborhoods.'
    desc4 = 'Southside Virginia specialist for residential moves across Franklin and surrounding communities.'
    desc5 = 'Blackwater River corridor mover serving Franklin and Southampton fringe neighborhoods.'
  },
  @{
    slug = 'mathews'
    city = 'Mathews'
    citySlug = 'mathews'
    countyName = 'Mathews'
    regional1 = 'middle-peninsula'
    regional2 = 'chesapeake-bay'
    regional1Name = 'Middle Peninsula Moving'
    regional2Name = 'Chesapeake Bay Moving'
    label = 'Mathews Metro'
    poolId = 'mathews-metro-va'
    desc1 = 'Trusted Mathews franchise with excellent reputation for residential moves across the Middle Peninsula.'
    desc2 = 'Established Mathews mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Mathews County mover with careful residential relocations and packing services across waterfront and rural neighborhoods.'
    desc4 = 'Middle Peninsula specialist for coastal residential moves across Mathews County.'
    desc5 = 'Chesapeake Bay mover serving Gwynn Island and bayfront corridor communities.'
  },
  @{
    slug = 'lexington'
    city = 'Lexington'
    citySlug = 'lexington'
    countyName = 'Lexington'
    countyMovingId = 'lexington-local-moving-lexington-va'
    countyMovingName = 'Lexington Local Moving'
    regional1 = 'wlu-vmi-district'
    regional2 = 'shenandoah-valley-south'
    regional1Name = 'WLU VMI District Moving'
    regional2Name = 'Shenandoah Valley South Moving'
    label = 'Lexington Metro'
    poolId = 'lexington-metro-va'
    desc1 = 'Trusted Lexington franchise with excellent reputation for residential and student moves across the Shenandoah Valley.'
    desc2 = 'Established Lexington mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Lexington mover with careful residential relocations and packing services across historic downtown and campus neighborhoods.'
    desc4 = 'WLU VMI District specialist for university and downtown residential moves across Lexington.'
    desc5 = 'Shenandoah Valley South mover serving Lexington and Rockbridge gateway communities.'
  },
  @{
    slug = 'rappahannock'
    city = 'Washington'
    citySlug = 'washington'
    countyName = 'Rappahannock'
    regional1 = 'shenandoah-north'
    regional2 = 'piedmont-rural'
    regional1Name = 'Shenandoah North Moving'
    regional2Name = 'Piedmont Rural Moving'
    label = 'Washington Metro'
    poolId = 'rappahannock-metro-va'
    desc1 = 'Trusted Rappahannock franchise with excellent reputation for residential moves across Piedmont Virginia.'
    desc2 = 'Established Washington mover known for reliable local and long-distance services throughout Rappahannock County.'
    desc3 = 'Local Rappahannock County mover with careful residential relocations and packing services across rural estate and countryside properties.'
    desc4 = 'Shenandoah North specialist for countryside residential moves across Rappahannock County.'
    desc5 = 'Piedmont Rural mover serving Washington and Sperryville corridor communities.'
  },
  @{
    slug = 'king-and-queen'
    city = 'King and Queen Court House'
    citySlug = 'king-and-queen-court-house'
    countyName = 'King and Queen'
    regional1 = 'mattaponi-river'
    regional2 = 'central-peninsula'
    regional1Name = 'Mattaponi River Moving'
    regional2Name = 'Central Peninsula Moving'
    label = 'King and Queen Court House Metro'
    poolId = 'king-and-queen-metro-va'
    desc1 = 'Trusted King and Queen franchise with excellent reputation for residential moves across the Middle Peninsula.'
    desc2 = 'Established King and Queen Court House mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local King and Queen County mover with careful residential relocations and packing services across rural and riverfront properties.'
    desc4 = 'Mattaponi River specialist for countryside residential moves across King and Queen County.'
    desc5 = 'Central Peninsula mover serving courthouse district and Shacklefords corridor communities.'
  },
  @{
    slug = 'buena-vista'
    city = 'Buena Vista'
    citySlug = 'buena-vista'
    countyName = 'Buena Vista'
    countyMovingId = 'buena-vista-local-moving-buena-vista-va'
    countyMovingName = 'Buena Vista Local Moving'
    regional1 = 'rockbridge-area'
    regional2 = 'maury-river'
    regional1Name = 'Rockbridge Area Moving'
    regional2Name = 'Maury River Moving'
    label = 'Buena Vista Metro'
    poolId = 'buena-vista-metro-va'
    desc1 = 'Trusted Buena Vista franchise with excellent reputation for residential moves across the Rockbridge area.'
    desc2 = 'Established Buena Vista mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Buena Vista mover with careful residential relocations and packing services across river valley and hillside neighborhoods.'
    desc4 = 'Rockbridge Area specialist for residential moves across Buena Vista and Lexington corridor communities.'
    desc5 = 'Maury River corridor mover serving Buena Vista and Glen Maury parkway neighborhoods.'
  },
  @{
    slug = 'charles-city'
    city = 'Charles City'
    citySlug = 'charles-city'
    countyName = 'Charles City'
    regional1 = 'james-river-peninsula'
    regional2 = 'colonial-corridor'
    regional1Name = 'James River Peninsula Moving'
    regional2Name = 'Colonial Corridor Moving'
    label = 'Charles City Metro'
    poolId = 'charles-city-metro-va'
    desc1 = 'Trusted Charles City franchise with excellent reputation for residential moves along the James River Peninsula.'
    desc2 = 'Established Charles City mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Charles City County mover with careful residential relocations and packing services across historic and rural riverfront properties.'
    desc4 = 'James River Peninsula specialist for countryside residential moves across Charles City County.'
    desc5 = 'Colonial Corridor mover serving Charles City Courthouse and Route 5 historic communities.'
  },
  @{
    slug = 'galax'
    city = 'Galax'
    citySlug = 'galax'
    countyName = 'Galax'
    countyMovingId = 'galax-local-moving-galax-va'
    countyMovingName = 'Galax Local Moving'
    regional1 = 'blue-ridge-highlands'
    regional2 = 'carroll-galax'
    regional1Name = 'Blue Ridge Highlands Moving'
    regional2Name = 'Carroll Galax Moving'
    label = 'Galax Metro'
    poolId = 'galax-metro-va'
    desc1 = 'Trusted Galax franchise with excellent reputation for residential moves across Southwest Virginia highlands.'
    desc2 = 'Established Galax mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Galax mover with careful residential relocations and packing services across mountain and downtown neighborhoods.'
    desc4 = 'Blue Ridge Highlands specialist for hillside residential moves across Galax.'
    desc5 = 'Carroll Galax corridor mover serving Galax and Hillsville area communities.'
  },
  @{
    slug = 'surry'
    city = 'Surry'
    citySlug = 'surry'
    countyName = 'Surry'
    regional1 = 'james-river-south'
    regional2 = 'peninsula-rural'
    regional1Name = 'James River South Moving'
    regional2Name = 'Peninsula Rural Moving'
    label = 'Surry Metro'
    poolId = 'surry-metro-va'
    desc1 = 'Trusted Surry franchise with excellent reputation for residential moves across the James River South region.'
    desc2 = 'Established Surry mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Surry County mover with careful residential relocations and packing services across rural and ferry corridor properties.'
    desc4 = 'James River South specialist for countryside residential moves across Surry County.'
    desc5 = 'Peninsula Rural mover serving Surry Courthouse and Scotland Ferry corridor communities.'
  },
  @{
    slug = 'bland'
    city = 'Bland'
    citySlug = 'bland'
    countyName = 'Bland'
    regional1 = 'appalachian-plateau'
    regional2 = 'southwest-ridge'
    regional1Name = 'Appalachian Plateau Moving'
    regional2Name = 'Southwest Ridge Moving'
    label = 'Bland Metro'
    poolId = 'bland-metro-va'
    desc1 = 'Trusted Bland franchise with excellent reputation for residential moves across Southwest Virginia ridge communities.'
    desc2 = 'Established Bland mover known for reliable local and long-distance services throughout Bland County.'
    desc3 = 'Local Bland County mover with careful residential relocations and packing services across remote mountain neighborhoods.'
    desc4 = 'Appalachian Plateau specialist for hillside residential moves across Bland County.'
    desc5 = 'Southwest Ridge corridor mover serving Bland and Rocky Gap area communities.'
  },
  @{
    slug = 'covington'
    city = 'Covington'
    citySlug = 'covington'
    countyName = 'Covington'
    countyMovingId = 'covington-local-moving-covington-va'
    countyMovingName = 'Covington Local Moving'
    regional1 = 'alleghany-highlands'
    regional2 = 'jackson-river'
    regional1Name = 'Alleghany Highlands Moving'
    regional2Name = 'Jackson River Moving'
    label = 'Covington Metro'
    poolId = 'covington-metro-va'
    existingCatalogIds = @(
      'all-my-sons-covington-va',
      'college-hunks-moving-covington-va',
      'budd-van-lines-covington-va',
      'hercules-movers-covington-va',
      'krupp-moving-covington-va'
    )
    desc1 = 'Trusted Covington franchise with excellent reputation for residential moves across the Alleghany Highlands.'
    desc2 = 'Established Covington mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Covington mover with careful residential relocations and packing services across mountain valley neighborhoods.'
    desc4 = 'Alleghany Highlands specialist for residential moves across Covington and Clifton Forge corridor.'
    desc5 = 'Jackson River corridor mover serving Covington and western highland communities.'
  },
  @{
    slug = 'emporia'
    city = 'Emporia'
    citySlug = 'emporia'
    countyName = 'Emporia'
    countyMovingId = 'emporia-local-moving-emporia-va'
    countyMovingName = 'Emporia Local Moving'
    regional1 = 'i95-southside'
    regional2 = 'emporia-corridor'
    regional1Name = 'I-95 Southside Moving'
    regional2Name = 'Emporia Corridor Moving'
    label = 'Emporia Metro'
    poolId = 'emporia-metro-va'
    existingCatalogIds = @(
      'all-my-sons-emporia-va',
      'college-hunks-moving-emporia-va',
      'budd-van-lines-emporia-va',
      'hercules-movers-emporia-va',
      'krupp-moving-emporia-va'
    )
    desc1 = 'Trusted Emporia franchise with excellent reputation for residential moves along the I-95 Southside corridor.'
    desc2 = 'Established Emporia mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Emporia mover with careful residential relocations and packing services across suburban and interstate corridor neighborhoods.'
    desc4 = 'I-95 Southside specialist for residential moves across Emporia and Greensville fringe communities.'
    desc5 = 'Emporia Corridor mover serving downtown and Skippers area subdivisions.'
  },
  @{
    slug = 'craig'
    city = 'New Castle'
    citySlug = 'new-castle'
    countyName = 'Craig'
    regional1 = 'appalachian-ridge'
    regional2 = 'craig-creek'
    regional1Name = 'Appalachian Ridge Moving'
    regional2Name = 'Craig Creek Moving'
    label = 'New Castle Metro'
    poolId = 'craig-metro-va'
    desc1 = 'Trusted Craig franchise with excellent reputation for residential moves across Southwest Virginia ridge communities.'
    desc2 = 'Established New Castle mover known for reliable local and long-distance services throughout Craig County.'
    desc3 = 'Local Craig County mover with careful residential relocations and packing services across remote mountain neighborhoods.'
    desc4 = 'Appalachian Ridge specialist for hillside residential moves across Craig County.'
    desc5 = 'Craig Creek corridor mover serving New Castle and Paint Bank area communities.'
  },
  @{
    slug = 'bath'
    city = 'Warm Springs'
    citySlug = 'warm-springs'
    countyName = 'Bath'
    regional1 = 'allegheny-highlands'
    regional2 = 'homesteader-valley'
    regional1Name = 'Allegheny Highlands Moving'
    regional2Name = 'Homesteader Valley Moving'
    label = 'Warm Springs Metro'
    poolId = 'bath-metro-va'
    desc1 = 'Trusted Bath franchise with excellent reputation for residential moves across Allegheny Highlands resort and countryside communities.'
    desc2 = 'Established Warm Springs mover known for reliable local and long-distance services throughout Bath County.'
    desc3 = 'Local Bath County mover with careful residential relocations and packing services across historic inns, vacation homes, and rural estates.'
    desc4 = 'Allegheny Highlands specialist for seasonal and year-round residential moves across Bath County.'
    desc5 = 'Homesteader Valley mover serving Warm Springs, The Homestead resort corridor, and mountain getaway properties.'
  },
  @{
    slug = 'norton'
    city = 'Norton'
    citySlug = 'norton'
    countyName = 'Norton'
    countyMovingId = 'norton-local-moving-norton-va'
    countyMovingName = 'Norton Local Moving'
    regional1 = 'coalfields'
    regional2 = 'pound-river'
    regional1Name = 'Coalfields Moving'
    regional2Name = 'Pound River Moving'
    label = 'Norton Metro'
    poolId = 'norton-metro-va'
    desc1 = 'Trusted Norton franchise with excellent reputation for residential moves across Southwest Virginia coalfields.'
    desc2 = 'Established Norton mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Norton mover with careful residential relocations and packing services across hillside and downtown neighborhoods.'
    desc4 = 'Coalfields specialist for residential moves across Norton and Wise County fringe communities.'
    desc5 = 'Pound River corridor mover serving Norton and mountain valley subdivisions.'
  },
  @{
    slug = 'highland'
    city = 'Monterey'
    citySlug = 'monterey'
    countyName = 'Highland'
    regional1 = 'allegheny-highlands'
    regional2 = 'monterey-pass'
    regional1Name = 'Allegheny Highlands Moving'
    regional2Name = 'Monterey Pass Moving'
    label = 'Monterey Metro'
    poolId = 'highland-metro-va'
    desc1 = 'Trusted Highland franchise with excellent reputation for residential moves across Allegheny Highlands communities.'
    desc2 = 'Established Monterey mover known for reliable local and long-distance services throughout Highland County.'
    desc3 = 'Local Highland County mover with careful residential relocations and packing services across remote mountain and farmland properties.'
    desc4 = 'Allegheny Highlands specialist for countryside residential moves across Highland County.'
    desc5 = 'Monterey Pass corridor mover serving Monterey and western Highland gateway communities.'
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

$outDir = Join-Path $PSScriptRoot 'va-batch9-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
$assignmentLines -join "`n" | Set-Content (Join-Path $outDir 'assignments-snippet.txt') -Encoding UTF8
Write-Host "Generated VA batch 9 catalog ($($counties.Count) locations, $($moverLines.Count) new movers)"