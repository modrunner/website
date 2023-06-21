<template></template>

<script>
definePageMeta({
	layout: false,
});

export default {
	setup() {
		const appConfig = useAppConfig();
		return { appConfig };
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
			await navigateTo(this.appConfig.meta.authUrl, { external: true });
		}
	},
};
</script>
