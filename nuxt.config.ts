export default defineNuxtConfig({
	app: {
		head: {
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
			],
			link: [{ rel: "icon", href: './favicon.ico' }],
			style: [],
			script: [],
			noscript: [],
		},
	},
});
