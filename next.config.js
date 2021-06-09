const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
	},
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: true,
			},
		];
	},
	env: {
		API_URL: process.env.API_URL,
		IMAGES_URL_500: process.env.IMAGES_URL_500,
		IMAGES_URL_ORIGINAL: process.env.IMAGES_URL_ORIGINAL,
	},
});
