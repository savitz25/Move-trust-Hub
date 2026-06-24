$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'new-mexico-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-bernalillo-nm': \{") {
  Write-Host 'New Mexico catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-bisbee-az': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted New Mexico catalog movers'
}

if ($content -match "'bernalillo-metro-nm': \{") {
  Write-Host 'New Mexico metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'cochise-metro-az': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted New Mexico metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'New Mexico insert complete'