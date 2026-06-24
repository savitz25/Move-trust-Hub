$outDir = Join-Path $PSScriptRoot 'maryland-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{
    slug = 'carroll'; city = 'Westminster'; citySlug = 'westminster'; label = 'Westminster Metro'; poolId = 'carroll-metro-md'
    regional1 = 'baltimore-northwest'; regional2 = 'carroll-corridor'
    topId = 'twomenandatruck-carroll-md'; topName = 'Two Men and a Truck Carroll County'
    topDesc = 'Trusted local franchise with excellent reputation for suburban residential moves across Carroll County.'
    countyMovingName = 'Carroll County Moving'; regional1Name = 'Baltimore Northwest Moving'; regional2Name = 'Carroll Corridor Moving'
    franchise = $true
  },
  @{
    slug = 'washington'; city = 'Hagerstown'; citySlug = 'hagerstown'; label = 'Hagerstown Metro'; poolId = 'washington-metro-md'
    regional1 = 'western-maryland'; regional2 = 'i81-corridor'
    topId = 'regional-washington-md-movers'; topName = 'Regional Hagerstown / Washington County Providers'
    topDesc = 'Reliable movers serving Washington County residential needs across Hagerstown and surrounding Western Maryland communities.'
    countyMovingName = 'Washington County Moving'; regional1Name = 'Western Maryland Moving'; regional2Name = 'I-81 Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'st-marys'; city = 'Leonardtown'; citySlug = 'leonardtown'; label = 'Leonardtown Metro'; poolId = 'st-marys-metro-md'
    regional1 = 'patuxent-river'; regional2 = 'southern-maryland'
    topId = 'regional-stmarys-md-movers'; topName = "Regional Leonardtown / St. Mary's County Providers"
    topDesc = "Reliable movers serving St. Mary's County residential needs across Leonardtown and Southern Maryland communities."
    countyMovingName = "St. Mary's County Moving"; regional1Name = 'Patuxent River Moving'; regional2Name = 'Southern Maryland Moving'
    franchise = $false
  },
  @{
    slug = 'cecil'; city = 'Elkton'; citySlug = 'elkton'; label = 'Elkton Metro'; poolId = 'cecil-metro-md'
    regional1 = 'i95-northeast-md'; regional2 = 'delaware-border'
    topId = 'regional-cecil-md-movers'; topName = 'Regional Elkton / Cecil County Providers'
    topDesc = 'Reliable movers serving Cecil County residential needs across Elkton and Northern Maryland communities.'
    countyMovingName = 'Cecil County Moving'; regional1Name = 'I-95 Northeast MD Moving'; regional2Name = 'Delaware Border Moving'
    franchise = $false
  },
  @{
    slug = 'wicomico'; city = 'Salisbury'; citySlug = 'salisbury'; label = 'Salisbury Metro'; poolId = 'wicomico-metro-md'
    regional1 = 'eastern-shore'; regional2 = 'salisbury-corridor'
    topId = 'regional-wicomico-md-movers'; topName = 'Regional Salisbury / Wicomico County Providers'
    topDesc = 'Reliable movers serving Wicomico County residential needs across Salisbury and Eastern Shore communities.'
    countyMovingName = 'Wicomico County Moving'; regional1Name = 'Eastern Shore Moving'; regional2Name = 'Salisbury Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'calvert'; city = 'Prince Frederick'; citySlug = 'prince-frederick'; label = 'Prince Frederick Metro'; poolId = 'calvert-metro-md'
    regional1 = 'patuxent-waterfront'; regional2 = 'southern-md-waterfront'
    topId = 'regional-calvert-md-movers'; topName = 'Regional Prince Frederick / Calvert County Providers'
    topDesc = 'Reliable movers serving Calvert County residential needs across Prince Frederick and Southern Maryland waterfront communities.'
    countyMovingName = 'Calvert County Moving'; regional1Name = 'Patuxent Waterfront Moving'; regional2Name = 'Southern MD Waterfront Moving'
    franchise = $false
  },
  @{
    slug = 'allegany'; city = 'Cumberland'; citySlug = 'cumberland'; label = 'Cumberland Metro'; poolId = 'allegany-metro-md'
    regional1 = 'appalachian-maryland'; regional2 = 'potomac-highlands'
    topId = 'regional-allegany-md-movers'; topName = 'Regional Cumberland / Allegany County Providers'
    topDesc = 'Reliable movers serving Allegany County residential needs across Cumberland and Western Maryland communities.'
    countyMovingName = 'Allegany County Moving'; regional1Name = 'Appalachian Maryland Moving'; regional2Name = 'Potomac Highlands Moving'
    franchise = $false
  },
  @{
    slug = 'queen-annes'; city = 'Centreville'; citySlug = 'centreville'; label = 'Centreville Metro'; poolId = 'queen-annes-metro-md'
    regional1 = 'bay-bridge'; regional2 = 'eastern-shore-waterfront'
    topId = 'regional-queenannes-md-movers'; topName = "Regional Centreville / Queen Anne's County Providers"
    topDesc = "Reliable movers serving Queen Anne's County residential needs across Centreville and Eastern Shore waterfront communities."
    countyMovingName = "Queen Anne's County Moving"; regional1Name = 'Bay Bridge Moving'; regional2Name = 'Eastern Shore Waterfront Moving'
    franchise = $false
  },
  @{
    slug = 'worcester'; city = 'Ocean City'; citySlug = 'ocean-city'; label = 'Ocean City Metro'; poolId = 'worcester-metro-md'
    regional1 = 'coastal-maryland'; regional2 = 'ocean-city-corridor'
    topId = 'regional-worcester-md-movers'; topName = 'Regional Ocean City / Worcester County Providers'
    topDesc = 'Reliable movers serving Worcester County residential needs across Ocean City, Snow Hill, and coastal Maryland communities.'
    countyMovingName = 'Worcester County Moving'; regional1Name = 'Coastal Maryland Moving'; regional2Name = 'Ocean City Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'talbot'; city = 'Easton'; citySlug = 'easton'; label = 'Easton Metro'; poolId = 'talbot-metro-md'
    regional1 = 'mid-shore'; regional2 = 'choptank-corridor'
    topId = 'regional-talbot-md-movers'; topName = 'Regional Easton / Talbot County Providers'
    topDesc = 'Reliable movers serving Talbot County residential needs across Easton and Mid-Shore waterfront communities.'
    countyMovingName = 'Talbot County Moving'; regional1Name = 'Mid-Shore Moving'; regional2Name = 'Choptank Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'caroline'; city = 'Denton'; citySlug = 'denton'; label = 'Denton Metro'; poolId = 'caroline-metro-md'
    regional1 = 'eastern-shore-rural'; regional2 = 'mid-shore-rural'
    topId = 'regional-caroline-md-movers'; topName = 'Regional Denton / Caroline County Providers'
    topDesc = 'Reliable movers serving Caroline County residential needs across Denton and rural Eastern Shore communities.'
    countyMovingName = 'Caroline County Moving'; regional1Name = 'Eastern Shore Rural Moving'; regional2Name = 'Mid-Shore Rural Moving'
    franchise = $false
  },
  @{
    slug = 'dorchester'; city = 'Cambridge'; citySlug = 'cambridge'; label = 'Cambridge Metro'; poolId = 'dorchester-metro-md'
    regional1 = 'choptank-river'; regional2 = 'lower-shore'
    topId = 'regional-dorchester-md-movers'; topName = 'Regional Cambridge / Dorchester County Providers'
    topDesc = 'Reliable movers serving Dorchester County residential needs across Cambridge and Eastern Shore communities.'
    countyMovingName = 'Dorchester County Moving'; regional1Name = 'Choptank River Moving'; regional2Name = 'Lower Shore Moving'
    franchise = $false
  },
  @{
    slug = 'garrett'; city = 'Oakland'; citySlug = 'oakland'; label = 'Oakland Metro'; poolId = 'garrett-metro-md'
    regional1 = 'deep-creek'; regional2 = 'mountain-maryland'
    topId = 'regional-garrett-md-movers'; topName = 'Regional Oakland / Garrett County Providers'
    topDesc = 'Reliable movers serving Garrett County residential needs across Oakland, Deep Creek Lake, and mountain Maryland communities.'
    countyMovingName = 'Garrett County Moving'; regional1Name = 'Deep Creek Moving'; regional2Name = 'Mountain Maryland Moving'
    franchise = $false
  },
  @{
    slug = 'somerset'; city = 'Princess Anne'; citySlug = 'princess-anne'; label = 'Princess Anne Metro'; poolId = 'somerset-metro-md'
    regional1 = 'lower-eastern-shore'; regional2 = 'crisfield-corridor'
    topId = 'regional-somerset-md-movers'; topName = 'Regional Princess Anne / Somerset County Providers'
    topDesc = 'Reliable movers serving Somerset County residential needs across Princess Anne and Lower Eastern Shore communities.'
    countyMovingName = 'Somerset County Moving'; regional1Name = 'Lower Eastern Shore Moving'; regional2Name = 'Crisfield Corridor Moving'
    franchise = $false
  },
  @{
    slug = 'kent'; city = 'Chestertown'; citySlug = 'chestertown'; label = 'Chestertown Metro'; poolId = 'kent-metro-md'
    regional1 = 'upper-eastern-shore'; regional2 = 'chester-river'
    topId = 'regional-kent-md-movers'; topName = 'Regional Chestertown / Kent County Providers'
    topDesc = 'Reliable movers serving Kent County residential needs across Chestertown and Upper Eastern Shore communities.'
    countyMovingName = 'Kent County Moving'; regional1Name = 'Upper Eastern Shore Moving'; regional2Name = 'Chester River Moving'
    franchise = $false
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
  $topReviews = if ($c.franchise) { 1840 } else { 280 }
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

  $topBbb = if ($c.franchise) { 'A+' } else { 'A' }
  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $topSpecs = if ($c.franchise) { "['Residential', 'Commercial']" } else { "['Residential']" }

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=$topReviews; desc=$c.topDesc; services=$topServices; specialties=$topSpecs; bbb=$topBbb; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Maryland communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Maryland neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
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
Write-Host 'Generated 150 catalog entries, 15 metro pools for Maryland batch 3'