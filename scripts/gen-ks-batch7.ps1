$ErrorActionPreference = 'Stop'
$outDir = Join-Path $PSScriptRoot 'ks-batch7-out'
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$wichita8 = @(
  'two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines',
  'kansas-express-movers','kansas-regional-moving','kansas-pro-movers','kansas-family-movers'
)
$wichita4 = @('two-men-and-a-truck-sedgwick-ks','all-my-sons-wichita-ks','kansas-local-lines')

$counties = @(
  @{slug='republic';seat='Belleville';tier=8;region='north central';fmcsa=$true},
  @{slug='rooks';seat='Stockton';tier=8;region='northwest'},
  @{slug='stafford';seat='St. John';tier=8;region='central'},
  @{slug='barber';seat='Medicine Lodge';tier=8;region='south central'},
  @{slug='smith';seat='Smith Center';tier=8;region='north central'},
  @{slug='osborne';seat='Osborne';tier=8;region='north central'},
  @{slug='woodson';seat='Yates Center';tier=8;region='southeast'},
  @{slug='graham';seat='Hill City';tier=8;region='northwest'},
  @{slug='rawlins';seat='Atwood';tier=8;region='northwest'},
  @{slug='sheridan';seat='Hoxie';tier=8;region='northwest'},
  @{slug='kearny';seat='Lakin';tier=4;region='southwest'},
  @{slug='meade';seat='Meade';tier=4;region='southwest'},
  @{slug='haskell';seat='Sublette';tier=4;region='southwest'},
  @{slug='chautauqua';seat='Sedan';tier=4;region='southeast'},
  @{slug='rush';seat='La Crosse';tier=4;region='central'},
  @{slug='lincoln';seat='Lincoln';tier=4;region='central'},
  @{slug='jewell';seat='Mankato';tier=4;region='north central'},
  @{slug='trego';seat='WaKeeney';tier=4;region='central'},
  @{slug='decatur';seat='Oberlin';tier=4;region='northwest'},
  @{slug='logan';seat='Oakley';tier=4;region='northwest'},
  @{slug='ness';seat='Ness City';tier=4;region='central'},
  @{slug='gove';seat='Gove City';tier=4;region='central'},
  @{slug='edwards';seat='Kinsley';tier=4;region='central'},
  @{slug='chase';seat='Cottonwood Falls';tier=4;region='east central'},
  @{slug='clark';seat='Ashland';tier=4;region='southwest'},
  @{slug='comanche';seat='Coldwater';tier=4;region='south central'},
  @{slug='elk';seat='Howard';tier=4;region='southeast'},
  @{slug='hodgeman';seat='Jetmore';tier=4;region='southwest'},
  @{slug='kiowa';seat='Greensburg';tier=4;region='south central'},
  @{slug='lane';seat='Dighton';tier=4;region='southwest'},
  @{slug='morton';seat='Elkhart';tier=4;region='southwest'},
  @{slug='stanton';seat='Johnson City';tier=4;region='southwest'},
  @{slug='cheyenne';seat='St. Francis';tier=3;region='northwest';three=$true},
  @{slug='greeley';seat='Tribune';tier=3;region='west';three=$true},
  @{slug='hamilton';seat='Syracuse';tier=3;region='southwest';three=$true},
  @{slug='wallace';seat='Sharon Springs';tier=3;region='northwest';three=$true},
  @{slug='wichita';seat='Leoti';tier=3;region='west';three=$true}
)

$names = @{
  republic='Republic';rooks='Rooks';stafford='Stafford';barber='Barber';smith='Smith';osborne='Osborne';woodson='Woodson'
  graham='Graham';rawlins='Rawlins';sheridan='Sheridan';kearny='Kearny';meade='Meade';haskell='Haskell';chautauqua='Chautauqua'
  rush='Rush';lincoln='Lincoln';jewell='Jewell';trego='Trego';decatur='Decatur';logan='Logan';ness='Ness';gove='Gove'
  edwards='Edwards';chase='Chase';clark='Clark';comanche='Comanche';elk='Elk';hodgeman='Hodgeman';kiowa='Kiowa';lane='Lane'
  morton='Morton';stanton='Stanton';cheyenne='Cheyenne';greeley='Greeley';hamilton='Hamilton';wallace='Wallace';wichita='Wichita'
}

