$root = Split-Path $PSScriptRoot -Parent
$seed = Join-Path $root 'data\local-movers-seed.ts'
$outDir = Join-Path $PSScriptRoot 'colorado-output'
$catalog = Get-Content (Join-Path $outDir 'catalog-movers.txt') -Raw
$pools = Get-Content (Join-Path $outDir 'metro-pools.txt') -Raw
$content = Get-Content $seed -Raw

if ($content -match "'twomenandatruck-elpaso-co': \{") {
  Write-Host 'Colorado catalog already inserted — skipping catalog'
} else {
  $content = $content -replace "(\s+'krupp-moving-manila-ut': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$catalog`$2"
  Write-Host 'Inserted Colorado catalog movers'
}

if ($content -match "'el-paso-metro-co': \{") {
  Write-Host 'Colorado metro pools already inserted — skipping pools'
} else {
  $content = $content -replace "(\s+'daggett-metro-ut': \{[\s\S]*?\n  \},\r?\n)(\};)", "`$1$pools`$2"
  Write-Host 'Inserted Colorado metro pools'
}

Set-Content $seed $content -Encoding UTF8 -NoNewline
Write-Host 'Colorado insert complete'