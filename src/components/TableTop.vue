<script setup lang="ts">
import Button from "@/components/Button.vue";
import Search from "@/components/Search.vue";

defineProps<{

}>()
</script>

<template>
  <div class="py-4 px-6 flex justify-between items-center">
    <div>
      <p class="text-sm text-text">
        Showing
        <span class="font-medium">1</span>
        to
        <span class="font-medium">10</span>
        of
        <span class="font-medium">97</span>
        results
      </p>
    </div>
    <div class="flex gap-8">
      <Search/>
      <Button/>
    </div>
  </div>
</template>

<style scoped>

</style>
