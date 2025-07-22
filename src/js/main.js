const { useState, useEffect, useMemo, useCallback, useRef, createContext, useContext } = React;

// Time Management System
const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    return 'evening';
};

const useTimeOfDay = () => {
    const [timeOfDay, setTimeOfDay] = useState(() => getTimeOfDay());
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeOfDay(getTimeOfDay());
        }, 60000);
        return () => clearInterval(interval);
    }, []);
    return timeOfDay;
};

const TimeAwareText = ({ morning, afternoon, evening, className }) => {
    const timeOfDay = useTimeOfDay();
    const content = { morning, afternoon, evening }[timeOfDay];
    return React.createElement('span', { className }, content);
};

// Dark Mode System
const DarkModeContext = createContext();
const useDarkMode = () => useContext(DarkModeContext);

const DarkModeProvider = ({ children }) => {
    const [isDark, setIsDark] = useState(false);
    const [isAutoMode, setIsAutoMode] = useState(true);
    const timeOfDay = useTimeOfDay();

    useEffect(() => {
        if (isAutoMode) {
            setIsDark(timeOfDay === 'evening');
        }
    }, [timeOfDay, isAutoMode]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
    }, [isDark]);

    const toggleDarkMode = useCallback(() => {
        if (isAutoMode) {
            setIsAutoMode(false);
            setIsDark(!isDark);
        } else {
            setIsDark(!isDark);
        }
    }, [isAutoMode, isDark]);

    return React.createElement(DarkModeContext.Provider, {
        value: { isDark, toggleDarkMode, isAutoMode, setAutoMode: setIsAutoMode }
    }, children);
};

// Device Capabilities
const useDeviceCapabilities = () => {
    return useMemo(() => ({
        isMobile: window.innerWidth < 768,
        isTouch: 'ontouchstart' in window,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }), []);
};

const usePerformanceMonitor = () => {
    const [fps, setFps] = useState(60);
    
    useEffect(() => {
        let frames = 0;
        let lastTime = performance.now();
        
        const measure = () => {
            frames++;
            const currentTime = performance.now();
            if (currentTime - lastTime >= 1000) {
                setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
                frames = 0;
                lastTime = currentTime;
            }
            requestAnimationFrame(measure);
        };
        
        measure();
    }, []);
    
    return { fps };
};

const MobileAnimation = ({ children, animation = 'fadeUp', delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef();
    const capabilities = useDeviceCapabilities();

    useEffect(() => {
        if (capabilities.prefersReducedMotion) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), Math.min(delay, 200));
                }
            },
            { threshold: 0.05, rootMargin: '100px' }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [delay, capabilities.prefersReducedMotion]);

    const animationClass = {
        fadeUp: 'animate-fadeUp',
        fadeIn: 'animate-fadeIn',
        slideLeft: 'animate-slideLeft',
        slideRight: 'animate-slideRight'
    }[animation];

    return React.createElement('div', {
        ref,
        className: `transition-opacity duration-300 will-change-transform gpu-accelerated ${isVisible ? `opacity-100 ${animationClass}` : 'opacity-0'}`
    }, children);
};

