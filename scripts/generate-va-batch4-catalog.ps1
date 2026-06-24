# Generates Virginia batch 4 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'spotsylvania'
    city = 'Fredericksburg'
    citySlug = 'fredericksburg'
    countyName = 'Spotsylvania'
    regional1 = 'i95-corridor'
    regional2 = 'spotsylvania-valley'
    regional1Name = 'I-95 Corridor Moving'
    regional2Name = 'Spotsylvania Valley Moving'
    label = 'Spotsylvania Metro'
    poolId = 'spotsylvania-metro-va'
    desc1 = 'Trusted Spotsylvania franchise with excellent reputation for suburban residential moves across Fredericksburg and the I-95 corridor.'
    desc2 = 'Established Fredericksburg mover known for reliable local and long-distance services throughout Spotsylvania County.'
    desc3 = 'Local Spotsylvania County mover with careful residential relocations and packing services south of Fredericksburg.'
    desc4 = 'I-95 Corridor specialist for suburban residential moves across Spotsylvania and Lake Anna communities.'
    desc5 = 'Spotsylvania Valley mover serving southern county subdivisions with full-service relocations.'
  },
  @{
    slug = 'hampton'
    city = 'Hampton'
    citySlug = 'hampton'
    countyName = 'Hampton'
    countyMovingId = 'hampton-local-moving-hampton-va'
    countyMovingName = 'Hampton Local Moving'
    regional1 = 'fort-monroe'
    regional2 = 'hampton-roads-north'
    regional1Name = 'Fort Monroe Moving'
    regional2Name = 'Hampton Roads North Moving'
    label = 'Hampton Metro'
    poolId = 'hampton-metro-va'
    desc1 = 'Trusted Hampton franchise with excellent reputation for residential and commercial moves across Hampton Roads.'
    desc2 = 'Established Hampton mover known for reliable local and long-distance services throughout coastal Virginia.'
    desc3 = 'Local Hampton mover with careful residential relocations and packing services near military and waterfront districts.'
    desc4 = 'Fort Monroe area specialist for military PCS and residential moves across Hampton.'
    desc5 = 'Hampton Roads North mover serving Peninsula communities with full-service relocations.'
  },
  @{
    slug = 'albemarle'
    city = 'Charlottesville'
    citySlug = 'charlottesville'
    countyName = 'Albemarle'
    regional1 = 'uva-area'
    regional2 = 'shenandoah-valley'
    regional1Name = 'UVA Area Moving'
    regional2Name = 'Shenandoah Valley Moving'
    label = 'Albemarle Metro'
    poolId = 'albemarle-metro-va'
    desc1 = 'Trusted Albemarle franchise with excellent reputation for residential and commercial moves across Charlottesville.'
    desc2 = 'Established Charlottesville mover known for reliable local and long-distance services throughout central Virginia.'
    desc3 = 'Local Albemarle County mover with careful residential relocations and packing services across UVA-area neighborhoods.'
    desc4 = 'UVA Area specialist for student housing and university district residential moves.'
    desc5 = 'Shenandoah Valley mover serving Albemarle County rural and suburban communities.'
  },
  @{
    slug = 'hanover'
    city = 'Mechanicsville'
    citySlug = 'mechanicsville'
    countyName = 'Hanover'
    regional1 = 'richmond-north'
    regional2 = 'atlee-station'
    regional1Name = 'Richmond North Moving'
    regional2Name = 'Atlee Station Moving'
    label = 'Hanover Metro'
    poolId = 'hanover-metro-va'
    desc1 = 'Trusted Hanover franchise with excellent reputation for suburban residential moves across Mechanicsville and the Richmond north corridor.'
    desc2 = 'Established Mechanicsville mover known for reliable local and long-distance services throughout Hanover County.'
    desc3 = 'Local Hanover County mover with careful residential relocations and packing services across Atlee and Ashland areas.'
    desc4 = 'Richmond North specialist for suburban residential moves north of the James River.'
    desc5 = 'Atlee Station area mover serving central Hanover County with full-service relocations.'
  },
  @{
    slug = 'suffolk'
    city = 'Suffolk'
    citySlug = 'suffolk'
    countyName = 'Suffolk'
    countyMovingId = 'suffolk-local-moving-suffolk-va'
    countyMovingName = 'Suffolk Local Moving'
    regional1 = 'western-tidewater'
    regional2 = 'peanut-city'
    regional1Name = 'Western Tidewater Moving'
    regional2Name = 'Peanut City Moving'
    label = 'Suffolk Metro'
    poolId = 'suffolk-metro-va'
    desc1 = 'Trusted Suffolk franchise with excellent reputation for residential moves across rural and suburban Hampton Roads.'
    desc2 = 'Established Suffolk mover known for reliable local and long-distance services throughout western Tidewater.'
    desc3 = 'Local Suffolk mover with careful residential relocations and packing services across North Suffolk and downtown.'
    desc4 = 'Western Tidewater specialist for rural property and suburban residential moves across Suffolk.'
    desc5 = 'Peanut City corridor mover serving southern Suffolk communities with full-service relocations.'
  },
  @{
    slug = 'frederick'
    city = 'Winchester'
    citySlug = 'winchester'
    countyName = 'Frederick'
    regional1 = 'shenandoah-valley'
    regional2 = 'northern-shenandoah'
    regional1Name = 'Shenandoah Valley Moving'
    regional2Name = 'Northern Shenandoah Moving'
    label = 'Frederick Metro'
    poolId = 'frederick-metro-va'
    desc1 = 'Trusted Frederick franchise with excellent reputation for suburban residential moves across Winchester and the Northern Shenandoah Valley.'
    desc2 = 'Established Winchester mover known for reliable local and long-distance services throughout Frederick County.'
    desc3 = 'Local Frederick County mover with careful residential relocations and packing services across Stephens City and Middletown.'
    desc4 = 'Shenandoah Valley specialist for suburban and rural residential moves across Frederick County.'
    desc5 = 'Northern Shenandoah mover serving Winchester metro communities with full-service relocations.'
  },
  @{
    slug = 'roanoke'
    city = 'Roanoke'
    citySlug = 'roanoke'
    countyName = 'Roanoke'
    countyMovingId = 'roanoke-local-moving-roanoke-va'
    countyMovingName = 'Roanoke Local Moving'
    regional1 = 'blue-ridge'
    regional2 = 'roanoke-valley'
    regional1Name = 'Blue Ridge Moving'
    regional2Name = 'Roanoke Valley Moving'
    label = 'Roanoke Metro'
    poolId = 'roanoke-metro-va'
    desc1 = 'Trusted Roanoke franchise with excellent reputation for residential and commercial moves across the Roanoke Valley.'
    desc2 = 'Established Roanoke mover known for reliable local and long-distance services throughout southwest Virginia.'
    desc3 = 'Local Roanoke mover with careful residential relocations and packing services across downtown and valley neighborhoods.'
    desc4 = 'Blue Ridge specialist for hillside and valley residential moves across Roanoke.'
    desc5 = 'Roanoke Valley mover serving Star City and surrounding communities with full-service relocations.'
  },
  @{
    slug = 'montgomery'
    city = 'Christiansburg'
    citySlug = 'christiansburg'
    countyName = 'Montgomery'
    regional1 = 'blacksburg'
    regional2 = 'virginia-tech-area'
    regional1Name = 'Blacksburg Moving'
    regional2Name = 'Virginia Tech Area Moving'
    label = 'Montgomery Metro'
    poolId = 'montgomery-metro-va'
    desc1 = 'Trusted Montgomery franchise with excellent reputation for residential moves across Christiansburg and the New River Valley.'
    desc2 = 'Established Christiansburg mover known for reliable local and long-distance services throughout Montgomery County.'
    desc3 = 'Local Montgomery County mover with careful residential relocations and packing services near Virginia Tech.'
    desc4 = 'Blacksburg area specialist for student housing and university district residential moves.'
    desc5 = 'Virginia Tech Area mover serving campus and New River Valley communities with full-service relocations.'
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
  $reviews = @(1580, 1240, 465, 340, 860, 265, 355, 295, 210, 175)

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

$outDir = Join-Path $PSScriptRoot 'va-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Generated VA batch 4 catalog ($($counties.Count) locations x 10 movers)"