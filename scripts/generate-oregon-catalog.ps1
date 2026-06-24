$outDir = Join-Path $PSScriptRoot 'oregon-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='multnomah'; city='Portland'; citySlug='portland'; label='Portland Metro'; poolId='multnomah-metro-or'
    regional1='portland-corridor'; regional2='willamette-north'
    topId='twomenandatruck-multnomah-or'; topName='Two Men and a Truck Portland'
    topDesc='Trusted local franchise with excellent reputation for urban and suburban residential and commercial moves across Multnomah County.'
    countyMovingName='Multnomah County Moving'; regional1Name='Portland Corridor Moving'; regional2Name='Willamette North Moving'
    countyLabel='Multnomah County'; franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='washington'; city='Hillsboro'; citySlug='hillsboro'; label='Portland Metro'; poolId='washington-metro-or'
    regional1='hillsboro-corridor'; regional2='tualatin-valley'
    topId='twomenandatruck-washington-or'; topName='Two Men and a Truck Washington County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Washington County, Oregon.'
    countyMovingName='Washington County Moving'; regional1Name='Hillsboro Corridor Moving'; regional2Name='Tualatin Valley Moving'
    countyLabel='Washington County, OR'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='clackamas'; city='Oregon City'; citySlug='oregon-city'; label='Portland Metro'; poolId='clackamas-metro-or'
    regional1='oregon-city-corridor'; regional2='clackamas-valley'
    topId='twomenandatruck-clackamas-or'; topName='Two Men and a Truck Clackamas County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Clackamas County.'
    countyMovingName='Clackamas County Moving'; regional1Name='Oregon City Corridor Moving'; regional2Name='Clackamas Valley Moving'
    countyLabel='Clackamas County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='lane'; city='Eugene'; citySlug='eugene'; label='Eugene Metro'; poolId='lane-metro-or'
    regional1='eugene-corridor'; regional2='willamette-south'
    topId='twomenandatruck-lane-or'; topName='Two Men and a Truck Eugene'
    topDesc='Trusted local franchise with excellent reputation for residential moves across Lane County.'
    countyMovingName='Lane County Moving'; regional1Name='Eugene Corridor Moving'; regional2Name='Willamette South Moving'
    countyLabel='Lane County'; franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='marion'; city='Salem'; citySlug='salem'; label='Salem Metro'; poolId='marion-metro-or'
    regional1='salem-corridor'; regional2='capital-region'
    topId='regional-marion-or-movers'; topName='Regional Salem / Marion Providers'
    topDesc='Reliable movers serving Marion County residential needs across Salem and surrounding capital-region communities.'
    countyMovingName='Marion County Moving'; regional1Name='Salem Corridor Moving'; regional2Name='Capital Region Moving'
    countyLabel='Marion County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='jackson'; city='Medford'; citySlug='medford'; label='Medford Metro'; poolId='jackson-metro-or'
    regional1='medford-corridor'; regional2='rogue-valley'
    topId='regional-jackson-or-movers'; topName='Regional Medford / Jackson Providers'
    topDesc='Reliable movers serving Jackson County residential needs across Medford, Ashland, and Rogue Valley communities.'
    countyMovingName='Jackson County Moving'; regional1Name='Medford Corridor Moving'; regional2Name='Rogue Valley Moving'
    countyLabel='Jackson County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='deschutes'; city='Bend'; citySlug='bend'; label='Bend Metro'; poolId='deschutes-metro-or'
    regional1='bend-corridor'; regional2='central-oregon'
    topId='regional-deschutes-or-movers'; topName='Regional Bend / Deschutes Providers'
    topDesc='Reliable movers serving Deschutes County residential needs across Bend and central Oregon communities.'
    countyMovingName='Deschutes County Moving'; regional1Name='Bend Corridor Moving'; regional2Name='Central Oregon Moving'
    countyLabel='Deschutes County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='linn'; city='Albany'; citySlug='albany'; label='Albany Metro'; poolId='linn-metro-or'
    regional1='albany-corridor'; regional2='mid-willamette'
    topId='regional-linn-or-movers'; topName='Regional Albany / Linn Providers'
    topDesc='Reliable movers serving Linn County residential needs across Albany and mid-Willamette Valley communities.'
    countyMovingName='Linn County Moving'; regional1Name='Albany Corridor Moving'; regional2Name='Mid-Willamette Moving'
    countyLabel='Linn County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='douglas'; city='Roseburg'; citySlug='roseburg'; label='Roseburg Metro'; poolId='douglas-metro-or'
    regional1='roseburg-corridor'; regional2='umpqua-valley'
    topId='regional-douglas-or-movers'; topName='Regional Roseburg / Douglas Providers'
    topDesc='Reliable movers serving Douglas County residential needs across Roseburg and Umpqua Valley communities.'
    countyMovingName='Douglas County Moving'; regional1Name='Roseburg Corridor Moving'; regional2Name='Umpqua Valley Moving'
    countyLabel='Douglas County, OR'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='yamhill'; city='McMinnville'; citySlug='mcminnville'; label='McMinnville Metro'; poolId='yamhill-metro-or'
    regional1='mcminnville-corridor'; regional2='wine-country'
    topId='regional-yamhill-or-movers'; topName='Regional McMinnville / Yamhill Providers'
    topDesc='Reliable movers serving Yamhill County residential needs across McMinnville and Willamette Valley wine country.'
    countyMovingName='Yamhill County Moving'; regional1Name='McMinnville Corridor Moving'; regional2Name='Wine Country Moving'
    countyLabel='Yamhill County'; franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='benton'; city='Corvallis'; citySlug='corvallis'; label='Corvallis Metro'; poolId='benton-metro-or'
    regional1='corvallis-corridor'; regional2='mid-valley'
    topId='regional-benton-or-movers'; topName='Regional Corvallis / Benton Providers'
    topDesc='Reliable movers serving Benton County residential needs across Corvallis and Oregon State University-area communities.'
    countyMovingName='Benton County Moving'; regional1Name='Corvallis Corridor Moving'; regional2Name='Mid-Valley Moving'
    countyLabel='Benton County, OR'; franchise=$false; topSpecialties="['Residential']"
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

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 110 catalog entries, 11 metro pools for Oregon (11 premium counties)'