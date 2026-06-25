$outDir = Join-Path $PSScriptRoot 'minnesota-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='sherburne'; city='Elk River'; citySlug='elk-river'; label='Minneapolis–Saint Paul Metro'; poolId='sherburne-metro-mn'; regional1='elk-river-corridor'; regional2='rum-river-sherburne'; topId='regional-sherburne-mn-movers'; topName='Regional Elk River / Sherburne Providers'; topDesc='Reliable movers serving Sherburne County residential needs across Elk River and northwest metro Rum River corridor communities.'; countyMovingName='Sherburne County Moving'; regional1Name='Elk River Corridor Moving'; regional2Name='Rum River Sherburne Moving'; countyLabel='Sherburne County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='blue-earth'; city='Mankato'; citySlug='mankato'; label='Mankato Metro'; poolId='blue-earth-metro-mn'; regional1='mankato-corridor'; regional2='minnesota-river-blue-earth'; topId='regional-blueearth-mn-movers'; topName='Regional Mankato / Blue Earth Providers'; topDesc='Reliable movers serving Blue Earth County residential needs across Mankato and Minnesota River valley corridor communities.'; countyMovingName='Blue Earth County Moving'; regional1Name='Mankato Corridor Moving'; regional2Name='Minnesota River Blue Earth Moving'; countyLabel='Blue Earth County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='rice'; city='Faribault'; citySlug='faribault'; label='Faribault Metro'; poolId='rice-metro-mn'; regional1='faribault-corridor'; regional2='cannon-river-rice'; topId='regional-rice-mn-movers'; topName='Regional Faribault / Rice Providers'; topDesc='Reliable movers serving Rice County residential needs across Faribault and Cannon River corridor communities.'; countyMovingName='Rice County Moving'; regional1Name='Faribault Corridor Moving'; regional2Name='Cannon River Rice Moving'; countyLabel='Rice County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='crow-wing'; city='Brainerd'; citySlug='brainerd'; label='Brainerd Metro'; poolId='crow-wing-metro-mn'; regional1='brainerd-corridor'; regional2='gull-lake-crow-wing'; topId='regional-crowwing-mn-movers'; topName='Regional Brainerd / Crow Wing Providers'; topDesc='Reliable movers serving Crow Wing County residential needs across Brainerd and Gull Lake lakes-country corridor communities.'; countyMovingName='Crow Wing County Moving'; regional1Name='Brainerd Corridor Moving'; regional2Name='Gull Lake Crow Wing Moving'; countyLabel='Crow Wing County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clay'; city='Moorhead'; citySlug='moorhead'; label='Fargo-Moorhead Metro'; poolId='clay-metro-mn'; regional1='moorhead-corridor'; regional2='red-river-clay'; topId='regional-clay-mn-movers'; topName='Regional Moorhead / Clay Providers'; topDesc='Reliable movers serving Clay County residential needs across Moorhead and Red River Fargo–Moorhead corridor communities.'; countyMovingName='Clay County Moving'; regional1Name='Moorhead Corridor Moving'; regional2Name='Red River Clay Moving'; countyLabel='Clay County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='otter-tail'; city='Fergus Falls'; citySlug='fergus-falls'; label='Fergus Falls Metro'; poolId='otter-tail-metro-mn'; regional1='fergus-falls-corridor'; regional2='otter-tail-lakes'; topId='regional-ottertail-mn-movers'; topName='Regional Fergus Falls / Otter Tail Providers'; topDesc='Reliable movers serving Otter Tail County residential needs across Fergus Falls and Otter Tail lake chain corridor communities.'; countyMovingName='Otter Tail County Moving'; regional1Name='Fergus Falls Corridor Moving'; regional2Name='Otter Tail Lakes Moving'; countyLabel='Otter Tail County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='chisago'; city='Center City'; citySlug='center-city'; label='Minneapolis–Saint Paul Metro'; poolId='chisago-metro-mn'; regional1='center-city-corridor'; regional2='st-croix-chisago'; topId='regional-chisago-mn-movers'; topName='Regional Center City / Chisago Providers'; topDesc='Reliable movers serving Chisago County residential needs across Center City and St. Croix River east metro corridor communities.'; countyMovingName='Chisago County Moving'; regional1Name='Center City Corridor Moving'; regional2Name='St. Croix Chisago Moving'; countyLabel='Chisago County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='winona'; city='Winona'; citySlug='winona'; label='Winona Metro'; poolId='winona-metro-mn'; regional1='winona-corridor'; regional2='mississippi-bluff-winona'; topId='regional-winona-mn-movers'; topName='Regional Winona / Winona County Providers'; topDesc='Reliable movers serving Winona County residential needs across Winona and Mississippi River bluff corridor communities.'; countyMovingName='Winona County Moving'; regional1Name='Winona Corridor Moving'; regional2Name='Mississippi Bluff Winona Moving'; countyLabel='Winona County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='goodhue'; city='Red Wing'; citySlug='red-wing'; label='Red Wing Metro'; poolId='goodhue-metro-mn'; regional1='red-wing-corridor'; regional2='cannon-river-goodhue'; topId='regional-goodhue-mn-movers'; topName='Regional Red Wing / Goodhue Providers'; topDesc='Reliable movers serving Goodhue County residential needs across Red Wing and Cannon River corridor communities.'; countyMovingName='Goodhue County Moving'; regional1Name='Red Wing Corridor Moving'; regional2Name='Cannon River Goodhue Moving'; countyLabel='Goodhue County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='beltrami'; city='Bemidji'; citySlug='bemidji'; label='Bemidji Metro'; poolId='beltrami-metro-mn'; regional1='bemidji-corridor'; regional2='lake-bemidji-beltrami'; topId='regional-beltrami-mn-movers'; topName='Regional Bemidji / Beltrami Providers'; topDesc='Reliable movers serving Beltrami County residential needs across Bemidji and upper Mississippi headwaters corridor communities.'; countyMovingName='Beltrami County Moving'; regional1Name='Bemidji Corridor Moving'; regional2Name='Lake Bemidji Beltrami Moving'; countyLabel='Beltrami County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='itasca'; city='Grand Rapids'; citySlug='grand-rapids'; label='Grand Rapids Metro'; poolId='itasca-metro-mn'; regional1='grand-rapids-corridor'; regional2='mississippi-headwaters-itasca'; topId='regional-itasca-mn-movers'; topName='Regional Grand Rapids / Itasca Providers'; topDesc='Reliable movers serving Itasca County residential needs across Grand Rapids and Mississippi headwaters corridor communities.'; countyMovingName='Itasca County Moving'; regional1Name='Grand Rapids Corridor Moving'; regional2Name='Mississippi Headwaters Itasca Moving'; countyLabel='Itasca County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='isanti'; city='Cambridge'; citySlug='cambridge'; label='Minneapolis–Saint Paul Metro'; poolId='isanti-metro-mn'; regional1='cambridge-corridor'; regional2='rum-river-isanti'; topId='regional-isanti-mn-movers'; topName='Regional Cambridge / Isanti Providers'; topDesc='Reliable movers serving Isanti County residential needs across Cambridge and Rum River north metro corridor communities.'; countyMovingName='Isanti County Moving'; regional1Name='Cambridge Corridor Moving'; regional2Name='Rum River Isanti Moving'; countyLabel='Isanti County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kandiyohi'; city='Willmar'; citySlug='willmar'; label='Willmar Metro'; poolId='kandiyohi-metro-mn'; regional1='willmar-corridor'; regional2='glacial-lakes-kandiyohi'; topId='regional-kandiyohi-mn-movers'; topName='Regional Willmar / Kandiyohi Providers'; topDesc='Reliable movers serving Kandiyohi County residential needs across Willmar and glacial-lakes corridor communities.'; countyMovingName='Kandiyohi County Moving'; regional1Name='Willmar Corridor Moving'; regional2Name='Glacial Lakes Kandiyohi Moving'; countyLabel='Kandiyohi County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='benton'; city='Foley'; citySlug='foley'; label='St. Cloud Metro'; poolId='benton-metro-mn'; regional1='foley-corridor'; regional2='sauk-river-benton'; topId='regional-benton-mn-movers'; topName='Regional Foley / Benton Providers'; topDesc='Reliable movers serving Benton County residential needs across Foley and Sauk River St. Cloud fringe corridor communities.'; countyMovingName='Benton County Moving'; regional1Name='Foley Corridor Moving'; regional2Name='Sauk River Benton Moving'; countyLabel='Benton County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mower'; city='Austin'; citySlug='austin'; label='Austin Metro'; poolId='mower-metro-mn'; regional1='austin-corridor'; regional2='cedar-river-mower'; topId='regional-mower-mn-movers'; topName='Regional Austin / Mower Providers'; topDesc='Reliable movers serving Mower County residential needs across Austin and Cedar River corridor communities.'; countyMovingName='Mower County Moving'; regional1Name='Austin Corridor Moving'; regional2Name='Cedar River Mower Moving'; countyLabel='Mower County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='douglas'; city='Alexandria'; citySlug='alexandria'; label='Alexandria Metro'; poolId='douglas-metro-mn'; regional1='alexandria-corridor'; regional2='chain-of-lakes-douglas'; topId='regional-douglas-mn-movers'; topName='Regional Alexandria / Douglas Providers'; topDesc='Reliable movers serving Douglas County residential needs across Alexandria and chain-of-lakes corridor communities.'; countyMovingName='Douglas County Moving'; regional1Name='Alexandria Corridor Moving'; regional2Name='Chain of Lakes Douglas Moving'; countyLabel='Douglas County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='steele'; city='Owatonna'; citySlug='owatonna'; label='Owatonna Metro'; poolId='steele-metro-mn'; regional1='owatonna-corridor'; regional2='straight-river-steele'; topId='regional-steele-mn-movers'; topName='Regional Owatonna / Steele Providers'; topDesc='Reliable movers serving Steele County residential needs across Owatonna and Straight River corridor communities.'; countyMovingName='Steele County Moving'; regional1Name='Owatonna Corridor Moving'; regional2Name='Straight River Steele Moving'; countyLabel='Steele County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='carlton'; city='Cloquet'; citySlug='cloquet'; label='Duluth Metro'; poolId='carlton-metro-mn'; regional1='cloquet-corridor'; regional2='st-louis-river-carlton'; topId='regional-carlton-mn-movers'; topName='Regional Cloquet / Carlton Providers'; topDesc='Reliable movers serving Carlton County residential needs across Cloquet and St. Louis River northwoods corridor communities.'; countyMovingName='Carlton County Moving'; regional1Name='Cloquet Corridor Moving'; regional2Name='St. Louis River Carlton Moving'; countyLabel='Carlton County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mcleod'; city='Hutchinson'; citySlug='hutchinson'; label='Hutchinson Metro'; poolId='mcleod-metro-mn'; regional1='hutchinson-corridor'; regional2='crow-river-mcleod'; topId='regional-mcleod-mn-movers'; topName='Regional Hutchinson / McLeod Providers'; topDesc='Reliable movers serving McLeod County residential needs across Hutchinson and Crow River corridor communities.'; countyMovingName='McLeod County Moving'; regional1Name='Hutchinson Corridor Moving'; regional2Name='Crow River McLeod Moving'; countyLabel='McLeod County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='becker'; city='Detroit Lakes'; citySlug='detroit-lakes'; label='Detroit Lakes Metro'; poolId='becker-metro-mn'; regional1='detroit-lakes-corridor'; regional2='glacier-lakes-becker'; topId='regional-becker-mn-movers'; topName='Regional Detroit Lakes / Becker Providers'; topDesc='Reliable movers serving Becker County residential needs across Detroit Lakes and glacier-lakes corridor communities.'; countyMovingName='Becker County Moving'; regional1Name='Detroit Lakes Corridor Moving'; regional2Name='Glacier Lakes Becker Moving'; countyLabel='Becker County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='morrison'; city='Little Falls'; citySlug='little-falls'; label='Little Falls Metro'; poolId='morrison-metro-mn'; regional1='little-falls-corridor'; regional2='mississippi-morrison'; topId='regional-morrison-mn-movers'; topName='Regional Little Falls / Morrison Providers'; topDesc='Reliable movers serving Morrison County residential needs across Little Falls and Mississippi River corridor communities.'; countyMovingName='Morrison County Moving'; regional1Name='Little Falls Corridor Moving'; regional2Name='Mississippi Morrison Moving'; countyLabel='Morrison County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='nicollet'; city='St. Peter'; citySlug='st-peter'; label='St. Peter Metro'; poolId='nicollet-metro-mn'; regional1='st-peter-corridor'; regional2='minnesota-river-nicollet'; topId='regional-nicollet-mn-movers'; topName='Regional St. Peter / Nicollet Providers'; topDesc='Reliable movers serving Nicollet County residential needs across St. Peter and Minnesota River valley corridor communities.'; countyMovingName='Nicollet County Moving'; regional1Name='St. Peter Corridor Moving'; regional2Name='Minnesota River Nicollet Moving'; countyLabel='Nicollet County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cass'; city='Walker'; citySlug='walker'; label='Walker Metro'; poolId='cass-metro-mn'; regional1='walker-corridor'; regional2='leech-lake-cass'; topId='regional-cass-mn-movers'; topName='Regional Walker / Cass Providers'; topDesc='Reliable movers serving Cass County residential needs across Walker and Leech Lake lakes-country corridor communities.'; countyMovingName='Cass County Moving'; regional1Name='Walker Corridor Moving'; regional2Name='Leech Lake Cass Moving'; countyLabel='Cass County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pine'; city='Pine City'; citySlug='pine-city'; label='Pine City Metro'; poolId='pine-metro-mn'; regional1='pine-city-corridor'; regional2='snake-river-pine'; topId='regional-pine-mn-movers'; topName='Regional Pine City / Pine Providers'; topDesc='Reliable movers serving Pine County residential needs across Pine City and Snake River corridor communities.'; countyMovingName='Pine County Moving'; regional1Name='Pine City Corridor Moving'; regional2Name='Snake River Pine Moving'; countyLabel='Pine County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='freeborn'; city='Albert Lea'; citySlug='albert-lea'; label='Albert Lea Metro'; poolId='freeborn-metro-mn'; regional1='albert-lea-corridor'; regional2='freeborn-lakes'; topId='regional-freeborn-mn-movers'; topName='Regional Albert Lea / Freeborn Providers'; topDesc='Reliable movers serving Freeborn County residential needs across Albert Lea and southern Minnesota I-35 corridor communities.'; countyMovingName='Freeborn County Moving'; regional1Name='Albert Lea Corridor Moving'; regional2Name='Freeborn Lakes Moving'; countyLabel='Freeborn County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='polk'; city='Crookston'; citySlug='crookston'; label='Crookston Metro'; poolId='polk-metro-mn'; regional1='crookston-corridor'; regional2='red-river-valley-polk'; topId='regional-polk-mn-movers'; topName='Regional Crookston / Polk Providers'; topDesc='Reliable movers serving Polk County residential needs across Crookston and Red River Valley corridor communities.'; countyMovingName='Polk County Moving'; regional1Name='Crookston Corridor Moving'; regional2Name='Red River Valley Polk Moving'; countyLabel='Polk County, MN'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-mn",
    "$citySlug-moving-$slug-mn",
    "$slug-county-moving-$slug-mn",
    "college-hunks-moving-$citySlug-mn",
    "budd-van-lines-$citySlug-mn",
    "$($c.regional1)-moving-$slug-mn",
    "$($c.regional2)-moving-$slug-mn",
    "hercules-movers-$citySlug-mn",
    "krupp-moving-$citySlug-mn"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=2140; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb='A+'; city=$c.city }
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
Write-Host 'Generated 260 catalog entries, 26 metro pools for Minnesota batch 2'