<template>
	<div id="guild-list-container">
		<img id="banner" src="../../../assets/banner.png" alt="The Modrunner banner logo">
		<h1>Your Servers</h1>
		<input id="search-box" v-model="searchInput" placeholder="🔎 Search for servers">
		<div id="guild-list" v-if="guilds.length">
			<GuildListItem v-for="guild in guilds" v-show="new RegExp(`${searchInput}`, 'i').test(guild.name)"
				:guild="guild" />
		</div>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import GuildListItem from '@/components/dashboard/navbars/GuildListItem.vue';

export default {
	name: 'GuildList',
	props: ['accessToken'],
	components: { GuildListItem },
	setup() {
		const authStore = useAuthStore();
		return { authStore };
	},
	data() {
		return {
			guilds: [],
			searchInput: '',
		}
	},
	methods: {
		async getUserGuilds() {
			try {
				const res = await fetch('https://discord.com/api/users/@me/guilds', {
					headers: {
						authorization: this.authStore.header,
					},
				});

				const guilds = await res.json();
				this.guilds = [...guilds];
				this.guilds.sort((a, b) => {
					return a.name.localeCompare(b.name);
				});
			} catch (error) {
				console.error(error);
			}
		},
	},
	async mounted() {
		if (this.authStore.authorized) {
			await this.getUserGuilds();
		}
	}
}
</script>

<style scoped>
#banner {
	width: 75%;
}

#guild-list-container {
	background-color: #10121B;
	display: inline flex;
	flex-direction: column;
	height: 100vh;
	min-width: 250px;
	max-width: 350px;
	padding: 15px;
}

#search-box {
	color: #8e8e8e;
	background-color: #333333;
	border: none;
	border-radius: 15px;
	font-family: Inter;
	font-weight: bold;
	padding: 10px;
	margin: 10px 0;
}

#search-box:focus {
	border: none;
}

#guild-list {
	overflow: auto;
}
</style>
