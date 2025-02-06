import type { Config } from "tailwindcss";

const {
	default: flattenColorPalette,
  } = require("tailwindcss/lib/util/flattenColorPalette");

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
	
			  screens: {
				xs: "480px",
				sm: "576px",
				md: "768px",
				lg: "992px",
				xl: "1200px",
				xxl: "1400px", 
				"3xl": "1600px", 
			  },
			  container: {
				center: true,
				padding: {
				  DEFAULT: "15px", 
				},
				screens: {
					xs: "100%", 
					sm: "540px", 
					md: "740px", 
					lg: "960px", 
					xl: "1140px", 
					xxl: "1360px", 
					"3xl": "1550px", 
				},
			  },		  
  		colors: {
			primary: '#FE6601', 
			secondary: '#1E1E1E', 
  			/* primary: {
				primary: '#FE6601',   
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			}, */
  			'custom-gray': '#F2F2F2',
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
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
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
  		fontSize: {
  			xxl: 'clamp(3rem, 5vw, 5rem)',
  			xl: 'clamp(2.5rem, 4vw, 4rem)',
  			lg: 'clamp(1.75rem, 2.5vw, 2rem)',
  			md: 'clamp(1.125rem, 2vw, 1.5rem)',
  			sm: 'clamp(1rem, 1.5vw, 1.125rem)'
  		},
  		borderRadius: {
  			custom: '16px',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"),addVariablesForColors],
} satisfies Config;


function addVariablesForColors({ addBase, theme }: any) {
	let allColors = flattenColorPalette(theme("colors"));
	let newVars = Object.fromEntries(
	  Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
	);
   
	addBase({
	  ":root": newVars,
	});
  }