/**
 * UnifiedHUDSystem - Standardized HUD components for all games
 * Provides consistent styling, layout, and functionality across game engines
 */

class UnifiedHUDSystem {
    constructor(gameEngine) {
        this.gameEngine = gameEngine;
        this.gameType = gameEngine.gameType;
        this.containerId = gameEngine.containerId;
        this.elements = new Map();
        
        this.injectStyles();
        console.log(`🎮 UnifiedHUDSystem initialized for ${this.gameType}`);
    }

    injectStyles() {
        if (document.getElementById(`unified-hud-styles-${this.gameType}`)) return;
        
        const style = document.createElement('style');
        style.id = `unified-hud-styles-${this.gameType}`;
        style.textContent = `
            .unified-hud {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                padding: 20px;
                background: rgba(0, 0, 0, 0.9);
                border-bottom: 2px solid #00ff9d;
                flex-wrap: wrap;
                gap: 20px;
                font-family: 'Courier New', monospace;
                color: #00ff9d;
            }
            
            .hud-section {
                display: flex;
                flex-direction: column;
                gap: 8px;
                min-width: 120px;
            }
            
            .hud-label {
                font-size: 11px;
                font-weight: bold;
                color: rgba(0, 255, 157, 0.7);
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 4px;
            }
            
            .hud-value {
                font-size: 18px;
                font-weight: bold;
                color: #00ff9d;
                text-shadow: 0 0 10px rgba(0, 255, 157, 0.5);
            }
            
            .hud-value.large {
                font-size: 24px;
            }
            
            .hud-value.small {
                font-size: 14px;
            }
            
            .hud-controls {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .hud-btn {
                background: rgba(0, 255, 157, 0.1);
                border: 1px solid #00ff9d;
                color: #00ff9d;
                padding: 8px 16px;
                font-family: inherit;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                border-radius: 4px;
            }
            
            .hud-btn:hover {
                background: rgba(0, 255, 157, 0.2);
                transform: translateY(-1px);
                box-shadow: 0 4px 8px rgba(0, 255, 157, 0.3);
            }
            
            .hud-btn.primary {
                background: linear-gradient(45deg, #00ff9d, #00cc7a);
                color: #000;
                font-weight: bold;
            }
            
            .hud-btn.primary:hover {
                background: linear-gradient(45deg, #00cc7a, #00aa66);
            }
            
            .hud-btn.danger {
                background: rgba(255, 68, 68, 0.2);
                border-color: #ff4444;
                color: #ff4444;
            }
            
            .hud-btn.danger:hover {
                background: rgba(255, 68, 68, 0.4);
            }
            
            .hud-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
            }
            
            .hud-status {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .hud-status.ready {
                background: rgba(0, 255, 157, 0.2);
                color: #00ff9d;
            }
            
            .hud-status.playing {
                background: rgba(255, 170, 68, 0.2);
                color: #ffaa44;
            }
            
            .hud-status.paused {
                background: rgba(68, 170, 255, 0.2);
                color: #44aaff;
            }
            
            .hud-status.gameOver {
                background: rgba(255, 68, 68, 0.2);
                color: #ff4444;
            }
            
            .hud-palette {
                display: flex;
                gap: 4px;
                flex-wrap: wrap;
                max-width: 200px;
            }
            
            .palette-item {
                width: 24px;
                height: 24px;
                border: 2px solid transparent;
                cursor: pointer;
                transition: all 0.2s ease;
                border-radius: 4px;
            }
            
            .palette-item.active {
                border-color: #00ff9d;
                box-shadow: 0 0 8px rgba(0, 255, 157, 0.5);
                transform: scale(1.1);
            }
            
            .palette-item:hover {
                transform: scale(1.05);
                border-color: rgba(0, 255, 157, 0.5);
            }
            
            .char-palette {
                display: flex;
                gap: 2px;
                flex-wrap: wrap;
                max-width: 200px;
            }
            
            .char-item {
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid rgba(0, 255, 157, 0.3);
                cursor: pointer;
                transition: all 0.2s ease;
                font-size: 14px;
                border-radius: 4px;
            }
            
            .char-item.active {
                background: rgba(0, 255, 157, 0.2);
                border-color: #00ff9d;
            }
            
            .char-item:hover {
                background: rgba(0, 255, 157, 0.1);
            }
            
            @media (max-width: 768px) {
                .unified-hud {
                    padding: 15px;
                    gap: 15px;
                }
                
                .hud-section {
                    min-width: 100px;
                }
                
                .hud-btn {
                    padding: 10px 14px;
                    font-size: 13px;
                }
                
                .hud-value {
                    font-size: 16px;
                }
                
                .hud-value.large {
                    font-size: 20px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    createHUD(config = {}) {
        const hudContainer = document.createElement('div');
        hudContainer.className = 'unified-hud';
        hudContainer.id = `hud-${this.containerId}`;
        
        // Left section - Game stats
        if (config.showStats !== false) {
            const statsSection = this.createStatsSection(config.stats || {});
            hudContainer.appendChild(statsSection);
        }
        
        // Center section - Game-specific controls
        if (config.controls) {
            const controlsSection = this.createControlsSection(config.controls);
            hudContainer.appendChild(controlsSection);
        }
        
        // Right section - Action buttons
        if (config.actions) {
            const actionsSection = this.createActionsSection(config.actions);
            hudContainer.appendChild(actionsSection);
        }
        
        return hudContainer;
    }

    createStatsSection(statsConfig) {
        const section = document.createElement('div');
        section.className = 'hud-section stats-section';
        
        // Score display (always included)
        const scoreContainer = this.createStatDisplay('score', 'Score', '0', 'large');
        section.appendChild(scoreContainer);
        this.elements.set('score', scoreContainer.querySelector('.hud-value'));
        
        // High score display
        if (this.gameEngine.config.enableHighScore) {
            const highScoreContainer = this.createStatDisplay('highScore', 'Best', this.gameEngine.highScore.toString());
            section.appendChild(highScoreContainer);
            this.elements.set('highScore', highScoreContainer.querySelector('.hud-value'));
        }
        
        // Game-specific stats
        if (statsConfig.level !== false && this.gameType === 'snake') {
            const levelContainer = this.createStatDisplay('level', 'Level', '1');
            section.appendChild(levelContainer);
            this.elements.set('level', levelContainer.querySelector('.hud-value'));
        }
        
        if (statsConfig.creations !== false && this.gameType === 'slap') {
            const creationsContainer = this.createStatDisplay('creations', 'Creations', '0');
            section.appendChild(creationsContainer);
            this.elements.set('creations', creationsContainer.querySelector('.hud-value'));
        }
        
        // Game status
        const statusContainer = this.createStatusDisplay();
        section.appendChild(statusContainer);
        this.elements.set('status', statusContainer);
        
        return section;
    }

    createControlsSection(controlsConfig) {
        const section = document.createElement('div');
        section.className = 'hud-section controls-section';
        
        // Color palette for SLAP game
        if (controlsConfig.colorPalette && this.gameType === 'slap') {
            const paletteContainer = document.createElement('div');
            paletteContainer.innerHTML = '<div class="hud-label">Colors</div>';
            
            const palette = document.createElement('div');
            palette.className = 'hud-palette';
            
            this.gameEngine.config.colors.forEach((color, index) => {
                const colorItem = document.createElement('div');
                colorItem.className = 'palette-item';
                colorItem.style.backgroundColor = color;
                colorItem.dataset.color = color;
                if (index === 0) colorItem.classList.add('active');
                
                colorItem.addEventListener('click', () => {
                    document.querySelectorAll('.palette-item').forEach(item => item.classList.remove('active'));
                    colorItem.classList.add('active');
                    this.gameEngine.currentColor = color;
                });
                
                palette.appendChild(colorItem);
            });
            
            paletteContainer.appendChild(palette);
            section.appendChild(paletteContainer);
        }
        
        // Character palette for SLAP game
        if (controlsConfig.charPalette && this.gameType === 'slap') {
            const charContainer = document.createElement('div');
            charContainer.innerHTML = '<div class="hud-label">Characters</div>';
            
            const charPalette = document.createElement('div');
            charPalette.className = 'char-palette';
            
            this.gameEngine.config.characters.forEach((char, index) => {
                const charItem = document.createElement('div');
                charItem.className = 'char-item';
                charItem.textContent = char;
                charItem.dataset.char = char;
                if (index === 0) charItem.classList.add('active');
                
                charItem.addEventListener('click', () => {
                    document.querySelectorAll('.char-item').forEach(item => item.classList.remove('active'));
                    charItem.classList.add('active');
                    this.gameEngine.currentChar = char;
                });
                
                charPalette.appendChild(charItem);
            });
            
            charContainer.appendChild(charPalette);
            section.appendChild(charContainer);
        }
        
        return section;
    }

    createActionsSection(actionsConfig) {
        const section = document.createElement('div');
        section.className = 'hud-section actions-section';
        
        const controlsContainer = document.createElement('div');
        controlsContainer.innerHTML = '<div class="hud-label">Actions</div>';
        
        const controls = document.createElement('div');
        controls.className = 'hud-controls';
        
        // Primary action button (game-specific)
        if (actionsConfig.primary) {
            const primaryBtn = this.createButton(actionsConfig.primary.text, actionsConfig.primary.action, 'primary');
            primaryBtn.id = `${this.gameType}-primary-${this.containerId}`;
            controls.appendChild(primaryBtn);
            this.elements.set('primaryAction', primaryBtn);
        }
        
        // Secondary actions
        if (actionsConfig.secondary) {
            actionsConfig.secondary.forEach(action => {
                const btn = this.createButton(action.text, action.action, action.style || 'default');
                btn.id = `${this.gameType}-${action.id}-${this.containerId}`;
                controls.appendChild(btn);
                this.elements.set(action.id, btn);
            });
        }
        
        // Close button (always included)
        const closeBtn = this.createButton('Close', () => this.gameEngine.close(), 'danger');
        closeBtn.id = `${this.gameType}-close-${this.containerId}`;
        controls.appendChild(closeBtn);
        this.elements.set('close', closeBtn);
        
        controlsContainer.appendChild(controls);
        section.appendChild(controlsContainer);
        
        return section;
    }

    createStatDisplay(id, label, value, size = 'default') {
        const container = document.createElement('div');
        container.innerHTML = `
            <div class="hud-label">${label}</div>
            <div class="hud-value ${size}" id="${id}-${this.containerId}">${value}</div>
        `;
        return container;
    }

    createStatusDisplay() {
        const statusEl = document.createElement('div');
        statusEl.className = 'hud-status ready';
        statusEl.textContent = 'READY';
        statusEl.id = `status-${this.containerId}`;
        return statusEl;
    }

    createButton(text, action, style = 'default') {
        const button = document.createElement('button');
        button.className = `hud-btn ${style}`;
        button.textContent = text;
        button.addEventListener('click', action);
        return button;
    }

    // Update methods
    updateScore(score) {
        const scoreEl = this.elements.get('score');
        if (scoreEl) {
            scoreEl.textContent = score.toString();
        }
    }

    updateHighScore(highScore) {
        const highScoreEl = this.elements.get('highScore');
        if (highScoreEl) {
            highScoreEl.textContent = highScore.toString();
        }
    }

    updateLevel(level) {
        const levelEl = this.elements.get('level');
        if (levelEl) {
            levelEl.textContent = level.toString();
        }
    }

    updateCreations(creations) {
        const creationsEl = this.elements.get('creations');
        if (creationsEl) {
            creationsEl.textContent = creations.toString();
        }
    }

    updateStatus(status) {
        const statusEl = this.elements.get('status');
        if (statusEl) {
            statusEl.className = `hud-status ${status}`;
            statusEl.textContent = status.toUpperCase();
        }
    }

    updateAll() {
        this.updateScore(this.gameEngine.score);
        if (this.gameEngine.config.enableHighScore) {
            this.updateHighScore(this.gameEngine.highScore);
        }
        this.updateStatus(this.gameEngine.gameState);
        
        // Game-specific updates
        if (this.gameType === 'snake' && this.gameEngine.level) {
            this.updateLevel(this.gameEngine.level);
        }
        if (this.gameType === 'slap' && this.gameEngine.creations !== undefined) {
            this.updateCreations(this.gameEngine.creations);
        }
    }

    // Utility methods
    getElement(id) {
        return this.elements.get(id);
    }

    setButtonEnabled(id, enabled) {
        const button = this.elements.get(id);
        if (button) {
            button.disabled = !enabled;
        }
    }

    setButtonText(id, text) {
        const button = this.elements.get(id);
        if (button) {
            button.textContent = text;
        }
    }

    // Cleanup
    destroy() {
        this.elements.clear();
        
        const styleEl = document.getElementById(`unified-hud-styles-${this.gameType}`);
        if (styleEl) styleEl.remove();
    }
}

window.UnifiedHUDSystem = UnifiedHUDSystem;
