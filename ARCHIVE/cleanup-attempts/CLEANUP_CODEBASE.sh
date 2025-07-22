#!/bin/bash

# 🎛️ TechOS Portfolio Codebase Cleanup Script
# This script will clean up the messy folder structure and create a clean, maintainable codebase

echo "🎛️ Starting TechOS Portfolio Codebase Cleanup..."
echo "📁 Current directory: $(pwd)"

# Create backup of essential files first
echo "📦 Creating backup of essential files..."
mkdir -p BACKUP_ESSENTIAL
cp App.tsx BACKUP_ESSENTIAL/ 2>/dev/null || echo "⚠️  App.tsx not found"
cp COMPLETE_PORTFOLIO_BUILD.html BACKUP_ESSENTIAL/ 2>/dev/null || echo "⚠️  COMPLETE_PORTFOLIO_BUILD.html not found"
cp package.json BACKUP_ESSENTIAL/ 2>/dev/null || echo "⚠️  package.json not found"
cp tailwind.config.js BACKUP_ESSENTIAL/ 2>/dev/null || echo "⚠️  tailwind.config.js not found"
cp -r components BACKUP_ESSENTIAL/ 2>/dev/null || echo "⚠️  components directory not found"

# Remove all duplicate build directories
echo "🗑️  Removing duplicate build directories..."
rm -rf CANONICAL-BUILD
rm -rf COMPLETE-PORTFOLIO-BUILD
rm -rf CORRECTED-COMPLETE-BUILD
rm -rf EXPERT-PRODUCTION-BUILD
rm -rf FIGMA-MAKE-*
rm -rf FINAL-*
rm -rf NORTHSTAR-CLEAN-BUILD
rm -rf NUCLEAR-CLEAN-FOUNDATION
rm -rf PROFESSIONAL-BUILD
rm -rf SINGLE-SOURCE-OF-TRUTH
rm -rf ULTIMATE-WORKING-BUILD
rm -rf production-build*
rm -rf test-*
rm -rf dist
rm -rf live-deployment

# Remove duplicate HTML files
echo "🗑️  Removing duplicate HTML files..."
rm -f CREATE_WORKING_BUILD.html
rm -f COMPREHENSIVE-DEPLOYMENT-PACKAGE.html
rm -f index.html

# Remove redundant build scripts
echo "🗑️  Removing redundant build scripts..."
rm -f BUILD_PORTFOLIO.bat
rm -f BUILD_YOUR_PORTFOLIO.js
rm -f build-*.js
rm -f build-*.sh
rm -f build-*.bat
rm -f create-*.js
rm -f create-*.sh
rm -f deploy-*.sh
rm -f package-*.js
rm -f package-*.sh
rm -f run-*.sh
rm -f validate-build.js
rm -f complete-test-*.sh

# Remove documentation clutter
echo "🗑️  Removing documentation clutter..."
rm -f *AUDIT*.md
rm -f *CLEANUP*.md
rm -f *DEPLOYMENT*.md
rm -f *MIGRATION*.md
rm -f *WINDSURF*.md
rm -f *MANUAL*.md
rm -f *SUSTAINABILITY*.md
rm -f *CHECKLIST*.md
rm -f *INSTRUCTIONS*.md
rm -f manual-deployment-checklist.txt

# Remove zip files
echo "🗑️  Removing zip files..."
rm -f *.zip

# Remove content export files (keep one)
echo "🗑️  Cleaning up content export files..."
rm -f ric-rios-content-export.md
rm -f ric_rios_comprehensive_content_export.md
rm -f ric-rios-comprehensive-content-export.md
# Keep: ric-rios-comprehensive-content-export-v2.md (most recent)

# Remove redundant scripts directory if it exists
if [ -d "scripts" ]; then
    echo "🗑️  Removing scripts directory..."
    rm -rf scripts
fi

# Create clean directory structure
echo "📁 Creating clean directory structure..."
mkdir -p src/components
mkdir -p src/styles
mkdir -p public
mkdir -p build

# Move essential files to proper locations
echo "📦 Organizing essential files..."
if [ -f "COMPLETE_PORTFOLIO_BUILD.html" ]; then
    mv COMPLETE_PORTFOLIO_BUILD.html src/index.html
    echo "✅ Moved source HTML to src/index.html"
fi

if [ -f "App.tsx" ]; then
    mv App.tsx src/App.tsx
    echo "✅ Moved App.tsx to src/"
fi

# Move assets to public directory
echo "📦 Moving assets to public directory..."
mv favicon* public/ 2>/dev/null || echo "⚠️  No favicon files found"
mv apple-touch-icon.png public/ 2>/dev/null || echo "⚠️  No apple-touch-icon.png found"
mv site.webmanifest public/ 2>/dev/null || echo "⚠️  No site.webmanifest found"

# Move components if they exist
if [ -d "components" ]; then
    mv components/* src/components/ 2>/dev/null || echo "⚠️  No components to move"
    rmdir components 2>/dev/null || echo "⚠️  Components directory not empty"
fi

# Move styles if they exist
if [ -d "styles" ]; then
    mv styles/* src/styles/ 2>/dev/null || echo "⚠️  No styles to move"
    rmdir styles 2>/dev/null || echo "⚠️  Styles directory not empty"
fi

# Move the working build to build directory
if [ -d "COMPLETE_PORTFOLIO_BUILD" ]; then
    mv COMPLETE_PORTFOLIO_BUILD/* build/ 2>/dev/null || echo "⚠️  No build files to move"
    rmdir COMPLETE_PORTFOLIO_BUILD 2>/dev/null || echo "⚠️  Build directory not empty"
fi

# Clean up any remaining empty directories
echo "🧹 Cleaning up empty directories..."
find . -type d -empty -delete 2>/dev/null || true

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "📁 New clean structure:"
echo "├── src/"
echo "│   ├── index.html (main source)"
echo "│   ├── App.tsx (React component)"
echo "│   ├── components/ (reusable components)"
echo "│   └── styles/ (CSS files)"
echo "├── public/ (static assets)"
echo "├── build/ (production build)"
echo "├── package.json (dependencies)"
echo "├── tailwind.config.js (Tailwind config)"
echo "└── BACKUP_ESSENTIAL/ (backup of important files)"
echo ""
echo "🎛️ TechOS Portfolio: Codebase ownership achieved!"
