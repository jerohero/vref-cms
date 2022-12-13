<script setup lang="ts">
import EntityTitle from "@/components/EntityTitle.vue";
import EntityContent from "@/components/EntityContent.vue";

interface Training {
  id: number,
  status: string,
  instructor: any,
  students: any[],
  date: string
}

const title = 'Trainings'
const organization = 'KLM Flight Academy'

const columns = [
  'Status', 'Instructor', 'Students', 'Date'
]
const fetchUrl = 'vref.com/api/trainings'

const getRowObject = (training: any): any => {
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
      display: training.instructor?.name,
      value: training.instructor
    },
    students: {
      display: training.students?.map((student: any) => student?.name),
      value: training.students
    },
    date: {
      display: training.date,
      value: training.date
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