<template>
  <header class="site-header" role="presentation">
    <section class="navbar columns" role="navigation">
      <section class="logo" role="presentation">
        <a href="">
          <img
            class="logo-banner"
            src="./assets/images/logo_banner.png"
            alt="the Modrunner logo"
            aria-current="page"
            aria-label="The Modrunner logo"
          />
        </a>
      </section>
      <section class="user-controls" role="navigation">
        <IconButton
          type="link"
          href="http://invite.modrunner.net"
          alt="Invite the bot to a server"
        >
          <PlusIcon class="icon" />
        </IconButton>
        <IconButton
          type="button"
          alt="Change the current theme"
          @click="changeTheme"
        >
          <MoonIcon v-if="colorMode === 'light'" class="icon moon-icon" />
          <SunIcon v-else class="icon sun-icon" />
        </IconButton>
        <div
          v-if="userStore.user.id !== ''"
          class="dropdown"
          :class="{ closed: !isDropdownOpen }"
          tabindex="0"
          @mouseover="isDropdownOpen = true"
          @focus="isDropdownOpen = true"
          @mouseleave="isDropdownOpen = false"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <button class="control" value="Profile Dropdown">
            <img
              class="icon user-avatar"
              :src="userStore.userAvatarUrl"
              alt="Your avatar picture"
              aria-hidden="true"
            />
          </button>
          <div class="content card">
            <div class="username">
              {{ userStore.user.username }}#{{ userStore.user.discriminator }}
            </div>
            <hr class="divider" />
            <button class="item button-transparent" @click="logout">
              <LogoutIcon class="icon" />
              <span class="dropdown-item_text">Log out</span>
            </button>
          </div>
        </div>
        <button v-else class="header-button brand-button" @click="login">
          <DiscordIcon class="icon discord-icon" aria-hidden="true" />
          Sign in with Discord
        </button>
      </section>
    </section>
  </header>

  <main>
    <section class="main">
      <GuildList />
      <ControlPanel />
    </section>
  </main>

  <footer>footer</footer>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useUserStore } from '@/stores/user'

import ControlPanel from '@/components/ui/ControlPanel.vue'
import GuildList from '@/components/ui/GuildList.vue'
import IconButton from '@/components/ui/IconButton.vue'

import DiscordIcon from '@/components/icons/DiscordIcon.vue'
import DropdownIcon from '@/components/icons/DropdownIcon.vue'
import LogoutIcon from '@/components/icons/LogoutIcon.vue'
import MoonIcon from '@/components/icons/MoonIcon.vue'
import SunIcon from '@/components/icons/SunIcon.vue'

import PlusIcon from '@/components/icons/PlusIcon.vue'

export default {
  name: 'App',
  components: {
    ControlPanel,
    GuildList,
    IconButton,
    DiscordIcon,
    DropdownIcon,
    LogoutIcon,
    MoonIcon,
    PlusIcon,
    SunIcon,
  },
  setup() {
    const authStore = useAuthStore()
    const userStore = useUserStore()
    return { authStore, userStore }
  },
  data() {
    return {
      isDropdownOpen: false,
      owner: 'smcmo',
      slug: 'modrunner-dashboard',
      branch: 'main',
      hash: 'unknown',
      isMobileMenuOpen: false,
      hideDropdown: false,
      colorMode: 'dark',
      PlusIcon,
    }
  },
  computed: {
    authUrl() {
      return `${import.meta.env.VITE_OAUTH2_URL}&state=${encodeURIComponent(
        this.authStore.generateNonce()
      )}`
    },
  },
  async beforeCreate() {
    if (location.search) {
      const code = new URLSearchParams(location.search).get('code').toString()
      const state = new URLSearchParams(location.search).get('state').toString()
      await this.authStore.getToken(code, state)

      history.replaceState({}, '', '/')
    }

    if (this.authStore.isAuthorized) {
      await this.userStore.getCurrentUser()
      await this.userStore.getCurrentUserGuilds()
    }
  },
  mounted() {
    document.documentElement.classList.add(`${this.colorMode}-mode`)
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
    changeTheme() {
      if (this.colorMode === 'light') {
        this.colorMode = 'dark'
        document.documentElement.classList.replace('light-mode', 'dark-mode')
      } else {
        this.colorMode = 'light'
        document.documentElement.classList.replace('dark-mode', 'light-mode')
      }
    },
  },
}
</script>

