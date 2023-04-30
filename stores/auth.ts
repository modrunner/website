import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
	state: () => ({
		accessToken: null,
		expiresAt: null,
		refreshToken: null,
		state: null,
		tokenType: null,
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
	actions: {},
});
