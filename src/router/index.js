import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import MyProjects from '../views/MyProjects.vue'
import Team from '../views/Team.vue'
import ThreeProject1 from '../views/ThreeProject1.vue'
import ThreeProjectExample from '../views/ThreeProjectExample.vue'
import building01 from '../views/building01.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/threeprojects/gunanjie',
    name: 'ThreeProject1',
    component: ThreeProject1
  },
  {
    path: '/threeprojects/example',
    name: 'ThreeProject_Example',
    component: ThreeProjectExample
  },
  {
    path: '/threeprojects/building01',
    name: 'building01',
    component: building01
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/myprojects',
    name: 'MyProjects',
    component: MyProjects
  },
  {
    path: '/team',
    name: 'Team',
    component: Team
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
