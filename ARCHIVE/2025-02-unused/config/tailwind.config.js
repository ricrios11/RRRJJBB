/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./dist/**/*.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.4s ease-out',
        fadeUp: 'fadeUp 0.4s ease-out',
        slideLeft: 'slideLeft 0.4s ease-out',
        slideRight: 'slideRight 0.4s ease-out'
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' }
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translate3d(0, 10px, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        slideLeft: {
          from: { opacity: '0', transform: 'translate3d(20px, 0, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        },
        slideRight: {
          from: { opacity: '0', transform: 'translate3d(-20px, 0, 0)' },
          to: { opacity: '1', transform: 'translate3d(0, 0, 0)' }
        }
      }
    },
  },
  plugins: [],
}