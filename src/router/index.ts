import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/organizations',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/trainings',
      name: 'trainings',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ai',
      name: 'ai',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/event-types',
      name: 'event-types',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ecam-messages',
      name: 'ecam-messages',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next('/auth')
  }

  return next()
})

export default router
