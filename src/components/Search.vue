<script setup lang="ts">
defineProps<{

}>()
</script>

<template>
  <div class="max-w-xs w-56">
    <div class="relative rounded-md h-full">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <ion-icon name="search-outline"
                  aria-hidden="true"
                  class="h-5 w-5 text-gray-400"
        />
      </div>
      <input name="search-vref"
             placeholder="Search.."
             class="block w-full h-full rounded-md pl-10 bg-foreground border border-text text-base
             focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  </div>
</template>
