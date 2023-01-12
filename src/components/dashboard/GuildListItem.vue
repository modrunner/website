<template>
  <div>
    <img id="guild-icon" :src="iconUrl" :alt="`Server icon for ${name}`">
    <h1 id="guild-name">{{ name }}</h1>
    <a id="guild-summary">{{ summary }}</a>
  </div>
</template>

<script>
export default {
  name: 'GuildListItem',
  props: [ 'name', 'summary', 'iconUrl' ],
  data() {},
  methods: {},
  mounted() {},
}
</script>

<style scoped>
#guild-icon {
  border-radius: 20px;
  max-width: 200px;
  max-height: 200px;
}
</style>
