$outDir = Join-Path $PSScriptRoot 'maryland-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug = 'montgomery'
    city = 'Rockville'
    citySlug = 'rockville'
    label = 'Rockville Metro'
    poolId = 'montgomery-metro-md'
    regional1 = 'dc-metro'
    regional2 = 'bethesda-corridor'
    topId = 'twomenandatruck-montgomery-md'
    topName = 'Two Men and a Truck Montgomery County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential and commercial moves across Montgomery County.'
    countyMovingName = 'Montgomery County Moving'
    regional1Name = 'DC Metro Moving'
    regional2Name = 'Bethesda Corridor Moving'
  },
  @{
    slug = 'prince-georges'
    city = 'Upper Marlboro'
    citySlug = 'upper-marlboro'
    label = 'Upper Marlboro Metro'
    poolId = 'prince-georges-metro-md'
    regional1 = 'dc-metro'
    regional2 = 'bowie-corridor'
    topId = 'twomenandatruck-princegeorges-md'
    topName = "Two Men and a Truck Prince George's"
    topDesc = "Trusted local franchise with excellent reputation for suburban residential and commercial moves across Prince George's County."
    countyMovingName = "Prince George's County Moving"
    regional1Name = 'DC Metro Moving'
    regional2Name = 'Bowie Corridor Moving'
  },
  @{
    slug = 'baltimore'
    city = 'Towson'
    citySlug = 'towson'
    label = 'Towson Metro'
    poolId = 'baltimore-metro-md'
    regional1 = 'catonsville-corridor'
    regional2 = 'dundalk-area'
    topId = 'twomenandatruck-baltimorecounty-md'
    topName = 'Two Men and a Truck Baltimore County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential and commercial moves across Baltimore County.'
    countyMovingName = 'Baltimore County Moving'
    regional1Name = 'Catonsville Corridor Moving'
    regional2Name = 'Dundalk Area Moving'
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
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-md",
    "$citySlug-moving-$slug-md",
    "$slug-county-moving-$slug-md",
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
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Maryland neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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
Write-Host 'Generated 30 catalog entries, 3 metro pools for Maryland batch 1'