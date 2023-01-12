<template>
  <template v-if="this.accessToken">
    <h1>Login complete</h1>
    <p>Welcome, {{ this.user.username + '#' + this.user.discriminator }}</p>
  </template>
  <LoginModal v-else />
</template>

<script>
import {useAuthStore} from '@/stores/auth';
import LoginModal from "@/components/modals/LoginModal.vue";

export default {
  name: 'index',
  components: {LoginModal},
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      accessToken: null,
      user: null,
    }
  },
  methods: {
    async getUser() {
      let res;
      try {
        res = await fetch('https://discord.com/api/users/@me', {
          headers: {
            authorization: `${this.authStore.authData.tokenType} ${this.accessToken}`,
          },
        });
      } catch (error) {
        console.error(error);
      }

      return await res.json();
    },
  },
  async mounted() {
    let code, state;
    if (location.search) {
      code = new URLSearchParams(location.search).get('code').toString();
      state = new URLSearchParams(location.search).get('state').toString();
    }

    this.accessToken = await this.authStore.getAccessToken(code, state);
    this.user = await this.getUser();
  },
};
</script>

<style scoped>

</style>
