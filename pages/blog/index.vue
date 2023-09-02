<template>
	<ContentList path="/blog">
		<template #default="{ list }">
			<div v-for="article in list" :key="article._path">
				<NuxtLink :to="article._path"><h2>{{ article.title }}</h2></NuxtLink>
				<p>{{ article.description }}</p>
			</div>
		</template>
		<template #not-found>
			<p style="text-align: center">No articles found.</p>
		</template>
	</ContentList>
</template>

<script setup>
useHead({ title: 'Blog' })
</script>
