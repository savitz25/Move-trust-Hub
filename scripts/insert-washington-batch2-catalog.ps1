$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'washington-output'
$catalog = Get-Content (Join-Path $outDir 'batch2-catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'batch2-metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-pierce-wa': \{") {
  Write-Host 'Washington batch 2 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-seattle-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Washington batch 2 catalog movers'
}

if ($content -match "'pierce-metro-wa': \{") {
  Write-Host 'Washington batch 2 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'king-metro-wa': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Washington batch 2 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Washington batch 2 insert complete'