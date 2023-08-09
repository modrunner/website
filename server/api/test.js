export default defineEventHandler(async (event) => {
	return useRuntimeConfig().public.discordClientId;
});
