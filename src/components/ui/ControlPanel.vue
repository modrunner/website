<template>
  <section class="main-content">
    <template v-if="guildStore.currentGuild.id">
      <h1 class="main-heading">{{ guildStore.currentGuild.name }}</h1>
      <template v-if="this.guildStore.currentGuildAppData">
        <section class="nav-menu" role="navigation">
          <button
            class="nav-tab"
            :class="{ selected: tab === 'tracked-projects' }"
            @click="tab = 'tracked-projects'"
          >
            Tracked Projects
          </button>
          <button
            class="nav-tab"
            :class="{ selected: tab === 'settings' }"
            @click="tab = 'settings'"
          >
            Settings
          </button>
        </section>
        <hr class="divider" />
        <section
          v-if="tab === 'tracked-projects'"
          class="tracked-projects-content"
        >
          <TrackedProjectList />
        </section>
        <section v-else-if="tab === 'settings'" class="settings-content">
          <h2>Settings</h2>
          <div class="setting-item">
            <input
              type="number"
              id="changelogMaxChars"
              value="4000"
              min="3"
              max="4000"
            />
            <label for="changelogMaxChars">Maximum length of changelogs</label>
          </div>
        </section>
      </template>
      <template v-else>
        <div>
          It doesn't appear that Modrunner is present in this server. You should
          invite it using this <a href="http://invite.modrunner.net/">link</a>!
        </div>
      </template>
    </template>
    <template v-else>
      <h1 class="main-heading no-selection-text">
        Select a server from the list on the right to get started.
      </h1>
    </template>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useGuildStore } from '@/stores/guild'

import TrackedProjectList from '@/components/ui/TrackedProjectList.vue'

import SearchIcon from '@/components/icons/SearchIcon.vue'

export default {
  name: 'ControlPanel',
  components: { TrackedProjectList },
  setup() {
    const authStore = useAuthStore()
    const guildStore = useGuildStore()
    return { authStore, guildStore }
  },
  data() {
    return {
      tab: 'tracked-projects',
      searchInput: '',
    }
  },
  async created() {
    await this.guildStore.fetchApplicationGuilds()
  },
}
</script>

<style scoped>
.selected {
  background-color: var(--color-raised-bg) !important;
}

.main-content {
  width: 100%;
  min-height: calc(100vh - 80px);
}

.main-content > * {
  margin: 1rem 3.75rem;
}

.nav-menu > .nav-tab {
  color: var(--color-text-dark);
  background-color: transparent;
  border: transparent;
  border-radius: 0.25rem;
  padding: 0.5rem;
}

.nav-menu > .nav-tab:hover {
  cursor: pointer;
  background-color: var(--color-raised-bg);
}

.button-transparent {
  background-color: transparent;
  border: transparent;
}
</style>
