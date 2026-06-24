# Generates Virginia batch 7 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'botetourt'
    city = 'Fincastle'
    citySlug = 'fincastle'
    countyName = 'Botetourt'
    regional1 = 'roanoke-valley'
    regional2 = 'blue-ridge-east'
    regional1Name = 'Roanoke Valley Moving'
    regional2Name = 'Blue Ridge East Moving'
    label = 'Botetourt Metro'
    poolId = 'botetourt-metro-va'
    desc1 = 'Trusted Botetourt franchise with excellent reputation for suburban and rural residential moves across Fincastle and the Roanoke Valley.'
    desc2 = 'Established Fincastle mover known for reliable local and long-distance services throughout Botetourt County.'
    desc3 = 'Local Botetourt County mover with careful residential relocations and packing services across mountain and valley communities.'
    desc4 = 'Roanoke Valley specialist for suburban residential moves across Botetourt County.'
    desc5 = 'Blue Ridge East mover serving Fincastle and Daleville corridor communities.'
  },
  @{
    slug = 'accomack'
    city = 'Accomac'
    citySlug = 'accomac'
    countyName = 'Accomack'
    regional1 = 'eastern-shore'
    regional2 = 'chesapeake-bay'
    regional1Name = 'Eastern Shore Moving'
    regional2Name = 'Chesapeake Bay Moving'
    label = 'Accomac Metro'
    poolId = 'accomack-metro-va'
    desc1 = 'Trusted Accomack franchise with excellent reputation for residential moves across Virginia Eastern Shore communities.'
    desc2 = 'Established Accomac mover known for reliable local and long-distance services throughout Accomack County.'
    desc3 = 'Local Accomack County mover with careful residential relocations and packing services across rural and coastal neighborhoods.'
    desc4 = 'Eastern Shore specialist for rural and waterfront residential moves across Accomack County.'
    desc5 = 'Chesapeake Bay mover serving Onancock and Chincoteague corridor communities.'
  },
  @{
    slug = 'pulaski'
    city = 'Pulaski'
    citySlug = 'pulaski'
    countyName = 'Pulaski'
    regional1 = 'new-river-valley'
    regional2 = 'southwest-piedmont'
    regional1Name = 'New River Valley Moving'
    regional2Name = 'Southwest Piedmont Moving'
    label = 'Pulaski Metro'
    poolId = 'pulaski-metro-va'
    desc1 = 'Trusted Pulaski franchise with excellent reputation for residential moves across Southwest Virginia.'
    desc2 = 'Established Pulaski mover known for reliable local and long-distance services throughout Pulaski County.'
    desc3 = 'Local Pulaski County mover with careful residential relocations and packing services across rural mountain communities.'
    desc4 = 'New River Valley specialist for hillside and rural residential moves across Pulaski County.'
    desc5 = 'Southwest Piedmont mover serving Dublin and Fairlawn area communities.'
  },
  @{
    slug = 'petersburg'
    city = 'Petersburg'
    citySlug = 'petersburg'
    countyName = 'Petersburg'
    countyMovingId = 'petersburg-local-moving-petersburg-va'
    countyMovingName = 'Petersburg Local Moving'
    regional1 = 'richmond-south'
    regional2 = 'appomattox-river'
    regional1Name = 'Richmond South Moving'
    regional2Name = 'Appomattox River Moving'
    label = 'Petersburg Metro'
    poolId = 'petersburg-metro-va'
    desc1 = 'Trusted Petersburg franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Petersburg mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Petersburg mover with careful residential relocations and packing services across historic and suburban neighborhoods.'
    desc4 = 'Richmond South specialist for Tri-Cities residential moves across Petersburg.'
    desc5 = 'Appomattox River corridor mover serving historic Petersburg communities.'
  },
  @{
    slug = 'halifax'
    city = 'Halifax'
    citySlug = 'halifax'
    countyName = 'Halifax'
    regional1 = 'southside-virginia'
    regional2 = 'banister-river'
    regional1Name = 'Southside Virginia Moving'
    regional2Name = 'Banister River Moving'
    label = 'Halifax Metro'
    poolId = 'halifax-metro-va'
    desc1 = 'Trusted Halifax franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Halifax mover known for reliable local and long-distance services throughout Halifax County.'
    desc3 = 'Local Halifax County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Southside Virginia specialist for rural residential moves across Halifax County.'
    desc5 = 'Banister River mover serving South Boston and Clover area communities.'
  },
  @{
    slug = 'powhatan'
    city = 'Powhatan'
    citySlug = 'powhatan'
    countyName = 'Powhatan'
    regional1 = 'richmond-west'
    regional2 = 'james-river-west'
    regional1Name = 'Richmond West Moving'
    regional2Name = 'James River West Moving'
    label = 'Powhatan Metro'
    poolId = 'powhatan-metro-va'
    desc1 = 'Trusted Powhatan franchise with excellent reputation for suburban residential moves west of Richmond.'
    desc2 = 'Established Powhatan mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Powhatan County mover with careful residential relocations and packing services across suburban and rural properties.'
    desc4 = 'Richmond West specialist for suburban residential moves across Powhatan County.'
    desc5 = 'James River West mover serving Powhatan Courthouse and western corridor communities.'
  },
  @{
    slug = 'amherst'
    city = 'Amherst'
    citySlug = 'amherst'
    countyName = 'Amherst'
    regional1 = 'lynchburg-area'
    regional2 = 'blue-ridge-foothills'
    regional1Name = 'Lynchburg Area Moving'
    regional2Name = 'Blue Ridge Foothills Moving'
    label = 'Amherst Metro'
    poolId = 'amherst-metro-va'
    desc1 = 'Trusted Amherst franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Amherst mover known for reliable local and long-distance services throughout Amherst County.'
    desc3 = 'Local Amherst County mover with careful residential relocations and packing services across rural and hillside properties.'
    desc4 = 'Lynchburg Area specialist for county residential moves across Amherst.'
    desc5 = 'Blue Ridge Foothills mover serving Madison Heights and northern Amherst communities.'
  },
  @{
    slug = 'fredericksburg'
    city = 'Fredericksburg'
    citySlug = 'fredericksburg'
    countyName = 'Fredericksburg'
    countyMovingId = 'fredericksburg-local-moving-fredericksburg-va'
    countyMovingName = 'Fredericksburg Local Moving'
    regional1 = 'i95-corridor'
    regional2 = 'historic-fredericksburg'
    regional1Name = 'I-95 Corridor Moving'
    regional2Name = 'Historic Fredericksburg Moving'
    label = 'Fredericksburg Metro'
    poolId = 'fredericksburg-metro-va'
    existingCatalogIds = @(
      'all-my-sons-fredericksburg-va',
      'college-hunks-moving-fredericksburg-va',
      'budd-van-lines-fredericksburg-va',
      'hercules-movers-fredericksburg-va',
      'krupp-moving-fredericksburg-va'
    )
    desc1 = 'Trusted Fredericksburg franchise with excellent reputation for residential and commercial moves across the I-95 corridor.'
    desc2 = 'Established Fredericksburg mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Fredericksburg mover with careful residential relocations and packing services across historic and suburban neighborhoods.'
    desc4 = 'I-95 Corridor specialist for suburban residential moves across Fredericksburg.'
    desc5 = 'Historic Fredericksburg mover serving Old Town and downtown corridor communities.'
  },
  @{
    slug = 'mecklenburg'
    city = 'Boydton'
    citySlug = 'boydton'
    countyName = 'Mecklenburg'
    regional1 = 'lake-country'
    regional2 = 'southside-lakes'
    regional1Name = 'Lake Country Moving'
    regional2Name = 'Southside Lakes Moving'
    label = 'Mecklenburg Metro'
    poolId = 'mecklenburg-metro-va'
    desc1 = 'Trusted Mecklenburg franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Boydton mover known for reliable local and long-distance services throughout Mecklenburg County.'
    desc3 = 'Local Mecklenburg County mover with careful residential relocations and packing services across rural lakefront properties.'
    desc4 = 'Lake Country specialist for Kerr Lake and rural residential moves across Mecklenburg County.'
    desc5 = 'Southside Lakes mover serving Boydton and Clarksville corridor communities.'
  },
  @{
    slug = 'king-george'
    city = 'King George'
    citySlug = 'king-george'
    countyName = 'King George'
    regional1 = 'northern-neck'
    regional2 = 'potomac-river'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Potomac River Moving'
    label = 'King George Metro'
    poolId = 'king-george-metro-va'
    desc1 = 'Trusted King George franchise with excellent reputation for suburban residential moves in Northern Virginia.'
    desc2 = 'Established King George mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local King George County mover with careful residential relocations and packing services across suburban and rural neighborhoods.'
    desc4 = 'Northern Neck specialist for suburban residential moves across King George County.'
    desc5 = 'Potomac River corridor mover serving Dahlgren and Naval Support Facility adjacent communities.'
  },
  @{
    slug = 'goochland'
    city = 'Goochland'
    citySlug = 'goochland'
    countyName = 'Goochland'
    regional1 = 'richmond-west'
    regional2 = 'james-river-corridor'
    regional1Name = 'Richmond West Moving'
    regional2Name = 'James River Corridor Moving'
    label = 'Goochland Metro'
    poolId = 'goochland-metro-va'
    desc1 = 'Trusted Goochland franchise with excellent reputation for suburban residential moves west of Richmond.'
    desc2 = 'Established Goochland mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Goochland County mover with careful residential relocations and packing services across suburban and rural estates.'
    desc4 = 'Richmond West specialist for suburban residential moves across Goochland County.'
    desc5 = 'James River Corridor mover serving western Goochland and Manakin-Sabot communities.'
  },
  @{
    slug = 'carroll'
    city = 'Hillsville'
    citySlug = 'hillsville'
    countyName = 'Carroll'
    regional1 = 'blue-ridge-highlands'
    regional2 = 'floyd-carroll'
    regional1Name = 'Blue Ridge Highlands Moving'
    regional2Name = 'Floyd Carroll Moving'
    label = 'Carroll Metro'
    poolId = 'carroll-metro-va'
    desc1 = 'Trusted Carroll franchise with excellent reputation for residential moves across Southwest Virginia highlands.'
    desc2 = 'Established Hillsville mover known for reliable local and long-distance services throughout Carroll County.'
    desc3 = 'Local Carroll County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Blue Ridge Highlands specialist for hillside and rural residential moves across Carroll County.'
    desc5 = 'Floyd Carroll corridor mover serving Hillsville and Galax area communities.'
  },
  @{
    slug = 'fluvanna'
    city = 'Palmyra'
    citySlug = 'palmyra'
    countyName = 'Fluvanna'
    regional1 = 'central-virginia'
    regional2 = 'james-river-east'
    regional1Name = 'Central Virginia Moving'
    regional2Name = 'James River East Moving'
    label = 'Fluvanna Metro'
    poolId = 'fluvanna-metro-va'
    desc1 = 'Trusted Fluvanna franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Palmyra mover known for reliable local and long-distance services throughout Fluvanna County.'
    desc3 = 'Local Fluvanna County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Central Virginia specialist for rural residential moves across Fluvanna County.'
    desc5 = 'James River East mover serving Palmyra and Lake Monticello corridor communities.'
  },
  @{
    slug = 'dinwiddie'
    city = 'Dinwiddie'
    citySlug = 'dinwiddie'
    countyName = 'Dinwiddie'
    regional1 = 'richmond-south'
    regional2 = 'i85-corridor'
    regional1Name = 'Richmond South Moving'
    regional2Name = 'I-85 Corridor Moving'
    label = 'Dinwiddie Metro'
    poolId = 'dinwiddie-metro-va'
    desc1 = 'Trusted Dinwiddie franchise with excellent reputation for residential moves south of Richmond.'
    desc2 = 'Established Dinwiddie mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Dinwiddie County mover with careful residential relocations and packing services across suburban and rural areas.'
    desc4 = 'Richmond South specialist for Tri-Cities corridor residential moves across Dinwiddie County.'
    desc5 = 'I-85 Corridor mover serving McKenney and southern Dinwiddie communities.'
  },
  @{
    slug = 'new-kent'
    city = 'New Kent'
    citySlug = 'new-kent'
    countyName = 'New Kent'
    regional1 = 'richmond-east'
    regional2 = 'colonial-corridor'
    regional1Name = 'Richmond East Moving'
    regional2Name = 'Colonial Corridor Moving'
    label = 'New Kent Metro'
    poolId = 'new-kent-metro-va'
    desc1 = 'Trusted New Kent franchise with excellent reputation for suburban residential moves east of Richmond.'
    desc2 = 'Established New Kent mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local New Kent County mover with careful residential relocations and packing services across suburban and rural neighborhoods.'
    desc4 = 'Richmond East specialist for suburban residential moves across New Kent County.'
    desc5 = 'Colonial Corridor mover serving Quinton and Providence Forge communities.'
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

$outDir = Join-Path $PSScriptRoot 'va-batch7-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
$assignmentLines -join "`n" | Set-Content (Join-Path $outDir 'assignments-snippet.txt') -Encoding UTF8
Write-Host "Generated VA batch 7 catalog ($($counties.Count) locations, $($moverLines.Count) new movers)"