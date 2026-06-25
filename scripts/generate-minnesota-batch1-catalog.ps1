$outDir = Join-Path $PSScriptRoot 'minnesota-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='hennepin'; city='Minneapolis'; citySlug='minneapolis'; label='Minneapolis–Saint Paul Metro'; poolId='hennepin-metro-mn'; regional1='minneapolis-corridor'; regional2='twin-cities-metro-west'; topId='twomenandatruck-hennepin-mn'; topName='Two Men and a Truck Minneapolis'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Minneapolis and Hennepin County metro communities.'; countyMovingName='Hennepin County Moving'; regional1Name='Minneapolis Corridor Moving'; regional2Name='Twin Cities Metro West Moving'; countyLabel='Hennepin County, MN'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='ramsey'; city='Saint Paul'; citySlug='saint-paul'; label='Minneapolis–Saint Paul Metro'; poolId='ramsey-metro-mn'; regional1='saint-paul-corridor'; regional2='mississippi-river-ramsey'; topId='regional-ramsey-mn-movers'; topName='Regional Saint Paul / Ramsey Providers'; topDesc='Reliable movers serving Ramsey County residential needs across Saint Paul and Mississippi River capital corridor communities.'; countyMovingName='Ramsey County Moving'; regional1Name='Saint Paul Corridor Moving'; regional2Name='Mississippi River Ramsey Moving'; countyLabel='Ramsey County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dakota'; city='Lakeville'; citySlug='lakeville'; label='Minneapolis–Saint Paul Metro'; poolId='dakota-metro-mn'; regional1='lakeville-corridor'; regional2='minnesota-river-dakota'; topId='regional-dakota-mn-movers'; topName='Regional Lakeville / Dakota Providers'; topDesc='Reliable movers serving Dakota County residential needs across Lakeville, Hastings, and south metro suburban growth corridors.'; countyMovingName='Dakota County Moving'; regional1Name='Lakeville Corridor Moving'; regional2Name='Minnesota River Dakota Moving'; countyLabel='Dakota County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='anoka'; city='Anoka'; citySlug='anoka'; label='Minneapolis–Saint Paul Metro'; poolId='anoka-metro-mn'; regional1='anoka-corridor'; regional2='rum-river-valley'; topId='regional-anoka-mn-movers'; topName='Regional Anoka / Anoka County Providers'; topDesc='Reliable movers serving Anoka County residential needs across Anoka and north metro Rum River corridor communities.'; countyMovingName='Anoka County Moving'; regional1Name='Anoka Corridor Moving'; regional2Name='Rum River Valley Moving'; countyLabel='Anoka County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='washington'; city='Stillwater'; citySlug='stillwater'; label='Minneapolis–Saint Paul Metro'; poolId='washington-metro-mn'; regional1='stillwater-corridor'; regional2='st-croix-river-valley'; topId='regional-washington-mn-movers'; topName='Regional Stillwater / Washington Providers'; topDesc='Reliable movers serving Washington County residential needs across Stillwater, Woodbury, and St. Croix River east metro corridor communities.'; countyMovingName='Washington County Moving'; regional1Name='Stillwater Corridor Moving'; regional2Name='St. Croix River Valley Moving'; countyLabel='Washington County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='st-louis'; city='Duluth'; citySlug='duluth'; label='Duluth Metro'; poolId='st-louis-metro-mn'; regional1='duluth-corridor'; regional2='lake-superior-north'; topId='regional-stlouis-mn-movers'; topName='Regional Duluth / St. Louis Providers'; topDesc='Reliable movers serving St. Louis County residential needs across Duluth and Lake Superior north shore corridor communities.'; countyMovingName='St. Louis County Moving'; regional1Name='Duluth Corridor Moving'; regional2Name='Lake Superior North Moving'; countyLabel='St. Louis County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='olmsted'; city='Rochester'; citySlug='rochester'; label='Rochester Metro'; poolId='olmsted-metro-mn'; regional1='rochester-corridor'; regional2='zumbro-river-valley'; topId='regional-olmsted-mn-movers'; topName='Regional Rochester / Olmsted Providers'; topDesc='Reliable movers serving Olmsted County residential needs across Rochester and Mayo Clinic medical corridor communities.'; countyMovingName='Olmsted County Moving'; regional1Name='Rochester Corridor Moving'; regional2Name='Zumbro River Valley Moving'; countyLabel='Olmsted County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='stearns'; city='St. Cloud'; citySlug='st-cloud'; label='St. Cloud Metro'; poolId='stearns-metro-mn'; regional1='st-cloud-corridor'; regional2='mississippi-river-stearns'; topId='regional-stearns-mn-movers'; topName='Regional St. Cloud / Stearns Providers'; topDesc='Reliable movers serving Stearns County residential needs across St. Cloud and central Minnesota Mississippi River corridor communities.'; countyMovingName='Stearns County Moving'; regional1Name='St. Cloud Corridor Moving'; regional2Name='Mississippi River Stearns Moving'; countyLabel='Stearns County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='scott'; city='Shakopee'; citySlug='shakopee'; label='Minneapolis–Saint Paul Metro'; poolId='scott-metro-mn'; regional1='shakopee-corridor'; regional2='minnesota-river-scott'; topId='regional-scott-mn-movers'; topName='Regional Shakopee / Scott Providers'; topDesc='Reliable movers serving Scott County residential needs across Shakopee and Minnesota River southwest metro corridor communities.'; countyMovingName='Scott County Moving'; regional1Name='Shakopee Corridor Moving'; regional2Name='Minnesota River Scott Moving'; countyLabel='Scott County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wright'; city='Buffalo'; citySlug='buffalo'; label='Minneapolis–Saint Paul Metro'; poolId='wright-metro-mn'; regional1='buffalo-corridor'; regional2='crow-river-valley'; topId='regional-wright-mn-movers'; topName='Regional Buffalo / Wright Providers'; topDesc='Reliable movers serving Wright County residential needs across Buffalo and Crow River west metro corridor communities.'; countyMovingName='Wright County Moving'; regional1Name='Buffalo Corridor Moving'; regional2Name='Crow River Valley Moving'; countyLabel='Wright County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='carver'; city='Chaska'; citySlug='chaska'; label='Minneapolis–Saint Paul Metro'; poolId='carver-metro-mn'; regional1='chaska-corridor'; regional2='minnesota-river-carver'; topId='regional-carver-mn-movers'; topName='Regional Chaska / Carver Providers'; topDesc='Reliable movers serving Carver County residential needs across Chaska and Minnesota River southwest metro corridor communities.'; countyMovingName='Carver County Moving'; regional1Name='Chaska Corridor Moving'; regional2Name='Minnesota River Carver Moving'; countyLabel='Carver County, MN'; franchise=$false; topSpecialties="['Residential']" }
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
Write-Host 'Generated 110 catalog entries, 11 metro pools for Minnesota batch 1'