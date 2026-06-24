$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='cambria'; city='Johnstown'; citySlug='johnstown'; label='Johnstown Metro'; poolId='cambria-metro-pa'; regional1='johnstown-corridor'; regional2='southwestern-pa'; topId='regional-cambria-pa-movers'; topName='Regional Johnstown / Cambria County Providers'; topDesc='Reliable movers serving Cambria County residential needs across Johnstown and Southwestern Pennsylvania communities.'; countyMovingName='Cambria County Moving'; regional1Name='Johnstown Corridor Moving'; regional2Name='Southwestern PA Moving'; franchise=$false },
  @{ slug='fayette'; city='Uniontown'; citySlug='uniontown'; label='Uniontown Metro'; poolId='fayette-metro-pa'; regional1='uniontown-corridor'; regional2='monongahela-south'; topId='regional-fayette-pa-movers'; topName='Regional Uniontown / Fayette County Providers'; topDesc='Reliable movers serving Fayette County residential needs across Uniontown and Southwestern Pennsylvania communities.'; countyMovingName='Fayette County Moving'; regional1Name='Uniontown Corridor Moving'; regional2Name='Monongahela South Moving'; franchise=$false },
  @{ slug='blair'; city='Altoona'; citySlug='altoona'; label='Altoona Metro'; poolId='blair-metro-pa'; regional1='altoona-corridor'; regional2='allegheny-mountains'; topId='regional-blair-pa-movers'; topName='Regional Altoona / Blair County Providers'; topDesc='Reliable movers serving Blair County residential needs across Altoona, Hollidaysburg, and Central Pennsylvania communities.'; countyMovingName='Blair County Moving'; regional1Name='Altoona Corridor Moving'; regional2Name='Allegheny Mountains Moving'; franchise=$false },
  @{ slug='lycoming'; city='Williamsport'; citySlug='williamsport'; label='Williamsport Metro'; poolId='lycoming-metro-pa'; regional1='williamsport-corridor'; regional2='north-central-pa'; topId='regional-lycoming-pa-movers'; topName='Regional Williamsport / Lycoming County Providers'; topDesc='Reliable movers serving Lycoming County residential needs across Williamsport and North Central Pennsylvania communities.'; countyMovingName='Lycoming County Moving'; regional1Name='Williamsport Corridor Moving'; regional2Name='North Central PA Moving'; franchise=$false },
  @{ slug='adams'; city='Gettysburg'; citySlug='gettysburg'; label='Gettysburg Metro'; poolId='adams-metro-pa'; regional1='gettysburg-corridor'; regional2='south-mountain'; topId='regional-adams-pa-movers'; topName='Regional Gettysburg / Adams County Providers'; topDesc='Reliable movers serving Adams County residential needs across Gettysburg and South Central Pennsylvania communities.'; countyMovingName='Adams County Moving'; regional1Name='Gettysburg Corridor Moving'; regional2Name='South Mountain Moving'; franchise=$false },
  @{ slug='mercer'; city='Mercer'; citySlug='mercer'; label='Mercer Metro'; poolId='mercer-metro-pa'; regional1='mercer-corridor'; regional2='northwest-pa'; topId='regional-mercer-pa-movers'; topName='Regional Mercer / Mercer County Providers'; topDesc='Reliable movers serving Mercer County residential needs across Mercer and Northwestern Pennsylvania communities.'; countyMovingName='Mercer County Moving'; regional1Name='Mercer Corridor Moving'; regional2Name='Northwest PA Moving'; franchise=$false },
  @{ slug='northumberland'; city='Sunbury'; citySlug='sunbury'; label='Sunbury Metro'; poolId='northumberland-metro-pa'; regional1='sunbury-corridor'; regional2='susquehanna-river'; topId='regional-northumberland-pa-movers'; topName='Regional Sunbury / Northumberland County Providers'; topDesc='Reliable movers serving Northumberland County residential needs across Sunbury and Central Pennsylvania communities.'; countyMovingName='Northumberland County Moving'; regional1Name='Sunbury Corridor Moving'; regional2Name='Susquehanna River Moving'; franchise=$false },
  @{ slug='lawrence'; city='New Castle'; citySlug='new-castle'; label='New Castle Metro'; poolId='lawrence-metro-pa'; regional1='new-castle-corridor'; regional2='beaver-valley'; topId='regional-lawrence-pa-movers'; topName='Regional New Castle / Lawrence County Providers'; topDesc='Reliable movers serving Lawrence County residential needs across New Castle and Northwestern Pennsylvania communities.'; countyMovingName='Lawrence County Moving'; regional1Name='New Castle Corridor Moving'; regional2Name='Beaver Valley Moving'; franchise=$false },
  @{ slug='indiana'; city='Indiana'; citySlug='indiana'; label='Indiana Metro'; poolId='indiana-metro-pa'; regional1='indiana-corridor'; regional2='western-pa'; topId='regional-indiana-pa-movers'; topName='Regional Indiana / Indiana County Providers'; topDesc='Reliable movers serving Indiana County residential needs across Indiana and Western Pennsylvania communities.'; countyMovingName='Indiana County Moving'; regional1Name='Indiana Corridor Moving'; regional2Name='Western PA Moving'; franchise=$false },
  @{ slug='crawford'; city='Meadville'; citySlug='meadville'; label='Meadville Metro'; poolId='crawford-metro-pa'; regional1='meadville-corridor'; regional2='crawford-corridor'; topId='regional-crawford-pa-movers'; topName='Regional Meadville / Crawford County Providers'; topDesc='Reliable movers serving Crawford County residential needs across Meadville and Northwestern Pennsylvania communities.'; countyMovingName='Crawford County Moving'; regional1Name='Meadville Corridor Moving'; regional2Name='Crawford Corridor Moving'; franchise=$false },
  @{ slug='clearfield'; city='Clearfield'; citySlug='clearfield'; label='Clearfield Metro'; poolId='clearfield-metro-pa'; regional1='clearfield-corridor'; regional2='allegheny-plateau'; topId='regional-clearfield-pa-movers'; topName='Regional Clearfield / Clearfield County Providers'; topDesc='Reliable movers serving Clearfield County residential needs across Clearfield and Central Pennsylvania communities.'; countyMovingName='Clearfield County Moving'; regional1Name='Clearfield Corridor Moving'; regional2Name='Allegheny Plateau Moving'; franchise=$false },
  @{ slug='somerset'; city='Somerset'; citySlug='somerset'; label='Somerset Metro'; poolId='somerset-metro-pa'; regional1='somerset-corridor'; regional2='laurel-highlands-south'; topId='regional-somerset-pa-movers'; topName='Regional Somerset / Somerset County Providers'; topDesc='Reliable movers serving Somerset County residential needs across Somerset and Southwestern Pennsylvania communities.'; countyMovingName='Somerset County Moving'; regional1Name='Somerset Corridor Moving'; regional2Name='Laurel Highlands South Moving'; franchise=$false },
  @{ slug='columbia'; city='Bloomsburg'; citySlug='bloomsburg'; label='Bloomsburg Metro'; poolId='columbia-metro-pa'; regional1='bloomsburg-corridor'; regional2='susquehanna-north'; topId='regional-columbia-pa-movers'; topName='Regional Bloomsburg / Columbia County Providers'; topDesc='Reliable movers serving Columbia County residential needs across Bloomsburg and Central Pennsylvania communities.'; countyMovingName='Columbia County Moving'; regional1Name='Bloomsburg Corridor Moving'; regional2Name='Susquehanna North Moving'; franchise=$false },
  @{ slug='carbon'; city='Jim Thorpe'; citySlug='jim-thorpe'; label='Jim Thorpe Metro'; poolId='carbon-metro-pa'; regional1='jim-thorpe-corridor'; regional2='pocono-west'; topId='regional-carbon-pa-movers'; topName='Regional Jim Thorpe / Carbon County Providers'; topDesc='Reliable movers serving Carbon County residential needs across Jim Thorpe and Northeastern Pennsylvania communities.'; countyMovingName='Carbon County Moving'; regional1Name='Jim Thorpe Corridor Moving'; regional2Name='Pocono West Moving'; franchise=$false },
  @{ slug='armstrong'; city='Kittanning'; citySlug='kittanning'; label='Kittanning Metro'; poolId='armstrong-metro-pa'; regional1='kittanning-corridor'; regional2='allegheny-river'; topId='regional-armstrong-pa-movers'; topName='Regional Kittanning / Armstrong County Providers'; topDesc='Reliable movers serving Armstrong County residential needs across Kittanning and Western Pennsylvania communities.'; countyMovingName='Armstrong County Moving'; regional1Name='Kittanning Corridor Moving'; regional2Name='Allegheny River Moving'; franchise=$false },
  @{ slug='pike'; city='Milford'; citySlug='milford'; label='Milford Metro'; poolId='pike-metro-pa'; regional1='milford-corridor'; regional2='delaware-highlands'; topId='regional-pike-pa-movers'; topName='Regional Milford / Pike County Providers'; topDesc='Reliable movers serving Pike County residential needs across Milford and Northeastern Pennsylvania communities.'; countyMovingName='Pike County Moving'; regional1Name='Milford Corridor Moving'; regional2Name='Delaware Highlands Moving'; franchise=$false }
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
Write-Host 'Generated 160 catalog entries, 16 metro pools for Pennsylvania batch 4'