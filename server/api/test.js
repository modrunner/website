export default defineEventHandler(async (event) => {
	console.log({
		apiKey: useRuntimeConfig().apiKey,
		apiUrl: useRuntimeConfig().apiUrl,
		discordClientSecret: useRuntimeConfig().discordClientSecret,
		NUXT_API_URL: process.env.NUXT_API_URL,
		public: {
			discordClientId: useRuntimeConfig().public.discordClientId,
			NUXT_PUBLIC_DISCORD_CLIENT_ID: process.env.NUXT_PUBLIC_DISCORD_CLIENT_ID,
		},
	});
});
