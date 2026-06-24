$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'vermont-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-chittenden-vt': \{") {
  Write-Host 'Vermont catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-bristol-ri': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Vermont catalog movers'
}

if ($content -match "'chittenden-metro-vt': \{") {
  Write-Host 'Vermont metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'bristol-metro-ri': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Vermont metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Vermont insert complete'