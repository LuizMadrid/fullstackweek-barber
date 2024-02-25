import type { Config } from 'tailwindcss';

const config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx,mdx}',
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
		},
		extend: {
			colors: {
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
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				'animate-arrow': {
					'0%': { opacity: '0', transform: 'rotate(45deg) translate(-20px, -20px)' },
					'50%': { opacity: '1' },
					'100%': { opacity: '0', transform: 'rotate(45deg) translate(20px, 20px)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'animate-arrow': 'animate-arrow 2.5s infinite',
			},
			screens: {
				'minimal': '320px',
				'2minimal': '375px',
				
				'xs': '480px',
				'2xs': '560px',

				'sm': '640px',
				'2sm': '720px',

				'md': '830px',
				'2md': '960px',
				
				'lg': '1024px',
				'2lg': '1280px',

				'xl': '1440px',
				'2xl': '1536px',
				'3xl': '1920px',				
			},
			backgroundImage: {
				'background-home-desktop': 'url(/background-fswbarber.jpeg)',
			},
			transitionDelay: {
				'-delay1': '-250ms',
				'-delay2': '-450ms',
			}
		},
	},
	plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;