export default defineEventHandler(async (event) => {
	// return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
	// 	headers: {
	// 		'x-api-key': useRuntimeConfig().apiKey,
	// 	},
	// })
	// 	.then((res) => res.json())
	// 	.catch((error) => console.log('/server/api/stats.js -', error));

	const response = await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	}).catch((error) => {
		throw createError({
			statusMessage: 'Internal Server Error',
			message: 'Request to the backend failed.',
		});
	});

	if (response.status !== 200) {
		throw createError({
			statusCode: response.status,
			statusMessage: response.statusText,
			message:
				'Request to the backend succeeded but returned a non-2xx status.',
		});
	}

	return await response.json();
});
