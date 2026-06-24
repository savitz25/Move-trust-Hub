$outDir = Join-Path $PSScriptRoot 'connecticut-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$regions = @(
  @{
    slug='capitol'; city='Hartford'; citySlug='hartford'; label='Hartford Metro'; poolId='capitol-metro-ct'
    regional1='hartford-corridor'; regional2='connecticut-river'
    topId='twomenandatruck-capitol-ct'; topName='Two Men and a Truck Hartford'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban moves across the Capitol Planning Region.'
    regionMovingName='Capitol Region Moving'; regional1Name='Hartford Corridor Moving'; regional2Name='Connecticut River Moving'
    franchise=$true
  },
  @{
    slug='western-connecticut'; city='Danbury'; citySlug='danbury'; label='Danbury Metro'; poolId='western-connecticut-metro-ct'
    regional1='danbury-corridor'; regional2='fairfield-hills'
    topId='regional-western-ct-movers'; topName='Regional Danbury / Western Connecticut Providers'
    topDesc='Reliable movers serving the Western Connecticut Planning Region across Danbury and affluent suburban communities.'
    regionMovingName='Western Connecticut Region Moving'; regional1Name='Danbury Corridor Moving'; regional2Name='Fairfield Hills Moving'
    franchise=$false
  },
  @{
    slug='south-central-connecticut'; city='New Haven'; citySlug='newhaven'; label='New Haven Metro'; poolId='south-central-connecticut-metro-ct'
    regional1='new-haven-corridor'; regional2='shoreline-south'
    topId='twomenandatruck-southcentral-ct'; topName='Two Men and a Truck New Haven'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban moves across the South Central Connecticut Planning Region.'
    regionMovingName='South Central Connecticut Region Moving'; regional1Name='New Haven Corridor Moving'; regional2Name='Shoreline South Moving'
    franchise=$true
  },
  @{
    slug='naugatuck-valley'; city='Waterbury'; citySlug='waterbury'; label='Waterbury Metro'; poolId='naugatuck-valley-metro-ct'
    regional1='waterbury-corridor'; regional2='naugatuck-river'
    topId='regional-naugatuckvalley-ct-movers'; topName='Regional Waterbury / Naugatuck Valley Providers'
    topDesc='Reliable movers serving the Naugatuck Valley Planning Region across Waterbury and surrounding industrial communities.'
    regionMovingName='Naugatuck Valley Region Moving'; regional1Name='Waterbury Corridor Moving'; regional2Name='Naugatuck River Moving'
    franchise=$false
  },
  @{
    slug='greater-bridgeport'; city='Bridgeport'; citySlug='bridgeport'; label='Bridgeport Metro'; poolId='greater-bridgeport-metro-ct'
    regional1='bridgeport-corridor'; regional2='long-island-sound'
    topId='regional-greaterbridgeport-ct-movers'; topName='Regional Bridgeport / Greater Bridgeport Providers'
    topDesc='Reliable movers serving the Greater Bridgeport Planning Region across Bridgeport and coastal residential communities.'
    regionMovingName='Greater Bridgeport Region Moving'; regional1Name='Bridgeport Corridor Moving'; regional2Name='Long Island Sound Moving'
    franchise=$false
  },
  @{
    slug='southeastern-connecticut'; city='New London'; citySlug='newlondon'; label='New London Metro'; poolId='southeastern-connecticut-metro-ct'
    regional1='new-london-corridor'; regional2='thames-river'
    topId='regional-southeastern-ct-movers'; topName='Regional New London / Southeastern Connecticut Providers'
    topDesc='Reliable movers serving the Southeastern Connecticut Planning Region across New London, Groton, and coastal communities.'
    regionMovingName='Southeastern Connecticut Region Moving'; regional1Name='New London Corridor Moving'; regional2Name='Thames River Moving'
    franchise=$false
  },
  @{
    slug='lower-connecticut-river-valley'; city='Middletown'; citySlug='middletown'; label='Middletown Metro'; poolId='lower-connecticut-river-valley-metro-ct'
    regional1='middletown-corridor'; regional2='connecticut-river-lower'
    topId='regional-lowerriver-valley-ct-movers'; topName='Regional Middletown / Lower Connecticut River Valley Providers'
    topDesc='Reliable movers serving the Lower Connecticut River Valley Planning Region across Middletown and river valley communities.'
    regionMovingName='Lower River Valley Region Moving'; regional1Name='Middletown Corridor Moving'; regional2Name='Connecticut River Lower Moving'
    franchise=$false
  },
  @{
    slug='northwest-hills'; city='Torrington'; citySlug='torrington'; label='Torrington Metro'; poolId='northwest-hills-metro-ct'
    regional1='torrington-corridor'; regional2='berkshire-foothills'
    topId='regional-northwesthills-ct-movers'; topName='Regional Torrington / Northwest Hills Providers'
    topDesc='Reliable movers serving the Northwest Hills Planning Region across Torrington and Northwestern Connecticut communities.'
    regionMovingName='Northwest Hills Region Moving'; regional1Name='Torrington Corridor Moving'; regional2Name='Berkshire Foothills Moving'
    franchise=$false
  },
  @{
    slug='northeastern-connecticut'; city='Putnam'; citySlug='putnam'; label='Putnam Metro'; poolId='northeastern-connecticut-metro-ct'
    regional1='putnam-corridor'; regional2='quiet-corner'
    topId='regional-northeastern-ct-movers'; topName='Regional Putnam / Northeastern Connecticut Providers'
    topDesc='Reliable movers serving the Northeastern Connecticut Planning Region across Putnam and the Quiet Corner.'
    regionMovingName='Northeastern Connecticut Region Moving'; regional1Name='Putnam Corridor Moving'; regional2Name='Quiet Corner Moving'
    franchise=$false
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

foreach ($r in $regions) {
  $slug = $r.slug
  $citySlug = $r.citySlug
  $ids = @(
    $r.topId,
    "all-my-sons-$citySlug-ct",
    "$citySlug-moving-$slug-ct",
    "$slug-region-moving-$slug-ct",
    "college-hunks-moving-$citySlug-ct",
    "budd-van-lines-$citySlug-ct",
    "$($r.regional1)-moving-$slug-ct",
    "$($r.regional2)-moving-$slug-ct",
    "hercules-movers-$citySlug-ct",
    "krupp-moving-$citySlug-ct"
  )

  $topServices = if ($r.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topSpecialties = if ($r.franchise) { "['Residential', 'Commercial']" } else { "['Residential']" }
  $topReviews = if ($r.franchise) { 1840 } else { 280 }
  $topBbb = if ($r.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$r.topName; rating=4.7; reviews=$topReviews; desc=$r.topDesc; services=$topServices; specialties=$topSpecialties; bbb=$topBbb; city=$r.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($r.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($r.city) and surrounding Connecticut communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$r.city }
    @{ id=$ids[2]; name="$($r.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($r.city) and the $($r.label) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$r.city }
    @{ id=$ids[3]; name=$r.regionMovingName; rating=4.6; reviews=620; desc="Region-focused mover with experience across $($r.city) and surrounding Connecticut planning region communities."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$r.city }
    @{ id=$ids[4]; name="College Hunks Moving $($r.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($r.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$r.city }
    @{ id=$ids[5]; name="Budd Van Lines $($r.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($r.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$r.city }
    @{ id=$ids[6]; name=$r.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($r.city) and surrounding Connecticut planning region communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$r.city }
    @{ id=$ids[7]; name=$r.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($r.label) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$r.city }
    @{ id=$ids[8]; name="Hercules Movers $($r.city)"; rating=4.5; reviews=290; desc="Local $($r.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$r.city }
    @{ id=$ids[9]; name="Krupp Moving $($r.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($r.city) and the Connecticut planning region."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$r.city }
  )

  $allCatalog += ($movers | ForEach-Object { Format-MoverBlock $_ })
  $poolIds = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $allPools += @"
  '$($r.poolId)': {
    id: '$($r.poolId)',
    label: '$($r.label)',
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
Write-Host 'Generated 90 catalog entries, 9 metro pools for Connecticut (state complete)'