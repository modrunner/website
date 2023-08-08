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

		const data = await response.json();

		console.log('Requested stats: ', data);

		return data;
	} catch (error) {
		console.log('/server/api/stats.js -', error);
	}
});
