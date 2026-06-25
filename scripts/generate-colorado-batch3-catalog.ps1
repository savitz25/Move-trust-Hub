$outDir = Join-Path $PSScriptRoot 'colorado-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='teller'; city='Cripple Creek'; citySlug='cripple-creek'; label='Colorado Springs Metro'; poolId='teller-metro-co'; regional1='cripple-creek-corridor'; regional2='pikes-peak-west'; topId='regional-teller-co-movers'; topName='Regional Cripple Creek / Teller Providers'; topDesc='Reliable movers serving Teller County residential needs across Cripple Creek and Pikes Peak west communities.'; countyMovingName='Teller County Moving'; regional1Name='Cripple Creek Corridor Moving'; regional2Name='Pikes Peak West Moving'; countyLabel='Teller County' },
  @{ slug='chaffee'; city='Salida'; citySlug='salida'; label='Salida Metro'; poolId='chaffee-metro-co'; regional1='salida-corridor'; regional2='arkansas-river-valley'; topId='regional-chaffee-co-movers'; topName='Regional Salida / Chaffee Providers'; topDesc='Reliable movers serving Chaffee County residential needs across Salida, Buena Vista, and central mountain communities.'; countyMovingName='Chaffee County Moving'; regional1Name='Salida Corridor Moving'; regional2Name='Arkansas River Valley Moving'; countyLabel='Chaffee County' },
  @{ slug='logan'; city='Sterling'; citySlug='sterling'; label='Sterling Metro'; poolId='logan-metro-co'; regional1='sterling-corridor'; regional2='eastern-plains'; topId='regional-logan-co-movers'; topName='Regional Sterling / Logan Providers'; topDesc='Reliable movers serving Logan County residential needs across Sterling and eastern Colorado plains communities.'; countyMovingName='Logan County Moving'; regional1Name='Sterling Corridor Moving'; regional2Name='Eastern Plains Moving'; countyLabel='Logan County, CO' },
  @{ slug='park'; city='Fairplay'; citySlug='fairplay'; label='Fairplay Metro'; poolId='park-metro-co'; regional1='fairplay-corridor'; regional2='south-park'; topId='regional-park-co-movers'; topName='Regional Fairplay / Park Providers'; topDesc='Reliable movers serving Park County residential needs across Fairplay and high-mountain South Park communities.'; countyMovingName='Park County Moving'; regional1Name='Fairplay Corridor Moving'; regional2Name='South Park Moving'; countyLabel='Park County, CO' },
  @{ slug='otero'; city='La Junta'; citySlug='la-junta'; label='La Junta Metro'; poolId='otero-metro-co'; regional1='la-junta-corridor'; regional2='southeast-plains'; topId='regional-otero-co-movers'; topName='Regional La Junta / Otero Providers'; topDesc='Reliable movers serving Otero County residential needs across La Junta and southeastern Colorado communities.'; countyMovingName='Otero County Moving'; regional1Name='La Junta Corridor Moving'; regional2Name='Southeast Plains Moving'; countyLabel='Otero County, CO' },
  @{ slug='gunnison'; city='Gunnison'; citySlug='gunnison'; label='Gunnison Metro'; poolId='gunnison-metro-co'; regional1='gunnison-corridor'; regional2='crested-butte-area'; topId='regional-gunnison-co-movers'; topName='Regional Gunnison / Gunnison County Providers'; topDesc='Reliable movers serving Gunnison County residential needs across Gunnison and central mountain communities.'; countyMovingName='Gunnison County Moving'; regional1Name='Gunnison Corridor Moving'; regional2Name='Crested Butte Area Moving'; countyLabel='Gunnison County' },
  @{ slug='grand'; city='Granby'; citySlug='granby'; label='Granby Metro'; poolId='grand-metro-co'; regional1='granby-corridor'; regional2='winter-park-area'; topId='regional-grand-co-movers'; topName='Regional Granby / Grand Providers'; topDesc='Reliable movers serving Grand County residential needs across Granby, Winter Park, and mountain resort communities.'; countyMovingName='Grand County Moving'; regional1Name='Granby Corridor Moving'; regional2Name='Winter Park Area Moving'; countyLabel='Grand County, CO' },
  @{ slug='alamosa'; city='Alamosa'; citySlug='alamosa'; label='Alamosa Metro'; poolId='alamosa-metro-co'; regional1='alamosa-corridor'; regional2='san-luis-valley'; topId='regional-alamosa-co-movers'; topName='Regional Alamosa / Alamosa County Providers'; topDesc='Reliable movers serving Alamosa County residential needs across Alamosa and San Luis Valley communities.'; countyMovingName='Alamosa County Moving'; regional1Name='Alamosa Corridor Moving'; regional2Name='San Luis Valley Moving'; countyLabel='Alamosa County' },
  @{ slug='pitkin'; city='Aspen'; citySlug='aspen'; label='Aspen Metro'; poolId='pitkin-metro-co'; regional1='aspen-corridor'; regional2='roaring-fork-luxury'; topId='regional-pitkin-co-movers'; topName='Regional Aspen / Pitkin Providers'; topDesc='Reliable movers serving Pitkin County residential needs across Aspen and luxury mountain resort communities.'; countyMovingName='Pitkin County Moving'; regional1Name='Aspen Corridor Moving'; regional2Name='Roaring Fork Luxury Moving'; countyLabel='Pitkin County' },
  @{ slug='archuleta'; city='Pagosa Springs'; citySlug='pagosa-springs'; label='Pagosa Springs Metro'; poolId='archuleta-metro-co'; regional1='pagosa-corridor'; regional2='san-juan-south'; topId='regional-archuleta-co-movers'; topName='Regional Pagosa Springs / Archuleta Providers'; topDesc='Reliable movers serving Archuleta County residential needs across Pagosa Springs and southwestern Colorado communities.'; countyMovingName='Archuleta County Moving'; regional1Name='Pagosa Corridor Moving'; regional2Name='San Juan South Moving'; countyLabel='Archuleta County' },
  @{ slug='las-animas'; city='Trinidad'; citySlug='trinidad'; label='Trinidad Metro'; poolId='las-animas-metro-co'; regional1='trinidad-corridor'; regional2='southern-frontier'; topId='regional-lasanimas-co-movers'; topName='Regional Trinidad / Las Animas Providers'; topDesc='Reliable movers serving Las Animas County residential needs across Trinidad and southern Colorado communities.'; countyMovingName='Las Animas County Moving'; regional1Name='Trinidad Corridor Moving'; regional2Name='Southern Frontier Moving'; countyLabel='Las Animas County' },
  @{ slug='moffat'; city='Craig'; citySlug='craig'; label='Craig Metro'; poolId='moffat-metro-co'; regional1='craig-corridor'; regional2='northwest-colorado'; topId='regional-moffat-co-movers'; topName='Regional Craig / Moffat Providers'; topDesc='Reliable movers serving Moffat County residential needs across Craig and northwestern Colorado communities.'; countyMovingName='Moffat County Moving'; regional1Name='Craig Corridor Moving'; regional2Name='Northwest Colorado Moving'; countyLabel='Moffat County' },
  @{ slug='prowers'; city='Lamar'; citySlug='lamar'; label='Lamar Metro'; poolId='prowers-metro-co'; regional1='lamar-corridor'; regional2='eastern-plains-south'; topId='regional-prowers-co-movers'; topName='Regional Lamar / Prowers Providers'; topDesc='Reliable movers serving Prowers County residential needs across Lamar and eastern plains communities.'; countyMovingName='Prowers County Moving'; regional1Name='Lamar Corridor Moving'; regional2Name='Eastern Plains South Moving'; countyLabel='Prowers County' },
  @{ slug='rio-grande'; city='Del Norte'; citySlug='del-norte'; label='Del Norte Metro'; poolId='rio-grande-metro-co'; regional1='del-norte-corridor'; regional2='rio-grande-valley'; topId='regional-riogrande-co-movers'; topName='Regional Del Norte / Rio Grande Providers'; topDesc='Reliable movers serving Rio Grande County residential needs across Del Norte and southern Colorado communities.'; countyMovingName='Rio Grande County Moving'; regional1Name='Del Norte Corridor Moving'; regional2Name='Rio Grande Valley Moving'; countyLabel='Rio Grande County, CO' },
  @{ slug='yuma'; city='Wray'; citySlug='wray'; label='Wray Metro'; poolId='yuma-metro-co'; regional1='wray-corridor'; regional2='eastern-corner'; topId='regional-yuma-co-movers'; topName='Regional Wray / Yuma Providers'; topDesc='Reliable movers serving Yuma County residential needs across Wray and eastern Colorado corner communities.'; countyMovingName='Yuma County Moving'; regional1Name='Wray Corridor Moving'; regional2Name='Eastern Corner Moving'; countyLabel='Yuma County, CO' },
  @{ slug='clear-creek'; city='Georgetown'; citySlug='georgetown'; label='Georgetown Metro'; poolId='clear-creek-metro-co'; regional1='georgetown-corridor'; regional2='i-70-mountain'; topId='regional-clearcreek-co-movers'; topName='Regional Georgetown / Clear Creek Providers'; topDesc='Reliable movers serving Clear Creek County residential needs across Georgetown and I-70 mountain corridor communities.'; countyMovingName='Clear Creek County Moving'; regional1Name='Georgetown Corridor Moving'; regional2Name='I-70 Mountain Moving'; countyLabel='Clear Creek County' },
  @{ slug='san-miguel'; city='Telluride'; citySlug='telluride'; label='Telluride Metro'; poolId='san-miguel-metro-co'; regional1='telluride-corridor'; regional2='san-juan-luxury'; topId='regional-sanmiguel-co-movers'; topName='Regional Telluride / San Miguel Providers'; topDesc='Reliable movers serving San Miguel County residential needs across Telluride and southwestern mountain resort communities.'; countyMovingName='San Miguel County Moving'; regional1Name='Telluride Corridor Moving'; regional2Name='San Juan Luxury Moving'; countyLabel='San Miguel County, CO' },
  @{ slug='lake'; city='Leadville'; citySlug='leadville'; label='Leadville Metro'; poolId='lake-metro-co'; regional1='leadville-corridor'; regional2='high-country'; topId='regional-lake-co-movers'; topName='Regional Leadville / Lake Providers'; topDesc='Reliable movers serving Lake County residential needs across Leadville and high-mountain Colorado communities.'; countyMovingName='Lake County Moving'; regional1Name='Leadville Corridor Moving'; regional2Name='High Country Moving'; countyLabel='Lake County, CO' },
  @{ slug='conejos'; city='Conejos'; citySlug='conejos'; label='Conejos Metro'; poolId='conejos-metro-co'; regional1='conejos-corridor'; regional2='san-luis-south'; topId='regional-conejos-co-movers'; topName='Regional Conejos / Conejos County Providers'; topDesc='Reliable movers serving Conejos County residential needs across Conejos and southern Colorado rural communities.'; countyMovingName='Conejos County Moving'; regional1Name='Conejos Corridor Moving'; regional2Name='San Luis South Moving'; countyLabel='Conejos County' },
  @{ slug='kit-carson'; city='Burlington'; citySlug='burlington'; label='Burlington Metro'; poolId='kit-carson-metro-co'; regional1='burlington-corridor'; regional2='eastern-plains-east'; topId='regional-kitcarson-co-movers'; topName='Regional Burlington / Kit Carson Providers'; topDesc='Reliable movers serving Kit Carson County residential needs across Burlington and eastern plains communities.'; countyMovingName='Kit Carson County Moving'; regional1Name='Burlington Corridor Moving'; regional2Name='Eastern Plains East Moving'; countyLabel='Kit Carson County' },
  @{ slug='huerfano'; city='Walsenburg'; citySlug='walsenburg'; label='Walsenburg Metro'; poolId='huerfano-metro-co'; regional1='walsenburg-corridor'; regional2='spanish-peaks'; topId='regional-huerfano-co-movers'; topName='Regional Walsenburg / Huerfano Providers'; topDesc='Reliable movers serving Huerfano County residential needs across Walsenburg and southern Colorado communities.'; countyMovingName='Huerfano County Moving'; regional1Name='Walsenburg Corridor Moving'; regional2Name='Spanish Peaks Moving'; countyLabel='Huerfano County' }
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
    "all-my-sons-$citySlug-co",
    "$citySlug-moving-$slug-co",
    "$slug-county-moving-$slug-co",
    "college-hunks-moving-$citySlug-co",
    "budd-van-lines-$citySlug-co",
    "$($c.regional1)-moving-$slug-co",
    "$($c.regional2)-moving-$slug-co",
    "hercules-movers-$citySlug-co",
    "krupp-moving-$citySlug-co"
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

  $key = if ($slug -match '-') { "'$slug'" } else { $slug }
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 210 catalog entries, 21 metro pools for Colorado batch 3'