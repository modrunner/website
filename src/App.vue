<template>
  <Suspense>
    <Dashboard />

    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>

<script>
import Dashboard from "@/components/index.vue";

export default {
  name: 'App',
  components: { Dashboard },
}
</script>

<style scoped>
</style>
