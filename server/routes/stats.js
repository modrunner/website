export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();

	return await fetch('http://localhost:3001/stats', {
		headers: {
			'x-api-key': runtimeConfig.xApiKey,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log('/server/routes/stats.js -', error));
});
