export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		username: null,
		discriminator: null,
		avatar: null,
	}),
	getters: {
		authStore() {
			return useAuthStore();
		},
		avatarUrl: (state) => {
			return `https://cdn.discordapp.com/avatars/${state.id}/${state.avatar}.png`;
		},
	},
	actions: {
		clearStore() {
			this.id = null;
			this.username = null;
			this.discriminator = null;
			this.avatar = null;
		},
		async getCurrentUser() {
			const data = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: this.authStore.authHeader,
				},
			})
				.then((res) => res.json())
				.catch((error) => console.error(error));

			this.id = data.id;
			this.username = data.username;
			this.discriminator = data.discriminator;
			this.avatar = data.avatar;
		},
		async getCurrentUserGuilds() {
			const data = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: this.authStore.authHeader,
				},
			})
				.then((res = res.json()))
				.catch(console.error(error));

			const filteredGuilds = data.filter((guild) => {
				(guild.permissions & 0x20) == 0x20;
			});

			for (const guild of filteredGuilds) {
				this.guilds.push({
					id: guild.id,
					name: guild.name,
					icon: guild.icon
						? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
						: null,
				});
			}

			this.guilds.sort((a, b) => {
				return a.name.localeComapre(b.name);
			});

			return this.guilds;
		},
	},
});
