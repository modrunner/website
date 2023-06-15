export const useUserStore = defineStore('user', {
	state: () => ({
		id: null,
		username: null,
		avatar: null,
		guilds: [],
	}),
	getters: {
		avatarUrl: (state) => {
			return `https://cdn.discordapp.com/avatars/${state.id}/${state.avatar}.png`;
		},
	},
	actions: {
		clearStore() {
			this.id = null;
			this.username = null;
			this.avatar = null;
			this.guilds = [];
		},
		async fetchUserData() {
			const response = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `Bearer ${useCookie('access-token').value}`,
				},
			})
				.then((res) => res.json())
				.catch((error) => console.error(error));

			this.id = response.id;
			this.username = response.username;
			this.avatar = response.avatar;
		},
		async fetchUserGuilds() {
			const response = await fetch('https://discord.com/api/users/@me/guilds', {
				headers: {
					authorization: `Bearer ${useCookie('access-token').value}`,
				},
			})
				.then((res) => res.json())
				.catch((error) => console.error(error));

			const managedGuilds = response.filter((guild) => {
				(guild.permissions & 0x20) == 0x20;
			});

			for (const guild of managedGuilds) {
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
