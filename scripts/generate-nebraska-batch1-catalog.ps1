$outDir = Join-Path $PSScriptRoot 'nebraska-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='douglas'; city='Omaha'; citySlug='omaha'; label='Omaha Metro'; poolId='douglas-metro-ne'; regional1='omaha-corridor'; regional2='platte-river-east'; topId='twomenandatruck-douglas-ne'; topName='Two Men and a Truck Omaha'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Omaha and Douglas County metro communities.'; countyMovingName='Douglas County Moving'; regional1Name='Omaha Corridor Moving'; regional2Name='Platte River East Moving'; countyLabel='Douglas County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='lancaster'; city='Lincoln'; citySlug='lincoln'; label='Lincoln Metro'; poolId='lancaster-metro-ne'; regional1='lincoln-corridor'; regional2='salt-creek-valley'; topId='twomenandatruck-lancaster-ne'; topName='Two Men and a Truck Lincoln'; topDesc='Trusted local franchise with excellent reputation for residential moves across Lincoln and Lancaster County government and university communities.'; countyMovingName='Lancaster County Moving'; regional1Name='Lincoln Corridor Moving'; regional2Name='Salt Creek Valley Moving'; countyLabel='Lancaster County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='sarpy'; city='Papillion'; citySlug='papillion'; label='Omaha Metro'; poolId='sarpy-metro-ne'; regional1='papillion-corridor'; regional2='omaha-south'; topId='regional-sarpy-ne-movers'; topName='Regional Papillion / Sarpy Providers'; topDesc='Reliable movers serving Sarpy County residential needs across Papillion, Bellevue, and Omaha metro south communities.'; countyMovingName='Sarpy County Moving'; regional1Name='Papillion Corridor Moving'; regional2Name='Omaha South Moving'; countyLabel='Sarpy County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hall'; city='Grand Island'; citySlug='grand-island'; label='Grand Island Metro'; poolId='hall-metro-ne'; regional1='grand-island-corridor'; regional2='platte-valley-central'; topId='regional-hall-ne-movers'; topName='Regional Grand Island / Hall Providers'; topDesc='Reliable movers serving Hall County residential needs across Grand Island and central Platte Valley communities.'; countyMovingName='Hall County Moving'; regional1Name='Grand Island Corridor Moving'; regional2Name='Platte Valley Central Moving'; countyLabel='Hall County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='buffalo'; city='Kearney'; citySlug='kearney'; label='Kearney Metro'; poolId='buffalo-metro-ne'; regional1='kearney-corridor'; regional2='platte-valley-mid'; topId='regional-buffalo-ne-movers'; topName='Regional Kearney / Buffalo County Providers'; topDesc='Reliable movers serving Buffalo County residential needs across Kearney and central Nebraska corridor communities.'; countyMovingName='Buffalo County Moving'; regional1Name='Kearney Corridor Moving'; regional2Name='Platte Valley Mid Moving'; countyLabel='Buffalo County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dodge'; city='Fremont'; citySlug='fremont'; label='Fremont Metro'; poolId='dodge-metro-ne'; regional1='fremont-corridor'; regional2='elkhorn-river-east'; topId='regional-dodge-ne-movers'; topName='Regional Fremont / Dodge Providers'; topDesc='Reliable movers serving Dodge County residential needs across Fremont and eastern Elkhorn River corridor communities.'; countyMovingName='Dodge County Moving'; regional1Name='Fremont Corridor Moving'; regional2Name='Elkhorn River East Moving'; countyLabel='Dodge County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='madison'; city='Norfolk'; citySlug='norfolk'; label='Norfolk Metro'; poolId='madison-metro-ne'; regional1='norfolk-corridor'; regional2='elkhorn-valley-north'; topId='regional-madison-ne-movers'; topName='Regional Norfolk / Madison County Providers'; topDesc='Reliable movers serving Madison County residential needs across Norfolk and northeastern Elkhorn Valley communities.'; countyMovingName='Madison County Moving'; regional1Name='Norfolk Corridor Moving'; regional2Name='Elkhorn Valley North Moving'; countyLabel='Madison County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='platte'; city='Columbus'; citySlug='columbus'; label='Columbus Metro'; poolId='platte-metro-ne'; regional1='columbus-corridor'; regional2='loup-river-valley'; topId='regional-platte-ne-movers'; topName='Regional Columbus / Platte County Providers'; topDesc='Reliable movers serving Platte County residential needs across Columbus and Loup River valley corridor communities.'; countyMovingName='Platte County Moving'; regional1Name='Columbus Corridor Moving'; regional2Name='Loup River Valley Moving'; countyLabel='Platte County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='scotts-bluff'; city='Scottsbluff'; citySlug='scottsbluff'; label='Scottsbluff Metro'; poolId='scotts-bluff-metro-ne'; regional1='scottsbluff-corridor'; regional2='north-platte-valley-west'; topId='regional-scottsbluff-ne-movers'; topName='Regional Scottsbluff / Scotts Bluff Providers'; topDesc='Reliable movers serving Scotts Bluff County residential needs across Scottsbluff, Gering, and western Nebraska Panhandle communities.'; countyMovingName='Scotts Bluff County Moving'; regional1Name='Scottsbluff Corridor Moving'; regional2Name='North Platte Valley West Moving'; countyLabel='Scotts Bluff County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lincoln'; city='North Platte'; citySlug='north-platte'; label='North Platte Metro'; poolId='lincoln-metro-ne'; regional1='north-platte-corridor'; regional2='platte-valley-west'; topId='regional-lincoln-ne-movers'; topName='Regional North Platte / Lincoln County Providers'; topDesc='Reliable movers serving Lincoln County residential needs across North Platte and western Platte Valley corridor communities.'; countyMovingName='Lincoln County Moving'; regional1Name='North Platte Corridor Moving'; regional2Name='Platte Valley West Moving'; countyLabel='Lincoln County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='adams'; city='Hastings'; citySlug='hastings'; label='Hastings Metro'; poolId='adams-metro-ne'; regional1='hastings-corridor'; regional2='republican-river-valley'; topId='regional-adams-ne-movers'; topName='Regional Hastings / Adams County Providers'; topDesc='Reliable movers serving Adams County residential needs across Hastings and Republican River valley corridor communities.'; countyMovingName='Adams County Moving'; regional1Name='Hastings Corridor Moving'; regional2Name='Republican River Valley Moving'; countyLabel='Adams County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cass'; city='Plattsmouth'; citySlug='plattsmouth'; label='Omaha Metro'; poolId='cass-metro-ne'; regional1='plattsmouth-corridor'; regional2='missouri-river-south'; topId='regional-cass-ne-movers'; topName='Regional Plattsmouth / Cass County Providers'; topDesc='Reliable movers serving Cass County residential needs across Plattsmouth and Omaha metro Missouri River south communities.'; countyMovingName='Cass County Moving'; regional1Name='Plattsmouth Corridor Moving'; regional2Name='Missouri River South Moving'; countyLabel='Cass County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dawson'; city='Lexington'; citySlug='lexington'; label='Lexington Metro'; poolId='dawson-metro-ne'; regional1='lexington-corridor'; regional2='platte-valley-midwest'; topId='regional-dawson-ne-movers'; topName='Regional Lexington / Dawson Providers'; topDesc='Reliable movers serving Dawson County residential needs across Lexington and central Platte Valley midwest corridor communities.'; countyMovingName='Dawson County Moving'; regional1Name='Lexington Corridor Moving'; regional2Name='Platte Valley Midwest Moving'; countyLabel='Dawson County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='saunders'; city='Wahoo'; citySlug='wahoo'; label='Wahoo Metro'; poolId='saunders-metro-ne'; regional1='wahoo-corridor'; regional2='platte-river-mid'; topId='regional-saunders-ne-movers'; topName='Regional Wahoo / Saunders Providers'; topDesc='Reliable movers serving Saunders County residential needs across Wahoo and eastern Nebraska Platte River mid-corridor communities.'; countyMovingName='Saunders County Moving'; regional1Name='Wahoo Corridor Moving'; regional2Name='Platte River Mid Moving'; countyLabel='Saunders County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dakota'; city='Dakota City'; citySlug='dakota-city'; label='Sioux City Metro'; poolId='dakota-metro-ne'; regional1='dakota-city-corridor'; regional2='missouri-river-north'; topId='regional-dakota-ne-movers'; topName='Regional Dakota City / Dakota County Providers'; topDesc='Reliable movers serving Dakota County residential needs across Dakota City, South Sioux City, and Missouri River north corridor communities.'; countyMovingName='Dakota County Moving'; regional1Name='Dakota City Corridor Moving'; regional2Name='Missouri River North Moving'; countyLabel='Dakota County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='gage'; city='Beatrice'; citySlug='beatrice'; label='Beatrice Metro'; poolId='gage-metro-ne'; regional1='beatrice-corridor'; regional2='big-blue-valley'; topId='regional-gage-ne-movers'; topName='Regional Beatrice / Gage Providers'; topDesc='Reliable movers serving Gage County residential needs across Beatrice and Big Blue River valley corridor communities.'; countyMovingName='Gage County Moving'; regional1Name='Beatrice Corridor Moving'; regional2Name='Big Blue Valley Moving'; countyLabel='Gage County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='washington'; city='Blair'; citySlug='blair'; label='Omaha Metro'; poolId='washington-metro-ne'; regional1='blair-corridor'; regional2='elkhorn-river-north'; topId='regional-washington-ne-movers'; topName='Regional Blair / Washington County Providers'; topDesc='Reliable movers serving Washington County residential needs across Blair and Omaha metro Elkhorn River north communities.'; countyMovingName='Washington County Moving'; regional1Name='Blair Corridor Moving'; regional2Name='Elkhorn River North Moving'; countyLabel='Washington County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='seward'; city='Seward'; citySlug='seward'; label='Seward Metro'; poolId='seward-metro-ne'; regional1='seward-corridor'; regional2='big-blue-north'; topId='regional-seward-ne-movers'; topName='Regional Seward / Seward County Providers'; topDesc='Reliable movers serving Seward County residential needs across Seward and Big Blue River north corridor communities.'; countyMovingName='Seward County Moving'; regional1Name='Seward Corridor Moving'; regional2Name='Big Blue North Moving'; countyLabel='Seward County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='otoe'; city='Nebraska City'; citySlug='nebraska-city'; label='Nebraska City Metro'; poolId='otoe-metro-ne'; regional1='nebraska-city-corridor'; regional2='missouri-river-bluff'; topId='regional-otoe-ne-movers'; topName='Regional Nebraska City / Otoe Providers'; topDesc='Reliable movers serving Otoe County residential needs across Nebraska City and Missouri River bluff corridor communities.'; countyMovingName='Otoe County Moving'; regional1Name='Nebraska City Corridor Moving'; regional2Name='Missouri River Bluff Moving'; countyLabel='Otoe County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='saline'; city='Wilber'; citySlug='wilber'; label='Wilber Metro'; poolId='saline-metro-ne'; regional1='wilber-corridor'; regional2='big-blue-south'; topId='regional-saline-ne-movers'; topName='Regional Wilber / Saline County Providers'; topDesc='Reliable movers serving Saline County residential needs across Wilber and Big Blue River south rural corridor communities.'; countyMovingName='Saline County Moving'; regional1Name='Wilber Corridor Moving'; regional2Name='Big Blue South Moving'; countyLabel='Saline County, NE'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='york'; city='York'; citySlug='york'; label='York Metro'; poolId='york-metro-ne'; regional1='york-corridor'; regional2='blue-river-valley'; topId='regional-york-ne-movers'; topName='Regional York / York County Providers'; topDesc='Reliable movers serving York County residential needs across York and Blue River valley corridor communities.'; countyMovingName='York County Moving'; regional1Name='York Corridor Moving'; regional2Name='Blue River Valley Moving'; countyLabel='York County, NE'; franchise=$false; topSpecialties="['Residential']" }
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

foreach ($c in $counties) {
  $slug = $c.slug
  $citySlug = $c.citySlug
  $ids = @(
    $c.topId,
    "all-my-sons-$citySlug-ne",
    "$citySlug-moving-$slug-ne",
    "$slug-county-moving-$slug-ne",
    "college-hunks-moving-$citySlug-ne",
    "budd-van-lines-$citySlug-ne",
    "$($c.regional1)-moving-$slug-ne",
    "$($c.regional2)-moving-$slug-ne",
    "hercules-movers-$citySlug-ne",
    "krupp-moving-$citySlug-ne"
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
}

Set-Content (Join-Path $outDir 'catalog-movers.txt') ($allCatalog -join "`n") -Encoding UTF8
Set-Content (Join-Path $outDir 'metro-pools.txt') ($allPools -join "`n") -Encoding UTF8
Write-Host 'Generated 210 catalog entries, 21 metro pools for Nebraska batch 1'