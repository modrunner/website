<template></template>

<script>
export default defineNuxtComponent({
	setup() {
		definePageMeta({
			layout: false,
		});

		const appConfig = useAppConfig();
		const runtimeConfig = useRuntimeConfig();
		return { runtimeConfig, appConfig };
	},
	async beforeMount() {
		const authCookie = useCookie('access-token');
		if (authCookie.value) {
			return navigateTo('/dashboard');
		}

		const params = new URLSearchParams(location.search);

		if (params.get('code') /* && params.get('state') */) {
			// get access token from Discord
			const response = await $fetch('/auth', {
				query: { code: params.get('code') },
			});
			authCookie.value = response['access_token'];
			await navigateTo('/dashboard');
		} else {
			await navigateTo(
				`https://discord.com/api/oauth2/authorize?client_id=${
					this.runtimeConfig.public.discordClientId
				}&redirect_uri=${encodeURI(
					`${this.runtimeConfig.public.baseUrl}/login`
				)}&response_type=code&scope=identify`,
				{ external: true }
			);
		}
	},
});
</script>
