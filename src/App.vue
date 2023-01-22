<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router'
  import Header from './components/Header.vue'
  import Sidebar from '@/components/Sidebar.vue'
  import { useUserStore } from '@/stores/user'
  import { computed } from 'vue'

  const userStore = useUserStore()
  const route = useRoute()
  const inAuth = computed(() => route.path === '/auth')
</script>

<template>
  <div v-if="!inAuth">
    <Header/>
    <Sidebar/>
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
