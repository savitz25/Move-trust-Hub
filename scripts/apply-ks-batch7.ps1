$ErrorActionPreference = 'Stop'
$root = Split-Path $PSScriptRoot -Parent
$out = Join-Path $PSScriptRoot 'ks-batch7-out'

function Insert-BeforeMarker($file, $marker, $content) {
  $text = Get-Content $file -Raw -Encoding UTF8
  if ($text -notmatch [regex]::Escape($marker)) { throw "Marker not found in $file : $marker" }
  $newText = $text.Replace($marker, ($content.TrimEnd() + "`n" + $marker))
  Set-Content $file $newText -Encoding UTF8 -NoNewline
  Write-Host "Updated $file"
}

$assignments = Get-Content (Join-Path $out 'assignments.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'data\kansas-county-assignments.ts') "};`n`nexport const kansasCountyMoverAssignments" $assignments

$research = Get-Content (Join-Path $out 'research.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'data\kansas-county-research.ts') "};`n`nexport function getKansasCountyResearch" $research

$testimonials = Get-Content (Join-Path $out 'testimonials.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'data\kansas-county-testimonials.ts') "};`n`nexport function getKansasCountyTestimonials" $testimonials

$overrides = Get-Content (Join-Path $out 'overrides.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'lib\local-movers\geography\kansas-overrides.ts') "};`n`nexport function applyKansasCountyOverrides" $overrides

$neighbors = Get-Content (Join-Path $out 'neighbors.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'lib\local-movers\kansas-nearby.ts') "};`n`nexport function getKansasNearbyCounties" $neighbors

$movers = Get-Content (Join-Path $out 'movers.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'data\local-movers-seed.ts') "};`n`nexport const metroMoverPools" $movers

$metros = Get-Content (Join-Path $out 'metros.txt') -Raw -Encoding UTF8
Insert-BeforeMarker (Join-Path $root 'data\local-movers-seed.ts') "  'morgan-city-metro-la': {" $metros

# Sitemap - add all batch 7 slugs
$batch7Slugs = @(
  'republic','rooks','stafford','barber','smith','osborne','woodson','graham','rawlins','sheridan',
  'kearny','meade','haskell','chautauqua','rush','lincoln','jewell','trego','decatur','logan','ness','gove','edwards',
  'chase','clark','comanche','elk','hodgeman','kiowa','lane','morton','stanton',
  'cheyenne','greeley','hamilton','wallace','wichita'
)
$sitemap = Join-Path $root 'app\sitemap-local\sitemap.ts'
$sText = Get-Content $sitemap -Raw -Encoding UTF8
if ($sText -notmatch "  'scott',\r?\n\]\);") { throw 'Sitemap marker not found' }
$addLines = ($batch7Slugs | ForEach-Object { "  '$_'," }) -join "`n"
$sText = $sText -replace "  'scott',\r?\n\]\);", ("  'scott',`n" + $addLines + "`n]);")
Set-Content $sitemap $sText -Encoding UTF8 -NoNewline
Write-Host "Updated sitemap"

Write-Host 'Batch 7 applied successfully'