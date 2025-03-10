/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{ts,tsx}',
    './stories/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'sans-serif'],
      },
      fontSize: {
        // Display sizes
        'display-2xl': ['4.5rem', { lineHeight: '5.625rem', letterSpacing: '-0.02em' }], // 72px/90px
        'display-xl': ['3.75rem', { lineHeight: '4.5rem', letterSpacing: '-0.02em' }], // 60px/72px
        'display-lg': ['3rem', { lineHeight: '3.75rem', letterSpacing: '-0.02em' }], // 48px/60px
        'display-md': ['2.25rem', { lineHeight: '2.75rem', letterSpacing: '-0.02em' }], // 36px/44px
        'display-sm': ['1.875rem', { lineHeight: '2.375rem' }], // 30px/38px
        'display-xs': ['1.5rem', { lineHeight: '2rem' }], // 24px/32px
        
        // Text sizes
        'text-xl': ['1.25rem', { lineHeight: '1.875rem' }], // 20px/30px
        'text-lg': ['1.125rem', { lineHeight: '1.75rem' }], // 18px/28px
        'text-md': ['1rem', { lineHeight: '1.5rem' }], // 16px/24px
        'text-sm': ['0.875rem', { lineHeight: '1.25rem' }], // 14px/20px
        'text-xs': ['0.75rem', { lineHeight: '1.125rem' }], // 12px/18px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      colors: {
        // Neutral Colors
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D2D6DB',
          400: '#9DA4AE',
          500: '#6C737F',
          600: '#4D5761',
          700: '#384250',
          800: '#1F2A37',
          900: '#111927',
          950: '#0D121C',
        },
        // Primary Colors (SA - Saudi Arabia Green)
        sa: {
          25: '#F7FDF9',
          50: '#F3FCF6',
          100: '#DFF6E7',
          200: '#B8EACB',
          300: '#88D8AD',
          400: '#54C08A',
          500: '#25935F',
          600: '#1B8354',
          700: '#166A45',
          800: '#14573A',
          900: '#104631',
          950: '#092A1E',
        },
        // Secondary Colors
        gold: {
          25: '#FFFEF7',
          50: '#FFFEF2',
          100: '#FFFCE6',
          200: '#FCF3BD',
          300: '#FAE996',
          400: '#F7D54D',
          500: '#F5BD02',
          600: '#DBA102',
          700: '#B87B02',
          800: '#945C01',
          900: '#6E3C00',
          950: '#472400',
        },
        lavender: {
          25: '#FEFCFF',
          50: '#F9F5FA',
          100: '#F2E9F5',
          200: '#E1CCE8',
          300: '#CCADD9',
          400: '#A57BBA',
          500: '#80519F',
          600: '#6D428F',
          700: '#532D75',
          800: '#3D1D5E',
          900: '#281047',
          950: '#16072E',
        },
        // Semantic Colors
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
          950: '#55160C',
        },
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
          950: '#4E1D09',
        },
        info: {
          25: '#F5FAFF',
          50: '#EFF8FF',
          100: '#D1E9FF',
          200: '#B2DDFF',
          300: '#84CAFF',
          400: '#53B1FD',
          500: '#2E90FA',
          600: '#1570EF',
          700: '#175CD3',
          800: '#1849A9',
          900: '#194185',
          950: '#102A56',
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#DCFAE6',
          200: '#ABEFC6',
          300: '#75E0A7',
          400: '#47CD89',
          500: '#17B26A',
          600: '#079455',
          700: '#067647',
          800: '#085D3A',
          900: '#074D31',
          950: '#053321',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      gridTemplateColumns: {
        // Grid system
        '2': 'repeat(2, minmax(0, 1fr))',
        '3': 'repeat(3, minmax(0, 1fr))',
        '5': 'repeat(5, minmax(0, 1fr))',
        '6': 'repeat(6, minmax(0, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      gridColumn: {
        'span-2': 'span 2 / span 2',
        'span-3': 'span 3 / span 3',
        'span-5': 'span 5 / span 5',
        'span-6': 'span 6 / span 6',
        'span-12': 'span 12 / span 12',

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};