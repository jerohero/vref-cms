<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'

  interface Organization {
    id: number,
    name: string
  }

  const userStore = useUserStore()

  const title = 'Organizations'
  const organization = userStore.user.organization.name

  const columns = [
    'Name'
  ]
  const route = '/organization'

  const getUpdateObject = (updated: any) => {
    const { name } = updated

    return {
      name
    }
  }

  const getRowObject = (training: any): any => {
    return {
      id: {
        display: (id: string) => id,
        value: training.id,
        editable: false,
      },
      name: {
        display: (name: string) => name,
        value: training.name,
        editable: true,
        edit: {
          type: 'input-text'
        }
      }
    }
  }
</script>

<template>
  <div class="mx-10 my-7 min-h-full">
    <EntityTitle
        :title="title"
        :organization="organization"
    />
    <EntityContent
        :columns="columns"
        :route="route"
        :get-row-object="getRowObject"
        :get-update-object="getUpdateObject"
    />
  </div>
</template>

<style>
</style>