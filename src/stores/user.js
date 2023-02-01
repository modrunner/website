import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import PlaceholderIcon from '../assets/images/utils/icon_placeholder.png'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentTheme: 'dark',
    guilds: null,
    user: null,
  }),
  getters: {
    authStore() {
      return useAuthStore()
    },
    userAvatarUrl(state) {
      if (!state.user.avatar) return PlaceholderIcon
      return `https://cdn.discordapp.com/avatars/${state.user.id}/${state.user.avatar}.webp`
    },
  },
  actions: {
    clearStore() {
      this.currentTheme = 'dark'
      this.guilds = null
      this.user = null
      console.debug('Cleared the user store')
    },
    async getCurrentUser() {
      const data = await fetch('https://discord.com/api/users/@me', {
        headers: { authorization: this.authStore.authHeader },
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

      console.debug('Fetched user data')
      this.user = data
      return data
    },
    async getCurrentUserGuilds() {
      let guilds
      try {
        const res = await fetch('https://discord.com/api/users/@me/guilds', {
          headers: { authorization: this.authStore.authHeader },
        })
        guilds = await res.json()
      } catch (error) {
        console.error(error)
      }

      this.guilds = [...guilds]
      this.guilds.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })
      console.debug('Fetched user guilds')
      return this.guilds
    },
    guildIconUrl(guildId) {
      const guild = this.guilds.find((guild) => guild.id === guildId)
      if (!guild.icon) return PlaceholderIcon
      return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
    },
    guildBannerUrl(guildId) {
      const guild = this.guilds.find((guild) => guild.id === guildId)
      if (!guild.banner) return PlaceholderIcon
      return `https://cdn.discordapp.com/splashes/${guild.id}/${guild.banner}.webp`
    },
  },
})
