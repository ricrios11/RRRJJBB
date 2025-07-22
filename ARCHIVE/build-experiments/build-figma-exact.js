const fs = require('fs');
const path = require('path');

// Ensure build directory exists
const buildDir = 'build';
if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ric Rios - Time-Aware Design Leader Portfolio</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: {
                        primary: '#6366f1',
                        secondary: '#8b5cf6',
                        accent: '#06b6d4'
                    }
                }
            }
        }
    </script>
    <style>
        .gradient-text {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
    </style>
</head>
<body class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <!-- Header -->
    <header class="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <span class="text-white font-bold text-sm">RR</span>
                    </div>
                    <div>
                        <h1 class="font-semibold text-slate-900 dark:text-slate-100">Ric Rios</h1>
                        <p class="text-xs text-slate-500 dark:text-slate-400">DOS</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <span id="time-greeting" class="text-sm text-slate-600 dark:text-slate-300">Good evening</span>
                    <button id="theme-toggle" class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                        🌙
                    </button>
                </div>
            </div>
        </div>
    </header>

    <!-- Tab Navigation -->
    <nav class="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex space-x-8 overflow-x-auto">
                <button class="tab-btn flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400 whitespace-nowrap" data-tab="operating-system">
                    <span>🧠</span>
                    <span>Operating System</span>
                </button>
                <button class="tab-btn flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 whitespace-nowrap" data-tab="philosophy">
                    <span>💭</span>
                    <span>Philosophy</span>
                </button>
                <button class="tab-btn flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 whitespace-nowrap" data-tab="innovation-lab">
                    <span>⚡</span>
                    <span>Innovation Lab</span>
                </button>
                <button class="tab-btn flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 whitespace-nowrap" data-tab="toolkit">
                    <span>🛠️</span>
                    <span>Toolkit</span>
                </button>
            </div>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Operating System Tab -->
        <div id="operating-system" class="tab-content active space-y-12">
            <div class="text-center space-y-4">
                <h2 class="text-4xl font-bold gradient-text">Time-Aware Design Leadership</h2>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                    When ambitious leaders need disciplined design innovation that bridges craft mastery 
                    with emerging technology—delivering standards that define tomorrow.
                </p>
                <p class="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
                    For leaders who understand exceptional design isn't decoration—it's competitive 
                    advantage. Strategic, disciplined, relentlessly forward-looking.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <div class="text-3xl mb-4">🧠</div>
                    <h3 class="text-xl font-semibold mb-3">Behavioral Systems Architecture</h3>
                    <p class="text-slate-600 dark:text-slate-300">
                        Three decades of user psychology combined with AI-powered pattern recognition. 
                        I reveal hidden decision-making architectures that transform how people interact with digital experiences.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <div class="text-3xl mb-4">⚡</div>
                    <h3 class="text-xl font-semibold mb-3">Systematic Innovation Process</h3>
                    <p class="text-slate-600 dark:text-slate-300">
                        Rigorous methodology born from every major design book, refined through real-world application. 
                        Creative excellence guided by disciplined precision that delivers predictable transformation.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow">
                    <div class="text-3xl mb-4">🔮</div>
                    <h3 class="text-xl font-semibold mb-3">Forward-Looking Systems Design</h3>
                    <p class="text-slate-600 dark:text-slate-300">
                        Building tomorrow's standards with emerging technologies. Future-state prototyping 
                        that bridges current capabilities with next-generation possibilities through strategic foresight.
                    </p>
                </div>
            </div>
        </div>

        <!-- Philosophy Tab -->
        <div id="philosophy" class="tab-content space-y-12">
            <div class="text-center space-y-4">
                <h2 class="text-4xl font-bold gradient-text">Design Philosophy</h2>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                    Where timeless principles meet forward-looking systems. Earned authority through 
                    real-world application, creating lasting impact that honors both heritage and possibility.
                </p>
            </div>

            <div class="max-w-4xl mx-auto">
                <blockquote class="text-2xl font-medium text-center border-l-4 border-indigo-500 pl-6 italic mb-12">
                    "Calm authority earned through decades of application. Strategic rigor that bridges 
                    creative excellence with business outcomes, always with relentless curiosity about tomorrow's possibilities."
                </blockquote>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <h3 class="text-2xl font-semibold">Three Decades of Synthesis</h3>
                        <p class="text-slate-600 dark:text-slate-300">
                            Where timeless design principles meet emerging technology. Three decades of real-world 
                            application creating systematic innovation that defines tomorrow's standards through proven excellence.
                        </p>
                    </div>

                    <div class="space-y-4">
                        <h3 class="text-2xl font-semibold">Strategic Leadership</h3>
                        <p class="text-slate-600 dark:text-slate-300">
                            Earned authority through decades of application. Strategic leadership that connects design, 
                            technology, culture, and business outcomes into coherent systems that create lasting competitive advantage.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Innovation Lab Tab -->
        <div id="innovation-lab" class="tab-content space-y-12">
            <div class="text-center space-y-4">
                <h2 class="text-4xl font-bold gradient-text">Innovation Archive</h2>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                    Three decades of systematic design leadership applied across diverse domains—from luxury travel 
                    to wealth management to community building. Each project demonstrates the intersection of deep craft knowledge, 
                    strategic rigor, and forward-looking innovation.
                </p>
            </div>

            <div class="grid md:grid-cols-2 gap-8">
                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div class="flex items-start space-x-4">
                        <div class="text-3xl">🎯</div>
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold mb-1">Chase Travel Transformation</h3>
                            <p class="text-indigo-600 dark:text-indigo-400 font-medium mb-3">AI-Enhanced Luxury Travel Experience</p>
                            <p class="text-slate-600 dark:text-slate-300 mb-4">Led strategic redesign of Chase's travel booking experience, unifying desktop and mobile channels through systematic design leadership.</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">88% reduction in UX gaps</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">20% YoY transaction growth</span>
                                </div>
                            </div>
                            <button class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                                → View methodology & impact
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div class="flex items-start space-x-4">
                        <div class="text-3xl">💼</div>
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold mb-1">Digital Wealth Management</h3>
                            <p class="text-indigo-600 dark:text-indigo-400 font-medium mb-3">JPMC Platform Foundation</p>
                            <p class="text-slate-600 dark:text-slate-300 mb-4">Unified investment platform serving high-net-worth clients with systematic precision and end-to-end experience design.</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">20% YoY AUM growth</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">30% reduction in support calls</span>
                                </div>
                            </div>
                            <button class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                                → View methodology & impact
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div class="flex items-start space-x-4">
                        <div class="text-3xl">🍽️</div>
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold mb-1">Chase Dining Platform</h3>
                            <p class="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Editorial-Booking Integration</p>
                            <p class="text-slate-600 dark:text-slate-300 mb-4">Fused content with reservation utility for Sapphire Reserve dining experience through strategic design integration.</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">50% increase in reservations</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">70% editorial engagement</span>
                                </div>
                            </div>
                            <button class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                                → View methodology & impact
                            </button>
                        </div>
                    </div>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600">
                    <div class="flex items-start space-x-4">
                        <div class="text-3xl">🤖</div>
                        <div class="flex-1">
                            <h3 class="text-xl font-semibold mb-1">Meta: AI-Powered Design Workflow</h3>
                            <p class="text-indigo-600 dark:text-indigo-400 font-medium mb-3">Multi-Agent Creative Engine</p>
                            <p class="text-slate-600 dark:text-slate-300 mb-4">Systematized end-to-end design-to-development through human-AI collaboration with zero manual updates.</p>
                            <div class="space-y-2 mb-4">
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">3× faster content releases</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <div class="w-2 h-2 bg-indigo-500 rounded-full"></div>
                                    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Zero manual updates</span>
                                </div>
                            </div>
                            <button class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium text-sm">
                                → View methodology & impact
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Toolkit Tab -->
        <div id="toolkit" class="tab-content space-y-12">
            <div class="text-center space-y-4">
                <h2 class="text-4xl font-bold gradient-text">Applied Leadership Tools</h2>
                <p class="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto">
                    Systematic methodologies and frameworks developed through three decades of design leadership. 
                    Each tool represents proven approaches to complex challenges.
                </p>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">🎯 Strategic Design Frameworks</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        Systematic approaches to complex design challenges, refined through real-world application.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">⚡ Innovation Methodologies</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        Disciplined processes for breakthrough thinking and systematic innovation.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">🔮 Future-State Prototyping</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        Methods for building tomorrow's standards with emerging technologies.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">🧠 Behavioral Architecture</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        User psychology frameworks for understanding decision-making patterns.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">🎨 Design System Architecture</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        Scalable design systems that bridge creative excellence with technical precision.
                    </p>
                </div>

                <div class="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                    <h3 class="text-lg font-semibold mb-3">🚀 Leadership Methodologies</h3>
                    <p class="text-slate-600 dark:text-slate-300 text-sm">
                        Proven approaches to design leadership and cross-functional collaboration.
                    </p>
                </div>
            </div>

            <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 text-center">
                <h3 class="text-2xl font-bold mb-4">Ready to Transform Your Design Leadership?</h3>
                <p class="text-slate-600 dark:text-slate-300 mb-6 max-w-2xl mx-auto">
                    Three decades of proven methodologies, systematic innovation, and strategic design leadership 
                    ready to accelerate your organization's transformation.
                </p>
                <button class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-indigo-700 hover:to-purple-700 transition-all duration-300">
                    Begin with proven mastery
                </button>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="flex items-center justify-between">
                <p class="text-sm text-slate-600 dark:text-slate-400">
                    © 2025 Ric Rios. All rights reserved. | Authentically mine, never generic.
                </p>
                <div class="flex items-center space-x-4">
                    <a href="#" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">💼 LinkedIn</a>
                    <a href="#" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">📸 Instagram</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        // Time-aware functionality
        function updateTimeGreeting() {
            const hour = new Date().getHours();
            const greetingElement = document.getElementById('time-greeting');
            const themeToggle = document.getElementById('theme-toggle');
            
            let greeting;
            const isEvening = hour >= 18 || hour < 6;
            
            if (isEvening) {
                greeting = 'Good evening';
                document.documentElement.classList.add('dark');
                themeToggle.textContent = '☀️';
            } else if (hour < 12) {
                greeting = 'Good morning';
                themeToggle.textContent = '🌙';
            } else {
                greeting = 'Good afternoon';
                themeToggle.textContent = '🌙';
            }
            
            greetingElement.textContent = greeting;
        }

        // Theme toggle functionality
        function toggleTheme() {
            const html = document.documentElement;
            const themeToggle = document.getElementById('theme-toggle');
            
            html.classList.toggle('dark');
            
            if (html.classList.contains('dark')) {
                themeToggle.textContent = '☀️';
            } else {
                themeToggle.textContent = '🌙';
            }
        }

        // Tab functionality
        function switchTab(tabId) {
            // Hide all tab contents
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Show selected tab content
            const selectedTab = document.getElementById(tabId);
            if (selectedTab) {
                selectedTab.classList.add('active');
            }
            
            // Update tab button styles
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(button => {
                button.classList.remove('border-indigo-500', 'text-indigo-600', 'dark:text-indigo-400');
                button.classList.add('border-transparent', 'text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200');
            });
            
            // Style active tab button
            const activeButton = document.querySelector('[data-tab="' + tabId + '"]');
            if (activeButton) {
                activeButton.classList.remove('border-transparent', 'text-slate-500', 'hover:text-slate-700', 'dark:text-slate-400', 'dark:hover:text-slate-200');
                activeButton.classList.add('border-indigo-500', 'text-indigo-600', 'dark:text-indigo-400');
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            updateTimeGreeting();
            
            // Add event listeners
            document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
            
            // Add tab click listeners
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const tabId = this.getAttribute('data-tab');
                    switchTab(tabId);
                });
            });
        });
    </script>
</body>
</html>`;

// Write the HTML file
fs.writeFileSync(path.join(buildDir, 'figma-exact.html'), htmlContent);

console.log('🎨 Building Figma-Exact Portfolio...');
console.log('📐 Matching exact tab-based navigation structure');
console.log('✅ Figma-exact portfolio created at build/figma-exact.html');
console.log('🎯 Tab-based navigation: Operating System | Philosophy | Innovation Lab | Toolkit');
console.log('📱 Clean, minimal design matching Figma specifications');
console.log('⚡ Time-aware functionality with automatic theme switching');
