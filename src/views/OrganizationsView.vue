<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'
  import type { Column } from '@/shared/interfaces';

  interface OrganizationColumns {
    id: Column,
    name: Column,
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
      name: name.value
    }
  }

  const getRowObject = (training: any): OrganizationColumns => {
    return {
      id: {
        key: 'id',
        display: (id: string) => id,
        value: training.id,
        editable: false,
        queryable: true,
      },
      name: {
        key: 'name',
        display: (name: string) => name,
        value: training.name,
        editable: true,
        queryable: true,
        edit: {
          type: 'input-text'
        },
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