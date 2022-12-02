<script setup lang="ts">
import Button from "@/components/Button.vue";
import Search from "@/components/Search.vue";

defineProps<{

}>()
</script>

<template>
  <div class="py-4 px-6 flex justify-between items-center">
    <p>
      429 results
    </p>
    <div class="flex gap-8">
      <Search/>
      <Button/>
    </div>
  </div>
</template>

<style scoped>

</style>
