# Generates Virginia batch 3 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'henrico'
    city = 'Henrico'
    citySlug = 'henrico'
    countyName = 'Henrico'
    regional1 = 'short-pump'
    regional2 = 'richmond-west-end'
    regional1Name = 'Short Pump Moving'
    regional2Name = 'Richmond West End Moving'
    label = 'Henrico Metro'
    poolId = 'henrico-metro-va'
    desc1 = 'Trusted Henrico franchise with excellent reputation for suburban residential and commercial moves across the Richmond west end.'
    desc2 = 'Established Henrico mover known for reliable local and long-distance services throughout the Richmond metro.'
    desc3 = 'Local Henrico County mover with careful residential relocations and packing services across Short Pump and Glen Allen.'
    desc4 = 'Short Pump-area mover serving western Henrico County with full-service residential and townhome relocations.'
    desc5 = 'Richmond West End specialist for suburban residential moves across Henrico County.'
  },
  @{
    slug = 'chesapeake'
    city = 'Chesapeake'
    citySlug = 'chesapeake'
    countyName = 'Chesapeake'
    countyMovingId = 'chesapeake-local-moving-chesapeake-va'
    countyMovingName = 'Chesapeake Local Moving'
    regional1 = 'great-bridge'
    regional2 = 'tidewater-south'
    regional1Name = 'Great Bridge Moving'
    regional2Name = 'Tidewater South Moving'
    label = 'Chesapeake Metro'
    poolId = 'chesapeake-metro-va'
    desc1 = 'Trusted Chesapeake franchise with excellent reputation for residential and commercial moves across Hampton Roads.'
    desc2 = 'Established Chesapeake mover known for reliable local and long-distance services throughout coastal Virginia.'
    desc3 = 'Local Chesapeake mover with careful residential relocations and packing services across Greenbrier and Great Bridge.'
    desc4 = 'Great Bridge-area mover serving southern Chesapeake with full-service residential and military relocations.'
    desc5 = 'Tidewater South specialist for suburban and industrial corridor moves across Chesapeake.'
  },
  @{
    slug = 'arlington'
    city = 'Arlington'
    citySlug = 'arlington'
    countyName = 'Arlington'
    regional1 = 'crystal-city'
    regional2 = 'dc-metro-arlington'
    regional1Name = 'Crystal City Moving'
    regional2Name = 'DC Metro Arlington Moving'
    label = 'Arlington Metro'
    poolId = 'arlington-metro-va'
    desc1 = 'Trusted Arlington franchise with excellent reputation for urban residential and commercial moves across Northern Virginia.'
    desc2 = 'Established Arlington mover known for reliable local and long-distance services throughout the DC metro.'
    desc3 = 'Local Arlington County mover with careful residential relocations and packing services across Rosslyn and Ballston.'
    desc4 = 'Crystal City-area mover serving Pentagon City and Potomac corridor communities with full-service relocations.'
    desc5 = 'DC Metro Arlington specialist for dense urban and high-rise residential moves.'
  },
  @{
    slug = 'richmond'
    city = 'Richmond'
    citySlug = 'richmond'
    countyName = 'Richmond'
    countyMovingId = 'richmond-local-moving-richmond-va'
    countyMovingName = 'Richmond Local Moving'
    regional1 = 'capital-city'
    regional2 = 'james-river'
    regional1Name = 'Capital City Moving'
    regional2Name = 'James River Moving'
    label = 'Richmond Metro'
    poolId = 'richmond-metro-va'
    desc1 = 'Trusted Richmond franchise with excellent reputation for urban residential and commercial moves across the state capital.'
    desc2 = 'Established Richmond mover known for reliable local and long-distance services throughout Central Virginia.'
    desc3 = 'Local Richmond mover with careful residential relocations and packing services across Fan District and Museum District neighborhoods.'
    desc4 = 'Capital City specialist for downtown Richmond corporate and residential relocations.'
    desc5 = 'James River corridor mover serving riverfront and suburban Richmond communities.'
  },
  @{
    slug = 'norfolk'
    city = 'Norfolk'
    citySlug = 'norfolk'
    countyName = 'Norfolk'
    countyMovingId = 'norfolk-local-moving-norfolk-va'
    countyMovingName = 'Norfolk Local Moving'
    regional1 = 'naval-station'
    regional2 = 'port-of-virginia'
    regional1Name = 'Naval Station Moving'
    regional2Name = 'Port of Virginia Moving'
    label = 'Norfolk Metro'
    poolId = 'norfolk-metro-va'
    desc1 = 'Trusted Norfolk franchise with excellent reputation for residential and commercial moves across Hampton Roads.'
    desc2 = 'Established Norfolk mover known for reliable local and long-distance services throughout coastal Virginia.'
    desc3 = 'Local Norfolk mover with careful residential relocations and packing services near naval and port districts.'
    desc4 = 'Naval Station area specialist for military PCS and residential moves across Norfolk.'
    desc5 = 'Port of Virginia corridor mover serving Ghent and downtown Norfolk communities.'
  },
  @{
    slug = 'newport-news'
    city = 'Newport News'
    citySlug = 'newport-news'
    countyName = 'Newport News'
    countyMovingId = 'newport-news-local-moving-newport-news-va'
    countyMovingName = 'Newport News Local Moving'
    regional1 = 'shipyard'
    regional2 = 'peninsula'
    regional1Name = 'Shipyard Moving'
    regional2Name = 'Peninsula Moving'
    label = 'Newport News Metro'
    poolId = 'newport-news-metro-va'
    desc1 = 'Trusted Newport News franchise with excellent reputation for residential and commercial moves across the Virginia Peninsula.'
    desc2 = 'Established Newport News mover known for reliable local and long-distance services throughout Hampton Roads.'
    desc3 = 'Local Newport News mover with careful residential relocations and packing services across shipyard and midtown areas.'
    desc4 = 'Shipyard district specialist for military and industrial corridor residential moves.'
    desc5 = 'Peninsula mover serving Newport News and surrounding Hampton Roads communities.'
  },
  @{
    slug = 'stafford'
    city = 'Stafford'
    citySlug = 'stafford'
    countyName = 'Stafford'
    regional1 = 'fredericksburg-area'
    regional2 = 'i95-corridor'
    regional1Name = 'Fredericksburg Area Moving'
    regional2Name = 'I-95 Corridor Moving'
    label = 'Stafford Metro'
    poolId = 'stafford-metro-va'
    desc1 = 'Trusted Stafford franchise with excellent reputation for suburban residential and commercial moves south of Washington DC.'
    desc2 = 'Established Stafford mover known for reliable local and long-distance services throughout Northern Virginia.'
    desc3 = 'Local Stafford County mover with careful residential relocations and packing services along the I-95 corridor.'
    desc4 = 'Fredericksburg Area mover serving Stafford and North Stafford subdivisions with full-service relocations.'
    desc5 = 'I-95 Corridor specialist for suburban residential moves across Stafford County.'
  },
  @{
    slug = 'alexandria'
    city = 'Alexandria'
    citySlug = 'alexandria'
    countyName = 'Alexandria'
    countyMovingId = 'alexandria-local-moving-alexandria-va'
    countyMovingName = 'Alexandria Local Moving'
    regional1 = 'old-town'
    regional2 = 'potomac-river'
    regional1Name = 'Old Town Moving'
    regional2Name = 'Potomac River Moving'
    label = 'Alexandria Metro'
    poolId = 'alexandria-metro-va'
    desc1 = 'Trusted Alexandria franchise with excellent reputation for urban residential and commercial moves across Northern Virginia.'
    desc2 = 'Established Alexandria mover known for reliable local and long-distance services throughout the DC metro.'
    desc3 = 'Local Alexandria mover with careful residential relocations and packing services across Old Town and Del Ray.'
    desc4 = 'Old Town specialist for historic district and waterfront residential moves with tight-access expertise.'
    desc5 = 'Potomac River corridor mover serving Alexandria and Potomac Yard communities.'
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

foreach ($c in $counties) {
  $slug = $c.slug
  $city = $c.city
  $citySlug = $c.citySlug
  $countyName = $c.countyName

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
  $reviews = @(1720, 1380, 495, 360, 910, 280, 385, 320, 225, 188)

  for ($i = 0; $i -lt 10; $i++) {
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
}

$outDir = Join-Path $PSScriptRoot 'va-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Generated VA batch 3 catalog ($($counties.Count) locations x 10 movers)"