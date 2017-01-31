import Vue from 'vue'
import VueRouter from 'vue-router'
import * as config from 'config'
import Slide from '../components/Slide'

Vue.use(VueRouter)

var routes = [
  { path: '/:page(\\d+)', component: Slide },
  { path: '*', redirect: '/1' }
]

const router = new VueRouter({
  routes,
  mode: 'hash',
  base: config.base
})

export default router
