import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		username: null,
		discriminator: null,
		avatar: null,
	}),
	getters: {
		avatarUrl: (state) => {
			return `https://cdn.discordapp.com/avatars/${state.id}/${state.avatar}.png`;
		},
	},
	actions: {},
});
