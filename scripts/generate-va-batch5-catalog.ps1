# Generates Virginia batch 5 catalog movers + metro pools for local-movers-seed.ts
$counties = @(
  @{
    slug = 'roanoke-county'
    city = 'Salem'
    citySlug = 'salem'
    countyName = 'Roanoke County'
    regional1 = 'blue-ridge-south'
    regional2 = 'roanoke-county-valley'
    regional1Name = 'Blue Ridge South Moving'
    regional2Name = 'Roanoke County Valley Moving'
    label = 'Roanoke County Metro'
    poolId = 'roanoke-county-metro-va'
    desc1 = 'Trusted Roanoke County franchise with excellent reputation for suburban residential moves across Salem and surrounding communities.'
    desc2 = 'Established Salem mover known for reliable local and long-distance services throughout Roanoke County.'
    desc3 = 'Local Roanoke County mover with careful residential relocations and packing services across Cave Spring and Hollins.'
    desc4 = 'Blue Ridge South specialist for suburban residential moves surrounding the Roanoke Valley.'
    desc5 = 'Roanoke County Valley mover serving Salem and county subdivisions with full-service relocations.'
  },
  @{
    slug = 'portsmouth'
    city = 'Portsmouth'
    citySlug = 'portsmouth'
    countyName = 'Portsmouth'
    countyMovingId = 'portsmouth-local-moving-portsmouth-va'
    countyMovingName = 'Portsmouth Local Moving'
    regional1 = 'naval-port'
    regional2 = 'hampton-roads-west'
    regional1Name = 'Naval Port Moving'
    regional2Name = 'Hampton Roads West Moving'
    label = 'Portsmouth Metro'
    poolId = 'portsmouth-metro-va'
    desc1 = 'Trusted Portsmouth franchise with excellent reputation for residential and commercial moves across Hampton Roads.'
    desc2 = 'Established Portsmouth mover known for reliable local and long-distance services throughout coastal Virginia.'
    desc3 = 'Local Portsmouth mover with careful residential relocations and packing services near naval and port districts.'
    desc4 = 'Naval Port specialist for military PCS and waterfront residential moves across Portsmouth.'
    desc5 = 'Hampton Roads West mover serving Olde Towne and western Portsmouth communities.'
  },
  @{
    slug = 'rockingham'
    city = 'Harrisonburg'
    citySlug = 'harrisonburg'
    countyName = 'Rockingham'
    regional1 = 'shenandoah-valley'
    regional2 = 'jmu-area'
    regional1Name = 'Shenandoah Valley Moving'
    regional2Name = 'JMU Area Moving'
    label = 'Rockingham Metro'
    poolId = 'rockingham-metro-va'
    desc1 = 'Trusted Rockingham franchise with excellent reputation for residential moves across Harrisonburg and the Shenandoah Valley.'
    desc2 = 'Established Harrisonburg mover known for reliable local and long-distance services throughout Rockingham County.'
    desc3 = 'Local Rockingham County mover with careful residential relocations and packing services across agricultural and suburban areas.'
    desc4 = 'Shenandoah Valley specialist for rural and suburban residential moves across Rockingham County.'
    desc5 = 'JMU Area mover serving Harrisonburg university district and surrounding communities.'
  },
  @{
    slug = 'james-city'
    city = 'Williamsburg'
    citySlug = 'williamsburg'
    countyName = 'James City'
    regional1 = 'colonial'
    regional2 = 'historic-triangle'
    regional1Name = 'Colonial Moving'
    regional2Name = 'Historic Triangle Moving'
    label = 'James City Metro'
    poolId = 'james-city-metro-va'
    desc1 = 'Trusted James City franchise with excellent reputation for residential moves across Williamsburg and the Historic Triangle.'
    desc2 = 'Established Williamsburg mover known for reliable local and long-distance services throughout James City County.'
    desc3 = 'Local James City County mover with careful residential relocations and packing services across tourism and suburban neighborhoods.'
    desc4 = 'Colonial corridor specialist for historic district and suburban residential moves.'
    desc5 = 'Historic Triangle mover serving Williamsburg, Jamestown corridor, and surrounding communities.'
  },
  @{
    slug = 'bedford'
    city = 'Bedford'
    citySlug = 'bedford'
    countyName = 'Bedford'
    regional1 = 'smith-mountain-lake'
    regional2 = 'lynchburg-area'
    regional1Name = 'Smith Mountain Lake Moving'
    regional2Name = 'Lynchburg Area Moving'
    label = 'Bedford Metro'
    poolId = 'bedford-metro-va'
    desc1 = 'Trusted Bedford franchise with excellent reputation for residential moves across Bedford County and Smith Mountain Lake.'
    desc2 = 'Established Bedford mover known for reliable local and long-distance services throughout rural South Central Virginia.'
    desc3 = 'Local Bedford County mover with careful residential relocations and packing services across lakefront and rural properties.'
    desc4 = 'Smith Mountain Lake specialist for waterfront and hillside residential moves.'
    desc5 = 'Lynchburg Area mover serving Bedford County communities near the metro corridor.'
  },
  @{
    slug = 'lynchburg'
    city = 'Lynchburg'
    citySlug = 'lynchburg'
    countyName = 'Lynchburg'
    countyMovingId = 'lynchburg-local-moving-lynchburg-va'
    countyMovingName = 'Lynchburg Local Moving'
    regional1 = 'hill-city'
    regional2 = 'james-river-lynchburg'
    regional1Name = 'Hill City Moving'
    regional2Name = 'James River Lynchburg Moving'
    label = 'Lynchburg Metro'
    poolId = 'lynchburg-metro-va'
    desc1 = 'Trusted Lynchburg franchise with excellent reputation for residential and commercial moves across Central Virginia.'
    desc2 = 'Established Lynchburg mover known for reliable local and long-distance services throughout the Hill City.'
    desc3 = 'Local Lynchburg mover with careful residential relocations and packing services across university and downtown neighborhoods.'
    desc4 = 'Hill City specialist for hillside and downtown residential moves across Lynchburg.'
    desc5 = 'James River corridor mover serving riverfront Lynchburg communities.'
  },
  @{
    slug = 'augusta'
    city = 'Staunton'
    citySlug = 'staunton'
    countyName = 'Augusta'
    regional1 = 'shenandoah-valley'
    regional2 = 'waynesboro-area'
    regional1Name = 'Shenandoah Valley Moving'
    regional2Name = 'Waynesboro Area Moving'
    label = 'Augusta Metro'
    poolId = 'augusta-metro-va'
    desc1 = 'Trusted Augusta franchise with excellent reputation for residential moves across Staunton and Waynesboro.'
    desc2 = 'Established Staunton mover known for reliable local and long-distance services throughout Augusta County.'
    desc3 = 'Local Augusta County mover with careful residential relocations and packing services across valley communities.'
    desc4 = 'Shenandoah Valley specialist for rural and suburban residential moves across Augusta County.'
    desc5 = 'Waynesboro Area mover serving eastern Augusta County with full-service relocations.'
  },
  @{
    slug = 'fauquier'
    city = 'Warrenton'
    citySlug = 'warrenton'
    countyName = 'Fauquier'
    regional1 = 'northern-piedmont'
    regional2 = 'horse-country'
    regional1Name = 'Northern Piedmont Moving'
    regional2Name = 'Horse Country Moving'
    label = 'Fauquier Metro'
    poolId = 'fauquier-metro-va'
    desc1 = 'Trusted Fauquier franchise with excellent reputation for suburban and rural residential moves across Warrenton.'
    desc2 = 'Established Warrenton mover known for reliable local and long-distance services throughout outer Northern Virginia.'
    desc3 = 'Local Fauquier County mover with careful residential relocations and packing services across piedmont estates.'
    desc4 = 'Northern Piedmont specialist for suburban and equestrian property residential moves.'
    desc5 = 'Horse Country mover serving Upperville and Middleburg corridor communities.'
  },
  @{
    slug = 'york'
    city = 'Yorktown'
    citySlug = 'yorktown'
    countyName = 'York'
    regional1 = 'historic-triangle'
    regional2 = 'peninsula-south'
    regional1Name = 'Historic Triangle Moving'
    regional2Name = 'Peninsula South Moving'
    label = 'York Metro'
    poolId = 'york-metro-va'
    desc1 = 'Trusted York franchise with excellent reputation for residential moves across Yorktown and the Virginia Peninsula.'
    desc2 = 'Established Yorktown mover known for reliable local and long-distance services throughout York County.'
    desc3 = 'Local York County mover with careful residential relocations and packing services across historic and suburban neighborhoods.'
    desc4 = 'Historic Triangle specialist for Yorktown and colonial corridor residential moves.'
    desc5 = 'Peninsula South mover serving Grafton and Tabb communities with full-service relocations.'
  },
  @{
    slug = 'pittsylvania'
    city = 'Chatham'
    citySlug = 'chatham'
    countyName = 'Pittsylvania'
    regional1 = 'danville-area'
    regional2 = 'southside-virginia'
    regional1Name = 'Danville Area Moving'
    regional2Name = 'Southside Virginia Moving'
    label = 'Pittsylvania Metro'
    poolId = 'pittsylvania-metro-va'
    desc1 = 'Trusted Pittsylvania franchise with excellent reputation for residential moves across Chatham and Southside Virginia.'
    desc2 = 'Established Chatham mover known for reliable local and long-distance services throughout Pittsylvania County.'
    desc3 = 'Local Pittsylvania County mover with careful residential relocations and packing services across rural properties.'
    desc4 = 'Danville Area specialist for South Central Virginia residential moves.'
    desc5 = 'Southside Virginia mover serving large rural Pittsylvania County communities.'
  },
  @{
    slug = 'culpeper'
    city = 'Culpeper'
    citySlug = 'culpeper'
    countyName = 'Culpeper'
    regional1 = 'northern-piedmont'
    regional2 = 'rappahannock-area'
    regional1Name = 'Northern Piedmont Moving'
    regional2Name = 'Rappahannock Area Moving'
    label = 'Culpeper Metro'
    poolId = 'culpeper-metro-va'
    desc1 = 'Trusted Culpeper franchise with excellent reputation for residential moves across growing Northern Virginia piedmont communities.'
    desc2 = 'Established Culpeper mover known for reliable local and long-distance services throughout Culpeper County.'
    desc3 = 'Local Culpeper County mover with careful residential relocations and packing services across suburban and rural areas.'
    desc4 = 'Northern Piedmont specialist for NOVA spillover residential moves across Culpeper County.'
    desc5 = 'Rappahannock Area mover serving Brandy Station and eastern Culpeper communities.'
  },
  @{
    slug = 'campbell'
    city = 'Rustburg'
    citySlug = 'rustburg'
    countyName = 'Campbell'
    regional1 = 'lynchburg-area'
    regional2 = 'campbell-county-local'
    regional1Name = 'Lynchburg Area Moving'
    regional2Name = 'Campbell County Local Moving'
    label = 'Campbell Metro'
    poolId = 'campbell-metro-va'
    desc1 = 'Trusted Campbell franchise with excellent reputation for residential moves across Rustburg and the Lynchburg metro.'
    desc2 = 'Established Rustburg mover known for reliable local and long-distance services throughout Campbell County.'
    desc3 = 'Local Campbell County mover with careful residential relocations and packing services across suburban and rural areas.'
    desc4 = 'Lynchburg Area specialist for Campbell County residential moves near the metro corridor.'
    desc5 = 'Campbell County Local mover serving Rustburg and Brookneal communities.'
  },
  @{
    slug = 'franklin'
    city = 'Rocky Mount'
    citySlug = 'rocky-mount'
    countyName = 'Franklin'
    regional1 = 'blue-ridge-foothills'
    regional2 = 'smith-river'
    regional1Name = 'Blue Ridge Foothills Moving'
    regional2Name = 'Smith River Moving'
    label = 'Franklin Metro'
    poolId = 'franklin-metro-va'
    desc1 = 'Trusted Franklin franchise with excellent reputation for residential moves across Rocky Mount and South Central Virginia.'
    desc2 = 'Established Rocky Mount mover known for reliable local and long-distance services throughout Franklin County.'
    desc3 = 'Local Franklin County mover with careful residential relocations and packing services across rural mountain communities.'
    desc4 = 'Blue Ridge Foothills specialist for hillside and rural residential moves across Franklin County.'
    desc5 = 'Smith River corridor mover serving Rocky Mount and Ferrum area communities.'
  }
)

