import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      tablet: '992px',
      desktop: '1025px',
      lg: '1440px',
      xl: '1920px',
    },
    colors: {
      black: {
        100: '#000',
        300: 'rgba(8, 9, 12, 0.30)',
        500: 'rgba(8, 9, 12, 0.50)',
        700: 'rgba(8, 9, 12, 0.70)',
        800: 'rgba(8, 9, 12, 0.80)',
        900: '#08090C',
      },
      white: {
        0: '#FFFFFF',
        10: 'rgba(255, 255, 255, 0.1)',
        40: 'rgba(255, 255, 255, 0.40)',
        20: 'rgba(255, 255, 255, 0.20)',
        25: 'rgba(255, 255, 255, 0.02)',
        50: '#FFFFFF0D',
        100: '#FFFFFF1A',
        200: '#FFFFFF33',
        150: '#FFFFFF26',
        300: '#FFFFFF4D',
        400: 'rgba(255, 255, 255, 0.40)',
        500: '#FFFFFF80',
        600: '#FFFFFF99',
        700: '#FFFFFFB2',
        800: '#FFFFFFCC',
        900: '#FFFFFFE5',
        1000: '#FFFFFF',
      },
      transparent: 'transparent',
      primary: {
        25: '#F7F8FD',
        200: '#BEC7F4',
        500: '#425EF0',
      },
      brand: {
        50: '#E6FEFE',
        100: '#CDFCFE',
        300: '#66FFE0',
        400: '#06F1F9',
        500: '#C6FE00',
        600: 'rgba(0, 204, 163, 0.90)',
        700: 'rgba(0, 204, 163, 0.60)',
        800: 'rgba(149, 191, 0, 0.30)',
        900: 'rgba(119, 152, 0, 0.10)',
        1000: '#012223',
      },
      neutral: {
        0: '#FFFFFF',
        25: '#FAFAFA',
        50: '#F2F3F3',
        100: '#E4E7E7',
        200: '#C9CECE',
        300: '#AFB6B6',
        400: '#9B9997',
        500: '#6D7878',
        600: '#495050',
        700: '#313636',
        900: '#06070E',
        800: '#181B1B',
        1000: '#0D0D0C',
        1100: '#080807', 
        'alpha-20': 'rgba(255, 255, 255, 0.02)',
        'alpha-50': 'rgba(255, 255, 255, 0.05)',
        'alpha-100': 'rgba(255, 255, 255, 0.10)',
        'alpha-150': 'rgba(255, 255, 255, 0.15)',
        'alpha-200': 'rgba(255, 255, 255, 0.02)',
        'alpha-300': 'rgba(255, 255, 255, 0.3)',
        'alpha-400': 'rgba(255, 255, 255, 0.40)',
        'alpha-500': 'rgba(255, 255, 255, 0.50)',
        'alpha-600': 'rgba(255, 255, 255, 0.06)',
        'alpha-700': 'rgba(255, 255, 255, 0.70)',
        'alpha-800': 'rgba(255, 255, 255, 0.80)',
        'alpha-900': 'rgba(255, 255, 255, 0.90)',
        'alpha-1000': 'rgba(255, 255, 255, 1)',

        'beta-200': 'rgba(0, 0, 0, 0.20)',
        'beta-100': 'rgba(0, 0, 0, 0.10)',
        'beta-400': 'rgba(0, 0, 0, 0.40)',
        'beta-500': 'rgba(6, 7, 14, 0.50)',
        'beta-800': 'rgba(6, 7, 14, 0.80)',
        'beta-900': '#06070E',

        'grey-0': '#FFFFFF',
        'grey-25': '#FAFAFA',
        'grey-50': '#F4F4F6',
        'grey-75': '#EEEEF1',
        'grey-100': '#E3E3E8',
        'grey-300': '#ABABBA',
        'grey-400': '#8F8FA3',
        'grey-500': '#73738C',
        'grey-700': '#454554',
        'grey-800': '#2E2E38',
        'grey-900': '#17171C',
      },
      overlay: {
        600: '#141518',
      },
      accent: {
        green: {
          50: '#EBF9F3',
          500: '#27D971',
          900: 'rgba(39, 217, 113, 0.10)',
        },
        blue: {
          50: '#EBF5FF',
          500: '#0288FD',
        },
        red: {
          50: '#FCE9E8',
          500: '#FF4D5F',
          600: 'rgba(204, 62, 76, 0.90)',
          700: 'rgb(161, 60, 69, 1)',
          900: 'rgba(255, 77, 95, 0.10)',
        },
        yellow: {
          50: '#FEF4E7',
          500: '#FCD34B',
          800: 'rgba(252, 211, 75, 0.30)',
          900: 'rgba(252, 211, 75, 0.10)',
        },
        purple: {
          50: '#F1E8FC',
          500: '#AA75F0',
        },
        grey: {
          50: '#F4F4F6',
          500: '#8F8FA3',
        },
      },
      blue: {
        50: '#EBF5FF',
        500: '#6BA6FF',
      },
      orange: {
        50: '#FDF2E8',
        500: '#F68B1E',
        700: 'rgba(246, 139, 30, 0.60)',
        900: 'rgba(246, 139, 30, 0.10)',
        1000: 'rgba(246, 139, 30, 1)',
      },
      red: {
        50: '#FEEDEC',
        100: '#FCD1CE',
        400: '#FF808C',
        500: '#FF4D5F',
        600: '#FF4D5FE5',
        700: 'rgba(204, 62, 76, 0.60)',
        800: 'rgba(204, 62, 76, 0.30)',
        900: '#FF4D5F1A',
      },
      purple: {
        50: '#F2EEFB',
        500: '#572FD0',
      },
      violet: {
        50: '#F2EEFB',
        500: '#572FD0',
      },
      green: {
        50: '#EFFBEF',
        100: '#D6F4D8',
        500: '#27D971',
        600: 'rgba(31, 174, 91, 0.90)',
        800: 'rgba(31, 174, 91, 0.30)',
        900: 'rgba(39, 217, 113, 0.10)',
        1000: 'rgba(39, 217, 113, 1)',
      },
      yellow: {
        50: '#FFF9EB',
        100: '#FFF1CC',
        500: '#F68B1E',
        700: 'rgba(246, 139, 30, 0.60)',
        800: '#FCD34B4D',
        900: '#FCD34B1A',
      },
      grey: {
        100: '#F0F2F5',
      },
    },
    extend: {
      fontFamily: {
        MonaSans: ['Mona-Sans', 'sans-serif'],
      },
      fontSize: {
        'font-size-12': '12px',
        'font-size-14': '14px',
        'font-size-16': '16px',
        'font-size-24': '24px',
        'heading-sm': ['16px', '24px'],
        'heading-lg': ['24px', '28.8px'],
        'body-2xs': ['8px', '14px'],
        'body-xs': ['10px', '16px'],
        'body-sm': ['12px', '18px'],
        'body-md': ['14px', '20px'],
        'action-sm': ['12px', '16px'],
        'action-md': ['14px', '18px'],
      },
      spacing: {
        '2px': '2px',
        '4px': '4px',
        '6px': '6px',
        '8px': '8px',
        '10px': '10px',
        '12px': '12px',
        '16px': '16px',
        '24px': '24px',
        '32px': '32px',
        '40px': '40px',
        section: '362px',
        'body-height': 'calc(100vh - 65px)',
      },
      borderRadius: {
        '4px': '4px',
        '8px': '8px',
      },
    },
  },
  plugins: [],
};
export default config;
