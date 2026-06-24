$outDir = Join-Path $PSScriptRoot 'new-mexico-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='bernalillo'; city='Albuquerque'; citySlug='albuquerque'; label='Albuquerque Metro'; poolId='bernalillo-metro-nm'
    regional1='albuquerque-corridor'; regional2='duke-city'
    topId='twomenandatruck-bernalillo-nm'; topName='Two Men and a Truck Albuquerque'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban residential and commercial moves across Bernalillo County.'
    countyMovingName='Bernalillo County Moving'; regional1Name='Albuquerque Corridor Moving'; regional2Name='Duke City Moving'
    countyLabel='Bernalillo County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='doa-ana'; city='Las Cruces'; citySlug='las-cruces'; label='Las Cruces Metro'; poolId='doa-ana-metro-nm'
    regional1='las-cruces-corridor'; regional2='mesilla-valley'
    topId='regional-donaana-nm-movers'; topName='Regional Las Cruces / Doña Ana Providers'
    topDesc='Reliable movers serving Doña Ana County residential needs across Las Cruces and southern New Mexico border communities.'
    countyMovingName='Doña Ana County Moving'; regional1Name='Las Cruces Corridor Moving'; regional2Name='Mesilla Valley Moving'
    countyLabel='Doña Ana County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='sandoval'; city='Rio Rancho'; citySlug='rio-rancho'; label='Albuquerque Metro'; poolId='sandoval-metro-nm'
    regional1='rio-rancho-corridor'; regional2='sandoval-valley'
    topId='regional-sandoval-nm-movers'; topName='Regional Rio Rancho / Sandoval Providers'
    topDesc='Reliable movers serving Sandoval County residential needs across Rio Rancho, Bernalillo, and fast-growing Albuquerque metro north communities.'
    countyMovingName='Sandoval County Moving'; regional1Name='Rio Rancho Corridor Moving'; regional2Name='Sandoval Valley Moving'
    countyLabel='Sandoval County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='santa-fe'; city='Santa Fe'; citySlug='santa-fe'; label='Santa Fe Metro'; poolId='santa-fe-metro-nm'
    regional1='santa-fe-corridor'; regional2='capital-north'
    topId='regional-santafe-nm-movers'; topName='Regional Santa Fe / Santa Fe County Providers'
    topDesc='Reliable movers serving Santa Fe County residential needs across Santa Fe, the state capital, and northern New Mexico communities.'
    countyMovingName='Santa Fe County Moving'; regional1Name='Santa Fe Corridor Moving'; regional2Name='Capital North Moving'
    countyLabel='Santa Fe County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='san-juan'; city='Farmington'; citySlug='farmington'; label='Farmington Metro'; poolId='san-juan-metro-nm'
    regional1='farmington-corridor'; regional2='four-corners'
    topId='regional-sanjuan-nm-movers'; topName='Regional Farmington / San Juan Providers'
    topDesc='Reliable movers serving San Juan County residential needs across Farmington and northwestern New Mexico Four Corners communities.'
    countyMovingName='San Juan County Moving'; regional1Name='Farmington Corridor Moving'; regional2Name='Four Corners Moving'
    countyLabel='San Juan County, NM'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='valencia'; city='Los Lunas'; citySlug='los-lunas'; label='Albuquerque Metro'; poolId='valencia-metro-nm'
    regional1='los-lunas-corridor'; regional2='valencia-valley'
    topId='regional-valencia-nm-movers'; topName='Regional Los Lunas / Valencia Providers'
    topDesc='Reliable movers serving Valencia County residential needs across Los Lunas and Albuquerque metro south valley communities.'
    countyMovingName='Valencia County Moving'; regional1Name='Los Lunas Corridor Moving'; regional2Name='Valencia Valley Moving'
    countyLabel='Valencia County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='lea'; city='Hobbs'; citySlug='hobbs'; label='Hobbs Metro'; poolId='lea-metro-nm'
    regional1='hobbs-corridor'; regional2='permian-basin'
    topId='regional-lea-nm-movers'; topName='Regional Hobbs / Lea Providers'
    topDesc='Reliable movers serving Lea County residential needs across Hobbs and southeastern New Mexico Permian Basin communities.'
    countyMovingName='Lea County Moving'; regional1Name='Hobbs Corridor Moving'; regional2Name='Permian Basin Moving'
    countyLabel='Lea County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='otero'; city='Alamogordo'; citySlug='alamogordo'; label='Alamogordo Metro'; poolId='otero-metro-nm'
    regional1='alamogordo-corridor'; regional2='white-sands'
    topId='regional-otero-nm-movers'; topName='Regional Alamogordo / Otero Providers'
    topDesc='Reliable movers serving Otero County residential needs across Alamogordo and southern New Mexico high-desert communities.'
    countyMovingName='Otero County Moving'; regional1Name='Alamogordo Corridor Moving'; regional2Name='White Sands Moving'
    countyLabel='Otero County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='mckinley'; city='Gallup'; citySlug='gallup'; label='Gallup Metro'; poolId='mckinley-metro-nm'
    regional1='gallup-corridor'; regional2='route-66-west'
    topId='regional-mckinley-nm-movers'; topName='Regional Gallup / McKinley Providers'
    topDesc='Reliable movers serving McKinley County residential needs across Gallup and northwestern New Mexico Route 66 corridor communities.'
    countyMovingName='McKinley County Moving'; regional1Name='Gallup Corridor Moving'; regional2Name='Route 66 West Moving'
    countyLabel='McKinley County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='eddy'; city='Carlsbad'; citySlug='carlsbad'; label='Carlsbad Metro'; poolId='eddy-metro-nm'
    regional1='carlsbad-corridor'; regional2='cavern-country'
    topId='regional-eddy-nm-movers'; topName='Regional Carlsbad / Eddy Providers'
    topDesc='Reliable movers serving Eddy County residential needs across Carlsbad and southeastern New Mexico energy-corridor communities.'
    countyMovingName='Eddy County Moving'; regional1Name='Carlsbad Corridor Moving'; regional2Name='Cavern Country Moving'
    countyLabel='Eddy County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='chaves'; city='Roswell'; citySlug='roswell'; label='Roswell Metro'; poolId='chaves-metro-nm'
    regional1='roswell-corridor'; regional2='pecos-valley'
    topId='regional-chaves-nm-movers'; topName='Regional Roswell / Chaves Providers'
    topDesc='Reliable movers serving Chaves County residential needs across Roswell and southeastern New Mexico Pecos Valley communities.'
    countyMovingName='Chaves County Moving'; regional1Name='Roswell Corridor Moving'; regional2Name='Pecos Valley Moving'
    countyLabel='Chaves County'; franchise=$false; topSpecialties="['Residential']"
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

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 2140 } else { 340 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
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
Write-Host 'Generated 110 catalog entries, 11 metro pools for New Mexico (batch 1 — 11 counties)'