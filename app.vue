<template>
	<NuxtLayout>
		<NuxtPage />
		<Toaster position="bottom-right" theme="dark" :toastOptions="{ style: { background: 'var(--color-brand)' } }" />
	</NuxtLayout>
</template>

<script setup>
useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} • Modrunner` : 'Modrunner'
	},
})
</script>
