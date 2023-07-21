export default defineEventHandler(async (event) => {
	return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log('/server/routes/stats.js -', error));
});
