<script setup lang="ts">
  import { computed, onMounted, ref, watch } from 'vue'
  import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
  } from '@headlessui/vue'
  import { useToast } from 'vue-toastification'
  import axios from 'axios'
  import { useUserStore } from '@/stores/user'

  const props = defineProps<{
    rowItem: any,
    multiple?: boolean,
    maxItems?: number,
    minItems?: number
  }>()

  const toast = useToast()
  const userStore = useUserStore()
  const emit = defineEmits(['select'])

  const data = ref()
  const selected = ref()
  const query = ref('')
  const filtered = computed(() =>
      query.value === ''
          ? data.value
          : data.value.filter((dataItem: any) => {
            const queryable = props.rowItem.edit?.options?.queryable(dataItem)

            return queryable.toLowerCase().includes(query.value.toLowerCase())
          })
  )

  const isOverMax = computed(() => props.maxItems ? selected.value.length > props.maxItems : false)
  const isUnderMin = computed(() => props.minItems ? selected.value.length < props.minItems : false)

  onMounted(async () => {
    // if (props.multiple)
    //   data.value.push(props.rowItem.value[0], props.rowItem.value[1])

    if (props.rowItem.edit?.options?.fetchUrl) {
      const res = await axios.get('https://vrefsolutions-api.azurewebsites.net/api' + props.rowItem.edit?.options?.fetchUrl, {
        headers: { 'Authorization': userStore.bearerToken }
      })
      data.value = res.data
    } else if (props.rowItem.edit?.options?.value) {
      data.value = props.rowItem.edit?.options?.value
    }

    // Find current value
    selected.value = data.value.find((item: any) =>
        (item?.id || item) === (props.rowItem.value.id || props.rowItem.value)
    )
  })

  watch(isUnderMin, (from, to) => {
    if (to) return // Is over min

    toast.warning(`This field has a minimum of ${ props.minItems } values!`)
  })

  watch(isOverMax, (from, to) => {
    if (to) return // Is under max

    toast.warning(`This field has a maximum of ${ props.minItems } values!`)
  })

  watch(selected, (from ,to) => {
    if (!to) return // None selected

    emit('select', selected.value)
  })

  const getDisplayValue = (input: any) => {
    if (!input)
      return ''

    return props.rowItem.display(input)
  }
</script>

<template>
  <Combobox v-if="selected" as="div" v-model="selected" :multiple="multiple">
    <div class="relative mt-1">
      <ComboboxInput
          @change="query = $event.target.value"
          :display-value="(value) => multiple ? query : getDisplayValue(value)"
          class="w-full bg-foreground border border-text text-sm rounded-md py-2 pl-3 pr-10 focus:border-indigo-500
          focus:outline-none focus:ring-1 focus:ring-indigo-500"
          :title="getDisplayValue(selected)"
      />
      <span
          v-if="multiple && !query"
          class="absolute left-0 py-2 pl-3 pr-10 text-textGrey select-none pointer-events-none whitespace-nowrap
                text-ellipsis w-full overflow-hidden"
      >
        {{ getDisplayValue(selected) }}
      </span>
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ion-icon name="code-outline" class="h-4 w-4 text-gray-400 rotate-90" aria-hidden="true"/>
      </ComboboxButton>

      <ComboboxOptions
          v-if="filtered.length > 0"
          class="absolute bg-background z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
                shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption v-for="option in filtered"
                        :key="rowItem.edit?.options?.id(option)"
                        :value="option"
                        as="template"
                        v-slot="{ active, selected }"
        >
          <li class="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-foreground"
              :class="active ? 'bg-indigo-600 text-white' : 'text-gray-900'"
          >
            <div class="flex items-center justify-between">
              <span class="truncate" :class="selected && 'font-semibold'">
                {{ getDisplayValue(option) }}
              </span>
              <span v-if="rowItem.edit?.options?.displaySub" class="ml-2 mr-2 truncate text-[0.5rem] text-line">
                {{ props.rowItem.edit?.options?.displaySub(option) }}
              </span>
            </div>

            <span v-if="selected"
                  class="absolute inset-y-0 right-0 flex items-center pr-4"
                  :class="active ? 'text-white' : 'text-indigo-600'"
            >
              <ion-icon name="checkmark-outline" class="h-5 w-5" aria-hidden="true"/>
            </span>
          </li>
        </ComboboxOption>
      </ComboboxOptions>
    </div>
  </Combobox>
</template>
