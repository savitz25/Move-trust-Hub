# Generates Virginia batch 2 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'prince-william'
    city = 'Manassas'
    citySlug = 'manassas'
    countyName = 'Prince William'
    regional1 = 'woodbridge'
    regional2 = 'nova-south'
    regional1Name = 'Woodbridge Moving'
    regional2Name = 'NOVA South Moving'
    label = 'Prince William Metro'
    poolId = 'prince-william-metro-va'
    desc1 = 'Trusted Manassas franchise with excellent reputation for suburban residential and commercial moves across Prince William County.'
    desc2 = 'Established Manassas mover known for reliable local and long-distance services throughout Northern Virginia.'
    desc3 = 'Local Prince William County mover with careful residential relocations and packing services across Manassas and Woodbridge.'
    desc4 = 'Woodbridge-area mover serving eastern Prince William County with full-service residential and apartment relocations.'
    desc5 = 'NOVA South specialist for suburban residential moves across Prince William County and the I-95 corridor.'
  },
  @{
    slug = 'loudoun'
    city = 'Leesburg'
    citySlug = 'leesburg'
    countyName = 'Loudoun'
    regional1 = 'ashburn'
    regional2 = 'dulles-corridor'
    regional1Name = 'Ashburn Moving'
    regional2Name = 'Dulles Corridor Moving'
    label = 'Loudoun Metro'
    poolId = 'loudoun-metro-va'
    desc1 = 'Trusted Leesburg franchise with excellent reputation for suburban residential and commercial moves across Loudoun County.'
    desc2 = 'Established Leesburg mover known for reliable local and long-distance services throughout Northern Virginia.'
    desc3 = 'Local Loudoun County mover with careful residential relocations and packing services across Leesburg and Ashburn.'
    desc4 = 'Ashburn-area mover serving Dulles corridor communities with full-service residential and corporate relocations.'
    desc5 = 'Dulles Corridor specialist for high-value suburban home moves across Loudoun County.'
  },
  @{
    slug = 'virginia-beach'
    city = 'Virginia Beach'
    citySlug = 'virginia-beach'
    countyName = 'Virginia Beach'
    countyMovingId = 'virginia-beach-local-moving-virginia-beach-va'
    countyMovingName = 'Virginia Beach Local Moving'
    regional1 = 'hampton-roads'
    regional2 = 'coastal-virginia'
    regional1Name = 'Hampton Roads Moving'
    regional2Name = 'Coastal Virginia Moving'
    label = 'Virginia Beach Metro'
    poolId = 'virginia-beach-metro-va'
    desc1 = 'Trusted Virginia Beach franchise with excellent reputation for residential and commercial moves across Hampton Roads.'
    desc2 = 'Established Virginia Beach mover known for reliable local and long-distance services throughout coastal Virginia.'
    desc3 = 'Local Virginia Beach mover with careful residential relocations and packing services across oceanfront and suburban neighborhoods.'
    desc4 = 'Hampton Roads specialist for military PCS and residential moves across Virginia Beach and surrounding cities.'
    desc5 = 'Coastal Virginia mover serving beachfront and inland communities with full-service residential relocations.'
  },
  @{
    slug = 'chesterfield'
    city = 'Chesterfield'
    citySlug = 'chesterfield'
    countyName = 'Chesterfield'
    regional1 = 'midlothian'
    regional2 = 'richmond-south'
    regional1Name = 'Midlothian Moving'
    regional2Name = 'Richmond South Moving'
    label = 'Chesterfield Metro'
    poolId = 'chesterfield-metro-va'
    desc1 = 'Trusted Chesterfield franchise with excellent reputation for suburban residential and commercial moves south of Richmond.'
    desc2 = 'Established Chesterfield mover known for reliable local and long-distance services throughout the Richmond metro.'
    desc3 = 'Local Chesterfield County mover with careful residential relocations and packing services across Midlothian and Bon Air.'
    desc4 = 'Midlothian-area mover serving central Chesterfield County with full-service residential and townhome relocations.'
    desc5 = 'Richmond South specialist for suburban residential moves across Chesterfield County and the Jefferson Davis corridor.'
  }
)

function Format-MoverBlock($id, $name, $rating, $reviews, $desc, $city, $services = "['Local Moving', 'Packing', 'Storage']") {
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
    bbbRating: 'A+',
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
  $reviews = @(1850, 1420, 520, 380, 980, 295, 410, 340, 240, 195)

  for ($i = 0; $i -lt 10; $i++) {
    $svc = if ($i -eq 1) { "['Local Moving', 'Long Distance', 'Packing']" } elseif ($i -eq 4) { "['Local Moving', 'Packing', 'Junk Removal']" } else { "['Local Moving', 'Packing', 'Storage']" }
    $bbb = if ($i -eq 1) { 'A' } else { 'A+' }
    $block = Format-MoverBlock $ids[$i] $names[$i] $ratings[$i] $reviews[$i] $descs[$i] $city $svc
    $block = $block -replace "bbbRating: 'A\+'", "bbbRating: '$bbb'"
    $moverLines.Add($block)
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

$outDir = Join-Path $PSScriptRoot 'va-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Generated VA batch 2 catalog ($($counties.Count) counties x 10 movers)"