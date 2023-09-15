export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	return await $fetch(`${config.apiUrl}/projects/untrack`, {
		method: 'DELETE',
		headers: {
			'x-api-key': config.apiKey,
		},
		body,
	}).catch((error) => console.error('Error while sending an untrack request to the backend:', error))
})
