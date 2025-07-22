#!/usr/bin/env node

/**
 * 🎛️ TechOS Production Build Script
 * Creates a production-ready build with ALL portfolio content
 */

const fs = require('fs');
const path = require('path');

console.log('🎛️ TechOS Production Build Starting...');
console.log('📁 Building complete portfolio with all content...');

// Ensure build directory exists
const buildDir = 'build';
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

// Read the complete source HTML file
let sourceHtml;
try {
    sourceHtml = fs.readFileSync('src/index.html', 'utf8');
    console.log('✅ Source HTML loaded successfully');
} catch (error) {
    console.error('❌ Error reading source HTML:', error.message);
    process.exit(1);
}

// Enhance the source HTML for production
const productionHtml = sourceHtml
    // Ensure proper favicon fallback
    .replace(
        '<link rel="icon" type="image/x-icon" href="favicon.ico">',
        `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎛️</text></svg>">
    <link rel="icon" type="image/x-icon" href="favicon.ico">`
    )
    // Add production optimizations
    .replace(
        '</head>',
        `    <!-- Production Optimizations -->
    <meta name="theme-color" content="#1a73e8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    
    <!-- Performance Hints -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="dns-prefetch" href="https://cdn.tailwindcss.com">
</head>`
    );

// Write the complete production HTML
fs.writeFileSync(path.join(buildDir, 'index.html'), productionHtml);
console.log('✅ Complete portfolio HTML created');


// Copy assets from public to build
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    files.forEach(file => {
        const srcPath = path.join(publicDir, file);
        const destPath = path.join(buildDir, file);
        if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
            console.log(`✅ Copied: ${file}`);
        }
    });
} else {
    console.log('⚠️  Public directory not found');
}

console.log('\n🎛️ Production Build Complete!');
console.log('📁 Build output: ./build/');
console.log('🚀 Ready for deployment!');
console.log('\n✨ Complete portfolio features included:');
console.log('   🎯 falseio sections (About, Philosophy, Focus, Case Studies)');
console.log('   💼 Complete case studies with detailed modals');
console.log('   ⏰ Time-aware content system');
console.log('   🌙 Dark mode with evening auto-activation');
console.log('   🎮 Konami code with Snake game easter egg');
console.log('   📱 Mobile-responsive design with touch optimization');
console.log('   🎨 Premium animations and gradients');
console.log('   🎛️ Complete TechOS portfolio system');
console.log('\n🎯 All content from source HTML preserved and optimized!');
