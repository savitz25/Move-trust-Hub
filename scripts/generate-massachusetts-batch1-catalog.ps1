$outDir = Join-Path $PSScriptRoot 'massachusetts-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='middlesex'; city='Cambridge'; citySlug='cambridge'; label='Boston Metro'; poolId='middlesex-metro-ma'
    regional1='boston-metro-corridor'; regional2='route-128-tech'
    topId='twomenandatruck-middlesex-ma'; topName='Two Men and a Truck Middlesex'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban moves across Middlesex County.'
    countyMovingName='Middlesex County Moving'; regional1Name='Boston Metro Corridor Moving'; regional2Name='Route 128 Tech Moving'
    franchise=$true
  },
  @{
    slug='worcester'; city='Worcester'; citySlug='worcester'; label='Worcester Metro'; poolId='worcester-metro-ma'
    regional1='worcester-corridor'; regional2='central-mass'
    topId='twomenandatruck-worcester-ma'; topName='Two Men and a Truck Worcester'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Worcester County.'
    countyMovingName='Worcester County Moving'; regional1Name='Worcester Corridor Moving'; regional2Name='Central Mass Moving'
    franchise=$true
  },
  @{
    slug='essex'; city='Salem'; citySlug='salem'; label='Boston Metro (North Shore)'; poolId='essex-metro-ma'
    regional1='north-shore-corridor'; regional2='historic-coast'
    topId='twomenandatruck-essex-ma'; topName='Two Men and a Truck North Shore'
    topDesc='Trusted local franchise with excellent reputation for North Shore residential moves across Essex County.'
    countyMovingName='Essex County Moving'; regional1Name='North Shore Corridor Moving'; regional2Name='Historic Coast Moving'
    franchise=$true
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
    "all-my-sons-$citySlug-ma",
    "$citySlug-moving-$slug-ma",
    "$slug-county-moving-$slug-ma",
    "college-hunks-moving-$citySlug-ma",
    "budd-van-lines-$citySlug-ma",
    "$($c.regional1)-moving-$slug-ma",
    "$($c.regional2)-moving-$slug-ma",
    "hercules-movers-$citySlug-ma",
    "krupp-moving-$citySlug-ma"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=1840; desc=$c.topDesc; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($slug) County."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding $($slug) County neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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
Write-Host 'Generated 30 catalog entries, 3 metro pools for Massachusetts batch 1'