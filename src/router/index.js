import { createRouter, createWebHashHistory } from 'vue-router'
import SlidePage from '../components/SlidePage.vue'

var routes = [
  { path: '/:page(\\d+)', component: SlidePage },
  { path: '/:pathMatch(.*)', redirect: '/1' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
