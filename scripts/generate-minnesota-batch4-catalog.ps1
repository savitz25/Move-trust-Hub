$outDir = Join-Path $PSScriptRoot 'minnesota-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='cottonwood'; city='Windom'; citySlug='windom'; label='Windom Metro'; poolId='cottonwood-metro-mn'; regional1='windom-corridor'; regional2='des-moines-cottonwood'; topId='regional-cottonwood-mn-movers'; topName='Regional Windom / Cottonwood Providers'; topDesc='Reliable movers serving Cottonwood County residential needs across Windom and southwestern Minnesota corridor communities.'; countyMovingName='Cottonwood County Moving'; regional1Name='Windom Corridor Moving'; regional2Name='Des Moines Cottonwood Moving'; countyLabel='Cottonwood County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pope'; city='Glenwood'; citySlug='glenwood'; label='Glenwood Metro'; poolId='pope-metro-mn'; regional1='glenwood-corridor'; regional2='minnewaska-pope'; topId='regional-pope-mn-movers'; topName='Regional Glenwood / Pope Providers'; topDesc='Reliable movers serving Pope County residential needs across Glenwood and Minnewaska lakes corridor communities.'; countyMovingName='Pope County Moving'; regional1Name='Glenwood Corridor Moving'; regional2Name='Minnewaska Pope Moving'; countyLabel='Pope County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lake'; city='Two Harbors'; citySlug='two-harbors'; label='Two Harbors Metro'; poolId='lake-metro-mn'; regional1='two-harbors-corridor'; regional2='north-shore-lake'; topId='regional-lake-mn-movers'; topName='Regional Two Harbors / Lake Providers'; topDesc='Reliable movers serving Lake County residential needs across Two Harbors and Lake Superior north shore corridor communities.'; countyMovingName='Lake County Moving'; regional1Name='Two Harbors Corridor Moving'; regional2Name='North Shore Lake Moving'; countyLabel='Lake County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jackson'; city='Jackson'; citySlug='jackson'; label='Jackson Metro'; poolId='jackson-metro-mn'; regional1='jackson-corridor'; regional2='des-moines-jackson'; topId='regional-jackson-mn-movers'; topName='Regional Jackson / Jackson County Providers'; topDesc='Reliable movers serving Jackson County residential needs across Jackson and southwestern Minnesota corridor communities.'; countyMovingName='Jackson County Moving'; regional1Name='Jackson Corridor Moving'; regional2Name='Des Moines Jackson Moving'; countyLabel='Jackson County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='swift'; city='Benson'; citySlug='benson'; label='Benson Metro'; poolId='swift-metro-mn'; regional1='benson-corridor'; regional2='chippewa-swift'; topId='regional-swift-mn-movers'; topName='Regional Benson / Swift Providers'; topDesc='Reliable movers serving Swift County residential needs across Benson and west-central Minnesota corridor communities.'; countyMovingName='Swift County Moving'; regional1Name='Benson Corridor Moving'; regional2Name='Chippewa Swift Moving'; countyLabel='Swift County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='stevens'; city='Morris'; citySlug='morris'; label='Morris Metro'; poolId='stevens-metro-mn'; regional1='morris-corridor'; regional2='stevens-river-valley'; topId='regional-stevens-mn-movers'; topName='Regional Morris / Stevens Providers'; topDesc='Reliable movers serving Stevens County residential needs across Morris and west-central Minnesota corridor communities.'; countyMovingName='Stevens County Moving'; regional1Name='Morris Corridor Moving'; regional2Name='Stevens River Valley Moving'; countyLabel='Stevens County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='rock'; city='Luverne'; citySlug='luverne'; label='Luverne Metro'; poolId='rock-metro-mn'; regional1='luverne-corridor'; regional2='rock-river-valley'; topId='regional-rock-mn-movers'; topName='Regional Luverne / Rock Providers'; topDesc='Reliable movers serving Rock County residential needs across Luverne and southwestern Minnesota corridor communities.'; countyMovingName='Rock County Moving'; regional1Name='Luverne Corridor Moving'; regional2Name='Rock River Valley Moving'; countyLabel='Rock County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='yellow-medicine'; city='Granite Falls'; citySlug='granite-falls'; label='Granite Falls Metro'; poolId='yellow-medicine-metro-mn'; regional1='granite-falls-corridor'; regional2='minnesota-river-yellow-medicine'; topId='regional-yellowmedicine-mn-movers'; topName='Regional Granite Falls / Yellow Medicine Providers'; topDesc='Reliable movers serving Yellow Medicine County residential needs across Granite Falls and Minnesota River valley corridor communities.'; countyMovingName='Yellow Medicine County Moving'; regional1Name='Granite Falls Corridor Moving'; regional2Name='Minnesota River Yellow Medicine Moving'; countyLabel='Yellow Medicine County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pipestone'; city='Pipestone'; citySlug='pipestone'; label='Pipestone Metro'; poolId='pipestone-metro-mn'; regional1='pipestone-corridor'; regional2='pipestone-quarry-valley'; topId='regional-pipestone-mn-movers'; topName='Regional Pipestone / Pipestone County Providers'; topDesc='Reliable movers serving Pipestone County residential needs across Pipestone and southwestern Minnesota corridor communities.'; countyMovingName='Pipestone County Moving'; regional1Name='Pipestone Corridor Moving'; regional2Name='Pipestone Quarry Valley Moving'; countyLabel='Pipestone County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marshall'; city='Warren'; citySlug='warren'; label='Warren Metro'; poolId='marshall-metro-mn'; regional1='warren-corridor'; regional2='red-river-marshall'; topId='regional-marshall-mn-movers'; topName='Regional Warren / Marshall Providers'; topDesc='Reliable movers serving Marshall County residential needs across Warren and northwest Minnesota Red River corridor communities.'; countyMovingName='Marshall County Moving'; regional1Name='Warren Corridor Moving'; regional2Name='Red River Marshall Moving'; countyLabel='Marshall County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clearwater'; city='Bagley'; citySlug='bagley'; label='Bagley Metro'; poolId='clearwater-metro-mn'; regional1='bagley-corridor'; regional2='clearwater-river-valley'; topId='regional-clearwater-mn-movers'; topName='Regional Bagley / Clearwater Providers'; topDesc='Reliable movers serving Clearwater County residential needs across Bagley and north-central Minnesota corridor communities.'; countyMovingName='Clearwater County Moving'; regional1Name='Bagley Corridor Moving'; regional2Name='Clearwater River Valley Moving'; countyLabel='Clearwater County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='murray'; city='Slayton'; citySlug='slayton'; label='Slayton Metro'; poolId='murray-metro-mn'; regional1='slayton-corridor'; regional2='des-moines-murray'; topId='regional-murray-mn-movers'; topName='Regional Slayton / Murray Providers'; topDesc='Reliable movers serving Murray County residential needs across Slayton and southwestern Minnesota corridor communities.'; countyMovingName='Murray County Moving'; regional1Name='Slayton Corridor Moving'; regional2Name='Des Moines Murray Moving'; countyLabel='Murray County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lac-qui-parle'; city='Madison'; citySlug='madison'; label='Madison Metro'; poolId='lac-qui-parle-metro-mn'; regional1='madison-corridor'; regional2='lac-qui-parle-valley'; topId='regional-lacquiparle-mn-movers'; topName='Regional Madison / Lac qui Parle Providers'; topDesc='Reliable movers serving Lac qui Parle County residential needs across Madison and western Minnesota valley corridor communities.'; countyMovingName='Lac qui Parle County Moving'; regional1Name='Madison Corridor Moving'; regional2Name='Lac qui Parle Valley Moving'; countyLabel='Lac qui Parle County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='norman'; city='Ada'; citySlug='ada'; label='Ada Metro'; poolId='norman-metro-mn'; regional1='ada-corridor'; regional2='wild-rice-norman'; topId='regional-norman-mn-movers'; topName='Regional Ada / Norman Providers'; topDesc='Reliable movers serving Norman County residential needs across Ada and northwest Minnesota corridor communities.'; countyMovingName='Norman County Moving'; regional1Name='Ada Corridor Moving'; regional2Name='Wild Rice Norman Moving'; countyLabel='Norman County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wilkin'; city='Breckenridge'; citySlug='breckenridge'; label='Breckenridge Metro'; poolId='wilkin-metro-mn'; regional1='breckenridge-corridor'; regional2='red-river-wilkin'; topId='regional-wilkin-mn-movers'; topName='Regional Breckenridge / Wilkin Providers'; topDesc='Reliable movers serving Wilkin County residential needs across Breckenridge and Red River border corridor communities.'; countyMovingName='Wilkin County Moving'; regional1Name='Breckenridge Corridor Moving'; regional2Name='Red River Wilkin Moving'; countyLabel='Wilkin County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='grant'; city='Elbow Lake'; citySlug='elbow-lake'; label='Elbow Lake Metro'; poolId='grant-metro-mn'; regional1='elbow-lake-corridor'; regional2='pelican-grant'; topId='regional-grant-mn-movers'; topName='Regional Elbow Lake / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Elbow Lake and west-central Minnesota corridor communities.'; countyMovingName='Grant County Moving'; regional1Name='Elbow Lake Corridor Moving'; regional2Name='Pelican Grant Moving'; countyLabel='Grant County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='Ivanhoe'; citySlug='ivanhoe'; label='Ivanhoe Metro'; poolId='lincoln-metro-mn'; regional1='ivanhoe-corridor'; regional2='des-moines-lincoln'; topId='regional-lincoln-mn-movers'; topName='Regional Ivanhoe / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Ivanhoe and southwestern Minnesota corridor communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Ivanhoe Corridor Moving'; regional2Name='Des Moines Lincoln Moving'; countyLabel='Lincoln County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cook'; city='Grand Marais'; citySlug='grand-marais'; label='Grand Marais Metro'; poolId='cook-metro-mn'; regional1='grand-marais-corridor'; regional2='gunflint-cook'; topId='regional-cook-mn-movers'; topName='Regional Grand Marais / Cook Providers'; topDesc='Reliable movers serving Cook County residential needs across Grand Marais and Gunflint Trail northwoods corridor communities.'; countyMovingName='Cook County Moving'; regional1Name='Grand Marais Corridor Moving'; regional2Name='Gunflint Cook Moving'; countyLabel='Cook County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mahnomen'; city='Mahnomen'; citySlug='mahnomen'; label='Mahnomen Metro'; poolId='mahnomen-metro-mn'; regional1='mahnomen-corridor'; regional2='wild-rice-mahnomen'; topId='regional-mahnomen-mn-movers'; topName='Regional Mahnomen / Mahnomen County Providers'; topDesc='Reliable movers serving Mahnomen County residential needs across Mahnomen and northwest Minnesota corridor communities.'; countyMovingName='Mahnomen County Moving'; regional1Name='Mahnomen Corridor Moving'; regional2Name='Wild Rice Mahnomen Moving'; countyLabel='Mahnomen County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='big-stone'; city='Ortonville'; citySlug='ortonville'; label='Ortonville Metro'; poolId='big-stone-metro-mn'; regional1='ortonville-corridor'; regional2='big-stone-lake'; topId='regional-bigstone-mn-movers'; topName='Regional Ortonville / Big Stone Providers'; topDesc='Reliable movers serving Big Stone County residential needs across Ortonville and Big Stone Lake border corridor communities.'; countyMovingName='Big Stone County Moving'; regional1Name='Ortonville Corridor Moving'; regional2Name='Big Stone Lake Moving'; countyLabel='Big Stone County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kittson'; city='Hallock'; citySlug='hallock'; label='Hallock Metro'; poolId='kittson-metro-mn'; regional1='hallock-corridor'; regional2='red-river-kittson'; topId='regional-kittson-mn-movers'; topName='Regional Hallock / Kittson Providers'; topDesc='Reliable movers serving Kittson County residential needs across Hallock and northwest Minnesota Red River corridor communities.'; countyMovingName='Kittson County Moving'; regional1Name='Hallock Corridor Moving'; regional2Name='Red River Kittson Moving'; countyLabel='Kittson County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='red-lake'; city='Red Lake Falls'; citySlug='red-lake-falls'; label='Red Lake Falls Metro'; poolId='red-lake-metro-mn'; regional1='red-lake-falls-corridor'; regional2='red-lake-river-valley'; topId='regional-redlake-mn-movers'; topName='Regional Red Lake Falls / Red Lake Providers'; topDesc='Reliable movers serving Red Lake County residential needs across Red Lake Falls and northwest Minnesota corridor communities.'; countyMovingName='Red Lake County Moving'; regional1Name='Red Lake Falls Corridor Moving'; regional2Name='Red Lake River Valley Moving'; countyLabel='Red Lake County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lake-of-the-woods'; city='Baudette'; citySlug='baudette'; label='Baudette Metro'; poolId='lake-of-the-woods-metro-mn'; regional1='baudette-corridor'; regional2='rainy-lake-lake-of-the-woods'; topId='regional-lakeofthewoods-mn-movers'; topName='Regional Baudette / Lake of the Woods Providers'; topDesc='Reliable movers serving Lake of the Woods County residential needs across Baudette and Rainy Lake northern corridor communities.'; countyMovingName='Lake of the Woods County Moving'; regional1Name='Baudette Corridor Moving'; regional2Name='Rainy Lake Lake of the Woods Moving'; countyLabel='Lake of the Woods County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='traverse'; city='Wheaton'; citySlug='wheaton'; label='Wheaton Metro'; poolId='traverse-metro-mn'; regional1='wheaton-corridor'; regional2='bois-de-sioux-traverse'; topId='regional-traverse-mn-movers'; topName='Regional Wheaton / Traverse Providers'; topDesc='Reliable movers serving Traverse County residential needs across Wheaton and western Minnesota border corridor communities.'; countyMovingName='Traverse County Moving'; regional1Name='Wheaton Corridor Moving'; regional2Name='Bois de Sioux Traverse Moving'; countyLabel='Traverse County, MN'; franchise=$false; topSpecialties="['Residential']" }
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
Write-Host 'Generated 240 catalog entries, 24 metro pools for Minnesota batch 4 (FINAL)'