import TrackedProjectListItems from './TrackedProjectListItems.vue';

<template>
  <h2>Tracked Projects</h2>
  <div class="search-bar">
    <SearchIcon class="search-icon" />
    <input
      class="search-input"
      v-model.trim="searchInput"
      placeholder="Search for tracked projects"
    />
  </div>
  <div v-if="this.guildStore.currentGuildAppData.projects.length">
    <TrackedProjectListItems
      v-for="project in this.guildStore.currentGuildAppData.projects"
      :key="project"
      :projectTrackingData="project"
      :searchInput="searchInput"
    />
  </div>
  <div v-else>
    You don't appear to have any projects tracked in this server yet. Get
    started by using the `/track` command in Discord!
  </div>
</template>

<script>
export default {
  name: 'TrackedProjectsList',
  data() {
    return {
      searchInput: '',
    }
  },
}
</script>
