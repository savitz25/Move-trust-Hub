$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch5-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function Quote-Ts([string]$s) {
  if ($s -match "'") { return '"' + $s + '"' }
  return "'" + $s + "'"
}

$counties = @(
  @{ slug='bradford'; city='Towanda'; citySlug='towanda'; label='Towanda Metro'; poolId='bradford-metro-pa'; regional1='towanda-corridor'; regional2='northern-tier'; topId='regional-bradford-pa-movers'; topName='Regional Towanda / Bradford County Providers'; topDesc='Reliable movers serving Bradford County residential needs across Towanda and Northern Pennsylvania communities.'; countyMovingName='Bradford County Moving'; regional1Name='Towanda Corridor Moving'; regional2Name='Northern Tier Moving'; franchise=$false },
  @{ slug='wayne'; city='Honesdale'; citySlug='honesdale'; label='Honesdale Metro'; poolId='wayne-metro-pa'; regional1='honesdale-corridor'; regional2='pocono-north'; topId='regional-wayne-pa-movers'; topName='Regional Honesdale / Wayne County Providers'; topDesc='Reliable movers serving Wayne County residential needs across Honesdale and Northeastern Pennsylvania communities.'; countyMovingName='Wayne County Moving'; regional1Name='Honesdale Corridor Moving'; regional2Name='Pocono North Moving'; franchise=$false },
  @{ slug='venango'; city='Franklin'; citySlug='franklin'; label='Franklin Metro'; poolId='venango-metro-pa'; regional1='franklin-corridor'; regional2='oil-region'; topId='regional-venango-pa-movers'; topName='Regional Franklin / Venango County Providers'; topDesc='Reliable movers serving Venango County residential needs across Franklin and Northwestern Pennsylvania communities.'; countyMovingName='Venango County Moving'; regional1Name='Franklin Corridor Moving'; regional2Name='Oil Region Moving'; franchise=$false },
  @{ slug='bedford'; city='Bedford'; citySlug='bedford'; label='Bedford Metro'; poolId='bedford-metro-pa'; regional1='bedford-corridor'; regional2='allegheny-south'; topId='regional-bedford-pa-movers'; topName='Regional Bedford / Bedford County Providers'; topDesc='Reliable movers serving Bedford County residential needs across Bedford and South Central Pennsylvania communities.'; countyMovingName='Bedford County Moving'; regional1Name='Bedford Corridor Moving'; regional2Name='Allegheny South Moving'; franchise=$false },
  @{ slug='perry'; city='New Bloomfield'; citySlug='new-bloomfield'; label='New Bloomfield Metro'; poolId='perry-metro-pa'; regional1='perry-corridor'; regional2='susquehanna-west'; topId='regional-perry-pa-movers'; topName='Regional New Bloomfield / Perry County Providers'; topDesc='Reliable movers serving Perry County residential needs across New Bloomfield and South Central Pennsylvania communities.'; countyMovingName='Perry County Moving'; regional1Name='Perry Corridor Moving'; regional2Name='Susquehanna West Moving'; franchise=$false },
  @{ slug='mifflin'; city='Lewistown'; citySlug='lewistown'; label='Lewistown Metro'; poolId='mifflin-metro-pa'; regional1='lewistown-corridor'; regional2='juniata-valley'; topId='regional-mifflin-pa-movers'; topName='Regional Lewistown / Mifflin County Providers'; topDesc='Reliable movers serving Mifflin County residential needs across Lewistown and Central Pennsylvania communities.'; countyMovingName='Mifflin County Moving'; regional1Name='Lewistown Corridor Moving'; regional2Name='Juniata Valley Moving'; franchise=$false },
  @{ slug='jefferson'; city='Brookville'; citySlug='brookville'; label='Brookville Metro'; poolId='jefferson-metro-pa'; regional1='brookville-corridor'; regional2='northwest-plateau'; topId='regional-jefferson-pa-movers'; topName='Regional Brookville / Jefferson County Providers'; topDesc='Reliable movers serving Jefferson County residential needs across Brookville and Northwestern Pennsylvania communities.'; countyMovingName='Jefferson County Moving'; regional1Name='Brookville Corridor Moving'; regional2Name='Northwest Plateau Moving'; franchise=$false },
  @{ slug='huntingdon'; city='Huntingdon'; citySlug='huntingdon'; label='Huntingdon Metro'; poolId='huntingdon-metro-pa'; regional1='huntingdon-corridor'; regional2='raystown'; topId='regional-huntingdon-pa-movers'; topName='Regional Huntingdon / Huntingdon County Providers'; topDesc='Reliable movers serving Huntingdon County residential needs across Huntingdon and Central Pennsylvania communities.'; countyMovingName='Huntingdon County Moving'; regional1Name='Huntingdon Corridor Moving'; regional2Name='Raystown Moving'; franchise=$false },
  @{ slug='union'; city='Lewisburg'; citySlug='lewisburg'; label='Lewisburg Metro'; poolId='union-metro-pa'; regional1='lewisburg-corridor'; regional2='susquehanna-west-central'; topId='regional-union-pa-movers'; topName='Regional Lewisburg / Union County Providers'; topDesc='Reliable movers serving Union County residential needs across Lewisburg and Central Pennsylvania communities.'; countyMovingName='Union County Moving'; regional1Name='Lewisburg Corridor Moving'; regional2Name='Susquehanna West Central Moving'; franchise=$false },
  @{ slug='tioga'; city='Wellsboro'; citySlug='wellsboro'; label='Wellsboro Metro'; poolId='tioga-metro-pa'; regional1='wellsboro-corridor'; regional2='pine-creek'; topId='regional-tioga-pa-movers'; topName='Regional Wellsboro / Tioga County Providers'; topDesc='Reliable movers serving Tioga County residential needs across Wellsboro and Northern Pennsylvania communities.'; countyMovingName='Tioga County Moving'; regional1Name='Wellsboro Corridor Moving'; regional2Name='Pine Creek Moving'; franchise=$false },
  @{ slug='snyder'; city='Middleburg'; citySlug='middleburg'; label='Middleburg Metro'; poolId='snyder-metro-pa'; regional1='middleburg-corridor'; regional2='susquehanna-middle'; topId='regional-snyder-pa-movers'; topName='Regional Middleburg / Snyder County Providers'; topDesc='Reliable movers serving Snyder County residential needs across Middleburg and Central Pennsylvania communities.'; countyMovingName='Snyder County Moving'; regional1Name='Middleburg Corridor Moving'; regional2Name='Susquehanna Middle Moving'; franchise=$false },
  @{ slug='mckean'; city='Smethport'; citySlug='smethport'; label='Smethport Metro'; poolId='mckean-metro-pa'; regional1='smethport-corridor'; regional2='allegheny-national'; topId='regional-mckean-pa-movers'; topName='Regional Smethport / McKean County Providers'; topDesc='Reliable movers serving McKean County residential needs across Smethport and Northwestern Pennsylvania communities.'; countyMovingName='McKean County Moving'; regional1Name='Smethport Corridor Moving'; regional2Name='Allegheny National Moving'; franchise=$false },
  @{ slug='susquehanna'; city='Montrose'; citySlug='montrose'; label='Montrose Metro'; poolId='susquehanna-metro-pa'; regional1='montrose-corridor'; regional2='endless-mountains'; topId='regional-susquehanna-pa-movers'; topName='Regional Montrose / Susquehanna County Providers'; topDesc='Reliable movers serving Susquehanna County residential needs across Montrose and Northeastern Pennsylvania communities.'; countyMovingName='Susquehanna County Moving'; regional1Name='Montrose Corridor Moving'; regional2Name='Endless Mountains Moving'; franchise=$false },
  @{ slug='clinton'; city='Lock Haven'; citySlug='lock-haven'; label='Lock Haven Metro'; poolId='clinton-metro-pa'; regional1='lock-haven-corridor'; regional2='west-branch'; topId='regional-clinton-pa-movers'; topName='Regional Lock Haven / Clinton County Providers'; topDesc='Reliable movers serving Clinton County residential needs across Lock Haven and Central Pennsylvania communities.'; countyMovingName='Clinton County Moving'; regional1Name='Lock Haven Corridor Moving'; regional2Name='West Branch Moving'; franchise=$false },
  @{ slug='warren'; city='Warren'; citySlug='warren'; label='Warren Metro'; poolId='warren-metro-pa'; regional1='warren-corridor'; regional2='allegheny-reservoir'; topId='regional-warren-pa-movers'; topName='Regional Warren / Warren County Providers'; topDesc='Reliable movers serving Warren County residential needs across Warren and Northwestern Pennsylvania communities.'; countyMovingName='Warren County Moving'; regional1Name='Warren Corridor Moving'; regional2Name='Allegheny Reservoir Moving'; franchise=$false }
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
    "all-my-sons-$citySlug-pa",
    "$citySlug-moving-$slug-pa",
    "$slug-county-moving-$slug-pa",
    "college-hunks-moving-$citySlug-pa",
    "budd-van-lines-$citySlug-pa",
    "$($c.regional1)-moving-$slug-pa",
    "$($c.regional2)-moving-$slug-pa",
    "hercules-movers-$citySlug-pa",
    "krupp-moving-$citySlug-pa"
  )

  $movers = @(
    @{ id=$ids[0]; name=$c.topName; rating=4.7; reviews=280; desc=$c.topDesc; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[1]; name="All My Sons Moving & Storage $($c.city)"; rating=4.6; reviews=1320; desc="Established mover known for reliable local and long-distance services in $($c.city) and surrounding Pennsylvania communities."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[2]; name="$($c.city) Moving"; rating=4.7; reviews=860; desc="Full-service local mover serving $($c.city) and $($slug) County with careful residential relocations."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[3]; name=$c.countyMovingName; rating=4.6; reviews=620; desc="County-focused mover with experience across $($c.city) and surrounding Pennsylvania neighborhoods."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[4]; name="College Hunks Moving $($c.city)"; rating=4.6; reviews=1180; desc="National franchise with strong local presence for residential and light commercial moves in $($c.city)."; services="['Local Moving', 'Packing', 'Junk Removal']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[5]; name="Budd Van Lines $($c.city)"; rating=4.5; reviews=480; desc="Established van line agent serving $($c.city) with careful handling for local and regional relocations."; services="['Local Moving', 'Long Distance', 'Packing']"; specialties="['Residential', 'Commercial']"; bbb='A'; city=$c.city }
    @{ id=$ids[6]; name=$c.regional1Name; rating=4.7; reviews=410; desc="Regional mover serving $($c.city) and $($slug) County communities."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A+'; city=$c.city }
    @{ id=$ids[7]; name=$c.regional2Name; rating=4.6; reviews=360; desc="Local specialist for $($slug) County residential moves with steady scheduling and careful handling."; services="['Local Moving', 'Packing']"; specialties="['Residential']"; bbb='A'; city=$c.city }
    @{ id=$ids[8]; name="Hercules Movers $($c.city)"; rating=4.5; reviews=290; desc="Local $($c.city) mover with careful residential relocations and packing services."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
    @{ id=$ids[9]; name="Krupp Moving $($c.city)"; rating=4.5; reviews=265; desc="Full-service local mover serving $($c.city) and $($slug) County."; services="['Local Moving', 'Packing', 'Storage']"; specialties="['Residential', 'Commercial']"; bbb='A+'; city=$c.city }
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
Write-Host 'Generated 150 catalog entries, 15 metro pools for Pennsylvania batch 5'