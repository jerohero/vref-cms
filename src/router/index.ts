import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import TrainingsView from '@/views/TrainingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../views/AuthView.vue')
    },
    {
      path: '/trainings',
      alias: '/',
      name: 'trainings',
      component: () => TrainingsView,
      meta: { requiresAuth: true }
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: () => import('../views/OrganizationsView.vue'),
      meta: {
        requiresAuth: true,
        requiresSuperAdmin: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/event-types',
      name: 'event-types',
      component: () => import('../views/EventTypesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/ecam-messages',
      name: 'ecam-messages',
      component: () => import('../views/EcamMessagesView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    return next('/auth')
  }

  if (to.meta.requiresSuperAdmin && !userStore.isSuperAdmin) {
    return next(from.path)
  }

  return next()
})

export default router
