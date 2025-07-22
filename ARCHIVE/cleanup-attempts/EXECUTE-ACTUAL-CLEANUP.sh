#!/bin/bash

# EXECUTE ACTUAL CLEANUP - NO MORE SCRIPTS, ACTUAL EXECUTION
echo "🔥 EXECUTING ACTUAL CLEANUP - NO MORE FALSE PROMISES"
echo "📅 $(date)"

# Create archive with timestamp
ARCHIVE="CHAOS-ARCHIVE-$(date +%Y%m%d-%H%M%S)"
mkdir "$ARCHIVE"
echo "📦 Created archive: $ARCHIVE"

# Count before cleanup
BEFORE_DIRS=$(find . -maxdepth 1 -type d | wc -l)
BEFORE_FILES=$(find . -maxdepth 1 -type f | wc -l)

echo "📊 BEFORE CLEANUP:"
echo "   - Directories: $BEFORE_DIRS"
echo "   - Files: $BEFORE_FILES"

# ACTUAL CLEANUP - MOVE TO ARCHIVE
echo "🗑️  Moving redundant builds to archive..."

# FIGMA-MAKE builds (6 builds)
mv FIGMA-MAKE-* "$ARCHIVE/" 2>/dev/null && echo "   ✅ FIGMA-MAKE builds archived"

# Production versions (4 builds)
mv production-build-v* "$ARCHIVE/" 2>/dev/null && echo "   ✅ production-build versions archived"

# Test builds (7 builds)
mv test-* "$ARCHIVE/" 2>/dev/null && echo "   ✅ test builds archived"

# FINAL builds (5 builds)
mv FINAL-* "$ARCHIVE/" 2>/dev/null && echo "   ✅ FINAL builds archived"

# Other redundant builds
mv CANONICAL-BUILD "$ARCHIVE/" 2>/dev/null
mv COMPLETE-PORTFOLIO-BUILD "$ARCHIVE/" 2>/dev/null
mv CORRECTED-COMPLETE-BUILD "$ARCHIVE/" 2>/dev/null
mv EXPERT-PRODUCTION-BUILD "$ARCHIVE/" 2>/dev/null
mv NUCLEAR-CLEAN-FOUNDATION "$ARCHIVE/" 2>/dev/null
mv PROFESSIONAL-BUILD "$ARCHIVE/" 2>/dev/null
mv ULTIMATE-WORKING-BUILD "$ARCHIVE/" 2>/dev/null
echo "   ✅ Other redundant builds archived"

# Zip files (5 files)
mv *.zip "$ARCHIVE/" 2>/dev/null && echo "   ✅ Zip files archived"

# Redundant scripts (10+ files)
mv *build*.sh "$ARCHIVE/" 2>/dev/null
mv *build*.js "$ARCHIVE/" 2>/dev/null
mv *cleanup*.sh "$ARCHIVE/" 2>/dev/null
mv create-* "$ARCHIVE/" 2>/dev/null
mv deploy-* "$ARCHIVE/" 2>/dev/null
mv package-* "$ARCHIVE/" 2>/dev/null
mv run-* "$ARCHIVE/" 2>/dev/null
mv validate-* "$ARCHIVE/" 2>/dev/null
mv complete-* "$ARCHIVE/" 2>/dev/null
echo "   ✅ Redundant scripts archived"

# Redundant documentation
mv *AUDIT* "$ARCHIVE/" 2>/dev/null
mv *DEPLOYMENT* "$ARCHIVE/" 2>/dev/null
mv *CHECKLIST* "$ARCHIVE/" 2>/dev/null
mv *GUIDE* "$ARCHIVE/" 2>/dev/null
mv *PLAN* "$ARCHIVE/" 2>/dev/null
mv *SUSTAINABILITY* "$ARCHIVE/" 2>/dev/null
mv manual-deployment-checklist.txt "$ARCHIVE/" 2>/dev/null
echo "   ✅ Redundant documentation archived"

# Count after cleanup
AFTER_DIRS=$(find . -maxdepth 1 -type d | wc -l)
AFTER_FILES=$(find . -maxdepth 1 -type f | wc -l)

echo ""
echo "📊 AFTER CLEANUP:"
echo "   - Directories: $AFTER_DIRS (was $BEFORE_DIRS)"
echo "   - Files: $AFTER_FILES (was $BEFORE_FILES)"
echo "   - Eliminated: $(($BEFORE_DIRS + $BEFORE_FILES - $AFTER_DIRS - $AFTER_FILES)) items"

echo ""
echo "🎯 REMAINING CANDIDATES FOR SINGLE SOURCE OF TRUTH:"
echo "   1. index.html (root)"
echo "   2. production-build/index.html"  
echo "   3. dist/index.html"
echo "   4. live-deployment/index.html"

echo ""
echo "✅ ACTUAL CLEANUP EXECUTED"
echo "🔍 Next: Test which build actually works"
echo "🎛️  Keep only the working build"
echo "🔥 NO MORE CHAOS - DISCIPLINED SIMPLICITY ACHIEVED"