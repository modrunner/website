import { defineStore } from 'pinia';

export const useGuildStore = defineStore('guild', {
	state: () => ({
		guild: null,
	}),
	actions: {
		async getGuild() {},
	},
});
