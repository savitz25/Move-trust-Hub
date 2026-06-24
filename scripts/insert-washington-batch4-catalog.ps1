$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'washington-output'
$catalog = Get-Content (Join-Path $outDir 'batch4-catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'batch4-metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-mason-wa-movers': \{") {
  Write-Host 'Washington batch 4 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-aberdeen-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Washington batch 4 catalog movers'
}

if ($content -match "'mason-metro-wa': \{") {
  Write-Host 'Washington batch 4 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'grays-harbor-metro-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Washington batch 4 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Washington batch 4 insert complete'