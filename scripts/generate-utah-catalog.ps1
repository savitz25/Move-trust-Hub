$outDir = Join-Path $PSScriptRoot 'utah-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='salt-lake'; city='Salt Lake City'; citySlug='salt-lake-city'; label='Salt Lake City Metro'; poolId='salt-lake-metro-ut'
    regional1='salt-lake-corridor'; regional2='wasatch-front'
    topId='twomenandatruck-saltlake-ut'; topName='Two Men and a Truck Salt Lake City'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban residential and commercial moves across Salt Lake County.'
    countyMovingName='Salt Lake County Moving'; regional1Name='Salt Lake Corridor Moving'; regional2Name='Wasatch Front Moving'
    countyLabel='Salt Lake County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='utah'; city='Provo'; citySlug='provo'; label='Provo-Orem Metro'; poolId='utah-metro-ut'
    regional1='provo-corridor'; regional2='utah-valley'
    topId='twomenandatruck-utah-ut'; topName='Two Men and a Truck Provo'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Utah County.'
    countyMovingName='Utah County Moving'; regional1Name='Provo Corridor Moving'; regional2Name='Utah Valley Moving'
    countyLabel='Utah County, UT'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='davis'; city='Layton'; citySlug='layton'; label='Salt Lake City Metro'; poolId='davis-metro-ut'
    regional1='layton-corridor'; regional2='north-salt-lake'
    topId='twomenandatruck-davis-ut'; topName='Two Men and a Truck Davis County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Davis County north of Salt Lake City.'
    countyMovingName='Davis County Moving'; regional1Name='Layton Corridor Moving'; regional2Name='North Salt Lake Moving'
    countyLabel='Davis County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='weber'; city='Ogden'; citySlug='ogden'; label='Ogden Metro'; poolId='weber-metro-ut'
    regional1='ogden-corridor'; regional2='wasatch-north'
    topId='twomenandatruck-weber-ut'; topName='Two Men and a Truck Ogden'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Weber County.'
    countyMovingName='Weber County Moving'; regional1Name='Ogden Corridor Moving'; regional2Name='Wasatch North Moving'
    countyLabel='Weber County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
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
    "all-my-sons-$citySlug-ut",
    "$citySlug-moving-$slug-ut",
    "$slug-county-moving-$slug-ut",
    "college-hunks-moving-$citySlug-ut",
    "budd-van-lines-$citySlug-ut",
    "$($c.regional1)-moving-$slug-ut",
    "$($c.regional2)-moving-$slug-ut",
    "hercules-movers-$citySlug-ut",
    "krupp-moving-$citySlug-ut"
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
Write-Host 'Generated 40 catalog entries, 4 metro pools for Utah (batch 1 — 4 counties)'