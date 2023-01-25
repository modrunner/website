<template>
	<div id="guild-view">
		<template v-if="guildStore.guild">
			<h1>{{ guildStore.guild.name }}</h1>
			<template v-if="guildStore.guild.isBotPresent">
				<p>This guild has Modrunner in it! Once the dev is less lazy you can edit its settings here!</p>
			</template>
			<template v-else>
				<p>It doesn't appear that Modrunner is present in this server. You should invite it using this
					<a href="http://invite.modrunner.net/">link</a>!
				</p>
			</template>
		</template>
		<template v-else>
			<p>To get started, select a server from the list on the left.</p>
		</template>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useGuildStore } from '@/stores/guild';

export default {
	name: 'GuildView',
	setup() {
		const authStore = useAuthStore();
		const guildStore = useGuildStore();
		return { authStore, guildStore };
	},
	data() {
		return {
			botIsInGuild: null,
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>