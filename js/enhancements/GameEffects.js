/**
 * GameEffects - Enhanced visual effects and particle systems
 * Cyberpunk animations, screen shake, glitch effects
 */

class GameEffects {
    constructor(gameEngine) {
        this.engine = gameEngine;
        this.ctx = gameEngine.ctx;
        this.canvas = gameEngine.canvas;
        
        // Effect systems
        this.particles = [];
        this.screenShake = { x: 0, y: 0, intensity: 0, duration: 0 };
        this.glitchEffect = { active: false, intensity: 0, duration: 0 };
        this.scanlines = { active: true, speed: 2, opacity: 0.1 };
        this.chromatic = { active: false, intensity: 0 };
        
        // Performance tracking
        this.maxParticles = 200;
        this.particlePool = [];
        this.effectsEnabled = true;
        
        this.initializeEffects();
    }

    /**
     * Initialize effect systems
     */
    initializeEffects() {
        // Pre-allocate particle pool for performance
        for (let i = 0; i < this.maxParticles; i++) {
            this.particlePool.push(this.createParticle());
        }
        
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.effectsEnabled = false;
            console.log('🎨 Effects disabled due to reduced motion preference');
        }
    }

    /**
     * Create a particle object
     */
    createParticle() {
        return {
            x: 0, y: 0,
            vx: 0, vy: 0,
            life: 1, maxLife: 1,
            size: 1,
            color: '#ffffff',
            type: 'default',
            active: false,
            gravity: 0,
            friction: 0.98,
            glow: false
        };
    }

    /**
     * Get particle from pool
     */
    getParticle() {
        for (let particle of this.particlePool) {
            if (!particle.active) {
                return particle;
            }
        }
        return null; // Pool exhausted
    }

    /**
     * Create explosion effect
     */
    createExplosion(x, y, options = {}) {
        if (!this.effectsEnabled) return;
        
        const {
            count = 15,
            color = '#ff4444',
            speed = 3,
            size = 2,
            life = 1.0
        } = options;

        for (let i = 0; i < count; i++) {
            const particle = this.getParticle();
            if (!particle) break;

            const angle = (Math.PI * 2 * i) / count;
            const velocity = speed * (0.5 + Math.random() * 0.5);

            particle.x = x;
            particle.y = y;
            particle.vx = Math.cos(angle) * velocity;
            particle.vy = Math.sin(angle) * velocity;
            particle.life = life;
            particle.maxLife = life;
            particle.size = size * (0.5 + Math.random() * 0.5);
            particle.color = color;
            particle.type = 'explosion';
            particle.active = true;
            particle.gravity = 0.1;
            particle.glow = true;
        }
    }

    /**
     * Create trail effect
     */
    createTrail(x, y, options = {}) {
        if (!this.effectsEnabled) return;
        
        const {
            color = '#00ff9d',
            size = 1,
            life = 0.5
        } = options;

        const particle = this.getParticle();
        if (!particle) return;

        particle.x = x + (Math.random() - 0.5) * 4;
        particle.y = y + (Math.random() - 0.5) * 4;
        particle.vx = (Math.random() - 0.5) * 0.5;
        particle.vy = (Math.random() - 0.5) * 0.5;
        particle.life = life;
        particle.maxLife = life;
        particle.size = size;
        particle.color = color;
        particle.type = 'trail';
        particle.active = true;
        particle.gravity = 0;
        particle.glow = true;
    }

    /**
     * Create power-up effect
     */
    createPowerUpEffect(x, y, options = {}) {
        if (!this.effectsEnabled) return;
        
        const {
            color = '#4A90E2',
            count = 8
        } = options;

        // Ring of particles
        for (let i = 0; i < count; i++) {
            const particle = this.getParticle();
            if (!particle) break;

            const angle = (Math.PI * 2 * i) / count;
            const radius = 20;

            particle.x = x + Math.cos(angle) * radius;
            particle.y = y + Math.sin(angle) * radius;
            particle.vx = Math.cos(angle) * 2;
            particle.vy = Math.sin(angle) * 2;
            particle.life = 1.5;
            particle.maxLife = 1.5;
            particle.size = 3;
            particle.color = color;
            particle.type = 'powerup';
            particle.active = true;
            particle.gravity = -0.05; // Float upward
            particle.glow = true;
        }
    }

    /**
     * Trigger screen shake
     */
    screenShake(intensity = 5, duration = 300) {
        if (!this.effectsEnabled) return;
        
        this.screenShake.intensity = intensity;
        this.screenShake.duration = duration;
    }

    /**
     * Trigger glitch effect
     */
    glitch(intensity = 0.5, duration = 500) {
        if (!this.effectsEnabled) return;
        
        this.glitchEffect.active = true;
        this.glitchEffect.intensity = intensity;
        this.glitchEffect.duration = duration;
    }

    /**
     * Trigger chromatic aberration
     */
    chromaticAberration(intensity = 2, duration = 200) {
        if (!this.effectsEnabled) return;
        
        this.chromatic.active = true;
        this.chromatic.intensity = intensity;
        this.chromatic.duration = duration;
    }

    /**
     * Update all effects
     */
    update(deltaTime) {
        if (!this.effectsEnabled) return;
        
        // Update particles
        this.updateParticles(deltaTime);
        
        // Update screen shake
        if (this.screenShake.duration > 0) {
            this.screenShake.duration -= deltaTime;
            const progress = this.screenShake.duration / 300;
            const intensity = this.screenShake.intensity * progress;
            
            this.screenShake.x = (Math.random() - 0.5) * intensity;
            this.screenShake.y = (Math.random() - 0.5) * intensity;
            
            if (this.screenShake.duration <= 0) {
                this.screenShake.x = 0;
                this.screenShake.y = 0;
            }
        }
        
        // Update glitch effect
        if (this.glitchEffect.active) {
            this.glitchEffect.duration -= deltaTime;
            if (this.glitchEffect.duration <= 0) {
                this.glitchEffect.active = false;
            }
        }
        
        // Update chromatic aberration
        if (this.chromatic.active) {
            this.chromatic.duration -= deltaTime;
            if (this.chromatic.duration <= 0) {
                this.chromatic.active = false;
            }
        }
    }

    /**
     * Update particle system
     */
    updateParticles(deltaTime) {
        for (let particle of this.particlePool) {
            if (!particle.active) continue;
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Apply gravity
            particle.vy += particle.gravity;
            
            // Apply friction
            particle.vx *= particle.friction;
            particle.vy *= particle.friction;
            
            // Update life
            particle.life -= deltaTime / 1000;
            
            // Deactivate dead particles
            if (particle.life <= 0) {
                particle.active = false;
            }
        }
    }

    /**
     * Render all effects
     */
    render() {
        if (!this.effectsEnabled) return;
        
        this.ctx.save();
        
        // Apply screen shake
        if (this.screenShake.intensity > 0) {
            this.ctx.translate(this.screenShake.x, this.screenShake.y);
        }
        
        // Apply glitch effect
        if (this.glitchEffect.active) {
            this.renderGlitchEffect();
        }
        
        // Render particles
        this.renderParticles();
        
        // Render scanlines
        if (this.scanlines.active) {
            this.renderScanlines();
        }
        
        this.ctx.restore();
    }

    /**
     * Render particles
     */
    renderParticles() {
        for (let particle of this.particlePool) {
            if (!particle.active) continue;
            
            const alpha = particle.life / particle.maxLife;
            
            this.ctx.save();
            this.ctx.globalAlpha = alpha;
            
            if (particle.glow) {
                this.ctx.shadowColor = particle.color;
                this.ctx.shadowBlur = particle.size * 2;
            }
            
            this.ctx.fillStyle = particle.color;
            
            switch (particle.type) {
                case 'explosion':
                    this.ctx.fillRect(
                        particle.x - particle.size / 2,
                        particle.y - particle.size / 2,
                        particle.size,
                        particle.size
                    );
                    break;
                    
                case 'trail':
                    this.ctx.beginPath();
                    this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                    
                case 'powerup':
                    this.ctx.save();
                    this.ctx.translate(particle.x, particle.y);
                    this.ctx.rotate(Date.now() * 0.01);
                    this.ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
                    this.ctx.restore();
                    break;
                    
                default:
                    this.ctx.fillRect(
                        particle.x - particle.size / 2,
                        particle.y - particle.size / 2,
                        particle.size,
                        particle.size
                    );
            }
            
            this.ctx.restore();
        }
    }

    /**
     * Render glitch effect
     */
    renderGlitchEffect() {
        const intensity = this.glitchEffect.intensity;
        
        // Random color shifts
        if (Math.random() < 0.1) {
            this.ctx.save();
            this.ctx.globalCompositeOperation = 'screen';
            this.ctx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.1})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        }
        
        // Digital noise lines
        if (Math.random() < 0.3) {
            this.ctx.save();
            this.ctx.strokeStyle = `rgba(0, 255, 157, ${intensity * 0.5})`;
            this.ctx.lineWidth = 1;
            
            for (let i = 0; i < 5; i++) {
                const y = Math.random() * this.canvas.height;
                this.ctx.beginPath();
                this.ctx.moveTo(0, y);
                this.ctx.lineTo(this.canvas.width, y);
                this.ctx.stroke();
            }
            
            this.ctx.restore();
        }
    }

    /**
     * Render scanlines
     */
    renderScanlines() {
        this.ctx.save();
        this.ctx.globalAlpha = this.scanlines.opacity;
        this.ctx.strokeStyle = '#00ff9d';
        this.ctx.lineWidth = 1;
        
        const offset = (Date.now() * this.scanlines.speed * 0.01) % 4;
        
        for (let y = offset; y < this.canvas.height; y += 4) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }
        
        this.ctx.restore();
    }

    /**
     * Get active particle count
     */
    getActiveParticleCount() {
        return this.particlePool.filter(p => p.active).length;
    }

    /**
     * Clear all effects
     */
    clear() {
        // Deactivate all particles
        for (let particle of this.particlePool) {
            particle.active = false;
        }
        
        // Reset effects
        this.screenShake = { x: 0, y: 0, intensity: 0, duration: 0 };
        this.glitchEffect = { active: false, intensity: 0, duration: 0 };
        this.chromatic = { active: false, intensity: 0 };
    }

    /**
     * Enable/disable effects
     */
    setEnabled(enabled) {
        this.effectsEnabled = enabled;
        if (!enabled) {
            this.clear();
        }
    }
}

// Export for use
window.GameEffects = GameEffects;
