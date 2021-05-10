const colors = require('tailwindcss/colors');

module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			titillium: ['"Titillium Web"'],
		},
		extend: {
			zIndex: {
				'-1': '-1',
				'-10': '-10',
			},
			gridTemplateRows: {
				layout: '200px minmax(0, 1fr)',
			},
			colors: {
				violet: colors.violet,
			},
			boxShadow: {
				upper: '0 -10px 20px -10px rgba(0, 0, 0, 0.25)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [require('tailwind-scrollbar-hide')],
};