function Get-MetroSlug($seat) {
  return (($seat.ToLower() -replace '\.', '' -replace '\s+', '-' -replace "'", '') + '-metro-ks')
}
function Get-RegionalId($slug, $variant) {
  if ($variant) { return "regional-$slug-ks-movers-$variant" }
  return "regional-$slug-ks-movers"
}
function Get-MoverIds($c) {
  $slug = $c.slug
  if ($c.tier -eq 8) { return @(Get-RegionalId $slug $null) + $wichita8 }
  if ($c.tier -eq 4) { return @(Get-RegionalId $slug $null) + $wichita4 }
  return @(Get-RegionalId $slug $null), (Get-RegionalId $slug 2), (Get-RegionalId $slug 3)
}
function Get-Costs($tier) {
  if ($tier -eq 8) { return @{studio='$650–$1,350';family='$2,300–$5,200';hourly='$100–$145/hr for a 2-person crew'} }
  if ($tier -eq 4) { return @{studio='$600–$1,250';family='$2,200–$4,900';hourly='$100–$150/hr for a 2-person crew'} }
  return @{studio='$550–$1,150';family='$1,900–$4,400';hourly='$95–$145/hr for a 2-person crew'}
}

$assignments = New-Object System.Collections.Generic.List[string]
$research = New-Object System.Collections.Generic.List[string]
$testimonials = New-Object System.Collections.Generic.List[string]
$overrides = New-Object System.Collections.Generic.List[string]
$movers = New-Object System.Collections.Generic.List[string]
$metros = New-Object System.Collections.Generic.List[string]
$testNames = @('Ann K.','Ben L.','Cal M.','Dee N.','Eli O.','Fay P.','Gia Q.','Hal R.')

