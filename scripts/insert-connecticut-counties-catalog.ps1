$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'connecticut-counties-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-fairfield-ct': \{") {
  Write-Host 'Connecticut county catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-putnam-ct': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Connecticut county catalog movers'
}

if ($content -match "'fairfield-metro-ct': \{") {
  Write-Host 'Connecticut county metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'northeastern-connecticut-metro-ct': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Connecticut county metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Connecticut county insert complete'