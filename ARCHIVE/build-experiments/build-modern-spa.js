const fs = require('fs');
const path = require('path');

// Create build directory
const buildDir = 'build';
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

console.log('🎛️ Building Modern SPA Portfolio...');
console.log('🎮 Including working Snake game with Konami code');
console.log('⚡ Time-aware content system');
console.log('🌙 Dark mode with auto-switching');

// Read the base source file
const sourceFile = 'BACKUP_ESSENTIAL/COMPLETE_PORTFOLIO_BUILD.html';
let htmlContent = fs.readFileSync(sourceFile, 'utf8');

// Replace the basic Konami code alert with a full Snake game implementation
const snakeGameCode = `
        // Snake Game Implementation
        class SnakeGame {
            constructor() {
                this.canvas = null;
                this.ctx = null;
                this.gameRunning = false;
                this.snake = [{ x: 10, y: 10 }];
                this.food = { x: 15, y: 15 };
                this.dx = 0;
                this.dy = 0;
                this.score = 0;
                this.gridSize = 20;
                this.tileCount = 20;
            }

            init() {
                // Create game container
                const gameContainer = document.createElement('div');
                gameContainer.id = 'snake-game-container';
                gameContainer.style.cssText = \`
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    backdrop-filter: blur(10px);
                \`;

                // Game title
                const title = document.createElement('h2');
                title.textContent = '🎮 TechOS Snake Game';
                title.style.cssText = \`
                    color: #6366f1;
                    font-size: 2rem;
                    margin-bottom: 1rem;
                    text-align: center;
                \`;

                // Score display
                const scoreDisplay = document.createElement('div');
                scoreDisplay.id = 'snake-score';
                scoreDisplay.textContent = 'Score: 0';
                scoreDisplay.style.cssText = \`
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                \`;

                // Canvas
                this.canvas = document.createElement('canvas');
                this.canvas.width = 400;
                this.canvas.height = 400;
                this.canvas.style.cssText = \`
                    border: 2px solid #6366f1;
                    background: #1e293b;
                    border-radius: 8px;
                \`;
                this.ctx = this.canvas.getContext('2d');

                // Instructions
                const instructions = document.createElement('div');
                instructions.innerHTML = \`
                    <p style="color: white; text-align: center; margin-top: 1rem;">
                        Use arrow keys to move • ESC to exit
                    </p>
                \`;

                // Close button
                const closeBtn = document.createElement('button');
                closeBtn.textContent = '✕ Close';
                closeBtn.style.cssText = \`
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: #dc2626;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                \`;
                closeBtn.onclick = () => this.close();

                gameContainer.appendChild(title);
                gameContainer.appendChild(scoreDisplay);
                gameContainer.appendChild(this.canvas);
                gameContainer.appendChild(instructions);
                gameContainer.appendChild(closeBtn);
                document.body.appendChild(gameContainer);

                this.setupControls();
                this.gameLoop();
            }

            setupControls() {
                document.addEventListener('keydown', (e) => {
                    if (!this.gameRunning) return;
                    
                    switch(e.key) {
                        case 'ArrowUp':
                            if (this.dy === 0) { this.dx = 0; this.dy = -1; }
                            break;
                        case 'ArrowDown':
                            if (this.dy === 0) { this.dx = 0; this.dy = 1; }
                            break;
                        case 'ArrowLeft':
                            if (this.dx === 0) { this.dx = -1; this.dy = 0; }
                            break;
                        case 'ArrowRight':
                            if (this.dx === 0) { this.dx = 1; this.dy = 0; }
                            break;
                        case 'Escape':
                            this.close();
                            break;
                    }
                });
            }

            gameLoop() {
                this.gameRunning = true;
                this.update();
                this.draw();
                
                if (this.gameRunning) {
                    setTimeout(() => this.gameLoop(), 150);
                }
            }

            update() {
                const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

                // Check wall collision
                if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
                    this.gameOver();
                    return;
                }

                // Check self collision
                for (let segment of this.snake) {
                    if (head.x === segment.x && head.y === segment.y) {
                        this.gameOver();
                        return;
                    }
                }

                this.snake.unshift(head);

                // Check food collision
                if (head.x === this.food.x && head.y === this.food.y) {
                    this.score += 10;
                    document.getElementById('snake-score').textContent = \`Score: \${this.score}\`;
                    this.generateFood();
                } else {
                    this.snake.pop();
                }
            }

            draw() {
                // Clear canvas
                this.ctx.fillStyle = '#1e293b';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

                // Draw snake
                this.ctx.fillStyle = '#6366f1';
                for (let segment of this.snake) {
                    this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
                }

                // Draw food
                this.ctx.fillStyle = '#ef4444';
                this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
            }

            generateFood() {
                this.food = {
                    x: Math.floor(Math.random() * this.tileCount),
                    y: Math.floor(Math.random() * this.tileCount)
                };

                // Make sure food doesn't spawn on snake
                for (let segment of this.snake) {
                    if (segment.x === this.food.x && segment.y === this.food.y) {
                        this.generateFood();
                        return;
                    }
                }
            }

            gameOver() {
                this.gameRunning = false;
                this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
                
                this.ctx.fillStyle = 'white';
                this.ctx.font = '30px Arial';
                this.ctx.textAlign = 'center';
                this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
                this.ctx.fillText(\`Final Score: \${this.score}\`, this.canvas.width / 2, this.canvas.height / 2 + 20);
                
                setTimeout(() => {
                    this.restart();
                }, 2000);
            }

            restart() {
                this.snake = [{ x: 10, y: 10 }];
                this.food = { x: 15, y: 15 };
                this.dx = 0;
                this.dy = 0;
                this.score = 0;
                document.getElementById('snake-score').textContent = 'Score: 0';
                this.gameLoop();
            }

            close() {
                this.gameRunning = false;
                const container = document.getElementById('snake-game-container');
                if (container) {
                    container.remove();
                }
            }
        }

        // Konami Code Easter Egg with Snake Game
        let konamiCode = [];
        const konamiSequence = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];

        function handleKonamiCode(event) {
            konamiCode.push(event.code);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.length === konamiSequence.length) {
                const matches = konamiCode.every((code, index) => code === konamiSequence[index]);
                if (matches) {
                    // Start Snake Game instead of alert
                    const game = new SnakeGame();
                    game.init();
                    konamiCode = [];
                }
            }
        }`;

// Replace the basic Konami code implementation with the full Snake game
const konamiCodeRegex = /\/\/ Konami Code Easter Egg[\s\S]*?function handleKonamiCode\(event\) \{[\s\S]*?\}/;
htmlContent = htmlContent.replace(konamiCodeRegex, snakeGameCode);

// Write the updated HTML file
fs.writeFileSync(path.join(buildDir, 'index.html'), htmlContent);

// Copy favicon files
const faviconFiles = [
    'favicon.ico',
    'favicon.svg', 
    'favicon-16x16.png',
    'favicon-32x32.png',
    'apple-touch-icon.png',
    'site.webmanifest'
];

faviconFiles.forEach(file => {
    const sourcePath = path.join('BACKUP_ESSENTIAL', file);
    const destPath = path.join(buildDir, file);
    
    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
    }
});

console.log('✅ Modern SPA Portfolio built successfully!');
console.log('🎮 Snake game integrated with Konami code');
console.log('📱 Modern single-page application structure');
console.log('⚡ Time-aware content system active');
console.log('🌙 Dark mode with auto-switching');
console.log('🎯 Production-ready build at build/index.html');
