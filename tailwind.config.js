/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-container": "var(--color-primary-container)",
        "primary-fixed": "var(--color-primary-fixed)",
        "primary-fixed-dim": "var(--color-primary-fixed-dim)",
        "on-primary": "var(--color-on-primary)",
        "on-primary-container": "var(--color-on-primary-container)",
        "on-primary-fixed-variant": "var(--color-on-primary-fixed-variant)",
        "on-primary-fixed": "var(--color-on-primary-fixed)",

        secondary: "var(--color-secondary)",
        "secondary-container": "var(--color-secondary-container)",
        "secondary-fixed": "var(--color-secondary-fixed)",
        "secondary-fixed-dim": "var(--color-secondary-fixed-dim)",
        "on-secondary": "var(--color-on-secondary)",
        "on-secondary-container": "var(--color-on-secondary-container)",

        tertiary: "var(--color-tertiary)",
        "tertiary-container": "var(--color-tertiary-container)",
        "on-tertiary-container": "var(--color-on-tertiary-container)",
        "on-tertiary": "var(--color-on-tertiary)",
        "on-tertiary-fixed": "var(--color-on-tertiary-fixed)",
        "on-tertiary-fixed-variant": "var(--color-on-tertiary-fixed-variant)",

        background: "var(--color-background)",
        surface: "var(--color-surface)",
        "surface-dim": "var(--color-surface-dim)",
        "surface-bright": "var(--color-surface-bright)",
        "surface-container-lowest": "var(--color-surface-container-lowest)",
        "surface-container-low": "var(--color-surface-container-low)",
        "surface-container": "var(--color-surface-container)",
        "surface-container-high": "var(--color-surface-container-high)",
        "surface-container-highest": "var(--color-surface-container-highest)",
        "surface-variant": "var(--color-surface-variant)",

        "on-surface": "var(--color-on-surface)",
        "on-surface-variant": "var(--color-on-surface-variant)",
        "inverse-surface": "var(--color-inverse-surface)",
        "inverse-on-surface": "var(--color-inverse-on-surface)",
        
        outline: "var(--color-outline)",
        "outline-variant": "var(--color-outline-variant)",

        error: "var(--color-error)",
        "error-container": "var(--color-error-container)",
        "on-error": "var(--color-on-error)",
        "on-error-container": "var(--color-on-error-container)",

        // Stitch "Luminous Fiber" specific custom colors
        "glass-surface": "var(--color-glass-surface)",
        "glass-stroke": "var(--color-glass-stroke)",
        "yarn-white": "var(--color-yarn-white)",
        "fiber-gold": "var(--color-fiber-gold)",
        "analysis-blue": "var(--color-analysis-blue)",
        "forest-green": "#1b5e20",
        "soft-orange": "#fca130",
      },
      fontFamily: {
        headline: ["'Google Sans'", "sans-serif"],
        body: ["'Google Sans Text'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1.5rem", // 24px
        xxl: "32px",
      },
      spacing: {
        "gutter": "24px",
        "margin-desktop": "64px",
        "margin-mobile": "20px",
        "sidebar-width": "280px",
        "card-padding": "32px",
      }
    },
  },
  plugins: [],
}
