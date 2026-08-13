# Logpresso Design System 문서 로컬 미러링 스크립트
# 사용법: powershell -ExecutionPolicy Bypass -File .\design-ref\sync-logpresso-docs.ps1
# 원본: https://design.logpresso.com/ (AI 에이전트용 공개 문서 트리)
# HTML fallback(비공개 파일)은 저장하지 않고 경고 목록에만 남긴다.

$ErrorActionPreference = 'Stop'
$BaseUrl = 'https://design.logpresso.com'
$RootDir = Join-Path $PSScriptRoot 'logpresso'
$TempManifest = Join-Path $env:TEMP 'logpresso-manifest.json'
$Log = New-Object System.Collections.Generic.List[string]
$Skipped = New-Object System.Collections.Generic.List[string]
$script:Downloaded = 0

if (-not (Test-Path -LiteralPath $RootDir)) {
    New-Item -ItemType Directory -Path $RootDir -Force | Out-Null
}

# 한 파일을 BaseUrl 기준 상대 경로로 다운로드. HTML fallback 감지 포함.
function Get-LogpressoFile {
    param([string]$RelativePath)
    $url = "$BaseUrl/$RelativePath"
    $dest = Join-Path $RootDir ($RelativePath -replace '/', '\')
    $expectedExt = [System.IO.Path]::GetExtension($RelativePath).ToLowerInvariant()
    try {
        $resp = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 60
        $contentType = ($resp.Headers['Content-Type'] -split ';')[0].ToLowerInvariant()
        # HTML fallback 감지: .md/.json을 요청했는데 text/html이 오면 비공개 파일로 간주
        if ($expectedExt -in '.md', '.json' -and $contentType -eq 'text/html') {
            $Skipped.Add("$RelativePath (HTML fallback, public not served)")
            return
        }
        $destDir = Split-Path -Parent $dest
        if (-not (Test-Path -LiteralPath $destDir)) {
            New-Item -ItemType Directory -Path $destDir -Force | Out-Null
        }
        [System.IO.File]::WriteAllText($dest, $resp.Content, (New-Object System.Text.UTF8Encoding($false)))
        $script:Downloaded++
        $Log.Add("OK   $RelativePath ($($resp.RawContentLength) bytes)")
    } catch {
        $Skipped.Add("$RelativePath (ERROR: $($_.Exception.Message))")
    }
}

# 1) 매니페스트를 먼저 받아 컴포넌트 경로를 추출한다
Write-Host '==> manifest download'
Get-LogpressoFile 'design-system.manifest.json'
$manifestPath = Join-Path $RootDir 'design-system.manifest.json'
if (-not (Test-Path -LiteralPath $manifestPath)) {
    throw 'manifest download failed'
}
$manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json

# 2) 루트 엔트리포인트
Get-LogpressoFile 'design-system.schema.json'
Get-LogpressoFile 'agent-starters.json'

# 3) docs 루트 파일
Get-LogpressoFile 'docs/AI-AGENT-GUIDE.md'

# 3-1) 컴포넌트 인덱스 (매니페스트 entrypoint.componentIndex)
Get-LogpressoFile 'docs/components/components.md'

# 4) 컴포넌트 (매니페스트에서 경로 추출)
Write-Host "==> components ($($manifest.components.Count))"
foreach ($c in $manifest.components) {
    Get-LogpressoFile $c.path
}

# 5) 패턴 (매니페스트에 없는 screen 패턴 + UX baseline + reference 예시)
$patternFiles = @(
    'docs/patterns/patterns.md',
    'docs/patterns/dashboard.md',
    'docs/patterns/data-table-workflow.md',
    'docs/patterns/list-detail.md',
    'docs/patterns/settings-form.md',
    'docs/patterns/audit-timeline.md',
    'docs/patterns/wizard-flow.md',
    'docs/patterns/ux-baseline/bulk-action.md',
    'docs/patterns/ux-baseline/destructive-action.md',
    'docs/patterns/ux-baseline/loading-feedback.md',
    'docs/patterns/ux-baseline/optimistic-update.md',
    'docs/patterns/ux-baseline/form-submission.md',
    'docs/patterns/ux-baseline/inline-editing.md',
    'docs/patterns/ux-baseline/hierarchical-navigation.md',
    'docs/patterns/ux-baseline/empty-state-recovery.md',
    'docs/patterns/ux-baseline/permission-based-ui.md',
    'docs/patterns/reference-screen-examples.json',
    'docs/patterns/reference-screen-examples.md'
)
Write-Host '==> patterns'
foreach ($p in $patternFiles) { Get-LogpressoFile $p }

# 6) foundation
$foundationFiles = @(
    'docs/foundation/icon.md',
    'docs/foundation/color.md',
    'docs/foundation/spacing.md',
    'docs/foundation/typography.md',
    'docs/foundation/radius.md',
    'docs/foundation/border.md',
    'docs/foundation/shadow.md',
    'docs/foundation/state.md',
    'docs/foundation/accessibility.md',
    'docs/foundation/motion.md',
    'docs/foundation/layer.md',
    'docs/foundation/content.md'
)
Write-Host '==> foundation'
foreach ($f in $foundationFiles) { Get-LogpressoFile $f }

# 7) tokens / accessibility / ai
$miscFiles = @(
    'docs/tokens/tokens.md',
    'docs/tokens/design-tokens.json',
    'docs/accessibility/accessibility-matrix.md',
    'docs/accessibility/component-accessibility-matrix.json',
    'docs/accessibility/component-accessibility-coverage.md',
    'docs/accessibility/component-accessibility-coverage.json',
    'docs/ai/reference-design-output-template.md',
    'docs/ai/public-readiness-report.md',
    'docs/ai/publication-policy.md'
)
Write-Host '==> tokens/accessibility/ai'
foreach ($m in $miscFiles) { Get-LogpressoFile $m }

# 8) 요약
$total = (Get-ChildItem -Path $RootDir -Recurse -File | Measure-Object).Count
$size = (Get-ChildItem -Path $RootDir -Recurse -File | Measure-Object -Property Length -Sum).Sum
Write-Host ''
Write-Host "Downloaded: $Downloaded files"
Write-Host "Files on disk: $total"
Write-Host ("Size: {0:N2} MB" -f ($size / 1MB))
if ($Skipped.Count -gt 0) {
    Write-Host "Skipped (public not served): $($Skipped.Count)"
    $Skipped | ForEach-Object { Write-Host "  - $_" }
}
