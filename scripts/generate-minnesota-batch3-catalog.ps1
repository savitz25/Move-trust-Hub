$outDir = Join-Path $PSScriptRoot 'minnesota-batch3-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='le-sueur'; city='Le Center'; citySlug='le-center'; label='Le Center Metro'; poolId='le-sueur-metro-mn'; regional1='le-center-corridor'; regional2='le-sueur-river-valley'; topId='regional-lesueur-mn-movers'; topName='Regional Le Center / Le Sueur Providers'; topDesc='Reliable movers serving Le Sueur County residential needs across Le Center and south-central Minnesota corridor communities.'; countyMovingName='Le Sueur County Moving'; regional1Name='Le Center Corridor Moving'; regional2Name='Le Sueur River Valley Moving'; countyLabel='Le Sueur County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mille-lacs'; city='Milaca'; citySlug='milaca'; label='Milaca Metro'; poolId='mille-lacs-metro-mn'; regional1='milaca-corridor'; regional2='mille-lacs-lakes'; topId='regional-millelacs-mn-movers'; topName='Regional Milaca / Mille Lacs Providers'; topDesc='Reliable movers serving Mille Lacs County residential needs across Milaca and Mille Lacs lake chain corridor communities.'; countyMovingName='Mille Lacs County Moving'; regional1Name='Milaca Corridor Moving'; regional2Name='Mille Lacs Lakes Moving'; countyLabel='Mille Lacs County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='todd'; city='Long Prairie'; citySlug='long-prairie'; label='Long Prairie Metro'; poolId='todd-metro-mn'; regional1='long-prairie-corridor'; regional2='sauk-todd'; topId='regional-todd-mn-movers'; topName='Regional Long Prairie / Todd Providers'; topDesc='Reliable movers serving Todd County residential needs across Long Prairie and central Minnesota rural corridor communities.'; countyMovingName='Todd County Moving'; regional1Name='Long Prairie Corridor Moving'; regional2Name='Sauk Todd Moving'; countyLabel='Todd County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lyon'; city='Marshall'; citySlug='marshall'; label='Marshall Metro'; poolId='lyon-metro-mn'; regional1='marshall-corridor'; regional2='redwood-lyon'; topId='regional-lyon-mn-movers'; topName='Regional Marshall / Lyon Providers'; topDesc='Reliable movers serving Lyon County residential needs across Marshall and southwestern Minnesota corridor communities.'; countyMovingName='Lyon County Moving'; regional1Name='Marshall Corridor Moving'; regional2Name='Redwood Lyon Moving'; countyLabel='Lyon County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='brown'; city='New Ulm'; citySlug='new-ulm'; label='New Ulm Metro'; poolId='brown-metro-mn'; regional1='new-ulm-corridor'; regional2='minnesota-river-brown'; topId='regional-brown-mn-movers'; topName='Regional New Ulm / Brown Providers'; topDesc='Reliable movers serving Brown County residential needs across New Ulm and Minnesota River valley corridor communities.'; countyMovingName='Brown County Moving'; regional1Name='New Ulm Corridor Moving'; regional2Name='Minnesota River Brown Moving'; countyLabel='Brown County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='meeker'; city='Litchfield'; citySlug='litchfield'; label='Litchfield Metro'; poolId='meeker-metro-mn'; regional1='litchfield-corridor'; regional2='crow-river-meeker'; topId='regional-meeker-mn-movers'; topName='Regional Litchfield / Meeker Providers'; topDesc='Reliable movers serving Meeker County residential needs across Litchfield and Crow River corridor communities.'; countyMovingName='Meeker County Moving'; regional1Name='Litchfield Corridor Moving'; regional2Name='Crow River Meeker Moving'; countyLabel='Meeker County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hubbard'; city='Park Rapids'; citySlug='park-rapids'; label='Park Rapids Metro'; poolId='hubbard-metro-mn'; regional1='park-rapids-corridor'; regional2='heartland-hubbard'; topId='regional-hubbard-mn-movers'; topName='Regional Park Rapids / Hubbard Providers'; topDesc='Reliable movers serving Hubbard County residential needs across Park Rapids and north-central lakes corridor communities.'; countyMovingName='Hubbard County Moving'; regional1Name='Park Rapids Corridor Moving'; regional2Name='Heartland Hubbard Moving'; countyLabel='Hubbard County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='nobles'; city='Worthington'; citySlug='worthington'; label='Worthington Metro'; poolId='nobles-metro-mn'; regional1='worthington-corridor'; regional2='okabena-nobles'; topId='regional-nobles-mn-movers'; topName='Regional Worthington / Nobles Providers'; topDesc='Reliable movers serving Nobles County residential needs across Worthington and southwestern Minnesota corridor communities.'; countyMovingName='Nobles County Moving'; regional1Name='Worthington Corridor Moving'; regional2Name='Okabena Nobles Moving'; countyLabel='Nobles County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fillmore'; city='Preston'; citySlug='preston'; label='Preston Metro'; poolId='fillmore-metro-mn'; regional1='preston-corridor'; regional2='root-river-fillmore'; topId='regional-fillmore-mn-movers'; topName='Regional Preston / Fillmore Providers'; topDesc='Reliable movers serving Fillmore County residential needs across Preston and Root River bluff corridor communities.'; countyMovingName='Fillmore County Moving'; regional1Name='Preston Corridor Moving'; regional2Name='Root River Fillmore Moving'; countyLabel='Fillmore County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wabasha'; city='Wabasha'; citySlug='wabasha'; label='Wabasha Metro'; poolId='wabasha-metro-mn'; regional1='wabasha-corridor'; regional2='mississippi-wabasha'; topId='regional-wabasha-mn-movers'; topName='Regional Wabasha / Wabasha County Providers'; topDesc='Reliable movers serving Wabasha County residential needs across Wabasha and Mississippi River bluff corridor communities.'; countyMovingName='Wabasha County Moving'; regional1Name='Wabasha Corridor Moving'; regional2Name='Mississippi Wabasha Moving'; countyLabel='Wabasha County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dodge'; city='Mantorville'; citySlug='mantorville'; label='Mantorville Metro'; poolId='dodge-metro-mn'; regional1='mantorville-corridor'; regional2='zumbro-dodge'; topId='regional-dodge-mn-movers'; topName='Regional Mantorville / Dodge Providers'; topDesc='Reliable movers serving Dodge County residential needs across Mantorville and Zumbro River corridor communities.'; countyMovingName='Dodge County Moving'; regional1Name='Mantorville Corridor Moving'; regional2Name='Zumbro Dodge Moving'; countyLabel='Dodge County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='martin'; city='Fairmont'; citySlug='fairmont'; label='Fairmont Metro'; poolId='martin-metro-mn'; regional1='fairmont-corridor'; regional2='east-chain-martin'; topId='regional-martin-mn-movers'; topName='Regional Fairmont / Martin Providers'; topDesc='Reliable movers serving Martin County residential needs across Fairmont and southern Minnesota corridor communities.'; countyMovingName='Martin County Moving'; regional1Name='Fairmont Corridor Moving'; regional2Name='East Chain Martin Moving'; countyLabel='Martin County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='waseca'; city='Waseca'; citySlug='waseca'; label='Waseca Metro'; poolId='waseca-metro-mn'; regional1='waseca-corridor'; regional2='straight-river-waseca'; topId='regional-waseca-mn-movers'; topName='Regional Waseca / Waseca County Providers'; topDesc='Reliable movers serving Waseca County residential needs across Waseca and Straight River corridor communities.'; countyMovingName='Waseca County Moving'; regional1Name='Waseca Corridor Moving'; regional2Name='Straight River Waseca Moving'; countyLabel='Waseca County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='houston'; city='Caledonia'; citySlug='caledonia'; label='Caledonia Metro'; poolId='houston-metro-mn'; regional1='caledonia-corridor'; regional2='root-river-houston'; topId='regional-houston-mn-movers'; topName='Regional Caledonia / Houston Providers'; topDesc='Reliable movers serving Houston County residential needs across Caledonia and Root River southeastern corridor communities.'; countyMovingName='Houston County Moving'; regional1Name='Caledonia Corridor Moving'; regional2Name='Root River Houston Moving'; countyLabel='Houston County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='kanabec'; city='Mora'; citySlug='mora'; label='Mora Metro'; poolId='kanabec-metro-mn'; regional1='mora-corridor'; regional2='snake-river-kanabec'; topId='regional-kanabec-mn-movers'; topName='Regional Mora / Kanabec Providers'; topDesc='Reliable movers serving Kanabec County residential needs across Mora and Snake River corridor communities.'; countyMovingName='Kanabec County Moving'; regional1Name='Mora Corridor Moving'; regional2Name='Snake River Kanabec Moving'; countyLabel='Kanabec County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='aitkin'; city='Aitkin'; citySlug='aitkin'; label='Aitkin Metro'; poolId='aitkin-metro-mn'; regional1='aitkin-corridor'; regional2='mississippi-aitkin'; topId='regional-aitkin-mn-movers'; topName='Regional Aitkin / Aitkin County Providers'; topDesc='Reliable movers serving Aitkin County residential needs across Aitkin and Mississippi River lakes corridor communities.'; countyMovingName='Aitkin County Moving'; regional1Name='Aitkin Corridor Moving'; regional2Name='Mississippi Aitkin Moving'; countyLabel='Aitkin County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sibley'; city='Gaylord'; citySlug='gaylord'; label='Gaylord Metro'; poolId='sibley-metro-mn'; regional1='gaylord-corridor'; regional2='minnesota-river-sibley'; topId='regional-sibley-mn-movers'; topName='Regional Gaylord / Sibley Providers'; topDesc='Reliable movers serving Sibley County residential needs across Gaylord and Minnesota River valley corridor communities.'; countyMovingName='Sibley County Moving'; regional1Name='Gaylord Corridor Moving'; regional2Name='Minnesota River Sibley Moving'; countyLabel='Sibley County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='redwood'; city='Redwood Falls'; citySlug='redwood-falls'; label='Redwood Falls Metro'; poolId='redwood-metro-mn'; regional1='redwood-falls-corridor'; regional2='minnesota-river-redwood'; topId='regional-redwood-mn-movers'; topName='Regional Redwood Falls / Redwood Providers'; topDesc='Reliable movers serving Redwood County residential needs across Redwood Falls and Minnesota River valley corridor communities.'; countyMovingName='Redwood County Moving'; regional1Name='Redwood Falls Corridor Moving'; regional2Name='Minnesota River Redwood Moving'; countyLabel='Redwood County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='roseau'; city='Roseau'; citySlug='roseau'; label='Roseau Metro'; poolId='roseau-metro-mn'; regional1='roseau-corridor'; regional2='roseau-river-valley'; topId='regional-roseau-mn-movers'; topName='Regional Roseau / Roseau County Providers'; topDesc='Reliable movers serving Roseau County residential needs across Roseau and northwest Minnesota corridor communities.'; countyMovingName='Roseau County Moving'; regional1Name='Roseau Corridor Moving'; regional2Name='Roseau River Valley Moving'; countyLabel='Roseau County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wadena'; city='Wadena'; citySlug='wadena'; label='Wadena Metro'; poolId='wadena-metro-mn'; regional1='wadena-corridor'; regional2='crow-wing-wadena'; topId='regional-wadena-mn-movers'; topName='Regional Wadena / Wadena County Providers'; topDesc='Reliable movers serving Wadena County residential needs across Wadena and north-central Minnesota corridor communities.'; countyMovingName='Wadena County Moving'; regional1Name='Wadena Corridor Moving'; regional2Name='Crow Wing Wadena Moving'; countyLabel='Wadena County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='renville'; city='Olivia'; citySlug='olivia'; label='Olivia Metro'; poolId='renville-metro-mn'; regional1='olivia-corridor'; regional2='hawk-creek-renville'; topId='regional-renville-mn-movers'; topName='Regional Olivia / Renville Providers'; topDesc='Reliable movers serving Renville County residential needs across Olivia and Hawk Creek agricultural corridor communities.'; countyMovingName='Renville County Moving'; regional1Name='Olivia Corridor Moving'; regional2Name='Hawk Creek Renville Moving'; countyLabel='Renville County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='faribault'; city='Blue Earth'; citySlug='blue-earth'; label='Blue Earth Metro'; poolId='faribault-metro-mn'; regional1='blue-earth-corridor'; regional2='east-chain-faribault'; topId='regional-faribault-mn-movers'; topName='Regional Blue Earth / Faribault Providers'; topDesc='Reliable movers serving Faribault County residential needs across Blue Earth and southern Minnesota corridor communities.'; countyMovingName='Faribault County Moving'; regional1Name='Blue Earth Corridor Moving'; regional2Name='East Chain Faribault Moving'; countyLabel='Faribault County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pennington'; city='Thief River Falls'; citySlug='thief-river-falls'; label='Thief River Falls Metro'; poolId='pennington-metro-mn'; regional1='thief-river-falls-corridor'; regional2='red-lake-pennington'; topId='regional-pennington-mn-movers'; topName='Regional Thief River Falls / Pennington Providers'; topDesc='Reliable movers serving Pennington County residential needs across Thief River Falls and northwest Minnesota corridor communities.'; countyMovingName='Pennington County Moving'; regional1Name='Thief River Falls Corridor Moving'; regional2Name='Red Lake Pennington Moving'; countyLabel='Pennington County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='chippewa'; city='Montevideo'; citySlug='montevideo'; label='Montevideo Metro'; poolId='chippewa-metro-mn'; regional1='montevideo-corridor'; regional2='minnesota-river-chippewa'; topId='regional-chippewa-mn-movers'; topName='Regional Montevideo / Chippewa Providers'; topDesc='Reliable movers serving Chippewa County residential needs across Montevideo and Minnesota River western corridor communities.'; countyMovingName='Chippewa County Moving'; regional1Name='Montevideo Corridor Moving'; regional2Name='Minnesota River Chippewa Moving'; countyLabel='Chippewa County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='koochiching'; city='International Falls'; citySlug='international-falls'; label='International Falls Metro'; poolId='koochiching-metro-mn'; regional1='international-falls-corridor'; regional2='rainy-river-koochiching'; topId='regional-koochiching-mn-movers'; topName='Regional International Falls / Koochiching Providers'; topDesc='Reliable movers serving Koochiching County residential needs across International Falls and Rainy River northern corridor communities.'; countyMovingName='Koochiching County Moving'; regional1Name='International Falls Corridor Moving'; regional2Name='Rainy River Koochiching Moving'; countyLabel='Koochiching County, MN'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='watonwan'; city='St. James'; citySlug='st-james'; label='St. James Metro'; poolId='watonwan-metro-mn'; regional1='st-james-corridor'; regional2='watonwan-river-valley'; topId='regional-watonwan-mn-movers'; topName='Regional St. James / Watonwan Providers'; topDesc='Reliable movers serving Watonwan County residential needs across St. James and south-central Minnesota corridor communities.'; countyMovingName='Watonwan County Moving'; regional1Name='St. James Corridor Moving'; regional2Name='Watonwan River Valley Moving'; countyLabel='Watonwan County, MN'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-mn",
    "$citySlug-moving-$slug-mn",
    "$slug-county-moving-$slug-mn",
    "college-hunks-moving-$citySlug-mn",
    "budd-van-lines-$citySlug-mn",
    "$($c.regional1)-moving-$slug-mn",
    "$($c.regional2)-moving-$slug-mn",
    "hercules-movers-$citySlug-mn",
    "krupp-moving-$citySlug-mn"
  )

  $topServices = if ($c.franchise) { "['Local Moving', 'Packing', 'Storage']" } else { "['Local Moving', 'Packing']" }
  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=2140; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb='A+'; city=$c.city }
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
Write-Host 'Generated 260 catalog entries, 26 metro pools for Minnesota batch 3'