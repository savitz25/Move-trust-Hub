$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'pennsylvania-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-philadelphia-pa': \{") {
  Write-Host 'Pennsylvania catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-chestertown-md': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Pennsylvania catalog movers'
}

if ($content -match "'philadelphia-metro-pa': \{") {
  Write-Host 'Pennsylvania metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'kent-metro-md': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Pennsylvania metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Pennsylvania insert complete'