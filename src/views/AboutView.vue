<script setup lang="ts">
import EntityTitle from "@/components/EntityTitle.vue";
import EntityContent from "@/components/EntityContent.vue";
import {useUserStore} from "@/stores/user";
import dayjs from "dayjs";

interface Training {
  id: number,
  status: string,
  instructor: any,
  students: any[],
  date: Date
}

const userStore = useUserStore()

const title = 'Trainings'
const organization = userStore.user.organization.name

const columns = [
  'Status', 'Instructor', 'Students', 'Date'
]
const fetchUrl = 'https://vrefsolutions-api.azurewebsites.net/api/training'

const getRowObject = (training: any): any => {
  const trainingDate = dayjs(training.creationDateTime)

  return {
    id: {
      display: training.id,
      value: training.id
    },
    status: {
      display: training.status,
      value: training.status
    },
    instructor: {
      display: `${ training.instructor?.firstName } ${ training.instructor?.lastName }`,
      value: training.instructor
    },
    students: {
      display: training.students?.map((student: any) => `${ student?.firstName } ${ student?.lastName }`),
      value: training.students
    },
    date: {
      display: trainingDate.format('DD-MM-YYYY HH:mm'),
      value: trainingDate
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