function Format-MoverBlock($id, $name, $rating, $reviews, $desc, $city, $services = "['Local Moving', 'Packing', 'Storage']", $bbb = 'A+') {
  @"
  '$id': {
    id: '$id',
    name: '$name',
    rating: $rating,
    reviewCount: $reviews,
    shortDescription:
      '$desc',
    services: $services,
    specialties: ['Residential', 'Commercial'],
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: '$bbb',
    city: '$city',
  },
"@
}

$moverLines = New-Object System.Collections.Generic.List[string]
$poolLines = New-Object System.Collections.Generic.List[string]

foreach ($c in $counties) {
  $slug = $c.slug
  $city = $c.city
  $citySlug = $c.citySlug
  $countyName = $c.countyName

  $fourthId = if ($c.countyMovingId) { $c.countyMovingId } else { "$slug-county-moving-$slug-va" }
  $fourthName = if ($c.countyMovingName) { $c.countyMovingName } else { "$countyName County Moving" }

  $tmSlug = if ($slug -eq 'roanoke-county') { 'roanoke-county' } else { $slug }
  $tmName = if ($slug -eq 'roanoke-county') { 'Roanoke County' } else { $countyName }

  $ids = @(
    "two-men-and-a-truck-$tmSlug-va",
    "all-my-sons-$citySlug-va",
    "$citySlug-moving-$slug-va",
    $fourthId,
    "college-hunks-moving-$citySlug-va",
    "budd-van-lines-$citySlug-va",
    "$($c.regional1)-moving-$slug-va",
    "$($c.regional2)-moving-$slug-va",
    "hercules-movers-$citySlug-va",
    "krupp-moving-$citySlug-va"
  )

  $names = @(
    "Two Men and a Truck $tmName",
    "All My Sons Moving $city",
    "$city Moving & Storage",
    $fourthName,
    "College Hunks Moving $city",
    "Budd Van Lines $city",
    $c.regional1Name,
    $c.regional2Name,
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  $descs = @($c.desc1, $c.desc2, $c.desc3, $c.desc4, $c.desc5, $c.desc2, $c.desc4, $c.desc5, $c.desc3, $c.desc3)
  $ratings = @(4.7, 4.6, 4.6, 4.5, 4.7, 4.6, 4.6, 4.6, 4.6, 4.5)
  $reviews = @(1480, 1180, 420, 310, 820, 250, 330, 275, 195, 165)

  for ($i = 0; $i -lt 10; $i++) {
    $svc = if ($i -eq 1) { "['Local Moving', 'Long Distance', 'Packing']" } elseif ($i -eq 4) { "['Local Moving', 'Packing', 'Junk Removal']" } else { "['Local Moving', 'Packing', 'Storage']" }
    $bbb = if ($i -eq 1) { 'A' } else { 'A+' }
    $moverLines.Add((Format-MoverBlock $ids[$i] $names[$i] $ratings[$i] $reviews[$i] $descs[$i] $city $svc $bbb))
  }

  $idList = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $poolLines.Add(@"
  '$($c.poolId)': {
    id: '$($c.poolId)',
    label: '$($c.label)',
    moverIds: [
$idList
    ],
  },
"@)
}

$outDir = Join-Path $PSScriptRoot 'va-batch5-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Generated VA batch 5 catalog ($($counties.Count) locations x 10 movers)"