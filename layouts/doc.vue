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
			</nav>
		</div>
	</div>
</template>

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
		min-width: 100px;
		margin-top: 1rem;
		margin-right: 10rem;

		#doc-outline {
			border-left: 1px solid var(--color-text);
			padding: 1rem;
		}
	}
}
</style>
