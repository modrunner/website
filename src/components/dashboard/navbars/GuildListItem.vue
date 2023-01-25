<template>
	<div class="guild-list-item" :id="guild.id" @click="setSelectedGuild">
		<img class="guild-icon" :src="guildIconUrl" :alt="`server icon for ${guild.name}`">
		<h1 class="guild-name">{{ guild.name }}</h1>
	</div>
</template>

<script>
import { useGuildStore } from '@/stores/guild';
import placeholderImage from '@/assets/missing_icon_placeholder.png';

export default {
	name: 'GuildListItem',
	setup() {
		const guildStore = useGuildStore();
		return { guildStore };
	},
	props: ['guild'],
	computed: {
		guildIconUrl() {
			return this.guild.icon ? `https://cdn.discordapp.com/icons/${this.guild.id}/${this.guild.icon}.png` : placeholderImage;
		},
	},
	methods: {
		async isBotInGuild() {
			try {
				const res = await fetch(`http://localhost:3000/guilds/${this.guild.id}`);
				return res.status === 200 ? true : false;
			} catch (error) {
				console.error(error);
			}
		},
		setSelectedGuild() {
			this.guildStore.guild = this.guild;
		},
	},
	async created() {
		console.log(`created list item for ${this.guild.name}`);
		// TODO edit endpoints on server to return a list of guilds in database then make one API call to get that list and run bot presence checks on frontend
		this.guild.isBotPresent = await this.isBotInGuild();
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
