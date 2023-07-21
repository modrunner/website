<template>
	<header id="site-header">
		<div id="header-container">
			<div id="header-nav">
				<div>
					<NuxtLink to="/"
						><img
							src="~/assets/images/logo_banner.png"
							alt="The full-sized Modrunner logo banner"
							class="logo"
					/></NuxtLink>
				</div>
				<nav id="header-links">
					<NuxtLink to="/dashboard">Dashboard</NuxtLink>
					<NuxtLink to="/docs">Docs</NuxtLink>
					<NuxtLink to="/blog">Blog</NuxtLink>
				</nav>
			</div>
			<div id="header-user-controls">
				<NuxtLink to="/invite">Add to Server</NuxtLink>
				<button @click="changeTheme">
					<SunIcon v-if="theme === 'light'" />
					<MoonIcon v-else />
				</button>
				<button v-if="useCookie('access-token').value">
					<img
						:src="`https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png`"
						:alt="userData.username"
					/>
				</button>
				<NuxtLink v-else to="/login" class="sign-in-button">Sign In</NuxtLink>
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
				<NuxtLink to="/login" class="sign-in-button">Sign In</NuxtLink>
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
						class="logo"
					/>
				</NuxtLink>
				<p>
					Modrunner is
					<NuxtLink :to="appConfig.links.github" class="anchor-link"
						>open source</NuxtLink
					>.
				</p>
				<p>
					{{ runtimeConfig.public.owner }}/{{ runtimeConfig.public.slug }}
					<br />
					{{ runtimeConfig.public.branch }}@<NuxtLink
						to="/"
						class="anchor-link"
					>
						{{ runtimeConfig.public.hash }}
					</NuxtLink>
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
export default defineNuxtComponent({
	async setup() {
		const { data: userData } = await useFetch(
			'https://discord.com/api/users/@me',
			{
				headers: { authorization: `Bearer ${useCookie('access-token').value}` },
			}
		);

		const appConfig = useAppConfig();
		const runtimeConfig = useRuntimeConfig();
		return { appConfig, runtimeConfig, userData };
	},
	data() {
		return {
			theme: 'dark',
			showMobileMenu: false,
		};
	},
	async mounted() {
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
		login() {
			location.href = `${
				this.appConfig.meta.authUrl
			}&state=${encodeURIComponent(this.authStore.generateNonce())}`;
		},
	},
});
</script>

<style lang="scss">
@import '~/assets/styles/global.scss';

#site-header {
	display: flex;
	justify-content: center;
	background-color: rgb(var(--color-bg-dark) / 0.7);
	backdrop-filter: blur(10px);
	position: sticky;
	top: 0;
	padding: 0.5rem 0;

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
			display: flex;
			justify-content: center;
			align-items: center;
			color: var(--color-text);
			background: none;
			border-radius: 999999px;
			box-sizing: border-box;
			height: 2.25rem;
			width: 2.25rem;

			&:hover {
				background-color: rgba($color: #ffffff, $alpha: 0.2);
				border: 2px solid var(--color-brand);
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

		img {
			border-radius: 99999px;
			height: 2rem;
			width: 2rem;
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

.logo {
	height: 3rem;
}
</style>
