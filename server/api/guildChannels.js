export default defineEventHandler(async (event) => {
	return await fetch(
		`${useRuntimeConfig().apiUrl}/guilds/${getQuery(event).guildId}/channels`,
		{
			headers: {
				'x-api-key': useRuntimeConfig().apiKey,
			},
		}
	)
		.then(async (res) => await res.json())
		.catch((error) => console.log(error));
});
