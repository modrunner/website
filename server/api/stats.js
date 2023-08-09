export default defineEventHandler(async (event) => {
	return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	})
		.then(async (res) => await res.json())
		.catch((error) => console.log('/server/api/stats.js -', error));
});
