$outDir = Join-Path $PSScriptRoot 'massachusetts-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug='suffolk'; city='Boston'; citySlug='boston'; label='Boston Metro'; poolId='suffolk-metro-ma'
    regional1='boston-urban-corridor'; regional2='historic-boston'
    topId='twomenandatruck-suffolk-ma'; topName='Two Men and a Truck Boston'
    topDesc='Trusted local franchise with excellent reputation for urban residential and commercial moves across Suffolk County.'
    countyMovingName='Suffolk County Moving'; regional1Name='Boston Urban Corridor Moving'; regional2Name='Historic Boston Moving'
    franchise=$true; topSpecialties="['Residential', 'Commercial']"
  },
  @{
    slug='norfolk'; city='Dedham'; citySlug='dedham'; label='Boston Metro'; poolId='norfolk-metro-ma'
    regional1='south-boston-corridor'; regional2='quincy-south-shore'
    topId='twomenandatruck-norfolk-ma'; topName='Two Men and a Truck Norfolk County'
    topDesc='Trusted local franchise with excellent reputation for suburban residential moves across Norfolk County.'
    countyMovingName='Norfolk County Moving'; regional1Name='South Boston Corridor Moving'; regional2Name='Quincy South Shore Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='bristol'; city='Taunton'; citySlug='taunton'; label='Providence / Fall River Metro'; poolId='bristol-metro-ma'
    regional1='fall-river-corridor'; regional2='taunton-southeast'
    topId='twomenandatruck-bristol-ma'; topName='Two Men and a Truck Bristol County'
    topDesc='Trusted local franchise with excellent reputation for residential moves across Bristol County.'
    countyMovingName='Bristol County Moving'; regional1Name='Fall River Corridor Moving'; regional2Name='Taunton Southeast Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='plymouth'; city='Plymouth'; citySlug='plymouth'; label='Boston Metro (South Shore)'; poolId='plymouth-metro-ma'
    regional1='south-shore-corridor'; regional2='coastal-plymouth'
    topId='twomenandatruck-plymouth-ma'; topName='Two Men and a Truck South Shore'
    topDesc='Trusted local franchise with excellent reputation for South Shore residential moves across Plymouth County.'
    countyMovingName='Plymouth County Moving'; regional1Name='South Shore Corridor Moving'; regional2Name='Coastal Plymouth Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='hampden'; city='Springfield'; citySlug='springfield'; label='Springfield Metro'; poolId='hampden-metro-ma'
    regional1='springfield-corridor'; regional2='pioneer-valley'
    topId='twomenandatruck-hampden-ma'; topName='Two Men and a Truck Springfield'
    topDesc='Trusted local franchise with excellent reputation for residential moves across Hampden County.'
    countyMovingName='Hampden County Moving'; regional1Name='Springfield Corridor Moving'; regional2Name='Pioneer Valley Moving'
    franchise=$true; topSpecialties="['Residential']"
  },
  @{
    slug='barnstable'; city='Barnstable'; citySlug='barnstable'; label='Barnstable Metro'; poolId='barnstable-metro-ma'
    regional1='cape-cod-corridor'; regional2='hyannis-coast'
    topId='regional-barnstable-ma-movers'; topName='Regional Cape Cod / Barnstable Providers'
    topDesc='Reliable movers serving Barnstable County residential needs across Cape Cod and Hyannis communities.'
    countyMovingName='Barnstable County Moving'; regional1Name='Cape Cod Corridor Moving'; regional2Name='Hyannis Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='hampshire'; city='Northampton'; citySlug='northampton'; label='Northampton Metro'; poolId='hampshire-metro-ma'
    regional1='northampton-corridor'; regional2='pioneer-valley-west'
    topId='regional-hampshire-ma-movers'; topName='Regional Northampton / Hampshire Providers'
    topDesc='Reliable movers serving Hampshire County residential needs across Northampton and Pioneer Valley communities.'
    countyMovingName='Hampshire County Moving'; regional1Name='Northampton Corridor Moving'; regional2Name='Pioneer Valley West Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='berkshire'; city='Pittsfield'; citySlug='pittsfield'; label='Pittsfield Metro'; poolId='berkshire-metro-ma'
    regional1='pittsfield-corridor'; regional2='berkshire-hills'
    topId='regional-berkshire-ma-movers'; topName='Regional Pittsfield / Berkshire Providers'
    topDesc='Reliable movers serving Berkshire County residential needs across Pittsfield and the Berkshire Hills.'
    countyMovingName='Berkshire County Moving'; regional1Name='Pittsfield Corridor Moving'; regional2Name='Berkshire Hills Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='franklin'; city='Greenfield'; citySlug='greenfield'; label='Greenfield Metro'; poolId='franklin-metro-ma'
    regional1='greenfield-corridor'; regional2='connecticut-river-north'
    topId='regional-franklin-ma-movers'; topName='Regional Greenfield / Franklin Providers'
    topDesc='Reliable movers serving Franklin County residential needs across Greenfield and northwestern Massachusetts.'
    countyMovingName='Franklin County Moving'; regional1Name='Greenfield Corridor Moving'; regional2Name='Connecticut River North Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='dukes'; city='Edgartown'; citySlug='edgartown'; label="Martha's Vineyard Metro"; poolId='dukes-metro-ma'
    regional1='vineyard-corridor'; regional2='island-coast'
    topId='regional-dukes-ma-movers'; topName="Regional Martha's Vineyard / Dukes Providers"
    topDesc='Reliable movers serving Dukes County residential needs across Martha''s Vineyard island communities.'
    countyMovingName='Dukes County Moving'; regional1Name='Vineyard Corridor Moving'; regional2Name='Island Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
  },
  @{
    slug='nantucket'; city='Nantucket'; citySlug='nantucket'; label='Nantucket Metro'; poolId='nantucket-metro-ma'
    regional1='nantucket-island'; regional2='atlantic-coast'
    topId='regional-nantucket-ma-movers'; topName='Regional Nantucket Providers'
    topDesc='Reliable movers serving Nantucket County residential needs across Nantucket Island communities.'
    countyMovingName='Nantucket County Moving'; regional1Name='Nantucket Island Moving'; regional2Name='Atlantic Coast Moving'
    franchise=$false; topSpecialties="['Residential']"
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

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb=$topBbb; city=$c.city }
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

  $idLines = ($ids | ForEach-Object { "    '$_'," }) -join "`n"
  $assignmentLines += "  '$slug': [`n$idLines`n  ],"
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'assignments-snippet.txt') ($assignmentLines -join "`n`n") -Encoding UTF8
Write-Host 'Generated 110 catalog entries, 11 metro pools for Massachusetts batch 2'