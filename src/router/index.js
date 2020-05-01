import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'Editor',
    component: () => import('../views/Editor')
  },
  {
    path: '/share',
    name: 'Share',
    component: () => import('../views/Share')
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('../views/Feedback')
  }
]

const router = new VueRouter({
  routes
})

export default router
