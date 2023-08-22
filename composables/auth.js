export const useAuth = async () => {
	const auth = useState('auth', () => ({
		accessToken: '',
		headers: {},
		user: {
			id: '',
			username: '',
			avatar: '',
		},
	}))

	const authCookie = useCookie('auth')
	if (authCookie.value) {
		auth.value.accessToken = authCookie.value.accessToken
		auth.value.headers = { authorization: `${authCookie.value.tokenType} ${authCookie.value.accessToken}` }

		if (!auth.value.user.id) {
			const { id, username, avatar } = await $fetch('https://discord.com/api/users/@me', { headers: auth.value.headers })

			auth.value.user = { id, username, avatar }
		}
	}

	return auth
}

export const getAuthUrl = () => {
	const config = useRuntimeConfig()
	return `https://discord.com/api/oauth2/authorize?client_id=${config.public.discordClientId}&redirect_uri=${`${encodeURIComponent(
		config.public.baseUrl
	)}/login`}&response_type=code&scope=identify%20guilds`
}
