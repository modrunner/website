<template>
	<header id="site-header">
		<div id="header-container">
			<div id="header-nav">
				<div>
					<NuxtLink to="/"
						><img
							src="~/assets/images/logo_banner.png"
							alt="The full-sized Modrunner logo banner"
					/></NuxtLink>
				</div>
				<nav id="header-links">
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
				<NuxtLink v-else :to="appConfig.meta.authUrl" class="sign-in-button"
					>Sign In</NuxtLink
				>
			</div>
		</div>
	</header>
	<header id="site-header-mobile">
		<div id="menu-buttons" v-show="showMobileMenu === true">
			<div id="wrapper">
				<NuxtLink to="/dashboard" @click="showMobileMenu = !showMobileMenu"
					>Dashboard</NuxtLink
				>
				<NuxtLink to="/docs" @click="showMobileMenu = !showMobileMenu"
					>Docs</NuxtLink
				>
				<NuxtLink to="/blog" @click="showMobileMenu = !showMobileMenu"
					>Blog</NuxtLink
				>
				<NuxtLink to="https://invite.modrunner.net">Add to Server</NuxtLink>
				<button @click="changeTheme">Change Theme</button>
				<NuxtLink :to="appConfig.meta.authUrl" class="sign-in-button"
					>Sign In</NuxtLink
				>
			</div>
		</div>
		<div id="display-wrapper">
			<NuxtLink to="/">
				<img src="~/assets/images/logo.png" alt="the modrunner logo" />
			</NuxtLink>
			<button @click="showMobileMenu = !showMobileMenu">
				<MenuIcon />
			</button>
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
				<NuxtLink to="/legal/terms-of-service">Terms of Service</NuxtLink>
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

<script>
import { useAuthStore } from '~/stores/auth';
import { useUserStore } from '~/stores/user';

export default {
	setup(props, context) {
		const appConfig = useAppConfig();
		const config = useRuntimeConfig();
		const authStore = useAuthStore(context.$pinia);
		const userStore = useUserStore(context.$pinia);
		return { appConfig, config, authStore, userStore };
	},
	data() {
		return {
			theme: 'dark',
			showMobileMenu: false,
		};
	},
	async mounted() {
		document.documentElement.classList.add(`dark-mode`);

		if (location.search) {
			const code = new URLSearchParams(location.search).get('code');
			const state = new URLSearchParams(location.search).get('state');

			if (code) {
				await this.authStore.authorize(code, state);
				history.replaceState({}, '', '/');
			}
		}
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
		login() {
			location.href = `${
				this.appConfig.meta.authUrl
			}&state=${encodeURIComponent(this.authStore.generateNonce())}`;
		},
	},
};
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';

#site-header {
	display: flex;
	justify-content: center;
	background-color: rgba($color: #191c2a, $alpha: 0.7);
	// border-bottom: 1px solid gray;
	backdrop-filter: blur(10px);
	position: sticky;
	top: 0;

	#header-container {
		display: flex;
		width: 1280px;
	}

	@media screen and (max-width: 800px) {
		display: none;
	}

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

	a {
		color: var(--color-text);

		&:hover {
			color: var(--color-text-dark);
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

		.sign-in-button {
			color: var(--color-brand);
			border: 1px solid var(--color-brand);
			border-radius: 5px;
			padding: 0.5rem 1rem;

			&:hover {
				background-color: rgba(10, 90, 114, 0.5);
			}
		}
	}
}

#site-header-mobile {
	position: absolute;
	bottom: 0;

	@media screen and (min-width: 800px) {
		display: none;
	}

	#menu-buttons {
		background-color: var(--color-bg);
		display: flex;
		justify-content: center;

		#wrapper {
			display: flex;
			flex-direction: column;
			align-items: center;
			text-align: center;
			width: 75vw;

			> * {
				background-color: var(--color-bg-dark);
				padding: 0.5rem;
				margin: 0.25rem;
				border-radius: 20px;
				width: 100%;
				box-sizing: border-box;
			}

			.sign-in-button {
				border: 1px solid var(--color-brand);
			}
		}
	}

	#display-wrapper {
		background-color: var(--color-bg);
		display: flex;
		justify-content: space-between;
		width: 100vw;

		img {
			border-radius: 999999px;
			padding: 0.75rem;
			width: 2rem;
			height: 2rem;
		}

		button {
			background-color: transparent;

			svg {
				color: var(--color-text);
				padding: 0.75rem;
				width: 2rem;
				height: 2rem;
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

		a {
			color: var(--color-text);

			&:hover {
				color: var(--color-text-dark);
			}
		}
	}
}

img {
	height: 3rem;
}
</style>
