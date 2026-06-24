$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'nevada-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-clark-nv': \{") {
  Write-Host 'Nevada catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-fossil-or': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Nevada catalog movers'
}

if ($content -match "'clark-metro-nv': \{") {
  Write-Host 'Nevada metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'wheeler-metro-or': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Nevada metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Nevada insert complete'