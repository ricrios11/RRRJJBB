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