// Navigation System
const useBulletproofButtonNavigation = () => {
    const navigateToSection = useCallback(async (sectionId, options = {}) => {
        const { offset = 80 } = options;
        const target = document.getElementById(sectionId);
        if (target) {
            const offsetTop = target.offsetTop - offset;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }, []);

    return { navigateToSection };
};

// Main App component
function App() {
    const { isDark, toggleDarkMode } = useDarkMode();
    const timeOfDay = useTimeOfDay();
    const capabilities = useDeviceCapabilities();
    const performance = usePerformanceMonitor();
    const { navigateToSection } = useBulletproofButtonNavigation();

    // Scroll progress tracking
    useEffect(() => {
        const updateScrollProgress = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.pageYOffset;
            const progress = (scrollTop / scrollHeight) * 100;
            const progressElement = document.getElementById('scrollProgress');
            if (progressElement) {
                progressElement.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
            }
        };

        window.addEventListener('scroll', updateScrollProgress, { passive: true });
        return () => window.removeEventListener('scroll', updateScrollProgress);
    }, []);

    const handleExploreWork = useCallback(async () => {
        await navigateToSection('case-studies', { offset: 80 });
    }, [navigateToSection]);

    return React.createElement('div', { 
        className: 'min-h-screen bg-background text-foreground transition-colors duration-300' 
    }, [
        // Header
        React.createElement('header', { 
            key: 'header',
            className: 'sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60' 
        },
            React.createElement('div', { 
                className: 'container flex h-14 items-center px-4 sm:px-6' 
            }, [
                React.createElement('div', { 
                    key: 'brand', 
                    className: 'flex items-center space-x-2' 
                }, [
                    React.createElement('span', { 
                        key: 'emoji', 
                        className: 'text-lg' 
                    }, '🎛️'),
                    React.createElement('span', { 
                        key: 'name', 
                        className: 'font-semibold text-sm sm:text-base' 
                    }, 'Ric Rios'),
                    React.createElement('span', { 
                        key: 'dos', 
                        className: 'hidden sm:inline text-xs text-muted-foreground' 
                    }, 'DOS')
                ]),
                React.createElement('div', { 
                    key: 'controls', 
                    className: 'ml-auto flex items-center space-x-2 sm:space-x-4' 
                }, [
                    React.createElement('div', { 
                        key: 'time', 
                        className: 'text-xs sm:text-sm text-muted-foreground capitalize' 
                    }, timeOfDay),
                    React.createElement('button', {
                        key: 'theme',
                        onClick: toggleDarkMode,
                        className: 'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-3'
                    }, isDark ? '☀️' : '🌙')
                ])
            ])
        ),

        // Hero Section
        React.createElement('section', { 
            key: 'hero',
            className: 'container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24 text-center' 
        },
            React.createElement('div', { className: 'max-w-5xl mx-auto' }, [
                React.createElement(MobileAnimation, { key: 'title', animation: 'fadeUp' },
                    React.createElement('div', { 
                        className: 'text-3xl sm:text-4xl mb-3 sm:mb-4 text-muted-foreground' 
                    }, '🎛️')
                ),
                React.createElement(MobileAnimation, { key: 'heading', animation: 'fadeUp', delay: 100 },
                    React.createElement('h1', { 
                        className: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6 sm:mb-8 tracking-tight text-foreground leading-tight' 
                    },
                        React.createElement(TimeAwareText, {
                            morning: "Strategic Design Leadership for Tomorrow's Builders",
                            afternoon: "Systematic Innovation at the Intersection of Mastery",
                            evening: "Three Decades of Wisdom Applied to Future-State Design"
                        })
                    )
                ),
                React.createElement(MobileAnimation, { key: 'subtitle', animation: 'fadeUp', delay: 200 },
                    React.createElement('p', { 
                        className: 'text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed' 
                    },
                        React.createElement(TimeAwareText, {
                            morning: "When ambitious founders and executives need systematic design leadership that bridges deep craft mastery with emerging technology—delivering strategic innovation that defines tomorrow's standards.",
                            afternoon: "Thirty years of design leadership distilled into systematic methodologies. Every major design book read and applied. Creative excellence guided by disciplined precision that transforms business outcomes.",
                            evening: "Where timeless design principles meet forward-looking innovation. Three decades of earned wisdom applied to emerging technologies, creating lasting impact through systematic excellence."
                        })
                    )
                ),
                React.createElement(MobileAnimation, { key: 'button', animation: 'fadeUp', delay: 400 },
                    React.createElement('div', { className: 'flex justify-center' },
                        React.createElement('button', {
                            onClick: handleExploreWork,
                            className: 'px-8 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 active:scale-95 touch-manipulation text-base sm:text-lg'
                        },
                            React.createElement(TimeAwareText, {
                                morning: "Begin with systematic mastery",
                                afternoon: "Discover strategic innovation",
                                evening: "Access proven methodologies"
                            })
                        )
                    )
                )
            ])
        ),

        // Main Content
        React.createElement('main', { 
            key: 'main',
            className: 'container mx-auto pb-16 sm:pb-20 px-4 sm:px-6' 
        },
            React.createElement('section', { 
                id: 'case-studies',
                className: 'scroll-mt-20 sm:scroll-mt-24'
            }, [
                React.createElement(MobileAnimation, { key: 'header', animation: 'fadeIn' },
                    React.createElement('div', { className: 'mb-8 sm:mb-12 text-center' }, [
                        React.createElement('h2', { 
                            key: 'title', 
                            className: 'text-2xl sm:text-3xl mb-4 sm:mb-6 text-foreground' 
                        },
                            React.createElement(TimeAwareText, {
                                morning: 'Morning Portfolio: Systems in Action',
                                afternoon: 'Strategic Applications: Proven at Scale',
                                evening: 'Evening Archive: Three Decades of Impact'
                            })
                        ),
                        React.createElement('p', { 
                            key: 'intro', 
                            className: 'text-sm sm:text-base text-muted-foreground leading-relaxed max-w-4xl mx-auto' 
                        },
                            'Three decades of systematic design leadership applied across diverse domains—from luxury travel to wealth management to community building.'
                        )
                    ])
                ),
                
                // Featured Case Study
                React.createElement(MobileAnimation, { key: 'featured', animation: 'fadeUp', delay: 50 },
                    React.createElement('div', { 
                        className: 'rounded-lg border bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 text-card-foreground shadow-sm mb-8 p-6 sm:p-8' 
                    }, [
                        React.createElement('div', { 
                            key: 'header', 
                            className: 'flex items-center gap-3 mb-6' 
                        }, [
                            React.createElement('span', { 
                                key: 'icon', 
                                className: 'text-2xl sm:text-3xl' 
                            }, '🎯'),
                            React.createElement('div', { key: 'text' }, [
                                React.createElement('h3', { 
                                    key: 'title', 
                                    className: 'text-xl sm:text-2xl text-foreground' 
                                }, 'Chase Travel Transformation'),
                                React.createElement('p', { 
                                    key: 'sub', 
                                    className: 'text-sm sm:text-base text-muted-foreground' 
                                }, 'AI-Enhanced Luxury Travel Experience')
                            ])
                        ]),
                        React.createElement('p', { 
                            key: 'overview', 
                            className: 'text-base sm:text-lg text-foreground mb-4 leading-relaxed' 
                        },
                            'Led strategic redesign of Chase\'s travel booking experience, unifying desktop and mobile channels for a seamless, AI-enhanced journey that thinks like a curator and feels like a conversation.'
                        ),
                        React.createElement('div', { 
                            key: 'metrics', 
                            className: 'grid grid-cols-2 gap-4' 
                        }, [
                            React.createElement('div', { 
                                key: 'metric1', 
                                className: 'bg-background/50 rounded-lg p-3 border border-border' 
                            }, [
                                React.createElement('span', { 
                                    key: 'value', 
                                    className: 'text-lg font-semibold text-foreground' 
                                }, '25%'),
                                React.createElement('span', { 
                                    key: 'label', 
                                    className: 'text-sm text-muted-foreground block' 
                                }, 'lift in booking conversion')
                            ]),
                            React.createElement('div', { 
                                key: 'metric2', 
                                className: 'bg-background/50 rounded-lg p-3 border border-border' 
                            }, [
                                React.createElement('span', { 
                                    key: 'value', 
                                    className: 'text-lg font-semibold text-foreground' 
                                }, '40%'),
                                React.createElement('span', { 
                                    key: 'label', 
                                    className: 'text-sm text-muted-foreground block' 
                                }, 'increase in premium engagement')
                            ])
                        ])
                    ])
                )
            ])
        ),

        // Footer
        React.createElement('footer', { 
            key: 'footer',
            className: 'border-t bg-muted/50 py-12' 
        },
            React.createElement('div', { 
                className: 'container mx-auto px-4 sm:px-6 text-center' 
            },
                React.createElement('p', { 
                    className: 'text-xs text-muted-foreground' 
                }, 
                    '© 2025 Ric Rios. Authentically mine, never generic.'
                )
            )
        ),

        // Development Performance Indicator
        typeof process !== 'undefined' && process.env && process.env.NODE_ENV === "development" && capabilities.isMobile && React.createElement('div', { 
            key: 'dev',
            className: 'fixed bottom-4 left-4 bg-primary/90 text-primary-foreground text-xs p-2 rounded z-50 font-mono' 
        },
            `TechOS FPS: ${performance.fps}`
        )
    ]);
}

// Main App wrapper with providers
function AppWithProviders() {
    return React.createElement(DarkModeProvider, {},
        React.createElement(App, {})
    );
}

// Initialize the app
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(React.createElement(AppWithProviders));