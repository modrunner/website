import { createApp } from 'vue'
import { createPinia } from 'pinia';
import piniaPluginPersistedState from 'pinia-plugin-persistedstate';
import App from './App.vue'
import './assets/main.css'

const pinia = createPinia()
    .use(piniaPluginPersistedState);

createApp(App)
    .use(pinia)
    .mount('#app');
