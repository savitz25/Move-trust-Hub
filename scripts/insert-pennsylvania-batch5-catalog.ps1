$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch5-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-bradford-pa-movers': \{") {
  Write-Host 'Pennsylvania batch 5 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-milford-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Pennsylvania batch 5 catalog movers'
}

if ($content -match "'bradford-metro-pa': \{") {
  Write-Host 'Pennsylvania batch 5 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'pike-metro-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Pennsylvania batch 5 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Pennsylvania batch 5 insert complete'