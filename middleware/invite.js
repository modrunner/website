export default defineNuxtRouteMiddleware((to, from) => {
	return navigateTo(
		`https://discord.com/api/oauth2/authorize?client_id=${
			useRuntimeConfig().public.discordClientId
		}&permissions=2048&redirect_uri=${encodeURI(
			`${useRuntimeConfig().public.baseUrl}/login`
		)}&scope=bot%20applications.commands`,
		{ external: true }
	);
});
