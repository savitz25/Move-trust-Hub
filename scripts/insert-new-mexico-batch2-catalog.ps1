$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'new-mexico-batch2-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-curry-nm-movers': \{") {
  Write-Host 'New Mexico batch 2 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-roswell-nm': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted New Mexico batch 2 catalog movers'
}

if ($content -match "'curry-metro-nm': \{") {
  Write-Host 'New Mexico batch 2 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'chaves-metro-nm': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted New Mexico batch 2 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'New Mexico batch 2 insert complete'