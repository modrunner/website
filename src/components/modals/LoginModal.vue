<template>
    <div id="modal">
      <h1>Login to use the dashboard</h1>
      <button @click="login">Login with Discord</button>
    </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: 'LoginModal',
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  methods: {
    async login() {
      location.href = import.meta.env.VITE_OAUTH2_URL + `&state=${btoa(this.authStore.generateStateString())}`;
    },
  },
}
</script>

<style scoped>

#modal[data-v-8e255f99] {
  background-color: #2c3e50;
  border-radius: 25px;
  display: grid;
  row-gap: 20px;
  max-height: 400px;
  max-width: 500px;
  position: absolute;
  top: 50vh;
  left: 50vw;
  transform: translate(-50%, -50%);
  padding: 20px;
}
h1[data-v-8e255f99] {
  font-size: 1em;
}
button[data-v-8e255f99] {
  background-color: #5865F2;
  border-radius: 20px;
}

</style>
