$outDir = Join-Path $PSScriptRoot 'vermont-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='chittenden'; city='Burlington'; citySlug='burlington'; label='Burlington Metro'; poolId='chittenden-metro-vt'
    regional1='burlington-corridor'; regional2='lake-champlain'
    topId='twomenandatruck-chittenden-vt'; topName='Two Men and a Truck Burlington'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Chittenden County.'
    countyMovingName='Chittenden County Moving'; regional1Name='Burlington Corridor Moving'; regional2Name='Lake Champlain Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='washington'; city='Montpelier'; citySlug='montpelier'; label='Montpelier Metro'; poolId='washington-metro-vt'
    regional1='montpelier-corridor'; regional2='capital-region'
    topId='regional-washington-vt-movers'; topName='Regional Montpelier / Washington Providers'
    topDesc='Reliable movers serving Washington County residential needs across Montpelier and central Vermont communities.'
    countyMovingName='Washington County Moving'; regional1Name='Montpelier Corridor Moving'; regional2Name='Capital Region Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='rutland'; city='Rutland'; citySlug='rutland'; label='Rutland Metro'; poolId='rutland-metro-vt'
    regional1='rutland-corridor'; regional2='southern-green-mountains'
    topId='regional-rutland-vt-movers'; topName='Regional Rutland / Rutland County Providers'
    topDesc='Reliable movers serving Rutland County residential needs across Rutland and southern Vermont communities.'
    countyMovingName='Rutland County Moving'; regional1Name='Rutland Corridor Moving'; regional2Name='Southern Green Mountains Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='windsor'; city='Woodstock'; citySlug='woodstock'; label='Windsor Metro'; poolId='windsor-metro-vt'
    regional1='woodstock-corridor'; regional2='scenic-east'
    topId='regional-windsor-vt-movers'; topName='Regional Woodstock / Windsor Providers'
    topDesc='Reliable movers serving Windsor County residential needs across Woodstock and eastern Vermont communities.'
    countyMovingName='Windsor County Moving'; regional1Name='Woodstock Corridor Moving'; regional2Name='Scenic East Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='franklin'; city='St. Albans'; citySlug='stalbans'; label='St. Albans Metro'; poolId='franklin-metro-vt'
    regional1='stalbans-corridor'; regional2='northern-agricultural'
    topId='regional-franklin-vt-movers'; topName='Regional St. Albans / Franklin Providers'
    topDesc='Reliable movers serving Franklin County residential needs across St. Albans and northern Vermont communities.'
    countyMovingName='Franklin County Moving'; regional1Name='St. Albans Corridor Moving'; regional2Name='Northern Agricultural Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='windham'; city='Brattleboro'; citySlug='brattleboro'; label='Brattleboro Metro'; poolId='windham-metro-vt'
    regional1='brattleboro-corridor'; regional2='connecticut-river-south'
    topId='regional-windham-vt-movers'; topName='Regional Brattleboro / Windham Providers'
    topDesc='Reliable movers serving Windham County residential needs across Brattleboro and southeastern Vermont communities.'
    countyMovingName='Windham County Moving'; regional1Name='Brattleboro Corridor Moving'; regional2Name='Connecticut River South Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='addison'; city='Middlebury'; citySlug='middlebury'; label='Middlebury Metro'; poolId='addison-metro-vt'
    regional1='middlebury-corridor'; regional2='champlain-valley-west'
    topId='regional-addison-vt-movers'; topName='Regional Middlebury / Addison Providers'
    topDesc='Reliable movers serving Addison County residential needs across Middlebury and western Vermont communities.'
    countyMovingName='Addison County Moving'; regional1Name='Middlebury Corridor Moving'; regional2Name='Champlain Valley West Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='bennington'; city='Bennington'; citySlug='bennington'; label='Bennington Metro'; poolId='bennington-metro-vt'
    regional1='bennington-corridor'; regional2='southwest-taconic'
    topId='regional-bennington-vt-movers'; topName='Regional Bennington / Bennington County Providers'
    topDesc='Reliable movers serving Bennington County residential needs across Bennington and southwestern Vermont communities.'
    countyMovingName='Bennington County Moving'; regional1Name='Bennington Corridor Moving'; regional2Name='Southwest Taconic Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='caledonia'; city='St. Johnsbury'; citySlug='stjohnsbury'; label='St. Johnsbury Metro'; poolId='caledonia-metro-vt'
    regional1='stjohnsbury-corridor'; regional2='northeast-kingdom'
    topId='regional-caledonia-vt-movers'; topName='Regional St. Johnsbury / Caledonia Providers'
    topDesc='Reliable movers serving Caledonia County residential needs across St. Johnsbury and northeastern Vermont communities.'
    countyMovingName='Caledonia County Moving'; regional1Name='St. Johnsbury Corridor Moving'; regional2Name='Northeast Kingdom Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='orange'; city='Chelsea'; citySlug='chelsea'; label='Chelsea Metro'; poolId='orange-metro-vt'
    regional1='chelsea-corridor'; regional2='central-vermont'
    topId='regional-orange-vt-movers'; topName='Regional Chelsea / Orange Providers'
    topDesc='Reliable movers serving Orange County residential needs across Chelsea and central Vermont communities.'
    countyMovingName='Orange County Moving'; regional1Name='Chelsea Corridor Moving'; regional2Name='Central Vermont Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='orleans'; city='Newport'; citySlug='newport'; label='Newport Metro'; poolId='orleans-metro-vt'
    regional1='newport-corridor'; regional2='northeast-lakes'
    topId='regional-orleans-vt-movers'; topName='Regional Newport / Orleans Providers'
    topDesc='Reliable movers serving Orleans County residential needs across Newport and northeastern Vermont lake communities.'
    countyMovingName='Orleans County Moving'; regional1Name='Newport Corridor Moving'; regional2Name='Northeast Lakes Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='lamoille'; city='Hyde Park'; citySlug='hydepark'; label='Hyde Park Metro'; poolId='lamoille-metro-vt'
    regional1='hydepark-corridor'; regional2='scenic-north'
    topId='regional-lamoille-vt-movers'; topName='Regional Hyde Park / Lamoille Providers'
    topDesc='Reliable movers serving Lamoille County residential needs across Hyde Park and northern Vermont scenic communities.'
    countyMovingName='Lamoille County Moving'; regional1Name='Hyde Park Corridor Moving'; regional2Name='Scenic North Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='grand-isle'; city='North Hero'; citySlug='northhero'; label='North Hero Metro'; poolId='grand-isle-metro-vt'
    regional1='northhero-corridor'; regional2='island-chain'
    topId='regional-grandisle-vt-movers'; topName='Regional North Hero / Grand Isle Providers'
    topDesc='Reliable movers serving Grand Isle County residential needs across North Hero and Lake Champlain island communities.'
    countyMovingName='Grand Isle County Moving'; regional1Name='North Hero Corridor Moving'; regional2Name='Island Chain Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='essex'; city='Guildhall'; citySlug='guildhall'; label='Guildhall Metro'; poolId='essex-metro-vt'
    regional1='guildhall-corridor'; regional2='northeast-frontier'
    topId='regional-essex-vt-movers'; topName='Regional Guildhall / Essex Providers'
    topDesc='Reliable movers serving Essex County residential needs across Guildhall and northeastern Vermont frontier communities.'
    countyMovingName='Essex County Moving'; regional1Name='Guildhall Corridor Moving'; regional2Name='Northeast Frontier Moving'
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
    "all-my-sons-$citySlug-vt",
    "$citySlug-moving-$slug-vt",
    "$slug-county-moving-$slug-vt",
    "college-hunks-moving-$citySlug-vt",
    "budd-van-lines-$citySlug-vt",
    "$($c.regional1)-moving-$slug-vt",
    "$($c.regional2)-moving-$slug-vt",
    "hercules-movers-$citySlug-vt",
    "krupp-moving-$citySlug-vt"
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
  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $assignmentLines += "  ${key}: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 140 catalog entries, 14 metro pools for Vermont (14 counties)'