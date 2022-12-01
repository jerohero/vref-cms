<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  item: ISidebarItem,
  active: boolean
}>()

export interface ISidebarItem {
  name: string,
  href: string,
  icon: string
}
</script>

<template>
  <RouterLink :to="item.href"
              class="flex py-3.5 pl-10 hover:bg-secondaryActive"
              :class="active ? 'bg-secondaryActive' : ''">
    <div class="mr-5">
      <ion-icon :name="item.icon" class="text-xl"/>
    </div>
    <p>
      {{item.name}}
    </p>
  </RouterLink>
</template>

<style scoped>

</style>