<style scoped>
.site-header {
  margin-bottom: var(--spacing-card-md);
  max-height: 4.25rem;
}

@media screen and (min-width: 1920px) {
  .site-header {
    max-width: 1920px;
    margin-left: auto;
    margin-right: auto;
  }
}

.icon {
  height: 1.5rem;
  width: 1.5rem;
}

.navbar {
  background-color: var(--color-bg-light);
  padding: var(--spacing-card-sm);
  margin: 0 var(--spacing-card-lg);
  max-width: 1920px;
  margin-left: auto;
  margin-right: auto;
  justify-content: space-between;
  box-shadow: 0 0 3px black;
}

.logo {
  display: flex;
  justify-content: space-between;
  color: var(--color-text-dark);
}

.logo img {
  height: 3rem;
  width: auto;
}

.logo-banner {
  align-items: center;
}

.header-button {
  display: flex;
  font-size: var(--size-font-nm);
  align-items: center;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
}

.user-controls {
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  min-width: 6rem;
  gap: 1rem;
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

.dropdown {
  position: relative;
  margin: 0 0.5rem;
}

.dropdown > .control {
  align-items: center;
  background: none;
  display: flex;
  justify-content: center;
  padding: 0;
  border: transparent;
}

.dropdown > .control > .user-avatar {
  border-radius: 50%;
  height: 2rem;
  width: 2rem;
  outline: 2px solid var(--color-raised-bg);
  transition: outline-color 0.1s ease-in-out;
}

.dropdown:hover > .control > .user-avatar {
  cursor: pointer;
  outline: 2px solid var(--color-brand);
}

.dropdown > .content {
  border: 1px solid var(--color-divider-dark);
  margin: 0.5rem 1rem 0 0;
  max-width: 25rem;
  min-width: 12rem;
  opacity: 0;
  padding: 1rem;
  position: absolute;
  right: -1rem;
  transform: scaleY(0.9);
  transform-origin: top;
  transition: all 0.1s ease-in-out 0.05s, color 0s ease-in-out 0s,
    background-color 0s ease-in-out 0s, border-color 0s ease-in-out 0s;
  visibility: hidden;
  width: max-content;
  z-index: 1;
  box-shadow: var(--shadow-floating);
}

.dropdown > .content > .divider {
  background-color: var(--color-divider-dark);
  border: none;
  color: var(--color-divider-dark);
  height: 1px;
  margin: 0.5rem 0;
}

.dropdown > .content > .item {
  align-items: center;
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: inherit;
  display: flex;
  padding: 0.5rem;
  width: 100%;
}

.dropdown > .content > .item:hover {
  cursor: pointer;
  background-color: var(--color-divider);
}

.dropdown > .content > .item > .icon {
  margin-right: 0.5rem;
  height: 20px;
  width: 20px;
}

.dropdown:hover:not(.closed) .content,
.dropdown:focus:not(.closed) .content,
.dropdown:focus-within:not(.closed) .content {
  opacity: 1;
  transform: scaleY(1);
  visibility: visible;
}

.brand-button {
  background-color: var(--color-brand);
  border: 1px solid var(--color-brand-shadow);
  border-radius: var(--size-rounded-max);
  padding: 8px 12px;
  transition: filter 0.3s ease-in-out;
}

.brand-button:hover {
  background-color: var(--color-brand-shadow);
}

.discord-icon {
  height: 1.25em;
  margin-right: 0.5em;
  vertical-align: middle;
}

.main {
  display: flex;
}
</style>
