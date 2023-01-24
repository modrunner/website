import { defineStore } from 'pinia';

const route_url = 'https://discord.com/api/oauth2/token';
const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

export const useAuthStore = defineStore('auth', {
	persist: {
		paths: ['expiresAt', 'refreshToken', 'scope', 'state', 'tokenType'],
		debug: import.meta.env.DOPPLER_ENVIRONMENT === 'dev' ? true : false,
	},
	state: () => ({
		accessToken: null,
		code: null,
		expiresAt: null,
		refreshToken: null,
		scope: null,
		state: null,
		tokenType: null,
	}),
	getters: {
		authorized: (state) => {
			return state.accessToken && state.expiresAt > Date.now() ? true : false;
		},
		header: (state) => {
			return `${state.tokenType} ${state.accessToken}`;
		},
	},
	actions: {
		async authorize() {
			let payload;
			if (this.refreshToken) {
				// re-authorize using refresh token
				console.log('[Auth] Re-authorizing using refresh token');
				payload = new URLSearchParams({
					client_id,
					client_secret,
					grant_type: 'refresh_token',
					refresh_token: this.refreshToken,
				}).toString();
			} else if (this.code) {
				// authorize using auth code grant flow
				console.log('[Auth] Authorizing using auth code');
				payload = new URLSearchParams({
					client_id,
					client_secret,
					code: this.code,
					grant_type: 'authorization_code',
					redirect_uri,
					scope: 'identify',
				}).toString();
			} else {
				return null;
			}

			try {
				const res = await fetch(route_url, {
					method: 'POST',
					body: payload,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});

				const data = await res.json();
				this.accessToken = data['access_token'];
				this.tokenType = data['token_type'];
				this.expiresAt = Date.now() + data['expires_in'];
				this.refreshToken = data['refresh_token'];
				this.scope = data['scope'];
			} catch (error) {
				console.error(error);
			}
		},
		isStateModified(returnedState = null) {
			if (!returnedState) {
				console.warn('[Auth] No state parameter was returned');
				return false;
			}
			const decodedState = atob(decodeURIComponent(returnedState));
			if (decodedState !== this.state) {
				console.warn('[Auth] Decoded state parameter does not match');
				console.table({
					returnedState,
					decodedState,
					savedState: this.state,
				});
				return false;
			}
			return true;
		},
		generateStateString() {
			let randomString = '';
			const randomNumber = Math.floor(Math.random() * 10);

			for (let i = 0; i < 20 + randomNumber; i++) {
				randomString += String.fromCharCode(
					33 + Math.floor(Math.random() * 94)
				);
			}

			this.state = randomString;
			return randomString;
		},
	},
});
