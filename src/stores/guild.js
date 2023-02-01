import { defineStore } from 'pinia'

export const useGuildStore = defineStore('guild', {
  state: () => ({
    botGuilds: [],
    currentGuild: null,
    guildProjects: [],
  }),
  getters: {
    isBotPresent() {
      return this.botGuilds.find((guild) => guild.id === this.guild.id)
    },
  },
  actions: {
    async saveBotGuilds() {
      try {
        const res = await fetch('http://localhost:3000/guilds/list')
        this.botGuilds = await res.json()
      } catch (error) {
        console.error(error)
      }
    },
    async saveGuildProjects() {
      if (this.isBotPresent) {
        try {
          console.log("[Guild] Saving current guild's projects")
          const res = await fetch(
            `http://localhost:3000/guilds/${this.guild.id}/projects`
          )
          this.guildProjects = await res.json()
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
})
