export default defineEventHandler(async (event) => {
	return await fetch(`${useRuntimeConfig().apiUrl}/stats`, {
		headers: {
			'x-api-key': useRuntimeConfig().apiKey,
		},
	})
		.then((res) => res.json())
		.catch((error) =>
			logger.error(
				`Error at route /server/routes/stats.js - ${error.message}`,
				{
					error: error,
					url: `${useRuntimeConfig().apiUrl}/stats`,
					headers: {
						'x-api-key': useRuntimeConfig().apiKey,
					},
				}
			)
		);
});
