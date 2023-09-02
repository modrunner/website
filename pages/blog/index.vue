<template>
	<ContentList path="/blog">
		<template #default="{ list }">
			<section class="post-grid">
				<div v-for="article in list" :key="article._path">
					<NuxtLink :to="article._path">
						<div class="post">
							<img v-if="article.thumbnail" :src="article.thumbnail" alt="" />
							<h2>{{ article.title }}</h2>
							<i>{{ new Date(article.date).toDateString() }}</i>
							<p>{{ article.description }}</p>
						</div>
					</NuxtLink>
				</div>
			</section>
		</template>
		<template #not-found>
			<p style="text-align: center">No articles found.</p>
		</template>
	</ContentList>
</template>

<script setup>
useHead({ title: 'Blog' })
</script>

<style scoped lang="scss">
section.post-grid {
	display: grid;
	gap: 1rem;
	grid-template-columns: 1fr 1fr 1fr;
	max-width: 1280px;
	margin: 3rem auto 0 auto;

	a {
		color: var(--color-text);
	}

	div.post {
		border-radius: 1rem;
		box-shadow: 1px 1px 20px 2px rgb(0, 0, 0);
		height: 100%;
		padding: 1rem;

		img {
			max-width: 100%;
		}
	}
}
</style>
