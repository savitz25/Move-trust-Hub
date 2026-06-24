$outDir = Join-Path $PSScriptRoot 'maine-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='cumberland'; city='Portland'; citySlug='portland'; label='Portland Metro'; poolId='cumberland-metro-me'
    regional1='portland-corridor'; regional2='coastal-metro'
    topId='twomenandatruck-cumberland-me'; topName='Two Men and a Truck Portland'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Cumberland County.'
    countyMovingName='Cumberland County Moving'; regional1Name='Portland Corridor Moving'; regional2Name='Coastal Metro Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='york'; city='Biddeford'; citySlug='biddeford'; label='York Metro'; poolId='york-metro-me'
    regional1='biddeford-corridor'; regional2='seacoast-south'
    topId='regional-york-me-movers'; topName='Regional Biddeford / York Providers'
    topDesc='Reliable movers serving York County residential needs across Biddeford, Saco, and southern Maine coastal communities.'
    countyMovingName='York County Moving'; regional1Name='Biddeford Corridor Moving'; regional2Name='Seacoast South Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='penobscot'; city='Bangor'; citySlug='bangor'; label='Bangor Metro'; poolId='penobscot-metro-me'
    regional1='bangor-corridor'; regional2='penobscot-valley'
    topId='regional-penobscot-me-movers'; topName='Regional Bangor / Penobscot Providers'
    topDesc='Reliable movers serving Penobscot County residential needs across Bangor and central Maine communities.'
    countyMovingName='Penobscot County Moving'; regional1Name='Bangor Corridor Moving'; regional2Name='Penobscot Valley Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='kennebec'; city='Augusta'; citySlug='augusta'; label='Augusta Metro'; poolId='kennebec-metro-me'
    regional1='augusta-corridor'; regional2='capital-region'
    topId='regional-kennebec-me-movers'; topName='Regional Augusta / Kennebec Providers'
    topDesc='Reliable movers serving Kennebec County residential needs across Augusta and capital-region communities.'
    countyMovingName='Kennebec County Moving'; regional1Name='Augusta Corridor Moving'; regional2Name='Capital Region Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='androscoggin'; city='Lewiston'; citySlug='lewiston'; label='Lewiston / Auburn Metro'; poolId='androscoggin-metro-me'
    regional1='lewiston-corridor'; regional2='twin-cities'
    topId='regional-androscoggin-me-movers'; topName='Regional Lewiston / Androscoggin Providers'
    topDesc='Reliable movers serving Androscoggin County residential needs across Lewiston, Auburn, and central Maine communities.'
    countyMovingName='Androscoggin County Moving'; regional1Name='Lewiston Corridor Moving'; regional2Name='Twin Cities Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='aroostook'; city='Presque Isle'; citySlug='presque-isle'; label='Houlton Metro'; poolId='aroostook-metro-me'
    regional1='presque-isle-corridor'; regional2='north-country'
    topId='regional-aroostook-me-movers'; topName='Regional Presque Isle / Aroostook Providers'
    topDesc='Reliable movers serving Aroostook County residential needs across Presque Isle, Houlton, and northern Maine communities.'
    countyMovingName='Aroostook County Moving'; regional1Name='Presque Isle Corridor Moving'; regional2Name='North Country Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='oxford'; city='South Paris'; citySlug='south-paris'; label='South Paris Metro'; poolId='oxford-metro-me'
    regional1='south-paris-corridor'; regional2='western-mountains'
    topId='regional-oxford-me-movers'; topName='Regional South Paris / Oxford Providers'
    topDesc='Reliable movers serving Oxford County residential needs across South Paris and western Maine communities.'
    countyMovingName='Oxford County Moving'; regional1Name='South Paris Corridor Moving'; regional2Name='Western Mountains Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='hancock'; city='Ellsworth'; citySlug='ellsworth'; label='Ellsworth Metro'; poolId='hancock-metro-me'
    regional1='ellsworth-corridor'; regional2='downeast-coast'
    topId='regional-hancock-me-movers'; topName='Regional Ellsworth / Hancock Providers'
    topDesc='Reliable movers serving Hancock County residential needs across Ellsworth and coastal Downeast communities.'
    countyMovingName='Hancock County Moving'; regional1Name='Ellsworth Corridor Moving'; regional2Name='Downeast Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='somerset'; city='Skowhegan'; citySlug='skowhegan'; label='Skowhegan Metro'; poolId='somerset-metro-me'
    regional1='skowhegan-corridor'; regional2='central-highlands'
    topId='regional-somerset-me-movers'; topName='Regional Skowhegan / Somerset Providers'
    topDesc='Reliable movers serving Somerset County residential needs across Skowhegan and rural central Maine communities.'
    countyMovingName='Somerset County Moving'; regional1Name='Skowhegan Corridor Moving'; regional2Name='Central Highlands Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='knox'; city='Rockland'; citySlug='rockland'; label='Rockland Metro'; poolId='knox-metro-me'
    regional1='rockland-corridor'; regional2='midcoast'
    topId='regional-knox-me-movers'; topName='Regional Rockland / Knox Providers'
    topDesc='Reliable movers serving Knox County residential needs across Rockland and Midcoast Maine communities.'
    countyMovingName='Knox County Moving'; regional1Name='Rockland Corridor Moving'; regional2Name='Midcoast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='waldo'; city='Belfast'; citySlug='belfast'; label='Belfast Metro'; poolId='waldo-metro-me'
    regional1='belfast-corridor'; regional2='penobscot-bay'
    topId='regional-waldo-me-movers'; topName='Regional Belfast / Waldo Providers'
    topDesc='Reliable movers serving Waldo County residential needs across Belfast and Penobscot Bay communities.'
    countyMovingName='Waldo County Moving'; regional1Name='Belfast Corridor Moving'; regional2Name='Penobscot Bay Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='sagadahoc'; city='Bath'; citySlug='bath'; label='Bath Metro'; poolId='sagadahoc-metro-me'
    regional1='bath-corridor'; regional2='shipyard-coast'
    topId='regional-sagadahoc-me-movers'; topName='Regional Bath / Sagadahoc Providers'
    topDesc='Reliable movers serving Sagadahoc County residential needs across Bath and coastal river communities.'
    countyMovingName='Sagadahoc County Moving'; regional1Name='Bath Corridor Moving'; regional2Name='Shipyard Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='lincoln'; city='Wiscasset'; citySlug='wiscasset'; label='Wiscasset Metro'; poolId='lincoln-metro-me'
    regional1='wiscasset-corridor'; regional2='midcoast-south'
    topId='regional-lincoln-me-movers'; topName='Regional Wiscasset / Lincoln Providers'
    topDesc='Reliable movers serving Lincoln County residential needs across Wiscasset and southern Midcoast communities.'
    countyMovingName='Lincoln County Moving'; regional1Name='Wiscasset Corridor Moving'; regional2Name='Midcoast South Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='washington'; city='Machias'; citySlug='machias'; label='Machias Metro'; poolId='washington-metro-me'
    regional1='machias-corridor'; regional2='downeast'
    topId='regional-washington-me-movers'; topName='Regional Machias / Washington Providers'
    topDesc='Reliable movers serving Washington County residential needs across Machias and eastern Maine communities.'
    countyMovingName='Washington County Moving'; regional1Name='Machias Corridor Moving'; regional2Name='Downeast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='franklin'; city='Farmington'; citySlug='farmington'; label='Farmington Metro'; poolId='franklin-metro-me'
    regional1='farmington-corridor'; regional2='western-maine'
    topId='regional-franklin-me-movers'; topName='Regional Farmington / Franklin Providers'
    topDesc='Reliable movers serving Franklin County residential needs across Farmington and western Maine communities.'
    countyMovingName='Franklin County Moving'; regional1Name='Farmington Corridor Moving'; regional2Name='Western Maine Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='piscataquis'; city='Dover-Foxcroft'; citySlug='dover-foxcroft'; label='Dover-Foxcroft Metro'; poolId='piscataquis-metro-me'
    regional1='dover-foxcroft-corridor'; regional2='moosehead-region'
    topId='regional-piscataquis-me-movers'; topName='Regional Dover-Foxcroft / Piscataquis Providers'
    topDesc='Reliable movers serving Piscataquis County residential needs across Dover-Foxcroft and rural central Maine communities.'
    countyMovingName='Piscataquis County Moving'; regional1Name='Dover-Foxcroft Corridor Moving'; regional2Name='Moosehead Region Moving'
    franchise=$false; topSpecialties="['Residential']"
  }
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
    "all-my-sons-$citySlug-me",
    "$citySlug-moving-$slug-me",
    "$slug-county-moving-$slug-me",
    "college-hunks-moving-$citySlug-me",
    "budd-van-lines-$citySlug-me",
    "$($c.regional1)-moving-$slug-me",
    "$($c.regional2)-moving-$slug-me",
    "hercules-movers-$citySlug-me",
    "krupp-moving-$citySlug-me"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($slug) County."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding $($slug) County neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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
Write-Host 'Generated 160 catalog entries, 16 metro pools for Maine (16 counties)'