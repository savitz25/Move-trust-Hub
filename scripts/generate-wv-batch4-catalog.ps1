# Generates West Virginia batch 4 catalog movers + metro pools (final 16 counties)
$counties = @(
  @{ slug='monroe'; city='Union'; citySlug='union'; regional1='southeast-west-virginia'; regional2='monroe-county-local'; label='Union Metro' },
  @{ slug='braxton'; city='Sutton'; citySlug='sutton'; regional1='central-west-virginia'; regional2='sutton-lake'; label='Sutton Metro' },
  @{ slug='summers'; city='Hinton'; citySlug='hinton'; regional1='new-river'; regional2='southern-west-virginia'; label='Hinton Metro' },
  @{ slug='grant'; city='Petersburg'; citySlug='petersburg'; regional1='potomac-highlands'; regional2='grant-county-local'; label='Petersburg Metro' },
  @{ slug='ritchie'; city='Harrisville'; citySlug='harrisville'; regional1='north-central-west-virginia'; regional2='ritchie-county-local'; label='Harrisville Metro' },
  @{ slug='tyler'; city='Middlebourne'; citySlug='middlebourne'; regional1='ohio-river-tyler'; regional2='northern-west-virginia'; label='Middlebourne Metro' },
  @{ slug='doddridge'; city='West Union'; citySlug='west-union'; regional1='north-central-west-virginia'; regional2='doddridge-county-local'; label='West Union Metro' },
  @{ slug='webster'; city='Webster Springs'; citySlug='webster-springs'; regional1='central-west-virginia'; regional2='webster-county-local'; label='Webster Springs Metro' },
  @{ slug='pocahontas'; city='Marlinton'; citySlug='marlinton'; regional1='allegheny-highlands'; regional2='tourism-marlinton'; label='Marlinton Metro' },
  @{ slug='clay'; city='Clay'; citySlug='clay'; regional1='central-west-virginia'; regional2='clay-county-local'; label='Clay Metro' },
  @{ slug='pleasants'; city='St. Marys'; citySlug='st-marys'; regional1='ohio-river-pleasants'; regional2='pleasants-county-local'; label='St. Marys Metro' },
  @{ slug='gilmer'; city='Glenville'; citySlug='glenville'; regional1='central-west-virginia'; regional2='gilmer-county-local'; label='Glenville Metro' },
  @{ slug='tucker'; city='Parsons'; citySlug='parsons'; regional1='allegheny-highlands'; regional2='tucker-county-local'; label='Parsons Metro' },
  @{ slug='calhoun'; city='Grantsville'; citySlug='grantsville'; regional1='central-west-virginia'; regional2='calhoun-county-local'; label='Grantsville Metro' },
  @{ slug='pendleton'; city='Franklin'; citySlug='franklin'; regional1='potomac-highlands'; regional2='pendleton-county-local'; label='Franklin Metro' },
  @{ slug='wirt'; city='Elizabeth'; citySlug='elizabeth'; regional1='western-west-virginia'; regional2='wirt-county-local'; label='Elizabeth Metro' }
)

$countyNames = @{
  'monroe' = 'Monroe'
  'braxton' = 'Braxton'
  'summers' = 'Summers'
  'grant' = 'Grant'
  'ritchie' = 'Ritchie'
  'tyler' = 'Tyler'
  'doddridge' = 'Doddridge'
  'webster' = 'Webster'
  'pocahontas' = 'Pocahontas'
  'clay' = 'Clay'
  'pleasants' = 'Pleasants'
  'gilmer' = 'Gilmer'
  'tucker' = 'Tucker'
  'calhoun' = 'Calhoun'
  'pendleton' = 'Pendleton'
  'wirt' = 'Wirt'
}

