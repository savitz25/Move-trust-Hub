$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'washington-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-king-wa': \{") {
  Write-Host 'Washington catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-juneau-ak': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Washington catalog movers'
}

if ($content -match "'king-metro-wa': \{") {
  Write-Host 'Washington metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'juneau-metro-ak': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Washington metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Washington insert complete'