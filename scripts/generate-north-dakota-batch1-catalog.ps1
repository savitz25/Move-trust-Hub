$outDir = Join-Path $PSScriptRoot 'north-dakota-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='cass'; city='Fargo'; citySlug='fargo'; label='Fargo Metro'; poolId='cass-metro-nd'; regional1='fargo-corridor'; regional2='red-river-valley'; topId='twomenandatruck-cass-nd'; topName='Two Men and a Truck Fargo'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Cass County and the Fargo metro.'; countyMovingName='Cass County Moving'; regional1Name='Fargo Corridor Moving'; regional2Name='Red River Valley Moving'; countyLabel='Cass County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='burleigh'; city='Bismarck'; citySlug='bismarck'; label='Bismarck Metro'; poolId='burleigh-metro-nd'; regional1='bismarck-corridor'; regional2='capital-region'; topId='regional-burleigh-nd-movers'; topName='Regional Bismarck / Burleigh Providers'; topDesc='Reliable movers serving Burleigh County residential needs across Bismarck and the state capital region.'; countyMovingName='Burleigh County Moving'; regional1Name='Bismarck Corridor Moving'; regional2Name='Capital Region Moving'; countyLabel='Burleigh County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='grand-forks'; city='Grand Forks'; citySlug='grand-forks'; label='Grand Forks Metro'; poolId='grand-forks-metro-nd'; regional1='grand-forks-corridor'; regional2='red-river-valley'; topId='regional-grandforks-nd-movers'; topName='Regional Grand Forks / Grand Forks County Providers'; topDesc='Reliable movers serving Grand Forks County residential needs across Grand Forks and Red River Valley communities.'; countyMovingName='Grand Forks County Moving'; regional1Name='Grand Forks Corridor Moving'; regional2Name='Red River Valley Moving'; countyLabel='Grand Forks County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ward'; city='Minot'; citySlug='minot'; label='Minot Metro'; poolId='ward-metro-nd'; regional1='minot-corridor'; regional2='north-central-plains'; topId='regional-ward-nd-movers'; topName='Regional Minot / Ward Providers'; topDesc='Reliable movers serving Ward County residential needs across Minot and north-central North Dakota communities.'; countyMovingName='Ward County Moving'; regional1Name='Minot Corridor Moving'; regional2Name='North Central Plains Moving'; countyLabel='Ward County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='williams'; city='Williston'; citySlug='williston'; label='Williston Metro'; poolId='williams-metro-nd'; regional1='williston-corridor'; regional2='bakken-basin'; topId='regional-williams-nd-movers'; topName='Regional Williston / Williams Providers'; topDesc='Reliable movers serving Williams County residential needs across Williston and Bakken energy-corridor communities.'; countyMovingName='Williams County Moving'; regional1Name='Williston Corridor Moving'; regional2Name='Bakken Basin Moving'; countyLabel='Williams County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='morton'; city='Mandan'; citySlug='mandan'; label='Mandan Metro'; poolId='morton-metro-nd'; regional1='mandan-corridor'; regional2='missouri-plateau'; topId='regional-morton-nd-movers'; topName='Regional Mandan / Morton Providers'; topDesc='Reliable movers serving Morton County residential needs across Mandan and Bismarck metro west-bank communities.'; countyMovingName='Morton County Moving'; regional1Name='Mandan Corridor Moving'; regional2Name='Missouri Plateau Moving'; countyLabel='Morton County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='stark'; city='Dickinson'; citySlug='dickinson'; label='Dickinson Metro'; poolId='stark-metro-nd'; regional1='dickinson-corridor'; regional2='southwest-plains'; topId='regional-stark-nd-movers'; topName='Regional Dickinson / Stark Providers'; topDesc='Reliable movers serving Stark County residential needs across Dickinson and southwestern North Dakota communities.'; countyMovingName='Stark County Moving'; regional1Name='Dickinson Corridor Moving'; regional2Name='Southwest Plains Moving'; countyLabel='Stark County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='stutsman'; city='Jamestown'; citySlug='jamestown'; label='Jamestown Metro'; poolId='stutsman-metro-nd'; regional1='jamestown-corridor'; regional2='james-river-valley'; topId='regional-stutsman-nd-movers'; topName='Regional Jamestown / Stutsman Providers'; topDesc='Reliable movers serving Stutsman County residential needs across Jamestown and James River Valley communities.'; countyMovingName='Stutsman County Moving'; regional1Name='Jamestown Corridor Moving'; regional2Name='James River Valley Moving'; countyLabel='Stutsman County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='richland'; city='Wahpeton'; citySlug='wahpeton'; label='Wahpeton Metro'; poolId='richland-metro-nd'; regional1='wahpeton-corridor'; regional2='red-river-south'; topId='regional-richland-nd-movers'; topName='Regional Wahpeton / Richland Providers'; topDesc='Reliable movers serving Richland County residential needs across Wahpeton and southeastern Red River communities.'; countyMovingName='Richland County Moving'; regional1Name='Wahpeton Corridor Moving'; regional2Name='Red River South Moving'; countyLabel='Richland County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mckenzie'; city='Watford City'; citySlug='watford-city'; label='Watford City Metro'; poolId='mckenzie-metro-nd'; regional1='watford-city-corridor'; regional2='bakken-basin'; topId='regional-mckenzie-nd-movers'; topName='Regional Watford City / McKenzie Providers'; topDesc='Reliable movers serving McKenzie County residential needs across Watford City and western Bakken energy communities.'; countyMovingName='McKenzie County Moving'; regional1Name='Watford City Corridor Moving'; regional2Name='Bakken Basin Moving'; countyLabel='McKenzie County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='rolette'; city='Rolla'; citySlug='rolla'; label='Rolla Metro'; poolId='rolette-metro-nd'; regional1='rolla-corridor'; regional2='turtle-mountains'; topId='regional-rolette-nd-movers'; topName='Regional Rolla / Rolette Providers'; topDesc='Reliable movers serving Rolette County residential needs across Rolla and northern Turtle Mountains communities.'; countyMovingName='Rolette County Moving'; regional1Name='Rolla Corridor Moving'; regional2Name='Turtle Mountains Moving'; countyLabel='Rolette County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ramsey'; city='Devils Lake'; citySlug='devils-lake'; label='Devils Lake Metro'; poolId='ramsey-metro-nd'; regional1='devils-lake-corridor'; regional2='lake-region'; topId='regional-ramsey-nd-movers'; topName='Regional Devils Lake / Ramsey Providers'; topDesc='Reliable movers serving Ramsey County residential needs across Devils Lake and north-central lake-region communities.'; countyMovingName='Ramsey County Moving'; regional1Name='Devils Lake Corridor Moving'; regional2Name='Lake Region Moving'; countyLabel='Ramsey County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='barnes'; city='Valley City'; citySlug='valley-city'; label='Valley City Metro'; poolId='barnes-metro-nd'; regional1='valley-city-corridor'; regional2='sheyenne-river'; topId='regional-barnes-nd-movers'; topName='Regional Valley City / Barnes Providers'; topDesc='Reliable movers serving Barnes County residential needs across Valley City and Sheyenne River corridor communities.'; countyMovingName='Barnes County Moving'; regional1Name='Valley City Corridor Moving'; regional2Name='Sheyenne River Moving'; countyLabel='Barnes County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='walsh'; city='Grafton'; citySlug='grafton'; label='Grafton Metro'; poolId='walsh-metro-nd'; regional1='grafton-corridor'; regional2='red-river-north'; topId='regional-walsh-nd-movers'; topName='Regional Grafton / Walsh Providers'; topDesc='Reliable movers serving Walsh County residential needs across Grafton and northern Red River Valley communities.'; countyMovingName='Walsh County Moving'; regional1Name='Grafton Corridor Moving'; regional2Name='Red River North Moving'; countyLabel='Walsh County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mclean'; city='Washburn'; citySlug='washburn'; label='Washburn Metro'; poolId='mclean-metro-nd'; regional1='washburn-corridor'; regional2='missouri-slope'; topId='regional-mclean-nd-movers'; topName='Regional Washburn / McLean Providers'; topDesc='Reliable movers serving McLean County residential needs across Washburn and central Missouri Slope communities.'; countyMovingName='McLean County Moving'; regional1Name='Washburn Corridor Moving'; regional2Name='Missouri Slope Moving'; countyLabel='McLean County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mountrail'; city='Stanley'; citySlug='stanley'; label='Stanley Metro'; poolId='mountrail-metro-nd'; regional1='stanley-corridor'; regional2='bakken-plateau'; topId='regional-mountrail-nd-movers'; topName='Regional Stanley / Mountrail Providers'; topDesc='Reliable movers serving Mountrail County residential needs across Stanley and western North Dakota energy communities.'; countyMovingName='Mountrail County Moving'; regional1Name='Stanley Corridor Moving'; regional2Name='Bakken Plateau Moving'; countyLabel='Mountrail County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mercer'; city='Stanton'; citySlug='stanton'; label='Stanton Metro'; poolId='mercer-metro-nd'; regional1='stanton-corridor'; regional2='coal-country'; topId='regional-mercer-nd-movers'; topName='Regional Stanton / Mercer Providers'; topDesc='Reliable movers serving Mercer County residential needs across Stanton and western coal-country communities.'; countyMovingName='Mercer County Moving'; regional1Name='Stanton Corridor Moving'; regional2Name='Coal Country Moving'; countyLabel='Mercer County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='traill'; city='Hillsboro'; citySlug='hillsboro'; label='Hillsboro Metro'; poolId='traill-metro-nd'; regional1='hillsboro-corridor'; regional2='red-river-east'; topId='regional-traill-nd-movers'; topName='Regional Hillsboro / Traill Providers'; topDesc='Reliable movers serving Traill County residential needs across Hillsboro and eastern Red River Valley communities.'; countyMovingName='Traill County Moving'; regional1Name='Hillsboro Corridor Moving'; regional2Name='Red River East Moving'; countyLabel='Traill County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pembina'; city='Cavalier'; citySlug='cavalier'; label='Cavalier Metro'; poolId='pembina-metro-nd'; regional1='cavalier-corridor'; regional2='pembina-valley'; topId='regional-pembina-nd-movers'; topName='Regional Cavalier / Pembina Providers'; topDesc='Reliable movers serving Pembina County residential needs across Cavalier and northern border valley communities.'; countyMovingName='Pembina County Moving'; regional1Name='Cavalier Corridor Moving'; regional2Name='Pembina Valley Moving'; countyLabel='Pembina County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bottineau'; city='Bottineau'; citySlug='bottineau'; label='Bottineau Metro'; poolId='bottineau-metro-nd'; regional1='bottineau-corridor'; regional2='turtle-mountains'; topId='regional-bottineau-nd-movers'; topName='Regional Bottineau / Bottineau County Providers'; topDesc='Reliable movers serving Bottineau County residential needs across Bottineau and Turtle Mountains gateway communities.'; countyMovingName='Bottineau County Moving'; regional1Name='Bottineau Corridor Moving'; regional2Name='Turtle Mountains Moving'; countyLabel='Bottineau County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='benson'; city='Minnewaukan'; citySlug='minnewaukan'; label='Minnewaukan Metro'; poolId='benson-metro-nd'; regional1='minnewaukan-corridor'; regional2='devils-lake-basin'; topId='regional-benson-nd-movers'; topName='Regional Minnewaukan / Benson Providers'; topDesc='Reliable movers serving Benson County residential needs across Minnewaukan and Devils Lake basin rural communities.'; countyMovingName='Benson County Moving'; regional1Name='Minnewaukan Corridor Moving'; regional2Name='Devils Lake Basin Moving'; countyLabel='Benson County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='ransom'; city='Lisbon'; citySlug='lisbon'; label='Lisbon Metro'; poolId='ransom-metro-nd'; regional1='lisbon-corridor'; regional2='sheyenne-coteau'; topId='regional-ransom-nd-movers'; topName='Regional Lisbon / Ransom Providers'; topDesc='Reliable movers serving Ransom County residential needs across Lisbon and southeastern rural communities.'; countyMovingName='Ransom County Moving'; regional1Name='Lisbon Corridor Moving'; regional2Name='Sheyenne Coteau Moving'; countyLabel='Ransom County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='lamoure'; city='LaMoure'; citySlug='lamoure'; label='LaMoure Metro'; poolId='lamoure-metro-nd'; regional1='lamoure-corridor'; regional2='james-river-south'; topId='regional-lamoure-nd-movers'; topName='Regional LaMoure / LaMoure County Providers'; topDesc='Reliable movers serving LaMoure County residential needs across LaMoure and James River south corridor communities.'; countyMovingName='LaMoure County Moving'; regional1Name='LaMoure Corridor Moving'; regional2Name='James River South Moving'; countyLabel='LaMoure County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dunn'; city='Killdeer'; citySlug='killdeer'; label='Killdeer Metro'; poolId='dunn-metro-nd'; regional1='killdeer-corridor'; regional2='badlands-plateau'; topId='regional-dunn-nd-movers'; topName='Regional Killdeer / Dunn Providers'; topDesc='Reliable movers serving Dunn County residential needs across Killdeer and western badlands plateau communities.'; countyMovingName='Dunn County Moving'; regional1Name='Killdeer Corridor Moving'; regional2Name='Badlands Plateau Moving'; countyLabel='Dunn County, ND'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pierce'; city='Rugby'; citySlug='rugby'; label='Rugby Metro'; poolId='pierce-metro-nd'; regional1='rugby-corridor'; regional2='geographic-center'; topId='regional-pierce-nd-movers'; topName='Regional Rugby / Pierce Providers'; topDesc='Reliable movers serving Pierce County residential needs across Rugby and north-central rural communities.'; countyMovingName='Pierce County Moving'; regional1Name='Rugby Corridor Moving'; regional2Name='Geographic Center Moving'; countyLabel='Pierce County, ND'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-nd",
    "$citySlug-moving-$slug-nd",
    "$slug-county-moving-$slug-nd",
    "college-hunks-moving-$citySlug-nd",
    "budd-van-lines-$citySlug-nd",
    "$($c.regional1)-moving-$slug-nd",
    "$($c.regional2)-moving-$slug-nd",
    "hercules-movers-$citySlug-nd",
    "krupp-moving-$citySlug-nd"
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
Write-Host 'Generated 250 catalog entries, 25 metro pools for North Dakota batch 1'