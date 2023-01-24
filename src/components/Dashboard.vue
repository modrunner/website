<template>
	<LoginModal v-if="!authStore.accessToken" />
	<template v-else>
		<div id="dashboard-container">
			<GuildList :access-token="authStore.accessToken" />
			<div id="main-content-container">
				<div id="headers-container">
					<Navbar :user="user" />
					<h1 id="greeting-header">Good {{ getTimeOfDayString(new Date()) }}, {{ user.username }}</h1>
				</div>
				<div id="content-container">
					<template v-if="!guildStore.selectedGuildId">
						<p>To get started, select a server from the list on the left.</p>
					</template>
					<template v-else>
						<p>{{ guild.name }}</p>
					</template>
				</div>
			</div>
		</div>
	</template>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useGuildStore } from '@/stores/guild';
import LoginModal from '@/components/modals/LoginModal.vue';
import GuildList from '@/components/dashboard/navbars/GuildList.vue';
import Navbar from './dashboard/navbars/Navbar.vue';

export default {
	name: 'Dashboard',
	components: { GuildList, LoginModal, Navbar },
	setup() {
		const authStore = useAuthStore();
		const guildStore = useGuildStore();
		return { authStore, guildStore };
	},
	data() {
		return {
			user: {
				username: 'user',
				avatar: null,
			},
			guild: null,
		}
	},
	methods: {
		async getUser() {
			let res;
			try {
				res = await fetch('https://discord.com/api/users/@me', {
					headers: {
						authorization: this.authStore.header,
					},
				});
			} catch (error) {
				console.error(error);
			}

			return await res.json();
		},
		async getGuild() {
			let res;
			try {
				res = await fetch(`https://discord.com/api/guilds/${this.guildStore.selectedGuildId}`, {
					headers: {
						authorization: this.authStore.header,
					},
				});
			} catch (error) {
				console.error(error);
			}

			return await res.json();
		},
		getTimeOfDayString(date) {
			const hour = date.getHours();
			if (hour >= 0 && hour < 12) {
				return 'morning';
			} else if (hour >= 12 && hour < 18) {
				return 'afternoon';
			} else {
				return 'evening';
			}
		},
	},
	async mounted() {
		if (location.search) {
			if (this.authStore.isStateModified(new URLSearchParams(location.search).get('state').toString())) {
				console.log('[Dashboard] Retrieving auth code from url');
				this.authStore.code = new URLSearchParams(location.search).get('code').toString();
			}
		}

		await this.authStore.authorize();

		if (this.authStore.authorized) {
			this.user = await this.getUser();
			if (location.search) history.replaceState({}, '', '/');
		};
	},
};
</script>

<style scoped>
#dashboard-container {
	display: flex;
}

#main-content-container {
	flex-basis: 100%;
}

#main-content-container>* {
	margin: 10px 20px;
}

#content-container {
	background-color: #10121B;
	border-radius: 20px;
}

#content-container>* {
	padding: 20px;
}
</style>
