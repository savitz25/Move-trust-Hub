$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug = 'bucks'; city = 'Doylestown'; citySlug = 'doylestown'; label = 'Doylestown Metro'; poolId = 'bucks-metro-pa'
    regional1 = 'levittown-corridor'; regional2 = 'delaware-river-bucks'
    topId = 'twomenandatruck-bucks-pa'; topName = 'Two Men and a Truck Bucks County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Bucks County.'
    countyMovingName = 'Bucks County Moving'; regional1Name = 'Levittown Corridor Moving'; regional2Name = 'Delaware River Bucks Moving'
    franchise = $true
  },
  @{
    slug = 'delaware'; city = 'Media'; citySlug = 'media'; label = 'Media Metro'; poolId = 'delaware-metro-pa'
    regional1 = 'delco-corridor'; regional2 = 'chester-border'
    topId = 'twomenandatruck-delaware-pa'; topName = 'Two Men and a Truck Delaware County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Delaware County.'
    countyMovingName = 'Delaware County Moving'; regional1Name = 'Delco Corridor Moving'; regional2Name = 'Chester Border Moving'
    franchise = $true
  },
  @{
    slug = 'lancaster'; city = 'Lancaster'; citySlug = 'lancaster'; label = 'Lancaster Metro'; poolId = 'lancaster-metro-pa'
    regional1 = 'amish-country'; regional2 = 'lancaster-corridor'
    topId = 'twomenandatruck-lancaster-pa'; topName = 'Two Men and a Truck Lancaster'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Lancaster County.'
    countyMovingName = 'Lancaster County Moving'; regional1Name = 'Amish Country Moving'; regional2Name = 'Lancaster Corridor Moving'
    franchise = $true
  },
  @{
    slug = 'chester'; city = 'West Chester'; citySlug = 'west-chester'; label = 'West Chester Metro'; poolId = 'chester-metro-pa'
    regional1 = 'main-line-west'; regional2 = 'chester-county-corridor'
    topId = 'twomenandatruck-chester-pa'; topName = 'Two Men and a Truck Chester County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Chester County.'
    countyMovingName = 'Chester County Moving'; regional1Name = 'Main Line West Moving'; regional2Name = 'Chester County Corridor Moving'
    franchise = $true
  },
  @{
    slug = 'york'; city = 'York'; citySlug = 'york'; label = 'York Metro'; poolId = 'york-metro-pa'
    regional1 = 'susquehanna-corridor'; regional2 = 'york-county-corridor'
    topId = 'twomenandatruck-york-pa'; topName = 'Two Men and a Truck York'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across York County.'
    countyMovingName = 'York County Moving'; regional1Name = 'Susquehanna Corridor Moving'; regional2Name = 'York County Corridor Moving'
    franchise = $true
  },
  @{
    slug = 'berks'; city = 'Reading'; citySlug = 'reading'; label = 'Reading Metro'; poolId = 'berks-metro-pa'
    regional1 = 'lehigh-valley-border'; regional2 = 'berks-corridor'
    topId = 'regional-berks-pa-movers'; topName = 'Regional Reading / Berks County Providers'
    topDesc = 'Reliable movers serving Berks County residential needs across Reading and surrounding Pennsylvania communities.'
    countyMovingName = 'Berks County Moving'; regional1Name = 'Lehigh Valley Border Moving'; regional2Name = 'Berks Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'lehigh'; city = 'Allentown'; citySlug = 'allentown'; label = 'Allentown Metro'; poolId = 'lehigh-metro-pa'
    regional1 = 'lehigh-valley-corridor'; regional2 = 'bethlehem-border'
    topId = 'twomenandatruck-lehigh-pa'; topName = 'Two Men and a Truck Lehigh Valley'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Lehigh County.'
    countyMovingName = 'Lehigh County Moving'; regional1Name = 'Lehigh Valley Corridor Moving'; regional2Name = 'Bethlehem Border Moving'
    franchise = $true
  },
  @{
    slug = 'westmoreland'; city = 'Greensburg'; citySlug = 'greensburg'; label = 'Greensburg Metro'; poolId = 'westmoreland-metro-pa'
    regional1 = 'pittsburgh-east'; regional2 = 'laurel-highlands'
    topId = 'regional-westmoreland-pa-movers'; topName = 'Regional Greensburg / Westmoreland County Providers'
    topDesc = 'Reliable movers serving Westmoreland County residential needs across Greensburg and surrounding Pittsburgh-metro communities.'
    countyMovingName = 'Westmoreland County Moving'; regional1Name = 'Pittsburgh East Moving'; regional2Name = 'Laurel Highlands Moving'
    franchise = $false
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
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-pa",
    "$citySlug-moving-$slug-pa",
    "$slug-county-moving-$slug-pa",
    "college-hunks-moving-$citySlug-pa",
    "budd-van-lines-$citySlug-pa",
    "$($c.regional1)-moving-$slug-pa",
    "$($c.regional2)-moving-$slug-pa",
    "hercules-movers-$citySlug-pa",
    "krupp-moving-$citySlug-pa"
  )

  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }
  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topSpecs = if ($c.franchise) { "['Residential', 'Commercial']" } else { "['Residential']" }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$topSpecs; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Pennsylvania communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Pennsylvania neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
  )

  $allCatalog += ($movers | ForEach-Object { Format-MoverBlock $_ })
  $poolIds = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $allPools += @"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: '$($c.label)',
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
Write-Host 'Generated 80 catalog entries, 8 metro pools for Pennsylvania batch 2'