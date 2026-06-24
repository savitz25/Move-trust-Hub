$outDir = Join-Path $PSScriptRoot 'washington-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='pierce'; city='Tacoma'; citySlug='tacoma'; label='Seattle-Tacoma Metro'; poolId='pierce-metro-wa'
    regional1='tacoma-corridor'; regional2='south-sound'
    topId='twomenandatruck-pierce-wa'; topName='Two Men and a Truck Tacoma'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Pierce County.'
    countyMovingName='Pierce County Moving'; regional1Name='Tacoma Corridor Moving'; regional2Name='South Sound Moving'
    countyLabel='Pierce County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='snohomish'; city='Everett'; citySlug='everett'; label='Seattle Metro'; poolId='snohomish-metro-wa'
    regional1='everett-corridor'; regional2='north-sound'
    topId='twomenandatruck-snohomish-wa'; topName='Two Men and a Truck Snohomish County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Snohomish County.'
    countyMovingName='Snohomish County Moving'; regional1Name='Everett Corridor Moving'; regional2Name='North Sound Moving'
    countyLabel='Snohomish County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='spokane'; city='Spokane'; citySlug='spokane'; label='Spokane Metro'; poolId='spokane-metro-wa'
    regional1='spokane-corridor'; regional2='inland-northwest'
    topId='twomenandatruck-spokane-wa'; topName='Two Men and a Truck Spokane'
    topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Spokane County.'
    countyMovingName='Spokane County Moving'; regional1Name='Spokane Corridor Moving'; regional2Name='Inland Northwest Moving'
    countyLabel='Spokane County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='clark'; city='Vancouver'; citySlug='vancouver'; label='Portland Metro'; poolId='clark-metro-wa'
    regional1='vancouver-corridor'; regional2='columbia-river'
    topId='twomenandatruck-clark-wa'; topName='Two Men and a Truck Vancouver WA'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Clark County.'
    countyMovingName='Clark County Moving'; regional1Name='Vancouver Corridor Moving'; regional2Name='Columbia River Moving'
    countyLabel='Clark County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='thurston'; city='Olympia'; citySlug='olympia'; label='Olympia Metro'; poolId='thurston-metro-wa'
    regional1='olympia-corridor'; regional2='capital-region'
    topId='regional-thurston-wa-movers'; topName='Regional Olympia / Thurston Providers'
    topDesc='Reliable movers serving Thurston County residential needs across Olympia and surrounding capital-region communities.'
    countyMovingName='Thurston County Moving'; regional1Name='Olympia Corridor Moving'; regional2Name='Capital Region Moving'
    countyLabel='Thurston County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='kitsap'; city='Bremerton'; citySlug='bremerton'; label='Bremerton Metro'; poolId='kitsap-metro-wa'
    regional1='bremerton-corridor'; regional2='peninsula-naval'
    topId='regional-kitsap-wa-movers'; topName='Regional Bremerton / Kitsap Providers'
    topDesc='Reliable movers serving Kitsap County residential needs across Bremerton, Port Orchard, and peninsula communities.'
    countyMovingName='Kitsap County Moving'; regional1Name='Bremerton Corridor Moving'; regional2Name='Peninsula Naval Moving'
    countyLabel='Kitsap County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='yakima'; city='Yakima'; citySlug='yakima'; label='Yakima Metro'; poolId='yakima-metro-wa'
    regional1='yakima-corridor'; regional2='central-washington'
    topId='regional-yakima-wa-movers'; topName='Regional Yakima / Yakima County Providers'
    topDesc='Reliable movers serving Yakima County residential needs across Yakima and Central Washington communities.'
    countyMovingName='Yakima County Moving'; regional1Name='Yakima Corridor Moving'; regional2Name='Central Washington Moving'
    countyLabel='Yakima County'; franchise=$false; topSpecialties="['Residential']"
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

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1980 } else { 340 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1420; desc="Established mover known for reliable local and long-distance services in $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=980; desc="Full-service local mover serving $($c.city) and $($c.countyLabel) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=720; desc="County-focused mover with experience across $($c.city) and surrounding $($c.countyLabel) neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1280; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=560; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=460; desc="Regional mover serving $($c.city) and $($c.countyLabel) communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=390; desc="Local specialist for $($c.countyLabel) residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=330; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=300; desc="Full-service local mover serving $($c.city) and $($c.countyLabel)."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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

Set-Content (Join-Path $outDir 'batch2-catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch2-metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'batch2-assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 70 catalog entries, 7 metro pools for Washington batch 2'