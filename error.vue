<template>
	<NuxtLayout>
		<div id="error-page">
			<h1>404</h1>
			<p>Not Found</p>
		</div>
	</NuxtLayout>
</template>

<style lang="scss" scoped>
#error-page {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	h1 {
		font-size: var(--font-size-3xl);
	}
}
</style>
