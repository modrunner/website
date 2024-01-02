export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const body = await readBody(event)

	const res = await $fetch.raw(`${config.apiUrl}/projects/untrack`, {
		method: 'DELETE',
		headers: {
			'x-api-key': config.apiKey,
		},
		body,
		ignoreResponseError: true,
	})

	setResponseStatus(event, res.status)
	event.node.res.end()
})
