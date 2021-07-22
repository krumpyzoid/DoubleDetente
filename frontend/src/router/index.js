import { createRouter, createWebHistory } from 'vue-router'
import Client from '../views/Client.vue'

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/',
        component: () => import(/* webpackChunkName: "about" */ '../views/Accueil.vue')
      },
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: '/prestations/:slug',
        component: () => import(/* webpackChunkName: "about" */ '../views/Prestation.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/backoffice',
    name: 'Backoffice',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Backoffice.vue'),
    children: [
      {
        path: '/backoffice/calendar',
        component: () => import(/* webpackChunkName: "about" */ '../views/Calendar.vue')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || {top: 0}
  }
  
})

export default router
