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
