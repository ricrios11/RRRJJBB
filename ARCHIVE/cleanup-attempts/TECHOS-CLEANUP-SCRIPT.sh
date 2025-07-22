#!/bin/bash
# =============================================================================
# 🎛️ TECHOS NUCLEAR CLEANUP SCRIPT
# Eliminate all redundant builds - Keep only /dist/ as single source of truth
# =============================================================================

echo "🚨 TECHOS NUCLEAR CLEANUP INITIATED"
echo "⚠️  This will DELETE all redundant build directories"
echo "✅ Preserving: /dist/ (final deployment package)"
echo ""

read -p "Are you sure you want to proceed? (yes/no): " confirm
if [[ $confirm != "yes" ]]; then
    echo "❌ Cleanup cancelled"
    exit 1
fi

echo ""
echo "🗂️ DELETING REDUNDANT BUILD DIRECTORIES..."

# Delete all redundant build directories
rm -rf CANONICAL-BUILD/
rm -rf EXPERT-PRODUCTION-BUILD/
rm -rf FINAL-CORRECTED-PRODUCTION/
rm -rf FINAL-PRODUCTION/
rm -rf FINAL-RECONCILED-BUILD/
rm -rf live-deployment/
rm -rf production-build/
rm -rf production-build-v3/
rm -rf production-build-v4/
rm -rf production-build-v5/
rm -rf production-build-v6/
rm -rf test-09/
rm -rf test-11/
rm -rf test-12/
rm -rf test-13/
rm -rf test-14/
rm -rf test-15/
rm -rf test-34/

echo "✅ Redundant build directories deleted"

echo ""
echo "🗑️ DELETING REDUNDANT FILES..."

# Delete redundant scripts and files
rm -f COMPREHENSIVE-DEPLOYMENT-PACKAGE.html
rm -f FINAL-COMPREHENSIVE-BUNDLE.js
rm -f build-complete.js
rm -f build-comprehensive.js
rm -f build-now.bat
rm -f build-now.sh
rm -f build-package.js
rm -f build-production.sh
rm -f complete-test-09.sh
rm -f create-build.js
rm -f create-production-build.js
rm -f create-production-zip.js
rm -f create-test-09.sh
rm -f create-zip-package.js
rm -f deploy-instructions-corrected.sh
rm -f deploy-instructions.sh
rm -f manual-deployment-checklist.txt
rm -f package-build.js
rm -f package-production.sh
rm -f run-comprehensive-build.sh
rm -f validate-build.js

echo "✅ Redundant scripts deleted"

# Delete redundant ZIP files
rm -f ricrios-complete-deployment.zip
rm -f ricrios-comprehensive-final.zip
rm -f ricrios-comprehensive-v8.zip
rm -f ricrios-final-comprehensive.zip
rm -f ricrios-portfolio-complete.zip

echo "✅ Redundant ZIP files deleted"

# Delete redundant content exports
rm -f ric-rios-comprehensive-content-export-v2.md
rm -f ric-rios-comprehensive-content-export.md
rm -f ric-rios-content-export.md
rm -f ric_rios_comprehensive_content_export.md

echo "✅ Redundant content exports deleted"

# Delete redundant documentation
rm -f CODE_QUALITY_AUDIT_REPORT.md
rm -f DEPLOYMENT_CHECKLIST.md
rm -f HOW_TO_CREATE_BUILD.md
rm -f PRODUCTION_DEPLOYMENT_SUMMARY.md
rm -f SNAKE_GAME_CSS_AUDIT.md
rm -f SUSTAINABILITY-PLAN.md

echo "✅ Redundant documentation deleted"

# Clean up scripts directory (keep only essential ones)
rm -rf scripts/build-assets.js
rm -rf scripts/build.js
rm -rf scripts/create-clean-structure.js
rm -rf scripts/emergency-css-fix.js
rm -rf scripts/execute-grand-refactor.js
rm -rf scripts/final-build-test.js
rm -rf scripts/package-production.js
rm -rf scripts/post-refactor-validate.js
rm -rf scripts/quick-deploy-test.js
rm -rf scripts/safe-refactor.js
rm -rf scripts/sustainable-refactor.js
rm -rf scripts/unified-build-system.js
rm -rf scripts/validate-sustainability.js

echo "✅ Redundant scripts cleaned"

echo ""
echo "🎛️ TECHOS NUCLEAR CLEANUP COMPLETE!"
echo ""
echo "📁 REMAINING STRUCTURE:"
echo "   ✅ /dist/ - FINAL DEPLOYMENT PACKAGE"
echo "   ✅ /components/ - Component library"
echo "   ✅ /ARCHIVE/ - Historical reference"
echo "   ✅ Core config files preserved"
echo ""
echo "🚀 READY FOR DEPLOYMENT:"
echo "   1. Upload /dist/ contents to your web server"
echo "   2. Point domain to /dist/index.html"
echo "   3. Enjoy your time-aware featured card system!"
echo ""
echo "⚡ Technical debt: ELIMINATED"
echo "🎨 Time-aware system: PERFECTED"
echo "✨ Single source of truth: ESTABLISHED"