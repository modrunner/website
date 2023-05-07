<template>
	<section id="hero">
		<div id="hero-text">
			<h1>The ultimate resource for modding communities</h1>
			<p>
				Modrunner levels up your Discord communities by providing a free and
				easy to use Discord bot that allows both creators and users to find,
				share and follow modding projects on some of the most popular platforms.
			</p>
			<ul>
				<li>
					Search for modding projects right within Discord and easily share them
					with others
				</li>
				<li>
					Follow projects and get notifications posted to Discord whenever they
					recieve updates
				</li>
				<li>
					Customize the bot's behavior by selecting from multiple notification
					styles and more
				</li>
			</ul>
			<div id="hero-text-buttons">
				<button>
					<NuxtLink to="https://invite.modrunner.net"
						>Add to Your Server</NuxtLink
					>
				</button>
				<button>
					<NuxtLink to="/dashboard">Sign Into the Dashboard</NuxtLink>
				</button>
			</div>
		</div>
		<div id="hero-image">cool image or widget goes here</div>
	</section>
</template>

<script setup>
useHead({
	title: 'The ultimate resource for modding communities',
});
</script>

<style lang="scss" scoped>
#hero {
	display: flex;
	max-width: 1280px;
	margin: 0 auto;
	padding-bottom: 50px;

	#hero-text {
		h1 {
			font-size: var(--font-size-3extralarge);
		}

		#hero-text-buttons {
			display: flex;
			gap: 1rem;

			button {
				border-radius: 0.5rem;
				padding: 1rem;
				font-weight: var(--font-weight-bold);
				font-size: var(--font-size-medium);

				&:hover {
					box-shadow: 0px 0px 20px white;
				}
			}
		}
	}

	#hero-image {
		// temp
		border: 2px solid rebeccapurple;
		width: 1000px;
		margin-top: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>
