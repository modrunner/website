<template>
  <div class="project-item">
    <h1>{{ projectData.name }}</h1>
    <span>#{{ projectData.channelName }}</span>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'

export default {
  name: 'Project',
  props: ['projectTrackingData'],
  setup() {
    const authStore = useAuthStore()
    return { authStore }
  },
  data() {
    return {
      projectData: {
        id: '',
        name: '',
        platform: '',
        dateUpdated: '',
        channelName: '',
      },
    }
  },
  async created() {
    try {
      let res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/project/${
          this.projectTrackingData.projectId
        }`
      )
      let data = await res.json()
      this.projectData.id = data.id
      this.projectData.name = data.name
      this.projectData.platform = data.platform
      this.projectData.dateUpdated = data.dateUpdated

      res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/channel/${
          this.projectTrackingData.channelId
        }`
      )
      data = await res.json()
      this.projectData.channelName = data.name
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style scoped>
.project-item {
  border-radius: 0.25rem;
}

.project-item:hover {
  background-color: var(--color-raised-bg);
}

.project-item > h1 {
  display: inline-block;
  margin-left: 0.5rem;
}

.project-item > span {
  color: var(--color-text-secondary);
  margin-left: 0.5rem;
}
</style>
