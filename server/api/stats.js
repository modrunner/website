export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig();

	return await fetch(`${config.apiUrl}/stats`, {
		headers: {
			'x-api-key': config.apiKey,
		},
	})
		.then(async (res) => await res.json())
		.catch(() => {});
});
