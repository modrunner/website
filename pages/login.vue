<template></template>

<script setup>
definePageMeta({ layout: false })
useHead({ title: 'Log In' })

const auth = await useAuth()

// User is already logged in
if (auth.value.user.id) await navigateTo('/dashboard', { external: true })

const route = useRoute()

// We've recieved an auth code from Discord
if (route.query.code) {
	const { data, error } = await useFetch('/api/auth', { query: { code: route.query.code } })

	// TODO maybe an error page or something
	if (error.value) {
		await navigateTo('/')
	}

	const authCookie = useCookie('auth', {
		maxAge: data.value.expires_in,
		secure: true,
		sameSite: 'strict',
	})

	authCookie.value = data.value.access_token
} else {
	// We need to redirect to Discord
	await navigateTo(getAuthUrl(), { external: true })
}

onBeforeMount(async () => {
	await navigateTo('/dashboard', { external: true })
})
</script>
