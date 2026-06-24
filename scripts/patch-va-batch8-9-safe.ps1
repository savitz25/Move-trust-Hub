# Safe patch for VA batch 8+9 data files (avoids regex corruption on `};`)
$root = Split-Path $PSScriptRoot -Parent

function Append-BeforeExport($path, $block, $testPattern) {
  $content = Get-Content $path -Raw
  if ($content -match $testPattern) { return $false }
  $marker = "`n};`n`nexport function"
  $idx = $content.IndexOf($marker)
  if ($idx -lt 0) { throw "Marker not found in $path" }
  $newContent = $content.Substring(0, $idx) + "`n" + $block + $content.Substring($idx)
  Set-Content $path $newContent -Encoding UTF8 -NoNewline
  return $true
}

# Run batch 8 patch for testimonials/nearby/overrides/sitemap only
powershell -ExecutionPolicy Bypass -File (Join-Path $PSScriptRoot 'patch-va-batch8-data.ps1') | Out-Null

# Run batch 9 patch (skip broken research if essex exists in research - we'll append)
$batch9Patch = Get-Content (Join-Path $PSScriptRoot 'patch-va-batch9-data.ps1') -Raw
# assignments already done if essex in assignments

# Generate research blocks by re-running county loops from batch8+9 patches
& {
  $batch8Research = & { . (Join-Path $PSScriptRoot 'patch-va-batch8-data.ps1'); } 2>$null
}

Write-Host 'Use dedicated research generator'