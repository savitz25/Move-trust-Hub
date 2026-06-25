$outDir = Join-Path $PSScriptRoot 'wisconsin-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='milwaukee'; city='Milwaukee'; citySlug='milwaukee'; label='Milwaukee Metro'; poolId='milwaukee-metro-wi'; regional1='milwaukee-corridor'; regional2='lake-michigan-milwaukee'; topId='twomenandatruck-milwaukee-wi'; topName='Two Men and a Truck Milwaukee'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Milwaukee and Milwaukee County metro communities.'; countyMovingName='Milwaukee County Moving'; regional1Name='Milwaukee Corridor Moving'; regional2Name='Lake Michigan Milwaukee Moving'; countyLabel='Milwaukee County, WI'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='dane'; city='Madison'; citySlug='madison'; label='Madison Metro'; poolId='dane-metro-wi'; regional1='madison-corridor'; regional2='capitol-square-dane'; topId='regional-dane-wi-movers'; topName='Regional Madison / Dane Providers'; topDesc='Reliable movers serving Dane County residential needs across Madison and Wisconsin capital corridor communities.'; countyMovingName='Dane County Moving'; regional1Name='Madison Corridor Moving'; regional2Name='Capitol Square Dane Moving'; countyLabel='Dane County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='waukesha'; city='Waukesha'; citySlug='waukesha'; label='Milwaukee Metro'; poolId='waukesha-metro-wi'; regional1='waukesha-corridor'; regional2='lake-country-waukesha'; topId='regional-waukesha-wi-movers'; topName='Regional Waukesha / Waukesha County Providers'; topDesc='Reliable movers serving Waukesha County residential needs across Waukesha and west Milwaukee suburban corridor communities.'; countyMovingName='Waukesha County Moving'; regional1Name='Waukesha Corridor Moving'; regional2Name='Lake Country Waukesha Moving'; countyLabel='Waukesha County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='brown'; city='Green Bay'; citySlug='green-bay'; label='Green Bay Metro'; poolId='brown-metro-wi'; regional1='green-bay-corridor'; regional2='fox-river-brown'; topId='regional-brown-wi-movers'; topName='Regional Green Bay / Brown Providers'; topDesc='Reliable movers serving Brown County residential needs across Green Bay and Fox River northeast Wisconsin corridor communities.'; countyMovingName='Brown County Moving'; regional1Name='Green Bay Corridor Moving'; regional2Name='Fox River Brown Moving'; countyLabel='Brown County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='racine'; city='Racine'; citySlug='racine'; label='Racine Metro'; poolId='racine-metro-wi'; regional1='racine-corridor'; regional2='root-river-racine'; topId='regional-racine-wi-movers'; topName='Regional Racine / Racine County Providers'; topDesc='Reliable movers serving Racine County residential needs across Racine and Root River southeastern Wisconsin corridor communities.'; countyMovingName='Racine County Moving'; regional1Name='Racine Corridor Moving'; regional2Name='Root River Racine Moving'; countyLabel='Racine County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='outagamie'; city='Appleton'; citySlug='appleton'; label='Appleton Metro'; poolId='outagamie-metro-wi'; regional1='appleton-corridor'; regional2='fox-cities-outagamie'; topId='regional-outagamie-wi-movers'; topName='Regional Appleton / Outagamie Providers'; topDesc='Reliable movers serving Outagamie County residential needs across Appleton and Fox Cities corridor communities.'; countyMovingName='Outagamie County Moving'; regional1Name='Appleton Corridor Moving'; regional2Name='Fox Cities Outagamie Moving'; countyLabel='Outagamie County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='winnebago'; city='Oshkosh'; citySlug='oshkosh'; label='Oshkosh Metro'; poolId='winnebago-metro-wi'; regional1='oshkosh-corridor'; regional2='lake-winnebago-winnebago'; topId='regional-winnebago-wi-movers'; topName='Regional Oshkosh / Winnebago Providers'; topDesc='Reliable movers serving Winnebago County residential needs across Oshkosh and Lake Winnebago Fox Valley corridor communities.'; countyMovingName='Winnebago County Moving'; regional1Name='Oshkosh Corridor Moving'; regional2Name='Lake Winnebago Winnebago Moving'; countyLabel='Winnebago County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kenosha'; city='Kenosha'; citySlug='kenosha'; label='Kenosha Metro (Chicago–Milwaukee corridor)'; poolId='kenosha-metro-wi'; regional1='kenosha-corridor'; regional2='chicago-milwaukee-kenosha'; topId='regional-kenosha-wi-movers'; topName='Regional Kenosha / Kenosha County Providers'; topDesc='Reliable movers serving Kenosha County residential needs across Kenosha and Chicago–Milwaukee I-94 corridor communities.'; countyMovingName='Kenosha County Moving'; regional1Name='Kenosha Corridor Moving'; regional2Name='Chicago Milwaukee Kenosha Moving'; countyLabel='Kenosha County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='rock'; city='Janesville'; citySlug='janesville'; label='Janesville Metro'; poolId='rock-metro-wi'; regional1='janesville-corridor'; regional2='rock-river-rock'; topId='regional-rock-wi-movers'; topName='Regional Janesville / Rock Providers'; topDesc='Reliable movers serving Rock County residential needs across Janesville and Rock River southern Wisconsin corridor communities.'; countyMovingName='Rock County Moving'; regional1Name='Janesville Corridor Moving'; regional2Name='Rock River Rock Moving'; countyLabel='Rock County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marathon'; city='Wausau'; citySlug='wausau'; label='Wausau Metro'; poolId='marathon-metro-wi'; regional1='wausau-corridor'; regional2='wisconsin-river-marathon'; topId='regional-marathon-wi-movers'; topName='Regional Wausau / Marathon Providers'; topDesc='Reliable movers serving Marathon County residential needs across Wausau and Wisconsin River north-central corridor communities.'; countyMovingName='Marathon County Moving'; regional1Name='Wausau Corridor Moving'; regional2Name='Wisconsin River Marathon Moving'; countyLabel='Marathon County, WI'; franchise=$false; topSpecialties="['Residential']" }
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
Write-Host 'Generated 100 catalog entries, 10 metro pools for Wisconsin batch 1'