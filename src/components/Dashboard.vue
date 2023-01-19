<template>
	<LoginModal v-if="!accessToken" />
	<template v-else>
		<div id="dashboard-container">
			<GuildList :access-token="accessToken" />
			<div id="main-content-container">
				<div id="headers-container">
					<Navbar :user="user" />
					<h1 id="greeting-header">Good {{ getTimeOfDayString(new Date()) }}, {{ user.username }}</h1>
				</div>
				<div id="content-container">
					<template v-if="!currentlySelectedGuild">
						<p>To get started, select a server from the list on the left.</p>
					</template>
					<template v-else>

					</template>
				</div>
			</div>
		</div>
	</template>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import LoginModal from '@/components/modals/LoginModal.vue';
import GuildList from '@/components/dashboard/navbars/GuildList.vue';
import Navbar from './dashboard/navbars/Navbar.vue';
import { onBeforeMount } from 'vue';

export default {
	name: 'Dashboard',
	components: { GuildList, LoginModal, Navbar },
	setup() {
		const authStore = useAuthStore();
		return { authStore };
	},
	data() {
		return {
			accessToken: null,
			user: {
				username: 'user',
				avatar: null,
			},
			currentlySelectedGuild: null,
		}
	},
	watch: {
		currentlySelectedGuild(newGuild, oldGuild) {

		},
	},
	methods: {
		async getUser() {
			let res;
			try {
				res = await fetch('https://discord.com/api/users/@me', {
					headers: {
						authorization: `${this.authStore.authData.tokenType} ${this.accessToken}`,
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
	async beforeMount() {
		let code, state;
		if (location.search) {
			code = new URLSearchParams(location.search).get('code').toString();
			state = new URLSearchParams(location.search).get('state').toString();
		}

		this.accessToken = await this.authStore.getAccessToken(code, state);
		this.user = await this.getUser();
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
