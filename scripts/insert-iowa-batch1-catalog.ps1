$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'iowa-batch1-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-polk-ia': \{") {
  Write-Host 'Iowa batch 1 catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-bartlett-ne': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Iowa batch 1 catalog movers'
}

if ($content -match "'polk-metro-ia': \{") {
  Write-Host 'Iowa batch 1 metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'wheeler-metro-ne': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Iowa batch 1 metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Iowa batch 1 insert complete'