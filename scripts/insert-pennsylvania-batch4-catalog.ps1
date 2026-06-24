$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'pennsylvania-batch4-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-cambria-pa-movers': \{") {
  Write-Host 'Pennsylvania batch 4 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-pottsville-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Pennsylvania batch 4 catalog movers'
}

if ($content -match "'cambria-metro-pa': \{") {
  Write-Host 'Pennsylvania batch 4 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'schuylkill-metro-pa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Pennsylvania batch 4 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Pennsylvania batch 4 insert complete'