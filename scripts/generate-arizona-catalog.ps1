$outDir = Join-Path $PSScriptRoot 'arizona-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='maricopa'; city='Phoenix'; citySlug='phoenix'; label='Phoenix Metro'; poolId='maricopa-metro-az'
    regional1='phoenix-corridor'; regional2='valley-metro'
    topId='twomenandatruck-maricopa-az'; topName='Two Men and a Truck Phoenix'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban residential and commercial moves across Maricopa County.'
    countyMovingName='Maricopa County Moving'; regional1Name='Phoenix Corridor Moving'; regional2Name='Valley Metro Moving'
    countyLabel='Maricopa County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='pima'; city='Tucson'; citySlug='tucson'; label='Tucson Metro'; poolId='pima-metro-az'
    regional1='tucson-corridor'; regional2='sonoran-desert'
    topId='twomenandatruck-pima-az'; topName='Two Men and a Truck Tucson'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Pima County.'
    countyMovingName='Pima County Moving'; regional1Name='Tucson Corridor Moving'; regional2Name='Sonoran Desert Moving'
    countyLabel='Pima County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='pinal'; city='Florence'; citySlug='florence'; label='Florence Metro'; poolId='pinal-metro-az'
    regional1='florence-corridor'; regional2='pinal-valley'
    topId='regional-pinal-az-movers'; topName='Regional Florence / Pinal Providers'
    topDesc='Reliable movers serving Pinal County residential needs across Florence, Casa Grande, and central Arizona communities.'
    countyMovingName='Pinal County Moving'; regional1Name='Florence Corridor Moving'; regional2Name='Pinal Valley Moving'
    countyLabel='Pinal County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='yavapai'; city='Prescott'; citySlug='prescott'; label='Prescott Metro'; poolId='yavapai-metro-az'
    regional1='prescott-corridor'; regional2='verde-valley'
    topId='regional-yavapai-az-movers'; topName='Regional Prescott / Yavapai Providers'
    topDesc='Reliable movers serving Yavapai County residential needs across Prescott, Prescott Valley, and Verde Valley communities.'
    countyMovingName='Yavapai County Moving'; regional1Name='Prescott Corridor Moving'; regional2Name='Verde Valley Moving'
    countyLabel='Yavapai County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='mohave'; city='Kingman'; citySlug='kingman'; label='Kingman Metro'; poolId='mohave-metro-az'
    regional1='kingman-corridor'; regional2='colorado-river'
    topId='regional-mohave-az-movers'; topName='Regional Kingman / Mohave Providers'
    topDesc='Reliable movers serving Mohave County residential needs across Kingman, Lake Havasu City-area, and northwestern Arizona communities.'
    countyMovingName='Mohave County Moving'; regional1Name='Kingman Corridor Moving'; regional2Name='Colorado River Moving'
    countyLabel='Mohave County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='yuma'; city='Yuma'; citySlug='yuma'; label='Yuma Metro'; poolId='yuma-metro-az'
    regional1='yuma-corridor'; regional2='imperial-valley'
    topId='regional-yuma-az-movers'; topName='Regional Yuma / Yuma County Providers'
    topDesc='Reliable movers serving Yuma County residential needs across Yuma and southwestern Arizona border communities.'
    countyMovingName='Yuma County Moving'; regional1Name='Yuma Corridor Moving'; regional2Name='Imperial Valley Moving'
    countyLabel='Yuma County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='coconino'; city='Flagstaff'; citySlug='flagstaff'; label='Flagstaff Metro'; poolId='coconino-metro-az'
    regional1='flagstaff-corridor'; regional2='high-country'
    topId='regional-coconino-az-movers'; topName='Regional Flagstaff / Coconino Providers'
    topDesc='Reliable movers serving Coconino County residential needs across Flagstaff, Sedona-area, and northern Arizona high-country communities.'
    countyMovingName='Coconino County Moving'; regional1Name='Flagstaff Corridor Moving'; regional2Name='High Country Moving'
    countyLabel='Coconino County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='navajo'; city='Holbrook'; citySlug='holbrook'; label='Holbrook Metro'; poolId='navajo-metro-az'
    regional1='holbrook-corridor'; regional2='northeast-arizona'
    topId='regional-navajo-az-movers'; topName='Regional Holbrook / Navajo County Providers'
    topDesc='Reliable movers serving Navajo County, Arizona residential needs across Holbrook and northeastern Arizona communities.'
    countyMovingName='Navajo County Moving'; regional1Name='Holbrook Corridor Moving'; regional2Name='Northeast Arizona Moving'
    countyLabel='Navajo County, AZ'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='apache'; city='St. Johns'; citySlug='st-johns'; label='St. Johns Metro'; poolId='apache-metro-az'
    regional1='st-johns-corridor'; regional2='white-mountains'
    topId='regional-apache-az-movers'; topName='Regional St. Johns / Apache Providers'
    topDesc='Reliable movers serving Apache County residential needs across St. Johns and eastern Arizona high-plateau communities.'
    countyMovingName='Apache County Moving'; regional1Name='St. Johns Corridor Moving'; regional2Name='White Mountains Moving'
    countyLabel='Apache County, AZ'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='gila'; city='Globe'; citySlug='globe'; label='Globe Metro'; poolId='gila-metro-az'
    regional1='globe-corridor'; regional2='tonto-basin'
    topId='regional-gila-az-movers'; topName='Regional Globe / Gila Providers'
    topDesc='Reliable movers serving Gila County residential needs across Globe, Payson-area, and central Arizona mountain communities.'
    countyMovingName='Gila County Moving'; regional1Name='Globe Corridor Moving'; regional2Name='Tonto Basin Moving'
    countyLabel='Gila County, AZ'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='graham'; city='Safford'; citySlug='safford'; label='Safford Metro'; poolId='graham-metro-az'
    regional1='safford-corridor'; regional2='graham-valley'
    topId='regional-graham-az-movers'; topName='Regional Safford / Graham Providers'
    topDesc='Reliable movers serving Graham County residential needs across Safford and southeastern Arizona communities.'
    countyMovingName='Graham County Moving'; regional1Name='Safford Corridor Moving'; regional2Name='Graham Valley Moving'
    countyLabel='Graham County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='greenlee'; city='Clifton'; citySlug='clifton'; label='Clifton Metro'; poolId='greenlee-metro-az'
    regional1='clifton-corridor'; regional2='copper-corridor'
    topId='regional-greenlee-az-movers'; topName='Regional Clifton / Greenlee Providers'
    topDesc='Reliable movers serving Greenlee County residential needs across Clifton and southeastern Arizona copper-corridor communities.'
    countyMovingName='Greenlee County Moving'; regional1Name='Clifton Corridor Moving'; regional2Name='Copper Corridor Moving'
    countyLabel='Greenlee County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='la-paz'; city='Parker'; citySlug='parker'; label='Parker Metro'; poolId='la-paz-metro-az'
    regional1='parker-corridor'; regional2='colorado-river-west'
    topId='regional-lapaz-az-movers'; topName='Regional Parker / La Paz Providers'
    topDesc='Reliable movers serving La Paz County residential needs across Parker and western Arizona Colorado River communities.'
    countyMovingName='La Paz County Moving'; regional1Name='Parker Corridor Moving'; regional2Name='Colorado River West Moving'
    countyLabel='La Paz County, AZ'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='santa-cruz'; city='Nogales'; citySlug='nogales'; label='Nogales Metro'; poolId='santa-cruz-metro-az'
    regional1='nogales-corridor'; regional2='border-south'
    topId='regional-santacruz-az-movers'; topName='Regional Nogales / Santa Cruz Providers'
    topDesc='Reliable movers serving Santa Cruz County residential needs across Nogales and southern Arizona border communities.'
    countyMovingName='Santa Cruz County Moving'; regional1Name='Nogales Corridor Moving'; regional2Name='Border South Moving'
    countyLabel='Santa Cruz County, AZ'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='cochise'; city='Bisbee'; citySlug='bisbee'; label='Bisbee Metro'; poolId='cochise-metro-az'
    regional1='bisbee-corridor'; regional2='southeast-arizona'
    topId='regional-cochise-az-movers'; topName='Regional Bisbee / Cochise Providers'
    topDesc='Reliable movers serving Cochise County residential needs across Bisbee, Sierra Vista-area, and southeastern Arizona communities.'
    countyMovingName='Cochise County Moving'; regional1Name='Bisbee Corridor Moving'; regional2Name='Southeast Arizona Moving'
    countyLabel='Cochise County'; franchise=$false; topSpecialties="['Residential']"
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
    "all-my-sons-$citySlug-az",
    "$citySlug-moving-$slug-az",
    "$slug-county-moving-$slug-az",
    "college-hunks-moving-$citySlug-az",
    "budd-van-lines-$citySlug-az",
    "$($c.regional1)-moving-$slug-az",
    "$($c.regional2)-moving-$slug-az",
    "hercules-movers-$citySlug-az",
    "krupp-moving-$citySlug-az"
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
Write-Host 'Generated 150 catalog entries, 15 metro pools for Arizona (15/15 complete)'