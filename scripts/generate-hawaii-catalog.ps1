$outDir = Join-Path $PSScriptRoot 'hawaii-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='honolulu'; city='Honolulu'; citySlug='honolulu'; label='Honolulu Metro'; poolId='honolulu-metro-hi'
    regional1='honolulu-corridor'; regional2='oahu-metro'
    topId='twomenandatruck-honolulu-hi'; topName='Two Men and a Truck Honolulu'
    topDesc='Trusted local franchise with excellent reputation for island residential and commercial moves across Honolulu County (Oahu).'
    countyMovingName='Honolulu County Moving'; regional1Name='Honolulu Corridor Moving'; regional2Name='Oahu Metro Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='hawaii'; city='Hilo'; citySlug='hilo'; label='Hilo Metro'; poolId='hawaii-metro-hi'
    regional1='hilo-corridor'; regional2='big-island'
    topId='regional-hawaii-hi-movers'; topName='Regional Hilo / Hawaii Island Providers'
    topDesc='Reliable movers serving Hawaii County (Big Island) residential needs across Hilo, Kailua-Kona, and island communities.'
    countyMovingName='Hawaii County Moving'; regional1Name='Hilo Corridor Moving'; regional2Name='Big Island Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='maui'; city='Kahului'; citySlug='kahului'; label='Kahului Metro'; poolId='maui-metro-hi'
    regional1='kahului-corridor'; regional2='valley-isle'
    topId='regional-maui-hi-movers'; topName='Regional Kahului / Maui Providers'
    topDesc='Reliable movers serving Maui County residential needs across Kahului, Wailuku, and island towns.'
    countyMovingName='Maui County Moving'; regional1Name='Kahului Corridor Moving'; regional2Name='Valley Isle Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='kauai'; city='Lihue'; citySlug='lihue'; label='Lihue Metro'; poolId='kauai-metro-hi'
    regional1='lihue-corridor'; regional2='garden-isle'
    topId='regional-kauai-hi-movers'; topName='Regional Lihue / Kauai Providers'
    topDesc='Reliable movers serving Kauai County residential needs across Lihue and Garden Isle communities.'
    countyMovingName='Kauai County Moving'; regional1Name='Lihue Corridor Moving'; regional2Name='Garden Isle Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='kalawao'; city='Kalaupapa'; citySlug='kalaupapa'; label='Kalaupapa Metro'; poolId='kalawao-metro-hi'
    regional1='kalaupapa-corridor'; regional2='molokai-remote'
    topId='regional-kalawao-hi-movers'; topName='Regional Molokai / Kalawao Providers'
    topDesc='Limited service providers serving Kalawao County with careful handling for remote Molokai settlement moves.'
    countyMovingName='Kalawao County Moving'; regional1Name='Kalaupapa Corridor Moving'; regional2Name='Molokai Remote Moving'
    franchise=$false; topSpecialties="['Residential']"; smallMarket=$true
  }
)

function Format-MoverBlock($m) {
  $nameQ = Quote-Ts $m.name
  $descQ = Quote-Ts $m.desc
  $cityQ = Quote-Ts $m.city
  $bbb = if ($m.bbb) { "bbbRating: '$($m.bbb)'," } else { '' }
@"
  '$($m.id)': {
    id: '$($m.id)',
    name: $nameQ,
    rating: $($m.rating),
    reviewCount: $($m.reviews),
    shortDescription:
      $descQ,
    services: $($m.services),
    specialties: $($m.specialties),
    fmcsaSafetyRating: 'Not Rated',
    $bbb
    city: $cityQ,
  },
"@
}

$allCatalog = @()
$allPools = @()
$assignmentLines = @()

foreach ($c in $counties) {
  $slug = $c.slug
  $citySlug = $c.citySlug
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-hi",
    "$citySlug-moving-$slug-hi",
    "$slug-county-moving-$slug-hi",
    "college-hunks-moving-$citySlug-hi",
    "budd-van-lines-$citySlug-hi",
    "$($c.regional1)-moving-$slug-hi",
    "$($c.regional2)-moving-$slug-hi",
    "hercules-movers-$citySlug-hi",
    "krupp-moving-$citySlug-hi"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1840 } elseif ($c.smallMarket) { 85 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }
  $topRating = if ($c.smallMarket) { 4.5 } else { 4.7 }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=$topRating; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and island services in $($c.city) and $($slug) County."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding $($slug) County neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and inter-island relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
  )

  $allCatalog += ($movers | ForEach-Object { Format-MoverBlock $_ })
  $poolIds = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $labelQ = Quote-Ts $c.label
  $allPools += @"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: $labelQ,
    moverIds: [
$poolIds
    ],
  },
"@

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 50 catalog entries, 5 metro pools for Hawaii (5 counties)'