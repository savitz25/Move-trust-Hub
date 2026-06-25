$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'utah-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-saltlake-ut': \{") {
  Write-Host 'Utah catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-roy-nm': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Utah catalog movers'
}

if ($content -match "'salt-lake-metro-ut': \{") {
  Write-Host 'Utah metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'harding-metro-nm': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Utah metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Utah insert complete'