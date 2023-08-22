export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()

	return await $fetch(`${config.apiUrl}/stats`, {
		headers: {
			'x-api-key': config.apiKey,
		},
	}).catch((error) => console.error('Error while fetching bot statistics from the backend:', error.data))
})
