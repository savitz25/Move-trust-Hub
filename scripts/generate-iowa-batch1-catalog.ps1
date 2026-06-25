$outDir = Join-Path $PSScriptRoot 'iowa-batch1-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='polk'; city='Des Moines'; citySlug='des-moines'; label='Des Moines Metro'; poolId='polk-metro-ia'; regional1='des-moines-corridor'; regional2='raccoon-river-valley'; topId='twomenandatruck-polk-ia'; topName='Two Men and a Truck Des Moines'; topDesc='Trusted local franchise with excellent reputation for residential and commercial moves across Des Moines and Polk County metro communities.'; countyMovingName='Polk County Moving'; regional1Name='Des Moines Corridor Moving'; regional2Name='Raccoon River Valley Moving'; countyLabel='Polk County'; franchise=$true; topSpecialties="['Residential', 'Commercial']" },
  @{ slug='linn'; city='Cedar Rapids'; citySlug='cedar-rapids'; label='Cedar Rapids Metro'; poolId='linn-metro-ia'; regional1='cedar-rapids-corridor'; regional2='cedar-river-valley'; topId='twomenandatruck-linn-ia'; topName='Two Men and a Truck Cedar Rapids'; topDesc='Trusted local franchise with excellent reputation for residential moves across Cedar Rapids and Linn County corridor communities.'; countyMovingName='Linn County Moving'; regional1Name='Cedar Rapids Corridor Moving'; regional2Name='Cedar River Valley Moving'; countyLabel='Linn County'; franchise=$true; topSpecialties="['Residential']" },
  @{ slug='scott'; city='Davenport'; citySlug='davenport'; label='Quad Cities Metro'; poolId='scott-metro-ia'; regional1='quad-cities-corridor'; regional2='mississippi-river-east'; topId='regional-scott-ia-movers'; topName='Regional Quad Cities / Scott Providers'; topDesc='Reliable movers serving Scott County residential needs across Davenport, Bettendorf, and Quad Cities Mississippi River corridor communities.'; countyMovingName='Scott County Moving'; regional1Name='Quad Cities Corridor Moving'; regional2Name='Mississippi River East Moving'; countyLabel='Scott County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='johnson'; city='Iowa City'; citySlug='iowa-city'; label='Iowa City Metro'; poolId='johnson-metro-ia'; regional1='iowa-city-corridor'; regional2='iowa-river-valley'; topId='regional-johnson-ia-movers'; topName='Regional Iowa City / Johnson Providers'; topDesc='Reliable movers serving Johnson County residential needs across Iowa City, Coralville, and University of Iowa corridor communities.'; countyMovingName='Johnson County Moving'; regional1Name='Iowa City Corridor Moving'; regional2Name='Iowa River Valley Moving'; countyLabel='Johnson County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='black-hawk'; city='Waterloo'; citySlug='waterloo'; label='Waterloo-Cedar Falls Metro'; poolId='black-hawk-metro-ia'; regional1='waterloo-corridor'; regional2='cedar-falls-valley'; topId='regional-blackhawk-ia-movers'; topName='Regional Waterloo / Black Hawk Providers'; topDesc='Reliable movers serving Black Hawk County residential needs across Waterloo, Cedar Falls, and Cedar Valley corridor communities.'; countyMovingName='Black Hawk County Moving'; regional1Name='Waterloo Corridor Moving'; regional2Name='Cedar Falls Valley Moving'; countyLabel='Black Hawk County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dallas'; city='Waukee'; citySlug='waukee'; label='Des Moines Metro'; poolId='dallas-metro-ia'; regional1='waukee-corridor'; regional2='raccoon-river-west'; topId='regional-dallas-ia-movers'; topName='Regional Waukee / Dallas Providers'; topDesc='Reliable movers serving Dallas County residential needs across Waukee, Adel, and Des Moines metro west suburban growth corridors.'; countyMovingName='Dallas County Moving'; regional1Name='Waukee Corridor Moving'; regional2Name='Raccoon River West Moving'; countyLabel='Dallas County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='woodbury'; city='Sioux City'; citySlug='sioux-city'; label='Sioux City Metro'; poolId='woodbury-metro-ia'; regional1='sioux-city-corridor'; regional2='missouri-river-northwest'; topId='regional-woodbury-ia-movers'; topName='Regional Sioux City / Woodbury Providers'; topDesc='Reliable movers serving Woodbury County residential needs across Sioux City and Missouri River northwest corridor communities.'; countyMovingName='Woodbury County Moving'; regional1Name='Sioux City Corridor Moving'; regional2Name='Missouri River Northwest Moving'; countyLabel='Woodbury County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='story'; city='Ames'; citySlug='ames'; label='Ames Metro'; poolId='story-metro-ia'; regional1='ames-corridor'; regional2='skunk-river-valley'; topId='regional-story-ia-movers'; topName='Regional Ames / Story Providers'; topDesc='Reliable movers serving Story County residential needs across Ames, Nevada, and Iowa State University corridor communities.'; countyMovingName='Story County Moving'; regional1Name='Ames Corridor Moving'; regional2Name='Skunk River Valley Moving'; countyLabel='Story County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dubuque'; city='Dubuque'; citySlug='dubuque'; label='Dubuque Metro'; poolId='dubuque-metro-ia'; regional1='dubuque-corridor'; regional2='mississippi-bluff-country'; topId='regional-dubuque-ia-movers'; topName='Regional Dubuque / Dubuque County Providers'; topDesc='Reliable movers serving Dubuque County residential needs across Dubuque and Mississippi River bluff corridor communities.'; countyMovingName='Dubuque County Moving'; regional1Name='Dubuque Corridor Moving'; regional2Name='Mississippi Bluff Country Moving'; countyLabel='Dubuque County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='pottawattamie'; city='Council Bluffs'; citySlug='council-bluffs'; label='Omaha-Council Bluffs Metro'; poolId='pottawattamie-metro-ia'; regional1='council-bluffs-corridor'; regional2='missouri-river-omaha'; topId='regional-pottawattamie-ia-movers'; topName='Regional Council Bluffs / Pottawattamie Providers'; topDesc='Reliable movers serving Pottawattamie County residential needs across Council Bluffs and Omaha metro Missouri River corridor communities.'; countyMovingName='Pottawattamie County Moving'; regional1Name='Council Bluffs Corridor Moving'; regional2Name='Missouri River Omaha Moving'; countyLabel='Pottawattamie County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='warren'; city='Indianola'; citySlug='indianola'; label='Des Moines Metro'; poolId='warren-metro-ia'; regional1='indianola-corridor'; regional2='des-moines-south'; topId='regional-warren-ia-movers'; topName='Regional Indianola / Warren Providers'; topDesc='Reliable movers serving Warren County residential needs across Indianola and Des Moines metro south suburban corridor communities.'; countyMovingName='Warren County Moving'; regional1Name='Indianola Corridor Moving'; regional2Name='Des Moines South Moving'; countyLabel='Warren County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clinton'; city='Clinton'; citySlug='clinton'; label='Clinton Metro'; poolId='clinton-metro-ia'; regional1='clinton-corridor'; regional2='mississippi-river-clinton'; topId='regional-clinton-ia-movers'; topName='Regional Clinton / Clinton County Providers'; topDesc='Reliable movers serving Clinton County residential needs across Clinton and Mississippi River east corridor communities.'; countyMovingName='Clinton County Moving'; regional1Name='Clinton Corridor Moving'; regional2Name='Mississippi River Clinton Moving'; countyLabel='Clinton County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cerro-gordo'; city='Mason City'; citySlug='mason-city'; label='Mason City Metro'; poolId='cerro-gordo-metro-ia'; regional1='mason-city-corridor'; regional2='winnebago-river-valley'; topId='regional-cerrogordo-ia-movers'; topName='Regional Mason City / Cerro Gordo Providers'; topDesc='Reliable movers serving Cerro Gordo County residential needs across Mason City and north-central Iowa corridor communities.'; countyMovingName='Cerro Gordo County Moving'; regional1Name='Mason City Corridor Moving'; regional2Name='Winnebago River Valley Moving'; countyLabel='Cerro Gordo County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='muscatine'; city='Muscatine'; citySlug='muscatine'; label='Muscatine Metro'; poolId='muscatine-metro-ia'; regional1='muscatine-corridor'; regional2='mississippi-river-muscatine'; topId='regional-muscatine-ia-movers'; topName='Regional Muscatine / Muscatine County Providers'; topDesc='Reliable movers serving Muscatine County residential needs across Muscatine and Mississippi River corridor communities.'; countyMovingName='Muscatine County Moving'; regional1Name='Muscatine Corridor Moving'; regional2Name='Mississippi River Muscatine Moving'; countyLabel='Muscatine County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marshall'; city='Marshalltown'; citySlug='marshalltown'; label='Marshalltown Metro'; poolId='marshall-metro-ia'; regional1='marshalltown-corridor'; regional2='iowa-river-central'; topId='regional-marshall-ia-movers'; topName='Regional Marshalltown / Marshall Providers'; topDesc='Reliable movers serving Marshall County residential needs across Marshalltown and central Iowa corridor communities.'; countyMovingName='Marshall County Moving'; regional1Name='Marshalltown Corridor Moving'; regional2Name='Iowa River Central Moving'; countyLabel='Marshall County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jasper'; city='Newton'; citySlug='newton'; label='Newton Metro'; poolId='jasper-metro-ia'; regional1='newton-corridor'; regional2='skunk-river-south'; topId='regional-jasper-ia-movers'; topName='Regional Newton / Jasper Providers'; topDesc='Reliable movers serving Jasper County residential needs across Newton and central Iowa Skunk River corridor communities.'; countyMovingName='Jasper County Moving'; regional1Name='Newton Corridor Moving'; regional2Name='Skunk River South Moving'; countyLabel='Jasper County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='des-moines'; city='Burlington'; citySlug='burlington'; label='Burlington Metro'; poolId='des-moines-metro-ia'; regional1='burlington-corridor'; regional2='mississippi-river-southeast'; topId='regional-desmoines-ia-movers'; topName='Regional Burlington / Des Moines County Providers'; topDesc='Reliable movers serving Des Moines County residential needs across Burlington and Mississippi River southeast corridor communities.'; countyMovingName='Des Moines County Moving'; regional1Name='Burlington Corridor Moving'; regional2Name='Mississippi River Southeast Moving'; countyLabel='Des Moines County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='webster'; city='Fort Dodge'; citySlug='fort-dodge'; label='Fort Dodge Metro'; poolId='webster-metro-ia'; regional1='fort-dodge-corridor'; regional2='des-moines-river-north'; topId='regional-webster-ia-movers'; topName='Regional Fort Dodge / Webster Providers'; topDesc='Reliable movers serving Webster County residential needs across Fort Dodge and north-central Iowa corridor communities.'; countyMovingName='Webster County Moving'; regional1Name='Fort Dodge Corridor Moving'; regional2Name='Des Moines River North Moving'; countyLabel='Webster County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='sioux'; city='Orange City'; citySlug='orange-city'; label='Sioux County Metro'; poolId='sioux-metro-ia'; regional1='orange-city-corridor'; regional2='big-sioux-valley'; topId='regional-sioux-ia-movers'; topName='Regional Orange City / Sioux Providers'; topDesc='Reliable movers serving Sioux County residential needs across Orange City and northwest Iowa Big Sioux Valley corridor communities.'; countyMovingName='Sioux County Moving'; regional1Name='Orange City Corridor Moving'; regional2Name='Big Sioux Valley Moving'; countyLabel='Sioux County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='wapello'; city='Ottumwa'; citySlug='ottumwa'; label='Ottumwa Metro'; poolId='wapello-metro-ia'; regional1='ottumwa-corridor'; regional2='des-moines-river-south'; topId='regional-wapello-ia-movers'; topName='Regional Ottumwa / Wapello Providers'; topDesc='Reliable movers serving Wapello County residential needs across Ottumwa and southeastern Iowa corridor communities.'; countyMovingName='Wapello County Moving'; regional1Name='Ottumwa Corridor Moving'; regional2Name='Des Moines River South Moving'; countyLabel='Wapello County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='marion'; city='Knoxville'; citySlug='knoxville'; label='Knoxville Metro'; poolId='marion-metro-ia'; regional1='knoxville-corridor'; regional2='des-moines-river-marion'; topId='regional-marion-ia-movers'; topName='Regional Knoxville / Marion Providers'; topDesc='Reliable movers serving Marion County residential needs across Knoxville and south-central Iowa corridor communities.'; countyMovingName='Marion County Moving'; regional1Name='Knoxville Corridor Moving'; regional2Name='Des Moines River Marion Moving'; countyLabel='Marion County, IA'; franchise=$false; topSpecialties="['Residential']" }
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
    "all-my-sons-$citySlug-ia",
    "$citySlug-moving-$slug-ia",
    "$slug-county-moving-$slug-ia",
    "college-hunks-moving-$citySlug-ia",
    "budd-van-lines-$citySlug-ia",
    "$($c.regional1)-moving-$slug-ia",
    "$($c.regional2)-moving-$slug-ia",
    "hercules-movers-$citySlug-ia",
    "krupp-moving-$citySlug-ia"
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
Write-Host 'Generated 210 catalog entries, 21 metro pools for Iowa batch 1'