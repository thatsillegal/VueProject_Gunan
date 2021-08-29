import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import MyProjects from '../views/MyProjects.vue'
import Team from '../views/Team.vue'
import ThreeProject1 from '../views/ThreeProject1.vue'
import ThreeProjectExample from '../views/ThreeProjectExample.vue'
import building01 from '../views/building01.vue'
import building02 from '../views/building02.vue'
import building03 from '../views/building03.vue'
import building04 from '../views/building04.vue'
import building05 from '../views/building05.vue'
import building06 from '../views/building06.vue'
import building07 from '../views/building07.vue'
import building08 from '../views/building08.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'myprojects',
    component: MyProjects
  },
  {
    path: '/home',
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
    path: '/threeprojects/building02',
    name: 'building02',
    component: building02
  },
  {
    path: '/threeprojects/building03',
    name: 'building03',
    component: building03
  },
  {
    path: '/threeprojects/building04',
    name: 'building04',
    component: building04
  },
  {
    path: '/threeprojects/building05',
    name: 'building05',
    component: building05
  },
  {
    path: '/threeprojects/building06',
    name: 'building06',
    component: building06
  },
  {
    path: '/threeprojects/building07',
    name: 'building07',
    component: building07
  },
  {
    path: '/threeprojects/building08',
    name: 'building08',
    component: building08
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
