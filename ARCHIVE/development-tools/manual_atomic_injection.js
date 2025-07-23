// Manual TrojanHorse Feed Component Injection
// Run this script in the browser console to manually create the atomic component

console.log('🚀 MANUAL INJECTION: Starting TrojanHorse Feed creation...');

// Check if foundation exists
const foundation = document.getElementById('innovation-lab-foundation');
if (!foundation) {
    console.error('❌ Foundation not found');
    throw new Error('Innovation Lab Foundation not found');
}

console.log('✅ Foundation found, creating component...');

// Create component container
const componentId = `trojan_horse_feed_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
const container = document.createElement('div');
container.id = componentId;
container.className = 'atomic-trojan-horse-feed';

// Add component HTML
container.innerHTML = `
    <div class="feed-header">
        <div class="feed-icon">🐴</div>
        <h3 class="feed-title">TrojanHorse Feed</h3>
        <div class="feed-status">
            <span class="status-indicator active"></span>
            <span class="status-text">Active</span>
        </div>
    </div>
    <div class="feed-content">
        <div class="feed-carousel">
            <div class="feed-item active" data-index="0">
                <div class="item-icon">🧪</div>
                <div class="item-content">
                    <h4>Innovation Lab</h4>
                    <p>Systematic innovation through controlled experimentation</p>
                </div>
            </div>
            <div class="feed-item" data-index="1">
                <div class="item-icon">🎮</div>
                <div class="item-content">
                    <h4>DOS Snake Game</h4>
                    <p>Classic gaming with modern responsive design</p>
                </div>
            </div>
            <div class="feed-item" data-index="2">
                <div class="item-icon">🕰️</div>
                <div class="item-content">
                    <h4>Time Travel Mode</h4>
                    <p>Experience case studies from multiple time perspectives</p>
                </div>
            </div>
            <div class="feed-item" data-index="3">
                <div class="item-icon">🧠</div>
                <div class="item-content">
                    <h4>UX Memory Recall</h4>
                    <p>Intelligent pattern recognition for design decisions</p>
                </div>
            </div>
        </div>
        <div class="feed-controls">
            <button class="control-btn prev" data-action="prev">‹</button>
            <div class="feed-indicators">
                <span class="indicator active" data-index="0"></span>
                <span class="indicator" data-index="1"></span>
                <span class="indicator" data-index="2"></span>
                <span class="indicator" data-index="3"></span>
            </div>
            <button class="control-btn next" data-action="next">›</button>
        </div>
    </div>
    <div class="feed-footer">
        <div class="component-info">
            <span class="component-id">${componentId}</span>
            <span class="build-status">Manual Injection ✅</span>
        </div>
    </div>
`;

// Add styles
const styleId = `${componentId}-styles`;
const style = document.createElement('style');
style.id = styleId;
style.textContent = `
    .atomic-trojan-horse-feed {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        border: 2px solid #00ff41;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 2rem 0;
        font-family: 'Courier New', monospace;
        color: #00ff41;
        box-shadow: 0 8px 32px rgba(0, 255, 65, 0.2);
        backdrop-filter: blur(10px);
        position: relative;
        overflow: hidden;
    }
    .atomic-trojan-horse-feed::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(90deg, transparent, #00ff41, transparent);
        animation: scan 2s linear infinite;
    }
    @keyframes scan {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
    .feed-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid rgba(0, 255, 65, 0.3);
    }
    .feed-icon {
        font-size: 2rem;
        animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
    .feed-title {
        margin: 0;
        font-size: 1.5rem;
        font-weight: bold;
        flex: 1;
    }
    .feed-status {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }
    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #00ff41;
        animation: blink 1s ease-in-out infinite;
    }
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.3; }
    }
    .feed-content {
        position: relative;
    }
    .feed-carousel {
        height: 120px;
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        background: rgba(0, 255, 65, 0.05);
    }
    .feed-item {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease-in-out;
    }
    .feed-item.active {
        opacity: 1;
        transform: translateX(0);
    }
    .item-icon {
        font-size: 2.5rem;
        min-width: 60px;
        text-align: center;
    }
    .item-content h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        color: #00ff41;
    }
    .item-content p {
        margin: 0;
        font-size: 0.9rem;
        color: rgba(0, 255, 65, 0.8);
        line-height: 1.4;
    }
    .feed-controls {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
    }
    .control-btn {
        background: rgba(0, 255, 65, 0.1);
        border: 1px solid #00ff41;
        color: #00ff41;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.2rem;
        transition: all 0.2s ease;
    }
    .control-btn:hover {
        background: rgba(0, 255, 65, 0.2);
        transform: scale(1.1);
    }
    .feed-indicators {
        display: flex;
        gap: 0.5rem;
    }
    .indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: rgba(0, 255, 65, 0.3);
        cursor: pointer;
        transition: all 0.2s ease;
    }
    .indicator.active {
        background: #00ff41;
        transform: scale(1.2);
    }
    .feed-footer {
        margin-top: 1.5rem;
        padding-top: 1rem;
        border-top: 1px solid rgba(0, 255, 65, 0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.8rem;
        color: rgba(0, 255, 65, 0.6);
    }
    .component-id {
        font-family: monospace;
        font-size: 0.7rem;
    }
    .build-status {
        color: #00ff41;
        font-weight: bold;
    }
    @media (max-width: 768px) {
        .atomic-trojan-horse-feed {
            padding: 1rem;
            margin: 1rem 0;
        }
        .feed-header {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
        .feed-carousel {
            height: 140px;
        }
        .feed-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
        }
    }
`;

// Add styles to head
document.head.appendChild(style);
console.log('🎨 Styles applied');

// Insert container into foundation
foundation.appendChild(container);
console.log('🏗️ Component inserted into foundation');

// Add carousel functionality
let currentIndex = 0;
const items = container.querySelectorAll('.feed-item');
const indicators = container.querySelectorAll('.indicator');

function updateCarousel() {
    items.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
    });
}

// Add event listeners
container.querySelector('.control-btn.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
    console.log(`🎮 Next: ${currentIndex}`);
});

container.querySelector('.control-btn.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateCarousel();
    console.log(`🎮 Prev: ${currentIndex}`);
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentIndex = index;
        updateCarousel();
        console.log(`🎮 Jump to: ${currentIndex}`);
    });
});

// Auto-rotation
const autoRotate = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
}, 4000);

// Pause on hover
container.addEventListener('mouseenter', () => {
    clearInterval(autoRotate);
    console.log('⏸️ Auto-rotation paused');
});

container.addEventListener('mouseleave', () => {
    const newAutoRotate = setInterval(() => {
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    }, 4000);
    console.log('▶️ Auto-rotation resumed');
});

console.log('✅ MANUAL INJECTION COMPLETE!');
console.log('📊 Component ID:', componentId);
console.log('🎯 TrojanHorse Feed successfully created and functional');

// Return component reference for further manipulation
window.manualTrojanHorseFeed = {
    container,
    componentId,
    currentIndex,
    updateCarousel,
    items,
    indicators
};

return 'TrojanHorse Feed component successfully injected!';
