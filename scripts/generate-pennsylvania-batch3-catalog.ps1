$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug = 'luzerne'; city = 'Wilkes-Barre'; citySlug = 'wilkes-barre'; label = 'Wilkes-Barre Metro'; poolId = 'luzerne-metro-pa'
    regional1 = 'wyoming-valley'; regional2 = 'northeast-pa'
    topId = 'twomenandatruck-luzerne-pa'; topName = 'Two Men and a Truck Wilkes-Barre'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Luzerne County.'
    countyMovingName = 'Luzerne County Moving'; regional1Name = 'Wyoming Valley Moving'; regional2Name = 'Northeast PA Moving'
    franchise = $true
  },
  @{
    slug = 'northampton'; city = 'Easton'; citySlug = 'easton'; label = 'Easton Metro'; poolId = 'northampton-metro-pa'
    regional1 = 'lehigh-valley-east'; regional2 = 'delaware-river-northampton'
    topId = 'twomenandatruck-northampton-pa'; topName = 'Two Men and a Truck Lehigh Valley'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Northampton County.'
    countyMovingName = 'Northampton County Moving'; regional1Name = 'Lehigh Valley East Moving'; regional2Name = 'Delaware River Northampton Moving'
    franchise = $true
  },
  @{
    slug = 'dauphin'; city = 'Harrisburg'; citySlug = 'harrisburg'; label = 'Harrisburg Metro'; poolId = 'dauphin-metro-pa'
    regional1 = 'susquehanna-capital'; regional2 = 'harrisburg-corridor'
    topId = 'twomenandatruck-dauphin-pa'; topName = 'Two Men and a Truck Harrisburg'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Dauphin County.'
    countyMovingName = 'Dauphin County Moving'; regional1Name = 'Susquehanna Capital Moving'; regional2Name = 'Harrisburg Corridor Moving'
    franchise = $true
  },
  @{
    slug = 'cumberland'; city = 'Carlisle'; citySlug = 'carlisle'; label = 'Carlisle Metro'; poolId = 'cumberland-metro-pa'
    regional1 = 'harrisburg-west'; regional2 = 'carlisle-corridor'
    topId = 'regional-cumberland-pa-movers'; topName = 'Regional Carlisle / Cumberland County Providers'
    topDesc = 'Reliable movers serving Cumberland County residential needs across Carlisle and surrounding Harrisburg-metro communities.'
    countyMovingName = 'Cumberland County Moving'; regional1Name = 'Harrisburg West Moving'; regional2Name = 'Carlisle Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'erie'; city = 'Erie'; citySlug = 'erie'; label = 'Erie Metro'; poolId = 'erie-metro-pa'
    regional1 = 'lake-erie'; regional2 = 'northwest-pa'
    topId = 'twomenandatruck-erie-pa'; topName = 'Two Men and a Truck Erie'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Erie County.'
    countyMovingName = 'Erie County Moving'; regional1Name = 'Lake Erie Moving'; regional2Name = 'Northwest PA Moving'
    franchise = $true
  },
  @{
    slug = 'lackawanna'; city = 'Scranton'; citySlug = 'scranton'; label = 'Scranton Metro'; poolId = 'lackawanna-metro-pa'
    regional1 = 'scranton-corridor'; regional2 = 'wyoming-valley-border'
    topId = 'twomenandatruck-lackawanna-pa'; topName = 'Two Men and a Truck Scranton'
    topDesc = 'Trusted local franchise with excellent reputation for residential moves across Lackawanna County.'
    countyMovingName = 'Lackawanna County Moving'; regional1Name = 'Scranton Corridor Moving'; regional2Name = 'Wyoming Valley Border Moving'
    franchise = $true
  },
  @{
    slug = 'washington'; city = 'Washington'; citySlug = 'washington'; label = 'Washington Metro'; poolId = 'washington-metro-pa'
    regional1 = 'pittsburgh-south'; regional2 = 'monongahela-corridor'
    topId = 'regional-washington-pa-movers'; topName = 'Regional Washington / Washington County Providers'
    topDesc = 'Reliable movers serving Washington County residential needs across Washington and surrounding Pittsburgh-metro communities.'
    countyMovingName = 'Washington County Moving'; regional1Name = 'Pittsburgh South Moving'; regional2Name = 'Monongahela Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'butler'; city = 'Butler'; citySlug = 'butler'; label = 'Butler Metro'; poolId = 'butler-metro-pa'
    regional1 = 'pittsburgh-north'; regional2 = 'butler-corridor'
    topId = 'regional-butler-pa-movers'; topName = 'Regional Butler / Butler County Providers'
    topDesc = 'Reliable movers serving Butler County residential needs across Butler and surrounding Pittsburgh-metro communities.'
    countyMovingName = 'Butler County Moving'; regional1Name = 'Pittsburgh North Moving'; regional2Name = 'Butler Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'monroe'; city = 'Stroudsburg'; citySlug = 'stroudsburg'; label = 'Stroudsburg Metro'; poolId = 'monroe-metro-pa'
    regional1 = 'pocono-mountains'; regional2 = 'stroudsburg-corridor'
    topId = 'regional-monroe-pa-movers'; topName = 'Regional Stroudsburg / Monroe County Providers'
    topDesc = 'Reliable movers serving Monroe County residential needs across Stroudsburg and the Pocono Mountains corridor.'
    countyMovingName = 'Monroe County Moving'; regional1Name = 'Pocono Mountains Moving'; regional2Name = 'Stroudsburg Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'beaver'; city = 'Beaver'; citySlug = 'beaver'; label = 'Beaver Metro'; poolId = 'beaver-metro-pa'
    regional1 = 'pittsburgh-northwest'; regional2 = 'ohio-river-beaver'
    topId = 'regional-beaver-pa-movers'; topName = 'Regional Beaver / Beaver County Providers'
    topDesc = 'Reliable movers serving Beaver County residential needs across Beaver and surrounding Pittsburgh-metro communities.'
    countyMovingName = 'Beaver County Moving'; regional1Name = 'Pittsburgh Northwest Moving'; regional2Name = 'Ohio River Beaver Moving'
    franchise = $false
  },
  @{
    slug = 'franklin'; city = 'Chambersburg'; citySlug = 'chambersburg'; label = 'Chambersburg Metro'; poolId = 'franklin-metro-pa'
    regional1 = 'south-central-pa'; regional2 = 'chambersburg-corridor'
    topId = 'regional-franklin-pa-movers'; topName = 'Regional Chambersburg / Franklin County Providers'
    topDesc = 'Reliable movers serving Franklin County residential needs across Chambersburg and South Central Pennsylvania communities.'
    countyMovingName = 'Franklin County Moving'; regional1Name = 'South Central PA Moving'; regional2Name = 'Chambersburg Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'centre'; city = 'State College'; citySlug = 'state-college'; label = 'State College Metro'; poolId = 'centre-metro-pa'
    regional1 = 'penn-state'; regional2 = 'happy-valley'
    topId = 'regional-centre-pa-movers'; topName = 'Regional State College / Centre County Providers'
    topDesc = 'Reliable movers serving Centre County residential needs across State College, Bellefonte, and Penn State communities.'
    countyMovingName = 'Centre County Moving'; regional1Name = 'Penn State Moving'; regional2Name = 'Happy Valley Moving'
    franchise = $false
  },
  @{
    slug = 'lebanon'; city = 'Lebanon'; citySlug = 'lebanon'; label = 'Lebanon Metro'; poolId = 'lebanon-metro-pa'
    regional1 = 'lebanon-corridor'; regional2 = 'harrisburg-east'
    topId = 'regional-lebanon-pa-movers'; topName = 'Regional Lebanon / Lebanon County Providers'
    topDesc = 'Reliable movers serving Lebanon County residential needs across Lebanon and South Central Pennsylvania communities.'
    countyMovingName = 'Lebanon County Moving'; regional1Name = 'Lebanon Corridor Moving'; regional2Name = 'Harrisburg East Moving'
    franchise = $false
  },
  @{
    slug = 'schuylkill'; city = 'Pottsville'; citySlug = 'pottsville'; label = 'Pottsville Metro'; poolId = 'schuylkill-metro-pa'
    regional1 = 'coal-region'; regional2 = 'pottsville-corridor'
    topId = 'regional-schuylkill-pa-movers'; topName = 'Regional Pottsville / Schuylkill County Providers'
    topDesc = 'Reliable movers serving Schuylkill County residential needs across Pottsville and Northeastern Pennsylvania communities.'
    countyMovingName = 'Schuylkill County Moving'; regional1Name = 'Coal Region Moving'; regional2Name = 'Pottsville Corridor Moving'
    franchise = $false
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
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-pa",
    "$citySlug-moving-$slug-pa",
    "$slug-county-moving-$slug-pa",
    "college-hunks-moving-$citySlug-pa",
    "budd-van-lines-$citySlug-pa",
    "$($c.regional1)-moving-$slug-pa",
    "$($c.regional2)-moving-$slug-pa",
    "hercules-movers-$citySlug-pa",
    "krupp-moving-$citySlug-pa"
  )

  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }
  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topSpecs = if ($c.franchise) { "['Residential', 'Commercial']" } else { "['Residential']" }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$topSpecs; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Pennsylvania communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Pennsylvania neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
  )

  $allCatalog += ($movers | ForEach-Object { Format-MoverBlock $_ })
  $poolIds = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $allPools += @"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: '$($c.label)',
    moverIds: [
$poolIds
    ],
  },
"@

  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  '$slug': [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 140 catalog entries, 14 metro pools for Pennsylvania batch 3'