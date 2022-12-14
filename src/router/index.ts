import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/organizations',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ai',
      name: 'ai',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/event-types',
      name: 'event-types',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/ecam-messages',
      name: 'ecam-messages',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

router.beforeEach((to, from) => {
  let isAuthenticated = false;

  if (!isAuthenticated && to.name !== 'auth') {
    return { name: 'auth' }
  }

  return true
})

export default router
