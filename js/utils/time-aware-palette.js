/**
 * TimeAwarePalette
 * Adjusts surface/ accent tokens based on time-of-day + theme.
 */

(function () {
    const palette = {
        dark: {
            morning: {
                '--surface-primary': '#0d0f11',
                '--surface-secondary': '#14181d',
                '--surface-tertiary': '#1b2128',
                '--text-primary': '#f7f7f7',
                '--text-secondary': '#9ca3af',
                '--cyber-primary-accent': '#6df4a6',
                '--cyber-secondary-accent': '#ff8ba7',
                '--cyber-tertiary-accent': '#7dd3fc',
                '--time-aware-gradient': 'linear-gradient(135deg, #facc15, #f97316)'
            },
            afternoon: {
                '--surface-primary': '#0b0d12',
                '--surface-secondary': '#121623',
                '--surface-tertiary': '#1a2032',
                '--text-primary': '#f5f5f5',
                '--text-secondary': '#94a3b8',
                '--cyber-primary-accent': '#00ff9d',
                '--cyber-secondary-accent': '#00d4ff',
                '--cyber-tertiary-accent': '#ff6b35',
                '--time-aware-gradient': 'linear-gradient(135deg, #38bdf8, #6366f1)'
            },
            evening: {
                '--surface-primary': '#08070d',
                '--surface-secondary': '#120b1c',
                '--surface-tertiary': '#1c1230',
                '--text-primary': '#f1f5f9',
                '--text-secondary': '#a78bfa',
                '--cyber-primary-accent': '#a855f7',
                '--cyber-secondary-accent': '#ff3d81',
                '--cyber-tertiary-accent': '#7dd3fc',
                '--time-aware-gradient': 'linear-gradient(135deg, #8b5cf6, #ec4899)'
            },
            night: {
                '--surface-primary': '#050509',
                '--surface-secondary': '#0d0f17',
                '--surface-tertiary': '#16192b',
                '--text-primary': '#f8fafc',
                '--text-secondary': '#94a3b8',
                '--cyber-primary-accent': '#00ffb3',
                '--cyber-secondary-accent': '#4a90e2',
                '--cyber-tertiary-accent': '#ef4444',
                '--time-aware-gradient': 'linear-gradient(135deg, #0f172a, #312e81)'
            }
        },
        light: {
            morning: {
                '--surface-primary': '#fefcf5',
                '--surface-secondary': '#f8f4e7',
                '--surface-tertiary': '#f0eadc',
                '--text-primary': '#1f2937',
                '--text-secondary': '#4b5563',
                '--cyber-primary-accent': '#0f8b5f',
                '--cyber-secondary-accent': '#a21caf',
                '--cyber-tertiary-accent': '#1d4ed8',
                '--time-aware-gradient': 'linear-gradient(135deg, #fde68a, #f97316)'
            },
            afternoon: {
                '--surface-primary': '#ffffff',
                '--surface-secondary': '#f4f6fb',
                '--surface-tertiary': '#e9eef9',
                '--text-primary': '#0f172a',
                '--text-secondary': '#475569',
                '--cyber-primary-accent': '#047857',
                '--cyber-secondary-accent': '#2563eb',
                '--cyber-tertiary-accent': '#d97706',
                '--time-aware-gradient': 'linear-gradient(135deg, #bae6fd, #818cf8)'
            },
            evening: {
                '--surface-primary': '#fbf7fd',
                '--surface-secondary': '#f4e9fd',
                '--surface-tertiary': '#ecdcfa',
                '--text-primary': '#1e1b4b',
                '--text-secondary': '#6d28d9',
                '--cyber-primary-accent': '#7c3aed',
                '--cyber-secondary-accent': '#ec4899',
                '--cyber-tertiary-accent': '#0ea5e9',
                '--time-aware-gradient': 'linear-gradient(135deg, #c084fc, #f472b6)'
            },
            night: {
                '--surface-primary': '#fdf8ff',
                '--surface-secondary': '#f1ecf9',
                '--surface-tertiary': '#e6e1f3',
                '--text-primary': '#111827',
                '--text-secondary': '#4c1d95',
                '--cyber-primary-accent': '#065f46',
                '--cyber-secondary-accent': '#312e81',
                '--cyber-tertiary-accent': '#be185d',
                '--time-aware-gradient': 'linear-gradient(135deg, #c7d2fe, #6366f1)'
            }
        }
    };

    function getTimeBucket() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'morning';
        if (hour >= 12 && hour < 17) return 'afternoon';
        if (hour >= 17 && hour < 21) return 'evening';
        return 'night';
    }

    function applyPalette(forcedTheme) {
        const theme = forcedTheme || document.body.getAttribute('data-theme') || 'dark';
        const bucket = getTimeBucket();
        const tokens = palette[theme][bucket] || palette.dark.night;

        document.body.setAttribute('data-time-of-day', bucket);
        Object.entries(tokens).forEach(([token, value]) => {
            document.documentElement.style.setProperty(token, value);
        });

        const derivedTokens = {
            '--chip-border-color': tokens['--cyber-secondary-accent'] || tokens['--cyber-primary-accent'],
            '--wall-pulse-color': tokens['--cyber-secondary-accent'] || 'rgba(0, 255, 157, 0.35)',
            '--glitch-color-shift': (bucket === 'morning' ? 0.08 :
                bucket === 'afternoon' ? 0.16 :
                bucket === 'evening' ? 0.24 : 0.3)
        };

        Object.entries(derivedTokens).forEach(([token, value]) => {
            if (typeof value !== 'undefined') {
                document.documentElement.style.setProperty(token, value);
            }
        });

        window.timeAwarePalette.currentTokens = tokens;
        window.timeAwarePalette.currentTheme = theme;
        window.timeAwarePalette.currentBucket = bucket;
    }

    window.timeAwarePalette = {
        apply: applyPalette,
        getBucket: getTimeBucket,
        currentTokens: null,
        currentTheme: null,
        currentBucket: null
    };

    document.addEventListener('DOMContentLoaded', () => applyPalette());
})();
