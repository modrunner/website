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
      <button type="button" class="theme-toggle" @click="toggleTheme">
        <SunIcon v-if="currentTheme === 'light'" />
        <MoonIcon v-else />
      </button>
      <template v-if="authStore.isAuthorized">
        <div class="user-card">
          <img
            class="user-avatar"
            :src="userStore.avatarUrl"
            alt="user avatar"
          />
          {{ userStore.user.username }}#{{ userStore.user.discriminator }}
        </div>
      </template>
      <template v-else>
        <button class="icon-link login-button" @click="login">
          <DiscordIcon class="icon" /> Sign in with Discord
        </button>
      </template>
    </div>
  </header>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
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
    const authStore = useAuthStore()
    const userStore = useUserStore()
    return { authStore, userStore }
  },
  data() {
    return {
      currentTheme: 'dark',
    }
  },
  methods: {
    login() {
      location.href = `${
        import.meta.env.VITE_OAUTH2_URL
      }&state=${encodeURIComponent(this.authStore.generateNonce())}`
    },
    async logout() {
      await this.authStore.clearStore()
      this.userStore.clearStore()
      location.href = '/'
    },
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

.user-card {
  /* Positioning and sizing */
  display: flex;
  align-items: center;
  gap: 1rem;

  /* Element styling */
  border: 1px solid var(--color-text);
  border-radius: 1rem;

  /* Padding and margins */
  padding: 0.25rem 1rem;
  margin-left: 1rem;
}

.user-avatar {
  /* Sizing */
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
}

.login-button {
  /* Element styling */
  color: var(--color-text-inverted);
  background: var(--color-brand);
  border: transparent;
  border-radius: 1rem;

  /* Text styles */
  font-family: var(--font-standard);
  font-size: 1rem;

  /* Padding and margins */
  margin: 0 1rem;
}

.login-button .icon {
  /* Element styling */
  color: var(--color-text-inverted);
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
