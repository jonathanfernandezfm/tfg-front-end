const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

module.exports = withPWA({
	pwa: {
		dest: 'public',
		register: true,
		skipWaiting: true,
		runtimeCaching,
		disable: process.env.NODE_ENV === 'development',
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
		WS_URL: process.env.WS_URL,
		IMAGES_URL_500: process.env.IMAGES_URL_500,
		IMAGES_URL_ORIGINAL: process.env.IMAGES_URL_ORIGINAL,
	},
});
