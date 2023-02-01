import { defineStore } from 'pinia'

const token_revoke_url = 'https://discord.com/api/oauth2/token/revoke'
const client_id = import.meta.env.VITE_CLIENT_ID
const client_secret = import.meta.env.VITE_CLIENT_SECRET
const redirect_uri = import.meta.env.VITE_REDIRECT_URI

export const useAuthStore = defineStore('auth', {
  persist: true,
  state: () => ({
    accessToken: null,
    expiresAt: null,
    refreshToken: null,
    state: null,
    tokenType: null,
  }),
  getters: {
    isAuthorized: (state) => {
      return state.accessToken && state.expiresAt > Date.now() ? true : false
    },
    authHeader: (state) => {
      return `${state.tokenType} ${state.accessToken}`
    },
  },
  actions: {
    async getToken(code, state) {
      if (!state || this.state !== state) {
        throw new Error(
          `State parameter is missing or does not match!\nStored state: ${this.state}\nRecieved state: ${state}`
        )
      }

      const data = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
          client_id,
          client_secret,
          grant_type: 'authorization_code',
          code,
          redirect_uri,
        }),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

      console.log(
        `Access token aquired and will expire on ${new Date(
          Date.now() + data.expires_in * 1000
        )}`
      )

      this.accessToken = data.access_token
      this.expiresAt = Date.now() + data.expires_in * 1000
      this.refreshToken = data.refresh_token
      this.state = null
      this.tokenType = data.token_type
    },
    generateNonce() {
      let nonce = ''
      const randomNumber = Math.floor(Math.random() * 10)

      for (let i = 0; i < 20 + randomNumber; i++) {
        nonce += String.fromCharCode(33 + Math.floor(Math.random() * 94))
      }

      console.debug('Generated nonce')
      this.state = nonce
      return nonce
    },
    async clearStore() {
      // does not worky, docs suck
      const data = await fetch('https://discord.com/api/oauth2/token/revoke', {
        method: 'POST',
        body: new URLSearchParams({
          client_id,
          client_secret,
        }),
        headers: {
          authorization: this.authHeader,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
        .then((response) => response.json())
        .catch((error) => console.error(error))

      console.log(data)

      this.accessToken = null
      this.expiresAt = null
      this.refreshToken = null
      this.tokenType = null
      console.debug('Cleared the auth store and revoked credientials')
    },
  },
})
