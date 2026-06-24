$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'rhode-island-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-providence-ri': \{") {
  Write-Host 'Rhode Island catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-nantucket-ma': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Rhode Island catalog movers'
}

if ($content -match "'providence-metro-ri': \{") {
  Write-Host 'Rhode Island metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'nantucket-metro-ma': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Rhode Island metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Rhode Island insert complete'