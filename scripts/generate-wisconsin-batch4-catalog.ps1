$outDir = Join-Path $PSScriptRoot 'wisconsin-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='taylor'; city='Medford'; citySlug='medford'; label='Medford Metro'; poolId='taylor-metro-wi'; regional1='medford-corridor'; regional2='northwoods-taylor'; topId='regional-taylor-wi-movers'; topName='Regional Medford / Taylor Providers'; topDesc='Reliable movers serving Taylor County residential needs across Medford and north-central Wisconsin corridor communities.'; countyMovingName='Taylor County Moving'; regional1Name='Medford Corridor Moving'; regional2Name='Northwoods Taylor Moving'; countyLabel='Taylor County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='langlade'; city='Antigo'; citySlug='antigo'; label='Antigo Metro'; poolId='langlade-metro-wi'; regional1='antigo-corridor'; regional2='wolf-river-langlade'; topId='regional-langlade-wi-movers'; topName='Regional Antigo / Langlade Providers'; topDesc='Reliable movers serving Langlade County residential needs across Antigo and north-central Wisconsin corridor communities.'; countyMovingName='Langlade County Moving'; regional1Name='Antigo Corridor Moving'; regional2Name='Wolf River Langlade Moving'; countyLabel='Langlade County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='green-lake'; city='Green Lake'; citySlug='green-lake'; label='Green Lake Metro'; poolId='green-lake-metro-wi'; regional1='green-lake-corridor'; regional2='big-green-lake'; topId='regional-greenlake-wi-movers'; topName='Regional Green Lake / Green Lake County Providers'; topDesc='Reliable movers serving Green Lake County residential needs across Green Lake and lakes-country central Wisconsin corridor communities.'; countyMovingName='Green Lake County Moving'; regional1Name='Green Lake Corridor Moving'; regional2Name='Big Green Lake Moving'; countyLabel='Green Lake County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sawyer'; city='Hayward'; citySlug='hayward'; label='Hayward Metro'; poolId='sawyer-metro-wi'; regional1='hayward-corridor'; regional2='namakagon-sawyer'; topId='regional-sawyer-wi-movers'; topName='Regional Hayward / Sawyer Providers'; topDesc='Reliable movers serving Sawyer County residential needs across Hayward and northwoods lakes-country corridor communities.'; countyMovingName='Sawyer County Moving'; regional1Name='Hayward Corridor Moving'; regional2Name='Namakagon Sawyer Moving'; countyLabel='Sawyer County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lafayette'; city='Darlington'; citySlug='darlington'; label='Darlington Metro'; poolId='lafayette-metro-wi'; regional1='darlington-corridor'; regional2='driftless-lafayette'; topId='regional-lafayette-wi-movers'; topName='Regional Darlington / Lafayette Providers'; topDesc='Reliable movers serving Lafayette County residential needs across Darlington and Driftless Area southwestern Wisconsin corridor communities.'; countyMovingName='Lafayette County Moving'; regional1Name='Darlington Corridor Moving'; regional2Name='Driftless Lafayette Moving'; countyLabel='Lafayette County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='burnett'; city='Grantsburg'; citySlug='grantsburg'; label='Grantsburg Metro'; poolId='burnett-metro-wi'; regional1='grantsburg-corridor'; regional2='st-croix-burnett'; topId='regional-burnett-wi-movers'; topName='Regional Grantsburg / Burnett Providers'; topDesc='Reliable movers serving Burnett County residential needs across Grantsburg and northwest Wisconsin lakes-country corridor communities.'; countyMovingName='Burnett County Moving'; regional1Name='Grantsburg Corridor Moving'; regional2Name='St. Croix Burnett Moving'; countyLabel='Burnett County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='washburn'; city='Shell Lake'; citySlug='shell-lake'; label='Shell Lake Metro'; poolId='washburn-metro-wi'; regional1='shell-lake-corridor'; regional2='northwoods-washburn'; topId='regional-washburn-wi-movers'; topName='Regional Shell Lake / Washburn Providers'; topDesc='Reliable movers serving Washburn County residential needs across Shell Lake and northwest Wisconsin lakes-country corridor communities.'; countyMovingName='Washburn County Moving'; regional1Name='Shell Lake Corridor Moving'; regional2Name='Northwoods Washburn Moving'; countyLabel='Washburn County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='richland'; city='Richland Center'; citySlug='richland-center'; label='Richland Center Metro'; poolId='richland-metro-wi'; regional1='richland-center-corridor'; regional2='driftless-richland'; topId='regional-richland-wi-movers'; topName='Regional Richland Center / Richland Providers'; topDesc='Reliable movers serving Richland County residential needs across Richland Center and Driftless Area southwestern Wisconsin corridor communities.'; countyMovingName='Richland County Moving'; regional1Name='Richland Center Corridor Moving'; regional2Name='Driftless Richland Moving'; countyLabel='Richland County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bayfield'; city='Washburn'; citySlug='washburn'; label='Washburn Metro'; poolId='bayfield-metro-wi'; regional1='washburn-corridor'; regional2='apostle-bayfield'; topId='regional-bayfield-wi-movers'; topName='Regional Washburn / Bayfield Providers'; topDesc='Reliable movers serving Bayfield County residential needs across Washburn and Apostle Islands lakeshore northwoods corridor communities.'; countyMovingName='Bayfield County Moving'; regional1Name='Washburn Corridor Moving'; regional2Name='Apostle Bayfield Moving'; countyLabel='Bayfield County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ashland'; city='Ashland'; citySlug='ashland'; label='Ashland Metro'; poolId='ashland-metro-wi'; regional1='ashland-corridor'; regional2='lake-superior-ashland'; topId='regional-ashland-wi-movers'; topName='Regional Ashland / Ashland County Providers'; topDesc='Reliable movers serving Ashland County residential needs across Ashland and Lake Superior northwoods corridor communities.'; countyMovingName='Ashland County Moving'; regional1Name='Ashland Corridor Moving'; regional2Name='Lake Superior Ashland Moving'; countyLabel='Ashland County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marquette'; city='Montello'; citySlug='montello'; label='Montello Metro'; poolId='marquette-metro-wi'; regional1='montello-corridor'; regional2='fox-river-marquette'; topId='regional-marquette-wi-movers'; topName='Regional Montello / Marquette Providers'; topDesc='Reliable movers serving Marquette County residential needs across Montello and central Wisconsin rural corridor communities.'; countyMovingName='Marquette County Moving'; regional1Name='Montello Corridor Moving'; regional2Name='Fox River Marquette Moving'; countyLabel='Marquette County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='crawford'; city='Prairie du Chien'; citySlug='prairie-du-chien'; label='Prairie du Chien Metro'; poolId='crawford-metro-wi'; regional1='prairie-du-chien-corridor'; regional2='mississippi-crawford'; topId='regional-crawford-wi-movers'; topName='Regional Prairie du Chien / Crawford Providers'; topDesc='Reliable movers serving Crawford County residential needs across Prairie du Chien and Mississippi River southwestern Wisconsin corridor communities.'; countyMovingName='Crawford County Moving'; regional1Name='Prairie du Chien Corridor Moving'; regional2Name='Mississippi Crawford Moving'; countyLabel='Crawford County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='rusk'; city='Ladysmith'; citySlug='ladysmith'; label='Ladysmith Metro'; poolId='rusk-metro-wi'; regional1='ladysmith-corridor'; regional2='flambeau-rusk'; topId='regional-rusk-wi-movers'; topName='Regional Ladysmith / Rusk Providers'; topDesc='Reliable movers serving Rusk County residential needs across Ladysmith and northern Wisconsin corridor communities.'; countyMovingName='Rusk County Moving'; regional1Name='Ladysmith Corridor Moving'; regional2Name='Flambeau Rusk Moving'; countyLabel='Rusk County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='price'; city='Phillips'; citySlug='phillips'; label='Phillips Metro'; poolId='price-metro-wi'; regional1='phillips-corridor'; regional2='northwoods-price'; topId='regional-price-wi-movers'; topName='Regional Phillips / Price Providers'; topDesc='Reliable movers serving Price County residential needs across Phillips and northwoods Wisconsin corridor communities.'; countyMovingName='Price County Moving'; regional1Name='Phillips Corridor Moving'; regional2Name='Northwoods Price Moving'; countyLabel='Price County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='buffalo'; city='Alma'; citySlug='alma'; label='Alma Metro'; poolId='buffalo-metro-wi'; regional1='alma-corridor'; regional2='mississippi-bluff-buffalo'; topId='regional-buffalo-wi-movers'; topName='Regional Alma / Buffalo Providers'; topDesc='Reliable movers serving Buffalo County residential needs across Alma and Mississippi River bluff western Wisconsin corridor communities.'; countyMovingName='Buffalo County Moving'; regional1Name='Alma Corridor Moving'; regional2Name='Mississippi Bluff Buffalo Moving'; countyLabel='Buffalo County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='forest'; city='Crandon'; citySlug='crandon'; label='Crandon Metro'; poolId='forest-metro-wi'; regional1='crandon-corridor'; regional2='northwoods-forest'; topId='regional-forest-wi-movers'; topName='Regional Crandon / Forest Providers'; topDesc='Reliable movers serving Forest County residential needs across Crandon and northwoods lakes-country corridor communities.'; countyMovingName='Forest County Moving'; regional1Name='Crandon Corridor Moving'; regional2Name='Northwoods Forest Moving'; countyLabel='Forest County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pepin'; city='Durand'; citySlug='durand'; label='Durand Metro'; poolId='pepin-metro-wi'; regional1='durand-corridor'; regional2='chippewa-river-pepin'; topId='regional-pepin-wi-movers'; topName='Regional Durand / Pepin Providers'; topDesc='Reliable movers serving Pepin County residential needs across Durand and Chippewa River western Wisconsin corridor communities.'; countyMovingName='Pepin County Moving'; regional1Name='Durand Corridor Moving'; regional2Name='Chippewa River Pepin Moving'; countyLabel='Pepin County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='iron'; city='Hurley'; citySlug='hurley'; label='Hurley Metro'; poolId='iron-metro-wi'; regional1='hurley-corridor'; regional2='gogebic-range-iron'; topId='regional-iron-wi-movers'; topName='Regional Hurley / Iron Providers'; topDesc='Reliable movers serving Iron County residential needs across Hurley and Gogebic Range northern Wisconsin corridor communities.'; countyMovingName='Iron County Moving'; regional1Name='Hurley Corridor Moving'; regional2Name='Gogebic Range Iron Moving'; countyLabel='Iron County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='florence'; city='Florence'; citySlug='florence'; label='Florence Metro'; poolId='florence-metro-wi'; regional1='florence-corridor'; regional2='pine-river-florence'; topId='regional-florence-wi-movers'; topName='Regional Florence / Florence County Providers'; topDesc='Reliable movers serving Florence County residential needs across Florence and northeastern Wisconsin UP-border corridor communities.'; countyMovingName='Florence County Moving'; regional1Name='Florence Corridor Moving'; regional2Name='Pine River Florence Moving'; countyLabel='Florence County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='menominee'; city='Keshena'; citySlug='keshena'; label='Keshena Metro'; poolId='menominee-metro-wi'; regional1='keshena-corridor'; regional2='wolf-river-menominee'; topId='regional-menominee-wi-movers'; topName='Regional Keshena / Menominee Providers'; topDesc='Reliable movers serving Menominee County residential needs across Keshena and Wolf River northeastern Wisconsin corridor communities.'; countyMovingName='Menominee County Moving'; regional1Name='Keshena Corridor Moving'; regional2Name='Wolf River Menominee Moving'; countyLabel='Menominee County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clark'; city='Neillsville'; citySlug='neillsville'; label='Neillsville Metro'; poolId='clark-metro-wi'; regional1='neillsville-corridor'; regional2='black-river-clark'; topId='regional-clark-wi-movers'; topName='Regional Neillsville / Clark Providers'; topDesc='Reliable movers serving Clark County residential needs across Neillsville and central Wisconsin corridor communities.'; countyMovingName='Clark County Moving'; regional1Name='Neillsville Corridor Moving'; regional2Name='Black River Clark Moving'; countyLabel='Clark County, WI'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='vernon'; city='Viroqua'; citySlug='viroqua'; label='Viroqua Metro'; poolId='vernon-metro-wi'; regional1='viroqua-corridor'; regional2='driftless-vernon'; topId='regional-vernon-wi-movers'; topName='Regional Viroqua / Vernon Providers'; topDesc='Reliable movers serving Vernon County residential needs across Viroqua and Driftless Area western Wisconsin corridor communities.'; countyMovingName='Vernon County Moving'; regional1Name='Viroqua Corridor Moving'; regional2Name='Driftless Vernon Moving'; countyLabel='Vernon County, WI'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-wi",
    "$citySlug-moving-$slug-wi",
    "$slug-county-moving-$slug-wi",
    "college-hunks-moving-$citySlug-wi",
    "budd-van-lines-$citySlug-wi",
    "$($c.regional1)-moving-$slug-wi",
    "$($c.regional2)-moving-$slug-wi",
    "hercules-movers-$citySlug-wi",
    "krupp-moving-$citySlug-wi"
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
Write-Host 'Generated 220 catalog entries, 22 metro pools for Wisconsin batch 4 (72/72 complete)'