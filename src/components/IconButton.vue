<script setup lang="ts">
defineProps<{
  icon: string,
  color?: string
}>()
</script>

<template>
  <div class="group cursor-pointer">
    <ion-icon :name="icon"
              class="transition-colors pointer-events-none"
              :class="color ? `group-hover:${ color }` : ''"
    />
  </div>
</template>
