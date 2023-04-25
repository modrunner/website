<template>
	<header>
		<div>
			<!-- logo goes here -->
			<img
				src="~/assets/images/logo_banner.png"
				alt="The full-sized Modrunner logo banner"
			/>
		</div>
		<nav>
			<!-- nav links -->
			<NuxtLink to="/docs">Docs</NuxtLink>
			<NuxtLink to="/blog">Blog</NuxtLink>
			<NuxtLink to="/about">About</NuxtLink>
		</nav>
		<div>
			<!-- sign in/out stuff -->
		</div>
	</header>

	<slot />

	<footer>
		<section>
			<div>
				<!-- branding & meta -->
				<img
					src="~/assets/images/logo_banner.png"
					alt="The full-sized Modrunner logo banner"
				/>
				<p>
					Modrunner is
					<a href="https://github.com/smcmo/modrunner-dashboard">open source</a
					>.
				</p>
				<p>smcmo/modrunner-dashboard<br />main@123456</p>
				<p>&copy; {{ new Date().getFullYear() }} Modrunner</p>
			</div>
			<nav>
				<!-- company links -->
				<h1>Legal</h1>
				<NuxtLink to="/legal/terms">Terms of Service</NuxtLink>
				<NuxtLink to="/legal/privacy-policy">Privacy Policy</NuxtLink>
			</nav>
			<nav>
				<!-- resources links -->
				<h1>Resources</h1>
				<NuxtLink to="">Blog</NuxtLink>
				<NuxtLink to="/docs">Docs</NuxtLink>
				<NuxtLink to="/">Status</NuxtLink>
				<a href="https://github.com/smcmo/modrunner-dashboard">GitHub</a>
			</nav>
			<nav>
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

<script lang="ts" scoped></script>

<style lang="scss">
@import '~/assets/styles/global.scss';

img {
	height: 3rem;
}
</style>
