$outDir = Join-Path $PSScriptRoot 'oregon-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='wasco'; city='The Dalles'; citySlug='the-dalles'; label='The Dalles Metro'; poolId='wasco-metro-or'; regional1='the-dalles-corridor'; regional2='columbia-gorge'; topId='regional-wasco-or-movers'; topName='Regional The Dalles / Wasco Providers'; topDesc='Reliable movers serving Wasco County residential needs across The Dalles and Columbia River Gorge communities.'; countyMovingName='Wasco County Moving'; regional1Name='The Dalles Corridor Moving'; regional2Name='Columbia Gorge Moving'; countyLabel='Wasco County' },
  @{ slug='union'; city='La Grande'; citySlug='la-grande'; label='La Grande Metro'; poolId='union-metro-or'; regional1='la-grande-corridor'; regional2='grande-ronde'; topId='regional-union-or-movers'; topName='Regional La Grande / Union Providers'; topDesc='Reliable movers serving Union County residential needs across La Grande and eastern Oregon communities.'; countyMovingName='Union County Moving'; regional1Name='La Grande Corridor Moving'; regional2Name='Grande Ronde Moving'; countyLabel='Union County, OR' },
  @{ slug='jefferson'; city='Madras'; citySlug='madras'; label='Madras Metro'; poolId='jefferson-metro-or'; regional1='madras-corridor'; regional2='warm-springs'; topId='regional-jefferson-or-movers'; topName='Regional Madras / Jefferson Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Madras and central Oregon communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Madras Corridor Moving'; regional2Name='Warm Springs Moving'; countyLabel='Jefferson County, OR' },
  @{ slug='hood-river'; city='Hood River'; citySlug='hood-river'; label='Hood River Metro'; poolId='hood-river-metro-or'; regional1='hood-river-corridor'; regional2='gorge-wind'; topId='regional-hoodriver-or-movers'; topName='Regional Hood River / Hood River County Providers'; topDesc='Reliable movers serving Hood River County residential needs across Hood River and Columbia Gorge tourism communities.'; countyMovingName='Hood River County Moving'; regional1Name='Hood River Corridor Moving'; regional2Name='Gorge Wind Moving'; countyLabel='Hood River County' },
  @{ slug='curry'; city='Gold Beach'; citySlug='gold-beach'; label='Gold Beach Metro'; poolId='curry-metro-or'; regional1='gold-beach-corridor'; regional2='south-coast'; topId='regional-curry-or-movers'; topName='Regional Gold Beach / Curry Providers'; topDesc='Reliable movers serving Curry County residential needs across Gold Beach and southern Oregon coastal communities.'; countyMovingName='Curry County Moving'; regional1Name='Gold Beach Corridor Moving'; regional2Name='South Coast Moving'; countyLabel='Curry County' },
  @{ slug='baker'; city='Baker City'; citySlug='baker-city'; label='Baker City Metro'; poolId='baker-metro-or'; regional1='baker-city-corridor'; regional2='powder-river'; topId='regional-baker-or-movers'; topName='Regional Baker City / Baker Providers'; topDesc='Reliable movers serving Baker County residential needs across Baker City and eastern Oregon rural communities.'; countyMovingName='Baker County Moving'; regional1Name='Baker City Corridor Moving'; regional2Name='Powder River Moving'; countyLabel='Baker County' },
  @{ slug='morrow'; city='Heppner'; citySlug='heppner'; label='Heppner Metro'; poolId='morrow-metro-or'; regional1='heppner-corridor'; regional2='columbia-plateau'; topId='regional-morrow-or-movers'; topName='Regional Heppner / Morrow Providers'; topDesc='Reliable movers serving Morrow County residential needs across Heppner and eastern Oregon agricultural communities.'; countyMovingName='Morrow County Moving'; regional1Name='Heppner Corridor Moving'; regional2Name='Columbia Plateau Moving'; countyLabel='Morrow County' },
  @{ slug='lake'; city='Lakeview'; citySlug='lakeview'; label='Lakeview Metro'; poolId='lake-metro-or'; regional1='lakeview-corridor'; regional2='high-desert'; topId='regional-lake-or-movers'; topName='Regional Lakeview / Lake Providers'; topDesc='Reliable movers serving Lake County residential needs across Lakeview and southeastern Oregon high-desert communities.'; countyMovingName='Lake County Moving'; regional1Name='Lakeview Corridor Moving'; regional2Name='High Desert Moving'; countyLabel='Lake County, OR' },
  @{ slug='wallowa'; city='Enterprise'; citySlug='enterprise'; label='Enterprise Metro'; poolId='wallowa-metro-or'; regional1='enterprise-corridor'; regional2='wallowa-valley'; topId='regional-wallowa-or-movers'; topName='Regional Enterprise / Wallowa Providers'; topDesc='Reliable movers serving Wallowa County residential needs across Enterprise and northeastern Oregon mountain communities.'; countyMovingName='Wallowa County Moving'; regional1Name='Enterprise Corridor Moving'; regional2Name='Wallowa Valley Moving'; countyLabel='Wallowa County' },
  @{ slug='harney'; city='Burns'; citySlug='burns'; label='Burns Metro'; poolId='harney-metro-or'; regional1='burns-corridor'; regional2='harney-basin'; topId='regional-harney-or-movers'; topName='Regional Burns / Harney Providers'; topDesc='Reliable movers serving Harney County residential needs across Burns and remote southeastern Oregon communities.'; countyMovingName='Harney County Moving'; regional1Name='Burns Corridor Moving'; regional2Name='Harney Basin Moving'; countyLabel='Harney County' },
  @{ slug='grant'; city='Canyon City'; citySlug='canyon-city'; label='Canyon City Metro'; poolId='grant-metro-or'; regional1='canyon-city-corridor'; regional2='john-day'; topId='regional-grant-or-movers'; topName='Regional Canyon City / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Canyon City and eastern Oregon rural communities.'; countyMovingName='Grant County Moving'; regional1Name='Canyon City Corridor Moving'; regional2Name='John Day Moving'; countyLabel='Grant County, OR' },
  @{ slug='sherman'; city='Moro'; citySlug='moro'; label='Moro Metro'; poolId='sherman-metro-or'; regional1='moro-corridor'; regional2='wheat-country'; topId='regional-sherman-or-movers'; topName='Regional Moro / Sherman Providers'; topDesc='Reliable movers serving Sherman County residential needs across Moro and Columbia Plateau wheat-country communities.'; countyMovingName='Sherman County Moving'; regional1Name='Moro Corridor Moving'; regional2Name='Wheat Country Moving'; countyLabel='Sherman County, OR' },
  @{ slug='gilliam'; city='Condon'; citySlug='condon'; label='Condon Metro'; poolId='gilliam-metro-or'; regional1='condon-corridor'; regional2='plateau-north'; topId='regional-gilliam-or-movers'; topName='Regional Condon / Gilliam Providers'; topDesc='Reliable movers serving Gilliam County residential needs across Condon and north-central Oregon plateau communities.'; countyMovingName='Gilliam County Moving'; regional1Name='Condon Corridor Moving'; regional2Name='Plateau North Moving'; countyLabel='Gilliam County' },
  @{ slug='wheeler'; city='Fossil'; citySlug='fossil'; label='Fossil Metro'; poolId='wheeler-metro-or'; regional1='fossil-corridor'; regional2='john-day-fossil'; topId='regional-wheeler-or-movers'; topName='Regional Fossil / Wheeler Providers'; topDesc='Reliable movers serving Wheeler County residential needs across Fossil and remote north-central Oregon communities.'; countyMovingName='Wheeler County Moving'; regional1Name='Fossil Corridor Moving'; regional2Name='John Day Fossil Moving'; countyLabel='Wheeler County' }
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
    "all-my-sons-$citySlug-or",
    "$citySlug-moving-$slug-or",
    "$slug-county-moving-$slug-or",
    "college-hunks-moving-$citySlug-or",
    "budd-van-lines-$citySlug-or",
    "$($c.regional1)-moving-$slug-or",
    "$($c.regional2)-moving-$slug-or",
    "hercules-movers-$citySlug-or",
    "krupp-moving-$citySlug-or"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1420; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=980; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=720; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1280; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=560; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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

Set-Content (Join-Path $outDir 'batch2-catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch2-metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch2-assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 140 catalog entries, 14 metro pools for Oregon batch 2'