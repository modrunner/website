import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	persist: {
		storage: localStorage,
	},
	state: () => ({
		authData: {
			tokenType: null,
			expiresAt: null,
			refreshToken: null,
			scope: null,
		},
		stateParam: null,
	}),
	actions: {
		async getAccessToken(code, state) {
			let reqData;
			if (this.authData.refreshToken) {
				reqData = new URLSearchParams({
					client_id: import.meta.env.VITE_CLIENT_ID,
					client_secret: import.meta.env.VITE_CLIENT_SECRET,
					grant_type: 'refresh_token',
					refresh_token: this.authData.refreshToken,
				}).toString();
			} else if (code) {
				if (!state || atob(decodeURIComponent(state)) !== this.stateParam) {
					console.warn(
						'Auth error: state parameter does not match or is missing.'
					);
					return;
				}

				reqData = new URLSearchParams({
					client_id: import.meta.env.VITE_CLIENT_ID,
					client_secret: import.meta.env.VITE_CLIENT_SECRET,
					code,
					grant_type: 'authorization_code',
					redirect_uri: import.meta.env.VITE_REDIRECT_URI,
					scope: 'identify',
				}).toString();
			} else {
				return null;
			}

			try {
				const res = await fetch('https://discord.com/api/oauth2/token', {
					method: 'POST',
					body: reqData,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});

				const authData = await res.json();
				this.authData.tokenType = authData['token_type'];
				this.authData.expiresAt = Date.now() + authData['expires_in'];
				this.authData.refreshToken = authData['refresh_token'];
				this.authData.scope = authData['scope'];

				return authData['access_token'];
			} catch (error) {
				console.error(error);
			}
		},
		generateStateString() {
			let randomString = '';
			const randomNumber = Math.floor(Math.random() * 10);

			for (let i = 0; i < 20 + randomNumber; i++) {
				randomString += String.fromCharCode(
					33 + Math.floor(Math.random() * 94)
				);
			}

			this.stateParam = randomString;
			return randomString;
		},
	},
});
