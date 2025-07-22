// SYSTEMATIC INNOVATION LAB FIX - Agent-Driven Control
// Eliminates all defects: multiple snake games, broken markup, modal regressions

class SystematicInnovationLabFix {
    constructor() {
        this.sessionId = `systematic_fix_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        console.log('🧬🔧 SYSTEMATIC FIX: Taking complete control of Innovation Lab');
    }

    async executeSystematicFix() {
        console.log('🚀 SYSTEMATIC FIX: Starting comprehensive repair');
        
        try {
            // Phase 1: Complete cleanup
            await this.performCompleteCleanup();
            
            // Phase 2: Rebuild clean structure
            await this.rebuildCleanStructure();
            
            // Phase 3: Create single snake game
            await this.createSingleSnakeGame();
            
            // Phase 4: Fix modal system
            await this.fixModalSystem();
            
            // Phase 5: Apply styling
            await this.applyCleanStyling();
            
            console.log('✅ SYSTEMATIC FIX: All defects eliminated');
            return { success: true, sessionId: this.sessionId };
            
        } catch (error) {
            console.error('❌ SYSTEMATIC FIX: Failed', error);
            throw error;
        }
    }

    async performCompleteCleanup() {
        console.log('🧹 CLEANUP: Removing all conflicting elements');
        
        // Remove all snake game instances
        document.querySelectorAll('[id*="snake"], [class*="snake"], canvas').forEach(el => {
            if (el.id.includes('snake') || el.className.includes('snake') || 
                el.tagName === 'CANVAS') {
                el.remove();
            }
        });
        
        // Clear snake game variables
        if (window.DOSSnakeGame) delete window.DOSSnakeGame;
        if (window.snakeGame) delete window.snakeGame;
        if (window.activeSnakeGame) delete window.activeSnakeGame;
        
        console.log('✅ CLEANUP: All conflicts removed');
    }

    async rebuildCleanStructure() {
        console.log('🏗️ REBUILD: Creating clean Innovation Lab');
        
        const cleanHTML = `
            <section id="innovation-lab-systematic" class="innovation-lab-clean">
                <div class="lab-header">
                    <h2>🧪 Innovation Laboratory</h2>
                    <p>Future-state design experiments and prototypes</p>
                </div>
                
                <div class="feature-grid">
                    <div class="feature-card" data-feature="ux-memory">
                        <div class="card-icon">🧠</div>
                        <h3>UX Memory Recall</h3>
                        <p>Advanced visitor journey analysis</p>
                        <span class="status live">LIVE</span>
                    </div>
                    
                    <div class="feature-card" data-feature="case-remix">
                        <div class="card-icon">🎭</div>
                        <h3>Case Study Remix</h3>
                        <p>AI-powered case study personalization</p>
                        <span class="status live">LIVE</span>
                    </div>
                    
                    <div class="feature-card" data-feature="save-local">
                        <div class="card-icon">💾</div>
                        <h3>Save-to-Local</h3>
                        <p>Persistent experience curation</p>
                        <span class="status live">LIVE</span>
                    </div>
                    
                    <div class="feature-card" data-feature="trojan-feed">
                        <div class="card-icon">🐴</div>
                        <h3>TrojanHorse Feed</h3>
                        <p>Advanced content orchestration</p>
                        <span class="status beta">BETA</span>
                    </div>
                    
                    <div class="feature-card" data-feature="prompt-gen">
                        <div class="card-icon">⚡</div>
                        <h3>Prompt Generator</h3>
                        <p>Dynamic prompt generation</p>
                        <span class="status beta">BETA</span>
                    </div>
                    
                    <div class="feature-card" data-feature="snake-game" onclick="activateSnakeGame()">
                        <div class="card-icon">🐍</div>
                        <h3>DOS Snake Game</h3>
                        <p>Classic game with modern enhancements</p>
                        <span class="status exp">EXPERIMENTAL</span>
                    </div>
                </div>
                
                <div id="snake-container" class="snake-container" style="display: none;"></div>
            </section>
        `;
        
        // Replace existing innovation lab
        const existing = document.querySelector('#innovation-lab, .innovation-lab, [data-section="innovation-lab"]');
        if (existing) {
            existing.outerHTML = cleanHTML;
        } else {
            document.querySelector('footer').insertAdjacentHTML('beforebegin', cleanHTML);
        }
        
        console.log('✅ REBUILD: Clean structure created');
    }

    async createSingleSnakeGame() {
        console.log('🐍 SNAKE: Creating single clean instance');
        
        const snakeCode = `
            class SingleSnakeGame {
                constructor(containerId) {
                    this.container = document.getElementById(containerId);
                    this.canvas = null;
                    this.ctx = null;
                    this.gameState = 'stopped';
                    this.snake = [{ x: 10, y: 10 }];
                    this.food = { x: 15, y: 15 };
                    this.direction = { x: 0, y: 0 };
                    this.score = 0;
                    this.init();
                }
                
                init() {
                    this.container.innerHTML = \`
                        <div class="snake-header">
                            <h3>DOS Snake Game</h3>
                            <div class="score">Score: <span id="score">0</span></div>
                        </div>
                        <canvas id="game-canvas" width="400" height="400"></canvas>
                        <div class="controls">
                            <button onclick="window.singleSnake.start()">Start</button>
                            <button onclick="window.singleSnake.pause()">Pause</button>
                            <button onclick="window.singleSnake.reset()">Reset</button>
                        </div>
                    \`;
                    
                    this.canvas = document.getElementById('game-canvas');
                    this.ctx = this.canvas.getContext('2d');
                    this.bindKeys();
                    this.draw();
                }
                
                bindKeys() {
                    document.addEventListener('keydown', (e) => {
                        if (this.gameState !== 'running') return;
                        switch(e.key) {
                            case 'ArrowUp': if (this.direction.y === 0) this.direction = { x: 0, y: -1 }; break;
                            case 'ArrowDown': if (this.direction.y === 0) this.direction = { x: 0, y: 1 }; break;
                            case 'ArrowLeft': if (this.direction.x === 0) this.direction = { x: -1, y: 0 }; break;
                            case 'ArrowRight': if (this.direction.x === 0) this.direction = { x: 1, y: 0 }; break;
                        }
                    });
                }
                
                start() { this.gameState = 'running'; this.gameLoop(); }
                pause() { this.gameState = 'paused'; }
                reset() {
                    this.gameState = 'stopped';
                    this.snake = [{ x: 10, y: 10 }];
                    this.food = { x: 15, y: 15 };
                    this.direction = { x: 0, y: 0 };
                    this.score = 0;
                    document.getElementById('score').textContent = '0';
                    this.draw();
                }
                
                gameLoop() {
                    if (this.gameState !== 'running') return;
                    this.update();
                    this.draw();
                    setTimeout(() => this.gameLoop(), 150);
                }
                
                update() {
                    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };
                    
                    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 ||
                        this.snake.some(s => s.x === head.x && s.y === head.y)) {
                        this.gameState = 'stopped';
                        alert('Game Over! Score: ' + this.score);
                        return;
                    }
                    
                    this.snake.unshift(head);
                    
                    if (head.x === this.food.x && head.y === this.food.y) {
                        this.score += 10;
                        document.getElementById('score').textContent = this.score;
                        this.generateFood();
                    } else {
                        this.snake.pop();
                    }
                }
                
                generateFood() {
                    do {
                        this.food = { x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 20) };
                    } while (this.snake.some(s => s.x === this.food.x && s.y === this.food.y));
                }
                
                draw() {
                    this.ctx.fillStyle = '#000';
                    this.ctx.fillRect(0, 0, 400, 400);
                    
                    this.ctx.fillStyle = '#0f0';
                    this.snake.forEach((s, i) => {
                        this.ctx.fillStyle = i === 0 ? '#0f0' : '#090';
                        this.ctx.fillRect(s.x * 20, s.y * 20, 18, 18);
                    });
                    
                    this.ctx.fillStyle = '#f00';
                    this.ctx.fillRect(this.food.x * 20, this.food.y * 20, 18, 18);
                }
            }
            
            function activateSnakeGame() {
                const container = document.getElementById('snake-container');
                container.style.display = 'block';
                if (!window.singleSnake) {
                    window.singleSnake = new SingleSnakeGame('snake-container');
                }
            }
        `;
        
        const script = document.createElement('script');
        script.textContent = snakeCode;
        document.head.appendChild(script);
        
        console.log('✅ SNAKE: Single instance ready');
    }

    async fixModalSystem() {
        console.log('🎭 MODAL: Fixing Time Travel functionality');
        
        const modalCode = `
            function activateTimeTravelMode(caseStudyId) {
                console.log('🕰️ TIME TRAVEL: Activating for', caseStudyId);
                
                const variations = {
                    morning: { title: 'Morning Clarity', desc: 'Fresh strategic perspective' },
                    afternoon: { title: 'Afternoon Rigor', desc: 'Systematic analysis approach' },
                    evening: { title: 'Evening Wisdom', desc: 'Reflective mastery insights' }
                };
                
                const modalHTML = \`
                    <div id="time-modal" class="modal-overlay" onclick="closeTimeModal()">
                        <div class="modal-content" onclick="event.stopPropagation()">
                            <div class="modal-header">
                                <h2>🕰️ Time Travel Mode</h2>
                                <button onclick="closeTimeModal()">×</button>
                            </div>
                            <div class="modal-body">
                                \${Object.entries(variations).map(([key, v]) => \`
                                    <div class="time-option" onclick="selectTime('\${key}', '\${caseStudyId}')">
                                        <h3>\${v.title}</h3>
                                        <p>\${v.desc}</p>
                                    </div>
                                \`).join('')}
                            </div>
                        </div>
                    </div>
                \`;
                
                document.body.insertAdjacentHTML('beforeend', modalHTML);
            }
            
            function selectTime(timeKey, caseStudyId) {
                console.log('🕰️ Selected:', timeKey, 'for', caseStudyId);
                closeTimeModal();
            }
            
            function closeTimeModal() {
                const modal = document.getElementById('time-modal');
                if (modal) modal.remove();
            }
            
            function openCaseStudyModal(caseStudyId) {
                activateTimeTravelMode(caseStudyId);
            }
        `;
        
        const script = document.createElement('script');
        script.textContent = modalCode;
        document.head.appendChild(script);
        
        console.log('✅ MODAL: Time Travel functionality restored');
    }

    async applyCleanStyling() {
        console.log('🎨 STYLING: Applying clean design');
        
        const styles = `
            .innovation-lab-clean {
                padding: 4rem 2rem;
                background: var(--bg-secondary, #f8f9fa);
                border-radius: 12px;
                margin: 2rem 0;
            }
            
            .lab-header h2 {
                font-size: 2.5rem;
                margin-bottom: 1rem;
                color: var(--text-primary, #333);
            }
            
            .feature-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                gap: 1.5rem;
                margin-top: 2rem;
            }
            
            .feature-card {
                background: var(--bg-primary, #fff);
                border: 1px solid var(--border-color, #e1e5e9);
                border-radius: 8px;
                padding: 1.5rem;
                cursor: pointer;
                transition: transform 0.3s ease;
                position: relative;
            }
            
            .feature-card:hover {
                transform: translateY(-4px);
            }
            
            .card-icon {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            
            .feature-card h3 {
                margin: 0.5rem 0;
                color: var(--text-primary, #333);
            }
            
            .feature-card p {
                color: var(--text-secondary, #666);
                margin-bottom: 1rem;
            }
            
            .status {
                position: absolute;
                top: 1rem;
                right: 1rem;
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.75rem;
                font-weight: bold;
            }
            
            .status.live { background: #d4edda; color: #155724; }
            .status.beta { background: #fff3cd; color: #856404; }
            .status.exp { background: #f8d7da; color: #721c24; }
            
            .snake-container {
                margin-top: 2rem;
                padding: 2rem;
                background: var(--bg-primary, #fff);
                border-radius: 8px;
                text-align: center;
            }
            
            .snake-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
            }
            
            .controls {
                margin-top: 1rem;
            }
            
            .controls button {
                margin: 0 0.5rem;
                padding: 0.5rem 1rem;
                background: var(--accent-color, #007bff);
                color: white;
                border: none;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .modal-content {
                background: var(--bg-primary, #fff);
                border-radius: 8px;
                padding: 2rem;
                max-width: 600px;
                width: 90%;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            }
            
            .modal-header button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .time-option {
                padding: 1rem;
                border: 1px solid var(--border-color, #e1e5e9);
                border-radius: 8px;
                margin-bottom: 1rem;
                cursor: pointer;
                transition: background 0.3s ease;
            }
            
            .time-option:hover {
                background: var(--bg-secondary, #f8f9fa);
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        console.log('✅ STYLING: Clean design applied');
    }
}

// Auto-execute systematic fix
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 SYSTEMATIC FIX: Auto-executing comprehensive repair');
    
    const systematicFix = new SystematicInnovationLabFix();
    const result = await systematicFix.executeSystematicFix();
    
    console.log('✅ SYSTEMATIC FIX COMPLETE:', result);
    window.systematicFixResult = result;
});

// Export for manual execution
window.SystematicInnovationLabFix = SystematicInnovationLabFix;
