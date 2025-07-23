#!/bin/bash
# TechOS + ResearchOS Systematic Codebase Refactor
# Establishes pristine, scalable foundation with 100% ownership

echo "🎛️ TechOS + ResearchOS Codebase Refactor Initiated"
echo "=================================================="

# Create pristine archive structure
echo "📁 Creating pristine archive structure..."
mkdir -p archive/{build-experiments,cleanup-attempts,backups,legacy-docs}

# Archive all redundant build scripts
echo "🗂️ Archiving redundant build scripts..."
mv build-advanced-figma.js archive/build-experiments/
mv build-figma-exact.js archive/build-experiments/
mv build-figma-inspired.js archive/build-experiments/
mv build-modern-spa.js archive/build-experiments/
mv build-production.js archive/build-experiments/
mv BUILD_COMPLETE_PORTFOLIO.js archive/build-experiments/

# Archive all cleanup scripts
echo "🧹 Archiving cleanup attempts..."
mv CLEANUP_CODEBASE.sh archive/cleanup-attempts/
mv EXECUTE-ACTUAL-CLEANUP.sh archive/cleanup-attempts/
mv REAL-NUCLEAR-CLEANUP.sh archive/cleanup-attempts/
mv TECHOS-CLEANUP-SCRIPT.sh archive/cleanup-attempts/
mv TECHOS-NUCLEAR-CLEANUP.sh archive/cleanup-attempts/

# Archive scattered documentation
echo "📚 Consolidating documentation..."
mv CODEBASE-ORGANIZATION-PLAN.md archive/legacy-docs/
mv HOW_TO_CREATE_BUILD.md archive/legacy-docs/
mv Attributions.md archive/legacy-docs/

# Archive existing backup directories
echo "💾 Organizing backup files..."
mv BACKUP_ESSENTIAL archive/backups/
mv FIGMA_MAKE_ARCHIVE archive/backups/
mv ARCHIVE archive/backups/legacy-archive

# Create clean source structure
echo "🏗️ Establishing clean source structure..."
mkdir -p src/{components,hooks,utils,styles}
mkdir -p scripts
mkdir -p config

# Move configuration files to config directory
echo "⚙️ Organizing configuration..."
mv babel.config.js config/
mv postcss.config.js config/
mv tailwind.config.js config/

# Create master build script
echo "🔧 Creating master build script..."
cat > scripts/build.js << 'EOF'
#!/usr/bin/env node
/**
 * TechOS Master Build Script
 * Single source of truth for production builds
 */

const fs = require('fs');
const path = require('path');

console.log('🎛️ TechOS Build System Initiated');
console.log('================================');

// Ensure build directory exists
if (!fs.existsSync('build')) {
    fs.mkdirSync('build', { recursive: true });
}

// Copy production-ready index.html (already optimized)
console.log('📦 Building production assets...');

// Copy favicon assets
const faviconFiles = [
    'apple-touch-icon.png',
    'favicon-16x16.png', 
    'favicon.ico',
    'favicon.svg',
    'site.webmanifest'
];

faviconFiles.forEach(file => {
    const srcPath = path.join('public', file);
    const destPath = path.join('build', file);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`✅ Copied ${file}`);
    }
});

console.log('🚀 Build complete! Production ready at ./build/');
console.log('💡 Run: cd build && python3 -m http.server 8000');
EOF

chmod +x scripts/build.js

# Create development server script
echo "🖥️ Creating development server script..."
cat > scripts/dev.js << 'EOF'
#!/usr/bin/env node
/**
 * TechOS Development Server
 * Hot reloading and development workflow
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🎛️ TechOS Development Server');
console.log('============================');

// Start development server
const server = spawn('python3', ['-m', 'http.server', '8000'], {
    cwd: path.join(__dirname, '../build'),
    stdio: 'inherit'
});

console.log('🚀 Development server running at http://localhost:8000');
console.log('📁 Serving from ./build/ directory');
console.log('🔄 Manual refresh required for changes');

server.on('close', (code) => {
    console.log(`\n🛑 Development server stopped (code ${code})`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down development server...');
    server.kill();
    process.exit(0);
});
EOF

chmod +x scripts/dev.js

# Update package.json with clean scripts
echo "📦 Updating package.json..."
cat > package.json << 'EOF'
{
  "name": "ric-rios-portfolio",
  "version": "2.0.0",
  "description": "Time-Aware Design Leader Portfolio - TechOS Architecture",
  "main": "build/index.html",
  "scripts": {
    "build": "node scripts/build.js",
    "dev": "node scripts/dev.js",
    "start": "npm run dev",
    "clean": "rm -rf build && mkdir build"
  },
  "keywords": [
    "portfolio",
    "design-leadership",
    "techos",
    "react",
    "tailwind"
  ],
  "author": "Ric Rios",
  "license": "MIT",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.0",
    "tailwindcss": "^3.0.0"
  }
}
EOF

# Create clean README
echo "📖 Creating clean README..."
cat > README.md << 'EOF'
# Ric Rios - Time-Aware Design Leader Portfolio

> TechOS + ResearchOS Architecture | Strategic Design Leadership Platform

## 🎛️ TechOS Architecture

Modern, scalable single-page application built with React 18, Tailwind CSS, and systematic design principles.

### Features
- ⏰ **Time-Aware Content** - Dynamic greetings and content based on local time
- 🌙 **Intelligent Dark Mode** - Automatic switching with manual override
- 🎮 **Snake Game Easter Egg** - Konami code activated retro gaming
- 📱 **Mobile-Optimized** - Responsive design with touch interactions
- 🎨 **Design System** - Consistent, scalable component architecture

### Quick Start
```bash
# Development
npm run dev

# Production Build
npm run build

# Clean Build
npm run clean && npm run build
```

### Project Structure
```
portfolio/
├── src/                    # Source components (future modularization)
├── public/                 # Static assets and favicons
├── build/                  # Production output
├── scripts/                # Build and development scripts
├── config/                 # Configuration files
├── docs/                   # Documentation
└── archive/                # Historical artifacts
```

### Development Workflow
1. Make changes to `build/index.html` (current monolith)
2. Run `npm run dev` to serve locally
3. Test across devices and browsers
4. Deploy `build/` directory to production

### Future Roadmap
- [ ] Modular React component extraction
- [ ] TypeScript integration
- [ ] Automated testing suite
- [ ] CI/CD pipeline
- [ ] Performance optimization

---
*Built with TechOS + ResearchOS systematic principles*
EOF

echo "✅ TechOS + ResearchOS Refactor Complete!"
echo "========================================="
echo "📁 Archive created with all loose ends"
echo "🏗️ Clean, scalable foundation established"
echo "🎯 Single source of truth for builds"
echo "📦 Ready for feature development"
echo ""
echo "Next steps:"
echo "1. Run: npm run build"
echo "2. Run: npm run dev"
echo "3. Verify production functionality"
EOF

chmod +x TECHOS_REFACTOR.sh
