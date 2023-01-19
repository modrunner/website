<template>
	<div id="navbar-container">
		<a href="https://modrunner.net">
			<Help id="icon-help" />
		</a>
		<img :src="userAvatarUrl" alt="">
	</div>
</template>

<script>
import Help from '../../icons/Help.vue';
import placeholderImage from '../../../assets/missing_icon_placeholder.png';

export default {
	name: 'Navbar',
	props: ['user'],
	components: { Help },
	computed: {
		userAvatarUrl() {
			return this.user.avatar ? `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png` : placeholderImage;
		},
	},
}
</script>

<style scoped>
#navbar-container {
	display: flex;
	justify-content: end;
}

#navbar-container>* {
	margin: 10px;
}

#icon-help {
	color: white;
	height: 35px;
	width: 35px;
}

#icon-help:hover {
	color: black;
}

img {
	border-radius: 50%;
	height: 35px;
	width: 35px;
}
</style>
