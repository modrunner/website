export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: null,
		expiresAt: null,
		refreshToken: null,
		state: null,
		tokenType: null,
		meta: {
			clientId: useRuntimeConfig().clientId,
			clientSecret: useRuntimeConfig().clientSecret,
			redirectUri: useRuntimeConfig().redirectUri,
		},
	}),
	getters: {
		isAuthorized: (state) => {
			return state.accessToken &&
				state.expiresAt !== null &&
				state.expiresAt > Date.now()
				? true
				: false;
		},
		authHeader: (state) => {
			return `${state.tokenType} ${state.accessToken}`;
		},
	},
	actions: {
		async authorize(code, state) {
			// if (!state || this.state !== state) {
			// 	throw new Error(
			// 		`State parameter is missing or does not match! ${this.state}|${state}`
			// 	);
			// }

			const data = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					client_id: this.meta.clientId,
					client_secret: this.meta.clientSecret,
					grant_type: 'authorization_code',
					code,
					redirect_uri: 'http://localhost:3000',
				}),
			})
				.then((res) => res.json())
				.catch((error) => console.error(error));

			this.accessToken = data.access_token;
			this.expiresAt = Date.now() + data.expires_in * 1000;
			this.refreshToken = data.refresh_token;
			this.state = null;
			this.tokenType = data.token_type;
		},

		generateNonce() {
			let nonce = '';
			const randomNumber = Math.floor(Math.random() * 10);

			for (let i = 0; i < 20 + randomNumber; i++) {
				nonce += String.fromCharCode(33 + Math.floor(Math.random() * 94));
			}

			console.debug('Generated nonce');
			this.state = nonce;
			return nonce;
		},

		async clearStore() {
			this.accessToken = null;
			this.expiresAt = null;
			this.refreshToken = null;
			this.tokenType = null;
		},
	},
});
