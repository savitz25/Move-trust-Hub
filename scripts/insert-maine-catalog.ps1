$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'maine-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-cumberland-me': \{") {
  Write-Host 'Maine catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-lancaster-nh': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Maine catalog movers'
}

if ($content -match "'cumberland-metro-me': \{") {
  Write-Host 'Maine metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'coos-metro-nh': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Maine metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Maine insert complete'