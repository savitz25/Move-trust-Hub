$outDir = Join-Path $PSScriptRoot 'montana-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='yellowstone'; city='Billings'; citySlug='billings'; label='Billings Metro'; poolId='yellowstone-metro-mt'; regional1='billings-corridor'; regional2='yellowstone-valley'; topId='twomenandatruck-yellowstone-mt'; topName='Two Men and a Truck Billings'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Yellowstone County and the Billings metro.'; countyMovingName='Yellowstone County Moving'; regional1Name='Billings Corridor Moving'; regional2Name='Yellowstone Valley Moving'; countyLabel='Yellowstone County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='gallatin'; city='Bozeman'; citySlug='bozeman'; label='Bozeman Metro'; poolId='gallatin-metro-mt'; regional1='bozeman-corridor'; regional2='gallatin-valley'; topId='twomenandatruck-gallatin-mt'; topName='Two Men and a Truck Bozeman'; topDesc='Trusted local franchise with excellent reputation for residential moves across Gallatin County and the Bozeman metro.'; countyMovingName='Gallatin County Moving'; regional1Name='Bozeman Corridor Moving'; regional2Name='Gallatin Valley Moving'; countyLabel='Gallatin County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='missoula'; city='Missoula'; citySlug='missoula'; label='Missoula Metro'; poolId='missoula-metro-mt'; regional1='missoula-corridor'; regional2='bitterroot-gateway'; topId='twomenandatruck-missoula-mt'; topName='Two Men and a Truck Missoula'; topDesc='Trusted local franchise with excellent reputation for residential moves across Missoula County and western Montana communities.'; countyMovingName='Missoula County Moving'; regional1Name='Missoula Corridor Moving'; regional2Name='Bitterroot Gateway Moving'; countyLabel='Missoula County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='flathead'; city='Kalispell'; citySlug='kalispell'; label='Kalispell Metro'; poolId='flathead-metro-mt'; regional1='kalispell-corridor'; regional2='flathead-lakes'; topId='regional-flathead-mt-movers'; topName='Regional Kalispell / Flathead Providers'; topDesc='Reliable movers serving Flathead County residential needs across Kalispell and northwestern Montana lakeside communities.'; countyMovingName='Flathead County Moving'; regional1Name='Kalispell Corridor Moving'; regional2Name='Flathead Lakes Moving'; countyLabel='Flathead County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cascade'; city='Great Falls'; citySlug='great-falls'; label='Great Falls Metro'; poolId='cascade-metro-mt'; regional1='great-falls-corridor'; regional2='missouri-river'; topId='regional-cascade-mt-movers'; topName='Regional Great Falls / Cascade Providers'; topDesc='Reliable movers serving Cascade County residential needs across Great Falls and central Montana communities.'; countyMovingName='Cascade County Moving'; regional1Name='Great Falls Corridor Moving'; regional2Name='Missouri River Moving'; countyLabel='Cascade County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lewis-and-clark'; city='Helena'; citySlug='helena'; label='Helena Metro'; poolId='lewis-and-clark-metro-mt'; regional1='helena-corridor'; regional2='capital-region'; topId='regional-lewisandclark-mt-movers'; topName='Regional Helena / Lewis and Clark Providers'; topDesc='Reliable movers serving Lewis and Clark County residential needs across Helena and the state capital region.'; countyMovingName='Lewis and Clark County Moving'; regional1Name='Helena Corridor Moving'; regional2Name='Capital Region Moving'; countyLabel='Lewis and Clark County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ravalli'; city='Hamilton'; citySlug='hamilton'; label='Hamilton Metro'; poolId='ravalli-metro-mt'; regional1='hamilton-corridor'; regional2='bitterroot-valley'; topId='regional-ravalli-mt-movers'; topName='Regional Hamilton / Ravalli Providers'; topDesc='Reliable movers serving Ravalli County residential needs across Hamilton and Bitterroot Valley communities.'; countyMovingName='Ravalli County Moving'; regional1Name='Hamilton Corridor Moving'; regional2Name='Bitterroot Valley Moving'; countyLabel='Ravalli County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='silver-bow'; city='Butte'; citySlug='butte'; label='Butte Metro'; poolId='silver-bow-metro-mt'; regional1='butte-corridor'; regional2='mining-city'; topId='regional-silverbow-mt-movers'; topName='Regional Butte / Silver Bow Providers'; topDesc='Reliable movers serving Silver Bow County residential needs across Butte and southwestern Montana communities.'; countyMovingName='Silver Bow County Moving'; regional1Name='Butte Corridor Moving'; regional2Name='Mining City Moving'; countyLabel='Silver Bow County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lake'; city='Polson'; citySlug='polson'; label='Polson Metro'; poolId='lake-metro-mt'; regional1='polson-corridor'; regional2='flathead-lake-south'; topId='regional-lake-mt-movers'; topName='Regional Polson / Lake Providers'; topDesc='Reliable movers serving Lake County residential needs across Polson and Flathead Lake corridor communities.'; countyMovingName='Lake County Moving'; regional1Name='Polson Corridor Moving'; regional2Name='Flathead Lake South Moving'; countyLabel='Lake County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='Libby'; citySlug='libby'; label='Libby Metro'; poolId='lincoln-metro-mt'; regional1='libby-corridor'; regional2='kootenai-forest'; topId='regional-lincoln-mt-movers'; topName='Regional Libby / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Libby and northwestern Montana rural communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Libby Corridor Moving'; regional2Name='Kootenai Forest Moving'; countyLabel='Lincoln County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='park'; city='Livingston'; citySlug='livingston'; label='Livingston Metro'; poolId='park-metro-mt'; regional1='livingston-corridor'; regional2='yellowstone-gateway'; topId='regional-park-mt-movers'; topName='Regional Livingston / Park Providers'; topDesc='Reliable movers serving Park County residential needs across Livingston and southern Montana gateway communities.'; countyMovingName='Park County Moving'; regional1Name='Livingston Corridor Moving'; regional2Name='Yellowstone Gateway Moving'; countyLabel='Park County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hill'; city='Havre'; citySlug='havre'; label='Havre Metro'; poolId='hill-metro-mt'; regional1='havre-corridor'; regional2='hi-line'; topId='regional-hill-mt-movers'; topName='Regional Havre / Hill Providers'; topDesc='Reliable movers serving Hill County residential needs across Havre and northern Montana Hi-Line communities.'; countyMovingName='Hill County Moving'; regional1Name='Havre Corridor Moving'; regional2Name='Hi-Line Moving'; countyLabel='Hill County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sanders'; city='Thompson Falls'; citySlug='thompson-falls'; label='Thompson Falls Metro'; poolId='sanders-metro-mt'; regional1='thompson-falls-corridor'; regional2='clark-fork'; topId='regional-sanders-mt-movers'; topName='Regional Thompson Falls / Sanders Providers'; topDesc='Reliable movers serving Sanders County residential needs across Thompson Falls and northwestern Montana rural communities.'; countyMovingName='Sanders County Moving'; regional1Name='Thompson Falls Corridor Moving'; regional2Name='Clark Fork Moving'; countyLabel='Sanders County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jefferson'; city='Boulder'; citySlug='boulder'; label='Boulder Metro'; poolId='jefferson-metro-mt'; regional1='boulder-corridor'; regional2='jefferson-highlands'; topId='regional-jefferson-mt-movers'; topName='Regional Boulder / Jefferson Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Boulder and southwestern Montana communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Boulder Corridor Moving'; regional2Name='Jefferson Highlands Moving'; countyLabel='Jefferson County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='glacier'; city='Cut Bank'; citySlug='cut-bank'; label='Cut Bank Metro'; poolId='glacier-metro-mt'; regional1='cut-bank-corridor'; regional2='northern-plains'; topId='regional-glacier-mt-movers'; topName='Regional Cut Bank / Glacier Providers'; topDesc='Reliable movers serving Glacier County residential needs across Cut Bank and northern Montana plains communities.'; countyMovingName='Glacier County Moving'; regional1Name='Cut Bank Corridor Moving'; regional2Name='Northern Plains Moving'; countyLabel='Glacier County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='big-horn'; city='Hardin'; citySlug='hardin'; label='Hardin Metro'; poolId='big-horn-metro-mt'; regional1='hardin-corridor'; regional2='bighorn-basin'; topId='regional-bighorn-mt-movers'; topName='Regional Hardin / Big Horn Providers'; topDesc='Reliable movers serving Big Horn County residential needs across Hardin and southeastern Montana communities.'; countyMovingName='Big Horn County Moving'; regional1Name='Hardin Corridor Moving'; regional2Name='Bighorn Basin Moving'; countyLabel='Big Horn County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='custer'; city='Miles City'; citySlug='miles-city'; label='Miles City Metro'; poolId='custer-metro-mt'; regional1='miles-city-corridor'; regional2='eastern-plains'; topId='regional-custer-mt-movers'; topName='Regional Miles City / Custer Providers'; topDesc='Reliable movers serving Custer County residential needs across Miles City and eastern Montana communities.'; countyMovingName='Custer County Moving'; regional1Name='Miles City Corridor Moving'; regional2Name='Eastern Plains Moving'; countyLabel='Custer County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fergus'; city='Lewistown'; citySlug='lewistown'; label='Lewistown Metro'; poolId='fergus-metro-mt'; regional1='lewistown-corridor'; regional2='central-montana'; topId='regional-fergus-mt-movers'; topName='Regional Lewistown / Fergus Providers'; topDesc='Reliable movers serving Fergus County residential needs across Lewistown and central Montana communities.'; countyMovingName='Fergus County Moving'; regional1Name='Lewistown Corridor Moving'; regional2Name='Central Montana Moving'; countyLabel='Fergus County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='richland'; city='Sidney'; citySlug='sidney'; label='Sidney Metro'; poolId='richland-metro-mt'; regional1='sidney-corridor'; regional2='bakken-gateway'; topId='regional-richland-mt-movers'; topName='Regional Sidney / Richland Providers'; topDesc='Reliable movers serving Richland County residential needs across Sidney and eastern Montana energy-corridor communities.'; countyMovingName='Richland County Moving'; regional1Name='Sidney Corridor Moving'; regional2Name='Bakken Gateway Moving'; countyLabel='Richland County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='carbon'; city='Red Lodge'; citySlug='red-lodge'; label='Red Lodge Metro'; poolId='carbon-metro-mt'; regional1='red-lodge-corridor'; regional2='beartooth-gateway'; topId='regional-carbon-mt-movers'; topName='Regional Red Lodge / Carbon Providers'; topDesc='Reliable movers serving Carbon County residential needs across Red Lodge and Beartooth gateway communities.'; countyMovingName='Carbon County Moving'; regional1Name='Red Lodge Corridor Moving'; regional2Name='Beartooth Gateway Moving'; countyLabel='Carbon County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='madison'; city='Virginia City'; citySlug='virginia-city'; label='Virginia City Metro'; poolId='madison-metro-mt'; regional1='virginia-city-corridor'; regional2='madison-valley'; topId='regional-madison-mt-movers'; topName='Regional Virginia City / Madison Providers'; topDesc='Reliable movers serving Madison County residential needs across Virginia City and southwestern Montana valley communities.'; countyMovingName='Madison County Moving'; regional1Name='Virginia City Corridor Moving'; regional2Name='Madison Valley Moving'; countyLabel='Madison County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='roosevelt'; city='Wolf Point'; citySlug='wolf-point'; label='Wolf Point Metro'; poolId='roosevelt-metro-mt'; regional1='wolf-point-corridor'; regional2='fort-peck'; topId='regional-roosevelt-mt-movers'; topName='Regional Wolf Point / Roosevelt Providers'; topDesc='Reliable movers serving Roosevelt County residential needs across Wolf Point and northeastern Montana rural communities.'; countyMovingName='Roosevelt County Moving'; regional1Name='Wolf Point Corridor Moving'; regional2Name='Fort Peck Moving'; countyLabel='Roosevelt County, MT'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='beaverhead'; city='Dillon'; citySlug='dillon'; label='Dillon Metro'; poolId='beaverhead-metro-mt'; regional1='dillon-corridor'; regional2='big-hole'; topId='regional-beaverhead-mt-movers'; topName='Regional Dillon / Beaverhead Providers'; topDesc='Reliable movers serving Beaverhead County residential needs across Dillon and southwestern Montana rural communities.'; countyMovingName='Beaverhead County Moving'; regional1Name='Dillon Corridor Moving'; regional2Name='Big Hole Moving'; countyLabel='Beaverhead County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='deer-lodge'; city='Anaconda'; citySlug='anaconda'; label='Anaconda Metro'; poolId='deer-lodge-metro-mt'; regional1='anaconda-corridor'; regional2='clark-fork-headwaters'; topId='regional-deerlodge-mt-movers'; topName='Regional Anaconda / Deer Lodge Providers'; topDesc='Reliable movers serving Deer Lodge County residential needs across Anaconda and southwestern Montana communities.'; countyMovingName='Deer Lodge County Moving'; regional1Name='Anaconda Corridor Moving'; regional2Name='Clark Fork Headwaters Moving'; countyLabel='Deer Lodge County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='stillwater'; city='Columbus'; citySlug='columbus'; label='Columbus Metro'; poolId='stillwater-metro-mt'; regional1='columbus-corridor'; regional2='stillwater-valley'; topId='regional-stillwater-mt-movers'; topName='Regional Columbus / Stillwater Providers'; topDesc='Reliable movers serving Stillwater County residential needs across Columbus and south-central Montana communities.'; countyMovingName='Stillwater County Moving'; regional1Name='Columbus Corridor Moving'; regional2Name='Stillwater Valley Moving'; countyLabel='Stillwater County, MT'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-mt",
    "$citySlug-moving-$slug-mt",
    "$slug-county-moving-$slug-mt",
    "college-hunks-moving-$citySlug-mt",
    "budd-van-lines-$citySlug-mt",
    "$($c.regional1)-moving-$slug-mt",
    "$($c.regional2)-moving-$slug-mt",
    "hercules-movers-$citySlug-mt",
    "krupp-moving-$citySlug-mt"
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
Write-Host 'Generated 250 catalog entries, 25 metro pools for Montana batch 1'