<script setup lang="ts">
import EntityTitle from "@/components/EntityTitle.vue";
import EntityContent from "@/components/EntityContent.vue";
import {ref} from "vue";

interface Training {
  id: number,
  status: string,
  instructor: object,
  students: object[],
  date: string
}

const title = 'Trainings'
const organization = 'KLM Flight Academy'

const columns = [
  'Status', 'Instructor', 'Students', 'Date'
]
const fetchUrl = 'vref.com/api/trainings'
</script>

<template>
  <div class="mx-10 my-7">
    <EntityTitle :title="title" :organization="organization"/>
    <EntityContent :columns="columns" :fetchUrl="fetchUrl"/>
  </div>
</template>

<style>
</style>