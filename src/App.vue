<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Header/>
  <Sidebar/>
  <div class="pl-[var(--sidebar-width)] text-primary pt-[var(--header-height)]">
    <RouterView/>
  </div>
</template>

<style scoped>
</style>
