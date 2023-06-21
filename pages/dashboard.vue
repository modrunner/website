<template>
	<div id="dashboard">
		<section id="sidebar" class="rounded-container">
			<h1>Your Servers</h1>
			<input
				id="server-search-input"
				type="text"
				name="server-search"
				placeholder="Search for a server"
			/>
			<nav id="server-navlist-buttons" v-if="userGuilds.length > 0">
				<!-- server items go here -->
				<button
					v-for="guild in userGuilds"
					:key="guild.id"
					@click="selectGuild(guild)"
					class="server-nav-button"
				>
					<img
						:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`"
						v-if="guild.icon !== ''"
					/>
					<div v-else class="image-placeholder"></div>
					<span>{{ guild.name }}</span>
				</button>
			</nav>
			<p v-else>The servers that you manage will appear here.</p>
		</section>
		<section id="information-panels" v-if="selectedGuild !== ''">
			<div id="server-name-title">
				<img
					:src="`https://cdn.discordapp.com/icons/${selectedGuild.id}/${selectedGuild.icon}.webp`"
				/>
				<h1>{{ selectedGuild.name }}</h1>
			</div>
			<div id="navigation-bar">
				<button
					@click="selectedTab = 0"
					:class="{ selected: selectedTab === 0 }"
				>
					Tracked Projects
				</button>
				<button
					@click="selectedTab = 1"
					:class="{ selected: selectedTab === 1 }"
				>
					Bot Settings
				</button>
			</div>
			<div
				id="tracked-projects-panel"
				class="rounded-container info-panel"
				v-if="selectedTab === 0"
			>
				<h1>Tracked Projects</h1>
			</div>
			<div
				id="bot-settings-panel"
				class="rounded-container info-panel"
				v-else-if="selectedTab === 1"
			>
				<h1>Bot Settings</h1>
				<div id="cols">
					<div id="left-col">
						<h2>General Settings</h2>
						<p>Bot Nickname</p>
						<input type="text" />
						<p>Log Channel</p>
						<select name="" id=""></select>

						<h2>Tracked Projects Settings</h2>
						<p>Maximum Characters for Changelogs</p>
						<input
							type="text"
							:value="selectedGuild.settings.changelogLength"
						/>
						<p>Notification Style</p>
						<select name="" id="">
							<option
								value=""
								:selected="
									selectedGuild.settings.notificationStyle === 'normal'
										? true
										: false
								"
							>
								Normal
							</option>
							<option
								value=""
								:selected="
									selectedGuild.settings.notificationStyle === 'compact'
										? true
										: false
								"
							>
								Compact
							</option>
							<option
								value=""
								:selected="
									selectedGuild.settings.notificationStyle === 'custom'
										? true
										: false
								"
							>
								Custom
							</option>
							<option
								value=""
								:selected="
									selectedGuild.settings.notificationStyle === 'ai'
										? true
										: false
								"
							>
								AI Generated (Beta)
							</option>
						</select>
					</div>
					<div id="right-col">
						<h2>Custom Style Editor</h2>
						<textarea name="" id=""></textarea>
						<p>
							Only applies when the notification style is set to "Custom".
							<NuxtLink
								to="https://support.discord.com/hc/en-us/articles/210298617-Markdown-Text-101-Chat-Formatting-Bold-Italic-Underline-"
								>Supports Discord-style markdown.</NuxtLink
							>
						</p>
						<h3>Available Variables</h3>
						<p><code>$project_name</code> - The name of the project</p>
						<p><code>$project_id</code> - The ID of the project</p>
						<p>
							<code>$project_platform</code> - The name of the platform where
							the project is hosted
						</p>
						<p><code>$version_name</code> - The name of the new version</p>
						<p><code>$version_number</code> - The number of the new version</p>
						<p><code>$version_id</code> - The ID of the new version</p>
						<p>
							<code>$version_changelog</code> - The changelog of the new version
						</p>
						<p>
							<code>$version_date</code> - The timestamp at when the new version
							was published
						</p>
					</div>
				</div>
			</div>
		</section>
		<p v-else>Select a server from the sidebar on the left to get started.</p>
	</div>
</template>

<script setup>
const { data: userGuilds } = await useFetch(
	'https://discord.com/api/users/@me/guilds',
	{
		headers: { authorization: `Bearer ${useCookie('access-token').value}` },
	}
);
</script>

<script>
export default {
	setup() {
		definePageMeta({
			middleware: ['auth'],
		});

		const appConfig = useAppConfig();
		return { appConfig };
	},
	data() {
		return {
			selectedGuild: '',
			selectedTab: 0,
		};
	},
	methods: {
		async selectGuild(guild) {
			const response = await $fetch('/guild', {
				query: { guildId: guild.id },
			});

			this.selectedGuild = {
				id: guild.id,
				name: guild.name,
				icon: guild.icon,
				trackedProjects: response.trackedProjects,
				settings: {
					changelogLength: response.changelogLength,
					maxProjects: response.maxProjects,
					notificationStyle: response.notificationStyle,
				},
			};
		},
	},
};
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

	.rounded-container {
		background-color: var(--color-bg-dark);
		border-radius: 10px;
		padding: 1rem;
	}

	#sidebar {
		display: flex;
		flex-direction: column;
		background-color: var(--color-bg-dark);
		min-width: 300px;
		padding: 1rem;
		margin: 1rem;

		h1 {
			margin: 0.5rem 0;
		}

		#server-search-input {
			background-color: var(--color-bg);
			border-radius: 10px;
			font-family: var(--font-standard);
		}

		#server-navlist-buttons {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			margin: 1rem 0;

			.server-nav-button {
				color: var(--color-text);
				background: none;
				display: flex;
				align-items: center;
				gap: 0.5rem;
				border-radius: 10px;
				padding: 0.5rem;
				max-width: 400px;

				&:hover {
					background-color: rgba($color: #ffffff, $alpha: 0.2);
				}
				&:active {
					background-color: rgba($color: #ffffff, $alpha: 0.1);
					transform: scale(0.95);
				}

				img {
					border-radius: 99999px;
				}
			}
		}
	}

	#information-panels {
		// flex-basis: 600px;
		width: 100%;
		margin-top: 1rem;
		margin-right: 1rem;

		#server-name-title {
			display: flex;
			align-items: center;
			gap: 1rem;

			img {
				border-radius: 99999px;
			}
		}

		#navigation-bar {
			display: flex;
			gap: 0.5rem;
			background-color: var(--color-bg-dark);
			border-radius: 10px;
			padding: 0.5rem;

			button {
				background: none;
				border-radius: 10px;
				padding: 0.75rem;

				&.selected {
					background-color: #404149;
				}
			}
		}

		.info-panel {
			margin: 1rem 0;

			h1 {
				border-bottom: 1px solid var(--color-text-dark);
				padding-bottom: 1rem;
				margin: 0;
			}
		}

		#bot-settings-panel {
			#cols {
				display: flex;
				justify-content: space-between;
			}

			input,
			select,
			textarea {
				background-color: var(--color-bg);
				border: none;
				border-radius: 10px;
				font-family: var(--font-standard);
				width: 200px;
				height: 40px;
				padding: 0.5rem;
			}

			textarea {
				width: calc(100% - 2rem);
				height: 400px;
				padding: 1rem;
			}
		}
	}
}
</style>
