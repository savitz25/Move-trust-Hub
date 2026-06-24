$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch6-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='cameron'; city='Emporium'; citySlug='emporium'; label='Emporium Metro'; poolId='cameron-metro-pa'; regional1='emporium-corridor'; regional2='allegheny-wilds'; topId='regional-cameron-pa-movers'; topName='Regional Emporium / Cameron County Providers'; topDesc='Reliable movers serving Cameron County residential needs across Emporium and Northern Pennsylvania communities.'; countyMovingName='Cameron County Moving'; regional1Name='Emporium Corridor Moving'; regional2Name='Allegheny Wilds Moving'; franchise=$false },
  @{ slug='clarion'; city='Clarion'; citySlug='clarion'; label='Clarion Metro'; poolId='clarion-metro-pa'; regional1='clarion-corridor'; regional2='allegheny-river-north'; topId='regional-clarion-pa-movers'; topName='Regional Clarion / Clarion County Providers'; topDesc='Reliable movers serving Clarion County residential needs across Clarion and Northwestern Pennsylvania communities.'; countyMovingName='Clarion County Moving'; regional1Name='Clarion Corridor Moving'; regional2Name='Allegheny River North Moving'; franchise=$false },
  @{ slug='elk'; city='Ridgway'; citySlug='ridgway'; label='Ridgway Metro'; poolId='elk-metro-pa'; regional1='ridgway-corridor'; regional2='elk-corridor'; topId='regional-elk-pa-movers'; topName='Regional Ridgway / Elk County Providers'; topDesc='Reliable movers serving Elk County residential needs across Ridgway and Northwestern Pennsylvania communities.'; countyMovingName='Elk County Moving'; regional1Name='Ridgway Corridor Moving'; regional2Name='Elk Corridor Moving'; franchise=$false },
  @{ slug='forest'; city='Tionesta'; citySlug='tionesta'; label='Tionesta Metro'; poolId='forest-metro-pa'; regional1='tionesta-corridor'; regional2='allegheny-forest'; topId='regional-forest-pa-movers'; topName='Regional Tionesta / Forest County Providers'; topDesc='Reliable movers serving Forest County residential needs across Tionesta and Northwestern Pennsylvania communities.'; countyMovingName='Forest County Moving'; regional1Name='Tionesta Corridor Moving'; regional2Name='Allegheny Forest Moving'; franchise=$false },
  @{ slug='fulton'; city='McConnellsburg'; citySlug='mcconnellsburg'; label='McConnellsburg Metro'; poolId='fulton-metro-pa'; regional1='mcconnellsburg-corridor'; regional2='great-valley'; topId='regional-fulton-pa-movers'; topName='Regional McConnellsburg / Fulton County Providers'; topDesc='Reliable movers serving Fulton County residential needs across McConnellsburg and South Central Pennsylvania communities.'; countyMovingName='Fulton County Moving'; regional1Name='McConnellsburg Corridor Moving'; regional2Name='Great Valley Moving'; franchise=$false },
  @{ slug='greene'; city='Waynesburg'; citySlug='waynesburg'; label='Waynesburg Metro'; poolId='greene-metro-pa'; regional1='waynesburg-corridor'; regional2='southwestern-ridge'; topId='regional-greene-pa-movers'; topName='Regional Waynesburg / Greene County Providers'; topDesc='Reliable movers serving Greene County residential needs across Waynesburg and Southwestern Pennsylvania communities.'; countyMovingName='Greene County Moving'; regional1Name='Waynesburg Corridor Moving'; regional2Name='Southwestern Ridge Moving'; franchise=$false },
  @{ slug='juniata'; city='Mifflintown'; citySlug='mifflintown'; label='Mifflintown Metro'; poolId='juniata-metro-pa'; regional1='mifflintown-corridor'; regional2='juniata-river'; topId='regional-juniata-pa-movers'; topName='Regional Mifflintown / Juniata County Providers'; topDesc='Reliable movers serving Juniata County residential needs across Mifflintown and Central Pennsylvania communities.'; countyMovingName='Juniata County Moving'; regional1Name='Mifflintown Corridor Moving'; regional2Name='Juniata River Moving'; franchise=$false },
  @{ slug='montour'; city='Danville'; citySlug='danville'; label='Danville Metro'; poolId='montour-metro-pa'; regional1='danville-corridor'; regional2='susquehanna-central'; topId='regional-montour-pa-movers'; topName='Regional Danville / Montour County Providers'; topDesc='Reliable movers serving Montour County residential needs across Danville and Central Pennsylvania communities.'; countyMovingName='Montour County Moving'; regional1Name='Danville Corridor Moving'; regional2Name='Susquehanna Central Moving'; franchise=$false },
  @{ slug='potter'; city='Coudersport'; citySlug='coudersport'; label='Coudersport Metro'; poolId='potter-metro-pa'; regional1='coudersport-corridor'; regional2='northern-tier-highlands'; topId='regional-potter-pa-movers'; topName='Regional Coudersport / Potter County Providers'; topDesc='Reliable movers serving Potter County residential needs across Coudersport and Northern Pennsylvania communities.'; countyMovingName='Potter County Moving'; regional1Name='Coudersport Corridor Moving'; regional2Name='Northern Tier Highlands Moving'; franchise=$false },
  @{ slug='sullivan'; city='Laporte'; citySlug='laporte'; label='Laporte Metro'; poolId='sullivan-metro-pa'; regional1='laporte-corridor'; regional2='endless-mountains-south'; topId='regional-sullivan-pa-movers'; topName='Regional Laporte / Sullivan County Providers'; topDesc='Reliable movers serving Sullivan County residential needs across Laporte and Northern Pennsylvania communities.'; countyMovingName='Sullivan County Moving'; regional1Name='Laporte Corridor Moving'; regional2Name='Endless Mountains South Moving'; franchise=$false },
  @{ slug='wyoming'; city='Tunkhannock'; citySlug='tunkhannock'; label='Tunkhannock Metro'; poolId='wyoming-metro-pa'; regional1='tunkhannock-corridor'; regional2='wyoming-valley-east'; topId='regional-wyoming-pa-movers'; topName='Regional Tunkhannock / Wyoming County Providers'; topDesc='Reliable movers serving Wyoming County residential needs across Tunkhannock and Northeastern Pennsylvania communities.'; countyMovingName='Wyoming County Moving'; regional1Name='Tunkhannock Corridor Moving'; regional2Name='Wyoming Valley East Moving'; franchise=$false }
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

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=280; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
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
Write-Host 'Generated 110 catalog entries, 11 metro pools for Pennsylvania batch 6 (state complete)'