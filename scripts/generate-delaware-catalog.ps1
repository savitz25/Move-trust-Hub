$outDir = Join-Path $PSScriptRoot 'delaware-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$counties = @(
  @{
    slug = 'new-castle'
    city = 'Wilmington'
    citySlug = 'wilmington'
    label = 'Wilmington Metro'
    poolId = 'new-castle-metro-de'
    regional1 = 'delaware-river'
    regional2 = 'brandywine-valley'
    topId = 'twomenandatruck-newcastle-de'
    topName = 'Two Men and a Truck Wilmington'
    topDesc = 'Trusted local franchise with excellent reputation for residential and commercial moves across New Castle County.'
  },
  @{
    slug = 'sussex'
    city = 'Georgetown'
    citySlug = 'georgetown'
    label = 'Georgetown Metro'
    poolId = 'sussex-metro-de'
    regional1 = 'delaware-beach'
    regional2 = 'coastal-sussex'
    topId = 'two-men-and-a-truck-sussex-de'
    topName = 'Two Men and a Truck Sussex'
    topDesc = 'Trusted local franchise serving Sussex County coastal and inland residential moves.'
  },
  @{
    slug = 'kent'
    city = 'Dover'
    citySlug = 'dover'
    label = 'Dover Metro'
    poolId = 'kent-metro-de'
    regional1 = 'central-delaware'
    regional2 = 'delaware-bay'
    topId = 'two-men-and-a-truck-kent-de'
    topName = 'Two Men and a Truck Kent'
    topDesc = 'Trusted local franchise serving Dover and Central Delaware residential and commercial moves.'
  }
)

function Format-MoverBlock($m) {
@"
  '$($m.id)': {
    id: '$($m.id)',
    name: '$($m.name)',
    rating: $($m.rating),
    reviewCount: $($m.reviews),
    shortDescription:
      '$($m.desc)',
    services: $($m.services),
    specialties: $($m.specialties),
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: '$($m.bbb)',
    city: '$($m.city)',
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
    "all-my-sons-$citySlug-de",
    "$citySlug-moving-$slug-de",
    "$slug-county-moving-$slug-de",
    "college-hunks-moving-$citySlug-de",
    "budd-van-lines-$citySlug-de",
    "$($c.regional1)-moving-$slug-de",
    "$($c.regional2)-moving-$slug-de",
    "hercules-movers-$citySlug-de",
    "krupp-moving-$citySlug-de"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=1840; desc=$c.topDesc; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Delaware communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name='COUNTY_MOVING_NAME'; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Delaware neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name='REGIONAL1_NAME'; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name='REGIONAL2_NAME'; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
  )

  $countyNames = @{ 'new-castle'='New Castle County Moving'; 'sussex'='Sussex County Moving'; 'kent'='Kent County Moving' }
  $regionalNames = @{
    'new-castle'=@('Delaware River Moving','Brandywine Valley Moving')
    'sussex'=@('Delaware Beach Moving','Coastal Sussex Moving')
    'kent'=@('Central Delaware Moving','Delaware Bay Moving')
  }
  $movers[3].name = $countyNames[$slug]
  $movers[6].name = $regionalNames[$slug][0]
  $movers[7].name = $regionalNames[$slug][1]

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
Write-Host "Generated 30 catalog entries, 3 metro pools for Delaware"