const fs = require('fs');
const path = require('path');

console.log('🎨 Building Figma-Inspired Portfolio...');

// Create refined HTML with design system approach
const refinedHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ric Rios - Time-Aware Design Leader Portfolio</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="icon" type="image/svg+xml" href="favicon.svg">
    <style>
        /* Design System Variables */
        :root {
          --primary: #6366f1;
          --primary-foreground: #ffffff;
          --background: #ffffff;
          --foreground: #1a1a1a;
          --card: #ffffff;
          --card-foreground: #1a1a1a;
          --muted: #f8fafc;
          --muted-foreground: #64748b;
          --border: #e2e8f0;
          --radius: 16px;
          --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
          --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
        }

        /* Dark mode */
        [data-theme="dark"] {
          --background: #0a0a0a;
          --foreground: #ffffff;
          --card: #1a1a1a;
          --card-foreground: #ffffff;
          --muted: #1a1a1a;
          --muted-foreground: #a1a1aa;
          --border: #262626;
        }

        /* Typography System */
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'SF Pro Display', Roboto, sans-serif;
          background: var(--background);
          color: var(--foreground);
          line-height: 1.7;
          -webkit-font-smoothing: antialiased;
        }

        /* Component System */
        .design-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          padding: 2rem;
          box-shadow: var(--shadow);
          transition: all 0.3s ease;
        }

        .design-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .gradient-text {
          background: linear-gradient(135deg, var(--primary), #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        const { useState, useEffect } = React;
        
        function Portfolio() {
            const [theme, setTheme] = useState('light');
            const [timeOfDay, setTimeOfDay] = useState('morning');
            
            useEffect(() => {
                const hour = new Date().getHours();
                if (hour >= 5 && hour < 12) setTimeOfDay('morning');
                else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
                else setTimeOfDay('evening');
                
                if (hour >= 18 || hour < 6) setTheme('dark');
            }, []);
            
            useEffect(() => {
                document.documentElement.setAttribute('data-theme', theme);
            }, [theme]);
            
            return (
                <div className="min-h-screen">
                    {/* Navigation */}
                    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
                        <div className="max-w-6xl mx-auto px-6 py-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">🎛️</span>
                                    <span className="font-semibold">Ric Rios</span>
                                </div>
                                <button 
                                    onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                                    className="p-2 rounded-lg hover:bg-gray-100"
                                >
                                    {theme === 'light' ? '🌙' : '☀️'}
                                </button>
                            </div>
                        </div>
                    </nav>
                    
                    {/* Hero Section */}
                    <section className="pt-32 pb-20 px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-5xl font-bold mb-6 gradient-text">
                                Time-Aware Design Leadership
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                                Transforming ambitious vision into competitive advantage through 
                                disciplined design innovation and emerging technology mastery.
                            </p>
                            <div className="design-card inline-block">
                                <p className="text-sm text-gray-500 mb-2">Current Focus: {timeOfDay} Innovation</p>
                                <p className="font-medium">Strategic Design Leadership for Tomorrow's Builders</p>
                            </div>
                        </div>
                    </section>
                    
                    {/* Portfolio Grid */}
                    <section className="py-20 px-6">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold mb-12 text-center">Design Systems in Action</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[
                                    { title: "Chase Travel", icon: "🎯", metric: "88% UX gap reduction" },
                                    { title: "Wealth Management", icon: "💼", metric: "$2B assets onboarded" },
                                    { title: "Dining Platform", icon: "🍽️", metric: "50% reservation increase" },
                                    { title: "BJJ & Design", icon: "🥋", metric: "Leadership methodology" },
                                    { title: "AI Workflow", icon: "🤖", metric: "3x faster releases" },
                                    { title: "Innovation Lab", icon: "🔮", metric: "Future-state design" }
                                ].map((item, index) => (
                                    <div key={index} className="design-card">
                                        <div className="text-3xl mb-4">{item.icon}</div>
                                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4">
                                            Strategic design leadership applied to complex challenges
                                        </p>
                                        <div className="text-sm font-medium text-indigo-600">
                                            {item.metric}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    
                    {/* Footer */}
                    <footer className="py-12 px-6 border-t border-gray-200">
                        <div className="max-w-4xl mx-auto text-center">
                            <p className="text-gray-600">
                                © 2025 Ric Rios. Strategic design leadership for tomorrow's builders.
                            </p>
                        </div>
                    </footer>
                </div>
            );
        }
        
        ReactDOM.render(<Portfolio />, document.getElementById('root'));
    </script>
</body>
</html>`;

// Write the refined HTML
fs.writeFileSync(path.join(__dirname, 'build', 'figma-inspired.html'), refinedHTML);

console.log('✅ Figma-inspired portfolio created at build/figma-inspired.html');
console.log('🎨 Design system approach with time-aware functionality');
console.log('📱 Responsive design with professional styling');
