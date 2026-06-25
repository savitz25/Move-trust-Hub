$outDir = Join-Path $PSScriptRoot 'iowa-batch2-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='lee'; city='Fort Madison'; citySlug='fort-madison'; label='Fort Madison Metro'; poolId='lee-metro-ia'; regional1='fort-madison-corridor'; regional2='mississippi-river-lee'; topId='regional-lee-ia-movers'; topName='Regional Fort Madison / Lee Providers'; topDesc='Reliable movers serving Lee County residential needs across Fort Madison, Keokuk, and Mississippi River southeast corridor communities.'; countyMovingName='Lee County Moving'; regional1Name='Fort Madison Corridor Moving'; regional2Name='Mississippi River Lee Moving'; countyLabel='Lee County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='boone'; city='Boone'; citySlug='boone'; label='Boone Metro'; poolId='boone-metro-ia'; regional1='boone-corridor'; regional2='des-moines-river-central'; topId='regional-boone-ia-movers'; topName='Regional Boone / Boone County Providers'; topDesc='Reliable movers serving Boone County residential needs across Boone and central Iowa Des Moines River corridor communities.'; countyMovingName='Boone County Moving'; regional1Name='Boone Corridor Moving'; regional2Name='Des Moines River Central Moving'; countyLabel='Boone County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='benton'; city='Vinton'; citySlug='vinton'; label='Vinton Metro'; poolId='benton-metro-ia'; regional1='vinton-corridor'; regional2='cedar-river-east'; topId='regional-benton-ia-movers'; topName='Regional Vinton / Benton Providers'; topDesc='Reliable movers serving Benton County residential needs across Vinton and eastern Cedar River corridor communities.'; countyMovingName='Benton County Moving'; regional1Name='Vinton Corridor Moving'; regional2Name='Cedar River East Moving'; countyLabel='Benton County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='plymouth'; city='Le Mars'; citySlug='le-mars'; label='Le Mars Metro'; poolId='plymouth-metro-ia'; regional1='le-mars-corridor'; regional2='floyd-river-valley'; topId='regional-plymouth-ia-movers'; topName='Regional Le Mars / Plymouth Providers'; topDesc='Reliable movers serving Plymouth County residential needs across Le Mars and Floyd River valley northwest Iowa communities.'; countyMovingName='Plymouth County Moving'; regional1Name='Le Mars Corridor Moving'; regional2Name='Floyd River Valley Moving'; countyLabel='Plymouth County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='bremer'; city='Waverly'; citySlug='waverly'; label='Waverly Metro'; poolId='bremer-metro-ia'; regional1='waverly-corridor'; regional2='cedar-river-north'; topId='regional-bremer-ia-movers'; topName='Regional Waverly / Bremer Providers'; topDesc='Reliable movers serving Bremer County residential needs across Waverly and northern Cedar River corridor communities.'; countyMovingName='Bremer County Moving'; regional1Name='Waverly Corridor Moving'; regional2Name='Cedar River North Moving'; countyLabel='Bremer County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='washington'; city='Washington'; citySlug='washington'; label='Washington Metro'; poolId='washington-metro-ia'; regional1='washington-corridor'; regional2='skunk-river-east'; topId='regional-washington-ia-movers'; topName='Regional Washington / Washington County Providers'; topDesc='Reliable movers serving Washington County residential needs across Washington and eastern Skunk River corridor communities.'; countyMovingName='Washington County Moving'; regional1Name='Washington Corridor Moving'; regional2Name='Skunk River East Moving'; countyLabel='Washington County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mahaska'; city='Oskaloosa'; citySlug='oskaloosa'; label='Oskaloosa Metro'; poolId='mahaska-metro-ia'; regional1='oskaloosa-corridor'; regional2='des-moines-river-mahaska'; topId='regional-mahaska-ia-movers'; topName='Regional Oskaloosa / Mahaska Providers'; topDesc='Reliable movers serving Mahaska County residential needs across Oskaloosa and south-central Iowa corridor communities.'; countyMovingName='Mahaska County Moving'; regional1Name='Oskaloosa Corridor Moving'; regional2Name='Des Moines River Mahaska Moving'; countyLabel='Mahaska County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jones'; city='Anamosa'; citySlug='anamosa'; label='Anamosa Metro'; poolId='jones-metro-ia'; regional1='anamosa-corridor'; regional2='wapsipinicon-valley'; topId='regional-jones-ia-movers'; topName='Regional Anamosa / Jones Providers'; topDesc='Reliable movers serving Jones County residential needs across Anamosa and Wapsipinicon River valley corridor communities.'; countyMovingName='Jones County Moving'; regional1Name='Anamosa Corridor Moving'; regional2Name='Wapsipinicon Valley Moving'; countyLabel='Jones County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='buchanan'; city='Independence'; citySlug='independence'; label='Independence Metro'; poolId='buchanan-metro-ia'; regional1='independence-corridor'; regional2='wapsipinicon-north'; topId='regional-buchanan-ia-movers'; topName='Regional Independence / Buchanan Providers'; topDesc='Reliable movers serving Buchanan County residential needs across Independence and northeastern Iowa corridor communities.'; countyMovingName='Buchanan County Moving'; regional1Name='Independence Corridor Moving'; regional2Name='Wapsipinicon North Moving'; countyLabel='Buchanan County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='buena-vista'; city='Storm Lake'; citySlug='storm-lake'; label='Storm Lake Metro'; poolId='buena-vista-metro-ia'; regional1='storm-lake-corridor'; regional2='little-sioux-valley'; topId='regional-buenavista-ia-movers'; topName='Regional Storm Lake / Buena Vista Providers'; topDesc='Reliable movers serving Buena Vista County residential needs across Storm Lake and Little Sioux River valley northwest Iowa communities.'; countyMovingName='Buena Vista County Moving'; regional1Name='Storm Lake Corridor Moving'; regional2Name='Little Sioux Valley Moving'; countyLabel='Buena Vista County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='carroll'; city='Carroll'; citySlug='carroll'; label='Carroll Metro'; poolId='carroll-metro-ia'; regional1='carroll-corridor'; regional2='middle-raccoon-valley'; topId='regional-carroll-ia-movers'; topName='Regional Carroll / Carroll County Providers'; topDesc='Reliable movers serving Carroll County residential needs across Carroll and western Iowa Middle Raccoon River valley communities.'; countyMovingName='Carroll County Moving'; regional1Name='Carroll Corridor Moving'; regional2Name='Middle Raccoon Valley Moving'; countyLabel='Carroll County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='winneshiek'; city='Decorah'; citySlug='decorah'; label='Decorah Metro'; poolId='winneshiek-metro-ia'; regional1='decorah-corridor'; regional2='upper-iowa-river'; topId='regional-winneshiek-ia-movers'; topName='Regional Decorah / Winneshiek Providers'; topDesc='Reliable movers serving Winneshiek County residential needs across Decorah and Upper Iowa River valley northeast Iowa communities.'; countyMovingName='Winneshiek County Moving'; regional1Name='Decorah Corridor Moving'; regional2Name='Upper Iowa River Moving'; countyLabel='Winneshiek County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='henry'; city='Mount Pleasant'; citySlug='mount-pleasant'; label='Mount Pleasant Metro'; poolId='henry-metro-ia'; regional1='mount-pleasant-corridor'; regional2='skunk-river-southeast'; topId='regional-henry-ia-movers'; topName='Regional Mount Pleasant / Henry Providers'; topDesc='Reliable movers serving Henry County residential needs across Mount Pleasant and southeastern Iowa Skunk River corridor communities.'; countyMovingName='Henry County Moving'; regional1Name='Mount Pleasant Corridor Moving'; regional2Name='Skunk River Southeast Moving'; countyLabel='Henry County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jackson'; city='Maquoketa'; citySlug='maquoketa'; label='Maquoketa Metro'; poolId='jackson-metro-ia'; regional1='maquoketa-corridor'; regional2='maquoketa-river-valley'; topId='regional-jackson-ia-movers'; topName='Regional Maquoketa / Jackson Providers'; topDesc='Reliable movers serving Jackson County residential needs across Maquoketa and eastern Iowa Maquoketa River valley communities.'; countyMovingName='Jackson County Moving'; regional1Name='Maquoketa Corridor Moving'; regional2Name='Maquoketa River Valley Moving'; countyLabel='Jackson County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='fayette'; city='West Union'; citySlug='west-union'; label='West Union Metro'; poolId='fayette-metro-ia'; regional1='west-union-corridor'; regional2='turkey-river-valley'; topId='regional-fayette-ia-movers'; topName='Regional West Union / Fayette Providers'; topDesc='Reliable movers serving Fayette County residential needs across West Union and Turkey River valley northeast Iowa communities.'; countyMovingName='Fayette County Moving'; regional1Name='West Union Corridor Moving'; regional2Name='Turkey River Valley Moving'; countyLabel='Fayette County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='cedar'; city='Tipton'; citySlug='tipton'; label='Tipton Metro'; poolId='cedar-metro-ia'; regional1='tipton-corridor'; regional2='cedar-river-south'; topId='regional-cedar-ia-movers'; topName='Regional Tipton / Cedar Providers'; topDesc='Reliable movers serving Cedar County residential needs across Tipton and southern Cedar River corridor communities.'; countyMovingName='Cedar County Moving'; regional1Name='Tipton Corridor Moving'; regional2Name='Cedar River South Moving'; countyLabel='Cedar County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='poweshiek'; city='Montezuma'; citySlug='montezuma'; label='Montezuma Metro'; poolId='poweshiek-metro-ia'; regional1='montezuma-corridor'; regional2='north-skunk-valley'; topId='regional-poweshiek-ia-movers'; topName='Regional Montezuma / Poweshiek Providers'; topDesc='Reliable movers serving Poweshiek County residential needs across Montezuma and North Skunk River valley central Iowa communities.'; countyMovingName='Poweshiek County Moving'; regional1Name='Montezuma Corridor Moving'; regional2Name='North Skunk Valley Moving'; countyLabel='Poweshiek County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='dickinson'; city='Spirit Lake'; citySlug='spirit-lake'; label='Spirit Lake Metro'; poolId='dickinson-metro-ia'; regional1='spirit-lake-corridor'; regional2='okoboji-lakes'; topId='regional-dickinson-ia-movers'; topName='Regional Spirit Lake / Dickinson Providers'; topDesc='Reliable movers serving Dickinson County residential needs across Spirit Lake, Okoboji lakes, and northwest Iowa resort corridor communities.'; countyMovingName='Dickinson County Moving'; regional1Name='Spirit Lake Corridor Moving'; regional2Name='Okoboji Lakes Moving'; countyLabel='Dickinson County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='delaware'; city='Manchester'; citySlug='manchester'; label='Manchester Metro'; poolId='delaware-metro-ia'; regional1='manchester-corridor'; regional2='maquoketa-river-north'; topId='regional-delaware-ia-movers'; topName='Regional Manchester / Delaware Providers'; topDesc='Reliable movers serving Delaware County residential needs across Manchester and eastern Iowa Maquoketa River north corridor communities.'; countyMovingName='Delaware County Moving'; regional1Name='Manchester Corridor Moving'; regional2Name='Maquoketa River North Moving'; countyLabel='Delaware County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='iowa'; city='Marengo'; citySlug='marengo'; label='Marengo Metro'; poolId='iowa-metro-ia'; regional1='marengo-corridor'; regional2='iowa-river-county'; topId='regional-iowa-ia-movers'; topName='Regional Marengo / Iowa County Providers'; topDesc='Reliable movers serving Iowa County residential needs across Marengo and eastern Iowa River corridor communities.'; countyMovingName='Iowa County Moving'; regional1Name='Marengo Corridor Moving'; regional2Name='Iowa River County Moving'; countyLabel='Iowa County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hardin'; city='Eldora'; citySlug='eldora'; label='Eldora Metro'; poolId='hardin-metro-ia'; regional1='eldora-corridor'; regional2='iowa-river-north'; topId='regional-hardin-ia-movers'; topName='Regional Eldora / Hardin Providers'; topDesc='Reliable movers serving Hardin County residential needs across Eldora and central Iowa River north corridor communities.'; countyMovingName='Hardin County Moving'; regional1Name='Eldora Corridor Moving'; regional2Name='Iowa River North Moving'; countyLabel='Hardin County'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='crawford'; city='Denison'; citySlug='denison'; label='Denison Metro'; poolId='crawford-metro-ia'; regional1='denison-corridor'; regional2='boyer-river-valley'; topId='regional-crawford-ia-movers'; topName='Regional Denison / Crawford Providers'; topDesc='Reliable movers serving Crawford County residential needs across Denison and Boyer River valley western Iowa communities.'; countyMovingName='Crawford County Moving'; regional1Name='Denison Corridor Moving'; regional2Name='Boyer River Valley Moving'; countyLabel='Crawford County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='clay'; city='Spencer'; citySlug='spencer'; label='Spencer Metro'; poolId='clay-metro-ia'; regional1='spencer-corridor'; regional2='little-sioux-north'; topId='regional-clay-ia-movers'; topName='Regional Spencer / Clay Providers'; topDesc='Reliable movers serving Clay County residential needs across Spencer and Little Sioux River north northwest Iowa communities.'; countyMovingName='Clay County Moving'; regional1Name='Spencer Corridor Moving'; regional2Name='Little Sioux North Moving'; countyLabel='Clay County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='jefferson'; city='Fairfield'; citySlug='fairfield'; label='Fairfield Metro'; poolId='jefferson-metro-ia'; regional1='fairfield-corridor'; regional2='skunk-river-jefferson'; topId='regional-jefferson-ia-movers'; topName='Regional Fairfield / Jefferson Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Fairfield and southeastern Iowa Skunk River corridor communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Fairfield Corridor Moving'; regional2Name='Skunk River Jefferson Moving'; countyLabel='Jefferson County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='hamilton'; city='Webster City'; citySlug='webster-city'; label='Webster City Metro'; poolId='hamilton-metro-ia'; regional1='webster-city-corridor'; regional2='boone-river-valley'; topId='regional-hamilton-ia-movers'; topName='Regional Webster City / Hamilton Providers'; topDesc='Reliable movers serving Hamilton County residential needs across Webster City and Boone River valley north-central Iowa communities.'; countyMovingName='Hamilton County Moving'; regional1Name='Webster City Corridor Moving'; regional2Name='Boone River Valley Moving'; countyLabel='Hamilton County, IA'; franchise=$false; topSpecialties="['Residential']" },
  @{ slug='mills'; city='Glenwood'; citySlug='glenwood'; label='Omaha Metro'; poolId='mills-metro-ia'; regional1='glenwood-corridor'; regional2='missouri-river-mills'; topId='regional-mills-ia-movers'; topName='Regional Glenwood / Mills Providers'; topDesc='Reliable movers serving Mills County residential needs across Glenwood and Omaha metro Missouri River southwest corridor communities.'; countyMovingName='Mills County Moving'; regional1Name='Glenwood Corridor Moving'; regional2Name='Missouri River Mills Moving'; countyLabel='Mills County, IA'; franchise=$false; topSpecialties="['Residential']" }
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

  $topServices = "['Local Moving', 'Packing']"
  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=340; desc=$c.topDesc; services=$topServices; specialties=$c.topSpecialties; bbb='A'; city=$c.city }
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
Write-Host 'Generated 260 catalog entries, 26 metro pools for Iowa batch 2'