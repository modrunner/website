export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)
	const query = getQuery(event)

	return await $fetch(`${config.apiUrl}/guilds/${query.guildId}`, {
		method: 'PATCH',
		headers: {
			'x-api-key': config.apiKey,
		},
		body,
	}).catch((error) => console.error('Error while sending an edit guild request to the backend:', error))
})
