$outDir = Join-Path $PSScriptRoot 'north-dakota-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='sargent'; city='Forman'; citySlug='forman'; label='Forman Metro'; poolId='sargent-metro-nd'; regional1='forman-corridor'; regional2='southeast-plains'; topId='regional-sargent-nd-movers'; topName='Regional Forman / Sargent Providers'; topDesc='Reliable movers serving Sargent County residential needs across Forman and southeastern rural communities.'; countyMovingName='Sargent County Moving'; regional1Name='Forman Corridor Moving'; regional2Name='Southeast Plains Moving'; countyLabel='Sargent County' },
  @{ slug='wells'; city='Fessenden'; citySlug='fessenden'; label='Fessenden Metro'; poolId='wells-metro-nd'; regional1='fessenden-corridor'; regional2='central-plains'; topId='regional-wells-nd-movers'; topName='Regional Fessenden / Wells Providers'; topDesc='Reliable movers serving Wells County residential needs across Fessenden and central North Dakota rural communities.'; countyMovingName='Wells County Moving'; regional1Name='Fessenden Corridor Moving'; regional2Name='Central Plains Moving'; countyLabel='Wells County, ND' },
  @{ slug='sioux'; city='Fort Yates'; citySlug='fort-yates'; label='Fort Yates Metro'; poolId='sioux-metro-nd'; regional1='fort-yates-corridor'; regional2='standing-rock'; topId='regional-sioux-nd-movers'; topName='Regional Fort Yates / Sioux Providers'; topDesc='Reliable movers serving Sioux County residential needs across Fort Yates and southern Missouri River corridor communities.'; countyMovingName='Sioux County Moving'; regional1Name='Fort Yates Corridor Moving'; regional2Name='Standing Rock Moving'; countyLabel='Sioux County, ND' },
  @{ slug='cavalier'; city='Langdon'; citySlug='langdon'; label='Langdon Metro'; poolId='cavalier-metro-nd'; regional1='langdon-corridor'; regional2='northern-valley'; topId='regional-cavalier-nd-movers'; topName='Regional Langdon / Cavalier Providers'; topDesc='Reliable movers serving Cavalier County residential needs across Langdon and northern valley rural communities.'; countyMovingName='Cavalier County Moving'; regional1Name='Langdon Corridor Moving'; regional2Name='Northern Valley Moving'; countyLabel='Cavalier County, ND' },
  @{ slug='emmons'; city='Linton'; citySlug='linton'; label='Linton Metro'; poolId='emmons-metro-nd'; regional1='linton-corridor'; regional2='southern-plains'; topId='regional-emmons-nd-movers'; topName='Regional Linton / Emmons Providers'; topDesc='Reliable movers serving Emmons County residential needs across Linton and southern North Dakota rural communities.'; countyMovingName='Emmons County Moving'; regional1Name='Linton Corridor Moving'; regional2Name='Southern Plains Moving'; countyLabel='Emmons County' },
  @{ slug='foster'; city='Carrington'; citySlug='carrington'; label='Carrington Metro'; poolId='foster-metro-nd'; regional1='carrington-corridor'; regional2='james-river-central'; topId='regional-foster-nd-movers'; topName='Regional Carrington / Foster Providers'; topDesc='Reliable movers serving Foster County residential needs across Carrington and central James River corridor communities.'; countyMovingName='Foster County Moving'; regional1Name='Carrington Corridor Moving'; regional2Name='James River Central Moving'; countyLabel='Foster County' },
  @{ slug='nelson'; city='Lakota'; citySlug='lakota'; label='Lakota Metro'; poolId='nelson-metro-nd'; regional1='lakota-corridor'; regional2='northern-lake-region'; topId='regional-nelson-nd-movers'; topName='Regional Lakota / Nelson Providers'; topDesc='Reliable movers serving Nelson County residential needs across Lakota and northern lake-region rural communities.'; countyMovingName='Nelson County Moving'; regional1Name='Lakota Corridor Moving'; regional2Name='Northern Lake Region Moving'; countyLabel='Nelson County, ND' },
  @{ slug='bowman'; city='Bowman'; citySlug='bowman'; label='Bowman Metro'; poolId='bowman-metro-nd'; regional1='bowman-corridor'; regional2='southwest-corner'; topId='regional-bowman-nd-movers'; topName='Regional Bowman / Bowman County Providers'; topDesc='Reliable movers serving Bowman County residential needs across Bowman and southwestern North Dakota rural communities.'; countyMovingName='Bowman County Moving'; regional1Name='Bowman Corridor Moving'; regional2Name='Southwest Corner Moving'; countyLabel='Bowman County, ND' },
  @{ slug='hettinger'; city='Hettinger'; citySlug='hettinger'; label='Hettinger Metro'; poolId='hettinger-metro-nd'; regional1='hettinger-corridor'; regional2='southwest-plateau'; topId='regional-hettinger-nd-movers'; topName='Regional Hettinger / Hettinger County Providers'; topDesc='Reliable movers serving Hettinger County residential needs across Hettinger and southwestern plateau rural communities.'; countyMovingName='Hettinger County Moving'; regional1Name='Hettinger Corridor Moving'; regional2Name='Southwest Plateau Moving'; countyLabel='Hettinger County, ND' },
  @{ slug='mcintosh'; city='Ashley'; citySlug='ashley'; label='Ashley Metro'; poolId='mcintosh-metro-nd'; regional1='ashley-corridor'; regional2='james-river-south'; topId='regional-mcintosh-nd-movers'; topName='Regional Ashley / McIntosh Providers'; topDesc='Reliable movers serving McIntosh County residential needs across Ashley and southeastern rural communities.'; countyMovingName='McIntosh County Moving'; regional1Name='Ashley Corridor Moving'; regional2Name='James River South Moving'; countyLabel='McIntosh County, ND' },
  @{ slug='kidder'; city='Steele'; citySlug='steele'; label='Steele Metro'; poolId='kidder-metro-nd'; regional1='steele-corridor'; regional2='central-coteau'; topId='regional-kidder-nd-movers'; topName='Regional Steele / Kidder Providers'; topDesc='Reliable movers serving Kidder County residential needs across Steele and central coteau rural communities.'; countyMovingName='Kidder County Moving'; regional1Name='Steele Corridor Moving'; regional2Name='Central Coteau Moving'; countyLabel='Kidder County, ND' },
  @{ slug='renville'; city='Mohall'; citySlug='mohall'; label='Mohall Metro'; poolId='renville-metro-nd'; regional1='mohall-corridor'; regional2='northwest-plains'; topId='regional-renville-nd-movers'; topName='Regional Mohall / Renville Providers'; topDesc='Reliable movers serving Renville County residential needs across Mohall and northwestern rural communities.'; countyMovingName='Renville County Moving'; regional1Name='Mohall Corridor Moving'; regional2Name='Northwest Plains Moving'; countyLabel='Renville County, ND' },
  @{ slug='adams'; city='Hettinger'; citySlug='hettinger'; label='Hettinger Metro'; poolId='adams-metro-nd'; regional1='hettinger-adams-corridor'; regional2='southwest-border'; topId='regional-adams-nd-movers'; topName='Regional Hettinger / Adams Providers'; topDesc='Reliable movers serving Adams County residential needs across Hettinger and southwestern border rural communities.'; countyMovingName='Adams County Moving'; regional1Name='Hettinger Adams Corridor Moving'; regional2Name='Southwest Border Moving'; countyLabel='Adams County, ND' },
  @{ slug='eddy'; city='New Rockford'; citySlug='new-rockford'; label='New Rockford Metro'; poolId='eddy-metro-nd'; regional1='new-rockford-corridor'; regional2='central-lake-basin'; topId='regional-eddy-nd-movers'; topName='Regional New Rockford / Eddy Providers'; topDesc='Reliable movers serving Eddy County residential needs across New Rockford and central lake-basin rural communities.'; countyMovingName='Eddy County Moving'; regional1Name='New Rockford Corridor Moving'; regional2Name='Central Lake Basin Moving'; countyLabel='Eddy County, ND' },
  @{ slug='griggs'; city='Cooperstown'; citySlug='cooperstown'; label='Cooperstown Metro'; poolId='griggs-metro-nd'; regional1='cooperstown-corridor'; regional2='red-river-central'; topId='regional-griggs-nd-movers'; topName='Regional Cooperstown / Griggs Providers'; topDesc='Reliable movers serving Griggs County residential needs across Cooperstown and central Red River corridor communities.'; countyMovingName='Griggs County Moving'; regional1Name='Cooperstown Corridor Moving'; regional2Name='Red River Central Moving'; countyLabel='Griggs County' },
  @{ slug='grant'; city='Carson'; citySlug='carson'; label='Carson Metro'; poolId='grant-metro-nd'; regional1='carson-corridor'; regional2='missouri-southwest'; topId='regional-grant-nd-movers'; topName='Regional Carson / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Carson and southwestern Missouri River corridor communities.'; countyMovingName='Grant County Moving'; regional1Name='Carson Corridor Moving'; regional2Name='Missouri Southwest Moving'; countyLabel='Grant County, ND' },
  @{ slug='burke'; city='Bowbells'; citySlug='bowbells'; label='Bowbells Metro'; poolId='burke-metro-nd'; regional1='bowbells-corridor'; regional2='northwest-border'; topId='regional-burke-nd-movers'; topName='Regional Bowbells / Burke Providers'; topDesc='Reliable movers serving Burke County residential needs across Bowbells and northwestern border rural communities.'; countyMovingName='Burke County Moving'; regional1Name='Bowbells Corridor Moving'; regional2Name='Northwest Border Moving'; countyLabel='Burke County, ND' },
  @{ slug='divide'; city='Crosby'; citySlug='crosby'; label='Crosby Metro'; poolId='divide-metro-nd'; regional1='crosby-corridor'; regional2='northwest-corner'; topId='regional-divide-nd-movers'; topName='Regional Crosby / Divide Providers'; topDesc='Reliable movers serving Divide County residential needs across Crosby and northwestern corner rural communities.'; countyMovingName='Divide County Moving'; regional1Name='Crosby Corridor Moving'; regional2Name='Northwest Corner Moving'; countyLabel='Divide County, ND' },
  @{ slug='towner'; city='Cando'; citySlug='cando'; label='Cando Metro'; poolId='towner-metro-nd'; regional1='cando-corridor'; regional2='northern-plains'; topId='regional-towner-nd-movers'; topName='Regional Cando / Towner Providers'; topDesc='Reliable movers serving Towner County residential needs across Cando and northern plains rural communities.'; countyMovingName='Towner County Moving'; regional1Name='Cando Corridor Moving'; regional2Name='Northern Plains Moving'; countyLabel='Towner County, ND' },
  @{ slug='oliver'; city='Center'; citySlug='center'; label='Center Metro'; poolId='oliver-metro-nd'; regional1='center-corridor'; regional2='coal-creek'; topId='regional-oliver-nd-movers'; topName='Regional Center / Oliver Providers'; topDesc='Reliable movers serving Oliver County residential needs across Center and central Missouri Slope rural communities.'; countyMovingName='Oliver County Moving'; regional1Name='Center Corridor Moving'; regional2Name='Coal Creek Moving'; countyLabel='Oliver County, ND' },
  @{ slug='golden-valley'; city='Beach'; citySlug='beach'; label='Beach Metro'; poolId='golden-valley-metro-nd'; regional1='beach-corridor'; regional2='badlands-south'; topId='regional-goldenvalley-nd-movers'; topName='Regional Beach / Golden Valley Providers'; topDesc='Reliable movers serving Golden Valley County residential needs across Beach and southwestern badlands rural communities.'; countyMovingName='Golden Valley County Moving'; regional1Name='Beach Corridor Moving'; regional2Name='Badlands South Moving'; countyLabel='Golden Valley County, ND' },
  @{ slug='logan'; city='Napoleon'; citySlug='napoleon'; label='Napoleon Metro'; poolId='logan-metro-nd'; regional1='napoleon-corridor'; regional2='james-river-mid'; topId='regional-logan-nd-movers'; topName='Regional Napoleon / Logan Providers'; topDesc='Reliable movers serving Logan County residential needs across Napoleon and central James River rural communities.'; countyMovingName='Logan County Moving'; regional1Name='Napoleon Corridor Moving'; regional2Name='James River Mid Moving'; countyLabel='Logan County, ND' },
  @{ slug='steele'; city='Finley'; citySlug='finley'; label='Finley Metro'; poolId='steele-metro-nd'; regional1='finley-corridor'; regional2='red-river-mid'; topId='regional-steele-nd-movers'; topName='Regional Finley / Steele Providers'; topDesc='Reliable movers serving Steele County residential needs across Finley and central Red River corridor communities.'; countyMovingName='Steele County Moving'; regional1Name='Finley Corridor Moving'; regional2Name='Red River Mid Moving'; countyLabel='Steele County, ND' },
  @{ slug='sheridan'; city='McClusky'; citySlug='mcclusky'; label='McClusky Metro'; poolId='sheridan-metro-nd'; regional1='mcclusky-corridor'; regional2='missouri-coteau'; topId='regional-sheridan-nd-movers'; topName='Regional McClusky / Sheridan Providers'; topDesc='Reliable movers serving Sheridan County residential needs across McClusky and central Missouri Coteau rural communities.'; countyMovingName='Sheridan County Moving'; regional1Name='McClusky Corridor Moving'; regional2Name='Missouri Coteau Moving'; countyLabel='Sheridan County, ND' },
  @{ slug='billings'; city='Medora'; citySlug='medora'; label='Medora Metro'; poolId='billings-metro-nd'; regional1='medora-corridor'; regional2='badlands-gateway'; topId='regional-billings-nd-movers'; topName='Regional Medora / Billings Providers'; topDesc='Reliable movers serving Billings County residential needs across Medora and Theodore Roosevelt badlands gateway communities.'; countyMovingName='Billings County Moving'; regional1Name='Medora Corridor Moving'; regional2Name='Badlands Gateway Moving'; countyLabel='Billings County, ND' },
  @{ slug='slope'; city='Amidon'; citySlug='amidon'; label='Amidon Metro'; poolId='slope-metro-nd'; regional1='amidon-corridor'; regional2='southwest-frontier'; topId='regional-slope-nd-movers'; topName='Regional Amidon / Slope Providers'; topDesc='Reliable movers serving Slope County residential needs across Amidon and southwestern frontier rural communities.'; countyMovingName='Slope County Moving'; regional1Name='Amidon Corridor Moving'; regional2Name='Southwest Frontier Moving'; countyLabel='Slope County' },
  @{ slug='dickey'; city='Ellendale'; citySlug='ellendale'; label='Ellendale Metro'; poolId='dickey-metro-nd'; regional1='ellendale-corridor'; regional2='southeast-coteau'; topId='regional-dickey-nd-movers'; topName='Regional Ellendale / Dickey Providers'; topDesc='Reliable movers serving Dickey County residential needs across Ellendale and southeastern coteau rural communities.'; countyMovingName='Dickey County Moving'; regional1Name='Ellendale Corridor Moving'; regional2Name='Southeast Coteau Moving'; countyLabel='Dickey County' },
  @{ slug='mchenry'; city='Towner'; citySlug='towner'; label='Towner Metro'; poolId='mchenry-metro-nd'; regional1='towner-mchenry-corridor'; regional2='northern-souris'; topId='regional-mchenry-nd-movers'; topName='Regional Towner / McHenry Providers'; topDesc='Reliable movers serving McHenry County residential needs across Towner and northern Souris River rural communities.'; countyMovingName='McHenry County Moving'; regional1Name='Towner McHenry Corridor Moving'; regional2Name='Northern Souris Moving'; countyLabel='McHenry County, ND' }
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
    "all-my-sons-$citySlug-nd",
    "$citySlug-moving-$slug-nd",
    "$slug-county-moving-$slug-nd",
    "college-hunks-moving-$citySlug-nd",
    "budd-van-lines-$citySlug-nd",
    "$($c.regional1)-moving-$slug-nd",
    "$($c.regional2)-moving-$slug-nd",
    "hercules-movers-$citySlug-nd",
    "krupp-moving-$citySlug-nd"
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
Write-Host 'Generated 280 catalog entries, 28 metro pools for North Dakota batch 2'