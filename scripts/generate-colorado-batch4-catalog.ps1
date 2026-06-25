$outDir = Join-Path $PSScriptRoot 'colorado-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='saguache'; city='Saguache'; citySlug='saguache'; label='Saguache Metro'; poolId='saguache-metro-co'; regional1='saguache-corridor'; regional2='san-luis-central'; topId='regional-saguache-co-movers'; topName='Regional Saguache / Saguache County Providers'; topDesc='Reliable movers serving Saguache County residential needs across Saguache and central San Luis Valley communities.'; countyMovingName='Saguache County Moving'; regional1Name='Saguache Corridor Moving'; regional2Name='San Luis Central Moving'; countyLabel='Saguache County' },
  @{ slug='rio-blanco'; city='Meeker'; citySlug='meeker'; label='Meeker Metro'; poolId='rio-blanco-metro-co'; regional1='meeker-corridor'; regional2='white-river-valley'; topId='regional-rioblanco-co-movers'; topName='Regional Meeker / Rio Blanco Providers'; topDesc='Reliable movers serving Rio Blanco County residential needs across Meeker and northwestern Colorado rural communities.'; countyMovingName='Rio Blanco County Moving'; regional1Name='Meeker Corridor Moving'; regional2Name='White River Valley Moving'; countyLabel='Rio Blanco County' },
  @{ slug='gilpin'; city='Central City'; citySlug='central-city'; label='Central City Metro'; poolId='gilpin-metro-co'; regional1='central-city-corridor'; regional2='gambling-district'; topId='regional-gilpin-co-movers'; topName='Regional Central City / Gilpin Providers'; topDesc='Reliable movers serving Gilpin County residential needs across Central City and mountain gaming corridor communities.'; countyMovingName='Gilpin County Moving'; regional1Name='Central City Corridor Moving'; regional2Name='Gambling District Moving'; countyLabel='Gilpin County' },
  @{ slug='crowley'; city='Ordway'; citySlug='ordway'; label='Ordway Metro'; poolId='crowley-metro-co'; regional1='ordway-corridor'; regional2='arkansas-valley-east'; topId='regional-crowley-co-movers'; topName='Regional Ordway / Crowley Providers'; topDesc='Reliable movers serving Crowley County residential needs across Ordway and eastern Arkansas Valley communities.'; countyMovingName='Crowley County Moving'; regional1Name='Ordway Corridor Moving'; regional2Name='Arkansas Valley East Moving'; countyLabel='Crowley County' },
  @{ slug='lincoln'; city='Hugo'; citySlug='hugo'; label='Hugo Metro'; poolId='lincoln-metro-co'; regional1='hugo-corridor'; regional2='eastern-i-70'; topId='regional-lincoln-co-movers'; topName='Regional Hugo / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Hugo and eastern Colorado I-70 corridor communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Hugo Corridor Moving'; regional2Name='Eastern I-70 Moving'; countyLabel='Lincoln County, CO' },
  @{ slug='bent'; city='Las Animas'; citySlug='las-animas'; label='Las Animas Metro'; poolId='bent-metro-co'; regional1='las-animas-corridor'; regional2='arkansas-valley-south'; topId='regional-bent-co-movers'; topName='Regional Las Animas / Bent Providers'; topDesc='Reliable movers serving Bent County residential needs across Las Animas and southeastern plains communities.'; countyMovingName='Bent County Moving'; regional1Name='Las Animas Corridor Moving'; regional2Name='Arkansas Valley South Moving'; countyLabel='Bent County, CO' },
  @{ slug='custer'; city='Westcliffe'; citySlug='westcliffe'; label='Westcliffe Metro'; poolId='custer-metro-co'; regional1='westcliffe-corridor'; regional2='wet-mountain-valley'; topId='regional-custer-co-movers'; topName='Regional Westcliffe / Custer Providers'; topDesc='Reliable movers serving Custer County residential needs across Westcliffe and Wet Mountain Valley communities.'; countyMovingName='Custer County Moving'; regional1Name='Westcliffe Corridor Moving'; regional2Name='Wet Mountain Valley Moving'; countyLabel='Custer County, CO' },
  @{ slug='ouray'; city='Ouray'; citySlug='ouray'; label='Ouray Metro'; poolId='ouray-metro-co'; regional1='ouray-corridor'; regional2='million-dollar-highway'; topId='regional-ouray-co-movers'; topName='Regional Ouray / Ouray County Providers'; topDesc='Reliable movers serving Ouray County residential needs across Ouray and southwestern mountain resort communities.'; countyMovingName='Ouray County Moving'; regional1Name='Ouray Corridor Moving'; regional2Name='Million Dollar Highway Moving'; countyLabel='Ouray County' },
  @{ slug='washington'; city='Akron'; citySlug='akron'; label='Akron Metro'; poolId='washington-metro-co'; regional1='akron-corridor'; regional2='eastern-plains-northeast'; topId='regional-washington-co-movers'; topName='Regional Akron / Washington Providers'; topDesc='Reliable movers serving Washington County residential needs across Akron and northeastern plains communities.'; countyMovingName='Washington County Moving'; regional1Name='Akron Corridor Moving'; regional2Name='Eastern Plains Northeast Moving'; countyLabel='Washington County, CO' },
  @{ slug='phillips'; city='Holyoke'; citySlug='holyoke'; label='Holyoke Metro'; poolId='phillips-metro-co'; regional1='holyoke-corridor'; regional2='eastern-plains-border'; topId='regional-phillips-co-movers'; topName='Regional Holyoke / Phillips Providers'; topDesc='Reliable movers serving Phillips County residential needs across Holyoke and northeastern Colorado border communities.'; countyMovingName='Phillips County Moving'; regional1Name='Holyoke Corridor Moving'; regional2Name='Eastern Plains Border Moving'; countyLabel='Phillips County' },
  @{ slug='costilla'; city='San Luis'; citySlug='san-luis'; label='San Luis Metro'; poolId='costilla-metro-co'; regional1='san-luis-corridor'; regional2='culebra-range'; topId='regional-costilla-co-movers'; topName='Regional San Luis / Costilla Providers'; topDesc='Reliable movers serving Costilla County residential needs across San Luis and southern San Luis Valley communities.'; countyMovingName='Costilla County Moving'; regional1Name='San Luis Corridor Moving'; regional2Name='Culebra Range Moving'; countyLabel='Costilla County' },
  @{ slug='baca'; city='Springfield'; citySlug='springfield'; label='Springfield Metro'; poolId='baca-metro-co'; regional1='springfield-corridor'; regional2='southeast-corner'; topId='regional-baca-co-movers'; topName='Regional Springfield / Baca Providers'; topDesc='Reliable movers serving Baca County residential needs across Springfield and southeastern Colorado corner communities.'; countyMovingName='Baca County Moving'; regional1Name='Springfield Corridor Moving'; regional2Name='Southeast Corner Moving'; countyLabel='Baca County' },
  @{ slug='dolores'; city='Dove Creek'; citySlug='dove-creek'; label='Dove Creek Metro'; poolId='dolores-metro-co'; regional1='dove-creek-corridor'; regional2='four-corners-west'; topId='regional-dolores-co-movers'; topName='Regional Dove Creek / Dolores Providers'; topDesc='Reliable movers serving Dolores County residential needs across Dove Creek and southwestern Colorado rural communities.'; countyMovingName='Dolores County Moving'; regional1Name='Dove Creek Corridor Moving'; regional2Name='Four Corners West Moving'; countyLabel='Dolores County' },
  @{ slug='sedgwick'; city='Julesburg'; citySlug='julesburg'; label='Julesburg Metro'; poolId='sedgwick-metro-co'; regional1='julesburg-corridor'; regional2='nebraska-border'; topId='regional-sedgwick-co-movers'; topName='Regional Julesburg / Sedgwick Providers'; topDesc='Reliable movers serving Sedgwick County residential needs across Julesburg and northeastern border corridor communities.'; countyMovingName='Sedgwick County Moving'; regional1Name='Julesburg Corridor Moving'; regional2Name='Nebraska Border Moving'; countyLabel='Sedgwick County' },
  @{ slug='cheyenne'; city='Cheyenne Wells'; citySlug='cheyenne-wells'; label='Cheyenne Wells Metro'; poolId='cheyenne-metro-co'; regional1='cheyenne-wells-corridor'; regional2='eastern-plains-southeast'; topId='regional-cheyenne-co-movers'; topName='Regional Cheyenne Wells / Cheyenne Providers'; topDesc='Reliable movers serving Cheyenne County residential needs across Cheyenne Wells and eastern plains southeast communities.'; countyMovingName='Cheyenne County Moving'; regional1Name='Cheyenne Wells Corridor Moving'; regional2Name='Eastern Plains Southeast Moving'; countyLabel='Cheyenne County, CO' },
  @{ slug='kiowa'; city='Eads'; citySlug='eads'; label='Eads Metro'; poolId='kiowa-metro-co'; regional1='eads-corridor'; regional2='high-plains-east'; topId='regional-kiowa-co-movers'; topName='Regional Eads / Kiowa Providers'; topDesc='Reliable movers serving Kiowa County residential needs across Eads and eastern high plains communities.'; countyMovingName='Kiowa County Moving'; regional1Name='Eads Corridor Moving'; regional2Name='High Plains East Moving'; countyLabel='Kiowa County, CO' },
  @{ slug='jackson'; city='Walden'; citySlug='walden'; label='Walden Metro'; poolId='jackson-metro-co'; regional1='walden-corridor'; regional2='north-park'; topId='regional-jackson-co-movers'; topName='Regional Walden / Jackson Providers'; topDesc='Reliable movers serving Jackson County residential needs across Walden and North Park mountain communities.'; countyMovingName='Jackson County Moving'; regional1Name='Walden Corridor Moving'; regional2Name='North Park Moving'; countyLabel='Jackson County, CO' },
  @{ slug='mineral'; city='Creede'; citySlug='creede'; label='Creede Metro'; poolId='mineral-metro-co'; regional1='creede-corridor'; regional2='san-juan-north'; topId='regional-mineral-co-movers'; topName='Regional Creede / Mineral Providers'; topDesc='Reliable movers serving Mineral County residential needs across Creede and high-mountain San Juan communities.'; countyMovingName='Mineral County Moving'; regional1Name='Creede Corridor Moving'; regional2Name='San Juan North Moving'; countyLabel='Mineral County, CO' },
  @{ slug='san-juan'; city='Silverton'; citySlug='silverton'; label='Silverton Metro'; poolId='san-juan-metro-co'; regional1='silverton-corridor'; regional2='san-juan-alpine'; topId='regional-sanjuan-co-movers'; topName='Regional Silverton / San Juan Providers'; topDesc='Reliable movers serving San Juan County residential needs across Silverton and high-alpine San Juan communities.'; countyMovingName='San Juan County Moving'; regional1Name='Silverton Corridor Moving'; regional2Name='San Juan Alpine Moving'; countyLabel='San Juan County, CO' },
  @{ slug='hinsdale'; city='Lake City'; citySlug='lake-city'; label='Lake City Metro'; poolId='hinsdale-metro-co'; regional1='lake-city-corridor'; regional2='remote-san-juan'; topId='regional-hinsdale-co-movers'; topName='Regional Lake City / Hinsdale Providers'; topDesc='Reliable movers serving Hinsdale County residential needs across Lake City and remote San Juan mountain communities.'; countyMovingName='Hinsdale County Moving'; regional1Name='Lake City Corridor Moving'; regional2Name='Remote San Juan Moving'; countyLabel='Hinsdale County' }
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
Write-Host 'Generated 200 catalog entries, 20 metro pools for Colorado batch 4'