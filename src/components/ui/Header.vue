<template>
  <header>
    <div class="nav-container left-side">
      <Logo class="logo" />
      <a href="https://modrunner.net/introduction">Docs</a>
      <a href="https://modrunner.net/blog">Blog</a>
    </div>
    <div class="nav-container right-side">
      <a href="http://invite.modrunner.net" class="icon-link"
        ><DoorEnterIcon class="icon" /> Add Bot to Server</a
      >
      <button class="icon-link login-button">
        <DiscordIcon class="icon" /> Sign in with Discord
      </button>
      <button type="button" class="theme-toggle" @click="toggleTheme">
        <SunIcon v-if="currentTheme === 'light'" />
        <MoonIcon v-else />
      </button>
    </div>
  </header>
</template>

<script>
import { useUserStore } from '@/stores/user'

import DoorEnterIcon from '@/components/icons/DoorEnterIcon.vue'
import Logo from '@/components/icons/Logo.vue'
import SunIcon from '@/components/icons/SunIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import DiscordIcon from '@/components/icons/DiscordIcon.vue'

export default {
  name: 'Header',
  components: {
    DoorEnterIcon,
    Logo,
    SunIcon,
    MoonIcon,
    DiscordIcon,
  },
  setup() {
    const userStore = useUserStore()
    return { userStore }
  },
  data() {
    return {
      currentTheme: 'dark',
    }
  },
  methods: {
    toggleTheme() {
      if (this.currentTheme === 'light') {
        this.currentTheme = 'dark'
        document.documentElement.classList.replace('light-mode', 'dark-mode')
      } else {
        this.currentTheme = 'light'
        document.documentElement.classList.replace('dark-mode', 'light-mode')
      }
    },
  },
}
</script>

<style scoped>
header {
  /* Positioning and sizing */
  display: flex;
  justify-content: space-between;
  position: sticky;
  top: 0;
  box-sizing: border-box;
  min-height: 60px;

  /* Element styles */
  box-shadow: 0 1px 2px 0 #0000001a;

  /* Padding and margins */
  padding: 0.5rem 1rem;
}

.nav-container {
  /* Positioning and sizing */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  /* Sizing */
  height: 2rem;
  width: 2rem;

  /* Padding and margins */
  margin-right: 1.5rem;
}

.icon-link {
  /* Positioning and sizing */
  display: flex;
  justify-content: center;
  align-items: center;

  /* Text styles */
  color: var(--color-text);
  font-weight: var(--font-weight-medium);

  /* Padding and margins */
  padding: 0.25rem 0.75rem;
}

.icon-link {
  /* Element styles */
  cursor: pointer;
}

.icon-link .icon {
  /* Sizing */
  height: 1.5rem;
  width: 1.5rem;

  /* Padding and margins */
  margin-right: 0.25rem;
}

.login-button {
  /* Element styling */
  background: transparent;
  border: transparent;
  border-radius: 0.5rem;

  /* Text styles */
  font-family: unset;
}

.login-button:hover {
  /* Element styling */
  color: var(--color-brand);
}

.theme-toggle {
  /* Positioning and sizing */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  width: 2rem;

  /* Element styles */
  background: transparent;
  border: transparent;
  border-radius: 50%;
}

.theme-toggle:hover {
  cursor: pointer;
  background-color: var(--color-raised-bg);
}

a {
  /* Text styling */
  color: var(--color-text);
  font-weight: 500;

  /* Padding and margins */
  padding: 0.25rem 0.75rem;
}

a:hover {
  /* Text styling */
  color: var(--color-brand);
  text-decoration: none;
}
</style>
