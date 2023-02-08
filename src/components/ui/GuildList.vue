<template>
  <section
    class="sidebar"
    :class="{ closed: isSidebarClosed }"
    role="navigation"
  >
    <div class="menu-title">
      <h1 class="title">Your Servers</h1>
      <IconButton
        class="menu-toggle"
        type="button"
        alt="Menu"
        @click="isSidebarClosed = !isSidebarClosed"
      >
        <HamburgerIcon class="menu-icon" />
      </IconButton>
    </div>
    <div class="search-bar">
      <SearchIcon class="search-icon" />
      <input
        class="search-input"
        v-model.trim="searchInput"
        placeholder="Search for servers"
      />
    </div>
    <section v-if="userStore.guilds" class="list">
      <GuildListItems :guilds="userStore.guilds" :searchInput="searchInput" />
    </section>
    <div v-else class="empty-list-text">Log in to see your servers here.</div>
  </section>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useGuildStore } from '@/stores/guild'
import { useUserStore } from '@/stores/user'

import GuildListItems from '@/components/ui/GuildListItems.vue'
import IconButton from '@/components/ui/IconButton.vue'

import HamburgerIcon from '@/components/icons/HamburgerIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'

export default {
  name: 'GuildList',
  components: {
    GuildListItems,
    IconButton,
    HamburgerIcon,
    SearchIcon,
    IconButton,
  },
  setup() {
    const authStore = useAuthStore()
    const guildStore = useGuildStore()
    const userStore = useUserStore()
    return { authStore, guildStore, userStore }
  },
  data() {
    return {
      searchInput: '',
      isSidebarClosed: false,
    }
  },
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 350px;
  max-width: 100vw;
  max-height: calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  /* border: 0.5rem solid var(--color-bg); */
  overflow-y: auto;
  transition: transform 0.5s ease-in-out;
  background-color: var(--color-bg);
  margin: 0 0.5rem;
}

.menu-icon {
  height: 1.5rem;
  width: 1.5rem;
}

.sidebar > .menu-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
}

.sidebar > .menu-title > .title {
  margin: 0 10px;
  box-sizing: border-box;
}

.sidebar > .search-bar {
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 1rem 10px;
  border-radius: 5px;
  padding: 0.25rem;
  background-color: var(--color-raised-bg);
  transition: opacity 0.5s ease-in-out;
}

.sidebar > .search-bar > .search-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-left: 0.5rem;
}

.sidebar > .search-bar > .search-input {
  background-color: var(--color-raised-bg);
  color: var(--color-text-dark);
  padding: 0.5rem;
  width: 100%;
}

.sidebar > .search-bar > .search-input:focus {
  outline: none;
}

.sidebar > .list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  transition: opacity 0.5s ease-in-out;
}

.sidebar > .empty-list-text {
  margin: 0.5rem auto;
  transition: opacity 0.5s ease-in-out;
}

.button-transparent {
  background-color: transparent;
  border: transparent;
}

.control-button {
  display: flex;
  padding: 0.5rem;
  color: var(--color-text);
  border-radius: 50%;
  border: 2px solid transparent;
  box-sizing: border-box;
}

.control-button:hover {
  cursor: pointer;
  background-color: var(--color-raised-bg);
}

.control-button svg {
  height: 1.5rem;
  width: 1.5rem;
}

.closed {
  transform: translate(-308px);
  position: absolute;
  overflow: hidden;
}

.closed .list,
.closed .empty-list-text,
.closed .search-bar {
  opacity: 0;
}
</style>
