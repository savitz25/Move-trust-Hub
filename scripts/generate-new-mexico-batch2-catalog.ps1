$outDir = Join-Path $PSScriptRoot 'new-mexico-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='curry'; city='Clovis'; citySlug='clovis'; label='Clovis Metro'; poolId='curry-metro-nm'; regional1='clovis-corridor'; regional2='high-plains'; topId='regional-curry-nm-movers'; topName='Regional Clovis / Curry Providers'; topDesc='Reliable movers serving Curry County residential needs across Clovis and eastern New Mexico high-plains communities.'; countyMovingName='Curry County Moving'; regional1Name='Clovis Corridor Moving'; regional2Name='High Plains Moving'; countyLabel='Curry County' },
  @{ slug='rio-arriba'; city='Espanola'; citySlug='espanola'; label='Espanola Metro'; poolId='rio-arriba-metro-nm'; regional1='espanola-corridor'; regional2='northern-valley'; topId='regional-rioarriba-nm-movers'; topName='Regional Espanola / Rio Arriba Providers'; topDesc='Reliable movers serving Rio Arriba County residential needs across Espanola and northern New Mexico valley communities.'; countyMovingName='Rio Arriba County Moving'; regional1Name='Espanola Corridor Moving'; regional2Name='Northern Valley Moving'; countyLabel='Rio Arriba County' },
  @{ slug='taos'; city='Taos'; citySlug='taos'; label='Taos Metro'; poolId='taos-metro-nm'; regional1='taos-corridor'; regional2='ski-valley'; topId='regional-taos-nm-movers'; topName='Regional Taos / Taos County Providers'; topDesc='Reliable movers serving Taos County residential needs across Taos and northern New Mexico ski-valley communities.'; countyMovingName='Taos County Moving'; regional1Name='Taos Corridor Moving'; regional2Name='Ski Valley Moving'; countyLabel='Taos County' },
  @{ slug='grant'; city='Silver City'; citySlug='silver-city'; label='Silver City Metro'; poolId='grant-metro-nm'; regional1='silver-city-corridor'; regional2='gila-edge'; topId='regional-grant-nm-movers'; topName='Regional Silver City / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Silver City and southwestern New Mexico communities.'; countyMovingName='Grant County Moving'; regional1Name='Silver City Corridor Moving'; regional2Name='Gila Edge Moving'; countyLabel='Grant County, NM' },
  @{ slug='cibola'; city='Grants'; citySlug='grants'; label='Grants Metro'; poolId='cibola-metro-nm'; regional1='grants-corridor'; regional2='mt-taylor'; topId='regional-cibola-nm-movers'; topName='Regional Grants / Cibola Providers'; topDesc='Reliable movers serving Cibola County residential needs across Grants and western New Mexico communities.'; countyMovingName='Cibola County Moving'; regional1Name='Grants Corridor Moving'; regional2Name='Mt. Taylor Moving'; countyLabel='Cibola County' },
  @{ slug='san-miguel'; city='Las Vegas'; citySlug='las-vegas'; label='Las Vegas Metro'; poolId='san-miguel-metro-nm'; regional1='las-vegas-corridor'; regional2='sangre-de-cristo'; topId='regional-sanmiguel-nm-movers'; topName='Regional Las Vegas / San Miguel Providers'; topDesc='Reliable movers serving San Miguel County residential needs across Las Vegas and northeastern New Mexico communities.'; countyMovingName='San Miguel County Moving'; regional1Name='Las Vegas Corridor Moving'; regional2Name='Sangre de Cristo Moving'; countyLabel='San Miguel County, NM' },
  @{ slug='luna'; city='Deming'; citySlug='deming'; label='Deming Metro'; poolId='luna-metro-nm'; regional1='deming-corridor'; regional2='border-southwest'; topId='regional-luna-nm-movers'; topName='Regional Deming / Luna Providers'; topDesc='Reliable movers serving Luna County residential needs across Deming and southwestern New Mexico border communities.'; countyMovingName='Luna County Moving'; regional1Name='Deming Corridor Moving'; regional2Name='Border Southwest Moving'; countyLabel='Luna County' },
  @{ slug='lincoln'; city='Ruidoso'; citySlug='ruidoso'; label='Ruidoso Metro'; poolId='lincoln-metro-nm'; regional1='ruidoso-corridor'; regional2='sacramento-mountains'; topId='regional-lincoln-nm-movers'; topName='Regional Ruidoso / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Ruidoso and southern New Mexico mountain communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Ruidoso Corridor Moving'; regional2Name='Sacramento Mountains Moving'; countyLabel='Lincoln County, NM' },
  @{ slug='los-alamos'; city='Los Alamos'; citySlug='los-alamos'; label='Los Alamos Metro'; poolId='los-alamos-metro-nm'; regional1='los-alamos-corridor'; regional2='pajarito-plateau'; topId='regional-losalamos-nm-movers'; topName='Regional Los Alamos / Los Alamos County Providers'; topDesc='Reliable movers serving Los Alamos County residential needs across Los Alamos National Laboratory and northern New Mexico communities.'; countyMovingName='Los Alamos County Moving'; regional1Name='Los Alamos Corridor Moving'; regional2Name='Pajarito Plateau Moving'; countyLabel='Los Alamos County' },
  @{ slug='roosevelt'; city='Portales'; citySlug='portales'; label='Portales Metro'; poolId='roosevelt-metro-nm'; regional1='portales-corridor'; regional2='eastern-plains'; topId='regional-roosevelt-nm-movers'; topName='Regional Portales / Roosevelt Providers'; topDesc='Reliable movers serving Roosevelt County residential needs across Portales and eastern New Mexico plains communities.'; countyMovingName='Roosevelt County Moving'; regional1Name='Portales Corridor Moving'; regional2Name='Eastern Plains Moving'; countyLabel='Roosevelt County' },
  @{ slug='torrance'; city='Estancia'; citySlug='estancia'; label='Estancia Metro'; poolId='torrance-metro-nm'; regional1='estancia-corridor'; regional2='central-valley'; topId='regional-torrance-nm-movers'; topName='Regional Estancia / Torrance Providers'; topDesc='Reliable movers serving Torrance County residential needs across Estancia and central New Mexico communities.'; countyMovingName='Torrance County Moving'; regional1Name='Estancia Corridor Moving'; regional2Name='Central Valley Moving'; countyLabel='Torrance County' },
  @{ slug='socorro'; city='Socorro'; citySlug='socorro'; label='Socorro Metro'; poolId='socorro-metro-nm'; regional1='socorro-corridor'; regional2='rio-grande'; topId='regional-socorro-nm-movers'; topName='Regional Socorro / Socorro County Providers'; topDesc='Reliable movers serving Socorro County residential needs across Socorro and central New Mexico Rio Grande corridor communities.'; countyMovingName='Socorro County Moving'; regional1Name='Socorro Corridor Moving'; regional2Name='Rio Grande Moving'; countyLabel='Socorro County' },
  @{ slug='colfax'; city='Raton'; citySlug='raton'; label='Raton Metro'; poolId='colfax-metro-nm'; regional1='raton-corridor'; regional2='northeast-plateau'; topId='regional-colfax-nm-movers'; topName='Regional Raton / Colfax Providers'; topDesc='Reliable movers serving Colfax County residential needs across Raton and northeastern New Mexico plateau communities.'; countyMovingName='Colfax County Moving'; regional1Name='Raton Corridor Moving'; regional2Name='Northeast Plateau Moving'; countyLabel='Colfax County' },
  @{ slug='sierra'; city='Truth or Consequences'; citySlug='truth-or-consequences'; label='Truth or Consequences Metro'; poolId='sierra-metro-nm'; regional1='truth-or-consequences-corridor'; regional2='rio-grande-south'; topId='regional-sierra-nm-movers'; topName='Regional Truth or Consequences / Sierra Providers'; topDesc='Reliable movers serving Sierra County residential needs across Truth or Consequences and southern New Mexico Rio Grande communities.'; countyMovingName='Sierra County Moving'; regional1Name='Truth or Consequences Corridor Moving'; regional2Name='Rio Grande South Moving'; countyLabel='Sierra County, NM' },
  @{ slug='quay'; city='Tucumcari'; citySlug='tucumcari'; label='Tucumcari Metro'; poolId='quay-metro-nm'; regional1='tucumcari-corridor'; regional2='route-66-east'; topId='regional-quay-nm-movers'; topName='Regional Tucumcari / Quay Providers'; topDesc='Reliable movers serving Quay County residential needs across Tucumcari and eastern New Mexico Route 66 corridor communities.'; countyMovingName='Quay County Moving'; regional1Name='Tucumcari Corridor Moving'; regional2Name='Route 66 East Moving'; countyLabel='Quay County' },
  @{ slug='guadalupe'; city='Santa Rosa'; citySlug='santa-rosa'; label='Santa Rosa Metro'; poolId='guadalupe-metro-nm'; regional1='santa-rosa-corridor'; regional2='eastern-corridor'; topId='regional-guadalupe-nm-movers'; topName='Regional Santa Rosa / Guadalupe Providers'; topDesc='Reliable movers serving Guadalupe County residential needs across Santa Rosa and eastern New Mexico corridor communities.'; countyMovingName='Guadalupe County Moving'; regional1Name='Santa Rosa Corridor Moving'; regional2Name='Eastern Corridor Moving'; countyLabel='Guadalupe County, NM' },
  @{ slug='mora'; city='Mora'; citySlug='mora'; label='Mora Metro'; poolId='mora-metro-nm'; regional1='mora-corridor'; regional2='sangre-north'; topId='regional-mora-nm-movers'; topName='Regional Mora / Mora County Providers'; topDesc='Reliable movers serving Mora County residential needs across Mora and northern New Mexico rural communities.'; countyMovingName='Mora County Moving'; regional1Name='Mora Corridor Moving'; regional2Name='Sangre North Moving'; countyLabel='Mora County' },
  @{ slug='hidalgo'; city='Lordsburg'; citySlug='lordsburg'; label='Lordsburg Metro'; poolId='hidalgo-metro-nm'; regional1='lordsburg-corridor'; regional2='border-south'; topId='regional-hidalgo-nm-movers'; topName='Regional Lordsburg / Hidalgo Providers'; topDesc='Reliable movers serving Hidalgo County residential needs across Lordsburg and southwestern New Mexico border communities.'; countyMovingName='Hidalgo County Moving'; regional1Name='Lordsburg Corridor Moving'; regional2Name='Border South Moving'; countyLabel='Hidalgo County, NM' },
  @{ slug='catron'; city='Reserve'; citySlug='reserve'; label='Reserve Metro'; poolId='catron-metro-nm'; regional1='reserve-corridor'; regional2='gila-wilderness'; topId='regional-catron-nm-movers'; topName='Regional Reserve / Catron Providers'; topDesc='Reliable movers serving Catron County residential needs across Reserve and remote southwestern New Mexico communities.'; countyMovingName='Catron County Moving'; regional1Name='Reserve Corridor Moving'; regional2Name='Gila Wilderness Moving'; countyLabel='Catron County' },
  @{ slug='union'; city='Clayton'; citySlug='clayton'; label='Clayton Metro'; poolId='union-metro-nm'; regional1='clayton-corridor'; regional2='northeast-corner'; topId='regional-union-nm-movers'; topName='Regional Clayton / Union Providers'; topDesc='Reliable movers serving Union County residential needs across Clayton and northeastern New Mexico corner communities.'; countyMovingName='Union County Moving'; regional1Name='Clayton Corridor Moving'; regional2Name='Northeast Corner Moving'; countyLabel='Union County, NM' },
  @{ slug='de-baca'; city='Fort Sumner'; citySlug='fort-sumner'; label='Fort Sumner Metro'; poolId='de-baca-metro-nm'; regional1='fort-sumner-corridor'; regional2='eastern-plateau'; topId='regional-debaca-nm-movers'; topName='Regional Fort Sumner / De Baca Providers'; topDesc='Reliable movers serving De Baca County residential needs across Fort Sumner and rural eastern New Mexico communities.'; countyMovingName='De Baca County Moving'; regional1Name='Fort Sumner Corridor Moving'; regional2Name='Eastern Plateau Moving'; countyLabel='De Baca County' },
  @{ slug='harding'; city='Roy'; citySlug='roy'; label='Roy Metro'; poolId='harding-metro-nm'; regional1='roy-corridor'; regional2='northeast-ranch'; topId='regional-harding-nm-movers'; topName='Regional Roy / Harding Providers'; topDesc='Reliable movers serving Harding County residential needs across Roy and remote northeastern New Mexico ranch communities.'; countyMovingName='Harding County Moving'; regional1Name='Roy Corridor Moving'; regional2Name='Northeast Ranch Moving'; countyLabel='Harding County' }
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
    "all-my-sons-$citySlug-nm",
    "$citySlug-moving-$slug-nm",
    "$slug-county-moving-$slug-nm",
    "college-hunks-moving-$citySlug-nm",
    "budd-van-lines-$citySlug-nm",
    "$($c.regional1)-moving-$slug-nm",
    "$($c.regional2)-moving-$slug-nm",
    "hercules-movers-$citySlug-nm",
    "krupp-moving-$citySlug-nm"
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
Write-Host 'Generated 220 catalog entries, 22 metro pools for New Mexico batch 2'