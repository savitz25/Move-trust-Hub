# Safely append batch 8+9 research without regex corruption
$root = Split-Path $PSScriptRoot -Parent
$path = Join-Path $root 'data\virginia-county-research.ts'
$content = Get-Content $path -Raw
$content = $content -replace 'batches 1–7', 'batches 1–9'
$marker = "`n};`n`nexport function getVirginiaCountyResearch"
$idx = $content.IndexOf($marker)
if ($idx -lt 0) { throw 'Research marker not found' }

$batch8 = Get-Content (Join-Path $PSScriptRoot 'va-batch8-research-append.txt') -Raw
$batch9 = Get-Content (Join-Path $PSScriptRoot 'va-batch9-research-append.txt') -Raw
$newContent = $content.Substring(0, $idx) + "`n" + $batch8 + $batch9 + $content.Substring($idx)
Set-Content $path $newContent -Encoding UTF8 -NoNewline
Write-Host 'Appended batch 8+9 research safely'