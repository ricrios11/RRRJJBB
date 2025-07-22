#!/bin/bash

# REAL NUCLEAR CLEANUP SCRIPT
# This will actually eliminate 95% of the chaos

echo "🔥 EXECUTING REAL NUCLEAR CLEANUP..."
echo "⚠️  This will archive 95% of current directories"
echo "📅 Creating archive with timestamp..."

# Create timestamped archive directory
ARCHIVE_DIR="ARCHIVE-CHAOS-$(date +%Y%m%d-%H%M%S)"
mkdir "$ARCHIVE_DIR"

echo "📦 Archiving redundant build directories..."

# Archive all FIGMA-MAKE builds
mv FIGMA-MAKE-* "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive all production builds  
mv production-build* "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive all test builds
mv test-* "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive all FINAL builds
mv FINAL-* "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive other redundant builds
mv CANONICAL-BUILD "$ARCHIVE_DIR/" 2>/dev/null || true
mv COMPLETE-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv CORRECTED-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv EXPERT-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv PROFESSIONAL-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv ULTIMATE-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv NUCLEAR-CLEAN-FOUNDATION "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive zip files
mv *.zip "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive build scripts
mv build-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv create-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv deploy-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv run-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv complete-* "$ARCHIVE_DIR/" 2>/dev/null || true
mv package-* "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive redundant config files
mv babel.config.js "$ARCHIVE_DIR/" 2>/dev/null || true
mv postcss.config.js "$ARCHIVE_DIR/" 2>/dev/null || true
mv tailwind.config.js "$ARCHIVE_DIR/" 2>/dev/null || true

# Archive redundant documentation
mv *AUDIT* "$ARCHIVE_DIR/" 2>/dev/null || true
mv *DEPLOYMENT* "$ARCHIVE_DIR/" 2>/dev/null || true
mv *CHECKLIST* "$ARCHIVE_DIR/" 2>/dev/null || true
mv *GUIDE* "$ARCHIVE_DIR/" 2>/dev/null || true
mv *PLAN* "$ARCHIVE_DIR/" 2>/dev/null || true
mv *SUSTAINABILITY* "$ARCHIVE_DIR/" 2>/dev/null || true
mv manual-deployment-checklist.txt "$ARCHIVE_DIR/" 2>/dev/null || true

echo "✅ CLEANUP COMPLETE!"
echo "📊 RESULTS:"
echo "   - Archived $(find "$ARCHIVE_DIR" -maxdepth 1 -type d | wc -l) directories"
echo "   - Archived $(find "$ARCHIVE_DIR" -maxdepth 1 -type f | wc -l) files"
echo ""
echo "🎯 REMAINING STRUCTURE:"
ls -la

echo ""
echo "✨ CLEAN FOUNDATION ESTABLISHED"
echo "🔥 Ready for systematic rebuilding from proven foundation"
echo ""
echo "⚠️  IMPORTANT: Test the remaining files before proceeding"
echo "🎛️  Only build forward from what actually works"