for ($i = 0; $i -lt $counties.Count; $i++) {
  $c = $counties[$i]
  $cn = $names[$c.slug]
  $seat = $c.seat
  $ids = Get-MoverIds $c
  $assignments.Add("  $($c.slug): [")
  foreach ($id in $ids) { $assignments.Add("    '$id',") }
  $assignments.Add('  ],')

  $cost = Get-Costs $c.tier
  if ($c.tier -eq 8) {
    $tips = @(
      "Verify coverage for $seat and surrounding areas before booking.",
      'Regional traffic impacts scheduling - confirm crew arrival windows.',
      'Confirm insurance for high-value homes before booking.',
      'Book early for peak seasons and month-end lease turnover.',
      $(if ($c.fmcsa) { 'Obtain multiple estimates and re-verify FMCSA authority, BBB rating, and current reviews.' } else { 'Obtain multiple estimates before booking.' })
    )
    $provider = 'cross-county crews from Wichita and Hays providers'
  } else {
    $tips = @(
      'Rural access challenges are common - confirm route feasibility before booking.',
      "Verify explicit regional service to $seat before booking.",
      'Storage is very limited - confirm availability if needed.',
      'Obtain multiple estimates before booking.',
      'Confirm credentials for rural moves before booking.'
    )
    $provider = if ($c.tier -eq 4) { 'cross-coverage from Wichita and Garden City providers' } else { 'very limited local crew availability, and regional providers serving remote rural properties' }
  }
  $tipLines = ($tips | ForEach-Object { "      '$_'," }) -join "`n"
  $research.Add(@"
  $($c.slug): {
    marketNotes:
      '$cn County is a rural $($c.region) Kansas county with residential demand centered on $seat.',
    costs: {
      studioRange: '$($cost.studio)',
      familyRange: '$($cost.family)',
      avgHourly: '$($cost.hourly)',
      note: '$cn County pricing reflects $($c.region) Kansas rural residential turnover, $seat corridor traffic, and $provider.',
    },
    tips: [
$tipLines
    ],
  },
"@)

  $n1 = $testNames[$i % $testNames.Count]
  $n2 = $testNames[($i+1) % $testNames.Count]
  $n3 = $testNames[($i+2) % $testNames.Count]
  if ($c.tier -eq 3) {
    $m2 = "Regional $seat providers confirmed $cn County coverage and delivered reliable remote-area service."
    $m3 = "Regional $seat area providers served our $seat relocation efficiently - timely and professional."
  } elseif ($c.tier -eq 4) {
    $m2 = "Two Men and a Truck Wichita confirmed $cn County coverage and delivered excellent $($c.region) Kansas service."
    $m3 = "Kansas Local Lines served our $seat relocation efficiently - fast, professional, and reliable with careful handling."
  } else {
    $m2 = "All My Sons Wichita confirmed $cn County coverage and delivered excellent $($c.region) Kansas service."
    $m3 = "Kansas Express Movers served our $seat relocation efficiently - professional crew with careful handling."
  }
  $testimonials.Add(@"
  $($c.slug): [
    { quote: 'Regional $seat providers handled our $cn County move professionally - efficient and careful throughout.', name: '$n1', location: '$seat, KS', rating: 5, moveType: 'Single-family' },
    { quote: '$m2', name: '$n2', location: '$seat, KS', rating: 5, moveType: 'Townhome' },
    { quote: '$m3', name: '$n3', location: '$seat, KS', rating: 5, moveType: 'Apartment' },
  ],
"@)

  $overrides.Add("  $($c.slug): { seat: '$seat', metro: '$(Get-MetroSlug $seat)' },")

  function Add-Mover($slug, $seat, $region, $tier, $variant) {
    $rid = Get-RegionalId $slug $variant
    if ($variant -eq 3) {
      $name = "Regional $seat Area Providers"
      $desc = "Local support for $cn County residential moves across $seat and surrounding rural communities."
      $rating = 4.5; $rc = 4
    } elseif ($variant -eq 2) {
      $name = "Regional $seat / $cn Providers"
      $desc = "Regional mover with capability for $cn County relocations across $seat and remote rural properties."
      $rating = 4.5; $rc = 5
    } elseif ($tier -eq 3) {
      $name = "Regional $seat / $cn Providers"
      $desc = "Reliable regional mover serving $cn County residential needs across $seat and surrounding $region Kansas communities."
      $rating = 4.6; $rc = 6
    } else {
      $name = "Regional $seat / $cn Providers"
      $desc = "Reliable movers serving $cn County residential needs across $seat and surrounding $region Kansas communities."
      $rating = 4.7; $rc = if ($tier -eq 8) { 26 } else { 8 }
    }
    $movers.Add(@"
  '$rid': {
    id: '$rid',
    name: '$name',
    rating: $rating,
    reviewCount: $rc,
    shortDescription:
      '$desc',
    services: ['Local Moving', 'Packing'],
    specialties: ['Residential'],
    fmcsaSafetyRating: 'Not Rated',
    city: '$seat area',
  },
"@)
  }

  if ($c.three) {
    Add-Mover $c.slug $seat $c.region $c.tier $null
    Add-Mover $c.slug $seat $c.region $c.tier 2
    Add-Mover $c.slug $seat $c.region $c.tier 3
  } else {
    Add-Mover $c.slug $seat $c.region $c.tier $null
  }

  $ms = Get-MetroSlug $seat
  $idLines = ($ids | ForEach-Object { "      '$_'," }) -join "`n"
  $metros.Add(@"
  '$ms': {
    id: '$ms',
    label: '$seat Metro',
    moverIds: [
$idLines
    ],
  },
"@)
}

$neighbors = @'
  republic: ['cloud', 'washington', 'marshall', 'jewell', 'smith', 'norton'],
  rooks: ['phillips', 'smith', 'osborne', 'ellis', 'graham', 'jewell'],
  stafford: ['rice', 'barton', 'reno', 'pratt', 'kingman', 'edwards'],
  barber: ['harper', 'kingman', 'pratt', 'kiowa', 'comanche', 'sumner'],
  smith: ['jewell', 'phillips', 'norton', 'republic', 'mitchell', 'osborne'],
  osborne: ['smith', 'mitchell', 'lincoln', 'russell', 'rooks', 'ellis'],
  woodson: ['wilson', 'allen', 'neosho', 'coffey', 'greenwood', 'elk'],
  graham: ['norton', 'decatur', 'rawlins', 'rooks', 'trego', 'ellis'],
  rawlins: ['thomas', 'sherman', 'cheyenne', 'decatur', 'graham', 'norton'],
  sheridan: ['thomas', 'sherman', 'decatur', 'rawlins', 'logan', 'graham'],
  kearny: ['finney', 'grant', 'hamilton', 'wichita', 'haskell', 'lane'],
  meade: ['gray', 'ford', 'clark', 'seward', 'haskell', 'finney'],
  haskell: ['finney', 'seward', 'grant', 'kearny', 'meade', 'gray'],
  chautauqua: ['elk', 'cowley', 'wilson', 'montgomery', 'labette', 'greenwood'],
  rush: ['ellis', 'norton', 'trego', 'pawnee', 'barton', 'ness'],
  lincoln: ['saline', 'ottawa', 'mitchell', 'ellsworth', 'russell', 'osborne'],
  jewell: ['republic', 'cloud', 'mitchell', 'smith', 'phillips', 'washington'],
  trego: ['ellis', 'rush', 'gove', 'ness', 'lane', 'graham'],
  decatur: ['sheridan', 'rawlins', 'norton', 'graham', 'thomas', 'sherman'],
  logan: ['sherman', 'wallace', 'greeley', 'scott', 'thomas', 'rawlins'],
  ness: ['rush', 'trego', 'lane', 'pawnee', 'gove', 'hodgeman'],
  gove: ['trego', 'ness', 'lane', 'scott', 'logan', 'graham'],
  edwards: ['pawnee', 'pratt', 'kiowa', 'barber', 'stafford', 'ness'],
  chase: ['lyon', 'greenwood', 'butler', 'marion', 'morris', 'wabaunsee'],
  clark: ['ford', 'meade', 'gray', 'comanche', 'kiowa', 'edwards'],
  comanche: ['barber', 'kiowa', 'clark', 'edwards', 'pratt', 'harper'],
  elk: ['wilson', 'chautauqua', 'greenwood', 'montgomery', 'cowley', 'woodson'],
  hodgeman: ['pawnee', 'edwards', 'ford', 'gray', 'ness', 'finney'],
  kiowa: ['barber', 'pratt', 'edwards', 'comanche', 'clark', 'kingman'],
  lane: ['finney', 'scott', 'gove', 'ness', 'trego', 'greeley'],
  morton: ['stevens', 'grant', 'stanton', 'seward', 'hamilton', 'haskell'],
  stanton: ['grant', 'stevens', 'morton', 'hamilton', 'seward', 'haskell'],
  cheyenne: ['rawlins', 'sherman', 'wallace', 'logan', 'decatur', 'thomas'],
  greeley: ['wallace', 'logan', 'scott', 'lane', 'wichita', 'hamilton'],
  hamilton: ['kearny', 'grant', 'stanton', 'morton', 'greeley', 'wichita'],
  wallace: ['sherman', 'logan', 'greeley', 'scott', 'thomas', 'cheyenne'],
  wichita: ['hamilton', 'greeley', 'scott', 'kearny', 'lane', 'wallace'],
'@

Set-Content (Join-Path $outDir 'assignments.txt') ($assignments -join "`n") -Encoding utf8
Set-Content (Join-Path $outDir 'research.txt') ($research -join "`n") -Encoding utf8
Set-Content (Join-Path $outDir 'testimonials.txt') ($testimonials -join "`n") -Encoding utf8
Set-Content (Join-Path $outDir 'overrides.txt') ($overrides -join "`n") -Encoding utf8
Set-Content (Join-Path $outDir 'neighbors.txt') $neighbors.Trim() -Encoding utf8
Set-Content (Join-Path $outDir 'movers.txt') ($movers -join "`n") -Encoding utf8
Set-Content (Join-Path $outDir 'metros.txt') ($metros -join "`n") -Encoding utf8
Write-Host "Generated $($counties.Count) counties to $outDir"