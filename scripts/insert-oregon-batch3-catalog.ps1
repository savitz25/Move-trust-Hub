$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'oregon-output'
$catalog = Get-Content (Join-Path $outDir 'batch3-catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'batch3-metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'regional-clatsop-or-movers': \{") {
  Write-Host 'Oregon batch 3 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-fossil-or': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Oregon batch 3 catalog movers'
}

if ($content -match "'clatsop-metro-or': \{") {
  Write-Host 'Oregon batch 3 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'wheeler-metro-or': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Oregon batch 3 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Oregon batch 3 insert complete'