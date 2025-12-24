/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#E6F7F8',
  				'100': '#CCEFF1',
  				'200': '#99DFE3',
  				'300': '#66CFD5',
  				'400': '#33BFC7',
  				'500': '#006D77',
  				'600': '#005A62',
  				'700': '#00474D',
  				'800': '#003438',
  				'900': '#002123',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#F0F9F8',
  				'100': '#E1F3F1',
  				'200': '#C3E7E3',
  				'300': '#A5DBD5',
  				'400': '#87CFC7',
  				'500': '#83C5BE',
  				'600': '#6BA09A',
  				'700': '#537B76',
  				'800': '#3B5652',
  				'900': '#23312E',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#FFF8E6',
  				'100': '#FFF1CC',
  				'200': '#FFE399',
  				'300': '#FFD566',
  				'400': '#FFC733',
  				'500': '#FFB703',
  				'600': '#E6A503',
  				'700': '#B38402',
  				'800': '#806302',
  				'900': '#4D4201',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				white: '#FFFFFF',
  				light: {
  					'100': '#F5F5F5',
  					'200': '#E0E0E0'
  				},
  				dark: {
  					'100': '#4F4F4F',
  					'200': '#333333'
  				}
  			},
  			status: {
  				success: '#2D6A4F',
  				warning: '#F08A5D',
  				error: '#EF233C'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			heading: [
  				'Poppins',
  				'Inter',
  				'Montserrat',
  				'sans-serif'
  			],
  			body: [
  				'Roboto',
  				'Lato',
  				'Inter',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			h1: [
  				'2.5rem',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			h2: [
  				'2rem',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			],
  			h3: [
  				'1.5rem',
  				{
  					lineHeight: '1.4',
  					fontWeight: '600'
  				}
  			],
  			body: [
  				'1rem',
  				{
  					lineHeight: '1.6',
  					fontWeight: '400'
  				}
  			],
  			small: [
  				'0.875rem',
  				{
  					lineHeight: '1.5',
  					fontWeight: '400'
  				}
  			]
  		},
  		spacing: {
  			'18': '4.5rem',
  			'88': '22rem',
  			'128': '32rem'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.3s ease-out',
  			'bounce-gentle': 'bounceGentle 2s infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(10px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			bounceGentle: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-5px)'
  				}
  			}
  		},
  		boxShadow: {
  			soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
  			medium: '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			strong: '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 2px 10px -2px rgba(0, 0, 0, 0.05)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