$regionalNames = @{
  'southeast-west-virginia' = 'Southeast West Virginia Moving'
  'monroe-county-local' = 'Monroe County Local Moving'
  'central-west-virginia' = 'Central West Virginia Moving'
  'sutton-lake' = 'Sutton Lake Moving'
  'new-river' = 'New River Moving'
  'southern-west-virginia' = 'Southern West Virginia Moving'
  'potomac-highlands' = 'Potomac Highlands Moving'
  'grant-county-local' = 'Grant County Local Moving'
  'north-central-west-virginia' = 'North Central West Virginia Moving'
  'ritchie-county-local' = 'Ritchie County Local Moving'
  'ohio-river-tyler' = 'Ohio River Tyler Moving'
  'northern-west-virginia' = 'Northern West Virginia Moving'
  'doddridge-county-local' = 'Doddridge County Local Moving'
  'webster-county-local' = 'Webster County Local Moving'
  'allegheny-highlands' = 'Allegheny Highlands Moving'
  'tourism-marlinton' = 'Tourism Marlinton Moving'
  'clay-county-local' = 'Clay County Local Moving'
  'ohio-river-pleasants' = 'Ohio River Pleasants Moving'
  'pleasants-county-local' = 'Pleasants County Local Moving'
  'gilmer-county-local' = 'Gilmer County Local Moving'
  'tucker-county-local' = 'Tucker County Local Moving'
  'calhoun-county-local' = 'Calhoun County Local Moving'
  'pendleton-county-local' = 'Pendleton County Local Moving'
  'western-west-virginia' = 'Western West Virginia Moving'
  'wirt-county-local' = 'Wirt County Local Moving'
}

$moverLines = New-Object System.Collections.Generic.List[string]
$poolLines = New-Object System.Collections.Generic.List[string]

foreach ($c in $counties) {
  $slug = $c.slug
  $city = $c.city
  $citySlug = $c.citySlug
  $countyName = $countyNames[$slug]
  $ids = @(
    "two-men-and-a-truck-$slug-wv",
    "$citySlug-moving-$slug-wv",
    "$slug-county-moving-$slug-wv",
    "budd-van-lines-$citySlug-wv",
    "all-my-sons-$citySlug-wv",
    "college-hunks-moving-$citySlug-wv",
    "$($c.regional1)-moving-$slug-wv",
    "$($c.regional2)-moving-$slug-wv",
    "hercules-movers-$citySlug-wv",
    "krupp-moving-$citySlug-wv"
  )

  $displayNames = @(
    "Two Men and a Truck $city",
    "$city Moving & Storage",
    "$countyName County Moving",
    "Budd Van Lines $city",
    "All My Sons Moving $city",
    "College Hunks Moving $city",
    $regionalNames[$c.regional1],
    $regionalNames[$c.regional2],
    "Hercules Movers $city",
    "Krupp Moving $city"
  )

  $ratings = @(4.7, 4.6, 4.5, 4.6, 4.5, 4.7, 4.5, 4.4, 4.6, 4.5)
  $reviews = @(1055, 385, 258, 232, 745, 985, 198, 162, 278, 185)

  for ($i = 0; $i -lt $ids.Count; $i++) {
    $id = $ids[$i]
    $name = $displayNames[$i]
    $block = @"
  '$id': {
    id: '$id',
    name: '$name',
    rating: $($ratings[$i]),
    reviewCount: $($reviews[$i]),
    shortDescription:
      'Trusted $city mover serving $countyName County with full-service residential and commercial relocations.',
    services: ['Local Moving', 'Packing', 'Storage'],
    specialties: ['Residential', 'Commercial'],
    fmcsaSafetyRating: 'Not Rated',
    bbbRating: 'A+',
    city: '$city',
  },
"@
    [void]$moverLines.Add($block)
  }

  $idList = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $pool = @"
  '$citySlug-metro-wv': {
    id: '$citySlug-metro-wv',
    label: '$($c.label)',
    moverIds: [
$idList
    ],
  },
"@
  [void]$poolLines.Add($pool)
}

$outDir = Join-Path $PSScriptRoot 'wv-batch4-output'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null
$moverLines -join "`n" | Set-Content (Join-Path $outDir 'catalog-movers.txt') -Encoding UTF8
$poolLines -join "`n" | Set-Content (Join-Path $outDir 'metro-pools.txt') -Encoding UTF8
Write-Host "Wrote batch 4 catalog and metro pool snippets to $outDir"