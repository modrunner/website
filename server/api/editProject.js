export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	return await $fetch(`${config.apiUrl}/projects/edit`, {
		method: 'PATCH',
		headers: {
			'x-api-key': config.apiKey,
		},
		body,
	}).catch((error) => console.error('Error while sending an edit project request to the backend:', error))
})
