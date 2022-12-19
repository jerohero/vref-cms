<script setup lang="ts">
defineProps<{
  text: string,
  type?: string,
  fullWidth?: boolean
}>()
</script>

<template>
  <button :type="type || 'submit'"
          class="bg-primary px-3 py-2 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-offset-primary
          focus:ring-offset-2"
          :class="fullWidth && 'w-full'"
  >
    {{ text }}
  </button>
</template>
