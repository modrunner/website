<template>
  <div>
    <h1 v-if="guilds.length">Your Servers ({{ guilds.length }})</h1>
    <h1 v-else>No servers detected. Login to get started.</h1>
    <GuildListItem
        v-for="guild in guilds"
        :name="guild.name"
        :summary="guild.summary"
        :icon-url="guild.icon"
    />
  </div>
</template>

<script>
import GuildListItem from "@/components/dashboard/GuildListItem.vue";

export default {
  name: 'GuildList',
  components: { GuildListItem },
  data() {
    return {
      guilds: [],
    }
  },
  async mounted() {
    let code;
    if (window.location.search) code = new URLSearchParams(window.location.search).get('code').toString();
    if (!code) {
      location.href = 'https://discord.com/api/oauth2/authorize?client_id=968164973467541574&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2F&response_type=code&scope=identify';
      return;
    }

    let tokenRes;
    try {
      tokenRes = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id: '',
          client_secret: '',
          code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://127.0.0.1:5173/',
          scope: 'identify',
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (error) {
      console.error(error);
    }

    const oauthData = await tokenRes.json();
    if (!oauthData) return;

    let userGuildData = await fetch('https://discord.com/api/users/@me/guilds', {
      headers: {
        authorization: `${oauthData.token_type} ${oauthData.access_token}`,
      },
    });

    userGuildData = await userGuildData.json();
    for (const guild of userGuildData) {
      this.guilds.push({
        name: guild.name,
        summary: guild.summary,
        icon: `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp`
      })
    }
  }
}
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>
