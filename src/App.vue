<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

</script>

<template>
  <div v-if="userStore.isAuthenticated">
    <Header/>
    <Sidebar/>
  </div>
  <div
      class="text-text min-h-screen"
      :class="userStore.isAuthenticated && 'pl-[var(--sidebar-width)] pt-[var(--header-height)]'"
  >
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
