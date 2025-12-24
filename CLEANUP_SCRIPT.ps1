# Cleanup Script for Visit Sri Lanka App
# This script removes unused Next.js files and duplicate directories

Write-Host "=== Visit Sri Lanka App Cleanup ===" -ForegroundColor Cyan
Write-Host ""

# Items to remove
$itemsToRemove = @(
    # Next.js specific files
    "app",
    "middleware.ts",
    "next.config.ts",
    "next.config.dev.js",
    "next.config.prod.js",
    "next-env.d.ts",
    
    # Root-level duplicate directories
    "components",
    "context",
    "lib",
    "hooks",
    "store",
    "stores",
    
    # Test scripts
    "test-connection-multiple.js",
    "test-db-connection.js",
    "test-user-connection.js",
    
    # Build artifacts
    "deployment-package",
    "tsconfig.tsbuildinfo"
)

$removedCount = 0
$notFoundCount = 0

foreach ($item in $itemsToRemove) {
    $path = Join-Path $PSScriptRoot $item
    
    if (Test-Path $path) {
        try {
            if (Test-Path $path -PathType Container) {
                Remove-Item $path -Recurse -Force
                Write-Host "✅ Removed directory: $item" -ForegroundColor Green
            } else {
                Remove-Item $path -Force
                Write-Host "✅ Removed file: $item" -ForegroundColor Green
            }
            $removedCount++
        } catch {
            Write-Host "❌ Error removing $item : $_" -ForegroundColor Red
        }
    } else {
        Write-Host "⚠️  Not found (may already be removed): $item" -ForegroundColor Yellow
        $notFoundCount++
    }
}

Write-Host ""
Write-Host "=== Cleanup Summary ===" -ForegroundColor Cyan
Write-Host "Removed: $removedCount items" -ForegroundColor Green
Write-Host "Not found: $notFoundCount items" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Run: npm run build (to verify build still works)"
Write-Host "2. Run: npm run dev (to verify dev server starts)"
Write-Host "3. Test the application in browser"

