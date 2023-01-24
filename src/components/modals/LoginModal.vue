<template>
	<div id="modal">
		<h1>Login to use the dashboard</h1>
		<button @click="login">Login with Discord</button>
	</div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
	name: 'LoginModal',
	setup() {
		const authStore = useAuthStore();
		return { authStore };
	},
	methods: {
		async login() {
			location.href = import.meta.env.VITE_OAUTH2_URL + `&state=${btoa(this.authStore.generateStateString())}`;
		},
	},
}
</script>

<style scoped>
#modal {
	background-color: #10121B;
	border-radius: 25px;
	display: grid;
	row-gap: 10px;
	max-height: 50vh;
	max-width: 100vw;
	position: absolute;
	top: 50vh;
	left: 50vw;
	transform: translate(-50%, -50%);
	padding: 20px;
}

h1 {
	font-size: 1.5em;
	text-align: center;
}

button {
	color: white;
	background-color: #8e8e8e;
	border: 2px solid white;
	border-radius: 20px;
	font-size: 1.3em;
	font-weight: bold;
	padding: 5px;
	transition-duration: 0.2s;
}

button:hover {
	color: #5865F2;
	background-color: white;
}
</style>
