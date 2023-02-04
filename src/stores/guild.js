import { defineStore } from 'pinia'

export const useGuildStore = defineStore('guild', {
  state: () => ({
    applicationGuilds: [],
    currentGuild: {
      id: null,
      name: null,
      projects: [],
    },
  }),
  getters: {
    currentGuildAppData(state) {
      return state.applicationGuilds.find(
        (guild) => guild.id === state.currentGuild.id
      )
    },
  },
  actions: {
    async fetchApplicationGuilds() {
      let res
      try {
        res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/guilds`)
        this.applicationGuilds = await res.json()
      } catch (error) {
        console.error(error)
      }
    },
    async fetchCurrentGuildProjects() {
      let res
      try {
        res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/guilds/${
            this.guild.id
          }/projects`
        )
        this.currentGuild.projects = await res.json()
      } catch (error) {
        console.error(error)
      }
    },
  },
})
