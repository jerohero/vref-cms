<script setup lang="ts">
  import { computed, ref } from 'vue'
  import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  } from '@headlessui/vue'
  import InputSearchSingle from "@/components/InputSearchSingle.vue";

  const props = defineProps<{
    rowItem: any,
    maxItems?: number,
    minItems?: number
  }>()

  const isAdding = ref<boolean>()
  const isUnderMax = computed(() => props.maxItems ? props.rowItem.display.length < props.maxItems : true)
  const isOverMin = computed(() => props.minItems ? props.rowItem.display.length >= props.minItems : true)

  const deleteItem = () => {

  }

  const add = () => {
    isAdding.value = true
  }
</script>

<template>
  <div class="flex gap-3">
    <span
        v-for="enabled in rowItem.display"
        @click="deleteItem"
        class="bg-background p-2 rounded-md flex items-center cursor-pointer hover:bg-backgroundDark"
    >
      {{ enabled }}
       <ion-icon name="close-outline" class="h-3 w-3 ml-1" aria-hidden="true" />
    </span>
    <span
        v-if="(isUnderMax && isOverMin) || !isAdding"
        @click="add"
        class="bg-background p-2 rounded-md flex items-center cursor-pointer hover:bg-backgroundDark"
    >
       +
    </span>
<!--    <InputSearchSingle-->
<!--        v-if="isAdding"-->
<!--        :row-item="rowItem"-->
<!--    />-->
    <InputSearchSingle :row-item="rowItem" multiple/>
  </div>
</template>
