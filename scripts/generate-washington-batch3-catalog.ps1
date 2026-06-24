$outDir = Join-Path $PSScriptRoot 'washington-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='whatcom'; city='Bellingham'; citySlug='bellingham'; label='Bellingham Metro'; poolId='whatcom-metro-wa'; regional1='bellingham-corridor'; regional2='north-border'; topId='regional-whatcom-wa-movers'; topName='Regional Bellingham / Whatcom Providers'; topDesc='Reliable movers serving Whatcom County residential needs across Bellingham and northern border communities.'; countyMovingName='Whatcom County Moving'; regional1Name='Bellingham Corridor Moving'; regional2Name='North Border Moving'; countyLabel='Whatcom County' },
  @{ slug='benton'; city='Kennewick'; citySlug='kennewick'; label='Tri-Cities Metro'; poolId='benton-metro-wa'; regional1='kennewick-corridor'; regional2='tri-cities-east'; topId='regional-benton-wa-movers'; topName='Regional Kennewick / Benton Providers'; topDesc='Reliable movers serving Benton County residential needs across Kennewick, Richland, and Tri-Cities communities.'; countyMovingName='Benton County Moving'; regional1Name='Kennewick Corridor Moving'; regional2Name='Tri-Cities East Moving'; countyLabel='Benton County' },
  @{ slug='skagit'; city='Mount Vernon'; citySlug='mount-vernon'; label='Mount Vernon Metro'; poolId='skagit-metro-wa'; regional1='mount-vernon-corridor'; regional2='skagit-valley'; topId='regional-skagit-wa-movers'; topName='Regional Mount Vernon / Skagit Providers'; topDesc='Reliable movers serving Skagit County residential needs across Mount Vernon and agricultural valley communities.'; countyMovingName='Skagit County Moving'; regional1Name='Mount Vernon Corridor Moving'; regional2Name='Skagit Valley Moving'; countyLabel='Skagit County' },
  @{ slug='cowlitz'; city='Longview'; citySlug='longview'; label='Longview Metro'; poolId='cowlitz-metro-wa'; regional1='longview-corridor'; regional2='cowlitz-river'; topId='regional-cowlitz-wa-movers'; topName='Regional Longview / Cowlitz Providers'; topDesc='Reliable movers serving Cowlitz County residential needs across Longview, Kelso, and southwestern Washington communities.'; countyMovingName='Cowlitz County Moving'; regional1Name='Longview Corridor Moving'; regional2Name='Cowlitz River Moving'; countyLabel='Cowlitz County' },
  @{ slug='grant'; city='Moses Lake'; citySlug='moses-lake'; label='Moses Lake Metro'; poolId='grant-metro-wa'; regional1='moses-lake-corridor'; regional2='columbia-basin'; topId='regional-grant-wa-movers'; topName='Regional Moses Lake / Grant Providers'; topDesc='Reliable movers serving Grant County residential needs across Moses Lake, Ephrata, and central Washington agricultural communities.'; countyMovingName='Grant County Moving'; regional1Name='Moses Lake Corridor Moving'; regional2Name='Columbia Basin Moving'; countyLabel='Grant County' },
  @{ slug='franklin'; city='Pasco'; citySlug='pasco'; label='Tri-Cities Metro'; poolId='franklin-metro-wa'; regional1='pasco-corridor'; regional2='tri-cities-west'; topId='regional-franklin-wa-movers'; topName='Regional Pasco / Franklin Providers'; topDesc='Reliable movers serving Franklin County residential needs across Pasco and Tri-Cities communities.'; countyMovingName='Franklin County Moving'; regional1Name='Pasco Corridor Moving'; regional2Name='Tri-Cities West Moving'; countyLabel='Franklin County' },
  @{ slug='lewis'; city='Chehalis'; citySlug='chehalis'; label='Centralia-Chehalis Metro'; poolId='lewis-metro-wa'; regional1='chehalis-corridor'; regional2='southwest-lewis'; topId='regional-lewis-wa-movers'; topName='Regional Chehalis / Lewis Providers'; topDesc='Reliable movers serving Lewis County residential needs across Chehalis, Centralia, and southwestern Washington communities.'; countyMovingName='Lewis County Moving'; regional1Name='Chehalis Corridor Moving'; regional2Name='Southwest Lewis Moving'; countyLabel='Lewis County' },
  @{ slug='island'; city='Oak Harbor'; citySlug='oak-harbor'; label='Island County Metro'; poolId='island-metro-wa'; regional1='oak-harbor-corridor'; regional2='whidbey-island'; topId='regional-island-wa-movers'; topName='Regional Oak Harbor / Island Providers'; topDesc='Reliable movers serving Island County residential needs across Oak Harbor, Coupeville, and Whidbey Island communities.'; countyMovingName='Island County Moving'; regional1Name='Oak Harbor Corridor Moving'; regional2Name='Whidbey Island Moving'; countyLabel='Island County' },
  @{ slug='chelan'; city='Wenatchee'; citySlug='wenatchee'; label='Wenatchee Metro'; poolId='chelan-metro-wa'; regional1='wenatchee-corridor'; regional2='lake-chelan'; topId='regional-chelan-wa-movers'; topName='Regional Wenatchee / Chelan Providers'; topDesc='Reliable movers serving Chelan County residential needs across Wenatchee and central Washington tourism and agricultural communities.'; countyMovingName='Chelan County Moving'; regional1Name='Wenatchee Corridor Moving'; regional2Name='Lake Chelan Moving'; countyLabel='Chelan County' },
  @{ slug='clallam'; city='Port Angeles'; citySlug='port-angeles'; label='Port Angeles Metro'; poolId='clallam-metro-wa'; regional1='port-angeles-corridor'; regional2='olympic-peninsula'; topId='regional-clallam-wa-movers'; topName='Regional Port Angeles / Clallam Providers'; topDesc='Reliable movers serving Clallam County residential needs across Port Angeles and Olympic Peninsula communities.'; countyMovingName='Clallam County Moving'; regional1Name='Port Angeles Corridor Moving'; regional2Name='Olympic Peninsula Moving'; countyLabel='Clallam County' },
  @{ slug='grays-harbor'; city='Aberdeen'; citySlug='aberdeen'; label='Aberdeen Metro'; poolId='grays-harbor-metro-wa'; regional1='aberdeen-corridor'; regional2='grays-harbor-coast'; topId='regional-graysharbor-wa-movers'; topName='Regional Aberdeen / Grays Harbor Providers'; topDesc='Reliable movers serving Grays Harbor County residential needs across Aberdeen, Montesano, and coastal Washington communities.'; countyMovingName='Grays Harbor County Moving'; regional1Name='Aberdeen Corridor Moving'; regional2Name='Grays Harbor Coast Moving'; countyLabel='Grays Harbor County' }
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
    "all-my-sons-$citySlug-wa",
    "$citySlug-moving-$slug-wa",
    "$slug-county-moving-$slug-wa",
    "college-hunks-moving-$citySlug-wa",
    "budd-van-lines-$citySlug-wa",
    "$($c.regional1)-moving-$slug-wa",
    "$($c.regional2)-moving-$slug-wa",
    "hercules-movers-$citySlug-wa",
    "krupp-moving-$citySlug-wa"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=320; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1180; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=640; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1040; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=400; desc="Regional mover serving $($c.city) and $($c.countyLabel) communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=350; desc="Local specialist for $($c.countyLabel) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=280; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=260; desc="Full-service local mover serving $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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
Set-Content (Join-Path $outDir 'batch3-assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 110 catalog entries, 11 metro pools for Washington batch 3'