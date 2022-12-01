<script setup lang="ts">
  import SidebarItem from '@/components/SidebarItem.vue';
  import type { ISidebarItem } from '@/components/SidebarItem.vue';
  import {ref, watch} from "vue";
  import {useRoute} from "vue-router";

  defineProps<{

  }>()

  const activePath = ref<string>('')
  const route = useRoute()

  const items: ISidebarItem[] = [
    { name: 'Organizations', href: '/organizations', icon: 'people-outline' },
    { name: 'Users', href: '/users', icon: 'person-outline' },
    { name: 'Trainings', href: '/trainings', icon: 'airplane-outline' },
    { name: 'AI', href: '/ai', icon: 'hardware-chip-outline' },
  ]

  watch(route, (from, to) => {
    activePath.value = to.path
  })
</script>

<template>
  <div class="bg-secondary w-[var(--sidebar-width)] h-full fixed pt-[var(--header-height)] mt-16 flex flex-col">
    <SidebarItem v-for="item in items" :item="item" :active="activePath === item.href"/>
  </div>
</template>

<style scoped>

</style>
