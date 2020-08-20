import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'Events',
    path: '/events',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/EventsPage.vue')
  },
  {
    name: 'Event',
    path: '/event/:id',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/EventPage.vue')
  },
  {
    path: '*',
    redirect: '/events'
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
