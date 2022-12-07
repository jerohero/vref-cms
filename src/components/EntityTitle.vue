<script setup lang="ts">
defineProps<{
  title: string,
  organization: string
}>()
</script>

<template>
  <div class="flex">
    <h2 class="text-text text-4xl font-bold mr-3">
      {{ title }}
    </h2>
    <div class="my-auto">
      <span class="text-text text-xs bg-secondary px-1.5 py-1 rounded inline">
        {{ organization }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
