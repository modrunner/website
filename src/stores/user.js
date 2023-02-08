import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import PlaceholderAvatar from '@/assets/images/utils/icon_placeholder.png'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentTheme: 'dark',
    guilds: [],
    user: {
      id: '',
      username: '',
      discriminator: '',
      avatar: PlaceholderAvatar,
    },
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
    },
    async getCurrentUser() {
      const data = await fetch('https://discord.com/api/users/@me', {
        headers: { authorization: this.authStore.authHeader },
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

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

      const filteredGuilds = guilds.filter(
        (guild) => (guild.permissions & 0x20) == 0x20
      )

      this.guilds = [...filteredGuilds]
      this.guilds.sort((a, b) => {
        return a.name.localeCompare(b.name)
      })

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
