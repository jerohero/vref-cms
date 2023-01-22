<script setup lang="ts">
  import EntityTitle from '@/components/EntityTitle.vue'
  import EntityContent from '@/components/EntityContent.vue'
  import { useUserStore } from '@/stores/user'
  import type { Column } from '@/shared/interfaces';

  interface EventTypeColumns {
    id: Column,
    name: Column,
    message: Column,
    symbol: Column
  }

  const userStore = useUserStore()

  const title = 'Event Types'
  const organization = userStore.user.organization.name

  const columns = [
    'Name', 'Message', 'Symbol'
  ]
  const route = '/event-type'

  const getUpdateObject = (updated: any) => {
    const { name, message, symbol } = updated

    return {
      name: name.value,
      message: message.value,
      symbol: symbol.value
    }
  }

  const getRowObject = (eventType: any): EventTypeColumns => {
    return {
      id: {
        key: 'id',
        display: (id: string) => id,
        value: eventType.id,
        editable: false,
        queryable: true,
      },
      name: {
        key: 'name',
        display: (name: string) => name,
        value: eventType.name,
        editable: false,
        queryable: true
      },
      message: {
        key: 'message',
        display: (message: string) => message,
        value: eventType.message,
        editable: false,
        queryable: true
      },
      symbol: {
        key: 'symbol',
        display: (symbol: string) => symbol,
        value: eventType.symbol,
        editable: false,
        queryable: true
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