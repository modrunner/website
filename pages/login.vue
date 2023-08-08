<template></template>

<script>
export default defineNuxtComponent({
	setup() {
		definePageMeta({ layout: false });

		const runtimeConfig = useRuntimeConfig();

		return { runtimeConfig };
	},
	async beforeMount() {
		if (useCookie('access-token').value) {
			return navigateTo('/dashboard');
		}

		const params = new URLSearchParams(location.search);

		if (params.get('code') /* && params.get('state') */) {
			// get access token from Discord
			const response = await $fetch('/auth', {
				query: { code: params.get('code') },
			});

			useCookie('access-token', {
				maxAge: response['expires_in'],
				secure: true,
				sameSite: true,
			}).value = response['access_token'];

			await navigateTo('/dashboard');
		} else {
			await navigateTo(
				`https://discord.com/api/oauth2/authorize?client_id=${
					this.runtimeConfig.public.discordClientId
				}&redirect_uri=${`${encodeURIComponent(
					this.runtimeConfig.public.baseUrl
				)}/login`}&response_type=code&scope=identify`,
				{ external: true }
			);
		}
	},
});
</script>
