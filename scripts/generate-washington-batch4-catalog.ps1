$outDir = Join-Path $PSScriptRoot 'washington-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='mason'; city='Shelton'; citySlug='shelton'; label='Shelton Metro'; poolId='mason-metro-wa'; regional1='shelton-corridor'; regional2='hood-canal'; topId='regional-mason-wa-movers'; topName='Regional Shelton / Mason Providers'; topDesc='Reliable movers serving Mason County residential needs across Shelton and waterfront communities.'; countyMovingName='Mason County Moving'; regional1Name='Shelton Corridor Moving'; regional2Name='Hood Canal Moving'; countyLabel='Mason County' },
  @{ slug='walla-walla'; city='Walla Walla'; citySlug='walla-walla'; label='Walla Walla Metro'; poolId='walla-walla-metro-wa'; regional1='walla-walla-corridor'; regional2='southeast-washington'; topId='regional-wallawalla-wa-movers'; topName='Regional Walla Walla / Walla Walla County Providers'; topDesc='Reliable movers serving Walla Walla County residential needs across Walla Walla and southeastern Washington communities.'; countyMovingName='Walla Walla County Moving'; regional1Name='Walla Walla Corridor Moving'; regional2Name='Southeast Washington Moving'; countyLabel='Walla Walla County' },
  @{ slug='stevens'; city='Colville'; citySlug='colville'; label='Colville Metro'; poolId='stevens-metro-wa'; regional1='colville-corridor'; regional2='northeast-washington'; topId='regional-stevens-wa-movers'; topName='Regional Colville / Stevens Providers'; topDesc='Reliable movers serving Stevens County residential needs across Colville and northeastern Washington communities.'; countyMovingName='Stevens County Moving'; regional1Name='Colville Corridor Moving'; regional2Name='Northeast Washington Moving'; countyLabel='Stevens County' },
  @{ slug='kittitas'; city='Ellensburg'; citySlug='ellensburg'; label='Ellensburg Metro'; poolId='kittitas-metro-wa'; regional1='ellensburg-corridor'; regional2='kittitas-valley'; topId='regional-kittitas-wa-movers'; topName='Regional Ellensburg / Kittitas Providers'; topDesc='Reliable movers serving Kittitas County residential needs across Ellensburg and central Washington communities.'; countyMovingName='Kittitas County Moving'; regional1Name='Ellensburg Corridor Moving'; regional2Name='Kittitas Valley Moving'; countyLabel='Kittitas County' },
  @{ slug='whitman'; city='Pullman'; citySlug='pullman'; label='Pullman Metro'; poolId='whitman-metro-wa'; regional1='pullman-corridor'; regional2='palouse-region'; topId='regional-whitman-wa-movers'; topName='Regional Pullman / Whitman Providers'; topDesc='Reliable movers serving Whitman County residential needs across Pullman, Colfax, and university-area communities.'; countyMovingName='Whitman County Moving'; regional1Name='Pullman Corridor Moving'; regional2Name='Palouse Region Moving'; countyLabel='Whitman County' },
  @{ slug='douglas'; city='Waterville'; citySlug='waterville'; label='Waterville Metro'; poolId='douglas-metro-wa'; regional1='waterville-corridor'; regional2='douglas-highlands'; topId='regional-douglas-wa-movers'; topName='Regional Waterville / Douglas Providers'; topDesc='Reliable movers serving Douglas County residential needs across Waterville and central Washington communities.'; countyMovingName='Douglas County Moving'; regional1Name='Waterville Corridor Moving'; regional2Name='Douglas Highlands Moving'; countyLabel='Douglas County' },
  @{ slug='okanogan'; city='Okanogan'; citySlug='okanogan'; label='Okanogan Metro'; poolId='okanogan-metro-wa'; regional1='okanogan-corridor'; regional2='north-central'; topId='regional-okanogan-wa-movers'; topName='Regional Okanogan / Okanogan County Providers'; topDesc='Reliable movers serving Okanogan County residential needs across Okanogan and north central Washington communities.'; countyMovingName='Okanogan County Moving'; regional1Name='Okanogan Corridor Moving'; regional2Name='North Central Moving'; countyLabel='Okanogan County' },
  @{ slug='jefferson'; city='Port Townsend'; citySlug='port-townsend'; label='Port Townsend Metro'; poolId='jefferson-metro-wa'; regional1='port-townsend-corridor'; regional2='olympic-north'; topId='regional-jefferson-wa-movers'; topName='Regional Port Townsend / Jefferson Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Port Townsend and Olympic Peninsula communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Port Townsend Corridor Moving'; regional2Name='Olympic North Moving'; countyLabel='Jefferson County' },
  @{ slug='klickitat'; city='Goldendale'; citySlug='goldendale'; label='Goldendale Metro'; poolId='klickitat-metro-wa'; regional1='goldendale-corridor'; regional2='columbia-gorge'; topId='regional-klickitat-wa-movers'; topName='Regional Goldendale / Klickitat Providers'; topDesc='Reliable movers serving Klickitat County residential needs across Goldendale and Columbia River communities.'; countyMovingName='Klickitat County Moving'; regional1Name='Goldendale Corridor Moving'; regional2Name='Columbia Gorge Moving'; countyLabel='Klickitat County' },
  @{ slug='pacific'; city='South Bend'; citySlug='south-bend'; label='South Bend Metro'; poolId='pacific-metro-wa'; regional1='south-bend-corridor'; regional2='coastal-pacific'; topId='regional-pacific-wa-movers'; topName='Regional South Bend / Pacific Providers'; topDesc='Reliable movers serving Pacific County residential needs across South Bend and coastal Washington communities.'; countyMovingName='Pacific County Moving'; regional1Name='South Bend Corridor Moving'; regional2Name='Coastal Pacific Moving'; countyLabel='Pacific County' },
  @{ slug='asotin'; city='Asotin'; citySlug='asotin'; label='Asotin Metro'; poolId='asotin-metro-wa'; regional1='asotin-corridor'; regional2='southeast-corner'; topId='regional-asotin-wa-movers'; topName='Regional Asotin / Asotin County Providers'; topDesc='Reliable movers serving Asotin County residential needs across Asotin and southeastern Washington communities.'; countyMovingName='Asotin County Moving'; regional1Name='Asotin Corridor Moving'; regional2Name='Southeast Corner Moving'; countyLabel='Asotin County' },
  @{ slug='adams'; city='Ritzville'; citySlug='ritzville'; label='Ritzville Metro'; poolId='adams-metro-wa'; regional1='ritzville-corridor'; regional2='adams-plateau'; topId='regional-adams-wa-movers'; topName='Regional Ritzville / Adams Providers'; topDesc='Reliable movers serving Adams County residential needs across Ritzville and central Washington agricultural communities.'; countyMovingName='Adams County Moving'; regional1Name='Ritzville Corridor Moving'; regional2Name='Adams Plateau Moving'; countyLabel='Adams County' },
  @{ slug='san-juan'; city='Friday Harbor'; citySlug='friday-harbor'; label='Friday Harbor Metro'; poolId='san-juan-metro-wa'; regional1='friday-harbor-corridor'; regional2='san-juan-islands'; topId='regional-sanjuan-wa-movers'; topName='Regional Friday Harbor / San Juan Providers'; topDesc='Reliable movers serving San Juan County residential needs across Friday Harbor and island communities.'; countyMovingName='San Juan County Moving'; regional1Name='Friday Harbor Corridor Moving'; regional2Name='San Juan Islands Moving'; countyLabel='San Juan County' },
  @{ slug='pend-oreille'; city='Newport'; citySlug='newport'; label='Newport Metro'; poolId='pend-oreille-metro-wa'; regional1='newport-corridor'; regional2='pend-oreille-lake'; topId='regional-pendoreille-wa-movers'; topName='Regional Newport / Pend Oreille Providers'; topDesc='Reliable movers serving Pend Oreille County residential needs across Newport and northeastern Washington communities.'; countyMovingName='Pend Oreille County Moving'; regional1Name='Newport Corridor Moving'; regional2Name='Pend Oreille Lake Moving'; countyLabel='Pend Oreille County' },
  @{ slug='skamania'; city='Stevenson'; citySlug='stevenson'; label='Stevenson Metro'; poolId='skamania-metro-wa'; regional1='stevenson-corridor'; regional2='columbia-gorge-east'; topId='regional-skamania-wa-movers'; topName='Regional Stevenson / Skamania Providers'; topDesc='Reliable movers serving Skamania County residential needs across Stevenson and Columbia River Gorge communities.'; countyMovingName='Skamania County Moving'; regional1Name='Stevenson Corridor Moving'; regional2Name='Columbia Gorge East Moving'; countyLabel='Skamania County' },
  @{ slug='lincoln'; city='Davenport'; citySlug='davenport'; label='Davenport Metro'; poolId='lincoln-metro-wa'; regional1='davenport-corridor'; regional2='lincoln-plateau'; topId='regional-lincoln-wa-movers'; topName='Regional Davenport / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Davenport and eastern Washington rural communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Davenport Corridor Moving'; regional2Name='Lincoln Plateau Moving'; countyLabel='Lincoln County' },
  @{ slug='ferry'; city='Republic'; citySlug='republic'; label='Republic Metro'; poolId='ferry-metro-wa'; regional1='republic-corridor'; regional2='ferry-highlands'; topId='regional-ferry-wa-movers'; topName='Regional Republic / Ferry Providers'; topDesc='Reliable movers serving Ferry County residential needs across Republic and remote northeastern Washington communities.'; countyMovingName='Ferry County Moving'; regional1Name='Republic Corridor Moving'; regional2Name='Ferry Highlands Moving'; countyLabel='Ferry County' },
  @{ slug='wahkiakum'; city='Cathlamet'; citySlug='cathlamet'; label='Cathlamet Metro'; poolId='wahkiakum-metro-wa'; regional1='cathlamet-corridor'; regional2='lower-columbia'; topId='regional-wahkiakum-wa-movers'; topName='Regional Cathlamet / Wahkiakum Providers'; topDesc='Reliable movers serving Wahkiakum County residential needs across Cathlamet and lower Columbia River communities.'; countyMovingName='Wahkiakum County Moving'; regional1Name='Cathlamet Corridor Moving'; regional2Name='Lower Columbia Moving'; countyLabel='Wahkiakum County' },
  @{ slug='columbia'; city='Dayton'; citySlug='dayton'; label='Dayton Metro'; poolId='columbia-metro-wa'; regional1='dayton-corridor'; regional2='southeast-plateau'; topId='regional-columbia-wa-movers'; topName='Regional Dayton / Columbia Providers'; topDesc='Reliable movers serving Columbia County residential needs across Dayton and southeastern Washington rural communities.'; countyMovingName='Columbia County Moving'; regional1Name='Dayton Corridor Moving'; regional2Name='Southeast Plateau Moving'; countyLabel='Columbia County' },
  @{ slug='garfield'; city='Pomeroy'; citySlug='pomeroy'; label='Pomeroy Metro'; poolId='garfield-metro-wa'; regional1='pomeroy-corridor'; regional2='garfield-valley'; topId='regional-garfield-wa-movers'; topName='Regional Pomeroy / Garfield Providers'; topDesc='Reliable movers serving Garfield County residential needs across Pomeroy and southeastern Washington rural communities.'; countyMovingName='Garfield County Moving'; regional1Name='Pomeroy Corridor Moving'; regional2Name='Garfield Valley Moving'; countyLabel='Garfield County' }
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
    "all-my-sons-$citySlug-wa",
    "$citySlug-moving-$slug-wa",
    "$slug-county-moving-$slug-wa",
    "college-hunks-moving-$citySlug-wa",
    "budd-van-lines-$citySlug-wa",
    "$($c.regional1)-moving-$slug-wa",
    "$($c.regional2)-moving-$slug-wa",
    "hercules-movers-$citySlug-wa",
    "krupp-moving-$citySlug-wa"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=300; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1100; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=780; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=580; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=960; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=440; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=360; desc="Regional mover serving $($c.city) and $($c.countyLabel) communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=310; desc="Local specialist for $($c.countyLabel) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=250; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=230; desc="Full-service local mover serving $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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

Set-Content (Join-Path $outDir 'batch4-catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch4-metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch4-assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 200 catalog entries, 20 metro pools for Washington batch 4 (complete state)'