<template>
	<div class="guild-list-item" :id="guild.id">
		<img class="guild-icon" :src="guildIconUrl" :alt="`server icon for ${guild.name}`">
		<h1 class="guild-name">{{ guild.name }}</h1>
	</div>
</template>

<script>
import placeholderImage from '../../assets/missing_icon_placeholder.png';

export default {
	name: 'GuildListItem',
	props: ['guild'],
	computed: {
		guildIconUrl() {
			return this.guild.icon ? `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png` : placeholderImage;
		},
	},
}
</script>

<style scoped>
.guild-list-item {
	border-radius: 15px;
	display: flex;
	justify-content: start;
	padding: 5px;
}

.guild-list-item:hover {
	background-color: #191c2a;
}

.guild-icon {
	border-radius: 10px;
	height: 30px;
	width: 30px;
}

.guild-name {
	display: flex;
	align-items: center;
	font-size: 1em;
	padding-left: 10px;
}
</style>
