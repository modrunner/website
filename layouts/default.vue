<template>
	<header id="site-header">
		<div id="header-nav">
			<div>
				<NuxtLink to="/"
					><img
						src="~/assets/images/logo_banner.png"
						alt="The full-sized Modrunner logo banner"
				/></NuxtLink>
			</div>
			<nav id="header-links">
				<NuxtLink to="/dashboard">Dashboard</NuxtLink>
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink to="/blog">Blog</NuxtLink>
			</nav>
		</div>
		<div id="header-user-controls">
			<NuxtLink to="https://invite.modrunner.net">Add to Server</NuxtLink>
			<button @click="changeTheme">
				<SunIcon v-if="theme === 'light'" />
				<MoonIcon v-else />
			</button>
			<button v-if="authStore.isAuthorized">
				<img
					:src="userStore.avatarUrl"
					:alt="`${userStore.username}#${userStore.discriminator}`"
				/>
			</button>
			<NuxtLink v-else to="/">Sign In</NuxtLink>
		</div>
	</header>

	<main id="page-wrapper">
		<slot />
	</main>

	<footer id="site-footer">
		<section id="footer-wrapper">
			<div>
				<NuxtLink to="/">
					<img
						src="~/assets/images/logo_banner.png"
						alt="The full-sized Modrunner logo banner"
					/>
				</NuxtLink>
				<p>
					Modrunner is
					<NuxtLink :to="appConfig.links.github" class="anchor-link"
						>open source</NuxtLink
					>.
				</p>
				<p>
					modrunner/website<br />main@<NuxtLink to="/" class="anchor-link"
						>12345</NuxtLink
					>
				</p>
				<p>&copy; {{ new Date().getFullYear() }} Modrunner</p>
			</div>
			<nav class="link-list">
				<h1>About Us</h1>
				<NuxtLink to="/about">About Modrunner</NuxtLink>
				<NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>
				<NuxtLink to="/legal/terms">Terms of Service</NuxtLink>
			</nav>
			<nav class="link-list">
				<h1>Resources</h1>
				<NuxtLink to="/blog">Blog</NuxtLink>
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink :to="appConfig.links.github">GitHub</NuxtLink>
				<NuxtLink :to="appConfig.links.statusPage">Status</NuxtLink>
			</nav>
			<nav class="link-list">
				<h1>Interact</h1>
				<NuxtLink :to="appConfig.links.discord">Discord</NuxtLink>
				<NuxtLink :to="appConfig.links.email">Email</NuxtLink>
				<NuxtLink :to="appConfig.links.mastodon">Mastodon</NuxtLink>
				<NuxtLink :to="appConfig.links.twitter">Twitter</NuxtLink>
			</nav>
		</section>
	</footer>
</template>

<script setup>
import SunIcon from '~/assets/images/utils/sun.svg';
import MoonIcon from '~/assets/images/utils/moon.svg';

import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';

const appConfig = useAppConfig();
const authStore = useAuthStore();
const userStore = useUserStore();
</script>

<script>
export default {
	data() {
		return {
			theme: 'dark',
		};
	},
	mounted() {
		document.documentElement.classList.add(`dark-mode`);
	},
	methods: {
		changeTheme() {
			if (this.theme === 'dark') {
				this.theme = 'light';
				document.documentElement.classList.replace('dark-mode', 'light-mode');
			} else {
				this.theme = 'dark';
				document.documentElement.classList.replace('light-mode', 'dark-mode');
			}
		},
	},
};
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';

#site-header {
	display: flex;
	background: var(--color-bg);
	box-shadow: 0 1px 3px black;
	position: sticky;
	top: 0;

	#header-nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 2rem;
		padding: 0.5rem;

		#header-links {
			display: flex;
			gap: 2rem;
		}
	}

	#header-user-controls {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
		margin: 0 2rem;
		width: 100%;

		button {
			color: var(--color-text);
			background: none;
			border-radius: 999999px;
			height: 2.25rem;
			width: 2.25rem;

			&:hover {
				background-color: rgba($color: #ffffff, $alpha: 0.2);
			}

			svg {
				height: 100%;
				width: 100%;
			}
		}
	}
}

#page-wrapper {
	box-sizing: border-box;
	min-height: calc(100vh - 370px);
}

#site-footer {
	background-color: var(--color-bg-dark);
	display: flex;
	justify-content: center;
	box-sizing: border-box;
	min-height: 300px;
	width: 100%;

	#footer-wrapper {
		display: flex;
		flex-wrap: wrap;
		gap: 5rem;
		margin: 2rem;
	}

	.link-list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.anchor-link {
		color: var(--color-text-link);
		text-decoration: underline;
	}
}

img {
	height: 3rem;
}
</style>
