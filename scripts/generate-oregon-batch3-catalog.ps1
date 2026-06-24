$outDir = Join-Path $PSScriptRoot 'oregon-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='clatsop'; city='Astoria'; citySlug='astoria'; label='Astoria Metro'; poolId='clatsop-metro-or'; regional1='astoria-corridor'; regional2='north-coast'; topId='regional-clatsop-or-movers'; topName='Regional Astoria / Clatsop Providers'; topDesc='Reliable movers serving Clatsop County residential needs across Astoria and northern Oregon coastal communities.'; countyMovingName='Clatsop County Moving'; regional1Name='Astoria Corridor Moving'; regional2Name='North Coast Moving'; countyLabel='Clatsop County' },
  @{ slug='columbia'; city='St. Helens'; citySlug='st-helens'; label='St. Helens Metro'; poolId='columbia-metro-or'; regional1='st-helens-corridor'; regional2='columbia-river'; topId='regional-columbia-or-movers'; topName='Regional St. Helens / Columbia Providers'; topDesc='Reliable movers serving Columbia County residential needs across St. Helens and lower Columbia River communities.'; countyMovingName='Columbia County Moving'; regional1Name='St. Helens Corridor Moving'; regional2Name='Columbia River Moving'; countyLabel='Columbia County, OR' },
  @{ slug='coos'; city='Coquille'; citySlug='coquille'; label='Coquille Metro'; poolId='coos-metro-or'; regional1='coquille-corridor'; regional2='south-coast'; topId='regional-coos-or-movers'; topName='Regional Coquille / Coos Providers'; topDesc='Reliable movers serving Coos County residential needs across Coquille, North Bend, and southern Oregon coastal communities.'; countyMovingName='Coos County Moving'; regional1Name='Coquille Corridor Moving'; regional2Name='South Coast Moving'; countyLabel='Coos County' },
  @{ slug='crook'; city='Prineville'; citySlug='prineville'; label='Prineville Metro'; poolId='crook-metro-or'; regional1='prineville-corridor'; regional2='central-oregon'; topId='regional-crook-or-movers'; topName='Regional Prineville / Crook Providers'; topDesc='Reliable movers serving Crook County residential needs across Prineville and central Oregon high-desert communities.'; countyMovingName='Crook County Moving'; regional1Name='Prineville Corridor Moving'; regional2Name='Central Oregon Moving'; countyLabel='Crook County' },
  @{ slug='josephine'; city='Grants Pass'; citySlug='grants-pass'; label='Grants Pass Metro'; poolId='josephine-metro-or'; regional1='grants-pass-corridor'; regional2='rogue-valley'; topId='regional-josephine-or-movers'; topName='Regional Grants Pass / Josephine Providers'; topDesc='Reliable movers serving Josephine County residential needs across Grants Pass and Rogue Valley communities.'; countyMovingName='Josephine County Moving'; regional1Name='Grants Pass Corridor Moving'; regional2Name='Rogue Valley Moving'; countyLabel='Josephine County' },
  @{ slug='klamath'; city='Klamath Falls'; citySlug='klamath-falls'; label='Klamath Falls Metro'; poolId='klamath-metro-or'; regional1='klamath-falls-corridor'; regional2='basin-south'; topId='regional-klamath-or-movers'; topName='Regional Klamath Falls / Klamath Providers'; topDesc='Reliable movers serving Klamath County residential needs across Klamath Falls and southern Oregon basin communities.'; countyMovingName='Klamath County Moving'; regional1Name='Klamath Falls Corridor Moving'; regional2Name='Basin South Moving'; countyLabel='Klamath County' },
  @{ slug='lincoln'; city='Newport'; citySlug='newport'; label='Newport Metro'; poolId='lincoln-metro-or'; regional1='newport-corridor'; regional2='central-coast'; topId='regional-lincoln-or-movers'; topName='Regional Newport / Lincoln Providers'; topDesc='Reliable movers serving Lincoln County residential needs across Newport and central Oregon coastal communities.'; countyMovingName='Lincoln County Moving'; regional1Name='Newport Corridor Moving'; regional2Name='Central Coast Moving'; countyLabel='Lincoln County, OR' },
  @{ slug='malheur'; city='Ontario'; citySlug='ontario'; label='Ontario Metro'; poolId='malheur-metro-or'; regional1='ontario-corridor'; regional2='treasure-valley'; topId='regional-malheur-or-movers'; topName='Regional Ontario / Malheur Providers'; topDesc='Reliable movers serving Malheur County residential needs across Ontario and eastern Oregon Treasure Valley communities.'; countyMovingName='Malheur County Moving'; regional1Name='Ontario Corridor Moving'; regional2Name='Treasure Valley Moving'; countyLabel='Malheur County' },
  @{ slug='polk'; city='Dallas'; citySlug='dallas'; label='Dallas Metro'; poolId='polk-metro-or'; regional1='dallas-corridor'; regional2='willamette-west'; topId='regional-polk-or-movers'; topName='Regional Dallas / Polk Providers'; topDesc='Reliable movers serving Polk County residential needs across Dallas, Monmouth, and western Willamette Valley communities.'; countyMovingName='Polk County Moving'; regional1Name='Dallas Corridor Moving'; regional2Name='Willamette West Moving'; countyLabel='Polk County' },
  @{ slug='tillamook'; city='Tillamook'; citySlug='tillamook'; label='Tillamook Metro'; poolId='tillamook-metro-or'; regional1='tillamook-corridor'; regional2='north-coast'; topId='regional-tillamook-or-movers'; topName='Regional Tillamook / Tillamook County Providers'; topDesc='Reliable movers serving Tillamook County residential needs across Tillamook and Oregon Coast dairy-country communities.'; countyMovingName='Tillamook County Moving'; regional1Name='Tillamook Corridor Moving'; regional2Name='North Coast Moving'; countyLabel='Tillamook County' },
  @{ slug='umatilla'; city='Pendleton'; citySlug='pendleton'; label='Pendleton Metro'; poolId='umatilla-metro-or'; regional1='pendleton-corridor'; regional2='blue-mountains'; topId='regional-umatilla-or-movers'; topName='Regional Pendleton / Umatilla Providers'; topDesc='Reliable movers serving Umatilla County residential needs across Pendleton, Hermiston, and eastern Oregon plateau communities.'; countyMovingName='Umatilla County Moving'; regional1Name='Pendleton Corridor Moving'; regional2Name='Blue Mountains Moving'; countyLabel='Umatilla County' }
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
    "all-my-sons-$citySlug-or",
    "$citySlug-moving-$slug-or",
    "$slug-county-moving-$slug-or",
    "college-hunks-moving-$citySlug-or",
    "budd-van-lines-$citySlug-or",
    "$($c.regional1)-moving-$slug-or",
    "$($c.regional2)-moving-$slug-or",
    "hercules-movers-$citySlug-or",
    "krupp-moving-$citySlug-or"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1420; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=980; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=720; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1280; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=560; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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

  $key = "'$slug'"
  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  $key`: [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'batch3-catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch3-metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch3-assignments.txt') ($assignmentLines -join "`n") -Encoding UTF8
Write-Host "Generated Oregon batch 3: $($counties.Count) counties"