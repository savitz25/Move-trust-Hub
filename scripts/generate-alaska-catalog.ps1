$outDir = Join-Path $PSScriptRoot 'alaska-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='anchorage'; city='Anchorage'; citySlug='anchorage'; label='Anchorage Metro'; poolId='anchorage-metro-ak'
    regional1='anchorage-corridor'; regional2='municipality-metro'
    topId='twomenandatruck-anchorage-ak'; topName='Two Men and a Truck Anchorage'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Anchorage Municipality.'
    countyMovingName='Anchorage Municipality Moving'; regional1Name='Anchorage Corridor Moving'; regional2Name='Municipality Metro Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='matanuska-susitna'; city='Palmer'; citySlug='palmer'; label='Matanuska-Susitna Valley Metro'; poolId='matanuska-susitna-metro-ak'
    regional1='palmer-corridor'; regional2='mat-su-valley'
    topId='regional-matanuska-susitna-ak-movers'; topName='Regional Palmer / Mat-Su Providers'
    topDesc='Reliable movers serving Matanuska-Susitna Borough residential needs across Palmer, Wasilla, and valley communities.'
    countyMovingName='Mat-Su Borough Moving'; regional1Name='Palmer Corridor Moving'; regional2Name='Mat-Su Valley Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='fairbanks-north-star'; city='Fairbanks'; citySlug='fairbanks'; label='Fairbanks Metro'; poolId='fairbanks-north-star-metro-ak'
    regional1='fairbanks-corridor'; regional2='north-star-borough'
    topId='regional-fairbanksnorthstar-ak-movers'; topName='Regional Fairbanks / North Star Providers'
    topDesc='Reliable movers serving Fairbanks North Star Borough residential needs across Fairbanks and interior Alaska communities.'
    countyMovingName='Fairbanks North Star Moving'; regional1Name='Fairbanks Corridor Moving'; regional2Name='North Star Borough Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='kenai-peninsula'; city='Kenai'; citySlug='kenai'; label='Kenai Peninsula Metro'; poolId='kenai-peninsula-metro-ak'
    regional1='kenai-corridor'; regional2='peninsula-coastal'
    topId='regional-kenaipeninsula-ak-movers'; topName='Regional Kenai / Kenai Peninsula Providers'
    topDesc='Reliable movers serving Kenai Peninsula Borough residential needs across Soldotna, Kenai, and coastal communities.'
    countyMovingName='Kenai Peninsula Moving'; regional1Name='Kenai Corridor Moving'; regional2Name='Peninsula Coastal Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='juneau'; city='Juneau'; citySlug='juneau'; label='Juneau Metro'; poolId='juneau-metro-ak'
    regional1='juneau-corridor'; regional2='capital-coast'
    topId='regional-juneau-ak-movers'; topName='Regional Juneau Providers'
    topDesc='Reliable movers serving Juneau City and Borough residential needs across Alaska''s capital and coastal communities.'
    countyMovingName='Juneau Borough Moving'; regional1Name='Juneau Corridor Moving'; regional2Name='Capital Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
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
    "all-my-sons-$citySlug-ak",
    "$citySlug-moving-$slug-ak",
    "$slug-county-moving-$slug-ak",
    "college-hunks-moving-$citySlug-ak",
    "budd-van-lines-$citySlug-ak",
    "$($c.regional1)-moving-$slug-ak",
    "$($c.regional2)-moving-$slug-ak",
    "hercules-movers-$citySlug-ak",
    "krupp-moving-$citySlug-ak"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($slug) Borough."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="Borough-focused mover with experience across $($c.city) and surrounding $($slug) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug)." ; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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

  $key = "'$slug'"
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 50 catalog entries, 5 metro pools for Alaska (5 major boroughs)'