$outDir = Join-Path $PSScriptRoot 'maryland-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug = 'anne-arundel'
    city = 'Annapolis'
    citySlug = 'annapolis'
    label = 'Annapolis Metro'
    poolId = 'anne-arundel-metro-md'
    regional1 = 'naval-waterfront'
    regional2 = 'glen-burnie-corridor'
    topId = 'twomenandatruck-annearundel-md'
    topName = 'Two Men and a Truck Annapolis'
    topDesc = 'Trusted local franchise with excellent reputation for suburban and waterfront residential moves across Anne Arundel County.'
    countyMovingName = 'Anne Arundel County Moving'
    regional1Name = 'Naval Waterfront Moving'
    regional2Name = 'Glen Burnie Corridor Moving'
  },
  @{
    slug = 'baltimore-city'
    city = 'Baltimore'
    citySlug = 'baltimore-city'
    label = 'Baltimore City Metro'
    poolId = 'baltimore-city-metro-md'
    regional1 = 'inner-harbor'
    regional2 = 'urban-baltimore'
    topId = 'twomenandatruck-baltimorecity-md'
    topName = 'Two Men and a Truck Baltimore City'
    topDesc = 'Trusted local franchise with excellent reputation for urban residential and commercial moves across Baltimore City.'
    countyMovingName = 'Baltimore City Local Moving'
    regional1Name = 'Inner Harbor Moving'
    regional2Name = 'Urban Baltimore Moving'
  },
  @{
    slug = 'howard'
    city = 'Ellicott City'
    citySlug = 'ellicott-city'
    label = 'Ellicott City Metro'
    poolId = 'howard-metro-md'
    regional1 = 'columbia-corridor'
    regional2 = 'central-maryland'
    topId = 'twomenandatruck-howard-md'
    topName = 'Two Men and a Truck Howard County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Howard County.'
    countyMovingName = 'Howard County Moving'
    regional1Name = 'Columbia Corridor Moving'
    regional2Name = 'Central Maryland Moving'
  },
  @{
    slug = 'frederick'
    city = 'Frederick'
    citySlug = 'frederick'
    label = 'Frederick Metro'
    poolId = 'frederick-metro-md'
    regional1 = 'i70-corridor'
    regional2 = 'catoctin-area'
    topId = 'twomenandatruck-frederick-md'
    topName = 'Two Men and a Truck Frederick'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Frederick County.'
    countyMovingName = 'Frederick County Moving'
    regional1Name = 'I-70 Corridor Moving'
    regional2Name = 'Catoctin Area Moving'
  },
  @{
    slug = 'harford'
    city = 'Bel Air'
    citySlug = 'bel-air'
    label = 'Bel Air Metro'
    poolId = 'harford-metro-md'
    regional1 = 'i95-northeast'
    regional2 = 'aberdeen-corridor'
    topId = 'twomenandatruck-harford-md'
    topName = 'Two Men and a Truck Harford County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Harford County.'
    countyMovingName = 'Harford County Moving'
    regional1Name = 'I-95 Northeast Moving'
    regional2Name = 'Aberdeen Corridor Moving'
  },
  @{
    slug = 'charles'
    city = 'La Plata'
    citySlug = 'la-plata'
    label = 'La Plata Metro'
    poolId = 'charles-metro-md'
    regional1 = 'potomac-south'
    regional2 = 'waldorf-corridor'
    topId = 'twomenandatruck-charles-md'
    topName = 'Two Men and a Truck Charles County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Charles County.'
    countyMovingName = 'Charles County Moving'
    regional1Name = 'Potomac South Moving'
    regional2Name = 'Waldorf Corridor Moving'
  }
)

function Format-MoverBlock($m) {
  $nameQ = Quote-Ts $m.name
  $descQ = Quote-Ts $m.desc
  $cityQ = Quote-Ts $m.city
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
    bbbRating: '$($m.bbb)',
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
  $fourthId = if ($slug -eq 'baltimore-city') {
    "baltimore-city-local-moving-$slug-md"
  } else {
    "$slug-county-moving-$slug-md"
  }
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-md",
    "$citySlug-moving-$slug-md",
    $fourthId,
    "college-hunks-moving-$citySlug-md",
    "budd-van-lines-$citySlug-md",
    "$($c.regional1)-moving-$slug-md",
    "$($c.regional2)-moving-$slug-md",
    "hercules-movers-$citySlug-md",
    "krupp-moving-$citySlug-md"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=1840; desc=$c.topDesc; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Maryland communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="Local specialist with experience across $($c.city) and surrounding Maryland neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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
Write-Host 'Generated 60 catalog entries, 6 metro pools for Maryland batch 2'