$outDir = Join-Path $PSScriptRoot 'rhode-island-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='providence'; city='Providence'; citySlug='providence'; label='Providence Metro'; poolId='providence-metro-ri'
    regional1='providence-corridor'; regional2='blackstone-valley'
    topId='twomenandatruck-providence-ri'; topName='Two Men and a Truck Providence'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Providence County.'
    countyMovingName='Providence County Moving'; regional1Name='Providence Corridor Moving'; regional2Name='Blackstone Valley Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='kent'; city='Warwick'; citySlug='warwick'; label='Providence Metro'; poolId='kent-metro-ri'
    regional1='warwick-corridor'; regional2='coventry-suburban'
    topId='twomenandatruck-kent-ri'; topName='Two Men and a Truck Kent County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Kent County.'
    countyMovingName='Kent County Moving'; regional1Name='Warwick Corridor Moving'; regional2Name='Coventry Suburban Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='washington'; city='South Kingstown'; citySlug='southkingstown'; label='South Kingstown Metro'; poolId='washington-metro-ri'
    regional1='south-kingstown-corridor'; regional2='narragansett-coast'
    topId='regional-washington-ri-movers'; topName='Regional South Kingstown / Washington Providers'
    topDesc='Reliable movers serving Washington County residential needs across South Kingstown and southern Rhode Island coastal communities.'
    countyMovingName='Washington County Moving'; regional1Name='South Kingstown Corridor Moving'; regional2Name='Narragansett Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='newport'; city='Newport'; citySlug='newport'; label='Newport Metro'; poolId='newport-metro-ri'
    regional1='newport-corridor'; regional2='aquidneck-coast'
    topId='regional-newport-ri-movers'; topName='Regional Newport / Newport County Providers'
    topDesc='Reliable movers serving Newport County residential needs across Newport and Aquidneck Island waterfront communities.'
    countyMovingName='Newport County Moving'; regional1Name='Newport Corridor Moving'; regional2Name='Aquidneck Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='bristol'; city='Bristol'; citySlug='bristol'; label='Providence Metro'; poolId='bristol-metro-ri'
    regional1='bristol-corridor'; regional2='east-bay-waterfront'
    topId='regional-bristol-ri-movers'; topName='Regional Bristol / Bristol County Providers'
    topDesc='Reliable movers serving Bristol County residential needs across Bristol and East Bay waterfront communities.'
    countyMovingName='Bristol County Moving'; regional1Name='Bristol Corridor Moving'; regional2Name='East Bay Waterfront Moving'
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
    "all-my-sons-$citySlug-ri",
    "$citySlug-moving-$slug-ri",
    "$slug-county-moving-$slug-ri",
    "college-hunks-moving-$citySlug-ri",
    "budd-van-lines-$citySlug-ri",
    "$($c.regional1)-moving-$slug-ri",
    "$($c.regional2)-moving-$slug-ri",
    "hercules-movers-$citySlug-ri",
    "krupp-moving-$citySlug-ri"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($slug) County."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding $($slug) County neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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

  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  '$slug': [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 50 catalog entries, 5 metro pools for Rhode Island (5 counties)'