<script setup lang="ts">
import {ref, watch} from "vue";
import {useRoute} from "vue-router";

  const props = defineProps<{
    item: ISidebarItem,
    activeRoute?: string,
    isFoldable?: boolean
  }>()

  export interface ISidebarItem {
    name: string,
    href: string,
    icon: string,
    subItems?: ISidebarSubItem[],
    cb?(): void
  }

  export interface ISidebarSubItem {
    name: string,
    href: string
  }

  const isFolded = ref<boolean>(false)

  const onClick = () => {
    if (props.item.cb)
      props.item.cb()
    if (props.isFoldable)
      isFolded.value = !isFolded.value
  }

  const route = useRoute()
  watch(route, (from, to) => {
    console.log(props.item.name, to.path === props.item.subItems?.[0].href)
  })

</script>

<template>
  <div>
    <div class="flex py-3.5 cursor-pointer pl-10 hover:bg-secondaryActive"
         :class="props.activeRoute === props.item.href && !isFoldable ? 'bg-secondaryActive' : ''"
         @click="onClick"
    >
      <div class="mr-5">
        <ion-icon :name="item.icon" class="text-xl"/>
      </div>
      <p>
        {{ item.name }}
      </p>
    </div>
    <div v-if="isFoldable && item.subItems && !isFolded" class="pl-20">
      <ul class="list-disc">
        <li v-for="subItem in item.subItems"
            class="text-sm hover:bg-secondaryActive"
            :class="props.activeRoute === subItem.href ? 'bg-secondaryActive' : ''"
        >
          <RouterLink :to="subItem.href">
            {{ subItem.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
