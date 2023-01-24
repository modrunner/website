<template>
	<div>
		<h1>{{ guild.name }}</h1>
		<template v-if="guildHasBot">

		</template>
		<template v-else>

		</template>
	</div>
</template>

<script>
export default {
	name: 'GuildView',
	methods: {
		guildHasBot() {

		},
	}
}
</script>

<style scoped>

</style>