$outDir = Join-Path $PSScriptRoot 'colorado-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='el-paso'; city='Colorado Springs'; citySlug='colorado-springs'; label='Colorado Springs Metro'; poolId='el-paso-metro-co'
    regional1='colorado-springs-corridor'; regional2='pikes-peak'
    topId='twomenandatruck-elpaso-co'; topName='Two Men and a Truck Colorado Springs'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across El Paso County and the Colorado Springs metro.'
    countyMovingName='El Paso County Moving'; regional1Name='Colorado Springs Corridor Moving'; regional2Name='Pikes Peak Moving'
    countyLabel='El Paso County, CO'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='denver'; city='Denver'; citySlug='denver'; label='Denver Metro'; poolId='denver-metro-co'
    regional1='denver-corridor'; regional2='front-range'
    topId='twomenandatruck-denver-co'; topName='Two Men and a Truck Denver'
    topDesc='Trusted local franchise with excellent reputation for urban residential and commercial moves across Denver County.'
    countyMovingName='Denver County Moving'; regional1Name='Denver Corridor Moving'; regional2Name='Front Range Moving'
    countyLabel='Denver County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='arapahoe'; city='Aurora'; citySlug='aurora'; label='Denver Metro'; poolId='arapahoe-metro-co'
    regional1='aurora-corridor'; regional2='south-metro'
    topId='twomenandatruck-arapahoe-co'; topName='Two Men and a Truck Aurora'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Arapahoe County south of Denver.'
    countyMovingName='Arapahoe County Moving'; regional1Name='Aurora Corridor Moving'; regional2Name='South Metro Moving'
    countyLabel='Arapahoe County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='jefferson'; city='Lakewood'; citySlug='lakewood'; label='Denver Metro'; poolId='jefferson-metro-co'
    regional1='lakewood-corridor'; regional2='foothills-west'
    topId='twomenandatruck-jefferson-co'; topName='Two Men and a Truck Jefferson County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Jefferson County west of Denver.'
    countyMovingName='Jefferson County Moving'; regional1Name='Lakewood Corridor Moving'; regional2Name='Foothills West Moving'
    countyLabel='Jefferson County, CO'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='adams'; city='Thornton'; citySlug='thornton'; label='Denver Metro'; poolId='adams-metro-co'
    regional1='thornton-corridor'; regional2='north-metro'
    topId='twomenandatruck-adams-co'; topName='Two Men and a Truck Adams County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Adams County northeast of Denver.'
    countyMovingName='Adams County Moving'; regional1Name='Thornton Corridor Moving'; regional2Name='North Metro Moving'
    countyLabel='Adams County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='douglas'; city='Castle Rock'; citySlug='castle-rock'; label='Denver Metro'; poolId='douglas-metro-co'
    regional1='castle-rock-corridor'; regional2='south-suburban'
    topId='twomenandatruck-douglas-co'; topName='Two Men and a Truck Douglas County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across affluent Douglas County south of Denver.'
    countyMovingName='Douglas County Moving'; regional1Name='Castle Rock Corridor Moving'; regional2Name='South Suburban Moving'
    countyLabel='Douglas County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='weld'; city='Greeley'; citySlug='greeley'; label='Greeley Metro'; poolId='weld-metro-co'
    regional1='greeley-corridor'; regional2='northern-front-range'
    topId='regional-weld-co-movers'; topName='Regional Greeley / Weld Providers'
    topDesc='Reliable movers serving Weld County residential needs across Greeley and northern Colorado front-range communities.'
    countyMovingName='Weld County Moving'; regional1Name='Greeley Corridor Moving'; regional2Name='Northern Front Range Moving'
    countyLabel='Weld County'; franchise=$false; topSpecialties="['Residential']"
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
    "all-my-sons-$citySlug-co",
    "$citySlug-moving-$slug-co",
    "$slug-county-moving-$slug-co",
    "college-hunks-moving-$citySlug-co",
    "budd-van-lines-$citySlug-co",
    "$($c.regional1)-moving-$slug-co",
    "$($c.regional2)-moving-$slug-co",
    "hercules-movers-$citySlug-co",
    "krupp-moving-$citySlug-co"
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

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 70 catalog entries, 7 metro pools for Colorado (batch 1 — 7 counties)'