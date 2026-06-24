# Generates Virginia batch 6 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'washington'
    city = 'Abingdon'
    citySlug = 'abingdon'
    countyName = 'Washington'
    regional1 = 'southwest-virginia'
    regional2 = 'blue-ridge-southwest'
    regional1Name = 'Southwest Virginia Moving'
    regional2Name = 'Blue Ridge Southwest Moving'
    label = 'Abingdon Metro'
    poolId = 'washington-metro-va'
    desc1 = 'Trusted Washington County franchise with excellent reputation for residential moves across Abingdon and Southwest Virginia.'
    desc2 = 'Established Abingdon mover known for reliable local and long-distance services throughout Washington County.'
    desc3 = 'Local Washington County mover with careful residential relocations and packing services across rural mountain communities.'
    desc4 = 'Southwest Virginia specialist for residential moves across Abingdon and surrounding Appalachian communities.'
    desc5 = 'Blue Ridge Southwest mover serving Abingdon and county subdivisions with full-service relocations.'
  },
  @{
    slug = 'harrisonburg'
    city = 'Harrisonburg'
    citySlug = 'harrisonburg'
    countyName = 'Harrisonburg'
    countyMovingId = 'harrisonburg-local-moving-harrisonburg-va'
    countyMovingName = 'Harrisonburg Local Moving'
    regional1 = 'jmu-district'
    regional2 = 'valley-core'
    regional1Name = 'JMU District Moving'
    regional2Name = 'Valley Core Moving'
    label = 'Harrisonburg Metro'
    poolId = 'harrisonburg-metro-va'
    existingCatalogIds = @(
      'all-my-sons-harrisonburg-va',
      'college-hunks-moving-harrisonburg-va',
      'budd-van-lines-harrisonburg-va',
      'hercules-movers-harrisonburg-va',
      'krupp-moving-harrisonburg-va'
    )
    desc1 = 'Trusted Harrisonburg franchise with excellent reputation for residential and commercial moves across the Shenandoah Valley.'
    desc2 = 'Established Harrisonburg mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Harrisonburg mover with careful residential relocations and packing services across university and downtown neighborhoods.'
    desc4 = 'JMU District specialist for student and residential moves across Harrisonburg.'
    desc5 = 'Valley Core mover serving downtown Harrisonburg and surrounding Shenandoah Valley communities.'
  },
  @{
    slug = 'henry'
    city = 'Martinsville'
    citySlug = 'martinsville'
    countyName = 'Henry'
    regional1 = 'martinsville-area'
    regional2 = 'southside-piedmont'
    regional1Name = 'Martinsville Area Moving'
    regional2Name = 'Southside Piedmont Moving'
    label = 'Martinsville Metro'
    poolId = 'henry-metro-va'
    desc1 = 'Trusted Henry County franchise with excellent reputation for residential moves across Martinsville and Southside Virginia.'
    desc2 = 'Established Martinsville mover known for reliable local and long-distance services throughout Henry County.'
    desc3 = 'Local Henry County mover with careful residential relocations and packing services across rural and suburban areas.'
    desc4 = 'Martinsville Area specialist for South Central Virginia residential moves.'
    desc5 = 'Southside Piedmont mover serving Henry County communities with full-service relocations.'
  },
  @{
    slug = 'shenandoah'
    city = 'Woodstock'
    citySlug = 'woodstock'
    countyName = 'Shenandoah'
    regional1 = 'shenandoah-valley-north'
    regional2 = 'i81-corridor'
    regional1Name = 'Shenandoah Valley North Moving'
    regional2Name = 'I-81 Corridor Moving'
    label = 'Woodstock Metro'
    poolId = 'shenandoah-metro-va'
    desc1 = 'Trusted Shenandoah County franchise with excellent reputation for residential moves across Woodstock and the northern valley.'
    desc2 = 'Established Woodstock mover known for reliable local and long-distance services throughout Shenandoah County.'
    desc3 = 'Local Shenandoah County mover with careful residential relocations and packing services across rural valley properties.'
    desc4 = 'Shenandoah Valley North specialist for agricultural and suburban residential moves.'
    desc5 = 'I-81 Corridor mover serving Woodstock and Strasburg area communities.'
  },
  @{
    slug = 'manassas'
    city = 'Manassas'
    citySlug = 'manassas'
    countyName = 'Manassas'
    countyMovingId = 'manassas-local-moving-manassas-va'
    countyMovingName = 'Manassas Local Moving'
    regional1 = 'nova-central'
    regional2 = 'historic-manassas'
    regional1Name = 'NOVA Central Moving'
    regional2Name = 'Historic Manassas Moving'
    label = 'Manassas Metro'
    poolId = 'manassas-metro-va'
    existingCatalogIds = @(
      'all-my-sons-manassas-va',
      'college-hunks-moving-manassas-va',
      'budd-van-lines-manassas-va',
      'hercules-movers-manassas-va',
      'krupp-moving-manassas-va'
    )
    desc1 = 'Trusted Manassas franchise with excellent reputation for suburban residential moves across Northern Virginia.'
    desc2 = 'Established Manassas mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Manassas mover with careful residential relocations and packing services across historic and suburban neighborhoods.'
    desc4 = 'NOVA Central specialist for suburban residential moves across Manassas and the DC metro fringe.'
    desc5 = 'Historic Manassas mover serving Old Town and surrounding Prince William corridor communities.'
  },
  @{
    slug = 'charlottesville'
    city = 'Charlottesville'
    citySlug = 'charlottesville'
    countyName = 'Charlottesville'
    countyMovingId = 'charlottesville-local-moving-charlottesville-va'
    countyMovingName = 'Charlottesville Local Moving'
    regional1 = 'uva-district'
    regional2 = 'downtown-charlottesville'
    regional1Name = 'UVA District Moving'
    regional2Name = 'Downtown Charlottesville Moving'
    label = 'Charlottesville Metro'
    poolId = 'charlottesville-metro-va'
    existingCatalogIds = @(
      'all-my-sons-charlottesville-va',
      'college-hunks-moving-charlottesville-va',
      'budd-van-lines-charlottesville-va',
      'hercules-movers-charlottesville-va',
      'krupp-moving-charlottesville-va'
    )
    desc1 = 'Trusted Charlottesville franchise with excellent reputation for residential and commercial moves across Central Virginia.'
    desc2 = 'Established Charlottesville mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Charlottesville mover with careful residential relocations and packing services across university and downtown neighborhoods.'
    desc4 = 'UVA District specialist for student and residential moves across Charlottesville.'
    desc5 = 'Downtown Charlottesville mover serving the historic downtown and Belmont corridor communities.'
  },
  @{
    slug = 'prince-george'
    city = 'Prince George'
    citySlug = 'prince-george'
    countyName = 'Prince George'
    regional1 = 'richmond-south'
    regional2 = 'fort-lee-area'
    regional1Name = 'Richmond South Moving'
    regional2Name = 'Fort Lee Area Moving'
    label = 'Prince George Metro'
    poolId = 'prince-george-metro-va'
    desc1 = 'Trusted Prince George franchise with excellent reputation for suburban residential moves south of Richmond.'
    desc2 = 'Established Prince George mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Prince George County mover with careful residential relocations and packing services across suburban and industrial corridors.'
    desc4 = 'Richmond South specialist for suburban residential moves across Prince George County.'
    desc5 = 'Fort Lee Area mover serving military-adjacent Prince George communities with full-service relocations.'
  },
  @{
    slug = 'louisa'
    city = 'Louisa'
    citySlug = 'louisa'
    countyName = 'Louisa'
    regional1 = 'lake-anna'
    regional2 = 'central-virginia'
    regional1Name = 'Lake Anna Moving'
    regional2Name = 'Central Virginia Moving'
    label = 'Louisa Metro'
    poolId = 'louisa-metro-va'
    desc1 = 'Trusted Louisa County franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Louisa mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Louisa County mover with careful residential relocations and packing services across rural and lakefront properties.'
    desc4 = 'Lake Anna specialist for waterfront and rural residential moves across Louisa County.'
    desc5 = 'Central Virginia mover serving Louisa and Mineral area communities.'
  },
  @{
    slug = 'warren'
    city = 'Front Royal'
    citySlug = 'front-royal'
    countyName = 'Warren'
    regional1 = 'shenandoah-north'
    regional2 = 'skyline-drive'
    regional1Name = 'Shenandoah North Moving'
    regional2Name = 'Skyline Drive Moving'
    label = 'Front Royal Metro'
    poolId = 'warren-metro-va'
    desc1 = 'Trusted Warren County franchise with excellent reputation for suburban residential moves across Front Royal.'
    desc2 = 'Established Front Royal mover known for reliable local and long-distance services throughout Warren County.'
    desc3 = 'Local Warren County mover with careful residential relocations and packing services across suburban and rural areas.'
    desc4 = 'Shenandoah North specialist for Northern Virginia fringe residential moves across Warren County.'
    desc5 = 'Skyline Drive corridor mover serving Front Royal and Linden communities.'
  },
  @{
    slug = 'isle-of-wight'
    city = 'Isle of Wight'
    citySlug = 'isle-of-wight'
    countyName = 'Isle of Wight'
    regional1 = 'hampton-roads-west'
    regional2 = 'peninsula-rural'
    regional1Name = 'Hampton Roads West Moving'
    regional2Name = 'Peninsula Rural Moving'
    label = 'Isle of Wight Metro'
    poolId = 'isle-of-wight-metro-va'
    desc1 = 'Trusted Isle of Wight franchise with excellent reputation for residential moves across the Virginia Peninsula.'
    desc2 = 'Established Isle of Wight mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Isle of Wight County mover with careful residential relocations and packing services across suburban and rural neighborhoods.'
    desc4 = 'Hampton Roads West specialist for peninsula residential moves across Isle of Wight County.'
    desc5 = 'Peninsula Rural mover serving Smithfield and Windsor corridor communities.'
  },
  @{
    slug = 'danville'
    city = 'Danville'
    citySlug = 'danville'
    countyName = 'Danville'
    countyMovingId = 'danville-local-moving-danville-va'
    countyMovingName = 'Danville Local Moving'
    regional1 = 'dan-river'
    regional2 = 'southside-central'
    regional1Name = 'Dan River Moving'
    regional2Name = 'Southside Central Moving'
    label = 'Danville Metro'
    poolId = 'danville-metro-va'
    desc1 = 'Trusted Danville franchise with excellent reputation for residential moves across South Central Virginia.'
    desc2 = 'Established Danville mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Danville mover with careful residential relocations and packing services across downtown and suburban neighborhoods.'
    desc4 = 'Dan River specialist for riverfront and suburban residential moves across Danville.'
    desc5 = 'Southside Central mover serving Danville and Pittsylvania corridor communities.'
  },
  @{
    slug = 'orange'
    city = 'Orange'
    citySlug = 'orange'
    countyName = 'Orange'
    regional1 = 'central-piedmont'
    regional2 = 'montpelier-area'
    regional1Name = 'Central Piedmont Moving'
    regional2Name = 'Montpelier Area Moving'
    label = 'Orange Metro'
    poolId = 'orange-metro-va'
    desc1 = 'Trusted Orange County franchise with excellent reputation for residential moves across Central Virginia piedmont.'
    desc2 = 'Established Orange mover known for reliable local and long-distance services throughout Orange County.'
    desc3 = 'Local Orange County mover with careful residential relocations and packing services across rural and suburban properties.'
    desc4 = 'Central Piedmont specialist for rural and suburban residential moves across Orange County.'
    desc5 = 'Montpelier Area mover serving Gordonsville and eastern Orange communities.'
  },
  @{
    slug = 'gloucester'
    city = 'Gloucester'
    citySlug = 'gloucester'
    countyName = 'Gloucester'
    regional1 = 'middle-peninsula'
    regional2 = 'york-river'
    regional1Name = 'Middle Peninsula Moving'
    regional2Name = 'York River Moving'
    label = 'Gloucester Metro'
    poolId = 'gloucester-metro-va'
    desc1 = 'Trusted Gloucester County franchise with excellent reputation for residential moves across the Middle Peninsula.'
    desc2 = 'Established Gloucester mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Gloucester County mover with careful residential relocations and packing services across waterfront and rural neighborhoods.'
    desc4 = 'Middle Peninsula specialist for coastal and rural residential moves across Gloucester County.'
    desc5 = 'York River corridor mover serving Gloucester Courthouse and Hayes communities.'
  },
  @{
    slug = 'tazewell'
    city = 'Tazewell'
    citySlug = 'tazewell'
    countyName = 'Tazewell'
    regional1 = 'coalfields'
    regional2 = 'clinch-valley'
    regional1Name = 'Coalfields Moving'
    regional2Name = 'Clinch Valley Moving'
    label = 'Tazewell Metro'
    poolId = 'tazewell-metro-va'
    desc1 = 'Trusted Tazewell County franchise with excellent reputation for residential moves across Southwest Virginia.'
    desc2 = 'Established Tazewell mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Tazewell County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Coalfields specialist for rural and hillside residential moves across Tazewell County.'
    desc5 = 'Clinch Valley mover serving Richlands and Cedar Bluff area communities.'
  },
  @{
    slug = 'caroline'
    city = 'Bowling Green'
    citySlug = 'bowling-green'
    countyName = 'Caroline'
    regional1 = 'northern-neck'
    regional2 = 'rappahannock-east'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Rappahannock East Moving'
    label = 'Caroline Metro'
    poolId = 'caroline-metro-va'
    desc1 = 'Trusted Caroline County franchise with excellent reputation for residential moves across Central Virginia.'
    desc2 = 'Established Bowling Green mover known for reliable local and long-distance services throughout Caroline County.'
    desc3 = 'Local Caroline County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Northern Neck specialist for rural residential moves across Caroline County.'
    desc5 = 'Rappahannock East mover serving Bowling Green and Ladysmith corridor communities.'
  },
  @{
    slug = 'wise'
    city = 'Wise'
    citySlug = 'wise'
    countyName = 'Wise'
    regional1 = 'coalfields-north'
    regional2 = 'pound-river'
    regional1Name = 'Coalfields North Moving'
    regional2Name = 'Pound River Moving'
    label = 'Wise Metro'
    poolId = 'wise-metro-va'
    desc1 = 'Trusted Wise County franchise with excellent reputation for residential moves across Southwest Virginia.'
    desc2 = 'Established Wise mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local Wise County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Coalfields North specialist for rural and hillside residential moves across Wise County.'
    desc5 = 'Pound River corridor mover serving Norton and Big Stone Gap area communities.'
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

  $assignIdList = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines.Add(@"
  ${slug}: [
$assignIdList
  ],
"@)
}

$outDir = Join-Path $PSScriptRoot 'va-batch6-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
$assignmentLines -join "`n" | Set-Content (Join-Path $outDir 'assignments-snippet.txt') -Encoding UTF8
Write-Host "Generated VA batch 6 catalog ($($counties.Count) locations, $($moverLines.Count) new movers)"