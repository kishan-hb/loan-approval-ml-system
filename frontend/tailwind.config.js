module.exports = {
  // FIXED: Added content array so Tailwind knows to scan your React files
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fcf8fa',
        primary: '#0F172A', // Deep Navy
        secondary: '#64748B', // Slate
        'cyan-accent': '#38BDF8', // Electric Cyan
        success: '#10b981',
        pending: '#f59e0b',
        error: '#ba1a1a',
        'border-slate': '#eae7e9'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        headings: ['Plus Jakarta Sans', 'sans-serif']
      }
    }
  },
  variants: {},
  plugins: []
}
