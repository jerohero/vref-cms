<script setup lang="ts">
import SidebarItem from '@/components/SidebarItem.vue';
import type { ISidebarItem } from '@/components/SidebarItem.vue';

defineProps<{

}>()

const items: ISidebarItem[] = [
  { name: 'Organizations', icon: 'people-outline' },
  { name: 'Users', icon: 'person-outline' },
  { name: 'Trainings', icon: 'airplane-outline' },
  { name: 'AI', icon: 'hardware-chip-outline' },
]
</script>

<template>
  <div class="bg-secondary w-[var(--sidebar-width)] h-full fixed pt-[var(--header-height)] mt-16 flex flex-col">
    <SidebarItem v-for="item in items" :item="item"/>
  </div>
</template>

<style scoped>

</style>
