<script setup lang="ts">
  import SidebarItem from '@/components/SidebarItem.vue'
  import type { ISidebarItem } from '@/components/SidebarItem.vue'
  import { ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/stores/user'

  defineProps<{ }>()

  const route = useRoute()
  const userStore = useUserStore();

  const activeRoute = ref<string>('')

  const routes: ISidebarItem[] = [
    { name: 'Users', href: '/users', icon: 'person-outline' },
    { name: 'Trainings', href: '/trainings', icon: 'airplane-outline' }
  ]
  const foldables: ISidebarItem[] = []

  if (userStore.isSuperAdmin) {
    routes.push({ name: 'Organizations', href: '/organizations', icon: 'people-outline' })
    foldables.push(
        { name: 'AI', href: '/ai', icon: 'hardware-chip-outline', subItems: [
            { name: 'Event Types', href: '/event-types' },
            { name: 'ECAM Messages', href: '/ecam-messages' }
          ]
        }
    )
  }

  const signOutItem: ISidebarItem =
      { name: 'Sign Out', href: '/', icon: 'log-out-outline', cb: () => { signOut() }}

  const signOut = () => {
    userStore.logout()
  }

  watch(route, (from, to) => {
    activeRoute.value = to.path
  })
</script>

<template>
  <div class="bg-secondary fixed pt-[var(--header-height)] flex flex-col justify-between
              w-[var(--sidebar-width)] min-w-[15rem] h-full"
  >
    <div class="mt-16">
      <RouterLink v-for="route in routes" :to="route.href">
        <SidebarItem :item="route" :activeRoute="activeRoute"/>
      </RouterLink>
      <SidebarItem v-for="foldable in foldables" :item="foldable" :active-route="activeRoute" :is-foldable="true"/>
    </div>
    <div class="mb-5">
      <SidebarItem :item="signOutItem"/>
    </div>
  </div>
</template>

<style scoped>

</style>
