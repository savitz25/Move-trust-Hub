$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'wisconsin-batch3-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-dunn-wi-movers': \{") {
  Write-Host 'Wisconsin batch 3 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-sparta-wi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Wisconsin batch 3 catalog movers'
}

if ($content -match "'dunn-metro-wi': \{") {
  Write-Host 'Wisconsin batch 3 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'monroe-metro-wi': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Wisconsin batch 3 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Wisconsin batch 3 insert complete'