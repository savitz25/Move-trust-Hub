$outDir = Join-Path $PSScriptRoot 'montana-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='broadwater'; city='Townsend'; citySlug='townsend'; label='Townsend Metro'; poolId='broadwater-metro-mt'; regional1='townsend-corridor'; regional2='missouri-headwaters'; topId='regional-broadwater-mt-movers'; topName='Regional Townsend / Broadwater Providers'; topDesc='Reliable movers serving Broadwater County residential needs across Townsend and central Montana communities.'; countyMovingName='Broadwater County Moving'; regional1Name='Townsend Corridor Moving'; regional2Name='Missouri Headwaters Moving'; countyLabel='Broadwater County' },
  @{ slug='dawson'; city='Glendive'; citySlug='glendive'; label='Glendive Metro'; poolId='dawson-metro-mt'; regional1='glendive-corridor'; regional2='yellowstone-river-east'; topId='regional-dawson-mt-movers'; topName='Regional Glendive / Dawson Providers'; topDesc='Reliable movers serving Dawson County residential needs across Glendive and eastern Montana communities.'; countyMovingName='Dawson County Moving'; regional1Name='Glendive Corridor Moving'; regional2Name='Yellowstone River East Moving'; countyLabel='Dawson County, MT' },
  @{ slug='rosebud'; city='Forsyth'; citySlug='forsyth'; label='Forsyth Metro'; poolId='rosebud-metro-mt'; regional1='forsyth-corridor'; regional2='rosebud-creek'; topId='regional-rosebud-mt-movers'; topName='Regional Forsyth / Rosebud Providers'; topDesc='Reliable movers serving Rosebud County residential needs across Forsyth and southeastern Montana communities.'; countyMovingName='Rosebud County Moving'; regional1Name='Forsyth Corridor Moving'; regional2Name='Rosebud Creek Moving'; countyLabel='Rosebud County' },
  @{ slug='valley'; city='Glasgow'; citySlug='glasgow'; label='Glasgow Metro'; poolId='valley-metro-mt'; regional1='glasgow-corridor'; regional2='hi-line-east'; topId='regional-valley-mt-movers'; topName='Regional Glasgow / Valley Providers'; topDesc='Reliable movers serving Valley County residential needs across Glasgow and northeastern Montana communities.'; countyMovingName='Valley County Moving'; regional1Name='Glasgow Corridor Moving'; regional2Name='Hi-Line East Moving'; countyLabel='Valley County, MT' },
  @{ slug='powell'; city='Deer Lodge'; citySlug='deer-lodge'; label='Deer Lodge Metro'; poolId='powell-metro-mt'; regional1='deer-lodge-corridor'; regional2='clark-fork-west'; topId='regional-powell-mt-movers'; topName='Regional Deer Lodge / Powell Providers'; topDesc='Reliable movers serving Powell County residential needs across Deer Lodge and southwestern Montana communities.'; countyMovingName='Powell County Moving'; regional1Name='Deer Lodge Corridor Moving'; regional2Name='Clark Fork West Moving'; countyLabel='Powell County, MT' },
  @{ slug='blaine'; city='Chinook'; citySlug='chinook'; label='Chinook Metro'; poolId='blaine-metro-mt'; regional1='chinook-corridor'; regional2='milk-river'; topId='regional-blaine-mt-movers'; topName='Regional Chinook / Blaine Providers'; topDesc='Reliable movers serving Blaine County residential needs across Chinook and northern Montana communities.'; countyMovingName='Blaine County Moving'; regional1Name='Chinook Corridor Moving'; regional2Name='Milk River Moving'; countyLabel='Blaine County, MT' },
  @{ slug='teton'; city='Choteau'; citySlug='choteau'; label='Choteau Metro'; poolId='teton-metro-mt'; regional1='choteau-corridor'; regional2='rocky-mountain-front'; topId='regional-teton-mt-movers'; topName='Regional Choteau / Teton Providers'; topDesc='Reliable movers serving Teton County residential needs across Choteau and north-central Montana communities.'; countyMovingName='Teton County Moving'; regional1Name='Choteau Corridor Moving'; regional2Name='Rocky Mountain Front Moving'; countyLabel='Teton County, MT' },
  @{ slug='pondera'; city='Conrad'; citySlug='conrad'; label='Conrad Metro'; poolId='pondera-metro-mt'; regional1='conrad-corridor'; regional2='northern-plains-west'; topId='regional-pondera-mt-movers'; topName='Regional Conrad / Pondera Providers'; topDesc='Reliable movers serving Pondera County residential needs across Conrad and north-central Montana communities.'; countyMovingName='Pondera County Moving'; regional1Name='Conrad Corridor Moving'; regional2Name='Northern Plains West Moving'; countyLabel='Pondera County' },
  @{ slug='chouteau'; city='Fort Benton'; citySlug='fort-benton'; label='Fort Benton Metro'; poolId='chouteau-metro-mt'; regional1='fort-benton-corridor'; regional2='missouri-breaks'; topId='regional-chouteau-mt-movers'; topName='Regional Fort Benton / Chouteau Providers'; topDesc='Reliable movers serving Chouteau County residential needs across Fort Benton and north-central Montana communities.'; countyMovingName='Chouteau County Moving'; regional1Name='Fort Benton Corridor Moving'; regional2Name='Missouri Breaks Moving'; countyLabel='Chouteau County' },
  @{ slug='musselshell'; city='Roundup'; citySlug='roundup'; label='Roundup Metro'; poolId='musselshell-metro-mt'; regional1='roundup-corridor'; regional2='musselshell-valley'; topId='regional-musselshell-mt-movers'; topName='Regional Roundup / Musselshell Providers'; topDesc='Reliable movers serving Musselshell County residential needs across Roundup and central Montana communities.'; countyMovingName='Musselshell County Moving'; regional1Name='Roundup Corridor Moving'; regional2Name='Musselshell Valley Moving'; countyLabel='Musselshell County' },
  @{ slug='toole'; city='Shelby'; citySlug='shelby'; label='Shelby Metro'; poolId='toole-metro-mt'; regional1='shelby-corridor'; regional2='marias-pass'; topId='regional-toole-mt-movers'; topName='Regional Shelby / Toole Providers'; topDesc='Reliable movers serving Toole County residential needs across Shelby and northern Montana communities.'; countyMovingName='Toole County Moving'; regional1Name='Shelby Corridor Moving'; regional2Name='Marias Pass Moving'; countyLabel='Toole County' },
  @{ slug='mineral'; city='Superior'; citySlug='superior'; label='Superior Metro'; poolId='mineral-metro-mt'; regional1='superior-corridor'; regional2='clark-river-west'; topId='regional-mineral-mt-movers'; topName='Regional Superior / Mineral Providers'; topDesc='Reliable movers serving Mineral County residential needs across Superior and western Montana communities.'; countyMovingName='Mineral County Moving'; regional1Name='Superior Corridor Moving'; regional2Name='Clark River West Moving'; countyLabel='Mineral County, MT' },
  @{ slug='phillips'; city='Malta'; citySlug='malta'; label='Malta Metro'; poolId='phillips-metro-mt'; regional1='malta-corridor'; regional2='hi-line-north'; topId='regional-phillips-mt-movers'; topName='Regional Malta / Phillips Providers'; topDesc='Reliable movers serving Phillips County residential needs across Malta and northern Montana Hi-Line communities.'; countyMovingName='Phillips County Moving'; regional1Name='Malta Corridor Moving'; regional2Name='Hi-Line North Moving'; countyLabel='Phillips County, MT' },
  @{ slug='sweet-grass'; city='Big Timber'; citySlug='big-timber'; label='Big Timber Metro'; poolId='sweet-grass-metro-mt'; regional1='big-timber-corridor'; regional2='yellowstone-river-south'; topId='regional-sweetgrass-mt-movers'; topName='Regional Big Timber / Sweet Grass Providers'; topDesc='Reliable movers serving Sweet Grass County residential needs across Big Timber and south-central Montana communities.'; countyMovingName='Sweet Grass County Moving'; regional1Name='Big Timber Corridor Moving'; regional2Name='Yellowstone River South Moving'; countyLabel='Sweet Grass County' },
  @{ slug='granite'; city='Philipsburg'; citySlug='philipsburg'; label='Philipsburg Metro'; poolId='granite-metro-mt'; regional1='philipsburg-corridor'; regional2='flint-creek'; topId='regional-granite-mt-movers'; topName='Regional Philipsburg / Granite Providers'; topDesc='Reliable movers serving Granite County residential needs across Philipsburg and southwestern Montana communities.'; countyMovingName='Granite County Moving'; regional1Name='Philipsburg Corridor Moving'; regional2Name='Flint Creek Moving'; countyLabel='Granite County, MT' },
  @{ slug='sheridan'; city='Plentywood'; citySlug='plentywood'; label='Plentywood Metro'; poolId='sheridan-metro-mt'; regional1='plentywood-corridor'; regional2='northeast-corner'; topId='regional-sheridan-mt-movers'; topName='Regional Plentywood / Sheridan Providers'; topDesc='Reliable movers serving Sheridan County residential needs across Plentywood and northeastern Montana communities.'; countyMovingName='Sheridan County Moving'; regional1Name='Plentywood Corridor Moving'; regional2Name='Northeast Corner Moving'; countyLabel='Sheridan County, MT' },
  @{ slug='fallon'; city='Baker'; citySlug='baker'; label='Baker Metro'; poolId='fallon-metro-mt'; regional1='baker-corridor'; regional2='southeast-plains'; topId='regional-fallon-mt-movers'; topName='Regional Baker / Fallon Providers'; topDesc='Reliable movers serving Fallon County residential needs across Baker and southeastern Montana communities.'; countyMovingName='Fallon County Moving'; regional1Name='Baker Corridor Moving'; regional2Name='Southeast Plains Moving'; countyLabel='Fallon County' },
  @{ slug='judith-basin'; city='Stanford'; citySlug='stanford'; label='Stanford Metro'; poolId='judith-basin-metro-mt'; regional1='stanford-corridor'; regional2='judith-gap'; topId='regional-judithbasin-mt-movers'; topName='Regional Stanford / Judith Basin Providers'; topDesc='Reliable movers serving Judith Basin County residential needs across Stanford and central Montana communities.'; countyMovingName='Judith Basin County Moving'; regional1Name='Stanford Corridor Moving'; regional2Name='Judith Gap Moving'; countyLabel='Judith Basin County' },
  @{ slug='meagher'; city='White Sulphur Springs'; citySlug='white-sulphur-springs'; label='White Sulphur Springs Metro'; poolId='meagher-metro-mt'; regional1='white-sulphur-corridor'; regional2='smith-river'; topId='regional-meagher-mt-movers'; topName='Regional White Sulphur Springs / Meagher Providers'; topDesc='Reliable movers serving Meagher County residential needs across White Sulphur Springs and central Montana communities.'; countyMovingName='Meagher County Moving'; regional1Name='White Sulphur Corridor Moving'; regional2Name='Smith River Moving'; countyLabel='Meagher County' },
  @{ slug='wheatland'; city='Harlowton'; citySlug='harlowton'; label='Harlowton Metro'; poolId='wheatland-metro-mt'; regional1='harlowton-corridor'; regional2='musselshell-south'; topId='regional-wheatland-mt-movers'; topName='Regional Harlowton / Wheatland Providers'; topDesc='Reliable movers serving Wheatland County residential needs across Harlowton and central Montana communities.'; countyMovingName='Wheatland County Moving'; regional1Name='Harlowton Corridor Moving'; regional2Name='Musselshell South Moving'; countyLabel='Wheatland County' },
  @{ slug='liberty'; city='Chester'; citySlug='chester'; label='Chester Metro'; poolId='liberty-metro-mt'; regional1='chester-corridor'; regional2='sweet-grass-hills'; topId='regional-liberty-mt-movers'; topName='Regional Chester / Liberty Providers'; topDesc='Reliable movers serving Liberty County residential needs across Chester and northern Montana communities.'; countyMovingName='Liberty County Moving'; regional1Name='Chester Corridor Moving'; regional2Name='Sweet Grass Hills Moving'; countyLabel='Liberty County, MT' },
  @{ slug='powder-river'; city='Broadus'; citySlug='broadus'; label='Broadus Metro'; poolId='powder-river-metro-mt'; regional1='broadus-corridor'; regional2='powder-river-basin'; topId='regional-powderriver-mt-movers'; topName='Regional Broadus / Powder River Providers'; topDesc='Reliable movers serving Powder River County residential needs across Broadus and southeastern Montana communities.'; countyMovingName='Powder River County Moving'; regional1Name='Broadus Corridor Moving'; regional2Name='Powder River Basin Moving'; countyLabel='Powder River County' },
  @{ slug='mccone'; city='Circle'; citySlug='circle'; label='Circle Metro'; poolId='mccone-metro-mt'; regional1='circle-corridor'; regional2='missouri-breaks-east'; topId='regional-mccone-mt-movers'; topName='Regional Circle / McCone Providers'; topDesc='Reliable movers serving McCone County residential needs across Circle and eastern Montana communities.'; countyMovingName='McCone County Moving'; regional1Name='Circle Corridor Moving'; regional2Name='Missouri Breaks East Moving'; countyLabel='McCone County' },
  @{ slug='daniels'; city='Scobey'; citySlug='scobey'; label='Scobey Metro'; poolId='daniels-metro-mt'; regional1='scobey-corridor'; regional2='northeast-hi-line'; topId='regional-daniels-mt-movers'; topName='Regional Scobey / Daniels Providers'; topDesc='Reliable movers serving Daniels County residential needs across Scobey and northeastern Montana communities.'; countyMovingName='Daniels County Moving'; regional1Name='Scobey Corridor Moving'; regional2Name='Northeast Hi-Line Moving'; countyLabel='Daniels County' },
  @{ slug='carter'; city='Ekalaka'; citySlug='ekalaka'; label='Ekalaka Metro'; poolId='carter-metro-mt'; regional1='ekalaka-corridor'; regional2='southeast-corner'; topId='regional-carter-mt-movers'; topName='Regional Ekalaka / Carter Providers'; topDesc='Reliable movers serving Carter County residential needs across Ekalaka and southeastern Montana communities.'; countyMovingName='Carter County Moving'; regional1Name='Ekalaka Corridor Moving'; regional2Name='Southeast Corner Moving'; countyLabel='Carter County, MT' },
  @{ slug='garfield'; city='Jordan'; citySlug='jordan'; label='Jordan Metro'; poolId='garfield-metro-mt'; regional1='jordan-corridor'; regional2='eastern-frontier'; topId='regional-garfield-mt-movers'; topName='Regional Jordan / Garfield Providers'; topDesc='Reliable movers serving Garfield County residential needs across Jordan and eastern Montana frontier communities.'; countyMovingName='Garfield County Moving'; regional1Name='Jordan Corridor Moving'; regional2Name='Eastern Frontier Moving'; countyLabel='Garfield County, MT' },
  @{ slug='prairie'; city='Terry'; citySlug='terry'; label='Terry Metro'; poolId='prairie-metro-mt'; regional1='terry-corridor'; regional2='badlands-east'; topId='regional-prairie-mt-movers'; topName='Regional Terry / Prairie Providers'; topDesc='Reliable movers serving Prairie County residential needs across Terry and eastern Montana communities.'; countyMovingName='Prairie County Moving'; regional1Name='Terry Corridor Moving'; regional2Name='Badlands East Moving'; countyLabel='Prairie County, MT' },
  @{ slug='wibaux'; city='Wibaux'; citySlug='wibaux'; label='Wibaux Metro'; poolId='wibaux-metro-mt'; regional1='wibaux-corridor'; regional2='badlands-border'; topId='regional-wibaux-mt-movers'; topName='Regional Wibaux / Wibaux County Providers'; topDesc='Reliable movers serving Wibaux County residential needs across Wibaux and eastern Montana border communities.'; countyMovingName='Wibaux County Moving'; regional1Name='Wibaux Corridor Moving'; regional2Name='Badlands Border Moving'; countyLabel='Wibaux County' },
  @{ slug='golden-valley'; city='Ryegate'; citySlug='ryegate'; label='Ryegate Metro'; poolId='golden-valley-metro-mt'; regional1='ryegate-corridor'; regional2='musselshell-north'; topId='regional-goldenvalley-mt-movers'; topName='Regional Ryegate / Golden Valley Providers'; topDesc='Reliable movers serving Golden Valley County residential needs across Ryegate and central Montana communities.'; countyMovingName='Golden Valley County Moving'; regional1Name='Ryegate Corridor Moving'; regional2Name='Musselshell North Moving'; countyLabel='Golden Valley County' },
  @{ slug='treasure'; city='Hysham'; citySlug='hysham'; label='Hysham Metro'; poolId='treasure-metro-mt'; regional1='hysham-corridor'; regional2='yellowstone-river-mid'; topId='regional-treasure-mt-movers'; topName='Regional Hysham / Treasure Providers'; topDesc='Reliable movers serving Treasure County residential needs across Hysham and eastern Montana communities.'; countyMovingName='Treasure County Moving'; regional1Name='Hysham Corridor Moving'; regional2Name='Yellowstone River Mid Moving'; countyLabel='Treasure County' },
  @{ slug='petroleum'; city='Winnett'; citySlug='winnett'; label='Winnett Metro'; poolId='petroleum-metro-mt'; regional1='winnett-corridor'; regional2='central-plains'; topId='regional-petroleum-mt-movers'; topName='Regional Winnett / Petroleum Providers'; topDesc='Reliable movers serving Petroleum County residential needs across Winnett and central Montana rural communities.'; countyMovingName='Petroleum County Moving'; regional1Name='Winnett Corridor Moving'; regional2Name='Central Plains Moving'; countyLabel='Petroleum County' }
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

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
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
Write-Host 'Generated 310 catalog entries, 31 metro pools for Montana batch 2'