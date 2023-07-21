export default defineEventHandler(async (event) => {
	const runtimeConfig = useRuntimeConfig();
	const query = getQuery(event);

	return await fetch(`http://localhost:3001/guilds/${query.guildId}`, {
		headers: {
			'x-api-key': runtimeConfig.xApiKey,
		},
	})
		.then((res) => res.json())
		.catch((error) => console.log('/server/routes/guild.js -', error));
});