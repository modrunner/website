export default defineEventHandler(async (event) => {
	console.log({
		apiKey: useRuntimeConfig().apiKey,
		apiUrl: useRuntimeConfig().apiUrl,
		discordClientSecret: useRuntimeConfig().discordClientSecret,
		public: {
			discordClientId: useRuntimeConfig().public.discordClientId,
		},
	});
});
