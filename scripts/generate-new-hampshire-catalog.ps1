$outDir = Join-Path $PSScriptRoot 'new-hampshire-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='hillsborough'; city='Manchester'; citySlug='manchester'; label='Manchester / Nashua Metro'; poolId='hillsborough-metro-nh'
    regional1='manchester-corridor'; regional2='nashua-suburban'
    topId='twomenandatruck-hillsborough-nh'; topName='Two Men and a Truck Manchester / Nashua'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Hillsborough County.'
    countyMovingName='Hillsborough County Moving'; regional1Name='Manchester Corridor Moving'; regional2Name='Nashua Suburban Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='rockingham'; city='Portsmouth'; citySlug='portsmouth'; label='Portsmouth Metro'; poolId='rockingham-metro-nh'
    regional1='portsmouth-corridor'; regional2='seacoast-coastal'
    topId='twomenandatruck-rockingham-nh'; topName='Two Men and a Truck Rockingham County'
    topDesc='Trusted local franchise with excellent reputation for coastal and suburban moves across Rockingham County.'
    countyMovingName='Rockingham County Moving'; regional1Name='Portsmouth Corridor Moving'; regional2Name='Seacoast Coastal Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='merrimack'; city='Concord'; citySlug='concord'; label='Concord Metro'; poolId='merrimack-metro-nh'
    regional1='concord-corridor'; regional2='capital-region'
    topId='regional-merrimack-nh-movers'; topName='Regional Concord / Merrimack Providers'
    topDesc='Reliable movers serving Merrimack County residential needs across Concord and central New Hampshire communities.'
    countyMovingName='Merrimack County Moving'; regional1Name='Concord Corridor Moving'; regional2Name='Capital Region Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='strafford'; city='Dover'; citySlug='dover'; label='Dover Metro'; poolId='strafford-metro-nh'
    regional1='dover-corridor'; regional2='seacoast-inland'
    topId='regional-strafford-nh-movers'; topName='Regional Dover / Strafford Providers'
    topDesc='Reliable movers serving Strafford County residential needs across Dover and southeastern New Hampshire communities.'
    countyMovingName='Strafford County Moving'; regional1Name='Dover Corridor Moving'; regional2Name='Seacoast Inland Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='grafton'; city='Lebanon'; citySlug='lebanon'; label='Lebanon / Hanover Metro'; poolId='grafton-metro-nh'
    regional1='lebanon-corridor'; regional2='upper-valley'
    topId='regional-grafton-nh-movers'; topName='Regional Lebanon / Grafton Providers'
    topDesc='Reliable movers serving Grafton County residential needs across Lebanon, Hanover, and Upper Valley communities.'
    countyMovingName='Grafton County Moving'; regional1Name='Lebanon Corridor Moving'; regional2Name='Upper Valley Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='cheshire'; city='Keene'; citySlug='keene'; label='Keene Metro'; poolId='cheshire-metro-nh'
    regional1='keene-corridor'; regional2='southwest-hills'
    topId='regional-cheshire-nh-movers'; topName='Regional Keene / Cheshire Providers'
    topDesc='Reliable movers serving Cheshire County residential needs across Keene and southwestern New Hampshire communities.'
    countyMovingName='Cheshire County Moving'; regional1Name='Keene Corridor Moving'; regional2Name='Southwest Hills Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='belknap'; city='Laconia'; citySlug='laconia'; label='Laconia Metro'; poolId='belknap-metro-nh'
    regional1='laconia-corridor'; regional2='lakes-region'
    topId='regional-belknap-nh-movers'; topName='Regional Laconia / Belknap Providers'
    topDesc='Reliable movers serving Belknap County residential needs across Laconia and Lakes Region communities.'
    countyMovingName='Belknap County Moving'; regional1Name='Laconia Corridor Moving'; regional2Name='Lakes Region Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='carroll'; city='Ossipee'; citySlug='ossipee'; label='Ossipee Metro'; poolId='carroll-metro-nh'
    regional1='ossipee-corridor'; regional2='white-mountains'
    topId='regional-carroll-nh-movers'; topName='Regional Ossipee / Carroll Providers'
    topDesc='Reliable movers serving Carroll County residential needs across Ossipee and scenic northern New Hampshire communities.'
    countyMovingName='Carroll County Moving'; regional1Name='Ossipee Corridor Moving'; regional2Name='White Mountains Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='sullivan'; city='Newport'; citySlug='newport'; label='Newport Metro'; poolId='sullivan-metro-nh'
    regional1='newport-corridor'; regional2='connecticut-river-west'
    topId='regional-sullivan-nh-movers'; topName='Regional Newport / Sullivan Providers'
    topDesc='Reliable movers serving Sullivan County residential needs across Newport and rural western New Hampshire communities.'
    countyMovingName='Sullivan County Moving'; regional1Name='Newport Corridor Moving'; regional2Name='Connecticut River West Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='coos'; city='Lancaster'; citySlug='lancaster'; label='Lancaster Metro'; poolId='coos-metro-nh'
    regional1='lancaster-corridor'; regional2='north-country'
    topId='regional-coos-nh-movers'; topName='Regional Lancaster / Coos Providers'
    topDesc='Reliable movers serving Coos County residential needs across Lancaster and northern New Hampshire communities.'
    countyMovingName='Coos County Moving'; regional1Name='Lancaster Corridor Moving'; regional2Name='North Country Moving'
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
    "all-my-sons-$citySlug-nh",
    "$citySlug-moving-$slug-nh",
    "$slug-county-moving-$slug-nh",
    "college-hunks-moving-$citySlug-nh",
    "budd-van-lines-$citySlug-nh",
    "$($c.regional1)-moving-$slug-nh",
    "$($c.regional2)-moving-$slug-nh",
    "hercules-movers-$citySlug-nh",
    "krupp-moving-$citySlug-nh"
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
Write-Host 'Generated 100 catalog entries, 10 metro pools for New Hampshire (10 counties)'