export default defineNuxtConfig({
	app: {
		head: {
			title: 'Modrunner',
			meta: [
				{
					name: 'viewport',
					content: 'width=device-width, initial-scale=1',
				},
				{
					charset: 'utf-8',
				},
			],
			link: [
				{ rel: 'icon', href: './favicon.ico' },
				{ rel: 'stylesheet', href: './assets/styles/global.scss' },
			],
			style: [],
			script: [],
			noscript: [],
		},
	},
});
