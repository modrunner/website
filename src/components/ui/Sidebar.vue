<template>
  <section role="navigation">
    <div class="dropdown-menu">
      <Dropdown
        :options="createOptions(userStore.guilds)"
        :placeholder="{ text: 'Select a server' }"
      />
    </div>
    <button class="buttony-button">
      <h1>buttony button</h1>
    </button>
  </section>
</template>

<script>
import { useUserStore } from '@/stores/user'

import Dropdown from '@/components/ui/Dropdown.vue'

import placeholderImage from '@/assets/images/utils/icon_placeholder.png'

export default {
  components: {
    Dropdown,
    placeholderImage,
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      selectedServer: '',
      serverOptions: [],
    }
  },
  methods: {
    toggleItem(server) {
      this.selectedServer = server.id
      this.guildStore.currentGuild.id = server.id
      this.guildStore.currentGuild.name = server.name
    },
    serverIconUrl(server) {
      return server.icon
        ? `https://cdn.discordapp.com/icons/${server.id}/${server.icon}.webp`
        : placeholderImage
    },
    createOptions(options) {
      return options.map((opt) => {
        return {
          id: opt.id,
          img: opt.icon,
          text: opt.name,
        }
      })
    },
  },
  mounted() {
    for (const server of this.userStore.guilds) {
      this.serverOptions.push({
        id: server.id,
        img: server.icon,
        text: server.name,
      })
    }
  },
}
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  border-right: 1px solid var(--color-text);
  min-height: 100vh;
}

.dropdown-menu {
  min-width: 250px;
  overflow-x: hidden;
  border: 1px solid var(--color-text);
  border-radius: 0.25rem;
  position: relative;
}

.buttony-button {
  background-color: var(--color-bg);
}
</style>
