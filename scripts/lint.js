#!/usr/bin/env node
/**
 * Minimal lint gate to catch obvious regressions before deploy.
 * - Fails on unresolved merge markers
 * - Ensures key DOM anchors are still present
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const requiredAnchors = [
    { file: 'index.html', needle: 'lab-log-feed', description: 'Lab log console markup' },
    { file: 'index.html', needle: 'graffiti-modal', description: 'SLAP creator modal' },
    { file: 'css/core-layout.css', needle: '--safe-inline', description: 'Safe-area spacing variables' }
];

const filesToScan = [
    'index.html',
    'css/core-layout.css',
    'js/features/slap-canvas.js'
];

const forbiddenMarkers = ['<<<<<<<', '>>>>>>>', '======' ];
let hasErrors = false;

function readFile(relativePath) {
    const absolutePath = path.join(projectRoot, relativePath);
    try {
        return fs.readFileSync(absolutePath, 'utf8');
    } catch (error) {
        console.error(`❌ Unable to read ${relativePath}:`, error.message);
        hasErrors = true;
        return '';
    }
}

filesToScan.forEach((relativePath) => {
    const contents = readFile(relativePath);
    if (!contents) return;
    forbiddenMarkers.forEach((marker) => {
        if (contents.includes(marker)) {
            console.error(`❌ Found unresolved merge marker "${marker}" in ${relativePath}`);
            hasErrors = true;
        }
    });
});

requiredAnchors.forEach(({ file, needle, description }) => {
    const contents = readFile(file);
    if (!contents.includes(needle)) {
        console.error(`❌ Missing ${description} in ${file}`);
        hasErrors = true;
    }
});

if (hasErrors) {
    console.error('⚠️ Lint checks failed. Resolve the issues above.');
    process.exit(1);
} else {
    console.log('✅ Lint checks passed. System ready.');
}
