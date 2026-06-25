$outDir = Join-Path $PSScriptRoot 'colorado-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='larimer'; city='Fort Collins'; citySlug='fort-collins'; label='Fort Collins Metro'; poolId='larimer-metro-co'
    regional1='fort-collins-corridor'; regional2='northern-front-range'
    topId='twomenandatruck-larimer-co'; topName='Two Men and a Truck Fort Collins'
    topDesc='Trusted local franchise with excellent reputation for residential moves across Larimer County and the Fort Collins metro.'
    countyMovingName='Larimer County Moving'; regional1Name='Fort Collins Corridor Moving'; regional2Name='Northern Front Range Moving'
    countyLabel='Larimer County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='boulder'; city='Boulder'; citySlug='boulder'; label='Boulder Metro'; poolId='boulder-metro-co'
    regional1='boulder-corridor'; regional2='flatirons-foothills'
    topId='twomenandatruck-boulder-co'; topName='Two Men and a Truck Boulder'
    topDesc='Trusted local franchise with excellent reputation for residential moves across Boulder County.'
    countyMovingName='Boulder County Moving'; regional1Name='Boulder Corridor Moving'; regional2Name='Flatirons Foothills Moving'
    countyLabel='Boulder County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='pueblo'; city='Pueblo'; citySlug='pueblo'; label='Pueblo Metro'; poolId='pueblo-metro-co'
    regional1='pueblo-corridor'; regional2='southern-colorado'
    topId='regional-pueblo-co-movers'; topName='Regional Pueblo / Pueblo County Providers'
    topDesc='Reliable movers serving Pueblo County residential needs across Pueblo and southern Colorado communities.'
    countyMovingName='Pueblo County Moving'; regional1Name='Pueblo Corridor Moving'; regional2Name='Southern Colorado Moving'
    countyLabel='Pueblo County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='mesa'; city='Grand Junction'; citySlug='grand-junction'; label='Grand Junction Metro'; poolId='mesa-metro-co'
    regional1='grand-junction-corridor'; regional2='western-slope'
    topId='regional-mesa-co-movers'; topName='Regional Grand Junction / Mesa Providers'
    topDesc='Reliable movers serving Mesa County residential needs across Grand Junction and western Colorado communities.'
    countyMovingName='Mesa County Moving'; regional1Name='Grand Junction Corridor Moving'; regional2Name='Western Slope Moving'
    countyLabel='Mesa County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='broomfield'; city='Broomfield'; citySlug='broomfield'; label='Denver Metro'; poolId='broomfield-metro-co'
    regional1='broomfield-corridor'; regional2='northwest-metro'
    topId='regional-broomfield-co-movers'; topName='Regional Broomfield Providers'
    topDesc='Reliable movers serving Broomfield County residential needs across Broomfield and northwest Denver metro communities.'
    countyMovingName='Broomfield County Moving'; regional1Name='Broomfield Corridor Moving'; regional2Name='Northwest Metro Moving'
    countyLabel='Broomfield County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='garfield'; city='Glenwood Springs'; citySlug='glenwood-springs'; label='Glenwood Springs Metro'; poolId='garfield-metro-co'
    regional1='glenwood-corridor'; regional2='roaring-fork-valley'
    topId='regional-garfield-co-movers'; topName='Regional Glenwood Springs / Garfield Providers'
    topDesc='Reliable movers serving Garfield County residential needs across Glenwood Springs and Roaring Fork Valley communities.'
    countyMovingName='Garfield County Moving'; regional1Name='Glenwood Corridor Moving'; regional2Name='Roaring Fork Valley Moving'
    countyLabel='Garfield County, CO'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='la-plata'; city='Durango'; citySlug='durango'; label='Durango Metro'; poolId='la-plata-metro-co'
    regional1='durango-corridor'; regional2='san-juan-mountains'
    topId='regional-laplata-co-movers'; topName='Regional Durango / La Plata Providers'
    topDesc='Reliable movers serving La Plata County residential needs across Durango and southwestern Colorado communities.'
    countyMovingName='La Plata County Moving'; regional1Name='Durango Corridor Moving'; regional2Name='San Juan Mountains Moving'
    countyLabel='La Plata County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='eagle'; city='Vail'; citySlug='vail'; label='Eagle-Vail Metro'; poolId='eagle-metro-co'
    regional1='vail-corridor'; regional2='ski-country'
    topId='regional-eagle-co-movers'; topName='Regional Vail / Eagle Providers'
    topDesc='Reliable movers serving Eagle County residential needs across Vail, Avon, and mountain resort communities.'
    countyMovingName='Eagle County Moving'; regional1Name='Vail Corridor Moving'; regional2Name='Ski Country Moving'
    countyLabel='Eagle County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='fremont'; city='Canon City'; citySlug='canon-city'; label='Canon City Metro'; poolId='fremont-metro-co'
    regional1='canon-city-corridor'; regional2='royal-gorge'
    topId='regional-fremont-co-movers'; topName='Regional Canon City / Fremont Providers'
    topDesc='Reliable movers serving Fremont County residential needs across Canon City and central Colorado communities.'
    countyMovingName='Fremont County Moving'; regional1Name='Canon City Corridor Moving'; regional2Name='Royal Gorge Moving'
    countyLabel='Fremont County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='montrose'; city='Montrose'; citySlug='montrose'; label='Montrose Metro'; poolId='montrose-metro-co'
    regional1='montrose-corridor'; regional2='uncompahgre-valley'
    topId='regional-montrose-co-movers'; topName='Regional Montrose / Montrose County Providers'
    topDesc='Reliable movers serving Montrose County residential needs across Montrose and western Colorado communities.'
    countyMovingName='Montrose County Moving'; regional1Name='Montrose Corridor Moving'; regional2Name='Uncompahgre Valley Moving'
    countyLabel='Montrose County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='delta'; city='Delta'; citySlug='delta'; label='Delta Metro'; poolId='delta-metro-co'
    regional1='delta-corridor'; regional2='western-slope-south'
    topId='regional-delta-co-movers'; topName='Regional Delta / Delta County Providers'
    topDesc='Reliable movers serving Delta County residential needs across Delta and western Colorado communities.'
    countyMovingName='Delta County Moving'; regional1Name='Delta Corridor Moving'; regional2Name='Western Slope South Moving'
    countyLabel='Delta County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='elbert'; city='Kiowa'; citySlug='kiowa'; label='Kiowa Metro'; poolId='elbert-metro-co'
    regional1='kiowa-corridor'; regional2='eastern-plains'
    topId='regional-elbert-co-movers'; topName='Regional Kiowa / Elbert Providers'
    topDesc='Reliable movers serving Elbert County residential needs across Kiowa and eastern Colorado plains communities.'
    countyMovingName='Elbert County Moving'; regional1Name='Kiowa Corridor Moving'; regional2Name='Eastern Plains Moving'
    countyLabel='Elbert County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='summit'; city='Breckenridge'; citySlug='breckenridge'; label='Breckenridge Metro'; poolId='summit-metro-co'
    regional1='breckenridge-corridor'; regional2='ski-resort'
    topId='regional-summit-co-movers'; topName='Regional Breckenridge / Summit Providers'
    topDesc='Reliable movers serving Summit County residential needs across Breckenridge, Frisco, and high-mountain resort communities.'
    countyMovingName='Summit County Moving'; regional1Name='Breckenridge Corridor Moving'; regional2Name='Ski Resort Moving'
    countyLabel='Summit County, CO'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='morgan'; city='Fort Morgan'; citySlug='fort-morgan'; label='Fort Morgan Metro'; poolId='morgan-metro-co'
    regional1='fort-morgan-corridor'; regional2='eastern-plains-north'
    topId='regional-morgan-co-movers'; topName='Regional Fort Morgan / Morgan Providers'
    topDesc='Reliable movers serving Morgan County residential needs across Fort Morgan and eastern Colorado communities.'
    countyMovingName='Morgan County Moving'; regional1Name='Fort Morgan Corridor Moving'; regional2Name='Eastern Plains North Moving'
    countyLabel='Morgan County, CO'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='montezuma'; city='Cortez'; citySlug='cortez'; label='Cortez Metro'; poolId='montezuma-metro-co'
    regional1='cortez-corridor'; regional2='four-corners'
    topId='regional-montezuma-co-movers'; topName='Regional Cortez / Montezuma Providers'
    topDesc='Reliable movers serving Montezuma County residential needs across Cortez and southwestern Colorado communities.'
    countyMovingName='Montezuma County Moving'; regional1Name='Cortez Corridor Moving'; regional2Name='Four Corners Moving'
    countyLabel='Montezuma County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='routt'; city='Steamboat Springs'; citySlug='steamboat-springs'; label='Steamboat Springs Metro'; poolId='routt-metro-co'
    regional1='steamboat-corridor'; regional2='yampa-valley'
    topId='regional-routt-co-movers'; topName='Regional Steamboat Springs / Routt Providers'
    topDesc='Reliable movers serving Routt County residential needs across Steamboat Springs and northwestern Colorado communities.'
    countyMovingName='Routt County Moving'; regional1Name='Steamboat Corridor Moving'; regional2Name='Yampa Valley Moving'
    countyLabel='Routt County'; franchise=$false; topSpecialties="['Residential']"
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
Write-Host 'Generated 160 catalog entries, 16 metro pools for Colorado batch 2'