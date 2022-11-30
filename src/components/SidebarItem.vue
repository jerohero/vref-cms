<script setup lang="ts">
defineProps<{
  item: ISidebarItem
}>()

export interface ISidebarItem {
  name: string,
  icon: string
}
</script>

<template>
  <div class="flex py-3.5 pl-10 hover:bg-secondaryActive">
    <div class="mr-5">
      <ion-icon :name="item.icon" class="text-xl"/>
    </div>
    <p>
      {{item.name}}
    </p>
  </div>
</template>

<style scoped>

</style>
