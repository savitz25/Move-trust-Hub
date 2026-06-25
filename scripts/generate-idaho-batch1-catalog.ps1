$outDir = Join-Path $PSScriptRoot 'idaho-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='ada'; city='Boise'; citySlug='boise'; label='Boise Metro'; poolId='ada-metro-id'; regional1='boise-corridor'; regional2='treasure-valley'; topId='twomenandatruck-ada-id'; topName='Two Men and a Truck Boise'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Ada County and the Boise metro.'; countyMovingName='Ada County Moving'; regional1Name='Boise Corridor Moving'; regional2Name='Treasure Valley Moving'; countyLabel='Ada County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='canyon'; city='Nampa'; citySlug='nampa'; label='Boise Metro'; poolId='canyon-metro-id'; regional1='nampa-corridor'; regional2='treasure-valley-west'; topId='twomenandatruck-canyon-id'; topName='Two Men and a Truck Nampa'; topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Canyon County west of Boise.'; countyMovingName='Canyon County Moving'; regional1Name='Nampa Corridor Moving'; regional2Name='Treasure Valley West Moving'; countyLabel='Canyon County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='kootenai'; city="Coeur d'Alene"; citySlug='coeur-d-alene'; label="Coeur d'Alene Metro"; poolId='kootenai-metro-id'; regional1='coeur-dalene-corridor'; regional2='north-idaho-lakes'; topId='twomenandatruck-kootenai-id'; topName="Two Men and a Truck Coeur d'Alene"; topDesc="Trusted local franchise with excellent reputation for residential moves across Kootenai County and northern Idaho lakeside communities."; countyMovingName='Kootenai County Moving'; regional1Name="Coeur d'Alene Corridor Moving"; regional2Name='North Idaho Lakes Moving'; countyLabel='Kootenai County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='bonneville'; city='Idaho Falls'; citySlug='idaho-falls'; label='Idaho Falls Metro'; poolId='bonneville-metro-id'; regional1='idaho-falls-corridor'; regional2='eastern-snake-river'; topId='regional-bonneville-id-movers'; topName='Regional Idaho Falls / Bonneville Providers'; topDesc='Reliable movers serving Bonneville County residential needs across Idaho Falls and eastern Idaho communities.'; countyMovingName='Bonneville County Moving'; regional1Name='Idaho Falls Corridor Moving'; regional2Name='Eastern Snake River Moving'; countyLabel='Bonneville County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='twin-falls'; city='Twin Falls'; citySlug='twin-falls'; label='Twin Falls Metro'; poolId='twin-falls-metro-id'; regional1='twin-falls-corridor'; regional2='magic-valley'; topId='regional-twinfalls-id-movers'; topName='Regional Twin Falls / Twin Falls County Providers'; topDesc='Reliable movers serving Twin Falls County residential needs across Twin Falls and Magic Valley communities.'; countyMovingName='Twin Falls County Moving'; regional1Name='Twin Falls Corridor Moving'; regional2Name='Magic Valley Moving'; countyLabel='Twin Falls County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bannock'; city='Pocatello'; citySlug='pocatello'; label='Pocatello Metro'; poolId='bannock-metro-id'; regional1='pocatello-corridor'; regional2='portneuf-valley'; topId='regional-bannock-id-movers'; topName='Regional Pocatello / Bannock Providers'; topDesc='Reliable movers serving Bannock County residential needs across Pocatello and eastern Idaho communities.'; countyMovingName='Bannock County Moving'; regional1Name='Pocatello Corridor Moving'; regional2Name='Portneuf Valley Moving'; countyLabel='Bannock County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='madison'; city='Rexburg'; citySlug='rexburg'; label='Rexburg Metro'; poolId='madison-metro-id'; regional1='rexburg-corridor'; regional2='upper-valley'; topId='regional-madison-id-movers'; topName='Regional Rexburg / Madison Providers'; topDesc='Reliable movers serving Madison County residential needs across Rexburg and BYU-Idaho area communities.'; countyMovingName='Madison County Moving'; regional1Name='Rexburg Corridor Moving'; regional2Name='Upper Valley Moving'; countyLabel='Madison County, ID'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bonner'; city='Sandpoint'; citySlug='sandpoint'; label='Sandpoint Metro'; poolId='bonner-metro-id'; regional1='sandpoint-corridor'; regional2='pend-oreille'; topId='regional-bonner-id-movers'; topName='Regional Sandpoint / Bonner Providers'; topDesc='Reliable movers serving Bonner County residential needs across Sandpoint and northern Idaho lakeside communities.'; countyMovingName='Bonner County Moving'; regional1Name='Sandpoint Corridor Moving'; regional2Name='Pend Oreille Moving'; countyLabel='Bonner County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bingham'; city='Blackfoot'; citySlug='blackfoot'; label='Blackfoot Metro'; poolId='bingham-metro-id'; regional1='blackfoot-corridor'; regional2='snake-river-plain'; topId='regional-bingham-id-movers'; topName='Regional Blackfoot / Bingham Providers'; topDesc='Reliable movers serving Bingham County residential needs across Blackfoot and eastern Idaho agricultural communities.'; countyMovingName='Bingham County Moving'; regional1Name='Blackfoot Corridor Moving'; regional2Name='Snake River Plain Moving'; countyLabel='Bingham County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='nez-perce'; city='Lewiston'; citySlug='lewiston'; label='Lewiston Metro'; poolId='nez-perce-metro-id'; regional1='lewiston-corridor'; regional2='clearwater-confluence'; topId='regional-nezperce-id-movers'; topName='Regional Lewiston / Nez Perce Providers'; topDesc='Reliable movers serving Nez Perce County residential needs across Lewiston and north-central Idaho communities.'; countyMovingName='Nez Perce County Moving'; regional1Name='Lewiston Corridor Moving'; regional2Name='Clearwater Confluence Moving'; countyLabel='Nez Perce County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='latah'; city='Moscow'; citySlug='moscow'; label='Moscow Metro'; poolId='latah-metro-id'; regional1='moscow-corridor'; regional2='palouse'; topId='regional-latah-id-movers'; topName='Regional Moscow / Latah Providers'; topDesc='Reliable movers serving Latah County residential needs across Moscow and University of Idaho area communities.'; countyMovingName='Latah County Moving'; regional1Name='Moscow Corridor Moving'; regional2Name='Palouse Moving'; countyLabel='Latah County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jefferson'; city='Rigby'; citySlug='rigby'; label='Rigby Metro'; poolId='jefferson-metro-id'; regional1='rigby-corridor'; regional2='eastern-upper-valley'; topId='regional-jefferson-id-movers'; topName='Regional Rigby / Jefferson Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Rigby and eastern upper valley communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Rigby Corridor Moving'; regional2Name='Eastern Upper Valley Moving'; countyLabel='Jefferson County, ID'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='elmore'; city='Mountain Home'; citySlug='mountain-home'; label='Mountain Home Metro'; poolId='elmore-metro-id'; regional1='mountain-home-corridor'; regional2='southwest-idaho'; topId='regional-elmore-id-movers'; topName='Regional Mountain Home / Elmore Providers'; topDesc='Reliable movers serving Elmore County residential needs across Mountain Home and southwestern Idaho communities.'; countyMovingName='Elmore County Moving'; regional1Name='Mountain Home Corridor Moving'; regional2Name='Southwest Idaho Moving'; countyLabel='Elmore County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='payette'; city='Payette'; citySlug='payette'; label='Payette Metro'; poolId='payette-metro-id'; regional1='payette-corridor'; regional2='treasure-valley-north'; topId='regional-payette-id-movers'; topName='Regional Payette / Payette County Providers'; topDesc='Reliable movers serving Payette County residential needs across Payette and southwestern Idaho communities.'; countyMovingName='Payette County Moving'; regional1Name='Payette Corridor Moving'; regional2Name='Treasure Valley North Moving'; countyLabel='Payette County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cassia'; city='Burley'; citySlug='burley'; label='Burley Metro'; poolId='cassia-metro-id'; regional1='burley-corridor'; regional2='magic-valley-east'; topId='regional-cassia-id-movers'; topName='Regional Burley / Cassia Providers'; topDesc='Reliable movers serving Cassia County residential needs across Burley and southern Magic Valley communities.'; countyMovingName='Cassia County Moving'; regional1Name='Burley Corridor Moving'; regional2Name='Magic Valley East Moving'; countyLabel='Cassia County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jerome'; city='Jerome'; citySlug='jerome'; label='Jerome Metro'; poolId='jerome-metro-id'; regional1='jerome-corridor'; regional2='magic-valley-central'; topId='regional-jerome-id-movers'; topName='Regional Jerome / Jerome County Providers'; topDesc='Reliable movers serving Jerome County residential needs across Jerome and Magic Valley communities.'; countyMovingName='Jerome County Moving'; regional1Name='Jerome Corridor Moving'; regional2Name='Magic Valley Central Moving'; countyLabel='Jerome County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='blaine'; city='Hailey'; citySlug='hailey'; label='Hailey Metro'; poolId='blaine-metro-id'; regional1='hailey-corridor'; regional2='sun-valley-resort'; topId='regional-blaine-id-movers'; topName='Regional Hailey / Blaine Providers'; topDesc='Reliable movers serving Blaine County residential needs across Hailey, Ketchum, and Sun Valley resort communities.'; countyMovingName='Blaine County Moving'; regional1Name='Hailey Corridor Moving'; regional2Name='Sun Valley Resort Moving'; countyLabel='Blaine County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='minidoka'; city='Rupert'; citySlug='rupert'; label='Rupert Metro'; poolId='minidoka-metro-id'; regional1='rupert-corridor'; regional2='magic-valley-south'; topId='regional-minidoka-id-movers'; topName='Regional Rupert / Minidoka Providers'; topDesc='Reliable movers serving Minidoka County residential needs across Rupert and southern Magic Valley communities.'; countyMovingName='Minidoka County Moving'; regional1Name='Rupert Corridor Moving'; regional2Name='Magic Valley South Moving'; countyLabel='Minidoka County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='gem'; city='Emmett'; citySlug='emmett'; label='Emmett Metro'; poolId='gem-metro-id'; regional1='emmett-corridor'; regional2='payette-river'; topId='regional-gem-id-movers'; topName='Regional Emmett / Gem Providers'; topDesc='Reliable movers serving Gem County residential needs across Emmett and southwestern Idaho communities.'; countyMovingName='Gem County Moving'; regional1Name='Emmett Corridor Moving'; regional2Name='Payette River Moving'; countyLabel='Gem County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='idaho'; city='Grangeville'; citySlug='grangeville'; label='Grangeville Metro'; poolId='idaho-metro-id'; regional1='grangeville-corridor'; regional2='central-idaho'; topId='regional-idaho-id-movers'; topName='Regional Grangeville / Idaho County Providers'; topDesc='Reliable movers serving Idaho County residential needs across Grangeville and central Idaho rural communities.'; countyMovingName='Idaho County Moving'; regional1Name='Grangeville Corridor Moving'; regional2Name='Central Idaho Moving'; countyLabel='Idaho County, ID'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='gooding'; city='Gooding'; citySlug='gooding'; label='Gooding Metro'; poolId='gooding-metro-id'; regional1='gooding-corridor'; regional2='magic-valley-west'; topId='regional-gooding-id-movers'; topName='Regional Gooding / Gooding County Providers'; topDesc='Reliable movers serving Gooding County residential needs across Gooding and southern Idaho communities.'; countyMovingName='Gooding County Moving'; regional1Name='Gooding Corridor Moving'; regional2Name='Magic Valley West Moving'; countyLabel='Gooding County'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-id",
    "$citySlug-moving-$slug-id",
    "$slug-county-moving-$slug-id",
    "college-hunks-moving-$citySlug-id",
    "budd-van-lines-$citySlug-id",
    "$($c.regional1)-moving-$slug-id",
    "$($c.regional2)-moving-$slug-id",
    "hercules-movers-$citySlug-id",
    "krupp-moving-$citySlug-id"
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
Write-Host 'Generated 210 catalog entries, 21 metro pools for Idaho batch 1'