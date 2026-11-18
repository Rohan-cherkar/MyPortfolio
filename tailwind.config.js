/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#0D0520',
          900: '#1A0633',
          850: '#2D0F5E',
          deep: '#4C1D95',
          royal: '#6D28D9',
          electric: '#7C3AED',
          vibrant: '#8B5CF6',
          soft: '#A78BFA',
          neon: '#A855F7',
          lavender: '#C4B5FD',
          light: '#DDD6FE',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, #2D0F5E 0%, #0D0520 50%, #1A0633 100%)',
        'purple-gradient': 'linear-gradient(135deg, #7C3AED 0%, #A855F7 50%, #6D28D9 100%)',
        'card-gradient': 'linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(168,85,247,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-reverse': 'float 7s ease-in-out infinite reverse',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'blob': 'blob 10s ease-in-out infinite',
        'blob2': 'blob 14s ease-in-out infinite',
        'blob3': 'blob 18s ease-in-out infinite',
        'draw': 'draw 1.5s ease-in-out forwards',
        'counter': 'counter 2s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(40px, -60px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 40px) scale(0.9)' },
        },
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(168,85,247,0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(168,85,247,0.8), 0 0 80px rgba(124,58,237,0.4)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(168,85,247,0.4)',
        'glow-lg': '0 0 40px rgba(168,85,247,0.6), 0 0 80px rgba(124,58,237,0.3)',
        'card': '0 4px 24px rgba(124,58,237,0.15), inset 0 1px 0 rgba(196,181,253,0.1)',
        'card-hover': '0 8px 40px rgba(168,85,247,0.3), 0 0 0 1px rgba(196,181,253,0.2)',
      },
    },
  },
  plugins: [],
}
