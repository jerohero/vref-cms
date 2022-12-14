<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from "@/components/Sidebar.vue";

let isAuthenticated = false
</script>

<template>
  <Header v-if="isAuthenticated"/>
  <Sidebar v-if="isAuthenticated"/>
  <div
      class="text-text"
      :class="isAuthenticated && 'pl-[var(--sidebar-width)] pt-[var(--header-height)]'"
  >
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
