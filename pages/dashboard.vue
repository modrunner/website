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
					<img :src="server.icon" v-if="server.icon !== ''" />
					<div v-else class="image-placeholder"></div>
					<span>{{ server.name }}</span>
				</button>
			</div>
		</section>
		<section id="panels" v-show="selectedServer.id !== ''">
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
					name: 'Super Cool Example Server',
					icon: '',
				},
				{
					id: '22222',
					name: 'Server with loooooooooooooooooooooooooooooooong ass name',
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
.image-placeholder {
	height: 2rem;
	width: 2rem;
	background-color: #ffffff;
	border-radius: 999999px;
}

#dashboard {
	display: flex;
	width: 100%;
	min-height: calc(100vh - 70px);

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
			gap: 0.5rem;
			margin: 1rem 0;

			.server-item {
				color: var(--color-text);
				background: none;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				border-radius: 10px;
				padding: 0.5rem;
				max-width: 300px;

				span {
					overflow: hidden;
					max-width: 70%;
				}

				&:hover {
					background-color: rgba($color: #ffffff, $alpha: 0.2);
				}
				&:active {
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					transform: scale(0.95);
				}
			}
		}
	}

	#panels {
		flex-basis: 500px;
		margin: 0 1rem;

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
