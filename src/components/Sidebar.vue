<script setup lang="ts">
  import SidebarItem from '@/components/SidebarItem.vue';
  import type { ISidebarItem } from '@/components/SidebarItem.vue';
  import {ref, watch} from "vue";
  import {useRoute} from "vue-router";

  defineProps<{

  }>()

  const activeRoute = ref<string>('')
  const route = useRoute()

  const routes: ISidebarItem[] = [
    { name: 'Organizations', href: '/organizations', icon: 'people-outline' },
    { name: 'Users', href: '/users', icon: 'person-outline' },
    { name: 'Trainings', href: '/trainings', icon: 'airplane-outline' }
  ]
  const foldables: ISidebarItem[] = [
    { name: 'AI', href: '/ai', icon: 'hardware-chip-outline', subItems: [
        { name: 'Event Types', href: '/event-types' },
        { name: 'ECAM Messages', href: '/ecam-messages' }
      ]
    },
  ]
  const signOutItem: ISidebarItem =
      { name: 'Sign Out', href: '/', icon: 'log-out-outline', cb: () => { signOut() }}

  const signOut = () => {
    console.log('Signed out') // TODO
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
