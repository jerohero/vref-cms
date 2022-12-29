<script setup lang="ts">
  const props = defineProps<{
    rowItem: any
  }>()

  import { computed, ref } from 'vue'
  import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxLabel,
    ComboboxOption,
    ComboboxOptions,
  } from '@headlessui/vue'

  const people = [
    { firstName: 'Jin', lastName: 'Jan', email: 'instructor@outlook.com', id: 2, organization: {}, userType: 'Instructor' },
    { firstName: 'Alexander', lastName: 'van den Hoofd', email: 'email_with_long_name792.company@outlook.com', id: 3, organization: {}, userType: 'Instructor' },
    { firstName: 'Persoon', lastName: 'Piloot', email: 'a@outlook.com', id: 5, organization: {}, userType: 'Instructor' },
      props.rowItem.value
  ]

  const query = ref('')
  const selectedPerson = ref(props.rowItem.value)
  const filteredPeople = computed(() =>
      query.value === ''
          ? people
          : people.filter((person) => {
            const queryable = `${ person.firstName } ${ person.lastName } ${ person.email }`

            return queryable.toLowerCase().includes(query.value.toLowerCase())
          })
  )

  console.log(props.rowItem)
</script>

<template>
  <Combobox as="div" v-model="selectedPerson">
    <div class="relative mt-1">
      <ComboboxInput
          @change="query = $event.target.value"
          :display-value="(person) => `${ person?.firstName } ${ person?.lastName }`"
          class="w-full bg-foreground border border-text text-sm rounded-md py-2 pl-3 pr-10 focus:border-indigo-500
          focus:outline-none focus:ring-1 focus:ring-indigo-500"
      />
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ion-icon name="code-outline" class="h-4 w-4 text-gray-400 rotate-90" aria-hidden="true"/>
      </ComboboxButton>

      <ComboboxOptions
          v-if="filteredPeople.length > 0"
          class="absolute bg-background z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base
                shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
      >
        <ComboboxOption v-for="person in filteredPeople"
                        :key="person.email"
                        :value="person"
                        as="template"
                        v-slot="{ active, selected }"
        >
          <li class="relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-foreground"
              :class="active ? 'bg-indigo-600 text-white' : 'text-gray-900'"
          >
            <div class="flex items-center justify-between">
              <span class="truncate" :class="selected && 'font-semibold'">
                {{ person.firstName }} {{ person.lastName }}
              </span>
              <span class="ml-2 mr-2 truncate text-[0.5rem] text-line">
                {{ person.email }}
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
