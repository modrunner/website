<template></template>

<script>
export default defineNuxtComponent({
	setup() {
		definePageMeta({
			middleware: ['invite'],
		});
	},
});
</script>
