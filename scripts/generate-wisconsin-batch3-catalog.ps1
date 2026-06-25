$outDir = Join-Path $PSScriptRoot 'wisconsin-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='dunn'; city='Menomonie'; citySlug='menomonie'; label='Menomonie Metro'; poolId='dunn-metro-wi'; regional1='menomonie-corridor'; regional2='red-cedar-dunn'; topId='regional-dunn-wi-movers'; topName='Regional Menomonie / Dunn Providers'; topDesc='Reliable movers serving Dunn County residential needs across Menomonie and Red Cedar western Wisconsin corridor communities.'; countyMovingName='Dunn County Moving'; regional1Name='Menomonie Corridor Moving'; regional2Name='Red Cedar Dunn Moving'; countyLabel='Dunn County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='barron'; city='Barron'; citySlug='barron'; label='Barron Metro'; poolId='barron-metro-wi'; regional1='barron-corridor'; regional2='northwest-barron'; topId='regional-barron-wi-movers'; topName='Regional Barron / Barron County Providers'; topDesc='Reliable movers serving Barron County residential needs across Barron and northwest Wisconsin rural corridor communities.'; countyMovingName='Barron County Moving'; regional1Name='Barron Corridor Moving'; regional2Name='Northwest Barron Moving'; countyLabel='Barron County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='polk'; city='Balsam Lake'; citySlug='balsam-lake'; label='Balsam Lake Metro'; poolId='polk-metro-wi'; regional1='balsam-lake-corridor'; regional2='st-croix-polk'; topId='regional-polk-wi-movers'; topName='Regional Balsam Lake / Polk Providers'; topDesc='Reliable movers serving Polk County residential needs across Balsam Lake and St. Croix River northwest Wisconsin corridor communities.'; countyMovingName='Polk County Moving'; regional1Name='Balsam Lake Corridor Moving'; regional2Name='St. Croix Polk Moving'; countyLabel='Polk County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='douglas'; city='Superior'; citySlug='superior'; label='Duluth–Superior Metro'; poolId='douglas-metro-wi'; regional1='superior-corridor'; regional2='lake-superior-douglas'; topId='regional-douglas-wi-movers'; topName='Regional Superior / Douglas Providers'; topDesc='Reliable movers serving Douglas County residential needs across Superior and Duluth–Superior Twin Ports corridor communities.'; countyMovingName='Douglas County Moving'; regional1Name='Superior Corridor Moving'; regional2Name='Lake Superior Douglas Moving'; countyLabel='Douglas County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pierce'; city='Ellsworth'; citySlug='ellsworth'; label='Minneapolis–Saint Paul Metro'; poolId='pierce-metro-wi'; regional1='ellsworth-corridor'; regional2='st-croix-pierce'; topId='regional-pierce-wi-movers'; topName='Regional Ellsworth / Pierce Providers'; topDesc='Reliable movers serving Pierce County residential needs across Ellsworth and Twin Cities west-metro St. Croix River corridor communities.'; countyMovingName='Pierce County Moving'; regional1Name='Ellsworth Corridor Moving'; regional2Name='St. Croix Pierce Moving'; countyLabel='Pierce County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marinette'; city='Marinette'; citySlug='marinette'; label='Marinette Metro'; poolId='marinette-metro-wi'; regional1='marinette-corridor'; regional2='menominee-river-marinette'; topId='regional-marinette-wi-movers'; topName='Regional Marinette / Marinette County Providers'; topDesc='Reliable movers serving Marinette County residential needs across Marinette and Menominee River northeast Wisconsin corridor communities.'; countyMovingName='Marinette County Moving'; regional1Name='Marinette Corridor Moving'; regional2Name='Menominee River Marinette Moving'; countyLabel='Marinette County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='shawano'; city='Shawano'; citySlug='shawano'; label='Shawano Metro'; poolId='shawano-metro-wi'; regional1='shawano-corridor'; regional2='wolf-river-shawano'; topId='regional-shawano-wi-movers'; topName='Regional Shawano / Shawano County Providers'; topDesc='Reliable movers serving Shawano County residential needs across Shawano and Wolf River northeast Wisconsin corridor communities.'; countyMovingName='Shawano County Moving'; regional1Name='Shawano Corridor Moving'; regional2Name='Wolf River Shawano Moving'; countyLabel='Shawano County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='oconto'; city='Oconto'; citySlug='oconto'; label='Oconto Metro'; poolId='oconto-metro-wi'; regional1='oconto-corridor'; regional2='bay-lake-oconto'; topId='regional-oconto-wi-movers'; topName='Regional Oconto / Oconto County Providers'; topDesc='Reliable movers serving Oconto County residential needs across Oconto and Bay of Green Bay northeast Wisconsin corridor communities.'; countyMovingName='Oconto County Moving'; regional1Name='Oconto Corridor Moving'; regional2Name='Bay Lake Oconto Moving'; countyLabel='Oconto County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='oneida'; city='Rhinelander'; citySlug='rhinelander'; label='Rhinelander Metro'; poolId='oneida-metro-wi'; regional1='rhinelander-corridor'; regional2='lakes-country-oneida'; topId='regional-oneida-wi-movers'; topName='Regional Rhinelander / Oneida Providers'; topDesc='Reliable movers serving Oneida County residential needs across Rhinelander and northwoods lakes-country corridor communities.'; countyMovingName='Oneida County Moving'; regional1Name='Rhinelander Corridor Moving'; regional2Name='Lakes Country Oneida Moving'; countyLabel='Oneida County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='green'; city='Monroe'; citySlug='monroe'; label='Monroe Metro'; poolId='green-metro-wi'; regional1='monroe-corridor'; regional2='driftless-green'; topId='regional-green-wi-movers'; topName='Regional Monroe / Green Providers'; topDesc='Reliable movers serving Green County residential needs across Monroe and Driftless Area southern Wisconsin corridor communities.'; countyMovingName='Green County Moving'; regional1Name='Monroe Corridor Moving'; regional2Name='Driftless Green Moving'; countyLabel='Green County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='trempealeau'; city='Whitehall'; citySlug='whitehall'; label='Whitehall Metro'; poolId='trempealeau-metro-wi'; regional1='whitehall-corridor'; regional2='trempealeau-river'; topId='regional-trempealeau-wi-movers'; topName='Regional Whitehall / Trempealeau Providers'; topDesc='Reliable movers serving Trempealeau County residential needs across Whitehall and Mississippi River bluff western Wisconsin corridor communities.'; countyMovingName='Trempealeau County Moving'; regional1Name='Whitehall Corridor Moving'; regional2Name='Trempealeau River Moving'; countyLabel='Trempealeau County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='door'; city='Sturgeon Bay'; citySlug='sturgeon-bay'; label='Sturgeon Bay Metro'; poolId='door-metro-wi'; regional1='sturgeon-bay-corridor'; regional2='door-peninsula'; topId='regional-door-wi-movers'; topName='Regional Sturgeon Bay / Door Providers'; topDesc='Reliable movers serving Door County residential needs across Sturgeon Bay and Door Peninsula tourism and lakeshore corridor communities.'; countyMovingName='Door County Moving'; regional1Name='Sturgeon Bay Corridor Moving'; regional2Name='Door Peninsula Moving'; countyLabel='Door County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='Merrill'; citySlug='merrill'; label='Merrill Metro'; poolId='lincoln-metro-wi'; regional1='merrill-corridor'; regional2='wisconsin-river-lincoln'; topId='regional-lincoln-wi-movers'; topName='Regional Merrill / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Merrill and Wisconsin River north-central corridor communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Merrill Corridor Moving'; regional2Name='Wisconsin River Lincoln Moving'; countyLabel='Lincoln County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='juneau'; city='Mauston'; citySlug='mauston'; label='Mauston Metro'; poolId='juneau-metro-wi'; regional1='mauston-corridor'; regional2='wisconsin-dells-juneau'; topId='regional-juneau-wi-movers'; topName='Regional Mauston / Juneau Providers'; topDesc='Reliable movers serving Juneau County residential needs across Mauston and Wisconsin Dells gateway central Wisconsin corridor communities.'; countyMovingName='Juneau County Moving'; regional1Name='Mauston Corridor Moving'; regional2Name='Wisconsin Dells Juneau Moving'; countyLabel='Juneau County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='waushara'; city='Wautoma'; citySlug='wautoma'; label='Wautoma Metro'; poolId='waushara-metro-wi'; regional1='wautoma-corridor'; regional2='central-plains-waushara'; topId='regional-waushara-wi-movers'; topName='Regional Wautoma / Waushara Providers'; topDesc='Reliable movers serving Waushara County residential needs across Wautoma and central Wisconsin rural corridor communities.'; countyMovingName='Waushara County Moving'; regional1Name='Wautoma Corridor Moving'; regional2Name='Central Plains Waushara Moving'; countyLabel='Waushara County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='iowa'; city='Dodgeville'; citySlug='dodgeville'; label='Dodgeville Metro'; poolId='iowa-metro-wi'; regional1='dodgeville-corridor'; regional2='driftless-iowa'; topId='regional-iowa-wi-movers'; topName='Regional Dodgeville / Iowa Providers'; topDesc='Reliable movers serving Iowa County residential needs across Dodgeville and Driftless Area southwestern Wisconsin corridor communities.'; countyMovingName='Iowa County Moving'; regional1Name='Dodgeville Corridor Moving'; regional2Name='Driftless Iowa Moving'; countyLabel='Iowa County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='vilas'; city='Eagle River'; citySlug='eagle-river'; label='Eagle River Metro'; poolId='vilas-metro-wi'; regional1='eagle-river-corridor'; regional2='northwoods-vilas'; topId='regional-vilas-wi-movers'; topName='Regional Eagle River / Vilas Providers'; topDesc='Reliable movers serving Vilas County residential needs across Eagle River and northwoods lakes-country corridor communities.'; countyMovingName='Vilas County Moving'; regional1Name='Eagle River Corridor Moving'; regional2Name='Northwoods Vilas Moving'; countyLabel='Vilas County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='adams'; city='Friendship'; citySlug='friendship'; label='Friendship Metro'; poolId='adams-metro-wi'; regional1='friendship-corridor'; regional2='central-sands-adams'; topId='regional-adams-wi-movers'; topName='Regional Friendship / Adams Providers'; topDesc='Reliable movers serving Adams County residential needs across Friendship and central sands Wisconsin corridor communities.'; countyMovingName='Adams County Moving'; regional1Name='Friendship Corridor Moving'; regional2Name='Central Sands Adams Moving'; countyLabel='Adams County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jackson'; city='Black River Falls'; citySlug='black-river-falls'; label='Black River Falls Metro'; poolId='jackson-metro-wi'; regional1='black-river-falls-corridor'; regional2='black-river-jackson'; topId='regional-jackson-wi-movers'; topName='Regional Black River Falls / Jackson Providers'; topDesc='Reliable movers serving Jackson County residential needs across Black River Falls and western Wisconsin corridor communities.'; countyMovingName='Jackson County Moving'; regional1Name='Black River Falls Corridor Moving'; regional2Name='Black River Jackson Moving'; countyLabel='Jackson County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kewaunee'; city='Kewaunee'; citySlug='kewaunee'; label='Kewaunee Metro'; poolId='kewaunee-metro-wi'; regional1='kewaunee-corridor'; regional2='lake-michigan-kewaunee'; topId='regional-kewaunee-wi-movers'; topName='Regional Kewaunee / Kewaunee County Providers'; topDesc='Reliable movers serving Kewaunee County residential needs across Kewaunee and Lake Michigan eastern Wisconsin corridor communities.'; countyMovingName='Kewaunee County Moving'; regional1Name='Kewaunee Corridor Moving'; regional2Name='Lake Michigan Kewaunee Moving'; countyLabel='Kewaunee County, WI'; franchise=$false; topSpecialties="['Residential']" }
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
Write-Host 'Generated 200 catalog entries, 20 metro pools for Wisconsin batch 3'