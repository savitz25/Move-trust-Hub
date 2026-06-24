$outDir = Join-Path $PSScriptRoot 'connecticut-counties-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='fairfield'; city='Stamford'; citySlug='stamford'; label='Fairfield County Metro'; poolId='fairfield-metro-ct'
    regional1='gold-coast-corridor'; regional2='long-island-sound'
    topId='twomenandatruck-fairfield-ct'; topName='Two Men and a Truck Stamford'
    topDesc='Trusted local franchise with excellent reputation for luxury, corporate, and NYC-corridor moves across Fairfield County.'
    countyMovingName='Fairfield County Moving'; regional1Name='Gold Coast Corridor Moving'; regional2Name='Long Island Sound Moving'
    franchise=$true; moverCount=12
    extraIds=@('nyc-commuter-moving-fairfield-ct','luxury-home-moving-stamford-fairfield-ct')
    extraMovers=@(
      @{ id='nyc-commuter-moving-fairfield-ct'; name='NYC Commuter Moving Fairfield'; rating=4.7; reviews=540; desc='Specialist for NYC-corridor and reverse-commute relocations across Stamford, Greenwich, and Fairfield County.'; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Corporate']"; bbb='A+'; city='Stamford' }
      @{ id='luxury-home-moving-stamford-fairfield-ct'; name='Luxury Home Moving Stamford'; rating=4.8; reviews=420; desc='White-glove mover for high-value homes, estates, and executive relocations in Fairfield County.'; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Luxury']"; bbb='A+'; city='Stamford' }
    )
  },
  @{
    slug='hartford'; city='Hartford'; citySlug='hartford'; label='Hartford Metro'; poolId='hartford-metro-ct'
    regional1='hartford-corridor'; regional2='connecticut-river'
    topId='twomenandatruck-hartford-ct'; topName='Two Men and a Truck Hartford'
    topDesc='Trusted local franchise serving corporate, government, and residential moves across Hartford County.'
    countyMovingName='Hartford County Moving'; regional1Name='Hartford Corridor Moving'; regional2Name='Connecticut River Moving'
    franchise=$true; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='new-haven'; city='New Haven'; citySlug='newhaven'; label='New Haven Metro'; poolId='new-haven-metro-ct'
    regional1='new-haven-corridor'; regional2='shoreline-south'
    topId='twomenandatruck-new-haven-ct'; topName='Two Men and a Truck New Haven'
    topDesc='Trusted local franchise for university, professional, and coastal suburban moves across New Haven County.'
    countyMovingName='New Haven County Moving'; regional1Name='New Haven Corridor Moving'; regional2Name='Shoreline South Moving'
    franchise=$true; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='litchfield'; city='Torrington'; citySlug='torrington'; label='Litchfield Metro'; poolId='litchfield-metro-ct'
    regional1='litchfield-hills'; regional2='berkshire-foothills'
    topId='regional-litchfield-ct-movers'; topName='Regional Litchfield / Litchfield County Providers'
    topDesc='Reliable movers serving Litchfield County residential needs across Torrington and Northwestern Connecticut.'
    countyMovingName='Litchfield County Moving'; regional1Name='Litchfield Hills Moving'; regional2Name='Berkshire Foothills Moving'
    franchise=$false; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='middlesex'; city='Middletown'; citySlug='middletown'; label='Middlesex Metro'; poolId='middlesex-metro-ct'
    regional1='middletown-corridor'; regional2='connecticut-river-lower'
    topId='regional-middlesex-ct-movers'; topName='Regional Middletown / Middlesex County Providers'
    topDesc='Reliable movers serving Middlesex County residential needs across Middletown and the Connecticut River valley.'
    countyMovingName='Middlesex County Moving'; regional1Name='Middletown Corridor Moving'; regional2Name='Connecticut River Lower Moving'
    franchise=$false; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='new-london'; city='New London'; citySlug='newlondon'; label='New London Metro'; poolId='new-london-metro-ct'
    regional1='new-london-corridor'; regional2='thames-river'
    topId='regional-new-london-ct-movers'; topName='Regional New London / New London County Providers'
    topDesc='Reliable movers serving New London County coastal, naval, and residential needs across southeastern Connecticut.'
    countyMovingName='New London County Moving'; regional1Name='New London Corridor Moving'; regional2Name='Thames River Moving'
    franchise=$false; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='tolland'; city='Rockville'; citySlug='rockville'; label='Tolland Metro'; poolId='tolland-metro-ct'
    regional1='tolland-corridor'; regional2='eastern-connecticut'
    topId='regional-tolland-ct-movers'; topName='Regional Rockville / Tolland County Providers'
    topDesc='Reliable movers serving Tolland County residential needs across Rockville and eastern Connecticut communities.'
    countyMovingName='Tolland County Moving'; regional1Name='Tolland Corridor Moving'; regional2Name='Eastern Connecticut Moving'
    franchise=$false; moverCount=10; extraIds=@(); extraMovers=@()
  },
  @{
    slug='windham'; city='Willimantic'; citySlug='willimantic'; label='Windham Metro'; poolId='windham-metro-ct'
    regional1='willimantic-corridor'; regional2='quiet-corner'
    topId='regional-windham-ct-movers'; topName='Regional Willimantic / Windham County Providers'
    topDesc='Reliable movers serving Windham County residential needs across Willimantic and northeastern Connecticut.'
    countyMovingName='Windham County Moving'; regional1Name='Willimantic Corridor Moving'; regional2Name='Quiet Corner Moving'
    franchise=$false; moverCount=10; extraIds=@(); extraMovers=@()
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
  $baseIds = @(
    $c.topId,
    "all-my-sons-$citySlug-ct",
    "$citySlug-moving-$slug-ct",
    "$slug-county-moving-$slug-ct",
    "college-hunks-moving-$citySlug-ct",
    "budd-van-lines-$citySlug-ct",
    "$($c.regional1)-moving-$slug-ct",
    "$($c.regional2)-moving-$slug-ct",
    "hercules-movers-$citySlug-ct",
    "krupp-moving-$citySlug-ct"
  )
  $ids = $baseIds + $c.extraIds

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topSpecialties = if ($c.franchise) { "['Residential', 'Commercial']" } else { "['Residential']" }
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$topSpecialties; bbb=$topBbb; city=$c.city }
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

  foreach ($extra in $c.extraMovers) { $movers += $extra }

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
  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $assignmentLines += "  ${key}: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated county catalog for Connecticut (8 counties, Fairfield 12 movers)'