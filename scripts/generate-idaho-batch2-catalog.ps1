$outDir = Join-Path $PSScriptRoot 'idaho-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='franklin'; city='Preston'; citySlug='preston'; label='Preston Metro'; poolId='franklin-metro-id'; regional1='preston-corridor'; regional2='cache-valley'; topId='regional-franklin-id-movers'; topName='Regional Preston / Franklin Providers'; topDesc='Reliable movers serving Franklin County residential needs across Preston and southeastern Idaho communities.'; countyMovingName='Franklin County Moving'; regional1Name='Preston Corridor Moving'; regional2Name='Cache Valley Moving'; countyLabel='Franklin County, ID' },
  @{ slug='shoshone'; city='Wallace'; citySlug='wallace'; label='Wallace Metro'; poolId='shoshone-metro-id'; regional1='wallace-corridor'; regional2='silver-valley'; topId='regional-shoshone-id-movers'; topName='Regional Wallace / Shoshone Providers'; topDesc='Reliable movers serving Shoshone County residential needs across Wallace and northern Idaho mining corridor communities.'; countyMovingName='Shoshone County Moving'; regional1Name='Wallace Corridor Moving'; regional2Name='Silver Valley Moving'; countyLabel='Shoshone County, ID' },
  @{ slug='boundary'; city='Bonners Ferry'; citySlug='bonners-ferry'; label='Bonners Ferry Metro'; poolId='boundary-metro-id'; regional1='bonners-ferry-corridor'; regional2='kootenai-north'; topId='regional-boundary-id-movers'; topName='Regional Bonners Ferry / Boundary Providers'; topDesc='Reliable movers serving Boundary County residential needs across Bonners Ferry and northernmost Idaho communities.'; countyMovingName='Boundary County Moving'; regional1Name='Bonners Ferry Corridor Moving'; regional2Name='Kootenai North Moving'; countyLabel='Boundary County' },
  @{ slug='fremont'; city='St. Anthony'; citySlug='st-anthony'; label='St. Anthony Metro'; poolId='fremont-metro-id'; regional1='st-anthony-corridor'; regional2='henrys-fork'; topId='regional-fremont-id-movers'; topName='Regional St. Anthony / Fremont Providers'; topDesc='Reliable movers serving Fremont County residential needs across St. Anthony and eastern Idaho Henrys Fork communities.'; countyMovingName='Fremont County Moving'; regional1Name='St. Anthony Corridor Moving'; regional2Name='Henrys Fork Moving'; countyLabel='Fremont County, ID' },
  @{ slug='teton'; city='Driggs'; citySlug='driggs'; label='Driggs Metro'; poolId='teton-metro-id'; regional1='driggs-corridor'; regional2='teton-valley'; topId='regional-teton-id-movers'; topName='Regional Driggs / Teton Providers'; topDesc='Reliable movers serving Teton County residential needs across Driggs and Teton Valley resort communities.'; countyMovingName='Teton County Moving'; regional1Name='Driggs Corridor Moving'; regional2Name='Teton Valley Moving'; countyLabel='Teton County, ID' },
  @{ slug='valley'; city='Cascade'; citySlug='cascade'; label='Cascade Metro'; poolId='valley-metro-id'; regional1='cascade-corridor'; regional2='mccall-area'; topId='regional-valley-id-movers'; topName='Regional Cascade / Valley Providers'; topDesc='Reliable movers serving Valley County residential needs across Cascade, McCall, and central Idaho mountain resort communities.'; countyMovingName='Valley County Moving'; regional1Name='Cascade Corridor Moving'; regional2Name='McCall Area Moving'; countyLabel='Valley County, ID' },
  @{ slug='owyhee'; city='Murphy'; citySlug='murphy'; label='Murphy Metro'; poolId='owyhee-metro-id'; regional1='murphy-corridor'; regional2='owyhee-desert'; topId='regional-owyhee-id-movers'; topName='Regional Murphy / Owyhee Providers'; topDesc='Reliable movers serving Owyhee County residential needs across Murphy and southwestern Idaho rural communities.'; countyMovingName='Owyhee County Moving'; regional1Name='Murphy Corridor Moving'; regional2Name='Owyhee Desert Moving'; countyLabel='Owyhee County' },
  @{ slug='washington'; city='Weiser'; citySlug='weiser'; label='Weiser Metro'; poolId='washington-metro-id'; regional1='weiser-corridor'; regional2='treasure-valley-west-border'; topId='regional-washington-id-movers'; topName='Regional Weiser / Washington Providers'; topDesc='Reliable movers serving Washington County residential needs across Weiser and western Idaho border communities.'; countyMovingName='Washington County Moving'; regional1Name='Weiser Corridor Moving'; regional2Name='Treasure Valley West Border Moving'; countyLabel='Washington County, ID' },
  @{ slug='benewah'; city='St. Maries'; citySlug='st-maries'; label='St. Maries Metro'; poolId='benewah-metro-id'; regional1='st-maries-corridor'; regional2='st-joe-river'; topId='regional-benewah-id-movers'; topName='Regional St. Maries / Benewah Providers'; topDesc='Reliable movers serving Benewah County residential needs across St. Maries and northern Idaho rural communities.'; countyMovingName='Benewah County Moving'; regional1Name='St. Maries Corridor Moving'; regional2Name='St. Joe River Moving'; countyLabel='Benewah County' },
  @{ slug='clearwater'; city='Orofino'; citySlug='orofino'; label='Orofino Metro'; poolId='clearwater-metro-id'; regional1='orofino-corridor'; regional2='clearwater-river'; topId='regional-clearwater-id-movers'; topName='Regional Orofino / Clearwater Providers'; topDesc='Reliable movers serving Clearwater County residential needs across Orofino and north-central Idaho communities.'; countyMovingName='Clearwater County Moving'; regional1Name='Orofino Corridor Moving'; regional2Name='Clearwater River Moving'; countyLabel='Clearwater County' },
  @{ slug='boise'; city='Idaho City'; citySlug='idaho-city'; label='Idaho City Metro'; poolId='boise-metro-id'; regional1='idaho-city-corridor'; regional2='boise-basin'; topId='regional-boise-id-movers'; topName='Regional Idaho City / Boise Providers'; topDesc='Reliable movers serving Boise County residential needs across Idaho City and central Idaho mountain communities.'; countyMovingName='Boise County Moving'; regional1Name='Idaho City Corridor Moving'; regional2Name='Boise Basin Moving'; countyLabel='Boise County, ID' },
  @{ slug='lemhi'; city='Salmon'; citySlug='salmon'; label='Salmon Metro'; poolId='lemhi-metro-id'; regional1='salmon-corridor'; regional2='salmon-river'; topId='regional-lemhi-id-movers'; topName='Regional Salmon / Lemhi Providers'; topDesc='Reliable movers serving Lemhi County residential needs across Salmon and central Idaho Salmon River communities.'; countyMovingName='Lemhi County Moving'; regional1Name='Salmon Corridor Moving'; regional2Name='Salmon River Moving'; countyLabel='Lemhi County' },
  @{ slug='power'; city='American Falls'; citySlug='american-falls'; label='American Falls Metro'; poolId='power-metro-id'; regional1='american-falls-corridor'; regional2='snake-river-southeast'; topId='regional-power-id-movers'; topName='Regional American Falls / Power Providers'; topDesc='Reliable movers serving Power County residential needs across American Falls and southeastern Idaho communities.'; countyMovingName='Power County Moving'; regional1Name='American Falls Corridor Moving'; regional2Name='Snake River Southeast Moving'; countyLabel='Power County' },
  @{ slug='caribou'; city='Soda Springs'; citySlug='soda-springs'; label='Soda Springs Metro'; poolId='caribou-metro-id'; regional1='soda-springs-corridor'; regional2='caribou-highlands'; topId='regional-caribou-id-movers'; topName='Regional Soda Springs / Caribou Providers'; topDesc='Reliable movers serving Caribou County residential needs across Soda Springs and eastern Idaho communities.'; countyMovingName='Caribou County Moving'; regional1Name='Soda Springs Corridor Moving'; regional2Name='Caribou Highlands Moving'; countyLabel='Caribou County' },
  @{ slug='bear-lake'; city='Paris'; citySlug='paris'; label='Paris Metro'; poolId='bear-lake-metro-id'; regional1='paris-corridor'; regional2='bear-lake-valley'; topId='regional-bearlake-id-movers'; topName='Regional Paris / Bear Lake Providers'; topDesc='Reliable movers serving Bear Lake County residential needs across Paris and eastern Idaho Bear Lake communities.'; countyMovingName='Bear Lake County Moving'; regional1Name='Paris Corridor Moving'; regional2Name='Bear Lake Valley Moving'; countyLabel='Bear Lake County' },
  @{ slug='lincoln'; city='Shoshone'; citySlug='shoshone'; label='Shoshone Metro'; poolId='lincoln-metro-id'; regional1='shoshone-corridor'; regional2='magic-valley-north'; topId='regional-lincoln-id-movers'; topName='Regional Shoshone / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Shoshone and southern Magic Valley communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Shoshone Corridor Moving'; regional2Name='Magic Valley North Moving'; countyLabel='Lincoln County, ID' },
  @{ slug='oneida'; city='Malad City'; citySlug='malad-city'; label='Malad City Metro'; poolId='oneida-metro-id'; regional1='malad-city-corridor'; regional2='oneida-pass'; topId='regional-oneida-id-movers'; topName='Regional Malad City / Oneida Providers'; topDesc='Reliable movers serving Oneida County residential needs across Malad City and eastern Idaho border communities.'; countyMovingName='Oneida County Moving'; regional1Name='Malad City Corridor Moving'; regional2Name='Oneida Pass Moving'; countyLabel='Oneida County' },
  @{ slug='adams'; city='Council'; citySlug='council'; label='Council Metro'; poolId='adams-metro-id'; regional1='council-corridor'; regional2='weiser-river'; topId='regional-adams-id-movers'; topName='Regional Council / Adams Providers'; topDesc='Reliable movers serving Adams County residential needs across Council and western Idaho rural communities.'; countyMovingName='Adams County Moving'; regional1Name='Council Corridor Moving'; regional2Name='Weiser River Moving'; countyLabel='Adams County, ID' },
  @{ slug='custer'; city='Challis'; citySlug='challis'; label='Challis Metro'; poolId='custer-metro-id'; regional1='challis-corridor'; regional2='salmon-river-east'; topId='regional-custer-id-movers'; topName='Regional Challis / Custer Providers'; topDesc='Reliable movers serving Custer County residential needs across Challis and central Idaho mountain communities.'; countyMovingName='Custer County Moving'; regional1Name='Challis Corridor Moving'; regional2Name='Salmon River East Moving'; countyLabel='Custer County, ID' },
  @{ slug='lewis'; city='Nezperce'; citySlug='nezperce'; label='Nezperce Metro'; poolId='lewis-metro-id'; regional1='nezperce-corridor'; regional2='camas-prairie'; topId='regional-lewis-id-movers'; topName='Regional Nezperce / Lewis Providers'; topDesc='Reliable movers serving Lewis County residential needs across Nezperce and north-central Idaho rural communities.'; countyMovingName='Lewis County Moving'; regional1Name='Nezperce Corridor Moving'; regional2Name='Camas Prairie Moving'; countyLabel='Lewis County, ID' },
  @{ slug='butte'; city='Arco'; citySlug='arco'; label='Arco Metro'; poolId='butte-metro-id'; regional1='arco-corridor'; regional2='craters-moon'; topId='regional-butte-id-movers'; topName='Regional Arco / Butte Providers'; topDesc='Reliable movers serving Butte County residential needs across Arco and central Idaho high-desert communities.'; countyMovingName='Butte County Moving'; regional1Name='Arco Corridor Moving'; regional2Name='Craters Moon Moving'; countyLabel='Butte County, ID' },
  @{ slug='camas'; city='Fairfield'; citySlug='fairfield'; label='Fairfield Metro'; poolId='camas-metro-id'; regional1='fairfield-corridor'; regional2='camas-prairie-south'; topId='regional-camas-id-movers'; topName='Regional Fairfield / Camas Providers'; topDesc='Reliable movers serving Camas County residential needs across Fairfield and central Idaho rural communities.'; countyMovingName='Camas County Moving'; regional1Name='Fairfield Corridor Moving'; regional2Name='Camas Prairie South Moving'; countyLabel='Camas County' },
  @{ slug='clark'; city='Dubois'; citySlug='dubois'; label='Dubois Metro'; poolId='clark-metro-id'; regional1='dubois-corridor'; regional2='eastern-idaho-frontier'; topId='regional-clark-id-movers'; topName='Regional Dubois / Clark Providers'; topDesc='Reliable movers serving Clark County residential needs across Dubois and eastern Idaho frontier communities.'; countyMovingName='Clark County Moving'; regional1Name='Dubois Corridor Moving'; regional2Name='Eastern Idaho Frontier Moving'; countyLabel='Clark County, ID' }
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

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 230 catalog entries, 23 metro pools for Idaho batch 2'