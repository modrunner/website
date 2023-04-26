<template>
	<header id="site-header">
		<div id="header-nav">
			<div>
				<!-- logo goes here -->
				<NuxtLink to="/"
					><img
						src="~/assets/images/logo_banner.png"
						alt="The full-sized Modrunner logo banner"
				/></NuxtLink>
			</div>
			<nav id="header-links">
				<!-- nav links -->
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink to="/blog">Blog</NuxtLink>
				<NuxtLink to="/about">About</NuxtLink>
			</nav>
		</div>
		<div id="header-user-controls">
			<!-- sign in/out stuff -->
			<button></button>
			<button></button>
		</div>
	</header>

	<slot />

	<footer id="site-footer">
		<section id="footer-wrapper">
			<div>
				<!-- branding & meta -->
				<img
					src="~/assets/images/logo_banner.png"
					alt="The full-sized Modrunner logo banner"
				/>
				<p>
					Modrunner is
					<a
						href="https://github.com/smcmo/modrunner-dashboard"
						class="anchor-link"
						>open source</a
					>.
				</p>
				<p>
					smcmo/modrunner-dashboard<br />main@<a href="/" class="anchor-link"
						>12345</a
					>
				</p>
				<p>&copy; {{ new Date().getFullYear() }} Modrunner</p>
			</div>
			<nav class="link-list">
				<!-- company links -->
				<h1>Legal</h1>
				<NuxtLink to="/legal/terms">Terms of Service</NuxtLink>
				<NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>
			</nav>
			<nav class="link-list">
				<!-- resources links -->
				<h1>Resources</h1>
				<NuxtLink to="/blog">Blog</NuxtLink>
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink to="/">Status</NuxtLink>
				<a href="https://github.com/smcmo/modrunner-dashboard">GitHub</a>
			</nav>
			<nav class="link-list">
				<!-- interact links -->
				<h1>Socials</h1>
				<!-- <a :href="appConfig.links.discord">Discord</a> -->
			</nav>
		</section>
	</footer>
</template>

<!-- <script setup>
const appConfig = useAppConfig();
<script> -->

<script lang="ts" scoped>
export default {
	mounted() {
		document.documentElement.classList.add(`dark-mode`);
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
		justify-content: end;
		align-items: center;
		gap: 2rem;
		margin: 0 2rem;
		width: 100%;

		button {
			border-radius: 999999px;
			height: 2rem;
			width: 2rem;
		}
	}
}

#site-footer {
	background-color: var(--color-bg-dark);
	display: flex;
	justify-content: center;
	position: absolute;
	bottom: 0;
	box-sizing: border-box;
	height: 300px;
	width: 100%;

	#footer-wrapper {
		display: flex;
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
