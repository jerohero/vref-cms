<script setup lang="ts">
import EntityTitle from "@/components/EntityTitle.vue";
import EntityContent from "@/components/EntityContent.vue";
import {useUserStore} from "@/stores/user";
import dayjs from "dayjs";

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
const fetchUrl = 'https://vrefsolutions-api.azurewebsites.net/api/organization'

const getRowObject = (training: any): any => {
  return {
    id: {
      display: training.id,
      value: training.id,
      editable: false,
    },
    name: {
      display: training.name,
      value: training.name,
      editable: true,
      editType: 'input-text'
    }
  }
}
</script>

<template>
  <div class="mx-10 my-7">
    <EntityTitle
        :title="title"
        :organization="organization"
    />
    <EntityContent
        :columns="columns"
        :fetchUrl="fetchUrl"
        :getRowObject="getRowObject"
    />
  </div>
</template>

<style>
</style>