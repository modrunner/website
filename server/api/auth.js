export default defineEventHandler(async (event) => {
	return await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: useRuntimeConfig().public.discordClientId,
			client_secret: useRuntimeConfig().discordClientSecret,
			grant_type: 'authorization_code',
			code: getQuery(event).code,
			redirect_uri: `${useRuntimeConfig().public.baseUrl}/login`,
		}),
	})
		.then(async (res) => await res.json())
		.catch(() => {});
});
