$outDir = Join-Path $PSScriptRoot 'wyoming-catalog-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='laramie'; city='Cheyenne'; citySlug='cheyenne'; label='Cheyenne Metro'; poolId='laramie-metro-wy'; regional1='cheyenne-corridor'; regional2='capital-region'; topId='twomenandatruck-laramie-wy'; topName='Two Men and a Truck Cheyenne'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Laramie County and the Cheyenne metro.'; countyMovingName='Laramie County Moving'; regional1Name='Cheyenne Corridor Moving'; regional2Name='Capital Region Moving'; countyLabel='Laramie County, WY'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='natrona'; city='Casper'; citySlug='casper'; label='Casper Metro'; poolId='natrona-metro-wy'; regional1='casper-corridor'; regional2='energy-basin'; topId='twomenandatruck-natrona-wy'; topName='Two Men and a Truck Casper'; topDesc='Trusted local franchise with excellent reputation for residential moves across Natrona County and the Casper metro.'; countyMovingName='Natrona County Moving'; regional1Name='Casper Corridor Moving'; regional2Name='Energy Basin Moving'; countyLabel='Natrona County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='campbell'; city='Gillette'; citySlug='gillette'; label='Gillette Metro'; poolId='campbell-metro-wy'; regional1='gillette-corridor'; regional2='powder-river-basin'; topId='regional-campbell-wy-movers'; topName='Regional Gillette / Campbell Providers'; topDesc='Reliable movers serving Campbell County residential needs across Gillette and northeastern Wyoming energy-corridor communities.'; countyMovingName='Campbell County Moving'; regional1Name='Gillette Corridor Moving'; regional2Name='Powder River Basin Moving'; countyLabel='Campbell County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sweetwater'; city='Rock Springs'; citySlug='rock-springs'; label='Rock Springs Metro'; poolId='sweetwater-metro-wy'; regional1='rock-springs-corridor'; regional2='green-river-basin'; topId='regional-sweetwater-wy-movers'; topName='Regional Rock Springs / Sweetwater Providers'; topDesc='Reliable movers serving Sweetwater County residential needs across Rock Springs, Green River, and southwestern Wyoming energy communities.'; countyMovingName='Sweetwater County Moving'; regional1Name='Rock Springs Corridor Moving'; regional2Name='Green River Basin Moving'; countyLabel='Sweetwater County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fremont'; city='Lander'; citySlug='lander'; label='Lander Metro'; poolId='fremont-metro-wy'; regional1='lander-corridor'; regional2='wind-river-country'; topId='regional-fremont-wy-movers'; topName='Regional Lander / Fremont Providers'; topDesc='Reliable movers serving Fremont County residential needs across Lander, Riverton, and central Wyoming communities.'; countyMovingName='Fremont County Moving'; regional1Name='Lander Corridor Moving'; regional2Name='Wind River Country Moving'; countyLabel='Fremont County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='albany'; city='Laramie'; citySlug='laramie'; label='Laramie Metro'; poolId='albany-metro-wy'; regional1='laramie-corridor'; regional2='university-plains'; topId='regional-albany-wy-movers'; topName='Regional Laramie / Albany Providers'; topDesc='Reliable movers serving Albany County residential needs across Laramie and University of Wyoming area communities.'; countyMovingName='Albany County Moving'; regional1Name='Laramie Corridor Moving'; regional2Name='University Plains Moving'; countyLabel='Albany County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sheridan'; city='Sheridan'; citySlug='sheridan'; label='Sheridan Metro'; poolId='sheridan-metro-wy'; regional1='sheridan-corridor'; regional2='bighorn-foothills'; topId='regional-sheridan-wy-movers'; topName='Regional Sheridan / Sheridan County Providers'; topDesc='Reliable movers serving Sheridan County residential needs across Sheridan and northern Wyoming foothill communities.'; countyMovingName='Sheridan County Moving'; regional1Name='Sheridan Corridor Moving'; regional2Name='Bighorn Foothills Moving'; countyLabel='Sheridan County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='park'; city='Cody'; citySlug='cody'; label='Cody Metro'; poolId='park-metro-wy'; regional1='cody-corridor'; regional2='yellowstone-gateway'; topId='regional-park-wy-movers'; topName='Regional Cody / Park Providers'; topDesc='Reliable movers serving Park County residential needs across Cody and Yellowstone gateway tourism communities.'; countyMovingName='Park County Moving'; regional1Name='Cody Corridor Moving'; regional2Name='Yellowstone Gateway Moving'; countyLabel='Park County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='teton'; city='Jackson'; citySlug='jackson'; label='Jackson Metro'; poolId='teton-metro-wy'; regional1='jackson-corridor'; regional2='jackson-hole'; topId='regional-teton-wy-movers'; topName='Regional Jackson / Teton Providers'; topDesc='Reliable movers serving Teton County residential needs across Jackson and luxury mountain resort communities.'; countyMovingName='Teton County Moving'; regional1Name='Jackson Corridor Moving'; regional2Name='Jackson Hole Moving'; countyLabel='Teton County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='Kemmerer'; citySlug='kemmerer'; label='Kemmerer Metro'; poolId='lincoln-metro-wy'; regional1='kemmerer-corridor'; regional2='hams-fork'; topId='regional-lincoln-wy-movers'; topName='Regional Kemmerer / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Kemmerer and southwestern Wyoming communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Kemmerer Corridor Moving'; regional2Name='Hams Fork Moving'; countyLabel='Lincoln County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='uinta'; city='Evanston'; citySlug='evanston'; label='Evanston Metro'; poolId='uinta-metro-wy'; regional1='evanston-corridor'; regional2='bear-river'; topId='regional-uinta-wy-movers'; topName='Regional Evanston / Uinta Providers'; topDesc='Reliable movers serving Uinta County residential needs across Evanston and southwestern Wyoming border communities.'; countyMovingName='Uinta County Moving'; regional1Name='Evanston Corridor Moving'; regional2Name='Bear River Moving'; countyLabel='Uinta County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='carbon'; city='Rawlins'; citySlug='rawlins'; label='Rawlins Metro'; poolId='carbon-metro-wy'; regional1='rawlins-corridor'; regional2='great-divide'; topId='regional-carbon-wy-movers'; topName='Regional Rawlins / Carbon Providers'; topDesc='Reliable movers serving Carbon County residential needs across Rawlins and south-central Wyoming corridor communities.'; countyMovingName='Carbon County Moving'; regional1Name='Rawlins Corridor Moving'; regional2Name='Great Divide Moving'; countyLabel='Carbon County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='converse'; city='Douglas'; citySlug='douglas'; label='Douglas Metro'; poolId='converse-metro-wy'; regional1='douglas-corridor'; regional2='north-platte-river'; topId='regional-converse-wy-movers'; topName='Regional Douglas / Converse Providers'; topDesc='Reliable movers serving Converse County residential needs across Douglas and central-eastern Wyoming communities.'; countyMovingName='Converse County Moving'; regional1Name='Douglas Corridor Moving'; regional2Name='North Platte River Moving'; countyLabel='Converse County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='goshen'; city='Torrington'; citySlug='torrington'; label='Torrington Metro'; poolId='goshen-metro-wy'; regional1='torrington-corridor'; regional2='north-platte-valley'; topId='regional-goshen-wy-movers'; topName='Regional Torrington / Goshen Providers'; topDesc='Reliable movers serving Goshen County residential needs across Torrington and eastern Wyoming agricultural communities.'; countyMovingName='Goshen County Moving'; regional1Name='Torrington Corridor Moving'; regional2Name='North Platte Valley Moving'; countyLabel='Goshen County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='big-horn'; city='Basin'; citySlug='basin'; label='Basin Metro'; poolId='big-horn-metro-wy'; regional1='basin-corridor'; regional2='bighorn-canyon'; topId='regional-bighorn-wy-movers'; topName='Regional Basin / Big Horn Providers'; topDesc='Reliable movers serving Big Horn County residential needs across Basin and northern Wyoming rural communities.'; countyMovingName='Big Horn County Moving'; regional1Name='Basin Corridor Moving'; regional2Name='Bighorn Canyon Moving'; countyLabel='Big Horn County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='johnson'; city='Buffalo'; citySlug='buffalo'; label='Buffalo Metro'; poolId='johnson-metro-wy'; regional1='buffalo-corridor'; regional2='powder-river-breaks'; topId='regional-johnson-wy-movers'; topName='Regional Buffalo / Johnson Providers'; topDesc='Reliable movers serving Johnson County residential needs across Buffalo and northern Wyoming foothill communities.'; countyMovingName='Johnson County Moving'; regional1Name='Buffalo Corridor Moving'; regional2Name='Powder River Breaks Moving'; countyLabel='Johnson County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sublette'; city='Pinedale'; citySlug='pinedale'; label='Pinedale Metro'; poolId='sublette-metro-wy'; regional1='pinedale-corridor'; regional2='wyoming-range'; topId='regional-sublette-wy-movers'; topName='Regional Pinedale / Sublette Providers'; topDesc='Reliable movers serving Sublette County residential needs across Pinedale and western Wyoming energy communities.'; countyMovingName='Sublette County Moving'; regional1Name='Pinedale Corridor Moving'; regional2Name='Wyoming Range Moving'; countyLabel='Sublette County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='platte'; city='Wheatland'; citySlug='wheatland'; label='Wheatland Metro'; poolId='platte-metro-wy'; regional1='wheatland-corridor'; regional2='laramie-plains'; topId='regional-platte-wy-movers'; topName='Regional Wheatland / Platte Providers'; topDesc='Reliable movers serving Platte County residential needs across Wheatland and eastern Wyoming plains communities.'; countyMovingName='Platte County Moving'; regional1Name='Wheatland Corridor Moving'; regional2Name='Laramie Plains Moving'; countyLabel='Platte County, WY'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='crook'; city='Sundance'; citySlug='sundance'; label='Sundance Metro'; poolId='crook-metro-wy'; regional1='sundance-corridor'; regional2='northeast-highlands'; topId='regional-crook-wy-movers'; topName='Regional Sundance / Crook Providers'; topDesc='Reliable movers serving Crook County residential needs across Sundance and northeastern Wyoming rural communities.'; countyMovingName='Crook County Moving'; regional1Name='Sundance Corridor Moving'; regional2Name='Northeast Highlands Moving'; countyLabel='Crook County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='washakie'; city='Worland'; citySlug='worland'; label='Worland Metro'; poolId='washakie-metro-wy'; regional1='worland-corridor'; regional2='bighorn-river'; topId='regional-washakie-wy-movers'; topName='Regional Worland / Washakie Providers'; topDesc='Reliable movers serving Washakie County residential needs across Worland and north-central Wyoming communities.'; countyMovingName='Washakie County Moving'; regional1Name='Worland Corridor Moving'; regional2Name='Bighorn River Moving'; countyLabel='Washakie County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='weston'; city='Newcastle'; citySlug='newcastle'; label='Newcastle Metro'; poolId='weston-metro-wy'; regional1='newcastle-corridor'; regional2='black-hills-foothills'; topId='regional-weston-wy-movers'; topName='Regional Newcastle / Weston Providers'; topDesc='Reliable movers serving Weston County residential needs across Newcastle and northeastern Wyoming border communities.'; countyMovingName='Weston County Moving'; regional1Name='Newcastle Corridor Moving'; regional2Name='Black Hills Foothills Moving'; countyLabel='Weston County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hot-springs'; city='Thermopolis'; citySlug='thermopolis'; label='Thermopolis Metro'; poolId='hot-springs-metro-wy'; regional1='thermopolis-corridor'; regional2='bighorn-thermal'; topId='regional-hotsprings-wy-movers'; topName='Regional Thermopolis / Hot Springs Providers'; topDesc='Reliable movers serving Hot Springs County residential needs across Thermopolis and north-central Wyoming communities.'; countyMovingName='Hot Springs County Moving'; regional1Name='Thermopolis Corridor Moving'; regional2Name='Bighorn Thermal Moving'; countyLabel='Hot Springs County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='niobrara'; city='Lusk'; citySlug='lusk'; label='Lusk Metro'; poolId='niobrara-metro-wy'; regional1='lusk-corridor'; regional2='eastern-wyoming-plains'; topId='regional-niobrara-wy-movers'; topName='Regional Lusk / Niobrara Providers'; topDesc='Reliable movers serving Niobrara County residential needs across Lusk and one of Wyoming smallest rural counties.'; countyMovingName='Niobrara County Moving'; regional1Name='Lusk Corridor Moving'; regional2Name='Eastern Wyoming Plains Moving'; countyLabel='Niobrara County'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-wy",
    "$citySlug-moving-$slug-wy",
    "$slug-county-moving-$slug-wy",
    "college-hunks-moving-$citySlug-wy",
    "budd-van-lines-$citySlug-wy",
    "$($c.regional1)-moving-$slug-wy",
    "$($c.regional2)-moving-$slug-wy",
    "hercules-movers-$citySlug-wy",
    "krupp-moving-$citySlug-wy"
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
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Write-Host 'Generated 230 catalog entries, 23 metro pools for Wyoming'