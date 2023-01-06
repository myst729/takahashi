import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Vue3TouchEvents from 'vue3-touch-events'
import router from './router'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(Vue3TouchEvents)
app.mount('#app')
