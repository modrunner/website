export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();
	const query = getQuery(event);

	return await fetch('https://discord.com/api/oauth2/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			client_id: runtimeConfig.clientId,
			client_secret: runtimeConfig.clientSecret,
			grant_type: 'authorization_code',
			code: query.code,
			redirect_uri: 'http://localhost:3000/login',
		}),
	})
		.then((res) => res.json())
		.catch((error) => console.error('/server/routes/auth.js -', error));
});
