<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router'
  import NavHeader from './components/NavHeader.vue'
  import NavSidebar from '@/components/NavSidebar.vue'
  import { computed } from 'vue'

  const route = useRoute()
  const inAuth = computed(() => route.path === '/auth' || route.path === '/')
</script>

<template>
  <div v-if="!inAuth">
    <NavHeader/>
    <NavSidebar/>
  </div>
  <div
      class="text-text min-h-screen"
      :class="!inAuth && 'pl-[var(--sidebar-width)] pt-[var(--header-height)]'"
  >
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
