export default defineEventHandler(async (event) => {
	// return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
	// 	headers: {
	// 		'x-api-key': useRuntimeConfig().apiKey,
	// 	},
	// })
	// 	.then((res) => res.json())
	// 	.catch((error) => console.log('/server/api/stats.js -', error));

	try {
		const response = await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
			headers: {
				'x-api-key': useRuntimeConfig().apiKey,
			},
		});

		console.log('Requested statistics from the backend:');
		console.log(`- Status: ${response.status} ${response.statusText}`);
		console.log(`- URL: ${response.url}`);

		const data = await response.json();

		return data;
	} catch (error) {
		console.log('/server/api/stats.js -', error);
	}
});
