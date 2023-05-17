export default defineAppConfig({
	links: {
		discord: 'https://discord.modrunner.net',
		email: 'mailto:contact@modrunner.net',
		github: 'https://github.com/modrunner',
		mastodon: 'https://floss.social/@modrunner',
		statusPage: 'https://status.modrunner.net/',
		twitter: 'https://twitter.com/modrunnerbot',
	},
	meta: {
		authUrl:
			'https://discord.com/api/oauth2/authorize?client_id=968164973467541574&redirect_uri=http%3A%2F%2Flocalhost%3A3000&response_type=code&scope=identify',
	},
});
