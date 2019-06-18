import Vue from 'vue'
import VueRouter from 'vue-router'
import Slide from '../components/Slide'

Vue.use(VueRouter)

var routes = [
  { path: '/:page(\\d+)', component: Slide },
  { path: '*', redirect: '/1' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
