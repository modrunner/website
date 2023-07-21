export default defineEventHandler(async (event) => {
	return await fetch('http://localhost:3001/stats', {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log('/server/routes/stats.js -', error));
});
