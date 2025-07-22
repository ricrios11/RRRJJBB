const fs = require('fs');
const path = require('path');

console.log('🎨 Building Advanced Figma-Based Portfolio...');
console.log('📐 Based on Claude Sonnet 4 design system approach');

// Read the existing source HTML to preserve content
const sourceHTML = fs.readFileSync(path.join(__dirname, 'src', 'index.html'), 'utf8');

// Create advanced HTML with sophisticated design system
const advancedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ric Rios - Time-Aware Design Leader Portfolio</title>
    <meta name="description" content="Strategic design leadership for tomorrow's builders. Time-aware innovation meets disciplined methodology.">
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon.png">
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    
    <style>
        /* Advanced Design System - Figma-Based */
        :root {
          /* Color System */
          --primary-50: #eef2ff;
          --primary-100: #e0e7ff;
          --primary-500: #6366f1;
          --primary-600: #4f46e5;
          --primary-700: #4338ca;
          --primary-900: #312e81;
          
          /* Semantic Colors */
          --background: #ffffff;
          --foreground: #0f172a;
          --card: #ffffff;
          --card-foreground: #0f172a;
          --muted: #f8fafc;
          --muted-foreground: #64748b;
          --border: #e2e8f0;
          --accent: #f1f5f9;
          --accent-foreground: #0f172a;
          
          /* Typography Scale */
          --text-xs: 0.75rem;
          --text-sm: 0.875rem;
          --text-base: 1rem;
          --text-lg: 1.125rem;
          --text-xl: 1.25rem;
          --text-2xl: 1.5rem;
          --text-3xl: 1.875rem;
          --text-4xl: 2.25rem;
          --text-5xl: 3rem;
          
          /* Spacing Scale */
          --space-1: 0.25rem;
          --space-2: 0.5rem;
          --space-3: 0.75rem;
          --space-4: 1rem;
          --space-6: 1.5rem;
          --space-8: 2rem;
          --space-12: 3rem;
          --space-16: 4rem;
          --space-24: 6rem;
          
          /* Border Radius */
          --radius-sm: 0.375rem;
          --radius: 0.5rem;
          --radius-md: 0.75rem;
          --radius-lg: 1rem;
          --radius-xl: 1.5rem;
          
          /* Shadows */
          --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
          --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
          --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
          --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
          
          /* Animation */
          --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-base: 300ms cubic-bezier(0.4, 0, 0.2, 1);
          --transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Dark Theme */
        [data-theme="dark"] {
          --background: #0a0a0a;
          --foreground: #ffffff;
          --card: #1a1a1a;
          --card-foreground: #ffffff;
          --muted: #1a1a1a;
          --muted-foreground: #a1a1aa;
          --border: #262626;
          --accent: #1a1a1a;
          --accent-foreground: #ffffff;
        }

        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: var(--background);
          color: var(--foreground);
          line-height: 1.7;
          font-size: var(--text-base);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          transition: background-color var(--transition-base), color var(--transition-base);
        }

        /* Typography System */
        h1, h2, h3, h4, h5, h6 {
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.2;
          margin-bottom: var(--space-4);
        }

        h1 { font-size: clamp(var(--text-3xl), 5vw, var(--text-5xl)); font-weight: 700; }
        h2 { font-size: clamp(var(--text-2xl), 4vw, var(--text-4xl)); }
        h3 { font-size: clamp(var(--text-xl), 3vw, var(--text-3xl)); }
        h4 { font-size: clamp(var(--text-lg), 2.5vw, var(--text-2xl)); }

        p {
          margin-bottom: var(--space-4);
          color: var(--muted-foreground);
        }

        /* Component System */
        .design-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: var(--space-8);
          box-shadow: var(--shadow);
          transition: all var(--transition-base);
          position: relative;
          overflow: hidden;
        }

        .design-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--primary-500), transparent);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .design-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-xl);
          border-color: var(--primary-500);
        }

        .design-card:hover::before {
          opacity: 1;
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary-500), var(--primary-700));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-primary {
          background: var(--primary-500);
          color: var(--primary-50);
          border: none;
          border-radius: var(--radius-lg);
          padding: var(--space-3) var(--space-6);
          font-weight: 500;
          font-size: var(--text-base);
          cursor: pointer;
          transition: all var(--transition-base);
          box-shadow: var(--shadow-sm);
        }

        .btn-primary:hover {
          background: var(--primary-600);
          transform: translateY(-1px);
          box-shadow: var(--shadow-md);
        }

        /* Layout System */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-6);
        }

        @media (min-width: 768px) {
          .container { padding: 0 var(--space-8); }
        }

        @media (min-width: 1024px) {
          .container { padding: 0 var(--space-12); }
        }

        /* Navigation */
        .nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border);
          z-index: 50;
          transition: all var(--transition-base);
        }

        [data-theme="dark"] .nav {
          background: rgba(10, 10, 10, 0.8);
        }

        /* Grid System */
        .grid {
          display: grid;
          gap: var(--space-8);
        }

        .grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
        .grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
        .grid-cols-3 { grid-template-columns: repeat(3, 1fr); }

        @media (min-width: 768px) {
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
          .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
        }

        @media (min-width: 1024px) {
          .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
          .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
        }

        /* Utility Classes */
        .text-center { text-align: center; }
        .flex { display: flex; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .justify-between { justify-content: space-between; }
        .space-x-4 > * + * { margin-left: var(--space-4); }
        .space-y-8 > * + * { margin-top: var(--space-8); }
        .mb-8 { margin-bottom: var(--space-8); }
        .mb-12 { margin-bottom: var(--space-12); }
        .py-24 { padding-top: var(--space-24); padding-bottom: var(--space-24); }
        .px-6 { padding-left: var(--space-6); padding-right: var(--space-6); }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function AdvancedPortfolio() {
            const [theme, setTheme] = useState('light');
            const [timeOfDay, setTimeOfDay] = useState('morning');
            const [greeting, setGreeting] = useState('Good morning');
            
            useEffect(() => {
                const hour = new Date().getHours();
                if (hour >= 5 && hour < 12) {
                    setTimeOfDay('morning');
                    setGreeting('Good morning');
                } else if (hour >= 12 && hour < 18) {
                    setTimeOfDay('afternoon');
                    setGreeting('Good afternoon');
                } else {
                    setTimeOfDay('evening');
                    setGreeting('Good evening');
                }
                
                // Auto dark mode in evening
                if (hour >= 18 || hour < 6) {
                    setTheme('dark');
                }
            }, []);
            
            useEffect(() => {
                document.documentElement.setAttribute('data-theme', theme);
            }, [theme]);
            
            const portfolioItems = [
                {
                    title: "Chase Travel Transformation",
                    icon: "🎯",
                    category: "AI-Enhanced Luxury Travel",
                    metric: "88% reduction in prioritized UX gaps",
                    description: "Strategic redesign unifying desktop and mobile channels through systematic brand DNA alignment."
                },
                {
                    title: "Digital Wealth Management",
                    icon: "💼",
                    category: "Unified Investment Platform",
                    metric: "$2B in new assets onboarded",
                    description: "Full-featured wealth management UI serving high-net-worth clients with systematic precision."
                },
                {
                    title: "Chase Dining Platform",
                    icon: "🍽️",
                    category: "Editorial Meets Utility",
                    metric: "50% increase in reservations",
                    description: "Hybrid editorial-booking platform marrying rich content with reservation functionality."
                },
                {
                    title: "BJJ Training & Design",
                    icon: "🥋",
                    category: "Leadership Methodology",
                    metric: "Enhanced stakeholder management",
                    description: "Applied problem solving and emotional intelligence from martial arts to design leadership."
                },
                {
                    title: "AI-Powered Workflow",
                    icon: "🤖",
                    category: "Multi-Agent Creative Engine",
                    metric: "3× faster content releases",
                    description: "Systematized end-to-end portfolio realization through structured human-AI collaboration."
                },
                {
                    title: "Innovation Laboratory",
                    icon: "🔮",
                    category: "Future-State Design",
                    metric: "Tomorrow's standards today",
                    description: "Building next-generation design patterns with emerging technologies and timeless principles."
                }
            ];
            
            return (
                <div className="min-h-screen">
                    {/* Navigation */}
                    <nav className="nav">
                        <div className="container">
                            <div className="flex items-center justify-between py-4">
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl">🎛️</span>
                                    <div>
                                        <span className="font-semibold text-lg">Ric Rios</span>
                                        <span className="text-sm text-muted-foreground ml-2">DOS</span>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-muted-foreground hidden md:inline">
                                        {greeting}
                                    </span>
                                    <button 
                                        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        {theme === 'light' ? '🌙' : '☀️'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                    
                    {/* Hero Section */}
                    <section className="py-24 px-6" style={{paddingTop: '8rem'}}>
                        <div className="container">
                            <div className="text-center max-w-4xl mx-auto">
                                <h1 className="gradient-text mb-8">
                                    Time-Aware Design Leadership
                                </h1>
                                <p className="text-xl mb-8 max-w-3xl mx-auto">
                                    When ambitious leaders need disciplined design innovation that bridges 
                                    craft mastery with emerging technology—delivering standards that define tomorrow.
                                </p>
                                <p className="text-lg mb-12 max-w-2xl mx-auto">
                                    For leaders who understand exceptional design isn't decoration—it's competitive advantage. 
                                    Strategic, disciplined, relentlessly forward-looking.
                                </p>
                                <button className="btn-primary">
                                    Begin with proven mastery
                                </button>
                                <div className="mt-16 text-center">
                                    <div className="inline-flex items-center space-x-4 text-sm text-muted-foreground">
                                        <span>Leadership</span>
                                        <span>•</span>
                                        <span>Innovation</span>
                                        <span>•</span>
                                        <span>Future-Aware</span>
                                        <span>•</span>
                                        <span>Authentically Mine</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Portfolio Grid */}
                    <section className="py-24 px-6">
                        <div className="container">
                            <div className="mb-12 text-center">
                                <h2 className="mb-8">
                                    {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Portfolio: Systems in Action
                                </h2>
                                <p className="text-lg max-w-4xl mx-auto">
                                    Three decades of systematic design leadership applied across diverse domains—from luxury travel 
                                    to wealth management to community building. Each project demonstrates the intersection of deep 
                                    craft knowledge, strategic rigor, and forward-looking innovation.
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {portfolioItems.map((item, index) => (
                                    <div key={index} className="design-card">
                                        <div className="flex items-center mb-4">
                                            <span className="text-3xl mr-3">{item.icon}</span>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
                                                <p className="text-sm text-muted-foreground">{item.category}</p>
                                            </div>
                                        </div>
                                        <p className="text-sm mb-4 leading-relaxed">
                                            {item.description}
                                        </p>
                                        <div className="text-xs font-medium" style={{color: 'var(--primary-600)'}}>
                                            {item.metric}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* Innovation Archive */}
                    <section className="py-24 px-6">
                        <div className="container">
                            <div className="design-card text-center" style={{
                                background: 'linear-gradient(135deg, var(--primary-500), var(--primary-700))',
                                color: 'white',
                                border: 'none'
                            }}>
                                <h2 className="text-white mb-4">Evening Innovation Archive</h2>
                                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                                    Innovation and luxury psychology—transforming wanderlust into seamless reality through content architecture.
                                </p>
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">AI/ML Experience Design</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Luxury Market Psychology</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Content Architecture</span>
                                    <span className="px-3 py-1 bg-white/20 rounded-full text-sm">Behavioral Transformation</span>
                                </div>
                                <button className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                                    Explore →
                                </button>
                            </div>
                        </div>
                    </section>
                    
                    {/* Footer */}
                    <footer className="py-12 px-6 border-t" style={{borderColor: 'var(--border)'}}>
                        <div className="container text-center">
                            <p className="text-muted-foreground">
                                © 2025 Ric Rios. Strategic design leadership for tomorrow's builders.
                            </p>
                        </div>
                    </footer>
                </div>
            );
        }
        
        ReactDOM.render(<AdvancedPortfolio />, document.getElementById('root'));
    </script>
</body>
</html>`;

// Write the advanced HTML
fs.writeFileSync(path.join(__dirname, 'build', 'advanced-figma.html'), advancedHTML);

console.log('✅ Advanced Figma-based portfolio created at build/advanced-figma.html');
console.log('🎨 Sophisticated design system with CSS custom properties');
console.log('📱 Responsive design with professional component architecture');
console.log('⚡ Time-aware functionality with automatic theme switching');
console.log('🎯 Based on Claude Sonnet 4 design principles');
