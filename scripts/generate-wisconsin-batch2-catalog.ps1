$outDir = Join-Path $PSScriptRoot 'wisconsin-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='washington'; city='West Bend'; citySlug='west-bend'; label='Milwaukee Metro'; poolId='washington-metro-wi'; regional1='west-bend-corridor'; regional2='kettle-moraine-washington'; topId='regional-washington-wi-movers'; topName='Regional West Bend / Washington Providers'; topDesc='Reliable movers serving Washington County residential needs across West Bend and north Milwaukee suburban corridor communities.'; countyMovingName='Washington County Moving'; regional1Name='West Bend Corridor Moving'; regional2Name='Kettle Moraine Washington Moving'; countyLabel='Washington County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='la-crosse'; city='La Crosse'; citySlug='la-crosse'; label='La Crosse Metro'; poolId='la-crosse-metro-wi'; regional1='la-crosse-corridor'; regional2='mississippi-bluff-la-crosse'; topId='regional-lacrosse-wi-movers'; topName='Regional La Crosse / La Crosse County Providers'; topDesc='Reliable movers serving La Crosse County residential needs across La Crosse and Mississippi River bluff corridor communities.'; countyMovingName='La Crosse County Moving'; regional1Name='La Crosse Corridor Moving'; regional2Name='Mississippi Bluff La Crosse Moving'; countyLabel='La Crosse County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sheboygan'; city='Sheboygan'; citySlug='sheboygan'; label='Sheboygan Metro'; poolId='sheboygan-metro-wi'; regional1='sheboygan-corridor'; regional2='lake-michigan-sheboygan'; topId='regional-sheboygan-wi-movers'; topName='Regional Sheboygan / Sheboygan County Providers'; topDesc='Reliable movers serving Sheboygan County residential needs across Sheboygan and Lake Michigan eastern Wisconsin corridor communities.'; countyMovingName='Sheboygan County Moving'; regional1Name='Sheboygan Corridor Moving'; regional2Name='Lake Michigan Sheboygan Moving'; countyLabel='Sheboygan County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='eau-claire'; city='Eau Claire'; citySlug='eau-claire'; label='Eau Claire Metro'; poolId='eau-claire-metro-wi'; regional1='eau-claire-corridor'; regional2='chippewa-valley-eau-claire'; topId='regional-eauclaire-wi-movers'; topName='Regional Eau Claire / Eau Claire County Providers'; topDesc='Reliable movers serving Eau Claire County residential needs across Eau Claire and Chippewa Valley northwest Wisconsin corridor communities.'; countyMovingName='Eau Claire County Moving'; regional1Name='Eau Claire Corridor Moving'; regional2Name='Chippewa Valley Eau Claire Moving'; countyLabel='Eau Claire County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='walworth'; city='Elkhorn'; citySlug='elkhorn'; label='Walworth Metro'; poolId='walworth-metro-wi'; regional1='elkhorn-corridor'; regional2='geneva-lake-walworth'; topId='regional-walworth-wi-movers'; topName='Regional Elkhorn / Walworth Providers'; topDesc='Reliable movers serving Walworth County residential needs across Elkhorn and Geneva Lake southeastern Wisconsin corridor communities.'; countyMovingName='Walworth County Moving'; regional1Name='Elkhorn Corridor Moving'; regional2Name='Geneva Lake Walworth Moving'; countyLabel='Walworth County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fond-du-lac'; city='Fond du Lac'; citySlug='fond-du-lac'; label='Fond du Lac Metro'; poolId='fond-du-lac-metro-wi'; regional1='fond-du-lac-corridor'; regional2='lake-winnebago-fonddulac'; topId='regional-fonddulac-wi-movers'; topName='Regional Fond du Lac / Fond du Lac County Providers'; topDesc='Reliable movers serving Fond du Lac County residential needs across Fond du Lac and Lake Winnebago east-central Wisconsin corridor communities.'; countyMovingName='Fond du Lac County Moving'; regional1Name='Fond du Lac Corridor Moving'; regional2Name='Lake Winnebago Fond du Lac Moving'; countyLabel='Fond du Lac County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='st-croix'; city='Hudson'; citySlug='hudson'; label='Minneapolis–Saint Paul Metro'; poolId='st-croix-metro-wi'; regional1='hudson-corridor'; regional2='st-croix-river-valley'; topId='regional-stcroix-wi-movers'; topName='Regional Hudson / St. Croix Providers'; topDesc='Reliable movers serving St. Croix County residential needs across Hudson and Twin Cities west-metro St. Croix River corridor communities.'; countyMovingName='St. Croix County Moving'; regional1Name='Hudson Corridor Moving'; regional2Name='St. Croix River Valley Moving'; countyLabel='St. Croix County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ozaukee'; city='Port Washington'; citySlug='port-washington'; label='Milwaukee Metro'; poolId='ozaukee-metro-wi'; regional1='port-washington-corridor'; regional2='lake-michigan-ozaukee'; topId='regional-ozaukee-wi-movers'; topName='Regional Port Washington / Ozaukee Providers'; topDesc='Reliable movers serving Ozaukee County residential needs across Port Washington and north Milwaukee lakeshore suburban corridor communities.'; countyMovingName='Ozaukee County Moving'; regional1Name='Port Washington Corridor Moving'; regional2Name='Lake Michigan Ozaukee Moving'; countyLabel='Ozaukee County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dodge'; city='Juneau'; citySlug='juneau'; label='Dodge Metro'; poolId='dodge-metro-wi'; regional1='juneau-corridor'; regional2='rock-river-dodge'; topId='regional-dodge-wi-movers'; topName='Regional Juneau / Dodge Providers'; topDesc='Reliable movers serving Dodge County residential needs across Juneau and Rock River east-central Wisconsin corridor communities.'; countyMovingName='Dodge County Moving'; regional1Name='Juneau Corridor Moving'; regional2Name='Rock River Dodge Moving'; countyLabel='Dodge County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jefferson'; city='Jefferson'; citySlug='jefferson'; label='Jefferson Metro'; poolId='jefferson-metro-wi'; regional1='jefferson-corridor'; regional2='rock-river-jefferson'; topId='regional-jefferson-wi-movers'; topName='Regional Jefferson / Jefferson County Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Jefferson and Rock River southeastern Wisconsin corridor communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Jefferson Corridor Moving'; regional2Name='Rock River Jefferson Moving'; countyLabel='Jefferson County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='manitowoc'; city='Manitowoc'; citySlug='manitowoc'; label='Manitowoc Metro'; poolId='manitowoc-metro-wi'; regional1='manitowoc-corridor'; regional2='lake-michigan-manitowoc'; topId='regional-manitowoc-wi-movers'; topName='Regional Manitowoc / Manitowoc County Providers'; topDesc='Reliable movers serving Manitowoc County residential needs across Manitowoc and Lake Michigan eastern Wisconsin corridor communities.'; countyMovingName='Manitowoc County Moving'; regional1Name='Manitowoc Corridor Moving'; regional2Name='Lake Michigan Manitowoc Moving'; countyLabel='Manitowoc County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wood'; city='Wisconsin Rapids'; citySlug='wisconsin-rapids'; label='Wisconsin Rapids Metro'; poolId='wood-metro-wi'; regional1='wisconsin-rapids-corridor'; regional2='wisconsin-river-wood'; topId='regional-wood-wi-movers'; topName='Regional Wisconsin Rapids / Wood Providers'; topDesc='Reliable movers serving Wood County residential needs across Wisconsin Rapids and Wisconsin River central corridor communities.'; countyMovingName='Wood County Moving'; regional1Name='Wisconsin Rapids Corridor Moving'; regional2Name='Wisconsin River Wood Moving'; countyLabel='Wood County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='portage'; city='Stevens Point'; citySlug='stevens-point'; label='Stevens Point Metro'; poolId='portage-metro-wi'; regional1='stevens-point-corridor'; regional2='wisconsin-river-portage'; topId='regional-portage-wi-movers'; topName='Regional Stevens Point / Portage Providers'; topDesc='Reliable movers serving Portage County residential needs across Stevens Point and Wisconsin River central Wisconsin corridor communities.'; countyMovingName='Portage County Moving'; regional1Name='Stevens Point Corridor Moving'; regional2Name='Wisconsin River Portage Moving'; countyLabel='Portage County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='chippewa'; city='Chippewa Falls'; citySlug='chippewa-falls'; label='Eau Claire Metro'; poolId='chippewa-metro-wi'; regional1='chippewa-falls-corridor'; regional2='chippewa-valley-chippewa'; topId='regional-chippewa-wi-movers'; topName='Regional Chippewa Falls / Chippewa Providers'; topDesc='Reliable movers serving Chippewa County residential needs across Chippewa Falls and Chippewa Valley northwest Wisconsin corridor communities.'; countyMovingName='Chippewa County Moving'; regional1Name='Chippewa Falls Corridor Moving'; regional2Name='Chippewa Valley Chippewa Moving'; countyLabel='Chippewa County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sauk'; city='Baraboo'; citySlug='baraboo'; label='Baraboo Metro'; poolId='sauk-metro-wi'; regional1='baraboo-corridor'; regional2='devil-lake-sauk'; topId='regional-sauk-wi-movers'; topName='Regional Baraboo / Sauk Providers'; topDesc='Reliable movers serving Sauk County residential needs across Baraboo and Devil''s Lake south-central Wisconsin corridor communities.'; countyMovingName='Sauk County Moving'; regional1Name='Baraboo Corridor Moving'; regional2Name='Devil Lake Sauk Moving'; countyLabel='Sauk County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='columbia'; city='Portage'; citySlug='portage'; label='Portage Metro'; poolId='columbia-metro-wi'; regional1='portage-corridor'; regional2='wisconsin-river-columbia'; topId='regional-columbia-wi-movers'; topName='Regional Portage / Columbia Providers'; topDesc='Reliable movers serving Columbia County residential needs across Portage and Wisconsin River south-central Wisconsin corridor communities.'; countyMovingName='Columbia County Moving'; regional1Name='Portage Corridor Moving'; regional2Name='Wisconsin River Columbia Moving'; countyLabel='Columbia County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='calumet'; city='Chilton'; citySlug='chilton'; label='Appleton Metro'; poolId='calumet-metro-wi'; regional1='chilton-corridor'; regional2='fox-river-calumet'; topId='regional-calumet-wi-movers'; topName='Regional Chilton / Calumet Providers'; topDesc='Reliable movers serving Calumet County residential needs across Chilton and Fox River east-central Wisconsin corridor communities.'; countyMovingName='Calumet County Moving'; regional1Name='Chilton Corridor Moving'; regional2Name='Fox River Calumet Moving'; countyLabel='Calumet County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='grant'; city='Lancaster'; citySlug='lancaster'; label='Lancaster Metro'; poolId='grant-metro-wi'; regional1='lancaster-corridor'; regional2='driftless-grant'; topId='regional-grant-wi-movers'; topName='Regional Lancaster / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Lancaster and Driftless Area southwestern Wisconsin corridor communities.'; countyMovingName='Grant County Moving'; regional1Name='Lancaster Corridor Moving'; regional2Name='Driftless Grant Moving'; countyLabel='Grant County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='waupaca'; city='Waupaca'; citySlug='waupaca'; label='Waupaca Metro'; poolId='waupaca-metro-wi'; regional1='waupaca-corridor'; regional2='chain-of-lakes-waupaca'; topId='regional-waupaca-wi-movers'; topName='Regional Waupaca / Waupaca County Providers'; topDesc='Reliable movers serving Waupaca County residential needs across Waupaca and Chain of Lakes central Wisconsin corridor communities.'; countyMovingName='Waupaca County Moving'; regional1Name='Waupaca Corridor Moving'; regional2Name='Chain of Lakes Waupaca Moving'; countyLabel='Waupaca County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='monroe'; city='Sparta'; citySlug='sparta'; label='Sparta Metro'; poolId='monroe-metro-wi'; regional1='sparta-corridor'; regional2='driftless-monroe'; topId='regional-monroe-wi-movers'; topName='Regional Sparta / Monroe Providers'; topDesc='Reliable movers serving Monroe County residential needs across Sparta and Driftless Area western Wisconsin corridor communities.'; countyMovingName='Monroe County Moving'; regional1Name='Sparta Corridor Moving'; regional2Name='Driftless Monroe Moving'; countyLabel='Monroe County, WI'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-wi",
    "$citySlug-moving-$slug-wi",
    "$slug-county-moving-$slug-wi",
    "college-hunks-moving-$citySlug-wi",
    "budd-van-lines-$citySlug-wi",
    "$($c.regional1)-moving-$slug-wi",
    "$($c.regional2)-moving-$slug-wi",
    "hercules-movers-$citySlug-wi",
    "krupp-moving-$citySlug-wi"
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
Write-Host 'Generated 200 catalog entries, 20 metro pools for Wisconsin batch 2'