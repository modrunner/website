<template>
	<div id="dashboard">
		<section id="server-sidebar">
			<input
				id="server-search"
				type="text"
				name="server-search"
				placeholder="Search for a server"
			/>
			<div id="server-list" v-show="servers.length > 0">
				<!-- server items go here -->
				<button v-for="server in servers" :key="server.id" class="server-item">
					<!-- <img :src="server.icon" /> -->
					<span>{{ server.name }}</span>
				</button>
			</div>
		</section>
		<section id="panels" v-show="selectedServer !== ''">
			<div id="server-name-title">
				<img :src="selectedServer.icon" />
				<h1>{{ selectedServer.name }}</h1>
			</div>
			<div id="navigation-bar">
				<button>Tracked Projects</button>
				<button>Bot Settings</button>
			</div>
		</section>
	</div>
</template>

<script lang="ts">
export default defineComponent({
	data() {
		return {
			selectedServer: {
				id: '11111',
				name: 'Selected Server Name',
				icon: '',
			},
			servers: [
				{
					id: '11111',
					name: 'Selected Server Name',
					icon: '',
				},
				{
					id: '22222',
					name: 'Example Server Name',
					icon: '',
				},
			],
		};
	},
	beforeCreate() {
		// navigateTo('/login');
	},
});
</script>

<style lang="scss" scoped>
#dashboard {
	display: flex;
	gap: 1rem;

	#server-sidebar {
		display: flex;
		flex-direction: column;
		background-color: var(--color-bg-dark);
		min-width: 250px;
		padding: 1rem;

		#server-search {
			background-color: var(--color-bg);
			border-radius: 10px;
			font-family: var(--font-standard);
		}

		#server-list {
			display: flex;
			flex-direction: column;
			gap: 1rem;
			margin: 1rem 0;

			.server-item {
				background-color: #404149;
				display: flex;
				border-radius: 10px;
				padding: 0.5rem;
			}
		}
	}

	#panels {
		#server-name-title {
			display: flex;
		}

		#navigation-bar {
			display: flex;
			gap: 1rem;
			background-color: var(--color-bg-dark);
			border-radius: 10px;
			padding: 0.5rem;

			button {
				border-radius: 10px;
				padding: 0.5rem;
			}
		}
	}
}
</style>
