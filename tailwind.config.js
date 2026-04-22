/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: "#0B0B10",
        surface: "#13131A",
        secondary: "#9A9AA8",
        muted: "#6F6F7D",
        tertiary: "#15151C",
        "black-100": "#0E0E14",
        "black-200": "#09090E",
        "white-100": "#E8E8EE",
        accent: "#7F77DD",
        "accent-hover": "#9B92EE",
      },
      letterSpacing: {
        tightest: "-0.04em",
        display: "-0.025em",
      },
      boxShadow: {
        card: "0px 1px 2px rgba(0,0,0,0.4)",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
