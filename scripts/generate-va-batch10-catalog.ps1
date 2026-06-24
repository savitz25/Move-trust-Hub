# Generates Virginia batch 10 catalog movers + metro pools for the final 16 localities
$counties = @(
  @{
    slug = 'greene'
    city = 'Stanardsville'
    citySlug = 'stanardsville'
    countyName = 'Greene'
    regional1 = 'shenandoah-east'
    regional2 = 'blue-ridge-piedmont'
    regional1Name = 'Shenandoah East Moving'
    regional2Name = 'Blue Ridge Piedmont Moving'
    label = 'Stanardsville Metro'
    poolId = 'greene-metro-va'
    desc1 = 'Trusted Greene County franchise with excellent reputation for residential moves across Stanardsville and the Shenandoah Valley.'
    desc2 = 'Established Stanardsville mover known for reliable local and long-distance services throughout Greene County.'
    desc3 = 'Local Greene County mover with careful residential relocations and packing services across rural valley properties.'
    desc4 = 'Shenandoah East specialist for Skyline Drive corridor and suburban residential moves.'
    desc5 = 'Blue Ridge Piedmont mover serving Stanardsville and Ruckersville area communities.'
  },
  @{
    slug = 'hopewell'
    city = 'Hopewell'
    citySlug = 'hopewell'
    countyName = 'Hopewell'
    countyMovingId = 'hopewell-local-moving-hopewell-va'
    countyMovingName = 'Hopewell Local Moving'
    regional1 = 'richmond-southside'
    regional2 = 'fort-lee-corridor'
    regional1Name = 'Richmond Southside Moving'
    regional2Name = 'Fort Lee Corridor Moving'
    label = 'Hopewell Metro'
    poolId = 'hopewell-metro-va'
    desc1 = 'Trusted Hopewell franchise with excellent reputation for residential moves across the James River industrial corridor.'
    desc2 = 'Established Hopewell mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Hopewell mover with careful residential relocations and packing services across riverfront neighborhoods.'
    desc4 = 'Richmond Southside specialist for industrial corridor and suburban residential moves.'
    desc5 = 'Fort Lee Corridor mover serving Hopewell and Prince George spillover communities.'
  },
  @{
    slug = 'king-william'
    city = 'King William'
    citySlug = 'king-william'
    countyName = 'King William'
    regional1 = 'pamunkey-river'
    regional2 = 'richmond-east'
    regional1Name = 'Pamunkey River Moving'
    regional2Name = 'Richmond East Moving'
    label = 'King William Metro'
    poolId = 'king-william-metro-va'
    desc1 = 'Trusted King William County franchise with excellent reputation for residential moves east of Richmond.'
    desc2 = 'Established King William mover known for reliable local and long-distance services throughout the county.'
    desc3 = 'Local King William County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Pamunkey River specialist for waterfront and rural residential moves across King William County.'
    desc5 = 'Richmond East mover serving Aylett and West Point corridor communities.'
  },
  @{
    slug = 'lee'
    city = 'Jonesville'
    citySlug = 'jonesville'
    countyName = 'Lee'
    regional1 = 'appalachian-southwest'
    regional2 = 'powell-valley'
    regional1Name = 'Appalachian Southwest Moving'
    regional2Name = 'Powell Valley Moving'
    label = 'Jonesville Metro'
    poolId = 'lee-metro-va'
    desc1 = 'Trusted Lee County franchise with excellent reputation for residential moves across far Southwest Virginia.'
    desc2 = 'Established Jonesville mover known for reliable local and long-distance services throughout Lee County.'
    desc3 = 'Local Lee County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Appalachian Southwest specialist for rural and hillside residential moves across Lee County.'
    desc5 = 'Powell Valley corridor mover serving Jonesville and Pennington Gap area communities.'
  },
  @{
    slug = 'page'
    city = 'Luray'
    citySlug = 'luray'
    countyName = 'Page'
    regional1 = 'shenandoah-north'
    regional2 = 'skyline-drive'
    regional1Name = 'Shenandoah North Moving'
    regional2Name = 'Skyline Drive Moving'
    label = 'Luray Metro'
    poolId = 'page-metro-va'
    desc1 = 'Trusted Page County franchise with excellent reputation for residential moves across Luray and Shenandoah National Park gateway communities.'
    desc2 = 'Established Luray mover known for reliable local and long-distance services throughout Page County.'
    desc3 = 'Local Page County mover with careful residential relocations and packing services across valley and tourism-area properties.'
    desc4 = 'Shenandoah North specialist for tourism and rural residential moves across Page County.'
    desc5 = 'Skyline Drive corridor mover serving Luray and Stanley area communities.'
  },
  @{
    slug = 'prince-edward'
    city = 'Farmville'
    citySlug = 'farmville'
    countyName = 'Prince Edward'
    regional1 = 'southside-central'
    regional2 = 'longwood-area'
    regional1Name = 'Southside Central Moving'
    regional2Name = 'Longwood Area Moving'
    label = 'Farmville Metro'
    poolId = 'prince-edward-metro-va'
    desc1 = 'Trusted Prince Edward County franchise with excellent reputation for residential moves across Farmville and Central Virginia.'
    desc2 = 'Established Farmville mover known for reliable local and long-distance services throughout Prince Edward County.'
    desc3 = 'Local Prince Edward County mover with careful residential relocations and packing services across university and rural neighborhoods.'
    desc4 = 'Southside Central specialist for residential moves across Farmville and surrounding communities.'
    desc5 = 'Longwood Area mover serving university district and rural Prince Edward County properties.'
  },
  @{
    slug = 'rockbridge'
    city = 'Lexington'
    citySlug = 'lexington'
    countyName = 'Rockbridge'
    regional1 = 'shenandoah-valley-south'
    regional2 = 'blue-ridge-highlands'
    regional1Name = 'Shenandoah Valley South Moving'
    regional2Name = 'Blue Ridge Highlands Moving'
    label = 'Lexington Metro'
    poolId = 'rockbridge-metro-va'
    desc1 = 'Trusted Rockbridge County franchise with excellent reputation for residential moves across Lexington and the southern Shenandoah Valley.'
    desc2 = 'Established Lexington mover known for reliable local and long-distance services throughout Rockbridge County.'
    desc3 = 'Local Rockbridge County mover with careful residential relocations and packing services across historic and rural properties.'
    desc4 = 'Shenandoah Valley South specialist for VMI/W&L area and rural residential moves.'
    desc5 = 'Blue Ridge Highlands mover serving Lexington and Goshen Pass corridor communities.'
  },
  @{
    slug = 'russell'
    city = 'Lebanon'
    citySlug = 'lebanon'
    countyName = 'Russell'
    regional1 = 'coalfields-southwest'
    regional2 = 'clinch-valley'
    regional1Name = 'Coalfields Southwest Moving'
    regional2Name = 'Clinch Valley Moving'
    label = 'Lebanon Metro'
    poolId = 'russell-metro-va'
    desc1 = 'Trusted Russell County franchise with excellent reputation for residential moves across Lebanon and Southwest Virginia.'
    desc2 = 'Established Lebanon mover known for reliable local and long-distance services throughout Russell County.'
    desc3 = 'Local Russell County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Coalfields Southwest specialist for rural and hillside residential moves across Russell County.'
    desc5 = 'Clinch Valley corridor mover serving Lebanon and Cleveland area communities.'
  },
  @{
    slug = 'salem'
    city = 'Salem'
    citySlug = 'salem'
    countyName = 'Salem'
    countyMovingId = 'salem-local-moving-salem-va'
    countyMovingName = 'Salem Local Moving'
    regional1 = 'roanoke-valley'
    regional2 = 'blue-ridge-south'
    regional1Name = 'Roanoke Valley Moving'
    regional2Name = 'Blue Ridge South Moving'
    label = 'Salem Metro'
    poolId = 'salem-metro-va'
    existingCatalogIds = @(
      'all-my-sons-salem-va',
      'college-hunks-moving-salem-va',
      'budd-van-lines-salem-va',
      'hercules-movers-salem-va',
      'krupp-moving-salem-va'
    )
    desc1 = 'Trusted Salem franchise with excellent reputation for residential moves across the Roanoke Valley.'
    desc2 = 'Established Salem mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Salem mover with careful residential relocations and packing services across suburban neighborhoods.'
    desc4 = 'Roanoke Valley specialist for residential moves across Salem and surrounding communities.'
    desc5 = 'Blue Ridge South mover serving Salem and Roanoke County spillover areas.'
  },
  @{
    slug = 'scott'
    city = 'Gate City'
    citySlug = 'gate-city'
    countyName = 'Scott'
    regional1 = 'appalachian-border'
    regional2 = 'mountain-empire'
    regional1Name = 'Appalachian Border Moving'
    regional2Name = 'Mountain Empire Moving'
    label = 'Gate City Metro'
    poolId = 'scott-metro-va'
    desc1 = 'Trusted Scott County franchise with excellent reputation for residential moves across Gate City and far Southwest Virginia.'
    desc2 = 'Established Gate City mover known for reliable local and long-distance services throughout Scott County.'
    desc3 = 'Local Scott County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Appalachian Border specialist for rural and hillside residential moves across Scott County.'
    desc5 = 'Mountain Empire corridor mover serving Gate City and Weber City area communities.'
  },
  @{
    slug = 'smyth'
    city = 'Marion'
    citySlug = 'marion'
    countyName = 'Smyth'
    regional1 = 'mountain-southwest'
    regional2 = 'interstate-81-south'
    regional1Name = 'Mountain Southwest Moving'
    regional2Name = 'I-81 South Moving'
    label = 'Marion Metro'
    poolId = 'smyth-metro-va'
    desc1 = 'Trusted Smyth County franchise with excellent reputation for residential moves across Marion and Southwest Virginia.'
    desc2 = 'Established Marion mover known for reliable local and long-distance services throughout Smyth County.'
    desc3 = 'Local Smyth County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'Mountain Southwest specialist for rural and hillside residential moves across Smyth County.'
    desc5 = 'I-81 South corridor mover serving Marion and Chilhowie area communities.'
  },
  @{
    slug = 'staunton'
    city = 'Staunton'
    citySlug = 'staunton'
    countyName = 'Staunton'
    countyMovingId = 'staunton-local-moving-staunton-va'
    countyMovingName = 'Staunton Local Moving'
    regional1 = 'shenandoah-valley-core'
    regional2 = 'historic-staunton'
    regional1Name = 'Shenandoah Valley Core Moving'
    regional2Name = 'Historic Staunton Moving'
    label = 'Staunton Metro'
    poolId = 'staunton-metro-va'
    existingCatalogIds = @(
      'all-my-sons-staunton-va',
      'college-hunks-moving-staunton-va',
      'budd-van-lines-staunton-va',
      'hercules-movers-staunton-va',
      'krupp-moving-staunton-va'
    )
    desc1 = 'Trusted Staunton franchise with excellent reputation for residential moves across the Shenandoah Valley.'
    desc2 = 'Established Staunton mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Staunton mover with careful residential relocations and packing services across historic downtown and suburban neighborhoods.'
    desc4 = 'Shenandoah Valley Core specialist for residential moves across Staunton and Augusta County spillover.'
    desc5 = 'Historic Staunton mover serving downtown and Gypsy Hill corridor communities.'
  },
  @{
    slug = 'waynesboro'
    city = 'Waynesboro'
    citySlug = 'waynesboro'
    countyName = 'Waynesboro'
    countyMovingId = 'waynesboro-local-moving-waynesboro-va'
    countyMovingName = 'Waynesboro Local Moving'
    regional1 = 'shenandoah-valley-east'
    regional2 = 'blue-ridge-parkway'
    regional1Name = 'Shenandoah Valley East Moving'
    regional2Name = 'Blue Ridge Parkway Moving'
    label = 'Waynesboro Metro'
    poolId = 'waynesboro-metro-va'
    desc1 = 'Trusted Waynesboro franchise with excellent reputation for residential moves across the eastern Shenandoah Valley.'
    desc2 = 'Established Waynesboro mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Waynesboro mover with careful residential relocations and packing services across suburban and hillside neighborhoods.'
    desc4 = 'Shenandoah Valley East specialist for residential moves across Waynesboro and Augusta County spillover.'
    desc5 = 'Blue Ridge Parkway corridor mover serving Waynesboro and Basic City area communities.'
  },
  @{
    slug = 'westmoreland'
    city = 'Montross'
    citySlug = 'montross'
    countyName = 'Westmoreland'
    regional1 = 'northern-neck'
    regional2 = 'potomac-river'
    regional1Name = 'Northern Neck Moving'
    regional2Name = 'Potomac River Moving'
    label = 'Montross Metro'
    poolId = 'westmoreland-metro-va'
    desc1 = 'Trusted Westmoreland County franchise with excellent reputation for residential moves across the Northern Neck.'
    desc2 = 'Established Montross mover known for reliable local and long-distance services throughout Westmoreland County.'
    desc3 = 'Local Westmoreland County mover with careful residential relocations and packing services across waterfront and rural properties.'
    desc4 = 'Northern Neck specialist for waterfront and rural residential moves across Westmoreland County.'
    desc5 = 'Potomac River corridor mover serving Montross and Colonial Beach area communities.'
  },
  @{
    slug = 'winchester'
    city = 'Winchester'
    citySlug = 'winchester'
    countyName = 'Winchester'
    countyMovingId = 'winchester-local-moving-winchester-va'
    countyMovingName = 'Winchester Local Moving'
    regional1 = 'northern-shenandoah'
    regional2 = 'i81-north'
    regional1Name = 'Northern Shenandoah Moving'
    regional2Name = 'I-81 North Moving'
    label = 'Winchester Metro'
    poolId = 'winchester-metro-va'
    existingCatalogIds = @(
      'all-my-sons-winchester-va',
      'college-hunks-moving-winchester-va',
      'budd-van-lines-winchester-va',
      'hercules-movers-winchester-va',
      'krupp-moving-winchester-va'
    )
    desc1 = 'Trusted Winchester franchise with excellent reputation for residential moves across the northern Shenandoah Valley.'
    desc2 = 'Established Winchester mover known for reliable local and long-distance services throughout the independent city.'
    desc3 = 'Local Winchester mover with careful residential relocations and packing services across historic downtown and suburban neighborhoods.'
    desc4 = 'Northern Shenandoah specialist for residential moves across Winchester and Frederick County spillover.'
    desc5 = 'I-81 North corridor mover serving Winchester and Stephens City area communities.'
  },
  @{
    slug = 'wythe'
    city = 'Wytheville'
    citySlug = 'wytheville'
    countyName = 'Wythe'
    regional1 = 'new-river-plateau'
    regional2 = 'interstate-77-south'
    regional1Name = 'New River Plateau Moving'
    regional2Name = 'I-77 South Moving'
    label = 'Wytheville Metro'
    poolId = 'wythe-metro-va'
    desc1 = 'Trusted Wythe County franchise with excellent reputation for residential moves across Wytheville and Southwest Virginia.'
    desc2 = 'Established Wytheville mover known for reliable local and long-distance services throughout Wythe County.'
    desc3 = 'Local Wythe County mover with careful residential relocations and packing services across mountain communities.'
    desc4 = 'New River Plateau specialist for rural and hillside residential moves across Wythe County.'
    desc5 = 'I-77 South corridor mover serving Wytheville and Rural Retreat area communities.'
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

$outDir = Join-Path $PSScriptRoot 'va-batch10-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$utf8 = New-Object System.Text.UTF8Encoding $false
[System.IO.File]::WriteAllText((Join-Path $outDir 'catalog-movers.txt'), ($moverLines -join "`n"), $utf8)
[System.IO.File]::WriteAllText((Join-Path $outDir 'metro-pools.txt'), ($poolLines -join "`n"), $utf8)
[System.IO.File]::WriteAllText((Join-Path $outDir 'assignments-snippet.txt'), ($assignmentLines -join "`n"), $utf8)
Write-Host "Generated VA batch 10 catalog ($($counties.Count) locations, $($moverLines.Count) new movers)"