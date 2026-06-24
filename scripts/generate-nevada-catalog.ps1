$outDir = Join-Path $PSScriptRoot 'nevada-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='clark'; city='Las Vegas'; citySlug='las-vegas'; label='Las Vegas Metro'; poolId='clark-metro-nv'
    regional1='las-vegas-corridor'; regional2='strip-corridor'
    topId='twomenandatruck-clark-nv'; topName='Two Men and a Truck Las Vegas'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban residential and commercial moves across Clark County.'
    countyMovingName='Clark County Moving'; regional1Name='Las Vegas Corridor Moving'; regional2Name='Strip Corridor Moving'
    countyLabel='Clark County, NV'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='washoe'; city='Reno'; citySlug='reno'; label='Reno Metro'; poolId='washoe-metro-nv'
    regional1='reno-corridor'; regional2='truckee-meadows'
    topId='twomenandatruck-washoe-nv'; topName='Two Men and a Truck Reno'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Washoe County.'
    countyMovingName='Washoe County Moving'; regional1Name='Reno Corridor Moving'; regional2Name='Truckee Meadows Moving'
    countyLabel='Washoe County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='lyon'; city='Yerington'; citySlug='yerington'; label='Yerington Metro'; poolId='lyon-metro-nv'
    regional1='yerington-corridor'; regional2='mason-valley'
    topId='regional-lyon-nv-movers'; topName='Regional Yerington / Lyon Providers'
    topDesc='Reliable movers serving Lyon County residential needs across Yerington and western Nevada communities.'
    countyMovingName='Lyon County Moving'; regional1Name='Yerington Corridor Moving'; regional2Name='Mason Valley Moving'
    countyLabel='Lyon County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='carson-city'; city='Carson City'; citySlug='carson-city'; label='Carson City Metro'; poolId='carson-city-metro-nv'
    regional1='carson-city-corridor'; regional2='capital-region'
    topId='regional-carsoncity-nv-movers'; topName='Regional Carson City Providers'
    topDesc='Reliable movers serving Carson City residential needs across Nevada''s capital and surrounding communities.'
    countyMovingName='Carson City Moving'; regional1Name='Carson City Corridor Moving'; regional2Name='Capital Region Moving'
    countyLabel='Carson City'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='nye'; city='Tonopah'; citySlug='tonopah'; label='Tonopah Metro'; poolId='nye-metro-nv'
    regional1='tonopah-corridor'; regional2='nye-valley'
    topId='regional-nye-nv-movers'; topName='Regional Tonopah / Nye Providers'
    topDesc='Reliable movers serving Nye County residential needs across Tonopah, Pahrump-area, and central Nevada communities.'
    countyMovingName='Nye County Moving'; regional1Name='Tonopah Corridor Moving'; regional2Name='Nye Valley Moving'
    countyLabel='Nye County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='elko'; city='Elko'; citySlug='elko'; label='Elko Metro'; poolId='elko-metro-nv'
    regional1='elko-corridor'; regional2='northeast-nevada'
    topId='regional-elko-nv-movers'; topName='Regional Elko / Elko County Providers'
    topDesc='Reliable movers serving Elko County residential needs across Elko and northeastern Nevada communities.'
    countyMovingName='Elko County Moving'; regional1Name='Elko Corridor Moving'; regional2Name='Northeast Nevada Moving'
    countyLabel='Elko County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='douglas'; city='Minden'; citySlug='minden'; label='Minden Metro'; poolId='douglas-metro-nv'
    regional1='minden-corridor'; regional2='carson-valley'
    topId='regional-douglas-nv-movers'; topName='Regional Minden / Douglas Providers'
    topDesc='Reliable movers serving Douglas County residential needs across Minden, Gardnerville, and Carson Valley communities.'
    countyMovingName='Douglas County Moving'; regional1Name='Minden Corridor Moving'; regional2Name='Carson Valley Moving'
    countyLabel='Douglas County, NV'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='churchill'; city='Fallon'; citySlug='fallon'; label='Fallon Metro'; poolId='churchill-metro-nv'
    regional1='fallon-corridor'; regional2='lahontan-valley'
    topId='regional-churchill-nv-movers'; topName='Regional Fallon / Churchill Providers'
    topDesc='Reliable movers serving Churchill County residential needs across Fallon and Lahontan Valley communities.'
    countyMovingName='Churchill County Moving'; regional1Name='Fallon Corridor Moving'; regional2Name='Lahontan Valley Moving'
    countyLabel='Churchill County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='humboldt'; city='Winnemucca'; citySlug='winnemucca'; label='Winnemucca Metro'; poolId='humboldt-metro-nv'
    regional1='winnemucca-corridor'; regional2='humboldt-river'
    topId='regional-humboldt-nv-movers'; topName='Regional Winnemucca / Humboldt Providers'
    topDesc='Reliable movers serving Humboldt County residential needs across Winnemucca and northern Nevada communities.'
    countyMovingName='Humboldt County Moving'; regional1Name='Winnemucca Corridor Moving'; regional2Name='Humboldt River Moving'
    countyLabel='Humboldt County, NV'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='white-pine'; city='Ely'; citySlug='ely'; label='Ely Metro'; poolId='white-pine-metro-nv'
    regional1='ely-corridor'; regional2='great-basin'
    topId='regional-whitepine-nv-movers'; topName='Regional Ely / White Pine Providers'
    topDesc='Reliable movers serving White Pine County residential needs across Ely and eastern Nevada communities.'
    countyMovingName='White Pine County Moving'; regional1Name='Ely Corridor Moving'; regional2Name='Great Basin Moving'
    countyLabel='White Pine County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='pershing'; city='Lovelock'; citySlug='lovelock'; label='Lovelock Metro'; poolId='pershing-metro-nv'
    regional1='lovelock-corridor'; regional2='humboldt-sink'
    topId='regional-pershing-nv-movers'; topName='Regional Lovelock / Pershing Providers'
    topDesc='Reliable movers serving Pershing County residential needs across Lovelock and northwestern Nevada communities.'
    countyMovingName='Pershing County Moving'; regional1Name='Lovelock Corridor Moving'; regional2Name='Humboldt Sink Moving'
    countyLabel='Pershing County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='lander'; city='Battle Mountain'; citySlug='battle-mountain'; label='Battle Mountain Metro'; poolId='lander-metro-nv'
    regional1='battle-mountain-corridor'; regional2='central-nevada'
    topId='regional-lander-nv-movers'; topName='Regional Battle Mountain / Lander Providers'
    topDesc='Reliable movers serving Lander County residential needs across Battle Mountain and central Nevada communities.'
    countyMovingName='Lander County Moving'; regional1Name='Battle Mountain Corridor Moving'; regional2Name='Central Nevada Moving'
    countyLabel='Lander County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='storey'; city='Virginia City'; citySlug='virginia-city'; label='Virginia City Metro'; poolId='storey-metro-nv'
    regional1='virginia-city-corridor'; regional2='comstock'
    topId='regional-storey-nv-movers'; topName='Regional Virginia City / Storey Providers'
    topDesc='Reliable movers serving Storey County residential needs across Virginia City and Comstock communities.'
    countyMovingName='Storey County Moving'; regional1Name='Virginia City Corridor Moving'; regional2Name='Comstock Moving'
    countyLabel='Storey County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='mineral'; city='Hawthorne'; citySlug='hawthorne'; label='Hawthorne Metro'; poolId='mineral-metro-nv'
    regional1='hawthorne-corridor'; regional2='walker-lake'
    topId='regional-mineral-nv-movers'; topName='Regional Hawthorne / Mineral Providers'
    topDesc='Reliable movers serving Mineral County residential needs across Hawthorne and western Nevada communities.'
    countyMovingName='Mineral County Moving'; regional1Name='Hawthorne Corridor Moving'; regional2Name='Walker Lake Moving'
    countyLabel='Mineral County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='lincoln'; city='Pioche'; citySlug='pioche'; label='Pioche Metro'; poolId='lincoln-metro-nv'
    regional1='pioche-corridor'; regional2='lincoln-valley'
    topId='regional-lincoln-nv-movers'; topName='Regional Pioche / Lincoln Providers'
    topDesc='Reliable movers serving Lincoln County residential needs across Pioche and southeastern Nevada communities.'
    countyMovingName='Lincoln County Moving'; regional1Name='Pioche Corridor Moving'; regional2Name='Lincoln Valley Moving'
    countyLabel='Lincoln County, NV'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='eureka'; city='Eureka'; citySlug='eureka'; label='Eureka Metro'; poolId='eureka-metro-nv'
    regional1='eureka-corridor'; regional2='diamond-range'
    topId='regional-eureka-nv-movers'; topName='Regional Eureka / Eureka County Providers'
    topDesc='Reliable movers serving Eureka County residential needs across Eureka and central Nevada communities.'
    countyMovingName='Eureka County Moving'; regional1Name='Eureka Corridor Moving'; regional2Name='Diamond Range Moving'
    countyLabel='Eureka County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='esmeralda'; city='Goldfield'; citySlug='goldfield'; label='Goldfield Metro'; poolId='esmeralda-metro-nv'
    regional1='goldfield-corridor'; regional2='desert-south'
    topId='regional-esmeralda-nv-movers'; topName='Regional Goldfield / Esmeralda Providers'
    topDesc='Reliable movers serving Esmeralda County residential needs across Goldfield and remote southern Nevada communities.'
    countyMovingName='Esmeralda County Moving'; regional1Name='Goldfield Corridor Moving'; regional2Name='Desert South Moving'
    countyLabel='Esmeralda County'; franchise=$false; topSpecialties="['Residential']"
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
    "all-my-sons-$citySlug-nv",
    "$citySlug-moving-$slug-nv",
    "$slug-county-moving-$slug-nv",
    "college-hunks-moving-$citySlug-nv",
    "budd-van-lines-$citySlug-nv",
    "$($c.regional1)-moving-$slug-nv",
    "$($c.regional2)-moving-$slug-nv",
    "hercules-movers-$citySlug-nv",
    "krupp-moving-$citySlug-nv"
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

  $key = "'$slug'"
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 170 catalog entries, 17 metro pools for Nevada (17/17 complete)'