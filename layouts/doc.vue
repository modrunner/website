<template>
	<div id="doc-wrapper">
		<nav id="navigation-sidebar">
			<ContentList path="/docs" v-slot="{ list }">
				<div v-for="doc in list" :key="doc._path">
					<NuxtLink :to="doc._path">{{ doc.title }}</NuxtLink>
				</div>
			</ContentList>
		</nav>

		<ContentDoc v-slot="{ doc }">
			<ContentRenderer :value="doc" />

			<div id="doc-outline-wrapper">
				<nav id="doc-outline">
					<div class="link" v-for="link in doc.body.toc.links" :key="link.id">
						<NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
						<NuxtLink
							class="child-link"
							v-if="link.children"
							v-for="childLink of link.children"
							:key="childLink.id"
							:to="`#${childLink.id}`"
							>{{ childLink.text }}</NuxtLink
						>
					</div>
				</nav>
			</div>
		</ContentDoc>
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
		min-width: 400px;
		margin-top: 1rem;
		margin-right: 1rem;

		#doc-outline {
			border-left: 1px solid var(--color-text);
			padding: 1rem;

			.link {
				display: flex;
				flex-direction: column;
				padding: 0.125rem;
			}

			.child-link {
				margin-left: 2rem;
			}
		}
	}
}
</style>
