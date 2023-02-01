<template>
  <div id="guild-view">
    <template v-if="guildStore.guild">
      <h1>{{ guildStore.guild.name }}</h1>
      <template v-if="guildStore.isBotPresent">
        <p>Total tracked projects: {{ guildStore.guildProjects.length }}</p>
      </template>
      <template v-else>
        <p>
          It doesn't appear that Modrunner is present in this server. You should
          invite it using this <a href="http://invite.modrunner.net/">link</a>!
        </p>
      </template>
    </template>
    <template v-else></template>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'
import { useGuildStore } from '@/stores/guild'

export default {
  name: 'ControlPanel',
  components: {},
  setup() {
    const authStore = useAuthStore()
    const guildStore = useGuildStore()
    return { authStore, guildStore }
  },
}
</script>

<style scoped></style>
