<template>
	<p>{{ auth.user }}</p>
</template>

<script setup>
definePageMeta({ layout: false })
useHead({ title: 'Log In' })

const auth = await useAuth()

// User is already logged in
if (auth.value.user.id) await navigateTo('/')

const config = useRuntimeConfig()
const route = useRoute()

// We've recieved an auth code from Discord
if (route.query.code) {
	const { data, error } = await useFetch('https://discord.com/api/v10/oauth2/token', {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			client_id: config.public.discordClientId,
			client_secret: config.discordClientSecret,
			grant_type: 'authorization_code',
			code: route.query.code,
			redirect_uri: `${config.public.baseUrl}/login`,
		}),
	})

	// TODO maybe an error page or something
	if (error.value) await navigateTo('/')

	const authCookie = useCookie('auth', {
		maxAge: data.value.expires_in,
		secure: true,
		sameSite: 'strict',
	})

	authCookie.value = {
		accessToken: data.value.access_token,
		tokenType: data.value.token_type,
	}
} else {
	// We need to redirect to Discord
	await navigateTo(getAuthUrl(), { external: true })
}

await navigateTo('/')
</script>
