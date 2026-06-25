$outDir = Join-Path $PSScriptRoot 'south-dakota-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='minnehaha'; city='Sioux Falls'; citySlug='sioux-falls'; label='Sioux Falls Metro'; poolId='minnehaha-metro-sd'; regional1='sioux-falls-corridor'; regional2='big-sioux-valley'; topId='twomenandatruck-minnehaha-sd'; topName='Two Men and a Truck Sioux Falls'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Minnehaha County and the Sioux Falls metro.'; countyMovingName='Minnehaha County Moving'; regional1Name='Sioux Falls Corridor Moving'; regional2Name='Big Sioux Valley Moving'; countyLabel='Minnehaha County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='pennington'; city='Rapid City'; citySlug='rapid-city'; label='Rapid City Metro'; poolId='pennington-metro-sd'; regional1='rapid-city-corridor'; regional2='black-hills-east'; topId='twomenandatruck-pennington-sd'; topName='Two Men and a Truck Rapid City'; topDesc='Trusted local franchise with excellent reputation for residential moves across Rapid City and Pennington County Black Hills communities.'; countyMovingName='Pennington County Moving'; regional1Name='Rapid City Corridor Moving'; regional2Name='Black Hills East Moving'; countyLabel='Pennington County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='Canton'; citySlug='canton'; label='Sioux Falls Metro'; poolId='lincoln-metro-sd'; regional1='canton-corridor'; regional2='sioux-falls-south'; topId='regional-lincoln-sd-movers'; topName='Regional Sioux Falls area / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Canton, Tea, and Sioux Falls metro south-bank communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Canton Corridor Moving'; regional2Name='Sioux Falls South Moving'; countyLabel='Lincoln County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='brookings'; city='Brookings'; citySlug='brookings'; label='Brookings Metro'; poolId='brookings-metro-sd'; regional1='brookings-corridor'; regional2='big-sioux-east'; topId='regional-brookings-sd-movers'; topName='Regional Brookings / Brookings County Providers'; topDesc='Reliable movers serving Brookings County residential needs across Brookings and SDSU university-area communities.'; countyMovingName='Brookings County Moving'; regional1Name='Brookings Corridor Moving'; regional2Name='Big Sioux East Moving'; countyLabel='Brookings County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='brown'; city='Aberdeen'; citySlug='aberdeen'; label='Aberdeen Metro'; poolId='brown-metro-sd'; regional1='aberdeen-corridor'; regional2='james-river-north'; topId='regional-brown-sd-movers'; topName='Regional Aberdeen / Brown Providers'; topDesc='Reliable movers serving Brown County residential needs across Aberdeen and northeastern South Dakota communities.'; countyMovingName='Brown County Moving'; regional1Name='Aberdeen Corridor Moving'; regional2Name='James River North Moving'; countyLabel='Brown County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='meade'; city='Sturgis'; citySlug='sturgis'; label='Sturgis Metro'; poolId='meade-metro-sd'; regional1='sturgis-corridor'; regional2='northern-black-hills'; topId='regional-meade-sd-movers'; topName='Regional Sturgis / Meade Providers'; topDesc='Reliable movers serving Meade County residential needs across Sturgis and northern Black Hills corridor communities.'; countyMovingName='Meade County Moving'; regional1Name='Sturgis Corridor Moving'; regional2Name='Northern Black Hills Moving'; countyLabel='Meade County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lawrence'; city='Spearfish'; citySlug='spearfish'; label='Spearfish Metro'; poolId='lawrence-metro-sd'; regional1='spearfish-corridor'; regional2='northern-hills'; topId='regional-lawrence-sd-movers'; topName='Regional Spearfish / Lawrence Providers'; topDesc='Reliable movers serving Lawrence County residential needs across Spearfish, Deadwood, and northern hills tourism communities.'; countyMovingName='Lawrence County Moving'; regional1Name='Spearfish Corridor Moving'; regional2Name='Northern Hills Moving'; countyLabel='Lawrence County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='codington'; city='Watertown'; citySlug='watertown'; label='Watertown Metro'; poolId='codington-metro-sd'; regional1='watertown-corridor'; regional2='glacial-lakes'; topId='regional-codington-sd-movers'; topName='Regional Watertown / Codington Providers'; topDesc='Reliable movers serving Codington County residential needs across Watertown and glacial lakes corridor communities.'; countyMovingName='Codington County Moving'; regional1Name='Watertown Corridor Moving'; regional2Name='Glacial Lakes Moving'; countyLabel='Codington County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='yankton'; city='Yankton'; citySlug='yankton'; label='Yankton Metro'; poolId='yankton-metro-sd'; regional1='yankton-corridor'; regional2='missouri-southeast'; topId='regional-yankton-sd-movers'; topName='Regional Yankton / Yankton County Providers'; topDesc='Reliable movers serving Yankton County residential needs across Yankton and Missouri River southeast corridor communities.'; countyMovingName='Yankton County Moving'; regional1Name='Yankton Corridor Moving'; regional2Name='Missouri Southeast Moving'; countyLabel='Yankton County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='davison'; city='Mitchell'; citySlug='mitchell'; label='Mitchell Metro'; poolId='davison-metro-sd'; regional1='mitchell-corridor'; regional2='james-river-south'; topId='regional-davison-sd-movers'; topName='Regional Mitchell / Davison Providers'; topDesc='Reliable movers serving Davison County residential needs across Mitchell and James River south corridor communities.'; countyMovingName='Davison County Moving'; regional1Name='Mitchell Corridor Moving'; regional2Name='James River South Moving'; countyLabel='Davison County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='beadle'; city='Huron'; citySlug='huron'; label='Huron Metro'; poolId='beadle-metro-sd'; regional1='huron-corridor'; regional2='james-river-central'; topId='regional-beadle-sd-movers'; topName='Regional Huron / Beadle Providers'; topDesc='Reliable movers serving Beadle County residential needs across Huron and central James River corridor communities.'; countyMovingName='Beadle County Moving'; regional1Name='Huron Corridor Moving'; regional2Name='James River Central Moving'; countyLabel='Beadle County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hughes'; city='Pierre'; citySlug='pierre'; label='Pierre Metro'; poolId='hughes-metro-sd'; regional1='pierre-corridor'; regional2='capital-region'; topId='regional-hughes-sd-movers'; topName='Regional Pierre / Hughes Providers'; topDesc='Reliable movers serving Hughes County residential needs across Pierre and South Dakota capital-region communities.'; countyMovingName='Hughes County Moving'; regional1Name='Pierre Corridor Moving'; regional2Name='Capital Region Moving'; countyLabel='Hughes County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='union'; city='Elk Point'; citySlug='elk-point'; label='Sioux City Metro'; poolId='union-metro-sd'; regional1='elk-point-corridor'; regional2='missouri-southeast'; topId='regional-union-sd-movers'; topName='Regional Elk Point / Union Providers'; topDesc='Reliable movers serving Union County residential needs across Elk Point and Sioux City metro spillover communities.'; countyMovingName='Union County Moving'; regional1Name='Elk Point Corridor Moving'; regional2Name='Missouri Southeast Moving'; countyLabel='Union County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clay'; city='Vermillion'; citySlug='vermillion'; label='Vermillion Metro'; poolId='clay-metro-sd'; regional1='vermillion-corridor'; regional2='missouri-south'; topId='regional-clay-sd-movers'; topName='Regional Vermillion / Clay Providers'; topDesc='Reliable movers serving Clay County residential needs across Vermillion and USD university-area communities.'; countyMovingName='Clay County Moving'; regional1Name='Vermillion Corridor Moving'; regional2Name='Missouri South Moving'; countyLabel='Clay County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='shannon'; city='Pine Ridge'; citySlug='pine-ridge'; label='Oglala Lakota Metro'; poolId='shannon-metro-sd'; regional1='pine-ridge-corridor'; regional2='southern-plains'; topId='regional-oglalalakota-sd-movers'; topName='Regional Oglala Lakota Providers'; topDesc='Reliable movers serving Oglala Lakota County residential needs across Pine Ridge and southern plains corridor communities.'; countyMovingName='Oglala Lakota County Moving'; regional1Name='Pine Ridge Corridor Moving'; regional2Name='Southern Plains Moving'; countyLabel='Oglala Lakota County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lake'; city='Madison'; citySlug='madison'; label='Madison Metro'; poolId='lake-metro-sd'; regional1='madison-corridor'; regional2='big-sioux-north'; topId='regional-lake-sd-movers'; topName='Regional Madison / Lake Providers'; topDesc='Reliable movers serving Lake County residential needs across Madison and Big Sioux north corridor communities.'; countyMovingName='Lake County Moving'; regional1Name='Madison Corridor Moving'; regional2Name='Big Sioux North Moving'; countyLabel='Lake County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='butte'; city='Belle Fourche'; citySlug='belle-fourche'; label='Belle Fourche Metro'; poolId='butte-metro-sd'; regional1='belle-fourche-corridor'; regional2='northern-plains'; topId='regional-butte-sd-movers'; topName='Regional Belle Fourche / Butte Providers'; topDesc='Reliable movers serving Butte County residential needs across Belle Fourche and northern plains corridor communities.'; countyMovingName='Butte County Moving'; regional1Name='Belle Fourche Corridor Moving'; regional2Name='Northern Plains Moving'; countyLabel='Butte County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='roberts'; city='Sisseton'; citySlug='sisseton'; label='Sisseton Metro'; poolId='roberts-metro-sd'; regional1='sisseton-corridor'; regional2='lake-traverse'; topId='regional-roberts-sd-movers'; topName='Regional Sisseton / Roberts Providers'; topDesc='Reliable movers serving Roberts County residential needs across Sisseton and Lake Traverse corridor communities.'; countyMovingName='Roberts County Moving'; regional1Name='Sisseton Corridor Moving'; regional2Name='Lake Traverse Moving'; countyLabel='Roberts County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='custer'; city='Custer'; citySlug='custer'; label='Custer Metro'; poolId='custer-metro-sd'; regional1='custer-corridor'; regional2='southern-black-hills'; topId='regional-custer-sd-movers'; topName='Regional Custer / Custer County Providers'; topDesc='Reliable movers serving Custer County residential needs across Custer and southern Black Hills tourism communities.'; countyMovingName='Custer County Moving'; regional1Name='Custer Corridor Moving'; regional2Name='Southern Black Hills Moving'; countyLabel='Custer County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='turner'; city='Parker'; citySlug='parker'; label='Parker Metro'; poolId='turner-metro-sd'; regional1='parker-corridor'; regional2='big-sioux-mid'; topId='regional-turner-sd-movers'; topName='Regional Parker / Turner Providers'; topDesc='Reliable movers serving Turner County residential needs across Parker and Big Sioux mid-corridor communities.'; countyMovingName='Turner County Moving'; regional1Name='Parker Corridor Moving'; regional2Name='Big Sioux Mid Moving'; countyLabel='Turner County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='charles-mix'; city='Lake Andes'; citySlug='lake-andes'; label='Lake Andes Metro'; poolId='charles-mix-metro-sd'; regional1='lake-andes-corridor'; regional2='missouri-plateau'; topId='regional-charlesmix-sd-movers'; topName='Regional Lake Andes / Charles Mix Providers'; topDesc='Reliable movers serving Charles Mix County residential needs across Lake Andes and Missouri plateau rural communities.'; countyMovingName='Charles Mix County Moving'; regional1Name='Lake Andes Corridor Moving'; regional2Name='Missouri Plateau Moving'; countyLabel='Charles Mix County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='todd'; city='Mission'; citySlug='mission'; label='Mission Metro'; poolId='todd-metro-sd'; regional1='mission-corridor'; regional2='rosebud-country'; topId='regional-todd-sd-movers'; topName='Regional Mission / Todd Providers'; topDesc='Reliable movers serving Todd County residential needs across Mission and Rosebud country rural communities.'; countyMovingName='Todd County Moving'; regional1Name='Mission Corridor Moving'; regional2Name='Rosebud Country Moving'; countyLabel='Todd County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fall-river'; city='Hot Springs'; citySlug='hot-springs'; label='Hot Springs Metro'; poolId='fall-river-metro-sd'; regional1='hot-springs-corridor'; regional2='southern-hills'; topId='regional-fallriver-sd-movers'; topName='Regional Hot Springs / Fall River Providers'; topDesc='Reliable movers serving Fall River County residential needs across Hot Springs and southern hills corridor communities.'; countyMovingName='Fall River County Moving'; regional1Name='Hot Springs Corridor Moving'; regional2Name='Southern Hills Moving'; countyLabel='Fall River County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='grant'; city='Milbank'; citySlug='milbank'; label='Milbank Metro'; poolId='grant-metro-sd'; regional1='milbank-corridor'; regional2='glacial-lakes-east'; topId='regional-grant-sd-movers'; topName='Regional Milbank / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Milbank and glacial lakes east corridor communities.'; countyMovingName='Grant County Moving'; regional1Name='Milbank Corridor Moving'; regional2Name='Glacial Lakes East Moving'; countyLabel='Grant County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hutchinson'; city='Olivet'; citySlug='olivet'; label='Olivet Metro'; poolId='hutchinson-metro-sd'; regional1='olivet-corridor'; regional2='james-river-southeast'; topId='regional-hutchinson-sd-movers'; topName='Regional Olivet / Hutchinson Providers'; topDesc='Reliable movers serving Hutchinson County residential needs across Olivet and James River southeast rural communities.'; countyMovingName='Hutchinson County Moving'; regional1Name='Olivet Corridor Moving'; regional2Name='James River Southeast Moving'; countyLabel='Hutchinson County, SD'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bon-homme'; city='Tyndall'; citySlug='tyndall'; label='Tyndall Metro'; poolId='bon-homme-metro-sd'; regional1='tyndall-corridor'; regional2='missouri-bottomlands'; topId='regional-bonhomme-sd-movers'; topName='Regional Tyndall / Bon Homme Providers'; topDesc='Reliable movers serving Bon Homme County residential needs across Tyndall and Missouri bottomlands rural communities.'; countyMovingName='Bon Homme County Moving'; regional1Name='Tyndall Corridor Moving'; regional2Name='Missouri Bottomlands Moving'; countyLabel='Bon Homme County'; franchise=$false; topSpecialties="['Residential']" }
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

foreach ($c in $counties) {
  $slug = $c.slug
  $citySlug = $c.citySlug
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-sd",
    "$citySlug-moving-$slug-sd",
    "$slug-county-moving-$slug-sd",
    "college-hunks-moving-$citySlug-sd",
    "budd-van-lines-$citySlug-sd",
    "$($c.regional1)-moving-$slug-sd",
    "$($c.regional2)-moving-$slug-sd",
    "hercules-movers-$citySlug-sd",
    "krupp-moving-$citySlug-sd"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 2140 } else { 340 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1580; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=1120; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=840; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1420; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=620; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=510; desc="Regional mover serving $($c.city) and $($c.countyLabel) communities with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=440; desc="Local specialist for $($c.countyLabel) residential moves with punctual arrival and professional crew coordination."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=380; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=340; desc="Full-service local mover serving $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Write-Host 'Generated 260 catalog entries, 26 metro pools for South Dakota batch 1'