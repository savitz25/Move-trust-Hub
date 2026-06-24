$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'dc-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pool = Get-Content (Join-Path $outDir 'metro-pool.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-washingtondc': \{") {
  Write-Host 'DC catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-wytheville-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted DC catalog movers'
}

if ($content -match "'washington-dc-metro-dc': \{") {
  Write-Host 'DC metro pool already inserted — skipping pool'
} else {
  $content = $content -replace "(\s+'wythe-metro-va': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pool`$2"
  Write-Host 'Inserted DC metro pool'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'DC insert complete'