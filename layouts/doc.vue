<template>
	<div id="doc-wrapper">
		<nav id="navigation-sidebar">
			<ContentList path="/docs" v-slot="{ list }">
				<div v-for="doc in list" :key="doc._path">
					<NuxtLink :to="doc._path">{{ doc.title }}</NuxtLink>
				</div>
			</ContentList>
		</nav>

		<ContentDoc />

		<div id="doc-outline-wrapper">
			<nav id="doc-outline">
				<!-- doc outline items -->
				<div v-for="heading in headings" :key="heading.fragment">
					<NuxtLink :to="heading.fragment">{{ heading.title }}</NuxtLink>
					<NuxtLink
						v-for="subHeading in heading.subHeadings"
						:key="subHeading.fragment"
						:to="subHeading.fragment"
						>{{ subHeading.title }}</NuxtLink
					>
				</div>
			</nav>
		</div>
	</div>
</template>

<script>
export default {
	props: ['headings'],
};
</script>

<style scoped lang="scss">
#doc-wrapper {
	display: flex;
	gap: 7rem;

	#navigation-sidebar {
		background-color: var(--color-bg-dark);
		min-width: 15rem;
		padding: 1rem;
	}

	#doc-outline-wrapper {
		min-width: 400px;
		margin-top: 1rem;
		margin-right: 1rem;

		#doc-outline {
			border-left: 1px solid var(--color-text);
			padding: 1rem;
		}
	}
}
</style>
